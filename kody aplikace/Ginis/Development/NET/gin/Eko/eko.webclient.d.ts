declare namespace Gordic.Prefabs.GridFormats {
    function SeznamRealizatoruDtoGfPrefab(): Gordic.Data.GridFormat<Gordic.Eko.Interface.SeznamRealizatoruDto>;
}
declare namespace Gordic.Eko.Dialogs {
    /**
      * Formulář pro Kontrolní hlášení
      *
      * @author Vlastimil Máca
      *
      * @param {GContent} parentContent
      * @param {object} opt Options pro otevření formuláře
      * @param {string} opt.ixp  Ixp dokladu
      * @param {number} opt.radek  řádek
      * @param {Gordic.Eko.Client.GEKHPrava} [opt.prava] prava Práva k editaci nebo pouze prohlížení
      * @param {Gordic.Eko.Interface.GDanovaEvidenceEditSettingsDto} [opt.editSettings] nastavení editovatelnosti jednotlivých prvků formuláře.
      * @param {boolean} [opt.editMode] Má se formulář otevřít v editovatelném režimu?.
      * @param {boolean} [opt.vynulovatDatumyDPH] Mají se při zapnutém editMode při načtení vynulovat datumy?
      * @param {boolean} [opt.prvotniEvidenceDokladu] Jedná se o prvotní evidenci? Tj. je nutné doklad alespoň jednou uložit?
      * @param {Gordic.Gin.Globals.Enums.ModOtevreni} [ModOtevreni]
      * @returns {JQueryPromise<}
      */
    function GDanovaEvidenceForm(parentContent: GContent, opt: {
        ixp: string;
        radek: number;
        prava?: Eko.Interface.GEKHPrava;
        editSettings?: Gordic.Eko.Interface.GDanovaEvidenceEditSettingsDto;
        editMode?: boolean;
        vynulovatDatumyDPH?: boolean;
        prvotniEvidenceDokladu?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    /**
  * Seznam s formulářem pro Kontrolní hlášení
  *
  * @author Vlastimil Máca
  *
  * @param {GContent} parentContent
  * @param {object} opt Options pro otevření formuláře
  * @param {string} opt.ixp  Ixp dokladu
  * @param {number} opt.radek  řádek
  * @param {Gordic.Eko.Client.GEKHPrava} [opt.prava] prava Práva k editaci nebo pouze prohlížení
  * @param {Gordic.Eko.IGDanovaEvidenceEditSettings} [opt.editSettings] nastavení editovatelnosti jednotlivých prvků formuláře.
  * @param {boolean} [opt.editMode] Má se formulář otevřít v editovatelném režimu?.
  * @param {boolean} [opt.vynulovatDatumyDPH] Mají se při zapnutém editMode při načtení vynulovat datumy?
  * @param {boolean} [opt.prvotniEvidenceDokladu] Jedná se o prvotní evidenci? Tj. je nutné doklad alespoň jednou uložit?
  * @param {Gordic.Gin.Globals.Enums.ModOtevreni} [ModOtevreni]
  * @returns {JQueryPromise<}
  */
    function GDanovaEvidence(parentContent: GContent, opt: {
        ixp: string;
        radek: number;
        prava?: Eko.Interface.GEKHPrava;
        editSettings?: Gordic.Eko.Interface.GDanovaEvidenceEditSettingsDto;
        editMode?: boolean;
        vynulovatDatumyDPH?: boolean;
        prvotniEvidenceDokladu?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
    /**
     * Okno pro vazby dokladu
     *
     * @author Vlastimil Máca
     *
     * @param {GContent} parentContent
     * @param {object} opt Options pro otevření okna
     * @param {Eko.WebClient.GVazbyInputDto} opt.InputDto  InputDto pro otevření okna - zejména ixp.
      * @param {Gordic.Gin.Globals.Enums.ModOtevreni} [ModOtevreni]
     * @returns {JQueryPromise<}
     */
    function GVazby(parentContent: GContent, opt: {
        InputDto: Eko.WebClient.GVazbyInputDto;
        openDetail?: (ixp: string) => JQuery.Promise<boolean>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        ulozeno: boolean;
    } | undefined>;
}
declare namespace Gordic.Eko.WebClient {
    interface IGADPHistoryInput {
        TypAg: number;
        ID: string;
        Title: string;
    }
    class GAdpDisplayHistorie extends GContentBase implements IGContent, IGClientContent {
        TypAgendy: number;
        private inputParam;
        private readonly classID;
        prepareContent(par: IGADPHistoryInput): void;
        /**
         * Inicializace
         */
        private Init;
        onContentReady(): void;
        /**
         * createGridFormat
         *
         * @returns {Gordic.Data.GridFormat<GEkohkonDto>}
         */
        private createGridFormat;
    }
}
declare namespace Gordic.Eko.WebClient {
    class GDetailPredkontace extends GContentBase implements IGContent {
        /**
         * Ajax property
         *
         */
        EditaceZapisu: boolean;
        EditaceHlavicky: boolean;
        EnableSmlouva: boolean;
        ModeDetail: UctRoz.Enums.ModeDetail;
        SourceRecords: Gordic.Eko.Interface.GUctRozPrevZapisyDto[];
        Ixp: string;
        IxsFun: string;
        docValidators: any;
        PredkontaceDto: GPredkontaceDto;
        SelectedRecords: GVybraneZapisyDto[];
        ChangeEnable: boolean;
        TypAgendy: number;
        TypAgendySource: number;
        readonly classID = "js-uctPreGrid";
        readonly classIDZapisy = "js-uctZapisyGrid";
        /**
         * Obecne property
         *
         */
        myLoading: boolean;
        gridpredkontace: JQuery;
        refresh: boolean;
        onContentReady(): void;
        /**
         * Prevedeni vybranych zapisu
         * @returns
         */
        private refreshData;
        /**
         * Vytvoreni formulare
         */
        private createForm;
        /**
         * Vytvoreni gridu
         *
         *
         * @param that
         * @param tabRadky
         */
        private createGrid;
        /**
         * ZobrazeniHistorie
         *
         * @returns {JQueryPromise<any>}
         */
        private ZobrazeniHistorie;
        /**
         * Vytvoreni akci
         *
         */
        private createActions;
        /**
         * Zrusit editaci
         * @param content
         */
        private ZrusitEditaci;
        /**
         * Uzavirani okna
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}
declare namespace Gordic.Eko.WebClient {
    namespace DetailPredkontaceMethod {
        function AktualizaceDokladu(content: GDetailPredkontace, myGrid: any): void;
        function IsCanEdit(content: GDetailPredkontace): boolean;
        /**
         * function RefreshDetail
         *
         * @param {GDetailPredkontace} content
         * @param {boolean} editaceHlavicky
         */
        function RefreshDetail(content: GDetailPredkontace, editaceHlavicky: boolean): JQueryPromise<any>;
        /**
         * function ChangeValue
         *
         * @param {GDetailPredkontace} content
         * @param {boolean} zmenaNaHlavicce
         */
        function ChangeValue(content: GDetailPredkontace, zmenaNaHlavicce: boolean): void;
        /**
         * Atribut, zda dana predkontace je vlastni
         * @param content
         * @param ixs_fun - funkce, ktera vlastni predkontaci
         */
        function IsPrivate(content: GDetailPredkontace, ixs_fun: string | null | undefined): boolean;
        /**
         * Novy radek
         * @param content
         */
        function NovyRadek(content: GDetailPredkontace): void;
        /**
         * Prevod na verejnou predkontaci
         * @param content
         */
        function Zverejnit(content: GDetailPredkontace, first?: boolean, idVarianty?: string | undefined | null): JQueryPromise<any>;
        /**
         * Nastaveni vlastniho NS
         * @param content
         * @returns
         */
        function NastaveniVlastniNS(content: GDetailPredkontace): JQueryPromise<any>;
        /**
         * ulozeni
         *
         * @param {GDetailPredkontace} content
         * @param {any} kopie
         * @param {any} dtoSaveDataHead
         * @param {any} dtoSaveDateRow
         * @returns {: JQueryPromise < any >}
         */
        function Ulozeni(content: GDetailPredkontace, kopie?: boolean, dtoSaveDataHead?: Gordic.Eko.Interface.GUctRozskonDto | null, dtoSaveDateRow?: any, reload?: boolean): JQueryPromise<any>;
        /**
         * Prevzeti cestek z radku dokladu
         * @param content
         * @returns
         */
        function PrevzitCastky(content: GDetailPredkontace): JQueryPromise<any>;
        /**
         * Vymazat radek
         * @param content
         */
        function VymazatRadek(content: GDetailPredkontace): void;
        /**
         * function DeleteRow
         *
         * @param {any} dataRows
         * @param {Number} radek_z
         * @param {boolean} nePrecislovat
         * @returns {any}
         */
        function DeleteRow(dataRows: Gordic.Eko.Interface.GUctRozdkonDto[], radek: Number | null, nePrecislovat?: boolean): Gordic.Eko.Interface.GUctRozdkonDto[];
        /**
         * Precislovani radku
         * @param dataRows
         */
        function ReCount(dataRows: any): any;
        /**
         * Vytvoreni gridfomatu
         * @param content
         */
        function GetPorizovacGridFormat(content: GDetailPredkontace): any;
        /**
         * Gridformat pro ucetni zapisy
         *
         * @param {GDetailPredkontace} content
         * @returns {any}
         */
        function GetGridFormatZapisy(content: GDetailPredkontace): any;
        /**
         * vyberoveOkno
         *
         * @author Tomáš Kareš
         * @since 480.1.0.66
         */
        class vyberoveOkno extends GContentBase implements IGClientContent {
            that: this;
            typeItem: Gordic.Eko.WebClient.UctRoz.Enums.TypPolicka;
            prepareContent(params: any): void;
            /**
             * Item:
             *
             * @author Tomáš Kareš
             * @since 480.1.0.66
             */
            private getPredkontaceAction;
            /**
             * transformToModel
             *
             * @param {string} modelStr
             * @param {GPredkontaceCopyDto} index
             * @returns {GPredkontaceDefAkceDto}
             */
            private transformToModel;
            /**
             * Skryti selectoru
             *
             * @param {string} selector
             */
            private hideBySelector;
            /**
             * Zobrazeni selectoru
             *
             * @param {string} selector
             */
            private showBySelector;
        }
    }
}
declare namespace Gordic.Eko.WebClient.UctRoz.Enums {
    enum ModeDetail {
        Prohlizeni = 0,
        Oprava = 1,
        Novy = 2,
        Kopie = 3,
        PrevodZapisu = 4
    }
    enum TypPolicka {
        NS = 0,
        EKO = 1,
        Au = 2,
        Smlouva = 3,
        Popis = 4,
        Castka = 5
    }
}
declare namespace Gordic.Eko.WebClient {
    class GSeznamPredkontace<TRow = any> extends GContentBase<Gordic.Eko.Utils.IGEkoBookExtension> implements IGContent {
        SeznamSubtasku: Gordic.Eko.Interface.GPredkontaceAkceDto[];
        Filtr: Gordic.Eko.Interface.GEVyberPredkontaci;
        TypeForm: string;
        actionsSeznam: any;
        IxsFun: string;
        IsExistsCertifikat: boolean;
        TypAgendy: number;
        TypAgendySource: number;
        Tema: string;
        classGridName: string;
        classID: string;
        that: this;
        dialogResult: any | any[] | JQuery.Promise<any> | null | undefined;
        private aktiveSubTask;
        private static readonly nameLastSubtask;
        /**
          * data z uzivatelskeho nastaveni pro oblibene zaznamy
         */
        favoriteFromUserSettings?: string[];
        /**
         * filter procesor na oblibene polozky
         */
        favoriteProcessor?: Gordic.Data.SortProcessor<TRow>;
        /**
         * Akce pro výběr ze selektoru
         * @type {GAction}
         */
        choiceAction: GAction;
        /**
         * Pouzivani oblibenych polozek
         * @returns
         */
        hasFavorite(): boolean;
        /**
         * Klic pro oblibene polozky
         * @returns {string}
          */
        private getFavoriteCode;
        /**
         *  Nacteni vybraneho radku
         *  returns {string}
         * */
        getFormData(): string;
        onContentReady(): void;
        /**
         * createGrid
         */
        private createGrid;
        /**
         * Vraci vyber gridu, kdyz je multi, tak vraci pole, kdyz neni, tak vraci objekt
         */
        private getGridSelection;
        /**
         * Nastaveni/zruseni oblibeneho zaznamu
         * @param isFavorite
         */
        setFavorite(isFavorite: boolean): void;
        /**
         * Vytvoreni grid formatu
         *
         *
         * @param that
         * @param tabRadky
         */
        private createGridFormat;
        /**
         * Zobrazeni detailu
         */
        ZobrazitDetail(): void;
        /**
         * Vytvoreni akci
         */
        private CreateAcitons;
        /**
         * Metoda na vrácení výsledku a zavření dialogu
         * @param {TRow} [data]
         */
        private returnResult;
        /**
          * Uzivatelske nastaveni
          * @returns
          */
        getUserSestings(): Gordic.Data.IGStorage | null | undefined;
        /**
         * Ulozeni posledniho subtasku
         */
        private saveLastSubtask;
        /**
         * Nacteni posledniho subtasku
         *
         *
         */
        private getLastSubtask;
        /**
         * Ulozeni oblibenych polozek
         */
        private saveFavoriteSettings;
        private closing;
    }
}
declare namespace Gordic.Eko.WebClient.GSeznamPredkontaceMethod {
    const favIcon = "fa-star g-state-text g-state-favorite";
    const nonFavIcon = "fa-star-o";
    const favoriteButton: MenuParams[];
    const toogleFavorite: <TRow>(this: Gordic.Eko.WebClient.GSeznamPredkontace, isFavorite: boolean) => void;
    /**
     * Nastaveni pristupnosti prvku
     * @param {GSeznamPredkontace} content
     */
    function NastaveniPristupnosti(content: GSeznamPredkontace): void;
    /**
     * export function reload
     *
     *  Znovunacteni seznamu predkontaci
     *
     * @param {GSeznamPredkontace} content
     * @returns {JQueryPromise<any>}
     */
    function Reload(content: GSeznamPredkontace): JQueryPromise<any>;
    /**
     * Odstraneni vybrane predkontace
     * @param {GSeznamPredkontace} content
     * @param {any} def
     * @param idMessage
     * @param vybraneRadky
     * @returns
     */
    function Delete(content: GSeznamPredkontace, radky: Gordic.Eko.Interface.GSeznamPredkontaciDto[]): JQueryPromise<any>;
    /**
     * Zobrazeni okna dle aktualniho radku
     * @param {GContent} content
     * @param {any} radek
     * @param modeDetail
     */
    function ZobrazDetail(content: GSeznamPredkontace, radek: Gordic.Eko.Interface.GSeznamPredkontaciDto | null, modeDetail: Gordic.Eko.WebClient.UctRoz.Enums.ModeDetail): void;
    /**
     * Vraceni obsahu seznamu
     * @returns
     */
    function GetContentSeznam(): GSeznamPredkontace;
    /**
     * Aktualizace zaslanych predkontaci z DB do gridu
     */
    function refreshRowsFromDB(content: GSeznamPredkontace | null, iDs: string[]): JQueryPromise<any>;
}
declare namespace Gordic.Eko.WebClient {
    class GVyberPredkontace extends GContentBase implements IGClientContent {
        /** kontent seznamu predkontaci */
        form: JQuery;
        /** Vysledek vyberu - identifikator prdekontace */
        private result;
        prepareContent(): void;
        /**
         * Vyber hodnoty
         * */
        VyberHodnoty(): void;
        /**
         * Nacteni aktualni hodnoty identifikatoru predkontace
         *
         * @returns identifikator predkontace
         */
        private getFormIdKontace;
        /**
         * Zjisteni contentu seznamu
         *
         * @returns  kontent seznamu
         * */
        private getContent;
        /**
         *  Nacteni contentu seznamu
         *
         * */
        private loadSeznamContent;
        /**
         * Zavirani contentu
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}
declare namespace Gordic.Eko.WebClient {
    class GVyberVariantyPredkontace extends GContentBase implements IGContent {
        private gridVarianty;
        TypAgendy: number;
        onContentReady(): void;
        /**
         *
         * Vybrani aktualniho radku
         */
        private VyberVarianty;
    }
}
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GAkceKompetenti.js                                                        </Name>
//    <Description> GAkceKompetenti                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
declare namespace Gordic.Eko.WebClient {
    class GAkceKompetenti extends GContentBase {
        title: string;
        taskId: string;
        private modelkompetenti;
        private datakompetenti;
        private mainTable;
        private vybraneRadky;
        private view_ISL;
        private filter_akce;
        private filtr;
        private Komp_DataView;
        private KompData;
        private jsem_kompetent;
        onContentReady(): void;
    }
}
/**
 * Akce na zapnutí/vypnutí expertního režimu v EKO modulech
 *
 * @author Petr Vošta
 * @since 525.3
 */
declare namespace Gordic.Eko.Action {
    /**
     * Definice parametrů pro akci zapnutí/vypnutí expertního režimu
     *
     * @param {GContent} content content, na kterém bude tlačítko Expertní režim (většinou this)
     * @param {number} levelExp úroveň expertního režimu
    * * @param {Function} onCloseExpertMode funkce, která se zavolá po vypnutí expertního režimu
     * @param {GActionParamsDefObjBase} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce expertního režimu
     */
    function actionExpertMode(content: GContent, levelExp: number, onSetExpertMode: Function, onCloseExpertMode: Function, params?: GActionParamsDefObjBase): GAction;
}
declare namespace Gordic.Eko.WebClient {
    class GSeznamRozpisAkci extends GContentBase<Gordic.Eko.Utils.IGEkoBookExtension> {
        title: string;
        taskId: string;
        private view_ISL;
        private view_ISL_rozpis;
        private view_data;
        private gridFormatSeznam;
        private gf_rozpis;
        private filterForm;
        private filterFormDef;
        private mainTable;
        private mainTable2;
        private sirkaCastky;
        private comparisonCnt;
        private menubarparametry;
        private comparator;
        private previewController;
        private rightSbTextyDiv;
        private rightSbCnt;
        private rightSbHeaderNumber;
        private rightSb;
        private isSideBarInited;
        private isComparisonInited;
        private $grid;
        private ixsRoz;
        private ixsSax;
        private ixp_den;
        private ixs_csp;
        private previewPanelsDefinition;
        private filterFormMaska;
        private srv;
        private cislo_nula;
        private rightSbKpiCerpani;
        private rightSbKpiRezervace;
        protected filter_akce: Gordic.Eko.Interface.GEkoAgDokladyFilterDto;
        private currentfilter?;
        private globals;
        private comparisonBadge;
        private my_CondFormat;
        private my_CondFormats;
        private my_CondFormats_Black;
        private my_ixs_fun_akt;
        onContentReady(): void;
        load_seznam(filterModel: any): void;
        generateReport(rep: any): void;
        kresli_formular(data_akce: any): JQuery<HTMLElement>;
        zjisti_sloupce(gf: any, vlastnosti: any): string;
        zjisti_sloupce_search(gf: any): any;
        showComparison(rows: any): void;
        addToComparison(rows: any): void;
        funkceGfPrefab(scope: string, scopeTitle: string): Gordic.Data.GridFormat;
        zobraz_kompetenty(): void;
        zobraz_kompetenty_modal(): JQuery.PromiseBase<Event, never, never, never, never, never, never, never, never, never, never, never> | undefined;
    }
}
/**
 * Sdílené metody pro práci s akcemi v EKO modulech
 *
 * @author Martin Boček
 * @since 484.1.0.93
 */
declare namespace Gordic.Eko.Action {
    /**
     * Definice parametrů pro akci Podání
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce podání
     */
    function actionPodat(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Podání dle vzoru
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce podání dle vzoru
     */
    function actionPodatDleVzoru(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Nový
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce nový záznam
     */
    function actionNovy(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Detail
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce detail
     */
    function actionDetail(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Detail do záložky
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce primární agenda
     */
    function actionDetailDoZalozky(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Historie
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce historie
     */
    function actionHistorie(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Primární agenda
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce primární agenda
     */
    function actionPrimarniAgenda(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Uložení (dříve Evidence)
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce uložení
     */
    function actionUlozit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Evidence (aktuálně je stejné s akcí Uložení)
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce evidence
     */
    function actionEvidovat(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Opravit
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce opravy
     */
    function actionOpravit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Upravit
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce úpravy
     */
    function actionUpravit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Odstranit
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce odstranění
     */
    function actionOdstranit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Stornovat
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce storna
     */
    function actionStornovat(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Zrušit storna
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce zrušení storna
     */
    function actionZrusitStorno(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Schválit
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce schválení
     */
    function actionSchvalit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Zrušit schválení
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce zrušení schválení
     */
    function actionZrusitSchvaleni(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Uzavřít
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce uzavření
     */
    function actionUzavrit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Zrušit uzavření
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce zrušení uzavření
     */
    function actionZrusitUzavreni(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Zaúčtovat
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce zaúčtování
     */
    function actionZauctovat(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Zaúčtovat odloženě
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce odloženého zaúčtování
     */
    function actionZauctovatOdlozene(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Zarezervovat
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce zarezervování
     */
    function actionZarezervovat(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Zlikvidovat
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce likvidace
     */
    function actionZlikvidovat(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Uhradit
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce úhrady
     */
    function actionUhradit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Zkontrolovat
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce kontroly
     */
    function actionZkontrolovat(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Převést
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce převodu
     */
    function actionPrevest(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Kontrolní hlášení
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce kontrolní hlášení
     */
    function actionKontrolniHlaseni(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Finanční kontrola
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce finanční kontrola
     */
    function actionFinancniKontrola(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Účetní kontrola
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce účetní kontrola
     */
    function actionUcetniKontrola(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Účetní zápisy
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce účetní zápisy
     */
    function actionUcetniZapisy(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Přidat do porovnání
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce přidání do porovnání
     */
    function actionPridatDoPorovnani(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Občerstvit
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce občerstvení
     */
    function actionObcerstvit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Ok (např. v potvrzovacím dialogu)
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce potvrzení
     */
    function actionOk(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Zrušit (např. v průvodci nebo potvrzovacím dialogu)
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce zrušení
     */
    function actionZrusit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Zrušit změny (např. v probíhající editaci)
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce zrušení změn
     */
    function actionZrusitZmeny(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Zavřít (např. vpravo dole na detailu)
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce zavření
     */
    function actionZavrit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Diagnostika
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce diagnostiky
     */
    function actionDiagnostika(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Přeevidovat
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce přeevidenci
     */
    function actionPreevidovat(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Předat
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce předání
     */
    function actionPredat(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Přidělit
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce přidělení
     */
    function actionPridelit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Převzít
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce převzení
     */
    function actionPrevzit(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Kontrola metadat
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce kontroly metadat
     */
    function actionKontrolaMetadat(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Vrátit do WFL
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce vrácení do WFL
     */
    function actionVratitDoWfl(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Označit jako přečtené
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce označení záznamu jako přečtený
     */
    function actionOznacitJakoPrectene(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Označit jako nepřečtené
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce označení záznamu jako nepřečtený
     */
    function actionOznacitJakoNeprectene(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Definice parametrů pro akci Texty pro tisk
     *
     * @param {GActionParamsDefObj} params další parametry akce
     * @returns {GActionParamsDefObj} výsledné parametry akce Texty pro tisky
     */
    function actionNastaveniTextuTisku(params: GActionParamsDefObj): GActionParamsDefObj;
    /**
     * Vytvoření akce Tisk
     *
     * @param {IGPrintActionParams<T>} params další parametry akce
     * @returns {GPrintActionType<T>} výsledná akce tisku
     */
    function actionTisk<T>(params: IGPrintActionParams<T>): GPrintActionType<T>;
}
declare namespace Gordic.Eko.CfuUtils {
    interface IGCfuFilterOptions {
        /** Rozpocet */
        isRoz?: boolean;
        /** Ucetnictvi */
        isUct?: boolean;
        /** IxsRoz */
        ixsRoz?: string;
        /** CheckUete*/
        checkUete?: number | null;
        /** Zastupny znak */
        wildcard?: string;
        /** Delegat pro pripadnou upravu options cfuIntervalu pred jeho vytvorenim */
        getIntervalOptions?: (cfuDto: Gordic.Gui.WebApp.GGridColumnDto, defaults: Gordic.Eko.Filters.CfuIntervalOptions) => Gordic.Eko.Filters.CfuIntervalOptions;
    }
    type GCfuTargetProperty = "serverFilter" | "editor";
    /**
    * Nacte cfulist
    * @param cnt {GContent|Gordic.Data.GridFormat} content nebo gridformat
    * @param prefix {string|undefined} prefix ke jmenu
    * @param postfix {string|undefined} postfix ke jmenu
    */
    function getDataWordsColumnList(cnt: GContent | Gordic.Data.GridFormat<any>, prefix?: string, postfix?: string): string[];
    /**
     * Nacte cfu set (z gcontentu nebo primo z argumentu) a jednotlivym sloupcum vytvori propertu 'serverFilter' pro CFU.
     * @param cnt {GContent|Gordic.Data.GridFormat}
     * @param opts {IGCfuFilterOptions} Objekt s property: isRoz (boolean) - rozpocet, isUct (boolean) - ucetnictvi.
     */
    function getCfuSetServerFilters(cnt: GContent | Gordic.Data.GridFormat<any>, opts?: IGCfuFilterOptions): Gordic.Data.GridFormat<any>;
    /**
     * Nacte cfu set (z gcontentu nebo primo z argument) a jednotlivym sloupcum vytvori property 'editor' pro CFU.
     * @param cnt {GContent|Gordic.Data.GridFormat}
     * @param opts {IGCfuFilterOptions} Objekt s property: isRoz (boolean) - rozpocet, isUct (boolean) - ucetnictvi.
     */
    function getCfuSetEditors(cnt: GContent | Gordic.Data.GridFormat<any>, opts?: IGCfuFilterOptions): Gordic.Data.GridFormat<any>;
    /**
     * Prida vlastni cfu set do grid formatu + na kazdy sloupec prida propertu 'serverFilter' (nebo editor) pro CFU
     * @param gfDto DTO s grid formatem ze serveru (obs. veci k CFU)
     * @param gf GridFormat v JS
     * @param propertyName Nazev property, na kterou se prefab vlozi. Hodnota 'serverFilter' ji prida do zahlavi gridu (pro ggridservereditor), 'editor' ji prida do viewPortu gridu (pro ggridcelleditor).
     * @param options {IGCfuFilterOptions} Objekt s property: isRoz (boolean) - rozpocet, isUct (boolean) - ucetnictvi.
     */
    function setCustomCfuSetToGridFormat<T>(gfDto: Gordic.Gui.WebApp.GGridFormatDto, gf: Gordic.Data.GridFormat<T>, propertyName?: GCfuTargetProperty, options?: IGCfuFilterOptions): Gordic.Data.GridFormat<T>;
}
declare namespace Gordic.Eko.CfuUtils {
    /**
     * GElementParser
     *
     * @author bmartinek
     * @since 52530.33
     */
    class GElementParser {
        keywords: ParserKeywordOptions[];
        protected tokenizer: GElementTokenizer | null;
        constructor(keywords: ParserKeywordOptions[]);
        get name(): string;
        protected createTokenizer(expr: string): GElementTokenizer;
        protected prepareKeywords(): string[];
        protected resolveReadSequence(keyword: ParserKeywordOptions): ReadSequencedValue;
        static seqReadString(this: ParserKeywordOptions, seq: AstNode[]): string | undefined;
        static seqReadNumber(this: ParserKeywordOptions, seq: AstNode[]): number | undefined;
        static seqReadStringInterval(this: ParserKeywordOptions, seq: AstNode[]): GIntervalDto<string> | undefined;
        static seqReadNumberInterval(this: ParserKeywordOptions, seq: AstNode[]): GIntervalDto<number> | undefined;
        private static seqReadCfuInterval;
        private static seqReadInterval;
        private static paddZeroesOrTrim;
        protected static containsMaskValue(str: string): boolean;
        protected static startsWithMaskValue(str: string): boolean;
        parse1(expr: string): Gordic.Eko.Interface.GCfuTopoFilterDto[];
        parse(expr: string): Gordic.Eko.Interface.GCfuTopoFilterDto[];
        protected readElement(): Gordic.Eko.Interface.GCfuTopoFilterDto | null;
        protected unexpected(msg?: string): void;
        protected readExpression(): AstNode[] | null;
        protected setModelValue(model: string, o: object, value: any): void;
        protected paddNumberValue(num: number, length: number): string;
    }
    /**
     * GElementInputStream
     *
     * @author bmartinek
     * @since
     */
    class GElementInputStream {
        input: string;
        protected pos: number;
        protected line: number;
        protected col: number;
        constructor(input: string);
        /** Vrati aktualni znak a posune se o jeden */
        next(): string;
        /** Vrati znak, ale dal se neposouva */
        peek(offset?: number): string;
        /** Vrati true, pokud je vstupni retezec prazdny */
        eof(): boolean;
        /** Vyhodi vyjimku na danem kurzoru */
        croak(msg: string): void;
    }
    /**
     * GElementTokenizer
     *
     * @author bmartinek
     * @since
     */
    class GElementTokenizer {
        keywords: string;
        input: GElementInputStream;
        private current;
        constructor(inputStream: GElementInputStream, keywords: string[]);
        peek(): AstNodeOrNull;
        next(): AstNodeOrNull;
        eof(): boolean;
        croak(msg: string): void;
        protected isKeyword(str: string): boolean;
        protected isDigit(ch: string): boolean;
        protected isNumber(ch: string, nextCh?: string): boolean;
        protected isIdStart(ch: string): boolean;
        protected isId(ch: string): boolean;
        protected isOpChar(ch: string): boolean;
        protected isPunc(ch: string): boolean;
        protected isWhitespace(ch: string): boolean;
        protected readWhile(predicate: AstPredicate): string;
        protected readNumber(): NumAstNode;
        protected readIdent(): IdentAstNode;
        protected readPunc(): PuncAstNode;
        protected readOp(): OpAstNode;
        protected readEscaped(end: string): string;
        protected readString(esc: string): StrAstNode;
        protected skipComment(): void;
        protected readNext(): AstNodeOrNull;
    }
    class GElementParserUete1 extends GElementParser {
        constructor(keywords: ParserKeywordOptions[]);
        get name(): string;
        protected resolveReadSequence(keyword: ParserKeywordOptions): ReadSequencedValue;
        private static seqReadCfuIntervalUete1;
    }
    class GElementParserUete2 extends GElementParser {
        constructor(keywords: ParserKeywordOptions[]);
        get name(): string;
        protected createTokenizer(expr: string): GElementTokenizer;
        protected resolveReadSequence(keyword: ParserKeywordOptions): ReadSequencedValue;
        private static seqReadCfuIntervalUete2;
        private static containsMaskValueUete2;
        protected static startsWithMaskValueUete2(str: string): boolean;
    }
    class GElementTokenizerUete2 extends GElementTokenizer {
        constructor(inputStream: GElementInputStream, keywords: string[]);
        protected isOpChar(ch: string): boolean;
        protected isIdStart(ch: string): boolean;
        protected isId(ch: string): boolean;
    }
    type AstNodeType = "num" | "str" | "bool" | "var" | "kw" | "assign" | "op" | "punc" | "skipval" | "binary" | "prog" | "let" | "lambda" | "call" | "if";
    type AstPredicate = (s: string, index: number) => boolean;
    type AstNodeOrNull = AstNode | null;
    type ElementParserValueTypes = "str" | "num" | "strInterval" | "numInterval" | "cfuInterval";
    interface AstNode {
        type: AstNodeType;
    }
    interface ValueAstNode extends AstNode {
        type: "num" | "str" | "skipval";
        value: number | string;
    }
    interface NumAstNode extends ValueAstNode {
        type: "num";
        value: number;
    }
    interface StrAstNode extends ValueAstNode {
        type: "str";
        value: string;
    }
    interface IdentAstNode extends AstNode {
        type: "kw" | "var";
        value: string;
    }
    interface PuncAstNode extends AstNode {
        type: "punc";
        value: string;
    }
    interface OpAstNode extends AstNode {
        type: "op";
        value: string;
    }
    interface SequenceReaderOptions {
        keyword: string;
        model: string;
    }
    interface StringSequenceReaderOptions extends SequenceReaderOptions {
        fixedLength?: number;
    }
    type ReadSequencedValue = (this: ParserKeywordOptions, seq: AstNode[]) => any;
    interface ParserKeywordOptions {
        keyword: string;
        keywordLowerCase: boolean;
        model: string;
        type: ElementParserValueTypes;
        charLen?: number;
        stringToUpper?: boolean;
        readSequence?: ReadSequencedValue;
    }
    interface AstExpression {
        keyword: IdentAstNode;
        operator: OpAstNode;
        values: ValueAstNode[];
    }
}
declare namespace Gordic.Eko.Prefabs {
    interface IGCfuOptions {
        isUct: boolean;
        isRoz: boolean;
        checkUete?: number | null;
        wildcard?: string;
        ixsRoz?: string;
        cfu: Gordic.Gui.WebApp.GGridColumnDto;
    }
    /** Zakladni cfu policko */
    function cfu(options: IGCfuOptions): GSelectBoxOptions<string>;
    /** Rozsirene cfu policko o automaticke doplneni nul a hlidani povolenych znaku */
    function cfuEnhanced(options: IGCfuOptions): GSelectBoxOptions<string>;
    function cfuChange(ev: JQueryEventObject, options: IGCfuOptions, o: any): void;
    function setState(field: any, value: any, cfu: any): void;
    interface IGParamsData<T extends IGCfuDto> {
        filters: Array<T>;
    }
    interface IGParams<T extends IGCfuDto> {
        data?: any;
        activeElement?: Gordic.Eko.Interface.GCfuFilterDto;
        beforeDS?: Gordic.Data.GridFormat<T>;
        afterDS?: Gordic.Data.GridFormat<T>;
        gridFormat?: Gordic.Data.GridFormat<T>;
        canAddNewRecords?: boolean;
        canRemoveRecords?: boolean;
        /** CSS trida pro grid (POZOR! Pouze pro ucely ukazky kvuli rozhodnuti variant zobr. elementu, v budoucnu bude odstraneno) */
        gridCustomClass?: string;
        /** Vyska radku v gridu (POZOR! Pouze pro ucely ukazky kvuli rozhodnuti variant zobr. elementu, v budoucnu bude odstraneno) */
        gridRowHeight?: number;
        /** Celkova vyska gridu, vypne gautofit! */
        gridHeight?: number;
        /** Default = false */
        fitGridWidth?: boolean;
        /** Default = true */
        gridResizable?: boolean;
        /** Zobrazi horni panel gridu */
        showTopPanel?: boolean;
        /** Zobrazi spodni panel gridu */
        showBottomPanel?: boolean;
        /** Model, pokud je pozadovano provadet collect pres dummy field */
        model?: string;
        /** Vola se pred pridanim noveho elementu. Vrati-li data, jsou pridany, vrati-li null, neprida se nic, vrati-li undefined, provede se default */
        createNewRecord?: CreateElementRecord<T>;
        /** Vycisteni vybranych vlastnosti na datove referenci */
        clearRecord?: ClearElementRecord<T>;
        /** Ma byt mozna editace v gridu? (default = true) */
        editable?: boolean;
    }
    type CreateElementRecord<T> = (view: Gordic.Data.View<T>, gridFormat: Readonly<Gordic.Data.GridFormat<T>>) => T | null | undefined;
    type ClearElementRecord<T> = (data: T) => void;
    class GEkoCfuGridSelector<T extends IGCfuDto> extends GContentBase implements IGParams<T> {
        private grid;
        private selField;
        private options;
        private cfu;
        private clearAct;
        data?: any;
        beforeDS?: Gordic.Data.GridFormat<T>;
        afterDS?: Gordic.Data.GridFormat<T>;
        gridFormat?: Gordic.Data.GridFormat<T>;
        canAddNewRecords?: boolean;
        canRemoveRecords?: boolean;
        /** CSS trida pro grid (POZOR! Pouze pro ucely ukazky kvuli rozhodnuti variant zobr. elementu, v budoucnu bude odstraneno) */
        gridCustomClass?: string;
        /** Vyska radku v gridu (POZOR! Pouze pro ucely ukazky kvuli rozhodnuti variant zobr. elementu, v budoucnu bude odstraneno) */
        gridRowHeight?: number;
        fitGridWidth?: boolean;
        /** Default = true */
        gridResizable?: boolean;
        /** Zobrazi horni panel gridu */
        showTopPanel?: boolean;
        /** Zobrazi spodni panel gridu */
        showBottomPanel?: boolean;
        /** Celkova vyska gridu, vypne gautofit! */
        gridHeight?: number;
        /** Model, pokud je pozadovano provadet collect pres dummy field */
        model?: string;
        prepareContent(options: IGParams<T>): void;
        private _createEditor;
        getData(): JQueryPromise<T[]>;
        setData(data: T[]): JQuery;
        private addNewElement;
        closing(): JQueryPromise<IGParamsData<T>>;
        private returnResult;
        isEditable(): boolean;
        setEditable(v: boolean): void;
    }
    type GCfuInterval = GIntervalDto<string | null>;
    interface IGCfuDto {
        /** cfu */
        cfu: {
            /** */
            uea?: GCfuInterval;
            ueb?: GCfuInterval;
            uec?: GCfuInterval;
            ued?: GCfuInterval;
            uee?: GCfuInterval;
            uef?: GCfuInterval;
            ueg?: GCfuInterval;
            ueh?: GCfuInterval;
            uei?: GCfuInterval;
            uej?: GCfuInterval;
            te0?: GCfuInterval;
            te1?: GCfuInterval;
            te2?: GCfuInterval;
            te3?: GCfuInterval;
            te4?: GCfuInterval;
            uek?: GCfuInterval;
            uel?: GCfuInterval;
            uem?: GCfuInterval;
            uen?: GCfuInterval;
            te5?: GCfuInterval;
            te6?: GCfuInterval;
            te7?: GCfuInterval;
            te8?: GCfuInterval;
            te9?: GCfuInterval;
        };
    }
}
declare namespace Gordic.Eko.Prefabs {
    interface IGCfuElementsOptions extends GSelectBoxOptions<string> {
        gridFormat: Gordic.Data.GridFormat;
        /** ID pro moznost pouziti uzivatelskeho nastaveni na selectoru */
        id?: string;
        title?: string;
        inlineDialogOptions?: IGInlineDialogOptions;
        formatElementValueOptions?: IGCfuElementsFormatValueOptions;
        formatElementValue?: (gf: Gordic.Data.GridFormat<Gordic.Eko.Interface.GCfuFilterDto>, d: Gordic.Eko.Interface.GCfuFilterDto[], o: IGCfuElementsFormatValueOptions) => JQuery;
        checkUete?: number | null;
        canAddNewRecords?: boolean;
        canRemoveRecords?: boolean;
        /** Vola se pred pridanim noveho elementu. Vrati-li data, jsou pridany, vrati-li null, neprida se nic, vrati-li undefined, provede se default */
        createNewRecord?: CreateElementRecord<IGCfuDto>;
        /** Vycisteni vybranych vlastnosti na datove referenci */
        clearRecord?: ClearElementRecord<IGCfuDto>;
    }
    interface IGCfuElementsFormatValueOptions {
        /** Preskoci nazvy sloupcu (column.name), ktere nemaji byt v zastupne hodnote zobrazeny */
        skip?: string[];
        /** Nazev sloupce obsahujici nazev elementu */
        nameColumn?: string;
    }
    function cfuElements(options: IGCfuElementsOptions): GSelectBoxOptions<string>;
    function cellTemplate(columnName: string, dto: any, options?: {
        wildcard?: string;
        align: "left" | "center" | "right";
        formatter?: (v: any) => string;
    }): string;
    function decimalIntervalCellTemplate(columnName: string, dto: any): string;
    function dateIntervalCellTemplate(columnName: string, dto: any): string;
    function dateTimeIntervalCellTemplate(columnName: string, dto: any): string;
    function tooltipTemplate(columnName: string, dto: any, withOperator: boolean): string;
    function formatElementValue(gf: Gordic.Data.GridFormat<Gordic.Eko.Interface.GCfuFilterDto>, item: Gordic.Eko.Interface.GCfuFilterDto, options: Required<IGCfuElementsFormatValueOptions>): JQuery;
}
declare namespace Gordic.Eko.WebClient {
    interface Dimension {
        nazev: string | null | undefined;
        zkratka?: string | null | undefined;
        delka?: number | null | undefined;
        checked?: boolean | null | undefined;
    }
    interface Measure {
        nazev: string;
        zkratka?: string | null | undefined;
    }
    class GColumnSelector extends GContentBase {
        private $columnSelector;
        private $columnSelectorForm;
        private $tabSelector;
        private $tab;
        private dataSentence;
        selectedDimensionsMaxCount: number;
        selectedMeasuresMaxCount: number;
        additionalDimensions: Dimension[];
        additionalMeasures: Measure[];
        onContentReady(): void;
        CreatePicture(): void;
        writeRow(words: Dimension[], measures: Measure[], poradi: number): string;
        GetResult(): {
            dimensions: Dimension[];
            measures: Measure[];
        };
        SetData(usedDimensions: Dimension[], usedMeasures: Measure[]): void;
    }
}
declare namespace Gordic.Eko.Components {
    /**
    * Dto pro vyjádření jednoho řádku v komponentě
    * @author PNovak
    * @date 2018-03-09
    */
    interface calcDto extends Gordic.Gin.WebClient.IGRecapPricesDto {
        /** Typ daně*/
        dan_typ: number;
        /** Daň v procentech*/
        dan_proc?: JsonDecimal | null;
        /** Vlastni trida*/
        custClass?: string;
        /** Typ daně - text*/
        dan_typ_upl?: string;
    }
    enum ETaxEnum {
        ZbyvaRozepsat = "-4",
        ZbyvaRozepsatNum = -4,
        DokladCelkem = "-3",
        DokladCelkemNum = -3,
        Zaokrouhleno = "-2",
        ZaokrouhlenoNum = -2,
        Osvobozeno = "-1",
        OsvobozenoNum = -1,
        BezDane = "0",
        BezDaneNum = 0,
        Zakladni = "10",
        ZakladniNum = 10,
        PrvniSnizena = "20",
        PrvniSnizenaNum = 20,
        DruhaSnizena = "30",
        DruhaSnizenaNum = 30
    }
    interface calcOptions {
        /** Výchozí hodnoty*/
        defaultValues?: ObjectLiteralNumber<Gordic.Gin.WebClient.IGRecapPricesDto>;
        /** Částka*/
        price: JsonDecimal;
        /** Období*/
        taxPeriod?: Date;
        /** prvek, na který bude navázán dialog*/
        related: JQuery;
        /** Typ rozepsani
         * baseValue => Základ daně
         * total => Celkem
         */
        splittingType?: "baseValue" | "total";
    }
    class CalculatorDPH extends GContentBase implements IGClientContent {
        /** Datový zdroj řádků */
        dataSource?: (filter?: any, fastFilter?: any) => JQueryPromise<Gordic.Data.Readers.EkocdapDto[]>;
        /** Odkaz na grid*/
        private grid?;
        taxPeriod?: Date;
        price: JsonDecimal;
        defaultValues?: ObjectLiteralNumber<Gordic.Gin.WebClient.IGRecapPricesDto>;
        private priceToSplit;
        splittingType: "baseValue" | "total";
        private filterFunction;
        prepareContent(params: any): void;
        /**
         * Přepočet daně
         * @param {boolean} recalculateTax Příznak, zda ještě přepočítat dph shora
         * @param {boolean} refreshAll Příznak, zda občerstvit celý grid
         */
        recalculate(refreshAll?: boolean): void;
        /**
             * Nacte hodnoty z gridu
             * @param {string} taxPeriod nastavene datum sazby format RRRRMM
             * @param {boolean} recalculateTax  priznak, zdali se maji prepocitavat sazby
             */
        private refreshGridByPeriod;
        static show(options: calcOptions): JQueryPromise<any>;
    }
}
/**
 * Gordic.Eko.Components
 *
 * @author pnovak
 */
declare namespace Gordic.Eko.Components {
    function getSymbolForm(typeOfSymbol: "ss" | "ks"): Forms.Form;
    function getSymbolOptions<T = Gordic.Data.Readers.EkoscssDto | Gordic.Data.Readers.EkoskosDto>(symbolType: "ks" | "ss", prefabOptions?: any): GSelectBoxOptions<T>;
    function sslstyp(prefabOptions?: any): GSelectBoxOptions<Gordic.Data.Readers.SslstypDto>;
    function ekoscss(prefabOptions?: any): GSelectBoxOptions<Gordic.Data.Readers.EkoscssDto>;
    function ekoskos(prefabOptions?: any): GSelectBoxOptions<Gordic.Data.Readers.EkoskosDto>;
    function ekosuci(logovani: Gin.Globals.Dialogs.IGLogovani, prefabOptions?: any): GSelectBoxOptions<Gordic.ControlsLogic.Interface.GEkosuciDto>;
}
declare namespace Gordic.Eko.Components {
    interface CheckDocsResult {
        /** příznak, zda lze vrátit dokument do WFL */
        canReturn: boolean;
        /** duvod */
        reason: string;
        /** pid dokumentu */
        pid: string;
    }
    interface DocForRegOptions {
        related: HTMLElement | JQuery;
        openingMode?: Global.Enums.ModOtevreni;
        typAg?: number;
        evidence: (eventData: Object, obj: any) => JQueryPromise<void>;
        checkDocs: (eventData: Object, obj: any) => JQueryPromise<CheckDocsResult[]>;
        ixsSu: string;
        ixsFun: string;
        hideNodeChoice?: boolean;
        znackaText?: string;
        forceState?: DocsForRegState;
        enabledExternSys?: boolean;
    }
    /**
     * Vytvoří provider pro seznam dokumentu k evidenci
     *
     * @param {GContent} gcontent content
     * @param {number} [maxRows] maximální počet zobrazených záznamů (default je 5)
     * @returns {Gordic.Dashboard.CustomProvider} provider se seznamem
     */
    function createDocsForRegProvider(options: {
        gcontent: GContent;
        openingMode?: Global.Enums.ModOtevreni;
        znackaText?: string;
        typAg?: number;
        ixsFun?: string;
        ixsSu?: string;
        hideNodeChoice?: boolean;
        evidence: (eventData: Object, obj: any) => JQueryPromise<void>;
        checkDocs: (eventData: Object, obj: any) => JQueryPromise<CheckDocsResult[]>;
        dashboardObservables: GObservableObject<any>[];
    }): Gordic.Dashboard.CustomProvider;
    interface DocsForRegState {
        subtask: number;
        startFilter?: number;
        kategorieTypuDokumentuDleTypuAgendyPrev?: boolean;
        kategorieTypuDokumentuDleTypuAgendyEv?: boolean;
        datumPodaniOdEv?: JsonDate;
        datumPodaniDoEv?: JsonDate;
        datumZmenyOdEv?: JsonDate;
        datumZmenyDoEv?: JsonDate;
        datumPodaniOdPred?: JsonDate;
        datumPodaniDoPred?: JsonDate;
        datumZmenyOdPred?: JsonDate;
        datumZmenyDoPred?: JsonDate;
    }
    class DocsForRegContent extends GContentBase implements IGClientContent {
        private prevzitFunction;
        private grid?;
        private filterpanel?;
        private PreviewControllers?;
        private columns;
        private gf;
        private IslView;
        private defaultProfile;
        private typAgFilter?;
        private savedState;
        prepareContent(params: any): void;
        cleanGrid(): void;
        createGrid(): void;
        createFilterPanel(): void;
        cleanFilterPanel(): void;
        cleanSidebar(): void;
        createSidebar(ixsFun: any, ixsSu: any): void;
        reloadData(): void;
        changeToDokumentyKPrevzeti(ixsFun: string, typAg: number, ixsSu?: string, hideNodeChoice?: boolean): void;
        changeToDokumentyKEvidenci(ixsFun: any, ixsSu: any, typAg: any): void;
        loadInitialDate(date: any, isFrom?: boolean): any;
        changeToDokumentyKPredani(ixsFun: any, ixsSu: any): void;
    }
    class DocsForReg {
        private typAgFilter;
        static show(options: DocForRegOptions): any;
        static showEbooksChoice(cnt: JQuery, typAg: number, booksAgendy?: ObjectLiteralNumber<number[]>): JQuery.Promise<Gordic.Eko.Interface.GEkosdenDto>;
        showSettingsOnlyAll(options: DocForRegOptions): any;
    }
}
declare namespace Gordic.Eko.Components {
    namespace Wizard {
        namespace Utils {
            function getData<T>(result: Gordic.Isl.GServiceGroupResponse<T>): ({
                wiz_txt_err: string;
                wiz_kind: Isl.GOperationResultKind;
                wiz_check: boolean;
            } & T)[];
        }
        namespace Forms {
            function Reason(validators?: Gordic.Validators.Base[], formDsc?: string): Gordic.Forms.Form;
            function OpertionAndReason(pozOperName: string, pozOperLabelTrue: string, pozOperLabelFalse: string, formDsc?: string): Gordic.Forms.Form;
            function Operation(pozOperName: string, pozOperLabelTrue: string, pozOperLabelFalse: string, formDsc?: string): Gordic.Forms.Form;
            function Confirmation(formDsc?: string): Gordic.Forms.Form;
        }
    }
    interface MassOperationDataParent {
        wiz_txt_err?: string | null;
        wiz_check?: boolean | null;
        wiz_kind?: Gordic.Isl.GOperationResultKind | null;
    }
    /**@note - Na prani J.Ilecka pridana moznost na delegata pri zmene policka poustet automaticky kontrolu */
    /**
     * Delegat na situaci, kdy nastane zmena na jakemkoliv policku ve formulari
     *
     * @author pnovak
     * @since 484.1.0.141
     */
    type fieldChangeDelegate<T> = (this: Gordic.Eko.Components.FirstStep<T>, ev: any, obj: any) => void;
    /**
     *  funkce, která má na vstupu data z gridu a na výstupu čeká promise s daty (data + výsledek operace - kontrola)
     */
    type preCheckDelegate<T> = (/**data z gridu*/ data: T[]) => JQuery.Promise<Gordic.Eko.Components.MassOperationData<T>[]>;
    /** Krok ve wizardu */
    interface Step<T> {
        /** Titulek kroku v průvodci */
        title?: string;
        /** Popis v pruvodci, text je zobrazen nad tabem s parametry a je ve viewMode */
        description?: string | ((data: Gordic.Data.View<MassOperationData<T>>) => string);
        /** Popis tabu u formuláře */
        formTabTitle?: string | null;
        /**
         * Formulář na prvním kroku průvodce. Volba typu účtování, funk.místa, pole pro popis důovdu atp.
         * LayoutDescriptor by měl být L1M1S1, rozdělení řádku 3-7-2. Doporučeno do tří řádků. Je-li třeba rozdělit do gSection
         * podle počtu parametrů L2M2S1, L3M3S1
         * @type {Gordic.Forms.Form}
         */
        form?: Gordic.Forms.Form;
        /**povolit editaci policek v kroku průvodce */
        enableFormFields?: boolean;
        /**lze ridit editaci policek v kroku průvodce */
        customFieldControl?: boolean;
        /** Příznak, zda má být viditelný KPI panel */
        showIndicator?: boolean;
        /** Popis nad gridem v tabu */
        gridTabTitle: string;
        /** Akce která se volá při přechodu na další krok */
        nextAction: actionDelegate<T>;
        /** Název tlačítka pro další krok */
        nextActionName?: string;
        /** Akce v menubaru gridu */
        menuGridBar?: MenuParams[];
        /** Data, která se aplikují na formulář
         *  data, můžou být funkce, která vrací objekt, promise, která vráti objekt a samozřejmě objekt
         */
        modelData?: any;
        /** view použitá v daném kroku (není nutno měnit nebo nastavovat, mělo by sloužit pouze pro interní potřeby komponenty) */
        view?: Gordic.Data.View<MassOperationData<T>>;
        /**
         * Delegat na osetreni zmeny ve formulari -> dano docasne, pro potreby eko, pro ostatni ucely se ozvete - pnovak
         * @type {fieldChangeDelegate<T>}
         */
        fieldChangeDelegate?: fieldChangeDelegate<T>;
        /**
         * Vychozi akce na gridu
         * @type {GAction}
         */
        defaultAction?: GAction;
    }
    /** Prvni krok ve wizardu */
    interface FirstStep<T> extends Step<T> {
        /** Akce, která slouží ke kontrole záznamů, akce na vstup dostane model z formuláře a také data z gridu a má za úkol doplnit informace o kontrole */
        checkAction?: actionDelegate<T>;
        enableFormFields?: true;
    }
    /** Posledni krok ve wizardu */
    interface LastStep<T> extends Partial<Step<T>> {
        nextAction?: undefined;
        gridTabTitle: string;
        showIndicator?: true;
        enableFormFields?: false;
    }
    /**
     *  funkce, která má na vstupu objekt modelu z formuláře, a data z gridu a na výstupu čeká promise s daty (data + výsledek operace - kontrola, dalsi krok)
     */
    type actionDelegate<T> = (/**model vytvoreny z formu*/ model: any, /**data z gridu*/ data: T[]) => JQuery.Promise<MassOperationData<T>[]>;
    /** typ volany pro funkci pri konci pruvodce */
    type completeDelegate<T> = (data: Gordic.Data.View<MassOperationData<T>>) => void;
    /** Typ rozsirujici stavajici data o indikaci zatrzeni, druhu hlaseni a textu */
    type MassOperationData<T> = T & MassOperationDataParent;
    /** Options pro wizarda hromadných operací */
    interface MassOperationOptions<T> {
        /** ID contentu */
        ID?: string;
        /**gridformat stavajiciho gridu */
        gridFormat: Gordic.Data.GridFormat<T>;
        /** prvni krok */
        firstStep: FirstStep<T>;
        /** posledni krok */
        lastStep: LastStep<T>;
        /** dalsi kroky v pruvodci */
        steps?: Step<T>[] | null;
        /** titulek - v breadcrumbu */
        title: string;
        /** data použitá v prvním kroku průvodce */
        data: T[] | JQueryPromise<T[]>;
        /** klič, který se použije pro nastaveni pohledu (vnitřního - view) */
        keys: Gordic.Data.ViewKeys<T>;
        /** delegat, ktery se vola po ukonceni pruvodce */
        completeDelegate: completeDelegate<T>;
        /** delegát, ktery  se zavolá při zrušení průvodce */
        cancelDelegate?: AnyFunction;
        /** */
        preCheckAction?: preCheckDelegate<T>;
        /** typ indikatoru */
        indicatorType?: "badge" | "KPI";
        /** profil gridu */
        gridProfile?: GridProfile<T>;
        /** použít pouze akci pro ukončení (defaultně se nabízí také akce pro provedení a následné ukončení)*/
        onlyCompleteAction?: boolean;
    }
    /** Options pro dvoukrokoveho wizarda hromadných operací */
    interface TwoStepsOptions<T> extends MassOperationOptions<T> {
        steps?: null;
    }
    interface SecondStep<T> extends Step<T> {
        title: string;
        /** Akce, která slouží ke kontrole záznamů, akce na vstup dostane model z formuláře a také data z gridu a má za úkol doplnit informace o kontrole */
        checkAction: actionDelegate<T>;
    }
    /** Options pro trikrokoveho wizarda hromadných operací */
    interface ThreeStepsOptions<T> extends MassOperationOptions<T> {
        steps?: null;
        secondStep: SecondStep<T>;
        firstStep: FirstStep<T>;
    }
    /**
 * Funkce vznikla na prani J.Ilecka z duvodu automatizace a dalsiho klikani do pruvodce
 *
 * @param {HTMLElement} fieldElement
 * @param {Gordic.Eko.Components.FirstStep<T>} firstStep
 * @param {any} model
 */
    function runCheckAction<T = any>(fieldElement: HTMLElement, firstStep: Gordic.Eko.Components.FirstStep<T>, model: any): void;
    abstract class ComponentWizard<T> {
        protected title: string;
        protected data: T[] | JQueryPromise<T[]>;
        protected keys: Gordic.Data.ViewKeys<T>;
        protected gridFormat: Gordic.Data.GridFormat<MassOperationData<T>>;
        protected allSteps: Step<T>[];
        protected firstStep: FirstStep<T>;
        protected lastStep: LastStep<T>;
        protected wizard: Gordic.Wizard;
        protected gridProfile?: GridProfile<MassOperationData<T>>;
        indicatorType?: "badge" | "KPI";
        protected grid: JQuery;
        protected gFilterProcessor: Gordic.Data.FilterProcessor<MassOperationData<T>> | undefined;
        protected getFilterProcessor(kind: Gordic.Isl.GOperationResultKind): Data.FilterProcessor<MassOperationData<T>>;
        protected kpiPanel: JQuery;
        protected contentDiv: JQuery;
        protected badges: {
            succ?: GObservableObject<GBadgeOptions>;
            warn?: GObservableObject<GBadgeOptions>;
            err?: GObservableObject<GBadgeOptions>;
        };
        protected succAction: GAction;
        protected warnAction: GAction;
        protected errAction: GAction;
        private succParam;
        private warnParam;
        private errParam;
        protected actEndAndClose?: GAction;
        protected onlyCompleteAction: boolean;
        protected autoClose: boolean;
        protected canAutoClose: boolean;
        protected badgePanel: JQuery;
        protected gridFormatWithoutColumns: Gordic.Data.GridFormat<T>;
        constructor(args: MassOperationOptions<T>);
        refreshIndicator(view: Gordic.Data.View<MassOperationData<T>>): void;
        protected setActionContext(actions: MenuParams[], content: GContent, grid: JQuery): MenuParams[];
        protected setKPIPanel(view: Gordic.Data.View<MassOperationData<T>>, succText?: string, warnText?: string, errText?: string): void;
        protected setTerminateAction(nextStep: number): void;
        protected refreshKPIPanel(view: Gordic.Data.View<MassOperationData<T>>, succText?: string, warnText?: string, errText?: string): void;
        protected setBadges(view: Gordic.Data.View<MassOperationData<T>>, succText?: string, warnText?: string, errText?: string): void;
        protected refreshBadges(view: Gordic.Data.View<MassOperationData<T>>): void;
        protected createDescription(description?: string): void;
        protected applyModelData(data: any, triggerChange: boolean): void;
    }
    class MassOperationWizard<T> extends ComponentWizard<T> {
        protected steps: Step<T>[];
        protected form: JQuery;
        protected nextForms: ObjectLiteralNumber<JQuery>;
        protected getSelFunc(kind: Gordic.Isl.GOperationResultKind, view: Gordic.Data.View<Gordic.Eko.Components.MassOperationData<T>>, selected?: boolean): void;
        setFocusOnFirstStep(): void;
        protected setFocus(formDiv: JQuery, cnt?: GContent, form?: Gordic.Forms.Form): void;
        protected getMultiMenu(view: Gordic.Data.View<Gordic.Eko.Components.MassOperationData<T>>): {
            caption: string;
            action: GAction;
        }[];
        init(firstStep: FirstStep<T>, lastStep: LastStep<T>, ...steps: Step<T>[]): void;
        protected createFirstStep(cancelDelegate?: AnyFunction, completeDelegate?: completeDelegate<T>): IGWizardStepsType;
        protected createAnotherSteps(): IGWizardStepsType[];
        protected createAnotherStep(index: number): IGWizardStepsType;
        protected createLastStep(): IGWizardStepsType;
        show(cnt: GContent, completeDelegate: completeDelegate<T>, cancelDelegate?: AnyFunction): void;
    }
    class ThreeStepsWizard<T> extends MassOperationWizard<T> {
        protected secondStep: SecondStep<T>;
        protected createSecondStep(): IGWizardStepsType;
        init(firstStep: FirstStep<T>, lastStep: LastStep<T>, secondStep: SecondStep<T>): void;
        show(cnt: GContent, completeDelegate: Gordic.Eko.Components.completeDelegate<T>, cancelDelegate?: AnyFunction): void;
    }
    class TwoStepsContent<T = any> extends GContentBase implements IGClientContent {
        protected wizard: MassOperationWizard<T>;
        refreshIndicator(view: Gordic.Data.View<MassOperationData<T>>): void;
        prepareContent(args: TwoStepsOptions<T>): void;
    }
    class ThreeStepsContent<T = any> extends GContentBase implements IGClientContent {
        protected wizard: MassOperationWizard<T>;
        refreshIndicator(view: Gordic.Data.View<MassOperationData<T>>): void;
        prepareContent(args: ThreeStepsOptions<T>): void;
    }
    class MassOperationContent<T = any> extends GContentBase implements IGClientContent {
        protected wizard: MassOperationWizard<T>;
        refreshIndicator(view: Gordic.Data.View<MassOperationData<T>>): void;
        prepareContent(args: MassOperationOptions<T>): void;
    }
}
declare namespace Gordic.Eko {
    interface GControllingInput {
    }
    interface GControllingOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GControlling extends GContent implements IGClientContent {
        taskId: string;
        title: string;
        private $vazebniGrid;
        private $vazebniIslView;
        private $detailWraper;
        protected readonly actionNames: {
            readonly loadFromRTN: "loadFromRTN";
            readonly disconnect: "disconnect";
            readonly detail: "detail";
            readonly document: "documents";
        };
        /**
         * Hlavní metoda pro vytvoření obsahu contentu.
         */
        prepareContent(inputData: GControllingInput): Promise<void>;
        /**
         * Vytvoří všechny akce, které content používá.
         * @param inputData Vstupní parametry contentu.
         */
        private prepareActions;
        /**
         * Vytvoří menu pro content.
         */
        private buildMenu;
        private createSubcontent;
        private createVazebniGrid;
        private createVazebniGridFormat;
    }
}
declare namespace Gordic.Eko {
    interface GControllingDetailInput {
    }
    interface GControllingDetailOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GControllingDetail extends GContent implements IGClientContent {
        uid: "controllingDetail#";
        taskId: string;
        protected readonly actionNames: {
            readonly novy: "novy";
            readonly odstranit: "odstranit";
            readonly duplikovat: "duplikovat";
            readonly vyberRozpisu: "vyberRozpisu";
            readonly importXlxs: "importXlxs";
            readonly nastroje: "nastroje";
        };
        /**
         * Hlavní metoda pro vytvoření obsahu contentu.
         * @param inputData Vstupní parametry contentu.
         */
        prepareContent(inputData: GControllingDetailInput): Promise<void>;
        /**
         * Vytvoří všechny akce, které content používá.
         * @param inputData Vstupní parametry contentu.
         */
        private prepareActions;
        /**
         * Vytvoří menu pro content.
         */
        private buildMenu;
    }
}
declare namespace Gordic.Eko.WebClient {
    const GFinancniKontrolaEkoDetailExt: Gordic.Wfl.WebClient.IGFKDetailExtensions;
}
/**
 * Sdílené metody FUC pro práci s detailem v EKO modulech
 *
 * @author Martin Boček
 * @since 484.1.0.86
 */
declare namespace Gordic.Eko.Detail {
    /**
     * Layout sloupců ve standardní třísloupcové EKO hlavičce
     */
    const headerLayoutDescriptor3Cols = "L3M2S1, L-3-9-0, M-4-8-0, S-12-12-0";
    /**
     * Layout popisu ve standardní třísloupcové EKO hlavičce
     */
    const headerLayoutDescriptorPopis = "L-1-11-0, M-4-8-0, S-12-12-0";
    /**
     * Potvrzovací dialog pro zavření neuloženého detailu
     *
     * @param {GContent} gcontent content
     * @returns {JQuery} potvrzovací dialog
     */
    function messageBoxUnsavedData(gcontent: GContent): JQuery;
    /**
     * Vrátí titulek pro detailové okno
     *
     * @param {string | null | undefined} businessObject název byznys objektu
     * @param {string | null | undefined} ixp PID
     * @param {string | null | undefined} agendoveCislo agendové číslo
     * @param {boolean} combine (default = false) kombinovat agendové číslo a PID (pokud jsou obě vyplněny)
     * @returns {string} výsledný titulek
     */
    function getDetailTitle(businessObject: string | null | undefined, ixp: string | null | undefined, agendoveCislo: string | null | undefined, combine?: boolean): string;
    /**
     * Úprava definic akcí, menu, kpi, ... pro detailbuilder
     *
     * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder detailbuilder
     * @param {boolean} jePodany příznak, jestli je dokument pouze podaný (v tom případě se některé komponenty neupravují)
     * @param {string[] | string} [menuTisk] menu tisky (jedno nebo více), které mají být přesunuty do menu Tisk
     */
    function changeDetailBuilderWflForEkoDefinitions(builder: Gordic.Gin.DetailBuilder.GDetailBuilder, jePodany: boolean, menuTisk?: string[] | string): void;
    /**
     * Sdílené metody pro práci se stavovým řádkem v detailech EKO modulů
     *
     * @author Martin Boček
     * @since 484.1.0.97
     */
    namespace StatusBar {
        /**
         * Vytvoření nové položky pro statusbar
         *
         * @param {MenuParams} [params] další vlastnosti prvku (např. id, pod kterým bude prvek dostupný např. v this.statuses[])
         * @returns {GObservableObject<MenuParams>} nová položka
        */
        function createItem(params?: MenuParams): GObservableObject<MenuParams>;
        /**
         * Aktualizace textu a stylu položky ve statusbaru
         *
         * @param {GObservableObject<MenuParams>} item položka ve statusbaru
         * @param {string} text zobrazený text
         * @param {string | Eko.Utils.RecordFormatType | null} stateOrType požadovaný stav (třída) nebo typ záznamu. Pro null se nastaví jen text
         */
        function updateItem(item: GObservableObject<MenuParams>, text: string, stateOrType: string | Eko.Utils.RecordFormatType | null): void;
        /**
         * Vytvoření barevného označení pro statusbar
         *
         * @param {{ ixp?: string | null, uzo?: string | null, readonly?: boolean, globalSettings?: Data.IGStorage | null }} dto dto detailu s položkami ixp a uzo
         * @param {() => any} [afterChangeMethod] metoda, která má být spuštěna po změně barevného označení
         * @param {MenuParams} [params] další vlastnosti prvku (např. id, pod kterým bude prvek dostupný např. v this.statuses[])
         * @returns {any} definice barevného označení
        */
        function createUzo(dto: {
            ixp?: string | null;
            uzo?: string | null;
            readonly?: boolean;
            globalSettings?: Data.IGStorage | null;
        }, afterChangeMethod?: () => any, params?: MenuParams): any;
    }
    /**
     * Sdílené metody pro práci s políčky v detailech EKO modulů
     *
     * @author Martin Boček
     * @since 484.1.0.97
     */
    namespace Field {
        /**
         * Prefab pro PID
         *
         * @param {Gin.Prefabs.Field.IdentifikatorOptions} fieldOptions parametry políčka
         * @param {GFormRowOptions} [rowOptions] další parametry řádku
         * @returns {Gordic.Forms.FormRow[]} řádky formu s prefabem
        */
        function fieldPID(fieldOptions: Gin.Prefabs.Field.IdentifikatorOptions, rowOptions?: GFormRowOptions): Gordic.Forms.FormRow[];
        /**
         * Prefab pro evidenční číslo
         *
         * @param {GStringBoxOptions} fieldOptions parametry políčka
         * @param {GFormRowOptions} [rowOptions] další parametry řádku
         * @returns {Gordic.Forms.FormRow[]} řádky formu s prefabem
         */
        function fieldEvidencniCislo(fieldOptions: GStringBoxOptions, rowOptions?: GFormRowOptions): Gordic.Forms.FormRow[];
        /**
         * Prefab pro agendové číslo
         *
         * @param {GStringBoxOptions} fieldOptions parametry políčka
         * @param {GFormRowOptions} [rowOptions] další parametry řádku
         * @returns {Gordic.Forms.FormRow[]} řádky formu s prefabem
         */
        function fieldAgendoveCislo(fieldOptions: GStringBoxOptions, rowOptions?: GFormRowOptions): Gordic.Forms.FormRow[];
        /**
         * Prefab pro zpracovatele (vlastníka)
         *
         * @param {GSelectBoxOptions<Data.Readers.GinsfunDto, Data.Readers.GinsfunDto>} fieldOptions parametry políčka
         * @param {GFormRowOptions} [rowOptions] další parametry řádku
         * @returns {Gordic.Forms.FormRow[]} řádky formu s prefabem
         */
        function fieldZpracovatel(fieldOptions: GSelectBoxOptions<Data.Readers.GinsfunDto, Data.Readers.GinsfunDto>, rowOptions?: GFormRowOptions): Gordic.Forms.FormRow[];
        /**
         * Prefab pro typ dokladu
         *
         * @param {GSelectBoxOptions<Data.Readers.SslstypDto, Data.Readers.SslstypDto>} fieldOptions parametry políčka
         * @param {GFormRowOptions} [rowOptions] další parametry řádku
         * @returns {Gordic.Forms.FormRow[]} řádky formu s prefabem
         */
        function fieldTypDokladu(fieldOptions: GSelectBoxOptions<Data.Readers.SslstypDto, Data.Readers.SslstypDto>, rowOptions?: GFormRowOptions): Gordic.Forms.FormRow[];
        /**
         * Vrátí parametry pro počítání znaků a případně i maximální délku
         *
         * @param {number} length délka pole
         * @param {boolean} [counterFromZero] zobrazovat počítadlo od začátku?
         * @param {boolean} [maxLength] omezovat maximální délku vložených znaků?
         * @param {GStringBoxOptions} [fieldOptions] parametry políčka
         * @returns {GStringBoxOptions} parametry políčka doplněné o věci týkající se počítání znaků a případné maximální délky
         */
        function getCounterOptions(length: number, counterFromZero?: boolean, maxLength?: boolean, fieldOptions?: GStringBoxOptions): GStringBoxOptions;
    }
}
declare namespace Gordic.Eko.DetailBuilderComponents.EkoHeaderForm {
    function create(componentDto?: {
        isPid: boolean;
    }): {
        headerForm: Forms.Form;
    };
}
declare namespace Gordic.Eko.HeaderForm {
    const Name = "formHeader";
    enum Sections {
        Info = "formInfoSection",
        Data1 = "formSectionOne",
        Data2 = "formSectionTwo",
        Data3 = "formSectionThree"
    }
    enum Rows {
        Id = "formIdRow",
        AgendoveCislo = "formAcAgRow",
        EvidencniCislo = "formEviRow",
        Kniha = "formKnihaRow",
        TypDokladu = "formIxsTypRow",
        DatumEvidence = "formDatEviRow",
        Zpracovatel = "formZpracRow",
        Kompetent = "formKompRow",
        Realizator = "formRealRow",
        Popis = "formPopisRow"
    }
    enum Fields {
        Id = "formIdField",
        AgendoveCislo = "formAcAgField",
        EvidencniCislo = "formEviField",
        Kniha = "formKnihaField",
        TypDokladu = "formIxsTypField",
        DatumEvidence = "formDatEviField",
        Zpracovatel = "formZpracField",
        Kompetent = "formKompField",
        Realizator = "formRealField",
        Popis = "formPopisField"
    }
    function getHeaderFields(): string[];
    function setup(builder: Gin.DetailBuilder.GDetailBuilder, settings: ObjectLiteral<Partial<Forms.Form | Forms.FormRow | Forms.FormField | Forms.FormSection> | ((orig: Forms.Form | Forms.FormRow | Forms.FormField | Forms.FormSection) => void) | null>): void;
    function rebuild(content: GContent, settings: ObjectLiteral<Partial<Forms.Form | Forms.FormRow | Forms.FormField | Forms.FormSection> | ((orig: Forms.Form | Forms.FormRow | Forms.FormField | Forms.FormSection) => void) | null>, componentDto?: {
        isPid: boolean;
    }): JQuery<HTMLElement>;
}
declare namespace Gordic.Eko.DetailBuilderComponents {
    /** Komponenta detail builderu Eko schvalovací proces */
    class EkoSchvalovaciProces {
        /**
         * Vytvoření builderu s Eko schvalovacím procesem
         * @param componentDto Vstupní DTO s parametry
         */
        static create(content: any, componentDto: any): Gin.DetailBuilder.GDetailBuilderComponent<Gin.DetailBuilder.GDetailBuilderContent>;
    }
}
declare namespace Gordic.Eko.DetailBuilderComponents.EkoSslActionsAndKpis {
    function create(cnt: any, componentDto?: any): Gin.DetailBuilder.GDetailBuilderComponent<Gin.DetailBuilder.GDetailBuilderContent>;
}
declare namespace Gordic.Eko {
    class GDanovaEvidence extends GContentBase {
        private formContent;
        private ixp;
        private list;
        private localStatusBar;
        private data;
        private dataView;
        private prava;
        private editMode;
        private vynulovatDatumyDPH;
        private prvotniEvidenceDokladu;
        private activityMap;
        private editSettings;
        private isSaved;
        onContentReady(): void;
        closing(res: any): any;
        onClose(): void;
    }
}
declare namespace Gordic.Eko {
    class GDanovaEvidenceForm extends GContentBase {
        $form?: JQuery;
        polozkyDV: Gordic.Data.View<Interface.GEkodkplDto>;
        _origHlavickaKH: Interface.GEkospdeDto;
        grid: JQuery;
        formsCollection: JQuery;
        editMode: boolean;
        vynulovatDatumyDPH: boolean;
        prvotniEvidenceDokladu: boolean;
        isSaved: boolean;
        /**
         * Nastaveni pristupnosti jednotlivych poli z venku.
         * @type {IGDanovaEvidenceEditSettings}
         */
        editSettings: Gordic.Eko.Interface.GDanovaEvidenceEditSettingsDto;
        data: WebClient.GDanovaEvidenceFormDataDto;
        defaultDanTypTxt: string;
        statuses: GObservableList<MenuParams>;
        ixp: string;
        radek: string | number;
        prava: Eko.Interface.GEKHPrava;
        isBuilt: boolean;
        onContentReady(): void;
        closing(res: any): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any> | undefined;
        changeEditMode(edit: boolean): void;
        save(): JQuery.Promise<any, any, any>;
        /**
         * reload & initialize
         */
        reload(ixp?: string, radek?: string | number, prava?: Eko.Interface.GEKHPrava, editSettings?: Gordic.Eko.Interface.GDanovaEvidenceEditSettingsDto): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        /**
         * initialize content - refreshes data on existing elements
         */
        initialize(): void;
        /**
         * getEsuFieldOptions
         *
         * @returns {GSelectBoxOptions<Esu.Interface.GGinsesuPolDto>}
         */
        getEsuFieldOptions(): GSelectBoxOptions<Esu.Interface.GGinsesuPolDto>;
        /**
         * updates statuses
         */
        updateStatuses(): void;
        /**
         * Initialize editSettings props
         */
        initEditableSettings(): void;
        /**
         * Apply editSettings to elements
         */
        updateEditSettings(): void;
        /**
         * Show warning dialog, that grid rows will be deleted
         *
         * @param {Node} evTarget
         * @param {string} modelName
         * @param {any} newValue
         * @param {string} title
         * @param {string} html
         */
        gridDependendFieldChanged(evTarget: Node, modelName: string, newValue: any, title: string, html: string): void;
        _getCommonValidators(): {
            validators: Validators.Required[];
        };
        _getCommonGFColumns(): Data.GridFormat<any>;
        getForeignGF(): Data.GridFormat<any>;
        getDomesticGF(isPrijatePlneni: boolean): Data.GridFormat<any>;
        addTaxColumns(gf: Data.GridFormat, isPrijatePlneni?: boolean, disableDanProc?: boolean): void;
        /**
         * Update gridformat
         *
         * @param {boolean} isPrijatePlneni
         */
        updateGrid(isPrijatePlneni: boolean): void;
        /**
         * recalculateDPH
         *
         * @param {string} column
         */
        recalculateDPH(column: string): void;
    }
}
declare namespace Gordic.Eko.WebClient {
    interface GNavazaniRealizatoriOptions {
        agenda: string;
        ixp: string;
    }
    class GNavazaniRealizatori extends GContentBase implements IGClientContent {
        serviceContent: GContent | null;
        grid: JQuery;
        dataView: Gordic.Data.View<Interface.SeznamRealizatoruDto>;
        toAdd: Interface.SeznamRealizatoruDto[];
        toRemove: Interface.SeznamRealizatoruDto[];
        agenda?: string;
        ixp?: string;
        changed: boolean;
        prepareContent(inputDto: GNavazaniRealizatoriOptions): void;
        addOrDeleteItem(item: any, operation: 'delete' | 'add'): void;
        showSelector(): JQuery.Promise<Interface.SeznamRealizatoruDto | Interface.SeznamRealizatoruDto[], any, any>;
        updateButtons(): void;
        save(): JQuery.Promise<any, any, never>;
        closing(): JQuery.Deferred<any, any, any>;
    }
}
declare namespace Gordic.Eko.WebClient {
    interface GPozadavkySeznamInputParams {
        /** Identifikátor dokladu */
        ixp: string;
        /** Identifikátor navázané veřejné zakázky*/
        ixs_pri?: string | null;
        /** Téma pro tisk (pokud není posláno, tak se akce Tisk nezobrazí)*/
        tema?: string | null;
        /** Identifikátor stromu pro tisk */
        ixs_str?: string | null;
        /** Delegát, který by měl zajistit otevření dialogu pro vytvoření nového požadavku v Bar (očekává předaný promise z .createDialogPromise())*/
        openNewDelegate?: (() => JQueryPromise<any>) | null;
        /** Element pro správný autofit, pokud je content položen na tab */
        tabElement?: JQuery<HTMLElement> | null;
    }
    /** Content se seznamem Požadavků příštích období dokladu */
    class GPozadavkySeznam extends GContentBase implements GPozadavkySeznamInputParams {
        /** Identifikátor dokladu */
        ixp: string;
        /** Identifikátor navázané veřejné zakázky */
        ixs_pri?: string | null;
        /** Téma pro tisk (pokud není posláno, tak se akce Tisk nezobrazí)*/
        tema?: string | null;
        /** Identifikátor stromu pro tisk */
        ixs_str?: string | null;
        /** Delegát, který by měl zajistit otevření dialogu pro vytvoření nového požadavku v Bar (očekává předaný promise z .createDialogPromise())*/
        openNewDelegate?: (() => JQueryPromise<any>) | null;
        /** Element pro správný autofit, pokud je content položen na tab */
        tabElement?: JQuery<HTMLElement> | null;
        /** Rozptyl nepřekročitelného objemu prostředků (určuje se DB parametrem)*/
        private rozptylPerc;
        private $grid;
        /** Příznak, zda došlo ke změně dat v contentu */
        private changed;
        closing(): {
            changed: boolean;
        };
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření menubaru */
        private createMenuBar;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /** Vytvoření gridu */
        private createGrid;
        /**
         * Vytvoření gridformátu
         * @returns
         */
        private createGridFormat;
        /** * Příprava dat z formuláře pro uložení/přidání záznamu */
        private prepareDataForSave;
    }
}
declare namespace Gordic.Eko.WebClient {
    interface GPozadavkyVyberInputParams {
        /** Identifikátor dokladu */
        ixp: string;
        /** Identifikátor navázané veřejné zakázky*/
        ixs_pri?: string | null;
        /** Delegát, který by měl zajistit otevření dialogu pro vytvoření nového požadavku v Bar (očekává předaný promise z .createDialogPromise())*/
        openNewDelegate?: (() => JQueryPromise<any>) | null;
    }
    /** Content pro výběr Požadavků příštích období k dokladu */
    class GPozadavkyVyber extends GContentBase implements GPozadavkyVyberInputParams {
        /** Identifikátor dokladu */
        ixp: string;
        /** Identifikátor navázané veřejné zakázky*/
        ixs_pri?: string | null;
        /** Delegát, který by měl zajistit otevření dialogu pro vytvoření nového požadavku v Bar (očekává předaný promise z .createDialogPromise())*/
        openNewDelegate?: (() => JQueryPromise<any>) | null;
        private ico;
        /** Typ agendy*/
        private typ_ag;
        private eko_rad_poripoz;
        private $filterPanel;
        private $grid;
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /** Vytvoření menubaru */
        private createMenuBar;
        /** Vytvoření filtr panelu nad gridem*/
        private createFilterPanel;
        /** Vytvoření filtračního gridu */
        private createFilterForm;
        /** Vytvoření gridu */
        private createGrid;
        /**
         * Vytvoření gridformátu
         * @returns
         */
        private createGridFormat;
        /**
         * Získání, přidání a upravení filtrů pro volaní Isl
         * @param that
         * @param req
         * @param next
         * @returns
         */
        private getFilterData;
        /**
         * Získání server filteru z gridu
         * @param fPanelData
         * @returns
         */
        private getFilter;
    }
}
declare namespace Gordic.Eko.WebClient {
    /** Detail ekonomického schvalovacího procesu */
    class GEkoSchvalovaciProcesDetail extends GContentBase {
        /** Dto schvalovacího procesu */
        data: Gordic.Wfl.Interface.GWflvdfkDto;
        /** Tiskové téma pro generování */
        Tema: string;
        /** Téma filtr ALV*/
        TemaFilter: string;
        /** Dodatečné parametry pro tisk */
        ReportParams: any;
        /** Umožnění generování el. obrazu. Buď vygenerování nového pokud neexistuje nebo přegenerování aktuálního. */
        MoznostGenerElObraz: boolean;
        /** Údaje primárního dokladu */
        UdajePrimarnihoDokladu: any;
        /** Název případné eventy, která má být vyvolána při úspěném ukončení platnosti Eko schvalovacího procesu */
        EventUkoncitPlatnostSchval: any;
        /** Příznak, zda je vložení do EPK povoleno */
        private epkEnabled;
        /** Příznak, zda je Storno povoleno */
        private stornoEnabled;
        /** Příznak, zda je Ukončit platnost povoleno */
        private ukoncitPlatnostEnabled;
        /** Příznak, zda je Zrušení/Stáhnutí povoleno */
        private stahnoutEnabled;
        /** Příznak, zda je Tisk(El.Obraz) povolen */
        private tiskEnabled;
        private ico;
        private docInfo_ktgTyp;
        private docInfo_ixsTyp;
        private l_prazdne;
        private l_priprava;
        private l_editovat;
        private isVlastnik;
        private ixs_fun;
        private existsElObraz;
        private gridRC;
        /** Původní načtené šablony */
        private origSablony;
        /** Příznak zda došlo k zásadní změně ve Eko schvalovacím procesu (např. pro reload detailu dokladu) */
        private SchvalChanged;
        private $form;
        private $formHeadAgenda;
        private $gridRole;
        private statusBarProcesStav;
        closing(): boolean | JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
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
        /** Akce Uložení dokumentu finanční kontroly */
        private actSave;
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
        /** Vytvoření gridFormátu pro výběr rolí podle šablony */
        private createGridRoleColumns;
        /** Vytvoření cellTemplate nebo tooltipTemplate pro sloupec s povinností úkonu*/
        private schPovColumnTemplate;
        /** Vytvoření TabGroups */
        private createTabGroups;
        private createHeadForm;
        /** Vytvoření stavu Eko schvalovacího procesu pro statusBar
         * Stavy: null/0/5/10/20 - nezahájena/návrh/probíhá/povolena/zamítnuta
        */
        private setStatusBarStav;
        /** Rozhodnutí, zda má být povoleno vytvoření el. obrazu */
        private enableTiskAndEpk;
        /** Akce Zrušení předpisu schvalovacího procesu */
        private actStorno;
        /** Akce Ukončit platnost  */
        private actUkoncitPlatnost;
        /** Akce Stažení schvalovacího procesu z EPK */
        private actStahnout;
        /** Update gridu seznamu finančních kontrol */
        private updateMainGrid;
        /** Kontrola, zda došlo k modifikaci dat */
        private checkModifications;
        /**
         * Metoda volaná při startu generování reportu
         * @param rep
         */
        tiskReportStarting(rep: any): JQuery.Promise<any, any, any>;
        /**
         * Metoda volaná po vygenerování reportu - nastavení aktivity procesu
         * @param ev
         * @param rep
         */
        tiskReportFinished(ev: any, rep: any): void;
        /** Reload contentu */
        private reload;
        private setFocus;
    }
}
declare namespace Gordic.Eko.WebClient {
    /** Interface s parametry pro změnu povolení jednotlivých tlačítek v seznamu eko schvalovacích procesů + FK,UK,PK */
    interface EkoSchvalFkSeznamEnabled {
        EnabledPodaniFk?: boolean;
        EnabledPodaniUk?: boolean;
        EnabledPodaniPk?: boolean;
        EnabledTiskFk?: boolean;
        EnabledTiskUk?: boolean;
        EnabledTiskPk?: boolean;
        EnabledStornoVyrizFk?: boolean;
        EnabledStornoVyrizUk?: boolean;
        EnabledStornoVyrizPk?: boolean;
    }
    /**
     * Funkce pro změnu povolení jednotlivých tlačítek v seznamu eko schvalovacích procesů + FK,UK,PK
     * @param cnt Content seznamu eko schvalovacích procesů + FK,UK,PK
     * @param opts Parametry pro změnu povolení jednotlivých tlačítek
     */
    function changeEkoSchvalFkSeznamEnabled(cntDoklad: GContent, opts: EkoSchvalFkSeznamEnabled, cntSeznam?: GEkoSchvalovaciProcesSeznam): void;
    /** Extension pro EKO schvalovací proces + Finanční kontrolu s delegáty */
    interface GEkoSchvalFKSeznamExtension {
        /** Delegát volaný před podáním kontroly. Očekává vybraný ktg_typ
         * @param ixp Ixp hlavního dokladu
         * @param ktg_typ Zvolený ktg_typ podle typu kontroly (FK-120, UK-160, PK-170), slouží pro vás pro určení o jaký typ kontroly se jedná
         * @param rok Rok ve kterém se podává
         */
        beforeFKPodani?: (ixp: string, ktg_typ: number, rok: number) => JQueryPromise<number>;
        /** Delegát volaný před novým schvalováním. Reject zastaví vytváření.
         * @param ixp Ixp hlavního dokladu
         */
        beforeNoveSchval?: (ixp: string) => JQueryPromise<void>;
    }
    /** Seznam Eko schvalovacích procesů + FK,UK,PK */
    class GEkoSchvalovaciProcesSeznam extends GContentBase implements GEkoSchvalFKSeznamExtension {
        /** PID primárních dokladů */
        Ixp: string;
        /** Údaje primárního dokladu */
        UdajePrimarnihoDokladuFK: any;
        ReportParamsFK: any;
        KtgTyp: number[];
        KtgTypFilter: any;
        Rok: number;
        TemaFK: string;
        TemaFilterFK: string;
        EnabledPodaniFk: boolean;
        EnabledPodaniUk: boolean;
        EnabledPodaniPk: boolean;
        DisabledTooltipPodaniFk: string;
        DisabledTooltipPodaniUk: string;
        DisabledTooltipPodaniPk: string;
        EnabledTiskFk: boolean;
        EnabledTiskUk: boolean;
        EnabledTiskPk: boolean;
        DisabledTooltipTiskFk: string;
        DisabledTooltipTiskUk: string;
        DisabledTooltipTiskPk: string;
        EnabledStornoVyrizFk: boolean;
        EnabledStornoVyrizUk: boolean;
        EnabledStornoVyrizPk: boolean;
        MoznostGenerElObraz: boolean;
        EnabledNoveSchvalovani: boolean;
        DisabledTooltipNoveSchvalovani: string;
        EnabledUkoncitPlatnostSchval: boolean;
        EventUkoncitPlatnostSchval: any;
        ReportParamsSchval: any;
        TemaSchval: string;
        TemaFilterSchval: string;
        ZobrazeniObecnychZaznamu: boolean;
        beforeFKPodani: (ixp: string, ktg_typ: number, rok: number) => JQueryPromise<number>;
        beforeNoveSchval?: (ixp: string) => JQueryPromise<void>;
        /** Příznak, zda je otevřeno v tabu pro signalizaci change */
        openedFromTab: boolean;
        /** Přiznak, zda existuje licenční certifikát pro Finanční kontrolu */
        private licenceFk;
        /** Přiznak, zda existuje licenční certifikát pro Účetní kontrolu */
        private licenceUk;
        /** Přiznak, zda existuje licenční certifikát pro Průběžnou kontrolu */
        private licencePk;
        /** Příznak zda došlo k zásadní změně ve FK (např. pro reload detailu dokladu) */
        private IsFKChanged;
        /** Příznak zda došlo k zásadní změně v Eko schvalovacím procesu (např. pro reload detailu dokladu) */
        private IsSchvalChanged;
        private ixs_fun;
        /** Typ aktuální agendy */
        private typAg;
        $grid: JQuery<HTMLElement>;
        private view;
        closing(): {
            IsFKChanged: boolean;
            IsSchvalChanged: boolean;
            activeSchvalDto: undefined;
        };
        onContentReady(): void;
        /** Načtení a vložení dat do gridu */
        private setDataToGrid;
        /** Vytvoření akcí */
        private createActions;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /** Vytvoření gridu */
        private createGrid;
        /** Vytvoření gridformátu */
        private createGridFormat;
        /** Vytvoření menubaru */
        private createMenuBar;
        /** Update viditelnosti a povolení akcí v menubaru */
        updateVisibilityAndDisability(): void;
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
        /** Akce storna FK a Eko schvalovac9ho procesu */
        private actStorno;
        /**
         * Zjištění indexu nejvyššího pořadového čísla eko schval kontroly
         * @param array
         * @returns
         */
        private indexOfMax;
    }
}
declare namespace Gordic.Eko {
    /**
      * Typy smluvních případů
      *
      * @author Vlastimil Máca
      * @since 480.1.0.80
      */
    export enum GVyberSmlouvyPripadyEnum {
        /**
        * Se schválenou položkou
        */
        SeSchvalenouPolozkou = 0,
        /**
        * S disponibilními položkami
        */
        SDisponibilnimiPolozkami = 1,
        /**
        * S vyhovující položkou
        */
        SVyhovujiciPolozkou = 2,
        /**
        * Pro novou položku
        */
        ProNovouPolozku = 3,
        /**
        * Pro vratku
        */
        ProVratku = 4,
        /**
        * Navázán na primární dokument
        */
        NavazanNaPrimar = 5
    }
    /**
* Typy prijmovych
*
* @author Vlastimil Máca
* @since 480.1.0.80
*/
    export enum GVyberSmlouvyPrijmoveEnum {
        /**
        * Příjmové smlouvy
        */
        Smlouvy = 1,
        /**
        * Příjmové objednávky
        */
        Objednavky = 3,
        /**
        * Individuální příjmy
        */
        IndividualniPrijmy = 6,
        /**
        * Jiné příjmy
        */
        JinePrijmy = 7
    }
    /**
     * Typy vydajovych
     *
     * @author Vlastimil Máca
     * @since 480.1.0.80
     */
    export enum GVyberSmlouvyVydajoveEnum {
        /**
        * Výdajové smlouvy
        */
        Smlouvy = 0,
        /**
        * Výdajové objednávky
        */
        Objednavky = 2,
        /**
        * Individuální přísliby
        */
        IndividualniPrisliby = 5,
        /**
        * Limitované přísliby
        */
        LimitovanePrisliby = 4
    }
    export interface GEkoVyberSmlouvyPolDto extends Interface.GEkoVyberSmlouvyPolDto {
        Smlouva?: Interface.GSmlapidDto;
    }
    export type GVyberSmlouvyResult = Interface.GSmlapidDto | Interface.GSmlapidDto[] | GEkoVyberSmlouvyPolDto | GEkoVyberSmlouvyPolDto[] | null | undefined;
    type filterOptsType = {
        filterPanelOpts: IGFilterPanelOptions;
        doNotSearch?: boolean;
    };
    export class GVyberSmlouvy extends GContentBase implements IGClientContent {
        /** OBSOLETE - použijte Gordic.Eko.GVyberSmlouvyPripadyEnum */
        static PripadyEnum: typeof GVyberSmlouvyPripadyEnum;
        /** OBSOLETE - použijte Gordic.Eko.GVyberSmlouvyPrijmoveEnum */
        static PrijmoveEnum: typeof GVyberSmlouvyPrijmoveEnum;
        /** OBSOLETE - použijte Gordic.Eko.GVyberSmlouvyVydajoveEnum */
        static VydajoveEnum: typeof GVyberSmlouvyVydajoveEnum;
        getLabelForSmlType(value?: any): "" | "jres:31750103" | "jres:31750104" | "jres:31750105" | "jres:31750106" | "jres:31750107" | "jres:31750108" | "jres:31750109";
        prijmyValue?: JQueryPromise<boolean>;
        isSmlSelect: boolean;
        serverFilters: Eko.Client.GVyberSmluvFilterDto & {
            ixp?: string;
        };
        serviceContent: GContent & {
            inputDto?: Gordic.Prefabs.Select.GEkoVyberSmlouvyInputDto;
        } | null;
        options: Gordic.Prefabs.Select.GEkoVyberSmlouvyOptions;
        settings?: WebClient.GVyberSmlouvyInitDto;
        filterOpts?: filterOptsType;
        smlouvyGrid?: JQuery;
        polozkyGrid?: JQuery;
        smlouvyTab?: JQuery;
        polozkyTab?: JQuery;
        souvisPol?: JQuery;
        smlGridOpts?: GGridOptions<Interface.GSmlapidDto>;
        smlPolGridOpts?: GGridOptions<Interface.GEkoVyberSmlouvyPolDto>;
        dialogResult: GVyberSmlouvyResult | JQueryPromise<GVyberSmlouvyResult>;
        smlPolFieldsCount: number;
        prepareContent(options: Gordic.Prefabs.Select.GEkoVyberSmlouvyOptions): void;
        data(filter: any): gjqXHR<Interface.GSmlapidDto[]> | undefined;
        smlPolData(vsechny: any, radky: any): JQuery.PromiseBase<Interface.GEkoVyberSmlouvyPolDto[], never, never, never, never, never, never, never, never, never, never, never> | undefined;
        createSmlouvyGridFormat<T>(): Data.GridFormat<any>;
        createPolozkyGridFormat<T>(): Data.GridFormat<any>;
        /**
         * default commandbar builder function
         * @returns {MenuParams[]} pole akci - vyber / zrusit
         */
        defaultCommandBar(): MenuParams[];
        filterData(ev?: any, ctx?: any): void;
        createGrid(defaultFilter: Gordic.Prefabs.Select.GEkoVyberSmlouvyInitFilter): void;
        initFilterAndLoadData(filterOpts: filterOptsType | undefined, filterPanelElement: JQuery, defaultFilter: Gordic.Prefabs.Select.GEkoVyberSmlouvyInitFilter): void;
        getPreviewOptions(): Gordic.Previews.GPreviewControllerOptions;
        getPolozkyGridSelection(reduced?: boolean): GEkoVyberSmlouvyPolDto[];
        getSmlouvyGridSelection(reduced?: boolean): Interface.GSmlapidDto[];
        returnResult(data?: GVyberSmlouvyResult | JQueryPromise<GVyberSmlouvyResult>): void;
        closing(data?: GVyberSmlouvyResult | JQueryPromise<GVyberSmlouvyResult>): JQuery.PromiseBase<any, never, never, never, never, never, never, never, never, never, never, never> | GVyberSmlouvyResult | JQueryPromise<GVyberSmlouvyResult>;
        updatePolozky: ((this: GVyberSmlouvy, vsechny: any, polozky: any) => void) & {
            cancel: () => void;
            flush: () => void;
            pending: () => boolean;
        };
        createFilterForm(): Forms.Form;
        static transformUex(currentUex: string | string[] | ObjectLiteral<string>, rozsirenaVeta: boolean): string[];
        static prepareInputDtoAndDefaultFilter(options: Gordic.Prefabs.Select.GEkoVyberSmlouvyOptions, rozsirenaVeta: boolean): {
            inputDto: Gordic.Prefabs.Select.GEkoVyberSmlouvyInputDto;
            defaultFilter: Gordic.Prefabs.Select.GEkoVyberSmlouvyInitFilter;
        };
        static getDefaultFilter(): Gordic.Prefabs.Select.GEkoVyberSmlouvyInitFilter;
        static prepareFilter(currentFilter: any, defaultFilters: any, prijmyValue: any): JQuery.PromiseBase<any, never, never, never, never, never, never, never, never, never, never, never>;
    }
    export {};
}
declare namespace Gordic.Eko.WebClient {
    class GVyberZUloh extends GContentBase implements IGContent, IGClientContent {
        private readonly classGrid;
        private readonly classFilter;
        private typSource;
        private options;
        private $filterPanel;
        private subtasks;
        onContentReady(): void;
        prepareContent(options: GInputZUlohDto): void;
        /**
         * Inicializace kontextu
         *
         */
        Inicializace(): void;
        /**
         * Vytvoreni subtasku
         * @param task
         * @returns
         */
        private createSubTask;
        /**
         * Schovani vsech kontrolu
         *
         */
        private hideAllControl;
        /**
         * Vytvoreni commandbaru
         *
         */
        private createCommandBar;
        /**
         *
         * Nastaveni titulku okna
         *
         */
        private setTitle;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        private createFilterPanel;
        /**
         * Nacteni dat
         * @returns
         */
        private reloadData;
        /**
         * Nacteni roku
         * @returns
         */
        private getRok;
        /**
        * function CreateFilterZalozka
        *
        * Obecna zalozka
        * @param {GContent} content
        * @returns {any}
        */
        private createFilterZalozka;
        /**
         * Vraci objekt filtru
         * @param {GContent} content
         * @returns
         */
        private getFilter;
        /**
         * Subtaska
         * @returns
         */
        private getSubtaska;
        /**
         * Nacteni dat
         *
         */
        private loadData;
        /**
         * Zmena zdroje
         * @param source
         */
        private changeSelect;
        /**
         * Zviditelneni/ skryti poli dle zdroje dat
         * @param akce
         * @returns
         */
        private showHide;
        /**
         * Vraci tridu gridu
         *
         */
        private getClassGrid;
        /**
         * Vraci tridu gridu
         *
         */
        private getClassFilter;
        /**
         * Vraci objekt gridu
         * @param content
         * @returns
        */
        private getGrid;
        /**
         * Vytvoreni gridu
         *
         */
        private createGrid;
        /**
         * Vytvoreni gridformatu
         * @returns
         */
        private createGridFormat;
        /**
         * Vytvoreni akci
         *
         */
        private createActions;
        /**
         * Typ ulohy, pro kterou zobrazuji data
         * @returns
         */
        private getUloha;
    }
}
declare namespace Gordic.Eko {
    class GNovaVazba extends GContentBase {
        grid: null | JQuery;
        filterpanel: null | JQuery;
        selected_typ_ag?: null | number;
        InputDto: Eko.WebClient.GNovaVazbaInputDto;
        defaultFilter: ObjectLiteral<any>;
        openDetail?: (dto: Gordic.Eko.Interface.GVazbaDokladuDto) => JQuery.Promise<boolean>;
        gridFormatMethod(default_typ_ag?: any): Data.GridFormat<any>;
        onContentReady(): void;
        _getFilterForm(typ_ag?: any): Forms.Form;
        _createFilterForm(): Forms.Form;
        _createFucFilterForm(typAg: any): Forms.Form;
        _loadGrid(def: any): void;
        createGridFormat(): Data.GridFormat<any>;
        createFucGridFormat(): Data.GridFormat<any>;
        createMajetekGridFormat(): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Eko {
    type _zapisyCacheEntry = {
        title: string;
        tab: JQuery;
        isRez: boolean;
        loadedParams: string;
        totalCount: number;
        counts: ObjectLiteral<number>;
    };
    export class GVazby extends GContentBase {
        _title: string;
        grid: JQuery | null;
        currentLoadedTabData: string | null;
        gridFormatMethod: (this: GVazby) => Gordic.Data.GridFormat;
        isPripad: boolean;
        gridHeight: number;
        hasChanged: boolean;
        subTasks: JQuery;
        isLoadedPripad: boolean;
        typ_ag: number;
        guid: number;
        InputDto: Gordic.Eko.WebClient.GVazbyInputDto;
        vazby: Gordic.Eko.WebClient.GVazbyResponseDto;
        zapisyCache: {
            uct: _zapisyCacheEntry;
            rez: _zapisyCacheEntry;
        };
        openDetail?: (this: GContent, dto: Gordic.Eko.Interface.GVazbaDokladuDto) => JQuery.Promise<boolean>;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        closingFunc(): JQuery.Promise<any, any, any>;
        /**
         * Funkce pro spusteni v onContentREady
         *
         */
        init(): void;
        _createTab(cache: _zapisyCacheEntry, isEmpty: boolean): void;
        _getDefaultRow(): {
            typ_ag_sek: number | null | undefined;
            ixp_sek: string;
            isFuc: boolean | null | undefined;
        };
        _getZapisyServerParams(isRezervace: any, isPripad: any, row: Gordic.Eko.Interface.GVazbaDokladuDto, zapisy: any, InputDto: Eko.WebClient.GVazbyInputDto): {
            InputDto: WebClient.GZapisyInputDto;
        };
        _loadZapisy(data?: any, isFirstLoad?: boolean): void;
        createVazbyGridFormat(): Data.GridFormat<any>;
    }
    export {};
}
declare namespace Gordic.Eko.WebClient {
    /**
     * Input for GVazbyNaDoklad
     *
     * @author Vlastimil Máca
     * @since 482.1.0.77
     */
    interface IGVazbyNaDokladInput {
        ix: string;
        vazby: IGVazbaNaDokladProvider[];
    }
    /**
     * Interface for binding to document provider
     *
     * @author Vlastimil Máca
     * @since 482.1.0.77
     */
    interface IGVazbaNaDokladProvider {
        /**
         * Id of binding to document
         * usually name of agenda in lowercase
         * @type {string}
         */
        id: string;
        /**
         * Caption which will be displayed in switch panel
         * @type {string}
         */
        caption: string;
        /**
         *  Caption, which will be visible in header of slave grid
         * @type {string}
         */
        masterGridCaption: string;
        /**
         * Caption, which will be visible in header of slave grid
         * @type {string}
         */
        slaveGridCaption: string;
        /**
         * Function which returns count of rows in master grid
         * @param {string} ix identifier from calling parent
         * @returns {JQueryPromise<number>}
         */
        count: (ix: string) => JQueryPromise<number>;
        /**
         * Function which loads data for master grid
         * @param {string} ix identifier from calling parent
         * @returns {Gordic.Data.View} Data.View which can be created with promise
         */
        loadMaster: (ix: string) => Gordic.Data.View;
        /**
         * Function which loads data into slave grid, based on master row
         * @param {string} ix identifier from calling parent
         * @returns {Gordic.Data.View} Data.View which can be created with promise
         */
        loadSlave: (masterRow: any) => Gordic.Data.View;
        /**
         * Function which returns GridFormat for master grid
         * @type {(ix: string)}
         * @returns {JQueryPromise<Gordic.Data.GridFormat>}
         */
        masterGridFormat: (ix: string) => JQueryPromise<Gordic.Data.GridFormat>;
        /**
         * Function which returns GridFormat for slave grid
         * @param {string} ix identifier from calling parent
         * @returns {JQueryPromise<Gordic.Data.GridFormat>}
         */
        slaveGridFormat: (ix: string) => JQueryPromise<Gordic.Data.GridFormat>;
    }
    class GVazbyNaDoklady extends GContentBase implements IGVazbyNaDokladInput {
        private buttonPanel;
        private gridPanel;
        private masterGrid;
        private slaveGrid;
        ix: string;
        vazby: IGVazbaNaDokladProvider[];
        private lastOpenState;
        private isLoading;
        prepareContent(input: IGVazbyNaDokladInput): void;
        loadVazby(input: IGVazbyNaDokladInput, activeItem?: number): void;
        private prepareBindingMenuParam;
        /**
         * Perform visual and data switch to new document binding provider
         *
         * @param {IGVazbaNaDokladProvider} bindingProvider document binding provider
         */
        private activateProvider;
        /**
         * Function which is run on change of row in master grid
         * @param bindingProvider Current active binding provider
         * @param selection Current master grid selection
         */
        private loadSlave;
        /**
         * Sets action to checked true and others to checked false
         * @param actionName action to check
         */
        private setActionActive;
        /**
         * Updates badge value with data from binding provider
         * @param bindingProvider
         * @param badge
         */
        private updateBadge;
    }
}
declare namespace Gordic.Eko.WebClient {
    /** Seznam funkcí pro Visitora pro Věcný profil pro detail */
    interface IGVecnyProfilDetail<TDto> {
        /**
         * Nastavení nového stavu položky Věcného profilu v statusbaru
         * @param newStatus Nový stav položky Věcného profilu
         */
        setStatusBarStav(newStatus: string): any;
        /** Objekt s events, které Věcný profil v průběhu vyvolává */
        vpEvents: GEvents;
    }
    /** Společný Detail Věcného profilu, které je možné rozšířit Visitory (ze seznamu) */
    class GVecnyProfilDetail extends GDetailBuilderContent<Gin.DetailBuilderComponents.GListControlsExtensions<any>> implements IGClientContent, IGVecnyProfilDetail<any> {
        onDetailBuilderBuild(builder: Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderInit(builder: Gin.DetailBuilder.GDetailBuilder): void;
        setStatusBarStav(newStatus: string): void;
        vpEvents: GEvents;
        uid: string;
        dao: IGVecnyProfilDAO;
        dto: any;
        /** Příznak, zda se jedná o nový řádek */
        newRow: boolean;
        /** Seznam s názvy primárních klíčů aktuální tabulky */
        keys: string[];
        private $form;
        private statusBarStav;
        closing(): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any> | undefined;
        prepareContent(opts: any): void;
        init(): void;
        /**
         * Refresh dat s možností předání nového dto
         * @param dto Případné nové dto, které má být použito
         */
        refresh(dto?: any): JQuery.Promise<any, any, any>;
        /** Vytvoření akcí detailu */
        createActions(): {
            actNovy: GActionParamsDefObj;
            actEvidovat: GActionParamsDefObj;
            actSchvalit: GActionParamsDefObj;
            actStornovat: GActionParamsDefObj;
            actZrusitStorno: GActionParamsDefObj;
            actZavrit: GActionParamsDefObj;
        };
        /** Vytvoření menubaru z akcí */
        createMenuBar(): string[];
        /** Vytvoření formuláře detailu */
        createForm(): void;
        /** Akce uložení položky detailu */
        private actSave;
        /**
         * Vykonání aktivních operací
         * @param operation Typ aktivní operace
         */
        private operationActionRun;
    }
}
declare namespace Gordic.Eko.WebClient {
    /**
     * DAO pro Věcný profil
     */
    interface IGVecnyProfilDAO {
        /**
         * Načtení seznamu očekávájící promise se seznamem položek VP
         * @param parentContent Content věcného profilu
         * @param dto Dto s Věcným profilem
         * @param opts Dodatečné parametry
         */
        list(parentContent: GContent, dto: any, opts?: {}): JQuery.Promise<any[]>;
        /**
         * Evidence položky VP očekávající promise s modifikovaným Dto
         * @param parentContent Content detailu
         * @param dto Dto s Věcným profilem
         * @param opts Dodatečné parametry
         */
        evidovat(parentContent: GContent, dto: any, opts?: {}): JQueryPromise<any>;
        /**
         * Schválení položky VP očekávající promise s modifikovaným Dto
         * @param parentContent Content detailu
         * @param dto Dto s Věcným profilem
         * @param opts Dodatečné parametry
         */
        schvalit(parentContent: GContent, dto: any, opts?: {}): JQueryPromise<any>;
        /**
         * Storno položky VP očekávající promise s modifikovaným Dto
         * @param parentContent Content detailu
         * @param dto Dto s Věcným profilem
         * @param opts Dodatečné parametry
         */
        stornovat(parentContent: GContent, dto: any, opts?: {}): JQueryPromise<any>;
        /**
         * Zrušení storna položky VP očekávající promise s modifikovaným Dto
         * @param parentContent Content detailu
         * @param dto Dto s Věcným profilem
         * @param opts Dodatečné parametry
         */
        zrusitStorno(parentContent: GContent, dto: any, opts?: {}): JQueryPromise<any>;
        /**
         * Hromadná kontrola oprávnění operace položek VP (wizard). Očekává promise s GServiceGroupResponse s výsledkem.
         * @param parentContent Content seznamu
         * @param dtos Seznam dto s položkami věcného profilu
         * @param operace Typ operace, která má být nad záznamy zkontrolována
         * @param opts Dodatečné parametry
         */
        hromadnaKontrolaOpravneni(parentContent: GContent, dtos: any[], operace: Gordic.Eko.Interface.GVecnyProfilOperace, opts?: {}): JQueryPromise<Isl.GServiceGroupResponse<any>>;
        /**
         * Hromadná operace nad položkami VP (wizard). Očekává promise s GServiceGroupResponse s výsledkem.
         * @param parentContent Content seznamu
         * @param dtos Seznam dto s položkami věcného profilu
         * @param operace Typ operace, která má být nad záznamy provedena
         * @param opts Dodatečné parametry
         */
        hromadnaOperace(parentContent: GContent, dtos: any[], operace: Gordic.Eko.Interface.GVecnyProfilOperace, opts?: {}): JQueryPromise<Isl.GServiceGroupResponse<any>>;
        /**
         * Vytvoření základu nového záznamu (položky). Očekává na výstupu promise s novým Dto.
         * @param parentContent Aktuální content (seznam/detail)
         * @param opts Dodatečné parametry
         */
        vytvoritNovouPolozku(parentContent: GContent, opts?: {}): JQueryPromise<any>;
        destroy(): void;
    }
    /** Předpis Visitora pro Věcný profil*/
    interface IGVecnyProfilVisitor {
        /**
         * Samotná funkce návštěvy Visitora
         * @param content Visitor dědící IGVecnyProfilSeznam
         */
        visit(content: IGVecnyProfilSeznam<any>): void;
    }
    /** Seznam funkcí pro Visitora pro Věcný profil (seznam) */
    interface IGVecnyProfilSeznam<TDto> {
        /**
         * Přijmutí předaného Visitora a spuštění jeho funkce visit()
         * @param visitor Visitor Věcného profilu
         */
        accept(visitor: IGVecnyProfilVisitor): any;
        /**
         * Nastavení view do gridu
         * @param newView View pro setnutí do gridu
         */
        setView(newView: Data.View): any;
        /**
         * Nastavení DAO contentu Věcného profilu pro volání isl funkcí
         * @param dao
         */
        setDao(dao: Gordic.Eko.WebClient.IGVecnyProfilDAO): any;
        /** Získání aktuálního selection gridu */
        getSelection(): MetaRow<TDto>[];
        /** Objekt s events, které Věcný profil v průběhu vyvolává */
        vpEvents: GEvents;
    }
    /** Společný content (seznam) Věcného profilu, které je možné rozšířit Visitory */
    class GVecnyProfilSeznam extends GContentBase implements IGClientContent, IGVecnyProfilSeznam<any> {
        accept(visitor: IGVecnyProfilVisitor): void;
        refresh(): void;
        setView(newView: Data.View<any>): void;
        setDao(dao: Gordic.Eko.WebClient.IGVecnyProfilDAO): void;
        getSelection(): MetaRow<any>[];
        vpEvents: GEvents;
        uid: string;
        dao: IGVecnyProfilDAO;
        /** Seznam s názvy primárních klíčů aktuální tabulky */
        keys: string[];
        private $grid;
        private gridFormat;
        private datachanged;
        closing(): boolean;
        prepareContent(opts: any): void;
        init(): void;
        /** Vytvoření akcí */
        createActions(): void;
        /** Vytvoření menubaru */
        createMenuBar(): void;
        /** Vytvoření commandbaru */
        createCommandBar(): void;
        /** Vytvoření gridu */
        createGrid(): void;
        /** Vytvoření gridformátu gridu */
        protected createGridFormat(): Data.GridFormat;
        /**
         * Spuštění aktivní operace nad záznamem/y
         * @param operation Typ operace
         */
        private operationRun;
        /**
         * Získání titilku nebo popisu hromadné operace
         * @param operation Aktuální operace
         * @param title Příznak, zda se jedná o titulek nebo popis
         */
        private getTitleOrDescription;
        /**
         * Otevření detailu záznamu
         * @param ctx parametry
         */
        private openDetail;
    }
}
declare namespace Gordic.Eko.WebClient {
    /**Dialog s doplňujicími údaji pro zahraniční platby */
    class GZahranicniPlatby extends GContentBase {
        /**Identifikátor dokladu*/
        ixp: string;
        /**Externí subjekt*/
        ixs_esu: string;
        /**Bankovní účet příjemce */
        bu_ci: string;
        /**Kód banky příjemce */
        sk_ci: string;
        /**Bankovní účet vlastní */
        bu_vl: string;
        /**Kód banky vlastní */
        sk_vl: string;
        /**Měna úhrady */
        mena: number;
        /**Měna vybraná k platbě (např z formu Uhradit) */
        mena_poz: number;
        /**Variabilní symbol */
        vs: string;
        /**Způsob platby */
        zp: number;
        /**Datum splatnosti */
        dat_spl: Date | JsonDate;
        /**Rok */
        rok: number;
        /**Mód */
        mod: number;
        /**ReadOnly příznak - TRUE - pouze náhledové okno, nic nebude editovatelné */
        read_only: boolean;
        /**Políčko Informace pro příjemce - BPL nevyužívá standardní ukládání popisů, abych si to načetl z DB */
        popis: string;
        /** Data*/
        private data;
        /** Vstupní bu_ci před případným převedení na IBAN (potřeba pro read v ISL kontrole)*/
        private bu_ci_input;
        /** View s KPI podmínek euroúhrady*/
        private viewPodEuroUhrady;
        /**Formulář */
        private $form;
        onContentReady(): void;
        /** Vytvoření akcí pro tlačítka */
        private createActions;
        /** Vytvoření commandbaru */
        private createCommandBar;
        /**Vytvoření formuláře*/
        private createForm;
        /**Akce Ok */
        private ok;
        /**
         * Zopakování volání ISL metody při chybě, pokud má být speciálně ošetřena
         *
         * @param {any} conditionalRequestModification
         * @returns {any}
         */
        private repeatOnException;
    }
}
declare namespace Gordic.Eko {
    class GZapisy extends GContentBase {
        grid: JQuery | null;
        filterPanel: JQuery | null;
        currentFilter: any;
        subTasks: JQuery | null;
        nks_zkratka: string;
        InputDto: WebClient.GZapisyInputDto;
        rows: Gordic.Data.View;
        zapisy: WebClient.GZapisyResponseDto;
        typAg: number;
        gridFormatMethod(): Data.GridFormat<any>;
        onContentReady(): void;
        getDefaultFilter(): {
            kumulace: number;
            bezPap: boolean;
        };
        loadData(inputDto: any, filter: any): void;
        createZapisyGridFormatBezKumulace(nksZkratka: any): Data.GridFormat<any>;
        createZapisyGridFormatSKumulaci(nksZkratka: any): Data.GridFormat<any>;
        createFilterForm(): Forms.Form;
        createEditorGridFormat(nksZkratka: any, origData?: any): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Eko {
    enum GEkoBookVariant {
        year = "*rok",
        all = "*",
        userSelect = "?"
    }
}
declare namespace Gordic.Contexts {
    interface IGEkoBookContent<TDto = Eko.Interface.GEkosdenDto, TFilter = {
        ixp_den: string | null;
        rok: number | string | null;
    }> {
        ekoBook?: TDto;
        ekoBookFilter?: TFilter;
        enableAllBooks: boolean;
        enableYearBooks: boolean;
        setEkoBookBreadcrumbs: GContent['setBreadcrumbs'];
        ekoBookModifyBreadcrumbs: (book: TDto, enableAll: boolean, enableYear: boolean, breadcrumbs: BreadCrumb | BreadCrumb[] | null) => BreadCrumb[];
    }
    interface GEkoBookContentContext {
        book?: Eko.Interface.GEkosdenDto;
        bookFilter?: {
            ixp_den: string | null;
            rok: number | string | null;
        };
    }
    const GEkoBookSelector: {
        setEkoBookBreadcrumbs: (this: GContent & IGEkoBookContent, breadcrumbs?: BreadCrumb | BreadCrumb[] | null) => void;
        ekoBookModifyBreadcrumbs: (this: GContent & IGEkoBookContent, book: any, enableAll: any, enableYear: any, breadcrumbs: BreadCrumb | BreadCrumb[] | null) => BreadCrumb[];
    };
}
declare namespace Gordic.Eko.Prefabs {
    /**
 * Rozraní, které se použije pro přenos do contentu
 * @author pnovak
 * @since 480.1.0.46
 */
    interface IGNewReceiptNumberParams {
        /**
        * Odkaz na políčko
        * @type JQuery
        */
        field: JQuery;
    }
    class NewReceiptNumber extends GContentBase implements IGClientContent {
        private field;
        returnResult(result?: IGSubSequenceDto): void;
        prepareContent(params: IGNewReceiptNumberParams): void;
    }
    /**
     * DTO reprezentující hodnotu pro políčko rozddde doplněné o informaci, zda je číslo číslem dokladu
     * @author pnovak
     * @since 480.1.0.46
     */
    interface IGSubSequenceDto extends Gordic.Data.Readers.RozdddeDto {
        /**
        * Je číslem dokladu
        * @type boolean
        */
        isReceipt?: boolean;
        /**
        * Zobrazovaná validační zpráva
        * @type string
        */
        _validatationMsg?: string;
        /**
        * Validační stav
        * @type "verified" | "nonverified"
        */
        _validatationState?: "verified" | "nonverified";
    }
    /**
    * Prefab pro políčko subřady
    */
    function gsubsequence<T extends IGSubSequenceDto = IGSubSequenceDto>(): GSelectBoxOptions<T>;
    /**
    * Hromadné operace - doplňující dialog pro Předání dokladů
    *
    * @author mprosek
    * @since 488.1.0.0
    *
    * @param { PredaniDokladuOpts } opts Options dialogu
    * @returns {Forms.Form} Formulář s doplňujícími informacemi
    */
    function PredaniDokladuForm(opts: PredaniDokladuOpts): Gordic.Forms.Form;
    /**
    * Interface pro volání formuláře pro Předání dokladů v průvodci
    *
    * @author mprosek
    * @since 488.1.0.0
    *
    * @param { boolean } KompetentViditelnost TRUE = Pole Kompetent a Realizátor bubou viditelná, FALSE = Pole Kompetent a Realizátor nebudou viditelná, DEFAULT = TRUE
    * @param { boolean } KompetentZmena Parametr EKO_RAD_ZMEKOM - TRUE = Zaškrtávátko na Změnu kompetenta bude přístupné, FALSE = Zaškrtávátko na Změnu kompetenta bude nepřístupné, DEFAULT = FALSE
    * @param { boolean } SouvisejiciViditelnost TRUE = Zaškrtávátko pro změnu souvisejících dokumentů bude viditelné, FALSE = Zaškrtávátko pro změnu souvisejících dokumentů nebude viditelné, DEFAULT = FALSE
    * @param { boolean } SouvisejiciZmena TRUE = Zaškrtávátko na Změnu zpracovatele i u souvisejících dokumentů bude přístupné, FALSE = Zaškrtávátko na Změnu zpracovatele i u souvisejících dokumentů bude nepřístupné, DEFAULT = TRUE
    * @param { any } StartFiltrZpracovatel Startovací filtry pro políčka - ZPRACOVATEL
    * @param { any } StartFiltrKompetent Startovací filtry pro políčka - KOMPETENT
    * @param { string } RezimProvozu Režimu provozu - primárně pro BPL(speciální chování pro Režim provozu = Uzivatel)
    */
    interface PredaniDokladuOpts {
        KompetentPrefab?: Partial<GSelectBoxOptions<any>>;
        KompetentViditelnost?: boolean;
        KompetentZmena?: boolean;
        SouvisejiciViditelnost?: boolean;
        SouvisejiciZmena?: boolean;
        StartFiltrZpracovatel?: ObjectLiteral<any>;
        StartFiltrKompetent?: ObjectLiteral<any>;
        Duvod?: string;
        RezimProvozu?: string;
    }
    /**
    * Hromadné operace - doplňující dialog pro Přidělení dokladů
    *
    * @author mprosek
    * @since 488.1.0.0
    *
    * @param { PrideleniDokladuOpts } opts Options dialogu
    * @returns {Forms.Form} Formulář s doplňujícími informacemi
    */
    function PrideleniDokladuForm(opts: PrideleniDokladuOpts): Gordic.Forms.Form;
    /**
    * Interface pro volání formuláře pro Přidělení dokladů v průvodci
    *
    * @author mprosek
    * @since 488.1.0.0
    *
    * @param { boolean } KompetentViditelnost TRUE = Pole Kompetent a Realizátor bubou viditelná, FALSE = Pole Kompetent a Realizátor nebudou viditelná, DEFAULT = TRUE
    * @param { boolean } KompetentZmena Parametr EKO_RAD_ZMEKOM - TRUE = Zaškrtávátko na Změnu kompetenta bude přístupné, FALSE = Zaškrtávátko na Změnu kompetenta bude nepřístupné, DEFAULT = FALSE
    * @param { boolean } SouvisejiciViditelnost TRUE = Zaškrtávátko pro změnu souvisejících dokumentů bude viditelné, FALSE = Zaškrtávátko pro změnu souvisejících dokumentů nebude viditelné, DEFAULT = FALSE
    * @param { boolean } SouvisejiciZmena TRUE = Zaškrtávátko na Změnu zpracovatele i u souvisejících dokumentů bude přístupné, FALSE = Zaškrtávátko na Změnu zpracovatele i u souvisejících dokumentů bude nepřístupné, DEFAULT = TRUE
    * @param { any } StartFiltrZpracovatel Startovací filtry pro políčka - ZPRACOVATEL
    * @param { any } StartFiltrKompetent Startovací filtry pro políčka - KOMPETENT
    * @param { string } RezimProvozu Režimu provozu - primárně pro BPL(speciální chování pro Režim provozu = Uzivatel)

    */
    interface PrideleniDokladuOpts {
        KompetentPrefab?: Partial<GSelectBoxOptions<any>>;
        KompetentViditelnost?: boolean;
        KompetentZmena?: boolean;
        SouvisejiciViditelnost?: boolean;
        SouvisejiciZmena?: boolean;
        StartFiltrZpracovatel?: ObjectLiteral<any>;
        StartFiltrKompetent?: ObjectLiteral<any>;
        Duvod?: string;
        RezimProvozu?: string;
    }
    /**
    * Hromadné operace - doplňující dialog pro Převzetí dokladů
    *
    * @author mprosek
    * @since 488.1.0.0
    *
    * @param { PrevzetiDokladuOpts } opts Options dialogu
    * @returns {Forms.Form} Formulář s doplňujícími informacemi
    */
    function PrevzetiDokladuForm(opts: PrevzetiDokladuOpts): Gordic.Forms.Form;
    /**
    * Interface pro volání formuláře pro Převzetí dokladů v průvodci
    *
    * @author mprosek
    * @since 488.1.0.0
    *
    * @param { string } AktualniPrihlasenyZpracovatel Aktuálně přihlášený zpracovatel, který doklad převezme
    * @param { boolean } KompetentViditelnost TRUE = Pole Kompetent a Realizátor bubou viditelná, FALSE = Pole Kompetent a Realizátor nebudou viditelná, DEFAULT = TRUE
    * @param { boolean } KompetentZmena Parametr EKO_RAD_ZMEKOM - TRUE = Zaškrtávátko na Změnu kompetenta bude přístupné, FALSE = Zaškrtávátko na Změnu kompetenta bude nepřístupné, DEFAULT = FALSE
    * @param { boolean } SouvisejiciViditelnost TRUE = Zaškrtávátko pro změnu souvisejících dokumentů bude viditelné, FALSE = Zaškrtávátko pro změnu souvisejících dokumentů nebude viditelné, DEFAULT = FALSE
    * @param { boolean } SouvisejiciZmena TRUE = Zaškrtávátko na Změnu zpracovatele i u souvisejících dokumentů bude přístupné, FALSE = Zaškrtávátko na Změnu zpracovatele i u souvisejících dokumentů bude nepřístupné, DEFAULT = TRUE
    * @param { any } StartFiltrKompetent Startovací filtry pro políčka - KOMPETENT
    * @param { string } RezimProvozu Režimu provozu - primárně pro BPL(speciální chování pro Režim provozu = Uzivatel)

    */
    interface PrevzetiDokladuOpts {
        KompetentPrefab?: Partial<GSelectBoxOptions<any>>;
        AktualniPrihlasenyZpracovatel: string;
        KompetentViditelnost?: boolean;
        KompetentZmena?: boolean;
        SouvisejiciViditelnost?: boolean;
        SouvisejiciZmena?: boolean;
        StartFiltrKompetent?: ObjectLiteral<any>;
        Duvod?: string;
        RezimProvozu?: string;
    }
    /**
    * Hromadné operace - doplňující dialog pro Přeevidenci dokladů
    *
    * @author mprosek
    * @since 486.1.0.0
    *
    * @param { PreevidenceDokladuOpts } opts Options dialogu
    * @returns {Forms.Form} Formulář s doplňujícími informacemi
    */
    function PreevidenceDokladuForm(opts: PreevidenceDokladuOpts): Gordic.Forms.Form;
    /**
    * Interface pro volání formuláře pro Přeevidence dokladů v průvodci
    *
    * @author mprosek
    * @since 486.1.0.0
    *
    * @param { boolean } KompetentViditelnost TRUE = Pole Kompetent a Realizátor bubou viditelná, FALSE = Pole Kompetent a Realizátor nebudou viditelná, DEFAULT = TRUE
    * @param { boolean } KompetentZmena Parametr EKO_RAD_ZMEKOM - TRUE = Zaškrtávátko na Změnu kompetenta bude přístupné, FALSE = Zaškrtávátko na Změnu kompetenta bude nepřístupné, DEFAULT = FALSE
    * @param { any } StartFiltrKniha Startovací filtry pro políčko dialogu - KNIHA
    * @param { any } StartFiltrZpracovatel Startovací filtry pro políčka - ZPRACOVATEL
    * @param { any } StartFiltrKompetent Startovací filtry pro políčka - KOMPETENT
    * @param { string } RezimProvozu Režimu provozu - primárně pro BPL(speciální chování pro Režim provozu = Uzivatel)
    */
    interface PreevidenceDokladuOpts {
        KompetentPrefab?: Partial<GSelectBoxOptions<any>>;
        KompetentViditelnost?: boolean;
        KompetentZmena?: boolean;
        ZpracovatelAktualni?: string;
        StartFiltrKniha?: ObjectLiteral<any>;
        StartFiltrZpracovatel?: ObjectLiteral<any>;
        StartFiltrKompetent?: ObjectLiteral<any>;
        Duvod?: string;
        RezimProvozu?: string;
        ZpracovatelZmena?: boolean;
    }
}
/**
 * Sdílené metody pro práci s filtry v EKO modulech
 *
 * @author Martin Boček
 * @since 484.1.0.86
 */
declare namespace Gordic.Eko.Filters {
    /**
     * Vytvoření standardních parametrů filterpanelu pro EKO moduly
     *
     * @param {Gordic.Forms.Form[]} forms formuláře s definicí filtračních položek
     * @param {null | string[]} [favorites] oblíbené položky filtru
     * @param {null | string} [tema] téma
     * @param {null | string | string[] | Gordic.Widget.filterpanelFilterOptions<TData> | (Gordic.Widget.filterpanelFilterOptions<TData>)[]} [filterVlastni] sloupec z DTO pro filtr "*vlastní" (pokud je zadáno pole o jednom prvku, bere se, že políčko je typu multi) nebo null, pokud nemá být; je možné předat i kompletní filtry (jeden nebo více), ty se pak použijí bez úprav a jeden z nich musí mít příznak, že je defaultní
     * @param {null | ((ev: JQuery.TriggeredEvent, o: { filter?: null | TData; }) => void)} [apply] metoda pro načtení seznamu
     * @param {null | TData} [hardFilter] pevný filtr
     * @param {null | boolean} [navigatorInDetail] zobrazit navigátor v detailu filtru?
     * @param {null | GContent} [gcontent] content
     * @returns {IGFilterPanelOptions<TData>} výsledné parametry filterpanelu
     */
    function getFilterParams<TData>(forms: Gordic.Forms.Form[], favorites?: null | string[], tema?: null | string, filterVlastni?: null | string | string[] | Gordic.Widget.filterpanelFilterOptions<TData> | (Gordic.Widget.filterpanelFilterOptions<TData>)[], apply?: null | ((ev: JQuery.TriggeredEvent, o: {
        filter?: null | TData;
    }) => void), hardFilter?: null | TData, navigatorInDetail?: null | boolean, gcontent?: null | GContent): IGFilterPanelOptions<TData>;
    /**
     * Prefab (třířádkový) pro trojici platebních symbolů
     *
     * @param {string} [prefix] případný prefix ke jménům prvku, která jsou vs, ks a ss
     * @returns {Forms.FormRow[]} řádky formu s prefabem
     */
    function prefabVsKsSs(prefix?: string): Forms.FormRow[];
    /**
     * Prefab (dvouřádkový) pro dvojici agendové a evidenční číslo
     *
     * @param {string} [prefix] případný prefix ke jménům prvků, která jsou ac_ag a ac
     * @returns {Forms.FormRow[]} řádky formu s prefabem
     */
    function prefabAgEvCislo(prefix?: string): Forms.FormRow[];
    /**
     * Prefab pro číslo dokladu
     *
     * @param {string} [prefix] případný prefix ke jménu prvku, které je ac_ixe
     * @returns {Forms.FormRow[]} řádky formu s prefabem
     */
    function prefabCisloDokladu(prefix?: string): Forms.FormRow[];
    /**
     * Vrátí operátory pro textové filtry s operátory
     *
     * @returns {Prefabs.String.IGStringPrefabsOptions} povolené operátory včetně defaultního operátory
     */
    function getStringOperators(): Gordic.Prefabs.String.IGStringPrefabsOptions;
}
declare namespace Gordic.Eko.Filters {
    export interface GInDialogFilter {
        name?: string;
        model?: string;
        disabled?: boolean;
        caption?: string;
        dialogOptions?: GDlgOptions;
    }
    export interface GIntervalFilterOptions<T = GSingleInputBoxOptions<any>> extends GInDialogFilter {
        firstField?: T;
        secondField?: T;
    }
    export interface ServerFilterOptions extends Forms.FormField {
    }
    export interface IGModelDefaults {
        ico?: string;
        aktivita?: string;
        aktProhl?: number;
    }
    export interface IGUusModelDefaults extends IGModelDefaults {
        ucs: string;
    }
    export interface IGAcModelDefaults extends IGModelDefaults {
        rok: number;
        acLength: number;
        typ: number;
    }
    export interface IGFormatIntervalValueElementOptions {
        caption?: string;
        wildcard?: string;
        /** Zarovnani hodnoty @default = "left" */
        align?: "left" | "center" | "right";
        formatter?: (v: any) => string;
    }
    export class Utils {
        static filterEmptyValueClassName: string;
        static filterEmptyValue: string;
        static formatIntervalValueElement(int?: GIntervalDto<any> | null, options?: IGFormatIntervalValueElementOptions): HTMLElement;
        static formatEmptyValue(caption?: string): HTMLElement;
        static formatIntervalTooltip(int?: GIntervalDto<any> | null, withOperator?: boolean, wildcard?: string): string;
        static formatIntervalValue(int?: GIntervalDto<any> | null, wildcard?: string, align?: "left" | "center" | "right", formatter?: (v: any) => string): string;
        static createDefaultModel(opts: Gordic.Eko.WebClient.GFilterOptionDto): IGModelDefaults;
        static getFormBoxFilterDefaults(options: GInDialogFilter): {
            name: string | undefined;
            customClass: string;
            mode: string;
            verticalButtons: boolean;
            strict: boolean;
            itemTemplate: (v: any) => HTMLElement;
            itemTooltipTemplate: typeof Utils.formatIntervalTooltip;
            invalidTransform: (s: any) => {
                start: any;
                end: any;
            };
            renderEmpty: boolean;
            dialogOptions: {
                width: number;
                commandBarTabIndex: number;
                commandBar: ({
                    action: GAction;
                    align: string;
                } | {
                    action: string;
                    align?: undefined;
                })[];
            };
        };
        static copyValue(ev: JQueryEventObject, o: any): void;
        private static cfuKeyDownUete0Regex;
        private static cfuKeyDownUete1And2Regex;
        private static cfuInputUete0Regex;
        private static cfuInputUete1And2Regex;
        private static cfuErrorMessage;
        private static cfuUeteErrorMessage;
        static inputToUpperCaseFunc(this: HTMLElement, ev: JQuery.Event | JQueryEventObject, options?: {
            checkUete?: number;
            wildcard?: string;
        }): void;
        static paddValue(val: string, maxLength: number): string;
        /** Nastavi defaulty pro intervalova policka */
        static ensureIntervalFieldsDefaults(options: GIntervalFilterOptions): void;
    }
    export function stringInterval(options: GIntervalFilterOptions<GStringBoxOptions>): ServerFilterOptions;
    export function decimalInterval(options: GIntervalFilterOptions<GNumberBoxOptions<Decimal>>): ServerFilterOptions;
    export function integerInterval(options: GIntervalFilterOptions<GNumberBoxOptions<number>>): ServerFilterOptions;
    export function dateInterval(options: GIntervalFilterOptions<GDateBoxOptions>): ServerFilterOptions;
    export function stringSingle(options: Gordic.Eko.WebClient.GFilterLabeledOptionDto): ServerFilterOptions;
    /** Formatovana celltemplate pro pouziti napr. v elementech */
    export function singleCellTemplate(prop: string, v?: object): string;
    export function drd(options: Gordic.Eko.WebClient.GFilterOptionDrdDto): ServerFilterOptions;
    export function nksInterval(options: Gordic.Eko.WebClient.GFilterOptionDto & GIntervalFilterOptions<GSelectBoxOptions<Gordic.Data.Readers.EkosnksDto>>): ServerFilterOptions;
    export function ucsInterval(options: Gordic.Eko.WebClient.GFilterOptionDto & GIntervalFilterOptions<GSelectBoxOptions<Gordic.Data.Readers.EkosucsDto>>): ServerFilterOptions;
    export function uusInterval(options: Gordic.Eko.WebClient.GFilterOptionUusDto & GIntervalFilterOptions<GSelectBoxOptions<Gordic.Data.Readers.EkosuusDto>>): ServerFilterOptions;
    export function acInterval(options: Gordic.Eko.WebClient.GFilterOptionAcDto & GIntervalFilterOptions<GSelectBoxOptions<Gordic.Data.Readers.UctdddeDto>>): ServerFilterOptions;
    export interface IGFilterOptionIssTyp extends Gordic.Eko.WebClient.GFilterLabeledOptionDto {
        model: string;
        caption: string;
    }
    export function sslTypInterval(options: IGFilterOptionIssTyp & GIntervalFilterOptions<GSelectBoxOptions<Gordic.Data.Readers.SslstypDto>>): ServerFilterOptions;
    interface IGZdData {
        l: string;
        v: number | null;
    }
    export function zdInterval(options: Gordic.Eko.WebClient.IGFilterOptionZd & GIntervalFilterOptions<GSingleInputBoxOptions<IGZdData>>): ServerFilterOptions;
    export namespace ZdUtils {
        function zdGetLabel(zd: number | undefined): string;
        function zdGetValue(label: string | undefined): number;
    }
    export function status(options: Gordic.Eko.WebClient.GFilterLabeledOptionDto): ServerFilterOptions;
    export function yesNo(options: Gordic.Eko.WebClient.GFilterLabeledOptionDto): ServerFilterOptions;
    export function ixp(options: Gordic.Eko.WebClient.GFilterLabeledOptionDto): ServerFilterOptions;
    export function ixpCellTemlate(caption: string, d?: {
        ixp?: string | null;
        ixp_s?: boolean | null;
    } | null): string;
    export type CfuIntervalOptions = Gordic.Eko.WebClient.IGFilterOptionCfu & GIntervalFilterOptions<GSelectBoxOptions<string>>;
    export type EkoFilterOptions = ServerFilterOptions & {
        ekoFilterOptions: () => CfuIntervalOptions;
    };
    export function cfuInterval(options: CfuIntervalOptions): EkoFilterOptions;
    export function rarInterval(options: Gordic.Eko.WebClient.IGFilterOptionRar & GIntervalFilterOptions<GSelectBoxOptions<Gordic.Data.Readers.EkosrarDto>>): ServerFilterOptions;
    export function icoInterval(options: Gordic.Eko.WebClient.IGFilterOptionIco & GIntervalFilterOptions<GSelectBoxOptions<Gordic.Data.Readers.EkosicoDto>>): ServerFilterOptions;
    export {};
}
declare namespace Foo {
    const Boo = "abc";
    interface GFilterOptionBase1Dto {
        /**Cesta k nazvu promenne ve filtru*/
        model: string;
    }
}
declare namespace Gordic.Search.Eko {
    /**
     * GBaseSearchResolver for EKO
     *
     * @author Vlastimil Máca
     * @since 488.1.0.93
    */
    abstract class GBaseEkoSearchResolver<TOpts extends Components.Search.IGSearchResolverOptions, TResponseDto extends Gordic.Eko.Interface.GSearchResponseDto<any, any>, TItemDto extends Gordic.Eko.Interface.GSearchItem<any>> extends Components.Search.GBaseSearchResolver<TOpts> {
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: Components.Search.IGSearchInput, task: Components.Search.GSearchResolveTask): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
        protected abstract getInputList(inputText: string): string[];
        protected abstract findForList(vsList: string[]): JQuery.Promise<TResponseDto[]>;
        protected abstract openDetailLocal(finding: TResponseDto, item: TItemDto): JQuery.Promise<any>;
        protected openDetailNewTab(finding: TResponseDto, item: TItemDto): JQuery.Promise<any>;
        protected createIconTemplate(item: TItemDto): IconTemplate;
        protected createSearchItem(inputList: string[], finding: TResponseDto, item: TItemDto): Components.Search.IGSearchResolverItem;
        protected calculateConfidence(inputList: string[], item: TItemDto): number;
        protected getDescriptionItems(item: TItemDto, iconTemplate: IconTemplate): Wfl.Interface.GIdentifikatorDalsiInformaceDto[];
        protected createDescription(item: TItemDto, iconTemplate: IconTemplate): string;
        protected createOpenLocalAction(finding: any, item: any): GAction;
        protected createOpenNewTabAction(finding: any, item: any): GAction;
        active(this: this & GEvents, opts: Components.Search.IGSetResolverOptions): void;
    }
}
declare namespace Gordic.Search.Eko {
    interface IGEkoAcAgSearchResolverOptions extends Components.Search.IGSearchResolverOptions {
        variants?: Gordic.Eko.Interface.GAcInfoDto[] | null;
        max_len?: number;
    }
    /**
     * GEkoAcAgSearchResolver
     *
     * @author Vlastimil Máca
     * @since 488.1.0.106
     */
    abstract class GEkoAcAgSearchResolver extends GBaseEkoSearchResolver<IGEkoAcSearchResolverOptions, Gordic.Eko.Interface.GSearchAcAgResponseDto, Gordic.Eko.Interface.GSearchAcAgItem> {
        protected variantTests: ((v: string) => boolean)[];
        constructor(opts?: IGEkoAcSearchResolverOptions);
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
        protected getInputList(acAg: any): any;
        protected calculateConfidence(acAgList: string[], item: Gordic.Eko.Interface.GSearchAcAgItem): number;
        protected getDescriptionItems(item: Gordic.Eko.Interface.GSearchAcAgItem, iconTemplate: IconTemplate): Wfl.Interface.GIdentifikatorDalsiInformaceDto[];
    }
}
declare namespace Gordic.Search.Eko {
    interface IGEkoAcSearchResolverOptions extends Components.Search.IGSearchResolverOptions {
        variants?: Gordic.Eko.Interface.GAcInfoDto[] | null;
        maxLength?: number;
    }
    function processAcVariants(maxLength: number, variants: Gordic.Eko.Interface.GAcInfoDto[]): ((v: string) => boolean)[];
    /**
     * GEkoAcSearchResolver
     *
     * @author Vlastimil Máca
     * @since 488.1.0.106
     */
    abstract class GEkoAcSearchResolver extends GBaseEkoSearchResolver<IGEkoAcSearchResolverOptions, Gordic.Eko.Interface.GSearchAcResponseDto, Gordic.Eko.Interface.GSearchAcItem> {
        protected variantTests: ((v: string) => boolean)[];
        constructor(opts?: IGEkoAcSearchResolverOptions);
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
        protected getInputList(ac: any): any;
        protected calculateConfidence(acList: string[], item: Gordic.Eko.Interface.GSearchAcItem): number;
        protected getDescriptionItems(item: Gordic.Eko.Interface.GSearchAcItem, iconTemplate: IconTemplate): Wfl.Interface.GIdentifikatorDalsiInformaceDto[];
    }
}
declare namespace Gordic.Search.Eko {
    const changeConfidenceOfSearchResultsBy: (offset: number) => Gordic.Components.Search.IGSearchResolverOptions["modifyResult"];
}
declare namespace Gordic.Search.Eko {
    /**
      * GEkoVsSearchResolver
      *
      * @author Vlastimil Máca
      * @since 488.1.0.106
      */
    abstract class GEkoVsSearchResolver extends GBaseEkoSearchResolver<any, Gordic.Eko.Interface.GSearchVsResponseDto, Gordic.Eko.Interface.GSearchVsItem> {
        readonly typeGuesser: Utils.GTypeGuesser;
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
        protected getInputList(vs: any): any;
        protected calculateConfidence(vsList: string[], item: Gordic.Eko.Interface.GSearchVsItem): number;
        protected getDescriptionItems(item: Gordic.Eko.Interface.GSearchVsItem, iconTemplate: IconTemplate): Wfl.Interface.GIdentifikatorDalsiInformaceDto[];
    }
}
declare namespace Gordic.Eko.WebClient {
    interface DatawordInfoSelectorOptions<T = any> extends Gordic.Data.Selectors.BaseSelectorOptionsInternal<T> {
        /**
         * Defaultni gridformat
         * @type {Gordic.Data.GridFormat<T> | T[]}
         */
        gridFormat: Gordic.Data.GridFormat<T> | T[];
    }
    interface UserSelectorOptions {
        /** nove oznaceni elementu, ktery bude pouzivan na navazani k selektoru*/
        related: HTMLElement | JQuery | Element;
    }
    class DatawordInfoSelector<TRow = any> extends Gordic.Data.Selectors.BaseSelector<TRow> implements DatawordInfoSelectorOptions<TRow> {
        gridFormat: Gordic.Data.GridFormat<TRow>;
        private related;
        showedCnt?: DatawordInfoContent;
        contentClosed?: () => void;
        contentOpened?: () => void;
        constructor(optionsIn: UserSelectorOptions & Partial<Gordic.Data.Selectors.BaseSelectorOptionsInternal<TRow>>);
        updateData(data: TRow[], options?: GDlgOptions & {
            focus?: boolean;
        }): void;
        show(options?: GDlgOptions & {
            focus?: boolean;
        }): JQuery.Promise<TRow | TRow[]>;
    }
    class DatawordInfoContent<TRow = any> extends GContentBase<DatawordInfoSelectorOptions> implements IGClientContent {
        private grid;
        private gridData;
        prepareContent(options: DatawordInfoSelectorOptions<TRow>): void;
        updateData(tData: TRow[], options?: GDlgOptions & {
            focus?: boolean;
        }): void;
        focusOnGrid(): void;
    }
}
declare namespace Gordic.Widget.GMagicBaseManager {
    interface IMagicFieldIdentification {
        wordSequence: number;
    }
    interface IVerifiedContent<TValue = Gordic.Eko.WebClient.DataWordContent> extends IMagicFieldIdentification {
        value: TValue;
    }
    interface IOptions {
        createdForPrefilling?: boolean;
        data?: Gordic.Eko.WebClient.GDataSentenceParamsDto;
        initializedDataSentence?: Gordic.Eko.WebClient.GDataSentenceDto;
        verify?: (obj: IVerifiedContent) => void;
        dataWordInfoUpdated?: (ev: any, data: {
            data: Gordic.Eko.WebClient.DataWordContentWithInfo[];
            initOnStart?: boolean;
        }) => void;
        showDataWordsInfos?: boolean;
        withoutCheck?: boolean;
        useNonDigital?: boolean;
        loadingContent?: JQuery;
        externalHelpDialog?: boolean;
        dataWordsFilter?: (fieldName: string, dataView: Gordic.Eko.WebClient.DataWordContent[]) => JQuery.Promise<Gordic.Eko.WebClient.DataWordContent[]>;
    }
    interface IDefaultOptions extends IOptions {
        verify: (obj: IVerifiedContent) => void;
    }
    abstract class GMagicBaseManager<TValue extends Gordic.Eko.WebClient.DataWordContent = Gordic.Eko.WebClient.DataWordContent, TOptions extends IOptions = IOptions> extends JQueryWidget<TOptions, IDefaultOptions> {
        static widgetName: string;
        static widgetCssClass: string;
        protected _serviceCnt: GContent;
        protected loadedDataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        progressingOperation: JQuery.Promise<Gordic.Eko.WebClient.Cache>;
        private loadingDSPromise;
        protected usedDataWords: ObjectLiteralNumber<Gordic.Eko.WebClient.GDataWordDto>;
        protected lastUsedDataWord: Gordic.Eko.WebClient.GDataWordDto;
        protected registredFields: ObjectLiteralNumber<Gordic.Widget.GMagicField.GMagicField<TValue>>;
        protected constValues: ObjectLiteralNumber<string>;
        private logger;
        protected getValueByWordSequence(wordSequence: number): Gordic.Eko.WebClient.DataWordContent;
        addWordValue(name: string, value: string): void;
        addConstWords(consts: ObjectLiteral<string>): void;
        protected decideAddNewWord(value: GMagicBaseManager.IVerifiedContent<Gordic.Eko.WebClient.DataWordContent>, field: JQuery, customAbb?: string, dataSentence?: Gordic.Eko.WebClient.PCheckedDataSentence): JQuery.PromiseBase<any, any, never, never, never, never, never, never, never, never, never, never>;
        abstract lastDataWordFieldChanged(): JQuery.Promise<void | JQuery>;
        protected lastBupsrr: string | null;
        protected hasMD: boolean;
        protected hasDal: boolean;
        protected createdForPrefilling: boolean;
        get hasMDDal(): boolean;
        private lastDisabledFields;
        protected lastFocusedField: JQuery | null;
        constructor(options: any, element: any);
        changeSentenceType(sentenceType: Gordic.Eko.Interface.TypVetyEnum): void;
        protected loadDataSentence(options: any): void;
        protected setDataSentence(): void;
        protected parseLoadedDataSentence(): void;
        protected getDbName(wordSequence: number): string;
        protected hasAnyFieldError(wordSequence: number): boolean;
        abstract loadDataWordsContent(obj: GMagicBaseManager.IVerifiedContent<Gordic.Eko.WebClient.DataWordContent>, withLevelInfo: boolean, dataSentence?: Gordic.Eko.WebClient.PCheckedDataSentence): any;
        abstract loadDataSentenceForChecking(value: GMagicBaseManager.IVerifiedContent<TValue>): any;
        abstract verifyDW(value: IVerifiedContent<TValue>): any;
        abstract checkMaskedDW(obj: {
            value: IVerifiedContent<TValue>;
            def: JQuery.Deferred<any>;
            partValue: string;
        }): any;
        abstract loadDataWords(value: IMagicFieldIdentification): any;
        abstract applyCfs(value: IMagicFieldIdentification, result: Gordic.Eko.WebClient.PCheckResult<TValue>): any;
        abstract resolveCheckResult(value: IVerifiedContent<TValue>, result: Gordic.Eko.WebClient.PCheckResult<TValue> | Gordic.Eko.WebClient.PCheckError): any;
        abstract resetErrors(): any;
        private infoSelector?;
        private magicFieldChanged;
        static fillTextToDataSentence<T extends Partial<Gordic.Eko.WebClient.PCheckedDataSentence>>(data: T[] | Gordic.Data.View<T>, settings: {
            ico?: string;
            rok?: number;
            idRozvrhu: string;
            cfuId: string;
            uroven?: number;
            textWithValue?: boolean;
        }, cancelToken?: Gordic.Utils.GCancellationToken): JQuery.Promise<T[] | Gordic.Data.View<T>>;
        private static getDataSentenceWithText;
        getDWText(obj: GMagicBaseManager.IVerifiedContent<TValue>, initOnStart?: boolean): void;
        setZeroToFields(): void;
        protected showMsgBox(verifiedCode: number, code: any, abbrev: any): JQuery<HTMLElement> | null;
        static GetException(cfs: Gordic.Eko.Interface.PSettingsDto, pom_ucet: string, length: number, subChar: string): number;
        static Addx(ucet: any, pocetx: any, subChar: any): any;
        static getCfsException(cfs: Gordic.Eko.Interface.PSettingsDto, ueaLength: number, uebLength: number, uea: string, ueb: string, subChar: string): number;
        showHelpTexts(initOnStart?: boolean): void;
        protected _create(): void;
        setMagicFields(data: Gordic.Eko.WebClient.GDataSentenceParamsDto, field?: JQuery, disableLoadingSentence?: boolean): void;
        protected _destroy(): void;
    }
}
declare namespace Gordic.Widget.GMagicManager {
    interface IOptions extends GMagicBaseManager.IOptions {
    }
    class GMagicManager<TValue extends Gordic.Eko.WebClient.DataWordContent = Gordic.Eko.WebClient.DataWordContent> extends GMagicBaseManager.GMagicBaseManager<TValue> {
        static widgetName: string;
        static widgetCssClass: string;
        constructor(options: any, element: any);
        lastDataWordFieldChanged(loadedDrd?: number | null): JQuery.PromiseBase<void | JQuery<HTMLElement>, any, any, void | JQuery<HTMLElement>, any, any, void | JQuery<HTMLElement>, any, any, void | JQuery<HTMLElement>, any, any>;
        checkMaskedDW(obj: {
            value: GMagicBaseManager.IVerifiedContent<TValue>;
            def: JQuery.Deferred<any>;
            partValue: string;
        }): void;
        getProgressOperation(): JQuery.Promise<Eko.WebClient.Cache, any, any>;
        loadDataWords(obj: GMagicBaseManager.IMagicFieldIdentification): void;
        checkDataSentence(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        /**
        * loadDataWordsContent
        *
        * @param {GMagicBaseManager.IVerifiedContent<Gordic.Eko.WebClient.DataWordContent>} obj
        * @param {boolean} withLevelInfo (default = true) s informacemi o pozadovane urovni (CFS)
        */
        loadDataWordsContent(obj: GMagicBaseManager.IVerifiedContent<Gordic.Eko.WebClient.DataWordContent>, withLevelInfo?: boolean, dataSentence?: Gordic.Eko.WebClient.PCheckedDataSentence): Partial<Eko.WebClient.PCheckedDataSentence>;
        loadDataSentenceForChecking(obj: any): Eko.WebClient.PCheckedDataSentence;
        verifyDW(value: GMagicBaseManager.IVerifiedContent<TValue>): void;
        setVisibilityAfterCfs(exceptionCode: number, allDWords: Gordic.Eko.WebClient.GDataWordDto[], cache: Gordic.Eko.WebClient.Cache): void;
        getVerifyPromise(): JQuery.Promise<any, any, any>;
        applyCfs(value: GMagicBaseManager.IMagicFieldIdentification, result: Gordic.Eko.WebClient.PCheckResult<TValue>): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        resolveCheckResult(value: GMagicBaseManager.IVerifiedContent<TValue>, result: Gordic.Eko.WebClient.PCheckResult<TValue> | Gordic.Eko.WebClient.PCheckError): void;
        resetErrors(): void;
        protected _create(): void;
        protected _destroy(): void;
        validate(validOptions?: {
            fillWithZeroValues: boolean;
        }): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Widget.GMagicPrefabsManager {
    interface IOptions extends GMagicManager.IOptions {
        applyCfsDelegate?: (this: Gordic.Widget.GMagicPrefabsManager.GMagicPrefabsManager, exceptionCode: number, allDWords: Gordic.Eko.WebClient.GDataWordDto[], cache: Gordic.Eko.WebClient.Cache) => void;
    }
    class GMagicPrefabsManager<TValue extends Gordic.Eko.WebClient.DataWordContent = Gordic.Eko.WebClient.DataWordContent> extends GMagicManager.GMagicManager<TValue> {
        lastDataWordFieldChanged: () => JQuery.Promise<void | JQuery<HTMLElement>, any, any>;
        static widgetName: string;
        static widgetCssClass: string;
        protected _init(): void;
        resetErrors(): void;
        applyCfs(value: GMagicBaseManager.IMagicFieldIdentification, result: Gordic.Eko.WebClient.PCheckResult<TValue>): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
    }
}
interface JQuery {
    gmagicmanager(method: "addWordValue", name: string, value: string): any;
    gmagicmanager(method: "addConstWords", values: ObjectLiteral<string>): any;
    gmagicmanager(method: "validate", validOptions?: {
        fillWithZeroValues: boolean;
    }): JQuery.Promise<boolean>;
    gmagicmanager(method: "getProgressOperation"): JQuery.Promise<any>;
    gmagicmanager(method: "changeSentenceType", sentenceType: Gordic.Eko.Interface.TypVetyEnum): any;
    gmagicmanager(method: "showHelpTexts", initOnStart?: boolean): any;
    gmagicmanager(method: "getVerifyPromise"): JQuery.Promise<any>;
    gmagicmanager(method: "setMagicFields", data: Gordic.Eko.WebClient.GDataSentenceParamsDto, field?: JQuery, disableLoadingSentence?: boolean): any;
    gmagicmanager(options?: Gordic.Widget.GMagicManager.IOptions): JQuery;
    gmagicmanager(method: "option", values: Partial<Gordic.Widget.GMagicManager.IOptions>): JQuery;
    gmagicmanager<K extends Extract<keyof Gordic.Widget.GMagicManager.IOptions, string> = Extract<keyof Gordic.Widget.GMagicManager.IOptions, string>>(method: "option", option: K, value: Required<Gordic.Widget.GMagicManager.IOptions>[K]): JQuery;
    gmagicmanager<K extends Extract<keyof Gordic.Widget.GMagicManager.IOptions, string> = Extract<keyof Gordic.Widget.GMagicManager.IOptions, string>>(method: "option", option: K): Gordic.Widget.GMagicManager.IOptions[K];
    gmagicprefabsmanager(options?: Gordic.Widget.GMagicPrefabsManager.IOptions): JQuery;
    gmagicprefabsmanager(method: "changeSentenceType", sentenceType: Gordic.Eko.Interface.TypVetyEnum): any;
}
declare namespace Gordic.Widget.GMagicField {
    export const excludePrefilling = "js-prefilling";
    export const excludeFromDataSentence = "js-dsIgnore";
    export const onlyHelp = "js-dsOnlyHelp";
    export function insertValueIntoMask(regEx: RegExp, wildcard: "X" | "*", mask: string, val: string, valLength: number): maskInfo[];
    export function parseMask(regEx: RegExp, wildcard: "X" | "*", mask: string): maskInfo[];
    export interface maskInfo {
        fieldWidth: string;
        value: string;
        maxLength: number;
        disabled: boolean;
    }
    export enum ActionReason {
        newRequestData = 0,
        dataError = 1
    }
    interface NewWordContent extends Gordic.Eko.WebClient.DataWordContent {
        isNew?: true;
    }
    export interface IOptions<TValue = Gordic.Eko.WebClient.DataWordContent> extends GSelectBoxOptions<TValue> {
        /** delegat pro moznost spustit kontrolu pri presunu mezi policky */
        additionalCheck?: (value: TValue) => JQuery.Promise<void>;
        /** poradi slova v ucetni vete */
        wordSequence?: number;
        /** poradi v magicmanageru */
        managerSequence?: number;
        /** datove slovo */
        dataWord?: Gordic.Eko.WebClient.GDataWordDto | null;
        /** sloupce podle kterych se bude hledat v selektoru */
        selectorColumns?: string[];
        /** predvyplnena hodnota do selektoru */
        preFillValue?: () => string;
        /** maska pro delene pole */
        mask?: string;
        /** příznak jestli je porizovaci pole vyuzite v bunkovem editoru */
        usedForCellEditor?: boolean;
        /** příznak, jestli se budou zobrazovat informace o datovem slove */
        showDataWordsInfos?: boolean;
        selectorDef?: JQueryPromise<TValue>;
        /** disabled a enabled je potreba uchovat i přes aplikování cfs   */
        forceState?: boolean;
        /** rezim zastupneho znaku
         * normalX - klasicke chovani, asterisk - hvezdicka
         */
        wildcardMode?: Gordic.Eko.WebClient.WildcardMode;
        /** mod pro omezeni vstupnich dat*/
        inputCharsMode?: Gordic.Eko.WebClient.InputCharsMode;
    }
    export interface IDefaultOptions extends IOptions<NewWordContent> {
        /** poradi slova v ucetni vete */
        wordSequence: number;
        dataWord: Gordic.Eko.WebClient.GDataWordDto | null;
    }
    export class GMagicField<TValue extends Gordic.Eko.WebClient.DataWordContent = NewWordContent> extends JQueryWidget<IOptions<TValue>, IDefaultOptions> {
        static widgetName: string;
        static widgetCssClass: string;
        static dontMergeBaseOptions: boolean;
        /** příznak pro řízení stavu, kdy se uplatňují zástupky z předkontace */
        private wait?;
        protected compansionWait?: boolean;
        private setAfterWait?;
        static _logger: Gordic.Diagnostics.GLog | null;
        waitingDeferred?: JQuery.Deferred<TValue>;
        actionDeferred?: JQuery.Deferred<TValue[], {
            reason: ActionReason;
        }>;
        verifDeferred?: JQuery.Deferred<TValue>;
        loadingDataWords?: JQueryDeferred<Gordic.Data.View<Gordic.Eko.WebClient.DataWordContent>>;
        inlineOpenPromise?: JQueryDeferred<void>;
        inlineDialog: JQuery<any>;
        writedValue: boolean;
        /**
         * informace, zda uzivatel odmitnul přidání nového slova
         */
        rejectedNewWord?: boolean;
        /**
         * informace, zda uzivatel smazal obsah slova kl.zkratkou delete
         */
        deletedValue?: boolean;
        private _internalState;
        get state(): string;
        setFieldState(newState: any): void;
        get _isField(): boolean;
        set _isField(isField: boolean);
        get logger(): Diagnostics.GLog;
        set logger(l: Diagnostics.GLog);
        static baseOptions: IDefaultOptions;
        constructor(options: any, element: any, baseOptions?: IOptions<TValue>);
        _create(): void;
        protected showActionSelector(): JQuery.Promise<TValue, {
            reason: ActionReason;
        }>;
        protected _init(): void;
        protected _destroy(): void;
        getValue<T>(): any;
        private getRegExpForMask;
        setMask(mask: string | null, initValue?: string): void;
        getVerifyPromise(): JQuery.Promise<any, any, any>;
        setValue<T>(value: any, flags?: any): void;
        applyCompansion(compansion: string, wait: boolean, applyValue?: string): any;
        private showHelpFromCompansion;
        private setValueFromCompansion;
        setState(this: any, visible: boolean): void;
        fillZerosToValue(): void;
        setActivity(isEnabled: boolean): void;
    }
    export {};
}
interface JQuery {
    gmagicfield<TValue>(options?: Gordic.Widget.GMagicField.IOptions<TValue>): JQuery;
    gmagicfield<TValue>(method: "option", option: keyof Gordic.Widget.GMagicField.IOptions<TValue>): any;
    gmagicfield<TValue>(method: "option", option: keyof Gordic.Widget.GMagicField.IOptions<TValue>, value: any): any;
    gmagicfield<TValue extends Gordic.Eko.WebClient.DataWordContent>(method: "instance"): Gordic.Widget.GMagicField.GMagicField<TValue>;
    gmagicfield(method: "setMask", mask: string | null, initValue?: string): any;
    gmagicfield(method: "getVerifyPromise"): JQueryPromise<any>;
    gfield<T = any>(method: "option"): Gordic.Widget.GMagicField.IOptions<T>;
    gfield<T = any>(method: "option", values: Partial<Gordic.Widget.GMagicField.IOptions<T>>): JQuery;
    gfield<T = any, K extends Extract<keyof Gordic.Widget.GMagicField.IOptions<T>, string> = Extract<keyof Gordic.Widget.GMagicField.IOptions<T>, string>>(method: "option", option: K, value: Required<Gordic.Widget.GMagicField.IOptions<T>>[K]): JQuery;
    gfield<T = any, K extends Extract<keyof Gordic.Widget.GMagicField.IOptions<T>, string> = Extract<keyof Gordic.Widget.GMagicField.IOptions<T>, string>>(method: "option", option: K): Gordic.Widget.GMagicField.IOptions<T>[K];
}
declare namespace Gordic.Widget.GIMagicField {
    interface IOptions<TValue = Gordic.Eko.WebClient.DataWordContent> extends GMagicField.IOptions<TValue> {
        /**
        * Příznak na znovuzvalidování při změně předcházejícího políčka
        * @default false
        */
        againSet?: boolean;
        /**
         * autoskok, az dojde k napsani vsech cislic, tak automaticky preskoci na dalsi pole
         * defaultne true
         * @type {boolean}
         */
        autoJump: boolean;
        /**
         * limit pro datove slovo, defaultne true
         * @type {boolean}
         */
        wordLimit: boolean;
        /**
         * mod, ktery ovlivnuje CFS
         * @type {"readOnly" | "normal" | "adrFields"}
         */
        mode?: "readOnly" | "normal" | "adrFields";
        /**
         * delegat na chovani pri prekroceni dane delky
         * @type (value, flags) => void;
         */
        custSetOnLengthDelegate?: (value: any, target: any) => void;
    }
    interface IDefaultOptions extends IOptions {
    }
    class GIMagicField<TValue extends Gordic.Eko.WebClient.DataWordContent = Gordic.Eko.WebClient.DataWordContent> extends Gordic.Widget.GMagicField.GMagicField<TValue> {
        static widgetName: string;
        static widgetCssClass: string;
        static _logger: Gordic.Diagnostics.GLog | null;
        get _isField(): boolean;
        set _isField(isField: boolean);
        static childBaseOptions: IOptions;
        constructor(options: any, element: any, baseOptions?: IOptions<Gordic.Eko.WebClient.DataWordContent>);
        _create(): void;
        protected jumpNext(ev: any): void;
    }
}
interface JQuery {
    gimagicfield<TValue>(options?: Gordic.Widget.GIMagicField.IOptions<TValue>): JQuery;
    gimagicfield<TValue extends Gordic.Eko.WebClient.DataWordContent>(method: "instance"): Gordic.Widget.GIMagicField.GIMagicField<TValue>;
    gimagicfield<TValue>(method: "option", option: keyof Gordic.Widget.GIMagicField.IOptions<TValue>): any;
    gimagicfield<TValue>(method: "option", option: keyof Gordic.Widget.GIMagicField.IOptions<TValue>, value: any): any;
    gimagicfield(method: "applyCompansion", choose: "c" | "h" | "m" | "v", wait: boolean, value?: string): any;
    gimagicfield(method: "setMask", mask: string | null, initValue?: string): any;
    gimagicfield(method: "getVerifyPromise"): JQueryPromise<any>;
}
declare namespace Gordic.Data.Filtering {
    class SuggestionPorizovacResolver extends BaseResolver {
        maxlength: number;
        constructor(lookupColumns: any, options: any);
        getFilter(filter: string): (row: any) => boolean;
    }
    class SimplePorizovacResolver extends BaseResolver {
        maxlength: number;
        metaField: string;
        private uuid;
        constructor(lookupColumns: any, options: any);
        getFilter(filter: any): (row: any) => boolean;
    }
}
declare namespace Gordic.Eko.WebClient {
    type possibleWidth = "w-1" | "w-2" | "w-3" | "w-4" | "w-5" | "w-6" | "w-7" | "w-8" | "w-9" | "w-10" | "w-11" | "w-12" | "w-L-1" | "w-L-2" | "w-L-3" | "w-L-4" | "w-L-5" | "w-L-6" | "w-L-7" | "w-L-8" | "w-L-9" | "w-L-10" | "w-L-11" | "w-L-12" | "w-M-1" | "w-M-2" | "w-M-3" | "w-M-4" | "w-M-5" | "w-M-6" | "w-M-7" | "w-M-8" | "w-M-9" | "w-M-10" | "w-M-11" | "w-M-12" | "w-S-1" | "w-S-2" | "w-S-3" | "w-S-4" | "w-S-5" | "w-S-6" | "w-S-7" | "w-S-8" | "w-S-9" | "w-S-10" | "w-S-11" | "w-S-12";
    interface PorizovacPrefabsSettingsDto {
        autoJump?: boolean;
        hasMaxWordInput?: true;
        prefillValue?: true;
        mode?: "onlyHelp" | "readOnly" | "normal" | "adrFields";
        prefix?: string;
        postfix?: string;
        getOnlyFields?: boolean;
        onlyLoadData?: boolean;
        widthField?: ObjectLiteral<possibleWidth | possibleWidth[]>;
        formDescriptor?: string;
        validators?: (Gordic.Validators.Validator<Gordic.Validators.ValidatorOptions> | Gordic.Validators.ValidatorOptions & {
            type?: string;
        } | null)[];
        ignoreDataSentense?: boolean;
    }
    class GPorizovacPrefabs {
        static getMagicFormRows(dataSentence: GDataSentenceDto, settings?: PorizovacPrefabsSettingsDto): Gordic.Forms.FormRow[];
    }
    class GPorizovacUtils {
        private lastFocusedField;
        static getField(field: any): Widget.GIMagicField.GIMagicField<DataWordContent>;
        setFocusEvent(elem: JQuery<HTMLElement>): void;
        static clearDataSentence(dataSentence: Gordic.Eko.WebClient.GDataSentenceDto, fromWordSequence: number): void;
        static prepareToModelApply<T extends Gordic.Eko.WebClient.GDataWordsModelDto>(dto: T): T & Gordic.Eko.WebClient.GDataSentenceModelDto;
        static translateToDataSentence<T extends Gordic.Eko.WebClient.GDataSentenceModelDto>(dto: T): T & Gordic.Eko.WebClient.GDataWordsModelDto;
    }
}
declare namespace Gordic.Widget.GMagicPreFiller {
    enum RuleType {
        topology = 0,
        dataWord = 1,
        financial = 2,
        contract = 3,
        other = 4
    }
    type ExtendDataFunction = (val?: string) => any;
    interface PrefillerRule {
        templateName?: string | "{name_t}";
        column: string;
        type: RuleType;
        field?: string;
        dataExtend?: ExtendDataFunction;
    }
    /**
     *  --- predkontacni predpis ---
     * (cin) - cinnost - hodnoty 0 - skok na dalsi nebo w - pockej na potvrzeni (navazano na focusout)
     * N;(cin); - vlastni NKS
     * v;(cin);<radek> - kopie z radku <radek>
     * c;(cin); - kopie z predchazejiciho radku
     * P;(cin); - SU z predchazejiciho radku
     * n;(cin); - prednastavene NKS
     * e;(cin);<radek> - SU z radku <radek>
     * MD/DAL zastupky
     * C;(cin); - kopie z predchazejiciho radku a z opacne strany
     * V;(cin);<radek> - kopie z radku <radek> a z opacne strany
     * w;(cin);<radek> - kopie z radku <radek> s opacnym znamenkem
     * d;(cin); - kopie z predchazejiciho radku s opacnym znamenkem
     * D;(cin); - kopie z predchazejicihi radku a z opacne strany s opacnym znamenkem
     * W;(cin);<radek> - kopie z radku <radek> a z opacne strany s opacnym znamenkem
     * x;(cin); - kopie z hlavicky s opacnym znamenkem
     * X;(cin); - kopie z hlavicky
     * b;(cin); - automaticke vyrovnani
     */
    interface DataWordTemplate {
        nks_t?: string | null;
        uea_t?: string | null;
        ueb_t?: string | null;
        uec_t?: string | null;
        ued_t?: string | null;
        uee_t?: string | null;
        uef_t?: string | null;
        ueg_t?: string | null;
        ueh_t?: string | null;
        uei_t?: string | null;
        uej_t?: string | null;
        te0_t?: string | null;
        te1_t?: string | null;
        te2_t?: string | null;
        te3_t?: string | null;
        te4_t?: string | null;
        uek_t?: string | null;
        uel_t?: string | null;
        uem_t?: string | null;
        uen_t?: string | null;
        te5_t?: string | null;
        te6_t?: string | null;
        te7_t?: string | null;
        te8_t?: string | null;
        te9_t?: string | null;
        c0_t?: string | null;
        c1_t?: string | null;
    }
    /**
     * Vstupní parametry predkontace
     * @author pnovak
     * @since 486.1.0.58
     */
    interface IOptions<DefaultData> {
        /**
         * priznak, zda se ma automaticky comitovat radky
         * @type {boolean}
         */
        autoCommitRow: boolean;
        /**
         * defaultni data pouzita pri zalozeni noveho radku
         * @type {DefaultData | ObjectLiteral<any> | (() => (DefaultData | ObjectLiteral<any>))}
         */
        defaultData: DefaultData | ObjectLiteral<any> | (() => (DefaultData | ObjectLiteral<any>));
        /**
         * Delegat pro defautlni data
         * @type {()}
         * @default > JQueryPromise<DefaultData>
         */
        defaultDataDelegate: () => JQueryPromise<DefaultData>;
        /**
         * vlastni NKS
         * @type {string}
         */
        ownNKS: string;
        /**
         * prednastavene NKS
         * @type {string}
         */
        setNKS: string;
        /**
         * hodnota nebo odkaz na pole
         * @type {Decimal | JQuery}
         */
        headerValue: Decimal | JQuery;
    }
    const cancelAction: GAction;
    const buttons: (string | {
        action: GAction;
    })[];
    /**
     * Predkontacni mechanismus
     * @author pnovak
     * @since 486.1.0.58
     */
    class GMagicPreFiller<TWordTemplate extends DataWordTemplate, TRow = any, TValue extends Gordic.Eko.WebClient.DataWordContent = Gordic.Eko.WebClient.DataWordContent> extends JQueryWidget<Partial<IOptions<TRow>>> {
        static widgetName: string;
        static widgetCssClass: string;
        protected registredFields: ObjectLiteral<Gordic.Widget.GMagicField.GMagicField<TValue>>;
        cancelPromise: JQuery.Promise<void>;
        cancelDialogIsVisible: boolean;
        private waitForResult;
        private deferreds;
        private rowIsComited;
        protected _create(): void;
        protected _destroy(): void;
        /**
         * Najde vsechny porizovaci pole
         */
        private findNewFields;
        /**
         * Rozdeleni zastupek
         * @param {string} compansion zastupka
         * @returns {{compansion: string, wait: boolean, applyValue?: string }} Vyznam zastupky
         */
        private parseCompansion;
        setCancelPromise(cancelPromise: JQuery.Promise<void>): void;
        translateContractTemplate(grid: JQuery<HTMLElement>, guid: string, i: number, field: string, template: string, dataExtend: ExtendDataFunction | undefined): any;
        private translateTemplate;
        private translateFinTemplate;
        private translateDataWordTemplate;
        static getDataWordsColumns(gridFormat: Gordic.Data.GridFormat<any> | GGridColumn<any>[] | undefined): PrefillerRule[];
        /**
  * Pouziti sablon
  * @param {TWordTemplate[]} templates sablony
  */
        useTemplates(templates: TWordTemplate[], inputRules: PrefillerRule[], disableBlicking?: boolean): JQueryPromise<any>;
        /**
         * Zpracování jednoho řádku šablony
         */
        private processTemplateRowDeferred;
        /**
         * Commit jednoho řádku (jQuery Deferred verze)
         */
        private commitRowDeferred;
        /**
         * aplikovani zastupky
         *
         * @param {JQuery<HTMLElement>} grid grid
         * @param {string} guid guid predkontace
         * @param {number} i index predkontace
         * @param {string} fieldName jmeno policka v gridu
         * @param {string} template neparsnuta zastupka
         * @returns {JQuery.Promise<void>} Promise, resolved - aplikovani dopadlo dobre, rejected - nastala chyba (nemelo by nastat)
         */
        applyCompansion(grid: JQuery<HTMLElement>, guid: string, i: number, fieldName: string, template: string, dataExtend?: ExtendDataFunction, ruleType?: RuleType): JQuery.Promise<void>;
        /**
         * získání jmena posledniho sloupce
         *
         * @param {JQuery<HTMLElement>} grid grid
         * @returns {string} jmeno posledniho sloupce, ktery neni disabled
         */
        getLastColumnName(grid: JQuery<HTMLElement>): string | undefined;
        /**
         * Aplikovani zastupky na MD/ DAL
         *
         * @param {JQuery<HTMLElement>} grid grid
         * @param {string} guid guid predkontace
         * @param {number} position index radku predkontace
         * @param {string} template zastupka
         * @param {"c0" | "c1"} fieldName jmeno fieldu ze ktereho je volany
         * @returns {JQueryPromise<any>} Promise, měla by být vždy resolved
         */
        applyCostCompansion(grid: JQuery<HTMLElement>, guid: string, position: number, template: string, fieldName: string): JQueryPromise<any>;
        /**
         * obsloužení čtyř zástupek P,e (SU) a v, c (kopie hodnoty z řádku fromRow)
         *
         * @param {JQuery} grid grid
         * @param {string} fieldName jmeno sloupce
         * @param {string} guid guid predkontace
         * @param {number} fromRow index radku z ktereho se bere vysledna hodnota
         * @param {string} compansion zastupka
         * @returns {string | undefined} hodnota
         */
        getValueFromRow(grid: JQuery, fieldName: string, guid: string, fromRow: number, compansion: string): string | undefined;
    }
}
interface JQuery {
    gmagicprefiller<TTemplate, TRow = any, TValue = Gordic.Eko.WebClient.DataWordContent>(options?: Partial<Gordic.Widget.GMagicPreFiller.IOptions<TRow>>): JQuery;
    gmagicprefiller<TWordTemplate extends Gordic.Widget.GMagicPreFiller.DataWordTemplate>(method: "useTemplates", templates: TWordTemplate[], inputRules: Gordic.Widget.GMagicPreFiller.PrefillerRule[], disableBlicking?: boolean): JQueryPromise<any>;
    gmagicprefiller<TRow = any>(method: "option", option: keyof Gordic.Widget.GMagicPreFiller.IOptions<TRow>, value: boolean | object): JQueryPromise<any>;
}
declare namespace Gordic.Eko.Prefabs {
    interface IGObecneSeskupeniOptions extends Gordic.Eko.WebClient.GObecneSeskupeniOptions {
        /** Neni-li setnuta property 'rokMesic' zavola se tato funkce */
        rokMesicFunc?: (elm: HTMLElement) => JQueryPromise<string | null | undefined>;
        typOseKs?: GBaseFilter<string>;
    }
    function obecneSeskupeni(options: IGObecneSeskupeniOptions): GSelectBoxOptions<Gordic.Data.Readers.EkososeDto>;
}
declare namespace Gordic.Prefabs.Select {
    /**
     * Obecne seskupeni jako strom (coding sugar pro Gordic.Eko.Prefabs.obecneSeskupeni() pro snazsi nalezeni, pokud nekdo hleda po readerech)
     */
    function ekososeTree(options: Gordic.Eko.Prefabs.IGObecneSeskupeniOptions): GSelectBoxOptions<Data.Readers.EkososeDto, Data.Readers.EkososeDto>;
}
declare namespace Gordic.Eko.WebClient {
    interface GObecneSeskupeniOptions extends Gordic.Eko.WebClient.GObecneSeskupeniRequestDto {
        /** Vybrane seskupeni */
        path?: string;
        showLeaves?: boolean;
        ixsOse?: string;
        typOse?: string;
        ixsKto?: string;
        ks?: string;
    }
    class GObecneSeskupeniSelector extends GContentBase {
        logOptions: {
            name: string;
            fileName: string;
        };
        uid: string;
        options: GObecneSeskupeniOptions;
        /** Pro ucely testovani - hledani duplicitnich id */
        private ids;
        srv(): GContent;
        prepareContent(options: GObecneSeskupeniOptions): void;
        private getData;
    }
    interface GObecneSeskupeniObsahOptions extends Gordic.Eko.WebClient.GObecneSeskupeniObsahRequestDto {
    }
    class GObecneSeskupeniObsah extends GContentBase {
        grid: JQuery;
        srv(): GContent;
        prepareContent(options: GObecneSeskupeniObsahOptions): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Eko.Prefabs {
    interface IGObecneSeskupeniSkoOptions extends GSelectBoxOptions<IGObecneSeskupeniSkoResultDto> {
        /** Root ixsOse */
        ixsOse?: string;
        datOd?: string;
        datDo?: string;
    }
    interface IGObecneSeskupeniSkoResultDto {
    }
    interface IGObecneSeskupeniSkoServerFilters extends Gordic.Eko.WebClient.GObecneSeskupeniSkoRequestDto {
    }
    function obecneSeskupeniSko(options: IGObecneSeskupeniSkoOptions): GSelectBoxOptions<IGObecneSeskupeniSkoResultDto>;
}
declare namespace Gordic.Eko.WebClient {
    class BplPredkontaceManager {
        private dataSentence;
        private ids;
        idColumnName: string;
        private generateNewId;
        private data;
        private compensationPlaces;
        constructor(dataSentence: GDataSentenceDto);
        setAndGetEditableGroup(idParent: string, columns: string[], editable: boolean): kontaceData[];
        highlightGroup(id: string, idParent: string | null): {
            changed: boolean;
            data: kontaceData[];
        };
        private getGroupFields;
        private getGroupFieldsIncludingCurrent;
        getDataToUpdate(id: string, idParent: string | null, compensation: string, dataWord: string, value: string): kontaceData[];
        updateRowsProperty(id: string, idParent: string | null, compensation: string, value: string): void;
        markData(id: string, idParent: string | null, compensation: string, dataWord: string, mark: boolean): {
            updatedDate: kontaceData[];
            markOnSameRow: string[];
        };
        private compensationDS;
        deleteKontace(cnt: GContent, row: kontaceGridData): JQuery.Promise<any, any, any>;
        private correctWord;
        private transformRows;
        private getDataRowsOld;
        private getDataRows;
        tranformData(input: kontaceInputInfo[]): kontaceData[];
        insertNewKontace(data: kontaceInputInfo[]): kontaceData[];
        setAndParseData(data: kontaceInputInfo[]): kontaceData[];
    }
    namespace BplPorizovacUtils {
        function isZadavaciZastupkaForParent(dataWords: GDataWordDto[], txt: string, dbName: string): boolean;
        function isZadavaciZastupka(txt: string): boolean;
        function isZadavaciZastupkaNormal(txt: string): boolean;
        function isZadavaciZastupka30(txt: string): boolean;
        function isZadavaciZastupka30B(txt: string, zastupka: string): boolean;
    }
}
declare namespace Gordic.Eko.WebClient {
    export interface kontaceWord {
        code?: string | null;
        compensation?: string;
        editable?: boolean;
        mark?: boolean;
    }
    interface kontaceInitialData {
        uea?: kontaceWord;
        ueb?: kontaceWord;
        uec?: kontaceWord;
        ued?: kontaceWord;
        uee?: kontaceWord;
        uef?: kontaceWord;
        ueg?: kontaceWord;
        ueh?: kontaceWord;
        uei?: kontaceWord;
        uej?: kontaceWord;
        te0?: kontaceWord;
        te1?: kontaceWord;
        te2?: kontaceWord;
        te3?: kontaceWord;
        te4?: kontaceWord;
        uek?: kontaceWord;
        uel?: kontaceWord;
        uem?: kontaceWord;
        uen?: kontaceWord;
        te5?: kontaceWord;
        te6?: kontaceWord;
        te7?: kontaceWord;
        te8?: kontaceWord;
        te9?: kontaceWord;
    }
    export interface inputKontaceData extends kontaceInitialData {
        isParent: boolean;
    }
    export interface kontaceGridData extends kontaceInitialData {
        id: string;
        id_parent: string | null;
    }
    export interface kontaceInfo {
        kod_kon?: string;
        ixs_kon?: string;
    }
    export interface kontaceInputInfo extends kontaceInfo {
        rows: inputKontaceData[];
    }
    export interface kontaceData extends kontaceInfo, kontaceGridData {
        highlighted?: boolean;
        novy_radek?: number;
    }
    export class GPorizovacBpl extends GContentBase {
        kontaceList?: () => JQueryPromise<any>;
        data: (kontace: any) => JQueryPromise<any>;
        saveAll: () => JQueryPromise<any>;
        selectedKontace?: () => JQueryPromise<any>;
        saveRow: (row: kontaceInputInfo) => JQueryPromise<any>;
        deleteRow: (rowToDelete: Gordic.Eko.WebClient.kontaceData) => JQueryPromise<any>;
        buttonsEnabledDelegate: () => JQueryPromise<any>;
        change?: (value: GGridEditorInfoType<any>, isWordColumn: boolean) => JQueryPromise<any>;
        onStartEdit: (value: GGridEditorInfoType<any>) => JQueryPromise<any>;
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        formZastupky: Gordic.Forms.Form;
        config: number;
        gridView: any;
        columnRowStateVisible: boolean;
        columnSaveVisible: boolean;
        schvaleno: () => boolean;
        stornovano: (row: any) => boolean;
        jeSchvaleno: boolean;
        gridKontace: JQuery;
        inputData: any;
        /**
         * canEdit - příznak pro první if v selection - provede se džív než je grid plně připraven
         * @type {boolean}
         */
        canEdit: boolean;
        gridFormatBefore: Data.GridFormat;
        gridFormatAfter: Data.GridFormat;
        sentenceColumns: string[];
        idColumnName: string;
        gridFormat: Gordic.Data.GridFormat;
        bplmanager: Gordic.Eko.WebClient.BplPredkontaceManager;
        editedCompensation: string;
        editedWord: kontaceWord;
        initProcess: boolean;
        groupCountCaption: string;
        showCompensation?: boolean;
        /**
         * podmíněné formátování
         */
        condFormats: Gordic.Components.Grid.CondFormats.CondFormat[];
        errorProcessor: Gordic.Data.ErrorProcessor;
        loadingCache: boolean;
        oldWayChecking?: boolean;
        prepareContent(): void;
        private generateCustomClassFunction;
        private setMark;
        setData(inputData: any): void;
        updateData(newData: any): void;
        getDataRows(): any[];
        addRow(kontace: any, kod_kon: any): void;
    }
    export {};
}
declare namespace Gordic.Widget.GPorizovacManager {
    interface kontaceInfo {
        key?: string;
        dataWord: string;
    }
    export function getCompensation(rows: MetaRow<Gordic.Eko.WebClient.kontaceData>[]): ObjectLiteral<kontaceInfo[]>;
    export interface IOptions extends GMagicBaseManager.IOptions {
        view: Gordic.Data.View<Gordic.Eko.WebClient.kontaceData>;
        oldWayChecking?: boolean;
    }
    export class GPorizovacManager<TValue extends Gordic.Eko.WebClient.DataWordContent = Gordic.Eko.WebClient.DataWordContent> extends GMagicBaseManager.GMagicBaseManager<TValue, IOptions> {
        static widgetName: string;
        static widgetCssClass: string;
        constructor(options: any, element: any);
        editedCompensation: string;
        private editedField;
        private compensationInfo;
        private firstLoadPromise;
        protected _create(): void;
        lastDataWordFieldChanged(): JQuery.Promise<void | JQuery>;
        resetErrors(): void;
        loadDataSentenceForChecking(obj: any): Gordic.Eko.WebClient.PCheckedDataSentence;
        checkDW(value: GMagicBaseManager.IVerifiedContent<TValue>): JQuery.Promise<any, any, any>;
        validateDataSentence(dataSentenceWithCompensation: Gordic.Eko.WebClient.kontaceData, wrongDataSentence?: Gordic.Eko.WebClient.PCheckedDataSentence): boolean;
        loadDataWordsContent(obj: GMagicBaseManager.IVerifiedContent<Gordic.Eko.WebClient.DataWordContent>, withLevelInfo?: boolean, dataSentence?: Gordic.Eko.WebClient.PCheckedDataSentence): Partial<Eko.WebClient.PCheckedDataSentence> | undefined;
        checkMaskedDW(obj: {
            value: GMagicBaseManager.IVerifiedContent<TValue>;
            def: JQuery.Deferred<any>;
            partValue: string;
        }): void;
        verifyDW(value: GMagicBaseManager.IVerifiedContent<TValue>): void;
        loadDataWordsCnt(data: Gordic.Eko.WebClient.kontaceData, obj: GMagicBaseManager.IVerifiedContent<Gordic.Eko.WebClient.DataWordContent>, withLevelInfo?: boolean): Partial<Eko.WebClient.PCheckedDataSentence>;
        loadDataWords(obj: GMagicBaseManager.IMagicFieldIdentification): void;
        applyCfs(value: GMagicBaseManager.IMagicFieldIdentification, result: Eko.WebClient.PCheckResult<TValue>): void;
        resolveCheckResult(value: GMagicBaseManager.IVerifiedContent<TValue>, result: Eko.WebClient.PCheckError | Eko.WebClient.PCheckResult<TValue>): void;
    }
    export {};
}
interface JQuery {
    gporizovacmanager(options: Gordic.Widget.GPorizovacManager.IOptions): JQuery;
}
declare namespace Gordic.Eko.WebClient {
    interface CacheContent {
        data: ObjectLiteral<Gordic.Eko.Interface.PKontrolaDataDto[]>;
        settings: ObjectLiteral<Gordic.Eko.Interface.PSettingsDto>;
    }
    interface Cache {
        data: ObjectLiteral<Gordic.Eko.Interface.PKontrolaDataDto[]>;
        settings: Gordic.Eko.Interface.PSettingsDto;
    }
    abstract class CacheParent<T> {
        protected id: string;
        protected cfuId: string;
        protected _valid: boolean;
        protected _content: T | null;
        protected _contentDef: JQuery.Deferred<T>;
        constructor(id: string, cfuId: string);
        Id(): string;
        CfuId(): string;
        Valid(): boolean;
        Loaded(): boolean;
        abstract getContent(cfuId: string): JQuery.Promise<T>;
    }
    class DataCache extends CacheParent<ObjectLiteral<Gordic.Eko.Interface.PKontrolaDataDto[]>> {
        private static _logger;
        get logger(): Diagnostics.GLog;
        lastModifDate: JsonDate;
        checkDate(checkedDate: JsonDate): boolean;
        refresh(): JQuery.Promise<ObjectLiteral<Interface.PKontrolaDataDto[]>, any, any>;
        getContent(): JQuery.Promise<ObjectLiteral<Interface.PKontrolaDataDto[]>>;
        setContent(content: ObjectLiteral<Gordic.Eko.Interface.PKontrolaDataDto[]> | null, lastModified: JsonDate): void;
    }
    class DataSettingsCache extends CacheParent<ObjectLiteral<Gordic.Eko.Interface.PSettingsDto>> {
        private static _logger;
        get logger(): Diagnostics.GLog;
        checkSettingsCache(cfuId: string): boolean;
        getContent(cfuId: string): JQuery.Promise<ObjectLiteral<Gordic.Eko.Interface.PSettingsDto>>;
        setContent(content: ObjectLiteral<Gordic.Eko.Interface.PSettingsDto> | null): void;
    }
    class DataSentenceCache extends CacheParent<CacheContent> {
        private static _logger;
        get logger(): Diagnostics.GLog;
        private dataCache;
        private dataSettingsCache;
        Valid(): boolean;
        constructor(id: string, cfuId: string);
        refresh(): JQuery.Promise<ObjectLiteral<Interface.PKontrolaDataDto[]>, any, any>;
        get lastModifDate(): JsonDate;
        checkDate(checkedDate: JsonDate): boolean;
        setContent(content: CacheContent | null, lastModified: JsonDate, onlySettings: boolean): void;
        getContent(cfuId: string): JQuery.Promise<CacheContent>;
    }
    class DataSentenceAdapter {
        private static _logger;
        static get logger(): Diagnostics.GLog;
        private static _srvCnt;
        static cachedOnServerOrClient: boolean;
        static isExtendedDataSentence: boolean;
        private static _dataSentenceCaches;
        private static _loadingCaches;
        static DataSentenceCaches(): ObjectLiteral<DataSentenceCache>;
        static SrvCnt(): GContent<IGContentBase, any>;
        private static getValidCaches;
        static refreshCache(dataCacheId: string): JQuery.Promise<void>;
        static getCacheContent(dataCacheId: string, cfuId: string): JQueryPromise<Cache>;
        static loadCache(dataCacheId: string, cfuId: string, isDirty?: boolean, onlySettings?: boolean): void;
        static checkDate(dataCacheId: string): JQueryPromise<boolean>;
    }
}
declare namespace Gordic.Eko.WebClient {
    class PUtils {
        static cacheTable: ObjectLiteral<string | null>;
        static definiceRozvrh: ObjectLiteral<ObjectLiteral<Gordic.Eko.Interface.PKontrolaDataDto[]>>;
    }
    interface IGEkoReasonResponse {
        /**
         * Příznak obsluhy
         * @type {boolean}
         */
        handled: boolean;
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
    }
    /**
     * PCheckingTypeEnum - enum kontrolního typu
     * @author pnovak
     * @since 482.1.0.26
     */
    enum PCheckingTypeEnum {
        /** poriz */
        poriz = 0,
        /** kch */
        kch = 1,
        /** ext */
        ext = 2
    }
    /**
     * PTypUct - enum pro typ kontroly (uct nebo roz)
     * @author pnovak
     * @since 482.1.0.26
     */
    enum PUctCheckingEnum {
        /** veškeré účtování */
        uct = 40,
        /** rpzpočet */
        roz = 50
    }
    /**
     * Vstupni mod pro kontrolni
     *
     * @author pnovak
     * @since 482.1.0.26
     */
    enum PInputModeEnum {
        /** kontrola */
        chcecking = 0,
        /** napoveda */
        help = 1,
        /** nacteni textu */
        textLoading = 2,
        /** nacteni textu s vice informacema */
        textLoadingWithMoreInfo = 3,
        /** ??? - doplnit */
        helpWithDescription = 4
    }
    /**
     *
     * @author pnovak
     * @since 482.1.0.26
     */
    interface PCheckedDataWords {
        /**
         * uea
         * @type {string}
         */
        uea: string;
        /**
         * ueb
         * @type {string}
         */
        ueb: string;
        /**
         * uec
         * @type {string}
         */
        uec: string;
        /**
         * ued
         * @type {string}
         */
        ued: string;
        /**
         * uee
         * @type {string}
         */
        uee: string;
        /**
         * uef
         * @type {string}
         */
        uef: string;
        /**
         * ueg
         * @type {string}
         */
        ueg: string;
        /**
         * ueh
         * @type {string}
         */
        ueh: string;
        /**
         * uei
         * @type {string}
         */
        uei: string;
        /**
         * uej
         * @type {string}
         */
        uej: string;
        /**
         * te0
         * @type {string}
         */
        te0: string;
        /**
         * te1
         * @type {string}
         */
        te1: string;
        /**
         * te2
         * @type {string}
         */
        te2: string;
        /**
         * te3
         * @type {string}
         */
        te3: string;
        /**
         * te4
         * @type {string}
         */
        te4: string;
        /**
         * uek
         * @type {string}
         */
        uek: string;
        /**
         * uel
         * @type {string}
         */
        uel: string;
        /**
         * uem
         * @type {string}
         */
        uem: string;
        /**
         * uen
         * @type {string}
         */
        uen: string;
        /**
         * te5
         * @type {string}
         */
        te5: string;
        /**
         * te6
         * @type {string}
         */
        te6: string;
        /**
         * te7
         * @type {string}
         */
        te7: string;
        /**
         * te8
         * @type {string}
         */
        te8: string;
        /**
         * te9
         * @type {string}
         */
        te9: string;
    }
    /**
     * Vstupni objekt kontrolovane datové věty
     * @author pnovak
     * @since 482.1.0.26
     */
    interface PCheckedDataSentence extends PCheckedDataWords {
        /**
         * Identifikace organizace
         * @type {string}
         */
        ico: string;
        /**
         * Ucetni rok
         * @type {number}
         */
        rok: number;
        /**
         * ID rozvrhu
         * @type {string}
         */
        idRozvrhu: string;
        /**
         * uroven
         * @type {number}
         */
        uroven: number;
        /**
         * uroven
         * @type {number}
         */
        urovenStr?: string;
        /**
         * druh dokumentu
         * @type {number}
         */
        druhDok?: number;
        /**
         * c0
         * @type {Decimal}
         */
        c0?: Decimal;
        /**
         * c1
         * @type {Decimal}
         */
        c1?: Decimal;
        /**
         * m0
         * @type {Decimal}
         */
        m0?: Decimal;
        /**
         * m1
         * @type {Decimal}
         */
        m1?: Decimal;
        /**
         * obstr
         * @type {boolean}
         */
        obstr?: boolean;
        /**
         * Typ kontroly
         * @type {PCheckingTypeEnum}
         */
        kTyp?: PCheckingTypeEnum;
        /**
         * Enum pro typ kontroly (uct nebo roz)
         * @type {PUctCheckingEnum}
         */
        typUct?: PUctCheckingEnum;
        /**
         * Vstupni rezim
         * @type {PInputModeEnum}
         */
        inputMode?: PInputModeEnum;
        /**
         * Priznak, jak se používá x nebo *
         * @type {boolean}
          */
        wildcard?: WildcardMode;
    }
    class PCheckResult<TValue> {
        dataWords: TValue[];
        zd: number;
        prizNekumul: number;
        bupsrr: string;
        /**
         * constructor
         *
         * @param {TValue[]} dataWords
         * @param {number} zd
         * @param {number} prizNekumul
         * @param {string} bupsrr
         */
        constructor(dataWords: TValue[], zd: number, prizNekumul: number, bupsrr: string);
    }
    /**
     * DTO chyby
     * @author pnovak
     * @since 482.1.0.26
     */
    class PCheckError {
        text: string;
        code: number;
        field?: string | null | undefined;
        /**
         * constructor
         *
         * @param {string} text Text chyby
         * @param {number} code Kod chyby
         * @param {string} [field] Policko ktere je spatne
         */
        constructor(text: string, code: number, field?: string | null | undefined);
    }
    class PMechanism {
        private static firstForeach;
        private static getException;
        private static addXToAccount;
        private static LeftTrim;
        private static RightTrim;
        private static ekorzvaxdcdy;
        private static generateSpaces;
        private static emptyAktDW;
        private static fillEmptyValue;
        private static getDataWords;
        private static makeXuete;
        private static getDataWordsContent;
        private static appendSpaceToDS;
        private static generateSpacesToDS;
        static getEkoscfuArray(selectedRokDataSentenceSettings: ObjectLiteral<Gordic.Eko.Interface.PDataSentenceSettings[]> | null, cfu: string): Gordic.Eko.Interface.GEkoscfuDto[] | null;
        static checkDataSentence<TValue = DataWordContent>(dataSentenceToCheck: PCheckedDataSentence, loadedSettings: Gordic.Eko.Interface.PSettingsDto, definiceRozvrh: ObjectLiteral<Gordic.Eko.Interface.PKontrolaDataDto[]>): PCheckError | PCheckResult<TValue>;
    }
}
declare namespace Gordic.Eko.WebClient {
    export interface PrefilledDS {
        /**
         * Editovaný řádek
         */
        row?: Partial<Gordic.Eko.Interface.GUctdrozMoreDto>;
    }
    export interface DSNewRecordBase {
        /**
       * Pořadí v datové větě
       */
        wordSequence?: number;
        /**
       * Mód otevírání contentu
       * edit - Editace existujícího datového slova / v pořizovačce také při přidání nového datového slova
       * add -  Přidání nového datového slova bez předvyplněné datové věty
       * addWithDS - Přidání nového datového slova s předvyplněnou datovou větou
         * editWithDS - Editace existujícího datového slova s předvyplněnou datovou větou
       */
        mode: GNewRecordDlgMode;
        /**
        * Datová věta
        */
        dataSentence?: Gordic.Eko.WebClient.GDataSentenceDto;
        /**
         * Identifikátor rozvrhu
         */
        ixsRoz?: string | null;
        /**
        * Rok rozvrhu, použije se když není v dataSentence
        */
        year?: number | null;
        data?: Gordic.Eko.Interface.GUctdrozMoreDto[];
        loadedPlan?: any;
    }
    export interface DSNewRecordOptions extends DSNewRecordBase {
        mode: "add";
        /** nová hodnota */
        newValue: Partial<Eko.WebClient.PCheckedDataWords>;
        /**
        * Pořadí v datové větě
        */
        wordSequence: number;
    }
    export interface DSNewRecordWithPlanOptions extends DSNewRecordBase {
        mode: "addWithPlan";
        /** nová hodnota */
        newValue: Partial<Eko.WebClient.PCheckedDataWords>;
        /**
        * Pořadí v datové větě
        */
        wordSequence: number;
        loadedPlan: any;
    }
    export interface NewRecordWithDS extends DSNewRecordBase, PrefilledDS {
        mode: "addWithDS";
        wordSequence: number;
        /** nová hodnota */
        newValue?: Partial<Eko.WebClient.PCheckedDataWords>;
    }
    export interface DSEditRecordOptions extends DSNewRecordBase {
        mode: "edit";
        /** editovaná hodnota */
        newValue: string;
        wordSequence: number;
    }
    export interface EditRecordWithDS extends DSNewRecordBase, PrefilledDS {
        mode: "editWithDS";
        wordSequence: number;
        /** nová hodnota */
        newValue?: Partial<Eko.WebClient.PCheckedDataWords>;
    }
    export interface IndependAddDS extends DSNewRecordBase {
        mode: "indepAdd";
        wordSequence: number;
    }
    export interface MultiEditDS extends DSNewRecordBase {
        mode: "multiEdit";
        data: Gordic.Eko.Interface.GUctdrozMoreDto[];
    }
    type GNewRecordDlgOptionsType = DSNewRecordOptions | NewRecordWithDS | DSEditRecordOptions | EditRecordWithDS | IndependAddDS | MultiEditDS | DSNewRecordWithPlanOptions;
    type GNewRecordDlgMode = "add" | "addWithPlan" | "edit" | "editWithDS" | "addWithDS" | "indepAdd" | "multiEdit";
    export class GNewRecordDlg extends GContentBase implements IGContent {
        /**
         * Zobrazi dialog pro pridani noveho zaznamu do rozvrhu, vraci promise
         * @param {GNewRecordDlgOptionsType} options parametry dialogu
         * @param {HTMLElement} parentElement promise dat, vysledkem je potvrzeni "OK" - je mozne predelat na vraceni dat.slova nebo duvod proc nedopadlo pridani do rozvrhu
         */
        static showDlg(options: GNewRecordDlgOptionsType, parentElement?: HTMLElement): JQuery.Promise<any, any, any>;
        /**
         * Mod oteviraneho dialogu
         * @type {GNewRecordDlgMode}
         */
        private mode;
        private levelData;
        private sequence;
        private activityData;
        private zdData;
        private kumulaceData;
        private newRecordForm;
        private usedDataWords;
        private validators;
        private model;
        private nValue?;
        /**
         * Naplneni dialogu dostupnymi daty z contentu
         */
        onContentReady(): void;
        /**
         * capitalizeFirstLetter
         * Pomocna funkce, ktera prevede prvni pismeno na velke. Napr. uea => Uea
         * @param {any} string
         */
        private capitalizeFirstLetter;
        private enableFields;
        /**
         * Ulozeni a uzavreni dialogu
         */
        private saveAndCloseDet;
    }
    export {};
}
declare namespace Gordic.Eko.Prefabs.Fields {
    interface GEkoNavazaniRealizatoriOptions {
        ixp: string;
        agenda: string;
        parentContent: GContent;
    }
    function navazaniRealizatoriPrefab(userOptions: GEkoNavazaniRealizatoriOptions): [Gordic.Forms.FormField];
    function currency(userOptions?: GNumberBoxOptions<Decimal>): GNumberBoxOptions<Decimal>;
}
/** protypy */
declare namespace Gordic.Eko.Prototypes {
}
declare namespace Gordic.Eko.Prefabs.VazbyNaDoklady {
    function uct(): Eko.WebClient.IGVazbaNaDokladProvider;
    function roz(): Eko.WebClient.IGVazbaNaDokladProvider;
    function sml(): Eko.WebClient.IGVazbaNaDokladProvider;
    function evz(): Eko.WebClient.IGVazbaNaDokladProvider;
}
declare namespace Gordic.Eko.WebClient {
    interface GElementsOptions {
        typSestavy: GEkoTypSestavy;
        filterOptions: Gordic.Eko.WebClient.Dto.GFilterOptionsDto;
        globals: {};
        filterParams: Gordic.Eko.WebClient.GFilterParamsDto;
        cfuSet: Gordic.Data.GridFormat;
        ekoParams: Gordic.Eko.WebClient.GEkoParamsDto;
    }
    class GElementUtils {
        static createElementsGridFormat(options: GElementsOptions): Gordic.Data.GridFormat<Interface.GEkoFilterRzbDto>;
        static createNewElementFunc(ekoParams: GEkoParamsDto): Gordic.Eko.Prefabs.CreateElementRecord<Gordic.Eko.Prefabs.IGCfuDto>;
        static createClearElementFunc(): Gordic.Eko.Prefabs.ClearElementRecord<Gordic.Eko.Prefabs.IGCfuDto>;
        /** Zjisti, ktere sloupce gridFormatu nemaji byt viditelne na zastupne hodnote elementoveho policka */
        static getElementValueSkipColumns(): string[];
    }
}
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Eko.WebClient.GRozborEko.js                                                        </Name>
//    <Description> GRozborEko                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
declare namespace Gordic.Eko.WebClient {
    class GRozborEko extends GContentBase {
        private pozadavek;
        private sesTreeParams;
        private sestava;
        private wrid;
        private row;
        private columnSelector;
        private filterParams;
        private ekoParams;
        private readonly filterOptions;
        title: string;
        taskId: string;
        onContentReady(): void;
        private getElementFormat;
    }
}
declare namespace Gordic.Eko.WebClient {
    interface IEkoTextySestavInput {
        /**
         * Klic knihy
         */
        ixpDen: string;
        /**
         * Klic funkce
         */
        ixsFun: string;
        /**
         * Názvy parametrů
         */
        ParamNames: string[];
    }
    class GEkoTextySestavControl extends GContentBase implements IGClientContent {
        title: string;
        private vstup;
        private pouzeNaKnihu;
        private naKnihuAFunkci;
        private vyberZdroje;
        prepareContent(vstup: IEkoTextySestavInput): void;
        /**
         * Vytvoreni formulare
         */
        private createForm;
        /**
         * Naplneni hodnot do pomocnych poli
         *
         */
        private fillValueToArrays;
        /**
         * Ulozeni dat
         */
        private save;
        /**
         * Nacteni dat
         * @returns
         */
        private _loadData;
        /**
         * Naplneni policek hodnotami z nactenych poli
         */
        private fillPolicka;
        /**
         * Zavirani contentu
         * @returns
         */
        closing(): JQueryPromise<any>;
    }
}
/**
 * Extension pro společné věci EKO v gridu
 *
 * @author Martin Boček
 * @since 486.1.0.125
 */
declare namespace Gordic.Widget.GGridEko {
    interface IGGridEkoOptions extends JQueryUI.WidgetOptions {
        /**
         * Součtový řádek je na gridu povolen
         * @type {boolean}
         */
        summaryRowAllowed?: boolean;
        /**
         * Součtový řádek je zapnut
         * @type {boolean}
         */
        summaryRow?: boolean;
        /**
         * Seznam součtovaných sloupců
         * @type {string[]}
         */
        summaryRowColumns?: string[];
        /**
         * Podmínka pro součtované řádky (true = má se součtovat, false = nemá se součtovat)
         * @type {(data: MetaRow<any>) => boolean}
         */
        summaryRowCondition?: (data: MetaRow<any>) => boolean;
        /**
         * Obsluha dlouhého seznamu je na gridu povolena
         * @type {boolean}
         */
        longListAllowed?: boolean;
        /**
         * Cesta uživatelského nastavení modulu (buď zadaná přímo jako základní část, ke které se pak doplní zbytek cesty, nebo jako obě kompletní cesty, ke kterým už se pak nic nedoplňuje)
         * @type {string | { warning: string, maxCount: string }}
         */
        longListModel?: string | {
            warning: string;
            maxCount: string;
        };
        /**
         * Metoda pro zjištění počtu záznamů podle requestu
         * @type {(rq: Isl.GServiceListRequest) => JQueryPromise<number>}
         */
        longListCountMethod?: (rq: Isl.GServiceListRequest) => JQueryPromise<number>;
        /**
         * Volitelná metoda pro úpravu request před kontrolou počtu záznamů (pokud vrátí false, je načtení dat zastaveno)
         * @type {(rq: Isl.GServiceListRequest) => boolean}
         */
        longListModifyRqMethod?: (rq: Isl.GServiceListRequest) => boolean;
        /**
         * Používat uživatelské nastavení (pak se ignorují longListWarning a longListMaxCount)
         * @type {boolean}
         */
        longListUserSettings?: boolean;
        /**
         * Varovat před načtením dlouhého seznamu
         * @type {boolean}
         */
        longListWarning?: boolean;
        /**
         * Maximální počet záznamů při varování
         * @type {number}
         */
        longListMaxCount?: number;
    }
    /**
     * JQuery widget
     */
    class GGridEko<TRow> extends JQueryWidget<IGGridEkoOptions> {
        static widgetName: string;
        static defaultOptions: IGGridEkoOptions;
        gridEkoSettings: GObservableObject<{
            summaryRow: boolean;
        }>;
        summaryRowLastColumns: string[] | undefined;
        summaryRowLastGridColumns: GGridColumn<TRow>[] | undefined;
        summaryRowAllCurrencyGC: GGridColumn;
        protected _getCreateOptions(): IGGridEkoOptions;
        _create(): void;
        _destroy(): void;
        protected _setOption(key: string, value: any): void;
        protected _setOptions(opts: Partial<IGGridEkoOptions>): void;
        refresh(): void;
        /**
         * Přidání voleb do nastavení profilu
         *
         * @param {any} ctx kontext
         */
        private _addItemsToProfileConfig;
        /**
         * Aktualizace součtového řádku
         *
         * @param {GridProfile<TRow>} [profile] aktuální profile (není-li zadán, vezme se profil z gridu)
         */
        private _updateSummaryRow;
        /**
         * Vrátí seznam sloupců aktuálního profilu gridu, které jsou typu částka nebo číslo
         *
         * @returns {GGridColumn<TRow>[]} seznam měnových a číselných sloupců
         */
        private _getColumnsForSummaryRow;
        /**
         * Zjištění hodnoty z profilu nebo z uživatelského nastavení pro varování před načtením dlouhého seznamu
         *
         * @param {GridProfile<TRow>} [profile] aktuální profile (není-li zadán, vezme se profil z gridu)
         * @param {string} path cesta uživatelského nastavení modulu (není-li vyplněna, vezme se hodnota z this.options.longListModel, která musí být string)
         * @param {boolean} pathIsComplete (default = false) v path je předána kompletní cesta (true = and, false (default) = ne)
         * @returns {boolean} aktuální hodnota
         */
        private _getSettingsListWarning;
        /**
         * Zjištění hodnoty z profilu nebo z uživatelského nastavení pro maximální počet záznamů při varování před načtením dlouhého seznamu
         *
         * @param {GridProfile<TRow>} [profile] aktuální profile (není-li zadán, vezme se profil z gridu)
         * @param {string} path cesta uživatelského nastavení modulu (není-li vyplněna, vezme se hodnota z this.options.longListModel, která musí být string)
         * @param {boolean} pathIsComplete (default = false) v path je předána kompletní cesta (true = and, false (default) = ne)
         * @returns {number} aktuální hodnota
         */
        private _getSettingsListMaxCount;
    }
}
interface JQuery {
    ggrideko(options?: Gordic.Widget.GGridEko.IGGridEkoOptions): JQuery;
    ggrideko(method: "option"): Gordic.Widget.GGridEko.IGGridEkoOptions;
    ggrideko(method: "option", values: Partial<Gordic.Widget.GGridEko.IGGridEkoOptions>): JQuery;
    ggrideko<K extends Extract<keyof Gordic.Widget.GGridEko.IGGridEkoOptions, string>>(method: "option", key: K): Gordic.Widget.GGridEko.IGGridEkoOptions[K];
    ggrideko<K extends Extract<keyof Gordic.Widget.GGridEko.IGGridEkoOptions, string>>(method: "option", key: K, value: Required<Gordic.Widget.GGridEko.IGGridEkoOptions>[K]): JQuery;
    ggrideko<TRow>(method: "instance"): Gordic.Widget.GGridEko.GGridEko<TRow>;
}
/**
 * Sdílené metody pro práci s gridem v EKO modulech
 *
 * @author Martin Boček
 * @since 484.1.0.86
 */
declare namespace Gordic.Eko.Grid {
    /**
     * Zástupný sloupec za všechny částkové sloupce (používaný v součtovém řádku)
     */
    const allCurrencyColumns = "(CURRENCY)";
    /**
     * Dohledá grid se zadanou třídou
     *
     * @param {string} classId třída gridu
     * @returns {JQuery | null} nalezený grid nebo null v případě, že nebyl nalezen
     */
    function getGrid(classId: string): JQuery | null;
    /**
     * Vrátí aktuálně vybraný řádek v gridu (součtový a jiný virtuální řádek je ignorován)
     *
     * @param {JQuery | string | null} gridSeznam seznamový grid zadaný buď přímo (JQuery) nebo přes třídu (string)
     * @returns {TRow | null} vybraný řádek nebo null (pokud není žádný vybrán nebo je seznam prázdný)
     */
    function currentRow<TRow = object>(gridSeznam: JQuery | string | null): TRow | null;
    /**
     * Vrátí aktuálně zaškrtnuté řádky v gridu zadaném přes třídu
     * Použijte metodu checkedRows se stejnými parametry
     * @deprecated Použijte metodu checkedRows se stejnými parametry
     *
     * @param {string} classId třída gridu
     * @param {boolean} checkedOnly (default = false) pouze zaškrtnuté řádky (true = ano, ostatní = i aktuálně označený)
     * @returns {TRow[] | null} pole zaškrtnutých řádků nebo null (pokud není žádný vybrán nebo je seznam prázdný)
     */
    function checkedRowsClass<TRow = object>(classId: string, checkedOnly?: boolean): TRow[] | null;
    /**
     * Vrátí aktuálně zaškrtnuté řádky v gridu
     *
     * @param {JQuery | string | null} gridSeznam seznamový grid zadaný buď přímo (JQuery) nebo přes třídu (string)
     * @param {boolean} checkedOnly (default = false) pouze zaškrtnuté řádky (true = ano, ostatní = i aktuálně označený)
     * @returns {TRow[] | null} pole zaškrtnutých řádků nebo null (pokud není žádný vybrán nebo je seznam prázdný)
     */
    function checkedRows<TRow = object>(gridSeznam: JQuery | string | null, checkedOnly?: boolean): TRow[] | null;
    /**
     * Vrátí naformátované datum
     *
     * @param {number | null | undefined} year rok
     * @param {number | null | undefined} month měsíc
     * @param {number | null | undefined} day den
     * @returns {string} naformátovaný datum
     */
    function formatDate(year: number | null | undefined, month: number | null | undefined, day: number | null | undefined): string;
    /**
     * Vrátí složený tvar bankovního účtu
     *
     * @param {string | null | undefined} bu bankovní účet
     * @param {string | null | undefined} sk směrový kód banky
     * @returns {string} výsledný složený tvar bankovního účtu
     */
    function formatBankovniUcetTxt(bu: string | null | undefined, sk: string | null | undefined): string;
    /**
     * Náhrada oddělovače řádků \n za nový řádek
     *
     * @param {string | null | undefined} popis popis
     * @param {boolean} oneRow (default = false) formátovat pro zobrazení v jednom řádku (true) nebo do více řádků (false)
     * @returns {string} přeformátovaný popis
     */
    function formatPopis(popis: string | null | undefined, oneRow?: boolean): string | null | undefined;
    /**
     * Potvrzovací dialog pro načtení většího počtu záznamů
     *
     * @param {GContent} gcontent content
     * @param {number} count aktuální počet záznamů
     * @param {number} maxCount nastavený limitní počet záznamů (v uživatelském nastavení)
     * @returns {JQuery} potvrzovací dialog
     */
    function confirmListLimit(gcontent: GContent, count: number, maxCount: number): JQuery;
    /**
     * Vytvoří seznam standardních WFL sloupců pro pohled gridu
     *
     * @param {boolean | string} [withDocumentOrListedColumns] včetně sloupců z dokumentu (true/false) nebo vyjmenované sloupce (sloupce oddělené čárkami, podporovány jsou sloupce T,V,P,O,PE,B)
     * @param {string | string[]} [prefixDocument] prefix (jeden nebo více) sloupců z dokumentu, defaultně je to "dokument" (má význam jen pro withDocument = true)
     * @returns {string} seznam sloupců
     */
    function getListWflColumns(withDocumentOrListedColumns?: boolean | string, prefixDocument?: string | string[]): string;
    /**
     * Vytvoření procesoru pro součtový řádek
     *
     * @param {Gordic.Data.GridFormat | GGridColumn[] | GGridTrueColumn<any>[]} gf gridformat nebo přímo seznam sloupců
     * @param {string[]} [columns] sloupce (nejsou-li zadány, vezmou se všechny sloupce typu decimal, která nejsou skryté, pokud zadány jsou vezmou se jen tyto sloupce, pokud jsou decimal nebo number)
     * @param {GObservableObject<{ summaryRow: boolean }>} [gridEkoSettings] nastavení součtového řádku (summaryRow: true = zapnut, false = vypnut)
     * @param {(data: MetaRow<any>) => boolean} [condition] případná podmínka, pokud se nemají součtovat všechny řádky
     * @returns {Gordic.Data.BaseProcessor} procesor pro součtový řádek
     */
    function createSummaryProcessor(gf: Gordic.Data.GridFormat | GGridColumn[] | GGridTrueColumn<any>[], columns?: string[], gridEkoSettings?: GObservableObject<{
        summaryRow: boolean;
    }>, condition?: (data: MetaRow<any>) => boolean): Gordic.Data.BaseProcessor;
    /**
     * Vrátí možnost zaškrtnutí řádku (zatím rozlišuje pouze součtový řádek - ten zaškrtnout nejde a ostatní jdou)
     *
     * @param {MetaRow<TRow>} row řádek s metadaty
     * @returns {boolean} příznak, je-li možné řádek zaškrtnout nebo ne
     */
    function getRowsCheckVisible<TRow>(row: MetaRow<TRow>): boolean;
    /**
     * Vrátí formát pro řádek (zatím rozlišuje pouze součtový řádek)
     *
     * @param {MetaRow<TRow>} row řádek s metadaty
     * @returns {string} styl řádku
     */
    function getRowsClass<TRow>(row: MetaRow<TRow>): string;
    /**
     * Test, je-li grid ve stavu umožňujícím editaci
     *
     * @param {JQuery} [grid] grid, na kterém se má stav kontrolovat
     * @param {{ profile: GridProfile<TDto> }} obj aktuální profil (není-li zadán, vezme se z gridu)
     * @param {boolean} flash zobrazovat/skrývat flash (true = ano, false = ne)
     * @param {JQuery} [flashCnt] div, kde se má varování zobrazovat (není li zadán, bude zobrazen standardně na contentu)
     * @param {() => boolean} [otherTest] metoda pro další testy
     * @param {Data.GridFormat<TDto>} [gridFormat] gridformát (ne-li zadán, nekontroluje se viditelnost všech sloupců v něm)
     * @param {GGridColumn[]} [sortedCfuSet] seznam sloupců věty (ne-li zadán, je zjištěn v metodě)
     * @returns {boolean} true = je možné editovat, false = není možné editovat
     */
    function isStateForEditing<TDto>(grid: JQuery, obj: {
        profile: GridProfile<TDto>;
    }, flash: boolean, flashCnt?: JQuery, otherTest?: () => boolean, gridFormat?: Data.GridFormat<TDto>, sortedCfuSet?: GGridColumn[]): boolean;
    /**
     * Zobrazí/schová flash s varováním, že grid není ve stavu umožňujícím editaci
     *
     * @param {JQuery} grid grid (pokud je nastaven flashCnt, tak na něm bude klikací přepnutí na defaultní profil gridu)
     * @param {boolean} gridOk je grid ve stavu umožňujícím editaci? (true = ano, false = ne)
     * @param {JQuery} [flashCnt] div, kde se má varování zobrazovat (není li zadán, bude zobrazen standardně na contentu)
     */
    function flashWithStateForEditing(grid: JQuery, gridOk: boolean, flashCnt?: JQuery): void;
    /**
     * Vratí formátovací podmínky pro grid
     *
     * @param {{ type: Eko.Utils.RecordFormatType, options: Partial<Gordic.Components.Grid.CondFormats.CondFormat> }[]} conditions pole podmínek (musí obsahovat id a pak vlastnosti podmíněného formátování)
     * @returns {Gordic.Components.Grid.CondFormats.CondFormat[]} výsledné formátovací podmínky
     */
    function getCondFormats(...conditions: {
        type: Eko.Utils.RecordFormatType;
        options: Partial<Gordic.Components.Grid.CondFormats.CondFormat>;
    }[]): Gordic.Components.Grid.CondFormats.CondFormat[];
    /**
     * Vrátí seznam sloupců vhodných pro kalkulačku nad seznamem (defaultně všechny sloupce typu částka, s možností přidání nebo odebrání vybraných sloupců)
     *
     * @param {Data.GridFormat} gridFormat gridformat
     * @param {string[]} columnsExclude případný seznam sloupců, které se nemají nikdy přidávat
     * @param {string[]} columnsInclude případný seznam sloupců, které se mají vždy přidávat (jen číselné)
     * @returns {string[]} seznam sloupců pro kalkulačku
     */
    function getColumnsForCalc(gridFormat: Data.GridFormat, columnsExclude?: string[], columnsInclude?: string[]): string[];
    /**
     * Prefaby agregátů pro sloupce
     *
     * @author vmaca
     * @since 52530.8
     */
    namespace Aggregates {
        function withFilteredData<TRow = any>(presets?: GGridColumnPropertyPresets<"aggregate"> | null, filterFunc?: (row: MetaRow<TRow>) => boolean): GGridColumnPropertyPresets<"aggregate", any> | null | undefined;
    }
    /**
     * Sdílené metody pro práci se sloupci v seznamech EKO modulů
     *
     * @author Martin Boček
     * @since 484.1.0.179
     */
    namespace Column {
        /**
         * Přidá scope do parametrů sloupce (jen do name, caption, field a fragment, pokud jsou zadány)
         *
         * @param {string} name parametry (bere se pouze name, caption, field a fragment)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GGridColumn} modifikované parametry sloupce
         */
        function addScopeToColumnParams(params: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GGridColumn;
        /**
         * Přidání sloupce IČO do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ico", caption: dle Gordic.Consts.DbShortcuts.ico, width: 100)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addIco(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce UCS do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ucs", caption: dle Gordic.Consts.DbShortcuts.ucs, width: 100)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addUcs(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce NKS do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "nks", caption: dle Gordic.Consts.DbShortcuts.nks, width: 100)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addNks(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce UUS do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "uus", caption: dle Gordic.Consts.DbShortcuts.uus, width: 80)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addUus(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce PID do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ixp", caption: "PID", width: 110, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addPid(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Kniha do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ixp_den_txt", caption: "Kniha", width: 160, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addKniha(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Agendové číslo do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ac_ag", caption: "Agendové číslo", width: 120, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addAgendoveCislo(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Evidenční číslo do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ac", caption: "Evidenční číslo", width: 120, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addEvidencniCislo(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Kategorie dokladu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ktg_typ_txt", caption: "Kategorie dokladu", width: 160)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addKategorieDokladu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Zkratka kategorie dokladu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ktg_typ_zkr", caption: "Ktg", tooltipTemplate: "{ktg_typ_txt}", width: 60, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addZkratkaKategorieDokladu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Typ dokladu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ixs_typ_txt", caption: "Typ dokladu", width: 160)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addTypDokladu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Druh dokladu (DRD) do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "drd", caption: "DRD", width: 50, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addDruhDokladu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Rok do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "rok", caption: "Rok", width: 50)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addRok(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Rok (krátká varianta) do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "rok", caption: "R ", width: 50, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addRokShort(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Měsíc do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "mesic", caption: "Měsíc", width: 60)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addMesic(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Měsíc (krátká varianta) do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "mesic", caption: "M ", width: 50, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addMesicShort(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Den do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "den", caption: "Den", width: 50)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addDen(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Den (krátká varianta) do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "den", caption: "D ", width: 50, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addDenShort(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Rok DPH do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "rok_dph", caption: "Rok DPH", width: 90)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addRokDph(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Měsíc DPH do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "mesic_dph", caption: "Měsíc DPH", width: 90)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addMesicDph(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Číslo dokladu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ac_ixe", caption: "Číslo dokladu", width: 70, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addCisloDokladu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Subřada do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "subrada_duz", caption: "Subřada", width: 50)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addSubrada(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Stav dokladu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "s_zau_txt", caption: "Stav dokladu", width: 70)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addStavDokladu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce MD do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c0", caption: "MD", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addMD(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Dal do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c1", caption: "Dal", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addDal(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Zpracovatel do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ixs_fun_akt_txt", caption: "Zpracovatel", width: 160, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addZpracovatel(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Kompetent do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ixs_fun_vyriz_txt", caption: "Kompetent", width: 160, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addKompetent(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Realizátor do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "cis_real_txt", caption: "Realizátor", width: 160, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addRealizator(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Částka do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_mena", caption: "Částka", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addCastka(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Měna do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "mena_zkr", caption: "Měna", width: 60, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addMena(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Částka v CZK do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c", caption: "Částka v CZK", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addCastkaCZK(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Popis do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "popis", caption: "Popis", width: 200)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addPopis(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Agenda do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "zkr_ag", caption: "Agenda", tooltipTemplate: "{typ_ag_txt}", width: 60)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addAgenda(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Datum evidence do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dat_evid", caption: "Datum evidence")
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addDatumEvidence(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Datum doručení do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dat_dor", caption: "Datum doručení")
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addDatumDoruceni(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Datum uskutečnění účetního případu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dat_uup", caption: "Datum UÚP", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addDatumUUP(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Datum splatnosti do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dat_spl", caption: "Datum splatnosti")
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addDatumSplatnosti(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Datum zdanitelného plnění do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dat_zdan", caption: "Datum zdan. plnění", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addDatumZdanPlneni(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce IČO subjektu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ico_esu", caption: "IČO subjektu", width: 90)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addIcoSubjektu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce DIČ subjektu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dic_esu", caption: "DIČ subjektu", width: 90)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addDicSubjektu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce RČ subjektu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "rc_esu", caption: "RČ subjektu", width: 90)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addRcSubjektu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Název subjektu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "nazev_esu", caption: "Název subjektu", width: 200)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addNazevSubjektu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Adresa subjektu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "adresa_esu", caption: "Adresa subjektu", width: 200)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addAdresaSubjektu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Bankovní účet subjektu do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "bu_txt", caption: "Bankovní účet subjektu", width: 150)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addBankovniUcetSubjektu(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Bankovní účet vlastní do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "bu_vl_txt", caption: "Bankovní účet vlastní", width: 150)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addBankovniUcetVlastni(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Bankovní účet cizí do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "bu_ci_txt", caption: "Bankovní účet cizí", width: 150)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addBankovniUcetCizi(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce VS do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "vs", caption: "VS", width: 90, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addVs(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce KS do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ks", caption: "KS", width: 50, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addKs(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce SS do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ss", caption: "SS", width: 90, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addSs(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Typ entity do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinované jsou vlastnosti dané původní Wfl metodou)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addTypEntity(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Barevné označení (barevný puntík) do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinované jsou vlastnosti dané původní Wfl metodou)
         * @param {string} [scope] případný prefix jména sloupce bez tečky (je-li vyplněn, bude s tečkou přidán do jména sloupce a výsledný sloupec bude "scope.name" místo "name")
         * @param {string} [scopeTitle] případný prefix titulku sloupce (je-li vyplněn, bude s pomlčkou přidán do titulku sloupce a výsledný titulek bude "scopeTitle - Caption" místo "Caption")
         * @param {(row?: TRow) => boolean} [readonlyFunc] metoda pro vyhodnocení editovatelnosti barevného označení
         * @param {Data.IGStorage | null} [globalSettings] uživatelské nastavení
         */
        function addBarevneOznaceni<TRow = any>(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: string, scopeTitle?: string, readonlyFunc?: (row?: TRow) => boolean, globalSettings?: Data.IGStorage | null): void;
        /**
         * Přidání sloupce Barvevné označení (barevný puntík) do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinované jsou vlastnosti dané původní Wfl metodou)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @param {(row?: TRow) => boolean} [readonlyFunc] metoda pro vyhodnocení editovatelnosti barevného označení
         * @param {Data.IGStorage | null} [globalSettings] uživatelské nastavení
         */
        function addBarva<TRow = any>(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[], readonlyFunc?: (row?: TRow) => boolean, globalSettings?: Data.IGStorage | null): void;
        /**
         * Přidání sloupce Přeevidence do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "preevidence", caption: "P ", description: ..., fragment: Interface.GWflForEkoDtoFragments.preevidence, a další)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addPreevidence(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Vlastnictví do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "vlastnictvi", caption: "V ", description: ..., fragment: Interface.GWflForEkoDtoFragments.vlastnictvi, a další)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addVlastnictvi(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Počet el. příloh do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "el_prilohy_pocet", caption: "PE", width: 36, description: ..., fragment: Interface.GWflForEkoDtoFragments.el_prilohy_pocet, a další)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addPocetElPriloh(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce El. obraz do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "el_obraz_typ", caption: "O ", description: ..., fragment: Interface.GWflForEkoDtoFragments.el_obraz_typ, a další). Kromě el_obraz_typ z DTO používá ještě el_obraz_soubor
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addElObraz(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání standardních WFL sloupců (přeevidence, vlastniství, el. přílohy a el. obraz) do existujícího gridformatu.
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [paramsPreevidence] další vlastnosti sloupce přeevidence (předdefinové jsou name: "preevidence", caption: "P ", description: ..., fragment: Interface.GWflForEkoDtoFragments.preevidence, a další)
         * @param {GGridColumn} [paramsVlastnictvi] další vlastnosti sloupce vlastniství (předdefinové jsou name: "vlastnictvi", caption: "V ", description: ..., fragment: Interface.GWflForEkoDtoFragments.vlastnictvi, a další)
         * @param {GGridColumn} [paramsElPrilohy] další vlastnosti sloupce el. přílohy (předdefinové jsou name: "el_prilohy_pocet", caption: "PE", width: 36, description: ..., fragment: Interface.GWflForEkoDtoFragments.el_prilohy_pocet, a další)
         * @param {GGridColumn} [paramsElObraz] další vlastnosti sloupce el. obraz (předdefinové jsou name: "el_obraz_typ", caption: "O ", description: ..., fragment: Interface.GWflForEkoDtoFragments.el_obraz_typ, a další). Kromě el_obraz_typ z DTO používá ještě el_obraz_soubor
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addWflColumns(columns: Gordic.Data.GridFormat, paramsPreevidence?: GGridColumn, paramsVlastnictvi?: GGridColumn, paramsElPrilohy?: GGridColumn, paramsElObraz?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání sloupce Přečteno do existujícího gridformatu
         *
         * @param {Gordic.Data.GridFormat} columns gridformat
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "priz_view", caption: "Přečteno", a další).
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addPrecteno(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
        /**
         * Přidání ikonového sloupce Stav Eko schvalovacího procesu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "stav_eko_schval", caption: "EKO Schval", a další).
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         */
        function addStavEkoSchvalColumn(columns: Gordic.Data.GridFormat, params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): void;
    }
}
declare namespace Gordic.Data {
    interface GridFormat {
        /**
         * Přidání sloupce IČO do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ico", caption: dle Gordic.Consts.DbShortcuts.ico, width: 100)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addIco(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce UCS do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ucs", caption: dle Gordic.Consts.DbShortcuts.ucs, width: 100)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addUcs(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce NKS do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "nks", caption: dle Gordic.Consts.DbShortcuts.nks, width: 100)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addNks(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce UUS do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "uus", caption: dle Gordic.Consts.DbShortcuts.uus, width: 80)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addUus(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce PID do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ixp", caption: "PID", width: 110, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addPid(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Kniha do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ixp_den_txt", caption: "Kniha", width: 160, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addKniha(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Agendové číslo do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ac_ag", caption: "Agendové číslo", width: 120, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addAgendoveCislo(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Evidenční číslo do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ac", caption: "Evidenční číslo", width: 120, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addEvidencniCislo(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Kategorie dokladu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ktg_typ_txt", caption: "Kategorie dokladu", width: 160)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addKategorieDokladu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Zkratka kategorie dokladu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ktg_typ_zkr", caption: "Ktg", tooltipTemplate: "{ktg_typ_txt}", width: 60, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addZkratkaKategorieDokladu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Typ dokladu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ixs_typ_txt", caption: "Typ dokladu", width: 160)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addTypDokladu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Druh dokladu (DRD) do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "drd", caption: "DRD", width: 50, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addDruhDokladu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Rok do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "rok", caption: "Rok", width: 50)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addRok(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Rok (krátká varianta) do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "rok", caption: "R ", width: 50, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addRokShort(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Měsíc do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "mesic", caption: "Měsíc", width: 60)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addMesic(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Měsíc (krátká varianta) do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "mesic", caption: "M ", width: 50, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addMesicShort(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Den do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "den", caption: "Den", width: 50)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addDen(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Den (krátká varianta) do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "den", caption: "D ", width: 50, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addDenShort(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Rok DPH do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "rok_dph", caption: "Rok DPH", width: 90)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addRokDph(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Měsíc DPH do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "mesic_dph", caption: "Měsíc DPH", width: 90)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addMesicDph(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Číslo dokladu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ac_ixe", caption: "Číslo dokladu", width: 70, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addCisloDokladu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Subřada do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "subrada_duz", caption: "Subřada", width: 50)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addSubrada(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Stav dokladu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "s_zau_txt", caption: "Stav dokladu", width: 70)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addStavDokladu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce MD do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c0", caption: "MD", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addMD(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Dal do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c1", caption: "Dal", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addDal(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Zpracovatel do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ixs_fun_akt_txt", caption: "Zpracovatel", width: 160, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addZpracovatel(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Kompetent do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ixs_fun_vyriz_txt", caption: "Kompetent", width: 160, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addKompetent(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Realizátor do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "cis_real_txt", caption: "Realizátor", width: 160, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addRealizator(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Částka do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c_mena", caption: "Částka", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addCastka(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Měna do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "mena_zkr", caption: "Měna", width: 60, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addMena(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Částka v CZK do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "c", caption: "Částka v CZK", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addCastkaCZK(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Popis do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "popis", caption: "Popis", width: 200)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addPopis(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Agenda do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "zkr_ag", caption: "Agenda", tooltipTemplate: "{typ_ag_txt}", width: 60)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addAgenda(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Datum evidence do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dat_evid", caption: "Datum evidence")
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addDatumEvidence(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Datum doručení do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dat_dor", caption: "Datum doručení")
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addDatumDoruceni(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Datum uskutečnění účetního případu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dat_uup", caption: "Datum UÚP", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addDatumUUP(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Datum splatnosti do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dat_spl", caption: "Datum splatnosti")
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addDatumSplatnosti(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Datum zdanitelného plnění do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dat_zdan", caption: "Datum zdan. plnění", description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addDatumZdanPlneni(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce IČO subjektu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ico_esu", caption: "IČO subjektu", width: 90)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addIcoSubjektu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce DIČ subjektu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "dic_esu", caption: "DIČ subjektu", width: 90)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addDicSubjektu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce RČ subjektu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "rc_esu", caption: "RČ subjektu", width: 90)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addRcSubjektu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Název subjektu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "nazev_esu", caption: "Název subjektu", width: 200)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addNazevSubjektu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Adresa subjektu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "adresa_esu", caption: "Adresa subjektu", width: 200)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addAdresaSubjektu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Bankovní účet subjektu do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "bu_txt", caption: "Bankovní účet subjektu", width: 150)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addBankovniUcetSubjektu(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Bankovní účet vlastní do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "bu_vl_txt", caption: "Bankovní účet vlastní", width: 150)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addBankovniUcetVlastni(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Bankovní účet cizí do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "bu_ci_txt", caption: "Bankovní účet cizí", width: 150)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addBankovniUcetCizi(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce VS do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "vs", caption: "VS", width: 90, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addVs(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce KS do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ks", caption: "KS", width: 50, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addKs(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce SS do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "ss", caption: "SS", width: 90, description: ...)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addSs(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Typ entity do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinované jsou vlastnosti dané původní Wfl metodou)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addTypEntity(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Barvevné označení (barevný puntík) do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinované jsou vlastnosti dané původní Wfl metodou)
         * @param {string} [scope] případný prefix jména sloupce bez tečky (je-li vyplněn, bude s tečkou přidán do jména sloupce a výsledný sloupec bude "scope.name" místo "name")
         * @param {string} [scopeTitle] případný prefix titulku sloupce (je-li vyplněn, bude s pomlčkou přidán do titulku sloupce a výsledný titulek bude "scopeTitle - Caption" místo "Caption")
         * @param {(row?: TRow) => boolean} [readonlyFunc] metoda pro vyhodnocení editovatelnosti barevného označení
         * @param {Data.IGStorage | null} [globalSettings] uživatelské nastavení
         * @returns {GridFormat} gridformat
         */
        addBarevneOznaceni<TRow = any>(params?: GGridColumn, scope?: string, scopeTitle?: string, readonlyFunc?: (row?: TRow) => boolean, globalSettings?: Data.IGStorage | null): GridFormat;
        /**
         * Přidání sloupce Barvevné označení (barevný puntík) do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinované jsou vlastnosti dané původní Wfl metodou)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @param {(row?: TRow) => boolean} [readonlyFunc] metoda pro vyhodnocení editovatelnosti barevného označení
         * @param {Data.IGStorage | null} [globalSettings] uživatelské nastavení
         * @returns {GridFormat} gridformat
         */
        addBarva<TRow = any>(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[], readonlyFunc?: (row?: TRow) => boolean, globalSettings?: Data.IGStorage | null): GridFormat;
        /**
         * Přidání sloupce Přeevidence do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "preevidence", caption: "P ", description: ..., fragment: Interface.GWflForEkoDtoFragments.preevidence, a další)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addPreevidence(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Vlastnictví do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "vlastnictvi", caption: "V ", description: ..., fragment: Interface.GWflForEkoDtoFragments.vlastnictvi, a další)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addVlastnictvi(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Počet el. příloh do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "el_prilohy_pocet", caption: "PE", width: 36, description: ..., fragment: Interface.GWflForEkoDtoFragments.el_prilohy_pocet, a další)
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addPocetElPriloh(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce El. obraz do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "el_obraz_typ", caption: "O ", description: ..., fragment: Interface.GWflForEkoDtoFragments.el_obraz_typ, a další). Kromě el_obraz_typ z DTO používá ještě el_obraz_soubor
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addElObraz(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání standardních WFL sloupců (přeevidence, vlastniství, el. přílohy a el. obraz) do existujícího gridformatu.
         *
         * @param {GGridColumn} [paramsPreevidence] další vlastnosti sloupce přeevidence (předdefinové jsou name: "preevidence", caption: "P ", description: ..., fragment: Interface.GWflForEkoDtoFragments.preevidence, a další)
         * @param {GGridColumn} [paramsVlastnictvi] další vlastnosti sloupce vlastniství (předdefinové jsou name: "vlastnictvi", caption: "V ", description: ..., fragment: Interface.GWflForEkoDtoFragments.vlastnictvi, a další)
         * @param {GGridColumn} [paramsElPrilohy] další vlastnosti sloupce el. přílohy (předdefinové jsou name: "el_prilohy_pocet", caption: "PE", width: 36, description: ..., fragment: Interface.GWflForEkoDtoFragments.el_prilohy_pocet, a další)
         * @param {GGridColumn} [paramsElObraz] další vlastnosti sloupce el. obraz (předdefinové jsou name: "el_obraz_typ", caption: "O ", description: ..., fragment: Interface.GWflForEkoDtoFragments.el_obraz_typ, a další). Kromě el_obraz_typ z DTO používá ještě el_obraz_soubor
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addWflColumns(paramsPreevidence?: GGridColumn, paramsVlastnictvi?: GGridColumn, paramsElPrilohy?: GGridColumn, paramsElObraz?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání sloupce Přečteno do existujícího gridformatu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "priz_view", caption: "Přečteno", a další).
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addPrecteno(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
        /**
         * Přidání ikonového sloupce Stav Eko schvalovacího procesu
         *
         * @param {GGridColumn} [params] další vlastnosti sloupce (předdefinové jsou name: "stav_eko_schval", caption: "EKO Schval", a další).
         * @param {Gin.WebClient.GScopeOptionLevel[]} [scope] případný scope
         * @returns {GridFormat} gridformat
         */
        addStavEkoSchvalColumn(params?: GGridColumn, scope?: Gin.WebClient.GScopeOptionLevel[]): GridFormat;
    }
}
declare namespace Gordic.Eko.WebClient.Common {
    /**
     * Nastavi aktuálni řádek
     *
     * @param {JQuery} gridSeznam seznamový grid
     * @returns {TRow | null} vybraný řádek nebo null (pokud není žádný vybrán nebo je seznam prázdný)
    */
    function setCurrentRow<TRow = object>(gridSeznam: JQuery, row: TRow): void;
    /**
     * Dohledeni view pro grid
     *
     * @param {JQuery} grid
     * @returns
     */
    function GetView(grid: JQuery): Gordic.Data.View;
    /**
     * Nacteni vsech radku na gridu
     * @param {JQuery} grid
     * @returns
     */
    function GetAllRows<TRow = object>(grid: JQuery): TRow[];
    /**
     * Zjisteni instance gridu
     * @param grid
     * @returns
     */
    function GetInstanceGrid(grid: JQuery): any;
    /**
     * Celkovy pocet radku gridu
     * @param {JQuery} grid
     * @returns
     */
    function CelkovyPocetRadku(grid: JQuery): number;
    /**
     * Zadani textu uzivatelem
     * @param {GContent} content
     * @param {string} title
     * @param {string} caption
     * @returns
     */
    function ZadaniTextu(content: GContent, title: string, caption: string): JQuery.Promise<any>;
    /**
     * Zobrazeni uzivatelskeho dotazu
     * @param {GContent} content
     * @param {any} parametr
     * @returns
     */
    function Dotaz(content: GContent, parametr: Gordic.Eko.Interface.GTransferMessage | string, object?: ObjectLiteral<any>): JQuery.Promise<any>;
    /**
     * Zobrazeni uzivatelskeho varovneho dotazu
     * @param {GContent} content
     * @param {any} parametr
     * @returns
     */
    function DotazWarning(content: GContent, parametr: Gordic.Eko.Interface.GTransferMessage): JQuery.Promise<any>;
    /**
     * Zobrazeni hlasky
     * @param {GContent} content
     * @param {any} parametr
     * @returns
     */
    function ZobrazeniHlasky(content: GContent, parametr: Gordic.Eko.Interface.GTransferMessage, object?: ObjectLiteral<any>): JQueryPromise<any>;
    /**
     * Zpracovani zpravy
     * @param {GContent} content
     * @param {any} zprava
     * @returns
     */
    function ZpracovaniZpravy(content: GContent, zprava: Gordic.Eko.Interface.GTransferMessage, externProcessed?: (content: GContent, message: Eko.Interface.GTransferMessage, deffer: JQuery.Deferred<any, any, any>, object?: object) => JQueryPromise<any>, object?: object): JQueryPromise<Gordic.Eko.Interface.GTransferMessage>;
    /**
     * Zobrazeni ulozeneho reportu (stazeni ulozeneho souboru)
     * @param {GContent} content
     * @param {any} reportFile
     * @param {any} myParam
     */
    function ShowReportForm(content: GContent, reportFile: any, myParam: any, object?: ObjectLiteral<any>): JQueryPromise<any>;
    /**
     * Zobrazeni/ generovani reportu
     * @param {GContent} content
     * @param {any} myParam
     * @returns
     */
    function ZobrazReport(content: GContent, myParam: any, object?: ObjectLiteral<any>): JQueryPromise<any>;
    /**
     * Zobrazeni reportu - bude zruseno
     * @param {GContent} content
     * @param {any} myParam
     * @returns
     */
    function ZobrazReport2(content: GContent, myParam: any, object?: ObjectLiteral<any>): JQueryPromise<any>;
    /**
     * Stazeni ulozeneho reportu
     * @param {GContent} content
     * @param {any} reportFile
     * @returns
     */
    function DownloadReport(content: GContent, reportFile: any): JQueryPromise<any>;
    /**
     * Ze vstupniho objektu se vraci pole zprav, nebo null
     * @param {any} entry
     * @returns
     */
    function GetTranMessage(entry: any, ownObject?: any): Gordic.Eko.Interface.GTransferMessage[] | null;
    /**
     * Ze vstupniho objektu se vraci pole zprav, nebo null
     * @param {any} entry
     * @returns
     */
    function GetTranMessages(entry: any, type: any, ownObject?: any): Gordic.Eko.Interface.GTransferMessage[] | null;
    /**
     * Spusteni zpracovani vyjimky
     * @param content
     * @param entry
     * @param type
     * @param object
     * @param ownObjectNastaveni
     * @param externProcessed
     */
    function ResolveExeption(content: GContent, entry: any, type: any, object?: any, ownObjectNastaveni?: any, externProcessed?: (content: GContent, message: Eko.Interface.GTransferMessage, object: object) => JQueryPromise<any>): any;
    /**
     * Spusteni zpracovani vyjimky
     * @param content
     * @param erroObject
     * @param type
     * @param object
     * @param ownObjectNastaveni
     * @param externProcessed
     */
    function ResolveExeptionNew(content: GContent, erroObject: Error, ownObjectNastaveni?: any, externProcessed?: (content: GContent, message: Eko.Interface.GTransferMessage, object: object) => JQueryPromise<any>): any;
    /**
     * Obecne osetreni vyjimky
     *  TODO: Ve vyvoji
     * @param vstup
     * @returns
     */
    function ExceptionProcessing(vstup: {
        content: GContent;
        erroObject: Error;
        ownObjectNastaveni?: any;
        externProcessed?: (content: GContent, message: Eko.Interface.GTransferMessage, object: object) => JQueryPromise<any>;
        beforeStart?: () => boolean;
        repeat?: (returnValue: Gordic.Eko.Interface.GTransferMessage) => JQueryPromise<any>;
        error?: (returnValue: Gordic.Eko.Interface.GTransferMessage) => JQueryPromise<any>;
        userMessage?: (returnValue: Gordic.Eko.Interface.GTransferMessage) => JQueryPromise<any>;
        notServed?: (returnValue: Gordic.Eko.Interface.GTransferMessage) => JQueryPromise<any>;
        success?: (returnValue: Gordic.Eko.Interface.GTransferMessage) => JQueryPromise<any>;
    }): JQueryPromise<any>;
    /**
     * Zpracovani vsech zprav v poli
     *
     * @param {Gordic.Eko.Interface.GTransferMessage[]} zpravy  seznam zprav
     * @param {number} index - index zpracovavane zpravy (default 0)
     *
     * @returns {JQueryPromise<Gordic.Eko.Interface.GTransferMessage>} vraci ze vzdy jedna zprava a to posledni, pokud uzivatel neukoncil zpracovani
     */
    function ZpracovaniZprav(content: GContent, zpravy: Gordic.Eko.Interface.GTransferMessage[], index?: number, deffer?: JQuery.Deferred<any, any, any>, externProcessed?: (content: GContent, message: Eko.Interface.GTransferMessage, object: object) => JQueryPromise<any>, object?: object): JQueryPromise<Gordic.Eko.Interface.GTransferMessage>;
    /**
     * Zpracovani vsech zprav v poli
     *
     * @param {Gordic.Eko.Interface.GTransferMessage[]} zpravy  seznam zprav
     * @param {number} index - index zpracovavane zpravy (default 0)
     *
     * @returns {JQueryPromise<Gordic.Eko.Interface.GTransferMessage>} vraci ze vzdy jedna zprava a to posledni, pokud uzivatel neukoncil zpracovani
     */
    function ZpracovaniZprav1(content: GContent, zpravy: Gordic.Eko.Interface.GTransferMessage[], index?: number, deffer?: JQuery.Deferred<any, any, any>, object?: object): JQueryPromise<[Gordic.Eko.Interface.GTransferMessage, number]>;
}
declare namespace EKOUtils {
    /**
     * export function CallRemoteService
     *
     * Volani metod na serveru
     *
     * @param {string} methodName
     * @param {object | null | undefined} params
     * @param {string | null | undefined} remoteServiceName
     * @param {any | undefined} gpc
     * @returns {JQueryPromise<any>}
    */
    function CallRemoteService(content: GContent, methodName: string | undefined, params: object | null | undefined, remoteServiceName: string | null | undefined, gpc?: any): JQueryPromise<any>;
    /**
     * Obecné volání jiného kontentu včetně práce s pracovní tabulkou
     *
     * @param {GContent} gcontent content
     * @param {string} name jméno volaného kontentu (defaultní namespace je Gordic.Fuc.WebClient)
     *  *
     * @param {any} methodCalledIfSuccess navratova metoda
     * @param {any} [params] volitelné parametry kontentu
     * @returns {JQueryPromise<boolean>} promise s výsledkem volání contentu (true = byla zavolán, false = nebyla zavolán)
     */
    function callOtherContent(gcontent: GContent, name: string, faze?: string, methodCalledIfSuccess?: any, params?: any): JQueryPromise<any>;
}
declare namespace Gordic.Eko.Utils {
    function createBookGpc(currentGpc: ObjectLiteral<any>, ixp_den: string): ObjectLiteral<any> & {
        ixp_den: string;
    };
    function getEkoBookVariant(content: GContent): Eko.Interface.GEkoBookVariant;
    interface IGEkoBookExtension<TBookDto extends Eko.Interface.GEkosdenDto = Eko.Interface.GEkosdenDto, TFilterDto extends Eko.Interface.GBookFilterDto = Eko.Interface.GBookFilterDto> {
        ekoBookFilter: TFilterDto;
        ekoBook: TBookDto;
        enableAllBooks: boolean;
        enableYearBooks: boolean;
    }
    let EkoCfuItems: any[];
    /**
     * Typ záznamu (pro formátování/barvy)
     *
     * @author Martin Boček
     * @since 488.1.0.248
     */
    enum RecordFormatType {
        Schvaleno = 1,
        Realizovano = 2,
        Stornovano = 3,
        Vyrazeno = 4,
        Neprecteno = 10
    }
    /**
     * Metoda vrací pořizovací pole
     * @author PNovak
     * @date 2018-03-09
     */
    function porizovacFields(): Forms.FormRow[] | undefined;
    /**
     * ResponseInfoKind
     *
     * @author Vlastimil Máca
     * @since 480.1.0.102
     */
    enum ResponseInfoKind {
        success = 0,
        info = 1,
        warning = 2,
        error = 3
    }
    /**
     *
     * @author VMaca
     * @param info
     * @param cnt
     * @param id
     */
    function responseInfoToFlash(info: Gordic.Eko.WebClient.GResponseInfoDto[], cnt: GContent, id?: string, visibilityMap?: {
        [key in keyof typeof ResponseInfoKind]?: boolean;
    }): {
        counts: {
            success: number;
            info: number;
            warning: number;
            error: number;
        };
    };
    /**
     *
     * @author VMaca
     *
     */
    function responseInfoItemToFlash(info: Gordic.Eko.WebClient.GResponseInfoDto, id?: string): {
        counts: {
            success: number;
            info: number;
            warning: number;
            error: number;
        };
        flash: GFlashOptions;
    };
    /**
     * Zobrazení flashe se stavem knihy
     *
     * @param {GContent} gcontent content (včetně údajů o knize)
     * @param {number} [aktivita] aktivita subřady knihy (pokud je vyplněna, má přednost před údaji o knize z contentu)
     * @param {string} [path] základní cesta uživatelského nastavení modulu (default je Global.Eko.AppSettings)
     * @param {boolean} [pathIsComplete] v path je předána kompletní cesta (true = and, false (default) = ne)
     */
    function ShowEkoBookStateFlash(gcontent: GContent, aktivita?: number, path?: string, pathIsComplete?: boolean): void;
    /**
     * Definice formuláře do uživatelského nastavení pro volby knih
     *
     * @param {string} [path] základní cesta uživatelského nastavení modulu (default je Global.Eko.AppSettings)
     * @returns {Forms.Form} formulář
     * @author MBocek
     */
    function EkoUserSettingsEkoBook(path?: string): Forms.Form;
    /**
     * Zobrazeni formulare pro zadani uzivatelskeho textu pro sestavy
     * @param content - kontext
     * @param vstup - vstupní parametry
     * @returns
     */
    function ShowUserTextForReport(content: GContent, vstup: Gordic.Eko.WebClient.IEkoTextySestavInput): JQuery;
    /**
     * Definice formuláře do uživatelského nastavení pro volby knih
     *
     * @param {string} path základní cesta uživatelského nastavení modulu
     * @returns {Forms.Form} formulář
     * @author MBocek
     */
    function UserSettingsEkoBook(path: string): Forms.Form;
    /**
     * Definice formuláře do uživatelského nastavení pro volby seznamů
     *
     * @param {string} [path] základní cesta uživatelského nastavení modulu (default je Global.Eko.AppSettings)
     * @returns {Forms.Form} formulář
     * @author MBocek
     */
    function EkoUserSettingsList(path?: string): Forms.Form;
    /**
     * Definice formuláře do uživatelského nastavení pro volby seznamů
     *
     * @param {string} path základní cesta uživatelského nastavení modulu
     * @returns {Forms.Form} formulář
     * @author MBocek
     */
    function UserSettingsList(path: string): Forms.Form;
    /**
     * Definice formuláře do uživatelského nastavení pro volby práce s PIDem
     *
     * @param {string} gin_gen_ixp aktuální hodnota parametru automatického generování identifikátoru (gin_gen_ixp)
     * @param {string} [path] základní cesta uživatelského nastavení modulu (default je Global.Eko.AppSettings)
     * @returns {Forms.Form} formulář
     * @author MBocek
     */
    function EkoUserSettingsPid(gin_gen_ixp: string, path?: string): Forms.Form;
    /**
     * Definice formuláře do uživatelského nastavení pro volby práce s PIDem
     *
     * @param {string} path základní cesta uživatelského nastavení modulu (default je Global.Eko.AppSettings)
     * @param {string} gin_gen_ixp aktuální hodnota parametru automatického generování identifikátoru (gin_gen_ixp)
     * @returns {Forms.Form} formulář
     * @author MBocek
     */
    function UserSettingsPid(path: string, gin_gen_ixp: string): Forms.Form;
    /**
     * Zjištění hodnoty z uživatelského nastavení pro varování před načtením dlouhého seznamu
     *
     * @param {GContent} gcontent content
     * @param {string} [path] cesta uživatelského nastavení modulu (default je Global.Eko.AppSettings)
     * @param {boolean} [pathIsComplete] v path je předána kompletní cesta (true = and, false (default) = ne)
     * @returns {boolean} aktuální hodnota
     */
    function GetEkoUserSettingsListWarning(gcontent: GContent, path?: string, pathIsComplete?: boolean): boolean;
    /**
     * Zjištění hodnoty z uživatelského nastavení pro varování před načtením dlouhého seznamu
     *
     * @param {GContent} gcontent content
     * @param {string} path cesta uživatelského nastavení modulu
     * @param {boolean} [pathIsComplete] v path je předána kompletní cesta (true = and, false (default) = ne)
     * @returns {boolean} aktuální hodnota
     */
    function GetUserSettingsListWarning(gcontent: GContent, path: string, pathIsComplete?: boolean): boolean;
    /**
     * Zjištění hodnoty z uživatelského nastavení pro maximální počet záznamů při varování před načtením dlouhého seznamu
     *
     * @param {GContent} gcontent content
     * @param {string} [path] cesta uživatelského nastavení modulu (default je Global.Eko.AppSettings)
     * @param {boolean} [pathIsComplete] v path je předána kompletní cesta (true = and, false (default) = ne)
     * @returns {number} aktuální hodnota
     */
    function GetEkoUserSettingsListMaxCount(gcontent: GContent, path?: string, pathIsComplete?: boolean): number;
    /**
     * Zjištění hodnoty z uživatelského nastavení pro maximální počet záznamů při varování před načtením dlouhého seznamu
     *
     * @param {GContent} gcontent content
     * @param {string} path cesta uživatelského nastavení modulu
     * @param {boolean} [pathIsComplete] v path je předána kompletní cesta (true = and, false (default) = ne)
     * @returns {number} aktuální hodnota
     */
    function GetUserSettingsListMaxCount(gcontent: GContent, path: string, pathIsComplete?: boolean): number;
    /**
     * Zjištění hodnoty z uživatelského nastavení pro způsob zadání PIDu
     *
     * @param {GContent} gcontent content
     * @param {string} gin_gen_ixp aktuální hodnota parametru automatického generování identifikátoru (gin_gen_ixp)
     * @param {string} [path] cesta uživatelského nastavení modulu (default je Global.Eko.AppSettings)
     * @param {boolean} [pathIsComplete] v path je předána kompletní cesta (true = and, false (default) = ne)
     * @returns {string} aktuální hodnota ("0" = generování, "1" = sejmutí)
     */
    function GetEkoUserSettingsPidSejmuti(gcontent: GContent, gin_gen_ixp: string, path?: string, pathIsComplete?: boolean): string;
    /**
     * Zjištění hodnoty z uživatelského nastavení pro způsob zadání PIDu
     *
     * @param {GContent} gcontent content
     * @param {string} path základní cesta uživatelského nastavení modulu
     * @param {string} gin_gen_ixp aktuální hodnota parametru automatického generování identifikátoru (gin_gen_ixp)
     * @param {boolean} [pathIsComplete] v path je předána kompletní cesta (true = and, false (default) = ne)
     * @returns {string} aktuální hodnota ("0" = generování, "1" = sejmutí)
     */
    function GetUserSettingsPidSejmuti(gcontent: GContent, path: string, gin_gen_ixp: string, pathIsComplete?: boolean): string;
    /**
     * Byly změněny nějaké údaje v dokumentu?
     *
     * @param {GContent} gcontent content
     * @returns {boolean} true = je změna, false = není změna
     * @author Martin Boček
     */
    function DokumentHasChanged(gcontent: GContent): boolean;
    /**
     * Byly změněny nějaké údaje ve vlastnostech?
     *
     * @param {GContent} gcontent content
     * @returns {boolean} true = je změna, false = není změna
     * @author Martin Boček
     */
    function VlastnostiHasChanged(gcontent: GContent): boolean;
    /**
     * Řešení dlouhých seznamů
     *
     * @author Martin Boček
     * @since 486.1.0.39
     */
    interface IGLongListLimit {
        /**
         * Varovat před načtením dlouhého seznamu
         * @type {number}
         */
        LongListWarning: boolean;
        /**
         * Maximální počet záznamů (má význam pouze pokud je zapnuté varování před načtením dlouhého seznamu)
         * @type {number}
         */
        LongListMaxCount: number;
    }
    function checkEkoColumnsBeforeStartEditor(ev: any, obj: any): boolean;
    /**
     * IGEkoKontrolaMetadat
     *
     * @author tkares
     * @since 486.1.0.141
     */
    interface IGEkoKontrolaMetadat {
        /**
         * content
         * @type {GContent}
         */
        content: GContent;
        /**
         * seznam vybranych pidu
         * @type {string[]}
         */
        listIxp?: string[];
        listIxpRok?: Interface.GEkoPidRokDto[];
        /**
         * delegat metody spoustejici content s detailem
         * @type {(content: GContent}
         * @default > void | undefined
         */
        detailAkce?: ((content: GContent, ixp: string) => void | JQueryPromise<any>) | undefined;
    }
    /**
     * Kontrola metadat
     *
     *
     * @param {IGEkoKontrolaMetadat}
     *
     */
    function KontrolaMetadat(params: IGEkoKontrolaMetadat): JQueryPromise<any>;
    /**
     * Dashboardový provider pro výsledek hospodaření
     *
     * @param {GContent} gcontent content
     * @returns {Gordic.Dashboard.CustomProvider} provider
     */
    function DashboardEconomicResult(gcontent: GContent): Gordic.Dashboard.CustomProvider;
    /** Interface pro výsledek hromadného generování el. obrazů pro hromadné odeslání do výpravny*/
    interface GOdeslatPersistentAsyncTaskResult {
        Ixps: string[];
    }
}
declare namespace Gordic.Eko.GPorizovac.Utils {
    function getModelData(dto: any): any;
    function getDataSentenceModel(dto: any): any;
}
declare namespace Gordic.Eko.FilePreview {
    function displayDokladOZauctovani(ixp: any, ixb: any, drd: any, opts?: any): {
        gcontent: string;
        input: {
            source: Interface.GEkoFilePreviewEnum;
            conversion: any;
            cacheConversion: any;
            ixp: any;
            ixb: any;
            drd: any;
            forceNew: any;
            cacheKey: any;
        };
    };
}
declare namespace Gordic.Eko.WebClient {
    interface IGEkoAgendaOptions {
        /** Zkratka agendy*/
        agenda: string;
        /** delegat pro nacteni dat  */
        getData: () => JQueryPromise<Interface.GEkoAgendaDto[]>;
        /** metoda pro zjisteni prav k uzavreni agendy */
        permissions: (agendy: Interface.GEkoAgendaDto[]) => JQueryPromise<Interface.GEkoAgendaPermissions>;
        /** isl sluzba pro uzavreni agendy */
        close: (agendy: Interface.GEkoAgendaDto[]) => JQueryPromise<any>;
        /** Kontrola na moznost uzavrit agendu */
        checkClose: (agendy: Interface.GEkoAgendaDto[]) => JQueryPromise<Interface.GEkoAgendaDto[]> | undefined;
    }
    class GEkoAgenda extends GContentBase implements IGClientContent {
        private $grid;
        protected loadingData: boolean;
        private actUzavrit;
        protected agendaData: Interface.GEkoAgendaDto[];
        private options;
        private permissions;
        /**
         * task pro seznam
         * */
        protected taskList: Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<any>>;
        protected $filterPanel: JQuery;
        onContentReady(): void;
        /***
         * Inicializace
         *
         * */
        private init;
        prepareContent(options: IGEkoAgendaOptions): void;
        /**
            * Hromadne operace
            *
            * function HromadneOperace
            *
            *
            *
            */
        private hromadneOperace;
        /**
         * Znovunacteni dat
         *
         * */
        protected reload(): void;
        /**
         * Vytvoreni gridu
         * */
        private createGrid;
        /**
         * Vytvoreni gridformatu
         * */
        private createGridFormat;
        /**
         * Nastaveni pristupnosti akci dle stavu a prav formulare
         *
         * */
        private nastaveniPristupnosti;
        /**
         * Vytvoreni akci
         * */
        private createAction;
    }
}
declare namespace Gordic.Eko.WebClient {
    interface IGEkoKnihaOptions {
        /** ISL sluzba pro nacteni dat seznamu knih */
        getData: Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<any>>;
        /** Kontrola na moznost uzavrit  */
        checkClose: (knihy: Interface.GEkoVybraneKnihyDto[]) => JQueryPromise<Interface.GEkoVybraneKnihyDto[]> | undefined;
        /** Kontrola na moznost zruseni uzavreni */
        checkCancelClose?: (knihy: Interface.GEkoVybraneKnihyDto[]) => JQueryPromise<Interface.GEkoVybraneKnihyDto[]> | undefined;
        /** uzavreni vybranych knih  */
        close: (knihy: Interface.GEkoVybraneKnihyDto[]) => JQueryPromise<Interface.GEkoVybraneKnihyDto[]> | undefined;
        /** zruseni uzaverky vybranych knih (ISL) */
        cancelClose?: (knihy: Interface.GEkoVybraneKnihyDto[]) => JQueryPromise<Interface.GEkoVybraneKnihyDto[]> | undefined;
        /** zruseni pripravy k uzavreni vybranych knih (ISL) */
        cancelPrepareClose?: (knihy: Interface.GEkoVybraneKnihyDto[]) => JQueryPromise<Interface.GEkoVybraneKnihyDto[]> | undefined;
        /** pripravy k uzavreni vybranych knih (ISL) */
        prepareClose?: (knihy: Interface.GEkoVybraneKnihyDto[]) => JQueryPromise<Interface.GEkoVybraneKnihyDto[]> | undefined;
        /** Kontrola moznosti zruseni pripravy k uzavreni vybranych knih (ISL) */
        checkCancelPrepareClose?: (knihy: Interface.GEkoVybraneKnihyDto[]) => JQueryPromise<Interface.GEkoVybraneKnihyDto[]> | undefined;
        /** Kontrola moznosti pripravy k uzavreni vybranych knih (ISL) */
        checkPrepareClose?: (knihy: Interface.GEkoVybraneKnihyDto[]) => JQueryPromise<Interface.GEkoVybraneKnihyDto[]> | undefined;
        permissions: () => JQueryPromise<Interface.GEkoKnihaPermissions>;
        /** pouziva se NKS - true = zobrazi v seznamu */
        useNks?: boolean;
    }
    class GEkoSeznamKnih extends GContentBase implements IGClientContent {
        private $grid;
        protected loadingData: boolean;
        private permissions;
        protected islView: Gordic.Isl.View;
        /** pouziva se akce Priprava k uzavreni */
        private usedPrepareToClose;
        protected options: IGEkoKnihaOptions;
        protected $filterPanel: JQuery;
        onContentReady(): void;
        /**
         * Inicializace
         * */
        init(): void;
        prepareContent(options: IGEkoKnihaOptions): void;
        /**
         * Hromadne operace
         * @param typOperace  - typ hromadne operace
         * @returns - zadny vystup
         */
        private hromadneOperace;
        /**
         * Akce s knihou
         * @param vybraneKnihy - vybrane knihy
         * @param typAkce - typ akce
         */
        private actionsWithBooks;
        /**
         * ISL metody pro kontrolu
         * @param typAkce - typ akce
         * @param that
         * @param vybaneKnihy - vybrane knihy
         * @returns
         */
        private metodyKontrol;
        /**
         *  Definice sloupcu
         * createColumns
         *
         * @returns {Gordic.Data.GridFormat<Interface.GEkoVybraneKnihyDto>}
         */
        private createColumns;
        /**
         * Vytvoreni filtrovaciho panelu
         *
         */
        createFilterPanel(): void;
        /**
         * Znovunacteni dat
         *
         * */
        protected reload(): void;
        /**
         * Vytvoreni gridu
         * */
        private createGrid;
        /**
         * Vytvoreni view pro list
         *
         * */
        protected createListView(): Gordic.Isl.View;
        /**
         * Vytvoreni gridformatu
         * */
        private createGridFormat;
        /**
         * Nastaveni pristupnosti akci dle stavu a prav formulare
         *
         * */
        private nastaveniPristupnosti;
        /**
         * Zjisteni stavu vybranych knih
         * @param rows
         */
        private findOznaceneStavy;
        /**
         * Vraci objekt gridu
         * @returns
        */
        private getGrid;
        /**
         * Vytvoreni akci
         * */
        private createAction;
    }
}
