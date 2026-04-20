declare namespace Gordic.Report.Dialogs {
    /**
       * Seznam položek šablon Gordic
       * @param input
       */
    function SablonyGordicSeznamPolozekDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.SablonyGordicSeznamPolozekDlgInput>): JQueryPromise<any>;
}
declare namespace Gordic.Report.WebClient {
    /**
     * GAdsAddReport - Přidat sestavu
     * - info: přepis probíhá na základě dialogu, který je pouze napsaný v PB
     *
     * @author thazmuka
     * @since 488.1.0.36
     */
    class GAdsAddReport extends GContentBase {
        private typ_mdf;
        private typ_grc;
        onContentReady(): void;
        private init;
        private dbTestExistsGinvfaz;
        private getInitialPhase;
        private IxsXme;
        private IxsAlv;
        private createMenubar;
        private createStatusbar;
        private createCommandbar;
        private createForm;
        private setPhases;
        private setPath;
        private Phases;
        private getInfo;
        /**
         * validace pidu
         * @param ixs identifikátor
         */
        private gide_kontr;
        /**
         * metoda vrací příponu souboru
         * - doimplementovat!!
         * */
        private getFileExt;
        /**
          * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
          * @returns {JQueryPromise<boolean>} výsledek stavu
          */
        private waitForValues;
    }
}
declare namespace Gordic.Report.WebClient {
    /**
     * Seznam formátů sestav (ALF)
     *
     * @author thazmuka
     * @since 488.1.0.105
     */
    class GAdsAlfGrid extends GContentBase {
        private grid;
        private filter;
        private view;
        onContentReady(): void;
        private createView;
        private createFilterpanel;
        private createGrid;
        private getGridFormat;
    }
}
declare namespace Gordic.Report.WebClient {
    /**
     * Seznam sestav (ALV)
     *
     * @author thazmuka
     * @since 488.1.0.105
     */
    class GAdsAlvGrid extends GContentBase {
        private grid;
        private filter;
        private view;
        onContentReady(): void;
        private createView;
        private createFilterpanel;
        private getFilters;
        /** vstupní data (filtry)pro ISL */
        private filterData;
        private filterForm;
        private createFilterForm;
        private createGrid;
        private getGridFormat;
    }
}
declare namespace Gordic.Report.WebClient {
    /**
     * GAdsDetail - detail sestavy
     *
     * @author thazmuka
     * @since 488.1.0.113
     */
    class GAdsDetail extends GContentBase {
        private subtask;
        onContentReady(): void;
        private createCommandbar;
        private createMenubar;
        private formBase;
        private createFormBase;
        private obBadge;
        private createSubtask;
        private IxsAlv;
        private formAlv;
        private formXme;
        private formParamVazby;
        private formFileInDb;
        private createFormAlv;
        private createFormXme;
        private createFormParamVazby;
        private getFormat;
        private createFormFileInDb;
    }
}
declare namespace Gordic.Ads.Dialogs {
    /**
    * Dialog sestavy ADS
    *
    * @author  Tomáš Hažmuka
    * @date    10.10.2022
    *
    * @param   parentContent					The content.
    * @param   ModOtevreni						mod otevreni dialogu.
    * @return  .
    */
    function DetailAdsSestavyDlg(parentContent: GContent, opt: {
        /** identifikátor ALV */
        IxsAlv: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Report.WebClient {
    class GAdsUtils {
        static getSearchColumns(format: Gordic.Data.GridFormat): string[];
    }
}
declare namespace Gordic.Report.WebClient {
    /**
     * Definice struktur dat (XME)
     *
     * @author thazmuka
     * @since 488.1.0.105
     */
    class GAdsXmeGrid extends GContentBase {
        private grid;
        private filter;
        private view;
        onContentReady(): void;
        private createView;
        private createFilterpanel;
        private createGrid;
        private getGridFormat;
    }
}
declare namespace Gordic.Dashboard {
    class DataReportProvider extends Gordic.Dashboard.Provider {
        constructor();
        getData(o: {
            params: IGDashboardFilter[];
            dataSourceSettings: {
                tema: string;
                reportId: string;
            };
        }): JQueryPromise<any>;
        getMeta(o: any): JQueryPromise<IGProviderMetaData>;
    }
}
declare namespace Gordic.Report.WebClient {
    interface IGFrmControlOptions extends IGFormControlOptions {
        genRes: IGReportGenerateResult | GReportGenerateResultAsyncDto;
        server?: string;
        client?: any;
        params?: IGReportGenerateParams | GCreateReportDto;
        generatorOptions: IGReportGeneratorOptions;
    }
    class GFrmControl extends GContentBase {
        uid: string;
        protected _srv: GContent;
        protected chto?: number;
        /** Aktualni options */
        protected _options: IGFrmControlOptions;
        logOptions: {
            name: string;
            fileName: string;
            authorCode: number;
        };
        protected _history: IGFrmControlOptions[];
        protected _historyPrevAct: GAction;
        protected _historyNextAct: GAction;
        prepareContent(options: IGFrmControlOptions): void;
        gfrmControlInit(): void;
        onClose(): void;
        /** Navraceni definice menu */
        getMenuDef(): MenuParams[];
        savesrz(): JQueryPromise<void>;
        savegfrm(): JQueryPromise<void>;
        savegfrmaalik(): JQueryPromise<void>;
        savegfrma(): JQueryPromise<void>;
        /** Vyvolani validace formulare */
        validate(): JQueryPromise<void>;
        getFormData(): JQueryPromise<object>;
        /**
         * generateReport - vygenerovani reportu + jeho otevreni
         *
         * @param {GCreateReportDto} parms - parametry reportu
         * @param {string} target - kde se ma generovana sestava otevrit: '_self' = nahradi se stavajici gfrmobsah, cokoliv jineho - provede se navigate, cimz se otevre do samostatneho contentu
         */
        generateReport(parms: GCreateReportDto, target: string): void;
        private _generateReportAsync;
        private _makeGfrmaPromise;
        private setServiceServerParams;
        /** Nahradi stavajici gfrm obsah nove vygenerovanym */
        private _openSelf;
        /** Otevre jako dalsi samostatny content */
        private _openNavigate;
        private _freeAll;
        /** Prida na konec, neni-li jiz v historii */
        private _setCurrentOptions;
        private _updateHistoryActionsState;
        private _historyPrev;
        private _historyNext;
        /** Pekne hnusnej zpusob, jak pouzit slozenec dvou contentu */
        private getThis;
    }
}
declare namespace Gordic.Report.WebClient {
    interface IGPreselectedData {
        reportId: string;
        outputStyle: string;
    }
    interface IGPreselectedFullData extends IGPreselectedData {
        tema: string;
        year?: string;
    }
    export class GPreselected {
        static readonly GlobalSettingsKey = "Global.reports.preselected";
        private static readonly _defaultYear;
        readonly year: string;
        private userSettings;
        constructor(us: Gordic.Data.IGStorage, year?: string);
        read(tema: string): IGPreselectedData | null;
        save(tema: string, presel: IGPreselectedData): void;
        /**
         * Smaze vse nehlede na rok.
         *
         * @param {string} tema
         * @param {string} [year] - undefined = smaze cele tema, hodnota = smaze jen dany rok
         */
        delete(tema: string, year?: string): void;
        /**
         * list
         *
         * @param {{ year?: string|null }} [filter] - year: undefined = year v konstruktoru, null = jakykoliv (nebere se v potaz), string = konkretni rok (priklad "2022")
         * @returns {IGPreselectedFullData[]}
         */
        list(filter?: {
            year?: string | null;
        }): IGPreselectedFullData[];
    }
    export {};
}
declare namespace Gordic.Prefabs.Select {
    interface IGReportsPrefabOptions {
        reportsOptions: Gordic.Report.WebClient.GReportTreeControlParamsDto | (() => Gordic.Report.WebClient.GReportTreeControlParamsDto) | (() => JQueryPromise<Gordic.Report.WebClient.GReportTreeControlParamsDto>);
    }
    type GReportFieldDto = Gordic.Report.WebClient.GReportTreeNodeDto & {
        meta?: IGPrintActionReportInfo;
    };
    function reports(prefabOptions: Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Report.WebClient.GReportTreeNodeDto> & IGReportsPrefabOptions): GSelectBoxOptions<GReportFieldDto>;
}
declare namespace Gordic.Report.WebClient {
    interface IGReportAsyncGeneratorOptions {
        reportGeneratorType?: string;
        persistent?: boolean;
    }
    type GReportGenerateResultAsyncDto = Gordic.Report.Interface.GReportGenerateResultAsyncDto & {
        async: boolean;
    };
    type GReportGenerateAsyncContext = Gordic.Async.GTaskContext<Gordic.Async.IGTaskProgress, GReportGenerateResultAsyncDto>;
    type GReportGenerateCancellationToken = GObservableObject<{
        cancelled: boolean;
    }>;
    interface GReportGenerateAsyncRejection {
        genState: "exception" | "cancel";
        id?: string;
        exception?: IGExceptionInfoMinimal;
        handled: boolean;
        data?: object | null;
    }
    type GReportGenerateAsyncPromise = JQuery.Promise<GReportGenerateResultAsyncDto, GReportGenerateAsyncRejection>;
    class GReportAsyncGenerator extends GContentBase implements IGClientContent {
        protected options: IGReportAsyncGeneratorOptions;
        protected generateInitialized: boolean;
        protected runningTask?: Gordic.Async.IGTask;
        prepareContent(options?: IGReportAsyncGeneratorOptions): void;
        generate(params: GCreateReportDto, cancellationToken?: GReportGenerateCancellationToken): GReportGenerateAsyncPromise;
        generate(params: IGReportGenerateParams, cancellationToken?: GReportGenerateCancellationToken): GReportGenerateAsyncPromise;
        generate(params: GReportGenerateResultAsyncDto, dialogValues?: ObjectLiteral<any>, cancellationToken?: GReportGenerateCancellationToken): GReportGenerateAsyncPromise;
        startGenerate(params: IGReportGenerateParams | GReportGenerateResultAsyncDto | GCreateReportDto, dialogValues?: ObjectLiteral<any>): JQueryPromise<string>;
        waitForGeneration(id: string, cancellationToken?: GReportGenerateCancellationToken): GReportGenerateAsyncPromise;
        waitForDialogAsync(r: Gordic.Report.Interface.GReportGenerateResultAsyncDto): JQueryPromise<object | null>;
        prepareOutputFile(r: Gordic.Report.Interface.GReportGenerateResultAsyncDto): JQueryPromise<GReportGenerateResultAsyncDto>;
        createOutputFileCopy(fi: Gordic.General.ApplicationInterface.GFileInfoDto): JQueryPromise<Gordic.General.ApplicationInterface.GFileInfoDto>;
        clear(id: string): JQueryPromise<void>;
        clear(params: GReportGenerateResultAsyncDto): JQueryPromise<void>;
        getAppInfo(): JQueryPromise<GAsyncHandlerOptionsDto>;
        protected getSrv(): GContent;
        /** Inicializace handleru pro generovani pres notifikace */
        static initializeDefaultHandlersOn(c: GContent): JQueryPromise<void>;
        /** Vychozi handlery pro rizeni sestav pres centrum notifikaci. */
        static registerDefaultHandlersOn(c: Readonly<GContent>, options: GAsyncHandlerOptionsDto): void;
        private static showGfrm;
        private static createNotification;
    }
}
declare namespace Gordic.Report.WebClient {
    type GCustomDialogDto = Gordic.Report.Interface.GCustomDialogDto;
    type GCustomDialogControlDto = Gordic.Report.Interface.GCustomDialogControlDto;
    interface IGReportCustomDialogOptions extends GCustomDialogDto {
    }
    /**
     * Dialog ze sestavy
     *
     * @author bmartinek
     * @since 488.1.0.117
     */
    class GReportCustomDialog extends GContent implements IGClientContent {
        prepareContent(options: IGReportCustomDialogOptions): void;
        /** Seradi ovl. prvky dle propert top a left */
        private categorizeControls;
        private convertToWebForm;
        private collectValues;
        /** Hodnota signalizujici generatoru zruseni generovani sestavy */
        private get cancellationValue();
        /** Vyvola se pouze v pripade, ze uzivatel zavre dialog krizkem */
        closing(v: any): ObjectLiteral<any>;
    }
}
declare namespace Gordic.Report.WebClient {
    class GReportDetailsControlTS extends GContentBase {
        private model;
        onContentReady(): void;
    }
}
declare namespace Gordic.Prefabs.Select {
    interface GReportFormatPrefabInfoDto extends Gordic.Report.Interface.GFormatTypeInfoDto {
        /** Je to vychozi format? */
        isDefault: boolean;
        /** Fontova ikona */
        icon: string;
    }
    /**
    * Policko pro vyber formatu sestavy (nutno ridit pres serverFilters)
    * FieldOptions
    * itemTemplate: function DOPLNIT
    * helperColumns: ["cis_real", "nazev"] DOPNIT
    *
    * DataReader
    * keys: ["ico","cis_real"]
    * columns: ["cis_real","nazev"]
    * filters: ["reportId", "platnost", "meta"]
    */
    export function reportFormats(prefabOptions: Gordic.Data.Selectors.UserSelectorOptions & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Report.WebClient.GReportTreeNodeDto>): GSelectBoxOptions<GReportFormatPrefabInfoDto>;
    export namespace reportFormats {
        function getData(this: HTMLElement, outputInfo?: Gordic.Report.Interface.GReportInfoDto): JQueryPromise<Gordic.Data.View<GReportFormatPrefabInfoDto>>;
    }
    export {};
}
declare namespace Gordic.Report.WebClient {
    class GReportPreselectedControl extends GContentBase implements IGClientContent {
        private _preselected;
        private _view;
        title: string;
        prepareContent(): void;
        private _srv;
        private _loadData;
        private _delete;
    }
}
declare namespace Gordic.Report.WebClient {
    interface IGReportScheduleListControlOptions {
        addBasicIdUdaFilter?: boolean;
        idUdaFilter?: string;
        /** Nazev C# tridy, vytvarejici scheduler (odvozene od GReportScheduler) */
        reportSchedulerClassName?: string;
        editCiziODL?: boolean;
        zrusCiziODL?: boolean;
        /** Ma byt v commandbaru tlacitko OK? */
        selectable?: boolean;
        newVisible?: boolean;
        createDetail?: (cnt: GContent, dto: GReportScheduleDto) => Gordic.Report.WebClient.GReportScheduler;
    }
    class GReportScheduleListControl extends GContentBase implements IGClientContent {
        private options;
        private initDto;
        private filter;
        private grid;
        private loadEventsAct;
        private newEventAct;
        private detailAct;
        private runAct;
        private runZudAct;
        private removeAct;
        private okAct;
        private closeAct;
        taskId: string;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        prepareContent(options: IGReportScheduleListControlOptions): void;
        private init;
        private getData;
        private newBalik;
        private showDetail;
        private deleteEvent;
        private runScheduledEvent;
        private runScheduledEventZUD;
        private makeCall;
        static createGridFormat(ixs_fun: string): Gordic.Data.GridFormat<GScheduleEventListDto>;
        static getDefaultProfileColumnList(addNazevRf: boolean): string;
    }
}
declare namespace Gordic.Prefabs.Select {
    export interface IGReportScheduledPackageOptions {
        idUdaFilter?: string;
        newVisible?: boolean;
        editCiziODL?: boolean;
        zrusCiziODL?: boolean;
    }
    type GScheduleEventListDto = Gordic.Report.WebClient.GScheduleEventListDto;
    export interface IGScheduledPackageDto extends GScheduleEventListDto {
        IxsPoz: string;
    }
    export function reportScheduledPackage(options?: Gordic.Data.Selectors.DefaultSelectorOptionsType<GScheduleEventListDto> & IGReportScheduledPackageOptions): GSelectBoxOptions<GScheduleEventListDto>;
    export {};
}
declare namespace Gordic.Report.WebClient {
    /**
     * GReportScheduleZastZnakControl
     * Content pro zobrazeni zastupnych znaku pro odlozene zpracovani
     * @author bmartinek
     * @since 482.1.0.28
     */
    class GReportScheduleZastZnakControl extends GContentBase implements IGClientContent {
        private options;
        private grid;
        private selAct;
        uid: string;
        prepareContent(options?: GReportScheduleZastZnakControlOptions): void;
        private srv;
        private loadData;
    }
    interface GReportScheduleZastZnakControlOptions {
        /** ReportId */
        wrid?: string;
        platnost?: string;
    }
    interface GReportScheduleZastZnakControlOutput {
        wildcard?: string;
    }
}
declare namespace Gordic.Report.WebClient {
    interface IGReportSchedulerOptions {
        name?: string;
        fileName?: string;
        start?: Date;
        mailSubject?: string;
        mailContent?: string;
        report?: GCreateReportDto;
        reportSchedulerClassName?: string;
        /** Data pro pripad, ze jsem je ziskal nekde jinde */
        data?: GReportScheduleDto;
        menuBar?: MenuParams[];
    }
    class GReportScheduler extends GClientContent {
        options: IGReportSchedulerOptions;
        private data;
        private saveAct;
        private closeAct;
        private navrhAct;
        private zastZnakyAct;
        private paramForm?;
        protected reportSchedulerClassName: string;
        editCiziODL?: boolean;
        zrusCiziODL?: boolean;
        constructor(cnt: GContent, options: IGReportSchedulerOptions);
        prepareClientContent(): void;
        init(dto: GReportScheduleDto): void;
        private showZastupneZnaky;
        private showNavrh;
        private makeCall;
        /** Jde o balik sestav? */
        protected get isBalikSestav(): boolean;
    }
    /**
     * Spusteni sestavy v rezimu navrhu.
     * Vlastnosti:
     *  - vytvori uzivatelsky formular s parametry sestavy (+ validace)
     *  - moznost stahnout sestavu (pokud z ni vypadne nejaky soubor)
     *  - automaticky uklid
     *
     * @author bmartinek
     * @since 52530.2
     */
    class GReportPreview extends GContent implements IGClientContent {
        input: IGReportPreviewInput;
        private _pars?;
        private _initAwait;
        private _genCnt;
        private _genRepFileGuids;
        private _lastGeneratedReport;
        get initAwait(): JQueryPromise<void>;
        prepareContent(input: IGReportPreviewInput): void;
        generate(input: IGReportPreviewInput): JQueryPromise<Gordic.Report.Interface.GScheduledReportParameter[]>;
        private createForm;
        hasUserParameters(): JQueryPromise<boolean>;
        getParams(): JQueryPromise<Gordic.Report.Interface.GScheduledReportParameter[]>;
        showReport(): JQueryPromise<void>;
    }
    interface IGReportPreviewInput {
        dto: IGExtendedGenerateParams;
        autoGenerate?: boolean;
    }
    interface IGReportPreviewDialogResult {
        params: Gordic.Report.Interface.GScheduledReportParameter[];
    }
}
declare namespace Gordic.Report.WebClient {
    interface IGInputOptions {
        ID: string;
        ControlParams: GReportTreeControlParamsDto;
    }
    interface IGExtendedGenerateParams extends IGReportGenerateParams {
        reportGeneratorType: string;
    }
    interface IGReportFileOps {
        waitFor: (p?: JQueryPromise<any>) => void;
        copyOutputFile: () => JQueryPromise<Gordic.General.ApplicationInterface.GFileInfoDto>;
    }
    class GReportTreeControlTS extends GContentBase implements IGClientContent {
        /**
         * Vstup pro strom sestav
         * @type {GReportTreeControlParamsDto}
         */
        controlParams: GReportTreeControlParamsDto;
        subtasks: JQuery;
        grid: JQuery;
        sameTema: boolean;
        temata?: ObjectLiteral<string>;
        /** Uzivatel pozaduje predvybrat sestavu (pri pristim otevreni stromu sestav se bude sestava automaticky generovat) */
        preselect?: boolean;
        actFilterFavsOnly: GAction;
        actFilterReduced: GAction;
        actFilterAll: GAction;
        actFavSesAdd: GAction;
        actFavSesRemove: GAction;
        actToggleFolders: GAction;
        actSesDetail: GAction;
        actStored: GAction;
        actSchedule: GAction;
        actScheduleChildren?: MenuParams[];
        scheduleToFormatActions: GActionList;
        actExec: GAction;
        actExecChildren?: MenuParams[];
        generateToFormatActions: GActionList;
        actPreselect: GAction;
        actClearPreselected: GAction;
        actShowSettings: GAction;
        openingAction?: GAction;
        gfrmContents: Array<JQuery>;
        gfrmCurrDef: JQueryDeferred<IGPrintActionReportDataCollectedInfo> | null;
        logOptions: {
            name: string;
            fileName: string;
            authorCode: number;
        };
        private _currCancelObj;
        private menuDef;
        /** Guidy vsech vygenerovanych souboru v tomto okne */
        private _generatedFilesGuids;
        private _preselected;
        private _lastTreeId?;
        private _lastTreeLoadMode?;
        private _searchLoad?;
        private _view?;
        prepareContent(options?: IGInputOptions): void;
        createGridFormat(): Gordic.Data.GridFormat<GReportTreeNodeDto>;
        loadData(): JQueryPromise<GetTreeResponseDto>;
        setData(res: GetTreeResponseDto, selectReportId?: string): void;
        /** Vrati definici menu (pro moznost pouziti napr. na tabu) */
        getMenuDef(): MenuParams[];
        private static srv;
        private _srv;
        private _updateFormatActions;
        private _updateActionsState;
        private _updateFormatActionsList;
        /**
         * Je dany outputStyle podporovan?
         *
         * @param {string} output outputStyle, napr. "rtf"
         * @param {string} allowedOutputTypes vsechny podporovane formaty ve stringu oddelene |
         * @returns {boolean}
         */
        private _isOutputStyleSupported;
        private _getSelection;
        /** Projde data a zjisti, zda lze pouzit automaticky vyber jedne sestavy. Pokud ano, vrati jeho wrid. */
        private _findJustOneReport;
        /**
         * Vytvori objekt s info o reportu (kvuli kompatibilite)
         *
         * @returns {IGPrintActionReportInfo | null}
         */
        private _getOutputSelection;
        private _triggerInfo;
        private _loadItems;
        private _showFavoriteDetails;
        private _removeFavorite;
        private _showDetails;
        /**
         * Zobrazi seznam ulozenych sestav podle IxpAlv
         */
        private _showStoredReports;
        private _schedule;
        private _returnOutput;
        private _generate;
        private _generateReport;
        private _generateReportAsync;
        private _generateReportUsingNotificationsAsync;
        private _collectReportParams;
        private _getDownloaderParams;
        private _clean;
        private _showPreselectDlg;
        /** Momentalne je zobrazen subtask "Oblibene sestavy" */
        private _showsFavoriteOnly;
        private _showSettings;
        private _getSettingsKey;
        private _saveSettings;
        private _getSettings;
        /**
         * Parametry sestavy ke stazeni (pouze stazeni bez nasl. uploadu!)
         *
         * @param {string} res
         * @returns {IGDocumentDownloadParams & IGDocumentUploadParams}
         */
        static getDownloadOnlyParams(res: IGReportGenerateResult | GReportGenerateResultAsyncDto): IGDocumentDownloadParams & IGDocumentUploadParams;
        static getDownloaderParams(res: IGReportGenerateResult | GReportGenerateResultAsyncDto, signer?: Signer): IGDocumentDownloadParams & IGDocumentUploadParams;
        /** Uklid souboru sestavy pri externim pouziti */
        static cleanFiles(guids: string[]): void;
        private static _cleanFiles;
        static waitBatchFilesDialog(genRes: IGReportGenerateResult, doc: GReportDocument, cnt: GContent): JQueryPromise<void>;
        /**
         * Vrati podrobnosti o sestave.
         *
         * @param reportId Id reportu (wrid)
         * @param platnost GEkoDate (RRRRMM)
         */
        static getReportInfo(reportId: string, platnost: string, parentContent?: GContent): JQueryPromise<Gordic.Report.Interface.GReportInfoDto>;
        /** Vrati data stromu sestav */
        static getData(params: GReportTreeControlParamsDto, parentContent?: GContent): JQueryPromise<GetTreeResponseDto>;
        /** Prevede na reportinfo */
        static ToIGPrintActionReportInfo(node?: GReportTreeNodeDto): IGPrintActionReportInfo | null;
        /** Vytvori standardizovany nazev sestavy */
        static createReportName(info: {
            idSes?: string | null;
            name?: string | null;
        }, isReport: boolean): string;
        static getIGPrintActionReportInfo(params: IGReportGenerateParams): JQueryPromise<IGPrintActionReportInfo>;
        /** Podle koncovky souboru vrati ikonku */
        static getIconByFileExtension(extension?: string | null): string;
        /** Naformatuje zpravu progresssu (prvni radek tucne) */
        static formatProgressMessage(text?: string | null): string;
        closing(): JQueryPromise<any>;
        showDetails(reporId: string, platnost: string, width: number, height: number): JQuery;
        setOpeningAction(action: GAction): void;
        showGfrm(genRes: IGReportGenerateResult | GReportGenerateResultAsyncDto, params: IGReportGenerateParams, generatorOptions: IGReportGeneratorOptions): JQueryPromise<void>;
    }
}
declare namespace Gordic.Report.WebClient {
    class GReportUtils {
        static convertParamsToGCreateReportDto(repParams: IGReportGenerateParams, xParams?: IGDefaultReportparams, options?: IGReportGeneratorOptions): GCreateReportDto;
        /**
         * Zobrazi preloader pro generovani (s teplomerem)
         *
         * @param {GContent} content v jehoz contextu se zobrazi
         * @param {GAction} cancellationAction akce pro volani cancel
         */
        static progressBegin(content: GContent, cancellationAction: GAction): void;
        /** Updatne preloader pro generovani (s teplomerem) */
        static progressUpdate(gcontent: GContent, progress: IGReportGenerateProgress, formaterFunc?: (p: IGReportGenerateProgress) => string): void;
        /** Zformatuje progress */
        static formatProgress(progress: IGReportGenerateProgress): string;
    }
    interface IGReportGenerateProgress {
        caption?: string;
        bottomLabel?: string;
        topLabel?: string;
        value: number;
    }
}
declare namespace Gordic.Report.WebClient {
    function GReportsUserSettings(): Gordic.Forms.Form;
}
declare namespace Gordic.Report.WebClient {
    class GTemplatesControl extends GContentBase {
        private stringData;
        private saveObject;
        private type;
        private arrayItems;
        private gridTemplates;
        private form;
        private srv;
        private hideField;
        private createForm;
        private createFormElement;
        private createGrid;
        private setDataToGrid;
        private createObjectToSave;
        private init;
        private createActions;
        private createMenuBar;
        private vsechnyPolozkyFormulare;
        private savePreddefinovana;
        /**
         * Doplnění a uložení
         * @param returnType typ práce s dokumentem 1 - uložení na one drive, 2 -
         */
        saveDocumentNew(returnType: 1 | 2 | 3 | 4): void;
        private getPreddefinovaCast;
        onContentReady(): void;
    }
}
declare namespace Gordic.Report.WebClient {
    interface SablonyGordicSeznamPolozekDlgInput {
        Data: any;
    }
    /**
     * GContent
     *
     * @author  Dsebesta
     * @since   484.1.0.613
     * @date    15.09.2020
     */
    class SablonyGordicSeznamPolozekDlg extends GContentBase implements IGClientContent {
        private $Grid?;
        private $Form?;
        private input?;
        private viewTabulka;
        /**
         * prepareContent
         *
         * @param {GContentInput<TDto, TFilterDto> | undefined} input
         */
        prepareContent(input: SablonyGordicSeznamPolozekDlgInput): void;
        private createForm;
        private createGrid;
    }
}
