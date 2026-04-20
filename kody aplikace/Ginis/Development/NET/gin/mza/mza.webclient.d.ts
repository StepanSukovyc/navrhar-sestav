declare namespace Gordic.Mza.Dialogs {
    interface GWsNenOptions {
        /**
         * string
         * @type {string}
         */
        service: string;
        /**
               * taskId
               * @type {string}
               */
        taskId: string;
    }
    function GMzaWsNenScr(parentContent: GContent, opt: GWsNenOptions, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function GMzaSeznam(parentContent: GContent, opt: {
        filtr: Pap.Interface.GPapDashboardFiltryDto | null;
        /**
         * taskId
         * @type {string}
         */
        taskId: string;
        uloha: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    function GVyberStavuTabScr(parentContent: GContent, opt: null, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<Pap.Interface.GPapDashboardFiltryDto | null>;
    function GMzaDetailVZ(parentContent: GContent, opt: {
        data: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        isChanged: boolean;
    } | undefined>;
    function GMzaDodavateleScr(parentContent: GContent, opt: {
        doplnit: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<null>;
    function GMzaUtvaryScr(parentContent: GContent, opt: {
        typ: string;
        /**
         * taskId
         * @type {string}
         */
        taskId: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<null>;
    function GMzaRoleScr(parentContent: GContent, opt: null, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<null>;
    function GMzaOsobyScr(parentContent: GContent, opt: {
        doplnit: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<null>;
    function GMzaNeprirazeneVZScr(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
}
declare namespace Gordic.Mza.AppSettings {
    /**
     * Definice formulářů pro uživatelské nastavení
     *
     * @returns {Forms.Form[]} formuláře
     */
    function ListsSettingsForm(gin_gen_ixp: string): Forms.Form[];
}
declare namespace Gordic.Mza.WebClient {
}
declare namespace Gordic.Mza {
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
        nactiWS(service: string): void;
        Kontrolapristupu(paramSulPri: string): boolean;
        nactiDetail(ixs_zak: string, paramSulPri: string): void;
        nactiSeznamBezFin(id: number): void;
        nactiSeznam(id: number, kniha: string): void;
    }
}
declare namespace Gordic.Mza.WebClient.MzaPrefabsAll {
    function GridColumnPodani(): Data.GridFormat<any>;
    function GridColumnOsoby(typTabulky: string, doplnit?: boolean): Data.GridFormat<any>;
    function GridColumnKomunikace(typTabulky: string): Data.GridFormat<any>;
    function GridColumnUtvary(typTabulky: string): Data.GridFormat<any>;
    function GridColumnRole(typTabulky: string): Data.GridFormat<any>;
    function GridColumnSeznamZp(): Data.GridFormat<any>;
    function GridColumnVZ(typTabulky: string): Data.GridFormat<any>;
    function GridColumnDokument(typTabulky: string): Data.GridFormat<any>;
    function GridColumnPolPredm(typTabulky: string): Data.GridFormat<any>;
    function GridColumnPolPredmParametry(typTabulky: string): Data.GridFormat<any>;
    function GridColumnSmlouva(typTabulky: string): Data.GridFormat<any>;
    function GridColumnPlneniSmlouvy(typTabulky: string): Data.GridFormat<any>;
    function GridColumnSubdodavatelSmlouvy(typTabulky: string): Data.GridFormat<any>;
    function GridColumnDodavatelSmlouvy(typTabulky: string): Data.GridFormat<any>;
    function GridColumnDodatekSmlouvy(typTabulky: string): Data.GridFormat<any>;
    function GridColumnKontaktniOsoba(): Data.GridFormat<any>;
    function GridColumnVybraniDodavatele(typTabulky: string): Data.GridFormat<any>;
    function GridColumnUchazeci(typTabulky: string): Data.GridFormat<any>;
}
declare namespace Gordic.Mza.WebClient {
    interface IGPrizCast {
        prizCast?: string;
        v: number;
    }
    type DataDto = Gordic.Pap.Interface.GMzatzakDto;
    type MzaDetailUsedComponents = Gordic.Wfl.WebClient.GWflFKSeznamExtension & Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DataDto>;
    class GMzaDetailVZScr extends GDetailBuilderContent<MzaDetailUsedComponents> {
        detailDto: Gordic.Pap.Interface.GDetailDto;
        autorLogu: boolean;
        autorLoguKom: boolean;
        private isContentOpened;
        rza_rad_aktnen: string;
        isChanged: boolean;
        finChanged: boolean;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        aktualizuj(): void;
        smlouvy(): void;
        NactiData(): void;
        closing(): JQuery.Promise<any, any, any>;
        dotaz(otazka: string): JQueryPromise<any>;
        vytvorFormKS(): Forms.Form;
        vytvorFormPU(): Forms.Form;
        vytvorFormKO(): Forms.Form;
        vytvorFormTL(): Forms.Form;
        vytvorFormRI(): Forms.Form;
        vytvorFormDotacniTitul(): Forms.Form;
        vytvorHlavickovyFormular(): Forms.Form;
    }
}
declare namespace Gordic.Mza.WebClient {
    interface IGPrizCast {
        prizCast?: string;
        v: number;
    }
    type DataSmlDto = Gordic.Pap.Interface.GMzatsmlDto;
    type MzaSmlDetailUsedComponents = Gordic.Wfl.WebClient.GWflFKSeznamExtension & Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DataSmlDto>;
    class GMzaDetailSmlScr extends GDetailBuilderContent<MzaSmlDetailUsedComponents> {
        detailSmlDto: Gordic.Pap.Interface.GDetailSmlouvyDto;
        isChanged: boolean;
        finChanged: boolean;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        NactiData(): void;
        closing(): JQuery.Promise<any, any, any>;
        dotaz(otazka: string): JQueryPromise<any>;
        vytvorFormSmlouva(): Forms.Form;
        vytvorHlavickovyFormular(): Forms.Form;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GMzaSeznamSmlScr extends GContentBase {
        Ico: string;
        refreshData: boolean;
        private grid;
        private view;
        private previewController;
        private ixs_zak;
        private menubarparametry;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        onContentReady(): void;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        detail(): void;
        nastavTlacitka(): void;
        private registerPreview;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazDodatkyScr extends GContentBase {
        dodatky: Pap.Interface.GMzatsdoDto[];
        dokumenty: Pap.Interface.GMzatdonDto[];
        document: GDocument;
        tab: JQuery;
        gridHlav: JQuery;
        gridPol: JQuery;
        prepareContent(params: any): void;
        nastavTlacitko(): void;
        otevrit(id_don_ci: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazDodavateleSmlScr extends GContentBase {
        view: Gordic.Data.View;
        tab: JQuery;
        dodavatele: Pap.Interface.GMzatdosDto[];
        prepareContent(params: any): void;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazPlneniSmlouvyScr extends GContentBase {
        view: Gordic.Data.View;
        tab: JQuery;
        plneni: Pap.Interface.GMzatsplDto[];
        prepareContent(params: any): void;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazSmlouvyScr extends GContentBase {
        taskId: string;
        smlouvy: Pap.Interface.GMzatsmlDto[];
        view: Gordic.Data.View;
        tab: JQuery;
        gridSml: JQuery;
        prepareContent(params: any): void;
        detail(): void;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazSubdodavateleScr extends GContentBase {
        view: Gordic.Data.View;
        tab: JQuery;
        subdodavatele: Pap.Interface.GMzatssuDto[];
        prepareContent(params: any): void;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazDodavateleScr extends GContentBase {
        view: Gordic.Data.View;
        tab: JQuery;
        dodavatele: Pap.Interface.GMzatzvdDto[];
        prepareContent(params: any): void;
    }
    function GridColumnDodavatele(): Data.GridFormat<any>;
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazDokumentScr extends GContentBase {
        taskId: string;
        zaznam: Pap.Interface.GMzatdonDto;
        document: GDocument;
        form: JQuery;
        prepareContent(params: any): void;
        otevrit(): JQueryPromise<any>;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazKomunikaciScr extends GContentBase {
        ixs_zak: string;
        system: boolean;
        gridPol: JQuery;
        viewPol: Gordic.Data.View;
        tab: JQuery;
        document: GDocument;
        prepareContent(params: any): void;
        definiceGridPol(div: any): void;
        nastavTlacitkaPol(radek: any): void;
        otevrit(id_don_ci: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazPredmetyScr extends GContentBase {
        predmet: Pap.Interface.GMzatprzDto[];
        polozky: Pap.Interface.GMzatpppDto[];
        tab: JQuery;
        prepareContent(params: any): void;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazUchazeceScr extends GContentBase {
        view: Gordic.Data.View;
        uchazeci: Pap.Interface.GMzatzucDto[];
        tab: JQuery;
        prepareContent(params: any): void;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazUkonyScr extends GContentBase {
        system: boolean;
        ixs_zak: string;
        tab: JQuery;
        prepareContent(params: any): void;
        columns(): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GZobrazZadDokumentyScr extends GContentBase {
        taskId: string;
        dokumenty: Pap.Interface.GMzatdonDto[];
        document: GDocument;
        tab: JQuery;
        view: Gordic.Data.View;
        gridDok: JQuery;
        prepareContent(params: any): void;
        otevrit(id_don_ci: string): JQueryPromise<any>;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GMzaDodavateleTabScr extends GContentBase {
        doplnit: boolean;
        tab: JQuery;
        private viewHlav;
        private gridHlav;
        private gridPol;
        private viewPol;
        prepareContent(params: any): void;
        nastavEnableTlacitek(): void;
        historie(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        private parovani;
        private gridcolumnEsu;
    }
}
declare namespace Gordic.Mza.WebClient {
    type TApplyDelegate = (ev: JQuery.TriggeredEvent, obj: any) => void;
    function getSeznamDokFiltersOptions(tema: string, Ico: string, odkud: string, cfuGf: Gordic.Data.GridFormat, hardFilter: Mza.Interface.GMzaFiltrDto | null, applyDelegate: TApplyDelegate): IGFilterPanelOptions;
    interface IAnoNeData {
        text: string;
        v: number;
    }
}
declare namespace Gordic.Search.Mza {
    class GMzaDokladSearchResolver extends Components.Search.GBaseSearchResolver {
        readonly typeGuesser: Utils.GTypeGuesser;
        private readonly logger;
        /**
         * Zde vracíme identifikátor resolveru.
         */
        protected getDefaultId(): string;
        /**
         * Zde vracíme informace o doméně resolveru.
         */
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        private readonly fuzzySearch;
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GMzaWsNenScr extends GContentBase {
        taskId: string;
        service: string;
        implIxpDen: string;
        form: JQuery;
        view1: Gordic.Data.View;
        view2: Gordic.Data.View;
        view3: Gordic.Data.View;
        view4: Gordic.Data.View;
        view5: Gordic.Data.View;
        view6: Gordic.Data.View;
        view7: Gordic.Data.View;
        view8: Gordic.Data.View;
        view9: Gordic.Data.View;
        view10: Gordic.Data.View;
        view11: Gordic.Data.View;
        view12: Gordic.Data.View;
        view13: Gordic.Data.View;
        view14: Gordic.Data.View;
        view15: Gordic.Data.View;
        view16: Gordic.Data.View;
        grid1: JQuery;
        grid2: JQuery;
        grid3: JQuery;
        grid4: JQuery;
        grid5: JQuery;
        grid6: JQuery;
        grid7: JQuery;
        grid8: JQuery;
        grid9: JQuery;
        grid10: JQuery;
        grid11: JQuery;
        grid12: JQuery;
        grid13: JQuery;
        grid14: JQuery;
        grid15: JQuery;
        grid16: JQuery;
        document: GDocument;
        onContentReady(): void;
        nastavEnableTlacitekDok(row: Pap.Interface.GMzatdonDto, cisloSlozky: any): void;
        stahnoutDD(): void;
        otevritAct(id?: any, args?: any): JQueryPromise<any>;
        zjistiDatumDavky(): Date | null;
        stahnoutActKom(id_don_ci: string, por_cis: number): void;
        stahnoutAct(id_don_ci: string, por_cis: number): void;
        zpracovat(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        smazat(vsechno: boolean): void;
        NastavOkEnabledKomunikaceZP(): void;
        ok(): void;
        zjistiSeznamPodaniZp(): void;
        zjistiSeznamKomunikaceZp(): void;
        zjistiZp(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        nastavAkceDavky(): void;
        zjistiSeznamZp(): void;
        zjistiDodavatele(): void;
        nastavTabsSeznamZP(retVal: Pap.Interface.GSeznamZpOutDto): void;
        nastavTabsDodavatele(retVal: Pap.Interface.GDodavateleOutDto): void;
        nastavTabsKomunikaceZP(retVal: Pap.Interface.GMzaKomunikaceDto): void;
        nastavTabsDetailZP(retVal: Pap.Interface.GZpOutDto): void;
        nastavTabsPodani(retVal: Pap.Interface.GPodaniZpOutDto): void;
        zjistiOrgStru(): void;
        nastavTabsKomunikace(retVal: Pap.Interface.GMzaKomunikaceDto): void;
        nastavTabsOrgStru(retVal: Pap.Interface.GOrgStruOutDto): void;
        archiv(): void;
        nastavData(retVal: Pap.Interface.GMzaArchivOutDto): void;
        test(): void;
        prvotniImportZp(): void;
        ukonyZp(): 0 | undefined;
        podaniZp(): 0 | undefined;
        NastavOkEnabled(enabled: boolean): void;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GMzaOsobyTabScr extends GContentBase {
        doplnit: boolean;
        tab: JQuery;
        private viewHlav;
        private gridHlav;
        private gridPol;
        private viewPol;
        prepareContent(params: any): void;
        dotaz(otazka: string): JQueryPromise<any>;
        private parovani;
        definiceGriduRef(gridcolumn: any): void;
        private gridcolumnRef;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GMzaRoleTabScr extends GContentBase {
        view: Gordic.Data.View;
        tab: JQuery;
        prepareContent(params: any): void;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GMzaSeznamScr extends GContentBase {
        Ico: string;
        uloha: string;
        refreshData: boolean;
        private grid;
        private view;
        private previewController;
        private menubarparametry;
        private isContentOpened;
        filter: JQuery;
        filterDashBoard: Mza.Interface.GMzaFiltrDto;
        rza_rad_aktnen: string;
        private comparisonCnt;
        private comparator;
        private isComparisonInited;
        private comparisonBadge;
        paramGvycza: number;
        onContentReady(): void;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        nastavEnableTlacitek(row?: Pap.Interface.GMzatzakDto | null): void;
        aktualizuj(): void;
        detail(): void;
        nastavTlacitka(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        dotazAnoNe(titulek: string, otazka: string): JQueryPromise<any>;
        obnovSeznam(): void;
        private registerPreview;
        closing(): void;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GVyberStavuTabScr extends GContentBase {
        taskId: string;
        tab: JQuery;
        prepareContent(params: any): void;
        ok(): void;
        closing(ok: any): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GMzaNeprirazeneVZScr extends GContentBase {
        refreshData: boolean;
        private grid;
        private view;
        private menubarparametry;
        paramGvycza: number;
        onContentReady(): void;
        vyberKnihy(): void;
        vratRok(idNen: string): string;
        nastavTlacitka(): void;
        dotaz(otazka: string): JQueryPromise<any>;
        obnovSeznam(): void;
        closing(): void;
    }
}
declare namespace Gordic.Mza.WebClient {
    class GMzaUtvaryTabScr extends GContentBase {
        view: Gordic.Data.View;
        typ: string;
        tab: JQuery;
        prepareContent(params: any): void;
    }
}
