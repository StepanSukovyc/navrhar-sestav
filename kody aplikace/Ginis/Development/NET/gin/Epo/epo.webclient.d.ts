declare namespace Gordic.Epo.WebClient.EpoPrefabsAll {
    function vytvorPrehledFormular(nabedo: boolean, novy: boolean, priVisible: boolean, readOnly: any): Forms.Form;
    interface EpoHromadneOperaceOptions {
        parentContent: GContent;
        data: Epo.Interface.EpospidDto[] | JQueryPromise<Epo.Interface.EpospidDto[]>;
        title: string;
        akce: string;
        description: string;
        nazevAkce: string;
        completeDelegate: (view: any) => void;
        allDok: boolean;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    function EpoHromadneOperace(options: EpoHromadneOperaceOptions): void;
    function VratFormat(): Data.GridFormat<any>;
    interface EpoHOCommonOptions {
        parentContent: GContent;
        data: Epo.Interface.EpospidDto[] | JQueryPromise<Epo.Interface.EpospidDto[]>;
        zrusit: boolean;
        completeDelegate: (view: any) => void;
        allDok: boolean;
        openDetailDelegate?: (cnt: GContent, grid: JQuery, row: any) => void;
    }
    function SchvalitPis(options: EpoHOCommonOptions): void;
    function StornoPis(options: EpoHOCommonOptions): void;
    function UkonceniPis(options: EpoHOCommonOptions): void;
    function PreevidenceSubj(options: EpoHOCommonOptions): void;
    interface EpoHOSpravaOptions {
        parentContent: GContent;
        data: Epo.Interface.GUchazeciDto[] | JQueryPromise<Epo.Interface.GUchazeciDto[]>;
        nabedo: number;
        paramNabedo: boolean;
        completeDelegate: (view: any) => void;
    }
    interface EpoHromadneOperaceEsuOptions {
        parentContent: GContent;
        data: Epo.Interface.GUchazeciDto[] | JQueryPromise<Epo.Interface.GUchazeciDto[]>;
        title: string;
        akce: string;
        description: string;
        nabedo: number;
        paramNabedo: boolean;
        completeDelegate: (view: any) => void;
    }
    function SpravaStavu(options: EpoHOSpravaOptions): void;
    function EpoHromadneOperaceEsu(options: EpoHromadneOperaceEsuOptions): void;
    function VratFormatEsu(paramNabedo: boolean): Data.GridFormat<any>;
}
declare namespace Gordic.Epo.Dialogs {
    function GEpoSeznam(parentContent: GContent, opt: {
        filtr: Pap.Interface.GPapDashboardFiltryDto | null;
        taskId: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GEpoSeznamAllDok(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GEpoSeznamAllElDok(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
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
    function GEpoSeznamUchazeci(parentContent: GContent, opt: GUchazeciOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GEpoSeznamDokPO(parentContent: GContent, opt: {
        ixs_pri: string;
        doplnit: boolean;
        ac_ag: string;
        task_id: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        isChanged: boolean;
    } | undefined>;
    function GEpoDetailDT(parentContent: GContent, opt: {
        data: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        isChanged: boolean;
    } | undefined>;
    function GEpoSoutezePO(parentContent: GContent, opt: {
        ixs_pri: string;
        ac: string;
        nazev: string;
        priz_nabedo: number;
        soutez_po: string;
        s_po: number;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    interface GDatPrubehScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
    }
    interface GDatPrubehScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GDatPrubehScr(parentContent: GContent, opt: GDatPrubehScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GDatPrubehScrRetVal | undefined>;
    interface GNovaDatPrubehScrOptions {
        /**
         * ixs_pri
         * @type {string}
         */
        ixs_pri: string;
        /**
         * dnes
         * @type {Date}
         */
        dnes: Date;
    }
    interface GNovaDatPrubehScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        navrat: boolean;
    }
    function GNovaDatPrubehScr(parentContent: GContent, opt: GNovaDatPrubehScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GNovaDatPrubehScrRetVal | undefined>;
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
        novyPO: boolean;
    }
    interface GDetailScrRetVal {
        /**
         * navrat
         * @type {boolean}
         */
        isChanged: boolean;
    }
    function GDetailScr(parentContent: GContent, opt: GDetailScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GDetailScrRetVal | undefined>;
    interface GEpoUchazeciDetailScrOptions {
        /**
         * data
         * @type {Epo.Interface.GUchazeciDto}
         */
        data: Epo.Interface.GUchazeciDto;
    }
    function GEpoUchazeciDetail(parentContent: GContent, opt: GEpoUchazeciDetailScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    interface IGEpoPodaniOptions extends GDetailScrOptions {
        genIxp: boolean;
    }
    function GEpoPodani(parentContent: GContent, options: IGEpoPodaniOptions): JQuery.PromiseBase<Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any, Pap.Interface.GPodaniDto, any, any>;
    function GEpoSeznamFinancovani(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GEpoNovyPU(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GEpoSeznamDokEsu(parentContent: GContent, opt: {
        ixs_esu: string;
        ixs_pri: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    interface GSeznamNabedoScrOptions {
        /**
         * string
         * @type {string}
         */
        ixs_esu: string | null;
    }
    function GEpoSeznamNabedo(parentContent: GContent, opt: GSeznamNabedoScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GDetailScrRetVal | undefined>;
    interface GAddUpdNabedoScrOptions {
        /**
         * string
         * @type {string}
         */
        zaznam: Epo.Interface.GEposesuDto | null;
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
    interface GEpoDotazPodaniParamScrOptions {
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
    interface GEpoDotazPodaniParamScrRetVal {
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
    function GEpoDotazPodaniNabedo(parentContent: GContent, opt: GEpoDotazPodaniParamScrOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<GEpoDotazPodaniParamScrRetVal | undefined>;
    function GVyberStavuTabScr(parentContent: GContent, opt: null, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<Pap.Interface.GPapDashboardFiltryDto | null>;
}
declare namespace Gordic.Epo {
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
        nactiDetail(ixs_pri: string): void;
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
declare namespace Gordic.Epo.WebClient {
    class GEpoDashboard extends GContentBase {
        private data;
        private rok;
        private gdb_panel;
        private paramSulPri;
        private limitDashBoard1;
        private limitDashBoard4;
        private limitDashBoard3;
        onContentReady(): void;
        nactiDetail(ixs_pri: string): void;
        nactiSeznamBezFin(id: number): void;
        nactiSeznam(id: number, kniha: string): void;
        Kontrolapristupu(): boolean;
    }
}
declare namespace Gordic.Epo.WebClient {
    type DataDto = Gordic.Epo.Interface.EpospriDto;
    type UsedComponents = Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DataDto>;
    class GEpoDetailPOScr extends GDetailBuilderContent<UsedComponents> {
        title: string;
        detailDto: Gordic.Epo.Interface.EpospriDto;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        isChanged: boolean;
        isTskParam: boolean;
        finChanged: boolean;
        kpiData: Decimal[];
        genIxp: boolean;
        podaniEnabled: boolean;
        ac: Gordic.Pap.Interface.GPapDetailAccessDto;
        lzePredat: boolean;
        lzePridelit: boolean;
        lzePrevzit: boolean;
        AktSubrady: number;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        akceUkony(): void;
        NastavTlacitka(): void;
        NastavTlacitkaPoZmeneAc(): void;
        akceProfilFinancovani(): void;
        akceFinancovani(): void;
        akceSouteze(): void;
        akceKlicovaSlova(): void;
        akceNavrhy(): void;
        akceCerpani(): void;
        akceDatPrubeh(): void;
        akceSchvaleni(): void;
        akceSchvaleniZrusit(): void;
        NactiData(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        dotaz(otazka: string): JQueryPromise<any>;
        vytvorFormPO(): Forms.Form;
        vytvorFormZU(): Forms.Form;
        vytvorFormKomentar(): Forms.Form;
        akcePodani(): void;
        akceUkonceni(): void;
        akceUkonceniZrusit(): void;
        akceRozpoctoveZapisy(): void;
        preevidence(): void;
        closing(): JQuery.Promise<any, any, any>;
        akceFinancovaniKontr(): void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
        kontrola(akce: string): string;
    }
}
declare namespace Gordic.Epo.WebControls {
    class GDatPrubehScr extends GContentBase {
        taskId: string;
        private srvCnt;
        ixs_pri: string;
        constDatPrubeh: Gordic.Epo.Interface.GDatPrubehConstDto;
        view: Gordic.Data.View;
        isVlastnik: boolean;
        zmena: boolean;
        form: JQuery;
        tab: JQuery;
        private filter;
        gridSeznam: JQuery;
        prepareContent(params: any): void;
        nastavTlacitka(): void;
        aktivita(aktivita: number): void;
        nova(): void;
        nactiView(): void;
    }
}
declare namespace Gordic.Epo.WebControls {
    class GNovaDatPrubehScr extends GContentBase {
        taskId: string;
        ixs_pri: string;
        dnes: Date;
        form: JQuery;
        zmena: boolean;
        prepareContent(params: any): void;
        nastavOkEnabled(): void;
        uloz(): void;
        closing(): boolean;
    }
}
declare namespace Gordic.Epo.WebClient {
    type DataDtoDet = Gordic.Epo.Interface.EpospidDto;
    type UsedComponentsDet = Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DataDtoDet>;
    class GEpoDetail extends GDetailBuilderContent<UsedComponentsDet> {
        modPU: boolean;
        ixp: string;
        ktg_typ: number;
        rok: number;
        ele: boolean;
        ixs_krk: string;
        ixs_esu: string;
        isTskParam: boolean;
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
        genIxp: boolean;
        isChanged: boolean;
        data: Interface.GParamDetailDto;
        enableKategorie: boolean;
        zaklTab: JQuery<HTMLElement>;
        prosloOCR: boolean;
        dotazPF: boolean;
        epo_def_nabedo: string;
        preevidenceData: Pap.Interface.GParametryPreevidenceDto;
        lzePredat: boolean;
        lzePridelit: boolean;
        lzePrevzit: boolean;
        uzavritBezpodminecne: boolean;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void;
        schvaleni(): void;
        schProst(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        financovani(): void;
        vlastnosti(): void;
        storno(): void;
        odschvaleni(): void;
        nastavMenu(): void;
        saveData(odkud: string, nactiDetail?: boolean): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        vratPole(key: any): any;
        getData(odkud: string): JQuery.Promise<any, any, any>;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        ulozData1(): void;
        ulozData2(): void;
        ulozData3(): void;
        ulozData6(): void;
        ulozData8(): void;
        ulozData9(): void;
        ulozDataHr(): boolean;
        onDetailBuilderBuild(builder: any): void;
        nactiDetail(): void;
        closing(): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        detailChanged(): boolean;
        zmenaHr(): boolean;
        dotSubj(): void;
        akceProces(): void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
        kontrola(akce: string): string;
    }
}
declare namespace Gordic.Epo.WebClient.PrefabsEpo {
    interface ZakladniUdajeOptions {
        readOnly: boolean;
        content: GContent;
        puvSchv: Decimal;
        acAgMaska: string | null;
        labels: Interface.GDetailLabelsDto;
        enabled: Interface.GDetailEnableDto;
        nadebo: string;
    }
    function vytvorZakladniUdajeFormular(options: ZakladniUdajeOptions): Forms.Form;
    interface BlizsiUrceniOptions {
        readOnly: boolean;
        contentHl: JQuery;
        toolTipPlan: string;
        that: GContent;
    }
    function vytvorBlizsiUrceniFormular(options: BlizsiUrceniOptions): Forms.Form;
    function KontrolaFinOdDo(fin_od: number | null, fin_do: number | null, that: GContent): void;
    interface Formular03Options {
        readOnly: boolean;
        ktg_typ: number;
        that: GContent;
        labels: Interface.GDetailLabelsDto;
        enable: Interface.GDetailEnableDto;
        ac_ag_zu: boolean;
        acAgMaska: string;
        nadTyp02: number;
    }
    function vytvorFormular03(options: Formular03Options): Forms.Form;
    interface Formular04Options {
        readOnly: boolean;
        enabled: Interface.GDetailEnableDto;
        labels: Pap.Interface.GTab04VlastnostiDto;
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
        nadTyp03: number;
        soutez: string;
    }
    function vytvorFormularSubjekt(options: FormSubjektOptions): Forms.Form;
    interface FormularSoutezOptions {
        readOnly: boolean;
        ico: string;
        ucs: string;
        rok: number;
        dat_s_lhu_puv: Date | null;
        that: GContent;
        labels: Interface.GDetailLabelsDto;
        enable: Interface.GDetailEnableDto;
    }
    function vytvorFormularSoutez(options: FormularSoutezOptions): Forms.Form;
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
    interface Formular11Options {
        readOnly: boolean;
        ico: string;
        ucs: string;
        rok: number;
        par_def_datzak: string;
        dat_s_lhu_puv: Date | null;
        that: GContent;
        soutez: string;
        lim_zac: number;
        ixs_pri: string;
        is137: boolean;
        enable: Interface.GDetailEnableDto;
        labels: Interface.GDetailLabelsDto;
    }
    function vytvorFormular11(options: Formular11Options): Forms.Form;
    function dotaz(titulek: string, otazka: string, that: GContent): JQueryPromise<any>;
    function NaplnVlastnosti04(soutez: string | null | undefined): Pap.Interface.GTab04VlastnostiDto;
    function NaplnDisable(vl_soutez: string, pole_s: ((Date | null)[]) | null, pole_p: ((Date | null)[]) | null, nadTyp02: number): Interface.GDetailEnableDto;
    function PorovnejDatum(date1: Date, date2: Date): string;
    interface INabedoPrizData {
        priz_nabedo?: string;
        v: number;
    }
}
declare namespace Gordic.Epo.WebClient {
    class GEpoSoutezePOScr extends GContentBase {
        taskId: string;
        ixs_pri: string;
        ixs_esu: string;
        cis_por: number;
        por_cis_nab: number;
        titulek: string;
        sav_cis_por: number;
        sav_por_cis_nab: number;
        priz_nabedo: number;
        soutez_po: string;
        s_po: number;
        readOnly: boolean;
        private savedRec;
        private grid;
        private view;
        private isChanged;
        private menubarparametry;
        private novyZaznam;
        form: JQuery;
        onContentReady(): void;
        akceNovy(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        akceUlozit(zeSelection: boolean): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        obnovSeznam(): void;
        nastavTlacitka(): void;
    }
}
declare namespace Gordic.Epo.WebClient {
    type TApplyDelegate = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamDokFiltersOptions(tema: string, Ico: string, odkud: string, cfuGf: Gordic.Data.GridFormat, hardFilter: Interface.GEpoFiltrDto | null, applyDelegate: TApplyDelegate): IGFilterPanelOptions;
    interface IPrizViewData {
        priz_view: string;
        v: number;
    }
}
declare namespace Gordic.Epo.WebClient {
    type TApplyDelegateEl = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamElDokFiltersOptions(tema: string, odkud: string, useCB: boolean, applyDelegate: TApplyDelegateEl): IGFilterPanelOptions;
}
declare namespace Gordic.Epo.WebClient {
    type TApplyDelegateEsu = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamEsuFiltersOptions(tema: string, Ico: string, applyDelegate: TApplyDelegateEsu): IGFilterPanelOptions;
}
declare namespace Gordic.Epo.WebClient {
    class GEpoSeznamScr extends GContentBase {
        agenda: string;
        ap: Gordic.Pap.Interface.GPapSeznamAccessDto;
        Ico: string;
        genIxp: boolean;
        taskId: string;
        private grid;
        private previewController;
        private view;
        private preevidenceData;
        filterDashBoard: Interface.GEpoFiltrDto;
        refreshData: boolean;
        filter: JQuery;
        private filters;
        private paramNabedo;
        paramGvycza: number;
        private isChanged;
        private menubarparametry;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        nastavEnableTlacitek(): void;
        nactiDetail(): void;
        nastavTlacitka(): void;
        akceNavrhy(): void;
        akceUzavreni(): void;
        akceUzavreniZrusit(): void;
        akceUkonceni(): void;
        akceUkonceniZrusit(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        dotaz(otazka: string): JQueryPromise<any>;
        akceUvolneni(): void;
        novyPO(): void;
        private registerPreview;
        ukony(): void;
        getOpenDetailDelegate(): (cnt: any, grid: any, row: any) => void;
        preevidence(): void;
        podani(ele: boolean): void;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        columns(): Data.GridFormat<any>;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
        obnovSeznam(): void;
    }
}
declare namespace Gordic.Epo.AppSettings {
    /**
     * Definice formulářů pro uživatelské nastavení
     *
     * @returns {Forms.Form[]} formuláře
     */
    function ListsSettingsForm(gin_gen_ixp: string): Forms.Form[];
}
declare namespace Gordic.Epo.WebClient {
    class GEpoNovyPUScr extends GContentBase {
        title: string;
        taskId: string;
        Ico: string;
        genIxp: boolean;
        private grid;
        private previewController;
        ap: Gordic.Pap.Interface.GPapSeznamAccessDto;
        private paramNabedo;
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
        columns(): Data.GridFormat<any>;
        private registerPreview;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
    }
}
declare namespace Gordic.Epo.WebClient {
    class GEpoSeznamAllDokScr extends GContentBase {
        taskId: string;
        agenda: string;
        ap: Gordic.Pap.Interface.GPapSeznamDokVZAccessDto;
        Ico: string;
        private grid;
        private view;
        private previewController;
        filter: JQuery;
        private filters;
        private genIxp;
        doplnit: boolean;
        filterImpl: object;
        techVlastnosti: GGridColumn<any>;
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
        refreshData: boolean;
        onContentReady(): void;
        nastavTlacitka(): void;
        columns(): Data.GridFormat<any>;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        podani(ele: boolean): void;
        private registerPreview;
        getOpenDetailDelegate(): (cnt: any, grid: any, row: any) => void;
        getOpenDetailDelegateEpo(): (cnt: any, grid: any, row: any) => void;
        detail(): void;
        akceSchvalitPis(storno: boolean): void;
        akceUkonceni(storno: boolean): void;
        preevidenceEsu(): void;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
        vratData(): Pap.Interface.GPapStruDto[];
        obnovSeznam(): void;
    }
}
declare namespace Gordic.Epo.WebClient {
    class GEpoSeznamAllElDokScr extends GContentBase {
        taskId: string;
        private grid;
        ap: Gordic.Pap.Interface.GPapSeznamDokVZAccessDto;
        private previewController;
        private view;
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
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        columns(): Data.GridFormat<any>;
        akceSP(): void;
        akceUlozit(): void;
        akceZverejnit(): void;
        akceEvidElDok(): void;
        akceGenDokObr(): void;
        akceConverse(): void;
    }
}
declare namespace Gordic.Epo.WebClient {
    class GEpoSeznamDokPOScr extends GContentBase {
        titulek: string;
        ixs_pri: string;
        task_id: string;
        isChanged: boolean;
        private view;
        private viewEl;
        private previewController;
        private grid;
        refreshData: boolean;
        ap: Pap.Interface.GPapSeznamDokVZAccessDto;
        filter: JQuery;
        private filters;
        techVlastnosti: GGridColumn<any>;
        private readonly seznamDokElDokVisible;
        private readonly warnDokLimit;
        private readonly dokLimit;
        private menubarparametry;
        private genIxp;
        private readonly zapamatovatOdpovediUkony;
        private odpovedDotaz1;
        private odpovedDotaz2;
        private paramNabedo;
        private preevidenceData;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        columns(): Data.GridFormat<any>;
        nastavTlacitka(): void;
        akcePodani(ele: boolean): void;
        getOpenDetailDelegate(): (cnt: any, grid: any, row: any) => void;
        getOpenDetailDelegateEpo(): (cnt: any, grid: any, row: any) => void;
        akceDetail(): void;
        akceSchvalitPis(storno: boolean): void;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        akceStorno(storno: boolean): void;
        akceUkonceni(storno: boolean): void;
        preevidenceEsu(): void;
        closing(): JQuery.Promise<any, any, any>;
        private registerPreview;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        akceKontrolaMetadat(): void;
        predani(): void;
        prideleni(): void;
        prevzeti(): void;
        obnovSeznam(): void;
        vratData(): Pap.Interface.GPapStruDto[];
    }
}
declare namespace Gordic.Epo.WebClient {
    class GEpoSeznamUchazeciScr extends GContentBase {
        typ: string;
        Ico: string;
        private grid;
        private view;
        private previewController;
        filter: JQuery;
        refreshData: boolean;
        private filters;
        doplnit: boolean;
        genIxp: boolean;
        filterImpl: object;
        nabedoPar: boolean;
        private menubarparametry;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        nabidky(): void;
        obnovSeznam(): void;
        ukony(): void;
        nastavTlacitka(): void;
        columns(): Data.GridFormat<any>;
        podani(ele: boolean): void;
        detail(): void;
        private registerPreview;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        dotaz(otazka: string): JQueryPromise<any>;
        sprava(): void;
        UpravVyber(seznam: Epo.Interface.GUchazeciDto[], typ: number): Interface.GUchazeciDto[];
        KontrolaNabedo(seznam: Epo.Interface.GUchazeciDto[]): 0 | 1 | 2;
    }
}
declare namespace Gordic.Epo.WebClient {
    class GEpoUchazeciDetail extends GContentBase {
        data: Epo.Interface.GUchazeciDto;
        onContentReady(): void;
    }
}
declare namespace Gordic.Epo.WebClient {
    class GEpoSeznamDokEsuScr extends GContentBase {
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
        nastavTlacitka(): void;
        columns(): Data.GridFormat<any>;
        obnovSeznam(): void;
        akcePodani(ele: boolean): void;
        akceDetail(): void;
        akceSchvalitPis(storno: boolean): void;
        dotaz(titulek: string, otazka: string): JQueryPromise<any>;
        akceStorno(storno: boolean): void;
        akceUkonceni(storno: boolean): void;
        preevidenceEsu(): void;
        closing(): JQuery.Promise<any, any, any>;
        private registerPreview;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
    }
}
declare namespace Gordic.Epo.WebClient {
    class GEpoSeznamNabedoScr extends GContentBase {
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
declare namespace Gordic.Epo.WebClient {
    class GAddUpdNabedoScr extends GContentBase {
        taskId: string;
        zaznam: Epo.Interface.GEposesuDto;
        readOnly: boolean;
        dat_pri: Date;
        form: JQuery;
        novyZaznam: boolean;
        prepareContent(params: any): void;
        ok(): void;
    }
}
declare namespace Gordic.Epo.WebClient {
    class GVyberStavuTabScr extends GContentBase {
        taskId: string;
        tab: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(ok: any): JQuery.Promise<any, any, any>;
    }
}
