declare namespace Gordic.Wfl.WebClient {
    interface IGWflSignerOptions extends IGSignerParentOptions {
        beforeSignDelegate: TBeforeSignDelegate;
        onBeforeShowClientDialog?: (() => void) | null;
    }
    interface IGSignerParentOptions {
        params?: TParams | null;
        configParams?: IGConfigParams;
        beforeCertDelegate?: TBeforeSelectCertHandler;
        chooseCertificateDelegate?: TChooseCertificateDelegate;
        beforePrepareConfigDelegate?: TBeforePrepareConfigDelegate;
        content?: GContent;
    }
    class SignUtils {
        static registerClickEvent(el: JQuery): void;
    }
    interface IGCustomDtoWithCert extends IGCustomDto {
        typeCert: Gordic.General.ApplicationInterface.TypeOfCertificate;
        thumbprint: string;
        certChain: Gordic.Security.Service.GCertificateChain | null;
        showPswdDlg: boolean;
        otherPswd?: string;
    }
    /**
     * Typ pro parametry podepisovacího objektu
     * @author pnovak
     * @since 480.1.0.514
     */
    type TParams = [string, string | boolean | number];
    /**
     * Typ pro delegát spuštěným před výběrem certifikátu
     *
     * @author pnovak
     * @since 480.1.0.514
     */
    type TBeforeSelectCertHandler = <T extends IGCustomDto>(customDto?: T) => JQueryPromise<any>;
    /**
     * Typ pro delegát spuštěným před výběrem certifikátu
     *
     * @author pnovak
     * @since 480.1.0.514
     */
    type TModifyPreparedConfigDelegate = (preparedConfig?: GSignCreateConfig) => JQuery.Promise<GSignCreateConfig, IGReasonResponse>;
    /**
     * Podepisovací objekt pro WFL - předek
     * @author pnovak
     * @since 480.1.0.514
     */
    class WflSigner extends SignerBase {
        protected distributedSignatureFromParam: boolean;
        protected certParam: string;
        protected content?: GContent;
        private _loggerWFLSigner;
        get loggerWFLSigner(): Diagnostics.GLog;
        protected lastUsedReasonDto: any;
        protected emptyThumbprint: CertInfo;
        sign<T extends GSignMinimumConfig, T2 extends IGCustomDto>(configDto: T, customDto?: T2, preparedConfig?: JQuery.Promise<GSignCreateConfig, IGReasonResponse>): JQuery.Promise<GSignCreateConfig, IGReasonResponse>;
        _asyncServerSign(fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto): JQuery.Promise<any, any, any>;
        asyncServerSign(fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto): JQuery.Promise<any, any, any>;
        selectCertificateWithPin<T extends GSignMinimumConfig, T2 extends IGCustomDto>(configDto: T, customDto?: T2): JQuery.PromiseBase<any, never, never, never, never, never, never, never, never, never, never, never>;
        prepareSign<T extends GSignMinimumConfig, T2 extends IGCustomDto>(configDto: T, customDto?: T2): JQuery.Promise<GSignCreateConfig, IGReasonResponse>;
        /**
         * Vybraný certifikát
         * @type {string}
         */
        protected gSgnCertThumbprint: CertInfo;
        setCertificate(certificate: CertInfo): void;
        private getError;
        /**
         * Servisní content
         * @type {()}
         * @default > GContent = () => { return new GContent("Gordic.Wfl.WebClient.GSignModule") }
         */
        protected _serviceCnt: () => GContent;
        private _srvCnt?;
        protected initPromise: JQuery.Promise<void, IGReasonResponse>;
        protected params?: TParams | null;
        protected configParams?: IGConfigParams;
        protected beforeCertDelegate?: TBeforeSelectCertHandler;
        protected beforePrepareConfigDelegate?: TBeforePrepareConfigDelegate;
        onBeforeShowClientDialog?: (() => void) | null;
        /**
         * Konstruktor
         * @param {TParams} params Parametry podepisovacího modulu
         * @param {IGConfigParams} _configParams Konfigurační parametry podepisovacího modulu
         * @param {TBeforeSignDelegate} beforeSignDelegate Delegát volaný před podepsáním souboru - používá se pro načtení konfigurace
         * @param {TBeforeSelectCertHandler} [beforeCertDelegate] Delegát volaný před výběrem certifikátu
         * @param {TChooseCertificateDelegate} [chooseCertificateDelegate] Delegát pro výběr certifikátu
         * @param {TBeforePrepareConfigDelegate} [beforePrepareConfigDelegate] Delegát volaný před přípravou konfigurace (nutné přidat z důvodu, že ne vždy se bude vybírat certifikát)
         * @param {any} onBeforeShowClientDialog?
         */
        constructor(options: IGWflSignerOptions);
        /**
         * Metoda pro načtení konfigurace
         * @param {Client.GSignPreConfigDto} signingConfig Informace o podpisu
         */
        protected wflLoadConfig(signingConfig: Client.GSignPreConfigDto): JQuery.PromiseBase<any, IGReasonResponse, any, any, IGReasonResponse, any, any, IGReasonResponse, any, any, IGReasonResponse, any>;
        /**
         * Zruší uložený certifikát
         */
        unselectCert(): void;
        /**
         * Metoda pro kontrolu, zda se vybral cerifikát a spustí následnou kontrolu, zda je certifikát možné použít
         * @param {IGCertInfo} certInfo Informace o certifikátu
         * @returns {JQueryPromise<void>} Promise
         */
        protected choiceCertOKClick(certInfo: IGCertInfo, ignoreAdvParams?: boolean): JQuery.Promise<CertInfo, IGReasonResponse>;
        /**
         * Kontrola, zda existuje certifikát dle zadaných dbParams
         * @param {IGCertInfo} certInfo Info o certifikátech
         * @returns {JQueryPromise<void>}
         */
        private isCertificateExists;
        /**
         * Kontrola certifikátu
         *
         * @param {string} result
         * @returns {JQueryPromise<void>}
         */
        private checkCertificate;
        /**
         * Výběr certifikátu
         *
         * @param {ObjectLiteral<Primitive>} [customDto] Uživatelské DTO
         */
        selectWflCertificate<T extends IGCustomDto>(customDto?: T): JQuery.Promise<CertInfo, IGReasonResponse>;
        showPasswordDialog(): JQueryPromise<string>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IGGWflSignerOptions extends IGSignerParentOptions {
        modifyPreparedConfigDelegate?: TModifyPreparedConfigDelegate;
    }
    /**
     * Podepisovací objekt určený pro WFL - potomek
     * Podepsání el.obrazu/přílohy
     * @author pnovak
     * @since 480.1.0.514
     */
    class GWflSigner extends WflSigner {
        private _wflSignerLogger;
        get logger(): Diagnostics.GLog;
        /**
         * Konstruktor
         * @param {TParams} params Parametry podepisovacího objektu
         * @param {IGConfigParams} configParams Konfigurační parametry podepisovacího objektu
         * @param {TBeforeSelectCertHandler} beforeCertDelegate  Delegát volaný před výběrem certifikátu
         * @param {TChooseCertificateDelegate} [chooseCertDelegate]  Delegát pro výběr certifikátu
         * @param {TBeforePrepareConfigDelegate} [beforePrepareConfigDelegate] Delegát volaný před přípravou konfigurace (nutné přidat z důvodu, že ne vždy se bude vybírat certifikát)
         * @param {TModifyPreparedConfigDelegate} [modifyPreparedConfigDelegate] Delegát volaný po priprave konfigurace
         */
        constructor(options: IGGWflSignerOptions);
        /**
         * Metoda pro podepsání el.obrazu
         * @param {Gordic.Wfl.Client.GWflSignPreConfigDto} signingConfig Informace o podpisu
         * @param {T extends IGCustomDto} [customDto] Uživatelské DTO
         */
        signElObraz<T extends IGCustomDto>(signingConfig: Gordic.Wfl.Client.GWflSignPreConfigDto, customDto?: T): JQuery.Promise<Gordic.Wfl.Interface.GWflSignCreateConfig, IGReasonResponse>;
        /**
        * Metoda pro podepsání el.přílohy
        * @param {Gordic.Wfl.Client.GWflSignPreConfigDto} signingConfig Informace o podpisu
        * @param {T extends IGCustomDto} [customDto] Uživatelské DTO
        */
        signElAttachment<T extends IGCustomDto>(signingConfig: Gordic.Wfl.Client.GWflSignPreConfigDto, customDto?: T): JQuery.Promise<Gordic.Wfl.Interface.GWflSignCreateConfig, IGReasonResponse>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IGWflClientSignerOptions extends Partial<IGWflSignerOptions> {
        modifyPreparedConfigDelegate?: TModifyPreparedConfigDelegate;
    }
    /**
   * Podepisovací objekt určený pro WFL - potomek
   * Podepsání klientského souboru
   * @author pnovak
   * @since 480.1.0.514
   */
    class GWflClientSigner extends WflSigner {
        private _clientSignerLogger;
        get clientSignerLogger(): Diagnostics.GLog;
        private fileSrv;
        private addTimeStamp;
        private guidEvidence;
        /**
         * Konstruktor
         * @param {TParams} params Parametry podepisovacího objektu
         * @param {IGConfigParams} configParams Konfigurační parametry podepisovacího objektu
         * @param {TBeforeSelectCertHandler} beforeCertDelegate  Delegát volaný před výběrem certifikátu
         * @param {TModifyPreparedConfigDelegate} [modifyPreparedConfigDelegate] Delegát volaný po priprave konfigurace
         */
        constructor(options?: IGWflClientSignerOptions);
        private uploadFile;
        sign<T extends GSignMinimumConfig, T2 extends IGCustomDto>(configDto: T, customDto?: T2, preparedConfig?: JQuery.Promise<GSignCreateConfig, IGReasonResponse>): JQuery.Promise<GSignCreateConfig, IGReasonResponse>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class SignContent extends GContentBase implements IGClientContent {
        signer: UASigner;
        private configFile;
        prepareContent(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface CAServer {
        index: number;
        address: string;
        cmpAddress: string;
        directAccess: boolean;
        issuerCNs: string[];
        ocspAccessPointAddress: string;
        ocspAccessPointPort: string;
        tspAddress: string;
        tspAddressPort: string;
        certsInKey?: boolean;
    }
    class UASigner {
        private eSign;
        CAsServers: CAServer[];
        CAServer: CAServer | null;
        private offline;
        private useCMP;
        private loadPKCertsFromFile;
        private privateKeyCerts;
        private initialized;
        private initPromise;
        private prepPromise;
        private utils;
        private mod;
        constructor();
        private _base64ToArrayBuffer;
        private _arrayBufferToBase64;
        private getOwnCertificateInfo;
        getCertificate(): string;
        private setDefaultSettings;
        loadCAsSettings(): JQuery.Promise<any, any, any>;
        private storeCAServer;
        setCASettings(caIndex: number): void;
        private removeStoredPrivateKey;
        private getPrivateKeyCertificatesByCMP;
        private getPrivateKeyCertificates;
        private showOwnerInfo;
        private readPrivateKey;
        private storePrivateKey;
        initialize(caIndex?: number): JQuery.Promise<void, any, any>;
        setKeyData(file: File, password: string, caIndex: number): JQueryPromise<void>;
        sign<T extends ObjectLiteral<Primitive>>(fileContent: string, fileName: string, customDto?: T): JQuery.Promise<any, any, any>;
        verify<T extends ObjectLiteral<Primitive>>(file: {
            data: ArrayBuffer;
            name: string;
            customDto?: T;
        }): JQuery.Promise<any, any, any> | undefined;
    }
}
declare namespace Gordic.Rak.Globals.ListSupport {
    /**
     * Ikona - stav žádosti
     * @returns
     */
    function StavZadosti(): GGridColumn<any>;
    /**
     * Ikona - typ konverze
     * @returns
     */
    function TypKonverze(): GGridColumn<any>;
    /**
     * Ikona - typ vstupu konverze
     * @returns
     */
    function TypVstupuKonverze(): GGridColumn<any>;
    /**
     * Ikona - přípona souboru (doc, pdf, ...)
     * @returns
     */
    function PriponaSouboru(): GGridColumn<any>;
}
declare namespace Gordic.Wfl.GWflCommonDlg {
    function gridIcoSouvisejiciDokumentyOznaceniProEPK(priz_epk?: number | null): {
        img: string;
        tooltip: string;
    } | null;
    function gridIcoSouvisejiciDokumentySmer(smer?: string | null): {
        img: string;
        tooltip: string;
    } | null;
    function getKPodepsaniIcon(markedForSigning?: number | null): IconTemplate | undefined | null;
    function AddGfCommonColumns(gridFormat: Data.GridFormat, TypAg?: number | null, IxsFun?: string | null, light?: boolean | null): void;
    function AddDokumentyColumnsDlg(gridFormat: Data.GridFormat, extendObj?: any): void;
    function AddSSDDokumentyColumnsDlg(gridFormat: Data.GridFormat, extendObj?: any): void;
    function AddDokumentySimpleColumnsDlg(gridFormat: Data.GridFormat, extendObj?: any): void;
    function AddGSouvisejiciDokumentyColumnsDlg(gridFormat: Data.GridFormat, extendObj?: any): void;
    function getGridSouvisejiciDokumentKolonky(lzeSchvalovaciProces?: boolean, TypAg?: number | null, IxsFun?: string | null, light?: boolean | null): Data.GridFormat<any>;
    function getGridSouvisejiciDokumentKolonkyDlg(extendObj?: any): Data.GridFormat<any>;
    function sslsspzItemTemplate(opt?: {
        poznamkaVisible?: boolean;
    }): (row?: Gordic.Data.Readers.SslsspzDto) => string;
    function sslsspzItemTooltipTemplate(opt?: {
        poznamkaVisible?: boolean;
    }): (row?: Gordic.Data.Readers.SslsspzDto) => string;
    function ginsvskItemTemplate(opt?: {
        casObdobiVisible?: boolean;
        nezobrazovatTucnyNazev?: boolean;
    }): (row?: any) => string;
    function ginsvskItemTooltipTemplate(opt?: {
        casObdobiVisible?: boolean;
        nezobrazovatTucnyNazev?: boolean;
    }): (row?: any) => string;
    function sslstypItemTemplate(opt?: {
        skartacniRezimVisible?: boolean;
    }): (row?: any) => string;
    function sslstypItemTooltipTemplate(opt?: {
        skartacniRezimVisible?: boolean;
    }): (row?: any) => string;
    function CreateAktivitaBadge(aktivita: number): GBadgeOptions;
}
declare namespace Gordic.Wfl.Dialogs {
    /**
     * Dialog vyberu externi agendy.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function VyberExtAgDlg(parentContent: GContent, opt?: {
        IxsTyp?: string;
        TypSpis?: number;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog vyberu externi agendy.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GVyberExtAgDlg(parentContent: GContent, opt?: {
        TypSpis?: number;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
   * Dialog vyberu externi agendy.
   *
   * @author  RTomes
   *
   * @param  {gcontent}                              parentContent                       The content.
   * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
   * @return  .
   */
    function InformovatExtAgenduDlg(parentContent: GContent, opt?: {
        IxsTyp?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
* Servisni seznam datovych zprav
*
* @author  JSidndelk
*
* @param  {gcontent}                              parentContent                       The content.
* @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
* @return  .
*/
    function InfoOZasilkachHPDlg(parentContent: GContent, opt?: {
        /**
         * Typ pracovniho bloku
         */
        ZobrazDorucenky?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Servisni seznam datovych zprav
    *
    * @author  JSidndelk
    *
    * @param  {gcontent}                              parentContent                       The content.
    * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
    * @return  .
    */
    function ServisniSeznamDatovychZpravDlg(parentContent: GContent, opt?: {
        /**
         * Typ pracovniho bloku
         */
        ZobrazDorucenky?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
* Dialog pro vyber zasilky.
* - v případě, že se zavolá bez identifikátoru Ixp, tak lze nastavit vlastní formu a ta se mu v thenu vrátí
*
* @author  JSindelka
* @date    15.11.2019
*
* @param   parentContent                        The content.
* @param   ModOtevreni                    mod otevreni dialogu.
* @return  .
*/
    function VyberZasilkyDlg(parentContent: GContent, opt: {
        /** Identifikátor dokumentu */
        Data: Interface.GZasilkyListDto[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<string>;
    /**
     * Dialog AdminUzivSloupcuSeznamu
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.ColumnsUS                       ColumnsUS
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function AdminUzivSloupcuSeznamu(parentContent: GContent, opt: {
        /**
         * Uzivatelske nastaveni sloupcu seznamu.
         */
        IdContentUS: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery;
    /**
     * Dialog seznamu pracovnich bloku.
     *
     * @author  RTomes
     * @date    11.11.2019
     *
     * @param {gcontent}                          parentContent                   The content.
     * @param {object}                            opt                             parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function UzivSloupceList(parentContent: GContent, opt?: {}, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    interface PracovniBlokyDlgOptions {
        /**
         * Typ pracovniho bloku
         */
        TypBlp?: Gordic.Wfl.Globals.Enums.TypBlp;
    }
    interface PracovniBlokyDlgRetVal {
        ixsBlp?: string;
        nazev?: string;
    }
    /**
     * Dialog seznamu pracovnich bloku.
     *
     * @author  RTomes
     * @date    11.11.2019
     *
     * @param {gcontent}                          parentContent                   The content.
     * @param {object}                            opt                             parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function PracovniBlokyDlg(parentContent: GContent, opt?: PracovniBlokyDlgOptions, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<PracovniBlokyDlgRetVal>;
    /**
     * Dialog vyberu klic slov.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function VyberKlicSlovDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog vyberu klic slov.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GVyberKlicSlovDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog vyberu externi agendy.
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function OvereniKDatuDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    interface IClientCertificate {
        /**
         * Informace o certifikatu - Subject.
         */
        Subject: string;
        /**
         * Informace o certifikatu - Issuer.
         */
        Issuer: string;
        /**
         * Informace o certifikatu - DateOd.
         */
        DateOd: string;
        /**
         * Informace o certifikatu - DateDo.
         */
        DateDo: string;
        /**
         * Informace o certifikatu - SerialNumber.
         */
        Id: string;
        /**
         * Informace o certifikatu - CertThumb.
         */
        CertThumb: string;
    }
    /**
     * Dialog vyberu certifikatu.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {array}                                 opt.CertArray                       pole poli (chainu) klientskych certifikatu v base64 string
     * @param  {string}                                opt.IxsDpo                          id kategorie duvodu podpisu. Null nebo undefined, pokud se nepouzivaji duvody podpisu
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function VyberCertifikatuDlg(parentContent: GContent, opt?: {
        /**
         * pole poli (chainu) klientskych certifikatu v base64 string
         * @type {string[]}
         */
        CertArray?: string[];
        /**
         * id kategorie duvodu podpisu. Null nebo undefined, pokud se nepouzivaji duvody podpisu
         * @type {string}
         */
        IxsDpo?: string;
        /**
         * Titulek dialogu
         * @type {string}
         */
        Title?: string;
        /**
         * Zobrazeni jako kanban
         * @type {boolean}
         */
        cardView?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog vyberu externi agendy.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {int}                                   opt.flagElObraz                     0 (nejedna se o el. obraz) nebo 1 (jedna se o el. obraz)
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function TimestampRequesterDlg(parentContent: GContent | null, //P.Novak - Pouziti dialogu v podepisovacim modulu, bez vazby na content
    opt?: {
        /**
         * 0 (nejedna se o el. obraz) nebo 1 (jedna se o el. obraz).
         */
        flagElObraz?: number;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog dotazu na podepsani s casovym razitkem.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.ListIxp                         ixp dokumentu (staci string) nebo pro hromadnou akci pole ixp (pole stringu)
     * @param  {boolean}                               opt.HromadnaAkce                    priznak akce nad vice zaznamy
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function ZadostOPodpisDlg(parentContent: GContent, opt: {
        /**
         * Ixp dokumentu (staci string) nebo pro hromadnou akci pole ixp (pole stringu).
         */
        ListIxp: string | string[];
        /**
         * Priznak akce nad vice dokumenty.
         */
        HromadnaAkceDokumenty?: boolean;
        /**
         * Priznak akce nad vice spisy.
         */
        HromadnaAkceSpisy?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog dotazu na podepsani s casovym razitkem.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.ListIxp                         ixp dokumentu (staci string) nebo pro hromadnou akci pole ixp (pole stringu)
     * @param  {boolean}                               opt.HromadnaAkce                    priznak akce nad vice zaznamy
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
  GWflDialogs.ZadostOPodpis   * @return  .
     */
    function ZadostOPodpis(parentContent: GContent, opt: {
        /**
         * Ixp dokumentu (staci string) nebo pro hromadnou akci pole ixp (pole stringu).
         */
        ListIxp: string | string[];
        /**
         * Priznak akce nad vice zaznamy.
         */
        HromadnaAkce?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<boolean | undefined | null>;
    /**
     * Dialog dotazu na podepsani s casovym razitkem.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.Ixp                             Ixp
     * @param  {string}                                opt.SerCislo                        SerCislo
     * @param  {string}                                opt.IxsSpd                          IxsSpd
     * @param  {string}                                opt.ZpusVyriz                       ZpusVyriz
     * @param  {string}                                opt.FlagPk                          FlagPk
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function DetailUkonuDlg(parentContent: GContent, opt: {
        /**
         * Ixp.
         */
        Ixp: string;
        /**
         * SerCislo.
         */
        SerCislo?: number;
        /**
         * IxsSpd.
         */
        IxsSpd?: string;
        /**
         * ZpusVyriz.
         */
        ZpusVyriz?: string;
        /**
         * FlagPk.
         */
        FlagPk?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog seznamu historie schvalovani EPK.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.Ixp                             identifikator ixp
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function HistorieSchvalovaniEpkDlg(parentContent: GContent, opt?: {
        /**
         * Identifikator ixp.
         */
        Ixp?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog hromadné konverze/podepsani/razitkovani priloh dokumentu.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.Ixp                             ixp dokumentu
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function KonverzePdfDlg(parentContent: GContent, opt: {
        /**
         * Ixp dokumentu.
         */
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery;
    interface GKonverzePdfDlgInputParams {
        /**
         * Ixp dokumentu.
         */
        Ixp: string;
    }
    /**
     * Dialog hromadné konverze/podepsani/razitkovani priloh dokumentu.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.Ixp                             ixp dokumentu
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  Příznak, zda (došlo ke konverzi a) je nutné znovu načíst přílohy.
     */
    function GKonverzePdfDlg(parentContent: GContent, opt: GKonverzePdfDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<boolean | undefined>;
    interface GPrilohyDlgInputParams {
        /**
         * Ixp dokumentu.
         */
        Ixp: string;
        /**
         * NazevUDA dokumentu.
         */
        NazevUDA?: string;
        /**
         * PopisUDA dokumentu.
         */
        PopisUDA?: string;
        /**
         * mod pro zverejneni dokladu
         */
        PublishingMode?: boolean;
        /**
         * Povolení aktivních akcí - možné hodnoty: 'ReadOnly' (pouze pro čtení), 'ReadWrite' (čtení a editace), nebo 'RWDisableOdstranit' (čtení a editace + znemožnit odstranění přílohy)
         */
        PovoleniAkci?: Gordic.Wfl.Interface.PrilohyPovoleniAkci;
    }
    /**
     * Dialog priloh dokumentu.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.Ixp                             ixp dokumentu
     * @param  {string}                                NazevUDA                            Název pro zveřejnění v UDA.
     * @param  {string}                                PopisUDA                            Popis pro zveřejnění v UDA.
     * @return  .
     */
    function GPrilohyDlg(parentContent: GContent, opt: GPrilohyDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
     * Dialog vytvoreni nove neelektronicke prilohy.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.Ixp                             identifikator ixp
     * @param  {int}                                   opt.Poradi                          Poradi prilohy pri jeji editaci. U nove prilohy null nebo -1
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function NovaPrilohaDlg(parentContent: GContent, opt?: {
        /**
         * Identifikator ixp.
         */
        Ixp?: string;
        /**
         * Poradi prilohy pri jeji editaci. U nove prilohy null nebo -1.
         */
        Poradi?: number;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog s informacemi o el. dokumentu.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.Ixb                             xb el. dokumentu
     * @param  {int}                                   opt.Verze                           verze (ser. cislo) el. dokumentu - pokud neni uvedeno (undefined), pak se jedna o posledni verzi dokumentu
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function PrilohaInfoDlg(parentContent: GContent, opt?: {
        /**
         * Ixb el. dokumentu.
         */
        Ixb?: string;
        /**
         * Verze (ser. cislo) el. dokumentu - pokud neni uvedeno (undefined), pak se jedna o posledni verzi dokumentu.
         */
        Verze?: number;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog slouceni el. priloh
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.Ixp                             ixp dokumentu
     * @param  {Gordic.Global.Enums.ModOtevreni}       ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function SlouceniPrilohDlg(parentContent: GContent, opt?: {
        /**
         * Ixp dokumentu.
         */
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * PrenosPrilohUkoSsl
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.Ixp1                            Ixp odkud se bude přebírat
     * @param  {string}                                opt.Ixp2                            Ixp kam se bude přebírat
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function PrenosPrilohUkoSsl(parentContent: GContent, opt?: {
        /**
         * Ixp odkud se bude přebírat
         */
        Ixp1?: string;
        /**
         * Ixp kam se bude přebírat
         */
        Ixp2?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog s verzemi el. dokumentu.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {boolean}                               opt.IsFavorite                      priznak el. obrazu
     * @param  {string}                                opt.Ixp                             ixp dokumentu
     * @param  {string}                                opt.Ixb                             ixb souboru
     * @param  {number}                                opt.RemoveMode                      Mod odstraneni/zneaktivneni souboru.
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function PrilohyVerzeDlg(parentContent: GContent, opt?: {
        /**
         * Priznak el. obrazu.
         */
        IsFavorite?: boolean;
        /**
         * Ixp dokumentu.
         */
        Ixp?: string;
        /**
         * Ixb souboru.
         */
        Ixb?: string;
        /**
         * Mod odstraneni/zneaktivneni souboru.
         */
        RemoveMode?: number;
        /**
         * Priznak read only režimu okna
         */
        ReadOnlyMode?: boolean;
        ClassName?: string;
        filePreviewOptions?: Partial<IGFilePreviewLoadOptions>;
        downloaderType?: string;
        uploaderType?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog El. soubory dokumentu v nearchivním formátu
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {array}                                 opt.SouboryNearchivniFormat         pole souboru v nearchivnim formatu k zobrazeni v dialogu
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function UpresneniProEPKDlg(parentContent: GContent, opt?: {
        ixsDpo?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
    * Dialog ZverejneniBchDiplomaChain
    *
    * @author  RTomes
    *
    * @param  {gcontent}                              parentContent                       The content.
    * @param  {object}                                opt                                 Parametry dialogu.
    * @param  {array}                                 opt.SouboryNearchivniFormat         pole souboru v nearchivnim formatu k zobrazeni v dialogu
    * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
    * @return  .
    */
    function ZverejneniBchDiplomaChain(parentContent: GContent, opt?: {
        ixp?: string;
        ixb?: string;
        eleName?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
 * Soubory v nearchivnim formatu
 *
 * @author  JSidnelka
 * @date    26.11.2021
 *
 * @param {gcontent} parentContent The content.
 * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
 * @param {!object} opt Parametry dialogu.
 * @param {!string} opt.Ixp Ixp dokumentu.
 * @param {SouboryVNearchFormatuDlg} opt.TypPredani (default = false) Příznak, zda se jedná ohromadné odeslání.
 * @returns {JQueryPromise< JQuery | undefined>} Promise.
 */
    function SouboryVNearchFormatuDlg(parentContent: GContent, opt: ListAC.GSouboryVNearchFormatuDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<JQuery<HTMLElement> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    function SouboryVNearchFormatuDlgXX(// update nazvu metody (thazmuka 18.11.2021)
    parentContent: GContent, opt: {
        SouboryNearchivniFormat: Gordic.Wfl.Interface.PrilohyNearchFormatDto[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    interface ISouboryVNearchFormatu {
        /**
         * typ_elp
         */
        typ_elp: string;
        /**
         * soubor
         */
        soubor: string;
        /**
         * pronom_id
         */
        pronom_id: string;
        /**
         * ixp
         */
        ixp: string;
    }
    /**
     * Dialog detail historie zmen.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.Ixp                             Ixp
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function DetailHistorieZmenDlg(parentContent: GContent, opt?: {
        /**
         * Ixp.
         */
        Ixp?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog historie overeni.
     *
     * @author  RTomes
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.Ixp                             Ixp
     * @param  {int}                                   opt.PorCislo                        PorCislo
     * @param  {bool}                                  opt.FlagHromadne                    FlagHromadne
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function DetailHistorieUzivPoznDlg(parentContent: GContent, opt?: {
        /**
         * Ixp.
         */
        Ixp?: string;
        /**
         * PorCislo.
         */
        PorCislo?: number;
        /**
         * FlagHromadne.
         */
        FlagHromadne?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * DetailDotcSubjektuDlg.
     *
     * @author  RTomes
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                   The content.
     * @param  {object}                                opt                             Parametry dialogu.
     * @param  {string}                                opt.Ixp                         Ixp
     * @param  {string}                                opt.IxsEsu                      IxsEsu
     * @param  {int}                                   opt.TypVazby                    TypVazby
     * @param  {int}                                   opt.LicZast                     LicZast
     * @param  {int}                                   opt.PorZast                     PorZast
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                     Mód otevření dialogu.
     * @return  .
     */
    function DetailDotcSubjektuDlg(parentContent: GContent, opt?: {
        /**
         * Ixp.
         */
        Ixp?: string;
        /**
         * IxsEsu.
         */
        IxsEsu?: string;
        /**
         * TypVazby.
         */
        TypVazby?: number;
        /**
         * LicZast.
         */
        LicZast?: string;
        /**
         * PorZast.
         */
        PorZast?: number;
        /**
         * AktZnacka.
         */
        AktZnacka?: string;
        /**
         * EditEsu.
         */
        EditEsu?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * DotceneSubjektyDlg.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                        The content.
     * @param  {object}                                opt                            Parametry dialogu.
     * @param  {string}                                opt.Ixp                        Ixp
     * @param  {bool}                                  opt.EditEsu                    EditEsu
     * @param  {bool}                                  opt.AktualniEsu                AktualniEsu
     * @param  {bool}                                  opt.PovolPracovatSDS           PovolPracovatSDS
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                    Mód otevření dialogu.
     * @return  .
     */
    function DotceneSubjektyDlg(parentContent: GContent, opt?: {
        /**
         * Ixp.
         */
        Ixp?: string;
        /**
         * EditEsu.
         */
        EditEsu?: boolean;
        /**
         * AktualniEsu.
         */
        AktualniEsu?: boolean;
        /**
         * PovolPracovatSDS.
         */
        PovolPracovatSDS?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * DotceneDokumentyDlg.
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                        The content.
     * @param  {object}                                opt                            Parametry dialogu.
     * @param  {string}                                opt.ixs_esu                    ixs_esu
     * @param  {string}                                opt.Logovani                   Logovani kuli možnosti otevření detailu ESU
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                    Mód otevření dialogu.
     * @return  .
     */
    function DotceneDokumentyDlg(parentContent: GContent, opt: {
        /**
         * Ixs esu.
         */
        ixs_esu: string;
        /**
         * Logovani kuli možnosti otevření detailu ESU.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
         * Logovani kuli možnosti otevření detailu ESU.
         */
        OmezenyNahledZESU: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog nastaveni opravneni dokumentu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                   The content.
     * @param  {object}                                opt                             Parametry dialogu.
     * @param  {string}                                opt.Ixp                         Ixp
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                     Mód otevření dialogu.
     * @return  .
     */
    function GRizenyPristupDlg(parentContent: GContent, opt?: {
        /**
         * Ixp.
         */
        Ixp?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog nastaveni opravneni dokumentu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                   The content.
     * @param  {object}                                opt                             Parametry dialogu.
     * @param  {string}                                opt.Ixp                         Ixp
     * @param  {string}                                opt.IdRow                       IdRow
     * @param  {string}                                opt.Ro                          Ro
     *
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                     Mód otevření dialogu.
     * @return  .
     */
    function GNastaveniPravAktualniDlg(parentContent: GContent, opt?: {
        /**
         * Ixp.
         */
        Ixp?: string;
        /**
         * IdRow.
         */
        IdRow?: number;
        /**
         * Ro.
         */
        Ro?: number;
        /**
         * AktOpravneniDT.
         */
        AktOpravneniDTInput?: Gordic.Wfl.Interface.GWflRPSeznamAktOprDto[];
        /**
         * RoShowPlatnost
         */
        ShowPlatnost?: boolean;
        /**
         * DeleteRights.
         */
        DeleteRights?: boolean;
        /**
        * StUtajId.
        */
        StUtajId?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog nastaveni opravneni dokumentu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                   The content.
     * @param  {object}                                opt                             Parametry dialogu.
     * @param  {string}                                opt.Ixp                         Ixp
     * @param  {string}                                opt.IdRow                       IdRow
     * @param  {string}                                opt.Ro                          Ro
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                     Mód otevření dialogu.
     * @return  .
     */
    function GNastaveniPravPIDDlg(parentContent: GContent, opt?: {
        /**
         * Ixp.
         */
        Ixp?: string;
        /**
         * IdRow.
         */
        IdRow?: number;
        /**
         * Ro.
         */
        Ro?: number;
        /**
         * Ro.
         */
        DokumentDTInput?: Gordic.Wfl.Interface.GWflRPSeznamPidPravidlaDto[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog nastaveni opravneni dokumentu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                   The content.
     * @param  {object}                                opt                             Parametry dialogu.
     * @param  {string}                                opt.Ixp                         Ixp
     * @param  {string}                                opt.IdRow                       IdRow
     * @param  {string}                                opt.Ro                          Ro
     * @param  {GWflRPSeznamTypPravidlaDto[]}          opt.TypDokDTInput               TypDokDTInput
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                     Mód otevření dialogu.
     * @return  .
     */
    function GNastaveniPravTypDlg(parentContent: GContent, opt?: {
        /**
         * Ixp.
         */
        Ixp?: string;
        /**
         * IdRow.
         */
        IdRow?: number;
        /**
         * Ro.
         */
        Ro?: number;
        /**
         * TypDokDT.
         */
        TypDokDTInput?: Gordic.Wfl.Interface.GWflRPSeznamTypPravidlaDto[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog detailu historie rizeneho pristupu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                   The content.
     * @param  {object}                                opt                             Parametry dialogu.
     * @param  {string}                                opt.IxsLpc                      IxsLpc
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                     Mód otevření dialogu.
     * @return  .
     */
    function GRPHistorieDetailDlg(parentContent: GContent, opt?: {
        /**
         * IxsLpc.
         */
        IxsLpc?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog zobrazeni pristupovych prav spisu pro jejich prevzeti.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                   The content.
     * @param  {object}                                opt                             Parametry dialogu.
     * @param  {string}                                opt.Ixp                         ixpSpis
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                     Mód otevření dialogu.
     * @return  .
     */
    function GRizenyPristupPrevzitDlg(parentContent: GContent, opt?: {
        /**
         * Ixp.
         */
        Ixp?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog zobrazeni pristupovych prav spisu pro jejich prevzeti.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                   The content.
     * @param  {object}                                opt                             Parametry dialogu.
     * @param  {string}                                opt.Ixp                         ixp
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                     Mód otevření dialogu.
     * @return  .
     */
    function GRizenyPristupVyslednaOpravneniDlg(parentContent: GContent, opt?: {
        /**
         * Ixp.
         */
        Ixp?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na zadani/vygenerovani identifikatoru.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                                          parentContent                       The content.
     * @param  {object}                                            opt                                 Parametry dialogu.
     * @param  {Gordic.Wfl.Globals.Enums.TypDok}                   opt.TypDok                          Typ dokumentu - vlastni/cizi
     * @param  {Gordic.Wfl.Globals.Enums.TypId}                    opt.TypId                           IXS nebo IXP - uroven validace identifikatoru
     * @param  {bool}                                              opt.DotazPriExistenciVJineAgende    Zda zobrazit dotaz při existenci dokladu, vedeného v jiné agendě, na možnost použití. Nepovinny parametr. Default true
     * @param  {bool}                                              opt.HlaseniPriExistenciVAgende      Zda zobrazit hlaseni při existenci dokladu, vedeného v mé agendě. Nepovinny parametr. Default true<
     * @param  {Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp}      opt.ZpusobGenerovani                Prg faze mimo SSL si predavaji ZpusobGenerovani zvenci - nepovinny parametr
     * @param  {Gordic.Global.Enums.ModOtevreni}              ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GenerovaniIxpDlg(parentContent: GContent, opt?: {
        /**
         * Typ dokumentu - vlastni/cizi.
         */
        TypDok?: Gordic.Wfl.Globals.Enums.TypDok;
        /**
         * IXS nebo IXP - uroven validace identifikatoru.
         */
        TypId?: Gordic.Wfl.Globals.Enums.TypId;
        /**
         * Zda zobrazit dotaz při existenci dokladu, vedeného v jiné agendě, na možnost použití. Nepovinny parametr. Default true.
         */
        DotazPriExistenciVJineAgende?: boolean;
        /**
         * Zda zobrazit hlaseni při existenci dokladu, vedeného v mé agendě. Nepovinny parametr. Default true.
         */
        HlaseniPriExistenciVAgende?: boolean;
        /**
         * Prg faze mimo SSL si predavaji ZpusobGenerovani zvenci - nepovinny parametr.
         */
        ZpusobGenerovani?: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp;
        /**
         * Titulek dialogu. Nepovinny parametr.
         */
        Title?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na zadani/vygenerovani identifikatoru. Vraci promise s identifikatorem.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                                          parentContent                       The content.
     * @param  {object}                                            opt                                 Parametry dialogu.
     * @param  {Gordic.Wfl.Globals.Enums.TypDok}                   opt.TypDok                          Typ dokumentu - vlastni/cizi
     * @param  {Gordic.Wfl.Globals.Enums.TypId}                    opt.TypId                           IXS nebo IXP - uroven validace identifikatoru
     * @param  {bool}                                              opt.DotazPriExistenciVJineAgende    Zda zobrazit dotaz při existenci dokladu, vedeného v jiné agendě, na možnost použití. Nepovinny parametr. Default true
     * @param  {bool}                                              opt.HlaseniPriExistenciVAgende      Zda zobrazit hlaseni při existenci dokladu, vedeného v mé agendě. Nepovinny parametr. Default true<
     * @param  {Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp}      opt.ZpusobGenerovani                Prg faze mimo SSL si predavaji ZpusobGenerovani zvenci - nepovinny parametr
     * @param  {Gordic.Global.Enums.ModOtevreni}              ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GenerovaniIxp(parentContent: GContent, opt?: {
        /**
         * Typ dokumentu - vlastni/cizi.
         */
        TypDok?: Gordic.Wfl.Globals.Enums.TypDok;
        /**
         * IXS nebo IXP - uroven validace identifikatoru.
         */
        TypId?: Gordic.Wfl.Globals.Enums.TypId;
        /**
         * Zda zobrazit dotaz při existenci dokladu, vedeného v jiné agendě, na možnost použití. Nepovinny parametr. Default true.
         */
        DotazPriExistenciVJineAgende?: boolean;
        /**
         * Zda zobrazit hlaseni při existenci dokladu, vedeného v mé agendě. Nepovinny parametr. Default true.
         */
        HlaseniPriExistenciVAgende?: boolean;
        /**
         * Prg faze mimo SSL si predavaji ZpusobGenerovani zvenci - nepovinny parametr.
         */
        ZpusobGenerovani?: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp;
        /**
         * Titulek dialogu. Nepovinny parametr.
         */
        Title?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<{
        Ixp: string;
        IxpExist: boolean;
    } | undefined | null>;
    interface IRealizatorDto {
        cis_real: string;
        ico: string;
    }
    /**
     * Dialog predani/prideleni, vraci promise.
     *
     * @param parentContent
     * @param opt
     * @param ModOtevreni
     */
    function PredaniPrideleniSsl(parentContent: GContent, opt?: any, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<{
        predano: boolean;
        Realizator?: IRealizatorDto;
        GroupResult?: any;
    } | undefined | null>;
    function PredaniPrideleniEko(parentContent: GContent, opt?: {
        /**
         * Ixp dokumentu (staci string) nebo pro hromadnou akci pole ixp (pole stringu).
         */
        ListIxp?: string | string[];
        /**
         * Predat nebo Pridelit - povinny parametr.
         */
        Ucel?: Gordic.Wfl.Globals.Enums.UcelRedistribuce;
        /**
         * Priznak, zda ukoncit predchozi redistribuci false - neukoncovat (default); true - ukoncit.
         */
        StopRedistribuce?: boolean;
        /**
         * Zda zobrazit hlaseni při existenci dokladu, vedeného v mé agendě. Nepovinny parametr. Default true.
         */
        HromadnaAkce?: boolean;
        /**
         * Kompetent - ma smysl jen u predani pro EKO agendy.
         */
        Kompetent?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<{
        predano: boolean;
        Realizator?: IRealizatorDto;
    } | undefined | null>;
    /**
     * Dialog predani/prideleni.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                                          parentContent                       The content.
     * @param  {object}                                            opt                                 Parametry dialogu.
     * @param  {string}                                            opt.ListIxp                         ixp dokumentu (staci string) nebo pro hromadnou akci pole ixp (pole stringu)
     * @param  {Gordic.Wfl.Globals.Enums.UcelRedistribuce}         opt.Ucel                            Predat nebo Pridelit - povinny parametr
     * @param  {bool}                                              opt.StopRedistribuce                priznak, zda ukoncit predchozi redistribuci false - neukoncovat (default); true - ukoncit
     * @param  {bool}                                              opt.HromadnaAkce                    Zda zobrazit hlaseni při existenci dokladu, vedeného v mé agendě. Nepovinny parametr. Default true<
     * @param  {Gordic.Global.Enums.ModOtevreni}              ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function PredaniPrideleniSslDlg(parentContent: GContent, opt?: {
        /**
         * Ixp dokumentu (staci string) nebo pro hromadnou akci pole ixp (pole stringu).
         */
        ListIxp?: string | string[];
        /**
         * Predat nebo Pridelit - povinny parametr.
         */
        Ucel?: Gordic.Wfl.Globals.Enums.UcelRedistribuce;
        /**
         * Priznak, zda ukoncit predchozi redistribuci false - neukoncovat (default); true - ukoncit.
         */
        StopRedistribuce?: boolean;
        /**
         * Zda zobrazit hlaseni při existenci dokladu, vedeného v mé agendě. Nepovinny parametr. Default true.
         */
        HromadnaAkce?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog predani/prideleni.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                                          parentContent                       The content.
     * @param  {object}                                            opt                                 Parametry dialogu.
     * @param  {string}                                            opt.ListIxp                         ixp dokumentu (staci string) nebo pro hromadnou akci pole ixp (pole stringu), povinny parametr
     * @param  {Gordic.Wfl.Globals.Enums.UcelRedistribuce}         opt.Ucel                            Predat nebo Pridelit - povinny parametr
     * @param  {bool}                                              opt.StopRedistribuce                priznak, zda ukoncit predchozi redistribuci false - neukoncovat (default); true - ukoncit
     * @param  {bool}                                              opt.HromadnaAkce                    priznak, zda se jedna o hromadnou akci nad seznamem - false jednotlive nad detailem (default); true - hromadne nad seznamem
     * @param  {bool}                                              opt.Kompetent                       Kompetent - ma smysl jen u predani pro EKO agendy
     * @param  {Gordic.Global.Enums.ModOtevreni}              ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function PredaniPrideleniEkoDlg(parentContent: GContent, opt?: {
        /**
         * Ixp dokumentu (staci string) nebo pro hromadnou akci pole ixp (pole stringu).
         */
        ListIxp?: string | string[];
        /**
         * Predat nebo Pridelit - povinny parametr.
         */
        Ucel?: Gordic.Wfl.Globals.Enums.UcelRedistribuce;
        /**
         * Priznak, zda ukoncit predchozi redistribuci false - neukoncovat (default); true - ukoncit.
         */
        StopRedistribuce?: boolean;
        /**
         * Zda zobrazit hlaseni při existenci dokladu, vedeného v mé agendě. Nepovinny parametr. Default true.
         */
        HromadnaAkce?: boolean;
        /**
         * Kompetent - ma smysl jen u predani pro EKO agendy.
         */
        Kompetent?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog autorizace predavajici/prebirajici osoby.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                                          parentContent                       The content.
     * @param  {object}                                            opt                                 Parametry dialogu.
     * @param  {string}                                            opt.WinTitle                        titulek okna
     * @param  {string}                                            opt.Behaviour                       (1) predani dokumentu/spisu; (2) predani zasilek
     * @param  {string}                                            opt.IxsFun                          identifikator funkcniho mista predavajici/prebirajici osoby
     * @param  {Gordic.Global.Enums.ModOtevreni}              ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function OvereniPrebirajiciOsobyDlg(parentContent: GContent, opt: {
        /**
         * Titulek okna.
         */
        WinTitle: string;
        /**
         * (1) predani dokumentu/spisu; (2) predani zasilek.
         */
        Behaviour: string;
        /**
         * Identifikator funkcniho mista predavajici/prebirajici osoby.
         */
        IxsFun: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog autorizace predavajici/prebirajici osoby.
     *
     * @author  RTomes
     * @date    15.10.2020
     *
     * @param  {gcontent}                                          parentContent                       The content.
     * @param  {object}                                            opt                                 Parametry dialogu.
     * @param  {string}                                            opt.WinTitle                        titulek okna
     * @param  {Gordic.Global.Enums.ModOtevreni}                   ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function SUProHromadnePredaniDlg(parentContent: GContent, opt: {
        Ixs: string;
        TypIxs: Gordic.Wfl.Globals.Enums.TypeIxsInList;
        PredatOsobe: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery;
    /**
    * Dialog pro zadání loginu k mailovému serveru.
    *
    * @author  RTomes
    * @date    15.10.2020
    *
    * @param  {gcontent}                                          parentContent                       The content.
    * @param  {object}                                            opt                                 Parametry dialogu.
    * @param  {string}                                            opt.WinTitle                        titulek okna
    * @param  {Gordic.Global.Enums.ModOtevreni}                   ModOtevreni                         Mód otevření dialogu.
    * @return  .
    */
    function EmailLoginSettings(parentContent: GContent, opt: {
        Ucel: Gordic.Wfl.Globals.Enums.UcelLoginEmail;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog autorizace predavajici/prebirajici osoby.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                                          parentContent                       The content.
     * @param  {object}                                            opt                                 Parametry dialogu.
     * @param  {Gordic.Global.Enums.ModOtevreni}              ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function HledaniPodleVeciDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    function HledatIdentDokSpis(content: any): any;
    /**
     * SouvisejiciDokumentyDlg.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                        The content.
     * @param {object}                                 opt                            Parametry dialogu.
     * @param {string}                                 opt.Ixp                        Ixp Dokumentu
     * @param {bool}                                   opt.VolanoPresDnp              bool zda je voláno přes DNP
     * @param {string}                                 opt.IxpSouvisejici             IxpSouvisejicího aby se označil v tabulce.
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    Mód otevření dialogu.
     * @return  .
     */
    function SouvisejiciDokumentyDlg(parentContent: GContent, opt?: {
        /**
         * Ixp Dokumentu.
         */
        Ixp?: string;
        /**
         * Bool zda je voláno přes DNP.
         */
        VolanoPresDnp?: boolean;
        /**
         * IxpSouvisejicího aby se označil v tabulce.
         */
        IxpSouvisejici?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    interface GDetailDokumentuSpisuParams {
        DetailDto: {
            ixp: string;
        };
        EditMode?: boolean;
        RezimPodani?: any;
        InicDok?: any;
        grid?: JQuery<HTMLElement>;
        VzoryArray?: string[];
        SimpleMode?: boolean;
        IxpSpisProNovePodani?: string;
        StUtajIdProNovePodaniDoSpisu?: number;
        FlagVyridit?: number;
        IdZalozkyNeboPaneluKOtevreni?: Gordic.Wfl.Dialogs.GDetailDokumentuSpisuParams.IdZalozkyNeboPaneluKOtevreni;
        TypSpis?: number;
        IxpInitProVazbuSouvisejicich?: string;
        PredplneniDatProPodani?: any;
        IxsEsuProVytvoreniVazby?: string;
        TypDokumentuFilterDto?: WebClient.GSslHeaderFilterTypuDokumentu;
        ZverejneniInputDto?: WebClient.GWflZverejneniComponentDto;
        WithKontrolaMetadat?: boolean;
        ZakazatPodaniSSLComponent?: boolean;
        OperaceIdentifikatorNen?: string;
    }
    /**
     * Detail.
     *
     * @author  Dsebesta
     *
     * @param {GContent} parentContent
     * @param {{
            DetailDto?} opt?
     * @param {boolean} EditMode?
     * @param {any} RezimPodani?
     * @param {any} InicDok?
     * @param {any
        }} grid?
     * @param {Gordic.Global.Enums.ModOtevreni} ModOtevreni?
     */
    function DetailDokumentuSpisu(parentContent: GContent, opt: GDetailDokumentuSpisuParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<JQuery<HTMLElement> | undefined | null>;
    /** interface pro dialog hledat identifikátor dokumentu a spisu */
    interface IOptHledatIdentDokSpis {
        DisableCJ?: boolean;
        IxpZnovuVlozit?: string;
        /** vyplňovat spolu s TypSpis */
        IxpVkladanehoDok?: string;
        /** vyplňovat spolu s IxpVkladanehoDok */
        TypSpis?: Wfl.Interface.WflctysEnum;
        /** task id dialogu */
        taskId?: string;
        /** uživatelský titulek dialogu */
        CustomTitle?: string;
        /** Uživatelský popisek akčního tlačítka pro Vložení/Hledání */
        CustomActionButtonCaption?: string;
    }
    /**
     * [OBSOLITE] Použijte GHledatIdentDokSpisDlg, který vrací promise.
     * HledatIdentDokSpisDlg.
     *
     * @author  Thazmuka
     * @date    09.11.2017
     *
     * @param   parentContent                        The content.
     * @param   ModOtevreni                    Mód otevření dialogu.
     * @return  .
     */
    function HledatIdentDokSpisDlg(parentContent: GContent, opt?: IOptHledatIdentDokSpis, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * HledaniSpisuProVlozeniDokumentuSimple.
     *
     * @author  Thazmuka
     * @date    09.11.2017
     *
     * @param   parentContent                        The content.
     * @param   ModOtevreni                    Mód otevření dialogu.
     * @return  .
     */
    function HledaniSpisuProVlozeniDokumentuSimpleDlg(parentContent: GContent, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<{
        /** předaný identifikátor pro vložení do spisu */
        ixp?: string;
        /** příznak pro otevření základního vyhledávácího dialogu (GHledatIdentDokSpisDlg) po zavření tohoto */
        showBaseSearchDialog?: boolean;
    }>;
    /**
     * GHledatIdentDokSpisDlg.
     *
     * @author  Thazmuka
     * @date    09.11.2017
     *
     * @param   parentContent                        The content.
     * @param   ModOtevreni                    Mód otevření dialogu.
     * @return  .
     */
    function GHledatIdentDokSpisDlg(parentContent: GContent, opt?: IOptHledatIdentDokSpis, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<{
        ixp?: string;
    } | undefined | null>;
    /**
     * ObecneHledaniDlg.
     *
     * @author  Thazmuka
     * @date    04.12.2017
     *
     * @param   content                        The content.
     * @param   ModOtevreni                    Mód otevření dialogu.
     * @return  .
     */
    function ObecneHledaniDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * HledaniPodleSpisuDlg.
     *
     * @author  Thazmuka
     * @date    05.12.2017
     *
     * @param {gcontent}                               parentContent                        The content.
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    Mód otevření dialogu.
     * @return  .
     */
    function HledaniPodleSpisuDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * HledaniPodleDoruceniDlg.
     *
     * @author  Thazmuka
     * @date    08.01.2018
     *
     * @param {gcontent}                               parentContent                        The content.
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    Mód otevření dialogu.
     * @return  .
     */
    function HledaniPodleDoruceniDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Otevře dialog odeslání dokumentu.
     *
     * @author  TFeik
     * @date    07.12.2017
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.Ixp Ixp dokumentu.
     * @param {boolean} [opt.Hromadne=false] (default = false) Příznak, zda se jedná ohromadné odeslání.
     * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
     */
    function GOdeslaniDlg(parentContent: GContent, opt: WebClient.GOdeslaniDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GOdeslaniDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog historie odeslání dokumentu.
     *
     * @author  TFeik
     * @date    03.04.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
     */
    function GOdeslaniHistorieDlg(parentContent: GContent, opt: WebClient.GOdeslaniHistorieDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GOdeslaniHistorieDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog úpravy adresy zásilky odeslání dokumentu.
     *
     * @author  TFeik
     * @date    03.04.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
     */
    function GOdeslaniAdresyZasilkyDlg(parentContent: GContent, opt: WebClient.GOdeslaniAdresyZasilkyDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GOdeslaniAdresyZasilkyDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog tisku adres odeslání dokumentu.
     *
     * @author  TFeik
     * @date    03.04.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
     */
    function GOdeslaniTiskAdresDlg(parentContent: GContent, opt?: WebClient.GOdeslaniTiskAdresDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GOdeslaniTiskAdresDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog odeslání dokumentu emailem.
     *
     * @author  TFeik
     * @date    03.04.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
     */
    function GOdeslaniEmailDlg(parentContent: GContent, opt: WebClient.GOdeslaniEmailDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GOdeslaniEmailDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog nedokladového odeslání dokumentu emailem.
     *
     * @author  TFeik
     * @date    25.05.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<Gordic.Wfl.WebClient.IGOdeslaniEmailDlgResult>} Promise.
     */
    function GOdeslaniEmailNedokladoveDlg(parentContent: GContent, opt: WebClient.GOdeslaniEmailNedokladoveDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GOdeslaniEmailDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog odeslání dokumentu datovou schránkou.
     *
     * @author  TFeik
     * @date    03.04.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
     */
    function GOdeslaniDsDlg(parentContent: GContent, opt: WebClient.GOdeslaniDsDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GOdeslaniDsDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog odeslání dokumentu hybridní poštou.
     *
     * @author  TFeik
     * @date    03.04.2018
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniHpDlgInputParams>} input
     */
    function GOdeslaniHpDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniHpDlgInputParams>): JQuery.Promise<WebClient.GOdeslaniHpDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog odeslání dokumentu Dopis online - Hromadnou koverzní poštu.
     *
     * @author  TFeik
     * @date    18.03.2021
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniHkpDlgInputParams>} input
     */
    function GOdeslaniHkpDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniHkpDlgInputParams>): JQuery.Promise<WebClient.GOdeslaniHkpDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog odeslání dokumentu pomocí eDesk (SK datová schránka).
     *
     * @author  TFeik
     * @date    04.03.2019
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
     */
    function GOdeslaniEDeskDlg(parentContent: GContent, opt: WebClient.GOdeslaniEDeskDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GOdeslaniEDeskDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog odeslání dokumentu pomocí interního odeslání.
     *
     * @author  TFeik
     * @date    15.12.2020
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniInterniDlgInputParams>} input
     */
    function GOdeslaniInterniDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniInterniDlgInputParams>): JQuery.Promise<WebClient.GOdeslaniInterniDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog průvodce odesláním dokumentu.
     *
     * @author  TFeik
     * @date    07.12.2017
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu. dialogu.
     * @param {!string} opt.Ixp Ixp dokumentu.
     * @param {boolean} [opt.Hromadne=false] (default = false) Příznak, zda se jedná ohromadné odeslání.
     * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
     */
    function GOdeslaniWizardDlg(parentContent: GContent, opt: WebClient.GOdeslaniWizardDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<WebClient.GOdeslaniWizardDlgReturnValue | undefined>;
    /**
     * Otevře dialog hromadného odeslání dokumentů.
     *
     * @author  TFeik
     * @date    28.05.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
     */
    function GOdeslaniHromadneDotcenymSubjektumDlg(parentContent: GContent, opt: WebClient.GOdeslaniHromadneDotcenymSubjektumDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GOdeslaniHromadneDotcenymSubjektumDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog nastavení hromadného odeslání dokumentů.
     *
     * @author  TFeik
     * @date    30.05.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<Gordic.Wfl.WebClient.GOdeslaniHromadneNastaveniDto | undefined>} Promise.
     */
    function GOdeslaniHromadneDotcenymSubjektumNastaveniDlg(parentContent: GContent, opt?: WebClient.GOdeslaniHromadneDotcenymSubjektumNastaveniDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GOdeslaniHromadneDotcenymSubjektumNastaveniDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog nastavení hromadného odeslání dokumentů.
     *
     * @author  TFeik
     * @date    31.05.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<Gordic.Wfl.WebClient.GOdeslaniHromadneNastaveniDto | undefined>} Promise.
     */
    function GOdeslaniHromadneDlg(parentContent: GContent, opt: WebClient.GOdeslaniHromadneDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GOdeslaniHromadneDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    interface GPridatElDokumentProIxsDialogParams {
        /** Ixs. */
        Ixs?: string;
        /** Ixb. */
        Ixb?: string;
        /** PorCislo. */
        PorCislo?: number;
        /** DefaultValues. */
        DefaultValues?: WebClient.GPridatElDokumentProIxsFormDto;
        /** IsElObraz. */
        IsElObraz?: boolean;
        /** VytvoritPrilohu. */
        VytvoritPrilohu?: boolean;
        /** NovaVerze. */
        NovaVerze?: boolean;
        /** PlnaEditace. */
        PlnaEditace?: boolean;
    }
    /**
     * Otevře dialog přidání elekrtonického dokumentu.
     *
     * @author  TFeik
     * @date    16.11.2018
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<Gordic.Wfl.WebClient.GOdeslaniHromadneNastaveniDto | undefined>} Promise.
     */
    function GPridatElDokumentProIxsDlg(parentContent: GContent, opt: GPridatElDokumentProIxsDialogParams, //{
    ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<{
        ixbNew?: string;
    } | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * GDetailZasilkyDlg.
     *
     * @author  TFeik
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GDetailZasilkyDlg(parentContent: GContent, opt: WebClient.GDetailZasilkyDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GDetailZasilkyDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * GHledaniZasilekDlg.
     *
     * @author  TFeik
     * @date    26.11.2018
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GHledaniZasilekDlg(parentContent: GContent, opt?: WebClient.Hledani.GHledaniZasilekDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.Hledani.GHledaniZasilekDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
      * Doručení zásilky.
      *
      * @author  TFeik
      * @date    21.05.2019
      */
    function GDoruceniZasilkyDlg(
    /**
     * Vstupní parametry
     * @type {Gui.Dialogs.OpenDialogParamsWithRemoteControlGrid<WebClient.GDoruceniZasilkyDlgInputParams>}
     */
    input: Gui.Dialogs.OpenDialogParamsWithRemoteControlGrid<WebClient.GDoruceniZasilkyDlgInputParams>): JQuery.Promise<WebClient.GDoruceniZasilkyDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog  informací o datové zprávě z ISDS.
     *
     * @author  TFeik
     * @date    23.10.2019
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDatovaZpravaIsdsInfoDlgInputParams>} input Vstupní parametry
     * @returns {JQueryPromise<WebClient.GDatovaZpravaIsdsInfoDlgReturnValue | undefined>} Promise návratové hodnoty dialogu.
     */
    function GDatovaZpravaIsdsInfoDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDatovaZpravaIsdsInfoDlgInputParams>): JQuery.Promise<WebClient.GDatovaZpravaIsdsInfoDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog informací o zásile z Hybridní pošty.
     *
     * @author  TFeik
     * @date    16.03.2021
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GZasilkaHpInfoDlgInputParams>} input
     */
    function GZasilkaHpInfoDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GZasilkaHpInfoDlgInputParams>): JQuery.Promise<WebClient.GZasilkaHpInfoDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog informací o zásile z Hrmadné konverzní pošty.
     *
     * @author  TFeik
     * @date    15.04.2021
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GZasilkaHkpInfoDlgInputParams>} input
     */
    function GZasilkaHkpInfoDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GZasilkaHkpInfoDlgInputParams>): JQuery.Promise<WebClient.GZasilkaHkpInfoDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog nastavení emailu pro odeslání.
     *
     * @author  TFeik
     * @date    19.07.2021
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDatovaZpravaIsdsInfoDlgInputParams>} input Vstupní parametry
     * @returns {JQueryPromise<WebClient.GDatovaZpravaIsdsInfoDlgReturnValue | undefined>} Promise návratové hodnoty dialogu.
     */
    function GOdeslaniEmailNastaveniDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniEmailNastaveniDlgInputParams>): JQuery.Promise<WebClient.GOdeslaniEmailNastaveniDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * Dialog formy dokumentu, spisu.
    * - v případě, že se zavolá bez identifikátoru Ixp, tak lze nastavit vlastní formu a ta se mu v thenu vrátí
    *
    * @author  Thazmuka
    * @date    27.04.2018
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GFormaDokSpisDlg(parentContent: GContent, opt: {
        /** Identifikátor dokumentu */
        Ixp?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.WebClient.IGFormaDokSpisRetval>;
    /**
    * Dialog schvalovacího procesu
    *
    * @author  Thazmuka
    * @date    04.05.2018
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GSchvalovaciProcesPozadavekDlg(parentContent: GContent, opt: {
        /** Režim pouze pro čtení */
        ReadOnlyMode?: boolean;
        /** Identifikátor dokumentu */
        Ixp: string;
        /** IXB el. přílohy, je-li null nebo undefined, jedná se o předpis nad celým dokumentem/el. obrazem */
        IxbElp?: string | null;
        /**
         * Identifikátory pro sestavu generování el. obrazu
         * - vyplněním atributu povolíte danou akci v menu
         */
        IxpsPrint?: Wfl.Interface.GApprovalProcessIxpsPrintDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu úkonu při schvalování
    *
    * @author  Thazmuka
    * @date    09.05.2018
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GSchvalovaciProcesDetailUkonDlg(parentContent: GContent, opt: {
        /** Režim pouze pro čtení */
        ReadOnlyMode?: boolean;
        /** IxbElPrilohy pro nový úkon */
        IxbElPrilohy?: string | null;
        /** KrgRsp pro nový úkon */
        KrgRsp?: number | null;
        /** schvalovací úroveň pro nový úkon */
        SchUroven?: number | null;
        /** identifikátor ixs_spd pro nový úkon */
        IxsSpd?: string | null;
        /** identifikátor */
        Ixp?: string | null;
        /** typ zobrazení */
        Zobrazeni: Gordic.Wfl.WebClient.TypZobrazeniDetailuObecneho;
        /** vybraný řádek seznamu */
        Row: Gordic.Wfl.Interface.SchvalovaciProcesDataSetDto | null;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
    * Dialog předpisu při schvalování
    *
    * @author  Thazmuka
    * @date    22.05.2018
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GSchvalovaciProcesPredpisDlg(parentContent: GContent, opt: {
        /** Režim pouze pro čtení */
        ReadOnlyMode?: boolean;
        /** identifikátor */
        Ixp: string;
        /** typ zobrazení */
        Zobrazeni: Gordic.Wfl.WebClient.TypZobrazeniDetailuObecneho;
        /** vybraný řádek seznamu */
        Row: any | null;
        /** IXB el. přílohy, je-li null nebo undefined, jedná se o předpis nad celým dokumentem/el. obrazem */
        IxbElp?: string | null;
        /** Kategorie předpisu */
        KrgRsp?: number | null;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * Dialog - Žádost o autorizovanou konverzi, převod
     *
     * @author  Thazmuka
     * @date    22.06.2018
     *
     * @param   parentContent					The content.
     * @param   ModOtevreni						mod otevreni dialogu.
     * @return  .
     */
    function GAutorizovanaKonverzeZadostDlg(parentContent: GContent, opt: {
        /** identifikátor */
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<WebClient.IGAutorizovanaKonverzeZadostRetval>;
    /**
     * export function GZmenaFormatuZadostDlg
     *
     * @param {GContent} parentContent
     * @param {{ Ixp: string }} opt
     * @param {Gordic.Global.Enums.ModOtevreni} [ModOtevreni]
     * @returns {JQueryPromise<}
     */
    function GZmenaFormatuZadostDlg(parentContent: GContent, opt: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Gordic.Wfl.WebClient.IGZadostZmenaDatovyFormatRetval>;
    /**
     * Dialog Debug INFO
     *
     * @author  jsindelka
     * @date    20.03.2019
     *
     * @param   parentContent					The content.
     * @param   ModOtevreni						mod otevreni dialogu.
     * @return  .
     */
    function WflListDebugInfoDlg(parentContent: GContent, opt: {
        /** dto s informacemi o certifikátu (GGinCertificateInfo) */
        InfoDto: Wfl.Interface.GDebugInfoDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * Dialog detailu certifikátu
     *
     * @author  thazmuka
     * @date    13.03.2019
     *
     * @param   parentContent					The content.
     * @param   ModOtevreni						mod otevreni dialogu.
     * @return  .
     */
    function GDetailCertifikatuDlg(parentContent: GContent, opt: {
        /** dto s informacemi o certifikátu */
        cert: Gordic.Security.Service.GCertificateInfoDTO;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * Dialog nacitaní dorucnek datových zpráv
     *
     * @author  jsindelka
     * @date    20.03.2019
     *
     * @param   parentContent					The content.
     * @param   ModOtevreni						mod otevreni dialogu.
     * @return  .
     */
    function GNacitaniDorucenekDZDlg(parentContent: GContent, opt: {
        /** dto s informacemi o certifikátu (GGinCertificateInfo) */
        cert: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
 * Dialog pro zadaní referenta
 *
 * @author  jsindelka
 * @date    20.03.2019
 *
 * @param   parentContent					The content.
 * @param   ModOtevreni						mod otevreni dialogu.
 * @return  .
 */
    function GReferentEditUniversalDlg(parentContent: GContent, opt: {
        /** dto s informacemi o certifikátu (GGinCertificateInfo) */
        Label: string;
        IxsFunDefault: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GSuFunRefDto>;
    /**
* Dialog pro zadaní formy
*
* @author  jsindelka
* @date    20.03.2019
*
* @param   parentContent					The content.
* @param   ModOtevreni						mod otevreni dialogu.
* @return  .
*/
    function GetFormaEntityDlg(parentContent: GContent, opt: {
        /** dto s informacemi o certifikátu (GGinCertificateInfo) */
        Label: string;
        FormaDefault: Wfl.Interface.GFormaEntityDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GFormaEntityDto>;
    /**
* Dialog pro zadaní formy
*
* @author  jsindelka
* @date    20.03.2019
*
* @param   parentContent					The content.
* @param   ModOtevreni						mod otevreni dialogu.
* @return  .
*/
    function HromadnaOpravaZasilekDlg(parentContent: GContent, opt: {
        /** dto s informacemi o certifikátu (GGinCertificateInfo) */
        Data: Wfl.Interface.GZasilkaEditListDto[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GPolozkyZasilkyKOpraveDto>;
    /**
* Dialog pro zadaní datumu
*
* @author  jsindelka
* @date    20.03.2019
*
* @param   parentContent					The content.
* @param   ModOtevreni						mod otevreni dialogu.
* @return  .
*/
    function GDatumEditUniversalDlg(parentContent: GContent, opt: {
        /** dto s informacemi o certifikátu (GGinCertificateInfo) */
        Label: string;
        DatumDefault: JsonDate;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GDatumDto>;
    /**
* Dialog pro zadaní ID zasilky
*
* @author  jsindelka
* @date    20.03.2019
*
* @param   parentContent					The content.
* @param   ModOtevreni						mod otevreni dialogu.
* @return  .
*/
    function HledaniZasilekDleIdDlg(parentContent: GContent, opt: {
        /** dto s informacemi o certifikátu (GGinCertificateInfo) */
        TypHledani: Wfl.Interface.TypHledaniZasilek;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GHledaniZasilekDleIdDto>;
    /**
    * Dialog ověření podpisu s paramGroup a paramName (Využito při použití s GWflOverInfoItem[])
    *
    * @author  thazmuka
    * @date    21.02.2020
    *
    * @param   parentContent					The content.
    * @param   ModOtevreni						mod otevreni dialogu.
    * @return  .
    */
    function GOveritPodpisContextDlg(parentContent: GContent, opt: {
        ParamGroup: string;
        ParamName: string;
        Filename: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * (private) Dialog ověření podpisu s doplňujícími informacemi o ověření
     *
     * @author  thazmuka
     * @date    18.08.2020
     *
     * @param   parentContent					The content.
     * @param   ModOtevreni						mod otevreni dialogu.
     * @return  .
     */
    function GOveritPodpisDetailDlg(parentContent: GContent, opt: {
        Ixp: string;
        /**
         *  vybraný item
         * */
        Dto: Gordic.Wfl.Interface.GOveritPodpisItemDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * Dialog ověření k CRL
     *
     * @author  thazmuka
     * @date    06.04.2021
     *
     * @param   parentContent					The content.
     * @param   ModOtevreni						mod otevreni dialogu.
     * @return  .
     */
    function GVerifyCrlDlg(parentContent: GContent, opt: {
        /** identifikator souboru */
        ixb: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GOveritPodpisDto>;
    function GWflHistorieDlg(parentContent: GContent, opt: {
        InputDto: {
            /** identifikátor dokumentu */
            Ixp?: string;
            /** aktuální funkční místo */
            ixs_fun_akt?: string;
            Navazane_Ixp?: string[];
        };
        /** skrýt tlačítko přidat */
        hideAddBtn: boolean;
        /** skrýt tlačítko tisku */
        hidePrintBtn: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * Dialog ověření podpisu
     *
     * @author  thazmuka
     * @date    13.03.2019
     *
     * @param   parentContent					The content.
     * @param   ModOtevreni						mod otevreni dialogu.
     * @return  .
     */
    function GOveritPodpisDlg(parentContent: GContent, opt: {
        /** Identifikátor verze nadřízeného souboru, tedy např ZIP, který obsahuje soubor definovaný pomocí hash, nebo soubor el. podání. */
        ixsUlo?: string;
        /** Kontrolní součet souboru */
        souborHash512?: string;
        /** buď zadat vstupní dto nebo zbytek parametrů */
        dto?: Wfl.Interface.GOveritPodpisDto;
        /** identifikátor dokumentu */
        ixp?: string;
        /** identifikátor souboru */
        ixb?: string;
        /** pořadové číslo pro určení verze dle ixb */
        ser_cislo?: number;
        /** název souboru (to be verified) */
        filename?: string;
        /** guid souboru - pokud nepoužíváme ixb, ixp */
        guid?: string;
        /** skrytí historie ověření */
        hideHistory?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * Historie ověření el. souboru
     */
    function HistorieOvereniDlg(parentContent: GContent, opt?: {
        /**
         * Ixb el. dokumentu.
         */
        Ixb: string;
        /**
         *  Verze el. dokumentu
         * */
        Verze?: number;
        /** id dokumentu */
        Ixp?: string;
        /** nazev souboru */
        FileName?: string;
        /**
         * Typ otevření podpisů na dialogu historie ověření podpisu
         * */
        mode?: Gordic.Wfl.Interface.GHistorieOvereniElDokumentuModeEnum;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
    * Dialog konverze v EPK
    *
    * @author  thazmuka
    * @date    25.07.2023
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GEpkConversionDlg(
    /** rodičovský content */
    parentContent: GContent, opt?: {
        Ixp: string;
        Ixb?: string;
    } | null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Gordic.Wfl.Interface.GEpkConversionStateDto>;
    /**
    * Dialog hromadné OPRAVY metadat
    * - konverze formátu, podpisy, časové razítka
    *
    * @author  thazmuka
    * @date    18.11.2021
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function OpravaMetadatDlg(
    /** rodičovský content */
    parentContent: GContent, opt?: {
        OpravaDatReguestDto?: Interface.GOpravaDatReguestDto;
        /** režim, jestli kontrolujeme spisový znak */
        TypKontrolySpisZnakuProp?: Wfl.Interface.TypKontrolySpisovyZnak;
        /** identifikátor dokument pro specifikaci množiny */
        Ixp?: string | null;
        /**
         * Seznam identifikátorů IXP pro vstupní filtr seznamu
         * - nepoužívat v kombinaci s parametrem IXP
         */
        FilterIxpList?: string[];
        /**
         * Seznam identifikátorů balíků pro vstupní filtr seznamu
         * - nepoužívat v kombinaci s parametrem IXP
         */
        FilterIxsZupList?: string[];
        /** spuštění opravy metadat v režimu EKO */
        Eko?: boolean;
        /** metoda vracího vybraný řádek nebo skupiny vybraných řádků oprav */
        selection?: (activeRow: Gordic.Wfl.Interface.GSpitkonDto | null, selection: Gordic.Wfl.Interface.GSpitkonDto[] | null, cnt: GContentType<any>) => void;
        /** možnost přidat další akce do menubaru */
        menuParams?: MenuParams[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<{
        /** pole opravených identifikátorů */
        correctedIxpList: string[];
        /** příznak refreshe */
        stav: boolean;
    }>;
    /**
     * Nastavení gfrm formulářu k entitě.
     *
     * @author  DSebesta
     * @date    21.05.2019
     *
     * @param {GContent} parentContent Nadřazení kontent.
     * @param {WebClient.GDoruceniZasilkyDlgInputParams} opt Vstupní parametry dialogu.
     * @param {Gordic.Global.Enums.ModOtevreni} [ModOtevreni] Mód otevřenídialogu.
     * @returns {JQueryPromise<{isSaved: boolean}>} Promise zavření dialogu a jeho návratové hodnoty.
     */
    function NastavFormulareKDokumentuDlg(parentContent: GContent, opt: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<{
        isSaved: boolean;
    }>;
    /**
    * Otevře okno pro zadání ID
    *
    * @author  JSindelka
    * @date    7.1.2019
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    * @returns {JQueryPromise<undefined>} Promise.
    */
    function GetIdentifikatorDlg(parentContent: GContent, opt?: {
        TitleTab?: string;
    }): JQueryPromise<Wfl.Interface.GSeznamId | undefined>;
    /**
    * Otevře okno pro zadání textu
    *
    * @author  JSindelka
    * @date    7.1.2019
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    * @returns {JQueryPromise<undefined>} Promise.
    */
    function GetTextUniversalDlg(parentContent: GContent, opt?: {
        Label: string;
    }): JQueryPromise<Wfl.Interface.GTextDto | undefined>;
    /**
* Otevře okno pro zadání textu
*
* @author  JSindelka
* @date    7.1.2019
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @returns {JQueryPromise<undefined>} Promise.
*/
    function GetNumberUniversalDlg(parentContent: GContent, opt?: {
        Label: string;
        InitValue?: number;
    }): JQueryPromise<Wfl.Interface.GNumberDto | undefined>;
    /**
* Otevře okno pro zadání ciselnikove hodnoty
*
* @author  JSindelka
* @date    7.1.2019
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @returns {JQueryPromise<undefined>} Promise.
*/
    function GetDbValueUniversalDlg(parentContent: GContent, opt?: {
        Label: string;
        Typ: Interface.TypZmenyPolozkyEnum;
    }): JQueryPromise<Wfl.Interface.GEditValueUniversalDto | undefined>;
    /**
    * Dialog opravy metadat autorizované konverze
    *
    * @author  JSindelka
    * @date    15.11.2019
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function OpravaMetadatMultiDlg(// update nazvu metody (thazmuka 18.11.2021)
    parentContent: GContent, opt: {
        OpravaDatReguestDto: Interface.GOpravaDatReguestDto;
        TypOpravy: Interface.TypHromadneOpravyNevalidnichZaznamu;
        Data: Interface.GSpitkonDto[];
        KontrolovatSpZnak: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<{
        opraveneIxp: string[];
    }>;
    /**
* Dialog zobrazení nevalodních dat
* - v případě, že se zavolá bez identifikátoru Ixp, tak lze nastavit vlastní formu a ta se mu v thenu vrátí
*
* @author  JSindelka
* @date    15.11.2019
*
* @param   parentContent                        The content.
* @param   ModOtevreni                    mod otevreni dialogu.
* @return  .
*/
    function NevalidniDataPoKontroleListDlg(parentContent: GContent, opt: {
        /** Identifikátor dokumentu */
        Typ: Interface.TypWflObjektu;
        Ixs: string;
        globalInfo?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<string[]>;
    /**
* Dialog pro vyber zasilky.
* - v případě, že se zavolá bez identifikátoru Ixp, tak lze nastavit vlastní formu a ta se mu v thenu vrátí
*
* @author  JSindelka
* @date    15.11.2019
*
* @param   parentContent                        The content.
* @param   ModOtevreni                    mod otevreni dialogu.
* @return  .
*/
    function VyberZasilkyListDlg(parentContent: GContent, opt: {
        /** Identifikátor dokumentu */
        Data: Interface.GZasilkaDto[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<string>;
    /**
* Dialog formy dokumentu, spisu.
* - v případě, že se zavolá bez identifikátoru Ixp, tak lze nastavit vlastní formu a ta se mu v thenu vrátí
*
* @author  JSindelka
* @date    15.11.2019
*
* @param   parentContent                        The content.
* @param   ModOtevreni                    mod otevreni dialogu.
* @return  .
*/
    function ZasilkyInfoDlg(parentContent: GContent, opt: {
        /** Identifikátor dokumentu */
        Sxs: string;
        ModFormu: Interface.ModFormuZasilkaInfo;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
* Dialog zmeny hesla do DS
* @author  JSindelka
* @date    15.11.2019
*
* @param   parentContent                        The content.
* @param   ModOtevreni                    mod otevreni dialogu.
* @return  .
*/
    function AuditAkciDSListAC(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
* Dialog zmeny hesla do DS
* @author  JSindelka
* @date    15.11.2019
*
* @param   parentContent                        The content.
* @param   ModOtevreni                    mod otevreni dialogu.
* @return  .
*/
    function DSLoginInfoDlg(parentContent: GContent, opt: {
        PouzeDBGinis: Boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
* Dialog zmeny hesla do DS
* @author  JSindelka
* @date    15.11.2019
*
* @param   parentContent                        The content.
* @param   ModOtevreni                    mod otevreni dialogu.
* @return  .
*/
    function ZmenaHeslaDZDlg(parentContent: GContent, opt: {
        MailboxInfo: Interface.GDSInfoDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
 * Přímé předání dokumentu
 *
 * @author  Dsebesta
 * @date    25.03.2020
 *
 * @param {gcontent} parentContent The content.
 * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
 * @param {!object} opt Parametry dialogu.
 * @param {!string} opt.Ixp Ixp dokumentu.
 * @param {TypPredaniPrimePredaniDokumentuDlg} opt.TypPredani (default = false) Příznak, zda se jedná ohromadné odeslání.
 * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
 */
    function GPrimePredaniDokumentuDlg(parentContent: GContent, opt: WebClient.GPrimePredaniDokumentuDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<boolean | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * Tisk podacího deníku
    *
    * @author  Dsebesta
    * @date    20.04.2020
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    * @param {TypPredaniPrimePredaniDokumentuDlg} opt.TypPredani (default = false) Příznak, zda se jedná ohromadné odeslání.
    * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
    */
    function TiskPodacihoDenikuDlg(parentContent: GContent, opt: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<null | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog exportu dokumentu
     *
     * @author  DSebesta
     * @date    07.12.2017
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.Ixp Ixp dokumentu.
     * @param {boolean} [opt.Hromadne=false] (default = false) Příznak, zda se jedná ohromadné odeslání.
     * @returns {JQueryPromise<{ ulozeno: boolean } | undefined>} Promise.
     */
    function GExportElDokumentuDlg(parentContent: GContent, opt: WebClient.GExportElDokumentuDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GExportElDokumentuDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog vyběru exportovaných dokumentu
     *
     * @author  DSebesta
     * @date    08.03.2021
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.Ixp Ixp dokumentu.
     * @param {!string[]} opt.IxpVybranychDokumentu=null] Vybrané dokumenty
     * @returns {JQueryPromise<WebClient.GExportElDokumentuVyberDokumentuDlgReturnValue | undefined>} Promise.
     */
    function GExportElDokumentuVyberDokumentuDlg(parentContent: GContent, opt: WebClient.GExportElDokumentuVyberDokumentuDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GExportElDokumentuVyberDokumentuDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    interface IKontrolaMetadatDoplnPolozekOutput {
        /** výsledek kladně provedených akcí */
        ResultIxp?: string[] | null;
    }
    function KontrolaMetadatDoplnPolozekDlg(parentContent: GContent, opt: {
        TypHromadneOpravy: Interface.TypHromadneOpravyNevalidnichZaznamu;
        Input: Interface.GSpitkonDto[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<IKontrolaMetadatDoplnPolozekOutput>;
    /**
     * Otevře dialog zveřejnění
     *
     * @author  BMartinek
     * @date    07.12.2017
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.Ixp Ixp dokumentu.
     * @returns {any} Promise.
     */
    function GZverejneniSmluvPrehled(parentContent: GContent, opt: Gordic.Wfl.WebClient.IGWflZverejneniSmluvPrehled05Options, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog seznamu zveřejnění (celková funkčnost)
     *
     * @author  PSmejkal
     * @date    12.04.2024
     *
     * @param input Input + options
     * @returns
     */
    function GZverejneniSmluvPrehledNew(input: Gordic.Gui.Dialogs.OpenDialogParams<Gordic.Wfl.WebClient.GZverejneniSmluvPrehledDlgInputParams>): JQuery.Promise<WebClient.GZverejneniSmluvPrehledDlgOutputParams | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog plánování zveřejnění
     *
     * @author  PSmejkal
     * @date    09.05.2024
     *
     * @param input Input + options
     * @returns
     */
    function GZverejneniSmluvPlanSingle(input: Gordic.Gui.Dialogs.OpenDialogParams<Gordic.Wfl.WebClient.GZverejneniSmluvPlanSingleDlgInputParams>): JQuery.Promise<WebClient.GZverejneniSmluvPlanSingleDlgOutputParams | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog zveřejnění protistranou
     *
     * @author  PSmejkal
     * @date    13.05.2024
     *
     * @param input Input + options
     * @returns
     */
    function GZverejneniSmluvZverejnenoProtistranou(input: Gordic.Gui.Dialogs.OpenDialogParams<Gordic.Wfl.WebClient.GZverejneniSmluvZverejnenoProtistranouDlgInputParams>): JQuery.Promise<WebClient.GZverejneniSmluvZverejnenoProtistranouDlgOutputParams | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog vytvoření typového spisu
     *
     * @author  dSebesta
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
     */
    function VytvoritTypovySpisDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        ProvestVytvoreniVDialogu: boolean;
    }>): JQuery.Promise<{
        ixs_tss: string;
        znackaTs: string;
        ixpTss?: string;
    } | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * Otevře dialog vytvoření typového spisu
    *
    * @author  dSebesta
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
    */
    function DocasneUlozisteDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        Ixp: string;
        AktUmisteni: string;
    }>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
   * Editace mailu
   *
   * @author  dSebesta
   *
   * @param {gcontent} parentContent The content.
   * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
   * @param {!object} opt Parametry dialogu.
   * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
   */
    function OdeslaniEditaceMailuDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        Ixp: string;
        TypMailu?: number;
        TextMailu?: string;
    }>): JQuery.Promise<{
        normalText: string;
        htmlText: string;
        typ_mailu: number;
    } | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
   * SK dialog náhled na form
   *
   * @author  dSebesta
   *
   * @param {gcontent} parentContent The content.
   * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
   * @param {!object} opt Parametry dialogu.
   * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
   */
    function EformDialogSKDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<Wfl.WebClient.GEformDialogSKDlgInputOptions>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
   * SK dialog vyberFormulare
   *
   * @author  dSebesta
   *
   * @param {gcontent} parentContent The content.
   * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
   * @param {!object} opt Parametry dialogu.
   * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
   */
    function GEformVyberFormulareDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<Wfl.WebClient.GEformVyberFormulareDlgInputOptionsDto>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
      * Zmena spouštěcí události
      *
      * @author  dSebesta
      *
      * @param {gcontent} parentContent The content.
      * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
      * @param {!object} opt Parametry dialogu.
      * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
      */
    function ZmenaSpouUdalostiDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        Ixp: string;
    }>): JQuery.Promise<{
        zmena: boolean;
    } | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * Pozastavení skartační operace
    *
    * @author  dSebesta
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
    */
    function PozastSkartacniOperaceDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        Ixp: string;
    }>): JQuery.Promise<{
        zmena: boolean;
    } | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * Změna strupně utajení
    *
    * @author  dSebesta
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
    */
    function StupenUtajeniDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        dto: Wfl.WebClient.StupenUtajeniDto;
    }>): JQuery.Promise<{
        dto: Wfl.WebClient.StupenUtajeniDto;
    } | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * Změna strupně utajení
    *
    * @author  dSebesta
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
    */
    function NastaveniPrizZobZastupemDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        dto: Wfl.WebClient.NastaveniPrizZobZastupemDto;
    }>): JQuery.Promise<{
        dto: Wfl.WebClient.NastaveniPrizZobZastupemDto;
    } | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
* Dialog seznam dok. spisů
*
* @author  JSíndelka
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
*/
    function DokSpisUniversalDlg(parentContent: GContent, opt?: {
        TypSeznamuDokSpis: Interface.TypSeznamuDokSpis;
        Data: Interface.GDokSpisListDto[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GEditaceZasilkyDto>;
    /**
  * Změna strupně utajení
  *
  * @author  dSebesta
  *
  * @param {gcontent} parentContent The content.
  * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
  * @param {!object} opt Parametry dialogu.
  * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
  */
    function HistorieKonverzaceSKZpravDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.HistorieKonverzaceSKZpravDlgInput>): JQuery.Promise<WebClient.HistorieKonverzaceSKZpravDlgOutput | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
 * Nabídka Correlation ID
 *
 * @author  dSebesta
 *
 * @param {gcontent} parentContent The content.
 * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
 * @param {!object} opt Parametry dialogu.
 * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
 */
    function NabidkaCorrellationIdDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.NabidkaCorrellationIdDlgInput>): JQuery.Promise<WebClient.NabidkaCorrellationIdDlgOutput | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
   * SK dialog vyberFormulare
   *
   * @author  dSebesta
   *
   */
    function GInfoODohledaniDleOtisku(input: Gordic.Gui.Dialogs.OpenDialogParams<Wfl.WebClient.GInfoODohledaniDleOtiskuOptions>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Nabídka Correlation ID
     *
     * @author  dSebesta
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
     */
    function GMLNastaveniModeluDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GMLNastaveniModeluDlgInputParams>): JQuery.Promise<WebClient.GMLNastaveniModeluDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
  * Nabídka Correlation ID
  *
  * @author  dSebesta
  *
  * @param {gcontent} parentContent The content.
  * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
  * @param {!object} opt Parametry dialogu.
  * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
  */
    function TestDlouheOperaceDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<any>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * StrukturaNadrazenychEntityDlg
    *
    * @author  Dsebesta
    * @date    6.11.2017
    *
    * @param {gcontent}                               parentContent                   The content.
    * @param {object}                                 opt                             parametry
    * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
    * @return  .
    */
    function StrukturaNadrazenychEntityDlg(parentContent: GContent, opt: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Seznam příloh pro vizuální umístění podpisu
     */
    function GEpkVisualAttachmentGridDlg(parentContent: GContent, opt: {
        /** ukládat na dialogu vizuální umístění ? */
        SaveVisualSignature?: boolean;
        Ixp: string;
        IxsDpo?: string;
        SerCislo?: number;
        Aktivita?: number;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery;
}
declare namespace Gordic.Wfl.Dialogs.GDetailDokumentuSpisuParams {
    enum IdZalozkyNeboPaneluKOtevreni {
        /**
         * Otevře jako základní content z hlavního menu (task panelu).
         */
        panelNotes = "panelNotes",
        panelLinkedDocs = "panelLinkedDocs",
        panelAttachments = "panelAttachments",
        panelNavigator = "panelNavigator"
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** group result */
    interface GroupResult {
        /** Je identifikátor validní? (má validní metadata) */
        IsError: boolean;
        /** Identifikátor */
        Key: string;
        /** zpráva o chybě */
        Error: string;
    }
    interface columnListObjInterface {
        /** názvy sloupců*/
        columnList: string;
    }
    interface IconTemplateWfl extends IconTemplate {
        txtRow1?: string;
        txtRow2?: string;
    }
    /** (interface) generování ZUD
     * pro modul PPO05
     * */
    interface IGenerateZudType {
        /** textový popisek
         * - 1. Denní kompletní transakční protokol, 2. Denní transakční protokol změn
         * */
        caption: string;
        /** hodnota */
        value: Wfl.Interface.GPpoTpTypeEnum;
    }
}
declare namespace Gordic.Wfl.Globals.Enums {
    enum TypDok {
        /**
         * Vlastni.
         */
        Vlastni = 0,
        /**
         * Cizi.
         */
        Cizi = 1
    }
    enum TypBlp {
        /**
         * dokumenty a spisy.
         */
        dokspis = 0,
        /**
         * balíky.
         */
        baliky = 10,
        /**
         * zásilky.
         */
        zasilky = 20,
        /**
         * neurceno.
         */
        neurceno = 99
    }
    enum TypId {
        /**
         * IXS.
         */
        IXS = 0,
        /**
         * IXP.
         */
        IXP = 1
    }
    enum UcelRedistribuce {
        /**
         * PREDANI.
         */
        PREDANI = 0,
        /**
         * PRIDELENI.
         */
        PRIDELENI = 1
    }
    enum RedistribuceFiltry {
        /**
         * VrfuAktivita.
         */
        VrfuAktivita = 0,
        /**
         * VrfuSubrada.
         */
        VrfuSubrada = 1,
        /**
         * VrfuIxpDen.
         */
        VrfuIxpDen = 2,
        /**
         * Aktivita.
         */
        Aktivita = 3,
        /**
         * VrfuTypAg.
         */
        VrfuTypAg = 4,
        /**
         * DlePovolenychFazi.
         */
        DlePovolenychFazi = 5
    }
    enum TypAgendy {
        /**
         * SSL.
         */
        SSL = 0,
        /**
         * EKO.
         */
        EKO = 1,
        /**
         * GIN.
         */
        GIN = 2,
        /**
         * REG.
         */
        REG = 3
    }
    enum TypeIxsInList {
        /**
         * IxsFun.
         */
        IxsFun = 0,
        /**
         * IxsSu.
         */
        IxsSu = 1
    }
    enum ZpusobGenerovaniIxp {
        /**
         * ParametremUsuGenPid.
         */
        ParametremUsuGenPid = 0,
        /**
         * ParametremGinGenIxp.
         */
        ParametremGinGenIxp = 1,
        /**
         * Stitkem.
         */
        Stitkem = 2,
        /**
         * Opisem.
         */
        Opisem = 3,
        /**
         * Volitelne.
         */
        Volitelne = 4
    }
    enum TypDbHledani {
        /**
         * Zakladni.
         */
        Zakladni = 0,
        /**
         * Archivni.
         */
        Archivni = 1,
        /**
         * Vsude.
         */
        Vsude = 2
    }
    enum SkupinaHledani {
        /**
         * Vse.
         */
        Vse = 0,
        /**
         * Dokument.
         */
        Dokument = 1,
        /**
         * SamostatnyDokument.
         */
        SamostatnyDokument = 2,
        /**
         * DokumentVlozenyDoSpisu.
         */
        DokumentVlozenyDoSpisu = 3,
        /**
         * Spis.
         */
        Spis = 4
    }
    enum AlgHledaniEle {
        /**
         * SeVsemiSlovy.
         */
        SeVsemiSlovy = 0,
        /**
         * SJednimSlovem.
         */
        SJednimSlovem = 1,
        /**
         * NejlepsiSpojeniSlov.
         */
        NejlepsiSpojeniSlov = 2
    }
    enum OblastHledaniEle {
        /**
         * Titulek dokumentu.
         */
        TitulekDokumentu = 4,
        /**
         * Popis dokumentu.
         */
        PopisDokumentu = 5,
        /**
         * Obsah dokumentu.
         */
        ObsahDokumentu = 6,
        /**
         * VlozilPracovnik.
         */
        VlozilPracovnik = 3,
        /**
         * Obsah dokumentu - hledání pomocí výrazu
         */
        ObsahDokumentuVyraz = 61
    }
    enum ZpusobZobrazeniHledaniEle {
        /**
         * Dokumenty.
         */
        Dokumenty = 0,
        /**
      * Soubory.
      */
        Soubory = 1
    }
    enum DleVyrizeniHledani {
        /**
         * NefiltrovatDleVyrizeni.
         */
        NefiltrovatDleVyrizeni = 0,
        /**
         * Vyrizeno.
         */
        Vyrizeno = 1,
        /**
         * Nevyrizeno.
         */
        Nevyrizeno = 2
    }
    enum UcelLoginEmail {
        /**
         * NEURCENO
         */
        NEURCENO = 0,
        /**
         * VYPRAVENI_ZASILKY
         */
        VYPRAVENI_ZASILKY = 1,
        /**
         * DOSLA_POSTA
         */
        DOSLA_POSTA = 2
    }
    /**
     * Typ mailboxu - tab. gincmbx
     */
    enum TypMailboxu {
        /**
         * jménem a heslem
         */
        neurceno = 0,
        /**
         * příjem el. podání - e_mail
         */
        email = 10,
        /**
         * ostatní-MAS (dotazy na stav, scan, interní podání)
         */
        ostatni = 20,
        /**
         * datová schránka ISDS
         */
        datovaSchranka = 30,
        /**
         * Gordic exchange (GEX)
         */
        gordicExchange = 40,
        /**
         * všechny - select bez WHERE na typ mailboxu
         */
        vsechny = 999,
        /**
         * datová schránka ISDS nebo Gordic exchange (GEX)
         */
        datovaSchrankaNeboGordicExchange = 3040
    }
    enum ActionsName {
        VlozitDoPracBloku = "actVlozitDoPracBloku",
        TriditDleID = "actTriditDleID",
        PosunRadku = "actPosunRadku",
        Sdruzit = "actSdruzit",
        Rozebrat = "actRozebrat",
        TiskDorucenekDZ = "actTiskDorucenekDZ",
        TiskProtokoluOdeslani = "actTiskProtokoluOdeslani",
        TiskObalekZasilek = "actTiskObalekZasilek",
        TiskPredProtZasilek = "actTiskPredProtZasilek",
        TiskPredProt = "actTiskPredProt",
        TiskPredProtPomocny = "actTiskPredProtPomocny",
        tiskOznacenych = "actTiskOznacenych",
        ZmenitFormu = "actZmenitFormu",
        ZtvarneniMetadatSpisu = "actZtvarneniMetadatSpisu",
        KonvertovatDoPDF = "actKonvertovatDoPDF",
        VytvoritZadostOZDF = "actVytvoritZadostOZDF",
        ZobrazitInformace = "actZobrazitInformace",
        ZobrazitInformacePoKontrole = "actZobrazitInformacePoKontrole",
        VytvoritZadostOAK = "actVytvoritZadostOAK",
        ZmenitDF = "actZmenitDF",
        OverifFormat = "actOverifFormat",
        ZmenitPrideleni = "actZmenitPrideleni",
        OznacitJakoPDFA = "actOznacitJakoPDFA",
        OpravitNevalidni = "actOpravitNevalidni",
        ServisniSeznamDZ = "actServisniSeznamDZ",
        ZrusitPrideleni = "actZrusitPrideleni",
        OdmitnoutPrevzeti = "actOdmitnoutPrevzeti",
        PripravitKPredani = "actPripravitKPredani",
        OznacitProvedene = "actOznacitProvedene",
        OznacitJakoZnovuzpracovane = "actOznacitJakoZnovuzpracovane",
        ZmenaOznaceniProvedeneNaProvedeneDrive = "actZmenaOznaceniProvedeneNaProvedeneDrive",
        HromadnaOpravaZasilek = "actHromadnaOpravaZasilek",
        ZobrazitInfoOZasilce = "actZobrazitInfoOZasilce",
        InfoOZasilkachHP = "actInfoOZasilkachHP",
        ZnovuOdeslat = "actZnovuOdeslat",
        Souhrn = "actSouhrn",
        NacistZeSouboru = "actNacistZeSouboru",
        ImportDat = "actImportDat",
        ExportDat = "actExportDat",
        ElSouborySNearchivnimFormatem = "actElSouborySNearchivnimFormatem",
        OveritPodpisy = "actOveritPodpisy",
        ZmenitPevnouVazbuNaVolnou = "actZmenitPevnouVazbuNaVolnou",
        VyjmoutVazbuSouvisejici = "actVyjmoutVazbuSouvisejici",
        ZobrazitDetailEsuNad = "actZobrazitDetailEsuNad",
        TestVyvoj = "actTestVyvoj"
    }
    enum FieldName {
        IdZasilky = "id_dorucenky",
        SXS = "sxs"
    }
}
declare namespace Gordic.Wfl.Common {
    function GetIconTemplate(gicon: Gordic.Wfl.WebClient.GIcon): IconTemplate;
    function ShowWarningAkceSeNezdarila(content: GContent): void;
    function ShowWarning(content: GContent, text?: string): void;
    function ShowInfo(content: GContent, text: string): void;
    function ShowNotificationVysledkuOperace(typ: Gordic.Gin.Interface.TypVysledkuOperace, content?: GContent, label?: string, text?: string, IDTask?: string): void;
    function ShowNotification(stav: Gordic.Gin.Globals.Enums.StateEnum, content?: GContent, label?: string, text?: string, IDTask?: string): void;
}
declare namespace Gordic.Wfl.Globals.ListSupport {
    function TypDokumentuColumn(): GGridColumn<any>;
    function DelegateStavSmazaniIcon(): GGridColumn<any>;
    function EleColumn(): GGridColumn<any>;
    function errorTextColumn(): GGridColumn<any>;
    function FormaColumn(): GGridColumn<any>;
    function PuvodColumn(): GGridColumn<any>;
    function StavDokColumn(): GGridColumn<any>;
    function SchvalenoColumn(): GGridColumn<any>;
    function PrizBalikColumn(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
    }): GGridColumn<any>;
    function PrizVBalikuColumn(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
    }): GGridColumn<any>;
    function PrizCjColumn(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
    }): GGridColumn<any>;
    function PrizKopieColumn(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
    }): GGridColumn<any>;
    function PrizKopColumn(): GGridColumn<any>;
    function StavUkonuEpkColumn(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
    }): GGridColumn<any>;
    /**
     * sloupec barevného označení
     * @param type typ barevného označení (0 - dokument v USU, 1 - žádost v EPK)
     * @param readonlyFunc funkce pro předání příznaku, že je daný sloupec pouze pro čtení
     * @param globalSettings předáné globální nastavení pro řízení volitelných textů jednotlivých barev
     * @param change funkce change pro vlastní obsluhu ukládání barev
     * @author thazmuka
     * (17.03.2021)
     * @since 486.1.0.176
     */
    function UzoColumn<TRow = any>(type?: Wfl.Interface.GColorpickerTypeEnum, readonlyFunc?: (row?: TRow) => boolean, globalSettings?: Gordic.Data.IGStorage | null, change?: (uzo: Gordic.Widget.GColorPicker.UzoEnum | null) => void, scope?: Gin.WebClient.GScopeOptionLevel[]): GGridColumn<any>;
    function GetIconStavDok(row: any): IconTemplate | undefined | null;
    function GetIconTerminVyrizeni(row: any): IconTemplate | undefined | null;
    function KonverzeDokumentuColumn(): GGridColumn<Gordic.Wfl.WebClient.GOdeslaniSeznamDto>;
    function OriginalDokumentuColumn(): GGridColumn<Gordic.Wfl.WebClient.GOdeslaniSeznamDto>;
    /**
     * Vrátí iconTemplate pro sloupeček příznaku Originál na zásilce.
     *
     * @author  TFeik
     * @date    02.09.2022
     *
     * @param {Gordic.Wfl.WebClient.GOdeslaniSeznamDto} item
     * @param {string} [kopieIcon]
     * @returns {IconTemplate}
     */
    function OriginalDokumentuColumnIconTemplate(item: Gordic.Wfl.WebClient.GOdeslaniSeznamDto, kopieIcon?: string): IconTemplate;
    /**
     * export function SluzbyOdeslaniDokumentuColumn
     *
     * @param {Data.Readers.WflcposDto[]} wflcposReaderData Načtená data readeru doplňkových služeb, ze kterých se dohledává text.
     * @returns {GGridColumn<Gordic.Wfl.WebClient.GOdeslaniSeznamDto>}
     */
    function SluzbyOdeslaniDokumentuColumn(wflcposReaderData: Data.Readers.WflcposDto[]): GGridColumn<Gordic.Wfl.WebClient.GOdeslaniSeznamDto>;
    function VysledekOdeslaniDokumentuColumn(): GGridColumn<Gordic.Wfl.WebClient.GOdeslaniSeznamDto>;
    function ElektronickaSchrankaColumn(odeslani: {
        ginSslDatSchrPar?: number | string | null;
        ginGexPovolenPar?: number | string | null;
        isSendByEDeskAllowed?: boolean | null;
        isSendByInternalAllowed?: boolean | null;
    }): GGridColumn<Gordic.Wfl.WebClient.GOdeslaniSeznamDto>;
    function DatumOvereniVSzrColumn(): GGridColumn<Gordic.Wfl.WebClient.GOdeslaniSeznamDto>;
    function ElektronickyDokumentColumn(): GGridColumn<Gordic.Wfl.WebClient.GOdeslaniSeznamDto>;
    function VysledekOvereniEsuDokumentuColumn(): GGridColumn<Gordic.Wfl.WebClient.GOdeslaniSeznamDto>;
    function VysledekOvereniIsdsDokumentuColumn(): GGridColumn<Gordic.Wfl.WebClient.GOdeslaniSeznamDto>;
    function TypDokumentuDokumentuColumn(): GGridColumn<Gordic.Wfl.WebClient.GOdeslaniPrilohaPisemnostiDto>;
    /**
     *
     * @returns
     */
    function VysledekHromadneAkceOdeslaniDokumentuColumn(): GGridColumn<Gordic.Wfl.WebClient.GOdeslaniSeznamDto>;
    function DokumentFyzickyColumn(this: any, TypAg: any): GGridColumn<any>;
    function _DelegateFyzAgdImg(value: any, TypAg: any): IconTemplate | null | object;
    function _DocumentImg(s_fyz: number, priz_spis: number, ciziAgenda: boolean, TypAg: any): IconTemplate | null | object;
    function VlastnictviARedistribuceColumn(this: any, IxsFun: string, light: any): GGridColumn<any>;
    function _DelegateStavDistImg(stav_dist: any, ixs_fun: any, IxsFun: any): IconTemplate | null;
    function DelegateTypElPodpisuIcon(): GGridColumn<any>;
    function RozsirNeboInicializujColumnList(columnListObj?: Gordic.Wfl.WebClient.columnListObjInterface, novaHodnota?: string): WebClient.columnListObjInterface;
    function TypEntityColumnDlg(extendObj?: {
        withOutDocumentIcon?: boolean;
        scope?: Gin.WebClient.GScopeOptionLevel[];
        columnListObj?: Gordic.Wfl.WebClient.columnListObjInterface;
    }): GGridColumn<any>;
    function TypEntityVypocet(hodnota: number, extendObj?: {
        withOutDocumentIcon?: boolean;
    }): Gordic.Wfl.WebClient.IconTemplateWfl | null;
    function VlastnictviDoruceniColumnDlg(extendObj?: any): GGridColumn<any>;
    function VlastnictviDoruceniVypocet(hodnota: number, extendObj?: any): IconTemplate | null;
    function TechnickeVlastnostiColumnDlg(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
        columnListObj?: Gordic.Wfl.WebClient.columnListObjInterface;
    }): GGridColumn<any>;
    function TechnickeVlastnostiVypocet(hodnota: number, extendObj?: any): IconTemplate | undefined;
    function StavZpracovaniColumnDlg(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
        columnListObj?: Gordic.Wfl.WebClient.columnListObjInterface;
    }): GGridColumn<any>;
    function StavZpracovaniVypocet(hodnota: number, extendObj?: any): IconTemplate | undefined;
    function VlastnictviRedistribuceColumnDlg(extendObj?: any): GGridColumn<any>;
    function NovaRedistribuceColumnDlg(extendObj?: any): GGridColumn<any>;
    function VlastnictviRedistribuceVypocet(hodnota: number, extendObj?: any): IconTemplate | undefined;
    function NovaRedistribuceVypocet(hodnota: number, extendObj?: any): IconTemplate | undefined;
    function NovaPostaZPodatelny(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    function PrilohyWflColumnDlg(extendObj?: any): GGridColumn<any>;
    function ElPrilohyWflColumnDlg(extendObj?: any): GGridColumn<any>;
    function PoziceSpisColumnDlg(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
        columnListObj?: Gordic.Wfl.WebClient.columnListObjInterface;
    }): GGridColumn<any>;
    function PoziceSpisVypocet(hodnota: number, extendObj?: any): IconTemplate | undefined;
    function TerminIcoColumnDlg(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
        columnListObj?: Gordic.Wfl.WebClient.columnListObjInterface;
    }): GGridColumn<any>;
    function TerminColumnDlg(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
    }): GGridColumn<any>;
    function TerminDilciIcoColumnDlg(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
        columnListObj?: Gordic.Wfl.WebClient.columnListObjInterface;
    }): GGridColumn<any>;
    function TerminDilciColumnDlg(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
    }): GGridColumn<any>;
    function TerminVypocet(hodnota: number, extendObj?: any): IconTemplate | undefined;
    function PrizVBalikuActionVypocet(hodnota: number, extendObj?: any): IconTemplate | undefined;
    function DoplnujiciInformaceColumnDlg(extendObj?: {
        scope?: Gin.WebClient.GScopeOptionLevel[];
        columnListObj?: Gordic.Wfl.WebClient.columnListObjInterface;
    }): GGridColumn<any>;
    function DoplnujiciInformaceVypocet(pole: any, extendObj?: any): string;
    function StatusBarKolekceIkon(iconDto: Wfl.Interface.GIconCalculatorDto, extendObj?: any): GActionParams[];
    function TypEntityAction(hodnota: number | undefined | null, extendObj?: any): GActionParams;
    function TechnickeVlastnostiAction(hodnota: number | undefined | null, extendObj?: any): GActionParams;
    function PoziceSpisAction(hodnota: number | undefined | null, extendObj?: any): GActionParams;
    function StavZpracovaniAction(hodnota: number | undefined | null, extendObj?: any): GActionParams;
    function TerminAction(hodnota: number | undefined | null, extendObj?: any): GActionParams;
    function DoplnujiciInformaceAction(hodnota: Wfl.Interface.DoplnujiciInformaceIco[] | undefined | null, extendObj?: any): GActionParams;
    function PrizVBalikuAction(hodnota: number | undefined | null, extendObj?: any): GActionParams;
    function HromadneAkceZaregistrujnaContent(options: {
        /**
         * content
         */
        content: GContent;
        /**
         * funkce pro ziskani radku
         */
        getSelectedRowsInfoFromList: () => any;
        /**
       * funkce pro ziskani radku
       */
        getIxpArrayFromSelection: () => any;
        /**
        výsledná akce
       */
        zpracujResultSGroupResult: (retVal: any) => any;
        /**
        getIxpOfActiveRow
       */
        getIxpOfActiveRow: () => any;
        /**
        getSelectedGDataAkceSslProfil pro práce s balíky
       */
        getSelectedGDataAkceSslProfil?: () => any;
        /**
           reloadfunkce
          */
        reload: () => any;
        /**
         Zda je nutný výběr deníku        C#     GSslClientCommon.NutnyVyberDenikuCj()
          */
        isNutnyVyberDenikuCj: boolean;
        /**
        ssl_rem_dokd
        */
        ssl_rem_dokd: number;
        /**
        gin_n23_vedd
        */
        gin_n23_vedd: number;
        /**
         přípona k názum akcí, slouží pro možnost hromadné změny názvu akcí
         */
        actNameSufix?: string;
    }): void;
    function HromadneAkceVratMenu(options: {
        /**
         * content
         */
        content: GContent;
        /**
        * dto s favorite akci
        */
        favoriteHromadneAkceDto?: Interface.GHromadneWflAkceDto;
        /**
         přípona k názum akcí, slouží pro možnost hromadné změny názvu akcí
         */
        actNameSufix?: string;
    }): MenuParams[];
    function GetDefaultGHromadneWflAkceDto(defaultValue?: boolean): Interface.GHromadneWflAkceDto;
    function HideShowHromadneAkce(options: {
        /**
         * content
         */
        content: GContent;
        /**
       * povolovací akce
       */
        hromadneAkceWflDto: Interface.GHromadneWflAkceDto;
        /**
         přípona k názum akcí, slouží pro možnost hromadné změny názvu akcí
         */
        actNameSufix?: string;
    }): void;
    function updateVisibleIfChange(object: any, visible: any): void;
    function projdiChildrenAKdyztakSchovStatic(object: any): void;
    function updateEnabledIfChange(object: any, enabled: any): void;
    function EnableShowHromadneAkce(options: {
        /**
         * content
         */
        content: GContent;
        /**
       * povolovací akce
       */
        hromadneAkceWflDto: Interface.GHromadneWflAkceDto;
        /**
         přípona k názum akcí, slouží pro možnost hromadné změny názvu akcí
         */
        actNameSufix?: string;
    }): void;
    function NastavHiddenZbytecnymSeparatorumZMenuParams(options: {
        /**
         * content
         */
        content: GContent;
        /**
       * povolovací akce
       */
        menuParamsArr: MenuParams[];
    }): void;
    /**
     * Přidání ikonového sloupce Stav Finanční kontroly
     */
    function StavFKColumn(scope?: Gin.WebClient.GScopeOptionLevel[]): GGridColumn<any>;
    /**
     * Přidání ikonového sloupce Stav Účetní kontroly
     */
    function StavUKColumn(scope?: Gin.WebClient.GScopeOptionLevel[]): GGridColumn<any>;
    /**
     * Přidání ikonového sloupce Stav Průběžné kontroly
     */
    function StavPKColumn(scope?: Gin.WebClient.GScopeOptionLevel[]): GGridColumn<any>;
    /**
     * Vytvoření iconTemplate pro FK a EKO schvalovací proces
     * @param data GWflvdfk dto
     * @param meta meta
     * @param field Stringový název property objektu
     */
    function iconFKTemplate(data: any, meta: any, field: string, fkDto?: any): {
        text: any;
        icon: string;
    } | null;
    interface IGroupResultProvider {
        GroupResult: GroupResultItem[] | undefined;
    }
    interface GroupResultItem {
        Key: string;
        IsError?: boolean;
        Error?: string;
    }
    /**
     * Vrátí sloupec gridu s ikonou výsledku hromadné akce.
     *
     * @author  TFeik
     * @date    09.12.2021
     *
     * @param {{ groupResultProvider: IGroupResultProvider getKey: (item: TRow | undefined | null)} input (default = > string | undefined | null })
     * @returns {GGridColumn<TRow>}
     */
    function VysledekOperaceIcoColumn<TRow = any>(input: {
        groupResultProvider: IGroupResultProvider;
        getKey: (item: TRow | undefined | null) => string | undefined | null;
    }): GGridColumn<TRow>;
    /**
     * Aktualizuje groupResult.
     *
     * @author  TFeik
     * @date    10.12.2021
     *
     * @param {IGroupResultProvider} groupResultProvider
     * @param {GroupResultItem[] | undefined | null} groupResult
     * @param {boolean} clearBeforeUpdate (default = true)
     */
    function UpdateGroupResult(groupResultProvider: IGroupResultProvider | undefined, groupResult: GroupResultItem[] | undefined | null, clearBeforeUpdate?: boolean): void;
    /**
     * Aktualizuje groupResult.
     *
     * @author  TFeik
     * @date    10.12.2021
     *
     * @param {{ customViewPromise: JQuery.Promise<CustomView.GContentCustomReadyArgs<any, any>>, groupResultProvider: IGroupResultProvider | undefined, groupResult: GroupResultItem[] | undefined | null} input
     * @returns {JQuery.Promise<void>}
     */
    function UpdateGroupResultCustomSeznam(input: {
        customViewPromise: JQuery.Promise<CustomView.GContentCustomReadyArgs<any, any>>;
        groupResultProvider: IGroupResultProvider | undefined;
        groupResult: GroupResultItem[] | undefined | null;
        /**
         * default: true
         * @type {boolean}
         */
        clearBeforeUpdate?: boolean;
        /**
         * default: true
         * @type {boolean}
         */
        refreshGrid?: boolean;
    }): JQuery.Promise<void>;
    /**
     * Najde groupResult v objektu.
     *
     * @author  TFeik
     * @date    10.12.2021
     *
     * @param {any} input
     * @returns {GroupResultItem[] | undefined | null}
     */
    function NajdiGroupResult(input: any): GroupResultItem[] | undefined | null;
    /**
     * Vrátíikonu na základě typu spisu.
     *
     * @author  TFeik
     * @date    21.08.2024
     *
     * @param {Ginis.DbModel.GWflctysEnum | null | undefined} prizSpis
     * @returns {IconTemplate}
     */
    function GetTypSpisIcon(prizSpis: Ginis.DbModel.GWflctysEnum | null | undefined): IconTemplate;
}
declare namespace Gordic.Wfl.Globals.MenuDefinitions {
    function detailDokument(TypSpis?: number): Object;
    function detailZobrazit(): Object;
    function detailCinnosti(): Object;
    function detailTisk(): Object;
    function detailVazby(): Object;
    function detailRedistribuce(): Object;
    function detailEKlep(): Object;
}
declare namespace Gordic.Wfl.Globals {
    /**
     * cisloJednaciColumn
     *
     * @author  TFeik
     * @date    08.10.2018
     *
     * @param {Interface.TypRezimuPraceSeznamu} [typSeznamu]
     * @returns {string}
     */
    function getCisloJednaciText(typSeznamu: Interface.TypRezimuPraceSeznamu): string;
    /**
     * createGroupResultForErrorBulkOperation
     *
     * @author  RTomes
     * @date    19.03.2021
     *
     * @param {Interface.TypRezimuPraceSeznamu} [typSeznamu]
     * @returns {string}
     */
    function createGroupResultForErrorBulkOperation(rows: any, error: string): Gordic.Wfl.WebClient.GroupResult[];
    /**
      * Vrati podepisovaci objekt pro reporter ve vrstve gin/wfl. Vyzaduje DpoEnabled a KtgDpoSupportDbParamsDto na volajicim kontentu.
      * @author  RTOMES
      * @date    25.10.2018
      * @param  {IGPrintActionReportStarting}           reportInfo                          Parametry sestavy.
      * @param  {GContent}                              parentContent                       The parentContent.
      * @returns {IGSignerBase | undefined>}
      */
    function getGinReportSigner(reportInfo: IGPrintActionReportStarting, parentContent: GContent & {
        ktgDpoSupport?: GKtgDpoSupport;
        DpoEnabled?: boolean;
        KtgDpoSupportDbParamsDto?: any;
    }): Gordic.Wfl.WebClient.GWflClientSigner | undefined;
    interface FormaDokumentuCheckBoxes {
        OriginalAnalogovy?: boolean | null;
        OriginalDigitalni?: boolean | null;
        KonverzeAnalogovy?: boolean | null;
        KonverzeDigitalni?: boolean | null;
    }
    interface FormaDokumentuSFyzSEle {
        SFyz?: number | null;
        SEle?: number | null;
    }
    function FormaDokumentuSFyzSEleToCheckBoxes(input?: FormaDokumentuSFyzSEle): FormaDokumentuCheckBoxes;
    function FormaDokumentuCheckBoxesToSFyzSEle(input?: FormaDokumentuCheckBoxes): FormaDokumentuSFyzSEle;
    function GetZpusobDor(zpusob_dor: number): Wfl.Interface.WflczpdEnum;
    function GetDateStartToString(datum?: Wfl.Interface.Lists.WflDateIntervalDto): string;
    function GetDateEndToString(datum?: Wfl.Interface.Lists.WflDateIntervalDto): string;
    function GetDateEndPlusOneDayToString(datum?: Wfl.Interface.Lists.WflDateIntervalDto): string;
    function IsZpDorDZOrDZEVypGEXOrGEXEVyp(zpusob_dor: Wfl.Interface.WflczpdEnum): boolean;
    function GetWflDateIntervalForReport(dateInterval: Gordic.Wfl.Interface.Lists.WflDateIntervalDto, format: Gordic.Wfl.Interface.FormatDateType, DatabaseType: Gordic.Wfl.Interface.DatabaseTypeEnum, AddDayEnd?: boolean): Gordic.Wfl.Interface.GWflDateIntervalStringDto;
    function GetDateStringFromJsonDate(date: JsonDate, format: Gordic.Wfl.Interface.FormatDateType): string;
    function GetDateStringFromDate(date: Date, format: Gordic.Wfl.Interface.FormatDateType): string;
    function IsZpDorTypuEmailOrInternet(zpusob_dor: Wfl.Interface.TypPrijmuPodani): boolean;
    function isEditMode(typZobrazeniDetailu?: Wfl.Client.TypZobrazeniDetailuObecneho | null): boolean;
    function GetTypZobrazeniEntity(TypZobrazeniDetailu: Gordic.Wfl.Client.TypZobrazeniDetailuObecneho): Gordic.Gin.Interface.TypZobrazeniEntity;
    function EnableContentActions(content: GContent, TypZobrazeniDetailu: Gordic.Wfl.Client.TypZobrazeniDetailuObecneho): void;
}
declare namespace Gordic.Wfl.Icons {
    enum ActionEnum {
        pridatDoPracBloku = "fa-book gi-stack-fw |gi-plus gi-state-text g-state-info  gi-bgw gi-stack-pos--rb",
        posunoutNahoru = "gi-vyjmout",
        posunoutNahoruUplne = "gi-vyjmout",
        posunoutDolu = "gi-vlozit",
        posunoutDoluUplne = "gi-vlozit"
    }
    enum EntitiEnum {
        pracovniBlok = "fa-book",
        pracovniBlokDokSpis = "fa-book gi-stack-fw |gi-paper gi-bgw gi-stack-pos--rb",
        pracovniBlokBaliku = "fa-book gi-stack-fw |gi-balik gi-bgw gi-stack-pos--rb",
        informace = "gi-info",
        dokument_preevidovany = "gi-dokument_preevidovano_sed"
    }
    /**
 * Ikona pro Změna formy.
 *
 * @author  JSindelk
 * @date    06.11.2019
 *
 * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
 * @returns {IconTemplate} Ikona.
 */
    function ZmenaFormy(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    const iconFKNavrh: string;
    const iconFKProbiha: string;
    const iconFKPovoleno: string;
    const iconFKZamitnuto: string;
    const iconFKUkonPlatnost: string;
    const iconFKStorno: string;
    const iconFKZrusenyPredpis: string;
    const iconFKNepodana: string;
}
declare namespace Gordic.Wfl.PreActions {
    /**
     * PreActionNames
     *
     * @author TFeik
     * @since 480.1.0.675
     */
    enum Names {
        OtevriDetailZasilky = "actOtevriDetailZasilky",
        StornovatZasilku = "actStornovatZasilku",
        VlozitDorucenkuKZasilkce = "actVlozitDorucenkuKZasilkce",
        VymazDorucenkuZasilky = "actVymazDorucenkuZasilky",
        PridatElDokumentProIxs = "actPridatElDokumentProIxs",
        OtevriHledaniZasilek = "actOtevriHledaniZasilek",
        OtevriDetailDokumentuSpisu = "actOtevriDetailDokumentuSpisu",
        OtevriKonverziDoPdf = "actOtevriKonverziDoPdf",
        OtevriDoruceniZasilky = "actOtevriDoruceniZasilky",
        OtevriOdeslani = "actOtevriOdeslani",
        OtevriPrilohy = "actOtevriPrilohy",
        OtevriInformaceODatoveZpraveZIsds = "actOtevriInformaceODatoveZpraveZIsds",
        OtevriDorucenku = "actOtevriDorucenku",
        OtevriSoubor = "actOtevriSoubor",
        PredatPrimo = "actPredatPrimo",
        PridelitHromadne = "actPridelit",
        PrevzitHromadne = "actPrevzit",
        PrevzitVRedistribuciHromadne = "actPrevzitVRedistribuci",
        PrevzitVRedistribuciHromadneSAutorizaci = "actPrevzitVRedistribuciSAutorizaci",
        PredatVRedistribuciHromadneSAutorizaci = "actPredatVRedistribuciSAutorizaci",
        TiskPredavacihoProtokolu = "actTiskPredavacihoProtokolu",
        OdmitnoutHromadne = "actOdmitnout",
        SuProPredaniHromadne = "actSuProPredani",
        EvidovatRozsirenyProfilHromadne = "actEvidovatRozsirenyProfil",
        EvidovatHromadne = "actEvidovat",
        OdeslatHromadne = "actOdeslat",
        VyjmoutZeSpisuHromadne = "actVyjmoutZeSpisu",
        VlozitDokEpkHromadne = "actVlozitDokEpk",
        VlozitSpisEpkHromadne = "actVlozitSpisEpk",
        ZrusitPrideleniHromadne = "actZrusitPrideleni",
        ZmenitPrideleniHromadne = "actZmenitPrideleni",
        VlozitDoSpisuSslHromadne = "actVlozitDoSpisuSsl",
        ZmenitFormuHromadne = "actZmenitFormu",
        ZtvarneniMetadatSpisuHromadne = "actZtvarneniMetadatSpisu",
        ZmenitDilciDokTerminHromadne = "actZmenitDilciDokTermin",
        ZmenitDoplnekZnackyHromadne = "actZmenitDoplnekZnacky",
        ZmenitPocetListu = "actZmenitPocetListu",
        ZmenitPocetPriloh = "actZmenitPocetPriloh",
        ZmenitPocetListuPriloh = "actZmenitPocetListuPriloh",
        ZmenitPocetUlozenoListu = "actZmenitPocetUlozenoListu",
        ZmenitPoznamkuHromadne = "actZmenitPoznamkuHromadne",
        ZmenitUzivatelskouPoznamkuHromadne = "actZmenitUzivatelskouPoznamkuHromadne",
        ZmenitPristupHromadne = "actZmenitPristup",
        ZmenitSpisZnakHromadne = "actZmenitSpisZnak",
        ZmenitTerminSpisuHromadne = "actZmenitTerminSpisu",
        ZmenitTypDokHromadne = "actZmenitTypDok",
        ZmenitVecHromadne = "actZmenitVec",
        ZmenitUmisteniHromadne = "actZmenitUmisteni",
        ZmenitZpusobDoruceniHromadne = "actZmenitZpusobDoruceni",
        ZmenitSchvalovateleHromadne = "actZmenitSchvalovatele",
        ZmenitZpracovateleHromadne = "actZmenitZpracovatele",
        VyriditAdActaHromadne = "actVyriditAdActa",
        VyriditDokumentyHromadne = "actVyriditDokumenty",
        VyriditDokumentyVeSpisuHromadne = "actVyriditDokumentyVeSpisu",
        VyriditSpisyHromadne = "actVyriditSpisy",
        ZrusitVyrizeniDokumentuHromadne = "actZrusitVyrizeniDokumentu",
        ZrusitVyrizeniSpisuHromadne = "actZrusitVyrizeniSpisu",
        ZrusitUzavreniSpisuHromadne = "actZrusitUzavreniSpisu",
        PrerusitHromadne = "actPrerusit",
        PriorovatHromadne = "actPriorovat",
        PredatDokumentyExtAgHromadne = "actPredatDokumentyExtAg",
        PredatSpisyExtAgHromadne = "actPredatSpisyExtAg",
        PrevzitExtAgHromadne = "actPrevzitExtAg",
        PridatKlSlovaHromadne = "actPridatKlSlova",
        OdebratKlSlovaHromadne = "actOdebratKlSlova",
        PridatSpisyZDokumentuHromadne = "actPridatSpisyZDokumentu",
        PridatDokumentyVlozeneDoSpisuHromadne = "actPridatDokumentyVlozeneDoSpisu",
        VytvDokDoOznSpisuHromadne = "actVytvDokDoOznSpisu",
        OdesPoslVlozeneDokumentyDoOznacenychSpisuHromadne = "actOdesPoslVlozeneDokumentyDoOznacenychSpisu",
        DialogKlicovaSlova = "actDialogKlicovaSlova",
        PoznamkovyBlokPridat = "actPoznamkovyBlokPridat",
        PoznamkovyBlokVyjmout = "actPoznamkovyBlokVyjmout",
        PoznamkovyBlokVyjmoutVse = "actPoznamkovyBlokVyjmoutVse",
        OznacitJakoPrecteneHromadne = "actOznacitJakoPrectene",
        OznacitJakoNeprecteneHromadne = "actOznacitJakoNeprectene",
        SchvalitHromadne = "actSchvalitHromadne",
        ZtratitHromadne = "actZtratit",
        NaleztHromadne = "actNalezt",
        ObnovitVyrizovani = "actObnovitVyrizovani",
        StornoHromadne = "actStorno",
        ZrusitStornoHromadne = "actZrusitStorno",
        UzivatelskeSloupceVlastnosti = "actUzivatelskeSloupceVlastnosti",
        OpravaMetadatSeznamNew = "actOpravaMetadatSeznamNew",
        OtevriPracovniBloky = "actOtevriPracovniBloky",
        OtevriInformaceOZasilceZHP = "actOtevriInformaceOZasilceZHP",
        OtevriInformaceOZasilceZHKP = "actOtevriInformaceOZasilceZHKP",
        OpravitMetadataPoKontroleSeznam = "actOpravitMetadataPoKontroleSeznam",
        OtevriOdeslaniEmailNastaveni = "actOtevriOdeslaniEmailNastaveni",
        OtevriDokumentDoNoveZalozky = "actOtevriDokumentDoNoveZalozky",
        OtevriDokumentDoNoveZalozkyVeStejneFazi = "actOtevriDokumentDoNoveZalozkyVeStejneFazi",
        KonvertovatHromadne = "actKonvertovatHromadne",
        KonvertovatVsechnyPrilohyHromadne = "actKonvertovatVsechnyPrilohyHromadne",
        PodepsatHromadne = "actPodepsatHromadne",
        KonvertovatPodepsatHromadne = "actKonvertovatPodepsatHromadne",
        IRPPridatHromadne = "actIRPPridatHromadne",
        IRPOdebratHromadne = "actIRPOdebratHromadne",
        SouboryRozpoznaniFormatu = "actSouboryRozpoznaniFormatu",
        PripojeniVlastnostiHromadne = "actPripojeniVlastnostiHromadne",
        OznaceniBarvouHromadne = "actOznaceniBarvouHromadne",
        ZmenaVlastnostiHromadne = "actZmenaVlastnostiHromadne",
        HromadnyImport = "actHromadnyImport",
        HromadneOdeslatDotcenymSubjektum = "actHromadneOdeslatDotcenymSubjektum",
        HromadneNastavitPrvniPrilohuJakoElObraz = "actHromadneNastavitPrvniPrilohuJakoElObraz",
        ZkontrolovatZasilkuProEPK = "actZkontrolovatZasilkuProEPK",
        TiskWfl = "actTiskListWfl",
        TiskDetailuDokumentu = "actTiskDetailuDokumentu",
        TiskSpisObalky = "actTiskSpisObalky",
        TiskSbernyArch = "actTiskSbernyArch",
        VytezitSkFormVObrazeHromadne = "actVytezitSkFormVObrazeHromadne",
        NaplnitSkFormVObrazeHromadne = "actNaplnitSkFormVObrazeHromadne",
        PridatFormularDoPrilohHromadne = "actPridatFormularDoPrilohHromadne",
        AutorizacniDolozkaObrazuHromadne = "actAutorizacniDolozkaObrazuHromadne",
        DolozkaNabytiPravniMociHromadne = "actDolozkaNabytiPravniMociHromadne",
        OpecetitObrazSKHromadne = "actOpecetitObrazSKHromadne",
        OpecetitObrazSPrilohamiSKHromadne = "actOpecetitObrazSPrilohamiSKHromadne",
        OpecetitObrazSPrilohamiKazdyZvlastSKHromadne = "actOpecetitObrazSPrilohamiKazdyZvlastSKHromadne",
        PodepsatObrazIPrilohyDohromadySKHromadne = "actPodepsatObrazIPrilohyDohromadySKHromadne",
        HromadneNabytPravniMoc = "actHromadneNabytPravniMoc",
        StahniIxsUlo = "actStahniIxsUlo"
    }
    /**
     * Provede se oprava metadat po jejich kontrole (metoda OpravaMetadatSeznamNew)
     *
     * @author  thazmuka
     * @date    22.6.2021
     *
     * @param input netřeba vyplňovat, data se načtou až při spuštění dialogu jinou cestou
     */
    function OpravitMetadataPoKontroleSeznam(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
        VyrizFlag?: any;
        CallingSource?: string;
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
     * Otevře detail zásilky.
     *
     * @author  TFeik
     * @date    22.11.2018
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GDetailZasilkyDialogParams>} [input]
     * @returns {GActionParams}
     */
    function OtevriDetailZasilky(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDetailZasilkyDlgInputParams>, WebClient.GDetailZasilkyDlgReturnValue>): GActionParams;
    /**
     * Stornuje zásilku.
     *
     * @author  TFeik
     * @date    22.11.2018
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GStornujZasilkuDto} [input]
     * @returns {GActionParams}
     */
    function StornovatZasilku(input: Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GStornujZasilkuDto, Gin.WebClient.GBaseReturnDto<WebClient.GDetailZasilkyDto>>): GActionParams;
    /**
     * Vloží doručenku k zásilce.
     *
     * @author  TFeik
     * @date    22.11.2018
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<VlozitDorucenkuKZasilkceInputParams>, { ixbSaved?: boolean} [input]
     * @returns {GActionParams}
     */
    function VlozitDorucenkuKZasilkce(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.VlozDorucenkuKZasilkceInputParams>, {
        ixbSaved?: boolean;
        ixbNew?: string;
    }>): GActionParams;
    /**
     * Odstraní neplatnou doručenku zásilky.
     *
     * @author  TFeik
     * @date    20.06.2025
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.VymazDorucenkuZasilkyInputParams, { ixbSaved?: boolean} input
     * @returns {GActionParams}
     */
    function VymazDorucenkuZasilky(input: Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.VymazDorucenkuZasilkyInputParams, {
        ixbSaved?: boolean;
        ixbNew?: string;
    }>): GActionParams;
    /**
     * Uloží soubor k Ixs. GWflEle.VlozEDokumentKSubjektu / GWflEle.OpravEDokumentSVazbouNaIxs.
     *
     * @author  TFeik
     * @date    22.11.2018
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.PridatElDokumentProIxsInputParams} [input]
     * @returns {GActionParams}
     */
    function PridatElDokumentProIxs(input: Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.PridatElDokumentProIxsInputParams, Gin.WebClient.GBaseReturnDto<string>>): GActionParams;
    /**
     * Otevře hledání zásilek.
     *
     * @author  TFeik
     * @date    26.11.2018
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GDetailZasilkyDialogParams>} [input]
     * @returns {GActionParams}
     */
    function OtevriHledaniZasilek(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.Hledani.GHledaniZasilekDlgInputParams>, WebClient.Hledani.GHledaniZasilekDlgReturnValue>): GActionParams;
    /**
     * Akce pro otevření dokumentu či spisu.
     *
     * @author  TFeik
     * @date    04.01.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GDetailDokumentuSpisuParamsundefined>>} input?
     * @returns
     */
    function OtevriDetailDokumentuSpisu(input?: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GDetailDokumentuSpisuParams>, JQuery<HTMLElement> | null>, typPisemnosti?: Wfl.WebClient.GTypPisemnosti): GActionParams;
    /**
     * Akce pro otevření dokumentu či spisu.
     *
     * @author  TFeik
     * @date    25.03.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GKonverzePdfDlgInputParams>>} input?
     * @returns Příznak, zda (došlo ke konverzi a) je nutné znovu načíst přílohy.
     */
    function OtevriKonverziDoPdf(input?: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GKonverzePdfDlgInputParams>, {
        zkovertovano?: boolean;
    }>): GActionParams;
    /**
     * Otevře doručení zásilky.
     *
     * @author  TFeik
     * @date    22.11.2018
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParamsWithRemoteControlGrid<Dialogs.GDetailZasilkyDialogParams>} [input]
     * @returns {GActionParams}
     */
    function OtevriDoruceniZasilky(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParamsWithRemoteControlGrid<WebClient.GDoruceniZasilkyDlgInputParams>, WebClient.GDoruceniZasilkyDlgReturnValue>): GActionParams;
    /**
     * Otevře odeslání.
     *
     * @author  TFeik
     * @date    13.06.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniDlgInputParams>, WebClient.GOdeslaniDlgReturnValue>} [input]
     * @returns {GActionParams}
     */
    function OtevriOdeslani(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniDlgInputParams>, WebClient.GOdeslaniDlgReturnValue>): GActionParams;
    /**
     * Zkontroluje zásilky zda odpovídají požadavkům pro EPK.
     * - Existuje adresát s ISDS.
     * - Je vložen obraz ve formátu PDF.
     * - Obraz má velikost odpovídající parametru na velikost odesíláné DZ.
     * - Způsob odeslání je nastaven DS_evypravna.
     * - Je vygenerována identifikace zásilky.
     *
     * @author  TFeik
     * @date    21.06.2022
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GZkontrolovatZasilkuProEPKInputDto} input
     * @returns {GActionParams}
     */
    function ZkontrolovatZasilkuProEPK(input: Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.GZkontrolovatZasilkuProEPKInputDto, WebClient.GZkontrolovatZasilkuProEPKOutputDto>): GActionParams;
    /**
    * Otevře odeslání.
    *
    * @author  Dsebesta
    * @date    13.06.2019
    *
    * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniDlgInputParams>, WebClient.GOdeslaniDlgReturnValue>} [input]
    * @returns {GActionParams}
    */
    function OtevriPrilohy(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GPrilohyDlgInputParams>, undefined>): GActionParams;
    /**
     * Otevře dialog informací o datové zprávě z ISDS.
     *
     * @author  TFeik
     * @date    23.10.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDatovaZpravaIsdsInfoDlgInputParams>} input
     * @returns {GActionParams}
     */
    function OtevriInformaceODatoveZpraveZIsds(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDatovaZpravaIsdsInfoDlgInputParams>, WebClient.GDatovaZpravaIsdsInfoDlgReturnValue>): GActionParams;
    /**
     * Otevře dialog informací o zásile z Hybridní pošty.
     *
     * @author  TFeik
     * @date    16.03.2021
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GZasilkaHpInfoDlgInputParams>} input
     * @returns {GActionParams}
     */
    function OtevriInformaceOZasilceZHP(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GZasilkaHpInfoDlgInputParams>, WebClient.GZasilkaHpInfoDlgReturnValue>): GActionParams;
    /**
     * Otevře dialog informací o zásile z Hromadne konverzní pošty.
     *
     * @author  TFeik
     * @date    15.04.2021
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GZasilkaHkpInfoDlgInputParams>} input
     * @returns {GActionParams}
     */
    function OtevriInformaceOZasilceZHKP(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GZasilkaHkpInfoDlgInputParams>, WebClient.GZasilkaHkpInfoDlgReturnValue>): GActionParams;
    /**
     * export function OtevriDorucenku
     *
     * @author  TFeik
     * @date    30.10.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.OtevriDorucenkuInputParams} input
     * @returns {GActionParams}
     */
    function OtevriDorucenku(input: Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.OtevriDorucenkuInputParams, WebClient.OtevriDorucenkuRetunParams>): GActionParams;
    /**
     * export function OtevriSoubor
     *
     * @author  TFeik
     * @date    26.09.2022
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.OtevriIxbInputParams} input
     * @returns {GActionParams}
     */
    function OtevriSoubor(input: Gordic.Prefabs.Actions.BasePreActionsInput<WebClient.OtevriIxbInputParams, WebClient.OtevriIxbRetunParams>): GActionParams;
    /**
     *
     * @param input
     */
    function PredatPrimo(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<string[]>, any>): GActionParams;
    /**
        *
        * @param input
        */
    function PridelitHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<string[]>, any>): GActionParams;
    /**
        *
        * @param input
        */
    function PrevzitHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], Interface.GWflListUtilsRetDto>): GActionParams;
    /**
    *
    * @param input
    */
    function PrevzitVRedistribuciHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], Interface.GWflListUtilsRetDto>): GActionParams;
    /**
  *
  * @param input
  */
    function PrevzitVRedistribuciHromadneSAutorizaci(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        RediInfo: {
            IxsFun: string | undefined;
            SelectedRowInfo: Interface.SelectedRowInfoDto[];
        };
    }, Interface.GWflListUtilsRetDto>): GActionParams;
    /**
    *
    * @param input
    */
    function PredatVRedistribuciHromadneSAutorizaci(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        RediInfo: {
            IxsSu: string | undefined;
            IxsFun: string | undefined;
            SelectedRowInfo: Interface.SelectedRowInfoDto[];
        };
    }, Interface.GWflListUtilsRetDto>): GActionParams;
    /**
    *
    * @param input
    */
    function OdmitnoutHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], Interface.GWflListUtilsRetDto>): GActionParams;
    /**
    *
    * @param input
    */
    function SuProPredaniHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        PredavajiciSubject: {
            Ixs: string | null | undefined;
            TypIxs: Gordic.Wfl.Globals.Enums.TypeIxsInList;
        };
        TypRedistribucnihoSubjektuFilter: number;
    }, Interface.GWflListUtilsRetDto>): GActionParams;
    /**
    *
    * @param input
    */
    function EvidovatRozsirenyProfilHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], Interface.GWflListUtilsRetDto>): GActionParams;
    /**
    *
    * @param input
    */
    function EvidovatHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<{
        data: Interface.SelectedRowInfoDto[];
        isNutnyVyberDenikuCj: boolean;
    }>, any>): GActionParams;
    /**
        *
        * @param input
        */
    function OdeslatHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniHromadneDlgInputParams>, WebClient.GOdeslaniHromadneDlgReturnValue>): GActionParams;
    /**
      *
      * @param input
      */
    function VyjmoutZeSpisuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        data: Interface.SelectedRowInfoDto[];
        ssl_rem_dokd: number;
    }, any>): GActionParams;
    /**
     *
     * @param input
     */
    function VlozitDokEpkHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<string[]>, any>): GActionParams;
    /**
     *
     * @param input
     */
    function VlozitSpisEpkHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<string[]>, any>): GActionParams;
    /**
     *
     * @param input
     */
    function ZrusitPrideleniHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], Interface.GWflListUtilsRetDto>): GActionParams;
    /**
   *
   * @param input
   */
    function ZmenitPrideleniHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<string[]>, any>): GActionParams;
    /**
  *
  * @param input
  */
    function VlozitDoSpisuSslHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<{
        rows: Interface.SelectedRowInfoDto[];
        ixpSpisuProVlozeni?: string | null;
    }>, any>): GActionParams;
    /**
   *
   * @param input
   */
    function ZmenitFormuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<string[]>, any>): GActionParams;
    /**
    *
    * @param input
    */
    function ZtvarneniMetadatSpisuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<string[]>, any>): GActionParams;
    /**
   *
   * @param input
   */
    function ZmenitDilciDokTerminHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>, typPisemnosti?: Wfl.WebClient.GTypPisemnosti): GActionParams;
    /**
  *
  * @param input
  */
    function ZmenitDoplnekZnackyHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
  *
  * @param input
  */
    function ZmenitPocetListu(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
 *
 * @param input
 */
    function ZmenitPocetPriloh(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
*
* @param input
*/
    function ZmenitPocetListuPriloh(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
     * ZmenitPocetUlozenoListu
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>} input
     * @returns {GActionParams}
     */
    function ZmenitPocetUlozenoListu(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
    *
    * @param input
    */
    function ZmenitPoznamkuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
    *
    * @param input
    */
    function ZmenitUzivatelskouPoznamkuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
    *
    * @param input
    */
    function ZmenitPristupHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
*
* @param input
*/
    function ZmenitSpisZnakHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
    *
    * @param input
    */
    function ZmenitTerminSpisuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
    *
    * @param input
    */
    function ZmenitTypDokHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>, typPisemnosti?: Wfl.WebClient.GTypPisemnosti): GActionParams;
    /**
    *
    * @param input
    */
    function ZmenitVecHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
   *
   * @param input
   */
    function ZmenitUmisteniHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
    *
    * @param input
    */
    function ZmenitZpusobDoruceniHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
   *
   * @param input
   */
    function ZmenitZpracovateleHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
   *
   * @param input
   */
    function ZmenitSchvalovateleHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
   *
   * @param input
   */
    function VyriditAdActaHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
   *
   * @param input
   */
    function VyriditDokumentyHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
   *
   * @param input
   */
    function VyriditDokumentyVeSpisuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    interface VyriditSpisyHromadneInput {
        IxpArr: Interface.SelectedRowInfoDto[];
        ActiveIxp: string | undefined | null;
    }
    /**
   *
   * @param input
   */
    function VyriditSpisyHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<VyriditSpisyHromadneInput>, any>): GActionParams;
    /**
  *
  * @param input
  */
    function ZrusitVyrizeniDokumentuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], any>): GActionParams;
    /**
      *
      * @param input
      */
    function ZrusitVyrizeniSpisuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], any>): GActionParams;
    /**
      *
      * @param input
      */
    function ZrusitUzavreniSpisuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], any>): GActionParams;
    /**
      *
      * @param input
      */
    function PrerusitHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
       *
       * @param input
       */
    function PriorovatHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
      *
      * @param input
      */
    function PredatDokumentyExtAgHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
      *
      * @param input
      */
    function PredatSpisyExtAgHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
      *
      * @param input
      */
    function PrevzitExtAgHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], any>): GActionParams;
    /**
      *
      * @param input
      */
    function PridatKlSlovaHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
      *
      * @param input
      */
    function OdebratKlSlovaHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
     *
     * @param input
     */
    function PridatSpisyZDokumentuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArr: Interface.SelectedRowInfoDto[];
        IxsBlp: string;
    }, any>): GActionParams;
    /**
     *
     * @param input
     */
    function PridatDokumentyVlozeneDoSpisuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArr: Interface.SelectedRowInfoDto[];
        IxsBlp: string;
    }, any>): GActionParams;
    /**
      *
      * @param input
      */
    function VytvDokDoOznSpisuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<{
        rows: Interface.SelectedRowInfoDto[];
        evidovatEnabled: boolean;
        isNutnyVyberDenikuCj: boolean;
    }>, any>): GActionParams;
    /**
      *
      * @param input
      */
    function OdesPoslVlozeneDokumentyDoOznacenychSpisuHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<{
        rows: Interface.SelectedRowInfoDto[];
    }>, any>): GActionParams;
    /**
      *
      * @param input
      */
    function OtevriDialogProPridaniKlicovychSlov(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        Ixp: string;
    }, {
        probehlaZmena: boolean;
    }>): GActionParams;
    interface PoznamkovyBlokPridatHromadneInput {
        IxpArr: string[];
    }
    /**
      *
      * @param input
      */
    function PoznamkovyBlokPridatHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<PoznamkovyBlokPridatHromadneInput, any>): GActionParams;
    /**
     * Vyjmout dokumenty/spisy z poznámkového bloku.
     *
     * @author  TFeik
     * @date    04.12.2020
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<VyjmoutZPoznamkovehoBlokuInput} input
     * @returns {GActionParams}
     */
    function PoznamkovyBlokVyjmout(input: Gordic.Prefabs.Actions.BasePreActionsInput<VyjmoutZPoznamkovehoBlokuInput, void>): GActionParams;
    /**
     * Vyjmout vše z poznámkovho bloku.
     *
     * @author  TFeik
     * @date    04.12.2020
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<VyjmoutVseZPoznamkovehoBlokuInput} input
     * @returns {GActionParams}
     */
    function PoznamkovyBlokVyjmoutVse(input: Gordic.Prefabs.Actions.BasePreActionsInput<VyjmoutVseZPoznamkovehoBlokuInput, void>): GActionParams;
    /**
      *
      * @param input
      */
    function OznacitJakoPrecteneHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArr: Interface.SelectedRowInfoDto[];
    }, any>): GActionParams;
    /**
      *
      * @param input
      */
    function OznacitJakoNeprecteneHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArr: Interface.SelectedRowInfoDto[];
    }, any>): GActionParams;
    /**
      *
      * @param input
      */
    function ZtratitHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        data: Interface.SelectedRowInfoDto[];
    }, any>): GActionParams;
    /**
      *
      * @param input
      */
    function NaleztHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], any>): GActionParams;
    /**
      *
      * @param input
      */
    function SchvalitHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Interface.GWflIxpDatZmena[]>, any>): GActionParams;
    /**
    *
    * @param input
    */
    function ObnovitVyrizovani(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], any>): GActionParams;
    /**
      *
      * @param input
      */
    function StornoHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        data: Interface.SelectedRowInfoDto[];
        gin_n23_vedd: number;
    }, any>): GActionParams;
    /**
      *
      * @param input
      */
    function ZrusitStornoHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        data: Interface.SelectedRowInfoDto[];
        gin_n23_vedd: number;
    }, any>): GActionParams;
    /**
  *
  * @param input
  */
    function UzivatelskeSloupceVlastnosti(input: Gordic.Prefabs.Actions.BasePreActionsInput<any, any>): GActionParams;
    /**
    * akce pro kontrolu metadat ze seznamu
    *
    */
    function OpravaMetadatSeznamNew(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
     * Otevře seznam pracovních / poznámkových bloků.
     *
     * @author  TFeik
     * @date    04.12.2020
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<VyjmoutVseZPoznamkovehoBlokuInput} input
     * @returns {GActionParams}
     */
    function OtevriPracovniBloky(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.PracovniBlokyDlgOptions>, Dialogs.PracovniBlokyDlgRetVal>): GActionParams;
    /**
     * Otevře přehled nastavení odesílání emailu.
     *
     * @author  TFeik
     * @date    20.07.2021
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniEmailNastaveniDlgInputParams>} input
     * @returns {GActionParams}
     */
    function OtevriOdeslaniEmailNastaveni(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GOdeslaniEmailNastaveniDlgInputParams>, WebClient.GOdeslaniEmailNastaveniDlgReturnValue>): GActionParams;
    /**
     * OtevriDokumentDoNoveZalozkyInput
     *
     * @author TFeik
     * @since 486.1.0.538
     */
    interface OtevriDokumentDoNoveZalozkyInput {
        ixp: string;
        faze?: string;
    }
    /**
     * Otevře detail dokumentu/spisu do nové záložky v příslušné agendě.
     *
     * @author  TFeik
     * @date    28.08.2021
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<OtevriDokumentDoNoveZalozkyInput, Window>} input
     * @returns {GActionParams}
     */
    function OtevriDokumentDoNoveZalozky(input: Gordic.Prefabs.Actions.BasePreActionsInput<OtevriDokumentDoNoveZalozkyInput, Window>): GActionParams;
    /**
     * OtevriDokumentDoNoveZalozkyInput
     *
     * @author TFeik
     * @since 486.1.0.538
     */
    interface OtevriDokumentDoNoveZalozkyVeStejneFaziInput {
        ixp?: string;
        ixps?: string[];
    }
    /**
     * Otevře detail dokumentu/spisu do nové záložky v aktuálně otevření agendě.
     *
     * @author  TFeik
     * @date    28.08.2021
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<OtevriDokumentDoNoveZalozkyInput, Window>} input
     * @returns {GActionParams}
     */
    function OtevriDokumentDoNoveZalozkyVeStejneFazi(input: Gordic.Prefabs.Actions.BasePreActionsInput<OtevriDokumentDoNoveZalozkyVeStejneFaziInput, Window>): GActionParams;
    /**
      *
      * @param input
      */
    function KonvertovatHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Wfl.Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
    *
    * @param input
    */
    function KonvertovatVsechnyPrilohyHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Wfl.Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    function SouboryRozpoznaniFormatu(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Wfl.Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
      *
      * @param input
      */
    function PodepsatHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Wfl.Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
    *
    * @param input
    */
    function KonvertovatPodepsatHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Wfl.Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
      *
      * @param input
      */
    function IRPPridatHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Wfl.Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
      *
      * @param input
      */
    function IRPOdebratHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Wfl.Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
     *
     * @param input
     */
    function PripojeniVlastnostiHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Wfl.Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
     *
     * @param input
     */
    function ZmenaVlastnostiHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Wfl.Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
   * AkcepRoHromadneOznaceniBarvou
   *
   */
    function OznaceniBarvouHromadne(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
      *
      * @param input
      */
    function HromadnyImport(input: Gordic.Prefabs.Actions.BasePreActionsInput<any, any>): GActionParams;
    /**
      *
      * @param input
      */
    function HromadneOdeslatDotcenymSubjektum(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        data: any;
    }, any>): GActionParams;
    /**
   *
   * @param input
   */
    function HromadneNastavitPrvniPrilohuJakoElObraz(input: Gordic.Prefabs.Actions.BasePreActionsInput<Interface.SelectedRowInfoDto[], Interface.GWflListUtilsRetDto>): GActionParams;
    /**
   * AkcepRoHromadneOznaceniBarvou
   *
   */
    function VytezitSkFormVObrazeHromadne(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
   * AkcepRoHromadneOznaceniBarvou
   *
   */
    function NaplnitSkFormVObrazeHromadne(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
   * AkcepRoHromadneOznaceniBarvou
   *
   */
    function PridatFormularDoPrilohHromadne(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
   * AkcepRoHromadneOznaceniBarvou
   *
   */
    function AutorizacniDolozkaObrazuHromadne(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
  * AkcepRoHromadneOznaceniBarvou
  *
  */
    function DolozkaNabytiPravniMociHromadne(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
   * AkcepRoHromadneOznaceniBarvou
   *
   */
    function OpecetitObrazSKHromadne(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
   * OpecetitObrazSPrilohamiSKHromadne
   *
   */
    function OpecetitObrazSPrilohamiSKHromadne(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
  * OpecetitObrazSPrilohamiKazdyZvlastSKHromadne
  *
  */
    function OpecetitObrazSPrilohamiKazdyZvlastSKHromadne(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
      *
      * @param input
      */
    function PodepsatObrazIPrilohyDohromadySKHromadne(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Wfl.Interface.SelectedRowInfoDto[]>, any>): GActionParams;
    /**
     *
     * @param input
     */
    function HromadneNabytPravniMoc(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    /**
     *
     * @param input
     */
    function StahniIxsUlo(input: Gordic.Prefabs.Actions.BasePreActionsInput<{
        ixp: string;
        ixsUlo: string;
    }, {
        stav?: any;
    }>): GActionParams;
}
declare namespace Gordic.Previews {
    interface IGFilePreviewTabOptions {
        cacheKeyProvider?: any;
        ixpProvider?: (loadParams: any) => string | undefined | null;
        displayOptionsProvider?: (loadParams: any, loadOptions?: any) => IGFilePreviewLoadOptions;
    }
    function getFilePreviewTab(filePreviewOptions: IGFilePreviewTabOptions): {
        caption: string;
        customLoad: (cnt: any, loadParams: any, loadOptions?: any) => void;
        content: ThisType<GContent> & IGClientContent;
    };
    interface IGNotesPreviewTabOptions {
        caption?: string;
    }
    function getUserNotesPreviewTab(notesPreviewOptions: IGNotesPreviewTabOptions): {
        caption: string;
        customLoad: (cnt: any, loadParams: any, loadOptions?: any) => void;
        content: ThisType<GContent> & IGClientContent;
    };
}
declare namespace Gordic.Wfl.WebClient {
    interface IGWflAnonymizerInput {
        data?: {
            ixp: string;
            ixb?: string;
            verze?: number;
            porCislo?: number;
            source?: Wfl.Interface.GWflFilePreviewSource;
        };
        serviceContent?: string;
        filePreviewLoadOptions?: IGFilePreviewLoadOptions;
    }
    class GWflAnonymizer extends GContentBase implements IGClientContent {
        uid: string;
        private isSaved;
        prepareContent(inputDto: IGWflAnonymizerInput): void;
        closing(result: any): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Wfl.AppSettings {
    class ForgottenFilesContent extends GContentBase implements IGClientContent {
        private panel;
        private view;
        private documentService;
        prepareContent(): void;
    }
    function AttachmentOpenSettingsForm(): Forms.Form;
}
declare namespace Gordic.Wfl.AppSettings {
    /**
     * Cesta k objetu nastavení ostatní v GStore.
     *
     * @author  TFeik
     * @date    10.03.2020
     */
    const ColorPickerSettingsFormPath = "Global.Wfl.AppSettings.OthersSettings.GColorPicker";
    /**
     * Interface uživatelského nastavení ostatní v UserSettings (GStore).
     *
     * @author  TFeik
     * @date    10.03.2020
     */
    interface GColorPickerSettingsForm {
        Red?: string;
        Green?: string;
        Blue?: string;
        Purple?: string;
        Yellow?: string;
    }
    /**
     *
     * Vrátí hodnoty uživatelského nastavení ostatní.
     *
     * @author  TFeik
     * @date    10.03.2020
     *
     * @returns {GOthersSettings} Hodnoty uživatelského nastavení ostatní.
     */
    function GetBarvyDokumentuSettings(): GColorPickerSettingsForm;
    function ColorPickerSettingsForm(): Forms.Form;
}
declare namespace Gordic.Wfl.AppSettings {
    function GDateListBoxSettingsForm(): Forms.Form;
}
declare namespace Gordic.Wfl.AppSettings {
    /**
     * Cesta k objetu nastavení zásilky v GStore.
     *
     * @author  TFeik
     * @date    03.12.2018
     */
    const HledaniZasilekSettingsPath = "Global.Wfl.AppSettings.HledaniZasilekSettings";
    /**
     * Vrátí hodnoty uživatelského nastavení hledání zásilek.
     *
     * @author  TFeik
     * @date    03.12.2018
     *
     * @returns {Gordic.Wfl.WebClient.GHledaniZasilekSettingsDto} Hodnoty uživatelského nastavení hledání zásilek.
     */
    function GetHledaniZasilekSettings(): WebClient.GHledaniZasilekSettingsDto;
    /**
     * Nastaví hodnoty uživatelského nastavení hledání zásilek.
     *
     * @author  TFeik
     * @date    03.12.2018
     *
     * @param {Gordic.Wfl.AppSettings.IGHledaniZasilekSettings | null} value Hodnoty uživatelského nastavení hledání zásilek.
     */
    function SetHledaniZasilekSettings(value: Gordic.Wfl.WebClient.GHledaniZasilekSettingsDto | null): void;
    /**
     * Formulář uživatelského nastavení hledání zásilek.
     *
     * @author  TFeik
     * @date    03.12.2018
     */
    function HledaniZasilekSettingsForm(tabOpened?: boolean): Forms.Form;
}
declare namespace Gordic.Wfl.AppSettings {
    function ListsSettingsForm(modul?: string): Forms.Form;
}
declare namespace Gordic.Wfl.AppSettings {
    /**
     * Cesta k objetu nastavení ostatní v GStore.
     *
     * @author  TFeik
     * @date    10.03.2020
     */
    const OthersSettingsPath = "Global.Wfl.AppSettings.OthersSettings";
    /**
     * Interface uživatelského nastavení ostatní v UserSettings (GStore).
     *
     * @author  TFeik
     * @date    10.03.2020
     */
    interface GOthersSettings {
        PredplneniPID?: string;
        PoznBlokViceBloku?: boolean;
        UserEmail?: string;
        User?: string;
        ISDSPlatnostHesla?: number;
        PouzeDBGinis?: boolean;
        DenikySpisu?: boolean;
        DenikyDok?: boolean;
        VLupePredplnovatDenik?: boolean;
        Denik?: Gordic.Data.Readers.SslsdenDto;
        VLupePredplnovatRok?: boolean;
        RokCJ?: number;
        GenerPidVlastni?: boolean;
        VyberDenikuMakeSpis?: boolean;
    }
    /**
     *
     * Vrátí hodnoty uživatelského nastavení ostatní.
     *
     * @author  TFeik
     * @date    10.03.2020
     *
     * @returns {GOthersSettings} Hodnoty uživatelského nastavení ostatní.
     */
    function GetOthersSettings(): GOthersSettings;
    function OthersSettingsForm(): Forms.Form;
}
declare namespace Gordic.Wfl.AppSettings {
    function PrideleniPredaniSettingsForm(): Forms.Form;
}
declare namespace Gordic.Wfl.AppSettings {
    const ImplicitneTisknoutPredProtSettingsKey = "Global.Wfl.AppSettings.PrintSettings.ImplicitneTisknoutPredProt";
    const DotazatSePredTiskemSettingsKey = "Global.Wfl.AppSettings.PrintSettings.DotazatSePredTiskem";
    function PrintSettingsForm(): Forms.Form;
}
declare namespace Gordic.Wfl.AppSettings {
    function SgnSettingsForm(): Forms.Form;
}
declare namespace Gordic.Wfl.AppSettings {
    function TypyDokSettingsForm(): Forms.Form;
}
declare namespace Gordic.Wfl.AppSettings {
    /**
     * Cesta k objetu nastavení zásilky v GStore.
     *
     * @author  TFeik
     * @date    23.05.2018
     */
    const ZasilkyHromadnaEditaceSettingsPath = "Global.Wfl.AppSettings.ZasilkyHromadnaEditaceSettings";
    /**
     * Vrátí hodnoty uživatelského nastavení zásilky.
     *
     * @author  TFeik
     * @date    23.05.2018
     *
     * @returns {Gordic.Wfl.WebClient.GZasilkyHromadnaEditaceSettingsDto} Hodnoty uživatelského nastavení zásilky.
     */
    function GetZasilkyHromadnaEditaceSettings(): Gordic.Wfl.Interface.GPolozkyZasilkyKOpraveDto;
    /**
     * Nastaví hodnoty uživatelského nastavení zásilky.
     *
     * @author  TFeik
     * @date    23.05.2018
     *
     * @param {Gordic.Wfl.AppSettings.IGZasilkyHromadnaEditaceSettings | null} value Hodnoty uživatelského nastavení zásilky.
     */
    function SetZasilkyHromadnaEditaceSettings(value: Gordic.Wfl.Interface.GPolozkyZasilkyKOpraveDto | null): void;
    /**
     * Formulář uživatelského nastavení zásilek.
     *
     * @author  TFeik
     * @date    22.05.2018
     */
    function ZasilkyHromadnaEditaceSettingsForm(tabOpened?: boolean): Forms.Form;
}
declare namespace Gordic.Wfl.AppSettings {
    /**
     * Cesta k objetu nastavení zásilky v GStore.
     *
     * @author  TFeik
     * @date    23.05.2018
     */
    const ZasilkySettingsPath = "Global.Wfl.AppSettings.ZasilkySettings";
    /**
     * Vrátí hodnoty uživatelského nastavení zásilky bez výchozích hodnot.
     *
     * @author  TFeik
     * @date    19.04.2023
     *
     * @returns {Gordic.Wfl.WebClient.GZasilkySettingsDto} Hodnoty uživatelského nastavení zásilky.
     */
    function GetZasilkySettingsWithoutDefaults(): Gordic.Wfl.WebClient.GZasilkySettingsDto | undefined | null;
    /**
     * Vrátí hodnoty uživatelského nastavení zásilky.
     *
     * @author  TFeik
     * @date    23.05.2018
     *
     * @returns {Gordic.Wfl.WebClient.GZasilkySettingsDto} Hodnoty uživatelského nastavení zásilky.
     */
    function GetZasilkySettings(): Gordic.Wfl.WebClient.GZasilkySettingsDto;
    /**
     * Nastaví hodnoty uživatelského nastavení zásilky.
     *
     * @author  TFeik
     * @date    23.05.2018
     *
     * @param {Gordic.Wfl.AppSettings.IGZasilkySettings | null} value Hodnoty uživatelského nastavení zásilky.
     */
    function SetZasilkySettings(value: Gordic.Wfl.WebClient.GZasilkySettingsDto | null): void;
    /**
     * Aktualizuje vybrané hodnoty uživatelského nastavení zásilky.
     * Provádí extend do aktuálních hodnot, takže stačí poslat hodnoty které chceme změnit.
     * Pokud chceme hodnotu vymazat, pak musíme poslat hodnotu null (undefined extend ignoruje).
     *
     * @author  TFeik
     * @date    07.12.2022
     */
    function UpdateZasilkySettings(
    /**
     * Hodnoty uživatelského nastavení, které chceme změnit.
     * @type {Gordic.Wfl.WebClient.GZasilkySettingsDto}
     */
    value: Gordic.Wfl.WebClient.GZasilkySettingsDto): void;
    /**
     * Formulář uživatelského nastavení zásilek.
     *
     * @author  TFeik
     * @date    22.05.2018
     */
    function ZasilkySettingsForm(tabOpened?: boolean): Forms.Form;
}
declare namespace Gordic.Wfl.DialogAC {
    function WflDialogInit(contentName: string): void;
}
declare namespace Gordic.Wfl.AC {
    interface IWflBaseAbstractAC {
        ReloadData(): void;
    }
    interface IGActionExtended extends GAction {
        fafourite: boolean;
    }
    abstract class WflBaseAC extends GContentBase {
        LabelPage: string;
        IsLoading: boolean;
        NeulozenaData: boolean;
        ResultType: Gin.Interface.TypVysledkuOperace;
        menuParams: MenuParams[];
        contextMenuParams: MenuParams[];
        submenuMenuParams: MenuParams[];
        multiMenu: any[];
        subTaskActions: GAction[];
        topActions: GAction[];
        specialActions: GAction[];
        baseActions: GAction[];
        otherActions: GAction[];
        printActions: GAction[];
        printActionsSubmenu: GAction[];
        bottomActions: GAction[];
        submenuActions: GAction[];
        readonly FlashPanelTimer = 5000;
        readonly DaysRangeMax = 5000;
        DaysRange: number;
        SessionInfo: Wfl.Interface.GWflSessionInfoDto;
        Info: string;
        ResultInfoListString: string[];
        RefreshNeeded: boolean;
        IxsOperation: string[];
        IxsFunOperation: string;
        IxsSuOperation: string;
        OpravaDatReguestDto: Wfl.Interface.GOpravaDatReguestDto;
        MultiTask: boolean;
        SeperatorSpecialActions: boolean;
        SeperatorPrintActions: boolean;
        SeperatorBaseActions: boolean;
        SeperatorOtherActions: boolean;
        ActionRefreshIsFavorite: boolean;
        static InitControl(content: GContentType<WflBaseAC>): void;
        static ClearControl(content: GContentType<WflBaseAC>): void;
        static WaitForValues(form: JQuery<HTMLElement>): JQueryPromise<boolean>;
        static CompleteMenu(content: GContentType<WflBaseAC>): void;
        static ResolveOperationParams(content: GContentType<WflBaseAC>): void;
        static OpenElSouborZUloziste(content: GContentType<WflBaseAC>, ixb: string): void;
        static OpenOrDownloadFile(content: GContentType<WflBaseAC>, _ixb: string, _pouzestahnout: boolean): void;
        static SaveFile(content: GContentType<WflBaseAC>, fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto): void;
        static ShowFilePresDoplnek(content: GContentType<WflBaseAC>, fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto): void;
        static ShowFlashByContentInfo(content: GContentType<WflBaseAC>): void;
        static DowloadFileSKontrolou(content: GContentType<WflBaseAC>, guid: string): boolean;
        static DowloadFile(guid: string): boolean;
        static HideFlashByContent(content: GContentType<WflBaseAC>): void;
        static ShowFlashWarning(content: GContentType<WflBaseAC>, text: string): void;
        static ShowFlashError(content: GContentType<WflBaseAC>, text: string): void;
        static ShowFlashInfo(content: GContentType<WflBaseAC>, text: string): void;
        static ShowFlashSuccess(content: GContentType<WflBaseAC>, text: string): void;
        static ShowFlashDleZavaznosti(content: GContentType<WflBaseAC>, text: string, Typ: Interface.TypStavuZavaznosti): void;
        static ShowFlash(content: GContentType<WflBaseAC>, text: string, Typ: Gin.Globals.Enums.StateEnum): void;
        static AddSubMenu(content: GContentType<WflBaseAC>, _caption: string, _icon: string, _favorite?: boolean): void;
        static AddToMenu(poleAction: GAction[], content: GContentType<WflBaseAC>, AddSeparator: boolean): void;
        static AddSeparatorToMenus(content: GContentType<WflBaseAC>): void;
        static AddSeparatorToMenuParams(params: MenuParams[]): void;
        static ResolveSeparators(content: GContentType<WflBaseAC>): void;
        static AddSubmenuToMenu(poleAction: MenuParams[], content: GContentType<WflBaseAC>): void;
        static ResolveInfo(content: GContentType<WflBaseAC>, flash?: boolean): JQuery.Promise<boolean>;
        static AddBaseActionsToMenu(content: GContentType<WflBaseAC>): void;
        static GetActionByName(content: GContentType<WflBaseAC>, actionName: string): any;
        static CreateActionZobrazitDebugInfo(content: GContentType<WflBaseAC>): GAction;
        static CreateActionTest(content: GContentType<WflBaseAC>): GAction;
        static CreateOKButton(content: GContentType<WflBaseAC>): GAction;
        static CreateActionSeparator(): GAction;
        static ShowWarningNeniImplementovano(content: GContentType<WflBaseAC>): void;
        static ShowInfoPromise(content: GContent, text: string): JQuery.Promise<boolean>;
        static ShowInfoAndClose(content: GContent, text: string): void;
        static AutorizacePredani(content: GContentType<WflBaseAC>, ixsFunPre: string, typAutorizace: Gordic.Wfl.Interface.TypAutorizacePredani, TypPredaniOsoba: Gordic.Wfl.Interface.TypPredaniOsoba, TypRezimuPrace: Interface.TypRezimuPraceSeznamu): JQuery.Promise<boolean>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IGFormaDokSpisRetval {
        /** stav určující, jestli překreslovat detail */
        stav: boolean;
        /** v případě změny formy dokumentu, v případě spisu je object null */
        dokument: {
            /** s_fyz - pokud je hodnota null, není nastavena */
            s_fyz: Gordic.Wfl.Interface.GFormaFyzPodoba | number;
            /** s_ele - pokud je hodnota null, není nastavena */
            s_ele: Gordic.Wfl.Interface.GFormaElePodoba | number;
        } | null;
    }
    class GFormaDokSpis extends GContentBase {
        private Dokument;
        /** form */
        private form;
        /** uložení původní hodnoty Fyz */
        private puvFyz;
        /** uložení původní hodnoty Ele */
        private puvEle;
        /** tlačítko OK - enable */
        private okEnabled;
        /** návratová hodnota - closing */
        private retval;
        private inputStateFyzOrig;
        private inputStateFyzKonv;
        private inputStateEleOrig;
        private inputStateEleKonv;
        /** identifikátor */
        private Ixp?;
        /** příznak spisu, písemnosti */
        private prizSpis;
        /** nastala změna dat na dialogu formy */
        private _change;
        /**
         * getter
         */
        get change(): boolean;
        /**
         * setter
         */
        set change(isChange: boolean);
        /** fyzicky original - enable */
        private orig_fyz_enable;
        /** elektronicky original - enable */
        private orig_ele_enable;
        /** neautorizovana fyzicka konverze */
        private neaut_konv_fyz_enable;
        /** neautorizovana elektronicka konverze */
        private neaut_konv_ele_enable;
        /** button 'Prohodit' - příznak, že je prováděno "prohodit" */
        private bProhodit;
        /** action 'Prohodit' - příznak nastavení políčka na enable/disable */
        private aProhoditEnable;
        private WithoutIxpFlag;
        /** onContentReady */
        onContentReady(): void;
        private loadDataWithoutIxp;
        /**
         * nastavení stavů políček v dialogu bez Ixp
         */
        private setStatesOnDlgWithoutIxp;
        /** Načíst data formy a rozhodnout zda se jedná o dokument či spis */
        private loadData;
        private refreshSpis;
        private init;
        /** jedná se o formy Spisu */
        private isSpis;
        private createFormSpis;
        /** Jedná se o formu dokumentu */
        private isDokument;
        /** uložení vstupních stavů formy */
        private setInputValues;
        /** nastavení enable/disable na políčko 'uložit' */
        private setEnableToSaveField;
        private formMain;
        /** vytvoření zaškrtávacího formuláře */
        private createCheckForm;
        private AttachmentsCount;
        /** kontrola výchozího stavu */
        private checkDefaultState;
        /** nastavení hodnot - Fyzické podoby dokumentu */
        private setFyz;
        /** nastavení hodnot - Elektronické podoby dokumentu */
        private setEle;
        private createCommandBar;
        private EnableActions;
        /** nastavení enable/disable na políčko 'Prohodit' */
        setEnableTSwapField(enable: boolean): void;
        /** akce na tlačítku prohodit při clicku */
        private actionProhodit;
        /** kliknutí na políčko fyzického originálu */
        private changeOnClickFyzOrig;
        /** Kliknutí na políčko fyzické konverze */
        private changeOnClickFyzKonv;
        /** uložit */
        private saveAndClosing;
        closing(): IGFormaDokSpisRetval;
    }
}
declare namespace Gordic.Wfl.WebClient.WflOps {
    const eventName = "wflops";
    enum WflOpsEnum {
        zadostOPodpis = "zadostOPodpis",
        formaDokumentu = "formaDokumentu",
        konvertovatSchvalit = "konvertovatSchvalit",
        schvalovaciProces = "schvalovaciProces",
        autorizovanaKonverze = "autorizovanaKonverze",
        zmenaFormatu = "zmenaFormatu",
        schvalit = "schvalit",
        zrusitSchvaleni = "zrusitSchvaleni",
        gfrmUlozeni = "gfrmUlozeni",
        prevzeti = "prevzeti",
        predani = "predani",
        prideleni = "prideleni",
        dotceneSubjekty = "dotceneSubjekty",
        souvisejiciDokumenty = "souvisejiciDokumenty"
    }
    interface WflOpsParams {
        operation: WflOpsEnum;
        flashMessage?: string;
        flashMessageClass?: string;
        params?: ObjectLiteral<any>;
    }
    function prepareOpts(operation: WflOpsEnum, message?: string, state?: string, params?: ObjectLiteral<any>): {
        operation: WflOpsEnum;
        flashMessage: string | undefined;
        flashMessageClass: string | undefined;
        params: ObjectLiteral<any> | undefined;
    };
}
declare namespace Gordic.Wfl.Dlg {
    class HromadnaOpravaZasilekDlg extends GContentBase {
        model: Wfl.Interface.GPolozkyZasilkyKOpraveDto;
        data: Wfl.Interface.GZasilkaEditListDto[];
        validators: any;
        onContentReady(): void;
        ZmenaPoplatek(value: any): void;
        ZmenaVaha(value: any): void;
        OKClick(): void;
        GetSluzbyArrayToString(doplnkoveSluzby?: number[]): string;
    }
}
declare namespace Gordic.Wfl.AC {
    class TiskPodacihoDenikuDlg extends GContentBase<WflBaseAC> {
        OdDatumu: string;
        data: Gordic.Wfl.Interface.GDorucenkyDatovychZpravDto[];
        RokMax: any;
        model: any;
        IxsSuAkt: string;
        ssl_ver_compat: any;
        g_sslden_cj: any;
        onContentReady(): void;
        private createCommandbar;
        private createMenuBar;
        private createForm;
        mohuOtevritTisk(): boolean;
        tiskPodacihoDenikuReportRetreive(rep: any): void;
    }
}
declare namespace Gordic.Wfl.Dlg {
    class GDatumEditUniversalDlg extends GContentBase {
        model: Wfl.Interface.GDatumDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Wfl.Dlg {
    class GGetDbValueUniversalDlg extends GContentBase {
        model: Wfl.Interface.GEditValueUniversalDto;
        Typ: Wfl.Interface.TypZmenyPolozkyEnum;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Wfl.Dlg {
    class GGetFormaEntityDlg extends GContentBase {
        model: Wfl.Interface.GFormaEntityDto;
        validators: any;
        onContentReady(): void;
        SetFyzOriginal(value: any): void;
        SetEleOriginal(value: any): void;
        EnabDisabFields(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Wfl.Dlg {
    class GGetIdentifikatorDlg extends GContentBase {
        model: Wfl.Interface.GSeznamId;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Wfl.Dlg {
    class GGetNumberUniversalDlg extends GContentBase {
        model: Wfl.Interface.GNumberDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Wfl.Dlg {
    class GGetTextUniversalDlg extends GContentBase {
        model: Wfl.Interface.GTextDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * GPridatElDokumentProIxsDlg
     *
     * @author TFeik
     * @date    16.11.2018
     * @since 480.1.0.708
     */
    class GPridatElDokumentProIxsDlg extends GContentBase {
        /**
         * Ixs
         * @type {string}
         */
        private readonly Ixs?;
        /**
         * DefaultValues
         * @type {GPridatElDokumentProIxsFormDto}
         */
        private readonly DefaultValues?;
        private readonly PorCislo?;
        private readonly IsElObraz?;
        private readonly Ixb?;
        private readonly VytvoritPrilohu?;
        private readonly NovaVerze?;
        private readonly PlnaEditace?;
        private IxbNew?;
        /**
         * Validators
         * @type {object}
         */
        private readonly Validators?;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    16.11.2018
         */
        onContentReady(): void;
        /**
         * createMenu
         *
         * @author  TFeik
         * @date    16.11.2018
         */
        private createMenu;
        /**
         * createForm
         *
         * @author  TFeik
         * @date    16.11.2018
         *
         * @param {JQuery<HTMLElement>} appentTo
         * @returns {JQuery<HTMLElement>}
         */
        private createForm;
        /**
         * getFormData
         *
         * @author  TFeik
         * @date    16.11.2018
         *
         * @returns {GPridatElDokumentProIxsFormDto}
         */
        private getFormData;
        /**
         * setFormData
         *
         * @author  TFeik
         * @date    16.11.2018
         *
         * @param {GPridatElDokumentProIxsFormDto} data
         */
        private setFormData;
        /**
         * setFormValidators
         *
         * @author  TFeik
         * @date    16.11.2018
         *
         * @param {object} validators
         */
        private setFormValidators;
        /**
         * isFormValid
         *
         * @author  TFeik
         * @date    16.11.2018
         *
         * @returns {boolean}
         */
        private isFormValid;
        private closing;
    }
    interface PridatElDokumentProIxsInputParams {
        /**
         * ixs
         */
        ixs: string;
        dokument: WebClient.GPridatElDokumentProIxsFormDto;
        ixb?: string;
        ix?: string;
        isElObraz?: boolean;
        novaVerze?: boolean;
    }
    /**
     * GPridatElDokumentProIxsHandler
     *
     * @author TFeik
     * @date    16.11.2018
     * @since 480.1.0.708
     */
    class GPridatElDokumentProIxsHandler {
        /**
         * GetServer
         *
         * @author  TFeik
         * @date    16.11.2018
         *
         * @returns {GContent}
         */
        static GetServer(content: GContent): GContent;
        /**
         * PridatElDokumentProIxs
         *
         * @author  TFeik
         * @date    16.11.2018
         *
         * @param {GPridatElDokumentProIxsFormDto} dokument
         * @returns {JQuery.Promise<undefined>}
         */
        static PridatElDokumentProIxs(params: PridatElDokumentProIxsInputParams, content: GContent): JQuery.Promise<Gin.WebClient.GBaseReturnDto<string>>;
    }
}
declare namespace Gordic.Wfl.Dlg {
    class GReferentEditUniversalDlg extends GContentBase {
        model: Wfl.Interface.GSuFunRefDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Wfl.Common {
    function GetPocetProvedenych(result: Gin.Interface.GResultInfo[]): number;
    function GetPocetDleTypVysledkuOperace(result: Gin.Interface.GResultInfo[], Typ: Gordic.Gin.Interface.TypVysledkuOperace): number;
}
declare namespace Gordic.Wfl.Utils {
    function GetSrv(content: GContent): GContent<IGContentBase, any>;
    class SignObj {
        static _podepisovaniApp: Gordic.Wfl.WebClient.GByteSigner;
        static get PodepisovaniApp(): WebClient.GByteSigner;
    }
    function GenerateIxp(content: GContent): JQuery.Promise<{
        Ixp: string;
    } | undefined>;
    /**
     * Metoda vrati typ dokumentu (Dokument, Spis, Typovy spis, atd..).
     * Zda je danný dokument 0 spis 1 či (nebo typový spis 2, součást 3, díl 4).
     * Metodu lze pouzivat az od verze DB 366.5.26, 366.6.3.
     *
     * @param {string} ixp
     * @returns {JQuery.Promise<{ typSpis?: number } | undefined>}
     */
    function GetTypSpis(ixp: string, content: GContent): JQuery.Promise<{
        typSpis?: TypSpis;
    } | undefined>;
    enum TypSpis {
        dokument = 0,
        spis = 1,
        typovySpis = 2,
        soucast = 3,
        dil = 4
    }
    function getTextCJShort(parentContent: GContent): gjqXHR<string>;
    /**
     * Metoda vrati seznam pracovnich bloku pro vstupni typ bloku/entity
     *
     * @param {Gordic.Wfl.Globals.Enums.TypBlp} TypBlp
     */
    function SeznamPracovnichBloku(TypBlp: Gordic.Wfl.Globals.Enums.TypBlp, content: GContent): JQuery.Promise<any>;
    interface registerBaseSearchResolverInput {
        /**
         * (Default: $('body')) Element, na který bude vyhledávání přidáno.
         * @type {JQuery<HTMLElement>}
         */
        addSearchResolverAt?: JQuery<HTMLElement>;
    }
    interface registerPidSearchResolverInput extends registerBaseSearchResolverInput {
        /**
         * Nastavení hledání pidu.
         * @type {Gordic.Search.GPidSearchResolverInputParams}
         */
        pidSearchResolverParams?: Gordic.Search.GPidSearchResolverInputParams;
    }
    /**
     * Zaregistruje hledání (searchResolver) PIDu do obecného hledacího políčka.
     * Hledání dokumentu, zásilky.
     *
     * @author  TFeik
     * @date    02.04.2019
     */
    function registerPidSearchResolver(input?: registerPidSearchResolverInput): void;
    interface registerCisloJednaciSearchResolverInput extends registerBaseSearchResolverInput {
        cisloJednaciSearchResolverInput?: Search.GCisloJednaciSearchResolverInputParams;
    }
    /**
     * Zaregistruje hledání (searchResolver) Čísla jednacího do obecného hledacího políčka.
     * Hledání dokumentu.
     *
     * @author  TFeik
     * @date    11.05.2020
     */
    function registerCisloJednaciSearchResolver(input?: registerCisloJednaciSearchResolverInput): void;
    interface registerSpisovaZnackaSearchResolverInput extends registerBaseSearchResolverInput {
        spisovaZnackaSearchResolverInput?: Search.GSpisovaZnackaSearchResolverInputParams;
    }
    /**
     * Zaregistruje hledání (searchResolver) Spisové značky do obecného hledacího políčka.
     * Hledání spisu.
     *
     * @author  TFeik
     * @date    03.11.2020
     */
    function registerSpisovaZnackaSearchResolver(input?: registerSpisovaZnackaSearchResolverInput): void;
    interface registerSearchResolversInput extends registerBaseSearchResolverInput, registerCisloJednaciSearchResolverInput, registerPidSearchResolverInput, registerSpisovaZnackaSearchResolverInput {
        commonOptions?: Components.Search.IGSearchResolverOptions;
    }
    /**
     * Zaregistruje vybraná hledání (searchResolvery) do obecného hledacího políčka.
     * Hledání dokumentu, zásilky.
     *
     * @author  TFeik
     * @date    08.03.2019
     */
    function registerSearchResolvers(input?: registerSearchResolversInput, 
    /**
     * (Default: true) Příznak, zda se mají požívat "špatné resolvery" jako je hledání pidu, pčísla jednací a spisové značky.
     * @type {boolean}
     */
    useBadResolver?: boolean): void;
    function GetNewPidForPodani(inputOpt: {
        content: GContent;
        multipid: boolean;
    }): JQuery.Promise<WebClient.GetNewPidForPodaniWFlDto>;
    function DokumentPripravenkFyzDoevidovani(content: GContent, newPidDto: WebClient.GetNewPidForPodaniWFlUtilsDto, mainPromis: JQuery.Deferred<WebClient.GetNewPidForPodaniWFlDto>, retDto: WebClient.GetNewPidForPodaniWFlDto): void;
    function ShowAvizoExpiraceDS(content: GContent, text: string): void;
    function SekceProZpracovaniMultipid(content: GContent, newPidDto: WebClient.GetNewPidForPodaniWFlUtilsDto, mainPromis: JQuery.Deferred<WebClient.GetNewPidForPodaniWFlDto>, retDto: WebClient.GetNewPidForPodaniWFlDto): void;
    function DorucenkaANeniInterniVypraveni(content: GContent, newPidDto: WebClient.GetNewPidForPodaniWFlUtilsDto, mainPromis: JQuery.Deferred<WebClient.GetNewPidForPodaniWFlDto>, retDto: WebClient.GetNewPidForPodaniWFlDto): void;
    /**
     * Zkontroluje, zda je ixb prázné (prázdný string, undefined, null, nebo nulláková hodnota).
     *
     * @author  TFeik
     * @date    26.01.2020
     *
     * @param {string | null | undefined} ixb
     */
    function IsIxbEmpty(ixb: string | null | undefined): ixb is (undefined | null | "");
    interface GWflUtilsNovaZalozkaInput {
        /**
         * content
         * @type {GContent}
         */
        content?: GContent;
        /**
         * ixx 1
         * @type {GContent}
         */
        ixx1: string;
        /**
         * ixx 1
         * @type {GContent}
         */
        commandName?: string;
    }
    function ZkusOtevritPrislusnyModulVNoveZalozce(opt: Gordic.Wfl.Utils.GWflUtilsNovaZalozkaInput): void;
    /**
     * Variant for text filter, works only for one fieldName
     *
     * @author vmaca
     */ class GTextFilterFullTextStartsWith<TRow = any, TValue extends string = any> extends Gordic.Data.Filters.GTextFilterVariant<TRow, TValue> {
        static ID: string;
        id: string;
        protected createResolver(): ExactTextResolver;
    }
    /**
     * Variant for text filter, works only for one fieldName
     * Použití pro sloupec spis. znak nebo jiný, kde chci používat i znak ',' pro vyhledání záznamů s '.' ref T37363
     *
     * @author rtomes
     */ class GTextFilterFullTextStartsWithAndUseCommaForDot<TRow = any, TValue extends string = any> extends Gordic.Data.Filters.GTextFilterVariant<TRow, TValue> {
        static ID: string;
        id: string;
        protected createResolver(): ExactTextResolver;
    }
    /**
     * Testing extension of BaseResolver - works only for single lookup column
     *
     * @author vmaca
     */ class ExactTextResolver extends Gordic.Data.Filtering.BaseResolver<Gordic.Data.Filtering.SimpleFilterResolverSearchOptions> {
        lookupColumn: string;
        hideMatches?: boolean;
        substituteCommaForDotInFilter?: boolean;
        constructor(lookupColumn: string, options?: Gordic.Data.Filtering.SimpleFilterResolverSearchOptions);
        protected getFilter(filter: any, options: any): (row: any) => boolean;
    }
    /**
     * Převede group result z isl na wfl group result.
     *
     * @author  TFeik
     * @date    25.03.2022
     */
    function IslGroupResultToWflGroupResult<TDto>(input: {
        keyProvider: (dto: TDto) => string;
        islResult: Isl.GGroupOperationResult<TDto> | undefined;
    }): WebClient.GroupResult[];
    /**
     * AutoLoadAfterChooseFilterUS
     *
     * @author  TFeik
     * @date    12.04.2022
     *
     * @param {Data.IGStorage | undefined | null} globalSettings
     * @returns {boolean | undefined | null}
     */
    function AutoLoadAfterChooseFilterUS(globalSettings: Data.IGStorage | undefined | null): boolean | undefined | null;
    /**
     * CreateAutoLoadAfter
     *
     * @author  TFeik
     * @date    20.04.2022
     *
     * @param {boolean} autoLoadAfterChooseFilter
     * @returns {Gordic.Widget.filterpanelAutoLoadAfter[]}
     */
    function CreateAutoLoadAfter(autoLoadAfterChooseFilter: boolean | undefined | null): Gordic.Widget.filterpanelAutoLoadAfter[] | undefined;
    /**
     * AutoLoadAfterUS
     *
     * @author  TFeik
     * @date    20.04.2022
     *
     * @param {Data.IGStorage | undefined | null} globalSettings
     * @returns {Gordic.Widget.filterpanelAutoLoadAfter[] | undefined}
     */
    function AutoLoadAfterUS(globalSettings: Data.IGStorage | undefined | null): Gordic.Widget.filterpanelAutoLoadAfter[] | undefined;
    /**
     * NactiOPredvolbyDoBaliku
     *
     * @author  TFeik
     * @date    27.04.2023
     *
     * @param {string | undefined | null} ixp
     */
    function NactiOPredvolbyDoBaliku(ixp: string | undefined | null, content: GContent): gjqXHR<WebClient.SSLProfil>;
    function LoadModuleInfoToStatistiky(input: {
        AppendToDiv: any;
        NazevRef: string;
        NazevFun: string;
        ZastupTxt: string;
        ZkratkaSu: string;
        DatLoginTxt: string;
        Image: string;
        PrimaryText: string;
    }): void;
    function VyhodnotVysledekPristupuDokumentu(rv: Wfl.WebClient.GetDetailInfoForOpeningRetDto, pContent: GContent, mainDef: JQuery.Deferred<any>): boolean;
    /**
     * Vrátí potřebné parametry pro otevřenídialogu zveřejnění smluv.
     *
     * @author  TFeik
     * @date    17.07.2024
     *
     * @param {GContent} parentContent
     * @param {{ ixp: string }} input
     * @returns {JQuery.Promise<WebClient.GGetZverejneniSmluvInputResponseDto>}
     */
    function GetZverejneniSmluvInput(parentContent: GContent, input: {
        ixp: string;
    }): JQuery.Promise<WebClient.GGetZverejneniSmluvInputResponseDto>;
    /**
     * Vrátí potřebné parametry pro otevřenídialogu zveřejnění smluv.
     *
     * @author  TFeik
     * @date    17.07.2024
     *
     * @param {GContent} parentContent
     * @param {{ ixp: string }} input
     * @returns {JQuery.Promise<WebClient.GKontrolaESUVRegistrechDto>}
     */
    function KontrolaESUVRegistrech(parentContent: GContent, input: WebClient.GKontrolaESUVRegistrechDto): JQuery.Promise<WebClient.GKontrolaESUVRegistrechDto>;
    /**
     * export function getCisloJednaciTxt
     *
     * @author  TFeik
     * @date    21.03.2025
     *
     * @returns {JQuery.Promise<string>}
     */
    function getCisloJednaciTxt(): JQuery.Promise<string>;
    /**
     * export function getCisloJednaciTxt
     *
     * @author  TFeik
     * @date    24.03.2025
     *
     * @returns {JQuery.Promise<string>}
     */
    function getSpisovaZnackaTxt(): JQuery.Promise<string>;
    function CreateSearchResultItemWflspid(input: {
        domainId: string;
        name: string;
        confidence: number;
        itemIxp: string;
        item: Wfl.Interface.GWflspidDto;
        aktZnackaLabel: string;
    }): Components.Search.IGSearchResolverItem;
    function CreateSearchResultItemWflspidFulltexts(input: {
        domainId: string;
        name: string;
        items: Wfl.Interface.GWflspidFulltextDto[] | undefined | null;
        getConfidence: (item: Wfl.Interface.GWflspidFulltextDto) => number;
        getAktZnackaLabel: () => JQuery.Promise<string>;
    }): JQuery.Promise<Components.Search.IGSearchResolverItem[]>;
    function GetSearchWflspidFulltextList(input: {
        textInput: string;
        typSpis: Gordic.Ginis.DbModel.GWflctysEnum[];
        rendererLimit?: number;
    }): JQueryPromise<Isl.GServiceListResponse<Interface.GWflspidFulltextDto>>;
    function CreateFuzzySearchWflspidFulltext(): Gordic.Utils.GObjectFuzzySearch;
}
declare namespace Gordic.Wfl.WebClient {
    class GDetailCertifikatu extends GContentBase {
        private formObecne;
        private formPodrobnosti;
        /** informace o certifikátu */
        private cert;
        /** můj otisk certifikátu */
        private thumbprint;
        private certParam;
        onContentReady(): void;
        private createCommandbar;
        private createSubtasks;
        private createSubtaskObecne;
        private createSubtaskPodrobnosti;
        private RevokedFromWithOffset;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GOveritPodpis extends GContentBase {
        /** vstupní dto s daty */
        private Dto;
        /** s načtenými parametry Group, Name */
        private WithParams;
        /** jméno async úlohy */
        private GOveritPodpisAsyncName;
        /** dto by mělo být načteno už na serveru */
        private dtoFromServer;
        /** element seznamu */
        private grid;
        /** příznak spuštění asynchronní úlohy (použito pro zabránění opakovaného spuštění, při nedokončení předchozí akce) */
        private runTaskFlag;
        /** Skrýt tlačítko pro zobrazení historie ověření el. dokumentu */
        private HideHistory;
        private Ixp;
        private Ixb;
        private SerCislo;
        private Filename;
        private Guid;
        private overitUtils;
        private IsTrustedVerificationEnabled;
        /** Identifikátor verze nadřízeného souboru, tedy např ZIP, který obsahuje soubor definovaný pomocí hash, nebo soubor el. podání. */
        private IxsUlo?;
        /** Kontrolní součet souboru */
        private SouborHash512?;
        onContentReady(): void;
        private initContainer;
        private init;
        private setPluginResult;
        private afterInit;
        private addActionOveritPodpisDetail;
        private createMenuBar;
        private addActionVerifyCrl;
        private showPDF;
        /**  GIN - SGN - URL adresa vzdáleného podepsání/pečetění S602 SecuSign	 */
        private gin_sgn_ssurl;
        /** GIN ELE - Zobrazovat dialog pro zadání přihlášení k účtu 602 */
        private gin_ele_602iden;
        private addActionSignatureVerify;
        private _trustedVerification;
        private createContextMenu;
        private createCommandbar;
        private view;
        private createGrid;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GOveritPodpisDetail extends GContentBase {
        private Ixp;
        private Dto;
        onContentReady(): void;
        private createMenubar;
        private createForm;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IGOveritPodpisUtils {
        Input: {
            Filename: string;
            Guid: string;
        };
        RootIndex?: number;
    }
    class GOveritPodpisUtils {
        /** předaný gcontent */
        private cnt;
        private globalIndex;
        private historyVerification;
        constructor(cnt: GContentType<any>, historyVerification: boolean);
        createTree(result: Wfl.Interface.GOveritPodpisDto, input?: IGOveritPodpisUtils): {
            rootIndex: number;
            index: number;
            parentId: string | null;
            id: string;
            flag: string;
            name: string;
            icon?: string;
            child?: any;
        }[];
        createGridFormat(): Data.GridFormat<any>;
        private addPartCertTree;
        private getCertTimestampIcon;
        private getIcon;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GVerifyCrl extends GContentBase {
        private view;
        onContentReady(): void;
        private init;
        private createMenubar;
        private createCommandbar;
        private addActionLoadCrtGrid;
        private createGrid;
        private createForm;
        private createGridFormat;
        private getSearchColumns;
    }
}
declare namespace Gordic.Widget {
    /** dto s daty iconbaru */
    class IconBarDto {
        priz_spis?: number;
        typ_spis?: number;
        typ_ag: number;
        s_fyz: number;
        s_ele: number;
        s_prij: number;
        puvod: number;
        s_sgn: number;
        stav_pis: number;
        priz_cj: number;
        ssl_upoztermdni?: number;
        dat_vyriz_do?: Date;
        s_schval: number;
        cizi_agenda: boolean;
        /**
         * přiznak zda, je dokument v balíku (>0)
         */
        priz_v_baliku: number;
        /**
         * příznak barvy
         */
        uzo: any | null;
    }
    interface IOptionsIconbar {
        gcontent?: GContent;
        customClass?: string;
        ixp?: null | number | string;
        dto: IconBarDto;
        /** přiznak, že se má vykreslit colorbar */
        showColorbar: boolean;
    }
    /**
     * [OBSOLETE]
     * GIconbar
     *
     * @author thazmuka
     * @since 482.1.0.815
     */
    class GIconbar extends JQueryWidget<IOptionsIconbar> {
        static widgetName: string;
        private setColor;
        private inlineDialog;
        /** defaultGContent */
        private defaultGContent?;
        private iconBar;
        private iconsClass;
        /**
         * právě vybraná ikona
         */ b: any;
        private selectIcon;
        /**
         * příznak toho, jestli byla předchozí ikona vytvořena
         */
        private createdPreviouslyIcon;
        /** vytvořit widget */
        protected _create(): void;
        private createGIconbar;
        /**
         * Vytvořit separator
         */
        private createDivider;
        /**
         * Vytvořit ikonu v iconbaru
         */
        private createIcon;
        /**
         * Nastavení ikony a tooltipu do prvního sloupce Typ Entity
         * @param {TypEntityIco} Typ
         */
        private SetIkonaTypEntity;
        /**
         * Zjistí, jaké ikony do sloupce s typem entity dát
         */
        private IkonaTypEntity;
        private IsDokumentFyzicky;
        private IsDokumentFyzickyVSpisu;
        private IsDokumentPrimarneFyzicky;
        private IsDokumentPrimarneFyzickyVSpisu;
        private IsDokumentPrimarneElektronicky;
        private IsDokumentPrimarneElektronickyVSpisu;
        private IsDokumentElektronicky;
        private IsDokumentElektronickyVSpisu;
        private IsDokumentBezFormy;
        private IsDokumentVeSpisuBezFormy;
        private IsDokumentKoncept;
        private IsSpisAnalogovy;
        private IsSpisElektronicky;
        private IsSpisHybridni;
        private IsSpis;
        private IsTypovySpisAnalogovy;
        private IsTypovySpisElektronicky;
        private IsTypovySpisHybridni;
        private IsTypovySpis;
        private IsSoucast;
        private IsDil;
        private IsSoucastVTypovemSpisu;
        private IsDilVSoucasti;
        /**
         * Nastavení ikony a tooltipu do druhého sloupce Vlastnictvi, Doruceni
         * @param {VlastnictviDoruceniIco} Typ
         */
        private SetIkonaVlastnictviDoruceni;
        /**
         * Zjistí, jaké ikony do sloupce s vlastnictví doručeni
         */
        private IkonaVlastnictviDoruceni;
        private IsCiziDokument;
        private IsCiziDokumentDatovaZprava;
        private IsCizipisemnostEmailElektronickePodani;
        private IsCizipisemnostInterface;
        private SetIkonaTechnickeVlastnosti;
        /**
         * Zjistí, jaké ikony do Technicke Vlastnosti
         */
        private IkonaTechnickeVlastnosti;
        private IsPodepsany;
        private IsPodepsanySCasovymRazitkem;
        private IsSCasovymRazitkem;
        private SetIkonaStavZpracovani;
        /**
         * Zjistí, jaké ikony do sloupce s Stav Zpracovani
         */
        private IkonaStavZpracovani;
        private IkonaTermin;
        private SetIkonaVBaliku;
        /**
         * Uloží nastavenou barvu
         * @param {Colors} Uzo Barvy
         */
        private saveColor;
        /**
         * nastavení options
         */
        _setOptions(options: IOptionsIconbar): void;
        /**
         * update iconbar
         */
        update(updateOpt?: IOptionsIconbar): void;
        protected _destroy(): void;
    }
}
interface JQuery {
    giconbar(options?: Gordic.Widget.IOptionsIconbar): JQuery;
}
declare namespace Gordic.Widget {
    interface IGKeyWordsOptions {
        /** předaný gcontent */
        gcontent?: GContent;
        /** identifikátor */
        ixp: string;
    }
    class GKeyWords extends JQueryWidget<IGKeyWordsOptions> {
        static widgetName: string;
        private gridSpisUzel;
        private spisUzelModal;
        private createGridSpisUzel;
        /**
         * Vytvoření tlačítko spisového uzlu,
         * který otevře modální okno ve kterém lze mazat klíčová slova ve spisu
         */
        private createButtonSpisovyUzel;
        /** tlačítko výběr ze všeho */
        private buttonsActionSelectAll;
        /**
         * vytvoří se tlačítko pro výběr ze všeho
         */
        private createButtonVyberZeVseho;
        /**
         * _create
         */
        protected _create(): void;
        /** element keywords */
        private keyWordsEl;
        /**
         * init
         */
        private init;
        /**
         * vytvořit základní přehledový box pro klíčová slova
         * - vyvolat inline dialog při kliku na celé políčko
         * */
        private createSelectBox;
        private createCommandBar;
        private inlineDiv;
        /**
         * createInlineDialog
         *
         * @param {any} element selectbox element
         */
        private createInlineDialog;
        private createFormInlineBoxNew;
        /** počet kl. slov */
        private countOfKeyWords;
        /** klíčová slova */
        private keywords;
        /**
         * načíst klíčová slova ze serveru
         *
         * @param {boolean} createSB vytvořit selectbox?
         */
        private loadKeyWordsFromServer;
        /**
         * přidat klíčová slova
         */
        private addKeyWords;
        /**
         * vyčistit cache
         */
        private clearCache;
        /**
         * gcontent
         */
        private gcontent;
        /**
         * setGContent
         */
        private setGContent;
        /**
         * zničení widgetu
         */
        protected _destroy(): void;
        /**
         * nastavení options
         */
        _setOptions(options: IGKeyWordsOptions): void;
        /**
         * update keywordsbar
         */
        update(updateOpt: IGKeyWordsOptions): void;
    }
}
interface JQuery {
    /** widget kalendáře */
    gkeywords(options?: {
        /** předaný gcontent */
        gcontent?: GContent;
        /** identifikátor */
        ixp: string;
    }): JQuery;
}
declare namespace Gordic.Widget {
    /**
     * Save mody, které vyvolává gkeywordsbar
     */
    enum keywordsbarSaveModeEnum {
        saveData = "save",
        applyData = "apply"
    }
    interface IGKeyWordsBarOptions {
        /** předaný gcontent */
        gcontent?: GContent;
        /** předaný parent gcontent */
        parentGcontent?: GContent;
        /** identifikátor */
        ixp: string;
        /** název widgetu */
        name: string;
        /** rezim ukladani */
        saveData?: keywordsbarSaveModeEnum.saveData | keywordsbarSaveModeEnum.applyData;
        /** dostupnost policka */
        disabled?: null | boolean;
    }
    class GKeyWordsBar extends JQueryWidget<IGKeyWordsBarOptions> {
        static widgetName: string;
        /** gcontent */
        private gcontent;
        /** element gridu */
        private grid;
        /** modální okno */
        private oknoModal;
        /** klíčová slova */
        private keywords;
        /** klíčová slova */
        private keywordsGlob;
        /**
         * _create
         */
        protected _create(): void;
        /**
         * setGContent
         */
        private setGContent;
        private createGrid;
        private vyberFactoru;
        /**
         * přidat klíčová slova
         */
        private addKeyWords;
        /**
         * zjisti opravneni menit klicova slova
         */
        private _LoadPermissionByIsl;
        /**
         * zjisti opravneni menit klicova slova
         */
        private _LoadPermission;
        /**
         * nacte kl. slova pro ixp
         */
        private _loadKeyWordsFromServerByIsl;
        /**
         * nacte kl. slova pro ixp ze serveru
         */
        private _loadKeyWordsFromServer;
        /**
         * Metoda volaná z venčí - uloží klíčová slova
         */
        save(): void;
        /**
         * vyčistit cache
         */
        private clearCache;
        /**
          * zničení widgetu
          */
        protected _destroy(): void;
    }
}
interface JQuery {
    /** widget gkeywordsbar */
    gkeywordsbar(options?: Gordic.Widget.IGKeyWordsBarOptions): JQuery;
    gkeywordsbar(method: "save"): JQuery;
}
declare namespace Gordic.Wfl.ListAC {
    class AuditAkciDSListAC extends GContentBase<WflListBaseAC> {
        model: Wfl.Interface.GSeznamFilterBaseDto;
        onContentReady(): void;
        CreateGrid(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.AC {
    class DSLoginInfoDlg extends GContentBase<WflBaseAC> {
        model: Interface.GDSInfoDto;
        isInit: boolean;
        validators: any;
        onContentReady(): void;
        CreateForm(): void;
        ApplyData(): void;
        LoadData(): void;
        CreateActionZmenaHesla(): GAction;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class DorucenkyDZListAC extends GContentBase<WflListBaseAC> {
        OdDatumu: string;
        data: Gordic.Wfl.Interface.GDorucenkyDatovychZpravDto[];
        onContentReady(): void;
        ReloadData(): void;
        CreateList(): void;
        CreateGrid(): void;
        SetData(): void;
        LoadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class ServisniSeznamDatovychZpravAC extends GContentBase<WflListBaseAC> {
        model: Interface.GSeznamFilterBaseDto;
        ZobrazDorucenky: boolean;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        SetSubtask(dorucenky: boolean): void;
        CreateList(): void;
        CreateActionSubtask(dorucenky: boolean): GAction;
        CreateGrid(): void;
        LoadData(filtr?: Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
        DelegateStavZasilkyIcon(): GGridColumn<any>;
        DelegateStavDZIcon(): GGridColumn<any>;
        DelegateStavDZSystemIcon(): GGridColumn<any>;
        DelegateStavParovaniIcon(): GGridColumn<any>;
    }
}
declare namespace Gordic.Wfl.AC {
    class ZmenaHeslaDZDlg extends GContentBase<WflBaseAC> {
        model: Interface.GDSInfoDto;
        isInit: boolean;
        validators: any;
        onContentReady(): void;
        CreateForm(): void;
        CreateActionZmenaHesla(): GAction;
        OKClick(): void;
        ZmenitHeslo(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GEformDialogSKDlg extends GContentBase implements IGClientContent {
        private inputOpt;
        private $iframeDiv;
        private htmlToShow;
        private iframeDivSkForm;
        private _cardPanel;
        private GAttachmentService;
        private tempSKFormPrilohaName;
        private infoOFormu;
        private attachmentIsFavorite;
        private porCislo;
        private ixb;
        private aktualneSeEditujeSKForm;
        private dataChanged;
        private zakazanyVsechnyAkce;
        private fileDataBase64String;
        prepareContent(opt: GEformDialogSKDlgInputOptions): void;
        private initData;
        private stahniData;
        private vytvorSKForm;
        private saveDataToGinisFromSkForm;
        private saveDataAsDolozka;
        private addSKFile;
        private addDolozka;
        private poUlozeniSKFormu;
        private generovatSkPdfAPridatDoPriloh;
        private generovatSkPdf;
        private stahniSouborPodleGuid;
        private vratAdekvatniJmenoSKForm;
        private vyresJmenoPrilohySFormularem;
        private vytvorMenu;
        private editovatFormular;
        private updateAkcePriEditaci;
        private showSimpleHtml;
        private klasickeZobrazeni;
        private zakazVsechnyAkce;
        private zakazVsechnyAkceProNahledHTML;
        private pridatDataZDetailuDokumentu;
        private tiskObsahuIframe;
        private closing;
        private renderGCardPanel;
        private setFormByFindFormDataDto;
        private getFilename;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GEformSK extends GContentBase {
        private readonly inputOpt;
        private $iframeDiv;
        private htmlToShow;
        prepareContent(opt: GEformSKInputOptions): void;
        private initData;
        callToServerForForm(islOpt: Gordic.Psr.Interface.PsrEFoemTransformRequest): void;
        private showForm;
        pridatIFRAME(): void;
        private startLoadScreen;
        private endLoadScreen;
        decodeHTML(codedHTML: string): string;
        /**
         *  Znovu přepočitá scrollbar
         */
        resizeIframe(): void;
        /**
         * Vrátí data v nativním formatu takže asi nepoužitelné
         * @returns
         */
        getDataFromForm(): string;
        SaveXmlAsReturn(): string;
        PokusONasetovaniHodnot(): void;
        b64DecodeUnicode(str: any): string;
        LoadXmlAsReturnNew(xml: string): void;
        tiskObsahuIframe(znacka: any, datPodano: any): void;
        closing(): JQuery.Promise<void>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GEformVyberFormulareDlg extends GContentBase {
        private inputOpt;
        private Formular;
        private retVal;
        prepareContent(opt: GEformVyberFormulareDlgInputOptionsDto): void;
        private initData;
        private vytvoitForm;
        private createMenu;
        private zacatekUlozeni;
        private provedVyslednouAkc;
        private ulozDoPriloh;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * GDetailZasilkyHandler
     *
     * @author Dsebesta
     * @since 480.1.0.37
     */
    class GUpsrUtils {
        /**
         * GetServer
         *
         * @author TFeik
         * @date    30.08.2018
         */
        static GetServer(content: GContent): GContent;
        static StahniHtmlForm(ixb: string, content: GContent): JQuery.Promise<Wfl.Interface.StahniHtmlFormOutputDto>;
        static ZobrazitFormSDorucenkou(ixb: string, parentContent: GContent): JQuery.Promise<any>;
        static GetFileInfoAStahni(ixb: string, content: GContent): undefined;
        static StahnoutZpravuFinal(guid: any): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface HistorieKonverzaceSKZpravDlgInput {
        Dto: Wfl.Interface.GWflsinbDto;
        Ixp: string;
        TypZobrazeni: WebClient.TypZobrazeniHistorieKonverzaceSKZpravDlgEnum;
    }
    interface HistorieKonverzaceSKZpravDlgOutput {
    }
    class HistorieKonverzaceSKZpravDlg extends GContentBase {
        private Grid;
        private model;
        private listDat;
        private TypZobrazeni;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private nenalezenoCorrelationId;
        private vytvorGrid;
        private vytvorMenu;
        private getMenu;
        private enableActions;
        private getGridFormat;
        private akceNaGridu;
        private zobrazHtmlForm;
        private stahniZpravu;
        private detailZasilky;
        private detailDokumentu;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface NabidkaCorrellationIdDlgInput {
        Ixp: string;
    }
    interface NabidkaCorrellationIdDlgOutput {
        row?: Wfl.Interface.PotencionalniCorrelationIdDto;
    }
    class NabidkaCorrellationIdDlg extends GContentBase {
        private model;
        private Grid;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private nenalezenoCorrelationId;
        private vytvorGrid;
        private vytvorMenu;
        private getGridFormat;
        private stahniHtmlForm;
        private vybrat;
        private detailZasilky;
        private detailDokumentu;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    interface GIxsPrilohyExtensions extends GWflPrilohyExtensions {
    }
    interface GIxsPrilohyOptions extends GWflPrilohyOptions {
        visitors?: Wfl.WebClient.Attachments.IGAttachmentDlgVisitor[];
        attachmentDao?: Wfl.WebClient.Attachments.IGAttachmentDAO;
    }
    class IxsPrilohy {
        static create(componentDto: Wfl.WebClient.GIxsPrilohyComponentDto, opts: GIxsPrilohyOptions): Gin.DetailBuilder.GDetailBuilderComponent<Gin.DetailBuilder.GDetailBuilderContent>;
        static createDefaultVisitor(componentDto: any, dao?: Wfl.WebClient.Attachments.IGAttachmentDAO): WebClient.Attachments.GIxsAttachmentVisitor;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /** Komponenta detail builderu Finanční kontrola */
    class WflFK {
        /**
         * Vytvoření builderu s Finanční kontrolou
         * @param componentDto Vstupní DTO s parametry
         */
        static create(componentDto: any): Gin.DetailBuilder.GDetailBuilderComponent<Gin.DetailBuilder.GDetailBuilderContent>;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    class WflLinkedDocsNew {
        static create(content: any, componentDto: any): Gordic.Gin.DetailBuilder.GDetailBuilderComponent;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /**
     * Content, se kterým komponenta pracuje.
     *
     * @author  TFeik
     * @date    04.06.2019
     * @since   482.1.0.453
     */
    export interface WflZalozkaZverejneniComponentContent extends WflZalozkaZverejneniComponentContentRequirements, WflZalozkaZverejneniComponentContentExtensions {
    }
    /**
     * Interface, který musí splňovat content, pracující s componentou doručení zásilky.
     *
     * @author  TFeik
     * @date    04.06.2019
     * @since   482.1.0.453
     */
    export interface WflZalozkaZverejneniComponentContentRequirements extends GContent {
    }
    /**
    * Funkce, které komponenta přidá na content.
    *
    * @author  TFeik
    * @date    04.06.2019
    * @since   482.1.0.453
    */
    export interface WflZalozkaZverejneniComponentContentExtensionsPublic {
    }
    /**
     * Funkce, které komponenta přidá na content.
     *
     * @author  TFeik
     * @date    04.06.2019
     * @since   482.1.0.453
     */
    interface WflZalozkaZverejneniComponentContentExtensions extends WflZalozkaZverejneniComponentContentExtensionsPublic {
        nasetujZverejneni: (dto: Wfl.WebClient.GWflZalozkaZverejneniComponentDto) => void;
        $GridZverejneni?: JQuery<HTMLElement>;
        OptionsForColumns: Gordic.Widget.GAttachmentOptionsForColumns;
        tryReloadDetail: (opt?: any, flashMessage?: {
            flashMessageClass: string | undefined;
            flashMessage: string | undefined;
        }) => void;
    }
    export class WflZalozkaZverejneniComponent {
        static create(content: WflZalozkaZverejneniComponentContent, componentDto: Wfl.WebClient.GWflZalozkaZverejneniComponentDto): Gin.DetailBuilder.GDetailBuilderComponent<WflZalozkaZverejneniComponentContent>;
    }
    export {};
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /**
     * Content, se kterým komponenta pracuje.
     */
    export interface WflZverejneniComponentContent extends WflZverejneniComponentContentRequirements, WflZverejneniComponentContentExtensions {
    }
    /**
     * Interface, který musí splňovat content, pracující s componentou zveřejnění.
     */
    export interface WflZverejneniComponentContentRequirements extends GContent {
    }
    /**
    * Funkce, které komponenta přidá na content.
    */
    export interface WflZverejneniComponentContentExtensionsPublic {
    }
    /**
     * Funkce, které komponenta přidá na content.
     */
    interface WflZverejneniComponentContentExtensions extends WflZverejneniComponentContentExtensionsPublic {
        EditMode: boolean;
        nasetujZverejneni: (dto: Wfl.WebClient.GWflZverejneniComponentDto) => void;
        $gridZverejneniRole?: JQuery<HTMLElement>;
        $formZverejneni: JQuery<HTMLElement>;
        tryReloadDetail: (opt?: any, flashMessage?: {
            flashMessageClass: string | undefined;
            flashMessage: string | undefined;
        }) => void;
    }
    /** Componenta Zveřejnění*/
    export class WflZverejneniComponent {
        static create(content: WflZverejneniComponentContent, componentDto: Wfl.WebClient.GWflZverejneniComponentDto): Gin.DetailBuilder.GDetailBuilderComponent<WflZverejneniComponentContent>;
        static PorovnejDatum(datum1: Date, datum2: Date): number;
        static Porovnej(hodn1: number, hodn2: number): number;
    }
    export {};
}
declare namespace Gordic.Wfl.WebClient {
    /** Content pro výběr/přidání el. příloh z mateřského dokladu na doklad zveřejnění */
    class GWflZverejneniVyberElPriloh extends GContentBase implements IGClientContent {
        data: any;
        operace: any;
        /** Grid s prostředky (widget)*/
        private $grid;
        prepareContent(options: any): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření commandbaru */
        private createCommandBar;
        private createGrid;
        private createGridFormat;
        private createGridOdebraniPrilohy;
        private createGridFormatOdebraniPrilohy;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * GDetailZasilkyHandler
     *
     * @author Dsebesta
     * @since 480.1.0.37
     */
    class GWflDetailUtils {
        /**
         * GetServer
         *
         * @author TFeik
         * @date    30.08.2018
         */
        static GetServer(content: GContent): GContent;
        static FormaDokumentu(content: GContent, opt: {
            Ixp: string;
        }): void;
        static Posoudit(content: GContent, opt: {
            Ixp: string;
            IxsFun: string;
        }): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class NastavFormulareKDokumentuDlg extends GContentBase {
        private dto;
        private $Form;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private vytvorFormular;
        private vytvorMenu;
        private okClick;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** interface metod z předka */
    interface IGHistorie {
        initHistory: Function;
        createDefaultMenu: Function;
        gridBuilderZmeny: Function;
        getSearchColumns: Function;
    }
    /** Historie */
    export class GWflHistorie extends GContentBase<IGHistorie> {
        /** identifikator dokumentu/spisu */
        private Ixp;
        /** element gridu */
        private grid;
        /** element parentu nahledu */
        private elNahledParent;
        /** vstupní dto */
        private InputDto;
        /** Zobrazení náhledu elektronického souboru */
        private gin_ele_dmspres;
        ID: string;
        taskId: string;
        onContentReady(): void;
        createSpecificMenu(): MenuParams[];
        private openAttachment;
        createSpecificSubtask(): void;
        private setActionsState;
        private updateActionFileVyriz;
        createSpecificGridFormat(format: Data.GridFormat): Data.GridFormat<any>;
        private getFormatRedistribuce;
        private gridBuilderRedistribuce;
        private getFormatTisky;
        private gridBuilderTisky;
        private rowSchvalovani;
        private gridBuilderSchvalovani;
        private updateSidebar;
        private createSidebarSchvalovani;
        private createPanelNahled;
        private preCreateAttachment;
        private createAttachment;
        private removeAttachment;
        private addColumnsSchvalovani;
    }
    export {};
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Kontrola metadat (Oprava chyb)
     */
    class GWflKontrolaMetadat extends GContentBase<GWflKontrolaMetadatParams> {
        private server;
        private metadataService;
        onContentReady(): void;
        closing(): {
            stav: boolean;
        };
        private init;
        private initValues;
        private isDataEmpty;
        /** občerstvení seznamu */
        private refreshGrid;
        /** element seznamu */
        private grid;
        private createGrid;
        private createMenuBar;
        private createCommandBar;
        private opravit;
        private TypObjektu;
        private getTypChyby;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** Parametry ke kontrole metadat */
    class GWflKontrolaMetadatParams {
        /** typ režimu práce seznamu */
        TypRezimu: Wfl.Interface.TypRezimuPraceSeznamu;
        /** Identifikátor dokumentu */
        Ixp: string;
        /**
         * Režim kontroly:
         * - true: kontrolovat
         * - false: nekontrolovat
         */
        RezimSPZ: boolean;
        /** Data gridu */
        Data: Wfl.Interface.GSpitkonDto[];
        /** stav neuložení vrácený v closing */
        retval: {
            /** hodnota stavu */
            stav: boolean;
        };
        /** data View seznamu */
        view: Data.View<Wfl.Interface.KontrolaMetadatDto>;
        /** typ kontroly spis_znak, u schvalovani 0 */
        typKontrolySpisZnaku: number;
        /**
         * vytvoření formátu do gridu
         */
        static formatGrid(TypRezimu: Wfl.Interface.TypRezimuPraceSeznamu): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Doplnění položek - kontrola metadat
     */
    class KontrolaMetadatDoplnPolozek extends GContentBase {
        private grid;
        private form;
        private view;
        private data;
        private TypHromadneOpravy;
        /** výsledek akcí */
        private ResultIxp;
        onContentReady(): void;
        private init;
        private createCommandbar;
        private createForm;
        private setTypOpravy;
        private createView;
        private createMenubar;
        /**
        * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
        *
        * @param {JQuery<HTMLElement>} form předaný element formuláře
        * @returns {JQueryPromise<boolean>} výsledek stavu
        */
        private waitForValues;
        private createRepairAction;
        /** opravit */
        private _repair;
        private overitPodpisy;
        private doplnitFormuDokumentu;
        private getActionParams;
        private refresh;
        private createGrid;
        private getSearchColumns;
        private createGridFormat;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IOpravaKonverzeFormatuOutput {
        state: boolean;
        resultIxp?: string[] | null;
    }
    class KontrolaMetadatService {
        constructor(cnt: GContentType<any>);
        private cnt;
        private metadataService;
        /** kontrola metadat */
        checkMetadata(ixpArray: string[], jeVeSpisovne?: boolean, typWflObjektu?: Interface.TypWflObjektu): JQuery.Promise<Gin.Interface.GResultInfo[], any, any>;
        private flashIdOpravaPolozek;
        getTypValidace(typOpravy: Interface.TypOpravyMetadatNevalidnichDokSpis, row: Wfl.Interface.GSpitkonDto, rezimSPZ: boolean, opravaDatReguestDto: Gordic.Wfl.Interface.GOpravaDatReguestDto): JQuery.Promise<any, any, any>;
        opravaKonverzeFormatu(data: Interface.GSpitkonDto[], OpravaDatReguestDto: Interface.GOpravaDatReguestDto, rezimSPZ: boolean): JQuery.Promise<IOpravaKonverzeFormatuOutput>;
        opravaVazebSouvisejicich(data: Interface.GSpitkonDto[], OpravaDatReguestDto: Interface.GOpravaDatReguestDto): JQuery.Promise<IOpravaKonverzeFormatuOutput>;
        opravaMetadatTab(TypOpravy: Interface.TypHromadneOpravyNevalidnichZaznamu, data: Interface.GSpitkonDto[], OpravaDatReguestDto: Interface.GOpravaDatReguestDto): JQuery.Promise<IOpravaKonverzeFormatuOutput>;
        private opravaMetadatNevalidDokSpis;
        private opravaPolozekNeevidDokspis;
        private opravaPrimoNaDetailu;
        private opravaNaDialoguPriloh;
        private opravaFormyDokSpis;
        private opravaMetadat;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** společné metody pro kontrolu metadat */
    class KontrolaMetadatUtils {
        setGroupingProcessor(view: Data.View<Gordic.Wfl.Interface.GSpitkonDto>): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Dialog opravy metadat
     * - s možností hromadné opravy
     */
    class OpravaMetadat extends GContentBase {
        /** metoda vracího vybraný řádek nebo skupiny vybraných řádků oprav */
        private selection?;
        /** možnost přidat další akce do menubaru */
        private menuParams?;
        /** spuštění opravy metadat v režimu EKO **/
        private Eko;
        private OpravaDatReguestDto;
        private server;
        private metadataService;
        private grid;
        private view;
        private data;
        private ActionHromadneOpravitVazbySouvisejicich;
        private TypPovoleniKonverzeDoPDFEnabled;
        private idFlashRepair;
        private flashIdOprava;
        /** pole s vyřízenými ixp pro retval */
        private difference;
        /** návratový stav kvůli refreshi */
        private state;
        onContentReady(): void;
        /** CLOSING NA NADŘAZENÝ DIALOG */
        closing(): {
            stav: boolean;
            /** pole opravených identifikátorů */
            correctedIxpList: string[];
        };
        private init;
        /**
         * inicializace externích parametrů
         */
        private initExternParams;
        private isDataEmpty;
        private createCommandbar;
        /** Seznam identifikátorů IXP pro vstupní filtr seznamu */
        private FilterIxpList;
        /** Seznam identifikátorů balíků pro vstupní filtr seznamu */
        private FilterIxsZupList;
        private createView;
        /** přidat názvy sloupců do řetězce */
        private getStringNamesOfColumns;
        private createGrid;
        private isObjEmpty;
        private isNullOrEmpty;
        private parseEnumToInt;
        private setInitActions;
        private testHromadneOpravy;
        private updateMenubarActions;
        private runRepair;
        private getActionParams;
        private openFileInfo;
        private doplneniPolozek;
        private refresh;
        private TypKontrolySpisZnakuProp;
        private getTypChyby;
        private createMenubar;
        private getSearchColumns;
        private getFormatSSL;
        private getFormatEko;
        private getColumnTypEntity;
        private getColumnIdBaliku;
        private getColumnIdDokumentu;
        private getColumnIdSouboru;
        private getColumnInfoPodpis;
        private getColumnDuvodNevalidity;
        private getColumnVec;
        private getColumnKategorieNevalidity;
        private getColumnSpisPlan;
        private getColumnSpisZnak;
        private getColumnZnacka;
        private getColumnTypDokumentu;
        private getColumnKategorieDokumentu;
        private getColumnVlastnik;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniAdresyZasilkyDlgInputParams {
        Ixp: string;
        IxsEsu: string;
        SDor: Ginis.DbModel.GWflcsdoEnum;
        LicZast: string;
        PorZast: number;
        AdresniRadky: {
            EsuTxt: string;
            St0: string;
            St1: string;
            St2: string;
            St3: string;
            St4: string;
            St5: string;
            St6: string;
            St7: string;
        };
    }
    interface GOdeslaniAdresyZasilkyDlgReturnValue {
        AdresniRadky?: Interface.GOdeslaniAdresniRadkyDto;
    }
    class GOdeslaniAdresyZasilkyDlg extends GContentBase {
        /**
         * Ixp.
         */
        private readonly Ixp?;
        /**
         * IxsEsu.
         */
        private readonly IxsEsu?;
        /**
         * SDor.
         */
        private readonly SDor?;
        /**
         * LicZast.
         */
        private readonly LicZast?;
        /**
         * PorZast.
         */
        private readonly PorZast?;
        /**
         *
         */
        private readonly Config?;
        /**
         *
         */
        private $Form?;
        /**
         *
         */
        private readonly AdresniRadkyExtended?;
        /**
         *
         */
        private Result?;
        /**
         * OnContentReady.
         *
         * @author  tfeik
         * @date    07.04.2017
         */
        onContentReady(): void;
        /**
         * Přehodí 3. a 4. řádek adresy.
         *
         * @author  tfeik
         * @date    07.04.2017
         */
        private _switch3r4r;
        /**
         * Uloží aktuální adresu zásilky do ESU (Adresa adresáta / zástupné osoby).
         *
         * @author  tfeik
         * @date    07.04.2017
         */
        private _ulozitKEsu;
        /**
         * Adresu na zásilce nahradí adresou z ESU (Adresa adresáta / zástupné osoby).
         *
         * @author  tfeik
         * @date    07.04.2017
         */
        private _obnovitZEsu;
        /**
         * Uloží adresní řádky do Clipboardu.
         *
         * @author  TFeik
         * @date    07.04.2017
         */
        private _saveToClipboard;
        /**
         * Vrátí zpátky objekt GOdeslaniAdresniRadkyDto s upravenou adresou a zavře okno.
         *
         * @author  tfeik
         * @date    07.04.2017
         */
        private _saveAndClose;
        /**
         * Closing.
         *
         * @author  tfeik
         * @date    07.04.2017
         *
         * @returns {object} Nové hodnoty adresních řádků.
         */
        closing(): JQuery.Promise<GOdeslaniAdresyZasilkyDlgReturnValue>;
        /**
         * Vytvoří akce.
         *
         * @author  tfeik
         * @date    07.04.2017
         */
        private _createAcions;
        /**
         * Vytvoří menu.
         *
         * @author  tfeik
         * @date    07.04.2017
         */
        private _createMenu;
        private canEditAddress;
        private canSaveAddressToEsu;
    }
}
declare namespace Gordic.Wfl.WebClient {
    enum GridDataUpdateActionType {
        None = 0,
        Create = 1,
        Update = 2,
        Add = 3
    }
    interface GOdeslaniDlgInputParams {
        /**
         * Ixp dokumentu.
         */
        Ixp?: string;
        /**
         * Příznak, zda se jedná o hromadné odeslání (default: false).
         */
        Hromadne?: boolean;
        /**
         * Příznak, zda se jedná o hromadné odeslání dotčeným subjektům (default: false).
         */
        HromadneDotcSubj?: boolean;
        /**
         * Příznak, zda se má generovat seznam odeslaných zpráv (default: false).
         */
        GenerovatSeznamOdeslanych?: boolean;
    }
    interface GOdeslaniDlgReturnValue {
        /**
         * Příznak, zda došlo v okně odeslání došlo k uložení.
         */
        ulozeno?: boolean;
    }
    class GOdeslaniDlg extends GContentBase {
        private readonly Ixp?;
        private readonly Hromadne?;
        private readonly HromadneDotcSubj?;
        private readonly GenerovatSeznamOdeslanych?;
        private readonly OdeslaniSeznamZasilek?;
        private readonly AktZnacka?;
        private readonly EnabledActions?;
        private readonly Config?;
        private readonly TiskParams?;
        /**
         *
         */
        private $Form?;
        /**
         *
         */
        private $Grid?;
        /**
         * Příznak zda došlo k uložení zásilek.
         * Ten je vrácen při zavření okna Odeslání a indikuje tka nutnost přenačtení dat  o dokumentu.
         */
        private IsSaved;
        private UnsavedChanges;
        private SavingDef?;
        private PreviewDiv?;
        private RowToPreview?;
        private SeznamZasilekDataView?;
        private RightSbCnt$?;
        private AsistentInfo?;
        private DruhZasilkyValues?;
        private GetDruhZasilkyValues;
        /**
         * Nastavení logování.
         */
        logOptions: {
            name: string;
            filename: string;
            authorCreate: number;
        };
        /**
         * OnContentReady.
         *
         * @author  tfeik
         * @date    02.05.2017
         */
        onContentReady(): void;
        _isDebounced: boolean;
        private _createPreviewPanel;
        private _loadPreview;
        private _enablePreview;
        private _showPreview;
        private _removePreview;
        /**
         * Obnoví data v preview dle zadaného řádku.
         * V případě, že je řádek undefined, pak se náhled vypne.
         *
         * @author  TFeik
         * @date    02.04.2019
         *
         * @param {GOdeslaniSeznamDto} row
         */
        realoadPreview(row?: GOdeslaniSeznamDto): void;
        /**
         * Closing.
         *
         * @author  TFeik
         * @date    30.08.2017
         *
         * @returns {promise} Promise.
         */
        closing(): JQueryPromise<GOdeslaniDlgReturnValue>;
        /**
         * Nastaví příznak UnsavedChanges.
         *
         * @author  TFeik
         * @date    30.04.2018
         *
         * @param {boolean} value
         */
        setUnsavedChanges(value: boolean): void;
        /**
         * createActions
         *
         * @author  TFeik
         * @date    23.08.2023
         */
        private createActions;
        /**
         * Vytvoří menu nad contentem.
         *
         * @author  TFeik
         * @date    30.08.2017
         */
        private createMenuBar;
        /**
         * Vytvoří menu pod contentem.
         *
         * @author  TFeik
         * @date    30.08.2017
         */
        private createCommandBar;
        /**
         * Vytvoří menu pro tab zásilek.
         *
         * @author  TFeik
         * @date    24.08.2023
         *
         * @returns {MenuParams[]}
         */
        private createMenuBarZasilky;
        private _createSeznamZasilekDataView;
        private _setIntoSeznamZasilekDataView;
        private _addIntoSeznamZasilekDataView;
        private _updateSeznamZasilekDataView;
        /**
         * Ukončí editaci gridu.
         *
         * @author  TFeik
         * @date    06.01.2023
         */
        private stopGridEditation;
        /**
         *
         * @author  TFeik
         * @date    03.05.2017
         *
         * @returns
         */
        private _getSeznamVsechZasilek;
        /**
         *
         * Vrátí uživatelem vybrané řádky gridu.
         *
         * @author  tfeik
         * @date    01.09.2017
         *
         * @param {boolean} pouzeEditovatelne? (default = false)
         * @returns {GOdeslaniSeznamDto[]} Vybrané řádky.
         */
        private _getSelectedRows;
        /**
         * Obnoví data v Gridu.
         *
         * @author  tfeik
         * @date    01.09.2017
         */
        private _reloadGridData;
        /**
         * Přepíše řádek v OdeslaniSeznamZasilek, jestliže se shoduje idZasilky.
         *
         * @author  tfeik
         * @date    01.09.2017
         *
         * @param {!GOdeslaniSeznamDto} newDataRow Aktualizovaná data řádku.
         */
        private _updateOdeslaniZasilka;
        /**
         * Přidá řádek do OdeslaniSeznamZasilek.
         *
         * @author  tfeik
         * @date    11.04.2018
         *
         * @param {!GOdeslaniSeznamDto} newDataRow Nová data řádku.
         */
        private _addOdeslaniZasilka;
        /**
         * Přepíše řádek v OdeslaniSeznamZasilek, jestliže se shoduje idZasilky.
         *
         * @author  tfeik
         * @date    17.04.2018
         *
         * @param {!GOdeslaniSeznamDto} newDataRows Aktualizovaná data řádku.
         */
        private _replaceOdeslaniZasilka;
        /**
         * resizeOnTabToggled
         *
         * @author  TFeik
         * @date    24.08.2023
         *
         * @param {JQuery<HTMLElement> | undefined | null} $tab
         */
        private resizeOnTabToggled;
        /**
         * resize
         *
         * @author  TFeik
         * @date    23.08.2023
         */
        private resize;
        /**
         * Načtení výchozích hodnot formuláře.
         *
         * @author  tfeik
         * @date    28.11.2017
         *
         * @param sourceData
         */
        private _loadDefaultFormParams;
        /**
         * Aktualizuje seznam zasilek dle aktuálně uložených dat v databázi.
         *
         * @author  TFeik
         * @date    30.04.2018
         */
        private _refreshSeznamnZasilek;
        /**
         * Uloží zásilky.
         *
         * @author  TFeik
         * @date    11.04.2018
         */
        private _saveSeznamZasilek;
        /**
         * Odebere označené zásilky.
         *
         * @author  TFeik
         * @date    11.04.2018
         */
        private _odstranitZasilky;
        /**
         * Vytvoří zásilky pro dotčené subjekty dokumentu.
         *
         * @author  tfeik
         * @date    11.04.2018
         */
        private _dotceneSubjekty;
        /**
         * Vytvoří zásilky pro subjekty vybrané z Kartotéky.
         *
         * @author  tfeik
         * @date    18.04.2018
         *
         */
        private _kartoteka;
        /**
         * Přidá adresáty ze skupin externích subjektů.
         *
         * @author  tfeik
         * @date    31.10.2017
         */
        private _skupiny;
        /**
         * Zneguje označení originální dokument aktuálnímu řádku a ostatní odznačí.
         *
         * @author  TFeik
         * @date    31.10.2017
         */
        private _originalFlag;
        /**
         * Vygeneruje id doručenky pro doporučené zásilky.
         *
         * @author  tfeik
         * @date    11.04.2018
         */
        private _generujIdDoporucenychZasilek;
        /**
         * Vygeneruje id doručenky pro všechny zásilky.
         *
         * @author  tfeik
         * @date    11.04.2018
         */
        private _generujIdVsechZasilek;
        /**
         * Otevře okno pro výběr pobočky / adresy a aktualizuje zásilku dle návratových hodnot.
         *
         * @author  tfeik
         * @date    06.12.2017
         */
        private _adresyPobocky;
        /**
         * Otevře okno pro úpravu zásilkové adresy a aktualizuje zásilku dle návratových hodnot.
         *
         * @author  tfeik
         * @date    18.04.2018
         */
        private _zasilokovaAdresa;
        /**
         * Upraví vybrané zásilky dle aktuálního nastavení ve formuláři.
         *
         * @author  TFeik
         * @date    05.03.2018
         */
        private _applyFormSettings;
        /**
         * Ověří doručovací adresu.
         *
         * @author  tfeik
         * @date    10.04.2017
         */
        private _overDorucovaciAdresu;
        /**
         * Ověří GEX / DS externího subjektu.
         *
         * @author tfeik
         * @date 18.08.2017
         *
         */
        private _overitISDS;
        /**
         * Otevře obrazovku s tiskem adres.
         *
         * @author  tfeik
         * @date    30.08.2017
         */
        private _tiskAdresy;
        /**
         * Připraví temp tabulku pro tisk přehledu. v případě neuložených dat se zeptá uživatele na jejich uložení.
         *
         * @author  tfeik
         * @date    30.08.2017
         *
         * @param {[string='Prehled']} typTisku Název typu tisku 'Prehled', 'Protokol'.
         *
         * @returns {promise} Rozhodnutí o tom, zda se má generovat sestava tisku.
         */
        private _pripravTempTabulkuProTisk;
        /**
         * Zahájí odeslání zásilek.
         *
         * @author  tfeik
         * @date    03.01.2018
         */
        private _zahajitOdeslani;
        /**
         * Otevře obrazovku s historií zásilky.
         *
         * @author  tfeik
         * @date    30.08.2017
         */
        private _historie;
        /**
         * Otevře okno průvodce odesláním.
         *
         * @author  TFeik
         * @date    07.12.2017
         */
        private _pruvodce;
        /**
         * Zkontroluje zda jsou provedeny neuložené změny a případně zobrazí dialog s uložením.
         *
         * @param {string | Element | JQuery} [message] Text/Html/JQuery obsahu okna.
         * @returns {JQuery.Promise<void>}
         */
        private checkUnsavedChanges;
        /**
         * Otevře okno s formulářem uživatelského nastavení odeslání.
         *
         * @author  tfeik
         * @date    28.11.2017
         */
        private _moznosti;
        /**
         * Vrátí nastavení zásilky s formuláře.
         *
         * @author  TFeik
         * @date    06.06.2019
         *
         * @returns {GOdeslaniSeznamFormDto | undefined} Objekt nastavení zásilky. V případě, že nebylo vypln2no pak vrátí undefined.
         */
        private _getNastaveniZasilky;
        private _getMoznostiOdeslaniZasilky;
        /**
         * Zobrazí message z BaseReturnObejct.
         *
         * @author  TFeik
         * @date    18.04.2018
         *
         * @param {GIOdeslaniBaseReturnObejct<TData>} returnObject
         */
        private _showBaseReturnMessages;
        private _showPrintMessageWarningIfUnsave;
        /**
         * Aktualizuje data adrésátů vybraných zásilek dle externího subjektu.
         *
         * @author  TFeik
         * @date    20.10.2020
         *
         * @returns {JQuery.Promise<void>}
         */
        private AktualizujDataAdresatu;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniDsDlgInputParams extends GOdeslaniPredpisBaseInputParams {
        VyberJakoOriginal?: boolean;
        EditJakoOriginal?: boolean;
    }
    interface GOdeslaniDsDlgReturnValue extends GOdeslaniPredpisBaseDlgReturnValue {
    }
    class GOdeslaniDsDlg extends GContentBase {
        /**
         *
         */
        private readonly Hromadne?;
        /**
         *
         */
        private readonly IxbSeznam?;
        /**
         *
         */
        private readonly Nedokladovane?;
        private readonly DsForm?;
        /**
         *
         */
        private readonly MailStruct?;
        private readonly SeznamPrilohPisemnosti?;
        private readonly IxsUloPre?;
        private readonly IsPriprava?;
        /**
         *
         */
        private readonly Config?;
        private readonly TypDs?;
        /**
         *
         */
        private Result;
        /**
         *
         */
        private ShowClosingAlert;
        /**
         *
         */
        private $Form?;
        /**
         *
         */
        private $Grid?;
        private InvokeSelection;
        /**
         *
         */
        private MailSettings?;
        /**
         * Hodnoty které byly nastaveny před postoupením původní datové zprávy,
         * aby je bylo možné vrátit zpět po případném zrušení postoupení.
         *
         * @type {GOdeslaniDsFormDto}
         */
        private HodnotyPredPostoupenim?;
        /**
         * Hodnoty které byly nastaveny před zrušením postoupení původní datové zprávy,
         * aby je bylo možné vrátit zpět po případném nastavení postoupení.
         *
         * @type {GOdeslaniDsFormDto}
         */
        private HodnotyPredZrusenimPostoupeni?;
        private Logger;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    13.10.2017
         */
        onContentReady(): void;
        /**
         * Spočítá velikost vybraných souborů k odeslání emailu.
         *
         * @author  TFeik
         * @date    09.10.2017
         *
         * @returns {number} Velikost vybraných souborů v Bytech.
         */
        private _getVelikost;
        /**
         * Přepočítá velikost vybraných souborů a uloží ji do formuláře.
         *
         * @author  TFeik
         * @date    09.10.2017
         */
        private _prepocitejVelikostSouboru;
        private _refreshGrid;
        private _getSeznamVybranychPriloh;
        private _getSeznamPriloh;
        private updateSeznamPriloh;
        private _getDsForm;
        /**
         * Ukončení přípravy odeslání datové zprávy.
         *
         * @author  TFeik
         * @date    26.10.2017
         *
         * @param {boolean} opakovat Příznak, zda se má stejné nastavení požít i pro další zásilky.
         */
        private odeslat;
        /**
         * Označí přílohy do velikosti DZ.
         *
         * @author  TFeik
         * @date    16.05.2018
         */
        private _oznacitDoLimituDZ;
        /**
         * Označí přílohy do další DZ.
         *
         * @author  TFeik
         * @date    17.05.2018
         */
        private _oznacitProDalsiDZ;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    13.10.2017
         */
        private _createMenu;
        /**
         * Vrátí nastavení emailu.
         *
         * @author  TFeik
         * @date    15.05.2018
         *
         * @returns {IGOdeslaniEmailDlgResult}
         */
        private _getMailSettings;
        /**
         * Vrátí výsledek okna odeslání datové zprávy.
         *
         * @author  TFeik
         * @date    15.05.2018
         *
         * @returns {IGOdeslaniEmailDlgResult}
         */
        private _getResult;
        /**
         * Closing.
         *
         * @author  TFeik
         * @date    13.10.2017
         *
         * @returns {object} Stav přípravy odeslání emailu "state" a nastavené hodnoty "value".
         */
        closing(): JQueryPromise<GOdeslaniDsDlgReturnValue>;
        /**
         * Načte seznam příloh ze serveru.
         *
         * @author  TFeik
         * @date    08.11.2019
         *
         * @returns {JQuery.Promise<GOdeslaniPrilohaPisemnostiDto[]>}
         */
        private GetSeznamPriloh;
        /**
         * Načte seznam zásilek odeslaných adresátovi v posledních dnech ze serveru.
         *
         * @author  TFeik
         * @date    08.11.2019
         *
         * @returns {JQuery.Promise<GOdeslaniSeznamPrilohEMailuDto[]>}
         */
        private GetZasilkyOdeslaneAdresatoviVPoslednichDnech;
        /**
         * Nastaví enable/disable na akcích a políčkách formuláře.
         *
         * @author  TFeik
         * @date    09.04.2021
         */
        setEnable(): void;
        /**
         * Vrátí inicializovaný logger pro logování.
         *
         * @author  TFeik
         * @date    22.11.2022
         *
         * @returns {Diagnostics.GLog}
         */
        private GetLogger;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniEDeskDlgInputParams extends GOdeslaniPredpisBaseInputParams {
    }
    interface GOdeslaniEDeskDlgReturnValue extends GOdeslaniPredpisBaseDlgReturnValue {
    }
    class GOdeslaniEDeskDlg extends GContentBase {
        private readonly EDeskFormDto?;
        /**
         *
         */
        private readonly MailStruct?;
        /**
         * Hodnoty které byly nastaveny před postoupením původní datové zprávy,
         * aby je bylo možné vrátit zpět po případném zrušení postoupení.
         *
         * @type {GOdeslaniEdeskFormDto}
         */
        private HodnotyPredPostoupenim?;
        /**
         * Hodnoty které byly nastaveny před zrušením postoupení původní datové zprávy,
         * aby je bylo možné vrátit zpět po případném nastavení postoupení.
         *
         * @type {GOdeslaniEdeskFormDto}
         */
        private HodnotyPredZrusenimPostoupeni?;
        private readonly SeznamPrilohPisemnosti?;
        private readonly IxsUloPre?;
        private readonly IsPriprava?;
        /**
         *
         */
        private readonly Config?;
        /**
         *
         */
        private Result;
        /**
         *
         */
        private ShowClosingAlert;
        /**
         *
         */
        private $Form?;
        /**
         *
         */
        private $Grid?;
        private InvokeSelection;
        /**
         *
         */
        private MailSettings?;
        private Logger;
        private PovoleniFormulareObject;
        private PocitadloVolaniObalkoveAdresy;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    05.03.2019
         */
        onContentReady(): void;
        /**
         * Vytvoří definici formuláře.
         *
         * @author  TFeik
         * @date    14.03.2023
         *
         * @returns {Forms.Form}
         */
        private createForm;
        /**
         * Spočítá velikost vybraných souborů k odeslání emailu.
         *
         * @author  TFeik
         * @date    05.03.2019
         *
         * @returns {number} Velikost vybraných souborů v Bytech.
         */
        private getVelikost;
        /**
         * Přepočítá velikost vybraných souborů a uloží ji do formuláře.
         *
         * @author  TFeik
         * @date    05.03.2019
         */
        private prepocitejVelikostSouboru;
        private refreshGrid;
        private getSeznamVybranychPriloh;
        private _getSeznamPriloh;
        private updateSeznamPriloh;
        private getEDeskFormDto;
        /**
         * Ukončení přípravy odeslání datové zprávy.
         *
         * @author  TFeik
         * @date    05.03.2019
         *
         * @param {boolean} opakovat Příznak, zda se má stejné nastavení požít i pro další zásilky.
         */
        private sendEDeskMessage;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    05.03.2019
         */
        private _createMenu;
        /**
         * Vrátí nastavení emailu.
         *
         * @author  TFeik
         * @date    05.03.2019
         *
         * @returns {IGOdeslaniEmailDlgResult}
         */
        private _getMailSettings;
        /**
         * Vrátí výsledek okna odeslání datové zprávy.
         *
         * @author  TFeik
         * @date    05.03.2019
         *
         * @returns {IGOdeslaniEmailDlgResult}
         */
        private _getResult;
        /**
         * Closing.
         *
         * @author  TFeik
         * @date    05.03.2019
         *
         * @returns {object} Stav přípravy odeslání emailu 'state' a nastavené hodnoty 'value'.
         */
        closing(): JQueryPromise<GOdeslaniEDeskDlgReturnValue>;
        /**
         * Nastaví enable/disable na akcích a políčkách formuláře.
         *
         * @author  TFeik
         * @date    14.03.2023
         */
        setEnable(): void;
        /**
         * Vrátí inicializovaný logger pro logování.
         *
         * @author  TFeik
         * @date    14.03.2023
         *
         * @returns {Diagnostics.GLog}
         */
        private GetLogger;
        private zkontrolujPovoleneFormulareKOdeslani;
        private nastavIxsFSKPodlePovoleni;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GOdeslaniEditaceMailuDlg extends GContentBase {
        private $Form;
        private MDProcessor;
        private gmdField;
        private gmdFieldVysledek;
        private Ixp;
        private TypMailu?;
        private TextMailu?;
        private retValFromDialog;
        /**
         * OnContentReady.
         *
         * @author  tfeik
         * @date    07.04.2017
         */
        onContentReady(): void;
        private createVyberSablony;
        gmdFieldCreate(): void;
        private getMdProcessor;
        private nastavIniciacniHodnoty;
        private getEditovanyText;
        private getEditovanyTextSimple;
        private _createMenu;
        private _createAcions;
        private saveAndClose;
        private closing;
        private setniGmField;
        private setniVyberSablony;
        private getVyberSablony;
        private zavolejPredplneniMailu;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniEmailDlgInputParams extends GOdeslaniPredpisBaseInputParams {
        Nedokladovane?: boolean;
    }
    interface GOdeslaniEmailDlgReturnValue extends GOdeslaniPredpisBaseDlgReturnValue {
        email?: GWflMailStructDto;
    }
    class GOdeslaniEmailDlg extends GContentBase {
        /**
         *
         */
        private readonly Hromadne;
        /**
         *
         */
        private readonly Nedokladovane;
        /**
         *
         */
        private readonly MailForm;
        /**
         *
         */
        private readonly MailStruct;
        private readonly SeznamPrilohPisemnosti;
        private readonly IxsUloPre?;
        private readonly IsPriprava?;
        private readonly Config;
        /**
         *
         */
        private Result;
        /**
         *
         */
        private ShowClosingAlert;
        /**
         *
         */
        private $Form?;
        /**
         *
         */
        private $Grid?;
        private InvokeSelection;
        private SeznamPrilohDataView?;
        /**
         *
         */
        private MailSettings?;
        /**
         * Signer
         * @type {GByteSigner}
         */
        private Signer?;
        /**
         * CustomEmail
         * @type {CustomEmail}
         */
        private CustomEmail?;
        /**
         * Processor pro převod markdownu na html.
         * Pro čtení hodnoty používat metodu GetMDProcessor().
         * @type {any}
         */
        private MDProcessor?;
        /**
         * OnContentReady.
         *
         * @author  tfeik
         * @date    19.09.2017
         */
        onContentReady(): void;
        /**
         * Přepočítá velikost vybraných souborů a uloží ji do formuláře.
         *
         * @author  tfeik
         * @date    09.10.2017
         */
        private _prepocitejVelikostSouboru;
        private _refreshGrid;
        private _createSeznamPrilohDataView;
        private _setIntoSeznamPrilohDataView;
        private _getSeznamVybranychPriloh;
        private _getSeznamPriloh;
        private updateSeznamPriloh;
        private _getMailForm;
        /**
         * onOkClick
         *
         * @author  TFeik
         * @date    26.07.2021
         *
         * @param {{ mailForm: GOdeslaniEmailFormDto, seznamPrilohPisemnosti: GOdeslaniPrilohaPisemnostiDto[], inputParams?: GSrvMethodCallInputDto} input
         * @returns {JQuery.Promise<GSrvMethodCallResultDto>}
         */
        private onOkClick;
        /**
         * Příznak zda e má email odesílat přes emapi.
         *
         * @author  TFeik
         * @date    26.07.2021
         *
         * @returns {boolean}
         */
        private useEmapi;
        /**
         * Ukončení přípravy odeslání emailu.
         *
         * @author  tfeik
         * @date    09.10.2017
         *
         * @param {boolean} opakovat Příznak, zda se má stejné nastavení požít i pro další zásilky.
         */
        private _ok;
        /**
         * ZmenitTextEmailu
         *
         * @author  TFeik
         * @date    14.09.2021
         *
         * @returns {JQuery.Promise<void>}
         */
        private ZmenitTextEmailu;
        /**
         * Načte text emailu včetně html.
         *
         * @author  TFeik
         * @date    15.09.2021
         *
         * @returns {JQuery.Promise<string>}
         */
        private ReadTextEmailu;
        /**
         * Nastaví vlastní tělo emailu.
         *
         * @author  TFeik
         * @date    15.08.2022
         */
        private SetCustomEmailBody;
        /**
         * Převede markdown na HTML.
         *
         * @author  TFeik
         * @date    15.09.2021
         *
         * @param {string} markdown
         * @returns {JQuery.Promise<string>}
         */
        private CreateHtml;
        /**
         * Getter na MDProcessor.
         *
         * @author  TFeik
         * @date    15.09.2021
         *
         * @returns {JQuery.Promise<any>}
         */
        private GetMDProcessor;
        /**
         * Vytvoří menu.
         *
         * @author  tfeik
         * @date    18.09.2017
         */
        private _createMenu;
        /**
         * Vrátí nastavení emailu.
         *
         * @author  tfeik
         * @date    15.05.2018
         *
         * @returns {IGOdeslaniEmailDlgResult}
         */
        private _getMailSettings;
        /**
         * Vrátí výsledek okna odeslání emailu.
         *
         * @author  tfeik
         * @date    15.05.2018
         *
         * @returns {IGOdeslaniEmailDlgResult}
         */
        private _getResult;
        /**
         * Closing.
         *
         * @author  tfeik
         * @date    09.10.2017
         *
         * @returns {object} Stav přípravy odeslání emailu "state" a nastavené hodnoty "value".
         */
        closing(): JQueryPromise<GOdeslaniEmailDlgReturnValue | undefined>;
        /**
         * GetSigner
         *
         * @author  TFeik
         * @date    21.01.2020
         *
         * @returns {GByteSigner}
         */
        private GetSigner;
        /**
         * Upraví text "políčka", ve kterém je text emailu.
         *
         * @author  TFeik
         * @date    15.09.2021
         *
         * @param {string} html
         */
        private UpdateEmailPreview;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniEmailNastaveniDlgInputParams {
        Ixp: string;
        EmailOdesialtele: string;
        Predpis?: Interface.GWflMailSettingsDto;
    }
    interface GOdeslaniEmailNastaveniDlgReturnValue {
    }
    /**
     * GOdeslaniEmailNastaveniDlg.
     *
     * @author  TFeik
     * @date    19.07.2021
     */
    class GOdeslaniEmailNastaveniDlg extends GContentBase {
        private readonly Ixp?;
        private readonly EmailOdesialtele?;
        private readonly Predpis?;
        private readonly NastaveniEmailu?;
        /**
         *
         */
        private $Form?;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    19.07.2021
         */
        onContentReady(): void;
        /**
         * createForm
         *
         * @author  TFeik
         * @date    19.07.2021
         *
         * @returns {Gordic.Forms.Form}
         */
        static createForm(): Gordic.Forms.Form;
        /**
         * setEnable
         *
         * @author  TFeik
         * @date    26.07.2021
         */
        private setEnable;
        /**
         * Closing.
         *
         * @author  TFeik
         * @date    19.07.2021
         *
         * @returns {object} Nové hodnoty adresních řádků.
         */
        closing(): JQuery.Promise<GOdeslaniEmailNastaveniDlgReturnValue>;
        /**
         * Zkontroluje, zda jsou vstupní parametry dialogu validní a půjde otevřít.
         *
         * @author  TFeik
         * @date    19.07.2021
         *
         * @param {GOdeslaniEmailNastaveniDlgInputParams} [inputParams]
         * @returns {boolean | Gui.Dialogs.OpenDialogRejectType}
         */
        static isValid(inputParams: GOdeslaniEmailNastaveniDlgInputParams | null | undefined): boolean | Gui.Dialogs.OpenDialogRejectType;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    20.07.2021
         */
        private createMenu;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniEmailNedokladoveDlgInputParams {
        Ixp: string;
    }
    class GOdeslaniEmailNedokladoveDlg extends GContentBase {
        /**
         *
         */
        private readonly Ixp;
        /**
         *
         */
        private readonly Email;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    25.05.2018
         */
        onContentReady(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IGOdeslaniBaseReturnObejct<TData = any> {
        data?: TData;
        success?: string;
        error?: string;
        warning?: string;
        isSaved?: boolean;
    }
    /**
     * Návratová hodnota metody pro ověření v ISDS (GOdeslaniHandler.overISDS)
     *
     * @author  TFeik
     * @date    19.02.2020
     * @since   484.1.0.80
     */
    interface OverISDSReturnValue {
        rows?: GOdeslaniSeznamDto[];
        unsavedChanges?: boolean;
    }
    interface OdeslaniCreateGridColumnsParams {
        hasIxbs?: boolean | null;
        hromadne: boolean | null | undefined;
        ginSslDatSchrPar: number | null | undefined;
        ginGexPovolenPar: number | null | undefined;
        isSendByEDeskAllowed: boolean | null | undefined;
        isEditable?: boolean;
        ginIszrPovole: number | null | undefined;
        ginIszrRozin: number | null | undefined;
        doplnkoveSluzbyData: Data.Readers.WflcposDto[];
        sslPouulolisd: number | null | undefined;
        gin_odeshkp_dat: number | null | undefined;
    }
    class GOdeslaniHandler {
        private static Logger;
        /**
         * GetServer
         *
         * @author  TFeik
         * @date    31.08.2018
         *
         * @param {GContent} parentContent
         * @returns {GContent}
         */
        private static GetServer;
        /**
         * Vrátí inicializovaní logger pro logování.
         *
         * @author TFeik
         * @date    08.01.2020
         *
         * @returns {Diagnostics.GLog}
         */
        private static GetLogger;
        /**
         * Překopíruje message z objectu from do into a vrátí into (původní into je změněn).
         *
         * @author  TFeik
         * @date    18.04.2018
         *
         * @param {GIOdeslaniBaseReturnObejct<TDataInto>} into
         * @param {GIOdeslaniBaseReturnObejct<TDataFrom>} from
         * @returns {GIOdeslaniBaseReturnObejct<TDataInto>}
         */
        static copyBaseReturnMessages<TDataInto = any, TDataFrom = any>(into: IGOdeslaniBaseReturnObejct<TDataInto>, from: IGOdeslaniBaseReturnObejct<TDataFrom>): IGOdeslaniBaseReturnObejct<TDataInto>;
        /**
         *
         * @param {GIOdeslaniBaseReturnObejct<TData>} returnObject
         * @param {{
                parentContent} flashPanel?
         * @param {string} id?
         * @param {number
            }} flashMessageTimer?
         */
        static showBaseReturnMessages<TData = any>(returnObject: IGOdeslaniBaseReturnObejct<TData>, flashPanel: {
            parentContent: GContent;
            id: string;
        }): void;
        /**
         * Převede doplňkové (poštovní) služby ze stringu na pole.
         *
         * @author  TFeik
         * @date    05.03.2018
         *
         * @param {string} doplnkoveSluzby Doplňkové služby oddělené čárkou (např.: "1,15,32").
         * @returns {GDoplnkoveSluzbyDto[]} Pole doplňkových služeb s vyplněnou hodnotou post_sluzba.
         */
        static doplnkoveSluzbyStringToArray(doplnkoveSluzby: string | null | undefined): GDoplnkoveSluzbyDto[];
        /**
         * Převede doplňkové (poštovní) služby ze stringu na pole indexů.
         *
         * @author  TFeik
         * @date    02.05.2018
         *
         * @param {string} doplnkoveSluzby Doplňkové služby oddělené čárkou (např.: "1,15,32").
         * @returns {GDoplnkoveSluzbyDto[]} Pole indexů doplňkových služeb.
         */
        static doplnkoveSluzbyStringToIndexArray(doplnkoveSluzby: string | null | undefined): number[];
        /**
         * Převede doplňkové (poštovní) služby z pole na string.
         * @author  TFeik
         * @date    05.03.2018
         *
         * @param {GDoplnkoveSluzbyDto[]} doplnkoveSluzby Pole doplňkových služeb s vyplněnou hodnotou post_sluzba.
         * @returns {string} Doplňkové služby oddělené čárkou (např.: "1,15,32").
         */
        static doplnkoveSluzbyArrayToString(doplnkoveSluzby: (GDoplnkoveSluzbyDto | null | undefined)[] | null | undefined): string;
        /**
         *
         * Převede doplňkové (poštovní) služby z pole objektů na pole indexů.
         *
         * @author  TFeik
         * @date    02.05.2018
         *
         * @param {GDoplnkoveSluzbyDto[]} doplnkoveSluzby? Doplňkové služby.
         * @returns {number[]} Pole indexů doplňkových služeb.
         */
        static doplnkoveSluzbyArrayToIndexArray(doplnkoveSluzby: (GDoplnkoveSluzbyDto | null | undefined)[] | null | undefined): number[];
        /**
         *
         * Převede doplňkové (poštovní) služby ze pole indexů na pole objektů.
         *
         * @author  TFeik
         * @date    21.05.2018
         *
         * @param {GDoplnkoveSluzbyDto[]} doplnkoveSluzby? Doplňkové služby.
         * @returns {number[]} Pole indexů doplňkových služeb.
         */
        static doplnkoveSluzbyIndexArrayToArray(doplnkoveSluzby: (number | null | undefined)[] | null | undefined): GDoplnkoveSluzbyDto[];
        /**
         * Upraví zásilky dle zadaného nastavení.
         *
         * @author  TFeik
         * @date    05.03.2018
         *
         * @param {GOdeslaniSeznamFormDto} settings Nastavení zásilek.
         * @param {GOdeslaniSeznamDto[]} rows Zásilky, na které se aplikuje zadané nastavení.
         *
         * @returns {JQueryPromise<{ rows?: GOdeslaniSeznamDto[], error?: string } | undefined >} Promise aktualizovaných zásilek, nebo chybové hlášky.
         */
        static applyFormSettingToRows(parentContent: GContent, settings: GOdeslaniSeznamFormDto, rows: GOdeslaniSeznamDto[]): JQueryPromise</*{ rows?: GOdeslaniSeznamDto[], error?: string }*/ IGOdeslaniBaseReturnObejct<GOdeslaniSeznamDto[]>>;
        /**
         * Vrátí příznak, zda je možné zásilku editovat.
         *
         * @author  TFeik
         * @date    02.05.2018
         *
         * @returns {boolean} Příznak, zda je možné zásilku editovat.
         */
        static canBeZasilkaModified(item: GOdeslaniSeznamDto | undefined | null): boolean;
        /**
         * Převede klíče doplňkových služeb na uživatelsku čitelný text. Texty se dotahávají z dat readeru, proto jsou potřeba.
         *
         * @author  TFeik
         * @date    11.11.2020
         *
         * @param {Data.Readers.WflcposDto[]} wflcposReaderData Načtená data readeru doplňkových služeb, ze kterých se dohledává text.
         * @param {number[] | null} [doplnkoveSluzby] Klíče doplňkových služeb
         * @returns {string}
         */
        static doplnkoveSluzbyToString(wflcposReaderData: Data.Readers.WflcposDto[], doplnkoveSluzby?: number[] | null): string;
        private static _wflcposReaderData?;
        /**
         * Načte a vrátí data readru doplňkových služeb.
         *
         * @author  TFeik
         * @date    11.11.2020
         *
         * @returns {JQuery.Promise<Data.Readers.WflcposDto[]>}
         */
        static getWflcposReaderData(): JQuery.Promise<Data.Readers.WflcposDto[]>;
        /**
         *
         * @author  tfeik
         * @date    27.12.2017
         *
         * @param params
         * @returns
         */
        static createGridColumns(parentContent: GContent, params: OdeslaniCreateGridColumnsParams, setOriginal: GAction | undefined | null, getActiveRow: () => GOdeslaniSeznamDto | undefined | null, updateRows: (items: GOdeslaniSeznamDto[]) => void): Data.GridFormat<GOdeslaniSeznamDto>;
        /**
         *
         * @author  tfeik
         * @date    27.12.2017
         *
         * @param {HTMLDivElement} parentDiv
         * @param {HTMLDivElement} parentDiv
         * @param {?dataView} gridView
         * @param {?Object} gridColumnParams
         */
        static createGrid(parentContent: GContent, parentDiv: JQuery<HTMLElement>, gridColumnParams: OdeslaniCreateGridColumnsParams, druhZasilkyValues: Gordic.Ginis.DbModel.GWflcdrzDto[], gridView: Gordic.Data.View | undefined | null, gridOptions: GGridOptions<GOdeslaniSeznamDto> | undefined | null, setOriginal: GAction | undefined | null, updateRows: (items: GOdeslaniSeznamDto[]) => void): JQuery<HTMLElement>;
        static AdjustRowBeforeSaveOrSend(row: GOdeslaniSeznamDto, druhZasilkyValues: Gordic.Ginis.DbModel.GWflcdrzDto[]): GOdeslaniSeznamDto;
        static AdjustRowsBeforeSaveOrSend(rows: GOdeslaniSeznamDto[], druhZasilkyValues: Gordic.Ginis.DbModel.GWflcdrzDto[]): GOdeslaniSeznamDto[];
        /**
         * Upraví ikonky tlačítek pro doplňkové služby a jejich šablon tak, aby byly stejné ve formuláři i v gridu.
         *
         * @author  tfeik
         * @date    03.04.2018
         *
         * @param {JQuery<HTMLElement>} field Políčko doplňkových služeb.
         * @param {object} index Indexy jednotlivých ikonek na políčku.
         */
        static AdjustDoplnkovesluzbyIcons(field: JQuery<HTMLElement>, index: {
            doplnkoveSluzby: number;
            sablony: number;
        }): void;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         *
         * @author  tfeik
         * @date    09.10.2017
         *
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        static prevedVelikostSouboruNaString(number?: number): string;
        /**
         * Porovná, zda se jedná o identické zásilky.
         *
         * @author  tfeik
         * @date    03.01.2018
         *
         * @param {GOdeslaniSeznamDto} value
         * @param {GOdeslaniSeznamDto} compareTo
         * @returns
         */
        static isZasilkaIdentical(value: GOdeslaniSeznamDto, compareTo: GOdeslaniSeznamDto): boolean;
        /**
         * Aktualizuje zásilku v seznamu.
         *
         * @author  tfeik
         * @date    03.01.2018
         *
         * @param {!GOdeslaniSeznamDto} newDataRow Zásilka k aktualizaci.
         * @param {!GOdeslaniSeznamDto[]} rows Seznam zásilek.
         * @returns {GOdeslaniSeznamDto[]} Aktualizovaný seznam zásilek.
         */
        static updateOdeslaniZasilka(newDataRow: GOdeslaniSeznamDto, rows: GOdeslaniSeznamDto[], options?: {
            /** (default = false) Aktualizuje pouze dat_zmena. */
            datZmenaOnly?: boolean;
        }): GOdeslaniSeznamDto[];
        /**
         * Otevře kartotéku externích subjektů.
         *
         * @author  tfeik
         * @date    18.04.2018
         *
         * @param {GContent} parentContent
         * @param {string} ixp
         * @param {string} aktZnacka
         */
        static otevriKartoteku(parentContent: GContent, ixp: string, aktZnacka: string): JQueryPromise<{
            subjekty: Gordic.Esu.WebClient.GKartotekaDto[];
        } | undefined>;
        /**
         * Otevře skupiny externích subjektů.
         *
         * @author  tfeik
         * @date    19.12.2017
         *
         * @param {GContent} parentContent
         * @param {string} ixp
         * @param {string} aktZnacka
         */
        static otevriSkupiny(parentContent: GContent, ixp: string, aktZnacka: string): JQueryPromise<{
            subjekty: Gordic.Esu.WebClient.GKartotekaDto[];
        } | undefined>;
        /**
         *
         *
         * @author  tfeik
         * @date    30.08.2017
         *
         * @param {gcontent} parentContent
         * @param {ixp} string
         * @param {object|object[]} selectedRows Řádek, u kterého chceme změnit adresu (nebo jejich pole).
         * @returns {Promise<otevriZasilokovaAdresaReturn>} aaa
         */
        static otevriZasilokovaAdresa(parentContent: GContent, ixp: string, selectedRows: GOdeslaniSeznamDto | GOdeslaniSeznamDto[]): JQueryPromise<IGOdeslaniBaseReturnObejct<Interface.GOdeslaniAdresniRadkyDto> | undefined>;
        /**
         * Otevře historii zásilky.
         *
         * @author  tfeik
         * @date    27.12.2017
         */
        static otevriHistorii(parentContent: GContent, selectedRows?: GOdeslaniSeznamDto | GOdeslaniSeznamDto[]): JQueryPromise<IGOdeslaniBaseReturnObejct<undefined>>;
        /**
         *
         * Otevře obrazovku s tiskem adres.
         *
         * @author  tfeik
         * @date    28.12.2017
         *
         * @param parentContent ParentContent.
         * @param ixp Ixp.
         * @param {string[]} selectedSxs Sxs vybraných zásilek.
         * @returns {JQueryPromise<IGOdeslaniBaseReturnObejct<undefined>>}
         */
        static otevriTiskAdresy(parentContent: GContent, ixp: string, selectedSxs: string[]): JQueryPromise<IGOdeslaniBaseReturnObejct<undefined>>;
        /**
         *
         * Ověří GEX / DS externího subjektu.
         *
         * @author tfeik
         * @date 18.08.2017
         *
         * @param {GContent} parentContent Parent content.
         * @param {GOdeslaniSeznamDto[]} rows Zásilky pro ověření.
         * @param {object} params
         *
         * @returns {promise} Promise dokončení ověření.
         */
        static overISDS(parentContent: GContent, rows: GOdeslaniSeznamDto[], params?: {
            vsechny?: boolean;
            overPoDotazu?: boolean;
            nastaveniZasilky?: GZasilkySettingsDto;
            overitPouzeExistenciSchranky?: boolean;
        }): JQueryPromise<IGOdeslaniBaseReturnObejct<OverISDSReturnValue>>;
        /**
         * Odešle zásilky.
         *
         * @author tfeik
         * @date 08.09.2017
         */
        static odeslat(parentContent: GContent, 
        /**
         * Seznam všech zásilek odeslání.
         * @type {GOdeslaniSeznamDto[]}
         */
        seznamZasilek: GOdeslaniSeznamDto[], options: {
            hromadne?: boolean;
            hromadneDotcSubj?: boolean;
            generovatSeznamOdeslanych?: boolean;
            /**
             * (Default: false) Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani?: boolean | null;
        }): JQueryPromise<IGOdeslaniBaseReturnObejct</*{ zasilky?: */ GOdeslaniSeznamDto[]>>;
        /**
         * Otevře okno detailu zásilky
         *
         * @author  TFeik
         * @date    04.04.2018
         */
        static otevriDetailZasilky(parentContent: GContent, selectedRow: GOdeslaniSeznamDto, grid?: JQuery<HTMLElement>): JQueryPromise<IGOdeslaniBaseReturnObejct<GDetailZasilkyDlgReturnValue>>;
        /**
         * Otevře adresy / pobočky subjektu na zásilce a v případě změny vrátí zásilnu s aktualizovanou adresou.
         *
         * @author  tfeik
         * @date    06.12.2017
         *
         * @param {!gcontent} parentContent Nadřazený content
         * @param selectedRows
         * @param ixp
         * @param aktZnacka
         * @returns {JQueryPromise<GIOdeslaniBaseReturnObejct<GOdeslaniSeznamDto>>}
         */
        static otevriAdresyPobocky(parentContent: GContent, selectedRows: GOdeslaniSeznamDto | GOdeslaniSeznamDto[], ixp: string, aktZnacka: string | null | undefined): JQueryPromise<IGOdeslaniBaseReturnObejct<GOdeslaniSeznamDto>>;
        /**
         *
         * @param {TDto | TDto[]} selectedRows
         * @returns
         */
        static getFirstItemOfArray<TDto = any>(selectedRows?: TDto | TDto[]): IGOdeslaniBaseReturnObejct<TDto>;
        static zahajitOdeslaniZasilek(parametryOdeslaniZasilek: GOdeslaniParametryOdeslaniDto, parentContent: GContent, hromadne?: boolean | null, sdruzitZasilky?: boolean | null): JQueryPromise<IGOdeslaniBaseReturnObejct<GOdeslaniParametryOdeslaniDto>>;
        static odeslatNormalmniZasilky(parentContent: GContent, listZasilek: GOdeslaniSeznamDto[], sdruzitZasilky?: boolean | null): JQuery.Promise<IGOdeslaniBaseReturnObejct<GOdeslaniSeznamDto[]>>;
        static odeslatEmaily(listEmailu: GWflMailStructDto[], parentContent?: GContent, hromadne?: boolean | null): JQuery.Promise<IGOdeslaniBaseReturnObejct<GWflMailStructDto[]>>;
        /**
         * Zpracování emailu.
         *
         * @param {GWflMailStructDto} item Položka k odeslání.
         */
        static zpracujEmail(email: GWflMailStructDto, pocetZbyvajicich: number, options: {
            parentContent: GContent;
            mailSettingsForRepeating?: Interface.GWflMailSettingsDto;
            hromadne?: boolean;
        }): JQuery.Promise<IGOdeslaniBaseReturnObejct<{
            email: GWflMailStructDto;
            mailSettingsForRepeating?: Interface.GWflMailSettingsDto;
            hromadne?: boolean;
        }>>;
        /**
            *
            * @param {GWflMailSettingsDto} mailSettings GWflMailSettings.
            */
        static odesliEmail(parentContent: GContent, email: GWflMailStructDto, mailSettings?: Interface.GWflMailSettingsDto): JQueryPromise<IGOdeslaniBaseReturnObejct<{
            email: GWflMailStructDto;
            mailSettingsForRepeating?: Interface.GWflMailSettingsDto;
        }>>;
        static odeslatDatoveZpravy(parentContent: GContent, listDs: GWflMailStructDto[], hromadne?: boolean | null): JQuery.Promise<IGOdeslaniBaseReturnObejct<GWflMailStructDto[]>>;
        /**
            *
            * @param {GWflMailSettingsDto} mailSettings GWflMailSettings.
            */
        static odesliDs(parentContent: GContent, ds: GWflMailStructDto, dsSettings?: Interface.GWflMailSettingsDto, generovatSeznamOdeslanych?: boolean): JQueryPromise<IGOdeslaniBaseReturnObejct<{
            ds: GWflMailStructDto;
            dsSettingsForRepeating?: Interface.GWflMailSettingsDto;
        }>>;
        /**
         * Zpracování emailu.
         *
         * @param {GWflMailStructDto} item Položka k odeslání.
         */
        static zpracujDs(parentContent: GContent, ds: GWflMailStructDto, pocetZbyvajicich: number, options: {
            parentContent: GContent;
            dsSettingsForRepeating?: Interface.GWflMailSettingsDto;
            hromadne?: boolean;
        }): JQuery.Promise<IGOdeslaniBaseReturnObejct<{
            ds: GWflMailStructDto;
            dsSettingsForRepeating?: Interface.GWflMailSettingsDto;
            hromadne?: boolean;
        }>>;
        /**
         * IsZpDorElektronicky
         *
         * @author TFeik
         * @date    30.08.2018
         *
         * @param {number} zpusobDoruceni
         * @returns {JQueryPromise<boolean>}
         */
        static IsZpDorElektronicky(parentContent: GContent, zpusobDoruceni: number): JQueryPromise<boolean>;
        /**
         * Zkontroluje zásilky zda odpovídají požadavkům pro EPK.
         * - Existuje adresát s ISDS.
         * - Je vložen obraz ve formátu PDF.
         * - Obraz má velikost odpovídající parametru na velikost odesíláné DZ.
         * - Způsob odeslání je nastaven DS_evypravna.
         * - Je vygenerována identifikace zásilky.
         *
         * @author  TFeik
         * @date    21.06.2022
         *
         * @param {GContent} parentContent Nadřazený content.
         * @param {GZkontrolovatZasilkuProEPKInputDto} input Vstupní Dto pro kontrolu zásilek pro EPK.
         * @returns {JQueryPromise<GZkontrolovatZasilkuProEPKOutputDto>} Návratové Dto pro kontrolu zásilek pro EPK.
         */
        static ZkontrolovatZasilkuProEPK(parentContent: GContent, input: GZkontrolovatZasilkuProEPKInputDto): JQueryPromise<GZkontrolovatZasilkuProEPKOutputDto>;
        /**
         * GetAdresniRadkySubjektu
         *
         * @author TFeik
         * @date    30.08.2018
         *
         * @param {string} ixsEsu
         * @param {string} [licZast]
         * @param {number} [porZast]
         * @returns {JQueryPromise<Interface.GOdeslaniAdresniRadkyDto>}
         */
        static GetAdresniRadkySubjektu(parentContent: GContent, ixsEsu: string, licZast?: string, porZast?: number): JQueryPromise<Interface.GOdeslaniAdresniRadkyDto>;
        /**
         * Uloží zásilkovou řádky zásilkové adresy do clipboardu.
         *
         * @author  TFeik
         * @date    10.09.2018
         *
         * @param {Interface.GOdeslaniAdresniRadkyDto} dto
         * @param {GContent} [parentContent]
         * @returns {JQueryPromise<undefined>}
         */
        static CopyEsuAdressToClipboard(dto: Interface.GOdeslaniAdresniRadkyDto, parentContent?: GContent): JQueryPromise<undefined>;
        /**
         * Převede strukturu zásilkové adresy do stringu.
         *
         * @author  TFeik
         * @date    16.10.2019
         *
         * @param {Interface.GOdeslaniAdresniRadkyDto} dto
         * @returns {string}
         */
        static EsuAdressToString(dto?: Interface.GOdeslaniAdresniRadkyDto): string;
        /**
         *
         * @author  TFeik
         * @date    05.03.2019
         *
         * @param params
         * @returns
         */
        static createGridColumnsElektronickePrilohyKOdeslani(params?: {
            ginOdesVerze?: boolean;
            addPodpisACaroveRazitko?: boolean;
            useTypTiskuAKonverze: boolean | null | undefined;
            /**
             * (Default: false) Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean | null | undefined;
        }): Data.GridFormat<GOdeslaniPrilohaPisemnostiDto>;
        /**
         *
         * @author  tfeik
         * @date    27.12.2017
         *
         * @param {HTMLDivElement} parentDiv
         * @param {HTMLDivElement} parentDiv
         * @param {?dataView} gridView
         * @param {?Object} gridColumnParams
         */
        static createGridElektronickePrilohyKOdeslani(params: {
            appendTo: JQuery<HTMLElement>;
            data?: GOdeslaniPrilohaPisemnostiDto[];
            gridOptions?: GGridOptions<GOdeslaniPrilohaPisemnostiDto>;
            ginOdesVerze?: boolean;
            addPodpisACaroveRazitko?: boolean;
            onChange?: () => void;
            rowsEnabled?: (row: MetaRow<GOdeslaniPrilohaPisemnostiDto>) => boolean;
            useTypTiskuAKonverze: boolean | null | undefined;
            /**
             * (Default: false) Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean | null | undefined;
        }): JQuery<HTMLElement>;
        /**
         * GetZasilka
         *
         * @author TFeik
         * @date    08.04.2019
         *
         * @param {string} sxs
         * @param {number} [vlastniIdZasilky]
         * @returns {JQueryPromise<GOdeslaniSeznamDto>}
         */
        static GetZasilka(parentContent: GContent, sxs: string, vlastniIdZasilky?: number): JQueryPromise<GOdeslaniSeznamDto>;
        /**
         * UlozEmailOdeslanyPresEmapi
         *
         * @author  TFeik
         * @date    14.01.2020
         *
         * @param {{ emailStruct: WebClient.GWflMailStructDto, mailSettingsDto: WebClient.GWflMailSettingsDto} input
         * @returns {JQueryPromise<GOdeslaniSeznamDto>}
         */
        static UlozEmailOdeslanyPresEmapi(parentContent: GContent, input: {
            emailStruct: WebClient.GWflMailStructDto;
            mailSettingsDto: Interface.GWflMailSettingsDto;
            hromadne?: boolean;
            vysledekOdeslani: number;
        }): JQueryPromise<GOdeslaniSeznamDto>;
        /**
         * OdesliEmailNedokladove.
         *
         * @author  TFeik
         * @date    14.01.2020
         * @since   484.1.0.3
         */
        static OdesliEmailNedokladove(parentContent: GContent, input: {
            email: WebClient.GWflMailStructDto;
            mailSettings: Interface.GWflMailSettingsDto;
            /**
             * Příznak, pro odeslání emailu [true]. V případě, že byl email již odeslán jinou cestou (například emapi), pak zakážeme duplicitníodeslání [false].
             * @type {boolean}
             */
            sendEmail?: boolean;
        }): JQueryPromise<undefined>;
        /**
         * Načte konfiguraci odeslání.
         *
         * @author  TFeik
         * @date    20.01.2020
         *
         * @returns {JQuery.Promise<GOdeslaniConfigDto>}
         */
        static GetConfig(parentContent: GContent): JQuery.Promise<GOdeslaniConfigDto>;
        /**
         * Upraví zásilku dle nastavení.
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ dto: GOdeslaniSeznamDto} input
         * @returns {JQuery.Promise<GOdeslaniSeznamDto>}
         */
        static ApplyFormParams(parentContent: GContent, input: {
            dto: GOdeslaniSeznamDto;
            overrideOnlyIfNull: boolean;
            nastaveniZasilky?: GZasilkySettingsDto;
        }): JQuery.Promise<GOdeslaniSeznamDto>;
        /**
         * DokoncitOdeslani
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ inputData: GOdeslaniParametryOdeslaniDto} input
         * @returns {JQuery.Promise<void>}
         */
        static DokoncitOdeslani(parentContent: GContent, input: {
            inputData: GOdeslaniParametryOdeslaniDto;
            seznamZasilek: GOdeslaniSeznamDto[];
        }): JQuery.Promise<void>;
        /**
         * Odešle email.
         *
         * @author  TFeik
         * @date    27.01.2020
         *
         * @param {{ emailStruct: GWflMailStructDto} input
         * @returns {JQuery.Promise<GOdeslaniSeznamDto>}
         */
        static OdesliEmail(parentContent: GContent, input: {
            emailStruct: GWflMailStructDto;
            /**
             * Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean;
            mailSettingsDto?: Interface.GWflMailSettingsDto;
            /**
             * (Default: true) Příznak, zda se má zásilka po odeslání uložit (metoda GOdeslani.OdeslatZasilku).
             * @type {boolean}
             */
            save?: boolean;
        }): JQuery.Promise<GOdeslaniSeznamDto>;
        /**
         * OdesliDs
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ dsStruct: GWflMailStructDto, dsSettingsDto?: GWflMailSettingsDto, hromadne?: boolean} input
         * @returns {JQuery.Promise<GOdeslaniSeznamDto>}
         */
        static OdesliDs(parentContent: GContent, input: {
            dsStruct: GWflMailStructDto;
            /**
             * Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean;
            dsSettingsDto?: Interface.GWflMailSettingsDto;
            hromadne?: boolean;
            generovatSeznamOdeslanych?: boolean;
            /**
             * (Default: true) Příznak, zda se má zásilka po odeslání uložit (metoda GOdeslani.OdeslatZasilku).
             * @type {boolean}
             */
            save?: boolean;
        }): JQuery.Promise<GOdeslaniSeznamDto>;
        /**
         * OdesliEDesk
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ eDeskStruct: GWflMailStructDto, eDeskSettingsDto?: GWflMailSettingsDto, hromadne?: boolean} input
         * @returns {JQuery.Promise<GOdeslaniSeznamDto>}
         */
        static OdesliEDesk(parentContent: GContent, input: {
            eDeskStruct: GWflMailStructDto;
            /**
             * Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean;
            eDeskSettingsDto?: Interface.GWflMailSettingsDto;
            hromadne?: boolean;
            generovatSeznamOdeslanych?: boolean;
            /**
             * (Default: true) Příznak, zda se má zásilka po odeslání uložit (metoda GOdeslani.OdeslatZasilku).
             * @type {boolean}
             */
            save?: boolean;
        }): JQuery.Promise<GOdeslaniSeznamDto>;
        /**
         * OdesliInterni
         *
         * @author  TFeik
         * @date    15.12.2020
         *
         * @param {{ interniStruct: GWflMailStructDto, interniSettingsDto?: GWflMailSettingsDto, hromadne?: boolean} input
         * @returns {JQuery.Promise<GOdeslaniSeznamDto>}
         */
        static OdesliInterni(parentContent: GContent, input: {
            interniStruct: GWflMailStructDto;
            /**
             * Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean;
            interniSettingsDto?: Interface.GWflMailSettingsDto;
            hromadne?: boolean;
            generovatSeznamOdeslanych?: boolean;
            /**
             * (Default: true) Příznak, zda se má zásilka po odeslání uložit (metoda GOdeslani.OdeslatZasilku).
             * @type {boolean}
             */
            save?: boolean;
        }): JQuery.Promise<GOdeslaniSeznamDto>;
        /**
         * OdesliGex
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ gexStruct: GWflMailStructDto, gexSettingsDto?: GWflMailSettingsDto} input
         * @returns {JQuery.Promise<GOdeslaniSeznamDto>}
         */
        static OdesliGex(parentContent: GContent, input: {
            gexStruct: GWflMailStructDto;
            /**
             * Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean;
            gexSettingsDto?: Interface.GWflMailSettingsDto;
            hromadne?: boolean;
            /**
             * (Default: true) Příznak, zda se má zásilka po odeslání uložit (metoda GOdeslani.OdeslatZasilku).
             * @type {boolean}
             */
            save?: boolean;
        }): JQuery.Promise<GOdeslaniSeznamDto>;
        /**
         * OdesliHp
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ hpStruct: GWflMailStructDto, mailSettingsDto?: GWflMailSettingsDto} input
         * @returns {JQuery.Promise<GOdeslaniSeznamDto>}
         */
        static OdesliHp(parentContent: GContent, input: {
            hpStruct: GWflMailStructDto;
            /**
             * Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean;
            mailSettingsDto?: Interface.GWflMailSettingsDto;
            hromadne?: boolean;
            /**
             * (Default: true) Příznak, zda se má zásilka po odeslání uložit (metoda GOdeslani.OdeslatZasilku).
             * @type {boolean}
             */
            save?: boolean;
        }): JQuery.Promise<GOdeslaniSeznamDto>;
        /**
         * OdesliHkp
         *
         * @author  TFeik
         * @date    18.03.2021
         *
         * @param {{ mailStruct: GWflMailStructDto, mailSettings?: GWflMailSettingsDto} input
         * @returns {JQuery.Promise<GOdeslaniSeznamDto>}
         */
        static OdesliHkp(parentContent: GContent, input: {
            mailStruct: GWflMailStructDto;
            /**
             * Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean;
            mailSettings?: Interface.GWflMailSettingsDto;
            hromadne?: boolean;
            /**
             * (Default: true) Příznak, zda se má zásilka po odeslání uložit (metoda GOdeslani.OdeslatZasilku).
             * @type {boolean}
             */
            save?: boolean;
        }): JQuery.Promise<GOdeslaniSeznamDto>;
        /**
         * CheckDsOriginalAndDialogNeed
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ dsStruct: GWflMailStructDto, hromadne: boolean} input
         * @returns {JQuery.Promise<}
         */
        static CheckDsOriginalAndDialogNeed(parentContent: GContent, input: {
            dsStruct: GWflMailStructDto;
            hromadne: boolean;
            seznamZasilek: GOdeslaniSeznamDto[];
        }): JQuery.Promise<{
            muzeJakoOriginal: boolean;
            editJakoOriginal: boolean;
            needDialog: boolean;
        }>;
        /**
         * CheckEmailDialogNeed
         *
         * @author  TFeik
         * @date    10.04.2024
         *
         * @param {{ eDeskStruct: GWflMailStructDto, hromadne: boolean} input
         * @returns {JQuery.Promise<}
         */
        static CheckEmailDialogNeed(parentContent: GContent, input: {
            emailStruct: GWflMailStructDto;
            hromadne: boolean;
        }): JQuery.Promise<{
            needDialog: boolean;
        }>;
        /**
         * CheckEDeskOriginalAndDialogNeed
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ eDeskStruct: GWflMailStructDto, hromadne: boolean} input
         * @returns {JQuery.Promise<}
         */
        static CheckEDeskOriginalAndDialogNeed(parentContent: GContent, input: {
            eDeskStruct: GWflMailStructDto;
            hromadne: boolean;
            seznamZasilek: GOdeslaniSeznamDto[];
        }): JQuery.Promise<{
            muzeJakoOriginal: boolean;
            editJakoOriginal: boolean;
            needDialog: boolean;
        }>;
        /**
         * CheckInternalOriginalAndDialogNeed
         *
         * @author  TFeik
         * @date    15.12.2020
         *
         * @param {{ internalStruct: GWflMailStructDto, hromadne: boolean} input
         * @returns {JQuery.Promise<}
         */
        static CheckInternalOriginalAndDialogNeed(parentContent: GContent, input: {
            internalStruct: GWflMailStructDto;
            hromadne: boolean;
            seznamZasilek: GOdeslaniSeznamDto[];
        }): JQuery.Promise<{
            muzeJakoOriginal: boolean;
            editJakoOriginal: boolean;
            needDialog: boolean;
        }>;
        /**
         * CheckGexDialogNeed
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ gexStruct: GWflMailStructDto} input
         * @returns {JQuery.Promise<}
         */
        static CheckGexDialogNeed(parentContent: GContent, input: {
            gexStruct: GWflMailStructDto;
            hromadne: boolean;
        }): JQuery.Promise<{
            needDialog: boolean;
        }>;
        /**
         * Odeslat
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ seznamZasilek: GOdeslaniSeznamDto[]} input
         * @returns {JQuery.Promise<GOdeslaniParametryOdeslaniDto>}
         */
        static Odeslat(parentContent: GContent, input: {
            seznamZasilek: GOdeslaniSeznamDto[];
            inputData: GOdeslaniParametryOdeslaniDto;
            /**
             * Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean;
        }): JQuery.Promise<GOdeslaniParametryOdeslaniDto>;
        /**
         * PripravaOdeslani
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ seznamZasilek: GOdeslaniSeznamDto[]} input
         * @returns {JQuery.Promise<GOdeslaniParametryOdeslaniDto>}
         */
        static PripravaOdeslani(parentContent: GContent, input: {
            seznamZasilek: GOdeslaniSeznamDto[];
            saveOnlyIfValid?: boolean;
            /**
             * Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean;
            hromadneDotcSubj: boolean;
        }): JQuery.Promise<GOdeslaniParametryOdeslaniDto>;
        /**
         * AktualizovatDataAdresata
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ ixp: string seznamZasilek: GOdeslaniSeznamDto[] }} input
         * @returns {JQuery.Promise<GOdeslaniSeznamDto[]>}
         */
        static AktualizovatDataAdresata(parentContent: GContent, input: {
            seznamZasilek: GOdeslaniSeznamDto[];
        }): JQuery.Promise<GOdeslaniSeznamDto[]>;
        /**
         * OverenitPredOdeslanim
         *
         * @author  TFeik
         * @date    19.02.2020
         *
         * @param {{ ixp: string seznamZasilek: GOdeslaniSeznamDto[] }} input
         * @returns {JQuery.Promise<GOdeslaniParametryOdeslaniDto>}
         */
        static OveritPredOdeslanim(parentContent: GContent, input: {
            seznamZasilek: GOdeslaniSeznamDto[];
            /**
             * Příznak že se jedná o přípravu (uložení) zásilek včetně předpisu pro elektronické zásilky.
             * @type {boolean}
             */
            pripravaOdeslani: boolean;
        }): JQuery.Promise<GOdeslaniParametryOdeslaniDto>;
        /**
         * Připraví temp tabulktu pro tisk dorčenek DZ.
         *
         * @author  TFeik
         * @date    25.06.2020
         *
         * @param {{ seznamZasilek: GOdeslaniSeznamDto[] }} input Seznam zásilek pro tisk doručenek.
         * @returns {JQuery.Promise<void>}
         */
        static PripravTiskDorucenekDZ(parentContent: GContent, input: {
            seznamZasilek: GOdeslaniSeznamDto[];
        }): JQuery.Promise<void>;
        /**
         * UlozitInfoOTiskuDorDZZeSession
         *
         * @author  TFeik
         * @date    25.06.2020
         *
         * @returns {JQuery.Promise<void>}
         */
        static UlozitInfoOTiskuDorDZZeSession(parentContent: GContent): JQuery.Promise<void>;
        /**
         * Aktualizuje hodnoty zásilek po případných změnách.
         *
         * @author  TFeik
         * @date    06.01.2023
         *
         * @returns {JQuery.Promise<void>}
         */
        static RefreshRowsAfterChange(parentContent: GContent, input: {
            dtos: GOdeslaniSeznamDto[];
        }): JQuery.Promise<GOdeslaniSeznamDto[]>;
        /**
         * Vytvoří element zobrazující ikonu a text informující o tom, jaký typ zásilky je připravován a komu je posílán.
         *
         * @author  TFeik
         * @date    13.01.2021
         *
         * @param {string} esuTxt
         * @param {Ginis.DbModel.GWflczpdEnum} zpusobDoruceni
         * @returns {JQuery<HTMLElement>}
         */
        static CreateInfopanelPripravyZasilky(esuTxt: string, zpusobDoruceni: Ginis.DbModel.GWflczpdEnum): JQuery<HTMLElement>;
        static SDorOdesToTxt(sDorOdes?: string | null): string;
        static SDorOdesToState(sDorOdes?: string | null): GState;
        /**
         * SmazZasilky
         * @author  TFeik
         * @date    29.09.2022
         *
         * @param {SmazZasilkyInput} input
         * @returns {JQuery.Promise<SmazZasilkyOutput}
         */
        static SmazZasilky(input: SmazZasilkyInput): JQuery.Promise<SmazZasilkyOutput, string>;
        /**
         * Vrátí velikost příloh
         *
         * @author  TFeik
         * @date    14.03.2023
         *
         * @param {GOdeslaniPrilohaPisemnostiDto[] | undefined | null} rows
         * @returns {number}
         */
        static GetVelikostPriloh(rows: GOdeslaniPrilohaPisemnostiDto[] | undefined | null): number;
        /**
         * Převede hodnoty starého přednastavení příloh zásilky na nové.
         *
         * @author  TFeik
         * @date    19.04.2023
         *
         * @param {OznaceniPrilohZasilky | undefined | null} input
         * @returns {PolozkaPrilohZasilky[] | undefined}
         */
        static OznaceniPrilohZasilkyToPolozkaPrilohZasilky(input: OznaceniPrilohZasilky | undefined | null): PolozkaPrilohZasilky[] | undefined | null;
        /**
         * FilterPolozkaPrilohZasilky.
         *
         * @author  TFeik
         * @date    20.04.2023
         * @since   490.1.0.3
         */
        static FilterPolozkaPrilohZasilky(polozky: PolozkaPrilohZasilky[] | undefined | null, 
        /**
         * GIN ODES - Nabídnout k odeslání i poslední verzi před konverzí.
         * Pokud není vyplněno, pak se načte samo přes GWflDBParams.
         * @type {number | undefined | null}
         */
        ginOdesVerze?: number | undefined | null): PolozkaPrilohZasilky[] | undefined | null;
        /**
         * CanUsePolozkaPrilohZasilky.
         *
         * @author  TFeik
         * @date    20.04.2023
         * @since   490.1.0.3
         */
        static CanUsePolozkaPrilohZasilky(item: PolozkaPrilohZasilky, 
        /**
         * GIN ODES - Nabídnout k odeslání i poslední verzi před konverzí.
         * Pokud není vyplněno, pak se načte samo přes GWflDBParams.
         * @type {number | undefined | null}
         */
        ginOdesVerze?: number | undefined | null): boolean;
        /**
         * GIN ODES - Nabídnout k odeslání i poslední verzi před konverzí.
         *
         * @author  TFeik
         * @date    20.04.2023
         * @since   490.1.0.3
         *
         * @returns {number}
         */
        static GetGinOdesVerze(): number;
        /**
         * Vyhodnotí, zda je správný počet odeslaných listů.
         *
         * @author  TFeik
         * @date    11.10.2023
         *
         * @param {number | undefined | null} odeslanoListu
         * @param {number | undefined | null} ktgZpDor
         * @returns {boolean}
         */
        static IsOdeslanoListuValide(odeslanoListu: number | undefined | null, ktgZpDor: number | undefined | null): boolean;
        /**
          * Aktualizuje hodnoty zásilek po případných změnách.
          *
          * @author  TFeik
          * @date    29.02.2024
          *
          * @param {GContent} parentContent
          * @param {Interface.GOdeslaniGetSavedMailSettingsRequestDto} input
          * @returns {JQuery.Promise<Interface.GOdeslaniGetSavedMailSettingsResponseDto>}
          */
        static GetSavedMailSettings(parentContent: GContent, input: Interface.GOdeslaniGetSavedMailSettingsRequestDto): JQuery.Promise<Interface.GOdeslaniGetSavedMailSettingsResponseDto>;
    }
    /**
     * SmazZasilkyInput
     *
     * @author  TFeik
     * @date    29.09.2022
     * @since   488.1.0.492
     */
    interface SmazZasilkyInput {
        dialogs: GDlgNamespace;
        zasilkyKeSmazani: GOdeslaniSeznamDto[];
        zasilkyVsechny: GOdeslaniSeznamDto[];
        remove: (toDelete: GOdeslaniSeznamDto[]) => JQuery.Promise<GOdeslaniSeznamDto[]>;
    }
    /**
     * SmazZasilkyOutput
     *
     * @author  TFeik
     * @date    29.09.2022
     * @since   488.1.0.492
     */
    interface SmazZasilkyOutput {
        zasilkyAktualizovane: GOdeslaniSeznamDto[];
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniHistorieDlgInputParams {
        /**
         * Ixp dokumentu.
         */
        Ixp: string;
        /**
         * Lic.
         */
        Lic: string;
        /**
         * PorCislo.
         */
        PorCislo: number;
    }
    interface GOdeslaniHistorieDlgReturnValue {
    }
    /**
     * GOdeslaniHistorieDlg.
     */
    class GOdeslaniHistorieDlg extends GContentBase {
        /**
         * Historie zásilky.
         */
        private OdeslaniHistorieZasilky;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    25.07.2017
         */
        onContentReady(): void;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    30.08.2017
         */
        private _createMenu;
        /**
         * closing
         *
         * @author  TFeik
         * @date    13.06.2019
         *
         * @returns {JQueryPromise<GOdeslaniHistorieDlgReturnValue>}
         */
        closing(): JQueryPromise<GOdeslaniHistorieDlgReturnValue>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniHkpDlgInputParams extends GOdeslaniPredpisBaseInputParams {
    }
    interface GOdeslaniHkpDlgReturnValue extends GOdeslaniPredpisBaseDlgReturnValue {
    }
    class GOdeslaniHkpDlg extends GContentBase<GOdeslaniPredpisBaseDlg<GOdeslaniHkpFormDto, GOdeslaniHkpFormPermissionsDto, GOdeslaniHkpDlgReturnValue>> {
        readonly UseTypTiskuAKonverze?: boolean | null;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    18.03.2021
         */
        onContentReady(): void;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    18.03.2021
         */
        private CreateMenu;
        /**
         * Closing.
         *
         * @author  TFeik
         * @date    18.03.2021
         *
         * @returns {object} Stav přípravy odeslání emailu "state" a nastavené hodnoty "value".
         */
        closing(): JQueryPromise<GOdeslaniHkpDlgReturnValue | undefined>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniHpDlgInputParams extends GOdeslaniPredpisBaseInputParams {
    }
    interface GOdeslaniHpDlgReturnValue extends GOdeslaniPredpisBaseDlgReturnValue {
    }
    class GOdeslaniHpDlg extends GContentBase<GOdeslaniPredpisBaseDlg<GOdeslaniHpFormDto, GOdeslaniHpFormPermissionsDto, GOdeslaniHpDlgReturnValue>> {
        readonly UseTypTiskuAKonverze?: boolean | null;
        /**
         * OnContentReady.
         *
         * @author  tfeik
         * @date    19.09.2017
         */
        onContentReady(): void;
        /**
         * Vytvoří menu.
         *
         * @author  tfeik
         * @date    07.11.2017
         */
        private CreateMenu;
        /**
         * Closing.
         *
         * @author  tfeik
         * @date    09.10.2017
         *
         * @returns {object} Stav přípravy odeslání emailu "state" a nastavené hodnoty "value".
         */
        closing(): JQueryPromise<GOdeslaniHpDlgReturnValue | undefined>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniHromadneDlgInputParams {
        /**
         * Seznam ixp dokumentů.
         * @type {string[]}
         */
        Pids?: string[];
        /**
         * Sxs zásilky (při otevírání z výpravny).
         * @type {string}
         */
        Sxs?: string;
        /**
         * Odeslání posledních dokumentů vložených do spisu.
         * @type {boolean}
         */
        PosledniVlozeneDokumenty?: boolean;
    }
    interface GOdeslaniHromadneDlgReturnValue {
        /**
         * Příznak, zda byly všechny zásilky úspšně odeslány.
         * @type {bool}
         */
        Sent?: boolean;
        /**
         * Pole odeslaných zásilek.
         * @type {{ Sxs?: string, Ixp?: string }[]}
         */
        Odeslane?: {
            Sxs?: string;
            Ixp?: string;
        }[];
        /**
         * Příznak, zda se povedlo odeslat alespoň jednu zásilku.
         * @type {boolean}
         */
        AtLeastOneSended?: boolean;
        GroupResult?: GroupResult[];
    }
    /**
     * GOdeslaniHromadneDlg
     *
     * @author TFeik
     * @since 480.1.0.286
     */
    class GOdeslaniHromadneDlg extends GContentBase {
        /**
         * $Form
         * @type {JQuery<HTMLElement>}
         */
        private $Form?;
        /**
         * Pids
         * @type {string[]}
         */
        private readonly Pids?;
        /**
         * Sxs
         * @type {string}
         */
        private readonly Sxs?;
        /**
         * Odeslání posledních dokumentů vložených do spisu.
         * Zabrání editaci políček a spouštěníakcí spojených s (především) adresátem.
         * @type {boolean}
         */
        private readonly PosledniVlozeneDokumenty?;
        private readonly Config?;
        private readonly Zasilka?;
        private readonly Validators?;
        private Odeslane;
        private AtLeastOneSended;
        private GroupResult?;
        private KtgZpDorCurrent?;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    31.05.2018
         */
        onContentReady(): void;
        /**
         * _createAction
         *
         * @author  TFeik
         * @date    11.10.2023
         */
        private _createAction;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    31.05.2018
         */
        private _createMenu;
        private _createForm;
        private UpdateEnable;
        /**
         * Přehodí 3. a 4. řádek zásilkové adresy.
         *
         * @author  TFeik
         * @date    13.06.2018
         */
        private _switch3r4r;
        /**
         * Nastaví zásilkovou adresu dle vybraného subjektu.
         *
         * @author  TFeik
         * @date    25.06.2018
         */
        private _obnovZEsu;
        /**
         * Uloží zásilkovou adresu k vybraného subjektu.
         *
         * @author  TFeik
         * @date    25.06.2018
         */
        private _ulozitKEsu;
        /**
         * Načte zásilkovou adresu a id datové/gex schránky daného subjektu.
         *
         * @author  TFeik
         * @date    25.06.2018
         *
         * @param {string} ixsEsu
         * @param {string} [licZast]
         * @param {number} [porZast]
         * @returns {JQueryPromise<Interface.GOdeslaniAdresniRadkyDsDto>}
         */
        private _getAdresaEsu;
        /**
         * _odeslat
         *
         * @author  TFeik
         * @date    26.06.2018
         */
        private _odeslat;
        private _otevriTiskAdres;
        /**
         * _tisk
         *
         * @author  TFeik
         * @date    02.07.2018
         */
        private _tisk;
        /**
         * Přidá zásilku do resultu pro jeho vrácenípo zavření dialogu.
         *
         * @author  TFeik
         * @date    15.03.2021
         *
         * @param {(GOdeslaniSeznamDto | undefined | null)[] | null} [zasilky]
         */
        private addOdeslaniToResult;
        /**
         * closing
         *
         * @author  TFeik
         * @date    13.06.2019
         *
         * @returns {JQueryPromise<GOdeslaniHromadneDlgReturnValue>}
         */
        closing(): JQueryPromise<GOdeslaniHromadneDlgReturnValue>;
        /**
         * Příznak, zda je okno v režimu hromadného odeslání [true], nebo nového odeslání zásilky [false].
         *
         * @author  TFeik
         * @date    17.03.2021
         *
         * @returns {boolean}
         */
        private JeHromadneOdeslani;
        /**
         * Vytvoří základní group result.
         *
         * @author  TFeik
         * @date    17.03.2021
         */
        private CreateGroupResult;
        /**
         * Přidá klíč do GroupResultu s výhozím nastavením.
         *
         * @author  TFeik
         * @date    17.03.2021
         *
         * @param {string} key
         */
        private AddGroupResult;
        /**
         * Upraví GroupResult zásilky.
         *
         * @author  TFeik
         * @date    17.03.2021
         *
         * @param {GOdeslaniSeznamDto} zasilka
         */
        private UpdateGroupResult;
        /**
         * Vytvoří a vrátí seznam zásilek se zadaným nastavením.
         *
         * @author  TFeik
         * @date    17.03.2021
         *
         * @param {{ settings: GOdeslaniHromadneNastaveniDto }} input
         * @returns {JQuery.Promise<GOdeslaniSeznamDto[]>}
         */
        private GetSeznamZasilek;
        /**
         * GetKtgZpDor
         *
         * @author  TFeik
         * @date    11.10.2023
         *
         * @param {{ zpusobDor: Ginis.DbModel.GWflczpdEnum  }} input
         * @returns {JQuery.Promise<number>}
         */
        private GetKtgZpDor;
        /**
         * UpdateKtgZpDor
         *
         * @author  TFeik
         * @date    11.10.2023
         *
         * @param {Ginis.DbModel.GWflczpdEnum | undefined | null} zpDor
         * @returns {JQuery.Promise<void>}
         */
        private UpdateKtgZpDor;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniHromadneDotcenymSubjektumDlgInputParams {
        /**
         * PIDy dokumentů k odeslání.
         *
         * @type {string[]}
         */
        Ixp: string[];
    }
    interface GOdeslaniHromadneDotcenymSubjektumDlgReturnValue {
    }
    class GOdeslaniHromadneDotcenymSubjektumDlg extends GContentBase {
        /**
         *
         */
        private readonly SeznamDokumentu;
        /**
         *
         */
        private $Grid?;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    28.05.2018
         */
        onContentReady(): void;
        /**
         * Vytvoří sloupečky do gridu.
         *
         * @author  TFeik
         * @date    10.09.2020
         *
         * @returns {Gordic.Data.GridFormat<GOdeslaniDokumentDto>}
         */
        private createGridColumns;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    28.05.2018
         */
        private _createMenu;
        /**
         * Vrátí uživatelem vybrané řádky gridu.
         *
         * @author  TFeik
         * @date    30.05.2018
         *
         * @returns {GOdeslaniDokumentDto[]} Vybrané řádky.
         */
        private _getSelectedDocuments;
        /**
         * Ověří GEX / DS externího subjektu.
         *
         * @author TFeik
         * @date 28.05.2018
         *
         */
        private _nastaveni;
        /**
         * closing
         *
         * @author  TFeik
         * @date    13.06.2019
         *
         * @returns {JQueryPromise<GOdeslaniHromadneDotcenymSubjektumDlgReturnValue>}
         */
        closing(): JQueryPromise<GOdeslaniHromadneDotcenymSubjektumDlgReturnValue>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniHromadneDotcenymSubjektumNastaveniDlgInputParams {
        Settings?: GOdeslaniHromadneDotcenymSubjektumNastaveniDto;
    }
    interface GOdeslaniHromadneDotcenymSubjektumNastaveniDlgReturnValue {
        Settings?: GOdeslaniHromadneDotcenymSubjektumNastaveniDto;
    }
    class GOdeslaniHromadneDotcenymSubjektumNastaveniDlg extends GContentBase {
        /**
         *
         */
        private readonly Settings?;
        /**
         *
         */
        private $Form?;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    30.05.2018
         */
        onContentReady(): void;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    30.05.2018
         */
        private _createMenu;
        /**
         * Nastaví option "disabled" na políčku "DuvodVazby", dle aktuální hodnoty v "KomuOdeslat".
         *
         * @author  TFeik
         * @date    30.05.2018
         *
         * @returns {boolean}
         */
        private _adjustDuvodVazbyDisabled;
        /**
         * Vrátí nastavení a zavře content.
         *
         * @author  TFeik
         * @date    30.05.2018
         */
        private _returnSettingsAndClose;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniInterniDlgInputParams extends GOdeslaniPredpisBaseInputParams {
    }
    interface GOdeslaniInterniDlgReturnValue extends GOdeslaniPredpisBaseDlgReturnValue {
    }
    class GOdeslaniInterniDlg extends GContentBase<GOdeslaniPredpisBaseDlg<GOdeslaniInterniFormDto, GOdeslaniInterniFormEnabledDto, GOdeslaniInterniDlgReturnValue>> {
        /**
         * Příznak, zda mohou být enabled přílohy.
         *
         * @type {boolean}
         * @default true
         */
        private rowsEnabled;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    15.12.2020
         */
        onContentReady(): void;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    15.12.2020
         */
        private CreateMenu;
        /**
         * Closing.
         *
         * @author  TFeik
         * @date    15.12.2020
         *
         * @returns {object} Stav přípravy odeslání emailu "state" a nastavené hodnoty "value".
         */
        closing(): JQueryPromise<GOdeslaniInterniDlgReturnValue>;
        /**
         * Nastaví enabled na políčka a značení příloh.
         *
         * @author  TFeik
         * @date    05.02.2021
         */
        private ChangeEnable;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GOdeslaniMoznostiDlg extends GContentBase {
        /**
         * Vytvoří formulář pro úpravu možností odeslání zásilky.
         *
         * @author  TFeik
         * @date    11.12.2017
         *
         * @param {?{name: string, formBuilder: formBuilder}} options Parametry formuláře.
         *
         * @returns {{name: string, formBuilder: formBuilder, importantFieldNames: string}} FormBuilder.
         */
        static createForm(options?: {
            name?: string;
            ixp?: string;
        }): JQueryPromise<{
            name: string;
            formBuilder: Forms.Form;
            importantFieldNames: string;
        }>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    type GOdeslaniPredpisBaseDlgResult = 'canceled' | 'done' | 'failed';
    /**
     * Názvy akcí.
     *
     * @author  TFeik
     * @date    18.02.2021
     */
    enum GOdeslaniPredpisBaseDlgActionNames {
        Odeslat = "actOdeslat",
        OdeslatSOpakovanim = "actOdeslatSOpakovanim"
    }
    interface GOdeslaniPredpisBaseInputParams {
        MailStruct: Gordic.Wfl.WebClient.GWflMailStructDto;
        Hromadne?: boolean;
        IxbSeznam?: string;
        IsPriprava?: boolean | null;
        /**
         * Předpřipravený předpis elektronické zásilky.
         * @type {Interface.GWflMailSettingsDto | null | undefined}
         */
        MailSettingsPreset?: Interface.GWflMailSettingsDto | null;
    }
    interface GOdeslaniPredpisBaseDlgReturnValue {
        state: GOdeslaniPredpisBaseDlgResult;
        value?: Interface.GWflMailSettingsDto;
    }
    class GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue> extends GContentBase {
        /**
         * MailStruct
         * @type {GWflMailStructDto}
         */
        readonly MailStruct?: GWflMailStructDto;
        readonly Hromadne?: boolean;
        readonly IxbSeznam?: string;
        readonly FormData?: TFormData;
        readonly FormPermissions?: TFormPermissions;
        readonly FormValidators?: object;
        readonly SeznamPrilohPisemnosti?: GOdeslaniPrilohaPisemnostiDto[];
        readonly Config?: GOdeslaniConfigDto;
        readonly IxsUloPre?: string;
        readonly IsPriprava?: boolean;
        static PrepareMessage<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>, input: {
            formData: TFormData;
            selectedRows: GOdeslaniPrilohaPisemnostiDto[];
            inputParams?: GSrvMethodCallInputDto;
            certificate?: string;
        }): JQuery.Promise<GSrvMethodCallResultDto>;
        static GetSeznamPriloh<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>, input: {
            ixp: string;
        }): JQuery.Promise<GOdeslaniPrilohaPisemnostiDto[]>;
        Result?: GOdeslaniPredpisBaseDlgResult;
        ShowClosingAlert: boolean;
        MailSettings?: Interface.GWflMailSettingsDto;
        $Form?: JQuery<HTMLElement>;
        $Grid?: JQuery<HTMLElement>;
        static GetSelectedRows<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>): GOdeslaniPrilohaPisemnostiDto[];
        static GetSelectedRow<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>): GOdeslaniPrilohaPisemnostiDto | undefined;
        static UpdateSeznamPriloh<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>, seznamPriloh: GPrilohaPisemnostiDto[]): void;
        static GetFormData<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>): TFormData;
        /**
         * Vrátí nastavení emailu.
         *
         * @author  TFeik
         * @date    15.12.2020
         *
         * @returns {IGOdeslaniEmailDlgResult}
         */
        static GetMailSettings<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>): Interface.GWflMailSettingsDto;
        /**
         * Vrátí výsledek okna odeslání datové zprávy.
         *
         * @author  TFeik
         * @date    15.12.2020
         *
         * @returns {IGOdeslaniEmailDlgResult}
         */
        static GetDialogReturnValue<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>): GOdeslaniPredpisBaseDlgReturnValue;
        static Closing<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>, modifyDialogReturnValue: (returnValue: GOdeslaniPredpisBaseDlgReturnValue) => TDialogReturnValue): JQuery.Promise<TDialogReturnValue>;
        /**
         * Načte přlohy dle ixp v MailStruct, do poznámky doplní informaci o proběhlé konverzi a aktualizuje data v gidu.
         *
         * @author  TFeik
         * @date    11.03.2021
         *
         * @returns {JQuery.Promise<GOdeslaniPrilohaPisemnostiDto[]>}
         */
        static NactiPrilohyPoKonverzi<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>): JQuery.Promise<GOdeslaniPrilohaPisemnostiDto[]>;
        /**
         * Vytvoří předpis odeslání a zavře content.
         *
         * @author  tfeik
         * @date    09.11.2017
         *
         * @param {boolean} opakovat Příznak, zda se má stejné nastavení požít i pro další zásilky.
         *
         * @param {GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions} content
         * @param {boolean} opakovat
         * @returns {JQuery.Promise<GSrvMethodCallResultDto>}
         */
        static VytvoritPredpisOdeslani<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>, opakovat: boolean): JQuery.Promise<GSrvMethodCallResultDto>;
        /**
         * CreateBaseActions<TFormData, TFormPermissions, TDialogReturnValue>
         *
         * @author  TFeik
         * @date    12.03.2021
         *
         * @param {GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions} content
         */
        static CreateBaseActions<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>): void;
        /**
         * CreateBaseMenuBarParams<TFormData, TFormPermissions, TDialogReturnValue>
         *
         * @author  TFeik
         * @date    12.03.2021
         *
         * @param {GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions} content
         * @returns {MenuParams[]}
         */
        static CreateBaseMenuBarParams<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>): MenuParams[];
        /**
         * CreateBaseCommandBarParams<TFormData, TFormPermissions, TDialogReturnValue>
         *
         * @author  TFeik
         * @date    12.03.2021
         *
         * @param {GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions} content
         * @returns {MenuParams[]}
         */
        static CreateBaseCommandBarParams<TFormData, TFormPermissions, TDialogReturnValue>(content: GOdeslaniPredpisBaseDlg<TFormData, TFormPermissions, TDialogReturnValue>): MenuParams[];
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GOdeslaniPreviewDlg extends GContentBase {
        /**
         *
         */
        private readonly Zasilka?;
        /**
         *
         */
        private readonly Hromadne;
        /**
         *
         */
        private readonly Permission;
        /**
         *
         */
        onContentReady(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniTiskAdresDlgInputParams {
        /**
         * Ixp dokumentu. Pokud není nastaveno, pak se tiskne z sslnode temp tabulky.
         */
        Ixp?: string;
        /**
         * Sxs vybraných zásilek.
         * @type {string[]}
         */
        SelectedSxs?: string[];
    }
    interface GOdeslaniTiskAdresDlgReturnValue {
    }
    /**
     * GOdeslaniTiskAdresDlg.
     *
     * @returns
     */
    class GOdeslaniTiskAdresDlg extends GContentBase {
        /**
         *
         */
        private readonly Ixp?;
        /**
         * Sxs vybraných zásilek.
         * @type {string[]}
         */
        private readonly SelectedSxs?;
        /**
         *
         */
        private SeznamZasilek;
        /**
         *
         */
        private readonly PrintParams?;
        /**
         *
         */
        private readonly Counts;
        /**
         * GIN ODES - řízení používání filtrů na formáty pro tisk obálek.
         * Parametr řídí zda používat/nepoužívat filtry na formáty pro tisky obálek nebo to nechat na uživateli.
         *
         * @type {number}
         */
        private readonly gin_odes_pr_ob;
        /**
         * IsTiskHromadnePresTemp
         * @type {boolean}
         */
        private readonly IsTiskHromadnePresTemp?;
        /**
         *
         */
        private $Form?;
        /**
         *
         */
        private $Grid?;
        /**
         * OnContentReady.
         *
         * @author  tfeik
         * @date    01.09.2017
         */
        onContentReady(): void;
        /**
         * Vrátí dto s hodnotami pro tisk.
         *
         * @author  tfeik
         * @date    01.09.2017
         *
         * @returns {OdeslaniTiskAdresFormDto} Dto s hodnotami pro tisk.
         */
        private _getCustomDto;
        /**
         * Nastaví hodnotu pole "pocet" dle výběru zásilek pro tisk.
         *
         * @param {Interface.KriteriumPoctuZasilekEnum} value Druh výběru tisku zásilek. 0: Všechny, 1: Připravené, 2: Vybrané.
         */
        private _changeCounts;
        /**
         * Vytvoří menu.
         *
         * @author  tfeik
         * @date    01.09.2017
         */
        private _createMenu;
        /**
         * closing
         *
         * @author  TFeik
         * @date    13.06.2019
         *
         * @returns {JQueryPromise<GOdeslaniTiskAdresDlgReturnValue>}
         */
        closing(): JQueryPromise<GOdeslaniTiskAdresDlgReturnValue>;
        /**
         * Načte adresy zásilek k tisku, dle zadaného kritéria.
         *
         * @author  TFeik
         * @date    16.06.2019
         *
         * @param {GOdeslaniTiskAdresDlg} this Content tisku adres.
         * @param {Interface.KriteriumPoctuZasilekEnum} [kriteriumZasilek] Kritérium filtrující adresy zásilek.
         * @returns {JQuery.Promise<GOdeslaniTiskAdresDto[]>} Adresy zásilek.
         */
        private GetSeznamZasilek;
        /**
         * Vrátí příznak, zda se má odesílat přes Ssltode.
         *
         * @author  TFeik
         * @date    22.01.2021
         *
         * @param {Interface.KriteriumPoctuZasilekEnum} tiskoutZasilky
         * @returns {string}
         */
        private IsSsltode;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GOdeslaniWizardDlgInputParams {
        /**
         * Ixp dokumentu.
         */
        Ixp: string;
        /**
         * Příznak, zda se jedná o hromadné odeslání (default: false).
         */
        Hromadne?: boolean;
        /**
         * Příznak, zda po dokončení průvodce otevřít okno odeslání (default: false).
         */
        OpenOdeslaniAfterCompleting?: boolean;
    }
    interface GOdeslaniWizardDlgReturnValue {
        wasSaved?: boolean;
    }
    class GOdeslaniWizardDlg extends GContentBase {
        /**
         *
         */
        private readonly Title;
        private readonly Hromadne?;
        /**
         * Config.
         */
        private readonly Config?;
        /**
         * Ixp.
         */
        private readonly Ixp;
        /**
         * AktZnacka.
         */
        private readonly AktZnacka;
        /**
         * MoznostiFormName.
         */
        private MoznostiFormName?;
        private WasSaved?;
        private UnsavedChanges?;
        private PreviewDiv?;
        private RowToPreview?;
        private IsDebounced;
        private _createPreviewPanel;
        private _loadPreview;
        private _enablePreview;
        private _showPreview;
        private _createPreview;
        private _destroyPreview;
        private DruhZasilkyValues?;
        private GetDruhZasilkyValues;
        /**
         * OnContentReady.
         *
         * @author  tfeik
         * @date    11.12.2017
         */
        onContentReady(): void;
        /**
         * closing
         *
         * @author  TFeik
         * @date    10.08.2022
         *
         * @returns {JQuery.Promise<GOdeslaniWizardDlgReturnValue>}
         */
        private closing;
        /**
         * Zkontroluje zda jsou provedeny neuložené změny a případně zobrazí dialog s uložením.
         *
         * @param {string | Element | JQuery} [message] Text/Html/JQuery obsahu okna.
         * @returns {JQuery.Promise<void>}
         */
        private checkUnsavedChanges;
        /**
         * Vytvoří obsah stránky pro nastavení výchozích parametrů zásilky.
         *
         * @author  tfeik
         * @date    11.12.2017
         *
         * @param {GContent} that Parent content.
         * @param {JQuery<HTMLElement>} contentDiv contentDiv.
         * @param {Wizard.changeObject} change Change.
         */
        private _createVychoziParametry;
        /**
         * Uloží výchozí parametry zásilky.
         *
         * @author  tfeik
         * @date    11.12.2017
         *
         * @param {number} that Parent content.
         * @param {JQuery<HTMLElement>} contentDiv contentDiv.
         * @param {Wizard.changeObject} change Change.
         */
        private _saveVychoziParametry;
        /**
         * Vytvoří obsah stránky pro vybrání adresátů.
         *
         * @author  tfeik
         * @date    11.12.2017
         *
         * @param {GContent} that Parent content.
         * @param {JQuery<HTMLElement>} contentDiv contentDiv.
         * @param {Wizard.changeObject} change Change.
         */
        private _createVyberAdresatu;
        /**
         * Vytvoří obsah stránky pro upravení zásilek.
         *
         * @author  tfeik
         * @date    22.12.2017
         *
         * @param {GContent} that Parent content.
         * @param {JQuery<HTMLElement>} contentDiv contentDiv.
         * @param {Wizard.changeObject} change Change.
         */
        private _createUpraveniZasilek;
        /**
         * Vytvoří obsah stránky pro vybrání adresátů.
         *
         * @author  tfeik
         * @date    11.12.2017
         *
         * @param {GContent} that Parent content.
         * @param {JQuery<HTMLElement>} contentDiv contentDiv.
         * @param {Wizard.changeObject} change Change.
         */
        private _createKontrolaAOdeslani;
        /**
         *
         * Vrátí uživatelem vybrané řádky gridu.
         *
         * @author  tfeik
         * @date    01.09.2017
         *
         * @param {GGrid} grid GGrid.
         *
         * @returns {object[]} Vybrané řádky.
         */
        private _getSelectedRows;
        /**
         * Vrátí všechny řádky gridu.
         *
         * @author  TFeik
         * @date    08.08.2022
         *
         * @param {GGrid} grid GGrid.
         *
         * @returns {object[]} Vybrané řádky.
         */
        private _getAllRows;
        /**
         * Přepíše řádek v OdeslaniSeznamZasilek, jestliže se shoduje idZasilky.
         *
         * @author  tfeik
         * @date    01.09.2017
         *
         * @param {object[]} seznamZasilek Seznam zásilek.
         * @param {!GOdeslaniSeznamDto} newDataRow Aktualizovaná data řádku.
         */
        private _updateOdeslaniZasilka;
        /**
         * Obnoví data v Gridu.
         *
         * @author  tfeik
         * @date    01.09.2017
         *
         * @param {ggrid} grid AAA
         * @param {object[]} seznamZasilek AAA
         */
        private _reloadGridData;
        /**
         * Přidá řádek do OdeslaniSeznamZasilek.
         *
         * @author  TFeik
         * @date    08.08.2022
         *
         * @param {!GOdeslaniSeznamDto} newDataRow Nová data řádku.
         */
        private _addOdeslaniZasilka;
        /**
         * Vrátí seznam zásilek.
         *
         * @author  tfeik
         * @date    28.12.2017
         *
         * @returns {Promise<GOdeslaniSeznamDto[]>} Vrátí seznam zásilek dokumentu.
         */
        private _getSeznamZasilek;
        /**
         * Vrátí dto s oprávněními spustit jednotlivé akce.
         *
         * @author  tfeik
         * @date    02.01.2017
         *
         * @returns {Promise<GOdeslaniEnabledActionsDto>} Oprávnění spustit jendotlivé akce.
         */
        private _getEnabledActions;
        /**
         * Uloží zásilky.
         *
         * @author  tfeik
         * @date    14.12.2017
         *
         * @param {number} that Parent content.
         * @param {JQuery<HTMLElement>} contentDiv contentDiv.
         */
        private _saveSeznamZasilek;
        /**
         * getCompleteSeznamZasilek.
         *
         * @author  tfeik
         * @date    04.01.2017
         *
         * @param {number} that Parent content.
         * @param {JQuery<HTMLElement>} contentDiv contentDiv.
         */
        private _getCompleteSeznamZasilek;
        /**
         * Odstraní vybrané zásilky.
         *
         * @author  tfeik
         * @date    04.01.2018
         */
        private _deleteSeznamZasilek;
        /**
         * createSaveAction
         *
         * @author  TFeik
         * @date    09.08.2022
         *
         * @param {GOdeslaniWizardDlg} content
         * @param {JQuery<HTMLElement>} $contentElement
         * @param {Ginis.DbModel.GWflcdrzDto[]} druhZasilkyValues
         * @returns {MenuParams}
         */
        private createSaveAction;
        /**
         * Nastaví příznak UnsavedChanges.
         *
         * @author  TFeik
         * @date    30.04.2018
         *
         * @param {boolean} value
         */
        setUnsavedChanges(value: boolean): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GPanelSouhrnDlg extends GContentBase {
        private inputOpt;
        private Formular;
        private retVal;
        prepareContent(): void;
        private initData;
        private vytvoitForm;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class NastaveniPrizZobZastupemDlg extends GContentBase {
        private model;
        private validators;
        private onContentReady;
        private registrAction;
        private createComandBar;
        private createForm;
        private saveData;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class PozastSkartacniOperaceDlg extends GContentBase {
        private model;
        private validators;
        private minYear;
        private onContentReady;
        private registrAction;
        private createComandBar;
        private createForm;
        private saveData;
        private zkontrolujZmenu;
        private upravPodlezmenyChbxPozastSkOperace;
        private setValidatorsNaRok;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class StrukturaNadrazenychEntityDlg extends GContentBase {
        private dto;
        private Grid;
        private GridVecnaSkupina;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private vytvorMenu;
        private vytvorGrid;
        private vytvorGridVecnaSkupina;
        private getGridFormat;
        private getGridFormatVecnaSkupina;
        private otevriDetail;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class StupenUtajeniDlg extends GContentBase {
        private model;
        private validators;
        private filterRezimNakl;
        private rezimNakl;
        private FilterStUtajIdForFieldPristup;
        private onContentReady;
        private registrAction;
        private createComandBar;
        private createForm;
        private zkontrolujZmenuPristupu;
        private saveData;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class TestDlouheOperaceDlg extends GContentBase {
        private sound;
        private audioSound;
        private silence;
        private silenceSound;
        private onContentReady;
        private registrAction;
        private createComandBar;
        private createForm;
        private registrujPlay;
        private ukoncitPrehravani;
        private closing;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class VytvoritTypovySpisDlg extends GContentBase {
        private aktualniRok;
        private ProvestVytvoreniVDialogu;
        private onContentReady;
        private registrAction;
        private createComandBar;
        private createForm;
        private prepocitat;
        private vytvorit;
        private vytvoritVDialogu;
        private vratitVybraneHodnoty;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class ZmenaSpouUdalostiDlg extends GContentBase {
        private model;
        private validators;
        private minYear;
        private onContentReady;
        private registrAction;
        private createComandBar;
        private createForm;
        private saveData;
        private zkontrolujZmenu;
        private upravPodlezmenyCheckBoxRokZmeny;
        private setValidatorsNaRok;
    }
}
declare namespace Gordic.Wfl.GRakUtils {
    function ZmenaDatovehoFormatuElDokumentu(config: Gordic.Wfl.Interface.GRakZdfConfigDto, signer?: Gordic.Wfl.WebClient.GByteSigner): JQuery.Promise<any, any, any>;
}
declare namespace Gordic.Wfl.WebClient {
    class GDetailNahraniSouboru extends GDetailBuilderContent implements IGContent {
        model: any;
        onContentReady(): void;
        /**
         * onDetailBuilderInit
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        createForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GExportElDokumentuDlgInputParams {
        /**
         * Ixp dokumentu.
         */
        Ixp: string;
    }
    interface GExportElDokumentuDlgReturnValue {
    }
    /**
     * GDocasneUloziste.
     */
    class GDocasneUlozisteDlg extends GContentBase {
        private Ixp;
        private AktUmisteni;
        private Dto;
        private $Formular;
        private $FormularTab;
        private tab;
        private Validators;
        /**
         * OnContentReady.
         *
         * @author  DSebesta
         * @date    25.07.2017
         */
        onContentReady(): void;
        private createForm;
        private setModel;
        private _createMenu;
        private setControlsForUser;
        private collectData;
        private potvrdit;
        private zapujcit;
        private vratit;
        private zpet;
        private validatedatumvraceni;
        private validateDatumVraceno;
        private vyjmout;
        /**
         * closing
         *
         * @author  DSebesta
         * @date    13.06.2019
         *
         * @returns {JQueryPromise<GExportElDokumentuDlgReturnValue>}
         */
        closing(retVal: any): JQueryPromise<any>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** Základní content dohledového systému */
    class GControlsSystem extends GContentBase {
        title: string;
        /** Vstupní filtry */
        filters: object;
        /** number: -1 bude znamenat nefitrovat na typ agendy (zobrazeno vše); jinak filtr na zadanou agendu; undefined - aktuální agenda */
        typ_ag: number;
        /** boolean: true - pouze vlastní a znepřístupněn filtr vlastní, který bude zaškrtnut; false - klasicky přístupný filtr vlastní s tím, že bude odškrknutý; undefined - klasicky */
        vlastni: boolean;
        /** boolean: true - zobrazeno v gridu; false - nezobrazeno v gridu; undefined - zobrazeno */
        showAgendoveCislo: boolean;
        /** boolean: true - zobrazit tlačítko detail v menubaru; false - nezobrazit tlačítko; undefined - zobrazeno */
        showDetail: boolean;
        /** Delegát akce detail, která by měla otevřít detail objektu ve správné agendě */
        actionDetail: (ctx: any) => void;
        private aktTypAg;
        private ixsFunAkt;
        private $grid;
        private view;
        private filterPanel;
        private previewController;
        private currentFilters;
        onContentReady(): void;
        /** Vytvoření gridu */
        private createGrid;
        /** Vytvoření filter panelu */
        private createFilterPanel;
        refreshPreviewDebounced: Function;
        /** Vytvoření sidebaru s preview podrobností chodu */
        private createSidebar;
        /** Vytvoření formuláře filter panelu */
        private createFilterPanelForm;
        /**
         * Odebrání filtru z filterů
         * @param filter Jméno filtru, který má být odstraněn
         */
        private removeFilter;
        /** Vytvoření filtrů */
        private createFilters;
        /** Vytvoření MenuBaru z akcí */
        private createMenuBar;
        /** Vytvoření formátu gridu */
        private createGridFormat;
        /** Načtení dat z db a vložení do gridu */
        private setDataToGrid;
        /** Vytvoření akcí */
        private createActions;
        /** Akce otevření detailu */
        private openPodrobnosti;
        /** Akce otevření detailu */
        private openDetailDefault;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** Detail záznamu dohledového systému */
    class GControlsSystemDetail extends GContentBase {
        title: string;
        /** Data obsahující dto výsledku kontrolního chodu */
        data: Gordic.Gin.Interface.GControlsSystemDto;
        private attachmentId;
        private serviceContent;
        onContentReady(): void;
        /** Vytvoření formuláře detailu */
        private createForm;
        /** Načtení dat z db a vložení do formuláře */
        private loadDataToForm;
        /** Vytvoření CommandBaru */
        private createCommandBar;
        /** Vytvoření akcí */
        private createActions;
        /** Vytvoření MenuBaru */
        private createMenuBar;
        /** Vytvoření a vrácení service contentu pro stažení přílohy */
        private cnt;
        /** Otevření (stažení) přílohy */
        private openAttachment;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** Historie výsledků kontrolních chodů */
    class GControlsSystemHistory extends GContentBase {
        title: string;
        /** Identifikátor 1 objektu */
        ixx_1: string;
        /** Identifikátor 2 objektu */
        ixx_2: string;
        /** Identifikátor 3 objektu */
        ixx_3: string;
        /** Vstupní filtry */
        filters: object;
        private typAg;
        private ixsFunAkt;
        private $grid;
        private view;
        private previewController;
        private currentFilters;
        onContentReady(): void;
        /** Vytvoření gridu */
        private createGrid;
        refreshPreviewDebounced: Function;
        /** Vytvoření sidebaru s preview podrobností chodu */
        private createSidebar;
        /** Vytvoření filtrů */
        private createFilters;
        /** Vytvoření MenuBaru z akcí */
        private createMenuBar;
        /** Vytvoření CommandBaru */
        private createCommandBar;
        /** Vytvoření formátu gridu */
        private createGridFormat;
        /** Načtení dat z db a vložení do gridu */
        private setDataToGrid;
        /** Vytvoření akcí */
        private createActions;
        /** Akce otevření detailu */
        private openPodrobnosti;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** Interface s options pro přidání DSGGridColumns */
    interface DSGGridColumnsOptions {
        /** Počet zpráv DSG, pro nezobrazení nutný explicitní false */
        dsg_count?: boolean;
        /** Příznak, zda má být nastavena property hidden u dsg_count sloupce na true */
        dsg_count_hidden?: boolean;
        /** Nejvyšší závažnost, pro nezobrazení nutný explicitní false */
        max_zavaznost?: boolean;
        /** Příznak, zda má být nastavena property hidden u max_zavaznost sloupce na true */
        max_zavaznost_hidden?: boolean;
        /** Text zpráv, pro nezobrazení nutný explicitní false */
        joined_text?: boolean;
        /** Příznak, zda má být nastavena property hidden u joined_text sloupce na true */
        joined_text_hidden?: boolean;
    }
    /**
     * Funkce pro přidání sloupců do gridu se Zprávami DSG
     * @param fragment Fragment přiřazený ControlsSystemAggregated
     * @param options Options přidání
     */
    function addDSGGridColumns(fragment: string, options?: DSGGridColumnsOptions): Data.GridFormat;
}
declare namespace Gordic.Wfl.WebClient {
    const wflDBParamsDefaults: {
        isUkraine: boolean;
    };
    function GetGWflDBParams(content?: GContent): Gordic.Wfl.WebClient.GWflDBParams;
    /**
     * Původní funkce vracející vše dohromady. Pozor, vyhodí vyjímku, pokud ještě nebylo načteno.
     *
     * @param {GContent} [content]
     * @returns {any}
     */
    function GetGWflStrukturaOrg(content?: GContent): any;
    /**
     * nová funkce, vracející pouze synchronní data
     *
     * @param {GContent} [content]
     * @returns {any}
     */
    function GetGWflStrukturaAktInfo(content?: GContent): any;
    /**
     * Nová funkce vracející asynchronně vše včetně pole dat
     *
     * @param {GContent} [content]
     * @returns {any}
     */
    function GetGWflStrukturaOrgAsync(content?: GContent): any;
}
declare namespace Gordic.Wfl.WebClient {
    class GIsdocInvoice extends GContentBase {
        private currencyCode;
        private invoice;
        prepareContent(): void;
        generateForm(invoice: any, mainContainer: JQuery<HTMLElement>): void;
        createInvoiceHeaderForm(invoice: any, container: JQuery<HTMLElement>): void;
        private GetDocumentType;
        createPartySectionsForm(invoice: any, mainContainer: JQuery<HTMLElement>): void;
        createPartyForm(partyDetail: any, container: JQuery<HTMLElement>): void;
        createContractReferencesForm(contractReferences: any, container: JQuery<HTMLElement>): void;
        createInvoiceLineGrid(lines: any, container: JQuery): void;
        createNonTaxedDeposits(invoice: any, container: JQuery<HTMLElement>): void;
        createTaxedDeposits(taxedDeposites: any, container: JQuery<HTMLElement>): void;
        getTaxes(invoice: any): any[];
        createLegalMonetaryTotal(invoice: any, container: JQuery<HTMLElement>): void;
        createPaymentMeans(paymentMeans: any, container: JQuery<HTMLElement>): void;
        createAlternateBankAccounts(bankAccounts: any, container: JQuery<HTMLElement>): void;
        GetPaymentInfo(item: any): any;
        createPayments(payments: any, container: JQuery<HTMLElement>): void;
        GetPaymentMeans(code: string): "Platba v hotovosti" | "Platba šekem" | "Převodem" | "Převod na účet" | "Platba kartou" | "Direct debit" | "Platba dobírkou" | "Zaúčtování mezi partnery";
        private createOrderReferences;
        private createDeliveryNoteReferences;
        createSupplementsList(supplements: any, container: JQuery<HTMLElement>): void;
        selectIcon(item: any): "fa-file-o" | "fa-file-pdf-o" | "fa-file-word-o" | "fa-file-image-o";
        createRecapDPH(invoice: any, container: JQuery): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * EPK: konverze
     *
     * @author thazmuka
     * @since 490.1.0.181
     */
    class GEpkConversion extends GContentBase {
        /**
         * Zjednodušení provedení hromadné konverze.
           
           Tlačítka „Konvertovat“ a „Zavřít“ budou spojena do jednoho tlačítka, které nejprve zkonvertuje zaškrtnuté přílohy a následně zavře okno.
           Z okna „Výběr elektronických dokumentů ke konverzi do PDF“ níže bude odstraněna sekce el. obraz, který se bude automaticky konvertovat do PDF/A v případě že není PDF/A.
           
           Pokud není v seznamu v části vyřízení žádosti zaškrtnuto „Včetně příloh“, tak se
           také okno „Výběr elektronických dokumentů ke konverzi do PDF“ nebude zobrazovat a pouze se automaticky zkonvertuje el. obraz pokud není PDF/A.
         *
         */
        private epk_zjedkonv;
        private grid;
        private view;
        /** identifikátor dokumentu / žádosti */
        private Ixp;
        /** identifikátor souboru - pokud ho předám provedu rovnou konverzi nad daným souborem */
        private Ixb;
        private conversionList;
        onContentReady(): void;
        private result;
        private createMenubar;
        private createCommandbar;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GEpkVisualAttachmentGrid extends GContentBase {
        private badgeUmisteni;
        private Data;
        private view;
        private grid;
        private Ixp;
        private IxsDpo;
        private SerCislo;
        private Aktivita;
        private tempSignConfig;
        /** ukládat vizuální podpisy ?? */
        private SaveVisualSignature;
        onContentReady(): void;
        closing(): any;
        private createMenubar;
        private updateBadgeUmisteniPodpisu;
        private createCommandbar;
        private createGrid;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * GSettlementLog
     *
     * @author thazmuka
     * @since 490.1.0.156
     */
    class GSettlementLog {
        /** instance GLogu */
        private customLogger;
        /** text logu pro mail */
        private mailLog;
        private indexLog;
        /** konstruktor */
        constructor(name?: string, filename?: string, authorcode?: number);
        /**
         * zapiš do logu
         * @param message zpráva logu
         * @param state typ zprávy logu
         */
        writeLog(message: string): void;
        /**
         * zapiš do logu (celý object)
         * @param message titulek zprávy
         * @param dto object dto zapracovaný do zprávy
         */
        writeLogDto(message: string, dto: object): void;
        /** vrať kompletní log pro poslání do mailu */
        getMailLog(): string;
        /**
         * informační zprávy, které jsou běžně povolené v produkčním prostředí.
         * @param message zpráva
         */
        private logInfo;
        /**
         * zapiš do mailové log. zprávy
         * @param message zpráva
         */
        private writeMailLog;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Třída podpory pro notifikace a gcovery
     *
     * @author thazmuka
     * @since 490.1.0.156
     */
    class GSettlementNC {
        /** skupina pro notifikace */
        private group;
        /** performanceStart - pro případné znovuzobrazení notifikace */
        private performanceStart;
        /** id notifikace */
        private idNotification;
        /** id gcoveru */
        private idCover;
        /** gcontent */
        private cnt;
        /**
         * constructor
         */
        constructor(cnt: GContentType<any>);
        /**
         * uuidv4
         */
        private createId;
        begin(ixp?: string | null, content?: string): void;
        progress(ixp: string | null, opt: IGNotificationOptions, needsToWaitForConfirmation?: boolean): void;
        /**
         * zobrazení posledního kroku progressové notifikace (včetně prokliku na detail žádosti)
         */
        end(ixp: string, state: "success" | "error", params: Wfl.Interface.GEpkCompleteConfigDto, reasonResponse?: {
            reason: string;
            type?: number;
            reasonlong?: string;
        }, glog?: GSettlementLog): void;
        /** odstranění notifikace dle ID */
        remove(): void;
        /**
         * vytvořím jednotlivou notifikaci s novým ID (bez závislosti na předchozím progressu)
         */
        add(ixp: string, state: "success" | "error", params: Wfl.Interface.GEpkCompleteConfigDto | Gordic.Wfl.Interface.GEpkRequestStackDto, reasonResponse?: {
            reason: string;
            type?: number;
            reasonlong?: string;
        }): void;
        /**
           * vytvořím jednotlivou notifikaci s novým ID (bez závislosti na předchozím progressu)
           * - varianta 2
           */
        /**
         * vytvoření jednotlivé notifikace
         * @param title titulek
         * @param content obsah
         */
        addSingle(title: string, content: string): void;
        private initEndNotificationObject;
        /**
         * vrať typ požadavku
         *
         * @param {string} ixp indentifikátor dokumentu
         * @param {Gordic.Wfl.Interface.TypPozadavkuEpk} typPozadavku typ požadavku
         * @param {Gordic.Wfl.Interface.GWflczpvEnum} zpusobVyrizeni způsob vyřízení
         */
        private getTypPozadPod;
        private cancel;
        cancelOperation(state: boolean): void;
        beginOperation(cancelOperation?: Function): void;
        progressCancelOperation(): void;
        private rqCount;
        private rqIndex;
        private successIndex;
        private failIndex;
        private showCounter;
        setCounter(state: boolean): void;
        setRqCount(count: number): void;
        setRqCountIndex(): void;
        setRqSuccessIndex(): void;
        setRqFailIndex(): void;
        progressOperation(text: string, progress: number, needsToWaitForConfirmation?: boolean, cancelOperation?: Function): void;
        endOperation(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Servisní třída pro zobrazení vyřízených žádostí formou notifikace
     * - jedná se o ty, které jsou vyřízeny na serveru
     *
     * @author thazmuka
     * @since 490.1.0.17
     */
    class GSettlementService {
        /** list vyřízených žádostí na serveru */
        private stack;
        /** název třídy pro vyřízení */
        private name;
        /** obsluha notifikací pro vyřízení v EPK */
        private N;
        /** funkční místo ze sessionInfo */
        private ixsFun;
        constructor(ixsFunSessionInfo?: string);
        /** zaregistrování události pro odchytání dokončených žádostí */
        prepare(): void;
        private check;
        private showNotification;
    }
}
declare namespace Gordic.Search {
    /**
     * Resolver hledající díl.
     *
     * @author  TFeik
     * @date    21.03.2025
     */
    class GDilSearchResolver extends Components.Search.GBaseSearchResolver {
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
         * fuzzySearchOnObjectConfidence
         *
         * @param {string} textInput
         * @param {Wfl.Interface.GWflspidFulltextDto} item
         * @returns {number}
         */
        private fuzzySearchOnObjectConfidence;
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.Promise<Components.Search.IGSearchResolverItem[]>;
    }
}
declare namespace Gordic.Search {
    export interface GPidSearchResolverInputParams extends Components.Search.IGSearchResolverOptions {
        /**
         * Funkce pro otevření detailu v konkrétním modulu.
         *
         * (Default) Pokud není funkce vyplněna, pak se bude otevírat detail ssl dokumentu (je nutné mít ssl.webclient scripty).
         *
         * Na vstup dostane informace o aktuální entitě. Pokud funkce otevře dialog, pak je nutné vrátit promise true.
         * V případě, kdy z dat zjistíte, že nechcete / nemůžete otevřím detail sami,
         * pak vrátí promise false čímž dojde k otevření ssl detailu dokumentu (je nutné mít ssl.webclient scripty).
         *
         * Pokud nechcete používat otevírání ssl detailu dokumentu (používat ssl.webclient scripty),
         * ani jej nechcete otevírat sami přímo v modulu, tak nastavte openDetail na false.
         */
        openDetail?: ((pidInfo: Wfl.Interface.GHledejIdentifikatorResponseDto) => JQuery.Promise<boolean>) | false;
        /**
         * Funkce pro přidání vlastních akcí k výsledku nalezeného identifikátoru.
         */
        customActions?: (pidInfo: Wfl.Interface.GHledejIdentifikatorResponseDto) => JQuery.Promise<MenuParamsAction[]>;
        /**
         * (Default: true) Příznak, zda se mají dohledávat i žádosti o podpis (z EPK) hledaného pidu.
         *
         * @type {boolean}
         */
        hledejZadostiOPodpis?: boolean;
        enableIxs?: boolean;
    }
    export enum GPidSearchResolverActionNames {
        openPidInCurrentModule = "openPidInCurrentModule",
        openPidInNewTab = "openPidInNewTab",
        openPidInUsu = "openPidInUsu"
    }
    interface GPidSearchResolverFazeATypyAgendInfo {
        typAg: number[];
        faze: string[];
        islServiceName: string;
        searchesIxs: boolean;
    }
    export const GPidSearchResolverSslAgendInfo: GPidSearchResolverFazeATypyAgendInfo;
    export const GPidSearchResolverFazeATypyAgend: GPidSearchResolverFazeATypyAgendInfo[];
    export function najdiFaziProTypAgendy(typAgendyIdentifikatoru: number): string | undefined;
    export function createIconTemplate(coJsemZac: Wfl.Interface.GIdentifikatorCoJsemZac | undefined | null): IconTemplate;
    export function createIconTemplateWflspid2(coJsemZac: Wfl.Interface.GIdentifikatorCoJsemZac | undefined | null, typ_entity_ico: Wfl.Interface.TypEntityIco | undefined | null): IconTemplate;
    export function createIconTemplateWflspid(item: Wfl.Interface.GWflspidDto | undefined | null): IconTemplate;
    export function createOpenWflDetailInCurrentModule(ixp: string): GAction;
    export function lzeOtevritIdentifikatorVeFazi(faze: string, typAgendyIdentifikatoru: number): boolean;
    export function createItemInformationTable(texts: Wfl.Interface.GIdentifikatorDalsiInformaceDto[]): string;
    /**
     * Resolver hledající identifikátory (PID - ixp, ixs, ixx, ...).
     *
     * @author TFeik
     * @since 482.1.0.241
     */
    export class GPidSearchResolver extends Components.Search.GBaseSearchResolver<GPidSearchResolverInputParams> {
        readonly typeGuesser: Utils.GTypeGuesser;
        readonly usu = "GWAUSU05";
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
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: Components.Search.IGSearchInput, task: Components.Search.GSearchResolveTask): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], any, never, never, never, never, never, never, never, never, never, never>;
        active(this: this & GEvents, opts: Components.Search.IGSetResolverOptions): void;
    }
    export interface GCisloJednaciSearchResolverInputParams extends Components.Search.IGSearchResolverOptions {
        /**
         * Funkce, pro možnost nastavit vlastní výchozí hodnoty čísla jednacího (například deník dle aktuálně vybraného deníku, či rok dle roku ve kterém máme aplikaci).
         * (Příklad: { Rok: 2020 })
         *
         * Pokud chcete uživatele donutit vyplnit některé údaje, pak do příslušné property výchozích hodnot vraťte undefined.
         * (Příklad: { Rok: undefined } pokud chceme aby uživatel musel vyplnit rok.)
         *
         * Default: {
         *      Rok: Aktuální rok (new Date()).getFullYear(),
         *      Pořadové číslo: 1,
         *      Deník: První položka dat readeru Gordic.Data.Readers.Sslsden
         * }
         */
        getDefaults?: () => JQuery.Promise<Wfl.Interface.GHledejCisloJednaciRequestDto>;
    }
    /**
     * Resolver hledající Číslo jednací.
     *
     * @author  TFeik
     * @date    30.04.2020
     * @since   482.1.0.241
     */
    export class GCisloJednaciSearchResolver extends Components.Search.GBaseSearchResolver<GCisloJednaciSearchResolverInputParams> {
        readonly typeGuesser: Utils.GTypeGuesser;
        /**
         * Regex pro rozparsování čísla jednacího. Všechny části jsou nepovinné a oddělené non-word znaky.
         * U deníku byl problém se zápisem ÚNM a proto je tam i onen "humus" viz. https://stackoverflow.com/questions/20690499/concrete-javascript-regex-for-accented-characters-diacritics
         * Možná by bylo lepší použít w (word) což bude pořeba v případě, kdy v návu deníku mže být číslo.
         *
         * @type {RegExp}
         */
        readonly regex: RegExp;
        defaultsTemp?: Wfl.Interface.GHledejCisloJednaciRequestDto;
        private getDefaults;
        private guessYearInput;
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
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], any, never, never, never, never, never, never, never, never, never, never>;
    }
    export interface GSpisovaZnackaSearchResolverInputParams extends Components.Search.IGSearchResolverOptions {
        /**
         * Funkce, pro možnost nastavit vlastní výchozí hodnoty čísla jednacího (například deník dle aktuálně vybraného deníku, či rok dle roku ve kterém máme aplikaci).
         * (Příklad: { Rok: 2020 })
         *
         * Pokud chcete uživatele donutit vyplnit některé údaje, pak do příslušné property výchozích hodnot vraťte undefined.
         * (Příklad: { Rok: undefined } pokud chceme aby uživatel musel vyplnit rok.)
         *
         * Default: {
         *      Rok: Aktuální rok (new Date()).getFullYear(),
         *      Pořadové číslo: 1,
         *      Deník: První položka dat readeru Gordic.Data.Readers.Sslsden
         * }
         */
        getDefaults?: () => JQuery.Promise<Wfl.Interface.GHledejCisloJednaciRequestDto>;
    }
    /**
     * Resolver hledající Spisovou značkou.
     *
     * @author  TFeik
     * @date    30.04.2020
     * @since   484.2.0.713
     */
    export class GSpisovaZnackaSearchResolver extends Components.Search.GBaseSearchResolver<GSpisovaZnackaSearchResolverInputParams> {
        readonly typeGuesser: Utils.GTypeGuesser;
        /**
         * Regex pro rozparsování čísla jednacího. Všechny části jsou nepovinné a oddělené non-word znaky.
         * U deníku byl problém se zápisem ÚNM a proto je tam i onen "humus" viz. https://stackoverflow.com/questions/20690499/concrete-javascript-regex-for-accented-characters-diacritics
         * Možná by bylo lepší použít w (word) což bude pořeba v případě, kdy v návu deníku mže být číslo.
         *
         * @type {RegExp}
         */
        readonly regex: RegExp;
        defaultsTemp?: Wfl.Interface.GHledejCisloJednaciRequestDto;
        private getDefaults;
        private guessYearInput;
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
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], any, never, never, never, never, never, never, never, never, never, never>;
    }
    export {};
}
declare namespace Gordic.Search {
    /**
     * Resolver hledající dokument v úrovni wfl.
     *
     * @author  TFeik
     * @date    04.01.2020
     */
    class GDokumentWflSearchResolver extends Components.Search.GBaseSearchResolver {
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
         * fuzzySearchOnObjectConfidence
         *
         * @param {string} textInput
         * @param {Wfl.Interface.GWflspidFulltextDto} item
         * @returns {number}
         */
        private fuzzySearchOnObjectConfidence;
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.Promise<Components.Search.IGSearchResolverItem[]>;
    }
}
declare namespace Gordic.Search {
    /**
     * Resolver hledající součást.
     *
     * @author  TFeik
     * @date    21.03.2025
     */
    class GSoucastSearchResolver extends Components.Search.GBaseSearchResolver {
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
         * fuzzySearchOnObjectConfidence
         *
         * @param {string} textInput
         * @param {Wfl.Interface.GWflspidFulltextDto} item
         * @returns {number}
         */
        private fuzzySearchOnObjectConfidence;
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.Promise<Components.Search.IGSearchResolverItem[]>;
    }
}
declare namespace Gordic.Search {
    /**
     * Resolver hledající spis v úrovni wfl.
     *
     * @author  TFeik
     * @date    04.01.2020
     */
    class GSpisWflSearchResolver extends Components.Search.GBaseSearchResolver {
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
         * fuzzySearchOnObjectConfidence
         *
         * @param {string} textInput
         * @param {Wfl.Interface.GWflspidFulltextDto} item
         * @returns {number}
         */
        private fuzzySearchOnObjectConfidence;
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.Promise<Components.Search.IGSearchResolverItem[]>;
    }
}
declare namespace Gordic.Search {
    /**
     * Resolver hledající spis v úrovni wfl.
     *
     * @author  TFeik
     * @date    04.01.2020
     */
    class GTypovySpisWflSearchResolver extends Components.Search.GBaseSearchResolver {
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
         * fuzzySearchOnObjectConfidence
         *
         * @param {string} textInput
         * @param {Wfl.Interface.GWflspidFulltextDto} item
         * @returns {number}
         */
        private fuzzySearchOnObjectConfidence;
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.Promise<Components.Search.IGSearchResolverItem[]>;
    }
}
declare namespace Gordic.Search {
    /**
     * Resolver hledající zásilky dle PIDu (sxs, id_dorucenky).
     *
     * @author TFeik
     * @since 482.1.0.168
     */
    class GZasilkaSearchResolver extends Components.Search.GBaseSearchResolver {
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
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Wfl.IxsUtils {
    /**
     * Funkce pro otevření mimoagendových detailu
     *
     * @auth tfeik
     * @date 12.03.2018
     *
     * @param {Gordic.Gin.Interface.GHledaniIxsInfoDto} dto
     * @returns
     */
    function OtevriDetail(dto: Gordic.Gin.Interface.GHledaniIxsInfoDto): JQuery.Promise<Gordic.Gin.Interface.RetFromOtevriDetailDto>;
    /**
     * funkce pro oveření zda se nemá dané ixs otevřít v aktualní agendě
     * @param {Gordic.Gin.Interface.GHledaniIxsInfoDto} dto
     * @returns
     */
    function OvereniZdaMaPrednostOtevreniVAktualniFazy(dto: Gordic.Gin.Interface.GHledaniIxsInfoDto): boolean;
    /**
     * otevreni v USU
     * @param {Gordic.Gin.Interface.GHledaniIxsInfoDto} dto
     * @returns
     */
    function USUDetail(dto: Gordic.Gin.Interface.GHledaniIxsInfoDto): JQuery.Promise<Gordic.Gin.Interface.RetFromOtevriDetailDto>;
    /**
     * otevri ve FUC
     * @param {Gordic.Gin.Interface.GHledaniIxsInfoDto} dto
     * @returns
     */
    function FUCDetail(dto: Gordic.Gin.Interface.GHledaniIxsInfoDto): JQuery.Promise<Gordic.Gin.Interface.RetFromOtevriDetailDto>;
    function DetailGeneral(faze: string, dto: Gordic.Gin.Interface.GHledaniIxsInfoDto): JQuery.Promise<Gordic.Gin.Interface.RetFromOtevriDetailDto>;
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * GHistorieZmenColumnNames
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    type GHistorieZmenColumnNames = 'ixp' | 'por_cislo' | 'zmena' | 'zmena_ext' | 'zmena_txt' | 'zmena_ktg' | 'poznamka' | 'dat_zmena' | 'zmenu_prov' | 'typ_ag' | 'ZmenuProvedl' | 'Dokument';
    /**
     * GHistorieZmenFieldNames
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    type GHistorieZmenFieldNames = 'ixp' | 'por_cislo' | 'zmena' | 'zmena_ext' | 'zmena_txt' | 'zmena_ktg' | 'poznamka' | 'dat_zmena' | 'zmenu_prov' | 'typ_ag';
    /**
     * GHistorieZmenIsl
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    class GHistorieZmenIsl {
        /**
         * Init
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Gin.WebClient.Names<GHistorieZmenColumnNames>} columns
         * @param {Gin.WebClient.Names<GHistorieZmenFieldNames>} fields
         * @returns {JQuery.Promise<void>}
         */
        static Init(columns: Gin.WebClient.Names<GHistorieZmenColumnNames>, fields: Gin.WebClient.Names<GHistorieZmenFieldNames>): JQuery.Promise<void>;
        /**
         * IsInitiated
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Gin.WebClient.Names<GHistorieZmenColumnNames>} columns
         * @param {Gin.WebClient.Names<GHistorieZmenFieldNames>} fields
         * @returns {boolean}
         */
        static IsInitiated(columns: Gin.WebClient.Names<GHistorieZmenColumnNames>, fields: Gin.WebClient.Names<GHistorieZmenFieldNames>): boolean;
        /**
         * CanAddColumn
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {GHistorieZmenColumnNames} column
         * @param {GHistorieZmenColumnNames[] | 'all' | undefined | null | false} columns
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddColumn;
        /**
         * addGridFormat<TRow = Interface.GWflhpisDto>
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ gridFormat: Data.GridFormat<TRow>, addMode: Gin.WebClient.AddMode, columns?: GHistorieZmenColumnNames[] | 'all'} input
         * @returns {Data.GridFormat<TRow>}
         */
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GWflhpisDto>
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GWflhpisDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GHistorieZmenColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GHistorieZmenColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GHistorieZmenIsl pomocí fukce GHistorieZmenIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GHistorieZmenColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static CreateSubcolumnName(scope: Interface.GWflhpisDtoNames.ZmenuProvedl, subentityColumnName: Gin.WebClient.GZmenuProvedlColumnNames): GHistorieZmenColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflhpisDtoNames.Dokument, subentityColumnName: Wfl.WebClient.GWflspidColumnNames): GHistorieZmenColumnNames;
        /**
         * AddFilterFields
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GHistorieZmenFieldNames[] | 'all' | null} input
         * @returns {JQuery.Promise<Forms.Form>}
         */
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GHistorieZmenFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        /**
         * AddFilterFieldsImmediate
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GHistorieZmenFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GHistorieZmenFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        /**
         * createFilterForm
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Forms.Form | null} [form]
         * @param {any | null} [initialValues]
         * @param {GHistorieZmenFieldNames[] | 'all' | null} [fields]
         * @param {Gin.WebClient.GScopeOptions | null} [scope]
         * @returns {Forms.Form}
         */
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GHistorieZmenFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        /**
         * CanAddField
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {GHistorieZmenFieldNames} fieldName
         * @param {Gin.WebClient.Names<GHistorieZmenFieldNames>} fields
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddField;
        /**
         * addFilterForm
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ form: Forms.Form, initialValues?: any | null, fields?: GHistorieZmenFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GHistorieZmenFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
    }
    type GHistorieZmenSubentityNames = Interface.GWflhpisDtoNames.ZmenuProvedl | Interface.GWflhpisDtoNames.Dokument;
}
declare namespace Gordic.Wfl.WebClient {
    class GMetadataSpis {
        createReportSpis(cnt: GContentType<any>, ixpSpisArr: string[]): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * GProfilDoruceniColumnNames
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    type GProfilDoruceniColumnNames = 'ixp' | 'znacka_odes';
    /**
     * GProfilDoruceniFieldNames
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    type GProfilDoruceniFieldNames = 'ixp' | 'znacka_odes';
    /**
     * GProfilDoruceniIsl
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    class GProfilDoruceniIsl {
        /**
         * Init
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Wfl.WebClient.Names<GProfilDoruceniColumnNames>} columns
         * @param {Wfl.WebClient.Names<GProfilDoruceniFieldNames>} fields
         * @returns {JQuery.Promise<void>}
         */
        static Init(columns: Gin.WebClient.Names<GProfilDoruceniColumnNames>, fields: Gin.WebClient.Names<GProfilDoruceniFieldNames>): JQuery.Promise<void>;
        /**
         * IsInitiated
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Gin.WebClient.Names<GProfilDoruceniColumnNames>} columns
         * @param {Gin.WebClient.Names<GProfilDoruceniFieldNames>} fields
         * @returns {boolean}
         */
        static IsInitiated(columns: Gin.WebClient.Names<GProfilDoruceniColumnNames>, fields: Gin.WebClient.Names<GProfilDoruceniFieldNames>): boolean;
        /**
         * CanAddColumn
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {GProfilDoruceniColumnNames} column
         * @param {GProfilDoruceniFieldNames[] | 'all' } columns
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddColumn;
        /**
         * addGridFormat<TRow = Interface.GWflhpisDto>
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ gridFormat: Data.GridFormat<TRow>, addMode: Gin.WebClient.AddMode, columns?: GProfilDoruceniColumnNames[] | 'all'} input
         * @returns {Data.GridFormat<TRow>}
         */
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GWflhpisDto>
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GProfilDoruceniDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GProfilDoruceniColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GProfilDoruceniColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GProfilDoruceniIsl pomocí fukce GProfilDoruceniIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GProfilDoruceniColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * AddFilterFields
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GProfilDoruceniFieldNames[] | 'all' | null} input
         * @returns {JQuery.Promise<Forms.Form>}
         */
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GProfilDoruceniFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        /**
         * AddFilterFieldsImmediate
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GProfilDoruceniFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GProfilDoruceniFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        /**
         * createFilterForm
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Forms.Form | null} [form]
         * @param {any | null} [initialValues]
         * @param {GProfilDoruceniFieldNames[] | 'all' | null} [fields]
         * @param {Gin.WebClient.GScopeOptions | null} [scope]
         * @returns {Forms.Form}
         */
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GProfilDoruceniFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        /**
         * CanAddField
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {GProfilDoruceniFieldNames} fieldName
         * @param {Gin.WebClient.Names<GProfilDoruceniFieldNames>} fields
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddField;
        /**
         * addFilterForm
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ form: Forms.Form, initialValues?: any | null, fields?: GProfilDoruceniFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GProfilDoruceniFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * GRedistribuceColumnNames
     *
     * @author  TFeik
     * @date    29.03.2022
     * @since   488.1.0.83
     */
    type GRedistribuceColumnNames = 'ixp' | 'lic' | 'ucel_dist' | 'ucel_dist_txt' | 'ixs_fun_start' | 'ixs_su_start' | 'ixs_fun_akt' | 'ixs_su_akt' | 'ixs_su_do' | 'nazev_su_do' | 'ixs_fun_cil' | 'nazev_rf_cil' | 'ixs_su_cil' | 'nazev_su_cil' | 'dat_start' | 'spis_graf' | 'dat_zmena' | 'zmenu_prov' | 'typ_vlast' | 'ixs_lpc';
    /**
     * GRedistribuceFieldNames
     *
     * @author  TFeik
     * @date    29.03.2022
     * @since   488.1.0.83
     */
    type GRedistribuceFieldNames = 'ixp' | 'lic' | 'ucel_dist' | 'ucel_dist_txt' | 'ixs_fun_start' | 'ixs_su_start' | 'ixs_fun_akt' | 'ixs_su_akt' | 'ixs_su_do' | 'nazev_su_do' | 'ixs_fun_cil' | 'nazev_rf_cil' | 'ixs_su_cil' | 'nazev_su_cil' | 'dat_start' | 'spis_graf' | 'dat_zmena' | 'zmenu_prov' | 'typ_vlast' | 'ixs_lpc';
    /**
     * GRedistribuceIsl
     *
     * @author  TFeik
     * @date    29.03.2022
     * @since   488.1.0.83
     */
    class GRedistribuceIsl {
        /**
         * Init
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {Gin.WebClient.Names<GRedistribuceColumnNames>} columns
         * @param {Gin.WebClient.Names<GRedistribuceFieldNames>} fields
         * @returns {JQuery.Promise<void>}
         */
        static Init(columns: Gin.WebClient.Names<GRedistribuceColumnNames>, fields: Gin.WebClient.Names<GRedistribuceFieldNames>): JQuery.Promise<void>;
        /**
         * IsInitiated
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {Gin.WebClient.Names<GRedistribuceColumnNames>} columns
         * @param {Gin.WebClient.Names<GRedistribuceFieldNames>} fields
         * @returns {boolean}
         */
        static IsInitiated(columns: Gin.WebClient.Names<GRedistribuceColumnNames>, fields: Gin.WebClient.Names<GRedistribuceFieldNames>): boolean;
        /**
         * CanAddColumn
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {GRedistribuceColumnNames} column
         * @param {GRedistribuceColumnNames[] | 'all' | undefined | null | false} columns
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddColumn;
        /**
         * addGridFormat<TRow = Interface.GWflstopDto>
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {{ gridFormat: Data.GridFormat<TRow>, addMode: Gin.WebClient.AddMode, columns?: GRedistribuceColumnNames[] | 'all'} input
         * @returns {Data.GridFormat<TRow>}
         */
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GWflstopDto>
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GWflstopDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GRedistribuceColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GRedistribuceColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GRedistribuceIsl pomocí fukce GRedistribuceIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GRedistribuceColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static CreateSubcolumnName(scope: Interface.GWflstopDtoNames.FunkcniMistoStart, // asi spis GWflhtopDtoNames
        subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GRedistribuceColumnNames;
        /**
         * AddFilterFields
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GRedistribuceFieldNames[] | 'all' | null} input
         * @returns {JQuery.Promise<Forms.Form>}
         */
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GRedistribuceFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        /**
         * AddFilterFieldsImmediate
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GRedistribuceFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GRedistribuceFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        /**
         * createFilterForm
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {Forms.Form | null} [form]
         * @param {any | null} [initialValues]
         * @param {GRedistribuceFieldNames[] | 'all' | null} [fields]
         * @param {Gin.WebClient.GScopeOptions | null} [scope]
         * @returns {Forms.Form}
         */
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GRedistribuceFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        /**
         * CanAddField
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {GRedistribuceFieldNames} fieldName
         * @param {Gin.WebClient.Names<GRedistribuceFieldNames>} fields
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddField;
        /**
         * addFilterForm
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {{ form: Forms.Form, initialValues?: any | null, fields?: GRedistribuceFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GRedistribuceFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        /**
         * Vrátí IconTemplate pro Wflcvla.
         *
         * @author  TFeik
         * @date    29.03.2022
         *
         * @param {Gordic.Ginis.DbModel.GGincaktEnum | null} [value]
         * @returns {IconTemplate}
         */
        static GetWflcvlaEnumIconTemplate(value?: Gordic.Ginis.DbModel.GWflcvlaEnum | null): IconTemplate;
    }
    type GRedistribuceSubentityNames = Interface.GWflstopDtoNames.FunkcniMistoStart | Interface.GWflstopDtoNames.FunkcniMistoCil;
}
declare namespace Gordic.Wfl.WebClient {
    type GSkartacniZnakColumnNames = 'skar_znak' | 'skar_znak_txt' | 'k_v' | 'k_s' | 'skar_znak_zkr' | 'priorita' | 'skar_znak_rsx';
    type GSkartacniZnakFieldNames = 'skar_znak' | 'skar_znak_txt' | 'k_v' | 'k_s' | 'skar_znak_zkr' | 'priorita' | 'skar_znak_rsx';
    class GSkartacniZnakIsl {
        static Init(columns: Gin.WebClient.Names<GSkartacniZnakColumnNames>, fields: Gin.WebClient.Names<GSkartacniZnakFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Gin.WebClient.Names<GSkartacniZnakColumnNames>, fields: Gin.WebClient.Names<GSkartacniZnakFieldNames>): boolean;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GSkartacniZnakDto>
         *
         * @author  TFeik
         * @date    07.12.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GSkartacniZnakDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GSkartacniZnakColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  TFeik
         * @date    07.12.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GSkartacniZnakColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GSkartacniZnakIsl pomocí fukce GSkartacniZnakIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    07.12.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GSkartacniZnakColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GSkartacniZnakFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GSkartacniZnakFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GSkartacniZnakFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GSkartacniZnakFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Wfl.WebClient {
    type GSpisovyPlanColumnNames = 'spis_pl' | 'lic' | 'aktivita' | 'arw' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'nazev' | 'popis' | 'priz_vycet' | 'oddelovace' | 'prirustek' | 'priz_num' | 'priz_manual' | 'priz_check_lev' | 'root_level' | 'priz_end_znak' | 'ixs_tre' | 'spis_pl_ext';
    type GSpisovyPlanFieldNames = 'spis_pl' | 'lic' | 'aktivita' | 'arw' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'nazev' | 'popis' | 'priz_vycet' | 'oddelovace' | 'prirustek' | 'priz_num' | 'priz_manual' | 'priz_check_lev' | 'root_level' | 'priz_end_znak' | 'ixs_tre' | 'spis_pl_ext';
    class GSpisovyPlanIsl {
        static Init(columns: Gin.WebClient.Names<GSpisovyPlanColumnNames>, fields: Gin.WebClient.Names<GSpisovyPlanFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Gin.WebClient.Names<GSpisovyPlanColumnNames>, fields: Gin.WebClient.Names<GSpisovyPlanFieldNames>): boolean;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GSpisovyPlanDto>
         *
         * @author  TFeik
         * @date    08.12.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GSpisovyPlanDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GSpisovyPlanColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  TFeik
         * @date    08.12.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GSpisovyPlanColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GSpisovyPlanIsl pomocí fukce GSpisovyPlanIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    08.12.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GSpisovyPlanColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GSpisovyPlanFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GSpisovyPlanFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GSpisovyPlanFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GSpisovyPlanFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Wfl.WebClient {
    type GSpisovyZnakColumnNames = 'spis_pl' | 'spis_znak' | 'lic' | 'aktivita' | 'arw' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'nazev' | 'skar_znak' | 'skar_lhuta' | 'popis' | 'skar_lhuta_spra' | 'priz_zded' | 'typ_spis_z' | 'spis_znak_ext' | 'priz_usr' | 'spis_znak_nad' | 'num_pod' | 'spis_znak_norm' | 'prirustek' | 'priz_trvskar' | 'spis_pl_nas' | 'spis_znak_nas' | 'ixs_spu' | 'ixs_szn' | 'urceni_spis_z' | 'priz_poz_skar' | 'duvod_poz_skar' | 'ixs_zmp_poz_skar' | 'dat_poz_skar';
    type GSpisovyZnakFieldNames = 'spis_pl' | 'spis_znak' | 'lic' | 'aktivita' | 'arw' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'nazev' | 'skar_znak' | 'skar_lhuta' | 'popis' | 'skar_lhuta_spra' | 'priz_zded' | 'typ_spis_z' | 'spis_znak_ext' | 'priz_usr' | 'spis_znak_nad' | 'num_pod' | 'spis_znak_norm' | 'prirustek' | 'priz_trvskar' | 'spis_pl_nas' | 'spis_znak_nas' | 'ixs_spu' | 'ixs_szn' | 'urceni_spis_z' | 'priz_poz_skar' | 'duvod_poz_skar' | 'ixs_zmp_poz_skar' | 'dat_poz_skar';
    class GSpisovyZnakIsl {
        static Init(columns: Gin.WebClient.Names<GSpisovyZnakColumnNames>, fields: Gin.WebClient.Names<GSpisovyZnakFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Gin.WebClient.Names<GSpisovyZnakColumnNames>, fields: Gin.WebClient.Names<GSpisovyZnakFieldNames>): boolean;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GSpisovyZnakDto>
         *
         * @author  TFeik
         * @date    07.12.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GSpisovyZnakDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GSpisovyZnakColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  TFeik
         * @date    07.12.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GSpisovyZnakColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GSpisovyZnakIsl pomocí fukce GSpisovyZnakIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    07.12.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GSpisovyZnakColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GSpisovyZnakFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GSpisovyZnakFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GSpisovyZnakFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GSpisovyZnakFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Wfl.WebClient {
    type GUzivatelskaPoznamkaColumnNames = 'ixp' | 'ixs' | 'poznamka' | 'dat_zmena' | 'zmenu_prov' | 'poznamka_editace';
    type GUzivatelskaPoznamkaFieldNames = 'ixp' | 'ixs' | 'poznamka' | 'dat_zmena' | 'zmenu_prov';
    class GUzivatelskaPoznamkaIsl {
        static Init(columns: Gin.WebClient.Names<GUzivatelskaPoznamkaColumnNames>, fields: Gin.WebClient.Names<GUzivatelskaPoznamkaFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Gin.WebClient.Names<GUzivatelskaPoznamkaColumnNames>, fields: Gin.WebClient.Names<GUzivatelskaPoznamkaFieldNames>): boolean;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GUzivatelskaPoznamkaDto>
         *
         * @author  TFeik
         * @date    17.12.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GUzivatelskaPoznamkaDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GUzivatelskaPoznamkaColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  TFeik
         * @date    17.12.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GUzivatelskaPoznamkaColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Globals.ListSupport.IGroupResultProvider): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GUzivatelskaPoznamkaIsl pomocí fukce GUzivatelskaPoznamkaIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    17.12.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GUzivatelskaPoznamkaColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GUzivatelskaPoznamkaFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GUzivatelskaPoznamkaFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GUzivatelskaPoznamkaFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GUzivatelskaPoznamkaFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * GWfldulpColumnNames
     *
     * @author  TFeik
     * @date    15.03.2023
     * @since   488.1.0.788
     */
    type GWfldulpColumnNames = 'ixp' | 'ulozeno_listu' | 'ulozeno_nl_priloh' | 'dat_zmena' | 'zmenu_prov';
    /**
     * GWfldulpFieldNames
     *
     * @author  TFeik
     * @date    15.03.2023
     * @since   488.1.0.788
     */
    type GWfldulpFieldNames = 'ixp' | 'ulozeno_listu' | 'ulozeno_nl_priloh' | 'dat_zmena' | 'zmenu_prov';
    /**
     * GWfldulpIsl
     *
     * @author  TFeik
     * @date    15.03.2023
     * @since   488.1.0.788
     */
    class GWfldulpIsl {
        /**
         * Init
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {Gin.WebClient.Names<GWfldulpColumnNames>} columns
         * @param {Gin.WebClient.Names<GWfldulpFieldNames>} fields
         * @returns {JQuery.Promise<void>}
         */
        static Init(columns: Gin.WebClient.Names<GWfldulpColumnNames>, fields: Gin.WebClient.Names<GWfldulpFieldNames>): JQuery.Promise<void>;
        /**
         * IsInitiated
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {Gin.WebClient.Names<GWfldulpColumnNames>} columns
         * @param {Gin.WebClient.Names<GWfldulpFieldNames>} fields
         * @returns {boolean}
         */
        static IsInitiated(columns: Gin.WebClient.Names<GWfldulpColumnNames>, fields: Gin.WebClient.Names<GWfldulpFieldNames>): boolean;
        /**
         * CanAddColumn
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {GWfldulpColumnNames} column
         * @param {GWfldulpColumnNames[] | 'all' | undefined | null | false} columns
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddColumn;
        /**
         * addGridFormat<TRow = Interface.GWfldulpDto>
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {Data.GridFormat<TRow>} gridFormat
         * @param {Gin.WebClient.AddMode} addMode
         * @param {GWfldulpColumnNames[] | 'all'} [columns]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GWfldulpDto>
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GWfldulpDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GWfldulpColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GWfldulpColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GWfldulpIsl pomocí fukce GWfldulpIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GWfldulpColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * AddFilterFields
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GWfldulpFieldNames[] | 'all' | null} input
         * @returns {JQuery.Promise<Forms.Form>}
         */
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GWfldulpFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        /**
         * AddFilterFieldsImmediate
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GWfldulpFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GWfldulpFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        /**
         * createFilterForm
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {Forms.Form | null} [form]
         * @param {any | null} [initialValues]
         * @param {GWfldulpFieldNames[] | 'all' | null} [fields]
         * @param {Gin.WebClient.GScopeOptions | null} [scope]
         * @returns {Forms.Form}
         */
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GWfldulpFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        /**
         * CanAddField
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {GWfldulpFieldNames} fieldName
         * @param {Gin.WebClient.Names<GWfldulpFieldNames>} fields
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddField;
        /**
         * addFilterForm
         *
         * @author  TFeik
         * @date    15.03.2023
         *
         * @param {{ form: Forms.Form, initialValues?: any | null, fields?: GWfldulpFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GWfldulpFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Wfl.WebClient {
    type GWflhupiColumnNames = 'ixp' | 'por_cislo' | 'ixs_fun_od' | 'ixs_su_od' | 'ixs_zmp_od' | 'ixs_fun_do' | 'ixs_su_do' | 'ixs_zmp_do' | 'stav_dist' | 'akt_znacka' | 'typ_upi' | 'dat_zmena' | 'zmenu_prov' | 'priz_spis' | 'typ_vlast' | 'dat_mpd' | 'typ_ag' | 'ixs_lpc' | 'FunkcniMistoOd' | 'FunkcniMistoDo' | 'SpisovyUzelOd' | 'SpisovyUzelDo' | 'ZmenuProvedl';
    type GWflhupiFieldNames = 'ixp' | 'por_cislo' | 'ixs_fun_od' | 'ixs_su_od' | 'ixs_fun_do' | 'ixs_su_do' | 'stav_dist' | 'akt_znacka' | 'typ_upi' | 'dat_zmena' | 'priz_spis' | 'typ_vlast' | 'typ_ag';
    class GWflhupiIsl {
        private static IconColumnEnums?;
        static Init(columns: Gin.WebClient.Names<GWflhupiColumnNames>, fields: Gin.WebClient.Names<GWflhupiFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Gin.WebClient.Names<GWflhupiColumnNames>, fields: Gin.WebClient.Names<GWflhupiFieldNames>): boolean;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GWflhupiDto>
         *
         * @author  RTomes
         * @date    08.06.2023
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GWflhupiDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GWflhupiColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  RTomes
         * @date    08.06.2023
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GWflhupiColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GSpisovyPlanIsl pomocí fukce GSpisovyPlanIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  RTomes
         * @date    08.06.2023
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GWflhupiColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GWflhupiFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GWflhupiFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GWflhupiFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GWflhupiFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        static CreateSubcolumnName(scope: Interface.GWflhupiDtoNames.FunkcniMistoOd, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GWflhupiColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflhupiDtoNames.FunkcniMistoDo, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GWflhupiColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflhupiDtoNames.SpisovyUzelOd, subentityColumnName: Gin.WebClient.GSpisovyUzelColumnNames): GWflhupiColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflhupiDtoNames.SpisovyUzelDo, subentityColumnName: Gin.WebClient.GSpisovyUzelColumnNames): GWflhupiColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflhupiDtoNames.ZmenuProvedl, subentityColumnName: Gin.WebClient.GZmenuProvedlColumnNames): GWflhupiColumnNames;
    }
    type GWflhupiSubentityNames = Interface.GWflhupiDtoNames.FunkcniMistoOd | Interface.GWflhupiDtoNames.FunkcniMistoDo | Interface.GWflhupiDtoNames.SpisovyUzelOd | Interface.GWflhupiDtoNames.SpisovyUzelDo | Interface.GWflhupiDtoNames.ZmenuProvedl;
}
declare namespace Gordic.Wfl.WebClient {
    interface IconColumnEnums {
        wflcumpEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcumpEnum, Ginis.DbModel.GWflcumpDto>[];
        wflctddEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflctddEnum, Ginis.DbModel.GWflctddDto>[];
        wflcpriEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcpriEnum, Ginis.DbModel.GWflcpriDto>[];
        wflcstaEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcstaEnum, Ginis.DbModel.GWflcstaDto>[];
        wflcstpEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcstpEnum, Ginis.DbModel.GWflcstpDto>[];
        sslcspiEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GSslcspiEnum, Ginis.DbModel.GSslcspiDto>[];
        wflcsprEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcsprEnum, Ginis.DbModel.GWflcsprDto>[];
        wflcsslEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcsslEnum, Ginis.DbModel.GWflcsslDto>[];
        wflceleEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflceleEnum, Ginis.DbModel.GWflceleDto>[];
        wflcfyzEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcfyzEnum, Ginis.DbModel.GWflcfyzDto>[];
        wflcsgnEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcsgnEnum, Ginis.DbModel.GWflcsgnDto>[];
        wflcpcjEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcpcjEnum, Ginis.DbModel.GWflcpcjDto>[];
        wflcpuvEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcpuvEnum, Ginis.DbModel.GWflcpuvDto>[];
        gincstuEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GGincstuEnum, Ginis.DbModel.GGincstuDto>[];
        wflctysEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflctysEnum, Ginis.DbModel.GWflctysDto>[];
        wflcscjEnumValues?: Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcscjEnum, Ginis.DbModel.GWflcscjDto>[];
    }
    type GWflspidColumnNames = 'ixp' | 'lic' | 'rok' | 'pozice_spis_ico' | 'termin_ico' | 'priz_cj_old' | 'dat_vyriz_do' | 'dat_dtermin' | 'dat_dtermin_ico' | 'stav_epk_txt' | 'status_pis' | 'typ_duv_del' | 'ixp_spis' | 'priz_spis' | 'ixs_fun_akt' | 'ixs_su_akt' | 'nazev' | 'akt_znacka' | 'stav_dist' | 'stav_pis' | 'typ_ag' | 'ktg_typ' | 'ixs_typ' | 's_prij' | 's_ssl' | 'dat_zmena' | 'zmenu_prov' | 's_ele' | 's_fyz' | 'misto_vzniku' | 's_sgn' | 'dat_pod' | 'priz_view_ssl' | 'uzo' | 'spis_pl' | 'spis_znak' | 'ixs_fun_wfl' | 's_uloz' | 'dat_uloz' | 'ixs_su_wfl' | 's_odes' | 'priz_cj' | 'dat_vyriz' | 'ixs_cj' | 'puvod' | 's_schval' | 'umisteni' | 'st_utaj_id' | 'st_utaj_id_orig' | 'skar_znak' | 'skar_lhuta' | 'rok_spo_uda' | 'ixp_top' | 'typ_spis' | 'barcode' | 'skar_lhuta_spra' | 'ixs_ext' | 'rok_skartace' | 'ixs_spu' | 'poc_listu' | 'poc_stran' | 'poc_kop' | 'poc_priloh' | 'poc_l_priloh' | 'cj' | 'ico' | 'StavSul' | 'PrizSkn' | 'PrizVyp' | 'PrizVBaliku' | 'ixs_zup' | 'Rak' | 'PopisSpoUda' | 'DuvodPozSkar' | 'PrizPozSkar' | 'RokDoPozSkar' | 'StavPisSpis' | 'dat_mpd0' | 'ixs_lpc' | 'ixs_vsk' | 'uziv_sl_a' | 'uziv_sl_a2' | 'uziv_sl_a3' | 'uziv_sl_b' | 'uziv_sl_b2' | 'uziv_sl_b3' | 'uziv_sl_c' | 'uziv_sl_c2' | 'uziv_sl_d' | 'uziv_sl_d2' | 'uziv_sl_j' | 'uziv_sl_j2' | 'uziv_sl_k' | 'uziv_sl_k2' | 'uziv_sl_n' | 'typ_entity_ico' | 'technicke_vlastnosti_ico' | 'stav_zpracovani_ico' | 'doplnujici_informace_ico' | 'priz_kopie' | 'ZpVyrizTxtDleIxsCj' | 'ico_status' | 'vlastnictvi_doruceni_ico' | 'dat_vyriz_do_sslsdcj' | 'TerminVyrizeni' | 'Nazev__sslstyp' | 'Predano__uzlu' | 'Predano__osobe' | 'Predano__od__osoby' | 'vlastnik' | 'StavVytezezniElektronickehoObrazu' | 'IdSkartrizNda';
    type GWflspidFieldNames = 'ixp' | 'lic' | 'rok' | 'status_pis' | 'typ_duv_del' | 'ixp_spis' | 'priz_spis' | 'ixs_fun_akt' | 'ixs_su_akt' | 'nazev' | 'akt_znacka' | 'stav_dist' | 'stav_pis' | 'typ_ag' | 'ktg_typ' | 'ixs_typ' | 's_prij' | 's_ssl' | 'dat_zmena' | 'zmenu_prov' | 's_ele' | 's_fyz' | 'misto_vzniku' | 's_sgn' | 'dat_pod' | 'priz_view_ssl' | 'uzo' | 'spis_pl' | 'spis_znak' | 'ixs_fun_wfl' | 's_uloz' | 'dat_uloz' | 'ixs_su_wfl' | 's_odes' | 'priz_cj' | 'dat_vyriz' | 'ixs_cj' | 'puvod' | 's_schval' | 'umisteni' | 'st_utaj_id' | 'st_utaj_id_orig' | 'skar_znak' | 'skar_lhuta' | 'rok_spo_uda' | 'ixp_top' | 'typ_spis' | 'barcode' | 'skar_lhuta_spra' | 'ixs_ext' | 'rok_skartace' | 'ixs_spu' | 'poc_listu' | 'poc_stran' | 'poc_kop' | 'poc_priloh' | 'poc_l_priloh' | 'cj' | 'ico' | /*'StavSul' | 'PrizSkn' | 'PrizVyp' | 'priz_v_baliku' |*/ 'ixs_zup' | 'ixs_vsk' | 'dat_mpd0' | 'ixs_lpc' | 'uziv_sl_a' | 'uziv_sl_a2' | 'uziv_sl_a3' | 'uziv_sl_b' | 'uziv_sl_b2' | 'uziv_sl_b3' | 'uziv_sl_c' | 'uziv_sl_c2' | 'uziv_sl_d' | 'uziv_sl_d2' | 'uziv_sl_j' | 'uziv_sl_j2' | 'uziv_sl_k' | 'uziv_sl_k2' | 'uziv_sl_n' | 'fulltext' | 'VyrizenaZadostVRak' | 'DilciTermin' | 'dat_vyriz_do_wflsdcj' | 'ixs_su_akt_wflstop' | 'ixs_fun_akt_wflstop' | 'SubjektPredavajiciRedi' | 'ixs_su_do_wflstop' | 'ixs_fun_cil_wflstop' | 'IDokumentyNaCeste' | 'ixb_wflsepx' | 'SOhledemNaAgendu' | /*'SOhledemNaIco' |*/ 'DatumovyInterval' | 'Vlastni' | 'RedistribucePredavajiciMultiSuFunRef' | 'RedistribucePrebirajiciMultiSuFunRef' | 'RedistribucePredavajiciVlastnictvi' | 'RedistribucePrebirajiciVlastnictvi' | 'stav_cj_wflsdcj' | 'IxsFunVsechnyFunkcePrebirajiciho' | 'KategorieTypuDokumentuDleTypuAgendy' | 'ixs_car_wflspri' | 'VlastnictviVsechnyFunkceReferenta' | 'DefinovaneSpisoveZnaky';
    type GTypPisemnosti = 'dokument' | 'spis' | 'dokumentISpis' | 'typovySpis' | 'soucast' | 'dil' | 'vseDohromady';
    type GDatumovyIntervalFactor = 'DP' | 'DV' | 'DZ';
    interface GDatumovyIntervalInput {
        /**
         * Pokud není uvedeno pak se přidají všechny.
         * @type {GDatumovyIntervalFactor[]}
         */
        factors?: GDatumovyIntervalFactor[];
    }
    type GWflspidIslGStringBoxOptions = Omit<GStringBoxOptions, 'name' | 'model' | 'emptyValue'>;
    type GWflspidIslGNumberBoxOptions = Omit<GNumberBoxOptions, 'name' | 'model' | 'emptyValue'>;
    type GWflspidIslGDateBoxOptions = Omit<GDateBoxOptions, 'name' | 'model' | 'emptyValue'>;
    type GWflspidIslGCheckBoxOptions = Omit<GCheckOptions, 'name' | 'model' | 'emptyValue'>;
    type GWflspidIslGSelectBoxOptions<TData> = Omit<GSelectBoxOptions<TData>, 'name' | 'model' | 'emptyValue' | 'data'>;
    type GWflspidIslGDateComboBoxOptions = Omit<Gui.WebControls.IGDateComboBoxOptions, 'name' | 'model' | 'emptyValue'>;
    type GWflspidMultiSuFunRefOptions = Partial<Omit<Gordic.Gin.Fields.GMultiSuFunRefOptions, "rowOptions" | "chovaniStrediskaDleUcelu" | "name">>;
    type GWflspidIslFieldOptionsWithOperators = {
        withOperators?: boolean;
    };
    interface GWflspidIslFieldsOptions {
        ixp?: GWflspidIslGStringBoxOptions & GWflspidIslFieldOptionsWithOperators;
        lic?: GWflspidIslGStringBoxOptions;
        rok?: GWflspidIslGNumberBoxOptions;
        typ_duv_del?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflctddEnum, Ginis.DbModel.GWflctddDto>>;
        ixp_spis?: GWflspidIslGStringBoxOptions;
        priz_spis?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcpriEnum, Ginis.DbModel.GWflcpriDto>>;
        ixs_su_akt?: GWflspidIslGSelectBoxOptions<Data.Readers.GinspodDto>;
        ixs_fun_akt?: GWflspidIslGSelectBoxOptions<Data.Readers.GinsfunDto>;
        nazev?: GWflspidIslGStringBoxOptions;
        stav_dist?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcstaEnum, Ginis.DbModel.GWflcstaDto>>;
        stav_pis?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcstpEnum, Ginis.DbModel.GWflcstpDto>>;
        typ_ag?: GWflspidIslGSelectBoxOptions<Data.Readers.GinctagDto>;
        ktg_typ?: GWflspidIslGNumberBoxOptions;
        ixs_typ?: GWflspidIslGSelectBoxOptions<Data.Readers.SslsumiDto>;
        s_prij?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcsprEnum, Ginis.DbModel.GWflcsprDto>>;
        s_ssl?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcsslEnum, Ginis.DbModel.GWflcsslDto>>;
        dat_zmena?: GWflspidIslGDateComboBoxOptions;
        zmenu_prov?: GWflspidIslGStringBoxOptions;
        s_ele?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflceleEnum, Ginis.DbModel.GWflceleDto>>;
        s_fyz?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcfyzEnum, Ginis.DbModel.GWflcfyzDto>>;
        misto_vzniku?: GWflspidIslGStringBoxOptions;
        s_sgn?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcsgnEnum, Ginis.DbModel.GWflcsgnDto>>;
        dat_pod?: GWflspidIslGDateComboBoxOptions;
        priz_view_ssl?: GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        uzo?: GWflspidIslGSelectBoxOptions<any>;
        spis_pl?: GWflspidIslGSelectBoxOptions<Data.Readers.SslsumiDto>;
        spis_znak?: GWflspidIslGSelectBoxOptions<Data.Readers.SslsspzDto>;
        ixs_su_wfl?: GWflspidIslGSelectBoxOptions<Data.Readers.GinspodDto>;
        ixs_fun_wfl?: GWflspidIslGSelectBoxOptions<Data.Readers.GinsfunDto>;
        s_uloz?: GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        dat_uloz?: GWflspidIslGDateBoxOptions;
        s_odes?: GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        priz_cj?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcpcjEnum, Ginis.DbModel.GWflcpcjDto>>;
        dat_vyriz?: GWflspidIslGDateComboBoxOptions;
        ixs_cj?: GWflspidIslGStringBoxOptions;
        puvod?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcpuvEnum, Ginis.DbModel.GWflcpuvDto>>;
        s_schval?: GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        umisteni?: GWflspidIslGSelectBoxOptions<Data.Readers.SslsumiDto>;
        st_utaj_id?: GWflspidIslGSelectBoxOptions<Data.Readers.GincstuDto>;
        st_utaj_id_orig?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GGincstuEnum, Ginis.DbModel.GGincstuDto>>;
        skar_znak?: GWflspidIslGStringBoxOptions;
        skar_lhuta?: GWflspidIslGNumberBoxOptions;
        rok_spo_uda?: GWflspidIslGNumberBoxOptions;
        ixp_top?: GWflspidIslGStringBoxOptions;
        typ_spis?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflctysEnum, Ginis.DbModel.GWflctysDto>>;
        barcode?: GWflspidIslGStringBoxOptions;
        skar_lhuta_spra?: GWflspidIslGNumberBoxOptions;
        ixs_ext?: GWflspidIslGStringBoxOptions;
        rok_skartace?: GWflspidIslGNumberBoxOptions;
        ixs_spu?: GWflspidIslGStringBoxOptions;
        poc_listu?: GWflspidIslGStringBoxOptions;
        poc_stran?: GWflspidIslGNumberBoxOptions;
        poc_kop?: GWflspidIslGNumberBoxOptions;
        poc_priloh?: GWflspidIslGNumberBoxOptions;
        poc_l_priloh?: GWflspidIslGStringBoxOptions;
        cj?: GWflspidIslGStringBoxOptions;
        ico?: GWflspidIslGStringBoxOptions;
        ixs_zup?: GWflspidIslGStringBoxOptions;
        dat_mpd0?: GWflspidIslGDateBoxOptions;
        ixs_lpc?: GWflspidIslGNumberBoxOptions;
        ixs_vsk?: GWflspidIslGSelectBoxOptions<Gordic.ControlsLogic.Interface.GGinsvskDto>;
        uziv_sl_a?: GWflspidIslGStringBoxOptions;
        uziv_sl_a2?: GWflspidIslGStringBoxOptions;
        uziv_sl_a3?: GWflspidIslGStringBoxOptions;
        uziv_sl_b?: GWflspidIslGStringBoxOptions;
        uziv_sl_b2?: GWflspidIslGStringBoxOptions;
        uziv_sl_b3?: GWflspidIslGStringBoxOptions;
        uziv_sl_c?: GWflspidIslGStringBoxOptions;
        uziv_sl_c2?: GWflspidIslGStringBoxOptions;
        uziv_sl_d?: GWflspidIslGStringBoxOptions;
        uziv_sl_d2?: GWflspidIslGStringBoxOptions;
        uziv_sl_j?: GWflspidIslGStringBoxOptions;
        uziv_sl_j2?: GWflspidIslGStringBoxOptions;
        uziv_sl_k?: GWflspidIslGStringBoxOptions;
        uziv_sl_k2?: GWflspidIslGStringBoxOptions;
        uziv_sl_n?: GWflspidIslGStringBoxOptions;
        fulltext?: GWflspidIslGStringBoxOptions;
        VyrizenaZadostVRak?: GWflspidIslGCheckBoxOptions;
        DilciTermin?: GWflspidIslGDateComboBoxOptions;
        dat_vyriz_do_wflsdcj?: GWflspidIslGDateComboBoxOptions;
        ixs_su_akt_wflstop?: GWflspidIslGSelectBoxOptions<Data.Readers.GinspodDto>;
        ixs_fun_akt_wflstop?: GWflspidIslGSelectBoxOptions<Data.Readers.GinsfunDto>;
        RedistribucePredavajiciMultiSuFunRef?: GWflspidMultiSuFunRefOptions;
        RedistribucePredavajiciVlastnictvi?: GWflspidIslGSelectBoxOptions<any>;
        ixs_su_do_wflstop?: GWflspidIslGSelectBoxOptions<Data.Readers.GinspodDto>;
        ixs_fun_cil_wflstop?: GWflspidIslGSelectBoxOptions<Data.Readers.GinsfunDto>;
        RedistribucePrebirajiciMultiSuFunRef?: GWflspidMultiSuFunRefOptions;
        RedistribucePrebirajiciVlastnictvi?: GWflspidIslGSelectBoxOptions<any>;
        IDokumentyNaCeste?: GWflspidIslGCheckBoxOptions;
        ixb_wflsepx?: GWflspidIslGStringBoxOptions;
        SOhledemNaAgendu?: GWflspidIslGCheckBoxOptions;
        DatumovyInterval?: GWflspidIslGDateComboBoxOptions;
        Vlastni?: GWflspidIslGCheckBoxOptions;
        stav_cj_wflsdcj?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcscjEnum, Ginis.DbModel.GWflcscjDto>>;
        akt_znacka?: GWflspidIslGStringBoxOptions & GWflspidIslFieldOptionsWithOperators;
        status_pis?: GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GWflcumpEnum, Ginis.DbModel.GWflcumpDto>>;
        IxsFunVsechnyFunkcePrebirajiciho?: GWflspidIslGSelectBoxOptions<Data.Readers.GinsfunDto>;
        KategorieTypuDokumentuDleTypuAgendy?: GWflspidIslGSelectBoxOptions<Data.Readers.GinctagDto>;
        ixs_car_wflspri?: GWflspidIslGStringBoxOptions;
        VlastnictviVsechnyFunkceReferenta?: GWflspidIslGCheckBoxOptions;
        DefinovaneSpisoveZnaky?: DefinovaneSpisoveZnakyOptions;
    }
    /**
     * DefinovaneSpisoveZnakyOptions
     *
     * @author TFeik
     * @since 52510.128
     */
    type DefinovaneSpisoveZnakyOptions = GWflspidIslGCheckBoxOptions & {
        /**
         * Spisové znaky na které se bude filtrovat v případě nastavení políčka na [true].
         * @type {string[]}
         */
        spisoveZnaky: string[];
    };
    class GWflspidIsl {
        private static IconColumnEnums?;
        static Init(columns: Gin.WebClient.Names<GWflspidColumnNames>, fields: Gin.WebClient.Names<GWflspidFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Gin.WebClient.Names<GWflspidColumnNames>, fields: Gin.WebClient.Names<GWflspidFieldNames>): boolean;
        private static loadEnums;
        static GetWflcumpEnumIcon(value?: Ginis.DbModel.GWflcumpEnum | null): string;
        static GetWflctddEnumIcon(value?: Ginis.DbModel.GWflctddEnum | null): string;
        static GetWflcpriEnumIcon(value?: Ginis.DbModel.GWflcpriEnum | null): string;
        static GetWflcstaEnumIcon(value?: Ginis.DbModel.GWflcstaEnum | null): string;
        static GetWflcstpEnumIcon(value?: Ginis.DbModel.GWflcstpEnum | null): string;
        static GetWflcsprEnumIcon(value?: Ginis.DbModel.GWflcsprEnum | null): string;
        static GetWflcsslEnumIcon(value?: Ginis.DbModel.GWflcsslEnum | null): string;
        static GetWflceleEnumIcon(value?: Ginis.DbModel.GWflceleEnum | null): string;
        static GetWflcfyzEnumIcon(value?: Ginis.DbModel.GWflcfyzEnum | null): string;
        static GetWflcsgnEnumIcon(value?: Ginis.DbModel.GWflcsgnEnum | null): string;
        static GetWflcpcjEnumIcon(value?: Ginis.DbModel.GWflcpcjEnum | null): string;
        static GetWflcpuvEnumIcon(value?: Ginis.DbModel.GWflcpuvEnum | null): string;
        static GetGincstuEnumIcon(value?: Ginis.DbModel.GGincstuEnum | null): string;
        static GetWflctysEnumIcon(value?: Ginis.DbModel.GWflctysEnum | null): string;
        private static CanAddColumn;
        /**
         * addDokumentWflGridFormat
         *
         * @author  TFeik
         * @date    02.09.2020
         *
         * @param {Data.GridFormat<Wfl.Interface.GWflspidDto>} gridFormat
         * @returns {Data.GridFormat<Wfl.Interface.GWflspidDto>}
         */
        static addDokumentWflGridFormat<TRow = Interface.GWflspidDto>(opt: {
            input: Interface.GWflspidGetColumnParamsResponseDto;
            gridFormat: Data.GridFormat<TRow>;
            typPisemnosti: GTypPisemnosti;
            columns?: GWflspidColumnNames[] | 'all';
            scopeOptions?: Gin.WebClient.GScopeOptions;
            groupResultProvider?: Globals.ListSupport.IGroupResultProvider;
            addMode: Gin.WebClient.AddMode;
        }): Data.GridFormat<TRow>;
        /**
         * Přidá do gridFormatu vlastnosti.
         *
         * @author  TFeik
         * @date    05.01.2022
         * @since   486.1.0.920
         */
        static addVlastnostiToGridFormat<TRow = Interface.GWflspidDto>(input: {
            vlastnostiUzivatelskeSloupce: Gordic.Wfl.Interface.UzivSloupceSeznamuDto[] | undefined | null;
            gridFormat: Data.GridFormat<TRow>;
            scopeOptions?: Gin.WebClient.GScopeOptions;
            /**
             * Pole sloupců (ixs) vlastností.
             * @type {'all' | string[]}
             */
            columns?: 'all' | string[];
            /**
             * (Default: false) Příznak, zda se mají přidat duplicitní vlastnosti.
             * @type {boolean}
             */
            addDuplicates?: boolean;
        }): Data.GridFormat<TRow>;
        static AddWflspidFilterFields(input: {
            content: GContent;
            form?: Forms.Form | null;
            initialValues?: Interface.GWflspidFilterDto | null;
            fields?: GWflspidFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            typPisemnosti?: GTypPisemnosti;
            datumovyInterval?: GDatumovyIntervalInput;
            fieldsOptions: GWflspidIslFieldsOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddWflspidFilterFieldsImmediate(input: {
            content: GContent;
            params: Interface.GWflspidGetFilterParamsResponseDto;
            form?: Forms.Form | null;
            initialValues?: Interface.GWflspidFilterDto | null;
            fields?: GWflspidFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            typPisemnosti?: GTypPisemnosti;
            datumovyInterval?: GDatumovyIntervalInput;
            fieldsOptions: GWflspidIslFieldsOptions | null;
        }): Forms.Form;
        static createFilterForm(content: GContent, params: Interface.GWflspidGetFilterParamsResponseDto, typPisemnosti: Wfl.WebClient.GTypPisemnosti, form?: Forms.Form | null, initialValues?: Interface.GWflspidFilterDto | null, fields?: GWflspidFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null, datumovyInterval?: GDatumovyIntervalInput, fieldsOptions?: GWflspidIslFieldsOptions | null): Forms.Form;
        private static CanAddField;
        static addDokumentWflFilterForm(input: {
            content: GContent;
            form: Forms.Form;
            params: Interface.GWflspidGetFilterParamsResponseDto;
            typPisemnosti: Wfl.WebClient.GTypPisemnosti;
            initialValues?: Wfl.Interface.GWflspidFilterDto | null;
            fields?: GWflspidFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            datumovyInterval?: GDatumovyIntervalInput;
            addMode: Gin.WebClient.AddMode;
            fieldsOptions?: GWflspidIslFieldsOptions | null;
        }): Forms.Form;
        /**
         * createGridFormat<TRow = Interface.GWflspidDto>
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GWflspidDto>(input: Interface.GWflspidGetColumnParamsResponseDto, typPisemnosti: Wfl.WebClient.GTypPisemnosti, gridFormat?: Data.GridFormat<TRow>, columns?: GWflspidColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Isl.Client} isl ISL.
         * @param {GWflspidColumnNames[] | 'all'} [columns] Požadované sloupce.
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @param {Wfl.WebClient.GTypPisemnosti} [typPisemnosti] Typ písemnosti.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddDokumentGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, isl: Isl.Client, columns?: GWflspidColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, typPisemnosti?: Wfl.WebClient.GTypPisemnosti): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * Před jejím voláním je nutné provést inicializaci GWflspidIsl pomocí fukce GWflspidIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddDokumentGridColumnsImmediate<TRow>(columnParams: Interface.GWflspidGetColumnParamsResponseDto, gridFormat: Data.GridFormat<TRow>, columns?: GWflspidColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, typPisemnosti?: Wfl.WebClient.GTypPisemnosti): Data.GridFormat<TRow>;
        /**
         * Vytvoří funkci upravující gridFormat před vytvořením dle contentu (userSettings).
         *
         * @author  TFeik
         * @date    05.01.2022
         *
         * @param {Data.GridFormat<TDto>} gridFormatOrigin
         * @param {CustomView.GContentDlg<TDto>} content
         * @returns {JQuery.Promise<Data.GridFormat<TDto>>}
         */
        static createUpdateGridFormat<TDto = Interface.GWflspidDto, TFilterDto = Interface.GWflspidFilterDto>(gridFormatOrigin: Data.GridFormat<TDto>, content: CustomView.GContentDlg<TDto, TFilterDto>, scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TDto>>;
        /**
         * Vrátí základní objekt pro mapování oprávnění na akce.
         *
         * @author  TFeik
         * @date    18.05.2023
         *
         * @returns {CustomView.ActionPermissionMapper<TDto>}
         */
        static createActionPermissionMapperBase<TDto extends Interface.GWflspidDto>(): CustomView.ActionPermissionMapper<TDto>;
        /**
         * Vrátí objekt pro mapování oprávnění na akce.
         *
         * @author  TFeik
         * @date    18.05.2023
         *
         * @returns {CustomView.ActionPermissionMapper<Interface.GWflspidDto>}
         */
        static createActionPermissionMapper(): CustomView.ActionPermissionMapper<Interface.GWflspidDto>;
        /**
         * Vrátí jednotlivé položky objektu pro mapování oprávnění na akce.
         *
         * @author  TFeik
         * @date    18.05.2023
         *
         * @returns {CustomView.ActionPermissionMapperItem<TDto>[]}
         */
        static createActionPermissionMapperItems<TDto extends Interface.GWflspidDto>(): CustomView.ActionPermissionMapperItem<TDto>[];
        /**
         * Vrátí TItem dle typu písemnosti.
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {GetItemPisemnostiInput<TItem>} input
         * @returns {TItem}
         */
        static GetItemPisemnosti<TItem>(input: GetItemPisemnostiInput<TItem>): TItem;
        /**
         * Vrátí text dle typu písemnosti.
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {GetItemPisemnostiInput<string>} input
         * @returns {string}
         */
        static GetTextPisemnosti(input: GetItemPisemnostiInput<string>): string;
        /**
         * Vrátí ikonu dle typu písemnosti.
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {GetItemPisemnostiInput<IconTemplate>} input
         * @returns {IconTemplate}
         */
        static GetIconPisemnosti(input: GetItemPisemnostiInput<IconTemplate>): IconTemplate;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.VlastnikFunkce, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.VlastnikAgendovyFunkce, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.TypAgendy, subentityColumnName: Gin.WebClient.GTypAgendyColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.ZmenuProvedl, subentityColumnName: Gin.WebClient.GZmenuProvedlColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.Sslstyp, subentityColumnName: Gin.WebClient.GTypDokumentuColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.SkartacniZnak, subentityColumnName: Wfl.WebClient.GSkartacniZnakColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.SpisovyZnak, subentityColumnName: Wfl.WebClient.GSpisovyZnakColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.SpisovyPlan, subentityColumnName: Wfl.WebClient.GSpisovyPlanColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.VlastnikSpisovyUzel, subentityColumnName: Gin.WebClient.GSpisovyUzelColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.VlastnikAgendovySpisovyUzel, subentityColumnName: Gin.WebClient.GSpisovyUzelColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.UzivatelskaPoznamka, subentityColumnName: Wfl.WebClient.GUzivatelskaPoznamkaColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.Redistribuce, subentityColumnName: Wfl.WebClient.GRedistribuceColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.HistorieRedistribuce, subentityColumnName: Wfl.WebClient.GWflhupiColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.UlozenoListu, subentityColumnName: Wfl.WebClient.GWfldulpColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.UrovenPristupu, subentityColumnName: Gin.WebClient.GUrovenPristupuColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.TypSpousteciUdalosti, subentityColumnName: Gin.WebClient.GTypSpousteciUdalostiColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.Wflszne, subentityColumnName: Wfl.WebClient.GWflszneColumnNames): GWflspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GWflspidDtoNames.VecnaSkupina, subentityColumnName: Gin.WebClient.GVecnaSkupinaColumnNames): GWflspidColumnNames;
    }
    type GWflspidSubentityNames = Interface.GWflspidDtoNames.VlastnikFunkce | Interface.GWflspidDtoNames.TypAgendy | Interface.GWflspidDtoNames.VlastnikAgendovyFunkce | Interface.GWflspidDtoNames.ZmenuProvedl | Interface.GWflspidDtoNames.Sslstyp | Interface.GWflspidDtoNames.SkartacniZnak | Interface.GWflspidDtoNames.SpisovyZnak | Interface.GWflspidDtoNames.SpisovyPlan | Interface.GWflspidDtoNames.VlastnikSpisovyUzel | Interface.GWflspidDtoNames.VlastnikAgendovySpisovyUzel | Interface.GWflspidDtoNames.UzivatelskaPoznamka | Interface.GWflspidDtoNames.Redistribuce | Interface.GWflspidDtoNames.HistorieRedistribuce | Interface.GWflspidDtoNames.UlozenoListu | Interface.GWflspidDtoNames.UrovenPristupu | Interface.GWflspidDtoNames.TypSpousteciUdalosti | Interface.GWflspidDtoNames.Wflszne | Interface.GWflspidDtoNames.VecnaSkupina;
    interface GetItemPisemnostiInput<TItem> {
        typPisemnosti: GTypPisemnosti;
        dokument: TItem;
        spis: TItem;
        dokumentISpis: TItem;
        typovySpis?: TItem;
        soucast?: TItem;
        dil?: TItem;
        vseDohromady?: TItem;
    }
    class GWflspidIslColumnsPreset {
        /**
         * Základ sloupců (bez uživatelského nastavení a stavů/příznaků).
         *
         * @returns {GWflspidColumnNames[]}
         */
        static Base(): GWflspidColumnNames[];
        static CiziIdentifikatory(): GWflspidColumnNames[];
        static Priznaky(): GWflspidColumnNames[];
        static UzivatelskeSloupce(): GWflspidColumnNames[];
        /**
         * Obsahuje základní informace (Base) a cizí identifikátory (CiziIdetfikatory).
         *
         * @returns {GWflspidColumnNames[]}
         */
        static Eko(): GWflspidColumnNames[];
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * GWflszneColumnNames
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    type GWflszneColumnNames = 'ixp' | 'duvod' | 'dat_znepristupneni' | 'ixs_zmp' | 'dat_zmena' | 'zmenu_prov' | 'ZmenuProvedl';
    /**
     * GWflszneFieldNames
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    type GWflszneFieldNames = 'ixp' | 'duvod' | 'dat_znepristupneni' | 'ixs_zmp' | 'dat_zmena' | 'zmenu_prov';
    /**
     * GWflszneIsl
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    class GWflszneIsl {
        /**
         * Init
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Wfl.WebClient.Names<GWflszneColumnNames>} columns
         * @param {Wfl.WebClient.Names<GWflszneFieldNames>} fields
         * @returns {JQuery.Promise<void>}
         */
        static Init(columns: Gin.WebClient.Names<GWflszneColumnNames>, fields: Gin.WebClient.Names<GWflszneFieldNames>): JQuery.Promise<void>;
        /**
         * IsInitiated
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Gin.WebClient.Names<GWflszneColumnNames>} columns
         * @param {Gin.WebClient.Names<GWflszneFieldNames>} fields
         * @returns {boolean}
         */
        static IsInitiated(columns: Gin.WebClient.Names<GWflszneColumnNames>, fields: Gin.WebClient.Names<GWflszneFieldNames>): boolean;
        /**
         * CanAddColumn
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {GWflszneColumnNames} column
         * @param {GWflszneFieldNames[] | 'all' } columns
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddColumn;
        /**
         * addGridFormat<TRow = Interface.GWflhpisDto>
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ gridFormat: Data.GridFormat<TRow>, addMode: Gin.WebClient.AddMode, columns?: GWflszneColumnNames[] | 'all'} input
         * @returns {Data.GridFormat<TRow>}
         */
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GWflhpisDto>
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GWflszneDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GWflszneColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GWflszneColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GWflszneIsl pomocí fukce GWflszneIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GWflszneColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * AddFilterFields
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GWflszneFieldNames[] | 'all' | null} input
         * @returns {JQuery.Promise<Forms.Form>}
         */
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GWflszneFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        /**
         * AddFilterFieldsImmediate
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GWflszneFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GWflszneFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        /**
         * createFilterForm
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Forms.Form | null} [form]
         * @param {any | null} [initialValues]
         * @param {GWflszneFieldNames[] | 'all' | null} [fields]
         * @param {Gin.WebClient.GScopeOptions | null} [scope]
         * @returns {Forms.Form}
         */
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GWflszneFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        /**
         * CanAddField
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {GWflszneFieldNames} fieldName
         * @param {Gin.WebClient.Names<GWflszneFieldNames>} fields
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddField;
        /**
         * addFilterForm
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {{ form: Forms.Form, initialValues?: any | null, fields?: GWflszneFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GWflszneFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Wfl {
    interface CreateServerInput {
        parentContent: GContent;
    }
    interface CreatePredavaciProtokolPrintParamsInput extends CreateServerInput {
    }
    interface CreateTiskDokumentuPrintParamsInput extends CreateServerInput {
    }
    interface SaveToPoznamkovyBlokInput extends CreateServerInput {
        ixsBlp: string;
        selectedIxp: string[];
    }
    interface VyjmoutZPoznamkovehoBlokuInput extends CreateServerInput {
        /**
         * Identifikátor poznámkového bloku.
         * @type {string}
         */
        ixsBpl: string;
        /**
         * Identifikátory dokumentů/spisů, teré budou vyjmuty ze spisu.
         * @type {string[]}
         */
        ixps: string[];
    }
    interface VyjmoutVseZPoznamkovehoBlokuInput extends CreateServerInput {
        /**
         * Identifikátor poznámkového bloku.
         * @type {string}
         */
        ixsBpl: string;
    }
    class GWflListUtils {
        private static readonly ClassName;
        static GetSrv(content: GContent): GContent<IGContentBase, any>;
        /**
         * Vytvoří serverový content a navázaný na parent content.
         *
         * @author  TFeik
         * @date    08.12.2020
         *
         * @param {CreateServerInput} input
         * @returns {GContent}
         */
        private static CreateServer;
        static CreatePredavaciProtokolPrintParams(input: CreatePredavaciProtokolPrintParamsInput): JQuery.Promise<Interface.GPredavaciProtokolPrintParamsDto>;
        static CreateTiskDokumentuPrintParams(input: CreateTiskDokumentuPrintParamsInput): JQuery.Promise<Interface.GTiskDokumentuPrintParamsDto>;
        static SaveToPoznamkovyBlok(input: SaveToPoznamkovyBlokInput): JQuery.Promise<Interface.GWflListUtilsRetDto>;
        /**
         * Vyjmout dokumenty/spisy z poznámkového bloku.
         *
         * @author  TFeik
         * @date    04.12.2020
         *
         * @param {VyjmoutZPoznamkovehoBlokuInput} input
         * @returns {JQuery.Promise<void>}
         */
        static VyjmoutZPoznamkovehoBloku(input: VyjmoutZPoznamkovehoBlokuInput): JQuery.Promise<void>;
        /**
         * Vyjmout vše z poznámkovho bloku.
         *
         * @author  TFeik
         * @date    04.12.2020
         *
         * @param {VyjmoutVseZPoznamkovehoBlokuInput} input
         * @returns {JQuery.Promise<void>}
         */
        static VyjmoutVseZPoznamkovehoBloku(input: VyjmoutVseZPoznamkovehoBlokuInput): JQuery.Promise<void>;
        static DolozkaNabytiPravniMociHromadne(content: GContent, ixpArry: string[]): JQuery.Promise<Interface.GWflListUtilsRetDto>;
        static GetGroupResultListFromResultInfoList(resultInfos: Gin.Interface.GResultInfo[]): Wfl.WebClient.GroupResult[];
        static GetGroupResult(resultInfos: Wfl.WebClient.GroupResult[]): any;
        static GetFormProDolozku(content: GContent, ixp: string | null): JQuery.Promise<string>;
        static SortVysledekOperace(aObj: any, bObj: any): any | undefined;
        /**
         * Změní počet.
         *
         * @author  TFeik
         * @date    24.04.2024
         *
         * @param {Gordic.Gui.Dialogs.OpenDialogParams<{ items: Interface.SelectedRowInfoDto[], typZmenyPoctu: Interface.TypZmenyPoctu} input
         * @returns {JQuery.Promise<Interface.GWflListUtilsRetDto>}
         */
        static ZmenitPocet(input: Gordic.Gui.Dialogs.OpenDialogParams<{
            items: Interface.SelectedRowInfoDto[];
            typZmenyPoctu: Interface.TypZmenyPoctu;
        }>): JQuery.Promise<Interface.GWflListUtilsRetDto>;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class TransakcniProtokolListAC extends GContentBase<WflListBaseAC> {
        signer: Gordic.Wfl.WebClient.GWflClientSigner;
        model: Gordic.Wfl.Interface.GSeznamFilterBaseDto;
        GenerovaniDto: Gordic.Wfl.Interface.GGenerovaniTransakcnihoProtokoluDto;
        AvizoGenerovani: boolean;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        CreateGrid(): void;
        LoadData(filtr?: Gordic.Wfl.Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
        SetGenerovaniEnabled(): void;
        CreateAvizoGenerovani(Avizo: boolean): void;
        CreateActionGenerovatZud(): GAction;
        OpenProtocol(): void;
        CreateActionOpenProtocol(): GAction;
        CreateActionGenerovat(caption: string): GAction;
        GenerovatPpo(event?: JQueryEventObject): void;
        DelegateTypIcon(): GGridColumn<any>;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class DokSpisListBaseAC extends GContentBase<WflListBaseAC> {
        TypSeznamu: Interface.TypSeznamuDokSpis;
        AkceEnabledDto: Interface.GDokSpisAkceEnabledDto;
        TypAutorizacePredani: Gordic.Wfl.Interface.TypAutorizacePredani;
        AutorizovatPrevzeti: boolean;
        PredatNaOsobu: boolean;
        static InitList(content: GContentType<DokSpisListBaseAC>): void;
        static CreateActions(content: GContentType<DokSpisListBaseAC>): void;
        static CreateGridDokSpis(content: GContentType<DokSpisListBaseAC>): void;
        static GetGridDokSpis(content: GContentType<DokSpisListBaseAC>, gridColumnsDefinition: Gordic.Data.GridFormat): JQuery;
        static AddBaseActionsDokSpis(content: GContentType<DokSpisListBaseAC>): void;
        static AddBaseActionsDokSpisTotopActions(content: GContentType<DokSpisListBaseAC>): void;
        static AddBaseActionsDokSpisToToBaseActions(content: GContentType<DokSpisListBaseAC>): void;
        static EnabledAction(content: GContentType<DokSpisListBaseAC>): void;
        static AfterLoadData(content: GContentType<DokSpisListBaseAC>): void;
        static CreateActionPridelit(content: GContentType<DokSpisListBaseAC>, favorite?: boolean, zmenaPrideleni?: boolean): GAction;
        static CreateActionPredat(content: GContentType<DokSpisListBaseAC>, favorite?: boolean): GAction;
        static CreateActionPrevzit(content: GContentType<DokSpisListBaseAC>, favorite?: boolean): GAction;
        static CreateActionPredatPrimo(content: GContentType<DokSpisListBaseAC>, favorite?: boolean): GAction;
        static CreateActionTiskOznacenychDokSpis(content: GContentType<DokSpisListBaseAC>, favorite?: boolean): GAction;
        static Prevzit(content: GContentType<DokSpisListBaseAC>, selected: Interface.GWflIxpDatZmena[]): void;
        static CreateActionZmenitPolozku(content: GContentType<WflListBaseAC>, typ: Interface.TypZmenyPolozkyEnum, isFormString?: boolean): GAction;
        private static ZmenitPolozku;
        static CreateActionZrusitPrideleni(content: GContentType<DokSpisListBaseAC>, favorite?: boolean): GAction;
        static CreateActionTiskPredProtPomocny(content: GContentType<DokSpisListBaseAC>, _typAkce: Wfl.Interface.TypAkce, favorite?: boolean): GAction;
        static CreateActionTiskPredavacihoProtokoluDokSpis(content: GContentType<DokSpisListBaseAC>, _typAkce: Wfl.Interface.TypAkce, favorite?: boolean, event?: JQueryEventObject): GAction;
        static TiskPredavacihoProtokoluDokSpis(content: GContentType<DokSpisListBaseAC>, _typAkce: Wfl.Interface.TypAkce, _tiskBezDotazu: boolean, event?: JQueryEventObject, pomocny?: boolean): void;
        static CreateActionOdmitnoutPrevzeti(content: GContentType<DokSpisListBaseAC>, favorite?: boolean): GAction;
        static GetSelectedGWflIxpDatZmena(content: GContentType<DokSpisListBaseAC>): Interface.GWflIxpDatZmena[];
    }
}
declare namespace Gordic.Wfl {
    class List extends GContentBase {
        PredavaciProtokolInfo: {
            ixsFunPredavajici?: string;
            ixsFunPrebirajici?: string;
        };
        IconOpt?: any;
        mainGrid?: JQuery<HTMLElement>;
        loadGridImmediately: boolean;
        flashPanelTimer?: number;
        zvyrazneniNeprectenych: boolean;
        model?: ObjectLiteral<any>;
        LogPorCislo: number;
        IxsSuAkt?: string;
        IxsFunAkt?: string;
        TypAgAkt?: string;
        GroupResult?: any;
        GroupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider;
        GridData: any[];
        GridKey: string;
        LoadGrid: () => void;
        CreateMenu: () => void;
        gridColumnsDefinition: Gordic.Data.GridFormat;
        onGetGridData: (GridData: any[]) => void;
        onBeforeGridSetData: (DataView: Gordic.Data.View) => void;
        CreateFilterForms: () => JQuery.Deferred<any> | Forms.Form[];
        filterForm: JQuery<HTMLElement>;
        validators: any;
        Tema: string;
        FavoriteFields: string[];
        FilterPanelUserSettingsName: string;
        ZnackaShortText: string;
        SpZnackaShortText: string;
        FilterFavoriteLayoutDescriptor: string;
        contextMenu: any[];
        multiMenu: any[];
        printRestrictionALF?: string;
        previewDiv: JQuery<HTMLElement>;
        rowToPreview: any;
        IsFazeSSD: boolean;
        elePreviewEnabled: boolean;
        LzePridatZadostOPodpis: boolean;
        IsNutnyVyberDenikuCj: boolean;
        ParSslRemDokd: number;
        GinN23Vedd: number;
        SslSezPoznPar: number;
        UsuShowSuPar: number;
        DaysRangeMax: number;
        getFavoriteHromadneAkceDto: () => Interface.GHromadneWflAkceDto;
        getVisibleHromadneAkceDto: () => Interface.GHromadneWflAkceDto;
        getEnableHromadneAkceDto: () => Interface.GHromadneWflAkceDto;
        akceMenuBaru: MenuParams[];
        IsPovolenePouzitiVlastnosti: boolean;
        UserColumnsVlastnostiUserSettingsKey: string;
        UserColumnsVlastnosti: Interface.UzivSloupceSeznamuDto[];
        staticFilters?: Gordic.Widget.filterpanelFilterOptions<any>[] | null;
        ssl_rp_schval: number;
        ssl_podpkniha: number;
        usu_predani: number;
        gin_rad_konao: number;
        previewController: Gordic.Previews.GPreviewController;
        notePanelEl: JQuery<HTMLElement>;
        notePanelBadge: GObservableObject<{
            value: string;
        }>;
        gnotePanel: Gordic.GNotePanel;
        _createNotes: (parent: JQuery<HTMLElement>) => void;
        autoLoadAfterChooseFilterUS: boolean;
        IxpProGenSablon: string[];
        primyTisk: number;
        islView: Gordic.Isl.View;
        flagDataIsl: boolean;
        lastFragments?: string[];
        flagSpisy: boolean;
        IsStaraMetodikaSsl: boolean;
        StavUkonuEpkVisible: boolean;
        DpoEnabled: boolean;
        ktgDuvPodp: number;
        ktgDpoSupport: GKtgDpoSupport;
        KtgDpoSupportDbParamsDto: Gordic.Gin.WebClient.GKtgDpoSupportDbParamsDto;
        signModule: Gordic.Wfl.WebClient.GSgn;
        IxsDpo: string;
        WflInit(): void;
        LoadData(): JQuery.Deferred<any>;
        ReloadWithApplyFilter(): void;
        Reload(filter?: ObjectLiteral<any>, createNewGrid?: boolean): void;
        PrepareSubtask(): void;
        _PrepareSubtask(filterForm: Forms.Form[]): void;
        SetParamsSubtaskFilterPanel(tema: string, favoriteFields: string[], filterPanelUserSettingsName: string): void;
        /**
        * AddColumnPoznamkaToGridFormat
        * @type {function () {}
        */
        AddColumnPoznamkaToGridFormat(GridData: any): any;
        /**
         * AddUserColumnsToGridFormat
         * @type {function () {}
         */
        AddUserColumnsToGridFormat(gridColumnsDefinition: any): any;
        /**
         * Zobrazí dialog pro přidání uživatelské poznámky
         * @param ev
         * @param row
         */
        private _showUserNoteForm;
        /**
         * ShowUserNoteFormDialog
         *
         * @param {JQueryEventObject} event
         * @param {ShowUserNoteFormRow} row
         * @returns {JQuery<HTMLElement>}
         */
        static ShowUserNoteForm(event: JQueryEventObject, row: {
            pzn: string | undefined | null;
        }): JQuery<HTMLElement>;
        /**
         * GridCreated
         * @type {function () {}
         */
        GridCreated(): any;
        /**
         * GetActiveRow
         * @type {function () {}
         */
        GetActiveRow(): any;
        /**
         * GetIxpOfActiveRow
         * @type {function () {}
         */
        GetIxpOfActiveRow(): string;
        GetIxpArrayFromSelection(): string[];
        GetSelectedGDataAkceSslProfil(): Gordic.Wfl.Interface.GDataAkceSslProfilDto[] | undefined;
        GetSelectedRowsInfoFromList(): any[];
        GetSelectedRowsWflInfoFromList(): any[];
        AddVysledekOperaceIcoColumn(gridColumnsDefinition: any): void;
        VysledekOperaceIcoColumn(): GGridColumn<any>;
        TiskPredavacihoProtokolu(): void;
        TiskPredavacihoProtokoluReportRetreive(rep: any): void;
        TiskListReportRetreive(rep: any): void;
        TiskDetailuDokumentu(event: JQueryEventObject): void;
        TiskSpisObalky(event: JQueryEventObject): void;
        TiskSbernyArch(event: JQueryEventObject): void;
        TiskHromadnyDialogClosed(event: any, reportParams: Gordic.Report.WebClient.IGReportGenerateParams, serverParameterMethod: string): void;
        GetRowClass(dataRow: any): string;
        CreateMenuBar(kompletniAkce: MenuParams[]): void;
        ZaregistrujHromadneAkce(): void;
        VratMenuHromadneAkce(): MenuParams[];
        ZpracujResultSGroupResult(retVal: any): void;
        BaseEnableHromadneAkce(): void;
        GetFullContextMenu(): MenuParams[];
        SelectionForPreviewController(opt: {
            ggrid: JQuery<HTMLElement>;
        }): void;
        CreatePreviewPanel(): JQuery<HTMLElement>;
        LoadPreview(row: any): void;
        EnablePreview(enabled: any): void;
        ShowPreview(row: any): void;
        aktualizujNahled(row: any): void;
        /**
         * isPromise - testovací funkce, jestli metoda vrací promise
         * t.hazmuka
         * @param {any} value
         */
        isPromise(value: any): boolean;
    }
}
declare namespace Gordic.Wfl.ListAC {
    function CreateActionRefresh(favorite?: boolean): GAction;
    function DelegateSSignIcon(): GGridColumn<any>;
    function DelegateStavDatoveZpravyIcon(stav: string): any;
    function DelegateStavOmIcon(stav: string): any;
    function ShowDetail(ixp: any): void;
    abstract class WflListBaseAC extends GContentBase<Gordic.Wfl.AC.WflBaseAC> {
        /** stav připojení delegáta ZUDu pro PPO05 */
        GenerateZudDelegateState: boolean;
        NacistSeznamPriOtevreni: boolean;
        MultiSelectGridu: boolean;
        ReloadZTempTable: boolean;
        IDPrimaryKeyGridu: string;
        FrmFiltr: string;
        FiltrTxtDoSestavy: string;
        ImageDelegateZpusobDoruceni: ObjectLiteral<Gordic.Wfl.WebClient.GIcon>;
        filterForm: JQuery;
        gridData: any;
        mainGrid: JQuery;
        resultInfo: Gin.Interface.GResultInfo[];
        resultInfoReload: Gin.Interface.GResultInfo[];
        IfTiskPredavacihoProtokoluVRamciSU: boolean;
        gridFormat: Gordic.Data.GridFormat;
        gridOptions: GGridOptions<any>;
        gridDefaultAction: GAction;
        gridSearchColumns: string[];
        LabelCisloJednaci: string;
        LabelZnacka: string;
        LabelSpisZnacka: string;
        selectedIDs: string[];
        cellActiveProp: JQueryEventListener1<{
            cellInfo: CellInfo<any>;
            originalCellInfo: CellInfo<any>;
            view: Gordic.Data.View<any>;
        }>;
        TypRezimuPrace: Wfl.Interface.TypRezimuPraceSeznamu;
        TableOperationTyp: Wfl.Interface.TableOperationEnum;
        TypProvedeneAkce: Wfl.Interface.TypAkce;
        IfResolveResultInfo: boolean;
        ProvedenoIDs: string[];
        customData: any;
        IntervalOdDo: Gordic.Wfl.Interface.Lists.WflDateIntervalDto;
        IsObsah: boolean;
        IsObsahOpened: boolean;
        minimalHeightObsahu: number;
        SortColumnName: string;
        FilterTema: string;
        FilterFavorites: string[];
        FilterSimpleMode: boolean;
        Poradi: number;
        PocetCelkem: number;
        PoNacteniDat: boolean;
        PrvniNacteni: boolean;
        MultiTask: boolean;
        _$fileFieldWfl: JQuery;
        PreviewDiv?: JQuery<HTMLElement>;
        RowToPreview?: any;
        static InitList(content: GContentType<WflListBaseAC>): void;
        static CompleteMenu(content: GContentType<WflListBaseAC>): void;
        static GetEnableActionsByData(content: GContentType<WflListBaseAC>): boolean;
        static StartLoadData(content: GContentType<WflListBaseAC>): void;
        static AfterLoadData(content: GContentType<WflListBaseAC>): void;
        static SetEnableActionsByData(content: GContentType<WflListBaseAC>): boolean;
        static SetEnableOperationInfo(content: GContentType<WflListBaseAC>): void;
        static SetTypProvedenaAkce(content: GContentType<WflListBaseAC>, typ: Wfl.Interface.TypAkce): void;
        static SetEnableActions(content: GContentType<WflListBaseAC>, enabled: boolean): void;
        static SetEnableSpecialActions(content: GContentType<WflListBaseAC>, enabled: boolean): void;
        static SetVisibleSpecialActions(content: GContentType<WflListBaseAC>, visible: boolean): void;
        private static SetEnableAction;
        static RunActionAndShowResultInfo(name: string, content: GContentType<WflListBaseAC>): void;
        static GetSelectedGKontrolaMetadatListDto(content: GContentType<WflListBaseAC>): Wfl.Interface.GDokSpisListDto[];
        static GetView(content: GContentType<WflListBaseAC>): Gordic.Data.View;
        static UpdateRowData(content: GContentType<WflListBaseAC>, rowData: any): void;
        static OznacRadkyDlePriznaku(content: GContentType<WflListBaseAC>, typVysledkuOperace?: Gordic.Gin.Interface.TypVysledkuOperace): void;
        /** JSINDELKA
        * oznaci radek dle klice a hodnoty vrati pole ixs a oznacenych v gridu
        * @param {content} grid*
        * @param {primarni klic} keyID (např. ixs) pokud se nazda bere se IDPrimaryKeyGridu
        * @param {content} grid*
        * @returns
        */
        static OznacRadkyDleIDAVratPocet(content: GContentType<WflListBaseAC>, Id: string, keyId: string, string?: boolean): number;
        /** JSINDELKA
        * oznaci radek dle klice a hodnoty vrati pole ixs a oznacenych v gridu
        * @param {content} grid*
        * @param {primarni klic} keyID (např. ixs) pokud se nazda bere se IDPrimaryKeyGridu
        * @param {content} grid*
        * @returns
        */
        static OznacRadekDleID(content: GContentType<WflListBaseAC>, Id: string, keyId: string, string?: boolean): any;
        static OznacRadkyDleID(content: GContentType<WflListBaseAC>, Id: string, hlasitNenalezeno?: boolean): void;
        static OznacRadkyDlePole(content: GContentType<WflListBaseAC>, Selected: string[]): void;
        static OznacVsechnyRadky(content: GContentType<WflListBaseAC>): void;
        static OdznacVsechnyRadky(content: GContentType<WflListBaseAC>): void;
        static OznaceniVsechRadku(content: GContentType<WflListBaseAC>, oznacit: boolean): void;
        static ZmenOznaceniVsechRadkuVTempTabulce(content: GContentType<WflListBaseAC>, typOznaceni: Gin.Interface.TypOznaceniRadkuSeznamu): JQuery.Promise<boolean>;
        static ZmenOznaceniRadkuVTempTabulce(content: GContentType<WflListBaseAC>, Selected: string[], typOznaceni: Gin.Interface.TypOznaceniRadkuSeznamu): JQuery.Promise<boolean>;
        static OznacPouzeAktualniRadek(content: GContentType<WflListBaseAC>): void;
        static PripravSeznamProSetrideni(content: GContentType<WflListBaseAC>): void;
        static SetSortColumnGridu(content: GContentType<WflListBaseAC>, poradiOd: number): void;
        static ShowWarningNenalezenZaznam(content: GContentType<WflListBaseAC>, ID: string): void;
        static ZrusTrideniGridu(content: GContentType<WflListBaseAC>): void;
        static PosunNevybraneRadkyGridu(content: GContentType<WflListBaseAC>, oKolik: number): void;
        static SetPoradiRadku(content: GContentType<WflListBaseAC>, ID: string, poradi: number): void;
        static GetSelectedIDs(content: GContentType<WflListBaseAC>): string[];
        static IsIDPrimaryKeyGriduGenerated(content: GContentType<WflListBaseAC>): boolean;
        static RemoveEmpty(Ids: string[]): string[];
        static GetSelectedIxps(content: GContentType<WflListBaseAC>): string[];
        static GetSelectedIxsZups(content: GContentType<WflListBaseAC>): string[];
        static GetSelectedIDsByKey(content: GContentType<WflListBaseAC>, Key: string): string[];
        static GetRowByID(content: GContentType<WflListBaseAC>, Id: string): MetaRow<any>;
        static GetRowByAnyID(content: GContentType<WflListBaseAC>, Id: string, key: string): MetaRow<any>;
        static GetPocetRadku(content: GContentType<WflListBaseAC>): number;
        static GetPocetOznacenychRadku(content: GContentType<WflListBaseAC>): number;
        static JsouOznacenyVsechnyRadky(content: GContentType<WflListBaseAC>): boolean;
        static GetAllIDsByKey(content: GContentType<WflListBaseAC>, Key: string): string[];
        static GetAllIDs(content: GContentType<WflListBaseAC>): string[];
        static GetAllValues(content: GContentType<WflListBaseAC>, IDKey: string): string[];
        static GetSelectedRows(content: GContentType<WflListBaseAC>): {}[];
        static ResultInfoByGServiceGroupResponse(content: GContentType<WflListBaseAC>, resultInfo: Isl.GServiceGroupResponse<Gin.Interface.GEntityDto>): void;
        static SetData(content: GContentType<WflListBaseAC>, data: any[]): void;
        static SetCheckDisabled(content: GContentType<WflListBaseAC>, TypVysledkuOperace: Gordic.Gin.Interface.TypVysledkuOperace): void;
        static ResolveResultInfo(content: GContentType<WflListBaseAC>, resultInfo: Gin.Interface.GResultInfo[], typAkce?: Wfl.Interface.TypAkce, checkDisabled?: boolean, typVysledkuOperaceForDisabling?: Gordic.Gin.Interface.TypVysledkuOperace): void;
        static GetIDsProvedenoByResultInfo(resultInfo: Gin.Interface.GResultInfo[], typVysledkuOperace?: Gordic.Gin.Interface.TypVysledkuOperace): string[];
        static AddIDsProvedenoToProvedenoIDs(content: GContentType<WflListBaseAC>, provedeno: string[]): void;
        static ResolveResultInfoByKey(content: GContentType<WflListBaseAC>, resultInfo: Gin.Interface.GResultInfo[], key: string, typAkce?: Wfl.Interface.TypAkce, checkDisabled?: boolean, typVysledkuOperaceForDisabling?: Gordic.Gin.Interface.TypVysledkuOperace): void;
        static ClearResult(content: GContentType<WflListBaseAC>): void;
        static GetResolveResultInfoByKey(content: GContentType<WflListBaseAC>, resultInfo: Gin.Interface.GResultInfo[], key: string): Gin.Interface.GResultInfo[];
        static GetResultInfoByData(content: GContentType<WflListBaseAC>, key: string): Gin.Interface.GResultInfo[];
        static ResolveGroupResult(content: GContentType<WflListBaseAC>, groupResult: Gordic.Wfl.WebClient.GroupResult[]): void;
        static GetResultInfoByGroupResult(groupResult: Gordic.Wfl.Interface.GGroupResultItemDto[]): Gin.Interface.GResultInfo[];
        static SetActionVisible(content: GContentType<WflListBaseAC>, name: string, visible: boolean): void;
        static SetActionEnabled(content: GContentType<WflListBaseAC>, name: string, enabled: boolean): void;
        static ResolveResultInfoContentu(content: GContentType<WflListBaseAC>): void;
        static ZmenOznaceni(content: GContentType<WflListBaseAC>, Old?: Gordic.Gin.Interface.TypVysledkuOperace, New?: Gordic.Gin.Interface.TypVysledkuOperace): void;
        static ZmenOznaceniVResultList(resulList: Gin.Interface.GResultInfo[], old: Gordic.Gin.Interface.TypVysledkuOperace.Provedeno, New: Gordic.Gin.Interface.TypVysledkuOperace): Gin.Interface.GResultInfo[];
        static OznaceniVResultListDleID(resulList: Gin.Interface.GResultInfo[], IDs: string[], oznaceni?: Gin.Interface.TypVysledkuOperace): Gin.Interface.GResultInfo[];
        static OznacRadkyDleVysledku(content: GContentType<WflListBaseAC>, Vysledek?: Gordic.Gin.Interface.TypVysledkuOperace): void;
        static ResolveResultData(content: GContentType<WflListBaseAC>, data?: any, checkDisabled?: boolean, typVysledkuOperaceForDisabling?: Gordic.Gin.Interface.TypVysledkuOperace): void;
        static ResolveRowData(content: GContentType<WflListBaseAC>, row?: any, checkDisabled?: boolean, typVysledkuOperaceForDisabling?: Gordic.Gin.Interface.TypVysledkuOperace): void;
        static SetIxsFunOperation(content: GContentType<WflListBaseAC>, data: Data.Readers.GinsfunDto): void;
        static ShowVysledekAkceGridu(content: GContentType<WflListBaseAC>, text: string): void;
        static UpdateData(content: GContentType<WflListBaseAC>, data: any): void;
        static ShowFlashStandard(content: GContentType<WflListBaseAC>, data: any): void;
        static CleanGrid(content: GContentType<WflListBaseAC>): void;
        static GetIxsArrayByTypVysledkuOperace(content: GContentType<WflListBaseAC>, Vysledek: Gordic.Gin.Interface.TypVysledkuOperace): string[];
        static GetIxsArrayOfKeyByTypVysledkuOperace(content: GContentType<WflListBaseAC>, Key: string, Vysledek: Gordic.Gin.Interface.TypVysledkuOperace): string[];
        static SetRowJakoNeprovedeny(content: GContentType<WflListBaseAC>, ID: string, errorText: string): void;
        static SetRowJakoProvedenoSUpozornenim(content: GContentType<WflListBaseAC>, ID: string, errorText: string): void;
        static SetRowJakoProvedeny(content: GContentType<WflListBaseAC>, ID: string): void;
        static SetRowResult(content: GContentType<WflListBaseAC>, ID: string, typ: Gordic.Gin.Interface.TypVysledkuOperace, errorText: string): void;
        static ClearResultInfo(content: GContentType<WflListBaseAC>): void;
        static ClearResults(content: GContentType<WflListBaseAC>): void;
        static ClearResultsAll(content: GContentType<WflListBaseAC>): void;
        static AddResultInfos(content: GContentType<WflListBaseAC>, resultInfo: Gin.Interface.GResultInfo[]): void;
        static AddResultInfo(content: GContentType<WflListBaseAC>, result: Gin.Interface.GResultInfo): void;
        static ResolveFaildRadku(content: GContentType<WflListBaseAC>, ID: string, errorText: string): void;
        static ResolveFaildAkce(content: GContentType<WflListBaseAC>, errorText: string): void;
        static Prevzit(content: GContentType<WflListBaseAC>, selected: Gin.Interface.GIxsDateTime[]): void;
        static AddBaseActionsToMenu(content: GContentType<WflListBaseAC>): void;
        static ExistID(content: GContentType<WflListBaseAC>, Id: string, KeyID: string): boolean;
        static ApplyResultInfo(content: GContentType<WflListBaseAC>, data: Wfl.Interface.GResultWorkListDto[]): void;
        static RowsCheckEnabled(row: MetaRow<any>, DeafaulAkceEnabled: boolean): boolean;
        static CreateGridBaseExtended(content: GContentType<WflListBaseAC>, gridColumnsDefinition: Gordic.Data.GridFormat, gridOpts?: (() => GGridOptions<any>) | null): JQuery;
        static CreateGridBase(content: GContentType<WflListBaseAC>, gridColumnsDefinition: Gordic.Data.GridFormat, gridOpts?: (() => GGridOptions<any>) | null): JQuery;
        static GetIdArrayFromSelection(content: GContentType<WflListBaseAC>): string[];
        static GetSelectedIxsDatZmena(content: GContentType<WflListBaseAC>): Gin.Interface.GIxsDateTime[];
        static GetSelectedIxsDatZmenaPrizSpis(content: GContentType<WflListBaseAC>): Interface.GIxsDateTimePriznak[];
        static GetSelectedIxsDatZmenaSetridene(content: GContentType<WflListBaseAC>): Gin.Interface.GIxsDateTime[];
        static GetIxsArrayFromAll(content: GContentType<WflListBaseAC>): string[];
        static CreateActionZobrazitDebugInfo(content: GContentType<WflListBaseAC>): GAction;
        static CreateActionDetailDatoveZpravy(content: GContentType<WflListBaseAC>, favorite?: boolean): GAction;
        static CreateActionDetailESU(content: GContentType<WflListBaseAC>, favorite?: boolean): GAction;
        static InfoOVysledkuColumn(content: GContentType<WflListBaseAC>): GGridLinksColumn<any>;
        static CreateActionZobrazitInfoOOperaci(content: GContentType<WflListBaseAC>, favorite?: boolean): GAction;
        static ShowGlobalInfo(content: GContentType<WflListBaseAC>, flash?: boolean): void;
        static ShowInfoIfIs(content: GContentType<WflListBaseAC>): void;
        static GetInfoOProvedenOperaci(content: GContentType<WflListBaseAC>): string;
        static GetNazevAkce(TypAkce: Wfl.Interface.TypAkce): string;
        static GetKeyByContent(content: GContentType<WflListBaseAC>): string;
        static GetKeyByTypRezimuPrace(typRezimu: Wfl.Interface.TypRezimuPraceSeznamu): string;
        static GetIxsByContent(content: GContentType<WflListBaseAC>, rowData: any): string;
        static GetIxsByTypRezimuPrace(typRezimu: Wfl.Interface.TypRezimuPraceSeznamu, rowData: any): string;
        static GetTypWflObjektuByTypRezimuPrace(typRezimu: Wfl.Interface.TypRezimuPraceSeznamu): Wfl.Interface.TypWflObjektu;
        static GetTypWflObjektuByContent(content: GContentType<WflListBaseAC>): Wfl.Interface.TypWflObjektu;
        static CreateActionZmenitFormu(content: GContentType<WflListBaseAC>, favorite?: boolean): GAction;
        static CreateActionPridatDoPracovnihoBloku(content: GContentType<WflListBaseAC>, favorite?: boolean): GAction;
        static CreateActionNacistZeSouboru(content: GContentType<WflListBaseAC>): GAction;
        static CreateActionImportDatZeSouboru(content: GContentType<WflListBaseAC>): GAction;
        static CreateActionExpotDatZeSouboru(content: GContentType<WflListBaseAC>): GAction;
        static addFileDoc(content: GContentType<WflListBaseAC>): void;
        static addFile(content: GContentType<WflListBaseAC>, fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto, customData: any): void;
        static CreateActionOpenElSouborZUloziste(content: GContentType<WflListBaseAC>, favorite?: boolean): GAction;
        static ShowInfoKontrolaMetadat(content: GContentType<WflListBaseAC>, ixs: string): void;
        static ShowInfoSpitkon(content: GContentType<WflListBaseAC>, ixs: string): void;
        static ShowWaitInfoProgress(content: GContentType<WflListBaseAC>, text: string, reverzne?: boolean): void;
        static ShowInfoNeniVybranZadnyRadek(content: GContentType<WflListBaseAC>): void;
        static ShowFlash(content: GContentType<WflListBaseAC>, text: string, typ: Gordic.Gin.Globals.Enums.StateEnum): void;
        static CreateActionStornovat(content: GContentType<WflListBaseAC>, zadatDuvod: boolean): GAction;
        static StornovatSDotazem(content: GContentType<WflListBaseAC>, zadatDuvod: boolean): void;
        static Stornovat(content: GContentType<WflListBaseAC>, selected: Gin.Interface.GIxsDateTime[], duvod: string): void;
        static CreateActionKontrolaMetadat(content: GContentType<WflListBaseAC>, jeVeSpisovne?: boolean): GAction;
        static CreateActionZobrazVysledekKontroly(content: GContentType<WflListBaseAC>): GAction;
        static CreateActionElSouborySNearchivnimFormatem(content: GContentType<WflListBaseAC>, favorite?: boolean): GAction;
        static CreateActionsKontrolaAOpravaMetadat(content: GContentType<WflListBaseAC>, jeVeSpisovne?: boolean): void;
        static CreateActionOpravaPoKontrole(content: GContentType<WflListBaseAC>, TypWflObjektu: Wfl.Interface.TypWflObjektu, TypKontroly?: Wfl.Interface.TypKontroly): GAction;
        static CreateActionZmenOznaceniProvedenoNaProvedenoJizDrive(content: GContentType<WflListBaseAC>): GAction;
        static CreateActionOznacProvedene(content: GContentType<WflListBaseAC>): GAction;
        static CreateActionOznacitDleIdentifikatoru(content: GContentType<WflListBaseAC>): GAction;
        static ZadejIDAOznacRadek(content: GContentType<WflListBaseAC>): void;
        static CreateActionUlozitPoradiRadku(content: GContentType<WflListBaseAC>, favorite?: boolean): GAction;
        static CreateActionUlozitZmeny(content: GContentType<WflListBaseAC>, favorite?: boolean): GAction;
        static CreateActionPrevzit(content: GContentType<WflListBaseAC>, favorite?: boolean): GAction;
        static CreateActionDetailDokSpis(content: WflListBaseAC): GAction;
        static ShowDetailDokSpis(content: WflListBaseAC): GActionParams;
        static EnablePreview(content: GContentType<Wfl.ListAC.WflListBaseAC>, enabled: boolean): void;
        static GetGridFormat(): Gordic.Data.GridFormat;
        static GetEmptyMenuParams(): MenuParams[];
        static GetActiveRow(content: WflListBaseAC): any;
        static GetActiveCellInfo(content: WflListBaseAC): any;
        static AfterCreateGrid(content: WflListBaseAC): void;
        static AddcolumnIxp(gf: Gordic.Data.GridFormat): void;
        static AddcolumnNazev(gf: Gordic.Data.GridFormat): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IGSearchInitialFilter {
        caption: string;
        comparison: number;
        factor: number;
        name: string;
        type: number;
        id?: string;
    }
    interface ICreateSpecificPartOfAddedFilterForm {
        cnt: GContentType<any>;
        comparison: Wfl.Interface.HledaniFilterComparisonEnum | null;
        typeColumnObecneHledani: any;
        filterElement: JQuery<HTMLElement>;
        Form: Forms.Form;
        base: any;
    }
    /** políčko Ano, Ne */
    interface ISearchInput<T> {
        caption: string;
        /** number hodnota (typicky jako enum) */
        value: T;
    }
    enum SearchOwnForeignEnum {
        Vlastni = 0,
        Cizi = 1
    }
    enum SearchYesNoInputEnum {
        Ano = 0,
        Ne = 1
    }
    /**
     * skupina typu dokumentu
     *  */
    enum SearchFileGroupEnum {
        Dokument = 0,
        DokumentCizi = 1,
        DokumentVlastni = 2,
        DokumenJeVlozenVeSpisu = 3,
        DokumentNeniVlozenVeSpisu = 4,
        Spis = 5
    }
    /**
     *  vyřízení
     * */
    enum SearchSettlementEnum {
        AnoVcetneDalsichStavu = 0,
        AnoPouzeVyrizen = 1,
        NePouzeNevyrizen = 2,
        NeVcetneDalsichStavu = 4
    }
    /**
     *  vyřízení a uzavření
     * */
    enum SearchSettlementCloseEnum {
        AnoVcetneDalsichStavu = 0,
        AnoPouzeVyrizenNeboUzavren = 1,
        NePouzeNevyrizen = 2,
        NeNevyrizenAniNeuzavren = 3,
        NeVcetneDalsichStavu = 4
    }
    /**
     * barvy enum
     */
    enum SearchUzoEnum {
        Neoznaceno = 0,
        Cervena = 1,
        Zelena = 2,
        Modra = 3
    }
    /**
     *  stav RAK
     * */
    enum SearchRakStateEnum {
        Neoznaceno = 0,
        Zpracovana = 1,
        Nezpracovana = 2,
        Stornovana = 3
    }
    /**
     * stav epk
     */
    enum SearchEpkStateEnum {
        Nevyrizeno = 0,
        Povoleno = 1,
        VracenoKPrepracovani = 2
    }
    /** forma */
    enum SearchFormEnum {
        /** fyzický originál */
        FyzickyOriginal = 0,
        /** elekronický originál / záznam */
        ElektronickyOriginal = 1
    }
    /** stav zveřejnění */
    enum SearchPublicationStatusEnum {
        Nezahajeno = 0,
        Zahajeno = 10,
        Zverejneno = 20,
        Nezverejneno = 30
    }
    /** stav spisu */
    enum SslcspiEnum {
        Nevyrizen = 0,
        Vyrizen = 1,
        Uzavren = 2,
        Neaktivni = 3,
        Ulozen = 4
    }
    /** Interface stav spisu */
    interface ISslcspiDto {
        stav_spis: SslcspiEnum;
        stav_spis_txt: string;
    }
    enum SearchLogOperator {
        AND = 0,
        OR = 1,
        XOR = 2,
        NOT = 3
    }
    /** hledaní (BASE) */
    class HledaniBase {
        /** SSL - povolení možnosti použitý logických operátorů OR, XOR na hledačkách */
        private ssl_hled_logop;
        /**  Věcné skupiny (NSESSS 2023) */
        private gin_n23_vecsk;
        constructor(ssl_hled_logop: number, gin_n23_vecsk: number);
        readonly searchSslcspiNevyrizen: ISslcspiDto;
        readonly searchSslcspiVyrizen: ISslcspiDto;
        readonly searchSslcspiUzavren: ISslcspiDto;
        readonly searchSslcspiNeaktivni: ISslcspiDto;
        readonly searchSslcspiUlozen: ISslcspiDto;
        readonly searchSslcspiData: ISslcspiDto[];
        /** nezahájeno */
        readonly searchPublicationStatusNotStarted: ISearchInput<SearchPublicationStatusEnum>;
        /** zahájeno */
        readonly searchPublicationStatusStarted: ISearchInput<SearchPublicationStatusEnum>;
        /** zveřejněno */
        readonly searchPublicationStatusPublished: ISearchInput<SearchPublicationStatusEnum>;
        /** nezveřejněno */
        readonly searchPublicationStatusNotPublished: ISearchInput<SearchPublicationStatusEnum>;
        readonly searchPublicationStatusData: ISearchInput<SearchPublicationStatusEnum>[];
        /** fyzický originál */
        readonly searchFormPhysOriginal: ISearchInput<SearchFormEnum>;
        /** elekronický originál / záznam */
        readonly searchFormElOriginal: ISearchInput<SearchFormEnum>;
        readonly searchFormData: ISearchInput<SearchFormEnum>[];
        readonly searchOwnProperty: ISearchInput<SearchOwnForeignEnum>;
        readonly searchForeignProperty: ISearchInput<SearchOwnForeignEnum>;
        readonly searchOwnForeignData: ISearchInput<SearchOwnForeignEnum>[];
        readonly searchYesInputProperty: ISearchInput<SearchYesNoInputEnum>;
        readonly searchNoInputProperty: ISearchInput<SearchYesNoInputEnum>;
        readonly searchYesNoInputData: ISearchInput<SearchYesNoInputEnum>[];
        /** dokument */
        readonly searchFilesDoc: ISearchInput<SearchFileGroupEnum>;
        /** dokument cizí */
        readonly searchFilesDocForeign: ISearchInput<SearchFileGroupEnum>;
        /** dokument vlastní */
        readonly searchFilesDocOwn: ISearchInput<SearchFileGroupEnum>;
        /** dokument ve spisu */
        readonly searchFilesDocInFile: ISearchInput<SearchFileGroupEnum>;
        /** dokument není vložen ve spisu */
        readonly searchFilesDocIsNotInFile: ISearchInput<SearchFileGroupEnum>;
        /** spis */
        readonly searchFilesFile: ISearchInput<SearchFileGroupEnum>;
        /** data skupiny */
        readonly searchFileGroupInputData: ISearchInput<SearchFileGroupEnum>[];
        /** Ano, včetně dalších stavů */
        readonly searchSettlementYesIncludingOtherConditions: ISearchInput<SearchSettlementEnum>;
        /** Ano, pouze vyřízení  */
        readonly searchSettlementYesOnlyDone: ISearchInput<SearchSettlementEnum>;
        /** Ne, pouze nevyřízeno */
        readonly searchSettlementNoOnlyDontDone: ISearchInput<SearchSettlementEnum>;
        /** Ne, včetně dalších stavů */
        readonly searchSettlementNoIncludingOtherConditions: ISearchInput<SearchSettlementEnum>;
        /** data stavů vyřízení */
        readonly searchSettlementData: ISearchInput<SearchSettlementEnum>[];
        /** Ano, včetně dalších stavů */
        readonly searchSettlementCloseYesIncludingOtherConditions: ISearchInput<SearchSettlementCloseEnum>;
        /** Ano, pouze vyřízení nebo uzavřen */
        readonly searchSettlementCloseYesOnlyDoneOrClose: ISearchInput<SearchSettlementCloseEnum>;
        /** Ne, pouze nevyřízeno */
        readonly searchSettlementCloseNoOnlyDontDone: ISearchInput<SearchSettlementCloseEnum>;
        /** Ne, nevyřízeni ani neuzavřen */
        readonly searchSettlementCloseNoDontDoneDontClosed: ISearchInput<SearchSettlementCloseEnum>;
        /** Ne, včetně dalších stavů */
        readonly searchSettlementClloseNoIncludingOtherConditions: ISearchInput<SearchSettlementCloseEnum>;
        /** data stavů vyřízení a uzavření */
        readonly searchSettlementCloseData: ISearchInput<SearchSettlementCloseEnum>[];
        /** nevyřízeno */
        readonly searchEpkStateNotDone: ISearchInput<SearchEpkStateEnum>;
        /** povoleno */
        readonly searchEpkStateAllowed: ISearchInput<SearchEpkStateEnum>;
        /** vráceno k přepracování */
        readonly searchEpkStateReturnedForRework: ISearchInput<SearchEpkStateEnum>;
        /** stav EPK data */
        readonly searchEpkStateData: ISearchInput<SearchEpkStateEnum>[];
        /** neoznaceno */
        readonly searchRakStateNotMarked: ISearchInput<SearchRakStateEnum>;
        /** zpracovaná */
        readonly searchRakStateProcessed: ISearchInput<SearchRakStateEnum>;
        /** nezpracovaná */
        readonly searchRakStateNotProcessed: ISearchInput<SearchRakStateEnum>;
        /** stornovaná */
        readonly searchRakStateCanceled: ISearchInput<SearchRakStateEnum>;
        /** stav RAK data */
        readonly searchRakStateData: ISearchInput<SearchRakStateEnum>[];
        /** je vybráno políčko s ginspod či ginsfun */
        isSelectGinspodfunField: boolean;
        initDataOwnCenter(ownCenterChecked: boolean): {
            data: (number | null)[];
            initialValue: number | null;
        };
        createOwnCenter(filterForm: Forms.Form, ownCenterChecked: boolean, ownCenterVisible: boolean): void;
        private createSearchForm;
        private getId;
        /** počet hodnot ve filtru */
        private valuesCount;
        private helperChoiceFilter;
        private formCurrentTarget;
        private parentInlineDialog;
        /**
         * vytvoření formuláře filtrů
         *
         * @param {Forms.Form} Form formulář
         * @param {GContentType<any>} cnt main content
         * @param {any[]} records záznamy
         * @param {IGSearchInitialFilter} initialFilter vstupní filtr
         */
        createAddFilterForm(Form: Forms.Form, cnt: GContentType<any>, records: any[], initialFilter: IGSearchInitialFilter): void;
        createFormAddedFilters(ev: any, filter: IGSearchInitialFilter, cnt: GContentType<any>, records: any[], edited: boolean): void;
        objectIsEmpty(obj: any): boolean;
        /**
        * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
        *
        * @param {JQuery<HTMLElement>} form předaný element formuláře
        * @returns {JQueryPromise<boolean>} výsledek stavu
        */
        waitForValues(form: JQuery<HTMLElement>): JQueryPromise<boolean>;
        /** kontrola ginspod a ginsfun
         * - vlastní validator
         */
        private checkGinspodGinsfun;
        prepareComparingDropDownList(factor: Gordic.Wfl.Interface.HledaniFilterFactorEnum, initialState: boolean): {
            factorNumberData: Gordic.General.OperatorEnum;
            factorTextData: string;
        }[];
        private initFilterFormDto;
        /**
         * Vytvořit specifickou část filtru ve formuláři
         * @param gcontent kvůli (l_nNumVlastnikA, l_nNumVlastnikB)
         * @param Form
         * @param SelectComparison
         * @param typeColObecneHledani
         * @param addedFiltersElement
         */
        createSpecificPartOfAddedFilterForm(opt: ICreateSpecificPartOfAddedFilterForm): void;
    }
}
declare namespace Gordic.Wfl.WebClient.Hledani {
    /**
     * Vstupní parametry dialogu hledání zásilel.
     *
     * @author TFeik
     * @date   26.11.2018
     * @since 480.1.0.714
     */
    interface GHledaniZasilekDlgInputParams {
        TypHledacky?: Interface.TypHledani;
    }
    /**
     * Návratová hodnota dialogu hledání zásilel.
     *
     * @author TFeik
     * @date   26.11.2018
     * @since 480.1.0.714
     */
    interface GHledaniZasilekDlgReturnValue {
    }
    /**
     * GHledaniZasilekDlg
     *
     * @author TFeik
     * @date   26.11.2018
     * @since 480.1.0.714
     */
    class GHledaniZasilekDlg extends GContentBase {
        /**
         * Validators
         * @type {object}
         */
        private readonly Validators?;
        /**
         * LogovaniEsu
         * @type {Gin.Globals.Dialogs.IGLogovani}
         */
        private readonly LogovaniEsu?;
        /**
         * Vrátí příznak, zda identifikátor zásilky může být libovolný text (nejenom ixs).
         * @type {boolean | null}
         */
        private readonly IsCustomId?;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    26.11.2018
         */
        onContentReady(): void;
        /**
         * closing
         *
         * @author  TFeik
         * @date    26.11.2018
         *
         * @returns {JQuery.Promise<GHledaniZasilekDlgReturnValue>}
         */
        private closing;
        /**
         * GetServer
         *
         * @author TFeik
         * @date    04.12.2018
         */
        private static GetServer;
        /**
         * GetFilterFormValidators
         *
         * @author TFeik
         * @date    04.12.2018
         *
         * @returns {JQuery.Promise<object>}
         */
        private static GetFilterFormValidators;
        /**
         * Na daný element vloží filtrpanel nastavený pro hledání zásilek
         *
         * @param {JQuery<HTMLElement>} appendTo Element, na tkerý je filtrpanel uložen (typicky content.element).
         * @param {(seznamZasilek: Interface.GZasilkyListDto[])} searchDoneFunction Funkce, která se zavolá po vyhledání zásilek. Jak vstup je seznma nalezených zásilek, který následně můžete například uložit do gridu.
         * @returns {JQuery.Promise<JQuery<HTMLElement>>} Vrací promise dovu, na kterém je filtrpanel.
         */
        static createFilterPanelHledaniZasilek(opt: Pick<IGFilterPanelOptions<Interface.GZasilkyListDto>, 'poVyhledaniZobrazit'> & {
            appendTo: JQuery<HTMLElement>;
            applyStartFunction?: () => void;
            searchDoneFunction: (seznamZasilek: Interface.GZasilkyListDto[]) => void;
            userSetting: Data.IGStorage;
            /**
             * initialValues
             * @type {Interface.Hledani.GHledaniZasilekDto}
             */
            initialValues?: Interface.Hledani.GHledaniZasilekDto;
            identifikatorZasilkyOptions?: Pick<Gin.Prefabs.Field.IdentifikatorOptions, 'onLengthGoalReached'>;
            globalSettings: Data.IGStorage | undefined | null;
            content: GContent;
        }): JQuery.Promise<JQuery<HTMLElement>>;
        /**
         * createFilterPanel
         *
         * @author  TFeik
         * @date    27.11.2018
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @param {filterFormOptions} fieldOptions
         * @param {object} [validators]
         * @returns {JQuery<HTMLElement>}
         */
        private static createFilterPanel;
        /**
         * Vytvoří formulář pro filtraci / hledání zásilek.
         *
         * @author  TFeik
         * @date    27.11.2018
         *
         * @param {filterFormOptions} filterOptions
         * @returns {Forms.Form} Definice formuláře.
         */
        private static createFilterForm;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * hledání spisů USU05
     *
     * @author thazmuka
     * @since 484.1.0.220
     */
    class HledaniDleSpisu extends GContentBase {
        private OwnCenterVisible;
        private OwnCenterChecked;
        private l_nNumVlastnikA;
        private l_nNumVlastnikB;
        /** SSL - povolení možnosti použitý logických operátorů OR, XOR na hledačkách */
        private ssl_hled_logop;
        private base;
        private formAddedFilter;
        private taskName;
        private factorIndex;
        private records;
        private addedFiltersElement;
        onContentReady(): void;
        private prepare;
        /**  Věcné skupiny (NSESSS 2023) */
        private gin_n23_vecsk;
        private init;
        private createFilter;
        private createFormFilter;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IWflHledaniDokBase {
        model: {
            HledanyText: any;
            UpresneniFilter: any;
            IxsSuVlastnik: any;
            IxsFunVlastnik: any;
            DateInterval: any;
            TypDatabase: any;
        };
        validators: any;
        HledatDleVlastnostiVisible: any;
        DaysRangeMax: any;
        FilterHledaniTypDb: Function;
        Reload: Function;
        PrepareHledani: Function;
    }
    export class HledaniFulltext extends GContentBase<IWflHledaniDokBase> {
        /** element formuláře */
        private $filterForm;
        /** SSL - povolení možnosti použitý logických operátorů OR, XOR na hledačkách */
        private ssl_hled_logop;
        /** počet hodnot ve filtru */
        private valuesCount;
        private stavIndexovaniFulltext;
        private createFulltextForm;
        onContentReady(): void;
        private ValidateCustomFields;
    }
    export {};
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * obecné hledání USU05
     *
     * @author thazmuka
     * @since 484.1.0.220
     */
    class HledaniObecne extends GContentBase {
        private OwnCenterVisible;
        private OwnCenterChecked;
        private NameOfDateField;
        private UserSettingsPath;
        private factorIndex;
        /** vybrané záznamy filtru */
        private readonly records;
        /** Form doplňujícího filtru */
        private Form;
        /** base*/
        private base;
        /** příznak ESS */
        private EssFlag;
        onContentReady(): void;
        private mainGrid;
        private prepare;
        private createCommandbar;
        private createMenubar;
        /** SSL - povolení možnosti použitý logických operátorů OR, XOR na hledačkách */
        private ssl_hled_logop;
        /**  Věcné skupiny (NSESSS 2023) */
        private gin_n23_vecsk;
        private init;
        private createFilter;
        private DaysRangeMax;
        private createFormFilter;
        private getDateFromUserSettings;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * hledání dle doručení USU05
     *
     * @author thazmuka
     * @since 484.1.0.220
     */
    class HledaniPodleDoruceni extends GContentBase {
        private OwnCenterVisible;
        private OwnCenterChecked;
        private NameOfDateField;
        private UserSettingsPath;
        /** SSL - povolení možnosti použitý logických operátorů OR, XOR na hledačkách */
        private ssl_hled_logop;
        private base;
        private l_nNumVlastnikA;
        private l_nNumVlastnikB;
        private addedFiltersElement;
        private taskName;
        private formAddedFilter;
        private factorIndex;
        /** vybrané záznamy filtru */
        private readonly records;
        onContentReady(): void;
        private prepare;
        /**  Věcné skupiny (NSESSS 2023) */
        private gin_n23_vecsk;
        private init;
        private createFilter;
        private DaysRangeMax;
        private createFormFilter;
        private getDateFromUserSettings;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Dialog hledání spisu pro vložení dokumentu
     * - využito v SSD
     *
     * @author thazmuka
     * @since 484.2.0.201
     */
    class HledaniSpisuProVlozeniDokumentuSimple extends GContentBase {
        private ixp;
        private view;
        private grid;
        private flashVlozitDoSpisuName;
        private row;
        onContentReady(): void;
        private createFilter;
        private loadData;
        private updateGrid;
        private createMenuBar;
        private addHledaniDleID;
        private addVlozitDoSpisuButton;
        private createFilterForm;
        private createGrid;
        private columnsFormat;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Lupa (v typescriptu)
     *
     * @author thazmuka
     * @since 484.2.0.201
     */
    class HledatIdentDokSpisDlg extends GContentBase {
        /** task ID dialogu */
        taskId?: string;
        private stavIndexovaniFulltext;
        private AktDenikySpisu;
        private AktDenikyDok;
        private IxpZnovuVlozit;
        private IxpVkladanehoDok;
        private DisableCJ;
        private LabelTextZnackaDBParam;
        private CJTextDBParam;
        private SpZnTextDBParam;
        private aktivitaCj;
        private aktivitaSpis;
        private denikChecked;
        /** pouze spisový uzel */
        private onlySuChecked;
        /** identifikator */
        private ixp;
        /** dto s daty*/
        private dto;
        /** tělo dialogu */
        private body;
        /** základní část formuláře */
        private formBase;
        /** form element rozšířeného hledání */
        private formExtend;
        /** view seznamu - využito pro refresh gridu */
        private view;
        /** příznak výběru z gridu */
        private gridSelectionFlag;
        /** id flashe pro zobrazení dodatečných informací (akt_znacka + nazev_fun)při výběru ixp z gridu */
        private idFlashIxpFromGrid;
        /** initial value políčka čj.*/
        private g_sslden_cj;
        /**  initial value políčka sp.zn.*/
        private g_sslden_spz;
        /** SSL - Chování subsystému SSL kompatabilně se zadanou verzí GINISu (stará, nová metodika) = 2005 (v tomto případě schovat pole ČJ) */
        private ssl_ver_compat;
        /** SSL - Vytvoření související Sp.Zn. při tvorbě kopie - interní úřadování */
        private ssl_rp_inturado;
        /** GIN - Zobrazení políček VFP pro hledání v lupě (dotační titul a název projektu) */
        private gin_lupa_hlvfp;
        /** SSL - Zobrazení políčka pro zadání externího identifikátoru v lupě */
        private ssl_lupa_extid;
        /**
         *  GIN - Povolení fulltextového vyhledávání pomocí DB nástrojů (věc, podrobně, pozn. - placená funkčnost)
         *  + vyhodnocení dle licence
         * */
        private gin_ftxvyhldb;
        /**
         * SSL - lupa - režim filtru rozšířeného hledání
         * 0 - standardní filtr (výchozí)
         * 1 - pouze fulltext filtr
         * 2 - Pouze PID a ČJ/Sp.zn (bez rozšířeného filtru)
         **/
        private ssl_lupa_rezfil;
        /** je zapnut režím vložení do spisu? */
        private RezimVlozeniDoSpisu;
        private TypSpis;
        /** ADM - Povolení používat střediska spisových uzlů
         * (ref T23183)
         **/
        private adm_rp_ginstre;
        /** ADM - Střediska spisových uzlů - způsob použítí (typ použití - části jedné nebo více organizací)
         * (ref T23183)
         **/
        private adm_ginstre_typ;
        onContentReady(): void;
        private createSidebar;
        private panelPreviewElement;
        private createPanelPreview;
        private tmp_ixp;
        private setPanelSouhrn;
        private CjCaption;
        private SpZnCaption;
        private AktZnCaption;
        private init;
        private initTaskId;
        private setDefaultFlash;
        private setFlash;
        private setInitialFocus;
        private setCursorToEnd;
        private createCommandBar;
        private addOkButton;
        private addShortcuts;
        private CustomActionButtonCaption;
        private createMenuBar;
        /** příznak prvního výběru */
        private firstSelection;
        private createGrid;
        private gin_n23_vecsk;
        private columnsFormat;
        private addPredplnitIxpButton;
        /** vstupní setnutí IXP z uživ. nastavení */
        private initialIxpSet;
        private addPredplnitIxp;
        private refresh;
        private addMoznostiFocusButton;
        private addZnovuVlozitButton;
        private collect;
        private createFormMenubar;
        private StupenUtaj;
        private RezimNakl;
        private setServerFiltersSpZn;
        private setServerFiltersCj;
        private setIxpEmpty;
        private addArrowButton;
        /**
         * dohledání daného spisu
         * - thazmuka (9.5.2022)
         * */
        private searchSpis;
        private createForm;
        private createFieldOpenDialogFocus;
        private createFieldDenikCheck;
        private showLupa;
        private inputChangeSeachSpis;
        private inputChangeIxp;
        private validateIdentifikator;
        /**
        * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
        *
        * @param {JQuery<HTMLElement>} form předaný element formuláře
        * @returns {JQueryPromise<boolean>} výsledek stavu
        */
        private waitForValues;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class ElSouboryBezOvereniPodpisuListAC extends GContentBase<KontrolyOpravyMetadatListBaseAC> {
        model: Interface.GSeznamFilterBaseDto;
        TypSeznamu: Interface.TypSeznamuKontrolyMetadat;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        CreateGridFormat(): void;
        LoadData(filtr?: Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class KontrolaMetadatDleRokuPodaniListAC extends GContentBase<KontrolyOpravyMetadatListBaseAC> {
        model: Interface.GKontrolaMetadatDleCasuPodaniFiltrDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        CreateGridFormat(): void;
        LoadData(filtr?: Interface.GKontrolaMetadatDleCasuPodaniFiltrDto): void;
        CreateActionSouhrn(): GAction;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class KontrolaMetadatListAC extends GContentBase<KontrolyOpravyMetadatListBaseAC> {
        model: Interface.GKontrolaMetadatFiltrDto;
        TypSeznamu: Interface.TypSeznamuKontrolyMetadat;
        IxsSpiAktualni: string;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class KontrolyMetadatSouhrnListAC extends GContentBase<WflListBaseAC> {
        data: Wfl.Interface.GSpitkonDto[];
        model: Wfl.Interface.GSeznamFilterBaseDto;
        onContentReady(): void;
        CreateGrid(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class NevalidniDataPoKontroleListAC extends GContentBase<KontrolyOpravyMetadatListBaseAC> {
        data: Interface.GSpitkonDto[];
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        CreateGridFormat(): void;
        LoadData(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class OpravaMetadatListAC extends GContentBase<KontrolyOpravyMetadatListBaseAC> {
        model: Interface.GOpravaMetadatDto;
        data: Interface.GSpitkonDto[];
        options: Interface.GOpravaFormatuOptions;
        konverzniPracovisteRAKOptions: Interface.GKonverzniPracovisteRAKOptionsDto;
        Vyber: boolean;
        Selected: string[];
        private SettingsPath;
        private IxsFunRak;
        initRakDto: Gordic.Data.Readers.GinsfunDto;
        infoTextRAK: string;
        DBPARAM_spi_rp_vazby: boolean;
        onContentReady(): void;
        SetEnabledActions(): void;
        SetSettings(value: Gordic.Wfl.Interface.GOpravaMetadatSettingsDto | null): void;
        GetSettings(): Gordic.Wfl.Interface.GOpravaMetadatSettingsDto;
        CreateGridFormat(): void;
        GetGridDokSpis(gridColumnsDefinition: any): JQuery;
        LoadData(): void;
        CreateActionOveritPodpisy(): GAction;
        CreateActionZmenitPevnouVazbuNaVolnou(): GAction;
        CreateActionVyjmoutVazbuSouvisejici(): GAction;
        CreateActionPridatEntityDoBalikuVeSkartRizeniDleVazby(): GAction;
        CreateActionZneaktivnitAnalogPrilohy(): GAction;
        CreateActionInfoOChybe(): GAction;
        CreateActionKonverzeDoPDF(): GAction;
        CreateActionVytvoritZadostOZDF(): GAction;
        CreateActionVytvoritZadostProRAK(): GAction;
        ZmenaDatovehoFormatuDialog(ixp: string, ixb: string, ixsUlo: string, id: string, signer: Gordic.Wfl.WebClient.GByteSigner, certInfo: CertInfo, infoText: string): JQuery.Promise<boolean>;
        private ZmenaDatovehoFormatuVlozitPdfDialog;
        CreateActionZmenitDatovyFormat(): GAction;
        ZmenaDatovehoFormatu(_selected: Wfl.Interface.GSpitkonDto[]): JQuery.Promise<boolean>;
        CreateActionSVlozenimPDFA(): GAction;
        ZmenaDatovehoFormatuSVlozenimPDFA(_selected: Wfl.Interface.GSpitkonDto[]): JQuery.Promise<boolean>;
        CreateActionOveritFormat(): GAction;
        CreateActionOznacJakoPDFA(): GAction;
        HromadneOpravit(typOpravy: Interface.TypHromadneOpravyNevalidnichZaznamu, typAkceOPravy: Interface.TypAkceOpravyMetadat): void;
        CreateActionFiktivniOprava(): GAction;
        CreateActionZDFTtest(): GAction;
        ZDFTtest(_selected: Wfl.Interface.GSpitkonDto[]): JQuery.Promise<boolean>;
        TestAkceZDF(ixp: string, ixb: string, ixsUlo: string, id: string, signer: Gordic.Wfl.WebClient.GByteSigner, certInfo: CertInfo, infoText: string): JQuery.Promise<boolean>;
        DoAfterOprava(result: Gin.Interface.GResultInfo[]): void;
        AddToProvedenych(result: string[]): void;
        AddProvedeneIxp(provedeno: string[]): void;
        ReloadData(): void;
        ExitClick(): void;
        /**
         * closing - událost vyvolaná při zavření contentu
         */
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class PrehledNevalidHashSouboruListAC extends GContentBase<KontrolyOpravyMetadatListBaseAC> {
        model: Interface.GNevalidHashFilterDto;
        TypSeznamu: Interface.TypSeznamuKontrolyMetadat;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        CreateGridFormat(): void;
        LoadData(filtr?: Interface.GNevalidHashFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class KontrolyOpravyMetadatListBaseAC extends GContentBase<WflListBaseAC> {
        OpraveneIxp: string[];
        static InitList(content: GContentType<KontrolyOpravyMetadatListBaseAC>): void;
        static CreateActions(content: GContentType<KontrolyOpravyMetadatListBaseAC>): void;
        static AddBaseActionsOpravMetadat(content: GContentType<KontrolyOpravyMetadatListBaseAC>): void;
        static CreateActionOpravitNevalidni(content: GContentType<KontrolyOpravyMetadatListBaseAC>, favorite?: boolean): GAction;
        static CreateActionOveritElSoubory(content: GContentType<KontrolyOpravyMetadatListBaseAC>, favorite?: boolean): GAction;
        static CreateActionHromadneOpravitNevalidni(content: GContentType<KontrolyOpravyMetadatListBaseAC>, favorite?: boolean): GAction;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class DokSpisAktivniListAC extends GContentBase<DokSpisListBaseAC> {
        model: Interface.GSeznamFilterBaseDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class DokSpisUniversalListAC extends GContentBase<DokSpisListBaseAC> {
        TypSeznamuDokSpis: Interface.TypSeznamuDokSpis;
        Data: Interface.GDokSpisListDto[];
        onContentReady(): void;
        SetData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class InfoOZasilkacheSATList extends GContentBase<WflListBaseAC> {
        model: Interface.GSeznamFilterBaseDto;
        ZobrazDorucenky: boolean;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        SetSubtask(dorucenky: boolean): void;
        CreateList(): void;
        CreateActionSubtask(dorucenky: boolean): GAction;
        CreateGrid(): void;
        LoadData(filtr?: Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
        DelegateStavZasilkyIcon(): GGridColumn<any>;
        DelegateStavDZIcon(): GGridColumn<any>;
        DelegateStavDZSystemIcon(): GGridColumn<any>;
        DelegateStavParovaniIcon(): GGridColumn<any>;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class WflListDebugInfoDlg extends GContentBase<Gordic.Wfl.AC.WflBaseAC> {
        InfoDto: Wfl.Interface.GDebugInfoDto;
        onContentReady(): void;
        SetData(): void;
        CreateActionSetDebugSpecialMode(): GAction;
        CreateActionCopySesionToClipboard(): GAction;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GMLNastaveniModeluDlgInputParams {
    }
    interface GMLNastaveniModeluDlgReturnValue {
    }
    /**
     * GExportElDokumentuDlg.
     */
    class GMLNastaveniModeluDlg extends GContentBase {
        /**
         * Historie zásilky.
         */
        private $Formular;
        private tabSberDat;
        private $FormularSberDat;
        private tabTrenovatModel;
        private seznamSU;
        /**
         * OnContentReady.
         *
         * @author  DSebesta
         * @date    25.07.2017
         */
        onContentReady(): void;
        /**
         * Vytvoří menu.
         *
         * @author  DSebesta
         * @date    30.08.2017
         */
        private _createMenu;
        private createForm;
        private setModel;
        private pripravitData;
        private natrenovatModel;
        /**
         * closing
         *
         * @author  DSebesta
         * @date    13.06.2019
         *
         * @returns {JQueryPromise<GMLNastaveniModeluDlgReturnValue>}
         */
        closing(): JQueryPromise<GMLNastaveniModeluDlgReturnValue>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IGFKDetailExtensions {
        setupComponentsOnInit?(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): any;
        setupComponentsOnBuild?(builder: Gordic.Gin.DetailBuilder.GDetailBuilder, that: any, dto: Gordic.Wfl.Interface.GWflvdfkDto): any;
        setupOnContentReady?(): any;
    }
    /** Detail Finanční kontroly */
    class GFinancniKontrolaDetail extends GContentBase<IGFKDetailExtensions> {
        /** Identifikátor dokumentu finanční kontroly*/
        Ixp: string;
        /** Identifikátor zdrojového dokumentu finanční kontroly*/
        IxpZdroj: string;
        /** Údaje primárního dokladu */
        UdajePrimarnihoDokladu: any;
        /** KtgTyp z dokladu */
        KtgTyp: number;
        /** Téma */
        Tema: string;
        /** Téma filtr ALV*/
        TemaFilter: string;
        ReportParams: any;
        EnabledTisk: boolean;
        DisabledTooltipTisk: string;
        EnabledStornoVyriz: boolean;
        ClassName: string;
        /** Dto FK */
        data: Gordic.Wfl.Interface.GWflvdfkDto;
        private ico;
        private l_prazdne;
        private l_priprava;
        private l_editovat;
        private isVlastnik;
        private ixs_fun;
        /** Popisky jaké mají být zobrazeny (PSH) */
        private labels;
        /** Příznak, zda je vložení do EPK povoleno */
        private epkEnabled;
        /** Příznak, zda je Storno nebo Ukončit platnost povoleno */
        private stornoEnabled;
        /** Příznak, zda je Zrušení/Stáhnutí povoleno */
        private stahnoutEnabled;
        /** Příznak, zda je Tisk(El.Obraz) povolen */
        private tiskEnabled;
        private docInfo_ktgTyp;
        private docInfo_ixsTyp;
        /** Původní načtené šablony */
        private origSablony;
        /** Příznak zda došlo k zásadní změně ve FK (např. pro reload detailu dokladu) */
        private FKChanged;
        private gridRC;
        private $form;
        private $formHeadAgenda;
        private $gridRole;
        private statusBarFKStav;
        closing(): boolean | JQuery.PromiseBase<boolean, any, never, never, never, never, never, never, never, never, never, never>;
        onContentReady(): void;
        /**
         * DetailBuilderInit - rozšíření k specifické věci
         * @param builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /** Vytvoření akcí */
        private createActions;
        /** Vložení rolí z uživatelského nastavení do gridu */
        private setRolesFromUS;
        /** Vytvoření MenuBaru */
        private createMenuBar;
        /**
         * Celkové vytvoření tabu Agenda
         * @param tab Tab pro připojení
         */
        private createTabAgenda;
        /**
         * Vytvoření formuláře tabu Agenda
         * @param tab Tab content, kam přijde formulář napojit
         */
        private createHeadFormAgenda;
        /**
         * Vytvoření gridu s Rolemi podle šablony schvalovacího procesu
         * @param tab Tab Agendy
         */
        private createGridRole;
        /** Vytvoření cellTemplate nebo tooltipTemplate pro sloupec s povinností úkonu*/
        private schPovColumnTemplate;
        /** Vytvoření gridFormátu pro výběr rolí podle šablony */
        private createGridRoleColumns;
        /** Vytvoření TabGroups */
        private createTabGroups;
        /** Update gridu seznamu finančních kontrol */
        private updateMainGrid;
        /** Vytvoření stavu finanční kontroly pro statusBar
         * Stavy: null/0/5/10/20 - nezahájena/návrh/probíhá/povolena/zamítnuta
        */
        private setStatusBarStav;
        /** Rozhodnutí, zda má být povoleno vytvoření el. obrazu */
        private enableTisk;
        /**
         * Metoda volaná při startu generování reportu
         * @param rep
         */
        tiskReportStarting(rep: any): JQuery.Promise<any, any, any>;
        /**
         * Metoda volaná po vygenerování reportu
         * @param ev
         * @param rep
         */
        tiskReportFinished(ev: any, rep: any): void;
        /** Akce storna Finanční kontroly */
        private actStorno;
        /** Akce Stažení/Zrušení Finanční kontroly */
        private actStahnout;
        /** Akce Uložení dokumentu finanční kontroly */
        private actSave;
        /** Kontrola, zda došlo k modifikaci dat */
        private checkModifications;
        /** Reload contentu */
        private reload;
        private setFocus;
    }
    /** Content pro přednastavení rolí k šabloně ve FK, UK, PK a EKO schval */
    class GPresetFKContent extends GContent implements IGClientContent {
        private usedPresetName?;
        private $tableRole;
        private rolesView;
        private set;
        prepareContent(params: {
            userSettings: Gordic.Data.IGStorage;
            elements: JQuery;
            rolesView: Data.View<any>;
            controlElements?: JQuery;
            mode?: "view" | "set";
        }): void;
        /**
         * Vytvoření gridu s Rolemi podle šablony schvalovacího procesu
         * @param tab Tab Agendy
         */
        private createGridRole;
        /** Vytvoření cellTemplate nebo tooltipTemplate pro sloupec s povinností úkonu*/
        private schPovColumnTemplate;
        /** Vytvoření gridFormátu pro výběr rolí podle šablony */
        private createGridRoleColumns;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** Extension pro Finanční kontrolu s delegáty */
    interface GWflFKSeznamExtension {
        /** Delegát volaný před podáním kontroly. Očekává vybraný ktg_typ
         * @param ixp Ixp hlavního dokladu
         * @param ktg_typ Zvolený ktg_typ podle typu kontroly (FK-120, UK-160, PK-170), slouží pro vás pro určení o jaký typ kontroly se jedná
         * @param rok Rok ve kterém se podává
         */
        beforeFKPodani?: (ixp: string, ktg_typ: number, rok: number) => JQueryPromise<number>;
        /** Delegát volaný na close contentů FK, pokud byla provedena nějaká zásadní změna (vhodný k reloadu detailu dokladu). */
        FKChanged?: () => void;
    }
    /** Seznam Finančních kontrol */
    class GFinancniKontrolaSeznam extends GContentBase {
        /** PID primárních dokladů */
        Ixp: string;
        /** ClassName detailu, který má být použit (EKO/SSL) */
        ClassName: string;
        /** Údaje primárního dokladu */
        UdajePrimarnihoDokladu: any;
        ReportParams: any;
        KtgTyp: number[];
        KtgTypFilter: any;
        Rok: number;
        Tema: string;
        TemaFilter: string;
        EnabledPodaniFk: boolean;
        EnabledPodaniUk: boolean;
        EnabledPodaniPk: boolean;
        EnabledTiskFk: boolean;
        EnabledTiskUk: boolean;
        EnabledTiskPk: boolean;
        EnabledStornoVyrizFk: boolean;
        EnabledStornoVyrizUk: boolean;
        EnabledStornoVyrizPk: boolean;
        BeforePodani: (ixp: string, ktg_typ: number, rok: number) => JQueryPromise<number>;
        /** Přiznak, zda existuje licenční certifikát pro Finanční kontrolu */
        private licenceFk;
        /** Přiznak, zda existuje licenční certifikát pro Účetní kontrolu */
        private licenceUk;
        /** Přiznak, zda existuje licenční certifikát pro Průběžnou kontrolu */
        private licencePk;
        /** Příznak zda došlo k zásadní změně ve FK (např. pro reload detailu dokladu) */
        private FKChanged;
        private ixs_fun;
        /** Typ aktuální agendy */
        private typAg;
        private $grid;
        private view;
        closing(): boolean;
        onContentReady(): void;
        /** Načtení a vložení dat do gridu */
        private setDataToGrid;
        /** Vytvoření akcí */
        private createActions;
        /** Vytvoření gridu */
        private createGrid;
        /** Vytvoření gridformátu */
        private createGridFormat;
        /** Vytvoření menubaru */
        private createMenuBar;
        /** Update viditelnosti a povolení akcí v menubaru */
        private updateVisibilityAndDisability;
        /**
         * Otevření detailu záznamu finanční kontroly
         * @param ixp Identifikátor finanční kontroly
         * @param omezitKtgTyp Omezení na typ
         */
        private openDetail;
        /**
         * Akce podání FK, UK nebo PK
         * @param ktg_typ Typ
         * @param podaniFk Zda jde o podání FK
         */
        private actPodani;
        /** Akce storna Finanční kontroly */
        private actStorno;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** Dto pro průvodce hromadnou finanční/účetní/průběžnou kontrolou */
    interface GHFKActionDto {
        /** Aktuální GContent */
        Content: GContent;
        /** GridFormát pro předané doklady */
        GridFormat: Data.GridFormat;
        /** Seznam sloupců, které mají být defaultně zobrazeny z GridFormátu */
        ColumnList: string;
        /** Delegát, který dostane záznamy z předaného Dto a má rozhodnout, zda lze nad těmito záznamy dělat kontrolu. Očekává Promise s objektem s ixp a boolean, případně textem důvodu */
        KontrolaZaznamu: (data: any[]) => JQueryPromise<[{
            ixp: string;
            valid: boolean;
            error_txt?: string;
        }]>;
        /** Delegát, který dostane záznam z předaného Dto a ktg_typ zvolený uživatelem a má rozhodnou, zda lze nad tímto záznamem udělat kontrolu s předaným ktg_typem */
        KontrolaZaznamuKtgTyp: (data: any, ktg_typ: number) => boolean;
        /** Delegát, který dostane seznam s ixp dokladů a požaduje údaje primárního dokladu, jak v detailbuilderu */
        GetUPD: (ixps: string[]) => {
            [ixp: string]: Gordic.Wfl.Interface.GFinancniKontrolaUPD;
        };
        /** Delegát, který dostane seznam s ixp dokladů a požaduje reportParams pro tisk, jak v detailbuilderu. Nutno vracet hodnoty jako string kvůli de/serializaci */
        GetReportParams?: (ixps: string[]) => {
            [ixp: string]: any;
        };
        /** Delegát, volaný maximálně jednou po zavření hromadné finanční kontroly, pokud došlo ke změně a měl by být např. reloadnut seznam. Na vstup dává seznam ixp dokumentů u kterých došlo ke změně */
        FKChanged?: (ixps: string[]) => void;
        /** Název primárního identifikátoru v Dto */
        NazevIdentifikatoru: string;
        /** Typ kontroly, kterou chcete provádět (FK, UK, PK) */
        TypKontroly: Gordic.Wfl.Interface.GFinancniKontrolaTypKontroly;
        /** Nabízené typy kontroly a jejich omezení (příjem, výdaj). Pokud není uvedeno bude nabídnuto oboje */
        OmezitKtgTyp?: Gordic.Wfl.Interface.GHFinancniKontrolaOmezitKtgTyp;
        /** Seznam vybraných záznamů */
        InputDto: any[];
        /** Aktuální rok ve kterém se uživatel nachází */
        Rok: number;
        /** Tiskové téma */
        Tema?: string;
    }
    /**
     * Funkce pro otevření průvodce hromadné finanční/účetní/průběžné kontroly
     * @param actionDto Vstupní Dto pro průvodce hromadnou kontrolou
     */
    function addHromadnaFKRun(actionDto: GHFKActionDto): void;
    /**
     * Utils pro podporu asynchronního generování po opuštění průvodce HFK (notifikace, ...)
     * @param that GContent
     * @param GridFormat Gridformát pro zobrazení v Souhrnu průvodce (ideálně stejný jako na začátku průvodce)
     */
    function GHFKAsyncUtils(that: GContent, GridFormat: Data.GridFormat): void;
    /** Hromadná finanční kontrola řešená průvodcem */
    class GHFinancniKontrolaPruvodce extends GContentBase {
        /** Vstupní parametry */
        private TypKontroly;
        private Content;
        private GridFormat;
        private ColumnList;
        private InputDto;
        private KontrolaZaznamu;
        private KontrolaZaznamuKtgTyp;
        private GetUPD;
        private GetReportParams?;
        private NazevIdentifikatoru;
        private Rok;
        private Tema;
        private TemaFilter;
        private KtgTypFilter;
        private ToStep;
        /** ContentValues */
        private labels;
        private ico;
        private ixs_fun;
        private l_editovat;
        private l_prazdne;
        private epkEnabled;
        private tiskEnabled;
        private stahnoutEnabled;
        private KtgTyp;
        /** Lokální */
        private FKDtos;
        private singleFKDto;
        private typHKontroly;
        private selectedKtgTyp;
        private role;
        private dataTypHK;
        private wizardActiveStep;
        private FKChanged;
        /** Prvky */
        private $formFaze1;
        private $gridFaze1;
        private $kpiPanelFaze1;
        private $formFaze2;
        private $gridFaze2Role;
        private $gridFKSouhrn;
        private $tabFKSouhrn;
        private $formFaze5;
        private $gridFaze5Doklady;
        closing(value: any): any[] | JQuery.PromiseBase<any[], never, never, never, never, never, never, never, never, never, never, never>;
        onContentReady(): void;
        /**
         * Akce storna Finanční kontroly
         * @param dtos Doklady, které mají být stornovány
         */
        private actStorno;
        /**
         * Vytvoření formu s vybráním typů kontroly a typ dokumentu
         * @param contentDiv Připojovací element
         */
        private createFormTypHKontroly;
        /**
         * Vytvoření gridu v 1. kroku s vybranými dokumenty
         * @param contentDiv Připojující element
         */
        private createFaze1Grid;
        /** Vytvoření gridFormátu pro grid v 1. kroku */
        private createFaze1GridFormat;
        /**
         * Vytvoření KPI panelu se vyjadřující proveditelnost kontroly
         * @param content Připojující element
         */
        private createKPIPanelFaze1;
        /** Aktualizace KPI panelu se stavy */
        private refreshKPIPanelFaze1;
        /**
         * Aktualizace určitého KPI v KPI panelu
         * @param kpiView kpiView
         * @param updateData Pole pro uložení nových dat
         * @param kind Druh stavu
         * @param kindCount Druh stavu
         * @param kindText Text stavu
         * @param kindIcon Ikona stavu
         */
        private refreshKPIFaze1;
        /** Kontrola předaných záznamů z primární agendy, zda nad nimi může být provedena zvolená kontrola */
        private kontrolaPredanychZaznamu;
        /**
         * Kontrola předaných záznamu z primární agendy, zda nad nimi může být provedena kontrola se zvoleným ktg_typem
         * @param ktg_typ Zvolený ktg_typ
         */
        private kontrolaPodleTypuKontroly;
        /**
         * Akce podání kontrol
         */
        private podani;
        private createActionsFaze2;
        /**
         * Vytvoření formuláře pro výběr šablony a vyplnění popisů
         * @param contentDiv Připojující element
         */
        private createFormSchvalovaciProces;
        /**
         * Vytvoření gridu s rolemi podle vybrané šablony
         * @param contentDiv Připojující element
         * @param canEdit Zda lze grid editovat
         */
        private createFaze2RoleGrid;
        /** Vytvoření cellTemplate nebo tooltipTemplate pro sloupec s povinností úkonu*/
        private schPovColumnTemplate;
        /** Vytvoření gridFormátu pro grid s rolemi */
        private createFaze2RoleGridFormat;
        /** Vytvoření gridu s přehledem FK kontrol nad kterými se pracuje */
        private createFKSouhrnGrid;
        /** Vytvoření gridformátu gridu s přehledem FK kontrol nad kterými se pracuje */
        private createFaze2FKGridFormat;
        /** Získání rolí pro uživatelského nastavení */
        private getRolesForUS;
        /** Vložení rolí z uživatelského nastavení do gridu */
        private setRolesFromUS;
        /** Kontrola vyplněnosti gridu s rolemi */
        private checkGridFaze2Role;
        /** Akce Uložení dokumentů kontroly */
        private actSave;
        /**
         * Funkce volaná při zahájení tisku sestavy
         * @param rep ReportInfo
         */
        private tiskReportStarting;
        /**
         * Funkce volaná po vygenerování a uložení sestavy => uložení změn do db
         * @param ev Event
         * @param rep ReportInfo
         */
        private tiskReportFinished;
        /** Transformace údajů primárních dokladů pro společnou hromadnou kontrolu (sčítání částek, ...) */
        private TransformUPD;
        /**
         * Vytvoření formuláře 5. kroku se všemi postupně vyplněnými údaji
         * @param contentDiv Připojující element
         */
        private createFaze5Forms;
        /**
         * Vytvoření gridu s vybranými doklady z primární agendy pro 5. krok
         * @param contentDiv Připojující element
         */
        private createFaze5DokladyGrid;
        /** Akce Stažení/Zrušení Finanční kontroly nebo kontrol */
        private actStahnout;
        /**
         * Akce zavření a možnosti stažení a zrušení
         * @param change gwizard change
         */
        private actCancel;
        /**
         * Nastavení povolených přechodů na stepy
         * @param change Change wizarda
         * @param allowedStep Povolený step
         */
        private setCreateSteps;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** Typ zobrazení detailu obecneho */
    enum TypZobrazeniDetailuObecneho {
        /** Neurčeno */
        neurceno = 0,
        /** Nový záznam */
        New = 1,
        /** Zobrazit detail */
        View = 2,
        /** Pouze pro zobrazení */
        ViewOnly = 3,
        /** Editační režim */
        Edit = 4,
        /** Nový záznam vzniklý kopií */
        Kopie = 5
    }
    class GSchvalovaciProcesPozadavek extends GContentBase {
        /** režim pouze pro čtení */
        private ReadOnlyMode;
        /** předaný identifikátor z dokumentu */
        private Ixp;
        /** Ixb identifikátor el. přílohy, je-li null nebo undefined, jedná se o předpis nad celým dokumentem/el. obrazem */
        private IxbElp;
        /** kategorie předpisu */
        private KrgRsp;
        /** data seznamu dialogu */
        /** návratová hodnota */
        retval: {
            stav: boolean;
        };
        /** povolení políčka dnů do termínu */
        private DnuDoTermin;
        /** data filtrů pažadavků dle typu DB */
        private DbRqFilters;
        /** GIN SGN - Pozice obrázku doplněného po přidání el. podpisu (např. do PDF) */
        /** parametr na řízení fikce vyřízení */
        private ssl_epk_zpfkce;
        /** Hodnota políčka pro přístup dok/spis */
        private Access;
        /** Test verze databáze pro políčko Access (PravaSpis) */
        private AccessDbVersion;
        /** Příznak spisu */
        private PrizSpis;
        private SchvalDto;
        private menuParams;
        private view;
        private grid;
        private filter;
        private form;
        closing(): {
            stav: boolean;
        };
        onContentReady(): void;
        private setShortCuts;
        /**
         * init dialogu
         * @param rows výchozí select řádků úkonů
         * @param filtersPozadavky výchozí nastavení filtrů po požadavky
         */
        private init;
        private eklep;
        private createForm;
        private createCommandbar;
        private createMenubar;
        /** log por cislo */
        private X0002;
        private X0009;
        /** Identifikátory pro akci tisku (Generování obrazu) */
        private IxpsPrint;
        private updateActionFileVyriz;
        /**
         * typ řádku
         * 1 - standardní řádek se všemi daty
         * 2 - nové danému procesu/předpisu (data jsou dotahována a nemá mít možné všechny akce) | ixs_spd
         * 3 - nové danému procesu/předpisu (data jsou dotahována a nemá mít možné všechny akce) | nazev_sablony
         */
        private rowType;
        private getActiveRow;
        private openAttachment;
        private refresh;
        /**
           * přidat názvy sloupců do řetězce
           */
        private getStringNamesOfColumns;
        private getSearchColumns;
        private createGrid;
        private setInitMenuBar;
        private setMenuBar;
        private formatGrid;
        /**
         * vytvoření filtrpanelu
         * @param filtersPozadavky výchozí filtr požadavků (dle userSettings)
         */
        private createFilterPanel;
        private rows;
        private setMenubarField;
        private getFilter;
        private zrusitPredpis;
        private showNewUkon;
        private showDetailUkon;
        private reloadGrid;
        private zrusitUkon;
        private hromadneZrusitNepovinneUkony;
        private ukonDoEPK;
        /** výběr elektronických dokumentů ke konverzi do PDF */
        private convertToPdf;
        private vlozitDoEPK;
        private zneplatnit;
        private novyPredpis;
        private detailPredpis;
        private souvisejiciDokumenty;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class GSchvalovaciProcesPredpis extends GContentBase {
        /** identifikátor */
        private Ixp;
        /** kategorie předpisů
         * - posílá volající aplikace a slouží primárně k filtrování šablon
         */
        private KrgRsp;
        /** návratová hodnota */
        private retval;
        private IxsSpd;
        private RezimSch;
        private SOdesEpk;
        /** funkční místo ze sessionInfo */
        private IxsFunSessionInfo;
        /** typ zobrazeni */
        private Zobrazeni;
        /** data řádku seznamu (gridu) */
        private Row;
        /** dto dat */
        private Dto;
        /** element gridu */
        private grid;
        /** TestMinDbVersion */
        private TestMinDbVersion;
        /**
         * element na stráce seznamu šablony
         */
        private gridElement;
        private sablonaTab;
        private gridOfTabPredpis;
        private view;
        /** data seznamu */
        private list;
        /** ixs_ssa */
        private SIxsSsa;
        /** předpis schvalovacího procesu */
        private pp;
        private ixsSsaState;
        private aktivitaState;
        private aktivitaTxt;
        private ixsSsaTxt;
        /** režim pouze pro čtení */
        private ReadOnlyMode;
        /** onContentReady  */
        onContentReady(): void;
        private setShortCuts;
        private gridSablona;
        /**
         * vytvořit seznam šablony
         */
        private createSablonaGrid;
        private setTooltipPrednastavit;
        /** formát seznamu šablony */
        private formatSablonaGrid;
        /**
         * nastavení filtrů na šablonu
         * @param checked	filtr zaškrtnut?
         * @param setOption rovnou nastavit filtry? (nebo jen předat)
         */
        private getSablonaFilter;
        private singleSsaRow;
        private predpisForm;
        private eklep;
        private EklepPredpisFlash;
        private createPredpisForm;
        private filtrPrednastavSchvalRole;
        /** vytvořit formulář */
        private createForm;
        private gridPredpis;
        /**
         * vytvořit seznam tabu předpisu
         */
        private createGridTabPredpis;
        private ssl_epk_zpfkce;
        private formatGridTabPredpis;
        /** kontrola na přítomnost naplnění hodnoty STRING */
        private hasValue;
        /** aktualizace tlačítek menubaru */
        private updateMenubar;
        private tempPathUkon;
        /**
         * vytvořit menubar
         */
        private createMenubar;
        private zrusitUkon;
        private openNewUkon;
        private openDetailUkon;
        private loadDataPredpisAfter;
        /**
         * vytvořit commandbar
         */
        private createCommandbar;
        /**
         * closing
         */
        private closing;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Schvalovací proces úkon
     *
     * @author thazmuka
     * @since 482.1.0.995
     */
    class GSchvalovaciProcesUkon extends GContentBase {
        private UsePrioritaAndUzo;
        private form;
        private ixsFunFieldName;
        /** data řádku */
        private Row;
        /** Popisek políčka Koho */
        private KohoLabel;
        /** Třída s hodnotami formuláře */
        private Dto;
        /** stavy */
        private States;
        /** id operace schvalovacího procesu */
        private idOperation;
        /** překreslení seznamu při odejití z dialogu */
        private refreshGrid;
        /**  příznak ručně zvoleného vizuálního podpisu */
        private HandVisualSignPosition;
        /** Povolení políčka dnů do termínu */
        private DnuDoTermin;
        /** počet záznamů v wflvsrf */
        private CountWflvsrf?;
        private flashId;
        private FilterSeSablonouSchvalovaciRole;
        DlePovolenychFazi: string[];
        SeSchvalovaciRoli: string[];
        UnionSchvalovaciRoleBezSablony: string[];
        Algoritmus: string;
        AlgoritmusIxp: string;
        /** tlačítko uložení */
        OkEnabled: boolean;
        SOdesEpk: number;
        IxsFunSessionInfo: string;
        ZpusVyriz: number;
        Hist: number;
        /** identifikátor schvalovacího předpisu */
        IxsSpd: string;
        RezimSch: number;
        PrizRsp: number;
        Zobrazeni: TypZobrazeniDetailuObecneho;
        PrizRadekSpd: number;
        PredpisDetail: Gordic.Wfl.Interface.GApprovalProcessDto[];
        SchRoleChar: number;
        PrizEditTermin: number;
        IdAlg: string;
        IxbElPrilohy: string;
        FilterTypPozadPod: any;
        FilterKtgSchRole: any;
        Ixp: string;
        /** property plněna pouze při otevření dialogu */
        private PocetFunkciVRoli;
        /** termín plánovaného vyřízení (string) */
        private Termin;
        /** termín plánovaného vyřízení (date) */
        private TerminDate;
        /** termín plánovaného vyřízení (formátovaný string) */
        private TerminFormatting;
        /** termín plánovaného vyřízení z hlediska max. počtu dnů na vyřízení úkonu (number) */
        private TerminPrizDnuPozad;
        private messageCannotBeExtended;
        private messageCannotBeShortened;
        private messageCannotBeExtendedTermin;
        private messageCannotBeShortenedTermin;
        /** globální parametry */
        private EpkParams;
        /** režim pouze pro čtení */
        private ReadOnlyMode;
        onContentReady(): void;
        private setShortCuts;
        private init;
        private initFiltrDleRole;
        /** is demo (flag) ?*/
        private omedis;
        private createMenuBar;
        private validateIxsFunKomu;
        /** vrať cestu k uživatelskému nastavení (možno závislou na schval. roli) */
        private getPathGlobalSettings;
        /** vytvořit menu s příkazy Ok, Zrušit */
        private createCommandBar;
        /**
        * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
        *
        * @param {JQuery<HTMLElement>} form předaný element formuláře
        * @returns {JQueryPromise<boolean>} výsledek stavu
        */
        private waitForValues;
        /** uložit úkon */
        private save;
        private _save;
        closing(): boolean;
        private showFlashTermin;
        /** příznak posunutí dle prac. dny */
        private PrizDenPozPrac;
        /**
         * změna políčka filtru dle role
         */
        private filterDleRoleChanged;
        private schvalProcesUkonFlash;
        private createForm;
        private eklep;
        /**
         * ssl_epk_zpfkce - SSL EPK - povolení zadat/změnit příznak fikce vyřízení u úkonu pro EPK
         * @type {number}
         * - 0 = NE
         * - 1 = ANO - editace
         * - 2 = ANO - pouze zobrazení
         */
        private ssl_epk_zpfkce;
        private changetPrizFikceField;
        /**
         * nastavení stavu menubaru
         */
        private setMenubars;
        private setInitialValues;
        private setStates;
        /** Získat úkon */
        private getUkon;
        /** povolení editace termínu */
        lzeEditovatTermin(): boolean;
        /** povolení editace zaškrtávátka zda podepisovat přílohy */
        lzeEditovatZdaPodepisovatPrilohy(): boolean;
        lzeEditovatPrioritaUzoVizualUmisteni(): boolean;
        /**
         *  Lze editovat roli?
         *  - povolení editace políčka role
         */
        lzeEditovatRoli(RezimSch: number): boolean;
        /**
         * Povolení editace políčka schvalovací úroveň
         * */
        lzeEditovatSchvalovaciUroven(RezimSch: number): boolean;
        /**
         * povolení editace trojpolíčka komu je směrován požadavek
         * @param ixsFunKomu funkční místo (komu)
         */
        lzeEditovatIxsFunKoho(SOdesEpk: number, ixs_fun_komu?: string): boolean;
        /**
         * LzeEditovatIxsFunKoho i když už je úkon v EPK
         */
        lzeEditovaIxsFunKohoVEpk(SOdesEpk: number, ixs_fun_komu?: string): boolean;
        /** povolení editace políčka typu požadavku */
        lzeEditovatTypPozadavku(RezimSch: number): boolean;
        /**
         * povolení editace políčka upřesnění
         */
        lzeEditovatUpresneni(): boolean;
        /**
        * povolení editace zaškrtávacího pole schvalovací povinnost
        */
        lzeEditovatSchvalovaciPovinnost(RezimSch: number): boolean;
        /**
         * Zda je aktuálně přihlášená osoba zadavatel úkonu
         */
        private zadavatel;
        /** nevyřízený úkon (případně vrácený k přepracování ale s hist=0 - tzn. záznam z wflszps) */
        private nevyrizenyNeboVracenyKPrepracovaniSHist0;
        private haveValue;
        private isEmptyObject;
        private setFiltrDleRole;
        private setFilterSeSablonouSchvalovaciRole;
        /**
         * nastavení filtru pro políčko "Vyřizuje"
         * */
        private setInitFiltrVyrizuje;
        private setServerFilterSchvalRole;
        private setServerFiltersIxsFunKomu;
        private getIxsFunKomuServerFilters;
        private okEnabled;
        private setButtonSignAttachment;
        private roleChanged;
        /**
         * enableControls
         */
        private enableControls;
        private setSpecialStates;
        private setStateButtonPrilohy;
        private badgeUmisteni;
        private updateBadgeUmisteniPodpisu;
        /** temp WflSignCreateConfig pro budoucí uložení vizuálního podpisu (když nemám ser_cislo) */
        private tempWflSignCreateConfig;
        private badgeUmisteniAttachment;
        private updateBadgeUmisteniPodpisuAttachment;
        private addButtonUmisteniPodpisuPrilohy;
        private addButtonUmisteniPodpisu;
        /**
         * vrať datum (termín) na základě počtu dnů od teď
         */
        private getDateAfterDays;
        /**
         * vrať datum (termín) na základě počtu dnů od teď
         * POUZE PRACOVNÍ DNY (PONDĚLÍ-PÁTEK)
         */
        private getDateAfterWorkdays;
        /**
         * vrať mi počet dnů k termínu na základě vstupního datumu (předpokládaného termínu)
         */
        private getDaysUntilDate;
        private getWorkdaysUntilDate;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** Historie žádosti + historie schvalování žádosti (kpi) */
    class SubjektyVlozeniEpk extends GContentBase {
        /** element seznamu */
        private grid;
        /** element kpi */
        private kpi;
        /** element headerText */
        private headerText;
        /** itemy kpi */
        private kpiItems;
        onContentReady(): void;
        private createKpi;
        private setKpi;
        private removeAll;
        /**
        * nastavení tooltipu kpi listku
        *
        * @param {any} row data řádku
        */
        private setKpiTooltipOptions;
        /**
        * nastavení item template kpi listku
        *
        * @param {any} value hodnota
        */
        private setKpiItemTemplate;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** Historie žádosti + historie schvalování žádosti (kpi) */
    class GHistorieSchvalovani extends GContentBase {
        /** element seznamu */
        private grid;
        /** element kpi */
        private kpi;
        /** řádek */
        private row;
        /** server seznamu */
        private serverGrid;
        /** kpiItems - aktuální proces */
        private kpiItems;
        /** kpiItemsAll - všechny procesy */
        private kpiItemsAll;
        /** element subtasku */
        private subtask;
        /** SSL EPK - Rozšíření pro odsouhlasení přidělení/předání dokumentů a vyřízení spisů */
        private ssl_epk_plus2;
        /** příznak otevření komponenty umístění vizuálního podpisu */
        private signatureLocationComponentIsOpen;
        onContentReady(): void;
        private dataHistorySimple;
        private init;
        /** sloupce na prohledávání */
        private getSearchColumns;
        private SerCislo;
        private createSubtask;
        private removeAll;
        private gin_pdf_pictpos;
        private epk_povumipod;
        private ssl_epk_zpfkce;
        private PrizRsp;
        private approvalProcess;
        private rowsApprovalProcessAll;
        /**
         * vytvořit grid celého schvalovacího procesu
         * - stejný seznam jako na dialogu požadavku schvalovacího procesu
         *  */
        private createGridApprovalProcessAll;
        private createKpi;
        private addButtonSignaturePlacement;
        private changePriority;
        /**
         * otevřít dialog podrobnosti schval. procesu
         * @param object
         */
        private editeForm;
        private setKpi;
        private createGrid;
        private updateGrid;
        private getListOfRequestChangeHistory;
        /** načtení sloupců gridu historie změn žádosti */
        private loadGridFormatPodrobnosti;
        /**
         * zobrazit dialog podrobností úkonu schvalovacího procesu
         */
        showPodrobUkonSchvalProces(kpi: Gordic.Wfl.Interface.GHistorieSchvalovaniKpiDto, states: {
            Upresneni: boolean;
            Komu: boolean;
            Termin: boolean;
        }): void;
        /**
         * nastavení tooltipu kpi listku
         *
         * @param {any} row data řádku
         */
        private setKpiTooltipOptions;
        /**
        * nastavení item template kpi listku
        *
        * @param {any} value hodnota
        */
        private setKpiItemTemplate;
        /**
         * vytvořit form podrobností úkonu schvalovacího procesu
         */
        private createFormPodrobUkonSchvalProces;
        private createCommandBarPodrobUkonSchvalProces;
        private modalWindowElement;
        private createModalWindowPodrobUkonSchvalProces;
        /** refresh contentu */
        private refresh;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GPrimePredaniDokumentuDlgInputParams {
        /**
         * Ixp dokumentu.
         */
        IXPs?: string;
        /**
         * Příznak, zda se jedná o hromadné odeslání (default: false).
         */
        TypPredani?: TypPredaniPrimePredaniDokumentuDlg;
    }
    /**
     * GPodaniOpravaPisemnostiDlg
     *
     * @returns
     */
    class GPrimePredaniDokumentuDlg extends GContentBase {
        private zakladniFormular;
        private SslPripreomezPar;
        private ulozeno;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         * @date    01.09.2017
         */
        onContentReady(): void;
        private vytvorFormular;
        private predat;
        private closing;
    }
}
declare namespace Gordic.Wfl.Prefabs.Column {
    enum Names {
        TypPrilohy = "typPrilohy"
    }
    enum TypPrilohyEnum {
        ElektronickyObraz = 0,
        Priloha = 1,
        PrilohaFyzicka = 2,
        PrilohaElektronicka = 3,
        SoucastKontejneru = 4
    }
    function TypPrilohy<TRow = any>(opt: {
        gridColumn?: GGridColumn<TRow>;
        getData: (data: TRow, meta?: MetaRow<TRow>, cellInfo?: CellTemplateInfo<TRow>) => TypPrilohyEnum;
    }): GGridColumn<TRow>[];
}
declare namespace Gordic.Wfl.Prefabs.Field {
    /**
     * Enum názvů políček použitých ve formuláři uživatelského nastavení zásilek.
     *
     * @author  TFeik
     * @date    17.01.2019
     */
    enum Names {
        DokumentSpis = "DokumentSpis_dCxz3X",
        PocetDokumentuAnalogovych = "PocetDokumentuAnalogovych_vGNx2c",
        PocetDokumentuCelkem = "PocetDokumentuCelkem_NkF3zQ",
        VecPodrobne = "VecPodrobne_xk68NE",
        DatumPodani = "DatumPodani_XHpZ8R",
        DatumVyrizeni = "DatumVyrizeni_5J6ggc",
        DatumUzavreni = "DatumUzavreni_3C9x7W",
        DatumPrijeti = "DatumPrijeti_7ZkFKD",
        FormaDokumentuOriginalAnalogova = "FormaDokumentOriginalAnalogova_xFzt8W",
        FormaDokumentuOriginalDigitalni = "FormaDokumentOriginalDigitalni_55TTtJ",
        FormaDokumentuKonverzeAnalogova = "FormaDokumentKonverzeAnalogova_6bsEKn",
        FormaDokumentuKonverzeDigitalni = "FormaDokumentKonverzeDigitalni_N5jNyQ",
        ZapamatovatNastaveniOdesilaneZpravy = "ZapamatovatNastaveniOdesilaneZpravy_Euq5TP",
        OdesilatelGinsmbx = "OdesilatelGinsmbx_Qy78jp"
    }
    function DokumentSpis(opt?: GRadioOptions<number>): GRadioOptions<number>;
    function PocetDokumentuAnalogovych(opt?: GNumberBoxOptions): GNumberBoxOptions;
    function PocetDokumentuCelkem(opt?: GNumberBoxOptions): GNumberBoxOptions;
    function VecPodrobne(opt?: GStringBoxOptions): GStringBoxOptions;
    function DatumPodani(opt?: GDateBoxOptions): GDateBoxOptions;
    function DatumVyrizeni(opt?: GDateBoxOptions): GDateBoxOptions;
    function DatumUzavreni(opt?: GDateBoxOptions): GDateBoxOptions;
    function DatumPrijeti(opt?: GDateBoxOptions): GDateBoxOptions;
    function FormaDokumentuOriginalAnalogova(opt?: GCheckOptions): GCheckOptions;
    function FormaDokumentuOriginalDigitalni(opt?: GCheckOptions): GCheckOptions;
    function FormaDokumentuKonverzeAnalogova(opt?: GCheckOptions): GCheckOptions;
    function FormaDokumentuKonverzeDigitalni(opt?: GCheckOptions): GCheckOptions;
    /**
     * Prefab políčka formuláře použitého pro zapamatování si aktuálního nastavení odesílané zprávy (email, ds, edesk, gex, hp) pro další odesílané zprávy stejného druhu.
     *
     * @author  TFeik
     * @date    25.03.2019
     *
     * @param {GCheckOptions} [opt]
     * @returns {GCheckOptions}
     */
    function ZapamatovatNastaveniOdesilaneZpravy(opt?: GCheckOptions): GCheckOptions;
    /**
     * Prefab políčka typu identifikátor dokuemntu / spisu.
     *
     * @author  JSindelka
     * @date    12.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GIdentifikatorUniversal(opt?: Gin.Prefabs.Field.IdentifikatorOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * export function OdesilatelGinsmbx
     *
     * @author  TFeik
     * @date    26.03.2019
     *
     * @param {GSelectBoxOptions<Gordic.Wfl.Interface.GGinsmbxFieldDto>} [opt]
     * @returns {GSelectBoxOptions<Gordic.Wfl.Interface.GGinsmbxFieldDto>}
     */
    function OdesilatelGinsmbx(opt?: GSelectBoxOptions<Gordic.Wfl.Interface.GGinsmbxFieldDto>): GSelectBoxOptions<Gordic.Wfl.Interface.GGinsmbxFieldDto>;
}
declare namespace Gordic.Wfl.Prefabs {
    /**
     * Vytvoří sloupce gridu dle zadaných jmen.
     *
     * @param {("datumZmeny" | "zmenuProvedl" | "popisZmeny" | "poradoveCislo")[]} columnNames Pole názvů sloupců, pro které jsou připraveny prefaby.
     * @par-am {Gordic.Data.GridFormat<TRow>} [gridFormat] GridFormat na který se vloží nový sloupec. Pokud není definován, pak se vytvoří nový.
     * @returns {Gordic.Data.GridFormat<TRow>} Gridformat s nově vloženými sloupečky.
     */
    function columns<TRow>(columnNames: ("datumZmeny" | "zmenuProvedl" | "popisZmeny" | "poradoveCislo" | "spisovnaOd" | "referentOd" | "spisovyUzelOd" | "barva" | "ixp" | "znacka" | "nazev" | "datumSkartace" | "datumPrijetiDoSpisovny" | "datumPodani" | "datumUzavreni" | "datumVyrizeni" | "vypujceno" | "spisovyPlan" | "spisovyZnak" | "skartacniLhuta" | "stavVArchivu" | "idArchivu" | "posouzeniNDA" | "stavDokumnetuSpisu")[]): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Datum změny.
     * Data: dat_zmena
     *
     * @author  TFeik
     * @date    17.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function datumZmenyColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Změnu provedl.
     * Data: nazev_zmenu_prov
     *
     * @author  TFeik
     * @date    17.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function zmenuProvedlColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Změna.
     * Data: hist_text
     *
     * @author  TFeik
     * @date    17.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function popisZmenyColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Pořadové číslo.
     * Data: PoradoveCislo
     *
     * @author  TFeik
     * @date    17.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function poradoveCisloColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Referent od.
     * Data: nazev_fun_od
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function referentOdColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Spisový uzel od.
     * Data: nazev_fun_od
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function spisovyUzelOdColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Označení barvou.
     * Data: uzo
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function barvaColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function textChybyColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function actionEnabledColumnDebug<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function cisloChybyColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Identifikátor.
     * Data: ixp
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function ixpColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function ixbColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function ixsBalikuColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function ixpSpisuColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function ixpDokumentuColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function umisteniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function vecNazevColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function popisChybyColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Značka.
     * Data: akt_znacka
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function znackaColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Věc.
     * Data: nazev
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function nazevColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Datum skartace.
     * Data: dat_skartace
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function datumSkartaceColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Datum podání.
     * Data: dat_pod
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function datumPodaniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
 * Vytvoří sloupec Datum podání.
 * Data: dat_pod
 *
 * @author  TFeik
 * @date    18.07.2018
 *
 * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
 * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
 */
    function datumPodaniZalozeniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Datum uzavření.
     * Data: dat_uzav
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function datumUzavreniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Datum vyřízení.
     * Data: dat_vyriz
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function datumVyrizeniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Spisový plán.
     * Data: spis_pl
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function spisovyPlanColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Spisový znak.
     * Data: spis_znak
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function spisovyZnakColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Skartační znak (dle spisového plánu a znaku).
     * Data: skar_znak
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function skartacniZnakColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
 * Vytvoří sloupec Skartační znak (dle spisového plánu a znaku).
 * Data: skar_znak
 *
 * @author  TFeik
 * @date    18.07.2018
 *
 * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
 * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
 */
    function skartacniZnakDleSpZnakuColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Skartační lhůta (dle spisového plánu a znaku).
     * Data: skar_lhuta
     *
     * @author  TFeik
     * @date    18.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function skartacniLhutaColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
 * Vytvoří sloupec Skartační lhůta (dle spisového plánu a znaku).
 * Data: skar_lhuta
 *
 * @author  TFeik
 * @date    18.07.2018
 *
 * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
 * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
 */
    function skartacniLhutaDleSpZnaku<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Stav dokumnetu spisu.
     * Data: stav_sul_txt
     *
     * @author  TFeik
     * @date    23.07.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function stavDokumnetuSpisuColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Identifikátor dokumentu / spisu.
     * Data: ixp
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function identifikatorDokumnetuSpisuColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec ID Doručenky.
     * Data: id_dorucenky
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function idDorucenkyColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Číslo jednací.
     * Data: cj
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {Interface.TypRezimuPraceSeznamu} [typSeznamu]
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function cisloJednaciColumn<TRow = any>(typSeznamu: Interface.TypRezimuPraceSeznamu, gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Podací číslo.
     * Data: pod_cislo
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function podaciCisloColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Adresát.
     * Data: esu_txt
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function adresatColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Zástupná osoba.
     * Data: zast_txt
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function zastupnaOsobaColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Datum podání odeslání.
     * Data: dat_pod
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function datumPodaniOdeslaniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Datum vypravení.
     * Data: dat_odes
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function datumVypraveniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Stav doručení.
     * Data: s_dor_txt
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function stavDoruceniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Datum potvrzení.
     * Data: dat_potvrz
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function datumPotvrzeniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Datum potvrzení.
     * Data: dat_potvrz
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function datumPotvrzeniDoruceniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Odesílající.
     * Data: odesilajici
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function odesilajiciColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vytvoří sloupec Odesílající spisový uzel.
     * Data: nazev_akt_su
     *
     * @author  TFeik
     * @date    04.10.2018
     *
     * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
     * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
     */
    function vlastnikSpisovyUzelColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
 * Vytvoří sloupec Odesílající spisový uzel.
 * Data: nazev_akt_su
 *
 * @author  TFeik
 * @date    04.10.2018
 *
 * @param {GGridColumn<TRow>} [gridColumn] Volitelné parametry sloupce (pro přetížení).
 * @returns {Gordic.Data.GridFormat<TRow>} GridFormat s novým sloupečkem.
 */
    function vlastnikColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * export function stavZasilkyColumn<TRow = any>
     *
     * @param {GGridColumn<TRow>} [gridColumn]
     * @param {{ SDor?: string, SDorTxt?: string }} [propertyNames] Názvy property, na kterém najdu hodnoty stavu zásilky.
     * @returns {Gordic.Data.GridFormat<TRow>}
     */
    function stavZasilkyColumn<TRow extends {
        s_dor?: number | null;
        SDor?: number | null;
        s_dor_txt?: string | null;
        SDorTxt?: string | null;
        lic_mail?: string | null;
        por_cislo_mail?: number | null;
    } = any>(propertyNames: {
        /** (default = "s_dor" | "SDor") Stav doručení zásilky. */
        SDor: string;
        /** (default = "s_dor_txt" | "SDorTxt") Popis (text) stavu doručení zásilky. */
        SDorTxt: string;
    }, gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    /**
     * Vrátí ikonu stavu zásilky.
     *
     * @author  TFeik
     * @date    05.12.2024
     *
     * @param {{ stavDoruceni: Interface.StavZasilkyEnum | Ginis.DbModel.GWflcsdoEnum | null | undefined, stavDoruceniTxt: string | null | undefined, lic_mail: string | null | undefined} input
     * @returns {IconTemplate}
     */
    function getStavZasilkyIcon(input: {
        stavDoruceni: Interface.StavZasilkyEnum | Ginis.DbModel.GWflcsdoEnum | null | undefined;
        stavDoruceniTxt: string | null | undefined;
        lic_mail: string | null | undefined;
        por_cislo_mail: number | null | undefined;
    }): IconTemplate;
}
declare namespace Gordic.Wfl.ListPrefabs {
    const GridSirkaPID = 120;
    const GridSirkaReferent = 160;
    const GridSirkaZnacka = 130;
    const GridSirkaDatum = 145;
    const GridSirkaNazev = 200;
    const GridSirkaDatumOnly = 100;
    const GridSirkaPoznamka = 150;
    const GridSirkaDuvod = 150;
    const GridSirkaIkony = 32;
    function ixpColumn(): GGridColumn<any>;
    function IconGrid(_caption: string, _template: IconTemplate): any;
    function IconZpusobDoruceni(delegate: ObjectLiteral<Gordic.Wfl.WebClient.GIcon>): GGridColumn<any>;
    function IconStavElPodani(delegate: ObjectLiteral<Gordic.Wfl.WebClient.GIcon>): GGridColumn<any>;
    function DelegateElPodpisIcon(): GGridColumn<any>;
    function DelegateSSign(): GGridColumn<any>;
    function DelegatePrizNearchFormat(): GGridColumn<any>;
    function IconStavZasilkyIcon(delegate: ObjectLiteral<Gordic.Wfl.WebClient.GIcon>): GGridColumn<any>;
    function vecColumn<TRow = any>(gridColumn?: GGridColumn<TRow>, columnName?: string): Gordic.Data.GridFormat<TRow>;
    function nazevColumn<TRow = any>(gridColumn?: GGridColumn<TRow>, columnName?: string): Gordic.Data.GridFormat<TRow>;
    function spisovyPlanColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function datUlozeniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function datPodaniColumn(_text: string): GGridColumn<any>;
    function datPodaniZalozeniColumn(_text: string): GGridColumn<any>;
    function datPrijPodaniColumn(_text: string): GGridColumn<any>;
    function datOdesColumn(): GGridColumn<any>;
    function mailToColumn(): GGridColumn<any>;
    function mailFromColumn(): GGridColumn<any>;
    function mailboxColumn(): GGridColumn<any>;
    function datZpracovaniColumn(): GGridColumn<any>;
    function stavPodaniColumn(): GGridColumn<any>;
    function datPredaniColumn(): GGridColumn<any>;
    function StavNaPodatelneColumn(): GGridColumn<any>;
    function datPrijetiColumn(): GGridColumn<any>;
    function datVypraveniColumn(): GGridColumn<any>;
    function datVyrizeniColumn(): GGridColumn<any>;
    function datUzavreniColumn(): GGridColumn<any>;
    function adresatJmenoColumn(): GGridColumn<any>;
    function adresatPostaColumn(): GGridColumn<any>;
    function adresatAdresaColumn(): GGridColumn<any>;
    function adresatSchrankaColumn(): GGridColumn<any>;
    function adresatHKPcolumn(): GGridColumn<any>;
    function odesilatelSchrankaColumn(): GGridColumn<any>;
    function typDokumentuTxtColumn(): GGridColumn<any>;
    function typAgendyTxtColumn(): GGridColumn<any>;
    function aktualniVlastnikColumn(): GGridColumn<any>;
    function kPrevzetiOdUzlu(): GGridColumn<any>;
    function kPrevzetiOdStrediska(): GGridColumn<any>;
    function nazevTypDokumentuColumn(): GGridColumn<any>;
    function cisloJednaciColumn(_text: string): GGridColumn<any>;
    function cisloJednaciSpisuColumn(_text: string): GGridColumn<any>;
    function errorTextColumn(): GGridColumn<any>;
    function mistoVznikuColumn(): GGridColumn<any>;
    function datDatZmenaColumn(): GGridColumn<any>;
    function datDatZmenaCustomLabelColumn(_text: string): GGridColumn<any>;
    function poznamkaColumn(columnName?: string): GGridColumn<any>;
    function PredanoSuColumn(columnName?: string): GGridColumn<any>;
    function NazevSuAktColumn(): GGridColumn<any>;
    function NazevFunAktColumn(): GGridColumn<any>;
    function adresatColumn(): GGridColumn<any>;
    function vlastnikEntityColumn(): GGridColumn<any>;
    function cjExtEntityColumn(): GGridColumn<any>;
    function odesilatelColumn(): GGridColumn<any>;
    function odesilatelJakoOdesilatelColumn(): GGridColumn<any>;
    function naSpisovemUzluColumn(): GGridColumn<any>;
    function vlastnictviColumn(): GGridColumn<any>;
    function poradiColumn(): GGridColumn<any>;
    function redistribuceColumn(): GGridColumn<any>;
    function popisColumn(): GGridColumn<any>;
    function zmenuProvTxtColumn(): GGridColumn<any>;
    function vypravniCisloColumn(): GGridColumn<any>;
    function zastOsobaNazevColumn(): GGridColumn<any>;
    function zpusobDoruceniColumn(): GGridColumn<any>;
    function nazevStartSUColumn(): GGridColumn<any>;
    function nazevAktSU(): GGridColumn<any>;
    function odesilajiciAktStartColumn(): GGridColumn<any>;
    function odesilajiciJakoOdesilajiciColumn(): GGridColumn<any>;
    function vlastnikColumn(): GGridColumn<any>;
    function nazevRfAktColumn(typPrehledu: Interface.TypSeznamuDokSpis): GGridColumn<any>;
    function zpracovatelColumn(): GGridColumn<any>;
    function predanoUzluColumn(): GGridColumn<any>;
    function predanoUzluOtherColumnColumn(): GGridColumn<any>;
    function cilovySUColumn(): GGridColumn<any>;
    function dalsiCilSUColumn(): GGridColumn<any>;
    function konecnyCilSUColumn(): GGridColumn<any>;
    function cilovyRefColumn(): GGridColumn<any>;
    function predanoOsobeColumn(): GGridColumn<any>;
    function predanoOsobeOtherNameColumn(): GGridColumn<any>;
    function ucelDistribuce(): GGridColumn<any>;
    function stavPisTxtColumn(): GGridColumn<any>;
    function DruhZachazeniTxtColumn(): GGridColumn<any>;
    function PodCisloColumn(): GGridColumn<any>;
    function pristupColumn(): GGridColumn<any>;
    function porCisloColumn(): GGridColumn<any>;
    function ixsTypTxtColumn(): GGridColumn<any>;
    function znackaColumn(_text: string): GGridColumn<any>;
    function cjColumn(_text: string): GGridColumn<any>;
    function cjSpisColumn(_text: string): GGridColumn<any>;
    function odesilajiciAktStartSUColumn(): GGridColumn<any>;
    function aktualniDrzitelColumn(): GGridColumn<any>;
    function aktualniDrzitelSuFunColumn(): GGridColumn<any>;
    function druhZasilkyColumn(): GGridColumn<any>;
    function postSluzbColumn(): GGridColumn<any>;
    function datPodOdeslaniColumn(): GGridColumn<any>;
    function podaciCisloColumn(): GGridColumn<any>;
    function SpZnackaColumn(_text: string): GGridColumn<any>;
    function idDorucenky(): GGridColumn<any>;
    function odesilajiciColumn(): GGridColumn<any>;
    function odesilajiciRfSUColumn(): GGridColumn<any>;
    function odesilajiciSUColumn(): GGridColumn<any>;
    function vypravujícíColumn(): GGridColumn<any>;
    function datPotvrzeniColumn<TRow = any>(gridColumn?: GGridColumn<TRow>): Gordic.Data.GridFormat<TRow>;
    function tridVypColumn(): GGridColumn<any>;
    function KVColumn(): GGridColumn<any>;
    function SXSColumn(): GGridColumn<any>;
    function VecnaSkupinaNazevColumn(): GGridColumn<any>;
}
declare namespace Gordic.Wfl.Prefabs {
    /**
     * Enum názvů políček použitých ve formuláři uživatelského nastavení zásilek.
     *
     * @author  TFeik
     * @date    22.05.2018
     */
    enum FieldNames {
        asistentVypraveniZasilky = "OdeslaniAsistent",
        sablonaZasilky = "OdeslaniSablonaZasilky",
        zpusobOdeslani = "OdeslaniZpusobOdeslani",
        druhZasilky = "OdeslaniDruhZasilky",
        typObsahuZasilky = "OdeslaniTypObsahuZasilky",
        doplnkoveSluzby = "OdeslaniDoplnkoveSluzby",
        elPostaElSoubor = "OdeslaniElPostaElSoubor",
        stavZasilky = "StavZasilky",
        poznamka = "Poznamka",
        zasilkovaAdresa = "ZasilkovaAdresaRadek",
        adresaEsu = "AdresaEsuRadek",
        podaciCislo = "PodaciCislo",
        poplatek = "Poplatek",
        vaha = "Vaha",
        cena = "Cena",
        datumOdeslani = "DatumOdeslani",
        datumVypraveni = "DatumVypraveni",
        priznakObalky = "PriznakObalky",
        priznakOriginalu = "PriznakOriginalu",
        datumPrevzeti = "DatumPrevzeti",
        datumDoruceni = "DatumDoruceni",
        odesilajici = "Odesilajici",
        drzitel = "Drzitel",
        posta = "Posta",
        dorucovaciSluzba = "DorucovaciSluzba",
        datumPosledniZmeny = "DatumPosledniZmeny",
        posledniZmenuProvedl = "PosledniZmenuProvedl",
        datumUlozeni = "DatumUlozeni",
        identifikatorDokumnetuSpisu = "IdentifikatorDokumnetuSpisu",
        identifikatorZasilky = "IdentifikatorZasilky",
        znacka = "Znacka",
        vec = "Vec",
        adresat = "Adresat",
        emailOdesilatel = "EmailOdesilatel",
        emailAdresat = "EmailAdresat",
        typZpravy = "TypZpravy",
        email = "Email",
        popisCertifikatu = "PopisCertifikatu",
        obsah = "Obsah",
        emailPredmet = "EmailPredmet",
        emailSkrytaKopie = "EmailSkrytaKopie",
        emailKopie = "EmailKopie",
        certifikat = "Certifikat",
        pripojitElektronickyObraz = "PripojitElektronickyObraz",
        pripojitVnitrniPodpis = "PripojitVnitrniPodpis",
        pripojitVnejsiPodpis = "PripojitVnejsiPodpis",
        pripojitVnitrniRazitko = "PripojitVnitrniRazitko",
        pripojitVnejsiRazitko = "PripojitVnejsiRazitko",
        pripojitHistorii = "PripojitHistorii",
        pripojitSeznamPriloh = "PripojitSeznamPriloh",
        pripojitPoznamky = "PripojitPoznamky",
        pripojitVybraneElektronickePrilohy = "PripojitVybraneElektronickePrilohy",
        datumCas = "DatumCas",
        datum = "Datum",
        datovaSchranka = "DatovaSchranka",
        datovaSchrankaAdresat = "DatovaSchrankaAdresat",
        datovaSchrankaOdesilatel = "DatovaSchrankaOdesilatel",
        datovaZprava = "DatovaZprava",
        idDatovyZpravy = "IdDatovyZpravy",
        kRukam = "KRukam",
        idUtvaru = "IdUtvaru",
        nazevUtvaru = "NazevUtvaru",
        stavDz = "StavDz",
        doVlastnichRukou = "DoVlastnichRukou",
        priznakVyzvednuti = "PriznakVyzvednuti",
        spisovaZnacka = "SpisovaZnacka",
        cisloJednaci = "CisloJednaci",
        zakazatFikciDoruceni = "ZakazatFikciDoruceni",
        zakonRok = "ZakonRok",
        zakonCislo = "ZakonCislo",
        paragraf = "Paragraf",
        odstavec = "Odstavec",
        pismeno = "Pismeno",
        typTisku = "TypTisku",
        odesilatel = "Odesilatel",
        hybridniPosta = "HybridniPosta",
        typZasilkyHp = "TypZasilkyHp",
        typZasilkyHpId = "TypZasilkyHpId",
        typZasilkyHpKod = "TypZasilkyHpKod",
        typVyhodnoceniDorucenky = "TypVyhodnoceniDorucenky",
        typArchivace = "TypArchivace",
        typKonverze = "TypKonverze",
        identifikaceZasilkyHp = "IdentifikaceZasilkyHp",
        idHp = "IdHp",
        stat = "Stat",
        obec = "Obec",
        caseSensitive = "CaseSensitive",
        datumVzniku = "DatumVzniku",
        nazev = "Nazev",
        popis = "Popis",
        vlatnik = "Vlatnik",
        prevzatoOd = "PrevzatoOd",
        stavDoruceniZasilky = "StavDoruceniZasilky",
        typDokumentu = "TypDokumentu"
    }
    /**
     * Interface políček prefabu odeslání a jejich dat při použití výchozích jmen políček a bez úpravy modelu.
     *
     * @author  TFeik
     * @date    22.05.2018
     */
    interface IGOdeslaniPrefabDefaultForm {
        OdeslaniAsistent?: Gordic.Data.Readers.WflaprjDto;
        OdeslaniDoplnkoveSluzby?: Gordic.Data.Readers.WflcposDto[];
        OdeslaniDruhZasilky?: Gordic.Data.Readers.WflcdrzDto;
        OdeslaniSablonaZasilky?: Gordic.Data.Readers.WflssslDto;
        OdeslaniTypObsahuZasilky?: Gordic.Data.Readers.WflctobDto;
        OdeslaniZpusobOdeslani?: Gordic.Data.Readers.WflczpdDto;
        OdeslaniElPostaElSoubor?: boolean;
    }
    /**
     * Prefab políčka Asistena vypravení zásilky.
     *
     * @author  TFeik
     * @date    21.05.2018
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/javascript/Gordic/Gordic.Wfl/Gordic.Wfl.Prefabs/#HAsistentvypravenEDzE1silky28wflaprj29}
     *
     * @param {object} params Parametry prefabu.
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GAsistentVypraveniZasilky(params: {
        /** Filtry a nastavení pro asistenta. */
        asistentInfo?: {
            ixsFun?: string;
            ixsTyp?: string;
            prizSpis?: number;
        };
        /** Název formuláře, na kterém bude políčko. */
        formName?: string;
        /** Názvy políček, které jsou nastavovány asistentem. */
        fieldNames?: {
            zpusobOdeslani?: string;
            druhZasilky?: string;
            doplnkoveSluzby?: string;
            sablonaZasilky?: string;
        };
    }, opt?: GSelectBoxOptions<Gordic.Data.Readers.WflaprjDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka doplňkových (poštovních) služeb.
     *
     * @author  TFeik
     * @date    21.05.2018
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/javascript/Gordic/Gordic.Wfl/Gordic.Wfl.Prefabs/#HDopl148kovE928po161tovnED29slu17Eby28wflcpos29}
     *
     * @param {object} params Parametry prefabu.
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDoplnkoveSluzby(params?: {
        /** Název formuláře, na kterém bude políčko. */
        formName?: string;
        /** Názvy políček, které jsou nastavovány druhem zásilky. */
        fieldNames?: {
            asistentVypraveniZasilky?: string;
            sablonaZasilky?: string;
            zpusobOdeslani?: string;
            druhZasilky?: string;
        };
    }, opt?: GSelectBoxOptions<Gordic.Data.Readers.WflcposDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka šablon zásilek.
     *
     * @author  TFeik
     * @date    21.05.2018
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/javascript/Gordic/Gordic.Wfl/Gordic.Wfl.Prefabs/#H160ablonazE1silek28wflsssl29}
     *
     * @param {object} params Parametry prefabu.
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GSablonaZasilky(params?: {
        /** Název formuláře, na kterém bude políčko. */
        formName?: string;
        /** Názvy políček, které jsou nastavovány asistentem. */
        fieldNames?: {
            druhZasilky?: string;
            doplnkoveSluzby?: string;
        };
        /**
         * Příznak, zda má vyvolávat change při nastavení hodnoty do podřízených políček.
         * @type {boolean}
         */
        triggerChangeOnOtherFields?: boolean;
    }, opt?: GSelectBoxOptions<Gordic.Data.Readers.WflssslDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka způsobu odeslání zásilky.
     *
     * @author  TFeik
     * @date    21.05.2018
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/javascript/Gordic/Gordic.Wfl/Gordic.Wfl.Prefabs/#HZp16FsobodeslE1nEDzE1silky28wflczpd29}
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GZpusobOdeslani(params?: {
        /** Název formuláře, na kterém bude políčko. */
        formName?: string;
        /** Názvy políček, které jsou nastavovány druhem zásilky. */
        fieldNames?: {
            asistentVypraveniZasilky?: string;
            druhZasilky?: string;
            doplnkoveSluzby?: string;
            typObsahuZasilky?: string;
        };
        /**
         * Vlastnost určující zda se mají vytvořit serverFilters dle konkrétní hopoužití.
         * @type {'odeslani' | 'doruceni' | undefined}
         */
        serverFilterUsage?: 'odeslani' | 'doruceni';
    }, opt?: GSelectBoxOptions<Gordic.Data.Readers.WflczpdDto>, rowOpt?: GFormRowOptions, changeExtra?: GFieldChangeEvent<Data.Readers.WflczpdDto>): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka druhu zásilky.
     *
     * @author  TFeik
     * @date    21.05.2018
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/javascript/Gordic/Gordic.Wfl/Gordic.Wfl.Prefabs/#HDruhzE1silky28wflcdrz29}
     *
     * @param {object} params Parametry prefabu.
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDruhZasilky(params?: {
        /** Název formuláře, na kterém bude políčko. */
        formName?: string;
        /** Názvy políček, které jsou nastavovány druhem zásilky. */
        fieldNames?: {
            asistentVypraveniZasilky?: string;
            sablonaZasilky?: string;
            doplnkoveSluzby?: string;
            zpusobOdeslani?: string;
        };
    }, opt?: GSelectBoxOptions<Gordic.Data.Readers.WflcdrzDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu obsahu zásilky.
     *
     * @author  TFeik
     * @date    21.05.2018
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/javascript/Gordic/Gordic.Wfl/Gordic.Wfl.Prefabs/#HTypobsahuzE1silky28wflctob29}
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GTypObsahuZasilky(opt?: GSelectBoxOptions<Gordic.Data.Readers.WflctobDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka předplnění výběru elektronického obrazu a elektronických příloh.
     *
     * @author  TFeik
     * @date    21.05.2018
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/javascript/Gordic/Gordic.Wfl/Gordic.Wfl.Prefabs/#HP159edpln11BnEDvFDb11BruelektronickE9hoobrazuaelektronickFDchp159EDloh}
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GElPostaElSoubor(opt?: GCheckOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Enum názvů políček použitých ve formuláři uživatelského nastavení zásilek.
     *
     * @author  TFeik
     * @date    22.05.2018
     *
     * @param {JQuery<HTMLElement>} $form Element, na kterém je políčko hledáno.
     * @param {FieldNames | string} fieldName Název políčka.
     * @param {TValue} value Nová hodnota políčka.
     */
    function _setFieldValue<TValue>($form: JQuery<HTMLElement>, fieldName: FieldNames | string, value: TValue, 
    /**
     * (default: false) Příznak, zda se spustí change po setValue.
     * @type {boolean}
     */
    triggerChange?: boolean): void;
    /**
     * Enum názvů políček použitých ve formuláři uživatelského nastavení zásilek.
     *
     * @author  TFeik
     * @date    22.05.2018
     *
     * @param {JQuery<HTMLElement>} $form Element, na kterém je políčko hledáno.
     * @param {FieldNames | string} fieldName Název políčka.
     * @param {TValue} value Nová hodnota políčka.
     */
    function _setFieldValueInternal<TValue>($field: JQuery<HTMLElement>, value: TValue, 
    /**
     * (default: false) Příznak, zda se spustí change po setValue.
     * @type {boolean}
     */
    triggerChange?: boolean): void;
    /**
     * Prefab políčka typu stav zásilky. Wflcsdo.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.WflcsdoDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GStavZasilky(opt?: GSelectBoxOptions<Gordic.Data.Readers.WflcsdoDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab sekcí zásilkové adresy a adresy subjektu.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {{ zasilkovaAdresaValueName?: string adresaEsuValueName?: string, isZastupnaOsoba?: boolean} [params]
     * @param {GStringBoxOptions} [zasilkovaAdresaOpt]
     * @param {GStringBoxOptions} [adresaEsuOpt]
     * @returns {Gordic.Forms.FormRow[]}
     */
    function GZasilkovaAdresa(params?: {
        zasilkovaAdresaValueName?: string;
        zasilkovaAdresaValueModel?: string;
        adresaEsuValueName?: string;
        adresaEsuValueModel?: string;
        isZastupnaOsoba?: boolean;
        startsWithZero?: boolean;
    }, zasilkovaAdresaOpt?: GStringBoxOptions, adresaEsuOpt?: GStringBoxOptions): Gordic.Forms.FormSection[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPodaciCislo(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPoplatek(opt?: GNumberBoxOptions<Decimal>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GVaha(opt?: GNumberBoxOptions<Decimal>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GCena(opt?: GNumberBoxOptions<Decimal>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPriznakObalky(opt?: GSelectBoxOptions<Gordic.Data.Readers.WflcpobDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPriznakOriginalu(opt?: GSelectBoxOptions<Gordic.Data.Readers.WflcoriDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatumOdeslani(opt?: GDateBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatumVypraveni(opt?: GDateBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatumDoruceni(opt?: GDateBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatumUlozeni(opt?: GDateBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu doručovací služba.
     *
     * @author  TFeik
     * @date    27.11.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
        rowOpt?: GFormRowOptions
     */
    function GDorucovaciSluzba(opt?: GSelectBoxOptions<Gordic.Data.Readers.WflsdosDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu pošta.
     *
     * @author  TFeik
     * @date    27.11.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.,
        rowOpt?: GFormRowOptions
     */
    function GPosta(opt?: GSelectBoxOptions<Gordic.Data.Readers.GinspscDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.,
        rowOpt?: GFormRowOptions
     */
    function GPostaDorucovaciSluzba(optPosta?: GSelectBoxOptions<Gordic.Data.Readers.GinspscDto>, optDorucovaciSluzba?: GSelectBoxOptions<Gordic.Data.Readers.WflsdosDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GZmenuProvedl(opt?: GSelectBoxOptions<Gordic.Data.Readers.GinszmpDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatumZmeny(opt?: GDateBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    31.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatumPrevzeti(opt?: GDateBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * OBSOLETE: Použijte GIdentifikatorDokumentuSpisu (bez překlepu).
     * Prefab políčka typu identifikátor dokuemntu / spisu.
     *
     * @author  TFeik
     * @date    12.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GIdentifikatorDokumnetuSpisu(opt?: Gin.Prefabs.Field.IdentifikatorOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu identifikátor dokumentu / spisu.
     *
     * @author  TFeik
     * @date    12.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GIdentifikatorDokumentuSpisu(opt?: Gin.Prefabs.Field.IdentifikatorOptions, rowOpt?: GFormRowOptions, others?: {
        showDetailAction?: boolean;
    }): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu identifikátor zásilky.
     *
     * @author  TFeik
     * @date    12.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @param {boolean} [mergeButtons] (Default = true) Příznak, zda se mají tlačítka spojit s výchozími.
     * @returns
     */
    function GIdentifikatorZasilky(parentContent: GContent, opt?: Gin.Prefabs.Field.IdentifikatorOptions, rowOpt?: GFormRowOptions, mergeButtons?: boolean): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu značka.
     *
     * @author  TFeik
     * @date    12.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GZnacka(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu věc.
     *
     * @author  TFeik
     * @date    12.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GVec(userSettings: Data.IGStorage, opt?: GSelectBoxOptions<{
        data?: string | null;
    }>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu duvod prideleni.
     *
     * @author  RTomes
     * @date    14.10.2022
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDuvodyPrideleni(userSettings: Data.IGStorage, opt?: GSelectBoxOptions<{
        data?: string | null;
    }>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu Adresát.
     *
     * @author  TFeik
     * @date    12.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GAdresat(vyberEsuOpt: Gin.Globals.Dialogs.IGLogovani, //{
    opt?: GSelectBoxOptions<Gordic.Esu.Interface.GGinsesuPolDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu Odesílající.
     *
     * @author  TFeik
     * @date    12.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GOdesilajici(opt?: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu Držitel.
     *
     * @author  TFeik
     * @date    12.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     */
    function GDrzitel(opt?: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu Držitel.
     *
     * @author  TFeik
     * @date    13.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GTypZpravy(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu email odesilatele.
     *
     * @author  TFeik
     * @date    14.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GEmailOdesilatel(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu email adresata.
     *
     * @author  TFeik
     * @date    14.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GEmailAdresat(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    14.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GCertifikat(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    14.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GEmailKopie(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    14.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GEmailSkrytaKopie(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    14.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GEmailPredmet(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    14.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GObsah(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    14.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPopisCertifikatu(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    17.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPripojitElektronickyObraz(opt?: GCheckOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    17.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPripojitPodpisy(optVnitrniPodpis?: GCheckOptions | false, optVnejsiPodpis?: GCheckOptions | false, optVnitrniRazitko?: GCheckOptions | false, optVnejsiRazitko?: GCheckOptions | false, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    17.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPripojitHistorii(opt?: GCheckOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    17.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPripojitSeznamPriloh(opt?: GCheckOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    17.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPripojitPoznamky(opt?: GCheckOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu certifikat.
     *
     * @author  TFeik
     * @date    17.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPripojitVybraneElektronickePrilohy(opt?: GCheckOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka datové schránky adresáta.
     *
     * @author  TFeik
     * @date    25.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatovaSchrankaAdresat(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka datové schránky odesilatele.
     *
     * @author  TFeik
     * @date    25.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatovaSchrankaOdesilatel(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka pro Id datové zprávy.
     *
     * @author  TFeik
     * @date    25.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GIdDatoveZpravy(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka K rukám.
     *
     * @author  TFeik
     * @date    25.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatovaZpravaKRukam(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Útvaru DZ.
     *
     * @author  TFeik
     * @date    25.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatovaZpravaUtvar(optId?: GStringBoxOptions, optNazev?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka stav DZ.
     *
     * @author  TFeik
     * @date    25.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatovaZpravaStav(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka zákon (rok / číslo).
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GZakonRokCislo(optRok?: GStringBoxOptions, optCislo?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka paragraf.
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GParagraf(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka zákon (rok / číslo).
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GOdstavecPismeno(optOdstavec?: GStringBoxOptions, optPismeno?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka do vlastních rukou.
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDoVlastnichRukou(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Příznak vyzvednutí.
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPriznakVyzvednuti(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Spisová značka.
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GSpisovaZnacka(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Spisová značka.
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GNaseSpisovaZnacka(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Spisová značka.
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GVaseSpisovaZnacka(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Číslo jednací.
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GCisloJednaci(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Spisová značka.
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GVaseCisloJednaci(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Spisová značka.
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GNaseCisloJednaci(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu Zakázat fikci doručení.
     *
     * @author  TFeik
     * @date    27.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GZakazatFikciDoruceniDatoveZpravy(opt?: GCheckOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Typ tisku.
     *
     * @author  TFeik
     * @date    09.10.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GTypTisku(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu email odesilatele.
     *
     * @author  TFeik
     * @date    09.10.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GOdesilatelText(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu email odesilatele.
     *
     * @author  TFeik
     * @date    09.10.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GAdresatText(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka HybridniPosta.
     *
     * @author  TFeik
     * @date    10.10.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GHybridniPosta(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Typ zásilky HP.
     *
     * @author  TFeik
     * @date    10.10.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GTypZasilkyHp(opt?: GStringBoxOptions, optId?: GStringBoxOptions, optKod?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Typ vyhodnocení doručenky.
     *
     * @author  TFeik
     * @date    10.10.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GTypVyhodnoceniDorucenky(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Typ archivace.
     *
     * @author  TFeik
     * @date    10.10.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GTypArchivace(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Typ konverze.
     *
     * @author  TFeik
     * @date    10.10.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GTypKonverze(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Identifikace zásilky HP.
     *
     * @author  TFeik
     * @date    10.10.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GIdentifikaceZasilkyHp(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Id HP.
     *
     * @author  TFeik
     * @date    10.10.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GIdHp(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu Stát.
     *
     * @author  TFeik
     * @date    27.11.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.GincstaDto>} [opt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Definoce formuláře.
     */
    function GStat(opt?: GSelectBoxOptions<Gordic.Data.Readers.GincstaDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu Obec.
     *
     * @author  TFeik
     * @date    27.11.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.GincstaDto>} [opt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Definice formuláře.
     */
    function GObec(opt?: GStringBoxOptions, //GSelectBoxOptions<Gordic.Data.Readers.GincstaDto>,
    rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu CaseSensitive (true / false).
     *
     * @author  TFeik
     * @date    04.12.2018
     * @see [xWiki]{@link }
     *
     * @param {GCheckOptions} [opt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Definice formuláře.
     */
    function GCaseSensitive(opt?: GCheckOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka datum vzniku.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GDatumVzniku(opt?: GDateBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka název.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GNazev(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka popis.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPopis(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu Držitel.
     *
     * @author  TFeik
     * @date    12.09.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     */
    function GVlastnik(opt?: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
 * Prefab políčka typu Držitel.
 *
 * @author  TFeik
 * @date    12.09.2018
 * @see [xWiki]{@link }
 *
 * @param {object} opt Options selectboxu.
 */
    function GVlastnikDokSpisu(opt?: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu poznámka u zásilky.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GPrevzatoOd(opt?: GSelectBoxOptions<Gordic.Data.Readers.GinszmpDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu stav odručení zásilky.
     *
     * @author  TFeik
     * @date    08.07.2019
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GStavDoruceniZasilky(opt?: GSelectBoxOptions<Gordic.Data.Readers.WflcsdoDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu dokumentu.
     *
     * @author  TFeik
     * @date    08.07.2019
     * @see [xWiki]{@link }
     *
     * @param {object} opt Options selectboxu.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     */
    function GTypDokumentu(opt?: GSelectBoxOptions<Gordic.Data.Readers.SslstypDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
}
declare namespace Gordic.Wfl.Prefabs {
    interface FilterSubjektOptions extends GSelectBoxOptions<any> {
        label?: string;
        onChange?: (ev: JQuery.TriggeredEvent, selected: any) => void;
        /**
         * Typově odpovídá Gordic.Ssl.Globals.Enums.TypSubjektuFilter.
         *
         * VSE = 0,
         * JEN_FUN = 1,
         * JEN_SU = 2,
         * AKTFUN_AKTSU = 3,
         * JEN_FUN_AKTSU = 4, // vsechna funkcni mista + akt SU
         *
         * @type {number}
         */
        typSubjektuFilter?: number;
        ignoreUsuShowSu?: boolean;
    }
    function FilterSubjekt(options: FilterSubjektOptions, parentContent?: GContent): any;
    function FilterUpresneniHledani(options: any): any;
    function FilterHledaniTypDb(options: any): any;
    function FilterHledaniSkupina(options: any): any;
    function FilterHledaniDleVyrizeni(options: any): any;
    function FilterAlgHledaniEle(options: any): any;
    function FilterOblastHledaniEle(options: any): any;
    function FilterZpusobZobrazeniHledaniEle(options: any): any;
    function PocetListu(options: any): any;
    function OutlookFoldersSelector(cnt: any, options: any): any;
    function MailFoldersSelector(ev: any, cnt: any): JQuery.Deferred<any, any, any>;
    function CreateMailFoldersForm(cnt: any): Forms.Form;
    function ProvizorniK203SuperFunkceObcuravaciInitialValue(initialValue: any): any;
}
declare namespace Gordic.Wfl.Prefabs.Row {
    /**
     * Prefab řádku výběru Dokument, nebo spis.
     *
     * @author  TFeik
     * @date    17.01.2019
     *
     * @param {GRadioOptions<number>} [fieldOpt]
     * @param {GFormRowOptions} [rowOpt]
     * @returns {Gordic.Forms.FormRow[]}
     */
    function GDokumentSpis(fieldOpt?: GRadioOptions<number>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab řádku výběru Dokument, nebo spis.
     *
     * @author  TFeik
     * @date    17.01.2019
     *
     * @param {GRadioOptions<number>} [fieldOpt]
     * @param {GFormRowOptions} [rowOpt]
     * @returns {Gordic.Forms.FormRow[]}
     */
    function GPocetDokumentuAnalogovych(fieldOpt?: GNumberBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab řádku výběru Dokument, nebo spis.
     *
     * @author  TFeik
     * @date    21.01.2019
     *
     * @param {GRadioOptions<number>} [fieldOpt]
     * @param {GFormRowOptions} [rowOpt]
     * @returns {Gordic.Forms.FormRow[]}
     */
    function GPocetDokumentuCelkem(fieldOpt?: GNumberBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GVecPodrobne(fieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GFormaDokumentuOriginalAnalogovaDigitalni(opt?: {
        fieldOptAnalog?: GCheckOptions;
        fieldOptDigital?: GCheckOptions;
        rowOpt?: GFormRowOptions;
    }): Gordic.Forms.FormRow[];
    function GFormaDokumentuKonverzeAnalogovaDigitalni(opt?: {
        fieldOptAnalog?: GCheckOptions;
        fieldOptDigital?: GCheckOptions;
        rowOpt?: GFormRowOptions;
    }): Gordic.Forms.FormRow[];
    function GDatumPodani(opt?: {
        fieldOpt?: GDateBoxOptions;
        rowOpt?: GFormRowOptions;
    }): Gordic.Forms.FormRow[];
    function GDatumVyrizeni(opt?: {
        fieldOpt?: GDateBoxOptions;
        rowOpt?: GFormRowOptions;
    }): Gordic.Forms.FormRow[];
    function GDatumUzavreni(opt?: {
        fieldOpt?: GDateBoxOptions;
        rowOpt?: GFormRowOptions;
    }): Gordic.Forms.FormRow[];
    function GDatumPrijeti(opt?: {
        fieldOpt?: GDateBoxOptions;
        rowOpt?: GFormRowOptions;
    }): Gordic.Forms.FormRow[];
    /**
     * Prefab řádku formuláře použitého pro zapamatování si aktuálního nastavení odesílané zprávy (email, ds, edesk, gex, hp) pro další odesílané zprávy stejného druhu.
     *
     * @author  TFeik
     * @date    25.03.2019
     *
     * @param {{ fieldOpt?: GCheckOptions} [opt]
     * @returns {Gordic.Forms.FormRow[]}
     */
    function ZapamatovatNastaveniOdesilaneZpravy(opt?: {
        /**
         * Parametry políčka.
         * @type {GCheckOptions}
         */
        fieldOpt?: GCheckOptions;
        /**
         * Parametry řádku
         * @type {GFormRowOptions}
         */
        rowOpt?: GFormRowOptions;
    }): Gordic.Forms.FormRow[];
    /**
     * Prefab řádku formuláře použitého pro ---
     *
     * @author  TFeik
     * @date    26.03.2019
     *
     * @param {{ fieldOpt?: GSelectBoxOptions<Gordic.Wfl.Interface.GGinsmbxFieldDto>} [opt]
     * @returns {Gordic.Forms.FormRow[]}
     */
    function OdesilatelGinsmbx(opt?: {
        /**
         * Parametry políčka.
         * @type {GSelectBoxOptions<Gordic.Wfl.Interface.GGinsmbxFieldDto>}
         */
        fieldOpt?: GSelectBoxOptions<Gordic.Wfl.Interface.GGinsmbxFieldDto>;
        /**
         * Parametry řádku
         * @type {GFormRowOptions}
         */
        rowOpt?: GFormRowOptions;
    }): Gordic.Forms.FormRow[];
}
declare namespace Gordic.Wfl.Prefabs {
    enum FieldNames {
        zpusobDoruceni = "ZpusobDoruceni",
        zvlastniZachazeni = "ZvlastniZachazeni",
        datumpodani = "Datumpodani",
        typPisemnosti = "TypPisemnosti",
        spisovyZnak_plan = "SpisovyZnak_plan",
        spisovyZnak_znak = "SpisovyZnak_znak",
        umisteni = "Umisteni",
        poznamkaKDouruceni = "PoznamkaKDouruceni",
        pristup = "Pristup",
        datumZeDne = "DatumZeDne",
        znackaOdesilatele = "ZnackaOdesilatele",
        spisovaZnackaOdesilatele = "SpisovaZnackaOdesilatele",
        pocKopii = "PocKopii",// neměnit pasuje s Dto
        pocListuPriloh = "PocListuPriloh",// neměnit pasuje s Dto
        pocPriloh = "PocPriloh",// neměnit pasuje s Dto
        pocStran = "PocStran",// neměnit pasuje s Dto
        pocListu = "PocListu",// neměnit pasuje s Dto
        vecPodrobne = "VecPodrobne",
        identifikatorSU = "IdentifikatorSU"
    }
    function GZpusobDoruceni(opt?: GSelectBoxOptions<Gordic.Data.Readers.WflczpdDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GZvlastniZachazeni(opt?: GSelectBoxOptions<Gordic.Data.Readers.WflcdzzDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GDatumPodani(opt?: GDateBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function SpojDvaPrefabyRadkuDoJednoho(prvni: Gordic.Forms.FormRow[], druhy: Gordic.Forms.FormRow[], options?: {
        labelJakoGTextUprosted: boolean;
    }): Gordic.Forms.FormRow[];
    function GTypPisemnosti(opt?: GSelectBoxOptions<Gordic.Data.Readers.SslstypDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GSpisovyZnak(optsslsspl?: GSelectBoxOptions<Gordic.Data.Readers.SslssplDto>, optsslsspz?: GSelectBoxOptions<Gordic.Data.Readers.SslsspzDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GSpisovyPlan(optsslsspl?: GSelectBoxOptions<Gordic.Data.Readers.SslssplDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GUmisteni(opt?: GSelectBoxOptions<Gordic.Data.Readers.SslsumiDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GPoznamkaKDouruceni(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GPristup(opt?: GSelectBoxOptions<Gordic.Data.Readers.GincstuDto>, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GDatumZeDne(opt?: GDateBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GZnackaOdesilatele(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GSpisovaZnackaOdesilatele(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function GPocetListu(wflDBParams?: any, optPocListu?: GStringBoxOptions | GNumberBoxOptions | any, optPocStran?: GNumberBoxOptions, optPocPriloh?: GNumberBoxOptions, optPocListuPriloh?: GStringBoxOptions, optPocKopii?: GNumberBoxOptions, rowOpt?: GFormRowOptions, SFyz?: number, Eko?: boolean, vypnoutRequired?: boolean): Gordic.Forms.FormRow[];
    function GVecPodrobne(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    function Gpoznamka(opt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
   * Prefab políčka typu identifikátor dokuemntu / spisu.
   *
   * @author  TFeik
   * @date    12.09.2018
   * @see [xWiki]{@link }
   *
   * @param {object} opt Options selectboxu.
   * @param {GFormRowOptions} [rowOpt] Options řádku.
   */
    function GIdentifikatorSU(opt?: Gin.Prefabs.Field.IdentifikatorOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
}
declare namespace Gordic.Wfl.Prefabs.Section {
    function GFormaDokumentuOriginalKonverzeAnalogovaDigitalni(opt?: {
        fieldOptOriginalAnalog?: GCheckOptions;
        fieldOptOriginalDigital?: GCheckOptions;
        fieldOptKonverzeAnalog?: GCheckOptions;
        fieldOptKonverzeDigital?: GCheckOptions;
        rowOptOriginal?: GFormRowOptions;
        rowOptKonverze?: GFormRowOptions;
        sectionOpt?: GSectionOptions;
    }): Gordic.Forms.FormSection[];
}
declare namespace Gordic.Wfl.ZasilkyPrefabs {
    /**
     * Vytvoří sloupce gridu dle zadaných jmen.
     *
     * @param {("datumZmeny" | "zmenuProvedl" | "popisZmeny" | "poradoveCislo")[]} columnNames Pole názvů sloupců, pro které jsou připraveny prefaby.
     * @par-am {Gordic.Data.GridFormat<TRow>} [gridFormat] GridFormat na který se vloží nový sloupec. Pokud není definován, pak se vytvoří nový.
     * @returns {Gordic.Data.GridFormat<TRow>} Gridformat s nově vloženými sloupečky.
     */
    function columns<TRow>(columnNames: ("ixp" | "id_dorucenky" | "nazev" | "dat_ulozeni" | "spisovnaOd" | "referentOd" | "spisovyUzelOd" | "barva" | "znacka")[]): Gordic.Data.GridFormat<TRow>;
    function FilterDleZpusobuDoruceni(): {
        value: string;
        label: string;
    }[];
    function FilterDleStavu(): void;
    function SekceFilterDleZpusobuDoruceniRadio(opt?: GRadioOptions<any>): Gordic.Forms.FormRow[];
    function SekceFilterDleZpusobuDoruceni(opt?: GSelectBoxOptions<any>): Gordic.Forms.FormRow[];
    function SekceFilterDleSdruzeni(opt?: GSelectBoxOptions<any>): Gordic.Forms.FormRow[];
    function SekceFilterDleRedistribuce(typSeznamu: Wfl.Interface.TypSeznamuZasilek, opt?: GSelectBoxOptions<any>): Gordic.Forms.FormRow[];
}
declare namespace Gordic.Widget {
    interface IGAttachmentOptions extends JQueryUI.WidgetOptions {
        /** identifikátor dokumentu(žádosti) */
        ixp: string;
        serviceContent?: string;
        autofitParentElement?: string | JQuery;
        hideFileList?: boolean;
        /** identifikátor ixb_elp (pro použití v EPK) */
        ixb_elp?: string | null;
        /** pořadové číslo žádosti pro specifikaci daného úkonu v EPK */
        ser_cislo?: number | null;
        emptyMessage?: string;
        displayEngineOptions?: Components.FilePreview.IGEngineOptions;
        fileListCustomLocation?: JQuery;
        basePanelOptions?: IGBasePanelOptions;
        previewLoadOptions?: Partial<IGFilePreviewLoadOptions>;
        filePreviewOptions?: Partial<GFilePreviewOptions>;
        aiVisualiserOptions?: Partial<GAIVisualiser.IGAIVisualiserOptions>;
        dao?: Wfl.WebClient.Attachments.IGAttachmentDAO;
    }
}
interface JQuery {
    gattachment(options: Gordic.Widget.IGAttachmentOptions): JQuery;
    gattachment(method: "refresh"): JQuery;
    gattachment<T = any>(method: "getSelection"): T[];
    gattachment<K extends Extract<keyof Gordic.Widget.IGAttachmentOptions, string>>(method: "option", key: K, value: Required<Gordic.Widget.IGAttachmentOptions>[K]): JQuery;
    gattachment(method: "option", values: Partial<Gordic.Widget.IGAttachmentOptions>): JQuery;
}
declare namespace Gordic.Widget {
    /** Interface pro Widget Options */
    export interface IGAttachmentGridOptions {
        signModule?: Gordic.Wfl.WebClient.GSgn;
        /** Ixp dokumentu */
        ixp: string;
        /** pomocne dto pro tvorbu akci */
        actionsInputDto: GAttachmentActionsInputDto;
        /**
         * (default = this.element) jQuery element na kterém se má vytvořit
         * dropzone pro upload příloh, výchozí je element samotného gridu,
         * lze vypnout předáním false
         */
        dropZone?: JQuery | false;
        parentContent?: GContent;
    }
    /**
     * Typy výchozích hotnot pro IGAttachmentGridOptions
     */
    export interface IGAttachmentGridDefaultOptions {
        dropZone: JQuery;
    }
    /**
     * Toto vytváří class GAttachmentDto, které se předá DTO z Wfl.Interface
     * a provede se deserializace datumového pole
     */
    interface GAttachmentDto extends Gordic.Wfl.Interface.GAttachmentDto {
    }
    class GAttachmentDto {
        constructor(dto: Gordic.Wfl.Interface.GAttachmentDto);
        /**
         * Statická metoda použitelná pro funkci Array.map pro deserializaci pole
         * @param dto
         */
        static toInstance(dto: Gordic.Wfl.Interface.GAttachmentDto): GAttachmentDto;
    }
    /** Iniciacni dto pro akce nad prilohami */
    export type GAttachmentActionsInputDto = {
        InitMode: string;
        LzeVlozitElObraz: boolean;
        LzePridatElPrilohy: boolean;
        LzePridatPrilohy: boolean;
        LzeOtevritElObraz: boolean;
        LzeOtevritElPrilohy: boolean;
        LzeEditovatElPrilohy: boolean;
        LzeEditovatKategoriiElPrilohy: boolean;
        LzeVlozitVerziElObrazuZJinehoDokumentu: boolean;
        MergeVisible: boolean;
        MergeEnabled: boolean;
        GinPdfSigninpPar: number;
        GinRadPriektgPar: number;
        CategoriesFilter: string;
        GinUpsrPovolPar: number;
        SslNenPovolPar: number;
        GinSgnAsicwayPar: number;
        GinRadElekopPar: number;
        GinRadElekozPar: number;
        GinN23PodPar: number;
        PocetPrilohPisemnostiProPlusFormat: number;
        SignConfig: any;
        NazevUDA: string;
        PopisUDA: string;
        PrizSpis: number;
        PublishingMode: boolean;
        PovoleniAkci: Gordic.Wfl.Interface.PrilohyPovoleniAkci;
        IsDbVersionForEpkTemplate: boolean;
        IsPodobaEnabled: boolean;
        IsFormaEnabled: boolean;
        IsIxsCarEnabled: boolean;
        PrizRezimUtaj: boolean;
        FilterStUtajIdForFieldPristup: any;
        DefaultStUtajId: number | null;
        VerzeDb: number;
        Lic: string;
        Desc254: boolean;
        MarkAfterSign: boolean;
        JePovolenaAktivniPrace: boolean;
        SPrij: number;
        ZDFLicence: boolean;
        OptionsForColumns: GAttachmentOptionsForColumns;
        IsDebug: boolean;
        MarkAsApprovedVisible: boolean;
    };
    /** Iniciacni dto pro tvorbu sloupcu seznamu priloh */
    export type GAttachmentOptionsForColumns = {
        GinEleOkprepkPar: number;
        GinPdfPictposPar: number;
        GinPovumipodPar: number;
        GinElePriktzaPar: number;
        GinEleInfkofoPar: number;
        IsPodobaEnabled: boolean;
        IsFormaEnabled: boolean;
        IsIxsCarEnabled: boolean;
    };
    /**
     * JQuery widget v TypeScript viz
     * https://xwiki.gordic.cz/NET/TS/TypeScript%20jQuery%20Widget/
     */
    export class GAttachmentGrid extends JQueryWidget<IGAttachmentGridOptions, IGAttachmentGridDefaultOptions> {
        static widgetName: string;
        private _isLoaded;
        _destroy(): void;
        refresh(wflspidChanged?: boolean, flashMsg?: string, flashCustomClass?: GState): JQuery.Promise<any, any, any>;
        /**
         * Dotáhne ze serveru aktuální data a překreslí widget
         */
        _refresh(flashMsg?: string, flashCustomClass?: GState): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        /**
         * Metoda pro nastaveni pristupnosti akci
         */
        private _nastavOpravneniAkce;
        /**
         * Metoda pro vyvolání okna pro upload souborů, interně se využívá
         * gfilefield
         * @param event metoda potřebuje originální event od uživatele, jinak se
         * může spouštění dialogu pro upload nezdařit, event od uživatele má na
         * sobě isThrusted, což nelze zcela umělým eventem udělat.
         */
        addFileDoc(event: JQueryEventObject): void;
        /**
         * Metoda pro vyvolání okna pro upload souborů, interně se využívá
         * gfilefield
         * @param event metoda potřebuje originální event od uživatele, jinak se
         * může spouštění dialogu pro upload nezdařit, event od uživatele má na
         * sobě isThrusted, což nelze zcela umělým eventem udělat.
         */
        addFileAttachment(event: JQueryEventObject): void;
        /**
         * Metoda pro vyvolání dialogu pro přidání fyzické přílohy.
         */
        addBaseAttachment(): JQuery<HTMLElement>;
        /**
         * Metoda pro vložení přílohy z jiného dokumentu
         */
        vlozitZJinehoDokumentu(): void;
        /**
         * Metoda pro přenos příloh mezi úkolem a dokumentem
         *
         * @param  { number } direction         0 - z/from, 1 - na/to
         */
        moveAttachmentFromUkoSsl(direction: number): void;
        /**
         * Metoda pro vyvolání dialogu pro editaci přílohy.
         */
        editAttachment(): void;
        /**
         * Metoda pro smazani neele prilohy.
         */
        odstranitNeElePrilohu(): void;
        /**
        * Metoda pro hromadnou zmenu aktivity prilohy.
        */
        zmenitAktivituHromadne(row?: GAttachmentDto): void;
        /**
         * Metoda pro vyvolání dialogu slouceni priloh
         */
        sloucit(): void;
        /**
         * Metoda pro otevreni el. dokumentu
         */
        otevrit(uzamknout?: boolean, flagDownload?: boolean): void;
        /**
         * Metoda pro odemceni souboru.
         */
        zrusitZamek(): void;
        /**
         * Metoda pro vyvolání dialogu verzí el. přílohy.
         */
        stahnoutVse(): void;
        /**
         * Metoda pro vyvolání dialogu verzí el. přílohy.
         */
        showVerze(): void;
        /**
         * Metoda pro vyvolání dialogu informací o el. příloze.
         */
        showInfo(): void;
        /**
         * Metoda pro vyvolání dialogu pro přejmenování názvu souboru přílohy.
         */
        renameFile(): void;
        /**
         * Metoda pro vyvolání dialogu informací o el. příloze.
         */
        changeOrder(): void;
        /**
         * Metoda pro hromadne pridani podpisu
         */
        pridatPodpisHromadne(): void;
        /**
        * Soukroma metoda pro pridani podpisu
        */
        private signAttachment;
        /**
         * Metoda pro pridani podpisu typu ASiC pro Upsr (SK)
         */
        pridatPodpisUpsr(): void;
        AttachmentsSetToIntenral(attachments: GAttachmentDto[]): JQuery.Promise<boolean | null>;
        SelectionGetAsice(rowsData: GAttachmentDto[]): GAttachmentDto | null;
        /**
        * Metoda pro hromadne pridani samostatneho razitka
        */
        pridatCasoveRazitkoHromadne(row?: GAttachmentDto): void;
        ZpracujRuzneTypyChyb(error: string | any): string;
        GroupResultContainsError(groupResult: Gordic.Wfl.WebClient.GroupResult[]): boolean;
        CreateGroupResultRow(error: string, isError: boolean, key: string, rowState: number): Gordic.Wfl.WebClient.GroupResult;
        CreateSignNotification(groupResult: Gordic.Wfl.WebClient.GroupResult[]): void;
        SaveToReloadingCache(): void;
        SelectionContainsFavorite(rowsData: GAttachmentDto[]): boolean;
        SelectionGetFavorite(rowsData: GAttachmentDto[]): GAttachmentDto | null;
        /**
         * Metoda pro overeni podpisu
         */
        overitPodpis(): JQueryPromise<any> | undefined;
        /**
         * Metoda pro vyvolání dialogu historie overeni podpisu.
         */
        historieOvereni(): void;
        /**
         * Metoda pro vyvolání oznaceni souboru k podpisu v EPK.
         */
        hromadneMarkForEpk(row?: GAttachmentDto): void;
        /**
         * Metoda pro vyvolání oznaceni souboru k podpisu v EPK.
         */
        markForEpk(row?: GAttachmentDto): void;
        /**
        * Metoda pro doplneniTextoveVrstvy
        */
        doplneniTextoveVrstvy(row?: GAttachmentDto): void;
        /**
         * Metoda pro vyvolání výběru podpisové šablony pro EPK.
         */
        TemplateForEpk(): void;
        /**
         * Metoda pro spuštění schvalovacího procesu pro konkrétní přílohu
         */
        private runApprovalProcess;
        /**
         * Metoda pro vyvolání ručního přidání umístění vizuálního podpisu
         */
        addSignatureLocation(actionsInputDto: GAttachmentActionsInputDto): void;
        /**
         * Metoda pro vyvolání ručního přidání umístění vizuálního podpisu s následným podepsáním
         */
        addSignatureLocationAndSign(actionsInputDto: GAttachmentActionsInputDto): void;
        /**
         * Metoda pro vyvolání konverze/vyhotoveni do pdf.
         */
        hromadnaKonverzePdf(row?: GAttachmentDto): void;
        /**
         * Metoda pro vyvolání konverze/vyhotoveni do pdf.
         */
        konverzePdf(row?: GAttachmentDto): void;
        /**
         * Metoda pro vyvolání zmeny datoveho formatu.
         */
        zmenaDatovehoFormatu(): void;
        /**
         * Metoda pro anonymizaci
         */
        anonymize(): void;
        /**
         * Metoda pro zobrazeni formulare SK
         */
        detailFormulare(): void;
        /**
         * Metoda pro přidání formulare SK
         */
        pridatFormular(): void;
        /**
        * Metoda pro přidání pečeti na označené přílohy
        */
        pridatSKPecet(): void;
        /**
        * Metoda pro přidání pečeti na označené přílohy
        */
        pridatSKPecetStara(): void;
        /**
        * Metoda pro vytěžení formuláře
        */
        vytezitSKForm(): void;
        /**
        * Metoda pro naplnění formuláře
        */
        naplnitSkPrilohu(): void;
        /**
        * Metoda pro naplnění formuláře
        */
        odeslatSouborDoNen(): void;
        /**
        * Metoda pro naplnění formuláře
        */
        stahniSouborZNen(): void;
        /**
      * Metoda pro naplnění formuláře
      */
        stahniVerziSouboruZNen(): void;
        private showDialogProZadaniIdentifikatoruNen;
        /**
        * Metoda pro naplnění formuláře
        */
        dolozkaAutorizacceSK(): void;
        /**
        * Metoda pro naplnění formuláře
        */
        dolozkaNabytiPravniMociSK(): void;
        /**
        * Metoda pro naplnění formuláře
        */
        validovatSKSchemaXML(): void;
        /**
         * Metoda pro hromadne oznacitZverejnit
         */
        oznacitZverejnitHromadne(actionId: string): void;
        /**
       * Metoda pro vyvolání dialogu zverejneni
       */
        zverejneni(nazevUDA: string, popisUDA: string): void;
        /**
         * Metoda pro vyvolání dialogu historie zverejneni na uredni desku
         */
        historieZverejneni(): void;
        /**
         * Metoda pro vyvolání dialogu zverejneni na uredni desku
         */
        zverejneniUDE(nazevUDA: string, popisUDA: string): void;
        zverejnitUda(nazevUda: string, popisUda: string): void;
        historieUda(): void;
        zverejnitBchDiplomaChain(): void;
        /**
         * Metoda pro vyvolání dialogu zneaktivneni/odstraneni el. přílohy.
         */
        zneaktivnitOdstranit(flagOdstranit: boolean, row?: GAttachmentDto): void;
        /**
         * Metoda pro odstranění kontejneru.
         */
        odstranitKontejner(): void;
        /**
         * Metoda pro doplnitFormularovaPole
         */
        doplnitFormularovaPole(): void;
        /**
         * Metoda pro vytezitPdfOcr
         */
        vytezitPdfOcr(): void;
        /**
         * Metoda pro vytezitPdfOcr
         */
        vytezitPdfForm(): void;
        /**
         * Metoda pro tisk obsahu
         */
        tiskObsahu(): void;
        zverejneniSmluv(): void;
        tiskPevnyReportRetreive(rep: any): void;
        tiskMetadatReportRetreive(rep: any): void;
        /**
         * Metoda pro oznaceni prilohy jako obrazu.
         */
        markAsFavorite(): void;
        /**
         * Metoda pro zamenu prilohy a obrazu
         */
        exchangeFavorite(): void;
        /**
         * Metoda pro odpojeni prilohy - vytvori novy dokument
         */
        odpojit(): void;
        /**
         * Metoda pro presun prilohy na jiny dokument
         */
        presunout(): void;
        /**
        * Metoda pro oznaceni prilohy jako obrazu.
        */
        markAsApproved(): void;
        switchGrid(isSwitched?: boolean): boolean | undefined;
        maximalizeMinimalize(): void;
        /**
         * metoda vytvori pole akci, ktere lze delat nad prilohami
         */
        createActions(actionsInputDto: Gordic.Widget.GAttachmentActionsInputDto): void;
        /**
         * metoda vrati pole akci, ktere lze delat nad prilohami
         */
        getActionsList(): GActionList;
        getSelection(): GAttachmentDto[];
        getActive(): GAttachmentDto;
        protected _create(): void;
        /** Element s gridem */
        private _$grid;
        private _cardPanel;
        private _isGridActive;
        private _isMaximalized;
        private _jenAktivni;
        private _reloadAfterMinimize;
        private _fullscreen;
        private _parent;
        private _attachmentUploader;
        /** Element s gfilefield (nezobrazuje se) */
        private _$fileField;
        /** Servisní content pro komunikaci se serverem */
        private _content;
        /** Servisní content pro komunikaci se serverem */
        get content(): GContent;
        /** Poslední data s přílohami ze serveru */
        private _ggridData;
        /** Kategorie příloh */
        private _categories;
        /** Akce volajiciho kontentu */
        private _actions;
        /** _actionsInputDto */
        /**
         * Zobrazí dialog pro přidání fyzické přílohy
         * @param dto
         */
        private _showPrilohaForm;
        /**
         * Zobrazí dialog pro přidání fyzické přílohy
         * @param dto
         */
        private _showRenameAttachmentForm;
        private _notifyAttachmentChange;
        /**
         * Metoda pro vyvolání dialogu informací o el. příloze.
         */
        private _changeOrder;
        private _renderGCardPanel;
        /**
         * Vyrenderuje grid na základě dat
         */
        private _renderGGrid;
        private _updateSelection;
        getContextMenu(): GContextMenuAction<IRestricted>[];
        private _updateActionsDeferred;
        getUpdateActionsDeferred(): JQuery.Promise<any>;
        private setAILinkAttachments;
    }
    export function getKPodepsaniIcon(data: GAttachmentDto, isGrid?: boolean): Utils.IconMultiParams & IconTemplate | null;
    export {};
}
interface JQuery {
    gattachmentgrid(options: Gordic.Widget.IGAttachmentGridOptions): JQuery;
    gattachmentgrid(method: 'addFileDoc', event: JQueryEventObject, row?: any): Promise<any>;
    gattachmentgrid(method: 'addFileAttachment', event: JQueryEventObject, row?: any): Promise<any>;
    gattachmentgrid(method: 'addBaseAttachment', row?: any): JQuery;
    gattachmentgrid(method: 'moveAttachmentFromUkoSsl', direction: number, row?: any): JQuery;
    gattachmentgrid(method: 'odstranitNeElePrilohu', row?: any): JQuery;
    gattachmentgrid(method: 'zmenitAktivitu', row?: any): JQuery;
    gattachmentgrid(method: 'otevrit', uzamknout?: boolean, row?: any): JQuery;
    gattachmentgrid(method: 'editAttachment', row?: any): JQuery;
    gattachmentgrid(method: 'zrusitZamek', row?: any): JQuery;
    gattachmentgrid(method: 'stahnoutVse', row?: any): JQuery;
    gattachmentgrid(method: 'showVerze', row?: any): JQuery;
    gattachmentgrid(method: 'showInfo', row?: any): JQuery;
    gattachmentgrid(method: 'changeOrder', row?: any): JQuery;
    gattachmentgrid(method: 'markAsFavorite', row?: any): JQuery;
    gattachmentgrid(method: 'exchangeFavorite', row?: any): JQuery;
    gattachmentgrid(method: 'odpojit', row?: any): JQuery;
    gattachmentgrid(method: 'presunout', row?: any): JQuery;
    gattachmentgrid(method: 'markAsApproved', row?: any): JQuery;
    gattachmentgrid(method: 'pridatPodpis', isUA?: boolean, row?: any): JQuery;
    gattachmentgrid(method: 'overitPodpis', ginPdfSigninpPar: number, row?: any): JQuery;
    gattachmentgrid(method: 'historieOvereni', row?: any): JQuery;
    gattachmentgrid(method: 'konverzePdf', row?: any): JQuery;
    gattachmentgrid(method: 'zmenaDatovehoFormatu', row?: any): JQuery;
    gattachmentgrid(method: 'markForEpk', row?: any): JQuery;
    gattachmentgrid(method: 'addSignatureLocation', row?: any): JQuery;
    gattachmentgrid(method: 'addSignatureLocationAndSign', row?: any): JQuery;
    gattachmentgrid(method: 'anonymize', row?: any): JQuery;
    gattachmentgrid(method: 'detailFormulare', row?: any): JQuery;
    gattachmentgrid(method: 'pridatFormular', row?: any): JQuery;
    gattachmentgrid(method: 'pridatSKPecetStara', row?: any): JQuery;
    gattachmentgrid(method: 'pridatSKPecet', row?: any): JQuery;
    gattachmentgrid(method: 'oznacitZverejnit', actionId: string, row?: any): JQuery;
    gattachmentgrid(method: 'zverejneni', nazevUDA: string, popisUDA: string, row?: any): JQuery;
    gattachmentgrid(method: 'historieZverejneni', row?: any): JQuery;
    gattachmentgrid(method: 'zverejneniUDE', nazevUDA: string, popisUDA: string, row?: any): JQuery;
    gattachmentgrid(method: 'zneaktivnitOdstranit', flagOdstranit: Boolean, row?: any): JQuery;
    gattachmentgrid(method: 'vytezitPdfOcr', row?: any): JQuery;
    gattachmentgrid(method: 'vytezitPdfForm', row?: any): JQuery;
    gattachmentgrid(method: 'tiskObsahu', row?: any): JQuery;
    gattachmentgrid(method: 'tiskMetadat', row?: any): JQuery;
    gattachmentgrid(method: 'switchGrid'): boolean;
    gattachmentgrid(method: 'switchGrid', isSwitched: boolean): JQuery;
    gattachmentgrid(method: 'getActionsList'): GActionList;
    gattachmentgrid(method: 'getSelection'): Gordic.Wfl.Interface.GAttachmentDto[];
    gattachmentgrid(method: 'refresh', wflspidChanged?: boolean, flashMsg?: string, flashCustomClass?: GState): JQueryPromise<any>;
}
declare namespace Gordic.Wfl {
    class GAttachmentOpenDialog extends GContentBase implements IGClientContent {
        uid: "attachmentOpenDialog#";
        filename: string;
        extension: string;
        statusLock: number;
        lockedByUser: string;
        prepareContent(this: this & GContent<IGContentBase, any>, ...params: any[]): void;
    }
}
declare namespace Gordic.Wfl.WebClient.Attachment {
    enum GAttachmentPermissionsEnum {
        None = 0,
        Anonymize = 1,
        Remove = 2,
        Rename = 4,
        Deactivate = 8,
        PrintGrr = 16,
        AddElDokument = 32,
        AddElDokumentSKonverzi = 64,
        Open = 128,
        OpenElDokumenty = 256,
        Publish = 512,
        PublishOnUredniDeska = 1024,
        Verify = 2048,
        ConvertToPDF = 4096,
        ConvertToPDFSDolozkou = 8192,
        Sign = 16384,
        OCR = 32768,
        VerifyHistory = 65536,
        RemoveContainer = 131072,
        Edit = 1048576,
        OpenAndLock = 2097152,
        Unlock = 4194304,
        MarkAsFavorite = 8388608,
        ExchangeFavorite = 16777216,
        RemoveEle = 33554432,
        DeactivateEle = 67108864,
        AddAttachment = 134217728,
        PublishSelect = 268435456,
        PublishUnSelect = 536870912,
        MarkUnPublish = 1073741824,
        MarkForEpk = 2147483648,
        DownloadAll = 4294967296,
        SignatureLocation = 8589934592,
        AddTimeStamp = 17179869184,
        VytezitPdfForm = 34359738368,
        VytezitPdf = 68719476736,
        ChangeUserOrder = 137438953472,
        DoplnitFormularovaPole = 274877906944,
        Odpojit = 549755813888,
        Presunout = 1099511627776,
        EditStUtajId = 2199023255552,
        ApprovalProcess = 4398046511104,
        Schvalit = 8796093022208,
        PublishBchDiplomaChain = 17592186044416
    }
}
declare namespace Gordic.Wfl {
    export const enum GAttachmentUploaderModeEnum {
        attachment = "attachment",
        mainAttachment = "mainAttachment",
        ixsAttachment = "ixsAttachment",
        ixsMainAttachment = "ixsMainAttachment"
    }
    export class GWflAttachmentUploaderDAO implements WebClient.Attachments.IGAttachmentDAO {
        constructor();
        removeAttachment(parentContent: GContent<IGContentBase, any>, attachment: Interface.GAttachmentDto): JQueryPromise<any>;
        list(parentContent: GContent<IGContentBase, any>, opts?: {
            ixp: string;
        }): JQuery.Promise<Interface.GAttachmentDto[], any, any>;
        readMainAttachment(parentContent: GContent<IGContentBase, any>, opts?: {
            ixp: string;
        }): JQueryPromise<Interface.GAttachmentDto | null>;
        getService(parentContent: GContent): GContent<IGContentBase, any> & {
            className: string;
            serverParams: {};
        };
        insert(parentContent: any, opts: any): JQueryPromise<Isl.GOperationResult<Interface.GAttachmentDto>>;
        convertToPdf(parentContent: any, opts: any): JQueryPromise<WebClient.GAttachmentConversionResultDto>;
        verifySignature(parentContent: any, opts: any): JQueryPromise<Interface.GOveritPodpisDto>;
        destroy(): void;
    }
    export interface IGAttachmentUploaderOptions {
        /** defaultMode */
        mode?: GAttachmentUploaderModeEnum;
        mainAttachmentMode?: GAttachmentUploaderModeEnum;
        attachmentMode?: GAttachmentUploaderModeEnum;
        parentContent?: GContent;
        DAO?: WebClient.Attachments.IGAttachmentDAO;
        done?: (param: {
            isFavorite: boolean;
            files: Gordic.General.ApplicationInterface.GFileInfoDto[];
            attachments: Interface.GAttachmentDto[];
            partial?: boolean;
        }) => void;
        enabled?: boolean;
        uploadOptions?: {
            /** validate, that only one file with given hash is inserted */
            checkHash?: boolean;
            /** visibility of ktgPri field */
            useKtgPri?: boolean;
            /** filter for ktgPri */
            ktgPriFilter?: number[];
            /** default value for ktgpri */
            defaultKtgPri?: number;
            wflPristupyPri?: number | null;
            prizRezimUtaj?: boolean | null;
            stUtajIdFilter?: GBaseFilter<number> | null;
            pouzitPristup?: boolean;
            defaultStUtajId?: number | null;
        };
    }
    export interface IGAttachmentInvokeOpts {
        porCislo?: number;
        enabled?: boolean;
    }
    export interface IGAttachmentUploaderFileState extends IGClientProgressOptions {
        file: Gordic.General.ApplicationInterface.GFileInfoDto;
        status: 'working' | 'done' | 'error';
        customData: any;
    }
    export interface IAttachmentUploaderDialog {
        addFile(fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto, customData: any): JQuery.Promise<Isl.GOperationResult<Interface.GAttachmentDto>, string>;
        buildMoreSection(mode: GAttachmentUploaderModeEnum): void;
        updateMoreSection(moreVisible: boolean, newFile: IGAttachmentUploadInfo | null, oldFile: IGAttachmentUploadInfo | null): void;
        toUploadDto(data: IGAttachmentUploadInfo, moreVisible?: boolean): Interface.GAttachmentUploadDto;
        collectValues(): void;
        removeFile(guid: string): void;
        byteSigner: Gordic.Wfl.WebClient.GByteSigner;
        successFiles: Gordic.General.ApplicationInterface.GFileInfoDto[] | null;
        successAttachments: Interface.GAttachmentDto[] | null;
        ktgDpoSupport?: GKtgDpoSupport;
        ktgDpoSupportConversion?: GKtgDpoSupport;
        fileService: GContent;
    }
    interface IGAttachmentUploadInfo {
        file: Gordic.General.ApplicationInterface.GFileInfoDto | null;
        extSign?: Gordic.General.ApplicationInterface.GFileInfoDto[] | null;
        extTimestamp?: Gordic.General.ApplicationInterface.GFileInfoDto[] | null;
        title: string;
        description?: string;
        timestamp?: boolean;
        sign?: boolean;
        verifySignature?: boolean;
        convertToPdf?: boolean;
        ktgTypPri?: number;
        signedInDialog?: boolean;
        hasTextLayer?: boolean | null;
        conversionFile?: Gordic.General.ApplicationInterface.GFileInfoDto | null;
        conversionSigned?: boolean;
        confirmedTextLayer?: boolean;
        confirmedInsertOverHashExists?: boolean;
        priz_ts?: number;
        priz_znacka?: number;
        priz_podpis?: number;
        priz_edit_text?: number;
        ixsDpo?: string | null;
        signingReason?: string | null;
        stUtajId?: number | null;
    }
    export class GAttachmentUploader implements GEvents {
        protected sxs: any;
        protected _options: IGAttachmentUploaderOptions;
        protected _DAO: WebClient.Attachments.IGAttachmentDAO;
        private _hasOwnDAO;
        protected _fileField: JQuery;
        protected _dialog: JQuery | null;
        protected _origItemTemplate: ((row?: Gordic.General.ApplicationInterface.GFileInfoDto) => string | void | HTMLElement | JQuery);
        constructor(sxs: any, _options: IGAttachmentUploaderOptions);
        on(eventName: string, fce: Function): this;
        off(eventName: string): this;
        trigger(eventName: string, args: any[]): void;
        dispatchEvent(eventName: string, args: IArguments | Function | any[]): void;
        protected prepareContent(mode: GAttachmentUploaderModeEnum, opts?: IGAttachmentInvokeOpts): ThisType<GContent & IAttachmentUploaderDialog>;
        uploadMainAttachment(opts?: IGAttachmentInvokeOpts): JQueryPromise<any>;
        uploadAttachment(opts?: IGAttachmentInvokeOpts): JQueryPromise<any>;
        protected showUI(mode?: GAttachmentUploaderModeEnum, opts?: IGAttachmentInvokeOpts): JQueryPromise<any>;
        protected canOpenUI(opts?: IGAttachmentInvokeOpts): boolean;
        protected setFieldOptions(mode: GAttachmentUploaderModeEnum, enabled?: boolean, porCislo?: number): void;
        protected invokeUpload(): void;
        addDropZone(element: JQuery): void;
        enable(val: boolean): void;
        updateOptions(uploadOptions: IGAttachmentUploaderOptions['uploadOptions']): void;
        destroy(): void;
    }
    export {};
}
declare namespace Gordic.Wfl.AttachmentUtils {
    interface GAttachmentDto extends Gordic.Wfl.Interface.GAttachmentDto {
    }
    export function GetSrv(content: GContent): GContent<IGContentBase, any>;
    export enum GAttachmentOpenKind {
        open = "open",
        download = "download",
        preview = "preview",
        request = "request"
    }
    interface ICheckForBindedVisualSignPosition {
        /** identifikátor dokumentu - vyplněný v případě jednotlivých žádosti do EPK, v případě úkonů schval. procesu předat pouze serCislo */
        Ixp?: string | null;
        /** identifikátor souboru - pro přílohy na detail dokumentu, jinak nevyplňovat */
        Ixb?: string | null;
        /** serCislo žádosti v EPK */
        SerCisloEpk?: number | null;
        /** identifikátor kategorie důvodu podpisu */
        IxsDpo?: string | null;
    }
    export interface ISignatureLocationWithTempConfigDto {
        cnt: GContentType<any>;
        ixp: string;
        wflSignCreateConfig?: Wfl.Interface.GWflSignCreateConfig | null;
        data?: GAttachmentDto;
    }
    export interface ISignatureLocationDto {
        /** gcontent */
        cnt: GContentType<any>;
        /** jednotlivé žádosti v EPK */
        ixp?: string | null;
        /** přílohy v USU */
        ixb?: string | null;
        /** úkony schval procesu v EPK*/
        ixsSpd?: string | null;
        /** zobrazit Flash? */
        showFlash?: boolean;
        /** pro žádosti do EPK */
        serCisloEpk?: number;
        /** identifikátor kategorie důvodu podpisu */
        ixsDpo?: string | null;
        ix: Wfl.Interface.GSignaturePositionBindingAllowedIx;
    }
    export interface ISignatureLocation {
        type: SignatureLocationEnum | null;
        caption: string | null;
        ixs?: string;
        visualSignId?: string[];
    }
    export enum SignatureLocationEnum {
        /** jedná se o nové (první) umístění vizuálního podpisu */
        new = 0,
        /** jedná se o změnu místa umístění vizuálního podpisu */
        update = 2,
        /** umístit vizuální podpis se nepovedlo nebo bylo záměrně odstraněno */
        fail = 3
    }
    export interface IAttachmentReloadingCacheDto {
        /** grouResult */
        grouResult?: Gordic.Wfl.WebClient.GroupResult[];
        /** selection */
        selection?: GAttachmentDto[];
    }
    export const openAttachmentKindDefaultUserSettingsKey = "Global.Wfl.AppSettings.OtherSettings.attachmentOpenChoiceDefault";
    export const openAttachmentKindUserSettingsKey = "Global.Wfl.AppSettings.OtherSettings.attachmentOpenChoice";
    export const certInfoZDFUserSettingsKey = "Global.Wfl.AppSettings.OtherSettings.certInfoZDF";
    export const certInfoOdeslaniUserSettingsKey = "Global.Wfl.AppSettings.OtherSettings.certInfoOdeslani";
    /**
     * Otevře el. obraz z ULO na přímý link. Náhrada za aplikaci ZEO
     *
     * @author  RTomes
     *
     * @param  {gcontent}                             cnt                             Volajici content.
     * @param  {ixp}                                  ixp                             Ixp.
     * @param  {download}                             download                        priznak stažení (true) nebo otevření přes doplněk (false).
     * @return  .
     */
    export function ShowMainAttachment(cnt: GContent, ixp: string, download: boolean): void;
    /**
     * Otevre el. dokument z ULO
     *
     * @author  RTomes
     *
     * @param  {gcontent}                             cnt                             Volajici content.
     * @param  {attachmentFileRow}                    attachmentFileRow               Dto priloh.
     * @param  {boolean}                              savingEnabled                   Zda ma v danem kontextu smysl ulozeni nove verze. Nesouvisi s rizenim prav ukladani nove verze, to se resi uvnitr.
     * @param  {boolean}                              uzamknout                       Zda uzamknout prilohu pri otevreni.
     * @return  .
     */
    export function OpenAttachment(cnt: GContent, attachmentFileRow: Partial<Interface.GAttachmentDto>, savingEnabled: any, uzamknout?: boolean, disablePluginDownload?: boolean | GAttachmentOpenKind, opts?: {
        filePreviewOptions?: Partial<IGFilePreviewLoadOptions>;
        downloaderType?: string;
        uploaderType?: string;
        extKonRak?: boolean;
    }): JQuery.Promise<any, any, any>;
    /**
     * stáhne vsechny prilohy dokumentu z ULO - vrati zabalene v zip
     *
     * @author  RTomes
     *
     * @param  {gcontent}                             cnt                             Volajici content.
     * @param  {string}                               ixp                             Ixp dokumentu
     * @return  .
     */
    export function DownloadAllAttachments(cnt: any, ixp: any, disablePluginDownload?: boolean): JQuery.Promise<any, any, any>;
    /**
     * umístění podpisu (s temp configem)
     */
    export function addSignatureLocationWithTempConfig(opt: ISignatureLocationWithTempConfigDto): JQueryPromise<{
        tempWflSignCreateConfig: Wfl.Interface.GWflSignCreateConfig;
        badgeUmisteniPodpisu: boolean;
    }>;
    /** metoda pro vrácení WflSignCreateConfigu */
    export function GetWflSignCreateConfig(Ixp: string, Ixb: string, SerCisloEpk?: number | null, content?: GContent): JQueryPromise<Wfl.Interface.GWflSignCreateConfig>;
    /** odstranění vizuálních podpisů */
    export function RemoveVisualIds(ixs: string, ixsUmiList: string[], content: GContent): gjqXHR<any>;
    /**
    * Prida umisteni podpisu
    * - zatím pouze pro obraz, bude potřeba dodat pro přílohy
    *
    * @author  thazmuka
    *
    */
    export function addSignatureLocation(opt: ISignatureLocationDto): JQueryPromise<ISignatureLocation>;
    /**
     * Uložení nového vizuálního podpisu
     */
    export function SetFutureSignaturePlacement(InputSignaturePositions: Gordic.Security.Service.GPdfVisualSignPositionDto, Dto: Wfl.Interface.GEpkFutureSignaturePlacementDto, content: GContent): JQueryPromise<boolean>;
    /**
     * Metoda pro vyzvednutí pozic vizuálního podpisu
     */
    export function CheckForBindedVisualSignPosition(opt: ICheckForBindedVisualSignPosition, content: GContent): any;
    /**
     * Metoda pro vyzvednutí pozic vizuálního podpisu (se vstupním configem)
     */
    export function CheckForBindedVisualSignPositionWithConfig(config: Wfl.Interface.GWflSignCreateConfig, content: GContent): JQueryPromise<Wfl.Interface.GWflSignCreateConfig>;
    /**
     * CheckBeforeSignPlacing
     */
    export function CheckBeforeSignPlacing(dto: Gordic.Wfl.Interface.CheckBeforeSignPlacingInDto, content: GContent): JQueryPromise<Gordic.Wfl.Interface.CheckBeforeSignPlacingOutDto>;
    /**
    * CheckAfterSignPlacing
    */
    export function CheckAfterSignPlacing(dto: Gordic.Wfl.Interface.CheckAfterSignPlacingInDto, content: GContent): JQueryPromise<Gordic.Wfl.Interface.CheckAfterSignPlacingOutDto>;
    /**
     * vrati el. obraz z doby vyřízení žádosti
     *
     * @author  thazmuka
     *
     * @param  {gcontent}                     cnt                         Volajici content.
     * @param  {string}                       ixp                         ixp prilohy
     * @param  {GPodpisovaKnihaDto}           row                         data řádku vyřízené žádosti
     * @return  GAttachmentDto
     */
    export function GetFavoriteFromTimeOfSettlement(cnt: any, ixp: any, row: any): JQuery.Promise<any, any, any>;
    /**
   * vrati el. přílohu z doby vyřízení žádosti podle pořadového čísla
   *
   * @author  thazmuka
   *
   * @param  {gcontent}                     cnt                         Volajici content.
   * @param  {string}                       ixp                         ixp prilohy
   * @param  {GPodpisovaKnihaDto}           row                         data řádku vyřízené žádosti
   * @return  GAttachmentDto
   */
    export function GetAttachmentFromTimeOfSettlementByPorCislo(cnt: any, ixp: any, porCislo: any, row: any): JQuery.Promise<any, any, any>;
    /**
   * vrati el. přílohy z doby vyřízení žádosti
   *
   * @author  thazmuka
   *
   * @param  {gcontent}                     cnt                         Volajici content.
   * @param  {string}                       ixp                         ixp prilohy
   * @param  {GPodpisovaKnihaDto}           row                         data řádku vyřízené žádosti
   * @return  GAttachmentDto
   */
    export function GetAttachmentsFromTimeOfSettlement(cnt: any, ixp: any, row: any): JQuery.Promise<any, any, any>;
    /**
     * vrati el. obraz
     *
     * @author  RTomes
     *
     * @param  {gcontent}                     cnt                         Volajici content.
     * @param  {string}                       ixp                         ixp prilohy
     * @return  GAttachmentDto
     */
    export function GetFavorite(cnt: any, ixp: any): JQuery.Promise<any, any, any>;
    /**
     * vrati prilohu
     *
     * @author  RTomes
     *
     * @param  {gcontent}                     cnt                         Volajici content.
     * @param  {string}                       ixp                         ixp prilohy
     * @param  {string}                       ixb                         ixb prilohy
     * @return  GAttachmentDto
     */
    export function GetAttachment(cnt: any, ixp: any, ixb: any): JQuery.Promise<any, any, any>;
    /**
     * vrati prilohu
     *
     * @author  RTomes
     *
     * @param  {gcontent}                     cnt                         Volajici content.
     * @param  {string}                       ixp                         ixp prilohy
     * @param  {number}                       porCislo                    pořadové číslo prilohy
     * @param  {boolean}                       convertToPdf                zda se má provést konverze do PDF
     * @return  GAttachmentDto
     */
    export function GetAttachmentByPorCislo(cnt: any, ixp: any, porCislo: any, convertToPdf: any): JQuery.Promise<any, any, any>;
    /**
     * vrati seznam priloh k ixp - dokumentu
     *
     * @author  RTomes
     *
     * @param  {string}                       ixp                         ixp dokumentu
     * @param  {boolean}                      onlyEle                     jen elektronicke
     * @param  {boolean}                      onlyActive                  jen aktivni
     * @return  GAttachmentDto
     */
    export function GetListAttachments(ixp: string, onlyEle?: boolean, onlyActive?: boolean, content?: GContent): JQuery.Promise<any, any, any>;
    /**
     * vrati seznam kategorii priloh
     *
     * @author  RTomes
     *
     * @param  {string}                       ixp                         ixp dokumentu
     * @return  GAttachmentCategories
     */
    export function GetCategories(ixp: any, content: GContent): JQuery.Promise<any, any, any>;
    export function GetStatusLockIconDefinition(attachment: GAttachmentDto): {
        icon: string;
        text: string;
        tooltip: string;
    } | null;
    /**
    * GetGridColumnsDefinition
    *
    * @author  RTomes
    *
    * @param  {gcontent}                        cnt                         Volajici content.
    * @param  {GAttachmentOptionsForColumns}    optionsForColumns           Dto s povinnymi parametry.
    * @param  {boolean}                         isMainListAttachments       Priznak volani z hlavniho contentu priloh.
    * @return  GAttachmentDto
    */
    export function GetGridColumnsDefinition(cnt: GContent, optionsForColumns: Gordic.Widget.GAttachmentOptionsForColumns, isMainListAttachments: boolean): Data.GridFormat<any>;
    export function SortPorCisloUser(aObj: any, bObj: any): any | undefined;
    export function SortDescPorCisloUser(aObj: any, bObj: any): any | undefined;
    export function getSignIcon(data: GAttachmentDto): Gordic.Utils.IconMultiParams & IconTemplate | null;
    export function getFileIcon(data: GAttachmentDto): IconTemplate & Gordic.Utils.IconMultiParams;
    export function getZverejneniIcon(data: GAttachmentDto, isGrid?: boolean): Gordic.Utils.IconMultiParams & IconTemplate | null;
    export const ktgPrilohyColumnDefinition: GGridColumn<GAttachmentDto>;
    /**
     * DTO pro prenos vysledku na kontrolu souboru
     *
     * @author pnovak
     * @since 482.1.0.707
     */
    export interface CheckPropertiesResult {
        /**
         * priznak ze je validni dto
         * @type {boolean}
         */
        isValid: boolean;
        /**
         * Chybove hlaseni
         * @type {string}
         */
        err: string;
    }
    export function CheckPropertiesOfFile(fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto): CheckPropertiesResult;
    export function GetPripona(FilePath: string): string;
    export function _gTrim(str: string): string;
    /**
     * konvertuje dokument - jeho hlavní přílohu
     *
     * @author  RTomes
     *
     * @param  {gcontent}                     cnt                         Volajici content.
     * @param  {string}                       ixp                         ixp prilohy
     * @return  GAttachmentDto
     */
    export function ConvertDocument(cnt: any, ixp: string): JQuery.Deferred<any, any, any>;
    export function ConvertDocuments(cnt: any, ixpsToConvert: string[]): JQuery.Promise<any, any, any>;
    /**
     * konvertuje dokument - jeho hlavní přílohu
     *
     * @author  RTomes
     *
     * @param  {gcontent}                     cnt                         Volajici content.
     * @param  {string}                       ixp                         ixp prilohy
     * @return  GAttachmentDto
     */
    export function ConvertAllAttachmentsInDocument(cnt: any, ixp: string): JQuery.Promise<any, any, any>;
    export function ConvertAllAttachmentsInDocuments(cnt: any, ixpsToConvert: string[]): JQuery.Promise<any, any, any>;
    export function pridatPodpisProUkrajinu(this: GAction, attachmentGrid: Gordic.Widget.GAttachmentGrid): JQuery.Promise<any, any, any>;
    /**
     * podepise dokument - jeho hlavní přílohu
     *
     * @author  RTomes
     *
     * @param  {gcontent}                     cnt                         Volajici content.
     * @param  {Gordic.Wfl.WebClient.GSgn}    signModule                  signModule
     * @param  {string}                       ixp                         ixp prilohy
     * @return  GAttachmentDto
     */
    export function SignDocument(cnt: any, signModule: Gordic.Wfl.WebClient.GSgn, ixp: string, convertToPDF: boolean, checkArchiveFormat: boolean, otherFilesToSignIxbs?: string[]): JQuery.Deferred<any, any, any>;
    export function SignDocuments(cnt: any, signModule: Gordic.Wfl.WebClient.GSgn, ixpsToSign: any[], otherFilesToSignIxbsDicitionary?: ObjectLiteral<string[]>): JQuery.Promise<any, any, any>;
    export function SignDocumentsWithInit(cnt: any, ixpsToSign: any[], otherFilesToSignIxbsDicitionary?: ObjectLiteral<string[]>): JQuery.Promise<any, any, any>;
    export function SignDocumentsWithInit2(cnt: any, ixpsToSign: any[], otherFilesToSignIxbsDicitionary?: ObjectLiteral<string[]>): JQuery.Promise<any, any, any>;
    /**
     * RozpoznaniFormatuSouboru jednoho dokumentu
     *
     * @author  RTomes
     *
     * @param  {gcontent}                     cnt                         Volajici content.
     * @param  {string}                       ixp                         ixp prilohy
     * @param  { boolean } iPrilohy           iPrilohy
     * @return  GAttachmentDto
     */
    export function RozpoznaniFormatuSouboruDokumentu(cnt: any, ixp: string, iPrilohy: boolean): JQuery.Promise<any, any, any>;
    export function RozpoznaniFormatuSouboru(cnt: any, ixps: string[], iPrilohy: boolean): JQuery.Promise<any, any, any>;
    /**
     * doplní formulářová pole k hlavní příloze a stáhne ji na klieta
     *
     * @author  RTomes
     *
     * @param  {gcontent}                             cnt                             Volajici content.
     * @param  {string}                               priloha                         dto prilohy
     * @return  .
     */
    export function DoplnitFormularovaPoleKHlavniPriloze(cnt: any, priloha: GAttachmentDto): JQuery.Promise<any, any, any>;
    /**
     * vrati seznam kategorii priloh
     *
     * @author  RTomes
     *
     * @param  {string}                       AttachmentDtoList                         ixp dokumentu
     * @return  GAttachmentCategories
     */
    export function PrintFiles(attachmentDtoList: GAttachmentDto[], content: GContent): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
    /**
     * vrati seznam kategorii priloh
     *
     * @author  RTomes
     *
     * @param  {string}                       AttachmentDtoList                         ixp dokumentu
     * @return  GAttachmentCategories
     */
    export function PrintFilesBegin(printFiles: Wfl.Interface.GPrintFileByClientDto[], content: GContent): JQuery.Promise<any, any, any>;
    /**
    * vrati seznam kategorii priloh
    *
    * @author  RTomes
    *
    * @param  {string}                       AttachmentDtoList                         ixp dokumentu
    * @return  GAttachmentCategories
    */
    export function PrintFileStartPrint(printFile: Wfl.Interface.GPrintFileByClientDto, content: GContent): JQuery.Promise<any, any, any>;
    /**
     * převede GAttachment2Dto na GAttachmentDto (experimentální k omezenému použití)
     *
     * @author  RTomes
     *
     * @param  {string}                       attachment                         priloha dokumentu, nové DTO pro ISL
     * @return  GAttachmentDto
     */
    export function ConvertToAttachmentDto(attachment2: Wfl.Interface.GAttachment2Dto): Wfl.Interface.GAttachmentDto;
    /**
     * převede GAttachmentDto na GAttachment2Dto (experimentální k omezenému použití)
     *
     * @author  RTomes
     *
     * @param  {string}                       attachment                         priloha dokumentu, původní DTO
     * @return  GAttachment2Dto
     */
    export function ConvertToAttachment2Dto(attachment: GAttachmentDto): Wfl.Interface.GAttachment2Dto;
    export {};
}
declare namespace Gordic.Wfl.WebClient {
    type AttachmentsGridColumnName = 'ixp' | 'por_cislo' | 'ktg_typ_pri_txt' | 'stavUzamceni' | 'typPrilohy' | 's_sgn' | 'typSouboru' | 'obsah_text' | 'typ_soub' | 'priponaSouboru' | 'velikost' | 'pocet' | 'je_zver' | 'stav_ann' | 'priz_epk' | 'ktg_duv_podp_txt' | 'signaturePositionBindingsTxt' | 'stav_epx_zve' | 'priz_plat_ver' | 'priz_arch_ver' | 'formatKArchivaci' | 'poznamka' | 'soubor' | 'dat_zmena' | 'typ_prilohy_txt' | 'forma_prilohy_txt' | 'st_utaj_id_txt' | 'st_utaj_id_duvod' | 'ixs_car' | 'por_cislo_uziv' | 'ixb' | 'identifikator_souboru';
    type AttachmentsFilterFiledName = 'ixp';
    /**
     * Seznam příloh (včetně obrazu).
     *
     * @author  TFeik
     * @date    16.02.2024
     * @since   524.20.0.53
     */
    class GAttachmentsDlg extends GContentBase implements IGClientContent {
        /**
         * prepareContent
         *
         * @author  TFeik
         * @date    16.02.2024
         */
        prepareContent(): void;
        /**
         * Vytvoří seznam sloupců gridu dle příloh v detailu dokumentu.
         *
         * @author  TFeik
         * @date    16.02.2024
         * @since   524.20.0.53
         */
        static CreateGridColumnListDefault(input: {
            /**
             * (default: 0) GIN ELE - Okno příloh dokumentu - Zobrazení kategorie přílohy na začátku seznamu.
             * @type {number | null | undefined}
             */
            gin_ele_priktza: number | null | undefined;
            /**
             * (default: 0) GIN ELE - Okno příloh dokumentu - Povolení označení příloh pro podpis v EPK.
             * @type {number | null | undefined}
             */
            gin_ele_okprepk: number | null | undefined;
            /**
             * (default: 0) GIN ELE - Zobrazovat informace o kontrole formátu souboru na okně verzí elektronického dokumentu.
             * @type {number | null | undefined}
             */
            gin_ele_infkofo: number | null | undefined;
        }): string;
        /**
         * Vytvoří sloupce gridu pro seznam příloh.
         *
         * @author  TFeik
         * @date    16.02.2024
         * @since   524.20.0.53
         */
        static CreateGridColumns(input: {
            /**
             * (default: 0) GIN SGN - Pozice obrázku doplněného při přidání el. podpisu (např. do PDF).
             * @type {number | null | undefined}
             */
            gin_pdf_pictpos: number | null | undefined;
            /**
             * (default: 0) EPK - Povolení umístění vizuálního podpisu při vyřizování žádosti.
             * @type {number | null | undefined}
             */
            epk_povumipod: number | null | undefined;
            /**
             * (default: 0) GIN ELE - Okno příloh dokumentu - povolení používat formu přílohy (listinná, nelistinná, el.).
             * @type {number | null | undefined}
             */
            gin_ele_prifp: number | null | undefined;
            /**
             * (default: 0) GIN ELE - Okno příloh dokumentu - povolení používat čárový kód přílohy, přístup k příloze.
             * @type {number | null | undefined}
             */
            gin_ele_prifc: number | null | undefined;
            /**
             * (default: 0) GIN ELE - Okno příloh dokumentu - Povolení označení příloh pro podpis v EPK
             * @type {number | null | undefined}
             */
            gin_ele_okprepk: number | null | undefined;
        }): Data.GridFormat<Interface.GAttachment2Dto>;
        /**
         * Vytvoří formulře s filtry pro seznam příloh.
         *
         * @author  TFeik
         * @date    21.02.2024
         * @since   524.20.0.53
         *
         * @returns {Forms.Form}
         */
        private static CreateFilterForm;
    }
}
interface IGContextMenuActionContext<TRow> {
    selection: TRow[];
}
interface IRestricted {
    Permissions: number;
}
declare enum GContextMenuActionType {
    /**
     * jednořídková akce
     */
    Single = 0,
    /**
     * víceřádková akce
     */
    Multi = 1
}
interface IContextMenuAction<TRow extends IRestricted> {
    /** Oprávnění, která jsou potřeba ke spuštění akce, záznamy, které
     *  toto oprávnění mít nebudou, budou vyřazeny z výběru */
    requiredPermission?: number;
    /** Akce ke spuštění, její Caption se převezme do menuParams a
     *  pokud se změna vztahuje na více než jeden řádek, bude ke caption
     *  přidán GBadge s číslovkou, kolika řádků se akce týká */
    action: GAction;
    /** Funkce se použije k převodu akce na menuParams, výsledek void zabrání
     *  zobrazení akce v menu */
    toMenuParams?(cellContext: IGGridCellContext<TRow>): MenuParams | void;
    /** Funkce dostane vstupní selection kolekci a má vrátit kolekci jen těch
     *  prvků, které lze zpracovat. Výchozí metoda vyfiltruje jen prvky, které
     *  nesplňují requiredPermission. */
    filterPermissible?(selection: TRow[]): TRow[];
    /** Typ akce - jednořádková nebo hromadná nad více záznamy/řádky */
    actionType: GContextMenuActionType;
}
declare namespace Gordic {
    /**
     * Object pro práci s kontextovým menu, obsahuje akci GAction, oprávnění
     *  jako číslo a metodu pro transformaci akce na MenuParams
     */
    class GContextMenuAction<T extends IRestricted> implements IContextMenuAction<T> {
        readonly requiredPermission: number;
        readonly action: GAction;
        readonly actionType: GContextMenuActionType;
        constructor(options: IContextMenuAction<T>);
        filterPermissible(selection: T[]): T[];
        toMenuParams(context: IGContextMenuActionContext<T>): MenuParams | void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GExportElDokumentuDlgInputParams {
        /**
         * Ixp dokumentu.
         */
        Ixp: string;
    }
    interface GExportElDokumentuDlgReturnValue {
    }
    /**
     * GExportElDokumentuDlg.
     */
    class GExportElDokumentuDlg extends GContentBase {
        /**
         * Historie zásilky.
         */
        private OdeslaniHistorieZasilky;
        private Grid;
        private PouzeRozluka;
        private TiskIDObsahSpisu;
        private Dto;
        private GridDataView;
        private $Formular;
        /**
         * OnContentReady.
         *
         * @author  DSebesta
         * @date    25.07.2017
         */
        onContentReady(): void;
        createGrid(dto: any): void;
        /**
         * Vytvoří menu.
         *
         * @author  DSebesta
         * @date    30.08.2017
         */
        private _createMenu;
        private createForm;
        private enableControls;
        private setModel;
        /**
         * closing
         *
         * @author  DSebesta
         * @date    13.06.2019
         *
         * @returns {JQueryPromise<GExportElDokumentuDlgReturnValue>}
         */
        closing(): JQueryPromise<GExportElDokumentuDlgReturnValue>;
        private stahniSouborPodleGuid;
        private startExport;
        private finalExportSpisu;
        private vyhodHlasky;
        private zkontrolujHlasku;
        private startVyberDokumentu;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GExportElDokumentuVyberDokumentuDlgInputParams {
        /**
        * Ixp.
        */
        Ixp: string;
        /**
         * Ixp dokumentu.
         */
        IxpVybranychDokumentu: string[] | null | undefined;
    }
    interface GExportElDokumentuVyberDokumentuDlgReturnValue {
        ListVybranychDokumentu: any;
    }
    /**
     *Výběr dokumentů k exportu
     */
    class GExportElDokumentuVyberDokumentuDlg extends GContentBase {
        /**
         * Historie zásilky.
         */
        private Grid;
        private Dto;
        private ViewSbernyArch;
        private IxpVybranychDokumentu;
        /**
         * OnContentReady.
         *
         * @author  DSebesta
         * @date    25.07.2017
         */
        onContentReady(): void;
        createGrid(dto: any): void;
        /**
         * Vytvoří menu.
         *
         * @author  DSebesta
         * @date    30.08.2017
         */
        private _createMenu;
        vybrat(): void;
        detail(): void;
        oznacitAnalogovy(): void;
        oznacitDigitalni(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /** historie ověření el. dokumentu */
    class GHistorieOvereniElDokumentu extends GContentBase {
        /** GIN ELE - Způsob zobrazení historie ověření el. dokumentu */
        private gin_okhistov;
        private listNew;
        /** dto s daty pro seznam */
        private dto;
        /** zobrazení flashe varování */
        private flashWarning;
        private IdCrlVisible;
        private DatCrlVisible;
        private IdCrlInVisible;
        private DatCrlInVisible;
        private DatOcspVisible;
        private DatOcspInVisible;
        private groupByVerze;
        private groupBySoubor;
        private groupByCerJmeno;
        private groupByDatPodpisu;
        private mode;
        private ixp;
        private ixb;
        private fileName;
        onContentReady(): void;
        private createCommandbar;
        private createFlash;
        private assignObject;
        /** vytvořit seznam */
        private createGrid;
        private createGridFormat;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Dialog Otisku
     *
     * @author dsebesta
     * @since 484.2.0.456
     */
    class GInfoODohledaniDleOtisku extends GContentBase {
        private _options;
        private grid;
        prepareContent(options: GInfoODohledaniDleOtiskuOptions): void;
        private createForm;
    }
    interface GInfoODohledaniDleOtiskuOptions {
        /** Pevny Text */
        data?: Gordic.Wfl.Interface.DokSpisListDto[] | null;
        /** Titulek*/
        tittle?: string;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class KonverzePdfDlg extends GContentBase {
        private readonly Ixp;
        private ZnackaLabelText;
        private KonvertovatText;
        private SchvalitTooltip;
        private ActKonvertovatEnabled;
        private KonvertovatEnabled;
        private PodepsatEnabled;
        private Faze;
        private LzeSchvalit;
        private SPrij;
        private GinSgnSamoraz;
        private GinElePcasrazPar;
        private GinEleCrazObPar;
        private GinEleCrazPrPar;
        private IsEpkVersion;
        private DpoEnabled;
        private readonly model;
        private readonly validators;
        readonly userSettings: Data.IGStorage;
        private readonly flashPanelTimer;
        private grid?;
        private divGridKonverze?;
        private attachments;
        private categories;
        private ktgDuvPodp;
        private konverzeUserSelection;
        private vyberRadkuPodpisu;
        private actionSchvalitEnabled;
        private schvalitVisible;
        private showConversionStatus;
        private showSigningStatus;
        private gSgn?;
        private ktgDpoSupport?;
        private sablonaPrgChange;
        private isChange;
        private dataView?;
        private canAddTsFavorite;
        private canAddTsAttachment;
        private konvPodpisSchval;
        /**
         * OnContentReady.
         *
         * @author  rtomes
         * @date    09.03.2021
         */
        onContentReady(): void;
        InitDleIxsDpo(IxsDpo: string, FormCreated: boolean, userSigningReason?: string | undefined): JQueryPromise<GKtgDpoDto>;
        createForm(): void;
        LoadGridFromDB(showCover: boolean): void;
        AddGrid(): void;
        Reload(): void;
        ReloadGrid(): void;
        UpdateGrid(): void;
        RucniZadaniSign(): boolean;
        RucniZadaniTS(): boolean;
        GetGridColumnsDefinition(): Gordic.Data.GridFormat;
        KonvertovatClick(): void;
        Konvertovat(): void;
        KonvertovatRow(row: GKonverzeAttachmentDto): JQueryPromise<any>;
        KonverzeEnd(): void;
        Podepsat(): void;
        PodepsatRow(row: GKonverzeAttachmentDto): JQuery.Promise<void, IGReasonResponse>;
        PodepsaniEnd(): void;
        HromadnaOperaceEnd(): void;
        SchvalitClick(userChoice: boolean): JQueryPromise<any>;
        Download(rowData: Partial<Wfl.Interface.GAttachmentDto>): void;
        SablonaChange(): void;
        closing(): JQueryPromise<string | undefined>;
    }
    interface GKonverzeAttachmentDto extends Gordic.Wfl.Interface.GAttachmentDto {
        kov_typ_soub: string;
        konv_err: string;
        sign_err: string;
        sign_checked: boolean;
        timestamp_checked: boolean;
        _updated: boolean;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class PrenosPrilohUkoSsl extends GContentBase {
        private readonly Ixp1;
        private readonly Ixp2;
        private readonly ZnackaLabelText1;
        private readonly ZnackaLabelText2;
        private GinElePriktzaPar;
        private Ixp1LzeElCteni;
        private Ixp2LzeVlozitElObraz;
        private Ixp2LzePridatElPrilohy;
        private OptionsForColumns;
        private readonly model;
        private readonly validators;
        readonly userSettings: Data.IGStorage;
        private readonly flashPanelTimer;
        private formSettings;
        private formOrig;
        private formDupl;
        private grid1;
        private grid2;
        private attachments1;
        private attachments2;
        private originalAttachments2;
        private categories;
        private mainAttachmentInChangedDocument;
        private dataNonSaved;
        private dataChanged;
        private GroupResult?;
        private retValue?;
        /**
         * OnContentReady.
         *
         * @author  rtomes
         * @date    23.2.2021
         */
        onContentReady(): void;
        LoadGridFromDB(showCover: boolean): void;
        AddGrid1(): void;
        AddGrid2(): void;
        Reload(): void;
        ReloadGrid1(): void;
        ReloadGrid2(): void;
        Pridat(): void;
        Odebrat(): void;
        SaveClick(): void;
        Download(rowData: Partial<Wfl.Interface.GAttachmentDto>): void;
        CreateGroupResult(error: string, isError: boolean, key: string, rowState: number): Gordic.Wfl.WebClient.GroupResult;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * GContent s přílohami, téměř veškerá logika je ve widgetu gattachmentsgrid
     * který zobrazuje Grid s přílohami a obsahjuje akce pro přidání příloh.
     * Logika se vyvolává přes widget, tento  GContent slouží akorát k
     * nastylování tabu a k vytvoření menu atd..
     */
    class PrilohyDlg extends GContentBase {
        isolatedUserSettings: boolean;
        userSettings: Gordic.Data.IGStorage;
        /** Vstupni parametry jako JsonParam */
        Ixp: string;
        NazevUDA: string;
        PopisUDA: string;
        PrizSpis: number;
        PublishingMode: boolean;
        PovoleniAkci: Gordic.Wfl.Interface.PrilohyPovoleniAkci;
        AttachmentCategoriesFilter: string;
        IsDbVersionForEpkTemplate: boolean;
        IsPodobaEnabled: boolean;
        IsFormaEnabled: boolean;
        IsIxsCarEnabled: boolean;
        PrizRezimUtaj: boolean;
        VerzeDb: number;
        LicDB: string;
        Desc254: boolean;
        MarkAfterSign: boolean;
        MarkAsApprovedVisible: boolean;
        IsDebug: boolean;
        initMode: "simple" | "full";
        private OptionsForColumns;
        /** Uložený odkaz na element s widgetem gattachmentsgrid */
        private _$grid;
        private LzeVlozitElObraz;
        private LzePridatElPrilohy;
        private LzePridatPrilohy;
        private LzeOtevritElObraz;
        private LzeOtevritElPrilohy;
        private LzeEditovatElPrilohy;
        private LzeEditovatKategoriiElPrilohy;
        private LzeVlozitVerziElObrazuZJinehoDokumentu;
        private MergeVisible;
        private MergeEnabled;
        private GinPdfSigninpPar;
        private GinRadPriektgPar;
        private CategoriesFilter;
        private GinUpsrPovolPar;
        private SslNenPovolPar;
        private GinSgnAsicwayPar;
        private GinRadElekopPar;
        private GinRadElekozPar;
        private GinN23PodPar;
        private PocetPrilohPisemnostiProPlusFormat;
        private JePovolenaAktivniPrace;
        private SPrij;
        private ZDFLicence;
        private FilterStUtajIdForFieldPristup;
        private StUtajId;
        private DpoEnabled;
        private ktgDuvPodp;
        private ktgDpoSupport;
        private KtgDpoSupportDbParamsDto;
        private signModule;
        private SignConfig;
        private _deferredPromise;
        retValue: Gordic.Wfl.Interface.GAttachmentDto[];
        GroupResult?: Gordic.Wfl.WebClient.GroupResult[];
        static createVersionsCountBadge: (versionsCount: number) => {
            id: string;
            value: string;
            tooltip: string;
            customClass: string;
        };
        onContentReady(): void;
        closing(sourceStr: any): JQuery.Promise<any, any, any>;
        /**
         * Nastavuje sidebar pro GContent, pokud by nebyl v tabu ale v okně.
         * Momentálně nevyužité
         */
        private _setupSidebar;
        /**
       * Nastavuje akce na GContentu
       */
        private _setupActions;
        /**
         * Nastavuje menubar na GContentu
         */
        private _setupMenuBar;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class PrilohyVerzeDlg extends GContentBase {
        private readonly model;
        private readonly validators;
        readonly userSettings: Data.IGStorage;
        private IsFavorite;
        private Ixp;
        private Ixb;
        private RemoveMode;
        private ReadOnlyMode;
        private flashPanelTimer;
        private gridVerze?;
        private previewDiv?;
        private GridData;
        private filteredGridData;
        private rowsSuccess;
        private rowsNoSuccess;
        private zrychleneOdstraneni;
        private panelPreviewOpened;
        private retValue;
        private filePreviewOptions;
        private GinRadPrilodsPar;
        private GinEleInfkofoPar;
        private elePreviewEnabled;
        private contextMenu;
        private isIxs;
        private ktgTypPri;
        private wizardElement;
        private downloaderType;
        private uploaderType;
        private GAttachmentService;
        onContentReady(): void;
        CreateMenu(): void;
        CreateForm(): void;
        CreateGrid(): void;
        LoadData(): void;
        SetDataToGrid(data: any): void;
        Reload(): void;
        StepCreate(that: any, contentDiv: any, change: any): void;
        StepChange(that: any, contentDiv: any, change: any): void;
        OtevritVerzi(): void;
        OveritPodpis(): void;
        Podrobnosti(): void;
        PlatnaVerze(flagOznacit: any): void;
        ArchivniVerze(flagOznacit: any): void;
        NastavPriznakyPlatnaArchivniVerze(row: any): void;
        OveritFormat(): void;
        ZneaktivnitSmazat(wizardStepElement: any, wizardChange: any): void;
        Download(rowData: any): void;
        createPreviewPanel(): JQuery<HTMLElement>;
        loadPreview(row: any): void;
        enablePreview(enabled: any): void;
        closing(): JQuery.Promise<void>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class SlouceniPrilohDlg extends GContentBase {
        private readonly Ixp;
        private OptionsForColumns;
        private readonly model;
        private readonly validators;
        readonly userSettings: Data.IGStorage;
        private readonly flashPanelTimer;
        private formDostupne;
        private formSlouceni;
        private grid1;
        private grid2;
        private attachments1;
        private attachments2;
        private categories;
        private LzeVlozitElObraz;
        private LzePridatElPrilohy;
        private retValue?;
        /**
         * OnContentReady.
         *
         * @author  rtomes
         * @date    22.2.2021
         */
        onContentReady(): void;
        LoadGridFromDB(showCover: boolean): void;
        AddGrid1(): void;
        AddGrid2(): void;
        Reload(): void;
        ReloadGrid1(): void;
        ReloadGrid2(): void;
        Odebrat(): void;
        OdebratVse(): void;
        Pridat(): void;
        OKClick(): void;
        Download(row: Partial<Wfl.Interface.GAttachmentDto>): void;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Wfl.ListAC {
    interface GSouboryVNearchFormatuDlgInputParams {
        SouboryNearchivniFormat?: Wfl.Interface.PrilohyNearchFormatDto[];
    }
    class SouboryVNearchFormatuDlg extends GContentBase<WflListBaseAC> {
        model: Interface.GOpravaMetadatDto;
        data: Wfl.Interface.PrilohyNearchFormatDto[];
        dataKZDF: Wfl.Interface.PrilohyNearchFormatDto[];
        options: Interface.GOpravaFormatuOptions;
        konverzniPracovisteRAKOptions: Interface.GKonverzniPracovisteRAKOptionsDto;
        Vyber: boolean;
        Selected: string[];
        private SettingsPath;
        private IxsFunRak;
        initRakDto: Gordic.Data.Readers.GinsfunDto;
        onContentReady(): void;
        SetEnabledActions(): void;
        SetSettings(value: Gordic.Wfl.Interface.GOpravaMetadatSettingsDto | null): void;
        GetSettings(): Gordic.Wfl.Interface.GOpravaMetadatSettingsDto;
        CreateGridFormat(): void;
        GetGridDokSpis(gridColumnsDefinition: any): JQuery;
        Reload(): void;
        LoadData(): void;
        CreateActionOveritFormat(): GAction;
        CreateActionInfoOChybe(): GAction;
        CreateActionVytvoritZadostOZDF(): GAction;
        ZmenaDatovehoFormatuDialog(ixp: string, ixb: string, id: string, certifikat: CertInfo, infoText: string, signer: Gordic.Wfl.WebClient.GByteSigner | undefined): JQuery.Promise<boolean>;
        CreateActionZmenitDatovyFormat(): GAction;
        ZmenaDatovehoFormatu(_selected: Wfl.Interface.PrilohyNearchFormatDto[]): JQuery.Promise<boolean>;
        HromadneOpravit(typOpravy: Interface.TypHromadneOpravyNevalidnichZaznamu): void;
        DoAfterOprava(result: Gin.Interface.GResultInfo[]): void;
        AddToProvedenych(result: string[]): void;
        ReloadData(): void;
        OKClick(): void;
        ExitClick(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class UpresneniProEPKDlg extends GContentBase {
        private readonly ixsDpo;
        private DpoEnabled;
        private readonly model;
        private readonly validators;
        readonly userSettings: Data.IGStorage;
        private readonly flashPanelTimer;
        private ktgDpoSupport?;
        private retValue?;
        private $Form;
        /**
         * OnContentReady.
         *
         * @author  rtomes
         * @date    09.03.2021
         */
        onContentReady(): void;
        createForm(): void;
        OKClick(): void;
        OdstranitClick(): void;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class ZverejneniBchDiplomaChain extends GContentBase {
        private readonly ixsDpo;
        private DpoEnabled;
        private readonly model;
        private readonly validators;
        readonly userSettings: Data.IGStorage;
        private retValue?;
        private $Form;
        /**
         * OnContentReady.
         *
         * @author  rtomes
         * @date    09.03.2021
         */
        onContentReady(): void;
        createForm(): void;
        OKClick(): void;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Wfl.WebClient.Attachments {
    /**
     * IGAttachmentDAO
     *
     * @author Vlastimil Máca
     * @since 484.2.0.919
     */
    interface IGAttachmentDAO {
        list(parentContent: GContent, opts?: {
            ixp: string;
        }): JQuery.Promise<Interface.GAttachmentDto[], any, any>;
        readMainAttachment(parentContent: GContent, opts?: {
            ixp: string;
        }): JQueryPromise<Interface.GAttachmentDto | null>;
        insert(parentContent: GContent, opts?: {
            ixp: string;
            isFavorite: boolean;
            porCislo?: number;
            fileInfo: Interface.GAttachmentUploadDto;
        }): JQueryPromise<Interface.GAttachmentDto | null | Isl.GOperationResult<Interface.GAttachmentDto>>;
        removeAttachment(parentContent: GContent, attachment: Wfl.Interface.GAttachmentDto): JQueryPromise<any>;
        convertToPdf(parentContent: GContent, opts?: {
            ixp: string;
            guid: string;
        }): JQueryPromise<WebClient.GAttachmentConversionResultDto>;
        verifySignature(parentContent: GContent, opts?: {
            fileInfo: Interface.GAttachmentUploadDto;
        }): JQueryPromise<Interface.GOveritPodpisDto>;
        downloadAll?(parentContent: GContent, opts?: {
            ixp: string;
            includeMain?: boolean;
        }): JQueryPromise<Interface.GDownloadAllAttachmentsDto>;
        listTask?(parentContent: GContent, opts?: {
            ixp: string;
        }): Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<Interface.GAttachmentDto>>;
        capabilities?(): {
            [K in FunctionPropertyNames<Required<this>>]?: boolean;
        };
        destroy(): void;
    }
    /**
     * GIxsAttachmentDAO
     *
     * @author Vlastimil Máca
     * @since 484.2.0.919
     */
    class GIxsAttachmentDAO implements IGAttachmentDAO {
        private opts;
        constructor(opts: {
            ixs: string;
            islName?: string;
        });
        capabilities(): {
            list: boolean;
            listTask: boolean;
            removeAttachment: boolean;
            readMainAttachment: boolean;
            insert: boolean;
            downloadAll: boolean;
            convertToPdf: boolean;
            verifySignature: boolean;
        };
        removeAttachment(parentContent: GContent<IGContentBase, any>, attachment: Wfl.Interface.GAttachmentDto): JQueryPromise<any>;
        readMainAttachment(parentContent: GContent<IGContentBase, any>, opts?: {
            ixp: string;
        }): JQueryPromise<Interface.GAttachmentDto | null>;
        list(parentContent: GContent): JQuery.Promise<Interface.GAttachmentDto[], any, any>;
        listTask(parentContent: GContent): Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<Interface.GAttachmentDto>>;
        insert(parentContent: GContent, opts: any): JQueryPromise<Interface.GAttachmentDto | Isl.GOperationResult<Interface.GAttachmentDto> | null>;
        convertToPdf(parentContent: GContent, opts: any): JQueryPromise<WebClient.GAttachmentConversionResultDto>;
        verifySignature(parentContent: GContent, opts: any): JQueryPromise<Interface.GOveritPodpisDto>;
        downloadAll(parentContent: GContent, opts: {
            ixp: string;
            includeMain?: boolean;
        }): JQuery.PromiseBase<Interface.GDownloadAllAttachmentsDto, never, never, never, never, never, never, never, never, never, never, never>;
        destroy(): void;
    }
}
declare namespace Gordic.Wfl.WebClient.Attachments {
    /**
     * IGAttachmentDlgVisitor
     *
     * @author Vlastimil Máca
     * @since 484.2.0.919
     */
    interface IGAttachmentDlgVisitor {
        visit(content: IGIxsPrilohyDlg): void;
    }
    interface IGIxsAttachmentVisitorRemoveOptions {
        attachments: MetaRow<Interface.GAttachmentDto>[];
        customDialog?: ((dialogs: GDlgNamespace) => JQuery.Promise<any>) | null;
    }
    enum GIxsAttachmentVisitorEvents {
        remove = "remove",
        beforeRemove = "beforeremove",
        permissionsUpdated = "permissionsupdated"
    }
    class GIxsMainAttachmentVisitor implements IGAttachmentDlgVisitor {
        protected readonly eventNamespace = ".ixsmainattachment";
        protected _attachmentUploader: GAttachmentUploader;
        protected ixs: string;
        protected content: IGIxsPrilohyDlg & GContent;
        protected dao: IGAttachmentDAO;
        protected servicePermissions?: Wfl.Interface.GIxsAttachmentPermissions;
        constructor(opts: {
            ixs: string;
            dao: IGAttachmentDAO;
        });
        visit(content: IGIxsPrilohyDlg<Interface.GAttachmentDto> & GContent): void;
        protected registerActions(): void;
        protected getAttachmentUploader(): GAttachmentUploader;
        protected getMenuBar(): MenuParams[];
        protected uploadMainAttachment(): JQueryPromise<any>;
    }
    interface GIxsAttachmentVisitorOptions {
        ixs: string;
        dao: IGAttachmentDAO;
        previewTask?: string;
        downloaderType?: string;
        uploaderType?: string;
        readonly?: boolean;
    }
    /**
     * GIxsAttachmentVisitor
     *
     * @author Vlastimil Máca
     * @since 484.2.0.919
     */
    class GIxsAttachmentVisitor implements IGAttachmentDlgVisitor {
        protected readonly eventNamespace = ".ixsattachment";
        protected _attachmentUploader: GAttachmentUploader;
        protected downloaderType: string;
        protected uploaderType?: string;
        protected ixs: string;
        protected previewTask: string;
        protected content: IGIxsPrilohyDlg & GContent;
        protected dao: IGAttachmentDAO;
        protected servicePermissions?: Wfl.Interface.GIxsAttachmentPermissions;
        protected readonly: boolean;
        constructor(opts: GIxsAttachmentVisitorOptions);
        visit(content: IGIxsPrilohyDlg & GContent): void;
        protected registerActions(): void;
        protected getAttachmentUploader(): GAttachmentUploader | null;
        protected uploadAttachment(): JQueryPromise<any>;
        protected registerDropZone(element: JQuery<HTMLElement>): void;
        protected getView(): JQuery.Promise<Isl.View<any, Isl.GServiceListRequest, Isl.GServiceListResponse<Interface.GAttachmentDto>>, any, never>;
        protected getGridFormat(): Data.GridFormat<any>;
        protected updatePermissions(servicePermissions: Wfl.Interface.GIxsAttachmentPermissions): void;
        protected updateActions(selection?: MetaRow<Interface.GAttachmentDto>[]): void;
        protected getMenuBar(): MenuParams[];
        protected getContextMenu(cellContext: IGGridCellContext<Interface.GAttachmentDto>): MenuParams[];
        protected removeAttachment(attachments: MetaRow<Interface.GAttachmentDto>[]): JQueryPromise<any>;
        protected openAttachment(attachment: MetaRow<Interface.GAttachmentDto>): JQuery.Promise<any, any, any> | null;
        protected downloadAll(): JQuery.PromiseBase<never, any, never, never, never, never, never, never, never, never, never, never> | undefined;
    }
    interface GIxsAttachmentVersionsVisitorOptions {
        ixs: string;
        versionDialog?: string;
        previewTask?: string;
        downloaderType?: string;
        uploaderType?: string;
        readonly?: boolean;
    }
    class GIxsAttachmentVersionsVisitor implements IGAttachmentDlgVisitor {
        protected ixs: string;
        protected content: IGIxsPrilohyDlg & GContent;
        protected versionDialog: string;
        protected previewTask: string;
        protected downloaderType: string;
        protected uploaderType?: string;
        protected readonly eventNamespace = ".ixsattachmentversions";
        protected versionBadge?: GObservableObject<GBadgeOptions>;
        constructor(opts: GIxsAttachmentVersionsVisitorOptions);
        visit(content: IGIxsPrilohyDlg<Interface.GAttachmentDto> & GContent): void;
        protected openVersions(rowMeta?: MetaRow<Interface.GAttachmentDto>): JQuery.Promise<any, any, any>;
        protected registerActions(): void;
        protected updateActions(selection?: MetaRow<Interface.GAttachmentDto>[]): void;
        protected getMenuBar(): MenuParams[];
        protected getContextMenu(cellContext: IGGridCellContext<Interface.GAttachmentDto>): MenuParams[];
    }
}
declare namespace Gordic.Wfl.WebClient.Attachments.Utils {
    const addMenuParentId = "add";
    function createAddMenuParent(): MenuParams;
}
declare namespace Gordic.Wfl.WebClient.Attachments {
    /**
     * IGIxsPrilohyDlg<TDto
     *
     * @author Vlastimil Máca
     * @since 484.2.0.919
     */
    interface IGIxsPrilohyDlg<TDto extends Interface.GAttachmentDto = Interface.GAttachmentDto> {
        accept(visitor: IGAttachmentDlgVisitor): void;
        refresh(): void;
        setData(view: Data.View): any;
        getSelection(): MetaRow<TDto>[];
        attachmentEvents: GEvents;
    }
    enum GIxsPrilohyDlgEvents {
        createGrid = "creategrid",
        load = "load",
        countChange = "countchange",
        selection = "selection",
        defaultAction = "defaultaction",
        contextMenu = "contextmenu",
        enhanceGridFormat = "enhancegridformat",
        enhanceMenuBar = "enhancemenubar"
    }
    /**
     * GIxsPrilohyDlg
     *
     * @author Vlastimil Máca
     * @since 484.2.0.919
     */
    class GIxsPrilohyDlg extends GContentBase implements IGClientContent, IGIxsPrilohyDlg {
        inited: boolean;
        uid: string;
        private wrapper;
        private _menuBar?;
        private _isMaximalized?;
        private _fullscreen;
        attachmentEvents: GEvents;
        private attachmentsChangeFunc;
        prepareContent(opts: any): void;
        accept(attachmentVisitor: IGAttachmentDlgVisitor): void;
        init(): void;
        setData(newView: any): void;
        refresh(): void;
        buildMenu(): void;
        getSelection(): MetaRow<Interface.GAttachmentDto>[];
        maximizeMinimize(): void;
    }
}
declare namespace Gordic.Wfl.Dialogs {
    interface IxsPrilohyDialogInputParams {
        visitors: WebClient.Attachments.IGAttachmentDlgVisitor[];
    }
    function IxsPrilohyDialog(parentContent: GContent, opt: IxsPrilohyDialogInputParams, // Datový typ dle vstupních parametrů dialogu.
    modOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<unknown, any, any>;
}
declare namespace Gordic.Wfl.WebClient {
    class GAutorizovanaKonverzeZadost extends GContentBase {
        private retval;
        private previouslyPanel;
        private activePanel;
        private nextPanel;
        private nextStep;
        private main;
        private formVolby;
        private gridZadosti;
        private gridZadostiView;
        private currentRow;
        private DataZadosti;
        private Dto;
        /** Aby uživatel viděl ostatní žádosti nad tímto dokumentem */
        private seznamZadostiPanelVisible;
        private TypZvolOp;
        private TypZvolKonv;
        /**
         * GIN RAK - Způsob založení výstupu konverze do SSL
         * 0 - Nový dokument (Výstup bude založen jako nový dokument v SSL)
         * 1 - Napojení na vstup (Výstup bude napojen na kartu vstupního dokumentu jako konverze)
         * 2 - Možnost volby (Uživateli bude povolena volba obou způsobů)
         */
        private gin_rad_npjvst;
        onContentReady(): void;
        private init;
        private createWizard;
        private save;
        /** Autorizovaná konverze DTO funkčního místa */
        private ginsfunDto;
        private adminKonvState;
        private adminKonvPracName;
        private privateKonvPraName;
        private loadGinsfunDto;
        /** validační metoda primárně pro string hodnotu */
        private hasValue;
        private setInitKonvPracValue;
        private createFirstStep;
        private createSecondStep;
        private createThreeStep;
        private createFourStep;
        private createFiveStep;
        private setOkEnabled;
        private setNextEnabled;
        private setPreviouslyEnabled;
        private setNextPanel;
        private setPanel;
        /**
         * vytvoření seznamu příloh
         */
        private createFormPrilohyGrid;
        private prilohyCellChanged;
        private prilohyCreateGridFormat;
        private createFormVolbaPostupu;
        private typZadosti;
        private createFormSeznamZadosti;
        private createFormPanelPodrobnosti;
        private createFormVyberKonverzPracoviste;
        private setCaptionToActCompleteButton;
        /**
         * změna políčka selectboxu konverzního pracoviště
         */
        private funRakChanged;
        /**
         * vypnoutAutorizKonvDoAnalog - vypnutí autorizované konverze z digitálu do analogu (dle legislativy)
         */
        private vypnoutAutorizKonvDoAnalog;
        /** volba vstupu pro konverzi */
        private createFormVolbaVstupKonv;
        private createZadostGrid;
        private obcerstviVybrany;
        private formatZadostGrid;
        closing(): {
            stav: boolean;
        };
    }
    interface IGAutorizovanaKonverzeZadostRetval {
        /** rozhodující stav */
        stav: boolean;
    }
    /** Výčet zvolených typů konverze */
    enum TypZvoleneKonverze {
        /** Neurčeno */
        Neurceno = 0,
        /** Z listinného originálu do PDF */
        ListinnyOriginalDoPDF = 1,
        /** Z PDF originálu (el.obrazu) do listiny */
        PDFOriginalDoListiny = 2,
        /** Z listinné přílohy dokumentu do PDF */
        ListinnaPrilohaDoPDF = 3,
        /** Z elektronické přílohy PDF do listiny */
        PDFPrilohaDoListiny = 4,
        /** Převod z analogové do digitální formy */
        PrevodAnalogovehoOriginaluDoDigitalniPodoby = 5,
        /** Převod z digitální do analogové formy */
        PrevodDigitalnihoOriginaluDoAnalogovePodoby = 6,
        /** Převod z analogové do digitální formy */
        PrevodAnalogovePrilohyDoDigitalniPodoby = 7,
        /** Převod z digitální do analogové formy */
        PrevodDigitalniPrilohyDoAnalogovePodoby = 8,
        /** Změna datového formátu */
        ZmenaDatovehoFormatuOriginalu = 9,
        /** Změna datového formátu */
        ZmenaDatovehoFormatuPrilohy = 10
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IGZadostZmenaDatovyFormatRetval {
        /** mám provést refresh? */
        state: boolean;
    }
    /**
     * Žádost změny datového formátu
     *
     * @author thazmuka
     * @since 482.1.0.878
     */
    class GZadostZmenaDatovyFormat extends GContentBase {
        /** Varování ve flashi*/
        private ImgVarovani;
        private Pripona;
        private PriponaOriginalu;
        /** Typ zvolené konverze */
        private ZvolenaKonverze;
        /** Akce v menu - Stornovat (enabled) */
        private StornovatEnabled;
        /** Digitální forma (checked) */
        private DigitalForm;
        /** Digitální forma (enabled) */
        private DigitalFormEnabled;
        /** Příloha dokumentu (checked) */
        private AttachmentDoc;
        /** Příloha dokumentu (enabled) */
        private AttachmentDocEnabled;
        private Ixp;
        private TypAk;
        private Ixb;
        private IxsUlo;
        private NazevDok;
        private NazevEle;
        private IxsFunRak;
        private IxpRak;
        private PorCislo;
        private DuvodZmeny;
        private DatZmeny;
        /** počet žádostí */
        private Pocet;
        private PrilohyVNearchivnimFormatu;
        private SeznamPrilohPisemnostiJenPrilohy;
        FilterAktivita: any;
        FilterDlePovolenychFazi: any;
        FilterPridruzenaStrediska: any;
        /**
         * tlačítko pro uložení
         * default=false
         */
        private OkEnabled;
        /** element formuláře */
        private form;
        /** element seznamu */
        private grid;
        /** element gtabu */
        private gtab;
        /**
         * onContentReady
         */
        onContentReady(): void;
        private retval;
        closing(): IGZadostZmenaDatovyFormatRetval;
        private init;
        private setAfterEnabledActions;
        private createForm;
        private setDataToForm;
        private createGTabGrid;
        private createGrid;
        private createGridFormat;
        /**
         * vrať jména sloupců
         */
        private getNameOfColumns;
        private createMenubar;
        private stornovat;
        private createCommandbar;
        /** ixb ele obrazu */
        private EleIxb;
        private zmenaVstupu;
        private enabledActions;
        /** výběr přílohy při kliknutí na řádek seznamu */
        private vyberPrilohu;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IGCertInfo {
        /**
         * Otisk certifikátu
         * @type {string}
         */
        thumbprint: string;
        /**
         * Serial number certifikátu
         * @type {string}
         */
        serialNumber: string;
        /**
         * Typ certifikatu
         * @type {TypeOfCertificate}
         */
        typeCert: Gordic.General.ApplicationInterface.TypeOfCertificate;
        /**
         * chain certifikatu
         * @type {string[]}
         */
        certChain: Gordic.Security.Service.GCertificateChain;
        /**
         * Priznak, zda se ma zobrazit dialog primarne na zadani PINu
         * @type {boolean}
         */
        showPswdDlg: boolean;
        /**
        * Zadaný pin
        */
        otherPswd?: string;
        /** Informace o certifikátu */
        certMoreInfo: Gordic.Security.Service.GCertificateInfoDTO;
    }
    /**
     * Dto pro vrácení výsledku podepsání příloh
     *
     * @author pnovak
     * @since 482.1.0.54
     */
    interface IGAttachmentSignResult {
        /**
         * Úspěšně podepsané přílohy
         * @type {JQuery.Promise<any, IGReasonResponse>[]}
         */
        successAttachments?: JQuery.Promise<any, IGReasonResponse>[];
        /**
         * Neúspěšně podepsané přílohy
         * @type {JQuery.Promise<any, IGReasonResponse>[]}
         */
        unSuccessAttachments?: JQuery.Promise<any, IGReasonResponse>[];
    }
    interface IGConfigParams {
        /** content pro navázání */
        content?: GContent;
        /**
         * isHromadnaAkce
         * @type {boolean}
         */
        isBulkAction?: boolean;
        /**
         * isBulkActionEPK
         * @type {boolean}
         */
        isBulkActionEPK?: boolean;
        /**
         * vynutitKonverziDoPdfSUzivPotvrzenim - pouziva se v EPK
         * @type {boolean}
         */
        vynutitKonverziDoPdfSUzivPotvrzenim?: boolean;
        /**
         * kontrolovatAdministraciCertifikatu - EPK v ZadostSchvaleniCertPage nastavuje na false
         * @type {boolean}
         */
        kontrolovatAdministraciCertifikatu?: boolean;
        /**
         * pokracovatPriChybe - EPK nastavuje na false
         * @type {boolean}
         */
        continueAfterError?: boolean;
        /**
         * licAdr
         * @type {string}
         */
        licAdr?: string;
        /**
         * nonce
         * @type {number}
         */
        nonce?: number;
        /**
         * modifyFileInput - určeno k editaci souboru před samotným podepsáním
         */
        modifyFileInput?: boolean;
    }
    type TDistibuteSignatureDelegate = (signedConfig: GSignCreateConfig | null) => JQuery.Promise<boolean, IGReasonResponse>;
    type TOnSelectCertificateHandler = () => void;
    interface IGPodepisDokumentArgs<T extends IGCustomDto> extends IGPodepisPrilohyArgs<T> {
        signAttachments?: boolean;
        attachmentsWithTS?: boolean;
        isBulkAction?: boolean;
        ixb: string;
        porCislo: number;
    }
    interface IGPodepisPrilohyArgs<T extends IGCustomDto> {
        ixp: string;
        withTS: boolean;
        ixb?: string;
        porCislo?: number;
        convertToPDF: boolean;
        signNoPdfAttachment: boolean;
        customDto?: T;
        signatureType?: Gordic.Security.Service.SignatureType;
        otherFilesToSignIxbs?: string[];
        otherFilesToSign?: Gordic.Support.Sign.GFileToSign[];
        isFiction?: boolean;
        isArchiveFormat?: boolean;
        checkFormat?: boolean;
    }
    /**
     * Dto pro navrat z metody podepisDokument
     *
     * @author pnovak
     * @since 480.1.0.768
     */
    interface IGSignElInfo {
        /**
         * Konfigurace pro podepsani
         * @type {GSignCreateConfig}
         */
        elObrazConfig?: GSignCreateConfig;
        /**
         * pole nepodepsanych priloh
         * @type {GSignCreateConfig[]}
         */
        unSuccessAttachments: GSignCreateConfig[];
    }
    function GetLogFromConfig(config: Gordic.Wfl.Interface.GWflSignCreateConfig): Interface.GWflSignCreateConfig & {
        ContentSize?: number;
    };
    class GSgn {
        private _logger;
        get logger(): Diagnostics.GLog;
        private dontAskAgain?;
        private lastAnswer?;
        /**
         * Konfigurační parametry
         * @type {IGConfigParams}
         */
        private _configParams?;
        /**
         * Servisní content
         * @type {GContent}
         * @default new GContent("Gordic.Wfl.WebClient.GSignModule")
         */
        private _srvCnt?;
        /**
         * Servisní content
         * @type {GContent}
         * @default new GContent("Gordic.Wfl.WebClient.GSignModule")
         */
        private content?;
        /**
         * Servisní content
         * @type {()}
         * @default > GContent = () => { return new GContent("Gordic.Wfl.WebClient.GSignModule") }
         */
        private get _serviceCnt();
        /**
         * Servisní content
         * @type {GContent}
         * @default new GContent("Gordic.Wfl.WebClient.GSignModule")
         */
        private _attachmentSrvCnt?;
        private get attachmentServiceCnt();
        /**
         * Certifikát
         * @type {string}
         * @default ""
         */
        gSgnCertThumbprint: string;
        /**
         * initPromise - promise pro načtení inicializacnich dat ze serveru
         * @type {JQueryPromise<void>}
         */
        initPromise: JQuery.Promise<void, IGReasonResponse>;
        /**
         * ePKProcessedFilesInfo
         * @type {string[]}
         */
        private ePKProcessedFilesInfo?;
        /**
         * ePKProcessFinalized
         * @type {boolean}
         */
        private ePKProcessFinalized?;
        /**
         * Nový podepisovací modul
         * @type {NewSigner}
         */
        private newSigner?;
        clientSigner?: GWflClientSigner;
        byteSigner?: GByteSigner;
        /**
         * Databázové parametry
         * @type {TParams}
         */
        private params?;
        /**
         * Důvod podpisu - identifikátor
         * @type {string}
         */
        private ixsDpo?;
        private distributeSignatureDelegate?;
        /**
         * constructor
         *
         * @param {IGConfigParams} configParams Konfigurační parametry
         * @param {TBeforeSelectCertHandler} beforeSelectCertDelegate Delegát volaný před výběrem certifikátu
         * @param {TChooseCertificateDelegate} [chooseCertDelegate] Delegát pro výběr certifikátu
         * @param {TBeforePrepareConfigDelegate} [beforePrepareConfigDelegate] Delegát volaný před přípravou konfiguračního podepisovacího objektu
         * @param {TModifyPreparedConfigDelegate} [modifyPreparedConfigDelegate] Delegát volaný po priprave konfiguračního podepisovacího objektu
         */
        constructor(options: {
            configParams: IGConfigParams;
            beforeCertDelegate: TBeforeSelectCertHandler;
            chooseCertDelegate?: TChooseCertificateDelegate;
            beforePrepareConfigDelegate?: TBeforePrepareConfigDelegate;
            distributeSignatureDelegate?: TDistibuteSignatureDelegate;
            modifyPreparedConfigDelegate?: TModifyPreparedConfigDelegate;
            content?: GContent;
        });
        static budeSeCasoveRazitkovatDleDBParamStatic(opt: {
            isPriloha: boolean;
            ginEleCrazPrPar: number;
            ginEleCrazObPar: number;
        }): JQuery.Promise<boolean, IGReasonResponse, any>;
        /**
         * Podle hodnoty db parametru a pripadne i uzivatelskeho vstupu zjisti, zda se bude razitkovat
         * @param {boolean} isPriloha u el. obrazu false, u prilohy true
         * @returns {JQueryPromise<boolean>} Výsledek, zda se bude razítkovat
         */
        budeSeCasoveRazitkovatDleDBParam(isPriloha: boolean): JQuery.Promise<boolean, IGReasonResponse>;
        /**
         * Podepise el. obraz dokumentu
         * @param {string} ixp Ixp dokumentu
         * @param {string} ixb Ixb dokumentu
         * @param {number} porCislo Pořadové číslo přílohy
         * @param {boolean} withTS Priznak, zda se ma vytvorit casove razitko u el. obrazu
         * @param {boolean} signNoPdf Priznak, zda podepsat soubor el. obrazu, ktery neni PDF
         * @param {boolean} convertToPDF NePdf soubory pred podpisem zkonvertuje do PDF
         * @param {ObjectLiteral<Primitive>} customDto Uzivatelske dto, které ovlivní postup podpisu
         * @returns {JQueryPromise<any>} Výsledek podepsání
         */
        podepisElObraz<T extends IGCustomDto>(args: IGPodepisDokumentArgs<T>): JQuery.Promise<any, IGReasonResponse>;
        /**
         * Uložení podepsaného konfigu na server
         * @param {any} signedDto Podepsany konfig
         * @param {Gordic.Wfl.Client.GWflSignPreConfigDto} prepConfig Konfigurace s nastavenymi informacemi o pozadovanem podpisu, slouzi pro ex. razitko
         * @returns {JQueryPromise<void>} Promise s indikací, jestli došlo k uložení
         */
        private saveSignedConfig;
        /**
         * Podepise dokument - el. obraz i prilohy
         * @param {string} ixp Ixp dokumentu
         * @param {string} ixb Ixb dokumentu
         * @param {number} porCislo Pořadové číslo přílohy
         * @param {boolean} signAttachments Zda se maji podepsat i el. prilohy dokumentu
         * @param {boolean} withTS Priznak, zda se ma vytvorit casove razitko u el. obrazu
         * @param {boolean} attachmentsWithTS Priznak, zda se ma vytvorit casove razitko u priloh
         * @param {boolean} signNoPdfAttachment Priznak, zda podepsat soubory el. priloh, ktere nejsou PDF
         * @param {boolean} convertToPDF NePdf soubory pred podpisem zkonvertuje do PDF
         * @param {boolean} isBulkAction Priznak, zda se jedna o hromadnou akci nad vice dokumenty
         * @param {TSignOnCompleteHandler} onComplete CallBack funkce vyvolana po provedeni. V argumentech ma anonymni tridu s vlastnostmi retVal a errorText
         */
        podepisDokument<T extends IGCustomDto>(args: IGPodepisDokumentArgs<T>): JQuery.Promise<IGSignElInfo, IGReasonResponse>;
        /**
         * Podepsání souboru - náhrada za signNoPdf, signMail, klientské podepsání
         * @param {Gordic.General.ApplicationInterface.GSignMinimumConfig} signConfig Minimální konfigurace podpisu
         * @returns {JQueryPromise<GSignCreateConfig>} Výsledná podepsaná konfigurace
         */
        signFile(signConfig: Gordic.Security.Service.GSignMinimumConfig): JQuery.Promise<GSignCreateConfig, IGReasonResponse>;
        checkFormat(checkFormat: boolean, isArchiveFormat: boolean): JQuery.Promise<boolean, IGReasonResponse, any>;
        /**
         * Metoda pro podepsaní přílohy
         *
         * @param {string} ixb Ixb přílohy
         * @param {string} ixp Ixp přílohy
         * @param {number} porCislo Pořadové číslo přílohy
         * @param {number} version Verze přílohy
         * @param {boolean} withTS casove razitko
         * @param {boolean} signNoPdf podpis nePDF souboru
         * @param {boolean} convertToPDF Provede se konverze souboru do PDF
         * @param {TSignOnCompleteHandler} onComplete CallBack funkce vyvolana po provedeni. V argumentech ma anonymni tridu s vlastnostmi retVal a errorText
         */
        podepisPrilohu<T extends IGCustomDto>(args: IGPodepisPrilohyArgs<T>): JQuery.Promise<void, IGReasonResponse>;
        /**
         * Podepise vsechny prilohy dokumentu
         * @param {string} ixp Ixp dokumentu
         * @param {boolean} withTS Priznak, zda se ma vytvorit casove razitko
         * @param {boolean} signNoPdf  Priznak, zda podepsat soubor, ktery neni PDF
         * @param {boolean} convertToPDF NePdf soubory pred podpisem zkonvertuje do PDF
         * @param {TSignOnCompleteHandler} onComplete CallBack funkce vyvolana po provedeni. V argumentech ma anonymni tridu s vlastnostmi retVal a errorText.
         */
        podepisPrilohy<T extends IGCustomDto>(args: IGPodepisPrilohyArgs<T>): JQuery.Promise<JQuery.Promise<any, IGReasonResponse>[], IGReasonResponse>;
        private signAttachmnents;
        selectCertificate<T extends IGCustomDto>(customDto?: T): JQuery.Promise<CertInfo, IGReasonResponse>;
        private elObrazFileNameWithConversionOnSucceeded;
        /**
         * Metoda po úspěšném načtení názvu elektronického obrazu
         * @param {string} fileName Název souboru
         */
        private elObrazFileNameOnSucceeded;
        /**
         * Potvrzení pokračování
         * @param {string} ErrMessage
         */
        private confirmContinue;
        private setProcessedFilesInfo;
        private processExitScript;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IGWflSigSelectInput {
        data?: {
            ixp: string;
            ixb?: string;
            verze?: number;
            porCislo?: number;
            source?: Wfl.Interface.GWflFilePreviewSource;
            signCreateConfig: Wfl.Interface.GWflSignCreateConfig;
        };
        filePreviewLoadOptions?: IGFilePreviewLoadOptions;
        sigSelectOptions?: Pick<Gin.WebClient.IGSigSelectOptions, "drawingStyle">;
    }
    class GWflSignPlacing extends GContentBase implements IGClientContent {
        uid: string;
        title: string;
        private isSaved;
        private currentSignConfig?;
        prepareContent(inputDto: IGWflSigSelectInput): void;
        closing(retVal: any): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface IGGByteSignerOptions extends IGGWflSignerOptions {
        completeSignDelegate?: TCompleteSignDelegate;
    }
    type TCompleteSignDelegate = (configDto: GSignCreateConfig & {
        CertChain?: Gordic.Security.Service.GCertificateChain | null;
        SaveToStorage?: boolean | null;
        SignWithServerCert: boolean;
    }, fileID: string) => JQueryPromise<any>;
    /**
     * Podepisovací objekt určený pro podepsani dat ze serveru (ulozene v temp adresari)
     * @author pnovak
     * @since 480.1.0.781
     */
    class GByteSigner extends WflSigner {
        private _byteSignerLogger;
        get byteSignerLogger(): Diagnostics.GLog;
        protected certSettings: any;
        protected completeSignDelegate?: TCompleteSignDelegate;
        constructor(options?: IGGByteSignerOptions);
        sign<T extends IGCustomDto>(signingConfig: Gordic.Wfl.Client.GSignPreConfigWithTypeOfCertDto, customDto?: T): JQuery.Promise<any, IGReasonResponse>;
    }
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty {
    interface IGSouvisejiciDokumentyOpts {
        tabs?: (IGSouvisejiciTab | ((content: GContent) => JQueryPromise<IGSouvisejiciTab>))[];
        ixp: string;
    }
    class SouvisejiciDokumentyMain extends GContentBase implements IGClientContent, IGSouvisejiciDokumentyOpts {
        uid: string;
        tabs?: (IGSouvisejiciTab | ((content: GContent) => JQueryPromise<IGSouvisejiciTab>))[];
        toFocus?: string;
        ixp: string;
        origTitle?: string;
        private menuMap;
        private panelMap;
        private lastOpenedPanelMap;
        private refreshMap;
        private currentId?;
        private dosloKeZmene;
        prepareContent(opts: any): void;
        private processTabs;
        private refresh;
        closing(): JQuery.Promise<any, any, any>;
        private render;
        private applyTabsMenuBar;
        private applyTabsPanels;
        private createGroups;
    }
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty {
    interface IGSouvisejiciTab {
        caption: string;
        tooltip?: string;
        content: new () => IGSouvisejiciTabCnt;
        id: string;
    }
    interface IGSouvisejiciTabCnt {
        ixp: string;
        refresh: (ctx?: {
            row?: any;
        }) => JQuery.Promise<any>;
        opened?: () => void;
    }
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty {
    class SouvisejiciActiveTab extends GContentBase implements IGClientContent, IGSouvisejiciTabCnt {
        uid: string;
        ixp: string;
        typ_ag: number;
        ixs_fun: string;
        permissions?: Interface.GSouvisejiciDocumentyPermissions;
        prepareContent(): void;
        refresh(): JQueryPromise<void>;
        updateActions(row: any): void;
        getMenuBar(): MenuParams[];
        getColumns(): Data.GridFormat<any>;
    }
    namespace Catalogue {
        function active(): IGSouvisejiciTab;
    }
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty {
    class SouvisejiciAllTab extends GContentBase implements IGClientContent, IGSouvisejiciTabCnt {
        uid: string;
        ixp: string;
        typ_ag: number;
        ixs_fun: string;
        permissions?: Interface.GSouvisejiciDocumentyPermissions;
        prepareContent(): void;
        updateActions(row: any): void;
        refresh(): JQueryPromise<void>;
        getMenuBar(): MenuParams[];
        getColumns(): Data.GridFormat<any>;
    }
    namespace Catalogue {
        function all(): IGSouvisejiciTab;
    }
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty.Common {
    namespace Actions {
        function createDefaultActions(gridElement: JQuery): GAction[];
        function createDefaultMenuBar(): string[];
        function updateActions(actions: GActionList, row: Interface.GSeznamSouvisejicichDokumentuDto, permissions?: Interface.GSouvisejiciDocumentyPermissions): void;
        function New(ixp: string): GActionParams;
        function Detail(gridElement: JQuery): GActionParams;
        function DetailAgenda(gridElement: JQuery): GActionParams;
        function PoznamkaKVazbe(gridElement: JQuery): GActionParams;
        function OpenSouvis(gridElement: JQuery): GActionParams;
        function OznacEpk(gridElement: JQuery): GActionParams;
        function ZmenitAktivitu(gridElement: JQuery): GActionParams;
        function Odstranit(gridElement: JQuery): GActionParams;
        function ZmenitVazbu(gridElement: JQuery): GActionParams;
        function ZmenitTypVazby(gridElement: JQuery): GActionParams;
    }
    namespace Sidepanels {
        function Souvisejici(opts: {
            souvisOpts: {
                title?: string;
                ixp: string;
                tabs: any[];
            };
            previewOptions?: Partial<Previews.GPreviewControllerOptions>;
            panelOptions?: Partial<GSideBarPanelOptions>;
            tabOptions?: Partial<GPreviewItemOptions>;
        }): Previews.GPreviewPanelController<any>;
        function Souhrn(opts?: {
            previewOptions?: Partial<Previews.GPreviewControllerOptions>;
            panelOptions?: Partial<GSideBarPanelOptions>;
            tabOptions?: Partial<GPreviewItemOptions>;
        }): Previews.GPreviewPanelController<any>;
        function Nahled(opts?: {
            previewOptions?: Partial<Previews.GPreviewControllerOptions>;
            panelOptions?: Partial<GSideBarPanelOptions>;
            tabOptions?: Partial<GPreviewItemOptions>;
        }): Previews.GPreviewPanelController<any>;
    }
    namespace PreviewTabs {
        function Souhrn(opts?: {
            tabOptions?: Partial<GPreviewItemOptions>;
        }): {
            caption: string;
            content: string;
        } & Partial<GPreviewItemOptions<any>>;
        function Nahled(opts?: {
            tabOptions?: Partial<GPreviewItemOptions>;
        }): GPreviewItemOptions<any> & Partial<GPreviewItemOptions<any>>;
    }
    namespace PanelTemplates {
        function all(contentElement: JQuery): (it: Interface.GSeznamSouvisejicichDokumentuDto) => JQuery<HTMLElement>;
    }
    namespace GridFormats {
        function all(opts: {
            ixs_fun?: string;
            typ_ag?: number;
            allowEpk?: boolean;
        }): Data.GridFormat<any>;
    }
    namespace Panels {
    }
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty {
    class SouvisejiciDotcenySubjektTab extends GContentBase implements IGClientContent, IGSouvisejiciTabCnt {
        uid: string;
        ixp: string;
        typ_ag: number;
        ixs_fun: string;
        permissions?: Interface.GSouvisejiciDocumentyPermissions;
        prepareContent(): void;
        updateActions(row: any): void;
        refresh(): JQueryPromise<void>;
        getMenuBar(): MenuParams[];
        getColumns(): Data.GridFormat<any>;
    }
    namespace Catalogue {
        function dotcenySubj(): IGSouvisejiciTab;
    }
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty {
    class SouvisejiciOdesilatelTab extends GContentBase implements IGClientContent, IGSouvisejiciTabCnt {
        uid: string;
        ixp: string;
        typ_ag: number;
        ixs_fun: string;
        permissions?: Interface.GSouvisejiciDocumentyPermissions;
        prepareContent(): void;
        updateActions(row: any): void;
        refresh(): JQueryPromise<void>;
        getMenuBar(): MenuParams[];
        getColumns(): Data.GridFormat<any>;
    }
    namespace Catalogue {
        function odesilatel(): IGSouvisejiciTab;
    }
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty {
    class SouvisejiciSidebarTab extends GContentBase implements IGClientContent, IGSouvisejiciDokumentyOpts {
        uid: string;
        tabs: IGSouvisejiciTab[];
        toFocus?: string;
        ixp: string;
        origTitle?: string;
        private currentId?;
        prepareContent(opts: any): void;
        private render;
        loadData(ixp: any): JQueryPromise<Data.View<Interface.GSeznamSouvisejicichDokumentuDto>>;
        private applyMenuBar;
    }
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty {
    class SouvisejiciSpisyPevneDleNsTab extends GContentBase implements IGClientContent, IGSouvisejiciTabCnt {
        uid: string;
        ixp: string;
        typ_ag: number;
        ixs_fun: string;
        cjText: string;
        permissions?: Interface.GSouvisejiciDocumentyPermissions;
        prepareContent(): void;
        updateActions(row: any): void;
        refresh(): JQueryPromise<void>;
        getMenuBar(): MenuParams[];
        getColumns(cjText: any): Data.GridFormat<any>;
    }
    namespace Catalogue {
        function spisyPevneDleNs(): (content: any) => JQuery.Promise<IGSouvisejiciTab>;
    }
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty {
    class SouvisejiciSpisyTab extends GContentBase implements IGClientContent, IGSouvisejiciTabCnt {
        uid: string;
        ixp: string;
        typ_ag: number;
        ixs_fun: string;
        cjText: string;
        permissions?: Interface.GSouvisejiciDocumentyPermissions;
        prepareContent(): void;
        refresh(): JQueryPromise<void>;
        updateActions(row: any): void;
        getMenuBar(): MenuParams[];
        getColumns(cjText: any): Data.GridFormat<any>;
    }
    namespace Catalogue {
        function spisy(): (content: any) => JQuery.Promise<IGSouvisejiciTab>;
    }
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty {
    type TreeRow = Interface.GSeznamSouvisejicichDokumentuDto & {
        key?: string;
        parentKey?: string;
        isInCycle?: boolean;
    };
    export class SouvisejiciTreeTab extends GContentBase implements IGClientContent, IGSouvisejiciTabCnt {
        uid: string;
        ixp: string;
        typ_ag: number;
        ixs_fun: string;
        permissions?: Interface.GSouvisejiciDocumentyPermissions;
        count: number;
        prepareContent(): void;
        updateActions(row: any): void;
        refresh(ctx?: {
            row?: TreeRow;
        }): JQuery.Promise<any, any, any>;
        getMenuBar(): MenuParams[];
        getColumns(): Data.GridFormat<any>;
    }
    export namespace Catalogue {
        function tree(): IGSouvisejiciTab;
    }
    export {};
}
declare namespace Gordic.Wfl.WebClient.SouvisejiciDokumenty {
    class SouvisejiciVygenerovaneUkolyTab extends GContentBase implements IGClientContent, IGSouvisejiciTabCnt {
        uid: string;
        ixp: string;
        typ_ag: number;
        ixs_fun: string;
        permissions?: Interface.GSouvisejiciDocumentyPermissions;
        prepareContent(): void;
        updateActions(row: any): void;
        refresh(): JQueryPromise<void>;
        getMenuBar(): MenuParams[];
        getColumns(): Data.GridFormat<any>;
    }
    namespace Catalogue {
        function ukoly(): IGSouvisejiciTab;
    }
}
declare namespace Gordic.Wfl.DialogAC {
    class EditaceZasilkyDlg extends GContentBase {
        model: Wfl.Interface.GEditaceZasilkyDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Vstupní parametry dialogu informací o datové zprávě z ISDS.
     *
     * @author  TFeik
     * @date    23.10.2019
     * @since   482.1.0.881
     */
    interface GDatovaZpravaIsdsInfoDlgInputParams {
        /**
         * Identifikátor datové zprávy.
         * @type {string}
         */
        IdDatoveZpravy: string;
        /**
         * Identifikátor datové schránky.
         * @type {string}
         */
        IdDatoveSchranky: string;
        /**
         * Ixp
         * @type {string}
         */
        Ixp?: string;
        /**
         * (Default: true) Povolení tisku doručenky.
         * @type {boolean}
         * @default true
         */
        PovolitTiskDorucenky?: boolean;
        /**
         * Identifikátor zásilky.
         * Nutné pro zobrazení doručenky.
         * @type {string}
         */
        SxsZasilky: string;
    }
    /**
     * Návratová hodnota dialogu informací o datové zprávě z ISDS..
     *
     * @author  TFeik
     * @since   482.1.0.881
     * @date    23.10.2019
     */
    interface GDatovaZpravaIsdsInfoDlgReturnValue {
        /**
         * Příznak, zda na dialogu došlo k uložení.
         * @type {boolean}
         */
        IsSaved?: boolean;
        /**
         * Informace o datové zprávě z ISDS.
         * @type {Interface.GDatovaZpravaDto}
         */
        DatovaZprava?: Interface.GDatovaZpravaDto;
    }
    /**
     * Dialog informací o datové zprávě z ISDS.
     *
     * @author  TFeik
     * @since   482.1.0.881
     * @date    23.10.2019
     */
    class GDatovaZpravaIsdsInfoDlg extends GContentBase {
        /**
         * Identifikátor datové zprávy.
         * @type {string}
         */
        private readonly IdDatoveZpravy;
        /**
         * Identifikátor datové schránky.
         * @type {string}
         */
        private readonly IdDatoveSchranky;
        /**
         * Ixp
         * @type {string}
         */
        private readonly Ixp?;
        /**
         * (Default: true) Povolení tisku doručenky.
         * @type {boolean}
         * @default true
         */
        private readonly PovolitTiskDorucenky;
        /**
         * Informace o datové zprávě z ISDS.
         * @type {Isl.GServiceReadResponse<Interface.GDatovaZpravaDto>}
         */
        private readonly DatovaZpravaResponse;
        /**
         * TiskDorucenkyX0009
         * @type {string}
         */
        private readonly TiskDorucenkyX0009;
        /**
         * Identifikátor zásilky.
         * Nutné pro zobrazení doručenky.
         * @type {string}
         */
        private readonly SxsZasilky?;
        /**
         * Validators
         * @type {object | null}
         */
        private readonly Validators?;
        /**
         * Pomocné informace o datové zprávě z ISDS sloužící pro uložení hodnot, které nejsou uloženy v políčkách (pracují s ní funkce Set/GetData).
         * @type Interface.GDatovaZpravaDto
         */
        private DatovaZpravaTemp;
        /**
         * Příznak, zda na dialogu došlo k uložení.
         * @type {boolean}
         * @default false
         */
        private IsSaved;
        /**
         * $Form
         * @type {JQuery<HTMLElement>}
         */
        private $Form?;
        /**
         * $Grid
         * @type {JQuery<HTMLElement>}
         */
        private $Grid?;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    23.10.2019
         */
        onContentReady(): void;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    29.10.2019
         */
        private CreateMenu;
        /**
         * Nastaví enabled / disabled na akcích a políčkách.
         *
         * @author  TFeik
         * @date    29.10.2019
         *
         * @param {Interface.GDatovaZpravaPermissionDto} permissions
         * @param {any}
         */
        private EnableFieldsAndActions;
        /**
         * Vytvoří formulář.
         *
         * @author  TFeik
         * @date    29.10.2019
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @param {Data.IGStorage} userSettings
         * @returns {JQuery<HTMLElement>}
         */
        private static CreateForm;
        /**
         * Vytvoří grid.
         *
         * @author  TFeik
         * @date    29.10.2019
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @returns {JQuery<HTMLElement>}
         */
        static CreateGrid(appendTo: JQuery<HTMLElement>): JQuery<HTMLElement>;
        /**
         * Nastaví hodnoty o datové zprávě (formulář, status bar, grid, temp).
         *
         * @author  TFeik
         * @date    29.10.2019
         *
         * @param {Interface.GDatovaZpravaDto} data
         */
        private SetData;
        /**
         * Vrátí informace o datové zprávě (z políčka a tempu).
         *
         * @author  TFeik
         * @date    29.10.2019
         *
         * @returns {Interface.GDatovaZpravaDto}
         */
        private GetData;
        /**
         * closing
         *
         * @author  TFeik
         * @date    23.10.2019
         *
         * @returns {JQuery.Promise<GDatovaZpravaIsdsInfoDlgReturnValue>}
         */
        private closing;
        /**
         * Zkontroluje, zda jsou vstupní parametry dialogu validní a půjde otevřít.
         *
         * @author  TFeik
         * @date    29.10.2019
         *
         * @param {GDatovaZpravaIsdsInfoDlgInputParams} [inputParams]
         * @returns {boolean | Gui.Dialogs.OpenDialogRejectType}
         */
        static IsValid(inputParams: GDatovaZpravaIsdsInfoDlgInputParams | null | undefined): boolean | Gui.Dialogs.OpenDialogRejectType;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Vstupní parametry dialogu detailu zásilky.
     *
     * @author TFeik
     * @date   26.11.2018
     * @since 480.1.0.714
     */
    interface GDetailZasilkyDlgInputParams {
        /**
         * Sxs
         * @type {string}
         */
        Sxs: string;
        /**
         * EditMode (default = false).
         * @type {boolean}
         */
        EditMode?: boolean;
        /**
         * Grid - seznam zásilek pro posun šipkami na předchozí/následující řádek.
         * @type {JQuery<HTMLElement>}
         */
        Grid?: JQuery<HTMLElement>;
    }
    /**
     * Návratová hodnota dialogu detailu zásilky.
     *
     * @author TFeik
     * @date   26.11.2018
     * @since 480.1.0.714
     */
    interface GDetailZasilkyDlgReturnValue {
        /**
         * Příznak, zda na dialogu došlo k uložení zásilky.
         * @type {boolean}
         */
        isSaved?: boolean;
        /**
         * Data zásilky.
         * @type {Interface.GZasilkaDto}
         */
        zasilka?: Interface.GZasilkaDto;
    }
    /**
     * Interface dat gridu, po kterém je možné přesouvat se pomocí šipek na detailu.
     *
     * @author  TFeik
     * @date    08.07.2019
     * @since   482.1.0.520
     */
    interface GDetailZasilkyDlgListSupportData {
        sxs?: string;
        Sxs?: string;
        esu_txt?: string;
    }
    /**
     * GDetailZasilkyDlg
     *
     * @author TFeik
     * @since 480.1.0.286
     */
    class GDetailZasilkyDlg extends GContentBase implements DetailBuilderComponents.GWflDetailZasilkyComponentContentRequirements, DetailBuilderComponents.GWflDetailZasilkyEmailComponentContentRequirements {
        readonly EditMode?: boolean;
        readonly Zasilka?: GDetailZasilkyDto;
        IsSaved: boolean;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    17.07.2018
         */
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(this: GDetailZasilkyDlg & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<GDetailZasilkyDlgListSupportData> & DetailBuilderComponents.GWflDetailZasilkyComponentContentExtensions & DetailBuilderComponents.GWflDetailZasilkyEmailComponentContentExtensions, builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private _getListControlsSettings;
        /**
         * closing
         *
         * @author  TFeik
         * @date    17.07.2018
         *
         * @returns {JQuery.Promise<GDetailZasilkyDlgReturnValue>}
         */
        private closing;
        /**
         * Zkontroluje, zda jsou vstupní parametry dialogu validní a půjde otevřít.
         *
         * @author  TFeik
         * @date    05.11.2019
         *
         * @param {GDetailZasilkyDlgInputParams} [inputParams]
         * @returns {boolean | Gui.Dialogs.OpenDialogRejectType}
         */
        static IsValid(inputParams: GDetailZasilkyDlgInputParams | null | undefined): boolean | Gui.Dialogs.OpenDialogRejectType;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * GDetailZasilkyHandler
     *
     * @author TFeik
     * @since 480.1.0.37
     */
    class GDetailZasilkyHandler extends GContentBase {
        /**
         * GetServer
         *
         * @author TFeik
         * @date    30.08.2018
         */
        static GetServer(parentContent: GContent | null | undefined): GContent;
        /**
         * Uloží detail zásilky.
         *
         * @author TFeik
         * @date   11.10.2018
         *
         * @param {GContent} parentContent Content, na kterém budou zobrazeny message ohledně stavu uložení zásilky.
         * @param {GOpravDataZasilkyDto} zasilka Data zásilky.
         * @param {[boolean]} povolitZmenuZpDorNaEl
         * @param {[JQuery<HTMLElement>]} fields Políčka, na které budou aplikovány výsledky validace.
         * @param {[Omit<GFlashOptions]} flashOptions Nastavení flashpanelu.
         * @returns JQueryPromise<SaveDetailZasilkyReturnValue>
         */
        static SaveDetailZasilky(parentContent: GContent, zasilka: GOpravDataZasilkyDto, povolitZmenuZpDorNaEl?: boolean, fields?: JQuery<HTMLElement>, flashOptions?: GOmit<GFlashOptions, ("label" | "state")>): JQueryPromise<SaveDetailZasilkyReturnValue>;
        static StornujZasilku(parentContent: GContent, zasilka: GStornujZasilkuDto): JQueryPromise<Gin.WebClient.GBaseReturnDto<GDetailZasilkyDto>>;
        private static isZastupnaOsoba;
        /**
         * SaveZasilkovaAdresakEsu
         *
         * @author  TFeik
         * @date    11.09.2018
         *
         * @param {GUlozitAdresuKEsuDto} adresa
         * @param {GContent} parentContent
         * @returns {JQueryPromise<IGOdeslaniBaseReturnObejct<undefined>>}
         */
        static SaveZasilkovaAdresakEsu(adresa: GUlozitAdresuKEsuDto, parentContent: GContent): JQueryPromise<IGOdeslaniBaseReturnObejct<undefined>>;
        /**
         * Vytvoří sloupce gridu seznamu souboru emailu.
         *
         * @author TFeik
         * @date    01.10.2018
         *
         * @returns {Gordic.Data.GridFormat<WebClient.GPrilohaEmailuDto>}
         */
        private static CreatePrilohyEmailuGridColumns;
        /**
         * Vytvoří grid priloh emailu zasilky.
         *
         * @author TFeik
         * @date    01.10.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {{ name?: string }} [gridOpt] Options gridu.
         * @returns {JQuery<HTMLElement>}
         */
        static CreatePrilohyEmailuGrid(appentTo: JQuery<HTMLElement>, gridOpt?: GGridOptions<WebClient.GPrilohaEmailuDto>): JQuery<HTMLElement>;
        /**
         * GenerujIdDorucenky
         *
         * @author TFeik
         * @date    03.10.2018
         *
         * @returns {JQueryPromise<string>}
         */
        static GenerujIdDorucenky(parentContent: GContent): JQueryPromise<string>;
        /**
         * Vytvoří sloupce gridu seznamu souboru emailu.
         *
         * @author  TFeik
         * @date    04.10.2018
         *
         * @returns {Gordic.Data.GridFormat<Interface.GZasilkyListDto>}
         */
        private static CreateVnoreneZasilkyGridColumns;
        /**
         * Vytvoří grid priloh emailu zasilky.
         *
         * @author TFeik
         * @date    04.10.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {GGridOptions<GVnorenaZasilkaDto>} [gridOpt] Options gridu.
         * @returns {JQuery<HTMLElement>}
         */
        static CreateVnoreneZasilkyGrid(appentTo: JQuery<HTMLElement>, gridOpt?: GGridOptions<Interface.GZasilkyListDto>): JQuery<HTMLElement>;
        /**
         * Uloží ixb jako doručenku k zásilce případně pomocí ní nahradí starou.
         *
         * @author  TFeik
         * @date    22.11.2018
         *
         * @param {ZmenDorucenkuZasilkyInputParams} params
         * @returns {JQueryPromise<Gin.WebClient.GBaseReturnDto<string>>}
         */
        static ZmenDorucenkuZasilky(parentContent: GContent, params: ZmenDorucenkuZasilkyInputParams): JQueryPromise<Gin.WebClient.GBaseReturnDto<string>>;
        /**
         * Zobrazí dialog pro výběr souboru a uloží jej jako doručenku k zásilce.
         *
         * @param {Gin.Dialogs.OpenDialogParams<VlozDorucenkuKZasilkceInputParams>} params
         * @returns {JQuery.Promise<}
         */
        static VlozDorucenkuKZasilkce(params: Gordic.Gui.Dialogs.OpenDialogParams<VlozDorucenkuKZasilkceInputParams>): JQuery.Promise<{
            ixbSaved?: boolean;
            ixbNew?: string;
        }>;
        /**
         * Odstraní neplatnou doručenku zásilky.
         *
         * @author  TFeik
         * @date    20.06.2025
         *
         * @param {VymazDorucenkuZasilkyInputParams} params
         * @returns {JQueryPromise<string>}
         */
        static VymazDorucenkuZasilky(parentContent: GContent, params: VymazDorucenkuZasilkyInputParams): JQueryPromise<string>;
        /**
         * HledatZasilky
         *
         * @author  TFeik
         * @date    28.11.2018
         *
         * @param {Hledani.GHledaniZasilekDto} dto
         * @returns {JQuery.Promise<Interface.GZasilkyListDto[]>}
         */
        static HledatZasilky(parentContent: GContent, dto: Interface.Hledani.GHledaniZasilekDto): JQuery.Promise<Interface.GZasilkyListDto[]>;
        /**
         * Vrátí objekt pro logování Esu nastavený na hledání.
         *
         * @author  TFeik
         * @date    30.11.2018
         *
         * @returns {JQuery.Promise<Gin.Globals.Dialogs.IGLogovani>}
         */
        static GetLogovaniEsuProHledani(parentContent: GContent): JQuery.Promise<Gin.Globals.Dialogs.IGLogovani>;
        /**
         * Vrátí příznak, zda identifikátor zásilky může být libovolný text (nejenom ixs).
         *
         * @author  TFeik
         * @date    28.03.2022
         *
         * @returns {JQuery.Promise<boolean | undefined | null>}
         */
        static IsCustomId(parentContent: GContent): JQuery.Promise<boolean | undefined | null>;
        /**
         * Vrátí iconu dle způsobu doručení zásilky.
         *
         * @author  TFeik
         * @date    18.09.2019
         *
         * @param {Ginis.DbModel.GWflczpdEnum} [zpusobDoruceni]
         * @returns {IconTemplate}
         */
        static GetZpusobDoruceniIcon(zpusobDoruceni?: Ginis.DbModel.GWflczpdEnum): IconTemplate;
        /**
         * OtevriDorucenku
         *
         * @author  TFeik
         * @date    30.10.2019
         *
         * @param {OtevriDorucenkuInputParams} input
         * @returns {JQueryPromise<OtevriDorucenkuRetunParams>}
         */
        static OtevriDorucenku(input: OtevriDorucenkuInputParams): JQueryPromise<OtevriDorucenkuRetunParams>;
        /**
         * OtevriIxb
         *
         * @author  TFeik
         * @date    26.09.2022
         *
         * @param {OtevriIxbInputParams} input
         * @returns {JQueryPromise<OtevriIxbRetunParams>}
         */
        static OtevriIxb(input: OtevriIxbInputParams): JQueryPromise<OtevriIxbRetunParams>;
        /**
         * Našte adresu daného subektu.
         *
         * @author  TFeik
         * @date    13.12.2019
         *
         * @param {string} ixsEsu
         * @param {string | null} [licZast]
         * @param {number | null} [porZast]
         */
        static NactiAdresu(parentContent: GContent, ixsEsu: string, licZast?: string | null, porZast?: number | null): gjqXHR<GAdresuEsuDto>;
        /**
         * Vrátí název políčka datum uložení dle stavu doručení.
         *
         * @author  TFeik
         * @date    06.01.2019
         *
         * @param {Gordic.Ginis.DbModel.GWflczpdEnum | undefined | null} zpusobDoruceni
         * @param {Gordic.Ginis.DbModel.GWflcsdoEnum | undefined | null} stavDoruceni
         */
        static getDatumUlozeniName(zpusobDoruceni: Ginis.DbModel.GWflczpdEnum | undefined | null, stavDoruceni: Ginis.DbModel.GWflcsdoEnum | undefined | null): string;
        /**
         * Vrátí název políčka datum doručení dle stavu doručení.
         *
         * @author  TFeik
         * @date    22.05.2024
         *
         * @param {Gordic.Ginis.DbModel.GWflcsdoEnum | undefined | null} stavDoruceni
         */
        static getDatumDoruceniName(stavDoruceni: Ginis.DbModel.GWflcsdoEnum | undefined | null, dbCulture: number | undefined | null): string;
        /**
         * IsSlovenskoDbCulture
         *
         * @author  TFeik
         * @date    03.06.2024
         *
         * @param {number | undefined | null} dbCulture
         * @returns {boolean}
         */
        static IsSlovenskoDbCulture(dbCulture: number | undefined | null): boolean;
    }
    interface ZmenDorucenkuZasilkyInputParams {
        ixb: string;
        ixp: string;
        lic?: string;
        porCislo?: number;
    }
    interface VlozDorucenkuKZasilkceInputParams {
        /** Ixp. */
        ixp: string;
        /** Ixb. */
        ixbDorucenky?: string;
        /** Lic. */
        lic?: string;
        /** PorCislo. */
        porCislo?: number;
    }
    interface VymazDorucenkuZasilkyInputParams {
        ixb_dorucenka: string;
        ixp: string;
        lic?: string;
        porCislo?: number;
    }
    interface OtevriDorucenkuInputParams extends OtevriIxbInputParams {
        sxs: string;
        /**Způsob doručení zásilky.*/
        zpusobDor?: Gordic.Ginis.DbModel.GWflczpdEnum | null;
    }
    interface OtevriDorucenkuRetunParams extends OtevriIxbRetunParams {
    }
    interface OtevriIxbInputParams {
        ixb: string;
        parentContent: GContent;
    }
    interface OtevriIxbRetunParams {
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Vstupní parametry dialogu doručení zásilky.
     *
     * @author TFeik
     * @date   21.05.2019
     * @since 482.1.0.409
     */
    interface GDoruceniZasilkyDlgInputParams {
        /**
         * Sxs
         * @type {string}
         */
        Sxs: string;
        /**
         * EditMode (default = false).
         * @type {boolean}
         */
        EditMode?: boolean;
        /**
         * (default: standard) Mód okna doručenízásilky.
         * @type {GDoruceniZasilkyDlgMode}
         */
        Mode?: GDoruceniZasilkyDlgMode;
    }
    /**
     * Návratová hodnota dialogu doručení zásilky.
     *
     * @author TFeik
     * @date   21.05.2019
     * @since 482.1.0.409
     */
    interface GDoruceniZasilkyDlgReturnValue {
        /**
         * Příznak, zda na dialogu došlo k uložení doručení zásilky.
         * @type {boolean}
         */
        isSaved?: boolean;
        /**
         * Data doručení zásilky.
         * @type {Interface.GDoruceniZasilkyDto}
         */
        doruceniZasilky?: Interface.GDoruceniZasilkyDto;
    }
    /**
     * Interface dat gridu, po kterém je možné přesouvat se pomocí šipek na detailu.
     *
     * @author  TFeik
     * @date    08.07.2019
     * @since   482.1.0.520
     */
    interface GDoruceniZasilkyDlgListSupportData {
        sxs?: string;
        Sxs?: string;
        esu_txt?: string;
    }
    /**
     * Detail doručení zásilky.
     *
     * @author TFeik
     * @since 482.1.0.403
     */
    class GDoruceniZasilkyDlg extends GContentBase implements DetailBuilderComponents.GWflDoruceniZasilkyComponentContentRequirements {
        readonly EditMode?: boolean;
        DoruceniZasilky?: Interface.GDoruceniZasilkyDto;
        /**
         * (default: standard) Mód okna doručenízásilky.
         * @type {GDoruceniZasilkyDlgMode}
         */
        readonly Mode?: GDoruceniZasilkyDlgMode;
        IsSaved?: boolean;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    21.05.2019
         */
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(this: GDoruceniZasilkyDlg & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<GDoruceniZasilkyDlgListSupportData>, builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private _getListControlsSettings;
        private closing;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class GTiskObalekDlg extends GContentBase<WflListBaseAC> {
        OdDatumu: string;
        data: Gordic.Wfl.Interface.GDorucenkyDatovychZpravDto[];
        onContentReady(): void;
        ReloadData(): void;
        CreateList(): void;
        CreateGrid(): void;
        SetData(): void;
        LoadData(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Vstupní parametry dialogu  informací o zásile z Hromadné konverzní pošty.
     *
     * @author  TFeik
     * @date    15.04.2021
     */
    interface GZasilkaHkpInfoDlgInputParams {
        /**
         * Identifikátor z Hromadné konverzní pošty.
         * @type {string}
         */
        IdZakHkp: string;
        /**
         * Sxs zásilky
         * @type {string}
         */
        Sxs: string;
    }
    /**
     * Návratová hodnota dialogu informací o zásile z Hromadné konverzní pošty.
     *
     * @author  TFeik
     * @date    15.04.2021
     */
    interface GZasilkaHkpInfoDlgReturnValue {
    }
    /**
     * Dialog informací o zásile z Hromadné konverzní pošty.
     *
     * @author  TFeik
     * @date    15.04.2021
     */
    class GZasilkaHkpInfoDlg extends GContentBase {
        /**
         * Identifikátor z Hromadné konverzní pošty.
         * @type {string}
         */
        private readonly IdZakHp;
        /**
         * Sxs zásilky
         * @type {string}
         */
        private readonly Sxs?;
        /**
         * Informace o zásilce.
         * @type {GZasilkaInfoZHkpDto}
         */
        private readonly ZasilkaInfoZHkp?;
        /**
         * $Form
         * @type {JQuery<HTMLElement>}
         */
        private $Form?;
        /**
         * $Grid
         * @type {JQuery<HTMLElement>}
         */
        private $GridStav?;
        /**
         * $Grid
         * @type {JQuery<HTMLElement>}
         */
        private $GridUdalosti?;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    15.04.2021
         */
        onContentReady(): void;
        /**
         * Vytvoří grid.
         *
         * @author  TFeik
         * @date    15.04.2021
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @returns {JQuery<HTMLElement>}
         */
        private CreateGridStav;
        /**
         * Nastaví enabled / disabled na akcích a políčkách.
         *
         * @author  TFeik
         * @date    15.04.2021
         */
        private EnableFieldsAndActions;
        /**
         * Vytvoří formulář.
         *
         * @author  TFeik
         * @date    15.04.2021
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @param {Data.IGStorage} userSettings
         * @returns {JQuery<HTMLElement>}
         */
        private static CreateForm;
        /**
         * Nastaví hodnoty o datové zprávě (formulář, status bar, grid, temp).
         *
         * @author  TFeik
         * @date    15.04.2021
         *
         * @param {GZasilkaInfoZHkpDto} data
         */
        private SetData;
        /**
         * SetValuesFromGridToField
         *
         * @author  TFeik
         * @date    15.04.2021
         *
         * @param {GZasilkaInfoZHkpStavDto} data
         */
        private SetValuesFromGridToField;
        /**
         * closing
         *
         * @author  TFeik
         * @date    15.04.2021
         *
         * @returns {JQuery.Promise<GZasilkaHkpInfoDlgReturnValue>}
         */
        private closing;
        /**
         * Zkontroluje, zda jsou vstupní parametry dialogu validní a půjde otevřít.
         *
         * @author  TFeik
         * @date    15.04.2021
         *
         * @param {GZasilkaHkpInfoDlgInputParams} [inputParams]
         * @returns {boolean | Gui.Dialogs.OpenDialogRejectType}
         */
        static IsValid(inputParams: GZasilkaHkpInfoDlgInputParams | null | undefined): boolean | Gui.Dialogs.OpenDialogRejectType;
        /**
         * Zobrazí texty jako flashMessage.
         *
         * @author  TFeik
         * @date    15.04.2021
         */
        private ShowMessages;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Vstupní parametry dialogu  informací o zásile z Hybridní pošty.
     *
     * @author  TFeik
     * @date    14.04.2021
     */
    interface GZasilkaHpInfoDlgInputParams {
        /**
         * Identifikátor z hybridní pošty.
         * @type {string}
         */
        IdZakHp: string;
        /**
         * Ixp
         * @type {string}
         */
        Ixp?: string;
    }
    /**
     * Návratová hodnota dialogu informací o zásile z Hybridní pošty.
     *
     * @author  TFeik
     * @date    14.04.2021
     */
    interface GZasilkaHpInfoDlgReturnValue {
    }
    /**
     * Dialog informací o zásile z Hybridní pošty.
     *
     * @author  TFeik
     * @date    14.04.2021
     */
    class GZasilkaHpInfoDlg extends GContentBase {
        /**
         * Identifikátor z hybridní pošty.
         * @type {string}
         */
        private readonly IdZakHp;
        /**
         * Ixp
         * @type {string}
         */
        private readonly Ixp?;
        /**
         * Informace o zásilce.
         * @type {GZasilkaInfoZHpDto}
         */
        private readonly ZasilkaInfoZHp?;
        /**
         * $Form
         * @type {JQuery<HTMLElement>}
         */
        private $Form?;
        /**
         * $Grid
         * @type {JQuery<HTMLElement>}
         */
        private $GridDoruceni?;
        /**
         * $Grid
         * @type {JQuery<HTMLElement>}
         */
        private $GridUdalosti?;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    14.04.2021
         */
        onContentReady(): void;
        /**
         * Vytvoří grid.
         *
         * @author  TFeik
         * @date    14.04.2021
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @returns {JQuery<HTMLElement>}
         */
        private static CreateGridDoruceni;
        /**
         * Nastaví enabled / disabled na akcích a políčkách.
         *
         * @author  TFeik
         * @date    14.04.2021
         */
        private EnableFieldsAndActions;
        /**
         * Vytvoří formulář.
         *
         * @author  TFeik
         * @date    14.04.2021
         *
         * @param {JQuery<HTMLElement>} appendTo
         * @param {Data.IGStorage} userSettings
         * @returns {JQuery<HTMLElement>}
         */
        private static CreateForm;
        /**
         * Nastaví hodnoty o datové zprávě (formulář, status bar, grid, temp).
         *
         * @author  TFeik
         * @date    14.04.2021
         *
         * @param {GZasilkaInfoZHpDto} data
         */
        private SetData;
        /**
         * closing
         *
         * @author  TFeik
         * @date    14.04.2021
         *
         * @returns {JQuery.Promise<GZasilkaHpInfoDlgReturnValue>}
         */
        private closing;
        /**
         * Zkontroluje, zda jsou vstupní parametry dialogu validní a půjde otevřít.
         *
         * @author  TFeik
         * @date    14.04.2021
         *
         * @param {GZasilkaHpInfoDlgInputParams} [inputParams]
         * @returns {boolean | Gui.Dialogs.OpenDialogRejectType}
         */
        static IsValid(inputParams: GZasilkaHpInfoDlgInputParams | null | undefined): boolean | Gui.Dialogs.OpenDialogRejectType;
        /**
         * Zobrazí texty jako flashMessage.
         *
         * @author  TFeik
         * @date    15.04.2021
         */
        private ShowMessages;
    }
}
declare namespace Gordic.Wfl.AC {
    class GZasilkyInfoDlg extends GContentBase<WflBaseAC> {
        model: Interface.GZasilkaDto;
        FormOptions: Interface.GZasilkaInfoOptions;
        isInit: boolean;
        validators: any;
        onContentReady(): void;
        CreateForm(): void;
        ZmenaHodnot(value: Decimal, typ: Interface.TypPredplneniEnum): void;
        ApplyModel(): void;
        ZmenaVahy(vaha: any): void;
        ZmenaPoplatek(poplatek: any): void;
        OKClick(): void;
        SaveData(): void;
    }
}
declare namespace Gordic.Wfl.ZasilkyGlobals {
    function PredaniZasilekDialog(content: GContent, ListSxs: string[], TypPredani: Gordic.Wfl.Interface.TypOznaceniKAkci): JQuery.Promise<any, any, any>;
    function TiskPredavacihoProtokoluZasilek(content: GContent, LogPorCislo: string, IxsFunOd: string, IxsFunDo: string, event?: JQueryEventObject): JQuery.Promise<boolean>;
    function TiskProtokoluSdruzeniZasilek(content: GContent, LogPorCislo: string, hromadne: boolean, CjText: string): JQuery.Promise<boolean>;
    function ShowDetZas(content: any, sxs: any, grid: any): void;
}
declare namespace Gordic.Wfl.DialogAC {
    class ZasilkyInfoDlg extends GContentBase {
        model: Wfl.Interface.GZasilkaDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    interface GWflDetailZasilkyComponentContentRequirements extends GContent {
        EditMode?: boolean;
        Zasilka?: WebClient.GDetailZasilkyDto;
        IsSaved?: boolean;
    }
    interface GWflDetailZasilkyComponentContentExtensions {
        tryReloadDetail: (this: GWflDetailZasilkyComponentContent, params?: any, opt?: any) => void;
        reloadDetail: (this: GWflDetailZasilkyComponentContent, params?: any, opt?: any) => void;
        beforeReloadDetail: (this: GWflDetailZasilkyComponentContent) => JQueryPromise<undefined>;
        zmenaEditace: (this: GWflDetailZasilkyComponentContent, opt?: any) => void;
        reload: (this: GWflDetailZasilkyComponentContent, opt?: any) => void;
        _createStatusBar: (data?: Interface.GZasilkaDto) => MenuParams[];
        obnovitAdresuZEsu: (this: GWflDetailZasilkyComponentContent) => void;
        ulozitZasilku: (this: GWflDetailZasilkyComponentContent) => JQueryPromise<void>;
        switch3r4rAdresy: (this: GWflDetailZasilkyComponentContent) => void;
        ulozitAdresuKEsu: (this: GWflDetailZasilkyComponentContent) => JQueryPromise<WebClient.IGOdeslaniBaseReturnObejct<undefined>>;
        setDetailZasilkyData: (data: Interface.GZasilkaDto) => void;
        /**
         * Upravínáev políčka datumu uložení dle stavu a způsobu doručení zásilky.
         *
         * @author  TFeik
         * @date    17.03.2023
         *
         * @param {GWflDetailZasilkyComponentContent} this
         * @param {Ginis.DbModel.GWflcsdoEnum | undefined | null} stavDoruceni
         */
        DatumUlozeniUpdateLabel: (this: GWflDetailZasilkyComponentContent, stavDoruceni: Ginis.DbModel.GWflcsdoEnum | undefined | null) => void;
        getDetailZasilkyData: (this: GWflDetailZasilkyComponentContent) => Interface.GZasilkaDto;
        updateDetailZasilkyData: (this: GWflDetailZasilkyComponentContent, zasilka: Interface.GZasilkaDto) => Interface.GZasilkaDto;
        enableDetailZasilky: (this: GWflDetailZasilkyComponentContent, editMode: boolean, permissions: WebClient.GDetailZasilkyPermissionsDto, data: Interface.GZasilkaDto) => void;
        updateStatusBar: (this: GWflDetailZasilkyComponentContent, data?: Interface.GZasilkaDto) => void;
    }
    interface GWflDetailZasilkyComponentContent extends GWflDetailZasilkyComponentContentRequirements, GWflDetailZasilkyComponentContentExtensions {
    }
    /**
     * SslHeader
     *
     * @author TFeik
     * @since 480.1.0.11
     */
    class GWflDetailZasilkyComponent {
        /**
         * create
         *
         * @author TFeik
         * @date    27.08.2018
         *
         * @param {any} content
         * @param {any} componentDto
         */
        static create(content: GWflDetailZasilkyComponentContentRequirements, //GContent,
        componentDto?: WebClient.GWflDetailZasilkyComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
        private static _createContentExtensions;
        private static _createTabs;
        /**
         * _createHeaderForm
         *
         * @author TFeik
         * @date    28.08.2018
         *
         * @param {Interface.GZasilkaDto} componentDto
         * @param {boolean} isNovaZasilka
         * @returns {Forms.Form}
         */
        private static _createHeaderForm;
        /**
         * setDetailZasilkyHeaderData
         *
         * @author TFeik
         * @date    31.08.2018
         *
         * @param {GContent} this
         * @param {Interface.GZasilkaDto} [data]
         */
        static setDetailZasilkyHeaderData(this: GContent, data: Interface.GZasilkaDto): void;
        private static createTabGroups;
        /**
         * function _createDetailForm
         *
         * @author TFeik
         * @date    28.08.2018
         *
         * @param {JQuery<HTMLElement>} appentTo
         */
        private static _createDetailForm;
        private static _createActions;
        private static _createMenuBar;
        private static _createCommandBar;
        private static _createStatusBar;
        private static _createSideBar;
        static updateStatusBar(this: GWflDetailZasilkyComponentContent, data?: Interface.GZasilkaDto): void;
        /**
         * obnovitAdresuZEsu
         *
         * @author TFeik
         * @date    11.09.2018
         *
         * @param {GContent} this
         * @param {Interface.GZasilkaDto} [data]
         */
        static obnovitAdresuZEsu(this: GWflDetailZasilkyComponentContent): void;
        /**
         * obnovitAdresuZEsu
         *
         * @author TFeik
         * @date    11.09.2018
         *
         * @param {GContent} this
         */
        static ulozitAdresuKEsu(this: GWflDetailZasilkyComponentContent): JQueryPromise<WebClient.IGOdeslaniBaseReturnObejct<undefined>>;
        static tryReloadDetail(this: GWflDetailZasilkyComponentContent, params?: any, opt?: any): void;
        static reloadDetail(this: GWflDetailZasilkyComponentContent, params?: any, opt?: any): void;
        static beforeReloadDetail(this: GWflDetailZasilkyComponentContent): JQueryPromise<undefined>;
        static zmenaEditace(this: GWflDetailZasilkyComponentContent, opt?: any): void;
        static reload(this: GWflDetailZasilkyComponentContent, opt?: any): void;
        /**
         * Uloží adresní řádky do Clipboardu.
         *
         * @author  TFeik
         * @date    10.09.2018
         */
        static switch3r4rAdresy(this: GWflDetailZasilkyComponentContent): void;
        /**
         * Uloží zásilku.
         *
         * @author  TFeik
         * @date    11.09.2018
         */
        static ulozitZasilku(this: GWflDetailZasilkyComponentContent): JQueryPromise<void>;
        /**
         * _createPodrobnostiForm
         *
         * @author TFeik
         * @date    30.08.2018
         *
         * @param {JQuery<HTMLElement>} appentTo
         * @returns {JQuery<HTMLElement>}
         */
        private static _createPodrobnostiForm;
        /**
         * enableDetailZasilky
         *
         * @author TFeik
         * @date    19.09.2018
         *
         * @param {GWflDetailZasilkyComponentContentRequirements} this
         * @param {boolean} editMode
         * @param {WebClient.GDetailZasilkyPermissionsDto} permissions
         * @param {Interface.GZasilkaDto} data
         */
        static enableDetailZasilky(this: GWflDetailZasilkyComponentContent, editMode: boolean, permissions: WebClient.GDetailZasilkyPermissionsDto, data: Interface.GZasilkaDto): void;
        /**
         * getDetailZasilkyData
         *
         * @author TFeik
         * @date    19.09.2018
         *
         * @param {GWflDetailZasilkyComponentContent} content
         * @returns {Interface.GZasilkaDto}
         */
        static getDetailZasilkyData(this: GWflDetailZasilkyComponentContent): Interface.GZasilkaDto;
        static updateDetailZasilkyData(this: GWflDetailZasilkyComponentContent, zasilka: Interface.GZasilkaDto): Interface.GZasilkaDto;
        /**
         * setDetailBaliku
         *
         * @author TFeik
         * @date    02.11.2018
         *
         * @param {GSpiDetailBalikuComponentContent} this
         * @param {WebClient.GDetailBalikuDto} balik
         */
        static setDetailZasilky(this: GWflDetailZasilkyComponentContent, zasilka: WebClient.GDetailZasilkyDto): void;
        /**
         * setDetailZasilkyData
         *
         * @author TFeik
         * @date    19.09.2018
         *
         * @param {Interface.GZasilkaDto} data
         * @param {GWflDetailZasilkyComponentContent} content
         */
        static setDetailZasilkyData(this: GWflDetailZasilkyComponentContent, data: Interface.GZasilkaDto): void;
        /**
         * Upravínáev políčka datumu uložení dle stavu a způsobu doručení zásilky.
         *
         * @author  TFeik
         * @date    17.03.2023
         *
         * @param {GWflDetailZasilkyComponentContent} this
         * @param {Ginis.DbModel.GWflcsdoEnum | undefined | null} stavDoruceni
         */
        static DatumUlozeniUpdateLabel(this: GWflDetailZasilkyComponentContent, stavDoruceni: Ginis.DbModel.GWflcsdoEnum | undefined | null): void;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /**
     * Interface, který musí splňovat content, pracující s componentou datové zprávy zásilky.
     *
     * @author TFeik
     * @date    18.09.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyDzComponentContentRequirements extends GContent {
        EditMode?: boolean;
        Zasilka?: WebClient.GDetailZasilkyDto;
    }
    /**
     * Funkce, které komponenta přidá na content.
     *
     * @author TFeik
     * @date    18.09.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyDzComponentContentExtensions {
        /**
         * Nastaví data do formuláře datové zprávy zásilky.
         *
         * @author TFeik
         * @date    31.08.2018
         *
         * @param {WebClient.GWflDetailZasilkyDzComponentDto} data Data datové zprávy zásilky.
         */
        setDetailZasilkyDzData: (this: GWflDetailZasilkyComponentContentRequirements, data: WebClient.GWflDetailZasilkyDzComponentDto) => void;
        /**
         * Nastaví enabled políček formuláře datové zprávy.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {boolean} isEditMode Příznak, zda je aktivní EditMode.
         * @param {boolean} isIdDatoveZpravy Příznak, zda má zásilka id datové zprávy (idDz).
         */
        enableDetailZasilkyDz: (this: GWflDetailZasilkyComponentContentRequirements, data: WebClient.GWflDetailZasilkyDzComponentDto, isEditMode: boolean) => void;
    }
    /**
     * Content, se kterým komponenta pracuje.
     *
     * @author TFeik
     * @date    18.09.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyDzComponentContent extends GWflDetailZasilkyDzComponentContentRequirements, GWflDetailZasilkyDzComponentContentExtensions {
    }
    /**
     * Komponenta datové zprávy zásilky.
     *
     * @author TFeik
     * @date    18.09.2018
     * @since 480.1.0.11
     */
    class GWflDetailZasilkyDzComponent {
        /**
         * create
         *
         * @author  TFeik
         * @date    27.08.2018
         *
         * @param {GWflDetailZasilkyDzComponentContentRequirements} content Content, na kterém je komponenta.
         * @param {WebClient.GWflDetailZasilkyDzComponentDto} componentDto Dto komponenty.
         */
        static create(content: GWflDetailZasilkyDzComponentContentRequirements, componentDto?: WebClient.GWflDetailZasilkyDzComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
        /**
         * Vytvoří ContentExtensions komponenty.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @returns {GWflDetailZasilkyDzComponentContentExtensions} ContentExtensions.
         */
        private static _createContentExtensions;
        /**
         * Vytvoří taby komponenty.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {WebClient.GWflDetailZasilkyDzComponentDto} componentDto
         * @returns {Gin.DetailBuilder.TabParamsId[]}
         */
        private static _createTabs;
        /**
         * Vytvoří akce komponenty.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {GWflDetailZasilkyDzComponentContentRequirements} content Kontent, na kterém je komponeta.
         * @returns {(GActionParams | GAction)[]} Pole akcí.
         */
        private static _createActions;
        /**
         * Vytvoří menubar komponenty.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @returns {Gin.DetailBuilder.GDetailBuilderMenuItemDef}
         */
        private static _createMenuBar;
        /**
         * Vytvoří formulář emailu.
         *
         * @author TFeik
         * @date    28.08.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je formulář přidán.
         * @returns {JQuery<HTMLElement>} Element ve kterém je formulář.
         */
        private static _createDzForm;
        /**
         * Nastaví enabled políček formuláře datové zprávy.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {boolean} isEditMode Příznak, zda je aktivní EditMode.
         * @param {boolean} isIdDatoveZpravy Příznak, zda má zásilka id datové zprávy (idDz).
         */
        static enableDetailZasilkyDz(this: GWflDetailZasilkyDzComponentContentRequirements, data: WebClient.GWflDetailZasilkyDzComponentDto, isEditMode: boolean): void;
        /**
         * Nastaví data do formuláře datové zprávy zásilky.
         *
         * @author TFeik
         * @date    31.08.2018
         *
         * @param {WebClient.GWflDetailZasilkyDzComponentDto} data Data datové zprávy zásilky.
         */
        static setDetailZasilkyDzData(this: GWflDetailZasilkyDzComponentContentRequirements, data: WebClient.GWflDetailZasilkyDzComponentDto): void;
        /**
         * Vytvoří seznam příloh datové zprávy.
         *
         * @author TFeik
         * @date    17.09.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {WebClient.GPrilohaEmailuDto[]} data Data příloh datové zprávy.
         * @returns {JQuery<HTMLElement>} Element ve kterém je grid.
         */
        private static _createDzGrid;
        /**
         * Vytvoří DataView příloh datové zprávy.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {WebClient.GPrilohaEmailuDto[]} prilohy Data příloh datové zprávy.
         * @returns {Data.View<WebClient.GPrilohaEmailuDto>} DataView příloh datové zprávy.
         */
        private static _createSeznamPrilohDataView;
        /**
         * Vrátí data datové zprávy zásilky z formuláře.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {GWflDetailZasilkyDzComponentContent} content Kontent, na kterém je formulář datové zprávy.
         * @returns {WebClient.GWflDetailZasilkyDzComponentDto} Data datové zprávy zásilky.
         */
        private static _getFormData;
        /**
         * Vrátí data datové zprávy zásilky do formuláře.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {WebClient.GWflDetailZasilkyDzComponentDto} data Data datové zprávy zásilky.
         * @param {GWflDetailZasilkyDzComponentContent} content Kontent, na kterém je formulář datové zprávy.
         */
        private static _setFormData;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /**
     * Interface, který musí splňovat content, pracující s componentou datové zprávy zásilky.
     *
     * @author TFeik
     * @date    18.09.2019
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyEDeskComponentContentRequirements extends GContent {
        EditMode?: boolean;
        Zasilka?: WebClient.GDetailZasilkyDto;
    }
    /**
     * Funkce, které komponenta přidá na content.
     *
     * @author TFeik
     * @date    18.09.2019
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyEDeskComponentContentExtensions {
        setDetailZasilkyEDeskData: (this: GWflDetailZasilkyComponentContentRequirements, data: WebClient.GWflDetailZasilkyEDeskComponentDto) => void;
        enableDetailZasilkyEDesk: (this: GWflDetailZasilkyComponentContentRequirements, data: WebClient.GWflDetailZasilkyEDeskComponentDto, editMode: boolean) => void;
    }
    /**
     * Content, se kterým komponenta pracuje.
     *
     * @author TFeik
     * @date    18.09.2019
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyEDeskComponentContent extends GWflDetailZasilkyEDeskComponentContentRequirements, GWflDetailZasilkyEDeskComponentContentExtensions {
    }
    /**
     * Komponenta datové zprávy zásilky.
     *
     * @author TFeik
     * @date    18.09.2019
     * @since 480.1.0.11
     */
    class GWflDetailZasilkyEDeskComponent {
        /**
         * create
         *
         * @author TFeik
         * @date    27.08.2018
         *
         * @param {any} content Content, na kterém je komponenta.
         * @param {any} componentDto Dto komponenty.
         */
        static create(content: GWflDetailZasilkyEDeskComponentContentRequirements, componentDto?: WebClient.GWflDetailZasilkyEDeskComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
        /**
         * Vytvoří ContentExtensions komponenty.
         *
         * @author TFeik
         * @date    18.09.2019
         *
         * @returns {GWflDetailZasilkyEDeskComponentContentExtensions} ContentExtensions.
         */
        private static _createContentExtensions;
        /**
         * Vytvoří taby komponenty.
         *
         * @author TFeik
         * @date    18.09.2019
         *
         * @param {WebClient.GWflDetailZasilkyEDeskComponentDto} componentDto
         * @returns {Gin.DetailBuilder.TabParamsId[]}
         */
        private static _createTabs;
        /**
         * Vytvoří akce komponenty.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {GWflDetailZasilkyDzComponentContentRequirements} content Kontent, na kterém je komponeta.
         * @returns {(GActionParams | GAction)[]} Pole akcí.
         */
        private static _createActions;
        /**
         * Vytvoří menubar komponenty.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @returns {Gin.DetailBuilder.GDetailBuilderMenuItemDef}
         */
        private static _createMenuBar;
        /**
         * Vytvoří formulář emailu.
         *
         * @author TFeik
         * @date    28.08.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je formulář přidán.
         * @returns {JQuery<HTMLElement>} Element ve kterém je formulář.
         */
        private static _createDzForm;
        /**
         * Nastaví enabled políček formuláře datové zprávy.
         *
         * @author  TFeik
         * @date    18.09.2019
         *
         * @param {boolean} isEditMode Příznak, zda je aktivní EditMode.
         */
        static enableDetailZasilkyEDesk(this: GWflDetailZasilkyEDeskComponentContentRequirements, data: WebClient.GWflDetailZasilkyEDeskComponentDto, isEditMode: boolean): void;
        /**
         * Nastaví data do formuláře datové zprávy zásilky.
         *
         * @author TFeik
         * @date    31.08.2018
         *
         * @param {WebClient.GWflDetailZasilkyEDeskComponentDto} data Data datové zprávy zásilky.
         */
        static setDetailZasilkyEDeskData(this: GWflDetailZasilkyEDeskComponentContentRequirements, data: WebClient.GWflDetailZasilkyEDeskComponentDto): void;
        /**
         * Vytvoří seznam příloh datové zprávy.
         *
         * @author TFeik
         * @date    17.09.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {WebClient.GPrilohaEmailuDto[]} data Data příloh datové zprávy.
         * @returns {JQuery<HTMLElement>} Element ve kterém je grid.
         */
        private static _createDzGrid;
        /**
         * Vytvoří DataView příloh datové zprávy.
         *
         * @author TFeik
         * @date    18.09.2019
         *
         * @param {WebClient.GPrilohaEmailuDto[]} prilohy Data příloh datové zprávy.
         * @returns {Data.View<WebClient.GPrilohaEmailuDto>} DataView příloh datové zprávy.
         */
        private static _createSeznamPrilohDataView;
        /**
         * Vrátí data datové zprávy zásilky z formuláře.
         *
         * @author TFeik
         * @date    18.09.2019
         *
         * @param {GWflDetailZasilkyEDeskComponentContent} content Kontent, na kterém je formulář datové zprávy.
         * @returns {WebClient.GWflDetailZasilkyEDeskComponentDto} Data datové zprávy zásilky.
         */
        private static _getFormData;
        /**
         * Vrátí data datové zprávy zásilky do formuláře.
         *
         * @author TFeik
         * @date    18.09.2019
         *
         * @param {WebClient.GWflDetailZasilkyEDeskComponentDto} data Data datové zprávy zásilky.
         * @param {GWflDetailZasilkyEDeskComponentContent} content Kontent, na kterém je formulář datové zprávy.
         */
        private static _setFormData;
        private static createSidebar;
        private static panelNahledEl;
        private static createPanelNahled;
        /** element pro náhled */
        private static preview;
        private static setPanelNahled;
        private static updatePanelNahled;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /**
     * Interface, který musí splňovat content, pracující s componentou emailu zásilky.
     *
     * @author TFeik
     * @date    18.09.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyEmailComponentContentRequirements extends GContent {
        EditMode?: boolean;
        Zasilka?: WebClient.GDetailZasilkyDto;
    }
    /**
     * Funkce, které komponenta přidá na content.
     *
     * @author TFeik
     * @date    18.09.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyEmailComponentContentExtensions {
        setDetailZasilkyEmailData: (this: GWflDetailZasilkyComponentContentRequirements, data: WebClient.GWflDetailZasilkyEmailComponentDto) => void;
        enableDetailZasilkyEmailForm: (this: GWflDetailZasilkyComponentContentRequirements, editMode: boolean) => void;
    }
    /**
     * Content, se kterým komponenta pracuje.
     *
     * @author TFeik
     * @date    18.09.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyEmailComponentContent extends GWflDetailZasilkyEmailComponentContentRequirements, GWflDetailZasilkyEmailComponentContentExtensions {
    }
    /**
     * Komponenta Emailu zásilky.
     *
     * @author TFeik
     * @date    18.09.2018
     * @since 480.1.0.11
     */
    class GWflDetailZasilkyEmailComponent {
        /**
         * create
         *
         * @author TFeik
         * @date    27.08.2018
         *
         * @param {any} content Content, na kterém je komponenta.
         * @param {any} componentDto Dto komponenty.
         */
        static create(content: GWflDetailZasilkyEmailComponentContentRequirements, componentDto?: WebClient.GWflDetailZasilkyEmailComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
        /**
         * Vytvoří ContentExtensions komponenty.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @returns {GWflDetailZasilkyEmailComponentContentExtensions} ContentExtensions.
         */
        private static _createContentExtensions;
        /**
         * Vytvoří taby komponenty.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {WebClient.GWflDetailZasilkyEmailComponentDto} componentDto
         * @returns {Gin.DetailBuilder.TabParamsId[]}
         */
        private static _createTabs;
        /**
         * Vytvoří akce komponenty.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {GWflDetailZasilkyEmailComponentContentRequirements} content Kontent, na kterém je komponeta.
         * @param {WebClient.GWflDetailZasilkyEmailComponentDto} componentDto
         * @returns {(GActionParams | GAction)[]} Pole akcí.
         */
        private static _createActions;
        /**
         * Vytvoří menubar komponenty.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @returns {Gin.DetailBuilder.GDetailBuilderMenuItemDef}
         */
        private static _createMenuBar;
        /**
         * Vytvoří side bar.
         *
         * @author  TFeik
         * @date    28.07.2022
         *
         * @param {string | null | undefined} textMailuCely
         * @returns {Gin.DetailBuilder.GSideBarPanelOptionsId[]
         */
        private static _createSideBar;
        /**
         * Vytvoří formulář emailu.
         *
         * @author  TFeik
         * @date    28.08.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je formulář přidán.
         * @returns {JQuery<HTMLElement>} Element ve kterém je formulář.
         */
        private static _createEmailForm;
        /**
         * Nastaví enabled políček formuláře emailu.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {boolean} isEditMode Příznak, zda je aktivní EditMode.
         */
        static enableDetailZasilkyEmailForm(this: GWflDetailZasilkyEmailComponentContentRequirements, isEditMode: boolean): void;
        /**
         * Nastaví data do formuláře emailu zásilky.
         *
         * @author TFeik
         * @date    31.08.2018
         *
         * @param {WebClient.GWflDetailZasilkyEmailComponentDto} data Data emailu zásilky.
         */
        static setDetailZasilkyEmailData(this: GWflDetailZasilkyEmailComponentContentRequirements, data: WebClient.GWflDetailZasilkyEmailComponentDto): void;
        /**
         * Vytvoří seznam příloh emailu.
         *
         * @author TFeik
         * @date    17.09.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {WebClient.GPrilohaEmailuDto[]} data Data příloh emailu.
         * @returns {JQuery<HTMLElement>} Element ve kterém je grid.
         */
        private static _createEmailGrid;
        /**
         * Vytvoří DataView příloh emailu.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {WebClient.GPrilohaEmailuDto[]} prilohy Data příloh emailu.
         * @returns {Data.View<WebClient.GPrilohaEmailuDto>} DataView příloh emailu.
         */
        private static _createSeznamPrilohDataView;
        /**
         * Vrátí data emailu zásilky z formuláře.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {GWflDetailZasilkyEmailComponentContent} content Kontent, na kterém je formulář emailu.
         * @returns {WebClient.GWflDetailZasilkyEmailComponentDto} Data emailu zásilky.
         */
        private static _getFormData;
        /**
         * Vrátí data emailu zásilky do formuláře.
         *
         * @author TFeik
         * @date    18.09.2018
         *
         * @param {WebClient.GWflDetailZasilkyEmailComponentDto} data Data emailu zásilky.
         * @param {GWflDetailZasilkyEmailComponentContent} content Kontent, na kterém je formulář emailu.
         */
        private static _setFormData;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    class GWflDetailZasilkyHistoryComponent {
        static create(componentDto?: WebClient.GWflDetailZasilkyHistoryComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /**
     * Interface, který musí splňovat content, pracující s componentou emailu zásilky.
     *
     * @author  TFeik
     * @date    12.04.2021
     * @since   486.1.0.272
     */
    interface GWflDetailZasilkyHkpComponentContentRequirements extends GContent {
        EditMode?: boolean;
        Zasilka?: WebClient.GDetailZasilkyDto;
    }
    /**
     * Funkce, které komponenta přidá na content.
     *
     * @author  TFeik
     * @date    12.04.2021
     * @since   486.1.0.272
     */
    interface GWflDetailZasilkyHkpComponentContentExtensions {
        setDetailZasilkyHkpData: (this: GWflDetailZasilkyComponentContentRequirements, data: WebClient.GWflDetailZasilkyHkpComponentDto) => void;
        enableDetailZasilkyHkpForm: (this: GWflDetailZasilkyComponentContentRequirements, componentDto: WebClient.GWflDetailZasilkyHkpComponentDto, editMode: boolean) => void;
    }
    /**
     * Content, se kterým komponenta pracuje.
     *
     * @author  TFeik
     * @date    12.04.2021
     * @since   486.1.0.272
     */
    interface GWflDetailZasilkyHkpComponentContent extends GWflDetailZasilkyHkpComponentContentRequirements, GWflDetailZasilkyHkpComponentContentExtensions {
    }
    /**
     * Komponenta Hromadné konverzní pošty zásilky.
     *
     * @author  TFeik
     * @date    12.04.2021
     * @since   486.1.0.272
     */
    class GWflDetailZasilkyHkpComponent {
        /**
         * create
         *
         * @author TFeik
         * @date   12.04.2021
         *
         * @param {any} content Content, na kterém je komponenta.
         * @param {any} componentDto Dto komponenty.
         */
        static create(content: GWflDetailZasilkyHkpComponentContentRequirements, componentDto?: WebClient.GWflDetailZasilkyHkpComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
        /**
         * Vytvoří ContentExtensions komponenty.
         *
         * @author TFeik
         * @date   12.04.2021
         *
         * @returns {GWflDetailZasilkyHkpComponentContentExtensions} ContentExtensions.
         */
        private static _createContentExtensions;
        /**
         * Vytvoří taby komponenty.
         *
         * @author TFeik
         * @date   12.04.2021
         *
         * @param {WebClient.GWflDetailZasilkyHkpComponentDto} componentDto
         * @returns {Gin.DetailBuilder.TabParamsId[]}
         */
        private static _createTabs;
        /**
         * Vytvoří akce komponenty.
         *
         * @author  TFeik
         * @date    12.04.2021
         *
         * @param {GWflDetailZasilkyHkpComponentContentRequirements} content Kontent, na kterém je komponeta.
         * @returns {(GActionParams | GAction)[]} Pole akcí.
         */
        private static _createActions;
        /**
         * Vytvoří menubar komponenty.
         *
         * @author  TFeik
         * @date    12.04.2021
         *
         * @returns {Gin.DetailBuilder.GDetailBuilderMenuItemDef}
         */
        private static _createMenuBar;
        /**
         * Vytvoří formulář emailu.
         *
         * @author  TFeik
         * @date    12.04.2021
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je formulář přidán.
         * @returns {JQuery<HTMLElement>} Element ve kterém je formulář.
         */
        private static _createForm;
        /**
         * Nastaví enabled políček formuláře emailu.
         *
         * @author  TFeik
         * @date    12.04.2021
         *
         * @param {boolean} isEditMode Příznak, zda je aktivní EditMode.
         */
        static enableDetailZasilkyHkpForm(this: GWflDetailZasilkyHkpComponentContentRequirements, componentDto: WebClient.GWflDetailZasilkyHkpComponentDto, isEditMode: boolean): void;
        /**
         * Nastaví data do formuláře emailu zásilky.
         *
         * @author  TFeik
         * @date    12.04.2021
         *
         * @param {WebClient.GWflDetailZasilkyHkpComponentDto} data Data emailu zásilky.
         */
        static setDetailZasilkyHkpData(this: GWflDetailZasilkyHkpComponentContentRequirements, data: WebClient.GWflDetailZasilkyHkpComponentDto): void;
        /**
         * Vytvoří seznam příloh emailu.
         *
         * @author  TFeik
         * @date    12.04.2021
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {WebClient.GPrilohaEmailuDto[]} data Data příloh emailu.
         * @returns {JQuery<HTMLElement>} Element ve kterém je grid.
         */
        private static _createGrid;
        /**
         * Vytvoří DataView příloh emailu.
         *
         * @author  TFeik
         * @date    12.04.2021
         *
         * @param {WebClient.GPrilohaEmailuDto[]} prilohy Data příloh emailu.
         * @returns {Data.View<WebClient.GPrilohaEmailuDto>} DataView příloh emailu.
         */
        private static _createSeznamPrilohDataView;
        /**
         * Vrátí data emailu zásilky z formuláře.
         *
         * @author  TFeik
         * @date    12.04.2021
         *
         * @param {GWflDetailZasilkyHkpComponentContent} content Kontent, na kterém je formulář emailu.
         * @returns {WebClient.GWflDetailZasilkyHkpComponentDto} Data emailu zásilky.
         */
        private static _getFormData;
        /**
         * Vrátí data emailu zásilky do formuláře.
         *
         * @author  TFeik
         * @date    12.04.2021
         *
         * @param {WebClient.GWflDetailZasilkyHkpComponentDto} data Data emailu zásilky.
         * @param {GWflDetailZasilkyHkpComponentContent} content Kontent, na kterém je formulář emailu.
         */
        private static _setFormData;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /**
     * Interface, který musí splňovat content, pracující s componentou emailu zásilky.
     *
     * @author TFeik
     * @date    08.10.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyHpComponentContentRequirements extends GContent {
        EditMode?: boolean;
        Zasilka?: WebClient.GDetailZasilkyDto;
    }
    /**
     * Funkce, které komponenta přidá na content.
     *
     * @author TFeik
     * @date    08.10.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyHpComponentContentExtensions {
        setDetailZasilkyHpData: (this: GWflDetailZasilkyComponentContentRequirements, data: WebClient.GWflDetailZasilkyHpComponentDto) => void;
        enableDetailZasilkyHpForm: (this: GWflDetailZasilkyComponentContentRequirements, componentDto: WebClient.GWflDetailZasilkyHpComponentDto, editMode: boolean) => void;
    }
    /**
     * Content, se kterým komponenta pracuje.
     *
     * @author TFeik
     * @date    08.10.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyHpComponentContent extends GWflDetailZasilkyHpComponentContentRequirements, GWflDetailZasilkyHpComponentContentExtensions {
    }
    /**
     * Komponenta Emailu zásilky.
     *
     * @author TFeik
     * @date    08.10.2018
     * @since 480.1.0.11
     */
    class GWflDetailZasilkyHpComponent {
        /**
         * create
         *
         * @author TFeik
         * @date   08.10.2018
         *
         * @param {any} content Content, na kterém je komponenta.
         * @param {any} componentDto Dto komponenty.
         */
        static create(content: GWflDetailZasilkyHpComponentContentRequirements, componentDto?: WebClient.GWflDetailZasilkyHpComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
        /**
         * Vytvoří ContentExtensions komponenty.
         *
         * @author TFeik
         * @date    08.10.2018
         *
         * @returns {GWflDetailZasilkyHpComponentContentExtensions} ContentExtensions.
         */
        private static _createContentExtensions;
        /**
         * Vytvoří taby komponenty.
         *
         * @author TFeik
         * @date    08.10.2018
         *
         * @param {WebClient.GWflDetailZasilkyHpComponentDto} componentDto
         * @returns {Gin.DetailBuilder.TabParamsId[]}
         */
        private static _createTabs;
        /**
         * Vytvoří akce komponenty.
         *
         * @author  TFeik
         * @date    16.03.2021
         *
         * @param {GWflDetailZasilkyHpComponentContentRequirements} content Kontent, na kterém je komponeta.
         * @returns {(GActionParams | GAction)[]} Pole akcí.
         */
        private static _createActions;
        /**
         * Vytvoří menubar komponenty.
         *
         * @author  TFeik
         * @date    16.03.2021
         *
         * @returns {Gin.DetailBuilder.GDetailBuilderMenuItemDef}
         */
        private static _createMenuBar;
        /**
         * Vytvoří formulář emailu.
         *
         * @author  TFeik
         * @date    16.03.2021
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je formulář přidán.
         * @returns {JQuery<HTMLElement>} Element ve kterém je formulář.
         */
        private static _createHpForm;
        /**
         * Nastaví enabled políček formuláře emailu.
         *
         * @author  TFeik
         * @date    08.10.2018
         *
         * @param {boolean} isEditMode Příznak, zda je aktivní EditMode.
         */
        static enableDetailZasilkyHpForm(this: GWflDetailZasilkyHpComponentContentRequirements, componentDto: WebClient.GWflDetailZasilkyHpComponentDto, isEditMode: boolean): void;
        /**
         * Nastaví data do formuláře emailu zásilky.
         *
         * @author TFeik
         * @date    31.08.2018
         *
         * @param {WebClient.GWflDetailZasilkyHpComponentDto} data Data emailu zásilky.
         */
        static setDetailZasilkyHpData(this: GWflDetailZasilkyHpComponentContentRequirements, data: WebClient.GWflDetailZasilkyHpComponentDto): void;
        /**
         * Vytvoří seznam příloh emailu.
         *
         * @author TFeik
         * @date    17.09.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {WebClient.GPrilohaEmailuDto[]} data Data příloh emailu.
         * @returns {JQuery<HTMLElement>} Element ve kterém je grid.
         */
        private static _createHpGrid;
        /**
         * Vytvoří DataView příloh emailu.
         *
         * @author TFeik
         * @date    08.10.2018
         *
         * @param {WebClient.GPrilohaEmailuDto[]} prilohy Data příloh emailu.
         * @returns {Data.View<WebClient.GPrilohaEmailuDto>} DataView příloh emailu.
         */
        private static _createSeznamPrilohDataView;
        /**
         * Vrátí data emailu zásilky z formuláře.
         *
         * @author TFeik
         * @date    08.10.2018
         *
         * @param {GWflDetailZasilkyHpComponentContent} content Kontent, na kterém je formulář emailu.
         * @returns {WebClient.GWflDetailZasilkyHpComponentDto} Data emailu zásilky.
         */
        private static _getFormData;
        /**
         * Vrátí data emailu zásilky do formuláře.
         *
         * @author TFeik
         * @date    08.10.2018
         *
         * @param {WebClient.GWflDetailZasilkyHpComponentDto} data Data emailu zásilky.
         * @param {GWflDetailZasilkyHpComponentContent} content Kontent, na kterém je formulář emailu.
         */
        private static _setFormData;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /**
     * Interface, který musí splňovat content, pracující s componentou emailu zásilky.
     *
     * @author TFeik
     * @date    09.10.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyHpIczComponentContentRequirements extends GContent {
        EditMode?: boolean;
        Zasilka?: WebClient.GDetailZasilkyDto;
    }
    /**
     * Funkce, které komponenta přidá na content.
     *
     * @author TFeik
     * @date    09.10.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyHpIczComponentContentExtensions {
        setDetailZasilkyHpIczData: (this: GWflDetailZasilkyComponentContentRequirements, data: WebClient.GWflDetailZasilkyHpIczComponentDto) => void;
        enableDetailZasilkyHpIczForm: (this: GWflDetailZasilkyComponentContentRequirements, editMode: boolean) => void;
    }
    /**
     * Content, se kterým komponenta pracuje.
     *
     * @author TFeik
     * @date    09.10.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyHpIczComponentContent extends GWflDetailZasilkyHpIczComponentContentRequirements, GWflDetailZasilkyHpIczComponentContentExtensions {
    }
    /**
     * Komponenta Emailu zásilky.
     *
     * @author TFeik
     * @date    09.10.2018
     * @since 480.1.0.11
     */
    class GWflDetailZasilkyHpIczComponent {
        /**
         * create
         *
         * @author TFeik
         * @date   09.10.2018
         *
         * @param {any} content Content, na kterém je komponenta.
         * @param {any} componentDto Dto komponenty.
         */
        static create(content: GWflDetailZasilkyHpIczComponentContentRequirements, componentDto?: WebClient.GWflDetailZasilkyHpIczComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
        /**
         * Vytvoří ContentExtensions komponenty.
         *
         * @author TFeik
         * @date    09.10.2018
         *
         * @returns {GWflDetailZasilkyHpIczComponentContentExtensions} ContentExtensions.
         */
        private static _createContentExtensions;
        /**
         * Vytvoří taby komponenty.
         *
         * @author TFeik
         * @date    09.10.2018
         *
         * @param {WebClient.GWflDetailZasilkyHpIczComponentDto} componentDto
         * @returns {Gin.DetailBuilder.TabParamsId[]}
         */
        private static _createTabs;
        /**
         * Vytvoří akce komponenty.
         *
         * @author TFeik
         * @date    09.10.2018
         *
         * @param {GWflDetailZasilkyHpIczComponentContentRequirements} content Kontent, na kterém je komponeta.
         * @returns {(GActionParams | GAction)[]} Pole akcí.
         */
        private static _createActions;
        /**
         * Vytvoří menubar komponenty.
         *
         * @author TFeik
         * @date    09.10.2018
         *
         * @returns {Gin.DetailBuilder.GDetailBuilderMenuItemDef}
         */
        private static _createMenuBar;
        /**
         * Vytvoří formulář emailu.
         *
         * @author TFeik
         * @date    09.10.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je formulář přidán.
         * @returns {JQuery<HTMLElement>} Element ve kterém je formulář.
         */
        private static _createHpIczForm;
        /**
         * Nastaví enabled políček formuláře emailu.
         *
         * @author TFeik
         * @date    09.10.2018
         *
         * @param {boolean} isEditMode Příznak, zda je aktivní EditMode.
         */
        static enableDetailZasilkyHpIczForm(this: GWflDetailZasilkyHpIczComponentContentRequirements, isEditMode: boolean): void;
        /**
         * Nastaví data do formuláře emailu zásilky.
         *
         * @author TFeik
         * @date    31.08.2018
         *
         * @param {WebClient.GWflDetailZasilkyHpIczComponentDto} data Data emailu zásilky.
         */
        static setDetailZasilkyHpIczData(this: GWflDetailZasilkyHpIczComponentContentRequirements, data: WebClient.GWflDetailZasilkyHpIczComponentDto): void;
        /**
         * Vytvoří seznam příloh emailu.
         *
         * @author TFeik
         * @date    17.09.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {WebClient.GPrilohaEmailuDto[]} data Data příloh emailu.
         * @returns {JQuery<HTMLElement>} Element ve kterém je grid.
         */
        private static _createHpIczGrid;
        /**
         * Vytvoří DataView příloh emailu.
         *
         * @author TFeik
         * @date    09.10.2018
         *
         * @param {WebClient.GPrilohaEmailuDto[]} prilohy Data příloh emailu.
         * @returns {Data.View<WebClient.GPrilohaEmailuDto>} DataView příloh emailu.
         */
        private static _createSeznamPrilohDataView;
        /**
         * Vrátí data emailu zásilky z formuláře.
         *
         * @author TFeik
         * @date    09.10.2018
         *
         * @param {GWflDetailZasilkyHpIczComponentContent} content Kontent, na kterém je formulář emailu.
         * @returns {WebClient.GWflDetailZasilkyHpIczComponentDto} Data emailu zásilky.
         */
        private static _getFormData;
        /**
         * Vrátí data emailu zásilky do formuláře.
         *
         * @author TFeik
         * @date    09.10.2018
         *
         * @param {WebClient.GWflDetailZasilkyHpIczComponentDto} data Data emailu zásilky.
         * @param {GWflDetailZasilkyHpIczComponentContent} content Kontent, na kterém je formulář emailu.
         */
        private static _setFormData;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /**
     * Interface, který musí splňovat content, pracující s componentou interní zásilky.
     *
     * @author  TFeik
     * @date    02.02.2021
     */
    interface GWflDetailZasilkyInterniComponentContentRequirements extends GContent {
        EditMode?: boolean;
        Zasilka?: WebClient.GDetailZasilkyDto;
    }
    /**
     * Funkce, které komponenta přidá na content.
     *
     * @author  TFeik
     * @date    02.02.2021
     */
    interface GWflDetailZasilkyInterniComponentContentExtensions {
        setDetailZasilkyInterniData: (this: GWflDetailZasilkyComponentContentRequirements, data: WebClient.GWflDetailZasilkyInterniComponentDto, initialValues: boolean) => void;
        enableDetailZasilkyInterniForm: (this: GWflDetailZasilkyComponentContentRequirements, editMode: boolean) => void;
    }
    /**
     * Content, se kterým komponenta pracuje.
     *
     * @author  TFeik
     * @date    02.02.2021
     */
    interface GWflDetailZasilkyInterniComponentContent extends GWflDetailZasilkyInterniComponentContentRequirements, GWflDetailZasilkyInterniComponentContentExtensions {
    }
    /**
     * Komponenta Interniu zásilky.
     *
     * @author  TFeik
     * @date    02.02.2021
     */
    class GWflDetailZasilkyInterniComponent {
        /**
         * create
         *
         * @author  TFeik
         * @date    02.02.2021
         *
         * @param {any} content Content, na kterém je komponenta.
         * @param {any} componentDto Dto komponenty.
         */
        static create(content: GWflDetailZasilkyInterniComponentContentRequirements, componentDto?: WebClient.GWflDetailZasilkyInterniComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
        /**
         * Vytvoří ContentExtensions komponenty.
         *
         * @author  TFeik
         * @date    02.02.2021
         *
         * @returns {GWflDetailZasilkyInterniComponentContentExtensions} ContentExtensions.
         */
        private static _createContentExtensions;
        /**
         * Vytvoří taby komponenty.
         *
         * @author  TFeik
         * @date    02.02.2021
         *
         * @param {WebClient.GWflDetailZasilkyInterniComponentDto} componentDto
         * @returns {Gin.DetailBuilder.TabParamsId[]}
         */
        private static _createTabs;
        /**
         * Vytvoří formulář Interniu.
         *
         * @author  TFeik
         * @date    02.02.2021
         *
         * @returns {JQuery<HTMLElement>} Element ve kterém je formulář.
         */
        private static _createInterniForm;
        /**
         * Nastaví enabled políček formuláře Interniu.
         *
         * @author  TFeik
         * @date    02.02.2021
         *
         * @param {boolean} isEditMode Příznak, zda je aktivní EditMode.
         */
        static enableDetailZasilkyInterniForm(this: GWflDetailZasilkyInterniComponentContentRequirements, isEditMode: boolean): void;
        /**
         * Nastaví data do formuláře Interniu zásilky.
         *
         * @author  TFeik
         * @date    02.02.2021
         *
         * @param {WebClient.GWflDetailZasilkyInterniComponentDto} data Data Interniu zásilky.
         */
        static setDetailZasilkyInterniData(this: GWflDetailZasilkyInterniComponentContentRequirements, data: WebClient.GWflDetailZasilkyInterniComponentDto, initialValues: boolean): void;
        /**
         * Vytvoří seznam příloh.
         *
         * @author  TFeik
         * @date    02.02.2021
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {WebClient.GPrilohaEmailuDto[]} data Data příloh Interniu.
         * @returns {JQuery<HTMLElement>} Element ve kterém je grid.
         */
        private static _createInterniGrid;
        /**
         * Vytvoří DataView příloh Interniu.
         *
         * @author  TFeik
         * @date    02.02.2021
         *
         * @param {WebClient.GPrilohaInterniuDto[]} prilohy Data příloh Interniu.
         * @returns {Data.View<WebClient.GPrilohaInterniuDto>} DataView příloh Interniu.
         */
        private static _createSeznamPrilohDataView;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /**
     * Interface, který musí splňovat content, pracující s componentou VnoreneZasilkyu zásilky.
     *
     * @author TFeik
     * @date    03.10.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyVnoreneZasilkyComponentContentRequirements extends GContent {
        EditMode?: boolean;
        Zasilka?: WebClient.GDetailZasilkyDto;
    }
    /**
     * Funkce, které komponenta přidá na content.
     *
     * @author TFeik
     * @date    03.10.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyVnoreneZasilkyComponentContentExtensions {
    }
    /**
     * Content, se kterým komponenta pracuje.
     *
     * @author TFeik
     * @date    03.10.2018
     * @since 480.1.0.502
     */
    interface GWflDetailZasilkyVnoreneZasilkyComponentContent extends GWflDetailZasilkyVnoreneZasilkyComponentContentRequirements, GWflDetailZasilkyVnoreneZasilkyComponentContentExtensions {
    }
    /**
     * Komponenta VnoreneZasilkyu zásilky.
     *
     * @author TFeik
     * @date    03.10.2018
     * @since 480.1.0.11
     */
    class GWflDetailZasilkyVnoreneZasilkyComponent {
        /**
         * create
         *
         * @author TFeik
         * @date    03.10.2018
         *
         * @param {any} content Content, na kterém je komponenta.
         * @param {any} componentDto Dto komponenty.
         */
        static create(content: GWflDetailZasilkyVnoreneZasilkyComponentContentRequirements, componentDto?: WebClient.GWflDetailZasilkyVnoreneZasilkyComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase, any>>;
        /**
         * Vytvoří ContentExtensions komponenty.
         *
         * @author TFeik
         * @date    03.10.2018
         *
         * @returns {GWflDetailZasilkyVnoreneZasilkyComponentContentExtensions} ContentExtensions.
         */
        private static _createContentExtensions;
        /**
         * Vytvoří taby komponenty.
         *
         * @author TFeik
         * @date    03.10.2018
         *
         * @param {WebClient.GWflDetailZasilkyVnoreneZasilkyComponentDto} componentDto
         * @returns {Gin.DetailBuilder.TabParamsId[]}
         */
        private static _createTabs;
        /**
         * Vytvoří akce komponenty.
         *
         * @author TFeik
         * @date    03.10.2018
         *
         * @param {GWflDetailZasilkyVnoreneZasilkyComponentContentRequirements} content Kontent, na kterém je komponeta.
         * @returns {(GActionParams | GAction)[]} Pole akcí.
         */
        private static _createActions;
        /**
         * Vytvoří menubar komponenty.
         *
         * @author TFeik
         * @date    03.10.2018
         *
         * @returns {Gin.DetailBuilder.GDetailBuilderMenuItemDef}
         */
        private static _createMenuBar;
        /**
         * Vytvoří seznam příloh VnoreneZasilkyu.
         *
         * @author TFeik
         * @date    03.10.2018
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je grid přidán.
         * @param {WebClient.GPrilohaVnoreneZasilkyDto[]} data Data příloh VnoreneZasilkyu.
         * @returns {JQuery<HTMLElement>} Element ve kterém je grid.
         */
        private static _createVnoreneZasilkyGrid;
        /**
         * Vytvoří DataView vnořených zásilek na DataView.
         *
         * @author TFeik
         * @date    03.10.2018
         *
         * @param {WebClient.GVnorenaZasilkaDto[]} data Data vnořených zásilek.
         * @returns {Data.View<WebClient.GVnorenaZasilkaDto>} DataView vnořených zásilek.
         */
        private static _createVnorenaZasilkyDataView;
    }
}
declare namespace Gordic.Wfl.DetailBuilderComponents {
    /**
      * Interface, který musí splňovat content, pracující s componentou doručení zásilky.
      *
      * @author  TFeik
      * @date    04.06.2019
      * @since   482.1.0.453
      */
    interface GWflDoruceniZasilkyComponentContentRequirements extends GContent {
        DoruceniZasilky?: Interface.GDoruceniZasilkyDto;
        IsSaved?: boolean;
    }
    /**
     * Funkce, které komponenta přidá na content.
     *
     * @author  TFeik
     * @date    04.06.2019
     * @since   482.1.0.453
     */
    interface GWflDoruceniZasilkyComponentContentExtensions {
        tryReloadDetail: (this: GWflDoruceniZasilkyComponentContent, params?: any, opt?: any) => void;
        reloadDetail: (this: GWflDoruceniZasilkyComponentContent, params?: any, opt?: any) => void;
        beforeReloadDetail: (this: GWflDoruceniZasilkyComponentContent) => JQueryPromise<undefined>;
        reload: (this: GWflDoruceniZasilkyComponentContent, opt?: any) => void;
        zmenaEditace: (this: GWflDoruceniZasilkyComponentContent, componentDto: WebClient.GWflDoruceniZasilkyComponentDto, opt?: any) => void;
        setDoruceniZasilkyData: (this: GWflDoruceniZasilkyComponentContentRequirements, data: Interface.GDoruceniZasilkyDto) => JQuery.Promise<void>;
        getDoruceniZasilkyData: (this: GWflDoruceniZasilkyComponentContentRequirements) => Interface.GDoruceniZasilkyDto;
        enableDoruceniZasilky: (this: GWflDoruceniZasilkyComponentContentRequirements, editMode: boolean, permissions: Interface.GDoruceniZasilkyPermissionDto) => void;
        /**
         * Nastaví enabled na akce pro datum doručení.
         *
         * @author  TFeik
         * @date    24.05.2022
         *
         * @param {GWflDoruceniZasilkyComponentContentRequirements} this
         * @param {Interface.GDoruceniZasilkyActionsPermissionDto} permissions
         * @param {Gordic.Ginis.DbModel.GWflcsdoEnum | null} [stavDoruceni] Stav doručení. Pokud není poslán, pak se načte z políčka.
         */
        enableDatumDoruceniAction: (this: GWflDoruceniZasilkyComponentContentRequirements, permissions: Interface.GDoruceniZasilkyActionsPermissionDto, stavDoruceni?: Gordic.Ginis.DbModel.GWflcsdoEnum | null) => void;
        /**
         * Uloží data o doručení.
         *
         * @author  TFeik
         * @date    06.10.2021
         *
         * @param {GWflDoruceniZasilkyComponentContent} content
         */
        ulozDoruceni: (this: GWflDoruceniZasilkyComponentContent, componentDto: WebClient.GWflDoruceniZasilkyComponentDto) => JQuery.Promise<void>;
        /**
         * Nastaví datum doručení jako dnešní datum.
         *
         * @author  TFeik
         * @date    24.05.2022
         *
         * @param {GWflDoruceniZasilkyComponentContent} this
         * @returns {JQuery.Promise<void>}
         */
        setDatumUlozeniDnes: (this: GWflDoruceniZasilkyComponentContent) => JQuery.Promise<void>;
        /**
         * Nastaví datum doručení jako datum doruceni
         *
         * @author  TFeik
         * @date    24.05.2022
         *
         * @param {GWflDoruceniZasilkyComponentContent} this
         * @returns {JQuery.Promise<void>}
         */
        setDatumUlozeniDleDataDoruceni: (this: GWflDoruceniZasilkyComponentContent) => JQuery.Promise<void>;
        /**
         * ulozit datumu (doručení a uložení) do přednastavení
         *
         * @author  TFeik
         * @date    24.05.2022
         *
         * @param {GWflDoruceniZasilkyComponentContent} this
         * @returns {JQuery.Promise<void>}
         */
        saveDatumSettings: (this: GWflDoruceniZasilkyComponentContent) => JQuery.Promise<void>;
    }
    /**
     * Content, se kterým komponenta pracuje.
     *
     * @author  TFeik
     * @date    04.06.2019
     * @since   482.1.0.453
     */
    interface GWflDoruceniZasilkyComponentContent extends GWflDoruceniZasilkyComponentContentRequirements, GWflDoruceniZasilkyComponentContentExtensions {
    }
    /**
     * Komponenta doručení zásilky.
     *
     * @author  TFeik
     * @date    04.06.2019
     * @since   482.1.0.453
     */
    class GWflDoruceniZasilkyComponent {
        /**
         * create
         *
         * @author  TFeik
         * @date    04.06.2019
         *
         * @param {GWflDoruceniZasilkyComponentContentRequirements} content Content, na kterém je komponenta.
         * @param {WebClient.GWflDoruceniZasilkyComponentDto} [componentDto] Dto komponenty.
         * @returns {Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GContent<IGContentBase}
         */
        static create(content: GWflDoruceniZasilkyComponentContent, componentDto?: WebClient.GWflDoruceniZasilkyComponentDto): Gordic.Gin.DetailBuilder.GDetailBuilderComponent<GWflDoruceniZasilkyComponentContent>;
        /**
         * Vytvoří ContentExtensions komponenty.
         *
         * @author  TFeik
         * @date    04.06.2019
         *
         * @returns {GWflDoruceniZasilkyComponentContentExtensions} ContentExtensions.
         */
        private static _createContentExtensions;
        /**
         * Vytvoří taby komponenty.
         *
         * @author  TFeik
         * @date    04.06.2019
         *
         * @param {WebClient.GWflDoruceniZasilkyComponentDto} componentDto
         * @returns {Gin.DetailBuilder.TabParamsId[]}
         */
        private static _createTabs;
        /**
         * Vytvoří akce komponenty.
         *
         * @author  TFeik
         * @date    04.06.2019
         *
         * @param {GWflDoruceniZasilkyComponentContentRequirements} content Kontent, na kterém je komponeta.
         * @returns {(GActionParams | GAction)[]} Pole akcí.
         */
        private static _createActions;
        /**
         * Vytvoří menubar komponenty.
         *
         * @author  TFeik
         * @date    04.06.2019
         *
         * @returns {MenuParams[]}
         */
        private static _createMenuBar;
        /**
         * Vytvoří commandbar komponenty.
         *
         * @author  TFeik
         * @date    04.06.2019
         *
         * @param {boolean} isEditMode
         * @returns {MenuParams[]}
         */
        private static _createCommandBar;
        /**
         * Aktualizuje názvy políček ve formuláři.
         *
         * @author  TFeik
         * @date    15.10.2024
         *
         */
        private static _updateFormLabels;
        /**
         * Vytvoří formulář emailu.
         *
         * @author  TFeik
         * @date    04.06.2019
         *
         * @param {JQuery<HTMLElement>} appentTo Element do kterého je formulář přidán.
         * @returns {JQuery<HTMLElement>} Element ve kterém je formulář.
         */
        private static _createForm;
        /**
         * _createHeaderForm
         *
         * @author  TFeik
         * @date    25.06.2019
         *
         * @param {Interface.GDoruceniZasilkyDto} doruceniZasilkyDto
         * @returns {Forms.Form}
         */
        private static _createHeaderForm;
        /**
         * Nastaví enabled políček formuláře datové zprávy.
         *
         * @author  TFeik
         * @date    04.06.2019
         *
         * @param {boolean} isEditMode Příznak, zda je aktivní EditMode.
         */
        static enableDoruceniZasilky(this: GWflDoruceniZasilkyComponentContentRequirements, isEditMode: boolean, permissions: Interface.GDoruceniZasilkyPermissionDto): void;
        /**
         * Nastaví enabled na akce pro datum doručení.
         *
         * @author  TFeik
         * @date    24.05.2022
         *
         * @param {GWflDoruceniZasilkyComponentContentRequirements} this
         * @param {Interface.GDoruceniZasilkyActionsPermissionDto} permissions
         * @param {Gordic.Ginis.DbModel.GWflcsdoEnum | null} [stavDoruceni] Stav doručení. Pokud není poslán, pak se načte z políčka.
         */
        static enableDatumUlozeniAction(this: GWflDoruceniZasilkyComponentContentRequirements, permissions: Interface.GDoruceniZasilkyActionsPermissionDto, stavDoruceni?: Ginis.DbModel.GWflcsdoEnum | null): void;
        /**
         * Nastaví data do formuláře doručení zásilky.
         *
         * @author  TFeik
         * @date    04.06.2019
         *
         * @param {WebClient.GWflDoruceniZasilkyComponentDto} data Data doručení zásilky.
         */
        static setDoruceniZasilkyData(this: GWflDoruceniZasilkyComponentContentRequirements, data: Interface.GDoruceniZasilkyDto): JQuery.Promise<void>;
        /**
         * Vrátí z formuláře data doručení zásilky.
         *
         * @author  TFeik
         * @date    04.06.2019
         *
         * @param {GWflDoruceniZasilkyComponentContentRequirements} this
         * @returns {Interface.GDoruceniZasilkyDto} Data doručení zásilky.
         */
        static getDoruceniZasilkyData(this: GWflDoruceniZasilkyComponentContentRequirements): Interface.GDoruceniZasilkyDto;
        static tryReloadDetail(this: GWflDoruceniZasilkyComponentContent, params?: any, opt?: any): void;
        static reloadDetail(this: GWflDoruceniZasilkyComponentContent, params?: any, opt?: any): void;
        static beforeReloadDetail(this: GWflDoruceniZasilkyComponentContent): JQueryPromise<undefined>;
        static zmenaEditace(this: GWflDoruceniZasilkyComponentContent, componentDto: WebClient.GWflDoruceniZasilkyComponentDto, opt?: any): void;
        static reload(this: GWflDoruceniZasilkyComponentContent, opt?: any): void;
        /**
         * Upraví enabled na datových políčkách dle stavu doručení.
         *
         * @author  TFeik
         * @date    15.01.2021
         *
         * @param {GWflDoruceniZasilkyComponentContent} content
         * @param {Interface.GDoruceniZasilkyFieldsPermissionDto} fieldPermissionsOriginal
         * @param {Gordic.Ginis.DbModel.GWflczpdEnum} zpusobDoruceni
         * @param {Gordic.Ginis.DbModel.GWflcsdoEnum} stavDoruceni
         */
        static updateFieldsEnabled(content: GWflDoruceniZasilkyComponentContent, fieldPermissionsOriginal: Interface.GDoruceniZasilkyFieldsPermissionDto, stavDoruceni: Ginis.DbModel.GWflcsdoEnum, dbCulture: number | undefined | null): void;
        /**
         * Uloží data o doručení.
         *
         * @author  TFeik
         * @date    06.10.2021
         *
         * @param {GWflDoruceniZasilkyComponentContent} content
         */
        static ulozDoruceni(this: GWflDoruceniZasilkyComponentContent, componentDto: WebClient.GWflDoruceniZasilkyComponentDto): JQuery.Promise<void>;
        /**
         * Nastaví datum uložení jako dnešní datum.
         *
         * @author  TFeik
         * @date    24.05.2022
         *
         * @param {GWflDoruceniZasilkyComponentContent} this
         * @returns {JQuery.Promise<void>}
         */
        static setDatumUlozeniDnes(this: GWflDoruceniZasilkyComponentContent): JQuery.Promise<void>;
        /**
         * Nastaví datum uložení dle data doručení.
         *
         * @author  TFeik
         * @date    24.05.2022
         *
         * @param {GWflDoruceniZasilkyComponentContent} this
         * @returns {JQuery.Promise<void>}
         */
        static setDatumUlozeniDleDataDoruceni(this: GWflDoruceniZasilkyComponentContent): JQuery.Promise<void>;
        /**
         * Nastaví datum uložení dle data doručení.
         *
         * @author  TFeik
         * @date    24.05.2022
         *
         * @param {GWflDoruceniZasilkyComponentContent} this
         * @returns {JQuery.Promise<void>}
         */
        static saveDatumSettings(this: GWflDoruceniZasilkyComponentContent): JQuery.Promise<void>;
    }
}
declare namespace Gordic.Wfl.Dlg {
    class HledaniZasilekDleIdDlg extends GContentBase<Wfl.AC.WflBaseAC> {
        model: Wfl.Interface.GHledaniZasilekDleIdDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
        SetField(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class HledaniZasilekListAC extends GContentBase<WflZasilkyListBaseAC> {
        TypHledacky: Wfl.Interface.TypHledani;
        onContentReady(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class InfoOZasilkachHPAC extends GContentBase<WflListBaseAC> {
        data: Gordic.Wfl.Interface.GDoruceniHPDto[];
        onContentReady(): void;
        SetData(): void;
        CreateGrid(): void;
        LoadData(): void;
        ReloadData(): void;
        DelegateStav(): GGridColumn<any>;
        DelegateJevHP(): GGridColumn<any>;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class PrehledVsechZasilekAC extends GContentBase<WflZasilkyListBaseAC> {
        onContentReady(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class PrehledZasilekKPrevzetiAC2 extends GContentBase<WflZasilkyListBaseAC> {
        onContentReady(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class SdruzeneZasilkyListAC extends GContentBase<WflZasilkyListBaseAC> {
        SXSNadrizene: string | null | undefined;
        TypSdruzenychZasilekProp: Gordic.Wfl.Interface.TypSdruzenychZasilekEnum;
        data: Gordic.Wfl.Interface.GZasilkyListDto[];
        updateData(row: Gordic.Wfl.Interface.GZasilkyListDto, Typ: Gordic.Wfl.Interface.TypSdruzenychZasilekEnum): void;
        onContentReady(): void;
        CreateGrid(): void;
        SetData(): void;
        LoadData(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class SeznamZasilekProVyberList extends GContentBase<WflZasilkyListBaseAC> {
        data: Interface.GZasilkaDto[];
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class VraceneDodejkyAC extends GContentBase<WflZasilkyListBaseAC> {
        onContentReady(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class VyberZasilkyListAC extends GContentBase<WflZasilkyListBaseAC> {
        data: Interface.GZasilkaDto[];
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class ZasilkyKPrevzetiAC extends GContentBase<WflZasilkyListBaseAC> {
        onContentReady(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class ZasilkyKVypraveniAC extends GContentBase<WflZasilkyListBaseAC> {
        onContentReady(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class ZasilkyMultiTaskAC extends GContentBase<WflZasilkyListBaseAC> {
        onContentReady(): void;
        LoadData(filtr?: Interface.GSeznamZasilekFilterDto): void;
        ReloadData(): void;
        SetSubtask(typ: Wfl.Interface.TypSeznamuZasilek): void;
        CreateActionSubtask(typ: Wfl.Interface.TypSeznamuZasilek): GAction;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class ZasilkyPripraveneAC extends GContentBase<WflZasilkyListBaseAC> {
        onContentReady(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    function DelegateTypZasilkyIcon(): GGridColumn<any>;
    function DelegateSablonaZasilkyIcon(): GGridColumn<any>;
    function SouborObrMToIconTemplate(soubor_obr_m: string | undefined | null): IconTemplate | undefined | null;
    function DelegateNevytisknuteDorucenkyDZ(): GGridColumn<any>;
    class WflZasilkyListBaseAC extends GContentBase<WflListBaseAC> {
        IfRedistribuce: boolean;
        model: Interface.GSeznamZasilekFilterDto;
        ImageDelegateStavZasilky: ObjectLiteral<Gordic.Wfl.WebClient.GIcon>;
        typSdruzenychZasilek?: Gordic.Wfl.Interface.TypSdruzenychZasilekEnum;
        TypAutorizacePredani: Gordic.Wfl.Interface.TypAutorizacePredani;
        PovolenoHromadneSdruzeni: boolean;
        PovolenoHKP: boolean;
        static InitList(content: GContentType<WflZasilkyListBaseAC>): void;
        static CreateActions(content: GContentType<WflZasilkyListBaseAC>): void;
        static CreateActionDetailEsuNad(content: GContentType<WflListBaseAC>, favorite?: boolean): GAction;
        static CreateActionsPosunRadku(content: GContentType<WflZasilkyListBaseAC>): void;
        static LoadDataZasilek(content: GContentType<WflZasilkyListBaseAC>, filtr?: Interface.GSeznamZasilekFilterDto): void;
        static AddBaseActionsZasilekToMenu(content: GContentType<WflZasilkyListBaseAC>): void;
        static ReloadDataZasilek(content: GContentType<WflZasilkyListBaseAC>): void;
        static CreateActionPredatZasilky(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionZnovuodeslatZasilky(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionPrevzitZasilky(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionUlozitZmenyZasilek(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static UlozData(content: GContentType<WflZasilkyListBaseAC>, akce: GAction): void;
        static CreateActionZastavitZasilky(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionPripravitKpredani(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionOdstranitZasilky(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionOznacitJakoZnovuzpracovane(content: GContentType<WflZasilkyListBaseAC>): GAction;
        static CreateActionHromadnaOpravaZasilek(content: GContentType<WflZasilkyListBaseAC>): GAction;
        static CreateActionStornovatZasilky(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionSdruzitZasilky(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionRozebratZasilky(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionOdeslatZasilky(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionDoruceniZasilky(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static OpenDoruceniZasilky(content: GContentType<WflZasilkyListBaseAC>, SXS: string, mode: Wfl.WebClient.GDoruceniZasilkyDlgMode): JQuery.Promise<WebClient.GDoruceniZasilkyDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
        static CreateActionZnovuOdeslatZasilku(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionInfoZasilky(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionServisniSeznamDZ(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionTriditDleID(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionPosunRadku(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean, typPosunu?: Interface.TypPosunu): GAction;
        static CreateActionTiskDorucenekDZ(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static TiskDorucenekDZ(content: GContentType<WflZasilkyListBaseAC>, selectedSXS: string[], event?: JQueryEventObject): void;
        static UlozitInfoOTiskuDorDZ(content: GContentType<WflZasilkyListBaseAC>, selectedSXS: string[]): void;
        static CreateActionTiskProtokoluOdeslani(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static TiskProtokoluOdeslani(content: GContentType<WflZasilkyListBaseAC>, selectedSXS: string[], event?: JQueryEventObject): void;
        static CreateActionTiskObalek(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static CreateActionTiskPredavacihoProtokoluZasilek(content: GContentType<WflZasilkyListBaseAC>, favorite?: boolean): GAction;
        static JeOznacenaFyzickaZasilka(selectedRows: Interface.GZasilkyListDto[]): boolean;
        static GetIconPosunu(typPosunu?: Interface.TypPosunu): string;
        static GetTextPosunu(typPosunu?: Interface.TypPosunu): string;
        static PosunRadku(content: GContentType<WflZasilkyListBaseAC>, typPosunu?: Interface.TypPosunu): void;
        static GetSelectedGZasilkaEditListDto(content: GContentType<WflZasilkyListBaseAC>): Wfl.Interface.GZasilkaEditListDto[];
        static TriditDleID(content: GContentType<WflZasilkyListBaseAC>, prvniVolani: boolean): void;
        static GetSXSRowByIDDorucenky(content: GContentType<WflZasilkyListBaseAC>, id_dorucenky: string): string;
        static DoAkceZasilek(content: GContentType<WflZasilkyListBaseAC>, Typ: Wfl.Interface.TypAkceZasilek): void;
        static CallAkce(content: GContentType<WflZasilkyListBaseAC>, Selected: Gin.Interface.GIxsDateTime[], Typ: Wfl.Interface.TypAkceZasilek): void;
        static CallAkceSdruzit(content: GContentType<WflZasilkyListBaseAC>, Selected: Gin.Interface.GIxsDateTime[]): void;
        static DoAfterSdruzeni(content: GContentType<WflZasilkyListBaseAC>, SxsAktRadku: string): void;
        static CallDoAkceZasilek(content: GContentType<WflZasilkyListBaseAC>, Selected: Gin.Interface.GIxsDateTime[], Typ: Wfl.Interface.TypAkceZasilek): void;
        static SetObsahSdruzeneZasilky(content: WflZasilkyListBaseAC, typ: Gordic.Wfl.Interface.TypSdruzenychZasilekEnum): void;
        static CreateGridSdruzeneZasilek(content: WflZasilkyListBaseAC, typ: Gordic.Wfl.Interface.TypSdruzenychZasilekEnum): void;
        static LoadPreview: ((content: GContentType<Wfl.ListAC.WflZasilkyListBaseAC>, row: Gordic.Wfl.Interface.GZasilkyListDto) => void) & {
            cancel: () => void;
            flush: () => void;
            pending: () => boolean;
        };
        static ClearSdruzene: ((content: GContentType<Wfl.ListAC.WflZasilkyListBaseAC>) => void) & {
            cancel: () => void;
            flush: () => void;
            pending: () => boolean;
        };
        static ClearDataObsahu(content: GContentType<Wfl.ListAC.WflZasilkyListBaseAC>): void;
        static SetVisibleAction(content: GContentType<WflZasilkyListBaseAC>): void;
        static CreateActionDetailZasilky(content: WflListBaseAC): GAction;
        static CreateList(content: GContentType<WflZasilkyListBaseAC>): void;
        static CreateFilterForms(content: GContentType<WflZasilkyListBaseAC>): Gordic.Forms.Form[];
        static CreateGridZasilek(content: GContentType<WflZasilkyListBaseAC>): void;
        static CreateGridBaseZasilek(content: GContentType<WflZasilkyListBaseAC>): void;
        static AddColumnIdDorucenky(gf: Gordic.Data.GridFormat): void;
        static AddColumnDatUlozeni(gf: Gordic.Data.GridFormat): void;
        static AddColumnDatPotvzeni(gf: Gordic.Data.GridFormat): void;
        static GetSxsArrayFromSelection(content: GContentType<WflZasilkyListBaseAC>): string[];
        static GetSxsArrayDatovychZpravFromSelection(content: GContentType<WflZasilkyListBaseAC>): string[];
        static TiskPredavacihoProtokoluZasilek(content: GContentType<WflZasilkyListBaseAC>, ifPredat: boolean): void;
        static TiskProtokoluSdruzeniZasilek(content: GContentType<WflZasilkyListBaseAC>, SxsAktRadku: string): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class GPrehledZasilekDleIdAC extends GContentBase<WflZasilkyListBaseAC> {
        private _$fileField;
        DatumDoruceni: Date;
        onContentReady(): void;
        addFileDoc(): void;
        private _addFile;
        CreateForm(): Forms.Form;
        CreateActionNacistZeSouboru(): GAction;
        CreateActionSetDatumDoruceni(): GAction;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    class PredaniZasilekDlg extends GContentBase {
        model: Gordic.Wfl.Client.GPredaniZasilekDto;
        validators: any;
        autorizace: boolean;
        LogPorCislo: string;
        ResultInfo: Gin.Interface.GResultInfo[];
        onContentReady(): void;
        OKClick(): void;
        PotvrzeniPredani(): void;
        Predat(): void;
        TiskPredavacihoProtokolu(): JQuery.Promise<boolean>;
        closing(retVal: any): JQueryPromise<any>;
        SpisUzelChange(): void;
        CloseWin(): void;
    }
}
declare namespace Gordic.Wfl.ListAC {
    class PrehledZasilekKPrevzetiAC extends GContentBase<WflZasilkyListBaseAC> {
        onContentReady(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Plan zverejneni smlouvy pro GWA05
     *
     * @author bmartinek
     * @since 484.2.0.456
     */
    class GWflZverejneniSmluvPlanSingle05 extends GContentBase {
        private _srv;
        private _data;
        prepareContent(options: IGWflZverejneniSmluvPlanSingle05Options): void;
        private createForm;
        private save;
    }
    interface IGWflZverejneniSmluvPlanSingle05Options {
        ixpOrig: string;
        ixsZpv: string;
        readOnly: boolean;
    }
}
declare namespace Gordic.Wfl.WebClient {
    /**
     * Zverejneni smluv pro GWA05
     *
     * @author bmartinek
     * @since 484.2.0.456
     */
    class GWflZverejneniSmluvPrehled05 extends GContentBase {
        static uid: string;
        private _options;
        private _seznamZZ;
        private _seznamZadostiGrid;
        private _seznamZadostiTab;
        private _seznamZZView;
        private _seznamZadostiView;
        private _srv;
        private _actPlanovat;
        private _actPodat;
        private _actOpravit;
        private _actPridatPrilohu;
        private _actZrusit;
        private _actRefresh;
        private _actDetail;
        private _actVlastnosti;
        private _actDokoncit;
        private _actStorno;
        prepareContent(options: IGWflZverejneniSmluvPrehled05Options): void;
        private createSeznamZZGridFormat;
        private downloadDZOdpoved;
        private createSeznamZadostiGridFormat;
        private loadMasterData;
        private loadSlaveData;
        private updateContentActionsState;
        private updateTabActionsState;
        private planovat;
        private podatZahajit;
        private opravit;
        private pridatPrilohu;
        /** Otevre vlastnosti + nasledne serverove dokonceni + reload master-gridu */
        private podatDokoncit;
        /** Otevre vlastnosti + nasledne serverove dokonceni + reload master-gridu */
        private opravitDokoncit;
        /** Otevre vlastnosti + nasledne serverove dokonceni + reload master-gridu */
        private pridatPrilohuDokoncit;
        private zrusit;
        private storno;
        private openVlastnosti;
    }
    interface IGWflZverejneniSmluvPrehled05Options {
        /** Ixp */
        ixp: string;
        /** Aktualne vybrane IxsZpv */
        ixsZpv?: string;
        /** ReadOnly rezim */
        readOnly?: boolean;
        /** Přístup k tlačítku Zveřejnit */
        pristupKeZverejnit?: boolean;
        /** Přístup k tlačítku Schválit */
        pristupKeSchvalit?: number;
        /** Plán zveřejnění */
        planZverejneni?: number;
    }
    /** Vstupní dto pro detail zveřejnění*/
    interface IGWflZverejneniSmluvDetailOptions {
        /** Identifikátor dokumentu */
        Ixp: string;
        /** Aktuálně vybraný řádek*/
        CurrentDataRowZs?: GZverejneniSmluvSeznamDto;
        /**změním stav -> 60, pro způsoby, které mají jenom zahájení a jsou ve stavu zveřejněno */
        PseudoStorno?: boolean;
        /**Typ agendy*/
        TypAg?: number;
        /**nadřazená žádost ke zveřejnění */
        NadRow?: GZverejneniSmluvSeznamDto;
        /** Přístup k tlačítku Schválit */
        PristupKeSchvalit?: number;
        /** Přístup k tlačítku Zveřejnit */
        PristupKeZverejnit?: number;
        /** ReadOnly rezim */
        ReadOnlyRezim?: boolean;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GZverejneniSmluvPlanSingleDlgInputParams {
        /** Identifikátor zveřejňovaného originálu*/
        ixp_orig: string;
        /** Identifikátor způsobu zveřejnění */
        ixs_zpv: string;
    }
    interface GZverejneniSmluvPlanSingleDlgOutputParams {
        /** Zda došlo ke změně v dialogu */
        changed?: boolean;
    }
    /** Zveřejnění smluv - Dialog plánování zveřejnění */
    class GZverejneniSmluvPlanSingle extends GContentBase implements IGClientContent {
        /** Identifikátor zveřejňovaného originálu*/
        ixp_orig: string;
        /** Identifikátor způsobu zveřejnění */
        ixs_zpv: string;
        private data;
        private $form;
        prepareContent(options: GZverejneniSmluvPlanSingleDlgInputParams): void;
        /** Vytvoření akcí contentu */
        private createActions;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /** Vytvoření formuláře contentu */
        private createForm;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GZverejneniSmluvPrehledDlgInputParams {
        /** Identifikátor dokumentu*/
        Ixp: string;
        /** ReadOnly režim */
        ReadOnlyRezim?: boolean;
        /** Přístup k tlačítku Zveřejnit */
        PristupKeZverejnit?: number;
        /** Plán zveřejnění */
        PlanZverejneni?: number;
        /** Přístup k tlačítku Schválit */
        PristupKeSchvalit?: number;
    }
    interface GZverejneniSmluvPrehledDlgOutputParams {
        /** Příznak, zda došlu ke změně ve zveřejnění */
        changed?: boolean;
    }
    /** Content se seznamem zveřejnění (smluv) pro jednotlivé způsoby zveřejnění */
    class GZverejneniSmluvPrehled extends GContentBase implements GZverejneniSmluvPrehledDlgInputParams {
        /** Identifikátor dokumentu*/
        Ixp: string;
        /** ReadOnly režim */
        ReadOnlyRezim: boolean;
        /** Přístup k tlačítku Zveřejnit */
        PristupKeZverejnit: number;
        /** Plán zveřejnění */
        PlanZverejneni: number;
        /** Přístup k tlačítku Schválit */
        PristupKeSchvalit: number;
        /** Seznam způsobů zveřejnění */
        private tableZZ;
        /** Seznam způsobů zveřejnění plán (master) */
        private tableZS;
        /** Možná hláška při loadu (NastavStavovyRadek)*/
        private startUpInfo;
        /** TypAg originálního dokladu*/
        private typAg;
        private ixs_fun;
        /** DB parametr - GIN ZVE - zjednodušené zveřejnění s minimálním zásahem uživatele*/
        private gin_zve_easy;
        /** Hlavní cardpanel s druhy zveřejnění */
        private $cardPanel?;
        /** Tab se seznamem jednotlivých žádostí */
        private $tabZadosti?;
        /** Grid se seznamem jednotlivých žádostí */
        private $gridZadosti?;
        /** Preview controller pro sidebar se soubory způsobu zveřejnění */
        private previewControllerZveSoubory;
        /** Preview controller pro sidebar se soubory/přílohy jednotlivých zveřejnění */
        private previewControllerPrilohy;
        /** Aktuálně vybraná karta (způsob zveřejnění)*/
        private masterRowAkt;
        /** Příznak, zda nastala nějaká změna za životní cyklus contentu */
        private changed?;
        /** Zapamatování posledního zvoleného způsobu zveřejnění pro vybrání po reloadu contentu */
        private prev_selected_ixs_zpv?;
        /** Uložení příznaku, že došlo k podání nové žádosti a po návratu z detailu má být proveden reload */
        private new_document_created?;
        closing(): GZverejneniSmluvPrehledDlgOutputParams;
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření menubaru */
        private createMenuBar;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /** Vytvoření hlavního cardpanelu s jednotlivými způsoby zveřejněn*/
        private createMasterCardPanel;
        /** Vytvoření tabu pro poddřízený grid */
        private createSlaveTab;
        /** Vytvoření podřízeného gridu s jednotlivými žádostmi */
        private createSlaveGrid;
        /** Vytvoření sidebarů (subcontentů)*/
        private createSideBars;
        /** Vytvoření gridformátu pro klasické žádosti o zveřejnění */
        private createZverejneniZadostiGridFormat;
        /** Vytvoření gridformátu pro úřední desku bez žádosti zveřejnění */
        private createZverejneniUdeBezGridFormat;
        /** Vytvoření gridformátu pro export souborů bez žádosti zveřejnění */
        private createZverejneniExportBezGridFormat;
        /** Vytvoření/transformace dat pro jednotlivé karty */
        private createDataForMasterKPIPanel;
        /** Obsluha akce Zahájit/Podat*/
        private akcePodat;
        /** Obsluha akce Přidat přílohu*/
        private akcePridatPrilohu;
        /** Obsluha akce Odebrat přílohu*/
        private akceOdebratPrilohu;
        /** Obsluha akce Zrušit/Aktualizovat*/
        private akceAktualizace;
        /** Otevření dialogu pro vyplnění a editaci vlastností */
        private openVlastnosti;
        /** Obsluha akce Zrušit*/
        private akceStornoZverejneni;
        /** Obsluha akce Stahnout*/
        private akceStahnout;
        /** Doplnění permissions seznamu způsobů o klientské podmínky */
        private completePermissions;
        /**
         * Nastavení povolení a zobrazení akcí při změně způsobu zveřejnění (kpi selection)
         * @param typZobrazeni
         */
        private setGridActionsVisibility;
        /**
         * Zjištění, zda je možno schválit vzhledem k funkci
         * @param row
         * @returns
         */
        static MoznoSchvalit(row: any, PristupKeSchvalit: number): boolean;
        /**
         * Zjištění, zda je možno zveřejnit vzhledem k funkci
         * @param row
         * @param PristupKeZverejnit
         * @param ixs_fun
         * @param ixs_fun_akt_orig
         * @returns
         */
        static MoznoZverejnit(row: any, PristupKeZverejnit: number, ixs_fun: string, ixs_fun_akt_orig: any): boolean;
    }
}
declare namespace Gordic.Wfl.WebClient {
    interface GZverejneniSmluvZverejnenoProtistranouDlgInputParams {
        /** Identifikátor zveřejňovaného originálu*/
        ixp_orig: string;
        /** Identifikátor způsobu zveřejnění */
        ixs_zpv: string;
    }
    interface GZverejneniSmluvZverejnenoProtistranouDlgOutputParams {
        /** Zda došlo ke změně v dialogu */
        changed?: boolean;
    }
    /** Zveřejnění smluv - Dialog zadání zveřejnění protistrannou */
    class GZverejneniSmluvZverejnenoProtistranou extends GContentBase implements IGClientContent {
        /** Identifikátor zveřejňovaného originálu*/
        ixp_orig: string;
        /** Identifikátor způsobu zveřejnění */
        ixs_zpv: string;
        private data;
        private $form;
        prepareContent(options: GZverejneniSmluvPlanSingleDlgInputParams): void;
        /** Vytvoření akcí contentu */
        private createActions;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /** Vytvoření formuláře contentu */
        private createForm;
    }
}
