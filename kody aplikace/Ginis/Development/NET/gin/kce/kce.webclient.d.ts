declare namespace Gordic.Kce.WebClient {
    class GAppObjectDetail extends GContentBase {
        private gridAppObjectDetail;
        private nazev;
        private objectType;
        private atributy;
        srv(): GContent;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GAttributeDetail extends GContentBase {
        private authorization;
        private model;
        private selectedValue;
        private nadpis;
        private srv;
        saveAttribute(action: GAction): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GAttributes extends GContentBase {
        private authorization;
        private gridAtributy;
        srv(): GContent;
        getValueFromSelectbox(sbName: string): any | null;
        checkAttributes(deleteAttr: boolean): void;
        newAttribute(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GAuthorize extends GContentBase {
        prepareContent(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GEmptyPage extends GContentBase {
        prepareContent(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GEndpointDetail extends GContentBase {
        private model;
        private authorization;
        private Id;
        private aktivita;
        private gridKonfigurace;
        private gridKorelacniMapa;
        private gridAppObjects;
        private gridUsers;
        private gridPermission;
        private aktivitaValue;
        private nazevApp;
        private correlateAktivityMethods;
        private correlateObjectMethods;
        srv(): GContent;
        getCurrentState(): void;
        getCurrentActivity(): void;
        saveEndpoint(action: any): void;
        exportMap(): void;
        importMap(): void;
        correlationAll(): void;
        refreshCorelationMap(): void;
        refreshAppObjects(sessionId: string): void;
        refreshUsers(): void;
        refreshPermission(): void;
        exploreAppObjects(compareParameter: boolean): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GEndpointTypeDetail extends GContentBase {
        private model;
        private authorization;
        private authGateway;
        private gridDeclareAtributes;
        srv(): GContent;
        saveEndpointType(action: GAction): void;
        newApplication(): void;
        refreshDeclareAttributes(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GEndpoints extends GContentBase {
        private gridAplikace;
        private gridTypyAplikaci;
        private authorization;
        srv(): GContent;
        lockAdnUnlockEndpoints(id: number): void;
        registrationConectors(): void;
        newTypeApplication(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GGroupDetail extends GContentBase {
        private model;
        private gridUsers;
        private gridMembers;
        private authorization;
        srv(): GContent;
        getType(): string;
        getGroupMembers(): void;
        saveGroup(action: any): void;
        propagateGroup(): void;
        getUsers(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GGroups extends GContentBase {
        private paginationGtableGroup;
        private paginationGtableAccessGroup;
        private aktivita;
        private endpointTypes;
        private endpoints;
        private authorization;
        srv(): GContent;
        refreshAccessGroups(paging: GPaginationObject): void;
        refreshGroups(paging: GPaginationObject): void;
        getGroupParent(data: any): string;
        newGroup(): void;
        createGridFormatGroups(): Gordic.Data.GridFormat;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GIdmImplementationHistory extends GContentBase {
        srv(): GContent;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GKceSearchResolver extends Gordic.Components.Search.GBaseSearchResolver {
        itemsCount: number;
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        protected getDefaultId(): string;
        protected getResult(input: any, task: any): JQuery.Promise<any, any, any>;
        private createName;
        private createDescription;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GNoticeBoard extends GContentBase {
        private userCount;
        private gridJobs;
        private workflowToday;
        private workflowErrorToday;
        private itemTemplateChart;
        private itemTemplateMain;
        private itemTemplateEndpoint;
        private idmRoleCount;
        private appRoleCount;
        srv(): GContent;
        generateRoleGraph(className: string, appendTo: JQuery<HTMLElement>, typ: number, pocete: number): void;
        createForm(className: string, appendTo: JQuery<HTMLElement>, typ: number): Gordic.Forms.Form;
        private createGridFormat;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class Notification {
        private intervalProperty;
        constructor();
        private GetNotificationId;
        private GetAllViewNotifications;
        private CreateServiceCnt;
        private RegisterCloseFunction;
        private GetIconForNotification;
        private AddNotification;
        private AddNewNotifications;
        private CheckOpenExceptionsContent;
        AddNotificationById(id: number): void;
        GetOldNotifications(): void;
        LoadNotifications(): void;
        LoadNotificationsRegularly(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GOrgUnitDetail extends GContentBase {
        private model;
        private authorization;
        private spravovatelnost;
        private parents;
        private gridAtributy;
        private gridSubUnits;
        private gridMembers;
        private gridRules;
        srv(): GContent;
        getEntirePath(): void;
        getParentOu(): void;
        getParentEndpoint(): void;
        refreshOrgUnitChildren(): void;
        refreshOrgUnitMembers(): void;
        refreshOrgUnitRules(): void;
        saveOrgUnit(action: GAction): void;
        propagateOrgUnit(): void;
        propagateRecursionOrgUnit(): void;
        moveOrgUnit(): void;
        deleteOrgUnit(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GOrgUnits extends GContentBase {
        private authorization;
        private activeOrgUnit;
        private treeGridOrgUnit;
        private userGrid;
        private paginationTable;
        private permUserGroupGrid;
        private permRoleGrid;
        private accessTypes;
        srv(): GContent;
        refreshOrgUnitLink(sel: any, appenToObj: JQuery<HTMLElement>): void;
        refreshAccessUserGroup(id: number | null | undefined): void;
        refreshAccessRole(id: number | null | undefined): void;
        refreshOrgUnitsMembers(orgUnit: number | null): void;
        refreshOrgUnits(paging?: GPaginationObject): void;
        newOrgUnit(): void;
        deleteAccessIdmObject(data: any): string | JQuery;
        viewResultOfAddAccess(cnt: GContent, msg: Idm.Interface.Controllers.Message): void;
        addUserAccess(): void;
        createGridFormat(): Data.GridFormat<any>;
        addGroupAccess(): void;
        addRoleAccess(): void;
        createActionAddRoleAccess(sbName: string): GAction;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GOvladaciPrvky extends GContentBase {
        private authorization;
        private gridEl;
        private srv;
        private getSrv;
        onContentReady(): void;
        private init;
        private createActions;
        private createMenubar;
        private createGrid;
        private loadData;
        private formDetail;
        private opendetail;
    }
}
declare namespace Gordic.Kce.WebClient.Refresh {
    function RefreshEndpoints(endpointsGrid: JQuery<HTMLElement>): void;
    function RefreshEndpointTypes(endpointTypesGrid: JQuery<HTMLElement>): void;
    function RefreshOrgUnitsTree(treegrid: JQuery<HTMLElement>): void;
    function RefreshWorkflows(paginationTableWorkflows: JQuery<HTMLElement>, paging?: GPaginationObject | null): void;
    function RefreshWorkflowsTypes(gridWfTypes: JQuery<HTMLElement>): void;
    function RefreshAttributes(gridAttributes: JQuery<HTMLElement>): void;
    function RefreshReports(gridReports: JQuery<HTMLElement>): void;
    function RefreshRules(gridRules: JQuery<HTMLElement>): void;
    function RefreshMyJobs(gridMyJobs: JQuery<HTMLElement>): void;
}
declare namespace Gordic.Kce.WebClient {
    class GReportDetail extends GContentBase {
        private model;
        private authorization;
        private gridAtributy;
        srv(): GContent;
        saveReport(action: GAction): void;
        registrationParameters(action: GAction): void;
        runReport(action: GAction): void;
        getHelp(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GReports extends GContentBase {
        private authorization;
        private gridReports;
        srv(): GContent;
        newReportType(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GRoleDetail extends GContentBase {
        private model;
        private $gridAppRole;
        private $gridAppGroups;
        private $gridDrzitele;
        private $gridZahrnuta;
        private authorization;
        srv(): GContent;
        refreshAppRoles(): void;
        refreshAppGroups(): void;
        refreshRoleMembers(): void;
        refreshIncludeInRole(): void;
        saveRole(field: any): void;
        copyRole(): void;
        propagateRoleMembers(id: number): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GRoles extends GContentBase {
        private authorization;
        private paginationGtable;
        private paginationGtableAppRole;
        srv(): GContent;
        refreshAppRoles(paging: GPaginationObject): void;
        newRole(): void;
        onContentReady(): void;
        createGridFormat(): Gordic.Data.GridFormat;
        createGridFormatAppRole(): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GRuleDetail extends GContentBase {
        private model;
        private authorization;
        private gridRole;
        srv(): GContent;
        saveRule(action: GAction): void;
        refreshRole(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GRules extends GContentBase {
        private authorization;
        private events;
        private actionsRule;
        private gridRules;
        srv(): GContent;
        newRule(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GSettingDetail extends GContentBase {
        private model;
        private authorization;
        srv(): GContent;
        saveGlobalSetting(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GSettings extends GContentBase {
        private authorization;
        private gridSettings;
        srv(): GContent;
        refreshGlobalSettings(): void;
        newGlobalSetting(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GUserAudit extends GContentBase {
        private authorization;
        private tabContent;
        private userId;
        private gridAuditArray;
        srv(): GContent;
        refreshAuditRecords(cislo: number, auditRecords: GIdmRoleAuditRecord[] | null | undefined): void;
        refreshAudit(): void;
        actRepairAddUserAppRole(d: any): JQuery;
        actRepairPropagateUserAppRole(d: any): JQuery;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GUserDetail extends GContentBase {
        private model;
        private online;
        private onlineControl;
        private $gridRole;
        private $gridSkupiny;
        private $gridUkoly;
        private $gridHistorie;
        private cardView;
        private authorization;
        private orgunits;
        private userimage;
        private extensionControls;
        private srv;
        getZarazeni(userId: number): void;
        refreshRole(): void;
        refreshGroups(): void;
        refreshEffectiveAccessGroups(): void;
        refreshEffectiveAccessRoles(): void;
        refreshUkoly(): void;
        refreshHistory(datum1: Date | null, datum2: Date | null): void;
        removeAccess(field: any): void;
        exportToFile(): void;
        saveUser(field: any): void;
        propagovat(): void;
        propagovatVybrane(): void;
        auditRoli(): void;
        userPhoto(): void;
        renderOnlineStatus(epId: any, userId: any): void;
        private onlyUnique;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GUsers extends GContentBase {
        private authorization;
        private paginationGtable;
        srv(): GContent;
        refreshUsers(paging?: GPaginationObject): void;
        newUser(): void;
        onContentReady(): void;
        private createGridFormat;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GWfJobDetail extends GContentBase {
        private authorization;
        private model;
        private atributy;
        private gridAtributy;
        private extensionControls;
        srv(): GContent;
        viewResult(results: any[]): void;
        clickAction(nazevAkce: string, action: GAction): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GWorkflowDetail extends GContentBase {
        private authorization;
        private model;
        private gridAtributy;
        private gridUkoly;
        private gridAudit;
        srv(): GContent;
        refreshWfJobs(): void;
        refreshWfAudit(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GWorkflowTypeDetail extends GContentBase {
        private authorization;
        private model;
        private attributes;
        private help;
        private svg;
        private definitionsTypes;
        private gridAtributy;
        private gridParametry;
        private gridSkupiny;
        private tabPopis;
        srv(): GContent;
        runWorkflow(action: GAction): void;
        settingEditor(info: GGridEditorInfoType<any>): void;
        saveWfTypeJob(action: GAction): void;
        registerParameters(): void;
        refreshGroups(): void;
        refreshAttributes(): void;
        onContentReady(): void;
        private uploadDialog;
        private okAction;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GWorkflows extends GContentBase {
        private authorization;
        private paginationWorkflows;
        private gridWorkflowsType;
        private date;
        private viewError;
        private wfStates;
        private definitionTypes;
        srv(): GContent;
        newWorkflowType(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient {
    class GMainApp extends GContentBase {
        onContentReady(): void;
    }
}
declare namespace Gordic.Kce.WebClient.Utils {
    function RegisterSearchResolver(): void;
    function RenderControls(extensionControls: GExtensionControl[], tabNastroje: string, id: number, type: string): void;
}
declare namespace Gordic.Kce.WebClient.GAttributesControls {
    /**
     * Funkce pro validaci hodnot
     * @param attribute - gidmsipmle attribute - atributy wf
     */
    function ValidateDate(attribute: GIdmSimpleAttribute): void;
    /**
     * Funkce pro parsování data z českého formátu
     * @param czechDate datum v českém formátu
     */
    function ParseDateFromCzech(czechDate: string): Date | string;
    /**
     * Funkce pro vztvoření tabu pro atributy
     * @param tab parent kam se grid pripojuje
     * @param model objekt obsahující atributy a id
     * @param srv content se serverovou logikou
     * @param webWritePermission příznak zda se může zapisovat
     */
    function CreateAttributeTab(tab: JQuery<HTMLElement>, model: GIdmUser | GIdmGroup | GIdmEndpoint | GIdmOrgUnit | GIdmRole, srv: GContent, webWritePermission: boolean, isAutofit?: boolean): void;
}
declare namespace Gordic.Kce.WebClient {
    class GControls {
        private cnt;
        private type;
        private id;
        constructor(type: string, id: number);
        call(name: string, obj: any): void;
    }
}
interface GSortingColumns {
    name: string;
    caption: string;
    field?: string;
}
interface GPaginationGtableParams<TRow> {
    tableParams: Omit<GTableOptions<TRow>, "data">;
    sortingColumns?: string[];
    defaultSorting?: string;
    loadAtOnce?: boolean;
    loadWithoutSearchText?: boolean;
    id: string;
    change: (paging: Gordic.Kce.WebClient.GPaginationObject) => void;
}
declare namespace Gordic.Widget {
    class GPaginationTable<TRow> extends Gordic.Widget.JQueryWidget<GPaginationGtableParams<any>> {
        static widgetName: string;
        private actions;
        private id;
        private itemViewCount;
        private allItemsCount;
        private sortingColumns;
        private allWidget;
        private headerFormWidget;
        private mainElement;
        private pagingPanel;
        private emptyTable;
        private currentPagination;
        _create(): void;
        _destroy(): void;
        private _createEmptyPanel;
        private getLengthPage;
        private _createActions;
        private _createSortingColumns;
        private _getSortingColumns;
        private _createMainWidget;
        private _createHeaderForm;
        private _checkFormValid;
        private _createSpecialValidators;
        private _directionChange;
        private createResultPanel;
        private createBottomForm;
        private isFirst;
        private isLast;
        private _rangePages;
        private _changePage;
        private createBottomPanel;
        private _initResizeManager;
        private _uninitResizeManager;
        setData(data: TRow[] | Gordic.Data.View<TRow>, itemCount: number): void;
        refresh(): void;
        getDefaultSorting(): Gordic.Kce.WebClient.GPaginationObject;
        getCurrentSorting(): Gordic.Kce.WebClient.GPaginationObject;
    }
}
interface JQuery {
    gpaginationTable<TRow = any>(...options: GPaginationGtableParams<TRow>[]): this;
    gpaginationTable<TRow = any>(method: "setData", data: TRow[] | Gordic.Data.View<TRow> | undefined, allItemCount: number | undefined): Gordic.Data.View<TRow>;
    gpaginationTable(method: "getDefaultSorting"): Gordic.Kce.WebClient.GPaginationObject;
    gpaginationTable(method: "getCurrentSorting"): Gordic.Kce.WebClient.GPaginationObject;
    gpaginationTable(method: "refresh"): void;
}
