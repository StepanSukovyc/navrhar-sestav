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
             * Detail pohybu
             *
             * @author Martin Boček
             * @since 480.1.0.12
             */
            let GDetailPohybu = class GDetailPohybu extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    /**
                     * Grid způsobu zaúčtování
                     * @type {JQuery | null}
                     */
                    this.$gridZpz = null;
                    /**
                     * Grid navázaných pohybů
                     * @type {JQuery | null}
                     */
                    this.$gridNavazanePohyby = null;
                    /**
                     * Grid účetních zápisů
                     * @type {JQuery | null}
                     */
                    this.$gridUctZapisy = null;
                    /**
                     * Grid dokladu o zaúčtování
                     * @type {JQuery | null}
                     */
                    this.$gridDokladOZauc = null;
                    /**
                     * Grid zápisů dokladu o zaúčtování
                     * @type {JQuery | null}
                     */
                    this.$gridZapisyDokladuOZauc = null;
                    /**
                     * Grid dalších pohybů účtovaných dokladem o zaúčtování
                     * @type {JQuery | null}
                     */
                    this.$gridOstPohybyDokladuOZauc = null;
                    /**
                     * Grid rezervačních zápisů
                     * @type {JQuery | null}
                     */
                    this.$gridRezZapisy = null;
                    /**
                     * Tab bankovního výpisu
                     * @type {JQuery<HTMLElement> | null}
                     */
                    this.$tabVypis = null;
                    /**
                     * Grid položek IISSP
                     * @type {JQuery | null}
                     */
                    this.$gridPolozkyIissp = null;
                }
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    // jen nastavení okna
                    this.aktualizaceDetailu(true);
                    // případný flash s informací o chybně nastaveném daňovém pohybu
                    const flashId = "idPrizDdState";
                    // skrytí flashe
                    this.hideFlash(flashId);
                    if (this.DetailDto.priz_dd === 10 && !this.DetailDto.JeDanovy) {
                        // uživatelské nastavení
                        const useFlash = this.globalSettings?.getDef("Global.Fuc.AppSettings.UpoSettingsForm.DetailFlashPrizDdWarning", true) ?? true;
                        if (useFlash)
                            this.showFlash("jres:24100363", "warning", flashId); //RC 24100363 : Pohyb je chybně nastaven jako daňový (platební pohyby mimo POK jsou vždy nedaňové)
                    }
                }
                /**
                 * Obsluha události builderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder detailbuilder
                 */
                onDetailBuilderInit(builder) {
                    let that = this;
                    // definice akcí, tabů, kpi, menu apod.
                    builder.withComponent("detail", {
                        actions: {
                            // akce pro menubar
                            // účtování
                            actUctovani: WebClient.FucActions.actionZauctovat({
                                visible: that.DetailDto.JeUcetni,
                                run: function () { this.setPending(that.uctovani()); }
                            }),
                            // rezervace
                            actRezervace: Gordic.Eko.Action.actionZarezervovat({
                                visible: that.DetailDto.JeRezervacni,
                                run: function () { this.setPending(that.rezervace()); }
                            }),
                            actOdrezervace: {
                                caption: "jres:24100485", //RC 24100485 : Odrezervovat
                                enabled: false,
                                run: function () { this.setPending(that.rezervace()); }
                            },
                            // storno
                            actStorno: Gordic.Eko.Action.actionStornovat({
                                run: function () { this.setPending(that.storno()); }
                            }),
                            actZrusitStorno: Gordic.Eko.Action.actionZrusitStorno({
                                run: function () { this.setPending(that.storno()); }
                            }),
                            // změna účetních parametrů
                            // TODO: tohle nahradit editací pohybu, kde by se dal zeditovat popis pohybu, subřada a datum účtování (podobně jako je to v Guptě při účtování)
                            //actUcetniParametry: { caption: "jres:24100142", enabled: false, visible: that.DetailDto.JeUcetni!, run: function () { that.ucetniParametry(); } }, //RC 24100142 : Účetní parametry
                            actOprava: Gordic.Eko.Action.actionOpravit({
                                visible: that.DetailDto.JeUcetni,
                                run: function () { that.oprava(); }
                            }),
                            actZrusitZmeny: Gordic.Eko.Action.actionZrusitZmeny({
                                visible: that.DetailDto.JeUcetni,
                                run: function () { that.oprava(); }
                            }),
                            actUlozeni: Gordic.Eko.Action.actionUlozit({
                                visible: that.DetailDto.JeUcetni,
                                run: function () { this.setPending(that.ulozeni()); }
                            }),
                            // detail případu
                            actDetailPripadu: Gordic.Eko.Action.actionDetail({
                                caption: "jres:24100141", //RC 24100141 : Případ
                                run: function () { this.setPending(that.detailPripadu()); }
                            }),
                            // soupiska
                            actSoupiskaVlozit: {
                                caption: "jres:24100354", //RC 24100354 : Vložit do soupisky
                                enabled: false,
                                visible: that.DetailDto.JeUcetni,
                                run: function () { this.setPending(that.soupiska()); }
                            },
                            actSoupiskaVyjmout: {
                                caption: "jres:24100355", //RC 24100355 : Vyjmout ze soupisky
                                enabled: false,
                                visible: that.DetailDto.JeUcetni,
                                run: function () { this.setPending(that.soupiska()); }
                            },
                            actSoupiskaDetail: Gordic.Eko.Action.actionDetail({
                                caption: "jres:24100353", //RC 24100353 : Soupiska
                                run: function () { this.setPending(that.detailSoupisky()); }
                            }),
                            actObcerstveniPoh: Gordic.Eko.Action.actionObcerstvit({
                                run: function () { this.setPending(that.reloadData()); }
                            }),
                            // nový pohyb
                            actNovyPohyb: {
                                caption: "jres:24100483", //RC 24100483 : Nový pohyb
                                tooltip: "jres:24100484", //RC 24100484 : Kopie pohybu s opačnými znaménky částek
                                icon: "gi-copy",
                                enabled: false,
                                run: function () { this.setPending(that.novyPohyb()); }
                            },
                            // servisní nástroje
                            actServis: {
                                caption: "jres:24100143", //RC 24100143 : Servisní nástroje
                                icon: Gordic.Gin.Icons.ActionEnum.zmenit,
                                enabled: false,
                                visible: that.DetailDto.JeUcetni,
                                run: function () { this.setPending(that.servis()); }
                            },
                            // tab DPH
                            actKontrolniHlaseniDPH: Gordic.Eko.Action.actionKontrolniHlaseni({
                                run: function () { this.setPending(that.kontrolniHlaseniDPH()); }
                            }),
                            // tab účtování a rezervace
                            actUctovaniTiskPohybu: Gordic.Eko.Action.actionTisk({
                                name: "actUctovaniTiskPohybu",
                                tema: "fuc_ptm_dokagd",
                                caption: "Zápisy pohybu",
                                reportStarting: function (rep) { return that.reportStarting(rep); }
                            }),
                            actUctovaniTiskDokladu: Gordic.Eko.Action.actionTisk({
                                name: "actUctovaniTiskDokladu",
                                tema: "fuc_ptm_engzau",
                                caption: "Doklad",
                                reportStarting: function (rep) { return that.reportStarting(rep); }
                            }),
                            actUctovaniDokladOZauctovani: WebClient.FucActions.actionDokladOZauctovani({
                                run: function () { this.setPending(that.dokladOZauctovani()); }
                            }),
                            actUctovaniInfoOUctovani: {
                                caption: "jres:24100366", //RC 24100366 : Informace o účtování
                                icon: "gi-info",
                                enabled: false,
                                run: function () { this.setPending(that.historieUctovani()); }
                            },
                            //actUctovaniPohyb: { run: function () { that.loadUctovaniP(false); } },
                            //actUctovaniDoklad: { run: function () { that.loadUctovaniP(true); } },
                            //// subtasky na tabu rezervace
                            //actRezervacePohyb: { run: function () { that.loadRezervaceP(false); } },
                            //actRezervaceRoz: { run: function () { that.loadRezervaceP(true); } },
                            // subtasky na tabu IISSP
                            actIisspZmenaId: Gordic.Eko.Action.actionOpravit({
                                caption: "Změnit ID IISSP",
                                visible: (that.DetailDto.JeUcetni && that.JeIissp),
                                run: function () { this.setPending(that.zmenaIissp()); }
                            })
                        },
                        tabGroups: [
                            Gordic.Prefabs.TabGroups.Agenda(),
                            { id: "grpIissp", caption: "jres:24100325", visible: that.JeIissp }, //RC 24100325 : IISSP
                            { id: "grpUctRez", caption: "jres:24100350", visible: that.DetailDto.JeZauctovany || that.DetailDto.s_upo === Fuc.Globals.Enums.SUpo.VUctovani || (that.DetailDto.JeNezauctovany && (that.DetailDto.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniPoloautomaticky || that.DetailDto.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniRucni)) }, //RC 24100350 : Účetní a rezervační zápisy
                            { id: "grpVypis", caption: "jres:24100074", visible: that.DetailDto.JeBankovniVypis }, //RC 24100074 : Bankovní výpis
                            { id: "grpNavPohyby", caption: "Navázané pohyby", visible: (that.DetailDto.JeUcetni || that.DetailDto.JeRezervacni) && !that.OtevritKDuplikaci }
                        ],
                        menuBar: 
                        // TODO: nechat zařazení akce pro uložení do oblíbených podle editačního režimu? v jiném režimu se totiž needituje (možná v budoucnu při novém pohybu). v budoucnu ale bude možné nastavovat oblíbené uživatelsky ...
                        // TODO: bude potřeba upravit i jiné akce, které nemají v režimu editace smysl
                        // TODO: nebo to řešit přes Visible (viz. metoda enable)
                        // TODO: soupisky zatím zakomentovány, dokud nebude doanalyzováno, jak se mají přesně chovat
                        this.OtevritKDuplikaci === true
                            ?
                                // návrh nového pohybu
                                [
                                    "actUlozeni*"
                                ]
                            : (this.OtevritVRezimuOpravy === true
                                ?
                                    // editace existujícího pohybu (např. při účtování)
                                    [
                                        "actOprava",
                                        "actZrusitZmeny",
                                        "actUlozeni*",
                                        "actUctovani",
                                        "actRezervace",
                                        "actOdrezervace",
                                        "actDetailPripadu",
                                        //"actKontrolniHlaseniDPH",
                                        //"actUctovaniInfoOUctovani",
                                        //"actUcetniParametry",
                                        "actStorno",
                                        "actZrusitStorno",
                                        ["jres:24100356", "actSoupiskaVlozit", "actSoupiskaVyjmout", "actSoupiskaDetail"], //RC 24100356 : Soupiska
                                        "actServis",
                                        WebClient.FucDetail.createMenuShare(that, that.IxpUpr, that.RadekUpo.toString(), undefined, true)
                                    ]
                                :
                                    // detail existujícího pohybu
                                    [
                                        "actOprava",
                                        "actZrusitZmeny",
                                        "actUlozeni",
                                        "actUctovani*",
                                        "actRezervace*",
                                        "actOdrezervace",
                                        "actObcerstveniPoh",
                                        "actDetailPripadu",
                                        //"actKontrolniHlaseniDPH",
                                        //"actUctovaniInfoOUctovani",
                                        //"actUcetniParametry",
                                        "actNovyPohyb",
                                        "actStorno*",
                                        "actZrusitStorno",
                                        ["jres:24100356", "actSoupiskaVlozit", "actSoupiskaVyjmout", "actSoupiskaDetail"], //RC 24100356 : Soupiska
                                        "actServis",
                                        WebClient.FucDetail.createMenuShare(that, that.IxpUpr, that.RadekUpo.toString(), undefined, true)
                                    ]),
                        commandBar: that.DetailDto.JeUcetni ? [
                            { action: "actUlozeni", primary: true }
                        ] : undefined,
                        // definice statusbaru je až v onContentReady
                        statusBar: [
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarSUpo" }),
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarSSto" })
                        ],
                        //commandBar: [this.OtevritVRezimuOpravy === true ? "actUlozeni" : ""],
                        //statusBar: {
                        //    sUpo: { type: "static", caption: "", customClass: "g-state-text" },
                        //    sSto: { type: "static", caption: "", customClass: "g-state-text" }
                        //},
                        //statusBar: [
                        //    { id: "statusSUpo", caption: "", type: "static", customClass: "g-state-text g-state-s-upo" },
                        //    { id: "statusSSto", caption: "", type: "static", customClass: "g-state-text g-state-s-sto" }
                        //],
                        tabs: {
                            tabPohyb: {
                                tabParams: {
                                    // TODO: měnit title podle toho, juestli jde o účetní nebo o rezervační pohyb?
                                    title: "Pohyb", group: Gordic.Prefabs.TabGroups.Agenda(), opened: true, locked: false,
                                },
                                init: function (tab) {
                                    // TODO: po dořešení přesunou přímo do prefabu?
                                    let optsAcIxeSubradaDuz = {
                                        disabled: true,
                                        dropdown: false,
                                        name: "ac_ixe",
                                        modelDefaults: { isModel: true },
                                        model: function (operator, dto, modelOptions) {
                                            if (operator === "apply") {
                                                // nastavení hodnoty
                                                let col = "";
                                                let isReceipt;
                                                let val;
                                                if (dto.ac_ixe !== null && dto.ac_ixe !== undefined) {
                                                    // zobrazeno číslo dokladu
                                                    col = "ac_ixe";
                                                    dto.ac_ixe = dto.ac_ixe.trim();
                                                    isReceipt = true;
                                                    val = dto.ac_ixe;
                                                }
                                                else if (dto.subrada_duz !== null && dto.subrada_duz !== undefined) {
                                                    // zobrazena subřada
                                                    col = "subrada_duz";
                                                    dto.ac_ixe = "*" + dto.subrada_duz;
                                                    isReceipt = false;
                                                    val = dto.subrada_duz;
                                                }
                                                if (col !== "") {
                                                    let value = that.findFields("ac_ixe").gfield("getValue");
                                                    that.findFields("ac_ixe").gfield("setInitial", $.extend(value, {
                                                        isReceipt: isReceipt,
                                                        ac_cislo_do: null,
                                                        ac_cislo_od: null,
                                                        aktivita: 100,
                                                        ico: null,
                                                        nazev: "",
                                                        rok: null,
                                                        subrada: val,
                                                        zkratka: null,
                                                        _validatationState: "verified",
                                                        _validatationMsg: "",
                                                    }));
                                                }
                                            }
                                            else if (operator === "collect") {
                                                // přečtení hodnoty
                                                let value = that.findFields("ac_ixe").gfield("getValue");
                                                if (value !== null) {
                                                    if (!value.isReceipt) {
                                                        //dto.ac_ixe = "*" + value.subrada;
                                                        dto.subrada_duz = value.subrada;
                                                    }
                                                    else
                                                        //dto.ac_ixe = "" + value.subrada;
                                                        dto.ac_ixe = value.subrada;
                                                }
                                            }
                                        },
                                        verificationNeeded: false,
                                        verify: function (value) {
                                            if (typeof value !== "object") {
                                                return { subrada: value, _validatationState: "nonverified" };
                                            }
                                            if (value && value.isReceipt) {
                                                value._validatationMsg = "";
                                                value._validatationState = "verified";
                                            }
                                            // TODO: zatím bez kontroly
                                            return value;
                                        },
                                        serverFilters: {
                                            agenda: 330,
                                            // TODO: drd dávat vždy 0 pro učetní pohyby nebo to brát z případu, kde drd je?
                                            drd: 0,
                                            ico: that.DetailDto.ico,
                                            rok: that.DetailDto.rok,
                                            ucs: that.DetailDto.ucs,
                                            // TODO: nebrat jen měsíc, který je aktuálně na pohybu, tj. that.DetailDto.mesic?
                                            mesic: function () { let mesic = that.findFields("mesic").gfield("getValue"); return mesic.cislo; },
                                        },
                                    };
                                    // TODO: doplnit
                                    $.newDiv().appendTo(tab).gform("createFrom", new Gordic.Forms.Form({ name: "formPohyb", layoutDescriptor: "L2M2S1" })
                                        .addSection("Základní údaje")
                                        .addRow("Typ účetního případu").addField("gselectbox", Gordic.Prefabs.Select.fucstup(), { disabled: true, name: "typ_upr", model: "typ_upr=typ_upr" })
                                        .addRow("Kategorie pohybu").addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), { disabled: true, name: "ktg_upo", model: "ktg_upo=ktg_upo", itemTemplate: WebClient.FucUtils.getFuccupoItemTemplate(that) })
                                        .addRow("Kategorie pohybu předpisu").addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), { disabled: true, name: "ktg_upo_pre", model: "ktg_upo_pre=ktg_upo", itemTemplate: WebClient.FucUtils.getFuccupoItemTemplate(that) })
                                        .addRow("Kontace").addField("gselectbox", Gordic.Prefabs.Select.ekoakon(), { disabled: true, name: "ixs_kon", model: "ixs_kon=ixs_kon;ixs_kon_txt=ixs_kon_txt" })
                                        .addRow("jres:24100356").addField("gselectbox", Gordic.Prefabs.Select.fucspid(), {
                                        disabled: true,
                                        name: "ixp",
                                        model: "ixp=ixp,ixp_txt=popis",
                                        buttons: [
                                            {
                                                captionVisible: "never",
                                                action: new GAction({ name: "actDetailSoupisky", caption: "jres:24100353", icon: "gi-detail", run: function () { that.detailSoupisky(); } }), //RC 24100353 : Soupiska
                                                enabled: that.DetailDto.JeVSoupisce ?? false,
                                                requireValue: true,
                                                requireEdit: false,
                                            }
                                        ]
                                    })
                                        .addSection("jres:24100324") //RC 24100324 : Externí subjekt
                                        .addPrefab(WebClient.FucDetail.prefabEsuPam(that.DetailDto.ixs_esu))
                                        //.addRow("Subjekt").addField("gselectbox", Gordic.Prefabs.Select.ginsesu(), { disabled: true, name: "ixs_esu", model: "ixs_esu=ixs_esu"/*;nazev_esu=nazev;ixs_eko=ixs_eko"*/ }) // itemTemplate: "IČO: {ico}, RČ: {rc}, OČ: {oc}, {nazev}", ... ;ico_esu=ico;rc_esu=rc
                                        .addSection("Bankovní údaje")
                                        .addPrefab(WebClient.FucDetail.prefabVsKsSs())
                                        .addSection("Částka")
                                        .addRow("jres:24100082").addField("gnumberbox", "w-8", Gordic.Prefabs.Number.currency(), { disabled: true, name: "c_mena" }).addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekocmen(), { disabled: true, name: "mena", model: "mena=mena;mena_zkr=mena_sis_aaa" }) //RC 24100082 : Částka v měně
                                        .addRow("jres:24100083").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "c_upo" }) //RC 24100083 : Částka v CZK
                                        .addSection("Účetní a rezervační údaje")
                                        // TODO: číslo dokladu nebo subřada? ale ta už je asi jinde ...
                                        .addRow("Subřada/ Číslo dokladu").addField("gselectbox", Gordic.Eko.Prefabs.gsubsequence(), optsAcIxeSubradaDuz)
                                        //.addRow("Subřada").addField("gselectbox", Gordic.Prefabs.Select.uctddde(), { name: "subrada_duz", model: "subrada_duz=subrada", serverFilters: { rok: that.DetailDto.rok, ico: that.DetailDto.ico, aktivita: [100, 500] }, defaultValue: null })
                                        //.addRow("Subřada").addField("gstringbox", { disabled: true, name: "subrada_duz" })
                                        .addPrefab(WebClient.FucDetail.prefabDatumUctovani())
                                        .addRow("Položka smlouvy").addField("gstringbox", { disabled: true, name: "xxx" })
                                        .addRow("Účetní doklad (v UCT)").addField("gstringbox", { disabled: true, name: "ixp_uct" })
                                        .addSection("Popis")
                                        // TODO: nastavovat vždy výšku 7 (to odpovídá vedlejší sekci) nebo použítat autoSize?
                                        .addRow("Popis").addField("gstringbox", Gordic.Eko.Detail.Field.getCounterOptions(254 /* Fuc.Interface.GPohybDtoTypeLengths.popis_upo */, false, false, { disabled: true, name: "popis_upo", rows: /*7*/ 1, /*wrap: true*/ autoSize: true })));
                                }
                            },
                            tabDph: {
                                // DPH (záložka je dostupná jen pokud je pohyb daňový)
                                tabParams: {
                                    title: "DPH",
                                    group: Gordic.Prefabs.TabGroups.Agenda(),
                                    opened: false,
                                    locked: false,
                                    visible: that.DetailDto.JeDanovy,
                                    menuBar: ["actKontrolniHlaseniDPH*"]
                                },
                                init: function (tab) {
                                    // TODO: dodělat
                                    let obdobiDphSazby;
                                    let obdobiDphVid;
                                    // TODO: do obdobiDphSazby bych měl asi dávat datum z ekospde datum dud
                                    if (that.DetailDto.rok_dph && that.DetailDto.mesic_dph && that.DetailDto.rok_dph > 0 && that.DetailDto.mesic_dph > 0) {
                                        obdobiDphSazby = new Date(that.DetailDto.rok_dph, that.DetailDto.mesic_dph - 1);
                                        obdobiDphVid = { year: that.DetailDto.rok_dph, month: that.DetailDto.mesic_dph };
                                    }
                                    else {
                                        obdobiDphSazby = new Date(that.Rok, 0);
                                        obdobiDphVid = { year: 0, month: 0 };
                                    }
                                    let recapDphOptions = {
                                        checkVisible: false,
                                        periodDPHVisible: true,
                                        calculate: false,
                                        readOnly: true,
                                        totalAmount: parseDecimal(that.DetailDto.c_upo),
                                        taxPeriod: obdobiDphSazby,
                                        model: {
                                            periodDPH: obdobiDphVid,
                                            prices: Gordic.Gin.WebClient.Utils.dphModelApply(that.DetailDto, [
                                                // osvobozeno
                                                { from: "c_d0", to: { taxType: "-1" /* Gordic.Gin.WebClient.ETaxType.Osvobozeno */, priceType: "baseValue" } },
                                                // zaokrouhlení
                                                { from: "c_zao", to: { taxType: "-2" /* Gordic.Gin.WebClient.ETaxType.Zaokrouhleno */, priceType: "sum" } },
                                                // bez daně
                                                { from: "c_z0", to: { taxType: "0" /* Gordic.Gin.WebClient.ETaxType.BezDane */, priceType: "baseValue" } },
                                                // základní sazba
                                                { from: "c_z2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "baseValue" } },
                                                { from: "c_d2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "tax" } },
                                                // první snížená
                                                { from: "c_z1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "baseValue" } },
                                                { from: "c_d1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "tax" } },
                                                // druhá snížená
                                                { from: "c_z3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "baseValue" } },
                                                { from: "c_d3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "tax" } },
                                                // třetí snížená
                                                // TODO: zatím není podpora
                                                //{ from: "c_z4", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "baseValue" } },
                                                //{ from: "c_d4", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "tax" } },
                                                //Celkem
                                                { from: "c_upo", to: { taxType: "-3" /* Gordic.Gin.WebClient.ETaxType.DokladCelkem */, priceType: "sum" } }
                                            ])
                                        }
                                    };
                                    $.newDiv().appendTo(tab).gcontent(Gordic.Gin.WebClient.recapDPH, recapDphOptions);
                                }
                            },
                            tabPredkontace: {
                                // předkontace
                                tabParams: {
                                    title: "jres:24100376", //RC 24100376 : Předkontace
                                    group: Gordic.Prefabs.TabGroups.Agenda(),
                                    opened: false,
                                    locked: false
                                },
                                init: function (tab) {
                                    // přidání gridu předkontací do tabu
                                    that.$gridPredkontace = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
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
                                    title: "Účetní zápisy",
                                    group: { id: "grpUctRez" },
                                    opened: false,
                                    locked: false,
                                    visible: that.DetailDto.JeUcetni && (that.DetailDto.JeZauctovany || that.DetailDto.s_upo === Fuc.Globals.Enums.SUpo.VUctovani || (that.DetailDto.JeNezauctovany && (that.DetailDto.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniPoloautomaticky || that.DetailDto.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniRucni))),
                                    menuBar: ["actUctovaniTiskPohybu*"],
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
                                        columns: WebClient.FucGrid.Zapis.createGridFormatN(that, { drd: true, datum: true, dph: true })
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
                                    title: "Rezervační zápisy",
                                    group: { id: "grpUctRez" },
                                    opened: false,
                                    locked: false,
                                    visible: (that.DetailDto.JeUcetni || that.DetailDto.JeRezervacni) && that.DetailDto.JeZauctovany,
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
                                        columns: WebClient.FucGrid.Zapis.createGridFormatN(that, { drd: true, datum: true })
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabDokladOZauc: {
                                // účtování
                                initLazy: true,
                                tabParams: {
                                    title: "Doklad o zaúčtování",
                                    group: { id: "grpUctRez" },
                                    opened: false,
                                    locked: false,
                                    visible: that.DetailDto.JeUcetni && that.DetailDto.JeZauctovany,
                                    menuBar: ["actUctovaniTiskDokladu*", "actUctovaniDokladOZauctovani*", "actUctovaniInfoOUctovani*"],
                                    customLoad: function () {
                                        // načtení účtování
                                        // TODO: dodělat zobrazení historie účtování? buď přes seznam (obecně může být pohyb ve více historií účtování) nebo dohledat ten nejnovější, kde je pohyb zaúčtován
                                        // TODO: neřešit uložený typ zobrazení?
                                        that.loadDokladOZauctovani();
                                    }
                                },
                                init: function (tab) {
                                    // tabulky
                                    $.newDiv()
                                        .appendTo(tab)
                                        .gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection( /*"Doklad"*/ /*"Doklad o zaúčtování"*/));
                                    that.$gridDokladOZauc = $.newDiv()
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridDokladOZauc",
                                        columnMode: "full",
                                        // TODO: upravit:
                                        //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                        columns: WebClient.FucGrid.Zapis.createGridFormatDoklady(false),
                                        //cellActivate: function (ev, obj) {
                                        //    // načtení zápisů aktuálního dokladu
                                        //    if (obj.cellInfo) that.nacteniSeznamuZapisu();
                                        //}
                                    });
                                    //.gautofit();
                                    //.gautofit({
                                    //    resizersOnTab: false
                                    //});
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
                                    // další pohyby z dokladu
                                    // TODO: dát sem akci na detail pohybu?
                                    $.newDiv()
                                        .appendTo(tab)
                                        .gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection("Další pohyby dokladu"));
                                    that.$gridOstPohybyDokladuOZauc = $.newDiv()
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridOstPohybyDokladuOZauc",
                                        columnMode: "full",
                                        // TODO: upravit:
                                        //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                        columns: WebClient.FucGrid.Pohyb.createGridFormat(that, Gordic.Fuc.Globals.Enums.TypSezPoh.UcetniPohyby),
                                        //cellActivate: function (ev, obj) {
                                        //    // načtení zápisů aktuálního dokladu
                                        //    if (obj.cellInfo) that.nacteniSeznamuZapisu();
                                        //}
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabZpz: {
                                // způsob zaúčtování
                                initLazy: true,
                                tabParams: {
                                    title: "Způsob zaúčtování",
                                    group: Gordic.Prefabs.TabGroups.Agenda() /*{ id: "grpUctRez" }*/,
                                    opened: false,
                                    locked: false,
                                    // TODO: zkontrolovat zobrazení způsobů zaúčtování - má smysl jen u typ_upo 10 a 30 (a možná i 60?)
                                    visible: that.DetailDto.typ_upo === Fuc.Globals.Enums.TypUpo.UcetniAutomaticky || that.DetailDto.typ_upo === Fuc.Globals.Enums.TypUpo.UcetniPoloautomaticky || that.DetailDto.typ_upo === Fuc.Globals.Enums.TypUpo.Rezervacni,
                                    customLoad: function () {
                                        // načtení způsobu zaúčtování
                                        that.loadZpz();
                                    }
                                },
                                init: function (tab) {
                                    // přidání polí a gridu způsobu zaúčtování do tabu
                                    let $formZpz = new Gordic.Forms.Form({ name: "formZpz" });
                                    $formZpz.addSection("");
                                    if (that.prop("debugMode"))
                                        $formZpz.addRow("PID").addField("gstringbox", { disabled: true, name: "zpz_pid" });
                                    $formZpz.addRow("Kód").addField("gstringbox", { disabled: true, name: "zpz_kod" })
                                        .addRow("Název").addField("gstringbox", { disabled: true, name: "zpz_nazev" })
                                        .addRow("Subřada").addField("gstringbox" /*"gnumberbox"*/, { disabled: true, name: "zpz_subrada" });
                                    $.newDiv().appendTo(tab).gform("createFrom", $formZpz);
                                    // úprava sloupců (přidání tooltipů pro zástupky)
                                    let columns = WebClient.FucGrid.Zpz.createGridFormatRadky(that);
                                    //columns = FucGrid.addZastTooltip<Gordic.Fuc.Interface.GZpzDto>(columns);
                                    // vytvoření gridu
                                    that.$gridZpz = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        // TODO: přidat DTO
                                        .ggrid({
                                        name: "gridZpz",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        // TODO: bude nějaká defaultní akce? jestli ano, tak buď oprava položky nebo nějaký nový detail položky
                                        // defaultAction: 
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        columns: columns
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabNavazanePohyby: {
                                // navázané pohyby (rezervační na účetním nebo účetní na rezervačním)
                                initLazy: true,
                                tabParams: {
                                    title: "Navázané pohyby",
                                    group: { id: "grpNavPohyby" },
                                    opened: true,
                                    locked: false,
                                    visible: (that.DetailDto.JeUcetni || that.DetailDto.JeRezervacni) && !that.OtevritKDuplikaci,
                                    customLoad: function () {
                                        // načtení navázaných pohybů
                                        that.loadNavazanePohyby();
                                    }
                                },
                                init: function (tab) {
                                    // přidání gridu pohybů do tabu
                                    that.$gridNavazanePohyby = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridNavazanePohyby",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        // TODO: bude nějaká defaultní akce? jestli ano, tak buď oprava položky nebo nějaký nový detail položky
                                        // defaultAction: 
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        columns: WebClient.FucGrid.Pohyb.createGridFormat(that, that.DetailDto.JeUcetni ? Gordic.Fuc.Globals.Enums.TypSezPoh.RezervacniPohyby : Gordic.Fuc.Globals.Enums.TypSezPoh.UcetniPohyby, true),
                                        defaultProfile: {
                                            columnList: "ixp_upr,radek_upo,typ_upo_txt,s_upo_txt,s_sto_txt,ktg_upo_txt,znam_txt,c_upo,popis_upo,subjekt.nazev,dat_upo,dat_zauc,obd_dan,subrada_duz,priz_dd_txt"
                                        }
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabVypis: {
                                // bankovní výpis (záložka je dostupná jen pokud je na pohybu položka bankovního výpisu)
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100074", group: { id: "grpVypis" }, opened: true, locked: false, visible: that.DetailDto.JeBankovniVypis, //RC 24100074 : Bankovní výpis
                                    customLoad: function () {
                                        // načtení bankovního výpisu
                                        that.loadVypis();
                                    }
                                },
                                init: function (tab) {
                                    // jen uložení tabu, naplněn bude až po načtení dat, protože jeho podoba závisí na datech
                                    that.$tabVypis = tab;
                                }
                            },
                            tabIISSP: {
                                // IISSP (záložka je dostupná jen v režimu IISSP)
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100325", group: { id: "grpIissp" }, opened: true, locked: false, visible: that.JeIissp, //RC 24100325 : IISSP
                                    menuBar: ["actIisspZmenaId"],
                                    customLoad: function () {
                                        // načtení bankovního výpisu
                                        that.loadIissp();
                                    }
                                },
                                init: function (tab) {
                                    $.newDiv().appendTo(tab).gform("createFrom", new Gordic.Forms.Form({ name: "formIissp", layoutDescriptor: "L1M1S1" })
                                        .addSection("")
                                        .addRow("jres:24100328").addField("gselectbox", Gordic.Prefabs.Select.idIissp(), { disabled: true, name: "id_iissp", model: "id_hdr_ris=id_hdr_ris;radek_hdr=radek_hdr" }) //RC 24100328 : ID RIS, Ř. RIS
                                        .addSection("jres:24100329")); //RC 24100329 : Struktura v IISSP
                                    // TODO: zkontrolovat sloupce v TK a WK (týká se detailu případu a tím pádem i tohoto gridu)
                                    that.$gridPolozkyIissp = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridPolozkyIissp",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        // TODO: bude nějaká defaultní akce? jestli ano, tak buď oprava položky nebo nějaký nový detail položky
                                        // defaultAction: 
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        columns: WebClient.FucGrid.Iissp.createGridFormatPolozky()
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
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
                    // úprava první, druhé a třetí sekce (jiný typy, stavy, ...)
                    const formSetup = {};
                    const headerForm = new Gordic.Forms.Form({ name: "formHeader" })
                        .addSection()
                        .addRow("Řádek pohybu").addField("gnumberbox", { disabled: true, model: "radek_upo", defaultValue: null })
                        .addSection()
                        // TODO: doplnit prefaby
                        .addRow("Druh pohybu").addField("gselectbox", Gordic.Prefabs.Select.fuccdpo(), { disabled: true, model: "druh_poh=druh_poh" })
                        .addRow("Typ pohybu").addField("gselectbox", Gordic.Prefabs.Select.fucctup(), { disabled: true, model: "typ_upo=typ_upo" })
                        .addSection()
                        .addRow("Stav pohybu").addField("gselectbox", this.DetailDto.druh_poh == Gordic.Fuc.Globals.Enums.DruhPoh.Rezervacni ? Gordic.Prefabs.Select.fuccsuoR() : Gordic.Prefabs.Select.fuccsuoU(), { disabled: true, model: "s_upo=s_upo" })
                        .addRow("Stav storna").addField("gselectbox", Gordic.Prefabs.Select.ekocsto(), { disabled: true, model: "s_sto=s_sto" })
                        .addRow("Pohyb").addField("gselectbox", Gordic.Prefabs.Select.prizDdPoh(), { disabled: true, model: "priz_dd=priz_dd" })
                        .addSection({ layoutDescriptor: Gordic.Eko.Detail.headerLayoutDescriptorPopis });
                    formSetup[Gordic.Eko.HeaderForm.Sections.Info] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Id)[0]?.item, // PID
                            headerForm.form.sections[0].rows[0] // řádek pohybu
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data1] = {
                        rows: [
                            headerForm.form.sections[1].rows[0], // druh pohybu
                            headerForm.form.sections[1].rows[1], // typ pohybu
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.DatumEvidence)[0]?.item // datum pohybu
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            headerForm.form.sections[2].rows[0], // stav pohybu
                            headerForm.form.sections[2].rows[1], // stav storna
                            headerForm.form.sections[2].rows[2] // pohyb
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Fields.Zpracovatel] = null;
                    // vlastní nastavení prvků (převážně model). pozor, nesmí se měnit name
                    formSetup[Gordic.Eko.HeaderForm.Fields.Id] = { options: { model: "ixp_upr" } };
                    formSetup[Gordic.Eko.HeaderForm.Fields.DatumEvidence] = { options: { model: "dat_upo", valueType: "date" } };
                    formSetup[Gordic.Eko.HeaderForm.Fields.Popis] = { options: { model: "popis_upo" } };
                    // jiný label pro datum
                    formSetup[Gordic.Eko.HeaderForm.Rows.DatumEvidence] = { label: "Datum pohybu" };
                    // aktualizace hlavičky
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                    // úprava menu a položek
                    WebClient.FucDetail.changeBuilderDefinition(builder);
                    // šipky pro posun po seznamu
                    if (!this.ZapisyKDuplikaci) {
                        this.listControls_setup({
                            rowToDto: function (gridState) {
                                return {
                                    IxpUpr: gridState.currentRow.data.ixp_upr,
                                    RadekUpo: gridState.currentRow.data.radek_upo,
                                    OtevritJakoOpravu: that.OtevritJakoOpravu,
                                    NasledujiciDetail: true
                                };
                            },
                            // TODO: nedat tam místo PIDu ac (nebo co je v Guptě)?
                            nextItemTemplate: "Následující: {ixp_upr} - {radek_upo}",
                            prevItemTemplate: "Předchozí: {ixp_upr} - {radek_upo}",
                            beforeMove: that.closing
                        });
                    }
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
                ///**
                // * Podání zápočtového listu
                // */
                //private podani(): void {
                //    let that = this;
                //    this.DetailDto = this.DataNovehoPohybu;
                //    this.aktualizaceDetailu(true);
                //    //// naplnění políček
                //    //// TODO: nechat DetailDto nebo to přejmenovat zpátky na model? nějak to dořešit, v kódu totiž používám oboje
                //    //this.findFields()
                //    //    .gfield("model", "apply", this.DetailDto, { initialValues: true })
                //    //    .gfield("model", "validators", this.validators);
                //    //// naplnění gridu předkontací
                //    //if (this.DetailDto) {
                //    //    let view = new Gordic.Data.View([this.DetailDto], { /*key: "ixp,radek_pol,subradek,radek_av"*/ });
                //    //    this.$gridPredkontace.ggrid("setData", view);
                //    //    // vybrání nějaké položky v gridu položek
                //    //    //this.vybraniPolozky();
                //    //}
                //    //// naplnění gridu pohybů je až po rozkliknutí tabu
                //    //// nastavení stavu políček a akcí
                //    //this.enable();
                //    //// nastavení fokusu
                //    //if (setFocus) {
                //    //    if (this.Editace) {
                //    //        GDbd.getElementToFocus(this.element, ".gfield:not(.ui-state-disabled)")?.first().trigger("focus");
                //    //    }
                //    //}
                //    // TODO: dodělat
                //    //return $.Deferred().reject().promise();
                //    //// kontrola na knihu
                //    //if (!that.knihaZadana()) return $.Deferred().reject().promise();
                //    //// TODO: bude nutné řešit výběr knihy v režimu přes více knih (musí to být první část ještě před kontrolou na první doklad) - nebo v tomto režimu podání nepůjde
                //    //// kontrola prvního dokladu v knize
                //    //return that.isl.ZapoctovyList.zkontrolujNaPrvniDokladVKnize({ ixpDen: that.gpc.ixp_den/*IxpDen*//*, subrada: 0*//*that.SubradaDen*/ })
                //    //    .get()
                //    //    .then(function (textDotazu) {
                //    //        // pokud kontrola vrátí dotaz, tak se zeptat, jestli má první doklad správné číslo, jinak je to ok
                //    //        if (textDotazu) return that.dialogs.confirm("jres:24100320", textDotazu).createDialogPromise(GDlg.mbbYes.id); //RC 24100320 : Nový zápočtový list
                //    //        else return $.Deferred().resolve();
                //    //    })
                //    //    .then(function () {
                //    //        // případné sejmutí PIDu
                //    //        // TODO: dořešit, jak používat gin_gen_ixp - buď to dát jako proměnnou (bez globals) nebo to nechat v globals, ale pak musí být ten objekt asi jinak
                //    //        if ((Eko.Utils.GetEkoUserSettingsPidSejmuti(that, (that.gin_gen_ixp === Gordic.Fuc.Globals.Enums.RezimGenIxp.Generovani ? "ano" : "ne")) === "1")) {
                //    //            // sejmutí PIDu
                //    //            //if (that/*Gordic.Fuc.Globals.GFucGlobals*/.gin_gen_ixp === Gordic.Fuc.Globals.Enums.RezimGenIxp.Sejmuti/*.toString()*/ && returnObj.podat) {
                //    //            // režim sejmutí PIDu (ve volaném okně ale je možné PID i vygenerovat)
                //    //            // TODO: generování PIDu v této metodě nejsem schopen zakázat a podací procedura si s tím neporadí
                //    //            // TODO: jde potlačit hláška, že PID již existuje? asi ano a bylo by to žádoucí - asi vlastnost HlaseniPriExistenciVAgende (muselo by se asi přidat , true, false)
                //    //            return Gordic.Wfl.Dialogs.GenerovaniIxp(that, {
                //    //                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                //    //                TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                //    //                DotazPriExistenciVJineAgende: true,
                //    //                HlaseniPriExistenciVAgende: false,
                //    //                ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.Stitkem
                //    //            }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                //    //                .then(function (retVal) {
                //    //                    // pokud se vrátil PID, použiji ho, jinak konec
                //    //                    if (retVal?.Ixp) return retVal.Ixp;
                //    //                    else return $.Deferred().reject();
                //    //                });
                //    //        }
                //    //        // PID se bude generovat (až v podání v dalším kroku)
                //    //        else return $.Deferred().resolve();
                //    //    })
                //    //    .then(function (ixp: string | undefined | null) {
                //    //        // vlastní podání
                //    //        return that.isl.ZapoctovyList.create({
                //    //            ixp: (ixp ?? ""),
                //    //            ixp_den: that.gpc.ixp_den/*IxpDen*/
                //    //        })
                //    //            .getData()
                //    //            .then(function (data) {
                //    //                return data.ixp;
                //    //            });
                //    //    })
                //    //    .done(function (ixp: string | undefined | null) {
                //    //        // vyvolání trigger o aktivní operaci
                //    //        that.trigger(FucDetail.triggerChange, [{ data: { ixp: ixp } }]);
                //    //        // aktualizace dat - vždy znovunačtení detailu, protože se mění PID
                //    //        that.load({
                //    //            Ixp: ixp,
                //    //            NasledujiciDetail: true
                //    //        });
                //    //    })
                //    //    .fail(function () {
                //    //        // obnovení původního stavu
                //    //        if (that.ixpZadan()) {
                //    //            // zobrazení detailu původního PIDu
                //    //            that.load();
                //    //        }
                //    //        else {
                //    //            // zavření okna (vrací se aktuální data)
                //    //            that.close(that.DetailDto);
                //    //        }
                //    //    });
                //}
                /**
                 * Nahrání a zobrazení způsobu zaúčtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadZpz() {
                    let that = this;
                    // nejdříve zjištění ixs_zpz
                    that.beginOperation("jres:24100494"); //RC 24100494 : Probíhá načtení informací
                    return that.isl.Zpz.vratIxsZpz({ radek: that.DetailDto })
                        .get()
                        .then(function (data) {
                        return { ixs_zpz: data };
                    })
                        .then(function (data) {
                        // načtení dat
                        if (data && data.ixs_zpz && data.ixs_zpz > " ") {
                            return that.isl.Zpz.read($.extend(data, { rok_ixe: that.DetailDto.rok /*that.Rok*/ }))
                                .getData()
                                .then(function (data) {
                                return data;
                            });
                        }
                        else
                            return $.Deferred().reject();
                    })
                        .then(function (data) {
                        // dotažení subřady
                        return that.isl.Zpz.vratSubradu({ radek: that.DetailDto })
                            .get()
                            .then(function (subrada) {
                            data.subrada_duz = subrada;
                            return data;
                        });
                    })
                        //.then(function (data) {
                        //    // úprava dat
                        //    // TODO: upravit i položky
                        //    if (data && data.radky && data.radky.length > 0) {
                        //        FucGrid.Zpz.modifyDtoRadky(data.radky)
                        //            .then(function (radky) {
                        //                data!.radky = radky;
                        //                return data;
                        //            });
                        //    }
                        //    else return $.Deferred().resolve(data);
                        //})
                        .then(function (data /*: Fuc.Interface.GZpzDto | undefined*/ /*: { data: Fuc.Interface.GZpzDto | undefined, subrada: number }*/) {
                        // pohled
                        let view = new Gordic.Data.View(data.radky, { key: "ixs_zpz,rok_ixe" });
                        // nastavení dat a překreslení gridu
                        that.$gridZpz.ggrid("setData", view);
                        // naplnění políček v záložce
                        // TODO: v debug režimu zobrazit v názvu i PID: "[" + returnObj.data!.ixs_zpz + "] " + returnObj.data!.nazev
                        //that.findFields().gfield("model", "apply", { zpz_nazev: returnObj.data!.nazev, zpz_subrada: returnObj.subrada }, { initialValues: true });
                        that.findFields().gfield("model", "apply", {
                            zpz_pid: data.ixs_zpz,
                            zpz_kod: data.kod,
                            zpz_nazev: /*(that.contextProp("debugMode") ? "[" + returnObj.data!.ixs_zpz + "] " + returnObj.data!.nazev : */ data.nazev /*)*/,
                            zpz_subrada: data.subrada_duz
                        }, { initialValues: true });
                        return;
                    })
                        .done(function () {
                        // aktualizace okna
                        that.enable();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                    //    // objekt pro předávání hodnot
                    //    interface returnObjType {
                    //        data: Gordic.Fuc.Interface.GZpzDto | null,
                    //        subrada: number | null
                    //    };
                    //    let returnObj: returnObjType = {
                    //        data: null,
                    //        subrada: null,
                    //    };
                    //    // deferred objekt pro zřetězení otázek
                    //    let def = $.Deferred().resolve(returnObj).promise();
                    //    // obsluha jednotlivých fází
                    //    this.beginOperation("jres:24100007"); //RC 24100007 : Načítám data
                    //    def.then(function (returnObj: returnObjType) {
                    //        let def = $.Deferred();
                    //        // TODO: nejdříve zjištění ixs_zpz
                    //        that.isl.Zpz.vratIxsZpz({ radek: that.DetailDto })
                    //            .get()
                    //            .done(function (data) {
                    //                returnObj.data = { ixs_zpz: data };
                    //                def.resolve(returnObj);
                    //            })
                    //            .fail(function () {
                    //                // operace nedopadla
                    //                def.reject();
                    //            });
                    //        return def.promise();
                    //    })
                    //        .then(function (returnObj: returnObjType) {
                    //            let def = $.Deferred();
                    //            // načtení dat
                    //            if (returnObj.data !== null && returnObj.data.ixs_zpz !== null && returnObj.data.ixs_zpz !== undefined && returnObj.data.ixs_zpz > " ") {
                    //                that.isl.Zpz.read($.extend(returnObj.data, { rok_ixe: that.Rok }))
                    //                    .get()
                    //                    .done(function (data) {
                    //                        returnObj.data = data.data;
                    //                        def.resolve(returnObj);
                    //                    })
                    //                    .fail(function () {
                    //                        // operace nedopadla
                    //                        def.reject();
                    //                    });
                    //            }
                    //            else {
                    //                def.resolve(returnObj);
                    //            }
                    //            return def.promise();
                    //        })
                    //        .then(function (returnObj: returnObjType) {
                    //            let def = $.Deferred();
                    //            // dotažení subřady
                    //            that.isl.Zpz.vratSubradu({ radek: that.DetailDto })
                    //                .get()
                    //                .done(function (data) {
                    //                    returnObj.subrada = data;
                    //                    def.resolve(returnObj);
                    //                })
                    //                .fail(function () {
                    //                    // operace nedopadla
                    //                    def.reject();
                    //                });
                    //            return def.promise();
                    //        })
                    //        .then(function (returnObj: returnObjType) {
                    //            let def = $.Deferred();
                    //            // úprava dat
                    //            // TODO: upravit i položky
                    //            if (returnObj.data !== null && returnObj.data.radky !== null && returnObj.data.radky !== undefined) {
                    //                FucGrid.Zpz.modifyDtoRadky(returnObj.data.radky!)
                    //                    .done(function (data) {
                    //                        returnObj.data!.radky = data;
                    //                        def.resolve(returnObj);
                    //                    });
                    //            }
                    //            else {
                    //                def.resolve(returnObj);
                    //            }
                    //            return def.promise();
                    //        })
                    //        .done(function (returnObj: returnObjType) {
                    //            // pohled
                    //            let view = new Gordic.Data.View(returnObj.data!.radky!, { key: "ixs_zpz,rok_ixe" });
                    //            // nastavení dat a překreslení gridu
                    //            that.$gridZpz.ggrid("setData", view);
                    //            // naplnění políček v záložce
                    //            // TODO: v debug režimu zobrazit v názvu i PID: "[" + returnObj.data!.ixs_zpz + "] " + returnObj.data!.nazev
                    //            //that.findFields().gfield("model", "apply", { zpz_nazev: returnObj.data!.nazev, zpz_subrada: returnObj.subrada }, { initialValues: true });
                    //            that.findFields().gfield("model", "apply", {
                    //                zpz_pid: returnObj.data!.ixs_zpz,
                    //                zpz_kod: returnObj.data!.kod,
                    //                zpz_nazev: /*(that.contextProp("debugMode") ? "[" + returnObj.data!.ixs_zpz + "] " + returnObj.data!.nazev : */returnObj.data!.nazev/*)*/,
                    //                zpz_subrada: returnObj.subrada
                    //            }, { initialValues: true });
                    //            // aktualizace okna
                    //            that.enable();
                    //        })
                    //        .always(function () {
                    //            that.endOperation();
                    //        });
                }
                /**
                 * Nahrání a zobrazení účetních zápisů pohybu
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
                            filters: that.DetailDto.JeRezervacni
                                ? {
                                    rezervacni: 1,
                                    z_pohybu: 1,
                                    dok_ixp_upr: that.DetailDto.ixp_upr,
                                    dok_radek_upo: /*(that.DetailDto.MaRezervacni ? that.DetailDto.radek_upo_rez : */ that.DetailDto.radek_upo /*)*/
                                }
                                : {
                                    z_pohybu: 1,
                                    dok_ixp_upr: that.DetailDto.ixp_upr,
                                    dok_radek_upo: that.DetailDto.radek_upo,
                                    dok_radek_zap: that.OtevritKDuplikaci === true && that.ZapisyKDuplikaci != null && that.ZapisyKDuplikaci.length > 0 ? that.ZapisyKDuplikaci : undefined
                                }
                        };
                    })
                        .getData()
                        .then(function (data) {
                        // případná úprava dat v režimu duplikace
                        if (that.OtevritKDuplikaci === true) {
                            data.forEach((radek, i) => {
                                // nový řádek zápisu
                                radek.radek_zap = i + 1;
                                // odstranění dne a měsíce
                                if (radek.den != null)
                                    delete radek["den"];
                                if (radek.mesic != null)
                                    delete radek["mesic"];
                                // otočení znamének částek
                                if (radek.c0 != null && !parseDecimal(radek.c0 ?? 0).eq(0))
                                    radek.c0 = parseDecimal(radek.c0 ?? 0).mul(-1);
                                if (radek.c1 != null && !parseDecimal(radek.c1 ?? 0).eq(0))
                                    radek.c1 = parseDecimal(radek.c1 ?? 0).mul(-1);
                                return radek;
                            });
                        }
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
                 * Nahrání a zobrazení dokladu o zaúčtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadDokladOZauctovani() {
                    let that = this;
                    // TODO: dořešit aktuální rok x rok pohybu - pro jiný natáhnout jinou konfiguraci nebo zobrazení úplně zakázat?
                    // načtení dat hlavičky (pouze pro zobrazení dokladu)
                    that.beginOperation("jres:24100479"); //RC 24100479 : Probíhá načtení dokladů
                    return that.isl.Zapis.listDokladu(rq => { return { filters: { z_pohybu: 1, dok_ixp_upr: that.DetailDto.ixp_upr, dok_radek_upo: that.DetailDto.radek_upo } }; })
                        .getData()
                        .then(function (data) {
                        let view = new Gordic.Data.View(data, { key: "rok,lic,ico,ucs,mesic,ac" });
                        // nastavení dat a překreslení gridu
                        that.$gridDokladOZauc.ggrid("setData", view);
                        return;
                    })
                        .then(function () {
                        // načtení zápisů dokladu
                        let aktDoklad = Gordic.Eko.Grid.currentRow(that.$gridDokladOZauc);
                        if (aktDoklad) {
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
                                let view = new Gordic.Data.View(data, { key: "radek_zap" });
                                // nastavení dat a překreslení gridu
                                that.$gridZapisyDokladuOZauc.ggrid("setData", view);
                                return;
                            });
                        }
                        else {
                            return $.Deferred().resolve();
                        }
                    })
                        .then(function () {
                        // načtení dat dalších pohybů (pouze pro zobrazení dokladu)
                        let aktDoklad = Gordic.Eko.Grid.currentRow(that.$gridDokladOZauc);
                        if (aktDoklad) {
                            if ((aktDoklad.poc_pohybu_dokladu ?? 1) > 1) {
                                // existují další pohyby účtované dokladem
                                return that.isl.FinPohyb.list(rq => {
                                    return {
                                        filters: {
                                            uct_st_doklad: 1,
                                            uct_bez_ixp_upr: that.DetailDto.ixp_upr,
                                            uct_bez_radek_upo: that.DetailDto.radek_upo,
                                            uct_rok: aktDoklad.rok,
                                            uct_lic: aktDoklad.lic,
                                            uct_ico: aktDoklad.ico,
                                            uct_ucs: aktDoklad.ucs,
                                            uct_mesic: aktDoklad.mesic,
                                            uct_ac: aktDoklad.ac
                                        }
                                    };
                                })
                                    .getData()
                                    .then(function (data) {
                                    let view = new Gordic.Data.View(data, { key: "ixp_upr,radek_upo" });
                                    // nastavení dat a překreslení gridu
                                    that.$gridOstPohybyDokladuOZauc.ggrid("setData", view);
                                    return;
                                });
                            }
                            else {
                                // neexistují další pohyby účtované dokladem
                                let view = new Gordic.Data.View([], { key: "ixp_upr,radek_upo" });
                                // nastavení dat a překreslení gridu
                                that.$gridOstPohybyDokladuOZauc.ggrid("setData", view);
                                return $.Deferred().resolve();
                            }
                        }
                        else {
                            return $.Deferred().resolve();
                        }
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
                 * Nahrání a zobrazení rezervačních zápisů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadRezZapisy() {
                    let that = this;
                    // TODO: dořešit aktuální rok x rok pohybu - pro jiný natáhnout jinou konfiguraci nebo zobrazení úplně zakázat? to stejné je v tabu účtování
                    // načtení zápisů
                    that.beginOperation("jres:24100492"); //RC 24100492 : Probíhá načtení zápisů
                    return that.isl.Zapis.list(rq => {
                        return {
                            filters: {
                                rezervacni: 1,
                                dok_ixp_upr: that.DetailDto.ixp_upr,
                                dok_radek_upo: (that.DetailDto.MaRezervacni ? [that.DetailDto.radek_upo_rez, that.DetailDto.radek_upo] : that.DetailDto.radek_upo)
                            }
                        };
                    })
                        .getData()
                        .then(function (data) {
                        // pohled
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
                 * Nahrání a zobrazení navázaných pohybů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadNavazanePohyby() {
                    let that = this;
                    // načtení dat zápisů
                    let filters = null;
                    // filtry podle typu zobrazení (vždy buď přímo z pohybu nebo z navázaného rezervačního)
                    if (that.DetailDto.JeUcetni) {
                        // navázaný rezervační
                        if (that.DetailDto.MaRezervacni) {
                            filters = {
                                ixp_upr: that.DetailDto.ixp_upr,
                                radek_upo: that.DetailDto.radek_upo_rez
                            };
                        }
                    }
                    else {
                        // navázané účetní
                        filters = {
                            ixp_upr: that.DetailDto.ixp_upr,
                            radek_upo_rez: that.DetailDto.radek_upo
                        };
                    }
                    // načtení pohybů
                    if (filters) {
                        that.beginOperation("jres:24100480"); //RC 24100480 : Probíhá načtení pohybů
                        return that.isl.FinPohyb.list(rq => { return { filters: filters }; })
                            .getData()
                            .then(function (data) {
                            // pohled
                            let view = new Gordic.Data.View(data, { key: "ixp_upr,radek_upo" });
                            // nastavení dat a překreslení gridu
                            that.$gridNavazanePohyby.ggrid("setData", view);
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
                 * Nahrání a zobrazení bankovního výpisu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadVypis() {
                    let that = this;
                    // načtení dat
                    // TODO: připad položku
                    that.beginOperation("jres:24100495"); //RC 24100495 : Probíhá načtení výpisu
                    return that.isl.BankovniVypis.read({ ixp: that.DetailDto.ixp_bvp, polozky: [{ radek_pol: that.DetailDto.radek_bvp, subradek: that.DetailDto.subradek_bvp, radek_av: that.DetailDto.radek_av_bvp }] })
                        .getData()
                        .then(function (data) {
                        // zadefinování tabu podle aktuálních dat
                        // TODO: zadefinovat typy?
                        let dtoBvp = data;
                        let dtoBvpPol = (data && data.polozky && data.polozky.length > 0 ? data.polozky[0] : null);
                        let dtoBvpPolRoz = (data && data.polozky && data.polozky.length > 1 ? data.polozky[1] : null);
                        let vals = {};
                        let form = new Gordic.Forms.Form({ name: "formVypis" })
                            .addSection("")
                            // TODO: jeden z bankovních výpisů smazat a dočistit i apply níže
                            .addRow("jres:24100074").addField("gstringbox", { disabled: true, name: "bvp_txt" }); //RC 24100074 : Bankovní výpis
                        //.addRow("Bankovní výpis").addField("gselectbox", Gordic.Prefabs.Select.bucspid(), { /*disabled: true, */name: "bvp", model: "bvp_ixp=ixp"/*;bvp_bu_vl=bu_vl;bvp_sk_vl=sk_vl;bvp_rok_pid=rok_pid;bvp_cis_pid=cis_pid;bvp_dat_nov_zus=dat_nov_zus"*/ })
                        if (dtoBvp !== null) {
                            $.extend(vals, {
                                // TODO: pokud to zůstane, tak text dát do resource
                                bvp_txt: "bú {0}/{1}, číslo {2}/{3} z {4}".format(dtoBvp.bu_vl, dtoBvp.sk_vl, dtoBvp.rok_pid, dtoBvp.cis_pid, Gordic.Templates.Formatters.datetime(dtoBvp.dat_nov_zus, "d. M. yyyy"))
                                //bvp_ixp: dtoBvp.ixp,
                                //bvp_bu_vl: dtoBvp.bu_vl,
                                //bvp_sk_vl: dtoBvp.sk_vl,
                                //bvp_rok_pid: dtoBvp.rok_pid,
                                //bvp_cis_pid: dtoBvp.cis_pid,
                                //bvp_dat_nov_zus: dtoBvp.dat_nov_zus,
                            });
                        }
                        if (dtoBvpPol !== null) {
                            form
                                .addSection("Položka")
                                .addRow("Stav položky").addField("gselectbox", Gordic.Prefabs.Select.buccspo(), { disabled: true, name: "bvp_pol_s_pol", model: "bvp_pol_s_pol=s_pol" })
                                .addRow("jres:24100084").addField("gdatebox", { disabled: true, name: "bvp_pol_dat_zap" }) //RC 24100084 : Datum zaplacení
                                .addRow("jres:24100081").addField("gstringbox", { disabled: true, name: "bvp_pol_bu_ci_txt" }) //RC 24100081 : Bankovní účet cizí
                                .addPrefab(WebClient.FucDetail.prefabVsKsSs("bvp_pol_"))
                                .addRow("jres:24100082").addField("gnumberbox", "w-8", Gordic.Prefabs.Number.currency(), { disabled: true, name: "bvp_pol_c_mena" }).addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekocmen(), { disabled: true, name: "bvp_pol_mena", model: "bvp_pol_mena=mena" }) //RC 24100082 : Částka v měně
                                .addRow("jres:24100083").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "bvp_pol_c" }); //RC 24100083 : Částka v CZK
                            $.extend(vals, {
                                bvp_pol_s_pol: dtoBvpPol.s_pol,
                                bvp_pol_dat_zap: dtoBvpPol.dat_zap,
                                bvp_pol_bu_ci_txt: dtoBvpPol.bu_ci_txt,
                                bvp_pol_vs: dtoBvpPol.vs,
                                bvp_pol_ss: dtoBvpPol.ss,
                                bvp_pol_ks: dtoBvpPol.ks,
                                bvp_pol_c_mena: dtoBvpPol.c_mena,
                                bvp_pol_mena: dtoBvpPol.mena,
                                bvp_pol_c: dtoBvpPol.c
                            });
                        }
                        if (dtoBvpPolRoz !== null) {
                            form
                                .addSection("Rozepsaná položka")
                                .addRow("Stav položky").addField("gselectbox", Gordic.Prefabs.Select.buccspo(), { disabled: true, name: "bvp_pol_roz_s_pol", model: "bvp_pol_roz_s_pol=s_pol" })
                                .addRow("jres:24100084").addField("gdatebox", { disabled: true, name: "bvp_pol_roz_dat_zap" }) //RC 24100084 : Datum zaplacení
                                .addRow("jres:24100081").addField("gstringbox", { disabled: true, name: "bvp_pol_roz_bu_ci_txt" }) //RC 24100081 : Bankovní účet cizí
                                .addPrefab(WebClient.FucDetail.prefabVsKsSs("bvp_pol_roz_"))
                                .addRow("jres:24100082").addField("gnumberbox", "w-8", Gordic.Prefabs.Number.currency(), { disabled: true, name: "bvp_pol_roz_c_mena" }).addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekocmen(), { disabled: true, name: "bvp_pol_roz_mena", model: "bvp_pol_roz_mena=mena" }) //RC 24100082 : Částka v měně
                                .addRow("jres:24100083").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "bvp_pol_roz_c" }); //RC 24100083 : Částka v CZK
                            $.extend(vals, {
                                bvp_pol_roz_s_pol: dtoBvpPolRoz.s_pol,
                                bvp_pol_roz_dat_zap: dtoBvpPolRoz.dat_zap,
                                bvp_pol_roz_bu_ci_txt: dtoBvpPolRoz.bu_ci_txt,
                                bvp_pol_roz_vs: dtoBvpPolRoz.vs,
                                bvp_pol_roz_ss: dtoBvpPolRoz.ss,
                                bvp_pol_roz_ks: dtoBvpPolRoz.ks,
                                bvp_pol_roz_c_mena: dtoBvpPolRoz.c_mena,
                                bvp_pol_roz_mena: dtoBvpPolRoz.mena,
                                bvp_pol_roz_c: dtoBvpPolRoz.c
                            });
                        }
                        let $tabForm = $.newDiv().appendTo(that.$tabVypis).gform("createFrom", form);
                        // naplnění polí
                        // TODO: kontrolovat, jestli se výpis skutečně vyselektoval? kvůli bvp_txt
                        $tabForm.findFields().gfield("model", "apply", vals, { initialValues: true });
                        return;
                    })
                        .done(function () {
                        // aktualizace okna
                        that.enable();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                    //    let that = this;
                    //    // objekt pro předávání hodnot
                    //    interface returnObjType {
                    //        data: Gordic.Fuc.Interface.GBankovniVypisDto | null
                    //    };
                    //    let returnObj: returnObjType = {
                    //        data: null
                    //    };
                    //    // deferred objekt pro zřetězení otázek
                    //    let def = $.Deferred().resolve(returnObj).promise();
                    //    // obsluha jednotlivých fází
                    //    this.beginOperation("jres:24100007"); //RC 24100007 : Načítám data
                    //    def.then(function (returnObj: returnObjType) {
                    //        let def = $.Deferred();
                    //        // načtení dat
                    //        // TODO: připad položku
                    //        that.isl.BankovniVypis.read({ ixp: that.DetailDto.ixp_bvp, polozky: [{ radek_pol: that.DetailDto.radek_bvp, subradek: that.DetailDto.subradek_bvp, radek_av: that.DetailDto.radek_av_bvp }] })
                    //            .get()
                    //            .done(function (data) {
                    //                returnObj.data = data.data;
                    //                def.resolve(returnObj);
                    //            })
                    //            .fail(function () {
                    //                // operace nedopadla
                    //                def.reject();
                    //            });
                    //        return def.promise();
                    //    })
                    //        //.then(function (returnObj: returnObjType) {
                    //        //    let def = $.Deferred();
                    //        //    // úprava dat
                    //        //    // TODO: upravit i položky
                    //        //    if (returnObj.data !== null && returnObj.data.polozky !== null && returnObj.data.polozky !== undefined) {
                    //        //        FucGrid.BankovniVypis.modifyDtoPolozek(returnObj.data.polozky!)
                    //        //            .done(function (data) {
                    //        //                returnObj.data!.polozky = data;
                    //        //                def.resolve(returnObj);
                    //        //            });
                    //        //    }
                    //        //    else {
                    //        //        def.resolve(returnObj);
                    //        //    }
                    //        //    return def.promise();
                    //        //})
                    //        .done(function (returnObj: returnObjType) {
                    //            // zadefinování tabu podle aktuálních dat
                    //            // TODO: zadefinovat typy?
                    //            let dtoBvp: Gordic.Fuc.Interface.GBankovniVypisDto | null = returnObj.data;
                    //            let dtoBvpPol: Gordic.Fuc.Interface.GPolozkaBankovnihoVypisuDto | null = (returnObj.data !== null && returnObj.data.polozky !== null && returnObj.data.polozky!.length > 0 ? returnObj.data.polozky![0] : null);
                    //            let dtoBvpPolRoz: Gordic.Fuc.Interface.GPolozkaBankovnihoVypisuDto | null = (returnObj.data !== null && returnObj.data.polozky !== null && returnObj.data.polozky!.length > 1 ? returnObj.data.polozky![1] : null);
                    //            let vals = {};
                    //            let form = new Gordic.Forms.Form({ name: "formVypis" })
                    //                .addSection("")
                    //                // TODO: jeden z bankovních výpisů smazat a dočistit i apply níže
                    //                .addRow("Bankovní výpis").addField("gstringbox", { disabled: true, name: "bvp_txt" });
                    //            //.addRow("Bankovní výpis").addField("gselectbox", Gordic.Prefabs.Select.bucspid(), { /*disabled: true, */name: "bvp", model: "bvp_ixp=ixp"/*;bvp_bu_vl=bu_vl;bvp_sk_vl=sk_vl;bvp_rok_pid=rok_pid;bvp_cis_pid=cis_pid;bvp_dat_nov_zus=dat_nov_zus"*/ })
                    //            if (dtoBvp !== null) {
                    //                $.extend(vals, {
                    //                    // TODO: pokud to zůstane, tak text dát do resource
                    //                    bvp_txt: "bú {0}/{1}, číslo {2}/{3} z {4}".format(dtoBvp.bu_vl!, dtoBvp.sk_vl!, dtoBvp.rok_pid!, dtoBvp.cis_pid!, Gordic.Templates.Formatters.datetime(dtoBvp.dat_nov_zus!, "d. M. yyyy"))
                    //                    //bvp_ixp: dtoBvp.ixp,
                    //                    //bvp_bu_vl: dtoBvp.bu_vl,
                    //                    //bvp_sk_vl: dtoBvp.sk_vl,
                    //                    //bvp_rok_pid: dtoBvp.rok_pid,
                    //                    //bvp_cis_pid: dtoBvp.cis_pid,
                    //                    //bvp_dat_nov_zus: dtoBvp.dat_nov_zus,
                    //                });
                    //            }
                    //            if (dtoBvpPol !== null) {
                    //                form
                    //                    .addSection("Položka")
                    //                    .addRow("Stav položky").addField("gselectbox", Gordic.Prefabs.Select.buccspo(), { disabled: true, name: "bvp_pol_s_pol", model: "bvp_pol_s_pol=s_pol" })
                    //                    .addRow("jres:24100084").addField("gdatebox", { disabled: true, name: "bvp_pol_dat_zap" }) //RC 24100084 : Datum zaplacení
                    //                    .addRow("jres:24100081").addField("gstringbox", { disabled: true, name: "bvp_pol_bu_ci_txt" }) //RC 24100081 : Bankovní účet cizí
                    //                    .addPrefab(FucDetail.prefabVsKsSs("bvp_pol_"))
                    //                    .addRow("jres:24100082").addField("gnumberbox", "w-8", Gordic.Prefabs.Number.currency(), { disabled: true, name: "bvp_pol_c_mena" }).addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekocmen(), { disabled: true, name: "bvp_pol_mena", model: "bvp_pol_mena=mena" }) //RC 24100082 : Částka v měně
                    //                    .addRow("jres:24100083").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "bvp_pol_c" }); //RC 24100083 : Částka v CZK
                    //                $.extend(vals, {
                    //                    bvp_pol_s_pol: dtoBvpPol.s_pol,
                    //                    bvp_pol_dat_zap: dtoBvpPol.dat_zap,
                    //                    bvp_pol_bu_ci_txt: dtoBvpPol.bu_ci_txt,
                    //                    bvp_pol_vs: dtoBvpPol.vs,
                    //                    bvp_pol_ss: dtoBvpPol.ss,
                    //                    bvp_pol_ks: dtoBvpPol.ks,
                    //                    bvp_pol_c_mena: dtoBvpPol.c_mena,
                    //                    bvp_pol_mena: dtoBvpPol.mena,
                    //                    bvp_pol_c: dtoBvpPol.c
                    //                });
                    //            }
                    //            if (dtoBvpPolRoz !== null) {
                    //                form
                    //                    .addSection("Rozepsaná položka")
                    //                    .addRow("Stav položky").addField("gselectbox", Gordic.Prefabs.Select.buccspo(), { disabled: true, name: "bvp_pol_roz_s_pol", model: "bvp_pol_roz_s_pol=s_pol" })
                    //                    .addRow("jres:24100084").addField("gdatebox", { disabled: true, name: "bvp_pol_roz_dat_zap" }) //RC 24100084 : Datum zaplacení
                    //                    .addRow("jres:24100081").addField("gstringbox", { disabled: true, name: "bvp_pol_roz_bu_ci_txt" }) //RC 24100081 : Bankovní účet cizí
                    //                    .addPrefab(FucDetail.prefabVsKsSs("bvp_pol_roz_"))
                    //                    .addRow("jres:24100082").addField("gnumberbox", "w-8", Gordic.Prefabs.Number.currency(), { disabled: true, name: "bvp_pol_roz_c_mena" }).addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekocmen(), { disabled: true, name: "bvp_pol_roz_mena", model: "bvp_pol_roz_mena=mena" }) //RC 24100082 : Částka v měně
                    //                    .addRow("jres:24100083").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "bvp_pol_roz_c" }); //RC 24100083 : Částka v CZK
                    //                $.extend(vals, {
                    //                    bvp_pol_roz_s_pol: dtoBvpPolRoz.s_pol,
                    //                    bvp_pol_roz_dat_zap: dtoBvpPolRoz.dat_zap,
                    //                    bvp_pol_roz_bu_ci_txt: dtoBvpPolRoz.bu_ci_txt,
                    //                    bvp_pol_roz_vs: dtoBvpPolRoz.vs,
                    //                    bvp_pol_roz_ss: dtoBvpPolRoz.ss,
                    //                    bvp_pol_roz_ks: dtoBvpPolRoz.ks,
                    //                    bvp_pol_roz_c_mena: dtoBvpPolRoz.c_mena,
                    //                    bvp_pol_roz_mena: dtoBvpPolRoz.mena,
                    //                    bvp_pol_roz_c: dtoBvpPolRoz.c
                    //                });
                    //            }
                    //            let $tabForm = $.newDiv().appendTo(that.$tabVypis).gform("createFrom", form);
                    //            // naplnění polí
                    //            // TODO: kontrolovat, jestli se výpis skutečně vyselektoval? kvůli bvp_txt
                    //            $tabForm.findFields().gfield("model", "apply", vals, { initialValues: true });
                    //        })
                    //        .always(function () {
                    //            that.endOperation();
                    //        });
                }
                /**
                 * Nahrání a zobrazení položek IISSP
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadIissp() {
                    let that = this;
                    // načtení položek
                    that.beginOperation("jres:24100494"); //RC 24100494 : Probíhá načtení informací
                    return that.isl.Iissp.listPolozek(rq => { return { filters: { id_hdr_ris: that.DetailDto.id_hdr_ris, radek_hdr: that.DetailDto.radek_hdr } }; })
                        .getData()
                        .then(function (data) {
                        // pohled
                        let view = new Gordic.Data.View(data, { key: "ixs_hpr,radek_gin,subradek_gin" });
                        // nastavení dat a překreslení gridu
                        that.$gridPolozkyIissp.ggrid("setData", view);
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
                 * Vytvoření nového pohybu zduplikováním aktuálního pohybu a otočením znaménka
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                novyPohyb() {
                    let that = this;
                    let dlg = WebClient.FucDetail.simpleFormOkCancel(that, new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1, L-2-10-0, M-2-10-0, S-12-12-0" })
                        .addSection({ layoutDescriptor: "L1M1S1, L-12-12-0, M-12-12-0, S-12-12-0" })
                        .addText("jres:24100486") //RC 24100486 : Vytvoření nového pohybu kopií s úpravami podle níže uvedených parametrů
                        .addSection()
                        .addRow("jres:24100294").addField("gstringbox", { name: "duvod", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()] }) //RC 24100294 : Důvod
                        .addSection("jres:24100490") //RC 24100490 : Parametry pohybu
                        .addRow().addField("gcheck", { name: "typ_upo_rucni", label: "jres:24100487", disabled: true }) //RC 24100487 : typ pohybu Ruční
                        .addRow().addField("gcheck", { name: "opacne_znam", label: "jres:24100488", disabled: true }) //RC 24100488 : opačná znaménka částek
                        .addSection("jres:24100491") //RC 24100491 : Zápisy
                        .addRow().addField("gcheck", { name: "opacne_znam", label: "jres:24100489", disabled: true }) //RC 24100489 : zkopírovat vybrané zápisy (s opačnými znaménky částek)
                    , {
                        typ_upo_rucni: true,
                        opacne_znam: true,
                        kopirovat_zapisy: true
                    }, that.actions.actNovyPohyb.caption, 650, 600);
                    let $gridZapisy = $.newDiv()
                        .appendTo(dlg)
                        .ggrid({
                        name: "gridZapisy",
                        columnMode: "full",
                        multi: true,
                        // TODO: upravit:
                        //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                        columns: WebClient.FucGrid.Zapis.createGridFormatN(that, { drd: true, datum: true, dph: true })
                    })
                        .gautofit( //{
                    //resizersOnTab: false
                    /*}*/ );
                    return $.Deferred().resolve().promise()
                        .then(function () {
                        return /*const prom = */ that.isl.Zapis.list(rq => {
                            return {
                                filters: that.DetailDto.JeRezervacni
                                    ? {
                                        rezervacni: 1,
                                        z_pohybu: 1,
                                        dok_ixp_upr: that.DetailDto.ixp_upr,
                                        dok_radek_upo: /*(that.DetailDto.MaRezervacni ? that.DetailDto.radek_upo_rez : */ that.DetailDto.radek_upo /*)*/
                                    }
                                    : {
                                        z_pohybu: 1,
                                        dok_ixp_upr: that.DetailDto.ixp_upr,
                                        dok_radek_upo: that.DetailDto.radek_upo
                                    }
                            };
                        })
                            .getData()
                            .then(function (data) {
                            // zobrazení zápisů
                            let view = new Gordic.Data.View(data, { key: "ixp_upr,radek_upo,radek_zap" });
                            // nastavení dat a překreslení gridu
                            $gridZapisy.ggrid("setData", view);
                            // označení všech řádků
                            let dat = view.getDataRows(true, "data") || [];
                            dat.forEach((i) => { i.checked = true; return i; });
                            view.updateData(dat, "update");
                            return;
                        });
                    })
                        .then(function () {
                        return dlg
                            .createDialogPromise((dialogReturnValue) => { return dialogReturnValue ? true : false; })
                            .then(function (data) {
                            let zaznamy = $gridZapisy.ggrid("getSelection", true);
                            // příznak aktivní operace
                            let needRefresh = false;
                            // otevření detailu nového pohybu
                            let $detailWindow = that.navigate(["Gordic.Fuc.WebClient.GDetailPohybu"], {
                                ID: 'DetailPohybu#',
                                IxpUpr: that.IxpUpr,
                                RadekUpo: that.RadekUpo,
                                // parametry duplikování
                                OtevritKDuplikaci: true,
                                ZapisyKDuplikaci: zaznamy.filter(r => r.checked && r.data?.radek_zap != null && r.data.radek_zap > 0).map(r => r.data.radek_zap),
                                DuvodKDuplikaci: data.duvod
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
                            return $detailWindow.createDialogPromise()
                                .then(function () {
                                if (needRefresh)
                                    return;
                                else
                                    return $.Deferred().reject();
                            });
                        });
                    });
                    // aktualizace dat - raději se provádí vždy, protože se mohl pohyb změnit na poloautomatický, i když nebylo zaúčtováno
                    // TODO: při zrušení nedělat reload? resp. pokud nebyl nový pohyb uložen. možná není potřeba dělat reload nikdy, protože nový pohyb nijak neovlivní tento pohyb
                    //return prom.always(() => { return that.setActiveOperationAndReloadData(); });
                }
                /**
                 * Účtování účetního pohybu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                uctovani() {
                    let that = this;
                    // průvodce pro účtování
                    const prom = this.call("VlozitDoPracSeznamu")
                        .then(function (ikc) {
                        // okno účtování
                        return that.navigate("Gordic.Fuc.WebClient.GUctovaniPohybu", {
                            ID: 'UctovaniPohybu#',
                            Ikc: ikc,
                            // TODO: dořešit parametry
                            //TypUctovani: Gordic.Fuc.Globals.Enums.TypUct.Jednotlive,
                            //KumulovatZaIxp: false,
                            //PevTypUctovani: undefined,
                            PevTypUctAno: false,
                            UctPoh: that.DetailDto.uct_poh
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
                        .then(function (complete) {
                        // ukončení podle toho, jestli průvodce došel až nakonec nebo ne
                        if (complete === true)
                            return true;
                        else
                            return $.Deferred().reject();
                    });
                    // aktualizace dat - raději se provádí vždy, protože se mohl pohyb změnit na poloautomatický, i když nebylo zaúčtováno
                    return prom.always(() => { return that.setActiveOperationAndReloadData(); });
                }
                /**
                 * Rezervace / odrezervace rezervačního pohybu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                rezervace() {
                    let that = this;
                    // pomocná metoda pro případnou změnu parametrů účtování
                    //let RepeatOnException = function (conditionalRequestModification) {
                    //    let recursiveCall = function (request, next, ctx) {
                    //        return next(request).catch((excInfo) =>
                    //            conditionalRequestModification(excInfo).then(
                    //                (changereq) => (changereq ? recursiveCall(($ as any).deepExtendWoArray({}, request, changereq), next, ctx) : $.Deferred().reject(excInfo)),
                    //                () => $.Deferred().reject(excInfo).promise())
                    //        );
                    //    }
                    //    return recursiveCall;
                    //}
                    return WebClient.FucDetail.runIslActionWithConfirm(this, this.DetailDto.JeZauctovany
                        ? "jres:24100422" //RC 24100422 : Opravdu chcete odrezervovat pohyb?
                        : "jres:24100423", //RC 24100423 : Opravdu chcete zarezervovat pohyb?
                    // TODO: dořešit kontrolu na přečerpání
                    () => {
                        return that.isl.FinPohyb.rezervuj({ rows: [that.DetailDto], rezervovat: !that.DetailDto.JeZauctovany, bez_kontroly_na_precerpani: that.NekontrolovatPrecerpani })
                            .use(WebClient.FucUtils.repeatOnException((excInfo) => {
                            if (excInfo?.data?.precerpani && that.MoznostPrecerpani) {
                                excInfo.handled = true;
                                return that.dialogs.confirm(WebClient.FucUtils.getExcInfoMessage(excInfo, true), 600)
                                    .createDialogPromise(GDlg.mbbYes.id)
                                    .then(() => { return { bez_kontroly_na_precerpani: true }; });
                            }
                            else
                                return $.Deferred().reject(excInfo).promise();
                        }));
                    }, () => { return that.setActiveOperationAndReloadData(); }, that.DetailDto.JeZauctovany ? this.actions.actOdrezervace : this.actions.actRezervace);
                }
                /**
                 * Storno / zrušení storna
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                storno() {
                    let that = this;
                    // zjištění otevřených měsíců
                    return WebClient.FucUtils.getOpenMonths(that, that.Rok)
                        .then(function (data) {
                        return WebClient.FucDetail.runIslActionWithForm(that, {
                            form: WebClient.FucGrid.Pohyb.getFormStorno(!that.DetailDto.JeStornovany, that.Rok, [that.DetailDto], that.DetailDto.JeStornovany
                                ? "jres:24100297" //RC 24100297 : Opravdu chcete zrušit storno pohybu?
                                : "jres:24100298", //RC 24100298 : Opravdu chcete stornovat pohyb?
                            /*{ layoutDescriptor: "L1M1S1 LMS-2-10-0" }*/
                            data.monthMin, data.monthMax),
                            data: { rok: that.Rok },
                            height: 350
                        }, (data) => {
                            return that.isl.FinPohyb.stornuj({
                                ikc: "0",
                                stornovat: !that.DetailDto.JeStornovany,
                                // nový den (vezme se pouze v případě, že je stornován zaúčtovaný pohyb)
                                den: (data != null && data.den != null && data.den > 0 ? data.den : null),
                                // nový měsíc (vezme se pouze v případě, že je stornován zaúčtovaný pohyb)
                                mesic: (data != null && data.mesic != null && data.mesic > 0 ? data.mesic : null),
                                // nový rok (vezme se pouze v případě, že je stornován zaúčtovaný pohyb)
                                rok: (data != null ? data.rok : null),
                                // nový měsíc DPH (vezme se pouze v případě, že je stornován zaúčtovaný pohyb)
                                mesic_dph: (data != null && data.mesic_dph != null && (data.mesic_dph > 0 || data.mesic_dph === 0) ? data.mesic_dph : null),
                                // nový rok DPH (vezme se pouze v případě, že je stornován zaúčtovaný pohyb)
                                rok_dph: (data != null && data.rok_dph != null && (data.rok_dph > 0 || data.rok_dph === 0) ? data.rok_dph : null),
                                // důvod operace
                                duvod: (data != null && data.duvod != null ? data.duvod : "jres:24100301"), //RC 24100301 : nezadán
                                rows: [that.DetailDto]
                            });
                        }, () => { return that.setActiveOperationAndReloadData(); }, that.DetailDto.JeStornovany ? that.actions.actZrusitStorno : that.actions.actStorno);
                    });
                }
                ///**
                // * Změna účetních parametrů
                // */
                //private ucetniParametry(): void {
                //    let that = this;
                //    //// průvodce pro změnu účetních prametrů pohybů
                //    //FucDetail.callOtherContent(that, "GZmenaUcetnichParametruPohybu",
                //    //    { methodCalledIfSuccess: () => { that.setActiveOperationAndReloadData(); } },
                //    //    { ID: 'ZmenaUcetnichParametruPohybu#', }
                //    //);
                //    //// účetní parametry
                //    //const newSUpo = (that.DetailDto.s_upo === Gordic.Fuc.Globals.Enums.SUpo.Zauctovany ? Gordic.Fuc.Globals.Enums.SUpo.Nezauctovany : Gordic.Fuc.Globals.Enums.SUpo.Zauctovany);
                //    //const newSSto = (that.DetailDto.s_sto === Gordic.Fuc.Globals.Enums.SSto.Nestornovano ? Gordic.Fuc.Globals.Enums.SSto.Storno : Gordic.Fuc.Globals.Enums.SSto.Nestornovano);
                //    //FucDetail.simpleFormOkCancel(
                //    //    that,
                //    //    new Gordic.Forms.Form({ name: "wizParams" })
                //    //        .addSection()
                //    //        .addRow().addField("gcheck", { name: "zmenit_s_upo", label: "změnit stav pohybu na:" })
                //    //        .addField("gselectbox", Gordic.Prefabs.Select.fuccsuo(), { name: "nove_s_upo", model: "nove_s_upo=s_upo", serverFilters: { s_upo: [newSUpo] }, defaultValue: null, disabled: true })
                //    //        .addRow().addField("gcheck", { name: "zmenit_s_sto", label: "změnit stav storna na:" })
                //    //        .addField("gselectbox", Gordic.Prefabs.Select.ekocsto(), { name: "nove_s_sto", model: "nove_s_sto=s_sto", serverFilters: { s_sto: [newSSto] }, defaultValue: null, disabled: true })
                //    //        .addRow("Důvod").addField("gstringbox", { name: "duvod", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()] }),
                //    //    { nove_s_upo: newSUpo, nove_s_sto: newSSto },
                //    //    "jres:24100234", //RC 24100234 : Servisní změna stavů pohybu
                //    //    500,
                //    //    350)
                //    //    // TODO: dořešit použití createDialogPromise - jestli používat a jak se zadá podmínka na ok (je-li potřeba) a případně formát dat
                //    //    .createDialogPromise(/*"close"*//*"yes"*//*"ok"*//*, { duvod: string }*/)
                //    //    .then(function (data: {
                //    //        duvod: string | null,
                //    //        zmenit_s_upo: boolean | null,
                //    //        zmenit_s_sto: boolean | null,
                //    //        nove_s_upo: number | null,
                //    //        nove_s_sto: number | null
                //    //    }) {
                //    //        // volání servisní změny stavu
                //    //        that.isl.FinPohyb.servisneZmenStavy({
                //    //            ikc: "0",
                //    //            zmenit_s_upo: data?.zmenit_s_upo,
                //    //            zmenit_s_sto: data?.zmenit_s_sto,
                //    //            puvodni_s_upo: that.DetailDto.s_upo,
                //    //            puvodni_s_sto: that.DetailDto.s_sto,
                //    //            nove_s_upo: (data != null && data.nove_s_upo != null && (data.nove_s_upo > 0 || data.nove_s_upo === 0) ? data.nove_s_upo : null),
                //    //            nove_s_sto: (data != null && data.nove_s_sto != null && (data.nove_s_sto > 0 || data.nove_s_sto === 0) ? data.nove_s_sto : null),
                //    //            //nove_s_upo: data?.zmenit_s_upo ? (that.DetailDto.s_upo === Gordic.Fuc.Globals.Enums.SUpo.Zauctovany ? Gordic.Fuc.Globals.Enums.SUpo.Nezauctovany : Gordic.Fuc.Globals.Enums.SUpo.Zauctovany) : null,
                //    //            //nove_s_sto: data?.zmenit_s_sto ? (that.DetailDto.s_sto === Gordic.Fuc.Globals.Enums.SSto.Nestornovano ? Gordic.Fuc.Globals.Enums.SSto.Storno : Gordic.Fuc.Globals.Enums.SSto.Nestornovano) : null,
                //    //            duvod: (data != null && data.duvod != null ? data.duvod : "jres:24100301"), //RC 24100301 : nezadán
                //    //            rows: [that.DetailDto]
                //    //        })
                //    //            .get()
                //    //            .done(function (ret) {
                //    //                that.DetailDto.JeStornovany ? that.actions.actZrusitStorno!.setPending(100) : that.actions.actStorno!.setPending(100);
                //    //                that.setActiveOperationAndReloadData();
                //    //            });
                //    //    });
                //}
                /**
                 * Uložení pohybu
                 *
                 * @param {boolean} fromClosing (default = false) způsob volání (false = standardní uložení tlačítkem, true = ze zavření detailu s neuloženými daty)
                 * @returns {JQueryPromise<any>} promise
                 */
                ulozeni(fromClosing = false) {
                    let that = this;
                    // validace formuláře (pouze v js bez serveru)
                    // TODO: bude potřeba doplnit ještě další validace podle WinClienta
                    // TODO: ta kontrola podle validátorů z DTO možná nějak nefunguje - ještě vyzkoušet, protože v okně pro částky validátory normálně fungují
                    if (!this.element.findForms().gform("isValid"))
                        return $.Deferred().reject().promise();
                    // sebrání hodnot z formuláře
                    let aktData = {};
                    this.findFields().gfield("model", "collect", aktData);
                    // volání uložení
                    let prom = null;
                    if (!this.OtevritKDuplikaci) {
                        // aktualizace existujícího pohybu
                        prom = that.isl.FinPohyb.update({
                            ixp_upr: that.IxpUpr,
                            radek_upo: that.RadekUpo,
                            den: aktData.den,
                            mesic: aktData.mesic,
                            rok: aktData.rok,
                            subrada_duz: aktData.subrada_duz,
                            popis_upo: aktData.popis_upo,
                            dat_zmena: that.DetailDto.dat_zmena,
                            // TODO: tyto hodnoty se předávají jen kvůli tomu, aby byly naplněny povinné položky podle definice DTO, tj. na pohybu v databázi se neukládají
                            ktg_upo: aktData.ktg_upo ?? that.DetailDto.ktg_upo,
                            typ_upo: aktData.typ_upo ?? that.DetailDto.typ_upo,
                            s_upo: aktData.s_upo ?? that.DetailDto.s_upo,
                            c_upo: aktData.c_upo ?? that.DetailDto.c_upo,
                            znam: aktData.znam ?? that.DetailDto.znam,
                            s_sto: aktData.s_sto ?? that.DetailDto.s_sto,
                            dat_upo: aktData.dat_upo ?? that.DetailDto.dat_upo,
                            typ_upr: aktData.typ_upr ?? that.DetailDto.typ_upr,
                            priz_dd: aktData.priz_dd ?? that.DetailDto.priz_dd,
                            mena: aktData.mena ?? that.DetailDto.mena,
                            c_mena: aktData.c_mena ?? that.DetailDto.c_mena
                        })
                            .get();
                        //.done(function () {
                        //    // TODO: zpracovávat výsledek?
                        //    // úspěšně dokončeno
                        //    if (!fromClosing) that.actions.actUlozeni!.setPending(100);
                        //})
                        //.fail(function () {
                        //    // skončilo chybou
                        //    if (!fromClosing) that.actions.actUlozeni!.setPending(-1);
                        //});
                    }
                    else {
                        // založení nového (duplikování) pohybu
                        prom = that.isl.FinPohyb.duplikuj({
                            ikc: "0",
                            duvod: (that.DuvodKDuplikaci != null && that.DuvodKDuplikaci != "" ? that.DuvodKDuplikaci : "jres:24100301"), // RC 24100301: nezadán
                            radek_zap: that.ZapisyKDuplikaci,
                            rows: [that.DetailDto]
                        })
                            .get()
                            .then(function (data) {
                            if (data?.result?.data?.radek_upo != null && data.result.data.radek_upo > 0) {
                                // nový pohyb vznikl
                                that.RadekUpo = data.result.data.radek_upo;
                                that.OtevritKDuplikaci = false;
                            }
                            return;
                        });
                    }
                    // aktualizace dat
                    return prom.then(() => { return that.setActiveOperationAndReloadData(fromClosing); });
                }
                /**
                 * Oprava pohybu
                 */
                oprava() {
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
                 * Servisní nástroje
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                servis() {
                    let that = this;
                    const newSUpo = (that.DetailDto.s_upo === Gordic.Fuc.Globals.Enums.SUpo.Zauctovany ? Gordic.Fuc.Globals.Enums.SUpo.Nezauctovany : Gordic.Fuc.Globals.Enums.SUpo.Zauctovany);
                    const newSSto = (that.DetailDto.s_sto === Gordic.Fuc.Globals.Enums.SSto.Nestornovano ? Gordic.Fuc.Globals.Enums.SSto.Storno : Gordic.Fuc.Globals.Enums.SSto.Nestornovano);
                    return WebClient.FucDetail.runIslActionWithFormAndConfirmDangerous(this, "jres:24100235", //RC 24100235 : Opravdu chcete změnit stavy pohybu? Touto servisní změnou se neprovede standardní zaúčtování/zarezervování nebo storno!;;
                    {
                        form: new Gordic.Forms.Form({ name: "wizParams" })
                            .addSection()
                            .addRow().addField("gcheck", { name: "zmenit_s_upo", label: "jres:24100299" }) //RC 24100299 : změnit stav pohybu na:
                            .addField("gselectbox", Gordic.Prefabs.Select.fuccsuo(), { name: "nove_s_upo", model: "nove_s_upo=s_upo", serverFilters: { s_upo: [newSUpo] }, defaultValue: null, disabled: true })
                            .addRow().addField("gcheck", { name: "zmenit_s_sto", label: "jres:24100300" }) //RC 24100300 : změnit stav storna na:
                            .addField("gselectbox", Gordic.Prefabs.Select.ekocsto(), { name: "nove_s_sto", model: "nove_s_sto=s_sto", serverFilters: { s_sto: [newSSto] }, defaultValue: null, disabled: true })
                            .addRow("jres:24100294").addField("gstringbox", { name: "duvod", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()] }), //RC 24100294 : Důvod
                        data: { nove_s_upo: newSUpo, nove_s_sto: newSSto },
                        height: 350
                    }, (data) => {
                        return that.isl.FinPohyb.servisneZmenStavy({
                            ikc: "0",
                            zmenit_s_upo: data?.zmenit_s_upo,
                            zmenit_s_sto: data?.zmenit_s_sto,
                            puvodni_s_upo: that.DetailDto.s_upo,
                            puvodni_s_sto: that.DetailDto.s_sto,
                            nove_s_upo: (data != null && data.nove_s_upo != null && (data.nove_s_upo > 0 || data.nove_s_upo === 0) ? data.nove_s_upo : null),
                            nove_s_sto: (data != null && data.nove_s_sto != null && (data.nove_s_sto > 0 || data.nove_s_sto === 0) ? data.nove_s_sto : null),
                            //nove_s_upo: data?.zmenit_s_upo ? (that.DetailDto.s_upo === Gordic.Fuc.Globals.Enums.SUpo.Zauctovany ? Gordic.Fuc.Globals.Enums.SUpo.Nezauctovany : Gordic.Fuc.Globals.Enums.SUpo.Zauctovany) : null,
                            //nove_s_sto: data?.zmenit_s_sto ? (that.DetailDto.s_sto === Gordic.Fuc.Globals.Enums.SSto.Nestornovano ? Gordic.Fuc.Globals.Enums.SSto.Storno : Gordic.Fuc.Globals.Enums.SSto.Nestornovano) : null,
                            duvod: (data != null && data.duvod != null ? data.duvod : "jres:24100301"), //RC 24100301 : nezadán
                            rows: [that.DetailDto]
                        });
                    }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actServis);
                }
                /**
                 * Změna ID IISSP
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                zmenaIissp() {
                    let that = this;
                    // změna ID IISSP (je-li vůbec IISSP povolena)
                    if (this.JeIissp) {
                        return WebClient.FucDetail.runIslActionWithForm(this, {
                            form: new Gordic.Forms.Form({ name: "wizParams" })
                                .addSection()
                                .addRow("Nová ID IISSP").addField("gselectbox", Gordic.Prefabs.Select.idIissp(), { name: "id_iissp", model: "id_hdr_ris=id_hdr_ris;radek_hdr=radek_hdr", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()] })
                                .addRow("jres:24100294").addField("gstringbox", { name: "duvod", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()] }), //RC 24100294 : Důvod
                            data: { id_hdr_ris: that.DetailDto.id_hdr_ris, radek_hdr: that.DetailDto.radek_hdr }
                        }, (data) => {
                            return that.isl.FinPohyb.zmenIissp({
                                id_hdr_ris: data?.id_hdr_ris,
                                radek_hdr: data?.radek_hdr,
                                duvod: (data != null && data.duvod != null ? data.duvod : "jres:24100301"), //RC 24100301 : nezadán
                                rows: [that.DetailDto]
                            });
                        }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actIisspZmenaId);
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Zobrazení podkladů pro kontrolní hlášení DPH
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                kontrolniHlaseniDPH() {
                    let that = this;
                    // zjištění čísla řádku podkladů
                    return this.isl.FinPohyb.vratCisloRadkuPodkladuKontrolnihoHlaseniDph({ ixpUpr: this.DetailDto.ixp_upr, radekUpo: this.DetailDto.radek_upo })
                        .get()
                        .then(function (data) {
                        if (data != null && data >= 0) {
                            // zobrazení okna podkladů pro kontrolní hlášení DPH
                            return Gordic.Eko.Dialogs.GDanovaEvidence(that, {
                                ixp: that.DetailDto.ixp_upr,
                                radek: data,
                                prava: 0 /* Gordic.Eko.Interface.GEKHPrava.Prohlizeni */,
                                editMode: false,
                                vynulovatDatumyDPH: false,
                                prvotniEvidenceDokladu: false
                            });
                        }
                        else {
                            return that.dialogs.alert("jres:24100368").createDialogPromise(); //RC 24100368 : Podklady pro kontrolní hlášení DPH nebyly k tomuto pohybu nalezeny
                        }
                    });
                }
                /**
                 * Zobrazení detailu případu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailPripadu() {
                    let that = this;
                    // příznak aktivní operace
                    let needRefresh = false;
                    // otevření detailu
                    // TODO: zatím je zakomentován posun po řádku - pokud by se povolil, musel bych řešit na detailu případu posun po různých typech seznamů
                    let $detailWindow = this.navigate(["Gordic.Fuc.WebClient.GDetailPripadu" /*, { gridRemoteControl: new Gordic.Components.GridRC(that.$grid) }*/], {
                        ID: 'DetailPripadu#',
                        IxpUpr: that.DetailDto.ixp_upr
                    });
                    // obsluha aktivní operace na detailu
                    $.content($detailWindow).on(WebClient.FucDetail.triggerChange, (retVal) => {
                        // záznam byl změněn, musí se načíst znovu
                        if (retVal?.data?.ixp_upr) {
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
                /**
                 * Vložení pohybu do / vyjmutí pohybu ze soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                soupiska() {
                    let that = this;
                    let vlozit = !that.DetailDto.ixp;
                    let formDef = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1 LMS-2-10-0" });
                    if (vlozit)
                        formDef
                            .addRow("jres:24100356").addField("gselectbox", Gordic.Prefabs.Select.fucspid(), { disabled: false, name: "ixp", model: "ixp=ixp,ixp_txt=popis", serverFilters: { s_soup: 20 }, flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()] }); //RC 24100356 : Soupiska
                    else
                        formDef
                            .addText("jres:24100367") //RC 24100367 : Opravdu chcete vyjmout pohyb ze soupisky?
                            .addText()
                            .addRow("jres:24100356").addField("gselectbox", Gordic.Prefabs.Select.fucspid(), { disabled: true, name: "ixp", model: "ixp=ixp,ixp_txt=popis", serverFilters: { s_soup: 20 } }); //RC 24100356 : Soupiska
                    return WebClient.FucDetail.runIslActionWithForm(this, {
                        form: formDef,
                        data: vlozit ? {} : { ixp: that.DetailDto.ixp },
                        height: 200
                    }, (data) => { return that.isl.FinPohyb.vlozDoSoupisky({ ixp: data.ixp, vlozit: vlozit, rows: [that.DetailDto] }); }, () => { return that.setActiveOperationAndReloadData(); }, vlozit ? that.actions.actSoupiskaVlozit : that.actions.actSoupiskaVyjmout);
                }
                /**
                 * Zobrazení detailu soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailSoupisky() {
                    let that = this;
                    // příznak aktivní operace
                    let needRefresh = false;
                    // otevření detailu
                    // TODO: zatím je zakomentován posun po řádku - pokud by se povolil, musel bych řešit na detailu případu posun po různých typech seznamů
                    let $detailWindow = this.navigate(["Gordic.Fuc.WebClient.GDetailSoupisky" /*, { gridRemoteControl: new Gordic.Components.GridRC(that.$grid) }*/], {
                        ID: 'DetailSoupisky#',
                        Ixp: that.DetailDto.ixp
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
                /**
                 * Uložení / zobrazení dokladu o zaúčtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                dokladOZauctovani() {
                    if (this.$gridDokladOZauc != null) {
                        let aktDoklad = Gordic.Eko.Grid.currentRow(this.$gridDokladOZauc);
                        if (aktDoklad != null) {
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
                    let that = this;
                    if (this.DetailDto.ixs_huf != null && this.DetailDto.ixs_huf > " ") {
                        // zobrazení historie účtování
                        return this.navigate(["Gordic.Fuc.WebClient.GDetailHistorieUctovaniPohybu"], {
                            ID: 'DetailHistorieUctovani#',
                            IxsHuf: that.DetailDto.ixs_huf
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
                    this.element.findFields("den").gfield("option", "disabled", !this.Editace);
                    this.element.findFields("mesic").gfield("option", "disabled", !this.Editace);
                    this.element.findFields("ac_ixe" /*"subrada_duz"*/).gfield("option", "disabled", !this.Editace);
                    this.element.findFields("popis_upo").gfield("option", "disabled", !this.Editace);
                    // TODO: ještě v režimu editace povoleni částky (záložka DPH, ne celková částka pohybu) - ještě to ale zkontrolovat v Guptě, jestli je to skutečně tak
                    // akce
                    // TODO: parametr + stav
                    //this.actions.actLikvidace.enabled(this.PovolenaLikvidace);
                    // status bar
                    // zaúčtován/zarezervován nebo nestornován OK jinak varování
                    //Gordic.Eko.Detail.StatusBar.updateItem(this.statuses!["statusBarSUpo"]!, this.DetailDto.s_upo_txt!, (this.DetailDto.s_upo! === Gordic.Fuc.Globals.Enums.SUpo.Zauctovany ? Gordic.Gin.Globals.Enums.ColorStateClass.success : (this.DetailDto.s_upo === Gordic.Fuc.Globals.Enums.SUpo.VUctovani ? Gordic.Gin.Globals.Enums.ColorStateClass.warning : Gordic.Gin.Globals.Enums.ColorStateClass.info)));
                    //Gordic.Eko.Detail.StatusBar.updateItem(this.statuses!["statusBarSSto"]!, (this.DetailDto.s_sto! !== Gordic.Fuc.Globals.Enums.SSto.Nestornovano ? this.DetailDto.s_sto_txt! : ""), (this.DetailDto.s_sto! !== Gordic.Fuc.Globals.Enums.SSto.Nestornovano ? Gordic.Gin.Globals.Enums.ColorStateClass.warning : Gordic.Gin.Globals.Enums.ColorStateClass.success));
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarSUpo"], this.DetailDto.s_upo_txt?.toUpperCase() ?? "", (this.DetailDto.s_upo === Gordic.Fuc.Globals.Enums.SUpo.Zauctovany
                        ? Gordic.Eko.Utils.RecordFormatType.Realizovano
                        : null));
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarSSto"], (this.DetailDto.s_sto !== Gordic.Fuc.Globals.Enums.SSto.Nestornovano ? (this.DetailDto.s_sto_txt?.toUpperCase() ?? "") : ""), (this.DetailDto.s_sto === Gordic.Fuc.Globals.Enums.SSto.Storno
                        ? Gordic.Eko.Utils.RecordFormatType.Stornovano
                        : null));
                    // TODO: doplnit správné podmínky
                    // TODO: neudělat id na účetní pohyby, aby to nemuselo být v každé podmínce?
                    const permEditace = WebClient.FucDetail.getEditPermission();
                    const permNeEditace = WebClient.FucDetail.getEditPermission(false);
                    const acts = this.actions;
                    const perms = this.DetailDto.Permissions;
                    acts.actUctovani.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeUctovat : undefined)));
                    acts.actRezervace.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeRezervovat : undefined)));
                    acts.actOdrezervace.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeOdrezervovat : undefined)));
                    acts.actUlozeni.updatePermission(/*this.JeNovy || */ this.Editace || this.OtevritKDuplikaci ? { value: true } : permNeEditace);
                    acts.actOprava.visible(!this.Editace && this.DetailDto.JeUcetni === true);
                    acts.actOprava.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeOpravit : undefined)));
                    acts.actZrusitZmeny.visible(this.Editace && this.DetailDto.JeUcetni === true);
                    acts.actZrusitZmeny.updatePermission((!this.Editace ? permNeEditace : { value: true }));
                    acts.actStorno.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeStornovat : undefined)));
                    acts.actZrusitStorno.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeZrusitStorno : undefined)));
                    //acts.actUcetniParametry!.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeUctParametry : undefined)));
                    // TODO: změnit enabled na updatePermission? asi ano a změnit to i na dalších místech
                    acts.actDetailPripadu.enabled(!this.Editace);
                    acts.actServis.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeServis : undefined)));
                    acts.actNovyPohyb.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeNovyPohyb : undefined)));
                    acts.actObcerstveniPoh.updatePermission((this.Editace ? permEditace : { value: true }));
                    acts.actSoupiskaVlozit.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeVlozitDoSoupisky : undefined)));
                    acts.actSoupiskaVyjmout.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeVyjmoutZeSoupisky : undefined)));
                    acts.actSoupiskaDetail.updatePermission((this.Editace ? permEditace : { value: this.DetailDto.JeVSoupisce ?? false, message: "Pohyb není vložen do soupisky" }));
                    // akce DPH
                    acts.actKontrolniHlaseniDPH.enabled(!this.Editace && this.DetailDto.JeDanovy);
                    // akce IISSP
                    acts.actIisspZmenaId.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeZmenitIissp : undefined)));
                    // taby účtování a rezervace
                    this.enableUcetniZapisy();
                    this.enableRezervacniZapisy();
                    this.enableDokladOZauctovani();
                }
                /**
                 * Nastavení prvků v tabu účetní zápisy
                 */
                enableUcetniZapisy() {
                    // existence zápisů
                    let exUctZapisy = this.$gridUctZapisy != null ? (Gordic.Eko.Grid.currentRow(this.$gridUctZapisy) != null) : false;
                    // akce účtování
                    const acts = this.actions;
                    acts.actUctovaniTiskPohybu.updatePermission({ value: exUctZapisy });
                }
                /**
                 * Nastavení prvků v tabu doklad o zaúčtování
                 */
                enableDokladOZauctovani() {
                    // aktuální doklad
                    let aktDoklad = null;
                    if (this.$gridDokladOZauc != null)
                        aktDoklad = Gordic.Eko.Grid.currentRow(this.$gridDokladOZauc);
                    // akce účtování
                    const acts = this.actions;
                    acts.actUctovaniTiskDokladu.updatePermission({ value: (aktDoklad !== null ? true : false) });
                    acts.actUctovaniDokladOZauctovani.updatePermission({ value: (aktDoklad !== null /* && aktDoklad.ixb_dzu != null && aktDoklad.ixb_dzu > " "*/ ? true : false) });
                    acts.actUctovaniInfoOUctovani.updatePermission({ value: (this.DetailDto.ixs_huf !== null && this.DetailDto.ixs_huf > " " ? true : false) });
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
                 *
                 * @param {boolean} setFocus (default = false) nastavovat fokus do prvního editovatelného pole?
                 */
                aktualizaceDetailu(setFocus = false) {
                    // naplnění políček
                    // TODO: nechat DetailDto nebo to přejmenovat zpátky na model? nějak to dořešit, v kódu totiž používám oboje
                    if (this.OtevritKDuplikaci) {
                        // naplnění bez čísla řádku (a bez initialValues, aby se vynutilo uložení)
                        this.findFields()
                            .gfield("model", "apply", $.extend(true, {}, this.DetailDto, { radek_upo: null }))
                            .gfield("model", "validators", this.validators);
                    }
                    else {
                        // standardní naplnění
                        this.findFields()
                            .gfield("model", "apply", this.DetailDto, { initialValues: true })
                            .gfield("model", "validators", this.validators);
                    }
                    // naplnění gridu předkontací
                    if (this.DetailDto) {
                        let view = new Gordic.Data.View([this.DetailDto], { /*key: "ixp,radek_pol,subradek,radek_av"*/});
                        this.$gridPredkontace.ggrid("setData", view);
                        // vybrání nějaké položky v gridu položek
                        //this.vybraniPolozky();
                    }
                    // naplnění gridu pohybů je až po rozkliknutí tabu
                    // nastavení stavu políček a akcí
                    this.enable();
                    // nastavení fokusu
                    if (setFocus) {
                        if (this.Editace) {
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
                    // nastavení parametrů podle tématu
                    if (rep.tema === "fuc_ptm_dokagd") {
                        // zápisy pohybu
                        rep.params.X0000 = this.IxpUpr;
                        rep.params.X0001 = this.RadekUpo.toString(10);
                        rep.params.X0002 = "";
                    }
                    else if (rep.tema === "fuc_ptm_engzau") {
                        // účetní doklad
                        if (this.$gridDokladOZauc != null) {
                            let aktDoklad = Gordic.Eko.Grid.currentRow(this.$gridDokladOZauc);
                            if (aktDoklad !== null) {
                                rep.params.X0000 = aktDoklad.rok.toString(10);
                                rep.params.X0001 = aktDoklad.lic;
                                rep.params.X0002 = aktDoklad.ico;
                                rep.params.X0003 = aktDoklad.ucs;
                                rep.params.X0004 = aktDoklad.mesic.toString(10);
                                rep.params.X0005 = aktDoklad.ac;
                                // kumulace se zde řeší podle toho, jestli existují další pohyby účtované stejným dokladem
                                if (aktDoklad.poc_pohybu_dokladu > 1)
                                    rep.params.X0006 = "1";
                                else
                                    rep.params.X0006 = "0";
                                rep.params.X0007 = "";
                            }
                        }
                    }
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<Interface.GPohybDto> | Interface.GPohybDto} promise s daty (resolve = je možné zavřít, reject = není možné zavřít) nebo přímo data detailu
                 */
                closing() {
                    let that = this;
                    // TODO: pravděpodobně nepůjde pohyb přímo editovat, takže tohle tady bude zbytečné
                    let formChanged = this.findForms().gform("hasChanged");
                    // TODO: dodat správnou podmínku - u zápočtových listů je if ((this.Editace || this.JePodan) && formChanged) {
                    if (true && formChanged) {
                        // dotaz na zavření bez uložení, protože se něco změnilo
                        // TODO: upravit podle detailu zápočtového listu (použití Eko.Detail.messageBoxUnsavedData a jiná obsluha)
                        return Gordic.Eko.Detail.messageBoxUnsavedData(that)
                            .createDialogPromise([GDlg.mbbYes.id, GDlg.mbbNo.id])
                            .then(function (retVal) {
                            if (retVal === GDlg.mbbYes.id) {
                                // uložení dat
                                return that.ulozeni(true)
                                    .then(function () {
                                    return that.DetailDto;
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
            GDetailPohybu = __decorate([
                gcontent
            ], GDetailPohybu);
            WebClient.GDetailPohybu = GDetailPohybu;
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFBvaHlidS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxQb2h5YnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQThyRmY7QUE5ckZELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQThyRm5CO0lBOXJGZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBOHJGN0I7UUE5ckZvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUtuQzs7Ozs7ZUFLRztZQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxPQUFBLHFCQUF3QztnQkFBM0U7O29CQU9JOzs7dUJBR0c7b0JBQ0ssYUFBUSxHQUFrQixJQUFJLENBQUM7b0JBQ3ZDOzs7dUJBR0c7b0JBQ0ssd0JBQW1CLEdBQWtCLElBQUksQ0FBQztvQkFDbEQ7Ozt1QkFHRztvQkFDSyxtQkFBYyxHQUFrQixJQUFJLENBQUM7b0JBQzdDOzs7dUJBR0c7b0JBQ0sscUJBQWdCLEdBQWtCLElBQUksQ0FBQztvQkFDL0M7Ozt1QkFHRztvQkFDSyw0QkFBdUIsR0FBa0IsSUFBSSxDQUFDO29CQUN0RDs7O3VCQUdHO29CQUNLLCtCQUEwQixHQUFrQixJQUFJLENBQUM7b0JBQ3pEOzs7dUJBR0c7b0JBQ0ssbUJBQWMsR0FBa0IsSUFBSSxDQUFDO29CQUM3Qzs7O3VCQUdHO29CQUNLLGNBQVMsR0FBK0IsSUFBSSxDQUFDO29CQUNyRDs7O3VCQUdHO29CQUNLLHNCQUFpQixHQUFrQixJQUFJLENBQUM7Z0JBNm5GcEQsQ0FBQztnQkEvZ0ZHOzttQkFFRztnQkFDSSxjQUFjO29CQUVqQixxQkFBcUI7b0JBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFOUIsZ0VBQWdFO29CQUNoRSxNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUM7b0JBQ2hDLGdCQUFnQjtvQkFD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dUJBQWEsZ0JBZ3JGekIsQ0FBQTtRQUNMLENBQUMsRUE5ckZvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE4ckY3QjtJQUFELENBQUMsRUE5ckZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE4ckZuQjtBQUFELENBQUMsRUE5ckZTLE1BQU0sS0FBTixNQUFNLFFBOHJGZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuRnVjLldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIER0b1R5cGVVcG8gPSBHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG87XHJcbiAgICBleHBvcnQgdHlwZSBVc2VkQ29tcG9uZW50c1VwbyA9IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlckNvbXBvbmVudHMuR0xpc3RDb250cm9sc0V4dGVuc2lvbnM8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFpbCBwb2h5YnVcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBCb8SNZWtcclxuICAgICAqIEBzaW5jZSA0ODAuMS4wLjEyXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxQb2h5YnUgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNVcG8+IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBwxZllZGtvbnRhY2VcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRQcmVka29udGFjZTogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgenDFr3NvYnUgemHDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5IHwgbnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkWnB6OiBKUXVlcnkgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIG5hdsOhemFuw71jaCBwb2h5YsWvXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZE5hdmF6YW5lUG9oeWJ5OiBKUXVlcnkgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIMO6xI1ldG7DrWNoIHrDoXBpc8WvXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFVjdFphcGlzeTogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBkb2tsYWR1IG8gemHDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5IHwgbnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkRG9rbGFkT1phdWM6IEpRdWVyeSB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgesOhcGlzxa8gZG9rbGFkdSBvIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFphcGlzeURva2xhZHVPWmF1YzogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBkYWzFocOtY2ggcG9oeWLFryDDusSNdG92YW7DvWNoIGRva2xhZGVtIG8gemHDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5IHwgbnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkT3N0UG9oeWJ5RG9rbGFkdU9aYXVjOiBKUXVlcnkgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIHJlemVydmHEjW7DrWNoIHrDoXBpc8WvXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFJlelphcGlzeTogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGFiIGJhbmtvdm7DrWhvIHbDvXBpc3VcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkdGFiVnlwaXM6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIHBvbG/FvmVrIElJU1NQXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFBvbG96a3lJaXNzcDogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIHZsYXN0bm9zdGkgeiBDI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBJRCBwxZnDrXBhZHVcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgSXhwVXByOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogxZjDoWRlayBwb2h5YnVcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUmFkZWtVcG86IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEYXRhIG5vdsOpaG8gcG9oeWJ1ICh2IHJlxb5pbXUgdnl0dm/FmWVuw60gbm92w6lobyBwb2h5YnUgeiBleGlzdHVqw61jw61obyBwb2h5YnUpXHJcbiAgICAgICAgICogQHR5cGUge0dQb2h5YkR0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIERhdGFOb3ZlaG9Qb2h5YnU6IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGV2xZnDrXQgZGV0YWlsIHYgcmXFvmltdSBvcHJhdnk/XHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBPdGV2cml0VlJlemltdU9wcmF2eTogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWc3R1cG7DrSBwYXJhbWV0ciBvdGV2xZllbsOtIHYgcmXFvmltdSB6YWTDoW7DrSBub3bDqWhvIHBvaHlidSAoa29wacOtIHogZXhpc3R1asOtY8OtaG8gcG9oeWJ1KVxyXG4gICAgICAgICAqIEB0eXBlIHtib29sfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgT3RldnJpdEtEdXBsaWthY2k6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWsOhcGlzeSwga3RlcsOpIHNlIG1hasOtIHpkdXBsaWtvdmF0XHJcbiAgICAgICAgICogQHR5cGUge251bWJlcltdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgWmFwaXN5S0R1cGxpa2FjaTogbnVtYmVyW107XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRMWvdm9kLCBwcm/EjSBzZSBtw6EgZHVwbGlrb3ZhdFxyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmcgfCBudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgRHV2b2RLRHVwbGlrYWNpOiBzdHJpbmcgfCBudWxsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERUTyBkZXRhaWx1IHBvaHlidVxyXG4gICAgICAgICAqIEB0eXBlIHtHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBEZXRhaWxEdG86IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWYWxpZMOhdG9yeVxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3RbXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHZhbGlkYXRvcnM6IG9iamVjdFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtem5hayBlZGl0b3bDoW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBFZGl0YWNlOiBib29sZWFuO1xyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBKZSBwb2h5YiDDusSNZXRuw60/XHJcbiAgICAgICAgLy8gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBKZVBvaHliVWNldG5pOiBib29sZWFuO1xyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBKZSBwb2h5YiByZXplcnZhxI1uw60/XHJcbiAgICAgICAgLy8gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBKZVBvaHliUmV6ZXJ2YWNuaTogYm9vbGVhbjtcclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogSmUgcG9oeWIgemHDusSNdG92YW7DvT9cclxuICAgICAgICAvLyAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIEplUG9oeWJaYXVjdG92YW55OiBib29sZWFuO1xyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBKZSBuYSBwb2h5YnUgcG9sb8W+a2EgYmFua292bsOtaG8gdsO9cGlzdT9cclxuICAgICAgICAvLyAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIEplQmFua292bmlWeXBpczogYm9vbGVhbjtcclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogSmUgcG9oeWIgZGHFiG92w70/XHJcbiAgICAgICAgLy8gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBKZVBvaHliRGFub3Z5OiBib29sZWFuO1xyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBKZSBwb2h5YiDDusSNZXRuw60gYSBtw6EgbmEgc29ixJsgbmF2w6F6YW7DvSBwb2h5YiByZXplcnZhxI1uw60/XHJcbiAgICAgICAgLy8gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBNYVBvaHliUmV6ZXJ2YWNuaTogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZnDrXpuYWsgYmV6IGtvbnRyb2x5IG5hIHDFmWXEjWVycMOhbsOtXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBOZWtvbnRyb2xvdmF0UHJlY2VycGFuaTogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZnDrXpuYWsgbW/Fvm5vc3QgcMWZZcSNZXJww6Fuw61cclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IE1vem5vc3RQcmVjZXJwYW5pOiBib29sZWFuO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGplIHN0w6F0bsOtIHBva2xhZG5hP1xyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSmVJaXNzcDogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIHJva1xyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSb2s6IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWc3R1cG7DrSBwYXJhbWV0ciBvdGV2xZllbsOtIHYgcmXFvmltdSBvcHJhdnlcclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IE90ZXZyaXRKYWtvT3ByYXZ1OiBib29sZWFuO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWRlZmlub3bDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGplbiBuYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAgICAgdGhpcy5ha3R1YWxpemFjZURldGFpbHUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBwxZnDrXBhZG7DvSBmbGFzaCBzIGluZm9ybWFjw60gbyBjaHlibsSbIG5hc3RhdmVuw6ltIGRhxYhvdsOpbSBwb2h5YnVcclxuICAgICAgICAgICAgY29uc3QgZmxhc2hJZCA9IFwiaWRQcml6RGRTdGF0ZVwiO1xyXG4gICAgICAgICAgICAvLyBza3J5dMOtIGZsYXNoZVxyXG4gICAgICAgICAgICB0aGlzLmhpZGVGbGFzaChmbGFzaElkKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuRGV0YWlsRHRvLnByaXpfZGQgPT09IDEwICYmICF0aGlzLkRldGFpbER0by5KZURhbm92eSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtXHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VGbGFzaCA9IHRoaXMuZ2xvYmFsU2V0dGluZ3M/LmdldERlZihcIkdsb2JhbC5GdWMuQXBwU2V0dGluZ3MuVXBvU2V0dGluZ3NGb3JtLkRldGFpbEZsYXNoUHJpekRkV2FybmluZ1wiLCB0cnVlKSA/PyB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZUZsYXNoKSB0aGlzLnNob3dGbGFzaChcImpyZXM6MjQxMDAzNjNcIiwgXCJ3YXJuaW5nXCIsIGZsYXNoSWQpOyAvL1JDIDI0MTAwMzYzIDogUG9oeWIgamUgY2h5Ym7EmyBuYXN0YXZlbiBqYWtvIGRhxYhvdsO9IChwbGF0ZWJuw60gcG9oeWJ5IG1pbW8gUE9LIGpzb3UgdsW+ZHkgbmVkYcWIb3bDqSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzbHVoYSB1ZMOhbG9zdGkgYnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlciBkZXRhaWxidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmljZSBha2PDrSwgdGFixa8sIGtwaSwgbWVudSBhcG9kLlxyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQ8dGhpcz4oXCJkZXRhaWxcIiwge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrY2UgcHJvIG1lbnViYXJcclxuICAgICAgICAgICAgICAgICAgICAvLyDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICBhY3RVY3RvdmFuaTogRnVjQWN0aW9ucy5hY3Rpb25aYXVjdG92YXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LkRldGFpbER0by5KZVVjZXRuaSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC51Y3RvdmFuaSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlemVydmFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFJlemVydmFjZTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmFyZXplcnZvdmF0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5EZXRhaWxEdG8uSmVSZXplcnZhY25pISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LnJlemVydmFjZSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9kcmV6ZXJ2YWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDEwMDQ4NVwiLCAvL1JDIDI0MTAwNDg1IDogT2RyZXplcnZvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQucmV6ZXJ2YWNlKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdG9ybm9cclxuICAgICAgICAgICAgICAgICAgICBhY3RTdG9ybm86IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblN0b3Jub3ZhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5zdG9ybm8oKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RacnVzaXRTdG9ybm86IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblpydXNpdFN0b3Jubyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5zdG9ybm8oKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvLyB6bcSbbmEgw7rEjWV0bsOtY2ggcGFyYW1ldHLFr1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHRvaGxlIG5haHJhZGl0IGVkaXRhY8OtIHBvaHlidSwga2RlIGJ5IHNlIGRhbCB6ZWRpdG92YXQgcG9waXMgcG9oeWJ1LCBzdWLFmWFkYSBhIGRhdHVtIMO6xI10b3bDoW7DrSAocG9kb2JuxJsgamFrbyBqZSB0byB2IEd1cHTEmyBwxZlpIMO6xI10b3bDoW7DrSlcclxuICAgICAgICAgICAgICAgICAgICAvL2FjdFVjZXRuaVBhcmFtZXRyeTogeyBjYXB0aW9uOiBcImpyZXM6MjQxMDAxNDJcIiwgZW5hYmxlZDogZmFsc2UsIHZpc2libGU6IHRoYXQuRGV0YWlsRHRvLkplVWNldG5pISwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQudWNldG5pUGFyYW1ldHJ5KCk7IH0gfSwgLy9SQyAyNDEwMDE0MiA6IMOaxI1ldG7DrSBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgICAgICBhY3RPcHJhdmE6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9wcmF2aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LkRldGFpbER0by5KZVVjZXRuaSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9wcmF2YSgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0WnJ1c2l0Wm1lbnk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblpydXNpdFptZW55KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5EZXRhaWxEdG8uSmVVY2V0bmkhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5vcHJhdmEoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFVsb3plbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblVsb3ppdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoYXQuRGV0YWlsRHRvLkplVWNldG5pISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LnVsb3plbmkoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBkZXRhaWwgcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0RGV0YWlsUHJpcGFkdTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwMTQxXCIsIC8vUkMgMjQxMDAxNDEgOiBQxZnDrXBhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGV0YWlsUHJpcGFkdSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvdXBpc2thXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U291cGlza2FWbG96aXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwMzU0XCIsIC8vUkMgMjQxMDAzNTQgOiBWbG/Fvml0IGRvIHNvdXBpc2t5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LkRldGFpbER0by5KZVVjZXRuaSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5zb3VwaXNrYSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U291cGlza2FWeWptb3V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDEwMDM1NVwiLCAvL1JDIDI0MTAwMzU1IDogVnlqbW91dCB6ZSBzb3VwaXNreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5EZXRhaWxEdG8uSmVVY2V0bmkhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuc291cGlza2EoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFNvdXBpc2thRGV0YWlsOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDAzNTNcIiwgLy9SQyAyNDEwMDM1MyA6IFNvdXBpc2thXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5kZXRhaWxTb3VwaXNreSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9iY2Vyc3R2ZW5pUG9oOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PYmNlcnN0dml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LnJlbG9hZERhdGEoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBub3bDvSBwb2h5YlxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE5vdnlQb2h5Yjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDA0ODNcIiwgLy9SQyAyNDEwMDQ4MyA6IE5vdsO9IHBvaHliXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyNDEwMDQ4NFwiLCAvL1JDIDI0MTAwNDg0IDogS29waWUgcG9oeWJ1IHMgb3BhxI1uw71taSB6bmFtw6lua3kgxI3DoXN0ZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1jb3B5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQubm92eVBvaHliKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXJ2aXNuw60gbsOhc3Ryb2plXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U2VydmlzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDEwMDE0M1wiLCAvL1JDIDI0MTAwMTQzIDogU2VydmlzbsOtIG7DoXN0cm9qZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBHaW4uSWNvbnMuQWN0aW9uRW51bS56bWVuaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LkRldGFpbER0by5KZVVjZXRuaSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5zZXJ2aXMoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRhYiBEUEhcclxuICAgICAgICAgICAgICAgICAgICBhY3RLb250cm9sbmlIbGFzZW5pRFBIOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Lb250cm9sbmlIbGFzZW5pKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LmtvbnRyb2xuaUhsYXNlbmlEUEgoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvLyB0YWIgw7rEjXRvdsOhbsOtIGEgcmV6ZXJ2YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VWN0b3ZhbmlUaXNrUG9oeWJ1OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RVY3RvdmFuaVRpc2tQb2h5YnVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJmdWNfcHRtX2Rva2FnZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlrDoXBpc3kgcG9oeWJ1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7IHJldHVybiB0aGF0LnJlcG9ydFN0YXJ0aW5nKHJlcCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RVY3RvdmFuaVRpc2tEb2tsYWR1OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RVY3RvdmFuaVRpc2tEb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiZnVjX3B0bV9lbmd6YXVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEb2tsYWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHsgcmV0dXJuIHRoYXQucmVwb3J0U3RhcnRpbmcocmVwKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFVjdG92YW5pRG9rbGFkT1phdWN0b3Zhbmk6IEZ1Y0FjdGlvbnMuYWN0aW9uRG9rbGFkT1phdWN0b3Zhbmkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZG9rbGFkT1phdWN0b3ZhbmkoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RVY3RvdmFuaUluZm9PVWN0b3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwMzY2XCIsIC8vUkMgMjQxMDAzNjYgOiBJbmZvcm1hY2UgbyDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuaGlzdG9yaWVVY3RvdmFuaSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3RVY3RvdmFuaVBvaHliOiB7IHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmxvYWRVY3RvdmFuaVAoZmFsc2UpOyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3RVY3RvdmFuaURva2xhZDogeyBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5sb2FkVWN0b3ZhbmlQKHRydWUpOyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzdWJ0YXNreSBuYSB0YWJ1IHJlemVydmFjZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vYWN0UmV6ZXJ2YWNlUG9oeWI6IHsgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQubG9hZFJlemVydmFjZVAoZmFsc2UpOyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3RSZXplcnZhY2VSb3o6IHsgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQubG9hZFJlemVydmFjZVAodHJ1ZSk7IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdWJ0YXNreSBuYSB0YWJ1IElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0SWlzc3BabWVuYUlkOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PcHJhdml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJabcSbbml0IElEIElJU1NQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6ICh0aGF0LkRldGFpbER0by5KZVVjZXRuaSEgJiYgdGhhdC5KZUlpc3NwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LnptZW5hSWlzc3AoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYkdyb3VwczogW1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlRhYkdyb3Vwcy5BZ2VuZGEoKSxcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcImdycElpc3NwXCIsIGNhcHRpb246IFwianJlczoyNDEwMDMyNVwiLCB2aXNpYmxlOiB0aGF0LkplSWlzc3AgfSwgLy9SQyAyNDEwMDMyNSA6IElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJncnBVY3RSZXpcIiwgY2FwdGlvbjogXCJqcmVzOjI0MTAwMzUwXCIsIHZpc2libGU6IHRoYXQuRGV0YWlsRHRvLkplWmF1Y3RvdmFueSEgfHwgdGhhdC5EZXRhaWxEdG8uc191cG8gPT09IEZ1Yy5HbG9iYWxzLkVudW1zLlNVcG8uVlVjdG92YW5pIHx8ICh0aGF0LkRldGFpbER0by5KZU5lemF1Y3RvdmFueSEgJiYgKHRoYXQuRGV0YWlsRHRvLnR5cF91cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pUG9sb2F1dG9tYXRpY2t5IHx8IHRoYXQuRGV0YWlsRHRvLnR5cF91cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pUnVjbmkpKSB9LCAvL1JDIDI0MTAwMzUwIDogw5rEjWV0bsOtIGEgcmV6ZXJ2YcSNbsOtIHrDoXBpc3lcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcImdycFZ5cGlzXCIsIGNhcHRpb246IFwianJlczoyNDEwMDA3NFwiLCB2aXNpYmxlOiB0aGF0LkRldGFpbER0by5KZUJhbmtvdm5pVnlwaXMhIH0sIC8vUkMgMjQxMDAwNzQgOiBCYW5rb3Zuw60gdsO9cGlzXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJncnBOYXZQb2h5YnlcIiwgY2FwdGlvbjogXCJOYXbDoXphbsOpIHBvaHlieVwiLCB2aXNpYmxlOiAodGhhdC5EZXRhaWxEdG8uSmVVY2V0bmkhIHx8IHRoYXQuRGV0YWlsRHRvLkplUmV6ZXJ2YWNuaSEpICYmICF0aGF0Lk90ZXZyaXRLRHVwbGlrYWNpIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBtZW51QmFyOiBcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZWNoYXQgemHFmWF6ZW7DrSBha2NlIHBybyB1bG/FvmVuw60gZG8gb2Jsw61iZW7DvWNoIHBvZGxlIGVkaXRhxI1uw61obyByZcW+aW11PyB2IGppbsOpbSByZcW+aW11IHNlIHRvdGnFviBuZWVkaXR1amUgKG1vxb5uw6EgdiBidWRvdWNudSBwxZlpIG5vdsOpbSBwb2h5YnUpLiB2IGJ1ZG91Y251IGFsZSBidWRlIG1vxb5uw6kgbmFzdGF2b3ZhdCBvYmzDrWJlbsOpIHXFvml2YXRlbHNreSAuLi5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBidWRlIHBvdMWZZWJhIHVwcmF2aXQgaSBqaW7DqSBha2NlLCBrdGVyw6kgbmVtYWrDrSB2IHJlxb5pbXUgZWRpdGFjZSBzbXlzbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lYm8gdG8gxZllxaFpdCBwxZllcyBWaXNpYmxlICh2aXouIG1ldG9kYSBlbmFibGUpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogc291cGlza3kgemF0w61tIHpha29tZW50b3bDoW55LCBkb2t1ZCBuZWJ1ZGUgZG9hbmFseXpvdsOhbm8sIGphayBzZSBtYWrDrSBwxZllc27EmyBjaG92YXRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk90ZXZyaXRLRHVwbGlrYWNpID09PSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbsOhdnJoIG5vdsOpaG8gcG9oeWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0VWxvemVuaSpcIiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5PdGV2cml0VlJlemltdU9wcmF2eSA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVkaXRhY2UgZXhpc3R1asOtY8OtaG8gcG9oeWJ1IChuYXDFmS4gcMWZaSDDusSNdG92w6Fuw60pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0T3ByYXZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNpdFptZW55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFVsb3plbmkqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFVjdG92YW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFJlemVydmFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RPZHJlemVydmFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3REZXRhaWxQcmlwYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1wiYWN0S29udHJvbG5pSGxhc2VuaURQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cImFjdFVjdG92YW5pSW5mb09VY3RvdmFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cImFjdFVjZXRuaVBhcmFtZXRyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0WnJ1c2l0U3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJqcmVzOjI0MTAwMzU2XCIsIFwiYWN0U291cGlza2FWbG96aXRcIiwgXCJhY3RTb3VwaXNrYVZ5am1vdXRcIiwgXCJhY3RTb3VwaXNrYURldGFpbFwiXSwgLy9SQyAyNDEwMDM1NiA6IFNvdXBpc2thXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFNlcnZpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRnVjRGV0YWlsLmNyZWF0ZU1lbnVTaGFyZSh0aGF0LCB0aGF0Lkl4cFVwciwgdGhhdC5SYWRla1Vwby50b1N0cmluZygpLCB1bmRlZmluZWQsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGV0YWlsIGV4aXN0dWrDrWPDrWhvIHBvaHlidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdE9wcmF2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RacnVzaXRabWVueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RVbG96ZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFVjdG92YW5pKlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RSZXplcnZhY2UqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdE9kcmV6ZXJ2YWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdE9iY2Vyc3R2ZW5pUG9oXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdERldGFpbFByaXBhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXCJhY3RLb250cm9sbmlIbGFzZW5pRFBIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1wiYWN0VWN0b3ZhbmlJbmZvT1VjdG92YW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1wiYWN0VWNldG5pUGFyYW1ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdE5vdnlQb2h5YlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RTdG9ybm8qXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNpdFN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wianJlczoyNDEwMDM1NlwiLCBcImFjdFNvdXBpc2thVmxveml0XCIsIFwiYWN0U291cGlza2FWeWptb3V0XCIsIFwiYWN0U291cGlza2FEZXRhaWxcIl0sIC8vUkMgMjQxMDAzNTYgOiBTb3VwaXNrYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RTZXJ2aXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1Y0RldGFpbC5jcmVhdGVNZW51U2hhcmUodGhhdCwgdGhhdC5JeHBVcHIsIHRoYXQuUmFkZWtVcG8udG9TdHJpbmcoKSwgdW5kZWZpbmVkLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kQmFyOiB0aGF0LkRldGFpbER0by5KZVVjZXRuaSEgPyBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0VWxvemVuaVwiLCBwcmltYXJ5OiB0cnVlIH1cclxuICAgICAgICAgICAgICAgIF0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAvLyBkZWZpbmljZSBzdGF0dXNiYXJ1IGplIGHFviB2IG9uQ29udGVudFJlYWR5XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c0JhclNVcG9cIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c0JhclNTdG9cIiB9KVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIC8vY29tbWFuZEJhcjogW3RoaXMuT3RldnJpdFZSZXppbXVPcHJhdnkgPT09IHRydWUgPyBcImFjdFVsb3plbmlcIiA6IFwiXCJdLFxyXG4gICAgICAgICAgICAgICAgLy9zdGF0dXNCYXI6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHNVcG86IHsgdHlwZTogXCJzdGF0aWNcIiwgY2FwdGlvbjogXCJcIiwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS10ZXh0XCIgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHNTdG86IHsgdHlwZTogXCJzdGF0aWNcIiwgY2FwdGlvbjogXCJcIiwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS10ZXh0XCIgfVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy9zdGF0dXNCYXI6IFtcclxuICAgICAgICAgICAgICAgIC8vICAgIHsgaWQ6IFwic3RhdHVzU1Vwb1wiLCBjYXB0aW9uOiBcIlwiLCB0eXBlOiBcInN0YXRpY1wiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXRleHQgZy1zdGF0ZS1zLXVwb1wiIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICB7IGlkOiBcInN0YXR1c1NTdG9cIiwgY2FwdGlvbjogXCJcIiwgdHlwZTogXCJzdGF0aWNcIiwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS10ZXh0IGctc3RhdGUtcy1zdG9cIiB9XHJcbiAgICAgICAgICAgICAgICAvL10sXHJcbiAgICAgICAgICAgICAgICB0YWJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiUG9oeWI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBtxJtuaXQgdGl0bGUgcG9kbGUgdG9obywganVlc3RsaSBqZGUgbyDDusSNZXRuw60gbmVibyBvIHJlemVydmHEjW7DrSBwb2h5Yj9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBvaHliXCIsIGdyb3VwOiBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKCksIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHBvIGRvxZllxaFlbsOtIHDFmWVzdW5vdSBwxZnDrW1vIGRvIHByZWZhYnU/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0c0FjSXhlU3VicmFkYUR1eiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19peGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbERlZmF1bHRzOiB7IGlzTW9kZWw6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdG9yLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlcmF0b3IgPT09IFwiYXBwbHlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc1JlY2VpcHQ6IGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWw6IGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdG8uYWNfaXhlICE9PSBudWxsICYmIGR0by5hY19peGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVubyDEjcOtc2xvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2wgPSBcImFjX2l4ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5hY19peGUgPSBkdG8uYWNfaXhlLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JlY2VpcHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IGR0by5hY19peGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkdG8uc3VicmFkYV9kdXogIT09IG51bGwgJiYgZHRvLnN1YnJhZGFfZHV6ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbmEgc3VixZlhZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2wgPSBcInN1YnJhZGFfZHV6XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmFjX2l4ZSA9IFwiKlwiICsgZHRvLnN1YnJhZGFfZHV6O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUmVjZWlwdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IGR0by5zdWJyYWRhX2R1ejtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2wgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGF0LmZpbmRGaWVsZHMoXCJhY19peGVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiYWNfaXhlXCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgJC5leHRlbmQodmFsdWUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZWNlaXB0OiBpc1JlY2VpcHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjX2Npc2xvX2RvOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY19jaXNsb19vZDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXpldjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJyYWRhOiB2YWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHprcmF0a2E6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWxpZGF0YXRpb25TdGF0ZTogXCJ2ZXJpZmllZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdmFsaWRhdGF0aW9uTXNnOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcGVyYXRvciA9PT0gXCJjb2xsZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWXEjXRlbsOtIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoYXQuZmluZEZpZWxkcyhcImFjX2l4ZVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWUuaXNSZWNlaXB0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZHRvLmFjX2l4ZSA9IFwiKlwiICsgdmFsdWUuc3VicmFkYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLnN1YnJhZGFfZHV6ID0gdmFsdWUuc3VicmFkYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2R0by5hY19peGUgPSBcIlwiICsgdmFsdWUuc3VicmFkYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmFjX2l4ZSA9IHZhbHVlLnN1YnJhZGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcmlmaWNhdGlvbk5lZWRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc3VicmFkYTogdmFsdWUsIF92YWxpZGF0YXRpb25TdGF0ZTogXCJub252ZXJpZmllZFwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmlzUmVjZWlwdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuX3ZhbGlkYXRhdGlvbk1zZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5fdmFsaWRhdGF0aW9uU3RhdGUgPSBcInZlcmlmaWVkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogemF0w61tIGJleiBrb250cm9seVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZW5kYTogMzMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkcmQgZMOhdmF0IHbFvmR5IDAgcHJvIHXEjWV0bsOtIHBvaHlieSBuZWJvIHRvIGJyw6F0IHogcMWZw61wYWR1LCBrZGUgZHJkIGplP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5EZXRhaWxEdG8uaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoYXQuRGV0YWlsRHRvLnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB0aGF0LkRldGFpbER0by51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lYnJhdCBqZW4gbcSbc8OtYywga3RlcsO9IGplIGFrdHXDoWxuxJsgbmEgcG9oeWJ1LCB0ai4gdGhhdC5EZXRhaWxEdG8ubWVzaWM/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2ljOiBmdW5jdGlvbiAoKSB7IGxldCBtZXNpYyA9IHRoYXQuZmluZEZpZWxkcyhcIm1lc2ljXCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyByZXR1cm4gbWVzaWMuY2lzbG87IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0YWIpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1Qb2h5YlwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJaw6FrbGFkbsOtIMO6ZGFqZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgw7rEjWV0bsOtaG8gcMWZw61wYWR1XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjc3R1cCgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInR5cF91cHJcIiwgbW9kZWw6IFwidHlwX3Vwcj10eXBfdXByXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllIHBvaHlidVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJrdGdfdXBvXCIsIG1vZGVsOiBcImt0Z191cG89a3RnX3Vwb1wiLCBpdGVtVGVtcGxhdGU6IEZ1Y1V0aWxzLmdldEZ1Y2N1cG9JdGVtVGVtcGxhdGUodGhhdCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllIHBvaHlidSBwxZllZHBpc3VcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwia3RnX3Vwb19wcmVcIiwgbW9kZWw6IFwia3RnX3Vwb19wcmU9a3RnX3Vwb1wiLCBpdGVtVGVtcGxhdGU6IEZ1Y1V0aWxzLmdldEZ1Y2N1cG9JdGVtVGVtcGxhdGUodGhhdCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiS29udGFjZVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2Frb24oKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJpeHNfa29uXCIsIG1vZGVsOiBcIml4c19rb249aXhzX2tvbjtpeHNfa29uX3R4dD1peHNfa29uX3R4dFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAzNTZcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNzcGlkKCksIHsgLy9SQyAyNDEwMDM1NiA6IFNvdXBpc2thXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHA9aXhwLGl4cF90eHQ9cG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7IG5hbWU6IFwiYWN0RGV0YWlsU291cGlza3lcIiwgY2FwdGlvbjogXCJqcmVzOjI0MTAwMzUzXCIsIGljb246IFwiZ2ktZGV0YWlsXCIsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmRldGFpbFNvdXBpc2t5KCk7IH0gfSksIC8vUkMgMjQxMDAzNTMgOiBTb3VwaXNrYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuRGV0YWlsRHRvLkplVlNvdXBpc2NlID8/IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVWYWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlRWRpdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczoyNDEwMDMyNFwiKSAvL1JDIDI0MTAwMzI0IDogRXh0ZXJuw60gc3ViamVrdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoRnVjRGV0YWlsLnByZWZhYkVzdVBhbSh0aGF0LkRldGFpbER0by5peHNfZXN1KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJTdWJqZWt0XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2VzdSgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcIml4c19lc3VcIiwgbW9kZWw6IFwiaXhzX2VzdT1peHNfZXN1XCIvKjtuYXpldl9lc3U9bmF6ZXY7aXhzX2Vrbz1peHNfZWtvXCIqLyB9KSAvLyBpdGVtVGVtcGxhdGU6IFwiScSMTzoge2ljb30sIFLEjDoge3JjfSwgT8SMOiB7b2N9LCB7bmF6ZXZ9XCIsIC4uLiA7aWNvX2VzdT1pY287cmNfZXN1PXJjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJCYW5rb3Zuw60gw7pkYWplXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFByZWZhYihGdWNEZXRhaWwucHJlZmFiVnNLc1NzKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCLEjMOhc3RrYVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMDgyXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctOFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJjX21lbmFcIiB9KS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTRcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2NtZW4oKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJtZW5hXCIsIG1vZGVsOiBcIm1lbmE9bWVuYTttZW5hX3prcj1tZW5hX3Npc19hYWFcIiB9KSAvL1JDIDI0MTAwMDgyIDogxIzDoXN0a2EgdiBtxJtuxJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA4M1wiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiY191cG9cIiB9KSAvL1JDIDI0MTAwMDgzIDogxIzDoXN0a2EgdiBDWktcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIsOaxI1ldG7DrSBhIHJlemVydmHEjW7DrSDDumRhamVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiDEjcOtc2xvIGRva2xhZHUgbmVibyBzdWLFmWFkYT8gYWxlIHRhIHXFviBqZSBhc2kgamluZGUgLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN1YsWZYWRhLyDEjMOtc2xvIGRva2xhZHVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5Fa28uUHJlZmFicy5nc3Vic2VxdWVuY2UoKSwgb3B0c0FjSXhlU3VicmFkYUR1eilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJTdWLFmWFkYVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnVjdGRkZGUoKSwgeyBuYW1lOiBcInN1YnJhZGFfZHV6XCIsIG1vZGVsOiBcInN1YnJhZGFfZHV6PXN1YnJhZGFcIiwgc2VydmVyRmlsdGVyczogeyByb2s6IHRoYXQuRGV0YWlsRHRvLnJvaywgaWNvOiB0aGF0LkRldGFpbER0by5pY28sIGFrdGl2aXRhOiBbMTAwLCA1MDBdIH0sIGRlZmF1bHRWYWx1ZTogbnVsbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZFJvdyhcIlN1YsWZYWRhXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInN1YnJhZGFfZHV6XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEZ1Y0RldGFpbC5wcmVmYWJEYXR1bVVjdG92YW5pKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvbG/FvmthIHNtbG91dnlcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwieHh4XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiw5rEjWV0bsOtIGRva2xhZCAodiBVQ1QpXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcIml4cF91Y3RcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUG9waXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBuYXN0YXZvdmF0IHbFvmR5IHbDvcWha3UgNyAodG8gb2Rwb3bDrWTDoSB2ZWRsZWrFocOtIHNla2NpKSBuZWJvIHBvdcW+w610YXQgYXV0b1NpemU/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGlzXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKEZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvVHlwZUxlbmd0aHMucG9waXNfdXBvLCBmYWxzZSwgZmFsc2UsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwicG9waXNfdXBvXCIsIHJvd3M6IC8qNyovMSwgLyp3cmFwOiB0cnVlKi9hdXRvU2l6ZTogdHJ1ZSB9KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJEcGg6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRFBIICh6w6Fsb8W+a2EgamUgZG9zdHVwbsOhIGplbiBwb2t1ZCBqZSBwb2h5YiBkYcWIb3bDvSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoYXQuRGV0YWlsRHRvLkplRGFub3Z5ISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcImFjdEtvbnRyb2xuaUhsYXNlbmlEUEgqXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Jkb2JpRHBoU2F6Ynk6IERhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Jkb2JpRHBoVmlkOiBHb3JkaWMuR2luLldlYkNsaWVudC5JUmVjYXBQZXJpb2REUEhJbnRlcnZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvIG9iZG9iaURwaFNhemJ5IGJ5Y2ggbcSbbCBhc2kgZMOhdmF0IGRhdHVtIHogZWtvc3BkZSBkYXR1bSBkdWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LkRldGFpbER0by5yb2tfZHBoICYmIHRoYXQuRGV0YWlsRHRvLm1lc2ljX2RwaCAmJiB0aGF0LkRldGFpbER0by5yb2tfZHBoID4gMCAmJiB0aGF0LkRldGFpbER0by5tZXNpY19kcGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Jkb2JpRHBoU2F6YnkgPSBuZXcgRGF0ZSh0aGF0LkRldGFpbER0by5yb2tfZHBoISwgdGhhdC5EZXRhaWxEdG8ubWVzaWNfZHBoIS0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmRvYmlEcGhWaWQgPSB7IHllYXI6IHRoYXQuRGV0YWlsRHRvLnJva19kcGgsIG1vbnRoOiB0aGF0LkRldGFpbER0by5tZXNpY19kcGggfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iZG9iaURwaFNhemJ5ID0gbmV3IERhdGUodGhhdC5Sb2shLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmRvYmlEcGhWaWQgPSB7IHllYXI6IDAsIG1vbnRoOiAwIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjYXBEcGhPcHRpb25zOiBHb3JkaWMuR2luLldlYkNsaWVudC5JR1JlY2FwQ29uZmlnRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyaW9kRFBIVmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50OiBwYXJzZURlY2ltYWwodGhhdC5EZXRhaWxEdG8uY191cG8hKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXhQZXJpb2Q6IG9iZG9iaURwaFNhemJ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcmlvZERQSDogb2Jkb2JpRHBoVmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZXM6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LlV0aWxzLmRwaE1vZGVsQXBwbHkodGhhdC5EZXRhaWxEdG8sIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9zdm9ib3plbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX2QwXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLk9zdm9ib3plbm8sIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6YW9rcm91aGxlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY196YW9cIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuWmFva3JvdWhsZW5vLCBwcmljZVR5cGU6IFwic3VtXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmV6IGRhbsSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY196MFwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5CZXpEYW5lLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gesOha2xhZG7DrSBzYXpiYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfejJcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuWmFrbGFkbmksIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY19kMlwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5aYWtsYWRuaSwgcHJpY2VUeXBlOiBcInRheFwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBydm7DrSBzbsOtxb5lbsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY196MVwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5QcnZuaVNuaXplbmEsIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY19kMVwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5QcnZuaVNuaXplbmEsIHByaWNlVHlwZTogXCJ0YXhcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkcnVow6Egc27DrcW+ZW7DoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfejNcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuRHJ1aGFTbml6ZW5hLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfZDNcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuRHJ1aGFTbml6ZW5hLCBwcmljZVR5cGU6IFwidGF4XCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdMWZZXTDrSBzbsOtxb5lbsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB6YXTDrW0gbmVuw60gcG9kcG9yYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy97IGZyb206IFwiY196NFwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5UcmV0aVNuaXplbmEsIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sgZnJvbTogXCJjX2Q0XCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlRyZXRpU25pemVuYSwgcHJpY2VUeXBlOiBcInRheFwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2Vsa2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY191cG9cIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuRG9rbGFkQ2Vsa2VtLCBwcmljZVR5cGU6IFwic3VtXCIgfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGFiKS5nY29udGVudChHb3JkaWMuR2luLldlYkNsaWVudC5yZWNhcERQSCwgcmVjYXBEcGhPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiUHJlZGtvbnRhY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZZWRrb250YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyNDEwMDM3NlwiLCAvL1JDIDI0MTAwMzc2IDogUMWZZWRrb250YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlByZWZhYnMuVGFiR3JvdXBzLkFnZW5kYSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBncmlkdSBwxZllZGtvbnRhY8OtIGRvIHRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRQcmVka29udGFjZSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdVZVRlTmtzVXVzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFByZWRrb250YWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdyaWQgZG9kxJtsYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBidWRlIG7Em2pha8OhIGRlZmF1bHRuw60gYWtjZT8gamVzdGxpIGFubywgdGFrIGJ1xI8gb3ByYXZhIHBvbG/Fvmt5IG5lYm8gbsSbamFrw70gbm92w70gZGV0YWlsIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHRBY3Rpb246IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcInZzXCIsIFwiY1wiLCBcInR5cF9hZ1wiLCBcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlphcGlzLmNyZWF0ZUdyaWRGb3JtYXRQcmVka29udGFjZSh0aGF0KSAvL25ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdVZVRlRHRvPigpLmFkZFNvcnRlZEVrb0NmdVNldCh0aGF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJVY3RJbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncnBVY3RSZXpcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZnDrXBhZG7DvSBmbGFzaCBzIGluZm9ybWFjw60gbyBqaW7DqW0gcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuUm9rICE9IHRoYXQuRGV0YWlsRHRvLnJvaykgRnVjRGV0YWlsLmZsYXNoUm9rQ2Z1KHRhYiwgdGhhdC5Sb2ssIFwiaWRSb2tVY3RNZXNzYWdlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJVY3RaYXBpc3k6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRMYXp5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIsOaxI1ldG7DrSB6w6FwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncnBVY3RSZXpcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LkRldGFpbER0by5KZVVjZXRuaSEgJiYgKHRoYXQuRGV0YWlsRHRvLkplWmF1Y3RvdmFueSEgfHwgdGhhdC5EZXRhaWxEdG8uc191cG8gPT09IEZ1Yy5HbG9iYWxzLkVudW1zLlNVcG8uVlVjdG92YW5pIHx8ICh0aGF0LkRldGFpbER0by5KZU5lemF1Y3RvdmFueSEgJiYgKHRoYXQuRGV0YWlsRHRvLnR5cF91cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pUG9sb2F1dG9tYXRpY2t5IHx8IHRoYXQuRGV0YWlsRHRvLnR5cF91cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pUnVjbmkpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXCJhY3RVY3RvdmFuaVRpc2tQb2h5YnUqXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdCB6b2JyYXplbsOtIGhpc3RvcmllIMO6xI10b3bDoW7DrT8gYnXEjyBwxZllcyBzZXpuYW0gKG9iZWNuxJsgbcWvxb5lIGLDvXQgcG9oeWIgdmUgdsOtY2UgaGlzdG9yacOtIMO6xI10b3bDoW7DrSkgbmVibyBkb2hsZWRhdCB0ZW4gbmVqbm92xJtqxaHDrSwga2RlIGplIHBvaHliIHphw7rEjXRvdsOhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lxZllxaFpdCB1bG/FvmVuw70gdHlwIHpvYnJhemVuw60/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkVWN0WmFwaXN5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRVY3RaYXBpc3kgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcGlzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFVjdFphcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJhY19hZ1wiLCBcImFjXCIsIFwiaWNvX2VzdVwiLCBcInJjX2VzdVwiLCBcIm5hemV2X2VzdVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5aYXBpcy5jcmVhdGVHcmlkRm9ybWF0Tih0aGF0LCB7IGRyZDogdHJ1ZSwgZGF0dW06IHRydWUsIGRwaDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiUmV6WmFwaXN5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlemVydmFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0TGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJSZXplcnZhxI1uw60gesOhcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JwVWN0UmV6XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogKHRoYXQuRGV0YWlsRHRvLkplVWNldG5pISB8fCB0aGF0LkRldGFpbER0by5KZVJlemVydmFjbmkhKSAmJiB0aGF0LkRldGFpbER0by5KZVphdWN0b3ZhbnkhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSByZXplcnZhY8OtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkUmV6WmFwaXN5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHVkxJtsYXQgcMWZZXDDrW5hxI0gbmEgesOhcGlzeSB6IHJlemVydmHEjW7DrWhvIHBvaHlidSBhIHogw7rEjWV0bsOtaG8gcG9oeWJ1P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBncmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkUmV6WmFwaXN5ID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBpc0R0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSZXpaYXBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHVwcmF2aXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wiYWNfYWdcIiwgXCJhY1wiLCBcImljb19lc3VcIiwgXCJyY19lc3VcIiwgXCJuYXpldl9lc3VcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuWmFwaXMuY3JlYXRlR3JpZEZvcm1hdE4odGhhdCwgeyBkcmQ6IHRydWUsIGRhdHVtOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVyc09uVGFiOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJEb2tsYWRPWmF1Yzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdExhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRG9rbGFkIG8gemHDusSNdG92w6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdycFVjdFJlelwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoYXQuRGV0YWlsRHRvLkplVWNldG5pISAmJiB0aGF0LkRldGFpbER0by5KZVphdWN0b3ZhbnkhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW1wiYWN0VWN0b3ZhbmlUaXNrRG9rbGFkdSpcIiwgXCJhY3RVY3RvdmFuaURva2xhZE9aYXVjdG92YW5pKlwiLCBcImFjdFVjdG92YW5pSW5mb09VY3RvdmFuaSpcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvZMSbbGF0IHpvYnJhemVuw60gaGlzdG9yaWUgw7rEjXRvdsOhbsOtPyBidcSPIHDFmWVzIHNlem5hbSAob2JlY27EmyBtxa/FvmUgYsO9dCBwb2h5YiB2ZSB2w61jZSBoaXN0b3Jpw60gw7rEjXRvdsOhbsOtKSBuZWJvIGRvaGxlZGF0IHRlbiBuZWpub3bEm2rFocOtLCBrZGUgamUgcG9oeWIgemHDusSNdG92w6FuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbmXFmWXFoWl0IHVsb8W+ZW7DvSB0eXAgem9icmF6ZW7DrT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREb2tsYWRPWmF1Y3RvdmFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YWJ1bGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMVwiKS5hZGRTZWN0aW9uKC8qXCJEb2tsYWRcIiovLypcIkRva2xhZCBvIHphw7rEjXRvdsOhbsOtXCIqLykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZERva2xhZE9aYXVjID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkRG9rbGFkT1phdWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHVwcmF2aXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wiYWNfYWdcIiwgXCJhY1wiLCBcImljb19lc3VcIiwgXCJyY19lc3VcIiwgXCJuYXpldl9lc3VcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuWmFwaXMuY3JlYXRlR3JpZEZvcm1hdERva2xhZHkoZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NlbGxBY3RpdmF0ZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gbmHEjXRlbsOtIHrDoXBpc8WvIGFrdHXDoWxuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChvYmouY2VsbEluZm8pIHRoYXQubmFjdGVuaVNlem5hbXVaYXBpc3UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uZ2F1dG9maXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5nYXV0b2ZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gesOhcGlzeSBwb2h5YnUvZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzFcIikuYWRkU2VjdGlvbihcIlrDoXBpc3kgZG9rbGFkdVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkWmFwaXN5RG9rbGFkdU9aYXVjID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBpc0R0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRaYXBpc3lEb2tsYWR1T1phdWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHVwcmF2aXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wiYWNfYWdcIiwgXCJhY1wiLCBcImljb19lc3VcIiwgXCJyY19lc3VcIiwgXCJuYXpldl9lc3VcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuWmFwaXMuY3JlYXRlR3JpZEZvcm1hdCh0aGF0LCBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXJzT25UYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkYWzFocOtIHBvaHlieSB6IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGTDoXQgc2VtIGFrY2kgbmEgZGV0YWlsIHBvaHlidT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxXCIpLmFkZFNlY3Rpb24oXCJEYWzFocOtIHBvaHlieSBkb2tsYWR1XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRPc3RQb2h5YnlEb2tsYWR1T1phdWMgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZE9zdFBvaHlieURva2xhZHVPWmF1Y1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJhY19hZ1wiLCBcImFjXCIsIFwiaWNvX2VzdVwiLCBcInJjX2VzdVwiLCBcIm5hemV2X2VzdVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5Qb2h5Yi5jcmVhdGVHcmlkRm9ybWF0KHRoYXQsIEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBTZXpQb2guVWNldG5pUG9oeWJ5KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jZWxsQWN0aXZhdGU6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIG5hxI10ZW7DrSB6w6FwaXPFryBha3R1w6FsbsOtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAob2JqLmNlbGxJbmZvKSB0aGF0Lm5hY3RlbmlTZXpuYW11WmFwaXN1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiWnB6OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpwxa9zb2IgemHDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdExhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiWnDFr3NvYiB6YcO6xI10b3bDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5QcmVmYWJzLlRhYkdyb3Vwcy5BZ2VuZGEoKS8qeyBpZDogXCJncnBVY3RSZXpcIiB9Ki8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHprb250cm9sb3ZhdCB6b2JyYXplbsOtIHpwxa9zb2LFryB6YcO6xI10b3bDoW7DrSAtIG3DoSBzbXlzbCBqZW4gdSB0eXBfdXBvIDEwIGEgMzAgKGEgbW/Fvm7DoSBpIDYwPylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoYXQuRGV0YWlsRHRvLnR5cF91cG8gPT09IEZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVwby5VY2V0bmlBdXRvbWF0aWNreSB8fCB0aGF0LkRldGFpbER0by50eXBfdXBvID09PSBGdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pUG9sb2F1dG9tYXRpY2t5IHx8IHRoYXQuRGV0YWlsRHRvLnR5cF91cG8gPT09IEZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVwby5SZXplcnZhY25pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSB6cMWvc29idSB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZFpweigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHBvbMOtIGEgZ3JpZHUgenDFr3NvYnUgemHDusSNdG92w6Fuw60gZG8gdGFidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRmb3JtWnB6ID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtWnB6XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZm9ybVpwei5hZGRTZWN0aW9uKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucHJvcChcImRlYnVnTW9kZVwiKSkgJGZvcm1acHouYWRkUm93KFwiUElEXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInpwel9waWRcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmb3JtWnB6LmFkZFJvdyhcIkvDs2RcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwienB6X2tvZFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIk7DoXpldlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJ6cHpfbmF6ZXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdWLFmWFkYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIi8qXCJnbnVtYmVyYm94XCIqLywgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJ6cHpfc3VicmFkYVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRhYikuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsICRmb3JtWnB6KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIMO6cHJhdmEgc2xvdXBjxa8gKHDFmWlkw6Fuw60gdG9vbHRpcMWvIHBybyB6w6FzdHVwa3kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sdW1ucyA9IEZ1Y0dyaWQuWnB6LmNyZWF0ZUdyaWRGb3JtYXRSYWRreSh0aGF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29sdW1ucyA9IEZ1Y0dyaWQuYWRkWmFzdFRvb2x0aXA8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1pwekR0bz4oY29sdW1ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFpweiA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcMWZaWRhdCBEVE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1JhZGVrWnB6RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFpwelwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBncmlkIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYnVkZSBuxJtqYWvDoSBkZWZhdWx0bsOtIGFrY2U/IGplc3RsaSBhbm8sIHRhayBidcSPIG9wcmF2YSBwb2xvxb5reSBuZWJvIG7Em2pha8O9IG5vdsO9IGRldGFpbCBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0QWN0aW9uOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJ2c1wiLCBcImNcIiwgXCJ0eXBfYWdcIiwgXCJhY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogY29sdW1uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiTmF2YXphbmVQb2h5Ynk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmF2w6F6YW7DqSBwb2h5YnkgKHJlemVydmHEjW7DrSBuYSDDusSNZXRuw61tIG5lYm8gw7rEjWV0bsOtIG5hIHJlemVydmHEjW7DrW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRMYXp5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5hdsOhemFuw6kgcG9oeWJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncnBOYXZQb2h5YnlcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6ICh0aGF0LkRldGFpbER0by5KZVVjZXRuaSEgfHwgdGhhdC5EZXRhaWxEdG8uSmVSZXplcnZhY25pISkgJiYgIXRoYXQuT3RldnJpdEtEdXBsaWthY2ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIG5hdsOhemFuw71jaCBwb2h5YsWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkTmF2YXphbmVQb2h5YnkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBncmlkdSBwb2h5YsWvIGRvIHRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWROYXZhemFuZVBvaHlieSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWROYXZhemFuZVBvaHlieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBncmlkIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYnVkZSBuxJtqYWvDoSBkZWZhdWx0bsOtIGFrY2U/IGplc3RsaSBhbm8sIHRhayBidcSPIG9wcmF2YSBwb2xvxb5reSBuZWJvIG7Em2pha8O9IG5vdsO9IGRldGFpbCBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0QWN0aW9uOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJ2c1wiLCBcImNcIiwgXCJ0eXBfYWdcIiwgXCJhY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5Qb2h5Yi5jcmVhdGVHcmlkRm9ybWF0KHRoYXQsIHRoYXQuRGV0YWlsRHRvLkplVWNldG5pID8gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFNlelBvaC5SZXplcnZhY25pUG9oeWJ5IDogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFNlelBvaC5VY2V0bmlQb2h5YnksIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJpeHBfdXByLHJhZGVrX3Vwbyx0eXBfdXBvX3R4dCxzX3Vwb190eHQsc19zdG9fdHh0LGt0Z191cG9fdHh0LHpuYW1fdHh0LGNfdXBvLHBvcGlzX3VwbyxzdWJqZWt0Lm5hemV2LGRhdF91cG8sZGF0X3phdWMsb2JkX2RhbixzdWJyYWRhX2R1eixwcml6X2RkX3R4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXJzT25UYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlZ5cGlzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJhbmtvdm7DrSB2w71waXMgKHrDoWxvxb5rYSBqZSBkb3N0dXBuw6EgamVuIHBva3VkIGplIG5hIHBvaHlidSBwb2xvxb5rYSBiYW5rb3Zuw61obyB2w71waXN1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0TGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjI0MTAwMDc0XCIsIGdyb3VwOiB7IGlkOiBcImdycFZ5cGlzXCIgfSwgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IGZhbHNlLCB2aXNpYmxlOiB0aGF0LkRldGFpbER0by5KZUJhbmtvdm5pVnlwaXMhLCAvL1JDIDI0MTAwMDc0IDogQmFua292bsOtIHbDvXBpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBiYW5rb3Zuw61obyB2w71waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkVnlwaXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gamVuIHVsb8W+ZW7DrSB0YWJ1LCBuYXBsbsSbbiBidWRlIGHFviBwbyBuYcSNdGVuw60gZGF0LCBwcm90b8W+ZSBqZWhvIHBvZG9iYSB6w6F2aXPDrSBuYSBkYXRlY2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJHRhYlZ5cGlzID0gdGFiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJJSVNTUDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJSVNTUCAoesOhbG/FvmthIGplIGRvc3R1cG7DoSBqZW4gdiByZcW+aW11IElJU1NQKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0TGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjI0MTAwMzI1XCIsIGdyb3VwOiB7IGlkOiBcImdycElpc3NwXCIgfSwgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IGZhbHNlLCB2aXNpYmxlOiB0aGF0LkplSWlzc3AsIC8vUkMgMjQxMDAzMjUgOiBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW1wiYWN0SWlzc3BabWVuYUlkXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBiYW5rb3Zuw61obyB2w71waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkSWlzc3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0YWIpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1JaXNzcFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDMyOFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmlkSWlzc3AoKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJpZF9paXNzcFwiLCBtb2RlbDogXCJpZF9oZHJfcmlzPWlkX2hkcl9yaXM7cmFkZWtfaGRyPXJhZGVrX2hkclwiIH0pIC8vUkMgMjQxMDAzMjggOiBJRCBSSVMsIMWYLiBSSVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MjQxMDAzMjlcIikpOyAvL1JDIDI0MTAwMzI5IDogU3RydWt0dXJhIHYgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHprb250cm9sb3ZhdCBzbG91cGNlIHYgVEsgYSBXSyAodMO9a8OhIHNlIGRldGFpbHUgcMWZw61wYWR1IGEgdMOtbSBww6FkZW0gaSB0b2hvdG8gZ3JpZHUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkUG9sb3preUlpc3NwID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvbG96a2FJaXNzcER0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRQb2xvemt5SWlzc3BcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ3JpZCBkb2TEm2xhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgICAgIC8vIGZpdCAoZGVmYXVsdG5lIGJ5IG1lbG8gYnl0IHRvdG8pLCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGJ1ZGUgbsSbamFrw6EgZGVmYXVsdG7DrSBha2NlPyBqZXN0bGkgYW5vLCB0YWsgYnXEjyBvcHJhdmEgcG9sb8W+a3kgbmVibyBuxJtqYWvDvSBub3bDvSBkZXRhaWwgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdEFjdGlvbjogXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1widnNcIiwgXCJjXCIsIFwidHlwX2FnXCIsIFwiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuSWlzc3AuY3JlYXRlR3JpZEZvcm1hdFBvbG96a3koKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGtwaXBhbmVsdVxyXG4gICAgICAgICAgICAkLmV4dGVuZChidWlsZGVyLmtwaVBhbmVsT3B0aW9ucywgeyBzb3J0YWJsZTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgdWTDoWxvc3RpIGJ1aWxkZXJCdWlsZFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyIGRldGFpbGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25EZXRhaWxCdWlsZGVyQnVpbGQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXBvamVuw60gc3RhbmRhcmRuw60gRUtPIGhsYXZpxI1reVxyXG4gICAgICAgICAgICAvLyDDunByYXZhIHBydm7DrSwgZHJ1aMOpIGEgdMWZZXTDrSBzZWtjZSAoamluw70gdHlweSwgc3RhdnksIC4uLilcclxuICAgICAgICAgICAgY29uc3QgZm9ybVNldHVwID0ge307XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1IZWFkZXJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsWYw6FkZWsgcG9oeWJ1XCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBtb2RlbDogXCJyYWRla191cG9cIiwgZGVmYXVsdFZhbHVlOiBudWxsIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb3Bsbml0IHByZWZhYnlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEcnVoIHBvaHlidVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2NkcG8oKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbW9kZWw6IFwiZHJ1aF9wb2g9ZHJ1aF9wb2hcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBwb2h5YnVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjdHVwKCksIHsgZGlzYWJsZWQ6IHRydWUsIG1vZGVsOiBcInR5cF91cG89dHlwX3Vwb1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBwb2h5YnVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHRoaXMuRGV0YWlsRHRvLmRydWhfcG9oID09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5EcnVoUG9oLlJlemVydmFjbmkgPyBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY3N1b1IoKSA6IEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjc3VvVSgpLCB7IGRpc2FibGVkOiB0cnVlLCBtb2RlbDogXCJzX3Vwbz1zX3Vwb1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBzdG9ybmFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jc3RvKCksIHsgZGlzYWJsZWQ6IHRydWUsIG1vZGVsOiBcInNfc3RvPXNfc3RvXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb2h5YlwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnByaXpEZFBvaCgpLCB7IGRpc2FibGVkOiB0cnVlLCBtb2RlbDogXCJwcml6X2RkPXByaXpfZGRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYXlvdXREZXNjcmlwdG9yOiBHb3JkaWMuRWtvLkRldGFpbC5oZWFkZXJMYXlvdXREZXNjcmlwdG9yUG9waXMgfSk7XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuSW5mb10gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRlci5nZXREZWZpbml0aW9uKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5Sb3dzLklkKVswXT8uaXRlbSwgLy8gUElEXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzBdLnJvd3MhWzBdIC8vIMWZw6FkZWsgcG9oeWJ1XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuRGF0YTFdID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckZvcm0hLmZvcm0hLnNlY3Rpb25zIVsxXS5yb3dzIVswXSwgLy8gZHJ1aCBwb2h5YnVcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3JtIS5mb3JtIS5zZWN0aW9ucyFbMV0ucm93cyFbMV0sIC8vIHR5cCBwb2h5YnVcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGVyLmdldERlZmluaXRpb24oR29yZGljLkVrby5IZWFkZXJGb3JtLlJvd3MuRGF0dW1FdmlkZW5jZSlbMF0/Lml0ZW0gLy8gZGF0dW0gcG9oeWJ1XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuRGF0YTJdID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckZvcm0hLmZvcm0hLnNlY3Rpb25zIVsyXS5yb3dzIVswXSwgLy8gc3RhdiBwb2h5YnVcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3JtIS5mb3JtIS5zZWN0aW9ucyFbMl0ucm93cyFbMV0sIC8vIHN0YXYgc3Rvcm5hXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzJdLnJvd3MhWzJdIC8vIHBvaHliXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlpwcmFjb3ZhdGVsXSA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vIHZsYXN0bsOtIG5hc3RhdmVuw60gcHJ2a8WvIChwxZlldsOhxb5uxJsgbW9kZWwpLiBwb3pvciwgbmVzbcOtIHNlIG3Em25pdCBuYW1lXHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLklkXSA9IHsgb3B0aW9uczogeyBtb2RlbDogXCJpeHBfdXByXCIgfSB9IGFzIEZvcm1zLkZvcm1GaWVsZDtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuRGF0dW1FdmlkZW5jZV0gPSB7IG9wdGlvbnM6IHsgbW9kZWw6IFwiZGF0X3Vwb1wiLCB2YWx1ZVR5cGU6IFwiZGF0ZVwiIH0gfSBhcyBGb3Jtcy5Gb3JtRmllbGQ7XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlBvcGlzXSA9IHsgb3B0aW9uczogeyBtb2RlbDogXCJwb3Bpc191cG9cIiB9IH0gYXMgRm9ybXMuRm9ybUZpZWxkO1xyXG4gICAgICAgICAgICAvLyBqaW7DvSBsYWJlbCBwcm8gZGF0dW1cclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5Sb3dzLkRhdHVtRXZpZGVuY2VdID0geyBsYWJlbDogXCJEYXR1bSBwb2h5YnVcIiB9IGFzIEZvcm1zLkZvcm1Sb3c7XHJcbiAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGhsYXZpxI1reVxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkhlYWRlckZvcm0uc2V0dXAoYnVpbGRlciwgZm9ybVNldHVwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIMO6cHJhdmEgbWVudSBhIHBvbG/FvmVrXHJcbiAgICAgICAgICAgIEZ1Y0RldGFpbC5jaGFuZ2VCdWlsZGVyRGVmaW5pdGlvbihidWlsZGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIMWhaXBreSBwcm8gcG9zdW4gcG8gc2V6bmFtdVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuWmFwaXN5S0R1cGxpa2FjaSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udHJvbHNfc2V0dXAoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd1RvRHRvOiBmdW5jdGlvbiAoZ3JpZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHBVcHI6IGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGEuaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhZGVrVXBvOiBncmlkU3RhdGUuY3VycmVudFJvdy5kYXRhLnJhZGVrX3VwbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE90ZXZyaXRKYWtvT3ByYXZ1OiB0aGF0Lk90ZXZyaXRKYWtvT3ByYXZ1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFzbGVkdWppY2lEZXRhaWw6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lZGF0IHRhbSBtw61zdG8gUElEdSBhYyAobmVibyBjbyBqZSB2IEd1cHTEmyk/XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEl0ZW1UZW1wbGF0ZTogXCJOw6FzbGVkdWrDrWPDrToge2l4cF91cHJ9IC0ge3JhZGVrX3Vwb31cIixcclxuICAgICAgICAgICAgICAgICAgICBwcmV2SXRlbVRlbXBsYXRlOiBcIlDFmWVkY2hvesOtOiB7aXhwX3Vwcn0gLSB7cmFkZWtfdXBvfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZU1vdmU6IHRoYXQuY2xvc2luZ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgYWt0aXZuw60gb3BlcmFjZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5LkV2ZW50fSBldiB1ZMOhbG9zdFxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBjdHg/IHDFr3ZvZG7DrSB1ZMOhbG9zdCBhIGplasOtIGFyZ3VtZW50eVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkRldGFpbEJ1aWxkZXJBY3RpdmVPcChldjogSlF1ZXJ5LkV2ZW50LCBjdHg/OiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSh0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBQb2TDoW7DrSB6w6Fwb8SNdG92w6lobyBsaXN0dVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIHBvZGFuaSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyAgICB0aGlzLkRldGFpbER0byA9IHRoaXMuRGF0YU5vdmVob1BvaHlidTtcclxuXHJcbiAgICAgICAgLy8gICAgdGhpcy5ha3R1YWxpemFjZURldGFpbHUodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vICAgIC8vLy8gbmFwbG7Em27DrSBwb2zDrcSNZWtcclxuICAgICAgICAvLyAgICAvLy8vIFRPRE86IG5lY2hhdCBEZXRhaWxEdG8gbmVibyB0byBwxZllam1lbm92YXQgenDDoXRreSBuYSBtb2RlbD8gbsSbamFrIHRvIGRvxZllxaFpdCwgdiBrw7NkdSB0b3Rpxb4gcG91xb7DrXbDoW0gb2JvamVcclxuICAgICAgICAvLyAgICAvL3RoaXMuZmluZEZpZWxkcygpXHJcbiAgICAgICAgLy8gICAgLy8gICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5EZXRhaWxEdG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgIC8vICAgIC8vICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICAvLyAgICAvLy8vIG5hcGxuxJtuw60gZ3JpZHUgcMWZZWRrb250YWPDrVxyXG4gICAgICAgIC8vICAgIC8vaWYgKHRoaXMuRGV0YWlsRHRvKSB7XHJcbiAgICAgICAgLy8gICAgLy8gICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbdGhpcy5EZXRhaWxEdG9dLCB7IC8qa2V5OiBcIml4cCxyYWRla19wb2wsc3VicmFkZWsscmFkZWtfYXZcIiovIH0pO1xyXG4gICAgICAgIC8vICAgIC8vICAgIHRoaXMuJGdyaWRQcmVka29udGFjZS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgLy8gICAgLy8gICAgLy8gdnlicsOhbsOtIG7Em2pha8OpIHBvbG/Fvmt5IHYgZ3JpZHUgcG9sb8W+ZWtcclxuICAgICAgICAvLyAgICAvLyAgICAvL3RoaXMudnlicmFuaVBvbG96a3koKTtcclxuICAgICAgICAvLyAgICAvL31cclxuICAgICAgICAvLyAgICAvLy8vIG5hcGxuxJtuw60gZ3JpZHUgcG9oeWLFryBqZSBhxb4gcG8gcm96a2xpa251dMOtIHRhYnVcclxuICAgICAgICAvLyAgICAvLy8vIG5hc3RhdmVuw60gc3RhdnUgcG9sw63EjWVrIGEgYWtjw61cclxuICAgICAgICAvLyAgICAvL3RoaXMuZW5hYmxlKCk7XHJcbiAgICAgICAgLy8gICAgLy8vLyBuYXN0YXZlbsOtIGZva3VzdVxyXG4gICAgICAgIC8vICAgIC8vaWYgKHNldEZvY3VzKSB7XHJcbiAgICAgICAgLy8gICAgLy8gICAgaWYgKHRoaXMuRWRpdGFjZSkge1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICBHRGJkLmdldEVsZW1lbnRUb0ZvY3VzKHRoaXMuZWxlbWVudCwgXCIuZ2ZpZWxkOm5vdCgudWktc3RhdGUtZGlzYWJsZWQpXCIpPy5maXJzdCgpLnRyaWdnZXIoXCJmb2N1c1wiKTtcclxuICAgICAgICAvLyAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgLy99XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgLy8gVE9ETzogZG9kxJtsYXRcclxuICAgICAgICAvLyAgICAvL3JldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAvLyAgICAvLy8vIGtvbnRyb2xhIG5hIGtuaWh1XHJcbiAgICAgICAgLy8gICAgLy9pZiAoIXRoYXQua25paGFaYWRhbmEoKSkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgIC8vICAgIC8vLy8gVE9ETzogYnVkZSBudXRuw6kgxZllxaFpdCB2w71ixJtyIGtuaWh5IHYgcmXFvmltdSBwxZllcyB2w61jZSBrbmloIChtdXPDrSB0byBiw710IHBydm7DrSDEjcOhc3QgamXFoXTEmyBwxZllZCBrb250cm9sb3UgbmEgcHJ2bsOtIGRva2xhZCkgLSBuZWJvIHYgdG9tdG8gcmXFvmltdSBwb2TDoW7DrSBuZXDFr2pkZVxyXG4gICAgICAgIC8vICAgIC8vLy8ga29udHJvbGEgcHJ2bsOtaG8gZG9rbGFkdSB2IGtuaXplXHJcbiAgICAgICAgLy8gICAgLy9yZXR1cm4gdGhhdC5pc2wuWmFwb2N0b3Z5TGlzdC56a29udHJvbHVqTmFQcnZuaURva2xhZFZLbml6ZSh7IGl4cERlbjogdGhhdC5ncGMuaXhwX2Rlbi8qSXhwRGVuKi8vKiwgc3VicmFkYTogMCovLyp0aGF0LlN1YnJhZGFEZW4qLyB9KVxyXG4gICAgICAgIC8vICAgIC8vICAgIC5nZXQoKVxyXG4gICAgICAgIC8vICAgIC8vICAgIC50aGVuKGZ1bmN0aW9uICh0ZXh0RG90YXp1KSB7XHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgIC8vIHBva3VkIGtvbnRyb2xhIHZyw6F0w60gZG90YXosIHRhayBzZSB6ZXB0YXQsIGplc3RsaSBtw6EgcHJ2bsOtIGRva2xhZCBzcHLDoXZuw6kgxI3DrXNsbywgamluYWsgamUgdG8gb2tcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgaWYgKHRleHREb3RhenUpIHJldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybShcImpyZXM6MjQxMDAzMjBcIiwgdGV4dERvdGF6dSkuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZCk7IC8vUkMgMjQxMDAzMjAgOiBOb3bDvSB6w6Fwb8SNdG92w70gbGlzdFxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpO1xyXG4gICAgICAgIC8vICAgIC8vICAgIH0pXHJcbiAgICAgICAgLy8gICAgLy8gICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAvLyBwxZnDrXBhZG7DqSBzZWptdXTDrSBQSUR1XHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCwgamFrIHBvdcW+w612YXQgZ2luX2dlbl9peHAgLSBidcSPIHRvIGTDoXQgamFrbyBwcm9txJtubm91IChiZXogZ2xvYmFscykgbmVibyB0byBuZWNoYXQgdiBnbG9iYWxzLCBhbGUgcGFrIG11c8OtIGLDvXQgdGVuIG9iamVrdCBhc2kgamluYWtcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgaWYgKChFa28uVXRpbHMuR2V0RWtvVXNlclNldHRpbmdzUGlkU2VqbXV0aSh0aGF0LCAodGhhdC5naW5fZ2VuX2l4cCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlJlemltR2VuSXhwLkdlbmVyb3ZhbmkgPyBcImFub1wiIDogXCJuZVwiKSkgPT09IFwiMVwiKSkge1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgLy8gc2VqbXV0w60gUElEdVxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgLy9pZiAodGhhdC8qR29yZGljLkZ1Yy5HbG9iYWxzLkdGdWNHbG9iYWxzKi8uZ2luX2dlbl9peHAgPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5SZXppbUdlbkl4cC5TZWptdXRpLyoudG9TdHJpbmcoKSovICYmIHJldHVybk9iai5wb2RhdCkge1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgLy8gcmXFvmltIHNlam11dMOtIFBJRHUgKHZlIHZvbGFuw6ltIG9rbsSbIGFsZSBqZSBtb8W+bsOpIFBJRCBpIHZ5Z2VuZXJvdmF0KVxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogZ2VuZXJvdsOhbsOtIFBJRHUgdiB0w6l0byBtZXRvZMSbIG5lanNlbSBzY2hvcGVuIHpha8OhemF0IGEgcG9kYWPDrSBwcm9jZWR1cmEgc2kgcyB0w61tIG5lcG9yYWTDrVxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogamRlIHBvdGxhxI1pdCBobMOhxaFrYSwgxb5lIFBJRCBqacW+IGV4aXN0dWplPyBhc2kgYW5vIGEgYnlsbyBieSB0byDFvsOhZG91Y8OtIC0gYXNpIHZsYXN0bm9zdCBIbGFzZW5pUHJpRXhpc3RlbmNpVkFnZW5kZSAobXVzZWxvIGJ5IHNlIGFzaSBwxZlpZGF0ICwgdHJ1ZSwgZmFsc2UpXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgICAgICByZXR1cm4gR29yZGljLldmbC5EaWFsb2dzLkdlbmVyb3ZhbmlJeHAodGhhdCwge1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgIFR5cERvazogR29yZGljLldmbC5HbG9iYWxzLkVudW1zLlR5cERvay5WbGFzdG5pLFxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgIFR5cElkOiBHb3JkaWMuV2ZsLkdsb2JhbHMuRW51bXMuVHlwSWQuSVhQLFxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgIERvdGF6UHJpRXhpc3RlbmNpVkppbmVBZ2VuZGU6IHRydWUsXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgICAgICAgICAgSGxhc2VuaVByaUV4aXN0ZW5jaVZBZ2VuZGU6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgIFpwdXNvYkdlbmVyb3Zhbmk6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5acHVzb2JHZW5lcm92YW5pSXhwLlN0aXRrZW1cclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIH0sIEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KVxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgc2UgdnLDoXRpbCBQSUQsIHBvdcW+aWppIGhvLCBqaW5hayBrb25lY1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsPy5JeHApIHJldHVybiByZXRWYWwuSXhwO1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICAvLyAgICAgICAgLy8gUElEIHNlIGJ1ZGUgZ2VuZXJvdmF0IChhxb4gdiBwb2TDoW7DrSB2IGRhbMWhw61tIGtyb2t1KVxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpO1xyXG4gICAgICAgIC8vICAgIC8vICAgIH0pXHJcbiAgICAgICAgLy8gICAgLy8gICAgLnRoZW4oZnVuY3Rpb24gKGl4cDogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCkge1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAvLyB2bGFzdG7DrSBwb2TDoW7DrVxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICByZXR1cm4gdGhhdC5pc2wuWmFwb2N0b3Z5TGlzdC5jcmVhdGUoe1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgaXhwOiAoaXhwID8/IFwiXCIpLFxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgaXhwX2RlbjogdGhhdC5ncGMuaXhwX2Rlbi8qSXhwRGVuKi9cclxuICAgICAgICAvLyAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuaXhwO1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgLy8gICAgfSlcclxuICAgICAgICAvLyAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAoaXhwOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgIC8vIHZ5dm9sw6Fuw60gdHJpZ2dlciBvIGFrdGl2bsOtIG9wZXJhY2lcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgdGhhdC50cmlnZ2VyKEZ1Y0RldGFpbC50cmlnZ2VyQ2hhbmdlLCBbeyBkYXRhOiB7IGl4cDogaXhwIH0gfV0pO1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAvLyBha3R1YWxpemFjZSBkYXQgLSB2xb5keSB6bm92dW5hxI10ZW7DrSBkZXRhaWx1LCBwcm90b8W+ZSBzZSBtxJtuw60gUElEXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgIHRoYXQubG9hZCh7XHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgICAgICBJeHA6IGl4cCxcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIE5hc2xlZHVqaWNpRGV0YWlsOiB0cnVlXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgIC8vICAgIH0pXHJcbiAgICAgICAgLy8gICAgLy8gICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAvLyBvYm5vdmVuw60gcMWvdm9kbsOtaG8gc3RhdnVcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgaWYgKHRoYXQuaXhwWmFkYW4oKSkge1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgLy8gem9icmF6ZW7DrSBkZXRhaWx1IHDFr3ZvZG7DrWhvIFBJRHVcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIHRoYXQubG9hZCgpO1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgLy8gemF2xZllbsOtIG9rbmEgKHZyYWPDrSBzZSBha3R1w6FsbsOtIGRhdGEpXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgICAgICB0aGF0LmNsb3NlKHRoYXQuRGV0YWlsRHRvKTtcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgfVxyXG4gICAgICAgIC8vICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIHpwxa9zb2J1IHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZFpweigpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5lamTFmcOtdmUgemppxaF0xJtuw60gaXhzX3pwelxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczoyNDEwMDQ5NFwiKTsgLy9SQyAyNDEwMDQ5NCA6IFByb2LDrWjDoSBuYcSNdGVuw60gaW5mb3JtYWPDrVxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuWnB6LnZyYXRJeHNacHooeyByYWRlazogdGhhdC5EZXRhaWxEdG8gfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpeHNfenB6OiBkYXRhIH07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5peHNfenB6ICYmIGRhdGEuaXhzX3pweiA+IFwiIFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5acHoucmVhZCgkLmV4dGVuZChkYXRhLCB7IHJva19peGU6IHRoYXQuRGV0YWlsRHRvLnJvay8qdGhhdC5Sb2sqLyB9KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb3Rhxb5lbsOtIHN1YsWZYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlpwei52cmF0U3VicmFkdSh7IHJhZGVrOiB0aGF0LkRldGFpbER0byB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHN1YnJhZGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEhLnN1YnJhZGFfZHV6ID0gc3VicmFkYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyDDunByYXZhIGRhdFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gVE9ETzogdXByYXZpdCBpIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAoZGF0YSAmJiBkYXRhLnJhZGt5ICYmIGRhdGEucmFka3kubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIEZ1Y0dyaWQuWnB6Lm1vZGlmeUR0b1JhZGt5KGRhdGEucmFka3kpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyYWRreSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZGF0YSEucmFka3kgPSByYWRreTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEvKjogRnVjLkludGVyZmFjZS5HWnB6RHRvIHwgdW5kZWZpbmVkKi8vKjogeyBkYXRhOiBGdWMuSW50ZXJmYWNlLkdacHpEdG8gfCB1bmRlZmluZWQsIHN1YnJhZGE6IG51bWJlciB9Ki8pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb2hsZWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEhLnJhZGt5ISwgeyBrZXk6IFwiaXhzX3pweixyb2tfaXhlXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFpweiEuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gcG9sw63EjWVrIHYgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdiBkZWJ1ZyByZcW+aW11IHpvYnJheml0IHYgbsOhenZ1IGkgUElEOiBcIltcIiArIHJldHVybk9iai5kYXRhIS5peHNfenB6ICsgXCJdIFwiICsgcmV0dXJuT2JqLmRhdGEhLm5hemV2XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgenB6X25hemV2OiByZXR1cm5PYmouZGF0YSEubmF6ZXYsIHpwel9zdWJyYWRhOiByZXR1cm5PYmouc3VicmFkYSB9LCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpwel9waWQ6IGRhdGEhLml4c196cHosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpwel9rb2Q6IGRhdGEhLmtvZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgenB6X25hemV2OiAvKih0aGF0LmNvbnRleHRQcm9wKFwiZGVidWdNb2RlXCIpID8gXCJbXCIgKyByZXR1cm5PYmouZGF0YSEuaXhzX3pweiArIFwiXSBcIiArIHJldHVybk9iai5kYXRhIS5uYXpldiA6ICovZGF0YSEubmF6ZXYvKikqLyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgenB6X3N1YnJhZGE6IGRhdGEhLnN1YnJhZGFfZHV6XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2Ugb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAvLyBvYmpla3QgcHJvIHDFmWVkw6F2w6Fuw60gaG9kbm90XHJcbiAgICAgICAgLy8gICAgaW50ZXJmYWNlIHJldHVybk9ialR5cGUge1xyXG4gICAgICAgIC8vICAgICAgICBkYXRhOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HWnB6RHRvIHwgbnVsbCxcclxuICAgICAgICAvLyAgICAgICAgc3VicmFkYTogbnVtYmVyIHwgbnVsbFxyXG4gICAgICAgIC8vICAgIH07XHJcbiAgICAgICAgLy8gICAgbGV0IHJldHVybk9iajogcmV0dXJuT2JqVHlwZSA9IHtcclxuICAgICAgICAvLyAgICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgICAvLyAgICAgICAgc3VicmFkYTogbnVsbCxcclxuICAgICAgICAvLyAgICB9O1xyXG4gICAgICAgIC8vICAgIC8vIGRlZmVycmVkIG9iamVrdCBwcm8gesWZZXTEm3plbsOtIG90w6F6ZWtcclxuICAgICAgICAvLyAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpLnJlc29sdmUocmV0dXJuT2JqKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgLy8gb2JzbHVoYSBqZWRub3RsaXbDvWNoIGbDoXrDrVxyXG4gICAgICAgIC8vICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjI0MTAwMDA3XCIpOyAvL1JDIDI0MTAwMDA3IDogTmHEjcOtdMOhbSBkYXRhXHJcbiAgICAgICAgLy8gICAgZGVmLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgIC8vICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIC8vICAgICAgICAvLyBUT0RPOiBuZWpkxZnDrXZlIHpqacWhdMSbbsOtIGl4c196cHpcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5pc2wuWnB6LnZyYXRJeHNacHooeyByYWRlazogdGhhdC5EZXRhaWxEdG8gfSlcclxuICAgICAgICAvLyAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm5PYmouZGF0YSA9IHsgaXhzX3pwejogZGF0YSB9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAocmV0dXJuT2JqLmRhdGEgIT09IG51bGwgJiYgcmV0dXJuT2JqLmRhdGEuaXhzX3pweiAhPT0gbnVsbCAmJiByZXR1cm5PYmouZGF0YS5peHNfenB6ICE9PSB1bmRlZmluZWQgJiYgcmV0dXJuT2JqLmRhdGEuaXhzX3pweiA+IFwiIFwiKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5pc2wuWnB6LnJlYWQoJC5leHRlbmQocmV0dXJuT2JqLmRhdGEsIHsgcm9rX2l4ZTogdGhhdC5Sb2sgfSkpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuT2JqLmRhdGEgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXR1cm5PYmopO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvLyBvcGVyYWNlIG5lZG9wYWRsYVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIGRvdGHFvmVuw60gc3VixZlhZHlcclxuICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuaXNsLlpwei52cmF0U3VicmFkdSh7IHJhZGVrOiB0aGF0LkRldGFpbER0byB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybk9iai5zdWJyYWRhID0gZGF0YTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmV0dXJuT2JqKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gb3BlcmFjZSBuZWRvcGFkbGFcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyDDunByYXZhIGRhdFxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdCBpIHBvbG/Fvmt5XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAocmV0dXJuT2JqLmRhdGEgIT09IG51bGwgJiYgcmV0dXJuT2JqLmRhdGEucmFka3kgIT09IG51bGwgJiYgcmV0dXJuT2JqLmRhdGEucmFka3kgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIEZ1Y0dyaWQuWnB6Lm1vZGlmeUR0b1JhZGt5KHJldHVybk9iai5kYXRhLnJhZGt5ISlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk9iai5kYXRhIS5yYWRreSA9IGRhdGE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXR1cm5PYmopO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgLy8gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJldHVybk9iai5kYXRhIS5yYWRreSEsIHsga2V5OiBcIml4c196cHoscm9rX2l4ZVwiIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgLy8gICAgICAgICAgICB0aGF0LiRncmlkWnB6LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gcG9sw63EjWVrIHYgesOhbG/FvmNlXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiB2IGRlYnVnIHJlxb5pbXUgem9icmF6aXQgdiBuw6F6dnUgaSBQSUQ6IFwiW1wiICsgcmV0dXJuT2JqLmRhdGEhLml4c196cHogKyBcIl0gXCIgKyByZXR1cm5PYmouZGF0YSEubmF6ZXZcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IHpwel9uYXpldjogcmV0dXJuT2JqLmRhdGEhLm5hemV2LCB6cHpfc3VicmFkYTogcmV0dXJuT2JqLnN1YnJhZGEgfSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgenB6X3BpZDogcmV0dXJuT2JqLmRhdGEhLml4c196cHosXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgenB6X2tvZDogcmV0dXJuT2JqLmRhdGEhLmtvZCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB6cHpfbmF6ZXY6IC8qKHRoYXQuY29udGV4dFByb3AoXCJkZWJ1Z01vZGVcIikgPyBcIltcIiArIHJldHVybk9iai5kYXRhIS5peHNfenB6ICsgXCJdIFwiICsgcmV0dXJuT2JqLmRhdGEhLm5hemV2IDogKi9yZXR1cm5PYmouZGF0YSEubmF6ZXYvKikqLyxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB6cHpfc3VicmFkYTogcmV0dXJuT2JqLnN1YnJhZGFcclxuICAgICAgICAvLyAgICAgICAgICAgIH0sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIG9rbmFcclxuICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIMO6xI1ldG7DrWNoIHrDoXBpc8WvIHBvaHlidVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRVY3RaYXBpc3koKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBkb8WZZcWhaXQgYWt0dcOhbG7DrSByb2sgeCByb2sgcG9oeWJ1IC0gcHJvIGppbsO9IG5hdMOhaG5vdXQgamlub3Uga29uZmlndXJhY2kgbmVibyB6b2JyYXplbsOtIMO6cGxuxJsgemFrw6F6YXQ/XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0OTJcIik7IC8vUkMgMjQxMDA0OTIgOiBQcm9iw61ow6EgbmHEjXRlbsOtIHrDoXBpc8WvXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5aYXBpcy5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogdGhhdC5EZXRhaWxEdG8uSmVSZXplcnZhY25pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV6ZXJ2YWNuaTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfcG9oeWJ1OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2l4cF91cHI6IHRoYXQuRGV0YWlsRHRvLml4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfcmFkZWtfdXBvOiAvKih0aGF0LkRldGFpbER0by5NYVJlemVydmFjbmkgPyB0aGF0LkRldGFpbER0by5yYWRla191cG9fcmV6IDogKi90aGF0LkRldGFpbER0by5yYWRla191cG8vKikqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgel9wb2h5YnU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfaXhwX3VwcjogdGhhdC5EZXRhaWxEdG8uaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19yYWRla191cG86IHRoYXQuRGV0YWlsRHRvLnJhZGVrX3VwbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19yYWRla196YXA6IHRoYXQuT3RldnJpdEtEdXBsaWthY2kgPT09IHRydWUgJiYgdGhhdC5aYXBpc3lLRHVwbGlrYWNpICE9IG51bGwgJiYgdGhhdC5aYXBpc3lLRHVwbGlrYWNpLmxlbmd0aCA+IDAgPyB0aGF0LlphcGlzeUtEdXBsaWthY2kgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcMWZw61wYWRuw6Egw7pwcmF2YSBkYXQgdiByZcW+aW11IGR1cGxpa2FjZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lk90ZXZyaXRLRHVwbGlrYWNpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgocmFkZWssIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdsO9IMWZw6FkZWsgesOhcGlzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsucmFkZWtfemFwID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvZHN0cmFuxJtuw60gZG5lIGEgbcSbc8OtY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRlay5kZW4gIT0gbnVsbCkgZGVsZXRlIHJhZGVrW1wiZGVuXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLm1lc2ljICE9IG51bGwpIGRlbGV0ZSByYWRla1tcIm1lc2ljXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RvxI1lbsOtIHpuYW3DqW5layDEjcOhc3Rla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLmMwICE9IG51bGwgJiYgIXBhcnNlRGVjaW1hbChyYWRlay5jMCA/PyAwKS5lcSgwKSkgcmFkZWsuYzAgPSBwYXJzZURlY2ltYWwocmFkZWsuYzAgPz8gMCkubXVsKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRlay5jMSAhPSBudWxsICYmICFwYXJzZURlY2ltYWwocmFkZWsuYzEgPz8gMCkuZXEoMCkpIHJhZGVrLmMxID0gcGFyc2VEZWNpbWFsKHJhZGVrLmMxID8/IDApLm11bCgtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFkZWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbsOtIHrDoXBpc8WvXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHBfdXByLHJhZGVrX3VwbyxyYWRla196YXBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkVWN0WmFwaXN5IS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHRhYnVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZVVjZXRuaVphcGlzeSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5haHLDoW7DrSBhIHpvYnJhemVuw60gZG9rbGFkdSBvIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZERva2xhZE9aYXVjdG92YW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogZG/FmWXFoWl0IGFrdHXDoWxuw60gcm9rIHggcm9rIHBvaHlidSAtIHBybyBqaW7DvSBuYXTDoWhub3V0IGppbm91IGtvbmZpZ3VyYWNpIG5lYm8gem9icmF6ZW7DrSDDunBsbsSbIHpha8OhemF0P1xyXG5cclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdCBobGF2acSNa3kgKHBvdXplIHBybyB6b2JyYXplbsOtIGRva2xhZHUpXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjI0MTAwNDc5XCIpOyAvL1JDIDI0MTAwNDc5IDogUHJvYsOtaMOhIG5hxI10ZW7DrSBkb2tsYWTFr1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuWmFwaXMubGlzdERva2xhZHUocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB7IHpfcG9oeWJ1OiAxLCBkb2tfaXhwX3VwcjogdGhhdC5EZXRhaWxEdG8uaXhwX3VwciwgZG9rX3JhZGVrX3VwbzogdGhhdC5EZXRhaWxEdG8ucmFkZWtfdXBvIH0gfTsgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJyb2ssbGljLGljbyx1Y3MsbWVzaWMsYWNcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkRG9rbGFkT1phdWMhLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSB6w6FwaXPFryBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFrdERva2xhZCA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHRoYXQuJGdyaWREb2tsYWRPWmF1Yyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFrdERva2xhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuWmFwaXMubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX3JvazogYWt0RG9rbGFkIS5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19saWM6IGFrdERva2xhZCEubGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfaWNvOiBha3REb2tsYWQhLmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX3VjczogYWt0RG9rbGFkIS51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19tZXNpYzogYWt0RG9rbGFkIS5tZXNpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2FjOiBha3REb2tsYWQhLmFjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwicmFkZWtfemFwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFphcGlzeURva2xhZHVPWmF1YyEuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IGRhbMWhw61jaCBwb2h5YsWvIChwb3V6ZSBwcm8gem9icmF6ZW7DrSBkb2tsYWR1KVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBha3REb2tsYWQgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRnVjLkludGVyZmFjZS5HRG9rbGFkRHRvPih0aGF0LiRncmlkRG9rbGFkT1phdWMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChha3REb2tsYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChha3REb2tsYWQucG9jX3BvaHlidV9kb2tsYWR1ID8/IDEpID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3R1asOtIGRhbMWhw60gcG9oeWJ5IMO6xI10b3ZhbsOpIGRva2xhZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWIubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWN0X3N0X2Rva2xhZDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjdF9iZXpfaXhwX3VwcjogdGhhdC5EZXRhaWxEdG8uaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjdF9iZXpfcmFkZWtfdXBvOiB0aGF0LkRldGFpbER0by5yYWRla191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3Rfcm9rOiBha3REb2tsYWQhLnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjdF9saWM6IGFrdERva2xhZCEubGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWN0X2ljbzogYWt0RG9rbGFkIS5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3RfdWNzOiBha3REb2tsYWQhLnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjdF9tZXNpYzogYWt0RG9rbGFkIS5tZXNpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjdF9hYzogYWt0RG9rbGFkIS5hY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwX3VwcixyYWRla191cG9cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRPc3RQb2h5YnlEb2tsYWR1T1phdWMhLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVleGlzdHVqw60gZGFsxaHDrSBwb2h5Ynkgw7rEjXRvdmFuw6kgZG9rbGFkZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW10sIHsga2V5OiBcIml4cF91cHIscmFkZWtfdXBvXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRPc3RQb2h5YnlEb2tsYWR1T1phdWMhLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gdGFidVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlRG9rbGFkT1phdWN0b3ZhbmkoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIHJlemVydmHEjW7DrWNoIHrDoXBpc8WvXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZFJlelphcGlzeSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBha3R1w6FsbsOtIHJvayB4IHJvayBwb2h5YnUgLSBwcm8gamluw70gbmF0w6Fobm91dCBqaW5vdSBrb25maWd1cmFjaSBuZWJvIHpvYnJhemVuw60gw7pwbG7EmyB6YWvDoXphdD8gdG8gc3Rlam7DqSBqZSB2IHRhYnUgw7rEjXRvdsOhbsOtXHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0OTJcIik7IC8vUkMgMjQxMDA0OTIgOiBQcm9iw61ow6EgbmHEjXRlbsOtIHrDoXBpc8WvXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5aYXBpcy5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXplcnZhY25pOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2tfaXhwX3VwcjogdGhhdC5EZXRhaWxEdG8uaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9rX3JhZGVrX3VwbzogKHRoYXQuRGV0YWlsRHRvLk1hUmV6ZXJ2YWNuaSA/IFt0aGF0LkRldGFpbER0by5yYWRla191cG9fcmV6LCB0aGF0LkRldGFpbER0by5yYWRla191cG9dIDogdGhhdC5EZXRhaWxEdG8ucmFkZWtfdXBvKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvaGxlZFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwicmFkZWtfemFwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFJlelphcGlzeSEuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2Ugb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlUmV6ZXJ2YWNuaVphcGlzeSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5haHLDoW7DrSBhIHpvYnJhemVuw60gbmF2w6F6YW7DvWNoIHBvaHlixa9cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkTmF2YXphbmVQb2h5YnkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IHrDoXBpc8WvXHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzOiBhbnkgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyBmaWx0cnkgcG9kbGUgdHlwdSB6b2JyYXplbsOtICh2xb5keSBidcSPIHDFmcOtbW8geiBwb2h5YnUgbmVibyB6IG5hdsOhemFuw6lobyByZXplcnZhxI1uw61obylcclxuICAgICAgICAgICAgaWYgKHRoYXQuRGV0YWlsRHRvLkplVWNldG5pKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBuYXbDoXphbsO9IHJlemVydmHEjW7DrVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuRGV0YWlsRHRvLk1hUmV6ZXJ2YWNuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF91cHI6IHRoYXQuRGV0YWlsRHRvLml4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrX3VwbzogdGhhdC5EZXRhaWxEdG8ucmFkZWtfdXBvX3JlelxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBuYXbDoXphbsOpIMO6xI1ldG7DrVxyXG4gICAgICAgICAgICAgICAgZmlsdGVycyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBfdXByOiB0aGF0LkRldGFpbER0by5peHBfdXByLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrX3Vwb19yZXo6IHRoYXQuRGV0YWlsRHRvLnJhZGVrX3Vwb1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gcG9oeWLFr1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVycykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0ODBcIik7IC8vUkMgMjQxMDA0ODAgOiBQcm9iw61ow6EgbmHEjXRlbsOtIHBvaHlixa9cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi5saXN0KHJxID0+IHsgcmV0dXJuIHsgZmlsdGVyczogZmlsdGVycyB9OyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2hsZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHBfdXByLHJhZGVrX3Vwb1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZE5hdmF6YW5lUG9oeWJ5IS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2Ugb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIGJhbmtvdm7DrWhvIHbDvXBpc3VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkVnlwaXMoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgIC8vIFRPRE86IHDFmWlwYWQgcG9sb8W+a3VcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0OTVcIik7IC8vUkMgMjQxMDA0OTUgOiBQcm9iw61ow6EgbmHEjXRlbsOtIHbDvXBpc3VcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkJhbmtvdm5pVnlwaXMucmVhZCh7IGl4cDogdGhhdC5EZXRhaWxEdG8uaXhwX2J2cCwgcG9sb3preTogW3sgcmFkZWtfcG9sOiB0aGF0LkRldGFpbER0by5yYWRla19idnAsIHN1YnJhZGVrOiB0aGF0LkRldGFpbER0by5zdWJyYWRla19idnAsIHJhZGVrX2F2OiB0aGF0LkRldGFpbER0by5yYWRla19hdl9idnAgfV0gfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gemFkZWZpbm92w6Fuw60gdGFidSBwb2RsZSBha3R1w6FsbsOtY2ggZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogemFkZWZpbm92YXQgdHlweT9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZHRvQnZwOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HQmFua292bmlWeXBpc0R0byB8IG51bGwgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdG9CdnBQb2w6IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2xvemthQmFua292bmlob1Z5cGlzdUR0byB8IG51bGwgPSAoZGF0YSAgJiYgZGF0YS5wb2xvemt5ICYmIGRhdGEucG9sb3preS5sZW5ndGggPiAwID8gZGF0YS5wb2xvemt5IVswXSA6IG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdG9CdnBQb2xSb3o6IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2xvemthQmFua292bmlob1Z5cGlzdUR0byB8IG51bGwgPSAoZGF0YSAmJiBkYXRhLnBvbG96a3kgJiYgZGF0YS5wb2xvemt5Lmxlbmd0aCA+IDEgPyBkYXRhLnBvbG96a3khWzFdIDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybVZ5cGlzXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogamVkZW4geiBiYW5rb3Zuw61jaCB2w71waXPFryBzbWF6YXQgYSBkb8SNaXN0aXQgaSBhcHBseSBuw63FvmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwNzRcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYnZwX3R4dFwiIH0pOyAvL1JDIDI0MTAwMDc0IDogQmFua292bsOtIHbDvXBpc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vLmFkZFJvdyhcIkJhbmtvdm7DrSB2w71waXNcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5idWNzcGlkKCksIHsgLypkaXNhYmxlZDogdHJ1ZSwgKi9uYW1lOiBcImJ2cFwiLCBtb2RlbDogXCJidnBfaXhwPWl4cFwiLyo7YnZwX2J1X3ZsPWJ1X3ZsO2J2cF9za192bD1za192bDtidnBfcm9rX3BpZD1yb2tfcGlkO2J2cF9jaXNfcGlkPWNpc19waWQ7YnZwX2RhdF9ub3ZfenVzPWRhdF9ub3ZfenVzXCIqLyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkdG9CdnAgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQodmFscywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcG9rdWQgdG8gesWvc3RhbmUsIHRhayB0ZXh0IGTDoXQgZG8gcmVzb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ2cF90eHQ6IFwiYsO6IHswfS97MX0sIMSNw61zbG8gezJ9L3szfSB6IHs0fVwiLmZvcm1hdChkdG9CdnAuYnVfdmwhLCBkdG9CdnAuc2tfdmwhLCBkdG9CdnAucm9rX3BpZCEsIGR0b0J2cC5jaXNfcGlkISwgR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKGR0b0J2cC5kYXRfbm92X3p1cyEsIFwiZC4gTS4geXl5eVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYnZwX2l4cDogZHRvQnZwLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYnZwX2J1X3ZsOiBkdG9CdnAuYnVfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2J2cF9za192bDogZHRvQnZwLnNrX3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9idnBfcm9rX3BpZDogZHRvQnZwLnJva19waWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2J2cF9jaXNfcGlkOiBkdG9CdnAuY2lzX3BpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYnZwX2RhdF9ub3ZfenVzOiBkdG9CdnAuZGF0X25vdl96dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZHRvQnZwUG9sICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUG9sb8W+a2FcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IHBvbG/Fvmt5XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuYnVjY3NwbygpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImJ2cF9wb2xfc19wb2xcIiwgbW9kZWw6IFwiYnZwX3BvbF9zX3BvbD1zX3BvbFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA4NFwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYnZwX3BvbF9kYXRfemFwXCIgfSkgLy9SQyAyNDEwMDA4NCA6IERhdHVtIHphcGxhY2Vuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMDgxXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImJ2cF9wb2xfYnVfY2lfdHh0XCIgfSkgLy9SQyAyNDEwMDA4MSA6IEJhbmtvdm7DrSDDusSNZXQgY2l6w61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoRnVjRGV0YWlsLnByZWZhYlZzS3NTcyhcImJ2cF9wb2xfXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwODJcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy04XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImJ2cF9wb2xfY19tZW5hXCIgfSkuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy00XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jbWVuKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYnZwX3BvbF9tZW5hXCIsIG1vZGVsOiBcImJ2cF9wb2xfbWVuYT1tZW5hXCIgfSkgLy9SQyAyNDEwMDA4MiA6IMSMw6FzdGthIHYgbcSbbsSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA4M1wiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYnZwX3BvbF9jXCIgfSk7IC8vUkMgMjQxMDAwODMgOiDEjMOhc3RrYSB2IENaS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZCh2YWxzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidnBfcG9sX3NfcG9sOiBkdG9CdnBQb2wuc19wb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidnBfcG9sX2RhdF96YXA6IGR0b0J2cFBvbC5kYXRfemFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9idV9jaV90eHQ6IGR0b0J2cFBvbC5idV9jaV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidnBfcG9sX3ZzOiBkdG9CdnBQb2wudnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidnBfcG9sX3NzOiBkdG9CdnBQb2wuc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidnBfcG9sX2tzOiBkdG9CdnBQb2wua3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidnBfcG9sX2NfbWVuYTogZHRvQnZwUG9sLmNfbWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ2cF9wb2xfbWVuYTogZHRvQnZwUG9sLm1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidnBfcG9sX2M6IGR0b0J2cFBvbC5jXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZHRvQnZwUG9sUm96ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUm96ZXBzYW7DoSBwb2xvxb5rYVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgcG9sb8W+a3lcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5idWNjc3BvKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYnZwX3BvbF9yb3pfc19wb2xcIiwgbW9kZWw6IFwiYnZwX3BvbF9yb3pfc19wb2w9c19wb2xcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwODRcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImJ2cF9wb2xfcm96X2RhdF96YXBcIiB9KSAvL1JDIDI0MTAwMDg0IDogRGF0dW0gemFwbGFjZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwODFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYnZwX3BvbF9yb3pfYnVfY2lfdHh0XCIgfSkgLy9SQyAyNDEwMDA4MSA6IEJhbmtvdm7DrSDDusSNZXQgY2l6w61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoRnVjRGV0YWlsLnByZWZhYlZzS3NTcyhcImJ2cF9wb2xfcm96X1wiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMDgyXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctOFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJidnBfcG9sX3Jvel9jX21lbmFcIiB9KS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTRcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2NtZW4oKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJidnBfcG9sX3Jvel9tZW5hXCIsIG1vZGVsOiBcImJ2cF9wb2xfcm96X21lbmE9bWVuYVwiIH0pIC8vUkMgMjQxMDAwODIgOiDEjMOhc3RrYSB2IG3Em27Em1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwODNcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImJ2cF9wb2xfcm96X2NcIiB9KTsgLy9SQyAyNDEwMDA4MyA6IMSMw6FzdGthIHYgQ1pLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHZhbHMsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ2cF9wb2xfcm96X3NfcG9sOiBkdG9CdnBQb2xSb3ouc19wb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidnBfcG9sX3Jvel9kYXRfemFwOiBkdG9CdnBQb2xSb3ouZGF0X3phcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ2cF9wb2xfcm96X2J1X2NpX3R4dDogZHRvQnZwUG9sUm96LmJ1X2NpX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ2cF9wb2xfcm96X3ZzOiBkdG9CdnBQb2xSb3oudnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidnBfcG9sX3Jvel9zczogZHRvQnZwUG9sUm96LnNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9yb3pfa3M6IGR0b0J2cFBvbFJvei5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ2cF9wb2xfcm96X2NfbWVuYTogZHRvQnZwUG9sUm96LmNfbWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ2cF9wb2xfcm96X21lbmE6IGR0b0J2cFBvbFJvei5tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9yb3pfYzogZHRvQnZwUG9sUm96LmNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkdGFiRm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC4kdGFiVnlwaXMhKS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBwb2zDrVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGtvbnRyb2xvdmF0LCBqZXN0bGkgc2UgdsO9cGlzIHNrdXRlxI1uxJsgdnlzZWxla3RvdmFsPyBrdsWvbGkgYnZwX3R4dFxyXG4gICAgICAgICAgICAgICAgICAgICR0YWJGb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHZhbHMsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyAgICAvLyBvYmpla3QgcHJvIHDFmWVkw6F2w6Fuw60gaG9kbm90XHJcbiAgICAgICAgLy8gICAgaW50ZXJmYWNlIHJldHVybk9ialR5cGUge1xyXG4gICAgICAgIC8vICAgICAgICBkYXRhOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HQmFua292bmlWeXBpc0R0byB8IG51bGxcclxuICAgICAgICAvLyAgICB9O1xyXG4gICAgICAgIC8vICAgIGxldCByZXR1cm5PYmo6IHJldHVybk9ialR5cGUgPSB7XHJcbiAgICAgICAgLy8gICAgICAgIGRhdGE6IG51bGxcclxuICAgICAgICAvLyAgICB9O1xyXG4gICAgICAgIC8vICAgIC8vIGRlZmVycmVkIG9iamVrdCBwcm8gesWZZXTEm3plbsOtIG90w6F6ZWtcclxuICAgICAgICAvLyAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpLnJlc29sdmUocmV0dXJuT2JqKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgLy8gb2JzbHVoYSBqZWRub3RsaXbDvWNoIGbDoXrDrVxyXG4gICAgICAgIC8vICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjI0MTAwMDA3XCIpOyAvL1JDIDI0MTAwMDA3IDogTmHEjcOtdMOhbSBkYXRhXHJcbiAgICAgICAgLy8gICAgZGVmLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgIC8vICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIC8vICAgICAgICAvLyBuYcSNdGVuw60gZGF0XHJcbiAgICAgICAgLy8gICAgICAgIC8vIFRPRE86IHDFmWlwYWQgcG9sb8W+a3VcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5pc2wuQmFua292bmlWeXBpcy5yZWFkKHsgaXhwOiB0aGF0LkRldGFpbER0by5peHBfYnZwLCBwb2xvemt5OiBbeyByYWRla19wb2w6IHRoYXQuRGV0YWlsRHRvLnJhZGVrX2J2cCwgc3VicmFkZWs6IHRoYXQuRGV0YWlsRHRvLnN1YnJhZGVrX2J2cCwgcmFkZWtfYXY6IHRoYXQuRGV0YWlsRHRvLnJhZGVrX2F2X2J2cCB9XSB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybk9iai5kYXRhID0gZGF0YS5kYXRhO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC8vLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgIC8vICAgICAgICAvLyAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgIC8vICAgICAgICAvLyAgICAvLyDDunByYXZhIGRhdFxyXG4gICAgICAgIC8vICAgICAgICAvLyAgICAvLyBUT0RPOiB1cHJhdml0IGkgcG9sb8W+a3lcclxuICAgICAgICAvLyAgICAgICAgLy8gICAgaWYgKHJldHVybk9iai5kYXRhICE9PSBudWxsICYmIHJldHVybk9iai5kYXRhLnBvbG96a3kgIT09IG51bGwgJiYgcmV0dXJuT2JqLmRhdGEucG9sb3preSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gICAgICAgIC8vICAgICAgICBGdWNHcmlkLkJhbmtvdm5pVnlwaXMubW9kaWZ5RHRvUG9sb3playhyZXR1cm5PYmouZGF0YS5wb2xvemt5ISlcclxuICAgICAgICAvLyAgICAgICAgLy8gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm5PYmouZGF0YSEucG9sb3preSA9IGRhdGE7XHJcbiAgICAgICAgLy8gICAgICAgIC8vICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgLy8gICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgIC8vICAgICAgICBkZWYucmVzb2x2ZShyZXR1cm5PYmopO1xyXG4gICAgICAgIC8vICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIC8vICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAvL30pXHJcbiAgICAgICAgLy8gICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIHphZGVmaW5vdsOhbsOtIHRhYnUgcG9kbGUgYWt0dcOhbG7DrWNoIGRhdFxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogemFkZWZpbm92YXQgdHlweT9cclxuICAgICAgICAvLyAgICAgICAgICAgIGxldCBkdG9CdnA6IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdCYW5rb3ZuaVZ5cGlzRHRvIHwgbnVsbCA9IHJldHVybk9iai5kYXRhO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbGV0IGR0b0J2cFBvbDogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvbG96a2FCYW5rb3ZuaWhvVnlwaXN1RHRvIHwgbnVsbCA9IChyZXR1cm5PYmouZGF0YSAhPT0gbnVsbCAmJiByZXR1cm5PYmouZGF0YS5wb2xvemt5ICE9PSBudWxsICYmIHJldHVybk9iai5kYXRhLnBvbG96a3khLmxlbmd0aCA+IDAgPyByZXR1cm5PYmouZGF0YS5wb2xvemt5IVswXSA6IG51bGwpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbGV0IGR0b0J2cFBvbFJvejogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvbG96a2FCYW5rb3ZuaWhvVnlwaXN1RHRvIHwgbnVsbCA9IChyZXR1cm5PYmouZGF0YSAhPT0gbnVsbCAmJiByZXR1cm5PYmouZGF0YS5wb2xvemt5ICE9PSBudWxsICYmIHJldHVybk9iai5kYXRhLnBvbG96a3khLmxlbmd0aCA+IDEgPyByZXR1cm5PYmouZGF0YS5wb2xvemt5IVsxXSA6IG51bGwpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbGV0IHZhbHMgPSB7fTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtVnlwaXNcIiB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gVE9ETzogamVkZW4geiBiYW5rb3Zuw61jaCB2w71waXPFryBzbWF6YXQgYSBkb8SNaXN0aXQgaSBhcHBseSBuw63FvmVcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmFua292bsOtIHbDvXBpc1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJidnBfdHh0XCIgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy5hZGRSb3coXCJCYW5rb3Zuw60gdsO9cGlzXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuYnVjc3BpZCgpLCB7IC8qZGlzYWJsZWQ6IHRydWUsICovbmFtZTogXCJidnBcIiwgbW9kZWw6IFwiYnZwX2l4cD1peHBcIi8qO2J2cF9idV92bD1idV92bDtidnBfc2tfdmw9c2tfdmw7YnZwX3Jva19waWQ9cm9rX3BpZDtidnBfY2lzX3BpZD1jaXNfcGlkO2J2cF9kYXRfbm92X3p1cz1kYXRfbm92X3p1c1wiKi8gfSlcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmIChkdG9CdnAgIT09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAkLmV4dGVuZCh2YWxzLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHBva3VkIHRvIHrFr3N0YW5lLCB0YWsgdGV4dCBkw6F0IGRvIHJlc291cmNlXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGJ2cF90eHQ6IFwiYsO6IHswfS97MX0sIMSNw61zbG8gezJ9L3szfSB6IHs0fVwiLmZvcm1hdChkdG9CdnAuYnVfdmwhLCBkdG9CdnAuc2tfdmwhLCBkdG9CdnAucm9rX3BpZCEsIGR0b0J2cC5jaXNfcGlkISwgR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKGR0b0J2cC5kYXRfbm92X3p1cyEsIFwiZC4gTS4geXl5eVwiKSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9idnBfaXhwOiBkdG9CdnAuaXhwLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL2J2cF9idV92bDogZHRvQnZwLmJ1X3ZsLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL2J2cF9za192bDogZHRvQnZwLnNrX3ZsLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL2J2cF9yb2tfcGlkOiBkdG9CdnAucm9rX3BpZCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9idnBfY2lzX3BpZDogZHRvQnZwLmNpc19waWQsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vYnZwX2RhdF9ub3ZfenVzOiBkdG9CdnAuZGF0X25vdl96dXMsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAoZHRvQnZwUG9sICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZm9ybVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlBvbG/FvmthXCIpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IHBvbG/Fvmt5XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuYnVjY3NwbygpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImJ2cF9wb2xfc19wb2xcIiwgbW9kZWw6IFwiYnZwX3BvbF9zX3BvbD1zX3BvbFwiIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMDg0XCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJidnBfcG9sX2RhdF96YXBcIiB9KSAvL1JDIDI0MTAwMDg0IDogRGF0dW0gemFwbGFjZW7DrVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA4MVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJidnBfcG9sX2J1X2NpX3R4dFwiIH0pIC8vUkMgMjQxMDAwODEgOiBCYW5rb3Zuw60gw7rEjWV0IGNpesOtXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoRnVjRGV0YWlsLnByZWZhYlZzS3NTcyhcImJ2cF9wb2xfXCIpKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA4MlwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LThcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYnZwX3BvbF9jX21lbmFcIiB9KS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTRcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2NtZW4oKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJidnBfcG9sX21lbmFcIiwgbW9kZWw6IFwiYnZwX3BvbF9tZW5hPW1lbmFcIiB9KSAvL1JDIDI0MTAwMDgyIDogxIzDoXN0a2EgdiBtxJtuxJtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwODNcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImJ2cF9wb2xfY1wiIH0pOyAvL1JDIDI0MTAwMDgzIDogxIzDoXN0a2EgdiBDWktcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAkLmV4dGVuZCh2YWxzLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGJ2cF9wb2xfc19wb2w6IGR0b0J2cFBvbC5zX3BvbCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9kYXRfemFwOiBkdG9CdnBQb2wuZGF0X3phcCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9idV9jaV90eHQ6IGR0b0J2cFBvbC5idV9jaV90eHQsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGJ2cF9wb2xfdnM6IGR0b0J2cFBvbC52cyxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9zczogZHRvQnZwUG9sLnNzLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBidnBfcG9sX2tzOiBkdG9CdnBQb2wua3MsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGJ2cF9wb2xfY19tZW5hOiBkdG9CdnBQb2wuY19tZW5hLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBidnBfcG9sX21lbmE6IGR0b0J2cFBvbC5tZW5hLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBidnBfcG9sX2M6IGR0b0J2cFBvbC5jXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAoZHRvQnZwUG9sUm96ICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZm9ybVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlJvemVwc2Fuw6EgcG9sb8W+a2FcIilcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgcG9sb8W+a3lcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5idWNjc3BvKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYnZwX3BvbF9yb3pfc19wb2xcIiwgbW9kZWw6IFwiYnZwX3BvbF9yb3pfc19wb2w9c19wb2xcIiB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDA4NFwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYnZwX3BvbF9yb3pfZGF0X3phcFwiIH0pIC8vUkMgMjQxMDAwODQgOiBEYXR1bSB6YXBsYWNlbsOtXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMDgxXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImJ2cF9wb2xfcm96X2J1X2NpX3R4dFwiIH0pIC8vUkMgMjQxMDAwODEgOiBCYW5rb3Zuw60gw7rEjWV0IGNpesOtXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoRnVjRGV0YWlsLnByZWZhYlZzS3NTcyhcImJ2cF9wb2xfcm96X1wiKSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAwODJcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy04XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImJ2cF9wb2xfcm96X2NfbWVuYVwiIH0pLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvY21lbigpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImJ2cF9wb2xfcm96X21lbmFcIiwgbW9kZWw6IFwiYnZwX3BvbF9yb3pfbWVuYT1tZW5hXCIgfSkgLy9SQyAyNDEwMDA4MiA6IMSMw6FzdGthIHYgbcSbbsSbXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMDgzXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJidnBfcG9sX3Jvel9jXCIgfSk7IC8vUkMgMjQxMDAwODMgOiDEjMOhc3RrYSB2IENaS1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICQuZXh0ZW5kKHZhbHMsIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9yb3pfc19wb2w6IGR0b0J2cFBvbFJvei5zX3BvbCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9yb3pfZGF0X3phcDogZHRvQnZwUG9sUm96LmRhdF96YXAsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGJ2cF9wb2xfcm96X2J1X2NpX3R4dDogZHRvQnZwUG9sUm96LmJ1X2NpX3R4dCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9yb3pfdnM6IGR0b0J2cFBvbFJvei52cyxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9yb3pfc3M6IGR0b0J2cFBvbFJvei5zcyxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9yb3pfa3M6IGR0b0J2cFBvbFJvei5rcyxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9yb3pfY19tZW5hOiBkdG9CdnBQb2xSb3ouY19tZW5hLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBidnBfcG9sX3Jvel9tZW5hOiBkdG9CdnBQb2xSb3oubWVuYSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgYnZwX3BvbF9yb3pfYzogZHRvQnZwUG9sUm96LmNcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIGxldCAkdGFiRm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC4kdGFiVnlwaXMpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gcG9sw61cclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIFRPRE86IGtvbnRyb2xvdmF0LCBqZXN0bGkgc2UgdsO9cGlzIHNrdXRlxI1uxJsgdnlzZWxla3RvdmFsPyBrdsWvbGkgYnZwX3R4dFxyXG4gICAgICAgIC8vICAgICAgICAgICAgJHRhYkZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdmFscywgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFocsOhbsOtIGEgem9icmF6ZW7DrSBwb2xvxb5layBJSVNTUFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRJaXNzcCgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwb2xvxb5la1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczoyNDEwMDQ5NFwiKTsgLy9SQyAyNDEwMDQ5NCA6IFByb2LDrWjDoSBuYcSNdGVuw60gaW5mb3JtYWPDrVxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuSWlzc3AubGlzdFBvbG96ZWsocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB7IGlkX2hkcl9yaXM6IHRoYXQuRGV0YWlsRHRvLmlkX2hkcl9yaXMsIHJhZGVrX2hkcjogdGhhdC5EZXRhaWxEdG8ucmFkZWtfaGRyIH0gfTsgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHNfaHByLHJhZGVrX2dpbixzdWJyYWRla19naW5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkUG9sb3preUlpc3NwIS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBva25hXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSBub3bDqWhvIHBvaHlidSB6ZHVwbGlrb3bDoW7DrW0gYWt0dcOhbG7DrWhvIHBvaHlidSBhIG90b8SNZW7DrW0gem5hbcOpbmthXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbm92eVBvaHliKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRsZyA9IEZ1Y0RldGFpbC5zaW1wbGVGb3JtT2tDYW5jZWwoXHJcbiAgICAgICAgICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMi0xMC0wLCBNLTItMTAtMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTEyLTEyLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dChcImpyZXM6MjQxMDA0ODZcIikgLy9SQyAyNDEwMDQ4NiA6IFZ5dHZvxZllbsOtIG5vdsOpaG8gcG9oeWJ1IGtvcGnDrSBzIMO6cHJhdmFtaSBwb2RsZSBuw63FvmUgdXZlZGVuw71jaCBwYXJhbWV0csWvXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMjk0XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZHV2b2RcIiwgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSkgLy9SQyAyNDEwMDI5NCA6IETFr3ZvZFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczoyNDEwMDQ5MFwiKSAvL1JDIDI0MTAwNDkwIDogUGFyYW1ldHJ5IHBvaHlidVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwidHlwX3Vwb19ydWNuaVwiLCBsYWJlbDogXCJqcmVzOjI0MTAwNDg3XCIsIGRpc2FibGVkOiB0cnVlIH0pIC8vUkMgMjQxMDA0ODcgOiB0eXAgcG9oeWJ1IFJ1xI1uw61cclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcIm9wYWNuZV96bmFtXCIsIGxhYmVsOiBcImpyZXM6MjQxMDA0ODhcIiwgZGlzYWJsZWQ6IHRydWUgfSkgLy9SQyAyNDEwMDQ4OCA6IG9wYcSNbsOhIHpuYW3DqW5rYSDEjcOhc3Rla1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczoyNDEwMDQ5MVwiKSAvL1JDIDI0MTAwNDkxIDogWsOhcGlzeVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwib3BhY25lX3puYW1cIiwgbGFiZWw6IFwianJlczoyNDEwMDQ4OVwiLCBkaXNhYmxlZDogdHJ1ZSB9KSAvL1JDIDI0MTAwNDg5IDogemtvcMOtcm92YXQgdnlicmFuw6kgesOhcGlzeSAocyBvcGHEjW7DvW1pIHpuYW3DqW5reSDEjcOhc3RlaylcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBfdXBvX3J1Y25pOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNuZV96bmFtOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGtvcGlyb3ZhdF96YXBpc3k6IHRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0Tm92eVBvaHliIS5jYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgNjUwLFxyXG4gICAgICAgICAgICAgICAgNjAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGxldCAkZ3JpZFphcGlzeSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhkbGcpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcGlzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkWmFwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdDpcclxuICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcImFjX2FnXCIsIFwiYWNcIiwgXCJpY29fZXN1XCIsIFwicmNfZXN1XCIsIFwibmF6ZXZfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuWmFwaXMuY3JlYXRlR3JpZEZvcm1hdE4odGhhdCwgeyBkcmQ6IHRydWUsIGRhdHVtOiB0cnVlLCBkcGg6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoLy97XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXNpemVyc09uVGFiOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgLyp9Ki8pO1xyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLypjb25zdCBwcm9tID0gKi90aGF0LmlzbC5aYXBpcy5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHRoYXQuRGV0YWlsRHRvLkplUmV6ZXJ2YWNuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXplcnZhY25pOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6X3BvaHlidTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2l4cF91cHI6IHRoYXQuRGV0YWlsRHRvLml4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19yYWRla191cG86IC8qKHRoYXQuRGV0YWlsRHRvLk1hUmV6ZXJ2YWNuaSA/IHRoYXQuRGV0YWlsRHRvLnJhZGVrX3Vwb19yZXogOiAqL3RoYXQuRGV0YWlsRHRvLnJhZGVrX3Vwby8qKSovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6X3BvaHlidTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2l4cF91cHI6IHRoYXQuRGV0YWlsRHRvLml4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19yYWRla191cG86IHRoYXQuRGV0YWlsRHRvLnJhZGVrX3Vwb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbsOtIHrDoXBpc8WvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcIml4cF91cHIscmFkZWtfdXBvLHJhZGVrX3phcFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZ3JpZFphcGlzeS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvem5hxI1lbsOtIHbFoWVjaCDFmcOhZGvFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdCA9IHZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSwgXCJkYXRhXCIpIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0LmZvckVhY2goKGkpID0+IHsgaS5jaGVja2VkID0gdHJ1ZTsgcmV0dXJuIGk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZURhdGEoZGF0LCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRsZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZTx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXZvZDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cF91cG9fcnVjbmk6IGJvb2xlYW4gfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY25lX3puYW06IGJvb2xlYW4gfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga29waXJvdmF0X3phcGlzeTogYm9vbGVhbiB8IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfT4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGlhbG9nUmV0dXJuVmFsdWUpID0+IHsgcmV0dXJuIGRpYWxvZ1JldHVyblZhbHVlID8gdHJ1ZSA6IGZhbHNlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6YXpuYW15ID0gJGdyaWRaYXBpc3kuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcGlzRHRvPihcImdldFNlbGVjdGlvblwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmcOtem5hayBha3Rpdm7DrSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmVlZFJlZnJlc2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdSBub3bDqWhvIHBvaHlidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRkZXRhaWxXaW5kb3cgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxQb2h5YnVcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogJ0RldGFpbFBvaHlidSMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHBVcHI6IHRoYXQuSXhwVXByLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSYWRla1VwbzogdGhhdC5SYWRla1VwbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IGR1cGxpa292w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3RldnJpdEtEdXBsaWthY2k6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFphcGlzeUtEdXBsaWthY2k6IHphem5hbXkuZmlsdGVyKHIgPT4gci5jaGVja2VkICYmIHIuZGF0YT8ucmFkZWtfemFwICE9IG51bGwgJiYgci5kYXRhLnJhZGVrX3phcCA+IDApLm1hcChyID0+IHIuZGF0YS5yYWRla196YXApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEtEdXBsaWthY2k6IGRhdGEuZHV2b2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JzbHVoYSBha3Rpdm7DrSBvcGVyYWNlIG5hIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCgkZGV0YWlsV2luZG93KS5vbihGdWNEZXRhaWwudHJpZ2dlckNoYW5nZSwgKHJldFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gesOhem5hbSBieWwgem3Em27Em24sIG11c8OtIHNlIG5hxI3DrXN0IHpub3Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbD8uZGF0YT8uaXhwX3VwciAmJiByZXRWYWw/LmRhdGE/LnJhZGVrX3Vwbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBidWRlIHNlIG9ixI1lcnN0dm92YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVlZFJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JzbHVoYSB1a29uxI1lbsOtIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRkZXRhaWxXaW5kb3cub24oXCJjbG9zZWRcIiwgKHJldFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgZGV0YWlsdSAoYnlsYS1saSBha3Rpdm7DrSBvcGVyYWNlIHYgb3RldsWZZW7DqW0gZGV0YWlsdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVlZFJlZnJlc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGRldGFpbFdpbmRvdy5jcmVhdGVEaWFsb2dQcm9taXNlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWVkUmVmcmVzaCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkYXQgLSByYWTEm2ppIHNlIHByb3bDoWTDrSB2xb5keSwgcHJvdG/FvmUgc2UgbW9obCBwb2h5YiB6bcSbbml0IG5hIHBvbG9hdXRvbWF0aWNrw70sIGkga2R5xb4gbmVieWxvIHphw7rEjXRvdsOhbm9cclxuICAgICAgICAgICAgLy8gVE9ETzogcMWZaSB6cnXFoWVuw60gbmVkxJtsYXQgcmVsb2FkPyByZXNwLiBwb2t1ZCBuZWJ5bCBub3bDvSBwb2h5YiB1bG/FvmVuLiBtb8W+bsOhIG5lbsOtIHBvdMWZZWJhIGTEm2xhdCByZWxvYWQgbmlrZHksIHByb3Rvxb5lIG5vdsO9IHBvaHliIG5pamFrIG5lb3ZsaXZuw60gdGVudG8gcG9oeWJcclxuICAgICAgICAgICAgLy9yZXR1cm4gcHJvbS5hbHdheXMoKCkgPT4geyByZXR1cm4gdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCk7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogw5rEjXRvdsOhbsOtIMO6xI1ldG7DrWhvIHBvaHlidVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHVjdG92YW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gcHLFr3ZvZGNlIHBybyDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgY29uc3QgcHJvbSA9IHRoaXMuY2FsbDx2b2lkPihcIlZsb3ppdERvUHJhY1Nlem5hbXVcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpa2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBva25vIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdVY3RvdmFuaVBvaHlidVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogJ1VjdG92YW5pUG9oeWJ1IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJa2M6IGlrYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVHlwVWN0b3Zhbmk6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSmVkbm90bGl2ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vS3VtdWxvdmF0WmFJeHA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9QZXZUeXBVY3RvdmFuaTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGV2VHlwVWN0QW5vOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVjdFBvaDogdGhhdC5EZXRhaWxEdG8udWN0X3BvaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRpdGxlOiBcImpyZXM6MjQxMDAyMTBcIiB9IC8vUkMgMjQxMDAyMTAgOiDDmsSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGE6IHsgY29tcGxldGU6IGJvb2xlYW4sIHVjdG92YW5vT2Rsb3plbmU6IGJvb2xlYW4gfSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNtYXrDoW7DrSBwcmFjb3Zuw60gdGFidWxreSAocG91emUsIHBva3VkIG5lYnlsbyBzcHXFoXTEm25vIG9kbG/FvmVuw6kgw7rEjXRvdsOhbsOtKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhPy51Y3RvdmFub09kbG96ZW5lID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZyYWPDrSBzZSB2xb5keSB0cnVlLCBwcm90b2/FvmUgdiBjb21wbGV0ZSBqZSB2IHRvbXRvIHDFmcOtcGFkxJsgZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuY2FsbDx2b2lkPihcIlNtYXphdFByYWNTZXpuYW1cIikuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YT8uY29tcGxldGUgPT09IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdnlob2Rub2NlbsOtIHbDvXNsZWRrdVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86ICh6YXTDrW0pIG5lY2hvZMOtIGluZm9ybWFjZSBvIGFrdGl2bsOtIG9wZXJhY2ksIHRhayBzZSB0byBwxZllc2VsZWt0b3bDoXbDoSB2xb5keVxyXG4gICAgICAgICAgICAgICAgICAgIC8qaWYgKGNvbXBsZXRlID09PSB0cnVlKSAqL3JldHVybiBjb21wbGV0ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL2Vsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoY29tcGxldGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtIHBvZGxlIHRvaG8sIGplc3RsaSBwcsWvdm9kY2UgZG/FoWVsIGHFviBuYWtvbmVjIG5lYm8gbmVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGUgPT09IHRydWUpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgZGF0IC0gcmFkxJtqaSBzZSBwcm92w6Fkw60gdsW+ZHksIHByb3Rvxb5lIHNlIG1vaGwgcG9oeWIgem3Em25pdCBuYSBwb2xvYXV0b21hdGlja8O9LCBpIGtkecW+IG5lYnlsbyB6YcO6xI10b3bDoW5vXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9tLmFsd2F5cygoKSA9PiB7IHJldHVybiB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXplcnZhY2UgLyBvZHJlemVydmFjZSByZXplcnZhxI1uw61obyBwb2h5YnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZXplcnZhY2UoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBwb21vY27DoSBtZXRvZGEgcHJvIHDFmcOtcGFkbm91IHptxJtudSBwYXJhbWV0csWvIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAvL2xldCBSZXBlYXRPbkV4Y2VwdGlvbiA9IGZ1bmN0aW9uIChjb25kaXRpb25hbFJlcXVlc3RNb2RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgLy8gICAgbGV0IHJlY3Vyc2l2ZUNhbGwgPSBmdW5jdGlvbiAocmVxdWVzdCwgbmV4dCwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gbmV4dChyZXF1ZXN0KS5jYXRjaCgoZXhjSW5mbykgPT5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25kaXRpb25hbFJlcXVlc3RNb2RpZmljYXRpb24oZXhjSW5mbykudGhlbihcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgKGNoYW5nZXJlcSkgPT4gKGNoYW5nZXJlcSA/IHJlY3Vyc2l2ZUNhbGwoKCQgYXMgYW55KS5kZWVwRXh0ZW5kV29BcnJheSh7fSwgcmVxdWVzdCwgY2hhbmdlcmVxKSwgbmV4dCwgY3R4KSA6ICQuRGVmZXJyZWQoKS5yZWplY3QoZXhjSW5mbykpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAoKSA9PiAkLkRlZmVycmVkKCkucmVqZWN0KGV4Y0luZm8pLnByb21pc2UoKSlcclxuICAgICAgICAgICAgLy8gICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuIHJlY3Vyc2l2ZUNhbGw7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEZ1Y0RldGFpbC5ydW5Jc2xBY3Rpb25XaXRoQ29uZmlybShcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLkRldGFpbER0by5KZVphdWN0b3ZhbnlcclxuICAgICAgICAgICAgICAgICAgICA/IFwianJlczoyNDEwMDQyMlwiIC8vUkMgMjQxMDA0MjIgOiBPcHJhdmR1IGNoY2V0ZSBvZHJlemVydm92YXQgcG9oeWI/XHJcbiAgICAgICAgICAgICAgICAgICAgOiBcImpyZXM6MjQxMDA0MjNcIiwgLy9SQyAyNDEwMDQyMyA6IE9wcmF2ZHUgY2hjZXRlIHphcmV6ZXJ2b3ZhdCBwb2h5Yj9cclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBrb250cm9sdSBuYSBwxZllxI1lcnDDoW7DrVxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi5yZXplcnZ1aih7IHJvd3M6IFt0aGF0LkRldGFpbER0b10sIHJlemVydm92YXQ6ICF0aGF0LkRldGFpbER0by5KZVphdWN0b3ZhbnksIGJlel9rb250cm9seV9uYV9wcmVjZXJwYW5pOiB0aGF0Lk5la29udHJvbG92YXRQcmVjZXJwYW5pIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC51c2UoRnVjVXRpbHMucmVwZWF0T25FeGNlcHRpb24oKGV4Y0luZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGNJbmZvPy5kYXRhPy5wcmVjZXJwYW5pICYmIHRoYXQuTW96bm9zdFByZWNlcnBhbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGNJbmZvLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybShGdWNVdGlscy5nZXRFeGNJbmZvTWVzc2FnZShleGNJbmZvLCB0cnVlKSwgNjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyByZXR1cm4geyBiZXpfa29udHJvbHlfbmFfcHJlY2VycGFuaTogdHJ1ZSB9OyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdChleGNJbmZvKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHJldHVybiB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKSB9LFxyXG4gICAgICAgICAgICAgICAgdGhhdC5EZXRhaWxEdG8uSmVaYXVjdG92YW55ID8gdGhpcy5hY3Rpb25zLmFjdE9kcmV6ZXJ2YWNlISA6IHRoaXMuYWN0aW9ucy5hY3RSZXplcnZhY2UhXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTdG9ybm8gLyB6cnXFoWVuw60gc3Rvcm5hXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc3Rvcm5vKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gemppxaF0xJtuw60gb3RldsWZZW7DvWNoIG3Em3PDrWPFr1xyXG4gICAgICAgICAgICByZXR1cm4gRnVjVXRpbHMuZ2V0T3Blbk1vbnRocyh0aGF0LCB0aGF0LlJvaylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZ1Y0RldGFpbC5ydW5Jc2xBY3Rpb25XaXRoRm9ybShcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogRnVjR3JpZC5Qb2h5Yi5nZXRGb3JtU3Rvcm5vKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICF0aGF0LkRldGFpbER0by5KZVN0b3Jub3ZhbnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Sb2ssIFt0aGF0LkRldGFpbER0b10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5EZXRhaWxEdG8uSmVTdG9ybm92YW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJqcmVzOjI0MTAwMjk3XCIgLy9SQyAyNDEwMDI5NyA6IE9wcmF2ZHUgY2hjZXRlIHpydcWhaXQgc3Rvcm5vIHBvaHlidT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImpyZXM6MjQxMDAyOThcIiwgLy9SQyAyNDEwMDI5OCA6IE9wcmF2ZHUgY2hjZXRlIHN0b3Jub3ZhdCBwb2h5Yj9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKnsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTItMTAtMFwiIH0qL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubW9udGhNaW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5tb250aE1heFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgcm9rOiB0aGF0LlJvayB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAzNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1dm9kOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVuOiBudW1iZXIgfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaWM6IG51bWJlciB8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IG51bWJlciB8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNpY19kcGg6IG51bWJlciB8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2tfZHBoOiBudW1iZXIgfCBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi5zdG9ybnVqKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpa2M6IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3Jub3ZhdDogIXRoYXQuRGV0YWlsRHRvLkplU3Rvcm5vdmFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3bDvSBkZW4gKHZlem1lIHNlIHBvdXplIHYgcMWZw61wYWTEmywgxb5lIGplIHN0b3Jub3bDoW4gemHDusSNdG92YW7DvSBwb2h5YilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZW46IChkYXRhICE9IG51bGwgJiYgZGF0YS5kZW4gIT0gbnVsbCAmJiBkYXRhLmRlbiA+IDAgPyBkYXRhLmRlbiA6IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdsO9IG3Em3PDrWMgKHZlem1lIHNlIHBvdXplIHYgcMWZw61wYWTEmywgxb5lIGplIHN0b3Jub3bDoW4gemHDusSNdG92YW7DvSBwb2h5YilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNpYzogKGRhdGEgIT0gbnVsbCAmJiBkYXRhLm1lc2ljICE9IG51bGwgJiYgZGF0YS5tZXNpYyA+IDAgPyBkYXRhLm1lc2ljIDogbnVsbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm92w70gcm9rICh2ZXptZSBzZSBwb3V6ZSB2IHDFmcOtcGFkxJssIMW+ZSBqZSBzdG9ybm92w6FuIHphw7rEjXRvdmFuw70gcG9oeWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiAoZGF0YSAhPSBudWxsID8gZGF0YS5yb2sgOiBudWxsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3bDvSBtxJtzw61jIERQSCAodmV6bWUgc2UgcG91emUgdiBwxZnDrXBhZMSbLCDFvmUgamUgc3Rvcm5vdsOhbiB6YcO6xI10b3ZhbsO9IHBvaHliKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2ljX2RwaDogKGRhdGEgIT0gbnVsbCAmJiBkYXRhLm1lc2ljX2RwaCAhPSBudWxsICYmIChkYXRhLm1lc2ljX2RwaCA+IDAgfHwgZGF0YS5tZXNpY19kcGggPT09IDApID8gZGF0YS5tZXNpY19kcGggOiBudWxsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3bDvSByb2sgRFBIICh2ZXptZSBzZSBwb3V6ZSB2IHDFmcOtcGFkxJssIMW+ZSBqZSBzdG9ybm92w6FuIHphw7rEjXRvdmFuw70gcG9oeWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rX2RwaDogKGRhdGEgIT0gbnVsbCAmJiBkYXRhLnJva19kcGggIT0gbnVsbCAmJiAoZGF0YS5yb2tfZHBoID4gMCB8fCBkYXRhLnJva19kcGggPT09IDApID8gZGF0YS5yb2tfZHBoIDogbnVsbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZMWvdm9kIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXZvZDogKGRhdGEgIT0gbnVsbCAmJiBkYXRhLmR1dm9kICE9IG51bGwgPyBkYXRhLmR1dm9kIDogXCJqcmVzOjI0MTAwMzAxXCIpLCAvL1JDIDI0MTAwMzAxIDogbmV6YWTDoW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBbdGhhdC5EZXRhaWxEdG9dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4geyByZXR1cm4gdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5EZXRhaWxEdG8uSmVTdG9ybm92YW55ID8gdGhhdC5hY3Rpb25zLmFjdFpydXNpdFN0b3JubyEgOiB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBabcSbbmEgw7rEjWV0bsOtY2ggcGFyYW1ldHLFr1xyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIHVjZXRuaVBhcmFtZXRyeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy8gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyAgICAvLy8vIHByxa92b2RjZSBwcm8gem3Em251IMO6xI1ldG7DrWNoIHByYW1ldHLFryBwb2h5YsWvXHJcbiAgICAgICAgLy8gICAgLy9GdWNEZXRhaWwuY2FsbE90aGVyQ29udGVudCh0aGF0LCBcIkdabWVuYVVjZXRuaWNoUGFyYW1ldHJ1UG9oeWJ1XCIsXHJcbiAgICAgICAgLy8gICAgLy8gICAgeyBtZXRob2RDYWxsZWRJZlN1Y2Nlc3M6ICgpID0+IHsgdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCk7IH0gfSxcclxuICAgICAgICAvLyAgICAvLyAgICB7IElEOiAnWm1lbmFVY2V0bmljaFBhcmFtZXRydVBvaHlidSMnLCB9XHJcbiAgICAgICAgLy8gICAgLy8pO1xyXG5cclxuICAgICAgICAvLyAgICAvLy8vIMO6xI1ldG7DrSBwYXJhbWV0cnlcclxuICAgICAgICAvLyAgICAvL2NvbnN0IG5ld1NVcG8gPSAodGhhdC5EZXRhaWxEdG8uc191cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TVXBvLlphdWN0b3ZhbnkgPyBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1Vwby5OZXphdWN0b3ZhbnkgOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1Vwby5aYXVjdG92YW55KTtcclxuICAgICAgICAvLyAgICAvL2NvbnN0IG5ld1NTdG8gPSAodGhhdC5EZXRhaWxEdG8uc19zdG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TU3RvLk5lc3Rvcm5vdmFubyA/IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TU3RvLlN0b3JubyA6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TU3RvLk5lc3Rvcm5vdmFubyk7XHJcbiAgICAgICAgLy8gICAgLy9GdWNEZXRhaWwuc2ltcGxlRm9ybU9rQ2FuY2VsKFxyXG4gICAgICAgIC8vICAgIC8vICAgIHRoYXQsXHJcbiAgICAgICAgLy8gICAgLy8gICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiB9KVxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwiem1lbml0X3NfdXBvXCIsIGxhYmVsOiBcInptxJtuaXQgc3RhdiBwb2h5YnUgbmE6XCIgfSlcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY3N1bygpLCB7IG5hbWU6IFwibm92ZV9zX3Vwb1wiLCBtb2RlbDogXCJub3ZlX3NfdXBvPXNfdXBvXCIsIHNlcnZlckZpbHRlcnM6IHsgc191cG86IFtuZXdTVXBvXSB9LCBkZWZhdWx0VmFsdWU6IG51bGwsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwiem1lbml0X3Nfc3RvXCIsIGxhYmVsOiBcInptxJtuaXQgc3RhdiBzdG9ybmEgbmE6XCIgfSlcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvY3N0bygpLCB7IG5hbWU6IFwibm92ZV9zX3N0b1wiLCBtb2RlbDogXCJub3ZlX3Nfc3RvPXNfc3RvXCIsIHNlcnZlckZpbHRlcnM6IHsgc19zdG86IFtuZXdTU3RvXSB9LCBkZWZhdWx0VmFsdWU6IG51bGwsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgIC5hZGRSb3coXCJExa92b2RcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJkdXZvZFwiLCBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KSxcclxuICAgICAgICAvLyAgICAvLyAgICB7IG5vdmVfc191cG86IG5ld1NVcG8sIG5vdmVfc19zdG86IG5ld1NTdG8gfSxcclxuICAgICAgICAvLyAgICAvLyAgICBcImpyZXM6MjQxMDAyMzRcIiwgLy9SQyAyNDEwMDIzNCA6IFNlcnZpc27DrSB6bcSbbmEgc3RhdsWvIHBvaHlidVxyXG4gICAgICAgIC8vICAgIC8vICAgIDUwMCxcclxuICAgICAgICAvLyAgICAvLyAgICAzNTApXHJcbiAgICAgICAgLy8gICAgLy8gICAgLy8gVE9ETzogZG/FmWXFoWl0IHBvdcW+aXTDrSBjcmVhdGVEaWFsb2dQcm9taXNlIC0gamVzdGxpIHBvdcW+w612YXQgYSBqYWsgc2UgemFkw6EgcG9kbcOtbmthIG5hIG9rIChqZS1saSBwb3TFmWViYSkgYSBwxZnDrXBhZG7EmyBmb3Jtw6F0IGRhdFxyXG4gICAgICAgIC8vICAgIC8vICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKC8qXCJjbG9zZVwiKi8vKlwieWVzXCIqLy8qXCJva1wiKi8vKiwgeyBkdXZvZDogc3RyaW5nIH0qLylcclxuICAgICAgICAvLyAgICAvLyAgICAudGhlbihmdW5jdGlvbiAoZGF0YToge1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICBkdXZvZDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgem1lbml0X3NfdXBvOiBib29sZWFuIHwgbnVsbCxcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgem1lbml0X3Nfc3RvOiBib29sZWFuIHwgbnVsbCxcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgbm92ZV9zX3VwbzogbnVtYmVyIHwgbnVsbCxcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgbm92ZV9zX3N0bzogbnVtYmVyIHwgbnVsbFxyXG4gICAgICAgIC8vICAgIC8vICAgIH0pIHtcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgLy8gdm9sw6Fuw60gc2VydmlzbsOtIHptxJtueSBzdGF2dVxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICB0aGF0LmlzbC5GaW5Qb2h5Yi5zZXJ2aXNuZVptZW5TdGF2eSh7XHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgICAgICBpa2M6IFwiMFwiLFxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgem1lbml0X3NfdXBvOiBkYXRhPy56bWVuaXRfc191cG8sXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgICAgICB6bWVuaXRfc19zdG86IGRhdGE/LnptZW5pdF9zX3N0byxcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIHB1dm9kbmlfc191cG86IHRoYXQuRGV0YWlsRHRvLnNfdXBvLFxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgcHV2b2RuaV9zX3N0bzogdGhhdC5EZXRhaWxEdG8uc19zdG8sXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgICAgICBub3ZlX3NfdXBvOiAoZGF0YSAhPSBudWxsICYmIGRhdGEubm92ZV9zX3VwbyAhPSBudWxsICYmIChkYXRhLm5vdmVfc191cG8gPiAwIHx8IGRhdGEubm92ZV9zX3VwbyA9PT0gMCkgPyBkYXRhLm5vdmVfc191cG8gOiBudWxsKSxcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIG5vdmVfc19zdG86IChkYXRhICE9IG51bGwgJiYgZGF0YS5ub3ZlX3Nfc3RvICE9IG51bGwgJiYgKGRhdGEubm92ZV9zX3N0byA+IDAgfHwgZGF0YS5ub3ZlX3Nfc3RvID09PSAwKSA/IGRhdGEubm92ZV9zX3N0byA6IG51bGwpLFxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgLy9ub3ZlX3NfdXBvOiBkYXRhPy56bWVuaXRfc191cG8gPyAodGhhdC5EZXRhaWxEdG8uc191cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TVXBvLlphdWN0b3ZhbnkgPyBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1Vwby5OZXphdWN0b3ZhbnkgOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1Vwby5aYXVjdG92YW55KSA6IG51bGwsXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgICAgICAvL25vdmVfc19zdG86IGRhdGE/LnptZW5pdF9zX3N0byA/ICh0aGF0LkRldGFpbER0by5zX3N0byA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNTdG8uTmVzdG9ybm92YW5vID8gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNTdG8uU3Rvcm5vIDogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNTdG8uTmVzdG9ybm92YW5vKSA6IG51bGwsXHJcbiAgICAgICAgLy8gICAgLy8gICAgICAgICAgICBkdXZvZDogKGRhdGEgIT0gbnVsbCAmJiBkYXRhLmR1dm9kICE9IG51bGwgPyBkYXRhLmR1dm9kIDogXCJqcmVzOjI0MTAwMzAxXCIpLCAvL1JDIDI0MTAwMzAxIDogbmV6YWTDoW5cclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIHJvd3M6IFt0aGF0LkRldGFpbER0b11cclxuICAgICAgICAvLyAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuRGV0YWlsRHRvLkplU3Rvcm5vdmFueSA/IHRoYXQuYWN0aW9ucy5hY3RacnVzaXRTdG9ybm8hLnNldFBlbmRpbmcoMTAwKSA6IHRoYXQuYWN0aW9ucy5hY3RTdG9ybm8hLnNldFBlbmRpbmcoMTAwKTtcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgICAgICB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKTtcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG/FvmVuw60gcG9oeWJ1XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZyb21DbG9zaW5nIChkZWZhdWx0ID0gZmFsc2UpIHpwxa9zb2Igdm9sw6Fuw60gKGZhbHNlID0gc3RhbmRhcmRuw60gdWxvxb5lbsOtIHRsYcSNw610a2VtLCB0cnVlID0gemUgemF2xZllbsOtIGRldGFpbHUgcyBuZXVsb8W+ZW7DvW1pIGRhdHkpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8YW55Pn0gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdWxvemVuaShmcm9tQ2xvc2luZzogYm9vbGVhbiA9IGZhbHNlKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHZhbGlkYWNlIGZvcm11bMOhxZllIChwb3V6ZSB2IGpzIGJleiBzZXJ2ZXJ1KVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBidWRlIHBvdMWZZWJhIGRvcGxuaXQgamXFoXTEmyBkYWzFocOtIHZhbGlkYWNlIHBvZGxlIFdpbkNsaWVudGFcclxuICAgICAgICAgICAgLy8gVE9ETzogdGEga29udHJvbGEgcG9kbGUgdmFsaWTDoXRvcsWvIHogRFRPIG1vxb5uw6EgbsSbamFrIG5lZnVuZ3VqZSAtIGplxaF0xJsgdnl6a291xaFldCwgcHJvdG/FvmUgdiBva27EmyBwcm8gxI3DoXN0a3kgdmFsaWTDoXRvcnkgbm9ybcOhbG7EmyBmdW5ndWrDrVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudC5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIikpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2VicsOhbsOtIGhvZG5vdCB6IGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgIGxldCBha3REYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGFrdERhdGEpO1xyXG5cclxuICAgICAgICAgICAgLy8gdm9sw6Fuw60gdWxvxb5lbsOtXHJcbiAgICAgICAgICAgIGxldCBwcm9tOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5PdGV2cml0S0R1cGxpa2FjaSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgZXhpc3R1asOtY8OtaG8gcG9oeWJ1XHJcbiAgICAgICAgICAgICAgICBwcm9tID0gdGhhdC5pc2wuRmluUG9oeWIudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBfdXByOiB0aGF0Lkl4cFVwcixcclxuICAgICAgICAgICAgICAgICAgICByYWRla191cG86IHRoYXQuUmFkZWtVcG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVuOiBha3REYXRhLmRlbixcclxuICAgICAgICAgICAgICAgICAgICBtZXNpYzogYWt0RGF0YS5tZXNpYyxcclxuICAgICAgICAgICAgICAgICAgICByb2s6IGFrdERhdGEucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YnJhZGFfZHV6OiBha3REYXRhLnN1YnJhZGFfZHV6LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvcGlzX3VwbzogYWt0RGF0YS5wb3Bpc191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LkRldGFpbER0by5kYXRfem1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdHl0byBob2Rub3R5IHNlIHDFmWVkw6F2YWrDrSBqZW4ga3bFr2xpIHRvbXUsIGFieSBieWx5IG5hcGxuxJtueSBwb3Zpbm7DqSBwb2xvxb5reSBwb2RsZSBkZWZpbmljZSBEVE8sIHRqLiBuYSBwb2h5YnUgdiBkYXRhYsOhemkgc2UgbmV1a2zDoWRhasOtXHJcbiAgICAgICAgICAgICAgICAgICAga3RnX3VwbzogYWt0RGF0YS5rdGdfdXBvID8/IHRoYXQuRGV0YWlsRHRvLmt0Z191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX3VwbzogYWt0RGF0YS50eXBfdXBvID8/IHRoYXQuRGV0YWlsRHRvLnR5cF91cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgc191cG86IGFrdERhdGEuc191cG8gPz8gdGhhdC5EZXRhaWxEdG8uc191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgY191cG86IGFrdERhdGEuY191cG8gPz8gdGhhdC5EZXRhaWxEdG8uY191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgem5hbTogYWt0RGF0YS56bmFtID8/IHRoYXQuRGV0YWlsRHRvLnpuYW0sXHJcbiAgICAgICAgICAgICAgICAgICAgc19zdG86IGFrdERhdGEuc19zdG8gPz8gdGhhdC5EZXRhaWxEdG8uc19zdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0X3VwbzogYWt0RGF0YS5kYXRfdXBvID8/IHRoYXQuRGV0YWlsRHRvLmRhdF91cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX3VwcjogYWt0RGF0YS50eXBfdXByID8/IHRoYXQuRGV0YWlsRHRvLnR5cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpel9kZDogYWt0RGF0YS5wcml6X2RkID8/IHRoYXQuRGV0YWlsRHRvLnByaXpfZGQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVuYTogYWt0RGF0YS5tZW5hID8/IHRoYXQuRGV0YWlsRHRvLm1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgY19tZW5hOiBha3REYXRhLmNfbWVuYSA/PyB0aGF0LkRldGFpbER0by5jX21lbmFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgLy8uZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyBUT0RPOiB6cHJhY292w6F2YXQgdsO9c2xlZGVrP1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gw7pzcMSbxaFuxJsgZG9rb27EjWVub1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKCFmcm9tQ2xvc2luZykgdGhhdC5hY3Rpb25zLmFjdFVsb3plbmkhLnNldFBlbmRpbmcoMTAwKTtcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gc2tvbsSNaWxvIGNoeWJvdVxyXG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKCFmcm9tQ2xvc2luZykgdGhhdC5hY3Rpb25zLmFjdFVsb3plbmkhLnNldFBlbmRpbmcoLTEpO1xyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHphbG/FvmVuw60gbm92w6lobyAoZHVwbGlrb3bDoW7DrSkgcG9oeWJ1XHJcbiAgICAgICAgICAgICAgICBwcm9tID0gdGhhdC5pc2wuRmluUG9oeWIuZHVwbGlrdWooe1xyXG4gICAgICAgICAgICAgICAgICAgIGlrYzogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHV2b2Q6ICh0aGF0LkR1dm9kS0R1cGxpa2FjaSAhPSBudWxsICYmIHRoYXQuRHV2b2RLRHVwbGlrYWNpICE9IFwiXCIgPyB0aGF0LkR1dm9kS0R1cGxpa2FjaSA6IFwianJlczoyNDEwMDMwMVwiKSwgLy8gUkMgMjQxMDAzMDE6IG5lemFkw6FuXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWtfemFwOiB0aGF0LlphcGlzeUtEdXBsaWthY2ksXHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogW3RoYXQuRGV0YWlsRHRvXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YT8ucmVzdWx0Py5kYXRhPy5yYWRla191cG8gIT0gbnVsbCAmJiBkYXRhLnJlc3VsdC5kYXRhLnJhZGVrX3VwbyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdsO9IHBvaHliIHZ6bmlrbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5SYWRla1VwbyA9IGRhdGEucmVzdWx0LmRhdGEucmFkZWtfdXBvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5PdGV2cml0S0R1cGxpa2FjaSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgZGF0XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9tIS50aGVuKCgpID0+IHsgcmV0dXJuIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YShmcm9tQ2xvc2luZyk7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3ByYXZhIHBvaHlidVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgb3ByYXZhKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLkVkaXRhY2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIHphcG51dMOtIHJlxb5pbXUgZWRpdGFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5FZGl0YWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZm9rdXN1XHJcbiAgICAgICAgICAgICAgICBHRGJkLmdldEVsZW1lbnRUb0ZvY3VzKHRoaXMuZWxlbWVudCwgXCIuZ2ZpZWxkOm5vdCgudWktc3RhdGUtZGlzYWJsZWQpXCIpPy5maXJzdCgpLnRyaWdnZXIoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHphcG51dMOtIHJlxb5pbXUgZWRpdGFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5FZGl0YWNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gcMWvdm9kbsOtY2ggZGF0IChwb2t1ZCBieWxvIG7Em2NvIHptxJtuxJtubylcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFrdHVhbGl6YWNlRGV0YWlsdSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gamVuIG5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlcnZpc27DrSBuw6FzdHJvamVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXJ2aXMoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdTVXBvID0gKHRoYXQuRGV0YWlsRHRvLnNfdXBvID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1Vwby5aYXVjdG92YW55ID8gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVcG8uTmV6YXVjdG92YW55IDogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVcG8uWmF1Y3RvdmFueSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1NTdG8gPSAodGhhdC5EZXRhaWxEdG8uc19zdG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TU3RvLk5lc3Rvcm5vdmFubyA/IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TU3RvLlN0b3JubyA6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TU3RvLk5lc3Rvcm5vdmFubyk7XHJcbiAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwucnVuSXNsQWN0aW9uV2l0aEZvcm1BbmRDb25maXJtRGFuZ2Vyb3VzKFxyXG4gICAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICAgIFwianJlczoyNDEwMDIzNVwiLCAvL1JDIDI0MTAwMjM1IDogT3ByYXZkdSBjaGNldGUgem3Em25pdCBzdGF2eSBwb2h5YnU/IFRvdXRvIHNlcnZpc27DrSB6bcSbbm91IHNlIG5lcHJvdmVkZSBzdGFuZGFyZG7DrSB6YcO6xI10b3bDoW7DrS96YXJlemVydm92w6Fuw60gbmVibyBzdG9ybm8hOztcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJ6bWVuaXRfc191cG9cIiwgbGFiZWw6IFwianJlczoyNDEwMDI5OVwiIH0pIC8vUkMgMjQxMDAyOTkgOiB6bcSbbml0IHN0YXYgcG9oeWJ1IG5hOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjc3VvKCksIHsgbmFtZTogXCJub3ZlX3NfdXBvXCIsIG1vZGVsOiBcIm5vdmVfc191cG89c191cG9cIiwgc2VydmVyRmlsdGVyczogeyBzX3VwbzogW25ld1NVcG9dIH0sIGRlZmF1bHRWYWx1ZTogbnVsbCwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJ6bWVuaXRfc19zdG9cIiwgbGFiZWw6IFwianJlczoyNDEwMDMwMFwiIH0pIC8vUkMgMjQxMDAzMDAgOiB6bcSbbml0IHN0YXYgc3Rvcm5hIG5hOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jc3RvKCksIHsgbmFtZTogXCJub3ZlX3Nfc3RvXCIsIG1vZGVsOiBcIm5vdmVfc19zdG89c19zdG9cIiwgc2VydmVyRmlsdGVyczogeyBzX3N0bzogW25ld1NTdG9dIH0sIGRlZmF1bHRWYWx1ZTogbnVsbCwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAyOTRcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJkdXZvZFwiLCBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KSwgLy9SQyAyNDEwMDI5NCA6IETFr3ZvZFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgbm92ZV9zX3VwbzogbmV3U1Vwbywgbm92ZV9zX3N0bzogbmV3U1N0byB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMzUwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBkdXZvZDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB6bWVuaXRfc191cG86IGJvb2xlYW4gfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHptZW5pdF9zX3N0bzogYm9vbGVhbiB8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgbm92ZV9zX3VwbzogbnVtYmVyIHwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBub3ZlX3Nfc3RvOiBudW1iZXIgfCBudWxsXHJcbiAgICAgICAgICAgICAgICB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLnNlcnZpc25lWm1lblN0YXZ5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWtjOiBcIjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgem1lbml0X3NfdXBvOiBkYXRhPy56bWVuaXRfc191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHptZW5pdF9zX3N0bzogZGF0YT8uem1lbml0X3Nfc3RvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXZvZG5pX3NfdXBvOiB0aGF0LkRldGFpbER0by5zX3VwbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHV2b2RuaV9zX3N0bzogdGhhdC5EZXRhaWxEdG8uc19zdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdmVfc191cG86IChkYXRhICE9IG51bGwgJiYgZGF0YS5ub3ZlX3NfdXBvICE9IG51bGwgJiYgKGRhdGEubm92ZV9zX3VwbyA+IDAgfHwgZGF0YS5ub3ZlX3NfdXBvID09PSAwKSA/IGRhdGEubm92ZV9zX3VwbyA6IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3ZlX3Nfc3RvOiAoZGF0YSAhPSBudWxsICYmIGRhdGEubm92ZV9zX3N0byAhPSBudWxsICYmIChkYXRhLm5vdmVfc19zdG8gPiAwIHx8IGRhdGEubm92ZV9zX3N0byA9PT0gMCkgPyBkYXRhLm5vdmVfc19zdG8gOiBudWxsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ub3ZlX3NfdXBvOiBkYXRhPy56bWVuaXRfc191cG8gPyAodGhhdC5EZXRhaWxEdG8uc191cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TVXBvLlphdWN0b3ZhbnkgPyBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1Vwby5OZXphdWN0b3ZhbnkgOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1Vwby5aYXVjdG92YW55KSA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbm92ZV9zX3N0bzogZGF0YT8uem1lbml0X3Nfc3RvID8gKHRoYXQuRGV0YWlsRHRvLnNfc3RvID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1N0by5OZXN0b3Jub3Zhbm8gPyBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1N0by5TdG9ybm8gOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1N0by5OZXN0b3Jub3Zhbm8pIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHV2b2Q6IChkYXRhICE9IG51bGwgJiYgZGF0YS5kdXZvZCAhPSBudWxsID8gZGF0YS5kdXZvZCA6IFwianJlczoyNDEwMDMwMVwiKSwgLy9SQyAyNDEwMDMwMSA6IG5lemFkw6FuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFt0aGF0LkRldGFpbER0b11cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHJldHVybiB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKSB9LFxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFNlcnZpcyFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFptxJtuYSBJRCBJSVNTUFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHptZW5hSWlzc3AoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyB6bcSbbmEgSUQgSUlTU1AgKGplLWxpIHbFr2JlYyBJSVNTUCBwb3ZvbGVuYSlcclxuICAgICAgICAgICAgaWYgKHRoaXMuSmVJaXNzcCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwucnVuSXNsQWN0aW9uV2l0aEZvcm0oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOb3bDoSBJRCBJSVNTUFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmlkSWlzc3AoKSwgeyBuYW1lOiBcImlkX2lpc3NwXCIsIG1vZGVsOiBcImlkX2hkcl9yaXM9aWRfaGRyX3JpcztyYWRla19oZHI9cmFkZWtfaGRyXCIsIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDI5NFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImR1dm9kXCIsIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pLCAvL1JDIDI0MTAwMjk0IDogRMWvdm9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgaWRfaGRyX3JpczogdGhhdC5EZXRhaWxEdG8uaWRfaGRyX3JpcywgcmFkZWtfaGRyOiB0aGF0LkRldGFpbER0by5yYWRla19oZHIgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgKGRhdGE6IHsgZHV2b2Q6IHN0cmluZyB8IG51bGwsIGlkX2hkcl9yaXM6IHN0cmluZyB8IG51bGwsIHJhZGVrX2hkcjogbnVtYmVyIHwgbnVsbCB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi56bWVuSWlzc3Aoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRfaGRyX3JpczogZGF0YT8uaWRfaGRyX3JpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrX2hkcjogZGF0YT8ucmFkZWtfaGRyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHV2b2Q6IChkYXRhICE9IG51bGwgJiYgZGF0YS5kdXZvZCAhPSBudWxsID8gZGF0YS5kdXZvZCA6IFwianJlczoyNDEwMDMwMVwiKSwgLy9SQyAyNDEwMDMwMSA6IG5lemFkw6FuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBbdGhhdC5EZXRhaWxEdG9dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyByZXR1cm4gdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCkgfSxcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0SWlzc3BabWVuYUlkIVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW7DrSBwb2RrbGFkxa8gcHJvIGtvbnRyb2xuw60gaGzDocWhZW7DrSBEUEhcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBrb250cm9sbmlIbGFzZW5pRFBIKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gemppxaF0xJtuw60gxI3DrXNsYSDFmcOhZGt1IHBvZGtsYWTFr1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuRmluUG9oeWIudnJhdENpc2xvUmFka3VQb2RrbGFkdUtvbnRyb2xuaWhvSGxhc2VuaURwaCh7IGl4cFVwcjogdGhpcy5EZXRhaWxEdG8uaXhwX3VwciEsIHJhZGVrVXBvOiB0aGlzLkRldGFpbER0by5yYWRla191cG8hIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCAmJiBkYXRhID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSBva25hIHBvZGtsYWTFryBwcm8ga29udHJvbG7DrSBobMOhxaFlbsOtIERQSFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5EaWFsb2dzLkdEYW5vdmFFdmlkZW5jZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0LkRldGFpbER0by5peHBfdXByISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRlazogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmF2YTogR29yZGljLkVrby5JbnRlcmZhY2UuR0VLSFByYXZhLlByb2hsaXplbmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdE1vZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ5bnVsb3ZhdERhdHVteURQSDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJ2b3RuaUV2aWRlbmNlRG9rbGFkdTogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5hbGVydChcImpyZXM6MjQxMDAzNjhcIikuY3JlYXRlRGlhbG9nUHJvbWlzZSgpOyAvL1JDIDI0MTAwMzY4IDogUG9ka2xhZHkgcHJvIGtvbnRyb2xuw60gaGzDocWhZW7DrSBEUEggbmVieWx5IGsgdG9tdXRvIHBvaHlidSBuYWxlemVueVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW7DrSBkZXRhaWx1IHDFmcOtcGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRldGFpbFByaXBhZHUoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBwxZnDrXpuYWsgYWt0aXZuw60gb3BlcmFjZVxyXG4gICAgICAgICAgICBsZXQgbmVlZFJlZnJlc2ggPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdVxyXG4gICAgICAgICAgICAvLyBUT0RPOiB6YXTDrW0gamUgemFrb21lbnRvdsOhbiBwb3N1biBwbyDFmcOhZGt1IC0gcG9rdWQgYnkgc2UgcG92b2xpbCwgbXVzZWwgYnljaCDFmWXFoWl0IG5hIGRldGFpbHUgcMWZw61wYWR1IHBvc3VuIHBvIHLFr3puw71jaCB0eXBlY2ggc2V6bmFtxa9cclxuICAgICAgICAgICAgbGV0ICRkZXRhaWxXaW5kb3cgPSB0aGlzLm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgW1wiR29yZGljLkZ1Yy5XZWJDbGllbnQuR0RldGFpbFByaXBhZHVcIi8qLCB7IGdyaWRSZW1vdGVDb250cm9sOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoYXQuJGdyaWQpIH0qL10sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgSUQ6ICdEZXRhaWxQcmlwYWR1IycsXHJcbiAgICAgICAgICAgICAgICAgICAgSXhwVXByOiB0aGF0LkRldGFpbER0by5peHBfdXByXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBvYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2UgbmEgZGV0YWlsdVxyXG4gICAgICAgICAgICAkLmNvbnRlbnQoJGRldGFpbFdpbmRvdykub24oRnVjRGV0YWlsLnRyaWdnZXJDaGFuZ2UsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gesOhem5hbSBieWwgem3Em27Em24sIG11c8OtIHNlIG5hxI3DrXN0IHpub3Z1XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0VmFsPy5kYXRhPy5peHBfdXByKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnVkZSBzZSBvYsSNZXJzdHZvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgbmVlZFJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9ic2x1aGEgdWtvbsSNZW7DrSBva25hXHJcbiAgICAgICAgICAgICRkZXRhaWxXaW5kb3cub24oXCJjbG9zZWRcIiwgKHJldFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkZXRhaWx1IChieWxhLWxpIGFrdGl2bsOtIG9wZXJhY2UgdiBvdGV2xZllbsOpbSBkZXRhaWx1KVxyXG4gICAgICAgICAgICAgICAgaWYgKG5lZWRSZWZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRkZXRhaWxXaW5kb3cuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmxvxb5lbsOtIHBvaHlidSBkbyAvIHZ5am11dMOtIHBvaHlidSB6ZSBzb3VwaXNreVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNvdXBpc2thKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZsb3ppdDogYm9vbGVhbiA9ICF0aGF0LkRldGFpbER0by5peHA7XHJcbiAgICAgICAgICAgIGxldCBmb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTItMTAtMFwiIH0pO1xyXG4gICAgICAgICAgICBpZiAodmxveml0KSBmb3JtRGVmXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDM1NlwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y3NwaWQoKSwgeyBkaXNhYmxlZDogZmFsc2UsIG5hbWU6IFwiaXhwXCIsIG1vZGVsOiBcIml4cD1peHAsaXhwX3R4dD1wb3Bpc1wiLCBzZXJ2ZXJGaWx0ZXJzOiB7IHNfc291cDogMjAgfSwgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSk7IC8vUkMgMjQxMDAzNTYgOiBTb3VwaXNrYVxyXG4gICAgICAgICAgICBlbHNlIGZvcm1EZWZcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwianJlczoyNDEwMDM2N1wiKSAvL1JDIDI0MTAwMzY3IDogT3ByYXZkdSBjaGNldGUgdnlqbW91dCBwb2h5YiB6ZSBzb3VwaXNreT9cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMzU2XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjc3BpZCgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcIml4cFwiLCBtb2RlbDogXCJpeHA9aXhwLGl4cF90eHQ9cG9waXNcIiwgc2VydmVyRmlsdGVyczogeyBzX3NvdXA6IDIwIH0gfSk7IC8vUkMgMjQxMDAzNTYgOiBTb3VwaXNrYVxyXG4gICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLnJ1bklzbEFjdGlvbldpdGhGb3JtKFxyXG4gICAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtRGVmLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZsb3ppdCA/IHt9IDogeyBpeHA6IHRoYXQuRGV0YWlsRHRvLml4cCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGRhdGE6IHsgaXhwOiBzdHJpbmcgfCBudWxsIH0pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLnZsb3pEb1NvdXBpc2t5KHsgaXhwOiBkYXRhLml4cCwgdmxveml0OiB2bG96aXQsIHJvd3M6IFt0aGF0LkRldGFpbER0b10gfSk7IH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHJldHVybiB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKSB9LFxyXG4gICAgICAgICAgICAgICAgdmxveml0ID8gdGhhdC5hY3Rpb25zLmFjdFNvdXBpc2thVmxveml0ISA6IHRoYXQuYWN0aW9ucy5hY3RTb3VwaXNrYVZ5am1vdXQhXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIGRldGFpbHUgc291cGlza3lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWxTb3VwaXNreSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHDFmcOtem5hayBha3Rpdm7DrSBvcGVyYWNlXHJcbiAgICAgICAgICAgIGxldCBuZWVkUmVmcmVzaCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICAgIC8vIFRPRE86IHphdMOtbSBqZSB6YWtvbWVudG92w6FuIHBvc3VuIHBvIMWZw6Fka3UgLSBwb2t1ZCBieSBzZSBwb3ZvbGlsLCBtdXNlbCBieWNoIMWZZcWhaXQgbmEgZGV0YWlsdSBwxZnDrXBhZHUgcG9zdW4gcG8gcsWvem7DvWNoIHR5cGVjaCBzZXpuYW3Fr1xyXG4gICAgICAgICAgICBsZXQgJGRldGFpbFdpbmRvdyA9IHRoaXMubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICBbXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HRGV0YWlsU291cGlza3lcIi8qLCB7IGdyaWRSZW1vdGVDb250cm9sOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoYXQuJGdyaWQpIH0qL10sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgSUQ6ICdEZXRhaWxTb3VwaXNreSMnLFxyXG4gICAgICAgICAgICAgICAgICAgIEl4cDogdGhhdC5EZXRhaWxEdG8uaXhwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBvYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2UgbmEgZGV0YWlsdVxyXG4gICAgICAgICAgICAkLmNvbnRlbnQoJGRldGFpbFdpbmRvdykub24oRnVjRGV0YWlsLnRyaWdnZXJDaGFuZ2UsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gesOhem5hbSBieWwgem3Em27Em24sIG11c8OtIHNlIG5hxI3DrXN0IHpub3Z1XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0VmFsPy5kYXRhPy5peHApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBidWRlIHNlIG9ixI1lcnN0dm92YXRcclxuICAgICAgICAgICAgICAgICAgICBuZWVkUmVmcmVzaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gb2JzbHVoYSB1a29uxI1lbsOtIG9rbmFcclxuICAgICAgICAgICAgJGRldGFpbFdpbmRvdy5vbihcImNsb3NlZFwiLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGRldGFpbHUgKGJ5bGEtbGkgYWt0aXZuw60gb3BlcmFjZSB2IG90ZXbFmWVuw6ltIGRldGFpbHUpXHJcbiAgICAgICAgICAgICAgICBpZiAobmVlZFJlZnJlc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJGRldGFpbFdpbmRvdy5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG/FvmVuw60gLyB6b2JyYXplbsOtIGRva2xhZHUgbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRva2xhZE9aYXVjdG92YW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuJGdyaWREb2tsYWRPWmF1YyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWt0RG9rbGFkID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR0Rva2xhZER0bz4odGhpcy4kZ3JpZERva2xhZE9aYXVjKTtcclxuICAgICAgICAgICAgICAgIGlmIChha3REb2tsYWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVsb8W+ZW7DrS9vdGV2xZllbsOtIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLmRva2xhZE9aYXVjdG92YW5pKHRoaXMsIG51bGwvKmFrdERva2xhZD8uaXhiX2R6dSovLCBha3REb2tsYWQ/LnJvaywgYWt0RG9rbGFkPy5saWMsIGFrdERva2xhZD8uaWNvLCBha3REb2tsYWQ/LnVjcywgYWt0RG9rbGFkPy5tZXNpYywgYWt0RG9rbGFkPy5hYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIGhpc3RvcmllIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGhpc3RvcmllVWN0b3ZhbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5EZXRhaWxEdG8uaXhzX2h1ZiAhPSBudWxsICYmIHRoaXMuRGV0YWlsRHRvLml4c19odWYgPiBcIiBcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSBoaXN0b3JpZSDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxIaXN0b3JpZVVjdG92YW5pUG9oeWJ1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6ICdEZXRhaWxIaXN0b3JpZVVjdG92YW5pIycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4c0h1ZjogdGhhdC5EZXRhaWxEdG8uaXhzX2h1ZlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHBydmvFryB2ZSBmb3JtdWzDocWZaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gcHJ2a3lcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoXCJkZW5cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIXRoaXMuRWRpdGFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kRmllbGRzKFwibWVzaWNcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIXRoaXMuRWRpdGFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kRmllbGRzKFwiYWNfaXhlXCIvKlwic3VicmFkYV9kdXpcIiovKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhpcy5FZGl0YWNlKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoXCJwb3Bpc191cG9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIXRoaXMuRWRpdGFjZSk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGplxaF0xJsgdiByZcW+aW11IGVkaXRhY2UgcG92b2xlbmkgxI3DoXN0a3kgKHrDoWxvxb5rYSBEUEgsIG5lIGNlbGtvdsOhIMSNw6FzdGthIHBvaHlidSkgLSBqZcWhdMSbIHRvIGFsZSB6a29udHJvbG92YXQgdiBHdXB0xJssIGplc3RsaSBqZSB0byBza3V0ZcSNbsSbIHRha1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBwYXJhbWV0ciArIHN0YXZcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0TGlrdmlkYWNlLmVuYWJsZWQodGhpcy5Qb3ZvbGVuYUxpa3ZpZGFjZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBzdGF0dXMgYmFyXHJcbiAgICAgICAgICAgIC8vIHphw7rEjXRvdsOhbi96YXJlemVydm92w6FuIG5lYm8gbmVzdG9ybm92w6FuIE9LIGppbmFrIHZhcm92w6Fuw61cclxuICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGlzLnN0YXR1c2VzIVtcInN0YXR1c0JhclNVcG9cIl0hLCB0aGlzLkRldGFpbER0by5zX3Vwb190eHQhLCAodGhpcy5EZXRhaWxEdG8uc191cG8hID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1Vwby5aYXVjdG92YW55ID8gR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkNvbG9yU3RhdGVDbGFzcy5zdWNjZXNzIDogKHRoaXMuRGV0YWlsRHRvLnNfdXBvID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1Vwby5WVWN0b3ZhbmkgPyBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLndhcm5pbmcgOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLmluZm8pKSk7XHJcbiAgICAgICAgICAgIC8vR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0odGhpcy5zdGF0dXNlcyFbXCJzdGF0dXNCYXJTU3RvXCJdISwgKHRoaXMuRGV0YWlsRHRvLnNfc3RvISAhPT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNTdG8uTmVzdG9ybm92YW5vID8gdGhpcy5EZXRhaWxEdG8uc19zdG9fdHh0ISA6IFwiXCIpLCAodGhpcy5EZXRhaWxEdG8uc19zdG8hICE9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1N0by5OZXN0b3Jub3Zhbm8gPyBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLndhcm5pbmcgOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLnN1Y2Nlc3MpKTtcclxuICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbShcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzZXMhW1wic3RhdHVzQmFyU1Vwb1wiXSEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLkRldGFpbER0by5zX3Vwb190eHQ/LnRvVXBwZXJDYXNlKCkgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICh0aGlzLkRldGFpbER0by5zX3VwbyA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVcG8uWmF1Y3RvdmFueVxyXG4gICAgICAgICAgICAgICAgICAgID8gRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuUmVhbGl6b3Zhbm9cclxuICAgICAgICAgICAgICAgICAgICA6IG51bGxcclxuICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNlcyFbXCJzdGF0dXNCYXJTU3RvXCJdISxcclxuICAgICAgICAgICAgICAgICh0aGlzLkRldGFpbER0by5zX3N0byEgIT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TU3RvLk5lc3Rvcm5vdmFubyA/ICh0aGlzLkRldGFpbER0by5zX3N0b190eHQ/LnRvVXBwZXJDYXNlKCkgPz8gXCJcIikgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgICh0aGlzLkRldGFpbER0by5zX3N0byA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNTdG8uU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICAgICAgPyBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZS5TdG9ybm92YW5vXHJcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsXHJcbiAgICAgICAgICAgICAgICApKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGRvcGxuaXQgc3Byw6F2bsOpIHBvZG3DrW5reVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBuZXVkxJtsYXQgaWQgbmEgw7rEjWV0bsOtIHBvaHlieSwgYWJ5IHRvIG5lbXVzZWxvIGLDvXQgdiBrYcW+ZMOpIHBvZG3DrW5jZT9cclxuICAgICAgICAgICAgY29uc3QgcGVybUVkaXRhY2UgPSBGdWNEZXRhaWwuZ2V0RWRpdFBlcm1pc3Npb24oKTtcclxuICAgICAgICAgICAgY29uc3QgcGVybU5lRWRpdGFjZSA9IEZ1Y0RldGFpbC5nZXRFZGl0UGVybWlzc2lvbihmYWxzZSlcclxuICAgICAgICAgICAgY29uc3QgYWN0cyA9IHRoaXMuYWN0aW9ucztcclxuICAgICAgICAgICAgY29uc3QgcGVybXMgPSB0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucztcclxuICAgICAgICAgICAgYWN0cy5hY3RVY3RvdmFuaSEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAocGVybXMgPyBwZXJtcy5MemVVY3RvdmF0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFJlemVydmFjZSEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAocGVybXMgPyBwZXJtcy5MemVSZXplcnZvdmF0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdE9kcmV6ZXJ2YWNlIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZU9kcmV6ZXJ2b3ZhdCA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RVbG96ZW5pIS51cGRhdGVQZXJtaXNzaW9uKC8qdGhpcy5KZU5vdnkgfHwgKi90aGlzLkVkaXRhY2UgfHwgdGhpcy5PdGV2cml0S0R1cGxpa2FjaSA/IHsgdmFsdWU6IHRydWUgfSA6IHBlcm1OZUVkaXRhY2UpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdE9wcmF2YSEudmlzaWJsZSghdGhpcy5FZGl0YWNlICYmIHRoaXMuRGV0YWlsRHRvLkplVWNldG5pID09PSB0cnVlKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RPcHJhdmEhLnVwZGF0ZVBlcm1pc3Npb24oKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKHBlcm1zID8gcGVybXMuTHplT3ByYXZpdCA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RacnVzaXRabWVueSEudmlzaWJsZSh0aGlzLkVkaXRhY2UgJiYgdGhpcy5EZXRhaWxEdG8uSmVVY2V0bmkgPT09IHRydWUpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFpydXNpdFptZW55IS51cGRhdGVQZXJtaXNzaW9uKCghdGhpcy5FZGl0YWNlID8gcGVybU5lRWRpdGFjZSA6IHsgdmFsdWU6IHRydWUgfSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFN0b3JubyEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAocGVybXMgPyBwZXJtcy5MemVTdG9ybm92YXQgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0WnJ1c2l0U3Rvcm5vIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZVpydXNpdFN0b3JubyA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgLy9hY3RzLmFjdFVjZXRuaVBhcmFtZXRyeSEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAocGVybXMgPyBwZXJtcy5MemVVY3RQYXJhbWV0cnkgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IHptxJtuaXQgZW5hYmxlZCBuYSB1cGRhdGVQZXJtaXNzaW9uPyBhc2kgYW5vIGEgem3Em25pdCB0byBpIG5hIGRhbMWhw61jaCBtw61zdGVjaFxyXG4gICAgICAgICAgICBhY3RzLmFjdERldGFpbFByaXBhZHUhLmVuYWJsZWQoIXRoaXMuRWRpdGFjZSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0U2VydmlzIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZVNlcnZpcyA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgYWN0cy5hY3ROb3Z5UG9oeWIhLnVwZGF0ZVBlcm1pc3Npb24oKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKHBlcm1zID8gcGVybXMuTHplTm92eVBvaHliIDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdE9iY2Vyc3R2ZW5pUG9oIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IHsgdmFsdWU6IHRydWUgfSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFNvdXBpc2thVmxveml0IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZVZsb3ppdERvU291cGlza3kgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0U291cGlza2FWeWptb3V0IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZVZ5am1vdXRaZVNvdXBpc2t5IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFNvdXBpc2thRGV0YWlsIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IHsgdmFsdWU6IHRoaXMuRGV0YWlsRHRvLkplVlNvdXBpc2NlID8/IGZhbHNlLCBtZXNzYWdlOiBcIlBvaHliIG5lbsOtIHZsb8W+ZW4gZG8gc291cGlza3lcIiB9KSk7XHJcbiAgICAgICAgICAgIC8vIGFrY2UgRFBIXHJcbiAgICAgICAgICAgIGFjdHMuYWN0S29udHJvbG5pSGxhc2VuaURQSCEuZW5hYmxlZCghdGhpcy5FZGl0YWNlICYmIHRoaXMuRGV0YWlsRHRvLkplRGFub3Z5ISk7XHJcbiAgICAgICAgICAgIC8vIGFrY2UgSUlTU1BcclxuICAgICAgICAgICAgYWN0cy5hY3RJaXNzcFptZW5hSWQhLnVwZGF0ZVBlcm1pc3Npb24oKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKHBlcm1zID8gcGVybXMuTHplWm1lbml0SWlzc3AgOiB1bmRlZmluZWQpKSk7XHJcblxyXG4gICAgICAgICAgICAvLyB0YWJ5IMO6xI10b3bDoW7DrSBhIHJlemVydmFjZVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVVjZXRuaVphcGlzeSgpO1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVJlemVydmFjbmlaYXBpc3koKTtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVEb2tsYWRPWmF1Y3RvdmFuaSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwcnZrxa8gdiB0YWJ1IMO6xI1ldG7DrSB6w6FwaXN5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVVY2V0bmlaYXBpc3koKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBleGlzdGVuY2UgesOhcGlzxa9cclxuICAgICAgICAgICAgbGV0IGV4VWN0WmFwaXN5ID0gdGhpcy4kZ3JpZFVjdFphcGlzeSAhPSBudWxsID8gKEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHRoaXMuJGdyaWRVY3RaYXBpc3khKSAhPSBudWxsKSA6IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgY29uc3QgYWN0cyA9IHRoaXMuYWN0aW9ucztcclxuICAgICAgICAgICAgYWN0cy5hY3RVY3RvdmFuaVRpc2tQb2h5YnUhLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZXhVY3RaYXBpc3kgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHBydmvFryB2IHRhYnUgZG9rbGFkIG8gemHDusSNdG92w6Fuw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGVuYWJsZURva2xhZE9aYXVjdG92YW5pKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSBkb2tsYWRcclxuICAgICAgICAgICAgbGV0IGFrdERva2xhZDogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR0Rva2xhZER0byB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kZ3JpZERva2xhZE9aYXVjICE9IG51bGwpIGFrdERva2xhZCA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHRoaXMuJGdyaWREb2tsYWRPWmF1YyEpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgY29uc3QgYWN0cyA9IHRoaXMuYWN0aW9ucztcclxuICAgICAgICAgICAgYWN0cy5hY3RVY3RvdmFuaVRpc2tEb2tsYWR1IS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IChha3REb2tsYWQgIT09IG51bGwgPyB0cnVlIDogZmFsc2UpIH0pO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFVjdG92YW5pRG9rbGFkT1phdWN0b3ZhbmkhLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogKGFrdERva2xhZCAhPT0gbnVsbC8qICYmIGFrdERva2xhZC5peGJfZHp1ICE9IG51bGwgJiYgYWt0RG9rbGFkLml4Yl9kenUgPiBcIiBcIiovID8gdHJ1ZSA6IGZhbHNlKSB9KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RVY3RvdmFuaUluZm9PVWN0b3ZhbmkhLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogKHRoaXMuRGV0YWlsRHRvLml4c19odWYgIT09IG51bGwgJiYgdGhpcy5EZXRhaWxEdG8uaXhzX2h1ZiEgPiBcIiBcIiA/IHRydWUgOiBmYWxzZSkgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHBydmvFryB2IHRhYnUgcmV6ZXJ2YcSNbsOtIHrDoXBpc3lcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGVuYWJsZVJlemVydmFjbmlaYXBpc3koKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBha3R1w6FsbsSbIG5hIHRhYnUgbmVqc291IMW+w6FkbsOhIGFrY2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcMWZw616bmFrdSBha3Rpdm7DrSBvcGVyYWNlIGEgYWt0dWFsaXphY2UgZGV0YWlsdVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB3aXRob3V0UmVsb2FkIChkZWZhdWx0ID0gZmFsc2UpIHRydWUgPSBuZWFrdHVhbGl6b3ZhdCBmb3JtdWzDocWZXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSh3aXRob3V0UmVsb2FkOiBib29sZWFuID0gZmFsc2UpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIHZ5dm9sw6Fuw60gdHJpZ2dlciBvIGFrdGl2bsOtIG9wZXJhY2lcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKEZ1Y0RldGFpbC50cmlnZ2VyQ2hhbmdlLCBbeyBkYXRhOiB0aGlzLkRldGFpbER0byB9XSk7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkZXRhaWx1XHJcbiAgICAgICAgICAgIGlmICghd2l0aG91dFJlbG9hZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoXCJyZW1lbWJlcmluaXRpYWxvcGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm5vdnUgbmHEjXRlIGNlbMO9IGZvcm11bMOhxZlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWxvYWREYXRhKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoXCJyZW1lbWJlcmluaXRpYWxvcGVuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1YWxpemFjZSBkYXQgdiBkZXRhaWx1IHBvZGxlIG1vZGVsdSBhIG5hc3RhdmVuw60gc3RhdnUgcHJ2a8WvXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNldEZvY3VzIChkZWZhdWx0ID0gZmFsc2UpIG5hc3Rhdm92YXQgZm9rdXMgZG8gcHJ2bsOtaG8gZWRpdG92YXRlbG7DqWhvIHBvbGU/XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBha3R1YWxpemFjZURldGFpbHUoc2V0Rm9jdXM6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBwb2zDrcSNZWtcclxuICAgICAgICAgICAgLy8gVE9ETzogbmVjaGF0IERldGFpbER0byBuZWJvIHRvIHDFmWVqbWVub3ZhdCB6cMOhdGt5IG5hIG1vZGVsPyBuxJtqYWsgdG8gZG/FmWXFoWl0LCB2IGvDs2R1IHRvdGnFviBwb3XFvsOtdsOhbSBvYm9qZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5PdGV2cml0S0R1cGxpa2FjaSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBiZXogxI3DrXNsYSDFmcOhZGt1IChhIGJleiBpbml0aWFsVmFsdWVzLCBhYnkgc2UgdnludXRpbG8gdWxvxb5lbsOtKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5EZXRhaWxEdG8sIHsgcmFkZWtfdXBvOiBudWxsIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0YW5kYXJkbsOtIG5hcGxuxJtuw61cclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5EZXRhaWxEdG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBuYXBsbsSbbsOtIGdyaWR1IHDFmWVka29udGFjw61cclxuICAgICAgICAgICAgaWYgKHRoaXMuRGV0YWlsRHRvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt0aGlzLkRldGFpbER0b10sIHsgLyprZXk6IFwiaXhwLHJhZGVrX3BvbCxzdWJyYWRlayxyYWRla19hdlwiKi8gfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRncmlkUHJlZGtvbnRhY2UuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgLy8gdnlicsOhbsOtIG7Em2pha8OpIHBvbG/Fvmt5IHYgZ3JpZHUgcG9sb8W+ZWtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy52eWJyYW5pUG9sb3preSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gZ3JpZHUgcG9oeWLFryBqZSBhxb4gcG8gcm96a2xpa251dMOtIHRhYnVcclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBzdGF2dSBwb2zDrcSNZWsgYSBha2PDrVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGZva3VzdVxyXG4gICAgICAgICAgICBpZiAoc2V0Rm9jdXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkVkaXRhY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBHRGJkLmdldEVsZW1lbnRUb0ZvY3VzKHRoaXMuZWxlbWVudCwgXCIuZ2ZpZWxkOm5vdCgudWktc3RhdGUtZGlzYWJsZWQpXCIpPy5maXJzdCgpLnRyaWdnZXIoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkw6Fuw60gcGFyYW1ldHLFryB0aXNrdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7SUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nfSByZXAgcGFyYW1ldHJ5IHRpc2t1XHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBbdnNlXSB0cnVlID0gdGlzayB2xaFlY2ggZG9rbGFkxa8gbmFqZWRub3UsIGppbmFrIGplbiBha3R1w6FsbsOtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlcG9ydFN0YXJ0aW5nKHJlcDogSUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nLCB2c2U/OiBib29sZWFuKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHBhcmFtZXRyxa8gcG9kbGUgdMOpbWF0dVxyXG4gICAgICAgICAgICBpZiAocmVwLnRlbWEgPT09IFwiZnVjX3B0bV9kb2thZ2RcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gesOhcGlzeSBwb2h5YnVcclxuICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDAgPSB0aGlzLkl4cFVwcjtcclxuICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDEgPSB0aGlzLlJhZGVrVXBvLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDIgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJlcC50ZW1hID09PSBcImZ1Y19wdG1fZW5nemF1XCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIMO6xI1ldG7DrSBkb2tsYWRcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRncmlkRG9rbGFkT1phdWMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBha3REb2tsYWQgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRnVjLkludGVyZmFjZS5HRG9rbGFkRHRvPih0aGlzLiRncmlkRG9rbGFkT1phdWMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChha3REb2tsYWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMCA9IGFrdERva2xhZC5yb2shLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMSA9IGFrdERva2xhZC5saWMhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAyID0gYWt0RG9rbGFkLmljbyE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDMgPSBha3REb2tsYWQudWNzITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwNCA9IGFrdERva2xhZC5tZXNpYyEudG9TdHJpbmcoMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA1ID0gYWt0RG9rbGFkLmFjITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ga3VtdWxhY2Ugc2UgemRlIMWZZcWhw60gcG9kbGUgdG9obywgamVzdGxpIGV4aXN0dWrDrSBkYWzFocOtIHBvaHlieSDDusSNdG92YW7DqSBzdGVqbsO9bSBkb2tsYWRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWt0RG9rbGFkLnBvY19wb2h5YnVfZG9rbGFkdSEgPiAxKSByZXAucGFyYW1zLlgwMDA2ID0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmVwLnBhcmFtcy5YMDAwNiA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA3ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QsIGplc3RsaSBqZSBtb8W+bsOpIG9rbm8gemF2xZnDrXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxJbnRlcmZhY2UuR1BvaHliRHRvPiB8IEludGVyZmFjZS5HUG9oeWJEdG99IHByb21pc2UgcyBkYXR5IChyZXNvbHZlID0gamUgbW/Fvm7DqSB6YXbFmcOtdCwgcmVqZWN0ID0gbmVuw60gbW/Fvm7DqSB6YXbFmcOtdCkgbmVibyBwxZnDrW1vIGRhdGEgZGV0YWlsdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8SW50ZXJmYWNlLkdQb2h5YkR0bz4gfCBJbnRlcmZhY2UuR1BvaHliRHRvIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHByYXZkxJtwb2RvYm7EmyBuZXDFr2pkZSBwb2h5YiBwxZnDrW1vIGVkaXRvdmF0LCB0YWvFvmUgdG9obGUgdGFkeSBidWRlIHpieXRlxI1uw6lcclxuICAgICAgICAgICAgbGV0IGZvcm1DaGFuZ2VkID0gdGhpcy5maW5kRm9ybXMoKS5nZm9ybShcImhhc0NoYW5nZWRcIik7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGRvZGF0IHNwcsOhdm5vdSBwb2Rtw61ua3UgLSB1IHrDoXBvxI10b3bDvWNoIGxpc3TFryBqZSBpZiAoKHRoaXMuRWRpdGFjZSB8fCB0aGlzLkplUG9kYW4pICYmIGZvcm1DaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIGlmICh0cnVlICYmIGZvcm1DaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkb3RheiBuYSB6YXbFmWVuw60gYmV6IHVsb8W+ZW7DrSwgcHJvdG/FvmUgc2UgbsSbY28gem3Em25pbG9cclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHVwcmF2aXQgcG9kbGUgZGV0YWlsdSB6w6Fwb8SNdG92w6lobyBsaXN0dSAocG91xb5pdMOtIEVrby5EZXRhaWwubWVzc2FnZUJveFVuc2F2ZWREYXRhIGEgamluw6Egb2JzbHVoYSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBFa28uRGV0YWlsLm1lc3NhZ2VCb3hVbnNhdmVkRGF0YSh0aGF0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKFtHRGxnLm1iYlllcy5pZCwgR0RsZy5tYmJOby5pZF0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBHRGxnLm1iYlllcy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWxvxb5lbsOtIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQudWxvemVuaSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuRGV0YWlsRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuRGV0YWlsRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSBuZWVkaXR1amUsIGplIG1vxb5uw6kgZGV0YWlsIHphdsWZw610XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5EZXRhaWxEdG87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==