declare namespace Gordic.Gui.WebApp {
    interface MailBaseDto {
        entryID?: string | null;
        senderName?: string | null;
        subject?: string | null;
        to?: string | null;
        body?: string | null;
        receivedTime?: string | null;
    }
    const enum MailBaseDtoNames {
        entryID = "entryID",
        senderName = "senderName",
        subject = "subject",
        to = "to",
        body = "body",
        receivedTime = "receivedTime"
    }
    const enum MailBaseDtoFragments {
        entryID = "*",
        senderName = "*",
        subject = "*",
        to = "*",
        body = "*",
        receivedTime = "*"
    }
    const enum MailBaseDtoTypes {
        entryID = "string",
        senderName = "string",
        subject = "string",
        to = "string",
        body = "string",
        receivedTime = "string"
    }
    /**DTO pro informace o mailu*/
    interface MailInfoDto extends MailBaseDto {
        isCorrupted?: boolean | null;
        index: number | null | undefined;
        hasAnyAttachment?: boolean | null;
    }
    const enum MailInfoDtoNames {
        isCorrupted = "isCorrupted",
        index = "index",
        hasAnyAttachment = "hasAnyAttachment"
    }
    const enum MailInfoDtoFragments {
        isCorrupted = "*",
        index = "*",
        hasAnyAttachment = "*"
    }
    const enum MailInfoDtoTypes {
        isCorrupted = "boolean",
        index = "number",
        hasAnyAttachment = "boolean"
    }
    interface AttachmentInfo {
        fileName?: string | null;
        fileContent?: string | null;
    }
    const enum AttachmentInfoNames {
        fileName = "fileName",
        fileContent = "fileContent"
    }
    const enum AttachmentInfoFragments {
        fileName = "*",
        fileContent = "*"
    }
    const enum AttachmentInfoTypes {
        fileName = "string",
        fileContent = "string"
    }
    /**Obsah mailu*/
    interface MailContentDto extends MailBaseDto {
        /**Emailová adresa*/
        from?: string | null;
        /**Emailová adresa*/
        toEmail?: string | null;
        /**Emailová adresa*/
        cc?: string | null;
        /**html body*/
        htmlBody?: string | null;
        /**format tela mailu*/
        bodyFormat?: string | null;
        attachments?: AttachmentInfo[] | null;
    }
    const enum MailContentDtoNames {
        from = "from",
        toEmail = "toEmail",
        cc = "cc",
        htmlBody = "htmlBody",
        bodyFormat = "bodyFormat",
        attachments = "attachments"
    }
    const enum MailContentDtoFragments {
        from = "*",
        toEmail = "*",
        cc = "*",
        htmlBody = "*",
        bodyFormat = "*",
        attachments = "*"
    }
    const enum MailContentDtoTypes {
        from = "string",
        toEmail = "string",
        cc = "string",
        htmlBody = "string",
        bodyFormat = "string",
        attachments = "Gordic.Gbe.NativeClient.AttachmentInfo[]"
    }
    interface MailFolderDto {
        isSuperior?: boolean | null;
        folderName?: string | null;
        folderPath?: string | null;
    }
    const enum MailFolderDtoNames {
        isSuperior = "isSuperior",
        folderName = "folderName",
        folderPath = "folderPath"
    }
    const enum MailFolderDtoFragments {
        isSuperior = "*",
        folderName = "*",
        folderPath = "*"
    }
    const enum MailFolderDtoTypes {
        isSuperior = "boolean",
        folderName = "string",
        folderPath = "string"
    }
    interface GForgottenFileDto {
        /** datum změny*/
        date?: string | null;
        /**přípona */
        extension?: string | null;
        /** jmeno souboru*/
        fileName?: string | null;
    }
    const enum GForgottenFileDtoNames {
        isSuperior = "isSuperior",
        folderName = "folderName",
        folderPath = "folderPath"
    }
    const enum GForgottenFileDtoFragments {
        isSuperior = "*",
        folderName = "*",
        folderPath = "*"
    }
    const enum GForgottenFileDtoTypes {
        isSuperior = "boolean",
        folderName = "string",
        folderPath = "string"
    }
}
interface StateOfGBExtension {
    state: VersionStateEnum;
    extensionVersion: string;
    webVersion: string;
}
declare interface StateOfExtension {
    "Gordic AxSecurity"?: "NotSupported" | boolean;
    "Gordic Browser Extension"?: StateOfGBExtension;
    "Ax2"?: "NotSupported" | boolean;
    "Microsoft.XMLHTTP"?: "NotSupported" | boolean;
}
interface SignResultDto {
    fileName?: string;
    filePath: string;
    signature?: string | null;
    timestamp?: string | null;
    isSigned?: boolean;
    hasTS?: boolean;
    fromBase64?: boolean;
    ctx?: object;
    config?: SignedConfig | null;
    signedFI?: Gordic.General.ApplicationInterface.GFileInfoDto | null;
}
interface GBrowserExtrasMethodsDefination {
    getExtensionVersion(isTest?: object): ExtensionVersion | boolean | StateOfExtension;
    parseStateOfExtension(state?: IGExtensionResultDto<StateOfGBExtension> | object, operation?: OperationsEnum | null, extensionVersion?: ExtensionVersion): boolean | JQueryPromise<StateOfExtension> | JQuery.Promise<ExtensionVersion, {
        reason: string;
        type: string;
    }>;
    fullscreen(isTest?: object): void | boolean;
    onFullscreenChanged(evHandler: (this: null, ev: Element) => void | object): void | boolean;
    testCommunication(requiredOperation: OperationsEnum | null | object): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    canOpenFile(fileName: string | object): boolean | JQuery.Promise<boolean, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    documentOpen(filePath: string | object, isForUpload?: boolean): JQuery.Promise<void, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentSaveOpenLocal(fileName: string | object, content?: string, notifyDelegate?: Function, isForUpload?: boolean, customDto?: any): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentReadLocal(filePath: string | object): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentReadLocalST(filePath: string | object, boundary: any, signature: any, tstamp: any, isForUpload?: boolean): JQuery.Promise<FormData, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentPluginUpload(url: string | object, content?: FormData, headers?: object): JQuery.Promise<any> | boolean | JQueryPromise<StateOfExtension>;
    documentPluginDelete(filePath: string | object): JQuery.Promise<boolean, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentSave(fileName: string | object, content?: string, isForUpload?: boolean, customDto?: any): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getUploadHeaders(boundary: any, fileName?: string): object | boolean | JQueryPromise<StateOfExtension>;
    getFileSize(l_sTmpFilename: string | object): JQuery.Promise<number, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentLoad(path: string | object, isForUpload?: boolean): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    print(path: string | object): JQuery.Promise<boolean, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    showPrintDialog(path: string | object): JQuery.Promise<boolean, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getForgottenFileList(isTest?: object): JQuery.Promise<Gordic.Gui.WebApp.GForgottenFileDto[]> | boolean | JQueryPromise<StateOfExtension>;
    refreshEvidence(fileName: string | object): JQuery.Promise<void, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    clearForgottenFileList(removeFromTemp?: boolean | object): boolean | JQuery.Promise<void, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    getForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | object, forceUpload?: boolean): boolean | JQuery.Promise<string, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    openForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | object): boolean | JQuery.Promise<string, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    moveForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | object): boolean | JQuery.Promise<string, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    deleteForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | object): boolean | JQuery.Promise<string, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    documentMakeSignatureTimeStamp(filePath: string | object, makeSig?: boolean, makeTStamp?: boolean, fileName?: string, saveOnClient?: boolean, signer?: Gordic.Gui.WebApp.BrowserAddonParent | object, ctx?: object): JQuery.Promise<SignResultDto, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentSign(configDto: Gordic.Support.Sign.GSignCreateConfig | object, signDelegate?: any): JQuery.Promise<SignedConfig, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    sign(configDto: Gordic.Support.Sign.GSignCreateConfig | Gordic.Security.Service.GSignMinimumConfig | object): JQuery.Promise<SignedConfig, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getAllCerts(certParam?: object | string): JQuery.Promise<Gordic.Security.Service.GCertificateChain[], IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getOutlookAdressDir(isTest?: object): JQuery.Promise<Gordic.Gui.WebApp.MailFolderDto[], IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getOutlookMailsList(index: number | object, currentfolder?: string, isRootFolder?: "0" | "1"): JQuery.Promise<{
        folderName: string;
        mailsInfo: Gordic.Gui.WebApp.MailInfoDto[];
    }, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getOutlookMail(index: number | object, currentfolder?: string, isRootFolder?: "0" | "1"): JQuery.Promise<Gordic.Gui.WebApp.MailContentDto, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    sendOutlookMail(emailSettings: Gordic.Gui.WebApp.MailSettingsDto): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
}
interface GBrowserExtrasMethods extends GBrowserExtrasMethodsDefination {
    getExtensionVersion(isTest?: object): ExtensionVersion;
    parseStateOfExtension(state: IGExtensionResultDto<StateOfGBExtension>, operation?: OperationsEnum | null, extensionVersion?: ExtensionVersion): JQuery.Promise<ExtensionVersion, {
        reason: string;
        type: string;
    }>;
    fullscreen(): void;
    onFullscreenChanged(evHandler: (this: null, ev: Element) => void): void;
    testCommunication(requiredOperation: OperationsEnum | null): JQuery.Promise<string, IGReasonResponse>;
    getOpenDocumentTimeout(): number;
    canOpenFile(fileName: string): JQuery.Promise<boolean, IGReasonResponse>;
    documentOpen(filePath: string, isForUpload?: boolean): JQuery.Promise<void, IGReasonResponse>;
    documentSaveOpenLocal(fileName: string, content: string, notifyDelegate?: Function, isForUpload?: boolean, customDto?: any): JQuery.Promise<string, IGReasonResponse>;
    documentReadLocal(filePath: string): JQuery.Promise<string, IGReasonResponse>;
    documentReadLocalST(filePath: string, boundary: any, signature: any, tstamp: any, isForUpload?: boolean): JQuery.Promise<FormData, IGReasonResponse>;
    documentPluginUpload(url: string, content: FormData, headers: object): JQuery.Promise<any>;
    documentPluginDelete(filePath: string): JQuery.Promise<boolean, IGReasonResponse>;
    documentSave(fileName: string, content: string, isForUpload?: boolean, customDto?: any): JQuery.Promise<string, IGReasonResponse>;
    getUploadHeaders(boundary: any, fileName: string): object;
    getFileSize(l_sTmpFilename: string): JQuery.Promise<number, IGReasonResponse>;
    documentLoad(path: string, isForUpload?: boolean): JQuery.Promise<string, IGReasonResponse>;
    print(path: string | object): JQuery.Promise<boolean, IGReasonResponse>;
    showPrintDialog(path: string | object): JQuery.Promise<boolean, IGReasonResponse>;
    getForgottenFileList(): JQuery.Promise<Gordic.Gui.WebApp.GForgottenFileDto[]>;
    refreshEvidence(fileName: string | object): JQuery.Promise<void, IGReasonResponse>;
    clearForgottenFileList(removeFromTemp?: boolean): JQuery.Promise<void, IGReasonResponse>;
    getForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto, forceUpload?: boolean): JQuery.Promise<string, IGReasonResponse>;
    openForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto): JQuery.Promise<string, IGReasonResponse>;
    moveForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto): JQuery.Promise<string, IGReasonResponse>;
    deleteForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto): JQuery.Promise<string, IGReasonResponse>;
    documentMakeSignatureTimeStamp(filePath: string, makeSig: boolean, makeTStamp: boolean, fileName: string, saveOnClient: boolean, signer: Gordic.Gui.WebApp.BrowserAddonParent | object, ctx: object): JQuery.Promise<SignResultDto, IGReasonResponse>;
    documentSign(configDto: Gordic.Support.Sign.GSignCreateConfig, signDelegate: any): JQuery.Promise<SignedConfig, IGReasonResponse>;
    sign(configDto: Gordic.Support.Sign.GSignCreateConfig | Gordic.Security.Service.GSignMinimumConfig): JQuery.Promise<SignedConfig, IGReasonResponse>;
    getAllCerts(certParam: string): JQuery.Promise<Gordic.Security.Service.GCertificateChain[], IGReasonResponse>;
    getOutlookAdressDir(): JQuery.Promise<Gordic.Gui.WebApp.MailFolderDto[], IGReasonResponse>;
    getOutlookMailsList(index: number, currentfolder: string, isRootFolder: "0" | "1"): JQuery.Promise<{
        folderName: string;
        mailsInfo: Gordic.Gui.WebApp.MailInfoDto[];
    }, IGReasonResponse>;
    getOutlookMail(index: number, currentfolder: string, isRootFolder: "0" | "1"): JQuery.Promise<Gordic.Gui.WebApp.MailContentDto, IGReasonResponse>;
    sendOutlookMail(emailSettings: Gordic.Gui.WebApp.MailSettingsDto): JQuery.Promise<string, IGReasonResponse>;
    getGuideTestForms(content: GContent, operation: OperationsEnum): Gordic.Forms.Form;
    getGuideInstallForms(downloadMSILink: string): Gordic.Forms.Form;
}
declare class GBrowserExtrasClass implements GBrowserExtrasMethods {
    private browserExtrasApp;
    static isTest: {};
    static softCheck: {};
    static hardCheck: {};
    private _ignoredGE;
    set ignoreGordicExtensions(isIgnored: boolean);
    get ignoreGordicExtensions(): boolean;
    static getState: {};
    private _logger;
    get logger(): Gordic.Diagnostics.GLog;
    private prepareInputArguments;
    _lastMessage: string;
    getLastMessage(): string;
    getGuideTestForms(content: GContent, operation?: string | null): Gordic.Forms.Form;
    getGuideInstallForms(downloadMSILink: string): Gordic.Forms.Form;
    /**
     * Dle moznosti prohlizece otestuje, zda je dana metoda podporovana. Pokud vrati false, lze posledni chybu nacist pomoci metody 'getLastMessage()'
     * @param {any} args String nebo pole stringu. V pripade pole u prvni metody, ktera neni podporovana, skonci testovani.
     * @returns {boolean} True, je-li metoda podporovana prohlizecem.
     */
    isSupported<T extends keyof GBrowserExtrasMethodsDefination>(args: T | T[]): boolean;
    checkMethod<T extends keyof GBrowserExtrasMethodsDefination>(args: T | T[], softCheck?: boolean): JQueryPromise<any>;
    isSupportedPromise<T extends keyof GBrowserExtrasMethodsDefination>(args: T | T[]): JQueryPromise<boolean>;
    getSupportedState<T extends keyof GBrowserExtrasMethodsDefination>(args: T | T[]): JQuery.Promise<ObjectLiteral<StateOfExtension>>;
    testCommunication(requiredOperation?: OperationsEnum | null): JQuery.Promise<string, IGReasonResponse>;
    getExtensionVersion(): ExtensionVersion;
    parseStateOfExtension(state: IGExtensionResultDto<StateOfGBExtension>, operation?: OperationsEnum | null, extensionVersion?: ExtensionVersion): JQuery.Promise<ExtensionVersion, {
        reason: string;
        type: string;
    }>;
    fullscreen(): void;
    onFullscreenChanged(evHandler: any): void;
    getOpenDocumentTimeout(): number;
    /**
    * Zjisti, zda je mozne otevrit program s danym jmenem
    * @param {string} fileName jmeno oteviraneho souboru
    * @returns {boolean} true = existuje asociovany program
    */
    canOpenFile(fileName: string): JQuery.Promise<boolean, IGReasonResponse>;
    documentOpen(filePath: string, isForUpload?: boolean): JQuery.Promise<void, IGReasonResponse>;
    /**
     * Ulozi dokument lokalne a otevre jej v asociovanem programu
     * @param {string} fileName Nazev souboru vc. pripony
     * @param {string} content Obsah souboru (data)
     * @returns {JQueryPromise<string>} Cesta k souboru (lokalni)
     */
    documentSaveOpenLocal(fileName: string, content: string, notifyDelegate?: Function, isForUpload?: boolean, customDto?: any): JQuery.Promise<string, IGReasonResponse>;
    print(path: string | object): JQuery.Promise<boolean, IGReasonResponse>;
    showPrintDialog(path: string | object): JQuery.Promise<boolean, IGReasonResponse>;
    getForgottenFileList(): JQuery.Promise<Gordic.Gui.WebApp.GForgottenFileDto[]>;
    refreshEvidence(fileName: string | object): JQuery.Promise<void, IGReasonResponse>;
    clearForgottenFileList(removeFromTemp?: boolean): JQuery.Promise<void, IGReasonResponse, any>;
    getForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto, forceUpload?: boolean | undefined): JQuery.Promise<string, IGReasonResponse, any>;
    openForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto): JQuery.Promise<string, IGReasonResponse, any>;
    moveForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto): JQuery.Promise<string, IGReasonResponse, any>;
    deleteForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto): JQuery.Promise<string, IGReasonResponse>;
    /**
     * Nacte obsah souboru
     * @param {string} filePath cesta k souboru
     * @returns {string} Base64 string
     */
    documentReadLocal(filePath: string): JQuery.Promise<string, IGReasonResponse>;
    /**
      * Vrací příznak, že je soubor otevřený nebo ne
      *
      * @param {string} filePath cesta k souboru
      * @returns {boolean}
      */
    documentIsOpen(filePath: string): JQuery.Promise<boolean>;
    /**
     * TODO
     *
     * @param {any} filePath
     * @param {any} boundary
     * @param {any} signature
     * @param {any} tstamp
     */
    documentReadLocalST(filePath: string, boundary: any, signature: any, tstamp: any, isForUpload?: boolean): JQuery.Promise<FormData, IGReasonResponse>;
    /**
     * Provede upload z pluginu
     * @param {string} url URL na poz. WS
     * @param {string} content Obsah souboru
     * @param {object} headers Hlavicky, anon. objekt, priklad: { "Content-Type": "multipart/form-data;" }
     * @returns {JQuery.Promise<any>} Promise
     */
    documentPluginUpload(url: string, content: FormData, headers: object): JQuery.Promise<any>;
    /**
     * Smaze soubor z klientskeho pocitace s pouzitim pluginu
     * @param {string} filePath Cesta k souboru
     * @returns {boolean} true - smazano, false - ne
     * TODO
     */
    documentPluginDelete(filePath: string): JQuery.Promise<boolean, IGReasonResponse>;
    /**
     * Ulozi dokument lokalne
     * @param {string} fileName Nazev souboru vc. pripony
     * @param {string} content Obsah souboru (data)
     * @returns {JQuery.Promise<string>} Cesta k souboru (lokalni)
     */
    documentSave(fileName: string, content: string, isForUpload?: boolean, customDto?: any): JQuery.Promise<string, IGReasonResponse>;
    /**
     * Metoda vrací objekt pro request na upload
     * @param {any} boundary data
     * @param {string} fileName Jmeno souboru
     * @returns {ObjectLiteral<string>} Objekt rozšiřující request
     */
    getUploadHeaders(boundary: any, fileName: string): object;
    /**
     * Zjištění velikosti souboru podle zadané cesty
     *
     * @param {string} l_sTmpFilename Cesta k souboru
     * @returns {number} Velikost zjistovaného souboru
     * TODO
     */
    getFileSize(l_sTmpFilename: string): JQuery.Promise<number, IGReasonResponse>;
    /**
     * Načtení souboru podle zadané cesty
     *
     * @param {string} path Cesta k souboru
     * @returns {JQuery.Promise<string, IGReasonResponse>} Obsah souboru
     */
    documentLoad(path: string, isForUpload?: boolean): JQuery.Promise<string, IGReasonResponse>;
    /**
     * Podepsani a orazitkovani souboru
     * @param {string} filePath Cesta k souboru
     * @param {boolean} makeSig Ma byt soubor podepsan?
     * @param {boolean} makeTStamp Ma byt soubor orazitkovan?
     * @param {string} fileName
     * @param {object} signer
     * @param {object} ctx Kontext pro pripad potreby
     * @returns {JQuery.Promise<any>} Vraci promise s objektem: { filePath: filePath, signature: null, timestamp: null, ctx: ctx }
     */
    documentMakeSignatureTimeStamp(filePath: string, makeSig: boolean, makeTStamp: boolean, fileName: string, saveOnClient: boolean, signer: object, ctx: object): JQuery.Promise<SignResultDto, IGReasonResponse>;
    /**
     * documentSign
     *
     * @param {Gordic.Support.Sign.GSignCreateConfig} configDto
     * @param {any} signDelegate
     * @returns {JQuery.Promise<Gordic.Support.Sign.GSignCreateConfig}
     */
    documentSign(configDto: Gordic.Support.Sign.GSignCreateConfig, signDelegate: any): JQuery.Promise<Gordic.Support.Sign.GSignCreateConfig, IGReasonResponse>;
    /**
     * Klientské podepsání
     * @param {GSignCreateConfig | Gordic.Security.Service.GSignMinimumConfig} configDto konfigurační DTO
     * @returns {JQuery.Promise<Gordic.Support.Sign.GSignCreateConfig, IGReasonResponse>} Výsledek podepsání
     */
    sign(configDto: Gordic.Support.Sign.GSignCreateConfig | Gordic.Security.Service.GSignMinimumConfig): JQuery.Promise<Gordic.Support.Sign.GSignCreateConfig, IGReasonResponse>;
    /**
    * Získání všech klientských certifikátů
    * @param {string} certParam DB parametr pro určení chování při načítání certifikátů - gin_nabcergbe
    * @returns {JQuery.Promise<Gordic.Security.Service.GCertificate[], IGReasonResponse>>} Klientské certifikáty
    */
    getAllCerts(certParam: string): JQuery.Promise<Gordic.Security.Service.GCertificateChain[], IGReasonResponse>;
    /**
    * Metoda načte adresáře z aplikace Outlook
    * @returns {JQuery.Promise<Gordic.Gui.WebApp.MailFolderDto[], IGReasonResponse>}
    */
    getOutlookAdressDir(): JQuery.Promise<Gordic.Gui.WebApp.MailFolderDto[], IGReasonResponse>;
    /**
     * Metoda pro načtení všech emailu z adresáře
     * @param {number} index Index nadřazeného adresáře (Dorucena posta obvykle 6)
     * @param {string} currentfolder Název adresáře z outlooku
     * @param {"0" | "1"} isRootFolder Příznak zda se jedná o nadřazený adresář (1) nebo není (0)
     * @returns {JQuery.Promise<{ folderName: string, mailsInfo: Gordic.Gui.WebApp.MailInfoDto[] }, IGReasonResponse>} Objekt s informacemi o načtených emailech
     */
    getOutlookMailsList(index: number, currentfolder: string, isRootFolder: "0" | "1"): JQuery.Promise<{
        folderName: string;
        mailsInfo: Gordic.Gui.WebApp.MailInfoDto[];
    }, IGReasonResponse>;
    /**
     * Metoda pro načtení informací z požadovaného mailu
     * @param {number} index Pořadové číslo emailu (od 1)
     * @param {string} currentfolder Název adresáře z outlooku
     * @param {"0" | "1"} isRootFolder Příznak zda se jedná o nadřazený adresář (1) nebo není (0)
     * @returns {JQuery.Promise<Gordic.Gui.WebApp.MailContentDto, IGReasonResponse>} Načtený email
     */
    getOutlookMail(index: number, currentfolder: string, isRootFolder: "0" | "1"): JQuery.Promise<Gordic.Gui.WebApp.MailContentDto, IGReasonResponse>;
    /**
     * Metoda pro poslání emailu přes EMAPI
     *
     * @param {Gordic.Gui.WebApp.MailSettingsDto} emailSettings Dto pro nastavení emailu
     * @returns {JQuery.Promise<string, IGReasonResponse>} Vysledek operace
     */
    sendOutlookMail(emailSettings: Gordic.Gui.WebApp.MailSettingsDto): JQuery.Promise<string, IGReasonResponse>;
    gbeISSuported(): boolean;
    isExtensionSupported(): boolean;
}
declare enum EBrowserTypes {
    IE = 0,
    OldEdge = 1,
    ChromiumEdge = 2,
    Firefox = 3,
    Chrome = 4,
    Safari = 5,
    Opera = 6,
    Undetected = 7
}
type mailsList = {
    folderName: string;
    mailsInfo: Gordic.Gui.WebApp.MailInfoDto[];
};
type eventObject<T2> = {
    type: "softCheck" | "hardCheck" | "run";
    operation: T2;
    needUpdate?: boolean;
};
type eventObjectResult<T, T2> = {
    state: "notHandled" | "resolved" | "handling";
    result?: T;
    resultPromise?: JQuery.Promise<T, IGReasonResponse>;
    needUpdate: boolean;
} & eventObject<T2>;
declare class GBrowserExtrasWebAppClass implements GBrowserExtrasMethodsDefination {
    private _axSec;
    private _ax2;
    private _browserExtension;
    private _newAx;
    private _logger;
    private _ignoredGordicExtensions;
    set ignoreGordicExtensions(isIgnored: boolean);
    get logger(): Gordic.Diagnostics.GLog;
    private logReason;
    getBrowserType(): EBrowserTypes;
    private activeXPluginUploadSupported;
    private activeXCryptoSupported;
    private activeXAx2Supported;
    private browserExtensionIsSupported;
    gbeISSuported(): boolean;
    isExtensionSupported(): boolean;
    private activeXPluginUploadCreate;
    private activeXCryptoCreate;
    private activeXAx2Create;
    private createBrowserExtensionManager;
    private _newActiveXCryptoCreate;
    private _newActiveXSupported;
    private isSupported;
    private getCheckVersionPromise;
    private getSupportState;
    waitForSupportedPromise(): JQueryPromise<boolean>;
    triggerSupportEvent<T, T2 extends keyof GBrowserExtrasMethodsDefination = keyof GBrowserExtrasMethodsDefination>(obj: eventObject<T2>): {
        handlePromise?: JQuery.Promise<T, IGReasonResponse>;
    };
    processArgument<T extends keyof GBrowserExtrasMethodsDefination>(methodName: T, argument: typeof GBrowserExtrasClass.isTest | typeof GBrowserExtrasClass.softCheck | typeof GBrowserExtrasClass.hardCheck | typeof GBrowserExtrasClass.getState): boolean | JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
    testCommunication(requiredOperation?: OperationsEnum | null | object): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    /**
     * getRejectObject
     * @param {string} methodName Nazev metody
     * @param {string} operation provadena operace
     * @returns {{reason:string, handled: boolean, type: EReasonType}} objekt pro reject
     */
    getRejectObject<T extends keyof GBrowserExtrasMethodsDefination>(methodName: T, operation: OperationsEnum | null): {
        reason: string;
        handled: boolean;
        type: EReasonType.extensionNotSupported | EReasonType.common | EReasonType.extensionNotExists | EReasonType.extensionComError;
        operation: OperationsEnum | null;
    };
    /**
     * Ziská stav doplňku
     */
    getExtensionVersion(isTest?: object): ExtensionVersion | boolean;
    parseStateOfExtension(state?: IGExtensionResultDto<StateOfGBExtension> | object, operation?: OperationsEnum | null, extensionVersion?: ExtensionVersion): boolean | JQueryPromise<StateOfExtension> | JQuery.Promise<ExtensionVersion, {
        reason: string;
        type: string;
    }>;
    fullscreen(isTest?: object): void | boolean;
    onFullscreenChanged(evHandler: (this: null, ev: Element) => void | object): void | boolean;
    canOpenFile(fileName: string | object): boolean | JQuery.Promise<boolean, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    documentOpen(filePath: string | object, isForUpload?: boolean): JQuery.Promise<void, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentSaveOpenLocal(fileName: string | object, content?: string, notifyDelegate?: Function, isForUpload?: boolean, customDto?: any): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentReadLocal(filePath: string | object, isForUpload?: boolean): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentReadLocalST(filePath: string | object, boundary: any, signature: any, tstamp: any, isForUpload?: boolean): JQuery.Promise<FormData, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentPluginUpload(url: string | object, content?: FormData, headers?: object): JQuery.Promise<any> | boolean | JQueryPromise<StateOfExtension>;
    documentPluginDelete(filePath: string | object): JQuery.Promise<boolean, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentSave(fileName: string | object, content?: string, isForUpload?: boolean, customDto?: any): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getUploadHeaders(boundary: any | object, fileName?: string): object | boolean | JQueryPromise<StateOfExtension>;
    getFileSize(l_sTmpFilename: string | object): JQuery.Promise<number, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentLoad(path: string | object, isForUpload?: boolean): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getForgottenFileList(isTest?: object): boolean | JQuery.Promise<Gordic.Gui.WebApp.GForgottenFileDto[], IGReasonResponse> | JQueryPromise<StateOfExtension>;
    clearForgottenFileList(removeFromTemp?: boolean | object): boolean | JQuery.Promise<void, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    refreshEvidence(fileName: string | object): boolean | JQuery.Promise<void, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    runForgottenMethod(methodName: keyof GBrowserExtrasMethodsDefination, forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | object): boolean | JQuery.Promise<string, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    getForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | object, forceUpload?: boolean): boolean | JQuery.Promise<string, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    openForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | object): boolean | JQuery.Promise<string, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    moveForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | object): boolean | JQuery.Promise<string, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    deleteForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | object): boolean | JQuery.Promise<string, IGReasonResponse> | JQueryPromise<StateOfExtension>;
    print(path: string | object): boolean | JQuery.Promise<boolean, IGReasonResponse, any> | JQueryPromise<StateOfExtension>;
    showPrintDialog(path: string | object): boolean | JQuery.Promise<boolean, IGReasonResponse, any> | JQueryPromise<StateOfExtension>;
    documentMakeSignatureTimeStamp(filePath: string | object, makeSig?: boolean, makeTStamp?: boolean, fileName?: string, saveOnClient?: boolean, signer?: SignerBase | {
        sign: (configDto: GSignCreateConfig | Gordic.Security.Service.GSignMinimumConfig | null) => JQuery.Promise<GSignCreateConfig, IGReasonExtensionDto>;
    }, ctx?: any): JQuery.Promise<SignResultDto, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    documentSign(configDto: Gordic.Support.Sign.GSignCreateConfig | object, signDelegate?: Function): JQuery.Promise<SignedConfig, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    sign(configDto: Gordic.Support.Sign.GSignCreateConfig | Gordic.Security.Service.GSignMinimumConfig | object): JQuery.Promise<SignedConfig, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getAllCerts(certParam?: object | string): JQuery.Promise<Gordic.Security.Service.GCertificateChain[], IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getOutlookAdressDir(isTest?: object): JQuery.Promise<Gordic.Gui.WebApp.MailFolderDto[], IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getOutlookMailsList(index: number | object, currentfolder?: string, isRootFolder?: "0" | "1"): JQuery.Promise<{
        folderName: string;
        mailsInfo: Gordic.Gui.WebApp.MailInfoDto[];
    }, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    getOutlookMail(index: number | object, currentfolder?: string, isRootFolder?: "0" | "1"): JQuery.Promise<Gordic.Gui.WebApp.MailContentDto, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
    sendOutlookMail(emailSettings: Gordic.Gui.WebApp.MailSettingsDto): JQuery.Promise<string, IGReasonResponse> | boolean | JQueryPromise<StateOfExtension>;
}
/**
 * GBrowserExtras - features browseru
 * --- !!!!! Důležité !!!!! ---
 * pro správné chování je potřeba obsloužit reject větev voláním metody Gordic.Gui.WebApp.Utils.showReasonFlash
 */
