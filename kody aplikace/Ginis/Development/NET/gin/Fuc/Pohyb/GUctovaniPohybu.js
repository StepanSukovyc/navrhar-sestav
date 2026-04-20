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
             * Účtování jednoho nebo více účetních pohybů přes průvodce
             *
             * @author Martin Boček
             * @since 480.1.0.12
             */
            let GUctovaniPohybu = class GUctovaniPohybu extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    ///**
                    // * Příznak kompletní přípravy účtování
                    // * @type {boolean}
                    // */
                    //private pripravaPrvni: boolean;
                    ///**
                    // * Příznak kontroly počtu pohybů při odchodu z fáze 0
                    // * @type {boolean}
                    // */
                    //private faze0KontrPocetUpo: boolean;
                    // TODO: tohle se nikde nenastavuje, takže je stále true - je to vůbec potřeba, může být fáze 3 nebýt zaúčtováno bez chyb?
                    /**
                     * Příznak zaúčtování bez chyb (pro ukončení průvodce)
                     * @type {boolean}
                     */
                    this.ZauctovanoBezChyb = true;
                    /**
                     * Příznak zaúčtování bez přečerpání (pro ukončení průvodce)
                     * @type {boolean}
                     */
                    this.ZauctovanoBezPrecerpani = true;
                    /**
                     * Příznak ukončení s chybou
                     * @type {boolean}
                     */
                    this.UkoncenoChybou = false;
                    /**
                     * Text chyby (pro UkoncenoChybou === true)
                     * @type {string | undefined}
                     */
                    this.TextChyby = undefined;
                    /**
                     * Příznak zachování ručních zápisů při zrušení účtování (pro ukončení průvodce)
                     * @type {boolean}
                     */
                    this.ZachovatRucniZapisy = true;
                    /**
                     * Příznak, je-li možné editovat zápisy, je-li grid v kompatibilním stavu (pro druhý krok průvodce)
                     * @type {boolean}
                     * @default true
                     */
                    this.PovolenaEditaceZapisu = true;
                    /**
                     * Aktuální id historie účtování
                     * @type {string}
                     */
                    this.IxsHuf = "";
                    /**
                     * Příznak, že je účtování odloženě
                     * @type {boolean}
                     */
                    this.OdlozeneUctovani = false;
                    /**
                     * Varování z kontroly, které se zobrazí v prvním kroku jako flash
                     * @type {string | undefined | null}
                     * @default null
                     */
                    this.WarningZKontroly = null;
                    /**
                     * Informace z kontroly, které se zobrazí v prvním kroku jako flash
                     * @type {string | undefined | null}
                     * @default null
                     */
                    this.InfoZKontroly = null;
                    /**
                     * Příznak automatického přechodu z kroku 1 do 2
                     * @type {boolean}
                     * @default false
                     */
                    this.AutStep1to2 = false;
                    /**
                     * Filtry seznamu pohybů v kroku 1
                     * @type {any}
                     * @default {}
                     */
                    this.FiltryPohybu1 = {};
                    // konstanty
                    this.gridClassPohyby = "gridFucSeznamPohybu";
                }
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    // asynchronní načtení cache pro datovou větu
                    this.loadingAwait.then(() => { Gordic.Eko.WebClient.DataSentenceAdapter.getCacheContent(this.IxsRoz, this.IxsSax); });
                    if (this.PevTypUctAno)
                        this.TypUctovani = this.PevTypUctovani;
                    // TODO: proč to tady musí být, proč se při znovuspuštění průvodce pamatují hodnoty z minule?
                    this.FiltryPohybu1 = {};
                    // testování e-účetnictví
                    // TODO: e-účetnictví zatím jen v debug režimu
                    this.TestEUcetnictvi = that.prop("debugMode");
                    this.actions.addRange({
                        // fáze 0
                        // zatím není viditelné (není napsána obsluha)
                        actKontrola: Gordic.Eko.Action.actionZkontrolovat({
                            /*visible: false, */
                            run: function () { that.kontrolaPredUctovanim(); }
                        }),
                        // fáze 1
                        actDetailPohybu: Gordic.Eko.Action.actionDetail({
                            run: function () { that.detailPohybu(false); }
                        }),
                        actOpravaPohybu: Gordic.Eko.Action.actionOpravit({
                            run: function () { that.detailPohybu(true); }
                        }),
                        actFiltrPohybu: {
                            caption: "jres:24100532", //RC 24100532 : Filtr
                            icon: "gi-filter",
                            enabled: false,
                            run: function () { that.filterPohyby1(); }
                        },
                        actNovyZapis: Gordic.Eko.Action.actionNovy({
                            caption: "jres:24100148", //RC 24100148 : Nový zápis
                            run: function () { that.novyZapis(); }
                        }),
                        actOpravaZapisu: Gordic.Eko.Action.actionUpravit({
                            caption: "jres:24100149", //RC 24100149 : Opravit zápis
                            run: function () { that.editaceZapisu(); }
                        }),
                        actOdstraneniZapisu: Gordic.Eko.Action.actionOdstranit({
                            caption: "jres:24100150", //RC 24100150 : Odstranit zápis
                            run: function () { that.odstraneniZapisu(); }
                        }),
                        // fáze 3
                        actTiskDokladu: Gordic.Eko.Action.actionTisk({
                            enabled: true,
                            name: "actTiskDokladu",
                            tema: "fuc_ptm_engzau",
                            serverParameterMethod: "Gordic.Fuc.WebClient.GUctovaniPohybu:PrintParameters",
                            reportStarting: function (rep) { return that.reportStarting(rep); }
                        }),
                        actTiskVsechDokladu: Gordic.Eko.Action.actionTisk({
                            enabled: true,
                            name: "actTiskVsechDokladu",
                            tema: "fuc_ptm_engzau",
                            caption: "jres:24100462", //RC 24100462 : Tisk vše
                            serverParameterMethod: "Gordic.Fuc.WebClient.GUctovaniPohybu:PrintParameters",
                            reportStarting: function (rep) { return that.reportStarting(rep, true); }
                        }),
                        actDokladOZauctovani: WebClient.FucActions.actionDokladOZauctovani({
                            enabled: true,
                            run: function () { that.dokladOZauctovani(); }
                        }),
                        // všechny fáze kromě 3
                        actZauctovatOdlozene: WebClient.FucActions.actionZauctovatOdlozene({
                            enabled: true,
                            run: function () { that.zauctovatOdlozene(); }
                        }),
                    });
                    // založení historie účtování a prvotní kontrola
                    that.inicializaceAPrvotniKontrolaPredUctovanim()
                        .done(function () {
                        that.wizard = new Gordic.Wizard();
                        that.wizard.create({
                            content: that
                        }, {
                            // TODO: zkusit chyby z kontroly (nejsou zpz, ...) a motorů
                            // TODO: opravit zobrazení detailu (v prvním kroku nejde, ve druhém jsem to nezkoušel) a mělo by fungovat tak jak na seznamu (občerstvení seznamů pod ním)
                            // TODO: je možné nějak měnit titulek třeba podle vybraného typu účtování?
                            // TODO: proč tohle už nefunguje a musím to dělat v CS?
                            //title: "jres:24100210", //RC 24100210 : Účtování
                            steps: [
                                {
                                    // fáze 0 - kontrola účetních pohybů
                                    caption: "jres:24100459", //RC 24100459 : Zadání
                                    create: function (cnt, contentDiv, change) {
                                        // uchování informací o průběhu průvodce a zakázání (dočasné?) kroků o více než jeden
                                        that.saveStepInfo(that.wizard, change);
                                        // popis
                                        //FucWizard.createDescription(contentDiv, "tady může být popis");
                                        // parametry
                                        that.createFormParametry(contentDiv, change.activeStep);
                                        if (!that.PevTypUctAno) {
                                            let radioTypUct = that.findFields("typ_uctovani").gradio("option");
                                            radioTypUct.radios[0].disabled = !that.PovolenoUctovaniJednotlive;
                                            radioTypUct.radios[1].disabled = !that.PovolenoUctovaniHromadne;
                                            radioTypUct.radios[2].disabled = !that.PovolenoUctovaniKumulovane;
                                            that.findFields("typ_uctovani").gradio("destroy").gradio(radioTypUct).gfield("model", "apply", { typ_uctovani: that.TypUctovani });
                                        }
                                        // KPI se stavy záznamů
                                        that.kpiPanel = WebClient.FucWizard.createKPIPanel(contentDiv, (kind) => WebClient.FucWizard.getSelFunc(kind, that.$grid0Pohyby.ggrid("getView")));
                                        // seznam pohybů
                                        let $tabPohyby = $.newDiv().appendTo(contentDiv)
                                            .gtab({
                                            title: "Vybrané pohyby", opened: true /*, locked: true*/,
                                            menuBar: [
                                                { action: that.actions.actKontrola, favorite: true },
                                                { action: that.actions.actDetailPohybu, favorite: true }
                                            ]
                                        });
                                        that.$grid0Pohyby = $.newDiv(that.gridClassPohyby)
                                            .appendTo($tabPohyby)
                                            .ggrid({
                                            name: "grid0Pohyby",
                                            columnMode: "full",
                                            rowsChecked: "duct_check",
                                            multi: true,
                                            multiMenu: [
                                                WebClient.FucWizard.createItemForMultiMenu("actSuccessRecords", "jres:24100508", () => that.$grid0Pohyby, 200 /* Gordic.Isl.GOperationResultKind.Success */), //RC 24100508 : Vybrat vyhovující
                                                WebClient.FucWizard.createItemForMultiMenu("actRemoveSuccessRecords", "jres:24100509", () => that.$grid0Pohyby, 200 /* Gordic.Isl.GOperationResultKind.Success */, false), //RC 24100509 : Zrušit vyhovující
                                                WebClient.FucWizard.createItemForMultiMenu("actWarningRecords", "jres:24100510", () => that.$grid0Pohyby, 206 /* Gordic.Isl.GOperationResultKind.Warning */), //RC 24100510 : Vybrat upozornění
                                                WebClient.FucWizard.createItemForMultiMenu("actRemoveWarningRecords", "jres:24100511", () => that.$grid0Pohyby, 206 /* Gordic.Isl.GOperationResultKind.Warning */, false), //RC 24100511 : Zrušit upozornění
                                                WebClient.FucWizard.createItemForMultiMenu("actUnSuccessRecords", "jres:24100512", () => that.$grid0Pohyby, 400 /* Gordic.Isl.GOperationResultKind.Error */), //RC 24100512 : Vybrat nevyhovující
                                                WebClient.FucWizard.createItemForMultiMenu("actRemoveUnSuccessRecords", "jres:24100513", () => that.$grid0Pohyby, 400 /* Gordic.Isl.GOperationResultKind.Error */, false) //RC 24100513 : Zrušit nevyhovující
                                            ],
                                            //rowsCheckEnabled: () => { return false; },
                                            // TODO: upravit:
                                            //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                            columns: WebClient.FucGrid.Pohyb.createGridFormat(that, Gordic.Fuc.Globals.Enums.TypSezPoh.VUctovani, true, true),
                                            defaultProfile: {
                                                columnList: "duct_kind,duct_txt_err," + (that.ColumnList ?? "ixp_upr,radek_upo,typ_upo_txt,s_upo_txt,s_sto_txt,ktg_upo_txt,znam_txt,c_upo,popis_upo,subjekt.nazev,dat_upo,dat_zauc,obd_dan,subrada_duz,priz_dd_txt")
                                            }
                                        })
                                            .gautofit({
                                            resizersOnTab: false
                                        });
                                        // tento krok je bez akcí v menu
                                        that.menuBar([]);
                                        // případné flashe
                                        WebClient.FucWizard.showWarningFlash(that.WarningZKontroly, cnt);
                                        WebClient.FucWizard.showInfoFlash(that.InfoZKontroly, cnt);
                                        // TODO: přidat vedle tlačítka Další tlačítko Zrušit (viz. UCT)? Nebo vlevo dole?
                                        // naplnění tabulky pohybů (kontrola už byla spuštěna před spuštěním průvodce)
                                        return that.loadPohyby0();
                                    },
                                    change: function (cnt, contentDiv, change) {
                                        // z prvního kroku je příprava účtování vždy kompletní
                                        //that.pripravaPrvni = true;
                                        //change.stepsEnable[1] = false;
                                        // nastavení povolení jednotlivých kroků (je nutné kvůli opakovanému přechodu na další krok)
                                        that.saveStepInfo(null /*wizard*/, change, true);
                                        // změna fáze
                                        return that.changeFaze(cnt, change);
                                        //    return that.checkParameters(cnt)
                                        //        .done(function (ret) {
                                        //            // podle výsledku kontroly je nebo není možné pokračovat na další krok
                                        //            change.stepsEnable[1] = !!ret;
                                        //        });
                                    },
                                    buttons: [{ action: that.actions.actZauctovatOdlozene }],
                                    commandBar: { next: "jres:24100165" } //RC 24100165 : Další
                                },
                                {
                                    // fáze 1 - příprava účetních zápisů včetně možnosti úprav
                                    caption: "jres:24100463", //RC 24100463 : Návrh účtování
                                    create: function (cnt, contentDiv, change) {
                                        let autStep2 = that.globalSettings?.getDef("Global.Fuc.AppSettings.UctUpoSettingsForm.UctWizardStep02", true) ?? true;
                                        if (autStep2 && change?.task?.taskOn === false && change?.task?.nextStep === 1 && that.Faze === 0) {
                                            // automatický přechod na fázi 2
                                            that.AutStep1to2 = true;
                                            that.wizard.setStep(2);
                                        }
                                        else {
                                            that.AutStep1to2 = false;
                                            //that.$grid1Pohyby = undefined;
                                            that.$grid1ZapisyPohybu = undefined;
                                            that.PovolenaEditaceZapisu = true;
                                            that.SortedCfuSet = new Gordic.Data.GridFormat().getBaseCfuSet(that);
                                            that.GridFormatZapisyPohybu = WebClient.FucGrid.Zapis.createGridFormat(that, true, true, that.Ico);
                                            // uchování informací o průběhu průvodce a zakázání (dočasné?) kroků o více než jeden
                                            that.saveStepInfo(that.wizard, change);
                                            // skrytí případných flashů z minulého kroku
                                            WebClient.FucWizard.hideErrorFlash(cnt);
                                            WebClient.FucWizard.hideWarningFlash(cnt);
                                            WebClient.FucWizard.hideInfoFlash(cnt);
                                            // filtry pohybů
                                            that.actions.actFiltrPohybu.checked(that.FiltryPohybu1.zap_se_zapisy === true || that.FiltryPohybu1.zap_bez_zapisu === true || that.FiltryPohybu1.zap_nevyrovnane_za_nks === true || that.FiltryPohybu1.zap_nevyrovnane_bez_nks === true);
                                            // přehled parametrů z prvního kroku (zjednodušený, needitovatelný)
                                            that.createFormParametry(contentDiv, change.activeStep);
                                            // seznam pohybů
                                            let $tabPohyby = $.newDiv().appendTo(contentDiv)
                                                .gtab({
                                                title: "Vybrané pohyby", opened: true /*, locked: true*/,
                                                menuBar: [
                                                    { action: that.actions.actDetailPohybu, favorite: true },
                                                    { action: that.actions.actOpravaPohybu, favorite: true },
                                                    { action: that.actions.actFiltrPohybu, favorite: true }
                                                ]
                                            });
                                            $.newDiv().appendTo($tabPohyby).gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection());
                                            that.$grid1Pohyby = $.newDiv()
                                                .appendTo($tabPohyby)
                                                .ggrid({
                                                name: "grid1Pohyby",
                                                columnMode: "full",
                                                // TODO: upravit:
                                                //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                                columns: WebClient.FucGrid.Pohyb.createGridFormat(that, Gordic.Fuc.Globals.Enums.TypSezPoh.VUctovani, true),
                                                defaultProfile: {
                                                    columnList: that.ColumnList ?? "ixp_upr,radek_upo,typ_upo_txt,s_upo_txt,s_sto_txt,ktg_upo_txt,znam_txt,c_upo,popis_upo,subjekt.nazev,dat_upo,dat_zauc,obd_dan,subrada_duz,priz_dd_txt"
                                                },
                                                cellActivate: function (ev, obj) {
                                                    // načtení zápisů aktuálního pohybu
                                                    if (obj.cellInfo)
                                                        that.loadZapisy();
                                                }
                                            })
                                                .gautofit({
                                                resizersOnTab: false
                                            });
                                            // seznam zápisů
                                            let $tabZapisy = $.newDiv().appendTo(contentDiv)
                                                .gtab({
                                                title: "Zápisy pohybu", opened: true /*, locked: true*/,
                                                menuBar: [
                                                    { action: that.actions.actNovyZapis, favorite: true },
                                                    { action: that.actions.actOpravaZapisu, favorite: true },
                                                    { action: that.actions.actOdstraneniZapisu }
                                                ]
                                            });
                                            $.newDiv().appendTo($tabZapisy).gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection());
                                            // flash pro informace o možnosti needitovat
                                            that.$grid1ZapisyPohybuFlash = $.newDiv().appendTo($tabZapisy);
                                            that.$grid1ZapisyPohybu = $.newDiv()
                                                .appendTo($tabZapisy)
                                                .ggrid({
                                                name: "grid1ZapisyPohybu",
                                                columnMode: "full",
                                                // TODO: upravit:
                                                //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                                columns: that.GridFormatZapisyPohybu /*FucGrid.Zapis.createGridFormat(that, true)*/,
                                                navigationMode: "row", // row, cell
                                                marking: true,
                                                profileBeforeChange: function (ev, obj) {
                                                    // pokud se edituje, nejsou povoleny změny v gridu
                                                    return (that.$grid1ZapisyPohybu?.find(".row.editing")?.length ?? 0) < 1;
                                                },
                                                profileChange: function (ev, obj) {
                                                    // informace (varování), pokud změna v profilu může způsobit nemožnost editace. v takovém případě není povolena editace
                                                    if (that.$grid1ZapisyPohybu) {
                                                        that.PovolenaEditaceZapisu = Gordic.Eko.Grid.isStateForEditing(that.$grid1ZapisyPohybu, obj, true, that.$grid1ZapisyPohybuFlash, undefined, that.GridFormatZapisyPohybu, that.SortedCfuSet);
                                                        that.enable();
                                                    }
                                                },
                                                cellActivate: function (ev, obj) {
                                                    // aktualizace prvků podle aktuálně vybraného řádku
                                                    if (obj.cellInfo)
                                                        that.enable();
                                                }
                                            })
                                                .ggridroweditor({
                                                allowCopy: true,
                                                beforeStart: function (ev, obj) {
                                                    // povolení editace se řídí stavem gridu a povolením příslušné akce na nový zápis nebo opravu zápisu
                                                    return that.PovolenaEditaceZapisu && (that.actions.actNovyZapis.enabled() || that.actions.actOpravaZapisu.enabled());
                                                },
                                                start: (ev, info) => {
                                                    // aktualizace prvků
                                                    that.enable();
                                                },
                                                save: function (data, info) {
                                                    // uložení změn
                                                    return that.ulozeniZapisu((data.novy_zapis === true), data);
                                                },
                                                commit: function (ev, info) {
                                                    // znovunačtení seznamu (kvůli možné změně pohybu)
                                                    that.loadPohyby1()
                                                        .then(function () {
                                                        return that.loadZapisy();
                                                    });
                                                },
                                                cancel: (ev, info) => {
                                                    // aktualizace prvků
                                                    that.enable();
                                                }
                                            })
                                                .gautofit({
                                                resizersOnTab: false
                                            });
                                            //.gautofit();
                                            // spuštění první fáze účtování (generování zápisů a příprava dokladů)
                                            return that.loadPohyby1();
                                            //return that.isl.FinPohyb.list(rq => { return { filters: { duct_ano: 0, duct_ikc: that.Ikc, duct_uncheck: 0, s_upo: Gordic.Fuc.Globals.Enums.SUpo.VUctovani } }; })
                                            //    .getData()
                                            //    .done(function (data) {
                                            //        // pohled
                                            //        // TODO: doplnit správný klíč podle typu, ale jestli je v případě dokladu vůbec nějaký unikátní primární klíč
                                            //        let view = new Gordic.Data.View(data/*, { key: "ixp_upr,radek_upo" }*/);
                                            //        // nastavení dat a překreslení gridu
                                            //        that.$grid1Pohyby.ggrid("setData", view);
                                            //        // nastavení přístupnosti akce
                                            //        // TODO: podobně udělat další akce na seznamech (např. zobrazení detailu a pod.)
                                            //        //that.actions.prevodAct.enabled(data.length > 0);
                                            //        that.enable();
                                            //        return;
                                            //    });
                                        }
                                    },
                                    change: function (cnt, contentDiv, change) {
                                        // vymazání filtrů
                                        that.FiltryPohybu1 = {};
                                        that.actions.actFiltrPohybu.checked(false);
                                        // nastavení povolení jednotlivých kroků (je nutné kvůli opakovanému přechodu na další krok)
                                        that.saveStepInfo(null, change, true);
                                        // změna fáze
                                        return that.changeFaze(cnt, change, that.AutStep1to2);
                                    },
                                    buttons: [{ action: that.actions.actZauctovatOdlozene }],
                                    commandBar: { next: "jres:24100165" } //RC 24100165 : Další
                                },
                                {
                                    // fáze 2 - příprava dokladů a jejich zaúčtování 
                                    caption: "jres:24100464", //RC 24100464 : Doklady k zaúčtování
                                    create: function (cnt, contentDiv, change) {
                                        that.AutStep1to2 = false;
                                        // uchování informací o průběhu průvodce a zakázání (dočasné?) kroků o více než jeden
                                        that.saveStepInfo(that.wizard, change);
                                        // skrytí případných flashů z minulého kroku
                                        WebClient.FucWizard.hideErrorFlash(cnt);
                                        WebClient.FucWizard.hideWarningFlash(cnt);
                                        WebClient.FucWizard.hideInfoFlash(cnt);
                                        // přehled parametrů z prvního kroku (zjednodušený, needitovatelný)
                                        that.createFormParametry(contentDiv, change.activeStep);
                                        // seznam dokladů
                                        let $tabDoklady = $.newDiv().appendTo(contentDiv).gtab({ title: "jres:24100466", opened: true /*, locked: true*/ }); //RC 24100466 : Doklady připravené k zaúčtování
                                        $.newDiv().appendTo($tabDoklady).gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection());
                                        that.$grid2Doklady = $.newDiv()
                                            .appendTo($tabDoklady)
                                            .ggrid({
                                            name: "grid2Doklady",
                                            columnMode: "full",
                                            // TODO: upravit:
                                            //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                            columns: WebClient.FucGrid.Zapis.createGridFormatDoklady(true /*, true*/),
                                            cellActivate: function (ev, obj) {
                                                // načtení zápisů aktuálního dokladu
                                                if (obj.cellInfo)
                                                    that.loadZapisy();
                                            }
                                        })
                                            .gautofit({
                                            resizersOnTab: false
                                        });
                                        // seznam zápisů
                                        let $tabZapisy = $.newDiv().appendTo(contentDiv).gtab({ title: "Zápisy dokladu", opened: true /*, locked: true*/ });
                                        $.newDiv().appendTo($tabZapisy).gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection());
                                        that.$grid2ZapisyDokladu = $.newDiv()
                                            .appendTo($tabZapisy)
                                            .ggrid({
                                            name: "grid2ZapisyDokladu",
                                            columnMode: "full",
                                            // TODO: upravit:
                                            //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                            columns: WebClient.FucGrid.Zapis.createGridFormat(that, true)
                                        })
                                            .gautofit({
                                            resizersOnTab: false
                                        });
                                        //.gautofit();
                                        // tento krok je bez akcí v menu
                                        that.menuBar([]);
                                        // zobrazení dokladů (už byly připraveny v minulém kroku)
                                        //that.faze2Doklady();
                                        return that.loadDoklady2();
                                        //return that.isl.Zapis.listDokladu(rq => { return { filters: { v_uctovani: 0, typ_uctovani: that.TypUctovani, ikc: that.Ikc } }; })
                                        //    .getData()
                                        //    .done(function (data) {
                                        //        // pohled
                                        //        // TODO: doplnit správný klíč podle typu, ale jestli je v případě dokladu vůbec nějaký unikátní primární klíč
                                        //        let view = new Gordic.Data.View(data/*, { key: "ixp_upr,radek_upo" }*/);
                                        //        // nastavení dat a překreslení gridu
                                        //        that.$grid2Doklady.ggrid("setData", view);
                                        //        // nastavení přístupnosti akce
                                        //        // TODO: podobně udělat další akce na seznamech (např. zobrazení detailu a pod.)
                                        //        //that.actions.prevodAct.enabled(data.length > 0);
                                        //        that.enable();
                                        //        //return;
                                        //        //})
                                        //    });
                                    },
                                    change: function (cnt, contentDiv, change) {
                                        // nastavení povolení jednotlivých kroků (je nutné kvůli opakovanému přechodu na další krok)
                                        that.saveStepInfo(null, change, true);
                                        // změna fáze
                                        return that.changeFaze(cnt, change);
                                    },
                                    buttons: [{ action: that.actions.actZauctovatOdlozene }],
                                    commandBar: { next: "jres:24100153" } //RC 24100153 : Zaúčtovat
                                },
                                {
                                    // fáze 3 - zobrazení vytvořených dokladů o zaúčtování
                                    // TODO: zde se musí řešit eÚčetnictví, protože v tom případě zde bude jen informace o tom, že to bylo posláno k účtování do UCT
                                    caption: "jres:24100465", //RC 24100465 : Účetní zápisy
                                    create: function (cnt, contentDiv, change) {
                                        // TODO: doladit podmínky, kdy se obecně nemá dělat inicializace kroku (tohoto a ostatních) - má to být při nextStep != activeStep nebo jindy
                                        if ((change?.task?.taskOn === true && change?.task?.nextStep === 1)) {
                                            // tento krok by se neměl inicializovat, požedavek je na druhý krok
                                        }
                                        else {
                                            // uchování informací o průběhu průvodce a zakázání (dočasné?) kroků o více než jeden
                                            that.saveStepInfo(that.wizard, change);
                                            // skrytí případných flashů z minulého kroku
                                            WebClient.FucWizard.hideErrorFlash(cnt);
                                            WebClient.FucWizard.hideWarningFlash(cnt);
                                            WebClient.FucWizard.hideInfoFlash(cnt);
                                            // bez tlačítka zrušit
                                            cnt.actions?.actCancel?.visible(false);
                                            // přehled parametrů z prvního kroku (zjednodušený, needitovatelný)
                                            that.createFormParametry(contentDiv, change.activeStep);
                                            // seznam dokladů
                                            let $tabDoklady = $.newDiv().appendTo(contentDiv)
                                                .gtab({
                                                title: "jres:24100452", opened: true /*, locked: true*/, //RC 24100452 : Doklady o zaúčtování
                                                menuBar: [
                                                    { action: that.actions.actTiskDokladu, favorite: true },
                                                    { action: that.actions.actTiskVsechDokladu, favorite: true },
                                                    { action: that.actions.actDokladOZauctovani, favorite: true },
                                                    //{
                                                    //    caption: "Tisk", type: "static", icon: Gin.Icons.ActionEnum.tisk, favorite: true, children: [
                                                    //        { action: that.actions.actTiskDokladu },
                                                    //        { action: that.actions.actTiskVsechDokladu }
                                                    //    ]
                                                    //}
                                                ]
                                            });
                                            $.newDiv().appendTo($tabDoklady).gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection());
                                            that.$grid3Doklady = $.newDiv()
                                                .appendTo($tabDoklady)
                                                .ggrid({
                                                name: "grid3Doklady",
                                                columnMode: "full",
                                                // TODO: upravit:
                                                //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                                columns: WebClient.FucGrid.Zapis.createGridFormatDoklady(true),
                                                cellActivate: function (ev, obj) {
                                                    // načtení zápisů aktuálního dokladu
                                                    if (obj.cellInfo)
                                                        that.loadZapisy();
                                                }
                                            })
                                                .gautofit({
                                                resizersOnTab: false
                                            });
                                            // seznam zápisů
                                            let $tabZapisy = $.newDiv().appendTo(contentDiv).gtab({ title: "Zápisy dokladu", opened: true /*, locked: true*/ });
                                            $.newDiv().appendTo($tabZapisy).gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection());
                                            that.$grid3ZapisyDokladu = $.newDiv()
                                                .appendTo($tabZapisy)
                                                .ggrid({
                                                name: "grid3ZapisyDokladu",
                                                columnMode: "full",
                                                // TODO: upravit:
                                                //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                                columns: WebClient.FucGrid.Zapis.createGridFormat(that, false)
                                            })
                                                .gautofit({
                                                resizersOnTab: false
                                            });
                                            //.gautofit();
                                            // zobrazení dokladů
                                            //that.faze3Zauctovani();
                                            return that.loadDoklady3();
                                            //    return that.isl.Zapis.listDokladu(rq => { return { filters: { typ_uctovani: that.TypUctovani, ikc: that.Ikc } }; })
                                            //        .getData()
                                            //        .done(function (data) {
                                            //            // pohled
                                            //            // TODO: doplnit správný klíč podle typu, ale jestli je v případě dokladu vůbec nějaký unikátní primární klíč
                                            //            let view = new Gordic.Data.View(data/*, { key: "ixp_upr,radek_upo" }*/);
                                            //            // nastavení dat a překreslení gridu
                                            //            that.$grid3Doklady.ggrid("setData", view);
                                            //            // nastavení přístupnosti akce
                                            //            // TODO: podobně udělat další akce na seznamech (např. zobrazení detailu a pod.)
                                            //            //that.actions.prevodAct.enabled(data.length > 0);
                                            //            that.enable();
                                            //            //return;
                                            //        });
                                        }
                                    },
                                    change: function (cnt, contentDiv, change) {
                                        // nastavení povolení jednotlivých kroků (je nutné kvůli opakovanému přechodu na další krok)
                                        that.saveStepInfo(null, change, true);
                                        // změna fáze
                                        return that.changeFaze(cnt, change);
                                    }
                                }
                            ],
                            // ukončení průvodce
                            complete: function (cnt, contentDiv, change) {
                                // uložení historie a ukončení průvodce
                                return that.tryClose(true);
                            },
                            cancel: (cnt, contentDiv, change) => {
                                // uložení historie a ukončení průvodce
                                return that.tryClose(false);
                            }
                        });
                        //});
                    })
                        .fail(function () {
                        that.UkoncenoChybou = true;
                        // ukončení průvodce
                        that.tryClose();
                    });
                }
                /**
                 * Změna fáze
                 *
                 * @param {GContent} cnt content
                 * @param {OGWizardChange} change informace o fázích
                 * @param {boolean} [autStep1to2] jde o automatický přechod z kroku 1 na 2?
                 * @returns {void | JQuery.Promise<any>} případný promise
                 */
                changeFaze(cnt, change, autStep1to2) {
                    let that = this;
                    const actStep = that.PripravenaFaze != null ? that.PripravenaFaze : change.activeStep;
                    const nextStep = (typeof change.task.nextStep === "undefined" ? change.activeStep : change.task.nextStep);
                    if (actStep === nextStep)
                        return;
                    // kontrola přechodu na vzdálenější krok (podle nastavení v change)
                    // poznámka: nevrací se promise, aby se zobrazila hláška, že krok není dostupný
                    if (change.stepsEnable[nextStep] === false)
                        return;
                    // pokud vstupuji do již připravené fáze, tak není potřeba nic dělat
                    // TODO: přidat text fáze (kostičky)
                    // TODO: zobrazují se chyby (texty chyb), když to padne při přechodu na další krok?
                    let needReverse = false;
                    let revStep = -1;
                    if (nextStep > actStep) {
                        // směr vpřed
                        return $.Deferred().resolve().promise()
                            .then(function (err) {
                            if (!needReverse && (nextStep === 1 || (nextStep > 1 && actStep < 1))) {
                                // příprava zápisů
                                // kontrola parametrů
                                return that.checkParametersAndSaveCheck(cnt)
                                    .then(function (ret) {
                                    if (ret === true) {
                                        return that.uctovaniWizard(1, 0)
                                            .then(function () {
                                            that.PripravenaFaze = 1;
                                            return;
                                        })
                                            .catch(function (err) {
                                            needReverse = true;
                                            revStep = 0;
                                            return $.Deferred().resolve(err);
                                        });
                                    }
                                    else {
                                        return $.Deferred().reject();
                                    }
                                });
                            }
                            else
                                return $.Deferred().resolve(err);
                        })
                            .then(function (err) {
                            if (!needReverse && (nextStep === 2 || (nextStep > 2 && actStep < 2))) {
                                // příprava dokladů
                                return that.uctovaniWizard(2, 1)
                                    .then(function () {
                                    that.PripravenaFaze = 2;
                                    return;
                                })
                                    .catch(function (err) {
                                    needReverse = true;
                                    revStep = 1;
                                    return $.Deferred().resolve(err);
                                });
                            }
                            else
                                return $.Deferred().resolve(err);
                        })
                            .then(function (err) {
                            if (!needReverse && (nextStep === 3 || (nextStep > 3 && actStep < 3))) {
                                // zaúčtování
                                that.FiltryPohybu1 = {};
                                return that.uctovaniWizard(3, 2)
                                    .then(function () {
                                    that.PripravenaFaze = 3;
                                    return;
                                })
                                    .catch(function (err) {
                                    needReverse = true;
                                    revStep = 2;
                                    return $.Deferred().resolve(err);
                                });
                            }
                            else
                                return $.Deferred().resolve(err);
                        })
                            .then(function (err) {
                            if (needReverse) {
                                // byla chyba v požadovaném směru
                                if (that.FiltryPohybu1.zap_veta != null && that.FiltryPohybu1["zap_veta_txt"] != null) {
                                    if (nextStep === 3 && revStep === 2) {
                                        if (err) {
                                            return that.dialogs.showException(err)?.createDialogPromise()
                                                .then(() => {
                                                if (that.ZobrazitPohybySChybnouVetou === 1) {
                                                    revStep = 1;
                                                    that.FiltryPohybu1["zap_se_zapisy"] = true;
                                                }
                                                else if (that.ZobrazitPohybySChybnouVetou === 2) {
                                                    return that.dialogs.confirm("Chcete průvodce přepnout na druhý krok a zobrazit pouze pohyby mající zápisy s větou {0}?".format(that.FiltryPohybu1["zap_veta_txt"]), 600)
                                                        .createDialogPromise(GDlg.mbbYes.id)
                                                        .then(() => {
                                                        revStep = 1;
                                                        that.FiltryPohybu1["zap_se_zapisy"] = true;
                                                        return $.Deferred().resolve();
                                                    }, () => { return $.Deferred().resolve(); });
                                                }
                                                return $.Deferred().resolve();
                                            });
                                        }
                                        else
                                            return $.Deferred().resolve();
                                    }
                                }
                            }
                            return err;
                        })
                            .then(function (err) {
                            delete that.FiltryPohybu1["zap_veta_txt"];
                            // reject nebo resolve podle toho, jestli v požadovaném směru nastala chyba nebo ne
                            if (needReverse) {
                                // byla chyba v požadovaném směru
                                if (revStep !== actStep) {
                                    // při postupu o více kroků se nastaví poslední bezchybný krok
                                    that.wizard.setStep(revStep);
                                    // chyba se nevrací (to by zastavilo přesun na poslední provedený krok), ale jen se zde zobrazí
                                    if (err)
                                        return that.dialogs.showException(err)?.createDialogPromise();
                                    else
                                        return;
                                }
                                else {
                                    // při postupu o jeden krok se vrací chyba
                                    if (autStep1to2 === true && actStep === 1 && nextStep === 2 && revStep === 1) {
                                        // chyba byla při automatickém posunu z 1 na 2
                                        that.wizard.setStep(1);
                                        // chyba se nevrací (to by zastavilo nastavení kroku), ale jen se zde zobrazí
                                        if (err)
                                            return that.dialogs.showException(err)?.createDialogPromise();
                                        else
                                            return;
                                    }
                                    else if (actStep === 1 && revStep === 1) {
                                        // specialita pro krok 1, protože je potřeba seznam přeselektovat kvůli případným filtrům
                                        return that.loadPohyby1()
                                            .then(function () {
                                            if (err)
                                                throw err;
                                            else
                                                return $.Deferred().reject();
                                        });
                                    }
                                    else {
                                        if (err)
                                            throw err;
                                        else
                                            return $.Deferred().reject();
                                    }
                                }
                            }
                            else {
                                // vše proběhlo bez chyby
                                return;
                            }
                        });
                    }
                    else if (nextStep < actStep) {
                        // směr vzad
                        return $.Deferred().resolve().promise()
                            .then(function (err) {
                            if (nextStep === 2 || (nextStep < 2 && actStep > 2)) {
                                // příprava dokladů
                                // TODO: sem by to nemělo jít, protože z posledního kroku se nedá vrátit zpět
                                return $.Deferred().reject();
                                //return that.uctovaniWizard(2, 3)
                                //    .catch(function () {
                                //        needReverse = true;
                                //        revStep = 3;
                                //        return $.Deferred().resolve();
                                //    });
                            }
                            else
                                return $.Deferred().resolve(err);
                        })
                            .then(function (err) {
                            if (nextStep === 1 || (nextStep < 1 && actStep > 1)) {
                                // příprava zápisů
                                return that.uctovaniWizard(1, 2)
                                    .then(function () {
                                    that.PripravenaFaze = 1;
                                    return;
                                })
                                    .catch(function (err) {
                                    needReverse = true;
                                    revStep = 2;
                                    return $.Deferred().resolve(err);
                                });
                            }
                            else
                                return $.Deferred().resolve(err);
                        })
                            .then(function (err) {
                            if (nextStep === 0 || (nextStep < 0 && actStep > 0)) {
                                // kontrola pohybů
                                return that.isl.FinPohyb.jsouNeautomaticke({ ikc: that.Ikc })
                                    .get()
                                    .then(function (existNeautomaticke) {
                                    // pro přechod zpět případný dotaz na uložení změn pohybů
                                    if (existNeautomaticke) {
                                        return that.dialogs.confirm("jres:24100210", //RC 24100210 : Účtování
                                        "jres:24100211") //RC 24100211 : Na některých pohybech jsou ručně pořízené zápisy. Chcete zachovat zápisy těchto pohybů?
                                            .createDialogPromise([GDlg.mbbYes.id, GDlg.mbbNo.id])
                                            .then(function (id) {
                                            that.ZachovatRucniZapisy = (id === GDlg.mbbYes.id);
                                            return (id === GDlg.mbbYes.id);
                                        });
                                    }
                                    else {
                                        // účtování nebude ukončeno nebo zápisy neautomatických pohybů nejsou
                                        that.ZachovatRucniZapisy = true;
                                        return true;
                                    }
                                })
                                    .then(function (zachNeautomaticke) {
                                    // obsluha fáze
                                    return that.uctovaniWizard(0, 1, undefined, zachNeautomaticke)
                                        .then(function () {
                                        that.PripravenaFaze = 0;
                                        return;
                                    })
                                        .catch(function (err) {
                                        needReverse = true;
                                        revStep = 1;
                                        return $.Deferred().resolve(err);
                                    });
                                });
                            }
                            else
                                return $.Deferred().resolve(err);
                        })
                            .then(function (err) {
                            // reject nebo resolve podle toho, jestli v požadovaném směru nastala chyba nebo ne
                            if (needReverse) {
                                // byla chyba v požadovaném směru
                                if (revStep !== actStep) {
                                    // při postupu o více kroků se nastaví poslední bezchybný krok
                                    that.wizard.setStep(revStep);
                                    // chyba se nevrací (to by zastavilo přesun na poslední provedený krok), ale jen se zde zobrazí
                                    if (err)
                                        return that.dialogs.showException(err)?.createDialogPromise();
                                    else
                                        return;
                                }
                                else {
                                    // při postupu o jeden krok se vrací chyba
                                    if (err)
                                        throw err;
                                    else
                                        return $.Deferred().reject();
                                }
                            }
                            else {
                                // vše proběhlo bez chyby
                                return;
                            }
                        });
                    }
                    // nemělo by nastat, resp. asi jenom při chybě při automatickém kroku 1->2
                    return;
                }
                ///**
                // * Kontrola pohybů před účtováním (volaná jen při spuštění průvodce nebo na tlačítko)
                // * 
                // * @param {boolean} [prvotni] prvotní kontrola před vytvořením průvodce?
                // * @param {boolean} [jenZaskrtnute] kontrolovat jen zaškrtnuté pohyby?
                // * @returns {JQueryPromise<void>} promise
                // */
                //private kontrolaPredUctovanim(prvotni?: boolean, jenZaskrtnute?: boolean): JQuery.Promise<any> {
                //    let that = this;
                //    // objekt pro předávání hodnot
                //    interface returnObjType {
                //        data: Gordic.Fuc.Interface.GPohybDto[] | null,
                //        dataChecked: Gordic.Fuc.Interface.GPohybDto[] | null
                //    };
                //    let returnObj: returnObjType = {
                //        data: null,
                //        dataChecked: null
                //    };
                //    // kontrola pohybů před účtováním
                //    return $.Deferred().resolve(returnObj).promise()
                //        .then(function (returnObj: returnObjType) {
                //            // načtení nebo převzetí dat
                //            if (prvotni === true) {
                //                return that.isl.FinPohyb.list(rq => { return { filters: { duct_ano: 0, duct_ikc: that.Ikc/*, s_upo: Gordic.Fuc.Globals.Enums.SUpo.Nezauctovany, s_sto: Gordic.Fuc.Globals.Enums.SSto.Nestornovano*/ } }; })
                //                    .getData()
                //                    .then(function (data) {
                //                        returnObj.data = data;
                //                        return returnObj;
                //                    });
                //            }
                //            else {
                //                if (jenZaskrtnute === true) returnObj.dataChecked = Gordic.Eko.Grid.checkedRows<Gordic.Fuc.Interface.GPohybDto>(that.$grid0Pohyby);
                //                returnObj.data = that.$grid0Pohyby.ggrid("getView").getDataRows();
                //                return returnObj;
                //            }
                //        })
                //        .then(function (returnObj: returnObjType) {
                //            if (prvotni === true) {
                //                // zápis do historie účtování (zahájení kontroly)
                //                return that.isl.FinPohybHistorieUctovani.updateFaze({
                //                    ixs_huf: that.IxsHuf,
                //                    start: true,
                //                    faze_uctovani: Gordic.Fuc.Interface.FazeUctovaniPohybuWizard.KontrolaPohybu,
                //                    priz_odl: 0
                //                })
                //                    .get()
                //                    .then(function (ret) {
                //                        return returnObj;
                //                    });
                //            }
                //            else {
                //                return returnObj;
                //            }
                //        })
                //        .then(function (returnObj: returnObjType) {
                //            // obsluha fáze
                //            // TODO: upravit parametry metody uctovaniWizard, aby fáze byly na začátku
                //            //that.uctovaniWizard(undefined, 0, -1)
                //            //.done(function () {
                //            //    def.resolve(returnObj);
                //            //})
                //            //.fail(function () {
                //            //    // operace nedopadla
                //            //    def.reject();
                //            //});
                //            if (returnObj.data) {
                //                return that.isl.FinPohyb.zkontrolujPredUctovanim(
                //                    {
                //                        ikc: that.Ikc,
                //                        rows: !prvotni && jenZaskrtnute ? returnObj.dataChecked : returnObj.data,
                //                        //aktualizovatDuct: true,
                //                        // TODO: dořešit typ účtování
                //                        typ_uctovani: that.PredchoziFaze === -1 ? 0/*null*/ : ((that.TypUctovani ?? Gordic.Fuc.Globals.Enums.TypUct.Jednotlive) as number)
                //                    }
                //                )
                //                    .get()
                //                    .then(function (ret) {
                //                        if (!(prvotni === true) && returnObj.data) {
                //                            returnObj.data = returnObj.data!.map(data => {
                //                                let res = ret.result.find(i => { return (data.ixp_upr === i.data.ixp_upr && data.radek_upo === i.data.radek_upo) });
                //                                if (res) {
                //                                    let resChecked = jenZaskrtnute && returnObj?.dataChecked ? returnObj.dataChecked.findIndex(i => (data.ixp_upr === i.ixp_upr && data.radek_upo === i.radek_upo)) >= 0 : false;
                //                                    data = $.extend(
                //                                        true,
                //                                        data,
                //                                        {
                //                                            duct_txt_err: res.errors?.reduce((acc, curr) => { return acc + curr.message + " "; }, ""),
                //                                            duct_kind: res.kind,
                //                                            // v režimu jenZaskrtnuté zachovat zaškrtnutí
                //                                            duct_check: jenZaskrtnute ? resChecked : res.kind === Gordic.Isl.GOperationResultKind.Success || res.kind === Gordic.Isl.GOperationResultKind.Warning
                //                                        }
                //                                    );
                //                                }
                //                                return data;
                //                            });
                //                        }
                //                        return returnObj;
                //                    },
                //                        function (excInfo) {
                //                            // operace nedopadla
                //                            that.TextChyby = FucUtils.getExcInfoMessage(excInfo);
                //                            // kvůli novému JQuery nestačí return
                //                            return $.Deferred().reject();
                //                        });
                //            }
                //            else {
                //                return returnObj;
                //            }
                //        })
                //        .then(function (returnObj: returnObjType) {
                //            if (prvotni === true) {
                //                // zápis do historie účtování (ukončení kontroly)
                //                return that.isl.FinPohybHistorieUctovani.updateFaze({
                //                    ixs_huf: that.IxsHuf,
                //                    start: false,
                //                    faze_uctovani: Gordic.Fuc.Interface.FazeUctovaniPohybuWizard.KontrolaPohybu,
                //                    priz_odl: 0
                //                })
                //                    .get()
                //                    .then(function (ret) {
                //                        return returnObj;
                //                    });
                //            }
                //            else {
                //                return returnObj;
                //            }
                //        })
                //        .then(function (returnObj: returnObjType) {
                //            // kontrola počtu pohybů podle maximálního limitu
                //            if (prvotni === true && returnObj.data) {
                //                // TODO: neudělat to nějak efektivněji?
                //                // TODO: takhle je to bez ohledu na zaškrtnuté - je to správně? nemělo by to být podle toho, jestli je to prvotní test nebo ne? má se to vůbez pouštět i z akce?
                //                //let chRadky = Gordic.Eko.Grid.checkedRows<Gordic.Fuc.Interface.GPohybDto>(that.$grid0Pohyby);
                //                //let pocetUpo: number = chRadky != null ? chRadky!.length : 0;
                //                let pocetUpo = returnObj.data.length;
                //                if (that.MaxUpo > 0 && pocetUpo > that.MaxUpo) {
                //                    // vybraných pohybů je více než je povoleno
                //                    // počet se musí při opuštění fáze 0 zkontrolvoat
                //                    // TODO: je tenhle příznak vůbec potřeba, když se tato metoda volá jen při spuštění průvodce?
                //                    that.faze0KontrPocetUpo = true;
                //                    // vybraných pohybů je více než je povoleno
                //                    that.TextChyby = "jres:24100237".format(pocetUpo, that.MaxUpo); //RC 24100237 : Požadujete účtovat {0} účetních pohybů, ale maximální povolený počet účetních pohybů pro účtování je {1}.
                //                    return that.dialogs.error("jres:24100210", that.TextChyby) //RC 24100210 : Účtování
                //                        .createDialogPromise(() => false);
                //                }
                //                else if (that.MaxUpo < 0 && pocetUpo > Math.abs(that.MaxUpo)) {
                //                    // vybraných pohybů je více než je povoleno, ale na dotaz je možné pokračovat
                //                    that.faze0KontrPocetUpo = true;
                //                    return that.dialogs.confirm("jres:24100210", //RC 24100210 : Účtování
                //                        "jres:24100238".format(pocetUpo, Math.abs(that.MaxUpo))) //RC 24100238 : Požadujete účtovat {0} účetních pohybů, ale maximální povolený počet účetních pohybů pro účtování je {1}. Opravdu chcete účtovat více pohybů?
                //                        .createDialogPromise(GDlg.mbbYes.id)
                //                        .then(function () {
                //                            // počet už nekontrolovat
                //                            that.faze0KontrPocetUpo = false;
                //                            return returnObj;
                //                        },
                //                            function () {
                //                                that.TextChyby = "jres:24100237".format(pocetUpo, that.MaxUpo); //RC 24100237 : Požadujete účtovat {0} účetních pohybů, ale maximální povolený počet účetních pohybů pro účtování je {1}.
                //                                // počet se musí při opuštění fáze 0 zkontrolovat
                //                                // kvůli novému JQuery nestačí return
                //                                return $.Deferred().reject();
                //                            });
                //                }
                //                else {
                //                    return returnObj;
                //                }
                //            }
                //            else {
                //                return returnObj;
                //            }
                //        })
                //        .then(function (returnObj: returnObjType) {
                //            // kontrola počtu pro průvodce
                //            if (prvotni === true && returnObj.data) {
                //                let pocetUpo = returnObj.data.length;
                //                // TODO: dořešit default doporučeného počtu a pak ho zaktualizovat zde a v uživatelském nastavení
                //                let maxWizard = that.globalSettings?.getDef("Global.Fuc.AppSettings.UctUpoSettingsForm.UctWizardMaxCount", 100) ?? 100;
                //                if (pocetUpo > 0 && maxWizard > 0 && pocetUpo > maxWizard) {
                //                    that.WarningZKontroly = "jres:24100236".format(maxWizard); //RC 24100236 : Účtování více než {0} pohybů je doporučeno provádět odloženě
                //                }
                //            }
                //            return returnObj;
                //        })
                //        .then(function (returnObj: returnObjType) {
                //            // TODO: použít konstantu na fázi účtování
                //            // TODO: tuhle prvotní kontrolu odstranit nebo upravit
                //            if (prvotni === true && returnObj.data) {
                //                // zjištění povolených typů účtování
                //                let promises: JQueryPromise<any>[] = [];
                //                // příznak kumulace za PID - nově bez ohledu na daňové pohyby, ty si motor pořeší sám, takže jen podle parametru a případných pohybů z POK
                //                const zalKumulovatZaIxp = that.KumulovatZaIxp;
                //                if (!that.KumulovatZaIxp) {
                //                    // parametr pro aktuální motory už neřeší daňové pohyby
                //                    that.KumulovatZaIxp = (returnObj.data.findIndex((pohyb) => (pohyb.upr_ktg_upr === Fuc.Globals.Enums.KtgUpr.Pokladna)/* || (pohyb.JeDanovy === true)*/) >= 0);
                //                }
                //                if (zalKumulovatZaIxp !== that.KumulovatZaIxp) {
                //                    const pohybyPok = (returnObj.data.findIndex((pohyb) => (pohyb.upr_ktg_upr === Fuc.Globals.Enums.KtgUpr.Pokladna)) >= 0);
                //                    const pohybyNePok = (returnObj.data.findIndex((pohyb) => (pohyb.upr_ktg_upr !== Fuc.Globals.Enums.KtgUpr.Pokladna)) >= 0);
                //                    if (pohybyPok && pohybyNePok) {
                //                        that.InfoZKontroly = "jres:24100377"; //RC 24100377 : Kvůli účtování pohybů hotovostních případů je zapnuta kumulace za PID případu i pro pohyby jiných kategorií případů
                //                    }
                //                }
                //                // TODO: řešit povolení účtování nebo to řešit až v kontrole při přechodu do fáze 1
                //                // TODO: nezrušit konstanty Gordic.Fuc.Globals.Enums.TypUct, když je Gordic.Fuc.Interface.TypUctovaniPohybu?
                //                if (that.UctPoh === Globals.Enums.UctPoh.Soupisky) {
                //                    // povolení podle vlastností soupisek
                //                    return that.isl.FinPohybSoupiska.jsouUctovaniPovolena({ typUctovani: [Gordic.Fuc.Interface.TypUctovaniPohybu.Jednotlive, Gordic.Fuc.Interface.TypUctovaniPohybu.Hromadne, Gordic.Fuc.Interface.TypUctovaniPohybu.Kumulovane], rows: returnObj.data })
                //                        .get()
                //                        .then(function (pov) {
                //                            if (pov) {
                //                                that.PovolenoUctovaniJednotlive = pov["Jednotlive"] === true;
                //                                that.PovolenoUctovaniHromadne = pov["Hromadne"] === true;
                //                                that.PovolenoUctovaniKumulovane = pov["Kumulovane"] === true;
                //                            }
                //                            return returnObj;
                //                        });
                //                    //promises.push(
                //                    //    that.isl.FinPohybSoupiska.jeUctovaniPovoleno({ typUctovani: Gordic.Fuc.Interface.TypUctovaniPohybu.Jednotlive, rows: returnObj.data })
                //                    //        .get().
                //                    //        done(function (pov) {
                //                    //            that.PovolenoUctovaniJednotlive = pov;
                //                    //        })
                //                    //);
                //                    //promises.push(
                //                    //    that.isl.FinPohybSoupiska.jeUctovaniPovoleno({ typUctovani: Gordic.Fuc.Interface.TypUctovaniPohybu.Hromadne, rows: returnObj.data })
                //                    //        .get().
                //                    //        done(function (pov) {
                //                    //            that.PovolenoUctovaniHromadne = pov;
                //                    //        })
                //                    //);
                //                    //promises.push(
                //                    //    that.isl.FinPohybSoupiska.jeUctovaniPovoleno({ typUctovani: Gordic.Fuc.Interface.TypUctovaniPohybu.Kumulovane, rows: returnObj.data })
                //                    //        .get().
                //                    //        done(function (pov) {
                //                    //            that.PovolenoUctovaniKumulovane = pov;
                //                    //        })
                //                    //);
                //                }
                //                else {
                //                    // povolení podle vlastností pohybů
                //                    return that.isl.FinPohyb.jsouUctovaniPovolena({ typUctovani: [Gordic.Fuc.Interface.TypUctovaniPohybu.Jednotlive, Gordic.Fuc.Interface.TypUctovaniPohybu.Hromadne, Gordic.Fuc.Interface.TypUctovaniPohybu.Kumulovane], rows: returnObj.data })
                //                        .get()
                //                        .then(function (pov) {
                //                            if (pov) {
                //                                that.PovolenoUctovaniJednotlive = pov["Jednotlive"] === true;
                //                                that.PovolenoUctovaniHromadne = pov["Hromadne"] === true;
                //                                that.PovolenoUctovaniKumulovane = pov["Kumulovane"] === true;
                //                            }
                //                            return returnObj;
                //                        });
                //                    //promises.push(
                //                    //    that.isl.FinPohyb.jeUctovaniPovoleno({ typUctovani: Gordic.Fuc.Interface.TypUctovaniPohybu.Jednotlive, rows: returnObj.data })
                //                    //        .get().
                //                    //        done(function (pov) {
                //                    //            that.PovolenoUctovaniJednotlive = pov;
                //                    //        })
                //                    //);
                //                    //promises.push(
                //                    //    that.isl.FinPohyb.jeUctovaniPovoleno({ typUctovani: Gordic.Fuc.Interface.TypUctovaniPohybu.Hromadne, rows: returnObj.data })
                //                    //        .get().
                //                    //        done(function (pov) {
                //                    //            that.PovolenoUctovaniHromadne = pov;
                //                    //        })
                //                    //);
                //                    //promises.push(
                //                    //    that.isl.FinPohyb.jeUctovaniPovoleno({ typUctovani: Gordic.Fuc.Interface.TypUctovaniPohybu.Kumulovane, rows: returnObj.data })
                //                    //        .get().
                //                    //        done(function (pov) {
                //                    //            that.PovolenoUctovaniKumulovane = pov;
                //                    //        })
                //                    //);
                //                }
                //                //return $.when.apply(null, promises).then(() => {
                //                //    // nastavení stavu typů účtování
                //                //    //if (!that.PevTypUctAno) {
                //                //    //    let radioTypUct = that.findFields("typ_uctovani").gradio("option");
                //                //    //    radioTypUct.radios[0].disabled = !that.PovolenoUctovaniJednotlive;
                //                //    //    radioTypUct.radios[1].disabled = !that.PovolenoUctovaniHromadne;
                //                //    //    radioTypUct.radios[2].disabled = !that.PovolenoUctovaniKumulovane;
                //                //    //    that.findFields("typ_uctovani").gradio("destroy").gradio(radioTypUct).gfield("model", "apply", { typ_uctovani: that.TypUctovani });
                //                //    //}
                //                //    return returnObj;
                //                //});
                //            }
                //            else {
                //                return returnObj;
                //            }
                //        })
                //        // TODO: dořešit správný typ - oprava kvůli padlému BS v sudé
                //        .then(function (returnObj: any/*returnObjType*/) {
                //            // kontrola pevného typu účtování
                //            // TODO: doplnit
                //            if (prvotni === true && returnObj.data) {
                //                if ((that.PevTypUctAno === true)
                //                    && (!((that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Jednotlive && that.PovolenoUctovaniJednotlive)
                //                        || (that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Hromadne && that.PovolenoUctovaniHromadne)
                //                        || (that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Kumulovane && that.PovolenoUctovaniKumulovane)))) {
                //                    that.TextChyby = "Požadovaný typ účtování není povolen";
                //                    //that.TextChyby = "Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 01. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 02. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 03. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 04. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 05. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 06. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 07. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 08. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 09. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 10. ";
                //                    return that.dialogs.error("jres:24100210", that.TextChyby) //RC 24100210 : Účtování
                //                        .createDialogPromise(() => false);
                //                }
                //                else {
                //                    return returnObj;
                //                }
                //            }
                //            else {
                //                return returnObj;
                //            }
                //        })
                //        .then(function (returnObj: returnObjType) {
                //            // TODO: dodělat - co všechno se má dělat poprvé a co na tlačítko?
                //            if (!(prvotni === true) && returnObj.data) {
                //                // počty záznamů
                //                FucWizard.refreshKPIPanel(that.kpiPanel, returnObj.data!);
                //                // celý pohled nebo jen aktualizace dat
                //                if (jenZaskrtnute === true) {
                //                    //let view = that.$grid0Pohyby.ggrid("getView");
                //                    that.$grid0Pohyby.ggrid("getView").updateData(returnObj.data!, "update");
                //                }
                //                else {
                //                    let view = new Gordic.Data.View(returnObj.data!, { key: "ixp_upr,radek_upo" });
                //                    // nastavení dat a překreslení gridu
                //                    that.$grid0Pohyby.ggrid("setData", view);
                //                }
                //            }
                //            return returnObj;
                //        })
                //        .done(function (returnObj: returnObjType) {
                //            if (!(prvotni === true) && returnObj.data) {
                //                that.enable();
                //            }
                //        });
                //}
                ///**
                // * Kontrola pohybů před účtováním (volaná jen při spuštění průvodce nebo na tlačítko)
                // * 
                // * @param {boolean} [jenZaskrtnute] kontrolovat jen zaškrtnuté pohyby?
                // * @returns {JQueryPromise<void>} promise
                // */
                //private kontrolaPredUctovanim(jenZaskrtnute?: boolean): JQuery.Promise<any> {
                //    let that = this;
                //    // objekt pro předávání hodnot
                //    interface returnObjType {
                //        data: Gordic.Fuc.Interface.GPohybDto[] | null,
                //        dataChecked: Gordic.Fuc.Interface.GPohybDto[] | null
                //    };
                //    let returnObj: returnObjType = {
                //        data: null,
                //        dataChecked: null
                //    };
                //    // kontrola pohybů před účtováním
                //    return $.Deferred().resolve(returnObj).promise()
                //        .then(function (returnObj: returnObjType) {
                //            // převzetí dat
                //            if (jenZaskrtnute === true) returnObj.dataChecked = Gordic.Eko.Grid.checkedRows<Gordic.Fuc.Interface.GPohybDto>(that.$grid0Pohyby);
                //            returnObj.data = that.$grid0Pohyby.ggrid("getView").getDataRows();
                //            return returnObj;
                //        })
                //        .then(function (returnObj: returnObjType) {
                //            // obsluha fáze
                //            // TODO: upravit parametry metody uctovaniWizard, aby fáze byly na začátku
                //            //that.uctovaniWizard(undefined, 0, -1)
                //            //.done(function () {
                //            //    def.resolve(returnObj);
                //            //})
                //            //.fail(function () {
                //            //    // operace nedopadla
                //            //    def.reject();
                //            //});
                //            if (returnObj.data) {
                //                return that.isl.FinPohyb.zkontrolujPredUctovanim(
                //                    {
                //                        ikc: that.Ikc,
                //                        rows: jenZaskrtnute ? returnObj.dataChecked : returnObj.data,
                //                        //aktualizovatDuct: true,
                //                        // TODO: dořešit typ účtování
                //                        typ_uctovani: that.PredchoziFaze === -1 ? 0/*null*/ : ((that.TypUctovani ?? Gordic.Fuc.Globals.Enums.TypUct.Jednotlive) as number)
                //                    }
                //                )
                //                    .get()
                //                    .then(function (ret) {
                //                        if (returnObj.data) {
                //                            returnObj.data = returnObj.data!.map(data => {
                //                                let res = ret.result.find(i => { return (data.ixp_upr === i.data.ixp_upr && data.radek_upo === i.data.radek_upo) });
                //                                if (res) {
                //                                    let resChecked = jenZaskrtnute && returnObj?.dataChecked ? returnObj.dataChecked.findIndex(i => (data.ixp_upr === i.ixp_upr && data.radek_upo === i.radek_upo)) >= 0 : false;
                //                                    data = $.extend(
                //                                        true,
                //                                        data,
                //                                        {
                //                                            duct_txt_err: res.errors?.reduce((acc, curr) => { return acc + curr.message + " "; }, ""),
                //                                            duct_kind: res.kind,
                //                                            // v režimu jenZaskrtnuté zachovat zaškrtnutí
                //                                            duct_check: jenZaskrtnute ? resChecked : res.kind === Gordic.Isl.GOperationResultKind.Success || res.kind === Gordic.Isl.GOperationResultKind.Warning
                //                                        }
                //                                    );
                //                                }
                //                                return data;
                //                            });
                //                        }
                //                        return returnObj;
                //                    },
                //                        function (excInfo) {
                //                            // operace nedopadla
                //                            that.TextChyby = FucUtils.getExcInfoMessage(excInfo);
                //                            // kvůli novému JQuery nestačí return
                //                            return $.Deferred().reject();
                //                        });
                //            }
                //            else {
                //                return returnObj;
                //            }
                //        })
                //        .then(function (returnObj: returnObjType) {
                //            // TODO: dodělat - co všechno se má dělat poprvé a co na tlačítko?
                //            if (returnObj.data) {
                //                // počty záznamů
                //                FucWizard.refreshKPIPanel(that.kpiPanel, returnObj.data!);
                //                // celý pohled nebo jen aktualizace dat
                //                if (jenZaskrtnute === true) {
                //                    //let view = that.$grid0Pohyby.ggrid("getView");
                //                    that.$grid0Pohyby.ggrid("getView").updateData(returnObj.data!, "update");
                //                }
                //                else {
                //                    let view = new Gordic.Data.View(returnObj.data!, { key: "ixp_upr,radek_upo" });
                //                    // nastavení dat a překreslení gridu
                //                    that.$grid0Pohyby.ggrid("setData", view);
                //                }
                //            }
                //            return returnObj;
                //        })
                //        .done(function (returnObj: returnObjType) {
                //            if (returnObj.data) {
                //                that.enable();
                //            }
                //        });
                //}
                /**
                 * Kontrola pohybů před účtováním (volaná jen při spuštění průvodce nebo na tlačítko)
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                kontrolaPredUctovanim() {
                    let that = this;
                    let pohyby = that.$grid0Pohyby.ggrid("getView").getDataRows();
                    if (pohyby?.length > 0) {
                        // standardní kontrola pohybů před účtováním
                        return that.isl.FinPohyb.zkontrolujPredUctovanim({
                            ikc: that.Ikc,
                            rows: pohyby,
                        })
                            .get()
                            .then(function (ret) {
                            // doplnění zjištěných výsledků k pohybům
                            pohyby = pohyby.map(pohyb => {
                                let res = ret.result.find(i => { return (pohyb.ixp_upr === i.data.ixp_upr && pohyb.radek_upo === i.data.radek_upo); });
                                if (res) {
                                    pohyb = $.extend(true, pohyb, {
                                        duct_txt_err: res.errors?.reduce((acc, curr) => { return acc + curr.message + " "; }, ""),
                                        duct_kind: res.kind,
                                        // v režimu jenZaskrtnuté zachovat zaškrtnutí
                                        duct_check: res.kind === 200 /* Gordic.Isl.GOperationResultKind.Success */ || res.kind === 206 /* Gordic.Isl.GOperationResultKind.Warning */
                                    });
                                }
                                return pohyb;
                            });
                            // počty záznamů
                            WebClient.FucWizard.refreshKPIPanel(that.kpiPanel, pohyby);
                            // celý pohled
                            let view = new Gordic.Data.View(pohyby, { key: "ixp_upr,radek_upo" });
                            // nastavení dat a překreslení gridu
                            that.$grid0Pohyby.ggrid("setData", view);
                        }, function (excInfo) {
                            // operace nedopadla
                            that.TextChyby = WebClient.FucUtils.getExcInfoMessage(excInfo);
                            // kvůli novému JQuery nestačí return
                            return $.Deferred().reject();
                        })
                            .done(function (data) {
                            that.enable();
                        });
                    }
                    else
                        return $.Deferred().reject().promise();
                    //// kontrola pohybů před účtováním
                    //return $.Deferred().resolve().promise()
                    //    .then(function () {
                    //        // převzetí dat
                    //        return that.$grid0Pohyby.ggrid<Gordic.Fuc.Interface.GPohybDto>("getView").getDataRows();
                    //    })
                    //    .then(function (data) {
                    //        // obsluha fáze
                    //        // TODO: upravit parametry metody uctovaniWizard, aby fáze byly na začátku
                    //        //that.uctovaniWizard(undefined, 0, -1)
                    //        //.done(function () {
                    //        //    def.resolve(returnObj);
                    //        //})
                    //        //.fail(function () {
                    //        //    // operace nedopadla
                    //        //    def.reject();
                    //        //});
                    //        if (data) {
                    //            return that.isl.FinPohyb.zkontrolujPredUctovanim(
                    //                {
                    //                    ikc: that.Ikc,
                    //                    rows: data,
                    //                    //aktualizovatDuct: true,
                    //                    // TODO: dořešit typ účtování
                    //                    //typ_uctovani: that.PredchoziFaze === -1 ? 0/*null*/ : ((that.TypUctovani ?? Gordic.Fuc.Globals.Enums.TypUct.Jednotlive) as number)
                    //                }
                    //            )
                    //                .get()
                    //                .then(function (ret) {
                    //                    if (data) {
                    //                        data = data!.map(data => {
                    //                            let res = ret.result.find(i => { return (data.ixp_upr === i.data.ixp_upr && data.radek_upo === i.data.radek_upo) });
                    //                            if (res) {
                    //                                data = $.extend(
                    //                                    true,
                    //                                    data,
                    //                                    {
                    //                                        duct_txt_err: res.errors?.reduce((acc, curr) => { return acc + curr.message + " "; }, ""),
                    //                                        duct_kind: res.kind,
                    //                                        // v režimu jenZaskrtnuté zachovat zaškrtnutí
                    //                                        duct_check: res.kind === Gordic.Isl.GOperationResultKind.Success || res.kind === Gordic.Isl.GOperationResultKind.Warning
                    //                                    }
                    //                                );
                    //                            }
                    //                            return data;
                    //                        });
                    //                    }
                    //                    return data;
                    //                },
                    //                    function (excInfo) {
                    //                        // operace nedopadla
                    //                        that.TextChyby = FucUtils.getExcInfoMessage(excInfo);
                    //                        // kvůli novému JQuery nestačí return
                    //                        return $.Deferred().reject();
                    //                    });
                    //        }
                    //        else {
                    //            return data;
                    //        }
                    //    })
                    //    .then(function (data: Gordic.Fuc.Interface.GPohybDto[] | null) {
                    //        // TODO: dodělat - co všechno se má dělat poprvé a co na tlačítko?
                    //        if (data) {
                    //            // počty záznamů
                    //            FucWizard.refreshKPIPanel(that.kpiPanel, data);
                    //            // celý pohled
                    //            let view = new Gordic.Data.View(data, { key: "ixp_upr,radek_upo" });
                    //            // nastavení dat a překreslení gridu
                    //            that.$grid0Pohyby.ggrid("setData", view);
                    //        }
                    //        return data;
                    //    })
                    //    .done(function (data) {
                    //        if (data) {
                    //            that.enable();
                    //        }
                    //    });
                }
                /**
                 * Založení historie účtování a prvotní kontrola pohybů před účtováním (metoda musí být volána jen při spuštění průvodce)
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                inicializaceAPrvotniKontrolaPredUctovanim() {
                    let that = this;
                    let inOperation = false;
                    // kontrola pohybů před účtováním včetně založení historie účtování
                    that.beginOperation("jres:24100499"); //RC 24100499 : Probíhá kontrola pohybů před účtováním
                    inOperation = true;
                    return that.isl.FinPohyb.inicializujAZkontrolujPredUctovanim({ odlozene: false, ikc: that.Ikc, rows: that.VstupniPohyby, uctPoh: that.UctPoh, parKumulovatZaIxp: that.KumulovatZaIxp, ixsHuf: that.IxsHuf })
                        .get()
                        .then(function (ret) {
                        if (inOperation) {
                            inOperation = false;
                            that.endOperation();
                        }
                        return ret.result?.data;
                    })
                        .then(function (returnObj) {
                        // uložení údajů a kontrola celkové chyby
                        if (returnObj?.flashInfo)
                            that.InfoZKontroly = returnObj.flashInfo;
                        if (returnObj?.ixsHuf)
                            that.IxsHuf = returnObj.ixsHuf;
                        if (returnObj?.chyba) {
                            // celková chyba, účtovat se nebude
                            that.TextChyby = returnObj.chyba;
                            return that.dialogs.error("jres:24100210", that.TextChyby) //RC 24100210 : Účtování
                                .createDialogPromise(() => false);
                        }
                        return returnObj;
                    })
                        .then(function (returnObj) {
                        // kontrola počtu pohybů, pokud se změnily počty (to by se mohlo stát u účtování všech pohybů)
                        if (returnObj.pocetPohybu != null && returnObj.pocetPohybu > 0) {
                            if (that.MaxUpo > 0 || that.MaxUpo < 0) {
                                if (returnObj.pocetPohybu > (that.KontrolPocetPohybu ?? 0) && (that.KontrolPocetPohybu ?? 0) < Math.abs(that.MaxUpo) && returnObj.pocetPohybu > Math.abs(that.MaxUpo)) {
                                    if (that.MaxUpo > 0) {
                                        // vybraných pohybů je více než je povoleno
                                        that.TextChyby = "jres:24100237".format(Gordic.Templates.Formatters.number(returnObj.pocetPohybu, "N"), Gordic.Templates.Formatters.number(that.MaxUpo, "N")); //RC 24100237 : Požadujete účtovat {0} účetních pohybů, ale maximální povolený počet účetních pohybů pro účtování je {1}.
                                        return that.dialogs.error("jres:24100210", that.TextChyby) //RC 24100210 : Účtování
                                            .createDialogPromise(() => false);
                                    }
                                    else if (that.MaxUpo < 0) {
                                        // vybraných pohybů je více než je povoleno, ale na dotaz je možné pokračovat
                                        return that.dialogs.confirm("jres:24100210", //RC 24100210 : Účtování
                                        "jres:24100238".format(Gordic.Templates.Formatters.number(returnObj.pocetPohybu, "N"), Gordic.Templates.Formatters.number(Math.abs(that.MaxUpo), "N"))) //RC 24100238 : Požadujete účtovat {0} účetních pohybů, ale maximální povolený počet účetních pohybů pro účtování je {1}. Opravdu chcete účtovat více pohybů?
                                            .createDialogPromise(GDlg.mbbYes.id)
                                            .then(function () {
                                            // přesto pokračovat
                                            return returnObj;
                                        }, function () {
                                            that.TextChyby = "jres:24100237".format(Gordic.Templates.Formatters.number(returnObj.pocetPohybu, "N"), Gordic.Templates.Formatters.number(that.MaxUpo, "N")); //RC 24100237 : Požadujete účtovat {0} účetních pohybů, ale maximální povolený počet účetních pohybů pro účtování je {1}.
                                            // nepokračovat
                                            return $.Deferred().reject();
                                        });
                                    }
                                }
                            }
                        }
                        return returnObj;
                    })
                        .then(function (returnObj) {
                        // kontrola počtu pro průvodce
                        let pocetUpo = returnObj.pocetPohybu ?? 0;
                        // TODO: dořešit default doporučeného počtu a pak ho zaktualizovat zde a v uživatelském nastavení
                        if (pocetUpo > 0) {
                            let maxWizard = that.globalSettings?.getDef("Global.Fuc.AppSettings.UctUpoSettingsForm.UctWizardMaxCount", 100) ?? 100;
                            if (maxWizard > 0 && pocetUpo > maxWizard) {
                                that.WarningZKontroly = "jres:24100236".format(Gordic.Templates.Formatters.number(maxWizard, "N")); //RC 24100236 : Účtování více než {0} pohybů je doporučeno provádět odloženě
                            }
                        }
                        return returnObj;
                    })
                        .then(function (returnObj) {
                        // uložení údajů a kontrola pevného typu účtování
                        if (returnObj?.parKumulovatZaIxp != null)
                            that.KumulovatZaIxp = returnObj.parKumulovatZaIxp;
                        that.PovolenoUctovaniJednotlive = returnObj?.povolenoUctovaniJednotlive === true;
                        that.PovolenoUctovaniHromadne = returnObj?.povolenoUctovaniHromadne === true;
                        that.PovolenoUctovaniKumulovane = returnObj?.povolenoUctovaniKumulovane === true;
                        // TODO: doplnit
                        if ((that.PevTypUctAno === true)
                            && (!((that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Jednotlive && that.PovolenoUctovaniJednotlive)
                                || (that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Hromadne && that.PovolenoUctovaniHromadne)
                                || (that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Kumulovane && that.PovolenoUctovaniKumulovane)))) {
                            that.TextChyby = "jres:24100496"; //RC 24100496 : Požadovaný typ účtování není povolen
                            return that.dialogs.error("jres:24100210", //RC 24100210 : Účtování
                            that.TextChyby) //RC 24100496 : Požadovaný typ účtování není povolen
                                .createDialogPromise(() => false);
                        }
                        return returnObj;
                    })
                        .always(function () {
                        if (inOperation) {
                            inOperation = false;
                            that.endOperation();
                        }
                    });
                    //    return $.Deferred().resolve().promise()
                    //        .then(function () {
                    //            // načtení dat
                    //            return that.isl.FinPohyb.list(rq => { return { filters: { duct_ano: 0, duct_ikc: that.Ikc } }; })
                    //                .getData()
                    //                .then(function (data) {
                    //                    if (data == null || data.length === 0) {
                    //                        // konec, pokud nejsou žádné pohyby k účtování
                    //                        that.TextChyby = "Nebyly vybrány žádné pohyby k účtování";
                    //                        return $.Deferred().reject();
                    //                    }
                    //                });
                    //        })
                    //        .then(function (data: Fuc.Interface.GPohybDto[]) {
                    //            // zápis do historie účtování (zahájení kontroly)
                    //            return that.isl.FinPohybHistorieUctovani.updateFaze({
                    //                ixs_huf: that.IxsHuf,
                    //                start: true,
                    //                faze_uctovani: Gordic.Fuc.Interface.FazeUctovaniPohybuWizard.KontrolaPohybu,
                    //                priz_odl: 0
                    //            })
                    //                .get()
                    //                .then(function (ret) {
                    //                    return data;
                    //                });
                    //        })
                    //        .then(function (data: Fuc.Interface.GPohybDto[]) {
                    //            return that.isl.FinPohyb.zkontrolujPredUctovanim(
                    //                {
                    //                    ikc: that.Ikc,
                    //                    rows: data,
                    //                    //aktualizovatDuct: true,
                    //                    // TODO: dořešit typ účtování
                    //                    typ_uctovani: that.PredchoziFaze === -1 ? 0/*null*/ : ((that.TypUctovani ?? Gordic.Fuc.Globals.Enums.TypUct.Jednotlive) as number)
                    //                }
                    //            )
                    //                .get()
                    //                .then(function (ret) {
                    //                    return data;
                    //                },
                    //                    function (excInfo) {
                    //                        // operace nedopadla
                    //                        that.TextChyby = FucUtils.getExcInfoMessage(excInfo);
                    //                        return $.Deferred().reject();
                    //                    });
                    //        })
                    //        .then(function (data: Fuc.Interface.GPohybDto[]) {
                    //            // zápis do historie účtování (ukončení kontroly)
                    //            return that.isl.FinPohybHistorieUctovani.updateFaze({
                    //                ixs_huf: that.IxsHuf,
                    //                start: false,
                    //                faze_uctovani: Gordic.Fuc.Interface.FazeUctovaniPohybuWizard.KontrolaPohybu,
                    //                priz_odl: 0
                    //            })
                    //                .get()
                    //                .then(function (ret) {
                    //                    return data;
                    //                });
                    //        })
                    //        .then(function (data: Fuc.Interface.GPohybDto[]) {
                    //            // kontrola počtu pohybů podle maximálního limitu
                    //            // TODO: neudělat to nějak efektivněji?
                    //            // TODO: takhle je to bez ohledu na zaškrtnuté - je to správně? nemělo by to být podle toho, jestli je to prvotní test nebo ne? má se to vůbez pouštět i z akce?
                    //            //let chRadky = Gordic.Eko.Grid.checkedRows<Gordic.Fuc.Interface.GPohybDto>(that.$grid0Pohyby);
                    //            //let pocetUpo: number = chRadky != null ? chRadky!.length : 0;
                    //            let pocetUpo = data.length;
                    //            if (that.MaxUpo > 0 && pocetUpo > that.MaxUpo) {
                    //                // vybraných pohybů je více než je povoleno
                    //                // počet se musí při opuštění fáze 0 zkontrolvoat
                    //                // TODO: je tenhle příznak vůbec potřeba, když se tato metoda volá jen při spuštění průvodce?
                    //                that.faze0KontrPocetUpo = true;
                    //                // vybraných pohybů je více než je povoleno
                    //                that.TextChyby = "jres:24100237".format(pocetUpo, that.MaxUpo); //RC 24100237 : Požadujete účtovat {0} účetních pohybů, ale maximální povolený počet účetních pohybů pro účtování je {1}.
                    //                return that.dialogs.error("jres:24100210", that.TextChyby) //RC 24100210 : Účtování
                    //                    .createDialogPromise(() => false);
                    //            }
                    //            else if (that.MaxUpo < 0 && pocetUpo > Math.abs(that.MaxUpo)) {
                    //                // vybraných pohybů je více než je povoleno, ale na dotaz je možné pokračovat
                    //                that.faze0KontrPocetUpo = true;
                    //                return that.dialogs.confirm("jres:24100210", //RC 24100210 : Účtování
                    //                    "jres:24100238".format(pocetUpo, Math.abs(that.MaxUpo))) //RC 24100238 : Požadujete účtovat {0} účetních pohybů, ale maximální povolený počet účetních pohybů pro účtování je {1}. Opravdu chcete účtovat více pohybů?
                    //                    .createDialogPromise(GDlg.mbbYes.id)
                    //                    .then(function () {
                    //                        // počet už nekontrolovat
                    //                        that.faze0KontrPocetUpo = false;
                    //                        return data;
                    //                    },
                    //                        function () {
                    //                            that.TextChyby = "jres:24100237".format(pocetUpo, that.MaxUpo); //RC 24100237 : Požadujete účtovat {0} účetních pohybů, ale maximální povolený počet účetních pohybů pro účtování je {1}.
                    //                            // počet se musí při opuštění fáze 0 zkontrolovat
                    //                            // kvůli novému JQuery nestačí return
                    //                            return $.Deferred().reject();
                    //                        });
                    //            }
                    //            else {
                    //                return data;
                    //            }
                    //        })
                    //        .then(function (data: Fuc.Interface.GPohybDto[]) {
                    //            // kontrola počtu pro průvodce
                    //            let pocetUpo = data.length;
                    //            // TODO: dořešit default doporučeného počtu a pak ho zaktualizovat zde a v uživatelském nastavení
                    //            let maxWizard = that.globalSettings?.getDef("Global.Fuc.AppSettings.UctUpoSettingsForm.UctWizardMaxCount", 100) ?? 100;
                    //            if (pocetUpo > 0 && maxWizard > 0 && pocetUpo > maxWizard) {
                    //                that.WarningZKontroly = "jres:24100236".format(maxWizard); //RC 24100236 : Účtování více než {0} pohybů je doporučeno provádět odloženě
                    //            }
                    //            return data;
                    //        })
                    //        .then(function (data: Fuc.Interface.GPohybDto[]) {
                    //            // TODO: použít konstantu na fázi účtování
                    //            // TODO: tuhle prvotní kontrolu odstranit nebo upravit
                    //            // zjištění povolených typů účtování
                    //            let promises: JQueryPromise<any>[] = [];
                    //            // příznak kumulace za PID - nově bez ohledu na daňové pohyby, ty si motor pořeší sám, takže jen podle parametru a případných pohybů z POK
                    //            const zalKumulovatZaIxp = that.KumulovatZaIxp;
                    //            if (!that.KumulovatZaIxp) {
                    //                // parametr pro aktuální motory už neřeší daňové pohyby
                    //                that.KumulovatZaIxp = (data.findIndex((pohyb) => (pohyb.upr_ktg_upr === Fuc.Globals.Enums.KtgUpr.Pokladna)/* || (pohyb.JeDanovy === true)*/) >= 0);
                    //            }
                    //            if (zalKumulovatZaIxp !== that.KumulovatZaIxp) {
                    //                const pohybyPok = (data.findIndex((pohyb) => (pohyb.upr_ktg_upr === Fuc.Globals.Enums.KtgUpr.Pokladna)) >= 0);
                    //                const pohybyNePok = (data.findIndex((pohyb) => (pohyb.upr_ktg_upr !== Fuc.Globals.Enums.KtgUpr.Pokladna)) >= 0);
                    //                if (pohybyPok && pohybyNePok) {
                    //                    that.InfoZKontroly = "jres:24100377"; //RC 24100377 : Kvůli účtování pohybů hotovostních případů je zapnuta kumulace za PID případu i pro pohyby jiných kategorií případů
                    //                }
                    //            }
                    //            // TODO: řešit povolení účtování nebo to řešit až v kontrole při přechodu do fáze 1
                    //            // TODO: nezrušit konstanty Gordic.Fuc.Globals.Enums.TypUct, když je Gordic.Fuc.Interface.TypUctovaniPohybu?
                    //            if (that.UctPoh === Globals.Enums.UctPoh.Soupisky) {
                    //                // povolení podle vlastností soupisek
                    //                return that.isl.FinPohybSoupiska.jsouUctovaniPovolena({ typUctovani: [Gordic.Fuc.Interface.TypUctovaniPohybu.Jednotlive, Gordic.Fuc.Interface.TypUctovaniPohybu.Hromadne, Gordic.Fuc.Interface.TypUctovaniPohybu.Kumulovane], rows: data })
                    //                    .get()
                    //                    .then(function (pov) {
                    //                        if (pov) {
                    //                            that.PovolenoUctovaniJednotlive = pov["Jednotlive"] === true;
                    //                            that.PovolenoUctovaniHromadne = pov["Hromadne"] === true;
                    //                            that.PovolenoUctovaniKumulovane = pov["Kumulovane"] === true;
                    //                        }
                    //                        return data;
                    //                    });
                    //            }
                    //            else {
                    //                // povolení podle vlastností pohybů
                    //                return that.isl.FinPohyb.jsouUctovaniPovolena({ typUctovani: [Gordic.Fuc.Interface.TypUctovaniPohybu.Jednotlive, Gordic.Fuc.Interface.TypUctovaniPohybu.Hromadne, Gordic.Fuc.Interface.TypUctovaniPohybu.Kumulovane], rows: data })
                    //                    .get()
                    //                    .then(function (pov) {
                    //                        if (pov) {
                    //                            that.PovolenoUctovaniJednotlive = pov["Jednotlive"] === true;
                    //                            that.PovolenoUctovaniHromadne = pov["Hromadne"] === true;
                    //                            that.PovolenoUctovaniKumulovane = pov["Kumulovane"] === true;
                    //                        }
                    //                        return data;
                    //                    });
                    //            }
                    //            //return $.when.apply(null, promises).then(() => {
                    //            //    // nastavení stavu typů účtování
                    //            //    //if (!that.PevTypUctAno) {
                    //            //    //    let radioTypUct = that.findFields("typ_uctovani").gradio("option");
                    //            //    //    radioTypUct.radios[0].disabled = !that.PovolenoUctovaniJednotlive;
                    //            //    //    radioTypUct.radios[1].disabled = !that.PovolenoUctovaniHromadne;
                    //            //    //    radioTypUct.radios[2].disabled = !that.PovolenoUctovaniKumulovane;
                    //            //    //    that.findFields("typ_uctovani").gradio("destroy").gradio(radioTypUct).gfield("model", "apply", { typ_uctovani: that.TypUctovani });
                    //            //    //}
                    //            //    return returnObj;
                    //            //});
                    //        })
                    //        // TODO: dořešit správný typ - oprava kvůli padlému BS v sudé
                    //        .then(function (data: Fuc.Interface.GPohybDto[]) {
                    //            // kontrola pevného typu účtování
                    //            // TODO: doplnit
                    //            if ((that.PevTypUctAno === true)
                    //                && (!((that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Jednotlive && that.PovolenoUctovaniJednotlive)
                    //                    || (that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Hromadne && that.PovolenoUctovaniHromadne)
                    //                    || (that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Kumulovane && that.PovolenoUctovaniKumulovane)))) {
                    //                that.TextChyby = "Požadovaný typ účtování není povolen";
                    //                //that.TextChyby = "Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 01. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 02. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 03. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 04. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 05. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 06. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 07. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 08. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 09. Tohle je příklad dlooooouhého textu, který se rozděluje do čtyř sloupců a pak se to zase skládá 10. ";
                    //                return that.dialogs.error("jres:24100210", that.TextChyby) //RC 24100210 : Účtování
                    //                    .createDialogPromise(() => false);
                    //            }
                    //            else {
                    //                return data;
                    //            }
                    //        });
                }
                /**
                 * Volání serverové metody pro obsluhu fáze účtování s ošetřením dotazu na přečerpání
                 *
                 * @param {number} [explFaze] nová fáze účtování
                 * @param {number} [explPredchoziFaze] původní fáze účtování
                 * @param {boolean} [povolitPrerpani] povolit přečerpání?
                 * @param {boolean} [zachNeautomaticke] zachoval poloautomatické a ruční zápisy?
                 * @returns {JQuery.Promise<any>} promise
                 */
                uctovaniWizard(explFaze, explPredchoziFaze, povolitPrerpani, zachNeautomaticke) {
                    // TODO: doplnit komentáře promměných metody
                    // TODO: změnit pořadí vstupních parametrů (přečerpání až za fáze)
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
                    let faze = (explFaze != null ? explFaze : that.Faze);
                    let predchoziFaze = (explPredchoziFaze != null ? explPredchoziFaze : that.PredchoziFaze);
                    let typUctovani = that.TypUctovani ?? Gordic.Fuc.Globals.Enums.TypUct.Jednotlive;
                    this.beginOperation(this.getTextFaze(explFaze));
                    // TODO: předávat seznam pohybů?
                    return that.isl.FinPohyb.uctujPresWizard({
                        ikc: that.Ikc,
                        ixsHuf: that.IxsHuf,
                        fazeUctovani: faze,
                        minulaFazeUctovani: predchoziFaze,
                        typUctovani: typUctovani,
                        kumulaceZaIxp: that.KumulovatZaIxp,
                        vyrovnanost: that.VyrovnatZaNks,
                        bezKontrolyPrecerpani: (povolitPrerpani != null ? povolitPrerpani : that.NekontrolovatPrecerpani),
                        zachovatRucniZapisy: (zachNeautomaticke != null ? zachNeautomaticke : true),
                        eUcetnictvi: that.EUcetnictvi,
                        ixsFunOozuUct: that.ixsFunOozuUct,
                        ixpDenUct: that.ixpDenUct
                    })
                        .use(WebClient.FucUtils.repeatOnException((excInfo) => {
                        if (excInfo?.data?.veta != null && excInfo?.data?.veta != "") {
                            // jde o chybu na rozvrh, věta bude převena na podobu filtrů pro případné zobrazení pohybů
                            // TODO: převést větu do struktury filtrů
                            that.FiltryPohybu1["zap_veta"] = [{ cfu: {} }];
                            let slova = excInfo.data.veta.split("|");
                            let pocetSlov = slova.length;
                            let i = 0;
                            this.dataSentence?.allSortedDataWords?.forEach((word) => {
                                if (i < pocetSlov && word?.Pouziti === 1 && word?.DbNazev) {
                                    that.FiltryPohybu1.zap_veta[0].cfu[word.DbNazev] = {
                                        start: slova[i],
                                        end: slova[i]
                                    };
                                    i++;
                                }
                            });
                            that.FiltryPohybu1["zap_veta_txt"] = excInfo?.data?.veta;
                        }
                        if (excInfo?.data?.precerpani && that.MoznostPrecerpani) {
                            // obsluha přečerpání
                            excInfo.handled = true;
                            return that.dialogs.confirm(WebClient.FucUtils.getExcInfoMessage(excInfo, true), 600)
                                .createDialogPromise(GDlg.mbbYes.id)
                                .then(() => { that.ZauctovanoBezPrecerpani = false; return { bezKontrolyPrecerpani: true }; });
                        }
                        else
                            return $.Deferred().reject(excInfo).promise();
                    }))
                        .get()
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Naplnění gridu seznamu pohybů v prvním kroku průvodce
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                loadPohyby0() {
                    let that = this;
                    // filtry
                    let filters = { duct_ano: 0, duct_ikc: that.Ikc /*, s_upo: Gordic.Fuc.Globals.Enums.SUpo.Nezauctovany, s_sto: Gordic.Fuc.Globals.Enums.SSto.Nestornovano*/ };
                    if (this.Faze > 1)
                        $.extend(filters, { duct_uncheck: 0 });
                    // načtení dat
                    that.beginOperation("jres:24100480"); //RC 24100480 : Probíhá načtení pohybů
                    return that.isl.FinPohyb.list(rq => {
                        return {
                            filters: filters,
                            fragments: WebClient.FucWizard.getFragmentsFromGridColumns(that.$grid0Pohyby.ggrid("trueColumns"), true)
                        };
                    })
                        .getData()
                        //.then(function (data) {
                        //    // úprava dat
                        //    return that.isl.FinPohyb.zkontrolujPredUctovanim(
                        //        {
                        //            ikc: that.Ikc,
                        //            rows: data,
                        //            //aktualizovatDuct: true,
                        //            typ_uctovani: that.PredchoziFaze === -1 ? 0/*null*/ : ((that.TypUctovani ?? Gordic.Fuc.Globals.Enums.TypUct.Jednotlive) as number)
                        //        }
                        //    )
                        //        .get()
                        //        .then(function (ret) {
                        //            data = data!.map(data => {
                        //                let res = ret.result.find(i => { return (data.ixp_upr === i.data.ixp_upr && data.radek_upo === i.data.radek_upo) });
                        //                if (res) {
                        //                    data = $.extend(
                        //                        true,
                        //                        data,
                        //                        {
                        //                            duct_txt_err: res.errors?.reduce((acc, curr) => { return acc + curr.message + " "; }, ""),
                        //                            duct_kind: res.kind,
                        //                            duct_check: res.kind === Gordic.Isl.GOperationResultKind.Success || res.kind === Gordic.Isl.GOperationResultKind.Warning
                        //                        }
                        //                    );
                        //                }
                        //                return data;
                        //            });
                        //            return data;
                        //        })
                        //})
                        .then(function (data) {
                        data = data?.map(d => {
                            if (d.duct_check == null) {
                                d["duct_check"] = d.duct_kind === 200 /* Gordic.Isl.GOperationResultKind.Success */ || d.duct_kind === 206 /* Gordic.Isl.GOperationResultKind.Warning */;
                            }
                            //if (d.duct_uncheck === 1) {
                            //    d["duct_check"] = false;
                            //}
                            //else if (d.duct_uncheck === 0) {
                            //    d["duct_check"] = true;
                            //}
                            //else {
                            //    d["duct_check"] = d.duct_kind === Gordic.Isl.GOperationResultKind.Success || d.duct_kind === Gordic.Isl.GOperationResultKind.Warning;
                            //}
                            return d;
                        });
                        //data = data!.map(data => {
                        //    let res = ret.result.find(i => { return (data.ixp_upr === i.data.ixp_upr && data.radek_upo === i.data.radek_upo) });
                        //    if (res) {
                        //        data = $.extend(
                        //            true,
                        //            data,
                        //            {
                        //                duct_txt_err: res.errors?.reduce((acc, curr) => { return acc + curr.message + " "; }, ""),
                        //                duct_kind: res.kind,
                        //                duct_check: res.kind === Gordic.Isl.GOperationResultKind.Success || res.kind === Gordic.Isl.GOperationResultKind.Warning
                        //            }
                        //        );
                        //    }
                        //    return data;
                        //});
                        return data;
                    })
                        .then(function (data) {
                        // počty záznamů
                        WebClient.FucWizard.refreshKPIPanel(that.kpiPanel, data);
                        // pohled
                        let view = new Gordic.Data.View(data, { key: "ixp_upr,radek_upo" });
                        // nastavení dat a překreslení gridu
                        that.$grid0Pohyby.ggrid("setData", view);
                        return;
                    })
                        .done(function () {
                        that.enable();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Fáze 1 - zápisy pohybů
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                loadPohyby1() {
                    let that = this;
                    // TODO: používat texty ve všech fázích nebo to zrušit?
                    //that.beginOperation(this.getTextFaze());
                    that.beginOperation("jres:24100480"); //RC 24100480 : Probíhá načtení pohybů
                    //return $.Deferred().resolve().promise()
                    //.then(function () {
                    //    // kontrola pohybů k účtování
                    //    // příprava účtování nebo jen aktualizace seznamu
                    //    if (jenSeznam === true) return;
                    //    else {
                    //        // obsluha fáze
                    //        return that.uctovaniWizard();
                    //        //that.call<void>("PripravaFaze1")
                    //        //    .done(function () {
                    //        //        // TODO: zpracovávat výsledek?
                    //        //        def.resolve();
                    //        //    });
                    //        // TODO: zpracovávat chyby?
                    //        // další příprava už bude jednodušší
                    //        //that.pripravaPrvni = false;
                    //    }
                    //})
                    //.then(function () {
                    // seznam pohybů
                    let filters = $.extend(true, { duct_ano: 0, duct_ikc: that.Ikc, duct_uncheck: 0, s_upo: Gordic.Fuc.Globals.Enums.SUpo.VUctovani }, this.FiltryPohybu1);
                    that.actions.actFiltrPohybu.checked(that.FiltryPohybu1.zap_se_zapisy === true || that.FiltryPohybu1.zap_bez_zapisu === true || that.FiltryPohybu1.zap_nevyrovnane_za_nks === true || that.FiltryPohybu1.zap_nevyrovnane_bez_nks === true);
                    return that.isl.FinPohyb.list(rq => {
                        return {
                            filters: filters,
                            fragments: WebClient.FucWizard.getFragmentsFromGridColumns(that.$grid1Pohyby.ggrid("trueColumns"), true)
                        };
                    })
                        .getData()
                        .then(function (data) {
                        // TODO: budou tady zatržítka?
                        /*data.forEach(function (data1) {
                            data1._checked = !(data1.duct_txt_err > " ");
                        });*/
                        // pohled
                        // TODO: doplnit správný klíč podle typu, ale jestli je v případě dokladu vůbec nějaký unikátní primární klíč
                        let view = new Gordic.Data.View(data /*, { key: "ixp_upr,radek_upo" }*/);
                        // nastavení dat a překreslení gridu
                        that.$grid1Pohyby.ggrid("setData", view);
                        // nastavení přístupnosti akce
                        // TODO: podobně udělat další akce na seznamech (např. zobrazení detailu a pod.)
                        //that.actions.prevodAct.enabled(data.length > 0);
                        //that.enable();
                        return;
                    })
                        .done(function () {
                        // ukončení
                        // TODO: je tady potřeba něco dělat? asi zaškrtnutí záznamů, která jsou bez chyby
                        // nastavení přístupnosti akce
                        that.enable();
                        //})
                        //.always(function () {
                        //    that.endOperation();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Fáze 2 - načtení seznamu připravených dokladů
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                loadDoklady2() {
                    let that = this;
                    that.beginOperation("jres:24100479"); //RC 24100479 : Probíhá načtení dokladů
                    return that.isl.Zapis.listDokladu(rq => { return { filters: { v_uctovani: 0, typ_uctovani: that.TypUctovani, ikc: that.Ikc } }; })
                        .getData()
                        .done(function (data) {
                        // pohled
                        // TODO: doplnit správný klíč podle typu, ale jestli je v případě dokladu vůbec nějaký unikátní primární klíč
                        let view = new Gordic.Data.View(data /*, { key: "ixp_upr,radek_upo" }*/);
                        // nastavení dat a překreslení gridu
                        that.$grid2Doklady.ggrid("setData", view);
                        // nastavení přístupnosti akce
                        // TODO: podobně udělat další akce na seznamech (např. zobrazení detailu a pod.)
                        //that.actions.prevodAct.enabled(data.length > 0);
                        //that.enable();
                        return;
                        //})
                    })
                        .done(function () {
                        // ukončení
                        // TODO: je tady potřeba něco dělat? asi zaškrtnutí záznamů, která jsou bez chyby
                        // nastavení přístupnosti akce
                        that.enable();
                        //})
                        //.always(function () {
                        //    that.endOperation();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Fáze 3 - načtení seznamu výsledných dokladů o zaúčtování
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                loadDoklady3() {
                    let that = this;
                    that.beginOperation("jres:24100479"); //RC 24100479 : Probíhá načtení dokladů
                    return that.isl.Zapis.listDokladu(rq => { return { filters: { typ_uctovani: that.TypUctovani, ikc: that.Ikc } }; })
                        .getData()
                        .done(function (data) {
                        // pohled
                        // TODO: doplnit správný klíč podle typu, ale jestli je v případě dokladu vůbec nějaký unikátní primární klíč
                        let view = new Gordic.Data.View(data /*, { key: "ixp_upr,radek_upo" }*/);
                        // nastavení dat a překreslení gridu
                        that.$grid3Doklady.ggrid("setData", view);
                        // nastavení přístupnosti akce
                        // TODO: podobně udělat další akce na seznamech (např. zobrazení detailu a pod.)
                        //that.actions.prevodAct.enabled(data.length > 0);
                        //that.enable();
                        return;
                        //})
                    })
                        .done(function () {
                        // ukončení
                        // TODO: je tady potřeba něco dělat? asi zaškrtnutí záznamů, která jsou bez chyby
                        // nastavení přístupnosti akce
                        that.enable();
                        //})
                        //.always(function () {
                        //    that.endOperation();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Naplnění seznamu zápisů k pohybu nebo dokladu
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                loadZapisy() {
                    let that = this;
                    // načtení dat do gridu zápisů
                    // TODO: nejsou špatně DTO ve volání metod?
                    if (this.Faze === 1) {
                        let aktHlavickaP = Gordic.Eko.Grid.currentRow(this.$grid1Pohyby);
                        if (aktHlavickaP !== null) {
                            return that.isl.Zapis.list(rq => {
                                return {
                                    filters: {
                                        z_pohybu: 0,
                                        v_uctovani: 0,
                                        typ_uctovani: that.TypUctovani,
                                        dok_ixp_upr: aktHlavickaP.ixp_upr,
                                        dok_radek_upo: aktHlavickaP.radek_upo
                                    }
                                };
                            })
                                .getData()
                                .then(function (data) {
                                //FucGrid.Zapis.modifyDto(data)
                                //    .done(function (data) {
                                // TODO: doplnit správný klíč podle typu, ale jestli je v případě dokladu vůbec nějaký unikátní primární klíč
                                let view = new Gordic.Data.View(data, { key: "ixp_upr,radek_upo,radek_zap" });
                                // nastavení dat a překreslení gridu
                                that.$grid1ZapisyPohybu?.ggrid("setData", view);
                                return;
                                //})
                            })
                                .done(function (data) {
                                // nastavení přístupnosti akce
                                // TODO: podobně udělat další akce na seznamech (např. zobrazení detailu a pod.)
                                //that.actions.prevodAct.enabled(data.length > 0);
                                that.enable();
                            });
                        }
                        else {
                            // prázdný grid
                            let view = new Gordic.Data.View([], { key: "ixp_upr,radek_upo,radek_zap" });
                            // nastavení dat a překreslení gridu
                            that.$grid1ZapisyPohybu?.ggrid("setData", view);
                            return $.Deferred().resolve().promise();
                        }
                    }
                    else if (this.Faze === 2 || this.Faze === 3) {
                        let aktHlavickaD = Gordic.Eko.Grid.currentRow(this.Faze == 2 ? this.$grid2Doklady : this.$grid3Doklady);
                        if (aktHlavickaD !== null) {
                            let filters = { typ_uctovani: that.TypUctovani };
                            if (this.Faze === 2) {
                                filters = $.extend(filters, {
                                    v_uctovani: 0,
                                    ikc: that.Ikc
                                });
                                // s "===" to nefunguje, protože v that.TypUctovani je číslo jako string
                                if (that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Jednotlive) {
                                    filters = $.extend(filters, {
                                        dok_ixp_upr: aktHlavickaD.ixp_upr,
                                        dok_radek_upo: aktHlavickaD.radek_upo
                                    });
                                }
                                else {
                                    filters = $.extend(filters, {
                                        dok_rok: aktHlavickaD.rok,
                                        dok_mesic: aktHlavickaD.mesic,
                                        dok_den: aktHlavickaD.den,
                                        dok_subrada_duz: aktHlavickaD.subrada_duz,
                                        dok_lic: aktHlavickaD.lic,
                                        dok_ico: aktHlavickaD.ico,
                                        dok_ucs: aktHlavickaD.ucs,
                                        dok_rok_dph: aktHlavickaD.rok_dph,
                                        dok_mesic_dph: aktHlavickaD.mesic_dph,
                                        dok_uus: aktHlavickaD.uus,
                                        dok_drd: aktHlavickaD.drd,
                                        dok_ixp_upr: aktHlavickaD.ixp_upr,
                                        dok_ixs_esu: aktHlavickaD.ixs_esu,
                                        dok_radek_pde: aktHlavickaD.radek_pde,
                                        dok_ixp_soup: aktHlavickaD.ixp_soup
                                    });
                                }
                            }
                            else {
                                filters = $.extend(filters, {
                                    dok_rok: aktHlavickaD.rok,
                                    dok_lic: aktHlavickaD.lic,
                                    dok_ico: aktHlavickaD.ico,
                                    dok_ucs: aktHlavickaD.ucs,
                                    dok_mesic: aktHlavickaD.mesic,
                                    dok_ac: aktHlavickaD.ac
                                });
                            }
                            return that.isl.Zapis.list(rq => { return { filters: filters }; })
                                .getData()
                                .then(function (data) {
                                //FucGrid.Zapis.modifyDto(data)
                                //    .done(function (data) {
                                // TODO: doplnit správný klíč podle typu, ale jestli je v případě dokladu vůbec nějaký unikátní primární klíč
                                let view = new Gordic.Data.View(data /*, { key: "ixp_upr,radek_upo" }*/);
                                // nastavení dat a překreslení gridu
                                if (that.Faze === 2)
                                    that.$grid2ZapisyDokladu.ggrid("setData", view);
                                else
                                    that.$grid3ZapisyDokladu.ggrid("setData", view);
                                return;
                            })
                                .done(function (data) {
                                // nastavení přístupnosti akce
                                // TODO: podobně udělat další akce na seznamech (např. zobrazení detailu a pod.)
                                //that.actions.prevodAct.enabled(data.length > 0);
                                that.enable();
                                //})
                            });
                        }
                        else {
                            // prázdný grid
                            // TODO: doplnit správný klíč podle typu, ale jestli je v případě dokladu vůbec nějaký unikátní primární klíč
                            let view = new Gordic.Data.View([] /*, { key: "ixp_upr,radek_upo" }*/);
                            // nastavení dat a překreslení gridu
                            if (that.Faze === 2)
                                that.$grid2ZapisyDokladu.ggrid("setData", view);
                            else
                                that.$grid3ZapisyDokladu.ggrid("setData", view);
                            return $.Deferred().resolve().promise();
                        }
                    }
                    return $.Deferred().reject().promise();
                }
                /**
                 * Zobrazení detailu pohybu (ve fázi 1 průvodce)
                 *
                 * @param {boolean} oprava spuštění detailu do režimu opravy (true = ano, false = ne)
                 * @returns {JQueryPromise<void>} promise
                 */
                detailPohybu(oprava) {
                    let that = this;
                    // TODO: je potřeba řešit omezenou funkčnost v detailu, aby nebylo možné zaúčtovat pohyb, když jsem v účtování?
                    // aktuální vybraná položka
                    let aktRadek = Gordic.Eko.Grid.currentRow(this.Faze === 0 ? this.$grid0Pohyby : this.$grid1Pohyby);
                    if (aktRadek !== null) {
                        // TODO: dodělat úpravy kolem aktivní operace na detailu (viz ostatní seznamy)
                        // zásobník změněných záznamů
                        let changedRows = [];
                        // otevření detailu
                        let $detailWindow = this.navigate(["Gordic.Fuc.WebClient.GDetailPohybu", { gridRemoteControl: new Gordic.Components.GridRC(this.Faze === 0 ? this.$grid0Pohyby : this.$grid1Pohyby) }], {
                            ID: 'DetailPohybu#',
                            IxpUpr: aktRadek.ixp_upr,
                            RadekUpo: aktRadek.radek_upo,
                            OtevritJakoOpravu: oprava
                        });
                        // obsluha aktivní operace na detailu
                        $.content($detailWindow).on(WebClient.FucDetail.triggerChange, (retVal) => {
                            if (retVal?.data?.ixp_upr && retVal?.data?.radek_upo) {
                                // přidání do seznamu záznamů k občerstvení
                                if (changedRows.findIndex(item => item.ixp_upr === retVal.data.ixp_upr && item.radek_upo === retVal.data.radek_upo) < 0)
                                    changedRows.push({ ixp_upr: retVal.data.ixp_upr, radek_upo: retVal.data.radek_upo });
                            }
                        });
                        // obsluha ukončení okna
                        // TODO: nespouštět akci jen při aktivní operaci? udělat to podle otevření detailu ze seznamu pohybů. také řešit aktualizace seznamu pod tím (aktualizovat řádky při aktivní operaci, ...), jenom tady je to o v jiné třídě
                        $detailWindow.on("closed", (retVal) => {
                            const $grid = (that.Faze === 0 ? that.$grid0Pohyby : that.$grid1Pohyby);
                            // nastavení fokusu
                            $grid.ggrid("focus");
                            // aktualizace změněných záznamů (v hlavním seznamu i případně v průvodci)
                            if (changedRows?.length > 0) {
                                let arIxpUpr = changedRows.map(item => item.ixp_upr);
                                let arRadekUpo = changedRows.map(item => item.radek_upo);
                                return that.isl.FinPohyb.list(rq => {
                                    return {
                                        filters: { ixp_upr: arIxpUpr, radek_upo: arRadekUpo },
                                        fragments: WebClient.FucWizard.getFragmentsFromGridColumns($grid.ggrid("trueColumns"), true)
                                    };
                                })
                                    .get()
                                    .done(function (response) {
                                    // TODO: updateData nevrací promise
                                    $grid.ggrid("getView").updateData(response.data, "update");
                                    // TODO: neměly by vracet promise?
                                    if (that.Faze === 0) {
                                        that.kontrolaPredUctovanim();
                                    }
                                    else {
                                        // TODO: kontrola dat?
                                        that.uctovaniWizard()
                                            .done(function () {
                                            return that.loadPohyby1()
                                                .then(function () {
                                                return that.loadZapisy();
                                            });
                                        });
                                    }
                                });
                            }
                        });
                        return $detailWindow.createDialogPromise();
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Pořízení nového zápisu pohybu
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                novyZapis() {
                    let that = this;
                    // editace aktuálního zápisu
                    if (this.Faze === 1) {
                        let aktHlavicka = Gordic.Eko.Grid.currentRow(this.$grid1Pohyby);
                        if (aktHlavicka !== null) {
                            // zjištění nového čísla řádku zápisu
                            let novyRadekZap = this.maxRadekZap() + 1;
                            // defaultní hodnoty (z případu/pohybu) a nový radek_zap
                            let dto = {
                                novy_zapis: true,
                                ixp_upr: aktHlavicka.ixp_upr,
                                radek_upo: aktHlavicka.radek_upo,
                                radek_zap: novyRadekZap,
                                ico: aktHlavicka.ico,
                                ucs: aktHlavicka.ucs,
                                uus: aktHlavicka.uus,
                                nks: aktHlavicka.nks,
                                rok: aktHlavicka.rok
                            };
                            // spuštění editace nového řádku
                            this.$grid1ZapisyPohybu?.ggridroweditor("addRow", dto);
                            return $.Deferred().resolve().promise();
                        }
                    }
                    return $.Deferred().reject().promise();
                }
                /**
                 * Editace aktuálního zápisu pohybu
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                editaceZapisu() {
                    let that = this;
                    // editace aktuálního zápisu
                    if (this.Faze === 1) {
                        // spuštění editace označeného řádku
                        this.$grid1ZapisyPohybu?.ggridroweditor("start");
                        return $.Deferred().resolve().promise();
                    }
                    return $.Deferred().reject().promise();
                }
                /**
                 * Uložení rozeditovaného zápisu pohybu
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                ulozeniZapisu(insert, dto) {
                    // uložení rozeditovaného zápisu
                    if (this.Faze === 1) {
                        //return that.call<Gordic.Fuc.Interface.GZapisDto>("UlozZapis", { insert: insert, dto: dto });
                        return this.isl.Zapis.upsert({ insert: insert, data: dto })
                            .get()
                            .then(function () {
                            // TODO: upravit metodu, aby vracela aktuální hodnoty (např. s vyplněným radek_zap)?
                            return dto;
                        });
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        return $.Deferred().resolve(dto).promise();
                    }
                }
                /**
                 * Odstranění existujícího zápisu pohybu
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                odstraneniZapisu() {
                    // odstranění aktuálního zápisu
                    if (this.Faze === 1) {
                        // jen v režimu zobrazení pohybů
                        let aktPohyb = Gordic.Eko.Grid.currentRow(this.$grid1Pohyby);
                        let aktZapis = this.$grid1ZapisyPohybu ? Gordic.Eko.Grid.currentRow(this.$grid1ZapisyPohybu) : null;
                        if (aktPohyb != null && aktZapis != null) {
                            // TODO: dodělat - bude to volání serverové metody
                            return $.Deferred().resolve().promise();
                        }
                    }
                    return $.Deferred().reject().promise();
                }
                /**
                 * Zjištění maximálního čísla řádku zápisu
                 *
                 * @returns {number} maximální číslo řádku zápisu (0 pokud žádný neexistuje)
                 */
                maxRadekZap() {
                    // cykl přes všechny existující zápisy
                    let maxRadek = 0;
                    if (this.$grid1ZapisyPohybu) {
                        let data = this.$grid1ZapisyPohybu.ggrid("getView").getDataRows(true, "view");
                        for (let i = 0, l = data.length; i < l; i++) {
                            maxRadek = Math.max(maxRadek, data[i].data.radek_zap);
                        }
                    }
                    return maxRadek;
                }
                /**
                 * Uložení / zobrazení dokladu o zaúčtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                dokladOZauctovani() {
                    let aktDoklad = Gordic.Eko.Grid.currentRow(this.$grid3Doklady);
                    if (aktDoklad) {
                        // uložení/otevření souboru
                        return WebClient.FucDetail.dokladOZauctovani(this, null /*aktDoklad?.ixb_dzu*/, aktDoklad?.rok, aktDoklad?.lic, aktDoklad?.ico, aktDoklad?.ucs, aktDoklad?.mesic, aktDoklad?.ac);
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Uložení informací o aktuálním (do kterého se vstupuje) kroku
                 *
                 * @param {OGWizardChange} change informace o kroku průvodce
                 * @param {boolean} [onlySetStepsEnable] pouze nastavit kroky (nenastavovat proměnné pro fázi)
                 */
                saveStepInfo(wizard, change, onlySetStepsEnable) {
                    // TODO: otestovat jak se chová při chybě z motorů a při přečerpání
                    // krok, do kterého vstupujeme, je buď v change.task.nextStep nebo v change.activeStep
                    let actStep = (typeof change.task.nextStep === "undefined" ? change.activeStep : change.task.nextStep);
                    if ((actStep >= 0) && (actStep <= 3)) {
                        // informace o předchozím a aktuálním kroku
                        if (onlySetStepsEnable === true) {
                        }
                        else {
                            this.PredchoziFaze = this.Faze;
                            this.Faze = actStep;
                        }
                        if (wizard) {
                            for (let i = 0; i <= 3; i++) {
                                // přístupný je standardně aktuální, předchozí a následující krok
                                if (i === actStep)
                                    change.stepsEnable[i] = true;
                                else if ((i === actStep - 1) && (actStep < 3))
                                    change.stepsEnable[i] = true;
                                else if (i === actStep + 1)
                                    change.stepsEnable[i] = true;
                                // přístupný je i rychlý přechod 0 -> 2 a 0 -> 3 a 1 -> 3
                                else if (actStep === 0 && (i === 2 || i === 3))
                                    change.stepsEnable[i] = true;
                                else if (actStep === 1 && i === 3)
                                    change.stepsEnable[i] = true;
                                // přístupný je i rychlý přechod 2 -> 0
                                else if (actStep === 2 && i === 0)
                                    change.stepsEnable[i] = true;
                                else
                                    change.stepsEnable[i] = false;
                            }
                        }
                        if (wizard) {
                            let wizSteps = [];
                            change.stepsEnable.forEach((val, index) => { wizSteps.push({ enabled: val, index: index }); });
                            wizard.enableStep(this, wizSteps, actStep === 3 ? { back: { enabled: false } } : undefined);
                        }
                    }
                }
                /**
                 * Vytvoření formuláře s parametry účtování včetně naplnění hodnot
                 *
                 * @param {JQuery<HTMLElement>} contentDiv content
                 * @param {number} step aktuální krok
                 */
                createFormParametry(contentDiv, step) {
                    let that = this;
                    // definice formuláře
                    let $tabParametry = $.newDiv().appendTo(contentDiv).gtab({ title: "Parametry účtování", opened: true /*, locked: true*/ });
                    let formParametry = new Gordic.Forms.Form({ name: "wizParams" /*, layoutDescriptor: "L1M1S1, L-3-7-2, M-3-7-2, S-12-12-0"*/ }).addSection();
                    // společné parametry
                    let typUctRadios = [];
                    //if (that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Jednotlive || (step === 0 && !that.PevTypUctAno)) {
                    //    typUctRadios.push({ value: Gordic.Fuc.Globals.Enums.TypUct.Jednotlive, label: "jres:24100155", disabled: false/*!that.PovolenoUctovaniJednotlive*/ }); //RC 24100155 : jednotlivě (bez kumulace na úrovni dokladů a zápisů)
                    //}
                    //else if (step === 0 && !that.PevTypUctAno) {
                    //    typUctRadios.push({ value: Gordic.Fuc.Globals.Enums.TypUct.Jednotlive, label: "jres:24100155", disabled: false/*!that.PovolenoUctovaniJednotlive*/ }); //RC 24100155 : jednotlivě (bez kumulace na úrovni dokladů a zápisů)
                    //}
                    if ((step === 0 && !that.PevTypUctAno) || that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Jednotlive)
                        typUctRadios.push({ value: Gordic.Fuc.Globals.Enums.TypUct.Jednotlive, label: "jres:24100155", disabled: false /*!that.PovolenoUctovaniJednotlive*/ }); //RC 24100155 : jednotlivě (bez kumulace na úrovni dokladů a zápisů)
                    if ((step === 0 && !that.PevTypUctAno) || that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Hromadne)
                        typUctRadios.push({ value: Gordic.Fuc.Globals.Enums.TypUct.Hromadne, label: "jres:24100156", disabled: false /*!that.PovolenoUctovaniHromadne*/ }); //RC 24100156 : hromadně (s kumulací na úrovni dokladů, ale bez kumulace na úrovni zápisů)
                    if ((step === 0 && !that.PevTypUctAno) || that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Kumulovane)
                        typUctRadios.push({ value: Gordic.Fuc.Globals.Enums.TypUct.Kumulovane, label: "jres:24100157", disabled: false /*!that.PovolenoUctovaniKumulovane*/ }); //RC 24100157 : kumulovaně (s kumulací na úrovni dokladů i zápisů)
                    //if (step === 0 || that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Jednotlive) typUctRadios.push({ value: Gordic.Fuc.Globals.Enums.TypUct.Jednotlive, label: "jres:24100155", disabled: false/*!that.PovolenoUctovaniJednotlive*/ }); //RC 24100155 : jednotlivě (bez kumulace na úrovni dokladů a zápisů)
                    //if (step === 0 || that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Hromadne) typUctRadios.push({ value: Gordic.Fuc.Globals.Enums.TypUct.Hromadne, label: "jres:24100156", disabled: false/*!that.PovolenoUctovaniHromadne*/ }); //RC 24100156 : hromadně (s kumulací na úrovni dokladů, ale bez kumulace na úrovni zápisů)
                    //if (step === 0 || that.TypUctovani == Gordic.Fuc.Globals.Enums.TypUct.Kumulovane) typUctRadios.push({ value: Gordic.Fuc.Globals.Enums.TypUct.Kumulovane, label: "jres:24100157", disabled: false/*!that.PovolenoUctovaniKumulovane*/ }); //RC 24100157 : kumulovaně (s kumulací na úrovni dokladů i zápisů)
                    formParametry.addRow("Typ účtování").addField("gradio", {
                        name: "typ_uctovani",
                        radios: typUctRadios,
                        itemClass: "w-12",
                        // TODO: proč nefunguje validátor na povinnost?
                        validators: [new Gordic.Validators.Required()],
                        //smartNavNextElement: that.TestEUcetnictvi ? undefined : function (cur, next) { return $.content(this)?.element.find("button[data-param-id='actKontrola']")[0]; }
                    });
                    // speciální pro e-účetnictví
                    if (that.TestEUcetnictvi) {
                        let typCil = [];
                        if (step === 0 || that.EUcetnictvi === false)
                            typCil.push({ value: false, label: "Účetní deník" });
                        if (step === 0 || that.EUcetnictvi === true)
                            typCil.push({ value: true, label: "Agenda UCT" });
                        formParametry
                            .addRow("Cíl").addField("gradio", {
                            name: "e_ucetnictvi",
                            emptyValue: false,
                            radios: typCil,
                            itemClass: "w-12",
                            change: function (ev, changeObj) {
                                let newValue;
                                newValue = (changeObj.value === true || String(changeObj.value) === "true");
                                contentDiv.findFields("ixs_fun_oozu_uct", "ixp_den_uct").gfield("option", "disabled", !newValue);
                            }
                        });
                        if (step === 0 || that.EUcetnictvi === true) {
                            formParametry
                                .addRow("OOZU").addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                                disabled: true,
                                name: "ixs_fun_oozu_uct",
                                model: "ixs_fun_oozu_uct=ixs_fun"
                            })
                                .addRow("Kniha UCT").addField("gselectbox", Gordic.Prefabs.Select.uctsden(), {
                                disabled: true,
                                name: "ixp_den_uct",
                                model: "ixp_den_uct=ixp_den",
                                serverFilters: { rok: that.Rok },
                                //smartNavNextElement: !that.TestEUcetnictvi ? undefined : function (cur, next) { return $.content(this)?.element.find("button[data-param-id='actKontrola']")[0]; }
                            });
                        }
                    }
                    formParametry.addRow("Poznámka").addField("gstringbox", {
                        name: "poznamka",
                        // TODO: dořešit fokusy z parametrů průvodců - jestli na první tlačítko na liště nebo na spodní na přechod na další krok nebo jestli to řešit podle toho, je-li nutné pouštět kontrolu manuálně?
                        // TODO: nefunguje to? neumí to skok na spodní lištu, asi už to je mimo content
                        //smartNavNextElement: function (cur, next) { return $.content(this)?. parentContent? .element.find("button[data-param-id='actZauctovatOdlozene']")[0]; }
                        smartNavNextElement: function (cur, next) { return $.content(this)?.element.find("button[data-param-id='actKontrola']")[0]; }
                    });
                    formParametry.appendTo($tabParametry);
                    // parametry jsou editovatelné pouze v prvním kroku
                    // TODO: jako poznámka by se měly chovat i údaje týkající se e-účetnictví, ne?
                    if (step > 0)
                        $tabParametry.findFields().gfield("option", "disabled", true);
                    else if (that.PevTypUctAno)
                        $tabParametry.findFields( /*"typ_uctovani", "e_ucetnictvi", "ixs_fun_oozu_uct", "ixp_den_uct"*/).not($tabParametry.findFields("poznamka")).gfield("option", "disabled", true);
                    // nastavení hodnot
                    contentDiv.findFields().gfield("model", "apply", {
                        typ_uctovani: that.TypUctovani,
                        e_ucetnictvi: that.EUcetnictvi,
                        ixs_fun_oozu_uct: that.ixsFunOozuUct,
                        ixp_den_uct: that.ixpDenUct,
                        poznamka: that.poznamka
                    });
                }
                /**
                 * Kontrola vstupních parametrů (při opuštění prvního kroku) včetně uložení vybraných pohybů
                 *
                 * @param {any} cnt content
                 * @returns {JQueryPromise<boolean>} výsledek kontroly
                 */
                checkParametersAndSaveCheck(cnt) {
                    let that = this;
                    if (that.Faze > 0)
                        return $.Deferred().resolve(true).promise();
                    // sebrání zadaných parametrů
                    let dtoParam = {
                        typ_uctovani: null,
                        e_ucetnictvi: null,
                        ixs_fun_oozu_uct: null,
                        ixp_den_uct: null,
                        poznamka: null
                    };
                    this.element.findFields().gfield("model", "collect", dtoParam);
                    if (dtoParam.typ_uctovani !== null)
                        this.TypUctovani = dtoParam.typ_uctovani;
                    if (this.TestEUcetnictvi) {
                        this.EUcetnictvi = dtoParam.e_ucetnictvi;
                        this.ixsFunOozuUct = dtoParam.ixs_fun_oozu_uct;
                        this.ixpDenUct = dtoParam.ixp_den_uct;
                    }
                    if (dtoParam.poznamka != null)
                        this.poznamka = dtoParam.poznamka;
                    // kontroly
                    // kontrola povoleného typu účtování
                    if (this.TypUctovani !== Gordic.Fuc.Globals.Enums.TypUct.Jednotlive && this.TypUctovani !== Gordic.Fuc.Globals.Enums.TypUct.Hromadne && this.TypUctovani !== Gordic.Fuc.Globals.Enums.TypUct.Kumulovane) {
                        // zobrazení chyby ve flashi
                        WebClient.FucWizard.showErrorFlash("jres:24100514", cnt); //RC 24100514 : Není vybrán typ účtování
                        return $.Deferred().resolve(false).promise();
                    }
                    else if (!((this.TypUctovani === Gordic.Fuc.Globals.Enums.TypUct.Jednotlive && that.PovolenoUctovaniJednotlive)
                        || (this.TypUctovani === Gordic.Fuc.Globals.Enums.TypUct.Hromadne && that.PovolenoUctovaniHromadne)
                        || (this.TypUctovani === Gordic.Fuc.Globals.Enums.TypUct.Kumulovane && that.PovolenoUctovaniKumulovane))) {
                        // zobrazení chyby ve flashi
                        WebClient.FucWizard.showErrorFlash("jres:24100515", cnt); //RC 24100515 : Nepovolený typ účtování
                        return $.Deferred().resolve(false).promise();
                    }
                    // TODO: doplnit kontrolu hodnot pro e-účetnictví (povinné ixs_fun_oozu_uct a ixp_den_uct)
                    // kontrola zatržení jen bezchybných záznamů
                    let jeChyba = true;
                    let pohybyZaskrtnute = Gordic.Eko.Grid.checkedRows(that.$grid0Pohyby);
                    if (pohybyZaskrtnute != null && pohybyZaskrtnute.length > 0) {
                        jeChyba = pohybyZaskrtnute.findIndex((pohyb) => pohyb?.duct_kind !== 200 /* Gordic.Isl.GOperationResultKind.Success */) >= 0;
                    }
                    if (jeChyba) {
                        // ukončení s chybou 
                        return $.Deferred().resolve(false).promise();
                    }
                    // uložení vybraných pohybů a jejich kontrola
                    // 
                    const pohyby = that.$grid0Pohyby.ggrid("getView").getDataRows().map((row) => { return { ixp_upr: row.ixp_upr, radek_upo: row.radek_upo, duct_check: row.duct_check }; });
                    return that.isl.FinPohyb.zkontrolujPredUctovanimZjednodusene({
                        ikc: that.Ikc,
                        rows: pohyby ?? []
                    })
                        //return that.isl.PomocneFuc.ductUpdateUncheck({
                        //    ikc: that.Ikc,
                        //    zaznamy: pohyby ?? []
                        //})
                        .get()
                        .then(function () {
                        //change.stepsEnable[1] = false;
                        // uložení aktuálního stavu zaškrtnutých záznamů
                        // TODO: dodělat
                        //const pohyby = that.$grid0Pohyby.ggrid("getView").getDataRows();
                        // případné kontrola maximálního počtu pohybů
                        // TODO: musí být obsloužen i dotaz na překročení, pokud je to parametrem povoleno - tohle se ale kontroluje už při startu účtování, takže zde to být nemusí
                        // uložení stavu zatržítek u pohybů a kontrola pohybů a parametrů
                        //let typUctovani: number = that.TypUctovani ?? Gordic.Fuc.Globals.Enums.TypUct.Jednotlive;
                        //return that.kontrolaPredUctovanim(true)
                        //that.isl.FinPohyb.zkontrolujPredUctovanim({
                        //    ikc: that.Ikc,
                        //    rows: pohyby,
                        //    //aktualizovatDuct: true,
                        //    typ_uctovani: typUctovani
                        //})
                        //    .get()
                        //.then(function (/*ret*/) {
                        // kontrola chybných zaškrtnutých pohybů
                        //let jeChyba = true;
                        ////let vsechnyPohyby = true;
                        //// kontrola zatržení jen bezchybných záznamů
                        //let pohybyZaskrtnute = Gordic.Eko.Grid.checkedRows<Gordic.Fuc.Interface.GPohybDto>(that.$grid0Pohyby);
                        //if (pohybyZaskrtnute != null && pohybyZaskrtnute.length > 0) {
                        //    jeChyba = pohybyZaskrtnute.findIndex((pohyb) => pohyb?.duct_kind !== Gordic.Isl.GOperationResultKind.Success) >= 0;
                        //    //if (pohyby.length > pohybyZaskrtnute.length) vsechnyPohyby = false;
                        //}
                        //let jeChyba = ret.result.find(function (element) { return (element.kind !== Gordic.Isl.GOperationResultKind.Success); });
                        //if (change.stepsEnable[1] === false) {
                        //    // TODO: ještě to zkontrolovat a pak něco takového udělat i do ostatních průvodců, protože jinak nezafunguje změna stavů, pokud je nalezena chyba. bude ale potřeba nějak řešit promisy a to i uvnitř volané metody
                        //    that.faze0Kontrola();
                        //}
                        //defClose.resolve(!jeChyba);
                        //if (jeChyba) {
                        //    // ukončení s chybou 
                        //    return $.Deferred().resolve(false).promise();
                        //}
                        //else {
                        // uložení historie
                        // TODO: doplnit i uložení pohybů, pokud nejsou zaškrtnuty všechny
                        //if (vsechnyPohyby) {
                        //return that.isl.FinPohybHistorieUctovani.update({
                        //    ixs_huf: that.IxsHuf,
                        //    stav_uctovani: Globals.Enums.StavUctovaniPohybu.UkoncenaKontrolaPohybu,
                        //    ikc: that.Ikc,
                        //    typ_uct_fuc: that.TypUctovani ?? 0,
                        //    uct_poh: that.UctPoh,
                        //    poznamka: that.poznamka,
                        //    kumul_za_ixp: that.KumulovatZaIxp === true ? 1 : 0,
                        //    priz_vyr_nks: that.VyrovnatZaNks === true ? 1 : 0,
                        //    priz_bez_kontr: that.NekontrolovatPrecerpani === true ? 1 : 0,
                        //    zach_ruc_zapisy: that.ZachovatRucniZapisy === true ? 1 : 0,
                        //    e_ucetnictvi: that.EUcetnictvi === true ? 1 : 0,
                        //    ixs_fun_oozu_uct: that.ixsFunOozuUct,
                        //    ixp_den_uct: that.ixpDenUct
                        //})
                        //    .getData()
                        //    .then(function (data) {
                        //        // ukončení bez chyby
                        //        return true;
                        //    });
                        //}
                        //else {
                        // jsou správně uložena zatržítka?
                        return that.isl.FinPohybHistorieUctovani.updateWithPohyby({
                            ixs_huf: that.IxsHuf,
                            stav_uctovani: Fuc.Globals.Enums.StavUctovaniPohybu.UkoncenaKontrolaPohybu,
                            ikc: that.Ikc,
                            typ_uct_fuc: that.TypUctovani ?? 0,
                            uct_poh: that.UctPoh,
                            poznamka: that.poznamka,
                            kumul_za_ixp: that.KumulovatZaIxp === true ? 1 : 0,
                            priz_vyr_nks: that.VyrovnatZaNks === true ? 1 : 0,
                            priz_bez_kontr: that.NekontrolovatPrecerpani === true ? 1 : 0,
                            zach_ruc_zapisy: that.ZachovatRucniZapisy === true ? 1 : 0,
                            e_ucetnictvi: that.EUcetnictvi === true ? 1 : 0,
                            ixs_fun_oozu_uct: that.ixsFunOozuUct,
                            ixp_den_uct: that.ixpDenUct
                        })
                            .getData()
                            .then(function (data) {
                            // ukončení bez chyby
                            return true;
                        });
                        //}
                        //}
                        //}
                        //else return false;
                    });
                    //else return $.Deferred().resolve(false).promise();
                }
                ///**
                // * Kontrola vstupních parametrů (při opuštění prvního kroku)
                // * 
                // * @param {any} cnt content
                // * @returns {JQueryPromise<boolean>} výsledek kontroly
                // */
                //private checkParameters(cnt): JQueryPromise<boolean> {
                //    let that = this;
                //    // sebrání zadaných parametrů
                //    let dtoParam: {
                //        typ_uctovani: Gordic.Fuc.Globals.Enums.TypUct | null,
                //        e_ucetnictvi: boolean | null,
                //        ixs_fun_oozu_uct: string | null,
                //        ixp_den_uct: string | null,
                //        poznamka: string | null
                //    } = {
                //        typ_uctovani: null,
                //        e_ucetnictvi: null,
                //        ixs_fun_oozu_uct: null,
                //        ixp_den_uct: null,
                //        poznamka: null
                //    };
                //    this.element.findFields().gfield("model", "collect", dtoParam);
                //    if (dtoParam.typ_uctovani !== null) this.TypUctovani = dtoParam.typ_uctovani;
                //    if (this.TestEUcetnictvi) {
                //        this.EUcetnictvi = dtoParam.e_ucetnictvi!;
                //        this.ixsFunOozuUct = dtoParam.ixs_fun_oozu_uct!;
                //        this.ixpDenUct = dtoParam.ixp_den_uct!;
                //    }
                //    if (dtoParam.poznamka != null) this.poznamka = dtoParam.poznamka;
                //    // kontroly
                //    // TODO: doplnit kontrolu hodnot pro e-účetnictví (povinné ixs_fun_oozu_uct a ixp_den_uct)
                //    // kontrola povoleného typu účtování
                //    if (this.TypUctovani !== Gordic.Fuc.Globals.Enums.TypUct.Jednotlive && this.TypUctovani !== Gordic.Fuc.Globals.Enums.TypUct.Hromadne && this.TypUctovani !== Gordic.Fuc.Globals.Enums.TypUct.Kumulovane) {
                //        // zobrazení chyby ve flashi
                //        FucWizard.showErrorFlash("jres:24100514", cnt); //RC 24100514 : Není vybrán typ účtování
                //        return $.Deferred().resolve(false).promise();
                //    }
                //    else if (!((this.TypUctovani === Gordic.Fuc.Globals.Enums.TypUct.Jednotlive && that.PovolenoUctovaniJednotlive)
                //        || (this.TypUctovani === Gordic.Fuc.Globals.Enums.TypUct.Hromadne && that.PovolenoUctovaniHromadne)
                //        || (this.TypUctovani === Gordic.Fuc.Globals.Enums.TypUct.Kumulovane && that.PovolenoUctovaniKumulovane))) {
                //        // zobrazení chyby ve flashi
                //        FucWizard.showErrorFlash("jres:24100515", cnt); //RC 24100515 : Nepovolený typ účtování
                //        return $.Deferred().resolve(false).promise();
                //    }
                //    else if (that.Faze > 0) {
                //        return $.Deferred().resolve(true).promise();
                //    }
                //    else {
                //        let checkedRows = Gordic.Eko.Grid.checkedRows<Gordic.Fuc.Interface.GPohybDto>(that.$grid0Pohyby, true);
                //        if (checkedRows !== null) {
                //            //change.stepsEnable[1] = false;
                //            // uložení aktuálního stavu zaškrtnutých záznamů
                //            // TODO: dodělat
                //            let pohyby = that.$grid0Pohyby.ggrid("getView").getDataRows();
                //            // případné kontrola maximálního počtu pohybů
                //            // TODO: musí být obsloužen i dotaz na překročení, pokud je to parametrem povoleno - tohle se ale kontroluje už při startu účtování, takže zde to být nemusí
                //            // uložení stavu zatržítek u pohybů a kontrola pohybů a parametrů
                //            let typUctovani: number = that.TypUctovani ?? Gordic.Fuc.Globals.Enums.TypUct.Jednotlive;
                //            return that.kontrolaPredUctovanim(true)
                //                //that.isl.FinPohyb.zkontrolujPredUctovanim({
                //                //    ikc: that.Ikc,
                //                //    rows: pohyby,
                //                //    //aktualizovatDuct: true,
                //                //    typ_uctovani: typUctovani
                //                //})
                //                //    .get()
                //                .then(function (/*ret*/) {
                //                    // kontrola chybných zaškrtnutých pohybů
                //                    let jeChyba = true;
                //                    let vsechnyPohyby = true;
                //                    // kontrola zatržení jen bezchybných záznamů
                //                    let pohybyZaskrtnute = Gordic.Eko.Grid.checkedRows<Gordic.Fuc.Interface.GPohybDto>(that.$grid0Pohyby);
                //                    if (pohybyZaskrtnute != null && pohybyZaskrtnute.length > 0) {
                //                        jeChyba = pohybyZaskrtnute.findIndex((pohyb) => pohyb?.duct_kind !== Gordic.Isl.GOperationResultKind.Success) >= 0;
                //                        if (pohyby.length > pohybyZaskrtnute.length) vsechnyPohyby = false;
                //                    }
                //                    //let jeChyba = ret.result.find(function (element) { return (element.kind !== Gordic.Isl.GOperationResultKind.Success); });
                //                    //if (change.stepsEnable[1] === false) {
                //                    //    // TODO: ještě to zkontrolovat a pak něco takového udělat i do ostatních průvodců, protože jinak nezafunguje změna stavů, pokud je nalezena chyba. bude ale potřeba nějak řešit promisy a to i uvnitř volané metody
                //                    //    that.faze0Kontrola();
                //                    //}
                //                    //defClose.resolve(!jeChyba);
                //                    if (jeChyba) {
                //                        // ukončení s chybou 
                //                        return $.Deferred().resolve(false).promise();
                //                    }
                //                    else {
                //                        // uložení historie
                //                        // TODO: doplnit i uložení pohybů, pokud nejsou zaškrtnuty všechny
                //                        if (vsechnyPohyby) return that.isl.FinPohybHistorieUctovani.update({
                //                            ixs_huf: that.IxsHuf,
                //                            stav_uctovani: Globals.Enums.StavUctovaniPohybu.UkoncenaKontrolaPohybu,
                //                            ikc: that.Ikc,
                //                            typ_uct_fuc: that.TypUctovani ?? 0,
                //                            uct_poh: that.UctPoh,
                //                            poznamka: that.poznamka,
                //                            kumul_za_ixp: that.KumulovatZaIxp === true ? 1 : 0,
                //                            priz_vyr_nks: that.VyrovnatZaNks === true ? 1 : 0,
                //                            priz_bez_kontr: that.NekontrolovatPrecerpani === true ? 1 : 0,
                //                            zach_ruc_zapisy: that.ZachovatRucniZapisy === true ? 1 : 0,
                //                            e_ucetnictvi: that.EUcetnictvi === true ? 1 : 0,
                //                            ixs_fun_oozu_uct: that.ixsFunOozuUct,
                //                            ixp_den_uct: that.ixpDenUct
                //                        })
                //                            .getData()
                //                            .then(function (data) {
                //                                // ukončení bez chyby
                //                                return true;
                //                            });
                //                        else return that.isl.FinPohybHistorieUctovani.updateWithPohyby({
                //                            ixs_huf: that.IxsHuf,
                //                            stav_uctovani: Globals.Enums.StavUctovaniPohybu.UkoncenaKontrolaPohybu,
                //                            ikc: that.Ikc,
                //                            typ_uct_fuc: that.TypUctovani ?? 0,
                //                            uct_poh: that.UctPoh,
                //                            poznamka: that.poznamka,
                //                            kumul_za_ixp: that.KumulovatZaIxp === true ? 1 : 0,
                //                            priz_vyr_nks: that.VyrovnatZaNks === true ? 1 : 0,
                //                            priz_bez_kontr: that.NekontrolovatPrecerpani === true ? 1 : 0,
                //                            zach_ruc_zapisy: that.ZachovatRucniZapisy === true ? 1 : 0,
                //                            e_ucetnictvi: that.EUcetnictvi === true ? 1 : 0,
                //                            ixs_fun_oozu_uct: that.ixsFunOozuUct,
                //                            ixp_den_uct: that.ixpDenUct
                //                        })
                //                            .getData()
                //                            .then(function (data) {
                //                                // ukončení bez chyby
                //                                return true;
                //                            });
                //                    }
                //                });
                //        }
                //        else return $.Deferred().resolve(false).promise();
                //    }
                //}
                /**
                 * Zaúčtování zbytku kroků odloženě
                 *
                 * @returns {JQueryPromise<void>} promise
                 */
                zauctovatOdlozene() {
                    let that = this;
                    return $.Deferred().resolve().promise()
                        .then(function () {
                        // kontrola parametrů (pouze pokud jde o první fázi)
                        if (that.Faze === 0) {
                            return that.checkParametersAndSaveCheck(that)
                                .then(function (retVal) {
                                if (retVal === true)
                                    return;
                                else
                                    return $.Deferred().reject();
                            });
                        }
                        else {
                            return;
                        }
                    })
                        .then(function () {
                        // zadání parametrů odloženého účtování
                        let formDef = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1, L-2-10-0, M-2-10-0, S-12-12-0" }).addSection();
                        formDef.addText("jres:24100209"); //RC 24100209 : Opravdu chcete ukončit průvodce a zaúčtovat pohyby odloženě?
                        if (!that.NekontrolovatPrecerpani && that.MoznostPrecerpani === true)
                            formDef.addRow().addRow("Přečerpání").addField("gcheck", { name: "povolit_precerpani", label: "zaúčtovat, i pokud bude při kontrole zjištěno přečerpání rezervovaných prostředků" });
                        return WebClient.FucDetail.simpleFormOkCancel(that, formDef, {}, "jres:24100210", 700, 250) //RC 24100210 : Účtování
                            .createDialogPromise((dialogReturnValue) => { return dialogReturnValue ? true : false; })
                            .then(function (data) {
                            return data.povolit_precerpani;
                        });
                    })
                        .then(function (povolit_precerpani) {
                        // příznak, že průvodce končí odložených účtováním
                        that.OdlozeneUctovani = true;
                        // spuštění asynchronní úlohy
                        Gordic.Async.GTaskManager.start("Gordic.Fuc.Server.GUctovaniAsync", {
                            // TODO: doladit parametry
                            ixsHuf: that.IxsHuf,
                            lpc: that.LogPorCislo,
                            ikc: that.Ikc,
                            fazeUctovani: Gordic.Fuc.Globals.Enums.WizFazeUct.Zauctovani,
                            minulaFazeUctovani: that.Faze,
                            typUctovani: that.TypUctovani,
                            uctPoh: that.UctPoh,
                            poznamka: that.poznamka,
                            kumulaceZaIxp: that.KumulovatZaIxp,
                            vyrovnanost: that.VyrovnatZaNks,
                            bezKontrolyPrecerpani: that.NekontrolovatPrecerpani,
                            povolitPrecerpani: povolit_precerpani,
                            zachovatRucniZapisy: true,
                            eUcetnictvi: that.EUcetnictvi,
                            ixsFunOozuUct: that.ixsFunOozuUct,
                            ixpDenUct: that.ixpDenUct
                        });
                        return;
                    })
                        .then(function () {
                        // ukončení průvodce
                        return that.tryClose();
                    });
                    //// objekt pro předávání hodnot
                    //interface returnObjType {
                    //    zauctovat_odlozene: boolean,
                    //    povolit_precerpani: boolean
                    //};
                    //let returnObj: returnObjType = {
                    //    zauctovat_odlozene: true,
                    //    povolit_precerpani: false,
                    //};
                    //return $.Deferred().resolve(returnObj).promise()
                    //.then(function (returnObj: returnObjType) {
                    //    if (that.Faze === 0) {
                    //        return that.checkParameters(that)
                    //            .then(function (retVal) {
                    //                returnObj.zauctovat_odlozene = retVal;
                    //                return returnObj;
                    //            });
                    //    }
                    //    else {
                    //        return returnObj;
                    //    }
                    //})
                    //    .then(function (returnObj: returnObjType) {
                    //        if (returnObj.zauctovat_odlozene) {
                    //            returnObj.zauctovat_odlozene = false;
                    //            let formDef = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1, L-2-10-0, M-2-10-0, S-12-12-0" }).addSection();
                    //            formDef.addText("jres:24100209"); //RC 24100209 : Opravdu chcete ukončit průvodce a zaúčtovat pohyby odloženě?
                    //            if (!that.NekontrolovatPrecerpani && that.MoznostPrecerpani === true) formDef.addRow().addRow("Přečerpání").addField("gcheck", { name: "povolit_precerpani", label: "zaúčtovat, i pokud bude při kontrole zjištěno přečerpání rezervovaných prostředků" });
                    //            return FucDetail.simpleFormOkCancel(that, formDef, {}, "jres:24100210", 700, 250) //RC 24100210 : Účtování
                    //                .createDialogPromise((dialogReturnValue) => { return dialogReturnValue ? true : false; })
                    //                .then(function (data: {
                    //                    povolit_precerpani: boolean
                    //                }) {
                    //                    returnObj.zauctovat_odlozene = true;
                    //                    returnObj.povolit_precerpani = data.povolit_precerpani;
                    //                    return returnObj;
                    //                }/*,
                    //                    function () {
                    //                        //returnObj.zauctovat_odlozene = false;
                    //                        //def.reject();
                    //                    }*/);
                    //                //.done(function () {
                    //                //    /*if(returnObj.zauctovat_odlozene)*/ def.resolve(returnObj);
                    //                //});
                    //            //    });
                    //            //that.dialogs.confirm("jres:24100210", //RC 24100210 : Účtování
                    //            //    "jres:24100209") //RC 24100209 : Opravdu chcete ukončit průvodce a zaúčtovat pohyby odloženě?
                    //            //    .on("yes", function () {
                    //            //        // ukončení průvodce - jen poznamenání odpovědi, protože zde není možné zavřít průvodce (nekonečně by se zavíral tento potvrzovací dialog a padlo by to)
                    //            //        returnObj.zauctovat_odlozene = true;
                    //            //        //def.resolve(returnObj);
                    //            //    })
                    //            //    .on("closed", function () {
                    //            //        // ukončení průvodce - jen poznamenání odpovědi, protože zde není možné zavřít průvodce (nekonečně by se zavíral tento potvrzovací dialog a padlo by to)
                    //            //        def.resolve(returnObj);
                    //            //    });
                    //        }
                    //        else {
                    //            return returnObj;
                    //        }
                    //    })
                    //    //.then(function (returnObj: returnObjType) {
                    //    //    let def = $.Deferred();
                    //    //    if (returnObj.zauctovat_odlozene && !that.NekontrolovatPrecerpani && that.MoznostPrecerpani) {
                    //    //        that.dialogs.confirm("jres:24100210", //RC 24100210 : Účtování
                    //    //            "Je nastavena kontrola na přečerpání - chcete povolit přečerpání, pokud při odloženém účtování dojde k přečerpání?")
                    //    //            .on("yes", function () {
                    //    //                // ukončení průvodce - jen poznamenání odpovědi, protože zde není možné zavřít průvodce (nekonečně by se zavíral tento potvrzovací dialog a padlo by to)
                    //    //                returnObj.povolit_precerpani = true;
                    //    //                //def.resolve(returnObj);
                    //    //            })
                    //    //            .on("closed", function () {
                    //    //                // ukončení průvodce - jen poznamenání odpovědi, protože zde není možné zavřít průvodce (nekonečně by se zavíral tento potvrzovací dialog a padlo by to)
                    //    //                def.resolve(returnObj);
                    //    //            });
                    //    //    }
                    //    //    else {
                    //    //        def.resolve(returnObj);
                    //    //    }
                    //    //    return def.promise();
                    //    //})
                    //    .then(function (returnObj: returnObjType) {
                    //        if (returnObj.zauctovat_odlozene) {
                    //            // příznak, že průvodce končí odložených účtováním
                    //            that.OdlozeneUctovani = true;
                    //            // spuštění asynchronní úlohy
                    //            Gordic.Async.GTaskManager.start("Gordic.Fuc.Server.GUctovaniAsync", {
                    //                // TODO: doladit parametry
                    //                ixsHuf: that.IxsHuf,
                    //                lpc: that.LogPorCislo,
                    //                ikc: that.Ikc,
                    //                fazeUctovani: Gordic.Fuc.Globals.Enums.WizFazeUct.Zauctovani,
                    //                minulaFazeUctovani: that.Faze,
                    //                typUctovani: that.TypUctovani,
                    //                uctPoh: that.UctPoh,
                    //                poznamka: that.poznamka,
                    //                kumulaceZaIxp: that.KumulovatZaIxp,
                    //                vyrovnanost: that.VyrovnatZaNks,
                    //                bezKontrolyPrecerpani: that.NekontrolovatPrecerpani,
                    //                povolitPrecerpani: returnObj.povolit_precerpani,
                    //                zachovatRucniZapisy: true,
                    //                eUcetnictvi: that.EUcetnictvi,
                    //                ixsFunOozuUct: that.ixsFunOozuUct,
                    //                ixpDenUct: that.ixpDenUct
                    //            });
                    //            return returnObj;
                    //        }
                    //        else {
                    //            return returnObj;
                    //        }
                    //    })
                    //    .then(function (returnObj: returnObjType) {
                    //        if (returnObj.zauctovat_odlozene) {
                    //            // ukončení průvodce
                    //            return that.tryClose();
                    //        }
                    //        return;
                    //    });
                }
                /**
                 * Vrátí text do průběhu operace podle fáze
                 *
                 * @param {Globals.Enums.WizFazeUct} [explFaze] vynucená fáze (null = aktuální fáze)
                 * @returns {string} text do průběhu operace
                 */
                getTextFaze(explFaze) {
                    let faze = (explFaze != null ? explFaze : this.Faze);
                    switch (faze) {
                        case Fuc.Globals.Enums.WizFazeUct.KontrolaPohybu: return "jres:24100204"; //RC 24100204 : Probíhá kontrola pohybů
                        case Fuc.Globals.Enums.WizFazeUct.PripravaZapisu: return "jres:24100205"; //RC 24100205 : Probíhá příprava zápisů
                        case Fuc.Globals.Enums.WizFazeUct.PripravaDokladu: return "jres:24100206"; //RC 24100206 : Probíhá příprava dokladů
                        case Fuc.Globals.Enums.WizFazeUct.Zauctovani: return "jres:24100207"; //RC 24100207 : Probíhá zaúčtování
                        case Fuc.Globals.Enums.WizFazeUct.ZruseniBezZauctovani: return "jres:24100208"; //RC 24100208 : Probíhá zrušení účtování
                        default: return "";
                    }
                }
                /**
                 * Filtr pohybů podle zápisů ve druhém kroku
                 *
                 * @returns {JQuery.Promise<any>}
                 */
                filterPohyby1() {
                    let that = this;
                    const formFilter = new Gordic.Forms.Form({ name: "wizFilterPohyby1", layoutDescriptor: "L1M1S1, L-1-11-0, M-1-11-0, S-12-12-0" })
                        .addSection("jres:24100530") //RC 24100530 : Zápisy
                        // filtr na větu
                        .addRow().addField("gcheck", {
                        name: "zap_se_zapisy",
                        label: "jres:24100529", //RC 24100529 : se zápisy
                        change: function (ev, changeObj) {
                            let newValue;
                            newValue = (changeObj.value === true);
                            $(ev.target).closest(".gform").findFields("zap_veta").gfield("option", "disabled", !newValue);
                        }
                    })
                        .addRow().addField("gselectbox", Gordic.Eko.Prefabs.cfuElements({
                        gridFormat: new Gordic.Data.GridFormat()
                            .addNks({
                            cellTemplate: function (dto) { return Gordic.Eko.Filters.Utils.formatIntervalValue(dto.nks); },
                            editor: Gordic.Eko.Filters.nksInterval({
                                model: "nks",
                                caption: Gordic.Consts.DbShortcuts.nks ?? "NS",
                                ico: that.Ico,
                                onlyActive: true,
                                aktProhl: 100,
                            })
                        })
                            .addSortedEkoCfuSet(Gordic.Eko.CfuUtils.getCfuSetEditors(that)),
                        canAddNewRecords: true,
                        canRemoveRecords: true,
                        disabled: !(that.FiltryPohybu1.zap_se_zapisy === true),
                    }), { name: "zap_veta" })
                        // filtr na chybějící zápisy
                        .addRow().addField("gcheck", {
                        name: "zap_bez_zapisu",
                        label: "jres:24100528" //RC 24100528 : bez zápisů
                    })
                        // filtr na chybějící zápisy
                        .addRow().addField("gcheck", {
                        name: "zap_nevyrovnane_za_nks",
                        label: "jres:24100527" //RC 24100527 : nevyrovnané za NKS
                    })
                        // filtr na chybějící zápisy
                        .addRow().addField("gcheck", {
                        name: "zap_nevyrovnane_bez_nks",
                        label: "jres:24100526" //RC 24100526 : nevyrovnané za pohyb
                    });
                    return WebClient.FucDetail.simpleFormOkCancel(that, formFilter, that.FiltryPohybu1, "jres:24100531", 700, 350) //RC 24100531 : Filtr zobrazení pohybů
                        .createDialogPromise((dialogReturnValue) => { return dialogReturnValue ? true : false; })
                        .then(function (data) {
                        // TODO: řešit zapamatování hodnot kvůli přechodům mezi kroky? mezi kroky asi ne, ale v rámci kroku by to vhodné bylo
                        that.FiltryPohybu1 = {};
                        if (data.zap_se_zapisy === true) {
                            that.FiltryPohybu1["zap_se_zapisy"] = true;
                            if (data.zap_veta != null)
                                that.FiltryPohybu1["zap_veta"] = data.zap_veta;
                        }
                        if (data.zap_bez_zapisu === true)
                            that.FiltryPohybu1["zap_bez_zapisu"] = true;
                        if (data.zap_nevyrovnane_za_nks === true)
                            that.FiltryPohybu1["zap_nevyrovnane_za_nks"] = true;
                        if (data.zap_nevyrovnane_bez_nks === true)
                            that.FiltryPohybu1["zap_nevyrovnane_bez_nks"] = true;
                        that.actions.actFiltrPohybu.checked(that.FiltryPohybu1.zap_se_zapisy || that.FiltryPohybu1.zap_bez_zapisu === true || that.FiltryPohybu1.zap_nevyrovnane_za_nks === true || that.FiltryPohybu1.zap_nevyrovnane_bez_nks === true);
                        return that.loadPohyby1()
                            .then(function () {
                            return that.loadZapisy();
                        });
                    });
                }
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    let that = this;
                    // TODO: předělat enabled na updatePermission?
                    const acts = this.actions;
                    // akce pro pohyby (ve fázi 0)
                    if (this.Faze === 0) {
                        const isEmpty = !(this.$grid0Pohyby.ggrid("getView").getCount("data") > 0);
                        acts.actKontrola.enabled(!isEmpty);
                        // TODO: bude vždy povoleno? asi nemůže nastat situace, že seznam bude prázdný
                        acts.actDetailPohybu.enabled(!isEmpty);
                    }
                    // akce pro pohyby a zápisy (jsou jen ve fázi 1)
                    else if (this.Faze === 1) {
                        const isEmpty = !(this.$grid1Pohyby.ggrid("getView").getCount("data") > 0);
                        const gridEdit = (this.$grid1ZapisyPohybu?.find(".row.editing")?.length ?? 0) > 0;
                        // TODO: bude vždy povoleno? asi nemůže nastat situace, že seznam bude prázdný
                        acts.actDetailPohybu.enabled(!isEmpty);
                        acts.actOpravaPohybu.enabled(!isEmpty);
                        acts.actFiltrPohybu.enabled(true);
                        // TODO: doplnit správnou podmínku pro přístupnost akcí (parametry, ...)
                        const aktZapis = this.$grid1ZapisyPohybu ? Gordic.Eko.Grid.currentRow(this.$grid1ZapisyPohybu) : null;
                        const aktPohyb = Gordic.Eko.Grid.currentRow(this.$grid1Pohyby);
                        const pohybNestornoVUctovani = (aktPohyb != null && aktPohyb.s_upo === Gordic.Fuc.Globals.Enums.SUpo.VUctovani && (aktPohyb.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniAutomaticky || aktPohyb.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniPoloautomaticky || aktPohyb.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniRucni));
                        acts.actNovyZapis.enabled(that.PovolenaEditaceZapisu && pohybNestornoVUctovani && !gridEdit);
                        acts.actOpravaZapisu.enabled(that.PovolenaEditaceZapisu && pohybNestornoVUctovani && !gridEdit && aktZapis != null);
                        // TODO: odstranění zápisu (zatím?) není podporováno
                        acts.actOdstraneniZapisu.enabled(false /*this.Uctovani && aktZapis != null*/);
                    }
                }
                /**
                 * Zadání parametrů tisku
                 *
                 * @param {IGPrintActionReportStarting} rep parametry tisku
                 * @param {boolean} [vse] true = tisk všech dokladů najednou, jinak jen aktuální
                 */
                reportStarting(rep, vse) {
                    // elementární účetní zápisy (téma fuc_ptm_dokagd, sestava fucdok01) se zde netisknou, jsou jen na detailu zaúčtovaného pohybu (ve fázi 3 už nejsou pohyby, ke kterým by se to mohlo tisknout)
                    // TODO: podmínka na téma je zbytečná (viz. komentář výše) - odstranit ji?
                    // nastavení parametrů podle tématu
                    if (rep.tema === "fuc_ptm_engzau") {
                        // účetní doklad (fáze 3)
                        let aktDoklad = Gordic.Eko.Grid.currentRow(this.$grid3Doklady);
                        if (aktDoklad !== null) {
                            rep.params.X0000 = aktDoklad.rok.toString(10);
                            rep.params.X0001 = aktDoklad.lic;
                            rep.params.X0002 = aktDoklad.ico;
                            rep.params.X0003 = aktDoklad.ucs;
                            rep.params.X0004 = aktDoklad.mesic.toString(10);
                            rep.params.X0005 = aktDoklad.ac;
                            if (this.TypUctovani === 10 || this.TypUctovani === 20)
                                rep.params.X0006 = "1";
                            else
                                rep.params.X0006 = "0";
                            // v X0007 je log_por_cislo v případě tisku všech dokladů najednou
                            if (vse === true)
                                rep.params.X0007 = this.LogPorCislo.toString(10);
                            else
                                rep.params.X0007 = "";
                            // využití dto pouze pro přenos IKC do CS, kde se použije na vytvoření devátého parametru
                            rep.customDto = { duct_ikc: this.Ikc };
                        }
                    }
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<boolean>} promise (resolve = je možné zavřít, reject = není možné zavřít) s příznakem, jestli účtování pokračuje odloženě nebo ne
                 */
                closing(complete) {
                    let that = this;
                    // stav ukončení průvodce
                    if (!(complete === true || complete === false)) {
                        complete = this.Faze == 3 && this.ZauctovanoBezChyb === true;
                    }
                    // přechod na odložené účtování
                    if (that.OdlozeneUctovani === true) {
                        // historie se neaktualizuje
                        // zavření průvodce
                        return $.Deferred().resolve({ complete: complete, uctovanoOdlozene: that.OdlozeneUctovani }).promise();
                    }
                    // ukončení pokud se účtovat nezačalo (ukončení z prvního kroku nebo ukončení kvůli chybě z inicializace nebo prvotrní kontroly před účtováním)
                    // stavy pohybů není potřeba řešit, stačí aktualizace historie
                    if (this.Faze !== 1 && this.Faze !== 2 && this.Faze !== 3) {
                        //if ((this.Faze !== 1 && this.Faze !== 2 && !(this.Faze == 3 && this.ZauctovanoBezChyb === false))) {
                        // historie se aktualizuje
                        if (that.IxsHuf) {
                            return that.isl.FinPohybHistorieUctovani.update({
                                ixs_huf: that.IxsHuf,
                                stav_uctovani: Fuc.Globals.Enums.StavUctovaniPohybu.PrerusenoUzivatelem,
                                ikc: that.Ikc,
                                typ_uct_fuc: that.TypUctovani ?? 0,
                                uct_poh: that.UctPoh
                            })
                                .get()
                                .then(function () {
                                // zavření průvodce
                                return { complete: complete, uctovanoOdlozene: that.OdlozeneUctovani };
                            });
                        }
                        else {
                            // jenom zavření průvodce, není známa historie
                            return $.Deferred().resolve({ complete: complete, uctovanoOdlozene: that.OdlozeneUctovani }).promise();
                        }
                    }
                    // ukončení pokud není rozúčtováno
                    if ((this.Faze !== 1 && this.Faze !== 2 && !(this.Faze === 3 && this.ZauctovanoBezChyb === true)) || this.OdlozeneUctovani) {
                        // ukončení nebo přerušení - historie se aktualizuje
                        if (that.IxsHuf) {
                            return that.isl.FinPohybHistorieUctovani.update({
                                ixs_huf: that.IxsHuf,
                                stav_uctovani: complete ? (that.ZauctovanoBezPrecerpani ? Fuc.Globals.Enums.StavUctovaniPohybu.Zauctovano : Fuc.Globals.Enums.StavUctovaniPohybu.ZauctovanoSPrecerpanim) : (that.UkoncenoChybou ? Fuc.Globals.Enums.StavUctovaniPohybu.PrerusenoKvuliChybe : Fuc.Globals.Enums.StavUctovaniPohybu.PrerusenoUzivatelem),
                                ikc: that.Ikc,
                                typ_uct_fuc: that.TypUctovani ?? 0,
                                uct_poh: that.UctPoh,
                                poznamka: that.poznamka,
                                kumul_za_ixp: that.KumulovatZaIxp === true ? 1 : 0,
                                priz_vyr_nks: that.VyrovnatZaNks === true ? 1 : 0,
                                priz_bez_kontr: that.NekontrolovatPrecerpani === true ? 1 : 0,
                                zach_ruc_zapisy: that.ZachovatRucniZapisy === true ? 1 : 0,
                                e_ucetnictvi: that.EUcetnictvi === true ? 1 : 0,
                                ixs_fun_oozu_uct: that.ixsFunOozuUct,
                                ixp_den_uct: that.ixpDenUct,
                                text_chyby: !complete && that.UkoncenoChybou ? that.TextChyby : undefined,
                            })
                                .getData()
                                .then(function (data) {
                                // zavření průvodce
                                return { complete: complete, uctovanoOdlozene: that.OdlozeneUctovani };
                            });
                        }
                        else {
                            return $.Deferred().resolve({ complete: complete, uctovanoOdlozene: that.OdlozeneUctovani }).promise();
                        }
                    }
                    ;
                    let returnObj = {
                        existNeautomaticke: false,
                        zachNeautomaticke: false,
                        zruseniAno: false
                    };
                    // deferred objekt pro zřetězení dotazů a akcí
                    return $.Deferred().resolve(returnObj).promise()
                        .then(function (returnObj) {
                        // TODO: tendo dotaz se neukazuje po chybě ve fázi 3, protože není dovoleno jít zpátky - pokud by to šlo, tak by tento dotaz měl být vždy. nebo má být vždy i tak?
                        if (!(that.Faze == 3 && that.ZauctovanoBezChyb === true)) {
                            return that.dialogs.confirm("jres:24100210", //RC 24100210 : Účtování
                            "jres:24100118") //RC 24100118 : Účetní pohyby nebyly proúčtovány. Opravdu chcete zavřít účtování?
                                .createDialogPromise(GDlg.mbbYes.id)
                                .then(function () {
                                // účtování bude ukončeno
                                returnObj.zruseniAno = true;
                                return returnObj;
                            }, function () {
                                // účtování nebude ukončeno
                                return $.Deferred().resolve(returnObj);
                            });
                        }
                        else {
                            // účtování bude ukončeno
                            returnObj.zruseniAno = true;
                            return returnObj;
                        }
                    })
                        .then(function (returnObj) {
                        if (returnObj.zruseniAno && !(that.Faze === 3)) {
                            // zjištění poloautomatických a ručních pohybů
                            return that.isl.FinPohyb.jsouNeautomaticke({ ikc: that.Ikc })
                                .get()
                                .then(function (vysl) {
                                returnObj.existNeautomaticke = vysl;
                                return returnObj;
                            });
                        }
                        else {
                            // účtování nebude ukončeno
                            return returnObj;
                        }
                    })
                        .then(function (returnObj) {
                        // případný dotaz na uložení změn pohybů
                        if (returnObj.zruseniAno && returnObj.existNeautomaticke) {
                            return that.dialogs.confirm("jres:24100210", //RC 24100210 : Účtování
                            "jres:24100211") //RC 24100211 : Na některých pohybech jsou ručně pořízené zápisy. Chcete zachovat zápisy těchto pohybů?
                                .createDialogPromise(GDlg.mbbYes.id)
                                .then(function () {
                                // zachovat zápisy neautomatických pohybů
                                returnObj.zachNeautomaticke = true;
                                that.ZachovatRucniZapisy = true;
                                return returnObj;
                            }, function () {
                                // nezachovat zápisy neautomatických pohybů
                                that.ZachovatRucniZapisy = false;
                                return $.Deferred().resolve(returnObj);
                            });
                        }
                        else {
                            // účtování nebude ukončeno nebo zápisy neautomatických pohybů nejsou
                            returnObj.zachNeautomaticke = true;
                            that.ZachovatRucniZapisy = true;
                            return returnObj;
                        }
                    })
                        .then(function (returnObj) {
                        // ukončení účtování v databázi
                        if (returnObj.zruseniAno) {
                            // ukončení účtování
                            return that.uctovaniWizard(Gordic.Fuc.Globals.Enums.WizFazeUct.ZruseniBezZauctovani, that.Faze, that.NekontrolovatPrecerpani, returnObj.zachNeautomaticke)
                                .then(function () {
                                return returnObj;
                            }, function () {
                                // operace nedopadla
                                return $.Deferred().resolve(returnObj);
                            });
                        }
                        else {
                            // účtování nebude ukončeno
                            return returnObj;
                        }
                    })
                        .then(function (returnObj) {
                        if (returnObj.zruseniAno) {
                            // ukončení nebo přerušení - historie se aktualizuje
                            if (that.IxsHuf) {
                                return that.isl.FinPohybHistorieUctovani.update({
                                    ixs_huf: that.IxsHuf,
                                    stav_uctovani: complete ? (that.ZauctovanoBezPrecerpani ? Fuc.Globals.Enums.StavUctovaniPohybu.Zauctovano : Fuc.Globals.Enums.StavUctovaniPohybu.ZauctovanoSPrecerpanim) : (that.UkoncenoChybou ? Fuc.Globals.Enums.StavUctovaniPohybu.PrerusenoKvuliChybe : Fuc.Globals.Enums.StavUctovaniPohybu.PrerusenoUzivatelem),
                                    ikc: that.Ikc,
                                    typ_uct_fuc: that.TypUctovani ?? 0,
                                    uct_poh: that.UctPoh,
                                    poznamka: that.poznamka,
                                    kumul_za_ixp: that.KumulovatZaIxp === true ? 1 : 0,
                                    priz_vyr_nks: that.VyrovnatZaNks === true ? 1 : 0,
                                    priz_bez_kontr: that.NekontrolovatPrecerpani === true ? 1 : 0,
                                    zach_ruc_zapisy: that.ZachovatRucniZapisy === true ? 1 : 0,
                                    e_ucetnictvi: that.EUcetnictvi === true ? 1 : 0,
                                    ixs_fun_oozu_uct: that.ixsFunOozuUct,
                                    ixp_den_uct: that.ixpDenUct,
                                    text_chyby: !complete && that.UkoncenoChybou ? that.TextChyby : undefined,
                                })
                                    .getData()
                                    .then(function (data) {
                                    // zavření průvodce
                                    return { complete: complete, uctovanoOdlozene: that.OdlozeneUctovani };
                                });
                            }
                            else {
                                return { complete: complete, uctovanoOdlozene: that.OdlozeneUctovani };
                            }
                        }
                        else {
                            // ukončení okna není možné
                            return $.Deferred().reject();
                        }
                    });
                }
            };
            GUctovaniPohybu = __decorate([
                gcontent
            ], GUctovaniPohybu);
            WebClient.GUctovaniPohybu = GUctovaniPohybu;
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdG92YW5pUG9oeWJ1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1VjdG92YW5pUG9oeWJ1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0Fxb0hmO0FBcm9IRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0Fxb0huQjtJQXJvSGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXFvSDdCO1FBcm9Ib0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkM7Ozs7O2VBS0c7WUFFSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFBakQ7O29CQTBDSSxLQUFLO29CQUNMLHdDQUF3QztvQkFDeEMsb0JBQW9CO29CQUNwQixLQUFLO29CQUNMLGlDQUFpQztvQkFDakMsS0FBSztvQkFDTCx1REFBdUQ7b0JBQ3ZELG9CQUFvQjtvQkFDcEIsS0FBSztvQkFDTCxzQ0FBc0M7b0JBQ3RDLDBIQUEwSDtvQkFDMUg7Ozt1QkFHRztvQkFDSyxzQkFBaUIsR0FBWSxJQUFJLENBQUM7b0JBQzFDOzs7dUJBR0c7b0JBQ0ssNEJBQXVCLEdBQVksSUFBSSxDQUFDO29CQUNoRDs7O3VCQUdHO29CQUNLLG1CQUFjLEdBQVksS0FBSyxDQUFDO29CQUN4Qzs7O3VCQUdHO29CQUNLLGNBQVMsR0FBdUIsU0FBUyxDQUFDO29CQUNsRDs7O3VCQUdHO29CQUNLLHdCQUFtQixHQUFZLElBQUksQ0FBQztvQkF1TDVDOzs7O3VCQUlHO29CQUNLLDBCQUFxQixHQUFZLElBQUksQ0FBQztvQkFXOUM7Ozt1QkFHRztvQkFDSyxXQUFNLEdBQVcsRUFBRSxDQUFDO29CQUM1Qjs7O3VCQUdHO29CQUNLLHFCQUFnQixHQUFZLEtBQUssQ0FBQztvQkFDMUM7Ozs7dUJBSUc7b0JBQ0sscUJBQWdCLEdBQThCLElBQUksQ0FBQztvQkFDM0Q7Ozs7dUJBSUc7b0JB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b250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIMOaxI10b3bDoW7DrSBqZWRub2hvIG5lYm8gdsOtY2Ugw7rEjWV0bsOtY2ggcG9oeWLFryBwxZllcyBwcsWvdm9kY2VcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBCb8SNZWtcclxuICAgICAqIEBzaW5jZSA0ODAuMS4wLjEyXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdVY3RvdmFuaVBvaHlidSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgcG9oeWLFryAoZsOhemUgMClcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQwUG9oeWJ5OiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBwb2h5YsWvIChmw6F6ZSAxKVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDFQb2h5Ynk6IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIHrDoXBpc8WvIHBvaHlidSAoZsOhemUgMSlcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQxWmFwaXN5UG9oeWJ1OiBKUXVlcnkgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5mb3JtYcSNbsOtIGZsYXNoIG5hZCBncmlkZW0gesOhcGlzxa8gcG9oeWJ1IChmw6F6ZSAxKVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDFaYXBpc3lQb2h5YnVGbGFzaDogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgZG9rbGFkxa8gKGbDoXplIDIpXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkMkRva2xhZHk6IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIHrDoXBpc8WvIGRva2xhZHUgKGbDoXplIDIpXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkMlphcGlzeURva2xhZHU6IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIGRva2xhZMWvIChmw6F6ZSAzKVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDNEb2tsYWR5OiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCB6w6FwaXPFryBkb2tsYWR1IChmw6F6ZSAzKVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDNaYXBpc3lEb2tsYWR1OiBKUXVlcnk7XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIFDFmcOtem5hayBrb21wbGV0bsOtIHDFmcOtcHJhdnkgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgLy8gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBwcmlwcmF2YVBydm5pOiBib29sZWFuO1xyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBQxZnDrXpuYWsga29udHJvbHkgcG/EjXR1IHBvaHlixa8gcMWZaSBvZGNob2R1IHogZsOhemUgMFxyXG4gICAgICAgIC8vICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgZmF6ZTBLb250clBvY2V0VXBvOiBib29sZWFuO1xyXG4gICAgICAgIC8vIFRPRE86IHRvaGxlIHNlIG5pa2RlIG5lbmFzdGF2dWplLCB0YWvFvmUgamUgc3TDoWxlIHRydWUgLSBqZSB0byB2xa9iZWMgcG90xZllYmEsIG3Fr8W+ZSBiw710IGbDoXplIDMgbmViw710IHphw7rEjXRvdsOhbm8gYmV6IGNoeWI/XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZw616bmFrIHphw7rEjXRvdsOhbsOtIGJleiBjaHliIChwcm8gdWtvbsSNZW7DrSBwcsWvdm9kY2UpXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBaYXVjdG92YW5vQmV6Q2h5YjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZw616bmFrIHphw7rEjXRvdsOhbsOtIGJleiBwxZllxI1lcnDDoW7DrSAocHJvIHVrb27EjWVuw60gcHLFr3ZvZGNlKVxyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgWmF1Y3RvdmFub0JlelByZWNlcnBhbmk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtem5hayB1a29uxI1lbsOtIHMgY2h5Ym91XHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBVa29uY2Vub0NoeWJvdTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRleHQgY2h5YnkgKHBybyBVa29uY2Vub0NoeWJvdSA9PT0gdHJ1ZSlcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nIHwgdW5kZWZpbmVkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgVGV4dENoeWJ5OiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZw616bmFrIHphY2hvdsOhbsOtIHJ1xI1uw61jaCB6w6FwaXPFryBwxZlpIHpydcWhZW7DrSDDusSNdG92w6Fuw60gKHBybyB1a29uxI1lbsOtIHByxa92b2RjZSlcclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFphY2hvdmF0UnVjbmlaYXBpc3k6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtem5hayBtb8W+bm9zdGkgdGVzdG92w6Fuw60gZS3DusSNZXRuaWN0dsOtXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBUZXN0RVVjZXRuaWN0dmk6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS1BJIHBhbmVsIHMgcG/EjXR5IHrDoXpuYW3FryBwb2RsZSBzdGF2xa9cclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUga3BpUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcsWvdm9kY2VcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLldpemFyZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHdpemFyZDogR29yZGljLldpemFyZDtcclxuXHJcbiAgICAgICAgLy8gdmxhc3Rub3N0aSB6IEMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSBJS0NcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkdlbmVyYWwuR0lrY31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIElrYzogR29yZGljLkdlbmVyYWwuR0lrYztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLYXRlZ29yaWUgw7rEjXRvdmFuw71jaCBwb2h5YsWvXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFVjdFBvaDogbnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFR5cCDDusSNdG92w6Fuw60gcG9oeWLFr1xyXG4gICAgICAgICAqIEB0eXBlIHtHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgVHlwVWN0b3Zhbmk6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3Q7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHlwIMO6xI10b3bDoW7DrSBwb2h5YsWvXHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBQZXZUeXBVY3RvdmFuaTogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC8qIHwgbnVsbCB8IHVuZGVmaW5lZCovO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtem5hayBtb8W+bm9zdGkgdGVzdG92w6Fuw60gZS3DusSNZXRuaWN0dsOtXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBQZXZUeXBVY3RBbm86IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V6bmFtIHBvaHlixa8gcMWZZWRhbsO9IG5hIHZzdHVwdSAocG91xb5pdMO9IHBybyBwcnZvdG7DrSBrb250cm9sdSlcclxuICAgICAgICAgKiBAdHlwZSB7RnVjLkludGVyZmFjZS5HUG9oeWJEdG9bXSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBWc3R1cG5pUG9oeWJ5OiBGdWMuSW50ZXJmYWNlLkdQb2h5YkR0b1tdIHwgbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQb3NsZWRuw60ga29udHJvbG92YW7DvSBwb8SNZXQgcG9oeWLFr1xyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXIgfCBudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgS29udHJvbFBvY2V0UG9oeWJ1OiBudW1iZXIgfCBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEUtw7rEjWV0bmljdHbDrVxyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgRVVjZXRuaWN0dmk6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3NvYmEgb2Rwb3bEm2Ruw6EgemEgemF1xI10b3bDoW7DrSAoamVuIHBybyBlLcO6xI1ldG5pY3R2w60pXHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGl4c0Z1bk9venVVY3Q6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLbmloYSBVQ1QgKGplbiBwcm8gZS3DusSNZXRuaWN0dsOtKVxyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBpeHBEZW5VY3Q6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVxb5pdmF0ZWxza8OhIHBvem7DoW1rYVxyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb3puYW1rYTogc3RyaW5nO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE3DoSBzZSBrdW11bG92YXQgemEgUElEIHDFmcOtcGFkdT9cclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEt1bXVsb3ZhdFphSXhwOiBib29sZWFuO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEplIHBvdm9sZW5vIMO6xI10b3bDoW7DrSBqZWRub3RsaXbEmz9cclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFBvdm9sZW5vVWN0b3ZhbmlKZWRub3RsaXZlOiBib29sZWFuO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEplIHBvdm9sZW5vIMO6xI10b3bDoW7DrSBocm9tYWRuxJs/XHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBQb3ZvbGVub1VjdG92YW5pSHJvbWFkbmU6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSmUgcG92b2xlbm8gw7rEjXRvdsOhbsOtIGt1bXVsb3ZhbsSbP1xyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUG92b2xlbm9VY3RvdmFuaUt1bXVsb3ZhbmU6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSBmw6F6ZSBwcsWvdm9kY2VcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLldpekZhemVVY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBGYXplOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuV2l6RmF6ZVVjdDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZllZGNob3rDrSBmw6F6ZSBwcsWvdm9kY2VcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLldpekZhemVVY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBQcmVkY2hvemlGYXplOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuV2l6RmF6ZVVjdDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZllZGNob3rDrSBmw6F6ZSBwcsWvdm9kY2VcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLldpekZhemVVY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBQcmlwcmF2ZW5hRmF6ZTogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLldpekZhemVVY3Q7XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIFDFmcOtem5hayBwcnZuw61obyBzcHXFoXTEm27DrSBva25hXHJcbiAgICAgICAgLy8gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBQcnZuaVNwdXN0ZW5pOiBib29sZWFuO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlem5hbSBzbG91cGPFryB6IHZvbGFuw6lobyBzZXpuYW11XHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIENvbHVtbkxpc3Q6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIGxvZ19wb3JfY2lzbG9cclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTG9nUG9yQ2lzbG86IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIEnEjE9cclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSWNvOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSBVQ1NcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVWNzOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSByb2tcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUm9rOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSXhzIHJvenZyaHVcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSXhzUm96OiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSXhzIENGU1xyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJeHNTYXg6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNYXhpbcOhbG7DrSBwb8SNZXQgbmFqZWRub3Ugw7rEjXRvdmFuw71jaCBwb2h5YsWvXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IE1heFVwbzogbnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtem5hayB2eXJvdm7DoW7DrSDDusSNZXRuw61jaCB6w6FwaXPFryB6YSBOS1NcclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFZ5cm92bmF0WmFOa3M6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZw616bmFrIGJleiBrb250cm9seSBuYSBwxZllxI1lcnDDoW7DrVxyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTmVrb250cm9sb3ZhdFByZWNlcnBhbmk6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZw616bmFrIG1vxb5ub3N0IHDFmWXEjWVycMOhbsOtXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBNb3pub3N0UHJlY2VycGFuaTogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBKZSBzdMOhdG7DrSBwb2tsYWRuYT9cclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEplSWlzc3A6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG92b2xlbsOpIHpuYWt5IHZlIHNsb3ZlY2ggw7rEjWV0bsOtIHbEm3R5ICgwIC0gamVuIMSNw61zbGljZSwgMSAtIMSNw61zbGljZSBpIHDDrXNtZW5hIGtyb23EmyBYIGEgWSlcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUG92b2xlbmVabmFreVZVZVRlOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6aXQgcG9oeWJ5IHMgY2h5Ym5vdSDDusSNZXRuw60gdsSbdG91XHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFpvYnJheml0UG9oeWJ5U0NoeWJub3VWZXRvdTogbnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtem5haywgamUtbGkgbW/Fvm7DqSBlZGl0b3ZhdCB6w6FwaXN5LCBqZS1saSBncmlkIHYga29tcGF0aWJpbG7DrW0gc3RhdnUgKHBybyBkcnVow70ga3JvayBwcsWvdm9kY2UpXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUG92b2xlbmFFZGl0YWNlWmFwaXN1OiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIHN0cnVrdHVyYSB2xJt0eSAocHJvIGRydWjDvSBrcm9rIHByxa92b2RjZSlcclxuICAgICAgICAgKiBAdHlwZSB7R0dyaWRDb2x1bW5bXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFNvcnRlZENmdVNldDogR0dyaWRDb2x1bW5bXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkZm9ybcOhdCBwcm8gesOhcGlzeSBwb2h5YnUgKHBybyBkcnVow70ga3JvayBwcsWvdm9kY2UpXHJcbiAgICAgICAgICogQHR5cGUge0RhdGEuR3JpZEZvcm1hdDxHb3JkaWMuRnVjLkludGVyZmFjZS5HWmFwaXNEdG8+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgR3JpZEZvcm1hdFphcGlzeVBvaHlidTogRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBpc0R0bz47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSBpZCBoaXN0b3JpZSDDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgSXhzSHVmOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtem5haywgxb5lIGplIMO6xI10b3bDoW7DrSBvZGxvxb5lbsSbIFxyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgT2Rsb3plbmVVY3RvdmFuaTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZhcm92w6Fuw60geiBrb250cm9seSwga3RlcsOpIHNlIHpvYnJhesOtIHYgcHJ2bsOtbSBrcm9rdSBqYWtvIGZsYXNoXHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9XHJcbiAgICAgICAgICogQGRlZmF1bHQgbnVsbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgV2FybmluZ1pLb250cm9seTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5mb3JtYWNlIHoga29udHJvbHksIGt0ZXLDqSBzZSB6b2JyYXrDrSB2IHBydm7DrW0ga3Jva3UgamFrbyBmbGFzaFxyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfVxyXG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEluZm9aS29udHJvbHk6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmcOtem5hayBhdXRvbWF0aWNrw6lobyBwxZllY2hvZHUgeiBrcm9rdSAxIGRvIDJcclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQXV0U3RlcDF0bzI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaWx0cnkgc2V6bmFtdSBwb2h5YsWvIHYga3Jva3UgMVxyXG4gICAgICAgICAqIEB0eXBlIHthbnl9XHJcbiAgICAgICAgICogQGRlZmF1bHQge31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEZpbHRyeVBvaHlidTE6IHtcclxuICAgICAgICAgICAgLy8gcG96bsOhbWthOiBwb2xvxb5reSBvZHBvdsOhZGFqw60gZmlsdHLFr20gcG9oeWLFr1xyXG4gICAgICAgICAgICB6YXBfYmV6X3phcGlzdT86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHphcF9zZV96YXBpc3k/OiBib29sZWFuLFxyXG4gICAgICAgICAgICB6YXBfdmV0YT86IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdDZnVGaWx0ZXJEdG9bXSxcclxuICAgICAgICAgICAgemFwX25ldnlyb3ZuYW5lX3phX25rcz86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHphcF9uZXZ5cm92bmFuZV9iZXpfbmtzPzogYm9vbGVhblxyXG4gICAgICAgIH0gPSB7fTtcclxuXHJcbiAgICAgICAgLy8ga29uc3RhbnR5XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkQ2xhc3NQb2h5Ynk6IHN0cmluZyA9IFwiZ3JpZEZ1Y1Nlem5hbVBvaHlidVwiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWRlZmlub3bDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGFzeW5jaHJvbm7DrSBuYcSNdGVuw60gY2FjaGUgcHJvIGRhdG92b3UgdsSbdHVcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXdhaXQudGhlbigoKSA9PiB7IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkRhdGFTZW50ZW5jZUFkYXB0ZXIuZ2V0Q2FjaGVDb250ZW50KHRoaXMuSXhzUm96LCB0aGlzLkl4c1NheCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuUGV2VHlwVWN0QW5vKSB0aGlzLlR5cFVjdG92YW5pID0gdGhpcy5QZXZUeXBVY3RvdmFuaTtcclxuICAgICAgICAgICAgLy8gVE9ETzogcHJvxI0gdG8gdGFkeSBtdXPDrSBiw710LCBwcm/EjSBzZSBwxZlpIHpub3Z1c3B1xaF0xJtuw60gcHLFr3ZvZGNlIHBhbWF0dWrDrSBob2Rub3R5IHogbWludWxlP1xyXG4gICAgICAgICAgICB0aGlzLkZpbHRyeVBvaHlidTEgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRlc3RvdsOhbsOtIGUtw7rEjWV0bmljdHbDrVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBlLcO6xI1ldG5pY3R2w60gemF0w61tIGplbiB2IGRlYnVnIHJlxb5pbXVcclxuICAgICAgICAgICAgdGhpcy5UZXN0RVVjZXRuaWN0dmkgPSB0aGF0LnByb3AoXCJkZWJ1Z01vZGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgLy8gZsOhemUgMFxyXG4gICAgICAgICAgICAgICAgLy8gemF0w61tIG5lbsOtIHZpZGl0ZWxuw6kgKG5lbsOtIG5hcHPDoW5hIG9ic2x1aGEpXHJcbiAgICAgICAgICAgICAgICBhY3RLb250cm9sYTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmtvbnRyb2xvdmF0KHtcclxuICAgICAgICAgICAgICAgICAgICAvKnZpc2libGU6IGZhbHNlLCAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmtvbnRyb2xhUHJlZFVjdG92YW5pbSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIC8vIGbDoXplIDFcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbFBvaHlidTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5kZXRhaWxQb2h5YnUoZmFsc2UpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdE9wcmF2YVBvaHlidTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT3ByYXZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuZGV0YWlsUG9oeWJ1KHRydWUpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdEZpbHRyUG9oeWJ1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwNTMyXCIsIC8vUkMgMjQxMDA1MzIgOiBGaWx0clxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZmlsdGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuZmlsdGVyUG9oeWJ5MSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Tm92eVphcGlzOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Ob3Z5KHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDAxNDhcIiwgLy9SQyAyNDEwMDE0OCA6IE5vdsO9IHrDoXBpc1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm5vdnlaYXBpcygpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdE9wcmF2YVphcGlzdTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVXByYXZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwMTQ5XCIsIC8vUkMgMjQxMDAxNDkgOiBPcHJhdml0IHrDoXBpc1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmVkaXRhY2VaYXBpc3UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RPZHN0cmFuZW5pWmFwaXN1OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PZHN0cmFuaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDEwMDE1MFwiLCAvL1JDIDI0MTAwMTUwIDogT2RzdHJhbml0IHrDoXBpc1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9kc3RyYW5lbmlaYXBpc3UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAvLyBmw6F6ZSAzXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrRG9rbGFkdTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVGlzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tEb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJmdWNfcHRtX2VuZ3phdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HVWN0b3ZhbmlQb2h5YnU6UHJpbnRQYXJhbWV0ZXJzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHsgcmV0dXJuIHRoYXQucmVwb3J0U3RhcnRpbmcocmVwKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrVnNlY2hEb2tsYWR1OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1ZzZWNoRG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiZnVjX3B0bV9lbmd6YXVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDA0NjJcIiwgLy9SQyAyNDEwMDQ2MiA6IFRpc2sgdsWhZVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HVWN0b3ZhbmlQb2h5YnU6UHJpbnRQYXJhbWV0ZXJzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHsgcmV0dXJuIHRoYXQucmVwb3J0U3RhcnRpbmcocmVwLCB0cnVlKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3REb2tsYWRPWmF1Y3RvdmFuaTogRnVjQWN0aW9ucy5hY3Rpb25Eb2tsYWRPWmF1Y3RvdmFuaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5kb2tsYWRPWmF1Y3RvdmFuaSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIC8vIHbFoWVjaG55IGbDoXplIGtyb23EmyAzXHJcbiAgICAgICAgICAgICAgICBhY3RaYXVjdG92YXRPZGxvemVuZTogRnVjQWN0aW9ucy5hY3Rpb25aYXVjdG92YXRPZGxvemVuZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC56YXVjdG92YXRPZGxvemVuZSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyB6YWxvxb5lbsOtIGhpc3RvcmllIMO6xI10b3bDoW7DrSBhIHBydm90bsOtIGtvbnRyb2xhXHJcbiAgICAgICAgICAgIHRoYXQuaW5pY2lhbGl6YWNlQVBydm90bmlLb250cm9sYVByZWRVY3RvdmFuaW0oKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQud2l6YXJkID0gbmV3IEdvcmRpYy5XaXphcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LndpemFyZC5jcmVhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogemt1c2l0IGNoeWJ5IHoga29udHJvbHkgKG5lanNvdSB6cHosIC4uLikgYSBtb3RvcsWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBvcHJhdml0IHpvYnJhemVuw60gZGV0YWlsdSAodiBwcnZuw61tIGtyb2t1IG5lamRlLCB2ZSBkcnVow6ltIGpzZW0gdG8gbmV6a291xaFlbCkgYSBtxJtsbyBieSBmdW5nb3ZhdCB0YWsgamFrIG5hIHNlem5hbXUgKG9ixI1lcnN0dmVuw60gc2V6bmFtxa8gcG9kIG7DrW0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogamUgbW/Fvm7DqSBuxJtqYWsgbcSbbml0IHRpdHVsZWsgdMWZZWJhIHBvZGxlIHZ5YnJhbsOpaG8gdHlwdSDDusSNdG92w6Fuw60/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBwcm/EjSB0b2hsZSB1xb4gbmVmdW5ndWplIGEgbXVzw61tIHRvIGTEm2xhdCB2IENTP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aXRsZTogXCJqcmVzOjI0MTAwMjEwXCIsIC8vUkMgMjQxMDAyMTAgOiDDmsSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmw6F6ZSAwIC0ga29udHJvbGEgw7rEjWV0bsOtY2ggcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDA0NTlcIiwgLy9SQyAyNDEwMDQ1OSA6IFphZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGNudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1Y2hvdsOhbsOtIGluZm9ybWFjw60gbyBwcsWvYsSbaHUgcHLFr3ZvZGNlIGEgemFrw6F6w6Fuw60gKGRvxI1hc27DqT8pIGtyb2vFryBvIHbDrWNlIG5lxb4gamVkZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2F2ZVN0ZXBJbmZvKHRoYXQud2l6YXJkLCBjaGFuZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0Z1Y1dpemFyZC5jcmVhdGVEZXNjcmlwdGlvbihjb250ZW50RGl2LCBcInRhZHkgbcWvxb5lIGLDvXQgcG9waXNcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm1QYXJhbWV0cnkoY29udGVudERpdiwgY2hhbmdlLmFjdGl2ZVN0ZXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LlBldlR5cFVjdEFubykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYWRpb1R5cFVjdCA9IHRoYXQuZmluZEZpZWxkcyhcInR5cF91Y3RvdmFuaVwiKS5ncmFkaW8oXCJvcHRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkaW9UeXBVY3QucmFkaW9zWzBdLmRpc2FibGVkID0gIXRoYXQuUG92b2xlbm9VY3RvdmFuaUplZG5vdGxpdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkaW9UeXBVY3QucmFkaW9zWzFdLmRpc2FibGVkID0gIXRoYXQuUG92b2xlbm9VY3RvdmFuaUhyb21hZG5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvVHlwVWN0LnJhZGlvc1syXS5kaXNhYmxlZCA9ICF0aGF0LlBvdm9sZW5vVWN0b3ZhbmlLdW11bG92YW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInR5cF91Y3RvdmFuaVwiKS5ncmFkaW8oXCJkZXN0cm95XCIpLmdyYWRpbyhyYWRpb1R5cFVjdCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IHR5cF91Y3RvdmFuaTogdGhhdC5UeXBVY3RvdmFuaSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBLUEkgc2Ugc3RhdnkgesOhem5hbcWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmtwaVBhbmVsID0gRnVjV2l6YXJkLmNyZWF0ZUtQSVBhbmVsKGNvbnRlbnREaXYsIChraW5kKSA9PiBGdWNXaXphcmQuZ2V0U2VsRnVuYyhraW5kLCB0aGF0LiRncmlkMFBvaHlieS5nZ3JpZChcImdldFZpZXdcIikpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXpuYW0gcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR0YWJQb2h5YnkgPSAkLm5ld0RpdigpLmFwcGVuZFRvKGNvbnRlbnREaXYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWeWJyYW7DqSBwb2h5YnlcIiwgb3BlbmVkOiB0cnVlLyosIGxvY2tlZDogdHJ1ZSovLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEtvbnRyb2xhLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWxQb2h5YnUsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZDBQb2h5YnkgPSAkLm5ld0Rpdih0aGF0LmdyaWRDbGFzc1BvaHlieSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJHRhYlBvaHlieSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZDBQb2h5YnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3NDaGVja2VkOiBcImR1Y3RfY2hlY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpTWVudTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRnVjV2l6YXJkLmNyZWF0ZUl0ZW1Gb3JNdWx0aU1lbnUoXCJhY3RTdWNjZXNzUmVjb3Jkc1wiLCBcImpyZXM6MjQxMDA1MDhcIiwgKCkgPT4gdGhhdC4kZ3JpZDBQb2h5YnksIEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcyksIC8vUkMgMjQxMDA1MDggOiBWeWJyYXQgdnlob3Z1asOtY8OtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdWNXaXphcmQuY3JlYXRlSXRlbUZvck11bHRpTWVudShcImFjdFJlbW92ZVN1Y2Nlc3NSZWNvcmRzXCIsIFwianJlczoyNDEwMDUwOVwiLCAoKSA9PiB0aGF0LiRncmlkMFBvaHlieSwgR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzLCBmYWxzZSksIC8vUkMgMjQxMDA1MDkgOiBacnXFoWl0IHZ5aG92dWrDrWPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRnVjV2l6YXJkLmNyZWF0ZUl0ZW1Gb3JNdWx0aU1lbnUoXCJhY3RXYXJuaW5nUmVjb3Jkc1wiLCBcImpyZXM6MjQxMDA1MTBcIiwgKCkgPT4gdGhhdC4kZ3JpZDBQb2h5YnksIEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuV2FybmluZyksIC8vUkMgMjQxMDA1MTAgOiBWeWJyYXQgdXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdWNXaXphcmQuY3JlYXRlSXRlbUZvck11bHRpTWVudShcImFjdFJlbW92ZVdhcm5pbmdSZWNvcmRzXCIsIFwianJlczoyNDEwMDUxMVwiLCAoKSA9PiB0aGF0LiRncmlkMFBvaHlieSwgR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5XYXJuaW5nLCBmYWxzZSksIC8vUkMgMjQxMDA1MTEgOiBacnXFoWl0IHVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRnVjV2l6YXJkLmNyZWF0ZUl0ZW1Gb3JNdWx0aU1lbnUoXCJhY3RVblN1Y2Nlc3NSZWNvcmRzXCIsIFwianJlczoyNDEwMDUxMlwiLCAoKSA9PiB0aGF0LiRncmlkMFBvaHlieSwgR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvciksIC8vUkMgMjQxMDA1MTIgOiBWeWJyYXQgbmV2eWhvdnVqw61jw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1Y1dpemFyZC5jcmVhdGVJdGVtRm9yTXVsdGlNZW51KFwiYWN0UmVtb3ZlVW5TdWNjZXNzUmVjb3Jkc1wiLCBcImpyZXM6MjQxMDA1MTNcIiwgKCkgPT4gdGhhdC4kZ3JpZDBQb2h5YnksIEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3IsIGZhbHNlKSAvL1JDIDI0MTAwNTEzIDogWnJ1xaFpdCBuZXZ5aG92dWrDrWPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Jvd3NDaGVja0VuYWJsZWQ6ICgpID0+IHsgcmV0dXJuIGZhbHNlOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB1cHJhdml0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcImFjX2FnXCIsIFwiYWNcIiwgXCJpY29fZXN1XCIsIFwicmNfZXN1XCIsIFwibmF6ZXZfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlBvaHliLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCwgR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFNlelBvaC5WVWN0b3ZhbmksIHRydWUsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJkdWN0X2tpbmQsZHVjdF90eHRfZXJyLFwiICsgKHRoYXQuQ29sdW1uTGlzdCA/PyBcIml4cF91cHIscmFkZWtfdXBvLHR5cF91cG9fdHh0LHNfdXBvX3R4dCxzX3N0b190eHQsa3RnX3Vwb190eHQsem5hbV90eHQsY191cG8scG9waXNfdXBvLHN1Ympla3QubmF6ZXYsZGF0X3VwbyxkYXRfemF1YyxvYmRfZGFuLHN1YnJhZGFfZHV6LHByaXpfZGRfdHh0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXJzT25UYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVudG8ga3JvayBqZSBiZXogYWtjw60gdiBtZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1lbnVCYXIoW10pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmcOtcGFkbsOpIGZsYXNoZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRnVjV2l6YXJkLnNob3dXYXJuaW5nRmxhc2godGhhdC5XYXJuaW5nWktvbnRyb2x5LCBjbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRnVjV2l6YXJkLnNob3dJbmZvRmxhc2godGhhdC5JbmZvWktvbnRyb2x5LCBjbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHDFmWlkYXQgdmVkbGUgdGxhxI3DrXRrYSBEYWzFocOtIHRsYcSNw610a28gWnJ1xaFpdCAodml6LiBVQ1QpPyBOZWJvIHZsZXZvIGRvbGU/XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFwbG7Em27DrSB0YWJ1bGt5IHBvaHlixa8gKGtvbnRyb2xhIHXFviBieWxhIHNwdcWhdMSbbmEgcMWZZWQgc3B1xaF0xJtuw61tIHByxa92b2RjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWRQb2h5YnkwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGNudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6IHBydm7DrWhvIGtyb2t1IGplIHDFmcOtcHJhdmEgw7rEjXRvdsOhbsOtIHbFvmR5IGtvbXBsZXRuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5wcmlwcmF2YVBydm5pID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hhbmdlLnN0ZXBzRW5hYmxlWzFdID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBwb3ZvbGVuw60gamVkbm90bGl2w71jaCBrcm9rxa8gKGplIG51dG7DqSBrdsWvbGkgb3Bha292YW7DqW11IHDFmWVjaG9kdSBuYSBkYWzFocOtIGtyb2spXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNhdmVTdGVwSW5mbyhudWxsLyp3aXphcmQqLywgY2hhbmdlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6bcSbbmEgZsOhemVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmNoYW5nZUZhemUoY250LCBjaGFuZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGF0LmNoZWNrUGFyYW1ldGVycyhjbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBwb2RsZSB2w71zbGVka3Uga29udHJvbHkgamUgbmVibyBuZW7DrSBtb8W+bsOpIHBva3JhxI1vdmF0IG5hIGRhbMWhw60ga3Jva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjaGFuZ2Uuc3RlcHNFbmFibGVbMV0gPSAhIXJldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW3sgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0WmF1Y3RvdmF0T2Rsb3plbmUgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRCYXI6IHsgbmV4dDogXCJqcmVzOjI0MTAwMTY1XCIgfSAvL1JDIDI0MTAwMTY1IDogRGFsxaHDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmw6F6ZSAxIC0gcMWZw61wcmF2YSDDusSNZXRuw61jaCB6w6FwaXPFryB2xI1ldG7EmyBtb8W+bm9zdGkgw7pwcmF2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDEwMDQ2M1wiLCAvL1JDIDI0MTAwNDYzIDogTsOhdnJoIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF1dFN0ZXAyID0gdGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0RGVmPGJvb2xlYW4+KFwiR2xvYmFsLkZ1Yy5BcHBTZXR0aW5ncy5VY3RVcG9TZXR0aW5nc0Zvcm0uVWN0V2l6YXJkU3RlcDAyXCIsIHRydWUpID8/IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXV0U3RlcDIgJiYgY2hhbmdlPy50YXNrPy50YXNrT24gPT09IGZhbHNlICYmIGNoYW5nZT8udGFzaz8ubmV4dFN0ZXAgPT09IDEgJiYgdGhhdC5GYXplID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXV0b21hdGlja8O9IHDFmWVjaG9kIG5hIGbDoXppIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LkF1dFN0ZXAxdG8yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LndpemFyZC5zZXRTdGVwKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5BdXRTdGVwMXRvMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC4kZ3JpZDFQb2h5YnkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZDFaYXBpc3lQb2h5YnUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlBvdm9sZW5hRWRpdGFjZVphcGlzdSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Tb3J0ZWRDZnVTZXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpLmdldEJhc2VDZnVTZXQodGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5HcmlkRm9ybWF0WmFwaXN5UG9oeWJ1ID0gRnVjR3JpZC5aYXBpcy5jcmVhdGVHcmlkRm9ybWF0KHRoYXQsIHRydWUsIHRydWUsIHRoYXQuSWNvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1Y2hvdsOhbsOtIGluZm9ybWFjw60gbyBwcsWvYsSbaHUgcHLFr3ZvZGNlIGEgemFrw6F6w6Fuw60gKGRvxI1hc27DqT8pIGtyb2vFryBvIHbDrWNlIG5lxb4gamVkZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNhdmVTdGVwSW5mbyh0aGF0LndpemFyZCwgY2hhbmdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBza3J5dMOtIHDFmcOtcGFkbsO9Y2ggZmxhc2jFryB6IG1pbnVsw6lobyBrcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1Y1dpemFyZC5oaWRlRXJyb3JGbGFzaChjbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1Y1dpemFyZC5oaWRlV2FybmluZ0ZsYXNoKGNudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRnVjV2l6YXJkLmhpZGVJbmZvRmxhc2goY250KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlsdHJ5IHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RmlsdHJQb2h5YnUhLmNoZWNrZWQodGhhdC5GaWx0cnlQb2h5YnUxLnphcF9zZV96YXBpc3kgPT09IHRydWUgfHwgdGhhdC5GaWx0cnlQb2h5YnUxLnphcF9iZXpfemFwaXN1ID09PSB0cnVlIHx8IHRoYXQuRmlsdHJ5UG9oeWJ1MS56YXBfbmV2eXJvdm5hbmVfemFfbmtzID09PSB0cnVlIHx8IHRoYXQuRmlsdHJ5UG9oeWJ1MS56YXBfbmV2eXJvdm5hbmVfYmV6X25rcyA9PT0gdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWVobGVkIHBhcmFtZXRyxa8geiBwcnZuw61obyBrcm9rdSAoemplZG5vZHXFoWVuw70sIG5lZWRpdG92YXRlbG7DvSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm1QYXJhbWV0cnkoY29udGVudERpdiwgY2hhbmdlLmFjdGl2ZVN0ZXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXpuYW0gcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkdGFiUG9oeWJ5ID0gJC5uZXdEaXYoKS5hcHBlbmRUbyhjb250ZW50RGl2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWeWJyYW7DqSBwb2h5YnlcIiwgb3BlbmVkOiB0cnVlLyosIGxvY2tlZDogdHJ1ZSovLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsUG9oeWJ1LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T3ByYXZhUG9oeWJ1LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RmlsdHJQb2h5YnUsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbygkdGFiUG9oeWJ5KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxXCIpLmFkZFNlY3Rpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZDFQb2h5YnkgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkdGFiUG9oeWJ5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWQxUG9oeWJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHVwcmF2aXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcImFjX2FnXCIsIFwiYWNcIiwgXCJpY29fZXN1XCIsIFwicmNfZXN1XCIsIFwibmF6ZXZfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5Qb2h5Yi5jcmVhdGVHcmlkRm9ybWF0KHRoYXQsIEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBTZXpQb2guVlVjdG92YW5pLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogdGhhdC5Db2x1bW5MaXN0ID8/IFwiaXhwX3VwcixyYWRla191cG8sdHlwX3Vwb190eHQsc191cG9fdHh0LHNfc3RvX3R4dCxrdGdfdXBvX3R4dCx6bmFtX3R4dCxjX3Vwbyxwb3Bpc191cG8sc3ViamVrdC5uYXpldixkYXRfdXBvLGRhdF96YXVjLG9iZF9kYW4sc3VicmFkYV9kdXoscHJpel9kZF90eHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gesOhcGlzxa8gYWt0dcOhbG7DrWhvIHBvaHlidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouY2VsbEluZm8pIHRoYXQubG9hZFphcGlzeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlem5hbSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkdGFiWmFwaXN5ID0gJC5uZXdEaXYoKS5hcHBlbmRUbyhjb250ZW50RGl2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJaw6FwaXN5IHBvaHlidVwiLCBvcGVuZWQ6IHRydWUvKiwgbG9ja2VkOiB0cnVlKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3ROb3Z5WmFwaXMsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPcHJhdmFaYXBpc3UsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuZW5pWmFwaXN1IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbygkdGFiWmFwaXN5KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxXCIpLmFkZFNlY3Rpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmxhc2ggcHJvIGluZm9ybWFjZSBvIG1vxb5ub3N0aSBuZWVkaXRvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZDFaYXBpc3lQb2h5YnVGbGFzaCA9ICQubmV3RGl2KCkuYXBwZW5kVG8oJHRhYlphcGlzeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZDFaYXBpc3lQb2h5YnUgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkdGFiWmFwaXN5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcGlzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWQxWmFwaXN5UG9oeWJ1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHVwcmF2aXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcImFjX2FnXCIsIFwiYWNcIiwgXCJpY29fZXN1XCIsIFwicmNfZXN1XCIsIFwibmF6ZXZfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5HcmlkRm9ybWF0WmFwaXN5UG9oeWJ1LypGdWNHcmlkLlphcGlzLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCwgdHJ1ZSkqLyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAvLyByb3csIGNlbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlQmVmb3JlQ2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIHNlIGVkaXR1amUsIG5lanNvdSBwb3ZvbGVueSB6bcSbbnkgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhhdC4kZ3JpZDFaYXBpc3lQb2h5YnU/LmZpbmQoXCIucm93LmVkaXRpbmdcIik/Lmxlbmd0aCA/PyAwKSA8IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZUNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbmZvcm1hY2UgKHZhcm92w6Fuw60pLCBwb2t1ZCB6bcSbbmEgdiBwcm9maWx1IG3Fr8W+ZSB6cMWvc29iaXQgbmVtb8W+bm9zdCBlZGl0YWNlLiB2IHRha292w6ltIHDFmcOtcGFkxJsgbmVuw60gcG92b2xlbmEgZWRpdGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LiRncmlkMVphcGlzeVBvaHlidSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlBvdm9sZW5hRWRpdGFjZVphcGlzdSA9IEdvcmRpYy5Fa28uR3JpZC5pc1N0YXRlRm9yRWRpdGluZyh0aGF0LiRncmlkMVphcGlzeVBvaHlidSwgb2JqLCB0cnVlLCB0aGF0LiRncmlkMVphcGlzeVBvaHlidUZsYXNoLCB1bmRlZmluZWQsIHRoYXQuR3JpZEZvcm1hdFphcGlzeVBvaHlidSwgdGhhdC5Tb3J0ZWRDZnVTZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgcHJ2a8WvIHBvZGxlIGFrdHXDoWxuxJsgdnlicmFuw6lobyDFmcOhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5jZWxsSW5mbykgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkcm93ZWRpdG9yPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBpc0R0byAmIHsgbm92eV96YXBpcz86IGJvb2xlYW4gfT4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dDb3B5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVmb3JlU3RhcnQ6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG92b2xlbsOtIGVkaXRhY2Ugc2UgxZnDrWTDrSBzdGF2ZW0gZ3JpZHUgYSBwb3ZvbGVuw61tIHDFmcOtc2x1xaFuw6kgYWtjZSBuYSBub3bDvSB6w6FwaXMgbmVibyBvcHJhdnUgesOhcGlzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LlBvdm9sZW5hRWRpdGFjZVphcGlzdSAmJiAodGhhdC5hY3Rpb25zLmFjdE5vdnlaYXBpcyEuZW5hYmxlZCgpIHx8IHRoYXQuYWN0aW9ucy5hY3RPcHJhdmFaYXBpc3UhLmVuYWJsZWQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IChldiwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHBydmvFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZTogZnVuY3Rpb24gKGRhdGEsIGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1bG/FvmVuw60gem3Em25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC51bG96ZW5pWmFwaXN1KChkYXRhLm5vdnlfemFwaXMgPT09IHRydWUpLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXQ6IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpub3Z1bmHEjXRlbsOtIHNlem5hbXUgKGt2xa9saSBtb8W+bsOpIHptxJtuxJsgcG9oeWJ1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZFBvaHlieTEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkWmFwaXN5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogKGV2LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgcHJ2a8WvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXJzT25UYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5nYXV0b2ZpdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcHXFoXTEm27DrSBwcnZuw60gZsOhemUgw7rEjXRvdsOhbsOtIChnZW5lcm92w6Fuw60gesOhcGlzxa8gYSBwxZnDrXByYXZhIGRva2xhZMWvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWRQb2h5YnkxKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhhdC5pc2wuRmluUG9oeWIubGlzdChycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IHsgZHVjdF9hbm86IDAsIGR1Y3RfaWtjOiB0aGF0LklrYywgZHVjdF91bmNoZWNrOiAwLCBzX3VwbzogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVcG8uVlVjdG92YW5pIH0gfTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIFRPRE86IGRvcGxuaXQgc3Byw6F2bsO9IGtsw63EjSBwb2RsZSB0eXB1LCBhbGUgamVzdGxpIGplIHYgcMWZw61wYWTEmyBkb2tsYWR1IHbFr2JlYyBuxJtqYWvDvSB1bmlrw6F0bsOtIHByaW3DoXJuw60ga2zDrcSNXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YS8qLCB7IGtleTogXCJpeHBfdXByLHJhZGVrX3Vwb1wiIH0qLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LiRncmlkMVBvaHlieS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIG5hc3RhdmVuw60gcMWZw61zdHVwbm9zdGkgYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBUT0RPOiBwb2RvYm7EmyB1ZMSbbGF0IGRhbMWhw60gYWtjZSBuYSBzZXpuYW1lY2ggKG5hcMWZLiB6b2JyYXplbsOtIGRldGFpbHUgYSBwb2QuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3RoYXQuYWN0aW9ucy5wcmV2b2RBY3QuZW5hYmxlZChkYXRhLmxlbmd0aCA+IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5bWF6w6Fuw60gZmlsdHLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5GaWx0cnlQb2h5YnUxID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RmlsdHJQb2h5YnUhLmNoZWNrZWQoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gcG92b2xlbsOtIGplZG5vdGxpdsO9Y2gga3Jva8WvIChqZSBudXRuw6kga3bFr2xpIG9wYWtvdmFuw6ltdSBwxZllY2hvZHUgbmEgZGFsxaHDrSBrcm9rKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zYXZlU3RlcEluZm8obnVsbCwgY2hhbmdlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6bcSbbmEgZsOhemVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmNoYW5nZUZhemUoY250LCBjaGFuZ2UsIHRoYXQuQXV0U3RlcDF0bzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RaYXVjdG92YXRPZGxvemVuZSB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZEJhcjogeyBuZXh0OiBcImpyZXM6MjQxMDAxNjVcIiB9IC8vUkMgMjQxMDAxNjUgOiBEYWzFocOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDIgLSBwxZnDrXByYXZhIGRva2xhZMWvIGEgamVqaWNoIHphw7rEjXRvdsOhbsOtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDA0NjRcIiwgLy9SQyAyNDEwMDQ2NCA6IERva2xhZHkgayB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5BdXRTdGVwMXRvMiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWNob3bDoW7DrSBpbmZvcm1hY8OtIG8gcHLFr2LEm2h1IHByxa92b2RjZSBhIHpha8OhesOhbsOtIChkb8SNYXNuw6k/KSBrcm9rxa8gbyB2w61jZSBuZcW+IGplZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNhdmVTdGVwSW5mbyh0aGF0LndpemFyZCwgY2hhbmdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNrcnl0w60gcMWZw61wYWRuw71jaCBmbGFzaMWvIHogbWludWzDqWhvIGtyb2t1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdWNXaXphcmQuaGlkZUVycm9yRmxhc2goY250KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1Y1dpemFyZC5oaWRlV2FybmluZ0ZsYXNoKGNudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdWNXaXphcmQuaGlkZUluZm9GbGFzaChjbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWVobGVkIHBhcmFtZXRyxa8geiBwcnZuw61obyBrcm9rdSAoemplZG5vZHXFoWVuw70sIG5lZWRpdG92YXRlbG7DvSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybVBhcmFtZXRyeShjb250ZW50RGl2LCBjaGFuZ2UuYWN0aXZlU3RlcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V6bmFtIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHRhYkRva2xhZHkgPSAkLm5ld0RpdigpLmFwcGVuZFRvKGNvbnRlbnREaXYpLmd0YWIoeyB0aXRsZTogXCJqcmVzOjI0MTAwNDY2XCIsIG9wZW5lZDogdHJ1ZS8qLCBsb2NrZWQ6IHRydWUqLyB9KTsgLy9SQyAyNDEwMDQ2NiA6IERva2xhZHkgcMWZaXByYXZlbsOpIGsgemHDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8oJHRhYkRva2xhZHkpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzFcIikuYWRkU2VjdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQyRG9rbGFkeSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJHRhYkRva2xhZHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkMkRva2xhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHVwcmF2aXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wiYWNfYWdcIiwgXCJhY1wiLCBcImljb19lc3VcIiwgXCJyY19lc3VcIiwgXCJuYXpldl9lc3VcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuWmFwaXMuY3JlYXRlR3JpZEZvcm1hdERva2xhZHkodHJ1ZS8qLCB0cnVlKi8pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gesOhcGlzxa8gYWt0dcOhbG7DrWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouY2VsbEluZm8pIHRoYXQubG9hZFphcGlzeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVyc09uVGFiOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlem5hbSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR0YWJaYXBpc3kgPSAkLm5ld0RpdigpLmFwcGVuZFRvKGNvbnRlbnREaXYpLmd0YWIoeyB0aXRsZTogXCJaw6FwaXN5IGRva2xhZHVcIiwgb3BlbmVkOiB0cnVlLyosIGxvY2tlZDogdHJ1ZSovIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbygkdGFiWmFwaXN5KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxXCIpLmFkZFNlY3Rpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkMlphcGlzeURva2xhZHUgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCR0YWJaYXBpc3kpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBpc0R0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWQyWmFwaXN5RG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJhY19hZ1wiLCBcImFjXCIsIFwiaWNvX2VzdVwiLCBcInJjX2VzdVwiLCBcIm5hemV2X2VzdVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5aYXBpcy5jcmVhdGVHcmlkRm9ybWF0KHRoYXQsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVyc09uVGFiOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmdhdXRvZml0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVudG8ga3JvayBqZSBiZXogYWtjw60gdiBtZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1lbnVCYXIoW10pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuw60gZG9rbGFkxa8gKHXFviBieWx5IHDFmWlwcmF2ZW55IHYgbWludWzDqW0ga3Jva3UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmF6ZTJEb2tsYWR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkRG9rbGFkeTIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoYXQuaXNsLlphcGlzLmxpc3REb2tsYWR1KHJxID0+IHsgcmV0dXJuIHsgZmlsdGVyczogeyB2X3VjdG92YW5pOiAwLCB0eXBfdWN0b3Zhbmk6IHRoYXQuVHlwVWN0b3ZhbmksIGlrYzogdGhhdC5Ja2MgfSB9OyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBwb2hsZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBUT0RPOiBkb3Bsbml0IHNwcsOhdm7DvSBrbMOtxI0gcG9kbGUgdHlwdSwgYWxlIGplc3RsaSBqZSB2IHDFmcOtcGFkxJsgZG9rbGFkdSB2xa9iZWMgbsSbamFrw70gdW5pa8OhdG7DrSBwcmltw6FybsOtIGtsw63EjVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YS8qLCB7IGtleTogXCJpeHBfdXByLHJhZGVrX3Vwb1wiIH0qLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC4kZ3JpZDJEb2tsYWR5LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBuYXN0YXZlbsOtIHDFmcOtc3R1cG5vc3RpIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBUT0RPOiBwb2RvYm7EmyB1ZMSbbGF0IGRhbMWhw60gYWtjZSBuYSBzZXpuYW1lY2ggKG5hcMWZLiB6b2JyYXplbsOtIGRldGFpbHUgYSBwb2QuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5hY3Rpb25zLnByZXZvZEFjdC5lbmFibGVkKGRhdGEubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3JldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGNudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBwb3ZvbGVuw60gamVkbm90bGl2w71jaCBrcm9rxa8gKGplIG51dG7DqSBrdsWvbGkgb3Bha292YW7DqW11IHDFmWVjaG9kdSBuYSBkYWzFocOtIGtyb2spXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNhdmVTdGVwSW5mbyhudWxsLCBjaGFuZ2UsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHptxJtuYSBmw6F6ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuY2hhbmdlRmF6ZShjbnQsIGNoYW5nZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFt7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFphdWN0b3ZhdE9kbG96ZW5lIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kQmFyOiB7IG5leHQ6IFwianJlczoyNDEwMDE1M1wiIH0gLy9SQyAyNDEwMDE1MyA6IFphw7rEjXRvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDMgLSB6b2JyYXplbsOtIHZ5dHZvxZllbsO9Y2ggZG9rbGFkxa8gbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB6ZGUgc2UgbXVzw60gxZllxaFpdCBlw5rEjWV0bmljdHbDrSwgcHJvdG/FvmUgdiB0b20gcMWZw61wYWTEmyB6ZGUgYnVkZSBqZW4gaW5mb3JtYWNlIG8gdG9tLCDFvmUgdG8gYnlsbyBwb3Nsw6FubyBrIMO6xI10b3bDoW7DrSBkbyBVQ1RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwNDY1XCIsIC8vUkMgMjQxMDA0NjUgOiDDmsSNZXRuw60gesOhcGlzeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9sYWRpdCBwb2Rtw61ua3ksIGtkeSBzZSBvYmVjbsSbIG5lbcOhIGTEm2xhdCBpbmljaWFsaXphY2Uga3Jva3UgKHRvaG90byBhIG9zdGF0bsOtY2gpIC0gbcOhIHRvIGLDvXQgcMWZaSBuZXh0U3RlcCAhPSBhY3RpdmVTdGVwIG5lYm8gamluZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY2hhbmdlPy50YXNrPy50YXNrT24gPT09IHRydWUgJiYgY2hhbmdlPy50YXNrPy5uZXh0U3RlcCA9PT0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZW50byBrcm9rIGJ5IHNlIG5lbcSbbCBpbmljaWFsaXpvdmF0LCBwb8W+ZWRhdmVrIGplIG5hIGRydWjDvSBrcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWNob3bDoW7DrSBpbmZvcm1hY8OtIG8gcHLFr2LEm2h1IHByxa92b2RjZSBhIHpha8OhesOhbsOtIChkb8SNYXNuw6k/KSBrcm9rxa8gbyB2w61jZSBuZcW+IGplZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zYXZlU3RlcEluZm8odGhhdC53aXphcmQsIGNoYW5nZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2tyeXTDrSBwxZnDrXBhZG7DvWNoIGZsYXNoxa8geiBtaW51bMOpaG8ga3Jva3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdWNXaXphcmQuaGlkZUVycm9yRmxhc2goY250KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdWNXaXphcmQuaGlkZVdhcm5pbmdGbGFzaChjbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZ1Y1dpemFyZC5oaWRlSW5mb0ZsYXNoKGNudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJleiB0bGHEjcOtdGthIHpydcWhaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYWN0aW9ucz8uYWN0Q2FuY2VsPy52aXNpYmxlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZZWhsZWQgcGFyYW1ldHLFryB6IHBydm7DrWhvIGtyb2t1ICh6amVkbm9kdcWhZW7DvSwgbmVlZGl0b3ZhdGVsbsO9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybVBhcmFtZXRyeShjb250ZW50RGl2LCBjaGFuZ2UuYWN0aXZlU3RlcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlem5hbSBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkdGFiRG9rbGFkeSA9ICQubmV3RGl2KCkuYXBwZW5kVG8oY29udGVudERpdilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyNDEwMDQ1MlwiLCBvcGVuZWQ6IHRydWUvKiwgbG9ja2VkOiB0cnVlKi8sIC8vUkMgMjQxMDA0NTIgOiBEb2tsYWR5IG8gemHDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFRpc2tEb2tsYWR1LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VGlza1ZzZWNoRG9rbGFkdSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERva2xhZE9aYXVjdG92YW5pLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiVGlza1wiLCB0eXBlOiBcInN0YXRpY1wiLCBpY29uOiBHaW4uSWNvbnMuQWN0aW9uRW51bS50aXNrLCBmYXZvcml0ZTogdHJ1ZSwgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RUaXNrRG9rbGFkdSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFRpc2tWc2VjaERva2xhZHUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbygkdGFiRG9rbGFkeSkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMVwiKS5hZGRTZWN0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQzRG9rbGFkeSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCR0YWJEb2tsYWR5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR0Rva2xhZER0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkM0Rva2xhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wiYWNfYWdcIiwgXCJhY1wiLCBcImljb19lc3VcIiwgXCJyY19lc3VcIiwgXCJuYXpldl9lc3VcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlphcGlzLmNyZWF0ZUdyaWRGb3JtYXREb2tsYWR5KHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSB6w6FwaXPFryBha3R1w6FsbsOtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouY2VsbEluZm8pIHRoYXQubG9hZFphcGlzeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlem5hbSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkdGFiWmFwaXN5ID0gJC5uZXdEaXYoKS5hcHBlbmRUbyhjb250ZW50RGl2KS5ndGFiKHsgdGl0bGU6IFwiWsOhcGlzeSBkb2tsYWR1XCIsIG9wZW5lZDogdHJ1ZS8qLCBsb2NrZWQ6IHRydWUqLyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKCR0YWJaYXBpc3kpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzFcIikuYWRkU2VjdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkM1phcGlzeURva2xhZHUgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkdGFiWmFwaXN5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcGlzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWQzWmFwaXN5RG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB1cHJhdml0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJhY19hZ1wiLCBcImFjXCIsIFwiaWNvX2VzdVwiLCBcInJjX2VzdVwiLCBcIm5hemV2X2VzdVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuWmFwaXMuY3JlYXRlR3JpZEZvcm1hdCh0aGF0LCBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXJzT25UYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5nYXV0b2ZpdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbsOtIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmZhemUzWmF1Y3RvdmFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWREb2tsYWR5MygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGF0LmlzbC5aYXBpcy5saXN0RG9rbGFkdShycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IHsgdHlwX3VjdG92YW5pOiB0aGF0LlR5cFVjdG92YW5pLCBpa2M6IHRoYXQuSWtjIH0gfTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiBkb3Bsbml0IHNwcsOhdm7DvSBrbMOtxI0gcG9kbGUgdHlwdSwgYWxlIGplc3RsaSBqZSB2IHDFmcOtcGFkxJsgZG9rbGFkdSB2xa9iZWMgbsSbamFrw70gdW5pa8OhdG7DrSBwcmltw6FybsOtIGtsw63EjVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLyosIHsga2V5OiBcIml4cF91cHIscmFkZWtfdXBvXCIgfSovKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC4kZ3JpZDNEb2tsYWR5LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gcMWZw61zdHVwbm9zdGkgYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogcG9kb2JuxJsgdWTEm2xhdCBkYWzFocOtIGFrY2UgbmEgc2V6bmFtZWNoIChuYXDFmS4gem9icmF6ZW7DrSBkZXRhaWx1IGEgcG9kLilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdGhhdC5hY3Rpb25zLnByZXZvZEFjdC5lbmFibGVkKGRhdGEubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gcG92b2xlbsOtIGplZG5vdGxpdsO9Y2gga3Jva8WvIChqZSBudXRuw6kga3bFr2xpIG9wYWtvdmFuw6ltdSBwxZllY2hvZHUgbmEgZGFsxaHDrSBrcm9rKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zYXZlU3RlcEluZm8obnVsbCwgY2hhbmdlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6bcSbbmEgZsOhemVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmNoYW5nZUZhemUoY250LCBjaGFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVrb27EjWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKGNudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWxvxb5lbsOtIGhpc3RvcmllIGEgdWtvbsSNZW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC50cnlDbG9zZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVsb8W+ZW7DrSBoaXN0b3JpZSBhIHVrb27EjWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQudHJ5Q2xvc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LlVrb25jZW5vQ2h5Ym91ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtIHByxa92b2RjZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm3Em25hIGbDoXplXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY250IGNvbnRlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge09HV2l6YXJkQ2hhbmdlfSBjaGFuZ2UgaW5mb3JtYWNlIG8gZsOhesOtY2hcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFthdXRTdGVwMXRvMl0gamRlIG8gYXV0b21hdGlja8O9IHDFmWVjaG9kIHoga3Jva3UgMSBuYSAyP1xyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkIHwgSlF1ZXJ5LlByb21pc2U8YW55Pn0gcMWZw61wYWRuw70gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRmF6ZShjbnQ6IEdDb250ZW50LCBjaGFuZ2U6IE9HV2l6YXJkQ2hhbmdlLCBhdXRTdGVwMXRvMj86IGJvb2xlYW4pOiB2b2lkIHwgSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3RTdGVwID0gdGhhdC5QcmlwcmF2ZW5hRmF6ZSAhPSBudWxsID8gdGhhdC5QcmlwcmF2ZW5hRmF6ZSA6IGNoYW5nZS5hY3RpdmVTdGVwO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0U3RlcCA9ICh0eXBlb2YgY2hhbmdlLnRhc2submV4dFN0ZXAgPT09IFwidW5kZWZpbmVkXCIgPyBjaGFuZ2UuYWN0aXZlU3RlcCA6IGNoYW5nZS50YXNrLm5leHRTdGVwKTtcclxuICAgICAgICAgICAgaWYgKGFjdFN0ZXAgPT09IG5leHRTdGVwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyBrb250cm9sYSBwxZllY2hvZHUgbmEgdnpkw6FsZW7Em2rFocOtIGtyb2sgKHBvZGxlIG5hc3RhdmVuw60gdiBjaGFuZ2UpXHJcbiAgICAgICAgICAgIC8vIHBvem7DoW1rYTogbmV2cmFjw60gc2UgcHJvbWlzZSwgYWJ5IHNlIHpvYnJhemlsYSBobMOhxaFrYSwgxb5lIGtyb2sgbmVuw60gZG9zdHVwbsO9XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2Uuc3RlcHNFbmFibGVbbmV4dFN0ZXBdID09PSBmYWxzZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgLy8gcG9rdWQgdnN0dXB1amkgZG8gamnFviBwxZlpcHJhdmVuw6kgZsOhemUsIHRhayBuZW7DrSBwb3TFmWViYSBuaWMgZMSbbGF0XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBwxZlpZGF0IHRleHQgZsOhemUgKGtvc3RpxI1reSlcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHpvYnJhenVqw60gc2UgY2h5YnkgKHRleHR5IGNoeWIpLCBrZHnFviB0byBwYWRuZSBwxZlpIHDFmWVjaG9kdSBuYSBkYWzFocOtIGtyb2s/XHJcblxyXG4gICAgICAgICAgICBsZXQgbmVlZFJldmVyc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHJldlN0ZXAgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXh0U3RlcCA+IGFjdFN0ZXApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBzbcSbciB2cMWZZWRcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChlcnI6IEdFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lZWRSZXZlcnNlICYmIChuZXh0U3RlcCA9PT0gMSB8fCAobmV4dFN0ZXAgPiAxICYmIGFjdFN0ZXAgPCAxKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmcOtcHJhdmEgesOhcGlzxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtvbnRyb2xhIHBhcmFtZXRyxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmNoZWNrUGFyYW1ldGVyc0FuZFNhdmVDaGVjayhjbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC51Y3RvdmFuaVdpemFyZCgxLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcmlwcmF2ZW5hRmF6ZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyOiBHRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVlZFJldmVyc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZTdGVwID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChlcnI6IEdFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lZWRSZXZlcnNlICYmIChuZXh0U3RlcCA9PT0gMiB8fCAobmV4dFN0ZXAgPiAyICYmIGFjdFN0ZXAgPCAyKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmcOtcHJhdmEgZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnVjdG92YW5pV2l6YXJkKDIsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByaXByYXZlbmFGYXplID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnI6IEdFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWVkUmV2ZXJzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldlN0ZXAgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGVycjogR0Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmVlZFJldmVyc2UgJiYgKG5leHRTdGVwID09PSAzIHx8IChuZXh0U3RlcCA+IDMgJiYgYWN0U3RlcCA8IDMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemHDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRmlsdHJ5UG9oeWJ1MSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQudWN0b3ZhbmlXaXphcmQoMywgMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJpcHJhdmVuYUZhemUgPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycjogR0Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRSZXZlcnNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2U3RlcCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZXJyOiBHRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZWRSZXZlcnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBieWxhIGNoeWJhIHYgcG/FvmFkb3ZhbsOpbSBzbcSbcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LkZpbHRyeVBvaHlidTEuemFwX3ZldGEgIT0gbnVsbCAmJiB0aGF0LkZpbHRyeVBvaHlidTFbXCJ6YXBfdmV0YV90eHRcIl0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U3RlcCA9PT0gMyAmJiByZXZTdGVwID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3Muc2hvd0V4Y2VwdGlvbihlcnIpPy5jcmVhdGVEaWFsb2dQcm9taXNlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LlpvYnJheml0UG9oeWJ5U0NoeWJub3VWZXRvdSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2U3RlcCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LkZpbHRyeVBvaHlidTFbXCJ6YXBfc2VfemFwaXN5XCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGF0LlpvYnJheml0UG9oeWJ5U0NoeWJub3VWZXRvdSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiQ2hjZXRlIHByxa92b2RjZSBwxZllcG5vdXQgbmEgZHJ1aMO9IGtyb2sgYSB6b2JyYXppdCBwb3V6ZSBwb2h5YnkgbWFqw61jw60gesOhcGlzeSBzIHbEm3RvdSB7MH0/XCIuZm9ybWF0KHRoYXQuRmlsdHJ5UG9oeWJ1MVtcInphcF92ZXRhX3R4dFwiXSEpLCA2MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoR0RsZy5tYmJZZXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldlN0ZXAgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5GaWx0cnlQb2h5YnUxW1wiemFwX3NlX3phcGlzeVwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4geyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGVycjogR0Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGF0LkZpbHRyeVBvaHlidTFbXCJ6YXBfdmV0YV90eHRcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlamVjdCBuZWJvIHJlc29sdmUgcG9kbGUgdG9obywgamVzdGxpIHYgcG/FvmFkb3ZhbsOpbSBzbcSbcnUgbmFzdGFsYSBjaHliYSBuZWJvIG5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWVkUmV2ZXJzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnlsYSBjaHliYSB2IHBvxb5hZG92YW7DqW0gc23Em3J1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV2U3RlcCAhPT0gYWN0U3RlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWkgcG9zdHVwdSBvIHbDrWNlIGtyb2vFryBzZSBuYXN0YXbDrSBwb3NsZWRuw60gYmV6Y2h5Ym7DvSBrcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC53aXphcmQuc2V0U3RlcChyZXZTdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaHliYSBzZSBuZXZyYWPDrSAodG8gYnkgemFzdGF2aWxvIHDFmWVzdW4gbmEgcG9zbGVkbsOtIHByb3ZlZGVuw70ga3JvayksIGFsZSBqZW4gc2UgemRlIHpvYnJhesOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHRoYXQuZGlhbG9ncy5zaG93RXhjZXB0aW9uKGVycik/LmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWkgcG9zdHVwdSBvIGplZGVuIGtyb2sgc2UgdnJhY8OtIGNoeWJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1dFN0ZXAxdG8yID09PSB0cnVlICYmIGFjdFN0ZXAgPT09IDEgJiYgbmV4dFN0ZXAgPT09IDIgJiYgcmV2U3RlcCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaHliYSBieWxhIHDFmWkgYXV0b21hdGlja8OpbSBwb3N1bnUgeiAxIG5hIDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC53aXphcmQuc2V0U3RlcCgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2h5YmEgc2UgbmV2cmFjw60gKHRvIGJ5IHphc3RhdmlsbyBuYXN0YXZlbsOtIGtyb2t1KSwgYWxlIGplbiBzZSB6ZGUgem9icmF6w61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHRoYXQuZGlhbG9ncy5zaG93RXhjZXB0aW9uKGVycik/LmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFjdFN0ZXAgPT09IDEgJiYgcmV2U3RlcCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcGVjaWFsaXRhIHBybyBrcm9rIDEsIHByb3Rvxb5lIGplIHBvdMWZZWJhIHNlem5hbSBwxZllc2VsZWt0b3ZhdCBrdsWvbGkgcMWZw61wYWRuw71tIGZpbHRyxa9tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWRQb2h5YnkxKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2xaFlIHByb2LEm2hsbyBiZXogY2h5YnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5leHRTdGVwIDwgYWN0U3RlcCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHNtxJtyIHZ6YWRcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChlcnI6IEdFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFN0ZXAgPT09IDIgfHwgKG5leHRTdGVwIDwgMiAmJiBhY3RTdGVwID4gMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmcOtcHJhdmEgZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHNlbSBieSB0byBuZW3Em2xvIGrDrXQsIHByb3Rvxb5lIHogcG9zbGVkbsOtaG8ga3Jva3Ugc2UgbmVkw6EgdnLDoXRpdCB6cMSbdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoYXQudWN0b3ZhbmlXaXphcmQoMiwgMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbmVlZFJldmVyc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldlN0ZXAgPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChlcnI6IEdFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFN0ZXAgPT09IDEgfHwgKG5leHRTdGVwIDwgMSAmJiBhY3RTdGVwID4gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmcOtcHJhdmEgesOhcGlzxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnVjdG92YW5pV2l6YXJkKDEsIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByaXByYXZlbmFGYXplID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnI6IEdFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWVkUmV2ZXJzZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldlN0ZXAgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGVycjogR0Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U3RlcCA9PT0gMCB8fCAobmV4dFN0ZXAgPCAwICYmIGFjdFN0ZXAgPiAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga29udHJvbGEgcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLmpzb3VOZWF1dG9tYXRpY2tlKHsgaWtjOiB0aGF0LklrYyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChleGlzdE5lYXV0b21hdGlja2U6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvIHDFmWVjaG9kIHpwxJt0IHDFmcOtcGFkbsO9IGRvdGF6IG5hIHVsb8W+ZW7DrSB6bcSbbiBwb2h5YsWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdE5lYXV0b21hdGlja2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybShcImpyZXM6MjQxMDAyMTBcIiwgLy9SQyAyNDEwMDIxMCA6IMOaxI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczoyNDEwMDIxMVwiKSAvL1JDIDI0MTAwMjExIDogTmEgbsSba3RlcsO9Y2ggcG9oeWJlY2gganNvdSBydcSNbsSbIHBvxZnDrXplbsOpIHrDoXBpc3kuIENoY2V0ZSB6YWNob3ZhdCB6w6FwaXN5IHTEm2NodG8gcG9oeWLFrz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShbR0RsZy5tYmJZZXMuaWQsIEdEbGcubWJiTm8uaWRdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlphY2hvdmF0UnVjbmlaYXBpc3kgPSAoaWQgPT09IEdEbGcubWJiWWVzLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChpZCA9PT0gR0RsZy5tYmJZZXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7rEjXRvdsOhbsOtIG5lYnVkZSB1a29uxI1lbm8gbmVibyB6w6FwaXN5IG5lYXV0b21hdGlja8O9Y2ggcG9oeWLFryBuZWpzb3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWmFjaG92YXRSdWNuaVphcGlzeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHphY2hOZWF1dG9tYXRpY2tlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgZsOhemVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQudWN0b3ZhbmlXaXphcmQoMCwgMSwgdW5kZWZpbmVkLCB6YWNoTmVhdXRvbWF0aWNrZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByaXByYXZlbmFGYXplID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnI6IEdFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRSZXZlcnNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZTdGVwID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZXJyOiBHRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVqZWN0IG5lYm8gcmVzb2x2ZSBwb2RsZSB0b2hvLCBqZXN0bGkgdiBwb8W+YWRvdmFuw6ltIHNtxJtydSBuYXN0YWxhIGNoeWJhIG5lYm8gbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZWRSZXZlcnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBieWxhIGNoeWJhIHYgcG/FvmFkb3ZhbsOpbSBzbcSbcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXZTdGVwICE9PSBhY3RTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaSBwb3N0dXB1IG8gdsOtY2Uga3Jva8WvIHNlIG5hc3RhdsOtIHBvc2xlZG7DrSBiZXpjaHlibsO9IGtyb2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LndpemFyZC5zZXRTdGVwKHJldlN0ZXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoeWJhIHNlIG5ldnJhY8OtICh0byBieSB6YXN0YXZpbG8gcMWZZXN1biBuYSBwb3NsZWRuw60gcHJvdmVkZW7DvSBrcm9rKSwgYWxlIGplbiBzZSB6ZGUgem9icmF6w61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gdGhhdC5kaWFsb2dzLnNob3dFeGNlcHRpb24oZXJyKT8uY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaSBwb3N0dXB1IG8gamVkZW4ga3JvayBzZSB2cmFjw60gY2h5YmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsWhZSBwcm9ixJtobG8gYmV6IGNoeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG5lbcSbbG8gYnkgbmFzdGF0LCByZXNwLiBhc2kgamVub20gcMWZaSBjaHlixJsgcMWZaSBhdXRvbWF0aWNrw6ltIGtyb2t1IDEtPjJcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIEtvbnRyb2xhIHBvaHlixa8gcMWZZWQgw7rEjXRvdsOhbsOtbSAodm9sYW7DoSBqZW4gcMWZaSBzcHXFoXTEm27DrSBwcsWvdm9kY2UgbmVibyBuYSB0bGHEjcOtdGtvKVxyXG4gICAgICAgIC8vICogXHJcbiAgICAgICAgLy8gKiBAcGFyYW0ge2Jvb2xlYW59IFtwcnZvdG5pXSBwcnZvdG7DrSBrb250cm9sYSBwxZllZCB2eXR2b8WZZW7DrW0gcHLFr3ZvZGNlP1xyXG4gICAgICAgIC8vICogQHBhcmFtIHtib29sZWFufSBbamVuWmFza3J0bnV0ZV0ga29udHJvbG92YXQgamVuIHphxaFrcnRudXTDqSBwb2h5Ynk/XHJcbiAgICAgICAgLy8gKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gcHJvbWlzZVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIGtvbnRyb2xhUHJlZFVjdG92YW5pbShwcnZvdG5pPzogYm9vbGVhbiwgamVuWmFza3J0bnV0ZT86IGJvb2xlYW4pOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgLy8gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyAgICAvLyBvYmpla3QgcHJvIHDFmWVkw6F2w6Fuw60gaG9kbm90XHJcbiAgICAgICAgLy8gICAgaW50ZXJmYWNlIHJldHVybk9ialR5cGUge1xyXG4gICAgICAgIC8vICAgICAgICBkYXRhOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG9bXSB8IG51bGwsXHJcbiAgICAgICAgLy8gICAgICAgIGRhdGFDaGVja2VkOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG9bXSB8IG51bGxcclxuICAgICAgICAvLyAgICB9O1xyXG4gICAgICAgIC8vICAgIGxldCByZXR1cm5PYmo6IHJldHVybk9ialR5cGUgPSB7XHJcbiAgICAgICAgLy8gICAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgICAgLy8gICAgICAgIGRhdGFDaGVja2VkOiBudWxsXHJcbiAgICAgICAgLy8gICAgfTtcclxuXHJcbiAgICAgICAgLy8gICAgLy8ga29udHJvbGEgcG9oeWLFryBwxZllZCDDusSNdG92w6Fuw61tXHJcbiAgICAgICAgLy8gICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHJldHVybk9iaikucHJvbWlzZSgpXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBuZWJvIHDFmWV2emV0w60gZGF0XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAocHJ2b3RuaSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi5saXN0KHJxID0+IHsgcmV0dXJuIHsgZmlsdGVyczogeyBkdWN0X2FubzogMCwgZHVjdF9pa2M6IHRoYXQuSWtjLyosIHNfdXBvOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1Vwby5OZXphdWN0b3ZhbnksIHNfc3RvOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1N0by5OZXN0b3Jub3Zhbm8qLyB9IH07IH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk9iai5kYXRhID0gZGF0YTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKGplblphc2tydG51dGUgPT09IHRydWUpIHJldHVybk9iai5kYXRhQ2hlY2tlZCA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KHRoYXQuJGdyaWQwUG9oeWJ5KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm5PYmouZGF0YSA9IHRoYXQuJGdyaWQwUG9oeWJ5LmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmIChwcnZvdG5pID09PSB0cnVlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gesOhcGlzIGRvIGhpc3RvcmllIMO6xI10b3bDoW7DrSAoemFow6FqZW7DrSBrb250cm9seSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWJIaXN0b3JpZVVjdG92YW5pLnVwZGF0ZUZhemUoe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpeHNfaHVmOiB0aGF0Lkl4c0h1ZixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGZhemVfdWN0b3Zhbmk6IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkZhemVVY3RvdmFuaVBvaHlidVdpemFyZC5Lb250cm9sYVBvaHlidSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcHJpel9vZGw6IDBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBvYnNsdWhhIGbDoXplXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiB1cHJhdml0IHBhcmFtZXRyeSBtZXRvZHkgdWN0b3ZhbmlXaXphcmQsIGFieSBmw6F6ZSBieWx5IG5hIHphxI3DoXRrdVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy90aGF0LnVjdG92YW5pV2l6YXJkKHVuZGVmaW5lZCwgMCwgLTEpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKHJldHVybk9iai5kYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLnprb250cm9sdWpQcmVkVWN0b3ZhbmltKFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBpa2M6IHRoYXQuSWtjLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcm93czogIXBydm90bmkgJiYgamVuWmFza3J0bnV0ZSA/IHJldHVybk9iai5kYXRhQ2hlY2tlZCA6IHJldHVybk9iai5kYXRhLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy9ha3R1YWxpem92YXREdWN0OiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG/FmWXFoWl0IHR5cCDDusSNdG92w6Fuw61cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHR5cF91Y3RvdmFuaTogdGhhdC5QcmVkY2hvemlGYXplID09PSAtMSA/IDAvKm51bGwqLyA6ICgodGhhdC5UeXBVY3RvdmFuaSA/PyBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0LkplZG5vdGxpdmUpIGFzIG51bWJlcilcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHBydm90bmkgPT09IHRydWUpICYmIHJldHVybk9iai5kYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuT2JqLmRhdGEgPSByZXR1cm5PYmouZGF0YSEubWFwKGRhdGEgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzID0gcmV0LnJlc3VsdC5maW5kKGkgPT4geyByZXR1cm4gKGRhdGEuaXhwX3VwciA9PT0gaS5kYXRhLml4cF91cHIgJiYgZGF0YS5yYWRla191cG8gPT09IGkuZGF0YS5yYWRla191cG8pIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzQ2hlY2tlZCA9IGplblphc2tydG51dGUgJiYgcmV0dXJuT2JqPy5kYXRhQ2hlY2tlZCA/IHJldHVybk9iai5kYXRhQ2hlY2tlZC5maW5kSW5kZXgoaSA9PiAoZGF0YS5peHBfdXByID09PSBpLml4cF91cHIgJiYgZGF0YS5yYWRla191cG8gPT09IGkucmFkZWtfdXBvKSkgPj0gMCA6IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9ICQuZXh0ZW5kKFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1Y3RfdHh0X2VycjogcmVzLmVycm9ycz8ucmVkdWNlKChhY2MsIGN1cnIpID0+IHsgcmV0dXJuIGFjYyArIGN1cnIubWVzc2FnZSArIFwiIFwiOyB9LCBcIlwiKSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVjdF9raW5kOiByZXMua2luZCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdiByZcW+aW11IGplblphc2tydG51dMOpIHphY2hvdmF0IHphxaFrcnRudXTDrVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWN0X2NoZWNrOiBqZW5aYXNrcnRudXRlID8gcmVzQ2hlY2tlZCA6IHJlcy5raW5kID09PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MgfHwgcmVzLmtpbmQgPT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuV2FybmluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV4Y0luZm8pIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvcGVyYWNlIG5lZG9wYWRsYVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVGV4dENoeWJ5ID0gRnVjVXRpbHMuZ2V0RXhjSW5mb01lc3NhZ2UoZXhjSW5mbyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga3bFr2xpIG5vdsOpbXUgSlF1ZXJ5IG5lc3RhxI3DrSByZXR1cm5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAocHJ2b3RuaSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIHrDoXBpcyBkbyBoaXN0b3JpZSDDusSNdG92w6Fuw60gKHVrb27EjWVuw60ga29udHJvbHkpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliSGlzdG9yaWVVY3RvdmFuaS51cGRhdGVGYXplKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaXhzX2h1ZjogdGhhdC5JeHNIdWYsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZmF6ZV91Y3RvdmFuaTogR29yZGljLkZ1Yy5JbnRlcmZhY2UuRmF6ZVVjdG92YW5pUG9oeWJ1V2l6YXJkLktvbnRyb2xhUG9oeWJ1LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBwcml6X29kbDogMFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIGtvbnRyb2xhIHBvxI10dSBwb2h5YsWvIHBvZGxlIG1heGltw6FsbsOtaG8gbGltaXR1XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAocHJ2b3RuaSA9PT0gdHJ1ZSAmJiByZXR1cm5PYmouZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIFRPRE86IG5ldWTEm2xhdCB0byBuxJtqYWsgZWZla3Rpdm7Em2ppP1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIFRPRE86IHRha2hsZSBqZSB0byBiZXogb2hsZWR1IG5hIHphxaFrcnRudXTDqSAtIGplIHRvIHNwcsOhdm7Emz8gbmVtxJtsbyBieSB0byBiw710IHBvZGxlIHRvaG8sIGplc3RsaSBqZSB0byBwcnZvdG7DrSB0ZXN0IG5lYm8gbmU/IG3DoSBzZSB0byB2xa9iZXogcG91xaF0xJt0IGkgeiBha2NlP1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vbGV0IGNoUmFka3kgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3M8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih0aGF0LiRncmlkMFBvaHlieSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9sZXQgcG9jZXRVcG86IG51bWJlciA9IGNoUmFka3kgIT0gbnVsbCA/IGNoUmFka3khLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgbGV0IHBvY2V0VXBvID0gcmV0dXJuT2JqLmRhdGEubGVuZ3RoO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlmICh0aGF0Lk1heFVwbyA+IDAgJiYgcG9jZXRVcG8gPiB0aGF0Lk1heFVwbykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyB2eWJyYW7DvWNoIHBvaHlixa8gamUgdsOtY2UgbmXFviBqZSBwb3ZvbGVub1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyBwb8SNZXQgc2UgbXVzw60gcMWZaSBvcHXFoXTEm27DrSBmw6F6ZSAwIHprb250cm9sdm9hdFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBqZSB0ZW5obGUgcMWZw616bmFrIHbFr2JlYyBwb3TFmWViYSwga2R5xb4gc2UgdGF0byBtZXRvZGEgdm9sw6EgamVuIHDFmWkgc3B1xaF0xJtuw60gcHLFr3ZvZGNlP1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LmZhemUwS29udHJQb2NldFVwbyA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vIHZ5YnJhbsO9Y2ggcG9oeWLFryBqZSB2w61jZSBuZcW+IGplIHBvdm9sZW5vXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQuVGV4dENoeWJ5ID0gXCJqcmVzOjI0MTAwMjM3XCIuZm9ybWF0KHBvY2V0VXBvLCB0aGF0Lk1heFVwbyk7IC8vUkMgMjQxMDAyMzcgOiBQb8W+YWR1amV0ZSDDusSNdG92YXQgezB9IMO6xI1ldG7DrWNoIHBvaHlixa8sIGFsZSBtYXhpbcOhbG7DrSBwb3ZvbGVuw70gcG/EjWV0IMO6xI1ldG7DrWNoIHBvaHlixa8gcHJvIMO6xI10b3bDoW7DrSBqZSB7MX0uXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjI0MTAwMjEwXCIsIHRoYXQuVGV4dENoeWJ5KSAvL1JDIDI0MTAwMjEwIDogw5rEjXRvdsOhbsOtXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgoKSA9PiBmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoYXQuTWF4VXBvIDwgMCAmJiBwb2NldFVwbyA+IE1hdGguYWJzKHRoYXQuTWF4VXBvKSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyB2eWJyYW7DvWNoIHBvaHlixa8gamUgdsOtY2UgbmXFviBqZSBwb3ZvbGVubywgYWxlIG5hIGRvdGF6IGplIG1vxb5uw6kgcG9rcmHEjW92YXRcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhhdC5mYXplMEtvbnRyUG9jZXRVcG8gPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjI0MTAwMjEwXCIsIC8vUkMgMjQxMDAyMTAgOiDDmsSNdG92w6Fuw61cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczoyNDEwMDIzOFwiLmZvcm1hdChwb2NldFVwbywgTWF0aC5hYnModGhhdC5NYXhVcG8pKSkgLy9SQyAyNDEwMDIzOCA6IFBvxb5hZHVqZXRlIMO6xI10b3ZhdCB7MH0gw7rEjWV0bsOtY2ggcG9oeWLFrywgYWxlIG1heGltw6FsbsOtIHBvdm9sZW7DvSBwb8SNZXQgw7rEjWV0bsOtY2ggcG9oeWLFryBwcm8gw7rEjXRvdsOhbsOtIGplIHsxfS4gT3ByYXZkdSBjaGNldGUgw7rEjXRvdmF0IHbDrWNlIHBvaHlixa8/XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb8SNZXQgdcW+IG5la29udHJvbG92YXRcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZhemUwS29udHJQb2NldFVwbyA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UZXh0Q2h5YnkgPSBcImpyZXM6MjQxMDAyMzdcIi5mb3JtYXQocG9jZXRVcG8sIHRoYXQuTWF4VXBvKTsgLy9SQyAyNDEwMDIzNyA6IFBvxb5hZHVqZXRlIMO6xI10b3ZhdCB7MH0gw7rEjWV0bsOtY2ggcG9oeWLFrywgYWxlIG1heGltw6FsbsOtIHBvdm9sZW7DvSBwb8SNZXQgw7rEjWV0bsOtY2ggcG9oeWLFryBwcm8gw7rEjXRvdsOhbsOtIGplIHsxfS5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG/EjWV0IHNlIG11c8OtIHDFmWkgb3B1xaF0xJtuw60gZsOhemUgMCB6a29udHJvbG92YXRcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga3bFr2xpIG5vdsOpbXUgSlF1ZXJ5IG5lc3RhxI3DrSByZXR1cm5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8ga29udHJvbGEgcG/EjXR1IHBybyBwcsWvdm9kY2VcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmIChwcnZvdG5pID09PSB0cnVlICYmIHJldHVybk9iai5kYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgbGV0IHBvY2V0VXBvID0gcmV0dXJuT2JqLmRhdGEubGVuZ3RoO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBkZWZhdWx0IGRvcG9ydcSNZW7DqWhvIHBvxI10dSBhIHBhayBobyB6YWt0dWFsaXpvdmF0IHpkZSBhIHYgdcW+aXZhdGVsc2vDqW0gbmFzdGF2ZW7DrVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGxldCBtYXhXaXphcmQgPSB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXREZWYoXCJHbG9iYWwuRnVjLkFwcFNldHRpbmdzLlVjdFVwb1NldHRpbmdzRm9ybS5VY3RXaXphcmRNYXhDb3VudFwiLCAxMDApID8/IDEwMDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAocG9jZXRVcG8gPiAwICYmIG1heFdpemFyZCA+IDAgJiYgcG9jZXRVcG8gPiBtYXhXaXphcmQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhhdC5XYXJuaW5nWktvbnRyb2x5ID0gXCJqcmVzOjI0MTAwMjM2XCIuZm9ybWF0KG1heFdpemFyZCk7IC8vUkMgMjQxMDAyMzYgOiDDmsSNdG92w6Fuw60gdsOtY2UgbmXFviB7MH0gcG9oeWLFryBqZSBkb3BvcnXEjWVubyBwcm92w6FkxJt0IG9kbG/FvmVuxJtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiBwb3XFvsOtdCBrb25zdGFudHUgbmEgZsOhemkgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiB0dWhsZSBwcnZvdG7DrSBrb250cm9sdSBvZHN0cmFuaXQgbmVibyB1cHJhdml0XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAocHJ2b3RuaSA9PT0gdHJ1ZSAmJiByZXR1cm5PYmouZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIHpqacWhdMSbbsOtIHBvdm9sZW7DvWNoIHR5cMWvIMO6xI10b3bDoW7DrVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGxldCBwcm9taXNlczogSlF1ZXJ5UHJvbWlzZTxhbnk+W10gPSBbXTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBwxZnDrXpuYWsga3VtdWxhY2UgemEgUElEIC0gbm92xJsgYmV6IG9obGVkdSBuYSBkYcWIb3bDqSBwb2h5YnksIHR5IHNpIG1vdG9yIHBvxZllxaHDrSBzw6FtLCB0YWvFvmUgamVuIHBvZGxlIHBhcmFtZXRydSBhIHDFmcOtcGFkbsO9Y2ggcG9oeWLFryB6IFBPS1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbnN0IHphbEt1bXVsb3ZhdFphSXhwID0gdGhhdC5LdW11bG92YXRaYUl4cDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoIXRoYXQuS3VtdWxvdmF0WmFJeHApIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gcGFyYW1ldHIgcHJvIGFrdHXDoWxuw60gbW90b3J5IHXFviBuZcWZZcWhw60gZGHFiG92w6kgcG9oeWJ5XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQuS3VtdWxvdmF0WmFJeHAgPSAocmV0dXJuT2JqLmRhdGEuZmluZEluZGV4KChwb2h5YikgPT4gKHBvaHliLnVwcl9rdGdfdXByID09PSBGdWMuR2xvYmFscy5FbnVtcy5LdGdVcHIuUG9rbGFkbmEpLyogfHwgKHBvaHliLkplRGFub3Z5ID09PSB0cnVlKSovKSA+PSAwKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHphbEt1bXVsb3ZhdFphSXhwICE9PSB0aGF0Lkt1bXVsb3ZhdFphSXhwKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaHlieVBvayA9IChyZXR1cm5PYmouZGF0YS5maW5kSW5kZXgoKHBvaHliKSA9PiAocG9oeWIudXByX2t0Z191cHIgPT09IEZ1Yy5HbG9iYWxzLkVudW1zLkt0Z1Vwci5Qb2tsYWRuYSkpID49IDApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2h5YnlOZVBvayA9IChyZXR1cm5PYmouZGF0YS5maW5kSW5kZXgoKHBvaHliKSA9PiAocG9oeWIudXByX2t0Z191cHIgIT09IEZ1Yy5HbG9iYWxzLkVudW1zLkt0Z1Vwci5Qb2tsYWRuYSkpID49IDApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAocG9oeWJ5UG9rICYmIHBvaHlieU5lUG9rKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LkluZm9aS29udHJvbHkgPSBcImpyZXM6MjQxMDAzNzdcIjsgLy9SQyAyNDEwMDM3NyA6IEt2xa9saSDDusSNdG92w6Fuw60gcG9oeWLFryBob3Rvdm9zdG7DrWNoIHDFmcOtcGFkxa8gamUgemFwbnV0YSBrdW11bGFjZSB6YSBQSUQgcMWZw61wYWR1IGkgcHJvIHBvaHlieSBqaW7DvWNoIGthdGVnb3Jpw60gcMWZw61wYWTFr1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIFRPRE86IMWZZcWhaXQgcG92b2xlbsOtIMO6xI10b3bDoW7DrSBuZWJvIHRvIMWZZcWhaXQgYcW+IHYga29udHJvbGUgcMWZaSBwxZllY2hvZHUgZG8gZsOhemUgMVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lenJ1xaFpdCBrb25zdGFudHkgR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdCwga2R5xb4gamUgR29yZGljLkZ1Yy5JbnRlcmZhY2UuVHlwVWN0b3ZhbmlQb2h5YnU/XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHRoYXQuVWN0UG9oID09PSBHbG9iYWxzLkVudW1zLlVjdFBvaC5Tb3VwaXNreSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyBwb3ZvbGVuw60gcG9kbGUgdmxhc3Rub3N0w60gc291cGlzZWtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliU291cGlza2EuanNvdVVjdG92YW5pUG92b2xlbmEoeyB0eXBVY3RvdmFuaTogW0dvcmRpYy5GdWMuSW50ZXJmYWNlLlR5cFVjdG92YW5pUG9oeWJ1LkplZG5vdGxpdmUsIEdvcmRpYy5GdWMuSW50ZXJmYWNlLlR5cFVjdG92YW5pUG9oeWJ1Lkhyb21hZG5lLCBHb3JkaWMuRnVjLkludGVyZmFjZS5UeXBVY3RvdmFuaVBvaHlidS5LdW11bG92YW5lXSwgcm93czogcmV0dXJuT2JqLmRhdGEgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHBvdikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3YpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSmVkbm90bGl2ZSA9IHBvdltcIkplZG5vdGxpdmVcIl0gPT09IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUG92b2xlbm9VY3RvdmFuaUhyb21hZG5lID0gcG92W1wiSHJvbWFkbmVcIl0gPT09IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUG92b2xlbm9VY3RvdmFuaUt1bXVsb3ZhbmUgPSBwb3ZbXCJLdW11bG92YW5lXCJdID09PSB0cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vcHJvbWlzZXMucHVzaChcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5pc2wuRmluUG9oeWJTb3VwaXNrYS5qZVVjdG92YW5pUG92b2xlbm8oeyB0eXBVY3RvdmFuaTogR29yZGljLkZ1Yy5JbnRlcmZhY2UuVHlwVWN0b3ZhbmlQb2h5YnUuSmVkbm90bGl2ZSwgcm93czogcmV0dXJuT2JqLmRhdGEgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5nZXQoKS5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGRvbmUoZnVuY3Rpb24gKHBvdikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuUG92b2xlbm9VY3RvdmFuaUplZG5vdGxpdmUgPSBwb3Y7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vcHJvbWlzZXMucHVzaChcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5pc2wuRmluUG9oeWJTb3VwaXNrYS5qZVVjdG92YW5pUG92b2xlbm8oeyB0eXBVY3RvdmFuaTogR29yZGljLkZ1Yy5JbnRlcmZhY2UuVHlwVWN0b3ZhbmlQb2h5YnUuSHJvbWFkbmUsIHJvd3M6IHJldHVybk9iai5kYXRhIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAuZ2V0KCkuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkb25lKGZ1bmN0aW9uIChwb3YpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LlBvdm9sZW5vVWN0b3ZhbmlIcm9tYWRuZSA9IHBvdjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9wcm9taXNlcy5wdXNoKFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmlzbC5GaW5Qb2h5YlNvdXBpc2thLmplVWN0b3ZhbmlQb3ZvbGVubyh7IHR5cFVjdG92YW5pOiBHb3JkaWMuRnVjLkludGVyZmFjZS5UeXBVY3RvdmFuaVBvaHlidS5LdW11bG92YW5lLCByb3dzOiByZXR1cm5PYmouZGF0YSB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmdldCgpLlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZG9uZShmdW5jdGlvbiAocG92KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5Qb3ZvbGVub1VjdG92YW5pS3VtdWxvdmFuZSA9IHBvdjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vIHBvdm9sZW7DrSBwb2RsZSB2bGFzdG5vc3TDrSBwb2h5YsWvXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi5qc291VWN0b3ZhbmlQb3ZvbGVuYSh7IHR5cFVjdG92YW5pOiBbR29yZGljLkZ1Yy5JbnRlcmZhY2UuVHlwVWN0b3ZhbmlQb2h5YnUuSmVkbm90bGl2ZSwgR29yZGljLkZ1Yy5JbnRlcmZhY2UuVHlwVWN0b3ZhbmlQb2h5YnUuSHJvbWFkbmUsIEdvcmRpYy5GdWMuSW50ZXJmYWNlLlR5cFVjdG92YW5pUG9oeWJ1Lkt1bXVsb3ZhbmVdLCByb3dzOiByZXR1cm5PYmouZGF0YSB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocG92KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvdikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlBvdm9sZW5vVWN0b3ZhbmlKZWRub3RsaXZlID0gcG92W1wiSmVkbm90bGl2ZVwiXSA9PT0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSHJvbWFkbmUgPSBwb3ZbXCJIcm9tYWRuZVwiXSA9PT0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qb3ZvbGVub1VjdG92YW5pS3VtdWxvdmFuZSA9IHBvdltcIkt1bXVsb3ZhbmVcIl0gPT09IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9wcm9taXNlcy5wdXNoKFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmlzbC5GaW5Qb2h5Yi5qZVVjdG92YW5pUG92b2xlbm8oeyB0eXBVY3RvdmFuaTogR29yZGljLkZ1Yy5JbnRlcmZhY2UuVHlwVWN0b3ZhbmlQb2h5YnUuSmVkbm90bGl2ZSwgcm93czogcmV0dXJuT2JqLmRhdGEgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5nZXQoKS5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGRvbmUoZnVuY3Rpb24gKHBvdikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuUG92b2xlbm9VY3RvdmFuaUplZG5vdGxpdmUgPSBwb3Y7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vcHJvbWlzZXMucHVzaChcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5pc2wuRmluUG9oeWIuamVVY3RvdmFuaVBvdm9sZW5vKHsgdHlwVWN0b3Zhbmk6IEdvcmRpYy5GdWMuSW50ZXJmYWNlLlR5cFVjdG92YW5pUG9oeWJ1Lkhyb21hZG5lLCByb3dzOiByZXR1cm5PYmouZGF0YSB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmdldCgpLlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZG9uZShmdW5jdGlvbiAocG92KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSHJvbWFkbmUgPSBwb3Y7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vcHJvbWlzZXMucHVzaChcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5pc2wuRmluUG9oeWIuamVVY3RvdmFuaVBvdm9sZW5vKHsgdHlwVWN0b3Zhbmk6IEdvcmRpYy5GdWMuSW50ZXJmYWNlLlR5cFVjdG92YW5pUG9oeWJ1Lkt1bXVsb3ZhbmUsIHJvd3M6IHJldHVybk9iai5kYXRhIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAuZ2V0KCkuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkb25lKGZ1bmN0aW9uIChwb3YpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LlBvdm9sZW5vVWN0b3ZhbmlLdW11bG92YW5lID0gcG92O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3JldHVybiAkLndoZW4uYXBwbHkobnVsbCwgcHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vICAgIC8vIG5hc3RhdmVuw60gc3RhdnUgdHlwxa8gw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gICAgLy9pZiAoIXRoYXQuUGV2VHlwVWN0QW5vKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgbGV0IHJhZGlvVHlwVWN0ID0gdGhhdC5maW5kRmllbGRzKFwidHlwX3VjdG92YW5pXCIpLmdyYWRpbyhcIm9wdGlvblwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyAgICAvLyAgICByYWRpb1R5cFVjdC5yYWRpb3NbMF0uZGlzYWJsZWQgPSAhdGhhdC5Qb3ZvbGVub1VjdG92YW5pSmVkbm90bGl2ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyAgICAvLyAgICByYWRpb1R5cFVjdC5yYWRpb3NbMV0uZGlzYWJsZWQgPSAhdGhhdC5Qb3ZvbGVub1VjdG92YW5pSHJvbWFkbmU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgcmFkaW9UeXBVY3QucmFkaW9zWzJdLmRpc2FibGVkID0gIXRoYXQuUG92b2xlbm9VY3RvdmFuaUt1bXVsb3ZhbmU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgdGhhdC5maW5kRmllbGRzKFwidHlwX3VjdG92YW5pXCIpLmdyYWRpbyhcImRlc3Ryb3lcIikuZ3JhZGlvKHJhZGlvVHlwVWN0KS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgdHlwX3VjdG92YW5pOiB0aGF0LlR5cFVjdG92YW5pIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vICAgIC8vfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBzcHLDoXZuw70gdHlwIC0gb3ByYXZhIGt2xa9saSBwYWRsw6ltdSBCUyB2IHN1ZMOpXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IGFueS8qcmV0dXJuT2JqVHlwZSovKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBrb250cm9sYSBwZXZuw6lobyB0eXB1IMO6xI10b3bDoW7DrVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdFxyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKHBydm90bmkgPT09IHRydWUgJiYgcmV0dXJuT2JqLmRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAoKHRoYXQuUGV2VHlwVWN0QW5vID09PSB0cnVlKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAmJiAoISgodGhhdC5UeXBVY3RvdmFuaSA9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0LkplZG5vdGxpdmUgJiYgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSmVkbm90bGl2ZSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHx8ICh0aGF0LlR5cFVjdG92YW5pID09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSHJvbWFkbmUgJiYgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSHJvbWFkbmUpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB8fCAodGhhdC5UeXBVY3RvdmFuaSA9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0Lkt1bXVsb3ZhbmUgJiYgdGhhdC5Qb3ZvbGVub1VjdG92YW5pS3VtdWxvdmFuZSkpKSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LlRleHRDaHlieSA9IFwiUG/FvmFkb3ZhbsO9IHR5cCDDusSNdG92w6Fuw60gbmVuw60gcG92b2xlblwiO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL3RoYXQuVGV4dENoeWJ5ID0gXCJUb2hsZSBqZSBwxZnDrWtsYWQgZGxvb29vb3Vow6lobyB0ZXh0dSwga3RlcsO9IHNlIHJvemTEm2x1amUgZG8gxI10ecWZIHNsb3VwY8WvIGEgcGFrIHNlIHRvIHphc2Ugc2tsw6Fkw6EgMDEuIFRvaGxlIGplIHDFmcOta2xhZCBkbG9vb29vdWjDqWhvIHRleHR1LCBrdGVyw70gc2Ugcm96ZMSbbHVqZSBkbyDEjXR5xZkgc2xvdXBjxa8gYSBwYWsgc2UgdG8gemFzZSBza2zDoWTDoSAwMi4gVG9obGUgamUgcMWZw61rbGFkIGRsb29vb291aMOpaG8gdGV4dHUsIGt0ZXLDvSBzZSByb3pkxJtsdWplIGRvIMSNdHnFmSBzbG91cGPFryBhIHBhayBzZSB0byB6YXNlIHNrbMOhZMOhIDAzLiBUb2hsZSBqZSBwxZnDrWtsYWQgZGxvb29vb3Vow6lobyB0ZXh0dSwga3RlcsO9IHNlIHJvemTEm2x1amUgZG8gxI10ecWZIHNsb3VwY8WvIGEgcGFrIHNlIHRvIHphc2Ugc2tsw6Fkw6EgMDQuIFRvaGxlIGplIHDFmcOta2xhZCBkbG9vb29vdWjDqWhvIHRleHR1LCBrdGVyw70gc2Ugcm96ZMSbbHVqZSBkbyDEjXR5xZkgc2xvdXBjxa8gYSBwYWsgc2UgdG8gemFzZSBza2zDoWTDoSAwNS4gVG9obGUgamUgcMWZw61rbGFkIGRsb29vb291aMOpaG8gdGV4dHUsIGt0ZXLDvSBzZSByb3pkxJtsdWplIGRvIMSNdHnFmSBzbG91cGPFryBhIHBhayBzZSB0byB6YXNlIHNrbMOhZMOhIDA2LiBUb2hsZSBqZSBwxZnDrWtsYWQgZGxvb29vb3Vow6lobyB0ZXh0dSwga3RlcsO9IHNlIHJvemTEm2x1amUgZG8gxI10ecWZIHNsb3VwY8WvIGEgcGFrIHNlIHRvIHphc2Ugc2tsw6Fkw6EgMDcuIFRvaGxlIGplIHDFmcOta2xhZCBkbG9vb29vdWjDqWhvIHRleHR1LCBrdGVyw70gc2Ugcm96ZMSbbHVqZSBkbyDEjXR5xZkgc2xvdXBjxa8gYSBwYWsgc2UgdG8gemFzZSBza2zDoWTDoSAwOC4gVG9obGUgamUgcMWZw61rbGFkIGRsb29vb291aMOpaG8gdGV4dHUsIGt0ZXLDvSBzZSByb3pkxJtsdWplIGRvIMSNdHnFmSBzbG91cGPFryBhIHBhayBzZSB0byB6YXNlIHNrbMOhZMOhIDA5LiBUb2hsZSBqZSBwxZnDrWtsYWQgZGxvb29vb3Vow6lobyB0ZXh0dSwga3RlcsO9IHNlIHJvemTEm2x1amUgZG8gxI10ecWZIHNsb3VwY8WvIGEgcGFrIHNlIHRvIHphc2Ugc2tsw6Fkw6EgMTAuIFwiO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwianJlczoyNDEwMDIxMFwiLCB0aGF0LlRleHRDaHlieSkgLy9SQyAyNDEwMDIxMCA6IMOaxI10b3bDoW7DrVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKCkgPT4gZmFsc2UpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdCAtIGNvIHbFoWVjaG5vIHNlIG3DoSBkxJtsYXQgcG9wcnbDqSBhIGNvIG5hIHRsYcSNw610a28/XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAoIShwcnZvdG5pID09PSB0cnVlKSAmJiByZXR1cm5PYmouZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIHBvxI10eSB6w6F6bmFtxa9cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBGdWNXaXphcmQucmVmcmVzaEtQSVBhbmVsKHRoYXQua3BpUGFuZWwsIHJldHVybk9iai5kYXRhISk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gY2Vsw70gcG9obGVkIG5lYm8gamVuIGFrdHVhbGl6YWNlIGRhdFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlmIChqZW5aYXNrcnRudXRlID09PSB0cnVlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vbGV0IHZpZXcgPSB0aGF0LiRncmlkMFBvaHlieS5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQwUG9oeWJ5LmdncmlkKFwiZ2V0Vmlld1wiKS51cGRhdGVEYXRhKHJldHVybk9iai5kYXRhISwgXCJ1cGRhdGVcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJldHVybk9iai5kYXRhISwgeyBrZXk6IFwiaXhwX3VwcixyYWRla191cG9cIiB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQwUG9oeWJ5LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAoIShwcnZvdG5pID09PSB0cnVlKSAmJiByZXR1cm5PYmouZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIEtvbnRyb2xhIHBvaHlixa8gcMWZZWQgw7rEjXRvdsOhbsOtbSAodm9sYW7DoSBqZW4gcMWZaSBzcHXFoXTEm27DrSBwcsWvdm9kY2UgbmVibyBuYSB0bGHEjcOtdGtvKVxyXG4gICAgICAgIC8vICogXHJcbiAgICAgICAgLy8gKiBAcGFyYW0ge2Jvb2xlYW59IFtqZW5aYXNrcnRudXRlXSBrb250cm9sb3ZhdCBqZW4gemHFoWtydG51dMOpIHBvaHlieT9cclxuICAgICAgICAvLyAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSBwcm9taXNlXHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUga29udHJvbGFQcmVkVWN0b3ZhbmltKGplblphc2tydG51dGU/OiBib29sZWFuKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIC8vICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gICAgLy8gb2JqZWt0IHBybyBwxZllZMOhdsOhbsOtIGhvZG5vdFxyXG4gICAgICAgIC8vICAgIGludGVyZmFjZSByZXR1cm5PYmpUeXBlIHtcclxuICAgICAgICAvLyAgICAgICAgZGF0YTogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvW10gfCBudWxsLFxyXG4gICAgICAgIC8vICAgICAgICBkYXRhQ2hlY2tlZDogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvW10gfCBudWxsXHJcbiAgICAgICAgLy8gICAgfTtcclxuICAgICAgICAvLyAgICBsZXQgcmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlID0ge1xyXG4gICAgICAgIC8vICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICAgIC8vICAgICAgICBkYXRhQ2hlY2tlZDogbnVsbFxyXG4gICAgICAgIC8vICAgIH07XHJcblxyXG4gICAgICAgIC8vICAgIC8vIGtvbnRyb2xhIHBvaHlixa8gcMWZZWQgw7rEjXRvdsOhbsOtbVxyXG4gICAgICAgIC8vICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShyZXR1cm5PYmopLnByb21pc2UoKVxyXG4gICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBwxZlldnpldMOtIGRhdFxyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKGplblphc2tydG51dGUgPT09IHRydWUpIHJldHVybk9iai5kYXRhQ2hlY2tlZCA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KHRoYXQuJGdyaWQwUG9oeWJ5KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybk9iai5kYXRhID0gdGhhdC4kZ3JpZDBQb2h5YnkuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBvYnNsdWhhIGbDoXplXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiB1cHJhdml0IHBhcmFtZXRyeSBtZXRvZHkgdWN0b3ZhbmlXaXphcmQsIGFieSBmw6F6ZSBieWx5IG5hIHphxI3DoXRrdVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy90aGF0LnVjdG92YW5pV2l6YXJkKHVuZGVmaW5lZCwgMCwgLTEpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLy5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKHJldHVybk9iai5kYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLnprb250cm9sdWpQcmVkVWN0b3ZhbmltKFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBpa2M6IHRoYXQuSWtjLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcm93czogamVuWmFza3J0bnV0ZSA/IHJldHVybk9iai5kYXRhQ2hlY2tlZCA6IHJldHVybk9iai5kYXRhLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy9ha3R1YWxpem92YXREdWN0OiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG/FmWXFoWl0IHR5cCDDusSNdG92w6Fuw61cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHR5cF91Y3RvdmFuaTogdGhhdC5QcmVkY2hvemlGYXplID09PSAtMSA/IDAvKm51bGwqLyA6ICgodGhhdC5UeXBVY3RvdmFuaSA/PyBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0LkplZG5vdGxpdmUpIGFzIG51bWJlcilcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5PYmouZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk9iai5kYXRhID0gcmV0dXJuT2JqLmRhdGEhLm1hcChkYXRhID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IHJldC5yZXN1bHQuZmluZChpID0+IHsgcmV0dXJuIChkYXRhLml4cF91cHIgPT09IGkuZGF0YS5peHBfdXByICYmIGRhdGEucmFkZWtfdXBvID09PSBpLmRhdGEucmFkZWtfdXBvKSB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc0NoZWNrZWQgPSBqZW5aYXNrcnRudXRlICYmIHJldHVybk9iaj8uZGF0YUNoZWNrZWQgPyByZXR1cm5PYmouZGF0YUNoZWNrZWQuZmluZEluZGV4KGkgPT4gKGRhdGEuaXhwX3VwciA9PT0gaS5peHBfdXByICYmIGRhdGEucmFkZWtfdXBvID09PSBpLnJhZGVrX3VwbykpID49IDAgOiBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSAkLmV4dGVuZChcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWN0X3R4dF9lcnI6IHJlcy5lcnJvcnM/LnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7IHJldHVybiBhY2MgKyBjdXJyLm1lc3NhZ2UgKyBcIiBcIjsgfSwgXCJcIiksXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1Y3Rfa2luZDogcmVzLmtpbmQsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHYgcmXFvmltdSBqZW5aYXNrcnRudXTDqSB6YWNob3ZhdCB6YcWha3J0bnV0w61cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVjdF9jaGVjazogamVuWmFza3J0bnV0ZSA/IHJlc0NoZWNrZWQgOiByZXMua2luZCA9PT0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzIHx8IHJlcy5raW5kID09PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLldhcm5pbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChleGNJbmZvKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3BlcmFjZSBuZWRvcGFkbGFcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlRleHRDaHlieSA9IEZ1Y1V0aWxzLmdldEV4Y0luZm9NZXNzYWdlKGV4Y0luZm8pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGt2xa9saSBub3bDqW11IEpRdWVyeSBuZXN0YcSNw60gcmV0dXJuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogZG9kxJtsYXQgLSBjbyB2xaFlY2hubyBzZSBtw6EgZMSbbGF0IHBvcHJ2w6kgYSBjbyBuYSB0bGHEjcOtdGtvP1xyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKHJldHVybk9iai5kYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gcG/EjXR5IHrDoXpuYW3Fr1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIEZ1Y1dpemFyZC5yZWZyZXNoS1BJUGFuZWwodGhhdC5rcGlQYW5lbCwgcmV0dXJuT2JqLmRhdGEhKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBjZWzDvSBwb2hsZWQgbmVibyBqZW4gYWt0dWFsaXphY2UgZGF0XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKGplblphc2tydG51dGUgPT09IHRydWUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9sZXQgdmlldyA9IHRoYXQuJGdyaWQwUG9oeWJ5LmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZDBQb2h5YnkuZ2dyaWQoXCJnZXRWaWV3XCIpLnVwZGF0ZURhdGEocmV0dXJuT2JqLmRhdGEhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcocmV0dXJuT2JqLmRhdGEhLCB7IGtleTogXCJpeHBfdXByLHJhZGVrX3Vwb1wiIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZDBQb2h5YnkuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmIChyZXR1cm5PYmouZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29udHJvbGEgcG9oeWLFryBwxZllZCDDusSNdG92w6Fuw61tICh2b2xhbsOhIGplbiBwxZlpIHNwdcWhdMSbbsOtIHByxa92b2RjZSBuZWJvIG5hIHRsYcSNw610a28pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8dm9pZD59IHByb21pc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGtvbnRyb2xhUHJlZFVjdG92YW5pbSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBwb2h5YnkgPSB0aGF0LiRncmlkMFBvaHlieS5nZ3JpZDxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpO1xyXG4gICAgICAgICAgICBpZiAocG9oeWJ5Py5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzdGFuZGFyZG7DrSBrb250cm9sYSBwb2h5YsWvIHDFmWVkIMO6xI10b3bDoW7DrW1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi56a29udHJvbHVqUHJlZFVjdG92YW5pbShcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogdGhhdC5Ja2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IHBvaHlieSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3BsbsSbbsOtIHpqacWhdMSbbsO9Y2ggdsO9c2xlZGvFryBrIHBvaHlixa9tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaHlieSA9IHBvaHlieS5tYXAocG9oeWIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IHJldC5yZXN1bHQuZmluZChpID0+IHsgcmV0dXJuIChwb2h5Yi5peHBfdXByID09PSBpLmRhdGEuaXhwX3VwciAmJiBwb2h5Yi5yYWRla191cG8gPT09IGkuZGF0YS5yYWRla191cG8pIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaHliID0gJC5leHRlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaHliLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWN0X3R4dF9lcnI6IHJlcy5lcnJvcnM/LnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7IHJldHVybiBhY2MgKyBjdXJyLm1lc3NhZ2UgKyBcIiBcIjsgfSwgXCJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWN0X2tpbmQ6IHJlcy5raW5kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdiByZcW+aW11IGplblphc2tydG51dMOpIHphY2hvdmF0IHphxaFrcnRudXTDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVjdF9jaGVjazogcmVzLmtpbmQgPT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcyB8fCByZXMua2luZCA9PT0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5XYXJuaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvaHliO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG/EjXR5IHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGdWNXaXphcmQucmVmcmVzaEtQSVBhbmVsKHRoYXQua3BpUGFuZWwsIHBvaHlieSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNlbMO9IHBvaGxlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHBvaHlieSwgeyBrZXk6IFwiaXhwX3VwcixyYWRla191cG9cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQwUG9oeWJ5LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXhjSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3BlcmFjZSBuZWRvcGFkbGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVGV4dENoeWJ5ID0gRnVjVXRpbHMuZ2V0RXhjSW5mb01lc3NhZ2UoZXhjSW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBrdsWvbGkgbm92w6ltdSBKUXVlcnkgbmVzdGHEjcOtIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAvLy8vIGtvbnRyb2xhIHBvaHlixa8gcMWZZWQgw7rEjXRvdsOhbsOtbVxyXG4gICAgICAgICAgICAvL3JldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKVxyXG4gICAgICAgICAgICAvLyAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBwxZlldnpldMOtIGRhdFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoYXQuJGdyaWQwUG9oeWJ5LmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4oXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKCk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBvYnNsdWhhIGbDoXplXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBUT0RPOiB1cHJhdml0IHBhcmFtZXRyeSBtZXRvZHkgdWN0b3ZhbmlXaXphcmQsIGFieSBmw6F6ZSBieWx5IG5hIHphxI3DoXRrdVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy90aGF0LnVjdG92YW5pV2l6YXJkKHVuZGVmaW5lZCwgMCwgLTEpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLy5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLy5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWIuemtvbnRyb2x1alByZWRVY3RvdmFuaW0oXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlrYzogdGhhdC5Ja2MsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByb3dzOiBkYXRhLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9ha3R1YWxpem92YXREdWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG/FmWXFoWl0IHR5cCDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vdHlwX3VjdG92YW5pOiB0aGF0LlByZWRjaG96aUZhemUgPT09IC0xID8gMC8qbnVsbCovIDogKCh0aGF0LlR5cFVjdG92YW5pID8/IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSmVkbm90bGl2ZSkgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YSEubWFwKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzID0gcmV0LnJlc3VsdC5maW5kKGkgPT4geyByZXR1cm4gKGRhdGEuaXhwX3VwciA9PT0gaS5kYXRhLml4cF91cHIgJiYgZGF0YS5yYWRla191cG8gPT09IGkuZGF0YS5yYWRla191cG8pIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gJC5leHRlbmQoXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVjdF90eHRfZXJyOiByZXMuZXJyb3JzPy5yZWR1Y2UoKGFjYywgY3VycikgPT4geyByZXR1cm4gYWNjICsgY3Vyci5tZXNzYWdlICsgXCIgXCI7IH0sIFwiXCIpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdWN0X2tpbmQ6IHJlcy5raW5kLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2IHJlxb5pbXUgamVuWmFza3J0bnV0w6kgemFjaG92YXQgemHFoWtydG51dMOtXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1Y3RfY2hlY2s6IHJlcy5raW5kID09PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MgfHwgcmVzLmtpbmQgPT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuV2FybmluZ1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChleGNJbmZvKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3BlcmFjZSBuZWRvcGFkbGFcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlRleHRDaHlieSA9IEZ1Y1V0aWxzLmdldEV4Y0luZm9NZXNzYWdlKGV4Y0luZm8pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8vIGt2xa9saSBub3bDqW11IEpRdWVyeSBuZXN0YcSNw60gcmV0dXJuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG9bXSB8IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vIFRPRE86IGRvZMSbbGF0IC0gY28gdsWhZWNobm8gc2UgbcOhIGTEm2xhdCBwb3BydsOpIGEgY28gbmEgdGxhxI3DrXRrbz9cclxuICAgICAgICAgICAgLy8gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gcG/EjXR5IHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIEZ1Y1dpemFyZC5yZWZyZXNoS1BJUGFuZWwodGhhdC5rcGlQYW5lbCwgZGF0YSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gY2Vsw70gcG9obGVkXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHBfdXByLHJhZGVrX3Vwb1wiIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuJGdyaWQwUG9oeWJ5LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWxvxb5lbsOtIGhpc3RvcmllIMO6xI10b3bDoW7DrSBhIHBydm90bsOtIGtvbnRyb2xhIHBvaHlixa8gcMWZZWQgw7rEjXRvdsOhbsOtbSAobWV0b2RhIG11c8OtIGLDvXQgdm9sw6FuYSBqZW4gcMWZaSBzcHXFoXTEm27DrSBwcsWvdm9kY2UpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8dm9pZD59IHByb21pc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGluaWNpYWxpemFjZUFQcnZvdG5pS29udHJvbGFQcmVkVWN0b3ZhbmltKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IGluT3BlcmF0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBrb250cm9sYSBwb2h5YsWvIHDFmWVkIMO6xI10b3bDoW7DrW0gdsSNZXRuxJsgemFsb8W+ZW7DrSBoaXN0b3JpZSDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0OTlcIik7IC8vUkMgMjQxMDA0OTkgOiBQcm9iw61ow6Ega29udHJvbGEgcG9oeWLFryBwxZllZCDDusSNdG92w6Fuw61tXHJcbiAgICAgICAgICAgIGluT3BlcmF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLmluaWNpYWxpenVqQVprb250cm9sdWpQcmVkVWN0b3ZhbmltKHsgb2Rsb3plbmU6IGZhbHNlLCBpa2M6IHRoYXQuSWtjLCByb3dzOiB0aGF0LlZzdHVwbmlQb2h5YnksIHVjdFBvaDogdGhhdC5VY3RQb2gsIHBhckt1bXVsb3ZhdFphSXhwOiB0aGF0Lkt1bXVsb3ZhdFphSXhwLCBpeHNIdWY6IHRoYXQuSXhzSHVmIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5PcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5PcGVyYXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldC5yZXN1bHQ/LmRhdGE7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVsb8W+ZW7DrSDDumRhasWvIGEga29udHJvbGEgY2Vsa292w6kgY2h5YnlcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuT2JqPy5mbGFzaEluZm8pIHRoYXQuSW5mb1pLb250cm9seSA9IHJldHVybk9iai5mbGFzaEluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVybk9iaj8uaXhzSHVmKSB0aGF0Lkl4c0h1ZiA9IHJldHVybk9iai5peHNIdWY7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVybk9iaj8uY2h5YmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2Vsa292w6EgY2h5YmEsIMO6xI10b3ZhdCBzZSBuZWJ1ZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UZXh0Q2h5YnkgPSByZXR1cm5PYmouY2h5YmE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjI0MTAwMjEwXCIsIHRoYXQuVGV4dENoeWJ5KSAvL1JDIDI0MTAwMjEwIDogw5rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgoKSA9PiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGtvbnRyb2xhIHBvxI10dSBwb2h5YsWvLCBwb2t1ZCBzZSB6bcSbbmlseSBwb8SNdHkgKHRvIGJ5IHNlIG1vaGxvIHN0w6F0IHUgw7rEjXRvdsOhbsOtIHbFoWVjaCBwb2h5YsWvKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5PYmoucG9jZXRQb2h5YnUgIT0gbnVsbCAmJiByZXR1cm5PYmoucG9jZXRQb2h5YnUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lk1heFVwbyA+IDAgfHwgdGhhdC5NYXhVcG8gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuT2JqLnBvY2V0UG9oeWJ1ID4gKHRoYXQuS29udHJvbFBvY2V0UG9oeWJ1ID8/IDApICYmICh0aGF0LktvbnRyb2xQb2NldFBvaHlidSA/PyAwKSA8IE1hdGguYWJzKHRoYXQuTWF4VXBvKSAmJiByZXR1cm5PYmoucG9jZXRQb2h5YnUgPiBNYXRoLmFicyh0aGF0Lk1heFVwbykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5NYXhVcG8gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5YnJhbsO9Y2ggcG9oeWLFryBqZSB2w61jZSBuZcW+IGplIHBvdm9sZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVGV4dENoeWJ5ID0gXCJqcmVzOjI0MTAwMjM3XCIuZm9ybWF0KEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIocmV0dXJuT2JqLnBvY2V0UG9oeWJ1LCBcIk5cIiksIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIodGhhdC5NYXhVcG8sIFwiTlwiKSk7IC8vUkMgMjQxMDAyMzcgOiBQb8W+YWR1amV0ZSDDusSNdG92YXQgezB9IMO6xI1ldG7DrWNoIHBvaHlixa8sIGFsZSBtYXhpbcOhbG7DrSBwb3ZvbGVuw70gcG/EjWV0IMO6xI1ldG7DrWNoIHBvaHlixa8gcHJvIMO6xI10b3bDoW7DrSBqZSB7MX0uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjI0MTAwMjEwXCIsIHRoYXQuVGV4dENoeWJ5KSAvL1JDIDI0MTAwMjEwIDogw5rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgoKSA9PiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoYXQuTWF4VXBvIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2eWJyYW7DvWNoIHBvaHlixa8gamUgdsOtY2UgbmXFviBqZSBwb3ZvbGVubywgYWxlIG5hIGRvdGF6IGplIG1vxb5uw6kgcG9rcmHEjW92YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKFwianJlczoyNDEwMDIxMFwiLCAvL1JDIDI0MTAwMjEwIDogw5rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MjQxMDAyMzhcIi5mb3JtYXQoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihyZXR1cm5PYmoucG9jZXRQb2h5YnUsIFwiTlwiKSwgR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihNYXRoLmFicyh0aGF0Lk1heFVwbyksIFwiTlwiKSkpIC8vUkMgMjQxMDAyMzggOiBQb8W+YWR1amV0ZSDDusSNdG92YXQgezB9IMO6xI1ldG7DrWNoIHBvaHlixa8sIGFsZSBtYXhpbcOhbG7DrSBwb3ZvbGVuw70gcG/EjWV0IMO6xI1ldG7DrWNoIHBvaHlixa8gcHJvIMO6xI10b3bDoW7DrSBqZSB7MX0uIE9wcmF2ZHUgY2hjZXRlIMO6xI10b3ZhdCB2w61jZSBwb2h5YsWvP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoR0RsZy5tYmJZZXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZZXN0byBwb2tyYcSNb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UZXh0Q2h5YnkgPSBcImpyZXM6MjQxMDAyMzdcIi5mb3JtYXQoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihyZXR1cm5PYmoucG9jZXRQb2h5YnUsIFwiTlwiKSwgR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcih0aGF0Lk1heFVwbywgXCJOXCIpKTsgLy9SQyAyNDEwMDIzNyA6IFBvxb5hZHVqZXRlIMO6xI10b3ZhdCB7MH0gw7rEjWV0bsOtY2ggcG9oeWLFrywgYWxlIG1heGltw6FsbsOtIHBvdm9sZW7DvSBwb8SNZXQgw7rEjWV0bsOtY2ggcG9oeWLFryBwcm8gw7rEjXRvdsOhbsOtIGplIHsxfS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVwb2tyYcSNb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IEZ1Yy5JbnRlcmZhY2UuR1BvaHliSW5pY2lhbGl6YWNlVWN0b3ZhbmlPdXRwdXREdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBrb250cm9sYSBwb8SNdHUgcHJvIHByxa92b2RjZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb2NldFVwbyA9IHJldHVybk9iai5wb2NldFBvaHlidSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBkZWZhdWx0IGRvcG9ydcSNZW7DqWhvIHBvxI10dSBhIHBhayBobyB6YWt0dWFsaXpvdmF0IHpkZSBhIHYgdcW+aXZhdGVsc2vDqW0gbmFzdGF2ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2NldFVwbyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1heFdpemFyZCA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldERlZihcIkdsb2JhbC5GdWMuQXBwU2V0dGluZ3MuVWN0VXBvU2V0dGluZ3NGb3JtLlVjdFdpemFyZE1heENvdW50XCIsIDEwMCkgPz8gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF4V2l6YXJkID4gMCAmJiBwb2NldFVwbyA+IG1heFdpemFyZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5XYXJuaW5nWktvbnRyb2x5ID0gXCJqcmVzOjI0MTAwMjM2XCIuZm9ybWF0KEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIobWF4V2l6YXJkLCBcIk5cIikpOyAvL1JDIDI0MTAwMjM2IDogw5rEjXRvdsOhbsOtIHbDrWNlIG5lxb4gezB9IHBvaHlixa8gamUgZG9wb3J1xI1lbm8gcHJvdsOhZMSbdCBvZGxvxb5lbsSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqOiBGdWMuSW50ZXJmYWNlLkdQb2h5YkluaWNpYWxpemFjZVVjdG92YW5pT3V0cHV0RHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdWxvxb5lbsOtIMO6ZGFqxa8gYSBrb250cm9sYSBwZXZuw6lobyB0eXB1IMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5PYmo/LnBhckt1bXVsb3ZhdFphSXhwICE9IG51bGwpIHRoYXQuS3VtdWxvdmF0WmFJeHAgPSByZXR1cm5PYmoucGFyS3VtdWxvdmF0WmFJeHA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSmVkbm90bGl2ZSA9IHJldHVybk9iaj8ucG92b2xlbm9VY3RvdmFuaUplZG5vdGxpdmUgPT09IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSHJvbWFkbmUgPSByZXR1cm5PYmo/LnBvdm9sZW5vVWN0b3ZhbmlIcm9tYWRuZSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LlBvdm9sZW5vVWN0b3ZhbmlLdW11bG92YW5lID0gcmV0dXJuT2JqPy5wb3ZvbGVub1VjdG92YW5pS3VtdWxvdmFuZSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb3Bsbml0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0aGF0LlBldlR5cFVjdEFubyA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCEoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhhdC5UeXBVY3RvdmFuaSA9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0LkplZG5vdGxpdmUgJiYgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSmVkbm90bGl2ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICh0aGF0LlR5cFVjdG92YW5pID09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSHJvbWFkbmUgJiYgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSHJvbWFkbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAodGhhdC5UeXBVY3RvdmFuaSA9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0Lkt1bXVsb3ZhbmUgJiYgdGhhdC5Qb3ZvbGVub1VjdG92YW5pS3VtdWxvdmFuZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UZXh0Q2h5YnkgPSBcImpyZXM6MjQxMDA0OTZcIjsgLy9SQyAyNDEwMDQ5NiA6IFBvxb5hZG92YW7DvSB0eXAgw7rEjXRvdsOhbsOtIG5lbsOtIHBvdm9sZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcImpyZXM6MjQxMDAyMTBcIiwgLy9SQyAyNDEwMDIxMCA6IMOaxI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UZXh0Q2h5YnkpIC8vUkMgMjQxMDA0OTYgOiBQb8W+YWRvdmFuw70gdHlwIMO6xI10b3bDoW7DrSBuZW7DrSBwb3ZvbGVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgoKSA9PiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluT3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluT3BlcmF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi5saXN0KHJxID0+IHsgcmV0dXJuIHsgZmlsdGVyczogeyBkdWN0X2FubzogMCwgZHVjdF9pa2M6IHRoYXQuSWtjIH0gfTsgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCB8fCBkYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtvbmVjLCBwb2t1ZCBuZWpzb3Ugxb7DoWRuw6kgcG9oeWJ5IGsgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UZXh0Q2h5YnkgPSBcIk5lYnlseSB2eWJyw6FueSDFvsOhZG7DqSBwb2h5YnkgayDDusSNdG92w6Fuw61cIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YTogRnVjLkludGVyZmFjZS5HUG9oeWJEdG9bXSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIHrDoXBpcyBkbyBoaXN0b3JpZSDDusSNdG92w6Fuw60gKHphaMOhamVuw60ga29udHJvbHkpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliSGlzdG9yaWVVY3RvdmFuaS51cGRhdGVGYXplKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXhzX2h1ZjogdGhhdC5JeHNIdWYsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHN0YXJ0OiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBmYXplX3VjdG92YW5pOiBHb3JkaWMuRnVjLkludGVyZmFjZS5GYXplVWN0b3ZhbmlQb2h5YnVXaXphcmQuS29udHJvbGFQb2h5YnUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHByaXpfb2RsOiAwXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YTogRnVjLkludGVyZmFjZS5HUG9oeWJEdG9bXSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi56a29udHJvbHVqUHJlZFVjdG92YW5pbShcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWtjOiB0aGF0LklrYyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJvd3M6IGRhdGEsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL2FrdHVhbGl6b3ZhdER1Y3Q6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb8WZZcWhaXQgdHlwIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdHlwX3VjdG92YW5pOiB0aGF0LlByZWRjaG96aUZhemUgPT09IC0xID8gMC8qbnVsbCovIDogKCh0aGF0LlR5cFVjdG92YW5pID8/IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSmVkbm90bGl2ZSkgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXhjSW5mbykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UZXh0Q2h5YnkgPSBGdWNVdGlscy5nZXRFeGNJbmZvTWVzc2FnZShleGNJbmZvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGE6IEZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvW10pIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyB6w6FwaXMgZG8gaGlzdG9yaWUgw7rEjXRvdsOhbsOtICh1a29uxI1lbsOtIGtvbnRyb2x5KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Ykhpc3RvcmllVWN0b3ZhbmkudXBkYXRlRmF6ZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGl4c19odWY6IHRoYXQuSXhzSHVmLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBzdGFydDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGZhemVfdWN0b3Zhbmk6IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkZhemVVY3RvdmFuaVBvaHlidVdpemFyZC5Lb250cm9sYVBvaHlidSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcHJpel9vZGw6IDBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhOiBGdWMuSW50ZXJmYWNlLkdQb2h5YkR0b1tdKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8ga29udHJvbGEgcG/EjXR1IHBvaHlixa8gcG9kbGUgbWF4aW3DoWxuw61obyBsaW1pdHVcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiBuZXVkxJtsYXQgdG8gbsSbamFrIGVmZWt0aXZuxJtqaT9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiB0YWtobGUgamUgdG8gYmV6IG9obGVkdSBuYSB6YcWha3J0bnV0w6kgLSBqZSB0byBzcHLDoXZuxJs/IG5lbcSbbG8gYnkgdG8gYsO9dCBwb2RsZSB0b2hvLCBqZXN0bGkgamUgdG8gcHJ2b3Ruw60gdGVzdCBuZWJvIG5lPyBtw6Egc2UgdG8gdsWvYmV6IHBvdcWhdMSbdCBpIHogYWtjZT9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL2xldCBjaFJhZGt5ID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4odGhhdC4kZ3JpZDBQb2h5YnkpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vbGV0IHBvY2V0VXBvOiBudW1iZXIgPSBjaFJhZGt5ICE9IG51bGwgPyBjaFJhZGt5IS5sZW5ndGggOiAwO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGxldCBwb2NldFVwbyA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICh0aGF0Lk1heFVwbyA+IDAgJiYgcG9jZXRVcG8gPiB0aGF0Lk1heFVwbykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyB2eWJyYW7DvWNoIHBvaHlixa8gamUgdsOtY2UgbmXFviBqZSBwb3ZvbGVub1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBwb8SNZXQgc2UgbXVzw60gcMWZaSBvcHXFoXTEm27DrSBmw6F6ZSAwIHprb250cm9sdm9hdFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBUT0RPOiBqZSB0ZW5obGUgcMWZw616bmFrIHbFr2JlYyBwb3TFmWViYSwga2R5xb4gc2UgdGF0byBtZXRvZGEgdm9sw6EgamVuIHDFmWkgc3B1xaF0xJtuw60gcHLFr3ZvZGNlP1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmZhemUwS29udHJQb2NldFVwbyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIHZ5YnJhbsO9Y2ggcG9oeWLFryBqZSB2w61jZSBuZcW+IGplIHBvdm9sZW5vXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuVGV4dENoeWJ5ID0gXCJqcmVzOjI0MTAwMjM3XCIuZm9ybWF0KHBvY2V0VXBvLCB0aGF0Lk1heFVwbyk7IC8vUkMgMjQxMDAyMzcgOiBQb8W+YWR1amV0ZSDDusSNdG92YXQgezB9IMO6xI1ldG7DrWNoIHBvaHlixa8sIGFsZSBtYXhpbcOhbG7DrSBwb3ZvbGVuw70gcG/EjWV0IMO6xI1ldG7DrWNoIHBvaHlixa8gcHJvIMO6xI10b3bDoW7DrSBqZSB7MX0uXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjI0MTAwMjEwXCIsIHRoYXQuVGV4dENoeWJ5KSAvL1JDIDI0MTAwMjEwIDogw5rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgoKSA9PiBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGVsc2UgaWYgKHRoYXQuTWF4VXBvIDwgMCAmJiBwb2NldFVwbyA+IE1hdGguYWJzKHRoYXQuTWF4VXBvKSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyB2eWJyYW7DvWNoIHBvaHlixa8gamUgdsOtY2UgbmXFviBqZSBwb3ZvbGVubywgYWxlIG5hIGRvdGF6IGplIG1vxb5uw6kgcG9rcmHEjW92YXRcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5mYXplMEtvbnRyUG9jZXRVcG8gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjI0MTAwMjEwXCIsIC8vUkMgMjQxMDAyMTAgOiDDmsSNdG92w6Fuw61cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIFwianJlczoyNDEwMDIzOFwiLmZvcm1hdChwb2NldFVwbywgTWF0aC5hYnModGhhdC5NYXhVcG8pKSkgLy9SQyAyNDEwMDIzOCA6IFBvxb5hZHVqZXRlIMO6xI10b3ZhdCB7MH0gw7rEjWV0bsOtY2ggcG9oeWLFrywgYWxlIG1heGltw6FsbsOtIHBvdm9sZW7DvSBwb8SNZXQgw7rEjWV0bsOtY2ggcG9oeWLFryBwcm8gw7rEjXRvdsOhbsOtIGplIHsxfS4gT3ByYXZkdSBjaGNldGUgw7rEjXRvdmF0IHbDrWNlIHBvaHlixa8/XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb8SNZXQgdcW+IG5la29udHJvbG92YXRcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZhemUwS29udHJQb2NldFVwbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVGV4dENoeWJ5ID0gXCJqcmVzOjI0MTAwMjM3XCIuZm9ybWF0KHBvY2V0VXBvLCB0aGF0Lk1heFVwbyk7IC8vUkMgMjQxMDAyMzcgOiBQb8W+YWR1amV0ZSDDusSNdG92YXQgezB9IMO6xI1ldG7DrWNoIHBvaHlixa8sIGFsZSBtYXhpbcOhbG7DrSBwb3ZvbGVuw70gcG/EjWV0IMO6xI1ldG7DrWNoIHBvaHlixa8gcHJvIMO6xI10b3bDoW7DrSBqZSB7MX0uXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvxI1ldCBzZSBtdXPDrSBwxZlpIG9wdcWhdMSbbsOtIGbDoXplIDAgemtvbnRyb2xvdmF0XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGt2xa9saSBub3bDqW11IEpRdWVyeSBuZXN0YcSNw60gcmV0dXJuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGE6IEZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvW10pIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBrb250cm9sYSBwb8SNdHUgcHJvIHByxa92b2RjZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGxldCBwb2NldFVwbyA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBkZWZhdWx0IGRvcG9ydcSNZW7DqWhvIHBvxI10dSBhIHBhayBobyB6YWt0dWFsaXpvdmF0IHpkZSBhIHYgdcW+aXZhdGVsc2vDqW0gbmFzdGF2ZW7DrVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGxldCBtYXhXaXphcmQgPSB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXREZWYoXCJHbG9iYWwuRnVjLkFwcFNldHRpbmdzLlVjdFVwb1NldHRpbmdzRm9ybS5VY3RXaXphcmRNYXhDb3VudFwiLCAxMDApID8/IDEwMDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAocG9jZXRVcG8gPiAwICYmIG1heFdpemFyZCA+IDAgJiYgcG9jZXRVcG8gPiBtYXhXaXphcmQpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5XYXJuaW5nWktvbnRyb2x5ID0gXCJqcmVzOjI0MTAwMjM2XCIuZm9ybWF0KG1heFdpemFyZCk7IC8vUkMgMjQxMDAyMzYgOiDDmsSNdG92w6Fuw60gdsOtY2UgbmXFviB7MH0gcG9oeWLFryBqZSBkb3BvcnXEjWVubyBwcm92w6FkxJt0IG9kbG/FvmVuxJtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGE6IEZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvW10pIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiBwb3XFvsOtdCBrb25zdGFudHUgbmEgZsOhemkgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogdHVobGUgcHJ2b3Ruw60ga29udHJvbHUgb2RzdHJhbml0IG5lYm8gdXByYXZpdFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIHpqacWhdMSbbsOtIHBvdm9sZW7DvWNoIHR5cMWvIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGxldCBwcm9taXNlczogSlF1ZXJ5UHJvbWlzZTxhbnk+W10gPSBbXTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBwxZnDrXpuYWsga3VtdWxhY2UgemEgUElEIC0gbm92xJsgYmV6IG9obGVkdSBuYSBkYcWIb3bDqSBwb2h5YnksIHR5IHNpIG1vdG9yIHBvxZllxaHDrSBzw6FtLCB0YWvFvmUgamVuIHBvZGxlIHBhcmFtZXRydSBhIHDFmcOtcGFkbsO9Y2ggcG9oeWLFryB6IFBPS1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnN0IHphbEt1bXVsb3ZhdFphSXhwID0gdGhhdC5LdW11bG92YXRaYUl4cDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoIXRoYXQuS3VtdWxvdmF0WmFJeHApIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gcGFyYW1ldHIgcHJvIGFrdHXDoWxuw60gbW90b3J5IHXFviBuZcWZZcWhw60gZGHFiG92w6kgcG9oeWJ5XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuS3VtdWxvdmF0WmFJeHAgPSAoZGF0YS5maW5kSW5kZXgoKHBvaHliKSA9PiAocG9oeWIudXByX2t0Z191cHIgPT09IEZ1Yy5HbG9iYWxzLkVudW1zLkt0Z1Vwci5Qb2tsYWRuYSkvKiB8fCAocG9oeWIuSmVEYW5vdnkgPT09IHRydWUpKi8pID49IDApO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoemFsS3VtdWxvdmF0WmFJeHAgIT09IHRoYXQuS3VtdWxvdmF0WmFJeHApIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY29uc3QgcG9oeWJ5UG9rID0gKGRhdGEuZmluZEluZGV4KChwb2h5YikgPT4gKHBvaHliLnVwcl9rdGdfdXByID09PSBGdWMuR2xvYmFscy5FbnVtcy5LdGdVcHIuUG9rbGFkbmEpKSA+PSAwKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY29uc3QgcG9oeWJ5TmVQb2sgPSAoZGF0YS5maW5kSW5kZXgoKHBvaHliKSA9PiAocG9oeWIudXByX2t0Z191cHIgIT09IEZ1Yy5HbG9iYWxzLkVudW1zLkt0Z1Vwci5Qb2tsYWRuYSkpID49IDApO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAocG9oeWJ5UG9rICYmIHBvaHlieU5lUG9rKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LkluZm9aS29udHJvbHkgPSBcImpyZXM6MjQxMDAzNzdcIjsgLy9SQyAyNDEwMDM3NyA6IEt2xa9saSDDusSNdG92w6Fuw60gcG9oeWLFryBob3Rvdm9zdG7DrWNoIHDFmcOtcGFkxa8gamUgemFwbnV0YSBrdW11bGFjZSB6YSBQSUQgcMWZw61wYWR1IGkgcHJvIHBvaHlieSBqaW7DvWNoIGthdGVnb3Jpw60gcMWZw61wYWTFr1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIFRPRE86IMWZZcWhaXQgcG92b2xlbsOtIMO6xI10b3bDoW7DrSBuZWJvIHRvIMWZZcWhaXQgYcW+IHYga29udHJvbGUgcMWZaSBwxZllY2hvZHUgZG8gZsOhemUgMVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIFRPRE86IG5lenJ1xaFpdCBrb25zdGFudHkgR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdCwga2R5xb4gamUgR29yZGljLkZ1Yy5JbnRlcmZhY2UuVHlwVWN0b3ZhbmlQb2h5YnU/XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKHRoYXQuVWN0UG9oID09PSBHbG9iYWxzLkVudW1zLlVjdFBvaC5Tb3VwaXNreSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBwb3ZvbGVuw60gcG9kbGUgdmxhc3Rub3N0w60gc291cGlzZWtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliU291cGlza2EuanNvdVVjdG92YW5pUG92b2xlbmEoeyB0eXBVY3RvdmFuaTogW0dvcmRpYy5GdWMuSW50ZXJmYWNlLlR5cFVjdG92YW5pUG9oeWJ1LkplZG5vdGxpdmUsIEdvcmRpYy5GdWMuSW50ZXJmYWNlLlR5cFVjdG92YW5pUG9oeWJ1Lkhyb21hZG5lLCBHb3JkaWMuRnVjLkludGVyZmFjZS5UeXBVY3RvdmFuaVBvaHlidS5LdW11bG92YW5lXSwgcm93czogZGF0YSB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocG92KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvdikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlBvdm9sZW5vVWN0b3ZhbmlKZWRub3RsaXZlID0gcG92W1wiSmVkbm90bGl2ZVwiXSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSHJvbWFkbmUgPSBwb3ZbXCJIcm9tYWRuZVwiXSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qb3ZvbGVub1VjdG92YW5pS3VtdWxvdmFuZSA9IHBvdltcIkt1bXVsb3ZhbmVcIl0gPT09IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBwb3ZvbGVuw60gcG9kbGUgdmxhc3Rub3N0w60gcG9oeWLFr1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWIuanNvdVVjdG92YW5pUG92b2xlbmEoeyB0eXBVY3RvdmFuaTogW0dvcmRpYy5GdWMuSW50ZXJmYWNlLlR5cFVjdG92YW5pUG9oeWJ1LkplZG5vdGxpdmUsIEdvcmRpYy5GdWMuSW50ZXJmYWNlLlR5cFVjdG92YW5pUG9oeWJ1Lkhyb21hZG5lLCBHb3JkaWMuRnVjLkludGVyZmFjZS5UeXBVY3RvdmFuaVBvaHlidS5LdW11bG92YW5lXSwgcm93czogZGF0YSB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocG92KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvdikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlBvdm9sZW5vVWN0b3ZhbmlKZWRub3RsaXZlID0gcG92W1wiSmVkbm90bGl2ZVwiXSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSHJvbWFkbmUgPSBwb3ZbXCJIcm9tYWRuZVwiXSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Qb3ZvbGVub1VjdG92YW5pS3VtdWxvdmFuZSA9IHBvdltcIkt1bXVsb3ZhbmVcIl0gPT09IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vcmV0dXJuICQud2hlbi5hcHBseShudWxsLCBwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgLy8gbmFzdGF2ZW7DrSBzdGF2dSB0eXDFryDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAvL2lmICghdGhhdC5QZXZUeXBVY3RBbm8pIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAvLyAgICBsZXQgcmFkaW9UeXBVY3QgPSB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfdWN0b3ZhbmlcIikuZ3JhZGlvKFwib3B0aW9uXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIC8vICAgIHJhZGlvVHlwVWN0LnJhZGlvc1swXS5kaXNhYmxlZCA9ICF0aGF0LlBvdm9sZW5vVWN0b3ZhbmlKZWRub3RsaXZlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIC8vICAgIHJhZGlvVHlwVWN0LnJhZGlvc1sxXS5kaXNhYmxlZCA9ICF0aGF0LlBvdm9sZW5vVWN0b3ZhbmlIcm9tYWRuZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAvLyAgICByYWRpb1R5cFVjdC5yYWRpb3NbMl0uZGlzYWJsZWQgPSAhdGhhdC5Qb3ZvbGVub1VjdG92YW5pS3VtdWxvdmFuZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAvLyAgICB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfdWN0b3ZhbmlcIikuZ3JhZGlvKFwiZGVzdHJveVwiKS5ncmFkaW8ocmFkaW9UeXBVY3QpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyB0eXBfdWN0b3Zhbmk6IHRoYXQuVHlwVWN0b3ZhbmkgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgLy99XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBzcHLDoXZuw70gdHlwIC0gb3ByYXZhIGt2xa9saSBwYWRsw6ltdSBCUyB2IHN1ZMOpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YTogRnVjLkludGVyZmFjZS5HUG9oeWJEdG9bXSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIGtvbnRyb2xhIHBldm7DqWhvIHR5cHUgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICgodGhhdC5QZXZUeXBVY3RBbm8gPT09IHRydWUpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICYmICghKCh0aGF0LlR5cFVjdG92YW5pID09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSmVkbm90bGl2ZSAmJiB0aGF0LlBvdm9sZW5vVWN0b3ZhbmlKZWRub3RsaXZlKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfHwgKHRoYXQuVHlwVWN0b3ZhbmkgPT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC5Icm9tYWRuZSAmJiB0aGF0LlBvdm9sZW5vVWN0b3ZhbmlIcm9tYWRuZSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHx8ICh0aGF0LlR5cFVjdG92YW5pID09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuS3VtdWxvdmFuZSAmJiB0aGF0LlBvdm9sZW5vVWN0b3ZhbmlLdW11bG92YW5lKSkpKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuVGV4dENoeWJ5ID0gXCJQb8W+YWRvdmFuw70gdHlwIMO6xI10b3bDoW7DrSBuZW7DrSBwb3ZvbGVuXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vdGhhdC5UZXh0Q2h5YnkgPSBcIlRvaGxlIGplIHDFmcOta2xhZCBkbG9vb29vdWjDqWhvIHRleHR1LCBrdGVyw70gc2Ugcm96ZMSbbHVqZSBkbyDEjXR5xZkgc2xvdXBjxa8gYSBwYWsgc2UgdG8gemFzZSBza2zDoWTDoSAwMS4gVG9obGUgamUgcMWZw61rbGFkIGRsb29vb291aMOpaG8gdGV4dHUsIGt0ZXLDvSBzZSByb3pkxJtsdWplIGRvIMSNdHnFmSBzbG91cGPFryBhIHBhayBzZSB0byB6YXNlIHNrbMOhZMOhIDAyLiBUb2hsZSBqZSBwxZnDrWtsYWQgZGxvb29vb3Vow6lobyB0ZXh0dSwga3RlcsO9IHNlIHJvemTEm2x1amUgZG8gxI10ecWZIHNsb3VwY8WvIGEgcGFrIHNlIHRvIHphc2Ugc2tsw6Fkw6EgMDMuIFRvaGxlIGplIHDFmcOta2xhZCBkbG9vb29vdWjDqWhvIHRleHR1LCBrdGVyw70gc2Ugcm96ZMSbbHVqZSBkbyDEjXR5xZkgc2xvdXBjxa8gYSBwYWsgc2UgdG8gemFzZSBza2zDoWTDoSAwNC4gVG9obGUgamUgcMWZw61rbGFkIGRsb29vb291aMOpaG8gdGV4dHUsIGt0ZXLDvSBzZSByb3pkxJtsdWplIGRvIMSNdHnFmSBzbG91cGPFryBhIHBhayBzZSB0byB6YXNlIHNrbMOhZMOhIDA1LiBUb2hsZSBqZSBwxZnDrWtsYWQgZGxvb29vb3Vow6lobyB0ZXh0dSwga3RlcsO9IHNlIHJvemTEm2x1amUgZG8gxI10ecWZIHNsb3VwY8WvIGEgcGFrIHNlIHRvIHphc2Ugc2tsw6Fkw6EgMDYuIFRvaGxlIGplIHDFmcOta2xhZCBkbG9vb29vdWjDqWhvIHRleHR1LCBrdGVyw70gc2Ugcm96ZMSbbHVqZSBkbyDEjXR5xZkgc2xvdXBjxa8gYSBwYWsgc2UgdG8gemFzZSBza2zDoWTDoSAwNy4gVG9obGUgamUgcMWZw61rbGFkIGRsb29vb291aMOpaG8gdGV4dHUsIGt0ZXLDvSBzZSByb3pkxJtsdWplIGRvIMSNdHnFmSBzbG91cGPFryBhIHBhayBzZSB0byB6YXNlIHNrbMOhZMOhIDA4LiBUb2hsZSBqZSBwxZnDrWtsYWQgZGxvb29vb3Vow6lobyB0ZXh0dSwga3RlcsO9IHNlIHJvemTEm2x1amUgZG8gxI10ecWZIHNsb3VwY8WvIGEgcGFrIHNlIHRvIHphc2Ugc2tsw6Fkw6EgMDkuIFRvaGxlIGplIHDFmcOta2xhZCBkbG9vb29vdWjDqWhvIHRleHR1LCBrdGVyw70gc2Ugcm96ZMSbbHVqZSBkbyDEjXR5xZkgc2xvdXBjxa8gYSBwYWsgc2UgdG8gemFzZSBza2zDoWTDoSAxMC4gXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjI0MTAwMjEwXCIsIHRoYXQuVGV4dENoeWJ5KSAvL1JDIDI0MTAwMjEwIDogw5rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgoKSA9PiBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZvbMOhbsOtIHNlcnZlcm92w6kgbWV0b2R5IHBybyBvYnNsdWh1IGbDoXplIMO6xI10b3bDoW7DrSBzIG/FoWV0xZllbsOtbSBkb3RhenUgbmEgcMWZZcSNZXJww6Fuw61cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2V4cGxGYXplXSBub3bDoSBmw6F6ZSDDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2V4cGxQcmVkY2hvemlGYXplXSBwxa92b2Ruw60gZsOhemUgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBbcG92b2xpdFByZXJwYW5pXSBwb3ZvbGl0IHDFmWXEjWVycMOhbsOtP1xyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3phY2hOZWF1dG9tYXRpY2tlXSB6YWNob3ZhbCBwb2xvYXV0b21hdGlja8OpIGEgcnXEjW7DrSB6w6FwaXN5P1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB1Y3RvdmFuaVdpemFyZChleHBsRmF6ZT86IG51bWJlciwgZXhwbFByZWRjaG96aUZhemU/OiBudW1iZXIsIHBvdm9saXRQcmVycGFuaT86IGJvb2xlYW4sIHphY2hOZWF1dG9tYXRpY2tlPzogYm9vbGVhbik6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBrb21lbnTDocWZZSBwcm9tbcSbbsO9Y2ggbWV0b2R5XHJcbiAgICAgICAgICAgIC8vIFRPRE86IHptxJtuaXQgcG/FmWFkw60gdnN0dXBuw61jaCBwYXJhbWV0csWvIChwxZllxI1lcnDDoW7DrSBhxb4gemEgZsOhemUpXHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBwb21vY27DoSBtZXRvZGEgcHJvIHDFmcOtcGFkbm91IHptxJtudSBwYXJhbWV0csWvIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAvL2xldCBSZXBlYXRPbkV4Y2VwdGlvbiA9IGZ1bmN0aW9uIChjb25kaXRpb25hbFJlcXVlc3RNb2RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgLy8gICAgbGV0IHJlY3Vyc2l2ZUNhbGwgPSBmdW5jdGlvbiAocmVxdWVzdCwgbmV4dCwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gbmV4dChyZXF1ZXN0KS5jYXRjaCgoZXhjSW5mbykgPT5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25kaXRpb25hbFJlcXVlc3RNb2RpZmljYXRpb24oZXhjSW5mbykudGhlbihcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgKGNoYW5nZXJlcSkgPT4gKGNoYW5nZXJlcSA/IHJlY3Vyc2l2ZUNhbGwoKCQgYXMgYW55KS5kZWVwRXh0ZW5kV29BcnJheSh7fSwgcmVxdWVzdCwgY2hhbmdlcmVxKSwgbmV4dCwgY3R4KSA6ICQuRGVmZXJyZWQoKS5yZWplY3QoZXhjSW5mbykpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAoKSA9PiAkLkRlZmVycmVkKCkucmVqZWN0KGV4Y0luZm8pLnByb21pc2UoKSlcclxuICAgICAgICAgICAgLy8gICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuIHJlY3Vyc2l2ZUNhbGw7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZhemU6IG51bWJlciA9IChleHBsRmF6ZSAhPSBudWxsID8gZXhwbEZhemUgOiB0aGF0LkZhemUpO1xyXG4gICAgICAgICAgICBsZXQgcHJlZGNob3ppRmF6ZTogbnVtYmVyID0gKGV4cGxQcmVkY2hvemlGYXplICE9IG51bGwgPyBleHBsUHJlZGNob3ppRmF6ZSA6IHRoYXQuUHJlZGNob3ppRmF6ZSk7XHJcbiAgICAgICAgICAgIGxldCB0eXBVY3RvdmFuaTogbnVtYmVyID0gdGhhdC5UeXBVY3RvdmFuaSA/PyBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0LkplZG5vdGxpdmU7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24odGhpcy5nZXRUZXh0RmF6ZShleHBsRmF6ZSkpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBwxZllZMOhdmF0IHNlem5hbSBwb2h5YsWvP1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWIudWN0dWpQcmVzV2l6YXJkKHtcclxuICAgICAgICAgICAgICAgIGlrYzogdGhhdC5Ja2MsXHJcbiAgICAgICAgICAgICAgICBpeHNIdWY6IHRoYXQuSXhzSHVmLFxyXG4gICAgICAgICAgICAgICAgZmF6ZVVjdG92YW5pOiBmYXplLFxyXG4gICAgICAgICAgICAgICAgbWludWxhRmF6ZVVjdG92YW5pOiBwcmVkY2hvemlGYXplLFxyXG4gICAgICAgICAgICAgICAgdHlwVWN0b3Zhbmk6IHR5cFVjdG92YW5pLFxyXG4gICAgICAgICAgICAgICAga3VtdWxhY2VaYUl4cDogdGhhdC5LdW11bG92YXRaYUl4cCxcclxuICAgICAgICAgICAgICAgIHZ5cm92bmFub3N0OiB0aGF0LlZ5cm92bmF0WmFOa3MsXHJcbiAgICAgICAgICAgICAgICBiZXpLb250cm9seVByZWNlcnBhbmk6IChwb3ZvbGl0UHJlcnBhbmkgIT0gbnVsbCA/IHBvdm9saXRQcmVycGFuaSA6IHRoYXQuTmVrb250cm9sb3ZhdFByZWNlcnBhbmkpLFxyXG4gICAgICAgICAgICAgICAgemFjaG92YXRSdWNuaVphcGlzeTogKHphY2hOZWF1dG9tYXRpY2tlICE9IG51bGwgPyB6YWNoTmVhdXRvbWF0aWNrZSA6IHRydWUpLFxyXG4gICAgICAgICAgICAgICAgZVVjZXRuaWN0dmk6IHRoYXQuRVVjZXRuaWN0dmksXHJcbiAgICAgICAgICAgICAgICBpeHNGdW5Pb3p1VWN0OiB0aGF0Lml4c0Z1bk9venVVY3QsXHJcbiAgICAgICAgICAgICAgICBpeHBEZW5VY3Q6IHRoYXQuaXhwRGVuVWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudXNlKEZ1Y1V0aWxzLnJlcGVhdE9uRXhjZXB0aW9uKChleGNJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4Y0luZm8/LmRhdGE/LnZldGEgIT0gbnVsbCAmJiBleGNJbmZvPy5kYXRhPy52ZXRhICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gamRlIG8gY2h5YnUgbmEgcm96dnJoLCB2xJt0YSBidWRlIHDFmWV2ZW5hIG5hIHBvZG9idSBmaWx0csWvIHBybyBwxZnDrXBhZG7DqSB6b2JyYXplbsOtIHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcMWZZXbDqXN0IHbEm3R1IGRvIHN0cnVrdHVyeSBmaWx0csWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRmlsdHJ5UG9oeWJ1MVtcInphcF92ZXRhXCJdID0gW3sgY2Z1OiB7fSB9XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3ZhID0gZXhjSW5mby5kYXRhLnZldGEuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9jZXRTbG92ID0gc2xvdmEubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzIGFzIGFueSkuZGF0YVNlbnRlbmNlPy5hbGxTb3J0ZWREYXRhV29yZHM/LmZvckVhY2goKHdvcmQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgcG9jZXRTbG92ICYmIHdvcmQ/LlBvdXppdGkgPT09IDEgJiYgd29yZD8uRGJOYXpldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRmlsdHJ5UG9oeWJ1MS56YXBfdmV0YSFbMF0uY2Z1IVt3b3JkLkRiTmF6ZXZdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogc2xvdmFbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogc2xvdmFbaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5GaWx0cnlQb2h5YnUxW1wiemFwX3ZldGFfdHh0XCJdID0gZXhjSW5mbz8uZGF0YT8udmV0YTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4Y0luZm8/LmRhdGE/LnByZWNlcnBhbmkgJiYgdGhhdC5Nb3pub3N0UHJlY2VycGFuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIHDFmWXEjWVycMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4Y0luZm8uaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybShGdWNVdGlscy5nZXRFeGNJbmZvTWVzc2FnZShleGNJbmZvLCB0cnVlKSwgNjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoR0RsZy5tYmJZZXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7IHRoYXQuWmF1Y3RvdmFub0JlelByZWNlcnBhbmkgPSBmYWxzZTsgcmV0dXJuIHsgYmV6S29udHJvbHlQcmVjZXJwYW5pOiB0cnVlIH07IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoZXhjSW5mbykucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hcGxuxJtuw60gZ3JpZHUgc2V6bmFtdSBwb2h5YsWvIHYgcHJ2bsOtbSBrcm9rdSBwcsWvdm9kY2VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZFBvaHlieTAoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBmaWx0cnlcclxuICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7IGR1Y3RfYW5vOiAwLCBkdWN0X2lrYzogdGhhdC5Ja2MvKiwgc191cG86IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TVXBvLk5lemF1Y3RvdmFueSwgc19zdG86IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TU3RvLk5lc3Rvcm5vdmFubyovIH07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkZhemUgPiAxKSAkLmV4dGVuZChmaWx0ZXJzLCB7IGR1Y3RfdW5jaGVjazogMCB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0ODBcIik7IC8vUkMgMjQxMDA0ODAgOiBQcm9iw61ow6EgbmHEjXRlbsOtIHBvaHlixa9cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLmxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogRnVjV2l6YXJkLmdldEZyYWdtZW50c0Zyb21HcmlkQ29sdW1uczxGdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4odGhhdC4kZ3JpZDBQb2h5YnkuZ2dyaWQ8RnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KFwidHJ1ZUNvbHVtbnNcIiksIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLy8udGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gw7pwcmF2YSBkYXRcclxuICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi56a29udHJvbHVqUHJlZFVjdG92YW5pbShcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlrYzogdGhhdC5Ja2MsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJvd3M6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vYWt0dWFsaXpvdmF0RHVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdHlwX3VjdG92YW5pOiB0aGF0LlByZWRjaG96aUZhemUgPT09IC0xID8gMC8qbnVsbCovIDogKCh0aGF0LlR5cFVjdG92YW5pID8/IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSmVkbm90bGl2ZSkgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGRhdGEgPSBkYXRhIS5tYXAoZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgcmVzID0gcmV0LnJlc3VsdC5maW5kKGkgPT4geyByZXR1cm4gKGRhdGEuaXhwX3VwciA9PT0gaS5kYXRhLml4cF91cHIgJiYgZGF0YS5yYWRla191cG8gPT09IGkuZGF0YS5yYWRla191cG8pIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRhdGEgPSAkLmV4dGVuZChcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVjdF90eHRfZXJyOiByZXMuZXJyb3JzPy5yZWR1Y2UoKGFjYywgY3VycikgPT4geyByZXR1cm4gYWNjICsgY3Vyci5tZXNzYWdlICsgXCIgXCI7IH0sIFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVjdF9raW5kOiByZXMua2luZCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1Y3RfY2hlY2s6IHJlcy5raW5kID09PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MgfHwgcmVzLmtpbmQgPT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuV2FybmluZ1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGE/Lm1hcChkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuZHVjdF9jaGVjayA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkW1wiZHVjdF9jaGVja1wiXSA9IGQuZHVjdF9raW5kID09PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MgfHwgZC5kdWN0X2tpbmQgPT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuV2FybmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChkLmR1Y3RfdW5jaGVjayA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkW1wiZHVjdF9jaGVja1wiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9lbHNlIGlmIChkLmR1Y3RfdW5jaGVjayA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkW1wiZHVjdF9jaGVja1wiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkW1wiZHVjdF9jaGVja1wiXSA9IGQuZHVjdF9raW5kID09PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MgfHwgZC5kdWN0X2tpbmQgPT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuV2FybmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZGF0YSA9IGRhdGEhLm1hcChkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBsZXQgcmVzID0gcmV0LnJlc3VsdC5maW5kKGkgPT4geyByZXR1cm4gKGRhdGEuaXhwX3VwciA9PT0gaS5kYXRhLml4cF91cHIgJiYgZGF0YS5yYWRla191cG8gPT09IGkuZGF0YS5yYWRla191cG8pIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZGF0YSA9ICQuZXh0ZW5kKFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZHVjdF90eHRfZXJyOiByZXMuZXJyb3JzPy5yZWR1Y2UoKGFjYywgY3VycikgPT4geyByZXR1cm4gYWNjICsgY3Vyci5tZXNzYWdlICsgXCIgXCI7IH0sIFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGR1Y3Rfa2luZDogcmVzLmtpbmQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZHVjdF9jaGVjazogcmVzLmtpbmQgPT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcyB8fCByZXMua2luZCA9PT0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5XYXJuaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb8SNdHkgesOhem5hbcWvXHJcbiAgICAgICAgICAgICAgICAgICAgRnVjV2l6YXJkLnJlZnJlc2hLUElQYW5lbCh0aGF0LmtwaVBhbmVsLCBkYXRhISk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHBfdXByLHJhZGVrX3Vwb1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQwUG9oeWJ5LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRsOhemUgMSAtIHrDoXBpc3kgcG9oeWLFr1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkUG9oeWJ5MSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHBvdcW+w612YXQgdGV4dHkgdmUgdsWhZWNoIGbDoXrDrWNoIG5lYm8gdG8genJ1xaFpdD9cclxuICAgICAgICAgICAgLy90aGF0LmJlZ2luT3BlcmF0aW9uKHRoaXMuZ2V0VGV4dEZhemUoKSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczoyNDEwMDQ4MFwiKTsgLy9SQyAyNDEwMDQ4MCA6IFByb2LDrWjDoSBuYcSNdGVuw60gcG9oeWLFr1xyXG4gICAgICAgICAgICAvL3JldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgLy8udGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyBrb250cm9sYSBwb2h5YsWvIGsgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyBwxZnDrXByYXZhIMO6xI10b3bDoW7DrSBuZWJvIGplbiBha3R1YWxpemFjZSBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAoamVuU2V6bmFtID09PSB0cnVlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvLyAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBvYnNsdWhhIGbDoXplXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoYXQudWN0b3ZhbmlXaXphcmQoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3RoYXQuY2FsbDx2b2lkPihcIlByaXByYXZhRmF6ZTFcIilcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgICAgIC8vIFRPRE86IHpwcmFjb3bDoXZhdCB2w71zbGVkZWs/XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gVE9ETzogenByYWNvdsOhdmF0IGNoeWJ5P1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIGRhbMWhw60gcMWZw61wcmF2YSB1xb4gYnVkZSBqZWRub2R1xaHFocOtXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90aGF0LnByaXByYXZhUHJ2bmkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBzZXpuYW0gcG9oeWLFr1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9ICQuZXh0ZW5kKHRydWUsIHsgZHVjdF9hbm86IDAsIGR1Y3RfaWtjOiB0aGF0LklrYywgZHVjdF91bmNoZWNrOiAwLCBzX3VwbzogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVcG8uVlVjdG92YW5pIH0sIHRoaXMuRmlsdHJ5UG9oeWJ1MSk7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RGaWx0clBvaHlidSEuY2hlY2tlZCh0aGF0LkZpbHRyeVBvaHlidTEuemFwX3NlX3phcGlzeSA9PT0gdHJ1ZSB8fCB0aGF0LkZpbHRyeVBvaHlidTEuemFwX2Jlel96YXBpc3UgPT09IHRydWUgfHwgdGhhdC5GaWx0cnlQb2h5YnUxLnphcF9uZXZ5cm92bmFuZV96YV9ua3MgPT09IHRydWUgfHwgdGhhdC5GaWx0cnlQb2h5YnUxLnphcF9uZXZ5cm92bmFuZV9iZXpfbmtzID09PSB0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLmxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogRnVjV2l6YXJkLmdldEZyYWdtZW50c0Zyb21HcmlkQ29sdW1uczxGdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4odGhhdC4kZ3JpZDFQb2h5YnkuZ2dyaWQ8RnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KFwidHJ1ZUNvbHVtbnNcIiksIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBidWRvdSB0YWR5IHphdHLFvsOtdGthP1xyXG4gICAgICAgICAgICAgICAgICAgIC8qZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkYXRhMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhMS5fY2hlY2tlZCA9ICEoZGF0YTEuZHVjdF90eHRfZXJyID4gXCIgXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBzcHLDoXZuw70ga2zDrcSNIHBvZGxlIHR5cHUsIGFsZSBqZXN0bGkgamUgdiBwxZnDrXBhZMSbIGRva2xhZHUgdsWvYmVjIG7Em2pha8O9IHVuaWvDoXRuw60gcHJpbcOhcm7DrSBrbMOtxI1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEvKiwgeyBrZXk6IFwiaXhwX3VwcixyYWRla191cG9cIiB9Ki8pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQxUG9oeWJ5LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHDFmcOtc3R1cG5vc3RpIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBwb2RvYm7EmyB1ZMSbbGF0IGRhbMWhw60gYWtjZSBuYSBzZXpuYW1lY2ggKG5hcMWZLiB6b2JyYXplbsOtIGRldGFpbHUgYSBwb2QuKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5hY3Rpb25zLnByZXZvZEFjdC5lbmFibGVkKGRhdGEubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdWtvbsSNZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGplIHRhZHkgcG90xZllYmEgbsSbY28gZMSbbGF0PyBhc2kgemHFoWtydG51dMOtIHrDoXpuYW3Frywga3RlcsOhIGpzb3UgYmV6IGNoeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBwxZnDrXN0dXBub3N0aSBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8uYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEbDoXplIDIgLSBuYcSNdGVuw60gc2V6bmFtdSBwxZlpcHJhdmVuw71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRG9rbGFkeTIoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczoyNDEwMDQ3OVwiKTsgLy9SQyAyNDEwMDQ3OSA6IFByb2LDrWjDoSBuYcSNdGVuw60gZG9rbGFkxa9cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlphcGlzLmxpc3REb2tsYWR1KHJxID0+IHsgcmV0dXJuIHsgZmlsdGVyczogeyB2X3VjdG92YW5pOiAwLCB0eXBfdWN0b3Zhbmk6IHRoYXQuVHlwVWN0b3ZhbmksIGlrYzogdGhhdC5Ja2MgfSB9OyB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb2hsZWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb3Bsbml0IHNwcsOhdm7DvSBrbMOtxI0gcG9kbGUgdHlwdSwgYWxlIGplc3RsaSBqZSB2IHDFmcOtcGFkxJsgZG9rbGFkdSB2xa9iZWMgbsSbamFrw70gdW5pa8OhdG7DrSBwcmltw6FybsOtIGtsw63EjVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YS8qLCB7IGtleTogXCJpeHBfdXByLHJhZGVrX3Vwb1wiIH0qLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZDJEb2tsYWR5LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHDFmcOtc3R1cG5vc3RpIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBwb2RvYm7EmyB1ZMSbbGF0IGRhbMWhw60gYWtjZSBuYSBzZXpuYW1lY2ggKG5hcMWZLiB6b2JyYXplbsOtIGRldGFpbHUgYSBwb2QuKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5hY3Rpb25zLnByZXZvZEFjdC5lbmFibGVkKGRhdGEubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVrb27EjWVuw61cclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBqZSB0YWR5IHBvdMWZZWJhIG7Em2NvIGTEm2xhdD8gYXNpIHphxaFrcnRudXTDrSB6w6F6bmFtxa8sIGt0ZXLDoSBqc291IGJleiBjaHlieVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gcMWZw61zdHVwbm9zdGkgYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGw6F6ZSAzIC0gbmHEjXRlbsOtIHNlem5hbXUgdsO9c2xlZG7DvWNoIGRva2xhZMWvIG8gemHDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZERva2xhZHkzKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0NzlcIik7IC8vUkMgMjQxMDA0NzkgOiBQcm9iw61ow6EgbmHEjXRlbsOtIGRva2xhZMWvXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5aYXBpcy5saXN0RG9rbGFkdShycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IHsgdHlwX3VjdG92YW5pOiB0aGF0LlR5cFVjdG92YW5pLCBpa2M6IHRoYXQuSWtjIH0gfTsgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBzcHLDoXZuw70ga2zDrcSNIHBvZGxlIHR5cHUsIGFsZSBqZXN0bGkgamUgdiBwxZnDrXBhZMSbIGRva2xhZHUgdsWvYmVjIG7Em2pha8O9IHVuaWvDoXRuw60gcHJpbcOhcm7DrSBrbMOtxI1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEvKiwgeyBrZXk6IFwiaXhwX3VwcixyYWRla191cG9cIiB9Ki8pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQzRG9rbGFkeS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBwxZnDrXN0dXBub3N0aSBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcG9kb2JuxJsgdWTEm2xhdCBkYWzFocOtIGFrY2UgbmEgc2V6bmFtZWNoIChuYXDFmS4gem9icmF6ZW7DrSBkZXRhaWx1IGEgcG9kLilcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuYWN0aW9ucy5wcmV2b2RBY3QuZW5hYmxlZChkYXRhLmxlbmd0aCA+IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogamUgdGFkeSBwb3TFmWViYSBuxJtjbyBkxJtsYXQ/IGFzaSB6YcWha3J0bnV0w60gesOhem5hbcWvLCBrdGVyw6EganNvdSBiZXogY2h5YnlcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHDFmcOtc3R1cG5vc3RpIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAvLy5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFwbG7Em27DrSBzZXpuYW11IHrDoXBpc8WvIGsgcG9oeWJ1IG5lYm8gZG9rbGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkWmFwaXN5KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdCBkbyBncmlkdSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBuZWpzb3UgxaFwYXRuxJsgRFRPIHZlIHZvbMOhbsOtIG1ldG9kP1xyXG4gICAgICAgICAgICBpZiAodGhpcy5GYXplID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWt0SGxhdmlja2FQID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih0aGlzLiRncmlkMVBvaHlieSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWt0SGxhdmlja2FQICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlphcGlzLmxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpfcG9oeWJ1OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZfdWN0b3Zhbmk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3VjdG92YW5pOiB0aGF0LlR5cFVjdG92YW5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19peHBfdXByOiBha3RIbGF2aWNrYVAhLml4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX3JhZGVrX3VwbzogYWt0SGxhdmlja2FQIS5yYWRla191cG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0Z1Y0dyaWQuWmFwaXMubW9kaWZ5RHRvKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBzcHLDoXZuw70ga2zDrcSNIHBvZGxlIHR5cHUsIGFsZSBqZXN0bGkgamUgdiBwxZnDrXBhZMSbIGRva2xhZHUgdsWvYmVjIG7Em2pha8O9IHVuaWvDoXRuw60gcHJpbcOhcm7DrSBrbMOtxI1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwX3VwcixyYWRla191cG8scmFkZWtfemFwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQxWmFwaXN5UG9oeWJ1Py5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHDFmcOtc3R1cG5vc3RpIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHBvZG9ibsSbIHVkxJtsYXQgZGFsxaHDrSBha2NlIG5hIHNlem5hbWVjaCAobmFwxZkuIHpvYnJhemVuw60gZGV0YWlsdSBhIHBvZC4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuYWN0aW9ucy5wcmV2b2RBY3QuZW5hYmxlZChkYXRhLmxlbmd0aCA+IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwcsOhemRuw70gZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW10sIHsga2V5OiBcIml4cF91cHIscmFkZWtfdXBvLHJhZGVrX3phcFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQxWmFwaXN5UG9oeWJ1Py5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuRmF6ZSA9PT0gMiB8fCB0aGlzLkZhemUgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBha3RIbGF2aWNrYUQgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRnVjLkludGVyZmFjZS5HRG9rbGFkRHRvPih0aGlzLkZhemUgPT0gMiA/IHRoaXMuJGdyaWQyRG9rbGFkeSA6IHRoaXMuJGdyaWQzRG9rbGFkeSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWt0SGxhdmlja2FEICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSB7IHR5cF91Y3RvdmFuaTogdGhhdC5UeXBVY3RvdmFuaSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkZhemUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVycyA9ICQuZXh0ZW5kKGZpbHRlcnMsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZfdWN0b3Zhbmk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpa2M6IHRoYXQuSWtjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzIFwiPT09XCIgdG8gbmVmdW5ndWplLCBwcm90b8W+ZSB2IHRoYXQuVHlwVWN0b3ZhbmkgamUgxI3DrXNsbyBqYWtvIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5UeXBVY3RvdmFuaSA9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0LkplZG5vdGxpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnMgPSAkLmV4dGVuZChmaWx0ZXJzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2l4cF91cHI6IGFrdEhsYXZpY2thRC5peHBfdXByLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19yYWRla191cG86IGFrdEhsYXZpY2thRC5yYWRla191cG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVycyA9ICQuZXh0ZW5kKGZpbHRlcnMsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfcm9rOiBha3RIbGF2aWNrYUQucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19tZXNpYzogYWt0SGxhdmlja2FELm1lc2ljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19kZW46IGFrdEhsYXZpY2thRC5kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX3N1YnJhZGFfZHV6OiBha3RIbGF2aWNrYUQuc3VicmFkYV9kdXosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2xpYzogYWt0SGxhdmlja2FELmxpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfaWNvOiBha3RIbGF2aWNrYUQuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva191Y3M6IGFrdEhsYXZpY2thRC51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX3Jva19kcGg6IGFrdEhsYXZpY2thRC5yb2tfZHBoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19tZXNpY19kcGg6IGFrdEhsYXZpY2thRC5tZXNpY19kcGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX3V1czogYWt0SGxhdmlja2FELnV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfZHJkOiBha3RIbGF2aWNrYUQuZHJkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19peHBfdXByOiBha3RIbGF2aWNrYUQuaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfaXhzX2VzdTogYWt0SGxhdmlja2FELml4c19lc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX3JhZGVrX3BkZTogYWt0SGxhdmlja2FELnJhZGVrX3BkZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfaXhwX3NvdXA6IGFrdEhsYXZpY2thRC5peHBfc291cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnMgPSAkLmV4dGVuZChmaWx0ZXJzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfcm9rOiBha3RIbGF2aWNrYUQucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2xpYzogYWt0SGxhdmlja2FELmxpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19pY286IGFrdEhsYXZpY2thRC5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfdWNzOiBha3RIbGF2aWNrYUQudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX21lc2ljOiBha3RIbGF2aWNrYUQubWVzaWMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfYWM6IGFrdEhsYXZpY2thRC5hY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlphcGlzLmxpc3QocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiBmaWx0ZXJzIH07IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRnVjR3JpZC5aYXBpcy5tb2RpZnlEdG8oZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb3Bsbml0IHNwcsOhdm7DvSBrbMOtxI0gcG9kbGUgdHlwdSwgYWxlIGplc3RsaSBqZSB2IHDFmcOtcGFkxJsgZG9rbGFkdSB2xa9iZWMgbsSbamFrw70gdW5pa8OhdG7DrSBwcmltw6FybsOtIGtsw63EjVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLyosIHsga2V5OiBcIml4cF91cHIscmFkZWtfdXBvXCIgfSovKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuRmF6ZSA9PT0gMikgdGhhdC4kZ3JpZDJaYXBpc3lEb2tsYWR1LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgdGhhdC4kZ3JpZDNaYXBpc3lEb2tsYWR1LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gcMWZw61zdHVwbm9zdGkgYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcG9kb2JuxJsgdWTEm2xhdCBkYWzFocOtIGFrY2UgbmEgc2V6bmFtZWNoIChuYXDFmS4gem9icmF6ZW7DrSBkZXRhaWx1IGEgcG9kLilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5hY3Rpb25zLnByZXZvZEFjdC5lbmFibGVkKGRhdGEubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByw6F6ZG7DvSBncmlkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBzcHLDoXZuw70ga2zDrcSNIHBvZGxlIHR5cHUsIGFsZSBqZXN0bGkgamUgdiBwxZnDrXBhZMSbIGRva2xhZHUgdsWvYmVjIG7Em2pha8O9IHVuaWvDoXRuw60gcHJpbcOhcm7DrSBrbMOtxI1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtdLyosIHsga2V5OiBcIml4cF91cHIscmFkZWtfdXBvXCIgfSovKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5GYXplID09PSAyKSB0aGF0LiRncmlkMlphcGlzeURva2xhZHUuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgdGhhdC4kZ3JpZDNaYXBpc3lEb2tsYWR1LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIGRldGFpbHUgcG9oeWJ1ICh2ZSBmw6F6aSAxIHByxa92b2RjZSlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wcmF2YSBzcHXFoXTEm27DrSBkZXRhaWx1IGRvIHJlxb5pbXUgb3ByYXZ5ICh0cnVlID0gYW5vLCBmYWxzZSA9IG5lKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWxQb2h5YnUob3ByYXZhOiBib29sZWFuKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBqZSBwb3TFmWViYSDFmWXFoWl0IG9tZXplbm91IGZ1bmvEjW5vc3QgdiBkZXRhaWx1LCBhYnkgbmVieWxvIG1vxb5uw6kgemHDusSNdG92YXQgcG9oeWIsIGtkecW+IGpzZW0gdiDDusSNdG92w6Fuw60/XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1w6FsbsOtIHZ5YnJhbsOhIHBvbG/FvmthXHJcbiAgICAgICAgICAgIGxldCBha3RSYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4odGhpcy5GYXplID09PSAwID8gdGhpcy4kZ3JpZDBQb2h5YnkgOiB0aGlzLiRncmlkMVBvaHlieSk7XHJcbiAgICAgICAgICAgIGlmIChha3RSYWRlayAhPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvZMSbbGF0IMO6cHJhdnkga29sZW0gYWt0aXZuw60gb3BlcmFjZSBuYSBkZXRhaWx1ICh2aXogb3N0YXRuw60gc2V6bmFteSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB6w6Fzb2Juw61rIHptxJtuxJtuw71jaCB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgIGxldCBjaGFuZ2VkUm93czogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliUGtEdG9bXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgbGV0ICRkZXRhaWxXaW5kb3cgPSB0aGlzLm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxQb2h5YnVcIiwgeyBncmlkUmVtb3RlQ29udHJvbDogbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh0aGlzLkZhemUgPT09IDAgPyB0aGlzLiRncmlkMFBvaHlieSA6IHRoaXMuJGdyaWQxUG9oeWJ5KSB9XSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiAnRGV0YWlsUG9oeWJ1IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cFVwcjogYWt0UmFkZWsuaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFkZWtVcG86IGFrdFJhZGVrLnJhZGVrX3VwbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3RldnJpdEpha29PcHJhdnU6IG9wcmF2YVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb2JzbHVoYSBha3Rpdm7DrSBvcGVyYWNlIG5hIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICQuY29udGVudCgkZGV0YWlsV2luZG93KS5vbihGdWNEZXRhaWwudHJpZ2dlckNoYW5nZSwgKHJldFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbD8uZGF0YT8uaXhwX3VwciAmJiByZXRWYWw/LmRhdGE/LnJhZGVrX3Vwbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIGRvIHNlem5hbXUgesOhem5hbcWvIGsgb2LEjWVyc3R2ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZFJvd3MuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5peHBfdXByID09PSByZXRWYWwuZGF0YS5peHBfdXByICYmIGl0ZW0ucmFkZWtfdXBvID09PSByZXRWYWwuZGF0YS5yYWRla191cG8pIDwgMCkgY2hhbmdlZFJvd3MucHVzaCh7IGl4cF91cHI6IHJldFZhbC5kYXRhLml4cF91cHIsIHJhZGVrX3VwbzogcmV0VmFsLmRhdGEucmFkZWtfdXBvIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgdWtvbsSNZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZXNwb3XFoXTEm3QgYWtjaSBqZW4gcMWZaSBha3Rpdm7DrSBvcGVyYWNpPyB1ZMSbbGF0IHRvIHBvZGxlIG90ZXbFmWVuw60gZGV0YWlsdSB6ZSBzZXpuYW11IHBvaHlixa8uIHRha8OpIMWZZcWhaXQgYWt0dWFsaXphY2Ugc2V6bmFtdSBwb2QgdMOtbSAoYWt0dWFsaXpvdmF0IMWZw6Fka3kgcMWZaSBha3Rpdm7DrSBvcGVyYWNpLCAuLi4pLCBqZW5vbSB0YWR5IGplIHRvIG8gdiBqaW7DqSB0xZnDrWTEm1xyXG4gICAgICAgICAgICAgICAgJGRldGFpbFdpbmRvdy5vbihcImNsb3NlZFwiLCAocmV0VmFsOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD4gPSAodGhhdC5GYXplID09PSAwID8gdGhhdC4kZ3JpZDBQb2h5YnkgOiB0aGF0LiRncmlkMVBvaHlieSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZm9rdXN1XHJcbiAgICAgICAgICAgICAgICAgICAgJGdyaWQuZ2dyaWQoXCJmb2N1c1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2Ugem3Em27Em27DvWNoIHrDoXpuYW3FryAodiBobGF2bsOtbSBzZXpuYW11IGkgcMWZw61wYWRuxJsgdiBwcsWvdm9kY2kpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZWRSb3dzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhckl4cFVwciA9IGNoYW5nZWRSb3dzLm1hcDxzdHJpbmc+KGl0ZW0gPT4gaXRlbS5peHBfdXByISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhclJhZGVrVXBvID0gY2hhbmdlZFJvd3MubWFwPG51bWJlcj4oaXRlbSA9PiBpdGVtLnJhZGVrX3VwbyEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWIubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHsgaXhwX3VwcjogYXJJeHBVcHIsIHJhZGVrX3VwbzogYXJSYWRla1VwbyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogRnVjV2l6YXJkLmdldEZyYWdtZW50c0Zyb21HcmlkQ29sdW1uczxGdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4oJGdyaWQuZ2dyaWQ8RnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KFwidHJ1ZUNvbHVtbnNcIiksIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHVwZGF0ZURhdGEgbmV2cmFjw60gcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS51cGRhdGVEYXRhKHJlc3BvbnNlLmRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lbcSbbHkgYnkgdnJhY2V0IHByb21pc2U/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuRmF6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmtvbnRyb2xhUHJlZFVjdG92YW5pbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzoga29udHJvbGEgZGF0P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVjdG92YW5pV2l6YXJkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkUG9oeWJ5MSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWRaYXBpc3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkZGV0YWlsV2luZG93LmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG/FmcOtemVuw60gbm92w6lobyB6w6FwaXN1IHBvaHlidVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBub3Z5WmFwaXMoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBlZGl0YWNlIGFrdHXDoWxuw61obyB6w6FwaXN1XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkZhemUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBha3RIbGF2aWNrYSA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4odGhpcy4kZ3JpZDFQb2h5YnkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFrdEhsYXZpY2thICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gemppxaF0xJtuw60gbm92w6lobyDEjcOtc2xhIMWZw6Fka3UgesOhcGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub3Z5UmFkZWtaYXAgPSB0aGlzLm1heFJhZGVrWmFwKCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHRuw60gaG9kbm90eSAoeiBwxZnDrXBhZHUvcG9oeWJ1KSBhIG5vdsO9IHJhZGVrX3phcFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdG86IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBpc0R0byAmIHsgbm92eV96YXBpcz86IGJvb2xlYW4gfSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm92eV96YXBpczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwX3VwcjogYWt0SGxhdmlja2EuaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtfdXBvOiBha3RIbGF2aWNrYS5yYWRla191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrX3phcDogbm92eVJhZGVrWmFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IGFrdEhsYXZpY2thLmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiBha3RIbGF2aWNrYS51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV1czogYWt0SGxhdmlja2EudXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBua3M6IGFrdEhsYXZpY2thLm5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiBha3RIbGF2aWNrYS5yb2tcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3B1xaF0xJtuw60gZWRpdGFjZSBub3bDqWhvIMWZw6Fka3VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkMVphcGlzeVBvaHlidT8uZ2dyaWRyb3dlZGl0b3IoXCJhZGRSb3dcIiwgZHRvKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFZGl0YWNlIGFrdHXDoWxuw61obyB6w6FwaXN1IHBvaHlidVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlZGl0YWNlWmFwaXN1KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gZWRpdGFjZSBha3R1w6FsbsOtaG8gesOhcGlzdVxyXG4gICAgICAgICAgICBpZiAodGhpcy5GYXplID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzcHXFoXTEm27DrSBlZGl0YWNlIG96bmHEjWVuw6lobyDFmcOhZGt1XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRncmlkMVphcGlzeVBvaHlidT8uZ2dyaWRyb3dlZGl0b3IoXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVsb8W+ZW7DrSByb3plZGl0b3ZhbsOpaG8gesOhcGlzdSBwb2h5YnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdWxvemVuaVphcGlzdShpbnNlcnQ6IGJvb2xlYW4sIGR0bzogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcGlzRHRvKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIHVsb8W+ZW7DrSByb3plZGl0b3ZhbsOpaG8gesOhcGlzdVxyXG4gICAgICAgICAgICBpZiAodGhpcy5GYXplID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGF0LmNhbGw8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcGlzRHRvPihcIlVsb3paYXBpc1wiLCB7IGluc2VydDogaW5zZXJ0LCBkdG86IGR0byB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5aYXBpcy51cHNlcnQoeyBpbnNlcnQ6IGluc2VydCwgZGF0YTogZHRvIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB1cHJhdml0IG1ldG9kdSwgYWJ5IHZyYWNlbGEgYWt0dcOhbG7DrSBob2Rub3R5IChuYXDFmS4gcyB2eXBsbsSbbsO9bSByYWRla196YXApP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcG9rdWQgc2UgbmVlZGl0dWplLCBqZSBtb8W+bsOpIGRldGFpbCB6YXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKGR0bykucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPZHN0cmFuxJtuw60gZXhpc3R1asOtY8OtaG8gesOhcGlzdSBwb2h5YnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgb2RzdHJhbmVuaVphcGlzdSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIG9kc3RyYW7Em27DrSBha3R1w6FsbsOtaG8gesOhcGlzdVxyXG4gICAgICAgICAgICBpZiAodGhpcy5GYXplID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBqZW4gdiByZcW+aW11IHpvYnJhemVuw60gcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgbGV0IGFrdFBvaHliID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih0aGlzLiRncmlkMVBvaHlieSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWt0WmFwaXMgPSB0aGlzLiRncmlkMVphcGlzeVBvaHlidSA/IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBpc0R0bz4odGhpcy4kZ3JpZDFaYXBpc3lQb2h5YnUpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChha3RQb2h5YiAhPSBudWxsICYmIGFrdFphcGlzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdCAtIGJ1ZGUgdG8gdm9sw6Fuw60gc2VydmVyb3bDqSBtZXRvZHlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaamnFoXTEm27DrSBtYXhpbcOhbG7DrWhvIMSNw61zbGEgxZnDoWRrdSB6w6FwaXN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn0gbWF4aW3DoWxuw60gxI3DrXNsbyDFmcOhZGt1IHrDoXBpc3UgKDAgcG9rdWQgxb7DoWRuw70gbmVleGlzdHVqZSlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG1heFJhZGVrWmFwKCk6IG51bWJlciB7XHJcblxyXG4gICAgICAgICAgICAvLyBjeWtsIHDFmWVzIHbFoWVjaG55IGV4aXN0dWrDrWPDrSB6w6FwaXN5XHJcbiAgICAgICAgICAgIGxldCBtYXhSYWRlayA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRncmlkMVphcGlzeVBvaHlidSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLiRncmlkMVphcGlzeVBvaHlidS5nZ3JpZDxHb3JkaWMuRnVjLkludGVyZmFjZS5HWmFwaXNEdG8+KFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cyh0cnVlLCBcInZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4UmFkZWsgPSBNYXRoLm1heChtYXhSYWRlaywgZGF0YVtpXS5kYXRhLnJhZGVrX3phcCEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWF4UmFkZWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG/FvmVuw60gLyB6b2JyYXplbsOtIGRva2xhZHUgbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRva2xhZE9aYXVjdG92YW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGFrdERva2xhZCA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHRoaXMuJGdyaWQzRG9rbGFkeSk7XHJcbiAgICAgICAgICAgIGlmIChha3REb2tsYWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVsb8W+ZW7DrS9vdGV2xZllbsOtIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwuZG9rbGFkT1phdWN0b3ZhbmkodGhpcywgbnVsbC8qYWt0RG9rbGFkPy5peGJfZHp1Ki8sIGFrdERva2xhZD8ucm9rLCBha3REb2tsYWQ/LmxpYywgYWt0RG9rbGFkPy5pY28sIGFrdERva2xhZD8udWNzLCBha3REb2tsYWQ/Lm1lc2ljLCBha3REb2tsYWQ/LmFjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxvxb5lbsOtIGluZm9ybWFjw60gbyBha3R1w6FsbsOtbSAoZG8ga3RlcsOpaG8gc2UgdnN0dXB1amUpIGtyb2t1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtPR1dpemFyZENoYW5nZX0gY2hhbmdlIGluZm9ybWFjZSBvIGtyb2t1IHByxa92b2RjZVxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29ubHlTZXRTdGVwc0VuYWJsZV0gcG91emUgbmFzdGF2aXQga3Jva3kgKG5lbmFzdGF2b3ZhdCBwcm9txJtubsOpIHBybyBmw6F6aSlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNhdmVTdGVwSW5mbyh3aXphcmQ6IFdpemFyZCB8IG51bGwsIGNoYW5nZTogT0dXaXphcmRDaGFuZ2UsIG9ubHlTZXRTdGVwc0VuYWJsZT86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG90ZXN0b3ZhdCBqYWsgc2UgY2hvdsOhIHDFmWkgY2h5YsSbIHogbW90b3LFryBhIHDFmWkgcMWZZcSNZXJww6Fuw61cclxuXHJcbiAgICAgICAgICAgIC8vIGtyb2ssIGRvIGt0ZXLDqWhvIHZzdHVwdWplbWUsIGplIGJ1xI8gdiBjaGFuZ2UudGFzay5uZXh0U3RlcCBuZWJvIHYgY2hhbmdlLmFjdGl2ZVN0ZXBcclxuICAgICAgICAgICAgbGV0IGFjdFN0ZXAgPSAodHlwZW9mIGNoYW5nZS50YXNrLm5leHRTdGVwID09PSBcInVuZGVmaW5lZFwiID8gY2hhbmdlLmFjdGl2ZVN0ZXAgOiBjaGFuZ2UudGFzay5uZXh0U3RlcCk7XHJcbiAgICAgICAgICAgIGlmICgoYWN0U3RlcCA+PSAwKSAmJiAoYWN0U3RlcCA8PSAzKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gaW5mb3JtYWNlIG8gcMWZZWRjaG96w61tIGEgYWt0dcOhbG7DrW0ga3Jva3VcclxuICAgICAgICAgICAgICAgIGlmIChvbmx5U2V0U3RlcHNFbmFibGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUHJlZGNob3ppRmF6ZSA9IHRoaXMuRmF6ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkZhemUgPSBhY3RTdGVwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHdpemFyZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZnDrXN0dXBuw70gamUgc3RhbmRhcmRuxJsgYWt0dcOhbG7DrSwgcMWZZWRjaG96w60gYSBuw6FzbGVkdWrDrWPDrSBrcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSBhY3RTdGVwKSBjaGFuZ2Uuc3RlcHNFbmFibGVbaV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoaSA9PT0gYWN0U3RlcCAtIDEpICYmIChhY3RTdGVwIDwgMykpIGNoYW5nZS5zdGVwc0VuYWJsZVtpXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGkgPT09IGFjdFN0ZXAgKyAxKSBjaGFuZ2Uuc3RlcHNFbmFibGVbaV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZnDrXN0dXBuw70gamUgaSByeWNobMO9IHDFmWVjaG9kIDAgLT4gMiBhIDAgLT4gMyBhIDEgLT4gM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhY3RTdGVwID09PSAwICYmIChpID09PSAyIHx8IGkgPT09IDMpKSBjaGFuZ2Uuc3RlcHNFbmFibGVbaV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhY3RTdGVwID09PSAxICYmIGkgPT09IDMpIGNoYW5nZS5zdGVwc0VuYWJsZVtpXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmcOtc3R1cG7DvSBqZSBpIHJ5Y2hsw70gcMWZZWNob2QgMiAtPiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFjdFN0ZXAgPT09IDIgJiYgaSA9PT0gMCkgY2hhbmdlLnN0ZXBzRW5hYmxlW2ldID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBjaGFuZ2Uuc3RlcHNFbmFibGVbaV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAod2l6YXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpelN0ZXBzOiBJV2l6YXJkRW5hYmxlU3RlcFtdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlLnN0ZXBzRW5hYmxlLmZvckVhY2goKHZhbCwgaW5kZXgpID0+IHsgd2l6U3RlcHMucHVzaCh7IGVuYWJsZWQ6IHZhbCwgaW5kZXg6IGluZGV4IH0pOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB3aXphcmQuZW5hYmxlU3RlcCh0aGlzLCB3aXpTdGVwcywgYWN0U3RlcCA9PT0gMyA/IHsgYmFjazogeyBlbmFibGVkOiBmYWxzZSB9IH0gOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSBmb3JtdWzDocWZZSBzIHBhcmFtZXRyeSDDusSNdG92w6Fuw60gdsSNZXRuxJsgbmFwbG7Em27DrSBob2Rub3RcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59IGNvbnRlbnREaXYgY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVwIGFrdHXDoWxuw60ga3Jva1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRm9ybVBhcmFtZXRyeShjb250ZW50RGl2OiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBzdGVwOiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgIGxldCAkdGFiUGFyYW1ldHJ5ID0gJC5uZXdEaXYoKS5hcHBlbmRUbyhjb250ZW50RGl2KS5ndGFiKHsgdGl0bGU6IFwiUGFyYW1ldHJ5IMO6xI10b3bDoW7DrVwiLCBvcGVuZWQ6IHRydWUvKiwgbG9ja2VkOiB0cnVlKi8gfSk7XHJcbiAgICAgICAgICAgIGxldCBmb3JtUGFyYW1ldHJ5ID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIi8qLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0zLTctMiwgTS0zLTctMiwgUy0xMi0xMi0wXCIqLyB9KS5hZGRTZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vIHNwb2xlxI1uw6kgcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgIGxldCB0eXBVY3RSYWRpb3M6IElSYWRpbzxHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0PltdID0gW107XHJcblxyXG4gICAgICAgICAgICAvL2lmICh0aGF0LlR5cFVjdG92YW5pID09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSmVkbm90bGl2ZSB8fCAoc3RlcCA9PT0gMCAmJiAhdGhhdC5QZXZUeXBVY3RBbm8pKSB7XHJcbiAgICAgICAgICAgIC8vICAgIHR5cFVjdFJhZGlvcy5wdXNoKHsgdmFsdWU6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSmVkbm90bGl2ZSwgbGFiZWw6IFwianJlczoyNDEwMDE1NVwiLCBkaXNhYmxlZDogZmFsc2UvKiF0aGF0LlBvdm9sZW5vVWN0b3ZhbmlKZWRub3RsaXZlKi8gfSk7IC8vUkMgMjQxMDAxNTUgOiBqZWRub3RsaXbEmyAoYmV6IGt1bXVsYWNlIG5hIMO6cm92bmkgZG9rbGFkxa8gYSB6w6FwaXPFrylcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vZWxzZSBpZiAoc3RlcCA9PT0gMCAmJiAhdGhhdC5QZXZUeXBVY3RBbm8pIHtcclxuICAgICAgICAgICAgLy8gICAgdHlwVWN0UmFkaW9zLnB1c2goeyB2YWx1ZTogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC5KZWRub3RsaXZlLCBsYWJlbDogXCJqcmVzOjI0MTAwMTU1XCIsIGRpc2FibGVkOiBmYWxzZS8qIXRoYXQuUG92b2xlbm9VY3RvdmFuaUplZG5vdGxpdmUqLyB9KTsgLy9SQyAyNDEwMDE1NSA6IGplZG5vdGxpdsSbIChiZXoga3VtdWxhY2UgbmEgw7pyb3ZuaSBkb2tsYWTFryBhIHrDoXBpc8WvKVxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgaWYgKChzdGVwID09PSAwICYmICF0aGF0LlBldlR5cFVjdEFubykgfHwgdGhhdC5UeXBVY3RvdmFuaSA9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0LkplZG5vdGxpdmUpIHR5cFVjdFJhZGlvcy5wdXNoKHsgdmFsdWU6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSmVkbm90bGl2ZSwgbGFiZWw6IFwianJlczoyNDEwMDE1NVwiLCBkaXNhYmxlZDogZmFsc2UvKiF0aGF0LlBvdm9sZW5vVWN0b3ZhbmlKZWRub3RsaXZlKi8gfSk7IC8vUkMgMjQxMDAxNTUgOiBqZWRub3RsaXbEmyAoYmV6IGt1bXVsYWNlIG5hIMO6cm92bmkgZG9rbGFkxa8gYSB6w6FwaXPFrylcclxuICAgICAgICAgICAgaWYgKChzdGVwID09PSAwICYmICF0aGF0LlBldlR5cFVjdEFubykgfHwgdGhhdC5UeXBVY3RvdmFuaSA9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0Lkhyb21hZG5lKSB0eXBVY3RSYWRpb3MucHVzaCh7IHZhbHVlOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0Lkhyb21hZG5lLCBsYWJlbDogXCJqcmVzOjI0MTAwMTU2XCIsIGRpc2FibGVkOiBmYWxzZS8qIXRoYXQuUG92b2xlbm9VY3RvdmFuaUhyb21hZG5lKi8gfSk7IC8vUkMgMjQxMDAxNTYgOiBocm9tYWRuxJsgKHMga3VtdWxhY8OtIG5hIMO6cm92bmkgZG9rbGFkxa8sIGFsZSBiZXoga3VtdWxhY2UgbmEgw7pyb3ZuaSB6w6FwaXPFrylcclxuICAgICAgICAgICAgaWYgKChzdGVwID09PSAwICYmICF0aGF0LlBldlR5cFVjdEFubykgfHwgdGhhdC5UeXBVY3RvdmFuaSA9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0Lkt1bXVsb3ZhbmUpIHR5cFVjdFJhZGlvcy5wdXNoKHsgdmFsdWU6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuS3VtdWxvdmFuZSwgbGFiZWw6IFwianJlczoyNDEwMDE1N1wiLCBkaXNhYmxlZDogZmFsc2UvKiF0aGF0LlBvdm9sZW5vVWN0b3ZhbmlLdW11bG92YW5lKi8gfSk7IC8vUkMgMjQxMDAxNTcgOiBrdW11bG92YW7EmyAocyBrdW11bGFjw60gbmEgw7pyb3ZuaSBkb2tsYWTFryBpIHrDoXBpc8WvKVxyXG4gICAgICAgICAgICAvL2lmIChzdGVwID09PSAwIHx8IHRoYXQuVHlwVWN0b3ZhbmkgPT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC5KZWRub3RsaXZlKSB0eXBVY3RSYWRpb3MucHVzaCh7IHZhbHVlOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0LkplZG5vdGxpdmUsIGxhYmVsOiBcImpyZXM6MjQxMDAxNTVcIiwgZGlzYWJsZWQ6IGZhbHNlLyohdGhhdC5Qb3ZvbGVub1VjdG92YW5pSmVkbm90bGl2ZSovIH0pOyAvL1JDIDI0MTAwMTU1IDogamVkbm90bGl2xJsgKGJleiBrdW11bGFjZSBuYSDDunJvdm5pIGRva2xhZMWvIGEgesOhcGlzxa8pXHJcbiAgICAgICAgICAgIC8vaWYgKHN0ZXAgPT09IDAgfHwgdGhhdC5UeXBVY3RvdmFuaSA9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0Lkhyb21hZG5lKSB0eXBVY3RSYWRpb3MucHVzaCh7IHZhbHVlOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0Lkhyb21hZG5lLCBsYWJlbDogXCJqcmVzOjI0MTAwMTU2XCIsIGRpc2FibGVkOiBmYWxzZS8qIXRoYXQuUG92b2xlbm9VY3RvdmFuaUhyb21hZG5lKi8gfSk7IC8vUkMgMjQxMDAxNTYgOiBocm9tYWRuxJsgKHMga3VtdWxhY8OtIG5hIMO6cm92bmkgZG9rbGFkxa8sIGFsZSBiZXoga3VtdWxhY2UgbmEgw7pyb3ZuaSB6w6FwaXPFrylcclxuICAgICAgICAgICAgLy9pZiAoc3RlcCA9PT0gMCB8fCB0aGF0LlR5cFVjdG92YW5pID09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuS3VtdWxvdmFuZSkgdHlwVWN0UmFkaW9zLnB1c2goeyB2YWx1ZTogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC5LdW11bG92YW5lLCBsYWJlbDogXCJqcmVzOjI0MTAwMTU3XCIsIGRpc2FibGVkOiBmYWxzZS8qIXRoYXQuUG92b2xlbm9VY3RvdmFuaUt1bXVsb3ZhbmUqLyB9KTsgLy9SQyAyNDEwMDE1NyA6IGt1bXVsb3ZhbsSbIChzIGt1bXVsYWPDrSBuYSDDunJvdm5pIGRva2xhZMWvIGkgesOhcGlzxa8pXHJcbiAgICAgICAgICAgIGZvcm1QYXJhbWV0cnkuYWRkUm93KFwiVHlwIMO6xI10b3bDoW7DrVwiKS5hZGRGaWVsZDxHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0PihcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF91Y3RvdmFuaVwiLFxyXG4gICAgICAgICAgICAgICAgcmFkaW9zOiB0eXBVY3RSYWRpb3MsXHJcbiAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy0xMlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogcHJvxI0gbmVmdW5ndWplIHZhbGlkw6F0b3IgbmEgcG92aW5ub3N0P1xyXG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIC8vc21hcnROYXZOZXh0RWxlbWVudDogdGhhdC5UZXN0RVVjZXRuaWN0dmkgPyB1bmRlZmluZWQgOiBmdW5jdGlvbiAoY3VyLCBuZXh0KSB7IHJldHVybiAkLmNvbnRlbnQodGhpcyk/LmVsZW1lbnQuZmluZChcImJ1dHRvbltkYXRhLXBhcmFtLWlkPSdhY3RLb250cm9sYSddXCIpWzBdOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBzcGVjacOhbG7DrSBwcm8gZS3DusSNZXRuaWN0dsOtXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlRlc3RFVWNldG5pY3R2aSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cENpbDogSVJhZGlvPGJvb2xlYW4+W10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGVwID09PSAwIHx8IHRoYXQuRVVjZXRuaWN0dmkgPT09IGZhbHNlKSB0eXBDaWwucHVzaCh7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IFwiw5rEjWV0bsOtIGRlbsOta1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAgPT09IDAgfHwgdGhhdC5FVWNldG5pY3R2aSA9PT0gdHJ1ZSkgdHlwQ2lsLnB1c2goeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IFwiQWdlbmRhIFVDVFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgZm9ybVBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJDw61sXCIpLmFkZEZpZWxkPGJvb2xlYW4+KFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlX3VjZXRuaWN0dmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvczogdHlwQ2lsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy0xMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWU6IGJvb2xlYW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IChjaGFuZ2VPYmoudmFsdWUgPT09IHRydWUgfHwgU3RyaW5nKGNoYW5nZU9iai52YWx1ZSkgPT09IFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnREaXYuZmluZEZpZWxkcyhcIml4c19mdW5fb296dV91Y3RcIiwgXCJpeHBfZGVuX3VjdFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcCA9PT0gMCB8fCB0aGF0LkVVY2V0bmljdHZpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiT09aVVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5fb296dV91Y3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19mdW5fb296dV91Y3Q9aXhzX2Z1blwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLbmloYSBVQ1RcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC51Y3RzZGVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZGVuX3VjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhwX2Rlbl91Y3Q9aXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyByb2s6IHRoYXQuUm9rIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NtYXJ0TmF2TmV4dEVsZW1lbnQ6ICF0aGF0LlRlc3RFVWNldG5pY3R2aSA/IHVuZGVmaW5lZCA6IGZ1bmN0aW9uIChjdXIsIG5leHQpIHsgcmV0dXJuICQuY29udGVudCh0aGlzKT8uZWxlbWVudC5maW5kKFwiYnV0dG9uW2RhdGEtcGFyYW0taWQ9J2FjdEtvbnRyb2xhJ11cIilbMF07IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9ybVBhcmFtZXRyeS5hZGRSb3coXCJQb3puw6Fta2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBmb2t1c3kgeiBwYXJhbWV0csWvIHByxa92b2Rjxa8gLSBqZXN0bGkgbmEgcHJ2bsOtIHRsYcSNw610a28gbmEgbGnFoXTEmyBuZWJvIG5hIHNwb2Ruw60gbmEgcMWZZWNob2QgbmEgZGFsxaHDrSBrcm9rIG5lYm8gamVzdGxpIHRvIMWZZcWhaXQgcG9kbGUgdG9obywgamUtbGkgbnV0bsOpIHBvdcWhdMSbdCBrb250cm9sdSBtYW51w6FsbsSbP1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogbmVmdW5ndWplIHRvPyBuZXVtw60gdG8gc2tvayBuYSBzcG9kbsOtIGxpxaF0dSwgYXNpIHXFviB0byBqZSBtaW1vIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgIC8vc21hcnROYXZOZXh0RWxlbWVudDogZnVuY3Rpb24gKGN1ciwgbmV4dCkgeyByZXR1cm4gJC5jb250ZW50KHRoaXMpPy4gcGFyZW50Q29udGVudD8gLmVsZW1lbnQuZmluZChcImJ1dHRvbltkYXRhLXBhcmFtLWlkPSdhY3RaYXVjdG92YXRPZGxvemVuZSddXCIpWzBdOyB9XHJcbiAgICAgICAgICAgICAgICBzbWFydE5hdk5leHRFbGVtZW50OiBmdW5jdGlvbiAoY3VyLCBuZXh0KSB7IHJldHVybiAkLmNvbnRlbnQodGhpcyk/LmVsZW1lbnQuZmluZChcImJ1dHRvbltkYXRhLXBhcmFtLWlkPSdhY3RLb250cm9sYSddXCIpWzBdOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmb3JtUGFyYW1ldHJ5LmFwcGVuZFRvKCR0YWJQYXJhbWV0cnkpO1xyXG4gICAgICAgICAgICAvLyBwYXJhbWV0cnkganNvdSBlZGl0b3ZhdGVsbsOpIHBvdXplIHYgcHJ2bsOtbSBrcm9rdVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBqYWtvIHBvem7DoW1rYSBieSBzZSBtxJtseSBjaG92YXQgaSDDumRhamUgdMO9a2Fqw61jw60gc2UgZS3DusSNZXRuaWN0dsOtLCBuZT9cclxuICAgICAgICAgICAgaWYgKHN0ZXAgPiAwKSAkdGFiUGFyYW1ldHJ5LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhhdC5QZXZUeXBVY3RBbm8pICR0YWJQYXJhbWV0cnkuZmluZEZpZWxkcygvKlwidHlwX3VjdG92YW5pXCIsIFwiZV91Y2V0bmljdHZpXCIsIFwiaXhzX2Z1bl9vb3p1X3VjdFwiLCBcIml4cF9kZW5fdWN0XCIqLykubm90KCR0YWJQYXJhbWV0cnkuZmluZEZpZWxkcyhcInBvem5hbWthXCIpKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gaG9kbm90XHJcbiAgICAgICAgICAgIGNvbnRlbnREaXYuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwge1xyXG4gICAgICAgICAgICAgICAgdHlwX3VjdG92YW5pOiB0aGF0LlR5cFVjdG92YW5pLFxyXG4gICAgICAgICAgICAgICAgZV91Y2V0bmljdHZpOiB0aGF0LkVVY2V0bmljdHZpLFxyXG4gICAgICAgICAgICAgICAgaXhzX2Z1bl9vb3p1X3VjdDogdGhhdC5peHNGdW5Pb3p1VWN0LFxyXG4gICAgICAgICAgICAgICAgaXhwX2Rlbl91Y3Q6IHRoYXQuaXhwRGVuVWN0LFxyXG4gICAgICAgICAgICAgICAgcG96bmFta2E6IHRoYXQucG96bmFta2FcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLb250cm9sYSB2c3R1cG7DrWNoIHBhcmFtZXRyxa8gKHDFmWkgb3B1xaF0xJtuw60gcHJ2bsOtaG8ga3Jva3UpIHbEjWV0bsSbIHVsb8W+ZW7DrSB2eWJyYW7DvWNoIHBvaHlixa9cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gY250IGNvbnRlbnRcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxib29sZWFuPn0gdsO9c2xlZGVrIGtvbnRyb2x5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjaGVja1BhcmFtZXRlcnNBbmRTYXZlQ2hlY2soY250KTogSlF1ZXJ5UHJvbWlzZTxib29sZWFuPiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5GYXplID4gMCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHRydWUpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNlYnLDoW7DrSB6YWRhbsO9Y2ggcGFyYW1ldHLFr1xyXG4gICAgICAgICAgICBsZXQgZHRvUGFyYW06IHtcclxuICAgICAgICAgICAgICAgIHR5cF91Y3RvdmFuaTogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdCB8IG51bGwsXHJcbiAgICAgICAgICAgICAgICBlX3VjZXRuaWN0dmk6IGJvb2xlYW4gfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgaXhzX2Z1bl9vb3p1X3VjdDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAgICAgICAgIGl4cF9kZW5fdWN0OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgcG96bmFta2E6IHN0cmluZyB8IG51bGxcclxuICAgICAgICAgICAgfSA9IHtcclxuICAgICAgICAgICAgICAgIHR5cF91Y3RvdmFuaTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGVfdWNldG5pY3R2aTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGl4c19mdW5fb296dV91Y3Q6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpeHBfZGVuX3VjdDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHBvem5hbWthOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0b1BhcmFtKTtcclxuICAgICAgICAgICAgaWYgKGR0b1BhcmFtLnR5cF91Y3RvdmFuaSAhPT0gbnVsbCkgdGhpcy5UeXBVY3RvdmFuaSA9IGR0b1BhcmFtLnR5cF91Y3RvdmFuaTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVGVzdEVVY2V0bmljdHZpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkVVY2V0bmljdHZpID0gZHRvUGFyYW0uZV91Y2V0bmljdHZpITtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXhzRnVuT296dVVjdCA9IGR0b1BhcmFtLml4c19mdW5fb296dV91Y3QhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5peHBEZW5VY3QgPSBkdG9QYXJhbS5peHBfZGVuX3VjdCE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGR0b1BhcmFtLnBvem5hbWthICE9IG51bGwpIHRoaXMucG96bmFta2EgPSBkdG9QYXJhbS5wb3puYW1rYTtcclxuXHJcbiAgICAgICAgICAgIC8vIGtvbnRyb2x5XHJcbiAgICAgICAgICAgIC8vIGtvbnRyb2xhIHBvdm9sZW7DqWhvIHR5cHUgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVjdG92YW5pICE9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0LkplZG5vdGxpdmUgJiYgdGhpcy5UeXBVY3RvdmFuaSAhPT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC5Icm9tYWRuZSAmJiB0aGlzLlR5cFVjdG92YW5pICE9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0Lkt1bXVsb3ZhbmUpIHtcclxuICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuw60gY2h5YnkgdmUgZmxhc2hpXHJcbiAgICAgICAgICAgICAgICBGdWNXaXphcmQuc2hvd0Vycm9yRmxhc2goXCJqcmVzOjI0MTAwNTE0XCIsIGNudCk7IC8vUkMgMjQxMDA1MTQgOiBOZW7DrSB2eWJyw6FuIHR5cCDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCEoKHRoaXMuVHlwVWN0b3ZhbmkgPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSmVkbm90bGl2ZSAmJiB0aGF0LlBvdm9sZW5vVWN0b3ZhbmlKZWRub3RsaXZlKVxyXG4gICAgICAgICAgICAgICAgfHwgKHRoaXMuVHlwVWN0b3ZhbmkgPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSHJvbWFkbmUgJiYgdGhhdC5Qb3ZvbGVub1VjdG92YW5pSHJvbWFkbmUpXHJcbiAgICAgICAgICAgICAgICB8fCAodGhpcy5UeXBVY3RvdmFuaSA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC5LdW11bG92YW5lICYmIHRoYXQuUG92b2xlbm9VY3RvdmFuaUt1bXVsb3ZhbmUpKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSBjaHlieSB2ZSBmbGFzaGlcclxuICAgICAgICAgICAgICAgIEZ1Y1dpemFyZC5zaG93RXJyb3JGbGFzaChcImpyZXM6MjQxMDA1MTVcIiwgY250KTsgLy9SQyAyNDEwMDUxNSA6IE5lcG92b2xlbsO9IHR5cCDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGRvcGxuaXQga29udHJvbHUgaG9kbm90IHBybyBlLcO6xI1ldG5pY3R2w60gKHBvdmlubsOpIGl4c19mdW5fb296dV91Y3QgYSBpeHBfZGVuX3VjdClcclxuXHJcbiAgICAgICAgICAgIC8vIGtvbnRyb2xhIHphdHLFvmVuw60gamVuIGJlemNoeWJuw71jaCB6w6F6bmFtxa9cclxuICAgICAgICAgICAgbGV0IGplQ2h5YmEgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgcG9oeWJ5WmFza3J0bnV0ZSA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KHRoYXQuJGdyaWQwUG9oeWJ5KTtcclxuICAgICAgICAgICAgaWYgKHBvaHlieVphc2tydG51dGUgIT0gbnVsbCAmJiBwb2h5YnlaYXNrcnRudXRlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGplQ2h5YmEgPSBwb2h5YnlaYXNrcnRudXRlLmZpbmRJbmRleCgocG9oeWIpID0+IHBvaHliPy5kdWN0X2tpbmQgIT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcykgPj0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoamVDaHliYSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdWtvbsSNZW7DrSBzIGNoeWJvdSBcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB1bG/FvmVuw60gdnlicmFuw71jaCBwb2h5YsWvIGEgamVqaWNoIGtvbnRyb2xhXHJcbiAgICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgICBjb25zdCBwb2h5YnkgPSB0aGF0LiRncmlkMFBvaHlieS5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoKS5tYXAoKHJvdykgPT4geyByZXR1cm4geyBpeHBfdXByOiByb3cuaXhwX3VwciwgcmFkZWtfdXBvOiByb3cucmFkZWtfdXBvLCBkdWN0X2NoZWNrOiByb3cuZHVjdF9jaGVjayB9OyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLnprb250cm9sdWpQcmVkVWN0b3ZhbmltWmplZG5vZHVzZW5lKHtcclxuICAgICAgICAgICAgICAgIGlrYzogdGhhdC5Ja2MsXHJcbiAgICAgICAgICAgICAgICByb3dzOiBwb2h5YnkgPz8gW11cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy9yZXR1cm4gdGhhdC5pc2wuUG9tb2NuZUZ1Yy5kdWN0VXBkYXRlVW5jaGVjayh7XHJcbiAgICAgICAgICAgIC8vICAgIGlrYzogdGhhdC5Ja2MsXHJcbiAgICAgICAgICAgIC8vICAgIHphem5hbXk6IHBvaHlieSA/PyBbXVxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hhbmdlLnN0ZXBzRW5hYmxlWzFdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVsb8W+ZW7DrSBha3R1w6FsbsOtaG8gc3RhdnUgemHFoWtydG51dMO9Y2ggesOhem5hbcWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc3QgcG9oeWJ5ID0gdGhhdC4kZ3JpZDBQb2h5YnkuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmcOtcGFkbsOpIGtvbnRyb2xhIG1heGltw6FsbsOtaG8gcG/EjXR1IHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbXVzw60gYsO9dCBvYnNsb3XFvmVuIGkgZG90YXogbmEgcMWZZWtyb8SNZW7DrSwgcG9rdWQgamUgdG8gcGFyYW1ldHJlbSBwb3ZvbGVubyAtIHRvaGxlIHNlIGFsZSBrb250cm9sdWplIHXFviBwxZlpIHN0YXJ0dSDDusSNdG92w6Fuw60sIHRha8W+ZSB6ZGUgdG8gYsO9dCBuZW11c8OtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVsb8W+ZW7DrSBzdGF2dSB6YXRyxb7DrXRlayB1IHBvaHlixa8gYSBrb250cm9sYSBwb2h5YsWvIGEgcGFyYW1ldHLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB0eXBVY3RvdmFuaTogbnVtYmVyID0gdGhhdC5UeXBVY3RvdmFuaSA/PyBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0LkplZG5vdGxpdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoYXQua29udHJvbGFQcmVkVWN0b3ZhbmltKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5pc2wuRmluUG9oeWIuemtvbnRyb2x1alByZWRVY3RvdmFuaW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpa2M6IHRoYXQuSWtjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByb3dzOiBwb2h5YnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vYWt0dWFsaXpvdmF0RHVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdHlwX3VjdG92YW5pOiB0eXBVY3RvdmFuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy50aGVuKGZ1bmN0aW9uICgvKnJldCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtvbnRyb2xhIGNoeWJuw71jaCB6YcWha3J0bnV0w71jaCBwb2h5YsWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGplQ2h5YmEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vbGV0IHZzZWNobnlQb2h5YnkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vIGtvbnRyb2xhIHphdHLFvmVuw60gamVuIGJlemNoeWJuw71jaCB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgcG9oeWJ5WmFza3J0bnV0ZSA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KHRoYXQuJGdyaWQwUG9oeWJ5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocG9oeWJ5WmFza3J0bnV0ZSAhPSBudWxsICYmIHBvaHlieVphc2tydG51dGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBqZUNoeWJhID0gcG9oeWJ5WmFza3J0bnV0ZS5maW5kSW5kZXgoKHBvaHliKSA9PiBwb2h5Yj8uZHVjdF9raW5kICE9PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MpID49IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vaWYgKHBvaHlieS5sZW5ndGggPiBwb2h5YnlaYXNrcnRudXRlLmxlbmd0aCkgdnNlY2hueVBvaHlieSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGplQ2h5YmEgPSByZXQucmVzdWx0LmZpbmQoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIChlbGVtZW50LmtpbmQgIT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2Vzcyk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChjaGFuZ2Uuc3RlcHNFbmFibGVbMV0gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIFRPRE86IGplxaF0xJsgdG8gemtvbnRyb2xvdmF0IGEgcGFrIG7Em2NvIHRha292w6lobyB1ZMSbbGF0IGkgZG8gb3N0YXRuw61jaCBwcsWvdm9kY8WvLCBwcm90b8W+ZSBqaW5hayBuZXphZnVuZ3VqZSB6bcSbbmEgc3RhdsWvLCBwb2t1ZCBqZSBuYWxlemVuYSBjaHliYS4gYnVkZSBhbGUgcG90xZllYmEgbsSbamFrIMWZZcWhaXQgcHJvbWlzeSBhIHRvIGkgdXZuaXTFmSB2b2xhbsOpIG1ldG9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmZhemUwS29udHJvbGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVmQ2xvc2UucmVzb2x2ZSghamVDaHliYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGplQ2h5YmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gdWtvbsSNZW7DrSBzIGNoeWJvdSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKGZhbHNlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWxvxb5lbsOtIGhpc3RvcmllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb3Bsbml0IGkgdWxvxb5lbsOtIHBvaHlixa8sIHBva3VkIG5lanNvdSB6YcWha3J0bnV0eSB2xaFlY2hueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodnNlY2hueVBvaHlieSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliSGlzdG9yaWVVY3RvdmFuaS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGl4c19odWY6IHRoYXQuSXhzSHVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHN0YXZfdWN0b3Zhbmk6IEdsb2JhbHMuRW51bXMuU3RhdlVjdG92YW5pUG9oeWJ1LlVrb25jZW5hS29udHJvbGFQb2h5YnUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWtjOiB0aGF0LklrYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0eXBfdWN0X2Z1YzogdGhhdC5UeXBVY3RvdmFuaSA/PyAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHVjdF9wb2g6IHRoYXQuVWN0UG9oLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHBvem5hbWthOiB0aGF0LnBvem5hbWthLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGt1bXVsX3phX2l4cDogdGhhdC5LdW11bG92YXRaYUl4cCA9PT0gdHJ1ZSA/IDEgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHByaXpfdnlyX25rczogdGhhdC5WeXJvdm5hdFphTmtzID09PSB0cnVlID8gMSA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcHJpel9iZXpfa29udHI6IHRoYXQuTmVrb250cm9sb3ZhdFByZWNlcnBhbmkgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB6YWNoX3J1Y196YXBpc3k6IHRoYXQuWmFjaG92YXRSdWNuaVphcGlzeSA9PT0gdHJ1ZSA/IDEgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGVfdWNldG5pY3R2aTogdGhhdC5FVWNldG5pY3R2aSA9PT0gdHJ1ZSA/IDEgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGl4c19mdW5fb296dV91Y3Q6IHRoYXQuaXhzRnVuT296dVVjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpeHBfZGVuX3VjdDogdGhhdC5peHBEZW5VY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIHVrb27EjWVuw60gYmV6IGNoeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGpzb3Ugc3Byw6F2bsSbIHVsb8W+ZW5hIHphdHLFvsOtdGthP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Ykhpc3RvcmllVWN0b3ZhbmkudXBkYXRlV2l0aFBvaHlieSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19odWY6IHRoYXQuSXhzSHVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF2X3VjdG92YW5pOiBHbG9iYWxzLkVudW1zLlN0YXZVY3RvdmFuaVBvaHlidS5Va29uY2VuYUtvbnRyb2xhUG9oeWJ1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpa2M6IHRoYXQuSWtjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfdWN0X2Z1YzogdGhhdC5UeXBVY3RvdmFuaSA/PyAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3RfcG9oOiB0aGF0LlVjdFBvaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG96bmFta2E6IHRoYXQucG96bmFta2EsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt1bXVsX3phX2l4cDogdGhhdC5LdW11bG92YXRaYUl4cCA9PT0gdHJ1ZSA/IDEgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml6X3Z5cl9ua3M6IHRoYXQuVnlyb3ZuYXRaYU5rcyA9PT0gdHJ1ZSA/IDEgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml6X2Jlel9rb250cjogdGhhdC5OZWtvbnRyb2xvdmF0UHJlY2VycGFuaSA9PT0gdHJ1ZSA/IDEgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6YWNoX3J1Y196YXBpc3k6IHRoYXQuWmFjaG92YXRSdWNuaVphcGlzeSA9PT0gdHJ1ZSA/IDEgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlX3VjZXRuaWN0dmk6IHRoYXQuRVVjZXRuaWN0dmkgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2Z1bl9vb3p1X3VjdDogdGhhdC5peHNGdW5Pb3p1VWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuX3VjdDogdGhhdC5peHBEZW5VY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtIGJleiBjaHlieVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZWxzZSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9lbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIEtvbnRyb2xhIHZzdHVwbsOtY2ggcGFyYW1ldHLFryAocMWZaSBvcHXFoXTEm27DrSBwcnZuw61obyBrcm9rdSlcclxuICAgICAgICAvLyAqIFxyXG4gICAgICAgIC8vICogQHBhcmFtIHthbnl9IGNudCBjb250ZW50XHJcbiAgICAgICAgLy8gKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxib29sZWFuPn0gdsO9c2xlZGVrIGtvbnRyb2x5XHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgY2hlY2tQYXJhbWV0ZXJzKGNudCk6IEpRdWVyeVByb21pc2U8Ym9vbGVhbj4ge1xyXG5cclxuICAgICAgICAvLyAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vICAgIC8vIHNlYnLDoW7DrSB6YWRhbsO9Y2ggcGFyYW1ldHLFr1xyXG4gICAgICAgIC8vICAgIGxldCBkdG9QYXJhbToge1xyXG4gICAgICAgIC8vICAgICAgICB0eXBfdWN0b3Zhbmk6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QgfCBudWxsLFxyXG4gICAgICAgIC8vICAgICAgICBlX3VjZXRuaWN0dmk6IGJvb2xlYW4gfCBudWxsLFxyXG4gICAgICAgIC8vICAgICAgICBpeHNfZnVuX29venVfdWN0OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIC8vICAgICAgICBpeHBfZGVuX3VjdDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAvLyAgICAgICAgcG96bmFta2E6IHN0cmluZyB8IG51bGxcclxuICAgICAgICAvLyAgICB9ID0ge1xyXG4gICAgICAgIC8vICAgICAgICB0eXBfdWN0b3Zhbmk6IG51bGwsXHJcbiAgICAgICAgLy8gICAgICAgIGVfdWNldG5pY3R2aTogbnVsbCxcclxuICAgICAgICAvLyAgICAgICAgaXhzX2Z1bl9vb3p1X3VjdDogbnVsbCxcclxuICAgICAgICAvLyAgICAgICAgaXhwX2Rlbl91Y3Q6IG51bGwsXHJcbiAgICAgICAgLy8gICAgICAgIHBvem5hbWthOiBudWxsXHJcbiAgICAgICAgLy8gICAgfTtcclxuICAgICAgICAvLyAgICB0aGlzLmVsZW1lbnQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG9QYXJhbSk7XHJcbiAgICAgICAgLy8gICAgaWYgKGR0b1BhcmFtLnR5cF91Y3RvdmFuaSAhPT0gbnVsbCkgdGhpcy5UeXBVY3RvdmFuaSA9IGR0b1BhcmFtLnR5cF91Y3RvdmFuaTtcclxuICAgICAgICAvLyAgICBpZiAodGhpcy5UZXN0RVVjZXRuaWN0dmkpIHtcclxuICAgICAgICAvLyAgICAgICAgdGhpcy5FVWNldG5pY3R2aSA9IGR0b1BhcmFtLmVfdWNldG5pY3R2aSE7XHJcbiAgICAgICAgLy8gICAgICAgIHRoaXMuaXhzRnVuT296dVVjdCA9IGR0b1BhcmFtLml4c19mdW5fb296dV91Y3QhO1xyXG4gICAgICAgIC8vICAgICAgICB0aGlzLml4cERlblVjdCA9IGR0b1BhcmFtLml4cF9kZW5fdWN0ITtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgaWYgKGR0b1BhcmFtLnBvem5hbWthICE9IG51bGwpIHRoaXMucG96bmFta2EgPSBkdG9QYXJhbS5wb3puYW1rYTtcclxuXHJcbiAgICAgICAgLy8gICAgLy8ga29udHJvbHlcclxuICAgICAgICAvLyAgICAvLyBUT0RPOiBkb3Bsbml0IGtvbnRyb2x1IGhvZG5vdCBwcm8gZS3DusSNZXRuaWN0dsOtIChwb3Zpbm7DqSBpeHNfZnVuX29venVfdWN0IGEgaXhwX2Rlbl91Y3QpXHJcbiAgICAgICAgLy8gICAgLy8ga29udHJvbGEgcG92b2xlbsOpaG8gdHlwdSDDusSNdG92w6Fuw61cclxuICAgICAgICAvLyAgICBpZiAodGhpcy5UeXBVY3RvdmFuaSAhPT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC5KZWRub3RsaXZlICYmIHRoaXMuVHlwVWN0b3ZhbmkgIT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVY3QuSHJvbWFkbmUgJiYgdGhpcy5UeXBVY3RvdmFuaSAhPT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC5LdW11bG92YW5lKSB7XHJcbiAgICAgICAgLy8gICAgICAgIC8vIHpvYnJhemVuw60gY2h5YnkgdmUgZmxhc2hpXHJcbiAgICAgICAgLy8gICAgICAgIEZ1Y1dpemFyZC5zaG93RXJyb3JGbGFzaChcImpyZXM6MjQxMDA1MTRcIiwgY250KTsgLy9SQyAyNDEwMDUxNCA6IE5lbsOtIHZ5YnLDoW4gdHlwIMO6xI10b3bDoW7DrVxyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgZWxzZSBpZiAoISgodGhpcy5UeXBVY3RvdmFuaSA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC5KZWRub3RsaXZlICYmIHRoYXQuUG92b2xlbm9VY3RvdmFuaUplZG5vdGxpdmUpXHJcbiAgICAgICAgLy8gICAgICAgIHx8ICh0aGlzLlR5cFVjdG92YW5pID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0Lkhyb21hZG5lICYmIHRoYXQuUG92b2xlbm9VY3RvdmFuaUhyb21hZG5lKVxyXG4gICAgICAgIC8vICAgICAgICB8fCAodGhpcy5UeXBVY3RvdmFuaSA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC5LdW11bG92YW5lICYmIHRoYXQuUG92b2xlbm9VY3RvdmFuaUt1bXVsb3ZhbmUpKSkge1xyXG4gICAgICAgIC8vICAgICAgICAvLyB6b2JyYXplbsOtIGNoeWJ5IHZlIGZsYXNoaVxyXG4gICAgICAgIC8vICAgICAgICBGdWNXaXphcmQuc2hvd0Vycm9yRmxhc2goXCJqcmVzOjI0MTAwNTE1XCIsIGNudCk7IC8vUkMgMjQxMDA1MTUgOiBOZXBvdm9sZW7DvSB0eXAgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICBlbHNlIGlmICh0aGF0LkZhemUgPiAwKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSh0cnVlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICBsZXQgY2hlY2tlZFJvd3MgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3M8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih0aGF0LiRncmlkMFBvaHlieSwgdHJ1ZSk7XHJcbiAgICAgICAgLy8gICAgICAgIGlmIChjaGVja2VkUm93cyAhPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy9jaGFuZ2Uuc3RlcHNFbmFibGVbMV0gPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIHVsb8W+ZW7DrSBha3R1w6FsbsOtaG8gc3RhdnUgemHFoWtydG51dMO9Y2ggesOhem5hbcWvXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdFxyXG4gICAgICAgIC8vICAgICAgICAgICAgbGV0IHBvaHlieSA9IHRoYXQuJGdyaWQwUG9oeWJ5LmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gcMWZw61wYWRuw6kga29udHJvbGEgbWF4aW3DoWxuw61obyBwb8SNdHUgcG9oeWLFr1xyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogbXVzw60gYsO9dCBvYnNsb3XFvmVuIGkgZG90YXogbmEgcMWZZWtyb8SNZW7DrSwgcG9rdWQgamUgdG8gcGFyYW1ldHJlbSBwb3ZvbGVubyAtIHRvaGxlIHNlIGFsZSBrb250cm9sdWplIHXFviBwxZlpIHN0YXJ0dSDDusSNdG92w6Fuw60sIHRha8W+ZSB6ZGUgdG8gYsO9dCBuZW11c8OtXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyB1bG/FvmVuw60gc3RhdnUgemF0csW+w610ZWsgdSBwb2h5YsWvIGEga29udHJvbGEgcG9oeWLFryBhIHBhcmFtZXRyxa9cclxuICAgICAgICAvLyAgICAgICAgICAgIGxldCB0eXBVY3RvdmFuaTogbnVtYmVyID0gdGhhdC5UeXBVY3RvdmFuaSA/PyBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0LkplZG5vdGxpdmU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gdGhhdC5rb250cm9sYVByZWRVY3RvdmFuaW0odHJ1ZSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3RoYXQuaXNsLkZpblBvaHliLnprb250cm9sdWpQcmVkVWN0b3ZhbmltKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyAgICBpa2M6IHRoYXQuSWtjLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vICAgIHJvd3M6IHBvaHlieSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyAgICAvL2FrdHVhbGl6b3ZhdER1Y3Q6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gICAgdHlwX3VjdG92YW5pOiB0eXBVY3RvdmFuaVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyAgICAuZ2V0KClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoLypyZXQqLykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyBrb250cm9sYSBjaHlibsO9Y2ggemHFoWtydG51dMO9Y2ggcG9oeWLFr1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBsZXQgamVDaHliYSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGxldCB2c2VjaG55UG9oeWJ5ID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8ga29udHJvbGEgemF0csW+ZW7DrSBqZW4gYmV6Y2h5Ym7DvWNoIHrDoXpuYW3Fr1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBsZXQgcG9oeWJ5WmFza3J0bnV0ZSA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KHRoYXQuJGdyaWQwUG9oeWJ5KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHBvaHlieVphc2tydG51dGUgIT0gbnVsbCAmJiBwb2h5YnlaYXNrcnRudXRlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGplQ2h5YmEgPSBwb2h5YnlaYXNrcnRudXRlLmZpbmRJbmRleCgocG9oeWIpID0+IHBvaHliPy5kdWN0X2tpbmQgIT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcykgPj0gMDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2h5YnkubGVuZ3RoID4gcG9oeWJ5WmFza3J0bnV0ZS5sZW5ndGgpIHZzZWNobnlQb2h5YnkgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL2xldCBqZUNoeWJhID0gcmV0LnJlc3VsdC5maW5kKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiAoZWxlbWVudC5raW5kICE9PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MpOyB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9pZiAoY2hhbmdlLnN0ZXBzRW5hYmxlWzFdID09PSBmYWxzZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBUT0RPOiBqZcWhdMSbIHRvIHprb250cm9sb3ZhdCBhIHBhayBuxJtjbyB0YWtvdsOpaG8gdWTEm2xhdCBpIGRvIG9zdGF0bsOtY2ggcHLFr3ZvZGPFrywgcHJvdG/FvmUgamluYWsgbmV6YWZ1bmd1amUgem3Em25hIHN0YXbFrywgcG9rdWQgamUgbmFsZXplbmEgY2h5YmEuIGJ1ZGUgYWxlIHBvdMWZZWJhIG7Em2phayDFmWXFoWl0IHByb21pc3kgYSB0byBpIHV2bml0xZkgdm9sYW7DqSBtZXRvZHlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5mYXplMEtvbnRyb2xhKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL2RlZkNsb3NlLnJlc29sdmUoIWplQ2h5YmEpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAoamVDaHliYSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWtvbsSNZW7DrSBzIGNoeWJvdSBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWxvxb5lbsOtIGhpc3RvcmllXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb3Bsbml0IGkgdWxvxb5lbsOtIHBvaHlixa8sIHBva3VkIG5lanNvdSB6YcWha3J0bnV0eSB2xaFlY2hueVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZzZWNobnlQb2h5YnkpIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Ykhpc3RvcmllVWN0b3ZhbmkudXBkYXRlKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfaHVmOiB0aGF0Lkl4c0h1ZixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF2X3VjdG92YW5pOiBHbG9iYWxzLkVudW1zLlN0YXZVY3RvdmFuaVBvaHlidS5Va29uY2VuYUtvbnRyb2xhUG9oeWJ1LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogdGhhdC5Ja2MsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3VjdF9mdWM6IHRoYXQuVHlwVWN0b3ZhbmkgPz8gMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3RfcG9oOiB0aGF0LlVjdFBvaCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3puYW1rYTogdGhhdC5wb3puYW1rYSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdW11bF96YV9peHA6IHRoYXQuS3VtdWxvdmF0WmFJeHAgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml6X3Z5cl9ua3M6IHRoYXQuVnlyb3ZuYXRaYU5rcyA9PT0gdHJ1ZSA/IDEgOiAwLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfYmV6X2tvbnRyOiB0aGF0Lk5la29udHJvbG92YXRQcmVjZXJwYW5pID09PSB0cnVlID8gMSA6IDAsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgemFjaF9ydWNfemFwaXN5OiB0aGF0LlphY2hvdmF0UnVjbmlaYXBpc3kgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBlX3VjZXRuaWN0dmk6IHRoYXQuRVVjZXRuaWN0dmkgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuX29venVfdWN0OiB0aGF0Lml4c0Z1bk9venVVY3QsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rlbl91Y3Q6IHRoYXQuaXhwRGVuVWN0XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtIGJleiBjaHlieVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliSGlzdG9yaWVVY3RvdmFuaS51cGRhdGVXaXRoUG9oeWJ5KHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfaHVmOiB0aGF0Lkl4c0h1ZixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF2X3VjdG92YW5pOiBHbG9iYWxzLkVudW1zLlN0YXZVY3RvdmFuaVBvaHlidS5Va29uY2VuYUtvbnRyb2xhUG9oeWJ1LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogdGhhdC5Ja2MsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3VjdF9mdWM6IHRoYXQuVHlwVWN0b3ZhbmkgPz8gMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3RfcG9oOiB0aGF0LlVjdFBvaCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3puYW1rYTogdGhhdC5wb3puYW1rYSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdW11bF96YV9peHA6IHRoYXQuS3VtdWxvdmF0WmFJeHAgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml6X3Z5cl9ua3M6IHRoYXQuVnlyb3ZuYXRaYU5rcyA9PT0gdHJ1ZSA/IDEgOiAwLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfYmV6X2tvbnRyOiB0aGF0Lk5la29udHJvbG92YXRQcmVjZXJwYW5pID09PSB0cnVlID8gMSA6IDAsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgemFjaF9ydWNfemFwaXN5OiB0aGF0LlphY2hvdmF0UnVjbmlaYXBpc3kgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBlX3VjZXRuaWN0dmk6IHRoYXQuRVVjZXRuaWN0dmkgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuX29venVfdWN0OiB0aGF0Lml4c0Z1bk9venVVY3QsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rlbl91Y3Q6IHRoYXQuaXhwRGVuVWN0XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtIGJleiBjaHlieVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKGZhbHNlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYcO6xI10b3bDoW7DrSB6Ynl0a3Uga3Jva8WvIG9kbG/FvmVuxJtcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemF1Y3RvdmF0T2Rsb3plbmUoKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBrb250cm9sYSBwYXJhbWV0csWvIChwb3V6ZSBwb2t1ZCBqZGUgbyBwcnZuw60gZsOhemkpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuRmF6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5jaGVja1BhcmFtZXRlcnNBbmRTYXZlQ2hlY2sodGhhdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSB0cnVlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB6YWTDoW7DrSBwYXJhbWV0csWvIG9kbG/FvmVuw6lobyDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTItMTAtMCwgTS0yLTEwLTAsIFMtMTItMTItMFwiIH0pLmFkZFNlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtRGVmLmFkZFRleHQoXCJqcmVzOjI0MTAwMjA5XCIpOyAvL1JDIDI0MTAwMjA5IDogT3ByYXZkdSBjaGNldGUgdWtvbsSNaXQgcHLFr3ZvZGNlIGEgemHDusSNdG92YXQgcG9oeWJ5IG9kbG/FvmVuxJs/XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0Lk5la29udHJvbG92YXRQcmVjZXJwYW5pICYmIHRoYXQuTW96bm9zdFByZWNlcnBhbmkgPT09IHRydWUpIGZvcm1EZWYuYWRkUm93KCkuYWRkUm93KFwiUMWZZcSNZXJww6Fuw61cIikuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInBvdm9saXRfcHJlY2VycGFuaVwiLCBsYWJlbDogXCJ6YcO6xI10b3ZhdCwgaSBwb2t1ZCBidWRlIHDFmWkga29udHJvbGUgemppxaF0xJtubyBwxZllxI1lcnDDoW7DrSByZXplcnZvdmFuw71jaCBwcm9zdMWZZWRrxa9cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLnNpbXBsZUZvcm1Pa0NhbmNlbCh0aGF0LCBmb3JtRGVmLCB7fSwgXCJqcmVzOjI0MTAwMjEwXCIsIDcwMCwgMjUwKSAvL1JDIDI0MTAwMjEwIDogw5rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKChkaWFsb2dSZXR1cm5WYWx1ZSkgPT4geyByZXR1cm4gZGlhbG9nUmV0dXJuVmFsdWUgPyB0cnVlIDogZmFsc2U7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhOiB7IHBvdm9saXRfcHJlY2VycGFuaTogYm9vbGVhbiB9KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5wb3ZvbGl0X3ByZWNlcnBhbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwb3ZvbGl0X3ByZWNlcnBhbmk6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwxZnDrXpuYWssIMW+ZSBwcsWvdm9kY2Uga29uxI3DrSBvZGxvxb5lbsO9Y2ggw7rEjXRvdsOhbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuT2Rsb3plbmVVY3RvdmFuaSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3B1xaF0xJtuw60gYXN5bmNocm9ubsOtIMO6bG9oeVxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuc3RhcnQoXCJHb3JkaWMuRnVjLlNlcnZlci5HVWN0b3ZhbmlBc3luY1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvbGFkaXQgcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c0h1ZjogdGhhdC5JeHNIdWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxwYzogdGhhdC5Mb2dQb3JDaXNsbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWtjOiB0aGF0LklrYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmF6ZVVjdG92YW5pOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuV2l6RmF6ZVVjdC5aYXVjdG92YW5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW51bGFGYXplVWN0b3Zhbmk6IHRoYXQuRmF6ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWN0b3Zhbmk6IHRoYXQuVHlwVWN0b3ZhbmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVjdFBvaDogdGhhdC5VY3RQb2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvem5hbWthOiB0aGF0LnBvem5hbWthLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrdW11bGFjZVphSXhwOiB0aGF0Lkt1bXVsb3ZhdFphSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eXJvdm5hbm9zdDogdGhhdC5WeXJvdm5hdFphTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXpLb250cm9seVByZWNlcnBhbmk6IHRoYXQuTmVrb250cm9sb3ZhdFByZWNlcnBhbmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvdm9saXRQcmVjZXJwYW5pOiBwb3ZvbGl0X3ByZWNlcnBhbmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHphY2hvdmF0UnVjbmlaYXBpc3k6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVVY2V0bmljdHZpOiB0aGF0LkVVY2V0bmljdHZpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNGdW5Pb3p1VWN0OiB0aGF0Lml4c0Z1bk9venVVY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cERlblVjdDogdGhhdC5peHBEZW5VY3RcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVrb27EjWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8vLyBvYmpla3QgcHJvIHDFmWVkw6F2w6Fuw60gaG9kbm90XHJcbiAgICAgICAgICAgIC8vaW50ZXJmYWNlIHJldHVybk9ialR5cGUge1xyXG4gICAgICAgICAgICAvLyAgICB6YXVjdG92YXRfb2Rsb3plbmU6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIC8vICAgIHBvdm9saXRfcHJlY2VycGFuaTogYm9vbGVhblxyXG4gICAgICAgICAgICAvL307XHJcbiAgICAgICAgICAgIC8vbGV0IHJldHVybk9iajogcmV0dXJuT2JqVHlwZSA9IHtcclxuICAgICAgICAgICAgLy8gICAgemF1Y3RvdmF0X29kbG96ZW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICBwb3ZvbGl0X3ByZWNlcnBhbmk6IGZhbHNlLFxyXG4gICAgICAgICAgICAvL307XHJcblxyXG4gICAgICAgICAgICAvL3JldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShyZXR1cm5PYmopLnByb21pc2UoKVxyXG4gICAgICAgICAgICAvLy50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAgICAgLy8gICAgaWYgKHRoYXQuRmF6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoYXQuY2hlY2tQYXJhbWV0ZXJzKHRoYXQpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm5PYmouemF1Y3RvdmF0X29kbG96ZW5lID0gcmV0VmFsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIC8vICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGlmIChyZXR1cm5PYmouemF1Y3RvdmF0X29kbG96ZW5lKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuT2JqLnphdWN0b3ZhdF9vZGxvemVuZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGxldCBmb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMi0xMC0wLCBNLTItMTAtMCwgUy0xMi0xMi0wXCIgfSkuYWRkU2VjdGlvbigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGZvcm1EZWYuYWRkVGV4dChcImpyZXM6MjQxMDAyMDlcIik7IC8vUkMgMjQxMDAyMDkgOiBPcHJhdmR1IGNoY2V0ZSB1a29uxI1pdCBwcsWvdm9kY2UgYSB6YcO6xI10b3ZhdCBwb2h5Ynkgb2Rsb8W+ZW7Emz9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoIXRoYXQuTmVrb250cm9sb3ZhdFByZWNlcnBhbmkgJiYgdGhhdC5Nb3pub3N0UHJlY2VycGFuaSA9PT0gdHJ1ZSkgZm9ybURlZi5hZGRSb3coKS5hZGRSb3coXCJQxZllxI1lcnDDoW7DrVwiKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwicG92b2xpdF9wcmVjZXJwYW5pXCIsIGxhYmVsOiBcInphw7rEjXRvdmF0LCBpIHBva3VkIGJ1ZGUgcMWZaSBrb250cm9sZSB6amnFoXTEm25vIHDFmWXEjWVycMOhbsOtIHJlemVydm92YW7DvWNoIHByb3N0xZllZGvFr1wiIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwuc2ltcGxlRm9ybU9rQ2FuY2VsKHRoYXQsIGZvcm1EZWYsIHt9LCBcImpyZXM6MjQxMDAyMTBcIiwgNzAwLCAyNTApIC8vUkMgMjQxMDAyMTAgOiDDmsSNdG92w6Fuw61cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKGRpYWxvZ1JldHVyblZhbHVlKSA9PiB7IHJldHVybiBkaWFsb2dSZXR1cm5WYWx1ZSA/IHRydWUgOiBmYWxzZTsgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGE6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHBvdm9saXRfcHJlY2VycGFuaTogYm9vbGVhblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm5PYmouemF1Y3RvdmF0X29kbG96ZW5lID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybk9iai5wb3ZvbGl0X3ByZWNlcnBhbmkgPSBkYXRhLnBvdm9saXRfcHJlY2VycGFuaTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0vKixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybk9iai56YXVjdG92YXRfb2Rsb3plbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvL2RlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH0qLyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyAgICAvKmlmKHJldHVybk9iai56YXVjdG92YXRfb2Rsb3plbmUpKi8gZGVmLnJlc29sdmUocmV0dXJuT2JqKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3RoYXQuZGlhbG9ncy5jb25maXJtKFwianJlczoyNDEwMDIxMFwiLCAvL1JDIDI0MTAwMjEwIDogw5rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgXCJqcmVzOjI0MTAwMjA5XCIpIC8vUkMgMjQxMDAyMDkgOiBPcHJhdmR1IGNoY2V0ZSB1a29uxI1pdCBwcsWvdm9kY2UgYSB6YcO6xI10b3ZhdCBwb2h5Ynkgb2Rsb8W+ZW7Emz9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgICAgICAvLyB1a29uxI1lbsOtIHByxa92b2RjZSAtIGplbiBwb3puYW1lbsOhbsOtIG9kcG92xJtkaSwgcHJvdG/FvmUgemRlIG5lbsOtIG1vxb5uw6kgemF2xZnDrXQgcHLFr3ZvZGNlIChuZWtvbmXEjW7EmyBieSBzZSB6YXbDrXJhbCB0ZW50byBwb3R2cnpvdmFjw60gZGlhbG9nIGEgcGFkbG8gYnkgdG8pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgICAgIHJldHVybk9iai56YXVjdG92YXRfb2Rsb3plbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgICAgICAvL2RlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICAub24oXCJjbG9zZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgICAgICAvLyB1a29uxI1lbsOtIHByxa92b2RjZSAtIGplbiBwb3puYW1lbsOhbsOtIG9kcG92xJtkaSwgcHJvdG/FvmUgemRlIG5lbsOtIG1vxb5uw6kgemF2xZnDrXQgcHLFr3ZvZGNlIChuZWtvbmXEjW7EmyBieSBzZSB6YXbDrXJhbCB0ZW50byBwb3R2cnpvdmFjw60gZGlhbG9nIGEgcGFkbG8gYnkgdG8pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAvLy50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIGlmIChyZXR1cm5PYmouemF1Y3RvdmF0X29kbG96ZW5lICYmICF0aGF0Lk5la29udHJvbG92YXRQcmVjZXJwYW5pICYmIHRoYXQuTW96bm9zdFByZWNlcnBhbmkpIHtcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwianJlczoyNDEwMDIxMFwiLCAvL1JDIDI0MTAwMjEwIDogw5rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICAgICAgICAgXCJKZSBuYXN0YXZlbmEga29udHJvbGEgbmEgcMWZZcSNZXJww6Fuw60gLSBjaGNldGUgcG92b2xpdCBwxZllxI1lcnDDoW7DrSwgcG9rdWQgcMWZaSBvZGxvxb5lbsOpbSDDusSNdG92w6Fuw60gZG9qZGUgayBwxZllxI1lcnDDoW7DrT9cIilcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtIHByxa92b2RjZSAtIGplbiBwb3puYW1lbsOhbsOtIG9kcG92xJtkaSwgcHJvdG/FvmUgemRlIG5lbsOtIG1vxb5uw6kgemF2xZnDrXQgcHLFr3ZvZGNlIChuZWtvbmXEjW7EmyBieSBzZSB6YXbDrXJhbCB0ZW50byBwb3R2cnpvdmFjw60gZGlhbG9nIGEgcGFkbG8gYnkgdG8pXHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgIHJldHVybk9iai5wb3ZvbGl0X3ByZWNlcnBhbmkgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICAgICAgICAgICAgICAvL2RlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgLy8gICAgICAgICAgICAub24oXCJjbG9zZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtIHByxa92b2RjZSAtIGplbiBwb3puYW1lbsOhbsOtIG9kcG92xJtkaSwgcHJvdG/FvmUgemRlIG5lbsOtIG1vxb5uw6kgemF2xZnDrXQgcHLFr3ZvZGNlIChuZWtvbmXEjW7EmyBieSBzZSB6YXbDrXJhbCB0ZW50byBwb3R2cnpvdmFjw60gZGlhbG9nIGEgcGFkbG8gYnkgdG8pXHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8gICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICAgICBkZWYucmVzb2x2ZShyZXR1cm5PYmopO1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICAvLyAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgLy8gICAgLy99KVxyXG4gICAgICAgICAgICAvLyAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAocmV0dXJuT2JqLnphdWN0b3ZhdF9vZGxvemVuZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIHDFmcOtem5haywgxb5lIHByxa92b2RjZSBrb27EjcOtIG9kbG/FvmVuw71jaCDDusSNdG92w6Fuw61tXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5PZGxvemVuZVVjdG92YW5pID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBzcHXFoXTEm27DrSBhc3luY2hyb25uw60gw7psb2h5XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5zdGFydChcIkdvcmRpYy5GdWMuU2VydmVyLkdVY3RvdmFuaUFzeW5jXCIsIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gVE9ETzogZG9sYWRpdCBwYXJhbWV0cnlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXhzSHVmOiB0aGF0Lkl4c0h1ZixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbHBjOiB0aGF0LkxvZ1BvckNpc2xvLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpa2M6IHRoYXQuSWtjLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBmYXplVWN0b3Zhbmk6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5XaXpGYXplVWN0LlphdWN0b3ZhbmksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIG1pbnVsYUZhemVVY3RvdmFuaTogdGhhdC5GYXplLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0eXBVY3RvdmFuaTogdGhhdC5UeXBVY3RvdmFuaSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdWN0UG9oOiB0aGF0LlVjdFBvaCxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcG96bmFta2E6IHRoYXQucG96bmFta2EsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGt1bXVsYWNlWmFJeHA6IHRoYXQuS3VtdWxvdmF0WmFJeHAsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHZ5cm92bmFub3N0OiB0aGF0LlZ5cm92bmF0WmFOa3MsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGJlektvbnRyb2x5UHJlY2VycGFuaTogdGhhdC5OZWtvbnRyb2xvdmF0UHJlY2VycGFuaSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcG92b2xpdFByZWNlcnBhbmk6IHJldHVybk9iai5wb3ZvbGl0X3ByZWNlcnBhbmksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHphY2hvdmF0UnVjbmlaYXBpc3k6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGVVY2V0bmljdHZpOiB0aGF0LkVVY2V0bmljdHZpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpeHNGdW5Pb3p1VWN0OiB0aGF0Lml4c0Z1bk9venVVY3QsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGl4cERlblVjdDogdGhhdC5peHBEZW5VY3RcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGlmIChyZXR1cm5PYmouemF1Y3RvdmF0X29kbG96ZW5lKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gdWtvbsSNZW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcsOhdMOtIHRleHQgZG8gcHLFr2LEm2h1IG9wZXJhY2UgcG9kbGUgZsOhemVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dsb2JhbHMuRW51bXMuV2l6RmF6ZVVjdH0gW2V4cGxGYXplXSB2eW51Y2Vuw6EgZsOhemUgKG51bGwgPSBha3R1w6FsbsOtIGbDoXplKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHRleHQgZG8gcHLFr2LEm2h1IG9wZXJhY2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldFRleHRGYXplKGV4cGxGYXplPzogR2xvYmFscy5FbnVtcy5XaXpGYXplVWN0KTogc3RyaW5nIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBmYXplID0gKGV4cGxGYXplICE9IG51bGwgPyBleHBsRmF6ZSA6IHRoaXMuRmF6ZSk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZmF6ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxzLkVudW1zLldpekZhemVVY3QuS29udHJvbGFQb2h5YnU6IHJldHVybiBcImpyZXM6MjQxMDAyMDRcIjsgLy9SQyAyNDEwMDIwNCA6IFByb2LDrWjDoSBrb250cm9sYSBwb2h5YsWvXHJcbiAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbHMuRW51bXMuV2l6RmF6ZVVjdC5QcmlwcmF2YVphcGlzdTogcmV0dXJuIFwianJlczoyNDEwMDIwNVwiOyAvL1JDIDI0MTAwMjA1IDogUHJvYsOtaMOhIHDFmcOtcHJhdmEgesOhcGlzxa9cclxuICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFscy5FbnVtcy5XaXpGYXplVWN0LlByaXByYXZhRG9rbGFkdTogcmV0dXJuIFwianJlczoyNDEwMDIwNlwiOyAvL1JDIDI0MTAwMjA2IDogUHJvYsOtaMOhIHDFmcOtcHJhdmEgZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFscy5FbnVtcy5XaXpGYXplVWN0LlphdWN0b3Zhbmk6IHJldHVybiBcImpyZXM6MjQxMDAyMDdcIjsgLy9SQyAyNDEwMDIwNyA6IFByb2LDrWjDoSB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxzLkVudW1zLldpekZhemVVY3QuWnJ1c2VuaUJlelphdWN0b3Zhbmk6IHJldHVybiBcImpyZXM6MjQxMDAyMDhcIjsgLy9SQyAyNDEwMDIwOCA6IFByb2LDrWjDoSB6cnXFoWVuw60gw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRmlsdHIgcG9oeWLFryBwb2RsZSB6w6FwaXPFryB2ZSBkcnVow6ltIGtyb2t1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJQb2h5YnkxKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybUZpbHRlciA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6RmlsdGVyUG9oeWJ5MVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0xLTExLTAsIE0tMS0xMS0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjI0MTAwNTMwXCIpIC8vUkMgMjQxMDA1MzAgOiBaw6FwaXN5XHJcbiAgICAgICAgICAgICAgICAvLyBmaWx0ciBuYSB2xJt0dVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInphcF9zZV96YXBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI0MTAwNTI5XCIsIC8vUkMgMjQxMDA1MjkgOiBzZSB6w6FwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWU6IGJvb2xlYW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gKGNoYW5nZU9iai52YWx1ZSA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLmdmb3JtXCIpLmZpbmRGaWVsZHMoXCJ6YXBfdmV0YVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5Fa28uUHJlZmFicy5jZnVFbGVtZW50cyh7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR0Z1Y0NmdUZpbHRlckR0bz4oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTmtzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKGR0bykgeyByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWUoZHRvLm5rcyk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5ua3MgPz8gXCJOU1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25seUFjdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3RQcm9obDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNvcnRlZEVrb0NmdVNldChHb3JkaWMuRWtvLkNmdVV0aWxzLmdldENmdVNldEVkaXRvcnModGhhdCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbkFkZE5ld1JlY29yZHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuUmVtb3ZlUmVjb3JkczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISh0aGF0LkZpbHRyeVBvaHlidTEuemFwX3NlX3phcGlzeSA9PT0gdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICB9KSwgeyBuYW1lOiBcInphcF92ZXRhXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vIGZpbHRyIG5hIGNoeWLEm2rDrWPDrSB6w6FwaXN5XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemFwX2Jlel96YXBpc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI0MTAwNTI4XCIgLy9SQyAyNDEwMDUyOCA6IGJleiB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIGZpbHRyIG5hIGNoeWLEm2rDrWPDrSB6w6FwaXN5XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemFwX25ldnlyb3ZuYW5lX3phX25rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MjQxMDA1MjdcIiAvL1JDIDI0MTAwNTI3IDogbmV2eXJvdm5hbsOpIHphIE5LU1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIGZpbHRyIG5hIGNoeWLEm2rDrWPDrSB6w6FwaXN5XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemFwX25ldnlyb3ZuYW5lX2Jlel9ua3NcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI0MTAwNTI2XCIgLy9SQyAyNDEwMDUyNiA6IG5ldnlyb3ZuYW7DqSB6YSBwb2h5YlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLnNpbXBsZUZvcm1Pa0NhbmNlbChcclxuICAgICAgICAgICAgICAgIHRoYXQsXHJcbiAgICAgICAgICAgICAgICBmb3JtRmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5GaWx0cnlQb2h5YnUxLFxyXG4gICAgICAgICAgICAgICAgXCJqcmVzOjI0MTAwNTMxXCIsIDcwMCwgMzUwKSAvL1JDIDI0MTAwNTMxIDogRmlsdHIgem9icmF6ZW7DrSBwb2h5YsWvXHJcbiAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgoZGlhbG9nUmV0dXJuVmFsdWUpID0+IHsgcmV0dXJuIGRpYWxvZ1JldHVyblZhbHVlID8gdHJ1ZSA6IGZhbHNlOyB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IMWZZcWhaXQgemFwYW1hdG92w6Fuw60gaG9kbm90IGt2xa9saSBwxZllY2hvZMWvbSBtZXppIGtyb2t5PyBtZXppIGtyb2t5IGFzaSBuZSwgYWxlIHYgcsOhbWNpIGtyb2t1IGJ5IHRvIHZob2Ruw6kgYnlsb1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuRmlsdHJ5UG9oeWJ1MSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnphcF9zZV96YXBpc3kgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5GaWx0cnlQb2h5YnUxW1wiemFwX3NlX3phcGlzeVwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnphcF92ZXRhICE9IG51bGwpIHRoYXQuRmlsdHJ5UG9oeWJ1MVtcInphcF92ZXRhXCJdID0gZGF0YS56YXBfdmV0YTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuemFwX2Jlel96YXBpc3UgPT09IHRydWUpIHRoYXQuRmlsdHJ5UG9oeWJ1MVtcInphcF9iZXpfemFwaXN1XCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS56YXBfbmV2eXJvdm5hbmVfemFfbmtzID09PSB0cnVlKSB0aGF0LkZpbHRyeVBvaHlidTFbXCJ6YXBfbmV2eXJvdm5hbmVfemFfbmtzXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS56YXBfbmV2eXJvdm5hbmVfYmV6X25rcyA9PT0gdHJ1ZSkgdGhhdC5GaWx0cnlQb2h5YnUxW1wiemFwX25ldnlyb3ZuYW5lX2Jlel9ua3NcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RGaWx0clBvaHlidSEuY2hlY2tlZCh0aGF0LkZpbHRyeVBvaHlidTEuemFwX3NlX3phcGlzeSB8fCB0aGF0LkZpbHRyeVBvaHlidTEuemFwX2Jlel96YXBpc3UgPT09IHRydWUgfHwgdGhhdC5GaWx0cnlQb2h5YnUxLnphcF9uZXZ5cm92bmFuZV96YV9ua3MgPT09IHRydWUgfHwgdGhhdC5GaWx0cnlQb2h5YnUxLnphcF9uZXZ5cm92bmFuZV9iZXpfbmtzID09PSB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkUG9oeWJ5MSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWRaYXBpc3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcHJ2a8WvIHZlIGZvcm11bMOhxZlpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBwxZllZMSbbGF0IGVuYWJsZWQgbmEgdXBkYXRlUGVybWlzc2lvbj9cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdHMgPSB0aGlzLmFjdGlvbnM7XHJcbiAgICAgICAgICAgIC8vIGFrY2UgcHJvIHBvaHlieSAodmUgZsOhemkgMClcclxuICAgICAgICAgICAgaWYgKHRoaXMuRmF6ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNFbXB0eSA9ICEodGhpcy4kZ3JpZDBQb2h5YnkuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldENvdW50KFwiZGF0YVwiKSA+IDApO1xyXG4gICAgICAgICAgICAgICAgYWN0cy5hY3RLb250cm9sYSEuZW5hYmxlZCghaXNFbXB0eSk7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBidWRlIHbFvmR5IHBvdm9sZW5vPyBhc2kgbmVtxa/FvmUgbmFzdGF0IHNpdHVhY2UsIMW+ZSBzZXpuYW0gYnVkZSBwcsOhemRuw71cclxuICAgICAgICAgICAgICAgIGFjdHMuYWN0RGV0YWlsUG9oeWJ1IS5lbmFibGVkKCFpc0VtcHR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBha2NlIHBybyBwb2h5YnkgYSB6w6FwaXN5IChqc291IGplbiB2ZSBmw6F6aSAxKVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLkZhemUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzRW1wdHkgPSAhKHRoaXMuJGdyaWQxUG9oeWJ5LmdncmlkKFwiZ2V0Vmlld1wiKS5nZXRDb3VudChcImRhdGFcIikgPiAwKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRFZGl0ID0gKHRoaXMuJGdyaWQxWmFwaXN5UG9oeWJ1Py5maW5kKFwiLnJvdy5lZGl0aW5nXCIpPy5sZW5ndGggPz8gMCkgPiAwO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogYnVkZSB2xb5keSBwb3ZvbGVubz8gYXNpIG5lbcWvxb5lIG5hc3RhdCBzaXR1YWNlLCDFvmUgc2V6bmFtIGJ1ZGUgcHLDoXpkbsO9XHJcbiAgICAgICAgICAgICAgICBhY3RzLmFjdERldGFpbFBvaHlidSEuZW5hYmxlZCghaXNFbXB0eSk7XHJcbiAgICAgICAgICAgICAgICBhY3RzLmFjdE9wcmF2YVBvaHlidSEuZW5hYmxlZCghaXNFbXB0eSk7XHJcbiAgICAgICAgICAgICAgICBhY3RzLmFjdEZpbHRyUG9oeWJ1IS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBzcHLDoXZub3UgcG9kbcOtbmt1IHBybyBwxZnDrXN0dXBub3N0IGFrY8OtIChwYXJhbWV0cnksIC4uLilcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFrdFphcGlzID0gdGhpcy4kZ3JpZDFaYXBpc3lQb2h5YnU/R29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcGlzRHRvPih0aGlzLiRncmlkMVphcGlzeVBvaHlidSk6bnVsbDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFrdFBvaHliID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih0aGlzLiRncmlkMVBvaHlieSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2h5Yk5lc3Rvcm5vVlVjdG92YW5pID0gKGFrdFBvaHliICE9IG51bGwgJiYgYWt0UG9oeWIuc191cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TVXBvLlZVY3RvdmFuaSAmJiAoYWt0UG9oeWIudHlwX3VwbyA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVwby5VY2V0bmlBdXRvbWF0aWNreSB8fCBha3RQb2h5Yi50eXBfdXBvID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVXBvLlVjZXRuaVBvbG9hdXRvbWF0aWNreSB8fCBha3RQb2h5Yi50eXBfdXBvID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVXBvLlVjZXRuaVJ1Y25pKSk7XHJcbiAgICAgICAgICAgICAgICBhY3RzLmFjdE5vdnlaYXBpcyEuZW5hYmxlZCh0aGF0LlBvdm9sZW5hRWRpdGFjZVphcGlzdSAmJiBwb2h5Yk5lc3Rvcm5vVlVjdG92YW5pICYmICFncmlkRWRpdCk7XHJcbiAgICAgICAgICAgICAgICBhY3RzLmFjdE9wcmF2YVphcGlzdSEuZW5hYmxlZCh0aGF0LlBvdm9sZW5hRWRpdGFjZVphcGlzdSAmJiBwb2h5Yk5lc3Rvcm5vVlVjdG92YW5pICYmICFncmlkRWRpdCAmJiBha3RaYXBpcyAhPSBudWxsKTtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IG9kc3RyYW7Em27DrSB6w6FwaXN1ICh6YXTDrW0/KSBuZW7DrSBwb2Rwb3JvdsOhbm9cclxuICAgICAgICAgICAgICAgIGFjdHMuYWN0T2RzdHJhbmVuaVphcGlzdSEuZW5hYmxlZChmYWxzZS8qdGhpcy5VY3RvdmFuaSAmJiBha3RaYXBpcyAhPSBudWxsKi8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWTDoW7DrSBwYXJhbWV0csWvIHRpc2t1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtJR1ByaW50QWN0aW9uUmVwb3J0U3RhcnRpbmd9IHJlcCBwYXJhbWV0cnkgdGlza3VcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFt2c2VdIHRydWUgPSB0aXNrIHbFoWVjaCBkb2tsYWTFryBuYWplZG5vdSwgamluYWsgamVuIGFrdHXDoWxuw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVwb3J0U3RhcnRpbmcocmVwOiBJR1ByaW50QWN0aW9uUmVwb3J0U3RhcnRpbmcsIHZzZT86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGVsZW1lbnTDoXJuw60gw7rEjWV0bsOtIHrDoXBpc3kgKHTDqW1hIGZ1Y19wdG1fZG9rYWdkLCBzZXN0YXZhIGZ1Y2RvazAxKSBzZSB6ZGUgbmV0aXNrbm91LCBqc291IGplbiBuYSBkZXRhaWx1IHphw7rEjXRvdmFuw6lobyBwb2h5YnUgKHZlIGbDoXppIDMgdcW+IG5lanNvdSBwb2h5YnksIGtlIGt0ZXLDvW0gYnkgc2UgdG8gbW9obG8gdGlza25vdXQpXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHBvZG3DrW5rYSBuYSB0w6ltYSBqZSB6Ynl0ZcSNbsOhICh2aXouIGtvbWVudMOhxZkgdsO9xaFlKSAtIG9kc3RyYW5pdCBqaT9cclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBwYXJhbWV0csWvIHBvZGxlIHTDqW1hdHVcclxuICAgICAgICAgICAgaWYgKHJlcC50ZW1hID09PSBcImZ1Y19wdG1fZW5nemF1XCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIMO6xI1ldG7DrSBkb2tsYWQgKGbDoXplIDMpXHJcbiAgICAgICAgICAgICAgICBsZXQgYWt0RG9rbGFkID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR0Rva2xhZER0bz4odGhpcy4kZ3JpZDNEb2tsYWR5KTtcclxuICAgICAgICAgICAgICAgIGlmIChha3REb2tsYWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAwID0gYWt0RG9rbGFkLnJvayEudG9TdHJpbmcoMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDEgPSBha3REb2tsYWQubGljITtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAyID0gYWt0RG9rbGFkLmljbyE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMyA9IGFrdERva2xhZC51Y3MhO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDQgPSBha3REb2tsYWQubWVzaWMhLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA1ID0gYWt0RG9rbGFkLmFjITtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5UeXBVY3RvdmFuaSA9PT0gMTAgfHwgdGhpcy5UeXBVY3RvdmFuaSA9PT0gMjApIHJlcC5wYXJhbXMuWDAwMDYgPSBcIjFcIjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHJlcC5wYXJhbXMuWDAwMDYgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2IFgwMDA3IGplIGxvZ19wb3JfY2lzbG8gdiBwxZnDrXBhZMSbIHRpc2t1IHbFoWVjaCBkb2tsYWTFryBuYWplZG5vdVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2c2UgPT09IHRydWUpIHJlcC5wYXJhbXMuWDAwMDcgPSB0aGlzLkxvZ1BvckNpc2xvLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHJlcC5wYXJhbXMuWDAwMDcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZ5dcW+aXTDrSBkdG8gcG91emUgcHJvIHDFmWVub3MgSUtDIGRvIENTLCBrZGUgc2UgcG91xb5pamUgbmEgdnl0dm/FmWVuw60gZGV2w6F0w6lobyBwYXJhbWV0cnVcclxuICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBkdWN0X2lrYzogdGhpcy5Ja2N9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZXN0LCBqZXN0bGkgamUgbW/Fvm7DqSBva25vIHphdsWZw610XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8Ym9vbGVhbj59IHByb21pc2UgKHJlc29sdmUgPSBqZSBtb8W+bsOpIHphdsWZw610LCByZWplY3QgPSBuZW7DrSBtb8W+bsOpIHphdsWZw610KSBzIHDFmcOtem5ha2VtLCBqZXN0bGkgw7rEjXRvdsOhbsOtIHBva3JhxI11amUgb2Rsb8W+ZW7EmyBuZWJvIG5lXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoY29tcGxldGU/OiBib29sZWFuKTogSlF1ZXJ5UHJvbWlzZTx7IGNvbXBsZXRlOiBib29sZWFuLCB1Y3RvdmFub09kbG96ZW5lOiBib29sZWFuIH0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHN0YXYgdWtvbsSNZW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgaWYgKCEoY29tcGxldGUgPT09IHRydWUgfHwgY29tcGxldGUgPT09IGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGUgPSB0aGlzLkZhemUgPT0gMyAmJiB0aGlzLlphdWN0b3Zhbm9CZXpDaHliID09PSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBwxZllY2hvZCBuYSBvZGxvxb5lbsOpIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICBpZiAodGhhdC5PZGxvemVuZVVjdG92YW5pID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBoaXN0b3JpZSBzZSBuZWFrdHVhbGl6dWplXHJcbiAgICAgICAgICAgICAgICAvLyB6YXbFmWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoeyBjb21wbGV0ZTogY29tcGxldGUsIHVjdG92YW5vT2Rsb3plbmU6IHRoYXQuT2Rsb3plbmVVY3RvdmFuaSB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHVrb27EjWVuw60gcG9rdWQgc2Ugw7rEjXRvdmF0IG5lemHEjWFsbyAodWtvbsSNZW7DrSB6IHBydm7DrWhvIGtyb2t1IG5lYm8gdWtvbsSNZW7DrSBrdsWvbGkgY2h5YsSbIHogaW5pY2lhbGl6YWNlIG5lYm8gcHJ2b3RybsOtIGtvbnRyb2x5IHDFmWVkIMO6xI10b3bDoW7DrW0pXHJcbiAgICAgICAgICAgIC8vIHN0YXZ5IHBvaHlixa8gbmVuw60gcG90xZllYmEgxZllxaFpdCwgc3RhxI3DrSBha3R1YWxpemFjZSBoaXN0b3JpZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5GYXplICE9PSAxICYmIHRoaXMuRmF6ZSAhPT0gMiAmJiB0aGlzLkZhemUgIT09IDMpIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgKCh0aGlzLkZhemUgIT09IDEgJiYgdGhpcy5GYXplICE9PSAyICYmICEodGhpcy5GYXplID09IDMgJiYgdGhpcy5aYXVjdG92YW5vQmV6Q2h5YiA9PT0gZmFsc2UpKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gaGlzdG9yaWUgc2UgYWt0dWFsaXp1amVcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Lkl4c0h1Zikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Ykhpc3RvcmllVWN0b3ZhbmkudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2h1ZjogdGhhdC5JeHNIdWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXZfdWN0b3Zhbmk6IEdsb2JhbHMuRW51bXMuU3RhdlVjdG92YW5pUG9oeWJ1LlByZXJ1c2Vub1V6aXZhdGVsZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogdGhhdC5Ja2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF91Y3RfZnVjOiB0aGF0LlR5cFVjdG92YW5pID8/IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVjdF9wb2g6IHRoYXQuVWN0UG9oXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphdsWZZW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbXBsZXRlOiBjb21wbGV0ZSwgdWN0b3Zhbm9PZGxvemVuZTogdGhhdC5PZGxvemVuZVVjdG92YW5pIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gamVub20gemF2xZllbsOtIHByxa92b2RjZSwgbmVuw60gem7DoW1hIGhpc3RvcmllXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHsgY29tcGxldGU6IGNvbXBsZXRlLCB1Y3RvdmFub09kbG96ZW5lOiB0aGF0Lk9kbG96ZW5lVWN0b3ZhbmkgfSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB1a29uxI1lbsOtIHBva3VkIG5lbsOtIHJvesO6xI10b3bDoW5vXHJcbiAgICAgICAgICAgIGlmICgodGhpcy5GYXplICE9PSAxICYmIHRoaXMuRmF6ZSAhPT0gMiAmJiAhKHRoaXMuRmF6ZSA9PT0gMyAmJiB0aGlzLlphdWN0b3Zhbm9CZXpDaHliID09PSB0cnVlKSkgfHwgdGhpcy5PZGxvemVuZVVjdG92YW5pKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtIG5lYm8gcMWZZXJ1xaFlbsOtIC0gaGlzdG9yaWUgc2UgYWt0dWFsaXp1amVcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Lkl4c0h1Zikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Ykhpc3RvcmllVWN0b3ZhbmkudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2h1ZjogdGhhdC5JeHNIdWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXZfdWN0b3Zhbmk6IGNvbXBsZXRlID8gKHRoYXQuWmF1Y3RvdmFub0JlelByZWNlcnBhbmkgPyBHbG9iYWxzLkVudW1zLlN0YXZVY3RvdmFuaVBvaHlidS5aYXVjdG92YW5vIDogR2xvYmFscy5FbnVtcy5TdGF2VWN0b3ZhbmlQb2h5YnUuWmF1Y3RvdmFub1NQcmVjZXJwYW5pbSkgOiAodGhhdC5Va29uY2Vub0NoeWJvdSA/IEdsb2JhbHMuRW51bXMuU3RhdlVjdG92YW5pUG9oeWJ1LlByZXJ1c2Vub0t2dWxpQ2h5YmUgOiBHbG9iYWxzLkVudW1zLlN0YXZVY3RvdmFuaVBvaHlidS5QcmVydXNlbm9Veml2YXRlbGVtKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWtjOiB0aGF0LklrYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3VjdF9mdWM6IHRoYXQuVHlwVWN0b3ZhbmkgPz8gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWN0X3BvaDogdGhhdC5VY3RQb2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvem5hbWthOiB0aGF0LnBvem5hbWthLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrdW11bF96YV9peHA6IHRoYXQuS3VtdWxvdmF0WmFJeHAgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpel92eXJfbmtzOiB0aGF0LlZ5cm92bmF0WmFOa3MgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpel9iZXpfa29udHI6IHRoYXQuTmVrb250cm9sb3ZhdFByZWNlcnBhbmkgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgemFjaF9ydWNfemFwaXN5OiB0aGF0LlphY2hvdmF0UnVjbmlaYXBpc3kgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZV91Y2V0bmljdHZpOiB0aGF0LkVVY2V0bmljdHZpID09PSB0cnVlID8gMSA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c19mdW5fb296dV91Y3Q6IHRoYXQuaXhzRnVuT296dVVjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rlbl91Y3Q6IHRoYXQuaXhwRGVuVWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0X2NoeWJ5OiAhY29tcGxldGUgJiYgdGhhdC5Va29uY2Vub0NoeWJvdSA/IHRoYXQuVGV4dENoeWJ5IDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphdsWZZW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbXBsZXRlOiBjb21wbGV0ZSwgdWN0b3Zhbm9PZGxvemVuZTogdGhhdC5PZGxvemVuZVVjdG92YW5pIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHsgY29tcGxldGU6IGNvbXBsZXRlLCB1Y3RvdmFub09kbG96ZW5lOiB0aGF0Lk9kbG96ZW5lVWN0b3ZhbmkgfSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBtdXPDrSBzZSDFmWXFoWl0IHJvesO6xI10b3ZhbsOpIHBvaHlieVxyXG5cclxuICAgICAgICAgICAgLy8gb2JqZWt0IHBybyBwxZllZMOhdsOhbsOtIGhvZG5vdCB2IMWZZXTEm3p1IGRvdGF6xa8gYSBha2PDrVxyXG4gICAgICAgICAgICBpbnRlcmZhY2UgcmV0dXJuT2JqVHlwZSB7XHJcbiAgICAgICAgICAgICAgICBleGlzdE5lYXV0b21hdGlja2U6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICB6YWNoTmVhdXRvbWF0aWNrZTogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgIHpydXNlbmlBbm86IGJvb2xlYW5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbGV0IHJldHVybk9iajogcmV0dXJuT2JqVHlwZSA9IHtcclxuICAgICAgICAgICAgICAgIGV4aXN0TmVhdXRvbWF0aWNrZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB6YWNoTmVhdXRvbWF0aWNrZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB6cnVzZW5pQW5vOiBmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyBkZWZlcnJlZCBvYmpla3QgcHJvIHrFmWV0xJt6ZW7DrSBkb3RhesWvIGEgYWtjw61cclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHJldHVybk9iaikucHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdGVuZG8gZG90YXogc2UgbmV1a2F6dWplIHBvIGNoeWLEmyB2ZSBmw6F6aSAzLCBwcm90b8W+ZSBuZW7DrSBkb3ZvbGVubyBqw610IHpww6F0a3kgLSBwb2t1ZCBieSB0byDFoWxvLCB0YWsgYnkgdGVudG8gZG90YXogbcSbbCBiw710IHbFvmR5LiBuZWJvIG3DoSBiw710IHbFvmR5IGkgdGFrP1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHRoYXQuRmF6ZSA9PSAzICYmIHRoYXQuWmF1Y3RvdmFub0JlekNoeWIgPT09IHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybShcImpyZXM6MjQxMDAyMTBcIiwgLy9SQyAyNDEwMDIxMCA6IMOaxI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjI0MTAwMTE4XCIpIC8vUkMgMjQxMDAxMTggOiDDmsSNZXRuw60gcG9oeWJ5IG5lYnlseSBwcm/DusSNdG92w6FueS4gT3ByYXZkdSBjaGNldGUgemF2xZnDrXQgw7rEjXRvdsOhbsOtP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoR0RsZy5tYmJZZXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7rEjXRvdsOhbsOtIGJ1ZGUgdWtvbsSNZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuT2JqLnpydXNlbmlBbm8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5PYmo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7rEjXRvdsOhbsOtIG5lYnVkZSB1a29uxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDDusSNdG92w6Fuw60gYnVkZSB1a29uxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuT2JqLnpydXNlbmlBbm8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqOiByZXR1cm5PYmpUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVybk9iai56cnVzZW5pQW5vICYmICEodGhhdC5GYXplID09PSAzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6amnFoXTEm27DrSBwb2xvYXV0b21hdGlja8O9Y2ggYSBydcSNbsOtY2ggcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWIuanNvdU5lYXV0b21hdGlja2UoeyBpa2M6IHRoYXQuSWtjIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh2eXNsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuT2JqLmV4aXN0TmVhdXRvbWF0aWNrZSA9IHZ5c2w7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7rEjXRvdsOhbsOtIG5lYnVkZSB1a29uxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHDFmcOtcGFkbsO9IGRvdGF6IG5hIHVsb8W+ZW7DrSB6bcSbbiBwb2h5YsWvXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVybk9iai56cnVzZW5pQW5vICYmIHJldHVybk9iai5leGlzdE5lYXV0b21hdGlja2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKFwianJlczoyNDEwMDIxMFwiLCAvL1JDIDI0MTAwMjEwIDogw5rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MjQxMDAyMTFcIikgLy9SQyAyNDEwMDIxMSA6IE5hIG7Em2t0ZXLDvWNoIHBvaHliZWNoIGpzb3UgcnXEjW7EmyBwb8WZw616ZW7DqSB6w6FwaXN5LiBDaGNldGUgemFjaG92YXQgesOhcGlzeSB0xJtjaHRvIHBvaHlixa8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6YWNob3ZhdCB6w6FwaXN5IG5lYXV0b21hdGlja8O9Y2ggcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk9iai56YWNoTmVhdXRvbWF0aWNrZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5aYWNob3ZhdFJ1Y25pWmFwaXN5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5lemFjaG92YXQgesOhcGlzeSBuZWF1dG9tYXRpY2vDvWNoIHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5aYWNob3ZhdFJ1Y25pWmFwaXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShyZXR1cm5PYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7rEjXRvdsOhbsOtIG5lYnVkZSB1a29uxI1lbm8gbmVibyB6w6FwaXN5IG5lYXV0b21hdGlja8O9Y2ggcG9oeWLFryBuZWpzb3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuT2JqLnphY2hOZWF1dG9tYXRpY2tlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5aYWNob3ZhdFJ1Y25pWmFwaXN5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVrb27EjWVuw60gw7rEjXRvdsOhbsOtIHYgZGF0YWLDoXppXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVybk9iai56cnVzZW5pQW5vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVrb27EjWVuw60gw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnVjdG92YW5pV2l6YXJkKEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5XaXpGYXplVWN0LlpydXNlbmlCZXpaYXVjdG92YW5pLCB0aGF0LkZhemUsIHRoYXQuTmVrb250cm9sb3ZhdFByZWNlcnBhbmksIHJldHVybk9iai56YWNoTmVhdXRvbWF0aWNrZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuT2JqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShyZXR1cm5PYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7rEjXRvdsOhbsOtIG5lYnVkZSB1a29uxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybk9iajtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5PYmouenJ1c2VuaUFubykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtIG5lYm8gcMWZZXJ1xaFlbsOtIC0gaGlzdG9yaWUgc2UgYWt0dWFsaXp1amVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuSXhzSHVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWJIaXN0b3JpZVVjdG92YW5pLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2h1ZjogdGhhdC5JeHNIdWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rhdl91Y3RvdmFuaTogY29tcGxldGUgPyAodGhhdC5aYXVjdG92YW5vQmV6UHJlY2VycGFuaSA/IEdsb2JhbHMuRW51bXMuU3RhdlVjdG92YW5pUG9oeWJ1LlphdWN0b3Zhbm8gOiBHbG9iYWxzLkVudW1zLlN0YXZVY3RvdmFuaVBvaHlidS5aYXVjdG92YW5vU1ByZWNlcnBhbmltKSA6ICh0aGF0LlVrb25jZW5vQ2h5Ym91ID8gR2xvYmFscy5FbnVtcy5TdGF2VWN0b3ZhbmlQb2h5YnUuUHJlcnVzZW5vS3Z1bGlDaHliZSA6IEdsb2JhbHMuRW51bXMuU3RhdlVjdG92YW5pUG9oeWJ1LlByZXJ1c2Vub1V6aXZhdGVsZW0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogdGhhdC5Ja2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3VjdF9mdWM6IHRoYXQuVHlwVWN0b3ZhbmkgPz8gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3RfcG9oOiB0aGF0LlVjdFBvaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3puYW1rYTogdGhhdC5wb3puYW1rYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdW11bF96YV9peHA6IHRoYXQuS3VtdWxvdmF0WmFJeHAgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml6X3Z5cl9ua3M6IHRoYXQuVnlyb3ZuYXRaYU5rcyA9PT0gdHJ1ZSA/IDEgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfYmV6X2tvbnRyOiB0aGF0Lk5la29udHJvbG92YXRQcmVjZXJwYW5pID09PSB0cnVlID8gMSA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgemFjaF9ydWNfemFwaXN5OiB0aGF0LlphY2hvdmF0UnVjbmlaYXBpc3kgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlX3VjZXRuaWN0dmk6IHRoYXQuRVVjZXRuaWN0dmkgPT09IHRydWUgPyAxIDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuX29venVfdWN0OiB0aGF0Lml4c0Z1bk9venVVY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rlbl91Y3Q6IHRoYXQuaXhwRGVuVWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRfY2h5Ynk6ICFjb21wbGV0ZSAmJiB0aGF0LlVrb25jZW5vQ2h5Ym91ID8gdGhhdC5UZXh0Q2h5YnkgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6YXbFmWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbXBsZXRlOiBjb21wbGV0ZSwgdWN0b3Zhbm9PZGxvemVuZTogdGhhdC5PZGxvemVuZVVjdG92YW5pIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBjb21wbGV0ZTogY29tcGxldGUsIHVjdG92YW5vT2Rsb3plbmU6IHRoYXQuT2Rsb3plbmVVY3RvdmFuaSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtIG9rbmEgbmVuw60gbW/Fvm7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==