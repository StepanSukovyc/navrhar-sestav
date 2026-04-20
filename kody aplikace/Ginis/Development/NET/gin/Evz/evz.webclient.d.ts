declare namespace Gordic.Evz.WebClient.EvzPrefabsAll {
    function vytvorPrehledFormular(nabedo: boolean, novy: boolean, priVisible: boolean, readOnly: any): Forms.Form;
    interface EvzHromadneOperaceOptions {
        parentContent: GContent;
        data: Evz.Interface.EvzspidDto[] | JQueryPromise<Evz.Interface.EvzspidDto[]>;
        title: string;
        akce: string;
        description: string;
        nazevAkce: string;
        completeDelegate: (view: any) => void;
        allDok: boolean | null;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    function EvzHromadneOperace(options: EvzHromadneOperaceOptions): void;
    function VratFormat(exportDoRza: any): Data.GridFormat<any>;
    interface EvzHOCommonOptions {
        parentContent: GContent;
        data: Evz.Interface.EvzspidDto[] | JQueryPromise<Evz.Interface.EvzspidDto[]>;
        zrusit: boolean;
        completeDelegate: (view: any) => void;
        allDok: boolean;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    function ExportDoRza(options: EvzHOCommonOptions): void;
    function SchvalitPis(options: EvzHOCommonOptions): void;
    function StornoPis(options: EvzHOCommonOptions): void;
    function UkonceniPis(options: EvzHOCommonOptions): void;
    function PreevidenceSubj(options: EvzHOCommonOptions): void;
    interface EvzHOSpravaOptions {
        parentContent: GContent;
        data: Evz.Interface.GUchazeciDto[] | JQueryPromise<Evz.Interface.GUchazeciDto[]>;
        nabedo: number;
        paramNabedo: boolean;
        completeDelegate: (view: any) => void;
    }
    interface EvzHromadneOperaceEsuOptions {
        parentContent: GContent;
        data: Evz.Interface.GUchazeciDto[] | JQueryPromise<Evz.Interface.GUchazeciDto[]>;
        title: string;
        akce: string;
        description: string;
        nabedo: number;
        paramNabedo: boolean;
        completeDelegate: (view: any) => void;
    }
    function SpravaStavu(options: EvzHOSpravaOptions): void;
    function EvzHromadneOperaceEsu(options: EvzHromadneOperaceEsuOptions): void;
    function VratFormatEsu(paramNabedo: boolean): Data.GridFormat<any>;
}
declare namespace Gordic.Evz.Dialogs {
    function GEvzSeznam(parentContent: GContent, opt: {
        filtr: Pap.Interface.GPapDashboardFiltryDto | null;
        /**
         * taskId
         * @type {string}
         */
        taskId: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GEvzSeznamAllDok(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GEvzSeznamAllElDok(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GEvzSeznamDokVZ(parentContent: GContent, opt: {
        ixs_pri: string;
        doplnit: boolean;
        ac_ver_zak: string;
        soutez: string;
        task_id: string;
        ixp_den: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        isChanged: boolean;
    } | undefined>;
    interface GUchazeciOptions {
        /**
         * typ
         * @type {string}
         */
        typ: string;
        /**
         * taskId
         * @type {string}
         */
        taskId: string;
    }
    function GEvzSeznamUchazeci(parentContent: GContent, opt: GUchazeciOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GEvzDetailVZ(parentContent: GContent, opt: {
        data: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        isChanged: boolean;
    } | undefined>;
    function GEvzSoutezeVZ(parentContent: GContent, opt: {
        ixs_pri: string;
        ac: string;
        nazev: string;
        priz_nabedo: number;
        soutez: string;
        s_vz: number;
        cis_por: number;
        ixs_fun_akt: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    interface GKategorieScrOptions {
        /**
         * ixs_pri
         * @type string
         */
        ixs_pri: string;
        /**
         * ixp
         * @type {string}
         */
        ixp: string;
        /**
         * readOnly
         * @type {boolean}
         */
        readOnly: boolean;
        /**
        * dat_pri
        * @type {date}
        */
        dat_pri: JsonDate;
        /**
         * zobrazit_vse
         * @type {boolean}
         */
        zobrazit_vse: boolean;
    }
    interface GKategorieScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GKategorieScr(parentContent: GContent, opt: GKategorieScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GKategorieScrRetVal | undefined>;
    interface GKategorieSezScrOptions {
        /**
         * readOnly
         * @type {boolean}
         */
        readOnly: boolean;
        /**
         * readOnly
         * @type {boolean}
         */
        jeVprc: boolean;
        /**
        * dat_pri
        * @type {date}
        */
        dat_pri: JsonDate;
    }
    interface GKategorieSezScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GKategorieSeznamScr(parentContent: GContent, opt: GKategorieSezScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GKategorieSezScrRetVal | undefined>;
    interface GAddUpdKategorieScrOptions {
        /**
         * readOnly
         * @type {boolean}
         */
        zaznam: Pap.Interface.GEvzskdnDto | null;
        /**
        * dat_pri
        * @type {date}
        */
        dat_pri: JsonDate;
    }
    interface GAddUpdKategorieScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GAddUpdKategorieSeznamScr(parentContent: GContent, opt: GAddUpdKategorieScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GAddUpdKategorieScrRetVal | undefined>;
    interface GNovaKategorieScrOptions {
        /**
         * zaznam
         * @type {Evz.Interface.GEvzvkdnDto | null}
         */
        zaznam: Evz.Interface.GEvzvkdnDto;
    }
    interface GNovaKategorieScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GNovaKategorieScr(parentContent: GContent, opt: GNovaKategorieScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNovaKategorieScrRetVal | undefined>;
    interface GCastiVZScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
        /**
         * c_plan
         * @type {Decimal}
         */
        c_plan: Decimal;
    }
    interface GCastiVZScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GCastiVzScr(parentContent: GContent, opt: GCastiVZScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GCastiVZScrRetVal | undefined>;
    interface GNovaCastVZScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
        /**
         * lim_zac
         * @type {number}
         */
        lim_zac: number;
        /**
         * cis_real
         * @type {string}
         */
        cis_real: string;
    }
    interface GNovaCastVZScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GNovaCastVzScr(parentContent: GContent, opt: GNovaCastVZScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNovaCastVZScrRetVal | undefined>;
    interface GDoporuceniScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
    }
    interface GDoporuceniScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GDoporuceniScr(parentContent: GContent, opt: GDoporuceniScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GDoporuceniScrRetVal | undefined>;
    interface GDetailScrOptions {
        /**
         * ixp
         * @type {string}
         */
        ixp: string | null;
        /**
         * ktg_typ
         * @type {number}
         */
        ktg_typ: number | null;
        /**
         * ele
         * @type {boolean}
         */
        ele: boolean;
        /**
         * ixs_krk
         * @type {string | null}
         */
        ixs_krk: string | null;
        /**
         * modOkna
         * @type {string}
         */
        modOkna: string;
        /**
         * string
         * @type {string}
         */
        ixs_pri: string | null;
        /**
        * allDok
        * @type {boolean}
        */
        allDok: boolean;
        /**
         * string
         * @type {string}
         */
        ac_ag: string | null;
        /**
         * string
         * @type {string}
         */
        soutez: string | null;
        /**
         * string
         * @type {string}
         */
        ixs_esu: string | null;
        /**
         * number
         * @type {number}
         */
        por_cis_nab: number;
        /**
         * boolean
         * @type {boolean}
         */
        novaVZ: boolean;
    }
    interface GDetailScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        isChanged: boolean;
    }
    function GDetailScr(parentContent: GContent, opt: GDetailScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GDetailScrRetVal | undefined>;
    interface GKomiseScrOptions {
        /**
         * ixs_pri
         * @type string
         */
        ixs_pri: string;
        /**
         * ixp
         * @type {string}
         */
        ixp: string;
        /**
         * readOnly
         * @type {boolean}
         */
        readOnly: boolean;
        /**
         * ktg_typ
         * @type {number}
         */
        ktg_typ: number;
    }
    interface GKomiseScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GKomiseScr(parentContent: GContent, opt: GKomiseScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GKomiseScrRetVal | undefined>;
    interface GKomiseSezScrOptions {
        /**
         * readOnly
         * @type {boolean}
         */
        readOnly: boolean;
        /**
         * readOnly
         * @type {boolean}
         */
        jeVprc: boolean;
    }
    interface GKomiseSezScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GClenoveKomiseSeznamScr(parentContent: GContent, opt: GKomiseSezScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GKomiseSezScrRetVal | undefined>;
    interface GAddUpdKomiseScrOptions {
        /**
         * readOnly
         * @type {boolean}
         */
        zaznam: Pap.Interface.GEvzsokoDto | null;
    }
    interface GAddUpdKomiseScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GAddUpdClenoveKomiseSeznamScr(parentContent: GContent, opt: GAddUpdKomiseScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GAddUpdKomiseScrRetVal | undefined>;
    interface GNovaKomiseScrOptions {
        /**
         * zaznam
         * @type {Evz.Interface.GEvzvkdnDto | null}
         */
        zaznam: Evz.Interface.GEvzvoksDto;
        /**
         * ktg_typ
         * @type {number}
         */
        ktg_typ: number;
    }
    interface GNovaKomiseScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GNovaKomiseScr(parentContent: GContent, opt: GNovaKomiseScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNovaKomiseScrRetVal | undefined>;
    interface GVyberEvzScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
    }
    interface GVyberEsuScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        list: Evz.Interface.GSelEsuDto[] | null;
    }
    function GVyberEsuScr(parentContent: GContent, opt: GVyberEvzScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GVyberEsuScrRetVal | undefined>;
    interface IGEvzPodaniOptions extends GDetailScrOptions {
        genIxp: boolean;
    }
    function GEvzPodani(parentContent: GContent, options: IGEvzPodaniOptions): JQuery.PromiseBase<Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any>;
    function GEvzSeznamFinancovani(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GEvzNovyPU(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GEvzSeznamDokEsu(parentContent: GContent, opt: {
        ixs_esu: string;
        ixs_pri: string | null;
        vlastnik: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    interface GKategorieSezKomPlnOptions {
        /**
         * readOnly
         * @type {boolean}
         */
        readOnly: boolean;
        /**
        * ixs_pri
        * @type {string}
        */
        ixs_pri: string;
        /**
         * komoditaPkr
         * @type {boolean}
         */
        komoditaPkr: boolean;
    }
    interface GSezKomPlnScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GKomPlnSeznamScr(parentContent: GContent, opt: GKategorieSezKomPlnOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GSezKomPlnScrRetVal | undefined>;
    interface GAddUpdKomPlnScrOptions {
        /**
         * zaznam
         * @type {GEvzvkprDto}
         */
        zaznam: Evz.Interface.GEvzvkprDto;
        /**
         * komoditaPkr
         * @type {boolean}
         */
        komoditaPkr: boolean;
    }
    interface GAddUpdKomPlnScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GNewUpdKomPlnScr(parentContent: GContent, opt: GAddUpdKomPlnScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GAddUpdKomPlnScrRetVal | undefined>;
    interface GSeznamNabedoScrOptions {
        /**
         * string
         * @type {string}
         */
        ixs_esu: string | null;
    }
    function GEvzSeznamNabedo(parentContent: GContent, opt: GSeznamNabedoScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GDetailScrRetVal | undefined>;
    interface GAddUpdNabedoScrOptions {
        /**
         * string
         * @type {string}
         */
        zaznam: Evz.Interface.GEvzsesuDto | null;
        /**
         * boolean
         * @type {boolean}
         */
        novyZaznam: boolean;
        /**
         * boolean
         * @type {boolean}
         */
        readOnly: boolean;
    }
    function GAddUpdNabedoScr(parentContent: GContent, opt: GAddUpdNabedoScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GDetailScrRetVal | undefined>;
    interface GEvzDotazPodaniParamScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string | null;
        /**
         * ixp
         * @type {string}
         */
        ixp: string | null;
        /**
         * ac_ag
         * @type {string}
         */
        ac_ag: string | null;
        /**
         * agenda
         * @type {string}
         */
        agenda: string;
        /**
         * soutez
         * @type {string}
         */
        soutez: string | null;
        /**
         * ixs_esu
         * @type {string}
         */
        ixs_esu: string | null;
        /**
         * nabedo
         * @type {boolean}
         */
        nabedo: boolean;
    }
    interface GEvzDotazPodaniParamScrRetVal {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string | null;
        /**
         * soutez
         * @type {string}
         */
        soutez: string | null;
        /**
         * ac_ag
         * @type {string}
         */
        ac_ag: string | null;
        /**
         * nazev
         * @type {string}
         */
        nazev: string | null;
    }
    function GEvzDotazPodaniNabedo(parentContent: GContent, opt: GEvzDotazPodaniParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GEvzDotazPodaniParamScrRetVal | undefined>;
    interface GPlneniScrOptions {
        /**
         * string
         * @type {string}
         */
        zaznam: Evz.Interface.GEvzvdofDto;
        /**
         * boolean
         * @type {boolean}
         */
        readOnly: boolean;
    }
    function GEvzPlneniScr(parentContent: GContent, opt: GPlneniScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GDetailScrRetVal | undefined>;
    function GVyberStavuTabScr(parentContent: GContent, opt: null, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<Pap.Interface.GPapDashboardFiltryDto | null>;
    interface GMigraceOptions {
        /**
         * taskId
         * @type {string}
         */
        taskId: string;
    }
    function GEvzMigrace(parentContent: GContent, opt: GMigraceOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
}
declare namespace Gordic.Evz.WebClient {
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
        nactiSeznam(id: number, kniha: string, l_parametry: Pap.Interface.GDashBoardParamsDto): void;
        /**
         * Otevření kartotéky externích subjektů
         */
        kartotekaEsu(): JQuery.Promise<any>;
        Kontrolapristupu(paramSulPri: string): boolean;
        nactiDetail(ixs_pri: string, paramSulPri: string): JQuery.PromiseBase<void, any, any, void, any, any, void, any, any, void, any, any> | null;
        nactiSeznamBezFin(id: number, paramSulPri: string): void;
        evidenceDelegate(obj: {
            pids: string[];
            typAg: number;
            genIxp: string;
        }): JQuery.PromiseBase<any, any, never, never, never, never, never, never, never, never, never, never>;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GEvzDashboard extends GContentBase {
        private data;
        private kpiSoucty;
        private gdb_panel;
        private rok;
        private limitDashBoard1;
        private limitDashBoard4;
        private limitDashBoard3;
        private paramSulPri;
        private allData;
        onContentReady(): void;
        nactiDetail(ixs_pri: string): void;
        nactiSeznamBezFin(id: number): void;
        nactiSeznam(id: number, kniha: string): void;
        Kontrolapristupu(): boolean;
    }
}
declare namespace Gordic.Evz.WebClient {
    interface IGPrizCast {
        prizCast?: string;
        v: number;
    }
    type DataDto = Gordic.Evz.Interface.EvzspriDto;
    type UsedComponents = Gordic.Wfl.WebClient.GWflFKSeznamExtension & Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DataDto>;
    class GEvzDetailVZScr extends GDetailBuilderContent<UsedComponents> {
        detailDto: Gordic.Evz.Interface.EvzspriDto;
        ac: Gordic.Pap.Interface.GPapDetailAccessDto;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        kpiData: Decimal[];
        isChanged: boolean;
        finChanged: boolean;
        komoditaPkr: boolean;
        genIxp: boolean;
        podaniEnabled: boolean;
        isTskParam: boolean;
        lzePredat: boolean;
        lzePridelit: boolean;
        lzePrevzit: boolean;
        paramPricpr: string;
        AktSubrady: number;
        nabedoParam: string;
        ivzrmvParam: boolean;
        private evz_rad_poupro;
        private readOnly;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        akceUkony(): void;
        akceProfilFinancovani(): void;
        akceFinancovani(): void;
        akceSouteze(): void;
        akceSchvaleni(): void;
        akceSchvaleniZrusit(): void;
        NastavTlacitka(): void;
        NastavTlacitkaPoZmeneAc(): void;
        akceUkonceni(): void;
        akceUkonceniZrusit(): void;
        NactiData(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        dotaz(otazka: string): JQueryPromise<any>;
        akceKlicovaSlova(): void;
        akceNavrhy(): void;
        akceKategorie(): void;
        akceCastiVZ(): void;
        akceListDP(): void;
        akceCerpani(): void;
        akceKomodity(): void;
        NaplnPrizCast(): JQueryPromise<IGPrizCast[]>;
        vytvorFormDotacniTitul(): Forms.Form;
        vytvorFormZU(): Forms.Form;
        vytvorFormKomentar(): Forms.Form;
        akcePodani(): void;
        akceRozpoctoveZapisy(): void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
        kontrola(akce: string): string;
        preevidence(): void;
        closing(): JQuery.Promise<any, any, any>;
        akceFinancovaniKontr(): void;
        plneni(): void;
        exportNen(): void;
        importNenDzr(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GCastiVZScr extends GContentBase {
        taskId: string;
        private srvCnt;
        ixs_pri: string;
        constCastiVZ: Gordic.Evz.Interface.GCastiVZConstDto;
        view: Gordic.Data.View;
        aktOper: boolean;
        dodaOper: boolean;
        isVlastnik: boolean;
        zmena: boolean;
        c_plan: Decimal;
        form: JQuery;
        tab: JQuery;
        private filter;
        gridSeznam: JQuery;
        prepareContent(params: any): void;
        nastavTlacitka(): void;
        aktivita(aktivita: number): void;
        nova(): void;
        generovat(): void;
        nactiData(): void;
        nactiParam(): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        dotaz(otazka: string): JQueryPromise<any>;
        sumaGridu(): Decimal;
        closing(): JQuery.Promise<any, any, any>;
        nactiView(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GNovaCastVZScr extends GContentBase {
        taskId: string;
        ixs_pri: string;
        view: Gordic.Data.View;
        lim_zac: number;
        cis_real: string;
        tab: JQuery;
        private filter;
        gridSeznam: JQuery;
        zmena: boolean;
        prepareContent(params: any): void;
        uloz(): void;
        closing(): boolean;
        nactiView(): void;
        createColumns(): Data.GridFormat;
    }
}
declare namespace Gordic.Evz.WebClient {
    type DataDtoDet = Gordic.Evz.Interface.EvzspidDto;
    type UsedComponentsDet = Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DataDtoDet>;
    class GEvzDetail extends GDetailBuilderContent<UsedComponentsDet> {
        modPU: boolean;
        ixp: string;
        ktg_typ: number;
        rok: number;
        ele: boolean;
        isTskParam: boolean;
        ixs_krk: string;
        ixs_esu: string;
        ico: string;
        ucs: string;
        ac_ag: string;
        soutez: string;
        ixs_pri: string;
        allDok: boolean;
        podaniOut: boolean;
        modOkna: string;
        par_def_datzak: string;
        par_vie_rizsip: string;
        evz_def_nabedo: string;
        par_def_zcpreb: string;
        genIxp: boolean;
        isChanged: boolean;
        zaklTab: JQuery<HTMLElement>;
        data: Interface.GParamDetailDto;
        enableKategorie: boolean;
        prosloOCR: boolean;
        dotazPF: boolean;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        lzePredat: boolean;
        lzePridelit: boolean;
        lzePrevzit: boolean;
        uzavritBezpodminecne: boolean;
        evz_rad_poupro: string;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void;
        VratColumns07(): Data.GridFormat<any>;
        schvaleni(): void;
        storno(): void;
        odschvaleni(): void;
        castiVZ(): void;
        kategorie(): void;
        komise(): void;
        nastavMenu(): void;
        saveData(odkud: string, nactiDetail?: boolean): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        vratPole(key: any): any;
        getData(odkud: string): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        ulozData03(): void;
        ulozData04(): void;
        ulozData05(): void;
        ulozData06(): void;
        ulozData07(): void;
        ulozData08(): void;
        ulozData09(): void;
        ulozData10(): void;
        ulozData11(): void;
        ulozData12(): void;
        onDetailBuilderBuild(builder: any): void;
        dotazOkno(otazka: string): JQueryPromise<any>;
        nactiDetail(): void;
        financovani(): void;
        closing(): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        detailChanged(): boolean;
        akceProces(): void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
        kontrola(akce: string): string;
    }
}
declare namespace Gordic.Evz.WebClient.PrefabsEvz {
    interface ZakladniUdajeOptions {
        readOnly: boolean;
        content: GContent;
        puvSchv: Decimal;
        acAgMaska: string | null;
        labels: Interface.GDetailLabelsDto;
        enabled: Interface.GDetailEnableDto;
        ixp: string;
        enableReal: boolean;
        nadebo: string;
        nadTyp2: number;
    }
    function vytvorZakladniUdajeFormular(options: ZakladniUdajeOptions): Forms.Form;
    function KontrolaFinOdDo(fin_od: number | null, fin_do: number | null, that: GContent): void;
    interface BlizsiUrceniOptions {
        readOnly: boolean;
        zakon: number;
        contentHl: JQuery;
        enabled: Interface.GDetailEnableDto;
        that: GContent;
        toolTipPlan: string;
        enableDatPredOzn: boolean;
    }
    function vytvorBlizsiUrceniFormular(options: BlizsiUrceniOptions): Forms.Form;
    interface RozsireneInformaceOptions {
        readOnly: boolean;
        rokMes: string;
        rokMesCdap: string;
        zakon: number;
        nadTypSou: number | null | undefined;
        soutez: string | null | undefined;
        c_plan_03: boolean;
        that: GContent;
    }
    function vytvorRozsireneInformaceFormular(option: RozsireneInformaceOptions): Forms.Form;
    interface OduvodneniOptions {
        readOnly: boolean;
        zakon: number;
        content: JQuery;
        enabled: Interface.GDetailEnableDto;
    }
    function vytvorOduvodneniFormular(option: OduvodneniOptions): Forms.Form;
    interface Formular03Options {
        readOnly: boolean;
        ktg_typ: number;
        zakon: number;
        nadTyp3: number;
        that: GContent;
        labels: Interface.GDetailLabelsDto;
        enable: Interface.GDetailEnableDto;
        ac_ag_zu: boolean;
        acAgMaska: string;
    }
    function vytvorFormular03(options: Formular03Options): Forms.Form;
    function ProvazatFormulare(content: JQuery): void;
    interface Formular04Options {
        readOnly: boolean;
        labels: Pap.Interface.GTab04VlastnostiDto;
        enabled: Interface.GDetailEnableDto;
    }
    function vytvorFormular04(options: Formular04Options): Forms.Form;
    function NaplnDisable(vl_soutez: string, vl_priz_dzr: string, vl_nadTyp: number, pole_s: ((Date | null)[]) | null, pole_p: ((Date | null)[]) | null): Interface.GDetailEnableDto;
    interface FormOpravFinOptions {
        readOnly: boolean;
        readOnly_10_fin: boolean;
    }
    function FormOpravFin(options: FormOpravFinOptions): Forms.Form;
    interface FormOpravEsuOptions {
        readOnly: boolean;
        that: GContent;
        ktg_typ: number;
        ixs_pri: string;
        ixp: string;
        soutez: string;
        cis_por: number;
        readOnly_10_esu: boolean;
    }
    function FormOpravEsu(options: FormOpravEsuOptions): Forms.Form;
    interface FormularOpravTPOptions {
        readOnly: boolean;
        labels: Gordic.Pap.Interface.GTab04VlastnostiDto;
        soutez: string;
        nadtyp: number;
        pole_s: (Date | null)[];
        pole_p: (Date | null)[];
    }
    function FormOpravTP(options: FormularOpravTPOptions): Forms.Form;
    interface Formular11Options {
        readOnly: boolean;
        ico: string;
        ucs: string;
        rok: number;
        par_def_datzak: string;
        dat_s_lhu_puv: Date | null;
        that: GContent;
        soutez: string;
        zakon: number;
        lim_zac: number;
        ixs_pri: string;
        is137: boolean;
        enable: Interface.GDetailEnableDto;
        labels: Interface.GDetailLabelsDto;
    }
    function vytvorFormular11(options: Formular11Options): Forms.Form;
    function PorovnejDatum(date1: Date, date2: Date): string;
    function PorovnejDatVyhl(dat_puv: Date, dat_novy: Date, par_def_datzak: string): void;
    function dotaz(titulek: string, otazka: string, that: GContent): JQueryPromise<any>;
    interface FormZakOptions {
        readOnly: boolean;
        readOnly_12: boolean;
    }
    function FormZak(options: FormZakOptions): Forms.Form;
    interface FormSubjektOptions {
        readOnly: boolean;
        that: GContent;
        soutez: string;
        zakon: number;
        lim_zac: number;
        ixs_pri: string;
        is137: boolean;
        ixsEsuVVisible: boolean;
        priz_vyz: boolean;
        ktg_typ: number;
        text03: string;
        cis_por: number;
        por_cis_nab: number;
        enabled: Interface.GDetailEnableDto;
        labels: Interface.GDetailLabelsDto;
        nadTyp03: number;
    }
    function FormSubjekt(options: FormSubjektOptions): Forms.Form;
    interface FormOstUdajetOptions {
        readOnly: boolean;
        labelCNav: string;
        labelLhuPod: string;
        disableDatVyhl: boolean;
        disableCentrAdr: boolean;
        nastavCPreblok: boolean;
        c_esuNeut: Decimal;
        enabled: Interface.GDetailEnableDto;
        par_def_zcpreb: string;
    }
    function FormOstUdaje(options: FormOstUdajetOptions): Forms.Form;
    function FormNabidky(options: FormOstUdajetOptions): Forms.Form;
    interface FormElvzOptions {
        readOnly: boolean;
        enable: boolean;
    }
    function FormElvz(options: FormElvzOptions): Forms.Form;
    interface Form07Options {
        readOnly: boolean;
        readOnly_07: boolean;
    }
    function Form07(options: Form07Options): Gordic.Forms.Form;
    interface Form08Options {
        readOnly: boolean;
        ico: string;
        ucs: string;
        rok: number;
        labels: Interface.GDetailLabelsDto;
        enable: Interface.GDetailEnableDto;
    }
    function Form08(options: Form08Options): Gordic.Forms.Form;
    function NaplnVlastnosti04(soutez: string | null | undefined, /* GInt16 nadTypSou,*/ cisZakSb: number): Pap.Interface.GTab04VlastnostiDto;
    interface INabedoPrizData {
        priz_nabedo?: string;
        v: number;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GEvzPlneniScr extends GContentBase {
        taskId: string;
        zaznam: Evz.Interface.GEvzvdofDto;
        readOnly: false;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        NastavOkEnabled(enabled: boolean): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GVyberEsuScr extends GContentBase {
        taskId: string;
        ixs_pri: string;
        view: Gordic.Data.View;
        form: JQuery;
        tab: JQuery;
        private filter;
        gridSeznam: JQuery;
        prepareContent(params: any): void;
        nastavTlacitka(): void;
        nactiView(): void;
        ok(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GDoporuceniScr extends GContentBase {
        taskId: string;
        ixs_pri: string;
        private srvCnt;
        constPP: Gordic.Evz.Interface.GDoporuceniConstDto;
        agenda: string;
        grid: JQuery;
        tab: JQuery;
        view: Gordic.Data.View;
        private filter;
        private isVlastnik;
        zmena: boolean;
        prepareContent(params: any): void;
        nactiView(): void;
        nastavTlacitka(): void;
        closing(): boolean;
        tisk(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GKategorieScr extends GContentBase {
        taskId: string;
        ixs_pri: string;
        ixp: string;
        readOnly: boolean;
        zobrazit_vse: boolean;
        dat_pri: Date;
        private srvCnt;
        constPP: Gordic.Evz.Interface.GKategorieConstDto;
        agenda: string;
        grid: JQuery;
        tab: JQuery;
        view: Gordic.Data.View;
        private filter;
        zmena: boolean;
        prepareContent(params: any): void;
        upravit(): void;
        nactiView(): void;
        nastavTlacitka(): void;
        closing(): boolean;
        novy(): void;
        zmenaAktivity(aktivni: boolean): void;
        kategorie(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GNovaKategorieScr extends GContentBase {
        taskId: string;
        zaznam: Evz.Interface.GEvzvkdnDto;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        NastavOkEnabled(enabled: boolean): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GAddUpdKategorieScr extends GContentBase {
        taskId: string;
        zaznam: Pap.Interface.GEvzskdnDto;
        dat_pri: Date;
        form: JQuery;
        novyZaznam: boolean;
        prepareContent(params: any): void;
        PorovnejDatum(date1: any, date2: any): string;
        ok(): void;
        NastavOkEnabled(enabled: boolean): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GKategorieSeznamScr extends GContentBase {
        taskId: string;
        grid: JQuery;
        tab: JQuery;
        readOnly: boolean;
        jeVprc: boolean;
        dat_pri: Date;
        view: Gordic.Data.View;
        private filter;
        zmena: boolean;
        prepareContent(params: any): void;
        nactiView(): void;
        nastavTlacitka(): void;
        novy(): void;
        upravit(): void;
        delete(): void;
        aktivovat(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GKomiseScr extends GContentBase {
        taskId: string;
        ixs_pri: string;
        ixp: string;
        ktg_typ: number;
        readOnly: boolean;
        private srvCnt;
        constPP: Gordic.Evz.Interface.GKomiseConstDto;
        agenda: string;
        grid: JQuery;
        tab: JQuery;
        view: Gordic.Data.View;
        private filter;
        zmena: boolean;
        prepareContent(params: any): void;
        nactiView(): void;
        nastavTlacitka(): void;
        closing(): boolean;
        novy(): void;
        upravit(): void;
        zmenaAktivity(aktivni: boolean): void;
        clenoveKomise(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GNovaKomiseScr extends GContentBase {
        taskId: string;
        zaznam: Evz.Interface.GEvzvoksDto;
        ktg_typ: number;
        form: JQuery;
        update: boolean;
        prepareContent(params: any): void;
        ok(): void;
        NastavOkEnabled(enabled: boolean): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GAddUpdClenoveKomiseScr extends GContentBase {
        taskId: string;
        zaznam: Pap.Interface.GEvzsokoDto;
        form: JQuery;
        novyZaznam: boolean;
        prepareContent(params: any): void;
        ok(): void;
        NastavOkEnabled(enabled: boolean): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GClenoveKomiseSeznamScr extends GContentBase {
        taskId: string;
        grid: JQuery;
        tab: JQuery;
        readOnly: boolean;
        jeVprc: boolean;
        view: Gordic.Data.View;
        private filter;
        zmena: boolean;
        prepareContent(params: any): void;
        nactiView(): void;
        nastavTlacitka(): void;
        novy(): void;
        upravit(): void;
        delete(): void;
        aktivovat(): void;
        closing(): boolean;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GKomoditniPlneniScr extends GContentBase {
        taskId: string;
        ixs_pri: string;
        readOnly: boolean;
        grid: JQuery;
        tab: JQuery;
        komoditaPkr: boolean;
        view: Gordic.Data.View;
        private filter;
        zmena: boolean;
        prepareContent(params: any): void;
        nactiView(): void;
        nastavTlacitka(): void;
        closing(): boolean;
        novy(): void;
        zmenaAktivity(aktivni: boolean): void;
        upravit(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GNewUpdKomplnScr extends GContentBase {
        taskId: string;
        zaznam: Evz.Interface.GEvzvkprDto;
        komoditaPkr: boolean;
        isUpdate: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        NastavOkEnabled(enabled: boolean): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GEvzSoutezeVZScr extends GContentBase {
        taskId: string;
        ixs_pri: string;
        ixs_esu: string;
        nazev: string;
        sav_cis_por: number;
        sav_por_cis_nab: number;
        priz_nabedo: number;
        soutez: string;
        titulek: string;
        s_vz: number;
        cis_por: number;
        readOnly: boolean;
        ixs_fun_akt: string;
        private savedRec;
        private grid;
        private view;
        private isChanged;
        private menubarparametry;
        form: JQuery;
        private novyZaznam;
        onContentReady(): void;
        akceNovy(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        akceUlozit(zeSelection: boolean): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        obnovSeznam(): void;
        nastavTlacitka(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GSouvisejiciVZTabScr extends GContentBase {
        taskId: string;
        pripojAcAgPod: boolean;
        aktivita: number;
        ixs_pri: string;
        tab: JQuery;
        prepareContent(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GSouvisejiciZakazkyTabScr extends GContentBase {
        taskId: string;
        ixs_pri_nad: string;
        tab: JQuery;
        prepareContent(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    /** Visitor komponenty Věcného profilu (Umožňuje rozšířit společný základ) */
    class GEvzVecnyProfilVisitor implements Gordic.Eko.WebClient.IGVecnyProfilVisitor {
        protected dao: Gordic.Evz.WebClient.GVecnyProfilEvzDAO;
        protected cntSeznam: Gordic.Eko.WebClient.IGVecnyProfilSeznam<Gordic.Evz.Interface.GVepsevzDto> & GContent;
        protected cntDetail: Gordic.Eko.WebClient.IGVecnyProfilDetail<Gordic.Evz.Interface.GVepsevzDto> & GContent;
        protected ixs_pri: string;
        protected readOnly: boolean;
        constructor(opts: {
            dao: Gordic.Evz.WebClient.GVecnyProfilEvzDAO;
            ixs_pri: string;
            readOnly: boolean;
        });
        visit(content: Eko.WebClient.IGVecnyProfilSeznam<Gordic.Evz.Interface.GVepsevzDto> & GContent): void;
        getGridFormat(): Data.GridFormat<any>;
        updateDetailActions(dto: Interface.GVepsevzDto): void;
        protected getView(): JQuery.Promise<any, any, any>;
        /**
         * Rozšíření a upravení formuláře
         * @param form Div formuláře
         * @param formDefinition Definice formuláře
         * @param dto Aktuální dto s daty
         */
        private enhanceForm;
        /**
         * Úprava sesbíraných dat z formuláře před uložením
         * @param form Aktuální formulář
         * @param dto Aktuální dto
         * @param formData Sesbíraná data formuláře
         */
        private modifyDataBeforeSave;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GVecnyProfilEvzDAO implements Gordic.Eko.WebClient.IGVecnyProfilDAO {
        opts: {
            ixs_pri: string;
            readOnly: boolean;
        };
        constructor(opts: {
            ixs_pri: string;
            readOnly: boolean;
        });
        list(parentContent: GContent<IGContentBase, any>, dto: any, opts: {
            ixs_pri: string;
            readOnly: boolean;
        } | undefined): JQuery.Promise<any[], any, any>;
        evidovat(parentContent: GContent<IGContentBase, any>, dto: any, opts?: {} | undefined): JQueryPromise<any>;
        schvalit(parentContent: GContent<IGContentBase, any>, dto: any, opts?: {} | undefined): JQueryPromise<any>;
        stornovat(parentContent: GContent<IGContentBase, any>, dto: any, opts?: {} | undefined): JQueryPromise<any>;
        zrusitStorno(parentContent: GContent<IGContentBase, any>, dto: any, opts?: {} | undefined): JQueryPromise<any>;
        hromadnaKontrolaOpravneni(parentContent: GContent, dtos: any[], operace: Gordic.Eko.Interface.GVecnyProfilOperace, opts?: {}): JQueryPromise<Isl.GServiceGroupResponse<any>>;
        hromadnaOperace(parentContent: GContent, dtos: any[], operace: Gordic.Eko.Interface.GVecnyProfilOperace, opts?: {}): JQueryPromise<Isl.GServiceGroupResponse<any>>;
        vytvoritNovouPolozku(parentContent: GContent, opts?: {}): JQueryPromise<any>;
        destroy(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    type TApplyDelegate = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamDokFiltersOptions(tema: string, Ico: string, odkud: string, cfuGf: Gordic.Data.GridFormat, hardFilter: Interface.GEvzFiltrDto | null, applyDelegate: TApplyDelegate): IGFilterPanelOptions;
    interface IPrizViewData {
        priz_view: string;
        v: number;
    }
    interface IPripominkaVZData {
        pripominka_VZ: string;
        v: number;
    }
}
declare namespace Gordic.Evz.WebClient {
    type TApplyDelegateEl = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamElDokFiltersOptions(tema: string, odkud: string, useCB: boolean, applyDelegate: TApplyDelegateEl): IGFilterPanelOptions;
}
declare namespace Gordic.Evz.WebClient {
    type TApplyDelegateEsu = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamEsuFiltersOptions(tema: string, Ico: string, applyDelegate: TApplyDelegateEsu): IGFilterPanelOptions;
}
declare namespace Gordic.Evz.WebClient {
    class GEvzMigraceScr extends GContentBase {
        taskId: string;
        private isContentOpened;
        form: JQuery;
        prepareContent(params: any): void;
        nastavSpustitEnabled(enabled: boolean): void;
        spustit(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GEvzSeznamScr extends GContentBase {
        agenda: string;
        Ico: string;
        genIxp: boolean;
        refreshData: boolean;
        Rok: number;
        ap: Gordic.Pap.Interface.GPapSeznamAccessDto;
        private grid;
        private view;
        private previewController;
        private preevidenceData;
        private menubarparametry;
        private evz_rad_oldsvz;
        private evz_rad_poupro;
        private paramNabedo;
        private exportDoRzaLic;
        private exportDoRzaEnabled;
        filter: JQuery;
        filterDashBoard: Interface.GEvzFiltrDto;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        paramGvycza: number;
        onContentReady(): void;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        nastavEnableTlacitek(row?: Interface.EvzspriDto | null): void;
        detail(): void;
        nastavTlacitka(): void;
        akceNavrhy(): void;
        akceExportDoRza(): void;
        getOpenDetailDelegateEvz(): (cnt: any, grid: any, row: any) => void;
        akceUzavreni(): void;
        akceUzavreniZrusit(): void;
        akceUkonceni(): void;
        akceUkonceniZrusit(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        vratData(): Pap.Interface.GPapStruDto[];
        dotazAnoNe(titulek: string, otazka: string): JQueryPromise<any>;
        novaVz(): void;
        podani(ele: boolean): void;
        ukony(): void;
        akceUvolneni(): void;
        preevidence(): void;
        predani(): void;
        getOpenDetailDelegate(): (cnt: any, grid: any, row: any) => void;
        prideleni(): void;
        prevzeti(): void;
        obnovSeznam(): void;
        private registerPreview;
        private naplnGrid;
    }
}
declare namespace Gordic.Evz.AppSettings {
    /**
     * Definice formulářů pro uživatelské nastavení
     *
     * @returns {Forms.Form[]} formuláře
     */
    function ListsSettingsForm(gin_gen_ixp: string): Forms.Form[];
}
declare namespace Gordic.Evz.WebClient {
    class GEvzNovyPUScr extends GContentBase {
        title: string;
        taskId: string;
        Ico: string;
        genIxp: boolean;
        private grid;
        private previewController;
        ap: Gordic.Pap.Interface.GPapSeznamAccessDto;
        private paramNabedo;
        private evz_rad_poupro;
        private view;
        filter: JQuery;
        typEntity: GGridColumn<any>;
        techVlastnosti: GGridColumn<any>;
        private menubarparametry;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        dotazAnoNe(titulek: string, otazka: string): JQueryPromise<any>;
        novyPripad(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        akcePodani(ele: boolean): void;
        akceDetail(): void;
        nastavTlacitka(): void;
        nactiRadek(ixp: string, akce: string): void;
        columns(): Data.GridFormat<any>;
        private registerPreview;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GEvzSeznamAllDokScr extends GContentBase {
        taskId: string;
        agenda: string;
        Ico: string;
        genIxp: boolean;
        refreshData: boolean;
        ap: Gordic.Pap.Interface.GPapSeznamDokVZAccessDto;
        private grid;
        private previewController;
        private view;
        filter: JQuery;
        private filters;
        doplnit: boolean;
        techVlastnosti: GGridColumn<any>;
        filterImpl: object;
        private readonly warnDokLimit;
        private readonly dokLimit;
        private menubarparametry;
        private readonly zapamatovatOdpovediUkony;
        private odpovedDotaz1;
        private odpovedDotaz2;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        onContentReady(): void;
        nastavTlacitka(): void;
        obnovSeznam(): void;
        getOpenDetailDelegate(): (cnt: any, grid: any, row: any) => void;
        getOpenDetailDelegateEvz(): (cnt: any, grid: any, row: any) => void;
        detail(): void;
        podani(ele: boolean): void;
        akceSchvalitPis(storno: boolean): void;
        columns(): Data.GridFormat<any>;
        akceStorno(storno: boolean): void;
        akceUkonceni(storno: boolean): void;
        preevidenceEsu(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        private registerPreview;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        akceKontrolaMetadat(): void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GEvzSeznamAllElDokScr extends GContentBase {
        taskId: string;
        private previewController;
        private grid;
        refreshData: boolean;
        private view;
        ap: Gordic.Pap.Interface.GPapSeznamDokVZAccessDto;
        filterImpl: object;
        filter: JQuery;
        private filters;
        private menubarparametry;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        nastavTlacitka(): void;
        akcePodani(el: boolean): void;
        akceDetail(): void;
        akceSP(): void;
        akceUlozit(): void;
        akceZverejnit(): void;
        akceEvidElDok(): void;
        akceGenDokObr(): void;
        akceConverse(): void;
        private registerPreview;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        columns(): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GEvzSeznamDokVZScr extends GContentBase {
        ixs_pri: string;
        titulek: string;
        ac_ver_zak: string;
        genIxp: boolean;
        refreshData: boolean;
        task_id: string;
        private preevidenceData;
        ap: Pap.Interface.GPapSeznamDokVZAccessDto;
        private grid;
        private gridEl;
        private previewController;
        private view;
        private viewEl;
        filter: JQuery;
        private filters;
        isChanged: boolean;
        techVlastnosti: GGridColumn<any>;
        private readonly seznamDokElDokVisible;
        private readonly warnDokLimit;
        private readonly dokLimit;
        private menubarparametry;
        private paramNabedo;
        private readonly zapamatovatOdpovediUkony;
        private odpovedDotaz1;
        private odpovedDotaz2;
        private evz_rad_poupro;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        columns(): Data.GridFormat<any>;
        akceEpk(): void;
        obnovSeznam(): void;
        akcePodani(ele: boolean): void;
        getOpenDetailDelegate(): (cnt: any, grid: any, row: any) => void;
        getOpenDetailDelegateEvz(): (cnt: any, grid: any, row: any) => void;
        akceDetail(): void;
        akceSchvalitPis(storno: boolean): void;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        akcePripominka(): void;
        nastavTlacitka(): void;
        private registerPreview;
        closing(): JQuery.Promise<any, any, any>;
        akceStorno(storno: boolean): void;
        akceUkonceni(storno: boolean): void;
        preevidenceEsu(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        akceKontrolaMetadat(): void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GEvzSeznamUchazeciScr extends GContentBase {
        typ: string;
        Ico: string;
        genIxp: boolean;
        refreshData: boolean;
        private grid;
        private view;
        private previewController;
        private paramPricpr;
        private paramReaucz;
        filter: JQuery;
        private filters;
        doplnit: boolean;
        nabedoPar: boolean;
        private menubarparametry;
        filterImpl: object;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        ukony(): void;
        nabidky(): void;
        nastavTlacitka(): void;
        columns(): Data.GridFormat<any>;
        podani(ele: boolean): void;
        detail(): void;
        private registerPreview;
        dotaz(otazka: string): JQueryPromise<any>;
        sprava(): void;
        UpravVyber(seznam: Evz.Interface.GUchazeciDto[], typ: number): Interface.GUchazeciDto[];
        KontrolaNabedo(seznam: Evz.Interface.GUchazeciDto[]): 0 | 1 | 2;
        obnovSeznam(): void;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GEvzUchazeciDetail extends GContentBase {
        data: Evz.Interface.GUchazeciDto;
        onContentReady(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GEvzSeznamDokEsuScr extends GContentBase {
        titulek: string;
        ixs_esu: string;
        ixs_pri: string;
        genIxp: boolean;
        refreshData: boolean;
        private view;
        private previewController;
        private filters;
        grid: JQuery;
        isChanged: boolean;
        techVlastnosti: GGridColumn<any>;
        private paramRcZobr;
        private menubarparametry;
        private paramReaucz;
        private vlastnik;
        private ixsPriSave;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        columns(): Data.GridFormat<any>;
        akceEpk(): void;
        obnovSeznam(): void;
        akcePodani(ele: boolean): void;
        akceDetail(): void;
        akceSchvalitPis(storno: boolean): void;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        akcePripominka(): void;
        nastavTlacitka(): void;
        private registerPreview;
        closing(): JQuery.Promise<any, any, any>;
        akceStorno(storno: boolean): void;
        akceUkonceni(storno: boolean): void;
        preevidenceEsu(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GEvzSeznamNabedoScr extends GContentBase {
        titulek: string;
        ixs_esu: string;
        refreshData: boolean;
        private view;
        private previewController;
        filter: JQuery;
        private filters;
        grid: JQuery;
        isChanged: boolean;
        techVlastnosti: GGridColumn<any>;
        private paramRcZobr;
        private menubarparametry;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        private ixs_fun_vl;
        onContentReady(): void;
        columns(): Data.GridFormat<any>;
        obnovSeznam(): void;
        akceNovy(): void;
        akceDetail(): void;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        nastavTlacitka(): void;
        private registerPreview;
        closing(): JQuery.Promise<any, any, any>;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GAddUpdNabedoScr extends GContentBase {
        taskId: string;
        zaznam: Evz.Interface.GEvzsesuDto;
        readOnly: boolean;
        dat_pri: Date;
        form: JQuery;
        novyZaznam: boolean;
        prepareContent(params: any): void;
        ok(): void;
    }
}
declare namespace Gordic.Evz.WebClient {
    class GVyberStavuTabScr extends GContentBase {
        taskId: string;
        tab: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(ok: any): JQuery.Promise<any, any, any>;
    }
}
