declare namespace Gordic.Dpg.WebControls {
    /**
     * SeznamLicenceDesigner
     *
     * @author VBLABLA
     * @since 482.1.0.119
     */
    class SeznamBase {
        /** element gridu */
        grid: JQuery<HTMLElement>;
        /** sloupce seznamu */
        gridSearchColumns: string[];
        /** formát sloupců gridu */
        gridFormat: Gordic.Data.GridFormat;
        /** element sidebaru */
        sidebar: JQuery<HTMLElement>;
        /** panel id (string) */
        panelId: string;
        /** element panelu v sidebaru */
        panelElement: JQuery<HTMLElement>;
        /** data na řádcích seznamu, pokud chceme vybrat jen aktuální řádek vybereme row[0], v případě více řádků je to poslední v poli row[n-1] */
        row: any;
        /** element filtru */
        filter: JQuery<HTMLElement>;
        /** formulář pro přidávání políček filtru */
        filterForm: Gordic.Forms.Form;
        /**
         * SeznamLicenceDesignerInit
         *
         * @param {GContentType<SeznamBase>} that
         */
        static SeznamBaseInit(that: GContentType<SeznamBase>): void;
        /** vytvořit formát seznamu - definice sloupců, napdpisů, šířek atd...
         SPECIFIC
         */
        static createGridFormatBase(that: GContentType<SeznamBase>): Gordic.Data.GridFormat;
        /** vytvořit formulář filtru - panel */
        static createFilterBase(that: GContentType<SeznamBase>, a_form: Forms.Form): JQuery<HTMLElement>;
        /** vytvořit formulář filtru - vytvoří tam filtrační políčka */
        static createFilterFormBase(that: GContentType<SeznamBase>): Forms.Form;
    }
}
declare namespace Gordic.Dpg.WebControls {
    /**
     * Dialog pro seznam Dalsi soubory
     */
    class GAutenticator extends GContentBase {
        /**
         * Timeinterval
         * @type {number}
         */
        private Timeinterval;
        /**
        * element subtasku pro oddělení průvodce pro generování přístupového kódu od Historie záznamů
        */
        private subtaskAutenticator;
        /**
        * element wizzardu
        */
        private wizzardAutenticator;
        /**
         *  Initial license
         */
        private initialLicense;
        /**
         *  DB parametr adt_user_licenc
         */
        private UserParam;
        /**
         *  DB parametr dpg_user_inssad
         */
        private UserParamInssad;
        /**
         *  ixsFun prihlaseneho uzivatele
         */
        private IxsFun;
        /**
         * Lic - Licence databáze
         * @type {string}
         */
        private Lic;
        /**
         * Faze - Programová fáze
         * @type {string}
         */
        private Faze;
        /**
         * level_exp  - Uroven přístupu
         * @type {number}
         */
        private level_exp;
        /**
         * fazeUloha - Identifikátor úlohy programové fáze
         * @type {any}
         */
        private fazeUloha;
        /**
         * lic - Identifikátor licence databáze
         * @type {string}
         */
        private lic;
        /**
         * Ověřovací kód
         * @type {string}
         */
        private code;
        private countDownNumber;
        /**
         * formát sloupců gridu pro Historii
         */
        private gridFormatHistorie;
        /**
         * element seznamu pro Historii
         */
        private gridHistorie;
        /**
         * isl view gridu pro Historii
         */
        private viewHistorie;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        private createMenuBar;
        private setMenuButtons;
        private createMenuButtons;
        private checkExpertModeButton;
        /**
        * otevřít dialog kontroly expertního režimu
        */
        private openCheckExpertMode;
        /**
         * Průvodce generováním autentizačního kódu
         */
        private createWizzard;
        /**
         * createFormZadani - Vytvoreni formulare k zadani vstupnich parametru autentikatoru
         *
         * @returns {Gordic.Forms.Form}
         */
        private createFormZadani;
        /**
         * createFormCode - Vytvoreni formulare k zobrazeníověřovacího kódu
         *
         * @returns {Gordic.Forms.Form}
         */
        private createFormCode;
        /**
         * generujKod - Generování ověřovacího kodu
         *
         * @param {string} lic
         * @param {string} faze
         */
        private generujKod;
        private countDownTimer;
        /**
         * vytvořit seznam s Historií záznamů
         */
        private createGridHistorie;
        /**
         * vytvořit formát sloupců seznamu Historie Autenticatoru
         */
        private createGridFormatHistorie;
        /**
         * createSubtasks pro oddělení jednotlivých produktových řad (G0/G1/G3) - defaultně zvolená řada = G1, ref T28589
         */
        private createSubtasks;
    }
}
declare namespace Gordic.Dpg.WebControls {
    class GDpgDashboard extends GContentBase {
        private moduleInfoItems;
        private NazevRef;
        private NazevFun;
        private DatLoginTxt;
        onContentReady(): void;
        /** načíst informace o modulu */
        private loadModuleInfo;
    }
}
declare namespace Gordic.Dpg.WebControls {
    /** Dialog detailu Souboru z ulohy Dalsi soubory */
    class DetailDalsiSoubory extends GContentBase {
        private file_dto;
        /** identifikátor souboru */
        private ixs_dif;
        /**
        * Dto pro detail souboru
        */
        private GGdesdifDto?;
        /** nazev balíčku */
        private nazev;
        /** data detailu */
        private data;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        private refreshDetail;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** setnout data */
        private setData;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvořit formulář */
        private createForm;
        /** vytvořit commandbar */
        private createCommandBar;
        private createMenuButtons;
        private downloadButton;
        private createMenuBar;
        private setMenuButtons;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
    }
}
declare namespace Gordic.Dpg.WebControls {
    /** Dialog detailu balíčku */
    class DetailGdzBalicek extends GContentBase {
        private file_dto;
        /*** element panelu v sidebaru */
        private panelElement;
        private panelId;
        private panelPopisId;
        /** detail typu historie verzí balíčku */
        private typeOfHistoryVersion;
        /** elmenet sidebaru */
        private sidebar;
        /** identifikátor balíčku */
        private ixs_gdt;
        /** nazev balíčku */
        private nazev;
        /** verze balíčku */
        private verze;
        /** data detailu */
        private data;
        /** název balíčku */
        private gdzFilename;
        /** příznak přímého přístupu na detail */
        private detailCommand;
        private grid_soubor;
        private ixs_gdt_obsazeny_soubor;
        private soubor_obsazeny_soubor;
        private soubor_ADLsoubor;
        private obsazeny_soubor_decode_content;
        private obsazeny_soubor_code_content;
        private obsazeny_soubor_nazev;
        private gridHistorie;
        /** ixs_gdt v gridu verzi */
        private ixs_gdt_verze;
        /** grid_historie_spusteni */
        private grid_historie_spusteni;
        /** vblabla - grid_ADL_soubory */
        private grid_ADL_soubory;
        /**
         * isl view gridu
         */
        private view;
        /**
         * format textu s aktivitou
         */
        private aktivitaFormat;
        private refreshDetail;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** setnout data */
        private setData;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvořit formulář */
        private createForm;
        /** vytvořit commandbar */
        private createCommandBar;
        /** vytvořit statusbar */
        private createStatusBar;
        /** odstranit všechny vlastní třídy ze statusbaru */
        private removeAllCustomClassOnStatusBar;
        /** změna hodnoty statusbaru */
        private changeStatusBar;
        private createMenuButtons;
        private downloadButton;
        private copyLinkButton;
        private copyInfoButton;
        private createMenuBar;
        private setMenuButtons;
    }
}
declare namespace Gordic.Dpg.WebControls {
    /** Dialog detailu seznamu licencí */
    class DetailLicCertBalLic extends GContentBase {
        /**
         * licence
         */
        private lic;
        /**
         * data
         */
        private dataRow;
        private enableAct;
        /**
         * ixs_lip
         * @type {string}
         */
        private ixs_lip;
        /**
         * enableCertAction
         * @type {boolean}
         * @default false
         */
        private enableCertAction;
        /**
         * nazevBalLic
         * @type {string}
         */
        private nazevBalLic;
        /**
        * onContentReady
        */
        onContentReady(): void;
        /**
        * init content
        */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         *  vytvořit formulář
         */
        private createForm;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
        * setnout data
        */
        private setData;
    }
}
declare namespace Gordic.Dpg.WebControls {
    class DetailRevizeZmeny extends GContentBase {
        /**
         *  DB parametr dpg_user_inssad - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
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
        private DataFilter?;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private tagySearch;
        /**
         * Data view k popisům změn
         */
        private viewZmeny;
        private MDProcessor;
        private Revize;
        onContentReady(): void;
        private getMdProcessor;
        /** setnout data */
        private createEmptyContent;
        /**
        * nastavit data
        */
        private _createChangeLog;
        private createGridFormat;
        _unEscape(htmlStr: string): string;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        private closeDet;
    }
}
declare namespace Gordic.Dpg.GridUtils {
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
declare namespace Gordic.Dpg.WebControls {
    /**
     * Dialog pro seznam Dalsi soubory
     */
    class SeznamDalsiSoubory extends GContentBase {
        /**
         *  DB parametr adt_user_dif - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Identifikator ixs_fun
         */
        private IxsFun;
        /**
         * element filterpanelu
         */
        private filter;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
         * element seznamu
         */
        private grid;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
         * isl view gridu
         */
        private view;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
         * nastavit titulek dialogu
         */
        private setTitle;
        /**
         * vytvořit filtr
         */
        private createFilter;
        /**
         * vytvořit formulář filtru
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vyvvořit menu buttons
         */
        private createMenuButtons;
        /**
         * vyvvořit detail button
         */
        private detailButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu buttons
         */
        private setMenuButtons;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
        /**
         * otevřít detail ulohy Dalsi soubory
         */
        private openDetail;
    }
}
declare namespace Gordic.Dpg.WebControls {
    enum ITypePanel {
        Dokumentace = 0,
        Popis = 1,
        Neurceno = 99
    }
    /**
    * Dialog doporucene instalacni sady
    */
    class SeznamDokumentace extends GContentBase {
        /**
        * verze_db pro vybranou licenci DB
        */
        verze_db: number;
        /**
        * sub_verze_db pro vybranou licenci DB
        */
        sub_verze_db: number;
        /**
        * hodnota typu implementace
        */
        tyi: any;
        /**
        * element filterPanelu
        */
        private filter;
        /**
         * element seznamu
         */
        private gridDoporuceneRevize;
        /**
         * formát sloupců gridu
         */
        private gridDoporuceneRevizeFormat;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  elmenet view pro grid
         */
        private view;
        /**
         *  DB parametr dpg_user_inssad - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  identifikátor Osoby - IxsFun
         */
        private IxsFun;
        /** elmenet sidebaru */
        private sidebar;
        /*** element panelu v sidebaru */
        private panelElement;
        private row_popis_dokumentace;
        private panelType;
        /**
         * identifikator vybrane dokumentace
         */
        private file;
        private panelNahledId;
        private panelPopisId;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
         * init content
         */
        private init;
        /**
         * vytvoři menu buttony
         */
        private createMenuButtons;
        /**
         * vytvořit downloadButton
         */
        private downloadButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menuButtons
         */
        private setMenuButtons;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * vytvoři filtrPanel form
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         *  Funkce pro zjisteni typu revize
         */
        private prepareData;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /** vytvořit panel */
        private createPanelPopis;
        /** vytvořit panel */
        private createPanelNahled;
        private refreshPanel;
        /**
         * vytvoři formular pro klicova slova
         */
        private createFormKeyWords;
    }
}
declare namespace Gordic.Dpg.WebControls {
    /**
    * Dialog Licenci databaze
    */
    class SeznamLicence extends GContentBase {
        /**
        * element subtasku
        */
        private subtasks;
        /**
        * element gtabu Seznam licencí
        */
        private tab_elementSeznamLicenci;
        /**
        * element gtabu Licenční certifikáty od verze databáze 390
        */
        private tab_elementLicCert;
        /**
         * element sidebaru
         */
        private sidebar;
        /**
        * element filterPanelu
        */
        private filter;
        /**
         * element seznamu
         */
        private gridLicence;
        /**
         * element seznamu Licenčních certifikátů od verze db 390
         */
        private gridLicCert;
        /**
         * formát sloupců gridu
         */
        private gridLicenceFormat;
        /**
         * formát sloupců gridu Licenčních certifikátů od verze db 390
         */
        private gridLicCertFormat;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  licence
         */
        private licence;
        /**
         *  elmenet view pro grid
         */
        private view;
        /**
         *  elmenet view pro grid Licenčních certifikátů od verze db 390
         */
        private viewLicCert;
        /**
         *  Dostupne licence
         */
        private dostupneLicence;
        /**
         *  Dostupne Verze
         */
        private dostupneVerze;
        /**
         *  DB parametr dpg_user_inssad - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  identifikátor Osoby - IxsFun
         */
        private IxsFun;
        /**
         * ixs_lip
         * @type {string}
         */
        private ixs_lip;
        /**
         * nazevBalLic
         * @type {string}
         */
        private nazevBalLic;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
         * init content
         */
        private init;
        /**
        * vytvořit subtasky
        */
        private createSubtasks;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * vytvoři filtrPanel form
         */
        private createFilterForm;
        /**
         * vytvoři menu buttony
         */
        private createMenuButtons;
        /**
         * vytvoři lic. cert. button
         */
        private licCertButtonPDF;
        /**
         * vytvoři lic. cert. button
         */
        private licCertButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menuButtons
         */
        private setMenuButtons;
        /**
         * vytvorit Tab Seznam licenci
         */
        private createTabSeznamLicenci;
        /**
         * vytvořit seznam Licenci
         */
        private createGrid;
        /**
         * vytvorit Tab Licencni certifikaty od verze db 390
         */
        private createTabLicCert;
        /**
         * vytvořit seznam Licencnich certifikatu od verze db 390
         */
        private createGridLicCert;
        /**
         * vytvořit kontextove menu z gridu na prave tlacitko mysi
         */
        private createContextBar;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridLicCertFormat;
        /**
         *  vytvořit sidebar
         */
        private createSidebarSeznamLicenci;
        /**
         *  vytvořit sidebar
         */
        private createSidebarLicCert;
        /**
         * otevřít detail pro výběr balíku licencí generovaného licenčního certifikátu
         */
        private openDetailLicCertBalLic;
        /**
         * Pridani prontAction
         */
        private createPrintAction;
    }
}
declare namespace Gordic.Dpg.WebControls {
    /**
     * ADL soubory
     */
    class ADLSoubory extends GContentBase {
        /**
        * element subtasku
        */
        private subtasks;
        /**
         * identifikator uploadovaného ADL souboru
         */
        private fileField;
        /**
         * formUpload - formulář pro uload ADL souboru
         * @type {Gordic.Forms.Form}
         */
        private formUpload;
        /**
         * isFileUploaded - příznak vybraného souboru
         * @type {boolean}
         * @default false
         */
        private isFileUploaded;
        /**
         * isEmailDefined - příznak vybraného emailu pro notifikace
         * @type {boolean}
         * @default false
         */
        private isEmailDefined;
        /**
         * fileNameADL - Název ADL souboru
         * @type {string}
         * @default ""
         */
        private fileNameADL;
        /**
        * element gridu
        */
        private gridHistorie;
        /**
         * formát sloupců gridu
         */
        private gridFormatHistorie;
        /**
         * isl view gridu
         */
        private viewHistorie;
        /**
         *  identifikátor Osoby - IxsFun
         */
        private IxsFun;
        /**
         *  identifikátor Osoby - IxsRef
         */
        private IxsRef;
        /**
         *  DB parametr dpg_user_inssad - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  Initial license
         */
        private initialEmail;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
        * vytvořit subtasky
        */
        private createSubtasks;
        /**
         * createFormUpload - Vytvoreni formulare pro upload diagnostického ADL souboru
         *
         * @returns {Gordic.Forms.Form}
         */
        private createFormUpload;
        /**
        * vytvořit seznam - Historie ADL
        */
        private createGridHistorie;
        /**
         * vytvořit formát sloupců seznamu - Historie ADL
         */
        private createGridHistorieFormat;
        /**
         * vytvořit commandbar
         */
        private createCommandBar;
        /**
         * callToImport - Volání importu ze souboru
         *
         * @param {[{}]} fileInfo
         */
        private callToImport;
    }
}
declare namespace Gordic.Dpg.WebControls {
    /**
     * Dialog seznamu balíčku
     */
    class SeznamGdzBaliky extends GContentBase {
        /**
        * element subtasku
        */
        private subtasks;
        /**
        * element filterPanelu
        */
        private filter;
        /**
        * element gridu
        */
        private grid;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        /**
        * nastaveni statusbaru
        */
        private statusbarText;
        /**
         * isl view gridu
         */
        private viewDoporucene;
        /**
         * isl view gridu
         */
        private view;
        /**
         * isl view gridu
         */
        private viewReinstalacni;
        /**
         * isl view gridu
         */
        private viewDiagnosticke;
        /**
         * isl view gridu
         */
        private viewServisni;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  Dostupne licence
         */
        private dostupneLicence;
        /**
         *  Dostupne Verze
         */
        private dostupneVerze;
        /**
         *  Initial license
         */
        private initialLicense;
        /**
         *  identifikátor Osoby - IxsFun
         */
        private IxsFun;
        /**
         *  DB parametr dpg_user_inssad - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  checkLic - kontrola aktuální licence
         */
        private checkLic;
        /**
         *  actualLic - aktuální licence
         */
        private actualLic;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
        * vytvořit subtasky
        */
        private createSubtasks;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * vytvoři filtrPanel form
         */
        private createFilterForm;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit kontextove menu z gridu na prave tlacitko mysi
         */
        private createContextBar;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menu bottony
         */
        private setMenuButtons;
        /**
         * detailButton
         */
        private detailButton;
        /**
         * downloadbutton
         */
        private downloadButton;
        /**
         * Vytvořit menu bottony
         */
        private createMenuButtons;
        /**
         * otevřít detail
         */
        private openDetail;
        /**
         * vytvořit status bar
         */
        private createStatusBar;
    }
}
declare namespace Gordic.Dpg.WebControls {
    interface GChangeLogOptions<TRow> {
        data?: Gordic.Data.View<TRow> | TRow[];
        columns?: GGridColumn<TRow>[] | Gordic.Data.GridFormat<TRow>;
        virtualCssClass?: string;
        breakWidth?: number;
        customClass?: string;
        rowsClass?: string | ((row: MetaRow<TRow>, columns: GGridColumn<TRow>[], rowIndex: Number) => string) | null;
        groupingHeaderColumns?: ObjectLiteral<GGridColumn<TRow>>;
    }
    /**
     * Dialog pro Přehled všech změn
     */
    class SeznamHistZmen extends GContentBase {
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
        private _resizeWidthVersion;
        private _headersVersion;
        private _resizeWidthElementVersion;
        private _dataVersion;
        private groupingHeaderColumnsVersion;
        private _styleElementVersion;
        private cssUidVersion;
        private _columnsVersion;
        private _countItemVersion;
        private uuidVersion;
        private _contentVersion;
        private numberRowVersion;
        static widgetNameVersion: string;
        private DataFilter?;
        private priz_ses;
        private priz_public;
        private origHeigth;
        private origWidth;
        private cloneEl;
        /**
        * element filterpanelu
        * */
        private filter;
        private dataFormat;
        private dataExport;
        private dat_od;
        private dat_do;
        private tagySearch;
        private tooltipTagy;
        private fazeSearch;
        private verzeSearch;
        private legZmenySearch;
        private typView;
        private resSearch;
        /**
         * formát sloupců gridu
         */
        private gridFormat;
        private gridFormatVersion;
        private mainLogsPanel;
        private mainLogsPanelVersion;
        /**
         * emptyForm - element prázdného formuláře popisů změn
         * @type {JQuery<HTMLElement>}
         */
        private emptyForm;
        private captionLink;
        private pocetZaznamu;
        private popisTyp;
        private typZmeny;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private renderTest;
        /**
         * newDescForm - formulář pro nový popis změny
         * @type {JQuery<HTMLElement>}
         */
        private newDescForm;
        /**
        * kontrola zatrhleho gcheck - Veřejná změna
        */
        private checkPublic;
        private fieldPopisTagy;
        private fieldVyberTagu;
        /**
         * Popisný text
         */
        private mdfieldText;
        /**
         * Popisný text interní poznámky
         */
        private mdfieldTextIntPozn;
        private MDProcessor;
        /**
         * Data view k popisům změn
         */
        private viewZmeny;
        /**
         * Data view k popisům změn
         */
        private viewZmenyOrig;
        /**
         * Data view k popisům změn	dané verze
         */
        private viewZmenyVersion;
        private searchValue;
        /**
         * Data view k vzhledávání popisů změn
         */
        private viewSearchZmeny;
        private tagySearchPublic;
        private fazeSearchPublic;
        /**
        *  DB parametr dpg_user_inssad - pro zjisteni pristupovych prav uzivatele
        */
        private UserParam;
        /**
                 * Pole s objekty programových fází
                 */
        private fazeData;
        /**
        * initFaze	- Inicializační hodnota programových fází
        * @type {string}
        */
        private initFaze;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
        * vytvořit menu
        */
        private createMenuBar;
        /**
         * setMenuButtons - Definice tlačítek
         */
        private setMenuButtons;
        /**
         * createMenuButtons - Akce pro menubar
         */
        private createMenuButtons;
        /**
         * copyLinkButton - Kopírování přímého odkazu na úlohu s Popisy změn
         */
        private copyLinkButton;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * downloadInnerHtml - Generování reportu změn
         *
         * @param {any} filename
         * @param {any} elId
         * @param {any} mimeType
         * @param {any} dataRange
         * @param {any} dataFormat
         */
        private downloadInnerHtml;
        private getOuterHTMLWithInlineStyle;
        private getRule;
        private downloadInnerHtmlVersion;
        private createFilterForm;
        /**
        * nastavit data
        */
        private _createChangeLog;
        private createGridFormat;
        _unEscape(htmlStr: string): string;
        htmlDecode(input: string): string;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _create(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSetting(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        setData(data: any): void;
        _reloadData(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRows(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClick(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeData(rows: any[]): any[];
        /**
         * _renderHeaderRow
         *
         * @param {any} level
         * @param {any} headerRowId
         * @param {string} group
         * @returns {HTMLTableRowElement}
         */
        _renderHeaderRow(level: any, headerRowId: any, group: string): HTMLTableRowElement;
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValues(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * createMainTagPanel	- Zobrazení hlavních tagů do panelu
         */
        private createMainTagsPanel;
        private configProfile;
        /**
         * createMainLogsPanel	- Zobrazení popisů do panelu
         */
        private createMainLogsPanel;
        /** setnout data */
        private createEmptyContent;
        /** setnout data */
        private createNewDescForm;
        private ulozPopisKomponenty;
        /**
         * getChangeLogsPanel	- vykreslení uložených changelog panelů z databáze (groupování dle revizí)
         */
        private getChangeLogsPanels;
        private getMdProcessor;
        /**
         * createEditContent
         *
         * @param {string[]} fieldTags
         * @param {string} cntName
         */
        private createEditContent;
        /**
         * loadChangeLogsPanel	- načtení uložených changelog panelů z databáze
         */
        private loadChangeLogsWrapper;
        setGroupingProcessor(view: Data.View<Gordic.Adt.Interface.GPopisZmenyDto>, typeOfView: string): void;
        /**
         * createMainLogsPanel	- Vykreslení popisů změn dané verze do main panelu
         */
        private createMainLogsPanelVersion;
        /**
        * nastavit data
        */
        private _createChangeLogVersion;
        private createGridFormatVersion;
        /**
         * _create
         * this.options.data je nahrazeno za this.viewZmeny
         */
        _createVersion(): void;
        /**
         * _columnsSetting
         * this.options.columns je nahrazeno za this.gridFormat
         */
        _columnsSettingVersion(): void;
        /**
         * setData
         *
         * @param {any} data
         */
        setDataVersion(data: any): void;
        _reloadDataVersion(): void;
        /**
         * _createRows
         *
         * @param {Gordic.Data.View} data
         * @returns {HTMLTableRowElement[]}
         */
        _createRowsVersion(data: Gordic.Data.View): HTMLTableRowElement[];
        /**
         * _actionClick
         *
         * @param {any} element
         */
        _actionClickVersion(element: any): void;
        /**
         * _analyzeData
         *
         * @param {any[]} rows
         * @returns {any[]}
         */
        _analyzeDataVersion(rows: any[]): any[];
        /**
         * _renderDataRowValues
         *
         * @param {any} trueColumns
         * @param {any} meta
         * @param {any} rowIndex
         * @param {any} level
         * @param {any} headerRowId
         * @returns {HTMLTableRowElement}
         */
        _renderDataRowValuesVersion(trueColumns: any, meta: any, rowIndex: any, level: any, headerRowId: any): HTMLTableRowElement;
        /**
         * filterData
         *
         * @param {any} value
         */
        private filterData;
    }
}
declare namespace Gordic.Dpg.WebControls {
    /**
    * Dialog doporucene instalacni sady
    */
    class SeznamRevize extends GContentBase {
        /**
        * element subtasku
        */
        private subtasks;
        /**
         * licence databáze
         */
        private lic;
        /**
        * pole s verzemi
        */
        verze: any[];
        /**
        * hodnota typu implementace
        */
        tyi: any;
        /**
         *  checkLic - kontrola aktuální licence
         */
        private checkLic;
        /**
         * sidebarPanelZmenyCreated - priznak basepanelu s prehledem zmen
         * @type {boolean}
         * @default false
         */
        private sidebarPanelZmenyCreated;
        /**
         *  elmenet previewDiv
         */
        private previewDivZmeny;
        /**
        * element filterPanelu
        */
        private filter;
        /**
        * element filterpanelu pro inbox
        * */
        private filterAll;
        /**
         * element seznamu
         */
        private gridDoporuceneRevize;
        /**
         * formát sloupců gridu
         */
        private gridDoporuceneRevizeFormat;
        /**
         *  elmenet GPreviewController
         */
        private previewController;
        /**
         *  elmenet view pro grid
         */
        private view;
        /**
        * prazdny view gridu
        */
        private verzeRevize;
        /**
         *  Initial license
         */
        private initialLicense;
        /**
         *  Status gridu
         */
        private statusGrid;
        /**
         *  notifikace stazenych revizi
         */
        private downloadNotif;
        /**
         *  DB parametr dpg_user_inssad - pro zjisteni pristupovych prav uzivatele
         */
        private UserParam;
        /**
         *  identifikátor Osoby - IxsFun
         */
        private IxsFun;
        /**
        *  modul - urcuje vyber datoveho typu stahovaneho souboru (msi/zip)
        * */
        private modul;
        /**
         * betatest - příznak filtrace na nejnovější revize betatest
         * @type {boolean}
         */
        private betatest;
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
        * nastavit titulek dialogu
        */
        private setTitle;
        /**
         * init content
         */
        private init;
        private initialLic;
        /**
        * vytvořit subtasky
        */
        private createSubtasks;
        /**
         * vytvoři filtrPanel
         */
        private createFilterPanel;
        /**
         * vytvoři filtrPanel form
         */
        private createFilterForm;
        /**
         * vytvoři filtrPanel pro vsechny revize
         */
        private createFilterPanelAll;
        /**
         * vytvoři filtrPanel form pro vsechny revize
         */
        private createFilterFormAll;
        /**
         * vytvoři menu buttony
         */
        private createMenuButtons;
        /**
         * vytvoři downloadButton
         */
        private downloadButton;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        /**
         * nastavit menuButtons
         */
        private setMenuButtons;
        /**
         * vytvořit status bar
         */
        private createStatusBar;
        /**
         * vytvořit seznam
         */
        private createGrid;
        /**
         * vytvořit kontextove menu z gridu na prave tlacitko mysi
         */
        private createContextBar;
        /**
         * vytvořit formát sloupců seznamu
         */
        private createGridFormat;
        /**
         *  vytvořit sidebar
         */
        private createSidebar;
        /**
         *  Funkce pro zjisteni typu revize
         */
        private prepareData;
        private enablePreviewZmeny;
        private loadPreviewZmeny;
        private createPreviewDivZmeny;
        /**
         * Převede číselnou hodnotu v B na stringovou hodnotu včetně jednotky (B, kB, MB, GB).
         * @param {number} number Velikost v Bytech.
         * @returns {string} Stringová velikost s jendotkou.
         */
        prevedVelikostSouboruNaString(number?: number): string;
    }
}
declare namespace Gordic.Dpg.Dialogs {
    /**
    * Dialog detailu tabulky
    *
    * @author  Tomáš Hažmuka
    * @date    12.06.2019
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSloupceDlg(parentContent: GContent, opt: {
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    /**
    * Dialog detailu tabulky
    *
    * @author  Tomáš Hažmuka
    * @date    12.06.2019
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailTabulkyDlg(parentContent: GContent, opt: {
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    /**
    * Dialog detailu balíčku
    *
    * @author  Vojtěch Blabla
    * @date    07.11.2018
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailBalickuDlg(parentContent: GContent, opt: {
        /** identifikátor balíčku */
        ixs_gdt: string;
        /** nazev balíčku */
        nazev: string;
        /** verze balíčku */
        verze: string;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** detail typu verze souboru */
        typeOfHistoryVersion?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    /**
    * Dialog detailu licence
    *
    * @author  Tomáš Hažmuka
    * @date    21.02.2019
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailLicenceDlg(parentContent: GContent, opt: {
        /** licence */
        lic: string;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu ulohy Dalsi soubory
    *
    * @author  Vojtěch Blabla
    * @date    23.06.2021
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailDalsiSouboryDlg(parentContent: GContent, opt: {
        ixs_dif: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu revize
    *
    * @author  Vojtěch Blabla
    * @date    05.03.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailRevizeDlg(parentContent: GContent, opt: {
        vybraneRevize: string[];
        verejnyDuvodZakazu: string[];
        interniDuvodZakazu: string[];
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu revize
    *
    * @author  Vojtěch Blabla
    * @date    21.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailRegistrLicenciDlg(parentContent: GContent, opt: {
        /** licence */
        lic: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu seznamu licenci - z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    27.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailSeznamLicenciDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu období osvobození - z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    27.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailObdobiOsvobozeniDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu obdobi osvobozeni (položky) - z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    27.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailObdobiOsvobozeniPolozkyDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu fakturace - z detailu registru licenci
    *
    * @author  Vojtěch Blabla
    * @date    27.05.2020
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailFakturaceDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
        editMode: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu generovani lic. cert. do PDF
    *
    * @author  Vojtěch Blabla
    * @date    01.012.2022
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailLicCertBalLicDlg(parentContent: GContent, opt: {
        /** licence */
        lic: any;
        dataRow: any;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Dpg.Utils {
    /**
     * update Akce
     */
    function updateAction(Action: GAction | undefined, enabled: boolean): void;
    /**
     * konverze base64 to UTF-8
     * @param str string
     */
    function b64DecodeUnicode(str: string): string;
    /**
     * test, jestli je grid prázdný
     */
    function isGridEmpty(grid: any): boolean;
    /**
     * otevřít okno nápovědy v novém tabu
     */
    function openHelp(): void;
    /**
     * otevřít splikaci Změny v aplikacích v novém tabu
     */
    function openAppChange(): void;
    /** enum pro políčko aktivita */
    enum DpgGincaktEnum {
        Aktivni = 100,
        Pripraven = 300,
        Neaktivni = 500,
        Navrh = 600,
        Zrusen = 900,
        Chyba = 666
    }
    function setDataAktivita(): IDpgAktivita[];
    interface IDpgAktivita {
        value: DpgGincaktEnum;
        caption: string;
    }
    function setCaptionAktivita(value: Utils.DpgGincaktEnum): IDpgAktivita;
    /** enum pro políčko kultura */
    enum DpgGinckulEnum {
        Cestina = 0,
        Slovencina = 10,
        English = 20,
        Rustina = 30,
        Srbsko = 40,
        Ukraine = 50,
        CestinaTestLokace = 999,
        International = 1000,
        Chyba = 666
    }
    function setDataKultura(): IDpgKultura[];
    interface IDpgKultura {
        value: DpgGinckulEnum;
        caption: string;
    }
    function setCaptionKultura(value: Utils.DpgGinckulEnum): IDpgKultura;
    /** enum pro políčko kultura */
    enum DpgGincrelEnum {
        Radna = 0,
        Technologicka = 10,
        Marketingova = 20,
        Chyba = 666
    }
    function setDataRezimLicence(): IDpgRezimLicence[];
    interface IDpgRezimLicence {
        value: DpgGincrelEnum;
        caption: string;
    }
    function setCaptionRezimLicence(value: Utils.DpgGincrelEnum): IDpgRezimLicence;
    /** enum pro políčko Typ implementace (tyi_number) */
    enum DpgGinctiyEnum {
        MO = "A",//"A",
        ISTA = "B",// "B",
        USC = "C",//"C",
        POUSC = "D",//"D",
        AnglickaMutace = "G",//"G",
        USCSPPOL = "M",//"M",
        OSS = "O",//"O",
        UP = "P",//"P",
        POOSS = "Q",//"Q",
        Univerzalni = "X",//"X",
        SlovenskaMutace = "Y"
    }
    function setDataTypImplementace(): IDpgTypImplementace[];
    interface IDpgTypImplementace {
        value: DpgGinctiyEnum;
        caption: string;
    }
    function setCaptionTypImplementace(value: Utils.DpgGinctiyEnum): any;
    /** enum pro políčko typu gdt */
    enum DpgGinctygEnum {
        /**
         * Neveřejný / jednorázový (dříve Neurčeno)
         */
        NeverejnyJednorazovy = 0,
        ReinstalaceAktualizace = 10,
        OpravaDat = 20,
        OpravaAplikacniLogiky = 30,
        AktivaceDeaktivace = 40,
        DiagnostikaDat = 50,
        ServisniScriptPodleZadaniZakaznika = 60,
        MakraProZUD = 70,
        AktualizaceCiselniku = 80,
        Chyba = 666
    }
    function setDataTypGdt(): IDpgGinctyg[];
    /**
     * inteface pro políčko typu gdt
     */
    interface IDpgGinctyg {
        caption: string;
        value: DpgGinctygEnum;
    }
    function setCaptionTypGdt(value: Utils.DpgGinctygEnum): IDpgGinctyg;
    /** enum pro políčko priorita gdt */
    enum DpgGincprgEnum {
        Neurceno = 0,
        Doporuceno = 10,
        Dulezita = 20,
        Kriticka = 30,
        Chyba = 666
    }
    function setDataPrioritaGdt(): IDpgPrioritaGdt[];
    interface IDpgPrioritaGdt {
        value: DpgGincprgEnum;
        caption: string;
    }
    function setCaptionPrioritaGdt(value: Utils.DpgGincprgEnum): IDpgPrioritaGdt;
    /** enum pro políčko Typ souboru */
    enum DpgGdecdifEnum {
        Ostatni = 0,
        InstalacniDVD = 10,
        GINISExpress = 20,
        ProduktyTretichStran = 30,
        Chyba = 666
    }
    function setDataTypSouboru(): IDpgTypSouboru[];
    interface IDpgTypSouboru {
        value: DpgGdecdifEnum;
        caption: string;
    }
    function setCaptionTypSouboru(value: Utils.DpgGdecdifEnum): IDpgTypSouboru;
    /** enum pro políčko Priznak DEMO DB */
    enum AdtPrizVerejnyEnum {
        Ne = 0,
        Ano = 1,
        Chyba = 666
    }
    function setDataPrizVerejny(): IAdtPrizVerejny[];
    interface IAdtPrizVerejny {
        value: AdtPrizVerejnyEnum;
        caption: string;
    }
    function setCaptionPrizVerejny(value: Utils.AdtPrizVerejnyEnum): IAdtPrizVerejny;
    /**
   * na akci změní property visibled - zobrazí nebo zneviditelní - pridano vblabla
   * @param Action
   * @param visible
   */
    function setActionVisible(Action: GAction | undefined, visible: boolean | null | undefined): void;
    /**
    * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
    *
    * @param {JQuery<HTMLElement>} form předaný element formuláře
    * @returns {JQueryPromise<boolean>} výsledek stavu
    */
    function waitForValues(form: JQuery<HTMLElement>): JQueryPromise<boolean>;
}
