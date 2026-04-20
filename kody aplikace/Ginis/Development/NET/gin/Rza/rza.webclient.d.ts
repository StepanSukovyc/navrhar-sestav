declare namespace Gordic.Rza.Dialogs {
    function GRzaSeznam(parentContent: GContent, opt: {
        filtr: Pap.Interface.GPapDashboardFiltryDto | null;
        taskId: string;
        uloha: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    interface GRzaDetailDoApOptions {
        /**
         * ixs_zak
         * @type {string}
         */
        ixs_zak: string;
        /**
         * ixp
         * @type {string}
         */
        ixp: string;
        /**
         * jsemVlastnik
         * @type {string}
         */
        jsemVlastnik: boolean;
    }
    function GRzaDetailDokAP(parentContent: GContent, opt: GRzaDetailDoApOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    interface GRzaSeznamDokAPOptions {
        /**
         * ixs_zak
         * @type {string}
         */
        ixs_zak: string;
        /**
         * task_id
         * @type {string}
         */
        task_id: string;
        isStorno: boolean;
    }
    function GRzaSeznamDokAP(parentContent: GContent, opt: GRzaSeznamDokAPOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    interface IGRzaPodaniOptions {
        /**
         * boolean
         * @type {boolean}
         */
        genIxp: boolean;
        /**
         * boolean
         * @type {boolean}
         */
        novyAP: boolean;
    }
    function GRzaPodani(parentContent: GContent, options: IGRzaPodaniOptions): JQuery.PromiseBase<Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any>;
    interface GDetailScrOptions {
        /**
         * ixs_zak
         * @type {string}
         */
        ixs_zak: string | null;
        /**
         * boolean
         * @type {string}
         */
        task_id: string;
    }
    interface GDetailScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        isChanged: boolean;
    }
    function GDetailScr(parentContent: GContent, opt: GDetailScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GDetailScrRetVal | undefined>;
    function GRzaSeznamFinancovani(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GVyberStavuTabScr(parentContent: GContent, opt: null, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<Pap.Interface.GPapDashboardFiltryDto | null>;
    interface GNovyKompetentScrOptions {
        /**
         * identifikátor
         * @type {string}
         */
        ixs_zak: string | null;
        /**
         * multi
         * @type {boolean}
         */
        multi: boolean;
        /**
         * zpracovatel
         * @type {boolean}
         */
        zpracovatel: boolean;
        /**
         * detail
         * @type {boolean}
         */
        detail: boolean;
        /**
         * rza_def_vypdok
         * @type {boolean}
         */
        rza_def_vypdok: boolean;
        /**
         * identifikátor
         * @type {string}
         */
        rza_rad_preciz: string;
        /**
         * identifikátor
         * @type {boolean}
         */
        rza_def_autodp: boolean;
    }
    interface GNovyKompetentScrRetVal {
        /**
         * ixs_fun_pole
         * @type {string}
         */
        ixs_fun_pole: string[] | null;
        /**
         * nazev
         * @type {string}
         */
        nazev: string[] | null;
        /**
         * dokumentyPripadu
         * @type {boolean}
         */
        dokumentyPripadu: boolean;
    }
    function GRzaNovyKompetentScr(parentContent: GContent, opt: GNovyKompetentScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNovyKompetentScrRetVal>;
    interface GVyberDZRScrOptions {
        /**
         * identifikátor
         * @type {number}
         */
        c_predp: Decimal;
        /**
         * identifikátor
         * @type {number}
         */
        pre_urc: number;
        /**
         * identifikátor
         * @type {number}
         */
        lim_zak: number;
        /**
         * identifikátor
         * @type {number}
         */
        vri_pri: number;
    }
    interface GVyberDZRScrRetVal {
        /**
         * identifikátor
         * @type {number}
         */
        dri_pri: number | null;
    }
    function GRzaVyberDZRScr(parentContent: GContent, opt: GVyberDZRScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GVyberDZRScrRetVal>;
    interface GDetailDokScrOptions {
        /**
         * ixp
         * @type {string}
         */
        ixp: string;
        /**
         * ixs_zak
         * @type {string}
         */
        ixs_zak: string;
    }
    interface GDetailDokScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        isChanged: boolean;
    }
    function GDetailDokScr(parentContent: GContent, opt: GDetailDokScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GDetailDokScrRetVal | undefined>;
    interface GRzaNapojVZnaNENOptions {
        /**
         * ixs_zak
         * @type {string}
         */
        ixs_zak: string;
        /**
         * task_id
         * @type {string}
         */
        task_id: string;
    }
    function GRzaNapojVZnaNEN(parentContent: GContent, opt: GRzaNapojVZnaNENOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
}
declare namespace Gordic.Rza.AppSettings {
    /**
     * Definice formulářů pro uživatelské nastavení
     *
     * @returns {Forms.Form[]} formuláře
     */
    function ListsSettingsForm(gin_gen_ixp: string): Forms.Form[];
}
declare namespace Gordic.Rza {
    class MainApp extends GContentBase {
        limitDashBoard1: Decimal;
        limitDashBoard3: Decimal;
        limitDashBoard4: Decimal;
        allData: boolean;
        pocetKnih: number;
        paramSulPri: string;
        rok: number;
        hlaska?: string;
        onContentReady(): void;
        /**
         * Otevření kartotéky externích subjektů
         */
        kartotekaEsu(): JQuery.Promise<any>;
        dotaz(otazka: string): JQueryPromise<any>;
        vypadek(typ: string): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        nactiDetail(ixs_zak: string, ixp_den: string): void;
        nactiSeznamBezFin(id: number): void;
        nactiSeznam(id: number, kniha: string): void;
        Kontrolapristupu(): boolean;
    }
}
declare namespace Gordic.Rza.WebClient.RzaPrefabsAll {
    function GridColumnDokumentyNen(): Data.GridFormat<Pap.Interface.GRzaseszDto>;
    function GridColumnSubjekt(historie: boolean): Data.GridFormat<Interface.GRzasesuDto>;
    function GridColumnsPripad(historie: boolean): Data.GridFormat<any>;
    interface RzaHOCommonOptions {
        parentContent: GContent;
        data: Rza.Interface.GRzaspidDto[] | JQueryPromise<Rza.Interface.GRzaspidDto[]>;
        zrusit: boolean;
        completeDelegate: (view: any) => void;
        allDok: boolean;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    interface RzaHromadneOperaceOptions {
        parentContent: GContent;
        data: Rza.Interface.GRzaspidDto[] | JQueryPromise<Rza.Interface.GRzaspidDto[]>;
        title: string;
        akce: string;
        description: string;
        nazevAkce: string;
        completeDelegate: (view: any) => void;
        allDok: boolean | null;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    function Schvalit(options: RzaHOCommonOptions): void;
    function Storno(options: RzaHOCommonOptions): void;
    function RzaHromadneOperace(options: RzaHromadneOperaceOptions): void;
    function VratFormat(): Data.GridFormat<any>;
}
declare namespace Gordic.Rza.WebClient {
    type DataDtoDet = Gordic.Pap.Interface.GRzaspriDto;
    type UsedComponentsDet = Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DataDtoDet>;
    class GRzaDetail extends GDetailBuilderContent<UsedComponentsDet> {
        genIxp: boolean;
        isChanged: boolean;
        finChanged: boolean;
        data: Rza.Interface.GParamDetailDto;
        aktualizuji: boolean;
        isTskParam: boolean;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        lzePredat: boolean;
        lzePridelit: boolean;
        lzePrevzit: boolean;
        ixsFun: string;
        uzavritBezpodminecne: boolean;
        rza_rad_expakt: string;
        rza_def_kkpiha: string;
        rza_def_kkpivp: string;
        rza_def_kkpibl: string;
        rza_def_kkpisp: string;
        rza_rad_expnen: boolean;
        rza_rad_poupro: number;
        rza_def_sefazc: boolean;
        rza_def_sekapr: boolean;
        rza_def_seleus: boolean;
        rza_def_setypr: boolean;
        rza_def_sezpre: boolean;
        rza_def_vzmrko: boolean;
        rza_def_vypdok: boolean;
        rza_def_vypkpn: boolean;
        rza_def_vypakn: boolean;
        rza_def_vypzdn: boolean;
        rza_rad_revipr: boolean;
        rza_def_vypfin: boolean;
        rza_def_snfazc: number;
        rza_def_seobvz: boolean;
        rza_def_snobvz: number;
        rza_def_snkapr: number;
        rza_def_snleus: number;
        rza_def_sntypr: number;
        rza_def_snzpre: number;
        rza_rez_provoz: string;
        rza_def_tyzzvz: string;
        rza_def_dzrwsn: string;
        rza_rad_reprso: string;
        rza_def_idcakc: string;
        rza_def_vypdaz: string;
        rza_def_vypzai: string;
        rza_rad_zaaknv: string;
        rza_rad_zruvyh: string;
        rza_rad_priprv: string;
        rza_rad_preciz: string;
        rza_rad_napnen: boolean;
        rza_def_castag: string;
        rza_def_castex: string;
        rza_def_autodp: boolean;
        c_predp: Decimal;
        pre_urc: number;
        lim_zak: number;
        vri_pri: number;
        rza_rad_aktnen: string;
        lze_Financovani: boolean;
        private isContentOpened;
        eko_par_papspzn_pole: string[];
        rezimProvozu: number;
        protected filter_akce: Gordic.Rza.Interface.GRzaKompetentiFilterDto;
        tabDiteVisible: boolean;
        /**
         * badge na pocet kompetentu
         * @type {GObservableObject<>}
         */
        private badge_komp;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        generovatCast(naPozadi: boolean): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        aktualizuj(): void;
        zamek(zamknout: boolean): void;
        akceUkonceni(): void;
        akceZrusitUkonceni(): void;
        storno(storno: boolean): void;
        napoj(): void;
        dokumenty(): void;
        nastavLegUsmHeader(disabled: boolean, priSpusteni: boolean): void;
        schvalProces(): void;
        akceNavrhy(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        akceSchvaleniZrusit(): void;
        akceSchvaleni(): void;
        akcePrevzeti(): void;
        akcePridelitZpracovatele(): void;
        akceOtevritSpis(): void;
        akcePriraditKeSpisu(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        akceProfilFinancovani(): void;
        nastavMenu(): void;
        nastavExportNEN(disabled: boolean, canVolba: boolean): void;
        nastavExportDoplNEN(disabled: boolean, canVolba: boolean): void;
        vratCanVolba(): boolean;
        nactiDetailMza(): void;
        historiePKS(): void;
        historie(): void;
        subjekty(): void;
        akceFinancovani(): void;
        akceExportSoubNEN(): void;
        akceExportDoplNEN(): void;
        akceExportZverejneniNEN(): void;
        akceExportNEN(): void;
        closing(): JQuery.Promise<any, any, any>;
        nactiData(): void;
        zahajeni(): void;
        ukonceniZahajeni(): void;
        saveData(odkud: string, nactiDetail?: boolean): JQuery.Promise<any, any, any>;
        vratPole(key: any): any;
        zobrazHlasku(hlas: string): void;
        getData(odkud: string): 0 | 1;
    }
}
declare namespace Gordic.Rza.WebClient.PrefabsRza {
    interface ZpusRealizace {
        readOnly: boolean;
        content: GContent;
        rza_def_sefazc: boolean;
        rza_def_sekapr: boolean;
        rza_def_setypr: boolean;
        rza_def_sezpre: boolean;
        rza_def_dzrwsn: string;
        cast: boolean;
        predZahajenim: boolean;
        readOnlyBezZR: boolean;
    }
    interface TermPlan {
        readOnly: boolean;
        content: GContent;
        parRzasleg: Pap.Interface.GRzaslegDto;
        cast: boolean;
        readOnlyBezZRTP: boolean;
    }
    interface Obecne {
        readOnly: boolean;
        content: GContent;
        cast: boolean;
    }
    interface ObecneSchv {
        readOnly: boolean;
        content: GContent;
        cast: boolean;
        s_zak: number;
    }
    interface ZaklIdent {
        readOnly: boolean;
        content: GContent;
        zpu_rea: number;
        limZakDis: boolean;
        legUsmDis: boolean;
        parDzrwsn: string;
        rza_def_idcakc: string;
        cast: boolean;
        predZahajenim: boolean;
        vriPriEnabled: boolean;
        rza_def_seobvz: boolean;
        rza_def_vypzdn: boolean;
        rza_def_castag: string;
    }
    function nastavLimZak(content: GContent, readOnly: boolean, cast: boolean): void;
    function vytvorZUZIdentifikaceFormular(options: ZaklIdent): Forms.Form;
    function nastavTermPlan(parametry: Pap.Interface.GRzaslegDto, content: GContent, readOnly: boolean, cast: boolean): void;
    function vytvorZUZpusRealizaceFormular(options: ZpusRealizace): Forms.Form;
    function KontrolaFinOdDo(fin_od: number | null, fin_do: number | null, that: GContent): void;
    function getRokMes(that: GContent): string;
    interface ZadRizeni {
        readOnly: boolean;
        content: GContent;
        rokMes_od: string | null | undefined;
        rza_def_seleus: boolean;
        s_zak: number;
        rza_def_idcakc: string;
        cast: boolean;
        predZahajenim: boolean;
        readOnlyBezZR: boolean;
    }
    function vytvorZUZadRizeniFormular(options: ZadRizeni): Forms.Form;
    function vytvorZUTermPlanFormular(options: TermPlan): Forms.Form;
    interface RIPru {
        readOnly: boolean;
        content: GContent;
        rza_def_vzmrko: boolean;
        cast: boolean;
        readOnlyBezZR: boolean;
    }
    function vytvorRIPruRizeniFormular(option: RIPru): Forms.Form;
    function vytvorRIOstUdajeFormular(option: Obecne): Forms.Form;
    function vytvorRISchvDokumFormular(option: ObecneSchv): Forms.Form;
    interface IGPrizCast {
        prizCast: string;
        /**
         * komentar
         * @type {number}
         */
        v: number;
    }
    function NaplnAnoNe(): JQueryPromise<IGPrizCast[]>;
    interface IdentPripadu {
        readOnly: boolean;
        content: GContent;
        formatNenLomitko: () => boolean;
        vzNenDisabled: boolean;
    }
    function getText(priz_cast: boolean, s_formatem: boolean): string;
    function vytvorIPFormular(option: IdentPripadu): Forms.Form;
}
declare namespace Gordic.Rza.WebClient {
    type DataDtoDetAP = Gordic.Rza.Interface.GRzaspidDto;
    type UsedComponentsDetAP = Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DataDtoDetAP>;
    class GRzaDetailDokAP extends GDetailBuilderContent<UsedComponentsDetAP> {
        ixp: string;
        isChanged: boolean;
        esuNase: boolean;
        isStorno: boolean;
        rza_rad_poupro: number;
        data: Rza.Interface.GRzaspidDto;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void;
        vytvorZakladniUdajeFormular(): Forms.Form;
        nastavMenu(): void;
        saveData(): void;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        onDetailBuilderBuild(builder: any): void;
        dotazOkno(otazka: string): JQueryPromise<any>;
        nactiDetail(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GRzaDokumentyNenScr extends GContentBase {
        view: Gordic.Data.View<Gordic.Pap.Interface.GRzaseszDto>;
        ixs_zak: string;
        vz_cislo_inen: string;
        isReadOnly: boolean;
        rza_rad_reprso: string;
        rza_rad_poupro: string;
        isChanged: boolean;
        isChangedAkt: boolean;
        form: JQuery;
        tab: JQuery;
        gridSeznam: JQuery;
        private menubarparametry;
        document: GDocument;
        private previewController;
        private isContentOpened;
        onContentReady(): void;
        private registerPreview;
        klasifikace(): void;
        vratData(): Interface.GRzaHrOpStruDto[];
        dotaz(otazka: string): JQueryPromise<any>;
        exportuj(): void;
        soubor(): JQuery.Promise<any, any, any> | null;
        dokument(): void;
        nastavEnableTlacitek(): void;
        obnovSeznam(): void;
        ulozSeznam(): JQueryPromise<boolean>;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GRzaSeznamDokAPScr extends GContentBase {
        ixs_zak: string;
        task_id: string;
        titulek: string;
        refreshData: boolean;
        isStorno: boolean;
        canVolba: boolean;
        ixs_fun: string;
        private grid;
        private previewController;
        private view;
        filter: JQuery;
        private filters;
        isChanged: boolean;
        techVlastnosti: GGridColumn<any>;
        rza_rad_poupro: number;
        rza_rad_zaaknv: string;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        private menubarparametry;
        onContentReady(): void;
        akceSchvalit(storno: boolean): void;
        akceStorno(storno: boolean): void;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        nastavTlacitka(): void;
        columns(): Data.GridFormat<any>;
        obnovSeznam(): void;
        akcePodani(ele: boolean): void;
        akceDetail(ixp: string): void;
        getOpenDetailDelegateRza(): (cnt: any, grid: any, row: any) => void;
        private registerPreview;
        closing(): JQuery.Promise<any, any, any>;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GRzaHistorie extends GContentBase<Gordic.Gin.WebClient.GHistorie> {
        private filter_akce;
        onContentReady(): void;
        createSpecificGridFormat(): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GRzaHistoriePKSScr extends GContentBase {
        view: Gordic.Data.View<Gordic.Pap.Interface.GRzaspriDto>;
        ixs_zak: string;
        form: JQuery;
        tab: JQuery;
        gridSeznam: JQuery;
        private menubarparametry;
        onContentReady(): void;
        nastavTlacitka(): void;
        columns(): Data.GridFormat<any>;
        akceOtevritSpis(): void;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GRzaKompetentiScr extends GContentBase {
        ixs_zak: string;
        private datakompetenti;
        private filter_akce;
        private Komp_DataView;
        private rza_def_vypdok;
        private rza_def_autodp;
        private rza_rad_poupro;
        private rza_rad_preciz;
        prepareContent(): void;
        akceNovyKompetent(): void;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GRzaNovyKompetentScr extends GContentBase implements IGClientContent {
        ixs_zak: string;
        multi: boolean;
        detail: boolean;
        zpracovatel: boolean;
        rza_def_vypdok: boolean;
        rza_rad_preciz: string;
        rza_def_autodp: boolean;
        grid: JQuery;
        formRoz: JQuery;
        view: Gordic.Data.View;
        private filter;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GRzaNapojVZnaNENScr extends GContentBase {
        private grid;
        private view;
        isChanged: boolean;
        ixs_zak: string;
        onContentReady(): void;
        napoj(): void;
        closing(): JQuery.Promise<any, any, any>;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        nastavTlacitka(): void;
        columns(): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Rza.DetailBuilderComponents {
    /** Komponenta detail builderu Rza přílohy */
    class RzaPrilohy {
        /**
         * Vytvoření builderu s RZA přílohami
         *
         * @param {Wfl.WebClient.GIxsPrilohyComponentDto} componentDto
         * @param {Wfl.DetailBuilderComponents.GIxsPrilohyOptions} [opts]
         */
        static create(componentDto: Wfl.WebClient.GIxsPrilohyComponentDto, opts?: Wfl.DetailBuilderComponents.GIxsPrilohyOptions): Gin.DetailBuilder.GDetailBuilderComponent<Gin.DetailBuilder.GDetailBuilderContent>;
    }
    /**
     * DAO
     *
     */
}
declare namespace Gordic.Rza.WebClient {
    class GRzaSchvalProcesScr extends GContentBase {
        ixs_zak: string;
        rok: number;
        typAg: number;
        tab: JQuery;
        private menubarparametry;
        private mohu_editovat;
        private akt_ixp;
        private akt_spis;
        private akt_ixs_tip;
        private akt_zdroj_dok;
        private SPForm;
        private SP_Formular;
        onContentReady(): void;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GRzaSubjektyScr extends GContentBase {
        view: Gordic.Data.View<Gordic.Rza.Interface.GRzasesuDto>;
        ixs_zak: string;
        isReadOnly: boolean;
        vlastnik: boolean;
        zpuRea: number;
        isChanged: boolean;
        danProc: number;
        form: JQuery;
        tab: JQuery;
        gridSeznam: JQuery;
        private menubarparametry;
        rza_rad_poupro: number;
        onContentReady(): void;
        historieDod(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        storno(): void;
        nastavEnableTlacitek(): void;
        novySubj(): void;
        detailSubj(): void;
        historie(): void;
        nactiDetail(zaznam: Rza.Interface.GRzasesuDto, isReadOnly: boolean, isNovy: boolean): void;
        obnovSeznam(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GRzaDetailSubjScr extends GContentBase {
        private srvCnt;
        data: Rza.Interface.GRzasesuDto;
        isReadOnly: boolean;
        vlastnik: boolean;
        zpuRea: number;
        isNovy: boolean;
        danProc: number;
        change: boolean;
        form: JQuery;
        rza_def_idcakc: string;
        rza_rad_poupro: number;
        onContentReady(): void;
        ok(): 0 | undefined;
        historie(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GRzaHistorieSubjScr extends GContentBase {
        view: Gordic.Data.View<Gordic.Rza.Interface.GRzasesuDto>;
        ixs_zak: string;
        por_cis_nab: number;
        form: JQuery;
        tab: JQuery;
        gridSeznam: JQuery;
        private menubarparametry;
        onContentReady(): void;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GRzaVyberDZRScr extends GContentBase {
        grid: JQuery;
        tab: JQuery;
        c_predp: Decimal;
        pre_urc: number;
        lim_zak: number;
        vri_pri: number;
        private view;
        prepareContent(params: any): void;
        nastavTlacitka(): void;
        ok(): void;
    }
}
declare namespace Gordic.Rza.WebClient {
    type TApplyDelegate = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamDokFiltersOptions(tema: string, Ico: string, odkud: string, cfuGf: Gordic.Data.GridFormat, hardFilter: Interface.GRzaFiltrDto | null, applyDelegate: TApplyDelegate): IGFilterPanelOptions;
}
declare namespace Gordic.Rza.WebClient {
    class GRzaSeznamScr extends GContentBase {
        agenda: string;
        ap: Gordic.Pap.Interface.GPapSeznamAccessDto;
        private preevidenceData;
        private dataMatka;
        Ico: string;
        realizator: string;
        genIxp: boolean;
        rezimKnihyRok: boolean;
        private grid;
        private previewController;
        private view;
        filterDashBoard: Interface.GRzaFiltrDto;
        refreshData: boolean;
        filter: JQuery;
        private filters;
        private paramNabedo;
        paramGvycza: number;
        rza_rez_provoz: string;
        rza_rad_poupro: string;
        rza_rad_preciz: string;
        rza_def_vypdok: boolean;
        rza_def_autodp: boolean;
        uloha: string;
        private isChanged;
        private menubarparametry;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        private isContentOpened;
        private isPodrizZak;
        rza_rad_aktnen: string;
        rza_def_castex: string;
        visibleNovy: boolean;
        onContentReady(): void;
        generovatCast(): void;
        aktualizuj(): void;
        preevidence(): void;
        vratDataPre(): Pap.Interface.GPapStruDto[];
        akcePridelitZpracovatele(): void;
        vratData(zpracovatel: string, nazevZpracovatel: string, dokumentyPripadu: boolean): Interface.GRzaHrOpStruDto[];
        nastavEnableTlacitek(): void;
        nactiDetail(): void;
        nastavTlacitka(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        novyAP(): void;
        private registerPreview;
        ukony(): void;
        getOpenDetailDelegate(): (cnt: any, grid: any, row: any) => void;
        podani(ele: boolean): void;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        obnovSeznam(): void;
    }
}
declare namespace Gordic.Rza.WebClient.RzaHromadneOperace {
    interface RzaHromadneOperaceOptions {
        parentContent: GContent;
        agenda: string;
        data: Rza.Interface.GRzaHrOpStruDto[] | JQueryPromise<Rza.Interface.GRzaHrOpStruDto[]>;
        title: string;
        akce: string;
        description: string;
        nazevAkce: string;
        completeDelegate: (view: any) => void;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    function RzaHromadneOperace(options: RzaHromadneOperaceOptions): void;
    function VratFormat(akce: string): Data.GridFormat<any>;
}
declare namespace Gordic.Rza.WebClient {
    class GRzaHistoriePripaduScr extends GContentBase {
        view: Gordic.Data.View<Gordic.Pap.Interface.GRzaspriDto>;
        ixs_zak: string;
        form: JQuery;
        tab: JQuery;
        gridSeznam: JQuery;
        private menubarparametry;
        onContentReady(): void;
    }
}
declare namespace Gordic.Rza.WebClient {
    class GVyberStavuTabScr extends GContentBase {
        taskId: string;
        tab: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(ok: any): JQuery.Promise<any, any, any>;
    }
}
