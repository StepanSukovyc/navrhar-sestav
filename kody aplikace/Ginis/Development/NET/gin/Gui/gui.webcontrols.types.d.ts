/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       gui.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Gui.WebControls\Gordic.Gui.WebControls.csproj
*    created     2026-02-16 14:36:56
*    files       Scripts\_ROZTRIDIT\CustomTypes.d.ts
*                Scripts\_ROZTRIDIT\Gordic.Global.d.ts
*                Scripts\gfilterpanel.d.ts
*                Scripts\gactions.d.ts
*                Scripts\gcontent-0.1.0.d.ts
*                Scripts\gdlg-0.1.0.d.ts
*                Scripts\gresizemanager.d.ts
*                Scripts\gjquery-0.2.0.d.ts
*                Scripts\GDocument.d.ts
*                Scripts\gdatepicker.d.ts
*                Scripts\gformfields.d.ts
*                Scripts\gforms.d.ts
*                Scripts\gforms.editor.d.ts
*                Scripts\gisl.d.ts
*                Scripts\gdataservice.d.ts
*                Scripts\gstor.d.ts
*                Scripts\ggrid.d.ts
*                Scripts\gwizardsimple.d.ts
*                Scripts\ginlinedialog.d.ts
*                FileService\GFilePreviewDto.d.ts
*                Scripts\GSignCreateConfig.d.ts
*                Scripts\gactions.gbadge.d.ts
*                Scripts\gactions.gbutton.d.ts
*                Scripts\gactions.gstatic.d.ts
*                Scripts\gactions.gloadlink.d.ts
*                Scripts\gactions.gcolorpickerfield.d.ts
*                Scripts\gcontrols-0.1.0.d.ts
*                Scripts\gautofit.d.ts
*                Scripts\gcollapsible.d.ts
*                Scripts\ggrid.editors.d.ts
*                Scripts\gactions.glink.d.ts
*                Scripts\gfilepreview.d.ts
*                Scripts\gpreview.d.ts
*                Scripts\gpidbar.d.ts
*                Scripts\gsidebar.d.ts
*                Scripts\gshortcuts.d.ts
*                Scripts\gswitcher.d.ts
*                Scripts\gnotification.d.ts
*                Scripts\gnotificationlist.d.ts
*                Scripts\gdatecombobox.d.ts
*                AsyncTasks\GAsyncInitDto.d.ts
*                GLog\GLogMessageRequestDto.d.ts
*                GLog\GLogEventDto.d.ts
*                GLog\GLogInitDto.d.ts
*                Scripts\UserSettingsForms.d.ts
*                ServiceContents\DTO\GSelectorSettingsDto.d.ts
*                Scripts\GAsync.d.ts
*                PublicLogin\Dto\GForgottenPasswordRequestFormDto.d.ts
*                PublicLogin\Dto\GChangePasswordFormDto.d.ts
*                PublicLogin\Dto\GNewPasswordFormDto.d.ts
*                PublicLogin\Dto\GPublicLoginConfigDto.d.ts
*                PublicLogin\Dto\GPublicUserDto.d.ts
*                PublicLogin\Dto\GGetNiaRequestOutputDto.d.ts
*                PublicLogin\Dto\GAresDataDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\_ROZTRIDIT\CustomTypes.d.ts 

/** Definice generického Object literal */
interface ObjectLiteral<T> { [key: string]: T }
interface ObjectLiteralNumber<T> { [key: number]: T }

/** Obohacení vestavěného interface Object o ObjectLiteral akceptující any hodnotu */
//interface Object extends ObjectLiteral<any> { }

type Primitive = string | number | boolean | void;

/** Generický konstruktor */
interface Constructor<T> extends Function {
    new (): T;
    new (...args: any[]): T;
    prototype: T;
}
interface JQueryEventListener {
    (event: JQueryEventObject, ...params: any[]): void | boolean;
}
interface JQueryEventListener1<T=any> {
    (event: JQueryEventObject, param1: T): void | boolean;
}
interface JQueryEventListener2<T=any,U=any> {
    (event: JQueryEventObject, param1: T, param2: U): void | boolean;
}
interface JQueryEventListener3<T=any,U=any,V=any> {
    (event: JQueryEventObject, param1: T, param2: U, param3: V): void | boolean;
}

type Falsy = undefined | null | false | 0 | "";
interface AnyFunction {
    (...args: any[]): any;
}
declare namespace Gordic.Consts {
    class DbShortcuts {
        static uus?: string;
        static ico?: string;
        static nks?: string;
        static ucs?: string;
    }
}

/** Typ muze byt Date nebo string (string byva po nacteni dat ze serveru, prevod proved pres parseDate()) */
type JsonDate = Date | string;

/** Typ muze byt Decimal nebo string (number byva po nacteni dat ze serveru, string po provedeni JSON.stringify(), prevod proved pres parseDecimal()) */
type JsonDecimal = Decimal | string;

/** Base64String, na strance C# odpovida GBlob */
type JsonBlob = string;

/**
 * Selects all properties from T except properties named in K
 * 
 * @author Vlastimil Máca
 * @since 480.1.0.293
 */
type GOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Makes properties named in K required
 * 
 * @author Vlastimil Máca
 * @since 480.1.0.293
 */
type RequiredProperties<T, K extends keyof T> = Required<Pick<T, K>> & GOmit<T,K> // TODO TS3.5+ Omit

/**
 * Makes properties named in K optional/partial
 * 
 * @author Vlastimil Máca
 * @since 480.1.0.293
 */
type PartialProperties<T, K extends keyof T> = Partial<Pick<T, K>> & GOmit<T,K> // TODO TS3.5+ Omit

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

declare namespace JQueryUI {
    interface WidgetOptions {
        create?: (event: JQueryEventObject) => any; //JQ36
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\_ROZTRIDIT\Gordic.Global.d.ts 

/**
 * This is @internal
 */

/** Standardní gordické css styly */
type GState = "info"
    | "success"
    | "warning"
    | "error"
    | "important"

/**
* Rozsahove DTO (CSharpove definovano v Gordic.General.ApplicationInterface)
*/
interface GIntervalDto<TValue> {
    /** Zacatek intervalu */
    start?: TValue;

    /** Konec intervalu */
    end?: TValue
}


//interface Decimal extends decimal.Decimal { }

interface IGExceptionInfoMinimal {
    message?: string;
    /**
     * DEPRECATED: pouzijte property 'message'
     * @type {string}
     */
    shortMessage?: string;
    completeMessage?: string;
    title?: string;
    target?: "window" | "toast" | "hidden";
    handled?: boolean;
    /**
     * Doplnujici data
     * @type {ObjectLiteral<any>}
     */
    data?: ObjectLiteral<any>;
}

interface IGExceptionInfo extends IGExceptionInfoMinimal {
    allocatedMemory: number;
    applicationInfoText: string;
    applicationInfoTitle: string;
    authorizationAttemptText: string;
    authorizationAttemptTitle: string;
    baseMessage?: string;
    completeMessage: string;
    compName: string;
    containsNonFatal: boolean;
    databaseInfoText: string;
    databaseInfoTitle: string;
    databaseName: string;
    databaseServerName: string;
    databaseServerVersion: string;
    databaseTestFrom: string;
    databaseType: string;
    details: string;
    errCode: number;
    faze: string;
    gdiHandles: number;
    httpInfoText: string;
    httpInfoTitle: string;
    implementationInfoText: string;
    implementationInfoTitle: string;
    implementationName: string;
    implementationNote: string;
    implementerMail: string;
    implementerPhoneNo: string;
    is32Bit: boolean;
    is64Bit: boolean;
    isAzure: boolean;
    isNonFatal: boolean;
    licAdr: string;
    longMessage: string;
    message: string;
    nazevFun: string;
    nazevIns: string;
    nazevRef: string;
    nonFatalMessage: string;
    oledbProviderVersion: string;
    oledbProviderVersionStatus: string;
    profile: string;
    providerType: string;
    revize: string;
    revizeAdz: number;
    revizeDnp: string;
    serCisErr: number;
    sessionInfoText: string;
    sessionInfoTitle: string;
    shortMessage: string;
    stackTrace: string;
    stackTraceTitle: string;
    subVerze: number;
    subVerzeDb: number;
    systemName: string;
    systemTime: string; // DateTime
    title: string;
    url: string;
    user: string;
    userHandles: number;
    useUnicode: boolean;
    verze: number;
    verzeDb: number;
    whenAuthorizationAttempt: boolean;
    whenAuthorized: boolean;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gfilterpanel.d.ts 

//////////////////////////////////////////////////////////////////////////
// gfilterpanel
//////////////////////////////////////////////////////////////////////////

//interface IGFilterPanelOptions<TData = any> extends Gordic.Widget.WidgetOptions {
//    /** filtrovací formuláře    (nutné nechat jeden bod v layout descriptoru na favorite piny L-3-8-1 M-12-11-1 S-12-11-1) */
//    forms: Gordic.Forms.Form[],
//    /** formulář v saving dialogu  */
//    saveOptionsForm?: Gordic.Forms.Form | "eko" | "all" | null,
//    /** (pouze v detailu) -inicializařní pole - při nefunkčním GStore  se použije jako default (pole s jmeny řádků oblíbených (tedy to co se píše k row, ne name fieldu) */
//    favorites?: string[],
//    /** descriptor pro oblíbené */
//    favoriteLayoutDescriptor?: string,

//    /** (pouze v detailu) -resolver pro načítání a ukládání pojmenovaných filtrů poviné metody na něm jsou [ getFilters() , saveFilter(), removeFilter()   ]; */
//    filterStorageService?: IGFilterStorageService,
//    detailMode?: string,
//    /** cesta nebo instance gstoru kam se ukládají oblíbené, pokud nevyplněno použije se tento default (při dvouch filtrech na detailu musí být unikátní) */
//    /** budouci David si vyresi typ string | Gordic.Data.StorageSection */
//    userSettings?: any

//    /**
//     * [OBSOLETE] Použijte option filterViewMode nastavený na hodnotu FilterViewMode.Simple.
//     * Příznak, zda se má vytvočit řádek s pojmenovanýmy filtry a rozšířením nebo jen všechny řádky formou oblíbených.
//     * @type {boolean}
//     */
//    simpleMode?: boolean,

//    /** klíč pod který se budou ukládat oblíbené v simplemodu, zároveň aktivuje funkci volby oblíbených v simplemodu*/
//    idSimpleMode?: string,

//    /** Při vyhledávání se vyvolá tato metoda. Na vstup dostane jako první parametr eventu a jako druhý object s filtrem  parametry(ev, {filter:data})  */
//    apply?: (ev: JQueryEventObject, o: { filter?: TData }) => void,

//    /** template na výběrovem selextboxu filtru */
//    filterItemTemplate?: string,
//    /** helpertemplate na výběrovem selextboxu filtru */
//    filterHelperItemTemplate?: string,
//    textItemTemplate?: string,
//    /** možnost řídit nabídku pojmenovaných masek */
//    helperCustomizer?: any,
//    key?: any,
//    helperColumns?: string[],
//    /** tema kreré se bude používat ve stroageservice */
//    tema?: string,
//    customClass?: string,
//    /** funkce kterou zavolám po přidání defaultního filtru */
//    userDefaultFilter?: boolean,
//    /** Objekt podle kterého bude vyhledáno hned při create gfilterpanelu pokud nebude mít uživatel zvolen userdefault */
//    hardDefaultFilter?: any, 
//     /** Objekt podle kterého bude vyhledáno hned při create gfilterpanelu přebije userDefault i hardDefault */
//    hardFilter?: any,
//    /** True => Při načítání z UserFiltru nebo HardFiltru, se pouze předplní do panelu ale nevyvolá se vyhledávání. */
//    strictStopAutoLoad?: boolean,

//    /** přídá tlačítko vyhledat při začených oblíbených přidáno na žádost bohouše */
//    searchButtonOnMainRow?: boolean,

//    /** funkce která se zavolá těsně před odesláním vyhledávání dat, na vstup přijdou sezbíraná data které lze libovolně modifikovat    */
//    collectData?: (event: JQueryEventObject, o: { data: any }) => void,
//    /** funkce která se zavolá těsně před appplyem modelu do formulářů  */
//    applyData?: (o: any) => void,
//    /** funkce která se zavolá těsně před vykreslením badge */
//    badgeData?: (ev: JQueryEventObject, o: { pocet: number; tooltip: string; data: any; }) => void, 
//    /** funkce která se zavolá těsně před uložením ,lze modifikovat uložená data */
//    saveData?: (o: any) => void,
//    formbuilded?: (ev: JQueryEventObject, o: any) => void,
//    reset?: (ev: JQueryEventObject, o: any) => void
//    /** vratí promise který čeká na načtení políček v detailu a v resolve vrátí data*/
//    waitForDetail?: () => JQueryPromise<any>,

//    /**
//     * (default: Normal) Mód zobrazení filtru.
//     * @type {FilterViewMode}
//     */
//    filterViewMode?: FilterViewMode,

//    /**
//     * (default: $.content("main").IxsFunAkt) Identifikátor funkce aktuálně přihlášeného uživatele.
//     * Slouží pro ukládání favorite hodnoty ze selectboxu výběru předdefnovaných filtrů.
//     * Jestliže není naplňeno, pak se čte z $.content("main").IxsFunAkt o jehož nastavení se stará Gordic.Gui.WebApp.GWebAppGinis.
//     * Pokud není vyplňeno ani to (např9klad u hybridů), pak není možné označit položky selectboxu hvězdičkou. 
//     * @type {string}
//     */
//    ixsFunAkt?: string
//}

//interface JQuery {
//  gfilterpanel<TData = any>(options: IGFilterPanelOptions<TData>, ...otherOptions: Partial<IGFilterPanelOptions<TData>>[]): JQuery;
//    gfilterpanel(method: "destroy"): JQuery;
//    /**
//     * Metoda pro aplikování filtru. Jako vstupní parametr se posílá object filtru i s daty podmínek, lze nechat i parametr prázdný nebo null, v tomto případě se použijí data z posledního vyhledávání.
//     * Po aplikování této metody se provede rovnou vyhledávání. Pokud je automatické vyhledání nežádoucí zadejte druhý parametetr doNotSearch jako true.
//     * Pokud tuto metodu používáte například jako přednastavování políček, tak parametrem "checkIfIsSetDefault=true" povolíte kontrolu, která kontroluje zda již neproběhlo nastavení pomocí uživatelského defaultního filtru. Pokud ano, tak váš přikaz bude ignorovat.
//     *
//     * @author DSebesta
//     *
//     * @param {"applyFilter"} method
//     * @param {ObjectLiteral<any>} [filter] Celý objekt filtru.
//     * @param {boolean} [doNotSearch] true = autmoatické vyhledávání vypnuto.
//     * @param {boolean} [checkIfIsSetDefault]  true = kontrola zda již neproběhlo nastavení pomocí uživatelského defaultního filtru.
//     *
//     */
//    gfilterpanel(method: "applyFilter", filter?: ObjectLiteral<any>, doNotSearch?: boolean, checkIfIsSetDefault?: boolean): JQuery
//    gfilterpanel(method: "getConfirmedData"): { filter: any } | null
//    gfilterpanel(method: "waitForDetail"): JQueryPromise<any> 
//    gfilterpanel(method: "getForm"): JQuery
//}

//interface IGFilterStorageService {
//    //NOTE: Pouzit generika???
//    getFilters(parametry: any): JQueryPromise<any>;
//    saveFilter(obj: any): JQueryPromise<any>;
//    removeFilter(obj: any): JQueryPromise<any>;
//}

///**
// * Mód zobrazení filtru ve filterpanelu.
// * 
// * @author  TFeik
// * @date    07.01.2019
// * @since   482.1.0.848
// */
//declare const enum FilterViewMode {
//    /** Filtr obsahuje pouze předvybraná políčka. */
//    Simple, 

//    /** Filtr obsahuje selectbox pro vybrání uloženého filtru a při kliknutí na filtr zobrazí vybrané ("oblíbené") položky pro filtrování. */
//    Normal,

//    /** Filtr obsahuje selectbox pro vybrání uloženého filtru a při kliknutí na filtr rozbalí "detail" se všemi položky k filtrování (neobsahuje "oblíbené"). */
//    Detail 
//}

declare namespace Gordic.Gin.FilterStorageService {

    interface IGFilterStorageServiceOptions {
        tema?: string;
        parentContent?: GContent | undefined | null;
    }

    /**
     * storage pro gfilterpanel
     * @autor DSebesta
     */
    class Store implements IGFilterStorageService {
        constructor(options?: IGFilterStorageServiceOptions)
        getFilters(parametry: any): JQueryPromise<any>
        saveFilter(obj: any): JQueryPromise<any>
        removeFilter(obj: any): JQueryPromise<any>
        setParentContentIfNull(parentContent: GContent): void
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gactions.d.ts 

//////////////////////////////////////////////////////////////////////////
// GAction
//////////////////////////////////////////////////////////////////////////
/**
*/
type CaptionVisibility = "never" | "normal" | "important" | "exclusive" | "always"

interface GActionParamsDefObjBase extends ObjectLiteral<any> {
    /** Nazev akce, je urcen nazvem property, v ktere je tento objekt */
    name?: string
    /** popisek akce (default "") */
    caption?: string | null;
    /** preferovana viditelnost textu u ikony pro ovl. prvky s dynamickou velikosti (mozno pouzit enum GAction.captionVisibility, defaultni je GAction.captionVisibility.normal (odpovida 0)) */
    captionVisible?: CaptionVisibility;
    /** popis akce (default "") */
    tooltip?: string | null;
    /** nazev skupiny, do ktere akce spada (default "") */
    groupName?: string
    /**  nazev tridy, ktera je vkladana na registrovane ovl. prvky (default "")  */
    customClass?: string
    /** ikona (po gordikovsku) (default "gin/nic") */
    icon?: string | string[]
    /** priznak checked (default false) */
    checked?: boolean
    /** priznak povolena (default true) */
    enabled?: boolean
    /** priznak viditelnosti (default true) */
    visible?: boolean
    /** Opravneni */
    permission?: Gordic.General.ApplicationInterface.GPermission
    /** Klicova slova oddelena strednikem */
    keywords?: string;
}

interface GActionParamsDefObj extends GActionParamsDefObjBase {
    /** funkce, ktera je spustena na run (default undefined) */
    run(this: GAction, event: JQueryEventObject, ...runData: any[]): void    /** parametry, ktere se vlozi do fce run (default undefined)) */
    runData?: Array<any>
}

interface GActionParams extends GActionParamsDefObj {
    /** povinne - nazev akce (unikatni nazev - pro vyhledani v parametrech menu apod.) */
    name: string
}

interface GActionInternal {
    /** popisek akce (default "") */
    caption: string;

    /** preferovana viditelnost textu u ikony pro ovl. prvky s dynamickou velikosti (mozno pouzit enum GAction.captionVisibility, defaultni je GAction.captionVisibility.normal (odpovida 0)) */
    captionVisible: CaptionVisibility;

    /** popis akce (default "") */
    tooltip: string;

    /** nazev skupiny, do ktere akce spada (default "") */
    groupName?: string;

    /** nazev tridy, ktera je vkladana na registrovane ovl. prvky (default "") */
    customClass?: string

    /** ikona (po gordikovsku) (default "gin/nic") */
    icon?: string | string[];

    /** klicova slova oddelena strednikem nebo carkou */
    keywords?: string;
}

declare class GAction implements GActionInternal {
    constructor(params: GActionParams)
    static actionPropertyName: string
    static actionUpdatedTrigger: string
    static captionVisibility: {
        /** popisek se nezobrazi, ani pokud je dostatek mista */
        never: "never"

        /** normalni chovani. Popisek se skryva jakmile dojde misto */
        normal: "normal"

        /** important popisky se zacnou skryvat, pokud dojde misto a vsechny "normal" popisky jsou jiz skryte */
        important: "important"

        /** je-li dostatek mista, zobrazi pouze caption, pokud neni dostatek mista, zobrazi pouze ikonu */
        exclusive: "exclusive"

        /** popisek musi byt viditelny vzdy. Pokud dojde misto, skryje se cela akce, ale nikdy nezustane ikona samotna (toto chovani maji vsechny akce bez ikony) */
        always: "always"
    }
    static defaultParams: GActionParams
    static emptyIcon: string
    static runIgnoredClassName: string

    /** Nazev akce, je urcen nazvem property, v ktere je tento objekt */
    readonly name: string;

    /** popisek akce (default "") */
    readonly caption: string;

    /** preferovana viditelnost textu u ikony pro ovl. prvky s dynamickou velikosti (mozno pouzit enum GAction.captionVisibility, defaultni je GAction.captionVisibility.normal (odpovida 0)) */
    readonly captionVisible: CaptionVisibility;

    /** popis akce (default "") */
    readonly tooltip: string;

    /** nazev skupiny, do ktere akce spada (default "") */
    groupName?: string;

    /** nazev tridy, ktera je vkladana na registrovane ovl. prvky (default "") */
    readonly customClass?: string

    /** ikona (po gordikovsku) (default "gin/nic") */
    readonly icon?: string | string[];

    /** klicova slova oddelena strednikem */
    keywords?: string;

    /** zaregistrovani ovl. prvku a udalosti, ktere ji spusti (s defaultni update funkci) */
    register(element: JQuery | HTMLElement, events: string[]): void
    register(element: JQuery | HTMLElement, events: string[], replace?: boolean, useDefaultUpdateFunc?: boolean): void;
    register(element: JQuery | HTMLElement, events: string[], replace?: boolean, useDefaultUpdateFunc?: boolean, updateImmediately?: boolean, actionContext?:ObjectLiteral<any>): void;

    /** odpojeni udalosti od ovl. prvku */
    unregister(element?: JQuery, event?: string): void
    /** Spuštění akce okamžitě */
    run(): void
    /** Okamzite spusteni akce s predanim contextu */
    run(obj: ObjectLiteral<any>): void;
    /** Definování funkce spuštěné na danou akci */
    run(eventData: Object, eventCallback: (event: JQueryEventObject) => void): void
    /** Definování funkce spuštěné na danou akci */
    run(eventData: Object, obj: any): void
    /** Nastaví aktivnost všem napojeným ovl. prvkům */
    enabled(forceState: boolean): boolean
    /** Vrátí aktuálně nastavenou aktivnost akce */
    enabled(): boolean
    /** Nastaví viditelnost všem napojeným ovl.prvkům */
    visible(forceState: boolean): JQuery
    /** Vrátí aktuálně nastavenou viditelnost akce */
    visible(): boolean;
    /**
     * Upravi vybrane vlastnosti akce, navazane ovl. prvky na to mohou nebo nemusi reagovat.
     * @param options
     */
    update(options: GActionParamsDefObjBase): void;

    /**
     * Upravi opravneni (enabled a tooltip)
     * 
     * @param {Gordic.General.ApplicationInterface.GPermission} permission
     */
    updatePermission(permission?: Gordic.General.ApplicationInterface.GPermission | null): void;
    /**
     * Upravi opravneni (enabled a tooltip)
     * 
     * @param {T | null | undefined} permission
     * @param {keyof T} prop
     */
    updatePermission<T extends Gordic.General.ApplicationInterface.GPermissionSet>(permission: T | null | undefined, prop: keyof T): void;

    /**
     * Permission (upraveni enabled a tooltip). Pro nastaveni volejte metodu updatePermission().
     * @type {Gordic.General.ApplicationInterface.GPermission}
     */
    readonly permission?: Gordic.General.ApplicationInterface.GPermission;

    /**
     * Nastaví akci že je checked.
     */
    checked(forceState?: boolean): boolean|undefined
    /**
     * Vrátí jestli je akce ve stavu checked.
     */
    checked(): boolean | undefined;
    [key: string]: any
    /**
     * setPending - promise nebo 0-99 = progress state, 100=success, <0 = fail, null = vypnuto
     * 
     * @param {number|JQuery.Promise<any, any} state
     * @returns {this}
     */
    setPending(state: number|JQuery.Promise<any, any, number>|null): this;
    
}

declare type GActionListBarParams = MenuParams | string | GAction | null | undefined;

declare interface IGActionList {
    add(params: GActionParams): GAction

    add(action: GAction): GAction
    add(caption: string, run: Function): GAction
    add(name: string, caption: string, run: Function): GAction
    add(caption: string, params: GActionParams, run: Function): GAction
    add(name: string, caption: string, params: GActionParamsDefObj, run: Function): GAction
    addRange(actions: Array<GAction | GActionParams> | { [akceName: string]: GAction | GActionParamsDefObj } | GActionList): GActionList

    /**
     * Pomucka pro vytvoreni definice menu / commands z existujicich akci
     * Jako polozky pole lze pouzit:
     * 1. 'actAkce1' ... nazev akce
     * 2. 'Dokumenty' ... staticky text
     * 3. 'actAkce2*' ... akce / static oznaceny jako favorite
     * 3a.'actAkce2!' ... akce / static oznaceny jako primary
     * 3b.'<actAkce2' ... akce / static umisteny jako opposite (stejne jako "<actAkce2")
     * 3b.'>actAkce2' ... autofocus
     * 4. '-' ... separator
     * 5. content.actions.actSchvalit ... instance existujici akce
     * 6. new GAction() ... instance nove akce
     * 7. { type:'html', html:'<p></p>'} ... normalni menuparam
     * 8. ['Ulozit jako', 'actSaveAs', 'actSaveAsXml'] ... static se dvema children (lze pouzit vse vyse zminovane)
     * 
     * @param {Array<GActionListBarParams | GActionListBarParams[]>} normalBar pole akci v menu
     * @param {Array<GActionListBarParams | GActionListBarParams[]>} [oppositeBar] pole akci v menu
     * @param {boolean} [isAllFavorites] (default=false) priznak, ze vsechny pridavane polozky jsou zaroven favorite
     * @returns {MenuParams[]} list
     */
    createBar(normalBar: Array<GActionListBarParams | GActionListBarParams[]>, oppositeBar?: Array<GActionListBarParams | GActionListBarParams[]>, isAllFavorites?: boolean): MenuParams[];
    getActions(filter?: (value: GAction, index: number, array: GAction[]) => any): Array<GAction>
    //[actionName: string]: any;
}

declare type GActionList = IGActionList & Partial<ObjectLiteral<GAction>>;

declare const GActionList: {
    new(actions: GAction[], persistentParams?: GActionParams): GActionList 
    new(actionMap: { [actionName: string]: GActionParamsDefObj }): GActionList
}


//////////////////////////////////////////////////////////////////////////
// GObservableObject
//////////////////////////////////////////////////////////////////////////

/**
 * Creates object, which update of properties can be observed by callback registrations.
 *
 * @author BMartinek
 *
*/
declare type GObservableObject<TObject> = {

    [P in keyof (TObject & IGObservableObject<TObject>)]: (TObject & IGObservableObject<TObject>)[P];
}

declare interface IGObservableRegisterUpdate<TObject> {
    (this: IGObservableObject<TObject> & Partial<TObject>, o: Partial<TObject>): void;
}

declare interface IGObservableObject<TObject> {
    /**
     * Sets object props to current object props and invokes update on registered update functions.
     * @param {TObject} o Object with new data to set on current object.
    */
    update(o?: Partial<TObject>): void

    /**
     * Registers update function to be called on update of values.
     * @param {GObservableObject~updateCallback} func
     */
    registerUpdate(func: IGObservableRegisterUpdate<TObject>): void

    /**
     * Unregisters registered update function
     * @param {GObservableObject~updateCallback} func
     */
    unregisterUpdate(func: (o: Partial<TObject>) => void): void

    /**
     * This is callback, which is fired when update is called.
     *
     * @callback GObservableObject~updateCallback
     * @param {object} o Object with new data, that was set to current object
     **/
}

declare const GObservableObject: {
    new <TObject>(obj: TObject): GObservableObject<TObject>
}

declare interface IGObservableList<TObjectType=any> {
    add(name: string, observable: GObservableObject<TObjectType> | TObjectType): void
    addRange(observableObjects: ObjectLiteral<GObservableObject<TObjectType> | TObjectType> | (GObservableObject<TObjectType> | TObjectType)[]): void
    update(names: string[], objectToExtend?: object): void
    update(objectToExtend?: object): void
    remove(name: string);
}

declare type GObservableList<TObjectType=any> = IGObservableList<TObjectType> & Partial<ObjectLiteral<GObservableObject<TObjectType>>>

declare const GObservableList: {
    new <TObjectType>(): GObservableList<TObjectType>
}

//////////////////////////////////////////////////////////////////////////
// GMenu
//////////////////////////////////////////////////////////////////////////

interface MenuParams {
    action?: GAction
    actionContext?: any
    after?: string
    align?: MenuParamAlignType
    badge?: GBadgeOptions | GObservableObject<GBadgeOptions>
    before?: string
    caption?: string
    ariaCaption?: string
    captionVisible?: CaptionVisibility
    customClass?: string
    enabled?: boolean
    favorite?: boolean
    /**
     * Poradi v oblibenych polozkach (pouze vychozi nastaveni)
     * @type {number}
     */
    favoriteOrder?: number
    html?: string | HTMLElement | JQuery
    children?: MenuParams[]
    icon?: string | string[]
    id?: string
    position?: "top" | "right" | "bottom" | "left"
    parent?: string
    props?: ObjectLiteral<any>
    tooltip?: string
    type?: MenuParamType;
    init?(this: MenuParams): JQuery
    /** Default = true  */
    menuActivationIcon?: boolean
    visible?: boolean
    /** Priorita zobrazeni v rozsahu 0 - 20 (dojde-li misto vybrane ovl. prvky podle toho zacnou skryvat ty vnorene ovl. prvky, ktere maji nizsi prioritu) */
    visiblePriority?: number
    primary?: boolean
    /** Alternativni zobrazeni */
    alt?: MenuParams;
    /** Ovl. prvek, který má mít focus po otevření dialogu (dle w3c by to měl mít input, button, select a textarea). Akt. bude fungovat jen v commandBaru. */
    autofocus?: true;
}

type MenuParamType = "action" | "static" | "separator" | "category" | "html" | "panel" | "widget";

interface MenuParamsAction extends MenuParams {
    action: GAction
}

interface MenuParamsWidget extends MenuParams {
    type: "widget";
    init?: (this: MenuParamsWidget, dependency?: MenuParamsWidget) => JQuery;
    //beforeAppend?: MenuWidgetCallbackType;
    //beforeDetach?: MenuWidgetCallbackType;
}

/** Zvlastni typ menuParam, pomoci ktereho lze urcit zavisly menuParam typu 'widget'. Property 'dependency' musi odpovidat property 'id' zavisleho menuParam. */
interface MenuParamsWidgetDepended extends MenuParamsWidget {
    dependency: string;
}

type MenuParamAlignType = "normal" | "opposite";
type MenuWidgetCallbackType = (this: MenuParamsWidget, widget: JQuery, dependency?: MenuParamsWidget) => void;

//////////////////////////////////////////////////////////////////////////
// gtasklist
//////////////////////////////////////////////////////////////////////////
interface JQuery {
    gtasklist(options: GTasklistOptions): JQuery;
    /**
     * gtasklist
     * 
     * @param {"setActive"} method
     * @param {string} id
     * @param {boolean} [autorun] default = false
     * @returns {JQuery}
     */
    gtasklist(method: "setActive", id: string, autorun?: boolean): JQuery;
    gtasklist(method: "refresh"): JQuery;
    gtasklist(method: "collapse"): JQuery;
    gtasklist(method: "expand"): JQuery;
    gtasklist(method: "collapsev", includeIds, excludeIds);
    gtasklist(method: "loadProfile"): Gordic.Utils.Menu.IGMenuProfile|null;
    gtasklist(method: "saveProfile", profile?: Gordic.Utils.Menu.IGMenuProfile | null): JQuery;
    gtasklist(method: "isCustomizationEnabled"): boolean;
    /** Vraci aktualne zobrazovane MenuParams[] */
    gtasklist(method: "getParams"): MenuParams[];

    //TODO: Pridat dalsi, az dle potreby (mozna budou az v novem tasklistu)
    gtasklist(method: string, ...params: Array<any>): any; //TODO: doplnit options dle ostatnich widgetu
}

interface GTasklistOptions {
    params: MenuParams[];

    header?: {
        /** Zkratka modulu */
        applicationAbbr: string,

        /** Revize modulu */
        applicationRevision: string
    },

    /** Zda se ma otevrit zabaleny (default = false) */
    collapsed?: boolean;

    /** Zpozdeni tooltipu v ms (default = 1000) */
    tooltipDelay?: number;

    /** Doba rozbalovani/sbalovani podmenu v ms (default = 200) */
    scrollbarSlideDelay?: number;

    userSettings?: Gordic.Data.IGStorage;

    /** Kompletace menuParams pred vykreslenim (default=true0 */
    prepareDataOnInit?: boolean;

    /** Udalost pred vykreslenim tasklistu k modifikaci obsahu */
    internalBeforeRefresh?: (ev: JQuery.Event, mp: MenuParams[]) => void;

    /** Moznost nastavit jednotlivym akcim vlastni URL */
    createActionUrl?: (mp: MenuParams) => string | JQueryPromise<string>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gcontent-0.1.0.d.ts 

//////////////////////////////////////////////////////////////////////////
// GContent
//////////////////////////////////////////////////////////////////////////

interface GContentInitializer {
    className?: string
    serverParams?: Object
    params?: Object
    logOptions?: Gordic.Diagnostics.IGLogOptions
    [key: string]: any
}

type BreadCrumb = MenuParams & { defaultAction?: boolean }; 

interface JQueryAjaxSettingsExtend extends JQueryAjaxSettings {
    onException?(exc: IGExceptionInfo);
    progressState?: IGClientProgressOptions | false;
} 

/*type gjqXHR<TReturn> = JQuery.Promise3<
    TReturn, JQuery.jqXHR, TReturn | JQuery.jqXHR,
    JQuery.Ajax.SuccessTextStatus, JQuery.Ajax.ErrorTextStatus | "validation" | "exception", JQuery.Ajax.TextStatus | "validation" | "exception",
    JQuery.jqXHR<TReturn>, string | IGExceptionInfo, string | IGExceptionInfo | JQuery.jqXHR<TReturn>>;*/
type gjqXHR<TReturn> = JQuery.Promise3<
    TReturn, JQuery.jqXHR, never,
    never, JQuery.Ajax.ErrorTextStatus | "validation" | "exception", never,
    never, /*IGExceptionInfo*/ObjectLiteral<any>, never>;

type GJQGErrPromise<TReturn> = JQuery.Promise3<
    TReturn, GError, never,
    never, JQuery.Ajax.ErrorTextStatus | "validation" | "exception", never,
    never, GError, never
>;

declare class GContent<TContentType = IGContentBase, T=any> extends GEvents{
    constructor(contentInitializer: string | GContentInitializer, contentDiv?: HTMLElement | JQuery, userSetting?: Gordic.Data.IGStorage)
    constructor(contentInitializer: string | GContentInitializer, userSetting?: Gordic.Data.IGStorage)
    constructor(contentInitializer: [TContentType, T]);
    constructor(contentInitializer: ObjectLiteral<any>, args?: any);

    //[property: string]: any // Vynucení striktní defnice všech funkcí a property na contentu.
    actions: GActionList
    ajaxOptions: JQueryAjaxSettings
    autoLoadParams?: ObjectLiteral<any> | null
    call<TCall = T>(method: string, args?: ObjectLiteral<any> | null, inputParams?: ObjectLiteral<any>, ajaxOptions?: JQueryAjaxSettingsExtend): gjqXHR<TCall>
    fire<TCall = T>(method: string, args?: ObjectLiteral<any> | null, inputParams?: ObjectLiteral<any>, ajaxOptions?: JQueryAjaxSettingsExtend): gjqXHR<TCall>
    clearSessionOnClose: boolean

    contentDiv: HTMLElement
    customMenus: Object
    dialogs: GDlgNamespace
    element: JQuery
    readonly breadcrumbs: BreadCrumb[] | null;
    readonly className: string;
    readonly classNameState: "string";
    readonly isLoadedUserSettings: boolean;
    /** Content byl inicializovan (konstruktor + prepareContent). */
    readonly readyAwait: GJQGErrPromise<this>;
    readonly loaded: boolean;
    readonly loading: boolean;
    readonly loadingAwait: JQuery.Promise<void>;
    readonly parentContent?: GContent;
    readonly serviceName: string;
    readonly closed: boolean;
    public taskId?: string;
    public title?: string;
    public icon?: string;
    public uid?: string;
    public id: string;
    public backgroundWorker: boolean;
    readonly log: Gordic.Diagnostics.GLog;
    public logOptions?: Gordic.Diagnostics.IGLogOptions;
    /**
     * context volani GPC (NIKDY UVNITR NIC NEMENIT)
     * @type {ObjectLiteral<string>}
     */
    readonly gpc: ObjectLiteral<string>;
    readonly gpcToken: string; 
    readonly gpcChallenged: null | JQueryPromise<void>;
    /**
     * Klient pro kontextove volani ISL
     * @type {Gordic.Isl.Client}
     */
    readonly isl: Gordic.Isl.Client;
    readonly asyncTasks: Gordic.Async.IGTaskManagerProxy;
    load(inputParams?: Object, call?: Object, options?: Object): JQueryPromise<any>

    /**
     * Nastavi/upravi CommandBar contentu.
     *
     * @param {MenuParams[]} menu Seznam polozek (tlacitek) CommandBaru.
     */
    commandBar(menu: MenuParams[] | null): void;

    /** Precte aktualni commandBar */
    commandBar(): MenuParams[] | null;

    /**
     * Nastavi/upravi MenuBar contentu.
     *
     * @param {MenuParams[] } menu Seznam polozek (tlacitek) MenuBar.
     */
    menuBar(menu: MenuParams[] | null): void;

    /** Precte aktualni menuBar */
    menuBar(): MenuParams[] | null;

    /**
     * Nastavi/upravi statusBar contentu.
     *
     * @param {MenuParams[]} bar Seznam polozek (tlacitek) statusBaru.
     */
    statusBar(bar: MenuParams[] | null): void;

    /** Precte aktualni statusBar */
    statusBar(): MenuParams[] | null;


    /**
     * Otevre novy content jako podrizenou aktivitu (bude zobrazena na plose hlavni aplikace, prekryvajici content z nejz byla aktivita otevrena, s provazanim zavislosti).
     *
     * @param contentInitializer
     * @param inputParams
     * @param options
     */
    navigate<TParams = ObjectLiteral<any>>(contentInitializer?: string | object | IGClientContentObject | (string | ObjectLiteral<any>)[], inputParams?: TParams, options?: GDialogOptions): JQuery;

    /**
     * Nastaví breadcrumbs (navigationBar) na tomto contentu na pozadovanou hodnotu. Vysledny navigationBar zobrazí breadcrumbs posbirane ze vsech contentu v chainu.
     *
     * @param {BreadCrumb | BreadCrumb[] | null} breadcrumbs [{caption: "Seznam"}, {caption: "Dokument 123"}]
     */
    setBreadcrumbs(breadcrumbs: BreadCrumb | BreadCrumb[] | null): void

    /**
     * Zobrazi Flash informaci (rychla informace, ktera typicky po case zmizi).
     *
     * @param {string} content Zobrazovana informace.
     * @param {string?} state stav [info(default), success, warning, error, important].
     * @param {string?} id identifikator pro moznost dohledani (napr. pro hideFlash(id) ).
     * @param {GFlashOptions} options paramaetry panelu
     */
    showFlash(options: GFlashOptions): void
    showFlash(content: string, state?: GState, id?: string): void

    /**
     * !!!!OBSOLETE!!!!
     * @deprecated !!!!OBSOLETE!!!!
     */
    showFlash(label: string, state?: string, timer?: 0 | number | null, id?: string): void

    /**
     * Schová Flash s informací
     * @param {string} id Identifikátor flashe
     */
    hideFlash(id: string): void;
    trigger(eventName: string, ...args: any[]): void

    /**
     * priznak, ze content je v kaskade dulezitym mylnikem. Typicky se jedna o aktivitu/dialog a lze u nej ocekavat navratovou hodnotu. Mezi insignificant contenty patri servisni contenty, vnorene contenty, contenty na zalozkach/sidebarech, aj. 
     * 
     * @returns {boolean}
     */
    isSignificant(): boolean

    /**
     * podminene zavre vsechny podrizene significant contenty (aktivity, dialogy, viz isSignificant())
     * 
     * @returns {JQueryPromise<any>}
     */
    tryCloseAllSignificants(): JQueryPromise<any>
    /**
     * Zadost o uzavreni okna. Typicky se vola pri pokusu zavrit okno UZIVATELEM (krizkem na dialogu, odhlasenim z aplikace, prepnuti ulohy, apod.)
     * Vyvolava delegata "closing()" pokud existuje, od ktereho ocekava navratovou hodnotu okna, nebo promise teto hodnoty.
     * @param returnValue Návratová hodnota, která bude předána na vstup closing funkce
     * @returns {JQueryPromise<any>} Promise hodnoty pro zavreni okna. Resolvnuty promise znamena, ze okno bylo uzavreno. Failnuty promise znamena, ze zustalo otevreno.
     */
    tryClose(returnValue?:any): JQueryPromise<any>

    /**
     * OBSOLETE content.tryCloseAllChildContents bude brzy zruseno! Castecne nahrazeno content.tryCloseAllSignificants. Pokud volate jako soucast breadcrumbu, zkopirovali jste obsolete kod - ODSTRANIT
     * @deprecated OBSOLETE content.tryCloseAllChildContents bude brzy zruseno! Castecne nahrazeno content.tryCloseAllSignificants. Pokud volate jako soucast breadcrumbu, zkopirovali jste obsolete kod - ODSTRANIT
     */
    tryCloseAllChildContents(): JQueryPromise<any>

    /**
     * Návrat dat z obsahu (a zavření dialogového okna, pokud je obsah v Dialogu).
     *
     * @param {any} returnValue Návratová hodnota.
     */
    close(returnValue?: any): GContent
 
    /**
     * isolatedUserSettings
     * true znamena, ze content se pokusi defaultne ulozit jako root objekt.
     * false znamena, ze se objekt pokusi defaultne ulozit do nadrizeneho contentu.
     * @default false
     * @type {boolean}
     */
    isolatedUserSettings: boolean;
    userSettings?: Gordic.Data.IGStorage | null
    globalSettings?: Gordic.Data.IGStorage | null

    /**
     * čte vlastnost contentu, nebo nejbližším parentu (až k main). Umožňuje definovat kontextovou hodnotu na libovolnem contentu, ale v případě potřeby její hodnotu "přepsat" na některém podřízeném contentu
     * 
     * @param {string} propName nazev promenne
     * @param {*} newValue nova hodnota promenne (pokud neni uveden, jedna se o getter)
     * @param {boolean} [shared=false] zda se nova hodnota propise na objekt, na kterem je vlastnost definovana (=true), nebo se ulozi vzdy na this content (=false)
     * @returns {*} hodnotu vlastnosti na tomto, nebo parent prvcich (getter); this (setter)
     */
    prop(propName: string): any;
    prop(propName: string, newValue: any): GContent;
    prop(propName: string, newValue: any, shared: boolean): GContent;

    /**
     * Vrati content, na kterem je uvedena vlastnost definovana (postupuje nahoru pres parentContent). NULL pokud neni definovana na zadnem contentu
     *
     * @param {string} propName nazev promenne
     * @returns {?GContent}
     */
    propObject(propName: string): GContent | null;

    /**
     * Agresivni metoda pro zmenu GPC! Zavira vsechna podrizena okna, defaultne se pokusi vyvolat reload
     * 
     * @param {object} gpc
     * @param {boolean} [reload=true] zda se ma automaticky vyvolat load
     * @param {Object} reload parametry loadu 
     * @returns {JQueryPromise}
     */
    changeContext(gpc: object): JQueryPromise<object>;
    changeContext(gpc: object, reload: boolean): JQueryPromise<object>;
    changeContext(gpc: object, reload: Object): JQueryPromise<object>;

    /**
     * OBSOLETE: pouzijte prop()
     * @deprecated OBSOLETE: pouzijte prop()
     */
    contextProp(propName: string): any;

    /** Defaultni formular */
    defaultForm?: JQuery;

    /** Pridani noveho oznameni */
    notification(method: "add", not: IGNotificationOptions, showToast?: boolean | IGNotificationToastOptions, forceRefresh?: boolean): IGObservableNotificationOptions;

    /** Zobrazeni toastu bez zarazeni do seznamu notifikaci */
    notification(method: "showToast", not: IGNotificationOptions, options?: IGNotificationToastOptions): IGObservableNotificationOptions;

    /** Ziskani seznamu vsech oznameni v aplikaci. */
    notification(method: "get"): GObservableNotificationOptions[];

    /** Ziskani seznamu vsech notifikaci, ktere vznikly na tomto contentu. */
    notification(method: "getLocals"): GObservableNotificationOptions[];
    
    /** Odstrani oznameni z widgetu i z DOM */
    notification(method: "remove", id: string | GObservableNotificationOptions): void; //vraci widget gnotificationlist

    /** Nalezeni definice oznameni podle ID */
    notification(method: "findById", id: string): GObservableNotificationOptions | null;
    
    /** 
     * Obsolete, pro title pouzijte title. (od verze 490)
     * @deprecated Obsolete, pro title pouzijte title. (od verze 490) 
     */
    newOps(ops: ObjectLiteral<any>): this;

    /**
     * Nastaví příznak dlouhého zpracování dat. Zobrazí "Prosím čekejte" dialog GContentu. Lze volat opakovaně, ale očekává se příslušný počet zavolání endOperation
     * 
     * @param {string} [text] text operace - lze ho zobrazit u "motatka"
     * @param {number} [current] progress operace (cislo mezi 0 a {total})
     * @param {number} [total] maximalni progress operace
     * @returns {IGClientProgressOptions} nový počet probíhajících operací
     */
    beginOperation(text?: string | null, current?: number, total?: number): IGClientProgressOptions;

    /**
     * Nastaví příznak dlouhého zpracování dat. Zobrazí "Prosím čekejte" dialog GContentu. Lze volat opakovaně, ale očekává se příslušný počet zavolání endOperation
     * 
     * @param {IGClientProgressOptions} [obj] Options
     * @returns {IGClientProgressOptions} nový počet probíhajících operací
     */
    beginOperation(obj: IGClientProgressOptions): IGClientProgressOptions;

    //Vola na always endOperation
    beginOperation(promise: JQueryPromise<any>, obj: IGClientProgressOptions): IGClientProgressOptions;

    /**
     * Změní progress text posledni probíhající operace
     * 
     * @param {string} [text] novy text operace
     * @param {number} [current] progress operace (cislo mezi 0 a {total})
     * @returns {IGClientProgressOptions} aktualni počet probíhajících operací
     */
    progressOperation(text: string | null, current?: number): IGClientProgressOptions;

    /**
     * Změní progress text posledni probíhající operace
     * 
     * @param {IGClientProgressOptions} [obj] Options
     * @returns {IGClientProgressOptions} aktualni počet probíhajících operací
     */
    progressOperation(obj: IGClientProgressOptions): IGClientProgressOptions;

    /**
     * Uzavře poslední probíhající operaci
     * 
     * @param {string} [id] identifikator probihajici operace
     * @returns {IGClientProgressOptions}
     */
    endOperation(id?: string): IGClientProgressOptions;

    /**
     * Uzavře poslední probíhající operaci
     * 
     * @param {IGClientProgressOptions} obj Instance operace
     * @returns {IGClientProgressOptions}
     */
    endOperation(obj: IGClientProgressOptions): IGClientProgressOptions;

    /**
     * OBSOLETE!!! pouzijte gpc
     * @deprecated OBSOLETE!!! pouzijte gpc
     * @type {ObjectLiteral<string>}
     */
    serverContext: ObjectLiteral<string>;
    /**
     * Parametry přenášené na server při call operacích
     * 
     */
    serverParams?: ObjectLiteral<any>;

    /**
     * Standardní $.find, ale v prohledává jen obsah contentu nebo dialogu (najde i CommandButton/Menu/ToolBar).
     *
     * @param {string} name? A string containing a selector expression to match elements against.
     */
    find(name?: string): JQuery

    /**
     * Vyhledání formularu podle názvu (name).
     *
     * @param names seznam názvů. Buď jako oddělené argumenty, nebo stringy oddělené čárkou, nebo css trida (".js-adresa"), nebo kombinace. Lze použít hromadné výběry "form:formname", "section:sectionname", "field:fieldname".
     */
    findForms(...names: string[]): JQuery

    /** 
     *  Vyhledání sekci formulare podle názvu (name) 
     *
     * @param names seznam názvů. Buď jako oddělené argumenty, nebo stringy oddělené čárkou, nebo css trida (".js-adresa"), nebo kombinace. Lze použít hromadné výběry "form:formname", "section:sectionname", "field:fieldname".
     */
    findFormSections(...names: string[]): JQuery;

    /**
     * Vyhledání řádků podle názvu (name).
     *
     * @param names Seznam názvů. Buď jako oddělené argumenty, nebo stringy oddělené čárkou, nebo css trida (".js-adresa"), nebo kombinace. Lze použít hromadné výběry "form:formname", "section:sectionname", "field:fieldname".
     */
    findFormRows(...names: string[]): JQuery

    /**
     * Vyhledání gfields podle názvu (name).
     *
     * @param names Seznam názvů. Buď jako oddělené argumenty, nebo stringy oddělené čárkou, nebo css trida (".js-adresa"), nebo kombinace. Lze použít hromadné výběry "form:formname", "section:sectionname", "row:rowname".
     */
    findFields(...names: string[]): JQuery


    /**
    * Vytvoření objektu pro inicializaci GContent
    *
    * @param {any} classId Identifikátor obsahu GContent
    * @param {object} [params] Objekt externich parametru ke contentu; budou pridany k instanci objektu ( $.extend(this, params) )
    *
    */
    static createInitializer(classId: any, ...params: object[]): GContentInitializer;

    /**
     * Vytvoření podřízeného contentu (v podstatě jen nastavuje parentContent na this)
     * 
     * @param contentInitializer
     */
    createServiceContent<T extends ObjectLiteral<any>|IGClientContentObject=never>(contentInitializer?: string | T | (T | string)[]): GContent & T;

    /** Vytvoreni contentu (feature 490) */
    static createContent(contentInitializer?: string | object | IGClientContentObject | (string | ObjectLiteral<any>)[]): GContent;

    /** Vytvoreni contentu (feature 490) */
    createContent<TParams = ObjectLiteral<any>>(contentInitializer?: string | object | IGClientContentObject | (string | ObjectLiteral<any>)[], inputParams?: TParams): GContent & TParams;

    /** Doknuti jako subcontentu (feature 490) */
    dockTo(to: GContent, options?: Gordic.Widget.IGSubcontentOptions): this;

    /** Undocknuti subcontentu (feature 490) */
    undock(): this;

    /** Aktivovat content (feature 490) */
    activate(): this;

    /** Deaktivovat content (feature 490) */
    deactivate(): this;

    /** Je content aktivni? (feature 490) */
    isActive(): boolean;

    /** Pole probíhajících zanořených úkonů. Pokud je length>0, je zobrazen waitDiv. Hodnota se nastavuje metodami beginOperation a endOperation */
    ongoingOperations: IGClientProgressOptions[];
}

interface IGContent extends IGContentBase {
    onContentReady(this: this & GContent, serverData: Object): void
}

interface IGContentBase {
    onContentInit?(this: this & GContent): void
    onContentLoaded?(this: this & GContent, serverData: Object): void | Object | JQueryPromise<Object>
    onContentReady?(this: this & GContent, serverData: Object): void
    onDataReady?(this: this & GContent, resultData: Object): void
    onNewPromiseCreated?(this: this & GContent, xhrPromise: JQueryXHR): void
    onException?(this: this & GContent, exceptionInfo: IGExceptionInfo): void
    onServerValidationFail?(this: this & GContent, validationFailedObject: Object): void
    onWorking?(this: this & GContent, isWorking: boolean, progress: IGClientProgressOptions | null): void
    onNotification?(this: this & GContent, ...args: any): void
    onFlashUpdate?(this: this & GContent, flash: GFlashOptions): void
    onClose?(this: this & GContent, returnValue?: any): void

    /** Metoda volana po zobrazeni contentu (feature v490) */
    onActivate?(this: this & GContent): void;

    /** Metoda volana po skryti contentu (feature v490) */
    onDeactivate?(this: this & GContent): void;
}

interface IGClientContent extends IGContentBase {
    prepareContent(this: this & GContent, ...params: any[]): JQueryPromise<any> | any;
}

interface IGClientContentObject {
    new(): IGClientContent
}

interface IGClientProgressOptions {
    /**
     * identifikator operace pro pozdejsi referenci
     * @type {string | null}
     */
    id?: string | null;

    /**
     * text operace - lze ho zobrazit u "motatka"
     * @type {string}
     */
    text?: string | null;

    /**
     * progress operace (cislo mezi 0 a {total})
     * @type {number}
     */
    progress?: number | null;

    /**
     * maximalni progress operace
     * @type {number} maximalni progress operace
     */
    total?: number | null;

    /**
     * akce pro zruseni
     * @type {GAction}
     */
    cancelAction?: GAction | null
}

declare const t: GContent

interface JQueryStatic {
    /**
     * Najde příslušný GContent
     * @author TSkala
     *
     * @param {HTMLElement|JQuery|GAction|string} [element] HTMLElement, jQuery DOM element, GAction nebo ID contentu, který leží na GContent.contentDiv. Pokud je NULL/undefined, vrátí všechny/první GContenty
     * @param {boolean} [multiple=false] zda nás zajímá jeden (první) GContent, nebo pole všech (default=false)
     */
    content<TContent extends GContent = GContent>(element?: HTMLElement | JQuery | GAction | string | Element, multiple?: boolean): TContent;
    content<TContent extends GContent = GContent>(element: HTMLElement | JQuery | GAction | string | Element, multiple: true): TContent[];

    /**
     * Najde instanci GAction podle nasledujicich pravidel (prvni vyhrava):
     * 1) pokud je prvni parametr jiz instance GAction - vrati ji jako navratovou hodnotu
     * 2) pokusi se najit akci se shodnym nazvem v predanem seznamu actionList (pokud byl predan), muze byt objekt nebo pole
     * 3) pokud je v nazvu "." (napr.: "main.actOk"), pokusi se nalezt GContent se jmenem pred prvni "." a prohleda akce definovanem na nem
     * 4) pokud je v nazvu "*." (napr.: "*.actOk"), pokusi se nalezt akci v nadrazenych GContent s prioritou nejblizsiho(nejzanorenejsiho) obsahu (funguje jen pokud je zadan parametr "context")
     * @param {string | GAction} name
     * @param {GActionList} [actionList]
     * @param {GContent | HTMLElement | JQuery} [context]
     * @returns {GAction | null}
     */
    findAction(name: string | GAction, actionList?: GActionList|GAction[], context?: GContent | HTMLElement | JQuery): GAction | null;
}

interface JQuery {

    gcontent(initializer: GContentInitializer): JQuery;
    gcontent<K extends Extract<keyof GContent, string>>(key: K, ...options: any[]): GContent[K] extends AnyFunction ? ReturnType<GContent[K]> : GContent[K];
    gcontent(key: string | object, ...options: any[]): JQuery;  //NOTE: Spravne by mel byt key jako IGClientContent, ale to az se jednoho dne zbavime dekoratoru

    /**
     * Vytvoreni gcontentu z predpisu (pro klientske JS/TS gcontenty)
     */
    //gcontent(key: object, ...options: any[]): JQuery;

    /**
     * Typove bezpecne volani gcontentu
     */
    gcontent<T = object>(key: object, options: T): JQuery;
    gcontent<TContent = GContent>(multiple?: boolean): TContent;

}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gdlg-0.1.0.d.ts 

//////////////////////////////////////////////////////////////////////////
// GDlg
//////////////////////////////////////////////////////////////////////////

interface GDialogOptions extends JQueryUI.DialogOptions {
    dock?: IGDialogPositionOptions
    commandBar?: MenuParams[]
    menuBar?: MenuParams[]

    autoMinWidth?: boolean,
    statusBar?: MenuParams[],
    sideBar?: GSideBarOptions,
    noClose?: boolean,
    noMaximize?: boolean,
    userSettings?: string | false | Gordic.Data.IGStorage | null,
    preserveSize?: boolean,
    preservePosition?: boolean,
    related?: HTMLElement | JQuery,
}

type GSimpleDialogCommand = "ok" | "ok!" | ">ok" | ">ok!" | "cancel" | "cancel!" | ">cancel" | ">cancel!";
interface IGSimpleFormDialogOptions extends Omit<GDialogOptions, "commandBar"> {
    autoConfirm?: boolean;
    commandBar?: (MenuParams | GSimpleDialogCommand)[];
}
type GSimpleFormDialogOptions = IGSimpleFormDialogOptions;

interface GDialogButton { id: string, text: string, class?: string, primary?: boolean, autofocus?: boolean } 

declare class GDlgNamespace {
    /**
     * Zobrazí nové nemodální okno, typicky napojené na GContent dle výběru
     * @param element $div pro vytvoření prázdného Contentu s přednastaveným obsahem.
     *                NULL pro vytvoření prázdného Contentu (plněného z JS).
     * @param inputParams pouze při vytváření z GContent
     * @param title Titulek okna
     * @param width Výchozí šířka okna
     * @param height Výchozí výška okna
     * @param resizable (default = true) Povolení změny rozměrů okna
     */
    showWindow(element?: JQuery | null, inputParams?: null, title?: string, width?: number, height?: number, resizable?: boolean): JQuery

    /**
     * Zobrazí nové nemodální okno, typicky napojené na GContent dle výběru
     * @param contentInitializer
     *  @type {string} Název serverové třídy IGAjaxContent (např.: "Gordic.Gui.WebControls.GAjaxContentASPX").
     *                 Použití registrované zástupky (např.: "ascx://Test.ascx"). Výchozí registrované zástupky jsou: "aspx://", "ascx://", "iframe://"
     *  @type {GContent} new GContent(), nebo GContent.createInitializer() (např.: [className, params]...
     *  @type {object} Predpis gcontentu (pro moznost s pouzitim decoratoru Decorators.gcontent)
     * @param inputParams Vstupní parametry GContent
     *  @type {Object}
     *  @type {string} Muze byt ID contentu/okna (zkratka za: {ID: "..."})
     * @param title Titulek okna
     * @param width Výchozí šířka okna
     * @param height Výchozí výška okna
     * @param resizable (default = true) Povolení změny rozměrů okna
     */
    showWindow(contentInitializer: string | JQuery | object | null, inputParams?: ObjectLiteral<any> | string | null, title?: string, width?: number, height?: number, resizable?: boolean): JQuery
    showWindow(contentInitializer: string | JQuery | object | null, inputParams?: ObjectLiteral<any> | null, dialogOptions?: ObjectLiteral<any>): JQuery

    showException(exceptionInfo: IGExceptionInfoMinimal): JQuery | null


    showModalWindow(contentInitializer: string | JQuery | object | null, inputParams?: ObjectLiteral<any> | null, dialogOptions?: ObjectLiteral<any>): JQuery
    showModalWindow(contentInitializer: string | JQuery | object | null, inputParams?: ObjectLiteral<any> | null, title?: string, width?: number, height?: number, resizable?: boolean): JQuery

    simpleForm(title: string, form: Gordic.Forms.Form | JQuery, data?: object | null, options?: GSimpleFormDialogOptions): JQuery

    /**
     * Zobrazí předdefinovaný modální dialog typu Alert (zpráva).
     *
     * @param {string} title Titulek MessageBoxu.
     * @param {string} html Text/Html/JQuery obsahu okna.
     * @param {number} width Výchozí šířka dialogu (default 400).
     * @param {number} height Výchozí výška dialogu (default 210).
     */
    alert(title?: string, html?: string | Element | JQuery, width?: number, height?: number): JQuery
    /**
     * Zobrazí předdefinovaný modální dialog typu Alert (zpráva).
     *
     * @param {string} html Text/Html/JQuery obsahu okna.
     * @param {number} width Výchozí šířka dialogu (default 400).
     * @param {number} height Výchozí výška dialogu (default 210).
     */
    alert(html?: string | Element | JQuery, width?: number, height?: number): JQuery

    /**
     * Zobrazí předdefinovaný modální dialog typu Confirm (Ano/Ne dialog).
     *
     * @param {string} title Titulek MessageBoxu.
     * @param {string} html Text/Html/JQuery obsahu okna.
     * @param {number} width Výchozí šířka dialogu (default 400).
     * @param {number} height Výchozí výška dialogu (default 210).
     */
    confirm(title?: string, html?: string | Element | JQuery, width?: number, height?: number): JQuery
    /**
     * Zobrazí předdefinovaný modální dialog typu Confirm (Ano/Ne dialog).
     *
     * @param {string} html Text/Html/JQuery obsahu okna.
     * @param {number} width Výchozí šířka dialogu (default 400).
     * @param {number} height Výchozí výška dialogu (default 210).
     */
    confirm(html?: string | Element | JQuery, width?: number, height?: number): JQuery


    /**
     * Zobrazí předdefinovaný modální dialog typu Confirm (Ano/Ne dialog). Oproti standardnímu confirmu je změněná ikona (na warning), primárním
     * tlačítkem je "Ne" a tlačítko pro ano má změněný popisek.
     *
     * @param {string} title Titulek MessageBoxu.
     * @param {string} html Text/Html/JQuery obsahu okna.
     * @param {number} width Výchozí šířka dialogu (default 400).
     * @param {number} height Výchozí výška dialogu (default 210).
     */
    confirmDangerous(title?: string, html?: string | Element | JQuery, width?: number, height?: number): JQuery

    /**
     * Zobrazí předdefinovaný modální dialog typu Confirm (Ano/Ne dialog). Oproti standardnímu confirmu je změněná ikona (na warning), primárním
     * tlačítkem je "Ne" a tlačítko pro ano má změněný popisek.
     *
     * @param {string} html Text/Html/JQuery obsahu okna.
     * @param {number} width Výchozí šířka dialogu (default 400).
     * @param {number} height Výchozí výška dialogu (default 210).
     */
    confirmDangerous(html?: string | Element | JQuery, width?: number, height?: number): JQuery

    /**
     * Zobrazí předdefinovaný modální dialog typu Error (chyba).
     *
     * @param {string} title Titulek MessageBoxu.
     * @param {string} html Text/Html/JQuery obsahu okna.
     * @param {number} width Výchozí šířka dialogu (default 400).
     * @param {number} height Výchozí výška dialogu (default 210).
     */
    error(title?: string, html?: string | Element | JQuery, width?: number, height?: number): JQuery

    /**
     * Zobrazí předdefinovaný modální dialog typu Error (chyba).
     *
     * @param {string} html Text/Html/JQuery obsahu okna.
     * @param {number} width Výchozí šířka dialogu (default 400).
     * @param {number} height Výchozí výška dialogu (default 210).
     */
    error(html?: string | Element | JQuery, width?: number, height?: number): JQuery

    /**
     * Zobrazí předdefinovaný modální dialog, s možností ikony a vyřízením uživatelského výběru (volá události return a navíc i přímo odpovědi - yes/no/...
     *
     * @param {string} title Titulek MessageBoxu.
     * @param {string} html Text/Html/JQuery obsahu okna.
     * @param {object[]} buttons (default=[GDlg.mbbOk]) pole tlačítek dialogu ({text:"",id:""} více viz. JQuery Dialog, id zmáčknutého tlačítka se vrátí jako returnValue).
     * @param {string} icon Případná zobrazená ikona. Např.: GDlg.mbiInfo = "fa fa-exclamation-circle g-state-info g-state-text".
     * @param {number} width (default=400) případná šířka dialogu.
     * @param {number} height (default=210) případná výška dialogu.
     * @param {string} css Vlastní doplňující styl dialogu.
     */
    messageBox(title?: string, html?: string | Element | JQuery, buttons?: GDialogButton[], icon?: string, width?: number, height?: number, css?: string): JQuery
    /**
     * Zobrazí předdefinovaný modální dialog, s možností ikony a vyřízením uživatelského výběru (volá události return a navíc i přímo odpovědi - yes/no/...
     *
     * @param {string} title Titulek MessageBoxu.
     * @param {string} html Text/Html/JQuery obsahu okna.
     * @param {object[]} buttons (default=[GDlg.mbbOk]) pole tlačítek dialogu ({text:"",id:""} více viz. JQuery Dialog, id zmáčknutého tlačítka se vrátí jako returnValue).
     * @param {string} icon Případná zobrazená ikona. Např.: GDlg.mbiInfo = "fa fa-exclamation-circle g-state-info g-state-text".
     * @param {number} width (default=400) případná šířka dialogu.
     * @param {number} height (default=210) případná výška dialogu.
     * @param {string} css Vlastní doplňující styl dialogu.
     */
    messageBox(options: GDialogOptions & { html?: string | Element | JQuery, buttons?: GDialogButton[], icon?: string }): JQuery

    /** Vytvori element pro dialog */
    createElement(): JQuery
    withOptions(options: GDialogOptions | null): GDlgNamespace


    /**
     * Zobrazí předdefinovaný simpleForm dialog typu Prompt (textove pole k vyplneni).
     *
     * @param {string} title Titulek Dialogu.
     * @param {string} label Popisek fieldu (formrow).
     * @param {string} text Výchozí hodnota fieldu.
     * @param {GDialogOptions} options? Options pro gdialog {width, height, modal, commandBar, menuBar, ...}.
     */
    prompt(title?: string, label?: string, text?: string, options?: GSimpleFormDialogOptions): JQuery

    /** OK, Zrušit */
    mbbOkCancel: GDialogButton[]
    /** OK, Opakovat */
    mbbRetryCancel: GDialogButton[]
    /** Ano, Ne */
    mbbYesNo: GDialogButton[]
    /** Ano, Ne, Zrušit */
    mbbYesNoCancel: GDialogButton[]

    /** OK */
    mbbOk: GDialogButton
    /** Ano */
    mbbYes: GDialogButton
    /** Ne */
    mbbNo: GDialogButton 
    /** Zrušit */
    mbbCancel: GDialogButton
    /** Zavřít */
    mbbClose: GDialogButton
    /** Zavřít */
    mbbClosePrimary: GDialogButton
    /** Opakovat */
    mbbRetry: GDialogButton
    /** Přerušit */
    mbbAbort: GDialogButton
    /** Ignorovat */
    mbbIgnore: GDialogButton

    mbiInfo: string
    mbiError: string
    mbiWarning: string
    mbiQuestion: string
    mbiSuccess: string

    /**
     * Zobrazí předdefinovaný modální dialog typu Warning (varování).
     *
     * @param {string} title Titulek MessageBoxu.
     * @param {string} html Text/Html/JQuery obsahu okna.
     * @param {number} width Výchozí šířka dialogu (default 400).
     * @param {number} height Výchozí výška dialogu (default 210).
     */
    warning(title?: string, html?: string | Element | JQuery, width?: number, height?: number): JQuery
}

interface IGDialogPositionOptions extends JQueryUI.JQueryPositionOptions {
    relLeft?: number;
    relTop?: number;
    relRight?: number;
    relBottom?: number;
    relWidth?: number;
    relHeight?: number;
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
    width?: number;
    height?: number;
}

declare namespace JQueryUI {
    interface DialogOptions {
        autoMinWidth?: boolean;
        commandBar?: Object | null,
        dock?: IGDialogPositionOptions;
        menuBar?: Object | null,
        noClose?: boolean;
        noMaximize?: boolean;
        preservePosition?: boolean;
        preserveSize?: boolean;
        sideBar?: Object | null,
        statusBar?: Object | null,
        userSettings?: Object | null,
    }
}

interface JQuery {
    dialog(method: "dock", setOption: boolean): JQuery;
    dialog(method: "maximize", maximize: boolean): JQuery;
    dialog(method: "updatePosition", allowWidthChange?: boolean): JQuery;
    dialog(method: "option", options: GDialogOptions):JQuery;
    gcover(options?: GCoverOptions): JQuery;
    gcover(method: "refresh"): JQuery;
    gcover(method: "destroy"): JQuery;

    /**
     * Z existujiciho dialogu vytvori promise jeho zavreni s moznou filtraci navratovych hodnot
     * @param successCondition hodnota/y, ktere jsou akceptovane jako uspesne, nebo vyhodnocovaci funkce. Pokud okno vrati cokoliv jineho, nez predana hodnota, promise bude rejected
     * @returns vytvoreny promise s navratovou hodnotou okna
     */
    createDialogPromise<TValue = any>(successCondition?: TValue | TValue[] | ((dialogReturnValue: TValue) => boolean)): JQueryPromise<any>;  // spravne patri JQueryPromise<TValue>

    /** NEPOUZIVAT, pouzijte pretizeni bez returnValue a pridejte .then()
     *  @deprecated */
    createDialogPromise<TValue = any, TReturnValue = any>(successCondition?: TValue | TValue[] | ((dialogReturnValue: TValue) => boolean), returnValue?: TReturnValue | ((returnValue: TValue) => TReturnValue)): JQueryPromise<TReturnValue>;

    /**
     * Z existujiciho dialogu vytvori promise jeho zavreni s moznou filtraci navratovych hodnot
     * @param eventName nazev udalosti, na kterou se ceka
     * @param successCondition vyhodnocovaci funkce uspesnosti vyvolane udalosti. Vraci true pro uspesne vyhodnoce, false pro neuspesne vyhodnoceni, null pro ignorovani udalosti a cekani na dalsi vyskyt
     * @returns vytvoreny promise se vzniklou udalosti
     */
    createEventPromise<K extends keyof HTMLElementEventMap>(eventName: K, successCondition?: ((this: HTMLElement, ev: HTMLElementEventMap[K]) => (boolean | null))): JQueryPromise<HTMLElementEventMap[K]>;

    /**
     * Z existujiciho dialogu vytvori promise jeho zavreni s moznou filtraci navratovych hodnot
     * @param eventNames nazev udalosti, na ktere se ceka (oddelene mezerou)
     * @param successCondition vyhodnocovaci funkce uspesnosti vyvolane udalosti. Vraci true pro uspesne vyhodnoce, false pro neuspesne vyhodnoceni, null pro ignorovani udalosti a cekani na dalsi vyskyt
     * @returns vytvoreny promise se vzniklou udalosti
     */
    createEventPromise(eventNames: string, successCondition?: ((this: HTMLElement, ev: Event, ...args) => (boolean | null))): JQueryPromise<Event>;
}
//Toto jsou normalni dialogOptions a asi by to melo byt v GDlg???
interface GDlgOptions {
    width?: number;
    height?: number;
    menuBar?: MenuParams[];
    statusBar?: MenuParams[];
    title?: string;
    customClass?: string;
}

/**
 * Parametry widgetu gcover
 * @author pnovak
 * @since 480.1.0.238
 */
interface GCoverOptions extends JQueryUI.WidgetOptions  {
    /**
     * volitelny text stavu zpracovani
     * @type {string | null}
     */
    text?: string | null;
    /**
     * Aktualni stav progressbaru
     * @type {number | null}
     */
    current?: number | null;
    /**
     * Maximalni stav progressbaru (musi byt zadan pokud se progressbar ma zobrazit)
     * @type {number | null}
     */
    total?: number | null;
    /**
     * Akce po zrušení gcoveru
     */
    cancelAction?: GAction
}

declare const GDlg: GDlgNamespace

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gresizemanager.d.ts 

//////////////////////////////////////////////////////////////////////////
// GResizeManager
//////////////////////////////////////////////////////////////////////////

declare class GResizeManager {
    constructor()
    /**
     *
     * Method which registers callback for resize observations of element.
     * @author VMaca
     *
     * @param { HTMLElement |HTMLElement[]} element Element to observe and call callback when changes
     * @param {ResizeManagerOptions|ResizeManagerOptions[]} callbacks Array of callbacks or one callback options
     */
    observe(element: HTMLElement | HTMLElement[], callbacks: ResizeManagerOptions | ResizeManagerOptions[]): void;

    /**
     * Removes callback with given id from given element.
     * @author VMaca
     * @param { HTMLElement |HTMLElement[]} element Element to remove callback from.
     * @param {String|String[]} id Id or array of Ids of callback to remove.
     */
    unobserve(element: HTMLElement | HTMLElement[], callbackIds: String | String[]): void;

    /**
     * Invokes callbacks on given element.
     * @author VMaca
     * @param { HTMLElement |HTMLElement[]} element element to trigger callbacks on.
     *
     */
    forceRefresh(element: HTMLElement |HTMLElement[]): void;
    /**
     * enable
     * 
     * @param {HTMLElement | HTMLElement[]} element
     * @param {String | String[]} callbackIds
     * @param {boolean} enabled
     * @param {boolean} [setCurrentSizeAsLastActive] default = true
     */
    enable(element: HTMLElement | HTMLElement[], callbackIds: String | String[], enabled: boolean, setCurrentSizeAsLastActive?: boolean )

    /**
     * Calculates inner height of observed element. From top to last child's bottom.
     * @author VMaca
     * @param { HTMLElement |HTMLElement[]} element target element which inner height should be calculated.
     * @param {number} currentHeight current height of element, typically contentRect.height or default is clientHeight.
     */
    calculateInnerHeight(element: HTMLElement | HTMLElement[], currentHeight?: number): number;
}

interface ResizeManagerOptions extends ObjectLiteral<any> {
    /**Id of callback for unobserve operation */
    id: string;
    /** Function which determines if execute should be called. (Needs to be fast)
     * @author VMaca
     * @param {DOMRectReadOnly} contentRect current ContentRect of element.
     * @param {DOMRectReadOnly} prevContentRect ContentRect from previous call.
     * @param {DOMRectReadOnly} lastActiveContentRect ContentRect from last call when isActive was true.
     *
     * @returns {boolean}
     * */
    isActive(contentRect: DOMRectReadOnly, prevContentRect: DOMRectReadOnly|null, lastActiveContentRect: DOMRectReadOnly|null): boolean;

    /**
     * Function which reacts on resize event. Is called if isActive returned true.
     * @author VMaca
     * @param {DOMRectReadOnly} contentRect current ContentRect of element.
     * @param {DOMRectReadOnly} prevContentRect ContentRect from previous call.
     * @param {DOMRectReadOnly} lastActiveContentRect ContentRect from last call when isActive was true.
     *
     */
    execute(contentRect: DOMRectReadOnly, prevContentRect: DOMRectReadOnly|null, lastActiveContentRect: DOMRectReadOnly|null): void;

    /** Context to set to isActive and execute when called.If not set, use bind for isActive and execute context setup. */
    context?: any;

    /** Debouncing - Time to wait from last onResize event occurs. */
    wait?: number;
    /**
     * enabled - default true
     * @type {boolean} 
     * @default true
     */
  enabled?: boolean;
  /** this is working if wait is set. MaxWait ensures, that isActive and execute will be run at least every maxWait time if it is waiting for long time */
  maxWait?: number;
  /** this is working if wait is set. If true, isActive will be launched at start of waiting. */
  leading?: boolean;

}

declare namespace Gordic {
    /**
     * Manager, which observes element and notifies when element's size or position has changed.
     *
     * @author VMaca
     *
     * @example <caption>Usage:</caption>
     * ```typescript
     *  Gordic.ResizeManager.observe(this.element[0], {
     *   id: "myelement-observation",
     *   isActive: (function (contentRect, prevContentRect, prevActiveContentRect) {
     *          return document.getElementById(this.instanceId); // is in DOM ?
     *      }),
     *   execute: function(contentRect, prevContentRect, prevActiveContentRect){
     *          if(contentRect.width!=prevActiveContentRect.width) this.refresh();
     *      },
     *   context: this,
     *  });
     *
     *  //In destroy:
     *  Gordic.ResizeManager.unobserve(this.element[0], "myelement-observation");
     * ```
     */
    const ResizeManager: GResizeManager;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gjquery-0.2.0.d.ts 

//////////////////////////////////////////////////////////////////////////
// GScript
//////////////////////////////////////////////////////////////////////////

/**
 * Třída pro řízené načítaní skriptů
 * @author TSkala
 */
interface GScript {
    /** Pole již načtených, nebo zpracovávaných .js skriptů */
    scripts: ObjectLiteral<string>;
    /** Pole již zpracovaných RunOnce skriptů */
    codes: ObjectLiteral<string>;

    /**
    *
    * Vytvoří nový požadavek na načtení .js souborů ze serveru (stylove soubory zacinaji "css:").
    * Řeší dotažení, zpracování a čekání na všechny skripty.
    * Mějte na paměti, že načtení a vyřešení promise může být synchronní i asynchronní!
    * @param {string|ObjectLiteral<string>|ObjectLiteral<string>[]} url pole skriptů k načtení. Jednotlivé skripty jsou ve tvaru [{ UID:"", Url:"" }, ...] nebo { skript1:"", styl1:"css:", ... }.
    * @returns {JQueryPromise<undefined>} Promise načtení všech souborů
    */
    require(url: string | ObjectLiteral<string> | ObjectLiteral<string>[], handler?: Function): JQueryPromise<undefined>;
    /**
    *
    * Vytvoří nový požadavek na načtení .js souborů ze serveru (stylove soubory zacinaji "css:").
    * Řeší dotažení, zpracování a čekání na všechny skripty.
    * Mějte na paměti, že načtení a vyřešení promise může být synchronní i asynchronní!
    * @param {...string[]} url skripty k načtení ve tvaru script1, script2, script3,..
    * @returns {JQueryPromise<undefined>} Promise načtení všech souborů
    */
    require(...url: string[]): JQueryPromise<undefined>;

    /**
     * includne pozadovany js soubor ze serveru. Doplnuje vsechny globalni url argumenty gscriptu (na rozdil od $.getScript vypina defaultni obchazeni cache a pro DEVELOP verzi se pouziva ne-eval verze)
     * 
     * @param {any} url
     * @returns {JQueryPromise<undefined>}
     */
    getScript(url): JQueryPromise<undefined>;

    canRun(uid: string): boolean
}

/**
 * Třída pro řízené načítaní skriptů
 * @author TSkala
 */
declare const gscript: GScript;

/** Enkoduje zobaky  */
declare function htmlEncode(s: string, newLineToBr?: boolean): string;

/**
 *
 */
interface JQuery {

    scrollTo(target?: JQuery | Element | string): JQuery;
    scrollWithin(parent?: JQuery | Element | string): JQuery;

    /**
     * Append visible drag handle to resizable element (dots) - currently only "s" is working
     * @param {any} target
     */
    appendVisibleResizeHandle(target: "s"): JQuery;

    gdomcontext(): ObjectLiteral<any> & {
        /** Pole HTMLElementu v poradi od this.element az po nejvyssiho parenta */
        _contextPath: HTMLElement[]
    };
    gdomcontext(options: ObjectLiteral<any> | null): JQuery;

    /** Optimalizovana metoda, ktera zjisti, zda this.element se nachazi v containeru (respektuje GDOMContext) */
    gdomcontext(method: "isContainedIn", container: HTMLElement): boolean;

    /** Odstraneni objektu gdomcontext z HTMLElementu */
    gdomcontext(method: "remove"): JQuery;
    
    /**
     * deepExtendWoArray - deep extend, ktery pro Array misto merge (puvodni $.extend) provede slice 
     * 
     */
    deepExtendWoArray<T, U, V, W, X, Y, Z>(target: T, object1: U, object2: V, object3: W, object4: X, object5: Y, object6: Z): T & U & V & W & X & Y & Z;
    deepExtendWoArray<T, U, V, W, X, Y>(target: T, object1: U, object2: V, object3: W, object4: X, object5: Y): T & U & V & W & X & Y;
    deepExtendWoArray<T, U, V, W, X>(target: T, object1: U, object2: V, object3: W, object4: X): T & U & V & W & X;
    deepExtendWoArray<T, U, V, W>(target: T, object1: U, object2: V, object3: W): T & U & V & W;
    deepExtendWoArray<T, U, V>(target: T, object1: U, object2: V): T & U & V;
    deepExtendWoArray<T, U>(target: T, object1: U): T & U;
    deepExtendWoArray(target: any, ...objects: any[]): any;
    isPromise<T, S>(obj: JQueryPromise<T> | S): obj is JQueryPromise<T>;

    /** Vyvolá událost, na kterou se pokusí nadřazené ovl. prvky o zviditelnění elementu, na kterém se tato metoda volá. */
    forceShow(): boolean;

    /** Pokusí se nastavit focus i na prvcích, které nejsou aktuálně viditelné. */
    forceFocus(options?: IGForceFocusOptions): JQuery;

    /**
     * Registrace alternativního elementu, který se použije místo elementu, na kterém se forceFocus volá.
     * 
     * @param {HTMLElement | ((elm: HTMLElement)} elm (default = > HTMLElement) | null)
     * @returns {JQuery}
     */
    forceFocus(elm: HTMLElement | ((elm: HTMLElement, options?: IGForceFocusOptions) => HTMLElement) | null): JQuery;

    /** Vrati stavovy objekt. Vola-li se nad vice elementy, pak vrati extend jejich stavu. */
    gstate(): ObjectLiteral<any> | null;

    /** Smazani interniho stavoveho objektu. */
    gstate(del: null): null;

    /** Vrati stavovou hodnotu. Vola-li se nad vice elementy, pak vrati hodnotu prvniho z elementu. */
    gstate(key: string): any;
    
    /**
     * Nastavi stavovou hodnotu. Vola-li se nad vice elementy, pak nastavi hodnotu kazdemu z nich. 
     * 
     * @param {string} key klic
     * @param {any} value hodnota
     * @param {boolean} [silent] Ve vychozim vyhazuje udalost 'gstatechanged' s objektem obs. zmeny.
     * @returns {JQuery}
     */
    gstate(key: string, value: any, silent?: boolean): JQuery;
    
    /**
     * Extenduje property objektu na interni stav. Pokud se vola nad vice elementy, pak nastavi kazdem z nich.
     * 
     * @param {ObjectLiteral<any>} o Objekt obs. zmeny
     * @param {boolean} [silent] Ve vychozim vyhazuje udalost 'gstatechanged' s objektem obs. zmeny.
     * @returns {JQuery}
     */
    gstate(o: ObjectLiteral<any>, silent?: boolean): JQuery;

    /** Najde vsechny elementy, ktere maji nejaky gstate. */
    findStateControls(): JQuery;
}

interface JQueryStatic<TElement extends Node = HTMLElement> {
    /**
     * Zjisti, zda se arg. 'contained' nachazi v arg. 'container'. Respektuje nas gdomContext.
     * 
     * @param {Element} container Wrapper
     * @param {Element} contained Element
     * @returns {boolean} True, pokud se contained nachazi v container.
     */
    gcontains(container: Element, contained: Element): boolean;

    newDiv(...className: string[]): JQuery
    newSpan(...className: string[]): JQuery
    newElement(elementName: string, ...className: string[]): JQuery
}

interface IGEvents {
    on(eventName: string, fce: Function): this;
    off(eventName: string|Function): this;
}

declare class GEvents implements IGEvents {
    constructor(dispatchElement?, dispatchPrefix?);
    on(eventName: string, fce: Function): this;
    off(eventName: string | Function): this;
  trigger(eventName: string, args: any[]): any;
  dispatchEvent(eventName: string, args: Function | any[] | IArguments): any;
}

/**
 * base třída pro zjednodušené volání AJAX služeb
 * 
 * @author tskala
 * @since 480.1.0.383
 */
declare class GAjax {
    constructor(serviceName: string, ajaxOptions?: JQuery.AjaxSettings);
    wsCall<T>(method: string, inputParams: object, options?: JQuery.AjaxSettings): JQueryPromise<T>;
    post<T>(method: string, inputParams: object, options?: JQuery.AjaxSettings): JQueryPromise<T>;
    get<T>(method: string, inputParams: object, options?: JQuery.AjaxSettings): JQueryPromise<T>;
}

interface Window {
    queryStringToObj(params?: string): any
    asyncChain<T = any>(basePromise: JQueryPromise<any>, callbacks: (AnyFunction | AnyFunction[])[]): JQueryPromise<T>;
}

declare namespace Gordic.Consts.Locale {
    export const decimalSeparator: string;
}

interface IGForceFocusOptions extends FocusOptions {
    forceShow?: boolean;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\GDocument.d.ts 

//////////////////////////////////////////////////////////////////////////
// GDocument
//////////////////////////////////////////////////////////////////////////

/**
 * Trida pro download/upload souboru
 * @author BMartinek
 */
declare class GDocument {
    constructor(gcontent: GContent | null, options?: IGDocumentOptions);

    /**
     * Upload souboru (bez workflow)
     * @param dto
     * @param uploadedCallback 
     */
    upload(dto: IGDocumentUploadParams, uploadedCallback?: (this: GDocument, ret: IGDocumentParams) => void)
        : JQuery.Promise3<
        "saved", JQueryXHR, "fileSelected" | "uploadStarting",
        IGDocumentParams, "cancel" | "fail", { fileSize: number, name: string } | undefined,
        never, never, never
        >;

    /**
     * Soubor byl vybran (pro upload)
     * @param callback
     */
    fileSelected(callback?: (this: GDocument, ev: JQueryEventObject) => void): void;

    /**
     * Download souboru (bez workflow)
     * @param dto
     */
    download(dto: IGDocumentDownloadParams): JQueryPromise<ObjectLiteral<string>>;

    /**
     * Download dokumentu (workflow, predevsim pro sestavy)
     * @param dto
     * @param cancelObj Objekt pro moznost zruseni operace
     */
    downloadDocument(dto: IGDocumentDownloadParams, cancelObj?: GObservableObject<any>): JQueryPromise<any>; // NOTE: Toto by asi nemelo byt pouzivano nikym krome sestav

    prepareMultiple(dto: IGDocumentDownloadParams[]): JQueryPromise<IGDocumentPrepareResult[]>;
    releaseMultiple(rel: IGDocumentDownloadParams[]): JQueryPromise<void>;

    getDirectUrl(dto: IGDocumentPrepareResult, options?: IGDocumentGetDirectUrlOptions): string;

    uploadCompleted(uploadedCallback: (params: any) => void);
} 

interface IGDocumentOptions {
    /**
    * Pouzivat pro zpravy a vybery flashPanel?
    * @default true
    */
    useFlasPanel?: boolean;

    /**
    * ID flashpanelu
    * @default "pfupdwn"
    */
    flashPanelId?: string;

    /**
    * Zprava Stahování souboru
    * @default "Stahování souboru"
    */
    msgFileDownloading?: string;

    /**
    * Zprava Soubor byl stažen
    * @default "Soubor byl stažen"
    */
    msgFileDownloaded?: string;

    /**
    * Zprava Soubor je otevřen k editaci
    * @default "Soubor je otevřen k editaci"
    */
    msgFileIsOpened?: string;

    /**
    * Zprava Ukládání souboru
    * @default "Ukládání souboru"
    */
    msgFileUploading?: string;

    /**
    * Zprava Soubor byl uložen
    * @default "Soubor byl uložen"
    */
    msgFileUploaded?: string;

    /**
    * Zprava Chyba při práci se souborem
    * @default "Chyba při práci se souborem"
    */
    msgFileProcessError?: string;

    //message pro upload()
    /**
    * Zprava Vyberte soubor
    * @default "Vyberte soubor"
    */
    msgUplChooseFile?: string;

    /**
    * Zprava Soubor je příliš velký
    * @default "Soubor je příliš velký"
    */
    msgUplFileSizeExceeded?: string;

    /**
    * Zprava Ukládání souboru
    * @default "Ukládání souboru"
    */
    msgUplFileUploading?: string;

    /**
    * Zprava Dokument byl uložen
    * @default "Dokument byl uložen"
    */
    msgUplFileUploaded?: string;

    //popisky

    /**
    * Popisek 'vybrat'
    * @default "vybrat"
    */
    cptChooseFileBtn?: string;

    /**
    * Popisek 'Uložit soubor'
    * @default "Uložit soubor"
    */
    cptSaveFile?: string;

    /**
    * Popisek 'Podepsat'
    * @default "Podepsat"
    */
    cptSign?: string;

    /**
    * Popisek 'Orazítkovat'
    * @default "Orazítkovat"
    */
    cptTimeStamp?: string;

    /**
    * Popisek 'Uložit'
    * @default "Uložit"
    */
    cptSave?: string;

    /**
    * Popisek 'Storno'
    * @default "Storno"
    */
    cptCancel?: string;
    /**
     * Delegát po downloadu souboru (napr. pro zruseni gcoveru)
     */
    afterDownloadDelegate?: Function;
}

interface IGDocumentParams {
    /** Vlastni data, ktera jsou vymenovana mezi klientem a serverem. */
    CustomData?: ObjectLiteral<string>;


    Context?: any;
}

interface IGDocumentDownloadParams extends IGDocumentParams {
    /** Nazev tridy (C#) vcetne namespace, dedici od GDocumentDownloaderBase a odvozenych. */
    DownloaderType?: string;

    /** autodownload pro ne - pluginove stazeni */
    AutoDownload?: boolean;

    /**
     * Priznak pro vynuceni stazeni souboru, vynechani stazeni pres doplnek
     * @type {boolean}
     */
    DisablePluginDownload?: boolean;
}

interface IGDocumentUploadParams extends IGDocumentParams {
    /** Nazev tridy (C#) vcetne namespace, dedici od GDocumentUploaderBase a odvozenych. */
    UploaderType?: string;

    /** Popisek pro vybrani souboru (pouze pro upload) */
    caption?: string;

    /** Zobrazovat tlacitko cancel? (pouze pro upload) */
    cancelButton?: boolean;

    /** Povolene prilohy. Pokud je jich vic, oddelit carkou, napr.: ".pdf,.xls" (pouze pro upload) */
    acceptExtension?: string;

    /** Maximalni velikost uploadovaneho souboru v bajtech (bytes) (pouze pro upload) */
    maxFileSize?: number;

    /** Ma se pro upload pouzit dialog?  */
    createDialog?: boolean;
}

interface IGDocumentPrepareResult {
    id: string;
    customData: ObjectLiteral<string>;
}

interface IGDocumentGetDirectUrlOptions {
    /**
     * Po stažení souboru se soubor ze serveru automaticky smaže.
     * @default false
     */
    autoDelete?: boolean;
    /** Jak se ma soubor nabidnout? attachment = stahne se do uloziste (vychozi), inline = pokud mu prohlizec rozumi, muze ho primo otevrit. */
    disposition?: "attachment" | "inline";
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gdatepicker.d.ts 

declare namespace Gordic.Components.Flatpickr {
    type FlatpickrPlugin = { new(): (fp: any) => any };
    const scrollPlugin: FlatpickrPlugin ;
    const scrollDaysPlugin: FlatpickrPlugin;
    const clearDatePlugin: FlatpickrPlugin;
    const confirmDatePlugin: FlatpickrPlugin;
}

interface IGDatePickerOpt {
    onClose?: Function,
    /** události na otevření kalendáře */
    onOpen?: Function,
    /** události při změně v kalendáři */
    change?: Function
    /** mód kalendáře */
    mode?: string,
    minDate?: string,
    maxDate?: string
    defaultHour?: number;
    defaultMinute?: number
}

interface JQuery {
    /**
     * políčko kalendářové komponenty
     * @param opt nastavení
     */
    gdatepicker(opt: IGDatePickerOpt): JQuery;
    gdatepicker(method: "focus"): JQuery;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gformfields.d.ts 

/**
 *
*/

type FormErrorPosition = "beforeLabel" | "afterLabel" | "supplement" | "below";
interface GFormOptions {
    customClass?: string;
    /** ve formátu "L[1-3]M[1-3]S[1-3], L[1-12]-[1-12]-[1-12], M[1-12]-[1-12]-[1-12], S[1-12]-[1-12]-[1-12]"  */
    layoutDescriptor?: string;
    name?: string;
    tabLabel?: string; 
    /**
     * Příznak, zda je tab otevřený
     * @type {boolean}
     */
    opened?: boolean;
    init?(this: HTMLElement, options: GFormOptions): void;
    complete?: ((this: HTMLElement, o: GFormOptions) => void) | ((this: HTMLElement, o: GFormOptions) => void)[];
    errorRenderer?: ((this: HTMLElement, errors: Gordic.Validators.Error[], position: FormErrorPosition, defaultRenderer: (errors: Gordic.Validators.Error[]) => JQuery<HTMLElement>) => JQuery<HTMLElement>);
    dialogOptions?: GDialogOptions & { id?: string };
    tabOptions?: GTabOptions; 
}

interface GSectionOptions {
    name?: string;
    customClass?: string;
    label?: string;
    layoutDescriptor?: string;
    init?: ((this: HTMLElement, o: GSectionOptions) => void) | ((this: HTMLElement, o: GSectionOptions) => void)[];
    complete?: ((this: HTMLElement, o: GSectionOptions) => void) | ((this: HTMLElement, o: GSectionOptions) => void)[];
    errorRenderer?: ((this: HTMLElement, errors: Gordic.Validators.Error[], position: FormErrorPosition, defaultRenderer: (errors: Gordic.Validators.Error[]) => JQuery<HTMLElement>) => JQuery<HTMLElement>);

}

interface GFormRowOptions {
    name?: string;
    customClass?: string;
    hint?: string;
    label?: string;
    required?: boolean;
    layoutDescriptor?: string;
    init?: ((this: HTMLElement, o: GFormRowOptions) => void) | ((this: HTMLElement, o: GFormRowOptions) => void)[];
    complete?: ((this: HTMLElement, o: GFormRowOptions) => void) | ((this: HTMLElement, o: GFormRowOptions) => void)[];
    errorRenderer?: ((this: HTMLElement, errors: Gordic.Validators.Error[], position: FormErrorPosition, defaultRenderer: (errors: Gordic.Validators.Error[]) => JQuery<HTMLElement>) => JQuery<HTMLElement>);
}

interface ModelOptions {
    initialValues?: boolean;
    processInnerAsMyOwn?: boolean;
    resolveDependency?: boolean;
    setFlags?: FieldSetValueFlags;
    verificationNeeded?: boolean;
}

interface GFieldChangeEvent<TValue> {
    (this: HTMLElement, event: JQueryEventObject, input: { value: null | TValue; flags: FieldSetValueFlags; }): void | boolean;
}

interface GFactorChangeEvent {
    (this: HTMLElement, event: JQueryEventObject, input: { factor: GFactorOptions["factor"]; flags: FieldSetValueFlags; }): void | boolean;
}

//TAltValue je všude tam, kde je potřeba měnit v závislosti na multi=true typ na T[]
interface GFieldOptions<TValue> extends JQueryUI.WidgetOptions {
    customClass?: string;
    emptyValue?: null | TValue;
    defaultValue?: null | TValue;
    error?(event: JQueryEventObject, errors: Gordic.Validators.Error[]): boolean | void;
    errors?: Gordic.Validators.Error[];
    errorsToTooltip?: boolean;
    change?: GFieldChangeEvent<TValue>;
    initialValue?: any;
    model?: string | ((this: HTMLElement, operation: string, dto: ObjectLiteral<any>, modelOptions?: ObjectLiteral<any>) => string | void) | null | false;
    modelOptions?: Object;
    modelValueTransform?: {
        apply?(modelValue: any): TValue | null | undefined | void;
        collect?(fieldValue: null | TValue): any | null | undefined | void;
    };
    modelDefaults?: ObjectLiteral<any>;
    name?: string;
    smartNavigation?: boolean;
    smartNavNextElement?(this: HTMLElement, current: HTMLElement, nextSmartNavElement: HTMLElement): null | false | JQuery<HTMLElement> | Element | JQueryPromise<Element> | JQueryPromise<null> | JQueryPromise<false> | void;
    tooltip?: Gordic.Widget.IGTooltipType;
    //validators?: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[];
    validators?: (Gordic.Validators.Validator<Gordic.Validators.ValidatorOptions> | Gordic.Validators.ValidatorOptions & { type?: string } | null)[];
    invalidTransform?: (input: any) => any
    verify?: (input: any) => any
    tabIndex?: number
    /**
     * waitingForValue - metoda vrací právě probíhající promise nebo null
     * @type {JQueryPromise<TValue> | null}
     */
    waitingForValue?: JQueryPromise<TValue> | null;
    assistId?:string
}

interface GStaticFieldOptions<TValue = any> extends GFieldOptions<TValue> {
    itemTemplate?: string | ((value?: TValue) => JQuery | HTMLElement | string | void);
}
interface GDummyFieldOptions<TValue = any> extends GFieldOptions<TValue> {
    getValue?: (() => TValue|null);
    setValue?: ((value: TValue | null, flags?: FieldSetValueFlags) => TValue);
}

interface GCheckOptions extends GFieldOptions<boolean | null> {
    /** Dlouhý nápis zobrazený vpravo od checkboxu. */
    label?: string;
    /** Experimentální vlastnost. Na obrazovce velikosti S převezme label z
        gformrow a nastaví jako svůj label, takže label není vertikálně nad
        checkbox ale horizontálně napravo do něj. */
    labelFromRow?: "never" | "responsive" | "always";
}

interface IRadio<TValue> {
    value: TValue;
    label?: string;
    id?: string;
    customClass?: string;
    disabled?: boolean;
}

interface GRadioOptions<TValue> extends GFieldOptions<TValue | null> {
    radios: IRadio<TValue>[];
    itemClass?: string;
    groupName?: string
}
interface GFactorOptions {
    caption: string;
    factor: string;
    icon?: string;
}
interface GFieldFlagOptions {
    text: string;
    state?: GState;
    customClass?: string;
}
interface GFieldTagOptions {
    id?: string;
    text?: string | null;
    tooltip?: string;
    action?: GAction;
    state?: GState;
    customClass?: string;
}

interface GControlBoxOptions<TValue> extends GFieldOptions<TValue> {
    buttons?: (MenuParams & {
        /** (default = true) - automatické řízení zašednutí. Pokud je
          * false, následující parametry budou ignorovány: requireEdit,
          * requireValue */
        autoStateControl?: boolean;
        /** (default = true) - tlačítko bude zašednuté zároveň s políčkem
          * (např. otevření výběrového formuláře). Nastavením false bude
          * tlačítko k dispozici i pro disabled políčka (typicky např.
          * zobrazení detailu hodnoty v políčku) */
        requireEdit?: boolean;
        /** (default = false) - tlačítko bude zašednuté, pokud políčko má
          * value == emptyValue */
        requireValue?: boolean;
        /** (default = true) - zda se na aktivním tlačítku zastaví
          * standardní tab formuláře */
        tabbable?: boolean;
    })[];
    factors?: GFactorOptions[];
    factorOptions?: {
        /**
         * requireEdit
         * @default true
         */
        requireEdit?: boolean,
        /**
         * autoStateControl
         * @default true
         */
        autoStateControl?: boolean,
        /**
         * tabbable
         * @default true
         */
        tabbable?: boolean,
        /**
         * iconsOnly
         * @default false
         */
        iconsOnly?: boolean
    };
    factor?: GFactorOptions;
    factorChange?: GFactorChangeEvent;
    flag?: null | GFieldFlagOptions | string;
    tag?: null | GFieldTagOptions;
    states?: MenuParams[];
    /** (default false) Tlačítka a stavy mohou být zarovnany vedle sebe
      * (zúžují pracovní plochu políčka), nebo pod sebou. */
    verticalButtons?: boolean;
    tabbable?: boolean;
}




interface GFieldTagByValue {
    (this: HTMLElement, value: string): (GFieldTagOptions | null);
}
interface GSingleInputBoxOptions<TValue> extends GControlBoxOptions<TValue> {
    /** Text zobrazený v políčku pokud nemá žádnou hodnotu. */
    placeholder?: string;

    allowedChars?: string;
    charMode?: "upper"|"lower";
    spellCheck?: boolean;
    autoComplete?: string;

    tagByValue?: GFieldTagByValue | null;
}

interface GStringBoxOptions extends GSingleInputBoxOptions<string> {
    /** (default true) Zda je povolená uživatelská změna velikosti multiline
        políčka. */
    allowResize?: boolean;
    /** V případě multiline režimu (nastavené rows) se při každé strojové změně
        hodnoty (setValue(), model("apply")) zavolá metoda autoSize()
        nastavující výšku stringboxu podle počtu řádků obsahu. */
    autoSize?: boolean;
    /** (default: "text") Určuje typ HTML políčka. Je doporučeno používat všude "text". */
    inputType?: "text" | "password" | "email" | "tel" | "number" | "date" | "datetime" | "month" | "search";
    /** Počet řádků textu (pouze pro určení výchozí výšky políčka). Zároveň
        slouží jako příznak multiline režimu (jakékoliv kladné číslo spustí
        tento režim). */
    rows?: number;
    /** (default true) Zalamování řádků. Má smysl pouze v multiline režimu
        (nastavené rows). Nastavení false zobrazí horizontální scrollbar. */
    wrap?: boolean;
    /**
     * (default = false)
     * Za normálních okolností při zapnutém systému SmartNavigation se klávesou ENTER potvrdí hodnota políčka a focus skočí na další políčko. V případě multiline režimu (nastavené rows) se však ENTER na  stringboxu používá k odřádkování hodnoty. A potvrzení hodnoty a odskok na další políčko se realizuje stiskem CTRL+ENTER.
     * Změnou tohoto nastavení lze docílit převrácení tohoto chování. Tedy ENTER opustí políčko, zatímco CTRL+ENTER odřádkuje text v multiline stringboxu.
     * Kdy zvolit false:
     *   dlouhé multiline, kde uživatel typicky zadává více řádků
     * Kdy zvolit true:
     *   typicky jednořádkové texty, kde multiline slouží především pro zalomení a viditelnost dlouhého jednořádkového textu
     * @type {boolean}
     */
    smartNavInvertEnterBehavior?: boolean;
    /**
     * (default = null)
     * Po zadání specifického počtu znaků se automaticky spustí SmartNavigation přesun na další políčko.
     * @type {number | null}
     */
    smartNavOnLength?: number | null;
    /**
     * Maximalni povolena delka zadani do policka. NEPOUZIVAT NA KLASICKA TEXTOVA POLE!!! Pouze na vyjimecne pripady ohledne zadavani strukturovanych cisel, apod.
     * */
    maxLength?: number;
}

interface GFormattedBoxOptions<TValue> extends GSingleInputBoxOptions<TValue> {
    /** (default false) Zmáčknutí klávesy ENTER provede parse hodnoty a její
        přeformátování v režimu editace (políčko má focus). Jedná se o potvrzení,
        že např. zadaný datum bude správně pochopen. */
    enterToConfirm?: boolean;
    /** Delegát volaný při parsu hodnoty z políčka. Má za úkol zkonvertovat
        textovou hodnotu (parametr str; např. zadanou uživatelem) na interní
        value. */
    parser?(value: string): TValue | null | undefined;
    /** Delegát volaný při potřebě zobrazení interní hodnoty. Má za úkol vstupní
        value převést na string, typicky zobrazený v políčku samotném.
        editMode -- příznak, zda je požadována hodnota pro editační mód
        (editMode == true; uživatel stojí v políčku a mění jeho hodnotu),
        nebo pro zobrazení (editMode == false; políčko nemá focus, nebo vůbec
        není editovatelné) */
    formatter?(value: TValue | null, editMode?: boolean): string | void;
}

interface GNumberBoxOptions<TValue = number | Decimal > extends GFormattedBoxOptions<TValue> {
    /** (default 0) Počet desetinných míst, na které se číslo automaticky
        zaokrouhluje. */
    decimals?: number;
    /** (default ".") Desetinný oddělovač. */
    decimalSeparator?: string;
    /** (default true) Zda je počet desetinných cifer fixní (doplněn zprava
        nulami, pokud je přesnost čísla jiná, než uvedená decimals). */
    fixed?: boolean;
    /** (default "{value}") Univerzální formát čísla použitý v zobrazovacím módu
        (není focus). */
    format?: string;
    /** (default false) Při pouhém zobrazení hodnoty (není focus) se odstraní
        desetinné nuly, pokud za desetinnou čárkou jsou jen a pouze nuly */
    hideZeroDecimalsEdit?: boolean;
    /** Minimální hodnota políčka. */
    minValue?: number | Decimal | null;
    /** Maximální hodnota políčka. */
    maxValue?: number | Decimal | null;
    /** (default univerzální format pro zápis účetního hodnot
        (např.: "({+value})" )) Formát specificky pro záporná čísla. */
    negativeFormat?: string;
    /** Formát specificky pro kladná čísla. */
    positiveFormat?: string;
    /** (default false) Příznak, že záporná hodnota se má zobrazovat červeně. */
    redNegative?: boolean;
    /** (default "number") Jaký typ se hodnota přetypuje pro metodu getValue(),
        případně model("collect"). */
    returnType?: "decimal" | "number" | "string";
    /** Výčtové typy zaokrouhlení z object Decimal */
    rounding?: Decimal.Rounding;
    /** (default 1) Kroku, o který se hodnota políčka změní v případě akcí
        "zvětšit hodnotu", "zmenšit hodnotu". */
    step?: number;
    /** (default "") Oddělovač tisíců. */
    thousandsSeparator?: string;
    /** (default univerzální format (např.: "-" )) Formát specificky pro nulu. */
    zeroFormat?: string;
}

interface GDateBoxOptions extends GFormattedBoxOptions<Date> {
    /** (default false) Pokud je valueType == "datetime", ale časová složka je
        prázdná, nebude se zobrazovat (ale je možno ji zadat). */
    hideZeroTime?: boolean;
    /** Minimální hodnota políčka. Hodnota se na minValue automaticky zarovná
        (na rozdíl např. validátoru Gordic.Validators.Range, který chybnou
        hodnotu zachová, jen zvýrazní). */
    minValue?: Date | null;
    /** Maximální hodnota políčka. Hodnota se na maxValue automaticky zarovná
        (na rozdíl např. validátoru Gordic.Validators.Range, který chybnou
        hodnotu zachová, jen zvýrazní). */
    maxValue?: Date | null;
    /** (default "date") Typ hodnoty určuje, co lze do políčka zadat. Uživatelem
        (modelem) zadaná hodnota se přizpůsobuje zadanému typu. */
    valueType?: "date" | "datetime";
    /**
     * formát datumu
     * @type {string}
     */
    format?: string;

    pickerOptions?: Partial<IGDatePickerOpt>
}

interface GIntervalBoxOptions extends GFormattedBoxOptions<{
    start?: Date;
    end?: Date;
}> {
    /** (default false) Pokud je valueType == "datetime", ale časová složka je
        prázdná, nebude se zobrazovat (ale je možno ji zadat). */
    hideZeroTime?: boolean;
    /** Minimální hodnota políčka. Hodnota se na minValue automaticky zarovná
        (na rozdíl např. validátoru Gordic.Validators.Range, který chybnou
        hodnotu zachová, jen zvýrazní). */
    minValue?: Date | number | Decimal | null;
    /** Maximální hodnota políčka. Hodnota se na maxValue automaticky zarovná
        (na rozdíl např. validátoru Gordic.Validators.Range, který chybnou
        hodnotu zachová, jen zvýrazní). */
    maxValue?: Date | number | Decimal | null;
    /** (default "date") Typ hodnoty určuje, co lze do políčka zadat. Uživatelem
        (modelem) zadaná hodnota se přizpůsobuje zadanému typu. */
    valueType?: "date" | "datetime";
}
interface GSelectBoxMulti<TValue> extends GSelectBoxOptions<TValue, TValue[]> {
    multi: true;
}

type GSelectBoxData<TValue> = TValue[] | Gordic.Data.View<TValue> | JQueryPromise<TValue[] |Gordic.Data.View<TValue>>;

/**
 * Interface for selectbox options, which defines properties and functions for selectbox.
 *
 * @author Vlastimil Máca
 * @since 480.1.0.118
*/
interface GSelectBoxOptions<TValue, TValueMulti=TValue> extends GControlBoxOptions<TValueMulti> {

    selectorFormat?: Gordic.Data.GridFormat;

    data?: GSelectBoxData<TValue> | ((filter: string) => GSelectBoxData<TValue>) | Gordic.Data.Readers.Base<TValue>;
    /** (default false) Přepíná režim políčka mezi selectorem (trojtečka) a
        dropdownem (šipečka). */
    dropdown?: boolean;
    /** (default 1) Minimální počet napsaných znaků, pro který spustí filtrování
        v nabídce nápovědy (autocomplete). */
    filterMinLength?: number;
    /** (default null) Řízení režimu zobrazení políčka (textové/grafické) a
        umístění vyhledávacího inputu pro nabídku nápovědy (místo kam píše
        uživatel). */
    graphicInput?: "always" | "hidden" | "oninput" | "exclusive" | null;
    helperColumns?: string[];
    /** Definice algoritmu pro klientské filtrování. Naplněním false se
        klientský filtr vypne a automaticky se nastaví
        serverFastFilterSupport = true. */
    clientFilterEvaluator?: false | {
        prepareView?: (dataview: object) => void;
        filter?: (fastfilter: string) => ((e: TValue) => boolean);
    };
	/**
	 * Delegát se zavolá při výběru hodnoty z autocomplete. Je tak možné zareagovat na vybranou hodnotu i jinak, než prostým výběrem.
	 * Pokud funkce vrátí false, neprovede se smartNavigation odskok.
	 */
    helperChoice?: (value: any) => any;
    /** CSS styl pro jednotlivé položky nabídky (autocomplete). */
    helperItemClass?: string | ((value: TValue) => string);
    /** (default 50) Maximální zobrazený počet položek v nabídce nápovědy
        (autocomplete). */
    helperLimit?: number;
    /** (default options.itemTemplate ) Šablona pro položky nabídky
        (autocomplete). */
    helperItemTemplate?: string | ((value: TValue) => JQuery | HTMLElement | string);
    /** CSS styl pro celý DIV nabídky (autocomplete).  */
    helperViewPortClass?: string;
    /** CSS třída, která se aplikuje na jednotlivé buňky při povoleném
        multivýběru (multi), či grafickém režimu (graphicInput). */
    itemClass?: string | ((value: TValue) => string);
    /** Povolí/zakáže odebrat položku. Platí pouze pro multivýběr (multi). */
    itemDeletable?: boolean | ((value: TValue) => boolean);
    /** Šablona pro hodnotu v políčku. */
    itemTemplate?: string | ((value?: TValue) => JQuery | HTMLElement | string | void);
    /** (default "w-12") CSS třída, určená pro distribuci šířky políčka mezi
        hodnoty */
    itemWidth?: string;
    /** Šablona pro tooltip na buňkách (buňka = DOM Element pro každou
        individuální hodnotu) při povoleném multivýběru (multi), či grafickém
        režimu (graphicInput). */
    itemTooltipTemplate?: string | ((value: TValue) => JQuery | HTMLElement | string);
    /** (default false) Políčko bude hodnoty nabízet formou listboxu (všechny
        hodnoty stále viditelné, vybrané hodnoty označené) */
    list?: boolean;
    /** (default false) Přepíná, zda lze vybrat jedinou hodnotu, nebo lze vybrat
        hodnot více. */
    multi?: boolean;
    /** (default false) Určuje, zda se prázdná hodnota (value odpovídá
        emptyValue) posílá do renderovací šablony itemTemplate. */
    renderEmpty?: boolean;
    /** Příznak, zda se zobrazuje výchozí ovládací tlačítko (šipečka u dropdown,
        trojtečka u selectoru). */
    showSelectButton?: boolean;
    /** (default true) Vlastnost smartNavMoveOnChoice řídí chování klávesy ENTER
        pokud je otevřená nabídka hodnot (autocomplete) a uživatel nějakou
        hodnotu vybere. Ve výchozím nastavení výběr hodnoty z nabídky klávesou
        ENTER považuje hodnotu za verifikovanou a systém SmartNavigation
        automaticky pokračuje ve vyplňování dalších polí. Nastavením hodnoty
        false se chování přepne a výběr z nabídky hodnot pouze hodnotu vybere a
        umístí do políčka. Je nutné zmáčknout ENTER znovu (nyní bez otevřené
        nabídky), aby se hodnota zvalidovala a focus přeskočil dál. */
    smartNavMoveOnChoice?: boolean;
    /** (default false) Povolení měnit pořadí vybraných hodnot. */
    sortable?: boolean;
    /** Selector externího příjemce položek. Slouží k propojení dvou, nebo více,
        fieldů/elementů a umožnění přetahování hodnot mezi nimi. */
    sortableLink?: string;
    /** (default true) Povoluje/zakazuje možnost akceptovat hodnotu, která není v
        originálním zdroji dat (vlastnost data). */
    strict?: boolean;
    /** Serverové filtry, které lze použít pro odeslání požadavku na server. */
    serverFilters?: any;
    /** (default false) Příznak, zda se při volání funkce pro odložená data
        (viz data) lze spoléhat na server, že použije předaný (žádaný)
        fastfilter, nebo že informaci o jeho ignorování explicitně předá v
        odpovědi (viz. dynamický režim filtrů). */
    serverFastFilterSupport?: boolean;
    /**
     * Událost vzniká při každém vytvoření interního DIVu individuální hodnoty grafického políčka (graphicInput). Vzniká po vytvoření a přípravě divu. Umožňuje položku modifikovat, například nastavit vlastní události, onclick, apod. Událost nenastává pro textová políčka.
     * @param event standardní Event objekt
     * @param div vytvořený a naplněný HTML element vkládaného itemu
     * @param value hodnota, pro níž je div renderován
     * @param index index odpovídající pořadí v poli hodnot; -1 pro singlevalue políčko
     * @param btnAdd funkce pro přidání vlastního minitlačítka na item
     */
    itemCreated?(event: JQueryEventObject, div: HTMLDivElement, value: any, index: number, btnAdd: (btn: MenuParams | GAction) => void): void | boolean;
    selector?: ((this: HTMLElement, selector: any) => JQueryPromise<TValue>);
    verify?(this: HTMLElement, value: any, isMulti?: boolean): any | void
    placeholder?: string;
    helperCustomizer?: null | ((data: TValue[]) => TValue[])
    tagByValue?: GFieldTagByValue | null;
}

/**
 * Options for selectbox, when multi is false or undefined
 *
 * @author Vlastimil Máca
 * @since 480.1.0.118
*/
interface GSelectBoxOptionsSingle<TValue> extends GSelectBoxOptions<TValue> {
    multi?: false
}

/**
 * Options for selectbox, when multi is true.
 *
 * @author Vlastimil Máca
 * @since 480.1.0.118
*/
interface GSelectBoxOptionsMulti<TValue> extends GSelectBoxOptions<TValue, TValue[]> {
    multi: true
}

/**
 * Options for selectbox, when multi cannot be resolved, i.e. field is defined by multiple GSelectBoxOptions where one has multi = false, other multi=true and other again multi=false
 *
 * @author Vlastimil Máca
 * @since 480.1.0.118
*/
/*interface GSelectBoxOptionsDefault<TValue> extends GSelectBoxOptionsBase<TValue, TValue | TValue[]>{
    verify?(value: any, isMulti?: boolean): any | void
}*/


//type GSelectBoxOptions<T> = GSelectBoxOptionsSingle<T> | GSelectBoxOptionsMulti<T>;

interface GFormBoxMultiFormItem {
    caption?: string
    icon?: string | string[]
    newItemData: object
}

interface GFormBoxOptions<TValue, TValueMulti=TValue> extends GSelectBoxOptions<TValue, TValueMulti> {
    /**
     * form
     * @type {Gordic.Forms.Form}
    */
    form?: Gordic.Forms.Form | ((newItem?: GFormBoxMultiFormItem) => (GFormBoxMultiFormItem[] | Gordic.Forms.Form)),
    /**
     * newItemData
     * @type {ObjectLiteral<any>}
     * @default {}
    */
    newItemData?: ObjectLiteral<any>,
    /**
     * dialogOptions
     * @type {GDialogOptions}
     * @default null
    */
    dialogOptions?: GDialogOptions,
    /**
     * (default = true) itemEditable
     * @type {boolean}
     * @default true
    */
    itemEditable?: boolean | ((value: TValue) => boolean),

    /**
     * (default = "default") mode
     * @type {"default" | "inlinesubmit" | "inlineimmediate"}
     * @default "default"
    */
    mode?: "default" | "inlinesubmit" | "inlineimmediate"
}


interface GFormBoxOptionsSingle<TValue> extends GFormBoxOptions<TValue> {
    multi?: false
}

interface GFormBoxOptionsMulti<TValue> extends GFormBoxOptions<TValue, TValue[]> {
    multi: true
}

interface GMdFieldOptions extends GStringBoxOptions {
    isPreviewVisible?: boolean, 
    menuParams?: MenuParams[],
    preview?: JQuery<HTMLElement> //kontajner, do kter0ho se má náhled vykreslit
}

declare class GFileField {
    inputDiv: JQuery; 
    /**
     * Metoda vrací informace o souborech
     * @returns Informace o souborech
     */
    getValue(): Gordic.General.ApplicationInterface.GFileInfoDto[]
    /**
     * Metoda pro nastavení hodnoty do políčka
     * @param {GFileInfoDto | GFileInfoDto[]} value Nastavovaná hodnota
     * @param {any} flags Příznaky
     */
    setValue(value: Gordic.General.ApplicationInterface.GFileInfoDto | Gordic.General.ApplicationInterface.GFileInfoDto[], flags?: any): void;

    /**
     * Metoda pro určení, zda políčko obsahuje chybu
     * @returns true - chyba, jinak false
     */
    itemHasError(): boolean;
    /**
     * Metoda pro smazání souboru z políčka
     * @param {GFileInfoDto} row Informace o souboru
     * @returns Promise
     */
    removeFile(row: Gordic.General.ApplicationInterface.GFileInfoDto): JQueryDeferred<void>;

    /**
     * Stažení souboru
     * @param {GFileInfoDto} row Informace o souboru
     */
    downloadFile(row: Gordic.General.ApplicationInterface.GFileInfoDto): void;

    /**
     * Metoda pro určení, zda velikost souboru je větší než povolená hodnota
     * @param {any} value Informace o souboru
     * @returns Vratí true, když je velikost souboru větší než limit, jinak false
     */
    checkOneFileMaxSize(value: any): boolean;

    /**
     * Metoda pro určení, zda soubor má nepovolenou koncovku
     * @param {any} value Informace o souboru
     * @returns Vratí true, když má soubor nepovolenou koncovku
     */
    checkFileExtension(value: any): boolean;

    /**
     * Metoda pro určení, zda nově přidávaný soubor nepřekročí hodnotu omezení velikosti nahrávaných souborů
     * @param {any[]} files Pole informací o souborech
     * @param {number} newFileSize Velikost nového souboru v B
     * @param {boolean} ignoreError Příznak, zda se mají ignorovat chyby
     * @returns Vratí true, když nově přidávaný soubor překročí stanovený limit, jinak false
     */
    checkMaxSizeFiles(files: any[], newFileSize: number, ignoreError: boolean): boolean;

    /**
     * Metoda vrací velikost všech souborů v B
     * @param {any[]} files Pole informací o souborech
     */
    getSize(files: any[]): number;

    /**
     * Metoda pro nahrání souboru
     * @param files Informace o souborech
     */
    uploadFile(files: any[]): void;
    /**
     * Metoda pro získání asynchronní hodnoty
     * @returns Pole informací o souborech
     */
    getValueAsync(): JQueryDeferred<Gordic.General.ApplicationInterface.GFileInfoDto[]>;


    /**
     * Validace
     * @param activateAutoValidation Příznak, zda se má aktivovat automatická validace
     * @param groups Řetězec vyjmenovaných skupin chyb, není-li uveden berou se všechny skupiny
     */
    validate(activateAutoValidation?: boolean, groups?: string): void;

    /**
     * Nastavení nově přidávaného souboru do kolekce informací o souborech
     * @param values Kolekce informací o souborech
     * @param newValue Nově přidávaná informace o souboru
     */
    setNewValue(values: Gordic.General.ApplicationInterface.GFileInfoDto[], newValue: Gordic.General.ApplicationInterface.GFileInfoDto): void;

    /**
     * Převod kolekce FormData do kolekce informací o souborech
     * @param array
     */
    fileToDto(array: any[]): Gordic.General.ApplicationInterface.GFileInfoDto[];

    /**
     * Metoda pro vygenerování ID pro soubor
     * formát RRMMDD(12 náhodně zvolených znaků a-Z0-9)
     */
    generateNewId(): string;

    /**
     * Převod hodnoty velikosti souboru na textovou reprezentaci
     * @param size Velikost souboru v B
     * @returns Textem vyjádřená velikost souboru (např. 12.4 MB)
     */
    getFileSize(size: number): string;

    /**
     * Převod přípony souboru na typ ikony pro soubor
     * @param extensions Přípona souboru
     * @returns Typ ikony
     */
    getFileTypeIcon(extensions: string): string;

    /**
     * Přidání dropzóny na jakýkoli element
     * @param element Element v DOM, který bude nově obsahovat dropzónu
     */
    addDropzone(element?: JQuery): void;
    /**
     * Odebrání dropzóny z elementu
     * @param element Element v DOM, kterému bude odebrána dropzóna
     */
    removeDropzone(element?: HTMLElement | HTMLElement[]): void;

    /**
     * Nastavení dropzón - povolení/zakázaní
     * @param enabled Příznak, zda dropzóny povolit nebo zakázat
     */
    setDropzones(enabled: boolean): void;
}


/**
 * DTO pro přenos informací o souboru v událostech stažení, nahrání, smazání souboru
 */
interface GFileFieldEventDto {
    /** Informace o souboru */
    fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto,
    /** Uživatelské rozpoznání dat, funkce bez parametrů, this je widget políčka*/
    customData?: any
}

/**
 * DTO pro přenos informací o přenosu souboru
 */
interface GFileFieldProgressDto {
    /**Id souboru */
    id: string,
    /** nactena velikost souboru*/
    loaded: number,
    /**
     * celkova velikost souboru
     * @type {number}
     */
    total: number

}


/** DTO pro přenos informací o souboru při obsloužení chyby u stahování nebo nahrávání souboru */
interface GFileFieldErrorEventDto {
    /** Informace o souboru */
    fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto;
    /** Akce, pro kterou se vyvolala událost obsluhy chyby */
    action: "download" | "upload";
    /** Důvod chyby */
    reason: string;
}



interface GFilefieldOptions extends GControlBoxOptions<Gordic.General.ApplicationInterface.GFileInfoDto[]> {
    /**
     * pripravi soubor na serveru - prenos mezi vrstvami (např. přes APG)
     */
    prepareFilesOnServer?: boolean;
    /**
     * Delegat volany pred samotnym uploadem, kdyz vrati false, upload se neprovede
     */
    preUploadDelegate?: (this: JQuery<HTMLElement>, files: FileList) => boolean
    /** Akceptované typy souvorů, nastavují se dialogu před otevřením. */
    acceptExtension?: string;

    /**
     * Odkaz na třídu, která se použije při stahování souboru, který není uložený v dočasném uložišti na serveru nebo jeho identifikátor (guid) začíná na ext
     * @default "Gordic.Gui.WebControls.GFileServiceProvider"
     */
    fieldDownloaderClass?: string;

    /**
     * Určení u kterých souborů je viditelné tlačítko smazat. Je-li nastavená hodnota true/false. Je mazaní povoleno/zakázáno, pro všechny soubory.
     * @default (row:GFileInfoDto)=>!!row.quid
     */
    itemDeletable?: boolean | ((row: Gordic.General.ApplicationInterface.GFileInfoDto) => boolean);

    /**
     * Šířka prvku v políčku, např.: "w-L-4 w-S-12 w-M-6"
     * @default "w-12"
     */
    itemWidth?: string;

    /**
     * Maximální počet souborů, které políčko akceptuje. Vkládá-li se více souborů, než je povolené, pak vyskočí varování a nedojde k nahrání
     * souborů na server. Hodnota 0 znamená, že se tato vlastnost ignoruje.
     * @default 0
     */
    maxFileCount?: number;

    /**
     * Maximální velikost všech nahrávaných a nahraných souborů, které políčko akceptuje. Velikost je udávaná v Byte. Při vkládání souborů, jejichž
     * součet velikostí je větší, než tato vlastnost, nedojde k nahrání a vyskočí varování. Hodnota 0 znamená, že se tato vlastnost ignoruje.
     * @default undefined
     */
    maxFileSize?: number;

    /**
     * Maximální velikost jednoho souboru, které políčko akceptuje. Při vkládání většího souboru, než povoluje tato vlastnost, nedojde k nahrání,
     * prvek souboru zčervená a nastaví se tooltip. Hodnota 0 znamená, že se tato vlastnost ignoruje.
     * @default undefined
     */
    maxOneFileSize?: number;

    /**
     * Option, zda je povoleno v políčku uploadovat soubory
     * @type {boolean}
     * @default true
     */
    canUpload?: boolean,

    /**
     * Maximální doba (trvanlivost) v minutách, po kterou bude soubor dostupný na serveru
     * @type {number}
     * @default 1440 (24h)
     */
    lifetime?: number,
    /**
     * Option, zda je povoleno stahovat na neaktivním políčku
     * @type {boolean}
     * @default false
     */
    downloadOnDisabledField?: boolean,

    /**
     * Metoda vyvolána při stažení souboru
     * @param {JQueryEventObject} event Objekt události
     * @param {GFileFieldEventDto} fileInfo Informace o souboru
     */
    fileDownloaded?(event: JQueryEventObject, fileInfo: GFileFieldEventDto): any;

    /**
     * Metoda vyvolána při smazání souboru
     * @param {JQueryEventObject} event Objekt události
     * @param {GFileFieldEventDto} fileInfo Informace o souboru
     */
    fileRemoved?(event: JQueryEventObject, fileInfo: GFileFieldEventDto): any;

    /**
     * Metoda vyvolána při vybrání souboru
     * @param {JQueryEventObject} event Objekt události
     * @param {GFileFieldEventDto} fileInfo Informace o souboru
     */
    fileSelected?(event: JQueryEventObject, fileInfo: GFileFieldEventDto): any;
    /**
     * Metoda vyvolání po přetáhnutí a puštění souborů na dropzone
     * @param ev
     * @param obj
     */
    drop?(ev: JQueryEventObject, obj: { files: Gordic.General.ApplicationInterface.GFileInfoDto[] }): void;

    /**
    * Metoda vyvolání po vlozeni souboru ze schránky
    * @param ev
    * @param obj
    */
    paste?(ev: JQueryEventObject, obj: { files: Gordic.General.ApplicationInterface.GFileInfoDto[] }): void;

    /** mod - add (pridat - default), replace - nahradit */
    mode?: "add" | "replace"

    /**
     * Metoda vyvolana pri startu uploadu
     * 
     * @param {JQueryEventObject} event Objekt udalosti
     * @param {GFileFieldEventDto} fileInfo Informace o souboru
     * @returns {any}
     */
    uploadStarted?(event: JQueryEventObject, fileInfo: GFileFieldEventDto): any;

    /**
     * Metoda vyvolána při nahrání souboru
     * @param {JQueryEventObject} event Objekt události
     * @param {GFileFieldEventDto} fileInfo Informace o souboru
     */
    fileUploaded?(event: JQueryEventObject, fileInfo: GFileFieldEventDto): any;

    /**
     * Informace o prubehu uploadu souboru
     * 
     * @param {JQueryEventObject} event
     * @param {GFileFieldProgressDto} progressInfo
     */
    uploadProgress?(event: JQueryEventObject, progressInfo: GFileFieldProgressDto): any;

    /**
     * Metoda vyvolána při chybě nahrávání, stažení souboru
     * @param {JQueryEventObject} ev Objekt události
     * @param {GFileFieldErrorEventDto} obj Informace o souboru
     */
    fileError?(ev: JQueryEventObject, obj: GFileFieldErrorEventDto): void;

    /** Metoda pro odlišení dat (např. skryté políčko použito na obraz i přílohy) */
    /** @default $.noop */
    customData?: () => any;

    /** Odkaz na třídu, která se použije při mazání souboru. */
    /** @default "Gordic.Gui.WebControls.GFileServiceProvider" */
    fieldRemoverClass?: string;

    /** Událost change se spustí pouze jednou při multi uploadu **/
    /** @default false*/
    triggerOnceMultiChanged?: boolean;

    /** Třída elementu(souboru) */
    /** Může být řetězec nebo funkce, která vrací řetězec*/
    /** @default null*/
    itemClass?: string | ((value: Gordic.General.ApplicationInterface.GFileInfoDto) => string);

    /** Zobrazení tlačítek vertikálně */
    /** @default true*/
    verticalButtons?: boolean;

    /**
     * Metoda určuje, které řádky lze stahnout (hodnota true), či nikoli (hodnota false)
     * Defaultně jsou stahnout pouze ty záznamy, které nejsou nové, mají identifikátor a neobsahují chybu
     */
    itemDownloadable?: boolean | (() => boolean);

    /** Parent Content pro navázání servisních contentů */
    parentContent?: GContent;
}

declare namespace Gordic.Validators {

    interface ValidatorOptions extends ObjectLiteral<any> {
        errorType?: string;
        group?: string;
        stopping?: boolean;
        message?: string;
        validate?: (value: any, source: JQuery) => boolean;
        validateWithMessage?: (value: any, source: JQuery) => String | null;
    }

    class Validator<P extends ValidatorOptions> {
        constructor(params?: P)

        errorType: string;
        group: string;
        stopping: boolean;

        getMessage(value: string): string;
        validate(value: any, source: JQuery): boolean;
    }

    class Base extends Validator<ValidatorOptions> { }
    class Required extends Validator<ValidatorOptions> { }
    class Range extends Validator<ValidatorOptions & {
        min?: number | Date | Decimal | string;
        max?: number | Date | Decimal | string;
    }> { }
    class Length extends Validator<ValidatorOptions & {
        min?: number;
        max?: number;
    }> { }
    class RegExp extends Validator<ValidatorOptions & {
        pattern: string | globalThis.RegExp;
    }> { }
    class Ixs extends Validator<ValidatorOptions & {
        pid?: boolean;
        ix?: string;
    }> { }

    interface Error {
        message?: string;
        errorType?: string;
        group?: string;
        showOnDisabled?: boolean;
        position?: any;
        stopping?: boolean;
    }


    //#region Validatory prenesene z C#

    interface JsonValidator {
        type: string;
        errorType: "error" | "warning" | "info";
        showOnDisabled: boolean;
        message?: string;

        /** Nazvy skupin oddelene teckou */
        group?: string;
    }

    interface JsonValidatorDateTime extends JsonValidator {
        type: "DateTime";
        min?: string;
        max?: string;
        /** TimeZone offset (minuty) */
        tz: number;
    }

    interface JsonValidatorLength extends JsonValidator {
        type: "Length";
        min?: number;
        max?: number;
    }

    interface JsonValidatorRange<T extends number | string | Date> extends JsonValidator {
        type: "Range";
        min: T;
        max: T;
    }

    interface JsonValidatorRegExp extends JsonValidator {
        type: "RegExp";
        pattern: string;
    }

    interface JsonRequired extends JsonValidator {
        type: "Required";
    }

    /** Pouziva se v pripadech, kdy je v DTO zanorene nejake dalsi DTO k validaci*/
    interface JsonValidatorsSelf {
        _self: JsonValidator[];
        [key: string]: JsonValidator[];
    }

    /** Validatory ziskane ze C# */
    type JsonValidators = ObjectLiteral<JsonValidator[] | JsonValidatorsSelf>;

    //#endregion
}

declare namespace Gordic.Templates {
    type Formatter = (value: any, format?: string | null) => string;

    interface IGTemplateRenderer<TRender extends AnyFunction = AnyFunction> {
        render: TRender
    }

    type IGTemplate<TRender extends AnyFunction = AnyFunction> = string | TRender | IGTemplateRenderer<TRender>;
    type IGTemplatesAlternatives<TRender extends AnyFunction = AnyFunction> = IGTemplate<TRender>;

    function fromString<T extends AnyFunction = AnyFunction>(ts: string): IGTemplateRenderer<T>;
    function iconTemplate<T extends AnyFunction = AnyFunction>(iconTemplate: IGTemplate<(data: any, ...params: any[]) => IconTemplate>, customClass: string): IGTemplateRenderer<T>;
    function ensureTemplate<T extends AnyFunction = AnyFunction>(template?: IGTemplate<T> | null): IGTemplateRenderer<T>;
    function nvlTemplate<T extends AnyFunction = AnyFunction>(templates: IGTemplate<T>[]): IGTemplateRenderer<T>;

    function resolve<T extends AnyFunction = AnyFunction>(template: IGTemplate<T>, data: any, ...params: any[]): ReturnType<T>; // TODO: {data: any, ...params: any[]} nahradit za neco jako Parameters<T>
    const Formatters: {
        dotNetDecimal: Formatter;
        /**
         * Formatovani data. Format (case sensitive!): 
         * yyyy = rok (alt. yy), 
         * MM = mesic (alt. M, MMMM - celý název měsíce),
         * dd = den (alt. d),
         * hh = hodina (alt. h),
         * mm = minuta,
         * ss = sekunda,
         * date = datum,
         * datetime = datum + cas,
         * smart = datum relativne vztazeny k dnesku,
         * smarttime = datum a cas relativne vztazeny k aktualnimu datu a casu.
         */
        date: Formatter;
        /**
         * Formatovani data a casu. Format (case sensitive!):
         * yyyy = rok (alt. yy),
         * MM = mesic (alt. M, MMMM - celý název měsíce),
         * dd = den (alt. d),
         * hh = hodina (alt. h),
         * mm = minuta,
         * ss = sekunda,
         * date = datum,
         * datetime = datum + cas,
         * smart = datum relativne vztazeny k dnesku,
         * smarttime = datum a cas relativne vztazeny k aktualnimu datu a casu.
         */
        datetime: Formatter;
        encode(value: string | null | undefined, format?: "html" | "full"): string;
        letter: Formatter;
        lower: Formatter;
        number(value: number | Decimal | null | undefined, format?: string): string;
        trim: Formatter;
        upper: Formatter;
    };

    const Default: IGTemplateRenderer;
    const Empty: IGTemplateRenderer;


}

declare interface TGFileDownloadOptions {
    /** jmeno contentu, který implementuje tridu pro stazeni souboru(jestlize nenacte guid) */
    fileServiceClass?: string;
    /** Element na který se může navěsit iframe, použitý pro stahování(defaltně je to document.body) */
    element?: JQuery;
    /** Funkce, která se posílá jako xhr callback */
    xhrCallback?: Function;
    /** Příznak o ponechání guidu(např.externí) */
    keepInitialGuid?: boolean;
    /** Smazat po stažení */
    deleteAfterDownload?: boolean;
}

declare class GFile {
    public upload(fd: FormData): JQueryPromise<Gordic.General.ApplicationInterface.GFileInfoDto[]>
    /**
     * Metoda na odstraneni souboru z docasneho uloziste
     * @param {string} guid identifikátor souboru, ktery chcete smazat
     * @param {string} fileServiceClass jmeno contentu, který implementuje tridu pro smazani souboru
     * @returns {JQueryPromise<void>} promise s vysledkem, kdyz resolved (smazano), jinak reject
     */
    public removeFile(guid: string, fileServiceClass?: string): JQueryPromise<void>

    /**
     * Metoda na stazeni souboru z docasneho uloziste
     * @param {Gordic.General.ApplicationInterface.GFileInfoDto} fileInfo Informace o stahovanem souboru (nejdulezitejsi, respektive nejnutnejsi je guid)
     */
    public download(fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto, options?: TGFileDownloadOptions): JQueryPromise<string>

    /**
     * Metoda na stazeni souboru z docasneho uloziste
     * @param {Gordic.General.ApplicationInterface.GFileInfoDto} fileInfo Informace o stahovanem souboru (nejdulezitejsi, respektive nejnutnejsi je guid)
     * @param {string|undefined} fileServiceClass jmeno contentu, který implementuje tridu pro stazeni souboru (jestlize nenacte guid)
     * @param {JQuery|undefined} element Element na který se může navěsit iframe, použitý pro stahování (defaltně je to document.body)
     * @param {Function|undefined} xhrCallback Funkce, která se posílá jako xhr callback
     * @param {boolean|undefined} keepInitialGuid Příznak o ponechání guidu (např. externí)
     * @param {boolean|undefined} deleteAfterDownload Smazat po stažení
     * @returns {JQueryPromise<string>} promise s identifikátorem, kdyz resolved (staženo), jinak reject s duvodem
     */
    public download(fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto, fileServiceClass?: string | TGFileDownloadOptions, element?: JQuery, xhrCallback?: Function, keepInitialGuid?: boolean, deleteAfterDownload?: boolean): JQueryPromise<string>

    /** Upload po castech */
    public chunkUpload(file: File, cancellationToken?: Gordic.Utils.GCancellationToken, lifetime?: number): JQuery.Promise<Gordic.General.ApplicationInterface.GFileInfoDto[], Gordic.Utils.File.IGChunkFileUploadError, Gordic.Utils.File.IGChunkFileUploadProgress>;

    /** Upload po castech */
    public chunkUpload(file: Blob, fileName: string, cancellationToken?: Gordic.Utils.GCancellationToken, lifetime?: number): JQuery.Promise<Gordic.General.ApplicationInterface.GFileInfoDto[], Gordic.Utils.File.IGChunkFileUploadError, Gordic.Utils.File.IGChunkFileUploadProgress>;

    /**
     * Smazani souboru
     * @param {string} guid identifikátor souboru
     */
    public cleanUpFile(guid: string);
    /**
     * Prenos souboru na server
     * @param {string} guid identifikátor souboru
     */
    public transferFile(guid: string);

}

declare namespace Gordic.Prefabs {

    // koliduje se String constructor
    //const String: {
    //    ixs(): GStringBoxOptions;
    //};

    export interface IGBasePrefabsOptions {
        /** Operátor, který se nastaví na počátku, jako default při nevyplněných hodnotách */
        defaultOperator: string;
        /** Pole defaultních operátorů, které chcete použít */
        operators: string[];
    }

    namespace Field {
        export function charCounter(max?: number, threshold?: number): GSingleInputBoxOptions<string>;

        export class Flags {
            static required: GFieldFlagOptions;
        }
    }

    namespace String {
        /**
         * Pole objectu s vlastnímy operátory
         */
        export interface IGStringPrefabsUserOperators {
            operator: string;
            icon: string;
            caption: string;
            tooltip: string;
        }

        export interface IGStringPrefabsIxsDto {
            allowedChars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            charMode: "upper";
            customClass: "ixsfield";
            smartNavOnLength: 12;
            states: MenuParams[];
            validators: Gordic.Validators.Ixs[];
        }



        export interface IGStringPrefabsOptions extends IGBasePrefabsOptions {
            /** Pole objectu s vlastnímy operátory */
            userOperators: IGStringPrefabsUserOperators[];
        }

        /**
         * Prefab operatorů pro stringboxy
         * @param {IGStringPrefabsOptions} options Vstupní hodnoty pro stringbox
         * @returns {GStringBoxOptions} Prefab operátorů pro stringboxy
         */
        export function withOperators(options?: IGStringPrefabsOptions): GStringBoxOptions;

        /**
         * gstringbox: pole pro zadani obecneho IXS
         * @param {boolean} pid Ixs se navic validuje specificky na PID
         */
        export function ixs(pid: boolean): IGStringPrefabsIxsDto;

    }



    namespace Number {
        export function decimal(decimals?: number, fixed?: boolean): GNumberBoxOptions<Decimal>;
        export function currency(): GNumberBoxOptions<Decimal>;
        // prefab operatoru pro numberboxy
        export function withOperators(options?: IGBasePrefabsOptions): GNumberBoxOptions;
        export function byteSize(isDecimal?:boolean): GNumberBoxOptions;

    }

    namespace Date {
        export function withOperators(options?: IGBasePrefabsOptions): GDateBoxOptions;

    }

    namespace Effects {
        const slide: GSwitcherEffect<GSwitcherEffectOptions>
        const flip: GSwitcherEffect<GSwitcherEffectOptions>
        const rotate3d: GSwitcherEffect<GSwitcherEffectOptions>
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gforms.d.ts 

/**
 * This is @internal
 */


/* 2.8 TS Features*/
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type AllWidgets = FunctionPropertyNames<JQuery>;

type AddFieldKnownWidgets = "gbutton" | "gbuttonpanel" | "gdatebox" | "gdummyfield" | "gstaticfield" | "gcheck" | "gradio" | "gintervalbox" | "glink" | "gnumberbox" | "gstringbox" | "gselectbox" | "gformbox" | "gfilefield" | "gmdfield";
type TGformMethods = "complete" | "createFrom" | "hasChanged" | "isValid" | "setup" | "getErrors" | "viewMode" | "waitForValues";

type AddFieldRestWidgets = Exclude<AllWidgets, AddFieldKnownWidgets>

interface _fieldTypes<T = any>{
    gbutton: GButtonOptions
    glink: GLinkOptions
    gbuttonpanel: GButtonPanelOptions
    gstringbox: GStringBoxOptions
    gdatebox: GDateBoxOptions
    gnumberbox: GNumberBoxOptions<T>
    gcheck: GCheckOptions
    gradio:GRadioOptions<T>
    gformbox: GFormBoxOptions<T>
    gselectbox: GSelectBoxOptions<T>
    gintervalbox: GIntervalBoxOptions
    gdummyfield: GDummyFieldOptions<T>
    gstaticfield: GStaticFieldOptions<T>
    gformtext: { html?: string | JQuery }
    gmdfield: GMdFieldOptions
}

/**
 * FieldSetValueFlags
 * Příznaky pro funkci setValue
 * @author pnovak
 * @since 480.1.0.332
 */
interface FieldSetValueFlags extends ObjectLiteral<any>{
    /**
     * valid - nastavovaná hodnota je validní - není nutná verifikace
     * @type {boolean}
     */
    valid?: boolean;
    /**
     * persistInputValue -  vola se v pripade setovani docasne hodnoty pri invalidnim vstupu. Reset erroru a nasledny resolvingPromise.resolve zpusobi, ze cekajici elementy nezachyti chybu
     * @type {boolean}
     */
    persistInputValue?: boolean;
    /**
     * triggerChange -  Příznak, zda se spustí change po setValue, defaultně je true
     * @type {boolean}
     */
    triggerChange?: boolean;
    /**
     * resolveDependency - příznak pro vyřešení závislostí (více T.Skála)
     * @type {boolean}
     */
    resolveDependency?: boolean;
}

/**
 * FormViewValues
 * Hodnota prezentační vrstvy formuláře section, row, fieldValue 
 * např z gform(method: "getViewValues"): JQueryPromise<FormViewValue[]>;
 * @author pdohnal
 * @since 526.1
 */
interface FormViewValue {
    /** Zobrazený text sekce, pod kterým se gfield nachází*/
    section: string;
    /** Zobrazený text řádku, vedle kterého se gfield nachází*/
    row: string;
    /** Zobrazená hodnota gfieldu */
    fieldValue: string | JQuery;
}

interface JQuery {


    /** Vyhledání formularu podle názvu (name) */
    findForms(...names: string[]): JQuery;
    /** Vyhledání sekci formulare podle názvu (name) */
    findFormSections(...names: string[]): JQuery;
    /** Vyhledání radku formulare podle názvu (name) */
    findFormRows(...name: string[]): JQuery;
    /** Vyhledání gfields podle názvu (name) */
    findFields(...name: string[]): JQuery;



    gfield(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gfield(method: "focus"): void;
    gfield(method: "confirm"): JQuery;
    gfield(method: "confirmUserInput"): JQuery;
    gfield(method: "destroy"): JQuery;
    gfield(method: "enable"|"disable"): JQuery;
    gfield(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gfield<TValue=any>(method: "getValue"): TValue;
    gfield<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gfield<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gfield(method: "hasChanged"): boolean;
    gfield(method: "hasValue"): boolean;
    gfield(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gfield(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gfield(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gfield(method: "resetValidations"): JQuery;
    gfield(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gfield(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gfield(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gfield(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gfield<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gfield<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gfield<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gfield(method: "smartNavNext", previous?: boolean): JQuery;
    gfield(method: "validate", groups?: string | string[]): JQuery;
    gfield(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gfield(method: "valueChanged"): any;
    gfield(method: "instance"): any;
    gfield<TValue = any>(method: "toMode", mode?: string, val?: TValue);





    //GField option method handling:
    gfield<T=any>(method: "option"): GFieldOptions<T>;
    gfield<T=any>(method: "option", values: Partial<GFieldOptions<T>>): JQuery;
    gfield<T=any, K extends Extract<keyof GFieldOptions<T>, string> = Extract<keyof GFieldOptions<T>, string>>(method: "option", option: K, value: Required<GFieldOptions<T>>[K]): JQuery;
    gfield<T=any, K extends Extract<keyof GFieldOptions<T>, string> = Extract<keyof GFieldOptions<T>, string>>(method: "option", option: K): GFieldOptions<T>[K];

    gfield<T=any>(method: "option"): GSelectBoxOptions<T>;
    gfield<T=any>(method: "option", values: Partial<GSelectBoxOptions<T>>): JQuery;
    gfield<T=any, K extends Extract<keyof GSelectBoxOptions<T>, string> = Extract<keyof GSelectBoxOptions<T>, string>>(method: "option", option: K, value: Required<GSelectBoxOptions<T>>[K]): JQuery;
    gfield<T=any, K extends Extract<keyof GSelectBoxOptions<T>, string> = Extract<keyof GSelectBoxOptions<T>, string>>(method: "option", option: K): GSelectBoxOptions<T>[K];

    gfield<T=any>(method: "option"): GFormBoxOptions<T>;
    gfield<T=any>(method: "option", values: Partial<GFormBoxOptions<T>>): JQuery;
    gfield<T=any, K extends Extract<keyof GFormBoxOptions<T>, string> = Extract<keyof GFormBoxOptions<T>, string>>(method: "option", option: K, value: Required<GFormBoxOptions<T>>[K]): JQuery;
    gfield<T=any, K extends Extract<keyof GFormBoxOptions<T>, string> = Extract<keyof GFormBoxOptions<T>, string>>(method: "option", option: K): GFormBoxOptions<T>[K];

    gfield<T=any>(method: "option"): GFormattedBoxOptions<T>;
    gfield<T=any>(method: "option", values: Partial<GFormattedBoxOptions<T>>): JQuery;
    gfield<T=any, K extends Extract<keyof GFormattedBoxOptions<T>, string> = Extract<keyof GFormattedBoxOptions<T>, string>>(method: "option", option: K, value: Required<GFormattedBoxOptions<T>>[K]): JQuery;
    gfield<T=any, K extends Extract<keyof GFormattedBoxOptions<T>, string> = Extract<keyof GFormattedBoxOptions<T>, string>>(method: "option", option: K): GFormattedBoxOptions<T>[K];

    gfield(method: "option"): GStringBoxOptions;
    gfield(method: "option", values: Partial<GStringBoxOptions>): JQuery;
    gfield<K extends Extract<keyof GStringBoxOptions, string>>(method: "option", option: K, value: Required<GStringBoxOptions[K]>): JQuery;
    gfield<K extends Extract<keyof GStringBoxOptions, string>>(method: "option", option: K): GStringBoxOptions[K];

    gfield<T=any>(method: "option"): GRadioOptions<T>;
    gfield<T=any>(method: "option", values: Partial<GRadioOptions<T>>): JQuery;
    gfield<T=any, K extends Extract<keyof GRadioOptions<T>, string> = Extract<keyof GRadioOptions<T>, string>>(method: "option", option: K, value: Required<GRadioOptions<T>>[K]): JQuery;
    gfield<T=any, K extends Extract<keyof GRadioOptions<T>, string> = Extract<keyof GRadioOptions<T>, string>>(method: "option", option: K): GRadioOptions<T>[K];

    gfield(method: "option"): GCheckOptions;
    gfield(method: "option", values: Partial<GCheckOptions>): JQuery;
    gfield<K extends Extract<keyof GCheckOptions, string>>(method: "option", option: K, value: Required<GCheckOptions[K]>): JQuery;
    gfield<K extends Extract<keyof GCheckOptions, string>>(method: "option", option: K): GCheckOptions[K];

    gfield(method: "option"): GDateBoxOptions;
    gfield(method: "option", values: Partial<GDateBoxOptions>): JQuery;
    gfield<K extends Extract<keyof GDateBoxOptions, string>>(method: "option", option: K, value: Required<GDateBoxOptions[K]>): JQuery;
    gfield<K extends Extract<keyof GDateBoxOptions, string>>(method: "option", option: K): GDateBoxOptions[K];

    gfield(method: "option"): GNumberBoxOptions;
    gfield(method: "option", values: Partial<GNumberBoxOptions>): JQuery;
    gfield<K extends Extract<keyof GNumberBoxOptions, string>>(method: "option", option: K, value: Required<GNumberBoxOptions[K]>): JQuery;
    gfield<K extends Extract<keyof GNumberBoxOptions, string>>(method: "option", option: K): GNumberBoxOptions[K];

    gfield(method: "option"): GIntervalBoxOptions;
    gfield(method: "option", values: Partial<GIntervalBoxOptions>): JQuery;
    gfield<K extends Extract<keyof GIntervalBoxOptions, string>>(method: "option", option: K, value: Required<GIntervalBoxOptions[K]>): JQuery;
    gfield<K extends Extract<keyof GIntervalBoxOptions, string>>(method: "option", option: K): GIntervalBoxOptions[K];







    //GDUMMYFIELD
    gdummyfield<T = any>(options: GDummyFieldOptions<T>, ...extendedOptions: GDummyFieldOptions<T>[]): JQuery;
    gdummyfield(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gdummyfield(method: "focus"): void;
    gdummyfield(method: "confirm"): JQuery;
    gdummyfield(method: "confirmUserInput"): JQuery;
    gdummyfield(method: "destroy"): JQuery;
    gdummyfield(method: "enable"|"disable"): JQuery;
    gdummyfield(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gdummyfield<TValue=any>(method: "getValue"): TValue;
    gdummyfield<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gdummyfield<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gdummyfield(method: "hasChanged"): boolean;
    gdummyfield(method: "hasValue"): boolean;
    gdummyfield(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gdummyfield(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gdummyfield(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gdummyfield(method: "resetValidations"): JQuery;
    gdummyfield(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gdummyfield(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gdummyfield(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gdummyfield(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gdummyfield<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gdummyfield<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gdummyfield<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gdummyfield(method: "smartNavNext", previous?: boolean): JQuery;
    gdummyfield(method: "validate", groups?: string | string[]): JQuery;
    gdummyfield(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gdummyfield(method: "valueChanged"): any;
    gdummyfield(method: "instance"): any;
    gdummyfield<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gdummyfield<T=any>(method: "option"): GFieldOptions<T>;
    gdummyfield<T=any>(method: "option", values: Partial<GFieldOptions<T>>): JQuery;
    gdummyfield<T=any, K extends Extract<keyof GFieldOptions<T>, string> = Extract<keyof GFieldOptions<T>, string>>(method: "option", option: K, value: Required<GFieldOptions<T>>[K]): JQuery;
    gdummyfield<T=any, K extends Extract<keyof GFieldOptions<T>, string> = Extract<keyof GFieldOptions<T>, string>>(method: "option", option: K): GFieldOptions<T>[K];

    //gdummyfield(method: "option", option: string): any;
    //gdummyfield(method: "option", option: string, value: any): JQuery;



    //GSTATICFIELD
    gstaticfield<T = any>(options: GStaticFieldOptions<T>, ...extendedOptions: GStaticFieldOptions<T>[]): JQuery;
    gstaticfield(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gstaticfield(method: "focus"): void;
    gstaticfield(method: "confirm"): JQuery;
    gstaticfield(method: "confirmUserInput"): JQuery;
    gstaticfield(method: "destroy"): JQuery;
    gstaticfield(method: "enable"|"disable"): JQuery;
    gstaticfield(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gstaticfield<TValue=any>(method: "getValue"): TValue;
    gstaticfield<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gstaticfield<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gstaticfield(method: "hasChanged"): boolean;
    gstaticfield(method: "hasValue"): boolean;
    gstaticfield(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gstaticfield(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gstaticfield(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gstaticfield(method: "resetValidations"): JQuery;
    gstaticfield(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gstaticfield(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gstaticfield(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gstaticfield(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gstaticfield<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gstaticfield<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gstaticfield<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gstaticfield(method: "smartNavNext", previous?: boolean): JQuery;
    gstaticfield(method: "validate", groups?: string | string[]): JQuery;
    gstaticfield(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gstaticfield(method: "valueChanged"): any;
    gstaticfield(method: "instance"): any;
    gstaticfield<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gstaticfield<T=any>(method: "option"): GFieldOptions<T>;
    gstaticfield<T=any>(method: "option", values: Partial<GFieldOptions<T>>): JQuery;
    gstaticfield<T=any, K extends Extract<keyof GFieldOptions<T>, string> = Extract<keyof GFieldOptions<T>, string>>(method: "option", option: K, value: Required<GFieldOptions<T>>[K]): JQuery;
    gstaticfield<T=any, K extends Extract<keyof GFieldOptions<T>, string> = Extract<keyof GFieldOptions<T>, string>>(method: "option", option: K): GFieldOptions<T>[K];

    //gstaticfield(method: "option", option: string): any;
    //gstaticfield(method: "option", option: string, value: any): JQuery;


    //GAUTOCOMPLETE
    gautocomplete<T = any>(options?: GAutoCompleteOptions<T>);
    gautocomplete<T = any>(method: "setData", data: T[]): JQuery;
    gautocomplete(method: "applyFilter", filter: string): JQuery;
    gautocomplete(method: "clearView"): JQuery;
    gautocomplete(method: "open"|"close"): JQuery;



    gautocomplete<T=any>(method: "option"): GAutoCompleteOptions<T>;
    gautocomplete<T=any>(method: "option", values: Partial<GAutoCompleteOptions<T>>): JQuery;
    gautocomplete<T=any, K extends Extract<keyof GAutoCompleteOptions<T>, string> = Extract<keyof GAutoCompleteOptions<T>, string>>(method: "option", option: K, value: Required<GAutoCompleteOptions<T>>[K]): JQuery;
    gautocomplete<T=any, K extends Extract<keyof GAutoCompleteOptions<T>, string> = Extract<keyof GAutoCompleteOptions<T>, string>>(method: "option", option: K): GAutoCompleteOptions<T>[K];

    //gautocomplete(method: "option", option: string): any;
    //gautocomplete(method: "option", option: string, value: any): JQuery;




    //GCHECK
    gcheck(options: GCheckOptions, ...extendedOptions: GCheckOptions[]): JQuery;
    gcheck(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gcheck(method: "focus"): void;
    gcheck(method: "confirm"): JQuery;
    gcheck(method: "confirmUserInput"): JQuery;
    gcheck(method: "destroy"): JQuery;
    gcheck(method: "enable"|"disable"): JQuery;
    gcheck(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gcheck<TValue=any>(method: "getValue"): TValue;
    gcheck<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gcheck<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gcheck(method: "hasChanged"): boolean;
    gcheck(method: "hasValue"): boolean;
    gcheck(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gcheck(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gcheck(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gcheck(method: "resetValidations"): JQuery;
    gcheck(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gcheck(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gcheck(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gcheck(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gcheck<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gcheck<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gcheck<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gcheck(method: "smartNavNext", previous?: boolean): JQuery;
    gcheck(method: "validate", groups?: string | string[]): JQuery;
    gcheck(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gcheck(method: "valueChanged"): any;
    gcheck(method: "instance"): any;
    gcheck<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gcheck(method: "option"): GCheckOptions;
    gcheck(method: "option", values: Partial<GCheckOptions>): JQuery;
    gcheck<K extends Extract<keyof GCheckOptions, string>>(method: "option", option: K, value: Required<GCheckOptions[K]>): JQuery;
    gcheck<K extends Extract<keyof GCheckOptions, string>>(method: "option", option: K): GCheckOptions[K];



    //GRADIO
    gradio<T = any>(options: GRadioOptions<T>, ...extendedOptions: GRadioOptions<T>[]): JQuery;
    gradio<T=any>(method: "addRadio", specs: IRadio<T>): JQuery;
    /** Vraci radio-item */
    gradio(method: "getRadio", id: string): JQuery;
    gradio(method: "enableRadio", id: string, enabled: boolean): JQuery;
    gradio(method: "disableRadio", id: string): JQuery;

    gradio(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gradio(method: "focus"): void;
    gradio(method: "confirm"): JQuery;
    gradio(method: "confirmUserInput"): JQuery;
    gradio(method: "destroy"): JQuery;
    gradio(method: "enable"|"disable"): JQuery;
    gradio(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gradio<TValue=any>(method: "getValue"): TValue;
    gradio<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gradio<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gradio(method: "hasChanged"): boolean;
    gradio(method: "hasValue"): boolean;
    gradio(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gradio(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gradio(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gradio(method: "resetValidations"): JQuery;
    gradio(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gradio(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gradio(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gradio(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gradio<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gradio<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gradio<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gradio(method: "smartNavNext", previous?: boolean): JQuery;
    gradio(method: "validate", groups?: string | string[]): JQuery;
    gradio(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gradio(method: "valueChanged"): any;
    gradio(method: "instance"): any;
    gradio<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gradio<T=any>(method: "option"): GRadioOptions<T>;
    gradio<T=any>(method: "option", values: Partial<GRadioOptions<T>>): JQuery;
    gradio<T=any, K extends Extract<keyof GRadioOptions<T>, string> = Extract<keyof GRadioOptions<T>, string>>(method: "option", option: K, value: Required<GRadioOptions<T>>[K]): JQuery;
    gradio<T=any, K extends Extract<keyof GRadioOptions<T>, string> = Extract<keyof GRadioOptions<T>, string>>(method: "option", option: K): GRadioOptions<T>[K];

    //gradio(method: "option", option: string): any;
    //gradio(method: "option", option: string, value: any): JQuery;




    //GCONTROLBOX



    //GSTRINGBOX
    gstringbox(options: GStringBoxOptions, ...extendedOptions: GStringBoxOptions[]): JQuery;
    gstringbox(method: "autoSize"): JQuery;


    gstringbox(method: "addState", params: MenuParams): JQuery;
    gstringbox(method: "addButton", params: MenuParams): JQuery;
    gstringbox(method: "getState", id: string): JQuery;
    gstringbox(method: "getButton", id: string): JQuery;
    gstringbox(method: "setFactor", factor: any, flags?: { triggerChange?: boolean }): JQuery;
    gstringbox(method: "flag", flag: null | GFieldFlagOptions | keyof Gordic.Prefabs.Field.Flags): JQuery;
    gstringbox(method: "tag", tag: null | string | GFieldTagOptions): JQuery;

    gstringbox(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gstringbox(method: "focus"): void;
    gstringbox(method: "confirm"): JQuery;
    gstringbox(method: "confirmUserInput"): JQuery;
    gstringbox(method: "destroy"): JQuery;
    gstringbox(method: "enable"|"disable"): JQuery;
    gstringbox(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gstringbox<TValue=any>(method: "getValue"): TValue;
    gstringbox<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gstringbox<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gstringbox(method: "hasChanged"): boolean;
    gstringbox(method: "hasValue"): boolean;
    gstringbox(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gstringbox(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gstringbox(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gstringbox(method: "resetValidations"): JQuery;
    gstringbox(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gstringbox(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gstringbox(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gstringbox(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gstringbox<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gstringbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gstringbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gstringbox(method: "smartNavNext", previous?: boolean): JQuery;
    gstringbox(method: "validate", groups?: string | string[]): JQuery;
    gstringbox(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gstringbox(method: "valueChanged"): any;
    gstringbox(method: "instance"): any;
    gstringbox<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gstringbox(method: "option"): GStringBoxOptions;
    gstringbox(method: "option", values: Partial<GStringBoxOptions>): JQuery;
    gstringbox<K extends Extract<keyof GStringBoxOptions, string>>(method: "option", option: K, value: Required<GStringBoxOptions[K]>): JQuery;
    gstringbox<K extends Extract<keyof GStringBoxOptions, string>>(method: "option", option: K): GStringBoxOptions[K];




    //GFORMATTEDBOX
    gformattedbox<T = any>(options: GFormattedBoxOptions<T>, ...extendedOptions: GFormattedBoxOptions<T>[]): JQuery;
    gformattedbox(method: "parseValue", value: any): any
    gformattedbox(method: "formatValue", value: any, editMode?: boolean): string
    gformattedbox(method: "refreshValue"): any

    gformattedbox(method: "addState", params: MenuParams): JQuery;
    gformattedbox(method: "addButton", params: MenuParams): JQuery;
    gformattedbox(method: "getState", id: string): JQuery;
    gformattedbox(method: "getButton", id: string): JQuery;
    gformattedbox(method: "setFactor", factor: any, flags?: { triggerChange?: boolean }): JQuery;
    gformattedbox(method: "flag", flag: null | GFieldFlagOptions | keyof Gordic.Prefabs.Field.Flags): JQuery;
    gformattedbox(method: "tag", tag: null | string | GFieldTagOptions): JQuery;

    gformattedbox(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gformattedbox(method: "focus"): void;
    gformattedbox(method: "confirm"): JQuery;
    gformattedbox(method: "confirmUserInput"): JQuery;
    gformattedbox(method: "destroy"): JQuery;
    gformattedbox(method: "enable"|"disable"): JQuery;
    gformattedbox(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gformattedbox<TValue=any>(method: "getValue"): TValue;
    gformattedbox<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gformattedbox<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gformattedbox(method: "hasChanged"): boolean;
    gformattedbox(method: "hasValue"): boolean;
    gformattedbox(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gformattedbox(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gformattedbox(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gformattedbox(method: "resetValidations"): JQuery;
    gformattedbox(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gformattedbox(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gformattedbox(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gformattedbox(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gformattedbox<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gformattedbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gformattedbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gformattedbox(method: "smartNavNext", previous?: boolean): JQuery;
    gformattedbox(method: "validate", groups?: string | string[]): JQuery;
    gformattedbox(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gformattedbox(method: "valueChanged"): any;
    gformattedbox(method: "instance"): any;
    gformattedbox<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gformattedbox<T=any>(method: "option"): GFormattedBoxOptions<T>;
    gformattedbox<T=any>(method: "option", values: Partial<GFormattedBoxOptions<T>>): JQuery;
    gformattedbox<T=any, K extends Extract<keyof GFormattedBoxOptions<T>, string> = Extract<keyof GFormattedBoxOptions<T>, string>>(method: "option", option: K, value: Required<GFormattedBoxOptions<T>>[K]): JQuery;
    gformattedbox<T=any, K extends Extract<keyof GFormattedBoxOptions<T>, string> = Extract<keyof GFormattedBoxOptions<T>, string>>(method: "option", option: K): GFormattedBoxOptions<T>[K];

    //gformattedbox(method: "option", option: string): any;
    //gformattedbox(method: "option", option: string, value: any): JQuery;


    //GNUMBERBOX
    gnumberbox<T = number | Decimal>(options: GNumberBoxOptions<T>): JQuery;
    gnumberbox(method: "addState", params: MenuParams): JQuery;
    gnumberbox(method: "addButton", params: MenuParams): JQuery;
    gnumberbox(method: "getState", id: string): JQuery;
    gnumberbox(method: "getButton", id: string): JQuery;
    gnumberbox(method: "setFactor", factor: any, flags?: { triggerChange?: boolean }): JQuery;
    gnumberbox(method: "flag", flag: null | GFieldFlagOptions | keyof Gordic.Prefabs.Field.Flags): JQuery;
    gnumberbox(method: "tag", tag: null | string | GFieldTagOptions): JQuery;

    gnumberbox(method: "parseValue", value: any): any
    gnumberbox(method: "formatValue", value: any, editMode?: boolean): string
    gnumberbox(method: "refreshValue"): any

    gnumberbox(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gnumberbox(method: "focus"): void;
    gnumberbox(method: "confirm"): JQuery;
    gnumberbox(method: "confirmUserInput"): JQuery;
    gnumberbox(method: "destroy"): JQuery;
    gnumberbox(method: "enable"|"disable"): JQuery;
    gnumberbox(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gnumberbox<TValue=any>(method: "getValue"): TValue;
    gnumberbox<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gnumberbox<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gnumberbox(method: "hasChanged"): boolean;
    gnumberbox(method: "hasValue"): boolean;
    gnumberbox(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gnumberbox(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gnumberbox(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gnumberbox(method: "resetValidations"): JQuery;
    gnumberbox(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gnumberbox(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gnumberbox(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gnumberbox(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gnumberbox<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gnumberbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gnumberbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gnumberbox(method: "smartNavNext", previous?: boolean): JQuery;
    gnumberbox(method: "validate", groups?: string | string[]): JQuery;
    gnumberbox(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gnumberbox(method: "valueChanged"): any;
    gnumberbox(method: "instance"): any;
    gnumberbox<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gnumberbox(method: "option"): GNumberBoxOptions;
    gnumberbox(method: "option", values: Partial<GNumberBoxOptions>): JQuery;
    gnumberbox<K extends Extract<keyof GNumberBoxOptions, string>>(method: "option", option: K, value: Required<GNumberBoxOptions[K]>): JQuery;
    gnumberbox<K extends Extract<keyof GNumberBoxOptions, string>>(method: "option", option: K): GNumberBoxOptions[K];


    //GDATEBOX
    gdatebox(options: GDateBoxOptions): JQuery;
    gdatebox(method: "addState", params: MenuParams): JQuery;
    gdatebox(method: "addButton", params: MenuParams): JQuery;
    gdatebox(method: "getState", id: string): JQuery;
    gdatebox(method: "getButton", id: string): JQuery;
    gdatebox(method: "setFactor", factor: any, flags?: { triggerChange?: boolean }): JQuery;
    gdatebox(method: "flag", flag: null | GFieldFlagOptions | keyof Gordic.Prefabs.Field.Flags): JQuery;
    gdatebox(method: "tag", tag: null | string | GFieldTagOptions): JQuery;

    gdatebox(method: "parseValue", value: any): any
    gdatebox(method: "formatValue", value: any, editMode?: boolean): string
    gdatebox(method: "refreshValue"): any

    gdatebox(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gdatebox(method: "focus"): void;
    gdatebox(method: "confirm"): JQuery;
    gdatebox(method: "confirmUserInput"): JQuery;
    gdatebox(method: "destroy"): JQuery;
    gdatebox(method: "enable"|"disable"): JQuery;
    gdatebox(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gdatebox<TValue=any>(method: "getValue"): TValue;
    gdatebox<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gdatebox<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gdatebox(method: "hasChanged"): boolean;
    gdatebox(method: "hasValue"): boolean;
    gdatebox(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gdatebox(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gdatebox(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gdatebox(method: "resetValidations"): JQuery;
    gdatebox(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gdatebox(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gdatebox(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gdatebox(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gdatebox<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gdatebox<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gdatebox<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gdatebox(method: "smartNavNext", previous?: boolean): JQuery;
    gdatebox(method: "validate", groups?: string | string[]): JQuery;
    gdatebox(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gdatebox(method: "valueChanged"): any;
    gdatebox(method: "instance"): any;
    gdatebox<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gdatebox(method: "option"): GDateBoxOptions;
    gdatebox(method: "option", values: Partial<GDateBoxOptions>): JQuery;
    gdatebox<K extends Extract<keyof GDateBoxOptions, string>>(method: "option", option: K, value: Required<GDateBoxOptions[K]>): JQuery;
    gdatebox<K extends Extract<keyof GDateBoxOptions, string>>(method: "option", option: K): GDateBoxOptions[K];



    //GINTERVALBOX
    gintervalbox(options: GIntervalBoxOptions): JQuery;
    gintervalbox(method: "parseValue", value: any): any
    gintervalbox(method: "formatValue", value: any, editMode?: boolean): string
    gintervalbox(method: "refreshValue"): any

    gintervalbox(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gintervalbox(method: "focus"): void;
    gintervalbox(method: "confirm"): JQuery;
    gintervalbox(method: "confirmUserInput"): JQuery;
    gintervalbox(method: "destroy"): JQuery;
    gintervalbox(method: "enable"|"disable"): JQuery;
    gintervalbox(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gintervalbox<TValue=any>(method: "getValue"): TValue;
    gintervalbox<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gintervalbox<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gintervalbox(method: "hasChanged"): boolean;
    gintervalbox(method: "hasValue"): boolean;
    gintervalbox(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gintervalbox(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gintervalbox(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gintervalbox(method: "resetValidations"): JQuery;
    gintervalbox(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gintervalbox(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gintervalbox(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gintervalbox(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gintervalbox<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gintervalbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gintervalbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gintervalbox(method: "smartNavNext", previous?: boolean): JQuery;
    gintervalbox(method: "validate", groups?: string | string[]): JQuery;
    gintervalbox(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gintervalbox(method: "valueChanged"): any;
    gintervalbox(method: "instance"): any;
    gintervalbox<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gintervalbox(method: "option"): GIntervalBoxOptions;
    gintervalbox(method: "option", values: Partial<GIntervalBoxOptions>): JQuery;
    gintervalbox<K extends Extract<keyof GIntervalBoxOptions, string>>(method: "option", option: K, value: Required<GIntervalBoxOptions[K]>): JQuery;
    gintervalbox<K extends Extract<keyof GIntervalBoxOptions, string>>(method: "option", option: K): GIntervalBoxOptions[K];




    //GSELECTBOX
    gselectbox<T=any>(...options: GSelectBoxOptionsMulti<T>[]): JQuery;
    gselectbox<T=any>(options: GSelectBoxOptionsMulti<T>, ...extendedOptions: GSelectBoxOptionsSingle<T>[]): JQuery;
    gselectbox<T=any>(options: GSelectBoxOptionsMulti<T>, ...extendedOptions: GSelectBoxOptions<T, T | T[]>[]): JQuery;
    gselectbox<T=any>(options: GSelectBoxOptionsMulti<T>, ...extendedOptions: GSelectBoxOptions<T>[]): JQuery;

    gselectbox<T=any>(...options: GSelectBoxOptionsSingle<T>[]): JQuery;
    gselectbox<T=any>(options: GSelectBoxOptionsSingle<T>, ...extendedOptions: GSelectBoxOptionsMulti<T>[]): JQuery;
    gselectbox<T=any>(options: GSelectBoxOptionsSingle<T>, ...extendedOptions: GSelectBoxOptions<T, T | T[]>[]): JQuery;
    gselectbox<T=any>(options: GSelectBoxOptionsSingle<T>, ...extendedOptions: GSelectBoxOptions<T>[]): JQuery;

    gselectbox<T=any>(options: GSelectBoxOptions<T>, ...extendedOptions: GSelectBoxOptionsMulti<T>[]): JQuery;
    gselectbox<T=any>(options: GSelectBoxOptions<T>, ...extendedOptions: GSelectBoxOptionsSingle<T>[]): JQuery;
    gselectbox<T=any>(options: GSelectBoxOptions<T>, ...extendedOptions: GSelectBoxOptions<T, T | T[]>[]): JQuery;

    gselectbox<T=any>(...options: GSelectBoxOptions<T>[]): JQuery;
    gselectbox<T=any>(...options: GSelectBoxOptions<T, T | T[]>[]): JQuery;


    gselectbox(method: "clearClientCache"): JQuery;
    gselectbox(method: "refresh"): JQuery;
    gselectbox(method: "getServerFilters"): JQueryPromise<object>;
    gselectbox(method: "getServerFilters"): JQueryPromise<ObjectLiteral<any>>;

    gselectbox(method: "addState", params: MenuParams): JQuery;
    gselectbox(method: "addButton", params: MenuParams): JQuery;
    gselectbox(method: "getState", id: string): JQuery;
    gselectbox(method: "getButton", id: string): JQuery;
    gselectbox(method: "setFactor", factor: any, flags?: { triggerChange?: boolean }): JQuery;
    gselectbox(method: "flag", flag: null | GFieldFlagOptions | keyof Gordic.Prefabs.Field.Flags): JQuery;
    gselectbox(method: "tag", tag: null | string | GFieldTagOptions): JQuery;

    gselectbox(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gselectbox(method: "focus"): void;
    gselectbox(method: "confirm"): JQuery;
    gselectbox(method: "confirmUserInput"): JQuery;
    gselectbox(method: "destroy"): JQuery;
    gselectbox(method: "enable"|"disable"): JQuery;
    gselectbox(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gselectbox<TValue=any>(method: "getValue"): TValue;
    gselectbox<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gselectbox<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gselectbox(method: "hasChanged"): boolean;
    gselectbox(method: "hasValue"): boolean;
    gselectbox(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gselectbox(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gselectbox(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gselectbox(method: "resetValidations"): JQuery;
    gselectbox(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gselectbox(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gselectbox(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gselectbox(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gselectbox<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gselectbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gselectbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gselectbox(method: "smartNavNext", previous?: boolean): JQuery;
    gselectbox(method: "validate", groups?: string | string[]): JQuery;
    gselectbox(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gselectbox(method: "valueChanged"): any;
    gselectbox(method: "instance"): any;
    gselectbox<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gselectbox<T=any>(method: "option"): GSelectBoxOptions<T>;
    gselectbox<T=any>(method: "option", values: Partial<GSelectBoxOptions<T>>): JQuery;
    gselectbox<T=any, K extends Extract<keyof GSelectBoxOptions<T>, string> = Extract<keyof GSelectBoxOptions<T>, string>>(method: "option", option: K, value: Required<GSelectBoxOptions<T>>[K]): JQuery;
    gselectbox<T=any, K extends Extract<keyof GSelectBoxOptions<T>, string> = Extract<keyof GSelectBoxOptions<T>, string>>(method: "option", option: K): GSelectBoxOptions<T>[K];

    //gselectbox(method: "option", option: string): any;
    //gselectbox(method: "option", option: string, value: any): JQuery;




    //GFORMBOX
    gformbox<T=any>(...options: GFormBoxOptionsMulti<T>[]): JQuery;
    gformbox<T=any>(options: GFormBoxOptionsMulti<T>, ...extendedOptions: GFormBoxOptionsSingle<T>[]): JQuery;
    gformbox<T=any>(options: GFormBoxOptionsMulti<T>, ...extendedOptions: GFormBoxOptions<T, T | T[]>[]): JQuery;
    gformbox<T=any>(options: GFormBoxOptionsMulti<T>, ...extendedOptions: GFormBoxOptions<T>[]): JQuery;

    gformbox<T=any>(...options: GFormBoxOptionsSingle<T>[]): JQuery;
    gformbox<T=any>(options: GFormBoxOptionsSingle<T>, ...extendedOptions: GFormBoxOptionsMulti<T>[]): JQuery;
    gformbox<T=any>(options: GFormBoxOptionsSingle<T>, ...extendedOptions: GFormBoxOptions<T, T | T[]>[]): JQuery;
    gformbox<T=any>(options: GFormBoxOptionsSingle<T>, ...extendedOptions: GFormBoxOptions<T>[]): JQuery;

    gformbox<T=any>(options: GFormBoxOptions<T>, ...extendedOptions: GFormBoxOptionsMulti<T>[]): JQuery;
    gformbox<T=any>(options: GFormBoxOptions<T>, ...extendedOptions: GFormBoxOptionsSingle<T>[]): JQuery;
    gformbox<T=any>(options: GFormBoxOptions<T>, ...extendedOptions: GFormBoxOptions<T, T | T[]>[]): JQuery;

    gformbox<T=any>(...options: GFormBoxOptions<T>[]): JQuery;
    gformbox<T=any>(...options: GFormBoxOptions<T, T | T[]>[]): JQuery;


    /**
     * Zavre formular
     *
     * @param {"close"} method
     * @param {boolean} [doCollect] Je-li true, provede collect formulare, default = false.
     * @returns {JQuery}
     */
    gformbox(method: "close", doCollect?: boolean): JQuery;


    gformbox(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gformbox(method: "focus"): void;
    gformbox(method: "confirm"): JQuery;
    gformbox(method: "confirmUserInput"): JQuery;
    gformbox(method: "destroy"): JQuery;
    gformbox(method: "enable"|"disable"): JQuery;
    gformbox(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gformbox<TValue=any>(method: "getValue"): TValue;
    gformbox<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gformbox<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gformbox(method: "hasChanged"): boolean;
    gformbox(method: "hasValue"): boolean;
    gformbox(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gformbox(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gformbox(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gformbox(method: "resetValidations"): JQuery;
    gformbox(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gformbox(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gformbox(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gformbox(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gformbox<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gformbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gformbox<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gformbox(method: "smartNavNext", previous?: boolean): JQuery;
    gformbox(method: "validate", groups?: string | string[]): JQuery;
    gformbox(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gformbox(method: "valueChanged"): any;
    gformbox(method: "instance"): any;
    gformbox<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gformbox<T=any>(method: "option"): GFormBoxOptions<T>;
    gformbox<T=any>(method: "option", values: Partial<GFormBoxOptions<T>>): JQuery;
    gformbox<T=any, K extends Extract<keyof GFormBoxOptions<T>, string> = Extract<keyof GFormBoxOptions<T>, string>>(method: "option", option: K, value: Required<GFormBoxOptions<T>>[K]): JQuery;
    gformbox<T=any, K extends Extract<keyof GFormBoxOptions<T>, string> = Extract<keyof GFormBoxOptions<T>, string>>(method: "option", option: K): GFormBoxOptions<T>[K];

    //gformbox(method: "option", option: string): any;
    //gformbox(method: "option", option: string, value: any): JQuery;





    //GFILEFIELD
    gfilefield(options?: GFilefieldOptions): JQuery;
    gfilefield(method: "instance"): GFileField;
    gfilefield(method: "addDropzone", elements?: JQuery): JQuery;
    gfilefield(method: "removeDropzone", elements?: JQuery): JQuery;
    gfilefield(method: "getValue"): Gordic.General.ApplicationInterface.GFileInfoDto[];
    gfilefield(method: "getValueAsync"): JQueryPromise<Gordic.General.ApplicationInterface.GFileInfoDto[]>;
    gfilefield(method: "setValue", value: any): JQueryPromise<Gordic.General.ApplicationInterface.GFileInfoDto[]>;
    gfilefield(method: "downloadFile", value: Gordic.General.ApplicationInterface.GFileInfoDto): JQuery;
    gfilefield(method: "removeFile", value: Gordic.General.ApplicationInterface.GFileInfoDto): JQueryPromise<any>;
    gfilefield(method: "refresh", value?:string | string[] | null): void;
    gfilefield(method: "clear", flags?: FieldSetValueFlags): JQuery;
    gfilefield(method: "focus"): void;
    gfilefield(method: "confirm"): JQuery;
    gfilefield(method: "confirmUserInput"): JQuery;
    gfilefield(method: "destroy"): JQuery;
    gfilefield(method: "enable"|"disable"): JQuery;
    gfilefield(method: "getErrors", groups?: string | string[]): Gordic.Validators.Error[];
    gfilefield<TValue=any>(method: "getValue"): TValue;
    gfilefield<TValue=any>(method: "getValueAsync"): JQueryPromise<TValue>;
    gfilefield<TValue=any>(method: "waitingForValue"): JQueryPromise<TValue> | null;
    gfilefield(method: "hasChanged"): boolean;
    gfilefield(method: "hasValue"): boolean;
    gfilefield(method: "refreshErrors", forceRefresh?: boolean): JQuery;
    gfilefield(method: "reset", flags?: FieldSetValueFlags): JQuery;
    gfilefield(method: "resetErrors", groups?: string | string[] | Gordic.Validators.Error): JQuery;
    gfilefield(method: "resetValidations"): JQuery;
    gfilefield(method: "setError", message: string, errorType: string, group: string, showOnDisabled: boolean, position: number, stopping: boolean): JQuery;
    gfilefield(method: "setError", errorObj: Partial<Gordic.Validators.Error>): JQuery;
    gfilefield(method: "setErrors", errorArr: Partial<Gordic.Validators.Error>[]): JQuery;
    gfilefield(method: "setValidators", validators: Gordic.Validators.ValidatorOptions | Gordic.Validators.ValidatorOptions[], group?: string): JQuery;
    gfilefield<TValue = any>(method: "model", operation: "apply" | "collect" | "validators" | "validations", dto: TValue, modelOptions?: ModelOptions): JQuery;
    gfilefield<TValue = any>(method: "setValue" | "setInitial", value: TValue, valid?: boolean): JQuery;
    gfilefield<TValue = any>(method: "setValue" | "setInitial", value: TValue, flags?: FieldSetValueFlags): JQuery;

    gfilefield(method: "smartNavNext", previous?: boolean): JQuery;
    gfilefield(method: "validate", groups?: string | string[]): JQuery;
    gfilefield(method: "validate", activateAutoValidation?: boolean, groups?: string | string[]): JQuery;
    gfilefield(method: "valueChanged"): any;
    gfilefield(method: "instance"): any;
    gfilefield<TValue = any>(method: "toMode", mode?: string, val?: TValue);

    gfilefield(method: "option"): GFilefieldOptions;
    gfilefield(method: "option", values: Partial<GFilefieldOptions>): JQuery;
    gfilefield<K extends Extract<keyof GFilefieldOptions, string>>(method: "option", option: K, value: Required<GFilefieldOptions[K]>): JQuery;
    gfilefield<K extends Extract<keyof GFilefieldOptions, string>>(method: "option", option: K): GFilefieldOptions[K];


    //GFIELD
    gfield(method: "addState", params: MenuParams): JQuery;
    gfield(method: "addButton", params: MenuParams): JQuery;
    gfield(method: "getState", id: string): JQuery;
    gfield(method: "getButton", id: string): JQuery;
    gfield(method: "setFactor", factor: any, flags?: { triggerChange?: boolean }): JQuery;
    gfield(method: "flag", flag: null | GFieldFlagOptions | keyof Gordic.Prefabs.Field.Flags): JQuery;
    gfield(method: "tag", tag: null | string | GFieldTagOptions): JQuery;

    gfield(method: "parseValue", value: any): any
    gfield(method: "formatValue", value: any, editMode?: boolean): string
    gfield(method: "refreshValue"): any

    gfield(method: "clearClientCache"): JQuery;
    gfield(method: "refresh"): JQuery;
    gfield(method: "getServerFilters"): JQueryPromise<object>;
    gfield(method: "getServerFilters"): JQueryPromise<ObjectLiteral<any>>;

    gfield(method: "autoSize"): JQuery;

    gfield<T=any>(method: "addRadio", specs: IRadio<T>): JQuery;
    /** Vraci radio-item */
    gfield(method: "getRadio", id: string): JQuery;
    gfield(method: "enableRadio", id: string, enabled: boolean): JQuery;
    gfield(method: "disableRadio", id: string): JQuery;

    gfield(method: "clearClientCache"): JQuery;
    gfield(method: "refresh"): JQuery;
    gfield(method: "getServerFilters"): JQueryPromise<object>;
    gfield(method: "getServerFilters"): JQueryPromise<ObjectLiteral<any>>;

    /**
     * Zavre formular
     *
     * @param {"close"} method
     * @param {boolean} [doCollect] Je-li true, provede collect formulare, default = false.
     * @returns {JQuery}
     */
    gfield(method: "close", doCollect?: boolean): JQuery;


    //GMDFIELD
    gmdfield(options?: GMdFieldOptions): JQuery;


    /** Vyhleda parenta, na kterem je definovan gform */
    gform(): JQuery;
    gform(method: "complete"): JQuery;
    gform(method: "createFrom", form: Gordic.Forms.Form, createCallback?: Gordic.Forms.FormCreateFromDelegate): JQuery;
    gform(method: "hasChanged", force?: boolean): boolean;
    gform(method: "isValid", force?: boolean): boolean;
    /**
     * Zvaliduje formulář a vrátí výsledek jako boolean.
     * @param groups Seznam validačních skupin, které se mají ověřit. Pokud argument není předán, validují se všechny.
     */
    gform(method: "isValid", groups?: string | string[]): boolean;
    gform(method: "setup", params?: GFormOptions): JQuery;
    gform(method: "getErrors", ...groups: string[]): (Gordic.Validators.Error & { field: JQuery })[];
    gform(method: "waitForValues"): JQueryPromise<any>;

    /**
     * Získá hodnoty prezentační vrstvy {section, row, fieldValue}, pro všechny gfieldy formuláře.
     * @author PDohnal
     * @param {"getViewValues"} method
     */
    gform(method: "getViewValues"): JQueryPromise<FormViewValue[]>;

    /**
     * Prozatím experimentální
     * @author VMaca
     * @param {"viewMode"} method
     * @param {string | null} mode
     */
    gform(method: "viewMode", mode: string | null): void;

    gformrow(): JQuery;
    gformrow(method: "addFieldsRow", label?: string | null, required?: boolean, hint?: string, fields?: string[] | number, customClass?: string): JQuery;
    gformrow(method: "addFieldsRow", label?: string | null, hint?: string, fields?: string[] | number, customClass?: string): JQuery;
    gformrow(method: "addFieldsRow", label?: string | null, fields?: string[] | number, customClass?: string): JQuery;

    gformrow(method: "create", options: GFormRowOptions): JQuery;
    gformrow(method: "createFrom", row: Gordic.Forms.FormRow, createCallback?:Gordic.Forms.FormCreateFromDelegate): JQuery;

    gformrow(method: "createField", customClass?: string): JQuery;
    gformrow(method: "createText", customClass?: string, text?:string): JQuery;

    gformrow(method: "createFields", fields?: string[] | number, customClass?: string): JQuery;
    gformrow(method: "setLabel", label: string, hint?: string): JQuery;
    gformrow(method: "findLabel"): JQuery;

    gformsection(method: "create", label: string): JQuery;
    gformsection(method: "create", options?: GSectionOptions): JQuery;
    gformsection(method: "createFrom", section: Gordic.Forms.FormSection, createCallback?: Gordic.Forms.FormCreateFromDelegate): JQuery;
    gformsection(method: "findLabel"): JQuery;
    gformsection(method: "setLabel", label: string): JQuery;

    gformtext(html: string | JQuery<HTMLElement>, customClass?: string): JQuery;
    //(dto?: any): JQueryPromise<any>;
    //<T>(dto?: T): JQueryPromise<T>;
}

interface JQueryStatic {
    gform(method: "createFrom", section: Gordic.Forms.Form, createCallback?: Gordic.Forms.FormCreateFromDelegate): JQuery;
    gformsection(method: "createFrom", section: Gordic.Forms.FormSection, createCallback?: Gordic.Forms.FormCreateFromDelegate): JQuery;
    gformrow(method: "createFrom", section: Gordic.Forms.FormRow, createCallback?: Gordic.Forms.FormCreateFromDelegate): JQuery;
}

declare namespace Gordic.Forms {
    type PrefabFormDescriptors = FormSection[] | FormRow[] | FormField[] | null;
    interface Form {
        addRow(label?: string, required?: boolean | { name: string }, hint?: string): Form;
        addRow(options: GFormRowOptions): Form;
        addSection(options?: GSectionOptions | string): Form;

        addField(fieldType: "gbutton", fieldOptions?: GButtonOptions, ...extendedOptions: GButtonOptions[]): Form
        addField(fieldType: "gbutton", fieldWidth: string, fieldOptions?: GButtonOptions, ...extendedOptions: GButtonOptions[]): Form
        addField(fieldType: "gbuttonpanel", fieldOptions?: GButtonPanelOptions, ...extendedOptions: GButtonPanelOptions[]): Form
        addField(fieldType: "gbuttonpanel", fieldWidth: string, fieldOptions?: GButtonPanelOptions, ...extendedOptions: GButtonPanelOptions[]): Form
        addField(fieldType: "gdatebox", fieldOptions?: GDateBoxOptions, ...extendedOptions: GDateBoxOptions[]): Form
        addField(fieldType: "gdatebox", fieldWidth: string, fieldOptions?: GDateBoxOptions, ...extendedOptions: GDateBoxOptions[]): Form
        addField(fieldType: "gcheck", fieldOptions?: GCheckOptions, ...extendedOptions: GCheckOptions[]): Form
        addField(fieldType: "gcheck", fieldWidth: string, fieldOptions?: GCheckOptions, ...extendedOptions: GCheckOptions[]): Form
        addField(fieldType: "gintervalbox", fieldOptions?: GIntervalBoxOptions, ...extendedOptions: GIntervalBoxOptions[]): Form
        addField(fieldType: "gintervalbox", fieldWidth: string, fieldOptions?: GIntervalBoxOptions, ...extendedOptions: GIntervalBoxOptions[]): Form
        addField(fieldType: "glink", fieldOptions?: GLinkOptions): Form
        addField(fieldType: "glink", fieldWidth: string, fieldOptions?: GLinkOptions, ...extendedOptions: GLinkOptions[]): Form
        addField<T = number | Decimal>(fieldType: "gnumberbox", fieldOptions?: GNumberBoxOptions<T>, ...extendedOptions: GNumberBoxOptions<T>[]): Form
        addField<T = number | Decimal>(fieldType: "gnumberbox", fieldWidth: string, fieldOptions?: GNumberBoxOptions<T>, ...extendedOptions: GNumberBoxOptions<T>[]): Form
        addField<T=any>(fieldType: "gradio", fieldOptions?: GRadioOptions<T>, ...extendedOptions: Partial<GRadioOptions<T>>[]): Form
        addField<T=any>(fieldType: "gradio", fieldWidth: string, fieldOptions?: GRadioOptions<T>, ...extendedOptions: Partial<GRadioOptions<T>>[]): Form
        addField(fieldType: "gstringbox", fieldOptions?: GStringBoxOptions, ...extendOptions: GStringBoxOptions[]): Form
        addField(fieldType: "gstringbox", fieldWidth: string, fieldOptions?: GStringBoxOptions, ...extendOptions: GStringBoxOptions[]): Form
        addField<T=any>(fieldType: "gstaticfield", fieldOptions?: GStaticFieldOptions<T>, ...extendOptions: GStaticFieldOptions<T>[]): Form
        addField<T=any>(fieldType: "gstaticfield", fieldWidth: string, fieldOptions?: GStaticFieldOptions<T>, ...extendOptions: GStaticFieldOptions<T>[]): Form
        addField<T=any>(fieldType: "gdummyfield", fieldOptions?: GFieldOptions<T>, ...extendOptions: GFieldOptions<T>[]): Form
        addField<T=any>(fieldType: "gdummyfield", fieldWidth: string, fieldOptions?: GFieldOptions<T>, ...extendOptions: GFieldOptions<T>[]): Form



        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptionsMulti<T>, ...extendedOptions: GSelectBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptionsMulti<T>, ...extendedOptions: GSelectBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptionsMulti<T>, ...extendedOptions: GSelectBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptionsMulti<T>, ...extendedOptions: (GSelectBoxOptions<T> | GSelectBoxOptionsMulti<T>)[]): Form

        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptionsSingle<T>, ...extendedOptions: GSelectBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptionsSingle<T>, ...extendedOptions: GSelectBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptionsSingle<T>, ...extendedOptions: GSelectBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptionsSingle<T>, ...extendedOptions: (GSelectBoxOptions<T> | GSelectBoxOptionsMulti<T>)[]): Form

        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptions<T>, ...extendedOptions: GSelectBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptions<T>, ...extendedOptions: GSelectBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptions<T>, ...extendedOptions: GSelectBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldOptions?: GSelectBoxOptions<T>, ...extendedOptions: (GSelectBoxOptions<T> | GSelectBoxOptionsMulti<T>)[]): Form

        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptionsMulti<T>, ...extendedOptions: GSelectBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptionsMulti<T>, ...extendedOptions: GSelectBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptionsMulti<T>, ...extendedOptions: GSelectBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptionsMulti<T>, ...extendedOptions: (GSelectBoxOptions<T> | GSelectBoxOptionsMulti<T>)[]): Form

        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptionsSingle<T>, ...extendedOptions: GSelectBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptionsSingle<T>, ...extendedOptions: GSelectBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptionsSingle<T>, ...extendedOptions: GSelectBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptionsSingle<T>, ...extendedOptions: (GSelectBoxOptions<T> | GSelectBoxOptionsMulti<T>)[]): Form

        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptions<T>, ...extendedOptions: GSelectBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptions<T>, ...extendedOptions: GSelectBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptions<T>, ...extendedOptions: GSelectBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gselectbox", fieldWidth: string, fieldOptions?: GSelectBoxOptions<T>, ...extendedOptions: (GSelectBoxOptions<T> | GSelectBoxOptionsMulti<T>)[]): Form




        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptionsMulti<T>, ...extendedOptions: GFormBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptionsMulti<T>, ...extendedOptions: GFormBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptionsMulti<T>, ...extendedOptions: GFormBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptionsMulti<T>, ...extendedOptions: (GFormBoxOptions<T> | GFormBoxOptionsMulti<T>)[]): Form

        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptionsSingle<T>, ...extendedOptions: GFormBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptionsSingle<T>, ...extendedOptions: GFormBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptionsSingle<T>, ...extendedOptions: GFormBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptionsSingle<T>, ...extendedOptions: (GFormBoxOptions<T> | GFormBoxOptionsMulti<T>)[]): Form

        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptions<T>, ...extendedOptions: GFormBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptions<T>, ...extendedOptions: GFormBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptions<T>, ...extendedOptions: GFormBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldOptions?: GFormBoxOptions<T>, ...extendedOptions: (GFormBoxOptions<T> | GFormBoxOptionsMulti<T>)[]): Form

        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptionsMulti<T>, ...extendedOptions: GFormBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptionsMulti<T>, ...extendedOptions: GFormBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptionsMulti<T>, ...extendedOptions: GFormBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptionsMulti<T>, ...extendedOptions: (GFormBoxOptions<T> | GFormBoxOptionsMulti<T>)[]): Form

        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptionsSingle<T>, ...extendedOptions: GFormBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptionsSingle<T>, ...extendedOptions: GFormBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptionsSingle<T>, ...extendedOptions: GFormBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptionsSingle<T>, ...extendedOptions: (GFormBoxOptions<T> | GFormBoxOptionsMulti<T>)[]): Form

        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptions<T>, ...extendedOptions: GFormBoxOptionsMulti<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptions<T>, ...extendedOptions: GFormBoxOptionsSingle<T>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptions<T>, ...extendedOptions: GFormBoxOptions<T, T | T[]>[]): Form
        addField<T=any>(fieldType: "gformbox", fieldWidth: string, fieldOptions?: GFormBoxOptions<T>, ...extendedOptions: (GFormBoxOptions<T> | GFormBoxOptionsMulti<T>)[]): Form



        addField(fieldType: "gmdfield", fieldOptions?: GStringBoxOptions, ...extendOptions: GStringBoxOptions[]): Form
        addField(fieldType: "gmdfield", fieldWidth: string, fieldOptions?: GStringBoxOptions, ...extendOptions: GStringBoxOptions[]): Form

        addField(fieldType: "gfilefield", fieldOptions: string | GFilefieldOptions, ...extendedOptions: GFilefieldOptions[]): Form
        addField<T = object>(descriptor: { widget: string, layout?: string, options?: T | any[], extensions?: FormWidget[] }, ...options: T[]): Form;
        addField<T = object>(widget: AddFieldRestWidgets, ...options: T[]): Form;
        addField<T = object>(widget: AddFieldRestWidgets, layout: string, ...options: T[]): Form;
        addPrefab(descriptor: PrefabFormDescriptors | Function | null, type?: string): Form;
        addText(html?: string | null | JQuery<HTMLElement>, customClass?: string): Form;

        appendTo(element: JQuery): Form;
        prop(name: string, value: any): Form;
        event<T=object>(eventName: string, delegate: ((this: HTMLElement, options: T) => (T | void))): Form;

        form: FormDefinition
    }

    interface FormDefinition extends GFormOptions { 
        sections?: FormSection[]
    }

    interface FormSection extends GSectionOptions {
        rows?: FormRow[]
    }

    interface FormRow extends GFormRowOptions {
        fields?: FormField[]
    }
    interface FormCreateFromDelegate {
        (objectType: "form" | "section" | "row" | "field", objectDefinition: object): void;
    }

    interface FormField<T = any, K extends Extract<keyof _fieldTypes<T>, string> = Extract<keyof _fieldTypes<T>, string>> {
        widget: K
        options: _fieldTypes<T>[K] | (_fieldTypes<T>[K])[]
        layout?: string
        extensions?: FormWidget[]

        init?: ((this: HTMLElement, o: FormField<T, K>) => void) | ((this: HTMLElement, o: FormField<T, K>) => void)[];
        complete?: ((this: HTMLElement, o: FormField<T, K>) => void) | ((this: HTMLElement, o: FormField<T, K>) => void)[];
        errorRenderer?: ((this: HTMLElement, errors: Gordic.Validators.Error[], position: FormErrorPosition, defaultRenderer: (errors: Gordic.Validators.Error[]) => JQuery<HTMLElement>) => JQuery<HTMLElement>);
    }
    interface FormWidget {
        widget: string
        layout?: string
        options?: any
    }


    interface FormConstructor {
        new(options?: GFormOptions, dialogOptions?: GDlgOptions): Form;
        /**
         * Třída pro snadnější vytváření FormDescriptoru (JSON specifikace formuláře).
         *
         * @param {string} layoutDescriptor Popis layoutu. Napr.: "L1M1S1 L-3-7-2 breaks-500-750" (vice viz dokumentace).
         * @param {GDlgOptions} dialogOptions Parametry pro "widget" dialog (GDlg.showWindow).
         */
        new(layoutDescriptor?: string, dialogOptions?: GDlgOptions): Form;
    }

    const Form: FormConstructor;


    /**
     * Zavislosti na hodnote jineho policka
     */
    class Dependency<T extends object> {
        /**
         * Závislost - serverFilters
         * @param {string} field master policko, na jehoz hodnote zavisime (name, nebo jQuery)
         * @param {string} value cast hodnoty master policka, ktera se pouzije pro ziskani hodnoty filtru (napr.: "ixs_fun")
         *  Lze pouzit custom funkci function(masterValue) => thisValue
         *  Pri nevyplnene hodnote se automaticky zkusi pouzit nazev filtru
         * @param {boolean} required (default=true)
         * Zda je vyzadovana hodnota zadaneho policka (zaroven znamena, ze pokud se master zmeni, zavisle policko se vymaze)
         * @param {(thisValue: T, masterField: JQuery) => T} reverseFill (default=thisValue)
         * Funkce pro plneni prazdneho master policka, pokud nekdo vyplni rovnou zavisle policko
         * @param {JQuery} scope Element, v němž se pokoušíme dohledat políčka podle jména. Vychozi je gform, na kterem toto policko lezi
         * @author TSkala
         * @date 2018-04-09
         */
        constructor(field: string|JQuery, value?: string | ((masterValue:any) => any), required?: boolean, reverseFill?: ((thisValue: T, masterField: JQuery) => T) | boolean, scope?: JQuery);
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gforms.editor.d.ts 

declare namespace Gordic.Forms.WYSIWYG {

    interface IGEditorInputParams extends ObjectLiteral<any> {
        /** Datový getter konfigurujicí property panel a panel menu */
        config?: () => ObjectLiteral<any>;
        /** Deklarativní předpis formuláře (pro gform("createFrom"))  */
        form?: Forms.Form
        /** Formulářová demo data  */
        formData?: ObjectLiteral<any>
        /**
         * Funkce vracející požadovaný HTML prvek
         * @param {Event} ev
         */
        selection?: (ev: Event) => JQuery | HTMLElement
        /** 
         *  Příznak povolení drag & drop
         * @default true 
         */
        dragging?: boolean;

    }
    interface IGEditorContent extends GContent, IGClientContent {
        form?: Forms.FormDefinition,
        reloadForm(selectedObject?:any, divPartReload?:JQuery, partType?:string)
        prepareContent(inputParams?: IGEditorInputParams): void;
    }

    const EditorContent: IGEditorContent;

}

declare namespace Gordic.Forms.WYSIWYG.Configurations {

    function defaultConfig(type, formObj, element): ObjectLiteral<any>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gisl.d.ts 

declare namespace Gordic.Isl {
    interface IGAppLogicDataRequest {
    }
    interface IGAppLogicDataResponse {
    }
    interface GServiceReadRequest<TData> extends IGAppLogicDataRequest, Gordic.Data.ObjectData<TData> {
        fragments?: string[];
    }
    interface GServiceReadResponse<TData> extends IGAppLogicDataResponse, Gordic.Data.ObjectData<TData> {
    }

    interface GServiceListRequest extends IGAppLogicDataRequest {
        filters?: object;
        rowStart?: number;
        rowLimit?: number;
        fragments?: string[];
        fastFilter?: GFastFilterDto;
    }
    interface GServiceListRequestWithData<TData> extends GServiceListRequest, Gordic.Data.ObjectData<TData> {
    }
    interface GServiceListRequestWithOrder<TOrder> extends GServiceListRequest {
        orderBy?: { ColumnId: TOrder, Direction? : "Asc"|"Desc"}[];
    }
    interface GServiceListResponse<TRow> extends IGAppLogicDataResponse, Gordic.Data.ObjectData<TRow[]> {
        fastFilterUsed: string;
        limitExceeded: boolean;
        fragments?: string[];
        servicePermissions?: object;
    }
    interface GServiceListResponseWithMeta<TRow, TMeta> extends GServiceListResponse<TRow> {
        meta?: TMeta;
    }

    interface GServiceSaveRequest<TData> extends IGAppLogicDataRequest, Gordic.Data.ObjectData<TData> {
    }
    interface GServiceSaveResponse<TData> extends IGAppLogicDataResponse, Gordic.Data.ObjectData<TData> {
        //errors?: Gordic.Validators.Error[];
        //info?: any[];
        //Messages?: any[];
    }


    interface GServiceActionRequest<T> extends IGAppLogicDataRequest {
        data: T;
    }
    interface GServiceActionResponse<T> extends IGAppLogicDataResponse {
        result: GOperationResult<T>;
    }

    interface GServiceGroupRequest<T> extends GServiceActionRequest<T> {
    }
    interface GServiceGroupResponse<T> extends IGAppLogicDataResponse {
        result: GGroupOperationResult<T>;
    }


    interface GOperationResult<T> {
        errors: Gordic.General.GValidationResult[];
        kind: GOperationResultKind;
        data: T;
    }
    const enum GOperationResultKind {
        Success = 200,
        Info = 203,
        Warning = 206,
        Error = 400,
    }
    type GGroupOperationResult<T> = GOperationResult<T>[];




    interface GFastFilterDto {
        text?: string;
        columns?: string[];
    }

    // OBSOLETE - ke zruseni
    interface GIslPromise<T> extends JQueryPromise<T> {
        getView(): JQueryPromise<Gordic.Data.View<T>>;
        getData(): JQueryPromise<T>;
    }


    // TS
  /*  interface IServiceBase {  // TODO: patri prejmenovat na ServiceBase
        getServiceInfo(): ServiceInfo;
        getMethodInfo(methodName: string): MethodInfo;
    }*/
    interface MessageFilterContext<TInput = IGAppLogicDataRequest, TOutput = IGAppLogicDataResponse> {
        readonly serviceInfo: ServiceInfo;
        readonly methodInfo: MethodInfo; 
        call: (methodParamsOverride?: TInput, opts?: JQueryAjaxSettingsExtend) => JQueryPromise<TOutput>;
        callCount: number;
        [key: string]: any;
    }

    abstract class ServiceBase /*implements IServiceBase*/ {  // TODO: patri zrusit az budou vsechny ISLy nagenerovany s IServiceBase
        getServiceInfo(): ServiceInfo;
        getMethodInfo(methodName: string): MethodInfo;
        //use(messageFilter: MessageFilter<IGAppLogicDataRequest, IGAppLogicDataResponse>): this
    }

    interface ServiceInfo {
        name: String;
        methods: MethodInfo[];
    }
    interface MethodInfo {
        name: String; 
        oKeys: string[];
        fragments: string[];
    }
    type CallParams<TInput = object> = TInput | ((methodParams: TInput) => TInput | JQueryPromise<TInput>);
    type TaskRuntimeNext<TInput, TOutput> = (request?: TInput) => JQueryPromise<TOutput>;
    type MessageFilter<TInput, TOutput> = ((request: TInput, next: TaskRuntimeNext<TInput, TOutput>, ctx: MessageFilterContext<TInput, TOutput>) => TOutput | JQueryPromise<TOutput>);

    interface _Task<TInput=IGAppLogicDataRequest, TOutput=IGAppLogicDataResponse> { // TODO: patri prejmenovat na Task az Alik upravi makara
        serviceName: string;
        serviceInfo: null | ServiceInfo;
        methodName: string;
        methodInfo: null | MethodInfo;
        methodParams: null | CallParams<TInput>;

        get(methodParams?: TInput, callOptions?: JQueryAjaxSettingsExtend): JQueryPromise<TOutput>;
        getData(methodParams?: TInput, callOptions?: JQueryAjaxSettingsExtend): JQueryPromise<Gordic.Data.UnpackData<TOutput>>;
        getView(methodParams?: TInput, keys?: Gordic.Data.ViewKeys<Gordic.Data.UnpackRow<TOutput>>, callOptions?: JQueryAjaxSettingsExtend): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<TOutput>>>;
        /** @deprecated */ addResponseFilter(callback?: ((response: TOutput) => (TOutput | JQueryPromise<TOutput>)), fail?: Function): this
        use(messageFilter: MessageFilter<TInput, TOutput>): this
    }
    type Task<TRow=any, TInput=IGAppLogicDataRequest, TOutput=IGAppLogicDataResponse> = _Task<TInput, TOutput>; // TODO: compatibility s generovanymi ISL metodami z makar, patri zrusit
    interface View<TRow = any, TInput extends IGAppLogicDataRequest=GServiceListRequest, TOutput extends GServiceListResponse<TRow>=GServiceListResponse<TRow>> extends Gordic.Data.View<TRow> {
        requestData<TInput>(requestParams?: TInput, options?: Gordic.Data.ViewRequestDataOptions);
    }
    interface ViewConstructor {
        new <TRow = any, TInput extends IGAppLogicDataRequest=GServiceListRequest, TOutput extends GServiceListResponse<TRow>=GServiceListResponse<TRow>>(islTask: _Task<TInput, TOutput>, settings?: Gordic.Data.ViewSettings<TRow> & { filterPanel?: JQuery, startEmpty?: boolean, data?: TRow[], onResponse?: Gordic.Data.ProviderOptions<TRow, TOutput>["onResponse"] }): View<TRow, TInput, TOutput>;
    }
    const View: ViewConstructor;

    interface Client {
        islService: GContent;
        call(serviceName: string, methodName: string, methodParams: object, options?: object);
        use(messageFilter: MessageFilter<IGAppLogicDataRequest, IGAppLogicDataResponse>): this;
    }
    interface ClientConstructor {
        new(aIslService?: GContent | (() => GContent)): Client;
    }
    const Client: ClientConstructor;


    /**
     * Provider<TRow> - Data Processor pro nacitani dat z ISL s automatickou podporou fragmentu
     * 
     * @author Tomáš Skála
     * @since 480.1.0.496
     */
    class Provider<TRow=any, TInput extends GServiceListRequest=GServiceListRequest, TOutput extends GServiceListResponse<TRow>=GServiceListResponse<TRow>> extends Gordic.Data.Provider<TRow, TInput, TOutput> {
        constructor(islTask: _Task<TInput, TOutput>, options?: Gordic.Data.ProviderOptions<TRow, TOutput>);
        confirmed: string[];
        ignored: string[];
        islTask: _Task<TInput, TOutput>;
    }

    export function getServiceInfoList(): ServiceInfo[];
    export function register(service: ServiceInfo); 
    export function register(services: ServiceInfo[]); 
}

/*
declare namespace Gordic.Isl.Catalog {
    interface TestIsl {
        list(rq ?: string): _Task<GServiceListRequest, GServiceListResponse<{}>>;
        read(rq ?: string): _Task<GServiceReadRequest<{}>, GServiceReadResponse<{}>>;
    }
}

declare namespace Gordic.Isl {
    interface Client {
        TestIsl: ServiceBase & Catalog.TestIsl;
    }
    const TestIsl: Client["TestIsl"];
}
*/

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gdataservice.d.ts 

declare namespace Gordic.Utility {
    function setObjectValue(meta: MetaRow<any> | null, fieldName:string, value: any): void
    function setObjectValueFast(meta: MetaRow<any> | null, fieldName: string, value: any): void

    function getObjectValue(meta: MetaRow<any> | null, fieldName: string): any
    function getObjectValueFast(meta: MetaRow<any> | null, fieldName: string): any

    function fieldStringSafe(fieldName: string, metaPropertyName?: string, dataPropertyName?: string): string
    function fieldStringUnsafe(fieldName: string, metaPropertyName?: string, dataPropertyName?: string): string
    function fieldStringEnsureObjects(fieldName: string, metaPropertyName?: string, dataPropertyName?: string): string

    function setObjectValueFce(fieldName?: string | null): (meta: MetaRow<any> | null, value: any) => void;
    function getObjectValueFce(fieldName?: string | null): (meta: MetaRow<any> | null) => any;
}


declare namespace Gordic.Data {

    namespace Readers {
        type FastFilterType = { text: string }; 
        interface IGReaderBase {
            /** Název serverové třídy readeru*/
            readerClass?: string;
            keys?: string[];
            /** Výčet sloupců, které chceme vrátit (klíče se prenáší automaticky), NULL = všechny */
            /** @default null */
            columns?: string[] | string;
            /** Očekávaná průměrná délka v bytech na jeden záznam. Pokud není explicitně zadán limit, použije se k jeho výpočtu tato hodnota a informace o rychlosti použité sítě */
            /** @default 300*/
            rowSize?: number;
            /** Sort požadovaný po serveru */
            /** @default null */
            sort?: string;
            /** Očekávaný maximální limit položek zasílaný ze serveru (vrácená data mohou být větší pokud je server pošle, nebo jsou již v cache) */
            /** @default 50000*/ 
            limit?: number;
            /** Maximální počet paralelních zápisů v cache pro tento reader. 0 znamená, že se vůbec nepoužije cache, ani pro čtení nebo pro zápis*/
            /** @default 5*/
            cached?: number;
            /** Příznak. že se má v requestu ignorovat fastFilter (mají se načíst vždy všechna data) */
            /** @default false*/
            readAll?: boolean;
            /** Příznak, že data nejsou kontextuálně vázaná na uživatele a lze je použít napříč ixs_fun/eko/...*/
            /** @default false*/
            permanent?: boolean;
            readerParams?: string[] | ObjectLiteral<any>;
            /** TODO */
            fastFilter?: FastFilterType;
        }
        /**
         * Zakladni data provider pro serverove tridy typu Gordic.ControlsLogic.Client.GDataReader
         * @author TSkala
         * @date 2018-03-13*/

        class Base<T=any> implements IGReaderBase {
            /** Název serverové třídy readeru*/
            readerClass: string;
            keys: string[];
            /** Výčet sloupců, které chceme vrátit (klíče se prenáší automaticky), NULL = všechny */
            /** @default null*/
            columns: string[] | string;
            /** Očekávaná průměrná délka v bytech na jeden záznam. Pokud není explicitně zadán limit, použije se k jeho výpočtu tato hodnota a informace o rychlosti použité sítě */
            /** @default 300*/
            rowSize: number;
            /** Sort požadovaný po serveru */
            /** @default null*/
            sort: string;
            /** Očekávaný maximální limit položek zasílaný ze serveru (vrácená data mohou být větší pokud je server pošle, nebo jsou již v cache) */
            /** @default 50000*/
            limit: number;
            /** Maximální počet paralelních zápisů v cache pro tento reader. 0 znamená, že se vůbec nepoužije cache, ani pro čtení nebo pro zápis*/
            /** @default 5*/
            cached: number;
            /** Příznak, že se má v requestu ignorovat fastFilter (mají se načíst vždy všechna data) */
            /** @default false*/
            readAll: boolean;
            /** Příznak, že data nejsou kontextuálně vázaná na uživatele a lze je použít napříč ixs_fun/eko/...*/
            /** @default false*/
            permanent: boolean;
            readerParams: string[];
            /** TODO */
            fastFilter: FastFilterType;
            constructor(options: IGReaderBase);
            getData(filters?: any, fastFilter?: FastFilterType, related?: HTMLElement | JQuery<HTMLElement> | Element | GContent): JQueryPromise<T[]>;
            getView(filters?: any, fastFilter?: FastFilterType, related?: HTMLElement | JQuery<HTMLElement> | Element | GContent): JQueryPromise<Gordic.Data.View<T>>;
            verify(keyData: any): any;
            provider(serverFilterGetter?: any, fastFilterDefault?: FastFilterType): (fastFilterText?: any) => JQuery.PromiseBase<T[] | Gordic.Data.View<T>, never, never, never, never, never, never, never, never, never, never, never>;
        }
    }

    interface ViewSettings<TRow=any> {
        key?: ViewKeys<TRow>;
        metrics?: null | "on" | "console" | "log";
        processOnStart?: boolean; 
        processors?: ObjectLiteral<Gordic.Data.BaseProcessor>;
    }

    interface ViewMetric {
        time: Number;
        procId: string;
        tier: ViewTiers | "prepare";
        rows: Number;
        result: "nochange" | "changed" | "new";
    }

    interface ViewMetricsSum {
        time: Number;
        rows: Number; 
        tiers: Pick<ViewMetric, "time" | "tier" | "rows"> & {
            matrics: ViewMetric[];
        }[];
    }

    interface ViewInfoOptions<TRow=any> {  // OBSOLETE!!!
        /**serverSide only**/
        fields?: any[]
        /**serverSide only**/
        serverFilter?: ObjectLiteral<any>,
        filter?: string | ((meta: MetaRow<TRow>, index?: number, data?: MetaRow<TRow>[]) => boolean) | null,
        groups?: any[] | null,
        /** 1) Seznam datovych fieldu: "prijmeni, jmeno, !vek"
         * 2) Metafieldy pro metadata: "@relevance, prijmeni, jmeno"
         * 3) [DOPORUCENE] Typovy inline (rychlejsi + podpora cestiny/decimalu): Gordic.Data.Sorting.Inline.text("prijmeni") + Gordic.Data.Sorting.Inline.text("jmeno") + Gordic.Data.Sorting.Inline.number("vek", false, true)
         * 4) Custom funkce (muze byt predano rovnou sortu)
         * 5) SortDescriptor: { sortDescriptor: {viz. body 1-4}, descending: false }
         * 6) Array z bodu 1-5 (POZOR: vyuziti bodu 4 v teto kombinaci zpusobi zpomaleni sortu o 30-400% v dusledku nutnosti garantovat spravny scope predane funkce, coz vyrazi inline optimalizaci browseru pri reseni sortovaci funkce)
        */
        sort?: Sorting.SortDescriptor<TRow> | Sorting.SortDescriptor<TRow>[], // string, []
        limit?: number, // number
        postProcess?: (array: TRow[], wrapFunc: DataStreamContext<TRow>['wrap']) => void// function ([])
    }

    /**
        * TierOptions Nastaveni jednoho tieru 
        * 
        * @author Tomáš Skála
        * @since 480.1.0.336
        */
    interface TierOptions {
        order?: number; 
    }

    interface ObjectData<TData=any> {
        data: TData; 
    }
    type UnpackData<T> = T extends ObjectData<infer TData> ? TData : T;
    type UnpackRow<T> =
        T extends ObjectData<(infer TRow)[]> ? TRow :
        T extends (infer TRow)[] ? TRow : T;
    type RequestListObject = object;
    type ResponseListObject<TRow=any> = TRow[] | ObjectData<TRow> | object;
    interface ViewRequestDataOptions<TOutput extends ResponseListObject = ResponseListObject> {
        updateMode?: ViewUpdateMode | null;
        /**
         * OBSOLETE - necte se, pouzijte filterPanelPolicy
         * @deprecated OBSOLETE - necte se, pouzijte filterPanelPolicy
         * @type {boolean}
         */
        isDefault?: boolean; 
        /**
         * filterPanelPolicy (default="require")  
         * @type {ViewRequestDataFPP}
         */
        filterPanelPolicy?: ViewRequestDataFPP;
        local?: boolean;
        onResponse?: (response: TOutput) => (TOutput | undefined);
    }
    interface ViewRequestData<TInput extends RequestListObject = RequestListObject, TOutput extends ResponseListObject = ResponseListObject> extends ViewRequestDataOptions<TOutput> {
        request: TInput;
    }

    interface ViewResponseData<TRow=any, TInput extends RequestListObject = RequestListObject, TOutput extends ResponseListObject<TRow> = ResponseListObject<TRow>> extends ViewRequestData<TInput, TOutput> {
        response: TOutput; 
    }
    interface DataStreamContext<TRow=any> {
        db: { [K in ViewTiers]: MetaRow<TRow>[] };
        wrap: (data: TRow | TRow[] | MetaRow<TRow> | MetaRow<TRow>[], extend?: Object) => MetaRow<TRow>[];
        mergeData?: MergeProcessorMerger<TRow> | MergeProcessorMerger<TRow>[];
        modified?: MetaRow<TRow>[];
        deleted?: MetaRow<TRow>[];
        fragments?: FragmentList;
        requestData?: ViewRequestDataOptions;
        responseData?: ViewResponseData<TRow>[];
        errors?: GError[];
        [X: string]: any; 
    }

    type BaseProcessorOptions<TRow=any> = Partial<GOmit<BaseProcessor<TRow>, "setEnabled">> & { [X: string]: any; };
    type ProcessorOptions<TRow=any> = GOmit<BaseProcessorOptions<TRow>, "subProcessors" | "init" | "detach" | "prepare" | "process">;

    /**
        * BaseProcessor - Zakladni procesor zpracovani dat 
        * 
        * @author Tomáš Skála
        * @since 480.1.0.336
        */
    class BaseProcessor<TRow=any> {
        constructor(options?: BaseProcessorOptions<TRow>);
        tiers: ObjectLiteral<TierOptions>;
        subProcessors: BaseProcessor[];
        enabled: boolean;
        metaFieldsToRemoveOnDetach: string[] | null;
        view: Gordic.Data.View<TRow>;
        init(view: Gordic.Data.View<TRow>, id: string, predecessor?: BaseProcessor<TRow>): void;
        detach(successor: BaseProcessor<TRow> | null, detachComputers: ((data: MetaRow<TRow>[]) => void)[]): void;
        setEnabled(state: boolean): void;
        prepare(context: DataStreamContext<TRow>): void; 
        process(tier: ViewTiers, data: MetaRow<TRow>[], context: DataStreamContext<TRow>): MetaRow<TRow>[] | null;
    }
    interface MergeProcessorMerger<TRow> {
        add?: MetaRow<TRow>[] | TRow[] | MetaRow<TRow> | TRow;
        update?: MetaRow<TRow>[] | TRow[] | MetaRow<TRow> | TRow;
        extend?: MetaRow<TRow>[] | TRow[] | MetaRow<TRow> | TRow;
        refresh?: MetaRow<TRow>[] | TRow[] | MetaRow<TRow> | TRow;
        delete?: MetaRow<TRow>[] | TRow[] | MetaRow<TRow> | TRow | ((data: TRow, meta: MetaRow<TRow>) => Boolean);
        set?: MetaRow<TRow>[] | TRow[] | MetaRow<TRow> | TRow;
        reset?: MetaRow<TRow>[] | TRow[] | MetaRow<TRow> | TRow;
    }

    /**
        * MergeProcessor<TRow> - procesor pro "fyzickou" upravu dat. 
        * 
        * @author Tomáš Skála
        * @since 480.1.0.336
        */
    class MergeProcessor<TRow> extends BaseProcessor<TRow> {
        constructor(mergers?: MergeProcessorMerger<TRow> | MergeProcessorMerger<TRow>[], mode?: "onetime" | "listener" | "onset", options?: ProcessorOptions<TRow>);
        data: MergeProcessorMerger<TRow> | MergeProcessorMerger<TRow>[]
    }

    type ComputedFieldsComputer<TRow> = ((diffData: MetaRow<TRow>[], data: MetaRow<TRow>[], context: DataStreamContext<TRow>) => void);
    /**
        * ComputedFieldsProcessor<TRow> - procesor pro optimalizovane vypoctene sloupce, ktere musi byt pritomne v datech(metadatech)
        * 
        * @author Tomáš Skála
        * @since 480.1.0.336
        */
    class ComputedFieldsProcessor<TRow> extends BaseProcessor<TRow> {
        constructor(computers?: ComputedFieldsComputer<TRow> | ComputedFieldsComputer<TRow>[], options?: ProcessorOptions<TRow> & { disableAfterExecute?: boolean });
        computers: ComputedFieldsComputer<TRow>[];
        executed: ComputedFieldsComputer<TRow>[];
        reset(): void;
    }

    /**
        * FilterProcessor<TRow> - procesor pro zakladni filtrovani dat
        * 
        * @author Tomáš Skála
        * @since 480.1.0.336
        */
    class FilterProcessor<TRow> extends BaseProcessor<TRow> {
        /**
            * @constructor
            * @param {string | ((meta: MetaRow<TRow>) => boolean)} [filter] filtr v textovem (napr.: "aktivita > 900") nebo funkcionalnim tvaru
            * @param {object} [options=null]
            */
        constructor(filter: string | ((meta: MetaRow<TRow>) => boolean), options?: ProcessorOptions<TRow>);
        fce: ((meta: MetaRow<TRow>) => boolean);
    }

    /**
        * SortProcessor<TRow> - procesor pro zakladni trideni dat
        * 
        * @author Tomáš Skála
        * @since 480.1.0.336
        */
    class SortProcessor<TRow> extends BaseProcessor<TRow> {
        /**
            * @constructor
            * @param {string | ((a: MetaRow<TRow>, b: MetaRow<TRow>) => number) | Sorting.SortDescriptor} [sort] 
            * 1) Seznam datovych fieldu: "prijmeni, jmeno, !vek"
            * 2) Metafieldy pro metadata: "@relevance, prijmeni, jmeno"
            * 3) [DOPORUCENE] Typovy inline (rychlejsi + podpora cestiny/decimalu): Gordic.Data.Sorting.Inline.text("prijmeni") + Gordic.Data.Sorting.Inline.text("jmeno") + Gordic.Data.Sorting.Inline.number("vek", false, true)
            * 4) Custom funkce (muze byt predano rovnou sortu)
            * 5) SortDescriptor: { sortDescriptor: {viz. body 1-4}, descending: false }
            * 6) Array z bodu 1-5 (POZOR: vyuziti bodu 4 v teto kombinaci zpusobi zpomaleni sortu o 30-400% v dusledku nutnosti garantovat spravny scope predane funkce, coz vyrazi inline optimalizaci browseru pri reseni sortovaci funkce)
            * @param {object} [options]
            */
        constructor(sort: Sorting.SortDescriptor<TRow> | Sorting.SortDescriptor<TRow>[], options?: ProcessorOptions<TRow>);
        fce: Sorting.SortDelegate<TRow>;
    }
    /**
        * LimitProcessor - procesor pro omezeni poctu radku zobrazeni
        * 
        * @author Tomáš Skála
        * @since 480.1.0.336
        */
    class LimitProcessor<TRow=any> extends BaseProcessor<TRow> {
        constructor(limit: number, options?: ProcessorOptions<TRow>);
        limit: number;
    }

    /**
     * FragmentManager - spravuje pozadavky na datove fragmenty (kooperuje s procesorem schopnym dodat datove fragmenty ondemand - napr Gordic.Isl.Provider)
     * 
     * @author Tomáš Skála
     * @since 480.1.0.539
     */
    class FragmentManager<TRow=any> extends BaseProcessor<TRow> {
        constructor(fragments: string[], options?: ProcessorOptions<TRow>);
        fragments: string[];
    }

    /**
     * ErrorProcessor - procesor pro jednoduchou udrzbu a oznaceni chyb v datech, oznacene chyby lze vizualizovat ve konzumeru, ktery jejich zobrazeni podporuje (napr. ggrid)
     * 
     * @author Tomáš Skála
     * @since 480.1.0.539
     */
    class ErrorProcessor<TRow=any> extends BaseProcessor<TRow> {
        constructor(errorChecker: (data: TRow, meta: MetaRow<TRow>, allData: MetaRow<TRow>[], currentErrors: Gordic.Validators.GridError[]) => Gordic.Validators.GridError[], options?: ProcessorOptions<TRow>);
        errorGroup: string;
        priorityList: ObjectLiteral<number>;
    }

    interface ProviderOptions<TRow=any, TOutput extends ResponseListObject<TRow>=TRow[]> extends ProcessorOptions<TRow> {
        defaultUpdateMode?: ViewUpdateMode | null,
        filterPanel?: JQuery,
        onResponse?: (data: TOutput) => (TOutput | null | undefined);
    }
    type ProviderDelegate<TRow=any, TInput extends RequestListObject=RequestListObject, TOutput extends ResponseListObject<TRow>=ResponseListObject<TRow>> = (request: TInput, requestData: ViewRequestDataOptions) => (TOutput | JQueryPromise<TOutput> | TRow[] | JQueryPromise<TRow[]> | null);
    class Provider<TRow=any, TInput extends RequestListObject=RequestListObject, TOutput extends ResponseListObject<TRow>=ResponseListObject<TRow>> extends BaseProcessor<TRow> {
        constructor(provider: ProviderDelegate<TRow, TInput, TOutput>, options?: ProviderOptions<TRow, TOutput>);
        provider: ProviderDelegate<TRow, TInput, TOutput>; 
        isValidRequest(requestData: ViewRequestData<TInput>, ctx: DataStreamContext<TRow>): boolean;
        requestData(requestData: ViewRequestData<TInput>): ViewResponseData<TOutput> | Promise<ViewResponseData<TOutput>>;  // musi byt dualni protoze opravdu je nutne zpracovavat neco ihned v aktualnim streamu a na neco cekat a pustit druhy stream
    }



    interface TreeMetaRow<TRow=any> extends MetaRow<TRow> {
        structure: {
            state: DataStructureState;
            children: TreeMetaRow<TRow>[];
            parent: string | null;
            level: number;
            interaction: (state?: DataStructureState | null, options?: object) => void;
        }
    }
    interface TreeOrganizer<TRow=any> {
        parentKey: ViewKeyComputer<TRow>;
        wrap?: DataStreamContext<TRow>['wrap'];
    }
    class Tree<TRow=any, TInput extends RequestListObject=RequestListObject> extends BaseProcessor<TRow> {
        constructor(organizer: TreeOrganizer<TRow>, options?: ProcessorOptions<TRow> & Partial<Pick<Tree<TRow>, "defaultState" | "filterKeepStructure" | "filterIncludeChildren" | "dynamicRequest" | "metaField">>);
        defaultState: DataStructureState | ((meta: TreeMetaRow<TRow>) => DataStructureState);
        filterKeepStructure: boolean;
        filterIncludeChildren: boolean;
        dynamicRequest: (data: TRow, meta: MetaRow<TRow>) => TInput; 
        metaField: string;

        getParent(meta: MetaRow<TRow>): MetaRow<TRow> | null;
        getParents(meta: MetaRow<TRow>): MetaRow<TRow>[];
        getRawChildren(meta: MetaRow<TRow>, subLevels?: number): MetaRow<TRow>[]; 
        getChildren(meta: MetaRow<TRow>, subLevels?: number): MetaRow<TRow>[]; 

        static parentIdOrganizer<TRow=any>(parentKey: ViewKeys<TRow>): TreeOrganizer<TRow>;
        static structuredKeyOrganizer<TRow=any>(structure: number[], zeroed?: boolean): TreeOrganizer<TRow>;
        static childrenOrganizer<TRow=any>(childrenField: string): TreeOrganizer<TRow>;
    }

    type GroupAggregateDelegate<TRow> = (aggregateMeta: GroupHeaderMetaRow<TRow>, rows: MetaRow<TRow>[]) => void; 
    type GroupHashDelegate<TRow> = (meta: MetaRow<TRow>, allData: MetaRow<TRow>[]) => string;
    type GroupState = Extract<DataStructureState, "closed" | "open">;
    interface GroupingDefinition<TRow> {
        aggregate?: GroupAggregateDelegate<TRow>;
        hash?: GroupHashDelegate<TRow>;
        includeEmpty?: boolean;
        defaultState?: GroupState | ((meta: GroupHeaderMetaRow<TRow>) => GroupState);
        sort?: string;
        extend?: object;
    }
    interface GroupHeaderMetaRow<TRow=any> extends MetaRow<TRow> {
        structure: {
            state: GroupState;
            level: number;
            parent: string | null;
            groups: GroupHeaderMetaRow<TRow>[];
            rows: MetaRow<TRow>[];
            groupingProc: string;
            groupingTier: number;
            interaction: (state?: GroupState | null, options?: object) => void;
        }
    }
    class Grouping<TRow=any> extends BaseProcessor<TRow> {
        constructor(grouping: GroupingDefinition<TRow>[], options?: ProcessorOptions<TRow> & Partial<Pick<Grouping<TRow>, "metaField">>);
        grouping: GroupingDefinition<TRow>[];
        roots: GroupHeaderMetaRow<TRow>[] | null;
        groupsIndex: ObjectLiteral<GroupHeaderMetaRow<TRow>>;
        metaField: string;
    }

    /**
     * Spravce seznamu pozadovanych fragmentu
     * 
     * @author Tomáš Skála
     * @since 480.1.0.539
     */
    class FragmentList {
        constructor(required?: string[]);

        /**
         * seznam pozadovanych fragmentu
         * @type {string[]}
         */
        required: string[];

        /**
         * seznam potvrzenych (nactenych) fragmentu
         * @type {string[]}
         */
        confirmed: string[];

        /**
         * seznam fragmentu, o ktere se jeste nikdo neprihlasil 
         * @type {string[]}
         */
        unresolved: string[];

        /**
         * prida "fragments" do seznamu pozadovanych
         * 
         * @param {string[]} fragments
         * @returns {string[]} seznam skutecne nove pridanych fragmentu (po odstraneni empty, duplicit, apod.)
         */
        add(fragments: string[]): string[]; 

        /**
         * pokud mam fragmenty "fragments", co jeste zbyva nevyreseneho? ( unresolved - fragments )
         * 
         * @param {string[]} fragments
         * @returns {string[]}
         */
        residue(fragments: string[]): string[]; 

        /**
         * potvrzeni nacteni fragmentu ( confirmed += fragments; unresolved -= fragments )
         * 
         * @param {string[]} fragments
         * @returns {string[]} zbytek "unresolved"
         */
        confirm(fragments: string[]): string[];

        /**
         * jsou vsechny "fragments" nactene? 
         * 
         * @param {string[]} fragments
         * @returns {boolean}
         */
        isConfirmed(fragments: string[]): boolean;

        /**
         * jsou vsechny "fragments" pozadovane?
         * 
         * @param {string[]} fragments
         * @returns {boolean}
         */
        isRequired(fragments: string[]): boolean;

        /**
         * oznaci fragmenty jako "vyrizuji se" ( unresolved -= fragments )
         * 
         * @param {string[]} fragments
         * @returns {string[]}
         */
        solving(fragments: string[]): string[]; 

        /**
         * pokud mam jiz nactene "fragments" a "ignored" vyresit neumim, zbyva jeste neco k reseni? 
         * 
         * @param {string[]} [confirmed] nactene fragmenty
         * @param {string[]} [ignored] fragmenty ktere neumim vyresit
         * @param {(fragment: string)} [cute] (default = null) filter na fragmenty k reseni (moznost vyhodnotit na zaklade nazvu pozadovaneho fragmentu, zda je to ukol pro me)
         * @returns {object} { missing: ... fragmenty ktere jsou pozadovane a chybi, required: ... vsechny pozadovane fragmenty (typicky kdyz uz musime na server, tak nejdeme jen pro chybejici sloupce, ale pro vsechny sloupce znovu) }
         */
        getJob(confirmed?: string[], ignored?: string[], cute?: (fragment: string) => boolean): { missing: string[], required: string[] };       
    }

    type ViewTiers = "data" | "filter" | "sort" | "group" | "view";
    type ViewUpdateMode = "add" | "update" | "extend" | "refresh" | "delete" | "set" | "reset";
    type ViewRequestDataFPP = "require" | "ignore" | "lax";
    type ViewKeyComputer<TRow> = (rows: MetaRow<TRow>[]) => void;
    type ViewKeys<TRow> = null | string | string[] | ViewKeyComputer<TRow>;
    type ViewKeyObject<TRow> = Partial<TRow> | MetaRow<TRow>;

    interface View<TRow=any> extends IGEvents {
        //applyView(viewInfo: ViewInfoOptions<TRow>, isNarrowing?: boolean): void
        //refreshView(viewInfo?: ViewInfoOptions<TRow>): void
        keys: ViewKeys<TRow>
        processors: ObjectLiteral<BaseProcessor<TRow>>;
        metrics: ViewMetric[];
        keyComputer: ViewKeyComputer<TRow>;

        /**
         * Registrace pocitaneho sloupce
         * @param {string | string[]} fields carkou oddelene identifikatory sloupcu (nebo jejich Array), ktere tento predpis resi. Je doporucene, aby odpovidaly nazvum fildu v datech pro prehlednejsi oblushu Ensure.
         * @param {Function} processor delegat, ktery ma za ukol na skupine radku (meta) spocitat nove fieldy
         * @param {boolean} [immediate=false] (default=false) zda se ma processor okamzite spustit na existujicich datech
         */
        //registerComputedFields(fields: string | string[], processor: (rows: MetaRow<TRow>) => void, immediate?: boolean): void

        /**
         * Zaruci spusteni prislusnych pocitanych sloupcu a nadale bude tyto zajistovat pro vsechny nove radky View
         * @param {string | string[]} [fields=[vsechny existujici]] (default=[vsechny existujici]) carkou oddelene identifikatory sloupcu (nebo jejich Array), ktere chceme spocitat.
         * @param {boolean} [force] (default=false) zda se ma vypocet provest i pro sloupce, ktere jsou jiz spocitany (nuceny prepocet)
         * @returns true, pokud byl nalezen/spocitan alespon jeden z predanych fieldu, v opacnem pripade false
         */
        //ensureComputedFields(fields?: string | string[], force?: boolean): boolean;


        /**
         * Sprava procesoru, slouzi pro registraci, odregistraci procesoru 
         * 
         * @param {ObjectLiteral<BaseProcessor>} processorCollection seznam procesoru ke zpracovani, nebo null pod pripadnym nazvem procesoru pro odstraneni z kolekce 
         * @param {...BaseProcessor} processors seznam instanci procesoru, budou pojmenovany anonymne
         * @param {boolean} [apply=true] zda se maji zmeny v procesorech aplikoval okamzite
         * @param {DataStreamContext} context okamzita aplikace processoru s vlastnim pocatecnim contextem datastreamu 
         */
        process(processorCollection: ObjectLiteral<BaseProcessor<TRow> | null>, apply?: boolean);
        process(processorCollection: ObjectLiteral<BaseProcessor<TRow> | null>, context: Partial<DataStreamContext<TRow>>);
        process(...processors: BaseProcessor<TRow>[]);


        /**
         * Spusteni procesoru nad daty. 
         * 
         * @param {DataStreamContext} [context=null] vlastni kontext/parametry predane proudu zpracovani
         * @param {ObjectLiteral<boolean>} [forcedTiers=null] vynucene tiery ke spusteni. Pokud neni uvedeno, spusti se automaticky vsechny tiery 
         */
        refresh(context?: Partial<DataStreamContext<TRow>>, forcedTiers?: Record<ViewTiers, boolean>);

        /**
         * Vrati seznam vsech procesoru
         * 
         * @param {boolean} [includeSubs=false] zda se maji vratit (linearizovat) i subprocessory pro ziskani uplneho seznamu zpracovavanych procesoru
         * @param {boolean} [onlyEnabled=false] zda se maji vratit pouze aktivovane procesory (enabled se v kombinaci s includeSubs resi stromove)
         * @returns {BaseProcessor[]}
         */
        getProcessors(includeSubs?: boolean, onlyEnabled?: boolean): BaseProcessor<TRow>[]; 

        /**
         * Vybudovani indexu pro rychly pristup k hodnotam pomoci klice
         * @param {ViewTiers|MetaRow<TRow>[]} [source=view] zdroj dat indexu 
         * @param {MetaRow<TRow>[]} data konkretni data pro vybudovani indexu
         * @param {boolean} [meta=false] zda ma vybudovany index obsahovat metaRow (true), nebo data (false)
         * @param {ObjectLiteral<MetaRow<TRow>>} [index=null] instance existujiciho indexeru, ktery se obohacuje novymi radky
         * @returns {ObjectLiteral<MetaRow<TRow>>} objekt, jehoz klici jsou hodnoty klicu (@key) jednotlivych radku a hodnotami jsou metadata prislusnych radku
         */
        buildIndex(source?: ViewTiers, meta?: boolean): ObjectLiteral<TRow>;
        buildIndex(source: ViewTiers, meta: true): ObjectLiteral<MetaRow<TRow>>;
        buildIndex(data: MetaRow<TRow>[], meta?: boolean, index?: ObjectLiteral<MetaRow<TRow>>): ObjectLiteral<TRow>;
        buildIndex(data: MetaRow<TRow>[], meta: true, index?: ObjectLiteral<MetaRow<TRow>>): ObjectLiteral<MetaRow<TRow>>;

        /**
         * vrati index k soucasnym datum (muze obsahovat klice, ktere v datech jiz nejsou, ale budou undefined)
         * 
         * @returns {ObjectLiteral<MetaRow<TRow>>}
         */
        getIndex(): ObjectLiteral<MetaRow<TRow>>; 

        getMetrics(): ViewMetricsSum;

        /**
         * Dohledani uplnych zaznamu z hodnot primarniho klice
         * @param {Partial<TRow> | Partial<TRow>[]} keyData objekt klicu. Napr.: {ixs_fun: "0000AKF12345", log_p: 1}. Muze byt i pole pro hromadne dohledani.
         * @param {boolean} [meta=false] zda chceme data, nebo metadata
         * @returns data nebo metadata nalezeneho radku (nebo NULL). Pokud byl keyData pole, vrati se vzdy pole s vyhodnocenymi hodnotami na korespondujicich pozicich
         */
        verify(keyData: ViewKeyObject<TRow>, meta?: boolean): TRow | null
        verify(keyData: ViewKeyObject<TRow>, meta: true): MetaRow<TRow> | null
        verify(keyData: ViewKeyObject<TRow>[], meta?: boolean): TRow[] | null
        verify(keyData: ViewKeyObject<TRow>[], meta: true): MetaRow<TRow>[] | null

        /**
         * Najde a vrati radek podle interniho identifikatoru radku (meta.key)
         * @param {string} key meta.key hledaneho radku
         * @param {boolean} [meta=false] zda chceme data, nebo metadata
         * @returns data, nebo metadata prvniho nalezeneho radku, jinak NULL
         */
        findByRowKey(key: string, meta?: boolean): TRow | null
        findByRowKey(key: string, meta: true): MetaRow<TRow> | null

        /**
         * Najde a vrati data dle hodnot sloupce/u primarniho klice tabulky (musi byt k dispozici View.keys). Napr.: findByKey("0000AKE12345", 1);
         * Pro rychlejsi hledani z klicoveho objektu pouzijte verify() TODO: pro meta=true nelze napsat d.ts !
         * @param {...Primitive} keys jednotlive argumenty metody reprezentuji hodnoty klicovych sloupcu v poradi uvedenem v View.keys
         * @param {Primitive} key jednoduchy klic v datech 
         * @param {boolean} [meta=false] zda chceme data, nebo metadata
         * @returns nalezena data odpovidajici predanym klicum, jinak NULL
         */
        findByKey(...keys: Primitive[]): TRow | null
        findByKey(key: Primitive, meta?: boolean): TRow | null
        findByKey(key: Primitive, meta: true): MetaRow<TRow> | null

        /**
         * Dohleda index radku podle klice/instance
         * @param {TRow|MetaRow<TRow>|ObjectLiteral<any>|Primitive} keyObj instance metadat, dat, objekt klicu ({ ixs: "0000AKE00000" }), nebo seznam klicu (view.indexOf("0000AKE00000"))
         * @param {...Primitive} keys jednotlive argumenty metody reprezentuji hodnoty klicovych sloupcu v poradi uvedenem v View.keys
         * @returns index radku ve vyslednem zobrazeni
         */
        indexOf(keyObj: ViewKeyObject<TRow>): number
        indexOf(...keys: Primitive[]): number

        /**
         * Aktualizuje data.
         * @param {TRow[] | TRow | MetaRow<TRow>[] | MetaRow<TRow>} data Nová data.
         * @param {"add" | "update" | "extend" | "refresh" | "delete" | "set" | "reset" } [mode=reset] Pokud není mode nastaven, pak nahradí stará data novými.
         */
        updateData(data: TRow[] | TRow | MetaRow<TRow>[] | MetaRow<TRow>, mode?: ViewUpdateMode ): void

        /**
         * Aktualizuje data.
         */
        updateDataRaw(merger: MergeProcessorMerger<TRow> | MergeProcessorMerger<TRow>[]): void

        /**
         * Vznese pozadavek na externi ziskani dat (pokud existuje procesor, ktery ho umi vyhodnotit)
         * 
         * @param {Object} [requestParams]
         * @param {ViewRequestDataOptions} [options]
         */
        requestData<TInput extends RequestListObject = RequestListObject>(requestParams?: TInput, options?: ViewRequestDataOptions): JQueryPromise<void>;

        /**
         * Vraci pocty radku v jednotlivych fazich zpracovani pohledu
         * @param {ViewTiers} [source="view"] typ poctu, ktery pozadujeme:"data" - pocet datovy radku v originalnim zdroji dat,"filter" - pocet datovy radku po filtraci, "view" (default) - pocet radku aktualniho zobrazeni (muze obsahovat nedatove radky jako agregaty, hlavicky, apod.). Urceno pro spolupraci s getRows()
         * @returns {number} pocet radku
         */
        getCount(source?: ViewTiers): number

        /**
         * Vrati seznam radku vysledneho zobrazeni. Radky s prazdnymi daty jsou virtualni radky (souctove/hlavickove radky, apod.)
         * @param {boolean} [meta=false] zda se maji vratit metadata (true; rychlejsi), nebo jen cista data (false; pomalejsi)
         * @param {number} [start=0] index prvniho zaznamu, ktery se ma vratit (0-based)
         * @param {number} [count=infinite] pocet zaznamu k vraceni
         * @returns {TRow[] | MetaRow<TRow>[]} pole dat nebo metadat
         */
        getRows(meta?: boolean, start?: number, count?: number): TRow[];
        getRows(meta: true, start?: number, count?: number): MetaRow<TRow>[];

        /**
         * Vrati seznam radku behem jednotlivych fazi zpracovani. Vraci pouze datove radky (bez agregatu/hlavicek apod.)
         * @param {boolean} meta (default=false) zda se maji vratit metadata (true; rychlejsi), nebo jen cista data (false; pomalejsi)
         * @param {ViewTiers} [source=view] typ poctu, ktery pozadujeme: "data" - datove radky v originalnim zdroji dat, "filter" - datove radky po filtraci, "view" (default) - datove radky aktualniho zobrazeni (pouze realne radky, bez agregatu, hlavicek, apod.)
         * @returns {TRow[] | MetaRow<TRow>[]} pole dat nebo metadat
         */
        getDataRows(meta: true, source?: ViewTiers): MetaRow<TRow>[]
        getDataRows(meta?: boolean, source?: ViewTiers): TRow[]


        /**
         * isLoading - vrati priznak, zda View zrovna registruje probihajici operaci
         * 
         * @returns {boolean}
         */
        isLoading(): boolean; 

        /**
         * getLoadingPromise - vrati promise dokonceni vsech probihajicich operaci (v pripade ze loading neprobiha, bude promise resolvnuty) 
         * 
         * @returns {JQueryPromise<void>}
         */
        getLoadingPromise(): JQueryPromise<void>;
    }

    interface ViewConstructor {
        new <TRow=any>(data?: TRow[] | JQueryPromise<TRow[]>, settings?: ViewSettings<TRow>): View<TRow>;
    }

    const View: ViewConstructor;

    namespace Sorting {
        type SortDelegate<TRow=any> = ((a: MetaRow<TRow>, b: MetaRow<TRow>) => number);
        interface SortDescriptorObject<TRow=any> {
            sortDescriptor: string | SortDelegate<TRow>;
            descending: boolean;
        }
        type SortDescriptor<TRow=any> = string | SortDelegate<TRow> | SortDescriptorObject<TRow>;
        function createSortFunction<TRow=any>(sortDescriptor: SortDescriptor<TRow> | SortDescriptor<TRow>[]): SortDelegate<TRow>;
        class Inline {
            static text(field: string, nullable?: boolean, desc?: boolean): string;
            static number(field: string, nullable?: boolean, desc?: boolean): string;
            static decimal(field: string, nullable?: boolean, desc?: boolean): string;
            static datetime(field: string, nullable?: boolean, desc?: boolean): string;
            /**
             * // POZOR netridi uplne dobre (predevsim ceske texty, cisla ulozene ve stringu, apod.) + je pomalejsi; pouziva se kdyz nelze rozeznat typ pro alespon nejake trideni
             */
            static universal(field: string, nullable?: boolean, desc?: boolean): string;
        }
    }


    namespace Filtering {
        interface ResolverSearchOptions {
            refresh?: boolean;
        }

        /**
         * Data Processor reprezentujici uzivatelske hledani
         */
        abstract class BaseResolver<TSOpt extends ResolverSearchOptions = ResolverSearchOptions> extends BaseProcessor {
            /**
             * OBSOLETE!!!
             * @deprecated OBSOLETE!!!
             * 
             * @param {string} [filter]
             * @param {boolean} [apply]
             */
            search(filter?: string, apply?: boolean);

            /**
             * provede filtraci dataView dle predaneho "fulltext" filteru
             * 
             * @param {string} [filter]
             * @param {TSOpt} [options]
             */
            search(filter?: string, options?: TSOpt);

            /** Delegat volany po aplikaci vyhledavacich filtru. */
            searchChanged?: (filter?: string, options?: TSOpt) => void;

            protected getFilter(filter?: string, options?: TSOpt): (row) => boolean;
        }

        interface SimpleFilterResolverSearchOptions extends ResolverSearchOptions {
            hideMatches?: boolean;
            substituteCommaForDotInFilter?: boolean;
        }

        
        /**
         * Jednoduchy filtracni algoritmus vyuzivajici indexer. Nabizi tyto funkcnosti:
         * - case insensitive
         * - hledani "zacina na" bez ohledu na diakritiku (pouzijte "*onec" pro hledani "v obsahu")
         * - multikriterialita (vice hledanych slov automaticky spojene operaci AND)
         * - multicolumn (vice prohledavanych sloupcu)
         */
        class SimpleFilterResolver extends BaseResolver<SimpleFilterResolverSearchOptions> {
            /**
             * Konstruktor
             * @param {string[]} lookupColumns  Pole nazvu prohledavanch fieldu (podporuje @ a contains priznak *)
             * @param {ProcessorOptions<any>} options  Doplnujici parametry filtru
             */
            constructor(lookupColumns: string[], options?: ProcessorOptions<any> & { hideMatches?: boolean });
        }

        /**
        * Jednoduchy filtracni algoritmus vyuzivajici indexer. Nabizi tyto funkcnosti:
        * - case insensitive
        * - hledani "zacina na" bez ohledu na diakritiku (pouzijte "*onec" pro hledani "v obsahu")
        * - multikriterialita (vice hledanych slov automaticky spojene operaci AND)
        * - multicolumn (vice prohledavanych sloupcu)
        */
        class FullTextResolver extends BaseResolver<SimpleFilterResolverSearchOptions> {
            /**
             * Konstruktor
             * @param {string[]} lookupColumns  Pole nazvu prohledavanch fieldu (podporuje @ a contains priznak *)
             * @param {ProcessorOptions<any>} options  Doplnujici parametry filtru
             */
            
            constructor(lookupColumns: string[], options?: ProcessorOptions<any> & { hideMatches?: boolean });
        }

        /**
         * Algoritmus pro naseptavac. Ohodnocuje data podle hledaneho vyrazu tak, aby bylo mozne data setridit podle relevance. Resolver vytvari metafield @suggestionMatch a
         * automaticky nastavi View ma trideni podle neho! Vyssi hodnota je lepsi. Zaznamy s hodnotou 0 jsou odfiltrovany uplne.
         * Algoritmus nabizi tyto funkcnosti:
         * - case insensitive
         * - repsektovani diakritiky (nalezne vse, ale souhlasici diakritika znacne zvysuje relevanci)
         * - multikriterialita (vice hledanych slov automaticky spojene operaci AND; vcetne respektovani vice slovnych spojeni)
         * - multicolumn (vice prohledavanych sloupcu)
         * - prioritizuje zacatky sloupcu/slov
         */
        class SuggestionResolver extends BaseResolver {
            /**
             * Konstruktor
             * @param {string[]} lookupColumns  Pole nazvu prohledavanch fieldu (podporuje @)
             * @param {ProcessorOptions<any>} options  Doplnujici parametry filtru
             */
            constructor(lookupColumns: string[], options?: ProcessorOptions<any>);
        }
    }

    namespace Aggregates {
        function multi<TRow=any>(...aggregates: GroupAggregateDelegate<TRow>[]): GroupAggregateDelegate<TRow>;

        function first<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function firstNN<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function countNN<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function min<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function minDate<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function minDecimal<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function max<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function maxDate<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function maxDecimal<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function sum<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function sumDecimal<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function avg<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function avgDecimal<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function avgNN<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
        function avgNNDecimal<TRow=any>(sourceFieldName: string, aggregateFieldName?: string): GroupAggregateDelegate<TRow>;
    }


    export class readerCache {
        static getData(request, cached, permanent);
        static verify(request, cached);
        /**
         * Smazání třídy z cache readerů
         * @param {string} readerClass
         */
        static clearCache(readerClass:string);
    }

    
}

type DataStructureState = "closed" | "open" | "empty" | "unknown" | "loading";


declare namespace Gordic.Validators {
    interface GridError extends Error {
        row?: number;
        columnName?: string;
        priorityError?: boolean;
    }
}

interface MetaRow<TRow> extends ObjectLiteral<any> {
    _isMeta: true;
    _isVirtual?: true;
    data: TRow;
    key?: string;
    checked?: boolean;
    errors?: Gordic.Validators.GridError[];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gstor.d.ts 

//////////////////////////////////////////////////////////////////////////
// GStor
//////////////////////////////////////////////////////////////////////////

declare namespace Gordic.Data {
    type StorageKey = string | string[];

    interface IGStorage {
        rootStor: IGStorage;
        rootSection: string; 
        /**
         * nastaveni hodnoty, vcetne zanorenych vlastnosti (napr:"foo.bar" => { foo: { bar: null } })
         *
         * @param {StorageKey} key napr:"foo.bar", nebo ["foo", "bar"]
         * @param {any} value hodnota vlastnosti
         */
        set(key: StorageKey, value: any): this

        /**
         * ziskani hodnoty ze zanorenych vlastnosti (napr:"foo.bar")
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {boolean} [makeCopy=false] (default=false) zda se ma udelat deepcopy vracenych dat (=true) nebo se muze vratit instance ze Stor (=false)
         * @returns {any} hodnota, nebo undefined pokud neexistuje
         */
        get(key?: StorageKey, makeCopy?: boolean): any
         
        /**
         * ziskani hodnoty ze zanorenych vlastnosti (napr:"foo.bar") s moznosti vraceni vychozi hodnoty, pokud hledana hodnota je undefined
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {T} defaultValue
         */
        getDef<T>(key: StorageKey, defaultValue: T): T

        /**
         * obohati predany objekt o hodnoty ulozene v ulozisti, zadne nove nepridava
         * @param {object} applyTo objekt, ktery se obohacuje
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {boolean} [includeNewOnes=false] (default=false) zda se maji pridat i nove vlastnosti (true), ci pouze aktualizovat stavajici (false)
         */
        apply(applyTo: object, key: StorageKey, includeNewOnes?: boolean): object

        /**
         * smazani hodnoty zanorene vlastnosti (napr:"foo.bar")
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         */
        remove(key: StorageKey): this

        /**
         * smazani vsech podrizenych vlastnosti specifickeho objektu (napr:"foo.bar") - NULL/undef pro vymazani vsech svych children
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         */
        clear(key: StorageKey): this

        /**
         * Slouci predany objekt s konkretni pozici v ulozisti ($.extend, deepCopy)
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {Object[]} objects seznam vlastností k rozšíření, muze byt vic argumentu napr. merge("foo.bar", {...}, {...})
         */
        merge(key: StorageKey|null|undefined, ...objects: Object[]): this
        merge(...objects: Object[]): this

        /**
         * vlozi do uloziste vychozi hodnoty objektu, ktere v ulozisti dosud nejsou (provadi deepcopy (this <- def <- currentValue))
         *   { x: 10, y: 10 }.defaults({x: 0, y: 0, z: 0}) => {x: 10, y: 10, z: 0}
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {Object} [defaults={}] <pre>(default={}) vychozi hodnota. Pokud je objekt, provadi se deepcopy. Pokud hodnotovy typ, provede se "set" v pripade, ze zadna hodnota neexistuje.
         *   Pokud je rozpor mezi ulozenym a predanym typem, predany typ ma prednost (slouzi i pro narovnani typu v ulozisti):
         *     { pozice: 300 }.defaults("pozice", {x:10, y:20}) => {pozice: {x:10, y:20}} )
         *     { pozice: { x:10, y: 20} }.defaults("pozice", 400) => {pozice: 400} )
         *     { form: 'mujForm' }.defaults("form.info", {title: ''}) => {form: {info: {title: ''}}}
         *   </pre>
         */
        defaults(key: StorageKey, defaults?: Object): this

        /**
         * Vrati priznak, zda dana sekce uloziste podleha zamku ze sdileneho obsahu (sdilene sekce lze editovat se specialnim opravnenim gin_usteditor=10)
         * Uzamknute sekce nelze prepsat uzivatelskou konfiguraci (lze lokalne, lze i ulozit, ale pri nacteni se ignoruji). Komponenty by mely reagovat jiz pri pokusu o ulozeni
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @returns {boolean} zda je sekce uzamknuta, ci nikoliv
         */
        isLocked(key: StorageKey): boolean

        /**
         * Vrati informaci, zda je instance korenoveho Storage (=false) nebo jen StorageSection (=true)
         */
        isVirtual(): boolean

        /**
         * Vrati objekt GStor navazany na nejakou podrizenou vetev hlavni konfigurace
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {Object} [defaults={}] vychozi hodnota objektu v pripade, ze [name] neexistuje nebo neni typu object
         */
        sub(key: StorageKey, defaults?: Object): IGStorage

        /**
         * vyvola pozadavek na ulozeni zmen. Ukladaci metoda se zavola podle casovych pravidel (se zpozdenim, s mechanismem proti pretizeni) ukladaciho delegata. Tato metoda se vola tumaticky pokud je zapnuty autoSave
         * @param {boolean} [immediate=false] zda se ma ulozeni provest okamzite, nebo se podridit casovym pravidlum
         */
        save(immediate?: boolean): this
    }

    interface StorageSettings {
        virtual?:boolean
        autoSave: boolean
        save: (data: Object, partial: boolean) => (void | JQueryPromise<any>)                       // ukladaci funkce
        traceChanges: boolean                 // zapnuti sledovani zmen (set, merge, remove, ... zacnou plnit dirtyBranches + dirtySaved
        dirtyBranches: string[]                   // seznam vetvi a hodnot GStor, ve kterych doslo ke zmenam
        saveWaiting: number                   // [ms] vyckavaci cas od posledniho zavolani save po vyvolani ulozeni 
        saveDelay: number                     // [ms] nejkratsi cas kdy je bude mozne odeslat opakovany request na ulozeni (zabranuje pretizeni serveru pri castych zmenach ulozenych hodnot)
    }

    /**
     * Uloziste strukturovanych dat (JSON objektu) pro jednodussi pristup a rozsirene funkce nad hodnotami
     */
    class Storage implements IGStorage {
        constructor(initData?: Object, settings?: StorageSettings)
        /**
         * odkaz na root GStor (pro root GStor obsahuje this)
         * @type {IGStorage}
         */
        rootStor: IGStorage;

        /**
         * cesta v rootStor, ktera je rootem tohoto GStor
         * @type {string}
         */
        rootSection: string; 

        /**
         * nastaveni hodnoty, vcetne zanorenych vlastnosti (napr:"foo.bar" => { foo: { bar: null } })
         *
         * @param {StorageKey} key napr:"foo.bar", nebo ["foo", "bar"]
         * @param {any} value hodnota vlastnosti
         */
        set(key: StorageKey, value: any): this

        /**
         * ziskani hodnoty ze zanorenych vlastnosti (napr:"foo.bar")
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {boolean} [makeCopy=false] (default=false) zda se ma udelat deepcopy vracenych dat (=true) nebo se muze vratit instance ze Stor (=false)
         * @returns {any} hodnota, nebo undefined pokud neexistuje
         */
        get(key?: StorageKey, makeCopy?: boolean): any

        /**
         * ziskani hodnoty ze zanorenych vlastnosti (napr:"foo.bar") s moznosti vraceni vychozi hodnoty, pokud hledana hodnota je undefined
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {T} defaultValue
         */
        getDef<T>(key: StorageKey, defaultValue: T): T

        /**
         * obohati predany objekt o hodnoty ulozene v ulozisti, zadne nove nepridava
         * @param {object} applyTo objekt, ktery se obohacuje
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {boolean} [includeNewOnes=false] (default=false) zda se maji pridat i nove vlastnosti (true), ci pouze aktualizovat stavajici (false)
         */
        apply(applyTo: object, key: StorageKey, includeNewOnes?: boolean): object

        /**
         * smazani hodnoty zanorene vlastnosti (napr:"foo.bar")
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         */
        remove(key: StorageKey): this

        /**
         * smazani vsech podrizenych vlastnosti specifickeho objektu (napr:"foo.bar") - NULL/undef pro vymazani vsech svych children
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         */
        clear(key: StorageKey): this

        /**
         * Slouci predany objekt s konkretni pozici v ulozisti ($.extend, deepCopy)
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {Object[]} objects seznam vlastností k rozšíření, muze byt vic argumentu napr. merge("foo.bar", {...}, {...})
         */
        merge(key: StorageKey, ...objects: Object[]): this

        /**
         * vlozi do uloziste vychozi hodnoty objektu, ktere v ulozisti dosud nejsou (provadi deepcopy (this <- def <- currentValue))
         *   { x: 10, y: 10 }.defaults({x: 0, y: 0, z: 0}) => {x: 10, y: 10, z: 0}
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {Object} [defaults={}] <pre>(default={}) vychozi hodnota. Pokud je objekt, provadi se deepcopy. Pokud hodnotovy typ, provede se "set" v pripade, ze zadna hodnota neexistuje.
         *   Pokud je rozpor mezi ulozenym a predanym typem, predany typ ma prednost (slouzi i pro narovnani typu v ulozisti):
         *     { pozice: 300 }.defaults("pozice", {x:10, y:20}) => {pozice: {x:10, y:20}} )
         *     { pozice: { x:10, y: 20} }.defaults("pozice", 400) => {pozice: 400} )
         *     { form: 'mujForm' }.defaults("form.info", {title: ''}) => {form: {info: {title: ''}}}
         *   </pre>
         */
        defaults(key: StorageKey, defaults?: Object): this

        /**
         * Vrati priznak, zda dana sekce uloziste podleha zamku ze sdileneho obsahu (sdilene sekce lze editovat se specialnim opravnenim gin_usteditor=10)
         * Uzamknute sekce nelze prepsat uzivatelskou konfiguraci (lze lokalne, lze i ulozit, ale pri nacteni se ignoruji). Komponenty by mely reagovat jiz pri pokusu o ulozeni
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @returns {boolean} zda je sekce uzamknuta, ci nikoliv
         */
        isLocked(key: StorageKey): boolean

        /**
         * Vrati informaci, zda je instance korenoveho Storage (=false) nebo jen StorageSection (=true)
         */
        isVirtual(): boolean

        /**
         * Vrati objekt GStor navazany na nejakou podrizenou vetev hlavni konfigurace
         * @param {StorageKey} key klic v konfiguraci napr:"foo.bar", nebo ["foo", "bar"]
         * @param {Object} [defaults={}] vychozi hodnota objektu v pripade, ze [name] neexistuje nebo neni typu object
         */
        sub(key: StorageKey, defaults?: Object): IGStorage

        /**
         * vyvola pozadavek na ulozeni zmen. Ukladaci metoda se zavola podle casovych pravidel (se zpozdenim, s mechanismem proti pretizeni) ukladaciho delegata. Tato metoda se vola tumaticky pokud je zapnuty autoSave
         * @param {boolean} [immediate=false] zda se ma ulozeni provest okamzite, nebo se podridit casovym pravidlum
         */
        save(immediate?: boolean): this

        isDirty(): boolean
        getDirtyStructure(): object

        static resolve(sub, context?:any, opts?:any): Storage;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\ggrid.d.ts 

//////////////////////////////////////////////////////////////////////////
// GGrid
//////////////////////////////////////////////////////////////////////////

/**
 * GGrid
 * @author TSkala
 * @date 2018-03-14
 */
declare class GGrid<TRow> {
    /**
     * Vrátí informace o označeném řádku/buňce - item a col : number nebo item {row: number, col:number} 
     * Nastavi aktivni radek podle indexu item - item a col : number nebo item {row: number, col:number}
     * Nastavi aktivni radek/bunku
     * Nastavi vybrany radek/bunku
     * @param {number|JQuery|Element|CellCoords} item  Index řádku
     * @param {number} col Index sloupce
     * @returns {CellInfo} Informace o buňce
     * @author TSkala
     * @date 2018-03-14
     */
    activeCellAddress(item?: number | JQuery | Element | CellCoords, col?: number): CellInfo<TRow>;

    /**
     * Označí řádek podle primárního klíče/instance dat - keyObj musí být instance metadat, dat, objekt klíčů ({ ixs: "0000AKE00000" }), nebo seznam klíčů (.ggrid("activeRow", "0000AKE00000"))
     * Vrátí data/meta aktuálního řádku keyObj musí být boolean - defaultně je false => data, jinak metadata
     * @param {TRow|MetaRow|ObjectLiteral|string} keyObj instance metadat, dat, objekt klicu ({ ixs: "0000AKE00000" }), nebo seznam klicu (.ggrid("activeRow", "0000AKE00000")) nebo příznak, zda chceme data nebo metadata
     * @param {boolean} meta  (default = false) zda ma getter vratit MetaRow misto Row
     * @returns {TRow|MetaRow|void} Data, metadata nebo nic (kdýž označím řádek podle primárního klíče/instance dat)
     * @author TSkala
     * @date 2018-03-14
     */
    activeRow(): TRow;  
    activeRow(meta: true): MetaRow<TRow>;  
    activeRow(keyObj: TRow | MetaRow<TRow> | ObjectLiteral<any> | string): TRow | null;

    /**
     * TODO
     * @param item
     * @param col
     * @param fullInfo
     * @author TSkala
     * @date 2018-03-14
     */
    cellInfo(item?: number | JQuery | Element | CellCoords, col?: number | boolean, fullInfo?: boolean): CellInfo<TRow> | null;

    /**
     * Vrátí DATA vybraných záznamů (zdroje: schranka, checkboxy, selectedRow)
     * @param {boolean|undefined} meta (default = false) Zda se maji vratit primo datove objekty, nebo jejich metadata
     * @param {boolean|undefined} reduced (default = false) Reduced selection je pole EXPLICITNE vybranych hodnot. Napriklad pri multi=true se nebere v potaz oznaceny radek, ale jen checked/clipboard
     * @param {GGridSelectionOptions} options (default = { reduced: false, includeVirtual: false }) Podrobnejsi nastaveni, o jaky vyber stojime
     * @returns {TRow[]|MetaRow<TRow>[]|[]} Pole vybranych hodnot gridu
     * @author TSkala
     * @date 2018-03-14
     */
    getSelection(meta?: boolean, reduced?: boolean): TRow[];
    getSelection(meta: true, reduced?: boolean): MetaRow<TRow>[];
    getSelection(meta?: boolean, options?: GGridSelectionOptions): TRow[];
    getSelection(meta: true, options?: GGridSelectionOptions): MetaRow<TRow>[];

    /**
     * Vrati instanci TrueColumn pro vybrany identifikator (NULL pokud sloupec neni soucasti aktualniho TrueColumns)
     * @param {string | Element | JQuery} name Název sloupce nebo instance nektereho prvku uvnitr bunky
     * @returns Instance objektu z trueColumns nebo null
     * @author TSkala
     * @date 2018-03-14
     */
    getTC(name: string | Element | JQuery): null | GGridTrueColumn<TRow>;

    /**
     * Vrací view
     * @returns {Gordic.Data.View} View z gridu
     * @author TSkala
     * @date 2018-03-14
     */
    getView(): Gordic.Data.View<TRow>;

    /**
     * Označí řádek v gridu
     * @param {CellCords} coords Souřadnice, v případě, že nejsou uvedeny, tak metoda vrací CellInfo označeného řádku
     * @returns {CellInfo|null|void} Informace o označeném řádku, null když není označen a void jestliže je metoda volaná s argumentem
     * @author TSkala
     * @date 2018-03-15
     */
    mark(coords?: CellCoords): CellInfo<TRow> | null | void;

    /**
     * Pohyb po gridu
     * TODO
     * @param direction
     * @param options
     * @returns {CellInfo<TRow> | null} Informace o řádku
     * @author TSkala
     * @date 2018-03-15
     */
    navigate(direction, options): CellInfo<TRow> | null;

    /**
     * Vlastnosti gridu
     * @author TSkala
     * @date 2018-03-15
     */
    options: GGridOptions<TRow>;

    /**
     * Refresh celeho obsahu (containeru vcetne hlavickoveho radku)
     * TODO
     * @param defaultSelect
     * @author TSkala
     * @date 2018-03-15
     */
    refresh(defaultSelect?);

    /**
     * TODO
     * @param rowInfo
     * @author TSkala
     * @date 2018-03-15
     */
    refreshRow(rowInfo);

    /**
     * TODO
     * @param quickRender
     * @param trueColumns
     * @author TSkala
     * @date 2018-03-15
     */
    refreshRows(quickRender?, trueColumns?);

    /**
    * TODO
    * @param expression
    * @param fill
    * @author TSkala
    * @date 2018-03-15
    */
    search(expression, fill);

    /**
    * TODO
    * @param data
    * @param autoRefresh
    * @author TSkala
    * @date 2018-03-15
    */
    setData(data, autoRefresh);

    /**
     * TODO
     * @param sortDefinition
     * @param refreshRows
     * @author TSkala
     * @date 2018-03-15
     */
    sort(sortDefinition, refreshRows);

    /**
     * Vrati skutecne zobrazene sloupce s dopocitanymi vlastnostmi pro render
     * @param refresh (default=true) zda se maji vratit posledni/aktualne pouzity seznam sloupcu (false), nebo se ma spocitat novy seznam (true).
     * V pripade hodnoty true a neexistujici definice se vypocet provede (ale nezapamatuje).
     * @author {boolean} TSkala
     * @date 2018-03-15
     */
    trueColumns(refresh?: boolean);

}

interface GGridColumnEditorOption<T=any> extends Partial<Gordic.Forms.FormField<T>> {

    gridEvents?: { [key: string]: JQueryEventListener };
}
type GGridColumnType = "unknown" | "number" | "currency" | "boolean" | "text" | "icon" | "select" | "datetime" | "links" | "tree";
type GGridColumnAlign = "left" | "center" | "right"; 

type GGridColumnPropertyPresets<T extends keyof GGridColumn<TRow>, TRow=any> = ObjectLiteral<Pick<GGridColumn<TRow>, T> & { _presetCaption: string }>;

interface GGridColumnGrouping<TRow> {
    aggregate?: Gordic.Data.GroupingDefinition<TRow>["aggregate"];
    captionTemplate?: string | ((row: TRow, meta?: MetaRow<TRow>) => (string | JQuery));
    captionText?: ((meta: MetaRow<TRow>) => string);
    hash?: Gordic.Data.GroupingDefinition<TRow>["hash"];
    hideColumn?: boolean;
    includeEmpty?: boolean;
    defaultState?: Gordic.Data.GroupingDefinition<TRow>["defaultState"];
    sort?: string;
    sortOrder?: Gordic.Data.Sorting.SortDescriptor<TRow>;
    sortOrderDesc?:  Gordic.Data.Sorting.SortDescriptor<TRow>;
    multiLevel?: Pick<GGridColumnGrouping<TRow>, "captionTemplate" | "captionText" | "hash" | "includeEmpty" | "defaultState" | "sortOrder" | "sortOrderDesc">[];
}

interface GGridTrueColumn<TRow> extends Omit<GGridColumn<TRow>,'cellTemplate'|'formula'> {
    cellTemplate: Extract<GGridColumn<TRow>['cellTemplate'], Gordic.Templates.IGTemplateRenderer>
    formula?: {formula:string}
}

interface GGridGroupingHeaderColumn<TRow> extends GGridTrueColumn<TRow> {
    originalColumn: GGridTrueColumn<TRow>;
}

interface GGridColumn<TRow = any> {
    name?: string;
    columnType?: GGridColumnType;
    field?: string| null; // default=name
    fragment?: string; 
    scope?: string;
    group?: string; 
   // dataType?: any;// "string" | "number" | "JsonDate" | "JsonDecimal" | "boolean"; //tady správný typ být asi nemůže :/
    index?: number;
    virtualCssClass?: string;
    sysColumn?: boolean;
    forced?: boolean; 
    hidden?: boolean; 

    caption?: string;
    description?: string;
    headerMenu?: string | null;
    contextMenu?: null;
    headerTemplate?: Gordic.Templates.IGTemplate<(column?: GGridColumn<TRow>, cellInfo?: CellTemplateInfo<TRow>) => (string | JQuery | HTMLElement)> | null;
    cellTemplate?: Gordic.Templates.IGTemplate<(row: TRow, meta?: MetaRow<TRow>, cellInfo?: CellTemplateInfo<TRow>) => (string | JQuery | HTMLElement)>; // default={field:format}
    tooltipTemplate?: Gordic.Templates.IGTemplate<(row: TRow, meta?: MetaRow<TRow>, cellInfo?: CellTemplateInfo<TRow>) => (string | JQuery | HTMLElement)>;
    scrollHelperTemplate?: Gordic.Templates.IGTemplate<(row: TRow, meta?: MetaRow<TRow>, moreInfo?: object) => (string | JQuery | HTMLElement)>;
    /** Export options for column:
     *  true - use field/name value.
     *  false/null - column will not be printed
     *  '#render' - use cellTemplate or iconTemplate( if columnType === icon ) - must return string - not JQuery
     *  function - custom print function.
     *  */
    printable?: boolean | null | '#render' | ((row: TRow, meta?: MetaRow<TRow>) => string | number | undefined)
    printableOptions?: Partial<Gordic.Data.Exports.IGColumnOptions>;
    structureLead?: boolean;
    searchFields?: string[];

    align?: GGridColumnAlign;
    aggregate?: Gordic.Data.GroupingDefinition<TRow>["aggregate"];
    aggregateSymbol?: string;
    aggregatePreset?: string | null; 
    aggregates?: GGridColumnPropertyPresets<"aggregate" | "aggregateSymbol"> | null;
    customClass?: string | ((meta: MetaRow<TRow>, column: GGridTrueColumn<TRow>, rowIndex: number, colIndex: number) => string);
    format?: string;
    formatPreset?: string | null; 
    formats?: GGridColumnPropertyPresets<"format" | "cellTemplate" | "width" | "fixedWidth"> | null;
    /** [px] */
    width?: number;
    fixedWidth?: boolean;
    minWidth?: number | null;
    maxWidth?: number | null;

    sortable?: boolean; // default true
    sortOrder?:  Gordic.Data.Sorting.SortDescriptor<TRow>; // puvodne any - necham to projit BS
    sortOrderDesc?:  Gordic.Data.Sorting.SortDescriptor<TRow>; // puvodne any - necham to projit BS
    sortDefDirRevert?: boolean; // výchozí směr třídění

    grouping?: GGridColumnGrouping<TRow> | null;
    groupingPreset?: string | null;
    groupings?: GGridColumnPropertyPresets<"grouping", TRow> | null;

    filter?: Gordic.Data.Filters.IGGridFilterVariant<TRow>[] | null;
    filterVariant?: string;

    editor?: GGridColumnEditorOption<any> | ((editorContext: { cellInfo: CellInfo<TRow> }) => (GGridColumnEditorOption<any> | null | undefined)) & ThisType<HTMLElement>;

    iconTemplate?: Gordic.Templates.IGTemplate<(row: TRow, meta?: MetaRow<TRow>, cellInfo?: CellTemplateInfo<TRow>) => (IconTemplate | null | undefined)>;
    maxLength?: number; // P.Novak - delka slova
    serverFilter?: Gordic.Forms.FormField<any>;  // B.Martinek - dvojradek

    /** 
     *  OBSOLETE - už nefunguje, použijte profily
     * @deprecated použijte profily
     */
    visible?: boolean;  // OBSOLETE

    wordSequence?: number; // P.Novak - poradi slova dle CFS

    formula?: string | {formula:string}; // userColumns formula
    requires?: string[];

    displayCaption?: string;
}

interface GGridLinksColumn<TRow> extends GGridColumn<TRow> {
    links?: MenuParams[] | ((row: TRow, meta: MetaRow<TRow>)=>MenuParams[])
}

interface IGGridFilterValue<TValue=any> {
    value: TValue,
    isNegative?: boolean,
    variantId: string
}



interface GridProfile<TRow> {
    name?: string;
    _default?: boolean; 
    _locked?: boolean;
    _primary?: boolean;

    columns?: ObjectLiteral<GGridColumn<TRow> & {
        filterValue?: IGGridFilterValue;
    }>;

    columnList?: string;

    sort?: string | null;
    grouping?: string | null;
    searchText?: string | null;
    rowNumbers?: boolean;
    rowDelimeters?: boolean;
    filterVisible?: boolean;
    /** Podmíněné formátování */
    condFormats?: Gordic.Components.Grid.CondFormats.CondFormat[] | null;
    [key: string]: any;
}

interface CellCoords {
    col?: number | null;
    row: number;
}

interface CellInfo<TRow> extends CellCoords {
    data: TRow,
    meta: MetaRow<TRow>,
    rowDOM?: HTMLElement | null,
    cellDOM?: HTMLElement | null,
    column?: GGridColumn<TRow>,
    _isFullInfo?: boolean

}

interface CellTemplateInfo<TRow> {
    cell: HTMLElement;
    column: GGridColumn<TRow>;
    columnIndex: number;
    init: boolean;
    rowIndex: number;
}

interface IGGridCellContext<TRow> {
    /** informace o buňce/řádku k němuž se kontextové menu přímo váže */
    cellInfo: any
    /** seznam aktuálně vybraných řádků v gridu, k nimž se kontextové menu váže  */
    selection: TRow[]
    /** Zda je cellInfo (aktuální řádek) součástí výběru selection */
    outOfSelection: boolean
}

interface IGGridSelection<TRow> {
    /**
     * Pocet vybranych radku
     * @type {number}
     */
    count: number;

    /**
     * Original DataView
     * @type {Gordic.Data.View<TRow>}
     */
    view: Gordic.Data.View<TRow>;

    /**
     * vrati DATA vybranych zaznamu (zdroje: schranka, checkboxy, selectedRow)
     * @param {boolean} meta (default=false) zda se maji vratit primo datove objekty, nebo jejich metadata
     * @param {boolean} reduced (default=false) reduced selection je pole EXPLICITNE vybranych hodnot. Napriklad pri multi=true se nebere v potaz oznaceny radek, ale jen checked/clipboard
     * @returns {TRow[]} pole vybranych hodnot gridu
     */
    getSelection(meta?: boolean, reduced?: boolean): TRow[];
    getSelection(meta: true, reduced?: boolean): MetaRow<TRow>[];

}
interface GGridSelectionOptions {
    /**
     * Reduced selection je pole EXPLICITNE vybranych hodnot.Napriklad pri multi = true se nebere v potaz oznaceny radek, ale jen checked / clipboard
     * @type {boolean}
     */
    reduced?: boolean,

    /**
     * zda chceme do vysledneho selection pridavat explicitne i virtualni radky (souctove radky, editory, zahlavi seskupeni, apod.). Pokud je false, virtualni radky se v selection neobjevi, v pripade multi=true se ale v selection mohou objevit radky vybrane skupiny
     * @type {boolean}
     */
    includeVirtual?: boolean
}

interface GGridOptions<TRow> {
    customClass?: string;
    virtualCssClass?: string;
    name?: string; 

    columns?: GGridColumn<TRow>[] | Gordic.Data.GridFormat<TRow>;
    data?: TRow[] | Gordic.Data.View<TRow>;
    dataKey?: Gordic.Data.ViewKeys<TRow>;
    searchColumns?: "*" | string[]; 
    searchEngine?: Gordic.Data.Filtering.BaseResolver | ((trueColumns: GGridColumn<TRow>[]) => Gordic.Data.Filtering.BaseResolver | null) | null;

    rowHeight?: number;
    rowIndent?: number; 
    renderMode?: "auto" | "all-at-once" | "paged-sync" | "paged-async";
    renderOverhead?: number;
    columnMode?: "fit" | "full";

    navigationMode?: "row" | "cell";
    multi?: boolean;
    multiMenu?: MenuParams[];
    rowsChecked?: string;
    rowsCheckEnabled?: ((row: MetaRow<TRow>) => boolean) | null;
    rowsCheckVisible?: ((row: MetaRow<TRow>) => boolean) | null;
    rowsEnabled?: boolean | ((row: MetaRow<TRow>, trueColumns: GGridTrueColumn<TRow>[], rowIndex: number) => boolean) | string | null;
    rowsClass?: string | ((row: MetaRow<TRow>, trueColumns: GGridTrueColumn<TRow>[], rowIndex: number) => string) | null;
    defaultAction?: GAction;
    allowDefaultActionForVirtual?: boolean;
    scrollHelperTemplate?: string | ((row: TRow, metarow: MetaRow<TRow>) => string) | null; // bylo any necham na BS
    marking?: boolean;
    filtering?: boolean;
    contextMenu?: MenuParams[] | ((cellContext: IGGridCellContext<TRow>) => (MenuParams[]|null|void)) | null;
    groupingHeaderColumns?: ObjectLiteral<GGridColumn<TRow>>;

    userSettings?: string | false | Gordic.Data.IGStorage;
    profileVisible?: boolean;
    defaultProfile?: GridProfile<TRow>;
    profiles?: GridProfile<TRow>[];

    profileBeforeChange?: JQueryEventListener1<{ currentProfile: GridProfile<TRow>, expectedProfile: GridProfile<TRow>, newBaseProfile: GridProfile<TRow>, newDiffProfile: GridProfile<TRow> }>;
    profileCustomApply?: JQueryEventListener1<{ profile: GridProfile<TRow>, scope: "full" | "change", changes: GridProfile<TRow>, processors: ObjectLiteral<Gordic.Data.BaseProcessor|null>, requestFullRefresh: (() => void), refreshDelegates: ((ctx: { fullRefresh: boolean }) => void)[] }>;
    profileCustomConfig?: JQueryEventListener1<{ profile: GridProfile<TRow>, configForms: Gordic.Forms.Form[], content: object }>;
    profileChange?: JQueryEventListener1<{ oldProfile: GridProfile<TRow>, profile: GridProfile<TRow> }>;

    showTopPanel?: boolean;
    showHeaderRow?: boolean;
    showBottomPanel?: boolean;
    emptyMessage?: string;

    cellActivate?: JQueryEventListener1<{ cellInfo: CellInfo<TRow>, originalCellInfo: CellInfo<TRow>, view: Gordic.Data.View<TRow> }>;
    selection?: JQueryEventListener1<IGGridSelection<TRow>>;
    defaultExecute?: JQueryEventListener1<{ cellInfo: CellInfo<TRow>, view: Gordic.Data.View<TRow> }>;
    mark?: JQueryEventListener1<{ cellInfo: CellInfo<TRow> }>;

    exportOptions?: false | JQueryEventListener1<{ settings: Gordic.Data.Exports.IGExportDialogSettings }>;
    beforeExport?: JQueryEventListener1<{ data: Gordic.Data.Exports.IGDataExportInput, settings: Gordic.Data.Exports.IGExportDialogSettings }>;
    exportStrategies?: Gordic.Data.Exports.IGDataExportStrategy[];

    // WIDGETFACTORY
    create?: null;
    disabled?: boolean;
    //name?: string

    /** @deprecated OBSOLETE - ignoruje se**/
    rowNumbers?: boolean;
    sort?: string;
}





interface JQuery {
    // WIDGET UNIVERSAL
    ggrid<TRow=any>(...options: GGridOptions<TRow>[]): this
    ggrid<TRow=any>(method: "instance"): GGrid<TRow>;
    ggrid<TRow=any>(method: "option"): GGridOptions<TRow>;
    ggrid<TRow=any, K extends Extract<keyof GGridOptions<TRow>, string> = Extract<keyof GGridOptions<TRow>, string>>(method: "option", key: K): GGridOptions<TRow>[K];
    ggrid<TRow=any, K extends Extract<keyof GGridOptions<TRow>, string> = Extract<keyof GGridOptions<TRow>, string>>(method: "option", key: K, value: Required<GGridOptions<TRow>>[K]): JQuery;
    ggrid<TRow=any>(method: "option", value: Partial<GGridOptions<TRow>>): this;
    ggrid(method: "destroy");


    ggrid<TRow=any>(method: "getView"): Gordic.Data.View<TRow>
    ggrid<TRow=any>(method: "setData", data: TRow[] | Gordic.Data.View<TRow>, autorefresh: boolean): Gordic.Data.View<TRow>
    ggrid<TRow=any>(method: "setData", data: TRow[] | Gordic.Data.View<TRow>, profile?: null | GridProfile<TRow>): Gordic.Data.View<TRow>
    ggrid<TRow=any>(method: "internalActions"): GActionList;
    ggrid<TRow=any>(method: "focus"): this;

    ggrid<TRow=any>(method: "useProfile", profile?: GridProfile<TRow> | string): this;
    ggrid<TRow=any>(method: "refreshProfile"): this;
    ggrid<TRow=any>(method: "profileChanges", changes: GridProfile<TRow>): this;
    ggrid<TRow=any>(method: "setFavoriteProfile", profile: GridProfile<TRow> | string): this;
    ggrid<TRow=any>(method: "getCurrentProfile"): GridProfile<TRow>;
    ggrid<TRow=any>(method: "getProfiles"): GridProfile<TRow>[];
    ggrid<TRow=any>(method: "removeProfile", id: GridProfile<TRow> | string, userInteraction?: boolean): JQueryPromise<void>;
    ggrid<TRow=any>(method: "saveProfile", profile: GridProfile<TRow>, userInteraction?: boolean): JQueryPromise<GridProfile<TRow>>;
    ggrid<TRow=any>(method: "configProfile", profile: null | GridProfile<TRow>, userProfile?: boolean): JQuery;

    ggrid<TRow=any>(method: "search", expression?: string): this;
    ggrid<TRow=any>(method: "statusWidget", id: string): JQuery;
    ggrid<TRow=any>(method: "mark"): CellInfo<TRow>;
    ggrid<TRow=any>(method: "mark", coords: number | JQuery | Element | CellCoords): this;
    ggrid<TRow=any>(method: "sort", sort: string): this;
    ggrid<TRow=any>(method: "group", grouping: string): this;

    ggrid<TRow = any>(method: "setErrors", errors: Gordic.Validators.GridError[], groups?: string | string[]): this;
    ggrid<TRow = any>(method: "getErrors", groups?: string | string[]): Gordic.Validators.GridError[];
    ggrid<TRow=any>(method: "refreshErrors"): this;

    /**
     * vrati DATA vybranych zaznamu (zdroje: schranka, checkboxy, selectedRow)
     * @param meta {boolean} zda se maji vratit primo datove objekty, nebo jejich metadata
     * @param reduced {boolean} reduced selection je pole EXPLICITNE vybranych hodnot. Napriklad pri multi=true se nebere v potaz oznaceny radek, ale jen checked/clipboard
     * @returns {object[]} pole vybranych hodnot gridu
     */
    ggrid<TRow=any>(method: "getSelection", meta?: false, reduced?: boolean): TRow[]
    ggrid<TRow=any>(method: "getSelection", meta: true, reduced?: boolean): MetaRow<TRow>[];
    ggrid<TRow=any>(method: "activeCellAddress", item?: number | JQuery | Element | CellCoords | null, col?: number | null): CellInfo<TRow>
    ggrid<TRow=any>(method: "activeRow", meta?: false): TRow;        
    ggrid<TRow=any>(method: "activeRow", meta: true): MetaRow<TRow>;
    ggrid<TRow=any>(method: "activeRow", keyObj: TRow | MetaRow<TRow> | ObjectLiteral<any>, col?: number | string): TRow |null;
    ggrid<TRow=any>(method: "activeRow", key1: Exclude<Primitive, boolean>, key2?: Primitive, key3?: Primitive): TRow |null;        

    ggrid<TRow = any>(method: "getTC", columnName?: string | number | Element | JQuery): GGridTrueColumn<TRow>;
    ggrid<TRow=any>(method: "cellInfo", item?: number | JQuery | Element | CellCoords, col?: number | boolean, fullInfo?: boolean): CellInfo<TRow> | null;
    ggrid<TRow = any>(method: "trueColumns", refresh?: boolean): GGridTrueColumn<TRow>[];
    ggrid<TRow=any>(method: "fitV"): this;
    ggrid(method: "refresh", defaultSelect?: any): void;
    ggrid(method: "refreshRows", quickRender?: boolean): this;
    ggrid(method: "refreshRow", rowInfo: JQuery | HTMLElement | number): this;
    ggrid<TRow=any>(method: "refreshRow", rowInfo: CellInfo<TRow>): this;
}


declare namespace Gordic {
    namespace Data {
        class GridFormat<TRow = any> {
            constructor(preset?: GGridColumn<TRow>);
            columns: GGridColumn<TRow>[];
            add(gridColumn: GGridColumn<TRow> | GGridColumn<TRow>[] | GridFormat<TRow>): this;
            addNumberColumn(gridColumn: GGridColumn<TRow> & { dataType?: "number" }): this;
            addDecimalColumn(gridColumn: GGridColumn<TRow> & { dataType?: "number" | "JsonDecimal" }): this;
            addCurrencyColumn(gridColumn: GGridColumn<TRow> & { dataType?: "number" | "JsonDecimal" }): this;
            addDateColumn(gridColumn: GGridColumn<TRow> & { dataType?: "JsonDate" }): this;
            addDateTimeColumn(gridColumn: GGridColumn<TRow> & { dataType?: "JsonDate" }): this;
            addBooleanColumn(gridColumn: GGridColumn<TRow> & { dataType?: "boolean" }): this;
            addTextColumn(gridColumn: GGridColumn<TRow> & { dataType?: "string" }): this;
            addHtmlColumn(gridColumn: GGridColumn<TRow>): this;
            addIconColumn(gridColumn: GGridColumn<TRow>): this;
            addStructureColumn(gridColumn: GGridColumn<TRow>): this;
            addLinksColumn(gridColumn: GGridLinksColumn<TRow>, shrink?: boolean): this;
            get(columnName: string): GGridColumn<TRow>/* | null*/;  // TODO: muze vratit NULL kdyz tam nebude, ale radeji zmenit az bude cas opravovat vsechny chyby
            get(columnIndex: number): GGridColumn<TRow> | null;
            remove(columnName: string): this;
            remove(columnIndex: number): this;
            setPreset(preset: GGridColumn<TRow> | null): this;
            setAllColumns(preset: GGridColumn<TRow>, predicate?: ((column: GGridColumn<TRow>) => boolean)): this;
            indexOf(columnName: string): number;
            lastColumn(): GGridColumn<TRow> | null; 

            static Formats: {
                number<TRow=any>(): GGridColumn<TRow>["formats"]; 
                currency<TRow=any>(): GGridColumn<TRow>["formats"]; 
                text<TRow=any>(): GGridColumn<TRow>["formats"]; 
                icon<TRow=any>(): GGridColumn<TRow>["formats"]; 
                boolean<TRow=any>(): GGridColumn<TRow>["formats"]; 
                date<TRow=any>(): GGridColumn<TRow>["formats"]; 
                datetime<TRow=any>(): GGridColumn<TRow>["formats"]; 
            }; 

            static Aggregates: {
                number<TRow=any>(fieldName: string): GGridColumn<TRow>["aggregates"];
                currency<TRow=any>(fieldName: string): GGridColumn<TRow>["aggregates"];
                datetime<TRow=any>(fieldName: string): GGridColumn<TRow>["aggregates"];
                text<TRow=any>(fieldName: string): GGridColumn<TRow>["aggregates"];
                boolean<TRow=any>(fieldName: string): GGridColumn<TRow>["aggregates"];
            }

            static Groupings: {
                default<TRow = any>(fieldName: string): GGridColumn<TRow>["groupings"];
                currency<TRow = any>(fieldName: string): GGridColumn<TRow>["groupings"];
                datetime<TRow = any>(fieldName: string): GGridColumn<TRow>["groupings"];
                text<TRow = any>(fieldName: string): GGridColumn<TRow>["groupings"];
            }
        }
    }
    namespace Components {
        /**
         * Grid Remote Control. Can navigate in grid.
         * @author VMaca
         */
        interface GridRC<TRow> {
            /**
             * Moves in grid in desired direction.
             * @param {boolean} moveNext Whether grid should move to next row or previous row.
             */
            move: (moveNext: boolean) => GridRCState<TRow>
            /**
             * Returns current state or moves to given row
             * @param {CellInfo<TRow>|CellCoords} [row] Row to move to.
             */
            current: (row?: CellInfo<TRow> | CellCoords) => GridRCState<TRow>
        }
        /**
        * Represents current state of grid
        * @author VMaca
        */
        interface GridRCState<TRow> {
            /**
            * Current row in grid.
            */
            currentRow: CellInfo<TRow>
            /**
            * Previous row in grid.
            */
            prevRow: CellInfo<TRow>
            /**
            * Next row in grid.
            */
            nextRow: CellInfo<TRow>
        }

        interface GridRCConstructor<TRow> {
            new(gridElement: JQuery): GridRC<TRow>;
        }

        const GridRC: GridRCConstructor<any>;
    }

    namespace Filters {
        type CreateProcessorFunc<TValue=any, TRow=any> = (tc: GGridColumn<TRow>, formValue: TValue, opts?: IGFilterExtraOpts<TRow>) => (Gordic.Data.BaseProcessor<TRow> | ((row: MetaRow<TRow>) => boolean));
        interface IGFilterExtraOpts<TRow> {
            rowToValue?: (row: MetaRow<TRow>) => any,
            fieldName?: string
        }

        interface GFilterValueDto {
            value?: any | null;
            valueList?: any[] | null;
            isNull?: boolean;
            isNegative?: boolean;
        }

        interface IGFilterOptions<TRow = any, TValue extends GFilterValueDto = GFilterValueDto> {

            form: (tc: GGridColumn<TRow>, rows: MetaRow<TRow>) => Gordic.Forms.Form;
            createProcessor: CreateProcessorFunc<TValue,TRow>;
            itemTemplate: (tc: GGridColumn<TRow>, formValue) => JQuery | HTMLElement | string | void;
        }

        interface IGExtendedFilterOptions<TRow = any, TValue extends GFilterValueDto = GFilterValueDto> extends IGFilterOptions<TRow, TValue> {

            /** This method adds field, which fills value property into filterValueDto. */
            addValueField?: (form: Gordic.Forms.Form, tc: GGridColumn<TRow>, rows: MetaRow<TRow>) => void

            /** This method adds field, which fills valueList property into filterValueDto. */
            addValueList?: (form: Gordic.Forms.Form, tc: GGridColumn<TRow>, rows: MetaRow<TRow>) => void

            /** This method obtains data for valueList field */
            getValueListData?: (tc: GGridColumn<TRow>, rows: MetaRow<TRow>) => Gordic.Data.View
            /** This method return template form item of valueList field */
            getValueListTemplate?: (tc: GGridColumn<TRow>) => ((distinctRow: TRow) => JQuery | HTMLElement | string | void) | null;
            /** 
             * This method creates processor which filters rows according to valueList property of filterValueDto. 
             * Returns null if there is no valueList 
             * */
            createValueListProcessor?: CreateProcessorFunc<TValue, TRow>;
            /** This method creates processor which filters rows according to value property of filterValueDto */
            createValueProcessor?: CreateProcessorFunc<TValue, TRow>;
        }

        namespace defaults {
            function addValueNormalizer(form: Gordic.Forms.Form): void
            function addNegativeFilterSwitch(form: Gordic.Forms.Form): void
            function addValueList<TRow = any>(form: Gordic.Forms.Form, tc: GGridColumn<TRow>, rows: MetaRow<TRow>, opts): void

            function getValueListData(tc, rows, opts): Gordic.Data.View<any>
            function getValueListDataAsRowParts<TRow = any>(tc: GGridColumn<TRow>, rows: MetaRow<TRow>, opts): Gordic.Data.View<Partial<TRow>>

            function createProcessor<TValue, TRow>(...params: Parameters<CreateProcessorFunc<TValue, TRow>>): ReturnType<CreateProcessorFunc<TValue, TRow>>;
            function createValueListProcessor<TValue, TRow>(...params: Parameters<CreateProcessorFunc<TValue, TRow>>): ReturnType<CreateProcessorFunc<TValue, TRow>>;

            function renderValue(field: string, template: Gordic.Templates.IGTemplateRenderer, value): void
            function itemTemplate(form: Gordic.Forms.Form): void
            function itemTemplateForFactors(form: Gordic.Forms.Form): void
            function itemTemplateForRanges(form: Gordic.Forms.Form): void

        }

        /**
         * Default filter, which has no value field nor valueList field, but is easy to complete few methods to make it work.
         * @param fieldName
         */
        function defaultFilter<TRow = any, TValue extends GFilterValueDto = GFilterValueDto>(fieldName: string): IGExtendedFilterOptions<TRow, TValue>

        /**
         * function text<TRow = any, TValue extends GFilterValueDto = GFilterValueDto>
         * 
         * @param {string} fieldName
         * @returns {IGExtendedFilterOptions<TRow}
         */
        function text<TRow = any, TValue extends GFilterValueDto = GFilterValueDto>(fieldName: string): IGExtendedFilterOptions<TRow, TValue>
        function textWithList<TRow = any, TValue extends GFilterValueDto  = GFilterValueDto>(fieldName: string): IGExtendedFilterOptions<TRow, TValue>

        function number<TRow = any, TValue extends GFilterValueDto = GFilterValueDto>(fieldName: string): IGExtendedFilterOptions<TRow, TValue>
        function numberWithList<TRow = any, TValue extends GFilterValueDto = GFilterValueDto>(fieldName: string): IGExtendedFilterOptions<TRow, TValue>

        function currency<TRow = any, TValue extends GFilterValueDto = GFilterValueDto>(fieldName: string): IGExtendedFilterOptions<TRow, TValue>
        function currencyWithList<TRow = any, TValue extends GFilterValueDto = GFilterValueDto>(fieldName: string): IGExtendedFilterOptions<TRow, TValue>

        function datetime<TRow = any, TValue extends GFilterValueDto = GFilterValueDto>(fieldName: string): IGExtendedFilterOptions<TRow, TValue>
        function datetimeWithList<TRow = any, TValue extends GFilterValueDto = GFilterValueDto>(fieldName: string): IGExtendedFilterOptions<TRow, TValue>

        function boolean<TRow = any, TValue extends GFilterValueDto = GFilterValueDto>(fieldName: string): IGExtendedFilterOptions<TRow, TValue>
  
        function icon<TRow = any, TValue extends GFilterValueDto = GFilterValueDto>(fieldName: string): IGExtendedFilterOptions<TRow, TValue>
    }

}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gwizardsimple.d.ts 

declare namespace Gordic {
    /**
     * Zjednodušený průvodce
     */
    namespace WizardSimple {
        /**
         * Předem připravený content
         * @param input vstupní objekt obsahující předaný content, titulek a definované kroky
         */
        function prepareContent(input: object): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\ginlinedialog.d.ts 

//////////////////////////////////////////////////////////////////////////
// ginlinedialog
//////////////////////////////////////////////////////////////////////////

interface IGInlineDialogOptions {
    /** Ovl. prvek, vuci kteremu se inlinedialog pozicuje */
    related?: JQuery;

    /** Sirka dialogu */
    width?: number|string;

    /** Vyska dialogu */
    height?: number | string;

    /** Minimalni sirka */
    minWidth?: number;

    /** Minimalni vyska */
    minHeight?: number;

    /** Maximalni sirka */
    maxWidth?: number;

    /** Maximalni vyska */
    maxHeight?: number;

    /** Pozice */
    position?: IGInlineDialogPosition;

    /** Efekt pro zobrazeni */
    showEffect?: JQueryUI.EffectOptions;

    /**  
     * Kam ma byt vlozen
     * @default "body"
     */
    appendTo?: string | HTMLElement | JQuery;

    /** Menubar */
    menuBar?: MenuParams[];

    /** Commandbar */
    commandBar?: MenuParams[];

    /** Seznam akci */
    actions?: GAction[] | GActionList;

    /** 
     * Ma se dialog automaticky zavrit, pokud ztrati focus?
     * @default false
     */
    autoClose?: boolean;

    /**
     * Vytvori dialog schovany
     * @default true
     * */
    createClosed?: boolean;

    /**
     * Tlacitko pro zavreni dialogu
     * @default existuje Sem by se nevesel :-)
     * */
    closeButton?: MenuParams | null;

    /** Vlastni CSS trida vlozena na wrapper dialogu */
    customClass?: string;

    /**
     * Ma byt inline dialog roztahovatelny tazenim mysi?
     * @type {boolean}
     * @default true
     */
    resizable?: boolean;

    /** Uzivatelske nastaveni */
    userSettings?: Gordic.Data.Storage;

    /** Nazev (pro dohledani uzivatelskeho nastaveni) */
    name?: string;

    /** Doba po kterou se ceka nez se zavre dialog po ztrate focusu
     * @default 100 milisekund
     * */
    closeDelay?: number;

    /** Po zmacknuti enter se chova stejne jako pri stisknuti tabulatoru */
    enterAsTab?: boolean;

    /** Ev. handler, ktery se vyvola po otevreni dialogu */
    open?: (ev: JQueryEventObject) => void;

    /** Ev. handler, ktery se zavola po zavreni dialogu */
    close?: (ev: JQueryEventObject, data?: { type: "ok" | "cancel", data?: any } | any) => void;

    /** Udalost volana pred vytvorenim menuBaru nebo commandbaru k upravam */
    internalMenu?: (ev: JQueryEventObject, data: {commandBar?: MenuParams[], menuBar?: MenuParams[]}) => void;

    /** z-index vlozeny na wrapper */
    zindex?: number;
}

interface IGInlineDialogPosition {
    /**
     * Prvek, vuci kteremu se ma pozicovat  
     * @default "related"
     * */
    of: string | HTMLElement | JQuery;
    /** 
     * Specifikace strany/rohu inlinedialogu
     * @default "left top"
     * */
    my: string;

    /**
     * Specifikace strany/rohu 'of'
     * @default "left bottom"
     * */
    at: string;

    /**
     * Hranicni element
     * @default window
     * */
    within: HTMLElement | JQuery

    collision?: string;
}

interface JQuery {
    ginlinedialog(options: IGInlineDialogOptions): JQuery;

    /** Zobrazi dialog */
    ginlinedialog(method: "open", $elm?: HTMLElement | JQuery | JQuery.Event | Event, effect?: JQueryUI.EffectOptions): JQuery;

    /** Zobrazi nebo skryje dialog */
    ginlinedialog(method: "toggle", $elm?: HTMLElement | JQuery): JQuery;

    /** Skryje dialog */
    ginlinedialog(method: "close", data?: any): JQuery;

    /** Nastavi focus na nektery z prvku v dialogu */
    ginlinedialog(method: "focus", data?: any): JQuery;

    /** Upravi svoji velikost tak, aby se vzdy vesel na obrazovku */
    ginlinedialog(method: "updateSize"): JQuery;

    /** Nastavi z-index tak, aby byl dialog ve predu */
    ginlinedialog(method: "moveToTop"): JQuery;

    /** Likvidace widgetu */
    ginlinedialog(method: "destroy"): JQuery;

    /** 
     * Vytvori dialog s vazbou na gdomcontext (kvuli zabraneni pouzivani)
     * @experimental Toto je zde pouze na zkousku, lepe se tomu obloukem vyhnout
     */
    ginlinedialog(method: "createDialog", ...args: Array<any>): JQuery;

    /** Pristup k options (gettery) */
    ginlinedialog<K extends Extract<keyof IGInlineDialogOptions, string>>(method: "option", key: K): IGInlineDialogOptions[K]

    /** Pristup k options (settery) */
    ginlinedialog<K extends Extract<keyof IGInlineDialogOptions, string>>(method: "option", key: K, value: Required<IGInlineDialogOptions>[K]): JQuery

    /** Pro situace, kdy by na danou akci (napr. kvuli animaci) mohlo dojit k inlinedialogu */
    ginlinedialog(method: "resetAutoClose"): JQuery;

    //NOTE: Tenhle getter a setter tu znejakeho duvodu nefunguje, ale napr. u GActionMenu je to OK...chce to blize prozkoumat...
    ///** Pristup k options (gettery) */
    //ginlinedialog<T extends IGInlineDialogOptions, K extends keyof T>(method: "option", optionName: K): T[K];

    ///** Pristup k options (settery) */
    //ginlinedialog<T extends IGInlineDialogOptions, K extends keyof T>(method: "option", optionName: K, value: Required<T>[K]): JQuery;
}

declare namespace Gordic.InlineDialogs {
    interface IGSimpleFormParams {
        /** Predpis formulare nebo jQuery  */
        formDescriptor?: Gordic.Forms.Form | JQuery;

        /** Inicializacni DTO pro formular */
        data?: object;

        /** Options pro inline dialog.
         *  Pozn.: Pokud chcete pridat vlastni commandbar, ale pouzit standardni "OK" a "Zavrit", lze do commandbar 
         *  priradit nazev akce okAct, resp. cancelAct, napr. takto: { commandBar: [{action: "okAct"}, {action: "cancelAct"}] }
         * */
        options?: IGInlineDialogOptions;
    }

    /**
     * Vytvori inlinedialog
     * @returns Div s widgetem inlinedialogu
     */
    function simpleForm(options: IGSimpleFormParams): JQuery;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\FileService\GFilePreviewDto.d.ts 

declare namespace Gordic.Gui.WebControls {
    /**DTO for filepreview result.*/
	interface GFilePreviewDto {
        /**Gets or sets the name of the file.*/
		FileName?: string|null;
        /**Gets or sets the type of the content.*/
		Extension?: string|null;
        /**Gets or sets the content.*/
		Content?: string|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\GSignCreateConfig.d.ts 

declare interface GSignCreateConfig extends Gordic.Support.Sign.GSignCreateConfig {

}

declare interface IGSignerBase {
    sign<T extends Gordic.Security.Service.GSignMinimumConfig>(configDto: T, customDto?: ObjectLiteral<any>/*, preparedConfig?: JQueryPromise<GSignCreateConfig>*/): JQueryPromise<GSignCreateConfig>;
    prepareSign<T extends Gordic.Security.Service.GSignMinimumConfig>(configDto: T, customDto?: ObjectLiteral<any>): JQueryPromise<GSignCreateConfig>;
} 

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gactions.gbadge.d.ts 

//////////////////////////////////////////////////////////////////////////
// GBadge
//////////////////////////////////////////////////////////////////////////

interface IconTemplate {
    icon?: string | string[]
    text?: string
    tooltip?: string
}

interface GBadgeOptions {
    id?: string
    value: string
    tooltip?: string
    customClass?: string
    state?: GState
}

interface GBadgeObservableOptions {
    params: GObservableObject<Omit<GBadgeOptions, "params">>;
}

interface JQuery {
    gbadge(options: GBadgeOptions|GBadgeObservableOptions): JQuery
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gactions.gbutton.d.ts 

//////////////////////////////////////////////////////////////////////////
// GButton
//////////////////////////////////////////////////////////////////////////

interface GButtonCssModifiers {
    button?: string
    wrapper?: string
    text?: string
    icon?: string
    tooltip?: {
        tooltip?: string
        header?: string
        tip?: string
    }
}

interface GButtonOptions {
    cssModifiers?: GButtonCssModifiers
    params: MenuParams
    actions?: GAction[]|GActionList;
    /** Je-li true prida tlacitku id z parametru (NOTE: Neni toto uz obsolete - od doby, co se id dava do attr. data-param-id???) */
    insertId?: boolean
    /** Ma byt zobrazena ikona pro rozevreni menu? (funkcnost otevreni menu zustava zachovana) */
    menuActivatoIcon?: boolean
    /** Moznost zmenit pozici otevirani menu  */
    menuPosition?: Object,

    /** tabindex, default = 0*/
    tabindex?: number;

    /** Na otevreni vzdy vytvori menu znovu (default = false) */
    menuCreateOnOpen?: boolean;
    /** customClass vlozena primo na button */
    customClass?: string;
}

interface JQuery {
    gbutton(options: GButtonOptions): JQuery
    gbutton(method: 'updateParams', params: MenuParams): void
    gbutton(method: 'collapse'): void
    gbutton(method: 'expand'): void
    gbutton(method: 'buildParams'): void
    gbutton(method: 'openMenu'): void
    gbutton(method: 'focus'): JQuery;
    gbutton(method: 'enabled'): boolean
    gbutton(method: 'enabled', state: boolean, type?: string): void
    gbutton(method: 'isCollapsed'): boolean
    gbutton(method: 'hide'): void
    gbutton(method: 'show'): void
    gbutton(method: 'visible'): boolean;
    gbutton(method: 'visible', state: boolean): void;
    gbutton(method: "option"): GButtonOptions;
    gbutton(method: "focus"): JQuery;
    gbutton(method: "getCaptionVisibility"): CaptionVisibility;
    gbutton(method: "getCaptionWidth"): number;
    gbutton(method: "click"): JQuery;
    gbutton<K extends Extract<keyof GButtonOptions, string> = Extract<keyof GButtonOptions, string>>(method: "option", key: K): GButtonOptions[K]
    gbutton<K extends Extract<keyof GButtonOptions, string> = Extract<keyof GButtonOptions, string>>(method: "option", key: K, value: Required<GButtonOptions>[K]): JQuery

}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gactions.gstatic.d.ts 

//////////////////////////////////////////////////////////////////////////
// gstatic
//////////////////////////////////////////////////////////////////////////

interface GStaticOptions extends MenuParams {
    id?: string
    icon?: string
    params?: MenuParams
    caption?: string
    tooltip?: string
    customClass?: string
    tooltipPosition?: Gordic.Widget.IGTooltipPosition
    badgeOnThisElement?: boolean;
}

interface JQuery {
    
    gstatic(options?: GStaticOptions ): JQuery

    gstatic(method: "option"): GStaticOptions
    gstatic(method: "option", values: Partial<GStaticOptions>): JQuery
    gstatic<K extends Extract<keyof GStaticOptions, string>>(method: "option", key: K): GStaticOptions[K]
    gstatic<K extends Extract<keyof GStaticOptions, string>>(method: "option", key: K, value: Required<GStaticOptions>[K]): JQuery
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gactions.gloadlink.d.ts 

//////////////////////////////////////////////////////////////////////////
// GLoadLink
//////////////////////////////////////////////////////////////////////////


interface GLoadLinkOptions {
    /**
     * Text odkazu 
     * @default "Načíst"
     */
    caption?: string,
    /**
     * CustomClass
     */ 
    customClass?: string,
    tooltip?: string,
    load?: (element: JQuery)=>(JQueryPromise<any>|void) | null,

    /** Zobrazit rámeček kolem contentu
     *  @default true 
     */
    border?: boolean,
    params?: MenuParamsAction
}

interface JQuery {
    /**
     * Widget - Zobrazení obsahu až po načtení linku nebo pouze zobrazení skrytého obsahu. 
     * 
     * @author THazmuka
     * @since 480.1.0.76
     * 
     * @param {GLoadLinkOptions} options
     * @returns {JQuery}
     */
    gloadlink(options: GLoadLinkOptions): JQuery
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gactions.gcolorpickerfield.d.ts 


interface JQuery {
    /**
     * Widget - políčko pro výběr barvy
     * 
     * @author THazmuka
     * @since 480.1.0.76
     * 
     * @param {Gordic.Widget.GColorPicker.IGColorPickerOpt} options
     * @returns {JQuery}
     */
    gcolorpickerfield(options: Gordic.Widget.GColorPicker.IGColorPickerOpt): JQuery
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gcontrols-0.1.0.d.ts 


interface GAutoCompleteOptions<T> extends JQueryUI.WidgetOptions, GAutoCompleteEvents {
    /**
     * delay - default 300
     * @default 300
     */
    delay?: number,
    /**
     * minLength - default 1
     * @default 1
     */
    minLength?: number,
    /**
     * limit - default 50
     * @default 50
     */
    limit?: number,
    /**
     * viewPortClass - default ""
     * @default ""
     */
    viewPortClass?: string,
    /**
     * strict - default true
     * @default true
     */
    strict?: boolean,
    /**
     * showAllOnOpen - default false
     * @default false
     */
    showAllOnOpen?: boolean,
    /**
     * position - default { my: "left top", at: "left bottom", of: null }
     * @default {{ my: "left top", at: "left bottom", of: null }}
     */
    position?: (viewPort:JQuery) => void | JQueryUI.JQueryPositionOptions,


    /** CSS třída, která se aplikuje na jednotlivé položky. */
    itemClass?: string | ((value: T) => string);
    /** Povolí/zakáže vybrat položku. */
    itemSelectable?: boolean | ((value: T) => boolean);
    /** Šablona pro hodnotu položky.      
     * @default null */
    itemTemplate?: string | ((value?: T) => JQuery | HTMLElement | string | void);

    /**
     * data
     * @default  null
     */
    data?: null | T[] | Gordic.Data.View<T> | JQueryPromise<(T[]|Gordic.Data.View<T>)> | ((filter:any) => T[] | Gordic.Data.View<T>), // [], GDataView, promise, function(filter) => data
    /**
     * clientFilterEvaluator
     * @default null
     */
    clientFilterEvaluator?: null | { prepare: (dv) => any, filter: (filter) => (string | ((row: T) => boolean)) }
    /**
     * serverChanged
     * @default $.noop
     */
    serverChanged?: () => (boolean | JQueryPromise<boolean>),
    choice?: null | ((this: HTMLElement, data: T, ev: JQueryEventObject) => any)
    preselectValue?: null | ((element: HTMLElement, data:T[], viewPort:JQuery) => T)
    helperCustomizer?: null | ((data: T[]) => T[])
    focusoutElement?: JQuery | null,
    footer?: string | null,

    serverFastFilterSupport?:boolean

}

interface GAutoCompleteEvents {
    open?: GAutoCompleteEvent,
    render?: GAutoCompleteEvent,
    close?: GAutoCompleteEvent,

}

interface GAutoCompleteEvent {
    /**
    * @param {JQueryEventObject} event Event
    */
    (event: JQueryEventObject, ctx: any): boolean
}



//////////////////////////////////////////////////////////////////////////
// GTab
//////////////////////////////////////////////////////////////////////////

interface GTabOptions extends JQueryUI.WidgetOptions {
    id?: string
    title?: string
    loadingMessage?: string
    opened?: boolean
    locked?: boolean
    visible?: boolean
    autoload?: boolean
    attachToContent?: boolean
    icon?: string | null
    iconOpened?: string
    iconLoading?: string
    headerClass?: string
    animationTimer?: number
    customMenuID?: string
    group?: IGTabGroupOptions
    allowFullscreen?: boolean
    menuBar?: MenuParams[]
    badge?: GBadgeOptions | GBadgeObservableOptions;
	/**
	 * metoda vyvolaná při otevření gtabu
	 */
    open?(this: HTMLElement, ev: JQuery.Event): void;
	/**
	 * metoda vyvolaná při zavření gtabu
	 */
    close?(this: HTMLElement, ev: JQuery.Event): void;
    customLoad?(this: HTMLElement, ev: JQuery.Event, params: any): void | boolean;
    fullscreenon?(this: HTMLElement, ev: JQuery.Event , ctx: {fullscreenElement: JQuery}): void;
    fulscreenoff?(this: HTMLElement, ev: JQuery.Event , ctx: { fullscreenElement: JQuery }): void;
}

declare class GTab {
    options: GTabOptions
    _loaded: boolean
}

interface JQuery {
    gtab(options?: GTabOptions): JQuery
    gtab(method: "instance"): GTab
    gtab(method: "option"):  GTabOptions;
    gtab(method: "option", value: Partial<GTabOptions>): JQuery
    gtab<K extends Extract<keyof GTabOptions, string>>(method: "option", key: K): GTabOptions[K]
    gtab<K extends Extract<keyof GTabOptions, string>>(method: "option", key: K, value: Required<GTabOptions>[K]): JQuery

    gtab(method: "open" | "close"): JQuery
    gtab(method: "scrollIntoView"): JQuery
    gtab(method: "show" | "hide"): JQuery
    gtab(method: "load", params?:any): JQuery
    gtab(method: "unload"): JQuery
    gtab(method: "refresh"): JQuery
    gtab(method: "loadComplete"): void; 
    gtab(method: "setMenuBar", menu: MenuParams[], userSettings: string): JQuery
    gtab(method: "destroy"): JQuery
}

//////////////////////////////////////////////////////////////////////////
// GFlash
//////////////////////////////////////////////////////////////////////////

interface GFlashOptions extends JQueryUI.WidgetOptions {
    /**
     * OBSOLETE - pouzijte "content"
     * @deprecated  OBSOLETE - pouzijte "content"
     */
    label?: string
    content?: string
    state?: GState
    /**
     * OBSOLETE - bude zrusen
     * @deprecated  OBSOLETE - bude zrusen
     */
    timer?: number
    id?: string
    icon?: string
    customClass?: string
    close?: JQueryEventListener
    noClose?: boolean
    badge?: GBadgeOptions;
    /** Sbaleny? default = false */
    isCollapsed?: boolean;
    commandBar?: MenuParams[];
}

interface JQuery {
    gflashpanel(options: GFlashOptions): JQuery
    gflashpanel(method: "option"): GFlashOptions
    gflashpanel(method: "close"): JQuery;
    gflashpanel<K extends Extract<keyof GFlashOptions, string>>(method: "option", key: K): GFlashOptions[K]
    gflashpanel<K extends Extract<keyof GFlashOptions, string>>(method: "option", key: K, value: Required<GFlashOptions>[K]): JQuery
}



//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gautofit.d.ts 

//////////////////////////////////////////////////////////////////////////
// gautofit
//////////////////////////////////////////////////////////////////////////
interface GAutofitOptions extends Gordic.Widget.WidgetOptions {
    /** When element's height is below minimalHeight, other elements (siblings), which can collapse, will be collapsed.
     * @default 250
     */
    minimalHeight?: number,

    /** Element will never have height below criticalHeight.
     * @default 200
     */
    criticalHeight?: number,

    /** Show scrollbar on parentElement when criticalHeight has been achieved? 
     * @default true
     */
    scrollOnCritical?: boolean,

    /** Parent element in which this element must fit.
     *
     * @example <caption> For element inside sidepanel: </caption>
     * ```typescript
     * ".g-sbp-content"
     * ```
     *
     * @default ".ui-dialog-content"
     */
    parentElement?: JQuery | string | (string|JQuery)[],

    resizersOnTab?: boolean,

    /** Callback which is called when element's height is below minimalHeight option.
     */
    belowminimal?: () => JQueryPromise<void>,

    /** Callback which is called when element's height was below minimalHeight and now is over minimalHeight
     */
    overminimal?: () => JQueryPromise<void>
}


interface JQuery {
    /**
     * Widget, which ensures, that element will be fitted into it's parent element,
     * in a way, that parentElement doesn't need to show scrollbar.
     *
     * @author VMaca
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/widgets/gautofit}     
     *
     * @example <caption>For content with grid:</caption>
     * ```typescript
     *   $("<div>").appendTo(this.element)
     *  .gautofit()
     *  .ggrid()
     *
     * ```
     *
     * @example <caption>For content in sidepanel:</caption>
     * ```typescript
     *  $("<div>").appendTo(this.element)
     *  .gautofit({parentElement: ".g-sbp-content"})
     *  .ggrid()
     *
     * ```
     *
     * @param {GAutofitOptions} [options] Optional options for autofit.
     */
    gautofit(options?: GAutofitOptions): JQuery;

    /**
     * destroy of autofit
     * @param method
     */
    gautofit(method: "destroy"): JQuery
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gcollapsible.d.ts 

//////////////////////////////////////////////////////////////////////////
// gcollapsible
//////////////////////////////////////////////////////////////////////////

/**
* Options for collapsible widget
* @author VMaca
*/
interface GCollapsibleOptions extends GCollapsibleEvents, Gordic.Widget.WidgetOptions {
    /**
     * Is element currently collapsed horizontally?
     * @default false
     *
     */
    isCollapsedHorizontally?: boolean,

    /**
     * Is element currently collapsed vertically?
     * @default false
     *
     */
    isCollapsedVertically?: boolean,

    /**
     * Can element collapse horizontally ?
     * @default false
     *
     */
    canCollapseHorizontally?: boolean,
    /**
     * Can element collapse vertically ?
     * @default true
     *
     */
    canCollapseVertically?: boolean,
}

/** Events which are fired by gcollapsible widget. 
 * @author VMaca
 */
interface GCollapsibleEvents {
    /** Event is invoked when element expands vertically. */
    expandVertically?: GCollapsibleEvent

    /** Event is invoked when element collapse vertically. */
    collapseVerically?: GCollapsibleEvent

    /** Event is invoked when element expands horizontally. */
    expandHorizontally?: GCollapsibleEvent

    /** Event is invoked when element collapse horizontally. */
    collapseHorizontally?: GCollapsibleEvent
}
/** GCollapsible event definition */
interface GCollapsibleEvent {
    /**
    * @param {JQueryEventObject} event Event
    */
    (event: JQueryEventObject, ctx: { promise: JQueryDeferred<void>, isCollapsed: boolean }): boolean
}

/**
* This widget acts as interface for collapsible elements
*
* @author VMaca
* @see [xWiki]{@link https://xwiki.gordic.cz/NET/widgets/gcollapsible}
*/
interface GCollapsible extends Gordic.Widget.JQueryUIWidget<GCollapsibleOptions, GCollapsibleOptions> {
    /**
     * Is element collapsed?
     * @param {"v" | "h"} [axis="v"]  default="v" axis in which element is collapsed
     */
    isCollapsed(axis?: "v" | "h"): boolean
    /**
     *  Can element collapse?
     * @param {"v" | "h"} [axis="v"]  default="v" axis in which element can collapse
     */
    canCollapse(axis?: "v" | "h"): boolean
    /**
     *  Collapses element
     * @param {"v" | "h"} [axis="v"]  default="v" axis in which element can collapse
     */
    collapse(axis?: "v" | "h"): JQueryPromise<void>
    /**
     *  Expands element
     * @param {"v" | "h"} [axis="v"]  default="v" axis in which element expandes
     */
    expand(axis?: "v" | "h"): JQueryPromise<void>
    /**
     * Toggles element
     * @param {"v" | "h"} [axis="v"]  default="v" axis in which element toggles
     */
    toggle(axis?: "v" | "h"): JQueryPromise<void>
}

interface JQuery {

    /**
    * This widget acts as interface for collapsible elements
    *
    * @author VMaca
    * @see [xWiki]{@link https://xwiki.gordic.cz/NET/widgets/gcollapsible} 
    *
    * @example <caption>Usage:</caption>
    *```typescript
    *   //create widget:
    *   this.element.gcollapsible({
    *        isCollapsedHorizontally: false, //default state
    *        isCollapsedVertically: false,
    *
    *        canCollapseHorizontally: false, //turn events on/off – optional – will be determined from functions below
    *        canCollapseVertically: true,
    *
    *        collapseVertically: function(ev, data){ //verticalCollapse of element here - finish it with data.promise.resolve(); or reject(); - use data.isCollapsed to get current state before change }
    *        expandVertically: function(ev, data){ //verticalExpand of element here - finish it with data.promise.resolve(); or reject();- use data.isCollapsed to get current state before change  }
    *
    *        collapseHorizontally: function(ev, data){ //horizontalCollapse of element here - finish it with data.promise.resolve(); or reject(); - use data.isCollapsed to get current state before change }
    *        expandHorizontally: function(ev, data){ //horizontalExpand of element here - finish it with data.promise.resolve(); or reject(); - use data.isCollapsed to get current state before change  }
    *   })
    *
    * //Then just call:
    *
    * this.element.gcollapsible("expand");// | ("collapse") | ("toggle") | ("isCollapsed", "v"(vertical) or "h"(horizontal)) | ("canCollapse")
    *
    * //all functions has second parameter available and default is "v" - vertical
    *```
    * @param {GCollapsibleOptions} options Options
    */
    gcollapsible(options: GCollapsibleOptions): JQuery;

    /**
     * Is element collapsed? / Can element collapse?
     * @param {"isCollapsed"|"canCollapse"} method
     * @param {"v" | "h"} [axis="v"]
     */
    gcollapsible(method: "isCollapsed" | "canCollapse", axis?: "v" | "h"): boolean;

    /**
     * Collapse element / Expand element / Toggle element
     * @param {"collapse" | "expand" | "toggle"} method
     * @param {"v" | "h"} [axis="v"] Axis is optional and default is "v"
     */
    gcollapsible(method: "collapse" | "expand" | "toggle", axis?: "v" | "h"): JQueryPromise<void>;


    gcollapsible(method: "option"): GCollapsibleOptions
    gcollapsible(method: "option", values: Partial<GCollapsibleOptions>): JQuery
    gcollapsible<K extends Extract<keyof GCollapsibleOptions, string>>(method: "option", key: K): GCollapsibleOptions[K]
    gcollapsible<K extends Extract<keyof GCollapsibleOptions, string>>(method: "option", key: K, value: Required<GCollapsibleOptions>[K]): JQuery
    gcollapsible(method: "instance"): GCollapsible
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\ggrid.editors.d.ts 

interface GGridRowEditorOptions<T = any> extends GGridEditorBaseOptions<T>  {
    beforeCommit?: JQueryEventListener1<GGridEditorInfoType<T>>
    commit?: JQueryEventListener1<GGridEditorInfoType<T>>
    beforeCancel?: JQueryEventListener1<GGridEditorInfoType<T>>
    cancel?: JQueryEventListener1<GGridEditorInfoType<T>>

    save?: (((data: T, ctx: GGridEditorInfoType<T>) => void | T | JQueryPromise<T>) & ThisType<HTMLElement>)

    rowBar?: (string | MenuParams)[]
    defaultData?: ObjectLiteral<any> | ((data: T, ctx: GGridEditorInfoType) => ObjectLiteral<any>)
}
interface GGridCellEditorOptions<T = any> extends GGridEditorBaseOptions<T> {
    moveDirection?: "down" | "right"
    autoEdit?: boolean    
}
interface GGridFullEditorOptions<T = any> extends GGridEditorBaseOptions<T> {
    autoStart?: boolean    
}

interface GGridEditorInfoType<T=any> {
    cellInfo: CellInfo<T>
    view: Gordic.Data.View<T>
}

interface GGridEditorBaseOptions<T = any> extends JQueryUI.WidgetOptions  {
    useDefaultExecute?: boolean
    allowCopy?: boolean
    copySource?: () => T
    validators?: object

    beforeStart?: JQueryEventListener1<GGridEditorInfoType<T>>
    start?: JQueryEventListener1<GGridEditorInfoType<T>>
    beforeStop?: JQueryEventListener1<GGridEditorInfoType<T>>
    stop?: JQueryEventListener1<GGridEditorInfoType<T>>

    change?: JQueryEventListener1<GGridEditorInfoType<T>>
}

interface JQuery {
    ggridroweditor<TRow=any>(...options: GGridRowEditorOptions<TRow>[]): JQuery;
    ggridroweditor<TRow=object>(method: "addRow", defaultData?: TRow)
    ggridroweditor<TRow=object>(method: "insertRow", index: number, defaultData?: TRow)
    ggridroweditor(method: "start", cellInfo?: CellCoords);
    ggridroweditor(method: "stop", collect?: boolean);
    ggridroweditor<TRow = object>(method: "commit"): JQuery.Promise<TRow>;
    ggridroweditor<TRow = object>(method: "cancel"): JQuery.Promise<TRow>;

    ggridroweditor(method: "option"): GGridRowEditorOptions
    ggridroweditor<K extends Extract<keyof GGridRowEditorOptions, string>>(method: "option", key: K): GGridRowEditorOptions[K]
    ggridroweditor<K extends Extract<keyof GGridRowEditorOptions, string>>(method: "option", key: K, value: Required<GGridRowEditorOptions>[K]): JQuery
    ggridroweditor(method: "option", value: Partial<GGridRowEditorOptions>): JQuery
    ggridroweditor(method: "destroy"): JQuery;

    ggridcelleditor(...options: GGridCellEditorOptions[]): JQuery;
    ggridcelleditor(method: "start", cellInfo?: CellCoords): JQuery;
    ggridcelleditor(method: "stop", collect?: boolean): JQuery;
    ggridcelleditor<TRow = object>(method: "getActiveCell"): CellInfo<TRow>|null;
    ggridcelleditor(method: "option"): GGridCellEditorOptions
    ggridcelleditor<K extends Extract<keyof GGridCellEditorOptions, string>>(method: "option", key: K): GGridCellEditorOptions[K]
    ggridcelleditor<K extends Extract<keyof GGridCellEditorOptions, string>>(method: "option", key: K, value: Required<GGridCellEditorOptions>[K]): JQuery
    ggridcelleditor(method: "option", value: Partial<GGridCellEditorOptions>): JQuery
    ggridcelleditor(method: "destroy"): JQuery;

    ggridfulleditor(...options: GGridFullEditorOptions[]): JQuery;
    ggridfulleditor(method: "start", cellInfo?: CellCoords): JQuery;
    ggridfulleditor(method: "stop", collect?: boolean): JQuery;
    ggridfulleditor(method: "option"): GGridFullEditorOptions
    ggridfulleditor<K extends Extract<keyof GGridFullEditorOptions, string>>(method: "option", key: K): GGridFullEditorOptions[K]
    ggridfulleditor<K extends Extract<keyof GGridFullEditorOptions, string>>(method: "option", key: K, value: Required<GGridFullEditorOptions>[K]): JQuery
    ggridfulleditor(method: "option", value: Partial<GGridFullEditorOptions>): JQuery
}



//////////////////////////////////////////////////////////////////////////
// ggridserverfilter
//////////////////////////////////////////////////////////////////////////

interface JQuery {
    ggridserverfilter(options: object): JQuery;
    ggridserverfilter<T>(method: "collect", dto: T): JQueryPromise<T>;
    ggridserverfilter(method: "apply", dto: object): JQuery;
    ggridserverfilter(method: "clear"): JQuery;
    ggridserverfilter(method: "findFields", fieldNames: string): JQuery;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gactions.glink.d.ts 

//////////////////////////////////////////////////////////////////////////
// GLink
//////////////////////////////////////////////////////////////////////////

interface GLinkOptions {
    //TODO-TS28: name tu asi nemá být ...
    name?: string

    params?: GObservableObject<MenuParams> | MenuParams
    actions?: GActionList | GAction[]
    customClass?: string
    /** @default true */
    insertId?: boolean
    /**
     * gbadge.defaultOptions
     */
    badge?: GBadgeOptions|null,
    /**
     * je-li true na this.element prida automaticky 'javascript:void(0)}
     * @default true
     */
    addDefaultHref?: boolean
    /**
     * defaultHref
     * @default "javascript:void(0);"
     */
    defaultHref?: string | ((mp: MenuParams) => string|JQueryPromise<string>),
    menuPosition?: JQueryUI.JQueryPositionOptions
    /**
     * default - vytvori widget tooltipu|delegated - tooltip je na nejakem nadrazenem ovl. prvku a pouze se cte z atributu
     * 
     */
    tooltipMode?: "default" | "delegatedAttr" | "delegatedProp",
    /**
     * v rezimu tooltipMode = delegated odtud cte tooltip
     * @default "title"
     */
    tooltipAttr?: string,  
    /**
     * nastavi tabindex odkazu
     * @default {0}
     */
    tabindex?: number,
    /**
     * Vytvori menu znovu na otevreni
     */
    menuCreateOnOpen?: boolean
}

interface JQuery {
    glink(options: GLinkOptions): JQuery
    glink(method: "focus"): JQuery;
    glink(method: "click"): JQuery;
    glink<K extends Extract<keyof GLinkOptions, string> = Extract<keyof GLinkOptions, string>>(method: "option", key: K): GLinkOptions[K]
    glink<K extends Extract<keyof GLinkOptions, string> = Extract<keyof GLinkOptions, string>>(method: "option", key: K, value: Required<GLinkOptions>[K]): JQuery
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gfilepreview.d.ts 

//////////////////////////////////////////////////////////////////////////
// GFilePreview
//////////////////////////////////////////////////////////////////////////

interface IGFilePreviewLoadOptions {
    /**
     * GContent class, GContent or asyncTask class (name must end with AsyncTask) which provides data
     * @type {string | GContent}
     */
    gcontent: string | GContent,

    /**
     * Input data for gcontent method or async task
     * @type {ObjectLiteral<any>}
     */
    input: ObjectLiteral<any>

    /**
     * name of method in GContent
     * @type {string}
     */
    method?:string
}

interface IGFilePreviewDataDto {
    extension?: string;
    fileName?: string;
    data?: string;
    auxilary?: { input: any, data: ObjectLiteral<any> };
    cancellationToken: GObservableObject<{ isCancelled: boolean }>;
    isBase64?: boolean;
    otherDataFormats?: ObjectLiteral<any>;
    mimeType?: string;
}

interface GFilePreviewOptions extends Gordic.Widget.WidgetOptions {

    /**
     * Text to show when loading preview.
     * @default jres:31750003 Probíhá načítání náhledu ...
     */
    loadingText?: string, //RC 31750003 : Probíhá načítání náhledu ...

    /**
     * Is caching enabled for loaded previews? - Default: true
     * @default true
     */
    caching?: boolean,

    /**
     * Max count of previews in cache. When limit is met, oldest are replaced by newest. Default: 10
     * @default 10
     */
    cacheLimit?: number,

    /**
     * Maximum size of cache in MB. Default: 50MB
     * @default 50
     */
    cacheSizeLimit?: number,
    /**
     * How long can item be in cache (in minutes). Any older item in cache is removed and has to be reloaded. Default is 10mins
     * @default 10
     */
    cacheRenewal?: number, // 10 minutes,
    /**
     * Selector to find element which is parentElement for autofit. Default is ".g-sbp-content"
     * @default ".g-sbp-content"
     */
    autofitParentElement?: string | JQuery,

    /**
     * Should widget create it's own menubar or should it delegate to sidepanel/tab/content? Default is true.
     * @default true
     */
    ownMenuBar?: boolean,
    /**
     * Should display bar with filename?
     * @default true
     */
    displayFileName?: boolean,

    /** Delegate for invoking custom download of current input. Can return promise of ongoing download process */
    customDownload?: (input: ObjectLiteral<any>) => (void | JQuery.Promise<any>)
    /** Options for download button to edit caption and tooltip */
    customDownloadOptions?: GActionParamsDefObjBase,

    render?: (ev: JQuery.Event, ctx: IGFilePreviewDataDto) => void
    prerender?: (ev: JQuery.Event, ctx: IGFilePreviewDataDto) => void

    modifymenubar?: (ev: JQuery.Event, ctx: {
        menuBar: MenuParams[],
        isError?: boolean,
        activeEngineType?: Gordic.Components.FilePreview.RenderingEngineEnum | null }) => void | false,
    engineOptions?: Gordic.Components.FilePreview.IGEngineOptions
}

interface JQuery {

    /**
     * Widget for file previews - mostly for pdf or for images.
     * @author VMaca
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/widgets/gfilepreview}
     * @param {GFilePreviewOptions} options
     */
    gfilepreview(options?: GFilePreviewOptions): JQuery

    /**
     * Shows preview of file obtained from server
     * 
     * @param {"displayFromServer"} method
     * @param {IGFilePreviewLoadOptions} loadOptions Options for loading from server
     * @returns {JQueryPromise<any>} When rendering is finished
     */
    gfilepreview(method: "displayFromServer", loadOptions: IGFilePreviewLoadOptions): JQueryPromise<any>

    /**
     * Shows preview of file obtained from server
     * @param {"displayFromServer"} method method
     * @param {string|GContent} gcontent Instance of GContent class to get GFilePreviewInfoDto from or name of AsyncTask class
     * @param {string} contentMethod Method on GContent to call to get the file. Can be null if asyncTask is chosen
     * @param {ObjectLiteral<any>} input Input dto for method call.
     * @returns {JQueryPromise<any>} When rendering is finished
     */
    gfilepreview(method: "displayFromServer", content: string | GContent, contentMethod: string | null, input: ObjectLiteral<any>): JQueryPromise<any>

    /**
     * Shows preview of given file. Currently is supported PDF.
     * @param {Int8Array} file  - file content
     * @param {string} fileName Name of file (with extension)
     * @param {string} extension File extension - optional if is part of fileName.
     * @returns JQueryPromise<any> When rendering is finished
     */
    gfilepreview(method: "displayFile", file: Int8Array | string, fileName: string, opts?: {extension?:string, isBase64?:boolean }): JQueryPromise<any>


    gfilepreview(method: "getCanvasDrawer"): Gordic.Components.CanvasDrawer.IGCanvasDrawer | null
    gfilepreview(method: "clearCache"): JQuery;
    gfilepreview(method: "refresh"): JQuery;
    gfilepreview(method: "option"): GFilePreviewOptions
    gfilepreview<K extends Extract<keyof GFilePreviewOptions, string>>(method: "option", key: K): GFilePreviewOptions[K]
    gfilepreview<K extends Extract<keyof GFilePreviewOptions, string>>(method: "option", key: K, value: Required<GFilePreviewOptions>[K]): JQuery
    gfilepreview(method: "option", value: Partial<GFilePreviewOptions>): JQuery
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gpreview.d.ts 

//////////////////////////////////////////////////////////////////////////
// GPreview
//////////////////////////////////////////////////////////////////////////

interface GPreviewItemOptions<TData=any> {
    /**
     * Content for this preview tab.
     * @param {ObjectLiteral<any>} loadParams
     */
    content?: ((loadParams: TData, loadOptions?: ObjectLiteral<any>) => JQueryPromise<GContentInitializer | string> | GContentInitializer | string) | string | IGClientContent | GContent

   
    /**
     * Function - which is called when subtask is selected
     * 
     * @param {JQuery} customDiv current tab div
     * @param {ObjectLiteral<any>} loadParams current data to load
     */
    customLoad?: (customDiv: JQuery, loadParams: TData, loadOptions?:ObjectLiteral<any>) => (JQueryPromise<any>|void)

    /** Div for preview content - is created automatically if not set */
    customDiv?: JQuery

    /** Title for subtask */
    caption: string

    /** Default data to load into preview content.*/
    loadParams?: TData

    loadOptions?: ObjectLiteral<any>
}

interface GPreviewOptions<TData=any> extends Gordic.Widget.WidgetOptions {
    /** Custom class of gpreview element.*/
    customClass?: string,
    /** List of tabs (items for subtasks) in preview. */
    tabs: GPreviewItemOptions<TData>[],

    /** Wheter subtask should be used - default is true
     * @default true
     */
    useSubtask?: boolean,

    /**
     * Which tab should be active?
     * @default 0
     */
    activeItem?: number,

    /**
     * Text to display when gpreview is disabled.
     * @param {GFlashOptions} options
     */
    disabledText?: string, //RC 31750007 : Není vybrán řádek pro zobrazení náhledu.

    /**
     * UserSettings of content where this preview is used.
     */
    userSettings?: string | null,
    /**
     *  Parent content
     */
    parentContent?: GContent | ((customDiv:JQuery) => GContent),
}

interface JQuery {

    /**
     * Widget for sidebar previews - can have subtasks and multiple contents.
     * @author VMaca
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/widgets/gpreview}
     * @param {GPreviewOptions} options
     */
    gpreview<TData = any>(options: GPreviewOptions<TData>): JQuery

    /**
     * Sets loadParams to tabs and calls refresh if requested.
     * @param {Object} data Object where key is index of tab in gpreview and value is loadParams for this tab
     * @param {boolean} refresh - Rerenders currently active tab if true
     */
    gpreview<TData = any>(method: "load", data: TData, refresh: boolean, loadOptions?: ObjectLiteral<any>): JQuery
    /**
     * Sets same loadParams to all tabs and calls refresh if requested.
     * @param {Object} data LoadParams object which is set to all tabs
     * @param {boolean} refresh - Rerenders currently active tab if true
     */
    gpreview<TData = any>(method: "loadAll", data: TData, refresh: boolean, loadOptions?: ObjectLiteral<any>): JQuery

    /**
     * Sets loadParams (data) to given tab and calls refresh if requested.
     * @param {Number} item Index of tab
     * @param {Object} data LoadParams for tab
     * @param {boolean} refresh Sets given tab as active and rerenders it.
     */
    gpreview<TData = any>(method: "loadItem", item: number, data: TData, refresh: boolean, loadOptions?:ObjectLiteral<any>): JQuery

    /**
     * Sets given tab active, without changing loadParams
     * @param {Number} item - Index of tab to activate
     * @param {boolean} invoke - invoke tab render
     */
    gpreview(method: "setActive", item: number, invoke: boolean): JQuery
    gpreview(method: "showInfo", info: string|JQuery): JQuery

    /**
     * Gets index of currently active tab
     * @returns {Number} or -1 if there are no tabs. 
     */
    gpreview(method: "getActive"): number
    gpreview(method: "focus"):JQuery

    gpreview(method: "option"): GPreviewOptions
    gpreview<K extends Extract<keyof GPreviewOptions, string>>(method: "option", key: K): GPreviewOptions[K]
    gpreview<K extends Extract<keyof GPreviewOptions, string>>(method: "option", key: K, value: Required<GPreviewOptions>[K]): JQuery
    gpreview(method: "option", value: Partial<GPreviewOptions>): JQuery
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gpidbar.d.ts 

//////////////////////////////////////////////////////////////////////////
// gpidbar
//////////////////////////////////////////////////////////////////////////

/**
* Options for pidbar widget
* @author THazmuka
*/
interface GPidbarOptions extends Gordic.Widget.WidgetOptions {
    customClass?: string,
    /**
     * @default "000000000000"
     */
    pid?: string
}



interface JQuery {

    /**
    * This widget displays pid.
    *
    * @author THazmuka
    *
    * @param {GPidbarOptions} options Options
    */
    gpidbar(options: GPidbarOptions): JQuery;



    gpidbar(method: "option"): GPidbarOptions
    gpidbar<K extends Extract<keyof GPidbarOptions, string>>(method: "option", key: K): GPidbarOptions[K]
    gpidbar<K extends Extract<keyof GPidbarOptions, string>>(method: "option", key: K, value: Required<GPidbarOptions>[K]): JQuery
    gpidbar(method: "option", value: Partial<GPidbarOptions>): JQuery
    gpidbar(method: "destroy"): JQuery;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gsidebar.d.ts 

//////////////////////////////////////////////////////////////////////////
// GSidebar
//////////////////////////////////////////////////////////////////////////

interface GSideBarLeafOptions {
    badge?: GBadgeOptions
    caption?: string
    icon?: string;
}

interface GSideBarPanelOptions extends GSbpanelEvents{
    caption?: string
    icon?: string;
    customClass?: string
    customDiv?: JQuery
    id?: string
    leaf?: GSideBarLeafOptions | string
    minWidth?: number
    pinned?: boolean
    resizable?: boolean
    visible?: boolean
    side?: string
}

interface GSideBarBarOptions {
    leafsAutoHide?: boolean
    panels?: GSideBarPanelOptions[]
    pinned?: boolean
    userSettings?: Gordic.Data.IGStorage
    visible?: boolean
    width?: number
}

interface GSideBarOptions {
    contentMinWidth?: number
    left?: GSideBarBarOptions
    right?: GSideBarBarOptions
    userSettings?: object|null
}

interface JQuery {
    gsidebar(options: GSideBarOptions): JQuery
    gsidebar(method: "getPanel", id: string): JQuery
    /** Obsolete. Nepouzivat!!! */
    gsidebar(method: "getActivePanel", region: Gordic.Widget.GSubcontentRegions): JQuery;
    gsidebar(method: "addPanel", position: string, options: any): JQuery
    gsidebar(method: "removePanel", id: string): JQuery
    gsidebar(method: "detachPanel", id: string): JQuery
    gsidebar(method: "removeAll", l?: boolean, r?: boolean): JQuery
    gsidebar(method: "detachAll", l?: boolean, r?: boolean): JQuery

    gsidebar<K extends Extract<keyof GSideBarOptions, string>>(method: "option", key: K): GSideBarOptions[K]
    gsidebar(method: "option", position: string, options: GSideBarBarOptions): JQuery;
    gsidebar<K extends Extract<keyof GSideBarOptions, string>>(method: "option", key: K, value: GSideBarOptions[K]): JQuery;
    gsidebar(method: "option", options: GSideBarOptions): JQuery;
    gsidebar(method: "option"): GSideBarOptions

}

interface GSbpanelOptions extends GSbpanelEvents, Gordic.Widget.WidgetOptions {
    /** (default = "") */
    id?: string,
    /** popisek hlavičky  (default = "") */
    caption?: string,
    /** "ouško" komponenta gstatic  (default = "") */
    leaf?: string, 
    /**  (default = true)*/
    resizable?: boolean,
    /** delegat z sidebar */
    maxWidth?: Function,    
    /** (default = "") */
    side?: "left" | "right",
    /** delegat z sidebar */
    sidebarLink?: Function,   
    /** (default = false)*/
    visible?: boolean,
    /** (default = "") */
    panelClass?: string,
    /** (default = "") */
    customClass?: string,
    /**  tento argument ignoruje při volání přes gsidebar a připnutí (default = 200) */
    width?: number,  
    /** (default = 100) */
    minWidth?: number,
    /** (default = null)*/
    menuBar?: MenuParams[] | null, 
}

interface GSbpanelEvents {
    open?: GSbpanelEvent
    close?: GSbpanelEvent
    focus?: GSbpanelEmptyEvent
    pin?: GSbpanelPinEvent
}

interface GSbpanelEmptyEvent {
    (event: JQueryEventObject): boolean | void
}

interface GSbpanelEvent {
    (event: JQueryEventObject, ctx: { id: string }): boolean | void
}

interface GSbpanelPinEvent {
    (event: JQueryEventObject, ctx: { id: string, pinned: boolean }): boolean | void
}

interface JQuery {
    gsbpanel(options: GSideBarOptions): JQuery  //NOTE (BM): Neni u options spatny typ? Nemelo by byt GSideBarPanelOptions??? nebo GSbpanelOptions???
    gsbpanel(method: "refreshPin", pinned?: boolean): JQuery
    gsbpanel(method: "menuBar", params?: MenuParams[]): JQuery
    gsbpanel(method: "flash", flashOptions?: GFlashOptions|string): JQuery

    /**
     * vytvori nad dialogen cover s pripadnym textem
     * @param {"cover"} method 
     * @param {boolean} show zda se ma zobrazit, nebo skryt
     * @param {any} status {text: "pleasewait", progress: 0, total: 100} objekt stavu progressu, ktery se ma zobrazit (pripadne null/undef pro zadnou informaci o progressu)
     */
    gsbpanel(method: "cover", show?: boolean, status?: Gordic.Widget.IGContentWorkingStatus |null): JQuery

    /**
     * Připne(odepne) odepnutý(připnutý) gsbpanel - podle podle aktuáních options
     * @param {"pinOffOn"} method
     */
    gsbpanel(method: "pinOffOn"): JQuery
    gsbpanel(method: "show"): JQuery

    /** Vrací příznak, zda je okno připnuté(pinned) / otevřené(visible)
     * @returns {boolean}  true == připnutý/otevřený
     */
    gsbpanel(method: "isPinned" | "isVisible"): boolean
    /** šířka gsbpanelu v px */
    gsbpanel(method: "getWidth"): number

    /** Skryje panel*/
    gsbpanel(method: "hide", unpin?: boolean): JQuery

    gsbpanel(method: "option"): GSbpanelOptions
    gsbpanel(method: "option", options: GSbpanelOptions): JQuery;
    gsbpanel<K extends Extract<keyof GSbpanelOptions, string>>(method: "option", key: K): GSbpanelOptions[K]
    gsbpanel<K extends Extract<keyof GSbpanelOptions, string>>(method: "option", key: K, value: GSbpanelOptions[K]): JQuery
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gshortcuts.d.ts 

//////////////////////////////////////////////////////////////////////////
// gshortcuts
//////////////////////////////////////////////////////////////////////////
interface GShortcutOptions extends JQueryUI.WidgetOptions {
    /**Id to recognize my shortcuts from other shortcuts */
    id?: string, 

    /** Key stroke definition. Array serves to register same action as multiple shortcuts. 
     * Key combination is defined with "+" in single string value.
     * @example <caption>Simple key strokes:</caption>
     * ```typescript
     * "ctrl+y"
     * "backspace"
     * "ctrl+space"
     * "ctrl+alt+m"
     * ```
     * @example <caption>Advanced key strokes:</caption>
     * ```typescript
     * "ctrl+y ctrl+z"
     * "ctrl+k ctrl+c ctrl+z"
     * "ctrl+y ctrl+space"
     * ```
     */
    key: string | string[]
    /**
     * action to be performed
    */
    action?: GAction
    run?: (ev: JQueryKeyEventObject, ctx:any)=> void | false
    /**
     * Description of what shortcut does.
     */
    description?: string
    /**
     * Group name to which shortcut belongs.
     */
    group: Gordic.Shortcuts.Groups

    /**
     * Whether shortcut can be executed - called just before execute.
     */
    canExecute?: (/**Event*/ev: JQueryKeyEventObject) => boolean | Partial<GShortcutOptions>

    active?: boolean,

    /**
     * Should be event prevented when executed?
     */
    preventDefault?: boolean,
    /**
     * Is visible in help?
     * @type {boolean}
     */
    visible?: boolean

    /**
     * Is visible in helper in left bottom corner. Default is true for key combinations and false for single key shortcuts.
     * Can be explicitly set to true or false. If set, it's value is respected.
     * @type {boolean}
     */
    helperVisible?: boolean

    /**
     * icon for (r/l/m)hold
     * @type {string}
     */
    icon?: string;

}

interface JQuery {
    /**
     * @author VMaca
     *
     * @param {GShortcutOptions} options
     */
    gshortcut(): GShortcutOptions[]

    /**
     * @author VMaca
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/widgets/gautofit}
     *
     * @param {GShortcutOptions} options
     */
    gshortcut(options: GShortcutOptions): JQuery
    /**
     * Removes All shortcuts from element
     * @param {null} method
     */
    gshortcut(method: null): Object
    /**
     * Gets all shortcuts in the direction from current element.
     * @param {"all"} method
     * @param {"down" | "up"} direction
     */
    gshortcut(method: "all", direction: "down" | "up"): GShortcutOptions[]
    /**
     * Gets shortcut identified by key from current element.
     * @param {"get"} method
     * @param {string} key
     */
    gshortcut(method: "get", key: string): GShortcutOptions[]
    /**
     * Removes shortcut with given key identifier
     * @param {"remove"} method
     * @param {string} key
     */
    gshortcut(method: "remove", key: string): GShortcutOptions[]
}

declare namespace Gordic.Shortcuts {
    enum Groups {
        App = "Aplikace",
        Task = "Úloha",
        Dialog = "Aktivita / Okno",
        Grid = "Seznam",
        Field = "Pole",
        Assistent = "Inteligentní Asistent",
        Hidden= "_hidden_"
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gswitcher.d.ts 

//////////////////////////////////////////////////////////////////////////
// gswitcher
//////////////////////////////////////////////////////////////////////////
interface GSwitcherEffect<TOptions> {
    initialize($element: JQuery, items: JQuery[], settings: TOptions): void
    transition($element: JQuery, items: JQuery[], settings: TOptions): void
    destroy($element: JQuery, items: JQuery[], settings: TOptions): void
}

interface GSwitcherEffectOptions {
    /**
     * Axis of animation movement.
     * @default "horizontal"
     */
    axis?: string,
    /**
     * Speed of animation in ms.
     * @default 500
     */
    speed?: number,
    /**
     * Should hidden items remain in DOM or should they be detached?
     * @default false
     */
    keepHiddenItemsInDOM?: boolean,
    /*** */
    perspective?: string;
}

interface GSwitcherOptions extends Gordic.Widget.WidgetOptions {
    /**
     * Array of elements to display and switch
     */
    items: JQuery[] | HTMLElement[],
    /**
     * Gordic.Prefabs.Effects.slide or Gordic.Prefabs.Effects.flip
     */
    animator: GSwitcherEffect<GSwitcherEffectOptions>,
    /**
     * Parameters of animator
     */
    animatorParams?: GSwitcherEffectOptions,
    /**
     * Which item is shown as first.
     * @default 0
     */
    initialItemIndex?: number,

}

interface JQuery {
    /**
     * Widget for switching elements with animation.
     * @author VMaca
     * 
     *
     * @example <caption>Single switch of item:</caption>
     * ```typescript
     * //testDiv should be in DOM, otherDiv doesn't need to be
     * $testDiv.gswitcher({
     *   items: [$testDiv, $otherDiv],
     *   animator: Gordic.Prefabs.Effects.flip,
     *
     *   transitioncompleted: function (ev, data) {
     *     data.element.gswitcher("destroy");
     *   }
     * }).gswitcher("showNext");
     * ```
     *
     * @example <caption>Switch sections in form:</caption>
     * ```typescript
     *  var sectionItems = [$(testForm).findFormSections("sidlo1"), $(testForm).findFormSections("sidlo2")];
     *  $("<div id='my-switcher-section'></div>").gswitcher({
     *      items: sectionItems,
     *      animator: Gordic.Prefabs.Effects.slide,
     *      animatorParams: {
     *        axis: 'horizontal',
     *        speed: '300',
     *        keepHiddenItemsInDOM: false
     *      },
     *      initialItemIndex: 0
     *  });
     *
     * $("#my-switcher-section").gswitcher("showNext");
     * ```
     *
     * @example <caption>Change multiple fields for one - needs covering div:</caption>
     * ```typescript
     * var fieldItems = [
     *      $("<div></div>").append($(testForm).findFields("m_oTitulPred, m_oJmeno, m_oPrijmeni, m_oTitulZa ")),
     *      $(testForm).findFields("m_oSingleInputName")
     * ];
     *
     *  $("<div id='my-switcher-field'></div>").gswitcher({
     *      items: fieldItems,
     *      animator: Gordic.Prefabs.Effects.slide,
     *      animatorParams: {
     *          axis: 'horizontal',
     *          speed: '300',
     *          keepHiddenItemsInDOM: false
     *      },
     *      initialItemIndex: 0
     *  });
     *
     * $("#my-switcher-field").gswitcher("showNext");
     * ```
     *
     * @param {GSwitcherOptions} options
     */
    gswitcher(options: GSwitcherOptions): JQuery
    /**
     * Shows next item / Shows previous item
     * @param {"showNext" | "showPrev"} method
     */
    gswitcher(method: "showNext" | "showPrev"): JQueryPromise<undefined>

    /**
     * Shows item identified by index of selector string.
     * @param {"showItem"} method
     * @param {number | string} selector if number -> index into items otherwise find item by selector.
     * @param {boolean} [reverse=true] forward or reverse animation
     */
    gswitcher(method: "showItem", selector: number | string, reverse?: boolean): JQueryPromise<undefined>
    gswitcher(method: "updateAnimator", animatorOptions: GSwitcherEffectOptions): JQueryPromise<undefined>
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gnotification.d.ts 

//////////////////////////////////////////////////////////////////////////
// gnotification
//////////////////////////////////////////////////////////////////////////

interface IGNotificationProgress {

    /**
    * Aktualni hodnota
    * @default 0
    */
    current: number;

    /**
    * Maximalni hodnota
    * @default 100
    */
    total: number;

    /** Text k danemu kroku progressu */
    text?: string;

    //Mozna do budoucna
    //isCancellable: boolean;
}

interface IGNotificationOptions {
    /** ID notifikace (pro pripadne dohledavani, musi byt unikatni) */
    id?: string;

    /** Vlastni nazev pro pripadne pozdejsi dohledani (nemusi byt unikatni) */
    name?: string;

    /** Nazev skupiny */
    group?: string;

    /** Titulek */
    title?: string;

    /** Obsah notifikace */
    content?: string | object;

    /** Pokud je obsahem notifikace plainObject, jedna se o sablonu pro slozeny (collapsed) stav */
    shortTemplate?: string;

    /** Pokud je obsahem notifikace plainObject, jedna se o sablonu v rozlozenem (expanded) stavu */
    fullTempate?: string;

    /** Vlastni metainformace zobrazene v expanded stavu*/
    meta?: string;

    /**
    * Ikona oznameni
    * @default gi-radio
    */
    icon?: string;

    /** Akce, ktera se spusti kliknutim na obsah */
    defaultAction?: GAction;

    /** Akce do commandBaru */
    commandBar?: MenuParams[] | null;

    /** Datum a cas zobrazovany v meta-casti */
    dateTime?: Date;

    /**
    * Ma byt oznameni viditelne
    * @default true
    */
    isVisible?: boolean;

    /**
    * Ma byt oznameni slozene?
    * @default true
    */
    isCollapsed?: boolean;

    /**
    * Ma byt oznameni oznacene jako prectene?
    * @default false
    */
    isVisited?: boolean;

    /** Prubeh zpracovani */
    progress?: IGNotificationProgress | null;

    /** Stav oznameni */
    state?: GState;

    /** Udalost na nejakou zmenu */
    change?: (ev: JQueryEventObject, args: { id: string, options: IGNotificationOptions }) => void;

    //actionStarted?: ((ev: JQuery.Event) => void); //Byla spustena defaultAction notifikace (internal - nechci aby plnili autori koncovych modulu)

    /** Notifikace byla zavrena */
    close?: JQueryEventListener;

    /** Zdroj, ktery notifikaci vyvolal */
    source?: HTMLElement | JQuery;

    /** Mod zobrazeni */
    mode?: "full" | "toast" | "pinned";

    /** Badge notifikace */
    badge?: GBadgeOptions;
}

interface IGObservableNotificationOptions extends IGNotificationOptions {
    /** Objekt, pres ktery lze provadet update notifikace */
    observable?: GObservableObject<IGNotificationOptions>;
}

interface JQuery {

    gnotification(options: IGObservableNotificationOptions): JQuery;

    /** Slozi oznameni */
    gnotification(method: "collapse"): JQuery;

    /** Rozlozi oznameni */
    gnotification(method: "expand"): JQuery;

    /** Rozlozi nebo slozi oznameni podle sveho aktualniho stavu (option.isCollapsed) */
    gnotification(method: "toggle"): JQuery;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gnotificationlist.d.ts 

//////////////////////////////////////////////////////////////////////////
// gnotificationlist
//////////////////////////////////////////////////////////////////////////

interface IGNotificationListOptions {
    /** Seznam oznameni */
    notifications?: IGObservableNotificationOptions[];

    /** Zpusob razeni oznameni */
    sort?: "chrono" | "groups";

    /** Udalost zmeny */
    change?: (ev: JQueryEventObject,
        args: {
            type: "add" | "update" | "remove",
            id: string,
            options: IGNotificationOptions
        }) => void;

    /** Je pozadovan refresh, doslo k prekresleni */
    refreshrequested?: (ev: JQueryEventObject) => void;

    /** Cil, kam jsou smerovany animace (notification.source) */
    destination?: HTMLElement | JQuery;

    /** Byla spustena 'defaultAction' na nektere z notifikaci. */
    actionStarted?: ((ev: JQuery.Event) => void);
}

type GNotificationListCommand = "add" | "refresh" | "showToast" | "get" | "setAll" | "setAllVisited" | "setAllHidden"
                                | "setAllVisible" | "findByFilter" | "findById" | "findByName";

interface IGNotificationToastOptions {

    /** Ma byt toast videt? Default=true */
    visible?: boolean;

    /** Jak dlouho ma byt toast viditelny? (v sekundach) */
    delay?: number;
}

type GObservableNotificationOptions = GObservableObject<IGNotificationOptions>;

interface JQuery {
    gnotificationlist(options: IGNotificationListOptions): JQuery;

    /** Prekresleni obsahu seznamu oznameni */
    gnotificationlist(method: "refresh"): JQuery;

    /** Pridani noveho oznameni */
    gnotificationlist(method: "add", not: IGNotificationOptions, showToast?: boolean | IGNotificationToastOptions, forceRefresh?: boolean): IGObservableNotificationOptions;

    /** Zobrazeni toastu bez zarazeni do seznamu notifikaci */
    gnotificationlist(method: "showToast", not: IGNotificationOptions, options?: IGNotificationToastOptions): JQuery;

    /** Ziskani seznamu vsech oznameni */
    gnotificationlist(method: "get"): GObservableNotificationOptions[];

    /** 
    * Ziskani seznamu vsech oznameni
    * @param isNew true = vrati seznam oznameni, ktera jeste nebyla uzivatelem odklepnuta jako zobrazena, false = vrati seznam odklepnutych jako zobrazenych.
    */
    gnotificationlist(method: "get", isNew: boolean): GObservableNotificationOptions[];


    /** 
    * Ziskani seznamu vsech oznameni
    * @param filter funkce k profiltrovani notifikaci
    */
    gnotificationlist(method: "get", filter: (n: GObservableNotificationOptions) => boolean): GObservableNotificationOptions[];

    /** Vyvola update vsem notifikacim a nastavi jim parametr options */
    gnotificationlist(method: "setAll", options: IGNotificationOptions): JQuery;

    /** Oznaci vsechna oznameni jak prectena */
    gnotificationlist(method: "setAllVisited"): JQuery;

    /** Schova vsechna oznameni */
    gnotificationlist(method: "setAllHidden"): JQuery;

    /** Zobrazi vsechna oznameni */
    gnotificationlist(method: "setAllVisible"): JQuery;

    /** Odstrani oznameni z widgetu i z DOM */
    gnotificationlist(method: "remove", id: string | GObservableNotificationOptions): JQuery;

    /** Vrati seznam definic oznameni podle filtru */
    gnotificationlist(method: "findByFilter", filter: (n: GObservableNotificationOptions) => boolean): GObservableNotificationOptions[];

    /** Nalezeni definice oznameni podle ID */
    gnotificationlist(method: "findById", id: string): GObservableNotificationOptions | null;

    /** Nalezeni definic oznameni podle name */
    gnotificationlist(method: "findByName", name: string): GObservableNotificationOptions[];

    /** Zastavi vsechny animace vsech probihajicich toastu */
    gnotificationlist(method: "clearToasts"): JQuery;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\gdatecombobox.d.ts 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        gordic.gdatecombobox.d.ts									                            </Name>
//    <Description> intervalové (datumové) políčko s textovou nabídkou (dnes, tento týden, minulý rok,...)  </Description>
//    <Author>      thazmuka													                            </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2019							                            </Copyright>
//    <Created>     2019-04-23													                            </Created>
//  </FileHeader>

/** nastavení kalendářové komponenty (gdatepicker) */


interface JQuery {
    /** intervalové (datumové) políčko s textovou nabídkou (dnes, tento týden, minulý rok,...) */
    gdatecombobox(options: Gordic.Gui.WebControls.IGDateComboBoxOptions): JQuery;
    /**
     * políčko kalendářové komponenty
     * @param opt nastavení
     */
    gdatepicker(opt: IGDatePickerOpt): JQuery;
    gdatepicker(method: "focus"): JQuery;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\AsyncTasks\GAsyncInitDto.d.ts 

declare namespace Gordic.Gui.WebControls {
	/**Incializacni dto pro async. ulohy*/
	interface GAsyncInitDto {
		/**ixs_fun*/
		ixs_fun?: string|null;
		/**Lze pouzit SignalR?*/
		isSignalRAvailable?: boolean|null;
		/**Id relace*/
		relationId?: string|null;
		/**TOTP token*/
		totp?: string|null;
	}
	const enum GAsyncInitDtoNames { ixs_fun = "ixs_fun", isSignalRAvailable = "isSignalRAvailable", relationId = "relationId", totp = "totp",}
	const enum GAsyncInitDtoFragments { ixs_fun = "*", isSignalRAvailable = "*", relationId = "*", totp = "*",}
	const enum GAsyncInitDtoTypes { ixs_fun = "string", isSignalRAvailable = "boolean", relationId = "string", totp = "string",}
	const enum GAsyncInitDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\GLog\GLogMessageRequestDto.d.ts 

declare namespace Gordic.Gui.WebControls {
    /**Request k zalogovani*/
    interface GLogMessageRequestDto {
        /**Seznam zprav*/
        messages: Gordic.General.ApplicationInterface.GLogMessageDto[];
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\GLog\GLogEventDto.d.ts 

declare namespace Gordic.Gui.WebControls {
	/**Zalogovana udalost (pro moznost zobrazeni v JS)*/
	interface GLogEventDto {
		/**Index*/
		index: number;
		/**Nazev loggeru*/
		logger: string;
		/**Datum a cas udalosti*/
		dateTime: JsonDate;
		/**Uroven logu*/
		logLevel: number;
		/**Obsah logovaci zpravy*/
		message: Gordic.General.GRawString;
		/**Uzivatel (nazevRf)*/
		user: string;
		/**IxsLpc*/
		ixslpc: string;
		/**Dalsi data (vlozena pri logovani v JS)*/
		data?: object|null;
		/**ID threadu, na kterem bylo zalogovano*/
		threadId?: string|null;
	}
	const enum GLogEventDtoNames { index = "index", logger = "logger", dateTime = "dateTime", logLevel = "logLevel", message = "message", user = "user", ixslpc = "ixslpc", data = "data", threadId = "threadId",}
	const enum GLogEventDtoFragments { index = "*", logger = "*", dateTime = "*", logLevel = "*", message = "*", user = "*", ixslpc = "*", data = "*", threadId = "*",}
	const enum GLogEventDtoTypes { index = "number", logger = "string", dateTime = "JsonDate", logLevel = "number", message = "Gordic.General.GRawString", user = "string", ixslpc = "string", data = "object", threadId = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\GLog\GLogInitDto.d.ts 

declare namespace Gordic.Gui.WebControls {
	/**Inicializacni konfigurace pro GLog*/
	interface GLogInitDto {
		/**Vychozi uroven pro ServerConnector*/
		serverConnectorDefaultLevel?: Gordic.General.ApplicationInterface.GLogLevel|null;
	}
	const enum GLogInitDtoNames { serverConnectorDefaultLevel = "serverConnectorDefaultLevel",}
	const enum GLogInitDtoFragments { serverConnectorDefaultLevel = "*",}
	const enum GLogInitDtoTypes { serverConnectorDefaultLevel = "Gordic.General.ApplicationInterface.GLogLevel",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\UserSettingsForms.d.ts 

//declare namespace Utils {
//        class UserSettingsForms { 

//            /**
//             * funkce pro registraci formulářú do uživatelského nastavení
//             * 
//             * @param {Gordic.Forms.Form | Gordic.Forms.Form[]} addedFormArray formulář, nebo pole formulářů
//             */
//            public register(addedFormArray: Gordic.Forms.Form | Gordic.Forms.Form[]): void

//            /**
//             * vrátí všechny registrované formuláře
//             * 
//             * @returns {Gordic.Forms.Form[]}
//             */
//            public get(): Gordic.Forms.Form[]

//            /**
//             * vrátí zaregistrované formuláře dle name formuláře
//             * 
//             * @param {string | string[]} nameArray name formulářů
//             */
//            public getByName(nameArray: string | string[]): Gordic.Forms.Form[]

//            /**
//             * odstranění zaregistrovaných formuláčů
//             * 
//             * @param {string | string[]} removeNameArray name formulářu, které se mají odstranit
//             */
//            public removeByName(removeNameArray: string | string[]): void

//        }
    
//}

declare namespace Gordic.WebApp.globalSettingForms {

        //export const globalSettingForms: Gordic.Utils.UserSettingsForms

        /**
        * funkce pro registraci formulářú do uživatelského nastavení
        * 
        * @param {Gordic.Forms.Form | Gordic.Forms.Form[]} addedFormArray formulář, nebo pole formulářů
        */
        export function register(addedFormArray: Gordic.Forms.Form | Gordic.Forms.Form[]): void

        /**
         * vrátí všechny registrované formuláře
         * 
         * @returns {Gordic.Forms.Form[]}
         */
        export function get(): Gordic.Forms.Form[]

        /**
        * vrátí zaregistrované formuláře dle name formuláře
        * 
        * @param {string | string[]} nameArray name formulářů
        */
        export function getByName(nameArray: string | string[]): Gordic.Forms.Form[]

        /**
        * odstranění zaregistrovaných formuláčů
        * 
        * @param {string | string[]} removeNameArray name formulářu, které se mají odstranit
        */
        export function removeByName(removeNameArray: string | string[]): void
    
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\ServiceContents\DTO\GSelectorSettingsDto.d.ts 

declare namespace Gordic.Gui.WebControls {
	/**DTO pro nastavení selectorů*/
	interface GSelectorSettingsDto {
		/**Nastavení pro export dat v gridu*/
		allowExportData?: boolean|null;
	}
	const enum GSelectorSettingsDtoNames { allowExportData = "allowExportData",}
	const enum GSelectorSettingsDtoFragments { allowExportData = "*",}
	const enum GSelectorSettingsDtoTypes { allowExportData = "boolean",}
	const enum GSelectorSettingsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\Scripts\GAsync.d.ts 

declare namespace Gordic.Async {
    export const enum GTaskState {
        default = -1,
        created = 0,
        running = 1,
        ranToCompletion = 2,
        cancelled = 3,
        faulted = 4,
        disposed = 5,
        cancelSignalized = 6,
        inactive = 7
    }

    export interface IGTaskContextBase {
        /** Task */
        readonly task: Readonly<IGTask>;

        /** Akt. stav ulohy */
        readonly state: GTaskState;

        /** Zda tento objekt nejak zpracoval nejaky predchozi handler */
        handled: boolean;
    }

    /** Kontext akt. stavu asynchronni ulohy */
    export interface IGTaskContext<TResult> extends IGTaskContextBase {
        /** Vysledek */
        readonly result: TResult;
    }

    /** Hodnota zpracovani (k podedeni k pripadnemu vlastnimu zpracovani) */
    export interface IGTaskProgress extends Gordic.General.ApplicationInterface.GAsyncProgressDto {
    }

    export interface IGTaskContextProgress<TProgress extends IGTaskProgress> extends IGTaskContextBase {
        /** Posledni znamy prubeh */
        readonly progress: TProgress;
    }

    export interface IGTaskContextFail extends IGTaskContextBase {
        /** Vyjimka vznikla pri zpracovani */
        readonly exception: IGExceptionInfo;
    }

    export interface IGTaskOptions {
        /**
        *   je-li true - uz nas nic nezajima a po ukonceni se provede automaticky uklid (default = false)
        *   @default false
        */
        clearOnFinish?: boolean;

        /**
        *   je-li true - po ziskani vysledku se automaticky provede clean
        *   @default false
        */
        autoClean?: boolean;

        /** Kontext */
        parentContent?: GContent;
    }

    /** Request */
    export interface GAsyncRequestDto {
        /** Nazev serverove tridy implementujici v C# GAsyncTaskBase */
        className: string;

        /** Vstup */
        customDto: any;

        /** Id tasku */
        id: string;

        /** Provest uvolneni prostredku na serveru po dobehnuti ulohy */
        clearOnFinish: boolean;
    }

    /** Response */
    export interface GAsyncResponseDto extends GAsyncRequestDto {
        state: GTaskState;
        progress?: IGTaskProgress;
        exception?: GJQExceptionResult;
        result?: any;
        version: number;
        lastChange: string | Date;
        description: string | null;
        category: string;
        isPersistent?: boolean;
        isCancellable: boolean;
    }

    export interface IGTaskVersionFilter {
        id: string;
        version: number;
        isPersistent?: boolean;
        state: GTaskState;
    }

    export interface GJQExceptionResult { //Ekv C# GJQExceptionResult
        exception?: IGExceptionInfo;
    }

    export type GTaskContext<TProgress extends IGTaskProgress, TResult> = IGTaskContext<TResult> & IGTaskContextProgress<TProgress> & IGTaskContextFail;

    export interface IGTask {
        /** ID ulohy */
        readonly id: string;

        /** Nazev tridy, ktera dedi od GAsyncTaskBase (C#) */
        readonly className: string;

        /** Uzivatelsky popis async. ulohy */
        readonly description: string | null;

        /** Kategorie (nastavuje server) */
        category: string;

        /** Vstupni DTO */
        customDto: any;

        /** Aktualni verze tasku (pro potreby synchronizace server->client) */
        version: number;

        /** Aktualni stav ulohy */
        state: GTaskState;

        /** Posledni znamy prubeh zpracovani */
        progress?: IGTaskProgress;

        /** Vysledek zpracovani */
        result?: any;

        /** Vyjimka vzniknuta pri zpracovani */
        exceptionInfo?: GJQExceptionResult;

        /** Cas posledni zmeny (stavu, progres, ...) */
        lastChange?: Date;

        /** Muze byt opetovne nastartovana? */
        canBeRepeated?: boolean;

        /**
         * Signalizuje serveru cancel, ten na nej muze nebo nemusi reagovat + vyhodi udalost 'cancelRequested'.
         * @param {boolean} clean Je-li true, po cancel se zavola automaticky 'clean' (odstraneni zdroju na serveru).
         */
        cancel(clean?: boolean): this;

        /**
         * Uvolni serverove zdroje (je-li to mozne).
         */
        clean(): this;

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

        /**
        * Zaregistrovani obsluzne udalosti
        * @param evName nazev udalosti, muze obsahovat namespace. Pripadne lze pouzit i pouze handler, v tom pripade se bude volat na udalost 'change'
        * @param evHandler obsluha udalosti
        */
        on(eventName: string, handler: (this: IGTask, ctx: GTaskContext<IGTaskProgress, any>, args: any) => void): void;

        /**
         * Odregistrovani udalosti. Volano bez argumentu = odregistrovat vsechno. Volano s 1. argumentem zacinajicim teckou, odregistruje cely namespace.
         * @param evName - nazev udalosti nebo namespace udalosti (napr. 'change', '.mujNamespace', 'change.mujNamespace')
         * @param handler - instance event handleru
         */
        off(eventName: string, handler: (this: IGTask, ctx: GTaskContext<IGTaskProgress, any>, args: any) => void): void;

        /** Nastavi objekt k rizeni notifikace */
        setNotification(notification: GObservableObject<IGNotificationOptions>): this;

        /** Vrati obekt k rizeni notifikace */
        getNotification(): GObservableObject<IGNotificationOptions>;

        /** Obsahuje objekt k rizeni notifikace? */
        hasNotification(): boolean;

        /** Vymazani notifikace */
        clearNotification(): void;

        /** Vrati aktualni stav jako string. */
        getStateString(): string;
    }

    export type GTaskPromise<TSuccess, TFail, TProgress> = JQuery.Promise3<
        TSuccess, TFail, TProgress,
        never, never, never,
        never, never, never>;

    export type GTaskManagerFilter = (task: IGTask) => boolean;

    export interface IGTypedTask<TProgress extends IGTaskProgress, TResult> extends IGTask {
        /** Posledni znamy prubeh zpracovani */
        readonly progress?: TProgress;

        /** Vysledek zpracovani (po dokonceni) */
        readonly result?: TResult;

        getPromise(): GTaskPromise<IGTaskContext<TResult>, IGTaskContextFail, IGTaskContextProgress<TProgress>>;
    }

    export interface IGTaskManagerProxy {
        /**
         * Nastartovani async. ulohy v kontextu tohoto contentu.
         * @param className Nazev tridy (C#) implementujici GAsyncTask, GAsyncTaskServer nebo GAsyncTaskAppServer vc namespace (napr. "Gordic.Uka.WebClient.G01HelloWorldAsyncTask")
         * @param customDto Vstup asynchronni ulohy
         * @param taskOptions Vlastni options
         * @returns Promise s vlastni instanci GTask k rizeni behu async. ulohy na serveru nebo null, pokud to neni podporovano.
        */
        start<TResult extends any>(className: string, customDto: any, taskOptions?: IGTaskOptions)
            : GTaskPromise<IGTaskContext<TResult>, IGTaskContextFail, IGTaskContextProgress<IGTaskProgress>> | null;

        /**
         * Registrace obsluhy udalosti pro vybrane ulohy dle filtru. Pozor: je GLOBALNI (neni pouze content-only)!!!
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
        on<TResult>(evName: string, filter: string | GTaskManagerFilter, evHandler: ((this: IGTask, ctx: GTaskContext<IGTaskProgress, TResult>, args: any) => void)): void;
        on<TProgress extends IGTaskProgress, TResult>(evName: string, filter: string | GTaskManagerFilter, evHandler: ((this: IGTask, ctx: GTaskContext<TProgress, TResult>, args: any) => void)): void;

        /**
         * Odregistrovani obsluhy udalosti. Pozor: je GLOBALNI (neni pouze content-only)!!!
         * Varianty:
         * .off()          - odregistruje uplne vsechno
         * .off("change")  - odregistruje vsechny handlery na udalost 'change'
         * .off("change.myNamespace") - odregistruje pouze udalost 'change' v namespace 'myNamespace'
         * .off(".myNamespace") - odregistruje vsechny typy udalosti v namespace 'myNamespace'
         * @param evName Nazev, volitelne muze obsahovat namespace
         * @param evHandler Odkaz na ev. handler
         */
        off<TResult>(evName: string, evHandler?: ((this: IGTask, ctx: GTaskContext<IGTaskProgress, TResult>, args: any) => void)): void;
        off<TProgress extends IGTaskProgress, TResult>(evName: string, evHandler?: ((this: IGTask, ctx: GTaskContext<TProgress, TResult>, args: any) => void)): void;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\PublicLogin\Dto\GForgottenPasswordRequestFormDto.d.ts 

declare namespace Gordic.Gui.WebControls {
    /**Data formuláře pro obnovu zapomenutého hesla.*/
	interface GForgottenPasswordRequestFormDto {
        /**Uživatelské jméno.*/
		uzivatelskeJmeno?: string|null;
        /**reCaptcha token.*/
		reCaptchaToken?: string|null;
	}
	const enum GForgottenPasswordRequestFormDtoNames { uzivatelskeJmeno = "uzivatelskeJmeno", reCaptchaToken = "reCaptchaToken",}
	const enum GForgottenPasswordRequestFormDtoFragments { uzivatelskeJmeno = "*", reCaptchaToken = "*",}
	const enum GForgottenPasswordRequestFormDtoTypes { uzivatelskeJmeno = "string", reCaptchaToken = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\PublicLogin\Dto\GChangePasswordFormDto.d.ts 

declare namespace Gordic.Gui.WebControls {
    /**DTO Formuláře pro změnu hesla.*/
	interface GChangePasswordFormDto {
        /**Původní (aktuální) heslo.*/
		puvodniHeslo?: string|null;
        /**Nové heslo.*/
		heslo?: string|null;
        /**Ověření nového hesla.*/
		overeniHesla?: string|null;
	}
	const enum GChangePasswordFormDtoNames { puvodniHeslo = "puvodniHeslo", heslo = "heslo", overeniHesla = "overeniHesla",}
	const enum GChangePasswordFormDtoFragments { puvodniHeslo = "*", heslo = "*", overeniHesla = "*",}
	const enum GChangePasswordFormDtoTypes { puvodniHeslo = "string", heslo = "string", overeniHesla = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\PublicLogin\Dto\GNewPasswordFormDto.d.ts 

declare namespace Gordic.Gui.WebControls {
    /**DTO formuláře pro nové heslo.*/
	interface GNewPasswordFormDto {
        /**Nové heslo.*/
		heslo?: string|null;
        /**Ověření nového hesla.*/
		overeniHesla?: string|null;
        /**reCaptcha token.*/
		reCaptchaToken?: string|null;
	}
	const enum GNewPasswordFormDtoNames { heslo = "heslo", overeniHesla = "overeniHesla", reCaptchaToken = "reCaptchaToken",}
	const enum GNewPasswordFormDtoFragments { heslo = "*", overeniHesla = "*", reCaptchaToken = "*",}
	const enum GNewPasswordFormDtoTypes { heslo = "string", overeniHesla = "string", reCaptchaToken = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\PublicLogin\Dto\GPublicLoginConfigDto.d.ts 

declare namespace Gordic.Gui.WebControls {
	/**Parametry pro konfiguraci registračního formuláře.*/
	interface GPublicLoginConfigDto {
		/**The default org*/
		defaultOrg?: Gordic.Gui.WebControls.GPublicLoginConfigDefaultOrgDto|null;
		/**The fields to hide*/
		fieldsToHide?: Gordic.Gui.WebControls.GPublicLoginConfigFieldsToHideDto|null;
		allowedValues?: Gordic.Gui.WebControls.GPublicLoginConfigAllowedValuesDto|null;
		/**Uživatelsky nastavitelsné texty.*/
		text?: Gordic.Gui.WebControls.GPublicLoginConfigTextDto|null;
		/**Příznak, zda se mají zobrazovat placeHoldery políček v registračním formuláři.*/
		showPlaceholders?: boolean|null;
		/**Úroveň přísnosti kontroly adresy pomocí RUIAN v registračním formuláři.*/
		ruianControlLevel?: Gordic.Gui.WebControls.GPublicLoginConfigRuianControlLevelEnum|null;
		/**Příznak, zda je nutné vyplnit telefonní číslo.*/
		isPhoneNumberRequired?: boolean|null;
		/**Nápověda řádku telefonního čísla. Slouží především ke sdělení proč zadávat telefonní číslo.*/
		phoneNumberHint?: string|null;
		/**(Default: true) Příznak, zda je nutné vyplnit jméno a příjmení pro změnu osobních údajů.*/
		isNameAndSurnameRequiredForEdit?: boolean|null;
		/**(Default: false) Příznak, zda je možné zadat pouze IČ a zbytek údajů načíct pouze z ARES [true] a nebo uživatel může sám zadat i ostatní údaje.*/
		pripojeniNovehoUctuPouzeIC?: boolean|null;
	}
	const enum GPublicLoginConfigDtoNames { defaultOrg = "defaultOrg", fieldsToHide = "fieldsToHide", allowedValues = "allowedValues", text = "text", showPlaceholders = "showPlaceholders", ruianControlLevel = "ruianControlLevel", isPhoneNumberRequired = "isPhoneNumberRequired", phoneNumberHint = "phoneNumberHint", isNameAndSurnameRequiredForEdit = "isNameAndSurnameRequiredForEdit", pripojeniNovehoUctuPouzeIC = "pripojeniNovehoUctuPouzeIC",}
	const enum GPublicLoginConfigDtoFragments { defaultOrg = "*", fieldsToHide = "*", allowedValues = "*", text = "*", showPlaceholders = "*", ruianControlLevel = "*", isPhoneNumberRequired = "*", phoneNumberHint = "*", isNameAndSurnameRequiredForEdit = "*", pripojeniNovehoUctuPouzeIC = "*",}
	const enum GPublicLoginConfigDtoTypes { defaultOrg = "Gordic.Gui.WebControls.GPublicLoginConfigDefaultOrgDto", fieldsToHide = "Gordic.Gui.WebControls.GPublicLoginConfigFieldsToHideDto", allowedValues = "Gordic.Gui.WebControls.GPublicLoginConfigAllowedValuesDto", text = "Gordic.Gui.WebControls.GPublicLoginConfigTextDto", showPlaceholders = "boolean", ruianControlLevel = "Gordic.Gui.WebControls.GPublicLoginConfigRuianControlLevelEnum", isPhoneNumberRequired = "boolean", phoneNumberHint = "string", isNameAndSurnameRequiredForEdit = "boolean", pripojeniNovehoUctuPouzeIC = "boolean",}
	const enum GPublicLoginConfigDtoTypeLengths {}
	interface GPublicLoginConfigDefaultOrgDto {
		/**The pravnicka osoba*/
		pravnickaOsoba?: number|null;
		/**The fyzicka osoba*/
		fyzickaOsoba?: number|null;
		/**The fyzicka osoba osvc*/
		fyzickaOsobaOsvc?: number|null;
	}
	const enum GPublicLoginConfigDefaultOrgDtoNames { pravnickaOsoba = "pravnickaOsoba", fyzickaOsoba = "fyzickaOsoba", fyzickaOsobaOsvc = "fyzickaOsobaOsvc",}
	const enum GPublicLoginConfigDefaultOrgDtoFragments { pravnickaOsoba = "*", fyzickaOsoba = "*", fyzickaOsobaOsvc = "*",}
	const enum GPublicLoginConfigDefaultOrgDtoTypes { pravnickaOsoba = "number", fyzickaOsoba = "number", fyzickaOsobaOsvc = "number",}
	const enum GPublicLoginConfigDefaultOrgDtoTypeLengths {}
	interface GPublicLoginConfigFieldsToHideDto {
		/**The pravnicka osoba*/
		pravnickaOsoba?: string|null;
		/**The fyzicka osoba*/
		fyzickaOsoba?: string|null;
		/**The fyzicka osoba osvc*/
		fyzickaOsobaOsvc?: string|null;
		/**The neurceno*/
		neurceno?: string|null;
	}
	const enum GPublicLoginConfigFieldsToHideDtoNames { pravnickaOsoba = "pravnickaOsoba", fyzickaOsoba = "fyzickaOsoba", fyzickaOsobaOsvc = "fyzickaOsobaOsvc", neurceno = "neurceno",}
	const enum GPublicLoginConfigFieldsToHideDtoFragments { pravnickaOsoba = "*", fyzickaOsoba = "*", fyzickaOsobaOsvc = "*", neurceno = "*",}
	const enum GPublicLoginConfigFieldsToHideDtoTypes { pravnickaOsoba = "string", fyzickaOsoba = "string", fyzickaOsobaOsvc = "string", neurceno = "string",}
	const enum GPublicLoginConfigFieldsToHideDtoTypeLengths {}
	interface GPublicLoginConfigAllowedValuesDto {
		typEsu?: number[]|null;
	}
	const enum GPublicLoginConfigAllowedValuesDtoNames { typEsu = "typEsu",}
	const enum GPublicLoginConfigAllowedValuesDtoFragments { typEsu = "*",}
	const enum GPublicLoginConfigAllowedValuesDtoTypes { typEsu = "number[]",}
	const enum GPublicLoginConfigAllowedValuesDtoTypeLengths {}
	interface GPublicLoginConfigTextDto {
		/**Text s instrukcemi (nad tlačítkem "Registrovat").*/
		instructions?: string|null;
	}
	const enum GPublicLoginConfigTextDtoNames { instructions = "instructions",}
	const enum GPublicLoginConfigTextDtoFragments { instructions = "*",}
	const enum GPublicLoginConfigTextDtoTypes { instructions = "string",}
	const enum GPublicLoginConfigTextDtoTypeLengths {}
	/**Úroveň přísnosti kontroly adresy pomocí RUIAN v registračním formuláři.*/
	const enum GPublicLoginConfigRuianControlLevelEnum {
		/**Kontrola neprobíhá.*/
		None,
		/**Zobrazí varování v případě, že je adresa nevalidní.*/
		WaningIfInvalid,
		/**Zobrazí chybu a zabrání registraci v případě, že je adresa nevalidní.*/
		ErrorIfInvalid,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\PublicLogin\Dto\GPublicUserDto.d.ts 

declare namespace Gordic.Gui.WebControls {
	/**DTO formuláře pro registraci veřejného uživatele.*/
	interface GPublicUserDto {
		/**The group registration*/
		GROUP_CORRECT_FORMAT?: string|null;
		/**The group registration*/
		GROUP_REGISTRATION?: string|null;
		/**The group registration*/
		GROUP_CHANGE?: string|null;
		/**The group registration*/
		GROUP_CHANGE_EXTERNAL_USER?: string|null;
		/**The group registration*/
		GROUP_BUSINESS?: string|null;
		/**The group registration*/
		GROUP_PERSONAL?: string|null;
		/**The group registration*/
		GROUP_COMPANY?: string|null;
		/**The group registration*/
		RE_LATIN_ONLY?: string|null;
		/**The group registration*/
		PO_BOX?: string|null;
		/**The group registration*/
		PSC?: string|null;
		/**The group registration*/
		CISLO_ORIENTACNI?: string|null;
		/**The group registration*/
		CISLO_POPISNE?: string|null;
		/**Uživatelské jméno.*/
		uzivatelskeJmeno?: string|null;
		/**Příznak že email je použitý jako login.*/
		emailAsLogin?: boolean|null;
		/**Email.*/
		email?: string|null;
		/**Heslo.*/
		heslo?: string|null;
		/**Oveření hesla.*/
		overeniHesla?: string|null;
		/**Kontrolní otázka.*/
		kontrolniOtazka?: string|null;
		/**Kontrolní odpověď.*/
		kontrolniOdpoved?: string|null;
		/**Typ subjektu.*/
		typEsu?: Gordic.Ginis.DbModel.GGincesuEnum|null;
		/**Právní forma.*/
		typOrg?: number|null;
		/**Obchodní jméno.*/
		obchodniJmeno?: string|null;
		/**IČ.*/
		ic?: string|null;
		/**DIČ.*/
		dic?: string|null;
		/**Titul před jménem.*/
		titulPred?: string|null;
		/**Jméno.*/
		jmeno?: string|null;
		/**Příjmení.*/
		prijmeni?: string|null;
		/**Titul za jménem.*/
		titulZa?: string|null;
		/**Rodné číslo.*/
		rodneCislo?: string|null;
		/**Datum narození.*/
		datumNarozeni?: JsonDate|null;
		/**Funkce ve firmě.*/
		funkceVeFirme?: string|null;
		/**Telefon.*/
		telefon?: string|null;
		/**Fax.*/
		fax?: string|null;
		/**Ulice.*/
		ulice?: string|null;
		/**Číslo popisné.*/
		cPop?: string|null;
		/**Číslo orientační.*/
		cOr?: string|null;
		/**PSČ.*/
		psc?: string|null;
		/**Část obce.*/
		castObce?: string|null;
		/**Obec.*/
		obec?: string|null;
		/**P.O. Box.*/
		pobox?: string|null;
		/**Stát.*/
		stat?: number|null;
		/**Souhlas se zpracováním údajů.*/
		souhlasSeZpracovanimUdaju?: boolean|null;
		/**Příznak, zda se jedná o plátce DPH.*/
		IsVatPayer?: boolean|null;
		/**Příznak použití emailu pro notifikace.*/
		UseEmailNotifications?: boolean|null;
		/**Příznak použití telefonu pro notifikace.*/
		UseSmsNotifications?: boolean|null;
		/**Gets or sets the permissions.*/
		Permissions?: Gordic.Gui.WebControls.GPublicUserPermissionDto|null;
		/**Způsob registrace uživatele.*/
		RegistrationType?: Gordic.General.ApplicationInterface.PublicUserLoginRegistrationTypeEnum|null;
	}
	const enum GPublicUserDtoNames { GROUP_CORRECT_FORMAT = "GROUP_CORRECT_FORMAT", GROUP_REGISTRATION = "GROUP_REGISTRATION", GROUP_CHANGE = "GROUP_CHANGE", GROUP_CHANGE_EXTERNAL_USER = "GROUP_CHANGE_EXTERNAL_USER", GROUP_BUSINESS = "GROUP_BUSINESS", GROUP_PERSONAL = "GROUP_PERSONAL", GROUP_COMPANY = "GROUP_COMPANY", RE_LATIN_ONLY = "RE_LATIN_ONLY", PO_BOX = "PO_BOX", PSC = "PSC", CISLO_ORIENTACNI = "CISLO_ORIENTACNI", CISLO_POPISNE = "CISLO_POPISNE", uzivatelskeJmeno = "uzivatelskeJmeno", emailAsLogin = "emailAsLogin", email = "email", heslo = "heslo", overeniHesla = "overeniHesla", kontrolniOtazka = "kontrolniOtazka", kontrolniOdpoved = "kontrolniOdpoved", typEsu = "typEsu", typOrg = "typOrg", obchodniJmeno = "obchodniJmeno", ic = "ic", dic = "dic", titulPred = "titulPred", jmeno = "jmeno", prijmeni = "prijmeni", titulZa = "titulZa", rodneCislo = "rodneCislo", datumNarozeni = "datumNarozeni", funkceVeFirme = "funkceVeFirme", telefon = "telefon", fax = "fax", ulice = "ulice", cPop = "cPop", cOr = "cOr", psc = "psc", castObce = "castObce", obec = "obec", pobox = "pobox", stat = "stat", souhlasSeZpracovanimUdaju = "souhlasSeZpracovanimUdaju", IsVatPayer = "IsVatPayer", UseEmailNotifications = "UseEmailNotifications", UseSmsNotifications = "UseSmsNotifications", Permissions = "Permissions", RegistrationType = "RegistrationType",}
	const enum GPublicUserDtoFragments { GROUP_CORRECT_FORMAT = "*", GROUP_REGISTRATION = "*", GROUP_CHANGE = "*", GROUP_CHANGE_EXTERNAL_USER = "*", GROUP_BUSINESS = "*", GROUP_PERSONAL = "*", GROUP_COMPANY = "*", RE_LATIN_ONLY = "*", PO_BOX = "*", PSC = "*", CISLO_ORIENTACNI = "*", CISLO_POPISNE = "*", uzivatelskeJmeno = "*", emailAsLogin = "*", email = "*", heslo = "*", overeniHesla = "*", kontrolniOtazka = "*", kontrolniOdpoved = "*", typEsu = "*", typOrg = "*", obchodniJmeno = "*", ic = "*", dic = "*", titulPred = "*", jmeno = "*", prijmeni = "*", titulZa = "*", rodneCislo = "*", datumNarozeni = "*", funkceVeFirme = "*", telefon = "*", fax = "*", ulice = "*", cPop = "*", cOr = "*", psc = "*", castObce = "*", obec = "*", pobox = "*", stat = "*", souhlasSeZpracovanimUdaju = "*", IsVatPayer = "*", UseEmailNotifications = "*", UseSmsNotifications = "*", Permissions = "*", RegistrationType = "*",}
	const enum GPublicUserDtoTypes { GROUP_CORRECT_FORMAT = "string", GROUP_REGISTRATION = "string", GROUP_CHANGE = "string", GROUP_CHANGE_EXTERNAL_USER = "string", GROUP_BUSINESS = "string", GROUP_PERSONAL = "string", GROUP_COMPANY = "string", RE_LATIN_ONLY = "string", PO_BOX = "string", PSC = "string", CISLO_ORIENTACNI = "string", CISLO_POPISNE = "string", uzivatelskeJmeno = "string", emailAsLogin = "boolean", email = "string", heslo = "string", overeniHesla = "string", kontrolniOtazka = "string", kontrolniOdpoved = "string", typEsu = "Gordic.Ginis.DbModel.GGincesuEnum", typOrg = "number", obchodniJmeno = "string", ic = "string", dic = "string", titulPred = "string", jmeno = "string", prijmeni = "string", titulZa = "string", rodneCislo = "string", datumNarozeni = "JsonDate", funkceVeFirme = "string", telefon = "string", fax = "string", ulice = "string", cPop = "string", cOr = "string", psc = "string", castObce = "string", obec = "string", pobox = "string", stat = "number", souhlasSeZpracovanimUdaju = "boolean", IsVatPayer = "boolean", UseEmailNotifications = "boolean", UseSmsNotifications = "boolean", Permissions = "Gordic.Gui.WebControls.GPublicUserPermissionDto", RegistrationType = "Gordic.General.ApplicationInterface.PublicUserLoginRegistrationTypeEnum",}
	const enum GPublicUserDtoTypeLengths { obchodniJmeno = 254, titulPred = 35, jmeno = 100, prijmeni = 100, titulZa = 35, cPop = 8, cOr = 6, psc = 5, castObce = 48, obec = 48,}
	/**GPublicUserPermissionDto.*/
	interface GPublicUserPermissionDto {
		/**Příznak zda je možné editovat uživatelské jméno.*/
		CanEditUzivatelskeJmeno: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat použití emailu jako uživatelské jméno.*/
		CanEditEmailAsLogin: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat email.*/
		CanEditEmail: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat heslo.*/
		CanEditHeslo: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat kontrolní otázku.*/
		CanEditKontrolniOtazka: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat kontrolní odpověď.*/
		CanEditKontrolniOdpoved: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat typ subjektu.*/
		CanEditTypEsu: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat právní formu.*/
		CanEditTypOrg: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat obchodní jméno.*/
		CanEditObchodniJmeno: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat identifikační číslo - IČ(O).*/
		CanEditIc: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat DIČ.*/
		CanEditDic: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat titul před jménem.*/
		CanEditTitulPredJmenem: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat jméno.*/
		CanEditJmeno: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat příjmení.*/
		CanEditPrijmeni: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat titul za jménem.*/
		CanEditTitulZaJmenem: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat rodné číslo.*/
		CanEditRodneCislo: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat datum narození.*/
		CanEditDatumNarozeni: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat funkci ve firmě.*/
		CanEditFunkceVeFirme: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat telefon.*/
		CanEditTelefon: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat fax.*/
		CanEditFax: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat ulici.*/
		CanEditUlice: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat číslo popisné.*/
		CanEditCisloPopisne: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat číslo orientační.*/
		CanEditCisloOrientacni: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat PSČ.*/
		CanEditPsc: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat část obce.*/
		CanEditCastObce: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat obec.*/
		CanEditObec: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat P.O. Box.*/
		CanEditPoBox: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat stát.*/
		CanEditStat: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak zda je možné editovat příznak Plátce DPH.*/
		CanEditIsVatPayer: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPublicUserPermissionDtoNames { CanEditUzivatelskeJmeno = "CanEditUzivatelskeJmeno", CanEditEmailAsLogin = "CanEditEmailAsLogin", CanEditEmail = "CanEditEmail", CanEditHeslo = "CanEditHeslo", CanEditKontrolniOtazka = "CanEditKontrolniOtazka", CanEditKontrolniOdpoved = "CanEditKontrolniOdpoved", CanEditTypEsu = "CanEditTypEsu", CanEditTypOrg = "CanEditTypOrg", CanEditObchodniJmeno = "CanEditObchodniJmeno", CanEditIc = "CanEditIc", CanEditDic = "CanEditDic", CanEditTitulPredJmenem = "CanEditTitulPredJmenem", CanEditJmeno = "CanEditJmeno", CanEditPrijmeni = "CanEditPrijmeni", CanEditTitulZaJmenem = "CanEditTitulZaJmenem", CanEditRodneCislo = "CanEditRodneCislo", CanEditDatumNarozeni = "CanEditDatumNarozeni", CanEditFunkceVeFirme = "CanEditFunkceVeFirme", CanEditTelefon = "CanEditTelefon", CanEditFax = "CanEditFax", CanEditUlice = "CanEditUlice", CanEditCisloPopisne = "CanEditCisloPopisne", CanEditCisloOrientacni = "CanEditCisloOrientacni", CanEditPsc = "CanEditPsc", CanEditCastObce = "CanEditCastObce", CanEditObec = "CanEditObec", CanEditPoBox = "CanEditPoBox", CanEditStat = "CanEditStat", CanEditIsVatPayer = "CanEditIsVatPayer",}
	const enum GPublicUserPermissionDtoFragments { CanEditUzivatelskeJmeno = "*", CanEditEmailAsLogin = "*", CanEditEmail = "*", CanEditHeslo = "*", CanEditKontrolniOtazka = "*", CanEditKontrolniOdpoved = "*", CanEditTypEsu = "*", CanEditTypOrg = "*", CanEditObchodniJmeno = "*", CanEditIc = "*", CanEditDic = "*", CanEditTitulPredJmenem = "*", CanEditJmeno = "*", CanEditPrijmeni = "*", CanEditTitulZaJmenem = "*", CanEditRodneCislo = "*", CanEditDatumNarozeni = "*", CanEditFunkceVeFirme = "*", CanEditTelefon = "*", CanEditFax = "*", CanEditUlice = "*", CanEditCisloPopisne = "*", CanEditCisloOrientacni = "*", CanEditPsc = "*", CanEditCastObce = "*", CanEditObec = "*", CanEditPoBox = "*", CanEditStat = "*", CanEditIsVatPayer = "*",}
	const enum GPublicUserPermissionDtoTypes { CanEditUzivatelskeJmeno = "Gordic.General.ApplicationInterface.GPermission", CanEditEmailAsLogin = "Gordic.General.ApplicationInterface.GPermission", CanEditEmail = "Gordic.General.ApplicationInterface.GPermission", CanEditHeslo = "Gordic.General.ApplicationInterface.GPermission", CanEditKontrolniOtazka = "Gordic.General.ApplicationInterface.GPermission", CanEditKontrolniOdpoved = "Gordic.General.ApplicationInterface.GPermission", CanEditTypEsu = "Gordic.General.ApplicationInterface.GPermission", CanEditTypOrg = "Gordic.General.ApplicationInterface.GPermission", CanEditObchodniJmeno = "Gordic.General.ApplicationInterface.GPermission", CanEditIc = "Gordic.General.ApplicationInterface.GPermission", CanEditDic = "Gordic.General.ApplicationInterface.GPermission", CanEditTitulPredJmenem = "Gordic.General.ApplicationInterface.GPermission", CanEditJmeno = "Gordic.General.ApplicationInterface.GPermission", CanEditPrijmeni = "Gordic.General.ApplicationInterface.GPermission", CanEditTitulZaJmenem = "Gordic.General.ApplicationInterface.GPermission", CanEditRodneCislo = "Gordic.General.ApplicationInterface.GPermission", CanEditDatumNarozeni = "Gordic.General.ApplicationInterface.GPermission", CanEditFunkceVeFirme = "Gordic.General.ApplicationInterface.GPermission", CanEditTelefon = "Gordic.General.ApplicationInterface.GPermission", CanEditFax = "Gordic.General.ApplicationInterface.GPermission", CanEditUlice = "Gordic.General.ApplicationInterface.GPermission", CanEditCisloPopisne = "Gordic.General.ApplicationInterface.GPermission", CanEditCisloOrientacni = "Gordic.General.ApplicationInterface.GPermission", CanEditPsc = "Gordic.General.ApplicationInterface.GPermission", CanEditCastObce = "Gordic.General.ApplicationInterface.GPermission", CanEditObec = "Gordic.General.ApplicationInterface.GPermission", CanEditPoBox = "Gordic.General.ApplicationInterface.GPermission", CanEditStat = "Gordic.General.ApplicationInterface.GPermission", CanEditIsVatPayer = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPublicUserPermissionDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\PublicLogin\Dto\GGetNiaRequestOutputDto.d.ts 

declare namespace Gordic.Gui.WebControls {
	/**Návratové Dto metody pro načtení requestu propřihlášenípřes NIA*/
	interface GGetNiaRequestOutputDto {
		/**Request.*/
		Request?: string|null;
		/**RequestId*/
		RequestId?: string|null;
	}
	const enum GGetNiaRequestOutputDtoNames { Request = "Request", RequestId = "RequestId",}
	const enum GGetNiaRequestOutputDtoFragments { Request = "*", RequestId = "*",}
	const enum GGetNiaRequestOutputDtoTypes { Request = "string", RequestId = "string",}
	const enum GGetNiaRequestOutputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebControls\PublicLogin\Dto\GAresDataDto.d.ts 

declare namespace Gordic.Gui.WebControls {
	/**GAresDataDto*/
	interface GAresDataDto {
		/**Gets or sets the adresa kod.*/
		AdresaKod?: number|null;
		/**Gets or sets the icon.*/
		Ico?: string|null;
		/**Gets or sets the dic.*/
		Dic?: string|null;
		/**Gets or sets the cislo popisne.*/
		CisloPopisne?: string|null;
		/**Gets or sets the cislo orientacni.*/
		CisloOrientacni?: string|null;
		/**Gets or sets the datum vzniku.*/
		DatumVzniku?: JsonDate|null;
		/**Gets or sets the cast obce.*/
		CastObce?: string|null;
		/**Gets or sets the obec.*/
		Obec?: string|null;
		/**Gets or sets the okres.*/
		Okres?: string|null;
		/**Gets or sets the ulice.*/
		Ulice?: string|null;
		/**Gets or sets the PSC.*/
		Psc?: string|null;
		/**Gets or sets the stat.*/
		Stat?: number|null;
		/**Gets or sets the platce dane.*/
		PlatceDane?: boolean|null;
		/**Gets or sets the pravni forma.*/
		PravniForma?: number|null;
		/**Gets or sets the nazev.*/
		Nazev?: string|null;
	}
	const enum GAresDataDtoNames { AdresaKod = "AdresaKod", Ico = "Ico", Dic = "Dic", CisloPopisne = "CisloPopisne", CisloOrientacni = "CisloOrientacni", DatumVzniku = "DatumVzniku", CastObce = "CastObce", Obec = "Obec", Okres = "Okres", Ulice = "Ulice", Psc = "Psc", Stat = "Stat", PlatceDane = "PlatceDane", PravniForma = "PravniForma", Nazev = "Nazev",}
	const enum GAresDataDtoFragments { AdresaKod = "*", Ico = "*", Dic = "*", CisloPopisne = "*", CisloOrientacni = "*", DatumVzniku = "*", CastObce = "*", Obec = "*", Okres = "*", Ulice = "*", Psc = "*", Stat = "*", PlatceDane = "*", PravniForma = "*", Nazev = "*",}
	const enum GAresDataDtoTypes { AdresaKod = "number", Ico = "string", Dic = "string", CisloPopisne = "string", CisloOrientacni = "string", DatumVzniku = "JsonDate", CastObce = "string", Obec = "string", Okres = "string", Ulice = "string", Psc = "string", Stat = "number", PlatceDane = "boolean", PravniForma = "number", Nazev = "string",}
	const enum GAresDataDtoTypeLengths {}
}

//#endregion

