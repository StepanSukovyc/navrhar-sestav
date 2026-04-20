declare namespace Gordic.Widget.GOutline {
    interface IGOutlineNode {
        /** Zobrazí se jako titulek v navigátoru */
        caption: string;
        /** Další úroveň IGOutlineNode */
        children?: IGOutlineNode[];
        /** Bod, se kterým bude tento Node provázán tj. element, na který odkazuje */
        point: HTMLElement;
    }
    interface INavPair {
        /** Element ve zvázaném elementu, který odpovídá navItem */
        navPoint: Element;
        /** Element v navigátoru, který odpovídá navPoint */
        navItem: Element;
        /** Úroveň zanoření navigátoru, ve které se navItem nachází. */
        level: number;
    }
    /** Interface for Widget options. */
    interface IOptions {
        mode?: "scroll" | "focus";
        getTree?: () => IGOutlineNode[];
        customClassNavPoint?: string;
        navclick?: (event: JQueryEventObject, data: INavPair) => any;
    }
    interface IDefaultOptions {
        mode: "scroll" | "focus";
    }
}
interface JQuery {
    goutline(options?: Gordic.Widget.GOutline.IOptions): JQuery;
    goutline(method: "setActive", element?: Element | null): JQuery;
    /**
     * Pro navItem nebo navPoint vrátí objekt obsahující oba provázané
     * elementy a navíc úroveň zanoření v navItem.
     * @param element navPoint nebo navItem jako nativní Element
     */
    goutline(method: "getNavPair", element?: Element): Gordic.Widget.GOutline.INavPair;
    /**
    * Překreslí this.element
    */
    goutline(method: "refresh"): JQuery;
    /**
    * Nastaví stateActive item v this.element (modře vyznačený teploměr).
    */
    goutline(method: "setActive", target: Element | null): JQuery;
    goutline(method: "bindForm", form: JQuery, treeTransform?: ((tree: Gordic.Widget.GOutline.IGOutlineNode[]) => Gordic.Widget.GOutline.IGOutlineNode[])): JQuery;
    goutline(method: "unbindForm"): JQuery;
}
declare namespace Gordic.Widget {
    interface GActionCtMenuOptions {
        params?: MenuParams[];
        actions?: GAction[] | GActionList;
        customClass?: string;
        userSettings?: Gordic.Data.IGStorage;
        /**
         * beforeOpen
         * @type null = kontextové menu prohlížeče, undefined = toto kontextové menu ve výchozím nastavení, MenuParams[] = jiné menuparams než byly nastaveny v options pri vytvoreni widgetu
         */
        beforeOpen?: (params: MenuParams[]) => MenuParams[] | null | undefined;
        opened?: (ev: JQueryEventObject) => void;
        closed?: (ev: JQueryEventObject) => void;
    }
    class GActionCtMenu extends JQueryWidget<GActionCtMenuOptions> {
        static widgetName: string;
        private _menu;
        private _isOpeningMenu;
        private _profiled?;
        private _menuPositionShifted;
        _create(): void;
        _destroy(): void;
        _setOptions(options: any): void;
        _setOption(key: any, value: any): void;
        _refresh(): void;
        _prepareProfiled(): MenuParams[];
        _loadProfile(): Gordic.Utils.Menu.IGMenuProfile | undefined;
        _saveProfile(profile: Gordic.Utils.Menu.IGMenuProfile | null): void;
        _applyProfile(profile: Gordic.Utils.Menu.IGMenuProfile | null | undefined): MenuParams[];
        _ensureMenu(): void;
        _isCustomizationEnabled(): boolean;
        _showSettings(): void;
        _showSettingsTest(profile: Gordic.Utils.Menu.IGMenuProfile, params: MenuParams[]): void;
        open(ev?: JQuery.Event | Event): JQuery;
        close(): JQuery;
    }
}
interface JQuery {
    /** Kontextove menu s gactionmenu + ginlinedialogem */
    gactionctmenu(options?: Gordic.Widget.GActionCtMenuOptions): JQuery;
    gactionctmenu(method: "open", ev?: JQuery.Event | Event): JQuery;
    gactionctmenu(method: "close"): JQuery;
}
declare namespace Gordic.Utils.Menu {
    function showTasklistSettings($tl: JQuery): void;
}
declare namespace Gordic.Widget {
    interface GSwipeableOptions {
        /** Aktualne probihajici swipe. */
        swiping?: (ev: JQuery.Event, args: GSwipableMoveEventArgs) => void;
        /** Swipe dobehnul az do konce. */
        swiped?: (ev: JQuery.Event, args: GSwipableEventArgs) => void;
        /** Swipe byl zrusen. */
        cancelled?: (ev: JQuery.Event) => void;
    }
    interface GSwipableEventArgs {
        /** Vysledny smer tazeni (z rozdilu konec vs start tazeni) */
        direction: GSwipeableDirection;
        /** Rozdil od zacatku tazeni. */
        diffX: number;
        /** Rozdil od zacatku tazeni. */
        diffY: number;
    }
    interface GSwipableMoveEventArgs {
        /** Rozil od predchozi udalosti, muze byt zaporny */
        diffX: number;
        /** Rozil od predchozi udalosti, muze byt zaporny */
        diffY: number;
    }
    type GSwipeableDirection = "left" | "right" | "up" | "down";
    /**
     * GSwipeable
     * Primitivni widgetek pro detekci jednoduchych gest pro dotykova zarizeni. Resi konflikty ruznych
     * udalosti, napr. oznaceni textu, apod. Nebude fungovat na IE.
     *
     * Inspirovano:  https://github.com/webdevelopers-eu/jquery-dna-gestures/blob/master/jquery.gestures.js
     *
     * @author bmartinek
     * @since 486.1.0.337
     */
    class GSwipeable extends JQueryWidget<GSwipeableOptions> {
        static widgetName: string;
        private _handleStart;
        private _handleEnd;
        private _handleCancel;
        private _handleMove;
        private _startEv;
        private _prevEv;
        private _scrollables;
        _create(): void;
        _destroy(): void;
        _resolveSwipedEventArgs(evStart: TouchEvent, evCurr: TouchEvent): GSwipableEventArgs | null;
    }
}
interface JQuery {
    gswipeable(options?: Gordic.Widget.GSwipeableOptions): JQuery;
    gswipeable(method: "destroy"): JQuery;
}
declare namespace Gordic.Previews {
    interface GPreviewControllerOptions<TData = any> extends GPreviewOptions {
        panelOptions?: GSideBarPanelOptions;
    }
    interface GPreviewShowOptions {
        opened?: boolean;
        pinned?: boolean;
        activeTab?: number;
        loadOptions?: ObjectLiteral<any>;
    }
    interface GPreviewShowInfoOptions {
        icon?: string;
        title?: string | JQuery;
        message?: string | JQuery;
    }
    /**
      * GPreviewController - class for easier handling of preview sidepanels on contents.
      *
      * create instance(with previewOptions, where you put tabs you want (Gordic.Previews.getDefaultXXXX))
      * call registerPanel
      * call enable(true) if any row is selected, call enablePreview(false) otherwise
      * call show(row) with your data, to show in previews.
      *
      * @author Vlastimil Máca
      * @since 480.1.0.252
      */
    class GPreviewController<TData = any> {
        private sidebarElement;
        private previewOptions;
        private panelController;
        /**
          * shows/updates preview for given data
          *
          * @param {any} data
          */
        show(data?: TData, opts?: GPreviewShowOptions): void;
        showInfo(info: string | JQuery | GPreviewShowInfoOptions): void;
        /**
          * class for easier handling of preview sidepanels on contents.
          *
          * @param {GContent} content
          * @param {GPreviewOptions} previewOptions
          * @param {GSideBarPanelOptions} [panelOptions]
          */
        constructor(sidebarElement: JQuery, previewOptions: GPreviewControllerOptions<TData>);
        /**
          * Enables or disables previews in previewPanel - shows text "No row was selected"
          *
          * @param {any} enabled
          */
        enable(enabled: any): void;
        /**
         * OBSOLETE !!! Použít property panelOptions v options v konstruktoru
         * @deprecated OBSOLETE !!! Použít property panelOptions v options v konstruktoru
         * Creates previewPanel
         */
        registerPanel(panelOptions?: GSideBarPanelOptions): void;
        private _registerPanel;
    }
    /**
   * GPreviewPanelController - class for easier handling of preview panels
   *
   * create instance(with previewOptions, where you put tabs you want (Gordic.Previews.getDefaultXXXX))
   * call getPanel to get panelOptions for sidebar
   * call enable(true) if any row is selected, call enablePreview(false) otherwise
   * call show(row) with your data, to show in previews.
   *
   * @author Vlastimil Máca
   * @since 480.1.0.252
   */
    class GPreviewPanelController<TData = any> {
        private previewDiv;
        private panel;
        private rowToPreview;
        private lastShow;
        private neverShown;
        /**
          * shows/updates preview for given data
          *
          * @param {any} data
          */
        show(data?: TData, opts?: GPreviewShowOptions): void;
        showInfo(info: string | JQuery | GPreviewShowInfoOptions): void;
        getPanel(): GSideBarPanelOptions;
        /**
          * class for easier handling of preview sidepanels on contents.
          *
          * @param {GContent} content
          * @param {GPreviewOptions} previewOptions
          * @param {GSideBarPanelOptions} [panelOptions]
          */
        constructor(previewOptions: GPreviewControllerOptions<TData>);
        private loadPreview;
        /**
          * Enables or disables previews in previewPanel - shows text "No row was selected"
          *
          * @param {any} enabled
          */
        enable(enabled: any): void;
    }
}
declare namespace Gordic.Widget {
    export interface GContentPickerOptions {
        params: MenuParams[];
        levelsVisible?: number;
        navigated?: GContentPickerNavigatedEv;
        beforeCreateContent?: GContentPickerBeforeCreateContentCallback;
        content?: (ev: JQueryEventObject, param: MenuParams, element: JQuery) => void;
    }
    export type GContentPickerNavigatedEv = (ev: JQueryEventObject, args: GContentPickerNavigatedArgs) => void;
    export interface GContentPickerNavigatedArgs {
        /** Vybrany menuParam */
        selected?: MenuParams;
        /** Cesta od vybraneho parametru az k rootu */
        selectedPath?: MenuParams[];
    }
    export type GContentPickerBeforeCreateContentCallback = (this: JQuery, params: MenuParams, content: JQuery) => JQuery;
    interface GContentNewOpsArgs {
        commandBar?: MenuParams[];
        statusBar?: MenuParams[];
        actions?: GActionList;
    }
    export class GContentPicker extends JQueryWidget<GContentPickerOptions> {
        static widgetName: string;
        protected _wrp: JQuery;
        protected _menu: JQuery;
        protected _contentWrp: JQuery;
        protected _contentHeader: JQuery;
        protected _contentStatusbar: JQuery;
        protected _contentCommandbar: JQuery;
        protected _dynamicContent: JQuery;
        private _isResizing;
        private _canResizeMenu;
        private _lastMenuLevel;
        protected _getCreateOptions(): GContentPickerOptions;
        _create(): void;
        _destroy(): void;
        _setOptions(options: any): void;
        _setOption(key: any, value: any): void;
        private _initResizeManager;
        private _uninitResizeManager;
        protected _refresh(): void;
        protected _refreshMenu(): void;
        protected _updateContentHeader(params?: MenuParams): void;
        protected _createContentHeader(params?: MenuParams): JQuery;
        protected _setContent(params: MenuParams): void;
        protected _getWrapperWidth(): number;
        protected _updateMenuWidth(level?: number): number | undefined;
        protected _getMaxMenuVisibleFrames(): number;
        protected _toggleMenu(menuVisible: boolean, contentVisible: boolean): void;
        protected _createCommandBar(params: MenuParams[], actions?: GActionList): void;
        protected _destroyCommandBar(): void;
        protected _createStatusBar(params: MenuParams[], actions?: GActionList): void;
        protected _destroyStatusBar(): void;
        protected _onContentNewOps(o: GContentNewOpsArgs): void;
        /** Mozno nastavit obsah nehlede na vybranou polozku menu */
        setContent(cnt: string | JQuery): void;
        /** Aktivuje danou polozku */
        activateItem(mp: MenuParams): void;
    }
    export {};
}
interface JQuery {
    /** ContentPicker - menu + nejaky obsah */
    gcontentpicker(options?: Gordic.Widget.GContentPickerOptions): JQuery;
    /** Mozno nastavit obsah, ktery muze byt vlozen do DOM pozdeji (bezpecnejsi varianta nez pres metodu 'getContent') */
    gcontentpicker(method: "setContent", cnt: string | JQuery): JQuery;
    /** Aktivuje danou polozku */
    gcontentpicker(method: "activateItem", mp: MenuParams): JQuery;
}
declare namespace Gordic.Widget {
    interface IGWhiteNoiserOptions {
        /**base64 sound*/
        sound?: string;
    }
    class GWhiteNoiser extends JQueryWidget<IGWhiteNoiserOptions> {
        static widgetName: string;
        private _audio?;
        private _oscilator?;
        protected _getCreateOptions(): IGWhiteNoiserOptions;
        _create(): void;
        _destroy(): void;
        activate(): void;
        deactivate(): void;
    }
}
interface JQuery {
    gwhitenoiser(options?: Gordic.Widget.IGWhiteNoiserOptions): JQuery;
    gwhitenoiser(method: "activate"): JQuery;
    gwhitenoiser(method: "deactivate"): JQuery;
}
declare namespace Gordic.Widget.GStepper {
    /**
     * Interface GStepper (Krokovník)
     *
     * @author thazmuka
     * @since 484.1.0.19
     */
    export interface IGStepperOptions {
        /** jednotlivé obsahy stepperu */
        steps: IGStepperStepOptions[];
    }
    interface IGStepperStepOptions {
        title: string;
        /** tělo nápovědy */
        content: JQuery<HTMLElement>;
        /** navázaný element */
        relatedElement: JQuery<HTMLElement>;
    }
    export {};
}
interface JQuery {
    gstepper(options?: Gordic.Widget.GStepper.IGStepperOptions): JQuery;
}
/**
 * IGTabManagerOptions
 *
 * @author Vlastimil Máca
 * @since 480.1.0.486
 */
interface IGTabManagerOptions extends JQueryUI.WidgetOptions {
    scopeElement?: JQuery;
    groups?: (IGTabGroupOptions | GObservableObject<IGTabGroupOptions>)[];
    activeItem?: number;
    openTabs?: boolean;
    displayLevel?: 1 | 2;
    /**
     * On tabGroup open, if others tab is clicked, ctx is undefined.
     */
    open?: (ev: JQuery.Event, ctx?: IGTabGroupOptions) => void;
    menuProfile?: Gordic.Utils.Menu.IGMenuProfile | null;
    itemReplaced?: GButtonPanelOptions["itemReplaced"];
}
declare namespace Gordic.Widget {
    class GTabManager extends JQueryWidget<IGTabManagerOptions> {
        static widgetName: string;
        private subtaskAction;
        private othersAction;
        private settingsParam;
        private othersActionInstance;
        private switchingWidget;
        private menuParams;
        private origMenuParams;
        static readonly noAutoOpenClass = "gtabmanager-no-auto-open";
        static readonly firstAutoOpenClass = "gtabmanager-first-auto-open";
        static readonly contextHelpNamespace = ".gtabmanagercontexthelp";
        private static readonly tabGroupOthersId;
        private updateMethod;
        private forceShowListener?;
        refresh(): void;
        protected _groupToParam(group: IGTabGroupOptions | GObservableObject<IGTabGroupOptions>): MenuParams | null;
        protected _getCreateOptions(): IGTabManagerOptions;
        protected _handleTabOpen(tabs: JQuery): void;
        protected _handleContextHelp(tabs: JQuery): void;
        protected _init(): void;
        /**
         * Activates group, tabGroup and markerClass are not required only for Others group.
         * @param groupId
         * @param tabGroup
         * @param markerClass
         */
        private activateGroup;
        private rememberActiveItem;
        private _fieldErrorHandler;
        private rebuild;
        private _update;
        setActive(input: string | null | IGTabGroupOptions, invoke?: boolean): void;
        getActive(): string | null;
        enableGroup(input: string | IGTabGroupOptions | ((string | IGTabGroupOptions)[]), enabled: boolean): void;
        visibleGroup(input: string | IGTabGroupOptions | ((number | string | IGTabGroupOptions)[]), visible: boolean): void;
        getMenuParams(pure?: boolean): MenuParams[];
        applyMenuProfile(profile: Gordic.Utils.Menu.IGMenuProfile | null): void;
        getTabsForGroup(groupId: string): JQuery<HTMLElement>;
        getGroupablesForGroup(groupId: string): JQuery<HTMLElement> | undefined;
        private _getMenuParamIdx;
        _setOption(key: any, value: any): void;
        _destroy(): void;
    }
}
interface JQuery {
    gtabmanager(options?: IGTabManagerOptions): JQuery;
    gtabmanager(method: 'refresh'): JQuery;
    gtabmanager(method: 'setActive', input: 0 | string | IGTabGroupOptions, invoke?: boolean): JQuery;
    gtabmanager(method: 'getActive'): string | null;
    gtabmanager(method: 'enableGroup', input: string | IGTabGroupOptions | ((string | IGTabGroupOptions)[]), enabled: boolean): JQuery;
    gtabmanager(method: 'visibleGroup', input: string | IGTabGroupOptions | ((string | IGTabGroupOptions)[]), enabled: boolean): JQuery;
    gtabmanager(method: 'getMenuParams', pure?: boolean): MenuParams[];
    gtabmanager(method: 'getTabsForGroup', groupId: string): JQuery;
    gtabmanager(method: 'getGroupablesForGroup', groupId: string): JQuery;
    gtabmanager(method: 'applyMenuProfile', menuProfile: Gordic.Utils.Menu.IGMenuProfile | null): JQuery;
    gtabmanager(method: 'destroy'): JQuery;
}
declare namespace Gordic.Prefabs.TabGroups {
    const markerPrefix = "tab-group-";
    function getMarkerClass(group: IGTabGroupOptions | string): string | null;
}
/**
 * MarkDown
 *
 * @author Petr Horsák
 * @since 482.1.0.486
*/
declare namespace Gordic.Markdown {
    function getMDProcessor(): JQueryPromise<any>;
    interface GMarkdownOptions {
        /**
         * markdown obsah k zobrazeni
         * @type {string}
         */
        content: string;
        /**
         * Vlastni MD processor. Pokud neni uveden, pouzije se vychozi
         * @type {any}
         */
        MDProcessor?: any;
        /**
         * Povoleni zpracovani odkazu gimage: a gfile: odkazujicich do databazovych zdroju
         * @type {boolean}
         */
        allowGResources?: boolean;
    }
    interface GMarkdownLinkEventOptions {
        element: HTMLAnchorElement;
        uri: {
            raw: string;
            scheme: string | null;
            authority: string | null;
            path: string;
            query: string | null;
            fragment: string | null;
            queryParams: ObjectLiteral<any>;
        };
    }
}
declare namespace Gordic.Components.Search {
    interface IGSearchFieldMenuParams extends MenuParams {
        searchItem: Widget.IGSearchFieldItem;
    }
    interface IGSearchResultRenderer {
        resultsLimit(): number;
        init(inputField: JQuery): void;
        print(rows: MetaRow<Widget.IGSearchFieldItem>[], allRows: MetaRow<Widget.IGSearchFieldItem>[], availableDomains: ObjectLiteral<Components.Search.IGSearchResolverDomain>, currentDomain?: Components.Search.IGSearchResolverDomain | null, isLoading?: boolean): JQueryPromise<any>;
        destroy(): void;
        showResults(): void;
        close(): void;
    }
    class GSearchResultActionMenuRenderer implements IGSearchResultRenderer {
        private static idCounter;
        protected totalResultsLimit: number;
        protected onlyImporantRows: boolean;
        protected stopReset: boolean;
        protected forceStopReset: boolean;
        protected element: JQuery;
        private _hasOwnInlineDialog;
        protected searchField: JQuery | null;
        private targetElement;
        private _activeItemId;
        private _activeItemIdHistory;
        protected _actionMenuOptionsDefault: Omit<Gordic.Widget.IGMenuOptions, 'params'> | undefined;
        protected menuIsMoving: boolean;
        protected ongoingOperation: JQuery.Deferred<any> | null;
        protected _isClosing: boolean;
        constructor(targetElement?: JQuery);
        resultsLimit(): number;
        init(searchField: JQuery): void;
        close(): void;
        destroy(): void;
        showResults(): void;
        private _initPrintArea;
        private _initPrintAreaInlineDialog;
        private _initPrintAreaElementPrint;
        private _openPrintArea;
        private _closePrintArea;
        private _resizePrintArea;
        protected getMenuParams(importantRows: MetaRow<Widget.IGSearchFieldItem>[], allRows: MetaRow<Widget.IGSearchFieldItem>[], availableDomains: ObjectLiteral<Components.Search.IGSearchResolverDomain>, currentDomain?: Components.Search.IGSearchResolverDomain): MenuParams[];
        /**
         * print search results into printArea
         */
        print(importantRows: MetaRow<Widget.IGSearchFieldItem>[], allRows: MetaRow<Widget.IGSearchFieldItem>[], availableDomains: ObjectLiteral<Components.Search.IGSearchResolverDomain>, currentDomain?: Components.Search.IGSearchResolverDomain, isLoading?: boolean): JQuery.Promise<any, any, any>;
        private _findActiveItem;
        protected _transformItemToMenuParam(row: MetaRow<Widget.IGSearchFieldItem>, index: number): IGSearchFieldMenuParams;
    }
    /**
     * Renderer, který v levé části menu (úroveň 0) zobrazíodkaz na otevření contentu pro celoaplikační hledání.
     *
     * @author  TFeik
     * @date    29.05.2020
     * @since   484.1.0.431
     */
    class GSearchResultActionMenuRendererWithShowMore extends GSearchResultActionMenuRenderer implements IGSearchResultRenderer {
        init(searchField: JQuery): void;
    }
    /**
     * Renderer, který je použit v contentu pro celoaplikační hledání.
     *
     * @author  TFeik
     * @date    29.05.2020
     * @since   484.1.0.431
     */
    class GSearchResultActionMenuContentRenderer extends GSearchResultActionMenuRenderer implements IGSearchResultRenderer {
        init(searchField: any): void;
    }
    class GSearchMenuBuilder extends Gordic.Utils.Menu.GActionMenuItemBuilder {
        createItem(menuParam: any, level: any): JQuery<HTMLElement>;
        createCenterPanel(menuParam: IGSearchFieldMenuParams, level: number): JQuery<HTMLElement>;
        createHeader(options: Utils.Menu.IGCreateHeaderOptions): JQuery<HTMLElement> | null;
        createIconPanel(icon: any): JQuery<HTMLElement>;
    }
    /**
     * Task for one resolution of input -> found items
     *
     * @author Vlastimil Máca
     * @since
     */
    class GSearchResolveTask {
        resultModifier?: (item: IGSearchResolverResult) => IGSearchResolverResult;
        constructor(input: IGSearchInput);
        private solvedPendings;
        private rejectedPendings;
        private enableFinish;
        /**
         * Master deferred which is returned from resolve function.
         * @type {JQueryDeferred<IGSearchResolverResult>}
         */
        private task;
        /**
         * cancelationToken - to recognize if request is still actual or if resolution can be stopped.
         * @type {GCancelationToken}
         */
        private cancelationToken;
        /**
         * result object which stores input and results from subResolvers - indexed by resolver id
         * @type {{ input: IGSearchInput, results: ObjectLiteral<IGSearchResolverResult|null> }}
         */
        private result;
        /**
         * keys to result object - each key is id of subResult
         * @type {string[]}
         */
        private resultsIndex;
        /**
         * Promises from resolve functions of subResolvers - Master passes notify messages from these and waits for all promises to be resolved or rejected before resolving itself.
         * @type {(JQueryPromise<IGSearchResolverResult> | null)[]}
         * @default []
         */
        private pendingResults;
        /**
         * Registers listener for cancToken's abort signal
         */
        private initCancelationToken;
        /**
         * Tells if current task is still needed to complete or if it is not relevant anymore
         */
        wasCancelled(): boolean;
        /**
         * Reject current task
         */
        close(): void;
        /**
         * getPromise for current task
         */
        getPromise(): JQuery.Promise<IGSearchResolverResult, any, any>;
        /**
         * Register promise from subResolver or current resolver.
         *
         * @param {any} resolver - resolver which is solving result
         * @param {any} resultId Id of result - usually id of resolver
         * @param {JQueryPromise<IGSearchResolverResult>} partialResult promise of result
         */
        registerPartialResult(resolver: any, partialResult: JQueryPromise<IGSearchResolverResult>): void;
        /**
         * register resultIds to resultKeys for faster results traversing
         *
         * @param {string} resultId
         */
        private registerId;
        /**
         * Call this, when no other partial result is expected to attend - just wait for finish of all results
         */
        finishRegistration(): void;
        private checkIfFinished;
        /**
         * Notify master deffered about new results
         *
         * @param {string} resultId
         * @param {IGSearchResolverResult} data
         */
        updateResult(resultId: string, data: IGSearchResolverResult): void;
        /**
         * Notify master about invalid results
         *
         * @param {string} resultId
         */
        resetResult(resultId: string): void;
    }
    /**
     * Options for SearchResolver
     *
     * @author Vlastimil Máca
     * @since
     */
    interface IGSearchResolverOptions {
        id?: string;
        domain?: PartialProperties<IGSearchResolverDomain, "id">;
        getResult?: (input: IGSearchInput, task: GSearchResolveTask) => JQueryPromise<IGSearchResolverItem[]> | IGSearchResolverItem[];
        modifyResult?: ((item: IGSearchResolverResult) => IGSearchResolverResult) | null;
    }
    /**
     * Resolver for domains - should return list of domains from given resolvers and detect if there is selected domain in input text
     *
     * @author Vlastimil Máca
     * @since 480.1.0.483
     */
    interface IGDomainResolver {
        detectImmediateDomain: (doms: Components.Search.IGRankedSearchResolverDomain[], input: Components.Search.IGSearchInput) => {
            rankedDomain: IGRankedSearchResolverDomain;
            text: string;
            remainingText: string;
        } | null;
        getDomains: (resolvers: IGSearchResolver[], input?: IGSearchInput) => IGRankedSearchResolverDomain[];
    }
    class GDomainResolver implements IGDomainResolver {
        private domainSelector;
        detectImmediateDomain(doms: Components.Search.IGRankedSearchResolverDomain[], input: Components.Search.IGSearchInput): {
            rankedDomain: IGRankedSearchResolverDomain;
            text: string;
            remainingText: string;
        } | null;
        /**
         * Get domains for given input (only relevant and with confidence).
         * If input is not specified, return all possible domains from all possible subResolvers.
         *
         * @param {IGSearchInput} [input]
         */
        getDomains(resolvers: IGSearchResolver[], input?: IGSearchInput): IGRankedSearchResolverDomain[];
        protected _mergeDomains(resolvers: IGSearchResolver[]): IGRankedSearchResolverDomain[];
        /**
         * For each domain, calculate confidence based on input text.
         *
         * @param {IGRankedSearchResolverDomain[]} domains
         * @param {IGSearchInput} [input]
         * @param {any}
         * @returns {IGRankedSearchResolverDomain[]}
         */
        protected rankDomains(domains: IGRankedSearchResolverDomain[], input?: IGSearchInput): IGRankedSearchResolverDomain[];
    }
    abstract class GBaseSearchResolver<TOptions extends IGSearchResolverOptions = IGSearchResolverOptions> implements IGSearchResolver {
        id: string;
        domain?: IGSearchResolverDomain;
        opts: TOptions;
        currentTask: GSearchResolveTask | null;
        isActiveResolver: boolean;
        on(eventName: string, fce: Function): this;
        off(eventName: string): this;
        reset(this: this & GEvents, opts: IGSetResolverOptions): void;
        active(this: this & GEvents, opts: IGSetResolverOptions): void;
        constructor(opts?: TOptions);
        /**
         * resolve
         *
         * @param {IGSearchInput} input
         */
        resolve(input: IGSearchInput): JQuery.Promise<IGSearchResolverResult, any, any>;
        getDomain(): IGSearchResolverDomain | null;
        protected abstract getDefaultId(): string;
        protected abstract getDefaultDomain(): IGSearchResolverDomain | null;
        protected abstract getResult(input: IGSearchInput, currTask: GSearchResolveTask): JQueryPromise<IGSearchResolverItem[]> | IGSearchResolverItem[];
    }
    class GSearchResolver extends GBaseSearchResolver {
        protected getDefaultId(): string;
        protected getDefaultDomain(): IGSearchResolverDomain | null;
        protected getResult(input: IGSearchInput, currTask: GSearchResolveTask): JQueryPromise<IGSearchResolverItem[]> | IGSearchResolverItem[];
    }
    /**
     * Base resolver which handles set of resolvers and DOM resolvers registered with gsearchable
     *
     * @author Vlastimil Máca
     * @since
     */
    class GMainSearchResolver implements IGSearchResolver {
        id: string;
        /**
         * permanent resolvers, registered in constructor
         * @type {IGSearchResolver[]}
         * @default []
         */
        permanentResolvers: IGSearchResolver[];
        domainResolver: IGDomainResolver | null;
        searchField?: JQuery;
        private useSearchableResolvers;
        private currentTask;
        private actDomainSelected;
        on(eventName: string, fce: Function): this;
        off(eventName: string): this;
        active(this: this & GEvents, opts: IGSetResolverOptions): void;
        reset(this: this & GEvents, opts: IGResetResolverOptions): void;
        constructor(opts?: {
            resolvers: (IGSearchResolverOptions | IGSearchResolver)[];
            searchField?: JQuery;
            domainResolver?: IGDomainResolver;
            useSearchableResolvers?: boolean;
        });
        setSearchField(searchField?: JQuery): JQuery<HTMLElement> | undefined;
        /**
         * addResolver to subResolvers
         *
         * @param {string} id
         * @param {IGSearchResolver} resolver
         */
        addPermanentResolver(resolver: IGSearchResolver): void;
        /**
         * removeResolver
         *
         * @param {string} id
         */
        removePermanentResolver(id: string): void;
        getResolvers(input: IGSearchInput): IGSearchResolver[];
        /**
         * Finds results for given input
         *
         * @param {IGSearchInput} input
         */
        resolve(input: IGSearchInput): JQuery.Promise<IGSearchResolverResult, any, any>;
        getDomain(): null;
    }
    /**
     * cancelation token
     *
     * @author Vlastimil Máca
     * @since
     */
    interface IGCancelationToken {
        aborted: boolean;
    }
    /**
     * Cancelation token
     *
     * @author Vlastimil Máca
     * @since 13.9.2018
     */
    class GCancelationToken extends GObservableObject<IGCancelationToken> implements IGCancelationToken {
        constructor();
        aborted: boolean;
    }
    /**
     * Interface for search resolver.
     *
     * @author Vlastimil Máca
     * @since
     */
    interface IGSearchResolver extends IGEvents {
        /** ID of resolver, is used to index resolvers in searchField */
        id: string;
        /** Domain - Areas of search */
        resolve(input: IGSearchInput): JQuery.Promise<IGSearchResolverResult>;
        active(opts: IGSetResolverOptions): void;
        reset(opts: IGResetResolverOptions): void;
        getDomain(): IGSearchResolverDomain | null;
    }
    /**
     * Interface for object with info about domain, it's resolver, confidence for given input and possibly what it's parent domain is.
     *
     * @author Vlastimil Máca
     * @since
     */
    interface IGRankedSearchResolverDomain {
        resolver: IGSearchResolver;
        domain: IGSearchResolverDomain;
        confidence: Utils.IGSimilarityConfidence;
        parentDomain?: string;
    }
    /**
     * Input object for SearchResolver. Should be provided by searchField
     *
     * @author Vlastimil Máca
     * @since
     */
    interface IGSearchInput {
        text: string;
        cancelationToken: GCancelationToken;
        ev?: JQuery.TriggeredEvent;
        searchField?: JQuery;
        rendererLimit?: number;
    }
    /**
     * Definition of search domain.
     *
     * @author Vlastimil Máca
     * @since
     */
    interface IGSearchResolverDomain extends IGSearchDisplayItem {
        /**
         * id of domain, used as key in found items.
         * @type {string}
         */
        id: string;
        /**
         * Terms, which can be used to select this domain in search field. Separated with ','
         * @type {string[]}
         */
        terms?: string;
    }
    /**
     * Result of SearchResolver's resolve function
     *
     * @author Vlastimil Máca
     * @since
     */
    interface IGSearchResolverResult {
        /**
         * found items
         * @type {IGSearchResolverItem[]}
         */
        items: IGSearchResolverItem[];
        /** Domain definitions for domains which are defined in items. */
        domains: IGSearchResolverDomain[];
        /** ID of resolver, to which this result belongs */
        resolverId?: string;
    }
    /**
     * Class for creating search resolver result.
     *
     * @author Vlastimil Máca
     * @since
     */
    class GSearchResolverResult implements IGSearchResolverResult {
        items: IGSearchResolverItem[];
        domains: IGSearchResolverDomain[];
        resolverId?: string;
        constructor(resolverId?: string, items?: IGSearchResolverItem[], domains?: IGSearchResolverDomain[]);
    }
    /**
     * Interface for searchResolver result item. These informations will be used to display item by default renderer
     *
     * @author Vlastimil Máca
     * @since
     */
    interface IGSearchDisplayItem {
        /**
         * name of item, this is used as key.
         * @type {string}
         */
        name: string;
        /**
         * icon to display with this item
         * @type {string | null}
         */
        icon?: string | string[] | null;
        /**
            * description of this item
            * @type {string | null}
            */
        description?: string | null;
        /**
        * Detailed description of this item
        * @type {string | null}
        */
        detailDescription?: string | null;
        /**
         * custom renderer which will be given object to render itself into.
         */
        render?: (target: JQuery) => void;
        /** customClass for item in search menu */
        customClass?: string;
        children?: MenuParamsAction[];
    }
    /**
     * Item from result of SearchResolver's resolve function
     *
     * @author Vlastimil Máca
     * @since
     */
    interface IGSearchResolverItem extends IGSearchDisplayItem {
        /**
         * Confidence - number between 0 and 1 - 0 is no match, 1 is exact match
         * @type {number}
         */
        confidence: number;
        /**
         * custom data, which will be passed with item into SearchResolver's selected function
         * @type {any}
         */
        data?: any;
        defaultAction?: GAction;
        /**
         * Id of domain, to which this item belongs to - is used as key
         * @type {string}
         */
        domainId?: string;
        /** item identifier - is used as key */
        id?: string;
    }
    interface IGResetResolverOptions {
        resolver: Components.Search.IGSearchResolver | null;
        oldResolver: Components.Search.IGSearchResolver | null;
    }
    interface IGSetResolverOptions {
        resolver: Components.Search.IGSearchResolver | null;
        /** Should remember user's input? Default is true */
        rememberPreviousInput?: boolean;
        /** string, which should be remembered and later recalled from inputHistory */
        oldInput?: string;
        /** string, which should be set to input - if set, input history is not gonna work */
        newTextInput?: string;
        /** should trigger focus event on searchfield and invoke immediate search? Default is true  */
        triggerFocus?: boolean;
        /** placeholder to show in field*/
        placeholder?: string;
        /** customClass to apply to field*/
        customClass?: string;
        /** allowedChars i.e. a-zA-Z0-9 */
        allowedChars?: string;
        /** charmode */
        charMode?: "upper" | "lower" | null;
    }
    /**
     * Resolver for searching tasks
     *
     * @author Vlastimil Máca
     * @since
     */
    class GTaskSearchResolver extends GBaseSearchResolver {
        protected fs: Utils.GObjectFuzzySearch;
        protected defaultAction: GAction;
        constructor(opts?: any);
        protected getDefaultId(): string;
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
        };
        protected getResult(input: any, currTask: any): {
            domainId: string;
            id: string | undefined;
            defaultAction: GAction;
            confidence: number;
            name: string;
            icon: string | string[] | undefined;
            description: string;
            customClass: string;
            data: MenuParams & {
                parents?: MenuParams[];
            };
        }[];
        protected getItemsConfidence(text: any, act: any): number;
        protected prepareResultItem(text: string, menuParam: MenuParams & {
            parents?: MenuParams[];
        }): {
            domainId: string;
            id: string | undefined;
            defaultAction: GAction;
            confidence: number;
            name: string;
            icon: string | string[] | undefined;
            description: string;
            customClass: string;
            data: MenuParams & {
                parents?: MenuParams[];
            };
        };
        protected createDefaultAction(): GAction;
        protected prepareFuzzySearch(): Utils.GObjectFuzzySearch;
        protected getTaskList(): MenuParams[];
        protected linearizeParams(menuParams: MenuParams[]): MenuParams[];
        /**
         * Prochazi rekurzivne strom parametru menu
         *
         * @param {MenuParams} param
         * @param {MenuParams[]} arr
         * @param filter Funkce k pripadnemu profiltrovani
         */
        protected _traverseParam(parent: null | (MenuParams & {
            parents?: MenuParams[];
        }), param: MenuParams & {
            parents?: MenuParams[];
        }, arr: MenuParams[], filter?: (p: MenuParams) => boolean): void;
    }
}
declare namespace Gordic.Widget {
    /**
     * Options for search field
     *
     * @author Vlastimil Máca
     * @since
     */
    interface IGSearchFieldOptions extends JQueryUI.WidgetOptions {
        /**
         * Resolver which will be used by this search field to find results.
         * @type {Components.Search.IGSearchResolver}
         */
        resolver: Components.Search.IGSearchResolver;
        limit: number;
        expandingWidth?: boolean;
        resultRenderer: Components.Search.IGSearchResultRenderer;
        placeholder?: string;
    }
    interface IGSearchFieldItem extends Components.Search.IGSearchResolverItem {
        resolverId: string;
    }
    class GSearchField extends JQueryWidget<IGSearchFieldOptions> {
        static widgetName: string;
        static readonly activeClass = "g-search-field--active";
        private _isOff;
        private _isReset;
        private _activeItemId;
        private lastStartedInput;
        private logger;
        refresh(): void;
        _destroy(): void;
        protected _getCreateOptions(): {
            limit: number;
            expandingWidth: boolean;
            resolver: Components.Search.GMainSearchResolver;
            resultRenderer: Components.Search.GSearchResultActionMenuRendererWithShowMore;
        };
        protected _setOption(key: string, value: any): void;
        static iconBuilder: Utils.IconBuilder;
        static defaultItemRender(this: Components.Search.IGSearchDisplayItem, target: JQuery): void;
        private updateInputFunc;
        protected _create(): void;
        private _reset;
        /**
         * Area for printing info about selected domain
         * @type {JQuery}
         */
        private _selectedDomainArea;
        /**
         * input field
         * @type {JQuery}
         */
        private _inputField;
        private _spinner;
        private _inputHistory;
        private lastPrintedKeys;
        /**
         * Root resolver
         * @type {Gordic.Components.Search.IGSearchResolver}
         */
        private _defaultResolver;
        /**
         * Resolver of explicitly selected domain
         * @type {Gordic.Components.Search.IGSearchResolver}
         */
        private _selectedResolver;
        /**
         * current input object passed to resolver
         * @type {Components.Search.IGSearchInput}
         */
        private currentInput;
        /**
         * Current items displayed as result
         * @type {IGSearchFieldItem}
         */
        private currentItems;
        private currentDomains;
        private currentCustomClass;
        /**
         * Method for resolving of input text
         *
         * @param {string} inputText
         */
        private _updateInput;
        exit(): void;
        reset(): void;
        abort(): void;
        isFinished(): boolean;
        isReset(): boolean;
        /**
         * Vyvolání hledání.
         *
         * @param {string} [searchValue] Hledaný text - pokud není undefined, pak se nastaví do políčka. V opačném případě použije hodnotu v políčku.
         */
        invokeSearch(searchValue?: string): void;
        /**
         * Vrátí textovou hodnotu v hledacím políčku.
         *
         * @returns {string}
         */
        getSearchInput(): string;
        setResolver(opts: Components.Search.IGSetResolverOptions): void;
        /**
         * Print info about selected domain
         *
         * @param {Components.Search.IGRankedSearchResolverDomain} [domain]
         */
        private _printDomain;
        /**
         * Unset current domain and set previous one, keep previous input history
         */
        private _resetResolver;
        /**
         * print search results into printArea
         */
        private _print;
    }
}
type GSearchableReturn = (input: Gordic.Components.Search.IGSearchInput) => (Gordic.Components.Search.IGSearchResolver)[];
interface JQuery {
    gsearchfield(options?: Gordic.Widget.IGSearchFieldOptions): JQuery;
    gsearchfield(method: "refresh"): JQuery;
    gsearchfield(method: "setResolver", opts: Gordic.Components.Search.IGSetResolverOptions): JQuery;
    gsearchfield(method: 'isFinished'): boolean;
    /**
     * empty input and results
     * @param method
     */
    gsearchfield(method: "reset"): JQuery;
    /**
     * keep input unchanged, keep resolvers working, but exit field (hide results)
     * @param method
     */
    gsearchfield(method: "exit"): JQuery;
    /**
     * abort ongoing search, but leave input filled
     * @param method
     */
    gsearchfield(method: "abort"): JQuery;
    /**
     * Vyvolá hledání.
     *
     * @param {'invokeSearch'} method
     * @param {string} [searchValue] Hledaný text - pokud není undefined, pak se nastaví do políčka. V opačném případě použije hodnotu v políčku.
     * @returns {JQuery}
     */
    gsearchfield(method: 'invokeSearch', searchValue?: string): JQuery;
    gsearchfield(method: 'isReset'): boolean;
    /**
     * Vrátí textovou hodnotu v hledacím políčku.
     *
     * @param {'getSearchInput'} method
     * @returns {string | undefined}
     */
    gsearchfield(method: 'getSearchInput'): string;
    gsearchable(method: "add", resolver: Gordic.Components.Search.IGSearchResolver): any;
    gsearchable(method: "add", id: string, delegate: GSearchableReturn): any;
    gsearchable(method: "getResolvers", input: Gordic.Components.Search.IGSearchInput): Gordic.Components.Search.IGSearchResolver[] | undefined;
    gsearchable(method: "delete", id: string): any;
}
declare namespace Gordic.Gui.WebControls {
    /**
     * Vstupní parametry dialogu GSearchfieldDlg.
     *
     * @author  TFeik
     * @date    13.05.2020
     * @since   484.1.0.66
     */
    interface GSearchfieldDlgInputParams {
        /**
         * (Default: false) Přízak, zda se má po spuštění některé z akcí výsledku automaticky zavřít content (obdobně jako to dělá vyhledávací políčko).
         * @type {boolean}
         */
        zavritContentPoSpusteniAkce?: boolean;
        /**
         * Text, který bude nastaven po otevření dialogu do hledacího políčka.
         * @type {string}
         */
        searchInput?: string;
    }
    /**
     * Návratová hodnota dialogu GSearchfieldDlg.
     *
     * @author  TFeik
     * @date    13.05.2020
     * @since   484.1.0.66
     */
    interface GSearchfieldDlgReturnValue {
    }
    /**
     * Content pro celoaplikační hledání.
     *
     * @author  TFeik
     * @date    13.05.2020
     * @since   484.1.0.66
     */
    class GSearchfieldDlg extends GContentBase implements IGClientContent {
        /**
         * Vytvoří formulář, přidá jej do contentu a nastaví validátory.
         *
         * @author  TFeik
         * @date    13.05.2020
         * @since   484.1.0.66
         */
        prepareContent(input?: GSearchfieldDlgInputParams): void;
        /**
         * Vytvoří hledací políčko.
         *
         * @author  TFeik
         * @date    14.05.2020
         *
         * @param {JQuery<HTMLElement>} appendTo Element, do kterého bude políčko vloženo.
         * @returns {JQuery<HTMLElement>} Element políčka.
         */
        private static createSearchField;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    13.05.2020
         * @since   484.1.0.66
         */
        private createMenu;
        /**
         * Funkce volaná při zavírání dialogu.
         *
         * @author  TFeik
         * @date    13.05.2020
         * @since   484.1.0.66
         *
         * @returns {JQuery.Promise<GSearchfieldDlgReturnValue>}
         */
        private closing;
        /**
         * isValid
         *
         * @author  TFeik
         * @date    03.08.2022
         *
         * @param {GSearchfieldDlgInputParams | undefined | null} input
         * @returns {boolean | Dialogs.OpenDialogRejectType}
         */
        static isValid(input: GSearchfieldDlgInputParams | undefined | null): boolean | Dialogs.OpenDialogRejectType;
    }
}
declare namespace Gordic.Gui.Dialogs {
    /**
     * Otevře dialog celoaplikačního hledání.
     *
     * @author  TFeik
     * @date    13.05.2020
     *
     * @param {{ input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GCeloaplikacniHledaniDlgInputParams> }} opt
     * @returns {'Gordic.Wfl.WebClient.GCeloaplikacniHledaniDlg'}
     */
    function GSearchfieldDlg(input: OpenDialogParams<WebControls.GSearchfieldDlgInputParams | undefined>): JQuery.Promise<WebControls.GSearchfieldDlgReturnValue | undefined>;
}
declare namespace Gordic.Prefabs.Actions {
    /**
     * Uloží text do clipboardu (schránky - ctrl+c).
     *
     * @author  TFeik
     * @date    06.06.2019
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     *
     * @param {BasePreActionsInput<string} input
     * @returns {GActionParams}
     */
    function UlozitDoClipboardu(input: BasePreActionsInput<string, undefined> & {
        iconTempalte?: IconTemplate;
    }): GActionParams;
    /**
     * Načte text z clipboardu (schránky).
     *
     * @author  TFeik
     * @date    12.05.2020
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     *
     * @param {BasePreActionsInput<Gordic.Utils.readFromClipboardInput} input
     * @returns {GActionParams}
     */
    function NacistZClipboardu(input: BasePreActionsInput<Gordic.Utils.readFromClipboardInput, Gordic.Utils.readFromClipboardOutput>): GActionParams;
    /**
     * Otevře emailový klient.
     *
     * @author  TFeik
     * @date    08.04.2020
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     *
     * @param {BasePreActionsInput<Gordic.Utils.MailToLinkOptions} input
     * @returns {GActionParams}
     */
    function OtevriEmailovyKlient(input: BasePreActionsInput<Gordic.Utils.MailToLinkOptions, undefined>): GActionParams;
    /**
     * Otevře dialog celoaplikačního hledání.
     *
     * @author  TFeik
     * @date    13.05.2020
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebControls.GSearchfieldDlgInputParams | undefined>} input
     * @returns {GActionParams}
     */
    function OtevritCeloaplikacniHledani(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebControls.GSearchfieldDlgInputParams | undefined>, Gui.WebControls.GSearchfieldDlgReturnValue | undefined>): GActionParams;
}
declare namespace Gordic.Async {
    /** Nazvy udalosti, na ktere lze registrovat event hanlder */
    type GTaskEvents = "change" | "init" | "running" | "done" | "cancelled" | "fail" | "disposed" | "cancelRequested" | "cleanRequested" | "always" | "inactive";
    /** Interni ovladani tasku */
    interface IGTaskInternal extends IGTask {
        /** Serveru bylo signalizovano 'cancel' a on se podle toho nejak zaridil */
        _cancelSignalized(): void;
        /** Jsou stavy ukladany do uloziste? (DB?) */
        readonly isPersistent: boolean;
        /** Lze na uloze volat cancel? */
        readonly isCancellable: boolean;
    }
    class GTask<TProgress extends IGTaskProgress, TResult> implements IGTypedTask<TProgress, TResult>, IGTaskInternal {
        /** ID ulohy */
        private _id;
        /** ID ulohy */
        get id(): string;
        set id(id: string);
        /** Nazev tridy, ktera dedi od GAsyncTaskBase (C#) */
        readonly className: string;
        /** Uzivatelsky popis async. ulohy */
        readonly description: string;
        /** Kategorie (nastavuje server) */
        readonly category: string;
        /** Jsou stavy ukladany do uloziste? (DB?) */
        readonly isPersistent: boolean;
        /** Lze na uloze volat cancel? */
        readonly isCancellable: boolean;
        /** Muze byt opetovne nastartovana? */
        readonly canBeRepeated?: boolean;
        /** Vstupni DTO */
        customDto: any;
        /** Aktualni verze tasku (pro potreby synchronizace server->client) */
        version: number;
        /** Aktualni stav ulohy */
        state: GTaskState;
        /** Posledni znamy prubeh zpracovani */
        progress?: TProgress;
        /** Vysledek zpracovani */
        result?: TResult;
        /** Vyjimka vzniknuta pri zpracovani */
        exceptionInfo?: GJQExceptionResult;
        /** Cas posledni zmeny (stavu, progres, ...) */
        lastChange?: Date;
        private _options;
        private _notification;
        private _handlers;
        private _def;
        private static _logger;
        /**
         * Vytvori novou instanci. Pozor! Programator by mel pouzivat Gordic.Async.GTaskManager.start()
         * @param {string} className Nazev serverove tridy vc. namespace implementujici IGAsyncTaskBase
         * @param {any} customDto Vstupni DTO
         * @param {IGTaskOptions} options? Options
         */
        constructor(className: string, customDto: any, options?: IGTaskOptions);
        private _dispatchEvent;
        private _callHandlers;
        private _init;
        private _autoClean;
        private _hasEventHandler;
        /**
         * Zaregistrovani obsluzne udalosti
         * @param evName nazev udalosti, muze obsahovat namespace. Pripadne lze pouzit i pouze handler, v tom pripade se bude volat na udalost 'change'
         * @param evHandler obsluha udalosti
         */
        on(evName: GTaskEvents | string | ((this: IGTask, ctx: GTaskContext<TProgress, TResult>, args: any) => void), evHandler?: (ctx: GTaskContext<TProgress, TResult>, args: any) => void): this;
        /**
         * Odregistrovani udalosti. Volano bez argumentu = odregistrovat vsechno. Volano s 1. argumentem zacinajicim teckou, odregistruje cely namespace.
         * @param evName - nazev udalosti nebo namespace udalosti (napr. 'change', '.mujNamespace', 'change.mujNamespace')
         * @param handler - instance event handleru
         */
        off(evName?: GTaskEvents | string, handler?: (ctx: GTaskContext<TProgress, TResult>, args: any) => void): void;
        /**
         * Signalizuje serveru cancel, ten na nej muze nebo nemusi reagovat + vyhodi udalost 'cancelRequested'.
         * @param {boolean} clean Je-li true, po cancel se zavola automaticky 'clean' (odstraneni zdroju na serveru).
         */
        cancel(clean?: boolean): this;
        /**
         * Uvolni serverove zdroje (je-li to mozne).
         */
        clean(): this;
        /**
         * Vrati promise, na kterem je mozne reagovat na done(), fail() a progress()
         */
        getPromise(): GTaskPromise<IGTaskContext<TResult>, IGTaskContextFail, IGTaskContextProgress<TProgress>>;
        /**
         * Vrati aktualni stav jako string
         */
        getStateString(): string;
        /** Vrati serverovy request (interni) */
        getRequest(): GAsyncRequestDto;
        /** Vrati vlastni filtr uloh (interni) */
        getVersionFilter(): IGTaskVersionFilter;
        /** Nastavi request ze serveru (interni) */
        setResponse(r: GAsyncResponseDto): this;
        /**
         * Zapne/vypne pozdejsi uklid serverovych prostredku
         * @param autoClean Zapnout=provede autoclean
         */
        setAutoClean(autoClean: boolean): this;
        /** Nastavi objekt k rizeni notifikace */
        setNotification(notification: GObservableObject<IGNotificationOptions>): this;
        /** Vrati obekt k rizeni notifikace */
        getNotification(): GObservableObject<IGNotificationOptions>;
        /** Obsahuje objekt k rizeni notifikace? */
        hasNotification(): boolean;
        get notification(): GObservableObject<IGNotificationOptions>;
        set notification(notification: GObservableObject<IGNotificationOptions>);
        clearNotification(): void;
        /** Interni vec async. uloh (nepouzivat!) */
        _cancelSignalized(): void;
        private get _logger();
    }
    /** Startovaci options pro GTaskManager */
    interface IGTaskManagerOptions {
        /** Interval synchronizace server->client */
        delay?: number;
        /** Metoda k rizeni notifikaci */
        notify?: (command: GNotificationListCommand, options: IGNotificationOptions, ...args: any[]) => GObservableObject<IGNotificationOptions>;
        /** Je povoleno pouzivat SignalR? (default = true) */
        signalREnabled?: boolean;
        /**
          * Transportni metoda(y) pro SignalR (webSockets, serverSentEvents, foreverFrame, longPolling). Mozno pouzit vice oddelene carkou. Na poradi zalezi!
         */
        signalRTransport?: string;
        /**
         * inactivityCheckPeriod
         * @type {number}
         */
        inactivityCheckPeriod?: number;
    }
    /**
     * Staticka trida pro praci s asynchronnimi ulohami. Priklady pouziti:
     * @example <caption>Zakladni priklad</caption>
     * ```typescript
     *
     * //Spusteni ulohy:
     * Gordic.Async.GTaskManager.start<MyProgress, string>("Gordic.Uka.WebClient.G01HelloWorldAsyncTask", "Bohous");
     *
     * //Registrace handleru:
     * Gordic.Async.GTaskManager.on("done", "Gordic.Uka.WebClient.G01HelloWorldAsyncTask", function (ctx, args) {
     *           debugger;
     *           console.log("My aync task done", ctx, args);
     *       });
     *
     * //Registrace handleru s generiky (rikam, co je progress a co je vysledek):
     * Gordic.Async.GTaskManager.on<MyProgress, string>("done", "Gordic.Uka.WebClient.G01HelloWorldAsyncTask", function (ctx, args) {
     *           debugger;
     *           console.log("My aync task done", ctx, args);
     *       });
     *
     * ```
     *
     */
    abstract class GTaskManager {
        private static _tasks;
        private static _stopRequested;
        private static _isRunning;
        private static _initDef;
        private static _syncAwait?;
        private static _timer?;
        private static _notifyChangeThrottlingTimer?;
        private static _reconnectSignalRHubInterval;
        private static _reconnectSignalRPromise;
        private static _isSignalREnabled?;
        private static _isSignalRSupported?;
        private static _asyncHub?;
        private static _asyncHubBeforeFreezeState?;
        private static _notifyChange;
        private static _handlers;
        private static _defaultHandlersInitialized;
        private static _ixsFun;
        private static _relationId?;
        static get relationId(): string | undefined;
        private static _options;
        private static _delayedStartOptionsBuff;
        private static _srv;
        private static get srv();
        private static set srv(value);
        private static _periodicCallCounter;
        private static _periodicAjaxOptions;
        private static _logger;
        private static _lastInactivityCheck;
        /**
         * Inicializace asynchronnich uloh v GINIS (toto by se melo volat pouze jednou po prihlaseni uzivatele do GINIS)
         * @param options
         */
        static init(options?: IGTaskManagerOptions): JQueryPromise<void>;
        /**
         * Docasne zastaveni dotazovani se na stav async. uloh na serveru (pozor! nezrusi prave probihajici ulohy!)
         */
        static uninit(): JQueryPromise<void>;
        /** Jsou async. ulohy inicializovane? */
        static isInitialized(): boolean;
        /** Je SignalR povoleny konfiguraci? */
        static isSignalREnabled(): boolean | undefined;
        /** Je SignalR dostupny, podporuje jej server? */
        static isSignalRSupported(): boolean | undefined;
        /** Je navazano pripojeni pres SignalR? */
        static isSignalRConnected(): boolean;
        private static onVisibilityChange;
        /**
         * Nastartovani vlastni asynchronni ulohy
         * @param className Nazev tridy (C#) implementujici GAsyncTask, GAsyncTaskServer nebo GAsyncTaskAppServer vc namespace (napr. "Gordic.Uka.WebClient.G01HelloWorldAsyncTask")
         * @param customDto Vstup asynchronni ulohy
         * @param taskOptions Vlastni options
         * @returns Vlastni instance GTask k rizeni behu async. ulohy na serveru
         */
        static start<TProgress extends IGTaskProgress, TResult>(className: string, customDto: any, taskOptions?: IGTaskOptions): GTask<TProgress, TResult>;
        /**
         * Nastartovani vlastni asynchronni ulohy s odlozenym startem - ten probehne az v momente, kdy je kompletni inicializace async. jadra.
         * @param className Nazev tridy (C#) implementujici GAsyncTask, GAsyncTaskServer nebo GAsyncTaskAppServer vc namespace (napr. "Gordic.Uka.WebClient.G01HelloWorldAsyncTask")
         * @param customDto Vstup asynchronni ulohy
         * @param taskOptions Vlastni options
         * @returns Vlastni instance GTask k rizeni behu async. ulohy na serveru
         */
        static delayedStart<TProgress extends IGTaskProgress, TResult>(className: string, customDto: any, taskOptions?: IGTaskOptions): JQueryPromise<GTask<TProgress, TResult>>;
        /** Opetovne nastartovani ulohy */
        static startAgain(t: IGTaskInternal): JQueryPromise<IGTask>;
        /**
         * Registrace obsluhy udalosti pro vybrane ulohy dle filtru.
         * Varianty:
         * .on('change', 'Gordic.Foo.Server.GMyTask', function(){...})         //- registrace s filtrem s nazvem typu GAsyncTask
         * .on('change.myNamespace', function(task) { return task.id === mojeId; }, function() {...}) //- registrace s namespace a vlastnim filtrem@template TProgress
         * .on('change', null, function() {...})   //- registrace ev.Handleru na vsechny tasky
         *
         * @template TProgress
         * @template TResult
         * @param {string} evName Nazev udalosti, volitelne muze obsahovat i namespace
         * @param {string | GTaskManagerFilter} filter Filtr, kterym se rika, kterym taskum ma byt ev. handler registrovan
         * @param {any} evHandler Obsluha udalosti
         * @returns GTaskManager pro moznost retezeni metod
         */
        on<TProgress extends IGTaskProgress, TResult>(evName: string, filter: string | GTaskManagerFilter, evHandler: ((this: IGTask, ctx: GTaskContext<TProgress, TResult>, args: any) => void)): GTaskManager;
        /**
         * Registrace obsluhy udalosti pro vybrane ulohy dle filtru.
         * Varianty:
         * .on('change', 'Gordic.Foo.Server.GMyTask', function(){...})         //- registrace s filtrem s nazvem typu GAsyncTask
         * .on('change.myNamespace', function(task) { return task.id === mojeId; }, function() {...}) //- registrace s namespace a vlastnim filtrem@template TProgress
         * .on('change', null, function() {...})   //- registrace ev.Handleru na vsechny tasky
         *
         * @template TResult
         * @param {string} evName Nazev udalosti, volitelne muze obsahovat i namespace
         * @param {string | GTaskManagerFilter} filter Filtr, kterym se rika, kterym taskum ma byt ev. handler registrovan
         * @param {any} evHandler Obsluha udalosti
         * @returns GTaskManager pro moznost retezeni metod
         */
        static on<TProgress extends IGTaskProgress, TResult>(evName: string, filter: string | GTaskManagerFilter, evHandler: ((this: IGTask, ctx: GTaskContext<TProgress, TResult>, args: any) => void)): GTaskManager;
        /**
         * Odregistrovani obsluhy udalosti.
         * Varianty:
         * .off()          - odregistruje uplne vsechno
         * .off("change")  - odregistruje vsechny handlery na udalost 'change'
         * .off("change.myNamespace") - odregistruje pouze udalost 'change' v namespace 'myNamespace'
         * .off(".myNamespace") - odregistruje vsechny typy udalosti v namespace 'myNamespace'
         * @param evName Nazev, volitelne muze obsahovat namespace
         * @param evHandler Odkaz na ev. handler
         */
        off<TProgress extends IGTaskProgress, TResult>(evName: string, evHandler?: ((this: IGTask, ctx: GTaskContext<TProgress, TResult>, args: any) => void)): GTaskManager;
        /**
         * Odregistrovani obsluhy udalosti.
         * Varianty:
         * .off()          - odregistruje uplne vsechno
         * .off("change")  - odregistruje vsechny handlery na udalost 'change'
         * .off("change.myNamespace") - odregistruje pouze udalost 'change' v namespace 'myNamespace'
         * .off(".myNamespace") - odregistruje vsechny typy udalosti v namespace 'myNamespace'
         * @param evName Nazev, volitelne muze obsahovat namespace
         * @param evHandler Odkaz na ev. handler
         */
        static off<TProgress extends IGTaskProgress, TResult>(evName: string, evHandler?: ((this: IGTask, ctx: GTaskContext<TProgress, TResult>, args: any) => void)): GTaskManager;
        /**
         * Registrace vlastnorucne vytvoreneho tasku do manageru.
         * @param t Task
         * @param registerHandlers Registrovat tasku handlery, ktere jiz zna GTaskManager? Default=true
         */
        static register(t: IGTask | IGTask[], registerHandlers?: boolean): void;
        /**
         * Odregistruje z tasku vsechny handlery
         * @param t Instance tasku
         * @param dontRemove Je-li true, pouze odregistruje handlery a ponecha v GTaskManageru
         */
        static unregister(t?: IGTask, dontRemove?: boolean): void;
        /**
         * Signalizace cancel
         * @param t Instance tasku nebo ID
         */
        static cancel(t: IGTask | string): JQueryPromise<void>;
        /**
         * Provede uvolneni prostredku na serveru
         * @param t Instance tasku nebo ID
         */
        static clean(t: IGTask | string): JQueryPromise<void>;
        /**
         * Uvolneni prostredku vsech tasku (Pozor! Zachazet s opatrnosti - odstrani vse na dane ixs_fun!)
         */
        static clearAll(): JQueryPromise<void>;
        /**
         * Uvede objekt GTaskManager do puvodniho stavu (odregistruje vsechny tasky, zahodi vsechny handlery)
         */
        static reset(): void;
        /**
         * Vyhleda task podle ID
         * @param id
         */
        static findById(id: string): IGTask | null;
        /**
         * Vyhleda task podle nazvu tridy (C# vc. namespace)
         * @param className
         */
        static findByClass(className: string): IGTask[];
        /**
         * Vyhledani pomoci vlastni filtrujici funkce
         * @param filter Filtrovaci funkce
         */
        static findByFilter(filter: (t: IGTask) => boolean): IGTask[];
        /** Vrati vsechny tasky */
        static getAllTasks(): IGTask[];
        /**
         * Vraceni promise objektu k inicalizaci
         */
        static getInitPromise(): JQueryPromise<void>;
        /** Provede synchronizaci server=>client, je-li neco noveho, vyvola handlery */
        static syncStates(): JQueryPromise<void>;
        private static _filterTasks;
        private static _start;
        private static _getStates;
        private static _getStatesCall;
        private static _updateStates;
        private static _handlerAddTasks;
        private static _handlerRemoveTasks;
        private static _taskAddHandlers;
        private static _taskRemoveHandlers;
        private static _on;
        private static _initDefaultHandlers;
    }
    /** Proxy pro moznost volani async. centra na contentech. */
    class GTaskManagerProxy implements IGTaskManagerProxy {
        private _parentContent;
        constructor(parentContent: GContent);
        /**
         * Nastartovani async. ulohy v kontextu tohoto contentu.
         * @param className Nazev tridy (C#) implementujici GAsyncTask, GAsyncTaskServer nebo GAsyncTaskAppServer vc namespace (napr. "Gordic.Uka.WebClient.G01HelloWorldAsyncTask")
         * @param customDto Vstup asynchronni ulohy
         * @param taskOptions Vlastni options
         * @returns Promise s vlastni instanci GTask k rizeni behu async. ulohy na serveru nebo null, pokud to neni podporovano.
        */
        start<TResult extends any>(className: string, customDto: any, taskOptions?: IGTaskOptions): GTaskPromise<IGTaskContext<TResult>, IGTaskContextFail, IGTaskContextProgress<IGTaskProgress>> | null;
        on<TResult>(evName: string, filter: string | GTaskManagerFilter, evHandler: ((this: IGTask, ctx: GTaskContext<IGTaskProgress, TResult>, args: any) => void)): void;
        off<TResult>(evName: string, evHandler?: ((this: IGTask, ctx: GTaskContext<IGTaskProgress, TResult>, args: any) => void)): void;
    }
    interface GAsyncSignalRServer {
        send(name: string, message: string): void;
        register(groupId: string): JQueryPromise<void>;
        unregister(groupId: string): JQueryPromise<void>;
    }
    interface IGHub<TServer> extends SignalR.Hub.Proxy {
        server: TServer;
        client: object;
    }
}
declare namespace Gordic.Widget {
    type filterpanelFilterOptionsInternal<TData> = filterpanelFilterOptions<TData> & {
        /**
         * Nevyplňovat, pouze interní příznak.
         * @type {boolean}
         */
        gfilterpanel_staticFilter?: boolean;
        _changed?: boolean;
        _primary?: boolean;
    };
    export class gfilterpanel<TFilterData extends ObjectLiteral<any>> extends Gordic.Widget.JQueryWidget<IGFilterPanelOptionsWithObsolites<TFilterData>> {
        static widgetName: string;
        /**
         * indikace zda jsou otevřené oblíbené
         * @type {boolean}
         */
        private favotitesOpened?;
        /**
         * gstor pro manipulaci s oblíbenými
         * @type {Gordic.Data.Storage}
         */
        private gStore?;
        /**
         * instance iconbuilderu
         * @type {Utils.IconBuilder}
         */
        private iconBuilder?;
        private favoriteButPrimary?;
        private confirmedData?;
        private allRowsNameTemp?;
        private selBoxArrayTemp?;
        private favoriteModel?;
        private showHidden?;
        private addedToFavoriteSecretly?;
        private contentSeznamu?;
        private functionForSaveDefault?;
        private isSetDefaultFilter?;
        private dlgDetail?;
        private dlgDetailFavoritesChanged?;
        private actions?;
        private slectFavoriteButton?;
        private vyberPredvolenychFiltru?;
        private masterRow?;
        private mainFilterRow?;
        private mainFilterButton?;
        private tempFilter?;
        private favoriteParentDiv?;
        private favoriteFilteredSelectBox?;
        private LastValueInnSelboxSVyhledanejmaKriteriema?;
        private isDataInfavoriteFilteredSelectBox?;
        private inlineDialogVyslednySelectBox?;
        private aktualnePridavanyOblibenyModel?;
        private aktualnePridavanyOblibeny?;
        private puvodniDataDoDetailu?;
        private akceProVyberOblibenych?;
        private akceSkrytPrazdne?;
        private actStatusTypFiltru?;
        private staticTypFiltru?;
        private staticPoznamka?;
        private staticFilterName?;
        private actStatusFilterName?;
        private actSaveIcoInDetail?;
        private actNovyIcoInDetail?;
        private dlgSaveDialog?;
        private data?;
        private initialValuesFromForms?;
        /**
         * Identifikátor funkce aktuálně přihlášenho uživatele.
         * @type {string}
         */
        private ixsFunAkt?;
        private filterViewModeTemp?;
        private favoritesTemp?;
        private poVyhledaniZobrazitTemp?;
        private poOtevreniOtevritPanelPodminekTemp?;
        private unselectFavoriteFilterTemp?;
        private zobrazitPouzeVyplneneVDetailuFiltruTemp?;
        private autoLoadAfterTemp?;
        private autoLoadAfterSelectoxDataTemp?;
        /**
         * Id flashpanelu informujícím o nevalidních datech formuláře.
         *
         * @author  TFeik
         * @date    16.07.2020
         *
         * @type {string}
         * @default 'filterpanelFiterInvalidDataFlash'
         */
        private readonly invalidDataFlashPanelId;
        private $skladisteKontrolnichDivu?;
        protected _getCreateOptions(): IGFilterPanelOptionsWithObsolites<TFilterData>;
        protected _create(): void;
        private _renderFilterpanel;
        /**
         * Vrátí content seznamu.
         *
         * @author  TFeik
         * @date    31.01.2023
         *
         * @returns {GContent}
         */
        private getContentSeznamu;
        /**
         * Vrátí uložený výchozí filtr ze storage.
         *
         * @author  TFeik
         * @date    04.06.2020
         *
         * @returns {filterpanelFilterOptionsInternal<TFilterData> | undefined}
         */
        private _getDefaultFilterFromStorage;
        /**
         * Příznak, zda lze změnit události kdy se má automaticky spustit načtení dat.
         *
         * @author  TFeik
         * @date    20.04.2022
         *
         * @returns {boolean}
         */
        private lzeNastavitAutoLoadAfter;
        /**
         * Vrátí option povolení změny událostí kdy se má automaticky spustit načtení dat uživatelem včetně výchozí hodnoty.
         *
         * @author  TFeik
         * @date    07.07.2022
         *
         * @returns {Gordic.Widget.filterpanelAutoLoadAfter[] | 'Deny'}
         */
        getAutoLoadAfterUserSettings(): Gordic.Widget.filterpanelAutoLoadAfter[] | 'Deny';
        /**
         * Vrátí uživatelský text pro hodnotu události spouštící načtení dat.
         *
         * @author  TFeik
         * @date    07.07.2022
         *
         * @param {FilterViewMode} filterViewMode
         * @returns {string}
         */
        private getResourceTextForAutoLoadAfter;
        /**
         * Vrátí data pro selectbox změny událostí kdy se má automaticky spustit načtení dat.
         *
         * @author  TFeik
         * @date    07.07.2022
         *
         * @returns {filterViewModeSelectoxData[]}
         */
        private getAutoLoadAfterSelectoxData;
        /**
         * Události kdy se má automaticky spustit načtení dat respektjící uživatelské nastavení a obsolite optiony.
         *
         * @author  TFeik
         * @date    20.04.2022
         *
         * @returns {Gordic.Widget.filterpanelAutoLoadAfter[]}
         */
        private getAutoLoadAfter;
        /**
         * getAutoLoadAfterCreatePanel
         *
         * @author  TFeik
         * @date    20.04.2022
         *
         * @returns {boolean}
         */
        private getAutoLoadAfterCreatePanel;
        /**
          * getAutoLoadAfterChoseFilter
          *
          * @author  TFeik
          * @date    20.04.2022
          *
          * @returns {boolean}
          */
        private getAutoLoadAfterChoseFilter;
        /**
         * getAutoLoadAfterClearFilter
         *
         * @author  TFeik
         * @date    20.04.2022
         *
         * @returns {boolean | undefined}
         */
        private getAutoLoadAfterClearFilter;
        /**
         * Vrátí uložený výchozí filtr ze statických filtrů.
         *
         * @author  TFeik
         * @date    04.06.2020
         *
         * @returns {filterpanelFilterOptionsInternal<TFilterData> | undefined}
         */
        private _getDefaultFilterFromStatic;
        private _isModeDetailBezFavorite;
        private _simpleAutoload;
        private _buildGStore;
        private reload;
        /**
         * Dohledá jquery s tlačítkem "Filtr".
         *
         * @author  TFeik
         * @date    04.06.2020
         *
         * @returns {JQuery<HTMLElement> | null} JQuery s tlačítkem "Filtr". Pokud není nalezen pak vrátí [null].
         */
        private findFilterButton;
        /**
         * Nastaví tlačítku "Filtr" patřičný styl dle toho jestli je rozbalený, či zabalený.
         * Platí pouze pro režim filtrů [FilterViewMode.Normal]. V ostatních médech neudělá nic.
         *
         * @author  TFeik
         * @date    03.11.2020
         *
         * @param {boolean} expanded Příznak, zda chceme tlačítko nastavit jako rozbalené [true], nebo zabalené [false].
         */
        private setExpandStyleToFilterButton;
        private refreshFavorite;
        private _clearFavoriteForm;
        /**
         * Zkontroluje, zda je zadaný filtr uložen v uživatelském nastavení jako výchozí.
         *
         * @author  DSebesta, TFeik
         * @date    Dávno tomu, 04.06.2020
         *
         * @param {filterpanelFilterOptionsInternal<TFilterData>} [filter]
         * @returns {boolean}
         */
        private _isThisIxsMasFavorite;
        private _createActions;
        private _vymazatKriteria;
        private _vyhledaniPoVymazani;
        private _createMainFilterRow;
        private _createOrSetFilteredSlectbox;
        private _startFindAfrerRemoveFormVyslednySelectbox;
        /**
         * Nastaví vlastnost autoClose v inline dialogu s použitými filtry.
         *
         * @author  TFeik
         * @date    20.04.2022
         *
         * @param {boolean} autoClose
         */
        filterInlineDialogAutoClose(autoClose: boolean): void;
        private _inilneDialogPodSlectboxem;
        private _upravStylyMultiPolicekVybranychFiltru;
        private _skryjInlineDialogVyslednySelectBox;
        private _getFormOnlyWithVisibleRowByFieldName;
        private _findDifrenceBetweenArray;
        /**
         * funkce pro skrytí nebo zobrazení oblíbených a slectboxu s kritérii
         *
         * @param {filterpanelPoVyhledaniZobrazit} [stavZobrazeniFiltru] Stav, který chceme nastavit. Pokud není vyplněn pak se nastaví stav po vyhledání
         */
        private _showHideInternalfunction;
        private _favoriteFilteredSelectBoxShow;
        private _favoriteFilteredSelectBoxHide;
        private _hideFilteredSelectBoxAndShowBadge;
        private _showFilteredSelectBoxAndHideBadge;
        private _manageBadge;
        private _filtrBadgeShow;
        private _filtrBadgeHide;
        private _filterBadgeUpdate;
        private _manageAkceProVymazani;
        private _isEmptyObject;
        private _shbowAkceProVybmazani;
        private _hideAkceProVybmazani;
        private getAllRowsName;
        private getSelBoxArray;
        /**
         * najde všechny labely u řádku ve form descriptorech
         */
        private _findAndSetRowsNameInForms;
        private getFavorites;
        private getFavoritesWithoutTemp;
        /**
         * Uloží oblíbené do uživatelského nastavení.
         *
         * @param {string[] | null} favorites Pole políček, které chceme uložit do uživatelského nastavení. Null nastaví výchozí hodnoty / vymaže uživatelské nastavení.
         */
        private _setFavorites;
        /**
         * Vrátí ukládací formulář pro uložení masky / oblíbeného filtru z tempu, případně jej znovu vytvoří.
         *
         * @author  TFeik
         * @date    15.11.2022
         *
         * @param {filterpanelSaveFormType} formType
         * @returns {Forms.Form | undefined | null}
         */
        private getSaveForm;
        /**
         * getAllowedMaskTypes
         *
         * @author  TFeik
         * @date    29.09.2023
         *
         * @returns {Gin.Interface.TypMaskyEnum[]}
         */
        private getAllowedMaskTypes;
        /**
         * Vytvoří ukládací formulář pro uložení masky / oblíbeného filtru.
         *
         * @author  TFeik
         * @date    15.11.2022
         *
         * @param {filterpanelSaveFormType} formType
         * @returns {Forms.Form | undefined | null}
         */
        private createSaveForm;
        private _readfavoritForm;
        private _showFavorite;
        private showSimpleSelectFavorite;
        /**
         * createOptionsForSettingsDlg
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @returns {Gui.WebControls.GFilterpanelSettingsDlgFilterpanelOptions}
         */
        private createOptionsForSettingsDlg;
        private removeDuplicates;
        private _setIcoToMainSel;
        /**
         * unsavedChangesStateExists
         *
         * @author  TFeik
         * @date    11.10.2022
         *
         * @returns {boolean}
         */
        private unsavedChangesStateExists;
        private _findRow;
        private _openDetailZFavorite;
        private _openDetailZIndikaceZmeny;
        private openDetail;
        private _openDetail;
        private _setBreadcrumbs;
        private _setmodelInDetail;
        private _changeInDetilFilterData;
        /**
         * Přidá či odebere piny pro ovládání oblíbených filtrů
         *
         * @author  DSebesta, TFeik
         * @date    Dávno tomu, 23.03.2022
         */
        private _addOrRemoveFavoritePinInDetail;
        private _nastavAddOrRemoveFavoriteZUserSettings;
        private _isRowFavorite;
        private _openSaveingDialog;
        private _setmodelInSaveDetail;
        private _startSavingFilter;
        private _readuserFiltersFromResolver;
        private _setridNovaData;
        private _setDataAfterReadisComplete;
        private _setMainSelBox;
        private _pridejStaticFilters;
        private _setDetailSelBox;
        private _saveFilter;
        private _saveFilterFinish;
        private _afterSave;
        private _removeFilter;
        private _afterRemove;
        private _startFindFromFavoriteBut;
        /**
         * Vytvoří kontrolni div, který slouží pro přefiltrování a validaci dat pres formulář vytvořený pouze pro tento učel.
         * V případě, že je formulář již vytořen z dřívějška, pak jej zresetuje a vrátí (ušetří se další vytváření).
         *
         * @author  DSebesta, TFeik
         * @date    Dávno tomu, 21.05.2020
         *
         * @param {TFilterData} [filterData]
         * @returns {JQuery<HTMLElement>}
         */
        private _createKontrolniDiv;
        /**
         * Vrátí flagy pro práci s políčky na kontrolím divu.
         *
         * @author  TFeik
         * @date    08.04.2022
         *
         * @returns {FieldSetValueFlags}
         */
        private createKontroniDivFlags;
        private _removeKontrolniDiv;
        /**
         * Vrátí, případně vytvoří skladiště
         *
         * @author  TFeik
         * @date    19.10.2020
         *
         * @returns {JQuery<HTMLElement>}
         */
        private getSkladisteKontrolnichDivu;
        private _callFind;
        private _setSpecialNullInFromKontrolniDiv;
        private _userCollectDone;
        private _tryEndOperationElement;
        private _tryEndOperationDlgDetail;
        private _getDataForFilterBadge;
        private _addToValueString;
        private _setFilterBadge;
        private _setFilterBadgeFinish;
        private _parseValueToBadge;
        private _clearModel;
        private _changeBadgeColor;
        private _getCollectOfDetail;
        private _setCollectOfDetail;
        private _waitForDetail;
        private waitForDetail;
        private _getCollectOfFavorite;
        /**
         * Nasetuje data do detailu a počká až budou nastaveny.
         *
         * @author  TFeik
         * @date    01.02.2024
         *
         * @param {any} model
         * @param {boolean} [savedFilterFlag]
         * @returns {JQuery.Promise<void>}
         */
        private _setCollectOfFavoriteAndWaitingForValue;
        /**
         * Nasetuje data do detailu.
         *
         * @author  TFeik
         * @date    11.02.2020
         *
         * @param {any} model
         * @param {boolean} [savedFilterFlag]
         * @param {boolean} [waitingForValue]
         * @returns {JQuery.Promise<void> | null | void}
         */
        private _setCollectOfFavorite;
        private _waitForFavorite;
        /**
         * nasetuje object filtru z venku do vnitř a rovnou provede hledání
         *
         * @param {any} [filter] celí model filtru (ne jenom data, pokud mate jen data je potřeba je zabalit do objektu a přidat gfilterpanel_name), možnost nechat null, použije se předchozí
         * @param {boolean} [doNotSearch]
         * @param {boolean | null} [checkIfIsSetDefault]
         * @param {boolean | null} [extendIntoInitialValues]
         * @param {boolean | null} [vymazatTempFilter] // tohle je jen ochcávka protože někdo sprznil tu základní funkci. Do kodu v případě simpleMode přidal načítání z tempu, tkeré tam být nemá.
         */
        private applyFilter;
        private getForm;
        private _showHideFields;
        private _nastavSkrytPrazdnePoStartu;
        private _showFieldThree;
        protected _destroy(): void;
        protected _setOptions(options: any): void;
        protected _setOption(key: any, value: any): void;
        private _setInitValueToTemp;
        private _getInitValueFromForms;
        private getCurrentData;
        private vyhozeniValidacniHlasky;
        private getConfirmedData;
        /**
          * Nastaví hodnotu temp filtru s ohledem na čas požadavku.
          *
          * @author  TFeik
          * @date    16.08.2022
          */
        private setTempFilter;
        /**
         * Vrátí příznak zda otevřít panel podmínek po otevření filterpanelu s respektováním uživatelského nastavení.
         *
         * @author  TFeik
         * @date    10.07.2020
         *
         * @returns {boolean}
         */
        private getPoOtevreniOtevritPanelPodminek;
        private _ulozUzivatelskeNastaveni;
        /**
         * funkce pro úpravu  primary stavu na vyhledávacím tlačítku
         *
         * @param {boolean} nastavitPrimary
         */
        private _uppravPrimaryNaButton;
        /**
         * Vyvolá event pomocí this._trigger. Vynucuje použití pouze vyjmenovaných eventů kvůli kontrole názvů eventů.
         *
         * @author  TFeik
         * @date    13.02.2020
         *
         * @param {filterpanelEvent} eventName
         * @param {JQuery.TriggeredEvent} [event]
         * @param {Object} [data]
         */
        private _triggerEvent;
        /**
         * Vrátí mód zobrazení filtrů s respektováním uživatelského nastavení.
         *
         * @author  TFeik
         * @date    16.04.2020
         *
         * @returns {FilterViewMode}
         */
        private getFilterViewMode;
        /**
         * Příznak, zda je aktuálně zvolený simple mód.
         *
         * @author  TFeik
         * @date    16.04.2020
         *
         * @returns {boolean}
         */
        private isSimpleMode;
        /**
         * Vrátí uživatelský text pro enum módu zobrazení filtru.
         *
         * @author  TFeik
         * @date    16.04.2020
         *
         * @param {FilterViewMode} filterViewMode
         * @returns {string}
         */
        private getResourceTextForFilterViewMode;
        /**
         * Zkontroluje, zda má filterpanel vše pot5ebné pro použití daného módu zobrazení filtrů.
         *
         * @author  TFeik
         * @date    16.04.2020
         *
         * @param {FilterViewMode} filterViewMode
         * @returns {boolean}
         */
        private lzePouzitFilterViewMode;
        /**
         * Vytvoří menuParams obsahující akci pro otevření nastavení filterpanelu.
         *
         * @author  TFeik
         * @date    20.04.2020
         *
         * @returns {MenuParamsAction}
         */
        private createSettingsAction;
        /**
         * Vrátí příznak, zda má uživatel možnost změnit nějaké nastavení.
         *
         * @author  TFeik
         * @date    20.04.2020
         *
         * @returns {boolean}
         */
        private isAnyUserSettingsAvailable;
        /**
         * Příznak, zda lze změnit chování panelu zobrazení podmínek po vyhledání.
         *
         * @author  TFeik
         * @date    19.05.2020
         *
         * @returns {boolean}
         */
        private lzeNastavitChovaniZobrazeniPodminekPoVyhledani;
        /**
        // * Vrátí data pro selectbox změny režimu filterpanelu.
        // *
        // * @author  TFeik
        // * @date    20.04.2020
        // *
        // * @returns {filterViewModeSelectoxData[]}
        // */
        /**
         * Zkontroluje, zda filterpanel může použít dané poVyhledaniZobrazit.
         *
         * @author  TFeik
         * @date    09.06.2020
         *
         * @param {filterpanelPoVyhledaniZobrazit} poVyhledaniZobrazit
         * @returns {boolean}
         */
        private lzePouzitPoVyhledaniZobrazit;
        /**
         * Vrátí data pro selectbox po vyhledání zobrazit.
         *
         * @author  TFeik
         * @date    03.06.2020
         *
         * @returns {selectboxData<filterpanelPoVyhledaniZobrazit>[]}
         */
        private getPoVyhledaniZobrazitSelectoxData;
        /**
         * Překreslí filterpanel s tím, že přenese data v oblíbených.
         *
         * @author  TFeik
         * @date    20.04.2020
         */
        private redrawFilterpanel;
        /**
         * getPoVyhledaniZobrazit
         *
         * @author  TFeik
         * @date    19.05.2020
         *
         * @returns {filterpanelPoVyhledaniZobrazit}
         */
        private getPoVyhledaniZobrazit;
        /**
         * Vrátí příznak, zda již (od vytvoření filterpanelu) prohěhlo vyhledání dat [true].
         *
         * @author  TFeik
         * @date    11.06.2020
         *
         * @returns {boolean} Pokud již bylo hledáno [true], jinak [false].
         */
        wasSearched(): boolean;
        /**
         * Vrátí aktuálně zvolený filtr v selectboxu s filtry.
         *
         * @author  TFeik
         * @date    11.06.2020
         *
         * @param {'getFilterCurrent'} method
         * @returns {JQuery.Promise<Gordic.Widget.filterpanelFilterOptions<TData> | undefined | null>}
         */
        getFilterCurrent(): JQuery.Promise<filterpanelFilterOptions<TFilterData> | undefined | null>;
        /**
         * Vyčistí hodnoty ve filterpanelu (nastaví výchozí).
         *
         * @author  TFeik
         * @date    07.08.2020
         */
        clear(): void;
        /**
         * Vrátí příznak, zda je povoleno odvybrat aktuální výchozí filtr [true], nebo je možné pouze vybrat jiný [false].
         *
         * @author  TFeik
         * @date    17.07.2020
         *
         * @returns {boolean}
         */
        private getUnselectFavoriteFilter;
        /**
         * Vrátí příznak, zda se "přepínatelné" akce v detailu filtru zobrazí jako checkbox [true].
         *
         * @author  TFeik
         * @date    18.05.2022
         *
         * @returns {boolean}
         */
        private getDetailActionAsCheckbox;
        /**
         * Vrátí příznak, zda se má detail fltru po otevření rovnou zafiltrovat na pouze vyplněné [true].
         *
         * @author  TFeik
         * @date    20.07.2020
         *
         * @returns {boolean}
         */
        private getZobrazitPouzeVyplneneVDetailuFiltru;
        /**
         * Příznak, zda lze změnit zobrazení pouze vyplněných podmínek v detailu filtru.
         *
         * @author  TFeik
         * @date    20.07.2020
         *
         * @returns {boolean}
         */
        private lzeNastavitZobrazitPouzeVyplnene;
        /**
         * Nastaví focus na vybranou položku filterpanelu.
         *
         * @author  TFeik
         * @date    05.11.2020
         * @since   484.1.0.696
         *
         * @param {filterpanelFocusTarget | null} [target] Položka, na kterou bude dán focus. Pokud nenízadána, pak se určí automaticky.
         */
        focus(target?: filterpanelFocusTarget | null): void;
        /**
         * Příznak, zda je možné měnit uživatelské nastavení.
         *
         * @author  TFeik
         * @date    20.04.2020
         *
         * @returns {boolean}
         */
        private _isCustomizationEnabled;
        /**
         * Příznak, zda může být zobrazen selectbox pro výběr uložených filtrů..
         *
         * @author  TFeik
         * @date    20.04.2020
         *
         * @returns {boolean}
         */
        private _canShowMainSelectbox;
        private initialValuesTemp?;
        private getInitialValues;
        private temp?;
        /**
         * Sezbírá a vrátí z políček definice filtrů.
         *
         * @author  TFeik
         * @date    19.07.2023
         *
         * @returns {Gin.Interface.GMaskaTypeDefinitionDto[]}
         */
        private getTypeDefinitions;
        /**
         * Striktně zakáže automatické načtení hned po otevření seznamu, oblíbený filtr se pouze předplní.
         *
         * @author  TFeik
         * @date    30.10.2023
         *
         * @returns {boolean}
         */
        private getStrictStopAutoLoad;
        /**
         * Příznak, zda uživatel může změnit zakázání automatického načtení hned po otevření seznamu.
         *
         * @author  TFeik
         * @date    30.10.2023
         *
         * @returns {boolean}
         */
        getStrictStopAutoLoadUserSettings(): boolean;
        /**
         * Povolení změny modu zobrazení filtru uživatelem.
         *
         * @author  TFeik
         * @date    30.10.2023
         *
         * @returns {FilterViewMode[] | 'Deny'}
         */
        getFilterViewModeUserSettings(): FilterViewMode[] | 'Deny';
        /**
         * Nastaví všechny vniřní proměnné na undefined.
         *
         * @author  TFeik
         * @date    20.04.2020
         */
        private _clearClassProperties;
        /**
         * Zkontroluje, zda je element na kontrolním divu.
         *
         * @author  TFeik
         * @date    24.02.2022
         *
         * @param {JQuery<HTMLElement>} $element
         * @returns {boolean}
         */
        static IsInKontrolniDiv($element: JQuery<HTMLElement>): boolean;
        /**
         * Odebere z objektu technické vlastosti filtru, aby zůtala pouze čistá data pro filtry.
         * Neupravuje původní filtr, ale vrátí novou instanci.
         *
         * @author  TFeik
         * @date    17.10.2023
         *
         * @param {filterpanelFilterOptionsInternal<TData> | undefined | null} filter Filtry včetněte technických vlastnotí pro filterpanel.
         * @returns {TData} Nová instance objektu s filtry.
         */
        static RemoveFilterHelperValues<TData = any>(filter: filterpanelFilterOptionsInternal<TData> | undefined | null): TData;
    }
    export {};
}
interface JQuery {
    gfilterpanel<TFilterData = any>(options: IGFilterPanelOptions<TFilterData>, ...otherOptions: Partial<IGFilterPanelOptions<TFilterData>>[]): JQuery;
    gfilterpanel(method: "destroy"): JQuery;
    /**
     * Metoda pro aplikování filtru. Jako vstupní parametr se posílá object filtru i s daty podmínek, lze nechat i parametr prázdný nebo null, v tomto případě se použijí data z posledního vyhledávání.
     * Po aplikování této metody se provede rovnou vyhledávání. Pokud je automatické vyhledání nežádoucí zadejte druhý parametetr doNotSearch jako true.
     * Pokud tuto metodu používáte například jako přednastavování políček, tak parametrem "checkIfIsSetDefault=true" povolíte kontrolu, která kontroluje zda již neproběhlo nastavení pomocí uživatelského defaultního filtru. Pokud ano, tak váš přikaz bude ignorovat.
     *
     * @author DSebesta
     *
     * @param {"applyFilter"} method
     * @param {TFilterData} [filter] Celý objekt filtru.
     * @param {boolean} [doNotSearch] true = autmoatické vyhledávání vypnuto.
     * @param {boolean} [checkIfIsSetDefault]  true = kontrola zda již neproběhlo nastavení pomocí uživatelského defaultního filtru.
     * @param {boolean} [extendIntoInitialValues] .
     * @param {boolean} [vymazatTempFilter]  true = Vymaže Tempfiltr speciálka pro volání gfilterpanel("applyFilter",null,null,null,true). // simulace že klikl uživatel
     *
     */
    gfilterpanel<TFilterData = any>(method: "applyFilter", filter?: TFilterData, doNotSearch?: boolean, checkIfIsSetDefault?: boolean, extendIntoInitialValues?: boolean, vymazatTempFilter?: boolean): JQuery;
    gfilterpanel<TFilterData = any>(method: "getConfirmedData"): {
        filter: TFilterData | null;
    } | null;
    gfilterpanel(method: "waitForDetail"): JQueryPromise<any>;
    gfilterpanel(method: "getForm"): JQuery;
    gfilterpanel<TFilterData = any>(method: "getCurrentData"): TFilterData;
    /**
     * Vrátí příznak, zda již (od vytvoření filterpanelu) prohěhlo vyhledání dat [true], respektive volání funkce apply.
     *
     * @author  TFeik
     * @date    11.06.2020
     *
     * @param {"wasSearched"} method
     * @returns {boolean} Pokud již bylo hledáno (byla zavolána funkce apply) [true], jinak [false].
     */
    gfilterpanel(method: "wasSearched"): boolean;
    /**
     * Vrátí aktuálně zvolený filtr v selectboxu s filtry.
     *
     * @author  TFeik
     * @date    11.06.2020
     *
     * @param {'getFilterCurrent'} method
     * @returns {JQuery.Promise<Gordic.Widget.filterpanelFilterOptions<TFilterData> | undefined | null>}
     */
    gfilterpanel<TFilterData = any>(method: 'getFilterCurrent'): JQuery.Promise<Gordic.Widget.filterpanelFilterOptions<TFilterData> | undefined | null>;
    /**
     * Vyčistí hodnoty ve filterpanelu (nastaví výchozí).
     *
     * @author  TFeik
     * @date    07.08.2020
     *
     * @param {'clear'} method
     */
    gfilterpanel(method: 'clear'): void;
    /**
     * Nastaví focus na vybranou položku filterpanelu.
     *
     * @author  TFeik
     * @date    05.11.2020
     * @since   484.1.0.696
     *
     * @param {'focus'} method
     * @param {Gordic.Widget.filterpanelFocusTarget | null} [target] Položka, na kterou bude dán focus. Pokud nenízadána, pak se určí automaticky.
     */
    gfilterpanel(method: 'focus', target?: Gordic.Widget.filterpanelFocusTarget | null): void;
    /**
     * Nastaví vlastnost autoClose v inline dialogu s použitými filtry.
     *
     * @author  TFeik
     * @date    20.04.2022
     *
     * @param {'filterInlineDialogAutoClose'} method
     * @param {boolean} autoClose
     */
    gfilterpanel(method: 'filterInlineDialogAutoClose', autoClose: boolean): void;
}
/**
 * uložiště pro defaultní filtr
 *
 * @author TFeik
 * @since 484.1.0.72
 */
declare namespace Gordic.Gin.FilterStorageService.StoreDefault {
    interface saveDefaultReturnValue {
        stav: "smazan" | "ulozen" | "neulozen";
    }
    /**
     * ukládání defaultu
     *
     * @param {Data.IGStorage} gStore
     * @param {any} filter
     * @param {string} [ixsFunAkt]
     */
    function saveDefault(gStore: Data.IGStorage, filter: any, ixsFunAkt?: string): saveDefaultReturnValue;
    /**
     * export function saveIfSameIxsMas
     *
     * @param {Data.IGStorage} gStore
     * @param {any} filter
     * @param {string} [ixsFunAkt]
     */
    function saveIfSameIxsMas(gStore: Data.IGStorage, filter: any, ixsFunAkt?: string): void;
    /**
     * export function getDefault
     *
     * @param {Data.IGStorage} gStore
     * @param {string} [ixsFunAkt]
     * @returns {any | null}
     */
    function getDefault(gStore: Data.IGStorage, ixsFunAkt?: string): any | null;
    /**
     * export function removeIfSameIxsMas
     *
     * @param {Data.IGStorage} gStore
     * @param {any} ixs_mas
     * @param {string} [ixsFunAkt]
     */
    function removeIfSameIxsMas(gStore: Data.IGStorage, ixs_mas: any, ixsFunAkt?: string): boolean;
    /**
     * export function removeIfSameObjectOrEmpty
     *
     * @param {Data.IGStorage} gStore
     * @param {any} filter
     * @param {string} [ixsFunAkt]
     */
    function removeIfSameObjectOrEmpty(gStore: Data.IGStorage, filter: any, ixsFunAkt?: string): boolean;
}
declare namespace Gordic.Gui.WebControls {
    /**
     * Vstupní parametry dialogu GFilterpanelSettingsDlg.
     *
     * @author  TFeik
     * @since   488.1.0.316
     * @date    03.08.2022
     */
    interface GFilterpanelSettingsDlgInputParams {
        filterpanel: GFilterpanelSettingsDlgFilterpanelOptions;
        userSettingsCurrent: GFilterpanelSettingsDlgUserSettingsData;
    }
    /**
     * Návratová hodnota dialogu GFilterpanelSettingsDlg.
     *
     * @author  TFeik
     * @since   488.1.0.316
     * @date    03.08.2022
     */
    interface GFilterpanelSettingsDlgReturnValue {
        userSettingsNew?: GFilterpanelSettingsDlgUserSettingsData;
        reset?: boolean;
    }
    /**
     * GFilterpanelSettingsDlgUserSettingsData
     *
     * @author TFeik
     * @since 488.1.0.395
     */
    interface GFilterpanelSettingsDlgUserSettingsData extends Widget.filterpanelUserSettingsData {
        favorites?: string[] | null;
    }
    /**
     * GFilterpanelSettingsDlgFilterpanelOptions
     *
     * @author TFeik
     * @since 488.1.0.395
     */
    interface GFilterpanelSettingsDlgFilterpanelOptions extends /*Required<*/ Pick<IGFilterPanelOptions, 'autoLoadAfterUserSettings' | 'filterViewModeUserSettings' | 'poVyhledaniZobrazitUserSettings' | 'idSimpleMode' | 'clearFilterButtonVisible' | 'strictStopAutoLoadUserSettings'> {
        canShowMainSelectbox: boolean;
        selBoxArray: Widget.selBoxArrayItem[];
    }
    /**
     * Content pro nastavení filterpanelu.
     *
     * @author  TFeik
     * @since   488.1.0.316
     * @date    03.08.2022
     */
    class GFilterpanelSettingsDlg extends GContentBase implements IGClientContent {
        /**
         * Input
         * @type {GFilterpanelSettingsDlgInputParams}
         */
        private Input?;
        /**
         * $Form
         * @type {JQuery<HTMLElement>}
         */
        private $Form?;
        /**
         * DataViewPoVyhledaniZobrazit
         * @type {Data.View<Widget.selectboxData<Widget.filterpanelPoVyhledaniZobrazit>>}
         */
        private DataViewPoVyhledaniZobrazit?;
        /**
         * DataViewAutoLoadAfter
         * @type {Data.View<Widget.selectboxData<Widget.filterpanelAutoLoadAfter>>}
         */
        private DataViewAutoLoadAfter?;
        /**
         * prepareContent.
         *
         * @author  TFeik
         * @date    03.08.2022
         *
         * @param {GFilterpanelSettingsDlgInputParams} [input]
         */
        prepareContent(input?: GFilterpanelSettingsDlgInputParams): void;
        /**
         * createForm
         *
         * @author  TFeik
         * @date    03.08.2022
         *
         * @returns {Forms.Form}
         */
        private createForm;
        /**
         * createActions
         *
         * @author  TFeik
         * @date    05.10.2022
         */
        private createActions;
        /**
         * createMenu
         *
         * @author  TFeik
         * @date    05.10.2022
         */
        private createMenu;
        /**
         * hideShowFields
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @returns {JQuery.Promise<void>}
         */
        private hideShowFields;
        /**
         * collect
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {ModelOptions} [modelOptions]
         * @returns {JQuery.Promise<GFilterpanelSettingsDlgUserSettingsData>}
         */
        private collect;
        /**
         * apply
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {GFilterpanelSettingsDlgUserSettingsData | undefined | null} data
         * @param {ModelOptions} [modelOptions]
         * @returns {JQuery.Promise<void>}
         */
        private apply;
        /**
         * closeWithValue
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {GFilterpanelSettingsDlgReturnValue} [value]
         */
        private closeWithValue;
        /**
         * adjustBasedOnFilterViewMode
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {GFilterpanelSettingsDlgUserSettingsData} input
         * @returns {GFilterpanelSettingsDlgUserSettingsData}
         */
        private adjustBasedOnFilterViewMode;
        /**
         * isValid
         *
         * @param {GFilterpanelSettingsDlgInputParams | undefined | null} input
         * @returns {boolean | Gui.Dialogs.OpenDialogRejectType}
         */
        static isValid(input: GFilterpanelSettingsDlgInputParams | undefined | null): boolean | Dialogs.OpenDialogRejectType;
        /**
         * createPoVyhledaniZobrazitSelectoxData
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {GFilterpanelSettingsDlgFilterpanelOptions | undefined | null} filterpanelOptions
         * @returns {Data.View<Widget.selectboxData<Widget.filterpanelPoVyhledaniZobrazit>>}
         */
        static createPoVyhledaniZobrazitSelectoxData(filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): Data.View<Widget.selectboxData<Widget.filterpanelPoVyhledaniZobrazit>>;
        /**
         * createFilterViewModeSelectoxData
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {GFilterpanelSettingsDlgFilterpanelOptions | undefined | null} filterpanelOptions
         * @returns {Data.View<Widget.selectboxData<FilterViewMode>>}
         */
        static createFilterViewModeSelectoxData(filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): Data.View<Widget.selectboxData<FilterViewMode>>;
        /**
         * createFavoritesInSimpleModeSelectoxData
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {Widget.selBoxArrayItem[] | null | undefined} selBoxArray
         * @returns {Data.View<Widget.selBoxArrayItem>}
         */
        static createFavoritesInSimpleModeSelectoxData(selBoxArray: Widget.selBoxArrayItem[] | null | undefined): Data.View<Widget.selBoxArrayItem>;
        /**
         * createFavoritesSelectoxData
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {Widget.selBoxArrayItem[] | null | undefined} selBoxArray
         * @returns {Data.View<Widget.selBoxArrayItem>}
         */
        static createFavoritesSelectoxData(selBoxArray: Widget.selBoxArrayItem[] | null | undefined): Data.View<Widget.selBoxArrayItem>;
        /**
         * createAutoLoadAfterSelectoxData
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @returns {Data.View<Widget.selectboxData<Widget.filterpanelAutoLoadAfter>>}
         */
        static createAutoLoadAfterSelectoxData(): Data.View<Widget.selectboxData<Widget.filterpanelAutoLoadAfter>>;
        /**
         * Vytvoří DataView hodnot pro selectbox Podmínky na detailu filtru.
         *
         * @author  TFeik
         * @date    28.04.2023
         *
         * @returns {Data.View<Widget.selectboxData<boolean>>}
         */
        static createZobrazitPouzeVyplneneSelectoxData(): Data.View<Widget.selectboxData<boolean>>;
        /**
         * Vrátí příznak, zda má uživatel možnost změnit nějaké nastavení.
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @returns {boolean}
         */
        static isAnyUserSettingsAvailable(filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): boolean;
        /**
         * Příznak, zda lze změnit chování panelu s oblíbenými podmínkami.
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @returns {boolean}
         */
        static lzeNastavitPoOtevreniOtevritPanelPodminek(filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): boolean;
        /**
         * lzeNastavitPoOtevreniOtevritPanelPodminekProFilterViewMode
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {FilterViewMode | undefined | null} filterViewMode
         * @returns {boolean}
         */
        static lzeNastavitPoOtevreniOtevritPanelPodminekProFilterViewMode(filterViewMode: FilterViewMode | undefined | null): boolean;
        /**
         * Příznak, zda lze změnit chování panelu zobrazení podmínek po vyhledání.
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @returns {boolean}
         */
        static lzeNastavitPoVyhledaniZobrazit(filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): boolean;
        /**
         * lzeNastavitPoVyhledaniZobrazitProFilterViewMode
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {FilterViewMode | undefined | null} filterViewMode
         * @param {GFilterpanelSettingsDlgFilterpanelOptions | undefined | null} filterpanelOptions
         * @returns {boolean}
         */
        private static lzeNastavitPoVyhledaniZobrazitProFilterViewMode;
        /**
         * lzePouzitPoVyhledaniZobrazit
         *
         * @author  TFeik
         * @date    20.04.2022
         *
         * @param {Widget.filterpanelPoVyhledaniZobrazit} poVyhledaniZobrazit
         * @param {FilterViewMode | undefined | null} filterViewMode
         * @param {GFilterpanelSettingsDlgFilterpanelOptions | undefined | null} filterpanelOptions
         * @returns {boolean}
         */
        static lzePouzitPoVyhledaniZobrazit(poVyhledaniZobrazit: Widget.filterpanelPoVyhledaniZobrazit | undefined | null, filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): boolean;
        /**
         * Příznak, zda lze změnit mód zobrazení filtrů.
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @returns {boolean}
         */
        static lzeNastavitFilterViewMode(filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): boolean;
        /**
         * getAvailableFilterViewMode
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {GFilterpanelSettingsDlgFilterpanelOptions | undefined | null} filterpanelOptions
         * @returns {FilterViewMode[]}
         */
        static getAvailableFilterViewMode(filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): FilterViewMode[];
        /**
         * Zkontroluje, zda má filterpanel vše pot5ebné pro použití daného módu zobrazení filtrů.
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {FilterViewMode} filterViewMode
         * @returns {boolean}
         */
        static lzePouzitFilterViewMode(filterViewMode: FilterViewMode | undefined | null, filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): boolean;
        /**
         * Příznak, zda lze změnit oblíbené podínky / filtry.
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @returns {boolean}
         */
        static lzeNastvitOblibenePodminky(filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): boolean;
        /**
         * lzeNastvitOblibenePodminkyProFilterViewMode
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {FilterViewMode | undefined | null} filterViewMode
         * @param {GFilterpanelSettingsDlgFilterpanelOptions | undefined | null} filterpanelOptions
         * @returns {boolean}
         */
        private static lzeNastvitOblibenePodminkyProFilterViewMode;
        /**
         * Příznak, zda lze změnit zobrazení pouze vyplněných podmínek v detailu filtru.
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @returns {boolean}
         */
        static lzeNastavitZobrazitPouzeVyplnene(filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): boolean;
        /**
         * lzeNastavitZobrazitPouzeVyplneneProFilterViewMode
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {FilterViewMode | undefined | null} filterViewMode
         * @returns {boolean}
         */
        private static lzeNastavitZobrazitPouzeVyplneneProFilterViewMode;
        /**
         * lzeNastavitStrictStopAutoLoad
         *
         * @author  TFeik
         * @date    30.10.2023
         *
         * @param {GFilterpanelSettingsDlgFilterpanelOptions | undefined | null} filterpanelOptions
         * @returns {boolean}
         */
        private static lzeNastavitStrictStopAutoLoad;
        /**
         * Příznak, zda lze změnit události kdy se má automaticky spustit načtení dat.
         *
         * @author  TFeik
         * @date    20.04.2022
         *
         * @returns {boolean}
         */
        static lzeNastavitAutoLoadAfter(filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null): boolean;
        /**
         * lzeNastavitAutoLoadAfterProFilterViewMode
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {FilterViewMode | undefined | null} filterViewMode
         * @param {GFilterpanelSettingsDlgFilterpanelOptions | undefined | null} filterpanelOptions
         * @returns {boolean}
         */
        private static lzeNastavitAutoLoadAfterProFilterViewMode;
        /**
         * lzePouzitAutoLoadAfter
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {Widget.filterpanelAutoLoadAfter | undefined | null} autoLoadAfter
         * @param {GFilterpanelSettingsDlgFilterpanelOptions | undefined | null} filterpanelOptions
         * @param {FilterViewMode | undefined | null} filterViewMode
         * @returns {boolean}
         */
        static lzePouzitAutoLoadAfter(autoLoadAfter: Widget.filterpanelAutoLoadAfter | undefined | null, filterpanelOptions: GFilterpanelSettingsDlgFilterpanelOptions | undefined | null, filterViewMode: FilterViewMode | undefined | null): boolean;
        /**
         * favoritesPrefab
         *
         * @author  TFeik
         * @date    05.10.2022
         *
         * @param {Widget.selBoxArrayItem[] | null | undefined} selBoxArray
         * @returns {GSelectBoxOptionsMulti<Widget.selBoxArrayItem>}
         */
        private favoritesPrefab;
    }
}
declare namespace Gordic.Gui.Dialogs {
    /**
     * Otevře dialog nastavení filterpanelu.
     *
     * @author  TFeik
     * @date    05.08.2022
     *
     * @param {OpenDialogParams<WebControls.GFilterpanelSettingsDlgInputParams | undefined>} input
     * @returns {JQuery.Promise<WebControls.GFilterpanelSettingsDlgReturnValue | undefined>}
     */
    function GFilterpanelSettingsDlg(input: OpenDialogParams<WebControls.GFilterpanelSettingsDlgInputParams | undefined>): JQuery.Promise<WebControls.GFilterpanelSettingsDlgReturnValue | undefined>;
}
declare namespace Gordic.Components.FormulaEvaluator {
    interface GFormulaArgumentHintCatalogueItem {
        name: string;
        desc?: string;
        usage?: string;
        keywords?: string;
        value: string;
    }
    interface GFormulaEvaluatorCatalogueItem {
        opType: 'unary' | 'binary' | 'function' | 'constant';
        group: FormulaGroup;
        action?: Function;
        /** gets original function in arguments */
        alternate?: Function;
        mapFrom?: string;
        operator?: string;
        name: string;
        usage: string;
        desc: string;
        args?: {
            name: string;
            desc: string;
            hints?: GFormulaArgumentHintCatalogueItem[] | (() => JQuery.Promise<GFormulaArgumentHintCatalogueItem[]>);
        }[];
    }
    enum FormulaGroup {
        MATH = "math",
        TEXT = "text",
        LOGIC = "logic",
        DATE = "date",
        USERCOLUMN = "usercolumn"
    }
    interface IGFormulaEvaluator {
        parse(func: string): IGFormulaExpression;
        debugParse(func: string): IGFormulaExpression;
        Catalogue: GFormulaEvaluatorCatalogueItem[];
    }
    interface IGFormulaExpression {
        evaluate(...params: any): any;
    }
    const Instance: IGFormulaEvaluator;
}
declare namespace Gordic.Components.Grid.ComputedColumn {
    var useFormulaParser: boolean;
    var useExprEval: boolean;
    interface ColumnDependeciesResult {
        column: Partial<UserColumn.UserColumnSeed> | GGridColumn;
        dependencies: (Partial<UserColumn.UserColumnSeed> | GGridColumn)[];
        isComplete: boolean;
    }
    interface FormulaIconColumnCatalogueItem {
        name: string;
        isIcon: true;
        desc: string;
    }
    /**
    * Vybuduje seznam závislých sloupců pro každý prvek předaného pole, vrací v topologickém pořadí (v kterém je potřeba je budovat
    * Vyhodí exception pokud najde cyklus
    * Sloupce s chybějící závislostí označí
    * Topological sort - DFS
    * @param wantedColumns - sloupce, které chceme seřadit a zjistit jejich závislosti
    * @param allColumns - všechny dostupné sloupce
    */
    function detectColumnsDependencies(wantedColumns: (Partial<UserColumn.UserColumnSeed> | GGridColumn)[], allColumns?: GGridColumn[]): ColumnDependeciesResult[];
    /**
     * Na základě stringu a ostatních sloupců vybuduje funkci, která vypočítá hodnotu sloupce pro každý řádek.
      
     * @param {GGridColumn} col
     * @param {GGridColumn[]} columns
     */
    function createComputer(wantedColumns: GGridColumn[]): Function;
    /**
     * Z formula vyrobí pravou část přiřazení do dat řádku (nahradí název sloupce za valueGetter)
      
     * @param {string} formula
     * @param {GGridColumn[]} columns
     * @returns {string}
     */
    function createEvaluableFormula(formula: string | undefined, columns: GGridColumn[]): {
        formula: string;
    };
    /**
     * Výpočet pro jeden řádek
     * @param formula
     * @param columns
     * @param row
     */
    function tryCompute(formula: string | undefined, columns: GGridColumn[], row?: any, rethrow?: boolean): any;
    /**
     * Z textu formuly vyextrahuje použité sloupce - převede na objekt pro další použití (v políčku dialogu a sloupci).
     * @param {string} formula
     * @param {GGridColumn[]} existingColumns
     */
    function encodeFormula(formula: string | undefined, existingColumns: GGridColumn[], escapeNewLines?: boolean): {
        formula: string;
        requires: string;
    };
    /**
     * Z formula vyrobí čitelnou verzi pro uživatele - názvy sloupců nahradí za caption
      
     * @param {string} formula
     * @param {GGridColumn[]} existingColumns
     */
    function prettyPrintFormula(formula: string | undefined, existingColumns: GGridColumn[], row?: MetaRow<any> | null): {
        formula: string;
        replacements: string[][][];
    };
    function printErrorHelp(val: any, e: any): string;
    interface FormulaFieldPrefabOptions {
        updatePreview: (this: HTMLElement, encodedValue: any | null, value?: string, onlyData?: boolean) => void;
        getAllColumns: (this: HTMLElement) => Gordic.Data.View;
        getCurrentRow: () => (ObjectLiteral<any> | null | void);
        getSelectableColumns: (this: HTMLElement) => Gordic.Data.View;
        validators?: Validators.Base[];
        catalogueFilter?: Data.FilterProcessor<FormulaEvaluator.GFormulaEvaluatorCatalogueItem>;
    }
    function createFormulaFieldPrefab(opts: FormulaFieldPrefabOptions): GStringBoxOptions;
}
declare namespace Gordic.Components.Grid.UserColumn {
    export function readUserColumns(userSettings: Data.IGStorage): UserColumnSeed[];
    export function saveUserColumns(userCols: UserColumnSeed[] | null, userSettings: Data.IGStorage): void;
    export class SettingsContent extends GContentBase implements IGClientContent {
        uid: string;
        title: string;
        grid: JQuery;
        gridUserSettings: Data.IGStorage;
        existingColumns: GGridColumn[];
        private allColumns;
        typeView: Gordic.Data.View;
        remoteControl: Gordic.Components.GridRC<any>;
        prepareContent(options: any): void;
        _createForm(): Forms.Form;
    }
    export interface UserColumnSeed {
        name: string;
        type: GGridColumnType | 'decimal' | 'date' | 'badge';
        caption: string;
        formula: string;
        requires: string;
    }
    interface IGBadgeDefinition {
        icon?: string;
        type: string;
        text?: string;
    }
    export function parseIconTemplate(val: string): {
        icon: string;
        text: string;
    };
    export function parseBadgeTemplate(val: string): IGBadgeDefinition[] | null;
    export function printBadges(badges?: IGBadgeDefinition[] | null): string;
    /**
     * Creates columns from userColumn seed information (from userSettings)
     * @param seeds
     * @param existingColumns
     */
    export function createColumnsFromSeeds(seeds: UserColumnSeed[]): GGridColumn<any>[];
    /**
     * Z předaného caption vygeneruje identifikátor sloupce
     *
     * @param {string | undefined | null} caption
     * @param {string[]} existingColumnNames
     */
    export function generateColumnName(caption: string | undefined | null, existingColumnNames: string[]): string;
    export {};
}
declare namespace Gordic.Components.Grid.CondFormats {
    function createComputer(formats: CondFormat[], cols: GGridColumn[]): Function;
    function createResetComputer(): Function;
    function getRequiredColumns(formats: any, cols: any): any[];
    function createClass(type: keyof Omit<CondFormat, "target" | "applyTo" | "formula">, value: any): string;
    class SettingsContent extends GContentBase implements IGClientContent {
        uid: string;
        title: string;
        grid: JQuery;
        getColumns: () => GGridColumn[];
        typeView: Gordic.Data.View;
        remoteControl: Gordic.Components.GridRC<any>;
        iconBuilder: any;
        private static readonly bgDataView;
        private static readonly textDataView;
        private static readonly styleDataView;
        prepareContent(options: any): void;
        _itemTemplate(targetClass: string, caption?: string): JQuery<HTMLElement>;
        _createFormatPreview(format: any): JQuery<HTMLElement>;
        _createForm(forRows: boolean): Forms.Form;
    }
}
declare namespace Gordic.Components.Grid.RowsCalc {
    type GGridColumnNumericType = Extract<GGridColumnType, "currency" | "number">;
    /** Options for .ggridrowscalc()*/
    export interface GGridRowCalcOptions extends JQueryUI.WidgetOptions {
        /**
         * Column names that will be ignored (won't be calculated)
         * DEFAULT = all columns with data type named in dataTypes property*/
        filterColumns?: GGridRowCalcFilterColumns;
        /**
         * Data types considered for calculation,
         * DEFAULT = ["currency", "number"] */
        columnTypes?: GGridColumnNumericType[];
    }
    export interface GGridRowCalcFilterColumns {
        /**
         * "include" - only these columns will be calculated,
         * "exclude" - these columns will be ignored = DEFAULT (if not set)
         **/
        mode?: "include" | "exclude";
        /** Column names that will be included or excluded from the calculation */
        columns: string[];
    }
    export class GGridRowsCalc<TRow> extends Gordic.Widget.JQueryWidget<GGridRowCalcOptions> {
        static readonly SHORTCUT_KEY = "ctrl+y";
        static widgetName: string;
        _create(): void;
        _destroy(): void;
        private addToInternalMenu;
        private showCalculationWindow;
    }
    export {};
}
interface JQuery {
    ggridrowscalc(options?: Gordic.Components.Grid.RowsCalc.GGridRowCalcOptions): JQuery;
}
declare namespace Gordic.Components.Grid.RowsCalc {
    class GGridRowsCalcContent extends GContentBase {
        private static readonly KEY_OPS;
        private cols;
        private rows;
        private columnTypes;
        private data;
        private $grid;
        private dataView;
        prepareContent(): void;
        closing(): void;
        /**
         * předzpracuj data pro pozdější použití., na konci spočítej výsledky operací sum pro každý počítatelný sloupec
         *
         * všechna data jsou zatím ukládána typem Decimal
         */
        private preprocessData;
        private calculatorSwitch;
        /**
         * Z nějakého důvodu v knihovně chybí Decimal.sum(), i když v docs se nachází
         *
         * tak si musím pomoct sám...
         * @param decimals pole Decimal objektů
         * @returns new Decimal, součet pole na vstupu
         */
        private calculateSum;
        private createGrid;
        private saveUsrSettings;
        private getUserSettingsOps;
        private setStatusText;
        private setGridRowErrors;
    }
}
declare namespace Gordic.Prefabs.Panels {
    function rapTemplate(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
    function tableTemplate(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
}
declare namespace Gordic.Prefabs.Panels {
    function kpiMultiRowTemplate(): {
        itemTemplate: (data: GKpiItemOptions) => JQuery<HTMLElement>;
    };
}
declare namespace Gordic.Prefabs.Panels {
    function kpiSimpleTemplate(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
}
declare namespace Gordic.Prefabs.Panels {
    function universalTemplate(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
    };
}
declare namespace Gordic.Prefabs.Panels {
    function rssTemplate(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
    function dashboardRssTemplate(): {
        itemTemplate: (data: Gordic.Gin.Interface.GDashboardRssDto) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
    function dashboardRssSimpleTemplate(): {
        itemTemplate: (data: Gordic.Gin.Interface.GDashboardRssDto) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
    /**
     *changelogRssTemplate - vblabla: Pomocny template pro zobrazeni prehledu zmen k revizi, ref T19704
     */
    function changelogRssTemplate(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
}
declare namespace Gordic.Prefabs.Panels {
    function trainingTemplate(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
}
declare namespace Gordic.Prefabs.Panels {
    /** 1. samostatná ikona **/
    function kpiSingleIconTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    /** 2. ikona a jeden řádek textu vedle sebe **/
    function kpiIconOneRowTextTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    /** 3. ikona a dva řádky textu pod sebou **/
    function kpiIconTwoRowsTextTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    /** 4. číslo a dva řadky textu **/
    function kpiValueTwoRowsTextTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    /**5. ikon, číslo a dva řádky textu **/
    function kpiIconValueTwoRowsTextTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    /** 6. číslo a text (vedle sebe) **/
    function kpiValueOneRowTextTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    /** 7. text a číslo (pod sebou) **/
    function kpiOneRowTextOneRowValueTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    function kpiOneRowTextOneRowValueRightAlignTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    /** 8. ikona se zvýrazněným textem a hodnotou pod sebou **/
    function kpiIconOneRowTextOneRowValueTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    /** 9. více řádků popis-hodnota **/
    function kpiMultiRowsTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    /**10. graf a dva řádky **/
    function kpiChartTwoRowsTextTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    /** 11. obecný template, který vykreslí vše **/
    function kpiNewMultiRowTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    /** 12. template pro zobrazení naposledy editovaných dokumentů **/
    function kpiLastModifiedDocumentsTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    function kpiImageTwoRowsTextTemplate(): {
        itemTemplate: (data: KpiTemplateData) => (JQuery<HTMLElement> | string);
        templateStructure: string[];
    };
    function createMultirowTemplate(data: any): JQuery<HTMLElement>;
}
declare class KpiTemplateData {
    /** ikona třeba gi-detail */
    icon?: string;
    /** Encodovat! Jde o HTML string */
    image?: string;
    /** Číselná hodnota */
    value?: string | number | Decimal;
    /** Encodovat! Jde o HTML string */
    primaryText?: string | JQuery<HTMLElement>;
    /** Encodovat! Jde o HTML string */
    secondaryText?: string | JQuery<HTMLElement>;
    formatter?: Gordic.Templates.Formatter;
    unit?: string;
    meaning?: Meaning | string;
    /** Encodovat! Jde o HTML string */
    settings?: string | JQuery<HTMLElement>;
    chart?: string;
    details?: Array<object>;
    visible?: boolean;
}
declare enum Meaning {
    success = "success",
    error = "error",
    info = "info",
    important = "important",
    warning = "warning",
    normal = "normal",
    positive = "positive",
    negative = "negative",
    purple = "purple",//pro Davida
    yellow = "yellow"
}
declare namespace Gordic.Prefabs.Panels {
    function adaCardTemplate(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
}
declare namespace Gordic.Prefabs.Panels {
    function slgModulesTemplate(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
    function slgModulesTemplate2(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
}
declare namespace Gordic.Prefabs.Panels {
    function dashboardMenuTemplate(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
    };
}
declare namespace Gordic.Prefabs.Panels {
    function userCardTemplate(): {
        itemTemplate: (data: any) => JQuery<HTMLElement>;
        templateStructure: string[];
    };
}
declare namespace Gordic.Prefabs.Select {
    interface IGSelectTimeOptions {
        /**
         * Krok minut v hodine v autocomplete.
         * @type {number}
         * @default 30
         */
        stepMinutes?: number;
    }
    interface IGSelectTimeDto {
        hour: number;
        minute: number;
    }
    function time(options?: IGSelectTimeOptions): GSelectBoxOptions<IGSelectTimeDto>;
}
declare namespace Gordic.Prefabs.Select {
    /**
     * Možnosti vlastního nastavení.
     */
    interface GPidReaderOptions {
        modalWindowTitle?: string;
    }
    /**
     * Objekt, který reader vrací.
     */
    interface GPidReaderResult {
        resultCode: string;
    }
    /**
     * Vlastnosti modálního okna.
     */
    interface ModalWindowOptions {
        multi?: boolean;
        title?: string;
    }
    /**
     *
     * @param prefabOptions
     * @returns
     */
    function pidReader(prefabOptions: Gordic.Data.Selectors.DefaultSelectorOptionsType<GPidReaderResult> & GPidReaderOptions): GSelectBoxOptions<GPidReaderResult>;
    /**
     * Třída contentu.
     */
    class GPidReader extends GContentBase implements IGClientContent {
        uid: string;
        logOptions: {
            name: string;
            fileName: string;
        };
        private $grid;
        private $codeReader;
        private $resultCodes;
        private $gridView;
        /**
         * Zobrazení contentu.
         * @param options
         */
        prepareContent(options: ModalWindowOptions): void;
        /**
         * Naformátování gridu, který zobrazuje začtené kódy.
         * @returns
         */
        private createGridFormat;
        /**
         * Volá se, když se zavírá okno.
         * @returns JQueryPromise<GPidReaderResult>
         */
        closing(): JQueryPromise<GPidReaderResult>;
    }
}
declare namespace Gordic.Gui.CustomViewDocumentation {
    /**
     * GeneratorGridColumnData
     *
     * @author  TFeik
     * @since   490.1.0.157
     * @date    12.07.2023
     */
    interface GeneratorGridColumnData {
        /**
         * name
         * @type {string}
         */
        name: string;
        /**
         * caption
         * @type {string}
         */
        caption: string;
        /**
         * description
         * @type {string}
         */
        description: string;
        /**
         * fragment
         * @type {string}
         */
        fragment: string;
    }
    /**
     * GeneratorFormFieldData
     *
     * @author  TFeik
     * @since   490.1.0.157
     * @date    12.07.2023
     */
    interface GeneratorFormFieldData {
        /**
         * name
         * @type {string}
         */
        name: string;
        /**
         * caption
         * @type {string}
         */
        caption: string;
        /**
         * description
         * @type {string}
         */
        description: string;
    }
    /**
     * GeneratorActionData
     *
     * @author  TFeik
     * @since   490.1.0.157
     * @date    12.07.2023
     */
    interface GeneratorActionData {
        /**
         * name
         * @type {string}
         */
        name: string;
        /**
         * caption
         * @type {string}
         */
        caption: string;
        /**
         * description
         * @type {string}
         */
        description: string;
    }
    /**
     * CreateGridColumnsDataInput
     *
     * @author  TFeik
     * @since   490.1.0.157
     * @date    12.07.2023
     */
    interface CreateGridColumnsDataInput {
        /**
         * gridFormat
         * @type {Data.GridFormat | undefined | null}
         */
        gridFormat: Data.GridFormat | undefined | null;
    }
    interface CreateFormFieldsDataInput {
        /**
         * forms
         * @type {Forms.Form[] | undefined | null}
         */
        forms: Forms.Form[] | undefined | null;
    }
    /**
     * CreateActionsDataInput
     *
     * @author  TFeik
     * @since   490.1.0.157
     * @date    12.07.2023
     */
    interface CreateActionsDataInput {
        /**
         * actions
         * @type {GAction[] | undefined | null}
         */
        actions: GAction[] | undefined | null;
    }
    /**
     * CreateMarkdownDescriptionInput
     *
     * @author  TFeik
     * @since   490.1.0.157
     * @date    12.07.2023
     */
    interface CreateMarkdownDescriptionInput extends CreateGridColumnsDataInput, CreateFormFieldsDataInput, CreateActionsDataInput {
        /**
         * (Default: true) Příznak, zda se má výsledek uložit do schránky.
         * @type {boolean}
         */
        copyToClipboard?: boolean | null;
    }
    /**
     * CreateMarkdownBoxInput
     *
     * @author  TFeik
     * @since   490.1.0.157
     * @date    12.07.2023
     */
    interface CreateMarkdownBoxInput {
        /**
         * header
         * @type {string}
         */
        header: string;
        /**
         * content
         * @type {string}
         */
        content: string;
    }
    /**
     * CreateMarkdownTableInput
     *
     * @author  TFeik
     * @since   490.1.0.157
     * @date    12.07.2023
     */
    interface CreateMarkdownTableInput {
        /**
         * columnNames
         * @type {string[]}
         */
        columnNames: string[];
        /**
         * dataRows
         * @type {string[][]}
         */
        dataRows: string[][];
    }
    /**
     * Generator
     *
     * @author  TFeik
     * @since   490.1.0.157
     * @date    12.07.2023
     */
    class Generator {
        /**
         * createGridColumnsData
         *
         * @author  TFeik
         * @date    11.07.2023
         *
         * @param {CreateGridColumnsDataInput} input
         * @returns {GeneratorGridColumnData[]}
         */
        static createGridColumnsData(input: CreateGridColumnsDataInput): GeneratorGridColumnData[];
        /**
          * createFormFieldsData
          *
          * @author  TFeik
          * @date    11.07.2023
          *
          * @param {CreateFormFieldsDataInput} input
          * @returns {GeneratorFormFieldData[]}
          */
        static createFormFieldsData(input: CreateFormFieldsDataInput): GeneratorFormFieldData[];
        /**
         * createActionsData
         *
         * @author  TFeik
         * @date    11.07.2023
         *
         * @param {CreateActionsDataInput} input
         * @returns {GeneratorActionData[]}
         */
        static createActionsData(input: CreateActionsDataInput): GeneratorActionData[];
        /**
         * CreateMarkdownRow
         *
         * @author  TFeik
         * @date    12.07.2023
         *
         * @param {string[]} texts
         * @returns {string}
         */
        static CreateMarkdownRow(texts: string[]): string;
        /**
         * CreateMarkdownHaderRow
         *
         * @author  TFeik
         * @date    12.07.2023
         *
         * @param {string[]} texts
         * @returns {string}
         */
        static CreateMarkdownHaderRow(texts: string[]): string;
        /**
         * CreateMarkdownTable
         *
         * @author  TFeik
         * @date    12.07.2023
         *
         * @param {CreateMarkdownTableInput} input
         * @returns {string}
         */
        static CreateMarkdownTable(input: CreateMarkdownTableInput): string;
        /**
         * CreateMarkdownGridColumnsDescription
         *
         * @author  TFeik
         * @date    12.07.2023
         *
         * @param {CreateGridColumnsDataInput} input
         * @returns {string}
         */
        static CreateMarkdownGridColumnsDescription(input: CreateGridColumnsDataInput): string;
        /**
         * CreateMarkdownFormFieldsDescription
         *
         * @author  TFeik
         * @date    12.07.2023
         *
         * @param {CreateFormFieldsDataInput} input
         * @returns {string}
         */
        static CreateMarkdownFormFieldsDescription(input: CreateFormFieldsDataInput): string;
        /**
         * CreateMarkdownActionsDescription
         *
         * @author  TFeik
         * @date    12.07.2023
         *
         * @param {CreateActionsDataInput} input
         * @returns {string}
         */
        static CreateMarkdownActionsDescription(input: CreateActionsDataInput): string;
        /**
         * CreateMarkdownDescription
         *
         * @author  TFeik
         * @date    12.07.2023
         *
         * @param {CreateMarkdownDescriptionInput} input
         * @returns {string}
         */
        static CreateMarkdownDescription(input: CreateMarkdownDescriptionInput): string;
        /**
         * CreateMarkdownBox
         *
         * @author  TFeik
         * @date    12.07.2023
         *
         * @param {CreateMarkdownBoxInput} input
         * @returns {string}
         */
        static CreateMarkdownBox(input: CreateMarkdownBoxInput): string;
        /**
         * Znak pro nový řádek.
         */
        static readonly NewLine = "\n";
    }
}
declare namespace Gordic.CustomView {
    /**
     * View<TDto>
     *
     * @author  TFeik
     * @since   484.1.0.613
     * @date    15.09.2020
     */
    export interface Source<TDto, TFilterDto = TDto, TPreviewId extends string = string> {
        /**
         * islTask
         * @type {Gordic.Isl._Task<Gordic.Isl.GServiceListRequest, Gordic.Isl.GServiceListResponse<TDto>>}
         */
        islTask: Gordic.Isl._Task<Gordic.Isl.GServiceListRequest, Gordic.Isl.GServiceListResponse<TDto>>;
        /**
         * gridFormat
         * @type {Data.GridFormat<TDto>}
         */
        gridFormat: Data.GridFormat<TDto> | ((content: GContentDlg<TDto, TFilterDto, TPreviewId>) => Data.GridFormat<TDto>);
        /**
         * Název výchozí akce pro grid.
         * @type {string | undefined}
         */
        gridDefaultActionName?: string | ((content: GContentDlg<TDto, TFilterDto, TPreviewId>) => string);
        /**
         * filter
         * @type {Forms.Form}
         */
        filter: Forms.Form[] | ((content: GContentDlg<TDto, TFilterDto, TPreviewId>) => Forms.Form[]);
        /**
         * actionList
         * @type {GActionList}
         */
        actionList: GActionList | ((content: GContentDlg<TDto, TFilterDto, TPreviewId>) => GActionList);
        /**
         * Dostupné náhledy pro zobrazení v sideBarech.
         * @type {CustomViewPreviewItemOptions<TDto>[]}
         */
        previewItems?: CustomViewPreviewItemOptions<TDto, TPreviewId>[] | ((content: GContentDlg<TDto, TFilterDto, TPreviewId>) => CustomViewPreviewItemOptions<TDto, TPreviewId>[]);
        /**
         * Funkce pro upravení gridformatu před vykreslením (napřkald pokud je nutné využít uživatelské nastavení).
         */
        updateGridFormat?: (gridformatOrigin: Data.GridFormat<TDto>, content: GContentDlg<TDto, TFilterDto, TPreviewId>) => JQuery.Promise<Data.GridFormat<TDto>>;
        /**
         * Funkce pro úpravu odpovědi načtení dat.
         * @type {(response: Isl.GServiceListResponse<TDto>) => Isl.GServiceListResponse<TDto> | undefined | null}
         */
        onListResponse?: (response: Isl.GServiceListResponse<TDto>, calledFrom: GContentCustomOnListResponseCalledFrom, content: GContentDlg<TDto, TFilterDto, TPreviewId>) => Isl.GServiceListResponse<TDto>;
        /**
         * Funkce která vytvoří filtry pro refresh vybraných řádků.
         * @type {(data: TDto[]) => TFilterDto | undefined | null}
         */
        createRefreshRowFilters?: (data: TDto[]) => TFilterDto | undefined | null;
        dtoKey?: Data.ViewKeys<TDto>;
        /**
         * Sources použití pro změnu přes subtasky.
         * @type {SourceChangeable<TDto, TFilterDto}
         */
        subtaskSources?: SourceChangeable<TDto, TFilterDto, TPreviewId>[];
        /**
         * Funkce pro možnost uprait akce dle
         *
         * @type {(data: TDto[]}
         * @default > void
         */
        updateActionsOnResponse?: (data: TDto[], actions: GActionList) => void;
        /**
         * Funkce pro možnost uprait akce dle
         *
         * @type {(data: TDto[]}
         * @default > void
         */
        updateActionsOnSelection?: (gridSelection: IGGridSelection<TDto>, actions: GActionList) => void;
        /**
         * Napstavení pro provázání akcí a oprávnění v dtočku.
         *
         * @type {ActionPermissionMapper<TDto>}
         */
        actionPermissionMapper?: ActionPermissionMapper<TDto>;
    }
    /**
     * SourceChangeable<TDto,
     *
     * @author  TFeik
     * @since   488.1.0.142
     * @date    13.04.2022
     */
    export interface SourceChangeable<TDto, TFilterDto, TPreviewId extends string> extends Partial<Pick<Source<TDto, TFilterDto, TPreviewId>, 'islTask' | 'gridFormat' | 'filter' | 'gridDefaultActionName' | 'updateGridFormat' | 'onListResponse'>> {
        id: string;
    }
    export interface CustomViewPreviewItemOptions<TDto, TPreviewId extends string = string> extends GPreviewItemOptions<TDto> {
        id: TPreviewId;
    }
    export interface ActionPermissionMapper<TDto> {
        /**
         * Jednotlivé položky objektů pro zjištění oprávnění akcí.
         * @type {ActionPermissionMapperItem<TDto>[]}
         */
        items: ActionPermissionMapperItem<TDto>[];
        /**
         * (default: AnyAvailable) Způsob vyhodncení permissions při vybrání více záznam.
         * @type {ActionPermissionMapperMode}
         */
        mode?: ActionPermissionMapperMode;
    }
    export interface ActionPermissionMapperItem<TDto> {
        /**
         * Název akcí využívající dané oprávnění.
         * @type {string[]}
         */
        actionNames: string[];
        /**
         * Fuknce pro vybrání oprávnění z dtočka.
         */
        getPermission: (dto: TDto) => General.ApplicationInterface.GPermission | undefined | null;
    }
    export enum ActionPermissionMapperMode {
        /**
         * Akce je aktivní jakmile je možná spustit pro jakýkoli z vybraných předmětů.
         */
        AnyAvailable = 0,
        /**
         * Akce je aktivní jakmile je možná spustit pro všechny z vybraných předmětů.
         */
        EveryAvailable = 1
    }
    export interface CustomViewSubtasksProfile<TDto, TFilterDto = TDto, TPreviewId extends string = string> {
        subtasks: CustomViewSubtask<TDto, TFilterDto, TPreviewId>[];
        /**
         * (default: 0) Index subtasku, který se má nastavit při otevření.
         * @type {number}
         */
        startSubtask?: number;
    }
    export interface CustomViewPreviewProfile<TPreviewId extends string = string> {
        bars: CustomViewPreviewBarProfile<TPreviewId>[];
    }
    export interface CustomViewPreviewBarProfile<TPreviewId extends string = string> extends Pick<Gordic.Previews.GPreviewControllerOptions, 'panelOptions' | 'customClass' | 'useSubtask' | 'activeItem' | 'disabledText'> {
        panelIds: TPreviewId[];
    }
    export interface CustomViewSubtask<TDto, TFilterDto = TDto, TPreviewId extends string = string> {
        /**
         * Id subtasku. Slouží pro idetifikaci subtasku v eventu zm2ny subtasku.
         * @type {string}
         */
        id?: string;
        /**
         * Text subtasku.
         * @type {string}
         */
        caption: string;
        /**
         * Filtr, který se použije při kliknutí na subtask (přebíjí i startingFilter v settings subtasku).
         * @type {TFilterDto}
         */
        filter?: TFilterDto;
        /**
         * (default: [true]) Příznak, zda se má po kliknutí na subtask automaticky vyhledat [true], nebo pouze nastavit do filtru bez vyhledání [false].
         * @type {boolean}
         */
        filterAutoSearch?: boolean;
        /**
         * Nastavení, které se použije při kliknutí na subtask.
         * @type {SettingsChangeable<TDto, TFilterDto}
         */
        settings?: SettingsChangeable<TDto, TFilterDto, TPreviewId>;
        /**
         * Id source z sourcesChangeable, které se použije při kliknutí na subtask.
         * @type {string}
         */
        sourceId?: string;
    }
    interface CustomViewSubtaskBase {
        id?: string;
        caption: string;
    }
    export interface CustomViewSubtaskFilter<TFilterDto> extends CustomViewSubtaskBase {
        filter: TFilterDto;
        /**
         * (default: [true]) Příznak, zda se má po kliknutí na subtask automaticky vyhledat [true], nebo pouze nastavit do filtru bez vyhledání [false].
         * @type {boolean}
         */
        autoSearch?: boolean;
    }
    export interface CustomViewSubtaskSettings<TDto, TFilterDto = TDto, TPreviewId extends string = string> extends CustomViewSubtaskBase {
        settings: SettingsChangeable<TDto, TFilterDto, TPreviewId>;
    }
    export interface CustomViewSubtaskSource extends CustomViewSubtaskBase {
        sourceId: string;
    }
    export interface FilterpanelProfileSettings<TFilterData = any> extends GFilterpanelProfile<TFilterData> {
        allowedFieldNames?: string[];
        /**
         * Místo startingFilter použijte hardFilter.
         * @deprecated Místo startingFilter použijte hardFilter.
         *
         * Filter, který má být použit pro prvotní vyhledání. Pokud není vyplněn, pak se při otevření úlohy nevyhledá.
         * Pokud chcete vyhledat při otevření úlohy a nenastavoat žádný filtr, pak nastavte prázdný objekt.
         *
         * @type {TFilterData}
         */
        startingFilter?: TFilterData;
        /**
         * Identifikátor pro userSettings filtepanelu. Slouží pro situaci, kdy chci mít více filterpanelů s různým uživatelským nastavením na jednom contentu.
         * @type {string}
         */
        userSettingsId?: string | false;
        /**
         * Dodatečné nastavení políček filtru.
         * @type {ObjectLiteral<{}
         */
        fieldExtraSettings?: ObjectLiteral<{
            /**
             * Příznak, zda je políčko povinné.
             * @type {boolean}
             */
            isRequired?: boolean;
            /**
             * Serverové filtry selectboxů, které lze použít pro odeslání požadavku na server.
             * @type {ObjectLiteral<any>}
             */
            serverFilters?: ObjectLiteral<any>;
            /**
             * Povolené hodnoty výběrového políčka.
             * @type {(string | number | undefined | null)[]}
             */
            allowedValues?: (string | number | undefined | null)[];
        }>;
    }
    export interface ActionsProfileSetting {
        allowedActionNames?: string[];
        /**
          * Nastavení menuBaru (menu nad contentem).
          * @type {MenuParams[]}
          */
        menuBar?: MenuParams[];
        /**
         * Nastavení commandBaru (menu dole pod contentem).
         * @type {MenuParams[]}
         */
        commandBar?: MenuParams[];
        /**
         * Nastavení statusBaru.
         * @type {MenuParams[]}
         */
        statusBar?: MenuParams[];
        /**
         * Nastavení kontextového menu gridu (po kliknutí pravým tlačítkem na řádek).
         * @type {MenuParams[]}
         */
        contextMenu?: MenuParams[];
    }
    export interface GridProfileSettings<TDto> extends Pick<GGridOptions<TDto>, 'customClass' | 'virtualCssClass' | 'name' | 'searchColumns' | 'rowHeight' | 'rowIndent' | 'renderMode' | 'renderOverhead' | 'columnMode' | 'navigationMode' | 'multi' | 'marking' | 'filtering' | 'profileVisible' | 'defaultProfile' | 'profiles' | 'showTopPanel' | 'showHeaderRow' | 'showBottomPanel' | 'emptyMessage' | 'rowsChecked' | 'multiMenu' | 'rowsClass'> {
        allowedColumnNames?: string[];
        /**
         * Identifikátor pro userSettings gridu. Slouží pro situaci, kdy chci mít více gridů s různým uživatelským nastavením na jednom contentu.
         * @type {string}
         */
        userSettingsId?: string | false;
    }
    export interface SettingsChangeable<TDto, TFilterDto = TDto, TPreviewId extends string = string> {
        actionsProfile?: ActionsProfileSetting;
        /**
         * Profil (nastavení) gridu.
         * @type {GridProfileSettings<TDto>}
         */
        gridProfile?: GridProfileSettings<TDto>;
        /**
         * Profil (nastavení) filtru a filterpanelu.
         * @type {FilterpanelProfileSettings<TFilterDto>}
         */
        filterProfile?: FilterpanelProfileSettings<TFilterDto>;
        /**
         * Nastavení zobrazení náhledů v sideBarech.
         * @type {CustomViewPreviewProfile}
         */
        previewProfile?: CustomViewPreviewProfile<TPreviewId>;
        /**
         * (default: true) Nastavení, zda se má po načtení dat dát focus na grid.
         * @type {boolean}
         */
        focusGridOnLoad?: boolean;
    }
    export interface SettingsBase<TDto, TFilterDto = TDto, TPreviewId extends string = string> extends SettingsChangeable<TDto, TFilterDto, TPreviewId> {
        /**
         * Id contentu (pro userSettings) končící znakem # (např "dokumentyKPredani#").
         * @type {string}
         */
        uid: string;
        /**
         * Titulek (uživatelský název) contentu.
         * @type {string}
         */
        title?: string;
        /**
         * Slouží pro označení aktuální akce v tasklistu.
         * @type {string}
         */
        taskId?: string;
        /**
         * Nastavení subtasků na contentu.
         *
         * @type {CustomViewSubtasksProfile<TDto, TFilterDto, TPreviewId>}
         */
        subtasksProfile?: CustomViewSubtasksProfile<TDto, TFilterDto, TPreviewId>;
    }
    export interface SettingsContent<TDto, TFilterDto = TDto, TPreviewId extends string = string> extends SettingsBase<TDto, TFilterDto, TPreviewId> {
    }
    export interface GContentInput<TDto, TFilterDto = TDto, TPreviewId extends string = string> {
        source: Source<TDto, TFilterDto, TPreviewId> | ((content: GContentDlg<TDto, TFilterDto, TPreviewId>) => JQuery.Promise<Source<TDto, TFilterDto, TPreviewId>>);
        settings?: SettingsContent<TDto, TFilterDto, TPreviewId>;
    }
    export interface GContentRetVal<TDto> {
        activeRow: TDto | undefined | null;
        selectedRows: TDto[] | undefined;
    }
    export interface IGContent<TDto, TFilterDto> {
        getSelectedRows(): TDto[];
        getActiveRow(): TDto | undefined;
        getGrid$(): JQuery<HTMLElement> | undefined;
        reloadContent: () => void;
        reCreateFilterAndGrid: (
        /**
         * (default: true) Příznak, zda se mají po vytvoření načíst data dle confirmed filtru.
         * @type {boolean}
         */
        reloadData: boolean) => void;
        /**
         * Vyvolá znovunačtení vybraných řádků.
         */
        refreshRows: (data: TDto[]) => void;
    }
    export type GContentCustom<TDto, TFilterDto> = GContent & IGContent<TDto, TFilterDto>;
    export type GContentCustomEvent = 'SubtaskChanged' | 'CustomPrepared';
    export type GContentCustomListeningEvent = 'RefreshRowRequest';
    export type GContentCustomOnListResponseCalledFrom = 'IslView' | 'RefreshRows';
    export interface GContentCustomSubtaskChangedArgs {
        /**
         * Id subtasku.
         * @type {string | undefined | null}
         */
        id: string | undefined | null;
    }
    export interface GContentCustomReadyArgs<TDto, TFilterDto> {
        content: Gordic.CustomView.GContentCustom<TDto, TFilterDto>;
        get$Grid: () => JQuery<HTMLElement> | undefined;
        get$Filterpanel: () => JQuery<HTMLElement> | undefined;
        getSelectedRows: () => TDto[];
        getActiveRow: () => TDto | undefined;
        reloadContent: () => void;
        reloadData: () => void;
        /**
         * Vyvolá znovunačtení vybraných řádků.
         */
        refreshRows: (data: TDto[]) => void;
    }
    export interface RefreshRowRequestEventData<TDto> {
        itemsToRefresh: TDto[] | undefined | null;
    }
    export function triggerRefreshRowRequest<TDto>(element: JQuery<HTMLElement>, items: TDto[] | undefined | null): void;
    /**
     * GContent
     *
     * @author  TFeik
     * @since   484.1.0.613
     * @date    15.09.2020
     */
    export class GContentDlg<TDto, TFilterDto = TDto, TPreviewId extends string = string> extends GContentBase implements IGClientContent, IGContent<TDto, TFilterDto> {
        private $Grid?;
        private $Filterpanel?;
        private $Subtasks?;
        private PreviewControllers?;
        private ContentInputSource?;
        private ContentInputSettings?;
        private IslView?;
        private LastFragments?;
        private readonly FlashMessageId;
        /**
         * prepareContent
         *
         * @param {GContentInput<TDto, TFilterDto> | undefined} input
         */
        prepareContent(input: GContentInput<TDto, TFilterDto, TPreviewId> | undefined): void;
        private triggerCustomReadyEvent;
        private triggerSubtaskChangedEvent;
        private triggerEvent;
        private registerEvents;
        private registerRefreshRowRequestEvent;
        /**
         * createMenuBars
         *
         * @author  TFeik
         * @date    11.04.2022
         *
         * @param {SettingsChangeable<TDto, TFilterDto} settings
         */
        private createMenuBars;
        /**
         * createMenu
         *
         * @author  TFeik
         * @date    11.04.2022
         *
         * @param {SettingsChangeable<TDto, TFilterDto} settings
         */
        private reCreateMenuBars;
        private createFilterAndGrid;
        reCreateFilterAndGrid(
        /**
         * (default: true) Příznak, zda se mají po vytvoření načíst data dle confirmed filtru.
         * @type {boolean}
         */
        reloadData?: boolean): JQuery.Promise<void>;
        private reCreateFilterAndGridInternal;
        getSelectedRows(): TDto[];
        getActiveRow(): TDto | undefined;
        getGrid$(): JQuery<HTMLElement> | undefined;
        get$Filterpanel(): JQuery<HTMLElement> | undefined;
        getIslView(): Gordic.Isl.View<TDto> | undefined;
        /**
         * Aktuální source. Aktuálně kvůli onListResponse, které je i v refreshRows, které nemá k dispozici source.
         * @type {Source<TDto, TFilterDto, TPreviewId>}
         */
        private SourceCurrent?;
        private adjustResponse;
        refreshRows(data: TDto[]): void;
        reloadContent(): JQuery.Promise<any>;
        reloadData(): void;
        private vybratAZavrit;
        private getReturnValue;
        private createActions;
        /**
         * createSubtaskActionName
         *
         * @author  TFeik
         * @date    11.04.2022
         *
         * @param {number} index
         * @returns {string}
         */
        private createSubtaskActionName;
        /**
         * createSubtasks
         *
         * @author  TFeik
         * @date    22.03.2021
         *
         * @param {CustomViewSubtask<TFilterDto>[]} settings
         * @returns {JQuery<HTMLElement>}
         */
        private createSubtasks;
        /**
         * reCreateSideBars
         *
         * @author  TFeik
         * @date    11.04.2022
         */
        private reCreateSideBars;
        /**
         * createSideBars
         *
         * @author  TFeik
         * @date    16.12.2021
         *
         * @param {GContentInput<TDto, TFilterDto>} input
         */
        private createSideBars;
        /**
         * Nastaví filter do filterpanelu.
         *
         * @author  TFeik
         * @date    22.03.2021
         *
         * @param {TFilterDto} filter
         * @returns {JQuery.Promise<undefined>}
         */
        private applyFilter;
        /**
         * Nastaví oprávnění k akcím.
         *
         * @author  TFeik
         * @date    19.05.2023
         *
         * @param {TDto[] | undefined | null} items
         */
        private applyActionPermission;
        /**
         * Shrne permissions všech vybraných objektů do jednoho.
         *
         * @author  TFeik
         * @date    19.05.2023
         *
         * @param {ActionPermissionMapperMode} mode
         * @param {(General.ApplicationInterface.GPermission | undefined | null)[] | undefined | null} permissions
         * @returns {General.ApplicationInterface.GPermission | undefined | null}
         */
        private getPermissionSummary;
    }
    export {};
}
declare namespace Gordic.Prefabs.Selectbox {
    /**
     * Zatím takový fejkový prefab operátorů pro filtry selectboxu (například na notIn - aktuálně je hodnota vždy in).
     *
     * @author  TFeik
     * @date    24.03.2021
     *
     * @returns {GSelectBoxOptionsMulti<TData>}
     */
    function withOperators<TData>(): GSelectBoxOptionsMulti<TData>;
}
declare namespace Gordic.Gui.Dialogs {
    /**
     * Vstupní paramet pro funkci buildDialog.
     *
     * @author  TFeik
     * @since   486.1.0.547
     */
    interface BuildDialogCustomSeznamInputParams<TDto, TFilterDto = TDto, TPreviewId extends string = string> {
        createSource: (customContentReadyArgs: JQuery.Promise<CustomView.GContentCustomReadyArgs<TDto, TFilterDto>>, content: GContent) => JQuery.Promise<CustomView.Source<TDto, TFilterDto, TPreviewId>>;
        settings: CustomView.SettingsContent<TDto, TFilterDto, TPreviewId>;
    }
    /**
     * Otevře dialog konfigurovatelného seznamu dle zadaných kritérií.
     *
     * @author  TFeik
     * @date    02.11.2021
     *
     * @param {BuildDialogCustomSeznamInputParams<TDto, TFilterDto>} input
     * @returns {JQuery.Promise<undefined}
     */
    function buildDialogCustomSeznam<TDto, TFilterDto = TDto, TPreviewId extends string = string>(input: OpenDialogParams<BuildDialogCustomSeznamInputParams<TDto, TFilterDto, TPreviewId>>): JQuery.Promise<CustomView.GContentRetVal<TDto> | undefined, OpenDialogRejectType | undefined>;
}
declare namespace Gordic.Widget {
    interface ICalendarEventsOpt {
        /** barva kalendáře */
        color?: string;
        /** aktivita kalendáře */
        active?: boolean;
        /** název kalendáře */
        name: string;
        /** data událostí */
        data: Gordic.General.ApplicationInterface.GGinsokaDto[];
        /** vlastní třída */
        customClass?: string;
        /** template události */
        itemTemplate?: (options: IEventItemTemplateOpt, 
        /** událost */
        event: Gordic.General.ApplicationInterface.GGinsokaDto) => IEventItemTemplateOpt;
    }
    interface ICalendarOpt {
        /**
         * MINIMÁLNÍ hodnota datumu v kalendáři
         * - formát: "1970-01" nebo "1970-01-01"
         **/
        minDate?: string;
        /**
         * MAXIMÁLNÍ hodnota datumu v kalendáři
         * - formát: "2030-12" nebo "2030-12-12"
         **/
        maxDate?: string;
        /** výchozí datum */
        initialDate?: Date;
        /** události do kalendáře */
        data?: ICalendarEventsOpt[];
        /** identifikátor kalendáře */
        id?: string;
        /** tlačítko pro novou událost */
        newEvent?: MenuParams;
        /** doplňkové tlačítka */
        buttons?: MenuParams[];
        /** atribut related se používá v kombinaci s default mode "inline" - v případě contentu nechat prázdný a použít klasickou metodu appendTo(element) */
        related?: JQuery<HTMLElement>;
        /** zobrazit kalendář včetně hodin */
        clock?: boolean;
        /**
         * kliknutí na událost v seznamu
         * @param {JQuery<HTMLElement>} element element události
         * @param {any} data vnitřní data události
         * @returns void
         */
        eventclick?(
        /** element události */
        element: JQuery<HTMLElement>, 
        /** vnitřní data události */
        data: Gordic.General.ApplicationInterface.GGinsokaDto, 
        /** element inline dialog */
        inlineDialog: JQuery<HTMLElement>): void;
        /**
         * mód zobrazení widgetu (default: inline) ->
         * - inline: tento mód se využívá v menu a otevírá se pomocí metody gcalendar("open")
         * - content: v tomto módě se kalendář uloží do elementu na který se kalendář napojí
         */
        mode?: "inline" | "content";
        /** widget kalendáře se zobrazí bez okrajů(border) - aplikuje se pouze v módu content (v inline nemá smysl)  */
        withoutBorder?: boolean;
        /** vlastní třída */
        customClass?: string;
        /** schovat tlačítko pro filtr zobrazených kalendářů */
        filterButton?: boolean;
    }
    interface IEventItemTemplateOpt {
        /**
         * [REQUIRED]
         * nadpis události
         **/
        title?: string | null;
        /**
         * [REQUIRED]
         * text události
         **/
        text?: string | null;
        /**
         * [REQUIRED]
         * datum začátku události
         **/
        dat_od?: string | Date | null;
        /**
         * [REQUIRED]
         * datum konce události
         **/
        dat_do?: string | Date | null;
        /**
         * [REQUIRED]
         * příznak celého dne
         **/
        cely_den?: number | null;
        /**
         * [ADDITIONAL PARAMETER]
         * barva události
         **/
        color?: string | "info" | "warning" | "error" | "important" | null;
        /**
         * [ADDITIONAL PARAMETER]
         * předaný datum jako text (není třeba vyplnit, vyplním sám dle hodnot výše)
         **/
        time?: string | null;
        /**
         * [ADDITIONAL PARAMETER]
         * další předaná data
         **/
        data?: any | null;
        /**
         * [ADDITIONAL PARAMETER]
         * skrýt datumovou část
         **/
        hideDateTime?: boolean | null;
    }
    /** gcalendar widget */
    class GCalendar extends JQueryWidget<ICalendarOpt> {
        static widgetName: string;
        /** objekt počtu událostí v kalendáři na každý den */
        private switchDate;
        private header;
        private heightClock;
        private height;
        /** aktuální datum */
        private currentDate;
        private eventList;
        private eventScrollbar;
        /** kalendáře */
        private calendars;
        private flatpickr;
        private flatpickrInstance;
        private nextDay;
        private prevDay;
        private nextDayFocusState;
        private prevDayFocusState;
        private opt;
        /** vytvořit widget gcalendar */
        protected _create(): void;
        /**
         * OBSOLETE metoda - tlačítka se přidávají přímo při vytváření kalendáře.
         * @deprecated OBSOLETE metoda - tlačítka se přidávají přímo při vytváření kalendáře.
         */
        addButton(): void;
        /** otevřít kalendář */
        open(): void;
        /** zavřít kalendář */
        close(): void;
        /** vyčištění kalendáře */
        clear(): void;
        /**
         * přidat událost do kalendáře
         *
         * @param {any} calendars vybrané kalendáře
         */
        addEvent(calendars: ICalendarEventsOpt[]): void;
        /** vrátí aktuálně vybrané datum v kalendáři */
        getDate(): Date;
        /**
         * [OBSOLETE] - použít getElement()
         * @deprecated [OBSOLETE] - použít getElement()
         *
         * */
        getInlineDlg(): JQuery<HTMLElement>;
        /** vrátí JQuery<HTMLElement> inline dialogu */
        getElement(): JQuery<HTMLElement>;
        private init;
        private createSwitchbar;
        private setActualDay;
        private getDayOfWeek;
        private setNewSelectedDate;
        private createMenubar;
        private main;
        private createInlineDialog;
        private setZIndexInlineDlg;
        private createFooter;
        private createHeader;
        private createClock;
        private setClock;
        private createDate;
        private setToday;
        private createFlatPickr;
        private onDayCreate;
        /**
         * vytvoř "ikony" teček na dni v kalendáři
         */
        private addEventDots;
        private initCurrentDate;
        /** nastavení tabindexů pro práci s klávesnicí */
        private onValueUpdateFlatpickr;
        private createEventComponent;
        private createCustomScrollbar;
        private showEvents;
        private initEvents;
        /** seřadit data událostí */
        private sortDates;
        private setTimeOfEvent;
        private setOneEvent;
        private setNoEvent;
        /**
         * nastavení kalendářů do global. promenné
         * @param calendars
         */
        private initCalendars;
        private setFiltersToCalendar;
        private calendarDayCounter;
        /**
         * sečíst počet událostí na každý den z vybraných kalendářů
         */
        private addNumberOfEventsPerDay;
        /**
         * sečti všechny události ze všech kalendářů
         */
        private countAllEventsFromAllCalendars;
        /**
         * změň formát datumu na formát (YYYY.MM.DD)
         * @param {Date} date vybrané datum
         * @returns vrací datum type {string}
         */
        private setSelectDateToValidStringFormat;
        private openFilter;
        private formFiltersElement;
        private filterModalWindow;
        /**
         * otevřít modální okno filtrů kalendářů
         */
        private openFilterModalWindow;
        /**
         * vytvoření filterpanelu pro vybrání konkrétního kalendáře
         */
        private createFilterPanel;
        /** nastavím filtry kalendáře */
        private setFilters;
        /** nastavit aktivitu pro vybraný kalendář */
        private setActivity;
        private createFilterWindowCommandBar;
        /**
         * nastavení automatického zavření na dialogu kalendáře
         * @param autoClose automatické zavření
         */
        private setAutoCloseToCalendar;
    }
}
interface JQuery {
    /** widget kalendáře */
    gcalendar(options?: Gordic.Widget.ICalendarOpt): JQuery;
    /**
    * Přidat událost
    * @param {"addEvent"} method přidat událost
    */
    gcalendar(method: "addEvent", calendars: Gordic.Widget.ICalendarEventsOpt[]): any;
    /** vrátí aktuálně vybrané datum v kalendáři */
    gcalendar(method: "getDate"): Date;
    /** vrátí JQuery<HTMLElement> inline dialogu */
    gcalendar(method: "getElement"): JQuery<HTMLElement>;
    /**
     * [OBSOLETE] - použít getElement()
     * @deprecated [OBSOLETE] - použít getElement()
     * @param method
     */
    gcalendar(method: "getInlineDlg"): JQuery<HTMLElement>;
    /**
     * 	otevřít kalendář
     * 	POZOR: Pouze na mód zobrazení "inline"
     */
    gcalendar(method: "open"): void;
    /**
     * 	zavřít kalendář
     * 	POZOR: Pouze na mód zobrazení "inline"
     */
    gcalendar(method: "close"): void;
    /** vyčistit kalendář */
    gcalendar(method: "clear"): void;
    /**
     * [OBSOLETE] - tlačítka se přidávají přímo při create kalendáře
     * @deprecated [OBSOLETE] - tlačítka se přidávají přímo při create kalendáře
     * přidat tlačítko
     * @param buttons {object[]} pole pro přidání jednoho nebo více tlačítek
     */
    gcalendar(method: "addButton", buttons: object[]): void;
}
declare namespace Gordic.GCalendar {
    /**
     * type pro metodu vlastní obsluhy notifikací
     */
    type NotificationType = (notifications: any[], eventsWithStatus: any[]) => void;
    /**
     * třída kalendáře Async obsluhující asynchronně notifikace
     */
    class Async {
        private ixs_fun;
        private cnt;
        constructor(ixs_fun?: string);
        /** notifikační timeout */
        private notificationTimeout;
        /** gcontent se servisní třídou */
        private gcontent;
        /** index událostí při jednom přihlášení */
        private NotIndex;
        /**
         * Metoda spustí asynchronní operaci, která běží nekonečně dlouho.
         * Ptá se na změny v DB a případně vrací seznam notifikací na události, které buď pošle
         * do notifikačního centra nebo si je uživatel obslouží sám.
         * @param {NotificationType} eventSendNotification? metoda pro vlastní obsluhu notifikací
         */
        runAsync(eventSendNotification?: NotificationType): void;
        private getListOfNotifications;
        /**
         * nalezení všech probíhajících async tasků a jejich zrušení
         *
         * @author thazmuka
         * @since 484.1.0.14
         */
        private cleanReturnNotificationAsyncTask;
        /** poslání notifikací k nově vytvořeným událostem
         * - pouze k důležitým! */
        private sendCreateEventNotification;
        /**
         * Metoda spustí operaci, která se ptá na změny v DB
         * a případně vrací seznam notifikací na události, které buď pošle
         * do notifikačního centra nebo si je uživatel obslouží sám.
         * @param {NotificationType} eventSendNotification? metoda pro vlastní obsluhu notifikací
         */
        run(eventSendNotification?: NotificationType): void;
        /**
         * vytvoření kolekce dat notifikací
         */
        private _collectNotification;
        /**
         * nastav datum avizace notifikace
         */
        private _setDatAvizace;
        /**
         * vyčisti timeout všech starých notifikací
         * @param {any[]} notificationTimeout pole notifikačních timeoutu
         */
        private _clearNotificationTimeout;
        private getDateNotification;
        /**
         * poslat notifikace
         * @param {any[]} notifications pole aktivních notifikací
         * @param {any[]} notificationTimeout pole s hodnotami aktivnich notifikačních timeoutu
         */
        private _sendNotifications;
        /**
         * zobrazení notifikací v notifikačním centru (typu potvrzení důležité události)
         *
         * @param {any[]} events
         */
        private _sendNotificationsOfEvents;
    }
}
declare namespace Gordic.GCalendar {
    /**
     * třída kalendáře obsluhující dialog formu notifikace v události
     */
    class GCalendarEventForms {
        /** vytvořit formulář pro notifikace */
        createNotificationField(): Forms.Form;
        /** vytvořit formulář pro políčko komu */
        createWhoField(): Forms.Form;
    }
}
declare namespace Gordic.GCalendar {
    /**
     * Google Calendar API
     *
     * @author thazmuka
     * @since 482.1.0.76
     */
    class GCalendarGoogleApi {
        constructor();
        /** vložení události do google kalendáře */
        InsertEvent(event: IGGoogleCalendarApiEvent): void;
        /** Autorizovat uživatele pro přidávání událostí do google kalendáře
         * - volat až po IsUserAuthorized() */
        Authorize(): JQuery.Promise<any, any, any>;
        /** Inicializace Google Calendar API */
        InitGoogleCalendarApi(): JQueryPromise<undefined>;
        /** Je uživatel autorizován?
         * - aby mohl eventuelně sync. události do svého kalendáře */
        IsUserAuthorized(): JQuery.Promise<any, any, any>;
    }
    /** interface události do google kalendáře */
    interface IGGoogleCalendarApiEvent {
        /** funkční místo, ale v textu, ne identifikátor */
        funk_misto: string;
        /** název události */
        nazev_udal: string;
        /** datum oznameni od */
        oznam_od: string;
        /** datum oznameni do */
        oznam_do: string;
        /** místo konání */
        misto_konani: string | null;
        /** poznámka (description) */
        poznamka: string | null;
        /** čas za jak dlouho před začátkem události bude uživatel upozorněn na události (mailem, notifikací v google) */
        pripomenuti_cas: number | null;
    }
}
declare namespace Gordic.Components.FilePreview {
    function initPdfJs(): JQueryPromise<any>;
    /**
     * Class representing error in file preview rendering
     */
    class GFilePreviewError {
        name?: string;
        file?: string;
        fileExtension?: string;
        fileName?: string;
        message?: string;
    }
    interface IGWopiRendererDisplayDTO {
        AccessToken: string;
        AccessTokenExpiration: number;
        Url: string;
    }
    interface IGBaseEngineOptions {
        test?: string;
    }
    interface IGPdfEngineOptions extends IGBaseEngineOptions {
        spreadMode?: GPdfEngineSpreadMode;
        scrollMode?: GPdfEngineScrollMode;
        zoomMode?: GPdfEngineZoomMode;
    }
    enum GPdfEngineSpreadMode {
        None = 0,//pdfjsViewer.SpreadMode.NONE
        Odd = 1,
        Even = 2
    }
    enum GPdfEngineScrollMode {
        Vertical = 0,//pdfjsViewer.ScrollMode.VERTICAL
        Horizontal = 1,
        Wrapped = 2
    }
    enum GPdfEngineZoomMode {
        Auto = "auto",
        Real = 1,
        Width = "page-width",
        Height = "page-height"
    }
    type IGEngineOptions = {
        [P in RenderingEngineEnum]?: P extends RenderingEngineEnum.pdfEngine ? IGPdfEngineOptions : IGBaseEngineOptions;
    };
    interface IGFilePreviewRenderer {
        /**
         * Display file preview on content area
         * @param {JQuery} contentArea
         * @param {any} data
         */
        display(contentArea: JQuery, data: any, common: IGRendererCommonOptions): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        getMenuBar(): JQueryPromise<MenuParams[]> | null;
        /**
         * Used when changing one renderer for another.
         */
        clear(): void;
        /**
         * Used when changing content inside same renderer.
         */
        clearContentArea(): void;
        /**
         * Complete destroy of renderer.
         */
        destroy(): void;
        getActiveEngineType?(): RenderingEngineEnum | null;
    }
    interface IGRendererCommonOptions {
        actions: GActionList;
        cancellationToken: GObservableObject<{
            isCancelled: boolean;
        }>;
        renderingEngineOverride?: RenderingEngineEnum;
        engineOptions: IGEngineOptions;
        userSettings?: Gordic.Data.IGStorage | null;
    }
    interface IGWebRendererEngine {
        init(contentArea: JQuery, common: IGRendererCommonOptions): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        getMenuBar(): JQueryPromise<MenuParams[]>;
        getCanvasDrawer(): CanvasDrawer.IGCanvasDrawer | null;
        render(data: string, mimeType: string | undefined | null, otherDataFormats: ObjectLiteral<any> | undefined | null, fileName: string, cancellationToken: GObservableObject<{
            isCancelled: boolean;
        }>, isBase64?: boolean): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        clear(): void;
        clearContentArea(): void;
        getEngineType(): RenderingEngineEnum | null;
    }
    enum RenderingEngineEnum {
        pdfEngine = "pdfEngine",
        imageEngine = "imageEngine",
        textEngine = "textEngine",
        isdocEngine = "isdocEngine",
        skFormEngine = "skFormEngine"
    }
    class Helpers {
        static upScale(scale: number): number;
        static downScale(scale: number): number;
        static favoriteMenuItem(action?: GAction): MenuParams | undefined;
        static oppositeFavoriteMenuItem(action?: GAction): MenuParams | undefined;
        static menuOnlyItem(action?: GAction): MenuParams | undefined;
        static menuOnlySeparator(): MenuParams;
    }
    /**
     * Gordic Renderer which renders files using js/html/css.
     * @author VMaca
     * @returns
     */
    class GWebRenderer implements IGFilePreviewRenderer {
        private _contentArea?;
        private _activeEngine?;
        private _engines?;
        private _currentDisplayPromise;
        private _isDestroyed;
        getMenuBar(): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any> | null;
        getCanvasDrawer(): CanvasDrawer.IGCanvasDrawer | null;
        getActiveEngineType(): RenderingEngineEnum | null;
        display(contentArea: JQuery, data: IGFilePreviewDataDto, common: IGRendererCommonOptions): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        private selectRenderingEngine;
        protected activateEngine(selectedEngine: IGWebRendererEngine, common: IGRendererCommonOptions): JQueryPromise<IGWebRendererEngine>;
        clearContentArea(): void;
        clear(): void;
        destroy(): void;
    }
    abstract class GBaseWebRendererEngine {
        protected _isInited: boolean;
        protected abstract _engineId: RenderingEngineEnum;
        protected _contentArea?: JQuery;
        protected _actions?: GActionList;
        protected _menuBar?: MenuParams[];
        protected _currentRenderingPromise?: JQueryPromise<undefined>;
        protected _common?: IGRendererCommonOptions;
        init(contentArea: JQuery, common: IGRendererCommonOptions): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        getMenuBar(): JQueryPromise<MenuParams[]>;
        getCanvasDrawer(): CanvasDrawer.IGCanvasDrawer | null;
        clearContentArea(): void;
        clear(): void;
        getEngineType(): RenderingEngineEnum;
    }
    /**
     * Engine for rendering PDF files
     * @author VMaca
     *
     * @param {JQuery} contentArea
     * @param {IGRendererCommonOptions} common
     * @returns
     */
    class GWebRendererPDFEngine extends GBaseWebRendererEngine implements IGWebRendererEngine {
        private static _globalInitPDFjs?;
        private _localInitPDFJs?;
        protected _engineId: RenderingEngineEnum;
        private _pdfViewer?;
        private _pdfWorker?;
        private _pdfEventBus?;
        private _pdfLinkService?;
        private _pdfFindController?;
        private _pdfZoomElement?;
        private _pdfPageInputElement?;
        private _pdfPageCountElement?;
        private _pdfSearchInput?;
        private _pdfCanvasHandler;
        private _searchBarElement?;
        private _lastViewerSpreadMode;
        private _lastViewerScrollMode;
        init(contentArea: JQuery, common: IGRendererCommonOptions): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        private _initPDFjs;
        private _getSpreadMode;
        private _getScrollMode;
        private _setDefaults;
        private _initControls;
        private _createPdfViewer;
        getCanvasDrawer(): CanvasDrawer.GCanvasMasterDrawer;
        private _initActions;
        private _initZoomElement;
        private _initPageInputBox;
        private _initMenuBar;
        private _initSearchBar;
        private _executePDFFind;
        render(data: string | undefined, mimeType: string | undefined | null, otherDataFormats: ObjectLiteral<any> | undefined | null, fileName: string, cancellationToken: GObservableObject<{
            isCancelled: boolean;
        }>, isBase64?: boolean): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        clearContentArea(): void;
        clear(): void;
    }
    class GWebRendererIsdocEngine extends GBaseWebRendererEngine implements IGWebRendererEngine {
        private _content?;
        protected _engineId: RenderingEngineEnum;
        init(contentArea: JQuery, common: IGRendererCommonOptions): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        render(data: string, mimeType: string | undefined | null, otherDataFormats: ObjectLiteral<any> | undefined | null, fileName: string, cancellationToken: GObservableObject<{
            isCancelled: boolean;
        }>, isBase64?: boolean): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        clear(): void;
        _initControls(): void;
        _initActions(common: IGRendererCommonOptions): void;
        _initMenuBar(common: IGRendererCommonOptions): void;
    }
    class GWebRendererSkFormEngine extends GBaseWebRendererEngine implements IGWebRendererEngine {
        private _content?;
        protected _engineId: RenderingEngineEnum;
        init(contentArea: JQuery, common: IGRendererCommonOptions): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        render(data: string, mimeType: string | undefined | null, otherDataFormats: ObjectLiteral<any> | undefined | null, fileName: string, cancellationToken: GObservableObject<{
            isCancelled: boolean;
        }>, isBase64?: boolean): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        clear(): void;
        _initControls(): void;
        _initActions(common: IGRendererCommonOptions): void;
        _initMenuBar(common: IGRendererCommonOptions): void;
    }
    class GWebRendererTextEngine extends GBaseWebRendererEngine implements IGWebRendererEngine {
        static supportedExtensions: string[];
        private _text?;
        private _scale;
        private _textZoomElement;
        protected _engineId: RenderingEngineEnum;
        init(contentArea: JQuery, common: IGRendererCommonOptions): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        render(data: string, mimeType: string | undefined | null, otherDataFormats: ObjectLiteral<any> | undefined | null, fileName: string, cancellationToken: GObservableObject<{
            isCancelled: boolean;
        }>, isBase64?: boolean): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        clear(): void;
        _initControls(): void;
        _initActions(common: IGRendererCommonOptions): void;
        _initMenuBar(common: IGRendererCommonOptions): void;
        _initZoomElement(): JQuery<HTMLElement>;
        _updateScale(): void;
    }
    class GWebRendererImageEngine extends GBaseWebRendererEngine implements IGWebRendererEngine {
        private _imageZoomElement?;
        private _rotation;
        private _zoom;
        private _scale;
        private _image?;
        private _sizeMeasured;
        private _realWidth;
        private _realHeight;
        protected _engineId: RenderingEngineEnum;
        init(contentArea: JQuery, common: IGRendererCommonOptions): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        _initActions(common: IGRendererCommonOptions): void;
        _rotate(): void;
        _initImageControl(): void;
        _initControls(): void;
        _initZoomElement(): JQuery<HTMLElement>;
        _updateDraggable(): void;
        _updateScale(): void;
        _updateZoom(): void;
        _initMenuBar(common: IGRendererCommonOptions): void;
        render(data: string, mimeType: string | undefined | null, otherDataFormats: ObjectLiteral<any> | undefined | null, fileName: string, cancellationToken: GObservableObject<{
            isCancelled: boolean;
        }>): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        clear(): void;
    }
    /**
     * Class for rendering files using WOPI protocol.
     * @author VMaca
     * @param {JQuery} contentArea
     * @param {IGWopiRendererDisplayDTO} data
     * @returns
     */
    class GWopiRenderer implements IGFilePreviewRenderer {
        private _contentArea?;
        private _officeForm?;
        private _officeFormAt?;
        private _officeFormAte?;
        private _officeFrame?;
        display(contentArea: JQuery, data: IGWopiRendererDisplayDTO): JQuery.Promise<undefined, GFilePreviewError, undefined>;
        getMenuBar(): null;
        private _createForm;
        private _createIFrame;
        private _submitForm;
        invokeAction(): void;
        clearContentArea(): void;
        clear(): void;
        destroy(): void;
    }
    /**
     * GPdfCanvasHandler
     *
     * @author Vlastimil Máca
     * @since 482.1.0.173
     */
    class GPdfCanvasHandler {
        private element;
        drawer: CanvasDrawer.GCanvasMasterDrawer;
        constructor(element: JQuery);
        destroy(): void;
    }
}
/**
 * IGBasePanelOptions
 *
 * @author Petr Horsák
 * @since 480.1.0.486
 */
interface IGBasePanelOptions<T = any> extends GBasePanelEvents {
    id?: string | null;
    data?: Gordic.Data.View<T> | T[];
    itemTemplate?: string | ((row: T) => (JQuery | HTMLElement | string | void));
    itemClassTemplate?: string | ((row: T) => string) | null;
    tooltipOptions?: string | Gordic.Widget.IGTooltipOptions | ((row: T) => Gordic.Widget.IGTooltipOptions) | null;
    defaultSelected?: boolean;
    fixedWidth?: boolean;
    width?: number;
    columnCount?: number;
    mode?: BasePanelMode | keyof typeof BasePanelMode;
    toolbar?: {
        top: (data: T) => MenuParams[] | GOmit<GButtonPanelOptions, "params">;
        bottom: (data: T) => MenuParams[] | GOmit<GButtonPanelOptions, "params">;
    } | any;
    toolbarOptions?: {
        top: GOmit<GButtonPanelOptions, "params">;
        bottom: GOmit<GButtonPanelOptions, "params">;
    } | any;
    toolbarOverlap?: {
        top: boolean;
        bottom: boolean;
    } | any;
    defaultAction?: GAction | null;
    sortable?: boolean;
    hoverEnabled?: boolean;
    toggleVisible?: boolean;
    userSettings?: Gordic.Data.IGStorage | null | undefined;
    disabledItems?: ((row: T) => void) | string[];
    emptyValueText?: string | null;
    commandBar?: MenuParams[] | null;
}
declare namespace Gordic.Widget {
    class GBasePanel<T extends IGBasePanelOptions<any> = IGBasePanelOptions> extends JQueryWidget<T, IGBasePanelOptions<any>> {
        static widgetName: string;
        flexContainer: JQuery;
        flexWrapper: JQuery;
        btnArrowUp: JQuery;
        btnArrowDown: JQuery;
        containerHeight: number;
        flexControls: JQuery;
        dataView: Gordic.Data.View<any>;
        selectedItemKey: string | undefined | null;
        hoverEnabled: boolean;
        protected _parentObserveDialog: null | JQuery;
        protected _observerParentDialogId: string;
        protected _observerParentWatcherId: string;
        private gStore;
        _setData(): void;
        refresh(): void;
        private buildGStore;
        private registerShortcuts;
        private setTabIndex;
        private findItemData;
        private addSelectionTrigger;
        private getOldRowKey;
        private getRowKey;
        private setOrderFromUserSettings;
        private renderAllItems;
        private createFlexItem;
        private setFlexItemEvents;
        private toggleSelectedItem;
        private scrollInto;
        private renderItemContent;
        private showArrows;
        getSelection(): any;
        getView(): Data.View<any>;
        getSelectedItem(): JQuery;
        activeItem(dataRow: any | MetaRow<any> | Primitive | null | undefined): void | any;
        protected _setOptions(opts: ObjectLiteral<any>): void;
        protected _create(): void;
        private _update;
        _destroy(): void;
        protected _getCreateOptions(): IGBasePanelOptions<any>;
    }
}
interface GBasePanelEvents {
    /**  Event is invoked on edit item. */
    selection?: GBasePanelEvent;
    itemrendered?: GBasePanelItemRenderedEvent;
    itemaction?: GBasePanelEvent;
}
interface GBasePanelEvent {
    /**
    * @param {JQueryEventObject} event Event
    */
    (event: JQueryEventObject, basePanelOptions: any): any;
}
interface GBasePanelItemRenderedEvent {
    /**
    * @param {JQueryEventObject} event Event
    */
    (event: JQueryEventObject, basePanelOptions: {
        data: ObjectLiteral<any>;
        item: JQuery;
    }): any;
}
declare enum BasePanelMode {
    panel = 0,
    inline = 1,
    favorites = 2,
    vertical = 3,
    feeds = 4,
    modules = 5,
    table = 6
}
interface JQuery {
    gbasepanel<T = any>(...options: (IGBasePanelOptions<T>)[]): JQuery;
    gbasepanel<T = any>(method: "getSelection"): T[];
    gbasepanel<T = any>(method: "getView"): Gordic.Data.View<T>;
    gbasepanel(method: "refresh"): JQuery;
    gbasepanel(method: "destroy"): JQuery;
    gbasepanel<T = any>(method: "activeItem", row: T | MetaRow<T> | null | undefined): void | any;
    gbasepanel<T = any>(method: "getSelectedItem"): JQuery;
    gbasepanel<T = any>(method: "option"): IGBasePanelOptions<T>;
    gbasepanel<T = any>(method: "option", values: Partial<IGBasePanelOptions<T>>): JQuery;
    gbasepanel<K extends Extract<keyof IGBasePanelOptions, string>, T = any>(method: "option", key: K): IGBasePanelOptions<T>[K];
    gbasepanel<K extends Extract<keyof IGBasePanelOptions, string>, T = any>(method: "option", key: K, value: Required<IGBasePanelOptions<T>>[K]): JQuery;
    gbasepanel(method: "instance"): Gordic.Widget.GBasePanel;
}
/**
 * IGCardPanelOptions
 *
 * @author Petr Horsák -> Vlastimil Máca
 * @since 480.1.0.486
 */
interface GCardPanelOptions extends IGBasePanelOptions, GCardPanelEvents {
    title?: string;
    editable?: boolean;
    itemEditable?: (item: any) => boolean;
    form?: Gordic.Forms.Form | JQuery;
    createTab?: boolean;
    newData?: any;
    dialogTitle?: string;
    dialogOptions?: GSimpleFormDialogOptions;
}
declare namespace Gordic.Widget {
    class GCardPanel extends GBasePanel<GCardPanelOptions> {
        static widgetName: string;
        static widgetCssClass: string;
        menu: MenuParams[];
        actions: GActionList;
        refresh(): void;
        protected _setOption(key: string, value: any): void;
        protected _create(): void;
        editItemForm(data: any, editable?: any): void;
        addData(def: any): void;
        updateData(def: any): void;
        private _removeItem;
        removeData(def: any): void;
        getMenuActions(items: any): MenuParams[];
        _newItemForm(): void;
        _destroy(): void;
    }
}
interface GCardPanelEvents extends GBasePanelEvents {
    /** Event is invoked on add item. */
    add?: GCardPanelEvent;
    /**  Event is invoked on edit item. */
    edit?: GCardPanelEvent;
    /**  Event is invoked on remove item. */
    remove?: GCardPanelEvent;
    /**  Event is invoked on remove item. */
    getMenuActions?: GCardPanelEvent;
}
interface GCardPanelEvent {
    /**
    * @param {JQueryEventObject} event Event
    */
    (event: JQueryEventObject, any: any): any;
}
interface JQuery {
    gcardpanel(options?: GCardPanelOptions): JQuery;
    gcardpanel(method: "refresh"): JQuery;
    gcardpanel(method: "destroy"): JQuery;
    gcardpanel(method: "items", items: GCardPanelOptions[] | GObservableObject<GCardPanelOptions>[]): JQuery;
    gcardpanel(method: "addData", def: JQueryPromise<any>): JQuery;
    gcardpanel(method: "updateData", def: JQueryPromise<any>): JQuery;
    gcardpanel(method: "removeData", def: JQueryPromise<any>): JQuery;
    gcardpanel(method: "option"): GCardPanelOptions;
    gcardpanel(method: "option", values: Partial<GCardPanelOptions>): JQuery;
    gcardpanel<K extends Extract<keyof GCardPanelOptions, string>>(method: "option", key: K): GCardPanelOptions[K];
    gcardpanel<K extends Extract<keyof GCardPanelOptions, string>>(method: "option", key: K, value: Required<GCardPanelOptions>[K]): JQuery;
    gcardpanel(method: "instance"): Gordic.Widget.GCardPanel;
}
/**
 * IGKpiPanelOptions
 *
 * @author Petr Horsák
 * @since 480.1.0.486
 */
interface GKpiPanelOptions<T = any> extends IGBasePanelOptions, GKpiPanelEvents {
    data?: any[] | Gordic.Data.View;
    /**
   * Element name
   * @default null
   *
   */
    name?: string;
    /**
     * Collection of KPI widgets
     * @default []
     *
     */
    items?: GKpiItemOptions[] | GObservableObject<GKpiItemOptions>[];
    /**
    * Display mode of KPI items
    * @default Carousel
    *
    */
    displayMode?: keyof typeof GKpiDisplayMode;
    /**
    * Enable user sorting using drag&drop
    * @default false
    *
    */
    sortable?: boolean;
    /**
    * Carousel scroll step
    * @default 100
    *
    */
    scrollStep?: number;
    /**
    * Custom style class
    * @default null
    *
    */
    customClass?: string;
    /**
    * Items size mode
    * @default small
    *
    */
    size?: keyof typeof GKpiSizeMode;
    /**
   * Item fixed width
   * @default false
   *
   */
    fixedWidth?: boolean;
    /**
   * Item width
   * @default 0
   *
   */
    width?: number;
}
interface GKpiItemOptions {
    /**
        * Element name
        * @default null
        *
        */
    name?: string;
    modifiedDate?: Date;
    settings?: GAction | any;
    actions?: GAction[] | any;
    more?: any;
    details?: any[];
    detailsDirection?: string;
    horizontalAlign?: string;
    /**
    * Main text
    * @default null
    *
    */
    primaryText?: string;
    /**
    * Secondary text
    * @default null
    *
    */
    secondaryText?: string;
    formatter?: string;
    /**
    * Data for chart visualization
    * @default null
    *
    */
    data?: any;
    /**
    * Data for chart visualization and information in description
    * @default null
    *
    */
    value?: number | Decimal | null | string;
    /**
    * Item size mode
    * @default small
    *
    */
    size?: GKpiSizeMode | keyof typeof GKpiSizeMode;
    /**
    * Item fixed width
    * @default false
    *
    */
    fixedWidth?: boolean;
    /**
    * Item width
    * @default false
    *
    */
    width?: number;
    /**
    * Chart border margin right
    * @default 0
    *
    */
    marginRight?: number;
    /**
    * Chart border margin top
    * @default 0
    *
    */
    marginTop?: number;
    /**
    * Chart border margin bottom
    * @default 0
    *
    */
    marginBottom?: number;
    /**
    * Chart border margin left
    * @default 0
    *
    */
    marginLeft?: number;
    /**
    * Set unit type
    * @default null
    *
    */
    unit?: string | null;
    /**
    * Chart visibility setting
    * @default true
    *
    */
    chartVisible?: boolean;
    /**
    * Chart type setting
    * @default bar
    *
    */
    chartType?: ChartType | keyof typeof ChartType | string;
    chart?: IGChartOptions | any;
    /**
    * Text position setting
    * @default left
    *
    */
    textPosition?: TextPositionType | keyof typeof TextPositionType;
    /**
   * Text visibility setting
   * @default true
   *
   */
    textVisible?: boolean;
    /**
   * Text align settings
   * @default left
   *
   */
    textAlign?: TextAlignType | keyof typeof TextAlignType;
    /**
   * Color text icon according to setting (positive - green, negative - red, neutral - black)
   * @default neutral
   *
   */
    meaning?: MeaningType | keyof typeof MeaningType;
    /**
    * Decimal value display setting
    * @default true
    *
    */
    isCurrency?: boolean;
    /**
    * Text icon display setting
    * @default true
    *
    */
    showTextIcon?: boolean;
    /**
    * Title text setting
    * @default true
    *
    */
    title?: string;
    /**
    * Title position setting
    * @default top
    *
    */
    titlePosition?: TitlePositionType | keyof typeof TitlePositionType;
    /**
   * Title text setting
   * @default null
   *
   */
    text?: string;
    /**
   * Action setting
   * @default null
   *
   */
    action?: GAction;
    /**
   * Setting action on title
   * @default true
   *
   */
    actionOnTitle?: boolean;
    /**
   * Custom class setting
   * @default true
   *
   */
    customClass?: string;
    /**
    * Tooltip value setting
    * @default null
    *
    */
    tooltip?: string | null;
    /**
    * Visibility setting
    * @default true
    *
    */
    visible?: boolean;
    /**
   * Loading owerlay visibility setting
   * @default true
   *
   */
    loading?: boolean;
    /**
   * Loading text setting
   * @default null
   *
   */
    loadingText?: string;
    /**
   * Chart legend setting
   * @default false
   *
   */
    displayLegend?: boolean;
    /**
   * Chart labels setting
   * @default false
   *
   */
    displayLabels?: boolean;
    /**
    * Custom item template setting
    * @default false
    *
    */
    itemTemplate?: any;
    /**
    * Icon setting
    * @default false
    *
    */
    icon?: string;
}
declare enum GKpiDisplayMode {
    carousel = 0,
    panel = 1
}
/**
    * Items size mode for KpiPanel
    * @default null
    *
    */
declare enum GKpiSizeMode {
    small = 0,
    normal = 1,
    big = 2,
    xl = 3
}
declare enum TextAlignType {
    left = 0,
    right = 1,
    center = 2
}
declare enum MeaningType {
    neutral = 0,
    positive = 1,
    negative = 2,
    info = 3
}
declare enum ChartType {
    bar = 0,
    pie = 1,
    line = 2,
    area = 3,
    liquid = 4,
    gauge = 5,
    gauge2 = 6,
    valueCard = 7
}
declare enum TextPositionType {
    left = 0,
    right = 1
}
declare enum TitlePositionType {
    left = 0,
    right = 1,
    top = 2
}
declare namespace Gordic.Widget {
    class GKpiPanel extends GBasePanel<GKpiPanelOptions> {
        static widgetName: string;
        static widgetCssClass: string;
        menu: any[];
        refresh(): void;
        protected _setOption(key: string, value: any): void;
        protected _create(): void;
        getItem(): any;
        _destroy(): void;
    }
}
interface GKpiPanelEvents extends GBasePanelEvents {
}
interface GKpiPanelEvent {
    /**
    * @param {JQueryEventObject} event Event
    */
    (event: JQueryEventObject, kpiPanelOptions: any): any;
}
interface JQuery {
    gkpipanel<T = any>(...options: (GKpiPanelOptions<T>)[]): JQuery;
    gkpipanel(method: "refresh"): JQuery;
    gkpipanel(method: "destroy"): JQuery;
    gkpipanel<T = any>(method: "getItem", row: T | MetaRow<T> | null | undefined): void | any;
    gkpipanel<T = any>(method: "getSelection"): T[];
    gkpipanel<T = any>(method: "activeItem", row: T | MetaRow<T> | null | undefined): void | any;
    gkpipanel<T = any>(method: "getView"): Gordic.Data.View<T>;
    gkpipanel(method: "option"): GKpiPanelOptions;
    gkpipanel(method: "option", values: Partial<GKpiPanelOptions>): JQuery;
    gkpipanel<K extends Extract<keyof GKpiPanelOptions, string>>(method: "option", key: K): GKpiPanelOptions[K];
    gkpipanel<K extends Extract<keyof GKpiPanelOptions, string>>(method: "option", key: K, value: Required<GKpiPanelOptions>[K]): JQuery;
}
/**
 * IGDashboardPanelOptions
 *
 * @author Petr Horsák
 * @since 482.1.0.486
 */
interface IGDashboardViewOptions<T = any> extends GDashboardPanelEvents {
    data?: T | null;
    columns?: IGDashboardColumnOptions[] | any | null;
    aggregation?: IGDashboardAggregationOptions | null;
    viewId?: string | null;
    panelId?: string | null;
    zoneId?: number | null;
    taskId?: string | null;
    ixsFun?: string | null;
    phase?: string | null;
    activity?: number | null;
    description?: string | null;
    templateId?: string | null;
    provider?: string | null;
    settingsForm?: string | null;
    itemTemplate?: string | null;
    mode?: string | number;
    dataSourceSettings?: any | null;
    settingsJson?: string | null;
    isMockup?: boolean | null;
    editable?: boolean;
    widgetType?: GDashboardWidgetType | string | null;
    widgetsOptions?: IGDashboardViewWidgetOptions;
    widgetSize?: {
        width?: number;
        height?: number;
    };
    gridUserSettings?: Object;
    name?: string | null;
    title?: string | null;
    taskName?: string | null;
    visible?: boolean;
    filters?: Array<object> | null;
    params?: Array<object> | null;
    paramsVisible?: boolean;
    customClass?: string | null;
    size?: GDashboardViewSize;
    width?: number | null;
    chart?: IGChartOptions | any | null;
    status?: GDashboardViewStatus;
    text?: IGDashboardTextOptions | null;
    menu?: MenuParams[] | null;
    actions?: GAction[] | any | null;
    actionService?: any | null;
    mappedParams?: any | null;
    displayTab?: boolean;
    porCislo?: number | null;
    drill?: IGDashboardDrill;
    navback?: (ev: JQueryEventObject) => void;
    beforeParamCreate?: (ev: JQuery.Event, ctx: IGDashboardViewBeforeParamContext) => void;
    userSettings?: Gordic.Data.IGStorage;
}
interface IGDashboardTextOptions {
    visible: boolean;
    value: string;
}
interface IGDashboardColumnOptions {
    name: string;
    caption: string;
    type: string;
    cellTemplate?: string;
    action?: GAction;
    attributes?: ObjectLiteral<string> | null;
    userActions?: IGDashboardActionArgs[] | null;
}
interface IGDashboardFilterOptions {
    name: string;
    caption?: string;
    value: string;
    editable?: boolean;
    visible?: boolean;
    operator?: string;
}
interface IGDashboardParamOptions {
    name: string;
    caption: string;
    value: string;
    editable: boolean;
    visible: boolean;
    isDial: boolean;
    dialName: string;
}
interface IGDashboardAggregationOptions {
    sourceColumn: string;
    primaryText: string;
    secondaryText: string;
    icon: string;
    itemTemplate: string;
    aggregFunc: GDashboardAggregFuncOptions;
}
interface IGDashboardViewWidgetOptions {
    ggrid?: GGridOptions<any>;
}
interface IGDashboardDrill {
    action: string;
    params: [];
    displayType: GDashboardDrillDisplayType;
}
interface IGDashboardActionArgs {
    name: string;
    icon: string;
    caption: string;
    captionVisible?: boolean;
    description?: string;
    params: ObjectLiteral<any>;
}
interface IGDashboardViewBeforeParamContext {
    param: IGDashboardFilter;
    widget?: IGDashboardViewBeforeParamCreateArgs;
}
interface IGDashboardViewBeforeParamCreateArgs<T = any> {
    fieldType: "gselectbox" | "gnumberbox" | "gstringbox" | "gdatebox";
    options: GFieldOptions<T>;
}
interface IGDashboardViewBeforeParamCreateSelectboxArgs<T = any> extends IGDashboardViewBeforeParamCreateArgs<T> {
    fieldType: "gselectbox";
    options: GSelectBoxOptions<T>;
}
declare enum GDashboardDrillDisplayType {
    view = "view",
    dialog = "dialog"
}
declare enum GDashboardAggregFuncOptions {
    avg = "avg",
    avgNN = "avgNN",
    avgDecimal = "avgDecimal",
    avgNNDecimal = "avgNNDecimal",
    count = "countNN",
    firstNN = "firstNN",
    first = "first",
    min = "min",
    minDecimal = "minDecimal",
    minDate = "minDate",
    max = "max",
    maxDate = "maxDate",
    maxDecimal = "maxDecimal",
    multi = "multi",
    sum = "sum",
    sumDecimal = "sumDecimal"
}
declare enum GDashboardWidgetType {
    grid = "grid",
    table = "table",
    panel = "panel",
    chart = "chart",
    article = "article",
    blog = "blog",
    map = "map",
    calendar = "calendar",
    custom = "custom",
    iframe = "iframe",
    treeGrid = "treeGrid",
    raw = "raw"
}
declare enum GDashboardViewStatus {
    neutral = "neutral",
    positive = "positive",
    negative = "negative",
    warning = "warning"
}
declare enum GDashboardViewSize {
    small = "small",
    normal = "normal",
    big = "big",
    xl = "xl"
}
declare namespace Gordic.Widget {
    class GDashboardView<T extends {}> extends JQueryWidget<T, IGDashboardViewOptions<any>> {
        static widgetName: string;
        static widgetCssClass: string;
        private viewContent;
        private subtasks;
        private container;
        private showErrorAct?;
        private stor?;
        protected _create(): void;
        _destroy(): void;
        refresh(): void;
        private renderViewContent;
        private toLowerCase;
        private hasChildNodes;
        private isJSON;
        private isPromise;
        private setupSqlView;
        private createContent;
        private createMisssingDataAlert;
        private aggregateData;
        createSectionMenu(data: any, container: any): void;
        private createMenu;
        private createArticle;
        private createBlog;
        private createMap;
        private createCalendar;
        private createCustom;
        private createIframe;
        private createChart;
        private createGrid;
        private createTreeGrid;
        private createRawData;
        private createTreeView;
        private treeGridFormat;
        private createDataRowAction;
        private createDrillAction;
        private getColumnsFromData;
        private createChunckArray;
        private prepareGridFormat;
        private createPanel;
        private createSearchMenuParams;
        private getPanelMode;
        private createTable;
        private createParams;
        private createFilters;
        private filterData;
        private setupPreloader;
        private preloaderShow;
        private preloaderHide;
        protected _setOptions(opts: ObjectLiteral<any>): void;
        protected _setOption(key: string, value: any): void;
        selected(sel?: boolean, silent?: boolean): void | boolean;
        protected _getCreateOptions(): IGDashboardViewOptions;
    }
}
interface GDashboarViewEvents {
    /**  Event is invoked on edit item. */
    edit?: GDashboardViewEvent;
    save?: GDashboardViewEvent;
}
interface GDashboardViewEvent {
    /**
    * @param {JQueryEventObject} event Event
    */
    (event: JQueryEventObject, dashboardPanelOptions: any): any;
}
interface JQuery {
    gdashboardview<T = any>(...options: (IGDashboardViewOptions<T>[])): JQuery;
    gdashboardview(method: "refresh"): JQuery;
    gdashboardview(method: "destroy"): JQuery;
    gdashboardview(method: "selected"): boolean;
    gdashboardview(method: "selected", sel: boolean, silent?: boolean): void;
    gdashboardview<T = any>(method: "option"): IGDashboardViewOptions<T>;
    gdashboardview<T = any>(method: "option", values: Partial<IGDashboardViewOptions<T>>): JQuery;
    gdashboardview<K extends Extract<keyof IGDashboardViewOptions, string>, T = any>(method: "option", key: K): IGDashboardViewOptions<T>[K];
    gdashboardview<K extends Extract<keyof IGDashboardViewOptions, string>, T = any>(method: "option", key: K, value: Required<IGDashboardViewOptions<T>>[K]): JQuery;
}
/**
 * IGDashboardPanelOptions
 *
 * @author Petr Horsák
 * @since 482.1.0.486
 */
interface IGDashboardOptions<T = IGDashboardViewOptions> extends GDashboardEvents {
    id?: string | null;
    title?: string | JQuery<HTMLElement>;
    displayTitle?: boolean;
    layout?: DashboardLayout | keyof typeof DashboardLayout;
    sortable?: boolean;
    userRole?: string;
    ixsFun?: string;
    editable?: boolean;
    isEditMode?: boolean;
    /**
     * panel - ex. panel se zobrazi, null = vychozi (dle dashboard.metabase.json), undefined = loadne prvni daneho uzivatele
     *
     * @type {GDashboardPanelDto | null}
     */
    panel?: GDashboardPanelDto | null;
    zones?: any;
    actions?: GActionList | null;
    actionsDataSource?: GAction[] | null;
    /**
     * Viditelnost zahlavi
     * @default true
     */
    headerVisible?: boolean;
}
type GDashboardPanelDto = Gordic.Gin.Interface.GDashboardPanelDto;
type GDashboardZoneDto = Gordic.Gin.Interface.GDashboardZoneDto;
type GDashboardViewDto = Gordic.Gin.Interface.GDashboardViewDto;
type GDashboardViewTemplateDto = Gordic.Gin.Interface.GDashboardViewTemplateDto;
type GDashboarUserRole = "reader" | "editor" | "admin";
/** Konfigurace v souboru dashboard.metabase.json */
interface IGDashboardJsonConfig {
    zones?: GZoneSettings[];
}
/** Konfigurace v db ve sloupci obsah_json */
interface IGDashboardSettingsJson {
    disabledDefaultViews?: string[];
    layout?: GZoneSettings[];
    disabledViewsResolved?: boolean;
}
declare namespace Gordic.Widget {
    class GDashboard<T extends {}> extends JQueryWidget<T, IGDashboardOptions<any>> {
        static widgetName: string;
        static widgetCssClass: string;
        tempDataView: Gordic.Data.View<IGDashboardViewOptions>;
        originalDataView: Gordic.Data.View;
        headerContainer: JQuery<HTMLElement>;
        mainContainer: JQuery<HTMLElement>;
        menuContainer: JQuery<HTMLElement>;
        menubar: any;
        headerZone: JQuery<HTMLElement>;
        hasBackground: boolean;
        logo: string;
        zonesWidths: GZoneWidth[];
        defaultViewsExist: boolean;
        protected _create(): void;
        private getContent;
        private formData;
        private createActionsList;
        refresh(): void;
        private addView;
        private createBackground;
        private createPanel;
        private prepareDefaultPanel;
        private createPanelContent;
        private createPanelHeader;
        private findStartAction;
        private resolveZonesWidths;
        private createPanelsMenu;
        private createContent;
        private createZones;
        private addZoneClickEvent;
        private createViews;
        private createGlobalFilters;
        private addFilterToGlobalFilters;
        private getView;
        editLayout(enabled: boolean): void;
        private setViewsEditable;
        changeZonesCount(zonesSettings: any): void;
        private createNewPanel;
        private changeZonesLayout;
        private updatePanelSettings;
        private setZoneHeight;
        private setZonesWidth;
        private removeClass;
        private _getFixedWidthZones;
        private _getWholeWidth;
        private saveIntoUserSettings;
        /**
         * Ulozi pozici jednotlivych view v jednotlivych zonach
         *
         * @param {JQuery | null} draggedView
         * @returns {JQueryPromise<void>}
         */
        private saveZoneViewLayout;
        private setElementDroppable;
        getSelection(): IGDashboardViewOptions<any> | null;
        getWidgetById(id: string): JQuery<HTMLElement> | null;
        protected _setOptions(opts: ObjectLiteral<any>): void;
        _destroy(): void;
        protected _getCreateOptions(): {
            id: null;
            layout: DashboardLayout;
            title: string;
            displayTitle: boolean;
            sortable: boolean;
            editable: boolean;
            zones: never[];
            panel: null;
            isEditMode: boolean;
            userRole: undefined;
            ixsFun: undefined;
            actions: null;
            actionsDataSource: GAction[];
            headerVisible: boolean;
        };
        private _isPanelEditable;
        private _configLoading;
        private _configLoaded;
    }
}
declare enum DashboardLayout {
    horizontal = 0,
    vertical = 1
}
interface GZoneSettings {
    Id?: string;
    zoneId?: number | null;
    width?: number | null;
    height?: number;
    title?: string | null;
    name?: string | null;
    action?: GAction;
    views?: IGDashboardViewOptions[] | null;
}
interface GZoneWidth {
    zoneId: number;
    width: number;
}
interface GDashboardEvents {
    /**  Event is invoked on edit item. */
    selection?: GDashboardEvent;
    zoneselection?: GDashboardEvent;
    edit?: GDashboardEvent;
    save?: GDashboardEvent;
    renderComplete?: GDashboardEvent;
    configLoading?: (event: JQuery.Event) => void;
    configLoaded?: (event: JQuery.Event) => void;
    beforeViewParamCreate?: (event: JQuery.Event, p: IGDashboardFilter) => IGDashboardViewBeforeParamCreateArgs | undefined;
}
interface GDashboardEvent {
    /**
    * @param {JQueryEventObject} event Event
    */
    (event: JQueryEventObject, dashboardPanelOptions: any): any;
}
interface JQuery {
    gdashboard<T = any>(...options: (IGDashboardOptions<T>)[]): JQuery;
    gdashboard(method: "refresh"): JQuery;
    gdashboard(method: "destroy"): JQuery;
    gdashboard(method: "getWidgetById", id: string): JQuery<HTMLElement>;
    gdashboard(method: "getSelection"): Array<IGDashboardOptions>;
    gdashboard<T = any>(method: "option"): IGDashboardOptions<T>;
    gdashboard<T = any>(method: "option", values: Partial<IGDashboardOptions<T>>): JQuery;
    gdashboard<K extends Extract<keyof IGDashboardOptions, string>, T = any>(method: "option", key: K): IGDashboardOptions<T>[K];
    gdashboard<K extends Extract<keyof IGDashboardOptions, string>, T = any>(method: "option", key: K, value: Required<IGDashboardOptions<T>>[K]): JQuery;
}
/**
 * IGDashboardPanelOptions
 *
 * @author Petr Horsák
 * @since 482.1.0.486
 */
interface IGDashboardAdminOptions<T = any> extends GDashboardAdminEvents {
    viewTemplates?: any[] | null;
    tasks?: any[] | null;
    actions?: GAction[] | null;
    sourceMenuParams?: MenuParams[] | null;
    menuParams: MenuParams[];
}
declare namespace Gordic.Widget {
    class GDashboardAdmin<T extends {}> extends JQueryWidget<T, IGDashboardAdminOptions<any>> {
        static widgetName: string;
        static widgetCssClass: string;
        private tasksGrid;
        private viewTemplatesGrid;
        private columnsGrid;
        private filtersGrid;
        private paramsGrid;
        private selectedViewTemplate;
        protected _create(): void;
        refresh(): void;
        private getAction;
        private createViewTemplatesTable;
        private createViewTemplatesSettingsForm;
        private createViewTemplateActionsList;
        private collectDataFromEditForm;
        private createViewRelations;
        private getDataColumns;
        private mapDataForm;
        private createDataSourceMenuParams;
        private createViewTemplateDialog;
        private applyViewTemplateDataToForm;
        private createTemplateSettingsDialog;
        private createDataPreviewForCustom;
        private createDataPreview;
        private getGridFormat;
        private isPromise;
        private createMapDataToTemplateForm;
        private createCommonSettingsForm;
        private createNewPanel;
        protected _setOptions(opts: ObjectLiteral<any>): void;
        private _update;
        _destroy(): void;
        protected _getCreateOptions(): {
            tasks: never[];
            viewTemplates: never[];
            actions: never[];
            sourceActions: never[];
            menuParams: never[];
        };
    }
}
interface GDashboardAdminEvents {
    /**  Event is invoked on edit item. */
    selection?: GDashboardadminEvent;
    zoneselection?: GDashboardadminEvent;
    edit?: GDashboardadminEvent;
    save?: GDashboardadminEvent;
}
interface GDashboardadminEvent {
    /**
    * @param {JQueryEventObject} event Event
    */
    (event: JQueryEventObject, dashboardPanelOptions: any): any;
}
interface JQuery {
    gdashboardadmin<T = any>(...options: (IGDashboardAdminOptions<T>)[]): JQuery;
    gdashboardadmin(method: "refresh"): JQuery;
    gdashboardadmin(method: "destroy"): JQuery;
    gdashboardadmin(method: "getSelection"): Array<IGDashboardAdminOptions>;
    gdashboardadmin(method: "addData", def: JQueryPromise<any>): JQuery;
    gdashboardadmin(method: "updateData", def: JQueryPromise<any>): JQuery;
    gdashboardadmin(method: "removeData", def: JQueryPromise<any>): JQuery;
    gdashboardadmin<T = any>(method: "option"): IGDashboardAdminOptions<T>;
    gdashboardadmin<T = any>(method: "option", values: Partial<IGDashboardAdminOptions<T>>): JQuery;
    gdashboardadmin<K extends Extract<keyof IGDashboardAdminOptions, string>, T = any>(method: "option", key: K): IGDashboardAdminOptions<T>[K];
    gdashboardadmin<K extends Extract<keyof IGDashboardAdminOptions, string>, T = any>(method: "option", key: K, value: Required<IGDashboardAdminOptions<T>>[K]): JQuery;
}
declare namespace Gordic.Gui.WebControls {
    class GDashboardAdminContent extends GContent implements IGClientContent {
        uid: string;
        title: string;
        private filterPanel;
        private view;
        private grid;
        prepareContent(): void;
        private invokeLoad;
        private loadData;
        private createAddActions;
    }
}
declare namespace Gordic.Gui.WebControls {
    class GDashboardPanelsContent extends GContentBase implements IGClientContent {
        uid: string;
        title: string;
        private filterPanel;
        private grid;
        private view;
        private rowToSelect?;
        prepareContent(): void;
        private createMenuBar;
        private createPanelDialog;
        private invokeLoad;
        private loadData;
    }
    interface IGDashboardPanelDetailsOptions {
        panel: Gordic.Gin.Interface.GDashboardPanelDto | null;
        role?: GDashboardRole;
        mode?: "full" | "shareOnly";
    }
    class GDashboardPanelDetails extends GContent implements IGClientContent {
        private isNewPanel;
        private options;
        prepareContent(options: IGDashboardPanelDetailsOptions): void;
        private loadData;
        private createForm;
    }
    interface GDashboardPreviewOptions {
        panelId: string;
    }
    class GDashboardPreview extends GContent implements IGClientContent {
        prepareContent(options: GDashboardPreviewOptions): void;
    }
}
/**
 * IGDashboardPanelOptions
 *
 * @author Petr Horsák
 * @since 482.1.0.486
 */
interface IGDashboardPanelOptions<T = any> extends IGBasePanelOptions, GDashboardPanelEvents {
    id?: string;
    title?: string;
    data?: Gordic.Data.View<T> | T[];
    layout?: DashboardPanelLayout | keyof typeof DashboardPanelLayout;
    sortable?: boolean;
    editable?: boolean;
    isEditMode?: boolean;
    zones?: number;
    zonesSettings?: Array<GZoneSettings>;
    isZone?: boolean;
    userSettings?: Gordic.Data.IGStorage | null | undefined;
    userSettingsName?: string | null;
    ignoreUserSettings?: boolean;
    actions?: GActionList;
}
declare namespace Gordic.Widget {
    class GDashboardPanel<T extends {}> extends JQueryWidget<T, IGDashboardPanelOptions<any>> {
        static widgetName: string;
        tempDataView: Gordic.Data.View;
        originalDataView: Gordic.Data.View;
        mainContent: JQuery<HTMLElement>;
        menubar: any;
        _setData(): void;
        private _setDataView;
        protected _create(): void;
        private createActionsList;
        showFlash(text: string, state: GState): void;
        refresh(): void;
        private registerActionOnZone;
        createPanelWidgets(data: any, container: any): void;
        editLayout(enabled: boolean): void;
        private setEventsOnElements;
        private toggleSelectedContainer;
        addNewZones(): void;
        private createNewPanel;
        private createNewZones;
        private createNewZone;
        private setZoneHeight;
        private setZonesWidth;
        private _getFixedWidthZones;
        private _getWholeWidth;
        private saveIntoUserSettings;
        private findDashboardPanelContent;
        private setElementDroppable;
        private setElementDraggable;
        createSectionMenu(data: any, title: any, container: any): void;
        private createSettingsDialog;
        addData(def: any): void;
        updateData(def: any): void;
        removeData(def: any): void;
        getSelection(): any;
        getWidgetById(id: string): JQuery<HTMLElement> | null;
        protected _setOptions(opts: ObjectLiteral<any>): void;
        private _update;
        _destroy(): void;
        protected _getCreateOptions(): {
            id: string;
            data: Data.View<any>;
            layout: DashboardPanelLayout;
            title: string;
            sortable: boolean;
            editable: boolean;
            zones: number;
            zonesSettings: never[];
            isZone: boolean;
            isEditMode: boolean;
            userSettings: null;
            ignoreUserSettings: boolean;
            userSettingsName: null;
            menuParams: MenuParams[];
        };
    }
}
interface GZoneSettings {
    id?: number;
    width?: number | null;
    height?: number;
    title?: string | null;
    action?: GAction;
}
declare enum DashboardPanelLayout {
    horizontal = 0,
    vertical = 1
}
interface GDashboardPanelEvents {
    /**  Event is invoked on edit item. */
    selection?: GDashboardPanelEvent;
    zoneselection?: GDashboardPanelEvent;
    edit?: GDashboardPanelEvent;
    save?: GDashboardPanelEvent;
}
interface GDashboardPanelEvent {
    /**
    * @param {JQueryEventObject} event Event
    */
    (event: JQueryEventObject, dashboardPanelOptions: any): any;
}
interface JQuery {
    gdashboardpanel<T = any>(...options: (IGDashboardPanelOptions<T>)[]): JQuery;
    gdashboardpanel(method: "refresh"): JQuery;
    gdashboardpanel(method: "destroy"): JQuery;
    gdashboardpanel(method: "showFlash", text: string, state: GState): void;
    gdashboardpanel(method: "getWidgetById", id: string): JQuery<HTMLElement>;
    gdashboardpanel(method: "getSelection"): Array<IGDashboardPanelOptions>;
    gdashboardpanel(method: "addData", def: JQueryPromise<any>): JQuery;
    gdashboardpanel(method: "updateData", def: JQueryPromise<any>): JQuery;
    gdashboardpanel(method: "removeData", def: JQueryPromise<any>): JQuery;
    gdashboardpanel<T = any>(method: "option"): IGDashboardPanelOptions<T>;
    gdashboardpanel<T = any>(method: "option", values: Partial<IGDashboardPanelOptions<T>>): JQuery;
    gdashboardpanel<K extends Extract<keyof IGDashboardPanelOptions, string>, T = any>(method: "option", key: K): IGDashboardPanelOptions<T>[K];
    gdashboardpanel<K extends Extract<keyof IGDashboardPanelOptions, string>, T = any>(method: "option", key: K, value: Required<IGDashboardPanelOptions<T>>[K]): JQuery;
}
declare namespace Gordic.Gui.WebControls {
    type GDashboardRole = "reader" | "editor" | "admin";
    interface IGDashboardContentOptions {
        /**
         * Role uzivatele. Vychozi = 'reader'
         * @type {"reader" | "editor" | "admin"}
         */
        userRole?: GDashboardRole;
        ixsFun?: string;
        /**
         * Dashboard, ktery se otevre jako vychozi
         * @type {string}
         */
        panelId?: string;
        /**
         * Aktualni faze
         * @type {string}
         */
        phase?: string;
        /**
         * Aktualni dbProfil
         * @type {string}
         */
        dbProfile?: string;
        /**
         * Vytvoreni URL pro panel (napr. pro moznost otevreni do nove zalozky)
         * @type {(p: Gordic.Gin.Interface.GDashboardPanelDto)}
         * @default > JQueryPromise<string>
         */
        panelUrl?: (p: Gordic.Gin.Interface.GDashboardPanelDto) => JQueryPromise<string>;
    }
    /**
     * Obecny content pro zobrazeni dashboardu.
     *
     * @author bmartinek
     * @since 52430.12
     */
    class GDashboardContent extends GContent implements IGClientContent {
        uid: string;
        protected options: IGDashboardContentOptions;
        protected subtasks: JQuery;
        protected dashboard: JQuery;
        prepareContent(options?: IGDashboardContentOptions): void;
        get role(): GDashboardRole;
        protected getData(): JQueryPromise<Gordic.Gin.Interface.GDashboardPanelDto[]>;
        protected prepareSubtasks(ps: Gordic.Gin.Interface.GDashboardPanelDto[]): MenuParams[];
        protected createSubtasks(mps: MenuParams[]): void;
        protected prepareDashboardOptions(panel?: Gordic.Gin.Interface.GDashboardPanelDto | null): IGDashboardOptions;
        protected createDashboard(o: IGDashboardOptions): void;
        protected addNewPanel(): JQueryPromise<Gordic.Gin.Interface.GDashboardPanelDto>;
        protected onDashboardEdit(isEditable: boolean): void;
    }
}
interface IGDashboardDataSource {
    readonly name: string;
    readonly caption: string;
    getData(o: any): JQueryPromise<any>;
    getMeta(o: any): JQueryPromise<IGProviderMetaData>;
}
interface IGProviderMetaData {
    columns?: IGDashboardColumnOptions[] | null;
    params?: IGDashboardFilter[] | null;
    chart?: IGChartOptions;
    widgetType?: string;
}
interface IGDashboardFilter {
    name: string;
    title?: string;
    disabled?: boolean;
    dataType: GDashboardFilterType;
    ipaDataType?: "nks";
    flags?: string[];
    caption: string;
    value: string;
    displayValue?: string;
    operator: string;
    enumValues?: [{
        value: string;
        text: string;
    }];
}
declare enum GDashboardFilterType {
    string = "string",
    number = "number",
    decimal = "decimal",
    date = "date",
    boolean = "boolean",
    enum = "enum"
}
declare namespace Gordic.Dashboard {
    interface IProviderManager<T extends IProvider> {
        register(p: T): void;
        find(name: string): T | null;
        all(): T[];
        clear(): void;
    }
    interface IProvider {
        getData(o: any): JQueryPromise<any>;
        getMeta(o: any): JQueryPromise<any>;
    }
    class ProviderManager implements IProviderManager<Provider> {
        private providers;
        register(provider: Provider): void;
        find(name: string): Provider | null;
        all(): Provider[];
        clear(): void;
    }
    const Providers: ProviderManager;
    class CustomProviderManager implements IProviderManager<CustomProvider> {
        private providers;
        register(provider: CustomProvider): void;
        find(name: string): CustomProvider | null;
        all(): CustomProvider[];
        clear(): void;
    }
    const CustomProviders: CustomProviderManager;
    abstract class ProviderFormSettings {
        abstract get form(): Gordic.Forms.Form | null;
        abstract get widgets(): GDashboardWidgetType[];
        protected configurationChanged(el: HTMLElement): void;
    }
    abstract class Provider implements IGDashboardDataSource, IProvider {
        readonly name: string;
        readonly caption: string;
        constructor(caption: string, name: string);
        abstract getData(o: any): JQueryPromise<any>;
        abstract getMeta(o: any): JQueryPromise<IGProviderMetaData>;
        protected _formSettings: ProviderFormSettings | null;
        get formSettings(): ProviderFormSettings | null;
        protected _allowNewTemplate: boolean;
        get allowNewTemplate(): boolean;
    }
    class SqlProvider extends Provider {
        constructor();
        getData(params: any): JQueryPromise<Gordic.Gin.Interface.GDashboardViewDto>;
        getMeta(o: {
            templateId?: string;
            viewId?: string;
        }): JQueryPromise<IGProviderMetaData>;
    }
    interface IGIslGetDataOptions {
        dataSourceSettings: IGIslDataSourceSettings;
    }
    interface IGIslDataSourceSettings {
        service: {
            name: string;
            method: string;
            params?: any;
            fragments?: string[];
        };
    }
    interface IGProviderMetaDataIsl extends IGProviderMetaData {
        interfaceType: string;
        serviceName: string;
    }
    class IslProvider extends Provider {
        constructor();
        getData(o: IGIslGetDataOptions): JQueryPromise<any>;
        getMeta(o: IGIslGetDataOptions): JQueryPromise<IGProviderMetaDataIsl>;
    }
    interface IGRssGetDataOptions {
        dataSourceSettings: IGRssDataSourceSettings;
    }
    interface IGRssDataSourceSettings {
        rss: {
            sources?: IGRssSource[];
        };
    }
    interface IGRssSource {
        name: string;
        url: string;
        utm?: string;
        categories?: string[];
        maxCount?: number;
        searchEnabled?: boolean;
    }
    class RssProvider extends Provider {
        constructor();
        getData(o: IGRssGetDataOptions): JQueryPromise<Gordic.Gin.Interface.GDashboardRssDto[]>;
        private _initPromise;
        private _init;
        private _get;
        getMeta(o: IGRssGetDataOptions): JQueryPromise<IGProviderMetaData>;
    }
    class RestProvider extends Provider {
        constructor();
        getData(o: {
            dataSourceSettings: {
                url: string;
                section: string;
            };
        }): JQueryPromise<any>;
        getMeta(o: IGDummyProviderMetaOptions): JQueryPromise<IGProviderMetaData>;
    }
    class XrgServiceProvider extends Provider {
        constructor();
        getData(o: any): JQueryPromise<any>;
        getMeta(o: any): JQueryPromise<IGProviderMetaData>;
    }
    class BlogProvider extends Provider {
        constructor();
        getData(o: {
            dataSourceSettings?: {
                fragments?: string[];
            };
        }): JQueryPromise<any>;
        getMeta(o: any): JQueryPromise<IGProviderMetaData>;
    }
    class ArticleProvider extends Provider {
        constructor();
        getData(o: {
            dataSourceSettings: {
                editable: boolean;
                modified: JsonDate;
                content: string;
            };
        }): JQueryPromise<any>;
        getMeta(o: any): JQueryPromise<IGProviderMetaData>;
    }
    interface IGDummyProviderMetaOptions {
        columns?: IGDashboardColumnOptions[];
    }
    interface IGFileProviderMetaOptions extends IGDummyProviderMetaOptions {
        templateId?: string;
        columns?: IGDashboardColumnOptions[];
        dataSourceSettings: {
            fileContent: string;
        };
    }
    interface IGFileProviderDataOptions {
        templateId?: string;
        viewId?: string;
        taskId?: string;
        dataSourceSettings?: {
            fileContent: string;
        };
    }
    class FileProvider extends Provider {
        constructor();
        getData(o: IGFileProviderDataOptions): JQueryPromise<any>;
        getMeta(o: IGFileProviderMetaOptions): JQueryPromise<IGProviderMetaData>;
    }
    class FileProviderFormSettings extends ProviderFormSettings {
        get widgets(): GDashboardWidgetType[];
        get form(): Gordic.Forms.Form | null;
    }
    interface IGCustomProviderOptions {
        caption: string;
        name: string;
        data: () => JQueryPromise<any> | JQuery;
        config?: ProviderFormSettings;
        menu?: MenuParams[];
    }
    class CustomProvider implements IGDashboardDataSource, IProvider {
        readonly name: string;
        readonly caption: string;
        menu?: MenuParams[];
        private _data;
        constructor(options: IGCustomProviderOptions);
        constructor(caption: string, name: string, data: () => JQueryPromise<any> | JQuery, config?: ProviderFormSettings);
        getData(o: any): JQueryPromise<any>;
        getMeta(o: any): JQueryPromise<any>;
        protected _formSettings: ProviderFormSettings | null;
        get formSettings(): ProviderFormSettings | null;
    }
}
declare namespace Gordic.Dashboard {
    interface IGDashboardAction {
        /** Vychozi nazev */
        name: string;
        /** Uzivatelsky popisek */
        caption: string;
        /** MetaInfo k akci (parametrum) */
        meta: {
            params: ObjectLiteral<IGDashboardActionParam>;
        };
        run: (ev: JQuery.TriggeredEvent, params: ObjectLiteral<any>) => void;
    }
    interface IGDashboardActionNamed extends IGDashboardAction {
        name: string;
    }
    interface IGDashboardActionParam {
        caption: string;
        description?: string;
        template?: string | null;
        defaultValue?: any;
        visible?: boolean;
    }
    class GDashboardActionManager {
        private _actions;
        constructor(copy?: GDashboardActionManager);
        register(action: IGDashboardAction): void;
        register(name: string, action: IGDashboardAction): void;
        unregister(name: string): void;
        get(name: string): IGDashboardAction | null;
        getAll(): IGDashboardActionNamed[];
    }
    const DashboardActionManager: GDashboardActionManager;
}
declare namespace Gordic.Dashboard {
    class WidgetConfigForms {
        static forms: Object;
        constructor();
        static findAll(): Object;
        static clear(): void;
    }
    class WidgetConfigForm {
        widgetName: string;
        columns: any;
        form: Gordic.Forms.Form;
        create(selectedViewTemplate: any): Forms.Form;
        getColumnsFromData(data: any): JQuery.Promise<any, any, any>;
        getDataColumns(data: any): any[];
    }
    class AggregationConfigForm extends WidgetConfigForm {
        create(columns: any): Forms.Form;
    }
    class PanelConfigForm extends WidgetConfigForm {
        create(): Gordic.Forms.Form;
    }
    interface IGChartSettings {
        chartType?: string;
        width?: number;
        height?: number;
        marginTop?: number;
        marginLeft?: number;
        marginBottom?: number;
        responsive?: boolean;
    }
    interface IGChartAxisConfig extends IGChartSettings {
        xPropName?: string;
        yPropName?: string;
        displayLabels?: boolean;
        xAxis?: string;
        yAxis?: string;
    }
    class ChartConfigForm extends WidgetConfigForm {
        create(columns: GGridColumn[]): Gordic.Forms.Form;
        private createAxisSettingsForm;
    }
    class DataColumnsGrid {
        create(columns: GGridColumn[], container: JQuery): void;
    }
    class DataFiltersGrid {
        create(filters: any, container: any): void;
    }
    class DataParamsGrid {
        create(params: any, container: any, title: any): void;
    }
}
declare namespace Gordic.Gui.WebControls {
    interface IGDashboardViewSettings {
        mode?: GDashboardViewSettingsMode;
        viewId?: string | null;
        panelId: string | null;
        phase: string | null;
        zoneId: number | null;
        porCislo: number | null;
        ixsFun: string | null;
        activity?: number;
        provider?: Gordic.Dashboard.Provider | Gordic.Dashboard.CustomProvider;
        templateId?: string;
    }
    type GDashboardViewSettingsMode = "fromTemplate" | //Vytvori pohled ze sablony, vytvori pohled a vlozi jej do dashboardu
    "addExisting" | //Vlozi existujici pohled do dahboardu
    "editExisting" | //Editace existujiciho pohledu v dashboardu
    "newTemplate" | //Zalozeni nove sablony
    "editTemplate" | //Editace sablony
    "editView" | //Editace pohledu (nezavisle vlozeni do dashboardu)
    "createView";
    class GDashboardViewSettings extends GContent implements IGClientContent {
        private _preview;
        private _dataPreview;
        private _input;
        private _columns?;
        private get _mode();
        prepareContent(data: IGDashboardViewSettings): void;
        private _getTitle;
        private _initialLoad;
        private _initialLoadView;
        private _initialLoadFromTemplate;
        private _initialLoadNewTemplate;
        private _initialLoadTemplate;
        /** Nacteni pohledu (nezavisle na dashboardu) z ipasupo */
        private _initialLoadTaskView;
        private _initialLoadNewTaskView;
        private _createForm;
        private _applyFormValues;
        private _getProviderFormSettings;
        private _dsMetaChanged;
        private _updateFormVisibilityByWidgetType;
        private _updateFormsVisibilityByMode;
        private _prepareFormOptions;
        private _collectViewOptions;
        private _createHelpContext;
        private _createPreview;
        private _save;
        /** Ulozeni pohledu (nezavisle na dashboardu) do ipasupo */
        private _saveTaskView;
        private _saveNewView;
        private _saveExistingView;
        private _saveNewTemplate;
        private _saveExistingTemplate;
    }
    class GDashboardViewUtils {
        /**  Oreze nepotrebne udaje z parametru na objekt klic:hodnota */
        private static trimParams;
        /** Oreze vlastnosti sloupcu jen na potrebne minimum */
        private static trimColumns;
        static convertColumns(cols?: Gordic.Gin.Interface.GDashboardDataColumnDto[] | null): IGDashboardColumnOptions[];
        private static convertColumn;
        static prepareDataSourceSettingsJson(o: IGDashboardViewOptions<any>): string;
        static prepareViewInTaskSettingsJson(o: IGDashboardViewOptions<any>): string;
        static prepareViewInZoneSettingsJson(o: IGDashboardViewOptions<any>): string;
        static prepareViewOptions(v: Gordic.Gin.Interface.GDashboardViewDto): IGDashboardViewOptions<any>;
        static prepareViewOptionsWithData(v: Gordic.Gin.Interface.GDashboardViewDto, providerOptions?: ObjectLiteral<any>): IGDashboardViewOptions<any>;
        private static prepareViewData;
    }
}
declare namespace Gordic.Gui.WebControls {
    interface IGDashboardViewsContentOptions {
        phase?: string;
        ixsFun?: string;
    }
    class GDashboardViewsContent extends GContent implements IGClientContent {
        uid: string;
        title: string;
        private filterPanel;
        private view;
        private grid;
        prepareContent(options?: IGDashboardViewsContentOptions): void;
        private loadData;
        private _showAddNewTaskDialog;
    }
}
declare namespace Gordic.Widget {
    interface IGDashboard2Options {
        editable?: boolean;
        activeZone?: number | null;
        /** id aktivniho pohledu */
        activeView?: string | null;
        /**
         * Callback na vytvoreni vlastniho view a vraceni jeho elementu (musi byt podedeny od gdashboard2view).
         * @type {((options: IGDashboard2ViewOptions)}
         */
        createView?: ((options: IGDashboard2ViewOptions) => JQuery | void);
        /** Zmenilo se rozlozeni panelu (napr. presunuti pohledu, apod.) */
        layoutChanged?: ((ev: JQuery.Event, panel: IGDashboard2PanelOptions) => void);
    }
    interface IGDashboard2PanelOptions {
        zones?: IGDashboard2ZoneOptions[];
    }
    interface IGDashboard2ZoneOptions {
        views?: IGDashboard2ViewOptions[];
        width?: number;
    }
    interface IGDashboard2ViewOptionsExt extends IGDashboard2ViewOptions {
        /** Id pro manipulaci na dashboardu */
        id: string;
    }
    class GDashboard2 extends JQueryWidget<IGDashboard2Options> {
        static widgetName: string;
        private _zones;
        protected _create(): void;
        protected _destroy(): void;
        protected _setOption(key: string, value: any): void;
        protected _getCreateOptions(): IGDashboard2Options;
        private _createZone;
        private _createView;
        private _resolveZoneWidthClasses;
        private _layoutEditable;
        private _activateZone;
        private _activateView;
        private _getActualLayout;
        private _findView;
        getViewIdByElement(e: JQuery): string | null;
        setViewOption<K extends Extract<keyof Gordic.Widget.IGDashboard2ViewOptions, string>>(id: string, option: K, value: Required<Gordic.Widget.IGDashboard2ViewOptions>[K]): void;
        getViewOption<K extends Extract<keyof Gordic.Widget.IGDashboard2ViewOptions, string>>(id: string, option: K): Required<Gordic.Widget.IGDashboard2ViewOptions>[K] | undefined;
        /** Kompletni znovuvytvoreni view */
        refreshView(options: IGDashboard2ViewOptionsExt): void;
        /** Reload dat view */
        reloadView(id: string): void;
        createPanel(panel: IGDashboard2PanelOptions): void;
        getPanel(): IGDashboard2PanelOptions;
        cleanPanel(): void;
        addZone(zone: IGDashboard2ZoneOptions): number;
        removeZone(zoneId: number): void;
        addView(zoneId: number, view: IGDashboard2ViewOptionsExt): void;
        insertViewAfter(idAfter: string, view: IGDashboard2ViewOptionsExt): void;
        removeView(id: string): void;
    }
}
interface JQuery {
    gdashboard2(options?: Gordic.Widget.IGDashboard2Options): JQuery;
    gdashboard2(method: "destroy"): JQuery;
    gdashboard2(method: "createPanel", panel: Gordic.Widget.IGDashboard2PanelOptions): JQuery;
    /** Vrati panel z aktualniho rozlozeni pohledu na dashboardu */
    gdashboard2(method: "getPanel"): Gordic.Widget.IGDashboard2PanelOptions;
    gdashboard2(method: "cleanPanel"): JQuery;
    gdashboard2(method: "addZone", zone: Gordic.Widget.IGDashboard2ZoneOptions): number;
    gdashboard2(method: "addView", zoneId: number, view: Gordic.Widget.IGDashboard2ViewOptionsExt): JQuery;
    gdashboard2(method: "removeView", id: string): JQuery;
    gdashboard2(method: "insertViewAfter", idAfter: string, view: Gordic.Widget.IGDashboard2ViewOptionsExt): JQuery;
    gdashboard2(method: "refreshView", options: Gordic.Widget.IGDashboard2ViewOptionsExt): JQuery;
    gdashboard2(method: "reloadView", id: string): JQuery;
    gdashboard2(method: "getViewIdByElement", e: JQuery): string | null;
    gdashboard2<K extends Extract<keyof Gordic.Widget.IGDashboard2Options, string>>(method: "option", option: K, value: Required<Gordic.Widget.IGDashboard2Options>[K]): JQuery;
    gdashboard2<K extends Extract<keyof Gordic.Widget.IGDashboard2Options, string>>(method: "option", option: K): Required<Gordic.Widget.IGDashboard2Options>[K];
    gdashboard2<K extends Extract<keyof Gordic.Widget.IGDashboard2ViewOptions, string>>(method: "setViewOption", id: string, option: K | string, value: Required<Gordic.Widget.IGDashboard2ViewOptions>[K]): JQuery;
    gdashboard2<K extends Extract<keyof Gordic.Widget.IGDashboard2ViewOptions, string>>(method: "getViewOption", id: string, option: K | string): Required<Gordic.Widget.IGDashboard2ViewOptions>[K];
}
declare namespace Gordic.Widget {
    interface IGDashboard2ViewOptions<TData = any> extends JQueryUI.WidgetOptions {
        type: string;
        data?: TData | JQueryPromise<TData> | null;
        title?: string | null;
        description?: string | null;
        menu?: MenuParams[];
        state?: GState | null;
        loading?: boolean;
        /** Ma byt view viditelny i v pripade, ze neobsahuje zadna data? Default = true */
        visibleIfEmpty?: boolean;
        userSettings?: Gordic.Data.IGStorage;
        headerForm?: Gordic.Forms.Form | null;
        headerFormVisible?: boolean;
        /** Uzivatelske akce */
        userActions?: Gordic.Dashboard.GDashboardActionManager;
    }
    interface IGDashboard2ViewRawOptions extends IGDashboard2ViewOptions {
        type: "raw";
    }
    interface IGDashboard2ViewGridOptions extends IGDashboard2ViewOptions<Array<any>> {
        type: "grid" | "table";
        columns?: IGDashboardColumnOptions[] | null;
        columnMode?: "fit" | "full";
        multi?: boolean;
        calc?: boolean;
    }
    interface IGDashboard2ViewTableOptions extends IGDashboard2ViewGridOptions {
        type: "table";
    }
    interface IGDashboard2ViewChartOptions extends IGDashboard2ViewOptions<Array<any>> {
        type: "chart";
        chart?: IGChartOptions | null;
    }
    interface IGDashboard2ViewCustomOptions extends IGDashboard2ViewOptions<JQuery> {
        type: "custom";
    }
    interface IGDashboard2ViewArticleOptions extends IGDashboard2ViewOptions<GArticleOptions> {
        type: "article";
    }
    interface IGDashboard2ViewPanelOptions extends IGDashboard2ViewOptions<any[]> {
        type: "panel";
        /**
         * Sablona k zobrazeni
         * @type {((data)}
         * @default > JQuery) | string V pripade typu string je se pouzije sablona z namespace Gordic.prefabs.Panels
         */
        itemTemplate?: ((data: any) => JQuery) | string;
        mode?: BasePanelMode;
        userAction?: IGDashboardActionArgs | null;
    }
    interface IGDashboardColumnConvertOptions {
        columns?: IGDashboardColumnOptions[] | null;
        manager?: Gordic.Dashboard.GDashboardActionManager;
    }
    class GDashboard2View<TOpts extends IGDashboard2ViewOptions> extends JQueryWidget<TOpts> {
        static widgetName: string;
        private _title;
        private _header;
        private _menubar;
        private _barWrapper;
        private _descr;
        private _pForm;
        private _preloaderMonitor;
        protected _create(): void;
        protected _destroy(): void;
        protected _getCreateOptions(): TOpts;
        protected _setOption(key: string, value: any): void;
        protected _refresh(): void;
        protected _renderContent(data: any): void;
        protected _preloaderShow(): void;
        protected _preloaderHide(): void;
        private _updateState;
        protected _updateData(data?: any): void;
        private _updateTitle;
        private _updateDescription;
        private _updateMenu;
        private _updateHeaderForm;
        private _updateHeaderFormVisibility;
        private _updateLoadingState;
        private _updateVisibilityState;
        private _updateVisibilityStateByData;
        helloWorld(): boolean;
        getOptions(): IGDashboard2ViewOptions;
    }
    class GDashboard2ViewRaw extends GDashboard2View<IGDashboard2ViewOptions> {
        static widgetName: string;
        private _pre;
        private _wrp;
        protected _create(): void;
        protected _destroy(): void;
        protected _renderContent(data: any): void;
        protected _updateData(data?: any): void;
    }
    class GDashboard2ViewGrid extends GDashboard2View<IGDashboard2ViewGridOptions> {
        static widgetName: string;
        protected _ctl: JQuery;
        protected _create(): void;
        protected _destroy(): void;
        protected _renderContent(data: any): void;
        protected _updateData(data?: any): void;
        protected _setOption(key: string, value: any): void;
        static convertColumns(options: IGDashboardColumnConvertOptions): Gordic.Data.GridFormat | undefined;
    }
    class GDashboard2ViewTable extends GDashboard2ViewGrid {
        static widgetName: string;
        protected _renderContent(data: any): void;
        protected _updateData(data?: any): void;
    }
    class GDashboard2ViewChart extends GDashboard2View<IGDashboard2ViewChartOptions> {
        static widgetName: string;
        private _chart;
        protected _create(): void;
        protected _destroy(): void;
        protected _renderContent(data: any): void;
        protected _updateData(data?: any): void;
    }
    class GDashboard2ViewCustom extends GDashboard2View<IGDashboard2ViewCustomOptions> {
        static widgetName: string;
        private _div;
        protected _create(): void;
        protected _destroy(): void;
        protected _renderContent(data: any): void;
        protected _updateData(data?: any): void;
    }
    class GDashboard2ViewArticle extends GDashboard2View<IGDashboard2ViewArticleOptions> {
        static widgetName: string;
        private _article;
        protected _create(): void;
        protected _destroy(): void;
        protected _renderContent(data?: GArticleOptions): void;
        protected _updateData(data?: GArticleOptions): void;
    }
    class GDashboard2ViewPanel extends GDashboard2View<IGDashboard2ViewPanelOptions> {
        static widgetName: string;
        private _wrp;
        protected _create(): void;
        protected _destroy(): void;
        protected _renderContent(data: any): void;
        protected _updateData(data?: any): void;
    }
}
interface JQuery {
    gdashboard2view<K extends Extract<keyof Gordic.Widget.IGDashboard2ViewOptions, string> = Extract<keyof Gordic.Widget.IGDashboard2ViewOptions, string>>(method: "option", key: K, value: Required<Gordic.Widget.IGDashboard2ViewOptions>[K]): JQuery;
    gdashboard2view<K extends Extract<keyof Gordic.Widget.IGDashboard2ViewOptions, string> = Extract<keyof Gordic.Widget.IGDashboard2ViewOptions, string>>(method: "option", key: K): Gordic.Widget.IGDashboard2ViewOptions[K];
    gdashboard2view(method: "getOptions"): Gordic.Widget.IGDashboard2ViewOptions;
    gdashboard2viewraw(options?: Gordic.Widget.IGDashboard2ViewRawOptions): JQuery;
    gdashboard2viewgrid(options?: Gordic.Widget.IGDashboard2ViewGridOptions): JQuery;
    gdashboard2viewtable(options?: Gordic.Widget.IGDashboard2ViewGridOptions): JQuery;
    gdashboard2viewchart(options?: Gordic.Widget.IGDashboard2ViewChartOptions): JQuery;
    gdashboard2viewcustom(options?: Gordic.Widget.IGDashboard2ViewCustomOptions): JQuery;
    gdashboard2viewarticle(options?: Gordic.Widget.IGDashboard2ViewArticleOptions): JQuery;
    gdashboard2viewpanel(options?: Gordic.Widget.IGDashboard2ViewPanelOptions): JQuery;
}
/**
 * IGChartOptions
 *
 * @author Petr Horsák
 * @since 480.1.0.486
 */
interface IGChartOptions<T = any> {
    id?: string;
    data?: T[] | T;
    type: string;
    config?: any;
}
interface IGChartConfig {
    width?: number;
    height?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    viewBox?: string;
}
interface IGChartTwoDimensionalConfig extends IGChartConfig {
    displayLabels?: boolean;
    xPropName?: string;
    yPropName?: string;
    yAxis?: string;
    xAxis?: string;
}
interface IGChartStackedConfig {
    /** Skupiny (nazvy klicu v dto), ktere maji byt pouzity */
    stackedGroups?: {
        /** Nazev property */
        name: string;
        /** Popisek*/
        label: string;
    }[];
}
interface IGLineChartConfig extends IGChartTwoDimensionalConfig {
    /** Vykreslit jako krivku */
    curve?: boolean;
}
interface IGBarChartConfig extends IGChartTwoDimensionalConfig {
    yAxisMin?: number | null;
    xAsisMin?: number | null;
}
interface IGStackedBarChartConfig extends IGBarChartConfig, IGChartStackedConfig {
    type?: "default" | "percentages" | "grouped";
}
interface IGStackedHorizontalBarChartConfig extends IGBarChartConfig, IGChartStackedConfig {
}
interface IGPieChartConfig extends IGChartTwoDimensionalConfig {
    displayLegend?: boolean;
}
interface IGLineChartOptions<T = any> extends IGChartOptions<T> {
    type: "line";
    data: T[];
    config?: IGLineChartConfig;
}
interface IGStackedLineChartConfig extends IGChartStackedConfig, IGChartTwoDimensionalConfig {
    /** Vykreslit jako krivku */
    curve?: boolean;
}
interface IGStackedAreaChartConfig extends IGChartStackedConfig, IGChartTwoDimensionalConfig {
}
interface IGStackedLineChartOptions<T = any> extends IGChartOptions<T> {
    type: "stackedLine";
    data: T[];
    config?: IGStackedLineChartConfig;
}
interface IGBarChartOptions<T = any> extends IGChartOptions<T> {
    type: "bar";
    data: T[];
    config?: IGBarChartConfig;
}
interface IGHorizontalBarChartOptions<T = any> extends IGChartOptions<T> {
    type: "horizontalBar";
    data: T[];
    config?: IGBarChartConfig;
}
interface IGStackedHorizontalBarChartOptions<T = any> extends IGChartOptions<T> {
    type: "stackedHorizontalBar";
    data: T[];
    config?: IGStackedHorizontalBarChartConfig;
}
interface IGStackedBarChartOptions<T = any> extends IGChartOptions<T> {
    type: "stackedBar";
    data: T[];
    config?: IGStackedBarChartConfig;
}
interface IGAreaChartOptions<T = any> extends IGChartOptions<T> {
    type: "area";
    data: T[];
    config?: IGBarChartConfig;
}
interface IGStackedAreaChartOptions<T = any> extends IGChartOptions<T> {
    type: "stackedArea";
    data: T[];
    config?: IGStackedAreaChartConfig;
}
interface IGPieChartOptions<T = any> extends IGChartOptions<T> {
    type: "pie";
    data: T[];
    config?: IGChartConfig & {
        isDonut?: boolean;
        labelsInSlices?: boolean;
    };
}
interface IGLiquidChartOptions<T = number> extends IGChartOptions<T> {
    type: "liquid";
    data: T;
    config?: IGChartConfig;
}
declare namespace Gordic.Widget {
    class GChart<T extends IGChartOptions<any> = IGChartOptions> extends JQueryWidget<T, IGChartOptions<any>> {
        static widgetName: string;
        private category20;
        private colors;
        private wrapLongText;
        private getDataColumns;
        refresh(): void;
        private iconIndicator;
        private createBarChart;
        private createStackedBarChart;
        private createHorizontalBarChart;
        private createStackedHorizontalBarChart;
        private createLineChart;
        private createMultiLineChart;
        private createMultiLineChart2;
        private createMultiLineChart4;
        private createMultiLineChart3;
        private createStackedLineChart;
        private createMultiLineChart5;
        private createStackedLineChart2;
        private createAreaChart;
        private createStackedAreaChart;
        private createStackedAreaChart2;
        private createPieChart;
        private createLegend;
        private createValueCard;
        createBulletChart(data: any, container: any, opt: any): any;
        private findNumberValue;
        private createGauge;
        private dToR;
        private createGauge2;
        private createGauge3;
        private createGauge4;
        private createGauge5;
        private createLiquid;
        private createTimeLine;
        protected _setOptions(opts: ObjectLiteral<any>): void;
        protected _create(): void;
        private _update;
        _destroy(): void;
        protected _getCreateOptions(): {
            id: string;
            data: never[];
            type: string;
            config: {
                width: number;
                height: number;
                marginLeft: number;
                marginRight: number;
                marginTop: number;
                marginBottom: number;
                displayLabels: boolean;
            };
        };
    }
}
interface JQuery {
    gchart(options?: IGChartOptions): JQuery;
    gchart(method: "refresh"): JQuery;
    gchart(method: "destroy"): JQuery;
    gchart(method: "option"): IGChartOptions;
    gchart(method: "option", values: Partial<IGChartOptions>): JQuery;
    gchart<K extends Extract<keyof IGChartOptions, string>, T = any>(method: "option", key: K): IGChartOptions<T>[K];
    gchart<K extends Extract<keyof IGChartOptions, string>, T = any>(method: "option", key: K, value: Required<IGChartOptions>[K]): JQuery;
    gchart(method: "instance"): Gordic.Widget.GChart;
}
declare namespace Gordic {
    interface IWizardEnableStep {
        /** číslo kroku */
        index: number;
        /** povolit? */
        enabled: boolean;
    }
    interface IWizardEnableStepNextBack {
        /** zpátky */
        back?: {
            /** povolit? */
            enabled: boolean;
        };
        /** dopředu */
        next?: {
            /** povolit? */
            enabled: boolean;
        };
    }
    /** informace o ikoně, kterou chceme přidat */
    type InfoAboutIcon = {
        /** název ikony (ve tvaru: "gi gi-gordic") */
        name: string;
        /** název tooltipu ikony */
        tooltip?: string;
        /** vlastní třída */
        customClass?: string;
    };
    /**
     * objekt gcontentu
     */
    type OGWizardContent = {
        /** gcontent */
        content: GContentType<any>;
    };
    interface IGWizardChangeTask {
        taskOn: boolean;
        nextStep?: number;
    }
    /**
     * object change na funkcích create() a change()
     */
    type OGWizardChange = {
        /** číslo kroku, ze kterého přecházíme na jiný */
        activeStep: number;
        /** pole s hodnotami typu boolean říkající, které kroky jsou aktivní a které ne */
        stepsEnable: boolean[];
        /**
         * pole hodnot, po jehož nastavení, lze zakázat přístup na jednotlivé kroku (bez udání důvodu pro uživatele), v případě nastavení má vyšší prioritu než stepsEnable[],
         * hodí se například pokud potřebuje přerušit přechod na další krok v change metodě.
         **/
        stepsCancel: boolean[];
        task: IGWizardChangeTask;
    };
    interface IGWizardCommandBarValue {
        /** popisek */
        caption?: string;
        /** ikona */
        icon?: string;
        /** vlastní třída */
        customClass?: string;
    }
    /** objekt commandbaru průvodce */
    type OGWizardCommandBar = {
        /** tlačítko předchozí */
        previously?: IGWizardCommandBarValue;
        /** tlačítko další */
        next?: IGWizardCommandBarValue;
    };
    enum GWizardPrimaryButtonEnum {
        /** další */
        next = 0,
        /** předchozí */
        back = 1,
        /** zrušit */
        cancel = 2,
        /** dokončit */
        complete = 3,
        /** vlastní dokončovací tlačítko */
        custom = 4
    }
    interface IGWizardStepsType {
        /**
         * identifikátor kroku
         * - využití v rámci contextové nápovědy
         * */
        id?: string;
        /** výběr primary tlačítka na každém kroky */
        primaryButton?: GWizardPrimaryButtonEnum;
        /**
         * možnost přidání vlastních tlačítek na kroky
         * !UPOZORNĚNÍ!
         * - nedoporučuji nastavovat parametr primary = true,
         * - chytá se na to kl. zkratka CTRL+ENTER a na contentu může být jen jeden
         * - a ten už tam defaultně je
         * */
        buttons?: MenuParams[];
        /** úprava popisku tlačítek v commandbaru */
        commandBar?: {
            /** tlačítko předchozí */
            previously?: string;
            /** tlačítko další */
            next?: string;
        } | OGWizardCommandBar;
        /** manuální nastavení stavu na jednotlivém kroku */
        state?: GState;
        /** vlastní text flashe */
        stateText?: string;
        /** vlatní css třída */
        customClass?: string;
        /**
         * popisek kroku průvodce
         */
        caption?: string;
        /**
         * Metoda ve které vytvoříme content kroku
         * @param {GContent} content gcontent
         * @param {JQuery<HTMLElement>} contentDiv html content na kterém vytváříme obsah
         * @param {changeObject} change objekt change obsahující informace o krocích
         */
        create: (content: GContent, contentDiv: JQuery<HTMLElement>, change: OGWizardChange) => void | JQuery.Promise<any>;
        /**
         * Metoda vyvolaná v okamžiku změny kroku na jiný krok
         * @param {GContent} content gcontent
         * @param {JQuery<HTMLElement>} contentDiv html content na kterém vytváříme obsah
         * @param {changeObject} change objekt change obsahující informace o krocích
         */
        change: (content: GContent, contentDiv: JQuery<HTMLElement>, change: OGWizardChange, icon?: any) => void | JQuery.Promise<any>;
    }
    /**
     * objekt nastavení kroků průvodce
     */
    type OGWizardSteps = {
        /** startovací krok (počítáme od nuly) */
        startStep?: number;
        /**
            * (default = "Průvodce") titulek
            */
        title?: string;
        /**
         * kroky průvodce
         */
        steps: IGWizardStepsType[];
        /**
         * Metoda vyvolaná v případě zrušení průvodce
         * @param {GContent} content gcontent
         * @param {JQuery<HTMLElement>} contentDiv html content na kterém vytváříme obsah
         * @param {changeObject} change objekt change obsahující informace o krocích
         */
        cancel?: (content: GContent, contentDiv: JQuery<HTMLElement>, change: OGWizardChange) => void;
        /**
         * Metoda obsluhující poslední krok průvodce
         * @param {GContent} content gcontent
         * @param {JQuery<HTMLElement>} contentDiv html content na kterém vytváříme obsah
         * @param {changeObject} change objekt change obsahující informace o krocích
         */
        complete?: (content: GContent, contentDiv: JQuery<HTMLElement>, change: OGWizardChange) => void;
        /**
         * Možnost vytvoření vlastního tlačítka complete
         */
        custom?: {
            /** v případě nastavení na false není políčko vytvořeno */
            visible?: boolean;
            /** popisek */
            caption?: string;
            /** ikona */
            icon?: string;
            /** tooltip */
            tooltip?: string;
            /** definice vlastní třídy pro vizuální úpravu tlačítka */
            customClass?: string;
            /** vlastní obsluha tlačítka */
            run?: (content: GContent, contentDiv: JQuery<HTMLElement>, change: OGWizardChange) => void;
        };
    };
    class Wizard {
        /**
         * gcontent
         */
        private gcontent;
        /**
         * nastavení kroků
         */
        private options;
        /**
         * element průvodce
         */
        private gwizard_container;
        /**
         * objekt průvodce
         */
        private gwizard;
        /**
         * gwizardAction
         */
        private gwizardAction;
        private element;
        /**
         * vytvořit průvodce
         */
        create(gcontentObject: OGWizardContent, options: OGWizardSteps): void;
        private runAction;
        /**
         * vytvoření kroků
         */
        private createSteps;
        private _afterClick;
        private createMenuParamBack;
        private createMenuParamContinue;
        private createMenuParamComplete;
        private createMenuParamCancel;
        private createMenuParamCustom;
        private createCommandBar;
        private createActions;
        private setLastStep;
        /**
         * vytvořit buttonpanel
         */
        private createButtonpanel;
        private _createContent;
        private currentContent;
        private _create;
        private setFocus;
        /**
         * vytvořit commandbar
         */
        private createCommandbarFirstStep;
        /**
         * vytvořit titulek
         */
        private createTitle;
        /**
         * vytvořit element pro průvodce
         */
        private createContainer;
        /**
         * nastavení vlastních tlačítek
         */
        private setOwnButtons;
        /**
         * nastavení tlačítek v commandbaru
         */
        private setButtons;
        private _afterChangeContinue;
        private _createCommandBar;
        private _afterChangePreviously;
        /**
         * vynulování změn při nastavení stepsCancel
         */
        private _clearStepsCancel;
        private _createContentCommandBar;
        /**
         * nastavit ikonu k vybranému kroku
         *
         * @param {GContent} gcontent gcontent
         * @param {number} stepNumber číslo kroku, ke které se ikona přidá (Pozor, tady se čísluje od 0!)
         * @param {InfoAboutIcon} icon atributy přidané ikony
         */
        setIcon(gcontent: GContent, stepNumber: number, icon: any): void;
        /**
         * odstranit ikonu u vybraného kroku
         *
         * @param {GContent} gcontent gcontent
         * @param {number} stepNumber číslo kroku u kterého se ikona odebere
         * @param {string} iconClass vyplnit, pokud chceme specifikovat, kterou ikonu odebereme (ve tvaru: ".gi.gi-gordic"),
         * pokud není zadán, jsou odebrány všechny na vybraném kroku
         */
        removeIcon(gcontent: any, stepNumber: number, iconClass?: string): void;
        /**
         * nastavit krok
         * @param {number} stepNumber číslo kroku, na který přejdu
         */
        setStep(stepNumber: number): void;
        /**
         * Povolit krok/y?
         * @param {any} gcontent gcontent
         * @param {IWizardEnableStep[] | null} step krok/y, který zakázat v gbuttonpanelu
         * @param {IWizardEnableStepNextBack} directions? nastavení stavu tlačítka (zpět a dopředu)
         */
        enableStep(gcontent: any, step: IWizardEnableStep[] | null, directions?: IWizardEnableStepNextBack): void;
        /**
         * vrať číslo kroku (na kterém aktuálně stojíš)
         */
        getStep(gcontent: any): number;
    }
}
declare namespace Gordic {
    enum GNotePermissionsEnum {
        None = 0,
        Update = 1,
        Remove = 2
    }
    interface InitOptionsCategories {
        Background?: string;
        Foreground?: string;
        IsDefault?: boolean;
        Value: TypeOfAuthorization;
    }
    interface InitOptions {
        Categories: InitOptionsCategories[];
        IsCreatePermitted: boolean;
        MaxLength: number;
    }
    interface IDataOptions {
        Permissions: GNotePermissionsEnum;
        category: TypeOfAuthorization;
        isOwn: boolean;
        text: string;
        tiskova?: number;
        porCisloPuv?: number;
    }
    /** dto s uloženou poznámkou */
    interface IGNoteDto {
        Id: string;
        Permissions: GNotePermissionsEnum;
        category: TypeOfAuthorization;
        dateCreated: string;
        dateModified: string;
        editor: string;
        isActive: boolean;
        isOwn: boolean;
        ixp: string;
        porCislo: number;
        text: string;
        /** barva poznámky */
        uzo: string;
        /** pořadové číslo původní poznámky, na kterou se tato poznámka odkazuje */
        porCisloPuv: any;
        /** tisk k sestave */
        tiskova: number;
    }
    /** typ autorizace poznámky */
    enum TypeOfAuthorization {
        /** veřejná */
        public = "0",
        /** spisového uzlu */
        node = "10",
        /** soukromá */
        private = "20",
        /** cílená */
        target = "30"
    }
    /** typ poznámky */
    enum TypeOfNote {
        /** poznámka */
        note = 0,
        /** todo seznam */
        todo = 1
    }
    /**
     * objekt položky seznamu
     */
    interface IObjectTodo {
        /**
         * je zaškrtnut?
         */
        check: boolean;
        /**
         * text
         */
        text: string;
    }
    interface IGNotePanelOptions {
        /** skryje tlačítko Odpovědět */
        hideAnswerButton?: boolean;
        /** zobrazení možnosti - k tisku v sestavě (pouze gindpoz poznámky) */
        showTiskovaField?: boolean;
        /** identifikátor dokumentu (ixp) pro wfldpoz poznámky  */
        ixp?: string;
        /** id pro gindpoz poznámky (složený klíč + typObj) */
        sxs?: string;
        /** id pro gindpoz poznámky (složený klíč + sxs) */
        typObj?: number;
        className?: string;
        serverParams?: object;
        /** metoda, která vrací počet poznámek v panelu */
        count?: (count: number) => void;
        /** událost vyvolaná při změně na poznámce */
        change?: (param: "create" | "update" | "delete" | "changeColor", data: IGNoteDto | null) => void;
    }
    interface IGNoteAnswer {
        tiskova?: number;
        authorizationId?: TypeOfAuthorization;
        answer?: string;
    }
    /** Poznámka */
    class GNotePanel {
        private options;
        /** element panelu poznámky */
        private gnote;
        /** element předka panelu poznámku */
        private gnote_parent;
        /** element hlavičky poznámky */
        private header;
        /** element tlačítek v hlavičce */
        private header_buttons;
        /** element hlavičkových tlačítek vlevo */
        private header_buttons_left;
        /** element hlavičkového tlačítka vytvoření nové poznámky */
        private header_buttons_left_note;
        /** element hlavičkových tlačítek vpravo */
        private header_buttons_right;
        /** element tlačítka vpravo pro hledání */
        private header_buttons_right_search;
        /** element pro čištění (float) tlačítek v hlaviččce */
        private header_buttons_clear;
        /** element tlačítka (ikony) pro čištění vyhledávání */
        private clear_search;
        /** input element textu pro vyhledávání */
        private input_search;
        /** element menu v hlavičce */
        private header_menu;
        /** element menu v hlavičce vlevo */
        private header_menu_left;
        /** element menu v hlavičce vpravo */
        private header_menu_right;
        /** typ autorizace (default=private)*/
        private authorization;
        /** jméno cíle (autora) */
        private nameOfTarget;
        /** element jména autora v menu v hlavičce */
        private header_menu_left_button_name;
        /** element těla poznámky - je na něj navázán scrollbar*/
        private body;
        /** typ poznámky */
        private type_of_note;
        /** nová poznámka */
        private new_note;
        /** nový todo (seznamu) */
        private new_todo;
        /** třída tlačítka pro přidání nové poznámky / todo */
        private note_class;
        /** index itemu seznamu */
        private todoindex;
        /** element listu todo */
        private todoList;
        /** element todo */
        private todoItem;
        /** uživ. uložiště */
        private userSettings?;
        /** seznam poznámek */
        private list_note;
        /** hlavní element celého panelu */
        element: JQuery<HTMLElement>;
        /** server gcontent */
        private gcontent;
        /** počet poznámek */
        private count;
        /** element pro zabránění ztráty focusu */
        private dummy;
        /** tlačítko skrytí změny barvy */
        private hideColorBtn?;
        /**
         * Vytvořit Panel Poznámek
         * @param element
         * @param parentContent pro provázání z contentem
         * @param options nastavení
         * @param hideColorBtn skrýt možnost změny barvy (např. v případě, že není implementována)
         */
        create(element: JQuery<HTMLElement>, parentCnt: any, options: IGNotePanelOptions, hideColorBtn?: boolean): void;
        private resizeHeader;
        private gindpoz;
        /** Získat inicializátor obsahu (contentu) */
        private _getContentInitializer;
        /** nastavení módu čtení na panelu poznámek (default=false) */
        private readMode;
        /**
         * inicializace módu čtení dle parametru gin_rad_konao, zatím pouze pro WFL poznámky
         * thazmuka (4.11.2021)
         * */
        private initReadMode;
        /** vstupní nastavení poznámkového panelu */
        private initOptions;
        private createHeader;
        /** načtení seznamu poznámek */
        private list;
        private setCount;
        private createHeaderButtons;
        private createHeaderButtonsLeft;
        private createHeaderButtonsRight;
        private createHeaderButtonsClear;
        private createHeaderButtonNote;
        private focusOnNewNote;
        private toogleHeaderButtonNote;
        private createHeaderButtonSearch;
        private setInputSearch;
        private setClearSearchButton;
        private searchNotes;
        private createHeaderMenu;
        private tiskova;
        private createTiskSelect;
        private createTypeOfAuthorization;
        private createNameAuthorOfNote;
        private createTypeOfNote;
        private createExitFromNote;
        private runExitFormNote;
        private createNewNote;
        /** nahrazení neviditelných znaků \r\n|\n|\r znakem <br> */
        private replaceStringEnter;
        private changeScrollBarHeight;
        private removeNewNote;
        private removeNewTodo;
        private createNewTodo;
        private addTodo;
        private removeListTodo;
        private createBody;
        private setData;
        private setScrollbar;
        /**
         *  nastavení vstupních dat
         *  !! typ Poznámka nastavena natvrdo, typ Todo se musí dodělat (do tabulky v db)
         * */
        private _setInitialValues;
        private sortNew;
        /** porovnávání datumů - pokud je druhé datum větší než první, vrať true, jinak false */
        private compareDate;
        private getUzo;
        private setColor;
        private setCategory;
        private createOutputNote;
        /** úprava poznámky */
        private update;
        private updateNote;
        /** data poznámek */
        private data;
        private _onChangeColor;
        private _onUpdate;
        private _onDeleteAndLoadList;
        private _onSaveAnswer;
        /**
         * vytvoření poznámky a refresh(přenačtení) listu poznámek
         */
        private createAndLoadList;
        /** motátko element */
        private gcover;
        /** vytvořit motátko */
        private createGCover;
        /** smazat motátko */
        private deleteGCover;
        /** metoda vyvolaná při pokusu o uložení nové poznámky */
        private _onSave;
        /**
         * zobrazení error hlášení ve flashi
         * @param shortMessage hláška
         */
        private _showError;
        /**
         * zobrazení info hlášení ve flashi
         * @param shortMessage hláška
         */
        private _showUpdate;
        /**
         * nalezení kořenové prvku
         */
        private findRoot;
        private findRecursive;
        private body_answer;
        /** otevřít list navzájem provázaných poznámek */
        private openListOfNotes;
        /** změna výšky scrollbaru u souhrnu */
        private changeScrollBarHeightAnswer;
    }
}
declare namespace Gordic.Widget.GNote {
    class Form {
        private Form;
        private initialCategory;
        constructor(Form: Forms.Form, initialCategory: TypeOfAuthorization | string);
        createAnswerText(maxLength?: number): void;
        createTiskSelect(): void;
        createTypeOfAuthorization(options: IGNoteBaseDataOptions, gindpoz: boolean): void;
    }
}
interface IGNoteOptions {
    /** element panelu v sidebaru */
    gsbpanel: JQuery<HTMLElement>;
    /** volitelné menu ve statusbaru */
    statusbar?: MenuParams[];
    /** oprávnění na poznámce */
    permissions: Gordic.GNotePermissionsEnum;
    /** text poznámky */
    text: string;
    /** autor/editor poznámky */
    author: string;
    /** datum vytvoření/úpravy poznámky */
    date: Date;
    /** typ poznámky */
    type?: string;
    /** max. délka textu poznámky */
    maxLength?: number;
    /** metoda change */
    change?: (type: "update" | "delete" | "color" | "create" | "openList", data: any, answerObject?: Gordic.IGNoteAnswer) => void | JQueryPromise<any>;
    /** barva poznámky */
    color?: string;
    /** další předaná data, které můžeš potřebovat předat např. id poznámky */
    data?: any;
    /** zápatí pro nabídku odpovědí */
    answerFooter?: boolean;
    /** skrýt tlačítko pro změnu barvy */
    hideColorBtn?: boolean;
    /** příznak, jestli se jedná o gindpoz poznámku */
    gindpoz: boolean;
    /** hodnota tisku */
    tiskova?: number;
    /** skryje tlačítko Odpovědět */
    hideAnswerButton?: boolean;
    /** zobrazení možnosti - k tisku v sestavě (pouze gindpoz poznámky) */
    showTiskovaField?: boolean;
}
interface IGNoteBaseOptions extends IGNoteOptions {
    element: JQuery<HTMLElement>;
}
interface JQuery {
    /**
     * vytvoření poznámky
     * @param options nastavení
     */
    gnote(options: IGNoteOptions): JQuery;
}
declare namespace Gordic {
    interface IGNoteBaseDataOptions {
        /** text poznámky */
        text?: string;
        /** datum vytvoření/úprava poznámky */
        date: Date;
        /** autor/editor poznámky */
        author?: string;
        /** typ poznámky */
        type?: string;
        /** barva poznámky */
        color?: string;
        /** další data poznámky */
        data?: any;
        /** skrýt tlačítko pro změnu barvy */
        hideColorBtn?: boolean;
        /** příznak pro tisk */
        tiskova?: number;
    }
    /** třída pro vytvoření společného těla všech poznámek (pozor! nejedná se o widget, který volat) */
    class GNoteBase {
        /** element poznámky */
        private gnote;
        /** element hlavičky poznámky */
        private gnote_header;
        /** elemente textu hlavičky poznámky */
        private gnote_header_text;
        /** element tlačítek v hlavičce */
        private gnote_header_buttons;
        /** element těla poznámky */
        private gnote_body;
        /** base element poznámky */
        private gnote_base;
        /** element zápatí poznámky */
        private gnote_footer;
        /** tlačítko skrytí změny barvy */
        private hideColorBtn?;
        /** max. počet znaků v poznámce */
        private maxLength?;
        /** vyvolaná metoda change */
        private change?;
        /** data poznámky */
        private data;
        /** statusbar */
        private statusbar?;
        /** oprávnění */
        private permissions;
        private gsbpanel;
        private gindpoz;
        private showTiskovaField;
        private hideAnswerButton;
        create(opt: IGNoteBaseOptions): void;
        private createTiskSelect;
        createTypeSelect(parent: JQuery<HTMLElement>, options: IGNoteBaseDataOptions, initialCategory: TypeOfAuthorization | string, gindpoz: boolean): void;
        private gnote_saveBtn;
        /**
         *  vytvořit odpověd
         * */
        private createAnswerFooter;
        /**
        * utility metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
        *
        * @param {JQuery<HTMLElement>} form předaný element formuláře
        * @returns {JQueryPromise<boolean>} výsledek stavu
        */
        private waitForValues;
        private createAnswerNote;
        /** vytvořit zápatí se statusbarem */
        private createFooter;
        private createHeader;
        private resizeHeader;
        /** nastavená autora do hlavičky */
        private setAuthor;
        /** nastavení datumu do hlavičky */
        private setDate;
        /** nastavení separátoru v hlavičce */
        private setSeparator;
        private createBody;
        /** nastavení textu poznámky */
        private setText;
        /** změna barvy poznámky */
        private changeBackgroundColor;
        private setPermissions;
        private setSouhrn;
        private setColorPermissions;
        private setUpdatePermissions;
        private setRemovePermissions;
        private createCustomConfirmDlg;
        /** odstranit jeden záznam poznámky z výstupního seznamu všeho*/
        deleteNote(): void;
        private setAllPermissions;
        private getColorText;
        private createColorPalette;
        private updateToTextArea;
        private trySave;
        /**
          * počet <br> v textu
          * @param str string ve kterém hledám (html)
          */
        private countBr;
        private replaceLineEndingCharacters;
        private update;
        /** nastavení aktuálního data při změně poznámky */
        private updateNowDate;
        updateToDiv(text: any): void;
        /** otevřít list navzájem provázaných poznámek */
        private openListOfNotes;
    }
}
declare namespace Gordic.Widget {
    interface GOverlayTipsOptions {
        tipsZipPath?: any[];
    }
    class GOverlayTips extends JQueryWidget<GOverlayTipsOptions> {
        static widgetName: string;
        private overlayTips;
        private uuid;
        private cssUid;
        private serviceContent;
        private activeOverlayTips;
        private numberOfOverlayTips;
        private actions;
        private globalSetting;
        private overlayTipsContent;
        private overlayTipsButtonpanel;
        private overlayTipsDots;
        private header;
        private picture;
        private description;
        private svgPicure;
        private altPicture;
        private form;
        _create(): void;
        _initGContent(): GContent;
        _initGlobalSettings(): GContent;
        _getNotRepeatedTips(): any[];
        destroy(): void;
        _setViewTipToUserStorage(): void;
        _failGetImage(exc: any): void;
        _addContentImage(overlayTip: any): void;
        _addToContent(overlayTip: any): void;
        _fadeOutFunction(): void;
        _fadeInFunction(): void;
        _isOverlayTipValid(overlayTipObj: any): boolean;
        _createGraphicWidget(): void;
        _createContent(): void;
        _createButtonPanel(): void;
        _closeButtonAct(): void;
        _closeAct(): void;
        _nextAct(): void;
        _updateDots(): void;
        _createOverlayTipsDots(): void;
        _initResizeManager(): void;
        _getHeightFromElement(pomclass: string): number;
        _uninitResizeManager(): void;
    }
}
interface JQuery {
    goverlaytips(options?: Gordic.Widget.GOverlayTipsOptions): JQuery;
}
declare namespace Gordic.Gui.WebControls {
    function createOverlayTips(tips: any, contentUid: string, us: Gordic.Data.Storage): void;
}
interface GTableOptions<TRow> {
    data?: Gordic.Data.View<TRow> | TRow[];
    columns?: GGridColumn<TRow>[] | Gordic.Data.GridFormat<TRow>;
    virtualCssClass?: string;
    breakWidth?: number;
    customClass?: string;
    rowsClass?: string | ((row: MetaRow<TRow>, columns: GGridColumn<TRow>[], rowIndex: Number) => string) | null;
    groupingHeaderColumns?: ObjectLiteral<GGridColumn<TRow>>;
}
declare namespace Gordic.Widget {
    class GTable<TRow> extends JQueryWidget<GTableOptions<any>> {
        private _resizeWidth;
        private _headers;
        private _resizeWidthElement;
        private _data;
        private groupingHeaderColumns;
        private _styleElement;
        private cssUid;
        private _columns;
        private _countItem;
        private uuid;
        private _content;
        private numberRow;
        static widgetName: string;
        _create(): void;
        destroy(): void;
        _columnsSetting(): void;
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        setData(data: any): void;
        _reloadData(): void;
        _addMobileHeaders(): void;
        _analyzeData(rows: any[]): any[];
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        _actionClick(element: any): void;
        _isIE(): boolean;
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        _initResizeManager(): void;
        _resizefunction(actual: any): void;
        _uninitResizeManager(): void;
        _addGtableResponsive(actualWidth: number): void;
        _removeGtableResponsive(actualWidth: number): void;
        _testGTableResponsive(): boolean;
        _testIfBreakGtable(): boolean;
    }
}
interface JQuery {
    gtable<TRow = any>(...options: GTableOptions<TRow>[]): this;
    gtable<TRow = any>(method: "setData", data: TRow[] | Gordic.Data.View<TRow>): Gordic.Data.View<TRow>;
    gtable(method: "destroy"): any;
}
interface GComparatorOptions<TRow> extends JQueryUI.WidgetOptions {
    /** Sloupce zadané v gridformátu */
    columns?: GGridColumn<TRow>[] | Gordic.Data.GridFormat<TRow>;
    /** Položky pro porovnání */
    items?: TRow[];
    /** Vybraná položka */
    selectedItemIndex?: number;
    /** Element ve kterem sleduje gcomparator fields*/
    watchForHighlight?: JQuery;
    /** Hlavní subtask caption */
    mainItemCaption?: string;
    /** Seznam subtasků */
    subTasks?: ObjectLiteral<any>[];
    /** Šablona pro tvoření titulku položky */
    itemTemplate?: string;
    /** Can row headers be clickable and highlight form fields on click?
    * @default false
    */
    clickable?: boolean;
    /** Uživatelské menu */
    contextMenu?: MenuParams[];
    /** Pokud není stejný název je možnost mapovat pomocí této funkce ve tvaru { "girdItemField": "formFieldName", ...}  */
    formMappings?: {
        [gridItemName: string]: string;
    };
    /** Identifikace skupin pro porovnání podobjektů*/
    groupIdentification?: [
        {
            /** Cesta ke skupině např. group1.subgroup1 */
            groupName: string;
            /** Zobrazovaný název pro skupinu */
            caption: string;
        }
    ];
    /** Open in entire content
    *  @default false
    */
    contentOpen?: boolean;
    itemremove?: (event: JQueryEventObject, ctx: {
        item: TRow;
    }) => void;
    itemchange?: (event: JQueryEventObject, ctx: {
        count: number;
        items: TRow[];
    }) => void;
    /**
     * Method which is called, when item's value was clicked and should be applied to form.
     * @param {TRow} item
     * @param {GGridColumn<TRow>} rowFormat
     *
     * @default defaultFormApplyFunction
     */
    formApply?: (item: TRow, rowFormat: GGridColumn<TRow>) => void;
    /**
     * Event, which fires when other item was marked as selected
     * @param {JQueryEventObject} event
     * @param {Object} ctx context of event.
     * @param {TRow} ctx.item Item which was selected
     * @param {number} ctx.origin Index of subtask, in which change happend
     * @param {JQuery} ctx.originElement Element, in which change happend - interesting if there is more subtasks.
     */
    selection?: (event: JQueryEventObject, ctx: {
        item: TRow;
        origin: number;
        originElement: JQuery;
    }) => void;
}
declare namespace Gordic.Widget {
    class GComparator extends JQueryWidget<GComparatorOptions<any>> {
        static widgetName: string;
        private cssUid;
        private uuid;
        private _options;
        private _items;
        private _actions;
        private _itemTemplateRendered;
        private _topIndex;
        private _itemsCount;
        private _scrollHorizontally;
        private _rowFieldMap;
        private _badges;
        private _rows;
        private _updateSubTaskNeeded;
        private _visibleSubTask;
        private _subTasks;
        private _gcomparatorMain;
        private _table;
        private _tableHead;
        private _emptyTableBody;
        private _tableBody;
        private _actionCell;
        private _headerRow;
        private _bodyFragment;
        private _selectedRow;
        _create(): void;
        _destroy(): void;
        private _createAllActions;
        createMenuBar(): MenuParams[];
        private _defaultFormApplyFunction;
        private _deepCompare;
        private showDifference;
        private _ensureOptions;
        private _ensureColumns;
        private _getDefaultOptions;
        private _getColumnDefaults;
        private _getColumnGroupDefaults;
        private refresh;
        addItems(items: any): void;
        addItem(item: any, highlight: any): void;
        getItems(): any[];
        clear(): void;
        private _buildTable;
        private _buildSubTasks;
        private _buildActionColumn;
        private _buildHeaderColumn;
        private _formFieldName;
        private _buildItems;
        private _moveItem;
        private _removeItem;
        private _selectItem;
        private _showHideEmptyTableBody;
        private _showRowFilter;
        private _highlightItems;
        private _setHighlightForDifferentItem;
        private _setHighlightForRow;
        private _setUpdateNeeded;
        private _saveFavorites;
        private _setFavoritesToFormat;
        private _showHideRows;
        private _checkGroupRows;
        private _openCloseGroup;
        private _notifySelection;
        private _notifyItemChange;
        private _buildItemHeader;
        private _focusRow;
        private _getRowIndexByName;
        private _buildItemCells;
        private _switchSubTask;
        private _getLevelOfItem;
    }
}
interface JQuery {
    /**
     * Nepoužívat přímo - vztvoří menu bar pro celocontentový gcomparator přístupný přes notifikaci
     * @param method
     */
    gcomparator<Trow = any>(method: "createMenuBar"): MenuParams[];
    /**
     * Odtraní všechny položky z porovnání
     * @param method
     */
    gcomparator<Trow = any>(method: "clear"): void;
    /**
     * Přidá položky do porovnání
     * @param method
     * @param items
     */
    gcomparator<Trow = any>(method: "addItems" | "setData", items: Trow[]): boolean;
    /**
     * Přidá jednu položku do porvonání
     * @param method
     * @param items
     */
    gcomparator<Trow = any>(method: "addItem", items: Trow): boolean;
    /**
     * Získá aktuální porovnávané položky (lze použít pro pozdější práci s položkami)
     * @param method
     */
    gcomparator<Trow = any>(method: "getItems"): any[];
    /**
     * Změna option
     * @param method
     */
    gcomparator<TRow = any>(method: "option"): GComparatorOptions<TRow>;
    /**
     * Vztvoří nový g comparator
     * @param options
     */
    gcomparator<Trow = any>(options?: GComparatorOptions<Trow>): JQuery;
    gcomparator<TRow = any, K extends Extract<keyof GComparatorOptions<TRow>, string> = Extract<keyof GComparatorOptions<TRow>, string>>(method: "option", key: K): GComparatorOptions<TRow>[K];
    gcomparator<TRow = any, K extends Extract<keyof GComparatorOptions<TRow>, string> = Extract<keyof GComparatorOptions<TRow>, string>>(method: "option", key: K, value: Required<GComparatorOptions<TRow>>[K]): JQuery;
}
declare namespace Gordic.Components.GComparator {
    /**
     * Vytvoří nebo přidá do existující notifikace vybrané položky
     * @param title titulek porovnání (zobrazen v notifikaci a později při otevření notifikace zobrazen v breadcrumbs)
     * @param comparatorOptions nastavení comparatoru vložení items, nastavení itemTemplate
     * @param compareId identifikátor pro notifikaci (pokud není zadán je generován)
     * @returns Id notifikace pro Gcomparator
    */
    function CreateCompare<TRow = any>(title: string, comparatorOptions: GComparatorOptions<TRow>, compareId?: string): string | undefined;
    /**
     * Otestuje zda notifikace pro Gcomparator existuje
     * @param id identifikátor notifikace
     */
    function ExistCompareWithId(id: string): boolean;
    /**
     * Přidá objekty do existující notifikace
     * @param comparatorId identifikátor notifikace
     * @param items objekty pro přidání do notifikace
     */
    function AddItemsToExistingCompare(comparatorId: string, items: any[]): void;
}
declare namespace Gordic.Gui.WebControls {
    class GComparatorContent<TRow> extends GContentBase {
        prepareContent(): void;
    }
}
declare namespace Gordic.Widget.GColorPicker {
    interface IColorData {
        value: IColor;
    }
    /** třída barvy */
    interface IColor {
        /** text nebo tooltip barvy */
        text: string;
        /**číslo barvy*/
        uzo: UzoEnum | null;
        /** třída celé ikony */
        iconCSS: string;
        /** třída barvy */
        colorCSS: string;
    }
    /**
     * barvy colorpickeru
     * !! Neměnit pořadí !!
     *  */
    enum UzoEnum {
        /** Bílá*/
        White = "0",
        /**Červená*/
        Red = "1",
        /**Zelená*/
        Green = "2",
        /**Modrá*/
        Blue = "3",
        /**Fialová*/
        Purple = "5",
        /**Žlutá*/
        Yellow = "4"
    }
    /** nastavení */
    interface IGColorPickerOpt {
        /**
         * jedinečný identifikátor komponenty výběru barev
         * - při použití v gridu nastávalo v kombinaci při překreslení gridu
         * chování, které zapříčinilo ztracení propojení elementu komponentu s
         * aktivním DOMem a v případě použití jedinečného ID by toto nemělo nastávat
         * */
        id?: string;
        /** typ využití komponenty pro globální uživatelské nastavení (default=usu) */
        type?: "epk" | "usu";
        /** pouze ke čtení */
        readonly?: boolean;
        /** barva */
        uzo?: UzoEnum | number | string | null;
        /**
         * událost vyvolaná při změně barvy
         * null - hodnota nenastavené barvy
         * */
        change?: (color: UzoEnum | null) => void;
        /** formát zobrazení (grid) */
        formatPreset?: Gordic.Global.Enums.GridColumnFormatIcon | string | null;
        /** globální uživ. nastavení */
        globalSettings?: Gordic.Data.IGStorage | null;
        xxx?: JQuery<HTMLElement>;
    }
    class GColorPickerCustomNames {
        static init(): void;
        static customNames: {
            White?: string;
            Red?: string;
            Green?: string;
            Blue?: string;
            Yellow?: string;
            Purple?: string;
        };
    }
    class Sidebar {
        /**
         * událost vyvolaná při změně barvy
         * null - hodnota nenastavené barvy
         * */
        change?: (color: UzoEnum | null) => void;
        globalSettings?: Gordic.Data.IGStorage | null;
        type?: "epk" | "usu";
        initialValue: UzoEnum | string | null;
        readonly?: boolean;
        private opt;
        private currentValue;
        create(): GSideBarPanelOptions;
        update(uzo: GColorPicker.UzoEnum | string | null): void;
        private removeAllColorClasses;
        private validateUzo;
    }
    class Options {
        constructor(globalSettings?: Gordic.Data.IGStorage | null, isGrid?: boolean, type?: "epk" | "usu");
        private type?;
        private globalSettings?;
        private circle;
        /** vrať objekt s barvou */
        getColorObj(uzo?: UzoEnum | string | null): IColor;
        private nocolorCSS;
        private getNotmarkedcolor;
        private whitecolorCSS;
        /** bílá barva */
        private getWhitecolor;
        private redcolorCSS;
        /** cervena barva */
        private getRedcolor;
        private greencolorCSS;
        /** zelená barva */
        private getGreencolor;
        private bluecolorCSS;
        /** modrá barva */
        private getBluecolor;
        private purplecolorCSS;
        /** fialová barva */
        private getPurplecolor;
        private yellowcolorCSS;
        /** žlutá barva */
        private getYellowcolor;
        private getColorText;
        /** vrať všechny barvy */
        getAllColors(): IColor[];
    }
    class Grid {
        constructor(globalSettings?: Gordic.Data.IGStorage | null, type?: "epk" | "usu");
        private type?;
        private opt;
        private globalSettings?;
        getCaptionText(uzo: UzoEnum): string;
    }
}
interface JQuery {
    gcolorpicker(options?: Gordic.Widget.GColorPicker.IGColorPickerOpt): JQuery;
}
declare namespace Gordic.Components.CanvasDrawer {
    const ignoreActiveCancelationClass = "js-gcanvasdrawerignorecancelation";
    /**
     * calcs x,y coordinantes, so object is always inside area.
     *
     * @param { x: number, y: number, width: number} object
     * @param { width: number, height:number } area
     */
    function limitCoordinates(object: {
        x: number;
        y: number;
        width: number;
        height: number;
    }, area: {
        width: number;
        height: number;
    }): {
        x: number;
        y: number;
    };
    /**
     * GCanvasContext - context for storing data for canvas drawer
     *
     * @author Vlastimil Máca
     * @since 482.1.0.173
     */
    class GCanvasContext {
        canvasLayers: GCanvasLayerData[];
        private _canvasMap;
        addCanvasLayer(canvasId: string, canvasWidth: number, canvasHeight: number, canvasRotation?: number): GCanvasLayerData;
        getCanvas(canvasId: string, canvasWidth?: number, canvasHeight?: number, canvasRotation?: number): GCanvasLayerData | null;
        getCanvasObjects<T extends IGCanvasShape>(drawer: IGCanvasShapeDrawer<T>, meta: false): T[];
        getCanvasObjects<T extends IGCanvasShape>(drawer: IGCanvasShapeDrawer<T>, meta?: boolean): CanvasDrawer.IGCanvasShapeMeta<T>[];
    }
    interface IGCanvasShapeBaseEventOpts<T extends Partial<IGCanvasShape> = IGCanvasShape> {
        shape: IGCanvasShapeMeta<T>;
    }
    interface IGCanvasShapeCreateEventOpts<T extends Partial<IGCanvasShape> = IGCanvasShape> extends IGCanvasShapeBaseEventOpts<T> {
        element: JQuery;
    }
    interface IGCanvasShapeActiveEventOpts<T extends Partial<IGCanvasShape> = IGCanvasShape> extends IGCanvasShapeBaseEventOpts<T> {
        element: JQuery;
        focus?: boolean;
        resultPromise: JQueryPromise<any> | null;
    }
    interface IGCanvasShapeChangeEventOpts<T extends Partial<IGCanvasShape> = IGCanvasShape> extends IGCanvasShapeBaseEventOpts<T> {
    }
    interface IGCanvasShapeScaleEventOpts<T extends Partial<IGCanvasShape> = IGCanvasShape> extends IGCanvasShapeBaseEventOpts<T> {
        canvasWidthRatio: Decimal;
        canvasHeightRatio: Decimal;
    }
    interface IGCanvasShapeSaveEventOpts<T extends Partial<IGCanvasShape> = IGCanvasShape> extends IGCanvasShapeBaseEventOpts<T> {
        resultPromise: JQueryPromise<any> | null;
    }
    interface IGCanvasShapeDeleteEventOpts<T extends Partial<IGCanvasShape> = IGCanvasShape> extends IGCanvasShapeBaseEventOpts<T> {
        resultPromise: JQueryPromise<any> | null;
    }
    interface IGCanvasLayerData {
        width: number;
        height: number;
        rotation: number;
        readonly defaultWidth: number;
        readonly defaultHeight: number;
        readonly defaultRotation: number;
    }
    /**
     * GCanvasLayerData - data storage for one canvas layer(one canvas object)
     *
     * @author Vlastimil Máca
     * @since 482.1.0.173
     */
    class GCanvasLayerData implements IGCanvasLayerData {
        canvasId: string;
        private _defaultWidth;
        private _defaultHeight;
        private _defaultRotation;
        shapes: (IGCanvasShapeMeta)[];
        width: number;
        height: number;
        rotation: number;
        constructor(canvasId: string, _defaultWidth: number, _defaultHeight: number, _defaultRotation?: number);
        static isRotated(rotation: number): boolean;
        updateDefaultDimensions(defaultWidth: number, defaultHeight: number, defaultRotation?: number): void;
        get defaultWidth(): number;
        get defaultRotation(): number;
        get defaultHeight(): number;
        addExistingObject<T extends IGCanvasShape = IGCanvasShape>(shape: IGCanvasShapeMeta<T>): JQuery.PromiseBase<IGCanvasShapeMeta<T>, never, never, never, never, never, never, never, never, never, never, never>;
        addObject(drawer: IGCanvasShapeDrawer, data: IGCanvasShape): JQuery.PromiseBase<IGCanvasShapeMeta<IGCanvasShape>, never, never, never, never, never, never, never, never, never, never, never>;
        getObjects<T extends IGCanvasShape = IGCanvasShape>(): IGCanvasShapeMeta<T>[];
        removeObject(objectIdx: number): JQueryPromise<any>;
        updateObject<TShape extends IGCanvasShape = IGCanvasShape>(shapeId: number, newData?: Partial<IGCanvasShapeMeta<Partial<TShape>>>): IGCanvasShapeMeta<TShape> | null;
        updateDimensions(newWidth: number, newHeight: number, newRotation?: number): void;
        static updateObjectDimensions(shapeData: IGCanvasShape, canvasWidthRatio: Decimal, canvasHeightRatio: Decimal): void;
        private updateObjectsDimensions;
    }
    /**
     * Meta data storage for one shape (data + other info needed for canvasDrawer)
     *
     * @author Vlastimil Máca
     * @since 482.1.0.173
     */
    interface IGCanvasShapeMeta<T extends Partial<IGCanvasShape> = IGCanvasShape> {
        shapeId: number;
        drawer: IGCanvasShapeDrawer<T>;
        resizable?: boolean;
        draggable?: boolean;
        rottable?: boolean;
        data: T;
    }
    /**
     * Data for canvas shape
     *
     * @author Vlastimil Máca
     * @since 482.1.0.173
     */
    interface IGCanvasShape {
        canvasId: string;
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
        readonly rotation: number;
        readonly defaultX: number | null;
        readonly defaultY: number | null;
        readonly defaultWidth: number | null;
        readonly defaultHeight: number | null;
        readonly defaultRotation: number | null;
        readonly widthScale: Decimal | null;
        readonly heightScale: Decimal | null;
        readonly roundDefaultValues?: boolean;
        readonly tooltip?: Gordic.Widget.IGTooltipOptions;
        changeDimensions(x: number, y: number, w: number, h: number): void;
        changeDefaultDimensions(x: number, y: number, w: number, h: number): void;
        setDefaultCanvasScale(widthScale: Decimal, heightScale: Decimal): void;
        updateCanvasScale(widthScale: Decimal, heightScale: Decimal): void;
        update?(obj: Partial<IGCanvasShape>): void;
        copy(): IGCanvasShape;
    }
    interface IGCanvasShapeOptions {
        roundDefaultValues?: boolean;
    }
    interface IGCanvasShapeDimensionOptions {
        x: number;
        y: number;
        width: number;
        height: number;
        rotation?: number;
        isDefaultDimensions?: boolean;
    }
    function isCanvasShape(obj: object): obj is IGCanvasShape;
    class GCanvasShape implements IGCanvasShape {
        options?: IGCanvasShapeOptions | undefined;
        constructor(canvasId: string | IGCanvasShape, dimensions?: IGCanvasShapeDimensionOptions, options?: IGCanvasShapeOptions | undefined);
        copy(): IGCanvasShape;
        x: number;
        y: number;
        width: number;
        height: number;
        rotation: number;
        defaultX: number | null;
        defaultY: number | null;
        defaultWidth: number | null;
        defaultHeight: number | null;
        defaultRotation: number | null;
        widthScale: Decimal | null;
        heightScale: Decimal | null;
        roundDefaultValues?: boolean;
        canvasId: string;
        tooltip?: Gordic.Widget.IGTooltipOptions;
        changeDimensions(x: number, y: number, w: number, h: number, r?: number): void;
        changeDefaultDimensions(x: number, y: number, w: number, h: number, r?: number): void;
        setDefaultCanvasScale(widthScale: Decimal, heightScale: Decimal): void;
        updateCanvasScale(widthScale: Decimal, heightScale: Decimal): void;
        private _rescaleRealDimensions;
        private _recalculateDefaultDimensions;
    }
    /**
     * Interface for canvas drawers. Enables start/stop of drawing and adding object by program.
     *
     * @author Vlastimil Máca
     * @since 482.1.0.173
     */
    interface IGCanvasDrawer {
        /**
         * Starts drawing with drawer, stops other ongoing drawings
         *
         * @param {IGCanvasShapeDrawer<T>} [drawer] drawer to draw with
         * @param {boolean} [drawImmediate] If user should  click&hold for start of drawing,
         *                                  set this to false(default).
         *                                  If user should only move mouse over layer and
         *                                  already see object and only place it with click - set to true.
         */
        startDrawing<T extends IGCanvasShape = IGCanvasShape>(drawer?: IGCanvasShapeDrawer<T>, drawImmediate?: boolean): void;
        stopDrawing(): void;
        drawObject<T extends IGCanvasShape = IGCanvasShape>(drawer: IGCanvasShapeDrawer<T>, rect: T, canvasContainer: JQuery): void;
        addObject<T extends IGCanvasShape = IGCanvasShape>(drawer: IGCanvasShapeDrawer<T>, rect: T, canvasWidth?: number, canvasHeight?: number, canvasRotation?: number): JQueryPromise<IGCanvasLayerData | null> | null;
        getObjectsFor<T extends IGCanvasShape = IGCanvasShape>(drawer: IGCanvasShapeDrawer<T>, meta: false): T[];
        getObjectsFor<T extends IGCanvasShape = IGCanvasShape>(drawer: IGCanvasShapeDrawer<T>, meta?: boolean): IGCanvasShapeMeta<T>[];
        removeObject(canvasId: string, shapeId: number): JQueryPromise<any> | null;
        scrollToObject(canvasId: string, shapeId: number, force?: boolean, focus?: boolean): void;
        updateObject<T extends IGCanvasShape = IGCanvasShape>(canvasId: string, shapeId: number, newData?: Partial<IGCanvasShapeMeta<Partial<T>>>): IGCanvasShapeMeta<T> | null;
        refreshCanvasLayer(canvasId: string, container?: JQuery): void;
        refreshCanvasLayers(container?: JQuery): void;
        resetActive(): void;
    }
    interface IGCanvasShapeDrawer<T extends Partial<IGCanvasShape> = IGCanvasShape> extends IGEvents {
        createShape(canvasId: string): T;
        drawCanvas(canvas: HTMLCanvasElement, shape: T, canvasData?: IGCanvasLayerData | null, isActiveDrawing?: boolean): void;
        active(opts: IGCanvasShapeActiveEventOpts<T>): JQueryPromise<any>;
        change(opts: IGCanvasShapeChangeEventOpts<T>): void;
        scale(opts: IGCanvasShapeScaleEventOpts<T>): void;
        delete(opts: IGCanvasShapeDeleteEventOpts<T>): JQueryPromise<any>;
        create(opts: IGCanvasShapeCreateEventOpts<T>): void;
        save(opts: IGCanvasShapeSaveEventOpts<T>): JQueryPromise<any>;
        visible(visible?: boolean): boolean;
    }
    abstract class GBaseShapeDrawer<T extends Partial<IGCanvasShape> = IGCanvasShape> implements IGCanvasShapeDrawer<T> {
        protected _visible: boolean;
        abstract createShape(canvasId: string): T;
        abstract drawCanvas(canvas: HTMLCanvasElement, shape: T, canvasData?: IGCanvasLayerData | null | undefined, isActiveDrawing?: boolean | undefined): void;
        on(eventName: string, fce: Function): this;
        off(eventName: string): this;
        constructor();
        active(this: this & GEvents, opts: IGCanvasShapeActiveEventOpts<T>): JQuery.Promise<any, any, any>;
        change(this: this & GEvents, opts: IGCanvasShapeChangeEventOpts<T>): void;
        scale(this: this & GEvents, opts: IGCanvasShapeScaleEventOpts<T>): void;
        delete(this: this & GEvents, opts: IGCanvasShapeDeleteEventOpts<T>): JQuery.Promise<any, any, any>;
        create(this: this & GEvents, opts: IGCanvasShapeCreateEventOpts<T>): void;
        save(this: this & GEvents, opts: IGCanvasShapeSaveEventOpts<T>): JQuery.Promise<any, any, any>;
        visible(visible?: boolean): boolean;
        private _returnResultPromise;
    }
    /**
     * GCanvas drawer - the master class, which takes drawers and handles multiple canvas layers and their shapes.
     *
     * @author Vlastimil Máca
     * @since 482.1.0.173
     */
    class GCanvasMasterDrawer implements IGCanvasDrawer {
        private element;
        currentContext: GCanvasContext | null;
        selectedDrawer: IGCanvasShapeDrawer | null;
        /** ImmediateDraw is situation, where user doesn't need
         *  to make mouse down to start drawing.
         *  Drawing is started by mousemove over canvas layer.
         */
        isImmediateDraw: boolean;
        currentCanvasId: string | null;
        private touch;
        private logger;
        constructor(element: JQuery);
        private testTouch;
        private beginDraw;
        private normalizeEventOffset;
        private _activateLayerForDrawing;
        /**
         * Draws object
         *
         * @param {IGCanvasShapeDrawer<T>} drawer drawer, which will draw the object
         * @param {T} rect dimensions of object + other data
         * @param {JQuery} [container] container, which contains canvasLayer with rect.canvasId
         * @param {boolean} isInteractive (default = false) False= automatic immediate draw into canvas, True = user drawing and moving over canvas
         */
        drawObject<T extends IGCanvasShape = IGCanvasShape>(drawer: IGCanvasShapeDrawer<T>, rect: T, container?: JQuery, isInteractive?: boolean): void;
        /**
         * Adds object to drawer. Without drawing it immediatly
         *
         * @param {IGCanvasShapeDrawer<IGCanvasShape>} drawer drawer which will draw the object
         * @param {IGCanvasShape} rect dimensions of object + other data
         * @param {number} [canvasWidth] dimensions of canvas (width), in which rect was drawn
         * @param {number} [canvasHeight] dimensions of canvas (height), in which rect was drawn
         */
        addObject<T extends IGCanvasShape = IGCanvasShape>(drawer: IGCanvasShapeDrawer<T>, rect: T, canvasWidth?: number, canvasHeight?: number, canvasRotation?: number): JQuery.PromiseBase<GCanvasLayerData, never, never, never, never, never, never, never, never, never, never, never> | null;
        /**
         * refreshCanvasLayer
         *
         * @param {string | GCanvasLayerData} canvasId Id of canvas to refresh
         * @param {JQuery} [container] JQuery of container, where canvasLayer is located
         */
        refreshCanvasLayer(canvasId: string | GCanvasLayerData, container?: JQuery): void;
        refreshCanvasLayers(container?: JQuery): void;
        private _resetActiveShape;
        private _setActiveShape;
        private normalizeRect;
        private restrictShapePosition;
        private static readonly _canvasTemplate;
        private _createCanvasElement;
        private _handleLayerRotation;
        private _calculateObjectsPosition;
        private _drawCanvasLayer;
        /** Sets new context for drawer - new set of layers and shapes */
        setNewContext(): void;
        /** Removes current context of drawer - forgets all layers and shapes */
        unsetContext(): void;
        /**
          * Starts drawing
          * @param drawer drawer to draw with
          * @param drawImmediate should wait for user to click& hold (false-default) or draw immediatly(true)
          */
        startDrawing(drawer?: IGCanvasShapeDrawer, drawImmediate?: boolean): void;
        /**
          * Stops drawing
          */
        stopDrawing(): void;
        /**
          * Removes object
          * @param {string} canvasId id of canvas, where object is located
          * @param {number} shapeId id of object to remove
          */
        removeObject(canvasId: string, shapeId: number): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never> | null;
        scrollToObject(canvasId: string, shapeId: number, force?: boolean, focus?: boolean): void;
        resetActive(): void;
        /**
          * Update data of object
          * @param {string} canvasId id of canvas, where object is located
          * @param {number} shapeId id of object to remove
          * @param {object} newData object with new data
          */
        updateObject<TShape extends IGCanvasShape = IGCanvasShape>(canvasId: string, shapeId: number, newData?: Partial<IGCanvasShapeMeta<Partial<TShape>>>): IGCanvasShapeMeta<TShape> | null;
        /**
          * Prepares canvas layer, this must be called before adding canvas shapes via drawObject method!
          *
          * @param {JQuery} container
          * @param {string} canvasId
          * @param {number} defaultWidth
          * @param {number} defaultHeight
          */
        prepareLayer(container: JQuery, canvasId: string, defaultWidth: number, defaultHeight: number, defaultRotation?: number, realWidth?: number, realHeight?: number, realRotation?: number): void;
        /**
          * Resizes dimensions of single canvas layer
          *
          * @param {string} canvasId
          * @param {number} newWidth
          * @param {number} newHeight
          */
        updateLayerDimensions(canvasId: string, newWidth: number, newHeight: number, rotation?: number): void;
        /**
          * Returns objects, which were drawn by given drawer.
          *
          * @param {IGCanvasShapeDrawer} drawer
          */
        getObjectsFor<T extends IGCanvasShape = IGCanvasShape>(drawer: IGCanvasShapeDrawer<T>, meta?: boolean): IGCanvasShapeMeta<T>[];
        destroy(): void;
        private readonly mainClassName;
        private readonly className;
    }
    interface IGCanvasLineShape extends CanvasDrawer.IGCanvasShape {
        path?: {
            x: number;
            y: number;
        }[];
        minHeight: number;
        maxHeight: number;
        minWidth: number;
        maxWidth: number;
        lineWidth: number;
    }
    class GCanvasLineShape extends GCanvasShape implements IGCanvasShape, IGCanvasLineShape {
        path?: {
            x: number;
            y: number;
        }[];
        minHeight: number;
        maxHeight: number;
        minWidth: number;
        maxWidth: number;
        lineWidth: number;
    }
    /**
     * GLineCanvasDrawer - WIP
     *
     * @author Vlastimil Máca
     * @since 482.1.0.173
     */
    class GLineCanvasDrawer extends GBaseShapeDrawer<IGCanvasLineShape> implements IGCanvasShapeDrawer<IGCanvasLineShape> {
        constructor();
        createShape(canvasId: any): GCanvasLineShape;
        drawCanvas(canvas: HTMLCanvasElement, shape: IGCanvasLineShape, canvasData?: IGCanvasLayerData | null, isActiveDrawing?: boolean): void;
    }
}
declare namespace Gordic.Widget.GAnonymizer {
    /**
     * Options for anonymizer
     *
     * @author Vlastimil Máca
     * @since
     */
    interface IGAnonymizerOptions {
        document?: IGAnonymizedDocumentDto;
        templates?: IGAnmTemplate[] | JQueryPromise<IGAnmTemplate[]> | (() => IGAnmTemplate[] | JQueryPromise<IGAnmTemplate>);
        templateSelected?: (selection: IGAnmTemplate[]) => JQueryPromise<IGPdfTextPage[]>;
        canBeOff?: boolean;
    }
    interface IGAnmTemplate {
        name: string;
        type: string;
    }
    interface IGAnonymizedAreaDto {
        id?: number;
        x: number;
        y: number;
        w: number;
        h: number;
    }
    interface IGRedactedField extends IGAnonymizedAreaDto {
        pageNumber: number;
    }
    interface IGPdfTextWord extends IGAnonymizedAreaDto {
        text?: string;
        isRedacted?: boolean;
    }
    interface IGAnonymizedPageDto extends IGPdfTextPage {
        areas: IGAnonymizedAreaDto[];
    }
    interface IGAnonymizedDocumentDto {
        pages: IGAnonymizedPageDto[];
    }
    interface IGAnonymizedDocument {
        getData(): IGAnonymizedDocumentDto;
        getRedactedFields(): IGRedactedField[];
    }
    interface IGAnonymizedPage {
        getData(): IGAnonymizedPageDto;
    }
    interface IGPdfTextPage {
        width: number;
        height: number;
        pageNumber: number;
        rotation: number;
        words: IGPdfTextWord[];
    }
    class GAnonymizedDocument implements IGAnonymizedDocument {
        private data;
        private _pageMap;
        pages: GAnonymizedPage[];
        hasOriginalPages: boolean;
        constructor(data?: IGAnonymizedDocumentDto);
        addPage(pageNumber: number, width: number, height: number, rotation?: number): GAnonymizedPage;
        getPage(pageNumber: number, width?: number, height?: number, rotation?: number): GAnonymizedPage | null;
        setOriginalPages(originalPages: IGPdfTextPage[]): void;
        getData(): IGAnonymizedDocumentDto;
        getRedactedFields(): IGRedactedField[];
    }
    /**
     * GAnonymizedPage
     *
     * @author Vlastimil Máca
     * @since 482.1.0.267
     */
    class GAnonymizedPage implements IGAnonymizedPage {
        private data;
        private originalPage;
        private anonymizedTextIndexes?;
        constructor(data: IGAnonymizedPageDto);
        getData(originalDimensions?: boolean): IGAnonymizedPageDto;
        getWords(): IGPdfTextWord[];
        getAnonymizedWordsIndexes(): number[] | undefined;
        setAnonymizedTexts(texts: IGPdfTextWord[], indexes?: number[]): void;
        anonymizeWord(wordIndex: number): void;
        setPageRotation(rotation: number): void;
        getRotation(): number;
        setOriginalPage(originalPage: IGPdfTextPage): void;
        getOriginalPage(): IGPdfTextPage;
        updateDimensions(newWidth: Decimal, newHeight: Decimal, targetRotation?: number): void;
        private updateWordDimensions;
    }
    /**
     * GAnonymizer
     *
     * @author Vlastimil Máca
     * @since 482.1.0.267
     */
    class GAnonymizer extends JQueryWidget<IGAnonymizerOptions> {
        static widgetName: string;
        static widgetCssName: string;
        private logger;
        private currentDocument;
        private currentDrawer;
        private redactShapeDrawer;
        private rectDrawActive;
        private textDrawActive;
        private actionList;
        refresh(): void;
        protected _getCreateOptions(): {
            canBeOff: boolean;
        };
        protected _setOption(key: string, value: any): void;
        static iconBuilder: Utils.IconBuilder;
        protected _create(): void;
        getRedactedFields(): IGRedactedField[];
        private _handleRotation;
        private _stopActiveOperations;
        private _startRectDraw;
        private _stopRectDraw;
        private _startTextDraw;
        private _stopTextDraw;
        protected _destroy(): void;
        setOriginalDocument(newTextLayer: IGPdfTextPage[]): void;
        private buildCustomTextLayer;
        private _handleTextLayerRotation;
        private initTextDrawing;
        private showTemplateSelection;
    }
    class GRedactShapeDrawer extends Components.CanvasDrawer.GBaseShapeDrawer {
        constructor();
        createShape(canvasId: string): Components.CanvasDrawer.GCanvasShape;
        drawCanvas(canvas: HTMLCanvasElement, shape: Components.CanvasDrawer.IGCanvasShape): void;
    }
}
interface JQuery {
    /**
     * ganonymizer
     *
     * @param {Gordic.Widget.GAnonymizer.IGAnonymizerOptions} [options]
     * @returns {JQuery}
     */
    ganonymizer(options?: Gordic.Widget.GAnonymizer.IGAnonymizerOptions): JQuery;
    ganonymizer(method: 'refresh'): JQuery;
    ganonymizer(method: 'setOriginalDocument', originalPages: Gordic.Widget.GAnonymizer.IGPdfTextPage[]): JQuery;
    ganonymizer(method: 'getRedactedFields'): Gordic.Widget.GAnonymizer.IGRedactedField[];
    ganonymizer(method: 'option'): Gordic.Widget.GAnonymizer.IGAnonymizerOptions;
    ganonymizer(method: 'option', values: Partial<Gordic.Widget.GAnonymizer.IGAnonymizerOptions>): JQuery;
    ganonymizer<K extends Extract<keyof Gordic.Widget.GAnonymizer.IGAnonymizerOptions, string>>(method: 'option', key: K): Gordic.Widget.GAnonymizer.IGAnonymizerOptions[K];
    ganonymizer<K extends Extract<keyof Gordic.Widget.GAnonymizer.IGAnonymizerOptions, string>>(method: 'option', key: K, value: Required<Gordic.Widget.GAnonymizer.IGAnonymizerOptions>[K]): JQuery;
    ganonymizer(method: 'instance'): Gordic.Widget.GAnonymizer.GAnonymizer;
}
declare namespace Gordic.Components {
    interface IGFieldAssistEnableOpts {
        enabled?: boolean;
        fieldTagVisible?: boolean;
    }
    class GFieldAssist {
        protected element: JQuery;
        protected static dialog: JQuery | null;
        protected currentStorage: Gordic.Data.IGStorage;
        static readonly defaultEnabledOpts: IGFieldAssistEnableOpts;
        static ignoreClass: string;
        static loaderClass: string;
        constructor(element: JQuery, stor: Gordic.Data.IGStorage);
        destroy(): void;
        protected registerLearning(): void;
        protected registerOpeners(enableOpts: IGFieldAssistEnableOpts): void;
        protected getFieldAssistProvider(target: any): IGFieldAssistProvider | null;
        enable(enableOpts: IGFieldAssistEnableOpts): void;
        showSuggestionDialog(provider: IGFieldAssistProvider): void;
        protected buildMenu(provider: IGFieldAssistProvider, fs: Data.IGStorage, dialogDiv: JQuery, opts?: {
            selectedIdx?: number;
        }): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        protected storedValuesToDisplayValues(provider: IGFieldAssistProvider, values: {
            value: any;
            template?: (string | JQuery);
            visible?: false;
        }[]): JQuery.Promise<{
            value: any;
            template: (string | JQuery);
            enabled?: false;
        }[]>;
        protected learnValue(provider: IGFieldAssistProvider, opts: {
            val: any;
            favorite?: boolean;
        }): Data.IGStorage | undefined;
        protected learnCurrentValue(provider: IGFieldAssistProvider, learnOpts?: any): any;
        protected limitValues(values: any, currFavCount: any): any;
        protected moveValue(provider: IGFieldAssistProvider, from: number, to: number): Data.IGStorage | undefined;
        protected removeValue(provider: IGFieldAssistProvider, opts: {
            idx: number;
        }): Data.IGStorage | undefined;
        protected valuesToParams(provider: IGFieldAssistProvider, valuesAndTemplates: any[], favCount: number, selectAct: GAction): MenuParams[];
        protected getProviderStorage(provider: IGFieldAssistProvider): Data.IGStorage | null;
        static createGFieldProvider(): IGFieldAssistProviderOptions;
        static createMultiGFieldProvider(opts: {
            fields: string | JQuery | (string | JQuery | {
                field: string | JQuery;
                watchChanges?: boolean;
            })[];
            scope?: JQuery;
            itemTemplate: IGFieldAssistProviderOptions['itemTemplate'];
        }): IGFieldAssistProviderOptions;
    }
    interface IGFieldAssistProviderOptions<TValue = any> {
        id: string | ((this: HTMLElement) => string);
        enabled?(this: HTMLElement): boolean;
        watchChanges?: boolean;
        getValue(this: HTMLElement): TValue | JQueryPromise<TValue>;
        setValue(this: HTMLElement, value: TValue): any;
        itemTemplate: string | ((this: HTMLElement, value: TValue) => string | JQuery | JQueryPromise<string | JQuery>);
    }
    interface IGFieldAssistProvider<TValue = any> extends IGFieldAssistProviderOptions<TValue> {
        element: JQuery;
    }
}
declare namespace Gordic.Components.GFieldAssist {
}
interface JQuery {
    gfieldassistcustom(): Gordic.Components.IGFieldAssistProviderOptions;
    gfieldassistcustom(command: "learn"): JQuery;
    gfieldassistcustom(opts: Gordic.Components.IGFieldAssistProviderOptions | null): JQuery;
}
declare namespace Gordic.Gui.WebControls {
    /**
     * Interface for suggested actions.
     */
    interface IGSuggestedAction {
        idName: string;
        /**
         * Listener function that will be called when the action is triggered.
         *
         * In case of GAction you need to make sure that setPending is set and the value reaches 100,
         *   otherwise the action will not be handled and removed from dispatcher.
         *
         * In case of IGExecuteWithPromise, the action is handled automatically and removed from dispatcher after successfull promise
         */
        params: IGMenuParamsActionWrapper | IGExecuteWithPromiseWrapper;
        captionLong: string;
        /**
         * Where to show the action
         * @default "all"*/
        target?: GSuggestedActionTarget;
        /** Grouping into categories*/
        grouppingCategory?: string;
        grouppingCategoryCaption?: string;
        /**
         * Specify group that will be handled as a whole if any group member handles the action.
         *
         * May come in handy when you have multiple actions that are related and you want to handle them as a group.
         *
         * For example, suggest multiple actions for a single task, and if one of them is handled, the others are removed from the dispatcher.
         */
        handlingGroup?: string;
        /** Force action to stay in suggestions after completion*/
        disableAutoHandling?: boolean;
    }
    /** SuggestedAction will be withPromise delegate instead of MenuParamsActions (that needs setPending)*/
    interface IGExecuteWithPromiseWrapper {
        /** Narrowing down the type for typescript and ease of use*/
        kind: "executeWithPromise";
        withPromise: IGExecuteWithPromise;
    }
    /** SuggestedAction will be with MenuParamsAction (needs active setPending to correctly handle action from dispatcher)*/
    interface IGMenuParamsActionWrapper {
        /** Narrowing down the type for typescript and ease of use*/
        kind: "menuParams";
        menuParams: MenuParamsAction;
    }
    /**
     * Executable Promise with caption. Can be used as a alternative to GAction without need of using setPending.
     */
    interface IGExecuteWithPromise {
        /**
         * Delegate function that will be called when the action is triggered. Returns promise.
         * @returns
         */
        execute: () => JQueryPromise<void>;
        caption: string;
        /**
         * Can be used for setting a predicate to check whether the action should be shown or not.
         * @returns
         */
        canExecute?: () => boolean;
    }
    function isExecuteWithPromise(params: IGMenuParamsActionWrapper | IGExecuteWithPromiseWrapper): params is IGExecuteWithPromiseWrapper;
    /**
     * type for suggested action targetting.
     */
    type GSuggestedActionTarget = "sidebar" | "flash" | "all";
    /**
     * Interface indicating that the class is interested in suggested actions subscription.
     */
    interface IGSuggestedActionsConsumer {
        get dispatcherState(): GSuggestionDispatcherState;
        interestedIn: GSuggestedActionTarget;
        subscribeDispatching(dispatcher: GSuggestedActionDispatcher): GSuggestionDispatcherState;
        unsubscribeDispatching(): GSuggestionDispatcherState;
        filteringPredicate: (action: IGSuggestedAction) => boolean;
    }
    /**
     * Dispatcher states
     */
    enum GSuggestionDispatcherState {
        Registered = 0,
        NotRegistered = 1
    }
    /**
     *
     */
    class GSuggestedActionSubcontent extends GContent implements IGSuggestedActionsConsumer {
        static readonly NAMESPACE: "ns-sugactions-sc";
        static readonly DEFAULT_UID: "scSugactions#";
        private static readonly DEFAULT_OPTIONS;
        get dispatcherState(): GSuggestionDispatcherState;
        private _dispatcherState;
        private readonly KEY_OPTIONS;
        private gaEnableAuto;
        private gaDisableAuto;
        prepareContent(): void;
        private dispatcher?;
        interestedIn: GSuggestedActionTarget;
        filteringPredicate: (action: IGSuggestedAction) => boolean;
        subscribeDispatching(dispatcher: GSuggestedActionDispatcher): GSuggestionDispatcherState;
        unsubscribeDispatching(): GSuggestionDispatcherState;
        private onUpdateHandler;
        private sidebarActions;
        private $suggestionForm;
        private _options;
        private recreateSuggestionForm;
        private enableAutoHandling;
        private disableAutoHandling;
        private _loadFromUserSettings;
        private _saveToUserSettings;
        private _destroy;
    }
}
declare namespace Gordic.Gui.WebControls {
    interface IGItemDispatcher<T> {
        publish(item: T): void;
        remove(item: T): void;
        subscribe(callback: (() => void)): void;
        unsubscribe(callback: (() => void)): void;
    }
    abstract class GItemDispatcherAbstract<T> implements IGItemDispatcher<T> {
        protected readonly itemsObs: GObservableArray<T>;
        constructor();
        get items(): ReadonlyArray<T>;
        abstract publish(item: T): void;
        abstract remove(item: T): void;
        subscribe(callback: (() => void)): void;
        unsubscribe(callback: (() => void)): void;
    }
    class GSuggestedActionDispatcher extends GItemDispatcherAbstract<IGSuggestedAction> {
        readonly id: string;
        constructor();
        private createId;
        /**
         * Publishes a new action to the dispatcher.
         *
         * @param action The action to publish.
         * @throws {GError} When an action with the same idName already exists.
         * @see addAction
         */
        publish(action: IGSuggestedAction): void;
        /**
         * Removes an action from the dispatcher.
         * @param action
         * @see removeAction
         * */
        remove(action: IGSuggestedAction): void;
        /**
         * Adds a new action to the dispatcher.
         * @param action
         * @throws {GError} When overwrite=false && action with the same idName already exists.
         */
        addAction(action: IGSuggestedAction, overwrite?: boolean): void;
        /**
         * Adds multiple actions to the dispatcher.
         * @param actions
         * @throws {GError} When action with the same idName already exists.
         * @see addAction
         */
        addRange(actions: IGSuggestedAction[], overwrite?: boolean): void;
        /**
         * handles actions by their handlingGroup and GAction.name,
         * if handelingGroup is not set nor the action has menuParams, it handles only the action
         * @param action
         */
        handleActions(action: IGSuggestedAction): void;
        /**
         * Handles the action by removing it from ObservableArray
         * @param action
         */
        removeAction(action: IGSuggestedAction): void;
        removeAction(idName: string): void;
        removeActionGroup(item: IGSuggestedAction, deletePredicate?: (item: IGSuggestedAction, index: number, array: IGSuggestedAction[]) => boolean): void;
        removeAllActions(): void;
        reset(): void;
        subscribe(callback: () => void): void;
        unsubscribe(callback: () => void): void;
        unsubscribeAll(): void;
        /**
         * Gets the current actions array (readonly).
         * @returns
         */
        getActions(): ReadonlyArray<IGSuggestedAction>;
    }
}
declare namespace Gordic.Gui.WebControls {
    class GSuggestedActionFlash implements IGSuggestedActionsConsumer {
        static readonly EVENT_NAMASPACE: "ns-suggested-actions-flash";
        static readonly FLASH_CLASS: "css-suggested-actions-flash";
        private static readonly FLASH_ID;
        private readonly defaultDispatcher;
        constructor();
        interestedIn: GSuggestedActionTarget;
        filteringPredicate: (action: IGSuggestedAction) => boolean;
        subscribeDispatching(dispatcher?: GSuggestedActionDispatcher): GSuggestionDispatcherState;
        unsubscribeDispatching(): GSuggestionDispatcherState;
        private onUpdateHandler;
        initializeWithParentContent(parentCont: GContent): GSuggestedActionFlash;
        private get isInitialized();
        private flashActions;
        private flashActPtr;
        private actionsLengthBeforeUpdateHandler;
        private dispatcher;
        private _dispatcherState;
        get dispatcherState(): GSuggestionDispatcherState;
        private $flash;
        private $flashContent;
        private _parentCont;
        private gactions;
        private initFlashIfNotExists;
        private _showFlashAction;
        private updateArrowsEnabled;
        private get isLeftArrowEnabled();
        private get isRightArrowEnabled();
        private _destroy;
    }
}
declare namespace Gordic.Gui.WebControls {
    /**
     * Simple observable array with listeners delegate functions that are called after array update.
     */
    class GObservableArray<T> implements Iterable<T> {
        private _array;
        private listeners;
        set array(value: T[]);
        /**
         * Return the current state of the array as a readonly (directly changing the state of array is not allowed)
         */
        get array(): ReadonlyArray<T>;
        /**
         * Subscribe a callback listener to be notified when the array changes.
         * Methods that includes notification are: push, pop, addRange, removeAt, clear.
         * @param listener callback function that is called when the array changes
         */
        subscribe(listener: () => void): void;
        unsubscribe(listener: () => void): void;
        unsubscribeAll(): void;
        push(item: T): void;
        pop(): T | undefined;
        addRange(items: T[]): void;
        removeAt(index: number): T | undefined;
        clear(): void;
        /** {@link Array.findIndex} */
        findIndex(predicate: (item: T, index: number, array: T[]) => boolean): number;
        get(index: number): T | undefined;
        set(index: number, item: T): void;
        get length(): number;
        [Symbol.iterator](): Iterator<T>;
        forEach(callback: (item: T, index: number, array: T[]) => void): void;
        reduce<U>(callback: (accumulator: U, currentValue: T, index: number, array: T[]) => U, initialValue: U): U;
        filter(predicate: (item: T, index: number, array: T[]) => boolean): T[];
        notify(): void;
    }
}
declare namespace Gordic.Widget {
    interface DropzoneOptions {
        disabled?: boolean;
        dragLeave?: JQuery.EventHandler<HTMLElement>;
        dragEnter?: JQuery.EventHandler<HTMLElement>;
        processingDroppedFilesComplete?: (fileList?: FileList | null) => void;
        processingPastedFiles?: (fileList?: FileList | null) => void;
    }
    interface DropzoneManagerOptions extends DropzoneOptions {
        dropzoneElements?: HTMLElement[];
    }
    class GDropzoneManager {
        private dropzones;
        private dragLeave?;
        private dragEnter?;
        private processingPastedFiles?;
        private processingDroppedFilesComplete?;
        constructor(options: DropzoneManagerOptions);
        addDropzones(elements: HTMLElement[] | null): void;
        addDropzone(element: HTMLElement): void;
        removeDropzones(elements: HTMLElement[] | null): void;
        removeDropzone(element: HTMLElement): void;
    }
    /** moznost na odchytavani udalosti paste napr na body elementu
     * $("body").on("paste", (ev) => {
     *   let target = ev.target;
     *   let firstDr = $(target).closest(".gdropzone");
     *   let files = ((ev.originalEvent as any)?.clipboardData?.files as FileList) ?? new FileList();
     *   let dropzone = firstDr.length === 0 ? $(document.activeElement ?? document.body).closest(".gdropzone") : firstDr;
     *   if (dropzone.length === 1 && dropzone.gdropzone("isAllowed") && files.length > 0) {
     *       dropzone.gdropzone("option", "processingPastedFiles")?.(files);
     *       ev.preventDefault();
     *   }
     * });
     */
    /**
     * Dropzona
     */
    class GDropzone extends JQueryWidget<DropzoneOptions> {
        static widgetName: string;
        static widgetCssClass: string;
        _isAllowed: boolean;
        _create(): void;
        _init(): void;
        private isIE;
        private isSafari;
        private isValidFileDrag;
        private containsTarget;
        activate(): void;
        deactivate(): void;
        isAllowed(): boolean;
        destroy(): void;
    }
}
interface JQuery {
    gdropzone(options?: Gordic.Widget.DropzoneOptions): JQuery;
    gdropzone<K extends Extract<keyof Gordic.Widget.DropzoneOptions, string>>(method: "option", key: K): Gordic.Widget.DropzoneOptions[K];
    gdropzone(method: "isAllowed"): boolean;
    gdropzone(method: "activate"): void;
    gdropzone(method: "deactivate"): void;
    gdropzone(method: "destroy"): void;
}
/**
 * Enum umístění
 * @author pnovak
 * @since 490.1.0.179
 */
declare enum PlaceEnum {
    /** v menu */
    menu = 1,
    /** v commandBaru*/
    command = 2
}
/**
 * Data přednastavení
 * @author pnovak
 * @since 490.1.0.179
 */
interface IGStoredPreset<T = any> {
    /**
     * Jméno
     * @type {string}
     */
    name: string;
    /**
     * Data
     * @type {T}
     */
    data?: T;
    /**
     * nazvy pouzitych poli
     * @type {string[]}
     */
    usedNames?: string[];
}
/**
 * Nastavení
 * @author pnovak
 * @since 490.1.0.179
 */
interface IGPresetSettings {
    /**
     * Vybrané přednastavení
     * @type {string}
     */
    favorite?: string;
    /**
     * Příznak na vyvolání delegáta controlElementLeave z options (při opustění definovaných polí z controlElements)
     * @type {boolean}
     */
    findInitValue?: boolean;
    /** je novy?*/
    new: boolean;
    /** automaticky oblíbené?*/
    autoFavorite?: boolean;
    /**skrývat prázdné hodnoty*/
    hideEmpty?: boolean;
    /**umožnit uložení prázdných hodnot*/
    saveEmpty?: boolean;
}
/**
 * Přednastavení
 * @author pnovak
 * @since 490.1.0.179
 */
interface IGPreset<T = any> {
    /**
     * Uložiště přednastavení
     * @type {ObjectLiteral<IGStoredPreset<T>>}
     */
    stored?: ObjectLiteral<IGStoredPreset<T>>;
    /**
     * Nastavení
     * @type {IGPresetSettings}
     */
    settings?: IGPresetSettings;
    /**
     * Vypnuté notifikace
     */
    disableNotification?: boolean;
}
/**Options přednastavení*/
interface GPresetOptions<T> {
    /**
     * Delegát před aplikací dat
     * @type {<T>(value: T)}
     * @default> JQuery.Promise<T>
     */
    beforeApply?: <T>(value: T) => JQuery.Promise<T>;
    /**
     * Delegát spouštěný před nastavením dat do dialogu (slouží většinou k doladění modelu)
     * @type {<T>(value: T)}
     * @default> JQuery.Promise<T>
     */
    initDelegate?: <T>(value: T) => JQuery.Promise<T>;
    /**
     * Předané políčka, která slouží jako "řídící" při přechodu na další pole. Obsluha jedné hodnoty v závislém políčku
     * @type {JQuery}
     */
    controlElements?: JQuery;
    /**
     * Delegát, který se volá při opuštění políčka uvedené v controlElements
     * @type {JQuery.TypeEventHandler<HTMLElement, undefined, HTMLElement, HTMLElement}
     */
    controlElementLeave?: JQuery.TypeEventHandler<HTMLElement, undefined, HTMLElement, HTMLElement, "focusout.gpreset">;
    /**
     * Titulek dialogu, pokud není uveden, použije se název "Přednastavení"
     * @type {string | null}
     */
    title?: string | null;
    /**
     * Políčka ze kterých se bude tvořit nabídka pro přednastavení
     * @type {JQuery}
     */
    elements?: JQuery;
    /**
     * Umístění akce přednastavení
     * @type {PlaceEnum | MenuParams[] | JQuery}
     */
    placeTo?: PlaceEnum | MenuParams[] | JQuery;
    /**
     * Předávané uživatelské nastavení
     * @type {string | false | Gordic.Data.IGStorage | null}
     */
    userSettings?: string | false | Gordic.Data.IGStorage | null;
    /**
     * Options flashpanelu - je možné zobrazit flashpanel
     * @type {GFlashOptions}
     */
    flashPanel?: GFlashOptions;
    /**
     * Delegát pro nastavení hodnot do uživatelského nastavení. V případě, že je definovaný, je nutné mít definovaný také renewDelegate, jinak při refresh přednastavení nastane výjimka.
     * @type {(this: Gordic.Widget.GPreset<any>)}
     * @default > JQuery.Promise<any>
     */
    setDelegate?: (this: Gordic.Widget.GPreset<any>) => JQuery.Promise<any>;
    /**
     * Delegát pro vlastni zobrazeni hodnot hodnot do uživatelského nastavení.
     * @type {(this: Gordic.Widget.GPreset<any>)}
     * @param {string} viewPresetName Název přednastavení, které se má zobrazit
     * @default > JQuery.Promise<any>
     */
    viewDelegate?: (this: Gordic.Widget.GPreset<any>, viewPresetName: string) => JQuery.Promise<any>;
    /**
     * Delegát na refresh dat přednastavení. V případě, že je nastavený delegát pro nestandardní uložení přednastavení (setDelegate), je nutné mít definovaný renewDelegate, jinak při refresh přednastavení nastane výjimka.
     * @type {(this: Gordic.Widget.GPreset<any>}
     * @param {IGPreset<T>} actualPreset Aktuální přednastavení, které se má obnovit
     * @default > JQuery.Promise<T>
     */
    renewDelegate?: (this: Gordic.Widget.GPreset<any>, actualPreset: IGPreset<T>) => JQuery.Promise<T>;
    /**
     * Delegát pro aplikaci přednastavení
     * @type {(ev}
     * @param {T} preValues Předané hodnoty, které se mají aplikovat
     * @default > JQuery.Promise<boolean>
     */
    apply?: (ev: any, preValues: T) => JQuery.Promise<boolean>;
    /**
     * Možnost povolení k uložení aktuálních dat přednastavení
     * @type {boolean}
     */
    renewData?: boolean;
    /**
     * Možnost spuštění akce change při aplikaci přednastavení
     * @type {boolean}
      */
    triggerChange?: boolean;
    /**
     * Prvotní nastavení, zda má být přednastavení oblíbeno při uložení - tuto volbu je možné uživatelsky přepnout (nastavení)
     * @type {boolean}
     */
    autoFavorite?: boolean;
}
/**
 * Defaultní záznam přednastavení
 * @author pnovak
 * @since 490.1.0.179
 */
interface IGOldPresetDefaultRecord {
    /**Titulek - Název řádku/políčka*/
    title?: string | null;
    /**Jméno políčka*/
    name: string;
    /**Hodnota*/
    value: string | void | HTMLElement | JQuery<HTMLElement> | null;
    /**Model políčka*/
    model: any | null;
    /**ID záznamu*/
    id: number | null;
    /**Bližší identifikace políčka*/
    path?: string | null;
}
declare namespace Gordic.Widget {
    /**Utils přednastavení*/
    namespace GPresetUtils {
        class PresetNode {
            private fields;
            constructor();
            /**
             * Získání jména políčka
             * @param {JQuery} el políčko
             */
            getTitle(el: JQuery): string;
            /**
             * Získání záznamů z předaných políček
             * @param {JQuery} elements Políčka
             */
            getRecords(elements: JQuery, saveEmptyValues?: boolean, useDisabledFields?: boolean): any;
        }
        /**
         * Získání záznamů pro přednastavení
         * @param {JQuery} elements Políčka
         */
        function prepareData(elements: JQuery, saveEmptyValues?: boolean, useDisabledFields?: boolean): any;
        /**
         * Uložení dat do uživatelského nastavení
         * @param {Gordic.Data.IGStorage} userSettings Uživatelské nastavení
         * @param {any} records data
         * @param {{ name?: string, id?: string, usedNames?: string[]}} options Možné nastavení k přetížení, není-li uvedeno, uloží k naposledy použitému (nastavenému) přednastavení
         */
        function saveRecordsToUserSettings(userSettings: Gordic.Data.IGStorage, records: any, options?: {
            settings?: {
                autoFavorite: boolean;
                hideEmpty: boolean;
                saveEmpty: boolean;
            };
            name?: string;
            id?: string;
            usedNames?: string[];
            setAsFavorite?: boolean;
            merge?: boolean;
        }): void;
        function setFavorite(userSettings: Gordic.Data.IGStorage, id: string): void;
        function removePreset(userSettings: Gordic.Data.IGStorage, id: string): boolean;
        function getFormWithPresetName(userSettings: Data.IGStorage, initVal?: {
            id: string;
            name: string;
        }): Gordic.Forms.Form;
    }
    /**
     * Výchozí pohled přednastavení - zjednodušené
     * @author pnovak
     * @since 490.1.0.179
     */
    class GPresetContent extends GContent implements IGClientContent {
        private usedPresetName?;
        private useDisabledFields;
        prepareContent(params: {
            flashPanel?: GFlashOptions;
            settings: {
                autoFavorite: boolean;
                hideEmpty: boolean;
                saveEmpty: boolean;
            };
            userSettings: Gordic.Data.IGStorage;
            elements: JQuery;
            controlElements?: JQuery;
            initDelegate?: <T>(dto: T) => JQueryPromise<T>;
        }): void;
    }
    /**
    * Výchozí pohled přednastavení - zjednodušené
    * @author pnovak
    * @since 490.1.0.179
    */
    class GPresetPreviewContent extends GContent implements IGClientContent {
        private useDisabledFields;
        prepareContent(params: {
            flashPanel?: GFlashOptions;
            settings: {
                autoFavorite: boolean;
                hideEmpty: boolean;
                saveEmpty: boolean;
            };
            userSettings: Gordic.Data.IGStorage;
            elements: JQuery;
            presetName: string;
            initDelegate?: <T>(dto: T) => JQueryPromise<T>;
        }): void;
    }
    /**
     * Widget přednastavení
     *
     * @author pnovak
     * @since 490.1.0.179
     */
    class GPreset<T extends {}> extends JQueryWidget<T, GPresetOptions<any>> {
        static widgetName: string;
        static widgetCssClass: string;
        static storedHistoricalData: string;
        private presetAct;
        private menu;
        private favoriteActions?;
        private usePresetActions?;
        private checkField?;
        private lastUsedAction;
        protected content: JQuery;
        protected userSettings: Gordic.Data.Storage;
        protected _create(): void;
        refreshPresetMenu(): void;
        private waitForValues;
        private getPresetSettings;
        private buildMenu;
        /**
         * apply
         *
         * @returns {JQueryPromise<boolean>} - aplikovano
         */
        apply(args?: PresetArgs): JQueryPromise<void>;
        getPreset(args?: PresetArgs): {
            name: string;
            data?: T;
        } | null;
        set(visualSet?: boolean): void;
        private _set;
        private markUsedPreset;
        merge(args?: SavePresetArgs): void;
        save(args?: SavePresetArgs & {
            merge?: boolean;
        }): void;
        renew(userSettings?: Gordic.Data.IGStorage): JQuery.Promise<any, any, any>;
        destroy(): void;
        protected _destroy(): void;
    }
}
interface PresetArgs {
    /**
     * Uživatelské nastavení
     * @type {Gordic.Data.IGStorage}
     */
    userSettings?: Gordic.Data.IGStorage;
    /**
     * Id použitého přednastavení
     * @type {string}
     */
    usedPreset?: string;
}
interface SavePresetArgs {
    /**
     * Uživatelské nastavení
     * @type {Gordic.Data.IGStorage}
     */
    userSettings?: Gordic.Data.IGStorage;
    /**
     * Id ukládaného přednastavení
     * @type {string}
     */
    id?: string;
    /**
     * jméno ukládaného přednastavení
     * @type {string}
     */
    name?: string;
    /**
     * Záznamy
     * @type {any}
     */
    records?: any;
}
interface JQuery {
    gpreset<TRow = any>(...options: GPresetOptions<TRow>[]): this;
    /**
     *  Aplikování přednastavení
     * @param {"apply"} method
     * @param {PresetArgs} [args]
     * @returns {JQueryPromise<boolean>}
     */
    gpreset(method: "apply", args?: PresetArgs): JQueryPromise<boolean>;
    /**
     * Spuštění přednastavení - Jestliže není uvedený v options setDelegate, pak se zobrazí výchozí pohled na přednastavení
     * @param visualSet Má vizuální prezentaci?
     */
    gpreset(method: "set", visualSet?: boolean): any;
    /**
     * Uložení uživatelského nastavení
     * @param method
     * @param args
     */
    gpreset(method: "save", args?: SavePresetArgs & {
        merge?: boolean;
    }): any;
    /**
     * Merge uživatelského nastavení
     * @param method
     * @param args
     */
    gpreset(method: "merge", args?: SavePresetArgs): any;
    /**
     * Refresh přednastavení
     * @param {"renew"} method
     * @param {Gordic.Data.IGStorage} [userSettings] Uživatelské nastavení
     * @returns {JQueryPromise<void>}
     */
    gpreset(method: "renew", userSettings?: Gordic.Data.IGStorage): JQueryPromise<void>;
    /**
     * Úklid přednastavení
     */
    gpreset(method: "destroy"): any;
    /**
     * Instance
     */
    gpreset(method: "instance"): Gordic.Widget.GPreset<any>;
    /**
     * Metoda pro získání uložených dat
     *
     * @param {PresetArgs} [args] uzivatelské nastavení a id k získání uložených dat
     * @returns {T} uložená data
     */
    gpreset<T = any>(method: "getPreset", args?: PresetArgs): {
        name: string;
        data: T;
    } | null;
    /**
     * Vyvolání změny menu podle aktuálního uživatelského nastavení (this.userSettings)
     */
    gpreset(method: "refreshPresetMenu"): any;
}