declare const GBrowserExtras: GBrowserExtrasClass;
interface GIEClient {
    Communicate(m_sRecievedMessage: string): string;
}
declare namespace Gordic.Gui.WebApp {
    /**
     * Enum operací
     */
    enum CheckOperation {
        /**
         * certifikaty
         */
        cert = 1,
        /**
         * podpisy
         */
        sign = 3,
        /**
         * otevreni souboru
         */
        openFile = 4,
        /**
         * ulozeni souboru
         */
        saveFile = 8,
        /**
         * prace se soubory
         */
        file = 12,
        /**
         * prace s maily
         */
        mail = 16,
        /**
         * vsechny
         */
        all = 31
    }
    /**
     * Mod zpracovani
     */
    enum CheckMode {
        /**
         * neznamy mod
         */
        unknown = 0,
        /**
         * zadna akce
         */
        none = 1,
        /**
         * pruvodce
         */
        guide = 2,
        /**
         * doporuceny pruvodce
         */
        suggestedGuide = 3,
        /**
         * notifikace
         */
        notification = 4,
        /**
         * vlastni osetreni
         */
        custom = 5
    }
    class FeatureServicesClass {
        static getOperationFromMethod(methodName: keyof GBrowserExtrasMethodsDefination): string;
        static getOperations(name: CheckOperation): string[];
        registerCustFeature(func: (ev: CustomEvent<eventObjectResult<any, keyof GBrowserExtrasMethodsDefination>>) => void): void;
        unregisterCustFeature(func: (ev: CustomEvent<eventObjectResult<any, keyof GBrowserExtrasMethodsDefination>>) => void): void;
        registerRunFunction(op: CheckOperation, func: (ev: CustomEvent<eventObjectResult<any, keyof GBrowserExtrasMethodsDefination>>) => void): void;
        registerRunFeature(cnt: GContent, op: CheckOperation, mode: CheckMode): void;
        private getNotification;
        registerCheckFeature(cnt: GContent, op: CheckOperation, mode: CheckMode): void;
        registerCheckFeatures(cnt: GContent, mode: CheckMode, features: string[]): void;
    }
    export const FeatureServices: FeatureServicesClass;
    export {};
}
declare namespace Gordic.Gui.Dialogs {
    /**
     * Otevře dialog změny hesla uživatele.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @file    Gordic.Gui.WebApp/Gin/Gui/GGuiDialogs.ts
     *
     * @param {{ input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDatovaZpravaIsdsInfoDlgInputParams> }} opt
     * @returns {'Gordic.Wfl.WebClient.GDatovaZpravaIsdsInfoDlg'}
     */
    function GZmenaHeslaDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebApp.GZmenaHeslaDlgInputParams | undefined>): JQuery.Promise<WebApp.GZmenaHeslaDlgReturnValue | undefined, OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog seznamu zástupů.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @file    Gordic.Gui.WebApp/Gin/Gui/GGuiDialogs.ts
     *
     * @param {{ input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDatovaZpravaIsdsInfoDlgInputParams> }} opt
     * @returns {'Gordic.Wfl.WebClient.GDatovaZpravaIsdsInfoDlg'}
     */
    function GSeznamZastupuDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebApp.GSeznamZastupuDlgInputParams | undefined>): JQuery.Promise<WebApp.GSeznamZastupuDlgReturnValue | undefined, OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog změny hesla uživatele.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @file    Gordic.Gui.WebApp/Gin/Gui/GGuiDialogs.ts
     *
     * @param {{ input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDatovaZpravaIsdsInfoDlgInputParams> }} opt
     * @returns {'Gordic.Wfl.WebClient.GDatovaZpravaIsdsInfoDlg'}
     */
    function GDetailZastupuDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebApp.GDetailZastupuDlgInputParams | undefined>): JQuery.Promise<WebApp.GDetailZastupuDlgReturnValue | undefined, OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog licence komponent třetích stran.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @file    Gordic.Gui.WebApp/Gin/Gui/GGuiDialogs.ts
     *
     * @param {{ input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDatovaZpravaIsdsInfoDlgInputParams> }} opt
     * @returns {'Gordic.Wfl.WebClient.GDatovaZpravaIsdsInfoDlg'}
     */
    function GLicenceKomponentDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebApp.GLicenceKomponentDlgInputParams | undefined>): JQuery.Promise<WebApp.GLicenceKomponentDlgReturnValue | undefined, OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog revizí.
     *
     * @author  TFeik
     * @date    17.07.2023
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebApp.GRevizeDlgInputParams | undefined>} input
     */
    function GRevizeDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebApp.GRevizeDlgInputParams | undefined>): JQuery.Promise<WebApp.GRevizeDlgReturnValue | undefined, OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog aktivace expertního režimu
     *
     * @author  VBlabla
     * @date    09.06.2025
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebApp.GExpertModeDlgInputParams | undefined>} input
     */
    function GExpertModeDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebApp.GExpertModeDlgInputParams | undefined>): JQuery.Promise<WebApp.GExpertModeDlgReturnValue | undefined, OpenDialogRejectType | undefined, any>;
}
declare namespace Gordic.Prefabs.Actions {
    /**
     * Názvy akcí, definovaných v PreAction. Název v enumu odpovídá volané funkci pro vytvoření akce.
     *
     * @author  TFeik
     * @date    19.11.2018
     * @since   480.1.0.202
     * @file    Gordic.Gui.WebControls/Scripts/prefabs/GActions.ts
     */
    enum Names {
        OtevritZmenaHesla = "actOtevritZmenaHesla",
        OtevritSeznamZastupu = "actOtevritSeznamZastupu",
        OtevritDetailZastupu = "actOtevritDetailZastupu",
        OtevritLicenceKomponent = "actLicenceKomponent",
        OtevritRevize = "actOtevritRevize"
    }
    /**
     * Otevře dialog pro změnu hesla.
     *
     * @author  TFeik
     * @date    23.10.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebApp.GZmenaHeslaDlgInputParams | undefined>} input
     * @returns {GActionParams}
     */
    function OtevritZmenaHesla(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebApp.GZmenaHeslaDlgInputParams | undefined>, Gui.WebApp.GZmenaHeslaDlgReturnValue | undefined>): GActionParams;
    /**
     * Otevře dialog seznamu zástupů.
     *
     * @author  TFeik
     * @date    23.10.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebApp.GSeznamZastupuDlgInputParams | undefined>} input
     * @returns {GActionParams}
     */
    function OtevritSeznamZastupu(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebApp.GSeznamZastupuDlgInputParams | undefined>, Gui.WebApp.GSeznamZastupuDlgReturnValue | undefined>): GActionParams;
    /**
     * Otevře dialog detailu zástupu.
     *
     * @author  TFeik
     * @date    23.10.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebApp.GDetailZastupuDlgInputParams>} input
     * @returns {GActionParams}
     */
    function OtevritDetailZastupu(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebApp.GDetailZastupuDlgInputParams>, Gui.WebApp.GDetailZastupuDlgReturnValue | undefined>): GActionParams;
    /**
     * Otevře dialog licencí komponent třetích stran.
     *
     * @author  TFeik
     * @date    23.10.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebApp.GLicenceKomponentDlgInputParams | undefined>} input
     * @returns {GActionParams}
     */
    function OtevritLicenceKomponent(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebApp.GLicenceKomponentDlgInputParams | undefined>, Gui.WebApp.GLicenceKomponentDlgReturnValue | undefined>): GActionParams;
    /**
     * Otevře dialog revizí instalovaných modulů.
     *
     * @author  TFeik
     * @date    18.07.2023
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebApp.GRevizeDlgInputParams | undefined>} input
     * @returns {GActionParams}
     */
    function OtevritRevize(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Gui.WebApp.GRevizeDlgInputParams | undefined>, Gui.WebApp.GRevizeDlgReturnValue | undefined>): GActionParams;
}
declare namespace Gordic.Gui.WebApp {
    /**
     * Datový typ itemu políčka
     *
     * @author  TFeik
     * @date    18.08.2022
     * @since   488.1.0.64
     */
    type UserAutoRunFieldData = Pick<GActionParamsDefObjBase, 'name' | 'caption' | 'icon' | 'tooltip'> & Pick<MenuParams, 'id'> & {
        /**
         * Caption včetně scopu.
         * @type {string}
         */
        captionWithScope?: string;
    };
    /**
     * Pomocná třída pro políčko s uživatelsky nastavitelné spouštěcí akce.
     *
     * @author  TFeik
     * @date    18.08.2022
     * @since   488.1.0.64
     */
    export class UserAutoRunField {
        /**
         * Identifikátor ikony.
         *
         * @author  TFeik
         * @date    22.08.2022
         */
        static readonly IconStateId = "actionIconState";
        /**
         * Vytvoří itemTemplate ikony selectoru.
         *
         * @author  TFeik
         * @date    18.08.2022
         *
         * @param {UserAutoRunFieldData} item
         * @returns {IconTemplate}
         */
        static selectorFormatIconTemplate(item: UserAutoRunFieldData): IconTemplate;
        /**
         * Vytvoří printable ikony selectoru.
         *
         * @author  TFeik
         * @date    18.08.2022
         *
         * @param {UserAutoRunFieldData} item
         * @returns {string}
         */
        static selectorFormatPrintable(item: UserAutoRunFieldData): string;
        /**
         * Vytvoří itemTemplate políčka včetně state ikony.
         *
         * @author  TFeik
         * @date    18.08.2022
         *
         * @param {JQuery<HTMLElement>} field
         * @param {UserAutoRunFieldData} item
         * @returns {string}
         */
        static itemTemplate(field: JQuery<HTMLElement>, item: UserAutoRunFieldData): string;
        /**
         * Vytvoří helperItemTemplate políčka.
         *
         * @author  TFeik
         * @date    24.08.2022
         *
         * @param {UserAutoRunFieldData} item
         * @returns {string}
         */
        static helperItemTemplate(item: UserAutoRunFieldData): string;
        /**
         * Přidá ikonu akce.
         *
         * @author  TFeik
         * @date    22.08.2022
         *
         * @param {JQuery<HTMLElement>} field
         * @param {UserAutoRunFieldData} item
         */
        static addState(field: JQuery<HTMLElement>, item: UserAutoRunFieldData): void;
        /**
         * Odebere ikonu akce.
         *
         * @author  TFeik
         * @date    22.08.2022
         *
         * @param {JQuery<HTMLElement>} field
         */
        static removeState(field: JQuery<HTMLElement>): void;
        /**
         * Vytvoří data políčka.
         *
         * @author  TFeik
         * @date    18.08.2022
         *
         * @returns {Data.View<UserAutoRunFieldData>}
         */
        static createActionsData(): Data.View<UserAutoRunFieldData>;
        /**
         * Spustí uživatelskou akci.
         *
         * @author  TFeik
         * @date    22.08.2022
         *
         * @param {JQuery<HTMLElement> | undefined | null} taklist
         * @param {ObjectLiteral<GAction>} actions
         * @param {string} actionId
         * @returns {boolean}
         */
        static runUserAction(taklist: JQuery<HTMLElement> | undefined | null, actions: ObjectLiteral<GAction>, actionId: string): boolean;
        /**
         * Najde menuParams dle id.
         *
         * @author  TFeik
         * @date    22.08.2022
         *
         * @param {MenuParams[] | undefined | null} menuParams
         * @param {string} actionId
         * @returns {MenuParams | undefined | null}
         */
        static getMenuParamsById(menuParams: MenuParams[] | undefined | null, actionId: string): MenuParams | undefined | null;
    }
    export {};
}
declare namespace Gordic.Gui.WebApp {
    /**
    * Simple parent for specific application
    *
    * @author Petr Horsák
    * @since
    */
    class GWebAppBaseSimpleExtension extends GContentBase {
        private customTaskList;
        private customBanner;
        prepareContentInit(): void;
        banner(element: JQuery<HTMLElement>): void;
        taskList(menuParams: MenuParams[]): void;
        startAction(name: any): void;
        private loadBackgroundImage;
        navigate(contentInitializer: any, inputParams: any, options: any): any;
    }
}
declare namespace Gordic.Components.Search {
    /**
    * Resolver for searching tasks
    *
    * @author Vlastimil Máca
    * @since
    */
    class GAppSearchResolver extends GSearchResolver {
        id: string;
        constructor(opts?: any);
    }
}
declare namespace Gordic.Gui.WebApp {
    interface IGAboutControlOptions {
        recordLogAct: GAction;
    }
    class GAboutControl extends GContentBase {
        helpPackageName: string;
        taskId: string;
        uid: string;
        appInfo: GAppInfoDto;
        documentation: GDocumentationItemDto[];
        appInfoTab: JQuery;
        debugTab: JQuery;
        documentationTab: JQuery;
        licenseTab: JQuery;
        header: JQuery;
        dokumentace: JQuery;
        recordLogAct: GAction;
        debugMaxCount: number;
        debugClickCounter: number;
        debugLastStarter: HTMLElement | null;
        private _srv;
        prepareContent(options: IGAboutControlOptions): void;
        private create488;
        private _startDebugMode;
        private _splitUrlFile;
        private _showDocumentation;
        private _checkDocumentation;
        private showNextDocumentation;
        private getFileName;
    }
}
declare namespace Gordic.Gui.WebApp {
    /**
     * GRevizeDlgInputParams
     *
     * @author  TFeik
     * @since   490.1.0.39
     * @date    17.17.2023
     */
    interface GRevizeDlgInputParams {
        SetGridIntoTab?: boolean;
        IsAutofitInParentElement?: boolean;
    }
    /**
     * GRevizeDlgReturnValue
     *
     * @author  TFeik
     * @since   490.1.0.39
     * @date    17.17.2023
     */
    interface GRevizeDlgReturnValue {
    }
    /**
     * GRevizeDlg
     *
     * @author  TFeik
     * @since   490.1.0.39
     * @date    17.17.2023
     */
    class GRevizeDlg extends GContentBase implements IGClientContent, GRevizeDlgInputParams {
        SetGridIntoTab?: boolean;
        IsAutofitInParentElement?: boolean;
        $Grid?: JQuery<HTMLElement>;
        /**
         * prepareContent
         *
         * @author  TFeik
         * @date    17.17.2023
         */
        prepareContent(): void;
        /**
         * createGrid
         *
         * @author  TFeik
         * @date    17.17.2023
         *
         * @returns {JQuery<HTMLElement>}
         */
        createGrid(): JQuery<HTMLElement>;
        /**
         * createActions
         *
         * @author  TFeik
         * @date    17.17.2023
         *
         * @returns {GAction[]}
         */
        createActions(): void;
        /**
         * createMenuBar
         *
         * @author  TFeik
         * @date    17.17.2023
         */
        createMenuBar(): void;
        /**
         * createMenuBarParams
         *
         * @author  TFeik
         * @date    01.09.2023
         */
        createMenuBarParams(): MenuParams[];
        /**
         * createCommandBar
         *
         * @author  TFeik
         * @date    17.17.2023
         */
        createCommandBar(): void;
        /**
         * saveRevisionToClipboard
         *
         * @author  TFeik
         * @date    17.17.2023
         *
         * @returns {JQuery.Promise<void>}
         */
        saveRevisionToClipboard(): JQuery.Promise<void>;
        /**
         * closing
         *
         * @author  TFeik
         * @date    17.17.2023
         *
         * @returns {JQueryPromise<GRevizeDlgReturnValue>}
         */
        closing(): JQueryPromise<GRevizeDlgReturnValue>;
    }
}
declare namespace Gordic.Gui.WebApp {
    /**
     * Diagnosticky prehled o stavu async. uloh
     *
     * @author bmartinek
     * @since 482.1.0.118
     */
    class GAsyncTaskViewer extends GContentBase implements IGClientContent {
        private grid;
        private view;
        private refreshAct;
        private copyToClipboardAct;
        private cancelAct;
        private cancelCleanAct;
        private cleanAct;
        private autoRefreshAct;
        title: string;
        prepareContent(): void;
        /**
         * Obnoveni seznamu
         *
         * @param {boolean} doSync - true = provede serverovy sync, false = pouze aktualizuje z GAsyncTaskManager.
         */
        refresh(doSync: boolean): void;
        closing(): void;
        private copyToClipboard;
        private getGridFormat;
        private getSeletedTask;
        private updateActionsState;
        private cancelCurrentTask;
        private tryCleanAnyStateTask;
        private cleanCurrentTask;
        private toggleAutoRefresh;
        static taskStateToReadableString(state: Gordic.Async.GTaskState): string;
    }
}
declare namespace Gordic.Gui.WebApp {
    class GManageTotp extends GContentBase {
        private model;
        private keyImage;
        title: string;
        className: string;
        onContentReady(): void;
        private createActions;
        private createMenuBar;
        private fillFields;
        private enableFields;
        private isModel;
        private containsKey;
        private viewKey;
        private enableKey;
        private disableKey;
        private createKey;
        private deleteKey;
        private testTotp;
        private verifyCode;
    }
}
declare namespace Gordic.Gui.WebApp {
    class GSignpost extends GContentBase {
        private menuParams;
        isAuthService: boolean;
        addOpenInNewTab: boolean;
        private caption;
        private breadcrumbCaption;
        private baseActionsArray;
        private signpostContent;
        private headerContent;
        private cntId;
        private userSettingsPath;
        prepareContent(): void;
        closing(): void;
        private initContent;
        private createActions;
        private createHeader;
        private createSearchForm;
        private createSignPostCnt;
        private createDashboard;
        createItems(actions: MenuParams[] | GAction[]): GKpiItemOptions[];
        _initResizeManager(): void;
        _uninitResizeManager(): void;
        private checkIfFavorite;
        private addOrRemoveFromFavorites;
        private reloadData;
    }
}
declare namespace Gordic.Gui.WebApp {
    interface IGSignpostSearchResolver {
        domainName: string;
        mainContent: string;
        actions: MenuParams[];
    }
    class GSignpostSearchResolver extends Gordic.Components.Search.GTaskSearchResolver {
        private options;
        constructor(opts: IGSignpostSearchResolver);
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
        };
        protected getTaskList(): MenuParams[];
        protected createDefaultAction(): GAction;
    }
}
declare namespace Gordic.Gui.WebApp {
    class DBParamsAll extends GContentBase {
        /**
         * gridDBParamsAll
         * @type {JQuery<HTMLElement>}
         */
        private gridDBParamsAll;
        /**
         * sidebarDBParamsAll
         * @type {JQuery<HTMLElement>}
         */
        private sidebarDBParamsAll;
        /**
         * initial
         * @type {boolean}
         * @default true
         */
        private initial;
        /**
         * previewDiv
         * @type {JQuery<HTMLElement>}
         */
        private previewDiv;
        onContentReady(): void;
        /**
         * createMenu
         */
        private createMenu;
        /**
         * otevritDetail
         *
         * @param {any} dbParam
         */
        private otevritDetail;
        /**
         * createGridDBParamsAll
         */
        private createGridDBParamsAll;
        private prepareFocus;
        /**
         * createSidebar - vytvoreni sidebaru s nahledem
         */
        private createSidebar;
        private createPreviewDiv;
        /** vytvořit panel */
        private createPanel;
        private loadPreview;
        private enablePreview;
        private showPreview;
        private closeDet;
    }
}
declare namespace Gordic.Gui.WebApp {
    /**
    * Vstupní parametry dialogu DBParamsDetail.
    *
    * @author  VBlabla
    * @date    19.03.2020
    */
    interface GDBParamsDetailInputParams {
        /**
         * Nazev DB parametru
         * @type {string}
         */
        Param?: string;
        /**
         * Uroven DB parametru
         * @type {string}
         */
        UrovenParam?: string;
        /**
         * Hodnota DB parametru
         * @type {string}
         */
        HodnotaParam?: string;
    }
    class DBParamsDetail extends GContentBase {
        private readonly DatovyModel;
        private readonly UrovenParam;
        private HodnotaParam;
        private ShowCommandBar;
        onContentReady(): void;
        /**
         * Vytvoreni definice formulare
         * @returns {Forms.Form} Form
         */
        private vytvorDefiniciFormulare;
        /**
         * Vytvoreni formulare
         * @param {any} DefiniceFormulare
         */
        private vytvorFormular;
        /**
         * Vytvoreni menubaru
         */
        private makeMenu;
        private closeDet;
    }
}
declare namespace Gordic.Gui.WebApp {
    /** Content pro zobrazení obsahu nápovědy */
    class GContextHelpArticle extends GContentBase {
        /** Vstupni GContextHelpDto s nápovědou, která se má zobrazit */
        help: Gordic.Widget.GHelpArticle;
        /** Aktuální kontext nápovědy */
        context: string[];
        /** Anchor z linku na jinou nápovědu */
        linkedAnchor: string;
        /** Article pro zobrazeni obsahu */
        private $Article?;
        /** Div pro zobrazení PDF */
        private $PdfDiv?;
        prepareContent(): void;
        /**
         * Vytvoření a zobrazení PDF
         */
        private _showPdf;
        /**
         * Načtení PDF z ResourcePacku do obsahu dto a zobrazení PDF
         */
        private _loadPdf;
        /**
         * Zobrazení načteného PDF
         */
        private _showContentPdf;
        /**
         * Vytvoreni div s Article
         * */
        private _createArticle;
        /**
         * Vytvoření link panelu s info a otevřením do nové záložky
         * @param anchor Anchor pro PDF
         */
        private _createUtilsPannel;
        /**
         * Nacteni dat do Article z db nebo cache
         * */
        private _fillContent;
        /**
         * Automatické zascrollování na nejpřesnější anchor
         */
        private _addAutoScroll;
        /**
         * Získání a uspořádání seznamu anchors z linku, JSON a kontextu
         */
        private prepareAnchors;
        /**
         * Transformace anchoru do formátu pro pdf.js a Edge+Firefox (bez diakritiky + místo mezer "_")
         * @param anchor Vstupní anchor pro transformaci
         */
        private transformAnchor;
    }
}
declare namespace Gordic.Utils {
    /**
     * Třída s pomocnými statickými metodami pro metodickou nápovědu
     */
    class GContextHelpController {
        /**
         * Statická funkce sloužící pro konverzi blogové dto z db na dto metodické nápovědy
         * @param articles Gordic.Gin.Interface.GContextHelpBlogDto
         */
        static convertBlogsToCtxHelp(articles: any): Gordic.Widget.GHelpArticle[];
        /**
         * Statická funkce složící pro převod a vyplnění DTO metodické nápovědy z ResourcePackage
         * @param helps JSON z ResourcePackage
         * @param userSettings UserSetting
         */
        static convertPckgToCtxHelp(helps: any, userSettings?: Gordic.Data.IGStorage): Gordic.Widget.GHelpArticle[];
        /**
         * Statická funkce pro aplikování constraint na zadané články
         * @param articles Vstupní články pro vyfiltrování
         * @param constraints Vstupní constraint na aplikování na články
         * @returns Vyfiltrované články
         */
        static applyConstraints(toc: Gordic.Widget.GHelpTOC, articles: Gordic.Widget.GHelpArticle[], constraints: string[]): Gordic.Widget.GHelpTOC;
    }
}
declare namespace Gordic.Gui.WebApp {
    /** Zobrazení kontextových nápověd */
    class GContextHelpDisplay extends GContentBase {
        title: string;
        uid: string;
        /** Objekt s vyfiltrovanými články, groups, constraint */
        ctxhelp: Gordic.Widget.GContextHelpTrigger;
        /** Zda mají být články seřazeny abecedně */
        shouldSort: boolean;
        /** Pro otevření jednoho článku v novém okně */
        article: Gordic.Widget.GHelpArticle;
        /** Pro otevření jednoho článku v novém okně s anchorem*/
        anchor: string;
        private $ctxWrapper;
        private $articleWrapper;
        private $cnt;
        private shownHelp;
        private $menu;
        private $panel;
        private $confirmation;
        private stack;
        prepareContent(): void;
        /**
         * obnovi obsah widgetu a zobrazi novy TOC
         *
         * @param {Gordic.Widget.GHelpTOC} toc
         */
        refreshTOC(toc: Gordic.Widget.GHelpTOC): void;
        /**
         * Refresh contentu podle vstupních dat
         * @param data Vstupní data, které mají být zobrazeny
         */
        private _refresh;
        /**
         * Vytvoření contentu ze vstupních dat
         * @param data Vstupní data, které mají být zobrazeny
         */
        private _create;
        /**
         * Získání úvodního articlu, který má být zobrazen
         * @param articles Seznam článků, ze kterých přijde vybrat
         */
        private getInitialArticle;
        /**
         * Vytvoření akcí
         */
        private _createActions;
        /**
         * Vytvoření contentu s obsahem článku
         * @param article Článek, který má být zobrazen
         */
        private _createContent;
        /**
         * Vytvoření HTMLElementu LI pro jednotlive clanky v kapitole
         * @param parentElement List do kterého mají být přidány články
         * @param articles Články, které patří do kapitoly
         */
        private _renderArticleList;
        /**
         * Vytvoření HTMLElementu UL pro jednu kapitolu článků (rekurzivně)
         * @param node Root
         */
        private _createChapterElement;
        /**
         * Funkce pro vytvoření commandbaru
         */
        private _createCommandBar;
        /**
         * Vytvoření tlačítka pro potvrzení přečtení nápovědy
         */
        private _createConfirmButton;
    }
}
declare namespace Gordic.Components.Search {
    /** Resolver pro kontextovou nápovědu */
    class GContextHelpSearchResolver extends Components.Search.GBaseSearchResolver {
        private confidenceOffset;
        /** Fuzzy search pro contextovou nápovědu*/
        private fs;
        private calcConfidence;
        /** Akce otevření contextové nápovědy*/
        private contextHelpAction;
        /** Akce otevření oken Nápovědy F1*/
        private helpAction;
        /** Vrácení identifikátoru resolveru */
        protected getDefaultId(): string;
        /** Vrácení informací o doméně resolveru */
        protected getDefaultDomain(): Components.Search.IGSearchResolverDomain | null;
        /**
         * Přidání statických subtasků okna Nápověda do vyhledávání
         * @param results Seznam výsledků
         * @param input Vstup z pole. Pokud je input.text prázdný, potom se výsledky zobrazí vždy (confidence 1)
         */
        private getSubtaskActions;
        /**
         * Vytvoření výsledku
         * @param input
         * @param currTask
         */
        protected getResult(input: Components.Search.IGSearchInput, currTask: Components.Search.GSearchResolveTask): Components.Search.IGSearchResolverItem[] | JQueryPromise<Components.Search.IGSearchResolverItem[]>;
    }
}
declare namespace Gordic.Gui.WebApp.Dashboard {
    class Actions {
        static openDetail(): Gordic.Dashboard.IGDashboardAction;
    }
}
declare namespace Gordic.Ginis.DbModel {
    class GEnum {
        private static _enumCache;
        private static _aggregatedTimer?;
        private static _nextBunch;
        /**
         * Vrati metadata o typu odvozenem od GEnum (seznam podporovanych hodnot)
         *
         * @author bmartinek
         * @since 488.1.0.48
         */
        static getMeta<TEnum, TMetaDto>(enumType: string): JQueryPromise<GEnumMetaDto<TEnum, TMetaDto>[]>;
    }
}
declare namespace Gordic.Gui.WebApp {
    /**
     * GExpertModeDlgInputParams - Vstupní parametry dialogu GExpertModeDlg.
     *
     * @author vblabla
     * @since 52530.0
     */
    interface GExpertModeDlgInputParams {
        levelExp: number;
    }
    /**
     * GExpertModeDlgReturnValue - Návratová hodnota dialogu GExpertModeDlg.
     *
     * @author vblabla
     * @since 52530.0
     */
    interface GExpertModeDlgReturnValue {
        ixxKey: string;
    }
    /**
     * GExpertModeDlg - Dialog pro zpřístupnění Expertního režimu aplikace
     *
     * @author vblabla
     * @since 52530.0
     */
    class GExpertModeDlg extends GContentBase {
        /**
         * Validátory
         * @type {object}
         */
        private readonly ExpertModeFormValidators?;
        /**
         * $Form
         * @type {JQuery<HTMLElement>}
         */
        private $Form?;
        title: string;
        className: string;
        /**
         * levelExp - parametr úlohy z číselníku gdecexp
         * @type {number}
         */
        private levelExp;
        /**
         * expertModeEnabled - příznak trvání expertního režimu
         * @type {boolean}
         * @default false
         */
        private expertModeEnabled;
        /**
         * Identifikátor položky vyrovnávací paměti
         * @type {string}
         */
        private ixxKey;
        /**
        * timeField
        * @type {JQuery<HTMLElement>}
        */
        private TimeField;
        /**
         * Timeinterval
         * @type {number}
         */
        private Timeinterval;
        /**
         * Vytvoří formulář, přidá jej do contentu a nastaví validátory.
         *
         */
        onContentReady(): void;
        /**
         * Vytvoří menu.
         *
         */
        private createMenu;
        /**
         * Zvaliduje formulář a zavolá serverovou metodu ChangePassword.
         *
         */
        checkEntryCode(): JQuery.Promise<undefined>;
        /**
         * Vytvoří formulář.
         *
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @returns {JQuery<HTMLElement>}
         */
        private static createForm;
        /**
         * createClock - aktuální čas
         */
        createClock(): void;
        /**
         * Funkce volaná při zavírání dialogu Expertního režimu.
         *
         * @returns {JQuery.Promise<GExpertModeDlgReturnValue>}
         */
        private closing;
    }
}
declare namespace Gordic.Gui.WebApp {
    /**
     * Vstupní parametry dialogu GLicenceKomponent.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @since   482.1.0.129
     */
    interface GLicenceKomponentDlgInputParams {
    }
    /**
     * Návratová hodnota dialogu GLicenceKomponent.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @since   482.1.0.129
     */
    interface GLicenceKomponentDlgReturnValue {
    }
    /**
         * GLicenceKomponentDlg
         *
         * @author vblabla
         * @since 482.1.0.10
         */
    class GLicenceKomponentDlg extends GContentBase {
        private readonly UseComponents;
        onContentReady(): void;
        /**
         * funkce createFormTab pro vytvoreni Gtabu a do něj Gformu
         *
         * @param {Forms.Form} defForm //promenna, ve ktere je ulozena definice formulare
         * @param {number} lib //i pro cyklus For
         */
        private createFormTab;
    }
}
declare namespace Gordic.Gui.WebApp {
    /**
     * Podpora pro nastaveni logovani po prihlaseni a pred odhlasenim
     *
     * @author bmartinek
     * @since 480.1.0.98
     */
    class GNLogSupport {
        /** Nastaveni logovani po prihlaseni */
        static setupAfterLogin(init?: Gordic.Gui.WebControls.GLogInitDto): void;
        /** Nastaveni logovani pred ohlasenim okamzite bez odeslani zprav z bufferu */
        static setupBeforeLogoutForced(): void;
        /** Nastaveni logovani pred ohlasenim s odeslanim zprav z bufferu + vraceni promise, jakmile to probehne */
        static setupBeforeLogout(): JQueryPromise<void>;
    }
}
declare namespace Gordic.Gui.WebApp {
    class GNLogViewer extends GContentBase {
        uid: string;
        private _$grid;
        private _$out;
        private _isRunning;
        /**
         * Abych vedel, ze zrovna setuji filtr a nechci vyvolat change, na ktery pak posloucha customProfile gridu
         */
        private _isSettingFilter;
        private _initDto;
        private copyToClipboardAct;
        /**
         * Akce pro spusteni/zastaveni nahravani logu (vstupni argument contentu!)
         * @type {GAction}
         */
        recordLogAct: GAction;
        static startEvtName: string;
        static stopEvtName: string;
        prepareContent(): void;
        private _init;
        private _start;
        private _stop;
        isRunning(): boolean;
        clearRelationMessages(): void;
        getRelationMessages(): void;
        closing(retVal: any): JQueryPromise<void>;
        /** Definice menu */
        getMenuDefinition(): MenuParams[];
        /**
         * Spolecna funkce pro spusteni/zastaveni nahravani logu
         *
         * @param {GAction} this
         */
        static recordActRun(this: GAction, ev: JQueryEventObject, ctx: any): void;
        /** Zachovani kompatibility se starsi verzi zapnuti logovani.
         * https://xwiki.gordic.cz/NET/javascript/GLog/#HZapojenEDlibovolnE9hoconnectoruzconsoleprohlED17Ee10De
         */
        static toggleFileLogging(cfg: GLogFileRuleConfigDto): JQueryPromise<string>;
        /**
         * Vytvoreni formulare s konfiguraci
         *
         * @returns {Gordic.Forms.Form}
         */
        private static createConfigurationForm;
        static downloadLog(cnt: GContent): JQueryPromise<GLogFileInfoDto>;
        private static createSrvCnt;
        private srv;
        private _setData;
        private _getFilter;
        private _getFilterFunc;
        /** Provede filtrovani jiz nactenych dat */
        private _filterClientData;
        private _createStatusBar;
    }
}
declare namespace Gordic.Gui.WebApp {
    /**
     * Content pro zapnuti/vypnuti klientskeho logovani do souboru pro verzi 488
     *
     * @author bmartinek
     * @since 486.1.0.146
     */
    export class GNlogUserFileLogConfig488 extends GContentBase implements IGClientContent {
        private _srv;
        private _startStopAct;
        private _startIcon;
        private _stopIcon;
        private _actualFileInfo?;
        private _logDiagAct;
        title: string;
        prepareContent(): void;
        private startStopLogging;
        private writeDiagInfo;
        private updateGui;
        private updateStartStopAction;
        static logStart(parentContent: GContent): JQueryPromise<GNlogUserFileLogConfig488CustomLogContext>;
        static logStop(ctx: GNlogUserFileLogConfig488CustomLogContext): JQueryPromise<void>;
    }
    interface GNlogUserFileLogConfig488CustomLogContext {
        content: GContent;
    }
    export {};
}
declare namespace Gordic.Previews {
    interface IGPreviewRenderOptions {
        parentContent?: GContent;
    }
    interface IGPreviewRegistration {
        canRender: (data: any, opts?: IGPreviewRenderOptions) => boolean;
        render: (div: JQuery, data: any, opts?: IGPreviewRenderOptions) => void | JQueryPromise<any>;
    }
    /**
     * Register view to the catalogue.
     * @param {String} viewId Name of the view.
     * @param {Object} obj Definition object of view. Should contains render function(div,data) and canRender function(data).
     */
    function register(viewId: any, obj: any): void;
    /**
     * View exists in catalogue?
     * @param {type} viewId
     * @returns {type}
     */
    function exists(viewId: any): boolean;
    /**
     * Opens detail in new tab.
     * @param {Object} dto Data required for detail to open
     * @param {String} viewId Identifier (name) of view, which should open detail.
     * @returns {Promise} new window
     */
    /**
     * Render detail by navigating to one from given content.
     * @param {GContent} content Content, most likely MainContent.
     * @param {Object} dto  Data required for detail to open.
     * @param {String} viewId Identifier (name) of view, which should render detail.
     */
    /**
     * Render preview into given div
     * @param {String} viewId Identifier (name) of view, which should render preview.
     * @param {JQueryObject} div JqueryObject/Element to render preview into (can be with gcontent)
     * @param {Object} dto  Data required for preview to render.
     * @param {Object} opts  Options for render.
     */
    function render(viewId: any, div: any, data: any, opts?: IGPreviewRenderOptions): void;
    interface IGPreviewPanelOptions {
        caption?: string;
        viewId?: string | ((dto: any) => (string | JQueryPromise<string>));
        linkProvider?: (dto: any) => any;
        parentContent?: GContent;
    }
    function getDefaultPreviewTab(previewPanelOptions?: IGPreviewPanelOptions): GPreviewItemOptions;
    function displayLinkButton(element: any, loadParams: any): void;
}
interface IGRequestDto {
    msgContent: string[];
    msgID: string;
    src: "BrowserExtension" | "ActiveX";
    sendID: string;
    part: number;
    logRequired: true;
    gen: number;
    totalParts: number;
}
interface IGActiveXRequestDto extends IGRequestDto {
    mID: string;
}
/**
 * Config, který se vrací z klienta a je již podepsaný
 * @author pnovak
 * @since 482.1.0.92
 */
