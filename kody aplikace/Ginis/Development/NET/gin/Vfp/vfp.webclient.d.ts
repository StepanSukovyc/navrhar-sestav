declare namespace Gordic.Vfp.Dialogs {
    function GVfpSeznam(parentContent: GContent, opt: {
        filtr: Pap.Interface.GPapDashboardFiltryDto | null;
        /**
         * taskId
         * @type {string}
         */
        taskId: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GVfpSeznamAllDok(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GVfpSeznamAllElDok(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GVfpSeznamDokDT(parentContent: GContent, opt: {
        ixs_pri: string;
        /**
         * Příznak, doplnit další ekonomické informace.
         */
        doplnit: boolean;
        /**
         * ac_ag.
         */
        ac_ag: string;
        /**
         * task_id.
         */
        task_id: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
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
    function GVfpSeznamUchazeci(parentContent: GContent, opt: GUchazeciOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GVfpDetailDT(parentContent: GContent, opt: {
        data: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        isChanged: boolean;
        ixp: string | null;
    } | undefined>;
    function GVfpZadostiDT(parentContent: GContent, opt: {
        ixs_pri: string;
        ac: string;
        nazev: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    interface GPredvyhodnoceniParamScrOptions {
        /**
         * ixs_pri
         * @type string
         */
        ixs_pri: string;
        /**
         * paramRcZobr
         * @type string
         */
        paramRcZobr: string;
    }
    interface GPredvyhodnoceniParamScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        isChanged: boolean;
    }
    function GPredvyhodnoceniScr(parentContent: GContent, opt: GPredvyhodnoceniParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPredvyhodnoceniParamScrRetVal | undefined>;
    interface GUpdPredvyhodnoceniParamScrOptions {
        /**
         * zaznam
         * @type {Vfp.Interface.GVfpsesuDto}
         */
        zaznam: Vfp.Interface.GVfpsesuDto;
        /**
         * priznak na to, ze se jedna o dialog pro hromadnou kopii
         * @type {boolean}
         */
        kopirovani: boolean;
    }
    interface GUpdPredvyhodnoceniParamScrRetVal {
        /**
         * zaznam
         * @type {Vfp.Interface.GVfpsesuDto}
         */
        zaznam: Vfp.Interface.GVfpsesuDto | null;
        cb: [] | null;
    }
    function GUpdPredvyhodnoceniScr(parentContent: GContent, opt: GUpdPredvyhodnoceniParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GUpdPredvyhodnoceniParamScrRetVal | undefined>;
    interface GLokalityParamScrOptions {
        /**
         * ixs_pri
         * @type string
         */
        ixs_pri: string;
        /**
         * ixp
         * @type string
         */
        ixp: string;
    }
    interface GLokalityParamScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GLokalityScr(parentContent: GContent, opt: GLokalityParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GLokalityParamScrRetVal | undefined>;
    interface GAddLokalityParamScrOptions {
        /**
                 * zaznam
                 * @type {Vfp.Interface.GLokalityDto}
                 */
        zaznam: Vfp.Interface.GLokalityDto;
        /**
         * tabulka
         * @type {string}
         */
        tabulka: string;
    }
    interface GAddLokalityParamScrRetVal {
        /**
 * navrat
 * @type {boolean}
 */
        navrat: boolean;
    }
    function GAddLokalityScr(parentContent: GContent, opt: GAddLokalityParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GAddLokalityParamScrRetVal | undefined>;
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
        novyDT: boolean;
    }
    interface GDetailScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        isChanged: boolean;
    }
    function GDetailScr(parentContent: GContent, opt: GDetailScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GDetailScrRetVal | undefined>;
    interface GPlneniScrOptions {
        data: Interface.GParamPlneniDto;
    }
    interface GPlneniScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GPlneniScr(parentContent: GContent, opt: GPlneniScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GPlneniScrRetVal | undefined>;
    interface GProstredkyScrOptions {
        /**
         * ixs_pri
         * @type string
         */
        ixs_pri: string;
        /**
         * por_cis_nab
         * @type number
         */
        por_cis_nab: number;
        /**
         * ixp
         * @type string
         */
        ixp: string;
    }
    interface GProstredkyScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GProstredkyScr(parentContent: GContent, opt: GProstredkyScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GProstredkyScrRetVal | undefined>;
    interface GUpdProstredkyScrOptions {
        zaznam: Interface.GVfpapzaDto;
    }
    interface GUpdProstredkyScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GUpdProstredkyScr(parentContent: GContent, opt: GUpdProstredkyScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GUpdProstredkyScrRetVal | undefined>;
    interface GVfpUchazeciDetailScrOptions {
        /**
         * data
         * @type {Vfp.Interface.GUchazeciDto}
         */
        data: Vfp.Interface.GUchazeciDto;
    }
    function GVfpUchazeciDetail(parentContent: GContent, opt: GVfpUchazeciDetailScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    interface GVfpVSScrOptions {
        /**
         * data
         * @type {Gordic.Vfp.Interface.VfpspriDto}
         */
        zaznam: Gordic.Vfp.Interface.VfpspriDto;
    }
    interface GVfpVSScrRetVal {
        /**
         * navrat
         * @type {string}
         */
        maska: string;
    }
    function GVfpVS(parentContent: GContent, opt: GVfpVSScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GVfpVSScrRetVal>;
    interface IGVfpPodaniOptions extends GDetailScrOptions {
        genIxp: boolean;
    }
    function GVfpPodani(parentContent: GContent, options: IGVfpPodaniOptions): JQuery.PromiseBase<Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any>;
    function GVfpSeznamFinancovani(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GVfpNovyPU(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GVfpSeznamDokEsu(parentContent: GContent, opt: {
        ixs_esu: string;
        ixs_pri: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GVyberStavuTabScr(parentContent: GContent, opt: null, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<Pap.Interface.GPapDashboardFiltryDto | null>;
}
declare namespace Gordic.Vfp {
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
        nactiDetail(ixs_pri: string): JQuery.PromiseBase<void, any, any, void, any, any, void, any, any, void, any, any> | null;
        nactiSeznamBezFin(id: number): void;
        nactiSeznam(id: number, kniha: string): void;
        Kontrolapristupu(): boolean;
        evidenceDelegate(obj: {
            pids: string[];
            typAg: number;
            genIxp: string;
        }): JQuery.PromiseBase<any, any, never, never, never, never, never, never, never, never, never, never>;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Vfp.WebClient.VfpPrefabsAll {
    function vytvorPrehledFormular(): Forms.Form;
    interface VfpHromadneOperaceOptions {
        parentContent: GContent;
        data: Vfp.Interface.VfpspidDto[] | JQueryPromise<Vfp.Interface.VfpspidDto[]>;
        title: string;
        akce: string;
        description: string;
        nazevAkce: string;
        completeDelegate: (view: any) => void;
        allDok: boolean | null;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    function VfpHromadneOperace(options: VfpHromadneOperaceOptions): void;
    function VratFormat(): Data.GridFormat<any>;
    interface VfpHOSpravaOptions {
        parentContent: GContent;
        label: string;
        ktg_typ: number;
        data: Vfp.Interface.GUchazeciDto[] | JQueryPromise<Vfp.Interface.GUchazeciDto[]>;
        completeDelegate: (view: any) => void;
    }
    interface VfpHOCommonOptions {
        parentContent: GContent;
        data: Vfp.Interface.VfpspidDto[] | JQueryPromise<Vfp.Interface.VfpspidDto[]>;
        zrusit: boolean;
        completeDelegate: (view: any) => void;
        allDok: boolean;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    interface VfpHOCommonPreevidenceOptions {
        parentContent: GContent;
        data: Vfp.Interface.VfpspidDto[] | JQueryPromise<Vfp.Interface.VfpspidDto[]>;
        zrusit: boolean;
        completeDelegate: (view: any) => void;
        allDok: boolean;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
    }
    function SchvalitPis(options: VfpHOCommonOptions): void;
    function StornoPis(options: VfpHOCommonOptions): void;
    function UkonceniPis(options: VfpHOCommonOptions): void;
    function PreevidenceSubj(options: VfpHOCommonOptions): void;
    interface VfpHromadneOperaceEsuOptions {
        parentContent: GContent;
        ktg_typ: number;
        data: Vfp.Interface.GUchazeciDto[] | JQueryPromise<Vfp.Interface.GUchazeciDto[]>;
        title: string;
        akce: string;
        description: string;
        nazevAkce: string;
        completeDelegate: (view: any) => void;
    }
    function SpravaStavuCastek(options: VfpHOSpravaOptions): void;
    function VfpHromadneOperaceEsu(options: VfpHromadneOperaceEsuOptions): void;
    function VratFormatEsu(): Data.GridFormat<any>;
}
declare namespace Gordic.Vfp.WebClient {
    class GVfpDashboard extends GContentBase {
        private data;
        private gdb_panel;
        private rok;
        private paramSulPri;
        private limitDashBoard1;
        private limitDashBoard4;
        private limitDashBoard3;
        onContentReady(): void;
        createKpiCount(poradi: number, label: string, hodnota: number): GObservableObject<GKpiItemOptions>;
        createKpiSeparator(poradi: number): GObservableObject<GKpiItemOptions>;
        nactiDetail(ixs_pri: string): void;
        naplnStrukturuPri(): Interface.VfpspriDto[];
        nactiSeznamBezFin(id: number): void;
        nactiSeznam(id: number, kniha: string): void;
        Kontrolapristupu(): boolean;
    }
}
declare namespace Gordic.Vfp.WebClient {
    interface IGPrizIsProfin {
        isProfin: string;
        /**
         * komentar
         * @type {number}
         */
        v: number;
    }
    type DataDto = Gordic.Vfp.Interface.VfpspriDto;
    type UsedComponents = Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DataDto>;
    class GVfpDetailDTScr extends GDetailBuilderContent<UsedComponents> {
        detailDto: Gordic.Vfp.Interface.VfpspriDto;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        ac: Gordic.Pap.Interface.GPapDetailAccessDto;
        isChanged: boolean;
        finChanged: boolean;
        isTskParam: boolean;
        genIxp: boolean;
        kpiData: Decimal[];
        podaniEnabled: boolean;
        lzePredat: boolean;
        lzePridelit: boolean;
        lzePrevzit: boolean;
        AktSubrady: number;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        NaplnPrizIsProfin(): JQueryPromise<IGPrizIsProfin[]>;
        onDetailBuilderBuild(builder: any): void;
        akceUkony(): void;
        akceFinancovaniKontr(): void;
        akceProfilFinancovani(): void;
        akceFinancovani(): void;
        akceZadosti(): void;
        akceUzavreni(): void;
        akceUzavreniZrusit(): void;
        NactiData(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        dotaz(otazka: string): JQueryPromise<any>;
        akceKlicovaSlova(): void;
        akceNavrhy(): void;
        akceRozpoctoveZapisy(): void;
        akceVS(): void;
        akceUvolneni(): void;
        akceCerpani(): void;
        akceUkonceni(): void;
        akceUkonceniZrusit(): void;
        akceSP(): void;
        vytvorFormDotacniTitul(): Forms.Form;
        vytvorFormFin(): Forms.Form;
        vytvorFormZU(): Forms.Form;
        vytvorFormKomentar(): Forms.Form;
        akcePodani(): void;
        preevidence(): void;
        closing(): JQuery.Promise<any, any, any>;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
        kontrola(akce: string): string;
    }
}
declare namespace Gordic.Vfp.WebClient {
    type DataDtoDet = Gordic.Vfp.Interface.VfpspidDto;
    type UsedComponentsDet = Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DataDtoDet>;
    class GVfpDetail extends GDetailBuilderContent<UsedComponentsDet> {
        ixp: string;
        modPU: boolean;
        ktg_typ: number;
        rok: number;
        por_cis_nab: number;
        ele: boolean;
        ixs_krk: string;
        ico: string;
        ucs: string;
        ixs_esu: string;
        isTskParam: boolean;
        vfp_def_vypalk: string;
        ac_ag: string;
        soutez: string;
        ixs_pri: string;
        allDok: boolean;
        podaniOut: boolean;
        modOkna: string;
        par_def_datzak: string;
        par_vie_rizsip: string;
        genIxp: boolean;
        isChanged: boolean;
        data: Interface.GParamDetailDto;
        enableKategorie: boolean;
        spoluUcastNulaEnabled: boolean;
        dotazPF: boolean;
        prosloOCR: boolean;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        lzePredat: boolean;
        lzePridelit: boolean;
        lzePrevzit: boolean;
        uzavritBezpodminecne: boolean;
        inicializovano?: boolean;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void;
        schvaleni(): void;
        plneni(): void;
        schProst(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        financovani(): void;
        lokality(): void;
        prostredky(): void;
        vlastnosti(): void;
        storno(): void;
        odschvaleni(): void;
        nastavMenu(): void;
        saveData(odkud: string, nactiDetail?: boolean): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        vratPole(key: any): any;
        getData(odkud: string): JQuery.Promise<any, any, any>;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        ulozData1(): void;
        ulozData2(): void;
        ulozData3(): boolean;
        ulozDataHr(): void;
        onDetailBuilderBuild(builder: any): void;
        akceKlicovaSlova(): void;
        akceVazbaNaSpis(): void;
        nactiDetail(): void;
        akceRozsPopis(): void;
        closing(): JQuery.Promise<any, any, any>;
        detailChanged(): boolean;
        akceProces(): void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
        kontrola(akce: string): string;
    }
}
declare namespace Gordic.Vfp.WebClient.PrefabsVfp {
    interface ZakladniUdajeOptions {
        readOnly: boolean;
        content: GContent;
        puvSchv: Decimal;
        labels: Interface.GDetailLabelsDto;
        enabled: Interface.GDetailEnableDto;
        ixs_typ: string;
    }
    function vytvorZakladniUdajeFormular(options: ZakladniUdajeOptions): Forms.Form;
    function KontrolaFinOdDo(fin_od: number | null, fin_do: number | null, that: GContent): void;
    interface FinancovaniDTOptions {
        readOnly: boolean;
        contentHl: JQuery;
        ico: string;
        ucs: string;
        rok: number;
        typPhlVisible: boolean;
        readOnlyFinancovani: boolean;
        toolTipPlan: string;
    }
    function vytvorFinancovaniDTFormular(options: FinancovaniDTOptions): Forms.Form;
    interface OduvodneniOptions {
    }
    function vytvorOduvodneniFormular(option: OduvodneniOptions): Forms.Form;
    interface Formular03Options {
        readOnly: boolean;
        ktg_typ: number;
        that: GContent;
        labels: Interface.GDetailLabelsDto;
        enable: Interface.GDetailEnableDto;
        ac_ag_zu: boolean;
        acAgMaska: string;
    }
    function vytvorFormular03(options: Formular03Options): Forms.Form;
    interface Formular04Options {
        readOnly: boolean;
        enabled: Interface.GDetailEnableDto;
    }
    function vytvorFormular04(options: Formular04Options): Forms.Form;
    interface FormSubjektOptions {
        readOnly: boolean;
        that: GContent;
        typ_dgr: string;
        ixs_pri: string;
        ixsEsuVVisible: boolean;
        ktg_typ: number;
        cis_por: number;
        por_cis_nab: number;
        enabled: Interface.GDetailEnableDto;
        nastavCPreblok: boolean;
        ixs_esu: string | null;
        por_cis_nab_esu: number;
        nadTyp03: number;
        soutez: string;
        ixs_typ: string;
    }
    function ProvazatFormulare(content: JQuery): void;
    function vytvorFormularSubjekt(options: FormSubjektOptions): Forms.Form;
    interface FormProjektOptions {
        readOnly: boolean;
    }
    function vytvorFormularProjekt(options: FormProjektOptions): Forms.Form;
    interface FormHodnoceniOptions {
        readOnly: boolean;
    }
    function vytvorFormularHodnoceni(options: FormHodnoceniOptions): Forms.Form;
    interface FormFinancovaniOptions {
        readOnly: boolean;
        rozpSkladbyVisible: boolean;
        cbSmlEnable: boolean;
        spuRs2Save: string;
        nadTyp2: number;
        nadTyp3: number;
        enabled: Interface.GDetailEnableDto;
        ixs_pri: string;
        vfp_stav: number;
        c_vyd: Decimal;
        c_poz: Decimal;
        c_predp: Decimal;
        c_real: Decimal;
        that: GContent;
        verPodChecked: boolean;
        ixs_typ: string;
        povinneCpoz: boolean;
        vfp_def_vypalk: string;
    }
    function algKontrola(priznak: string, ixs_pri: string, hodnNova: Decimal, hodnPuvodni: Decimal, rezim: number, that: GContent, hodnota3: Decimal): JQueryPromise<void>;
    function vytvorFormularFinancovani(options: FormFinancovaniOptions): Forms.Form;
    interface FormDoplUdajeOptions {
        readOnly: boolean;
    }
    function vytvorFormularDoplUdaje(options: FormDoplUdajeOptions): Forms.Form;
    interface FormVyuctovaniOptions {
        readOnly: boolean;
        typPhlVisible: boolean;
    }
    function vytvorFormularVyuctovani(options: FormVyuctovaniOptions): Forms.Form;
    interface FormPopisZadateleOptions {
        readOnly: boolean;
    }
    function vytvorFormularPopisZadatele(options: FormPopisZadateleOptions): Forms.Form;
    function dotaz(titulek: string, otazka: string, that: GContent): JQueryPromise<any>;
}
declare namespace Gordic.Vfp.WebClient {
    class GAddLokalityScr extends GContentBase {
        zaznam: Gordic.Vfp.Interface.GLokalityDto;
        tabulka: string;
        form: JQuery;
        change: boolean;
        prepareContent(params: any): void;
        ok(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        NastavOkEnabled(enabled: boolean): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GLokalityScr extends GContentBase {
        ixp: string;
        ixs_pri: string;
        constPP: Vfp.Interface.GLokalityConstDto;
        private srvCnt;
        viewLok: Gordic.Data.View<Gordic.Vfp.Interface.GLokalityDto>;
        viewRoz: Gordic.Data.View<Gordic.Vfp.Interface.GLokalityDto>;
        viewPov: Gordic.Data.View<Gordic.Vfp.Interface.GLokalityDto>;
        viewDop: Gordic.Data.View<Gordic.Vfp.Interface.GLokalityDto>;
        gridLok: JQuery;
        gridRoz: JQuery;
        gridPov: JQuery;
        gridDop: JQuery;
        prepareContent(params: any): void;
        createActions(cislo: number): void;
        createMenuBar(cislo: number): MenuParams[];
        nactiView(cislo: number): void;
        nastavTlacitka(cislo: number): void;
        aktivita(cislo: number): void;
        novy(cislo: number): void;
        VratGrid(typ: number, aktivitaValues: any): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GPlneniScr extends GContentBase implements IGClientContent {
        data: Interface.GParamPlneniDto;
        grid: JQuery;
        gridH: JQuery;
        tab: JQuery;
        formPln: JQuery;
        viewH: Gordic.Data.View;
        view: Gordic.Data.View;
        readOnly: boolean;
        private filterData;
        prepareContent(params: any): void;
        changeCB(value: boolean): void;
        ok(): void;
        vratText(cislo: number): " 'Ano'. " | " 'Ne'. ";
        refresh(): void;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GPredvyhodnoceniScr extends GContentBase {
        ixs_pri: string;
        constPP: Vfp.Interface.GPredvyhodnoceniConstDto;
        private srvCnt;
        view: Gordic.Data.View<Gordic.Vfp.Interface.GVfpsesuDto>;
        private filter;
        grid: JQuery;
        isChanged: boolean;
        paramRcZobr: string;
        prepareContent(params: any): void;
        nastavTlacitka(): void;
        podani(): void;
        closing(): JQuery.Promise<any, any, any>;
        kopie(): void;
        upravit(): void;
    }
}
declare namespace Gordic.Vfp.WebClient {
    interface IGNesPodg {
        nes_podg: string;
        /**
         * komentar
         * @type {number}
         */
        v: number;
    }
    class GUpdPredvyhodnoceniScr extends GContentBase {
        agenda: string;
        zaznam: Vfp.Interface.GVfpsesuDto;
        kopirovani: boolean;
        form: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        NastavOkEnabled(enabled: boolean): void;
        nastavPole(jmeno: string, stav: boolean): void;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GProstredkyScr extends GContentBase {
        ixp: string;
        ixs_pri: string;
        por_cis_nab: number;
        constPP: Vfp.Interface.GProstredkyConstDto;
        private srvCnt;
        view: Gordic.Data.View<Gordic.Vfp.Interface.GVfpapzaDto>;
        private filter;
        grid: JQuery;
        prepareContent(params: any): void;
        nastavTlacitka(): void;
        novy(): void;
        upravit(): void;
        smazat(): void;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GUpdProstredkyScr extends GContentBase {
        agenda: string;
        zaznam: Vfp.Interface.GVfpapzaDto;
        form: JQuery;
        isNovy: boolean;
        prepareContent(params: any): void;
        ok(): void;
        closing(ok: any): JQuery.Promise<any, any, any>;
        NastavOkEnabled(enabled: boolean): void;
    }
}
declare namespace Gordic.Vfp.WebClient {
    interface IGTypMasky {
        typMasky: string;
        /**
         * komentar
         * @type {number}
         */
        v: number;
    }
    export class GVfpVSScr extends GContentBase {
        zaznam: Gordic.Vfp.Interface.VfpspriDto;
        form: JQuery;
        change: boolean;
        prepareContent(params: any): void;
        NaplnMaska(): JQueryPromise<IGTypMasky[]>;
        kontrola(): void;
        ulozit(): void;
        generovat(): void;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        NastavKontrolaEnabled(enabled: boolean): void;
        closing(): {
            maska: string | null | undefined;
        };
    }
    export {};
}
declare namespace Gordic.Vfp.WebClient {
    class GVfpZadostiDTScr extends GContentBase {
        ixs_pri: string;
        ixs_esu: string;
        cis_por: number;
        por_cis_nab: number;
        titulek: string;
        onContentReady(): void;
    }
}
declare namespace Gordic.Vfp.WebClient {
    type TApplyDelegate = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamDokFiltersOptions(tema: string, Ico: string, odkud: string, cfuGf: Gordic.Data.GridFormat, hardFilter: Interface.GVfpFiltrDto | null, applyDelegate: TApplyDelegate): IGFilterPanelOptions;
}
declare namespace Gordic.Vfp.WebClient {
    type TApplyDelegateEl = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamElDokFiltersOptions(tema: string, odkud: string, useCB: boolean, applyDelegate: TApplyDelegateEl): IGFilterPanelOptions;
}
declare namespace Gordic.Vfp.WebClient {
    type TApplyDelegateEsu = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamEsuFiltersOptions(tema: string, Ico: string, applyDelegate: TApplyDelegateEsu): IGFilterPanelOptions;
}
declare namespace Gordic.Vfp.WebClient {
    class GVfpSeznamScr extends GContentBase {
        ap: Gordic.Pap.Interface.GPapSeznamAccessDto;
        Ico: string;
        genIxp: boolean;
        refreshData: boolean;
        private grid;
        private view;
        private previewController;
        private preevidenceData;
        filter: JQuery;
        filterDashBoard: Interface.GVfpFiltrDto;
        paramGvycza: number;
        isChanged: boolean;
        private menubarparametry;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        nastavEnableTlacitek(row?: Interface.VfpspriDto | null): void;
        obnovSeznam(): void;
        nactiDetail(): void;
        nastavTlacitka(): void;
        akceNavrhy(): void;
        akceUzavreni(): void;
        akceUzavreniZrusit(): void;
        akceUkonceni(): void;
        akceUkonceniZrusit(): void;
        akceUvolneni(): void;
        preevidence(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        vratData(): Pap.Interface.GPapStruDto[];
        novyDT(): void;
        ukony(): void;
        podani(ele: boolean): void;
        private registerPreview;
        closing(): JQuery.Promise<any, any, any>;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        naplnGridFormat(typEntity: any, techVlastnosti: any): Data.GridFormat<any>;
        getOpenDetailDelegate(): (cnt: any, grid: any, row: any) => void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
    }
}
declare namespace Gordic.Vfp.AppSettings {
    /**
     * Definice formulářů pro uživatelské nastavení
     *
     * @returns {Forms.Form[]} formuláře
     */
    function ListsSettingsForm(gin_gen_ixp: string): Forms.Form[];
}
declare namespace Gordic.Vfp.WebClient {
    class GVfpNovyPUScr extends GContentBase {
        title: string;
        taskId: string;
        Ico: string;
        genIxp: boolean;
        private grid;
        private previewController;
        ap: Gordic.Pap.Interface.GPapSeznamAccessDto;
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
        novyPripad(): void;
        akcePodani(ele: boolean): void;
        akceDetail(): void;
        nastavTlacitka(): void;
        nactiRadek(ixp: string, akce: string): void;
        columns(): Data.GridFormat<Interface.VfpspidDto>;
        private registerPreview;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GVfpSeznamAllDokScr extends GContentBase {
        taskId: string;
        ap: Gordic.Pap.Interface.GPapSeznamDokVZAccessDto;
        Ico: string;
        genIxp: boolean;
        refreshData: boolean;
        private grid;
        private previewController;
        private view;
        filter: JQuery;
        private filters;
        filterImpl: object;
        typEntity: GGridColumn<any>;
        techVlastnosti: GGridColumn<any>;
        private readonly warnDokLimit;
        private readonly dokLimit;
        private paramRcZobr;
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
        obnovSeznam(): void;
        akcePodani(ele: boolean): void;
        akcePredvyhodn(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        getOpenDetailDelegate(): (cnt: any, grid: any, row: any) => void;
        getOpenDetailDelegateVfp(): (cnt: any, grid: any, row: any) => void;
        akceDetail(): void;
        akceSchvalitPis(storno: boolean): void;
        akceUkonceni(storno: boolean): void;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        nastavTlacitka(): void;
        columns(): Data.GridFormat<Interface.VfpspidDto>;
        preevidenceEsu(): void;
        zmenaSubj(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        private registerPreview;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GVfpSeznamAllElDokScr extends GContentBase {
        title: string;
        taskId: string;
        private grid;
        private view;
        private previewController;
        ap: Gordic.Pap.Interface.GPapSeznamDokVZAccessDto;
        refreshData: boolean;
        filter: JQuery;
        filterImpl: object;
        private filters;
        private menubarparametry;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        nastavTlacitka(): void;
        private registerPreview;
        akcePodani(el: boolean): void;
        akceDetail(): void;
        akceSP(): void;
        akceUlozit(): void;
        akceZverejnit(): void;
        akceEvidElDok(): void;
        akceGenDokObr(): void;
        akceConverse(): void;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        columns(): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GVfpSeznamDokDTScr extends GContentBase {
        titulek: string;
        ixs_pri: string;
        genIxp: boolean;
        task_id: string;
        refreshData: boolean;
        private preevidenceData;
        private view;
        private viewEl;
        ap: Pap.Interface.GPapSeznamDokVZAccessDto;
        private previewController;
        filter: JQuery;
        private filters;
        grid: JQuery;
        gridEl: JQuery;
        isChanged: boolean;
        techVlastnosti: GGridColumn<any>;
        private srvMenu;
        private readonly warnDokLimit;
        private readonly dokLimit;
        private readonly seznamDokElDokVisible;
        private paramRcZobr;
        private menubarparametry;
        private readonly zapamatovatOdpovediUkony;
        private odpovedDotaz1;
        private odpovedDotaz2;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        columns(): Data.GridFormat<any>;
        obnovSeznam(): void;
        akcePodani(ele: boolean): void;
        getOpenDetailDelegate(): (cnt: any, grid: any, row: any) => void;
        getOpenDetailDelegateVfp(): (cnt: any, grid: any, row: any) => void;
        akceDetail(): void;
        akceSchvalitPis(storno: boolean): void;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        akcePredvyhodn(): void;
        akceNavrhy(): void;
        akceLokality(): void;
        closing(): JQuery.Promise<any, any, any>;
        nastavTlacitka(): void;
        private registerPreview;
        akceUkonceni(storno: boolean): void;
        akceStorno(storno: boolean): void;
        preevidenceEsu(): void;
        zmenaSubj(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        akceKontrolaMetadat(): void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
        dotaz1(otazka: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GVfpSeznamUchazeciScr extends GContentBase {
        typ: string;
        Ico: string;
        private paramPricpr;
        private paramReaucz;
        private grid;
        private view;
        private previewController;
        filter: JQuery;
        genIxp: boolean;
        refreshData: boolean;
        private filters;
        doplnit: boolean;
        filterImpl: object;
        private menubarparametry;
        sumarRegi: boolean;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        doplneni(): void;
        nastavTlacitka(): void;
        columns(): Data.GridFormat<any>;
        ukony(): void;
        podani(ele: boolean): void;
        detail(): void;
        private registerPreview;
        sprava(vyhodnocenych: boolean): void;
        UpravVyber(seznam: Vfp.Interface.GUchazeciDto[]): Interface.GUchazeciDto[];
        obnovSeznam(): void;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GVfpUchazeciDetail extends GContentBase {
        data: Vfp.Interface.GUchazeciDto;
        onContentReady(): void;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GVfpSeznamDokEsuScr extends GContentBase {
        titulek: string;
        ixs_esu: string;
        ixs_pri: string;
        genIxp: boolean;
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
        private ixsPriSave;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        columns(): Data.GridFormat<any>;
        obnovSeznam(): void;
        akcePodani(ele: boolean): void;
        akceDetail(): void;
        akceSchvalitPis(storno: boolean): void;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        akcePredvyhodn(): void;
        akceNavrhy(): void;
        akceLokality(): void;
        closing(): JQuery.Promise<any, any, any>;
        nastavTlacitka(): void;
        private registerPreview;
        akceUkonceni(storno: boolean): void;
        akceStorno(storno: boolean): void;
        preevidenceEsu(): void;
        zmenaSubj(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
    }
}
declare namespace Gordic.Vfp.WebClient {
    class GVyberStavuTabScr extends GContentBase {
        taskId: string;
        tab: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(ok: any): JQuery.Promise<any, any, any>;
    }
}
