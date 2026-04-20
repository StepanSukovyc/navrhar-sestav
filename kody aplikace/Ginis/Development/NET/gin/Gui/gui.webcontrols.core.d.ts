type GContentType<TExtension, TContentBase extends GContent = GContent> = {
    [P in keyof TExtension]: TExtension[P];
} & TContentBase;
declare namespace Gordic {
    const GContentBase: {
        new <TExtension = {}>(): GContentType<TExtension>;
    };
}
declare namespace Decorators {
    /**
     * Class decorator, zabrání změnám objectu.
     */
    function sealed(constructor: Function): void;
    /**
     * Class decorator, zabrání změnám objectu a jeho properties.
     */
    function frozen(constructor: Function): void;
    /**
     * Class decorator (experimentální), transformuje TS class
     * do ObjectLiteral pro použítí s GContent.
     */
    function gcontent(ctor: Function): any;
    /**
     * Class decorator pro třídy odvozené od JQueryWidget,
     * provede registraci widgetu do JQuery.
     */
    function jqwidget(base?: any): (ctor: Function) => void;
    /**
     * Class decorator pro třídy, vezme implementace funkcí ze zadaných typů a přidá je k aktuální třídě.
     * @param {Function[]} baseCtors
     */
    function mixin(baseCtors: Function[]): (derivedCtor: Function) => void;
    /**
     * Metod decorator. Provádí lazy binding (method.bind(instance))
     * v momentě, kdy je metoda zavolaná na instanci a bindovanou metodu
     * poté uloží do instance jako property. Takto svázaná matoda má za
     * všech okolností context 'this' odkazující na instanci. Lze jí předat
     * jako callback nebo event handler a 'this' bude vždy instance.
     */
    function bind(prototype: Object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor;
    interface IEventHandlerOptions {
        /**
         * (default true) funkce se nespustí, pokud bude event.defaultPrevented
         */
        honorPreventDefault?: boolean;
        /**
         * (default true) zajistí bind instance, jinak this odkazuje na element
         */
        bind?: true;
    }
    /**
     * Method decorator pro metody, které se používají jako event handler.
     */
    function eventHandler(options?: IEventHandlerOptions): any;
}
/********************************************/
/********************************************/
declare namespace Gordic.Localization {
    const Date: {
        weekdays: {
            shorthand: string[];
            longhand: string[];
        };
        months: {
            shorthand: string[];
            longhand: string[];
        };
        firstDayOfWeek: number;
    };
    const Flatpickr: {
        weekdays: {
            shorthand: string[];
            longhand: string[];
        };
        months: {
            shorthand: string[];
            longhand: string[];
        };
        firstDayOfWeek: number;
    } & {
        weekAbbreviation: string;
        scrollTitle: string;
        toggleTitle: string;
        clearText: string;
        confirmText: string;
        ordinal: () => ".";
        firstDayOfWeek: number;
        rangeSeparator: string;
        amPM: string[];
        yearAriaLabel: string;
        monthAriaLabel: string;
        hourAriaLabel: string;
        minuteAriaLabel: string;
        time_24hr: boolean;
    };
}
declare namespace Debug {
}
declare namespace Gordic.Diagnostics {
    type GErrorType = Error | GError;
}
interface IGErrorOptions {
    /** Interni error */
    cause: any;
}
interface IGErrorExceptionInfo extends IGExceptionInfoMinimal {
    errorCode?: number;
    error?: Error;
    name?: string;
}
/**
     * Trida pro gordicke vyjimky.
     * !POZOR!: Nativni Error neni jejim predkem. Lze se chytat na jeji instanci v catch, ale nelze se spolehnout, ze jde o typ Error!!!
     *
     * @author bmartinek
     * @since 480.1.0.420
     */
declare class GError extends Error implements Gordic.General.ApplicationInterface.GLogErrorDto {
    /**
     * Nazev chyby
     * @type {string}
     * @default "GError"
     */
    name: string;
    /**
     * Chybovy kod pro snazsi nalezeni mista chyby v kodu. POZOR: Nelze se spolehnout na errorCode ze serveru!!!
     * @type {number}
     */
    errorCode: number;
    /**
     * Chybova hlaska
     * @type {string}
     */
    message: string;
    /**
     * CallStack
     * @type {string}
     */
    stack?: string;
    /**
     * Dalsi data k zalogovani
     * @type {any}
     */
    data?: any;
    /**
     * Nazev zdrojoveho souboru
     * @type {string}
     */
    source?: string;
    completeMessage?: string;
    title?: string;
    target?: "window" | "toast" | "hidden";
    handled?: boolean;
    errorType: GState;
    /** Alternativa pro internal exception, muze vsak obsahovat cokoliv (viz MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause ) */
    cause: any;
    constructor(errorCode: number);
    constructor(message?: string);
    constructor(error: Error);
    constructor(exceptionInfo: IGErrorExceptionInfo);
    constructor(message: string, options: IGErrorOptions);
    constructor(errorCode: number, message?: string);
    constructor(errorCode: number, message?: Error);
}
/**
 * Serverova vyjimka
 *
 * @author bmartinek
 * @since 488.1.0.539
 */
declare class GServerError extends GError {
    details: IGExceptionInfo;
    constructor(ei: IGExceptionInfo);
}
/**
 * Validacni chyba
 *
 * @author bmartinek
 * @since 488.1.0.543
 */
declare class GValidationError extends GError {
    validationResult: any;
    constructor(validationResult: any);
    protected getUnhandledValidations(): Array<{
        message: string;
    }>;
}
/**
 * Chyba parseru
 *
 * @author bmartinek
 * @since 490.1.0.60
 */
declare class GParserError extends GError {
    url?: string;
    responseText?: string;
    constructor(ei: IGExceptionInfo & {
        url?: string;
        responseText?: string;
    });
}
/**
 * Abort requestu
 *
 * @author bmartinek
 * @since 490.1.0.75
 */
declare class GAbortError extends GError {
    constructor(ei: IGExceptionInfo);
}
declare class GNetworkError extends GError {
    statusCode: number;
    constructor(ei: IGExceptionInfo & {
        statusCode: number;
    });
}
declare namespace Gordic.Diagnostics {
    /**
     * Logovaci uroven (vychazi z jsnlog.js)
     *
     * @author bmartinek
     * @since 480.1.0.374
     */
    enum LogLevel {
        allLevel = -2147483648,
        trace = 1000,
        debug = 2000,
        info = 3000,
        warn = 4000,
        error = 5000,
        fatal = 6000,
        offLevel = 2147483647
    }
    namespace LogLevel {
        interface LogLevelItem {
            level: number;
            caption: string;
        }
        /**
         * LogLevel v array od nejvolnejsi varianty logovani az po nejvyssi (lokalizovane)
         *
         * @returns {LogLevelItem[]}
         */
        function toArray(): LogLevelItem[];
        /** Vrati zobrazovany nazev levelu */
        function getDisplayName(level: LogLevel): string;
    }
    type GLogMessageDto = Gordic.General.ApplicationInterface.GLogMessageDto;
    type GLogErrorDto = Gordic.General.ApplicationInterface.GLogErrorDto;
    type GLogMessageRequestDto = Gordic.Gui.WebControls.GLogMessageRequestDto;
    interface IGLogOptions {
        /**
         * Nazev logu (idealne nazev tridy vc. namespace)
         * @type {string}
         */
        name: string;
        /**
         * Nazev zdrojoveho souboru (kvuli pripadnym bundlum, minifikacim a evalum)
         * @type {string}
         */
        fileName?: string;
        /**
         * Kod autora
         * @type {number}
         */
        authorCode?: number;
    }
    /**
     * Konfigurace manageru
     *
     * @author bmartinek
     * @since 480.1.0.460
     */
    interface IGLogManagerConfiguration {
        /**
         * True = pripojeni defaultniho GLogConsoleConnector, false = odpojeni
         * @type {boolean}
         */
        console?: boolean;
        /**
         * True = pripojeni defaultniho GLogServerConnector, false = odpojeni
         * @type {boolean}
         */
        server?: boolean;
        /**
         * True = pripojeni defaultniho GLogAnonymousServerConnector, false = odpojeni
         * @type {boolean}
         */
        anonymousServer?: boolean;
    }
    type GLogConnectorFilterType = (this: GLogConnector, message: GLogMessageDto) => boolean;
    interface IGLogConnectorFilter {
        key: string;
        filter: GLogConnectorFilterType;
    }
    abstract class GLogConnector {
        abstract get name(): string;
        protected abstract _defaultLevel: LogLevel;
        private _level?;
        get level(): LogLevel;
        set level(l: LogLevel);
        get defaultLevel(): LogLevel;
        protected _filters: ObjectLiteral<GLogConnectorFilterType>;
        abstract forceDispatchMessages(): JQueryPromise<any>;
        abstract addMessage(message: GLogMessageDto): JQueryPromise<any>;
        /**
         * Odstraneni zprav (pokud jsou odesilany do bufferu)
         */
        abstract clearMessages(): void;
        /**
         * Pridani zprav (k pretizeni!)
         *
         * @param {GLogMessageDto[]} messages
         * @returns {JQueryPromise<any>}
         */
        addMessages(messages: GLogMessageDto[]): JQueryPromise<any>;
        add(message: GLogMessageDto | GLogMessageDto[]): JQueryPromise<any>;
        addFilter(filter: IGLogConnectorFilter): void;
        removeFilter(filter: IGLogConnectorFilter | string): void;
        resetAllFilters(): void;
        protected _resolveMessage(message: GLogMessageDto): JQueryPromise<any>;
        protected _canPassMessage(message: GLogMessageDto): boolean;
    }
    class GLogConsoleConnector extends GLogConnector {
        static readonly connectorName = "GLogConsoleConnector";
        get name(): string;
        protected _defaultLevel: LogLevel;
        verbose: boolean;
        private _console;
        addMessage(message: GLogMessageDto): JQueryPromise<any>;
        clearMessages(): void;
        forceDispatchMessages(): JQueryPromise<any>;
        /**
         * Zapis do logu s moznosti pretizeni
         *
         * @param {GLogMessageDto} message
         */
        protected writeMessage(message: GLogMessageDto): void;
    }
    abstract class GLogBufferredRemoteConnector extends GLogConnector {
        messageBuffer: GLogMessageDto[];
        resolvingPromise: JQueryPromise<any> | null;
        initialTimer: number | null;
        timer: number | null;
        /**
         * Pocatecni delay - prijde prvni zprava k zalogovani, pocka se tento cas, jestli neprijde jeste nejaka, a pak dojde k odeslani
         * @type {number}
         * @default 200
         */
        readonly initialDelay: number;
        /**
         * Pokud se ceka na nejake predchozi zalogovani, toto je doba do dalsiho pokusu o odeslani.
         * @type {number}
         * @default 5000
         */
        readonly intervalDelay: number;
        addMessage(message: GLogMessageDto): JQueryPromise<any>;
        addMessages(messages: GLogMessageDto[]): JQueryPromise<any>;
        protected tryDispatchMessages(): void;
        protected prepareLogMessagesRequest(messages: GLogMessageDto[]): GLogMessageRequestDto;
        /**
         * Smazani zprav z bufferu, preruseni timeru
         */
        clearMessages(): void;
    }
    class GLogServerConnector extends GLogBufferredRemoteConnector {
        static readonly connectorName = "GLogServerConnector";
        get name(): string;
        protected _defaultLevel: LogLevel;
        protected serviceContent: GContent;
        constructor(serviceContent?: GContent);
        forceDispatchMessages(): JQueryPromise<any>;
    }
    class GLogManager {
        static get unhandledExceptionEvName(): string;
        private _connectors;
        private _consoleConnector;
        private _serverConnector;
        private static _defaultLogger;
        /** Aktualni GLogManager (pro pripady otevreni v iframe nebo na modalnim okne), v GWA05 by to mel byt vzdy tento objekt */
        private static _instance;
        private _window;
        private static _messagesBlackList;
        /**
         * Defaultni connector pro logovani do konzole prohlizece
         */
        static get consoleConnector(): GLogConsoleConnector;
        /**
         * Defaultni serverovy connector (logovani pro prihlasene uzivatele)
         */
        static get serverConnector(): GLogServerConnector;
        /**
         * Vsechny defaultni connectory v poli (nehlede na to zda jsou ci nejsou pripojeny do GLogManageru! (tzn. jestli jsou nebo nejsou aktivni))
         *
         * @returns {GLogConnector[]}
         */
        static get defaultConnectors(): GLogConnector[];
        /**
         * Uvodni inicializace + zapojeni connectoru pro logovani pro anonymni uzivatele
         */
        static init(init?: Gordic.Gui.WebControls.GLogInitDto): void;
        /**
         * Odebere vsechny registrovane connectory + signalizace odstraneni vsech zprav z bufferu + odstrani instanci serverConnectoru.
         * Volat po odhlaseni.
         */
        static uninit(): void;
        /**
         * Inicializace vypisovani neosetrenych vyjimek do GDlg.showException()
         */
        /**
         * Zruseni zobrazovani neosetrenych vyjimek do GDlg.showException()
         */
        /**
         * Signalizuje vsem connectorum, ze maji zpracovat vsechny zpravy.
         *
         * @returns {JQueryPromise<any>}
         */
        static forceDispatchLogMessages(): JQueryPromise<any>;
        static addMessage(message: GLogMessageDto): JQueryPromise<any>;
        static addMessages(messages: GLogMessageDto[]): JQueryPromise<any>;
        /**
         * Smaze vsechny neodeslane message (signalizuje to connectorum)
         */
        static clearAllMessages(): void;
        static consoleEnabled(isEnabled: boolean): void;
        static serverEnabled(isEnabled: boolean): void;
        /**
         * Upravi konfiguraci manageru
         *
         * @param {IGLogManagerConfiguration} cfg
         */
        static updateConfiguration(cfg: IGLogManagerConfiguration): void;
        /**
         * Je zaregistrovan alespon jeden connector? (pro pripadne optimalizace)
         *
         * @returns {boolean}
         */
        static get hasAnyConnectorStatic(): boolean;
        /**
         * Je zaregistrovany dany connector?
         *
         * @param {string | GLogConnector} connectorName
         * @returns {boolean}
         */
        static hasConnector(connectorName: string | GLogConnector): boolean;
        /**
         * Ziskani instance pripojeneho connectoru. Na connectoru lze volitelne menit uroven logovani. Aktualne dostupne typy connectoru:
         * - GLogServerConnector.connectorName,
         * - GLogConsoleConnector.connectorName
         * - GLogAnonymousServerConnector.connectorName
         *
         * @param {string | GLogConnector | ((c: GLogConnector)} connectorName (default = > boolean))
         * @returns {GLogConnector[]}
         */
        static findConnectors(connectorName: string | GLogConnector | ((c: GLogConnector) => boolean)): GLogConnector[];
        /**
         * Vrati seznam vsech pripojenych connectoru
         *
         * @returns {GLogConnector[]}
         */
        static getAllConnectors(): GLogConnector[];
        /**
         * Zaregistruje connector do manageru.
         *
         * @param {GLogConnector} connector
         */
        static addConnector(connector: GLogConnector): void;
        /**
         * Odebere (odregistruje) connector z manageru.
         *
         * @param {GLogConnector | string} connector
         * @param {boolean} allowMulti (default = false) Pokud je nalezen connector podle stringoveho nazvu vicekrat, tak timhle nastavenim smaze vsechny. Jinak vyhodi vyjimku.
         */
        static removeConnector(connector: GLogConnector | string, allowMulti?: boolean): void;
        /**
         * Odebere vsechny registrovane connectory
         */
        static removeAllConnectors(): void;
        static addConnectorFilter(applyConnectors: GLogConnector[], filter: IGLogConnectorFilter): void;
        static removeConnectorFilter(applyConnectors: GLogConnector[], key: string): void;
        static removeConnectorFilter(applyConnectors: GLogConnector[], filter: IGLogConnectorFilter): void;
        /** Odebere vsechny filtry ze vsech connectoru */
        static resetAllConnectorFilters(): void;
        /** Odebere filtry od vybranych connectoru
         * @param {GLogConnector[]} applyConnectors
         */
        static resetAllConnectorFilters(applyConnectors: GLogConnector[]): void;
        /**
         * Prida chybovou zpravu na blacklist (tzn. jeji vyskyt bude pri logovani ignorovan)
         *
         * @param {string} message
         */
        static addBlackboxedMessage(message: string): void;
        /** Je zprava v na blacklistu? */
        static _isBlackboxedMessage(message: GLogMessageDto | string): boolean;
        /**
         * Vrati hlavni GLogManager, tzn., pokud je window v iframe nebo je okno otevrene modalne, vrati GLogManager hlavniho okna
         *
         * @returns {GLogManager}
         */
        static _getActualLogManager(w: Window): GLogManager;
        static _getLogManagerWindow(): Window;
        static _hasLogManager(w: Window): boolean;
        hasAnyConnector(): boolean;
        /**
         * Signalizuje vsem connectorum, ze maji zpracovat vsechny zpravy.
         *
         * @returns {JQueryPromise<any>}
         */
        forceDispatchLogMessages(): JQueryPromise<any>;
        addMessage(message: GLogMessageDto): JQueryPromise<any>;
        addMessages(messages: GLogMessageDto[]): JQueryPromise<any>;
        /**
         * Smaze vsechny neodeslane message (signalizuje to connectorum)
         */
        clearAllMessages(): void;
        /**
         * Je zaregistrovany dany connector?
         *
         * @param {string | GLogConnector} connectorName
         * @returns {boolean}
         */
        hasConnector(connectorName: string | GLogConnector): boolean;
        /**
         * Ziskani instance pripojeneho connectoru. Na connectoru lze volitelne menit uroven logovani. Aktualne dostupne typy connectoru:
         * - GLogServerConnector.connectorName,
         * - GLogConsoleConnector.connectorName
         * - GLogAnonymousServerConnector.connectorName
         *
         * @param {string | GLogConnector | ((c: GLogConnector)} connectorName (default = > boolean))
         * @returns {GLogConnector[]}
         */
        findConnectors(connectorName: string | GLogConnector | ((c: GLogConnector) => boolean)): GLogConnector[];
        /**
         * Vrati seznam vsech pripojenych connectoru
         *
         * @returns {GLogConnector[]}
         */
        getAllConnectors(): GLogConnector[];
        /**
         * Zaregistruje connector do manageru.
         *
         * @param {GLogConnector} connector
         */
        addConnector(connector: GLogConnector): void;
        /**
         * Odebere (odregistruje) connector z manageru.
         *
         * @param {GLogConnector | string} connector
         * @param {boolean} allowMulti (default = false) Pokud je nalezen connector podle stringoveho nazvu vicekrat, tak timhle nastavenim smaze vsechny. Jinak vyhodi vyjimku.
         */
        removeConnector(connector: GLogConnector | string, allowMulti?: boolean): void;
        /**
         * Odebere vsechny registrovane connectory
         */
        removeAllConnectors(): void;
    }
    class GLogUtils {
        /**
         * Vytvori sjednocujici DTO obs. info z error
         *
         * @param {Error} e
         * @returns {GExceptionDto}
         */
        static createErrorDto(e: Error | GError | string, fileName?: string): GLogErrorDto;
        /**
         * Odstrani kruhove zavislosti v objektu
         *
         * @param {any} o
         * @returns {any}
         */
        static decycle(o: any): any;
    }
    class GLog implements IGLogOptions {
        name: string;
        fileName?: string;
        authorCode?: number;
        constructor(options: IGLogOptions);
        trace(error: GError, ...args: any[]): void;
        trace(code: number, message: string, ...args: any[]): void;
        trace(code: number, error: Error, ...args: any[]): void;
        trace(secret: boolean, error: GError, ...args: any[]): void;
        trace(secret: boolean, ...args: any[]): void;
        trace(...args: any[]): void;
        debug(error: GError, ...args: any[]): void;
        debug(code: number, message: string, ...args: any[]): void;
        debug(code: number, error: Error, ...args: any[]): void;
        debug(secret: boolean, error: GError, ...args: any[]): void;
        debug(secret: boolean, ...args: any[]): void;
        debug(...args: any[]): void;
        info(error: GError, ...args: any[]): void;
        info(code: number, message: string, ...args: any[]): void;
        info(code: number, error: Error, ...args: any[]): void;
        info(secret: boolean, error: GError, ...args: any[]): void;
        info(secret: boolean, ...args: any[]): void;
        info(...args: any[]): void;
        warn(error: GError, ...args: any[]): void;
        warn(code: number, message: string, ...args: any[]): void;
        warn(code: number, error: Error, ...args: any[]): void;
        warn(secret: boolean, error: GError, ...args: any[]): void;
        warn(secret: boolean, ...args: any[]): void;
        warn(...args: any[]): void;
        error(error: GError, ...args: any[]): void;
        error(code: number, message: string, ...args: any[]): void;
        error(code: number, error: Error, ...args: any[]): void;
        error(secret: boolean, error: GError, ...args: any[]): void;
        error(secret: boolean, ...args: any[]): void;
        fatal(error: GError, ...args: any[]): void;
        fatal(code: number, message: string, ...args: any[]): void;
        fatal(code: number, error: Error, ...args: any[]): void;
        fatal(secret: boolean, error: GError, ...args: any[]): void;
        fatal(secret: boolean, ...args: any[]): void;
        log(level: LogLevel, error: GError, ...args: any[]): void;
        log(level: LogLevel, code: number, error: Error, ...args: any[]): void;
        log(level: LogLevel, code: number, error: string, ...args: any[]): void;
        log(level: LogLevel, secret: boolean, error: GError, ...args: any[]): void;
        log(level: LogLevel, secret: boolean, ...args: any[]): void;
        log(level: LogLevel, ...args: any[]): void;
        protected _log(level: LogLevel, args: any[]): JQueryPromise<void>;
    }
    /** Je zapnuty debug rezim (UserProcess.DebugMode) */
    function debugMode(): boolean;
    /** Jsme ve vyvojove vetvi (odpovida z CSharp: #if DEBUG || DEVELOP_VERSION) */
    function developMode(): boolean;
}
/** Interface pro datové objekty, který má stejný interface jako nativní Map.
    Výhodou je, že pro nativní map i datové objekty dědící od tohoto interface
    lze používat shodné metody. */
interface IMap<TKey, TValue> {
    delete(key: TKey): boolean;
    get(key: TKey): TValue | undefined;
    has(key: TKey): boolean;
    set(key: TKey, value?: TValue): this;
}
declare namespace GData {
    /**
     * Typ funkce pro vyzvednutí property z objektu, na vstupu dostane object
     * a na výstupu je hodnota určité property.
     */
    type Reviver<TInput extends Object, TProperty> = (input: TInput) => TProperty;
    /**
     * Typ parametru, který obvykle akceptují zde používané metody, které
     * vyzvedávají property na základě string jako "key.nested" nebo pole
     * stringů ["key", "nested"] nebo akceptují již hotový Reviver.
     */
    type ReviverParam<TInput extends {}, TProperty> = string | string[] | Reviver<TInput, TProperty>;
    /**
     * Zápid cesty k property přes string, např "key.nested", nebo pole string[],
     * např. ["key", "nested"].
     */
    type KeyPath = string | string[];
    /**
     * Převede ReviverParam na Reviver, poradí si se všemi možnými tvary
     * ReviverParam a vrátí funkci typu Reviver.
     * @param reviverParam
     */
    function normalizeReviver<TInput extends object, TProperty>(reviverParam: ReviverParam<TInput, TProperty>): Reviver<TInput, TProperty>;
    /**
     * Vyhodnotí KeyPath a pokud obsahuje pouze jeden klíč bez zanoření,
     * vrátí ho jako string a pokud obsahuje zanořenou cestu (např. "key.nested"),
     * vrátí jí jako pole stringů.
     * @param keyPath
     */
    function evaluateKeyPath(keyPath: KeyPath): KeyPath;
    /**
     * Vrátí hodnotu určenou KeyPath
     * @param keyPath
     * @param obj
     * @param valueIfNotExists
     */
    function getValueByKeyPath(keyPath: KeyPath, obj: object, valueIfNotExists?: any): any;
    /**
     * Nastaví na objektu property určenou přes KeyPath a vrátí původní object.
     * @param keyPath
     * @param obj
     * @param value
     */
    function setValueByKeyPath<TInput extends object>(keyPath: string | string[], obj: TInput, value: any): TInput;
    /**
     * Upraví na objektu property pomoci poskytnutého callback, callback
     * dostane předchozí hodnotu property a to, co callback vrátí, se
     * použije jako nová hodnota.
     * @param keyPath
     * @param obj
     * @param updater
     */
    function updateValueByKeyPath<TInput extends Object>(keyPath: string | string[], obj: TInput, updater: (oldValue: any) => any): TInput;
}
declare namespace GData {
    /** Definuje interface serializeru */
    interface GSerializer {
        decode(value?: string): any;
        encode(value: any): string;
    }
    /**
     * Implementace JSONSerializeru využívající JSON
     */
    class JSONSerializer implements GSerializer {
        decode(value: string): any;
        encode(value: any): string;
    }
    /**
     * Objekt pro práci s windo.localeStorage a window.sessionStorage,
     * který převádí jejich interface na interface shodný s Map<TValue>
     * k převodu string na typy se používá poskytnuté GSerializer
     */
    abstract class GWindowStorage<TValue> implements IMap<string, TValue> {
        private _storage;
        protected _serializer: GSerializer;
        constructor(_storage: any, _serializer: GSerializer);
        /**
         * Uloži hodnotu na pozici klíče.
         * @param key klíč k hodnotě.
         * @param value hodnota, který se uloží na pozici dle klíče.
         */
        set(key: string, value: TValue): this;
        /**
         * Vrátí hodnotu uloženou na pozici klíče.
         * @param key klíč k hodnotě.
         * @returns nalezenou hodnotu nebo undefined.
         */
        get(key: string): TValue | undefined;
        has(key: string): boolean;
        /**
         * Smaže hodnotu na pozici klíče.
         * @param key klíč k hodnotě.
         */
        delete(key: string): boolean;
    }
    /**
     * Třída pro ukládání dat do localStorage. Umí obsloužit vnořené
     * objekty, automaticky de-/serializuje hodnoty v localStorage.
     */
    class GLocalStorage<TValue> extends GWindowStorage<TValue> {
        constructor(serializer?: GSerializer);
        static getContract<TValue>(key: string, defaultObj?: TValue): Contract<string, TValue> | null;
    }
    /**
     * Třída pro ukládání dat do localStorage. Umí obsloužit vnořené
     * objekty, automaticky de-/serializuje hodnoty v localStorage.
     */
    class GSessionStorage<TValue> extends GWindowStorage<TValue> {
        constructor(serializer?: GSerializer);
        static getContract<TValue>(key: string, defaultObj?: TValue): Contract<string, TValue> | null;
    }
    /**
     * Kontrakt na konkrétní klíč v konkrétním storage, veškerá práce se čtením
     * či zápisem hodnoty na klíči je zjednodušená na práci s property valu
     *
     * Např.:
     *  var contract = new Contract<string, number>(new GLocalStorage(), "mujKlic");
     *  contract.value = 3
     *  console.log(contract.value) // => 3
     *  console.log(window.localStorage.getItem("mujKlic")) // => "3"
     *
     */
    class Contract<TKey, TValue> {
        readonly storage: IMap<TKey, TValue>;
        readonly key: TKey;
        defaultIfNotExists?: TValue | undefined;
        get value(): TValue | undefined;
        set value(value: TValue | undefined);
        constructor(storage: IMap<TKey, TValue>, key: TKey, defaultIfNotExists?: TValue | undefined);
    }
}
interface StringConstructor {
    /** Jako c# String.Format() */
    Format(s: string, ...args: Primitive[]): string;
    Format(s: string, arr: Primitive[]): string;
    Format(s: string, obj: ObjectLiteral<any>): string;
    Format(s: string, cb: (nr: string) => Primitive): string;
}
interface String {
    /** Převede první písmeno na velké */
    capitalize: () => string;
    format(...args: Primitive[]): string;
    format(arr: Primitive[]): string;
    format(obj: ObjectLiteral<any>): string;
    format(cb: (nr: string) => Primitive): string;
    toLatin: () => string;
}
interface ObjectConstructor {
    values<T>(obj: ObjectLiteral<T>): T[];
}
interface Array<T> {
    includes(searchElement: T, fromIndex?: number): boolean;
    find(predicate: Callback.Predicate<T>, thisArg?: any): T | undefined;
    findIndex(predicate: Callback.Predicate<T>, thisArg?: any): number;
}
declare namespace Gordic.Utils {
    const generateGuid: (guidFormat?: string) => string;
    enum Units {
        px = "px",
        percent = "%",
        em = "em",
        rem = "rem"
    }
    /**
     * Vrátí zkrácený string, tak, že z původního stringu bude vidět zadaný počet znaků (první polovina ze začátku, druhá polovina z konce)
     * Celková délka bude o 1 delší (doprostřed doplní '…' )
     * @param {string} str
     * @param {number} visibleCharCount (default = 20)
     */
    function shortenToVisibleChars(str: string, visibleCharCount?: number): string;
    /**
     * Vrátí zkrácený string, tak že jeho nová délka bude zadaný počet znaků (uprostřed doplní …)
     *
     * @param {string} str
     * @param {number} len (default = 20)
     */
    function shortenToLength(str: string, len?: number): string;
    /**
     * Vrátí nejmenší počet úprav znaků (přidání, odebrání, substituce),
     * které by bylo potřeba provést, aby se a rovnalo b.
     * @param a
     * @param b
     */
    function levenshtein(a: string, b: string): any;
    /**
     * Jaro-Winkler distance function for string similarity - returns value between 0(no match) and 1(exact match)
     *
     * @license  https://raw.githubusercontent.com/jordanthomas/jaro-winkler/master/LICENSE
     * @copyright Copyright (c) 2015 Jordan Thomas
     * @param {string} s1
     * @param {string} s2
     * @param {{caseSensitive:boolean}} options
     */
    function jaroWinkler(s1: string, s2: string): number;
    function mongeElkan(a: string[], b: string[], sim: (a: string, b: string) => number): number;
    function getFontWidthMap(element: any, font?: string | null): {
        charWidths: {
            [char: string]: number;
        };
        averageWidth: number;
        widthOfZero: number;
    };
    interface IGetTextWidthOptions {
        text: string;
        fontSize?: number;
        font?: string | null;
        element?: HTMLElement | null;
        unit?: "px" | "ch";
    }
    function getTextWidth(opts: IGetTextWidthOptions): number;
    interface IGSimilarityConfidence {
        term: string;
        confidence: number;
        norm?: number;
    }
    interface IGObjectFuzzySearchOpts {
        confidenceLimit?: number;
        countLimit?: number;
        keys: (IGObjectFuzzySearchKey | string)[];
    }
    interface IGObjectFuzzySearchKey {
        key: string;
        weight?: number;
        transform?: (val: any) => any;
    }
    class GObjectFuzzySearch {
        keys: string[] | null;
        weights: number[] | null;
        transforms: (((val: any) => any) | null)[] | null;
        countLimit: number | null;
        confidenceLimit: number;
        constructor(opts?: IGObjectFuzzySearchOpts);
        on(a: string, b: Primitive | Primitive[], useLimits?: boolean): IGSimilarityConfidence[];
        onObject(a: string, b: object): IGSimilarityConfidence[];
        onObjectList<T = any>(a: string, b: object[], opts: {
            map: (it: IGSimilarityConfidence[]) => T;
        }): T[];
        private _isSearchable;
    }
    /**
     * Podobnost dvou stringů v procentech - mezi 0 a 1
     *
     * @param {string} a
     * @param {string} b
     */
    function similarityConfidence(a: string, b: string): IGSimilarityConfidence;
    interface IGTypeGuesser {
        type: string;
        guess(input: string): IGTypeGuess[];
    }
    interface IGTypeGuess {
        confidence: number;
        parsed?: any;
        type: string;
    }
    abstract class GBaseTypeGuesser implements IGTypeGuesser {
        abstract type: string;
        abstract guess(input: string): IGTypeGuess[];
    }
    class GTypeGuesser extends GBaseTypeGuesser {
        protected guessers: IGTypeGuesser[];
        constructor(guessers?: IGTypeGuesser[]);
        type: string;
        guess(input: string): IGTypeGuess[];
    }
    class GBooleanGuesser extends GBaseTypeGuesser {
        type: string;
        private trues;
        private falses;
        guess(input: string): IGTypeGuess[];
    }
    class GNumberGuesser extends GBaseTypeGuesser {
        type: string;
        guess(input: string): IGTypeGuess[];
    }
    class GFloatGuesser extends GBaseTypeGuesser {
        type: string;
        guess(input: string): IGTypeGuess[];
    }
    class GDateGuesser extends GBaseTypeGuesser {
        type: string;
        guess(input: string): IGTypeGuess[];
    }
    class GIxpGuesser extends GBaseTypeGuesser {
        type: string;
        guess(input: string): IGTypeGuess[];
    }
    class GIxsGuesser extends GBaseTypeGuesser {
        type: string;
        guess(input: string): IGTypeGuess[];
    }
    /**
     * GString
     *
     * @date 01.11.2018
     * @author TFeik
     * @since 480.1.0.510
     */
    class GString {
    }
}
declare namespace Gordic.Utils {
    const reEscape: (pattern: string) => string;
    const reSource: (re: RegExp | string) => string;
    const reOneOf: (...res: Array<RegExp | string>) => string;
    const reOddTimes: (char: string) => string;
    const reEscaped: (char: string) => string;
    const reReplaceMap: (replaceMap: {
        [search: string]: string;
    }) => [RegExp, ((substring: string) => string)];
}
declare namespace Callback {
    /**
     * Význam předložek callbacků
     * by.. -- komparátor
     * do.. -- event listener
     * is.., not.. -- predikát
     * on.. -- reducer
     * to.. -- transformátor
     */
    type Transformator<E, R> = (elem: E, idx?: number, arr?: E[]) => R;
    const toBoolean: BooleanConstructor;
    const toContext: (this: any) => any;
    const toFalse: () => boolean;
    const toFirstArg: (arg: any) => any;
    const toNumber: NumberConstructor;
    const toString: StringConstructor;
    const toTrue: () => boolean;
    const toVoid: () => undefined;
    /**
     * Převede vstupní element na jeho property
     * @param this -- určení property jako string např.: "data" nebo vnořené
     *  property pomocí tečkové notace "data.id.length"
     * @param e -- vstupní element
     * @param i -- index v rámci pole, předává se automaticky funkcí pole.
     * @param a -- pole vstupů, předává se automaticky funkcí pole.
     */
    function toProperty<TItem extends object, TProperty>(this: GData.ReviverParam<TItem, TProperty>, e: TItem, i?: number, a?: TItem[]): TProperty;
    /**
     * Převede vstupní element na volání jeho metody nebo vnořené metody.
     * @param this -- určení metody jako string např.: "getData" nebo vnořené
     *  metody pomocí tečkové notace "dateCreated.getTime", pokud je nutné
     *  předat metodě argumenty, předejte this jako pole, kde prní element je
     *  určení metody a zbylé prvky pole se předají funkci jako argumenty,
     *  např.: ["getItem", id]
     * @param o
     * @param i
     * @param a
     */
    function toCallOf(this: string | any[], e: object, i?: number, a?: object[]): any;
    type Predicate<E> = (elem: E, idx?: number, arr?: E[]) => boolean;
    /** Projde pole a odebere duplicity. */
    const isDistinct: Predicate<any>;
    /** Vrací true pro truthy hodnoty (vše krom undefined, null, false, 0 a ''). */
    const isTruthy: Predicate<any>;
    /** Vrací true pro falsy hodnoty (undefined, null, false, 0 a ''). */
    const isFalsy: Predicate<any>;
    /** Vrací true pro všechny hodnoty převoditelné na číslo. */
    const isNumeric: Predicate<any>;
    /** Vrací true pro všechny hodnoty nepřevoditelné na číslo. */
    const notNumeric: Predicate<any>;
    /**
     * Očekává druhé pole jako context. Vrací true jestliže se hodnota
     * nachází i v druhém poli.
     *
     * Př.: 'pole1.filter(isIn, pole2)'.
     *
     * @this T[] Druhé pole k porovnání.
     */
    function isIn<T>(this: T[], e: T): boolean;
    /**
     * Očekává druhé pole jako context. Vrací true jestliže hodnota se
     * v druhém poli nenachází.
     *
     * Př.: 'pole1.filter(notIn, pole2)'.
     *
     * @this T[] Druhé pole k porovnání.
     */
    function notIn<T>(this: T[], e: T): boolean;
    /**
     * Vrací true jestliže vstup odpovídá výrazu dle syntaxe SQL LIKE. Chápe
     * zástupky '%' a '?' a porovnává bez ohledu na diakritiku a velikost
     * písmen. Alternativně lze jako výraz předat RegExp, který se použije
     * bez úprav, pouze se vstupy před testováním vždy převedou na ASCII.
     * Výraz pro testování se předává jako context.
     *
     * Př.: 'poleRetezcu.filter(isLike, "Prazsk? měst%")'
     *
     * @this string | RegExp Výraz k testování.
     */
    const isLike: Predicate<string>;
    /**
     * Otestuje property vstupních elementů
     * @param this -- určení property jako string např.: "data" nebo vnořené
     *  property pomocí tečkové notace "data.id.length". Standardně se otestuje
     *  na isTruthy, pokud chcete použít jiný Predicate, předejte pole, kde
     *  první element je určení property, druhý element je Predicate a třetí
     *  element je context pro Predicate, např.: ["data.id", isEqual, 123],
     *  pokud predicate context nevyžaduje, můžete třetí element vynechat,
     *  např.: ["data.name", isNumeric]
     * @param e -- vstupní element
     * @param i -- index v rámci pole, předává se automaticky funkcí pole.
     * @param a -- pole vstupů, předává se automaticky funkcí pole.
     */
    const isProperty: Predicate<object>;
    /**
     * Testuje druhé pole, a na základě výsledku filtruje první pole. Vhodné
     * pokud máte pole výsledků vztahujících se k prvnímu poli a chcete podle
     * nich filtrovat první pole.
     *
     * Př.: 'pole1.filter(isAccordingTo(pole2, isTruthy))'.
     * Pro predikáty vyžadující context, např. 'isLike':
     * 'pole1.filter(isAccordingTo(pole2, isLike), "Prazsk? měst%")'.
     *
     * @param arr Druhé pole, které se bude testovat.
     * @param predicate Predikát použitý pro testování.
     */
    function isAccordingTo<A, E>(arr: A[], predicate?: Predicate<A>): Predicate<E>;
    /**
     * Jednoduché, volné porovnání na shodu. Porovnává se dvěma rovnítky.
     * @param this
     * @param e
     */
    function isEqual<E>(this: E, e: E): boolean;
    /**
     * Jednoduché, těsné porovnání na shodu. Porovnává se třemi rovnítky.
     * @param this
     * @param e
     */
    function isEquals<E>(this: E, e: E): boolean;
    /**
     * Jednoduché, volné porovnání na rozdílnost.
     * @param this
     * @param e
     */
    function notEqual<E>(this: E, e: E): boolean;
    /**
     * Jednoduché, trěsné porovnání na rozdílnost.
     * @param this
     * @param e
     */
    function notEquals<E>(this: E, e: E): boolean;
    function isGreaterThan(this: number, e: number): boolean;
    function isGreaterOrEqual(this: number, e: number): boolean;
    function isLowerThan(this: number, e: number): boolean;
    function isLowerOrEqual(this: number, e: number): boolean;
    function isTypeOf(this: string, e: any): boolean;
    function isInstanceOf(this: Function, e: any): boolean;
    type Comparator<TInput> = (a: TInput, b: TInput) => number;
    /** Seřadí primitivní hodnoty jednoduše. */
    const byPrimitive: Comparator<Primitive>;
    /** Seřadí primitivní hodnoty přirozeně dle jejich typu. */
    const byNature: Comparator<any>;
    /**
     * Porovná textové hodnoty abecedně. Umí správně řadit čísla (2 před 11),
     * zohledňovat diakritiku, různě velká písmena a spoustu dalšího.
     * @param options see Intl.Collator options
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
     * @param locales see locales
     * http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
     */
    const byAlphabet: (locales?: string | string[], options?: Intl.CollatorOptions) => Comparator<string>;
    /**
     * Seřadí hodnoty dle číselné váhy, kterou vrací předaná funkce 'scale'.
     *
     * Př.: array.sort(byWeight(elem => elem.width * elem.height));
     *
     * @param scale Funkce pro výpočet váhy, vstup musí transformovat na číslo.
     */
    const byWeight: <T>(scale: (item: T) => number) => Comparator<T>;
    /**
     * Porovná dle property vstupních elementů.
     *
     * Př.: 'array.sort(byInnerValue("data.name", byAlphabet))'
     *
     * @param reviver -- určení property jako string např.: "data" nebo vnořené
     *  property pomocí tečkové notace "data.id.length".
     * @param comparator -- Komparátor použitý pro porovnání. Pokud není
     *  stanoven, používá se Comparator byNature.
     */
    function byProperty<E extends object, R>(reviver: GData.ReviverParam<E, R>, comparator?: Comparator<any>): Comparator<E>;
    const doPreventDefault: EventListener;
    const doStopPropagation: () => boolean;
}
declare namespace Gordic.Gui.Dialogs {
    /**
     * [OBSOLETE] Použijte _openDialog2.
     * [INTERNAL] Pouze pro použití v Gordic.Gin/Esu/Wfl/Ssl/.../.Dialogs! Neslouží k otevření samostatného dialogu!
     * Vnitřní funkce pro zjednodušení obsluhy otevírání dialogů
     *
     * @auth TFeik
     * @date 12.03.2018
     *
     * @param {GContent | GDlgNamespace} pContent Nadřazený content.
     * @param {JQueryDeferred<TOutputData>} deferred Deferred zavření dialogu.
     * @param {string} dialogName Název (class) dialogu včetně namespace. Pokud je předáván v poli s dalšími parametry, pak musí být jméno na prvním místě pole (index 0).
     * @param {Gordic.Global.Enums.ModOtevreni} modOtevreni Mód otevření dialogu.
     * @param {any} options Options contentu (ID, JsonProperty).
     * @param {GDialogOptions} windowParams Options dialogu.
     * @returns
     */
    function _openDialog<TOutputData>(pContent: GContent | GDlgNamespace, deferred: JQueryDeferred<TOutputData>, dialogName: string | (string | ObjectLiteral<any>)[] | IGClientContentObject | IGClientContent, modOtevreni?: Gordic.Global.Enums.ModOtevreni | null, options?: any | null, windowParams?: GDialogOptions | null, onDialogCreate?: ((input: {
        $dialog: JQuery<HTMLElement>;
    }) => void) | null, 
    /**
     * (default: true) Příznak, zda se má zobrazova warning na použití oboslete metody.
     * @type {boolean}
     */
    showObsoleteWarning?: boolean): JQueryDeferred<TOutputData>;
    /**
     * [INTERNAL] Pouze pro použití v Gordic.Gin/Esu/Wfl/Ssl/.../.Dialogs! Neslouží k otevření samostatného dialogu!
     * Vnitřní funkce pro zjednodušení obsluhy otevírání dialogů
     *
     * @auth TFeik
     * @date 09.11.2022
     *
     * @param {GContent | GDlgNamespace} pContent Nadřazený content.
     * @param {string | (string | ObjectLiteral<any>)[] | IGClientContentObject} dialogName Název (class) dialogu včetně namespace. Pokud je předáván v poli s dalšími parametry, pak musí být jméno na prvním místě pole (index 0).
     * @param {Gordic.Global.Enums.ModOtevreni} [modOtevreni] Mód otevření dialogu.
     * @param {TDialogInputParams} [options] Options contentu (ID, JsonProperty).
     * @param {GDialogOptions | null} [windowParams] Options dialogu.
     * @param {(input: { $dialog: JQuery<HTMLElement> })} [onDialogCreate] (default = > void)
     * @param {(input: TDialogInputParams | undefined | null)} [isValid] (default = > boolean | Dialogs.OpenDialogRejectType)
     * @returns {JQuery.Promise<TOutputData>}
     */
    function _openDialog2<TOutputData, TDialogInputParams = any>(pContent: GContent | null | undefined, dialogName: string | (string | ObjectLiteral<any>)[] | IGClientContentObject | IGClientContent, modOtevreni?: Gordic.Global.Enums.ModOtevreni | null, options?: any | null, windowParams?: GDialogOptions | null, onDialogCreate?: ((input: {
        $dialog: JQuery<HTMLElement>;
    }) => void) | null, isValid?: ((input: TDialogInputParams | undefined | null) => boolean | Dialogs.OpenDialogRejectType) | null): JQuery.Promise<TOutputData>;
    /**
     * Funkce pro *Dialogs.js  upraví mody otevření.
     *
     * @param {GContent} content
     * @param {Gordic.Global.Enums.ModOtevreni} ModOtevreni
     * @returns
     */
    function upravModOtevrni(content: GContent | GDlgNamespace, modOtevreni?: Gordic.Global.Enums.ModOtevreni | null): Gordic.Global.Enums.ModOtevreni;
    /**
     * Funkce pro *Dialogs.js  zkontroluje content
     *
     * @param {GContent | null} content?
     * @returns
     */
    function zkontrolujContent(content?: GContent | null): GContent | GDlgNamespace;
    /**
     * Interface vstupních parametrů dialogů.
     *
     * @author  TFeik
     * @since   480.1.0.179
     */
    interface OpenDialogParams<TDialogParams> {
        parentContent: GContent;
        opt: TDialogParams;
        ModOtevreni?: Gordic.Global.Enums.ModOtevreni;
    }
    /**
     * Interface vstupních parametrů dialogů.
     *
     * @author  TFeik
     * @since   488.1.0.605
     */
    interface OpenDialogParamsWithRemoteControlGrid<TDialogParams> extends OpenDialogParams<TDialogParams>, WithRemoteControlGrid {
    }
    interface OpenDialogRejectType {
        errorMessage?: string;
    }
    interface WithRemoteControlGrid {
        /**
         * JQuery s gridem použité pro procházení nad seznamem šipkami přechozí / následující. Případně instance GridRC.
         * @type {JQuery<HTMLElement> | Components.GridRC<any>}
         */
        remoteControlGrid?: JQuery<HTMLElement> | Components.GridRC<any>;
    }
    /**
     * Vstupní paramet pro funkci buildDialog.
     *
     * @author TFeik
     * @since 482.1.0.715
     */
    interface BuildDialogInputParams<TDialogInputParams> extends WithRemoteControlGrid {
        /**
         * Vstupní parametry potřebné k otevření dialogu.
         * @type {OpenDialogParams<TDialogInputParams> | OpenDialogParamsWithRemoteControlGrid<TDialogInputParams>}
         */
        openDialogParams: OpenDialogParams<TDialogInputParams> | OpenDialogParamsWithRemoteControlGrid<TDialogInputParams>;
        /**
         * Název dialogu (včetně namespace).
         * @type {string | (string | ObjectLiteral<any>)[] | IGClientContentObject}
         */
        dialogName: string | (string | ObjectLiteral<any>)[] | IGClientContentObject | GContent;
        /**
         * Id dialogu (pro userSettings). V případě, že je dialogName string, pak je nepovinné (vezme se část dialogname za poslední tečkou).
         * @type {string}
         */
        id?: string;
        /**
         * Funkce sloužící pro kontrolu vstupních parametrů dialogu pro JavaScriptovou kontrolu, zda je možné dialog otevřít.
         * @type {(dialogInputParams: TDialogInputParams)}
         * @default > boolean | OpenDialogRejectType
         */
        isValid?: (dialogInputParams: TDialogInputParams | undefined | null) => boolean | OpenDialogRejectType;
        /**
         * Vlastnosti okna otevíraného dialogu.
         * @type {GDialogOptions}
         */
        windowParams?: GDialogOptions;
        /**
         * Gpc použité pro otevíraný content.
         * !!! POUŽÍVAT JENOM POKUD VÍCE PROČ TO CHCETE A CO TO DĚLÁ. !!!
         * @type {ObjectLiteral<string>}
         */
        newGpc?: ObjectLiteral<string>;
        /**
         * Slouží pro označení aktuální akce v tasklistu.
         * @type {string}
         */
        taskId?: string;
    }
    /**
     * Otevře dialog dle zadaných kritérií.
     *
     * @auth    TFeik
     * @date    12.03.2018
     *
     * @param {BuildDialogInputParams<TDialogInputParams>} input
     * @returns {JQueryPromise<TDialogReturnParams | undefined>}
     */
    function buildDialog<TDialogInputParams = any, TDialogReturnParams = any>(input: BuildDialogInputParams<TDialogInputParams>): JQuery.Promise<TDialogReturnParams | undefined, OpenDialogRejectType | undefined>;
    /**
     * Vytvoří komponentu GridRC pro procházení nad seznamem šipkami přechozí / následující.
     *
     * @author  TFeik
     * @date    08.12.2022
     * @since   488.1.0.543
     */
    function CreateGridRemoteControl<TGridRow = any>(
    /**
     * JQuery s gridem (případně instance GridRC) použité pro procházení nad seznamem šipkami přechozí / následující.
     * @type {JQuery<HTMLElement> | Components.GridRC<TGridRow>}
     */
    grid: JQuery<HTMLElement> | Components.GridRC<TGridRow> | undefined | null): Components.GridRC<TGridRow> | undefined;
}
declare namespace Gordic.Global.Enums {
    /**
     * ModOtevreni
     *
     * @author TFeik
     * @since 482.1.0.699
     */
    enum ModOtevreni {
        /**
         * Otevře jako základní content z hlavního menu (task panelu).
         */
        navigateTask = "navigateTask",
        /**
         * Otevře jako základní content.
         */
        navigate = "navigate",
        /**
         * Otevře jako modální okno.
         */
        showModalWindow = "showModalWindow",
        /**
         * Otevře jako nemodální okno.
         */
        showWindow = "showWindow",
        /**
         * Otevře podle parenta.
         */
        auto = "auto"
    }
    /**
     * Classy Gordických barev pro jednotlivé stavy.
     *
     * @author TFeik
     */
    enum ColorStateClass {
        info = " g-state-info ",
        warning = " g-state-warning ",
        success = " g-state-success ",
        error = " g-state-error ",
        important = " g-state-important ",
        active = " g-state-active ",
        inactive = " g-state-inactive data-deleted ",
        favorite = " g-state-favorite ",
        dataDeleted = " data-deleted "
    }
    /**
     * GridColumnFormatNumber
     *
     * @author TFeik
     * @since 482.1.0.38
     */
    enum GridColumnFormatNumber {
        /** (Default) Format: G, Příklad: 12,3456 */
        G = "G",
        /** Format: N0, Příklad: 123456 */
        N0 = "N0",
        /** Format: N0, Příklad: 1 234,00 */
        N2 = "N2",
        /** Format: P0, Příklad: 12% */
        P0 = "P0",
        /** Format: P2, Příklad: 12,56% */
        P2 = "P2"
    }
    /**
     * GridColumnFormatCurrency
     *
     * @author TFeik
     * @since 482.1.0.38
     */
    enum GridColumnFormatCurrency {
        /** (Default) Format: C2, Příklad: 1 234,00 */
        C2 = "C2",
        /** Format: C2,rn, Příklad: 1 234,00 (červeně) */
        C2n = "C2n",
        /** Format: C0, Příklad: 1 234 */
        C0 = "C0",
        /** Format: C0,rn, Příklad: 1 234 (červeně) */
        C0n = "C0n",
        /** Format: K0, Příklad: 1 234tis. */
        K0 = "C0",
        /** Format: K0rn, Příklad: 1 234tis. (červeně) */
        K0n = "C0n"
    }
    /**
     * GridColumnFormatDate
     *
     * @author TFeik
     * @since 482.1.0.38
     */
    enum GridColumnFormatDate {
        /** Format: datetime(smart), Příklad: dnes */
        smart = "smart",
        /** Format: datetime(date), Příklad: 19. 3. 2019 */
        date = "date",
        /** (Default) Format: date, Příklad: 19.03.2019 */
        DMR = "DMR"
    }
    /**
     * GridColumnFormatDateTime
     *
     * @author TFeik
     * @since 482.1.0.38
     */
    enum GridColumnFormatDateTime {
        /** Format: datetime(smarttime), Příklad: dnes 15:45 */
        smarttime = "smarttime",
        /** Format: datetime(datetime), Příklad: 19. 3. 2019 15:45:05 */
        datetime = "datetime",
        /** Format: datetime(dd.MM.yyyy hh:mm), Příklad: 19.03.2019 */
        DMRHM = "DMRHM",
        /** (Default) Format: datetime, Příklad: 19.03.2019 */
        DMRHS = "DMRHS"
    }
    /**
     * GridColumnFormatIcon
     *
     * @author TFeik
     * @since 482.1.0.38
     */
    enum GridColumnFormatIcon {
        /** Format: iconTempalte.text */
        text = "text",
        /** (Default?) Format: iconTempalte.icon */
        icon = "icon",
        /** ikona + text */
        full = "full"
    }
    /**
     * GridColumnFormatIcon
     *
     * @author TFeik
     * @since 482.1.0.38
     */
    enum GridColumnFormatBoolean {
        /** Format: Format: bool(icon), Příklad: Fajfka ve čtverečku / prázdný čtvereček */
        icon = "icon",
        /** (Default) Format: bool(iconsingle), Příklad: Fajfka / prázdno */
        iconsingle = "iconsingle",
        /** Format: Format: bool(anone), Příklad: ANO / NE */
        anone = "anone",
        /** Format: Format: bool(an), Příklad: A / N */
        an = "an",
        /** Format: Format: bool(onezero), Příklad: 1 / 0 */
        onezero = "onezero"
    }
    /**
     * Classy zpusobu pouziti Gordických barev.
     */
    enum ColorPlaceClass {
        front = " g-state-text ",
        background = " g-state "
    }
}
declare namespace Gordic.Utils {
    enum NamingConvention {
        Auto = 0,
        CamelCase = 1,// camelCase
        KebabCase = 2,// kebab-case
        PascalCase = 3,// PascalCase
        SnakeCase = 4,// snake_case
        TrainCase = 5,// Train-Case
        Hungarian = 6,// m_sHungarianConvention
        Text = 7
    }
    class GNameConvertor {
        private outputConvention;
        private inputConvention;
        static resolveConvention(s: string): NamingConvention.CamelCase | NamingConvention.KebabCase | NamingConvention.PascalCase | NamingConvention.SnakeCase | NamingConvention.TrainCase | NamingConvention.Hungarian | NamingConvention.Text;
        static upperCharPosition(s: string): number;
        constructor(outputConvention: NamingConvention, inputConvention?: NamingConvention);
        static RE_CAMEL_PASCAL_OR_SINGLE_WORD: RegExp;
        static RE_NON_WORD: RegExp;
        convertName(s: string, outputConvention?: NamingConvention): string;
        private wordsToCamelCase;
        private wordsCapitalize;
        convertObject(o: ObjectLiteral<any>, outputConvention?: NamingConvention): ObjectLiteral<any>;
    }
}
/**
 * Namespace obsahující různé pomocné funkce
 */
declare const Utils: typeof Gordic.Utils;
declare namespace Gordic.TypeGuards {
    export type typeOfs = "bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined";
    /**
     * Otestuje, jestli objekt obsahuje danou property.
     * @param obj testovaný objekt
     * @param property název property
     * @param type optional - lze možno přidat ověření na typeof dané property
     */
    export function hasProperty<K extends PropertyKey>(obj: unknown, property: K, type?: typeOfs): obj is Record<K, any>;
    /**
     * Otestuje, jestli objekt obsahuje danou property a následně bude možné k této property typově přistupovat. Pozor! vrací funkci!
     * Ukázka volání: TypeGuards.hasTypedProperty<GAction>()(this.actions, "actNew") //obsahují akce property actNew typu GAction? Pokud ano, lze pak volat např. this.actions.actNew.enabled() s funkční typovou kontrolou.*/
    export function hasTypedProperty<T>(): <K extends PropertyKey>(obj: unknown, property: K, type?: typeOfs) => obj is Record<K, T>;
    /**
     * Otestuje, jestli objekt obsahuje danou funkci.
     * @param obj
     * @param property
     */
    export function hasFunction<K extends PropertyKey>(obj: unknown, property: K): obj is Record<K, Function>;
    /**
     * Určí, jestli hodnota není null nebo undefined
     * @param value
     */
    export function nonNullable<T>(value: T): value is NonNullable<T>;
    type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;
    /**
     * Hodnota je truthy? tj. není false, prázdný string, číslo 0, null nebo undefined?
     * @param value
     */
    export function truthy<T>(value: T): value is Truthy<T>;
    /** Na základně existence nějaké klíčové property určí, že jde o daný typ. Používat obezřetně! */
    export function isOfType<T>(value: any, property: keyof T): value is T;
    export {};
}
/**
 * Namespace obsahující různé pomocné funkce
 */
declare namespace Gordic.Utils {
    export const getValueByKeyPath: typeof GData.getValueByKeyPath, setValueByKeyPath: typeof GData.setValueByKeyPath;
    export interface GCancellationObj {
        cancelled: boolean;
    }
    /**
     * GCancellationToken
     *
     * @author Vlastimil Máca
     * @since 482.1.0.695
     */
    export class GCancellationToken<T extends GCancellationObj = GCancellationObj> extends GObservableObject<GCancellationObj> {
        constructor(init?: T);
        cancel(): void;
    }
    /**
     * Hloubkově porovná dva a více objektů, zda se shodují.
     */
    /**
     * Porovná dva Objects, zda alespoň jeden obsahuje properties
     * druhého (vč. porovnání hodnot), tj. určí, zda jeden je
     * rozšířením druhého. Pokud se Objects zcela shodují, vrátí 0,
     * pokud ani jeden není rozšířením druhého, vrátí NaN, jinak
     * vrací číslo odpovídající počtu properties, které má širší
     * Object navíc, záporné číslo vyjadřuje, že druhý je širší a
     * naopak. Funkce je určená pro datové objects, neřeší
     * prototypes, testují se pouze own-enumerable properties.
     * @param objA
     * @param objB
     */
    export function objectCompare(objA: Object, objB: Object, strictEquality?: boolean): number;
    /**
     * Funkce obdobná s Array.prototype.map. Pro předaný object vrátí nový
     * object, který má totožné property, ale jejich hodnoty transformované přes
     * callback. Pokud callback pro některou property vrátí undefined (void),
     * property se do výsledného objectu nepropíše. Díky tomu je možné použít
     * tuto funkci pro filtrování properties (namísto klíčového slova delete).
     * @param object
     * @param callback
     */
    export function objectMap<T extends object>(object: T, callback: (value: any, key: keyof T) => any): T;
    /**
     * Vytvoří array o zadané velikosti, pokud je předán druhý parametr,
     * použije ho pro naplnění pole, jinak je vytvořeno pole undefined[].
     * @param length
     * @param item
     */
    export function arrayRepeat(length: number): undefined[];
    export function arrayRepeat<T>(length: number, item: Callback.Transformator<unknown, T>, thisArg?: any): T[];
    export function arrayRepeat<T>(length: number, item: T): T[];
    export function arrayTop(array: any[], count: number): any[];
    export const isIn: (node: Element, context: Element) => boolean;
    export const isInDOM: (node: Element) => boolean;
    export const onceAppendedTo: (el: Element, context: Element, callback: (this: Element) => any) => void;
    export const c2kConvert: (name: string) => string;
    /**
     * Vytvoří objekt obsahující pod každým klíčem cssClassName dle konvence BEM.
     * Na vstupu očekává prefix a pole řetězců, pokud je řetězec neprázdný, je
     * převeden do výstupu beze změny, pokud je řetězec prázdný, je ve výstupu
     * vytvořen na základě názvu klíče tak, že klíč je převeden do konvence BEM
     * a na začátku je uveden prefix.
     * @param prefix
     * @param classNames
     */
    export function prefixedClassNames<C extends ObjectLiteral<string>>(prefix: string, classNames: C): C;
    /**
     * Vráti funkci, která má spožděné opakované volání o interval.
     * Po uplynutí intervalu, pokud došlo k opakovanému volání,
     * se funkce zavolá znovu s naposledy předanými argumenty.
     * Během opakovaného volání funkce vrací poslední známý výstup.
     * @param fn
     * @param interval
     */
    export function throttled<T extends (...args: any[]) => any>(cb: T, interval?: number, options?: {
        leading?: boolean;
        trailing?: boolean;
    }): T;
    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked.
     *
     * @param {Function} func Function to execute
     * @param {Number} wait Time in ms to wait
     * @param {Boolean} immediate Execute on leading edge.
     */
    export function debounced<T extends AnyFunction>(func: T, wait?: number, options?: boolean | {
        leading?: boolean;
        trailing?: boolean;
        maxWait?: number;
    }): (T & ({
        cancel: () => void;
        flush: () => ReturnType<T>;
        pending: () => boolean;
    }));
    export const getTimezoneOffset: () => number;
    export const parseUserDateTime: (dateTime: string) => Date | null;
    /**
     * GImage
     *
     * @author TFeik
     * @since 482.1.0.124
     */
    export class GImage {
        path: string;
        alt?: string | undefined;
        title?: string | undefined;
        useGz?: boolean | undefined;
        /**
         * constructor
         *
         * @param {string} path
         * @param {string} [alt]
         * @param {string} [title]
         * @param {boolean} [useGz] Příznak, zda se má pro vytvoření cesty k souboru použít $.gz (default [true]), nebo přmo zadaná cesta (path) [false].
         */
        constructor(path: string, alt?: string | undefined, title?: string | undefined, useGz?: boolean | undefined);
        /**
         * toString
         *
         * @returns {string}
         */
        toString(): string;
        /**
         * preload
         *
         * @returns {this}
         */
        preload(): this;
        /**
         * toElement
         *
         * @param {any} alt (default = this.alt)
         * @param {any} title (default = this.title)
         * @returns {HTMLImageElement}
         */
        toElement(alt?: string | undefined, title?: string | undefined): HTMLImageElement;
    }
    export interface EpkResultDto {
        savingEnabled: boolean;
        podpis?: string | null;
        timestamp?: string | null;
        urlExt?: string;
        signingRetVal: string;
        filepath?: string;
        certThumbprint?: string;
    }
    export function convertToEpkResult(signedConfig: GSignCreateConfig & {
        ClientPath?: string;
    }, fileName: string, reason: any): EpkResultDto;
    /**
     * pomocná funcke pro parsování datumů
     * @param str
     */
    export function parseSingleDate(str?: string | null, dateOnly?: false): any;
    /**
     * pomocná funkce pro parsování datumových intervalů
     * @param str datum
     * @returns vrací správný tvar datumu nebo undefined
     */
    export function parseDate(str: any): any;
    export function _preParseDate(value: any, isDateOnly: any): any;
    export function _analyzeDate(str: any, empty: any): {
        fy: null;
        fm: null;
        fd: null;
        uy: boolean;
        um: boolean;
        ud: boolean;
        spec: number;
        isRef: () => boolean;
        applyRef: (mode: any) => any;
        freezeUserInput: () => void;
        toDate: (utc: any) => Date | null;
    } | null;
    /**
     * Zjistí, zda je používaný prohlížeč Internet Explorer.
     *
     * @author  TFeik
     * @date    13.05.2019
     *
     * @returns {boolean} True v případě, že používaný prohlížeč je Internet Explorer. Jinak False.
     */
    export function IsInternetExplorer(): boolean;
    /**
     * Vytvoří kopii hodnoty (tak, aby byly přeneseny data, ale ne reference).
     *
     * @author  TFeik
     * @date    03.07.2019
     *
     * @param {TValue} value Hodnota, ze které vznikne kopie.
     */
    export function DeepClone<TValue>(value: TValue): TValue;
    /**
     * Zkontroluje, zda požadovaný widget existuje.
     *
     * @author  TFeik
     * @date    03.07.2019
     *
     * @param {string} widgetName Název widgetu, jehož existenci kontrolujeme.
     * @param {JQuery<HTMLElement> | JQuery<Element>} [element] JQuery elementu, na kterém je / má být widget.
     * @returns {boolean} True v případě, že widget existuje a je možné jej použít. Jinak False.
     */
    export function WidgetExists(widgetName: 'ganonymizer' | 'gbasepanel' | 'gbuttonpanel' | 'gcalendar' | 'gcontent' | 'gcolorpicker' | 'gform' | 'gfield' | 'gdashboardpanel' | 'gflashmanager' | 'ggrid' | 'ggroupable' | 'gchart' | 'ghelper' | 'gform' | 'glogin' | 'glogin_control' | 'glogin_control_ginit' | 'gnote' | 'golmaps' | 'goutline' | 'gpdfannotator' | 'gprogressbar' | 'gprogressoverlay' | 'gsearchfield' | 'gtabmanager' | 'gtinygrid' | 'gtooltip' | 'gwalkthrough' | 'giconbar' | 'gkeywords' | 'gattachment' | 'gattachmentgrid' | 'gsigselect' | 'gfilterpanel' | 'ginlinedialog' | 'gpreview' | 'gsidebar' | 'ggridcelleditor' | 'gbutton' | 'gtab' | 'gautofit', element: JQuery<HTMLElement> | JQuery<Element> | null | undefined): element is JQuery<HTMLElement> | JQuery<Element>;
    /**
     * Vrátí barvu odpovídající dazanému resultKind.
     *
     * @author  TFeik
     * @date    27.11.2019
     *
     * @param {Isl.GOperationResultKind} [kind]
     * @returns {GState}
     */
    export function OperationResultKindToGState(kind?: Isl.GOperationResultKind): GState;
    /**
     * export function GetErrorMessageFromOperationResult<T = any>
     *
     * @author  TFeik
     * @date    31.01.2020
     *
     * @param {Isl.GOperationResult<T> | null} [operationResult]
     * @returns {string}
     */
    export function GetErrorMessageFromOperationResult<T = any>(operationResult?: Isl.GOperationResult<T> | null): string;
    /**
     * Vstupní parametry funkce Gordic.Utils.CreateMailToLink.
     *
     * @author TFeik
     * @date    08.04.2020
     * @since 484.1.0.296
     */
    export interface MailToLinkOptions {
        /**
         * Adresát
         * @type {string}
         */
        to?: string;
        /**
         * Předmět emailu.
         * @type {string}
         */
        subject?: string;
        /**
         * Obsah / tělo emailu.
         * @type {string}
         */
        body?: string;
    }
    /**
     * Vytvoří odkaz pro otevření emailu.
     *
     * @author  TFeik
     * @date    08.04.2020
     *
     * @param {MailToLinkOptions} options
     */
    export function CreateMailToLink(options: MailToLinkOptions): string;
    /**
     * Otevře emailového klienta.
     *
     * @author  TFeik
     * @date    08.04.2020
     *
     * @param {MailToLinkOptions} options
     * @returns {JQuery.Promise<undefined>}
     */
    export function OpenEmailClient(options: MailToLinkOptions): JQuery.Promise<undefined>;
    export interface AreEqualSettings {
        isEqualUdefinedNull?: boolean;
        isEqualUdefinedNullEmpty?: boolean;
        isOrderInArrayInportant?: boolean;
    }
    /**
     * Porovná, zda jsou pole stejná, dle daného nastavení.
     *
     * @author  TFeik
     * @date    22.05.2020
     *
     * @param {any[] | undefined | null} arrayA
     * @param {any[] | undefined | null} arrayB
     * @param {AreEqualSettings} [settings]
     * @returns {boolean}
     */
    export function AreArraysEqual(arrayA: any[] | undefined | null, arrayB: any[] | undefined | null, settings?: AreEqualSettings): boolean;
    /**
     * Porovná, zda jsou objekty stejné, dle daného nastavení.
     *
     * @author  TFeik
     * @date    22.05.2020
     *
     * @param {object | undefined | null} objectA
     * @param {object | undefined | null} objectB
     * @param {AreEqualSettings} [settings]
     * @returns {boolean}
     */
    export function AreObjectsEqual(objectA: object | undefined | null, objectB: object | undefined | null, settings?: AreEqualSettings): boolean;
    /**
     * metoda, která provede validaci formuláře a vrátí výsledek validace až je formulář připraven
     *
     * @author  thazmuka
     * @date    20.08.2020
     *
     * @param form element formuláře
     */
    export function waitForValues(form: JQuery<HTMLElement>): JQueryPromise<boolean>;
    /**
     * Najde parent contet a mód otevření dle eventu.
     *
     * @author  TFeik
     * @date    09.11.2023
     *
     * @param {JQueryEventObject | undefined | null} event
     */
    export function FindContentFromEvent(event: JQueryEventObject | undefined | null): {
        content: GContent;
        modOtevreni: Global.Enums.ModOtevreni;
    };
    /**
     * Převede enum typu databáze na uživatelský text.
     *
     * @author  TFeik
     * @date    20.03.2024
     *
     * @param {General.GCommon.DatabaseType | null | undefined} databaseType
     * @returns {string | void}
     */
    export function GetDatabaseTypeTxt(databaseType: General.GCommon.DatabaseType | null | undefined): string | undefined;
    type TupleToObject<T extends any[]> = Omit<T, keyof any[]>;
    /**
     * Z pole hodnot vyrobí objekt (property pojmenuje podle pole názvů)
     * ["a","b"],[0,1] => {a:0, b:1}
     * @author vmaca
     * @param names
     * @param tuple
     * @returns
     */
    export function tupleToObject<T extends any[], N extends PropertyKey[] & Record<keyof TupleToObject<T>, PropertyKey>>(names: [...N], tuple: [...T]): { [K in keyof TupleToObject<T> as N[K]]: T[K]; };
    /**
      * Z polí hodnot vyrobí objekty (property pojmenuje podle pole názvů)
     * ["a","b"], [[0,1], [4,5], [5,6]] => [{a:0, b:1},{a:4, b:5},{a:5, b:6}]
     *
     * @author vmaca
     * @param names
     * @param tuples
     * @returns
     */
    export function tuplesToObjects<T extends any[], N extends PropertyKey[] & Record<keyof TupleToObject<T>, PropertyKey>>(names: [...N], tuples: ([...T])[]): { [K in keyof TupleToObject<T> as N[K]]: T[K]; }[];
    /**
      * Pro pole názvů připraví funkci, která bude z polí hodnot vyrábět objekty
     * g = (["a","b"]); g([0,1]); g([4,5]); g([5,6]); => {a:0, b:1}; {a:4, b:5}; {a:5, b:6};
     *
     * @author vmaca
     * @param names
     * @param tuples
     * @returns
     */
    export function tupleToObjectGenerator<N extends PropertyKey[]>(names: [...N]): <T extends any[], H extends N & Record<keyof TupleToObject<T>, PropertyKey>>(tuple: [...T]) => { [K in keyof TupleToObject<T> as H[K]]: T[K]; };
    export function tuplesToObjectsGenerator<N extends PropertyKey[]>(names: [...N]): <T extends any[], H extends N & Record<keyof TupleToObject<T>, PropertyKey>>(tuples: ([...T])[]) => { [K in keyof TupleToObject<T> as H[K]]: T[K]; }[];
    /**
     * NEPOUZIVAT: Kopiruje metody prototypu na extenderu na target. Nic nehlida, natvrdo je prepisuje.
     */
    export function extendWithProtoMethods<T extends {}, TT extends {}>(target: T, extender: TT): T & TT;
    export {};
}
/**
 * Namespace obsahující funkce, které byly původně v prefabech - přesunuto z controlslogic
 */
declare namespace Gordic.Prefabs.Selector {
    interface IGAktivitaActualFiltersDto {
        aktivita: number | number[];
    }
    interface IGOblibeneActualFiltersDto {
        Oblibene: number;
    }
    interface IGSelectorsContentDto extends GContent {
        actualFilters: IGAktivitaActualFiltersDto | IGOblibeneActualFiltersDto;
        filterData(): any;
    }
    namespace SubTasks {
        interface IGSubTasksDto {
            activeItem: number;
            params: MenuParams[];
        }
        const Aktivita: IGSubTasksDto;
        const Oblibene: IGSubTasksDto;
    }
}
declare namespace Gordic.Prefabs.Utils {
    /**
        * Funkce vrací formátovaný string pro období (od začátek_intervalu do konec_intervalu)
        * @param {string | number | null} first Začátek intervalu
        * @param {string | number | null} second Konec intervalu
        * @returns {string | number} Řetězec pro rozsah období
        * @author PNovak
        * @date 2018-03-13
        */
    function getRangeString(first?: string | number | null, second?: string | number | null): string;
    /**
     * Funkce vrací naformátované datum
     * @param {string} date Zobrazované datum
     * @returns {string} Lokální datum
     * @author PNovak
     * @date 2018-03-13
     */
    function getDatum(datum?: string | null): string;
    /**
    * Funkce vrací naformátovaný řetězec pro datum od - do
    * @param {string} fromDate Datum od
    * @param {string} toDate Datum do
    * @returns {string | undefined} Řetězec pro rozsah období
    * @author PNovak
    * @date 2018-03-13
    */
    function getDateFromTo(fromDate?: string | null, toDate?: string | null): string;
    /**
     * Funkce vrací příznak, zda zadaná hodnota je prázdná
     * @param {string | number | null | undefined} value Ověřovaná hodnota
     * @returns {boolean} Příznak, zda se jedná o prázdnou hodnotu
     * @author PNovak
     * @date 2018-03-13
     */
    function isEmpty(value?: string | number | boolean | null): boolean;
    /**
     * Vrací formátovaný řetězec z hodnot oddělený zadaným separátorem
     * @param {any[]} values Pole hodnot
     * @param separator Separátor
     * @returns {string} Formátovaný řetězec z pole hodnot oddělený zadaným separátorem
     * @author PNovak
     * @date 2018-03-13
     */
    function getFormatedString(values: any[], separator: string): string;
    /**
     * Funkce vrací řetězec se (@see simSeparator simple separátorem). Část před nebo za separátorem může být tučně (třetí argument).
     * @param {string|number|boolean|undefined} info První část uvedená před simple separátorem
     * @param {string|number|boolean|undefined} more Druhá část uvedená za simple separátorem
     * @param {string|undefined} options Zvýraznění "fb" - první tučné, "sb" - druhé tučné, neuvedeno(undefined) - bez zvýraznění
     * @returns {string} Formatovaný řetězec se (@see simSeparator simple separátorem)
     * @author PNovak
     * @date 2018-03-13
     */
    function getSimpleInfoString(info?: string | number | boolean, more?: string | number | boolean, options?: "sb" | "fb"): string;
    /**
     * Funkce vrací řetězec oddělený default separátorem. ( "|klíč: hodnota")
     * @param {any[]} dictionary Pole hodnot
     * @returns {string} Řetězec, který obsahuje default separátor.
     * @author PNovak
     * @date 2018-03-13
     */
    function getFormatedLabeledString(dictionary: ObjectLiteral<string | boolean | number | null | undefined>): string;
    /**
     * Dto pro rozlišení hodnoty na dvě části (info a more)
     * @author PNovak
     * @date 2018-03-13
     */
    interface IGFormatInfoFieldDto {
        /** První část hodnoty */
        info: string | number | boolean;
        /** Druhá část hodnoty */
        more: string | number | boolean;
    }
    /**
     * Funkce vrací první část hodnoty tučnou a druhá část je oddělená default separátorem
     * @param {IGFormatInfoFieldDto} value Hodnota pro formátovaní
     * @returns {string} Naformátovaný řetězec, používá se u vlastností políčka
     * @author PNovak
     * @date 2018-03-13
     */
    function getInfoStr(obj: IGFormatInfoFieldDto): string;
    /**
     * Vrací zakódované obě hodnoty
     * @param {IGFormatInfoFieldDto} obj Hodnota pro formátovaní
     * @returns {string} Naformátovaný řetězec
     * @author PNovak
     * @date 2018-03-13
    */
    function getInfoStrEncode(obj: IGFormatInfoFieldDto): string;
    /**
     * Vrací nezakódované hodnoty. Hodnoty byly již zakódovány.
     * @param {IGFormatInfoFieldDto} obj Hodnota pro formátovaní
     * @returns {string} Naformátovaný řetězec
     * @author PNovak
     * @date 2018-03-13
     */
    function getInfoNoEncodeStr(obj: IGFormatInfoFieldDto): string;
    /**
     * Funkce vrací otrimovaný řetězec
     * @param {any} val vstupní řetězec
     * @returns {string|number|boolean} Otrimovaný řetězec
     * @author PNovak
     * @date 2018-03-13
     */
    function getTrimEncodeString(val: string | number | boolean): string | number | boolean;
    /**
     * Vrací itemTemplate pro dvouřádkové zobrazení s ikonkou na začátku.
     * @param {IGFormatInfoFieldDto&{icon}} value Hodnota pro formátovaní
     * @returns {string} Naformátovaný řetězec
     * @author VMaca
     * @date 2018-09-27
     */
    function getDoubleLineInfo(obj: Partial<IGFormatInfoFieldDto> & {
        infoElement?: string;
        moreElement?: string;
        icon?: string | string[] | IconTemplate | IconTemplate[];
    }): string;
    function getSingleLineLeftRightInfo(obj: any): string;
    /**
      * Vrací itemTemplate pro jednořádkové zobrazení s ikonkou na začátku.
      * @param {IGFormatInfoFieldDto&{icon}} obj Hodnota pro formátovaní
      * @returns {string} Naformátovaný řetězec
      * @author VMaca
      * @date 2019-12-13
      */
    function getSingleLineInfo(obj: Partial<IGFormatInfoFieldDto> & {
        infoElement?: string;
        moreElement?: string;
        icon: string | string[] | IconTemplate | IconTemplate[];
    }): string;
}
interface JQuery {
    isInDOM(): boolean;
    onceAppendedTo(context: Node, callback: (this: Element) => any): JQuery;
    isOverflowed(direction?: "x" | "y" | "both"): boolean;
}
/**
 * Provede prevod na Date. Pokud typ je Date, vrati puvodni instanci.
 * @param d
 */
declare function parseDate(d: JsonDate): Date;
/**
 * Provede prevod na decimal. Pokud je na vstupu typ Decimal, vrati puvodni instanci.
 * @param d
 */
declare function parseDecimal(d: JsonDecimal | number): Decimal;
/**
 * Prevod BASE64 stringu na Unicode
 * Pouziva se pro prevod textu z doplnku
 * @param {string} str Prevadeny text
 * @returns {string} Vysledek prevodu
 */
declare function base64DecodeUnicode(str: any): string;
/**
 * Určí, zda argument je číslo.
 * Náhrada za jQuery.isNumeric(), viz: https://stackoverflow.com/a/1830844
 *
 * @param {any} n
 * @returns {boolean}
 */
declare function isNumeric(n: any): n is number;
declare namespace Gordic.Utils.DateTime {
    type Measurement = "years" | "months" | "quarters" | "weeks" | "days" | "hours" | "minutes" | "seconds" | "milliseconds";
    interface IGTryParseResult {
        isValid: boolean;
        result: Date | null;
    }
    /**
     * Dokaze parsovat datum a cas z techto stringu:
     * yyyy-MM-dd
     * YYYY-MM-DDTHH:mm:ss.sssZ
     * yyyyMMdd
     * yyyyMMdd HHmmss
     * dd.MM.yyyy
     * dd.MM.yyyy HH:mm:ss
     * yyyy-MM-dd HH:mm:ss.fff
     * dd.MM.yyyy HH:mm:ss
     * null = new Date(NaN)
     * undefined = now
     */
    function parse(d?: JsonDate | null): Date;
    /** Pokusi se parsovat datum a cas. Nevyhazuje vyjimky. */
    function tryParse(d?: JsonDate | null): IGTryParseResult;
    function clone(date: Readonly<Date>): Date;
    function isValid(d: Date): boolean;
    function add(date: Readonly<Date>, amount: number, unit: Measurement): Date;
    function addYears(date: Readonly<Date>, years: number): Date;
    function addMonths(date: Readonly<Date>, months: number): Date;
    function addDays(date: Readonly<Date>, days: number): Date;
    function addHours(date: Readonly<Date>, hours: number): Date;
    function addMinutes(date: Readonly<Date>, minutes: number): Date;
    function addSeconds(date: Readonly<Date>, seconds: number): Date;
    function addMilliseconds(date: Readonly<Date>, ms: number): Date;
    /** Začátek dne (lokální čas) */
    function getStartOfDay(date: Readonly<Date>): Date;
    /** Konec dne (lokální čas) */
    function getEndOfDay(date: Readonly<Date>): Date;
    /** Začátek týdne v 00:00:00.000 (lokální čas) */
    function getStartOfWeek(date: Readonly<Date>): Date;
    /** Konec týdne ve 23:59:59.999 (lokální čas) */
    function getEndOfWeek(date: Readonly<Date>): Date;
    /** Začátek měsíce v 00:00:00.000 (lokální čas) */
    function getStartOfMonth(date: Readonly<Date>): Date;
    /** Poslední den měsíce ve 23:59:59.999 (lokální čas) */
    function getEndOfMonth(date: Readonly<Date>): Date;
    /** Začátek roku v 00:00:00.000 (lokální čas) */
    function getStartOfYear(date: Readonly<Date>): Date;
    function getStartOfYear(year: number): Date;
    /** Konec roku v 23:59:59.999 (lokální čas) */
    function getEndOfYear(date: Readonly<Date>): Date;
    function getEndOfYear(year: number): Date;
    /** Den v tydnu dle ISO 8601 (1 = pondeli, 7 = nedele) https://www.timeanddate.com/calendar/days/ */
    function getIsoWeekDay(date: Readonly<Date>): number;
    /**
     * Porovnani na datum a cas.
     * @param t1
     * @param t2
     * @returns 0 = stejne, 1 = t1 je pozdeji nez t2, -1 = t2 je pozdeji nez t1
     */
    function compare(t1: Readonly<Date>, t2: Readonly<Date>): number;
    /**
     * Rozdil mezi datumem a casem
     *
     * @param {Date} earlier drivejsi
     * @param {Date} latter pozdejsi
     * @param {Measurement} units (default = "milliseconds") jednotky
     * @param {boolean} asFloat (default = false) vysledek na cela cisla?
     * @returns {number} rozdil v jednotkach, ktere jsou na vstupu (arg. 'units')
     */
    function diff(earlier: Readonly<Date>, latter: Readonly<Date>, units?: Measurement, asFloat?: boolean): number;
    function addUtc(date: Readonly<Date>, amount: number, unit: Measurement): Date;
    function addYearsUtc(date: Readonly<Date>, years: number): Date;
    function addMonthsUtc(date: Readonly<Date>, months: number): Date;
    function addDaysUtc(date: Readonly<Date>, days: number): Date;
    function addHoursUtc(date: Readonly<Date>, hours: number): Date;
    function addMinutesUtc(date: Readonly<Date>, minutes: number): Date;
    function addSecondsUtc(date: Readonly<Date>, seconds: number): Date;
    function addMillisecondsUtc(date: Readonly<Date>, ms: number): Date;
    /**
     * Začátek dne v 00:02:00.000 (UTC)
     *  */
    function getStartOfDayUtc(date: Readonly<Date>): Date;
    /**
     * Konec dne v 00:02:00.000 (UTC)
     * - stejné jako začátek dne
     *  */
    function getEndOfDayUtc(date: Readonly<Date>): Date;
    /** Začátek týdne v 00:02:00.000 (UTC) */
    function getStartOfWeekUtc(date: Readonly<Date>): Date;
    /**
     * Konec týdne v 00:02:00.000 (UTC)
     *  */
    function getEndOfWeekUtc(date: Readonly<Date>): Date;
    /** Začátek měsíce v 00:02:00.000 (UTC) */
    function getStartOfMonthUtc(date: Readonly<Date>): Date;
    /** Poslední den měsíce v 00:02:00.000 (UTC) */
    function getEndOfMonthUtc(date: Readonly<Date>): Date;
    /** Začátek roku v 00:02:00.000 (UTC) */
    function getStartOfYearUtc(date: Readonly<Date>): Date;
    function getStartOfYearUtc(year: number): Date;
    /** Poslední den roku v 00:02:00.000 (UTC) */
    function getEndOfYearUtc(date: Readonly<Date>): Date;
    function getEndOfYearUtc(year: number): Date;
    /**
     * Den v tydnu dle ISO 8601 (1 = pondeli, 7 = nedele) https://www.timeanddate.com/calendar/days/
     * - UTC
     */
    function getIsoWeekDayUtc(date: Readonly<Date>): number;
    /** Vytvori datum s casovou slozkou pro UTC 00:00:00 */
    function getUtcMidnight(date: Readonly<Date>): Date;
    /**
     *  Upravi datum a cas tak, aby z sheetJS vypadl tak, jak ho pouzivame v aplikacich my
     * @param date
     * @returns
     */
    function getTimeForSheetJS(date: Readonly<Date>): Date;
}
declare namespace Gordic.Utils {
    const randomInteger: (from?: number, to?: number) => number;
    function zeropad(num: number | string, padTo?: number): string;
}
declare namespace Gordic.Utils {
    /**
     * Třída pro lazy inicializaci dat
     */
    class Lazy<T> {
        /**
         * Když isReady === false, value obsahuje promise hodnoty, jinak hodnotu
         * samotnou.
         */
        value: T & {
            then(cb: (value: T) => any): T;
            fail(cb: (...args: any[]) => any): T;
        };
        /**
         * Pokud hodnota není načtená, nebo se načítá, vrací false a iniciuje
         * získání hodnoty, pokud ještě nezačalo. Jinak vrací true
         */
        get isReady(): boolean;
        constructor(initializer: () => T | JQueryPromise<T>);
    }
}
declare namespace Gordic.Utils {
    /**
     * Objekt zapouzdřující práci s cookies.
     *
     * příklad:
     *
     *  var allCookies = new GCookie()
     *  var specificCookie = allCookies["specificCookie"]
     *  // nastavení cookie
     *  allCookies.set("newCookie", "value", options)
     *  // smazání cookie
     *  allCookies.remove("newCookie")
     */
    class GCookie {
        /** Všechna aktuálně dostupná cookies. */
        [cookie: string]: any;
        constructor();
        /**
         * Nastaví cookie.
         * @param cookie
         * @param value
         * @param options
         */
        set(cookie: string, value: string, options?: {
            /** (default = undefined) Omezí cookie na určitou url např.
            obsahující v cestě "/docs". */
            path?: string;
            /** (default = location.host) Omezí cookie na určitou sub/-doménu
            např. "shop.example.com", uvedením bez subdomény jako "example.com"
            lze cookie rozšířit na všechny subdomény. */
            domain?: string;
            /** (default = vyprší společně s browser session) Platnost cookie
            jako počet sekund (unsigned int) od okamžiku nastavení.
            Má vyšší prioritu než volba "expires". */
            maxAge?: string | number;
            /** (default = vyprší společně s browser session) Okamžik jako Date
            nebo UTCString, kdy dojde k zneplatnění cookie.
            Má nižší prioritu než volba "maxAge". */
            expires?: string | Date;
        }): this;
        /**
         * Zneplatní cookie.
         * @param cookie
         */
        remove(cookie: string): this;
        /**
         * Vrátí dekódovanou hodnotu z cookie dle klíče.
         *
         * @author  TFeik
         * @date    24.04.2018
         *
         * @param {string} cookie Klíč hodnoty v cookie.
         * @returns Hodnota z cookie.
         */
        get(cookie: string): string;
    }
}
declare namespace Gordic.Utils {
    class Form {
        /**
         * Array.reduce callback. Převede pole fields na object
         * { [fieldName]: $field }.
         * @param obj
         * @param e
         */
        static onFields(obj: ObjectLiteral<JQuery>, e: Element): ObjectLiteral<JQuery<HTMLElement>>;
        /**
         * jQuery filter callback. Filtruje políčka nezměněná uživatelem.
         * @param idx
         * @param e
         */
        static jqIsUnchanged(this: Element): boolean;
        /**
         * Název třídy, kterou přidáte do customClass řádku v případě, že využíváte automatické označení required řádku
         * dle validátorů pomocí funkce markRequired, s vyjímkou konkrétního řádeku.
         */
        static readonly MarkRequireIgnoreClassName = "js-ignore-mark-required";
        /**
         * Projde všechny políčka formuláře a označí je jako required, pokud obsahují políčko s validátorem required.
         *
         * @param {JQuery<HTMLElement>} gform JQuery s formulářem, řádky, nebo políčky.
         * @param {string | string[]} [validationGroup] Validační skupiny, pro které se mají required validátory testovat (zobrazit).
         * @returns {JQuery<HTMLElement>} Vstupní JQuery s formulářem, řádky, nebo políčky.
         */
        static markRequired(gform: JQuery<HTMLElement>, validationGroup?: string | string[]): JQuery<HTMLElement>;
        /**
         * Počká až budou načteny všechna políčka a následně formulář zvaliduje. Pokud je validní, pak promis resolve. V opačném pčípadě jej rejectne.
         *
         * @author  TFeik
         * @date    25.11.2019
         *
         * @param {JQuery<HTMLElement> | undefined | null} form Element, na kterém je formulář.
         * @param {string | string[]} [validationGroups] Validační skupiny pro validaci.
         * @returns {JQuery.Promise<undefined>} Promise výsledku validace. Pokud je resolved pak je formulář plně naten a validní. V jakémkoli jiném řípadě je rejected.
         */
        static WaitForValuesAndValidate(form: JQuery<HTMLElement> | undefined | null, validationGroups?: string | string[]): JQuery.Promise<undefined>;
        /**
         * Spustí delegát funkce pro každé políčko ve formulářích.
         *
         * @author  TFeik
         * @date    20.06.2023
         */
        static ForeachFields(
        /**
         * Formuláře.
         * @type {Forms.Form[]}
         */
        forms: Forms.Form[] | null | undefined, 
        /**
         * Spouštěná funkce.
         * @type {(field: Forms.FormField) => void}
         */
        delegate: ((field: Forms.FormField, row: Forms.FormRow, section: Forms.FormSection) => void) | null | undefined): void;
    }
}
declare namespace Gordic.Utils {
    class GStyle {
        private _element;
        get sheet(): CSSStyleSheet;
        constructor(media?: string);
        destroy(): void;
        setCSSRule(selector: string, cssProps: Object, mediaQuery?: string): this;
        removeCSSRule(selector: string, mediaQuery?: string): this;
        private _findRule;
        static encodeCssProps(props: Object): string;
        static decodeCssProps(properties: string): Object;
        /** Upraví libovolný string aby neobsahoval významové symboly
          * z hlediska css */
        static sanitize: (input: string) => string;
        static screen: GStyle;
        listRules(like?: string | RegExp): ObjectLiteral<CSSStyleRule>;
        static listRules(like?: string | RegExp, sheets?: CSSStyleSheet | CSSStyleSheet[]): ObjectLiteral<CSSStyleRule>;
    }
}
declare namespace Gordic.Utils {
    interface WindowFeatures {
        /** A dependent window closes when its parent window closes. */
        dependant?: boolean;
        /** Height of the new window in px. Minimum is 100. */
        height?: number;
        /** Distance in px of new window from left side of browser window */
        left?: number;
        /** Weather render Location/Address bar */
        location?: boolean;
        /** Weather render Menu bar. */
        menubar?: boolean;
        /** If this feature is on, the window will be resizable. */
        resizable?: boolean;
        /** Weather render Status bar. */
        status?: boolean;
        /** Weather render Navigation Toolbar. */
        toolbar?: boolean;
        /** Distance in px of new window from top side of browser window */
        top?: number;
        /** Width of the new window in px. Minimum is 100. */
        width?: number;
    }
    /**
     * Otevře nové okno přes window.open() a zjednodušuje práci s ním.
     */
    class GSpawnedWindow {
        protected targetName: string;
        /** Url načtené do okna, prázdná hodnota načte blank page  */
        protected url: string | undefined;
        /** Odkaz na globální context otevřeného okna */
        window: Window | null;
        protected _features?: string | (() => WindowFeatures);
        /**
         * Konstruktor otevřeného okna.
         * @param targetName název otevřeného okna, který se používá interně a
         *  lze ho použít ke směřování URL adres přes atribut <a target="... >.
         *  Nesmí obsahovat mezery.
         * @param features standardně string, ale pro lepší práci předěláno na
         *  typový objekt, ze kterého se poté skládají vlasnosti pro nové okno.
         *  Může se jednat o funkci, která se zavolá při otevírání okna metodou
         *  open() a vrátí features platné v danou chvíli.
         */
        constructor(targetName: string, features?: WindowFeatures | (() => WindowFeatures));
        /**
         * Funkce otevře nové okno. Pokud okno je již otevřené, zavolá na něm
         * focus() takže lze volat opakovaně.
         * @param url url adresa pro otevřené okno. Prázdný řetězec otevře blanc
         *  page.
         * @param features objekt obsahující vlastnosti okna.
         */
        open(url: string, features?: WindowFeatures): boolean;
        /**
         * Zavře otevřené okno.
         */
        close(): boolean;
        /**
         * Převede objekt obsahující features na textový řetězes, který vyžaduje
         * nativní window.open().
         * @param features
         */
        static featuresToString(features?: WindowFeatures): string | undefined;
    }
}
declare namespace Gordic.Utils {
    const getGeolocation: () => JQueryPromise<Api.Position>;
}
declare namespace Gordic.Utils {
    type _colorStates = "error" | "success" | "warning" | "info" | "important" | "active" | "inactive" | "favorite";
    type _colorVariants = "text" | "bg" | "bgLight" | "bgTrans";
    type _colorsCombinedState = `state${Capitalize<_colorStates>}`;
    type _colorsCombinedType = `${_colorVariants}${Capitalize<_colorStates>}`;
    type _colorsCombinedFnType = `${_colorsCombinedType}Fn`;
    type _colorsCombinedStateFnType = `${_colorsCombinedState}Fn`;
    type _colorsFinalType = {
        readonly [k in _colorsCombinedType]: `g-state-${string} g-state-${string}`;
    } & {
        readonly [k in _colorsCombinedState]: `g-state-${string}`;
    } & {
        readonly [k in _colorsCombinedFnType]: <V extends string>(x?: V) => `${V} g-state-${string} g-state-${string}`;
    } & {
        readonly [k in _colorsCombinedStateFnType]: <V extends string>(x?: V) => `${V} g-state-${string}`;
    } & {
        readonly [k in _colorVariants]: <V extends _colorStates>(string: V, spaces?: false) => `g-state-${string} g-state-${V}`;
    } & {
        readonly [k in 'state']: <V extends _colorStates>(string: V, spaces?: false) => `g-state-${V}`;
    };
    export const Colors: _colorsFinalType;
    export class Color {
        /** Červená barevná složka jako 8-bit int */
        red: number;
        /** Zelená barevná složka jako 8-bit int */
        green: number;
        /** Modrá barevná složka jako 8-bit int */
        blue: number;
        /** Alpha kanál jako float <0;1> */
        alpha: number;
        /**
         *  Vrátí číslo odpovídající vnímanému jasu, např. pro porovnání
         *  kontrastu dvou různých barev.
         */
        get brightness(): number;
        /**
         *  Vrátí hexadecimální zápis barvy (bez alpha kanálu).
         */
        get hex(): string;
        /**
        *  Vrátí hexadecimální zápis barvy (bez alpha kanálu).
        */
        get hexa(): string;
        /**
         *  Vrátí rgb() zápis barvy.
         */
        get rgb(): string;
        /**
         *  Vrátí rgba() zápis barvy.
         */
        get rgba(): string;
        /**
         *  Vrátí hsl() zápis barvy.
         */
        get hsl(): string;
        /**
         *  Vrátí hsla() zápis barvy.
         */
        get hsla(): string;
        /**
         * Vrátí pole o 3 prvcích - [R,G,B]
         *
         * @returns {number[]}
         */
        get rgbArray(): number[];
        /**
         * Vrátí pole o 4 prvcích - [R,G,B,A]
         *
         * @returns {number[]}
         */
        get rgbaArray(): number[];
        private get _HSL();
        /**
         * Copy constructor
         *
         * @param {Color} color
         */
        constructor(color: Color);
        /**
         * Kontruktor pro číselné zadání jednotlivých barevných složek.
         * @param red
         * @param green
         * @param blue
         * @param alpha
         */
        constructor(red: number, green: number, blue: number, alpha?: number);
        /**
         * Konstruktor pro zadání barvy textem. Akceptuje výrazy platné v
         * css a umí dekódovat i serializovanou c# barvu.
         * @param color
         */
        constructor(color: string);
        toString(): string;
        toValue(): number;
        /**
         * Vrátí novou instanci barvy, jasnější o zadanou hodnotu.
         * @param percent desetinné číslo <0;1> určující zvýšení jasu. Procento
         * má relativní význam k celkové stupnici jasu, hodnota o 0.15 zvýší jas
         * o 15% maximálního jasu, nikoliv o 15% původního jasu.
         */
        darker(percent: number): Color;
        /**
         * Vrátí novou instanci barvy, temnější o zadanou hodnotu.
         * @param percent desetinné číslo <0;1> určující snížení jasu. Procento
         * má relativní význam k celkové stupnici jasu, hodnota 0.15 sníží jas
         * o 15% maximálního jasu, nikoliv o 15% původního.
         */
        lighter(percent: number): Color;
        /**
        * Převede RGB barvu tak, aby na RGBA se zadaným pozadím a zadanou průhledností vypadala stejně jako původní rgb barva.
        *
        * @param {any} alpha
        * @param {Color} background (default = new Color(255,255)
        */
        toRGBA(alpha: any, background?: Color): Color;
        /**
         * Zesvětlení o 0.xx% - alternativa k lighter, které pracuje nad HSL ... toto pracuje s RGB
         *
         * @param {number} enlight
         * @param {Color} background (default = new Color(255, 255)
         */
        enlighten(enlight: number, background?: Color): Color;
        /**
        * Ztmavení o 0.xx% - alternativa k darker, které pracuje nad HSL ... toto pracuje s RGB
        *
        * @param {number} endark
        * @param {Color} background (default = new Color(255, 255)
        */
        endarken(endark: number, background?: Color): Color;
        /**
        * toRGB
        *
        * @param {Color} background (default = new Color(255, 255)
        */
        toRGB(background?: Color): Color;
    }
    export {};
}
declare namespace Gordic.Utils.File {
    /**
     * Returns name of file without extension
     * @param fileNameWithExtension
     */
    function getFileNameWithoutExtension(fileNameWithExtension: string): string;
    /**
     * Returns file size in byte units
     * @param size
     */
    function getFileSize(byteSize: number, isDecimal?: boolean): string;
    function getFileSizeUnit(byteSize: number, isDecimal?: boolean): string;
    function getFileSizeNumber(byteSize: number, isDecimal?: boolean): string;
    /**
     *
     * @param size
     * @param unit string of unit B/kB/MB/GB/TB/PB or number of order 0=B, 1=kB, 2=MB,...
     */
    function toBytes(size: number, unit: string | number, isDecimal?: boolean): number;
    function toUnit(byteSize: number, unit: string | number, isDecimal?: boolean): string;
    const byteUnits: string[];
    function getFileType(filename: string): string;
    /**
     * Function returns className for filetype according to filename.
     * @param filename string containing extension, either full name
     * 'file.pdf', extension with dot '.pdf' or simply extension 'pdf'
     *
     * @returns {srting} Příklad: "fa fa-file-pdf-o".
     */
    function getFileTypeIcon(filename: string): string;
    /**
     * Function returns className for filetype according to filename.
     * @param filename string containing extension, either full name
     * 'file.pdf', extension with dot '.pdf' or simply extension 'pdf'
     *
     * @author  tfeik
     * @date    15.05.2018
     *
     * @returns {srting} Příklad: "fa-file-pdf-o".
     */
    function getFileTypeIconClass(filename: string): string;
    function createBlob(atobFile: string, mimeType: string): Blob;
    /**
     * Funkce vytvoří z pole bytu soubor
     *
     * @param {string} atobFile obsah souboru
     * @param {string} fileName nazev souboru
     * @return {File} Soubor
     */
    function createFile(atobFile: string, fileName: string): File;
    function downloadBlob(blob: Blob | JQueryPromise<Blob>, fileName: string): void;
    /**
     * Prenos souboru na server
     * @param {string} guid identifikátor souboru
     */
    function transferFile(guid: string): JQuery.Promise<void>;
    /**
    * Smazani souboru
    * @param {string} guid identifikátor souboru
    */
    function cleanUp(guid: string): JQuery.Promise<void>;
}
declare namespace Gordic.Utils.Menu {
    function getLogger(): Gordic.Diagnostics.GLog;
    /**
      * Provede kompletaci parametru + vyresi before/after/parent, vse se provadi primo ve vstupnich datech!
      *
      * @param {MenuParams[]} params
      * @returns {MenuParams[]}
      */
    function resolveParams(params: MenuParams[]): void;
    /**
     * Spusti funkci nad vsemi MenuParams (rekurzivne)
     *
     * @param {MenuParams[]} params
     * @param {(param: MenuParams} apply (default = > void)
     */
    function applyAllParams<T>(params: MenuParams[], apply: (param: MenuParams, parent: MenuParams | null, v?: T) => T): void;
    function createParamId(m: MenuParams): string | null;
    /** Zajisti, ze kazdy menuparam bude mit sve ID */
    function makeIds(params: MenuParams[]): IGFlatMenuParams[];
    /** Aplikuje profil na menuParams */
    function applyProfile(profile: IGMenuProfile, params: MenuParams[], options?: IGApplyProfileOptions): MenuParams[];
    /** Vytvori profil z rootovych polozek */
    function createProfile(menuParams: MenuParams[], profileName?: string, prepare?: boolean): IGMenuProfile;
    /**
     * Najde vsechny parenty od polozky (param) az k rootu
     *
     * @paramToFind {MenuParams} paramToFind polozka, jejiz parenty hledam
     * @param {MenuParams[]} allParams vsechny menuParams, ve kterych mam hledat
     * @returns {MenuParams[]} vsichni parenti, od nejblizsiho po nejvzdalenejsiho
     */
    function getParamParents(paramToFind: MenuParams, allParams: MenuParams[]): MenuParams[];
    /** Aplikuje profil na menuparams a u vystupu nahradi akci za dummy akci (neni spustitelna) */
    function applyProfileTest(profile: IGMenuProfile, params: MenuParams[]): MenuParams[];
    /** Hledani MenuParam (rekurzivne - depth-first). */
    function findMenuParam(id: string, menuParams: ReadonlyArray<MenuParams>): MenuParams | null;
    function findMenuParam(func: (mp: MenuParams) => boolean, menuParams: ReadonlyArray<MenuParams>): MenuParams | null;
    /** Hledani ProfileParam (rekurzivne - depth-first). */
    function findProfileParam(id: string, profileParams: ReadonlyArray<IGMenuProfileParams>): IGMenuProfileParams | null;
    function findProfileParam(func: (mp: IGMenuProfileParams) => boolean, profileParams: ReadonlyArray<IGMenuProfileParams>): IGMenuProfileParams | null;
    /** Projde celou strukturu (depth-first), vrati pouze ty polozky, ktere odpovidaji podmince. */
    function filterMenuParams(func: (mp: MenuParams) => boolean, menuParams: ReadonlyArray<MenuParams>): MenuParams[];
    interface IGFlatMenuParams extends MenuParams {
        id: string;
        parentId: string | null;
    }
    interface IGApplyAllParamsContext {
        path: string;
    }
    interface IGCreateHeaderOptions {
        /** Parametry aktualni urovne */
        params: MenuParams[];
        /** Parent */
        parent: MenuParams | null;
        /** Uroven zanoreni menu */
        level: number;
    }
    interface IGCreateFooterOptions extends IGCreateHeaderOptions {
    }
    interface IGMenuProfile {
        name: string;
        version?: number;
        params: IGMenuProfileParams[];
    }
    /**
     * Modifikace profilu (rozdily oproti originalu v MenuParams).
     *
     * @author bmartinek
     * @since 484.1.0.624
     */
    interface IGMenuProfileModifications {
        favorite?: boolean;
        align?: MenuParamAlignType | null;
        icon?: string;
        caption?: string;
        primary?: boolean;
        captionVisible?: CaptionVisibility;
        tooltip?: string;
        visiblePriority?: number | null;
        children?: IGMenuProfileParams[];
        actionContext?: object;
        type?: MenuParamType;
    }
    /**
     * Parametr profilu menu (serializovatelny).
     *
     * @author bmartinek
     * @since 484.1.0.620
     */
    interface IGMenuProfileParams extends IGMenuProfileModifications {
        id?: string;
        visiblePriority?: number;
        align?: MenuParamAlignType;
    }
    interface IGMenuItemStructure<T> {
        id: string;
        children?: IGMenuItemStructure<T>[];
    }
    /** (internal) Pomocny interface */
    interface IGMenuProfileParamsInternal extends IGMenuProfileParams {
        _uid: string;
    }
    interface IGMenuParamsInternal extends Omit<MenuParams, "id"> {
        id: string;
        _uid: string;
        _profileParam: Readonly<IGMenuProfileParams>;
    }
    interface IGApplyProfileOptions {
        prepareData?: boolean;
        afterAplied?: (mp: MenuParams, pp?: IGMenuProfileParams, original?: Readonly<MenuParams>) => MenuParams;
    }
}
declare namespace GMenu {
    type MenuRootAlignTypes = "normal" | "opposite";
    enum menuRootAlignTypes {
        normal = "normal",
        opposite = "opposite"
    }
    enum panelPositionTypes {
        left = "left",
        right = "right",
        top = "top",
        bottom = "bottom"
    }
    const menuEmptyIcon = "gin/nic";
    const visiblePriorityAttrName = "data-visible-prioriry";
    const buildParamPropertyName = "gmenuParam";
    const idAttrName = "data-param-id";
    const menuItemDisabledClassName = "gmenu-item-disabled";
    /** Nazev udalosti, kterou vyhazuji ovl. prvky, pokud doslo k nejake jejich zmene */
    const eventControlUpdated = "onmenuparamcontrolupdated";
    function hasItemChildren(param: MenuParams): boolean;
    /** Interni menuParams pro potreby completeParams */
    interface IGInternalMenuParams extends MenuParams {
        _icon?: string;
        _caption?: string;
        _captionVisible?: CaptionVisibility;
        _customClass?: string;
        _tooltip?: string;
        /** Optimalizace - bylo vyreseno before/after/parent, preskoc prochazeni */
        _beforeAfterParentResolved?: true;
    }
    interface MenuParamsWidgetInternal extends MenuParamsWidget {
        widget$?: JQuery;
        menuLocation$?: JQuery;
        currMenuLocation$?: JQuery;
        isInSearch?: boolean;
    }
    /**
     * Kompletace menuparametru + validace
     *
     * @param {MenuParams} params
     * @param {GAction[]|GActionList} actions
     * @param {boolean} isLevel0 (default = false)
     * @returns {MenuParams}
     */
    function completeParams(params: MenuParams, actions: GAction[] | GActionList, isLevel0?: boolean): MenuParams;
    /**
     * Kompletace polemenu params + validace
     *
     * @param {MenuParams[]} params
     * @param {GAction[]} actions
     * @param {boolean} isLevel0 (default = false)
     */
    function completeParamsArray(params: MenuParams[], actions: GAction[] | GActionList, isRoot?: boolean): void;
    /**
     * Zaradi rootove params - zaskatulkuje podle parametru 'align' a vrati jako objekt: {normal:[], opposite: []}
     *
     * @author bmartinek
     * @since 480.1.0.628
     */
    function classifyRootParams(params: MenuParams[], actions?: GAction[] | GActionList): {
        normal: MenuParams[];
        opposite: MenuParams[];
    };
    /**
     * Overi, zda je hodnota visibility v enumu GAction.captionVisiblity. Pokud ne, vyhodi varovani do konzole a vrati defaultni hodnotu (GAction.captionVisibility.normal)
     *
     * @param {string | CaptionVisibility} visibility
     * @returns {CaptionVisibility}
     */
    function correctCaptionVisible(visibility: string | CaptionVisibility): CaptionVisibility;
    /**
     * Ze stromu parametru vytvori linearizovany seznam
     *
     * @param {MenuParams[]} params
     * @returns {MenuParams[]}
     * @param filter Funkce k pripadnemu profiltrovani
     */
    function linearizeParams(params: MenuParams[], filter?: (p: MenuParams) => boolean): MenuParams[];
    function widgetParamPrepare(params: MenuParamsWidgetInternal): JQuery;
    function widgetParamUpdate(param: MenuParamsWidgetInternal): void;
    function widgetParamCreateSubstitute(params: MenuParamsWidgetInternal): JQuery;
    function getItemChildren(rootWithChildren: MenuParams): MenuParams[] | null;
    function experimentalCreateFormMenu(params: MenuParams[], settings?: {
        createActionUrl: (mp: MenuParams) => string | JQueryPromise<string>;
    }): JQuery;
}
declare namespace Gordic.Utils.Menu {
    class GMenuProfileBuilder implements IGMenuProfileBuilder {
        static version: number;
        protected profile: IGMenuProfile;
        protected nodes: GMenuProfileNode[];
        private _lastId;
        get length(): number;
        getAt(n: number): GMenuProfileNode;
        constructor(profile: Readonly<IGMenuProfile>);
        /** Unikatni id v ramci teto instance builderu */
        protected newUid(): string;
        /** Vlozi do rootu profilu na konec */
        add(p: IGMenuProfileParams): GMenuProfileNode;
        update(uid: string, mods: IGMenuProfileModifications): GMenuProfileNode;
        remove(uid: string): boolean;
        clear(): void;
        find(uid: string, scope?: GMenuProfileNode[]): GMenuProfileNode | null;
        find(func: GMenuProfileBuilderFilterFunc, scope?: GMenuProfileNode[]): GMenuProfileNode | null;
        findParent(uid: string): GMenuProfileNode | null;
        /** Vyleda vsechny parent nodes (od nejblizsiho) */
        findParents(uid: string): GMenuProfileNode[];
        /** Vyhleda pole, v jakem se dany node nachazi. */
        findScope(uid: string): GMenuProfileNode[] | null;
        /** Projde cely strom (metodou depth-first). */
        filter(func: GMenuProfileBuilderFilterFunc, scope?: GMenuProfileNode[], goDeep?: boolean): GMenuProfileNode[];
        protected findScoped(uid: string, scope?: GMenuProfileNode[], parents?: GMenuProfileNode[]): {
            node: GMenuProfileNode;
            scope: GMenuProfileNode[];
        } | null;
        /** Prochazi strom, zastavi se na prvnim vyskytu */
        protected findByFuncScoped(func: GMenuProfileBuilderFilterFunc, scope?: GMenuProfileNode[], parents?: GMenuProfileNode[]): {
            node: GMenuProfileNode;
            scope: GMenuProfileNode[];
        } | null;
        /**
         * Projde cely strom
         *
         * @param {GMenuProfileBuilderEachFunc} func Vrati-li false, prochazeni se prerusi.
         * @param {GMenuProfileNode[]} [scope] - default = root
         * @param {boolean} goDeep (default = true)
         */
        each(func: GMenuProfileBuilderEachFunc, scope?: GMenuProfileNode[], goDeep?: boolean): void;
        buildProfile(): IGMenuProfile;
        /**
         * Overi konzistenci stromove struktury - odstrani z toho vse, co tam potencionalne nepatri (napr. null/undefined/nonobject hodnoty).
         * Opravy se provadi na instanci!
         *
         * @param {IGMenuProfile} profile
         */
        static verifyStructure(profile: IGMenuProfile): void;
        private static filterObjectOnlyFunc;
        private static filterChildrenObjectOnly;
    }
    class GMenuProfileNode {
        /** Klice z typu IGProfileParams, ktere jsou podporovany pro ukladani v UserSettings. */
        static profileSupportedKeys: string[];
        readonly uid: string;
        readonly data: IGMenuProfileParams;
        private _children?;
        private _lastUid;
        constructor(data: IGMenuProfileParams, uid: string);
        get children(): GMenuProfileNode[] | undefined;
        get isVirtual(): boolean;
        /** Uid, unikatni v ramci teto instance */
        protected newUid(): string;
        update(mods: IGMenuProfileModifications): void;
        addChild(p: IGMenuProfileParams): GMenuProfileNode;
        removeAllChildren(): void;
        buildParams(): IGMenuProfileParams;
        protected getParams(includeNodes: boolean): IGMenuProfileParams;
        protected getChildren(includeNodes: boolean): IGMenuProfileParams[];
        static createProfileParam(mp: Readonly<MenuParams>): IGMenuProfileParams;
        static updateProfileParam(pp: IGMenuProfileParams, mods: Readonly<IGMenuProfileModifications>): void;
        private static prepareParamChildren;
    }
    /** Rozsireny profil pro moznst modifikaci (tento by se nesmi ukladat do uziv. nastaveni - obs. instance nodu!) */
    interface IGMenuProfileWM extends IGMenuProfile {
        params: IGMenuProfileParamsWN[];
    }
    /** ProfileParams + node (nepatri do uziv. nastaveni ani k serializaci!) */
    interface IGMenuProfileParamsWN extends IGMenuProfileParams {
        node: GMenuProfileNode;
    }
    type GMenuProfileBuilderFilterFunc = (node: GMenuProfileNode) => boolean;
    type GMenuProfileBuilderEachFunc = (node: GMenuProfileNode) => void | false;
    interface IGMenuParamsExtended extends MenuParams {
        _uid: string;
        node?: GMenuProfileNode;
    }
    interface IGMenuProfileBuilder {
        add(p: IGMenuProfileParams): GMenuProfileNode;
        clear(): void;
        find(uid: string): GMenuProfileNode | null;
        buildProfile(): IGMenuProfile;
    }
}
declare namespace Gordic.Utils.Menu {
    /**
     * Obecna trida pro budovani menu
     *
     * @author bmartinek
     * @since 480.1.0.635
     */
    class GMenuItemBuilder {
        static evOpenSubmenuName: string;
        static evHandlerExecActionName: string;
        static evHandlerRunActionName: string;
        static evPinName: string;
        static evUnpinName: string;
        private _iconBuilder;
        get iconBuilder(): Gordic.Utils.IconBuilder;
        set iconBuilder(b: Gordic.Utils.IconBuilder);
        /** Pridavat na vybrane polozky piny */
        pins: boolean;
        /** Trida pridavana na element otevirajici menu */
        submenuOpenerClassName: string;
        /** Trida pridana na pin */
        pinClassName: string;
        /** Trida, podle ktere lze na polozce najit tooltip (null = bez tooltipu) */
        tooltipClassName?: string | null;
        /** Trida, ktera se prida na element s caption */
        captionClassName?: string | null;
        createItem(params: MenuParams, level: number): JQuery;
        /**
         * Vytvori polozku s akci. Pokud ma akce i submenu, je nutne na click vyhodit udalost GMenuItemBuilder.evOpenSubmenuName, kde
         * musi byt parametry params a level.
         *
         * @param {MenuParamsAction} params
         * @param {number} level
         * @returns {JQuery}
         */
        protected createAction(params: MenuParamsAction, level: number): JQuery;
        protected createStatic(params: MenuParams, level: number): JQuery;
        protected createSeparator(params: MenuParams, level: number): JQuery;
        protected createCategory(params: MenuParams, level: number): JQuery;
        protected createWidget(params: MenuParams, level: number): JQuery;
        protected createHtml(params: MenuParams, level: number): JQuery;
        protected createCaption(caption?: string): JQuery;
        protected createBadge(options: GBadgeOptions | GObservableObject<GBadgeOptions>): JQuery;
        protected createIconPanel(icon?: string | string[], params?: MenuParams, level?: number): JQuery;
        protected createPin(params: MenuParams): JQuery;
        protected addChildrenOpener(params: MenuParams, item: JQuery, level: number): JQuery;
        protected addCommonClasses(params: MenuParams, item: JQuery, level: number): JQuery;
        createLeftPanel(params?: MenuParams, level?: number): JQuery;
        createCenterPanel(params?: MenuParams, level?: number): JQuery;
        createRightPanel(params?: MenuParams, level?: number): JQuery;
    }
    /**
     * Trida pro vybudovani GActionMenu
     *
     * @author bmartinek
     * @since 482.1.0.2
     */
    class GActionMenuItemBuilder extends GMenuItemBuilder {
        static evNavigateBack: string;
        protected createBackAction(level: number): JQuery;
        createHeader(options: IGCreateHeaderOptions): JQuery | null;
        createFooter(options: IGCreateFooterOptions): JQuery | null;
    }
    /**
     * Trida, ktera prefereuje property 'alt' na MenuParams
     *
     * @author bmartinek
     * @since 482.1.0.640
     */
    class GActionMenuAltItemBuilder extends GActionMenuItemBuilder {
        createItem(params: MenuParams, level: number): JQuery;
    }
}
declare namespace Gordic.Utils {
    export interface IconParamsBase {
        /** Vlastni trida vlozena na ikonu (hodi se predevsim u skladanych ikon) */
        customClass?: string;
        /** CSS styly (nepouzivat-jsou pro interni potrebu vybranych komponent) */
        css?: string;
    }
    export interface IconParams extends IconParamsBase {
        icon: string;
    }
    export interface IconStackParams extends IconParamsBase {
        icon: string[];
    }
    export interface IconMultiParams extends IconParamsBase {
        icon: string | string[];
    }
    interface IconMultiParamsInternal extends IconParamsBase {
        icon: string | string[] | (() => string);
    }
    export interface IconBuilderSettings {
        imageIconSize: number;
    }
    export type IconCreateType = string | string[] | IconMultiParams;
    type IconCreateTypeInternal = string | string[] | IconMultiParamsInternal | (() => string);
    export class IconBuilder {
        imageIconSize: number;
        static readonly imageEmptyIcon = "gin/nic";
        private static _default;
        private static _log;
        /** Obecna (vychozi) instance IconBuilderu */
        static get defaultInst(): IconBuilder;
        private static get log();
        constructor(options?: IconBuilderSettings);
        createIcon(pars: IconCreateType, customClass?: string): string;
        /**
         * Vytvoreni obrazku ikony modulu.
         *
         * @param {string} Nazev modulu. Napr.: 'GWAUSU05'
         * @returns {string}
         */
        createModuleIcon(module: string): string;
        protected createIconInternal(pars: IconCreateTypeInternal, customClass?: string, css?: string): string;
        protected createGiIcon(icon: string, customClass?: string, css?: string): string;
        protected createFaIcon(icon: string, customClass?: string, css?: string): string;
        protected createDivIcon(icon: string, customClass?: string, css?: string): string;
        protected createGStateIcon(state: string, customClass?: string, css?: string): string;
        protected createUnicodeIcon(icon: string, customClass?: string, css?: string): string;
        protected createGzIcon(icon: string, customClass?: string, css?: string): string;
        protected createImageIcon(icon: string, customClass?: string, css?: string): string;
        protected createStackedIcon(iconArr: string[], customClass?: string, css?: string): string;
        protected createStackedIconPart(icon: string, index: number): string;
        protected getStackedIconDefaultsGi(icon: string, index: number): string;
        protected getStackedIconDefaultsFa(icon: string, index: number): string;
        hasIcon(icon: IconCreateType): boolean;
        protected isGiIcon(p: string): boolean;
        protected isFaIcon(p: string): boolean;
        protected isGzIcon(p: string): boolean;
        protected isUnicode(p: string): boolean;
        protected isDiv(p: string): boolean;
        protected isGState(p: string): boolean;
        protected isHtml(p: string): boolean;
    }
    export class ButtonIconBuilder extends IconBuilder {
        constructor(options?: IconBuilderSettings);
        createImageIcon(icon: string, customClass?: string, css?: string): string;
    }
    export class TaskListIconBuilder extends IconBuilder {
        constructor();
        createFaIcon(icon: string, customClass?: string, css?: string): string;
    }
    export {};
}
declare namespace Gordic.Utils.File {
    function chunkUpload(file: File, cancellationToken?: GCancellationToken, lifetime?: number): JQuery.Promise<Gordic.General.ApplicationInterface.GFileInfoDto, IGChunkFileUploadError, IGChunkFileUploadProgress>;
    function chunkUpload(file: Blob, fileName: string, cancellationToken?: GCancellationToken, lifetime?: number): JQuery.Promise<Gordic.General.ApplicationInterface.GFileInfoDto, IGChunkFileUploadError, IGChunkFileUploadProgress>;
    interface IGChunkFileUploadOptions {
        /** Velikost casti souboru v KB (default = 100)*/
        chunkSizeKB?: number;
    }
    interface IGChunkFileUploadProgress {
        current: number;
        total: number;
    }
    interface IGChunkFileUploadError {
        exception?: IGExceptionInfo;
        errText: string;
    }
}
declare namespace Gordic.Utils {
    class JSEncryptSupport {
        private static readonly DefaultOptions;
        static CreateJSEncrypt(): JSEncrypt;
        static Encrypt(valueToEncrypt: string): JQuery.Promise<string>;
    }
}
declare namespace Gordic.Utils {
    /**
     * Pomocná třída pro práci s MSAL (pro přihlášení přes Azure AD).
     *
     * @author  TFeik
     * @date    06.04.2021
     * @since   486.1.0.126
     */
    export class MSALSupport {
        /**
         * Zaregistruje JavaScript pro práci s MSAL.
         *
         * @author  TFeik
         * @date    06.04.2021
         *
         * @returns {JQuery.Promise<void>}
         */
        static registerScript(): JQuery.Promise<void>;
        /**
         * Vytvoří url pro dotaz na přihlášení.
         *
         * @author  TFeik
         * @date    06.04.2021
         *
         * @param {createAuthorityUrlInput} input
         * @returns {string}
         */
        static createAuthorityUrl(input: createAuthorityUrlInput): string | undefined;
        static createMsalClient(input: createMsalClientInput): JQuery.Promise<MsalClient>;
        /**
         * Vytvoří config pro dotaz na přihlášení.
         *
         * @author  TFeik
         * @date    06.04.2021
         *
         * @param {string} clientId
         * @param {string} tenant
         * @returns {MsalConfig}
         */
        private static createConfig;
        /**
         * Vytvoří request pro dotaz na přihlášení.
         *
         * @author  TFeik
         * @date    06.04.2021
         *
         * @returns {MsalRequest}
         */
        private static createLoginRequest;
        private static readAccountInternal;
        static readAccount(input: createMsalClientInput): JQuery.Promise<readAccountOutput | undefined>;
        static login(input: loginInput): JQuery.Promise<loginOutput | undefined>;
    }
    type MsalRequestScope = 'openid' | 'profile' | 'User.Read';
    /**
     * Supported prompt values
     *
     * login - Forces the user to enter their credentials on that request, negating single-sign on.
     * none - Ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns a login_required or interaction_required error.
     * consent - Triggers the OAuth consent dialog after the user signs in, asking the user to grant permissions to the app.
     * select_account - Interrupts single sign-on by providing an account selection experience listing all the accounts in session or an option to choose a different account altogether.
     * create - Triggers a sign-up dialog allowing external users to create an account. For more information, see: Self-service sign-up
     *
     * https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-js-prompt-behavior#supported-prompt-values
     *
     * @author  TFeik
     * @since   488.1.0.599
     * @date    02.020.2022
     */
    type MsalRequestPrompt = 'login' | 'none' | 'consent' | 'select_account' | 'create';
    interface MsalRequest {
        scopes: MsalRequestScope[];
        loginHint?: string;
        domainHint?: string;
        prompt?: MsalRequestPrompt;
    }
    export interface loginInput extends createMsalClientInput {
        selectAccount?: boolean | null;
    }
    export interface loginOutput extends readAccountOutput {
    }
    export interface createMsalClientInput extends createConfigInput {
    }
    export interface createConfigInput extends createAuthorityUrlInput {
        clientId: string;
    }
    export interface createAuthorityUrlInput {
        tenantId: string | undefined;
    }
    export interface readAccountOutput {
        userName?: string;
    }
    export class MsalClient {
        handleRedirectCallback: (callback: ((err: any, response: any) => void)) => void;
        loginRedirect: (request: MsalRequest) => any;
        /**
         * Use when initiating the login process via opening a popup window in the user's browser
         *
         * @param {@link (AuthenticationParameters:type)}
         *
         * @returns {Promise.<AuthResponse>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
         */
        loginPopup: (request: MsalRequest) => JQuery.Promise<any>;
        /**
         * Returns the signed in account
         * (the account object is created at the time of successful login)
         * or null when no state is found
         * @returns {@link Account} - the account object stored in MSAL
         */
        getAccount: () => MsalAccount | undefined;
        /**
         * Public API to verify if the URL contains the hash with known properties
         * @param hash
         */
        urlContainsHash: (hash: string) => boolean;
        /**
         * Return boolean flag to developer to help inform if login is in progress
         * @returns {boolean} true/false
         */
        getLoginInProgress: () => boolean;
        /**
         * Use to get the redirect uri configured in MSAL or null.
         * Evaluates redirectUri if its a function, otherwise simply returns its value.
         *
         * @returns {string} redirect URL
         */
        getRedirectUri: (reqRedirectUri?: string) => string;
        /**
         * Use to get the post logout redirect uri configured in MSAL or null.
         * Evaluates postLogoutredirectUri if its a function, otherwise simply returns its value.
         *
         * @returns {string} post logout redirect URL
         */
        getPostLogoutRedirectUri: () => string;
        /**
         * Use to get the current {@link Configuration} object in MSAL
         *
         * @returns {@link Configuration}
         */
        getCurrentConfiguration: () => any;
    }
    export interface MsalAccount {
        userName?: string;
    }
    export {};
}
declare namespace Gordic.Validators {
    class GDateTimeParser {
        private static readonly _MODIFIERS_DELIMITER;
        static parseDate(s: string, tzOffset?: number): number;
        private static readonly _RE_MODIFIER;
        static ModifyDateTime(d: Date, modifier: string): Date;
        private static readonly _RE_TIME_SPAN;
        static ParseTimeSpan(s: string): number;
        static isDate(s: string): boolean;
        static applyTimezone(timezoneOffset: number, timestamp: number): number;
        static withnoutTime(d: Date): Date;
    }
    class DateTime extends Base {
        private _minCached;
        private _maxCached;
        private _maxIsDate;
        readonly min: string;
        readonly max: string;
        readonly tz: number;
        get minimum(): number | null;
        get maximum(): number | null;
        constructor(obj: {
            min: string;
            max: string;
            tz: number;
        });
        validate(value: Date, source: JQuery): boolean;
    }
}
declare namespace Gordic.Validators {
    class Ico extends Base {
        private allowOmmitLeadingZeros;
        validate(value: string, source: JQuery): boolean;
        getMessage(value: string): string;
        validateIco(ico: string, refErrors?: string[]): boolean;
    }
}
declare namespace Gordic.Validators {
    /**
     * Validátor hesla. Ověří, že heslo je alesoň tak silné jako minStrength.
     */
    class Password extends Base {
        static readonly DENIED_CHARS = "[]{}(),;?*!@ \t|#";
        protected readonly minStrength: number;
        protected readonly usedChars: number;
        protected readonly minLength: number;
        validate(value: string, source: JQuery): boolean;
        getMessage(value: string): string;
        /**
         * Algoritmus výpočtu síly hesla.
         * @param password Heslo k ověření.
         * @param errs Pokud je předáno pole, je do něj přidán error message za
         * každý nalezený problém.
         */
        private isValid;
        static computePasswordStrength(password: string, refUsedChars?: number[], refErrors?: string[]): number;
    }
}
declare namespace Gordic.Validators {
    class RodneCislo extends Base {
        validate(value: string, source: JQuery): boolean;
        getMessage(value: string): string;
        /**
         * Formálně validuje rodné číslo. Předpokládá řetězec obsahující pouze
         * číslice a již zvalidovanou délku.
         * @param value
         */
        private _isValidRodneCislo;
    }
}
declare namespace Gordic.Validators {
    class Dic extends Base {
        private countries?;
        validate(value: string, source: JQuery): boolean;
        getMessage(value: string): string;
        private _isValidDic;
    }
}
declare namespace Gordic.Validators {
    class Gps extends Base {
        validate(value: string, source: JQuery): boolean;
        getMessage(value: string): string;
        /**
         * Formálně validuje rodné číslo. Předpokládá řetězec obsahující pouze
         * číslice a již zvalidovanou délku.
         * @param value
         */
        private _isValidGps;
    }
}
declare namespace Gordic.Prefabs.GStringBox {
    /**
     * Vstupní parametry prefabu Gordic.Prefabs.GStringBox.crypted.
     *
     * @author  TFeik
     * @date    16.12.2019
     * @since   482.1.0.823
     */
    interface cryptedOptions {
        /**
         * (Default: [false]) Příznak, zda je hodnota v políčku prostý text [true] a nebo je skrytá (místo textu zobrazuje hvězdičky) [false].
         * @type {boolean}
         */
        isValueVisibleInField?: boolean;
        /**
         * Slouží pouze pro upozornění na to, že je před voláním model collect nutné nad políčky se šifrováním zavolat
         * funkci Gordic.Prefabs.GStringBox.updateChiperPublicKeys, která zajistí aktalizování šifrovacího klíče.
         *
         * Šifrovací klíč je nutné číst těsně před šifrováním jinak by mohla být 3iforvaná hdnota zpracována špatně po obnově
         * (ginis) session kvůli tomu, že si vygeneroval nový šifrovací klíč a v JavaScriptu (v políčku) byl pořád starý klíč.
         * @type {true}
         */
        obslouzilJsemSbiraniHodnotZPolicekTakAbyNemohlNastatProblemSNeaktualnimSifrovacimKlicem: true;
    }
    /**
     * Na formuláři dle classy najde všechny šifrovací políčka (nesmíte přepsat customClass z prefabu) a aktulizuje šifrovací klíče.
     * Až po vykonání této funkce je možné číst data políček pomocí model collect.
     *
     * @author  TFeik
     * @date    01.04.2020
     *
     * @param {JQuery<HTMLElement>} element Element formu, na kterém je umístěno šifrovací políčko.
     * @returns {JQuery.Promise<void>}
     */
    function updateChiperPublicKeys(element: JQuery<HTMLElement>): JQuery.Promise<void>;
    enum cryptedCustomClass {
        cryptedJs = "crypted-js"
    }
    /**
     * Prefab šifrovaného políčka pro citlivé údaje.
     *
     * Hodnota políčka je při čtení pomocí gfield("model", "collect") zašifrováno a je jej nutné při čtení
     * na serveru (C#) opět rozšifrovat pomocí metody "GWebSequenceUserProcess.Rsa.Decrypt(hodnotaZPolicka);"
     *
     * @author  TFeik
     * @date    19.07.2019
     *
     * @param {cryptedOptions} options
     * @returns {GStringBoxOptions}
     */
    function crypted(options?: cryptedOptions): GStringBoxOptions;
    /**
     * Prefab políčka pro zadání hesla.
     *
     * Heslo je při čtení hodnoty skrze gfield("model", "collect") zašifrováno a je jej nutné při čtení
     * na serveru (C#) opět rozšifrovat pomocí metody "GWebSequenceUserProcess.Rsa.Decrypt(hodnotaZPolicka);"
     *
     * @author  TFeik
     * @date    19.07.2019
     * @since   482.1.0.823
     */
    function password(options: Omit<cryptedOptions, "isValueVisibleInField">): GStringBoxOptions;
    /**
     * [OBSOLITE] Použijte verzi se šifrováním.
     * Prefab políčka pro zadání hesla - bez šifrování.
     *
     * @author  TFeik
     * @date    19.07.2019
     *
     * @returns {GStringBoxOptions}
     */
    function passwordWithoutEncryption(): GStringBoxOptions;
    const gps: () => GStringBoxOptions;
    /**
     * Vstupní parametry prefabu Gordic.Prefabs.GStringBox.passwordReEnterOptions.
     *
     * @author  TFeik
     * @date    18.12.2019
     * @since   482.1.0.832
     */
    interface passwordReEnterOptions extends Omit<cryptedOptions, "isValueVisibleInField"> {
        passwordFieldName: string;
    }
    /**
     * Prefab políčka pro zadání ověření hesla - bez šifrování.
     *
     * Heslo je při čtení hodnoty skrze gfield("model", "collect") zašifrováno a je jej nutné při čtení
     * na serveru (C#) opět rozšifrovat pomocí metody "GWebSequenceUserProcess.Rsa.Decrypt(hodnotaZPolicka);"
     *
     * @author  TFeik
     * @date    18.12.2019
     *
     * @param {passwordReEnterOptions} options
     * @returns {GStringBoxOptions}
     */
    const passwordReEnter: (options: passwordReEnterOptions) => GStringBoxOptions;
    /**
     * [OBSOLITE] Použijte verzi se šifrováním.
     * Prefab políčka pro zadání ověření hesla - bez šifrování.
     *
     * @author  TFeik
     * @date    18.12.2019
     *
     * @param {passwordReEnterOptions} options
     * @returns {GStringBoxOptions}
     */
    const passwordReEnterWithoutEncryption: (passwordFieldName: string) => GStringBoxOptions;
}
/**
 * Gordic.Gin.Globals.Icons
 *
 * @author TFeik
 * @since 480.1.0.115
 * @date 27.08.2018
 */
declare namespace Gordic.Prefabs.Icons {
    /**
     * Základní parametry ikon.
     *
     * @author TFeik
     * @since 480.1.0.115
     * @date 27.08.2018
     */
    interface BaseIconParams {
    }
    /**
     * Vytvoření základního iconTemplate.
     *
     * @author TFeik
     * @date 27.08.2018
     *
     * @param {IconsBaseParams} [baseParams]
     * @returns {IconTemplate}
     */
    function preRun(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Poslední možnost centrálního upravení iconTemplate.
     *
     * @author TFeik
     * @date 27.08.2018
     *
     * @param {IconTemplate} iconTemplate
     * @param {IconsBaseParams} [baseParams]
     * @returns {IconTemplate}
     */
    function preReturn(iconTemplate: IconTemplate, baseParams?: BaseIconParams): IconTemplate;
    /**
     * Skracovací funkce pro hromadné operace nad generovanýmy ikonami
     *
     * @param {IconTemplate} iconTemplate
     * @param {BaseIconParams} [baseParams]
     * @param {any}
     * @returns {IconTemplate}
     */
    function buildIconTemplate(iconTemplate: IconTemplate, baseParams?: BaseIconParams): IconTemplate;
    /**
     * Z IconTemplate vytvoří objekt, který je možné použít při vytváření akce přes extend, díky čemuž není nutné 3x volat funkci Ikon.
     *
     * @param {IconTemplate} iconTemplate IconTemplate, nejlépe funkce z Gordic.Gin.Globals.Icons.
     * @returns {GActionParamsDefObjBase} Objekt určený pro extend do akce.
     */
    function IconToActionParams(iconTemplate: IconTemplate): GActionParamsDefObjBase;
    /**
     * Z IconTemplate vytvoří objekt, který je možné použít při vytváření menu přes extend, díky čemuž není nutné 3x volat funkci Ikon.
     *
     * @param {IconTemplate} iconTemplate IconTemplate, nejlépe funkce z Gordic.Gin.Globals.Icons.
     * @returns {MenuParams} Objekt určený pro extend do menu.
     */
    function IconToMenuParams(iconTemplate: IconTemplate): MenuParams;
    /**
     * Ikona pro zavření.
     *
     * @author TFeik
     * @date 07.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Zavrit(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro uložení textu do clipboardu.
     *
     * @author TFeik
     * @date 10.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function UlozitDoClipboardu(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro načtení textu z clipboardu.
     *
     * @author  TFeik
     * @date    12.05.2020
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function NacistZClipboardu(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro uložení.
     *
     * @author TFeik
     * @date 07.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Ulozit(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Odeslat.
     *
     * @author  TFeik
     * @date    06.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Odeslat(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Odeslat s opakováním.
     *
     * @author  TFeik
     * @date    16.02.2021
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function OdeslatSOpakovanim(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Uložit s opakováním.
     *
     * @author  TFeik
     * @date    05.03.2024
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function UlozitSOpakovanim(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Detail.
     *
     * @author  TFeik
     * @date    06.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Detail(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Zástup.
     *
     * @author  TFeik
     * @date    06.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Zastup(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Zástupy.
     *
     * @author  TFeik
     * @date    06.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Zastupy(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Zástup.
     *
     * @author  TFeik
     * @date    06.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ZastupDetail(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Licence komponent třetích stran.
     *
     * @author  TFeik
     * @date    06.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function LicenceKomponentTretichStran(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Změna hesla.
     *
     * @author  TFeik
     * @date    06.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function HesloZmena(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Nový.
     *
     * @author  TFeik
     * @date    27.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Novy(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Vrátit.
     *
     * @author  TFeik
     * @date    28.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Vratit(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Ztratit.
     *
     * @author  TFeik
     * @date    28.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Ztratit(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Extení subjekt.
     *
     * @author  TFeik
     * @date    28.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ExterniSubjekt(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Detail exteního subjektu.
     *
     * @author  TFeik
     * @date    28.11.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ExterniSubjektDetail(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Přidat do poznámkového bloku.
     *
     * @author  TFeik
     * @date    10.02.2020
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function PridatDoPoznamkovehoBloku(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Sdílet.
     *
     * @author  TFeik
     * @date    07.04.2020
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Sdilet(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Odeslat emailem.
     *
     * @author  TFeik
     * @date    07.04.2020
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function OdeslatEmailem(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Hledání.
     *
     * @author  TFeik
     * @date    14.05.2020
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Hledani(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Iterní subjekt.
     *
     * @author  TFeik
     * @date    15.12.2020
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function InterniSubjekt(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Iterní zpráva.
     *
     * @author  TFeik
     * @date    02.02.2021
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function InterniZprava(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona pro Uživatelské nastavení.
     *
     * @author  TFeik
     * @date    16.12.2020
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function UzivatelskeNastaveni(baseParams?: BaseIconParams): IconTemplate;
    /**
     * Ikona Hybridní pošta.
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function HybridniPosta(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Hromadná konverzní pošta (Dopis online).
     *
     * @author  TFeik
     * @date    12.04.2021
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function HromadnaKonverzniPosta(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Informace z hybridní pošty.
     *
     * @author  TFeik
     * @date    15.04.2021
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function InformaceZHybridniPosty(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Informace z hromadné konverzí pošty (Dopis Online).
     *
     * @author  TFeik
     * @date    15.04.2021
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function InformaceZHromadneKonverzniPosty(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro Revize instalovaných modulů.
     *
     * @author  TFeik
     * @date    18.07.2023
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Revize(baseParams?: BaseIconParams): IconTemplate;
}
declare namespace Gordic.Prefabs.Actions {
    /**
     * Připravená akce na případné hromadné úpravy.
     *
     * @author  TFeik
     * @date    19.11.2018
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     *
     * @param {BasePreActionsInput} [baseParams]
     * @returns {GActionParams}
     */
    function preRun(baseParams?: BasePreActionsInput): GActionParams;
    /**
     * Zkracovací funkce co navěsí uživatelské funkce co se má stát po dokonání akce na promise.
     *
     * @author  TFeik
     * @date    19.11.2018
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     *
     * @param {JQuery.Promise<any>} promise
     * @param {BasePreActionsInput} [input]
     */
    function endRun(promise: JQuery.Promise<any>, action: GAction, input?: BasePreActionsInput): void;
    /**
     * Připravená funkce pro hromadné úpravy akcí.
     *
     * @author  TFeik
     * @date    19.11.2018
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     *
     * @param {GActionParams} actionParams
     * @param {BasePreActionsInput} [input]
     * @returns {GActionParams}
     */
    function preReturn(actionParams: GActionParams, input?: BasePreActionsInput): GActionParams;
    /**
     * Funkce pro poslání potřebných dat do run funkce.
     *
     * @author TFeik
     * @date 19.11.2018
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     *
     * @param {((param?: any)} [inputData] (default = > TInputData) | ((param?: any) => JQuery.Promise<TInputData>) | TInputData)
     * @param {any} [customOpt]
     * @returns {JQuery.Promise<TInputData>}
     */
    function getData<TInputData>(action: GAction, event?: JQueryEventObject, ctx?: any & {
        flashMessageId: string;
    }, inputData?: ((action: GAction, event?: JQueryEventObject, ctx?: any & {
        flashMessageId: string;
    }, param?: any) => TInputData) | ((action: GAction, event?: JQueryEventObject, ctx?: any & {
        flashMessageId: string;
    }, param?: any) => JQuery.Promise<TInputData>) | TInputData, customOpt?: any): JQuery.Promise<TInputData>;
    /**
     * Parametry (pre)akce, které jsou k dispozici pro run vnitřní funkce.
     *
     * @author  TFeik
     * @date    05.11.2019
     * @since   482.1.0.734
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     */
    interface ActionRunContext<T> {
        /**
         * Vstupní data potřebná pro vykonání akce.
         * @type {T}
         */
        inputData: T;
        /**
         * Id pro zobrazení flash message (vychází z názvu akce).
         * @type {string}
         */
        flashMessageId: string;
        /**
         * Content se kterým může akce pracovat. Pokud inputData obsahují property parentContent (vychází z typu Gordic.Gui.Dialogs.OpenDialogParams<T>)
         * pak se použije tento content. V opačném případě je contetn dohledán dle akce, nebo eventu.
         *
         * @type {GContent}
         */
        content: GContent;
        /**
         * Zkratka pro volání GContent.showFlash (content a id má nastavené dle akce).
         * Zobrazi Flash informaci (rychla informace, ktera typicky po case zmizi).
         *
         * @param {string} label Zobrazovana informace.
         * @param {GState?} state CSS trida stavu [g-state-info(default), g-state-success, g-state-warning, g-state-error, g-state-important].
         */
        showFlash: (label: string, state?: GState) => void;
    }
    /**
     * ActionPrefabDef<T>
     *
     * @author  TFeik
     * @date    05.11.2019
     * @since   482.1.0.736
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     */
    type ActionPrefabDef<T> = ({
        run: (this: GAction, ev: JQueryEventObject, ctx: ActionRunContext<T>) => JQueryPromise<any> | void;
    } & RequiredProperties<GActionParamsDefObjBase, "name">);
    /**
     * Poskládá objekt vstupních parametrů pro GAction z paremetrů preAkce.
     *
     * @author  TFeik
     * @date    19.11.2018
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<T>} [input]
     * @param {...(ActionPrefabDef<T> | GActionParamsDefObjBase)[]} params
     */
    function buildActionPrefab<T>(input?: BasePreActionsInput<T>, ...params: (ActionPrefabDef<T> | GActionParamsDefObjBase)[]): GActionParams;
    /**
     * Vstupní objekt parametrů preAkce.
     *
     * @author  TFeik
     * @date    19.11.2018
     * @since   480.1.0.202
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     */
    interface BasePreActionsInput<TInputData = any, TDone = any, TFail = any> {
        /**
         * Vstupní data, které požaduje preAkce pro spuštění.
         */
        inputData: ((action: GAction, event?: JQueryEventObject, ctx?: any, param?: any) => TInputData) | ((action: GAction, event?: JQueryEventObject, ctx?: any, param?: any) => JQuery.Promise<TInputData>) | TInputData;
        /**
         * Funkce spuštěná po úspěšné provedení preAkce.
         */
        done?: (this: GAction, retVal?: TDone) => any;
        /**
         * Funkce spuštěná po chybě během provedení preAkce.
         */
        fail?: (this: GAction, retVal?: TFail) => any;
        /**
         * Funkce spuštěná vždy po provedení preAkce.
         */
        always?: (this: GAction, retVal?: TDone | TFail) => any;
        /**
         * ActionParams umožňující změnit to jak akce vypadá (popis akce, ikona, custom class).
         *
         * !!! POUŽITÍ NA VLASTNÍ NEBEZPEČÍ !!!
         *
         * Před použitím této property je potřeba mít zásadní důvod k použití, protože účelem PreAction je nejen zmenšit množství psaného kódu,
         * ale i zařídit, aby stejné akce vypadaly stejně, nehledě na to, kde jsou zobrazeny.
         *
         * @type {GActionParamsDefObjBase}
         */
        actionParams?: GActionParamsDefObjBase;
    }
    /**
     * Názvy akcí, definovaných v PreAction. Název v enumu odpovídá volané funkci pro vytvoření akce.
     *
     * @author  TFeik
     * @date    19.11.2018
     * @since   480.1.0.202
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     */
    enum Names {
        ZavritContent = "actZavritContent",
        UlozitDoClipboardu = "actUlozitDoClipboardu",
        NacistZClipboardu = "actNacistZClipboardu",
        OtevriEmailovyKlient = "actOtevriEmailovyKlient",
        OtevritCeloaplikacniHledani = "actOtevritCeloaplikacniHledani"
    }
    /**
     * Zavře content, na kterém je akce (volá tryClose).
     *
     * @author  TFeik
     * @date    19.11.2018
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     *
     * @param {BasePreActionsInput<undefined | null, undefined>} [input]
     * @returns {GActionParams}
     */
    function ZavritContent(input?: BasePreActionsInput<undefined | null, undefined>): GActionParams;
}
declare namespace Gordic {
    /**
     * Klientsky kontent s moznosti vyuziti dedicnosti (experimentalni zalezitost)
     *
     * @author bmartinek
     * @since 482.1.0.301
     */
    class GClientContent {
        protected _cnt: GContent;
        constructor(cnt: GContent);
        /** Definice menubar */
        protected getMenuBar(): MenuParams[];
        /** Definice commandbar */
        protected getCommandBar(): MenuParams[];
        /** Definice statusbar */
        protected getStatusBar(): MenuParams[];
        /** Priprava obsahu */
        prepareClientContent(): void;
        get element(): JQuery<HTMLElement>;
        get actions(): GActionList;
    }
    interface IGClientContentInitializerOptions {
        init: (cnt: GContent) => GClientContent;
    }
    /**
     * Inicializace pro GClientContent
     *
     * @author bmartinek
     * @since 482.1.0.713
     */
    class GClientContentInitializer extends GContentBase implements IGClientContent {
        private _clientContent;
        private _options;
        prepareContent(options: IGClientContentInitializerOptions): void;
    }
}
declare namespace Gordic.Data.Filtering {
    /**
     * Operátor pro filtr - podmínka, která je mezi hodnotou slopce a filtračním textem v WHERE podmínce
     * (odpovida C# Gordic.General.ApplicationInterface.OperatorEnum)
     */
    enum OperatorEnum {
        /**Znaménko = */
        Equal = 0,
        /**Znaménko != */
        NotEqual = 1,
        /**LIKE, pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla...*/
        Like = 2,
        /**IN, očekává několik za sebou zřetězených values s OperatorEnum.In, ty poskládá v jeden IN*/
        In = 3,
        /**IN, očekává na vstupu GString s hodnotami v textové podobě oddělené čárkou*/
        InText = 4,
        /**větší*/
        Greater = 5,
        /**menší*/
        Less = 6,
        /**větší nebo rovno*/
        GreaterOrEqual = 7,
        /**menší nebo rovno*/
        LessOrEqual = 8,
        /**LIKE. Pokud není v řetězci znak "%", doplní ho na konec i na začátek řetězce.*/
        Contains = 10,
        /**IN, očekává několik za sebou zřetězených values s OperatorEnum.In, ty poskládá v jeden NOT IN*/
        NotIn = 11,
        /**NOT LIKE, pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla...*/
        NotLike = 12
    }
    function parseBaseFilter<T>(value: T): GBaseFilter<T>;
    function parseBaseFilter<T>(operator: OperatorEnum, value: T): GBaseFilter<T>;
    function parseBaseFilter<T>(operator: OperatorEnum[], value: T[]): GBaseFilter<T>;
    /**
     * Prevede stringovy operator na OperatorEnum
     * @param o povolene hodnoty: CONTAINS, =, >, >=, <, <=, LIKE, !=
     */
    function stringToOperatorEnum(o: string): OperatorEnum;
    /**
     * Prevede OperatorEnum na ekv. string
     * @param o OperatorEnum
     */
    function operatorEnumToString(o: OperatorEnum): GOperatorType;
    type GOperatorType = "CONTAINS" | "=" | ">" | ">=" | "<" | "<=" | "LIKE" | "!=" | "IN" | "NOT IN";
    abstract class GBaseFilterUtils {
        static notIn<T>(values: T[]): GBaseFilter<T>;
    }
}
/** Filtr (C# ekv. deserializovatelny na Gordic.General.ApplicationInterface.GBaseFilter) */
type GBaseFilter<T> = {
    /** Operator(y) */
    o?: Gordic.Data.Filtering.GOperatorType | Gordic.Data.Filtering.GOperatorType[];
    /** Hodnota (hodnoty) */
    v: T | T[];
};
declare namespace Api {
    class GReCaptcha {
        private static _ReCaptchaApi;
        private _captchaId;
        private _renderParams;
        element: HTMLElement;
        constructor(successCallback: ReCaptchaCallback, container?: JQuery | HTMLElement, renderParams?: ReCaptchaRenderParameters);
        execute(): void;
        private _renderCaptcha;
    }
    type ReCaptchaCallback = (reCaptchaToken: string) => any;
    interface ReCaptchaRenderParameters {
        /** (default: "light") The color theme of the widget. */
        theme?: "dark" | "light";
        /** (default: "image") The type of CAPTCHA to serve. */
        type?: "audio" | "image";
        /** The name of your callback function to be executed when the
         *  recaptcha response expires and the user needs to solve a new
         *  CAPTCHA. */
        "expired-callback"?: string;
        /** The tabindex of the widget and challenge. If other elements
          * in your page use tabindex, it should be set to make user
          * navigation easier. */
        tabindex?: number;
        /** (default: "normal") The size of the widget. */
        size?: "compact" | "normal" | "invisible";
    }
}
declare namespace Api {
    /**
     * Dokáže zjistit polohu uživatele na základě IP adresy, použito
     * při registraci uživatele, pokud zamítne poskytnutí polohy,
     * aby se měl našeptávač adresy alespoň přibližně na co chytit.
     */
    const getFreeGeoIpPosition: () => JQueryPromise<Position>;
}
declare namespace Api {
    /**
     * Position
     *
     * @author TFeik
     * @since 486.1.0.70
     */
    interface Position {
        coords: {
            accuracy: number;
            altitude?: number | null;
            altitudeAccuracy?: number | null;
            heading?: number | null;
            latitude: number;
            longitude: number;
            speed?: number | null;
        };
        timestamp?: number;
    }
    class GPlaces {
        static readonly IMG_POWERED_BY_IMAGE = "https://developers.google.com/places/documentation/images/powered-by-google-on-white.png";
        static readonly MAX_PREDICTIONS_LIMIT = 5;
        private static _GPlacesApi;
        private _lastResult?;
        private _pendingPredictions;
        private _request;
        constructor();
        private _prepareRequest;
        getPredictions(term: string): JQueryPromise<google.maps.places.AutocompletePrediction[]>;
        private _autocompleteCallback;
        getPlaceDetails(place: string | google.maps.places.AutocompletePrediction): JQueryPromise<GPlaceDetails>;
        prefab(): GSelectBoxOptions<google.maps.places.AutocompletePrediction>;
        static appendLogo(appendCallback: (logoUrl: string) => void): void;
    }
    class GPlaceDetails implements google.maps.places.PlaceResult {
        address_components: google.maps.GeocoderAddressComponent[];
        aspects: google.maps.places.PlaceAspectRating[];
        formatted_address: string;
        formatted_phone_number: string;
        geometry: google.maps.places.PlaceGeometry;
        html_attributions: string[];
        icon: string;
        international_phone_number: string;
        name: string;
        opening_hours: google.maps.places.OpeningHours;
        permanently_closed: boolean;
        photos: google.maps.places.PlacePhoto[];
        place_id: string;
        price_level: number;
        rating: number;
        reviews: google.maps.places.PlaceReview[];
        types: string[];
        url: string;
        vicinity: string;
        website: string;
        constructor(placeResult: google.maps.places.PlaceResult);
        getAddressComponentOfType(type: string): google.maps.GeocoderAddressComponent | undefined;
        mapAddressComponentsByType<T extends {
            [key: string]: "country" | "locality" | "postal_code" | "route";
        }>(componentTypeMap: T): T;
    }
}
/** Výčet platných kódů MouseEvent.button */
declare const enum EventMouseButtonCodes {
    LeftButton = 0,
    MiddleButton = 1,
    RightButton = 2
}
declare const enum EventKeyCodes {
    Backspace = 8,
    Tab = 9,
    Enter = 13,
    Shift = 16,
    Ctrl = 17,
    Alt = 18,
    Puse_break = 19,
    Caps_lock = 20,
    Escape = 27,
    Space = 32,
    Page_up = 33,
    Page_down = 34,
    End = 35,
    Home = 36,
    Left_arrow = 37,
    Up_arrow = 38,
    Right_arrow = 39,
    Down_arrow = 40,
    Insert = 45,
    Delete = 46,
    $0 = 48,
    $1 = 49,
    $2 = 50,
    $3 = 51,
    $4 = 52,
    $5 = 53,
    $6 = 54,
    $7 = 55,
    $8 = 56,
    $9 = 57,
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
    Left_window_key = 91,
    Right_window_key = 92,
    Select_key = 93,
    Numpad_0 = 96,
    Numpad_1 = 97,
    Numpad_2 = 98,
    Numpad_3 = 99,
    Numpad_4 = 100,
    Numpad_5 = 101,
    Numpad_6 = 102,
    Numpad_7 = 103,
    Numpad_8 = 104,
    Numpad_9 = 105,
    Multiply = 106,
    Add = 107,
    Substract = 109,
    Decimal = 110,
    Divide = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    Num_lock = 144,
    Scroll_lock = 145,
    Semi_colon = 186,
    Equal_sign = 187,
    Comma = 188,
    Dash = 189,
    Period = 190,
    Forward_slash = 191,
    Grave_accent = 192,
    Open_bracket = 219,
    Back_slash = 220,
    Close_bracket = 221,
    Single_quote = 222
}
/**
 * Obsahuje globální CSS ClassNames pro aplikaci
 */
declare const classNameState: {
    info: string;
    warning: string;
    success: string;
    error: string;
    important: string;
    active: string;
    inactive: string;
};
declare namespace Gordic.Widget {
    type WidgetOptions = JQueryUI.WidgetOptions & ObjectLiteral<any>;
    /**
     * Defnice popisující JQuery.UI.Widget
     */
    class JQueryUIWidget<TOptions extends WidgetOptions, TDefaultOptions> {
        /** Krátké jméno widget */
        widgetName: string;
        /** Jméno widget vč. namespace (oddělovač pomlčka) */
        widgetFullName: string;
        /** Prefix pro vyhazované Event */
        widgetEventPrefix: string;
        /** Pokud není předán element do constructoru,
        /** vytvoří se jQurey element z této property. */
        defaultElement: string;
        /** Předaný element */
        element: JQuery;
        /** Předané options */
        options: TOptions & TDefaultOptions;
        bindings: JQuery;
        hoverable: JQuery;
        focusable: JQuery;
        classesElementLookup: Object;
        /** Vrátí všechny změny, které widget provedl a poté ho zneplatní */
        destroy(): void;
        /** Nastaví options.disabled = false */
        enable(): this;
        /** Nastaví options.disabled = true */
        disable(): this;
        /** Pokud není přetížená, vrací this.element */
        widget(): JQuery;
        /** Nastaví this.options[key] = value (přes metodu this._setOption) */
        option<K extends Extract<keyof TOptions, string>>(key: K, value: TOptions[K]): this;
        /** Vrátí this.options[key] */
        option<K extends Extract<keyof TOptions, string>>(key: K): TOptions[K];
        /** Nastaví this.options = options (přes metodu this._setOptions) */
        option(options: TOptions): this;
        /** Vrátí this.options (jako kopii přes $.extend()) */
        option(): TOptions & TDefaultOptions;
        protected _getCreateOptions(): TDefaultOptions;
        protected _getCreateEventData(): Object;
        protected _super(): any;
        protected _superApply(args: any): any;
        protected _create(): void;
        protected _createWidget(options: TOptions, element?: JQuery): void;
        protected _classes(options: ObjectLiteral<any>): string;
        protected _delay(handler: Function, delay?: number): number;
        protected _hoverable(element: JQuery | HTMLElement): void;
        protected _focusable(element: JQuery | HTMLElement): void;
        protected _destroy(): void;
        protected _init(): void;
        protected _trigger(type: string, event?: Event | JQuery.Event, data?: Object): void;
        protected _setOptions(options: ObjectLiteral<any>): this | void;
        protected _setOption(key: string, value: any): this | void;
        protected _setOptionClasses(value: ObjectLiteral<string>): void;
        protected _setOptionDisabled(value?: boolean): void;
        protected _on(handlers: ObjectLiteral<JQueryEventListener>): void;
        protected _on(suppressDisabledCheck: boolean, handlers: ObjectLiteral<JQueryEventListener>): void;
        protected _on(element: JQuery | HTMLElement, handlers: ObjectLiteral<JQueryEventListener>): void;
        protected _on(suppressDisabledCheck: boolean, element: JQuery | HTMLElement, handlers: ObjectLiteral<JQueryEventListener>): void;
        protected _off(element: JQuery | HTMLElement, eventName: string): void;
    }
    /**
     * Fakticky se dědí jQuery.Widget, jen se musí předeklarovat, aby to fungovalo.
     */
    const JQueryWidget_base: new <O extends {}, D extends {}>() => JQueryUIWidget<O, D>;
    /**
     * Abstraktní základ JQuery Widgetu
     */
    abstract class JQueryWidget<TOptions extends {}, TDefaultOptions extends {} = TOptions> extends JQueryWidget_base<TOptions, TDefaultOptions> {
        /** Standardní namespace všech widgetů */
        static NAMESPACE: string;
        /**
         * Příznak zda byl widget ukončen, potřený pro rozběhjnuté Promise,
         * které mohou doběhnout po zničení widgetu a budou spouštět callbacky
         */
        protected _isDestroyed: boolean;
        protected widgetCssClass?: string;
        /**
         *  Nastavenim teto promenne jako staticke na defici widgetu lze zamezit slouceni
         *  options z base tridy. Ty lze pak najit v property 'baseOptions'.
         */
        protected dontMergeBaseOptions?: boolean;
        protected baseOptions?: TOptions;
        private _goptions?;
        private static _proxiedPrototypeCache;
        constructor(options: TOptions, element?: JQuery, baseOptions?: TOptions);
        protected _gordicWidgetInitializate(options: any, element: JQuery): void;
        /**
         * Lifecycle metoda volaná při vytváření instance widgetu.
         */
        protected _create(): void;
        /**
         * Lifecycle metoda volaná při ukončení instance widgetu
         */
        protected _destroy(): void;
    }
}
declare namespace Gordic.Widget {
    /**
     * DTO článku metodické nápovědy
     */
    interface GHelpArticle {
        id?: string;
        title: string;
        chapter?: string;
        content?: string;
        contentType?: GContextHelpContentType;
        confirmed?: JsonDate;
        constraints?: string[];
        priority?: number;
        author?: string;
        modified?: JsonDate;
        anchor?: string;
        keywords?: string[];
        load?: () => JQueryPromise<any>;
        confirm?: () => JQueryPromise<any>;
    }
    /**
     * Vstupní parametry pro práci s GHelpTOC/GHelpChapter
     */
    interface IGHelpChapter {
        /** Id kapitoly */
        id?: string;
        /** Název kapitoly */
        title?: string;
    }
    /**
     * Třída reprezentující kapitolu v TOC
     */
    class GHelpChapter implements IGHelpChapter {
        /** Id kapitoly */
        id?: string;
        /** Název kapitoly */
        title?: string;
        /** Články kapitoly */
        articles: GHelpArticle[];
        /** Podkapitoly */
        chapters: GHelpChapter[];
        /**
         * Vytvoření kapitoly s nebo bez id
         * @param id id kapitoly
         */
        constructor(id?: string);
        /**
         * Vytvoření kapitoly z parametrů IGHelpChapter
         * @param chapter IGHelpChapter s parametry
         */
        constructor(chapter: IGHelpChapter);
        /**
         * Získání či vytvoření kapitoly
         * @param id
         */
        chapter(id?: string): GHelpChapter;
        /**
         * Vložení či rozšíření kapitoly
         * @param chapter IGHelpChapter objekt
         */
        chapter(chapter: IGHelpChapter): GHelpChapter;
        /**
         * Vložení či přepsání kapitoly
         * @param chapter GHelpChapter objekt
         */
        chapter(chapter: GHelpChapter): GHelpChapter;
        /**
         * Vrátí všechny články metodické nápovědy
         * @param filter vstupní filter
         */
        getArticles(filter?: any): GHelpArticle[];
    }
    /**
     * Třída reprezentující TOC metodické nápovědy pomocí GHelpChapter
     */
    class GHelpTOC extends GHelpChapter {
        /**
         * Vytvoření TOC s id nebo bez
         * @param id id TOC
         */
        constructor(id?: string);
        /**
         * Vytvoření TOC z parametrů IGHelpChapter
         * @param chapter IGHelpChapter
         */
        constructor(chapter: IGHelpChapter);
    }
    /**
     * Rozšiřující DTO s podrobnostmi o volání
     */
    interface GContextHelpTrigger {
        element: Element | null;
        constraints: string[];
        toc: GHelpTOC;
    }
    /** Interface s options pro vytvoření GContextHelp widgetu */
    interface GContextHelpOptions {
        debounce?: number;
        contextChange?: Function;
    }
    enum GContextHelpContentType {
        md = "md",
        pdf = "pdf"
    }
    /** Widget pro metodickou nápovědu */
    class GContextHelp extends JQueryWidget<GContextHelpOptions> {
        static widgetName: string;
        private constraints;
        private prevElement;
        private finDebounced?;
        protected _getCreateOptions(): {
            debounce: number;
        };
        _create(): void;
        /**
         * Metoda pro získání vyfitrovaných článků pro vstupní element
         * @param element element na kterém mají být vyhodnoceny články
         */
        getContextHelp(element: Element | null): GContextHelpTrigger;
        /**
         * Metoda poslouchající na focusin na elementu s debounce, triggruje contextChange s vyfiltrovanými články
         * */
        _listenForFocus(): void;
        /**
         * Metoda pro generování constraints k zadanému elementu
         * @param element Vstupní element
         */
        generateConstraints(element: Element | null, toc?: Gordic.Widget.GHelpTOC): string[];
        destroy(): void;
    }
}
interface JQuery {
    gcontexthelp(options: Gordic.Widget.GContextHelpOptions): JQuery;
    gcontexthelp(method: "getContextHelp", element: Element | null): Gordic.Widget.GContextHelpTrigger;
    gcontexthelp(method: "generateConstraints", element: Element | null): string[];
    gcontexthelp(method: "destroy"): void;
    addHelpContext(helpContext: string): JQuery;
    removeHelpContext(helpContext?: string): JQuery;
}
declare namespace Gordic.Widget {
    interface IGDialogOptions extends JQueryUI.DialogOptions {
        dock?: IGDialogPositionOptions;
        preserveSize?: boolean;
        preservePosition?: boolean;
        related?: JQuery | HTMLElement;
        userSettings?: string | false | Gordic.Data.IGStorage | null;
    }
    class GCWDialog extends JQueryWidget<IGDialogOptions> {
        static widgetName: string;
        static dontMergeBaseOptions: boolean;
        private _maxRestoreInfo?;
        private _limitBorder;
        protected uiDialogTitlebarMaximize: JQuery;
        protected userSettings: Gordic.Data.IGStorage;
        protected forceShowListener: EventListener;
        protected uiDialog: JQuery;
        protected uiDialogTitlebar: JQuery;
        protected uiDialogTitlebarClose: JQuery;
        protected uiDialogButtonPane: JQuery;
        protected _isOpen?: boolean;
        protected _focusedElement: JQuery | null;
        protected _create(): void;
        protected _init(): void;
        protected _createTitlebar(): void;
        protected _destroy(): void;
        protected _getCreateOptions(): IGDialogOptions;
        protected _setOption(key: any, value: any): void;
        protected _setUserSettings(): void;
        protected _size(): void;
        protected _makeResizable(): void;
        protected _minHeight(): number;
        protected _moveToTop(): boolean;
        protected _focusTabbable(): void;
        protected _allowInteraction(ev: JQueryEventObject): boolean;
        protected _computePos(o: IGDialogPositionOptions): IGDialogPositionOptions;
        protected _setPos(o: IGDialogPositionOptions): void;
        protected _resolveWidth(): number | string;
        protected _resolveHeight(): number | string;
        /**
         * Lokalni polyfill, protoze Number.isSafeInteger neni v IE. Az budou zruseny hybridy, tak smazat a
         * nahradit puvodnim Number.isSafeInteger().
         */
        protected _isValueSafeInteger(n: any): boolean;
        protected _sideBar(): void;
        showStateButtons(btnClose?: boolean, btnMaximize?: boolean): JQuery;
        restoreUI(): JQuery;
        updateSize(retIsDone?: boolean): boolean | undefined;
        isOpen(): boolean;
        updatePosition(allowWidthChange?: boolean): JQuery;
        refocus(): JQuery;
        cover(show?: boolean, status?: IGContentWorkingStatus): JQuery;
        maximize(maxim: boolean): JQuery;
        dock(position?: IGDialogPositionOptions): JQuery;
        undock(): JQuery;
    }
}
interface JQuery {
    gdialog(options?: Gordic.Widget.IGDialogOptions): JQuery;
    gdialog(method: "refocus"): JQuery;
    gdialog(method: "cover", show?: boolean, status?: Gordic.Widget.IGContentWorkingStatus): JQuery;
    gdialog(method: "dock", pos?: IGDialogPositionOptions): JQuery;
    gdialog(method: "undock"): JQuery;
    gdialog(method: "maximize", maxim: boolean): JQuery;
    gdialog(method: "updateSize", retIsDone?: boolean): boolean;
    gdialog(method: "updatePosition", allowWidthChange?: boolean): JQuery;
    gdialog(method: "close"): JQuery;
}
declare namespace Gordic.Widget {
    interface IGContentWrapperOptions {
        contentMinWidth?: number;
        contentMinHeight?: number;
        customClass?: string;
    }
    interface IGDialogWrapperPanelInitializingArgs {
        panel: JQuery;
        options: IGPanelOptionsExtended;
    }
    interface GContentNewOpsArgs {
        commandBar?: MenuParams[] | null;
        menuBar?: MenuParams[] | null;
        statusBar?: MenuParams[] | null;
        title?: string | null;
        icon?: string | null;
        actions?: GActionList;
    }
    interface IGContentWorkingStatus {
        /** Zobrazovany text "pleasewait" */
        text?: string;
        /** Aktualni prubeh */
        progress?: number;
        /**
         * Celkem
         * @default 100
         */
        total?: number;
    }
    interface IGPanelOptionsExtended extends IGContentWrapperPanelOptions {
        id?: string;
        customDiv?: JQuery;
        leaf?: IGPanelLeaf;
    }
    interface IGSubcontentEvArgs {
        action: "append" | "detach" | "get";
    }
    interface IGSubcontentAppendEvArgs extends IGSubcontentEvArgs {
        action: "append";
        content: GContent;
        options?: IGSubcontentOptions;
    }
    interface IGSubcontentDetachEvArgs extends IGSubcontentEvArgs {
        action: "detach";
        content: GContent;
    }
    interface IGSubcontentGetEvArgs extends IGSubcontentEvArgs {
        action: "get";
        filter?: string;
    }
    interface IGSubcontentOptions {
        /**
         * Umisteni contentu
         * @default left
         */
        region?: GSubcontentRegions;
        title?: string;
        icon?: string;
        badge?: GBadgeOptions;
        layer?: number;
        /**
         * Výchozí hodnota, zda má být subcontent otevřený.
         * @type {boolean}
         */
        visible?: boolean;
    }
    type GSubcontentRegions = "left" | "right" | "bottom";
    interface GFlashOptionsExtended extends GFlashOptions {
        title?: string;
    }
    interface IGContentControlStateCover {
        show: boolean;
        status?: IGContentWorkingStatus;
    }
    interface IGContentControlState extends Gordic.Widget.GContentNewOpsArgs {
        notifications?: IGNotificationOptions[];
        cover?: IGContentControlStateCover;
    }
    type GClientContentControlState = IGContentControlState & ObjectLiteral<any>;
    interface IGPanelLeaf extends Pick<MenuParams, "caption" | "icon" | "customClass" | "badge"> {
        layer: number;
    }
    class GContentWrapper extends JQueryWidget<IGContentWrapperOptions> {
        static widgetName: string;
        static _logger: Gordic.Diagnostics.GLog;
        private static _badgePrioritySortMap;
        private _wrapper;
        private _menuBar$;
        private _statusBar;
        private _flashBar;
        private _commandBar;
        private _top;
        private _middle;
        private _leftBookmarks;
        private _center;
        private _rightBookmarks;
        private _bottomBookmarks;
        private _allRegions;
        private _switchAct;
        private _subsUserSettings;
        private _regionsUserSettings;
        private _forceShowListener;
        _create(): void;
        _destroy(): void;
        protected get _log(): Gordic.Diagnostics.GLog;
        protected _getCreateOptions(): IGContentWrapperOptions;
        private _refresh;
        private _isCurrentContent;
        private _createBookmark;
        private _findPanel;
        private _filterSubContents;
        private _findPanelsByRegion;
        private _findBookmark;
        private _filterBookmarks;
        private _eachBookmark;
        private _switchPanel;
        private _getBookmarkRegion;
        private _updateBookmarkRegionVisibility;
        private _tryHideSubContents;
        private _getContentMinWidth;
        private _setContentMinWidth;
        private _getContentMinHeight;
        private _findMostPrioritizedBadgeNotification;
        private _onContentClosed;
        private _getUserSettings;
        protected _onPanelShow(ev: JQueryEventObject): void;
        protected _onPanelHidden(ev: JQueryEventObject): void;
        protected _onContentActivate(subcontent?: GContent): void;
        protected _onContentDeactivate(subcontent?: GContent): void;
        protected _onPanelResizeStarted(ev: JQueryEventObject, ctx: IGPanelResizingStartedEvArgs): void;
        protected _onPanelResized(ev: JQueryEventObject): void;
        menuBar(params: MenuParams[] | null): void;
        statusBar(params: MenuParams[] | null): void;
        /**
         * flash
         *
         * @param {GFlashOptions | string} options
         * @returns {void | JQuery} Pri setnuti vraci void. Pri stringovem argumentu vraci jquery flashe
         */
        flash(options: GFlashOptionsExtended | string): JQuery | void;
        commandBar(params: MenuParams[] | null): void;
        appendSubcontent(args: IGSubcontentAppendEvArgs): boolean;
        detachSubcontent(args: IGSubcontentDetachEvArgs): boolean;
        getSubcontents(filter?: string): GContent[];
        getActiveSubcontent(region: GSubcontentRegions): GContent | null;
        focus(prioElm?: JQuery): void;
        getPanel(id: string): JQuery | null;
        working(show?: boolean, status?: IGContentWorkingStatus): void;
        toggleSubcontentByIndex(index: number, region: GSubcontentRegions): void;
    }
}
interface JQuery {
    gcontentwrapper(options: Gordic.Widget.IGContentWrapperOptions): JQuery;
    gcontentwrapper(method: "getSubcontents"): GContent[];
    gcontentwrapper(method: "getActiveSubcontent", region: Gordic.Widget.GSubcontentRegions): GContent | null;
}
declare namespace Gordic.Widget {
    interface IGContentWrapperPanelOptions {
        title?: string;
        region?: GSubcontentRegions;
        menuBar?: MenuParams[] | null;
        commandBar?: MenuParams[] | null;
        statusBar?: MenuParams[] | null;
        notifications?: IGNotificationOptions[] | null;
        /** Minimalni sirka v px pro regiony = left, right (default = 200px) */
        minWidth?: number;
        /** Minimalni vyska v px pro region = bottom (default = 200px) */
        minHeight?: number;
        width?: number;
        height?: number;
        visible?: boolean;
        resizable?: boolean;
        customClass?: string;
        show?: (ev: JQueryEventObject, args: IGPanelShowHideArgs) => void;
        hide?: (ev: JQueryEventObject, args: IGPanelShowHideArgs) => void;
        closed?: (ev: JQueryEventObject, thisContent: GContent) => void;
        resized?: (ev: JQueryEventObject) => void;
    }
    interface IGPanelCreateHeaderOptions {
        caption?: string;
        menuBar?: MenuParams[];
    }
    interface IGPanelResizingArgs {
        size?: {
            width: number;
            height: number;
        };
    }
    interface IGPanelResizingStartedEvArgs {
        maxWidth?: number;
        maxHeight?: number;
    }
    interface IGPanelShowHideArgs {
        wasVisible: boolean;
    }
    class GContentWrapperPanel extends JQueryWidget<IGContentWrapperPanelOptions> {
        static widgetName: string;
        private static _lastFlashId;
        private _wrapper;
        private _header;
        private _footer;
        private _title;
        private _titleBar;
        private _menuBar;
        private _statusBar;
        private _flashBar;
        private _commandBar;
        private _maxMinAct;
        private _hideAct;
        _create(): void;
        _destroy(): void;
        _getCreateOptions(): IGContentWrapperPanelOptions;
        _setOption(key: string, value: any): void;
        private _initResizable;
        private _getUnpinIcon;
        private _updateScrollbar;
        private _storeSize;
        private _restoreSize;
        show(silent?: boolean): void;
        hide(silent?: boolean): void;
        menuBar(params: MenuParams[] | null): void;
        statusBar(params: MenuParams[] | null): void;
        commandBar(params: MenuParams[] | null): void;
        title(title?: string | null): string | undefined;
        working(show?: boolean, status?: IGContentWorkingStatus): void;
        /**
         * notification (flash)
         *
         * @param {GFlashOptions | string} options
         * @returns {void | JQuery} Pri setnuti vraci void. Pri stringovem argumentu vraci jquery flashe
         */
        notification(options: IGNotificationOptions | string): JQuery | void;
        notifications(nots: IGNotificationOptions[] | null): void;
        update(state: IGContentControlState): JQuery;
        focus(): void;
        maximize(): boolean;
        maximize(maximized: boolean): void;
        width(): number;
        width(w: number): JQuery;
        height(): number;
        height(h: number): JQuery;
        isResizing(): boolean;
    }
}
interface JQuery {
    gcwpanel(options: Gordic.Widget.IGContentWrapperPanelOptions): JQuery;
    gcwpanel(method: "destroy"): JQuery;
    gcwpanel(method: "newOps", options: Gordic.Widget.GContentNewOpsArgs): JQuery;
    gcwpanel(method: "show"): JQuery;
    gcwpanel(method: "hide"): JQuery;
    gcwpanel(method: "notification", options: IGNotificationOptions | string): JQuery | void;
    gcwpanel(method: "update", state: Gordic.Widget.IGContentControlState): JQuery;
    gcwpanel(method: "width"): number;
    gcwpanel(method: "width", w: number): JQuery;
    gcwpanel(method: "height"): number;
    gcwpanel(mehtod: "height", h: number): JQuery;
    gcwpanel(method: "working", show?: boolean, status?: Gordic.Widget.IGContentWorkingStatus): number;
    gcwpanel(method: "maximize"): boolean;
    gcwpanel(method: "maximize", setMaximized: boolean): JQuery;
    gcwpanel(method: "isResizing"): boolean;
    gcwpanel(method: "focus"): void;
    gcwpanel<K extends Extract<keyof Gordic.Widget.IGContentWrapperPanelOptions, string> = Extract<keyof Gordic.Widget.IGContentWrapperPanelOptions, string>>(method: "option", key: K): Gordic.Widget.IGContentWrapperPanelOptions[K];
    gcwpanel<K extends Extract<keyof Gordic.Widget.IGContentWrapperPanelOptions, string> = Extract<keyof Gordic.Widget.IGContentWrapperPanelOptions, string>>(method: "option", key: K, value: Required<Gordic.Widget.IGContentWrapperPanelOptions>[K]): JQuery;
}
declare namespace Gordic.Widget {
    class GSidebarStub extends JQueryWidget<GSideBarOptions> {
        static widgetName: string;
        static uid: number;
        private _layerCounter;
        _create(): void;
        _destroy(): void;
        _setOption(key: any, value: any): void;
        _createPanels(region: GSubcontentRegions, options: GSideBarBarOptions): void;
        private _getSubcontent;
        private _getAllSubcontents;
        getPanel(id: string): JQuery;
        getActivePanel(region?: GSubcontentRegions): JQuery;
        addPanel(position: string, options: GSbpanelOptions): void;
        updatePanel(id: string, options: GSideBarPanelOptions): void;
        removePanel(id: string): void;
        removeAll(l?: boolean, r?: boolean): void;
        detachAll(l?: boolean, r?: boolean): void;
    }
    class GSbPanelStub extends JQueryWidget<GSideBarPanelOptions> {
        static widgetName: string;
        _create(): void;
        _destroy(): void;
        _setOptions(options: any): void;
        _setOption(key: string, value: any): void;
        protected _getCreateOptions(): GSideBarPanelOptions;
        refreshPin(pinned?: boolean): JQuery;
        isVisible(): boolean;
        menuBar(params: MenuParams[] | null): void;
        commandBar(params: MenuParams[] | null): void;
        flash(flashOptions?: GFlashOptions): JQuery;
        cover(show?: boolean, status?: any | null): void;
        pinOffOn(): void;
        show(skipContentActivation?: boolean): void;
        hide(unpin?: boolean, skipContentDeactivation?: boolean): void;
    }
}
interface JQuery {
    /** !!!Internal-NEPOUZIVAT mimo komponenty!!! Slouzi pouze jako docasna nahrada za gsbpanel!!! */
    gsbpanelstub(options: GSbpanelOptions): JQuery;
    gsbpanelstub(method: "refreshPin", pinned?: boolean): JQuery;
    gsbpanelstub(method: "menuBar", params?: MenuParams[]): JQuery;
    gsbpanelstub(method: "commandBar", params?: MenuParams[]): JQuery;
    gsbpanelstub(method: "flash", flashOptions?: GFlashOptions): JQuery;
    gsbpanelstub(method: "cover", show?: boolean, status?: any | null): JQuery;
    gsbpanelstub(method: "pinOffOn"): JQuery;
    gsbpanelstub(method: "show", skipContentActivation?: boolean): JQuery;
    gsbpanelstub(method: "isVisible"): boolean;
    gsbpanelstub(method: "hide", unpin?: boolean, skipContentDeactivation?: boolean): JQuery;
    gsbpanelstub(method: "option"): GSbpanelOptions;
    gsbpanelstub(method: "option", options: GSbpanelOptions): JQuery;
    gsbpanelstub<K extends Extract<keyof GSbpanelOptions, string>>(method: "option", key: K): GSbpanelOptions[K];
    gsbpanelstub<K extends Extract<keyof GSbpanelOptions, string>>(method: "option", key: K, value: GSbpanelOptions[K]): JQuery;
}
declare namespace Gordic.Utils {
    /**
     * Kurzorem označí text elementu.
     *
     * @author  TFeik
     * @date    24.07.2017
     *
     * @param {!string} selector Selektor elementu s textem. Při nalezení více objektů se označí pouze text prvního z nich.
     */
    function selectText(selector: string): void;
    /**
     * Uloží text do clipboardu / schránky.
     *
     * @author  TFeik
     * @date    24.07.2017
     *
     * @param {!string} text Text, který se uloží do clipboardu / schránky. (Povinný)
     * @param {gcontent} [parentContent='$.content("main")'] Content soužící pro vytvoření dočasných potřebných elementů DOMu. Pokud není vyplněn pak se použije main content.
     *
     * @returns {Promise} Promise uložení do Clipboardu.
     */
    function copyToClipboard(text: string, parentContent?: GContent | null, dataFormat?: string): JQueryPromise<undefined>;
    interface readFromClipboardInput {
        /**
         * Nadřazený content sloužící pro vytvoření dočasných potřebných elementů DOMu. Pokud není vyplněn pak se použije main content.
         * @type {GContent} [parentContent='$.content("main")']
         */
        parentContent: GContent;
        /**
         * default: 'text'
         * @type {string}
         */
        dataFormat?: string;
    }
    interface readFromClipboardOutput {
        /**
         * Text ze schránky.
         * @type {string}
         */
        text?: string;
        /**
         * Text chyby.
         * @type {string}
         */
        errorMessage?: string;
    }
    /**
     * Vrátí text uložený v clipboardu / schránce.
     *
     * @author  TFeik
     * @date    12.05.2020
     *
     * @param {readFromClipboardInput} input
     * @returns {JQuery.Promise<readFromClipboardOutput>} Promise uložení do Clipboardu.
     */
    function readFromClipboard(input: readFromClipboardInput): JQuery.Promise<readFromClipboardOutput>;
}
declare namespace Gordic.Widget.GProgressBar {
    interface IOptions {
        placing?: "top" | "bottom";
        color?: string;
        height?: number;
        fadeOverlay?: boolean;
    }
    interface IDefaultOptions {
        placing: string;
        color: string;
        height: number;
        fadeOverlay: boolean;
    }
}
interface JQuery {
    /** Vytvoří nový GProgressBar uvnitř elementu */
    gprogressbar(options: Gordic.Widget.GProgressBar.IOptions): JQuery;
    /** Nastaví úroveň zabarvení na (int 0-100) % */
    gprogressbar(method: "setProgress", percent: number): void;
    /** Zapne/vypne indikátor práce na pozadí */
    gprogressbar(method: "setPending", state: boolean): void;
    /** Vrátí stav pending */
    gprogressbar(method: "isPending"): boolean;
    /** Vypne indikátor práce na pozadí a nastaví progress na 0 */
    gprogressbar(method: "reset"): void;
}
declare namespace Gordic.Widget.GProgressOverlay {
    interface IOptions {
    }
}
interface JQuery {
    /** Připraví GProgressOverlay uvnitř elementu */
    gprogressoverlay(options?: Gordic.Widget.GProgressOverlay.IOptions): JQuery;
    /** Zapne/vypne indikátor práce na pozadí */
    gprogressoverlay(method: "setPending", state: boolean): void;
    /** Vrátí stav pending */
    gprogressoverlay(method: "isPending"): boolean;
}
declare namespace Gordic.Widget.GTinyGrid {
    const enum GridHideColumns {
        Empty = 1,
        Uniform = 2
    }
    enum GColumnAlignment {
        auto = 0,
        left = 1,
        center = 2,
        right = 3
    }
    interface IOptions {
        /** Názvy sloupců, které mají být vždy viditelné. */
        alwaysVisibleColumns?: string[];
        /** Data k zobrazení v tabulce */
        data: object[];
        /** GGridFormat */
        format?: IGridFormat;
        /** Možné optimalizace skrytí nepodstatných sloupců
         * - Empty: skryje prázdné sloupce
         * - Uniform: skryje sloupce, které mají stejnou hodnotu ve všech řádcích (vč. prázdných sloupců)
         */
        hideColumns?: GridHideColumns;
        /** Nastaví jQuery listenery zadané ve tvaru { "event": listenerFn } na každou buňku
         * listenerFn dostává při vyvolání akce navíc parametry rowData a columnName buňky
         */
        onCell?: ObjectLiteral<(event: JQueryEventObject, rowData: ObjectLiteral<string>, columnName: string) => void | boolean>;
        /** Příznak, zda má tabulka být setřiditelná */
        sortable?: boolean;
        /** Parametr, zda má být aktivní filtrování sloupců
         * - hodnota == 0: tabulka je filtrovatelná.
         * - hodnota > 0: tabulka je filtrovatelná pokud počet řádků (velikost dat) je větší nebo roven
         *      zadané hodnotě.
         * - hodnota < 0: dává smysl pouze pouze když má tabulka scrollovací tBody. Filtr nad sloupcem
         *      se poté zobrazuje, když počet řádků v overflow je větší než abs(hodnota), tedy pro -3
         *      se filtr zobrazí v momentě, kdy alespoň tři a více řádků jsou skryté v overflow.
         * - hodnota == undefined: filtrování sloupců je vypnuté.
         */
        filterable?: number;
        /** Parametr řídí scrollování tBody
         * - typeof hodnota == "string": hodnota se nastaví jako css height na tBody.
         * - hodnota > 0: výška tBody se nastaví tak, aby se do tBody vešel počet řádků, kolik je hodnota.
         * - hodnota == 0: výšku tabulky řídí JS tak, aby byla využita celá dostupná výška parenta tabulky.
         * - hodnota == undefined: scrollovací tBody se vypne.
         */
        scrollBody?: number | string;
        /** Příznak, zda má mít tabulka označitelné (vybíratelné) řádky */
        selectable?: boolean;
        /**
         * Příznak, zda má zobrazovat tooltip se všemi hodnotami řádku (nepoužije se filtrování stejných / prázdných hodnot).
         * - true - Tooltip zobrazí vždy.
         * - undefined (default) - Tooltip zobrazí v případě, že jsou některé sloupce skryté.
         * - false - Tooltip nezobrazí nikdy.
         * @type {boolean}
         */
        showTooltip?: boolean;
        /**
         * (default: false) Příznak, zda se se názvy property přidají jak customClass sloupců.
         * @type {boolean}
         */
        rowPropertyAsColumnCustomClass?: boolean;
        /**
         * Fuknce volaná po zafiltrování dat.
         * @type {(data: object[]) => void}
         */
        onDataFiltered?: (data: object[]) => void;
    }
    interface IGridColumns {
        Alignment: GColumnAlignment;
        ID: string;
        Index: string;
        Title: string;
        Visible: boolean;
        Width?: number;
    }
    interface IGridFormat {
        Columns?: IGridColumns[];
        AlternatingRowsColor: string;
        RowNumbering: boolean;
        RowsColor: string;
    }
}
interface JQuery {
    gtinygrid(options: Gordic.Widget.GTinyGrid.IOptions): JQuery;
    gtinygrid(method: "getRowCells", rowIndex: number): JQuery;
    gtinygrid(method: "getRowCells", rowIndex?: number[]): JQuery;
    gtinygrid(method: "getRowData", rowIndex: number): ObjectLiteral<string>;
    gtinygrid(method: "getRowData", rowIndex?: number[]): ObjectLiteral<string>[];
    gtinygrid(method: "setSelectedRow", row?: object, setFocus?: boolean): JQuery;
    gtinygrid(method: "getSelectedRowData"): object | null;
    gtinygrid(method: "sortRowsByColumn", column: number | string): JQuery;
    gtinygrid(method: "scrollView"): JQuery;
}
declare namespace Gordic.Widget.GLogin {
    const LOGIN_CONTROL_TYPE_REGISTER_EVENT = "glogin_control_type";
    const ResourceTexts: ObjectLiteral<Gordic.General.WebApplication.GLoginAdditionalInformationDto>;
    /**
     * Veřejný klíč pro použití při šifrování údajů posílaných na server.
     * @type {string}
     */
    let CipherPublicKey: string;
    const DefaultLayoutDescriptor = "L1M1S1, L-2-10-0, M-2-10-0, S-12-12-0, breaks-430-1000";
    interface gloginnextEventArgs<TValues = Object, TStorageValues = TValues> {
        values?: TValues | null;
        valuesToStorage?: TStorageValues | null;
    }
    interface GLogin_control_ginitOptions extends Gordic.General.ApplicationClient.GInitialSequenceOutputData {
        Step: string;
        loginConfiguration: General.WebApplication.GLoginConfigurationDto | null | undefined;
    }
    /** Options pro komponentu GLogin_control */
    interface IGLogin_controlOptions {
        title?: string;
        subtitle?: string;
        main: JQuery;
        btnLeft?: GAction | Falsy;
        btnRight?: GAction | Falsy;
        customButtons?: JQuery<HTMLElement>[];
        /** Název volaného kroku. */
        stepName: string;
        loginConfiguration?: General.WebApplication.GLoginConfigurationDto | null;
    }
    /**
     * Komponenta pro OutputData ze serveru. Interně využívá GLogin_control.
     */
    class GLogin_control_ginit<TOptions extends GLogin_control_ginitOptions> extends JQueryWidget<TOptions> {
        static widgetName: string;
        private control?;
        _create(): void;
        setValues(values: Object): void;
        transformValuesFromStorage(storageValues?: Object | null): Object;
        transformValuesToStorage(values?: Object | null): Object;
        goNext(values?: Object | null): JQuery.Promise<void, any, any> | undefined;
        getValuesIfValid(): JQuery.Promise<Object | undefined | null> | undefined | null;
        resetValidationErrors(): void;
    }
    /**
     * Předek ovládacích prvků vytvářených dle OutputData.
     */
    abstract class AGControl<TData extends Gordic.General.ApplicationClient.GInitialSequenceOutputData & IGLogin_controlOptions, TValues = Object, TStorageValues = TValues> {
        element: JQuery;
        outputData: TData;
        constructor(element: JQuery, outputData: TData);
        abstract getValuesIfValid(): JQuery.Promise<TValues | undefined | null> | undefined | null;
        abstract resetValidationErrors(): void;
        abstract setValues(values: TValues): void;
        abstract render(): void;
        /**
         * Metoda, která přetranformuje hodnoty kroku do hodnot, které se uloží do uložiště.
         *
         * @author  TFeik
         * @date    14.10.2020
         *
         * @param {Object} values
         * @returns {Object}
         */
        abstract transformValuesToStorage(values?: TValues | null): TStorageValues | null;
        /**
         * Metoda, která přetranformuje hodnoty z uložiště do hodnot, které se uloží do kroku.
         *
         * @author  TFeik
         * @date    14.10.2020
         *
         * @param {Object} storageValues
         * @returns {Object}
         */
        abstract transformValuesFromStorage(storageValues?: TStorageValues | null): TValues | null;
        goBack(): void;
        goNext(values?: TValues | null): JQuery.Promise<void>;
        private getControl;
        private getControlButtons;
        private getControlButtonNext;
        btnNextEnable(enable: boolean): void;
        btnNextEnabled(): boolean;
    }
    /**
     * Předek formulářových ovládacích prvků.
     */
    abstract class AGForm<TData extends Gordic.General.ApplicationClient.GInitialSequenceOutputData & IGLogin_controlOptions, TValues = Object, TStorageValues = TValues> extends AGControl<TData, TValues, TStorageValues> {
        abstract className: string;
        $Form?: JQuery<HTMLElement>;
        getValuesIfValid(): JQuery.Promise<TValues | undefined | null>;
        resetValidationErrors(): void;
        setValues(values: TValues): void;
        beginOperation(element?: JQuery<HTMLElement>): void;
        endOperation(element?: JQuery<HTMLElement>): void;
        /**
         * Metoda, která přetranformuje hodnoty z uložiště do hodnot, které se uloží do kroku.
         *
         * @author  TFeik
         * @date    11.11.2019
         *
         * @param {Object} storageValues
         * @returns {Object}
         */
        transformValuesFromStorage(storageValues?: TStorageValues | null): TValues | null;
        /**
         * Metoda, která přetranformuje hodnoty kroku do hodnot, které se uloží do uložiště.
         *
         * @author  TFeik
         * @date    11.11.2019
         *
         * @param {Object} values
         * @returns {Object}
         */
        transformValuesToStorage(values?: TValues | null): TStorageValues | null;
    }
    /**
     * Obrazovka pro zadání nového hesla, pokud staré vypršelo nebo
     * vylo zneplatněné jinak.
     */
    class PasswordChange extends AGForm<Gordic.General.ApplicationClient.GInitialSequenceOutputData & IGLogin_controlOptions & {
        IsOldPasswordRequired: boolean;
        ValidationArgs: Object;
    }> {
        className: string;
        render(): void;
        /**
         * Přetranformuje hodnoty z uložiště do hodnot, které se uloží do kroku.
         *
         * @author  TFeik
         * @date    16.11.2020
         *
         * @param {Object} storageValues
         * @returns {Object}
         */
        transformValuesFromStorage(storageValues?: Object | null): Object | null;
        /**
         * Přetranformuje hodnoty kroku do hodnot, které se uloží do uložiště.
         *
         * @author  TFeik
         * @date    16.11.2020
         *
         * @param {Object} values
         * @returns {Object}
         */
        transformValuesToStorage(values?: Object | null): Object | null;
    }
    /**
     * Převede GInfoStateEnum na GState.
     *
     * @author  TFeik
     * @date    06.11.2020
     *
     * @param {General.ApplicationClient.GInfoStateEnum | null} [infoState]
     * @returns {GState | undefined}
     */
    function infoStateToState(infoState?: General.ApplicationClient.GInfoStateEnum | null): GState | undefined;
}
interface JQuery {
    glogin_control(options: Gordic.Widget.GLogin.IGLogin_controlOptions): JQuery;
    glogin_control_ginit<TOptions extends Gordic.Widget.GLogin.GLogin_control_ginitOptions>(options: TOptions): JQuery;
    glogin_control_ginit(method: 'setValues', values: Object): JQuery;
    /**
     * Metoda, která přetranformuje hodnoty z uložiště do hodnot, které se uloží do kroku.
     *
     * @author  TFeik
     * @date    11.11.2019
     *
     * @param {Object} storageValues
     * @returns {Object}
     */
    glogin_control_ginit(method: 'transformValuesFromStorage', storageValues: Object): Object;
    /**
     * Metoda, která přetranformuje hodnoty kroku do hodnot, které se uloží do uložiště.
     *
     * @author  TFeik
     * @date    11.11.2019
     *
     * @param {Object} values
     * @returns {Object}
     */
    glogin_control_ginit(method: 'transformValuesToStorage', values: Object): Object;
    /**
     * Metoda, která přetranformuje hodnoty kroku do hodnot, které se uloží do uložiště.
     *
     * @author  TFeik
     * @date    11.11.2019
     *
     * @param {Object} values
     * @returns {Object}
     */
    glogin_control_ginit(method: 'goNext', values?: Object | null): JQuery.Promise<void>;
    glogin_control_ginit(method: 'getValuesIfValid'): JQuery.Promise<Object | undefined | null> | undefined | null;
    glogin_control_ginit(method: 'resetValidationErrors'): void;
}
/**
 * Typ pro Gpc. Aktuálně slouží pouze pro předávání z GLogin do GLogintils.
 *
 * @author  TFeik
 * @date    20.04.2021
 * @since   486.1.0.163
 */
type Gpc = ObjectLiteral<string>;
declare namespace Gordic.Widget.GLogin {
}
declare namespace Gordic.Widget.GLogin {
    interface IUserMenu {
        Infos: Array<{
            Id: string;
            Title: string;
            Value: string;
        }>;
        Actions: Array<{
            Id: string;
            Title: string;
            Parameters: ObjectLiteral<string>;
        }>;
    }
    /** Interface options pro nastavení widgetu */
    interface IOptions {
        data: Gordic.General.WebApplication.GInitialSequenceDto;
        nextCallback: (serverContext: Object) => JQueryPromise<Gordic.General.WebApplication.GInitialSequenceDto>;
        gpcPrev: ObjectLiteral<string> | undefined | null;
    }
    /** názvy CSS tříd, sdílejí se se souborem GloginControls.ts */
    const classNames: {
        applicationLogo: string;
        applicationName: string;
        loginStepTitle: string;
        loginStepSubtitle: string;
        loginAdditionalInformation: string;
        loginAdditionalInformationHeader: string;
        loginAdditionalInformationHeaderIcon: string;
        loginAdditionalInformationText: string;
        loginAdditionalInformationError: string;
        loginAdditionalInformationWarning: string;
        loginAdditionalInformationInfo: string;
        loginAdditionalInformationImportant: string;
        body: string;
        mainBottom: string;
        btn: string;
        btn_back: string;
        btn_datsch: string;
        btn_identitaObcana: string;
        btn_mojeid: string;
        btn_vysocinaid: string;
        btn_next: string;
        control: string;
        controlSpace: string;
        controlMain: string;
        controlButtons: string;
        controlTitle: string;
        main: string;
        header: string;
        content: string;
        footer: string;
        contentHeader: string;
        contentMain: string;
        contentFooter: string;
        contentFooterLink: string;
        contentFooterLinks: string;
        contentFooterLanguages: string;
        contentFooterLanguagesField: string;
        isParameterSelectionAfterLogin: string;
        loginArticleInModalWindow: string;
        sectionSeparator: string;
        titleOAuth: string;
        externalSystems: string;
        btnExternalSystem: string;
        contentFooterLanguageText: string;
        contentFooterLanguageFlag: string;
        externalSystemSection: string;
        internalLoginSection: string;
        loginImage: string;
        loginBreadcrumb: string;
    };
    /**
     * Vrátí hodnotu parametru "skipUserSelectionStep" z local storage.
     * Výchozí chování je přeskakovat krok pro zadání uživatele, pokud je povoleno přeskakování ve webconfigu.
     *
     * @author  truzicka
     * @date    15.09.2025
     *
     * @returns {boolean}
     */
    function GetSkipUserSelectionStepFromLocalStorage(localStoredObject: GData.Contract<string, object> | null, stepId: string): boolean;
    /**
     * Nastaví v local storage hodnotu parametru "skipUserSelectionStep" na true,
     * aby se při dalším přihlášení krok pro zadání uživatele přeskakoval.
     * @param localStoredObject - objekt z local storage
     * @returns {void}
     */
    function RemoveSkipSelectionStepFromLocalStorage(localStoredObject: GData.Contract<string, object> | null): void;
}
interface JQuery {
    glogin(options: Gordic.Widget.GLogin.IOptions): JQuery;
    glogin(method: "expand", width?: string | number): JQuery;
}
declare namespace Gordic.Utils.Menu {
    interface IGMenuSettingsOptions {
        /** Aktualni profil */
        profile?: IGMenuProfile;
        /** Vychozi profil (pro zahozeni zmen) */
        defaultProfile?: IGMenuProfile;
        /** Parametry menu */
        params: MenuParams[];
        /** Title contentu */
        title?: string;
        /** Callback zavolany po pridani do profilu. Vrati-li se true, pak polozka zustane v profilu. Na false*/
        afterAdd?: (node: GMenuProfileNode, pb: GMenuProfileBuilder) => boolean;
        /** Callback volany pred odebranim z profilu. Vrati-li se true, pak dojde k odebrani. False odebirani stopne. */
        beforeRemove?: (node: GMenuProfileNode, pb: GMenuProfileBuilder) => boolean;
        /** Callback volany pred presunutim polozky v ramci profilu. Vrati-li true, pak se operace provede. False ji stopne. */
        beforeMove?: (node: GMenuProfileNode, pb: GMenuProfileBuilder, ctx: IGMenuSettingsMoveArgs) => boolean;
        /** Callback k uprave polozek menubaru pred jeho samotnym vytvorenim. */
        menuBar?: (mps: MenuParams[]) => void;
        /** Callback volany pred editaci parametru */
        beforeParamsEdit?: (opType: IGMenuSettingsEditOpType, mods: IGMenuProfileModifications, mp: MenuParams, editOptions: IGMenuSettingsEditParamsOptions) => IGMenuProfileModifications | null;
    }
    class GMenuSettings extends GContentBase implements IGClientContent {
        uid: string;
        /** Vychozi profil, ke kteremu je mozne se vracet, kdyz je treba zahodit zmeny (jen pro cteni!). */
        private defaultProfile;
        private options;
        /** Originalni instance MenuParams - vse z teto instance musi byt pouze pro cteni! */
        private originalParams;
        private profileBuilder;
        /** Grid s originalnimi MenuParams[] - zdroj pro kopirovani do profilu. */
        private originalsGrid;
        /** View s originalnimi MenuParams[] - zdroj pro kopirovani do profilu. */
        private originalsView;
        /** Grid obsahujici aplikovany aktualni profil. */
        private profiledGrid;
        /** View obsahujici aplikovany aktualni profil. */
        private profiledView;
        /** Tree processor */
        private profiledViewTreeProcessor;
        /** Byly proveden nejake upravy? */
        private hasChanges;
        /** Pridani MenuParams do profilu na posledni pozici. */
        private addProfileAct;
        /** Pridani MenuParams do aktualniho oznaceneho MenuParam jako children na posledni pozici. */
        private addToChildrenProfileAct;
        /** Vycisteni celeho profilu. */
        private clearProfileAct;
        /** Vraceni zmen z profilu */
        private resetProfileAct;
        /** V profilu vytvori children v takovem poradi, jake jsou v originalu */
        private copyChildrenToProfileAct;
        /** Z profilu odstrani children */
        private deleteChildrenFromProfileAct;
        /** Odstraneni aktualne oznaceneho MenuParams z profilu. */
        private removeAct;
        /** Pridani na konec aktualne vybrane urovne. */
        private addTailAct;
        /** Pridani na konec do children aktualne vybrane polozky. */
        private addIntoChildrenAct;
        /** Pridani na konec aktualne vybrane polozky pres modalni okno */
        private addSelectAct;
        /** Pridani do children aktualne vybrane polozky pres modalni okno */
        private addIntoChildrenSelectAct;
        /** Zapise aktualni profil do konzole */
        private profileToConsoleAct;
        private editProfiledAct;
        /** Zavreni okna + vraceni profilu */
        private okAct;
        /** Zavreni okna bez vraceni cehokoliv */
        private cancelAct;
        /** Posun polozky ve scope nahoru */
        private moveUpAct;
        /** Posun polozky ve scope dolu */
        private moveDownAct;
        /** Posun polozky mezi podrizene polozky predchozi polozky */
        private moveDownLevelAct;
        /** Posun polozky o uroven vys */
        private moveUpLevelAct;
        logOptions: {
            name: string;
            authorCode: number;
            fileName: string;
        };
        prepareContent(options: IGMenuSettingsOptions): void;
        closing(): JQueryPromise<IGMenuProfile | void>;
        getCurrentProfile(): IGMenuProfile;
        private onProfiledGridSelectionChanged;
        /** Vytvoreni kopii menuparams i profilu */
        private initProfile;
        /** Vycisti parametry profilu */
        private clearProfile;
        /** Navrat k puvodnimu profilu */
        private resetProfile;
        private addNew;
        /** Vlozi do profilu mezi root menuparams na konec */
        private addToProfileTail;
        private addToProfileIntoCurrent;
        /** Vyber ze vsech dostupnych polozek */
        private selectExisting;
        private removeFromProfile;
        private copyChildrenToProfile;
        private deleteChildrenFromProfile;
        private editProfiled;
        /** V gridu s aplikovanym profilem oznaci danou polozku */
        private selectProfiled;
        private expandAllParents;
        private expandItem;
        private menuParamTypeToUserReadableString;
        private menuParamTypeToIcon;
        private menuParamCaptionVisibleToUserReadableString;
        private getData;
        /** Projde cely profil a zjisti, jestli kazda z polozek profilu (krome virtualnich) ma odpovidajici id v originalnich menuParams. */
        private getPurifiedProfile;
        private moveCurrItem;
        /** Posune polozku v ramci sveho scope (polozke se nenahrazuje novou). */
        private moveItemInScope;
        /** Posune polozku o level vys (odebranim a vytvorenim nove). */
        private moveItemUpLevel;
        private moveItemDownLevel;
        /** Objekt actionContextu zobrazi jako JSON (s odsazenim) */
        private actionContextToString;
        /** Vytvoreni formatovaneho tooltipu obs. vybrane vlastnosti menuparams */
        private formatMenuParamTooltip;
    }
    interface IGMenuSettingsEditParamsOptions {
        /** Mozno zmenit typ polozky (default = false) */
        itemTypeAllowChange?: boolean;
        /** Ma byt viditelny typ? (default = false) */
        itemTypeVisible?: boolean;
        /** Mozno zmenit ikonu? (default = false) */
        iconAllowChange?: boolean;
        /** Lze videt radek pro zmenu ikony? */
        iconVisible?: boolean;
        /** Mozno menit popisek? (default = false) */
        captionAllowChange?: boolean;
        /** Ma byt videt radek pro zmenu popisku? */
        captionVisible?: boolean;
        /** Ma byt videt radek pro zmenu captionVisible? */
        captionVisibleVisible?: boolean;
        /** Mozno zmenit hodnotu captionVisible? */
        captionVisibleAllowChange?: boolean;
        /** Ma byt videt radek pro zmenu tooltipu? */
        tooltipVisible?: boolean;
        /** Mozno zmenit tooltip? */
        tooltipAllowChange?: boolean;
        /** Mozno zmenit zarovnani? */
        alignAllowChange?: boolean;
        /** Ma byt viditelny radek se zarovnanim? */
        alignVisible?: boolean;
        /** Mozno zmenit styl primary? */
        primaryAllowChange?: boolean;
        /** Ma byt viditelny radek ke zmene primary? */
        primaryVisible?: boolean;
        /** Ma byt videt prop. visiblePriority? */
        visiblePriorityVisible?: boolean;
        /** Umoznit editaci prop. visiblePriority? */
        visiblePriorityAllowChange?: boolean;
        /** Umoznit editaci actionContext (default = false) */
        actionContextAllowChange?: boolean;
        /** Viditelny actionContext (default=false) */
        actionContextVisible?: boolean;
        /** Povolene typy v dropdown 'type' */
        allowedItemTypes?: string[];
    }
    type IGMenuSettingsEditOpType = "new" | "edit";
    type IGMenuSettingsMoveDirection = "up" | "down" | "upLevel" | "downLevel";
    interface IGMenuSettingsMoveArgs {
        direction: IGMenuSettingsMoveDirection;
        parentNode?: GMenuProfileNode;
        parentParams?: MenuParams;
    }
}
declare namespace Gordic.Widget {
    interface IGMenuOptions {
        /**
         * Parametry menu
         * @type {MenuParams[]}
         */
        params: MenuParams[];
        /**
         * Seznam akci
         * @type {GAction[] | GActionList}
         */
        actions?: GAction[] | GActionList;
        /**
         * Ma byt povolene vyhledavani?
         * @type {boolean}
         */
        search?: boolean;
        /**
         * Pocet levelu, ktere mohou byt zobrazeny vedle sebe
         * @type {number}
         * @default 1
         */
        levelsVisible?: number;
        /**
         * Sirka jednoho frame
         * @type {number}
         */
        frameWidth?: number;
        /** Pomucka pro vytvareni polozek menu (k pretizeni) */
        itemBuilder?: Gordic.Utils.Menu.GActionMenuItemBuilder;
        /** Povoleno pinovani */
        pins?: boolean;
        /** Vytvori buttonpanel v zahlavi menu */
        menuBar?: MenuParams[];
        /** Rychlost animace pro prepinani mezi frames */
        animationSpeed?: number;
        /**
         * Pretizeni zahlavi jednoho frame
         *
         * @param {HTMLElement} this Element widgetu gactionmenu
         * @param {Gordic.Utils.Menu.IGCreateHeaderOptions} options Parametry zahlavi
         * @param {JQuery} original Defaultni element, ktery by se zobrazil v zahlavi, pokud by nedoslo k pretizeni
         * @returns {JQuery | void | null} JQuery = pretizeni defaultu, undefined = ponechani defaultu, null = nezobrazi nic
         */
        header?(this: HTMLElement, options: Gordic.Utils.Menu.IGCreateHeaderOptions, original: JQuery): JQuery | void | null;
        /**
         * Pretizeni zapati jednoho frame
         *
         * @param {HTMLElement} this Element widgetu gactionmenu
         * @param {Gordic.Utils.Menu.IGCreateFooterOptions} options Parametry zapati
         * @param {JQuery} original Defaultni element, ktery by se zobrazil v zahlavi, pokud by nedoslo k pretizeni
         * @returns {JQuery | void | null} JQuery = pretizeni defaultu, undefined = ponechani defaultu, null = nezobrazi nic
         */
        footer?(this: HTMLElement, options: Gordic.Utils.Menu.IGCreateFooterOptions, original: JQuery): JQuery | void | null;
        /** Je-li true, pri likvidaci menu provede odpojeni vsech widgetu */
        detachWidgetsOnDestroy?: boolean;
        /** Byla provedena nejaka operace s polozkami */
        itemOp?: (this: HTMLElement, event: JQueryEventObject, opType: IGActionMenuOperationType, params?: MenuParams) => void;
        /** Zmenil se pocet viditelnych frame (sloupcu) */
        framesVisibilityChanged?: (this: HTMLElement, event: JQueryEventObject, framesInfo: IGMenuFramesVisibilityChangedInfo) => void;
        /** Zmenila se aktivni polozka v menu */
        activeItemChanged?: (this: HTMLElement, event: JQueryEventObject, params?: MenuParams) => void;
    }
    type IGMenuMoveDirection = "left" | "right" | "up" | "down" | "root" | "first" | "last";
    type IGActionMenuOperationType = "actionrun" | "framechanged" | "submenuopen" | "navback" | "noop" | "favoritechanged";
    interface IGMenuFramesVisibilityChangedInfo {
        /** Pocet viditelnych sloupu vedle sebe (nemusi byt aktualne vyplnene polozkami) */
        visibleFrameCount: number;
        /** Je viditelny root frame? */
        isRootVisible: boolean;
    }
    class GActionMenu extends JQueryWidget<IGMenuOptions> {
        static widgetName: string;
        static get defaultOptions(): IGMenuOptions;
        private static _menuParamDataKey;
        private static _findActivableSelector;
        private static _findActiveSelector;
        private static _findActiveAllSelector;
        private static _findSelectedSelector;
        protected _itemBuilder: Gordic.Utils.Menu.GActionMenuItemBuilder;
        protected _headerDiv?: JQuery;
        protected _frameDiv: JQuery;
        protected _footerDiv: JQuery;
        private _currentFrames;
        private _prevFrames;
        private _frames;
        protected _frameWrappers: JQuery[];
        protected _searchDelay: number;
        protected _searchView?: Gordic.Data.View<MenuParams>;
        protected _searchResolver?: Gordic.Data.Filtering.BaseResolver;
        private _prevSearch?;
        /** Neviditelne framy se musi odkladat sem, aby byly v DOM, jinak se na nich nebude volat GAction.update() */
        protected _invisibleBuffer: JQuery;
        protected _getCreateOptions(): IGMenuOptions;
        _create(): void;
        _destroy(): void;
        _clean(): void;
        private _detachWidgets;
        _createFrameWrappers(count: number): JQuery[];
        _appendFrameWrappers(wrps: JQuery[]): void;
        /** Oznaceni vybrane polozky menu */
        _makeSelection(target: HTMLElement): void;
        /** Odznaci aktivni polozku (v pripade targetItem) nebo odebere vsechny pripadne aktivni polozky */
        _removeActive(): void;
        /** Zruseni vyberu */
        _removeSelection(target?: Element): void;
        private _findActive;
        private _findByMenuParam;
        private _move;
        private _moveTo;
        private _initShortcuts;
        private _initResizeManagement;
        private _uninitResizeManagement;
        private _updateWidth;
        private _search;
        protected _createHeaderPanel(): JQuery;
        private _moveRoot;
        private _dispatchEvent;
        /**
         * Vytvori seznam z aktualnich menuParams (jen jedna uroven)
         *
         * @param {MenuParams} params
         * @returns {JQuery}
         */
        private _createFrame;
        private _createItem;
        private _createHeaderItem;
        private _createFooterItem;
        private _render;
        private _renderChildren;
        /** Provede navrat do predchoziho menu (vraci frame.level - 1 oproti arg. level) */
        private _goBack;
        private _detachFrame;
        private _syncFrames;
        private _tryScrollActiveFrameItem;
        private _tryScrollActiveItem;
        refresh(): JQuery;
        move(direction: IGMenuMoveDirection): JQuery;
        getActive(): MenuParams | null;
        resetActive(): void;
        runActive(): JQuery;
        updateWidth(): JQuery;
        /** Je-li zapnute vyhledavani, vyplni do menu text a zafiltruje */
        search(term: string | null): JQuery;
        /** Je-li zapnute vyhledavani, hodi focus na vyhledavaci input */
        focusSeach(): JQuery;
        selectItem(params: MenuParams): void;
        /** Spocita aktualni vysku podle aktualne zobrazenych polozek */
        getCurrentHeight(): number;
        /** Vrati pocet aktualne viditelnych framu */
        getVisibleFramesCount(): number;
        /** Je viditelny root menu? */
        isRootVisible(): boolean;
    }
}
interface JQuery {
    /** Vytvoreni widgetu menu */
    gactionmenu(options?: Gordic.Widget.IGMenuOptions): JQuery;
    /** Pristup k options (gettery) */
    gactionmenu<T extends Gordic.Widget.IGMenuOptions, K extends keyof T>(method: "option", optionName: K): T[K];
    /** Pristup k options (settery) */
    gactionmenu<T extends Gordic.Widget.IGMenuOptions, K extends keyof T>(method: "option", optionName: K, value: Required<T>[K]): JQuery;
    /** Zlikvidovani widgetu */
    gactionmenu(method: "destroy"): JQuery;
    /** Rizeni pohybu po menu */
    gactionmenu(method: "move", direction: Gordic.Widget.IGMenuMoveDirection): JQuery;
    /** Vrati menuParams aktivni polozky (pokud je nejaka aktivni)  */
    gactionmenu(method: "getActive"): MenuParams | null;
    /** Spusti aktivni polozku (pokud je nejaka aktivni) */
    gactionmenu(method: "runActive"): JQuery;
    /** Zrusi aktivni polozky v menu */
    gactionmenu(method: "resetActive"): JQuery;
    /** Uprava sirky (pokud je options.levelsVisible > 1) */
    gactionmenu(method: "updateWidth"): JQuery;
    /** Je-li zapnute vyhledavani, vyplni do menu text a zafiltruje */
    gactionmenu(method: "search", term: string | null): JQuery;
    /** Je-li zapnute vyhledavani, hodi focus na vyhledavaci input */
    gactionmenu(method: "focusSeach"): JQuery;
    /** Spocita aktualni vysku podle aktualne zobrazenych polozek */
    gactionmenu(method: "getCurrentHeight"): number;
    /** Oznaci vybranou polozku v menu podle menuparams */
    gactionmenu(method: "selectItem", params: MenuParams): JQuery;
    /** Vrati pocet aktualne viditelnych framu */
    gactionmenu(method: "getVisibleFramesCount"): number;
    /** Je viditelny root menu? */
    gactionmenu(method: "isRootVisible"): boolean;
}
declare namespace Gordic.Gui.WebControls {
    export class GDateComboboxBase {
        private options;
        create(element: JQuery<HTMLElement>, opt: IGDateComboBoxOptions): void;
        private modelValueTransform;
        /**
         * provedeme dynamickou úpravu rozsahu políčka
         */
        private changeValue;
        private init;
        /** nastavit den v týdnu */
        private setDayInWeek;
        /**
         * nastavit rozsah na celý rok
         * @param selectYear
         */
        private setYear;
        /** nastavit měsíc v roce */
        private setMonthInYear;
        private setTomorrow;
        private setToday;
        private setYesterday;
        private setThisWeek;
        private setLastWeek;
        private setThisMonth;
        private setLastMonth;
        private setThisYear;
        private setLastYear;
        /**
         * nastavit hodnotu políčka před termínem
         */
        private setBeforeDeadline;
        /**
         * nastavit hodnotu políčka těsně před termínem
         */
        private setJustBeforeDeadline;
        /**
         * nastavit hodnotu políčka po termínu
         * @param daysRangeMax
         */
        private setAfterDeadline;
        private createContextMenuData;
        private getYearCount;
        private setUserSettings;
        /** uložení hodnoty do uživatelského nastavení */
        private setUserSettingsChange;
        /** získání uložené hodnoty datumu z uživatelského nastavení */
        private getUserSettingsChange;
        /**
         * validace datumové hodnoty, pokud přijde jako string
         */
        private validateValueIfString;
        /**
         *  validace vstupní hodnoty z uživ. nastavení
         *  - pro případy, kdy by hodnoty dle name mohli zestárnout (např. hodnota uložena thisWeek už neměla hodnoty pro thisWeek, ale např. lastWeek)
         * (thazmuka 17.8.2021)
         * */
        private validateInitUserSettingsValue;
        private setValueFromName;
        /**
          *  provedení nasetování vstupní hodnoty do políčka
          *  - využito, když programátor zadá příslušný string do InitialValue
          * */
        private setInitialValue;
        private setValueOnInput;
        /**
         * vytvoří základní nabídku
         * @param array vstupní pole
         * @param withName přidat do jednotlivých objektů name - kvuli userSettings
         */
        private setDefaultAutoCompleteValues;
        /**
          * nastavit rozsahy textových voleb pro autocomplete
          */
        private setPreSelectedValues;
        /**
          * provedení itemTemplate políčka
          * @param value
          */
        private setItemTemplate;
        private validPreSelectedValuesInInvalidTransform;
        private setInvalidTransform;
        /** vytvoření kalendářového tlačítka */
        private createDatePicker;
        /** přidat tlačítko pro jednotlivé dny v týdnu */
        private addButtonSingleDaysInWeek;
        /** přidání měsíců za 5 posledních let */
        private addButtonMonthsInFiveLastYear;
        private prefillm;
        private totodaym;
        private getDaysRangeMaxText;
        private _getDaysRangeMaxNumberYearsText;
        private _getDaysRangeMaxNumberDaysText;
        private setFromToday;
        private setToToday;
        /**
           * přidat tlačítko - předplnit počet dnů dopředu a dozadu
           * @param menuParams
           */
        private addButtonFillForwardBack;
        /**
         * je objekt prázdný?
         * @param obj
         */
        private isEmpty;
        private getRangeMax;
        private getRangeMin;
        private createContextMenuForm;
        /** přidat tlačítko otevírající možnosti políčka */
        private addButtonOptionsOfField;
        /** modální dialog nastavení políčka */
        private settingsDlg;
        private openOptionsWindow;
        private refreshContextMenu;
        private createFormWindow;
        /**
         * vytvořit commandbar
         */
        private createCommandUserSettings;
        private setHelperItemTemplate;
        private setOptHandlers;
        private initContextMenuDaysRange;
        private addButtons;
        private setDate;
        private validate;
        private resetErrors;
        private setError;
    }
    export interface IGDateComboBoxOptions extends GSelectBoxOptions<any> {
        /** vynutit prázdnou vstupní hodnotu */
        forceEmptyValue?: boolean;
        /** vstupní hodnoty
         * - hodnoty beforedeadline | justbeforedeadline | afterdeadline jdou použít pouze při použití epkFlag
         * - hodnota all je OBSOLETE
         * */
        initialValue?: "all" | null | IGDateValueOpt | "tomorrow" | "today" | "yesterday" | "thisweek" | "lastweek" | "thismonth" | "lastmonth" | "thisyear" | "lastyear" | "beforedeadline" | "justbeforedeadline" | "afterdeadline";
        defaultInitialValue?: "all" | null | IGDateValueOpt | "tomorrow" | "today" | "yesterday" | "thisweek" | "lastweek" | "thismonth" | "lastmonth" | "thisyear" | "lastyear" | "beforedeadline" | "justbeforedeadline" | "afterdeadline";
        /** uživatelské nastavení (využito pro nastavení políček v contextmenu) */
        userSettings?: Gordic.Data.IGStorage | null;
        /** vytvoří contextMenu
         * - pokud chceme zobrazit pouze menu bez přepínače, vytvořte aspoň prázdný objekt
         * */
        contextMenu?: {
            /** nastavení rozsahu (default 30) pro přepínač */
            daysRange?: number;
        } | true;
        /** nastavení řádu hodnoty daysRangeMax (default=days) */
        daysRangeMaxType?: GDateComboboxRangeMaxTypeEnum;
        /**
         * akceptuji pouze hodnotu typu number
         **/
        daysRangeMax?: null | number;
        /**
         * [OBSOLETE] - popisek se již nezobrazuje
         * @deprecated [OBSOLETE] - popisek se již nezobrazuje
         *  - skrytí popisku maximálního intervalu (default=false) */
        daysRangeMaxHideCaption?: boolean;
        /**
         * příznak využití políčka v modulu EPK05
         * - primárně v EPK, ale lze využít i jinde, poté nebude vynucován doporučený interval výběru, bude k dispozici možnost Vše
         * a nejspíš i termíny, kdyby někdo našel problém, dejte vědět
         * */
        epkFlag?: boolean;
        /** počet dnů do termínu - jen při využití v EPK */
        epkDnuDoTerminu?: number;
        /** zobrazení tlačítek pro naplnění rozsahu od dnes/do dnes (default=true) */
        fillForwardBackButton?: false;
        /** private */
        value?: any;
    }
    /** enum pro speciální rozsahy "Termíny" pro EPK05 */
    export enum GDateComboboxTerm {
        /** před termínem */
        BeforeDeadline = 1,
        /** těsně před termínem */
        JustBeforeDeadline = 2,
        /** po termínu */
        AfterDeadline = 3
    }
    export interface IGDateValueOpt {
        /** následujících X (dní, roků) */
        nextInterval?: boolean;
        /** předchozích X (dní, roků) */
        prevInterval?: boolean;
        /** doporučený interval */
        recommended?: boolean;
        /** předplnění posledních X dní */
        prefill?: boolean;
        /** nastavení datumu 'do' na dnes */
        totoday?: boolean;
        /** specialita pro EPK - příznak pro speciální volby */
        epk_termin?: GDateComboboxTerm;
        /** název políčka pro userSettings, !pozor je potřeba před vložením hodnoty do fieldu tento udaj odstranit, at nedela problemy! */
        name?: string;
        /** textový label políčka */
        caption?: string;
        /** datumový rozsah */
        date: {
            /** od */
            start: Date;
            /** do */
            end: Date;
        } | null;
    }
    enum GDateComboboxRangeMaxTypeEnum {
        /** dny */
        days = 0,
        /** roky */
        years = 1
    }
    export {};
}
declare namespace Gordic.Widget {
    interface WalkthroughInfo {
        currentName: string;
        advanceName: string;
        currentPosition: number;
        advancePosition: number;
        maxPosition: number;
    }
    interface IGWalkThroughOptions {
        animateNext?(current: JQuery, next: JQuery, wi: WalkthroughInfo, ...extras: any[]): void;
        animateBack?(current: JQuery, back: JQuery, wi: WalkthroughInfo, ...extras: any[]): void;
        pendingStart?: () => void;
        pendingEnd?: () => void;
    }
    interface IGWalkThroughDefaultOptions {
        animateNext: (...args: any[]) => any;
        animateBack: (...args: any[]) => any;
        pendingStart: () => void;
        pendingEnd: () => void;
    }
}
interface JQuery {
    gwalkthrough(options?: Gordic.Widget.IGWalkThroughOptions): JQuery;
    gwalkthrough(method: "back" | "next", name?: string, element?: JQuery): JQuery;
    gwalkthrough(method: "current"): JQuery | undefined;
    gwalkthrough(method: "viewIndex"): number;
}
declare namespace Gordic.Widget.GFlashManager {
    interface IOptions {
        /**
         * (default: "front") Režim zobrazení zpráv:
         * - front: flash zprávy se zobrazují v popředí, překrývají obsah ale
         *  neovlivňují jeho pozici,
         * - top: flash zprávy se zobrazují v elementu nahoře, posunují obsah
         *  dolů, ale nepřekrývají ho
         */
        position?: "front" | "top";
    }
    interface IDefaultOptions {
        position: string;
    }
    const FLASH_MESSAGE_EVENT = "flashmessage";
}
interface JQuery {
    gflashmanager(options?: Gordic.Widget.GFlashManager.IOptions): JQuery;
    gflashmanager(method: "flash", flashObject?: GFlashOptions, gstate?: GState): JQuery;
}
interface IGGroupableOptions extends JQueryUI.WidgetOptions {
    /**
     * Identifikace groupy
     * @type {IGTabGroupOptions}
     */
    group?: IGTabGroupOptions;
    /**
     * eventHandler, ve kterém by mělo dojít ke skrytí nebo zobrazení elementu, podle ctx.conceal požadavku
     * @type {IGGroupableConcealEvent}
     */
    conceal?: IGGroupableConcealEvent;
}
interface IGGroupableConcealEvent {
    (ev: JQuery.Event, ctx: {
        conceal: boolean;
    }): any;
}
interface IGTabGroupOptions extends Pick<MenuParams, "id" | "caption" | "badge" | "icon" | "visible" | "captionVisible" | "enabled"> {
}
declare namespace Gordic.Widget {
    class GGroupable extends JQueryWidget<IGGroupableOptions> {
        static widgetName: string;
        refresh(): void;
        protected _getCreateOptions(): {
            group: {};
            conceal: (ev: any, ctx: any) => JQuery<HTMLElement>;
        };
        protected _setOption(key: string, value: any): void;
        protected _create(): void;
        _destroy(): void;
        conceal(enabled: boolean): void;
    }
}
interface JQuery {
    /**
     * ggroupable - je potřeba nadefinovat option conceal, ve které je potřeba na základě ctx.conceal(boolean) schovat nebo zobrazit potřebné elementy
     *
     * @param {IGGroupableOptions} [options]
     * @returns {JQuery}
     */
    ggroupable(options?: IGGroupableOptions): JQuery;
    ggroupable(method: "conceal", enabled: boolean): JQuery;
    ggroupable(method: "destroy"): JQuery;
    ggroupable(method: "option"): IGGroupableOptions;
    ggroupable(method: "option", values: Partial<IGGroupableOptions>): JQuery;
    ggroupable<K extends Extract<keyof IGGroupableOptions, string>>(method: "option", key: K): IGGroupableOptions[K];
    ggroupable<K extends Extract<keyof IGGroupableOptions, string>>(method: "option", key: K, value: Required<IGGroupableOptions>[K]): JQuery;
}
declare namespace Gordic.Gui.WebControls {
    class GArticleContent extends GContentBase implements IGClientContent {
        data: GArticle;
        prepareContent(): void;
        init(): void;
    }
    class GArticle {
        id?: string;
        title?: string;
        modified?: Date;
        tags?: string[];
        toolbar?: MenuParams[];
        statusBar?: MenuParams[];
        commandBar?: MenuParams[];
        links?: MenuParams[];
        content?: string;
    }
}
/**
 * GArticle
 *
 * @author Petr Horsák
 * @since 482.1.0.486
 */
declare namespace Gordic.Widget {
    export interface GArticleOptions extends GArticleEvents {
        id?: string;
        title?: string | null;
        author?: string | null;
        showTitle?: boolean | null;
        modifiedDate?: Date | null;
        tags?: string[] | null;
        toolbar?: MenuParams[];
        commandbar?: MenuParams[];
        customClass?: string;
        width?: number | null;
        height?: number | null;
        menuParams?: MenuParams[];
        links?: MenuParams[];
        editable?: boolean;
        content?: string;
        editableOnLoad?: boolean;
        showMenuBar?: boolean;
        initialValue?: string | null;
    }
    export class GArticle extends JQueryWidget<GArticleOptions> {
        static widgetName: string;
        private editor;
        private widgetActions;
        private header;
        private menu;
        private mdfield;
        private serviceContent;
        protected _create(): void;
        private createMenuParams;
        getMenuParams(): MenuParams[] | undefined;
        getValue(): any;
        private createArticleHeader;
        protected refresh(): void;
        private equalValues;
        hasChanged(): boolean;
        private updateText;
        private setEditable;
        private createToolbar;
        private createArticleInfoBar;
        private createCommandBar;
        protected _setOptions(opts: ObjectLiteral<any>): void;
        _destroy(): void;
        protected _getCreateOptions(): GArticleOptions;
    }
    interface GArticleEvent {
        /**
        * @param {JQueryEventObject} event Event
        */
        (event: JQueryEventObject, any: any): any;
    }
    interface GArticleEvents {
        save?: GArticleEvent;
        load?: GArticleEvent;
    }
    export {};
}
interface JQuery {
    garticle(options?: Gordic.Widget.GArticleOptions): JQuery;
    garticle(method: "refresh"): JQuery;
    garticle(method: "destroy"): JQuery;
    garticle(method: "getMenuParams"): MenuParams[];
    garticle(method: "getValue"): string;
    garticle(method: "hasChanged"): boolean;
    garticle(method: "updateText", text: string): void;
    garticle(method: "option"): Gordic.Widget.GArticleOptions;
    garticle(method: "option", values: Partial<Gordic.Widget.GArticleOptions>): JQuery;
    garticle<K extends Extract<keyof Gordic.Widget.GArticleOptions, string>>(method: "option", key: K): Gordic.Widget.GArticleOptions[K];
    garticle<K extends Extract<keyof Gordic.Widget.GArticleOptions, string>>(method: "option", key: K, value: Required<Gordic.Widget.GArticleOptions>[K]): JQuery;
}
declare namespace Gordic.Widget {
    interface IGTooltipPosition extends JQueryUI.JQueryPositionOptions {
        shift?: {
            left?: number;
            top?: number;
        };
    }
    type IGTooltipType = string | ((this: HTMLElement) => string);
    interface IGTooltipOptionsBase {
        caption?: string;
        tooltip?: IGTooltipType;
        state?: GState;
    }
    interface IGTooltipOptions extends IGTooltipOptionsBase, JQueryUI.WidgetOptions {
        /** (default () => true) Řídí zobrazení caption */
        showCaption?(this: HTMLElement): boolean;
        /** (default 100) Doba mezi událostí otevírající tooltip(mouseover, focusin) a jeho samotným otevřením (zobrazením). */
        delay?: number;
        customClass?: string;
        position?: IGTooltipPosition;
        /** Selector umožňující filtrovat na jakých HTMLElementech se má tooltip zobrazit. */
        items?: string;
        /** Funkce pro pripraveni contextu, ze ktereho se finalne vytvori content (vola se pred metodou content) */
        prepareContent?(this: HTMLElement, options: IGTooltipOptions, context: IGTooltipContext): IGTooltipContext;
        /** Funkce, která vytváří obsah tooltipu. Je volána při každém požadavku na jeho zobrazení. */
        content?(this: HTMLElement, options: IGTooltipOptions, context: IGTooltipContext): JQuery | string;
        /** Mód */
        mode?: "attribute" | "options";
        /** Název atributu elementu, ve kterém je tooltip */
        tooltipAttr?: string;
        /**
         * Callback funkce pro moznost modifikovat obsah tooltipu pred jeho renderovanim v metode content. Vola se po metode 'prepareContent'.
         * Navratova hodnota:
         *  - IGTooltipOptionsBase  - prepis puvodne vyhodnocenych hodnot
         *  - undefined             - pouzit defaultne vyhodnocene hodnoty
         *  - null                  - nezobrazovat tooltip
         *
         * @param {HTMLElement} this
         * @param {JQuery.Event} event
         * @param {IGTooltipOptionsBase} context
         * @param {IGTooltipOptions} options
         * @returns {IGTooltipOptionsBase | undefined | null}
         */
        beforeTooltip?(this: HTMLElement, event: JQueryEventObject, context: IGTooltipOptionsBase, options: IGTooltipOptions): IGTooltipOptionsBase | undefined | null;
    }
    interface IGTooltipContext {
        handled: boolean;
        originalEvent: JQueryEventObject;
        caption?: string;
        tooltip?: string;
        state?: GState;
        target?: JQuery;
    }
    class GTooltip extends JQueryWidget<IGTooltipOptions> {
        static widgetName: string;
        static bodyClass: string;
        static tooltipDivClass: string;
        static openEventName: string;
        static closeEventName: string;
        static instanceEventsNamespace: string;
        static tooltipAttribute: string;
        static tooltipContextPropertyNane: string;
        static _timer?: number;
        static defaultOptions: IGTooltipOptions;
        _create(): void;
        _destroy(): void;
        protected _getCreateOptions(): IGTooltipOptions;
        _conditionalOpen(ev: JQueryEventObject, context?: IGTooltipContext): void;
        open(ev: JQueryEventObject): void;
        close(): void;
        static open(ev: JQueryEventObject, context: IGTooltipContext): void;
        private static _open;
        static close(ev: JQueryEventObject, scope?: JQuery): void;
        private static _close;
    }
}
interface JQuery {
    gtooltip(options: Gordic.Widget.IGTooltipOptions): JQuery;
    gtooltip(method: "isEnabled"): boolean;
    gtooltip(method: "instance"): any;
    gtooltip<K extends Extract<keyof Gordic.Widget.IGTooltipOptions, string>>(method: "option", option: K, value: Required<Gordic.Widget.IGTooltipOptions>[K]): JQuery;
    gtooltip<K extends Extract<keyof Gordic.Widget.IGTooltipOptions, string>>(method: "option", option: K): Gordic.Widget.IGTooltipOptions[K];
    gtooltip(method: "option", values: Partial<Gordic.Widget.IGTooltipOptions>): Gordic.Widget.IGTooltipOptions;
    gtooltip(method: "option"): Gordic.Widget.IGTooltipOptions;
    gtooltip(method: "close"): JQuery;
    /** Vlozeni (setter) delegovaneho tooltipu do property 'gtooltip' */
    gtooltiputils(cmd: "setTooltip", options: Gordic.Widget.IGTooltipOptionsBase): JQuery;
    gtooltiputils(cmd: "getTooltip"): Gordic.Widget.IGTooltipOptionsBase;
    /** Vymaze hodnotu delegovaneho tooltipu */
    gtooltiputils(cmd: "reset"): JQuery;
    /** Otevre tooltip na elementu (pro delegovane tooltipy) */
    gtooltiputils(cmd: "open"): JQuery;
    /**
     * Schovani tooltipu
     *
     * @param {HTMLElement | JQuery} Neni-li definovan, zavre jakykoliv tooltip. Pokud je definovan, zavre pouze tooltip, jehoz target patri do daneho scope.
     */
    gtooltiputils(cmd: "close", scope?: HTMLElement | JQuery): JQuery;
}
declare namespace Gordic.Widget {
    export interface GButtonPanelOptions {
        normalAlignedToLeft?: boolean;
        params: MenuParams[];
        actions?: GAction[] | GActionList;
        /** Vklada ID z menuParams na polozky @default true */
        insertIds?: boolean;
        /** Typ polozek, ktere bude vytvaret @default "button" */
        mode?: "button" | "link";
        /** Nazev vlastni tridy, ktera je vlozena na element*/
        customClass?: string;
        /** Hodnota tabindexu nastavovana polozce ci polozkam, v zavislosti na nastaveni tabindexMode @default 0 */
        itemTabindex?: number;
        /** Polozky ci polozka, ktere bude nastaven tabindex (all = vsem, single = pouze jedna (ve vychozim je to primary nebo prvni enabled item) @default "all" */
        tabindexMode?: "all" | "single" | "none";
        /** css tridy vkladane na jednotlive casti tlacitka */
        buttonCssModifiers?: IGButtonPanelButtonCssModifiers;
        /** true v mode='link' kliknutim na link zustane link oznacen podtrzenim */
        checkable?: boolean;
        /** (pouze pro mode='link') - nastavi aktivni link, default = 0 */
        activeItem?: number;
        /** (pouze pro mode='link') - je-li true, automaticky na klik nastavi aktivni polozku tu, na kterou bylo kliknuto */
        autoActiveItem?: boolean;
        /** Defaultni hodnota visiblePriority pro polozky, ktere jsou zarazeny do normal */
        normalItemsVisiblePriorityDefault?: number;
        /** Defaultni hodnota visiblePriority pro polozky, ktere jsou zarazeny do opposite */
        oppositeItemsVisiblePriorityDefault?: number;
        /** Zrusit schovavani polozek pri nedostatku mista schovavat polozky do menu?
         * @default false
         * */
        disableItemHide?: boolean;
        /**
         * Mod zobrazovanych polozek v panelu (ne menu). Full (default) - ignoruje nastaveni captionVisible, captionVisible - pred schovanim polozky do menu schova caption.
         * @type {"full" | "captionVisible"}
         */
        itemMode?: "full" | "captionVisible";
        /** Zda je povoleno zobrazeni menu se skrytymi polozkami */
        allowMenuButton?: boolean;
        /** Vybrane parametry pro akci otevirajici menu */
        menuAction?: Pick<GActionParamsDefObjBase, "icon" | "caption" | "customClass">;
        /** Options menu k pretizeni (funguje pouze pokud je property 'disableItemHide' = true) */
        menuOptions?: Partial<IGMenuOptions>;
        /**
         * Moznost presouvat jednotlive polozky mysi
         * @default false
         */
        replacable?: boolean;
        /**
         * Selector pro polozky, ktere lze presouvat
         * @type {string}
         */
        replacableItems?: string;
        /**
         * Polozka byla presunuta (pouze pokud je options replacable=true). */
        itemReplaced?: (ev: JQueryEventObject, data: GButtonPanelItemReplacedEvData) => void;
        /** Pred posunem na jinou polozku z aktualni. */
        beforeMove?: (ev: Event, args: GButtonPanelItemFocusNextDirectionArgs) => void;
        /** Moznost upravy polozky po vytvoreni (Gui.WebControls Internal - nepouzivat mimo spolecne komponenty) */
        itemCreated?: (ev: JQueryEventObject, args: GButtonPanelItemCreatedArgs) => void;
    }
    export interface GSubtasksOptions extends GButtonPanelOptions {
        /** Aktivni polozka @default 0 */
        activeItem?: number;
    }
    export interface IGButtonPanelButtonCssModifiers {
        button?: string;
        wrapper?: string;
        text?: string;
        icon?: string;
    }
    export interface GButtonPanelItemReplacedEvData {
        /** Polozka, ktera byla presunuta */
        item: MenuParams;
        /** Jaky ma polozka, ktera byla presunuta, aktualni align. */
        itemAligned: MenuParamAlignType;
        /** Udalost, ktera to vyvolala */
        event: JQueryEventObject;
    }
    export type GButtonPanelItemFocusNextDirection = "left" | "right" | "first" | "last";
    interface GButtonPanelItemFocusNextDirectionArgs {
        /** Smer pohybu */
        direction: GButtonPanelItemFocusNextDirection;
        /** Melo by dojit k posunu na druhou stranu (skok z posledniho na prvni a naopak) */
        isBoundaryHit: boolean;
    }
    interface GButtonPanelItemCreatedArgs {
        item: JQuery;
        params: MenuParams;
    }
    export class GButtonPanel extends JQueryWidget<GButtonPanelOptions> {
        static widgetName: string;
        private static altSlavePropName;
        private static altMasterPropName;
        private static widthsPropName;
        private static hiddenItemClasses;
        /** Trida, kterou se rika, ze polozka ma byt zobrazena pouze v menu => nikdy se nezobrazi v hlavnim panelu */
        private static cmdClassMenuOnlyItem;
        private static _logger;
        protected _activablePrimaryItemPattern: string;
        /** Polozku lze oznacit stylem jako aktivni, nehlede na to jestli je nebo neni viditelna. Musi byt spustitelna. */
        protected _activableItemsPattern: string;
        /** Na polozku lze nastavit focus - musi byt viditelna. Musi byt spustitelna. */
        protected _focusableItemsPattern: string;
        protected _clickableItemsPattern: string;
        protected _activeItemClassName: string;
        protected _getCreateOptions(): GButtonPanelOptions;
        protected _menuButton: JQuery;
        protected _menuButtonWidth: number;
        protected _menu: JQuery | null;
        protected _items: JQuery;
        protected _sortedItemOriginalDomIndex?: number;
        _create(): void;
        _destroy(): void;
        _setOptions(options: any): void;
        _setOption(key: any, value: any): void;
        protected _createItems(params: MenuParams[], defaultVisiblePriority: number): JQuery[];
        protected _createItem(params: MenuParams): JQuery;
        protected _createActionItem(params: MenuParams): JQuery;
        private static buttonTemplate;
        protected _createButton(params: MenuParams): JQuery;
        protected _createLink(params: MenuParams): JQuery;
        protected _createStatic(params: MenuParams): JQuery;
        protected _createSeparator(params: MenuParams): JQuery;
        protected _createWg(params: MenuParams): JQuery;
        protected _createHtml(params: MenuParams): JQuery;
        protected _insertId(target: JQuery, params: MenuParams): JQuery;
        protected _createMenuButtonParams(): MenuParams;
        protected _createLinkOptions(params: MenuParams): GLinkOptions;
        private _initResizeManager;
        private _uninitResizeManager;
        private _getItemWidth;
        /** Vypocita vsechny sirky elementu (collapsed/expanded) */
        private _computeItemWidths;
        /** Zajisti, aby kazda polozka v jquery kolekci mela pred-vypocitane sirky ve svych stavech (collapsed/expanded) */
        private _ensureItemsWidths;
        /** Ziska vypoctene sirky pro za-cachovani pro vypocty viditelnosti */
        private _getItemWidths;
        /** Nastavi vypoctene sirky pro za-cachovani pro vypocty viditelnosti */
        private _setItemWidths;
        private _updateItemVisibility;
        private _updateCaptionVisibility;
        private _updateVisibility;
        private _getMenuParams;
        /** Vrati level viditelnosti (0 = never, 4 = always)*/
        private _getVisibilityLevel;
        /** Mohou byt tlacitka na dane urovni expandovatelna? */
        private _canUpdateCaptionVisibility;
        /**
         * Pokusi se prepnout mezi viditelnosti hlavniho parametru (master) a viditelnosti altu. Rozhoduje, jestli se dany ovl. prvek vejde do hranicni sirky
         * kterou je actualRectWidth.
         *
         * @param {JQuery} master - masterParametr
         * @param {JQuery} alt - masterParametr.alt
         * @param {number} itemsWidth - aktualni sirka vsech doposud zobrazenych polozek
         * @param {number} altCollapsedWidth - alt v collapsed stavu (v nejmensi mozne sirce)
         * @param {number} maxWidth - maximalni sirka, do ktere se vse musi vejit
         * @returns {number} prepocitana sirka zobr. polozek
         */
        private _tryToggleMasterAltVisibility;
        private _showMenu;
        private _destroyMenu;
        private _detachWidgets;
        /** Pravidla, ktera rikaji, ze ma smysl resetovat predpocitanou sirku itemu (tlacitka) */
        private _hasItemVisibilityChanged;
        _initShortcuts(): void;
        _uninitShortcuts(): void;
        _canBeShortcutExecuted(ev: JQueryKeyEventObject): boolean;
        _getFirstFocusable(): JQuery;
        _getNextFocusable(direction: "left" | "right", current: JQuery): JQuery;
        _isHandledMoveOut(direction: GButtonPanelItemFocusNextDirection): boolean;
        get _isActiveCurrentElement(): boolean;
        _getCurrentActive(): JQuery;
        _focusNext(ev: Event, nextActive: JQuery, direction: GButtonPanelItemFocusNextDirection): void;
        protected _focusItem(elm: JQuery): void;
        protected _focusMenuButton(): void;
        protected _setTabindex(elm: JQuery, tabindex?: number): void;
        protected _arrowFocus(ev: Event, direction: GButtonPanelItemFocusNextDirection): void;
        /** Nalezeni viditelne polozky podle prvniho pismena z caption */
        protected _keyFocus(ev: JQueryKeyEventObject): void;
        _initFocus(): void;
        _uninitFocus(): void;
        _resetTabindex(): void;
        protected get _log(): Gordic.Diagnostics.GLog | null;
        /** Vrati vsechny items bez tlacitka menu */
        private _getItems;
        /** Vsechny aktualne aktivovatelne polozky (enabled, atd., nemusi byt viditelne (mohou byt schovane v menu)) */
        private _findActivableItemsAll;
        /** Vrati vsechny polozky, na ktere lze nastavit focus (enabled, visible, atd.) */
        private _findFocusableItemsAll;
        /** Vyhleda polozku, kterou lze aktivovat (viditelna, napr. pro focus/check, atd.) */
        private _findActivableItem;
        private _makeReplacable;
        private _beforeSort;
        /** Upravi pozici v options podle presunu v DOM */
        private _updateParamsOrder;
        refresh(): JQuery;
        computeWidth(): number;
        /**
         * Nastavi aktivni polozku (nastavi styl checked)
         *
         * @param {number|string|JQuery|HTMLElement} id Polozka
         * @param {boolean} [invoke] Automaticky spusti akci prirazene polozky
         * @returns {JQuery}
         */
        setActive(id?: number | string | JQuery | HTMLElement | MenuParams, invoke?: boolean): JQuery;
        focus(item?: "normal" | "opposite"): JQuery;
        resetTabindex(): JQuery;
        /**
         * Upravi viditelnost polozek
         *
         * @param {boolean} [recomputeWidths] - prepocita sirky vsech polozek
         * @returns {JQuery}
         */
        updateVisibility(recomputeWidths?: boolean): JQuery;
    }
    export class GSubtasks extends GButtonPanel {
        static widgetName: string;
        protected _getCreateOptions(): GButtonPanelOptions;
        _create(): void;
        _destroy(): void;
        protected _createLinkOptions(params: MenuParams): GLinkOptions;
        protected _createLink(params: MenuParams): JQuery;
    }
    export {};
}
interface JQuery {
    gbuttonpanel(options?: Gordic.Widget.GButtonPanelOptions): JQuery;
    gbuttonpanel(method: "destroy"): JQuery;
    /**
     *  Upravi viditelnost jednotlivych polozek (skryje/zobrazi, expand/collapse, apod.)
     * @param {boolean} [recomputeWidths] - prepocita sirky vsem polozkam (default = false)
     */
    gbuttonpanel(method: "updateVisibility", recomputeWidths?: boolean): JQuery;
    /**
    * Nastavi aktivni polozku
    * @param {id} string ID polozky (ID na menuParam nebo id akce)
    * */
    gbuttonpanel(method: "setActive", id: string, invoke?: boolean): JQuery;
    /**
    * Nastavi aktivni polozku
    * @param {id} number Poradi polozky v subtasku zleva
    * */
    gbuttonpanel(method: "setActive", id: number, invoke?: boolean): JQuery;
    gbuttonpanel(method: "resetTabindex"): JQuery;
    gbuttonpanel(method: "focus", item?: "normal" | "opposite"): JQuery;
    gbuttonpanel(method: "refresh"): JQuery;
    gbuttonpanel<K extends Extract<keyof Gordic.Widget.GButtonPanelOptions, string>>(method: "option", key: K): Gordic.Widget.GButtonPanelOptions[K];
    gbuttonpanel<K extends Extract<keyof Gordic.Widget.GButtonPanelOptions, string>>(method: "option", key: K, value: Required<Gordic.Widget.GButtonPanelOptions>[K]): JQuery;
    gsubtasks(options: Gordic.Widget.GSubtasksOptions): JQuery;
    /**
    * Nastavi aktivni polozku
    * @param {id} string ID polozky (ID na menuParam nebo id akce)
    * */
    gsubtasks(method: "setActive", id: string, invoke?: boolean): JQuery;
    /**
    * Nastavi aktivni polozku
    * @param {id} number Poradi polozky v subtasku zleva
    * */
    gsubtasks(method: "setActive", id: number, invoke?: boolean): JQuery;
    /**
    * Nastavi aktivni polozku
    * @param {id} JQuery JQuery nebo HTMLElement polozky
    * */
    gsubtasks(method: "setActive", id: JQuery | HTMLElement, invoke?: boolean): JQuery;
    gsubtasks(method: "destroy"): JQuery;
    gsubtasks(method: "option"): Gordic.Widget.GSubtasksOptions;
    gsubtasks(method: "option", values: Partial<Gordic.Widget.GSubtasksOptions>): JQuery;
    gsubtasks<K extends Extract<keyof Gordic.Widget.GSubtasksOptions, string>>(method: "option", key: K): Gordic.Widget.GSubtasksOptions[K];
    gsubtasks<K extends Extract<keyof Gordic.Widget.GSubtasksOptions, string>>(method: "option", key: K, value: Required<Gordic.Widget.GSubtasksOptions>[K]): JQuery;
}
type GButtonPanelOptions = Gordic.Widget.GButtonPanelOptions;
type GSubtasksOptions = Gordic.Widget.GSubtasksOptions;
declare namespace Gordic.Widget {
    interface GToolbarOptions extends WidgetOptions {
        params?: MenuParams[];
        actions?: GAction[] | GActionList;
        within?: Object;
        userSettings?: Gordic.Data.IGStorage;
        favsCssModifiers?: {
            button?: string;
            wrapper?: string;
            text?: string;
            icon?: string;
        };
    }
    class GToolbar extends JQueryWidget<GToolbarOptions> {
        static widgetName: string;
        private static _logger;
        private _wrapper;
        private _favorites;
        private _menuBtn;
        private _menu;
        private _menuRebuildRequired;
        private _monitorUpdates;
        private _favsProfileDefaults?;
        private _favsProfiled;
        /** ProfileBuilder pro oblibene polozky */
        private _favsPB?;
        private _menuProfiled;
        _create(): void;
        _destroy(): void;
        _setOptions(options: Partial<GToolbarOptions>): void;
        _setOption(key: string, value: any): void;
        /** Rozliseni, zda jde o GWA05 nebo GWA01 (hybrid) */
        _isWebApp(): boolean;
        private _openMenu;
        private _openMenuWebApp;
        private _openMenuHybrid;
        private _createMenu;
        private _createMenuHybrid;
        private _initShortcuts;
        private _initShortcutsWebApp;
        private _initShortcutsHybrid;
        private _menuMove;
        private _focusFavoriteItem;
        private _getFavsProfiled;
        private _isFavoritesCustomizationEnabled;
        private _isMenuCustomizationEnabled;
        private _loadMenuProfile;
        /**
         * Ulozeni profilu
         *
         * @param {Gordic.Utils.Menu.IGMenuProfile | null} [profile] Pokud je profile = null, pak se z nastaveni vymaze
         */
        private _saveMenuProfile;
        private _applyMenuProfile;
        private _loadFavsProfile;
        private _applyFavsProfile;
        private _loadFavsSettingsHybrid;
        private _saveFavsProfile;
        private _filterFavorites;
        /**
         * Vytvori oblibene
         *
         * @param {MenuParams[]} linearizedFavOnlyParams Params musi byt linearizovane!
         */
        private _createFavorites;
        /** Upravi stav pinu v originale podle profilu */
        private _updatePinState;
        private _editMenuProfile;
        private _editFavsProfile;
        private _showFavsSettingsTest;
        private _showMenuSettingsTest;
        refresh(): JQuery;
        /** Upravi viditelnost jednotlivych polozek v oblibenych */
        updateFavorites(): JQuery;
        focusMenuButton(): JQuery;
        protected get _log(): Gordic.Diagnostics.GLog | null;
    }
}
interface JQuery {
    gtoolbar(options: Gordic.Widget.GToolbarOptions): JQuery;
    gtoolbar(method: "refresh"): JQuery;
    gtoolbar(method: "focusMenuButton"): JQuery;
    gtoolbar(method: "destroy"): JQuery;
    gtoolbar<K extends Extract<keyof Gordic.Widget.GToolbarOptions, string>>(method: "option", key: K): Gordic.Widget.GToolbarOptions[K];
    gtoolbar<K extends Extract<keyof Gordic.Widget.GToolbarOptions, string>>(method: "option", key: K, value: Required<Gordic.Widget.GToolbarOptions>[K]): JQuery;
}
declare namespace Gordic.Widget {
    interface GModalOptions {
        header?: string;
        content: JQuery<HTMLElement>;
    }
    class GModal extends JQueryWidget<GModalOptions> {
        static widgetName: string;
        private _content;
        private _elementBgc;
        _create(): void;
        _destroy(): void;
        _closeButtonAct(): void;
        _initWidthResizeManager(): void;
        _initHeightRezizeManager(): void;
    }
}
interface JQuery {
    gmodal(options?: Gordic.Widget.GModalOptions): JQuery;
}
interface IGOLMapsOptions<T = IGOLMapsItemOptions> {
    data?: Gordic.Data.View<T> | T[] | any;
    geoJson?: object | null;
    width?: number;
    height?: number;
    markerSize?: number;
    displayCoordinates?: boolean;
    zoom?: number | null;
    editable?: boolean;
    displayClusters?: boolean;
}
interface IGOLMapsItemOptions {
    id?: string;
    lng?: number;
    lat?: number;
    markerSize?: number;
    customClass?: string;
    tooltip?: string;
    description?: string;
    icon?: string;
}
declare namespace Gordic.Widget {
    class GOLMaps<T extends IGOLMapsOptions<IGOLMapsItemOptions> = IGOLMapsOptions> extends JQueryWidget<T, IGOLMapsOptions<IGOLMapsItemOptions>> {
        static widgetName: string;
        data: Gordic.Data.View;
        private earthquakeFill;
        private earthquakeStroke;
        private textFill;
        private textStroke;
        private invisibleFill;
        private _setData;
        private initializeProperties;
        protected _create(): void;
        getAddressFromCoordinates(lng: number, lat: number): Promise<any>;
        private createEarthquakeStyle;
        refresh(): void;
        private createClusters;
        private createVectors;
        private createGEOJsonLayer;
        private createOverlay;
        private removeAllOverlays;
        private createInfoPopup;
        private _update;
        _destroy(): void;
        protected _setOptions(opts: ObjectLiteral<any>): void;
        protected _getCreateOptions(): {
            data: null;
            geoJson: null;
            width: number;
            height: number;
            markerSize: number;
            displayCoordinates: boolean;
            zoom: null;
            editable: boolean;
            displayClusters: boolean;
        };
    }
}
interface JQuery {
    golmaps<T = any>(...options: (IGOLMapsOptions<T>)[]): JQuery;
    golmaps(method: "refresh"): JQuery;
    golmaps(method: "destroy"): JQuery;
    golmaps<T = any>(method: "option"): IGOLMapsOptions<T>;
    golmaps<T = any>(method: "option", values: Partial<IGOLMapsOptions<T>>): JQuery;
    golmaps<K extends Extract<keyof IGOLMapsOptions, string>, T = any>(method: "option", key: K): IGOLMapsOptions<T>[K];
    golmaps<K extends Extract<keyof IGOLMapsOptions, string>, T = any>(method: "option", key: K, value: Required<IGOLMapsOptions<T>>[K]): JQuery;
}
declare namespace Gordic.Data.Exports.PrintableHtml {
    /**
     * Interface pro získání html
     */
    interface IGHtmlGetter {
        getHtml(): string;
    }
    /**
     * Formát papíru
     */
    interface IGPaperFormat {
        name: string;
        length: number;
        width: number;
    }
    /**
     * Třída obsahuje konstanty běžně používaných formátů papíru
     */
    abstract class GCommonPaperSizes {
        static readonly A4: IGPaperFormat;
        static readonly A3: IGPaperFormat;
        static readonly A2: IGPaperFormat;
        static readonly A1: IGPaperFormat;
        static readonly A0: IGPaperFormat;
        static readonly A0x2: IGPaperFormat;
        static readonly A0x4: IGPaperFormat;
    }
    /**
     * Defaultní podporované formáty papírů, využito v export dialogu pro selectbox
     * A0, A1, A2, A3, A4
     * standardizované dormáty papíru jsou k nalezení v GCommonPaperSizes
     */
    const DEFAULT_PAPERS: () => IGPaperFormat[];
    /**
     * Statická třída s utils funkcemi
     */
    abstract class GHtmlPaperUtils {
        static readonly INCH = 25.4;
        static readonly PPI = 96;
        /**
         * Stadardní převod jednotek px->mm
         * @param pixels
         * @param ppi defaultní hodnota PPI=96
         * @returns převod na mm
         */
        static ConvertPixelsToMilimeters(pixels: number, ppi?: number): number;
        /**
         * Z kolekce papírů vrátí ten, jehož šířka je dostačující pro vykreslení obsahu
         *  (tzn. aby se obsah vešel na papír.)
         * @param overallPxWidth celková šířka obsahu [px]
         * @param paperFormats kolekce papírů, ze kterých se má vybírat
         * @returns papír, na který se šířkou vejde deklarovaný obsah
         */
        static GetRecommendedPaperFormat(overallPxWidth: number, paperFormats?: IGPaperFormat[]): IGPaperFormat;
    }
    /**
     * Třída zodpovědná za generování tisknutelného html (export grid tabulek)
     */
    abstract class GPrintableHtmlAbstract implements IGHtmlGetter {
        /** Default název gridu - 'Operativní tisk'*/
        static readonly DEFAULT_GRID_TITLE = "jres:35000032";
        protected inputData: IGHtmlDataExportInput;
        protected paperFormat: IGPaperFormat;
        protected isLandscape: boolean;
        protected isColsPercentage: boolean;
        /**
         * Konstruktor
         * @param inputData
         * @param paperFormat formát papíru
         * @param isLandscape indikuje, zdali se má tisknout na šířku
         * @param colsWidthByPercentage false = šířka sloupce se bere podle šírky z původního gridu, true = přepočítávané na procenta
         */
        constructor(inputData: IGHtmlDataExportInput, paperFormat: IGPaperFormat, isLandscape: boolean, colsWidthByPercentage?: boolean);
        abstract getHtml(): string;
        protected isA4orA3(): boolean;
        protected getPaperFormatStr(inMilimeters?: boolean): string;
        protected getColNamesHtml(): string;
        protected generateColumnWidthPxStyles(): string;
        protected generateColumnWidthPercentageStyles(): string;
        protected generateTBodyDataHTML(): string;
        protected generateLangAttr(): string;
        private isEmptyGroupRow;
    }
    class GPrintableHtmlViaTemplate extends GPrintableHtmlAbstract {
        private htmlTemplate;
        private gridTitle?;
        private fileName?;
        private keyValues?;
        readonly PAGESIZE_CSS_REGEXP: RegExp;
        readonly COLUMNS_CSS_REGEXP: RegExp;
        readonly GRID_TITILE_HTML_REGEXP: RegExp;
        readonly FILENAME_HTML_REGEXP: RegExp;
        readonly KEY_VALUE_HTML_REGEXP: RegExp;
        readonly COL_NAMES_HTML_REGEXP: RegExp;
        readonly TBODY_DATA_HTML_REGEXP: RegExp;
        readonly DATETIME_HTML_REGEXP: RegExp;
        readonly COLSPAN_ATTR_REGEXP: RegExp;
        readonly LANG_ATTR_REGEXP: RegExp;
        readonly COMMENT_REGEXP: RegExp;
        private columnsStylesGenFunc;
        constructor(inputData: IGHtmlDataExportInput, paperFormat: IGPaperFormat, isLandscape: boolean, htmlTemplate: string, gridTitle?: string | undefined, fileName?: string | undefined, keyValues?: IGHtmlKeyValue[] | undefined, colsWidthByPercentage?: boolean);
        getHtml(): string;
        private generateKeyValues;
        private fillPaperFormatCss;
        private fillColumnsStylesCss;
        private fillColNameHtml;
        private fillBodyData;
        private fillColspan;
        private fillKeyValues;
        private fillGridTitle;
        private fillFileName;
        private fillDateTime;
        private fillLang;
        private removeAnyComments;
    }
    /**
     * Customizovatelné styly pro záhlaví a zápatí dokumentu
     *
     * příklady psány u properties
     */
    interface IGPrintableHtmlStyle {
        /** Styly pro hlavičku dokumentu, příklad: 'text-align: center; align-items: center;' */
        head?: string;
        /** Styly pro záhlaví dokumentu, příklad: 'text-align: center; align-items: center;' */
        footer?: string;
        /** Blok svých vlastních stylů: příklad: 'div.toLeft{ text-align: left; }' */
        customBlock?: string;
    }
    /**
     * Vlastní doplnění obsahu záhlaví a zápatí dokumentu
     */
    interface IGPrintableHtmlTableContent {
        /** HTML obsahu záhlaví dokumentu*/
        header?: string;
        /** HTML obsahu zápatí dokumentu*/
        footer?: string;
    }
    /**
     * @deprecated Starý generátor tisknutelného HTML exporteru. Generátor nahrazen GPrintableHtmlViaTemplate
     */
    class GPrintableHtmlGenerator extends GPrintableHtmlAbstract {
        private readonly DEFAULT_DOC_HEADER_STYLE;
        private readonly DEFAULT_DOC_FOOTER_STYLE;
        private readonly DEFAULT_DOC_CUSTOM_STYLE;
        private readonly DEFAULT_DOC_HEADER_CONTENT;
        private readonly DEFAULT_DOC_FOOTER_CONTENT;
        private htmlTableConent;
        private customStyles;
        constructor(inputData: IGHtmlDataExportInput, paperFormat: IGPaperFormat, isLandscape: boolean, colsWidthByPercentage?: boolean, tableContent?: IGPrintableHtmlTableContent, customStyle?: IGPrintableHtmlStyle);
        getHtml(): string;
        private createStyles;
        private createTableHTML;
    }
}
declare namespace Gordic.Data.Exports {
    /**
     * Interface pro strategii exportu dat
     *
     * @author Vlastimil Máca
     * @since 52510.25
     */
    export interface IGDataExportStrategy<TOpts extends IGExportDialogSettings = any, TDataExportInput extends IGDataExportInput = any> {
        /**
         * Ulož optiony do uživatelského nastavení.
         * Možnost reagovat na původní hodnoty od autora v místě použití
         *
         * @param {TOpts} opts
         * @param {IGStorage} userSettings
         * @param {TOpts} [defaultSettings]
         */
        saveOptions?(opts: TOpts, userSettings: IGStorage, defaultSettings?: TOpts): void;
        /**
         * Aplikovat nastavení do strategie
         * @param opts
         * @param defaultSettings
         */
        setOptions?(opts: TOpts, defaultSettings?: TOpts): void;
        /**
         * Identifikátor strategie
         * @type {IGExportOutputType}
         */
        id: IGExportOutputType;
        /**
         * Podporované typy výstupu
         * @type {(string | IGExportOutputType)[]}
         */
        outputTypes?: (string | IGExportOutputType)[];
        /**
         * Vrať sekci formuláře pro nastavení této strategie exportu
         *
         * @param {GContent} relatedContent související content
         * @param {GGridTrueColumn<TRow>[]} columns sloupce k exportu
         * @param {TOpts} [defaultSettings] výchozí nastavení určené autorem v místě použití
         * @returns {Gordic.Forms.FormSection | JQuery.Promise<Gordic.Forms.FormSection>}
         */
        getSettingsForm?<TRow = any>(relatedContent: GContent, columns: GGridTrueColumn<TRow>[], defaultSettings?: TOpts): Gordic.Forms.FormSection | JQuery.Promise<Gordic.Forms.FormSection>;
        /**
         * Připrav data pro export podle nastavení
         * @param opts
         */
        prepareExportInput?<TRow = any>(opts: IGPrepareExportOptions<TRow>): TDataExportInput;
        /**
         * Proveď export dat
         *
         * @param {TDataExportInput} input
         * @param {IGDataExpoterOpts} exportOptions
         * @returns {JQuery.Promise<IGDataExportOutput<string>>}
         */
        exportData(input: TDataExportInput, exportOptions: IGDataExpoterOpts): JQuery.Promise<IGDataExportOutput<string>>;
        /**
         * Proveď export dat do blobu
         *
         * @param {TDataExportInput} input
         * @param {IGDataExpoterOpts} exportOptions
         * @returns {JQuery.Promise<IGDataExportOutput<Blob>>}
         */
        exportDataAsBlob(input: TDataExportInput, exportOptions: IGDataExpoterOpts): JQuery.Promise<IGDataExportOutput<Blob>>;
    }
    /**
     * Varianta typu výstupu
     *
     * @author Vlastimil Máca
     * @since 52510.25
     */
    export interface IGExportOutputType {
        value: string;
        caption: string;
        icon: string;
        tooltip?: string;
    }
    /**
     * Vstupní data exportu
     *
     * @author Vlastimil Máca
     * @since 52510.25
     */
    export interface IGDataExportInput {
        data: (string | number | boolean | Date | undefined)[][];
        columns: IGColumnOptions[];
        progress?: (percentage: number, kind?: 'info' | 'success' | 'error', message?: string) => void;
        cancelationToken?: Utils.GCancellationToken;
    }
    /**
     * Popis sloupce v exportovaných datech
     *
     * @author Vlastimil Máca
     * @since 52510.25
     */
    export interface IGColumnOptions {
        name: string;
        caption: string;
        width?: number;
        type: 'string' | 'number' | 'decimal' | 'date' | 'datetime' | 'boolean';
        format?: string;
        numberFormat?: string;
        hidden?: boolean;
    }
    /**
     * Výstup exportu
     *
     * @author Vlastimil Máca
     * @since 52510.25
     */
    export interface IGDataExportOutput<TOut extends string | Blob> {
        data: TOut;
        extension: string;
        mimeType?: string;
    }
    /**
     * Souřadnice buňky
     *
     * @author Vlastimil Máca
     * @since 52510.25
     */
    export interface IGCellCoord {
        /** index of column */
        column?: number;
        /** index of row */
        row?: number;
    }
    /**
     * Rozsah buněk
     *
     * @author Vlastimil Máca
     * @since 52510.25
     */
    export interface IGCellRange {
        start?: IGCellCoord;
        end?: IGCellCoord;
    }
    /**
     * Nastavení exporteru
     *
     * @author Vlastimil Máca
     * @since 52510.25
     */
    export interface IGDataExpoterOpts {
        sourceElement?: JQuery;
        warningLimit?: number;
        stopLimit?: number;
        onWarningLimit?: () => JQueryPromise<any>;
        onStopLimit?: () => JQueryPromise<any>;
        outputType?: string;
    }
    /**
     * Třída pro export dat, podle předané strategie exportuje data do různých formátů.
     *
     * @author Vlastimil Máca
     * @since 52510.25
     */
    export class GDataExporter {
        private strategy;
        protected opts?: IGDataExpoterOpts | undefined;
        constructor(strategy: IGDataExportStrategy, opts?: IGDataExpoterOpts | undefined);
        setStrategy(strategy: IGDataExportStrategy): void;
        exportData(input: IGDataExportInput): JQuery.Promise<IGDataExportOutput<string>>;
        customOutputExport(input: IGDataExportInput): JQuery.Promise<IGDataExportOutput<string>, any, any>;
        /**
         * Export data and download it as file
         * @param input
         * @param fileName
         */
        downloadFile(input: IGDataExportInput, fileName: string): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        /**
         * Export string and put it into clipboard
         * @param input
         */
        copyToClipboard(input: IGDataExportInput): JQuery.PromiseBase<undefined, any, any, undefined, any, any, undefined, any, any, undefined, any, any>;
        private prepareOpts;
        private prepareInput;
        private finishProgress;
    }
    interface IGXlsxInput {
        includeHeaderRow?: boolean;
        dataInput: IGDataExportInput;
        rowOffset?: number;
        sourceRowStart?: number;
        sourceRowEnd?: number;
        autofilter?: boolean;
    }
    interface IGChunkedExporterOptions extends IGExportDialogSettings {
        includeHeaderRow?: boolean;
        /** limit, where exporter displays question */
        largeDataLimit?: number;
        /** */
        onLargeData?: () => JQueryPromise<any>;
    }
    interface IGXlsxOptions extends IGChunkedExporterOptions {
        autofilter?: boolean;
    }
    interface IGPrepareExportOptions<TRow extends any = any> {
        columns: GGridTrueColumn<TRow>[];
        data: MetaRow<TRow>[];
        currentGroupingsColumns?: GGridTrueColumn<TRow>[];
        groupingHeaderColumns?: ObjectLiteral<GGridGroupingHeaderColumn<TRow>>;
    }
    export function prepareExportInput<TRow extends any = any>(opts: IGPrepareExportOptions<TRow> | GGridTrueColumn<TRow>[], inputData?: MetaRow<TRow>[]): IGDataExportInput;
    /**
     * Základní exporter pro formáty využívající xlsx.mini.js
     *
     * @author Vlastimil Máca
     * @since 52510.25
     */
    class GBaseDataExporter {
        protected defaultSheetName: string;
        protected createXlsxWorkBook(input: IGXlsxInput, sheetName?: string): JQuery.Promise<XLSX.WorkBook>;
        protected buildSheet(sheetInput: IGXlsxInput): XLSX.WorkSheet;
        protected createA1ColumnMap(cols: IGColumnOptions[]): string[];
        protected _textWidthOpts: Utils.IGetTextWidthOptions;
        protected getTextWidth(text: string): number;
        protected createXlsxCell(value: string | number | boolean | Date | undefined, columnInfo: IGColumnOptions): XLSX.CellObject;
        protected requireXLSX(): JQuery.Promise<any, any, any>;
    }
    /**
     * Abstract class which handles generating data output in chunks, reporting progress and checking warning/stop limits
     *
     * @author Vlastimil Máca
     * @since 482.1.0.707
     */
    abstract class GChunkedClientDataExporter<TOpts extends IGChunkedExporterOptions> extends GBaseDataExporter {
        protected defaultOpts?: TOpts | undefined;
        protected partSize: number;
        sourceElement?: JQuery;
        protected fileMimeType: string;
        protected alwaysIncludeHeader: boolean;
        protected opts?: TOpts;
        constructor(defaultOpts?: TOpts | undefined);
        setOptions(opts: TOpts, defaultSettings?: TOpts): void;
        saveOptions(opts: TOpts, userSettings?: IGStorage, defaultSettings?: TOpts): void;
        exportData(input: IGDataExportInput, exportOptions: IGDataExpoterOpts): JQuery.Promise<IGDataExportOutput<string>, any, any>;
        exportDataAsBlob(input: IGDataExportInput, exportOptions: IGDataExpoterOpts): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        protected notifyCancell(input: IGDataExportInput): JQuery.Promise<any, any, any>;
        protected notifyError(input: any, ex: any): void;
        protected buildChunked(input: IGDataExportInput, exportOptions: IGDataExpoterOpts): JQuery.Promise<IGDataExportOutput<string>, any, any>;
        protected abstract processFirstChunk(xlsxInput: IGXlsxInput, workbook: XLSX.WorkBook, opts: XLSX.WritingOptions): string;
        protected abstract processChunk(xlsxInput: IGXlsxInput, workbook: XLSX.WorkBook, opts: XLSX.WritingOptions): string;
        protected abstract finalizeChunks(xlsxInput: IGXlsxInput, firstChunk: string, chunkResultObj: {
            array?: string[];
            length: number;
            ssf?: any;
            cellXfs?: any;
        }, opts: XLSX.WritingOptions): JQuery.Promise<IGDataExportOutput<string>> | IGDataExportOutput<string>;
        protected prepareXlsxInput(input: IGDataExportInput): IGXlsxInput;
    }
    /**
     * GXlsxStrategy - strategy for dataExporter for exporting into xlsx format
     *
     * @author Vlastimil Máca
     * @since 482.1.0.707
     */
    export class GXlsxStrategy extends GChunkedClientDataExporter<IGXlsxOptions> implements IGDataExportStrategy<IGXlsxOptions> {
        id: {
            value: string;
            caption: string;
            icon: string;
        };
        outputTypes: string[];
        getSettingsForm(): Forms.FormSection;
        static crcTable: null | any[];
        constructor(defaultOpts?: IGXlsxOptions);
        setOptions(opts: any, defaultSettings: any): void;
        saveOptions(opts: IGXlsxOptions, userSettings?: IGStorage): void;
        protected prepareXlsxInput(input: IGDataExportInput): IGXlsxInput;
        protected processFirstChunk(xlsxInput: IGXlsxInput, workBook: XLSX.WorkBook, opts: XLSX.WritingOptions): any;
        protected processChunk(xlsxInput: IGXlsxInput, workBook: XLSX.WorkBook, opts: XLSX.WritingOptions): any;
        protected finalizeChunks(xlsxInput: IGXlsxInput, firstChunk: string, chunkResultObj: {
            array?: (string | undefined)[] | undefined;
            length: number;
            ssf?: any;
            cellXfs?: any;
        }, opts: XLSX.WritingOptions): JQuery.PromiseBase<IGDataExportOutput<string>, never, never, never, never, never, never, never, never, never, never, never>;
        private fixFileHeaders;
        private numToStringBytes;
        private escapeRegExp;
        private makeCRCTable;
        private crc32;
    }
    export interface IGCsvExportOptions extends IGChunkedExporterOptions {
        delimiter: ',' | ';' | '\t' | ' ';
    }
    /**
     * GCsvStrategy - strategy for GDataExporter for exporting csv output
     *
     * @author Vlastimil Máca
     * @since 482.1.0.707
     */
    export class GCsvStrategy extends GChunkedClientDataExporter<IGCsvExportOptions> implements IGDataExportStrategy<IGCsvExportOptions> {
        id: {
            value: string;
            caption: string;
            icon: string;
        };
        outputTypes: string[];
        constructor(defaultOpts?: IGCsvExportOptions);
        exportDataAsBlob(input: IGDataExportInput, exportOpts: IGDataExpoterOpts): JQuery.Promise<IGDataExportOutput<Blob>, any, any>;
        protected processFirstChunk(xlsxInput: IGXlsxInput, workbook: XLSX.WorkBook): string;
        protected processChunk(xlsxInput: IGXlsxInput, workbook: XLSX.WorkBook): string;
        protected finalizeChunks(xlsxInput: IGXlsxInput, firstChunk: string, chunkResultObj: {
            array?: (string | undefined)[];
            length: number;
        }): IGDataExportOutput<string>;
    }
    /**
     * GTextStrategy - strategy for GDataExporter for exporting text table output
     *
     * @author Vlastimil Máca
     * @since 482.1.0.707
     */
    export class GTxtStrategy extends GChunkedClientDataExporter<{}> implements IGDataExportStrategy {
        id: {
            value: string;
            caption: string;
            icon: string;
        };
        outputTypes: string[];
        constructor();
        exportDataAsBlob(input: IGDataExportInput, exportOpts: IGDataExpoterOpts): JQuery.Promise<IGDataExportOutput<Blob>, any, any>;
        protected processFirstChunk(xlsxInput: IGXlsxInput, workbook: XLSX.WorkBook): string;
        protected processChunk(xlsxInput: IGXlsxInput, workbook: XLSX.WorkBook): string;
        protected finalizeChunks(xlsxInput: IGXlsxInput, firstChunk: string, chunkResultObj: {
            array?: (string | undefined)[];
            length: number;
        }): IGDataExportOutput<string>;
    }
    /**Hodnoty tisku v exportovacím dialogu*/
    export interface IGHtmlStrategyOptions extends IGExportDialogSettings {
        /** Formát papíru*/
        paperFormat: Exports.PrintableHtml.IGPaperFormat;
        /** Tisk na šířku*/
        isLandscape: boolean;
        /** Indikace, zdali se má použít procentuální přepočet šířky*/
        isPercentage: boolean;
        /** Meta informace o šabloně z metabase.index.json*/
        metabaseStructure: IGPrintMetabaseStructure;
        /** Název tisknuté sestavy (nadpis)*/
        title?: string;
        /** Pole klíč-hodnota, defaultně zobrazované v hlavičce napravo*/
        keyValues?: IGHtmlKeyValue[];
    }
    export interface IGHtmlKeyValue {
        key: string;
        value: string;
    }
    export interface IGHtmlDataExportInput extends IGDataExportInput {
        cells: IGHtmlDataExportCell[][];
    }
    export interface IGHtmlDataExportCell {
        style: string;
        isGroupRow: boolean;
    }
    /** index.metabase.json pro printTamplates */
    export interface IGPrintMetabaseStructure {
        templateMetaKey: string;
        file: string;
        name: string;
        description: string;
        invokePrint: boolean;
        showPaperFormatSettings: boolean;
    }
    export class GPrintHtmlStrategy implements IGDataExportStrategy<IGHtmlStrategyOptions> {
        /**
         * Klíč gz resourcu k šablonám tisku
         */
        static readonly PRINT_TEMPLATE_SRC = "printTemplates";
        static readonly INDEX_METABASE_JSON_SRC = "index.metabase.json";
        /** html defaultní šablony, která je načítána v případě nenalezení resource
         * Může být neauktuální!
         */
        private readonly _DEFAULT_TEMPLATE_HTML;
        private readonly STOP_LIMIT;
        fileMimeType: string;
        outputTypes: IGExportOutputType[];
        private opts;
        private htmlTemplate;
        id: {
            value: string;
            caption: string;
            icon: string;
        };
        constructor();
        private emptyDiv;
        private htmlProvider;
        private getHtmlProvider;
        getSettingsForm(relatedContent: GContent, columns: GGridTrueColumn<any>[], defaultSettings?: IGExportDialogSettings): JQuery.Promise<Forms.FormSection>;
        setOptions(opts: IGHtmlStrategyOptions, defaultSettings?: IGHtmlStrategyOptions): void;
        saveOptions(opts: IGHtmlStrategyOptions, userSettings?: IGStorage, defaultSettings?: IGHtmlStrategyOptions): void | JQuery.Promise<any>;
        exportData(input: JQuery.Promise<IGHtmlDataExportInput>, exportOptions: IGDataExpoterOpts): JQuery.Promise<IGDataExportOutput<string>, any, any>;
        exportDataAsBlob(input: JQuery.Promise<IGHtmlDataExportInput>, exportOptions: IGDataExpoterOpts): JQuery.Promise<IGDataExportOutput<Blob>, any, any>;
        prepareExportInput<TRow extends any = any>(opts: IGPrepareExportOptions<TRow>): JQuery.Promise<IGHtmlDataExportInput>;
        private getConfirmation;
        private fetchHtmlTemplate;
        /**
         * Získá index.metabase.json šablon. V případě neúspěchu get/gz vrátí pole s defaultní šablonou
         * @returns
         */
        private fetchMetaInfoPromise;
        private getInternalDefaultTemplateMetas;
        /**
         * Předzpracování dat pro tisk
         * @param opts
         * @returns
         */
        private _prepareExportInput;
        private renderGroupingCellContent;
        private createSettingsForm;
        private createFormBox;
        private createNewPrintWindow;
    }
    /**
    * GJsonStrategy- strategy for GDataExporter for exporting json output
    *
    * @author Vlastimil Máca
    * @since 482.1.0.707
    */
    export class GJsonStrategy extends GChunkedClientDataExporter<{}> implements IGDataExportStrategy {
        id: {
            value: string;
            caption: string;
            icon: string;
        };
        outputTypes: string[];
        constructor();
        protected processFirstChunk(xlsxInput: IGXlsxInput, workbook: XLSX.WorkBook): string;
        protected processChunk(xlsxInput: IGXlsxInput, workbook: XLSX.WorkBook): string;
        protected finalizeChunks(xlsxInput: IGXlsxInput, firstChunk: string, chunkResultObj: {
            array?: (string | undefined)[];
            length: number;
        }): IGDataExportOutput<string>;
        exportDataAsBlob(input: IGDataExportInput, exportOpts: IGDataExpoterOpts): JQuery.Promise<IGDataExportOutput<Blob>, any, any>;
    }
    export interface IGExportDialogOptions {
        strategies: Data.Exports.IGDataExportStrategy[];
        dataView: Data.View<any>;
        columns: GGridTrueColumn<any>[];
        defaultSettings?: IGExportDialogSettings;
        savedSettings?: IGExportDialogSettings;
        overrideSavedSettings?: boolean;
    }
    export interface IGExportDialogSettings {
        filename?: string;
        timestamp?: string;
        dataSelection?: 'all' | 'selected' | 'range';
        dataType?: string;
        outputType?: string;
        withTimestamp?: boolean;
        rangeFrom?: number;
        rangeTo?: number;
    }
    export const DefaultStrategies: () => (GXlsxStrategy | GCsvStrategy | GTxtStrategy | GPrintHtmlStrategy | GJsonStrategy)[];
    export class GExportDialog extends GContentBase implements IGExportDialogOptions {
        dataView: Data.View<any>;
        selectedRowsCount: number;
        columns: GGridTrueColumn<any>[];
        defaultSettings?: IGExportDialogSettings;
        savedSettings?: IGExportDialogSettings;
        overrideSavedSettings?: boolean;
        strategies: Data.Exports.IGDataExportStrategy[];
        prepareContent(options: IGExportDialogOptions): JQuery.Promise<any, any, never>;
        _applyDefaultValues(force?: boolean): void;
        _collectSettings(): IGExportDialogSettings | null;
        _requestSave(): boolean;
        _execute(operation: "save" | "export"): JQueryPromise<any>;
    }
    export {};
}
declare namespace Gordic.Data.Filters {
    type CreateProcessorFunc<TValue = any, TRow = any> = (filterValue: IGGridFilterValue) => (null | Gordic.Data.BaseProcessor<TRow> | ((row: MetaRow<TRow>) => boolean));
    /**
     *  Variant of grid filter.
     *  @author Vlastimil Máca
     */
    export interface IGGridFilterVariant<TRow = any, TValue = any> {
        /** Caption, which will be shown in variant selectbox */
        caption: string;
        /** Id of variant for recognizing correct selected variant */
        id: string;
        /** This should create filter form into given div */
        createForm: (div: JQuery) => void;
        /** This should create processor or filter function based on user selected value and other options as isNegative */
        createProcessor: CreateProcessorFunc<TValue, TRow>;
        /** This should create itemTemplate for filterField, where selected filter value should be shown */
        itemTemplate: (filterValue?: any, field?: HTMLElement) => ReturnType<Exclude<GSelectBoxOptions<any>['itemTemplate'], string | undefined>>;
    }
    /**
     *  Base class for grid filter variant
     *  @author Vlastimil Máca
     */
    export abstract class GGridFilterVariant<TRow = any, TValue = any> implements IGGridFilterVariant<TRow, TValue> {
        protected fieldName: any;
        caption: string;
        id: string;
        constructor(fieldName: any);
        abstract createForm(div: JQuery): any;
        abstract createProcessor(filterValue: IGGridFilterValue<TValue>): any;
        itemTemplate(filterValue?: Partial<IGGridFilterValue<TValue>>): ReturnType<Exclude<GSelectBoxOptions<any>['itemTemplate'], string | undefined>>;
        /**
         * Prepare function, which will return value for given fieldName.
         * @param fieldName
         */
        protected getObjectValueFce(fieldName: string | string[], singleValue?: boolean): Function;
    }
    /**
     * Options of selection grid variant
     * @author Vlastimil Máca
     */
    export interface IGSelectionFilterVariantOptions<TRow = any> {
        /** Returns data from which distinct rows are selected */
        getData?: () => Data.View<TRow>;
        /** return cellTemplate function for grid with distinct rows overview */
        getValueListTemplate?: () => GGridColumn['cellTemplate'];
        getValueListTooltipTemplate?: () => GGridColumn['tooltipTemplate'];
        transform?: {
            rowToValue?: (meta: MetaRow<TRow>) => any;
            valueToRow?: (value: any) => MetaRow<TRow>;
        };
        /**Set column type for column with distinst row values */
        columnType?: GGridColumnType;
        /** Name of column, from which options as cell template should be used for column with distinct row values */
        columnName?: string;
        valueGridColumnOptions?: Pick<GGridColumn, "sortable" | "sortOrder" | "sortOrderDesc" | "sortDefDirRevert" | "searchFields">;
    }
    /**
     * Grid filter variant, which enables to filter values by selecting one or multiple distinct values
     * @author Vlastimil Máca
     */
    export class GSelectionFilterVariant<TRow, TValue extends any[] = any[]> extends GGridFilterVariant<TRow, TValue> {
        protected fieldName: string | string[];
        protected options: IGSelectionFilterVariantOptions<TRow>;
        static ID: string;
        caption: string;
        id: string;
        protected data?: Data.View<TRow>;
        protected columnSettings?: GGridColumn<TRow>;
        protected lastValue: any;
        protected previousRows?: Data.View<any> | null;
        private keys;
        constructor(fieldName: string | string[], options: IGSelectionFilterVariantOptions<TRow>);
        private getColumnName;
        private transformSortOrderForMultipleFields;
        createForm(div: JQuery): void;
        protected setupGridVisuals(grid: any, data: any): void;
        protected findClosest(div: any, classString: any): JQuery<HTMLElement> | null;
        protected updateSelectedRows(currentValueList: any, currentView: Data.View): void;
        createProcessor(filterValue: IGGridFilterValue<TValue>): ((row: any) => any) | null;
        itemTemplate(filterValue: any, field?: any): JQuery<any>;
        protected defaultGridOpts(cellTemplate?: ReturnType<Required<IGSelectionFilterVariantOptions<TRow>>['getValueListTemplate']>, tooltipTemplate?: ReturnType<Required<IGSelectionFilterVariantOptions<TRow>>['getValueListTooltipTemplate']>): GGridOptions<TRow>;
        /**
         * returns celltemplate for value column
         * @param cellTemplate
         */
        protected getDistinctGridCellTemplate(cellTemplate?: ReturnType<Required<IGSelectionFilterVariantOptions<TRow>>['getValueListTemplate']>): (data: any, meta: any, cellInfo?: any) => any;
        /**
         * returns tooltiptemplate for value column
         * @param tooltipTemplate
         */
        protected getDistinctGridTooltipTemplate(tooltipTemplate?: ReturnType<Required<IGSelectionFilterVariantOptions<TRow>>['getValueListTooltipTemplate']>): ((data: any, meta: any, cellInfo?: any) => string | HTMLElement | JQuery<HTMLElement>) | undefined;
        /**
         * Returns distinct data rows from given rows
         *
         * @param {Gordic.Data.View<any>} rows
         * @returns {Gordic.Data.View<any> | any[]}
         */
        protected getValueListData(rows: Gordic.Data.View<TRow>, getPreviousRows?: boolean): Gordic.Data.View<any>;
        /**
         * Transform row to distinct row
         *
         * @param {any} row
         * @param {any} defaultGetter
         */
        protected rowToValue(row: any, defaultGetter: any): any;
        /**
         * Create partial row from distinct row
         *
         * @param {any} data
         * @returns {MetaRow<any>}
         */
        protected valueToRow(data: any): MetaRow<any>;
    }
    /**
     * Variant for text filter
     *
     * @author Vlastimil Máca
     * @since 484.1.0.19
     */
    export class GTextFilterVariant<TRow = any, TValue extends string = any> extends GGridFilterVariant<TRow, TValue> {
        protected fieldName: string | string[];
        static ID: string;
        caption: string;
        id: string;
        protected _resolver: Gordic.Data.Filtering.BaseResolver<Gordic.Data.Filtering.SimpleFilterResolverSearchOptions> | null;
        constructor(fieldName: string | string[]);
        createForm(div: any): void;
        createProcessor(filterValue: any): Filtering.BaseResolver<Filtering.SimpleFilterResolverSearchOptions> | null;
        protected createResolver(): Filtering.SimpleFilterResolver;
    }
    /**
     * Variant for number filter
     *
     * @author Vlastimil Máca
     * @since 484.1.0.19
     */
    export class GNumberFilterVariant<TRow = any, TValue = any> extends GGridFilterVariant<TRow, TValue> {
        protected fieldName: any;
        static ID: string;
        caption: string;
        id: string;
        constructor(fieldName: any);
        createForm(div: any): void;
        protected createIntervalForm(div: JQuery, numberFieldOptions?: GNumberBoxOptions): Forms.Form;
        createProcessor(filterValue: any): ((row: any) => any) | null;
        itemTemplate(formValue: any): string;
    }
    /**
     * Variant for currency or decimal filter
     *
     * @author Vlastimil Máca
     * @since 484.1.0.19
     */
    export class GCurrencyFilterVariant<TRow = any, TValue extends Decimal = any> extends GNumberFilterVariant<TRow, TValue> {
        protected fieldName: any;
        protected opts?: {
            decimals?: number;
        } | undefined;
        static ID: string;
        caption: string;
        id: string;
        protected _log: Gordic.Diagnostics.GLog | null;
        get log(): Diagnostics.GLog;
        constructor(fieldName: any, opts?: {
            decimals?: number;
        } | undefined);
        createForm(div: any): void;
        createProcessor(filterValue: any): ((row: any) => any) | null;
    }
    /**
     * Selection variant for currency or decimal filter
     *
     * @author Vlastimil Máca
     * @since 484.1.0.19
     */
    export class GCurrencyFilterSelectionVariant<TRow = any, TValue extends any[] = any[]> extends GSelectionFilterVariant<TRow, TValue> {
        static ID: string;
        id: string;
        createProcessor(filterValue: any): ((row: any) => any) | null;
    }
    /**
     * Variant for boolean filter
     *
     * @author Vlastimil Máca
     * @since 484.1.0.19
     */
    export class GBooleanFilterVariant<TRow = any, TValue = any> extends GGridFilterVariant<TRow, TValue> {
        protected fieldName: any;
        protected options: {
            caption: string;
        };
        caption: string;
        static ID: string;
        id: string;
        constructor(fieldName: any, options: {
            caption: string;
        });
        createForm(div: any): void;
        createProcessor(filterValue: any): ((row: any) => boolean) | null;
        itemTemplate(filterValue: any): "" | "jres:31750191" | "jres:31750192";
    }
    /**
     * Variant for date and dateTime filter
     *
     * @author Vlastimil Máca
     * @since 484.1.0.19
     */
    export class GDatetimeFilterVariant<TRow = any, TValue = any> extends GGridFilterVariant<TRow, TValue> {
        protected fieldName: any;
        protected options?: {
            format?: GIntervalBoxOptions["valueType"];
        } | undefined;
        caption: string;
        static ID: string;
        id: string;
        private template;
        protected _log: Gordic.Diagnostics.GLog | null;
        get log(): Diagnostics.GLog;
        constructor(fieldName: any, options?: {
            format?: GIntervalBoxOptions["valueType"];
        } | undefined);
        createForm(div: any): void;
        createProcessor(filterValue: any): ((row: any) => any) | null;
        itemTemplate(filterValue: any): any;
    }
    export {};
}
declare namespace Gordic.Components.Grid.CondFormats {
    /** Podmíněný formát */
    interface CondFormat {
        /** Popisek formátu - nepovinný */
        description?: string;
        /** Seznam názvu sloupců (name) oddělených čárkou. Uvést pouze pokud se má aplikovat pro buňky. Nevyplňovat pro řádkový formát. */
        applyTo?: string;
        /** Vzorec - pro použití hodnoty sloupce zadejte name sloupce s @ na začátku ... např @ixp. Možno zkusit v UI v nastavení profilu gridu -> podmíněné formátování */
        formula: string;
        /** Barva pozadí */
        bg?: CondFormatBg;
        /** Barva textu */
        text?: CondFormatText;
        /** Má být tučně ano/ne */
        bold?: boolean;
        /** Má být kurzívou */
        italic?: boolean;
        /** Styl písma */
        style?: CondFormatStyle;
    }
    enum CondFormatBg {
        black = "black",
        white = "white",
        lightgray = "lightgray",
        gray = "gray",
        darkgray = "darkgray",
        lightred = "lightred",
        red = "red",
        darkred = "darkred",
        lightorange = "lightorange",
        orange = "orange",
        darkorange = "darkorange",
        lightyellow = "lightyellow",
        yellow = "yellow",
        darkyellow = "darkyellow",
        lightgreen = "lightgreen",
        green = "green",
        darkgreen = "darkgreen",
        lightblue = "lightblue",
        blue = "blue",
        darkblue = "darkblue",
        lightpurple = "lightpurple",
        purple = "purple",
        darkpurple = "darkpurple"
    }
    enum CondFormatText {
        black = "black",
        white = "white",
        gray = "gray",
        orange = "orange",
        yellow = "yellow",
        red = "red",
        green = "green",
        blue = "blue",
        purple = "purple"
    }
    enum CondFormatStyle {
        normal = "normal",
        underline = "underline",
        linethrough = "linethrough"
    }
}
interface IGDefaultSelectorFilterOpts<TRow = any> {
    filterPanelOpts: IGFilterPanelOptions<TRow>;
}
interface IGFilterPanelOptions<TData = any> extends JQueryUI.WidgetOptions {
    /** filtrovac� formul��e    (nutn� nechat jeden bod v layout descriptoru na favorite piny L-3-8-1 M-12-11-1 S-12-11-1) */
    forms: Gordic.Forms.Form[];
    /** formul�� v saving dialogu  */
    saveOptionsForm?: null | Gordic.Forms.Form | "eko" | "all" | null;
    /**
     * (pouze v detailu) -inicializa�n� pole - p�i nefunk�n�m GStore  se pou�ije jako default (pole s jmeny ��dk� obl�ben�ch (tedy to co se p�e k row, ne name fieldu).
     * Mo�nost 'all' p�id� v�echny pol��ka formul��e.
     *
     * @type {null | string[] | 'all'}
     */
    favorites?: null | string[] | 'all';
    /** descriptor pro obl�ben� */
    favoriteLayoutDescriptor?: null | string;
    /** (pouze v detailu) -resolver pro na��t�n� a ukl�d�n� pojmenovan�ch filtr� povin� metody na n�m jsou [ getFilters() , saveFilter(), removeFilter()   ]; */
    filterStorageService?: null | IGFilterStorageService<TData>;
    detailMode?: 'navigate' | 'window' | null;
    /** cesta nebo instance gstoru kam se ukl�daj� obl�ben�, pokud nevypln�no pou�ije se tento default (p�i dvouch filtrech na detailu mus� b�t unik�tn�) */
    userSettings?: null | any;
    /** kl�� pod kter� se budou ukl�dat obl�ben� v simplemodu, z�rove� aktivuje funkci volby obl�ben�ch v simplemodu*/
    idSimpleMode?: null | string;
    /** P�i vyhled�v�n� se vyvol� tato metoda. Na vstup dostane jako prvn� parametr eventu a jako druh� object s filtrem  parametry(ev, {filter:data})  */
    apply?: null | ((ev: JQuery.TriggeredEvent, o: {
        filter?: null | TData;
    }) => void);
    /**
     * [OBSOLETE] Pou�ijte option toMode na pol��ku.
     * @deprecated [OBSOLETE] Pou�ijte option toMode na pol��ku.
     *  template na v�b�rovem selextboxu filtru
     */
    filterItemTemplate?: null | string;
    /**
     * [OBSOLETE] Pou�ijte option toMode na pol��ku.
     * @deprecated [OBSOLETE] Pou�ijte option toMode na pol��ku.
     *  helpertemplate na v�b�rovem selextboxu filtru
     */
    filterHelperItemTemplate?: null | string;
    /**
     * [OBSOLETE] Pou�ijte option toMode na pol��ku.
     * @deprecated [OBSOLETE] Pou�ijte option toMode na pol��ku.
     */
    textItemTemplate?: null | string;
    /** mo�nost ��dit nab�dku pojmenovan�ch masek */
    helperCustomizer?: null | any;
    key?: null | any;
    helperColumns?: null | string[];
    /** tema krer� se bude pou��vat ve stroageservice */
    tema?: null | string;
    customClass?: null | string;
    /** funkce kterou zavol�m po p�id�n� defaultn�ho filtru */
    userDefaultFilter?: null | boolean | Gordic.Widget.GFilterPanelFunctionForSave;
    /** Objekt podle kter�ho bude vyhled�no hned p�i create gfilterpanelu pokud nebude m�t u�ivatel zvolen userdefault */
    hardDefaultFilter?: null | TData;
    /** Objekt podle kter�ho bude vyhled�no hned p�i create gfilterpanelu p�ebije userDefault i hardDefault */
    hardFilter?: null | TData;
    /**
     * (default: false) Striktn� zak�e automatick� na�ten� hned po otev�en� seznamu, obl�ben� filtr se pouze p�edpln�.
     *
     * True => P�i na��t�n� z UserFiltru nebo HardFiltru, se pouze p�edpln� do panelu ale nevyvol� se vyhled�v�n�.
     */
    strictStopAutoLoad?: null | boolean;
    /**
     * (default: false) P��znak, zda u�ivatel m��e zm�nit zak�z�n� automatick�ho na�ten� hned po otev�en� seznamu
     */
    strictStopAutoLoadUserSettings?: null | boolean;
    /** NED�LA NIC - vyh�zet, nepou��vat - p��d� tla��tko vyhledat p�i za�en�ch obl�ben�ch p�id�no na ��dost bohou�e */
    searchButtonOnMainRow?: null | boolean;
    /** funkce kter� se zavol� t�sn� p�ed odesl�n�m vyhled�v�n� dat, na vstup p�ijdou sezb�ran� data kter� lze libovoln� modifikovat    */
    collectData?: null | ((event: JQuery.TriggeredEvent, o: {
        data: any;
    }) => void);
    /** funkce kter� se zavol� t�sn� p�ed appplyem modelu do formul���  */
    applyData?: null | ((o: any) => void);
    /** funkce kter� se zavol� t�sn� p�ed vykreslen�m badge */
    badgeData?: null | ((ev: JQuery.TriggeredEvent, o: {
        pocet: number;
        tooltip: string;
        data: any;
    }) => void);
    /** funkce kter� se zavol� t�sn� p�ed ulo�en�m ,lze modifikovat ulo�en� data */
    saveData?: null | ((o: any) => void);
    formbuilded?: null | ((ev: JQuery.TriggeredEvent, o: any) => void);
    reset?: null | ((ev: JQuery.TriggeredEvent, o: any) => void);
    /** vrat� promise kter� �ek� na na�ten� pol��ek v detailu a v resolve vr�t� data*/
    waitForDetail?: null | (() => JQueryPromise<any>);
    /**
     * (default: Normal) M�d zobrazen� filtru.
     * @type {FilterViewMode}
     */
    filterViewMode?: null | FilterViewMode;
    /**
     * (default: $.content("main").IxsFunAkt) Identifik�tor funkce aktu�ln� p�ihl�en�ho u�ivatele.
     * Slou�� pro ukl�d�n� favorite hodnoty ze selectboxu v�b�ru p�eddefnovan�ch filtr�.
     * Jestli�e nen� napl�eno, pak se �te z $.content("main").IxsFunAkt o jeho� nastaven� se star� Gordic.Gui.WebApp.GWebAppGinis.
     * Pokud nen� vypl�eno ani to (nap��klad u hybrid�), pak nen� mo�n� ozna�it polo�ky selectboxu hv�zdi�kou.
     * @type {string}
     */
    ixsFunAkt?: null | string;
    /**
      * Nastaven� chov�n� primary stylu tla��tka "Na��st".
      * Neplat� pro simpleMode - pro n�j je pou�ito 'AlwaysPrimary' bez ohledu na tento parametr.
      *
      * 'Auto' (default) - Pokud je�t� nebyly na�teny data, nebo od jejich na�ten� do�lo ke zm�n� hodnot filtr�, pak je primary.
      * 'AlwaysPrimary' - V�dy je primary.
      * 'NeverPrimary' - Nikdy nen� primary.
      *
      * @type {'Auto'| 'AlwaysPrimary' | 'NeverPrimary'}
      */
    primaryButtonBehaviour?: 'Auto' | 'AlwaysPrimary' | 'NeverPrimary';
    /**
     * (default: 'Deny') Povolen� zm�ny modu zobrazen� filtru u�ivatelem.
     *
     * Zadejte m�dy filtru, mezi kter�mi m��e u�ivatel volit.
     * Mo�nost 'Deny' zak�e tuto volbu.
     *
     * Pozn�mka: Pokud chcete u�ivateli povolit pouze jeden m�d, pak jej nastavte jako filterViewMode a filterViewModeUserSettings nastavte na 'Deny'.
     * @type {FilterViewMode[] | 'Deny'}
     */
    filterViewModeUserSettings?: FilterViewMode[] | 'Deny';
    /**
     * Nastaven� chov�n� visible na tla��tku pro vymaz�n� aktu�ln�ch podm�nek / filtr�.
     * Neplat� pro simpleMode - pro n�j je pou�ito 'alwaysVisible' bez ohledu na tento parametr.
     *
     * 'Auto' (default) - Pokud je co "vymazat", pak je akce viditeln�.
     * 'AlwaysVisible' - V�dy je viditeln�.
     * 'NeverVisible' - Nikdy nen� viditeln�.
     *
     * @type {'Auto' | 'AlwaysVisible' | 'NeverVisible'}
     * @default 'Auto'
     */
    clearFilterButtonVisible?: 'Auto' | 'AlwaysVisible' | 'NeverVisible';
    /**
     * Nastaven� co se zobraz� po vyhled�n�.
     * Neplat� pro simpleMode - pro n�j je pou�ito 'OblibenePodminky' bez ohledu na tento parametr.
     *
     * 'OblibenePodminky' - Jsou zobrazeny obl�ben� podm�nky.
     * 'VyhledanePodminkyVSelectboxu' (default) - Je ozbrazen ��dek s podm�nkami, dle kter�ch bylo vyhled�no.
     * 'VyhledanePodminkyVBadge' - Je zobrazen pouze badge s podm�nami, dle kter�ch bylo vyhled�v�no. Nezab�r� dal�� m�sto.
     *
     * @type {Gordic.Widget.filterpanelPoVyhledaniZobrazit}
     * @default 'VyhledanePodminkyVSelectboxu'
     */
    poVyhledaniZobrazit?: Gordic.Widget.filterpanelPoVyhledaniZobrazit;
    /**
     * (default: [ 'OblibenePodminky', 'VyhledanePodminkyVSelectboxu', 'VyhledanePodminkyVBadge' ])
     * Povolen� zm�ny toho, co se u�ivateli zobraz� po vyhled�n�.
     *
     * Zadejte objekty, mezi kter�mi m��e u�ivatel volit.
     * Mo�nost 'Deny' zak�e tuto volbu.
     *
     * Pozn�mka: Pokud chcete u�ivateli povolit pouze jedenu mo�nost, pak ji nastavte jako poVyhledaniZobrazit a poVyhledaniZobrazitUserSettings nastavte na 'Deny'.
     * @type {Gordic.Widget.filterpanelPoVyhledaniZobrazit[] | 'Deny'}
     */
    poVyhledaniZobrazitUserSettings?: Gordic.Widget.filterpanelPoVyhledaniZobrazit[] | 'Deny';
    /**
     * (default: true) P��znak, zda se m� po otev�en� contentu s filterpanelem rovnou otev��t i panel obl�ben�ch podm�nek [true].
     * @type {boolean}
     */
    poOtevreniOtevritPanelPodminek?: boolean;
    /**
     * [OBSOLETE] Pou�ijte option autoLoadAfter.
     * @deprecated  [OBSOLETE] Pou�ijte option autoLoadAfter.
     * (default: false) P��znak, zda se m� formul�� po vytvo�en� na��st pomoc� inicializa�n�ch hodnot ve formul��i.
     *
     * @type {boolean}
     */
    autoLoadAfterCreatePanel?: boolean;
    /**
     * [OBSOLETE] Pou�ijte option autoLoadAfter.
     * @deprecated [OBSOLETE] Pou�ijte option autoLoadAfter.
     * (default: true) Automatick� vyhled�n� po zm�n� ulo�en�ho filtru.
     * @type {boolean}
     */
    autoLoadAfterChoseFilter?: boolean;
    /**
     * [OBSOLETE] Pou�ijte option autoLoadAfter.
     * @deprecated [OBSOLETE] Pou�ijte option autoLoadAfter.
     * (default: autoLoadAfterChoseFilter) Automatick� vyhled�n� po vymaz�n� filtru (nasaven� do v�choz�ch hodnot).
     * @type {boolean}
     */
    autoLoadAfterClearFilter?: boolean;
    validators?: null | any;
    /**
     * Statick� (program�torem definovan�) filtry, kter� u�ivatel nem��e editovat / smazat.
     *
     * @type {(Gordic.Widget.filterpanelFilterOptions & TData)[] | null}
     */
    staticFilters?: (Gordic.Widget.filterpanelFilterOptions<TData>)[] | null;
    /**
     * (default: true) Mo�nost odvybrat obl�ben� filtr. Pokud je pou�it v�choz� statick� filtr, pak je default [false].
     *
     * Pokud je na [true], pak lze kliknut�m na obl�ben� filtr odvybrat d�ky �emu� nebude ��dn� filtra obl�ben�.
     *
     * V opa�n�m p��pad� [false] je mo�n� pouze vybrat jin� filtr (kliknut� na aktu�ln� nic neud�l�) d�ky �emu�
     * bude v�dy vybran� alespo� jeden obl�ben� filtr (poud ji� u�ivatel jednou obl�ben� filtr vybral, nebo je nastaven v�choz� "z v�roby")
     * - Tato varianta je p�edev��m pro situaci, kdy je pou�it v�choz� static� filtr - stejn� chov�n� jako u v�choz�ch pohled� na gridu.
     *
     * @type {boolean}
     */
    unselectFavoriteFilter?: boolean;
    /**
     * (default: false) Nastaven�, zda budou podm�nky v detailu filtru po otev�en� rovnou zafiltrovan� na pouze vypln�n� podm�nky.
     *
     * Jedn� se pouze o v�choz� hodnotu danou program�torem, kterou si u�ivatel m��e zm�nit
     * v nastaven� filterpanelu a kliknut�m na akci "Pouze vypln�n�" v detailu filtru.
     *
     * @type {boolean}
     */
    zobrazitPouzeVyplneneVDetailuFiltru?: boolean;
    /**
     * V�choz� hodnoty pol��ek.
     *
     * @type {TData | null}
     */
    initialValues?: TData | null;
    /**
     * Ud�losti kdy se m� automaticky spustit na�ten� dat.
     * @type {Gordic.Widget.filterpanelAutoLoadAfter[]}
     */
    autoLoadAfter?: Gordic.Widget.filterpanelAutoLoadAfter[];
    /**
     * (default: ['ClearFilter', 'ChoseFilter' | 'CreatePanel']) Povolen� zm�ny ud�lost� kdy se m� automaticky spustit na�ten� dat u�ivatelem.
     *
     * Zadejte m�dy ud�losti kdy se m� automaticky spustit na�ten� dat, mezi kter�mi m��e u�ivatel volit.
     * Mo�nost 'Deny' zak�e tuto volbu.
     *
     * Pozn�mka: Pokud chcete u�ivateli povolit pouze jednu ud�lost, pak jej nastavte jako autoLoadAfter a autoLoadAfterUserSettings nastavte na 'Deny'.
     * @type {FilterViewMode[] | 'Deny'}
     */
    autoLoadAfterUserSettings?: Gordic.Widget.filterpanelAutoLoadAfter[] | 'Deny';
    /**
     * (default: true) P��znak, zda se "p�ep�nateln�" akce v detailu filtru zobraz� jako checkbox (podbarven� p�i zapnut�m stavu) [true],
     * nebo jako "standardn�" akce s upraven�m popiskem dle aktu�ln�ho stavu [false].
     * @type {boolean}
     */
    detailActionAsCheckbox?: boolean;
    /**
     * (default: false) P��znak, zda se m� vedle selectboxu ulo�en�ch filtr� zobrazit "zkratka" pro otev�e� nastaven� aktu�ln� filtru jako u gridu.
     * @type {boolean}
     */
    showCurrentFilterSettingsShortcut?: boolean;
    /**
     * (default: false) P��znak, zda se m� v  detailu filtru zobrazovat navig�tor.
     * @type {boolean}
     */
    useNavigatorInFilterDetail?: boolean;
    /**
     * Dodate�n� nem�nn� filtr dat, kter� se nezobrazuje v pou�it�ch filtrech.
     *
     * Z�rove� je vhodn� nem�t ve fitrlech pol��ka kter� by nastavovala stejn� filtry jako tento.
     * Doch�zel by tak ke zmaten� u�ivatele, kter� by si myslel �e se filtruje podle j�m vybrann� hodnoty, ale data by tomu neodpov�dala.
     *
     * @type {TData}
     */
    fixedInvisibleFilter?: TData;
    /**
     * (Default: [Verejna, Soukroma, ZaSu]) Povolen� masky filtr� (pro �ten� i ulo�en�).
     * @type {Gordic.Gin.Interface.TypMaskyEnum[]}
     */
    allowedMaskTypes?: Gordic.Gin.Interface.TypMaskyEnum[];
}
interface IGFilterPanelOptionsWithObsolites<TData = any> extends IGFilterPanelOptions<TData> {
    /**
     * [OBSOLETE] Pou�ijte option filterViewMode nastaven� na hodnotu FilterViewMode.Simple.
     * P��znak, zda se m� vytvo�it ��dek s pojmenovan�my filtry a roz���en�m nebo jen v�echny ��dky formou obl�ben�ch.
     * @type {boolean}
     */
    simpleMode?: null | boolean;
    /**
     * [OBSOLETE] Pou�ijte option poVyhledaniZobrazit.
     *
     * @type {boolean}
     */
    poVyhledaniZavritPanelPodminek?: boolean;
    /**
     *  [OBSOLETE] Pou�ijte option autoLoadAfterCreatePanel se stejnou hodnotou.
     * @type {null | boolean}
     */
    simpleModeAutoLoadAfterCreatePanel?: null | boolean;
}
/**
 * Profile nastaven� filterpanelu (pro budouc� pou�it�).
 *
 * @author TFeik
 * @since 484.1.0.618
 */
type GFilterpanelProfile<TFilterData = any> = Omit<IGFilterPanelOptions<TFilterData>, 'forms' | 'userSettings' | 'filterStorageService' | 'apply' | 'searchButtonOnMainRow' | 'collectData' | 'applyData' | 'badgeData' | 'saveData' | 'formbuilded' | 'reset' | 'waitForDetail' | 'ixsFunAkt' | 'validators'> & {};
declare namespace Gordic.Widget {
    /**
     * Eventy, kter� vyvol�v� FilterPanel.
     *
     * @author TFeik
     * @since 484.1.0.76
     */
    enum filterpanelEvent {
        collectInitialData = "collectInitialData",
        applyData = "applyData",
        badgeData = "badgeData",
        apply = "apply",
        collectData = "collectData",
        saveData = "saveData",
        formbuilded = "formbuilded",
        reset = "reset"
    }
    enum filterpanelCustomClasses {
        jsFilterButton = "js-filter-button",
        vyberPredvolenychFiltru = "gfiltepanel-vyber-predvolenych-filtru",
        selboxSVyhledanejmaKriteriema = "gfiltepanel-selbox-s-vyhledanejma-kriteriema",
        jsVsechnyPodminky = "js-vsechny-podminky",
        jsZobrazPouzitePodminkyButton = "js-zobraz-pouzite-podminky-button",
        kontrolniDivSkladiste = "filterpanelKontrolniDivSkladiste",
        noPinnable = "noPinnable"
    }
    /**
     * Custom t��da kterou lze ozna�it field v p��pad�, �e se nem� ukl�dat do profil� fitru.
     */
    const IgnoreFieldInSavedProfileCustomClass = "js-ignore-field-in-saved-profile";
    type GFilterPanelFunctionForSave = (obj: any) => void;
    interface filterpanelUserSettingsData {
        /**
         * OBSOLITE - pouzijte poVyhledaniZobrazit.
         * @type {boolean}
         */
        poVyhledaniZavritPanelPodminek?: boolean | null;
        poOtevreniOtevritPanelPodminek?: boolean | null;
        favoritesInSimpleMode?: string[] | null;
        filterViewMode?: FilterViewMode | null;
        poVyhledaniZobrazit?: filterpanelPoVyhledaniZobrazit | null;
        zobrazitPouzeVyplnene?: boolean | null;
        autoLoadAfter?: filterpanelAutoLoadAfter[] | null;
        strictStopAutoLoad?: boolean | null;
    }
    interface selBoxArrayItem {
        rowLabel: string;
        tabLabel?: string;
        rowName: string;
        rowHint?: string;
        fieldLabels?: string;
        rowSimpleModeStrict: boolean;
    }
    type filterpanelPoVyhledaniZobrazit = 'OblibenePodminky' | 'VyhledanePodminkyVSelectboxu' | 'VyhledanePodminkyVBadge';
    type filterpanelAutoLoadAfter = 'ClearFilter' | 'ChoseFilter' | 'CreatePanel';
    interface selectboxData<TValue> {
        value: TValue;
        label: string;
    }
    type filterpanelFilterOptions<TData> = TData & Gin.Interface.GSeznamMasekDto & {
        /**
         * P��znak, zda je filtr jako v�choz�. Sm� b�t pouze na jednom prvnku.
         * @type {boolean}
         */
        gfilterpanel_is_default?: boolean;
    };
    /**
     * Polo�ka, na kterou jde d�t focus ve filterpanelu.
     *
     * @author  TFeik
     * @date    05.11.2020
     * @since   484.1.0.696
     */
    type filterpanelFocusTarget = 'filterButton' | 'favorites';
    /**
     * Typ ukldac�ho formul��e pro ulo�en� masky / obl�ben�ho filtru.
     *
     * @author  TFeik
     * @since   488.1.0.488
     */
    type filterpanelSaveFormType = 'ulozit' | 'ulozitJakoNovy';
    /**
     * filterpanelFieldOptions<TValue>
     *
     * @author  TFeik
     * @since   490.1.0.163
     */
    interface filterpanelFieldOptions<TValue = any> extends GFieldOptions<TValue>, filterpanelFieldOptionsExtension {
    }
    /**
     * filterpanelFieldOptionsExtension
     *
     * @author  TFeik
     * @since   490.1.0.163
     */
    interface filterpanelFieldOptionsExtension {
        filterTypeDefinitions?: Gin.Interface.GMaskaTypeDefinitionDto[] | (() => Gin.Interface.GMaskaTypeDefinitionDto[]) | null;
    }
}
/**
* M�d zobrazen� filtru ve filterpanelu.
*
* @author  TFeik
* @date    07.01.2019
* @since   482.1.0.848
*/
declare enum FilterViewMode {
    /** Filtr obsahuje pouze p�edvybran� pol��ka. */
    Simple = 0,
    /** Filtr obsahuje selectbox pro vybr�n� ulo�en�ho filtru a p�i kliknut� na filtr zobraz� vybran� ("obl�ben�") polo�ky pro filtrov�n�. */
    Normal = 1,
    /** Filtr obsahuje selectbox pro vybr�n� ulo�en�ho filtru a p�i kliknut� na filtr rozbal� "detail" se v�emi polo�ky k filtrov�n� (neobsahuje "obl�ben�"). */
    Detail = 2
}
interface IGFilterStorageService<TFilterData = any> {
    getFilters(parametry: any): JQueryPromise<Gordic.Widget.filterpanelFilterOptions<TFilterData>[]> | Gordic.Widget.filterpanelFilterOptions<TFilterData>[];
    saveFilter(obj: any): JQueryPromise<any>;
    removeFilter(obj: any): JQueryPromise<any>;
    setParentContentIfNull?(parentContent: GContent): void;
}
declare namespace Gordic.Gui.WebControls.GLoginUtils {
    /**
     * Vrátí request pro přihlášení pomocí eIdentity (Národní Identitní Autoria).
     *
     * @author  TFeik
     * @date    16.07.2019
     *
     * @returns {JQuery.Promise<GGetNiaRequestOutputDto>} Promise requestu pro přihlášení pomocí eIdentity (Národní Identitní Autoria).
     */
    function GetNiaRequest(): JQuery.Promise<GGetNiaRequestOutputDto>;
    /**
     * Vrátí request pro MojeID.
     *
     * @author  TFeik
     * @date    16.07.2019
     *
     * @returns {JQuery.Promise<string>} Promise request pro přihlášení pomocí MojeID.
     */
    function GetMojeIdRequest(): JQuery.Promise<string>;
    /**
     * Vrátí konfiguraci přihlašovacího dialogu veřejného uživatele.
     *
     * @author  TFeik
     * @date    16.07.2019
     *
     * @returns {JQuery.Promise<GPublicLoginConfigDto>} Promise konfigurace přihlašovacího dialogu veřejného uživatele.
     */
    function GetPublicLoginConfig(): JQuery.Promise<GPublicLoginConfigDto>;
    /**
     * Vrátí veřejný klíč pro šifrování.
     *
     * @author  TFeik
     * @date    16.07.2019
     *
     * @returns {JQuery.Promise<string>} Promise stringu veřejného klíče pro šifrování.
     */
    function GetCipherPublicKey(): JQuery.Promise<string>;
    /**
     * Načte data z ARES dle IČa.
     *
     * @author  TFeik
     * @date    06.11.2023
     *
     * @param {string} ic IČ.
     * @returns {JQuery.Promise<GAresDataDto>}
     */
    function GetAresData(ic: string, useGlobalParameters: boolean): JQuery.Promise<GAresDataDto>;
}
declare namespace Gordic.Gui.WebControls {
    class PubliLoginIndex {
        /**
         * Vrátí registrační formulář.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        static getRegisterForm(): JQuery.PromiseBase<JQuery<HTMLElement>, never, never, never, never, never, never, never, never, never, never, never>;
        static getXrgRegisterForm(): JQuery.PromiseBase<JQuery<HTMLElement>, never, never, never, never, never, never, never, never, never, never, never>;
        /**
         * Vrátí formulář pro nastavení nového hesla po jeho zapomenutí.
         *
         * @author  TFeik
         * @date    10.04.2017
         */
        static getNewPassword(): JQuery.PromiseBase<JQuery<HTMLElement>, never, never, never, never, never, never, never, never, never, never, never>;
        /**
         * export function loadContent
         *
         * @author  TFeik
         * @date    10.04.2017
         *
         * @param {any} contentClassName
         */
        static loadContent(contentClassName: any): JQuery.PromiseBase<GContent<IGContentBase, any>, never, never, never, never, never, never, never, never, never, never, never>;
    }
    /** Interface pro public login dialogy */
    interface IGPublicLoginDialog extends GContent {
        registerCheckCapcha(): any;
    }
}
declare namespace Gordic.Gui.WebControls {
    interface GAddRepresentPublicUserDlgInputParams {
    }
    interface GAddRepresentPublicUserDlgReturnValue {
    }
    interface GChangePublicUserInfoDlgInputParams {
    }
    interface GChangePublicUserInfoDlgReturnValue {
    }
}
declare namespace Gordic.Gui.Dialogs {
    /**
     * Otevře dialog provázání účtů veřejného uživatele.
     *
     * @author  TFeik
     * @date    03.09.2021
     *
     * @param {OpenDialogParams<WebControls.GAddRepresentPublicUserDlgInputParams>} input
     */
    function GAddRepresentPublicUserDlg(input: OpenDialogParams<WebControls.GAddRepresentPublicUserDlgInputParams>): JQuery.Promise<WebControls.GAddRepresentPublicUserDlgReturnValue | undefined, OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog osobní údaje veřejného uživatele.
     *
     * @author  TFeik
     * @date    27.03.2017
     *
     * @param {OpenDialogParams<WebControls.GChangePublicUserInfoDlgInputParams>} input
     */
    function GChangePublicUserInfoDlg(input: OpenDialogParams<WebControls.GChangePublicUserInfoDlgInputParams>): JQuery.Promise<WebControls.GChangePublicUserInfoDlgReturnValue | undefined, OpenDialogRejectType | undefined, any>;
}
declare namespace Gordic.Data.Selectors {
    interface NonRequiredDefaultSelectorOptions<T> {
        /**
         * Klice pro view
         */
        dataKeys?: string[];
        /**
         * Titulek defaultniho contentu
         * @type {string}
         */
        title?: string;
        /**
         * Priznak, zda se muze vybrat vice hodnot
         * @type {boolean}
         */
        multi?: boolean;
        /**
         * Vlastnosti gridu
         * @type {GGridOptions<T>}
         */
        gridOpts?: GGridOptions<T>;
        /**
         * Serverove filtry
         * @type {any}
         */
        serverFilters?: any;
        /**
         * Handler, ktery na vystupu ocekava serverove filtry, ktere se maji pouzit
         * @type {((serverFilters: any)}
         */
        serverFiltersHandler?: ((serverFilters: any) => any);
        /**
         * Priznak, ze se nema poustet vyhledavani
         * @type {boolean}
         */
        doNotSearch?: boolean;
        /**
         * Vlastnosti filter panelu
         * @type {any}
         */
        filterPanelOpts?: IGFilterPanelOptions<T>;
        /**
         * Vlastnosti subtasku
         * @type {MenuParams[] | Gordic.Prefabs.Selector.SubTasks.IGSubTasksDto | null}
         */
        subTaskOpts?: MenuParams[] | Gordic.Prefabs.Selector.SubTasks.IGSubTasksDto | null;
        /**
         * Priznak, zda mohu vybrat prazdnou hodnotu => zrusit vyber
         * @type {boolean}
         */
        canSelectEmpty?: boolean;
        /**
         * Uzivatelske nastaveni
         * @type {Gordic.Data.IGStorage | null | string}
         */
        userSettings?: Gordic.Data.IGStorage | null | string;
        /**
         * Ma obslouzit oblibene polozky
         */
        hasFavorite?: boolean;
        /**
         * Objekt pro rozsireni komponent
         */
        props?: ObjectLiteral<any> | null;
        /**
         * Kontrola nastavení
         */
        modifyGridOptions?: (gridOptions: GGridOptions<T>) => JQuery.Promise<GGridOptions<T>>;
        /**
         * hledaný text
         */
        searchText?: string;
        preselectValue?: null | T | T[];
    }
    interface GDlgSelectorOptions extends GDlgOptions {
        parent?: HTMLElement | JQuery<HTMLElement> | Element;
    }
    interface ExtendedProperties {
        readonly loadingAwait?: JQueryPromise<void>;
        title?: string;
        uid?: string;
        tryCloseAllChildContents?: (() => JQueryPromise<any>);
        isolatedUserSettings?: boolean;
        globalSettings?: IGStorage | null;
        contextProp?: ((propName: string) => any);
        width?: any;
        height?: string | number;
        sideBar?: GSideBarOptions;
        statusBar?: MenuParams[];
        menuBar?: MenuParams[];
        commandBar?: MenuParams[];
    }
    interface DefaultSelectorOptions<T = any> extends NonRequiredDefaultSelectorOptions<T>, ExtendedProperties {
        /**
         * Defaultni gridformat
         * @type {Gordic.Data.GridFormat<T> | GGridColumn<T> | GGridColumn <T> []}
         */
        gridFormat: Gordic.Data.GridFormat<T> | GGridColumn<T> | GGridColumn<T>[];
        /**
        * Data selektoru
        * @type {T[] | JQuery.Promise<T[]> | Gordic.Data.Readers.Base| Gordic.Data.View<T>}
        */
        data: T[] | JQuery.Promise<T[]> | Gordic.Data.Readers.Base<T> | Gordic.Data.View<T> | JQuery.Promise<Gordic.Data.View<T>>;
        /**
         * Content
         * @type {IGClientContent}
         */
        content?: IGClientContent;
    }
    interface BaseSelectorOptionsInternal<T> {
        /**
        * Content
        * @type {IGClientContent}
        */
        content: IGClientContent;
        /**
         * Data contentu
         * @type {T[] | JQuery.Promise<T[]> | Gordic.Data.Readers.Base<T>| Gordic.Data.View<T> | JQuery.Promise<Gordic.Data.View<TRow>>}
         */
        data: T[] | JQuery.Promise<T[]> | Gordic.Data.Readers.Base<T> | Gordic.Data.View<T> | JQuery.Promise<Gordic.Data.View<T>>;
        /**
         * Vlastnosti contentu
         * @type {GContentType<BaseSelectorOptionsInternal<T>>}
         */
        contentOptions?: GContentType<BaseSelectorOptionsInternal<T>>;
    }
    abstract class BaseSelector<TRow = any> implements BaseSelectorOptionsInternal<TRow> {
        /**
        * Data selektoru
        * @type {TRow[] | JQuery.Promise<TRow[]> | Gordic.Data.Readers.Base<TRow>| JQuery.Promise<Gordic.Data.View<TRow>>}
        */
        data: TRow[] | JQuery.Promise<TRow[]> | Gordic.Data.Readers.Base<TRow> | Gordic.Data.View<TRow> | JQuery.Promise<Gordic.Data.View<TRow>>;
        /**
        * Content
        * @type {IGClientContent}
        */
        content: IGClientContent;
        contentOptions?: GContentType<BaseSelectorOptionsInternal<TRow>>;
        abstract show(options?: GDlgOptions): JQueryPromise<TRow | TRow[]>;
        getSelector(options?: {
            show?: boolean;
            showOptions?: GDlgOptions;
        }): this;
        constructor(options: BaseSelectorOptionsInternal<TRow>);
    }
    interface DefaultSelectorOptionsInternal<T = any> extends BaseSelectorOptionsInternal<T>, NonRequiredDefaultSelectorOptions<T> {
        /**
         * Defaultni gridformat
         * @type {Gordic.Data.GridFormat<T> | T[]}
         */
        gridFormat: Gordic.Data.GridFormat<T> | T[];
    }
    interface UserSelectorOptions {
        /** oznaceni elementu, ktery je pouzivan k navazani selektoru*/
        related: HTMLElement | JQuery | Element;
    }
    type DefaultSelectorOptionsType<TRow> = Partial<DefaultSelectorOptions<TRow>>;
    interface IGDefaultSelectorFilterOpts<TRow = any> {
        doNotSearch?: boolean;
        filterPanelOpts: IGFilterPanelOptions<TRow>;
    }
    class DefaultSelector<TRow = any> extends BaseSelector<TRow> implements DefaultSelectorOptionsInternal<TRow> {
        gridFormat: Gordic.Data.GridFormat<TRow>;
        title: string;
        multi: boolean;
        gridOpts: GGridOptions<TRow>;
        serverFilters?: any;
        serverFiltersHandler: ((param: any) => any);
        filterOpts: IGDefaultSelectorFilterOpts<TRow>;
        menuBar?: MenuParams[] | null;
        dataKeys?: string[];
        statusBar?: MenuParams[] | null;
        subTaskOpts?: MenuParams[] | Gordic.Prefabs.Selector.SubTasks.IGSubTasksDto | null;
        canSelectEmpty: boolean;
        parent: HTMLElement | JQuery | Element;
        hasFavorite?: boolean;
        userSettings?: Gordic.Data.IGStorage | null | string;
        props?: ObjectLiteral<any> | null;
        searchText?: string;
        modifyGridOptions: (gridOptions: GGridOptions<TRow>) => JQuery.Promise<GGridOptions<TRow>>;
        preselectValue?: null | TRow | TRow[];
        protected contentDlg: any;
        constructor(optionsIn: UserSelectorOptions & DefaultSelectorOptionsType<TRow>);
        show(options?: GDlgSelectorOptions): JQuery.Promise<TRow | TRow[]>;
    }
}
declare namespace Gordic.Prefabs.Selector.Content {
    const toogleFavorite: <TRow>(this: Gordic.Prefabs.Selector.Content.DefaultContent, isFavorite: boolean) => void;
    const favoriteButton: MenuParams[];
    /**
     * Dto parametrů pro selektor
     * @author pnovak
     * @since 482.1.0.456
     */
    interface EditNewContentParamDto {
        /**
         * Použitý formulář
         * @type {Gordic.Forms.Form}
         */
        form: Gordic.Forms.Form;
        /**
         * Příznak, zda lze v contentu i editovat
         * @type {boolean}
         */
        edit?: boolean;
        /**
          * Metoda na servisním kontentu (GSelectorService)
          * @type {string}
          */
        dataService: string;
        /**
         * Nazev readeru, slouží pro mazání z cache
         * @type {string}
         */
        readerClass: string;
        /**
         * Aplikovaná data
         * @type {any}
         */
        model?: any;
    }
    class EditNewContent extends GContentBase<EditNewContentParamDto> implements IGClientContent {
        prepareContent(options: EditNewContentParamDto): void;
    }
    /**
     * Dto parametrů pro selektor
     * @author pnovak
     * @since 482.1.0.456
     */
    interface DefaultSelectorParamDto<TRow = any> extends GContent {
        /**
         * klice pro view
         * @type {string[]}
         */
        dataKeys?: string[];
        /**
         * Text při načítání selektoru
         * @type {string}
         */
        preloaderText?: string;
        /**
         * Vlastnosti gridu
         * @type {GGridOptions}
         */
        gridOpts?: GGridOptions<TRow>;
        /**
         * Grid formát selektoru
         * @type {any}
         */
        gridFormat: Gordic.Data.GridFormat<TRow>;
        /**
         * Vlastnosti filtr panelu
         * @type {IGFilterPanelOptions}
         */
        filterOpts?: Gordic.Data.Selectors.IGDefaultSelectorFilterOpts<TRow>;
        /**
         * Předvyplněná hodnota ve vyhledávacím políčku v selektoru
         * @type {string}
         */
        searchText?: string;
        /**
         * Handler pro profiltrování serverových filtrů
         * @type {(serverFilters: ObjectLiteral<any>)}
         * @default > ObjectLiteral<any>
         */
        serverFiltersHandler?: (serverFilters: ObjectLiteral<any>) => ObjectLiteral<any>;
        /**
         * Vlastnosti subtasku
         * @type {GSubTasksOptions}
         */
        subTaskOpts?: GSubtasksOptions;
        /**
         * Data
         * @type {TRow}
         */
        data: Gordic.Data.Readers.Base<TRow> | JQuery.Promise<TRow[]> | Gordic.Data.View<TRow> | TRow[] | ((...args: any[]) => TRow[]) | JQuery.Promise<Gordic.Data.View<TRow>>;
        /**
         * Serverové filtry
         * @type {ObjectLiteral<any>}
         */
        serverFilters?: ObjectLiteral<any>;
        /**
         * Příznak, zda lze vybrat prázdný záznam
         * @type {boolean}
         */
        canClearSelectedValue?: boolean;
        /**
         * Má oblíbené položky
         */
        hasFavorite?: boolean;
        /**
         * Objekt pro rozsireni komponent
         */
        props?: ObjectLiteral<any> | null;
        preselectValue?: null | TRow | TRow[];
    }
    interface DefaultContentParamDto<TRow = any> extends DefaultSelectorParamDto<TRow> {
        /**
          * Vlastnosti gridu
          * @type {GGridOptions}
          */
        gridOpts: GGridOptions<TRow>;
        /**
         * Handler pro profiltrování serverových filtrů
         * @type {(serverFilters: ObjectLiteral<any>)}
         * @default > ObjectLiteral<any>
         */
        serverFiltersHandler: (serverFilters: ObjectLiteral<any>) => ObjectLiteral<any>;
    }
    class DefaultContent<TRow = any> extends GContentBase<DefaultContentParamDto> implements IGClientContent {
        /**
         * Filtry, které nelze měnit
         * @type {ObjectLiteral<any>}
         */
        private readOnlyFilters;
        /**
         * Akce pro výběr ze selektoru
         * @type {GAction}
         */
        private choiceAction;
        /**
         * Aktuálně použité filtry
         * @type {ObjectLiteral<any>}
         */
        actualFilters: ObjectLiteral<any>;
        /**
         * Subtasky
         * @type {HTMLElement}
         */
        subTasks: JQuery<HTMLElement>;
        /**
        * Grid
        * @type {HTMLElement}
        */
        grid: JQuery<HTMLElement>;
        /**
         * filter procesor na oblibene polozky
         */
        favoriteProcessor?: Gordic.Data.SortProcessor<TRow>;
        /**
         * data z uzivatelskeho nastaveni pro oblibene zaznamy
         */
        private favoriteFromUserSettings?;
        /**
         * Výsledek z celého selektroru
         * @type {TRow | TRow[] | JQuery.Promise<TRow> | null | undefined}
         */
        dialogResult: TRow | TRow[] | JQuery.Promise<TRow> | null | undefined;
        private loadingDataPromise?;
        prepareContent(options: DefaultSelectorParamDto<TRow>): void;
        /**
         * Nastaveni dialog kontektu pro menuBar
         */
        private setDialogContext;
        /**
         * Nastavení command baru
         */
        private defaultCommandBar;
        setFavorite(isFavorite: boolean): void;
        createGrid(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        /**
         * Metoda na vrácení výsledku a zavření dialogu
         * @param {TRow} [data]
         */
        private returnResult;
        /**
         * Vraci vyber gridu, kdyz je multi, tak vraci pole, kdyz neni, tak vraci objekt
         */
        private getGridSelection;
        /**
         * Na datovy zdroj se aplikuji filtry
         */
        private filterData;
        private closing;
        /**
         * vraci promise dat, data muzou byt reader, promise, funkce, pole
         */
        private getData;
        setData(data: Gordic.Data.Readers.Base<TRow> | JQuery.Promise<TRow[]> | Gordic.Data.View<TRow> | TRow[] | ((...args: any[]) => TRow[]) | JQuery.Promise<Gordic.Data.View<TRow>>): void;
        clearLoadedData(): void;
        filterDataAndRefresh(filterForm?: JQuery, forceReload?: boolean): void;
    }
}