interface SignedConfig extends GSignCreateConfig {
    /**
     * cesta k podepsanému souboru
     * @type {string}
     */
    ClientPath?: string;
}
interface ExtensionVersion {
    response: "OK" | "NOK";
    responseData?: string;
    versionState: string;
    reason?: string;
}
interface IGReasonExtensionDto {
    /**
     * Typ důvodu odmítnutí
     * @type {EReasonType}
     */
    type: EReasonType;
    /**
     * Text odmítnutí
     * @type {string}
     */
    reason: string;
    /**
     * Spouštěná operace
     * @type {string|null}
     */
    operation: string | null;
    /**
     * webVersion - verze doplnku z WK
     * @type {string}
     */
    webVersion?: string;
    /**
     * verze z NK
     * @type {string}
     */
    extensionVersion?: string;
}
interface IGExtensionResultDto<T> {
    result: T;
    canUpdate?: boolean;
}
declare enum VersionStateEnum {
    ActualVersion = 0,
    CanUpdate = 1,
    UpdateNeeded = 2,
    OldWebApp = 3,
    UnknownState = 4,
    NotExists = 5
}
declare enum ExtensionState {
    notSupported = "notSupported",
    supported = "supported",
    notExists = "notExists",
    commError = "commError",
    init = "init"
}
declare enum OperationsEnum {
    cert = "jres:31850048",//RC 31850048 : operace s certifikáty
    sign = "jres:31850049",//RC 31850049 : operace s podpisy
    file = "jres:31850050",//RC 31850050 : operace se soubory
    mail = "jres:31850051",//RC 31850051 : operace s elektronickou poštou
    comm = "jres:31850093"
}
declare namespace Gordic.Gui.WebApp {
    export namespace Utils {
        /**
         * Metoda pro zobrazeni pruvodce instalace MSI s doplnkem
         *
         * @param {GContent} content Content, ktery je pouzit pro zobrazeni dialogu
         * @param {OperationsEnum} [requiredOperation] Používaná operace - podpisy, certifikáty, el. pošta, nebo také undefined - neurčeno
         * @param {boolean} [isInstallation] Příznak, že se jedná o instalaci = true, nebo aktualizaci = false, defaultně true
         * @param {string} [setupPath] Cesta k instalovanému MSI (defaultní je umistění v ginu)
        */
        function showInstallGuide(content: GContent, requiredOperation?: OperationsEnum, isInstallation?: boolean, forceInstall?: ExtensionGuideInstallMode, closeDelegate?: () => JQuery.Promise<any>, setupPath?: string): JQueryPromise<any>;
        enum installWizardParam {
            show = 0,
            hide = 1
        }
        function showReasonFlash(content: GContent, reason: IGReasonResponse): void;
    }
    export interface MailInfoRequestDto {
        index: number;
        currentFolder?: string;
        currentFolderFlagUp?: string;
    }
    /**
     * Mail content for sending
     * @author pnovak
     * @since 480.1.0.99
     */
    export interface MailSettingsDto {
        /**
         * Sender
         * @type {string}
         */
        Sender?: string;
        /**
         * Reciever
         * @type {string}
         */
        Reciever?: string;
        /**
         * Subject
         * @type {string}
         */
        Subject?: string;
        /**
         * Body
         * @type {string}
         */
        Body?: string;
        /**
         * Attachments
         * @type {string[]}
         */
        Attachments?: string[];
        /**
         * Signature flag
         * @type {boolean}
         */
        MakeSign?: boolean;
        /**
         * Outlook's params
         * @type {string}
         */
        GmsMapiArgs?: string;
    }
    export abstract class BrowserAddonParent {
        static readonly minimumSupportedVersion = "490.1";
        static readonly webAppVersion = "1.0";
        static readonly webAppRequests: {
            loadFile: {
                version: string;
            };
            getVersion: {
                req: string;
                version: string;
            };
            getSize: {
                req: string;
                version: string;
            };
            getAll4Filter: {
                req: string;
                version: string;
            };
            canOpenFile: {
                req: string;
                version: string;
            };
            sendMail: {
                req: string;
                version: string;
            };
            getMailFolders: {
                req: string;
                version: string;
            };
            deleteFile: {
                req: string;
                version: string;
            };
            open: {
                req: string;
                version: string;
            };
            print: {
                req: string;
                version: string;
            };
            showPrintDialog: {
                req: string;
                version: string;
            };
            newSign: {
                req: string;
                version: string;
            };
            getMailAddress: {
                req: string;
                version: string;
            };
            saveAllAttachments: {
                req: string;
                version: string;
            };
            getMail: {
                req: string;
                version: string;
            };
            getMailsInfo: {
                req: string;
                version: string;
            };
            getForgottenFileList: {
                req: string;
                version: string;
            };
            clearForgottenFileList: {
                req: string;
                version: string;
            };
            refreshEvidence: {
                req: string;
                version: string;
            };
            getForgottenFile: {
                req: string;
                version: string;
            };
            openForgottenFile: {
                req: string;
                version: string;
            };
            moveForgottenFile: {
                req: string;
                version: string;
            };
            deleteForgottenFile: {
                req: string;
                version: string;
            };
        };
        supportedState: ExtensionState;
        version: ExtensionVersion;
        nativeGBEVersion: string;
        protected checkPromise: JQueryPromise<any>;
        abstract sender: SenderAddonParent;
        protected logID: string;
        protected get isSupported(): boolean;
        constructor();
        private _logger;
        get logger(): Diagnostics.GLog;
        private convertRejectedMessageToPromise;
        protected convertRejectedMessage(data: any, operation?: string | null): IGReasonExtensionDto;
        protected convertResult<T>(data: any, responseData?: T): IGExtensionResultDto<T>;
        private getReasonObjectFromSupportedState;
        private SendMessageToBackgroundScript;
        /**
            * Metoda pro vyzkoušení toho, zda je nativní klient podporován
            *
            * @returns {JQueryPromise<void>}
            */
        testCommunication(requiredOperation?: OperationsEnum | null, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
        tryToCheckNativeClient(): JQuery.Promise<void>;
        /**
        * getFileSize
        *
        * @param {string} path
        * @returns {JQueryPromise<number>}
        */
        getFileSize(path: string, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<number>, IGReasonExtensionDto>;
        /**
         * getAllCerts
         *
         * @returns {JQueryPromise<string[][]>}
         */
        getAllCerts(versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<Gordic.Security.Service.GCertificateChain[]>, IGReasonExtensionDto>;
        /**
        * Associed program checking
        * @param {string} fileName fileName
        * @returns {JQueryPromise<boolean>} true = exists associed program to run, else false
        */
        canOpenFile(fileName: string, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
        /**
        * Receive list of forgotten files
        * @param {boolean} versionCheck kontrola verze
        * @returns {JQueryPromise<boolean>} true = exists associed program to run, else false
        */
        getForgottenFileList(versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<Gordic.Gui.WebApp.GForgottenFileDto[]>, IGReasonExtensionDto>;
        refreshEvidence(fileName: string, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<void>, IGReasonExtensionDto, any>;
        clearForgottenFileList(removeFromTemp?: boolean, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<void>, IGReasonExtensionDto, any>;
        getForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | null, forceUpload: boolean | undefined, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto, any>;
        openForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | null, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto, any>;
        moveForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | null, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto, any>;
        deleteForgottenFile(forgottenFile: Gordic.Gui.WebApp.GForgottenFileDto | null, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto, any>;
        /**
         * Send mail via Outlook
         * @param {MailSettingsDto} mail
         * @returns {JQueryPromise<string>}
         */
        sendMail(mail: MailSettingsDto, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
        /**
         * getMailFolders
         * @param {number} index
         * @param {string} currentfolder
         * @param {string} currentFolderFlagUp
         * @returns {JQueryPromise<string>}
         */
        getMailFolders(versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
        /**
         * processMailRequest
         *
         * @param {string} req
         * @param {MailInfoRequestDto} mailInfoDto
         * @returns {JQueryPromise<string>}
         */
        private processMailRequest;
        /**
         * getMailsInfo
         * @param {number} index
         * @param {string} currentfolder
         * @param {string} currentFolderFlagUp
         * @returns {JQueryPromise<string>}
         */
        getMailsInfo(index: number, currentfolder: string, currentFolderFlagUp: string, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
        /**
         * getMailContent
         * @param {number} index
         * @param {string} currentfolder
         * @param {string} currentFolderFlagUp
         * @returns {JQueryPromise<string>}
         */
        getMailContent(index: number, currentfolder: string, currentFolderFlagUp: string, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
        /**
         * saveAllAttachments
         * @param {number} index
         * @param {string} currentfolder
         * @param {string} currentFolderFlagUp
         * @returns {JQueryPromise<string>}
         */
        saveAllAttachments(index: number, currentfolder: string, currentFolderFlagUp: string, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
        /**
         * getMailAddress
         * @param {number} index
         * @param {string} currentfolder
         * @param {string} currentFolderFlagUp
         * @returns {JQueryPromise<string>}
         */
        getMailAdress(index: number, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
        /**
         * loadFile
         *
         * @param {string} path
         * @returns {JQueryPromise<string>}
         */
        loadFile(path: string, isForUpload: boolean | undefined, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
        /**
         * deleteFile
         *
         * @param {string} path
         * @returns {JQueryPromise<void>}
         */
        deleteFile(path: string, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<void>, IGReasonExtensionDto>;
        /**
         * openFile
         *
         * @param {string} filePath
         * @param {boolean} wait (default = false)
         * @returns {JQueryPromise<0|1>}
         */
        openFile(filePath: string, wait?: boolean, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<0 | 1>, IGReasonExtensionDto>;
        /**
       * printFile
       *
       * @param {string} filePath
       * @returns {JQueryPromise<boolean>}
       */
        printFile(filePath: string, showPrintDialog: boolean, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<boolean>, IGReasonExtensionDto>;
        /**
         * sign
         *
         * @param {GSignCreateConfig | Gordic.General.ApplicationInterface.GSignMinimumConfig|null} configDto
         * @returns {JQueryPromise<GSignCreateConfig>}
         */
        sign(configDto: GSignCreateConfig | Gordic.Security.Service.GSignMinimumConfig | null, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
        checkNativeClient(): boolean;
        protected saveFileParent(name: string, data: string, isForUpload?: boolean, customDto?: any, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
    }
    abstract class SenderAddonParent {
        static readonly possibleCharsSub: string;
        protected id: string;
        static mode: {
            iv: CryptoJS.lib.WordArray;
            mode: CryptoJS.mode.CBC;
            padding: CryptoJS.pad.Pkcs7;
        };
        static generateNewMsgID: () => string;
        constructor();
        abstract SendMessageToBackgroundScript(msgContent: ObjectLiteral<any>): JQueryPromise<any>;
        static PrepareMessageToSend<T extends IGRequestDto = IGRequestDto>(msgID: string, srcName: "BrowserExtension" | "ActiveX", msgContent: ObjectLiteral<any>, id: string): T;
        static ProcessMessage<T extends IGRequestDto = IGRequestDto>(data: any, sendMsg: T, id: string): JQuery.Promise<any, any, any>;
    }
    export class BrowserExtension extends BrowserAddonParent {
        sender: SenderExtension;
        constructor();
        /**
         * Nastaveni ikony doplnku
         *
         * @param {boolean} isVisible
         */
        setVisibleIcon(isVisible: boolean): void;
        /**
         * saveFile
         *
         * @param {string} name
         * @param {string} body
         * @returns {JQueryPromise<string>}
         */
        saveFile(name: string, body: string, isForUpload?: boolean, customDto?: any, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
    }
    export class ActiveX extends BrowserAddonParent {
        private hasCommunicator;
        sender: SenderActiveX;
        constructor(clientCommunicator?: GIEClient);
        protected get isSupported(): boolean;
        /**
         * saveFile
         *
         * @param {string} name
         * @param {string} body
         * @returns {JQueryPromise<string>}
         */
        saveFile(name: string, body: any, versionCheck?: boolean): JQuery.Promise<IGExtensionResultDto<string>, IGReasonExtensionDto>;
        private arrayBufferToBase64;
    }
    export class SenderActiveX extends SenderAddonParent {
        private clientCommunicator?;
        constructor(clientCommunicator?: GIEClient | undefined);
        SendMessageToBackgroundScript(msgContent: ObjectLiteral<any>): JQueryPromise<any>;
    }
    export class SenderExtension extends SenderAddonParent {
        SendStateMessage(stateSettings: {
            visible?: boolean;
            hasError?: boolean;
            indicator?: "X" | "" | "✓";
            notification?: string;
        }): void;
        SendMessageToBackgroundScript(msgContent: ObjectLiteral<any>): JQueryPromise<any>;
    }
    export {};
}
declare namespace Gordic.Gui.WebApp {
    class ExtensionInfo extends GContentBase implements IGClientContent {
        InfoForm: Forms.Form;
        private prepareResult;
        private getFieldOptions;
        /**
         * Připravení contentu
         */
        prepareContent(): void;
        InstallGbeForm: Forms.Form;
    }
}
declare namespace Gordic.Gui.WebApp {
    enum ExtensionGuideInstallMode {
        force = 0,
        suggest = 1,
        none = 2
    }
    class ExtensionInstallGuide extends GContentBase implements IGClientContent {
        private newInstalation;
        private operation?;
        private forceInstall?;
        private closeDelegate;
        /**
         * Připravení contentu
         */
        prepareContent(param: any): void;
        closing(retVal: any): JQuery.Promise<void, any, any>;
    }
}
/**
 * Typ důvodu odmítnutí
 * @author pnovak
 * @since 482.1.0.7
 */
declare enum EReasonType {
    /** typ - Nepodporováno */
    extensionNotSupported = 0,
    /** typ - Chyba na serveru */
    serverError = 1,
    /** typ - Obecný */
    common = 2,
    /** typ - Uživatel zrušil akci*/
    userCancelled = 3,
    /** typ - neexistuje*/
    extensionNotExists = 4,
    /** typ - chyba komunikace */
    extensionComError = 5
}
/**
 * IGReasonResponse
 *
 * @author pnovak
 * @since 482.1.0.7
 */
interface IGReasonResponse extends IGReasonExtensionDto {
    /**
     * Příznak obsluhy
     * @type {boolean}
     */
    handled: boolean;
}
/**
 * IGSignProperties - Interface pro vlastnosti podepisování
 * @author pnovak
 * @since 480.1.0.52
 */
interface IGSignProperties {
}
/**
 *  Uzivatelsky objekt pro nastaveni podepisovani
 */
interface IGCustomDto {
    /**
     * Typ zobrazeni certifikatu
     * @type {boolean}
     */
    cardView?: boolean;
    /**
     * Titulek dialogu
     * @type {string}
     */
    title?: string;
    /**
     * otisk certifikátu
     * @type {string}
     */
    thumbprint?: string;
    /**
     * Identifikátor důvodu podpisu
     * @type {string}
    */
    ixsDpo?: string;
    /**
      * Příznak, že lze podepsat na serveru serverovým certifikátem (mám všechny informace pro podepsání) - kvůli umístění podpisu a podepsání pečetí
      * @type {boolean}
     */
    isNotConfigFinite?: boolean;
    /**
     * Předávaný content, ze kterého je otevřené podepisování (dialog, uživatelské nastavení)
     */
    content?: GContent;
    /** Příznak, jestli je parametr vyplněn.
     * (GIN - SGN - URL adresa vzdáleného podepsání/pečetění S602 SecuSign)
    **/
    gin_sgn_ssurl?: boolean;
    /** GIN ELE - Zobrazovat dialog pro zadání přihlášení k účtu 602 */
    gin_ele_602iden?: boolean;
    /** příznak, zda se má vždy zobrazit dialog pro výběr certifikátu */
    forceShowCertDialog?: boolean;
    /** Příznak zda se jedná o fikci podpisu */
    isFiction?: boolean;
    /** ignoreAdvParams - priznak ze se nemaji pouzivat pokrocile kontroly u certifikatu */
    ignoreAdvParams?: boolean;
    /** disableRemoteCerts - priznak ze se nemaji nabizet pecete*/
    disableRemoteCerts?: boolean;
}
/**
 * DTO s informacemi o certifikátu
 *
 * @author pnovak
 * @since 480.1.0.87
 */
interface CertInfo {
    /** otisk */
    thumbprint: string;
    /** typ */
    typeCert: Gordic.General.ApplicationInterface.TypeOfCertificate;
    /** Retezec nadrizenych certifikatu */
    certChain: Gordic.Security.Service.GCertificateChain | null;
    /**
     * Priznak, zda se ma zobrazit dialog primarne na zadani PINu
     * @type {boolean}
     */
    showPswdDlg: boolean;
    /**Informace o certifikatu*/
    certMoreInfo: Gordic.Security.Service.GCertificateInfoDTO | null;
    /** Zadaný pin*/
    otherPswd?: string;
}
/** Zkrácený zápis DTO */
type GSignMinimumConfig = Gordic.Security.Service.GSignMinimumConfig;
/**
 * Delegát spuštěný před přípravou konfigurace
 * Typicky pro zobrazeni dotazu zda razítkovat, pokud není specifikováno již dříve ve volající komponentě, či ve výběru kategorie podpisu
 *
 * @author pnovak
 * @since 480.1.0.87
 */
type TBeforePrepareConfigDelegate = <T extends GSignMinimumConfig, T2 extends IGCustomDto>(prevConfig: T, preparedConfig: T, customDto?: T2) => JQuery.Promise<T, IGReasonResponse>;
type TBeforeSignDelegate = <T extends GSignMinimumConfig, T2 extends IGCustomDto>(configDto: T, customDto?: T2) => JQuery.Promise<GSignCreateConfig, IGReasonResponse>;
type TChooseCertificateDelegate = <T extends GSignMinimumConfig, T2 extends IGCustomDto>(customDto?: T2) => JQuery.Promise<CertInfo | T, IGReasonResponse>;
/**
 * Abstraktní třída pro podepisování
 *
 * @author pnovak
 * @since 480.1.0.87
 */
declare abstract class SignerBase implements IGSignerBase {
    protected beforeSignDelegate: TBeforeSignDelegate;
    chooseCertificateDelegate?: TChooseCertificateDelegate | undefined;
    SignProperties?: IGSignProperties | undefined;
    /**
     * Metoda, kterou musí implementovat každý potomek
     * Slouží pro obsluhu podepisování
     * @param {T} configDto Konfigurační DTO (vstupní DTO pro podpis)
     * @param {T2} [customDto] Uživatelské DTO pro možnost upravit chování během podepisování
     * @returns {JQuery.Promise<GSignCreateConfig, IGReasonResponse>} Konfigurační objekt, který obsahuje informace o podpisu (hotové, podepsané)
     */
    abstract sign<T extends GSignMinimumConfig, T2 extends IGCustomDto>(configDto: T, customDto?: T2): JQuery.Promise<GSignCreateConfig, IGReasonResponse>;
    /**
     * Metoda, kterou musí implementovat každý potomek
     * Slouží pro přípravu před samotným podepsáním
     * @param {T} configDto Konfigurační DTO (vstupní DTO pro podpis)
     * @param {T2} [customDto] Uživatelské DTO pro možnost upravit chování během podepisování
     * @returns {JQuery.Promise<GSignCreateConfig, IGReasonResponse>} Konfigurační objekt, který obsahuje informace o podpisu (ještě nepodepsané, připravené k podepsání)
     */
    abstract prepareSign<T extends GSignMinimumConfig, T2 extends IGCustomDto>(configDto: T, customDto?: T2): JQuery.Promise<GSignCreateConfig, IGReasonResponse>;
    /**
     * constructor
     *
     * @param {TBeforeSignDelegate} beforeSignDelegate Delegát volaný těsně před podpisem - používá se pro načtení konfigurace
     * @param {TChooseCertificateDelegate} [chooseCertificateDelegate] Delegát pro výběr certifikátu
     * @param {IGSignProperties} [SignProperties] Vlastnosti podepisovacího objektu
     */
    constructor(beforeSignDelegate: TBeforeSignDelegate, chooseCertificateDelegate?: TChooseCertificateDelegate | undefined, SignProperties?: IGSignProperties | undefined);
    private get _logger();
    /**
     * Metoda pro vrácení všech klientských certifikátů
     * @param {string} certParam DB parametr pro určení chování při načítání certifikátů - gin_nabcergbe
     * @returns {JQuery.Promise<string[][], IGReasonResponse>} Promise s certifikáty
     */
    protected selectCertificates(certParam: string): JQuery.Promise<Gordic.Security.Service.GCertificateChain[], IGReasonResponse>;
    /**
     * Metoda na zobrazení dialogu výběru certifikátu
     * @returns {JQueryPromise<string>} Promise s otiskem certifikátu
     */
    protected selectCertificate<T extends IGCustomDto>(customDto?: T): JQuery.Promise<CertInfo, IGReasonResponse>;
}
declare class Signer extends SignerBase {
    /**
     * constructor
     *
     * @param {TBeforeSignDelegate} beforeSignDelegate Delegát volaný těsně před podpisem - používá se pro načtení konfigurace
     * @param {TChooseCertificateDelegate} [chooseCertificateDelegate] Delegát pro výběr certifikátu - první ve workflow
     * @param {TBeforePrepareConfigDelegate} [beforePrepareConfigDelegate] Delegát před načtením konfigurace - druhý ve workflow
     * @param {IGSignProperties} [SignProperties] Vlastnosti podepisovacího objektu
     */
    constructor(beforeSignDelegate: TBeforeSignDelegate, chooseCertificateDelegate?: TChooseCertificateDelegate, SignProperties?: IGSignProperties);
    get logger(): Gordic.Diagnostics.GLog;
    prepareSign<T extends GSignMinimumConfig, T2 extends IGCustomDto>(configDto: T, customDto?: T2): JQuery.Promise<GSignCreateConfig, IGReasonResponse>;
    /**
     * Podepisovací workwflow pro všechny podepisovací objekty je stejné
     * @param {T} configDto ConfigDto pro podepsání
     * @param {ObjectLiteral<Primitive>} [customDto] Uživatelské dto, které se předává do všech delegátů
     * @returns {JQueryPromise<GSignCreateConfig>} Promise s výsledkem podepsání
     */
    sign<T extends GSignMinimumConfig, T2 extends IGCustomDto>(configDto: T, customDto?: T2): JQuery.Promise<GSignCreateConfig, IGReasonResponse>;
    protected defaultSignHandler<T extends IGCustomDto>(configDto: T): JQuery.Promise<GSignCreateConfig, IGReasonResponse>;
}
declare namespace Gordic.Gui.WebApp {
    class VyberCertifikatuDlg extends GContentBase implements IGContent {
        private EPKSignIntoPDFThumbprint;
        private SGNCerSerialNumber;
        private SGNSubject;
        private GridData;
        title: string;
        cardView: boolean;
        private showPswdDlg;
        PomCerts: string[][];
        private SGNCertChain;
        private SGNTypeCert;
        private CertMoreInfo;
        private view;
        private cards;
        private grid;
        onContentReady(): void;
        private SetMode;
        private UserSelectCertificate;
        OKClick(): void;
        CloseOnOK(): void;
        private getGridDefinition;
    }
}
declare namespace Gordic.Gui.WebApp {
    /**
     * Vstupní parametry dialogu GDetailZastupuDlg.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @since   482.1.0.129
     */
    interface GDetailZastupuDlgInputParams {
        /**
         * (Default: false) Rozliseni, zda se jedna o editaci osoby nebo zakladani nove
         * @type {boolean}
         */
        EditMode?: boolean;
        /**
         * Klic osoby v databazi, ke zjisteni, kterou osobu (Funkci) editovat
         * @type {string}
         */
        Fun?: string;
        /**
         * Klic osoby v databazi, ke zjisteni, kterou osobu (Referenta) editovat
         * @type {string}
         */
        Ref?: string;
        /**
         * Klic osoby v databazi, ke zjisteni, kterou osobu (Fazi) editovat
         * @type {string}
         */
        Faze?: string;
    }
    /**
     * Návratová hodnota dialogu GDetailZastupuDlg.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @since   482.1.0.129
     */
    interface GDetailZastupuDlgReturnValue {
        jeUlozeno?: boolean;
        nactiSeznam?: boolean;
    }
    class GDetailZastupuDlg extends GContentBase {
        private readonly maxDelkaZastupuOsoby?;
        private readonly datovyModel?;
        private readonly validatory?;
        private faze?;
        private kontrolaVstupnichDat?;
        onContentReady(): void;
        private _createMenu;
        private vytvorDefiniciFormulare;
        private vytvorFormular;
        private vratDataZFormulara;
        private kontrolaVstupnichParametru;
        private naplnFormular;
        private nastavValidatory;
        private zavolejUlozitNovaData;
        private createButton;
    }
}
declare namespace Gordic.Gui.WebApp {
    /**
     * Vstupní parametry dialogu GSeznamZastupuDlg.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @since   482.1.0.129
     */
    interface GSeznamZastupuDlgInputParams {
    }
    /**
     * Návratová hodnota dialogu GSeznamZastupuDlg.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @since   482.1.0.129
     */
    interface GSeznamZastupuDlgReturnValue {
    }
    class GSeznamZastupuDlg extends GContentBase {
        private readonly datovyModel1?;
        private readonly currentModeZastupu?;
        private grid1?;
        private PosledniHledanyFilter?;
        onContentReady(): void;
        /**
         * _createMenu funkce k definici tlacitek Hornich/Dolnich tlacitek
         */
        private _createMenu;
        /**
         * funkce vytvorDefiniciFormulare k vytvoreni zobrazeneho formulare
         *
         * @returns {Forms.Form}
         */
        private vytvorDefiniciFormulare;
        /**
         * funkce naplnFormular k plneni formulare daty
         */
        private naplnFormular;
        /**
         * funkce vratDataZFormulara pro ziskani dat z formulare
         *
         * @returns {SeznamZastupuLoadDataInputDto}
         */
        private vratDataZFormulara;
        /**
         *funkce k vytvoreni Formulare
         *
         * @param {Forms.Form} DefiniceFormulare
         */
        private vytvorFormular;
        /**
         * funkce na kontentu vyrvori filterpanel se zadanym formularem,
         * Po kliknuti na nacist ulozi filtr do globalni promenne tridy (PosledniHledanyFilter)
         * a dale zavolam nacteni dat pomoci funkce zavolejLoadData()
         *
         * Filterpanel slouží jako serverový filtrt nad gridem a pracuje s uloženými filtry
         *
         * @param {Forms.Form} definiceFormulare formular ktery bude poslan do filterpanelu
         */
        private vytvorFilterPanel;
        /**
         * funkce zavolejLoadData
         */
        private zavolejLoadData;
        /**
         * funkce zavolejOdstranit - vola C# metodu Odstranit
         */
        private zavolejOdstranit;
        /**
         * funkce LoadGrid k vytvoreni GRIDU
         */
        private LoadGrid;
        /**
         * Funkce volaná při zavírání dialogu.
         *
         * @returns {JQuery.Promise<GSeznamZastupuDlgReturnValue>}
         */
        private closing;
    }
}
declare namespace Gordic.Gui.WebApp {
    /**
     * GZmenaFunkceHandler
     *
     * @author  TFeik
     * @date    27.08.2021
     * @since   486.1.0.118
     */
    class GZmenaFunkceHandler {
        /**
         * Vyvolá změnu funkce.
         *
         * @author  TFeik
         * @date    27.08.2021
         *
         * @param {{ content?: GContent }} [input]
         * @returns {JQuery.Promise<any>}
         */
        static ZmenitFunkci(input?: {
            content?: GContent;
        }): JQuery.Promise<void>;
        /**
         * Vyvolá změnu zastupovaného veřejného uživatele.
         *
         * @author  TFeik
         * @date    08.09.2021
         *
         * @returns {JQuery.Promise<any>}
         */
        static ZmenitPublicUzivatele(): JQuery.Promise<void>;
        /**
         * Otevře dialog pro přidání zastupované osoby veřejného uživatele.
         *
         * @author  TFeik
         * @date    08.09.2021
         *
         * @returns {JQuery.Promise<WebControls.GAddRepresentPublicUserDlgReturnValue | undefined>}
         */
        static PridatPublicZastupUzivatele(): JQuery.Promise<WebControls.GAddRepresentPublicUserDlgReturnValue | undefined>;
        /**
         * Odhlásí uživatele z aplikace a znovu otevře přihlašovací stránku aplikace s
         * potlačením přeskakování kroku pro zadání uživatele.
         *
         * @author  truzicka
         * @date    16.09.2025
         */
        static ReopenAppWithoutSkipUserSelectionStep(): JQuery.Promise<void>;
        /**
         * Ohlásí uživatele z aplikace a znovu otevře přihlašovací stránku aplikace.
         *
         * @author  TFeik
         * @date    07.08.2025
         *
         * @param {GContent} [content] (Default: $.content('main')) Content ma kterém se zavolá odhlášení.
         * @param {ObjectLiteral<any>} [data] Object to searialize into query.
         * @param {Gordic.WebApp.Utility.IGLinkOptions} [options]  ticketType(Gordic.Enums.TicketType) - default is .None
         * @returns {JQuery.Promise<string>}
         */
        static ReopenApp(content?: GContent, data?: ObjectLiteral<any>, options?: Gordic.WebApp.Utility.IGLinkOptions): JQuery.Promise<void>;
    }
}
declare namespace Gordic.Gui.WebApp {
    /**
     * Vstupní parametry dialogu GZmenaHeslaDlg.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @since   482.1.0.129
     */
    interface GZmenaHeslaDlgInputParams {
    }
    /**
     * Návratová hodnota dialogu GZmenaHeslaDlg.
     *
     * @author  TFeik
     * @date    06.11.2019
     * @since   482.1.0.129
     */
    interface GZmenaHeslaDlgReturnValue {
    }
    /**
     * GZmenaHeslaDlg
     *
     * @author vblabla
     */
    class GZmenaHeslaDlg extends GContentBase {
        /**
         * Validátory
         * @type {object}
         */
        private readonly ZmenaHeslaFormularoveValidatory?;
        private readonly datModel?;
        /**
         * $Form
         * @type {JQuery<HTMLElement>}
         */
        private $Form?;
        title: string;
        className: string;
        /**
         * Vytvoří formulář, přidá jej do contentu a nastaví validátory.
         *
         */
        onContentReady(): void;
        private naplnFormular;
        /**
         * Vytvoří menu.
         *
         */
        private createMenu;
        /**
         * Zvaliduje formulář a zavolá serverovou metodu ChangePassword.
         *
         */
        changePassword(): JQuery.Promise<undefined>;
        /**
         * Vytvoří formulář.
         *
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @returns {JQuery<HTMLElement>}
         */
        private static createForm;
        /**
         * Funkce volaná při zavírání dialogu.
         *
         * @returns {JQuery.Promise<GZmenaHeslaDlgReturnValue>}
         */
        private closing;
    }
}
