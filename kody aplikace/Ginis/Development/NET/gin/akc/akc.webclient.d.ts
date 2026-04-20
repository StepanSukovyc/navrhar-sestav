declare namespace Gordic.Akc.WebClient {
    interface IGAsyncTaskDetailsOptions {
        taskId: string;
    }
    /**
     * Detail async. ulohy
     *
     * @author bmartinek
     * @since 52520.3
    */
    class GAsyncTaskDetails extends GContentBase<BaseClass> implements IGClientContent {
        private contentName;
        private refreshRegularly;
        private dView;
        title: string;
        private inputTab;
        private progressTab;
        private resultTab;
        private errorTab;
        prepareContent(options: IGAsyncTaskDetailsOptions): void;
        onClose(): void;
        private loadData;
        private prepareJsonDisplay;
    }
}
declare namespace Gordic.Akc.WebClient {
    /**
     * Prehled async. uloh
     *
     * @author bmartinek
     * @since 52520.3
    */
    class GAsyncTasks extends GContentBase<BaseClass> {
        private contentName;
        private refreshRegularly;
        private dView;
        onContentReady(): void;
        onClose(): void;
        private loadData;
        private openDetail;
    }
}
declare namespace Gordic.Akc.WebClient {
    interface IBaseFunction {
        setDataToGrid(): void;
    }
    /**
     * Base class properties
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
    */
    class BaseClass {
        /** element gridu */
        grid: JQuery<HTMLElement>;
        /** sloupce seznamu */
        gridSearchColumns: string[];
        /** formát sloupců gridu */
        gridFormat: Gordic.Data.GridFormat;
        /** element sidebaru */
        sidebar: JQuery<HTMLElement>;
        /** panel id (string) */
        panelId: string;
        /** element panelu v sidebaru */
        view: JQuery<HTMLElement>;
        /** data na řádcích seznamu, pokud chceme vybrat jen aktuální řádek vybereme row[0], v případě více řádků je to poslední v poli row[n-1] */
        row: any;
        /** element filtru */
        filter: JQuery<HTMLElement>;
        /** formulář pro přidávání políček filtru */
        filterForm: Gordic.Forms.Form;
        /** Zda je content otevvírán z dashboardu */
        isDashboard: boolean;
        /** Preview Controller */
        previewController: Gordic.Previews.GPreviewController;
        static openDetailTest<T = any>(ctx: any, className: string, that: GContentType<BaseClass>): void;
        static addDefaultActions(caption: string, that: GContentType<BaseClass>): void;
    }
}
declare namespace Gordic.Akc.WebClient {
    function RegisterAkcErrorSearchResolver(): void;
    class GAkcErrorSearchResolver extends Components.Search.GBaseSearchResolver {
        protected getDefaultId(): string;
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        private readonly fuzzySearch;
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Kce.WebClient.Utils {
    function RegisterSearchResolver(): void;
}
declare namespace Gordic.Akc.WebClient {
    interface RefreshIntervalOptions {
        /** Typ contentu */
        cnt: GContentType<ConcurrentUsers | History | ActiveUsers | ActiveUsersNew | DatabaseLocks | ErrorLogs | UnauthorizedAttempts | SanitizingLogs | DatabaseLocksUser>;
        /** Název zobrazovaný v info zprávě */
        name: string;
        /** Zda je content otevírán z nástěnky */
        dashboardOpen: boolean;
        /** Název contentu */
        contentName: string;
        /** Vypnutí radiobuttonu pro přepnutí na minuty */
        onlySec?: boolean;
    }
    /** Nový refresh interval */
    class RefreshInterval {
        private options;
        private mainActionName;
        private okActionName;
        private showFlashName;
        private secondValue;
        private numberInterval;
        constructor(params: RefreshIntervalOptions);
        /**
        * Ukončí volání pravidelné obnovování dat (doporučuji volat v close metodách)
        * */
        endRefreshRegularly(): void;
        /**
         * Vrací název hlavní akce hlavně pro přidání do menuBar
         * */
        getMainActionName(): string;
        /**
         * Action params pro akce související s automatickým obnovováním
         * */
        getActionsParams(): MenuParams;
        private startRefreshRegularly;
        private refreshRegularly;
        private testAutomaticStart;
        private startRefresh;
        private createRefreshIntervalForm;
        private endRefreshRegularlyByUser;
        private endInformation;
        private deleteAutomaticRefresh;
    }
}
declare namespace Gordic.Akc.WebClient {
    interface SpecialIntervalFieldOptions {
        /** Popisek řádku */
        rowlabel: string;
        /** Název řádku (lze podle toho také vyhledávát) */
        rowName: string;
        /** Název políčka od */
        fieldFromName: string;
        /** Název políčka do */
        fieldToName: string;
        /** Formulář ke kterému je políčko připojeno */
        form: Forms.Form;
        /** Třída přiřazená k formuláři, především pro vyhledávání */
        customClass?: string;
        /** Inicializační hodnota porměnné */
        initialValue?: string;
    }
    class SpecialIntervalField {
        private options;
        private actions;
        constructor(params: SpecialIntervalFieldOptions);
        private createActions;
        createSpecialIntervalField(): Forms.Form;
        private createSpecialValidator;
        private setDateIntervalValue;
        private createInterval;
    }
}
declare namespace Gordic.Akc.WebClient.DetailForms {
    /**
     * Funkce pro vytvoreni formulare pro detail databazoveho zamku
     * @param name třídy (typicky název formuláře + počáteční šířku )
     */
    function FormDbLocks(name?: string): Gordic.Forms.Form;
    function formHistoryDetail(name?: string): Gordic.Forms.Form;
    function formUnauthorizedDetail(name?: string): Gordic.Forms.Form;
    function formConcurrentUsers(name?: string): Gordic.Forms.Form;
    function formActiveusers(name: string, dbType: Gordic.Akc.WebClient.AkcUtils.DbType, isAzure: boolean, isSidebar: boolean): Gordic.Forms.Form;
    function formActiveUsersNew(name?: string): Gordic.Forms.Form;
    function formSanitizeLogs(name?: string): Gordic.Forms.Form;
    function formSanitizeDb(name?: string): Gordic.Forms.Form;
    function formLocksUser(name: string, dbType: Gordic.Akc.WebClient.AkcUtils.DbType): Gordic.Forms.Form;
}
declare namespace Gordic.Akc.WebClient.AkcUtils {
    /**
     * Funkce pro vytvoření intervalu
     * @param value hodnota podle které se určuje jaký čqas se má vložit
     * @param fromDateField políčko from
     * @param toDateField políčko to
     */
    function CreateInterval(value: string, fromDateField: JQuery, toDateField: JQuery): any;
    /**
     * Vytvoření zadaného časového rozmezí
     * @param value hodnota podle, které se určuje
     */
    function CreateIntervalValues(value?: string): {
        start: Date | string;
        end: Date | string;
    };
    /**
     * Seskupení dat podle parametru
     * @param data data k seskupení
     * @param option podle, které option se má seskupovat
     */
    function groupBy(data: any[], option: string): any;
    /**
     * Funkce pro kopírování
     * @param id id pro zamezení duplicitních názvů
     * @param value honnota pro vložení do prázdného formuláře
     * @param cnt parent cnt pro vyhledání formuláře
     */
    function copyFrom(id: string, value: string, cnt: JQuery<HTMLElement>): void;
    /**
     * Vytvoření prázdného formuláře s id
     * @param id
     */
    function createInvisibleForm(id: string): JQuery<HTMLElement>;
    /**
     * Zvýraznění podezřelé části textu
     * @param originalString původní hodnota
     * @param sanitizedValue očištěná hodnota
     */
    function highlightSuspectPart(originalString: string, sanitizedValue: string): string;
    /**
     * Seznam důvodů, proč text prochází sanitizací
     * @param listOfReasons pole s důvody
     */
    function listOfReasons(listOfReasons: any[]): string;
    /**
     * Seznam důvodů v čitelné podobě do detailu
     * @param reasons pole důvodů
     */
    function listOfReasonsForm(reasons: any): string;
    /**
     * Zvýraznění textu po sanitizaci
     * @param data objekt se sanitizací
     */
    function hightligthTextSanitizedLogs(data: Gordic.Akc.WebClient.SanitizeResult): string;
    /**
     * Skytí políčka podle jména
     * @param name
     */
    function hideField(name: string): void;
    /**
     * Zobrazení políčka podle jména
     * @param name
     */
    function showField(name: string): void;
    /** Funkce pro naplnění akcí do grafů */
    function createPeriods(): Array<any>;
    function createfileNameValidator(): Validators.Base;
    function createNotificationResult(resultPath: string): void;
    enum DbType {
        Informix = 1,
        Oracle = 3,
        SqlServer = 5
    }
}
declare namespace Gordic.Akc.WebClient {
    interface TabDashboardOptionsMin {
        name: string;
        open: boolean;
    }
    interface TabDashboardOptions extends TabDashboardOptionsMin {
        title: string;
        icon: string;
    }
    class Dashboard extends GContentBase<BaseClass> {
        private currentContents;
        private allContents;
        private main;
        prepareContent(): void;
        private init;
        private createActions;
        private createMenubar;
        private getAllContents;
        private createMain;
        private createAkcContent;
        private itemTemplate;
        private createFormAdministration;
        private saveDashboardSettings;
        private updateContentSettings;
        private updateDataParamsOk;
    }
}
declare namespace Gordic.Akc.WebClient {
    class DatabaseLockDetail extends GContentBase {
        private data;
        private isDashboard;
        onContentReady(): void;
        private init;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
    }
}
declare namespace Gordic.Akc.WebClient {
    class DatabaseLocks extends GContentBase<BaseClass> implements IBaseFunction {
        private refreshRegularly;
        private contentName;
        onContentReady(): void;
        onClose(): void;
        private init;
        private createActions;
        private createMenubar;
        private createRefreshRegularly;
        private createGrid;
        private createGridFormat;
        setDataToGrid(): void;
        private createPanel;
        private createSidebar;
        private setDataToSidebar;
    }
}
declare namespace Gordic.Akc.WebClient {
    class DatabaseLocksUser extends GContentBase<BaseClass> implements IBaseFunction {
        private refreshRegularly;
        private dbType;
        private dataOld;
        private currentFilterData;
        onContentReady(): void;
        onClose(): void;
        setDataToGrid(): void;
        private init;
        private createFilter;
        private getFilterData;
        private createFilterForm;
        private getDefaultLocksForThisDb;
        private createActions;
        private createMenuBar;
        private createGrid;
        private createGridFormat;
        secondsFromEpoch(d: Date): number;
        private createRefreshRegularly;
        private createSidebar;
    }
}
declare namespace Gordic.Akc.WebClient {
    class DbSanitizing extends GContentBase<BaseClass> {
        private sanitazionResults;
        private notId;
        private _srv;
        onContentReady(): void;
        private init;
        private createMenuBar;
        private createActions;
        private createSidebar;
        private createInvisibleForm;
        private createAkcContent;
        private dialogSelectedColumns;
        private analyzeDatabase;
        private registerAsSearch;
        private createGridFormatSanitizing;
        private copyToClipboard;
        private exportDataToFile;
        private okExportSanitization;
        private importFromFile;
        private importOkXml;
    }
}
declare namespace Gordic.Akc.WebClient {
    class DbSanitizingDetail extends GContentBase {
        private data;
        private isDashboard;
        onContentReady(): void;
        private init;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
    }
}
declare namespace Gordic.Akc.WebClient {
    class DbSanitizingTableColumns extends GContentBase {
        private grid;
        confirmAct(all: boolean): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Akc.WebClient {
    class SanitizingLogs extends GContentBase<BaseClass> implements IBaseFunction {
        private refreshInterval;
        private contentName;
        private currentFilterData;
        private dataSource;
        private _srv;
        onContentReady(): void;
        onClose(): void;
        private init;
        private createMenuBar;
        private createActions;
        private createRefreshInterval;
        private createFactors;
        private createWidget;
        private createFilterForm;
        private createFilter;
        private createGrid;
        private getFilterConditions;
        private createSidebar;
        setDataToGrid(): void;
        private initAsyncTask;
        private creategridFormat;
        private exportDataToFile;
        private exportOK;
    }
}
declare namespace Gordic.Akc.WebClient {
    class SanitizingLogsDetail extends GContentBase {
        private data;
        private isDashboard;
        onContentReady(): void;
        private init;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createCallStackBar;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
    }
}
declare namespace Gordic.Akc.WebClient {
    class ErrorLogDetail extends GContentBase {
        private errorLogDto;
        private formInfoData;
        private invisibleForm;
        private serviceContent;
        private source;
        private isAuthService;
        onContentReady(): void;
        private srv;
        private init;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createHeaderForm;
        private createInformationTab;
        private informatioForm;
        private createInvisibleForm;
        private exportItem;
        private exportOk;
        private createEmailForm;
        private sendEmailOk;
        createShareActions(): MenuParams;
        private openDetailOnNewTab;
    }
}
declare namespace Gordic.Akc.WebClient {
    class ErrorLogEmail extends GContentBase {
        private errorLogEmail;
        private grid;
        onContentReady(): void;
        private init;
        private createActions;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createHeaderForm;
        private openDetail;
        private addReceiver;
        private addReceiverGordic;
        private sendEmail;
        private createTabErrorLogs;
        private updateActions;
        private createGridFormat;
    }
}
declare namespace Gordic.Akc.WebClient {
    class ErrorLogs extends GContentBase<BaseClass> implements IBaseFunction {
        private input;
        private factorDate;
        private serviceCnt;
        private sourceFileUploaded;
        private sourceFileUploadedFileInfo;
        private currentSource;
        private invisibleform;
        private temporaryFiles;
        private refreshRegularly;
        private contentName;
        private currentFilterData;
        private statusBarArray;
        private guidsZipFiles;
        private isAuthService;
        onContentReady(): void;
        onClose(): void;
        private init;
        private createRefreshRegularly;
        private createFilterPanel;
        private createStatusBar;
        private updateActions;
        private createDataSourceForm;
        private saveNewDataSource;
        private createFilterPanelForm;
        private createBreadcrumbs;
        private createMenuBar;
        private createGrid;
        private createGridFormat;
        setDataToGrid(): void;
        private getFilterData;
        private createActions;
        private createEmailForm;
        private createFormExport;
        private createLastProcessingDateTime;
        private saveNewProcessingDateTime;
        private openDetail;
        private hideField;
        private saveErrorLogsToFile;
        private copySelectedToClipboard;
        private sendEmail;
        private insertDataToInvisibleForm;
        private createInvisibleForm;
        private openSearchDialog;
        private findErrorFormOK;
        private openDetailOnNewTab;
        private openSeznamOnNewTab;
        createShareMenuBarActions(): MenuParams[];
    }
}
declare namespace Gordic.Akc.WebClient {
    class ErrorLogsEmailHromadne extends GContentBase {
        private guids;
        private srv;
        onContentReady(): void;
        onClose(): void;
        private init;
        private getSrv;
        private createActions;
        private createCommandBar;
        private createForm;
        private sendEmail;
        private removeTmpFiles;
    }
}
declare namespace Gordic.Akc.WebClient {
    /** Vstupni parametry pro vyrobce grafu */
    export interface ChartOptions {
        /** Data načtená z databáze*/
        databaseData?: any;
        /** Titulek dat*/
        title: string;
        /** Idemtifikátor */
        id: string;
        /** Zdroj dat*/
        source: string;
        /** Jednotky */
        units: string;
        /** Popis dat */
        description: string;
        /** Meritko */
        scale: number;
        /** Akce pro update */
        updateAction?: (dateFrom: string, dateTo: string, newZoom: ViewDataChart) => void;
        /** Typ grafu */
        chartType: ChartType;
    }
    /** Objekt nahrávaný do gridu */
    export interface DataGridObject {
        year: string;
        month: string;
        day: string;
        hour: string;
        minute: string;
        from: string;
        to: string;
        data1?: number;
        data2?: number;
    }
    /** Data chart objektu */
    interface DataChartObject {
        dateInterval: {
            start: string;
            end: string;
        };
        label: string;
        absoluteData: number;
        cumulativeData1: number;
        cumulativeData2: number;
    }
    /** Zobrazeni detailu dat */
    export enum ViewDataChart {
        all = 0,
        year = 1,
        month = 2,
        week = 3,
        day = 4,
        daydetail = 5
    }
    export enum ChartType {
        cumulative = 0,
        standart = 1
    }
    export class ChartCreator {
        private options;
        private tab;
        private chart;
        private currentViewChartFormat;
        private chartData;
        private width;
        private cnt;
        private cumulativeView;
        private cumulativeViewPreviousSeasons;
        private cumulateConstant;
        constructor(options: ChartOptions);
        setDatabaseData(data: any): void;
        createTab(): JQuery;
        getCurrentZoom(): ViewDataChart;
        getCurrentHeader(): string;
        getCurrentData(): DataChartObject[];
        getGridFormat(): Gordic.Data.GridFormat;
        getBaseDataToGrid(): DataGridObject[];
        backAction(): void;
        moveAction(forward: boolean): void;
        dataFromSelectedInterval(dateFrom: string, zoom: ViewDataChart): void;
        setToogleCumulative(cumulative: boolean, cumulativePreviousSeason: boolean): void;
        private createChart;
        private createTitle;
        private createHeader;
        private getAllData;
        private createTimeSpace;
        private getDateFromSpace;
        private createEmptyArray;
        private reloadData;
        private getDataFromSpace;
        private createChartData;
        private registerDetailFunction;
        private initResizemanager;
    }
    export {};
}
declare namespace Gordic.Akc.WebClient {
    class GraphsDetail extends GContentBase {
        private graphInfo;
        private chart1;
        private chart2;
        private cnt;
        private mainHeader;
        private cumulative;
        private cumulativePreviousSeason;
        private grid;
        onContentReady(): void;
        private init;
        private loadDataNew;
        private createBaseGrid;
        private loadDataToGrid;
        private loadDataFromChart;
        private createMenubar;
        private createActions;
        private getScale;
        private getData;
        private actBack;
        private actMove;
        private actOpenPeriod;
        private actDetail;
        private openDateDetail;
        private updateHeader;
        private updateActions;
        private createToogleButtons;
        private createDateFieldToPanel;
        private openDetailDay;
    }
}
declare namespace Gordic.Akc.WebClient {
    class GraphsList extends GContentBase<BaseClass> {
        onContentReady(): void;
        private init;
        private createGridFormat;
        private createGrid;
        private createAllActions;
        private createMenuBar;
        private createBreadcrumbs;
    }
}
declare namespace Gordic.Akc.WebClient {
    class ActiveUsers extends GContentBase<BaseClass> implements IBaseFunction {
        private contentName;
        private refreshRegularly;
        private dbType;
        private isAzure;
        private currentFilterData;
        onContentReady(): void;
        onClose(): void;
        private init;
        private getTypPripojeni;
        private createFilter;
        private createFilterForm;
        private getDefaultLocksForThisDb;
        private getFilterData;
        private createActions;
        private createMenubar;
        setDataToGrid(): void;
        private createRefreshRegularly;
        private createGrid;
        private createGridFormat;
        private createSidebar;
    }
}
declare namespace Gordic.Akc.WebClient {
    class ActiveUsersDetail extends GContentBase {
        private data;
        onContentReady(): void;
        private init;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
    }
}
declare namespace Gordic.Akc.WebClient {
    class ActiveUsersNew extends GContentBase<BaseClass> implements IBaseFunction {
        private contentName;
        private refreshRegularly;
        private dbType;
        onContentReady(): void;
        onClose(): void;
        private init;
        private createActions;
        private createMenubar;
        setDataToGrid(): void;
        private createRefreshRegularly;
        private createGrid;
        private createGridFormat;
        private createSidebar;
        private ukonceniPraceUzivatele;
        private ukonceniPraceVsechUzivatelu;
    }
}
declare namespace Gordic.Akc.WebClient {
    class ActiveUsersNewDetail extends GContentBase {
        private data;
        onContentReady(): void;
        private init;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private ukonceniPraceUzivatele;
    }
}
declare namespace Gordic.Akc.WebClient {
    class ConcurrentUsers extends GContentBase<BaseClass> implements IBaseFunction {
        private factorDate;
        private refreshRegularly;
        private currentFilterData;
        onContentReady(): void;
        onClose(): void;
        private init;
        private createMenuBar;
        private createActions;
        private createRefreshRegularly;
        private createFilterPanel;
        private createFilterPanelForm;
        setDataToGrid(): void;
        private getFilterData;
        private createGrid;
        private createSidebar;
        private createGridFormat;
    }
}
declare namespace Gordic.Akc.WebClient {
    class ConcurrentUsersDetail extends GContentBase {
        private data;
        private isDashboard;
        onContentReady(): void;
        private init;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
    }
}
declare namespace Gordic.Akc.WebClient {
    class History extends GContentBase<BaseClass> implements IBaseFunction {
        private refreshRegularly;
        private contentName;
        private currentFilterData;
        onContentReady(): void;
        onClose(): void;
        private init;
        private createActions;
        private createMenuBar;
        private createRefreshRegularly;
        private createFilterPanel;
        private createFilterForm;
        private getFilterData;
        setDataToGrid(): void;
        private createGrid;
        private createGridFormat;
        private createSidebar;
    }
}
declare namespace Gordic.Akc.WebClient {
    class LoginDetail extends GContentBase {
        private data;
        private isDashboard;
        onContentReady(): void;
        private init;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
    }
}
declare namespace Gordic.Akc.WebClient {
    class SoucasnePracujiciUzivatele extends GContentBase {
        private filter;
        private grid;
        private currentFilterData;
        private currentFilterCelkoveUdaje;
        onContentReady(): void;
        private init;
        private createActions;
        private createBreadcrumbs;
        private createMenuBar;
        private createFilterForm;
        private createGrid;
        private initAsyncTaskFaze;
        private initAsyncTaskCelkem;
        private getFazeData;
        private getDataCelkem;
        private setDataToGrid;
        private openFilterDialog;
        private okFilterForm;
        private openResultDataForm;
        private resultDataForm;
    }
}
declare namespace Gordic.Akc.WebClient {
    class UnauthorizedAttempts extends GContentBase<BaseClass> implements IBaseFunction {
        private currentFilterData;
        private refreshinterval;
        private contentName;
        onContentReady(): void;
        onClose(): void;
        private init;
        private createFilterPanel;
        private createRefreshInterval;
        private createActions;
        private createMenubar;
        private createFilterForm;
        private createGrid;
        private createGridFormat;
        setDataToGrid(): void;
        private getFilterData;
        private createSidebar;
    }
}
declare namespace Gordic.Akc.WebClient {
    class UnauthorizedattemptDetail extends GContentBase {
        private data;
        private isDashboard;
        onContentReady(): void;
        private init;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
    }
}
