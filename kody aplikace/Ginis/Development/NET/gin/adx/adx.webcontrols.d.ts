declare namespace Gordic.Adx.WebControls {
    interface AdmAuditPristupuOptions {
        /** SXS */
        sxs: string;
        /** Typ objektu */
        typ_obj: number;
    }
    /** Nový audit přístupů */
    class AdxAuditPristupuNew {
        private sxs;
        private typ_obj;
        private grid;
        private dataListDescription;
        private povolenoZobrazeni;
        constructor(options: AdmAuditPristupuOptions);
        private createGrid;
        private loadData;
        getSidePanel(): Gordic.Gin.DetailBuilder.GDetailBuilderSbpanelOptionsId;
        getPanel(): Gordic.Gin.DetailBuilder.TabParamsId;
        getGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adx.WebControls {
    interface AdxPoznamkyOptions {
        /** SXS */
        sxs: string;
        /** Typ objektu */
        typ_obj: number;
        /** Content */
        cnt: GContent;
        /** Nový záznam */
        newRecord: boolean;
    }
    /** Nový audit přístupů */
    class AdxPoznamkyNew {
        private sxs;
        private typ_obj;
        private cnt;
        private panel;
        private gnotePanel;
        private poznamkyCount;
        private newRecord;
        constructor(options: AdxPoznamkyOptions);
        private createPoznamky;
        getSidePanel(): Gordic.Gin.DetailBuilder.GDetailBuilderSbpanelOptionsId;
    }
}
declare namespace Gordic.Adx.WebControls {
    abstract class GAdxBase {
        detailCnt: JQuery<HTMLElement>;
    }
}
declare namespace Gordic.Adx.WebControls.GAdxDashboardViews {
    function createUserInfo(userInfo: Gordic.Adx.WebControls.GAdxLoginDto): Gordic.Dashboard.CustomProvider;
    function createPosledniPouzite(getCurrentGlobalSettings: () => Gordic.Data.IGStorage | null): Gordic.Dashboard.CustomProvider;
    function createPosledniSeznamy(getCurrentGlobalSettings: () => Gordic.Data.IGStorage | null): Gordic.Dashboard.CustomProvider;
    function createOblibeneSeznamy(getCurrentGlobalSettings: () => Gordic.Data.IGStorage | null): Gordic.Dashboard.CustomProvider;
    function updateElement(el: JQuery<HTMLElement>): void;
}
declare namespace Gordic.Adx.WebControls {
    abstract class GAdxDetailBase<T> extends GAdxBase {
        options: IGAdxDetailOptions;
        cnt: GContent & GAdxDetailBase<T>;
        isAuthService: boolean;
        data: T;
        metadata: any;
        editPermissionObj: {
            permission: boolean;
            reason: string;
        };
        createPermissionObj: {
            permission: boolean;
            reason: string;
        };
        form: Gordic.Forms.Form;
        editMode: boolean;
        sxs: string;
        objType: number;
        auditPristupu: Gordic.Adx.WebControls.AdxAuditPristupuNew;
        poznamky: Gordic.Adx.WebControls.AdxPoznamkyNew;
        icoBase: string;
        openDialog: boolean;
        vazby: IGAdmCopyOptions[];
        isAdmOrAdxFaze: boolean;
        vazbyObj: {
            bussinessObj: string;
            canCreate: boolean;
            check: boolean;
            caption: string;
            columnOrder: string | null;
            gridFormat: Gordic.Data.GridFormat | null;
            columnsBeforeSave: string[];
            metadata: Gordic.General.ApplicationInterface.GDataListDescription;
            data: any[];
            updateGridFormat: ((column: GGridColumn<any>) => GGridColumn<any>) | undefined;
        }[];
        copy: boolean;
        currentUnits: any;
        isPovolVlastnosti: boolean;
        pkFields: string[];
        private globalSettingLastDetails;
        createBase(this: GContent & GAdxDetailBase<T>, options: IGAdxDetailOptions): void;
        abstract createTitle(): string;
        abstract createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        abstract createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        abstract createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        abstract createForm(): any;
        abstract setEditMode(editMode: boolean): any;
        abstract saveData(data: any, close: boolean): JQueryPromise<any> | null | void;
        abstract updateGrid(filter: any, grid: any): any;
        abstract reloadData(filterObj: any, dataObj: any): any;
        abstract textPopis(): string | undefined | null;
        abstract create(): any;
        private updateLastViewed;
        private deepEqual;
        getMetadata(): any;
        private checkSavePermissions;
        private checkGridAccess;
        private addDefaultValues;
        private initContent;
        private createBaseActions;
        createShareActions(): MenuParams;
        private openDetailOnNewTab;
        setEditModeBase(editMode: boolean): void;
        protected saveBase(close: boolean): void;
        updateAfterSave(close: boolean): void;
        protected hideAllFlash(): void;
        private nextAndPreviousAction;
        getMetadataDetailPkFields(): any;
        getMetadataDetailPkFieldsFromRow(data: any): any;
        pendingAction(actionName: string, success?: boolean): void;
        closeAction(closeAfterSave?: boolean): JQuery.Deferred<any, any, any>;
        updateGridBase(): any;
        reloadDataBase(openDetail?: boolean, loaddataObj?: any, delay?: boolean): void;
        openDetailOrModalWindow(contentCs: string, filterObj: any, dataObj: any, dialogWidth?: number, dialogHeight?: number): void;
        checkErrors(errors: any[]): void;
        showBaseError(message?: string): void;
        showSuccessSave(close: boolean, message?: string): void;
        finishBuilder(): void;
        createFormComplet(): Gordic.Forms.Form;
        createStatusBar(): MenuParams[];
        createFlagNemenne(): GFieldFlagOptions;
        getAuditPristupu(): Gordic.Gin.DetailBuilder.GDetailBuilderSbpanelOptionsId;
        getAuditPristupuTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getAuditPristupuGroup(): IGTabGroupOptions;
        getPoznamky(): Gordic.Gin.DetailBuilder.GDetailBuilderSbpanelOptionsId;
        getValidatorDatOdDo(povolNull?: boolean, customClass?: string): Gordic.Validators.Base;
        MakeField<T = any>(a_name: string, ...extendedOptions: GControlBoxOptions<T | T[]>[] | GNumberBoxOptions<T | T[]>[] | GStringBoxOptions[]): Forms.Form;
        MakeSelectField<T = any>(a_name: string, fieldOptions: GSelectBoxOptions<T>, ...extendedOptions: GSelectBoxOptions<T, T | T[]>[]): Gordic.Forms.Form;
        MakeBoolField<T = any>(a_name: string, ...extendedOptions: GControlBoxOptions<T | T[]>[]): Gordic.Forms.Form;
        MakeBool10Field<T = any>(a_name: string, ...extendedOptions: GControlBoxOptions<T | T[]>[]): Gordic.Forms.Form;
        MakeFormField<T = any>(a_name: string, fieldOptions: GFormBoxOptions<T>): Gordic.Forms.Form;
        MakeFields(a_name: string): Gordic.Forms.Form;
        MakeSection(a_name: string): Gordic.Forms.Form;
        MakeRow(a_name: string): Gordic.Forms.Form;
        HideField(a_name: string): void;
        ShowField(a_name: string): void;
        private openSeznamAdmVlastnostObecnyObjekt;
        checkValidatorOdDo(): Gordic.Validators.Base;
        returnValueFunction(): any;
        /**
         * Funkce, která zastřešuje všechny úkony, které je nutné udělat po změně délky evidenčního čísla
         * @param options parametry
         * @returns
         */
        changeEventLenAc(options: {
            acCisloDoFieldName: string;
            acCisloOdFieldName: string;
            lenAcFieldName: string;
            minValue: number;
            maxValue: number;
            value: any;
        }): void;
        getAllAktivita(): number[];
        private createCisloOdDoValidator;
        private acCisloDoValidator;
        private createMaxValue;
        rokValidator(): Gordic.Validators.Base;
        acCisloOdChangeEvent(options: {
            errors: Gordic.Validators.Error[];
            maxValueFieldName: string;
            value: any;
        }): void;
        createPasswordField(options: {
            name: string;
            form: Gordic.Forms.Form;
            popis: string;
            modelFunction: (op: any, dto: any, opt: any, field: any) => void;
            confirmPasswordTwoTimes: boolean;
            onlyPassword: boolean;
            validators?: Gordic.Validators.Base[];
            disabledField?: boolean;
            formName?: string;
        }): void;
        createSamePasswordValidator(): Gordic.Validators.Base;
        getDataFromPasswordForm(ev: any, ctx: any, fieldName: any, formName: any): void;
        createIconAktivita(aktivita: number): string;
        createExtIdentifikaceField(): void;
        private createFormExtIdent;
        private createSpecialValidatorExtIdent;
        getAdmVlastnostObecnyObjektTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getAdmVlastnostObecnyObjektGroup(): IGTabGroupOptions;
        createFieldVelikost(options: {
            fieldName: string;
            initialValueNumber: JsonDecimal | number;
            initialValueUnit: number;
            form: Gordic.Forms.Form;
            caption: string;
            hint: string;
        }): void;
        createFieldsAktivita(priz_new: boolean, addPlatnost?: boolean, platnostType?: "date" | "datetime", dateRequired?: boolean): void;
        private copyBase;
        private manageVazby;
        private createVazby;
        private zdedeneVazbyGrid;
        saveVazbyBool(): boolean;
        updateVazbyBeforeSave(id: string, nazev: string, updateObj: (bussinessObj: string, obj: any) => any): any;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GAdxDialogResultKopieVazby extends GContentBase {
        private nazev;
        private objektId;
        private vysledky;
        prepareContent(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createForm;
        private createGrid;
        private createGridFormat;
        private logToFile;
    }
}
declare namespace Gordic.Adx.WebControls.GAdxGlobals {
    enum PlatnostEnum {
        predPlatnosti = 0,
        platne = 1,
        poPlatnosti = 2,
        neurceno = 3
    }
    enum ZamekEnum {
        uzamceno = 0,
        neuzamceno = 1
    }
    enum GAdxDataImportExportEnum {
        number = 0,
        text = 1,
        boolean = 2
    }
    interface ResultAsyncTask {
        icon: string;
        primaryText: string;
        secondaryText: string;
        meaning: Meaning;
        item: Async.IGTask;
        id: string;
    }
    function CreateAktivitaBadge(aktivita: number): GBadgeOptions;
    function CreateStavBadge(stav: number): GBadgeOptions;
    function CreatePlatnostBadge(platnost: any): GBadgeOptions;
    function CreateEditaceBadge(editace: any): GBadgeOptions;
    /**
     * Vztvoří sloupec platnost
     * @param data řádek dat
     * @param type typ platnosti (respektovat i čas)
     * @returns platnost
     */
    function CreatePlatnost(data: any, type?: "date" | "datetime"): any;
    function AdmContentSettings(): Gordic.Forms.Form;
    function padLeft(number: number, length: number, character: string): string;
    function ConvertSize(size: number | null, units?: string): string | null;
    function GetString(data: any): any;
    function CheckIsDuplicities(data: any[], property: string): boolean;
    function CheckIsDuplicitiesArray(data: any[]): boolean;
    function getAktivitaTxt(aktivita: number): string;
    function CheckAsyncTaskRunning(className: string): boolean;
    function GenerateRandomCislo(min: number, max: number): number;
    function GetVyberovaSkupina(typ_subj: number, returnFun: (n: any[]) => any): GActionParamsDefObj;
    function OpenVysledekKopieVazby(vysledek: {
        nazev: string;
        id: string;
        vysledky: Gordic.Adx.Interface.GAdxResultKopieVazbyDto[];
    }): void;
    function updateLastView(cnt: GContent): void;
    function findInMenuParams(taskId: string, menuParams: any[]): any;
    function findInMenuParamsWithPath(taskId: string, path: string[], menuParams: any[]): {
        action: any;
        path: string[];
    } | null;
}
declare namespace Gordic.Adx.WebControls.GAdxGridFunctions {
    function createGridFormat(dataListdescriptor: General.ApplicationInterface.GDataListDescription, columnOrder: string, withoutAktivita?: boolean, specialAktivitaColumns?: string[], specialStavColumns?: string[]): Gordic.Data.GridFormat;
    function createPanelData(title: string, row: any[] | null, gridFormat: Gordic.Data.GridFormat, panelElement: JQuery<HTMLElement>, gridOptions: any, columnList: string): void;
    function createAktivitaCaptionIcon(aktivita: number): any;
    function CreatePlatnostIcon(platnost: any): any;
    function createStavCaptionIcon(aktivita: number): any;
    function createDatOdOrDoColumn(gridFormat: Gordic.Data.GridFormat): void;
    function createOperaceIcon(operace: string): {
        icon: string;
        text: string;
        tooltip: string;
    };
}
declare namespace Gordic.Adx.GridUtils {
    function setPreviewEmpty(panelElement: JQuery<HTMLElement>): void;
    function setPanelGrid(title: string, row: any[] | null, gridFormat: Gordic.Data.GridFormat, panelElement: JQuery<HTMLElement>): void;
    /**
     * export function getColumnsName
     *
     * Z GridFormat vytáhne jména sloupců gridu a vrátí jména sloupců
     *
     * @param {Gordic.Data.GridFormat} gridFormat
     * @returns {string[]}
     */
    function getColumnsName(gridFormat: Gordic.Data.GridFormat): string[];
    /**
    * export function getScopedObj
    *
    * Přístup do vnořených položek zadané třídy na základě stringově definované cesty - Tedy to co lze přistoupit classInstance.item.subItem lze přistoupit také přes: getScopedObj(classInstance, "item.subItem")
    *
    * https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
    *
    * @param {any} scope Instance třídy, k jejímž položkám chcete na základě stringové cesty přistupovat
    * @param {string} str Textově definovaná cesta k interním položkám zadané instance
    */
    function getScopedObj(scope: any, str: string): any;
}
declare namespace Gordic.Adx.WebControls {
    abstract class GAdxHromadnaOperaceBase<TDto> {
        options: IGAdxHromadnaOperaceOptions;
        cnt: GContent & GAdxHromadnaOperaceBase<TDto>;
        formData: any;
        defineGridData: any[];
        resultGridData: any[];
        gridFormatBase: Gordic.Data.GridFormat;
        selectedData: any[];
        serviceCnt: GContent;
        closeOnSuccess: boolean;
        hromadneZmenyFields: {
            fieldName: string;
            caption: string;
            items: string[];
        }[];
        form: Gordic.Forms.Form;
        grid: JQuery<HTMLElement>;
        gridResult: JQuery<HTMLElement>;
        wizard: JQuery<HTMLElement>;
        abstract createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        abstract createDefineGridData(formData: any): any[];
        abstract createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        abstract saveData(data: any[]): JQueryPromise<any>;
        abstract validateRows(data: any): Gordic.Validators.GridError[];
        abstract testExistMethod(data: any[]): JQueryPromise<any>;
        abstract createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBase(this: GContent & GAdxHromadnaOperaceBase<TDto>, options: IGAdxHromadnaOperaceOptions): void;
        create(): void;
        getServiceCnt(): GContent;
        createObjectSelectBox(form: Gordic.Forms.Form): Gordic.Forms.Form;
        createAktivitaColumn(gridFormat: Gordic.Data.GridFormat): void;
        createGridBeforeSave(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        private mapPrimaryKey;
        private createView;
        createCartesianProduct2D(array1: any, array2: any): any[];
        transformDataToArrayObject(formData: any[], propertyName: string[]): any[];
        getColumnsDefineData(): GGridColumn<any>[];
        getGroupColumnCaption(): string[];
        getColumnsResultData(): GGridColumn<any>[];
        createGridFormatBase(resultGrid?: boolean): Gordic.Data.GridFormat;
        createResultData(resultData: {
            data: any;
            message: string;
            result: number;
        }[]): void;
        createResultGrid(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        getActionAdd(typ_obj: number): MenuParams;
        createDefaultFields(form: Gordic.Forms.Form, datOdDoType?: "date" | "datetime"): Gordic.Forms.Form;
        createSpecialOdDoValidator(): Gordic.Validators.Base;
        getCurrentDate(): Date;
        getCurrentDate100Years(): Date;
        private createActionsBase;
        private createWizard;
        private getDataBeforeSave;
        getAllAktivita(): number[];
        private copyRowData;
        createError(message: string, errorType?: string): Gordic.Validators.GridError;
        transformBoolValue(yesValue?: number): {
            apply?(modelValue: any): any | null | undefined | void;
            collect?(fieldValue: null | any): any | null | undefined | void;
        };
        selectExistInDb(ctx: any, exist: boolean): void;
        createFlagNemenne(): GFieldFlagOptions;
        updateDataBeforeEditGrid(): JQueryPromise<any>;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GAdxImportDataFromJson extends GContentBase {
        private typ_obj;
        private dataProperties;
        private saveDataFunction;
        private pkFields;
        private serviceCnt;
        private importFileGuids;
        private jsonData;
        private gridEl;
        private data;
        private getServiceCntBase;
        onContentReady(): void;
        onClose(): void;
        private init;
        private createWizard;
        private createForm;
        private convertData;
        private getDataFromForm;
        private createGrid;
        private createGridFormat;
        private getDataFromGrid;
        private saveData;
        private createResultGridFormat;
        private createGridResult;
        private updateResultData;
    }
}
declare namespace Gordic.Adx.WebControls {
    abstract class GAdxSeznamBase extends GAdxBase {
        /** Hlavní grid pro zobrazení dat */
        grid: JQuery<HTMLElement>;
        /** Content na který se odkazuji */
        cnt: GContent & GAdxSeznamBase;
        /** DataListDescriptor */
        dataListDescription: Gordic.General.ApplicationInterface.GDataListDescription;
        isAuthService: boolean;
        /** Aktuálně vybraný řádek */
        row: any;
        /** Základní nastavení seznamu */
        options: IGAdxSeznamOptions;
        /** Filtrační formulář možno rozšířit o další políčka */
        filterForm: Gordic.Forms.Form;
        /** Element pro filter */
        filter: JQuery<HTMLElement>;
        /** View, které obsahuje data */
        view: Gordic.Data.View;
        /** Sidebar */
        sidebar: JQuery<HTMLElement>;
        /** Element pro náhled */
        panelElement: JQuery<HTMLElement>;
        /** Grodformat pro grid i pro náhled */
        gridformat: Gordic.Data.GridFormat;
        /** Filtrační data */
        filterData: any;
        /** Otevření z tabu */
        tabOpen: boolean;
        comparatorCnt: JQuery<HTMLElement>;
        comparator: JQuery<HTMLElement> | null;
        comparatorBadge: GObservableObject<any>;
        comparatorItems: any[];
        testDivComparator: JQuery<HTMLElement>;
        icoBase: string;
        isPovolVlastnosti: boolean;
        isAdmOrAdxFaze: boolean;
        private zobrazovatCisloObjektuKey;
        private zobrazovatPrazdnySeznamKey;
        private pocetZaznamuKey;
        serviceCnt: GContent;
        openEmptyParams: {
            openEmpty: boolean;
            itemCount: number;
        };
        /**
         * Metoda pro otevření detailu
         * @param isNew true - nový záznam, false - editace
         */
        abstract openDetail(data: any | null, isNew: boolean, type?: number): void;
        /**
         * Přidání do filtračního formuláře uživatelká políčka (výběr aktivity přidán automaticky)
         */
        abstract createFilterForm(): void;
        /**
         * Nastavení "tvrdého filtru" po načtení seznamu (aktivita dodána automaticky)
         * @param hardfilter objekt pro tvrdý filter
         */
        abstract userhardDefaultFilter(hardfilter: any): any;
        /**
         * samotná úprava dat před aplikováním filteru přidání pevných filterů...
         * @param data objekt filteru
         */
        abstract collectData(data: any): void;
        /**
         * Aplikování filteru na data
         * @param filterData filtrační data
         */
        abstract applydata(filterData: any): void;
        /**
         * Vytvoření akcí uživatelských (nejčastěji vazební akce)
         * */
        abstract createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Kontextové menu nad gridem
         * */
        abstract createContextMenu(): MenuParams[];
        /**
         * Akce při výběru
         * @param obj vybrané objekty
         */
        abstract selectionGridAct(obj: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        abstract getNazev(data: any): string;
        /**
         * Akce při vytvoření objektu (nelze použít konstruktor)
         * */
        abstract create(): any;
        /**
         * Vytvoření create base
         * @param this
         * @param options
         */
        createBase(this: GContent & GAdxSeznamBase, options: IGAdxSeznamOptions): void;
        private adddefaultValues;
        private openEmptyListParams;
        private createBaseActions;
        createShareMenuBarActions(contextMenu?: boolean): MenuParams[];
        private createContentCaptionBase;
        createContentCaption(): string;
        openDialogOrModalWindow(cntInitializer: any, inputParams: any, dialogWidth?: number, dialogHeight?: number): void;
        private createTitle;
        private createBaseFilterForm;
        private convertAktivita;
        private createSidebar;
        createUserPanels(): GSideBarPanelOptions[];
        private createComparator;
        private createPanel;
        private refreshComparator;
        private addToBalance;
        private refreshPanel;
        openDetailBase(newRecord: boolean, ctx: any): any;
        /**
         * Přidání sloupce pro platnost (pokud mají data obsahovat dat_od dat_do, lze použít tento uživatelský sloupec)
         * @param data view z ISL
         */
        setPlatnostColumn(data: Data.View): void;
        /**
         * Vytvoření hlavního gridu
         * */
        createGrid(parentEl?: JQuery<HTMLElement> | null): void;
        rowsCheckEnabledFunction(row: MetaRow<any>): boolean;
        rowsEnabledFunction(row: MetaRow<any>): boolean;
        getDataCount(): JQueryPromise<Gordic.Adx.Interface.GAdxCountData> | null;
        profileChange(profileSetting: {
            oldProfile: GridProfile<any>;
            profile: GridProfile<any>;
        }): void;
        /**
         * Mo6nost upravit gridFormat (odebrat nepotřebné sloupce nebo je aktualizovat)
         * */
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
        addGridFormatColumns(gridformat: Gordic.Data.GridFormat, datOdDoColumns?: boolean): Gordic.Data.GridFormat;
        /**
         * Vytvoření filteru
         * @param parentEl
         */
        createFilter(parentEl?: JQuery<HTMLElement> | null): void;
        private checkFilterOnlyAktivita;
        private actFlashFilterNon;
        private openSeznamAdmVlastnostTypObjektu;
        private openSeznamAdmVlastnostObecnyObjekt;
        private openDialogVyberovaSkupina;
        private openBaseDialogHromadneVlastnosti;
        private openSeznamOnNewTab;
        private openDetailOnNewTab;
        getAktivitaTxt(aktivita: number): string;
        findColumnIndexByName(name: string): number;
        settingGroupingColumn(name: string, open: boolean): void;
        private zrusitZaznamy;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        private newHromadne;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): number | null;
        /**
         * Kontrola, zda se mohou načíst data
         */
        checkBeforeApply(filterData: any): boolean;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GAdxTaskList extends GContentBase {
        private userInfo;
        isAuthService: boolean;
        onContentReady(): void;
        private adminContentsBeforeExpire;
    }
}
declare namespace Gordic.Adx.WebControls {
    enum ITypePanel {
        Neurceno = 99
    }
}
declare namespace Gordic.Adx.Utils {
    /**
     * metoda pro smazání cache z políčka
     * - např. z Gordic.ControlsLogic.Client.GReaderGinspod
     *
     * @author thazmuka
     * @since 484.1.0.5
     */
    function clearCache(className: string): void;
    /** metoda pro smazání všech cache políček */
    function clearAllCache(): void;
    /**
        * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
        *
        * @param {JQuery<HTMLElement>} form předaný element formuláře
        * @returns {JQueryPromise<boolean>} výsledek stavu
        */
    function waitForValues(form: JQuery<HTMLElement>): JQueryPromise<boolean>;
    /** Typ výsledku operace */
    enum GOperationResultKind {
        /** The success */
        Success = 200,
        /** The information */
        Info = 203,
        /** The warning */
        Warning = 206,
        /** The error */
        Error = 400
    }
    /** konstanty pro ISL v ADM - odpovídá C# třídě GAdmIslConst  */
    enum GAdmIslConst {
        /** Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se nemají načítat data z DB, pouze se mají vrátit výchozí honodty pro požadovaný objekt */
        defaultValuesForNewRecord = "DefaultValuesForNewRecord",
        /** Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se jedná o položku, která je přítomná na detailu */
        detail = "detail",
        /** Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se jedná o položku, která je přítomná na seznamu */
        seznam = "seznam",
        /** Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se jedná o položku, která je všude - jak na seznamu, tak na detailu */
        everyWhere = ""
    }
    /**
     * na akci změní property enabled - povolí nebo zakáža
     */
    function setActionTooltip(Action: GAction | undefined, text: string | null | undefined): void;
    /**
     * na akci změní property enabled - povolí nebo zakáža
     */
    function setActionEnabled(Action: GAction | undefined, enabled: boolean | null | undefined): void;
    function setActionDisabled(Action: GAction | undefined, disabled: boolean | null | undefined): void;
    /**
     * Test, zda podle objektu typu GAdmSubjectPermissions můžu editovat
     * @param permissions
     */
    function getCanEdit(permissions: Gordic.Adx.Interface.GAdxSubjectPermissions | null | undefined): boolean;
    function getCanAdd(permissions: Gordic.Adx.Interface.GAdxSubjectPermissions | null | undefined): boolean;
    function getCanAddList(permissions: Gordic.General.ApplicationInterface.GDataAccessRightsEnum | null | undefined): boolean;
    /**
    * na akci změní property visibled - zobrazí nebo zneviditelní
    * @param Action
    * @param visible
    */
    function setActionVisible(Action: GAction | undefined, visible: boolean | null | undefined): void;
    /**
     * test, jestli je grid prázdný
     */
    function isGridEmpty(grid: any): boolean;
    /**
     * Převede číslo do hex
     * @param c číslo v desítkové soustavě
     */
    function NumberToHex(c: number): string;
    /**
     * Převede hexadecimální číslo do desítkového
     * @param hex hexadecimální číslo
     */
    function HexToNumber(hex: string): {
        r: number;
        g: number;
        b: number;
    } | null;
    /**
     * item template pro colorbox
     * @param value hodnota barvy
     */
    function ItemTemplateColorBox(value: any): JQuery<HTMLElement>;
}
declare namespace Gordic.Adx.WebControls {
    class GAdxVyberovaSkupinaDialog extends GContentBase {
        private data;
        private canAddVyberovaSkupina;
        private typ_subj;
        private ixs_fun;
        private srv;
        onContentReady(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createInfoFlash;
        private createForm;
        private createNewVyberovaSkupina;
        private vyberovaSkupinaOK;
        private saveDataVyberovaSkupina;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GAdxVyberovaSkupinaPrefab extends GContentBase {
        private gridVyberovaSkupina;
        private gridObsahVyberoveSkupiny;
        private typ_subj;
        prepareContent(): void;
        private init;
        private createCnt;
        private getVyberoveSkupiny;
        private createActions;
        private actOk;
        private createCommandBar;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GZdedeneVazbyGrid extends GContentBase {
        private columnOrder;
        private gridFormat;
        private dataListDescriptor;
        private data;
        private grid;
        private index;
        private updateGridFormat;
        prepareContent(): void;
        private actOk;
    }
}
declare namespace Gordic.Adx.WebControls {
    interface IGAdxDetailOptions {
        /**
         * Název contentu
         */
        contentName: string;
        /**
         * Data
         */
        data: any;
        /**
         * Aktuální filter
         */
        currentFilter?: any;
        /**
         * Grid
         */
        gridRc?: Gordic.Components.GridRC<any>;
        /**
         * Vytvořit akci pro předchozí a následující záznam
         */
        createPreviousAndNextAction?: boolean;
        /**
         * Nový záznam
         */
        newRecord: boolean;
        /**
         * Popis datového listu
         */
        dataListDescription: Gordic.General.ApplicationInterface.GDataListDescription;
        /**
         * Přidá platnost do state baru
         */
        addPlatnost?: boolean;
        /**
         * Typ platnosti, jestli se ignoruje čas, default - date
         */
        platnostType?: "date" | "datetime";
        /**
         * Přidá aktivitu do state baru
         */
        addAktivita?: boolean;
        /**
         * Popisek contentu (lidský název)
         */
        contentCaption: string;
        /**
         * Povolení editace externího ID
         */
        isPovolEditExterniId?: boolean;
        /**
         * Kopírování
         */
        copy?: {
            /**
             * Pocolení kopírování
             */
            allowCopy?: boolean;
            /**
             * Filtr
             */
            filterObj?: () => any;
            /**
             * Vazby objektu
             */
            vazby?: {
                /**
                 * Název kopírovaného objektu
                 */
                caption: string;
                /**
                 * ID bussiness objektu
                 */
                bussinessObj: string;
                /**
                 * Speciální filtrování (slouží pro předání speciálního filteru)
                 * @returns filtr
                 */
                filterSpecial?: () => any;
                /**
                 * Pořadí sloupců
                 */
                columnOrder?: string;
                /**
                 * GridFormat
                 */
                gridFormat?: Gordic.Data.GridFormat;
                /**
                 * Sloupce pro uložení
                 */
                columnsBeforeSave: string[];
                /**
                 * Aktualizace formátu gridu
                 * @param column sloupce
                 * @returns nové sloupce
                 */
                updateGridFormat?: (column: GGridColumn<any>) => GGridColumn<any>;
            }[];
        };
    }
    const OptionsDetailDefaults: IGAdxDetailOptions;
    interface IGAdmCopyOptions {
        caption: string;
        bussinessObj: string;
        columnOrder?: string;
        gridFormat?: Gordic.Data.GridFormat;
        data?: any[];
        metadata?: Gordic.General.ApplicationInterface.GDataListDescription;
        columnsBeforeSave: string[];
        updateGridFormat?: (column: GGridColumn<any>) => GGridColumn<any>;
    }
}
declare namespace Gordic.Adx.WebControls {
    interface IGAdxHromadnaOperaceOptions {
        title: string;
        data: any[];
        objectFields: string[];
        serviceCnt: string;
        keys: string[];
        contentId: string;
        editMode?: boolean;
        updateExist?: boolean;
        formSettings?: {
            aktivitaField?: boolean;
            datOdDoField?: boolean;
        };
        hromadneZmenyFields?: {
            fieldName: string;
            caption: string;
            items: string[];
        }[];
    }
    const OptionsHromadnaOperaceDefaults: IGAdxHromadnaOperaceOptions;
}
declare namespace Gordic.Adx.WebControls {
    interface IGAdxSeznamOptions {
        /**
         * This content
         */
        content: GContent<GAdxSeznamBase>;
        /**
         * Název contentu
         */
        contentName: string;
        /**
         * Popisek contentu (lidský název)
         */
        contentCaption: string;
        /**
         * Popis datového listu
         */
        dataListDescriptor: Gordic.General.ApplicationInterface.GDataListDescription;
        /**
         * Nastavení filtru
         */
        filterSettings?: {
            /**
             * Příznak vytvoření filtru
             */
            createFilter?: boolean;
            /**
             * Přidá výchozí aktivitu
             */
            addDefaultaktivita?: boolean;
            /**
             * Přidá výchozí rok
             */
            addDefaultRok?: boolean;
            /**
             * Oblíbené filtry
             */
            favorites?: string[] | "all";
            /**
             * Příznak otevření prázdného seznamu
             */
            emptyList?: boolean;
            /**
             * Příznak povinného prázdného seznamu
             */
            emptyListRequired?: boolean;
            /**
             * Mód filterpanelu
             */
            mode?: FilterViewMode;
            /**
             * Téma uložené v databázi
             */
            tema?: string | null;
        };
        /**
         * Nastavení komparátoru
         */
        comparatorSettings?: {
            /**
             * Přidá komparátor
             */
            addComparator?: boolean;
            /**
             * Template do hlavičky položky porovnávačky
             */
            itemTemplate?: string;
        };
        /**
         * Nastavení gridu
         */
        gridSettings?: {
            /**
             * Gridformát
             */
            gridFormat?: Gordic.Data.GridFormat | null;
            columnOrder?: string;
            defaultSort?: string;
            iconAktivitaColumns?: string[];
            iconStavColumns?: string[];
            profiles?: GridProfile<any>[];
            defaultProfile?: GridProfile<any> | null;
        };
    }
    const OptionsDefaults: IGAdxSeznamOptions;
    interface IGAdmGridSxs {
        sxs: string;
        nazev: string;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GMaskaEkoKonfigurace {
        private cnt;
        private ekoKonfigurace;
        private viewFields;
        private getRokSpecial?;
        constructor(cnt: GContent, ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[], specialRok?: () => number);
        changeRok(value: number, konfigurace: (result: any) => void): void;
        createForm(form: Gordic.Forms.Form): void;
        afterCreate(): void;
        setEditMode(editMode: boolean): void;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GMaskaEkoKonfiguraceBezRokuVsechnyPolozky {
        private cnt;
        private ekoKonfigurace;
        private reduceFields;
        private viewFields;
        private getRokSpecial?;
        constructor(cnt: GContent, ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[], specialRok?: () => number);
        private reductionFields;
        changeRok(value: number, editMode: boolean, konfigurace: (result: any) => void): void;
        createForm(form: Gordic.Forms.Form): void;
        setEditMode(editMode: boolean): void;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GDetailAdxVlastnostProSubjekt extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdxVlastnostProSubjektObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Adx.Interface.GAdxVlastnostProSubjektDto> {
        private typyPrirazeni;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.Adx.Interface.GAdxVlastnostProSubjektDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GHromadnaOperaceAdxVlastnostProSubjekt extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class GHromadnaOperaceAdxVlastnostProSubjektObj extends Gordic.Adx.WebControls.GAdxHromadnaOperaceBase<Gordic.Adx.Interface.GAdxVlastnostProSubjektDto> {
        private ico;
        private typyPrirazeni;
        private selectTypPrirazeni;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        private addCartesianResult;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        private createSpecialValidator;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GSeznamAdxVlastnostProSubjekt extends GContentBase<GSeznamAdxVlastnostProSubjektObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdxVlastnostProSubjektObj extends GAdxSeznamBase {
        private ixs_vsk;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GDetailAdxBudova extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdxBudovaObj extends GAdxDetailBase<Gordic.Adx.Interface.GAdxBudovaDto> {
        private isPovolPrisupovyKlic;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Adx.Interface.GAdxBudovaDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        private saveDataSpecial;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createSegmentyBudovyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createMistnostiTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createSegmentyBudovyGroup(): IGTabGroupOptions;
        createMistnostiGroup(): IGTabGroupOptions;
        private actSegmentBudovy;
        private actMistnostiBudovy;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GSeznamAdxBudova extends GContentBase<GSeznamAdxBudovaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdxBudovaObj extends GAdxSeznamBase {
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
        private actOpenSegmentyBudovy;
        private actOpenMistnostiBudovy;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GDetailAdxMistnost extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdxMistnostObj extends GAdxDetailBase<Gordic.Adx.Interface.GAdxMistnostDto> {
        private isPovolPrisupovyKlic;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Adx.Interface.GAdxMistnostDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        private saveDataSpecial;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createSimpleForm;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GSeznamAdxMistnost extends GContentBase<GSeznamAdxMistnostObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdxMistnostObj extends GAdxSeznamBase {
        private ico;
        private budova_kod;
        private segment_kod;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GDetailAdxOrganizacniJednotka extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdxOrganizacniJednotkaObj extends GAdxDetailBase<Gordic.Adx.Interface.GAdxOrganizacniJednotkaDto> {
        private adxCheckIcoNad;
        private admRpEdiextid;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Adx.Interface.GAdxOrganizacniJednotkaDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private openSslDenik;
        createSslDenikTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createSslDenikGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GSeznamAdxOrganizacniJednotka extends GContentBase<GSeznamAdxOrganizacniJednotkaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdxOrganizacniJednotkaObj extends GAdxSeznamBase {
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        getDataCount(): JQueryPromise<Gordic.Adx.Interface.GAdxCountData> | null;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
        private openSslDenik;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GDetailAdxPrirazenaVlastnostProObjekt extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdxPrirazenaVlastnostProObjektObj extends GAdxDetailBase<Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto> {
        knihy: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GHromadnaOperaceAdxPrirazenaVlastnostProObjekt extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class GHromadnaOperaceAdxPrirazenaVlastnostProObjektObj extends Gordic.Adx.WebControls.GAdxHromadnaOperaceBase<Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto> {
        private ico;
        private filterAgendyArray;
        private typ_obj;
        private sxs;
        knihy: boolean;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GSeznamAdxPrirazenaVlastnostProObjekt extends GContentBase<GSeznamAdxPrirazenaVlastnostProObjektObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdxPrirazenaVlastnostProObjektObj extends GAdxSeznamBase {
        private filterAgendyArray;
        typ_obj: number;
        sxs: string[];
        knihy: boolean;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
        getDataCount(): JQueryPromise<Gordic.Adx.Interface.GAdxCountData> | null;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        updateAktivitaHromadne(vybraneObjekty: Gordic.Adx.Interface.GAdxPrirazenaVlastnostProObjektDto[]): JQueryPromise<any> | null;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GDetailAdxPristupovyKlic extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdxPristupovyKlicObj extends GAdxDetailBase<Gordic.Adx.Interface.GAdxPristupovyKlicDto> {
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.Adx.Interface.GAdxPristupovyKlicDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GSeznamAdxPristupovyKlic extends GContentBase<GSeznamAdxPristupovyKlicObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdxPristupovyKlicObj extends GAdxSeznamBase {
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GDetailAdxSegmentBudovy extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdxSegmentBudovyObj extends GAdxDetailBase<Gordic.Adx.Interface.GAdxSegmentBudovyDto> {
        private isPovolPrisupovyKlic;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Adx.Interface.GAdxSegmentBudovyDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        private saveDataSpecial;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createMistnostiTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createMistnostiGroup(): IGTabGroupOptions;
        private actMistnostiBudovy;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GSeznamAdxSegmentBudovy extends GContentBase<GSeznamAdxSegmentBudovyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdxSegmentBudovyObj extends GAdxSeznamBase {
        private ico;
        private budova_kod;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
        private actOpenMistnostiBudovy;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GDetailAdxZodpovednyPracovnik extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdxZodpovednyPracovnikObj extends GAdxDetailBase<Gordic.Adx.Interface.GAdxZodpovednyPracovnikDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Adx.Interface.GAdxZodpovednyPracovnikDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Adx.WebControls {
    class GSeznamAdxZodpovednyPracovnik extends GContentBase<GSeznamAdxZodpovednyPracovnikObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdxZodpovednyPracovnikObj extends GAdxSeznamBase {
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        getDataCount(): JQueryPromise<Gordic.Adx.Interface.GAdxCountData> | null;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
