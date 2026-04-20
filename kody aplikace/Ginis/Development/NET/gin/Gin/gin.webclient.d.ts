declare namespace Gordic.Gin.Dialogs {
    /**
     * [OBSOLITE] Použijte "Gordic.Gui.Dialogs._openDialog".
     * [INTERNAL] Pouze pro použití v Gordic.Gin/Esu/Wfl/Ssl/.../.Dialogs! Neslouží k otevření samostatného dialogu!
     * Vnitřní funkce pro zjednodušení obsluhy otevírání dialogů
     *
     * @auth TFeik
     * @date 12.03.2018
     *
     * @param {GContent | GDlgNamespace} pContent Nadřazený content.
     * @param {JQueryDeferred<TOutputData>} deferred Deferred zavření dialogu.
     * @param {string} dialogName Název (class) dialogu včetně namespace. Pokud je předáván v poli s dalšími parametry, pak musí být jméno na prvním místě pole (index 0).
     * @param {Gordic.Gin.Globals.Enums.ModOtevreni} modOtevreni Mód otevření dialogu.
     * @param {any} options Options contentu (ID, JsonProperty).
     * @param {GDialogOptions} windowParams Options dialogu.
     * @returns
     */
    function _openDialog<TOutputData>(pContent: GContent | GDlgNamespace, deferred: JQueryDeferred<TOutputData>, dialogName: string | (string | ObjectLiteral<any>)[] | IGClientContentObject, modOtevreni: Gordic.Gin.Globals.Enums.ModOtevreni, options?: any, windowParams?: GDialogOptions): JQueryDeferred<TOutputData>;
    /**
      * @author  Dsebesta
      * @date    25.10.2017
      * @param  {gcontent}                              parentContent                       The parentContent.
      * @param  {object}                                opt                                 Parametry dialogu.
      * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
      * @return .
      */
    function VyberSubjektuIsuDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    enum ISUSkupinyWorkingMode {
        /**
         * Běžný režim - neprobíhá automatické označení subjektů.
         */
        Normal = 0,
        /**
         * Režim výběru subjektů - při výběru skupiny probíhá automatické označení všech subjektů ze skupiny.
         */
        Select = 1
    }
    /**
      *
      * @author  Dsebesta
      * @date    25.10.2017
      
      * @param  {gcontent}                              parentContent                       The parentContent.
      * @param  {object}                                opt                                 Parametry dialogu.
      * @param  {ISUSkupinyWorkingMode}                 opt.SkupinyWorkingMode              ISUSkupinyWorkingMode
      * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
      * @return
      */
    function RozdelovnikISUDlg(parentContent: GContent, opt?: {
        /**
         * ISUSkupinyWorkingMode.
         */
        SkupinyWorkingMode?: ISUSkupinyWorkingMode;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     *
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.IxsSsu                          Ixsrzd skupiny pokud bude null pujde o založení nové skupiny a opt.TypSkupiny bude povinný
     * @param  {int}                                   opt.TypSkupiny                      TypSkupiny pouze pro zakládání nového.
     * @param  {bool}                                  opt.Editace                         Editace
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function DetailRozdelovnikuISUDlg(parentContent: GContent, opt?: {
        /**
         * Ixsrzd skupiny pokud bude null pujde o založení nové skupiny a opt. TypSkupiny bude povinný.
         */
        IxsSsu?: string;
        /**
         * TypSkupiny pouze pro zakládání nového.
         */
        TypSkupiny?: number;
        /**
         * Editace.
         */
        Editace?: boolean;
        /**
         * NovaSkupina.
         */
        NovaSkupina?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    interface IDpo {
        /**
         * ixs_dpo.
         */
        ixs_dpo: string;
        /**
         * nazev.
         */
        nazev: string;
    }
    /**
  * @author  RTomes
  * @date    27.04.2018
  * @param  {gcontent}                              parentContent                       The parentContent.
  * @param  {object}                                opt                                 Parametry dialogu.
  * @param  {array}                                 opt.DpoList                         Pole radku duvodu podpisu k zobrazeni v seznamu
  * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
  * @return .
  */
    function VyberDuvoduPodpisu(parentContent: GContent, opt?: {
        DpoList?: IDpo[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Otevře dialog výběru souboru.
     *
     * @author  TFeik
     * @date    07.12.2018
     *
     * @param {GContent} parentContent Nadřazený content.
     * @param {WebClient.GSelectFileDlgInputParamsDto} opt Vstupní parametry dialogu.
     * @param {Gordic.Global.Enums.ModOtevreni} [ModOtevreni] Mód otevření dialogu.
     * @returns {JQueryPromise<WebClient.GSelectFileDlgReturnValueDto>}
     */
    function GSelectFileDlg(parentContent: GContent, opt?: WebClient.GSelectFileDlgInputParamsDto, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<WebClient.GSelectFileDlgReturnValueDto>;
    interface GUserSettingsDlgInputParams {
        forms: Forms.Form[];
        admin?: boolean;
    }
    interface GUserSettingsDlgReturnValue {
        ulozeno?: boolean;
    }
    /**
     * Dialog for entering a password for a 602 account
     * - modal dialog
     * */
    function GEnter602AccountPasswordDlg(parentContent: GContent | null, opt?: Gordic.Gin.Interface.GEnter602AccountPasswordServiceDto): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
    /**
    * Dialog detailu události kalendáře
    *
    * @author  Thazmuka
    * @date    10.12.2020
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GCalendarEventDlg(parentContent: GContent, opt?: {
        /** předaný identifikátor z detailu dokumentu/spis (u nové události) */
        ixx?: string;
        /** identifikátor události */
        ixs_oka?: string | null;
        /** aktuální datum z kalendáře */
        calendar_date?: Date;
    } | null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<boolean>;
    /**
     * otevření dialogu obecné historie
     * thazmuka (5.10.2022)
     *
     * @param {GContent} parentContent
     * @param {{ InputDto: any, hideAddBtn: boolean} opt
     * @param {Gordic.Global.Enums.ModOtevreni} [ModOtevreni]
     * @returns {JQueryPromise<any>}
     */
    function GHistorieDlg(parentContent: GContent, opt: {
        InputDto: any;
        hideAddBtn: boolean;
        hidePrintBtn: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * Otevře dialog uživatelského nastavení.
     *
     * @author  TFeik
     * @date    06.06.2019
     *
     * @param {GContent} parentContent Nadřazený content.
     * @param {WebClient.GSelectFileDlgInputParamsDto} opt Vstupní parametry dialogu.
     * @param {Gordic.Global.Enums.ModOtevreni} [ModOtevreni] Mód otevření dialogu.
     * @returns {JQueryPromise<WebClient.GSelectFileDlgReturnValueDto>}
     */
    function GUserSettingsDlg(parentContent: GContent, opt: GUserSettingsDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<GUserSettingsDlgReturnValue | undefined>;
    /**
  * Seznam vazeb ESU (použití)
  *
  * @author  dSebesta
  *
  * @param {gcontent} parentContent The content.
  * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
  * @param {!object} opt Parametry dialogu.
  */
    function GinthesDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        IxsEsu: string;
        VsechnyNepouzite: boolean;
    }>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Zadání důvodu
     *
     * @author  DSebesta
     * @date    10.11.2020
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {any} Promise.
     */
    function GZadaniDuvoduDlgTs(parentContent: GContent, opt: Gordic.Gin.WebClient.IGZadaniDuvoduOptions, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevření dialogu s contentem pro přečtení článku blogu
     * @param input
     * @returns
     */
    function GBlogClanekPrecistDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<Gin.WebClient.GBlogClanekPrecistDlgInputParams | undefined>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevření dialogu s událostmi nad článkem blogu
     * @param input
     * @returns
     */
    function GBlogClanekUdalostDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<Gin.WebClient.GBlogClanekUdalostDlgInputParams | undefined>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevření dialogu s historií editace článku blogu
     * @param input
     * @returns
     */
    function GBlogClanekHistorieDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<Gin.WebClient.GBlogClanekHistorieDlgInputParams | undefined>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog zástupů veřejného uživatele.
     *
     * @author  TFeik
     * @date    04.05.2022
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<Gin.WebClient.GZastupyExternihoUzivateleDlgInputParams>} input
     */
    function GZastupyExternihoUzivateleDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<Gin.WebClient.GZastupyExternihoUzivateleDlgInputParams>): JQuery.Promise<WebClient.GZastupyExternihoUzivateleDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
}
declare namespace Gordic.Gin.Globals {
    function GetUserSettings<T>(path: string, defautValue: T): T;
}
declare namespace Gordic.Gin.Globals {
    function GetGlobalGstor(): Gordic.Data.IGStorage;
    function GetDateToString(datum: JsonDate): string;
    function GetDateStartToString(datum?: GIntervalDto<JsonDate>): string;
    function GetDateEndToString(datum?: GIntervalDto<JsonDate>): string;
    function GetDateEndPlusOneDayToString(datum?: GIntervalDto<JsonDate>): string;
    function GetDatePlusOneDayToString(datum: JsonDate): string;
    /** JSINDELKA
    * Funkce vrati pole ixs a dat_zmena oznacenych v gridu
    * @param {DataView} view
    * @param {Gin.Interface.GResultInfo[]} resultSet
    * @param {znemoznit oznaceni} checkDisabled
    * @param {u kterych znemoznit oznaceni} typVysledkuOperaceForDisabling
    * @param {zrusit oznaceni u provedenych} Uncheck
    * @returns
    */
    function ResolveResulInfo(view: Gordic.Data.View, resultSet: Gin.Interface.GResultInfo[], checkDisabled?: boolean, typVysledkuOperaceForDisabling?: Gordic.Gin.Interface.TypVysledkuOperace, Uncheck?: boolean): void;
    /** JSINDELKA
    * Funkce vrati pole ixs a dat_zmena oznacenych v gridu
    * @param {DataView} view
    * @returns
    */
    function ResolveResultData(view: Gordic.Data.View, checkDisabled?: boolean, typVysledkuOperaceForDisabling?: Gordic.Gin.Interface.TypVysledkuOperace): Gin.Interface.GResultInfo[];
    function GetResultInfoByGServiceGroupResponse(content: GContent, result: Isl.GServiceGroupResponse<Interface.GEntityDto>): Interface.GResultInfoDto[];
    function ShowGServiceGroupResponse(content: GContent, result: Isl.GServiceGroupResponse<Interface.GEntityDto>): void;
    function ShowFlashStandard(content: GContent, text: string, typ: Gordic.Gin.Globals.Enums.StateEnum): void;
    function ShowFlash(content: GContent, text: string, typ: Gordic.Gin.Globals.Enums.StateEnum, timer: number, ID: string): void;
    function ShowOperationResultInfo(content: GContent, result: Isl.GOperationResult<Interface.GEntityDto>): void;
    function GetStateEnum(vysledek: Gordic.Gin.Interface.TypVysledkuOperace): Gordic.Gin.Globals.Enums.StateEnum;
    function GetResultInfoByGOperationResult(result: Isl.GOperationResult<Interface.GEntityDto>): Interface.GResultInfoDto;
    function ShowResultInfo(content: GContent, result: Interface.GResultInfoDto): void;
    function ShowWaitLoadData(content: GContent): void;
    function GetStateIcon(stav: Gordic.Gin.Globals.Enums.StateEnum): Gordic.Gin.Icons.StateEnum;
    function ShowWaitDoAkce(content: GContent): void;
    function ShowWaitInfo(content: GContent, text: string): void;
    function ShowWaitInfoProgress(content: GContent, text: string, number: number, total: number): void;
    function GetVysledekTyp(hodnota?: number): Gin.Interface.TypVysledkuOperace;
    function GetVysledek(hodnota?: number): number;
    function GetTypVysledkuOperace(vysledek: Gin.Interface.TypOznaceniRadkuSeznamu): Gin.Interface.TypVysledkuOperace;
    function GetTypOznaceniRadkuSeznamu(vysledek: Gin.Interface.TypVysledkuOperace): Gin.Interface.TypOznaceniRadkuSeznamu;
    /** JSINDELKA
    * Funkce vrati pole ixs a dat_zmena oznacenych v gridu
    * @param {primarni klic} keyIxs
    * @param {content.mainGrid} grid*
    * @returns
    */
    function GetIxsDateZmenaArrayFromSelection(keyIxs: string | undefined, grid: JQuery): Gin.Interface.GIxsDateTime[];
    /** JSINDELKA
* Funkce vrati pole ixs a dat_zmena oznacenych v gridu
* @param {primarni klic} keyIxs
* @param {content.mainGrid} grid*
* @returns
*/
    function GetSelectedIxsDatZmena(keyIxs: string | undefined, grid: JQuery): Gin.Interface.GIxsDateTime[];
    /** JSINDELKA
    * Funkce vrati pole ixs a oznacenych v gridu
    * @param {primarni klic} keyIxs
    * @param {content.mainGrid} grid*
    * @returns
    */
    function GetIxsArrayFromSelection(keyIxs: string | undefined, grid: JQuery): string[];
    /** JSINDELKA
    * Funkce vrati pocet radku
    * @param {content.mainGrid} grid*
    * @returns
    */
    function GetPocetRadku(grid: JQuery): number;
    /** JSINDELKA
    * Funkce vrati pocet radku
    * @param {content.mainGrid} grid*
    * @returns
    */
    function GetPocetOznacenychRadku(grid: JQuery): number;
    /** JSINDELKA
    * Funkce vrati pole ixs a oznacenych v gridu
    * @param {primarni klic} keyIxs
    * @param {content.mainGrid} grid*
    * @returns
    */
    function GetIxsArrayFromAll(keyIxs: string | undefined, grid: JQuery): string[];
    /** JSINDELKA
    * Funkce vrati pole ixs a oznacenych v gridu
    * @param {primarni klic} keyIxs
    * @param {content.mainGrid} grid*
    * @returns
    */
    function GetIxsArrayByTypVysledkuOperace(keyIxs: string | undefined, view: Gordic.Data.View, Vysledek: Gordic.Gin.Interface.TypVysledkuOperace): string[];
    /** JSINDELKA
    * Funkce vrati pole radku oznacenych v gridu
    * @param {content.mainGrid} grid*
    * @returns
    */
    function GetDataRowArrayFromSelection(grid: JQuery): {}[];
    /** JSINDELKA
    * Funkce vrati slopuce ikony vysledku akce
    * @param {nazev sloupce ikony vysledku} keyIcon
    * @returns
    */
    function GridIconOptResulInfo(): GGridColumn<any>;
    /** JSINDELKA
    * Funkce vrati ikon template dle vysledku
    * @param {Gordic.Gin.Interface.TypVysledkuOperace} vysledek
    * @returns
    */
    function GetTypVysledkuOperaceIcon(vysledek: Gordic.Gin.Interface.TypVysledkuOperace): IconTemplate;
    /** JSINDELKA
    * Funkce upravi akce dle typu zobarzeni
    */
    function EnableContentActions(content: GContent, TypZobrazeniDetailu: Gordic.Gin.Interface.TypZobrazeniEntity): void;
    /**
     * Převede typ zobrazení entity na příznak, zda je aktivní editační režim.
     *
     * @author TFeik
     * @date   22.02.2019
     *
     * @param {Interface.TypZobrazeniEntity} typZobrazeniEntity
     */
    function isEditMode(typZobrazeniEntity?: Interface.TypZobrazeniEntity): boolean;
}
declare namespace Gordic.Gin.Globals.Dialogs {
    /**
     *
     * @param {GContent} content
     * @param {Gordic.Global.Enums.ModOtevreni | null} ModOtevreni?
     */
    interface IGLogovani {
        Ixp: string;
        DuvodHledani?: Gordic.Gin.Globals.Enums.DuvodHledaniEsu;
        AktZnacka?: string;
        DuvodHledaniTxt?: string;
        InitialValueDuvodHledaniTxt?: string;
    }
    /**
     * [OBSOLITE] Použijte "Gordic.Gui.Dialogs.upravModOtevrni(content);"
     * Funkce pro *Dialogs.js  upraví mody otevření.
     * @param {GContent} content
     * @param {Gordic.Global.Enums.ModOtevreni} ModOtevreni
     * @returns
     */
    function UpravModOtevrni(content: GContent | GDlgNamespace, ModOtevreni?: Gordic.Global.Enums.ModOtevreni | null): Gordic.Global.Enums.ModOtevreni;
    /**
     * [OBSOLITE] Použijte "Gordic.Gui.Dialogs.zkontrolujContent(content);"
     * Funkce pro *Dialogs.js  zkontroluje content
     *
     * @param {GContent | null} content?
     * @returns
     */
    function ZkontrolujContent(content?: GContent | null): GContent | GDlgNamespace;
    /**
     *
     * @param {GContent} content
     * @param {IGLogovani} Logovani
     * @param {boolean | null} uloz?
     * @param {boolean | null} kontrolovatDuvodHledani?
     * @param {boolean | null} kontrolovatAktZnacka?
     * @param {boolean | null} kontrolovatDuvodHledaniTxt?
     * @returns
     */
    function ValidujLogovani(content: GContent | GDlgNamespace, Logovani: IGLogovani | undefined, uloz?: boolean | null, kontrolovatDuvodHledani?: boolean | null, kontrolovatAktZnacka?: boolean | null, kontrolovatDuvodHledaniTxt?: boolean | null): boolean;
    /**
     * export function confirm
     *
     * @param {GContent} parentContent
     * @param {string} [title]
     * @param {string | Element | JQuery} [html]
     * @returns {JQuery.Promise<undefined>}
     */
    function confirm(parentContent: GContent, title?: string, html?: string | Element | JQuery): JQuery.Promise<undefined>;
}
declare namespace Gordic.Gin.Globals.Enums {
    /**
     * Obsolete: Použijte Gordic.Global.Enums.ModOtevreni
     *
     * @author TFeik
     * @since 482.1.0.292
     * @deprecated Použijte Gordic.Global.Enums.ModOtevreni.
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
    enum DuvodHledaniEsu {
        /**
         * Neurcen.
         */
        neurcen = 0,
        /**
         * Zadání odesílatele.
         */
        zadaniOdesilatele = 10,
        /**
         * Zadání dotčeného subjektu.
         */
        zadaniDotcenehoSubjektu = 20,
        /**
         * Zadání adresáta.
         */
        zadaniAdresata = 30,
        /**
         * Zadání esu v hledání.
         */
        zadaniEsuVHledani = 40,
        /**
         * Výběr ESU při žádosti občana o výpis využitých údajů.
         */
        zadaniSubjektuProVypisUdaju = 50,
        /**
         * Výběr a kontrola ESU před smazáním nepoužitého.
         */
        kontrolaPredOdstranenim = 60,
        /**
         * Zobrazení výběrového okna bez vazby na subjekt - z menu aplikace, jako PID subjektu se posílá 0000X000004J.
         */
        kartotekaVMenuAplikace = 70,
        /**
        * Zadání vlastnosti dokumentu (typ vlastnosti ESU)
        */
        zadaniVlastnostiDokumentu = 90,
        /**
       * zobrazení jmenného rejstříku v ADK
       */
        zobrazeniJmennehoRejstriku = 100
    }
    enum KtgDuvPodp {
        /**
         * Podepsání/razítko při vložení el. dokumentu (přidání el. obrazu/přílohy)
         */
        vlozeniKomponenty = 10,
        /**
         * Podepsání/razítko již existujícího el. dokumentu (běžné podepsání v modulu)
         */
        beznePodepsaniKomponenty = 20,
        /**
         * Podepsání/razítko pro potvrzení vidimace po naskenování dokumentu
         */
        potvrzeniVidimacePoScanu = 30,
        /**
         * Podepsání/razítko po konverzi do PDF
         */
        konverzeDoPdf = 40,
        /**
         * Systémové razítko při příjmu el. podání
         */
        prijemElPodani = 50,
        /**
         * Podepsání el. obrazu, příloh před odesláním z GINISu
         */
        odeslani = 60,
        /**
         * Podepsání/razítko odpovědi na el. podání
         */
        odpovedNaElPodani = 70,
        /**
         * Podepsání úkonu v EPK  (kval. certifikátem)
         */
        podpisUkonuEpkCertifikat = 80,
        /**
         * Podepsání/čas. razítko úkonu v EPK  (kval. certifikátem)
         */
        podpisRazitkoUkonuEpkCertifikat = 90,
        /**
         * Podepsání  úkonu v EPK  (kval. certifikátem nebo systémovou značku )
         */
        podpisUkonuEpkCertifikatNeboZnacka = 100,
        /**
         * Podepsání/čas. razítko úkonu v EPK  (kval. certifikátem nebo systémovou značku)
         */
        podpisRazitkoUkonuEpkCertifikatNeboZnacka = 110,
        /**
         * Podepsání/razítko při vložení el. dokumentu s konverzí (přidání el. obrazu/přílohy)
         */
        vlozeniKomponentySKonverzi = 120,
        /**
         * Podepisování dávek ČNB
         */
        davkyCNB = 130,
        /**
         * Podepsání/razítko potvrzení příjmu el. podání
         */
        potvrzeniPrijmuElPodani = 150,
        /**
         * Podepsání/razítko sestav GRR
         */
        sestavyGRR = 160,
        /**
         * Přihlášení na CzechPOINT@office
         */
        CzechPOINT = 170
    }
    /**
     * Classy Gordických barev pro jednotlivé stavy.
     */
    enum ColorClass {
        zluta = " g-state-warning ",
        modra = " g-state-info ",
        cerna = " g-state-text ",
        cervena = " g-state-error ",
        zelena = " g-state-success ",
        cervenaVyrazna = " g-state-important ",
        seda = " g-state-inactive "
    }
    /**
     * Classy Gordických barev pro jednotlivé stavy.
     * Obsolete: Použijte Gordic.Global.Enums.ColorStateClass
     *
     * @author TFeik
     * @deprecated Použijte Gordic.Global.Enums.ColorStateClass.
     */
    enum ColorStateClass {
        info = " g-state-info ",
        warning = " g-state-warning ",
        success = " g-state-success ",
        error = " g-state-error ",
        important = " g-state-important ",
        active = " g-state-active ",
        inactive = " g-state-inactive data-deleted ",
        favorite = " g-state-favorite "
    }
    enum ChovaniStrediskaDleUcelu {
        /**
         * NEURCENO. Filtr na střediska se vůbec nenabízí
         */
        NEURCENO = -1,
        /**
         * PREDANI. Specifické chování filtru na střediska
         */
        PREDANI = 0,
        /**
         * PRIDELENI. Specifické chování filtru na střediska
         */
        PRIDELENI = 1,
        /**
         * BEZNE. Filtr na střediska se může nabízet v závislosti na dalším nastavení systému
         */
        BEZNE = 2
    }
    /**
 * Classy Gordických barev pro jednotlivé stavy.
 *
 * @author JSindelka
 */
    enum IDPrimaryKeyGridu {
        balik = "ixs_zup",
        dokSpis = "ixp",
        zasilka = "sxs",
        generovany = "IDPrimaryKeyGriduGenerated"
    }
    enum StateEnum {
        info = "info",
        warning = "warning",
        success = "success",
        error = "error",
        important = "important"
    }
    enum UsedStrings {
        newLineHtml = "<br>",
        newLine = "\r\n",
        labelRowSeparator = ", ",
        nulakIxpProZobrazeniESUBezVazby = "0000X000004J",
        nulakIxpProZobrazeniESUVeFiltru = "0000X0000003"
    }
    enum FlashId {
        contentInfo = "contentInfo",
        operationInfo = "operationInfo"
    }
    enum LayoutDescriptorType {
        list = "L4M2S1",
        detail = "L3M1S1"
    }
    /**
     * Classy zpusobu pouziti Gordických barev.
     */
    enum ColorPlaceClass {
        front = " g-state-text ",
        background = " g-state "
    }
    enum GridColumnName {
        resultOperaceIkona = "resultIcon",
        resultOperacePriznak = "m_vyber",
        resultOperaceTooltip = "resultIconTooltip",
        resultOperaceText = "m_err",
        priznakActionEnabled = "m_action_enabled"
    }
    enum ActionsName {
        Zavrit = "actClose",
        Ukoncit = "actCancel",
        Vybrat = "actOK",
        Editovat = "actEditovat",
        Zmenit = "actZmenit",
        Novy = "actNovy",
        Obcerstvit = "actObcerstvit",
        Stornovat = "actStornovat",
        Predat = "actPredat",
        Pridelit = "actPridelit",
        Prevzit = "actPrevzit",
        Zastavit = "actZastavit",
        Odstranit = "actOdstranit",
        Vymazat = "actVymazat",
        Vyjmout = "actVyjmout",
        VyjmoutVse = "actVyjmoutVse",
        KontrolaMetadat = "actKontrolaMetadat",
        OpravaMetadat = "actOpravaMetadat",
        Kontrola = "actKontrola",
        TiskPredavacihoProtokolu = "actTiskPredProt",
        TiskDetailu = "actTiskDetailu",
        ZobrazitDebugInfo = "actZobrazitDebugInfo",
        ZobrazitOperationInfo = "actZobrazitOperationInfo",
        Nasledujici = "actNasledujici",
        Predchazejici = "actPredchazejici",
        Ulozit = "actUlozit",
        UlozitPoradi = "actUlozitPoradi",
        ZobrazitDetail = "actZobrazitDetail",
        ZobrazitDetailEsu = "actZobrazitDetailEsu",
        ZobrazitSoubor = "actZobrazitSoubor",
        ZmenitAktivitu = "actZmenitAktivitu",
        Odeslat = "actOdeslat",
        Dorucit = "actDorucit",
        AktualizovatStav = "actAktualizovatStav",
        VlozitDoBaliku = "actVlozitDoBaliku",
        Vratit = "actVratit",
        OznacitDleID = "actOznacitDleID",
        Subtask = "actSubtask_",
        Separator = "actSeparator_"
    }
    enum ActionsGroupName {
        Favorite = "Favorite",
        Detail = "Detail",
        AlwaysEnabled = "AlwaysEnabled",
        FavoriteAlwaysEnabled = "FavoriteAlwaysEnabled",
        ContextMenuOnly = "ContextMenuOnly",
        NotInContextMenu = "NotInContextMenu",
        Debug = "Debug"
    }
}
declare namespace Gordic.Gin.Icons {
    enum EntityEnum {
        zasilka = "gi-zasilka",
        dokSpis = "gi-doc-in-folder",
        dokument = "gi-paper",
        spis = "gi-spis",
        balik = "gi-balik ",
        email = "gi-at g-state-text g-state-info",
        datovaZprava = "gi-ds-nove g-state-text g-state-favorite",
        formaAnalogova = "gi-paper",
        formaDigitalni = "gi-paperel",
        formaHybridni = "gi-paperel_hy",
        formaNeurcena = "gi-dokument_neurceno",
        elPodpis = "gi-signel g-state-text g-state-important",
        elPodpisSCasRazitkem = "gi-signel g-state-text g-state-important|gi-time gi-stack-pos--rb gi-bgw g-state-text g-state-important",
        casoveRazitko = "gi-sign|gi-time gi-stack-pos--rb gi-bgw g-state-text g-state-important",
        kniha = "fa-book",
        prehled = "gi-list",
        referent = "fa-user-o",
        uzivatel = "fa-user",
        detail = "gi-detail",
        kopie = "gi-copy",
        trasy = "gi-zivotni_situace"
    }
    enum ActionEnum {
        stornovat = "fa-times-circle g-state-text g-state-important",
        zastavit = "fa-ban",
        predat = "gi-predat",
        pridelit = "gi-pridelit",
        prevzit = "gi-prevzit",
        vypravit = "gi-send g-state-info",
        odeslat = "gi-send",
        obcerstvit = "gi-refresh",
        kontrola = "gi-tick",
        kontrolaMetadat = "gi-paper gi-stack-bg|gi-prep gi-bgw gi-stack-pos--rb  gi-rot90",//dsebesta fa-file-text-o gi-stack-bg|gi-prep gi-bgw gi-stack-pos--rb  gi-rot90
        vratit = "fa-retweet",
        ulozit = "gi-save",
        ulozitPoradi = "gi-save",
        vyjmout = "gi-vyjmout",
        odstranit = "fa-times",
        vymazat = "gi-bin",
        ztratit = "fa-ban",
        sdruzit = "fa-compress",
        rozebrat = "gi-convert",
        zmenit = "gi-prep",
        editovat = "gi-pencil",
        tisk = "gi-print",
        generovat = "gi-generate",
        zobrazitDebugInfo = "gi-gordic",
        informace = "fa-info-circle g-state-text g-state-info",
        nasledujici = "gi-vlozit",
        predchazejici = "gi-vyjmout",
        tridit = "gi-vlozit",
        dorucit = "gi-dorucenka",
        zmenaTerminu = "gi-vyrizenopred_bold g-state-text g-state-active",
        zobrazitDetail = "gi-detail",
        zobrazitDetailEsu = "gi-detail",
        novyZaznam = "fa-plus",
        pridat = "fa-plus",
        odebrat = "fa-minus",
        zmenitAktivitu = "gi-settings",
        zrusitZmeny = "gi-window-close",
        zavrit = "gi-window-close",
        vlozit = "gi-accept",
        aktualizovatStav = "gi-refresh gi-bgw",
        zobrazitSoubor = "fa-file-image-o gi-bgw",
        umistit = "gi-gps",
        prepocitat = "gi-calc g-state-text g-state-success",
        vlozitDoBalik = "gi-vlozit_do_baliku",
        oznacit = "gi-check",
        evidovat = "gi-save",
        uzavrit = "gi-schvaleno_vyrizeno_uzavreno",
        uzavrit_ekonomicky = "gi-suma gi-stack-bg|fa-lock gi-bgw  gi-stack-pos--rb  gi-stack-fw ",
        vyrovnat = "fa-balance-scale",
        importovat = "gi-download",
        exportovat = "gi-send",
        schvalit = "gi-schvaleno g-state-text g-state-success",
        vyridit = "gi-vyrizeno",
        pokracovat = "gi-arrow",
        odstornovat = "fa-undo|fa-times-circle g-state-important gi-bgw  gi-stack-pos--rb",//nehezky pojmenovano, pouzijte zrusitStorno
        zrusitStorno = "fa-undo|fa-times-circle g-state-important gi-bgw  gi-stack-pos--rb",
        zmenitFormu = "gi-pencil",
        konvertovatDoPDF = "gi-pdf_do",
        vytvoritZadostOZDF = "gi-paper |gi-bell gi-bgw  gi-stack-pos--rb",
        vytvoritZadostOAK = "gi-paper |gi-convert gi-bgw  gi-stack-pos--rb",
        zmenitDF = "gi-convert",
        overifFormat = "gi-tick",
        oznacitJakoPDFA = "fa-file-pdf-o",
        opravit = "gi-prep",
        vlozitDoSpisu = "gi-vlozit_do_spisu",
        vyjmoutZeSpisu = "gi-vyjmout_do_spisu",
        priorovat = "gi-folder|gi-folder g-state-text gi-bgw|fa-level-down g-state-text g-state-info gi-stack-pos--rt",
        prerusit = "fa-pause-circle-o",
        pridatKlicSlova = "gi-key|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
        odebratKlicSlova = "gi-key|fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw",
        vytvoritDokumentyDoOznacenychSpisu = "gi-spis|gi-plus gi-bgw gi-stack-pos--rb",
        odeslatPosledneVlozeneDokumentyDoOznacenychSpisu = "gi-spis|gi-send gi-bgw gi-stack-pos--rb",
        uzivatelskeSloupceVlastnosti = "gi-user",
        evidovatCj = "gi-pencil|gi-CJ gi-stack-pos\u2014rb",
        vlozitDokumentDoEpk = "gi-epk|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
        vlozitSpisDoEpk = "gi-epk|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
        zrusitPrideleni = "gi-pridelit|fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw",
        zmenitPrideleni = "gi-pridelit_uprava",
        zmenitDilciTermin = "gi-calendar|gi-pencil g-state-text g-state-info gi-bgw",
        zmenitTerminSpisu = "gi-vyrizenopred|gi-pencil g-state-text g-state-info gi-bgw",
        zmenitPristup = "fa-universal-access|gi-pencil g-state-text g-state-info gi-bgw",
        zrusitVyrizeniDokumentu = "gi-vyrizeno|fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw",
        zrusitVyrizeniSpisu = "gi-vyrizeno|fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw",
        zrusitUzavreniSpisu = "gi-schvaleno_vyrizeno_uzavreno|fa-remove g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw",
        pridatSpisyZDokumentu = "gi-plus",
        pridatDokumentyVlozeneDoSpisu = "gi-plus",
        oznacitJakoPrectene = "gi-mail-open",
        oznacitJakoNeprectene = "gi-mail",
        predatExtAg = "fa-share",
        prevzitExtAg = "fa-reply",
        poznamkovyBlokPridat = "gi-calendar-interval|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
        poznamkovyBlokVyjmout = "gi-calendar-interval|fa-remove g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
        porovnat = "fa-balance-scale",
        posoudit = "gi-posoudit_vahy",
        insolvence = "gi-ir"
    }
    enum StavEnum {
        stornovano = "fa-times-circle g-state-text g-state-important",
        zastaveno = "fa-ban",
        predano = "gi-predat",
        prideleno = "gi-pridelit",
        prevzato = "gi-prevzit",
        vypraveno = "gi-send g-state-info",
        odeslano = "gi-send",
        kontrola_OK = "gi-tick",
        vraceno = "fa-retweet",
        ulozeno = "gi-download",
        vyjmuto = "gi-vyjmout",
        vlozenoDoSpisu = "gi-vlozit_do_spisu",
        vyjmutoZeSpisu = "gi-vyjmout_do_spisu",
        odstraneno = "gi-bin",
        vymazano = "gi-bin",
        ztraceno = "fa-ban",
        zmeneno = "gi-prep",
        doruceno = "gi-dorucenka",
        vypujceno = "gi-send",
        prevadeno = "gi-redistribuce",
        preruseno = "fa-pause-circle-o",
        skartovano = "gi-skartace",
        archivovano = "fa-archive",
        vlozenoDoBaliku = "gi-vlozit_do_baliku",
        pripraveno = "fa-check-square-o",
        zruseno = "fa-times",
        delimitovano = "gi-pridelit_uprava",
        provedeno = "fa-check-circle g-state-text g-state-success",
        provedenoSUpozornenim = "fa-exclamation-triangle g-state-text g-state-warning",
        neprovedeno = "fa-times-circle g-state-text g-state-error",
        provedenoJizDrive = "fa-check-circle g-state-text g-state-info",
        kUpozorneni = "fa-exclamation-triangle g-state-text g-state-warning",
        neurceno = "fa-fw",
        uzavreno = "gi-schvaleno_vyrizeno_uzavreno_bold",
        schvaleno = "gi-schvaleno",
        vyrizeno = "gi-vyrizeno"
    }
    enum ZobrazeniEnum {
        hlavniIkona = " g-state-text",
        infoIkona = " g-state-info"
    }
    enum ZasilkyEnum {
        neprectena = "gi-mail",
        prectena = "gi-mail-open",
        obalka = "gi-mail",
        obalkaCervenyPruh = "gi-obalka_bez-pruhu|gi-pruh_pro_obalku gi-stack-pos-- g-state-text g-state-important gi-stack-fw gi-stack-fw-full",
        obalkaZelenyPruh = "gi-obalka_bez-pruhu|gi-pruh_pro_obalku gi-stack-pos-- g-state-text g-state-success gi-stack-fw gi-stack-fw-full",
        obalkaModryPruh = "gi-obalka_bez-pruhu|gi-pruh_pro_obalku gi-stack-pos-- g-state-text g-state-info gi-stack-fw gi-stack-fw-full"
    }
    enum StateEnum {
        info = "fa-info-circle g-state-text g-state-info",
        warning = "fa-exclamation g - state - text",
        success = "fa-check-circle g-state-text g-state-success",
        error = "fa-times-circle  g-state-text g-state-error",
        important = "fa-info-circle g-state-text g-state-important"
    }
    enum ZpusobDoruceni {
        posta = "gi-mail",
        eMail = "gi-email",
        kuryr = "gi-kuryr",
        osobne = "gi-user",
        dorucovaciSluzba = "fa-car",
        datovaSchranka = "gi-ds-nove g-state-text g-state-favorite",
        GEX = "gi-gex",
        hybridniPosta = "gi-hybridni-posta",
        elSchrankaSK = "gi-edesk",
        elSchrankaSK_JinySystem = "gi-edesk",
        infoKanal = "gi-info",
        telefon = "fa-phone",
        fax = "fa-fax"
    }
    enum ZpusobZpracovani {
        automaticky = "fa-repeat",
        rucne = "fa-user",
        dleVolbyUzivatele = "fa-user-o"
    }
}
/**
 * Gordic.Gin.Globals.Icons
 *
 * @author TFeik
 * @since 480.1.0.115
 * @date 27.08.2018
 */
declare namespace Gordic.Gin.Globals.Icons {
    /**
     * Ikony vysledku operace
     *
     * @author JSindelka
     * @date 30.08.2018
     *
     */
    function IkonaVysledkuOperaceNeurceno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    function IkonaVysledkuOperaceProvedeno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    function IkonaVysledkuOperaceNeprovedeno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    function IkonaVysledkuOperaceProvedenoSUpozornenim(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    function IkonaVysledkuOperaceProvedenoJizDrive(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    function IkonaNemoznoProvadetOperaci(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * AktivitaValues je potřeba získat pomocí Gordic.Ginis.DbModel.GGincaktEnumValues().then((aktivitaValues)=>{ ... }) !!
     * @param aktivita
     * @param aktivitaValues
     */
    function Aktivita(aktivita: number, aktivitaValues: Gordic.Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GGincaktEnum, Gordic.Ginis.DbModel.GGincaktDto>[]): IconTemplate;
    /**
     * Ikona kartotéky.
     *
     * @author TFeik
     * @date 27.08.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Kartoteka(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona generování.
     *
     * @author TFeik
     * @date 11.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Generuj(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona generování identifikátoru.
     *
     * @author TFeik
     * @date 07.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function GenerovaniIdentifikatoru(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona občerstvení (refresh) dat.
     *
     * @author TFeik
     * @date 07.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Refresh(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
 * Ikona Editace.
 *
 * @author TFeik
 * @date 07.09.2018
 *
 * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
 * @returns {IconTemplate} Ikona.
 */
    function NovyZaznam(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
 * Ikona Editace.
 *
 * @author TFeik
 * @date 07.09.2018
 *
 * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
 * @returns {IconTemplate} Ikona.
 */
    function ZmenitAktivitu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Editace.
     *
     * @author TFeik
     * @date 07.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Editovat(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona zrušení změn při editaci.
     *
     * @author TFeik
     * @date 10.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ZrusitZmeny(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro uložení a zavření dialogu.
     *
     * @author TFeik
     * @date 22.11.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function UlozitAZavrit(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro storno.
     *
     * @author TFeik
     * @date 07.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Stornovat(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro vložení doručenky.
     *
     * @author TFeik
     * @date 07.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function VlozitDorucenku(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro zobrazení doručenky.
     *
     * @author TFeik
     * @date 07.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ZobrazitDorucenku(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro zobrazení detailu.
     *
     * @author TFeik
     * @date 07.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ZobrazitDetail(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro vložení.
     *
     * @author TFeik
     * @date 07.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Vlozit(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro zásilkovou adresu.
     *
     * @author TFeik
     * @date 10.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ZasilkovaAdresa(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro načtení zásilkové adresy dle ESU.
     *
     * @author TFeik
     * @date 10.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ObnovitZEsu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro uložení zásilkové adresy k ESU.
     *
     * @author TFeik
     * @date 10.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function UlozitKEsu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro zaměnění 3. a 4. řádku adresy.
     *
     * @author TFeik
     * @date 10.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Zamenit3a4RadekAdresy(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro emailovou adresu.
     *
     * @author TFeik
     * @date 14.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Email(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro tisk.
     *
     * @author TFeik
     * @date 18.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Tisk(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro tisk emailu.
     *
     * @author TFeik
     * @date 18.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function TiskEmailu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona datové zprávy.
     *
     * @author TFeik
     * @date 20.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DatovaZprava(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro detail datové zprávy.
     *
     * @author TFeik
     * @date 20.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DetailDatoveZpravy(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro detail doručené datové zprávy.
     *
     * @author TFeik
     * @date 20.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DetailDoruceneDatoveZpravy(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro detail odeslané datové zprávy.
     *
     * @author TFeik
     * @date 20.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DetailOdeslaneDatoveZpravy(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro Isds.
     *
     * @author TFeik
     * @date 20.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Isds(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro Informace z Isds.
     *
     * @author TFeik
     * @date 20.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function InformaceZIsds(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro Činnosti.
     *
     * @author TFeik
     * @date 20.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Cinnosti(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro Zásilku.
     *
     * @author TFeik
     * @date 20.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Zasilka(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona datové schránky.
     *
     * @author TFeik
     * @date 25.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DatovaSchranka(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona datové schránky odesilatele.
     *
     * @author TFeik
     * @date 25.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DatovaSchrankaOdesilatel(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona datové schránky adresáta.
     *
     * @author TFeik
     * @date 25.09.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DatovaSchrankaAdresat(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Vnořená zásilka.
     *
     * @author TFeik
     * @date 04.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ZasilkaVnorena(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Nevypraveno.
     *
     * @author TFeik
     * @date 04.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Nevypraveno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Nevypraveno - Chyba.
     *
     * @author TFeik
     * @date 04.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function NevypravenoChyba(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Vypraveno.
     *
     * @author TFeik
     * @date 04.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Vypraveno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Připravováno.
     *
     * @author TFeik
     * @date 04.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Pripravovano(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Doručeno.
     *
     * @author TFeik
     * @date 04.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Doruceno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Doručeno.
     *
     * @author TFeik
     * @date 04.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Vraceno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Stornováno.
     *
     * @author TFeik
     * @date 05.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Stornovano(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Zrušit storno.
     *
     * @author TFeik
     * @date 05.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ZrusitStorno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Znovuodesláno.
     *
     * @author TFeik
     * @date 05.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Znovuodeslano(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * [OBSOLETE] Použijte prefab Gordic.Prefabs.Icons.HybridniPosta().
     * Ikona Hybridní pošta.
     *
     * @author TFeik
     * @date 04.10.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function HybridniPosta(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Hledata.
     *
     * @author TFeik
     * @date 26.11.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Hledat(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Hledání.
     *
     * @author TFeik
     * @date 26.11.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Hledani(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Hledání zásilek.
     *
     * @author TFeik
     * @date 26.11.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function HledaniZasilek(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro vybrání souboru.
     *
     * @author TFeik
     * @date 07.12.2018
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function VybratSoubor(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona generování SIP balíků.
     *
     * @author TFeik
     * @date 02.01.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function GenerujSIPBaliky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona generování SIP balíků pro posouzení.
     *
     * @author TFeik
     * @date 03.01.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function GenerujSIPBalikyProPosouzeni(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona generování SIP balíků pro archivaci.
     *
     * @author  TFeik
     * @date    14.07.2021
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function GenerujSIPBalikyProArchivaci(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona dokumentu.
     *
     * @author TFeik
     * @date 07.01.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Dokument(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona spisu.
     *
     * @author TFeik
     * @date 07.01.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Spis(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona dokumentu / spisu.
     *
     * @author TFeik
     * @date 07.01.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DokumentSpis(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona balíku.
     *
     * @author TFeik
     * @date 07.01.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Balik(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona V Balíku.
     *
     * @author DSebesta
     * @date 18.02.2021
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function VBaliku(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona tisku obsahu balíku.
     *
     * @author TFeik
     * @date 07.01.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function TiskObsahuBaliku(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona vloženídokumentu / spisu do balíku.
     *
     * @author TFeik
     * @date 07.01.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function VlozitDoBalikuDokumentSpis(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Tisk štítků.
     *
     * @author TFeik
     * @date 10.01.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function TiskStitku(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Neevidovaný dokument / spis.
     *
     * @author TFeik
     * @date 17.01.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function NeevidovanyDokumentSpis(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Vložit neevidovaný dokument / spis.
     *
     * @author TFeik
     * @date 17.01.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function VlozitDoBalikuNeevidovanyDokumentSpis(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Vyjmout z balíku.
     *
     * @author TFeik
     * @date 15.02.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function VyjmoutZBaliku(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona kontroly obsahu balíku.
     *
     * @author TFeik
     * @date 14.03.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function KontrolaObsahuBaliku(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona konverze do pdf.
     *
     * @author TFeik
     * @date 25.03.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function KonverzeDoPdf(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona eDesk schránky.
     *
     * @author TFeik
     * @date 10.04.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function EDeskMessageBox(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona ověření eDesk schránky.
     *
     * @author TFeik
     * @date 10.04.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function CheckEDeskMessageBox(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona doručení zásilky.
     *
     * @author TFeik
     * @date 21.05.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DoruceniZasilky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona odeslání.
     *
     * @author TFeik
     * @date 13.06.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Odeslani(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Insolvenční řízení.
     *
     * @author TFeik
     * @date 13.06.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function InsolvencniRizeni(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Insolvencne.
     *
     * @author TFeik
     * @date 13.06.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Insolvencne(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Prilohy.
     *
     * @author DSebesta
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Prilohy(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * export function DokumentBezNastaveneFormy
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentBezNastaveneFormy(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * export function DokumentBezNastaveneFormy
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentBezNastaveneFormyZJineAgendy(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * export function DokumentKoncept
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentKoncept(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * export function DokumentKonceptJinaAgneda
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentKonceptJinaAgneda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * DokumentJinaAgneda
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentJinaAgneda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Dokument primarne fyzicky
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentPrimarneFyzicky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Dokument primarne fyzicky
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentPrimarneFyzickyJinaAgenda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Dokument primarne elektronicky
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentPrimarneElektronicky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Dokument primarne elektronicky
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentPrimarneElektronickyJinaAgenda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Dokument  elektronicky
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentElektronicky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Dokument  elektronicky
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentElektronickyJinaAgenda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * SpisAnalogivy
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function SpisAnalogovy(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * spis elektronicky
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function SpisElektronicky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * spis hybridní
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function SpisHybridni(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * typovy spis
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function TypovySpis(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * typovy spis Analogovy
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function TypovySpisAnalogovy(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Typový digitální spis
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function TypovySpisDigitani(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Typový hybridní spis
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function TypovySpisHybridni(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Soucast
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Soucast(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Dil
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Dil(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Neevidovany Spis
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function NeevidovanySpis(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Neevidovany Dokument
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function NeevidovanyDokument(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Cizi Doruceny
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziDoruceny(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Cizi Doruceny Jina Agenda
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziDorucenyJinaAgenda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Cizi Datova Zprava
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziDatovaZprava(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Cizi Datova Zprava Jina Agenda
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziDatovaZpravaJinaAgenda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * CiziEPodatelna
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziEPodatelna(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * CiziEPodatelna Jina Agenda
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziEPodatelnaJinaAgenda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Cizi XRG
     *
     * @author DSebesta
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziXRG(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Cizi XRG Jina Agenda
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziXRGJinaAgenda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * cizi fyzicky
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziFyzicky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * cizi fyzicky Jina Agenda
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziFyzickyJinaAgenda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Cizi Elektronicky
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziElektronicky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Cizi Elektronicky Jina Agenda
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziElektronickyJinaAgenda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * cizi hybridni primarne fyzicky
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziHybridniPrimarneFyzicky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * cizi hybridni primarne fyzicky Jina Agenda
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziHybridniPrimarneFyzickyJinaAgenda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * cizi hybridni primarne elektronicky
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziHybridniPrimarneElektronicky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * cizi hybridni primarne Elektronicky Jina Agenda
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CiziHybridniPrimarneElektronickyJinaAgenda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Podepsano Elektronicky
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function PodepsanoElektronicky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Podepsano Elektronicky S Casovym Razitkem
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function PodepsanoElektronickySCasovymRazitkem(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Casove Razitko
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function CasoveRazitko(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Podáno
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Podano(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Nevyřízeno
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Nevyrizeno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Neuzavřeno - ekvivalent k Nevyrizeno v pripadě TS/S/D
     *
     * @author RTomes
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Neuzavreno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Vyřízeno
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Vyrizeno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Uzavreno
     *
     * @author Rtomes
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Uzavreno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Vyřízeno a odeslano
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function VyrizenoAOdeslano(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Vyřízeno a uzavřeno
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function VyrizenoAUzavreno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Vyřízeno a uzavřeno odeslano Dokument
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function UzavrenoVyrizenoOdeslanoDokument(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Vyřízeno a uzavřeno a odesláno Spis
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function UzavrenoVyrizenoOdeslanoSpis(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Vyřízeno a uzavřeno dokument
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function UzavrenoVyrizenoDokument(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Vyřízeno a uloženo
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function VyrizenoAUlozeno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
    * Vyřízeno a uloženo
    *
    * @author DSebesta
    *
    * @param {BaseIconParams} [baseParams]
    * @returns {IconTemplate}
    */
    function VyrizenoAUlozenoSpis(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ztraceno
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Ztraceno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Zastaveno
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Zastaveno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Priorováno / Přesunuto do spisu
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Priorovano(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Archivováno
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Archivovano(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Skartováno
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Skartovano(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
    * PreevidovanoDoSamostatneEvidence
    *
    * @author DSebesta
    *
    * @param {BaseIconParams} [baseParams]
    * @returns {IconTemplate}
    */
    function PreevidovanoDoSamostatneEvidence(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
    * Preneseno
    *
    * @author DSebesta
    *
    * @param {BaseIconParams} [baseParams]
    * @returns {IconTemplate}
    */
    function Preneseno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Schvaleno
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function Schvaleno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Schvaleno Vyrizeno
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function SchvalenoVyrizeno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Schvaleno Vyrizeno Uzavreno
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function SchvalenoVyrizenoUzavreno(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * VlastnenoJinouFunkcí
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function VlastnenoJinouFunkcí(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * V redistribuci
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function VRedistribuci(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     *  Vlastněno jinou funkcí a v redistribuci
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function VRedistribuciVlastnenoJinouFunkci(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ve Spisu
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function VeSpisu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Dokument Ve spisu
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function DokumentVespisu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Dokument Ve spisu
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function SpisVSoucasti(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    function DilVSoucasti(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    function SoucastVSoucasti(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    function SoucastVTypovemSpisu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Entita prirazena ke spisu
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function EntitaPrirazenaKeSpisu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Termín vyřízení
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function TerminVyrizeni(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Před termínem
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function PredTerminem(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Po Terminu
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function PoTerminu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Vyřízeno před termínem
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function VyrizenoPredTerminem(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Vyřízeno po termínu
     *
     * @author DSebesta
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
    function VyrizenoPoTerminu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Elektronický obraz / Hlavní komponenta
     *
     * @author TFeik
     * @date 14.08.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ElektronickyObraz(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Příloha / Komponenta
     *
     * @author TFeik
     * @date 14.08.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Priloha(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Elektronická příloha / komponenta
     *
     * @author TFeik
     * @date 14.08.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function PrilohaElektronicka(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona Fyzciká příloha / komponenta
     *
     * @author TFeik
     * @date 14.08.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function PrilohaFyzicka(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona načtení dávky z NDA.
     *
     * @author TFeik
     * @date 10.09.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function NacistDavkuZNda(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro tisk adres.
     *
     * @author  TFeik
     * @date    12.09.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function TiskAdres(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro zahájení odeslání.
     *
     * @author  TFeik
     * @date    12.09.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function ZahajitOdeslani(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro adresáta.
     *
     * @author  TFeik
     * @date    12.09.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function Adresat(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona pro eDesk zprávu.
     *
     * @author  TFeik
     * @date    18.09.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function EDeskZprava(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona GEX schránky.
     *
     * @author TFeik
     * @date 16.09.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function GexSchranka(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona detail dokumentu.
     *
     * @author TFeik
     * @date 24.09.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DetailDokumentu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona detail spisu.
     *
     * @author TFeik
     * @date 24.09.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DetailSpisu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona detail dokumentu / spisu.
     *
     * @author TFeik
     * @date 24.09.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DetailDokumentuSpisu(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona detail balíku.
     *
     * @author TFeik
     * @date 24.09.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DetailBaliku(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * Ikona detail zásilky.
     *
     * @author TFeik
     * @date 24.09.2019
     *
     * @param {IconsBaseParams} [baseParams] Základní parametry ikon.
     * @returns {IconTemplate} Ikona.
     */
    function DetailZasilky(baseParams?: Gordic.Prefabs.Icons.BaseIconParams): IconTemplate;
    /**
     * xxxxx
     *
     * @author xxxxx
     *
     * @param {BaseIconParams} [baseParams]
     * @returns {IconTemplate}
     */
}
declare namespace Gordic.Gin.PreActions {
    /**
     * Názvy akcí, definovaných v PreAction. Název v enumu odpovídá volané funkci pro vytvoření akce.
     *
     * @author  TFeik
     * @date    19.11.2018
     * @since   480.1.0.202
     */
    enum Names {
        ZobrazDialogVyberuSouboru = "actZobrazDialogVyberuSouboru"
    }
    /**
     * Zobrazí dialog výběru souboru (včetně titulku a popisu).
     *
     * @author  TFeik
     * @date    19.11.2018
     *
     * @param {BasePreActionsInput<undefined} [input]
     * @returns {GActionParams}
     */
    function ZobrazDialogVyberuSouboru(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GSelectFileDlgInputParamsDto>, WebClient.GSelectFileDlgReturnValueDto> & {
        iconTempalte?: IconTemplate;
    }): GActionParams;
}
declare namespace Gordic.Gin.WebClient {
    /**
     * Dialog for entering a password for a 602 account (WebClient)
     *
     * @author thazmuka
     * @since 488
     */
    class GEnter602AccountPassword {
        /** modal dialog element */
        private modal;
        run(parentContent: GContent | null, opt?: Gordic.Gin.Interface.GEnter602AccountPasswordServiceDto): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        private open;
        private setFocus;
        private createForm;
        private createCommandbar;
        private waitForValues;
    }
}
declare namespace Gordic.Widget.GAIVisualiser {
    interface IGDocumentRecognizedItem {
        item: Gin.Interface.GAIRecognizedItemDto;
        canExecute?: boolean | JQuery.Promise<boolean>;
        caption: string;
        valueText: string;
    }
    type DocumentMultiItem = {
        items: IGDocumentRecognizedItem[];
        caption: string;
    };
    type itemListType = {
        group_id: number | null | undefined;
        page: string;
        source: string;
        shapeId: number;
        dimensions: string;
        item: Gin.Interface.GAIRecognizedItemDto;
        item_txt: string;
        formattedText: string;
    };
    interface IGAIVisualiserShape extends Components.CanvasDrawer.IGCanvasShape, IGDocumentRecognizedItem {
    }
    class GAIVisualiserShape extends Components.CanvasDrawer.GCanvasShape implements IGAIVisualiserShape {
        constructor(canvasId: string | Components.CanvasDrawer.IGCanvasShape | GAIVisualiserShape, dimensions?: Components.CanvasDrawer.IGCanvasShapeDimensionOptions, options?: Components.CanvasDrawer.IGCanvasShapeOptions | undefined);
        item: Gin.Interface.GAIRecognizedItemDto;
        caption: string;
        valueText: string;
        canExecute?: boolean;
        copy(): GAIVisualiserShape;
    }
    class GAIVisualiserShapeDrawer extends Components.CanvasDrawer.GBaseShapeDrawer<GAIVisualiserShape> {
        constructor();
        createShape(canvasId: string): GAIVisualiserShape;
        drawCanvas(canvas: HTMLCanvasElement, shape: GAIVisualiserShape): void;
    }
    type GAIVisualiserItemNameMap = {
        [key in keyof typeof Ginis.DbModel.GGinctpoEnum]?: string;
    };
    interface IGAIVisualiserOptions {
        /** List of recognized items */
        recognizedItems?: Gin.Interface.GAIRecognizedItemDto[];
        itemNames?: GAIVisualiserItemNameMap;
        /** Element on which this will collect and trigger events*/
        relatedElement?: JQuery;
        documentIdGetter?: (ctx: IGFilePreviewDataDto) => string;
    }
    /**
     * GAiVisualiser
     *
     * @author Vlastimil Máca
     * @since 490.1.0.24
     */
    class GAIVisualiser extends Gordic.Widget.JQueryWidget<IGAIVisualiserOptions> {
        static widgetName: string;
        static widgetCssName: string;
        static ignoredTypes: Ginis.DbModel.GGinctpoEnum[];
        private logger;
        private actionList;
        private currentShapeDrawer;
        private currentDrawerPromise;
        private currentDrawerDef;
        private itemListDialog?;
        private badge?;
        private formBeingSelected;
        private canExecuteFromForm;
        private applyValueAction;
        private focusValueAction;
        protected wholeDocumentItems: IGDocumentRecognizedItem[];
        private wholeDocumentItemsElement;
        private menuSeparator;
        private documentId?;
        refresh(): void;
        protected _getCreateOptions(): IGAIVisualiserOptions;
        protected _setOption(key: string, value: any): void;
        resizeItems(dpi: number): void;
        private currentDrawer;
        private currentDocumentPages;
        private inlineDialog;
        protected _createDetail(items: IGDocumentRecognizedItem | DocumentMultiItem): JQuery.PromiseBase<JQuery<HTMLElement>, never, never, never, never, never, never, never, never, never, never, never>;
        protected getFormattedValue(item: Gin.Interface.GAIRecognizedItemDto): JQuery.PromiseBase<string, never, never, never, never, never, never, never, never, never, never, never>;
        protected showDetailOnElement(element: JQuery, item: IGDocumentRecognizedItem | DocumentMultiItem): void;
        private destroyDialog;
        protected requestItemApply(item: any): void;
        protected _create(): void;
        _destroy(): void;
        private setRecognizedItems;
        setExistingItems(items: Gin.Interface.GAIRecognizedItemDto[], pages: {
            w: number;
            h: number;
        }[], dpi?: number): void;
        private setWholeDocumentItems;
        private showItemList;
    }
    type GAIFieldMapperCaptionMap = {
        -readonly [key in keyof typeof Ginis.DbModel.GGinctpoEnum]?: string;
    };
    interface IGAIMappedField {
        /** JQuery element, ve kterém se má hledat políčko pro focus, pokud se vybere v AIVisualiseru*/
        fieldScope?: JQuery | (() => JQuery);
        /** Name políčka, které se má použít pro focus, pokud se vybere v AIVisualiseru */
        fieldName?: string;
        /** Název hodnoty, která se zobrazí v AIVisualiseru*/
        caption?: string;
        /**
         * Funkce má za úkol vrátit true/false, které řekne, zda je toto mapování vhodné pro tuto položku
         * @param item
         * @returns
         */
        canBeAppliedForItem?: (item: Gordic.Gin.Interface.GAIRecognizedItemDto) => boolean;
        /**
         *
         * @param fieldScope
         * @param items
         * @returns
         */
        selectItemForField?: (fieldScope: JQuery, items: Gordic.Gin.Interface.GAIRecognizedItemDto[]) => Gordic.Gin.Interface.GAIRecognizedItemDto | null | undefined;
        /**
         * Funkce má za úkol nastavit focus na políčko v předaném scope - vyžádal si to AIVisualiser
         * @param scope
         * @returns
         */
        focusElement?: (item: Gordic.Gin.Interface.GAIRecognizedItemDto, items: Gordic.Gin.Interface.GAIRecognizedItemDto[], scope?: JQuery) => void;
        /**
         * Funkce má za úkol aplikovat hodnotu o políčka předanou z AIVisualiseru.
         * @param item položka k aplikaci
         * @param items seznam všech ostatních položek
         * @returns
         */
        applyValue?: (item: Gordic.Gin.Interface.GAIRecognizedItemDto, items: Gordic.Gin.Interface.GAIRecognizedItemDto[], operationContext?: ObjectLiteral<any>) => JQueryPromise<any> | null | undefined | void;
        /**
         * Funkce má za úkol vrátit true/falze zda jde aplikovat hodnotu této položky (např. do políčka)
         */
        canExecute?: (item: Gordic.Gin.Interface.GAIRecognizedItemDto, items: Gordic.Gin.Interface.GAIRecognizedItemDto[]) => boolean;
    }
    interface IGAIFieldMapperOptions {
        /** Mapování políček pro AIVisualiser */
        itemMap: [Ginis.DbModel.GGinctpoEnum, GAIMappedFieldVariants | (GAIMappedFieldVariants)[]][];
    }
    type GAIMappedFieldVariants = string | JQuery | IGAIMappedField;
    /**
     * GAiFieldMapper
     *
     * @author Vlastimil Máca
     * @since 490.1.0.24
     */
    class GAIFieldMapper extends Gordic.Widget.JQueryWidget<IGAIFieldMapperOptions> {
        static widgetName: string;
        static widgetCssName: string;
        private isFocusingFromVisualiser;
        private isFocusingFromField;
        private documentId?;
        private items;
        private fieldIndex;
        protected _create(): void;
        /**
          *
          * @param item
          * @returns
          */
        getApplicableMappedFields(item: Gordic.Gin.Interface.GAIRecognizedItemDto): GAIMappedFieldVariants[];
        /**
         * Aplikuj vytěženou položku na field
         * @param field
         * @param item
         * @param items
         * @returns
         */
        processFieldForApply(field: GAIMappedFieldVariants, item: Gordic.Gin.Interface.GAIRecognizedItemDto, items: Gordic.Gin.Interface.GAIRecognizedItemDto[], operationContext?: ObjectLiteral<any>): JQuery.Promise<any, any, never>;
        /**
         * Vrátí pro každý typ vytěžené položky popisek
         * Získá je z políček na stejném elementu nebo ze vstupního nastavení
         * @returns
         */
        getCaptionMap(): GAIFieldMapperCaptionMap;
        /**
         * Převezmi vytěžené itemy
         *
         * @param {Gordic.Gin.Interface.GAIRecognizedItemDto[]} items
         * @param {string} [documentId] id dokumentu, kterého se týkají, typicky ixs_ulo
         */
        setItems(items: Gordic.Gin.Interface.GAIRecognizedItemDto[], documentId?: string | null, orderByItemMap?: boolean): void;
        /**
         * Aplikuje vytěžené itemy do políček
         * @param itemsIn
         * @param documentId
         * @returns
         */
        applyItems(itemsIn?: Gordic.Gin.Interface.GAIRecognizedItemDto[] | ApplyItemOptions, documentId?: string): JQueryPromise<any>;
        static createGFieldProvider(mapping: IGAIMappedField, item: Gordic.Gin.Interface.GAIRecognizedItemDto, items: Gordic.Gin.Interface.GAIRecognizedItemDto[]): Components.IGFieldAssistProviderOptions;
    }
    interface ApplyItemOptions {
        items: Gordic.Gin.Interface.GAIRecognizedItemDto[];
        documentId?: string | null;
        inOrderOfItemMap?: boolean;
        operationContext?: ObjectLiteral<any>;
    }
}
interface JQuery {
    /**
     * gaivisualiser visualizer for gfilepreview
     * @author vmaca
     * @param {Gordic.Widget.GAIVisualiser.IGAIVisualiserOptions} [options]
     * @returns {JQuery}
     */
    gaivisualiser(options?: Gordic.Widget.GAIVisualiser.IGAIVisualiserOptions): JQuery;
    gaivisualiser(method: 'refresh'): JQuery;
    gaivisualiser(method: 'option'): Gordic.Widget.GAIVisualiser.IGAIVisualiserOptions;
    gaivisualiser(method: 'option', values: Partial<Gordic.Widget.GAIVisualiser.IGAIVisualiserOptions>): JQuery;
    gaivisualiser<K extends Extract<keyof Gordic.Widget.GAIVisualiser.IGAIVisualiserOptions, string>>(method: 'option', key: K): Gordic.Widget.GAIVisualiser.IGAIVisualiserOptions[K];
    gaivisualiser<K extends Extract<keyof Gordic.Widget.GAIVisualiser.IGAIVisualiserOptions, string>>(method: 'option', key: K, value: Required<Gordic.Widget.GAIVisualiser.IGAIVisualiserOptions>[K]): JQuery;
    gaivisualiser(method: 'instance'): Gordic.Widget.GAIVisualiser.GAIVisualiser;
    gaifieldmapper(options?: Gordic.Widget.GAIVisualiser.IGAIFieldMapperOptions): JQuery;
    gaifieldmapper(method: 'refresh'): JQuery;
    gaifieldmapper(method: 'setItems', items: Gordic.Gin.Interface.GAIRecognizedItemDto[], documentId?: string | null): JQuery;
    gaifieldmapper(method: 'applyItems', items: Gordic.Gin.Interface.GAIRecognizedItemDto[] | Gordic.Widget.GAIVisualiser.ApplyItemOptions, documentId?: string | null): JQueryPromise<any>;
    gaifieldmapper(method: 'getCaptionMap'): Gordic.Widget.GAIVisualiser.GAIFieldMapperCaptionMap;
    gaifieldmapper(method: 'option'): Gordic.Widget.GAIVisualiser.IGAIFieldMapperOptions;
    gaifieldmapper(method: 'option', values: Partial<Gordic.Widget.GAIVisualiser.IGAIFieldMapperOptions>): JQuery;
    gaifieldmapper<K extends Extract<keyof Gordic.Widget.GAIVisualiser.IGAIFieldMapperOptions, string>>(method: 'option', key: K): Gordic.Widget.GAIVisualiser.IGAIFieldMapperOptions[K];
    gaifieldmapper<K extends Extract<keyof Gordic.Widget.GAIVisualiser.IGAIFieldMapperOptions, string>>(method: 'option', key: K, value: Required<Gordic.Widget.GAIVisualiser.IGAIFieldMapperOptions>[K]): JQuery;
    gaifieldmapper(method: 'instance'): Gordic.Widget.GAIVisualiser.GAIVisualiser;
}
declare namespace Gordic.Gin.WebClient {
    class GActionTimerList extends GContentBase {
        private grid;
        prepareContent(): void;
        private initCnt;
        private createGrid;
        private createGridFormat;
        private setDataToGrid;
        private createActions;
        private createBreadcrumbs;
        private createMenuBar;
        private nulovatAction;
        private save;
        private actLoadSberMetrik;
    }
}
declare namespace Gordic.Gin.WebClient {
    class GAktualnePracujiciUzivatele extends GContentBase {
        private grid;
        prepareContent(): void;
        private initCnt;
        private createGrid;
        private createGridFormat;
        private setDataToGrid;
        private createActions;
        private createBreadcrumbs;
        private createMenuBar;
    }
}
declare namespace Gordic.Gin.WebClient.AiChat {
    type GAiErrorTarget = "window" | "toast" | "hidden";
    interface GAiErrorOptions {
        message?: string;
        cause?: unknown;
        target?: GAiErrorTarget;
    }
    /**
     * Base class for all AI related errors.
     * Subclasses override static defaultMessage / defaultTarget.
     */
    class GAiError extends GError {
        static readonly DEFAULT_MESSAGE: string;
        static readonly DEFAULT_TARGET: GAiErrorTarget;
        static readonly NAME: string;
        constructor(options?: GAiErrorOptions);
    }
    class GAiAnswerParseError extends GAiError {
        static readonly DEFAULT_MESSAGE = "P\u0159\u00EDchoz\u00ED odpov\u011B\u010F je v nepodporovan\u00E9m form\u00E1tu";
    }
}
declare namespace Gordic.Gin.WebClient.AiChat {
    const enum GAiResponseEvent {
        AiChatGridCondFormatApply = "AiChatGridCondFormatApply",
        AiChatUserColumnsAdd = "AiChatUserColumnAdd",
        AiChatUserColumnsDel = "AiChatUserColumnDel",
        AiChatFilterAdd = "AiChatFilterAdd",
        AiChatFilterDel = "AiChatFilterDel",
        AiChatTextAnswer = "AiChatTextAnswer"
    }
    interface IGAiResponseParser {
        parse(aiResponse: string): IGAiTriggeredResponseEventsDto[];
    }
    /**
     * Nese ResponseJson a seznam triggered eventů
     */
    interface IGAiTriggeredResponseEventsDto {
        eventsTriggered: GAiResponseEvent[];
        response: IGAiResponseJson;
    }
    interface IGAiResponseJson {
        widgetId: string;
        action: "add" | "delete" | "none";
        caption?: string;
        text?: string;
        condFormat?: Gordic.Components.Grid.CondFormats.CondFormat;
        userColumns?: Gordic.Components.Grid.UserColumn.UserColumnSeed[];
        filterColumns?: IGAiGridFilterColumnDictionary;
    }
    interface IGAiGridFilterColumnDictionary {
        [key: string]: {
            filterValue: IGGridFilterValue;
        };
    }
    class GAiResponseJsonParser implements IGAiResponseParser {
        private eventConsumer;
        private _gstor;
        private gstore;
        constructor(eventConsumer: GContent);
        parse(aiResponse: string): IGAiTriggeredResponseEventsDto[];
        private createReasoningResponse;
        parseResponseArray(responseJson: IGAiResponseJson[]): IGAiTriggeredResponseEventsDto[];
        parseResponseJson(responseJson: IGAiResponseJson): IGAiTriggeredResponseEventsDto;
        private validateResponseJson;
        private validateFilterColumnsDictionary;
    }
    /**
     * Parsování odpovědí
     *
     * Pokud odpověď obsahuje podporovanou akci + objekt, dojde k patřičné event trigger
     */
    function responseEventToString(event: GAiResponseEvent): string;
}
declare namespace Gordic.Gin.WebClient.AiChat {
    type IGAttachmentDataWrapper = IGAttachmentDataDelegate | IGAttachmentDataPromise | IGAttachmentDataForm;
    /**
     * Ideálně využít interface Gordic.Gin.Interface.GAiChatAttachmentDto, který umožňuje přenos souborů GFileInfoDto, ale může to být i prostý objekt (pak se převede na JSON a pošle se jako EncodedAttachment)
     */
    type GAttachmentType = Gordic.Gin.Interface.GAiChatAttachmentDto | Object;
    interface IGAttachmentDataPromise {
        kind: "promise";
        dataPromise: JQueryPromise<GAttachmentType | GAttachmentType[]>;
    }
    /**
     * AI příloha přes delegáta
     */
    interface IGAttachmentDataDelegate {
        kind: "delegate";
        dataFn: () => GAttachmentType | GAttachmentType[] | JQueryPromise<GAttachmentType | GAttachmentType[]>;
        /**
         * Funkce, která se zavolá po úspěšném zpracování přílohy (tzn. po odeslání do AI). Např úklid temp souborů.
         * @returns
         */
        onDataFn?: () => void;
    }
    /**
     * AI příloha z formuláře. Z formuláře posbírají prezentační hodnoty (tak, jak je vidí uživatel).
     */
    interface IGAttachmentDataForm {
        kind: "form";
        /** JQuery formuláře, ze kterého se posbírají FormViewValues, nebo přímo FormViewValues*/
        form: JQuery<HTMLElement> | JQueryPromise<FormViewValue[]>;
    }
    interface IGAttachmentDefinition {
        /**Id podle kterého jsou registrovány přílohy. Id si programátor musí striktně hlídat.
         *
         * Todo: Nápad je takový, že by se zveřejňované přílohy registrovali databáze a šly by na ně navázat scénáře
         */
        id: string;
        /** Popis přílohy, který se zobrazí v náhledu */
        caption: string;
        /** Wrapper dat, které vstoupí do AI. Uživatel vidí dostupnost přílohy podle toho, zdali tato vlastnost není null|undefined */
        dataWrapper: IGAttachmentDataWrapper;
        /** Pokud je vyplněno, příloha se zpracuje pouze jednou nebo pokud dojde ke změně cacheId. (změnou idCache dojde k přepsání cache)
         *
         * Např. pokud delegát volá asynchronně data ze serveru a chcete zajistit,
         * že se zavolá pouze jednou, né při každém dotazu, vyplňte idCache,
         * pro přepsání cache hodnoty následně idCache změňte.
         */
        idCache?: string;
    }
    /**
     * Objekt předávaný v eventech pro přidání/odebrání příloh do/z dispatchera.
     */
    interface IGAttachmentPayload {
        /**Pole AI příloh*/
        attachments: IGAttachmentDefinition[];
    }
    class GAttachmentDispatcher extends Gordic.Gui.WebControls.GItemDispatcherAbstract<IGAttachmentDefinition> {
        /**
         * Event, který po vyvolání na zadaném elementu (např. builder.element) vyvolá požadavek na přidání příloh(y) do dispatchera.
         * Parametrem eventu je IGAttachmentDefinition nebo pole IGAttachmentDefinition, které se přidají do dispatchera.
         */
        static readonly TRIGGER_UPSERT: "trig-att-upsert";
        /**
         * Event, který po vyvolání na zadaném elementu (např. detail builder) vyvolá odebrání příloh(y) z dispatchera.
         */
        static readonly TRIGGER_REMOVE: "trig-att-remove";
        /**
         * Event, který je vyvolán jednorázově při sestavování detail builderu (v onBuild) na builder.element.
         * Jde o jednorázovou žádost o přílohy IGAttachmentDefinition[], které se přidají do dispatchera.
         */
        static readonly ON_UPSERT_REQUEST: "on-att-upsert-request";
        /**
         * Namespace pro eventy dispečera.
         */
        static readonly EV_NAMESPACE: ".attachment-dispacher";
        constructor();
        /**
         * Returns true if the attachment was newly added, false if it was updated.
         * @param attachment
         * @returns true if the attachment was newly added, false if it was updated.
         */
        upsert(attachment: IGAttachmentDefinition): boolean;
        /**
         * Publishes a new attachment if and only if it is not published yet. Throws an error if the attachment with the same ID already exists.
         * @param attachment
         */
        publish(attachment: IGAttachmentDefinition): void;
        remove(attachment: IGAttachmentDefinition): void;
        /**
         * Trigger GAttachmentDispatcher.EV_ATTACHMENT_UPSERT_REQUEST evetu s polem, do kterého se mohou vložit požadované přílohy. Ty budou přidány do dispatchera.
         * a zpřístupněny ai subcontentu.
         * @param element element, na kterým dojde k event trigger
         */
        triggerUpsertRequestEvent(element: JQuery): void;
        /**
         * Zaregistruje event handler na zadaném elementu, který bude naslouchat na GAttachmentDispatcher.TRIGGER_UPSERT eventu.
         * Ten přijímá jako parametr IGAttachmentDefinition nebo pole IGAttachmentDefinition, které se přidají do dispatchera.
         *
         * O registraci event se v případě použítí DetailBuilderu postará GGinAiSubcontentComponent v metodě onInit.
         * @param src element, na kterém dojde k event bindingu
         */
        registerEvents(src: JQuery): void;
        private _publish;
        private upsertPayload;
        private removePayload;
    }
}
declare namespace Gordic.Gin.WebClient.AiChat {
    /** Deklarace clientských retry politik při chybách vrácených ze serveru (ErrorNotFound, Timeout, ...)*/
    interface IGAiRetryPolicy {
        /**
         * Funkce či skupina funkcí, které rozhodnou o tom, co se stane při Gin.Interface.GAiChatErrorEnum.ErrorFileNotFound
         * @returns
         */
        onErrorFileNotFound?: (fileErrors: Interface.GAiChatAppErrorDto[]) => void;
        /**
         * Funkce která rozhodne o tom, co se stane při Gin.Interface.GAiChatErrorEnum.ErrorTimeout
         * @returns
         */
        onTimeout?: (timeoutErrors: Interface.GAiChatAppErrorDto[]) => void;
        onLicenceError?: (licenseErrors: Interface.GAiChatAppErrorDto[]) => void;
        onRefusal?: (licenseErrors: Interface.GAiChatAppErrorDto[]) => void;
    }
    type GAiRetryPolicyType = IGAiRetryPolicyProgressive | IGAiRetryPolicyStatic;
    /**Politiky opakování při chybách, které se aplikují postupně na každý pokus. Prvek pole = politka pro daný pokus.*/
    interface IGAiRetryPolicyProgressive {
        /**
         * Politiky opakování při chybách, které se aplikují postupně na každý pokus. Délka pole určuje počet pokusů, prvek pole = politka pro daný pokus.
         */
        progressiveAttempts: IGAiRetryPolicy[];
    }
    /**Jednoduchá verze retry politik, retry politiky se opakují stejně při každém pokusu*/
    interface IGAiRetryPolicyStatic {
        /**Počet pokusů*/
        attempts: number;
        /**Politiky opakování při chybě*/
        retryPolicy: IGAiRetryPolicy;
    }
    interface IGAiChatErrorHandler {
        handleErrors(errors: Interface.GAiChatAppErrorDto[]): number;
    }
    class GAiChatErrorHandler implements IGAiChatErrorHandler {
        private attemptsMade;
        private retryPolicyProg;
        constructor(retryPolicy: GAiRetryPolicyType);
        handleErrors(errors: Interface.GAiChatAppErrorDto[]): number;
        static normalizeRetryPolicy(retryPolicy: IGAiRetryPolicyStatic | IGAiRetryPolicyProgressive): IGAiRetryPolicyProgressive;
        static toProgressivePolicy(staticPolicy: IGAiRetryPolicyStatic): IGAiRetryPolicyProgressive;
    }
}
declare namespace Gordic.Gin.WebClient.AiChat {
    const enum ChatCssStylesRolesEnum {
        UserMessage = "gaichat-user-message",
        AiMessage = "gaichat-ai-answer",
        CopilotMessage = "gaichat-copilot-message",
        CopilotSuggestedAction = "gaichat-copilot-act",
        Scenario = "gaichat-scenario"
    }
    const enum ChatCssStylesEnum {
        Container = "gaichat-container",
        ErrorState = "gaichat-error",
        DisabledMessage = "gaichat-disabled-message",
        AnimationRight = "gaichat-anim-right",
        AnimationUp = "gaichat-anim-up",
        AnimationShake = "gaichat-anim-shake"
    }
    interface LlmMessage {
        ixsLap: string;
        role: "system" | "user" | "assistant" | "copilot";
        content: string;
        /** content may contain error message, default false*/
        isError?: boolean;
        /** default true*/
        isNewMessage?: boolean;
    }
    class GAiChatFormatter {
        static readonly NS: "gaichatformatter";
        static scenarioItemTemplate(menuParams: MenuParams[]): JQuery;
        static aiChatItemTemplate(msges: LlmMessage[], selectedIxsLap?: string): JQuery;
        static llmMessageToJQuery(msg: LlmMessage, selectedIxsLap?: string): JQuery<HTMLElement>;
        static formatUserMessage(message: string, isNew?: boolean, isDisabled?: boolean, isError?: boolean): JQuery<HTMLElement>;
        static formatAiAnswer(message: string, isNew?: boolean, isDisabled?: boolean, isError?: boolean): JQuery<HTMLElement>;
        static formatCopilotMessage(message: string, isNew?: boolean, isDisabled?: boolean, isError?: boolean): JQuery<HTMLElement>;
        static formatCopilotCreateSuggestedAction(message: string, isNew?: boolean, isDisabled?: boolean, isError?: boolean): JQuery<HTMLElement>;
        static formatErrorMessage(message: string, isNew?: boolean, isDisabled?: boolean): JQuery<HTMLElement>;
        private static newDiv;
        private static newMarkdown;
        private static resolveClasses;
        private static resolveAnimationClass;
    }
}
declare namespace Gordic.Gin.WebClient.AiChat {
    /**Optiony pro GAiChatPredictor*/
    interface IGAiChatPredictorOptions {
        /**
         * Politiky opakování při chybách. attempts/délka pole určuje počet pokusů.
         */
        retryPolicy?: GAiRetryPolicyType;
        attachmentProcessor?: IGAttachmentProcessor;
    }
    interface IGAiChatPredictor {
        predict(chatAppDto: Interface.GAiChatAppDto, attachments: IGAttachmentDefinition[], aiChatSubcontent: GAiChatSubcontent): JQueryPromise<Interface.GAiChatAppDto>;
    }
    class GAiChatPredictor implements IGAiChatPredictor {
        private retryPolicy;
        private attachmentProcessor;
        constructor(options?: IGAiChatPredictorOptions);
        predict(chatAppDto: Interface.GAiChatAppDto, attachments: IGAttachmentDefinition[], aiChatSubcontent: GAiChatSubcontent): JQueryPromise<Interface.GAiChatAppDto>;
        private createDefaultRetryPolicy;
        private handlePrediction;
        private predictWithRetryLoop;
        private _predict;
        private onSuccessPredictionCall;
    }
}
declare namespace Gordic.Gin.WebClient.AiChat {
    /**
     * Builder class for creating GAiSubconent. Use this builder to create GAiSubcontent with desired tabs (SuggestedActions, AiChat, ...) with no risks of misconfiguration, options inrefaces are available.
     */
    class GAiChatSubcontentBuilder {
        private aiChatOpts?;
        constructor();
        /**
         * Add AI Chat
         * @param aiChatOptions
         * @returns
         */
        aiChat(aiChatOptions: IGAiChatOptions): GAiChatSubcontentBuilder;
        /**
         * Creates initializer for built configuration
         * @returns
         */
        buildInitializer(): GContentInitializer;
        /**
         * Creates GAiSideBar (member of GContent) for built configuration
         * @param parentContent
         * @returns
         */
        buildContent(parentContent?: GContent): GAiChatSubcontent;
        private buildExtend;
    }
}
declare namespace Gordic.Gin.WebClient {
    interface IGAiChatConversationHist {
        message: string;
        aiChatName: string;
    }
    class GAiChatSubcontentHistModal extends GContent {
        private messages;
        private $msgsDiv;
        prepareContent(inputParams: any): void;
        private generateMesseges;
        private static toJsonMarkDown;
    }
}
declare namespace Gordic.Gin.WebClient.AiChat.Prefabs {
    function registerGinisCopilotEvents(aiSubcontent: GAiChatSubcontent, grids: JQuery<HTMLElement>[]): void;
    /**
     * @deprecated Nyní se používá pro vytváření baru Gordic.Gin.WebClient.GAiSubcontentBuilder!
     * @param parentContent
     * @param ginclgcEnum
     * @param options
     * @returns
     */
    function createDockedAiSubcontent(parentContent: GContent, ginclgcEnum: Ginis.DbModel.GGinclgcEnum, options?: Widget.IGSubcontentOptions): GAiChatSubcontent;
    /**
     * @deprecated Nyní se používá pro vytváření baru Gordic.Gin.WebClient.GAiSubcontentBuilder!
     * @param parentContent
     * @param ginclgcEnum
     * @param options
     * @returns
     */
    function createDockedAiSideBar(parentContent: GContent, ginclgcEnum: Ginis.DbModel.GGinclgcEnum, options?: Widget.IGSubcontentOptions): GAiSubcontent;
}
/**
 * Vygeneruje náhodný alfanumerický string o 5 znacích
 * @param prefix
 * @returns
 */
declare function generateRandomName(prefix: string): string;
/**
 *
 * @param value
 * @param variantId
 * @returns errorMessage, empty string if value is valid
 */
declare function validateFilterValue(value: any, variantId: string): string;
declare function validateNumberInterval(value: any): boolean;
declare function validateCurrencyInterval(value: any): boolean;
declare namespace Gordic.Gin.WebClient.AiChat {
    /**
     * Metadata o gridu, které vstupují do AI. Na základě těchto metadat AI sestavuje GINIS objekty
     */
    interface IGAiChatGridMetadata<TRow = any> {
        /** Identifikátor widgetu (aby bylo v případě více gridů možné určit adresáta objektů)*/
        widgetId: string;
        metadata: (Pick<GGridColumn<TRow>, "name" | "caption" | "columnType" | "description" | "requires" | "filterVariant"> & {
            isUserColumn?: boolean;
        })[];
    }
    interface IGAiChatScenariosRequest {
        scenarios: IGAiChatPromptScenario[];
    }
    interface IGAiChatPromptScenario {
        /**
         * prompt -> Jak se má AI model chovat
         *
         * Například:
         * Jsi AI Asistent, který má za úkol sumarizovat důležité informace z přidaného kontextu.
         *
         * (pokud existuje kontext, backend ho automaticky přilepí jako 'kontext: [nějaký váš předaný kontext]')
         */
        prompt: string;
        /** Název pro interní využití, využíván jako name ve fieldech*/
        name: string;
        /** Uživatelem viditelný krátký popis scénáře */
        caption: string;
        /** Uživatelem viditelný dlouhý popis scvénáře*/
        captionLong: string;
        requestAttachments: GAiChatDataType[];
        avalableFor?: "onYourData" | "general";
        chatApp?: Gin.Interface.GAiChatAppDto;
    }
    interface IGAiChatDataHandled {
        attachments: Gin.Interface.GAiChatAttachmentDto[];
        promise: JQueryPromise<any>;
    }
    enum GAiChatSubcontentEvents {
        /** AI žádá o přílohy*/
        AttachmentsRequest = "AiChatAttchReq",
        /** AI dává navědomí, že přílohy byly zpracovány */
        AttachmentsRecieved = "AiChatAttachAck",
        /** AI žádost o přednastavené scénáře*/
        ScenariosRequest = "AiChatScenariousReq",
        ChatMessageEnter = "AiChatMsgEnter",
        ChatMessageLeave = "AiChatMsgLeave",
        /** Došlo ke změně menu params*/
        ScenariosMenuParamsChanged = "AiChatScenMenuParamsChanged"
    }
    interface IGAiChatOptions {
        /**
         * Identifikace ai podporovaného contentu z číselníkové tabulky Ginclgc
         */
        aiContentType: Ginis.DbModel.GGinclgcEnum;
        /**Může být třeba ixs či jiný indetifikátor, slouží ke cachování dat*/
        extraIndetifier?: string;
        attachmentDispatcher?: GAttachmentDispatcher;
        /** Informace pro copilota, pokud je vyplněno, copilot bude rovnou aktivován a aplikace typu copilot budou funkční */
        copilotOptions?: IGAiCopilotOptions;
    }
    interface IGAiCopilotOptions {
        /** Seznamy, ze kterých copilot čerpá metadata */
        grids: JQuery<HTMLElement>[];
    }
    class GAiChatSubcontent extends GContent {
        static readonly ASSEMBLY_NAME: "Gordic.Uka.WebClient.GAiChatSubcontent";
        static readonly CSS_CLASS_NAME: "aichatsubcontent";
        static readonly UID: "aichatsubcontent#";
        static readonly TITLE: "AI Panel";
        static readonly ICON: "gi-ai";
        get builtCssClassName(): string;
        get cacheKey(): string;
        private cssClassName;
        private completeUidPath;
        private attachmentCache;
        private attachmentProcessor;
        private predictor;
        get attachmentDispacher(): GAttachmentDispatcher;
        private attachmentDispatcher;
        private attachmentsDefMap;
        private attachmentsView;
        private attViewCallback;
        private scenarioCallback;
        private _ansParser;
        protected get ansParser(): AiChat.IGAiResponseParser;
        private readonly scenariousFormName;
        private readonly conversationFormName;
        private readonly conversationFeildName;
        private readonly inputConversationFormName;
        private readonly usrPromptFieldName;
        private readonly appSelectionFormName;
        private readonly scenarioLinkName;
        private readonly chatAppSelectDummyFieldName;
        private extraIndetifier;
        private aiContentType;
        private copilotOptions?;
        private aiChatOptions?;
        aiChatAppsPromise: JQueryPromise<Interface.GAiChatAppDto[]>;
        private aiChatAppsDataViewPromise;
        private llmDataModel;
        private lastSelectedAppIxsLap;
        /**Reference na konrétní záznam cache téhle instance do ní klidně zapisovat, číst pouze přes assign!*/
        private cacheRecordRef;
        private scenariosLinkMenuParamsObs;
        private $chatAppSelectBox;
        prepareContent(): void;
        private createMenuBar;
        private createAppSelectBox;
        private createForms;
        private subscribeCallbacks;
        private registerMessageEvents;
        private onHoverEnter;
        private onHoverLeave;
        private createScenariousFormAsync;
        /**
         * Získá scénáře od DB a od programátorů
         * @param selectedChatApp
         * @returns
         */
        private getScenariosDataAsync;
        private createScenariosChildernMenuParams;
        /**
         * starý pro načítání scénářů jako linků do section
         * @deprecated
         */
        private createScenariosFormWithSectionView;
        private predict;
        private updateConversationFieldNewErrorAnswer;
        private updateConversationFieldNewUserMsg;
        private updateConversationField;
        private resetUsrField;
        private tryRegisterCopilotEvents;
        private buildRecursiveUidPath;
        private runScenario;
        private runDeleteChatHistPreview;
        private runDeleteChatHist;
        private deleteChatHistory;
        private applyModel;
        private collectModel;
        private isAiChatFormValid;
        private _destroy;
        private unsubscribeCallbacks;
        private saveModelToCache;
        private saveAppsToCache;
        closing(): void;
    }
}
declare namespace Gordic.Gin.WebClient {
    /**
     * Options for SuggestedActions tab
     */
    interface IGSuggestedActionsOptions {
        dispatcher: Gui.WebControls.GSuggestedActionDispatcher;
        uid?: string;
    }
    interface IGAiSideBarOptions {
        uid?: string;
    }
    /**
     * Agreguje AI Chat subcontent, SuggestedActions subcontent (do budoucna případně další AI-related subcontenty). Pro jednodušší vytváření je zde GAiSubcontentBuilder
     * @deprecated Use Gordic.Gin.WebClient.AiChat.GAiChatSubcontent instead
     */
    class GAiSubcontent extends GContent {
        static readonly CSS_CLASS_NAME: "g-ai-subcontent";
        static readonly UID_DEFAULT: "gaisubcontent#";
        static readonly DEFAULT_ICON: "gi-ai";
        static readonly DEFAULT_TITLE: "AI panel";
        static readonly EVENT_NAMESPACE = "gaisubcontent";
        private groups;
        prepareContent(): void;
        get scAiChat(): AiChat.GAiChatSubcontent | undefined;
        get scAiChatLoadingAwaited(): JQueryPromise<AiChat.GAiChatSubcontent>;
        private aiChatOptions;
        private $aiChatTab?;
        private aiChatSubcontent?;
        private static readonly AI_CHAT_TAB_GROUP_ID;
        private initializeAiChatSubcontentTab;
    }
    /**
     * Builder class for creating GAiSubconent. Use this builder to create GAiSubcontent with desired tabs (SuggestedActions, AiChat, ...) with no risks of misconfiguration, options inrefaces are available.
     * @deprecated Use Gordic.Gin.WebClient.AiChat.GAiChatSubcontentBuilder instead to create only AI Chat subcontent
     */
    class GAiSubcontentBuilder {
        private sugOpts;
        private aiChatOpts;
        private sideBarOptions;
        constructor(sideBarOptions?: IGAiSideBarOptions);
        /**
         * Adds suggestedActions tab
         * @param suggestedActionOpts
         * @returns
         */
        suggestedActionTab(suggestedActionOpts: IGSuggestedActionsOptions): GAiSubcontentBuilder;
        /**
         * Add AI Chat
         * @param aiChatOptions
         * @returns
         */
        aiChatTab(aiChatOptions: AiChat.IGAiChatOptions): GAiSubcontentBuilder;
        /**
         * Creates initializer for built configuration
         * @returns
         */
        buildInitializer(): GContentInitializer;
        /**
         * Creates GAiSideBar (member of GContent) for built configuration
         * @param parentContent
         * @returns
         */
        buildContent(parentContent?: GContent): GAiSubcontent;
        private buildExtend;
    }
}
declare namespace Gordic.Gin.WebClient.AiChat {
    interface IGAttachmentCache {
        upsert(definition: IGAttachmentDefinition): JQueryPromise<Interface.GAiChatAttachmentDto[]>;
        get(key: IGAttachmentDefinition | string): JQueryPromise<Interface.GAiChatAttachmentDto[]> | undefined;
        flush(): void;
        dirty(key: IGAttachmentDefinition | string): void;
    }
    class GAttachmentCache implements IGAttachmentCache {
        private cache;
        constructor();
        get(key: IGAttachmentDefinition): JQueryPromise<Interface.GAiChatAttachmentDto[]> | undefined;
        flush(): void;
        dirty(key: IGAttachmentDefinition): void;
        upsert(definition: IGAttachmentDefinition): JQueryPromise<Interface.GAiChatAttachmentDto[]>;
        private updateCache;
        private getId;
    }
}
declare namespace Gordic.Gin.WebClient.AiChat {
    /**
     * Sp�e pro budouc� pou�it� pro rozli�ov�n� typu vy��dan�ch dat
     *
     */
    type GAiChatDataType = "files" | "info" | "copilot";
    interface IGAiChatDataRequest {
        /**
         * Kl�� pod kter�m ChatBot hled� data
         */
        type: GAiChatDataType;
        /**
         * P�ed�n� dat pro kontext AI Chatu.
         *
         * Chatbot bude jako kontext br�t vlastnost EncodedAttachment,
         * pokud nem� prob�hnout dal�� p�edzpracov�n�, lze soubor p�edat ji� p�eveden�
         * na text*/
        data?: Gin.Interface.GAiChatAttachmentDto[] | JQuery.Promise<Gin.Interface.GAiChatAttachmentDto[]>;
        /**
         * promise obecn�ho typu object
         *
         */
        generalData?: object | JQueryPromise<object>;
    }
    interface IGAttachmentProcessor {
        processAttachments(attachments: IGAttachmentDefinition[]): JQueryPromise<Interface.GAiChatAttachmentDto[]>;
        cache?: IGAttachmentCache;
    }
    class GAttachmentProcessor implements IGAttachmentProcessor {
        private attachmentDefinitions;
        private _cache;
        get cache(): IGAttachmentCache;
        constructor(cache?: IGAttachmentCache);
        processAttachments(attachments: IGAttachmentDefinition[]): JQueryPromise<Gordic.Gin.Interface.GAiChatAttachmentDto[]>;
        private obtainAttachmentDtoPromise;
        static isGAiChatAttachmentDto(obj: unknown): obj is Gordic.Gin.Interface.GAiChatAttachmentDto;
        static toAttachmentArrayPromise(definition: IGAttachmentDefinition): JQueryPromise<Gordic.Gin.Interface.GAiChatAttachmentDto[]>;
        static conevertAttachmentTypeToDto(att: GAttachmentType, srcDefinition: IGAttachmentDefinition): Gordic.Gin.Interface.GAiChatAttachmentDto;
        /**
         * P�ev�d� pole FormViewValue na �sporn�j�� Gordic.Gin.Interface.GAiChatAttachmentDto s FormDto napln�n�m sekcemi.
         * FormDto: {
         *     sections: [{ name: "Sekce", rows: [{ label: "��dek", value: "Hodnota" }] }]
         * }
         * @param values
         * @returns
         */
        static formViewValuesToAiAttachmentDto(values: FormViewValue[]): Gordic.Gin.Interface.GAiChatAttachmentDto;
        /**
         * Zbav� se p��padn�ch JQuery HTML element�, kter� nelze serializovat.
         * JQuery d�laj� probl�my nap� p�i apply/collectu.
         * @param attDeffinition
         * @returns
         */
        static getRidOfJQueryHtmlElement(attDeffinition: IGAttachmentDefinition): IGAttachmentDefinition;
        /**
         * Vol� .gform("getViewValues") na zadan�m formul��i a vrac� promise s FormViewValue[]
         * @param form
         * @returns
         */
        static formToFormViewValues(form: JQuery<HTMLElement>): JQueryPromise<FormViewValue[]>;
        /**
         * Velice striktn� is check na JQuery kolekci obsahuj�c� pouze HTML elementy.
         * @param obj
         * @returns
         */
        static isJQueryHtmlElement(obj: unknown): obj is JQuery<HTMLElement>;
        static isGAttachmentType(obj: unknown): obj is GAttachmentType;
    }
}
declare namespace Gordic.Gin.WebClient {
    /** Content s detailem článku blogu */
    class GBlogClanekDetail extends GContentBase {
        /** Identifikátor článku */
        ixs_clb?: string | null;
        private data;
        private ixs_fun;
        private $form;
        private $article;
        /** Příznak, zda byla provedena změna na detailu */
        private changed;
        closing(ctx: any): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření menubaru */
        private createMenuBar;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /** Vytvoření formuláře */
        private createForm;
        /** Vytvoření textového editoru*/
        private createArticle;
        /** Vytvoření status baru*/
        private createStatusBar;
        /** Uložení a zavření contentu */
        private save;
        /** Akce pro zveřejnění blogu */
        private zverejnit;
        /** Akce pro zrušení zveřejnění blogu */
        private zrusitZverejneni;
        /** Akce pro smazání blogu */
        private smazat;
    }
}
declare namespace Gordic.Gin.WebClient {
    /** Vstupní dto pro historii editace článku blogu */
    interface GBlogClanekHistorieDlgInputParams {
        /** Identifikátor článku */
        ixs_clb: string;
        /** Doplňující název článku*/
        title?: string | null;
    }
    class GBlogClanekHistorie extends GContentBase {
        /** Identifikátor článku */
        ixs_clb: string;
        /** Hlavní grid pro události článku */
        private $grid;
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /** Vytvoření gridu */
        private createGrid;
        /**
         * Vytvoření gridformátu
         * @returns
         */
        private createGridFormat;
    }
}
declare namespace Gordic.Gin.WebClient {
    /**Vstupní dto pro dialog s contentem přečtení článku blogu */
    interface GBlogClanekPrecistDlgInputParams {
        /** Identifikátor článku */
        ixs_clb: string;
        /**Příznak, zda se jedná čistě o preview článku (nebudou se provádět zápisy do událostí) */
        preview?: boolean | null;
    }
    class GBlogClanekPrecist extends GContentBase {
        /** Identifikátor článku */
        ixs_clb?: string | null;
        /**Příznak, zda se jedná čistě o preview článku (nebudou se provádět zápisy do událostí) */
        preview: boolean;
        private data;
        private $article;
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /** Vytvoření článku */
        private createArticle;
    }
}
declare namespace Gordic.Gin.WebClient {
    /** Content se seznamem článků blogů pro správu */
    class GBlogClanekSeznam extends GContentBase {
        private $grid;
        private previewController;
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření menubaru */
        private createMenuBar;
        /** Vytvoření gridu */
        private createGrid;
        /**
         * Vytvoření gridformátu
         * @returns
         */
        private createGridFormat;
        /** Akce pro zveřejnění článku/ů */
        private zverejnit;
        /** Akce pro zrušení zveřejnění článku/ů */
        private zrusitZverejneni;
        /** Akce pro smazání článku/ů */
        private smazat;
        /** Vytvoření sidebaru s náhledem */
        private createPreviewSidebar;
    }
}
declare namespace Gordic.Gin.WebClient {
    /** Vstupní dto pro dialog s contentem události nad článkem blogu*/
    interface GBlogClanekUdalostDlgInputParams {
        /** Identifikátor článku */
        ixs_clb: string;
        /** Doplňující název článku*/
        title?: string | null;
    }
    class GBlogClanekUdalost extends GContentBase {
        /** Identifikátor článku */
        ixs_clb: string;
        /** Hlavní grid pro události článku */
        private $grid;
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /** Vytvoření gridu */
        private createGrid;
        /**
         * Vytvoření gridformátu
         * @returns
         */
        private createGridFormat;
    }
}
declare namespace Gordic.Gin.WebClient {
    /** Content s detailem blogu */
    class GBlogDetail extends GContentBase {
        /** Identifikátor blogu */
        ixs_blg?: string | null;
        private data;
        /** Příznak, zda je zakoupena rozšířená licence blogového systému */
        private licence;
        private $form;
        /** Příznak, zda byla provedena změna na detailu */
        private changed;
        closing(ctx: any): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření menubaru */
        private createMenuBar;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /** Vytvoření formuláře */
        private createForm;
        /** Vytvoření status baru*/
        private createStatusBar;
        /** Uložení a případné zavření contentu */
        private save;
        /** Akce pro zveřejnění blogu */
        private zverejnit;
        /** Akce pro zrušení zveřejnění blogu */
        private zrusitZverejneni;
        /** Akce pro smazání blogu */
        private smazat;
    }
}
declare namespace Gordic.Gin.WebClient {
    /** Content se seznamem blogů pro správu */
    class GBlogSeznam extends GContentBase {
        private $grid;
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření menubaru */
        private createMenuBar;
        /** Vytvoření gridu */
        private createGrid;
        /**
         * Vytvoření gridformátu
         * @returns
         */
        private createGridFormat;
        /** Akce pro zveřejnění blogu */
        private zverejnit;
        /** Akce pro zrušení zveřejnění blogu */
        private zrusitZverejneni;
        /** Akce pro smazání blogu */
        private smazat;
    }
}
declare namespace Gordic.Widget {
    /** Options widgetu pro zobrazení článků čtenáři */
    interface IGBlogWidgetOptions extends JQueryUI.WidgetOptions {
        /** Promise s daty blogu pro zobrazení */
        data: JQueryPromise<Array<Gordic.Gin.Interface.GBlogClanekDto>>;
    }
    /** Widget pro zobrazení článků blogů čtenáři */
    class gblog extends Gordic.Widget.JQueryWidget<IGBlogWidgetOptions> {
        static widgetName: string;
        /** Hlavní element s blogy */
        private $blogContainer;
        protected _create(): void;
        refresh(): void;
        _destroy(): void;
    }
}
interface JQuery {
    gblog(options: Gordic.Widget.IGBlogWidgetOptions, ...otherOptions: Partial<Gordic.Widget.IGBlogWidgetOptions>[]): JQuery;
    gblog(method: "destroy"): JQuery;
    gblog(method: "refresh"): JQuery;
}
declare namespace Gordic.GCalendar {
}
declare namespace Gordic.Gin.WebClient {
    class GCalendarEvent extends GContentBase {
        /** příznak uložení události bez příznaku (políčka) opakování */
        private withoutRepetion;
        /** pro refresh */
        private closeState;
        private panelDocInfoElement;
        private myservice;
        private icsDto;
        private CalendarDate?;
        private IxsOka;
        private NewEvent;
        private form;
        private Data;
        onContentReady(): void;
        private init;
        /**
         * potvrzovací dialog
         * @param event data události
         */
        private showConfirmDlg;
        private acceptRemoveEvent;
        private enableForm;
        /**
         * poslat notifikaci
         *
         * @param {IGCalendarNotification} event událost
         * @param {string} [ixx] identifikátor - pokud bude vyplněn budu ho považovat jako ixp a budu se pokoušet otevřít dokument
         * - v případě, že to nepujde nebo bude jiný identifikátor, tak to případně dodělám
         */
        private sendNotificationAction;
        private createIcsDto;
        private createIcsAction;
        private deleteAction;
        private deleteAllAction;
        private saveAction;
        private saveEventToDatabase;
        private createSidebar;
        private createPanelInfoDoc;
        private setPanelInfoDoc;
        private setDataToPanelInfoDoc;
        private createCommandBar;
        private addCancelButton;
        private addSaveWithIcsButton;
        private addSaveButton;
        private createMenuBar;
        private addOpenDetailNewBookmarkButton;
        private addOpenDetailButton;
        private addKopieButton;
        private addExportButton;
        private addDeleteButton;
        private addDeleteAllFutureButton;
        private addDeleteAllButton;
        private addEditCloseButton;
        private setSaveActEnabled;
        private addEditButton;
        private addEditAdvancedButton;
        private applyData;
        private initData;
        private createFormId;
        private createFormIxsFun;
        private createFormNameEvent;
        private createFormTypeEvent;
        private createFormTerminDateEvent;
        private createFormWholeDay;
        private createFormReminder;
        private createFormRepetition;
        private createFormIcs;
        private createFormPlace;
        private createFormNote;
        private createFormConfirmation;
        private createFirstForm;
        private createSecondForm;
        private setStartAndEndDateForWholeDay;
        private setFail;
        /**
          * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
          *
          * @param {JQuery<HTMLElement>} form předaný element formuláře
          * @returns {JQueryPromise<boolean>} výsledek stavu
          */
        private waitForValues;
        /**
        * získat vstupní datum
        * @param date aktuální datum v kalendáři
        */
        private getDates;
        /** nastavení času */
        private setTime;
        private formDblClick;
        private showRepetionField;
        private showDateEventField;
        private changeOfFieldWholeDay;
        private refreshFieldDatOdDo;
        private getWholeDayToBool;
        private getWholeDayToNumber;
    }
}
declare namespace Gordic.Gin.WebClient {
    /** interface dialogu událostí kalendáře (zobrazen jako grid) */
    interface IGCalendarEventDialog {
        /** typ dialogu */
        type: GCalendarTypeEventsEnum;
        /** identifikátor dokumentu/spisu (pouze pro typ UdalostiSpojeneDokSpis)*/
        ixp?: string | null;
        /** nadřazený element, pokud potřebujeme předat focus zpět */
        currentTarget?: Element;
    }
    /** enum typu události
     * - využito pro zobrazení seznamu specifických událostí
     * */
    enum GCalendarTypeEventsEnum {
        /** důležité události */
        DuleziteUdalosti = 0,
        /** události spojené s dokumentem, spisem */
        UdalostiSpojeneDokSpis = 1
    }
    class GCalendarDateService {
        /**
        * získat vstupní datum
        * @param date aktuální datum v kalendáři
        */
        static getDates(date?: Date): {
            dateOd: Date;
            dateDo: Date;
        };
        /** nastavení času */
        private static setTime;
    }
    /**
     * Servisní TS třída kalendáře v EPK
     *
     * @author thazmuka
     * @since 480.1.0.36
     */
    class GCalendarService {
        /** funkční místo ze sessionInfo */
        private ixs_fun;
        constructor(ixs_fun?: string);
        private gcalendarWidget;
        /** příznak zabraňující znovuvytvoření kalendáře */
        private openFlag;
        private async;
        /** občertvení notifikací */
        private refreshNotifications;
        /**
         * metoda pro otevření komponenty kalendáře
         * - volaná z GWflMainApp.cs, kde je definované tlačítko dole v menu
         */
        open(): void;
        /**
        * připravit notifikace
        */
        prepare(): void;
        private addButtonAboutImportantEvents;
        /**
        * překreslit kalendář
        */
        private refreshCalendar;
        /**
         * otevřít dialog seznamu specifických události (dle zvoleného typu)
         */
        openEventDialog(opt: IGCalendarEventDialog): void;
        private gcontent;
        private modalWindowElement;
        private showModalWindow;
        private listImportantEvents;
        private listDokSpisEvents;
        private view;
        private createGrid;
        /**
          * vytvořit commandbar
          */
        private createCommandBar;
        /**
         * nastavení automatického zavření na dialogu kalendáře
         * @param autoClose automatické zavření
         */
        private setAutoCloseToCalendar;
    }
}
declare namespace Gordic.Gin.WebClient {
    /**
     * Třída umožnující snadější práci s GBaseReturnDto<TData>.
     *
     * @author TFeik
     * @since 480.1.0.168
     */
    class GBaseReturnClass<TData = any> implements GBaseReturnDto<TData> {
        /**
         * Data
         * @type {TData | null}
         */
        Data?: TData | null;
        /**
         * Informační zprávy.
         * @type {Gordic.Gin.WebClient.MessageDto[] | null}
         */
        Messages?: Gordic.Gin.WebClient.MessageDto[] | null;
        /**
         * constructor
         *
         * @param {GBaseReturnDto<TData>} [dbaseReturnDto]
         */
        constructor(dto?: GBaseReturnDto<TData> | Interface.GResultInfo);
        /**
         * Zobrazí message.
         * Volá GGinUtils.showBaseReturnDtoMessages
         *
         * @param {GContent} parentContent Content, ze krerého bude voláno showFlash.
         * @param {{ timer?: number, id?: string}} [flashPanelOptions] Nastavení flashPanelu.
         */
        showMessages(parentContent: GContent, flashPanelOptions?: {
            timer?: number;
            id?: string;
        }): void;
        /**
         * Přidá zprávy.
         *
         * @param {MessageDto | MessageDto[]} message
         */
        addMessage(message: MessageDto | MessageDto[]): void;
        /**
         * Převede classu na GBaseReturnDto<TData>.
         *
         * @returns {GBaseReturnDto<TData>}
         */
        toDto(): GBaseReturnDto<TData>;
        /**
         * Převede classu na GResultInfo.
         *
         * @param {string} [ixsPropertyName] (default="Ixs") Název property, na kterém je umístěno Ixs (např.: "IxsZup").
         * @returns {Interface.GResultInfo}
         */
        toResultInfo(ixsPropertyName?: string): Interface.GResultInfo;
    }
}
declare namespace Gordic.Gin.WebClient.GGinUtils {
    /**
     * Do selectboxu nastaví první hodnotu z dat, dle aktuálních serverFilters.
     *
     * @date 23.03.2018
     * @author TFeik
     *
     * @param {TGContent} parentContent Content, na kterém je políčko.
     * @param {string} fieldName Název políčka.
     *
     * @returns {JQueryPromise<TFieldVaule | undefined>} Promise nové hodnoty políčka.
     */
    function setFirstInputToSelectbox<TFieldVaule, TGContent extends GContent>(parentContent: TGContent, fieldName: string): JQueryPromise<TFieldVaule | undefined>;
    /**
     * Do selectboxu nastaví první hodnotu z dat, dle aktuálních serverFilters.
     *
     * @date 23.03.2018
     * @author TFeik
     *
     * @param {JQuery<HTMLElement>} field Políčko.
     *
     * @returns {JQueryPromise<TFieldVaule | undefined>} Promise nové hodnoty políčka.
     */
    function setFirstToSelectbox<TFieldVaule>(field: JQuery<HTMLElement>): JQueryPromise<TFieldVaule | undefined>;
    /**
     * Dle typu zprávy vrátí odpovídající gstate.
     *
     * @date 27.11.2019
     * @author TFeik
     *
     * @param {MessageType} [messageType] Typ zprávy.
     * @returns {Gordic.Global.Enums.ColorStateClass} Classa stavu.
     */
    function messageTypeToGState(messageType?: MessageType | null): GState;
    /**
     * Zobrazí message daného returnDto.
     *
     * @date 01.11.2018
     * @author TFeik
     *
     * @param {GContent} parentContent Content, ze krerého bude voláno showFlash.
     * @param {GBaseReturnDto<TData> | GBaseReturnDto<TData>[]} baseReturnDto Return objekt.
     * @param {{ timer?: number, id?: string}} [flashPanelOptions] Nastavení flashPanelu.
     */
    function showBaseReturnDtoMessages<TData = any>(parentContent: GContent, baseReturnDto: GBaseReturnDto<TData> | GBaseReturnDto<TData>[], flashPanelOptions?: {
        timer?: number;
        id?: string;
    }): void;
    /**
     * Prohledá classy zadaných icon a zkusí v nich najít stavové classy (například "g-state-success")
     * odpovídající enumu Gordic.Global.Enums.ColorStateClass. V případě, že takovouto classu nalezne
     * pak ji vrátí ve formě enumu. Pokud je takovýchto tříd zadáno více, pak vrací pouze první nalezenou.
     * Jestliže nenalezne žádnou classu odpovídající enumu pak vrací undefined.
     *
     * @date 11.04.2019
     * @author TFeik
     *
     * @param {string | string[] | null} [icon] Ikona, nebo pole ikon (odpovídá definici z iconTempalte).
     * @returns {Gordic.Global.Enums.ColorStateClass | undefined} Odpovídající enum. V případě, že nybyl nalezen pak je vráceno undefined.
     */
    function iconToColorStateClass(icon?: string | string[] | null): Gordic.Global.Enums.ColorStateClass | undefined;
    /**
     * Zkontroluje, zda je spuštěn hybridní 01, nebo (nový) webový 05 klient.
     *
     * @date 23.08.2019
     * @author TFeik
     *
     * @returns {boolean} Pokud jsme v hybridovi pak true, jinak false.
     */
    function IsHybrid(): boolean;
}
declare namespace Gordic.Gin.WebClient {
    class GK203Handler {
        /**
         * K203HandlerServer
         * @type {GContent | undefined}
         */
        private static K203HandlerServer;
        /**
         * K203Params
         * @type {GK203ParamsDto | undefined}
         */
        private static K203Params;
        /**
         * GetServer
         *
         * @returns {GContent}
         */
        private static GetServer;
        static GetK203ParamsImmediate(): GK203ParamsDto | undefined;
        static GetK203Params(content: GContent | null): JQueryPromise<GK203ParamsDto>;
        private static CreateK203Params;
        /**
         * [! Hybrid only !] Nastavení parametrů pro hybrida, který nemá mainContent.
         *
         * @param {GK203ParamsDto} params
         */
        static SetK203ParamsHybrid(params: GK203ParamsDto): void;
    }
}
declare namespace Gordic.Gin.WebClient {
    /**
     * GPridatElDokumentProIxsDlg
     *
     * @author TFeik
     * @date    07.12.2018
     * @since 480.1.0.708
     */
    class GSelectFileDlg extends GContentBase {
        /**
         * InputParams
         * @type {GSelectFileDlgInputParamsDto}
         */
        private readonly InputParams?;
        /**
         * Validators
         * @type {object}
         */
        private readonly Validators?;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    07.12.2018
         */
        onContentReady(): void;
        /**
         * createMenu
         *
         * @author  TFeik
         * @date    07.12.2018
         */
        private createMenu;
        /**
         * createForm
         *
         * @author  TFeik
         * @date    07.12.2018
         *
         * @param {JQuery<HTMLElement>} appentTo
         * @returns {JQuery<HTMLElement>}
         */
        private createForm;
        /**
         * getFormData
         *
         * @author  TFeik
         * @date    07.12.2018
         *
         * @returns {GSelectFileDto}
         */
        private getFormData;
        /**
         * setFormData
         *
         * @author  TFeik
         * @date    07.12.2018
         *
         * @param {GSelectFileDto} data
         */
        private setFormData;
        /**
         * setFormValidators
         *
         * @author  TFeik
         * @date    07.12.2018
         *
         * @param {object} validators
         */
        private setFormValidators;
        /**
         * isFormValid
         *
         * @author  TFeik
         * @date    07.12.2018
         *
         * @returns {boolean}
         */
        private isFormValid;
        /**
         * closing
         *
         * @author  TFeik
         * @date    07.12.2018
         *
         * @returns {JQuery.Promise<GSelectFileDlgReturnValueDto>}
         */
        private closing;
    }
}
declare namespace Gordic.Gin.WebClient.RegSpa {
    class GSubListControl extends GContentBase {
        grid: JQuery;
        dataView: Gordic.Data.View;
        filterForm: Gordic.Forms.Form;
        filterFormPanel: JQuery<HTMLElement>;
        filterValidators: any;
        filterFormFavorites: string[];
        idSettings: string;
        dataViewKey: string[];
        searchColumns: string[];
        detailContent: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions);
        serviceContent: GContent;
        detailHeight: number;
        detailWidth: number;
        detaiModal: boolean;
        showNew: boolean;
        showDelete: boolean;
        showRestore: boolean;
        showDetail: boolean;
        showRefresh: boolean;
        showResizersOnTab: boolean;
        gridAutofitEnabled: boolean;
        showFilters: boolean;
        enableNew: boolean;
        additionalActions: GAction[] | undefined;
        additionalMenu: MenuParams[] | undefined;
        additionalContextMenu: string[] | undefined;
        onCloseDetail?(ev: any, r: any): void | undefined;
        set disableAction(value: boolean);
        loadedData: boolean;
        additionalPrepareContent(content: any): void;
        prepareContent(args: any): void;
        afterLoadData(filter?: Object): JQueryPromise<any>;
        loadData(filter?: Object): JQueryPromise<any>;
        reloadData(): JQueryPromise<any>;
        private _selectionChange;
        selectionChange(ev: JQueryEventObject, gridSelection: IGGridSelection<any>): void;
        private _enableRowActions;
        enableRowActions(gridSelection: IGGridSelection<any>): void;
        enableActions(): void;
        rowsEnabled(metarow: MetaRow<any>): boolean;
        rowsClass(metarow: MetaRow<any>, trueColumns: GGridTrueColumn<any>[], rowIndex: number): string;
        private _openDetail;
        beforeOpenDetail(row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined): JQueryPromise<any>;
        openDetail(row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined;
        delete(): void;
        restore(): void;
        createGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Widget {
    interface IGDashboard2ViewBlogOptions extends IGDashboard2ViewOptions {
        type: "blog";
    }
    class GDashboard2ViewBlog extends GDashboard2View<IGDashboard2ViewBlogOptions> {
        static widgetName: string;
        private _blog;
        protected _create(): void;
        protected _destroy(): void;
        protected _renderContent(data: any): void;
        protected _updateData(data?: any): void;
    }
}
interface JQuery {
    gdashboard2viewblog(options?: Gordic.Widget.IGDashboard2ViewBlogOptions): JQuery;
}
declare namespace Gordic.Gin.WebClient {
    export type GDashboard2Role = "reader" | "editor" | "admin";
    export interface IGDashboard2ContentOptions {
        /**
         * Role uzivatele. Vychozi = 'reader'
         * @type {"reader" | "editor" | "admin"}
         */
        userRole?: GDashboard2Role;
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
        providers?: Gordic.Dashboard.ProviderManager;
        customProviders?: Gordic.Dashboard.CustomProviderManager;
        userActions?: Gordic.Dashboard.GDashboardActionManager;
    }
    export interface IGDashboard2UserParamFieldOptions<T = any> {
        fieldType: "gselectbox" | "gnumberbox" | "gstringbox" | "gdatebox";
        options: GFieldOptions<T>;
    }
    type IGDashboard2Options = Gordic.Widget.IGDashboard2Options;
    type IGDashboard2PanelOptions = Gordic.Widget.IGDashboard2PanelOptions;
    type GDashboardViewDto = Gordic.Gin.Interface.GDashboardViewDto;
    interface IGDashboard2OptionsExt extends IGDashboard2Options {
        canBeEditable?: boolean;
        isOwner?: boolean;
    }
    interface IGDashboard2ViewOptionsWithDto extends Gordic.Widget.IGDashboard2ViewOptionsExt {
        getDto: (() => GDashboardViewDto);
    }
    /**
     * GDashboardContent
     *
     * @author bmartinek
     * @since 52510.9
     */
    export class GDashboard2Content extends GContent implements IGClientContent {
        uid: string;
        protected options: IGDashboard2ContentOptions;
        protected subtasks: JQuery;
        protected dashStatusbar: JQuery;
        protected dashboard: JQuery;
        protected providers: Gordic.Dashboard.ProviderManager;
        protected customProviders: Gordic.Dashboard.CustomProviderManager;
        private _actualPanel;
        private _userActions;
        logOptions: {
            name: string;
            fileName: string;
            authorCode: number;
        };
        prepareContent(options?: IGDashboard2ContentOptions): void;
        get role(): GDashboard2Role;
        protected getData(): JQueryPromise<Gordic.Gin.Interface.GDashboardPanelDto[]>;
        protected prepareActions(): void;
        reloadView(id: string | JQuery | HTMLElement): void;
        protected createDashboardStatusbar(): void;
        protected prepareSubtasks(ps: Gordic.Gin.Interface.GDashboardPanelDto[]): MenuParams[];
        protected createSubtasks(mps: MenuParams[]): void;
        protected preparePanel(panel?: GDashboardPanelDto): IGDashboard2PanelOptions;
        protected prepareDashboardOptions(panel: Gordic.Gin.Interface.GDashboardPanelDto): IGDashboard2OptionsExt;
        protected setupDashboardHelpContext(settingsJson?: string | null): void;
        /** Vytvori formular s uziv. parametry a nastavi jej do view  */
        protected prepareViewOptions(view: GDashboardViewDto, id: string): IGDashboard2ViewOptionsWithDto;
        protected createDashboard(o: IGDashboard2OptionsExt, p: IGDashboard2PanelOptions): void;
        protected loadDefaultDashboard(): JQueryPromise<Gordic.Gin.Interface.GDashboardPanelDto>;
        private convertDefaultView;
        protected addNewPanel(): JQueryPromise<Gordic.Gin.Interface.GDashboardPanelDto>;
        protected toggleMenubar(editable: boolean): void;
        protected createViewHeaderForm(ps: Gordic.Gin.Interface.GDashboardViewParamDto[]): Gordic.Forms.Form;
        protected prepareInputParameter(p: Gordic.Gin.Interface.GDashboardViewParamDto): IGDashboard2UserParamFieldOptions;
        protected setupUserParamsIntoView(id: string, sqlView: Gordic.Gin.Interface.GDashboardViewDto): void;
        protected createViewDrillSettings(id: string, actions?: Gordic.Gin.Interface.GDashboardViewAction[] | null): {
            column: IGDashboardColumnOptions;
            userActions: Gordic.Dashboard.GDashboardActionManager;
        } | null;
        protected mergeViewParams(id: string, view: GDashboardViewDto, p: ObjectLiteral<any>): GDashboardViewDto;
        protected saveViewParams(view: GDashboardViewDto): JQueryPromise<GDashboardViewDto>;
        protected readSettingsJson<T = any>(settingsJson?: string | object | null): T;
        private addView;
        private editView;
        private setPanelToDefaults;
        private setToView;
        private getFromView;
        private getViewDto;
        private convertColumns;
        private changeZonesCount;
    }
    export {};
}
declare namespace Gordic.Gin.DetailBuilder {
    interface GDetailBuilderKpisCollection {
        update(): void;
    }
    abstract class GDetailBuilderContent extends GContent {
        kpis?: GDetailBuilderKpisCollection & ObjectLiteral<GObservableObject<GKpiItemOptions>>;
        menus?: GObservableList<MenuParams>;
        statuses?: GObservableList<MenuParams>;
        commands?: GObservableList<MenuParams>;
        tabs?: ObjectLiteral<JQuery>;
        tabGroups?: ObjectLiteral<GObservableObject<IGTabGroupOptions>>;
        texts?: ObjectLiteral<string>;
        activeOpEvents?: string[];
        abstract onDetailBuilderBuild(builder: GDetailBuilder): void;
        abstract onDetailBuilderInit(builder: GDetailBuilder): void;
        onDetailBuilderActiveOp?(ev: JQuery.Event, ctx?: any): void | false;
    }
}
declare namespace Gordic {
    /**
     * Content, which uses DetailBuilder.
     */
    const GDetailBuilderContent: {
        new <TExtension = {}>(): GContentType<TExtension, Gordic.Gin.DetailBuilder.GDetailBuilderContent>;
    };
}
/**
 * GDbd - namespace with static functions and enums for DetailBuilder
 *
 * @author Vlastimil Máca
 * @since 480.1.0.58
 */
declare namespace GDbd {
    enum DefinitionKind {
        MenuBar = "menu",
        CommandBar = "command",
        StatusBar = "status",
        Action = "act",
        SidePanel = "panel",
        TabMenu = "menuTab",
        Kpi = "kpi",
        Tab = "tab",
        Form = "form",
        TabGroup = "tg",
        ActiveOpEvent = "aop"
    }
    function getIdFor(kind: DefinitionKind, name: string): string;
    function getElementToFocus(element: JQuery, autofocusSelector?: string): JQuery<HTMLElement>;
    interface IGIdxStorageStrategy<TGet extends any = any, TMerge extends any = any, TReturn extends any = any> {
        get(id: string): IGIdxStorageItem<TGet>[];
        merge(id: string | null, item: TMerge): any;
        getStorage(): TReturn;
    }
    interface IGIdxStorageItem<T> {
        array?: T[];
        index?: number;
        item: T;
    }
    class GFormIdxStorageStrategy implements IGIdxStorageStrategy<Gordic.Forms.Form | Gordic.Forms.FormSection | Gordic.Forms.FormRow | Gordic.Forms.FormField, Gordic.Forms.Form, Gordic.Forms.Form | null> {
        private storage;
        private storageArray;
        get(id: string, exactMatch?: boolean): IGIdxStorageItem<Gordic.Forms.Form | Gordic.Forms.FormSection | Gordic.Forms.FormRow | Gordic.Forms.FormField>[];
        merge(id: string | null, item: Gordic.Forms.Form): void;
        getStorage(): Gordic.Forms.Form | null;
    }
    type GetIdxStrategyGetType<C extends IGIdxStorageStrategy<any, any, any>> = C extends IGIdxStorageStrategy<infer T> ? T : unknown;
    class GIdxStorage<TStrategy extends IGIdxStorageStrategy> {
        protected strategy: TStrategy;
        constructor(strategy: TStrategy);
        result(): ReturnType<TStrategy['getStorage']>;
        get(id: string): IGIdxStorageItem<GetIdxStrategyGetType<TStrategy>>[];
        merge(id: Parameters<TStrategy['merge']>[0], item: Parameters<TStrategy['merge']>[1]): void;
        insertBefore(id: string, ...items: GetIdxStrategyGetType<TStrategy>[]): void;
        insertAfter(id: string, ...items: GetIdxStrategyGetType<TStrategy>[]): void;
        moveBefore(itemToMoveId: string, targetItemId: string): void;
        moveAfter(itemToMoveId: string, targetItemId: string): void;
        update(id: string, newData: Partial<GetIdxStrategyGetType<TStrategy>>): IGIdxStorageItem<GetIdxStrategyGetType<TStrategy>>[];
        remove(id: string): IGIdxStorageItem<GetIdxStrategyGetType<TStrategy>>[];
        detach(): void;
        attach(): void;
    }
}
declare namespace Gordic.Gin.DetailBuilderComponents {
    interface GGinAiSubcontentExtensions {
        /**Dispečer pro přidávání/odebírání příloh pro AI*/
        aiAttachments?: Gin.WebClient.AiChat.GAttachmentDispatcher;
    }
    class GGinAiSubcontentComponent {
        static create(componentDto: any): {
            subContents: ObjectLiteral<DetailBuilder.GDetailBuilderSubContentOptions | ((builder: DetailBuilder.GDetailBuilder) => DetailBuilder.GDetailBuilderSubContentOptions)>;
            contentExtensions: {
                aiAttachments: WebClient.AiChat.GAttachmentDispatcher;
            };
            onBuild: DetailBuilder.GDetailBuilderComponentFunction<DetailBuilder.GDetailBuilderContent>[];
            onInit: DetailBuilder.GDetailBuilderComponentFunction<DetailBuilder.GDetailBuilderContent>[];
        };
    }
}
declare namespace Gordic.Gin.DetailBuilderComponents {
    /** Komponenta detail builderu Zprávy DSG */
    class GinDSG {
        /**
         * Vytvoření builderu se Zprávy DSG
         * @author psmejkal
         * @since 2021-10-19
         * @param componentDto Vstupní DTO s parametry
         */
        static create(componentDto: any): DetailBuilder.GDetailBuilderComponent<DetailBuilder.GDetailBuilderContent>;
    }
}
declare namespace Gordic.Gin.DetailBuilderComponents {
    interface GinDescPropsExtensions {
        /**
         * Setup list controls.
         * @param {GListControlsSetupOptions} settings Settings of list controls.
         *
         */
        descProps_applyValues(values: Interface.GGinVlastnostiDataDto, isInitial?: boolean): void;
        descProps_collectValues(): Interface.GGinVlastnostiDataDto;
        descProps_setup(options: {
            readOnly?: boolean;
            selectIxx?: () => JQueryPromise<{
                ixx?: string;
                sxs?: string;
                typ_obj?: number;
            }>;
        }): void;
    }
    interface GinDescPropsSetupOptions {
        selectIxx: (values: Interface.GGinVlastnostiDataDto) => JQueryPromise<{
            ixx?: string;
            sxs?: string;
            typ_obj?: number;
        }>;
    }
    class GinDescProps {
        /**
         * @fires desc_props_change
         * @fires desc_props_to
         * @fires desc_props_from
         * @fires desc_props_rendered
         * @fires desc_props_add
         *
         * @param componentDto
         * @author vmaca
         */
        static create(componentDto: any): DetailBuilder.GDetailBuilderComponent<DetailBuilder.GDetailBuilderContent>;
    }
}
declare namespace Gordic.Gin.DetailBuilderComponents {
    class GGinDetailRemembering {
        static componentName: string;
        protected static rememberActivePanel(element: any, userSettings: any): void;
        protected static rememberActiveTabGroup(element: any, userSettings: any): void;
        /**
         *
         * Component for remembering of opened sidepanel and opened tabGroup
         *
         * @author vmaca
         */
        static create(): DetailBuilder.GDetailBuilderComponent<DetailBuilder.GDetailBuilderContent>;
    }
}
declare namespace Gordic.Gin.WebClient.RegSpa {
    class GBaseDetailComponent {
        static create(content: GContent): Gordic.Gin.DetailBuilder.GDetailBuilderComponent;
    }
    interface GBaseDetailComponentExtensions {
        readOnly: boolean;
        zmena: boolean;
        Rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        onlyNew: boolean;
        model?: any;
        validators?: any;
        originalModel?: any;
        formsLoadData?: string;
        enableFields?(enable: boolean): void;
        enableActions?(this: GContent & GBaseDetailComponentExtensions, enable: boolean): void;
        setRezim(rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, content: GContent & GBaseDetailComponentExtensions): void;
        loadData(content: GContent & GBaseDetailComponentExtensions): JQueryPromise<any>;
        reloadData(content: GContent & GBaseDetailComponentExtensions): JQueryPromise<any>;
        afterLoadData?(content: GContent & GBaseDetailComponentExtensions): JQueryPromise<any>;
        beforeSave(this: GContent & GBaseDetailComponentExtensions): JQueryPromise<any>;
        afterSave(this: GContent & GBaseDetailComponentExtensions): JQueryPromise<any>;
        closing(this: GContent & GBaseDetailComponentExtensions): JQueryPromise<any>;
    }
}
declare namespace Gordic.Gin.WebClient.RegSpa {
    class GBaseDetailReloadComponent {
        static create(content: GContent): Gordic.Gin.DetailBuilder.GDetailBuilderComponent;
    }
    interface GBaseDetailReloadComponentExtensions {
        zmena?: boolean;
        internal: boolean;
        selectedTabGroup: string | undefined;
        Rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu;
        onlyNew: boolean;
        model?: any;
        validators?: any;
        originalModel?: any;
        enableFields?(enable: boolean): void;
        enableActions?(this: GContent & GBaseDetailReloadComponentExtensions, enable: boolean): void;
        onContentReadyBase(content: GContent & GBaseDetailReloadComponentExtensions): void;
        createForms(content: GContent & GBaseDetailReloadComponentExtensions): void;
        afterLoadData?(content: GContent & GBaseDetailReloadComponentExtensions): JQueryPromise<any>;
        beforeNew(this: GContent & GBaseDetailReloadComponentExtensions): JQueryPromise<any>;
        newRecord(this: GContent & GBaseDetailReloadComponentExtensions): JQueryPromise<any>;
        beforeSave(this: GContent & GBaseDetailReloadComponentExtensions): JQueryPromise<any>;
        afterSave(this: GContent & GBaseDetailReloadComponentExtensions): JQueryPromise<any>;
        closing(this: GContent & GBaseDetailReloadComponentExtensions): JQueryPromise<any>;
    }
}
declare namespace Gordic.Gin.WebClient.RegSpa {
    class GChangeAktivitaComponent {
        static create(content: GContent): Gordic.Gin.DetailBuilder.GDetailBuilderComponent;
    }
    interface GChangeAktivitaComponentExtensions {
        changeAktivitaComponentEnableActions(this: GContent & GBaseDetailComponentExtensions, enable: boolean): void;
        afterDelete(content: GContent & GBaseDetailComponentExtensions & GChangeAktivitaComponentExtensions): void;
        afterRestore(content: GContent & GBaseDetailComponentExtensions & GChangeAktivitaComponentExtensions): void;
    }
}
declare namespace Gordic.Gin.WebClient.RegSpa {
    class GChangeAktivitaReloadComponent {
        static create(content: GContent): Gordic.Gin.DetailBuilder.GDetailBuilderComponent;
    }
    interface GChangeAktivitaReloadComponentExtensions {
        showDelete: boolean;
        showRestore: boolean;
        changeAktivitaComponentEnableActions(this: GContent & GBaseDetailReloadComponentExtensions, enable: boolean): void;
        afterDelete(content: GContent & GBaseDetailReloadComponentExtensions & GChangeAktivitaReloadComponentExtensions): void;
        afterRestore(content: GContent & GBaseDetailReloadComponentExtensions & GChangeAktivitaReloadComponentExtensions): void;
    }
}
declare namespace Gordic.Gin.WebClient.RegSpa {
    class GDetailMoveComponent {
        static create(content: GContent): Gordic.Gin.DetailBuilder.GDetailBuilderComponent;
    }
    interface GDetailMoveComponentExtensions {
        detailMoveComponentGridRc: Gordic.Components.GridRC<any>;
        detailMoveComponentPrevTemplate: string;
        detailMoveComponentNextTemplate: string;
        detailMoveComponentEnableActions(this: GContent & GBaseDetailComponentExtensions, enable: boolean): void;
    }
}
declare namespace Gordic.Gin {
    class GVyberDpo extends GContentBase {
        private _srvKtgDpo;
        private model;
        private validators;
        private gridDpo;
        private DpoList;
        private SelectedIxsDpo;
        private listForm;
        private hlavniForm;
        onContentReady(): void;
        init(): void;
        createList(): void;
        createForm(): void;
        setData(): void;
        userSelectDpo(ixsDpo: any): void;
        zmenaVeVyberu(): void;
        podepsat(): void;
        finalReturn(ret: any): void;
    }
}
declare namespace Gordic.Gin.WebClient {
    /** Galerie a správa obrázků a souborů v db */
    class GMDGallery extends GContentBase implements IGClientContent {
        title: string;
        /** Příznak, zda se má v closing vracet vybrané záznamy a vytvořit commandbar */
        selector: boolean;
        private $grid;
        private view;
        private previewController;
        private service;
        private prevSelectionIxs;
        private maxTotalSizeDBParam;
        prepareContent(): void;
        /** Vytvoření gridu */
        private createGrid;
        /** Debounce zobrazení preview */
        refreshPreviewDebounced: Function;
        /**
         * Funkce pro vrácení aktuálně vybraných záznamů v gridu
         */
        getSelection(): Gordic.Gin.Interface.GArticleFileDto[];
        /**
         * Vytvoření commandbaru
         */
        private createCommandBar;
        /**
         * Vytvoření statusbaru
         */
        private createStatusBar;
        /**
         * Vytvoření menubaru z akcí
         */
        private createMenuBar;
        /**
         * Vytvoření akcí
         */
        private createActions;
        /**
         * Načtení a nastavení dat do gridu
         */
        private setDataToGrid;
        /**
         * Akce nahrání
         */
        private upload;
        /**
         * Akce stažení
         */
        private download;
        /**
         * Akce nahrazení
         */
        private reupload;
        /**
         * Akce přejmenování
         */
        private rename;
        /**
         * Akce smazání
         */
        private delete;
        /**
         * Upload souboru(obrázku) do db
         * @param file Obrázek pro upload
         * @param reupload Zda jde o reupload (pokud ano, tak obsahuje ixs_ble)
         */
        private handleFile;
        /**
         * Vytvoření grid formátu
         */
        private createGridFormat;
        /**
         * Vytvoření sidebaru/preview
         */
        private createSidebar;
        /**
         * Vstupní velikost převede na B, KB, MB
         * @param size Vstupní velikost na převod
         * @returns Převedená textová reprezentace velikosti
         */
        private transformSize;
    }
}
declare namespace Gordic.Gin.WebClient {
    /** Historie */
    class GHistorie extends GContentBase {
        private createSpecificMenu;
        private createSpecificSubtask;
        private createSpecificGridFormat;
        private grid;
        UzivatelZaznam: boolean;
        /** obecná GIN zakazovačka pro tlačítko přidat */
        HideAddBtn: boolean;
        /** obecná GIN zakazovačka pro tlačítko tisku */
        HidePrintBtn: boolean;
        initHistory(): void;
        private createMenubar;
        createDefaultMenu(printActionOps?: any, wflHideAddButton?: boolean): MenuParams[];
        private add;
        createDefaultGridFormat(): Data.GridFormat<any>;
        private gridBuilderZmeny;
        /**
         * přidat názvy sloupců do řetězce
         */
        private getStringNamesOfColumns;
        /** sloupce na prohledávání */
        private getSearchColumns;
    }
}
declare namespace Gordic.Gin.WebClient {
    /**
     * najde info o ixs
     *
     * @auth tfeik
     * @date 12.03.2018
     *
     * @param {string} ixs
     * @returns
     */
    function HledejIxs(ixs: string): JQuery.Promise<Gordic.Gin.Interface.GHledaniIxsInfoDto>;
    /**
   * najde info o ixs
   *
   * @auth tfeik
   * @date 12.03.2018
   *
   * @param {string} ixs
   * @returns
   */
    function OtevriDetail(ixs: string, parentContent?: GContent): JQuery.Promise<Gordic.Gin.Interface.RetFromOtevriDetailDto>;
    /**
     * najde info o ixs
     *
     * @auth tfeik
     * @date 12.03.2018
     *
     * @param {string} ixs
     * @returns
     */
    function HledaniIxsInfo(ixs: string): JQuery.Promise<Gordic.Gin.Interface.GHledaniIxsInfoDto>;
    function isFazeInstaled(apps: Gordic.Gin.Interface.AppsDto[] | undefined | null, hledanaFaze: string): boolean;
    function ResolvniOtevreniUsebe(dto: Gordic.Gin.Interface.GHledaniIxsInfoDto): JQuery.Promise<Gordic.Gin.Interface.RetFromOtevriDetailDto>;
    /**
     * export function OtevriJindeAResolvni
     *
     * @param {string} fasze
     * @param {string | undefined} funkceVAplikaci (Default: 'OpenDetail')
     * @param {Gordic.Gin.Interface.GHledaniIxsInfoDto} dto
     * @returns {JQuery.Promise<Gordic.Gin.Interface.RetFromOtevriDetailDto>}
     */
    function OtevriJindeAResolvni(fasze: string, funkceVAplikaci: string | undefined, dto: Gordic.Gin.Interface.GHledaniIxsInfoDto): JQuery.Promise<Gordic.Gin.Interface.RetFromOtevriDetailDto>;
    function VyhodNenalezenCil(dto: Gordic.Gin.Interface.GHledaniIxsInfoDto): JQuery.Promise<Gordic.Gin.Interface.RetFromOtevriDetailDto>;
    function NebylNalezenVDB(dto: Gordic.Gin.Interface.GHledaniIxsInfoDto): JQuery.Promise<Gordic.Gin.Interface.RetFromOtevriDetailDto>;
    function VyhodRejectEror(dto: Gordic.Gin.Interface.GHledaniIxsInfoDto, errTxt: string): JQuery.Promise<Gordic.Gin.Interface.RetFromOtevriDetailDto>;
}
declare namespace Gordic.Gin.WebClient {
    type GFunkcniMistoColumnNames = 'ixs_fun' | 'lic' | 'aktivita' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'ixs_su' | 'nazev_su' | 'zkratka' | 'nazev' | 'uroven_fun' | 'priorita_max' | 'fc' | 'ixs_nad' | 'ixs_ref' | 'nazev_ref' | 'ixs_orj' | 'nazev_orj' | 'mistnost_kod' | 'ur_hod' | 'tel' | 'mail' | 'fax' | 'ofic_nazev' | 'status_fun' | 'pri_fun' | 'ixs_zmp' | 'num_pod' | 'dat_mpd' | 'nazev_rf' | 'zkratka_su' | 'url' | 'z_int' | 'aktuz' | 'poradi_log' | 'ixs_ose' | 'priz_servis' | 'ixs_lpc' | 'ixs_su_navrh' | 'barva' | 'ico' | 'ixs_zap';
    type GFunkcniMistoFieldNames = 'ixs_fun' | 'lic' | 'aktivita' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'ixs_su' | 'nazev_su' | 'zkratka' | 'nazev' | 'uroven_fun' | 'priorita_max' | 'fc' | 'ixs_nad' | 'ixs_ref' | 'nazev_ref' | 'ixs_orj' | 'nazev_orj' | 'mistnost_kod' | 'ur_hod' | 'tel' | 'mail' | 'fax' | 'ofic_nazev' | 'status_fun' | 'pri_fun' | 'ixs_zmp' | 'num_pod' | 'dat_mpd' | 'nazev_rf' | 'zkratka_su' | 'url' | 'z_int' | 'aktuz' | 'poradi_log' | 'ixs_ose' | 'priz_servis' | 'ixs_lpc' | 'ixs_su_navrh' | 'barva' | 'ico' | 'ixs_zap';
    class GFunkcniMistoIsl {
        static Init(columns: Names<GFunkcniMistoColumnNames>, fields: Names<GFunkcniMistoFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Names<GFunkcniMistoColumnNames>, fields: Names<GFunkcniMistoFieldNames>): boolean;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GWflspidDto>
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GFunkcniMistoDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GFunkcniMistoColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GFunkcniMistoColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * Před jejím voláním je nutné provést inicializaci GFunkcniMistoIsl pomocí fukce GFunkcniMistoIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GFunkcniMistoColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GFunkcniMistoFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GFunkcniMistoFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GFunkcniMistoFieldNames[] | 'all' | null, scope?: WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GFunkcniMistoFieldNames[] | 'all' | null;
            scope?: GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Gin.WebClient {
    type GReferentColumnNames = 'ixs_ref' | 'lic' | 'aktivita' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'ixs_su' | 'zkratka' | 'nazev' | 'jmeno' | 'prijmeni' | 'dat_sync' | 'tit_pred' | 'tit_za' | 'oc' | 'rc' | 'pritomnost' | 'login_name' | 'dat_mpd' | 'mail' | 'ixs_esu' | 'z_int' | 'typ_aut' | 'poc_dni_exp' | 'dat_exp' | 'priz_ext' | 'priz_int' | 'priz_f' | 'login_name_ext' | 'login_name_grant' | 'login_name2' | 'login_name_grant2' | 'typ_aut2' | 'dat_exp2' | 'priz_msmsesu' | 'ixs_esu_pam' | 'tel' | 'tel_privat' | 'tel_mobil' | 'ixs_lpc' | 'rod_prijmeni' | 'fax' | 'login_passwdh' | 'login_salt' | 'login_passwdh2' | 'login_salt2' | 'ico' | 'login_sid' | 'login_sid2' | 'ixs_zap';
    type GReferentFieldNames = 'ixs_ref' | 'lic' | 'aktivita' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'ixs_su' | 'zkratka' | 'nazev' | 'jmeno' | 'prijmeni' | 'dat_sync' | 'tit_pred' | 'tit_za' | 'oc' | 'rc' | 'pritomnost' | 'login_name' | 'dat_mpd' | 'mail' | 'ixs_esu' | 'z_int' | 'typ_aut' | 'poc_dni_exp' | 'dat_exp' | 'priz_ext' | 'priz_int' | 'priz_f' | 'login_name_ext' | 'login_name_grant' | 'login_name2' | 'login_name_grant2' | 'typ_aut2' | 'dat_exp2' | 'priz_msmsesu' | 'ixs_esu_pam' | 'tel' | 'tel_privat' | 'tel_mobil' | 'ixs_lpc' | 'rod_prijmeni' | 'fax' | 'login_passwdh' | 'login_salt' | 'login_passwdh2' | 'login_salt2' | 'ico' | 'login_sid' | 'login_sid2' | 'ixs_zap';
    class GReferentIsl {
        static Init(columns: Names<GReferentColumnNames>, fields: Names<GReferentFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Names<GReferentColumnNames>, fields: Names<GReferentFieldNames>): boolean;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GWflspidDto>
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GFunkcniMistoDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GReferentColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GReferentColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * Před jejím voláním je nutné provést inicializaci GReferentIsl pomocí fukce GReferentIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GReferentColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GReferentFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GReferentFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GReferentFieldNames[] | 'all' | null, scope?: WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GReferentFieldNames[] | 'all' | null;
            scope?: GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Gin.WebClient {
    interface GScopeOptionLevel {
        scope: string;
        scopeTitle?: string;
    }
    interface GScopeOptions {
        scopeLevels: GScopeOptionLevel[];
        scopeTitleSeparator?: string;
    }
    type Names<TColumnName> = TColumnName[] | 'all' | undefined | null | false;
    type AddMode = 'optIn' | 'optOut';
    class GSharedIsl {
        static readonly NameSeparator = "__";
        static readonly ScopeSeparator = ".";
        static readonly Exclude = "-";
        static CreateScopeOptionsWithNewLevel(scopeOptions: GScopeOptions | undefined | null, newLevel: GScopeOptionLevel): GScopeOptions;
        static ApplyScope(value: string, scope?: string[], separator?: string): string;
        static CreateNameWithScope(name: string, scope?: string[]): string;
        static CreateFragmentWithScope(name: string, scope?: string[]): string;
        static CreateFilterNameWithScope(name: string, scope?: string[]): string;
        static CreateFilterNameWithScopeFromInput(name: string, input?: GScopeOptions | null): string;
        static CreateTitleWithScope(title: string, scopeTitle?: string[], separator?: string): string;
        static CreateTitleWithScopeFromInput(title: string, input?: GScopeOptions | null): string;
        static CreateNameWithScopeFromInput(columnName: string, input?: GScopeOptions): string;
        static CreateFragmentWithScopeFromInput(columnName: string, input?: GScopeOptions): string;
        static ApplyScopeToGridColumns(gridColumn: GGridColumn, scopeOptions?: GScopeOptions): GGridColumn;
        static CreateSubentityColumnName(scope: string, subentityColumnName: string): string;
        /**
         * Vrátí ikony pro aktivitu.
         *
         * @param {Gordic.Ginis.DbModel.GGincaktEnum | null} [value]
         * @returns {string}
         */
        static GetGincaktEnumIcon(value?: Gordic.Ginis.DbModel.GGincaktEnum | null): string;
        /**
         * Vrátí IconTemplate pro aktivitu.
         *
         * @param {Gordic.Ginis.DbModel.GGincaktEnum | null} [value]
         * @returns {IconTemplate}
         */
        static GetGincaktEnumIconTemplate(value?: Gordic.Ginis.DbModel.GGincaktEnum | null): IconTemplate;
        /**
         * Vrátí IconTemplate pro Typ přihlášení.
         *
         * @param {Gordic.Ginis.DbModel.GGinczmpEnum | null} [value]
         * @returns {IconTemplate}
         */
        static GetGinczmpEnumIconTemplate(value?: Gordic.Ginis.DbModel.GGinczmpEnum | null): IconTemplate;
        /**
         * FilterNamesWithScope<TName extends string, TSubnames extends string>
         *
         * @param {TName[] | 'all' | undefined | null} names
         * @param {string} scope
         * @returns {TSubnames[] | 'all' | undefined}
         */
        static FilterNamesWithScope<TName extends string, TSubnames extends string>(names: TName[] | 'all' | undefined | null, scope: string, 
        /**
         * Pokud není vyplněno, pak se zjistí dle names.
         * @type {AddMode}
         */
        addMode: AddMode | undefined | null): TSubnames[] | 'all' | undefined | false;
        static CanAdd<TItemName extends string>(item: TItemName, items: TItemName[] | 'all' | undefined | null | false, 
        /**
         * Pokud není vyplněno, pak se zjistí dle items.
         * @type {AddMode}
         */
        addMode: AddMode | undefined): boolean;
        static GetAddMode<TItemName extends string>(items: TItemName[] | 'all' | undefined | null | false): AddMode;
        static IsOptOutMode<TItemName extends string>(items: TItemName[] | 'all' | undefined | null | false): boolean;
        static GetRowFromScope<TOutputItem = any>(row: any, scope?: GScopeOptionLevel[]): TOutputItem | undefined | null;
        /**
         * Vytvoří itemTempalte pro enum.
         *
         * @author  TFeik
         * @date    22.12.2021
         * @since   486.1.0.116
         */
        static CreateIconTemplateForEnum<TEnum, TEnumDto>(input: {
            enumValues: Gordic.Ginis.DbModel.GEnumMetaDto<TEnum, TEnumDto>[] | undefined | null;
            getEnumFromRow: () => TEnum | undefined | null;
            getEnumFromEnumDto: (enumDto: TEnumDto | undefined | null) => TEnum | undefined | null;
            getTextFromEnumDto: (enumDto: TEnumDto | undefined | null) => string | undefined | null;
            getEnumIcon: (value: TEnum | undefined | null) => string;
        }): IconTemplate | undefined;
        /**
         * Vytvoří model funkci pro gdatecombobox tak,
         * aby rozlišoval zda se ukládá hodnota do pohledu filterpanelu či nikoli.
         *
         * @author  TFeik
         * @date    22.02.2022
         *
         * @param {{ valueProperty: string, factorProperty?: string | null} input
         */
        static CreateGDateComboBoxModel(input: {
            valueProperty: string;
            factorProperty?: string | null;
            scope?: GScopeOptions | null;
        }): (operation: any, dto: any, modelOptions: any) => "dictLikeProperty" | undefined;
    }
}
declare namespace Gordic.Gin.WebClient {
    type GSpisovyUzelColumnNames = 'ixs_su' | 'lic' | 'aktivita' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'zkratka' | 'nazev' | 'priz_pod' | 'priz_vyp' | 'ixs_nad' | 'lic_adr' | 'ofic_nazev' | /*'num_pod' |*/ 'mail' | 'url' | 'priz_kur' | 'ixs_fun' | 'ixs_tre' | 'priz_evy' | 'z_int' | 'dat_mpd' | 'priz_prut' | 'priz_servis' | 'tel' | 'fax' | 'ixs_lpc' | 'ico' | 'ixs_ext_ais';
    type GSpisovyUzelFieldNames = 'ixs_su' | 'lic' | 'aktivita' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'zkratka' | 'nazev' | 'priz_pod' | 'priz_vyp' | 'ixs_nad' | 'lic_adr' | 'ofic_nazev' | /*'num_pod' |*/ 'mail' | 'url' | 'priz_kur' | 'ixs_fun' | 'ixs_tre' | 'priz_evy' | 'z_int' | 'dat_mpd' | 'priz_prut' | 'priz_servis' | 'tel' | 'fax' | 'ixs_lpc' | 'ico' | 'ixs_ext_ais';
    /**
     * GSpisovyUzelIsl
     *
     * @author  TFeik
     * @date    11.03.2022
     * @since   488.1.0.6
     */
    class GSpisovyUzelIsl {
        /**
         * Init
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {Names<GSpisovyUzelColumnNames>} columns
         * @param {Names<GSpisovyUzelFieldNames>} fields
         * @returns {JQuery.Promise<void>}
         */
        static Init(columns: Names<GSpisovyUzelColumnNames>, fields: Names<GSpisovyUzelFieldNames>): JQuery.Promise<void>;
        /**
         * IsInitiated
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {Names<GSpisovyUzelColumnNames>} columns
         * @param {Names<GSpisovyUzelFieldNames>} fields
         * @returns {boolean}
         */
        static IsInitiated(columns: Names<GSpisovyUzelColumnNames>, fields: Names<GSpisovyUzelFieldNames>): boolean;
        /**
         * CanAddColumn
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {GSpisovyUzelColumnNames} column
         * @param {GSpisovyUzelColumnNames[] | 'all' | undefined | null | false} columns
         * @returns {boolean}
         */
        private static CanAddColumn;
        /**
         * addGridFormat<TRow = Interface.GGinspodDto>
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {Data.GridFormat<TRow>} gridFormat
         * @param {GSpisovyUzelColumnNames[] | 'all'} [columns]
         * @param {GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GGinspodDto>
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {GSpisovyUzelColumnNames[] | 'all'} [columns]
         * @param {WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GGinspodDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GSpisovyUzelColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GSpisovyUzelColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * Před jejím voláním je nutné provést inicializaci GSpisovyUzelIsl pomocí fukce GSpisovyUzelIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GSpisovyUzelColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * AddFilterFields
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GSpisovyUzelFieldNames[] | 'all' | null} input
         * @returns {JQuery.Promise<Forms.Form>}
         */
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GSpisovyUzelFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        /**
         * AddFilterFieldsImmediate
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GSpisovyUzelFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GSpisovyUzelFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): Forms.Form;
        /**
         * createFilterForm
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {Forms.Form | null} [form]
         * @param {any | null} [initialValues]
         * @param {GSpisovyUzelFieldNames[] | 'all' | null} [fields]
         * @param {WebClient.GScopeOptions | null} [scope]
         * @returns {Forms.Form}
         */
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GSpisovyUzelFieldNames[] | 'all' | null, scope?: WebClient.GScopeOptions | null): Forms.Form;
        /**
         * CanAddField
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {GSpisovyUzelFieldNames} fieldName
         * @param {Names<GSpisovyUzelFieldNames>} fields
         * @returns {boolean}
         */
        private static CanAddField;
        /**
         * addFilterForm
         *
         * @author  TFeik
         * @date    11.03.2022
         *
         * @param {{ form: Forms.Form, initialValues?: any | null, fields?: GSpisovyUzelFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GSpisovyUzelFieldNames[] | 'all' | null;
            scope?: GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Gin.WebClient {
    type GTypAgendyColumnNames = 'typ_ag' | 'typ_ag_txt' | 'k_v' | 'k_s' | 'typ_uct' | 'zkr_ag' | 'ktg_ag' | 'priz_ext' | 'priz_ekovago' | 'k_xml' | 'ixs_ext' | 'typ_ag_rsx';
    type GTypAgendyFieldNames = 'typ_ag' | 'typ_ag_txt' | 'k_v' | 'k_s' | 'typ_uct' | 'zkr_ag' | 'ktg_ag' | 'priz_ext' | 'priz_ekovago' | 'k_xml' | 'ixs_ext' | 'typ_ag_rsx';
    class GTypAgendyIsl {
        static Init(columns: Names<GTypAgendyColumnNames>, fields: Names<GTypAgendyFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Names<GTypAgendyColumnNames>, fields: Names<GTypAgendyFieldNames>): boolean;
        private static loadEnums;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GTypAgendyDto>
         *
         * @author  TFeik
         * @date    30.11.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GTypAgendyDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GTypAgendyColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  TFeik
         * @date    30.11.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GTypAgendyColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GTypAgendyIsl pomocí fukce GTypAgendyIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    30.11.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GTypAgendyColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GTypAgendyFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GTypAgendyFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GTypAgendyFieldNames[] | 'all' | null, scope?: WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GTypAgendyFieldNames[] | 'all' | null;
            scope?: GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Gin.WebClient {
    type GTypDokumentuColumnNames = 'ixs_typ' | 'lic' | 'aktivita' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'nazev' | 'ktg_typ' | 'popis' | 'st_utaj_id' | 'lhuta_vyr' | 'zkratka' | 'ixs_ulz' | 'aktivita_ssl' | 'spis_pl' | 'spis_znak' | 'ofic_nazev' | 's_gen_cj' | 'ixs_esu' | 'ixs_lpc' | 'z_int' | 'priz_vycet' | 'ixs_cin' | 'poc_dnu_vyp_dor' | 'ixs_typ_opr' | 'priz_rsp' | 'ixs_frm_gform' | 'priz_epk' | 'predpl_vec' | 'typ_vazby' | 'ixp_sablony' | 'ixs_frm_gform_spi' | 'priz_dupli' | 'over_duver' | 'zakon_duvod_gdpr' | 's_dotaz_irp' | 'plan_zve' | 'priz_fyz' | 'ixs_zap' | 'szr_agenda_count';
    type GTypDokumentuFieldNames = 'ixs_typ' | 'lic' | 'aktivita' | 'poznamka' | 'dat_od' | 'dat_do' | 'dat_zmena' | 'zmenu_prov' | 'nazev' | 'ktg_typ' | 'popis' | 'st_utaj_id' | 'lhuta_vyr' | 'zkratka' | 'ixs_ulz' | 'aktivita_ssl' | 'spis_pl' | 'spis_znak' | 'ofic_nazev' | 's_gen_cj' | 'ixs_esu' | 'ixs_lpc' | 'z_int' | 'priz_vycet' | 'ixs_cin' | 'poc_dnu_vyp_dor' | 'ixs_typ_opr' | 'priz_rsp' | 'ixs_frm_gform' | 'priz_epk' | 'predpl_vec' | 'typ_vazby' | 'ixp_sablony' | 'ixs_frm_gform_spi' | 'priz_dupli' | 'over_duver' | 'zakon_duvod_gdpr' | 's_dotaz_irp' | 'plan_zve' | 'priz_fyz' | 'ixs_zap' | 'szr_agenda_count';
    class GTypDokumentuIsl {
        static Init(columns: Names<GTypDokumentuColumnNames>, fields: Names<GTypDokumentuFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Names<GTypDokumentuColumnNames>, fields: Names<GTypDokumentuFieldNames>): boolean;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GTypDokumentuDto>
         *
         * @author  TFeik
         * @date    30.11.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GTypDokumentuDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GTypDokumentuColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  TFeik
         * @date    30.11.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GTypDokumentuColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GTypDokumentuIsl pomocí fukce GTypDokumentuIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    30.11.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GTypDokumentuColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GTypDokumentuFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GTypDokumentuFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GTypDokumentuFieldNames[] | 'all' | null, scope?: WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GTypDokumentuFieldNames[] | 'all' | null;
            scope?: GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Gin.WebClient {
    /**
     * GTypSpousteciUdalostiColumnNames
     *
     * @author  TFeik
     * @date    18.04.2023
     * @since   490.1.0.0
     */
    type GTypSpousteciUdalostiColumnNames = 'ixs_spu' | 'zkratka' | 'nazev' | 'poznamka' | 'dat_od' | 'dat_do' | 'aktivita' | 'dat_zmena' | 'zmenu_prov';
    /**
     * GTypSpousteciUdalostiFieldNames
     *
     * @author  TFeik
     * @date    18.04.2023
     * @since   490.1.0.0
     */
    type GTypSpousteciUdalostiFieldNames = 'ixs_spu' | 'zkratka' | 'nazev' | 'poznamka' | 'dat_od' | 'dat_do' | 'aktivita' | 'dat_zmena' | 'zmenu_prov';
    /**
     * GTypSpousteciUdalostiIsl
     *
     * @author  TFeik
     * @date    18.04.2023
     * @since   490.1.0.0
     */
    class GTypSpousteciUdalostiIsl {
        /**
         * CanAddColumn
         *
         * @author  TFeik
         * @date    18.04.2023
         *
         * @param {GTypSpousteciUdalostiColumnNames} column
         * @param {GTypSpousteciUdalostiColumnNames[] | 'all' | undefined | null | false} columns
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddColumn;
        /**
         * addGridFormat<TRow = Interface.GTypSpousteciUdalostiDto>
         *
         * @author  TFeik
         * @date    18.04.2023
         *
         * @param {Data.GridFormat<TRow>} gridFormat
         * @param {Gin.WebClient.AddMode} addMode
         * @param {GTypSpousteciUdalostiColumnNames[] | 'all'} [columns]
         * @param {GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GWflspidDto>
         *
         * @author  TFeik
         * @date    18.04.2023
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GTypSpousteciUdalostiDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GTypSpousteciUdalostiColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * @author  TFeik
         * @date    18.04.2023
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GTypSpousteciUdalostiColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * Před jejím voláním je nutné provést inicializaci GTypSpousteciUdalostiIsl pomocí fukce GTypSpousteciUdalostiIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    18.04.2023
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GTypSpousteciUdalostiColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * AddFilterFields
         *
         * @author  TFeik
         * @date    18.04.2023
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GTypSpousteciUdalostiFieldNames[] | 'all' | null} input
         * @returns {JQuery.Promise<Forms.Form>}
         */
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GTypSpousteciUdalostiFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        /**
         * AddFilterFieldsImmediate
         *
         * @author  TFeik
         * @date    18.04.2023
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GTypSpousteciUdalostiFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GTypSpousteciUdalostiFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): Forms.Form;
        /**
         * createFilterForm
         *
         * @author  TFeik
         * @date    18.04.2023
         *
         * @param {Forms.Form | null} [form]
         * @param {any | null} [initialValues]
         * @param {GTypSpousteciUdalostiFieldNames[] | 'all' | null} [fields]
         * @param {WebClient.GScopeOptions | null} [scope]
         * @returns {Forms.Form}
         */
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GTypSpousteciUdalostiFieldNames[] | 'all' | null, scope?: WebClient.GScopeOptions | null): Forms.Form;
        /**
         * CanAddField
         *
         * @author  TFeik
         * @date    18.04.2023
         *
         * @param {GTypSpousteciUdalostiFieldNames} field
         * @param {Names<GTypSpousteciUdalostiFieldNames>} fields
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddField;
        /**
         * addFilterForm
         *
         * @author  TFeik
         * @date    18.04.2023
         *
         * @param {{ form: Forms.Form, initialValues?: any | null, fields?: GTypSpousteciUdalostiFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GTypSpousteciUdalostiFieldNames[] | 'all' | null;
            scope?: GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Gin.WebClient {
    /**
     * GUrovenPristupuColumnNames
     *
     * @author  TFeik
     * @date    16.03.2023
     * @since   488.1.0.166
     */
    type GUrovenPristupuColumnNames = 'st_utaj_id' | 'st_utaj_id_txt' | 'aktivita' | 'zkratka' | 'st_utaj_id_orig' | 'dat_zmena' | 'zmenu_prov' | 'ixs_lpc' | 'rezim_nakl' | 'stupen_utaj' | 'nazev_mezinar' | 'zkratka_mezinar';
    /**
     * GUrovenPristupuFieldNames
     *
     * @author  TFeik
     * @date    16.03.2023
     * @since   488.1.0.166
     */
    type GUrovenPristupuFieldNames = 'st_utaj_id' | 'st_utaj_id_txt' | 'aktivita' | 'zkratka' | 'st_utaj_id_orig' | 'dat_zmena' | 'zmenu_prov' | 'ixs_lpc' | 'rezim_nakl' | 'stupen_utaj' | 'nazev_mezinar' | 'zkratka_mezinar';
    /**
     * GUrovenPristupuIsl
     *
     * @author  TFeik
     * @date    16.03.2023
     * @since   488.1.0.166
     */
    class GUrovenPristupuIsl {
        /**
         * Init
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {Names<GUrovenPristupuColumnNames>} columns
         * @param {Names<GUrovenPristupuFieldNames>} fields
         * @returns {JQuery.Promise<void>}
         */
        static Init(columns: Names<GUrovenPristupuColumnNames>, fields: Names<GUrovenPristupuFieldNames>): JQuery.Promise<void>;
        /**
         * IsInitiated
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {Names<GUrovenPristupuColumnNames>} columns
         * @param {Names<GUrovenPristupuFieldNames>} fields
         * @returns {boolean}
         */
        static IsInitiated(columns: Names<GUrovenPristupuColumnNames>, fields: Names<GUrovenPristupuFieldNames>): boolean;
        /**
         * loadEnums
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {GUrovenPristupuColumnNames[] | 'all' | undefined | null | false} columns
         * @param {GUrovenPristupuFieldNames[] | 'all' | undefined | null | false} fields
         * @returns {JQuery.Promise<IconColumnEnums>}
         */
        private static loadEnums;
        /**
         * CanAddColumn
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {GUrovenPristupuColumnNames} column
         * @param {GUrovenPristupuColumnNames[] | 'all' | undefined | null | false} columns
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddColumn;
        /**
         * addGridFormat<TRow = Interface.GUrovenPristupuDto>
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {Data.GridFormat<TRow>} gridFormat
         * @param {Gin.WebClient.AddMode} addMode
         * @param {GUrovenPristupuColumnNames[] | 'all'} [columns]
         * @param {GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GUrovenPristupuDto>
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GUrovenPristupuDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GUrovenPristupuColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GUrovenPristupuColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GUrovenPristupuIsl pomocí fukce GUrovenPristupuIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GUrovenPristupuColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * AddFilterFields
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GUrovenPristupuFieldNames[] | 'all' | null} input
         * @returns {JQuery.Promise<Forms.Form>}
         */
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GUrovenPristupuFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        /**
         * AddFilterFieldsImmediate
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {{ form?: Forms.Form | null, initialValues?: any | null, fields?: GUrovenPristupuFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GUrovenPristupuFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): Forms.Form;
        /**
         * createFilterForm
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {Forms.Form | null} [form]
         * @param {any | null} [initialValues]
         * @param {GUrovenPristupuFieldNames[] | 'all' | null} [fields]
         * @param {WebClient.GScopeOptions | null} [scope]
         * @returns {Forms.Form}
         */
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GUrovenPristupuFieldNames[] | 'all' | null, scope?: WebClient.GScopeOptions | null): Forms.Form;
        /**
         * CanAddField
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {GUrovenPristupuFieldNames} field
         * @param {Names<GUrovenPristupuFieldNames>} fields
         * @param {Gin.WebClient.AddMode} addMode
         * @returns {boolean}
         */
        private static CanAddField;
        /**
         * addFilterForm
         *
         * @author  TFeik
         * @date    16.03.2023
         *
         * @param {{ form: Forms.Form, initialValues?: any | null, fields?: GUrovenPristupuFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GUrovenPristupuFieldNames[] | 'all' | null;
            scope?: GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Gin.WebClient {
    /**
     * GVecnaSkupinaColumnNames
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    type GVecnaSkupinaColumnNames = 'ixs_vsk' | 'ico' | 'nazev' | 'dat_od' | 'dat_do' | 'spis_znak' | 'spis_znak_short' | 'poznamka' | 'zmenu_prov';
    /**
     * GVecnaSkupinaFieldNames
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    type GVecnaSkupinaFieldNames = 'ixs_vsk' | 'ico' | 'nazev' | 'dat_od' | 'dat_do' | 'spis_znak' | 'spis_znak_short' | 'poznamka' | 'zmenu_prov';
    /**
     * GWflszneIsl
     *
     * @author  RTomes
     * @date    28.02.2023
     * @since   488.1.0.767
     */
    class GVecnaSkupinaIsl {
        /**
         * Init
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Wfl.WebClient.Names<GVecnaSkupinaColumnNames>} columns
         * @param {Wfl.WebClient.Names<GVecnaSkupinaFieldNames>} fields
         * @returns {JQuery.Promise<void>}
         */
        static Init(columns: Gin.WebClient.Names<GVecnaSkupinaColumnNames>, fields: Gin.WebClient.Names<GVecnaSkupinaFieldNames>): JQuery.Promise<void>;
        /**
         * IsInitiated
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Gin.WebClient.Names<GVecnaSkupinaColumnNames>} columns
         * @param {Gin.WebClient.Names<GVecnaSkupinaFieldNames>} fields
         * @returns {boolean}
         */
        static IsInitiated(columns: Gin.WebClient.Names<GVecnaSkupinaColumnNames>, fields: Gin.WebClient.Names<GVecnaSkupinaFieldNames>): boolean;
        /**
         * CanAddColumn
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {GVecnaSkupinaColumnNames} column
         * @param {GVecnaSkupinaFieldNames[] | 'all' } columns
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
         * @param {{ gridFormat: Data.GridFormat<TRow>, addMode: Gin.WebClient.AddMode, columns?: GVecnaSkupinaColumnNames[] | 'all'} input
         * @returns {Data.GridFormat<TRow>}
         */
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GVecnaSkupinaDto>
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GVecnaSkupinaDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GVecnaSkupinaColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
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
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GVecnaSkupinaColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
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
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GVecnaSkupinaColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
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
            fields?: GVecnaSkupinaFieldNames[] | 'all' | null;
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
            fields?: GVecnaSkupinaFieldNames[] | 'all' | null;
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
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GVecnaSkupinaFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        /**
         * CanAddField
         *
         * @author  RTomes
         * @date    29.03.2022
         *
         * @param {GVecnaSkupinaFieldNames} fieldName
         * @param {Gin.WebClient.Names<GVecnaSkupinaFieldNames>} fields
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
         * @param {{ form: Forms.Form, initialValues?: any | null, fields?: GVecnaSkupinaFieldNames[] | 'all' | null} input
         * @returns {Forms.Form}
         */
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GVecnaSkupinaFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Gin.WebClient {
    type GZmenuProvedlColumnNames = 'ixs_zmp' | 'lic' | 'aktivita' | 'dat_zmena' | 'zmenu_prov' | 'ixs_ref' | 'ixs_su' | 'ixs_orj' | 'nazev_ref' | 'nazev_fun' | 'nazev_su' | 'nazev_orj' | 'typ_zmp' | 'dat_mpd' | 'nazev_rf' | 'jmeno' | 'prijmeni' | 'tit_pred' | 'tit_za';
    type GZmenuProvedlFieldNames = 'ixs_zmp' | 'lic' | 'aktivita' | 'dat_zmena' | 'zmenu_prov' | 'ixs_ref' | 'ixs_su' | 'ixs_orj' | 'nazev_ref' | 'nazev_fun' | 'nazev_su' | 'nazev_orj' | 'typ_zmp' | 'dat_mpd' | 'nazev_rf' | 'jmeno' | 'prijmeni' | 'tit_pred' | 'tit_za';
    class GZmenuProvedlIsl {
        static Init(columns: Names<GZmenuProvedlColumnNames>, fields: Names<GZmenuProvedlFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Names<GZmenuProvedlColumnNames>, fields: Names<GZmenuProvedlFieldNames>): boolean;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GWflspidDto>
         *
         * @author  TFeik
         * @date    02.12.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GGinszmpDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GZmenuProvedlColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * @author  TFeik
         * @date    02.12.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GZmenuProvedlColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro wflspid.
         *
         * Před jejím voláním je nutné provést inicializaci GZmenuProvedlIsl pomocí fukce GZmenuProvedlIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    02.12.2021
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GZmenuProvedlColumnNames[] | 'all', scopeOptions?: WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GZmenuProvedlFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GZmenuProvedlFieldNames[] | 'all' | null;
            scope?: WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GZmenuProvedlFieldNames[] | 'all' | null, scope?: WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GZmenuProvedlFieldNames[] | 'all' | null;
            scope?: GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Gin.WebClient {
    /**
     * Zverejneni smluv pro GWA05
     *
     * @author bmartinek
     * @since 484.2.0.456
     */
    class GZadaniDuvodu extends GContentBase {
        private _options;
        private NazevRf;
        prepareContent(options: IGZadaniDuvoduOptions): void;
        private createForm;
        private oKPotvrzeni;
    }
    interface IGZadaniDuvoduOptions {
        /** Pevny Text */
        prednastavenyText?: string;
        /** Titulek*/
        tittle?: string;
        /** uid*/
        uid?: string;
        /** label*/
        label?: string;
    }
}
declare namespace Gordic.Gin.WebClient {
    class GinthesDlg extends GContentBase {
        private GridSeznam;
        private ViewTabulkaSubjektu;
        private VsechnyNepouzite;
        private DataDoGridu;
        private IxsEsu;
        private onContentReady;
        private registrAction;
        private getMenu;
        private createMenu;
        private createGrid;
        private getGridFormatVazby;
        private getGridFormatVsechny;
        private obcerstvit;
        private znovuNactiStranku;
        private seznamNepouzitych;
    }
}
declare namespace Gordic.Gin.WebClient {
    const DefaultSigner: Signer;
}
declare namespace Gordic.Gin.WebClient {
    interface IGSignaturePosition {
        X: number;
        Y: number;
        Width: number;
        Height: number;
        PageIndex: number;
        PageWidth: number;
        PageHeight: number;
    }
    enum GSignatureDrawingStyle {
        fixedRectangle = 0,
        drawRectangle = 1
    }
    interface IGSigSelectOptions {
        signatures?: Gordic.Security.Service.GPdfVisualSignPositionDto[];
        defaultSignature?: {
            imageContent: string | null;
            width: number;
            height: number;
            imageWidth?: number;
            imageHeight?: number;
        };
        drawingStyle?: GSignatureDrawingStyle;
    }
    /**
     * Widget for signature selection on pdf
     *
     * @author Vlastimil Máca
     * @since 482.1.0.173
     */
    class GSigSelect extends Gordic.Widget.JQueryWidget<IGSigSelectOptions> {
        static widgetName: string;
        static widgetCssName: string;
        private logger;
        private replaceOnSave;
        private badge;
        private actionList;
        private currentShapeDrawer;
        private currentDrawerPromise;
        private currentDrawerDef;
        private signaturesListDialog?;
        refresh(): void;
        protected _getCreateOptions(): IGSigSelectOptions;
        protected _setOption(key: string, value: any): void;
        private setDefaultSignature;
        static iconBuilder: Gordic.Utils.IconBuilder;
        private currentDrawer;
        protected _create(): void;
        private showSignaturesList;
        _destroy(): void;
        setExistingSignatures(positions: Gordic.Security.Service.GPdfVisualSignPositionDto[], pdfPages: any[]): void;
        getSignatures(): IGSignaturePosition[] | null;
        loadedPromise(): JQueryPromise<any>;
        start(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
    }
    interface IGSignatureCanvasShape extends Components.CanvasDrawer.IGCanvasShape {
        defaultCanvasWidth?: number | null;
        defaultCanvasHeight?: number | null;
        defaultCanvasRotation?: number | null;
        isFreeform: boolean;
    }
    class GSignatureCanvasShape extends Components.CanvasDrawer.GCanvasShape implements IGSignatureCanvasShape, Components.CanvasDrawer.IGCanvasShape {
        defaultCanvasWidth?: number | null;
        defaultCanvasHeight?: number | null;
        defaultCanvasRotation?: number | null;
        isFreeform: boolean;
        constructor(canvasId: string | IGSignatureCanvasShape, dimensions?: Components.CanvasDrawer.IGCanvasShapeDimensionOptions, opts?: Components.CanvasDrawer.IGCanvasShapeOptions);
        copy(): Components.CanvasDrawer.IGCanvasShape;
    }
    class GSignatureCanvasShapeDrawer extends Components.CanvasDrawer.GBaseShapeDrawer<IGSignatureCanvasShape> {
        private _freeformEnabled;
        constructor();
        width: number;
        height: number;
        imageWidth: number;
        imageHeight: number;
        defaultWidth: number;
        defaultHeight: number;
        private image;
        private imageCanvas;
        destroy(): void;
        createShape(canvasId: string): GSignatureCanvasShape;
        setImage(image: any, imageWidth?: number, imageHeight?: number, rotation?: number): void;
        drawCanvas(canvas: HTMLCanvasElement, shape: IGSignatureCanvasShape, canvasData?: Components.CanvasDrawer.IGCanvasLayerData | null, isActiveDrawing?: boolean): void;
        enableFreeForm(enabled: boolean): void;
        isFreeFormEnabled(): boolean;
    }
}
interface JQuery {
    gsigselect(options?: Gordic.Gin.WebClient.IGSigSelectOptions): JQuery;
    gsigselect(method: "refresh"): JQuery;
    gsigselect(method: "setExistingSignatures", positions: Gordic.Gin.WebClient.IGSignaturePosition[]): JQuery;
    gsigselect(method: "getSignatures"): Gordic.Gin.WebClient.IGSignaturePosition[];
    gsigselect(method: "loadedPromise"): JQueryPromise<any>;
    gsigselect(method: "start"): JQueryPromise<any>;
    gsigselect(method: "option"): Gordic.Gin.WebClient.IGSigSelectOptions;
    gsigselect(method: "option", values: Partial<Gordic.Gin.WebClient.IGSigSelectOptions>): JQuery;
    gsigselect<K extends Extract<keyof Gordic.Gin.WebClient.IGSigSelectOptions, string>>(method: "option", key: K): Gordic.Gin.WebClient.IGSigSelectOptions[K];
    gsigselect<K extends Extract<keyof Gordic.Gin.WebClient.IGSigSelectOptions, string>>(method: "option", key: K, value: Required<Gordic.Gin.WebClient.IGSigSelectOptions>[K]): JQuery;
    gsigselect(method: "instance"): Gordic.Gin.WebClient.GSigSelect;
}
declare namespace Gordic.Gin.Prefabs.Field {
    /**
     * Enum názvů políček použitých ve formuláři uživatelského nastavení zásilek.
     *
     * @author  TFeik
     * @date    10.02.2018
     */
    enum Names {
        mistnost = "Mistnost",
        budova = "Budova",
        segmentBudovy = "SegmentBudovy",
        zrusene = "Zrusene",
        datum = "Datum",
        identifikator = "Identifikator",
        spisovyUzel = "SpisovyUzel",
        funkce = "Funkce",
        referent = "Referent",
        rok = "Rok"
    }
    function MergeOptions<TOptions>(...opt: TOptions[]): TOptions;
    function Mistnost(opt?: GSelectBoxOptions<Gordic.Data.Readers.GinsmisDto>): GSelectBoxOptions<Gordic.Data.Readers.GinsmisDto>;
    function Budova(opt?: GSelectBoxOptions<Gordic.Data.Readers.GinsbudDto>): GSelectBoxOptions<Gordic.Data.Readers.GinsbudDto>;
    function SegmentBudovy(opt?: GSelectBoxOptions<Gordic.Data.Readers.GinssbuDto>): GSelectBoxOptions<Gordic.Data.Readers.GinssbuDto>;
    function Zrusene(opt?: GCheckOptions): GCheckOptions;
    /**
     * export function Datum
     *
     * @param {GDateBoxOptions} [opt]
     * @returns {GDateBoxOptions[]}
     */
    function Datum(opt?: GDateBoxOptions): GDateBoxOptions;
    /**
  * export function Datum
  *
  * @param {GDateBoxOptions} [opt]
  * @returns {GDateBoxOptions[]}
  */
    function DatumACas(opt?: GDateBoxOptions): GDateBoxOptions;
    /**
     * IdentifikatorOptionsSpecials
     *
     * @author  TFeik
     * @date    09.10.2019
     * @since   482.1.0.287
     */
    interface IdentifikatorOptions {
        fieldOpt?: GStringBoxOptions;
        /**
         * (default: false) Příznak, zda je zadaný identifikátor pid.
         * @type {boolean}
         */
        isPid?: boolean;
        /**
         * (default: 12) Počet znaků identifikátoru, při jehož dosažení se spustí daná funkce (onLengthGoalReached).
         * @type {number}
         */
        lengthGoal?: number;
        /**
         * (default: undefined) Funkce, která se spustí jakmile má idenfitikátor daný počet znaků (lengthGoal).
         * @type {(value?: string | null)}
         * @default > void
         */
        onLengthGoalReached?: (event: JQueryEventObject, value?: string | null) => void;
        /**
         * (default: false) Příznak, že identifikátor nemusí být pid, ale může se jendat o jakýkoli text.
         * @type {boolean | null}
         */
        isCustomId?: boolean | null;
    }
    /**
     * export function Identifikator
     *
     * @param {{ isPid?: boolean} [opt]
     * @param {boolean} [mergeButtons] (Default = true) Příznak, zda se mají tlačítka spojit s výchozími.
     * @returns {GStringBoxOptions}
     */
    function Identifikator(opt?: IdentifikatorOptions, mergeButtons?: boolean): GStringBoxOptions;
    /**
     * Vytvoří tlačítko pro kopírování obsahu políčka do clipboard - to je nutné vložit do políčka do buttons.
     *
     * @author  TFeik
     * @date    20.07.2020
     *
     * @param {string} fieldName Název (option 'name') políčka.
     * @returns {MenuParams}
     */
    function CreateUlozitDoClipboarduButton(fieldName: string): (MenuParams & {
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
    });
    function SpisovyUzel(opt: GSelectBoxOptions<Gordic.Data.Readers.GinspodDto>, 
    /**
     *   zobrazi button/checkbox ovladající filter PridruzenaStrediska - pouziva se u v predavacich dialozich
     * @type {boolean}
     */
    chovaniStrediskaDleUcelu: Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu): GSelectBoxOptions<Gordic.Data.Readers.GinspodDto>;
    function Referent(opt?: {
        related: HTMLElement | JQuery | Element;
    } & GSelectBoxOptions<Gordic.Data.Readers.GinsrefDto>): GSelectBoxOptions<Gordic.Data.Readers.GinsrefDto>;
    function Funkce(opt: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>, 
    /**
     * zobrazi button/checkbox ovladající filter PridruzenaStrediska - pouziva se u v predavacich dialozich
     * @type {boolean}
     */
    chovaniStrediskaDleUcelu: Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu): GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>;
    function Rok(opt?: GNumberBoxOptions): GNumberBoxOptions;
}
declare namespace Gordic.Gin.Prefabs {
    /**
     * Abych neustálne nemusel kontrolovat objekt opt.
     *
     * @param {GFieldOptions<TValue>} [opt]
     * @returns {GFieldOptions<TValue>}
     */
    function checkFieldOpt<TValue = any>(opt?: {
        parentElement?: JQuery | HTMLElement | Element;
    } & GFieldOptions<TValue>): GFieldOptions<TValue>;
    /**
     * Abych neustálne nemusel kontrolovat objekt rowOpt.
     *
     * @param {GFormRowOptions} [opt]
     * @returns {GFormRowOptions}
     */
    function checkRowOpt(opt?: GFormRowOptions): GFormRowOptions;
    function preReturn(form: Gordic.Forms.Form): Gordic.Forms.FormRow[];
    function preReturnSection(form: Gordic.Forms.Form): Gordic.Forms.FormSection[];
    /**
     * Enum názvů políček použitých ve formuláři uživatelského nastavení zásilek.
     *
     * @author  TFeik
     * @date    10.02.2018
     */
    enum FieldNames {
        suFunRef = "SuFunRef",
        spiFunRef = "SpiFunRef",
        email = "Email",
        poznamka = "Poznamka",
        datum = "Datum",
        datumCas = "DatumCas",
        datovaSchranka = "DatovaSchranka",
        datovaZprava = "DatovaZprava",
        eDeskSchranka = "EDeskSchranka",
        eDeskZprava = "EDeskZprava",
        spisspi = "spisspi"
    }
    /**
     * Prefab políčka typu GSuFunRef.
     *
     * @author  TFeik
     * @date    26.09.2018
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GSuFunRef(fieldOpt: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto> | undefined, rowOpt: GFormRowOptions | undefined, options: {
        /**
         *   zobrazi button/checkbox ovladající filter PridruzenaStrediska - pouziva se u v predavacich dialozich
         * @type {boolean}
         */
        chovaniStrediskaDleUcelu: Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu;
    }): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu GSpiFunRef.
     * Pro filtrování na spisovnu použijte "serverFilters: { SPristupemDoSpisovny: ixsSpi }"
     *
     * @author  TFeik
     * @date    13.11.2019
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GSpiFunRef(opt: {
        /**
         * Options políčka Ginsfun.
         * @type {GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>}
        */
        fieldOpt: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto> | undefined;
        /**
         * Options řádku.
         * @type {GFormRowOptions}
         */
        rowOpt: GFormRowOptions | undefined;
        /**
         * Nastavení prefabu.
         * @type {}
         */
        options: {
            /**
             *  zobrazi button/checkbox ovladající filter PridruzenaStrediska - pouziva se u v predavacich dialozich
             * @type {boolean}
             */
            chovaniStrediskaDleUcelu: Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu;
        };
    }): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu GSpiFunRef a Spisspi.
     *
     * @author  TFeik
     * @date    15.11.2019
     * @see [xWiki]{@link }
     *
     * @param {GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GSpiFunRefSpisspi(opt: {
        /**
         * Options políčka Ginsfun.
         * @type {GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>}
         */
        ginsfunFieldOpt: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto> | undefined;
        /**
         * Options políčka Spisspi.
         * @type {GSelectBoxOptions<Gordic.Data.Readers.SpisspiDto>}
         */
        spisspiFieldOpt: GSelectBoxOptions<Gordic.Data.Readers.SpisspiDto> | undefined;
        /**
         * Options řádku.
         * @type {GFormRowOptions}
         */
        rowOpt: GFormRowOptions | undefined;
        /**
         * Nastavení prefabu.
         * @type {}
         */
        options: {
            /**
             *  zobrazi button/checkbox ovladající filter PridruzenaStrediska - pouziva se u v predavacich dialozich
             * @type {boolean}
             */
            chovaniStrediskaDleUcelu: Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu;
        };
    }): Gordic.Forms.FormRow[];
    /**
      * Prefab políčka typu Email.
      *
      * @author  TFeik
      * @date    14.09.2018
      * @see [xWiki]{@link }
      *
      * @param {GStringBoxOptions} [fieldOpt] Options políčka.
      * @param {GFormRowOptions} [rowOpt] Options řádku.
      * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
      */
    function GEmail(fieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu Poznámka.
     *
     * @author  TFeik
     * @date    30.08.2018
     * @see [xWiki]{@link }
     *
     * @param {GStringBoxOptions} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GPoznamka(fieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu datum.
     *
     * @author  TFeik
     * @date    25.09.2018
     * @see [xWiki]{@link }
     *
     * @param {GDateBoxOptions} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GDatum(fieldOpt?: GDateBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka typu datum a čas.
     *
     * @author  TFeik
     * @date    25.09.2018
     * @see [xWiki]{@link }
     *
     * @param {GDateBoxOptions} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GDatumACas(fieldOpt?: GDateBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka datové schránky.
     *
     * @author  TFeik
     * @date    25.09.2018
     * @see [xWiki]{@link }
     *
     * @param {GDateBoxOptions} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GDatovaSchranka(fieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka datové zprávy.
     *
     * @author  TFeik
     * @date    25.09.2018
     * @see [xWiki]{@link }
     *
     * @param {GDateBoxOptions} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GDatovaZprava(fieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka Identifikátor.
     *
     * @author  TFeik
     * @date    03.10.2018
     * @see [xWiki]{@link }
     *
     * @param {GDateBoxOptions} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @param {boolean} [mergeButtons] (Default = true) Příznak, zda se mají tlačítka spojit s výchozími.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GIdentifikator(fieldOpt?: Field.IdentifikatorOptions, rowOpt?: GFormRowOptions, mergeButtons?: boolean): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka eDesk schránky.
     *
     * @author  TFeik
     * @date    18.09.2019
     * @see [xWiki]{@link }
     *
     * @param {GDateBoxOptions} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GEDeskSchranka(fieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * Prefab políčka eDesk zprávy.
     *
     * @author  TFeik
     * @date    18.09.2019
     * @see [xWiki]{@link }
     *
     * @param {GDateBoxOptions} [fieldOpt] Options políčka.
     * @param {GFormRowOptions} [rowOpt] Options řádku.
     * @returns {Gordic.Forms.FormRow[]} Řádky prefabu.
     */
    function GEDeskZprava(fieldOpt?: GStringBoxOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
}
declare namespace Gordic.Gin.Prefabs.Row {
    /**
     * Prefab řádku formuláře Budova, segment, místnost.
     *
     * @author  TFeik
     * @date    11.12.2018
     * @see [xWiki]{@link }
     *
     * @param {{ rowOptions?: GFormRowOptions, mistnostFieldOptions?: GSelectBoxOptions<Gordic.Data.Readers.GinsmisDto>, budovaFieldOptions?: GSelectBoxOptions<Gordic.Data.Readers.GinsbudDto>} [inputParams]
     * @returns {Gordic.Forms.FormRow[] | undefined}
     */
    function GBudovaSegmentMistnost(inputParams?: {
        rowOptions?: GFormRowOptions;
        mistnostFieldOptions?: GSelectBoxOptions<Gordic.Data.Readers.GinsmisDto>;
        budovaFieldOptions?: GSelectBoxOptions<Gordic.Data.Readers.GinsbudDto>;
        segmentBudovyFieldOptions?: GSelectBoxOptions<Gordic.Data.Readers.GinssbuDto>;
    }): Gordic.Forms.FormRow[];
    /**
     * Prefab řádku formuláře Spisový uzel, funkce, referent.
     *
     * @author  TFeik
     * @date    25.07.2019
     *
     * @param {{ rowOptions?: GFormRowOptions, spisovyUzelFieldOptions?: GSelectBoxOptions<Gordic.Data.Readers.GinspodDto>, funkceFieldOptions?: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>} [inputParams]
     * @returns {Gordic.Forms.FormRow[]}
     */
    function GSpisovyUzelFunkceReferent(inputParams: {
        rowOptions?: GFormRowOptions;
        spisovyUzelFieldOptions?: GSelectBoxOptions<Gordic.Data.Readers.GinspodDto>;
        funkceFieldOptions?: GSelectBoxOptions<Gordic.Data.Readers.GinsfunDto>;
        referentFieldOptions?: Gordic.Data.Selectors.UserSelectorOptions & GSelectBoxOptions<Gordic.Data.Readers.GinsrefDto>;
        /**
         *  zobrazi button/checkbox ovladající filter PridruzenaStrediska - pouziva se u v predavacich dialozich
         * @type {boolean}
         */
        chovaniStrediskaDleUcelu: Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu;
    }): Gordic.Forms.FormRow[];
    /**
     * export function GZrušené
     *
     * @param {GCheckOptions} [fieldOpt]
     * @param {GFormRowOptions} [rowOpt]
     * @returns {Gordic.Forms.FormRow[]}
     */
    function GZrusene(fieldOpt?: GCheckOptions, rowOpt?: GFormRowOptions): Gordic.Forms.FormRow[];
    /**
     * export function GRok
     *
     * @param {GNumberBoxOptions} [fieldOpt]
     * @param {GFormRowOptions} [rowOpt]
     * @returns {Gordic.Forms.FormRow[]}
     */
    function GRok(opt?: {
        fieldOpt?: GNumberBoxOptions;
        rowOpt?: GFormRowOptions;
    }): Gordic.Forms.FormRow[];
}
declare namespace Gordic.Gin.WebClient {
    class GAibConnectorDialog extends GContentBase {
        private connectorInfo;
        private aibUrl;
        onContentReady(): void;
        private init;
        private createActions;
        private createInfoFlash;
        private createMenuBar;
        private createHeader;
        private createGrid;
        private doplnujiciInformace;
        private createTextAreaInput;
        private copyToClipboard;
    }
    function CreateAibConnectorDialog(connectorInfo: Gordic.Gin.Interface.GAibConnectorInfoDto): void;
}
declare namespace Gordic.Gin.Prefabs {
    /**
     * Prefab sloupce pro boolovskou hodnotu (reprezentovanou integerem, nebo boolem) s editorem.
     *
     * @author TFeik
     * @date 14.05.2018
     *
     * @param {object} params Parametry prefabu.
     * @pa-ram {boolean} params.isEditable Název hodnota řádku.
     * @pa-ram {string} params.model (default = false) Příznak, zda je políčko i s editorem.
     * @pa-ram {boolean} params.useNumbers (default = undefined) Model fieldu.
     * @pa-ram {boolean | ((row: TRow) => boolean)} params.disabled (default = false) Příznak, zda se v řádku používá číselná, či boolovská hodnota.
     * @param {GGridColumn<TRow>} opt Options sloupce, které přepisují výchozí nastavení prefabu.
     */
    function addBoolColumn<TRow>(params: {
        /** Název hodnota řádku. */
        valueName: string;
        /** (default = false) Příznak, zda je políčko i s editorem. */
        isEditable?: boolean;
        /** (default = undefined) Model fieldu. */
        model?: string;
        /** (default = false) Příznak, zda se v řádku používá číselná, či boolovská hodnota. */
        useNumbers?: boolean;
        /** (default = false) Příznak, zda je políčko needitovatelné. */
        disabled?: boolean | ((row: TRow) => boolean);
    }, opt?: GGridColumn<TRow>): GGridColumn<TRow>;
}
declare namespace Gordic.Gin.Prefabs {
    interface GIcoAresFieldInput {
        /** Change akce volaná po change políčka s dalším parametrem dto hodnot z ares. */
        changeAction?: (this: HTMLElement, event: JQueryEventObject, input: {
            value: null | string;
            flags: ObjectLiteral<any>;
        }, aresDto: any) => void | boolean;
        /** Run akce volaná po kliknutí na tlačítko políčka s dalším parametrem dto hodnot z ares. */
        buttonAction?: (this: GAction, event: JQueryEventObject, runData: any[], aresDto: any /** parametry, ktere se vlozi do fce run (default undefined)) */) => any;
    }
    /**
     * Prefab políčka IČa s načtením dat z ARESu.
     *
     * @author  TFeik
     * @date:   13.01.2022
     *
     * @param {GIcoAresFieldInput} input
     * @returns {GStringBoxOptions}
     */
    function GIcoAresField(input: GIcoAresFieldInput): GStringBoxOptions;
    /**
     * Prefab řádku s políčkem IČa s načtením dat z ARESu.
     *
     * @author  TFeik
     * @since   480.1.0.82
     * @see [xWiki]{@link https://xwiki.gordic.cz/NET/javascript/Gordic/Gin/Prefabs/#HGIcoAres}
     *
     * @param {GIcoAresFieldInput} params Parametry prefabu.
     * @param {GStringBoxOptions} opt Options stringboxu.
     */
    function GIcoAres(params?: GIcoAresFieldInput, opt?: GStringBoxOptions): Gordic.Forms.FormRow[];
}
declare namespace Gordic.Gin.Prefabs.MenuParams {
    /**
     * Vytvoří akce pro sdílení odkazu.
     *
     * @author  TFeik
     * @date    08.04.2020
     *
     * @param {{ command: string }} opt
     * @returns {MenuParams}
     */
    function ShareCommandUrl(opt: {
        /**
         * Conent, na který se zaregistrují akce.
         * @type {GContent}
         */
        parentContent: GContent;
        /**
         * Odkaz vytvořený funkcí Gordic.WebApp.Utility.createCommandUrl(null, "OpenDetail", { ixx1: 'pid' }).
         * Pokud je zadaný, pak se ignoruje commandOptions.
         * @type {string}
         */
        commandUrl: string | JQuery.Promise<string>;
        /**
         * (nepovinné) Detaily nastavení emailu. Zde je například možné nastavit předmět emailu či přesný obsah (body) včetně odkazu (command).
         * Pokud není specifikováno více, pak je email vytvořen dle výchozího chování.
         *
         * @type {Gordic.Utils.MailToLinkOptions}
         */
        emailOptions?: Gordic.Utils.MailToLinkOptions;
        vlozitDoKalendareOptions: WebClient.GGinCalendarComponent.GGinCalendarComponentDto | 'Deny';
        prehledUdalostiOptions: Omit<WebClient.IGCalendarEventDialog, 'type'> | 'Deny';
    }): MenuParams;
}
declare namespace Gordic.Prefabs.TabGroups {
    function Agenda(): IGTabGroupOptions;
    function Prilohy(): IGTabGroupOptions;
    function FinancniProfil(): IGTabGroupOptions;
    function Spis(): IGTabGroupOptions;
    function Dokument(caption?: string): IGTabGroupOptions;
    function Souhrny(): IGTabGroupOptions;
    function Vazby(): IGTabGroupOptions;
    function PopisneVlastnosti(): IGTabGroupOptions;
    function RozsirujiciVlastnosti(): IGTabGroupOptions;
    function Katastr(): IGTabGroupOptions;
    function Doruceni(): IGTabGroupOptions;
    function Vyrizeni(): IGTabGroupOptions;
    function Gfrm(suffix?: string | number): IGTabGroupOptions;
    function SbernyArch(tittle: string): IGTabGroupOptions;
    function Redistribuce(): IGTabGroupOptions;
    function Zverejneni(): IGTabGroupOptions;
    function EklepPredplneni(): IGTabGroupOptions;
    function EklepMaterial(): IGTabGroupOptions;
    function EklepPripominka(): IGTabGroupOptions;
}
declare namespace Gordic.Gin.WebClient {
    interface GZastupyExternihoUzivateleDlgInputParams {
    }
    interface GZastupyExternihoUzivateleDlgReturnValue {
    }
    /**
     * Dialog zástupů veřejného uživatele.
     *
     * @author  TFeik
     * @date    05.05.2022
     * @since   488.1.0.27
     */
    class GZastupyExternihoUzivateleDlg extends GContentBase {
        /**
         * Identifikátor externího uživatele typu veřejnost (tj. občana).
         * @type {string}
         */
        private readonly IxsExu;
        /**
         * $Grid
         * @type {JQuery<HTMLElement>}
         */
        private $Grid?;
        /**
         * IslView
         * @type {Isl.View<Interface.GPublicUserDelegationDto>}
         */
        private IslView?;
        /**
         * OnContentReady.
         *
         * @author  TFeik
         * @date    05.05.2022
         */
        onContentReady(): void;
        /**
         * Vytvoření gridu.
         *
         * @author  TFeik
         * @date    06.05.2022
         */
        private CreateGrid;
        /**
         * GetActiveRow
         *
         * @author  TFeik
         * @date    06.05.2022
         *
         * @returns {Interface.GPublicUserDelegationDto | undefined}
         */
        private GetActiveRow;
        /**
         * Vytvoří akce.
         *
         * @author  TFeik
         * @date    05.05.2022
         */
        private CreateActions;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    05.05.2022
         */
        private CreateMenu;
        /**
         * ActivateZastupExternihoUzivatele
         *
         * @author  TFeik
         * @date    05.05.2022
         *
         * @param {Interface.GPublicUserDelegationDto | undefined} item
         * @returns {JQuery.Promise<Interface.GPublicUserDelegationDto>}
         */
        private ActivateZastupExternihoUzivatele;
        /**
         * CancelZastupExternihoUzivatele
         *
         * @author  TFeik
         * @date    05.05.2022
         *
         * @param {Interface.GPublicUserDelegationDto | undefined} item
         * @returns {JQuery.Promise<Interface.GPublicUserDelegationDto>}
         */
        private CancelZastupExternihoUzivatele;
        /**
         * UpdateActivitaZastupExternihoUzivatele
         *
         * @author  TFeik
         * @date    05.05.2022
         *
         * @param {Interface.GPublicUserDelegationDto | undefined} item
         * @param {'activate' | 'cancel'} akce
         * @returns {JQuery.Promise<Interface.GPublicUserDelegationDto>}
         */
        private UpdateActivitaZastupExternihoUzivatele;
        /**
         * UpdateZastupExternihoUzivatele
         *
         * @author  TFeik
         * @date    05.05.2022
         *
         * @param {Interface.GPublicUserDelegationDto} input
         * @returns {JQuery.Promise<Interface.GPublicUserDelegationDto>}
         */
        private UpdateZastupExternihoUzivatele;
    }
}
declare namespace Gordic.Gin {
    interface IGFrmSchedulerOptions {
        /** Cesta k DTO, napr. "model.scheduler". */
        modelPath: string;
    }
    function frmScheduler(opts?: IGFrmSchedulerOptions): Gordic.Forms.Form;
}
declare namespace Gordic.Gin.WebClient {
    /**
     * GAiRecognizerUtils
     *
     * @author  TFeik
     * @date    19.10.2023
     * @since   490.1.0.33
     */
    class GAiRecognizerUtils {
        /**
         * Vráti typovou hodnotu jako promise
         *
         * @param {Interface.GAIRecognizedItemDto | null | undefined} item
         * @returns {JQuery.Promise<string | null | undefined>}
         */
        static GetFormattedTextAsync(item: Interface.GAIRecognizedItemDto | null | undefined): JQuery.Promise<string | null | undefined>;
        /**
         * Vrátí typovou hodnotu.
         *
         * @author  TFeik
         * @date    19.10.2023
         *
         * @param {Interface.GAIRecognizedItemDto | null | undefined} item
         * @returns {string | number | boolean | Date | Decimal | null | undefined}
         */
        static GetFormattedText(item: Interface.GAIRecognizedItemDto | null | undefined): string | null | undefined;
        /**
         * Vrátí typovou hodnotu.
         *
         * @author  TFeik
         * @date    19.10.2023
         *
         * @param {Interface.GAIRecognizedItemDto | null | undefined} item
         * @returns {string | number | boolean | Date | Decimal | null | undefined}
         */
        static GetValue(item: Interface.GAIRecognizedItemDto | null | undefined): string | number | boolean | Date | Decimal | null | undefined;
        /**
         * Vrátí typovou hodnotu.
         *
         * @author  TFeik
         * @date    19.10.2023
         *
         * @param {Ginis.DbModel.GGinctpoEnum} item
         * @param {string | null | undefined} valueString
         * @returns {string | number | boolean | Date | Decimal | null | undefined}
         */
        static GetValue2(item: Ginis.DbModel.GGinctpoEnum | null | undefined, valueString: string | null | undefined): string | number | boolean | Date | Decimal | null | undefined;
    }
}
declare namespace Gordic.Gin.WebClient {
    interface ZaokrouhleniResult {
        hasError: boolean;
        errorText?: string;
    }
    export class recapDPH extends GContentBase<IGRecapConfigDto> implements IGClientContent {
        /**
         * Políčko, ve kterém jsou data rekapitulace
         * @type {JQuery}
         */
        pricesField: JQuery;
        private lastTaxes;
        /**
         * Formátovaný řetězec požadovaného období
         * @type {string}
         */
        private formatedTaxPeriod;
        /** Odkaz na grid*/
        grid?: JQuery;
        private limit;
        private minimalVal;
        private disabledFields;
        freezeValues: boolean;
        ignoreAmountChange: boolean;
        private getTaxField?;
        private _externalGenerated;
        get externalGenerated(): boolean;
        set externalGenerated(isExteranalGenerated: boolean);
        private prevTaxField?;
        private filterFunction;
        private loadingPromise?;
        /** pripraveni kontentu */
        prepareContent(): void;
        private afterDateChange;
        private setTaxField;
        changeText(taxPeriod: taxPeriodNameEnum): void;
        kontrolaZaokrouhleni(limit: Decimal, zaokrouhlenoHodnota?: Decimal): ZaokrouhleniResult;
        private setVisibleFields;
        refresh(): void;
        /** Metoda pro aktualizaci gridu po změně datumu */
        private refreshGridAfterDateChanged;
        /**
         * Zakáže nebo povolí Daňové atributy podle vstupního argumentu
         * @param {boolean} disable Příznak, zda mají být Daňové atributy schované
         */
        private disableTaxAttrFields;
        private disableRecapFields;
        /**
         * Vynulování všech hodnot
         */
        private resetValues;
        /**
         * Vypočítá zaokrouhlení pro celou rekapitulaci
         * @param {danDto[]} dataRows Datová pole pro výpočet zaokrouhlení
         * @returns {Decimal} Výsledná hodnota zaokrouhlení
         */
        private roundingCalculation;
        /**
         * Metoda pro nastavení pristupnosti rekapitulace
         *
         * @param {boolean} isDisabled
         */
        setAccessibility(enabled: boolean): void;
        /**
         * Přepočet daně
         * @param {boolean} recalculateTax Příznak, zda ještě přepočítat dph shora
         * @param {boolean} refreshAll Příznak, zda občerstvit celý grid
         */
        recalculate(recalculateTax: boolean, refreshAll?: boolean): void;
        /**
            * Nacte hodnoty z gridu
            * @param {string} taxPeriod nastavene datum sazby format RRRRMM
            * @param {boolean} recalculateTax  priznak, zdali se maji prepocitavat sazby
            */
        private refreshGridByPeriod;
        /**
         * Metoda pro nastavení hodnot do komponenty
         * @param {IGRecapSetValueDto[]} newValues Pole nastavovaných hodnot
         * @param {boolean} onlySet (default = false) Příznak, zda se mají nastavit hodnoty (false => nastavit a přepočítat)
         * @param {boolean} setBaseValue (default = true) Příznak, zda-li se má použít pro nastavení hodnot sloupec baseValue nebo sum => způsob výpočtu DPH
         */
        setValues(newValues: IGRecapSetValueDto[], onlySet?: boolean, setBaseValue?: boolean): JQueryPromise<void> | undefined;
        /**
         * Změna zdaňovacího období
         * @param {string} newTaxPeriod Nové zdaňovací období (format: RRRRMM)
         */
        changeTaxPeriod(newTaxPeriod: string): void;
        /**
         * Nastavení hodnoty
         * @param {number} taxType Typ daně z čiselníku Ekocdap 10 - zakladni, (dodaneni - typ krat minus jedna), atd..
         * @param {string} columnName baseValue - zaklad, tax - dan, sum - soucet
         * @param {Decimal} value Nastavovaná hodnota
         */
        setValue(taxType: number, columnName: string, value: Decimal): void;
        /**
         * Metoda podle předpisu převede hodnotu z gridu rekapitulace na objekt
         * @param {IGCollectRule[]} rules Předpis převodu
         *
         * @author PNovak
         * @date 2018-03-20
         */
        collectValue(rules: IGCollectRule[]): ObjectLiteral<Decimal>;
        setTaxRates(newTaxPeriod: Date, disabledRates: boolean): JQueryPromise<void>;
    }
    export {};
}
declare namespace Gordic.Data.Filtering {
    class BankAccountResolver extends BaseResolver {
        addTextBankAccount: (lookupColumns: string[], rows: any) => void;
        /**
         *  Algoritmus pro naseptavac. Ohodnocuje data podle hledaneho vyrazu tak, aby bylo mozne data setridit podle relevance. Resolver vytvari metafield bankAccount
         * @param lookupColumns Pole s nazvy sloupcu, ktere se maji pouzit pro vytvoreni bankovniho uctu (bankovní účet musí začínat na bu, např. bu_ci, bu_vl), směrový kód musí začínat na sk (např. sk_ci, sk_vl). Pokud není v poli, použije se defaultní hodnota bu a sk.
         * @param options
         */
        constructor(lookupColumns: string[], options: any);
        /**
         * Pro konkretni hledany retezec vraci filtracni funkci kombatibilni s Array.filter
         * @param filter hledany retezec
         * @returns delegat filtracni funkce
         */
        getFilter(filter: string): (row: any) => boolean;
    }
}
declare namespace Gordic.Gin.WebClient.Utils {
    /**
 * Výpočet DPH
 * @author PNovak
 * @date 2018-03-09
 * @param {Decimal} value Hodnota základu daně
 * @param {Decimal} charge Procenta daně
 * @param {boolean} fromBellow Příznak, zda se má provádět výpočet zespoda, nebo shora
 * @returns {IDphValue} Objekt s hodnotami základu daně, daně a jejich součtu
 */
    function calculateDPH(value: Decimal, charge: Decimal, fromBellow?: boolean): Required<IDPHValue>;
    /**
     * Funkce která převede vstupní data, na data určená pro aplikaci modelu do komponenty Rekapitulace DPH
     * @param {any} data  Data komponenty
     * @param {IGApplyRule[]} applyRules Pravidla pro aplikaci
     * @returns {IGRecapPricesMap} Výsledek operace
     */
    function dphModelApply(data: any, applyRules: IGApplyRule[]): IGRecapPricesMap;
    function convertRules(rules: IGCollectRule[]): IGApplyRule[];
    function convertRules(rules: IGApplyRule[]): IGCollectRule[];
}
declare namespace Gordic.Gin.WebClient {
    /**
     * GGinAddVlastnostOptions
     *
     * @author Vlastimil Máca
     * @since 486.1.0.87
     */
    interface IGGinAddVlastnostOptions {
        Ixx?: string;
        Sxs?: string;
        TypObj?: number;
        esuLogovani: Gin.Globals.Dialogs.IGLogovani;
        onlyVla?: boolean;
        directSave?: boolean;
    }
    interface IGGinAddVlastnostResult {
        kind: "vla" | "pro" | "stv";
        meta: Interface.GGinProfilMetaDto;
        data?: Interface.GGinVlastnostDataDto[] | null;
    }
    /**
     * Content for choosing new desc prop which should be added to content
     *
     * On confirmation of selected value it adds selected descProp structure to given Ixx (saves to Database) and returns profilMetaDto and kind, which specifies what structure was added.
     *
     * @author Vlastimil Máca
     * @since 480.1.0.67
     */
    class GGinAddVlastnostContent extends GContentBase {
        private activeTask;
        private previewArea;
        title: string;
        Ixx: string;
        Sxs: string;
        TypObj: number;
        IxsTyp: string;
        parameters: GVlastnostiParameters;
        esuLogovani: Gin.Globals.Dialogs.IGLogovani;
        onlyVla: boolean;
        directSave: boolean;
        prepareContent(inputParams: IGGinAddVlastnostOptions): void;
        createRowsPrefab(): Forms.FormRow[];
        closing(): void;
        /**
         * Creates row definition for desc prop structure
         *
         * @param {"pro" | "stv" | "vla"} kind
         * @returns {Forms.FormRow}
         */
        createPrefabForRow(kind: "pro" | "stv" | "vla"): Forms.FormRow;
        transformToProfilMeta(kind: "pro" | "stv" | "vla", data: any): Interface.GGinProfilMetaDto;
        emptyPreviewArea(includeText?: boolean): void;
        printPreview(value?: Interface.GGinProfilMetaDto | null): void;
        applyPorCisloToMeta(profil: Interface.GGinProfilMetaDto, porCislo: number | null): Interface.GGinProfilMetaDto;
        applyPorCisloToData(data: Interface.GGinVlastnostiDataDto, porCislo: number): Interface.GGinVlastnostiDataDto;
    }
}
declare namespace Gordic.Gin.WebClient {
    /**
     * typ_vla
     *
     * @author Vlastimil Máca
     * @since 480.1.0.177
     */
    enum TypVlastnosti {
        Edit = 10,
        Select = 20,
        Enum = 30,
        Esu = 40,
        NumSeries = 50
    }
    /**
     * DatTypVlastnosti
     *
     * @author Vlastimil Máca
     * @since 480.1.0.177
     */
    enum DatTypVlastnosti {
        Any = 0,
        Char = 1,
        Int = 2,
        DateTime = 3,
        Date = 4,
        Decimal = 5
    }
    /**
     * IProMap
     *
     * @author Vlastimil Máca
     * @since 480.1.0.177
     */
    interface IProMap {
        element: JQuery;
        value?: Interface.GGinProfilMetaDto | null;
        stv: ObjectLiteral<IStvMap>;
    }
    /**
     * IStvMap
     *
     * @author Vlastimil Máca
     * @since 480.1.0.177
     */
    interface IStvMap {
        value: Interface.GGinStrukturaMetaDto;
        vla: ObjectLiteral<IVlaMap>;
    }
    /**
     * IVlaMap
     *
     * @author Vlastimil Máca
     * @since 480.1.0.177
     */
    interface IVlaMap {
        widget: Forms.FormField;
        value: Interface.GGinVlastnostMetaDto | Interface.GGinVlastnostMetaDto[];
    }
    interface IGVlastnostiBuilderOptions {
        isAddForm?: boolean;
    }
    /**
     * Class which is holding options and stats for pro/stv/vla build process
     *
     * @author Vlastimil Máca
     * @since 480.1.0.63
     */
    class GVlastnostiBuilder {
        private targetElement;
        ixx?: string | undefined;
        sxs?: string | undefined;
        typ_obj?: number | undefined;
        esuLogovani: Gordic.Gin.Globals.Dialogs.IGLogovani | null;
        isExtProps: boolean;
        private map;
        private forms;
        private opts;
        private proIdMap;
        private stvIdMap;
        private vlaIdMap;
        constructor(targetElement: JQuery, ixx?: string | undefined, sxs?: string | undefined, typ_obj?: number | undefined, esuLogovani?: Gordic.Gin.Globals.Dialogs.IGLogovani | null, isExtProps?: boolean, map?: ObjectLiteral<IProMap>, forms?: ObjectLiteral<Gordic.Forms.Form>, opts?: IGVlastnostiBuilderOptions);
        /**
         * Currently processed form
         * @type {Gordic.Forms.Form}
         */
        currentForm: Gordic.Forms.Form;
        firstTimeBuilding: boolean;
        addForm(pro_id: string, form: Gordic.Forms.Form): void;
        getForm(pro_id: string): Gordic.Forms.Form | undefined;
        mapProfil(element: JQuery, profil: Interface.GGinProfilMetaDto | string): IProMap;
        getPro(pro_id: string): IProMap;
        deletePro(pro_id: string): void;
        deleteStv(pro_id: string, stv_id: string, virtual_por_cislo: number): void;
        deleteVla(pro_id: string, stv_id: string, vla_id: string, virtual_por_cislo: number): void;
        getProCount(): number;
        getVlaCount(): number;
        mapStv(pro_id: string, struktura: Interface.GGinStrukturaMetaDto): void;
        mapVla(pro_id: string, stv_id: string, vlastnost: Interface.GGinVlastnostMetaDto, widget: any): void;
        normalizeVlaVirtualPorCislo(vlastnost: any): void;
        normalizeStvVirtualPorCislo(stv: any): void;
        normalizeProVirtualPorCislo(pro: any): void;
        getMappedPro(proId: string): IProMap | null;
        getMappedStv(proId: string, stvId: string): IStvMap | null;
        getMappedVla(proId: string, stvId: string, vlaId: string): IVlaMap | null;
        getAllVlaFromPro(proId: string): Interface.GGinVlastnostMetaDto[];
        getProId(pro: Interface.GGinProfilMetaDto | string): string;
        getIxsProFromProId(proId: string): any;
        getStvId(stv: Interface.GGinStrukturaMetaDto): string;
        getIxsStvFromStvId(stvId: string): any;
        getVlaId(vla: Interface.GGinVlastnostMetaDto): string;
        getProNextVirtualPorCislo(pro: any): number;
        getStvNextVirtualPorCislo(stv: Interface.GGinStrukturaMetaDto): number;
        getVlaKeysNextVirtualPorCislo(ixs_pro: any, ixs_stv: any, ixs_vla: any): number;
        getVlaNextVirtualPorCislo(vla: Interface.GGinVlastnostMetaDto): number;
        static getSectionName(proId: string, stvId: string, virtual_por_cislo?: number | null): string;
        static getRowName(proId: string, stvId: string, vla_id: any, vitual_por_cislo?: number | null): string;
        static getKeysFromFormObjectName(rowName: any): {
            pro_id: any;
            stv_id: any;
            vla_id: any;
            virtual_por_cislo: any;
        };
        getIxsVlaFromVlaId(vlaId: string): any;
        private isProfileVisible;
        private isStrukturaVisible;
        private isVlastnostVisible;
        addProfilesToElement(profiles: Interface.GGinProfilMetaDto[], gtabOptions?: (profile: Interface.GGinProfilMetaDto) => GTabOptions | void): JQuery;
        /**
         * Adds profile to element
         *
         * @author Vlastimil Máca
         * @since 480.1.0.41
         *
         * @param {Interface.GGinProfilMetaDto} profil
         */
        addProfilToElement(profil: Interface.GGinProfilMetaDto, gtabOptions?: GTabOptions): JQuery | null;
        /**
         * Creates profile form.
         *
         * @param {Interface.GGinProfilMetaDto | string} profil
         */
        createProfilForm(profil: Interface.GGinProfilMetaDto | string): Forms.Form;
        /**
         * Adds structure into profile form as section
         *
         * @param {Interface.GGinProfilMetaDto | string} pro Profile or ixs_pro
         * @param {Interface.GGinStrukturaMetaDto} struktura
         */
        addStvSection(pro: Interface.GGinProfilMetaDto | string, struktura: Interface.GGinStrukturaMetaDto): void;
        /**
         * Creates structure definition (formsection)
         *
         * @param {Interface.GGinProfilMetaDto | string} pro
         * @param {Interface.GGinStrukturaMetaDto} struktura
         */
        createStvSection(pro: Interface.GGinProfilMetaDto | string, struktura: Interface.GGinStrukturaMetaDto): Forms.FormSection;
        /**
         * FillStvSectionWithVla
         *
         * @param {Forms.FormSection} section
         * @param {Interface.GGinProfilMetaDto | string} pro
         * @param {Interface.GGinStrukturaMetaDto} struktura
         */
        FillStvSectionWithVla(section: Forms.FormSection, pro: Interface.GGinProfilMetaDto | string, struktura: Interface.GGinStrukturaMetaDto): void;
        /**
         * Adds property (vla - formrow) to structure (formsection)
         *
         * @param {Forms.FormSection} section
         * @param {Interface.GGinProfilMetaDto |string} pro
         * @param {Interface.GGinStrukturaMetaDto} struktura
         * @param {Interface.GGinVlastnostMetaDto} vlastnost
         * @param {number} [sectionId]
         */
        addVla(section: Forms.FormSection, pro: Interface.GGinProfilMetaDto | string, struktura: Interface.GGinStrukturaMetaDto, vlastnost: Interface.GGinVlastnostMetaDto & {
            priz_multi?: boolean;
        }, sectionId?: number): void;
        static esuToString(fieldValue: any): string;
        static stringToEsu(value?: string | null): {
            ixs_esu: string;
            lic?: string;
            por_zast?: string;
        } | null;
        /**
         * Creates widget settings
         *
         * @param {Interface.GGinProfilMetaDto | string} pro profile or ixs_pro
         * @param {Interface.GGinStrukturaMetaDto | string} stv
         * @param {Interface.GGinVlastnostMetaDto} vlastnost
         */
        createVlaWidget(pro: Interface.GGinProfilMetaDto | string, stv: Interface.GGinStrukturaMetaDto | string, vlastnost: Interface.GGinVlastnostMetaDto & {
            priz_multi?: boolean;
        }, esuLogovani?: Gin.Globals.Dialogs.IGLogovani | null): Forms.FormField;
        private _defaultApplyFunc;
        private _defaultCollectFunc;
        /**
         * Transforms widget to multi selectbox
         *
         * @param {Forms.FormField} widget
         * @param {Interface.GGinVlastnostDataDto} vlastnost
         */
        private transformWidgetToMulti;
    }
    type GVlastnostiParameters = {
        [T in "gin_vla_ppro" | "gin_vla_pstr" | "gin_vla_pvla"]: string;
    };
    /**
     * GGinVlastnostiContent
     *
     * @author Vlastimil Máca
     * @since 480.1.0.63
     */
    class GGinVlastnostiContent extends GContentBase {
        private builder;
        private lastFormObjName;
        private createZone;
        private mainElement;
        private _isReadOnly;
        ixx: string;
        ixs_typ: string;
        sxs: string;
        typ_obj: number;
        esuLogovani: Gin.Globals.Dialogs.IGLogovani;
        data: Interface.GGinVlastnostiMetaDto;
        actEdit: GActionParams;
        actRemoveAll: GActionParams;
        isExtProps: boolean;
        title: string;
        useCopyFromCopyTo: boolean;
        parameters: GVlastnostiParameters;
        onContentReady(): void;
        private addNewItems;
        private appendFormDataToMeta;
        private modifyEditorMenu;
        /**
         * If profile has at least one deletable property it has deletable properties
         * @param profile
         */
        private hasProfileDeletableProperty;
        private getActProfileKey;
        private createMenuBar;
        private showZone;
        readOnly(value: boolean): void;
    }
}
declare namespace Gordic.Gin.Prefabs.Field {
    interface GinVlastnostiFilterFieldOptions {
        vlaOptions?: GSelectBoxOptions<Gordic.Data.Readers.GinsvlaDto>;
        kindFilter?: {
            [key in "pro" | "stv" | "vla"]?: boolean;
        };
    }
    interface GinVlastnostiExtPropsFilterFieldOptions {
        rpp_ixs_typ?: string[];
        ixs_typ?: string[];
        typ_obj?: number[];
        t_sxs?: {
            sxs: string | null;
            typ_obj: number;
        }[];
    }
    function GGinVlastnostiFilterField(opts?: GFieldOptions<Gin.Interface.GGinVlastnostiFilterDto> & {
        esuLogovani: Gin.Globals.Dialogs.IGLogovani;
    }, extOpts?: GinVlastnostiFilterFieldOptions): Gordic.Forms.FormField[];
    function GGinVlastnostiExtPropsFilterField(opts?: GFieldOptions<Gin.Interface.GGinVlastnostiFilterDto> & {
        esuLogovani: Gin.Globals.Dialogs.IGLogovani;
    }, extOpts?: GinVlastnostiExtPropsFilterFieldOptions): Gordic.Forms.FormField[];
}
declare namespace Gordic.PopisneVlastnosti {
    let _vlastnosti: Gordic.Gin.Interface.GGinVlastnostMetaDto[] | null;
    let _tvlList: Gordic.Gin.Interface.GGinVlastnostiTvlDto[] | null;
    let _tvlRppList: Gordic.Gin.Interface.GGinVlastnostiTvlDto[] | null;
    let _ovlList: Gordic.Gin.Interface.GGinVlastnostiOvlDto[] | null;
    let _ovkList: Gordic.Gin.Interface.GGinvovkDto[] | null;
    let _collator: Intl.Collator | null;
    let _map: {
        pro: ObjectLiteral<Gordic.Gin.Interface.GGinVlastnostMetaDto[]>;
        stv: ObjectLiteral<Gordic.Gin.Interface.GGinVlastnostMetaDto[]>;
        vla: ObjectLiteral<Gordic.Gin.Interface.GGinVlastnostMetaDto[]>;
    } | null;
    type GMaskaDataType = {
        maska?: string | null;
        nazev?: string;
        example?: string;
    };
    /**
     * Parses a number from a string with various formatting (spaces, thousand separators, decimal separators).
     * Intelligently detects decimal separator as the last occurrence of ',' or '.'.
     *
     * @param value - String representation of a number with various formatting
     * @param dotNetMask - Optional .NET format mask (e.g., "N2", "#,##0.00")
     * @returns Parsed number or NaN if parsing fails
     *
     * @example
     * parseNumberFromString("1 234,56")     // 1234.56
     * parseNumberFromString("1,234.56")     // 1234.56
     * parseNumberFromString("1.234,56")     // 1234.56
     * parseNumberFromString("-1 234,56")    // -1234.56
     */
    function parseNumberFromString(value: string | null | undefined): number | undefined;
    function getCharMaskaPresets(): Data.View<GMaskaDataType>;
    /**
     * Function returns VlastnostiDto which contains values collected from vlastnostiForm.
     *
     * @param {GContent} content
     * @returns {Gin.Interface.GGinVlastnostiDataDto}
     */
    function collectValues(content: GContent | JQuery): Gin.Interface.GGinVlastnostiDataDto | null;
    /**
     * Function returns true if any vlastnost has changed.
     *
     * @param {GContent} content
     * @returns {Gin.Interface.GGinVlastnostiDataDto}
     */
    function hasChanged(content: GContent | JQuery): boolean;
    /**
     * Function applies DataDto into
     *
     * @param {GContent} content
     * @param {Gin.Interface.GGinVlastnostiDataDto} values
     * @param {boolean} isInitial (default = true)
     */
    function applyValues(content: GContent, values: Gin.Interface.GGinVlastnostiDataDto, isInitial?: boolean): void;
    function createIxsTypGridFormat(scope: string, ixs_typ: string | string[], scopeTitle?: string): Data.GridFormat<any>;
    function createTypObjGridFormat(scope: string, typ_obj: number[], scopeTitle?: string): Data.GridFormat<any>;
    interface SxsTypGridFormatOptions {
        scope: string;
        sxs_typ: (string[] | {
            sxs: string | null;
            typ_obj: number;
        }[]);
        ixs_typ?: string[];
        typ_obj?: number[];
        scopeTitle?: string;
    }
    function createSxsTypGridFormat(scope: string | SxsTypGridFormatOptions, sxs_typ?: (string[] | {
        sxs: string | null;
        typ_obj: number;
    }[]), typ_obj?: number[], scopeTitle?: string): Data.GridFormat<any>;
    function _findVlaForGridFormat(tvlOvlFilter: Gordic.Gin.Interface.GGinVlastnostiOvlDto[] | Gordic.Gin.Interface.GGinVlastnostiTvlDto[] | Gordic.Gin.Interface.GGinvovkDto[]): Gin.Interface.GGinVlastnostMetaDto[];
    function getVlaId(v: Gordic.Gin.Interface.GGinVlastnostMetaDto): string;
    function getVlaColumnName(scope: string, v: Gordic.Gin.Interface.GGinVlastnostMetaDto | string): string;
    function getVlaColumnField(scope: string, v: Gordic.Gin.Interface.GGinVlastnostMetaDto | string): string;
    function createGridFormat(scope: string, scopeTitle?: string, vlastnosti?: Gordic.Gin.Interface.GGinVlastnostMetaDto[]): Gordic.Data.GridFormat;
    /**
     * creates map of pro,stv,vla -> vlameta
     */
    function _mapVlastnosti(): void;
}
