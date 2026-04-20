declare namespace Gordic.Par.WebControls {
    /**
     * PAR05 dashboard
     */
    class GParDashboard extends GContentBase {
        private NazevRef;
        private NazevFun;
        private DatLoginTxt;
        onContentReady(): void;
        private loadModuleInfo;
    }
}
declare namespace Gordic.Par.Dialogs {
    function GParKonvertovatelneActionDlg(parentContent: GContent, opt: {
        rows: Gordic.Wfl.Interface.GParListDto[];
        podepsat: boolean;
        razitko: boolean;
        konverze: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    function GParOvereniDokumentuActionDlg(parentContent: GContent, opt: {
        rows: Gordic.Wfl.Interface.GParListDto[];
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    function GParNeovereneVerzeDokumentuActionDlg(parentContent: GContent, opt: {
        rows: Gordic.Wfl.Interface.GParListDto[];
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * dialog vyřízení akcí žádostí do RAKu
     *
     */
    function GParZadostDoRakuActionDlg(parentContent: GContent, opt: {
        /** typ akce */
        actionType: Gordic.Wfl.Interface.GParListEnums.ZadostDoRakuActionType;
        /** data řádků */
        rows: Gordic.Wfl.Interface.GParListDto[];
        /** typ formy dokumentu */
        formType: Wfl.Interface.GParListEnums.FormaDokumentu;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * dialog vyřízení akce exspirace časového razítka
     *
     */
    function GParExpCasRazitkoDlg(parentContent: GContent, opt: {
        /** data řádků */
        rows: Gordic.Wfl.Interface.GExpirationOfTimeStampsDto[];
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
}
declare namespace Gordic.Par.WebControls {
    export interface IGParOveritOutput {
        stat_code?: number;
        stat_text?: string;
    }
    export interface IGParRadioAkceField {
        label: string;
        value: GParEnums.GParAkce;
    }
    export interface IGParGridMainOpt<T> {
        name: string;
        element: JQuery<HTMLElement>;
        searchColumns: string[];
        columns: Data.GridFormat<any>;
        data?: Gordic.Isl.View<T>;
        /** jednoclick na řádek seznamu */
        selection(ev: any, obj: IGGridSelection<T>): void;
    }
    interface IGParFilterPanelOpt {
        element: JQuery<HTMLElement>;
        forms: Forms.Form;
        filterPanelApply(ev: any, obj: any): void;
    }
    /**
     * Klientsky kontent PAR
     *
     * @author thazmuka
     * @since 484.1.0.0
     */
    export class GParMain<T> {
        /** SSL - Načítání seznamu pravých stran */
        ssl_cti_sez: "0" | "1";
        /** temp řádek dat ověření podpisu */
        private tempRowOvereniPodpisu;
        /** content ověření podpisu */
        cntOvereniPodpisu: GContent;
        createPanelOvereniPodpisu(cnt: GContent, grid: JQuery<HTMLElement>): boolean;
        setPanelOvereniPodpisu(opt: {
            cntParent: GContent;
            cntOver?: GContent;
            ixb?: string;
            filename?: string;
            grid: JQuery<HTMLElement>;
        }): void;
        private setPanelOvereniEmpty;
        /** element náhledu přílohy */
        attachmentElement: JQuery<HTMLElement>;
        /** řádek s daty o daném souboru v náhledovačce */
        fileSelectionRow: any;
        sidebarFlag: boolean;
        /** dočasná temp row pro porovnání */
        tempRow: any;
        /**
         * získat data řádku
         * @param obj obsahuje metodu ggridu getSelection
         */
        getSelection(obj: any): any;
        updateSidebarAttachment(cnt: any, element: JQuery<HTMLElement>, row: any): void;
        createPanelNahled(cnt: any, grid: JQuery<HTMLElement>): void;
        preCreateAttachment(cnt: GContent, row: any): void;
        createAttachment(cnt: GContent, row: any): void;
        getSearchColumns(columns: GGridColumn<any>[]): string[];
        /** aktualizace dat seznamu */
        updateGrid(view: Gordic.Isl.View<any>): void;
        getGridFormatKontrolaUloziste(inputFormat?: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        getGridFormatZadostDoRak(inputFormat?: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        /**
         * vrať grid format pro dialog formátu neověřené verze dokumentu
         *
         * @param {Gordic.Data.GridFormat} [inputFormat]
         * @returns {Gordic.Data.GridFormat}
         */
        getGridFormatNeovereneVerzeDokumentu(inputFormat?: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        addCommonColumnsOfChanges(format: Gordic.Data.GridFormat): void;
        /**
         * vrať grid format pro dialog Konvertovatelne
         *
         * @param {Gordic.Data.GridFormat} [inputFormat]
         * @returns {Gordic.Data.GridFormat}
         */
        getGridFormatKonvertovatelne(inputFormat?: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        getFormatCheckTxtLayer(inputFormat?: Gordic.Data.GridFormat<Gordic.Wfl.Interface.GParCheckTxtLayerDto>): Gordic.Data.GridFormat<Gordic.Wfl.Interface.GParCheckTxtLayerDto>;
        /**
         * formát LTV kompletace pro grid
         */
        getFormatKompletaceLTV(inputFormat?: Gordic.Data.GridFormat<Gordic.Wfl.Interface.GParLTVDto>): Gordic.Data.GridFormat<Gordic.Wfl.Interface.GParLTVDto>;
        getFormatHashUlo(inputFormat?: Gordic.Data.GridFormat<Gordic.Wfl.Interface.GCheckHashUloDto>): Gordic.Data.GridFormat<Gordic.Wfl.Interface.GCheckHashUloDto>;
        /** vrať formát seznamu (grid) expirace časového razítka */
        getFormatExpiraceCasRazitka(inputFormat?: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        getFormatExpiracePodpisu(expiraceDays: number, inputFormat?: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        /** element filtrpanelu */
        filter: JQuery<HTMLElement>;
        /**
         * vytvořit filtrpanel
         */
        createFilterPanel(opt: IGParFilterPanelOpt, ssl_cti_sez: string): JQuery<HTMLElement>;
        /**
         * vrať nastavený filtr
         */
        getFilter(filter: JQuery<HTMLElement>, typSeznamu?: Wfl.Interface.GParListEnums.TypSeznam): any;
        setFiltrSpisUzel(Form: Forms.Form, customClass?: string): void;
        setFiltrSkartZnak(Form: Forms.Form, customClass?: string): void;
        setFiltrTypyDokumentu(Form: Forms.Form): void;
        /**
         * nastavit filtr pro dokumenty předané spisovně a vyřízené/uzavřené
         * @param Form Form filtru
         */
        setFiltrDokumentyPredaneVyrizene(Form: Forms.Form): void;
        addFieldPodepsat(Form: Forms.Form, State: boolean): void;
        addFieldCasRazitko(Form: Forms.Form, State: boolean): void;
        /**
         * nastavit políčka akce a konverze do formuláře
        */
        setFormAkce(Form: Forms.Form, razitko: {
            visible: boolean;
            value?: boolean;
        }, podepsat: {
            visible: boolean;
            value?: boolean;
        }, konverze: {
            visible: boolean;
            value?: boolean;
        }): void;
        setFiltrDatum(Form: Forms.Form, cnt: GContent): Forms.Form;
        setFiltrTypDatum(Form: Forms.Form): void;
        /** vytvořit formulář filtru - expirace časového razítka */
        createFilterFormExpiraceCasRazitka(expiraceDays: number): Forms.Form;
        createCommandBar(cnt: GContent<any>): void;
        /** vytvořit contextové menu na gridu */
        openDetailDokument(cnt: any, row: Gordic.Wfl.Interface.GParListDto | null, grid: JQuery<HTMLElement>): void;
        /**
         * getUserSettingsValue - pokud nic nevrací, vrátí null
         */
        getUserSettingsValue(cnt: GContent, name: string): any;
        setUserSettingsValue(cnt: GContent, name: string, value: any): void;
    }
    export {};
}
declare namespace Gordic.Par.WebControls {
    abstract class GParConst {
        static UserRequestedCancelText: string;
    }
    /** interface počítadla textu coveru */
    interface IOperationCoverValue {
        /** indetifikátor dokumentu ixp */
        ixp: string;
        /** text aktuálního progresu */
        progressText: string;
    }
    /** interface počítadla coveru */
    interface IOperationCoverCounter {
        /** celkový počet kroků */
        total?: number;
        /** aktuální číslo progressu */
        progress: number;
    }
    /** Typy dokumentu v radiobuttonu */
    enum KontrolaFormatuTypDocRadioParEnum {
        KonvertovaneGinis = "0",
        VlozeneMAS = "1",
        Neoznaceni = "2",
        Ostatni = "3"
    }
    /**  Základní rozdělení typu dokumentu */
    enum KontrolaFormatuTypDocParEnum {
        Vlastni = "0",
        Cizi = "1"
    }
    enum ValidatorParEnum {
        /** Dyna PDF */
        DynaPDF = "0",
        /** Adobe LiveCycle */
        AdobeLiveCycle = "1",
        /** 3-Heights (TM) PDF Validator */
        ThreeHeightsPDFValidator = "2"
    }
    /** KontrolaFormatuDateEnum - datumový filtr na seznamu kontroly formátu */
    enum KontrolaFormatuDateParEnum {
        /** datum vložení */
        Vlozeni = "0",
        /** změna záznamu */
        ZmenaZaznamu = "1"
    }
    enum TypDocParEnum {
        Vlastni = "0",
        Cizi = "1",
        VcetnePriloh = "2"
    }
    enum VyrizeniParEnum {
        PredaneSpisovne = "0",
        VyrizeneUzavrene = "1"
    }
    interface IRunOperation {
        cnt: GContent;
        /** začátek operace? */
        begin: boolean;
        /** text postupu */
        progressText: string;
        successNumber: number;
        failNumber: number;
        progressNumber: number;
        /** počet zbývajících řádků k vyřízení */
        remainsNumber: number;
        /** celkový počet řádků */
        totalNumber: number;
    }
    /**
    * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
    *
    * @param {JQuery<HTMLElement>} form předaný element formuláře
    * @returns {JQueryPromise<boolean>} výsledek stavu
    */
    function waitForValues(form: JQuery<HTMLElement>): JQueryPromise<boolean>;
    /**
     * spustit operaci gcover
     * @param opt vstupní parametry
     */
    function runOperation(opt: IRunOperation, userRequestedCancel: boolean): void;
    /**
     * získat pole pro vyhledávání sloupců v seznamu
     * @param format formát seznamu
     */
    function getSearchColumnsArray(format: Data.GridFormat<any>): string[];
    /**
     * Funkce createAttachment zavolá komponentu gattachment, díky, které bude do sidebaru vykreslen náhled
     */
    function createAttachment(row: any, elNahledParent: JQuery<HTMLElement>): void;
}
declare namespace Gordic.Par.WebControls {
    /**
     * Kontrola uložiště
     *
     * @author thazmuka
     * @since 52510.4
     */
    class GParCheckStorage extends GContentBase {
        onContentReady(): void;
    }
}
declare namespace Gordic.Par.WebControls {
    class GParKonvertovatelne extends GContentBase {
        onContentReady(): void;
    }
    class GParKonvertovatelneMain extends GParMain<any> {
        /** gcontent */
        cnt: GContent;
        /** element gcontentu */
        element: JQuery<HTMLElement>;
        /** view gridu */
        view: Gordic.Isl.View<Gordic.Wfl.Interface.GParListDto>;
        /** element filtru */
        filter: JQuery<HTMLElement>;
        /** element seznamu */
        grid: JQuery<HTMLElement>;
        /** element formuláře akcí v modálním dialogu */
        formAction: JQuery<HTMLElement>;
        /** typ načteného seznamu */
        typSeznamu: Wfl.Interface.GParListEnums.TypSeznam;
        constructor(cnt: GContent);
        createContent(): void;
        private initIsl;
        private createSubtasks;
        /** vytvořit menubar */
        private createMenuBar;
        /** vytvořit formy filtrpanelu */
        private createFilterForm;
        private createSidebar;
        private createFormDialogSelectAction;
        private showDialogSelectAction;
    }
}
declare namespace Gordic.Par.WebControls {
    class GParKonvertovatelneAction extends GContentBase {
        /** data řádků */
        private rows;
        onContentReady(): void;
    }
    class GParKonvertovatelneActionMain extends GParMain<any> {
        idOperation: string;
        totalNumber: number;
        remainsNumber: number;
        successNumber: number;
        failNumber: number;
        Wizard: Gordic.Wizard;
        progress: number;
        operationText: string;
        userRequestedCancel: boolean;
        /** konverze souboru */
        konverze: boolean;
        /** podepsat */
        podepsat: boolean;
        /** s časovými razítkem */
        razitko: boolean;
        /** gcontent */
        cnt: GContent;
        /** element gcontentu */
        element: JQuery<HTMLElement>;
        /** element gridu */
        grid: JQuery<HTMLElement>;
        /** data řádků */
        rows: Gordic.Wfl.Interface.GParListDto[];
        /** view gridu */
        view: Gordic.Data.View<Gordic.Wfl.Interface.GParListDto>;
        /** kategorie důvodu podpisu */
        ktgDuvPodp: Gordic.Gin.Globals.Enums.KtgDuvPodp;
        gSgn: Gordic.Wfl.WebClient.GSgn;
        ktgDpoSupport: any;
        DpoEnabled: boolean;
        model: Gordic.Par.WebControls.GParKonvertovatelneActionDto;
        constructor(cnt: GContent, rows: Gordic.Wfl.Interface.GParListDto[]);
        createContent(): void;
        private initDleIxsDpo;
        private init;
        private createForm;
        private createGrid;
        private createWizard;
        private runAction;
        /** zobrazí informační flash, když se neprovádí žádná akce */
        private showInfoFlash;
        private runActionKonverze;
        private konvertovat;
        private sgnConfigParams;
        /**
         * akce podepsat nebo podepsat s časovým razítkem
         * @param rows
         */
        private runActionPodepsat;
        /** podepsat ele. obraz */
        private signElImage;
        /** podepsat přílohu */
        private signAttachment;
        /**
         * akce orazit časové razítko
         * @param rows
         */
        private runActionCasoveOrazit;
        private progressOperation;
        private changeStateOnGrid;
        private casoveOrazit;
        /** provede se vyřízení příslušné akce */
        private vyriditAkce;
        /** vytvořit content prvního kroku průvodce */
        private createFirstStepInWizard;
        /**
         * získat hodnoty vybraných polí (při změně)
         */
        private getValueOfSelectField;
        private createSecondStepInWizard;
    }
}
declare namespace Gordic.Par.WebControls {
    class GParNeovereneVerzeDokumentu extends GContentBase {
        onContentReady(): void;
    }
    class GParNeovereneVerzeDokumentuMain extends GParMain<any> {
        /** gcontent */
        cnt: GContent;
        /** element gcontentu */
        element: JQuery<HTMLElement>;
        /** element seznamu */
        grid: JQuery<HTMLElement>;
        /** element filtru */
        filter: JQuery<HTMLElement>;
        /** view gridu */
        view: Gordic.Isl.View<Gordic.Wfl.Interface.GParListDto>;
        constructor(cnt: GContent);
        createContent(): void;
        private createSidebar;
        private createMenuBar;
        private showDialogSelectAction;
        private createFilter;
        /** vytvořit formy filtrpanelu */
        private createFilterForm;
        private initIsl;
        private createGrid;
    }
}
declare namespace Gordic.Par.WebControls {
    class GParNeovereneVerzeDokumentuAction extends GContentBase {
        /** data řádků */
        private rows;
        onContentReady(): void;
    }
    class GParNeovereneVerzeDokumentuActionMain extends GParMain<any> {
        /** gcontent */
        private cnt;
        /** element gcontentu */
        private element;
        /** data řádků */
        private rows;
        private Wizard;
        private totalNumber;
        private remainsNumber;
        private successNumber;
        private failNumber;
        private progress;
        private operationText;
        private userRequestedCancel;
        /** element gridu */
        private grid;
        /** view gridu */
        private view;
        constructor(cnt: GContent, rows: Gordic.Wfl.Interface.GParListDto[]);
        createContent(): void;
        private run;
        private createSidebar;
        private createGrid;
        private runAction;
        private progressOperation;
        private changeStateOnGrid;
        /**
         * spustit operaci gcover
         * @param opt vstupní parametry
         */
        private runOperation;
    }
}
declare namespace Gordic.Par.WebControls {
    /**
     * Žádost do RAKu (PAR05)
     *
     * @author thazmuka
     * @since 484.1.0.6
     */
    class GParZadostDoRaku extends GContentBase {
        onContentReady(): void;
    }
    class GParZadostDoRakuMain extends GParMain<any> {
        /** gcontent */
        cnt: GContent;
        /** element gcontentu */
        element: JQuery<HTMLElement>;
        /** element seznamu */
        grid: JQuery<HTMLElement>;
        /** element filtru */
        filter: JQuery<HTMLElement>;
        /** view gridu */
        view: Gordic.Isl.View<Gordic.Wfl.Interface.GParRequestToRAKDto>;
        /** typ formy dokumentu */
        formType: Wfl.Interface.GParListEnums.FormaDokumentu;
        constructor(cnt: GContent);
        createContent(): void;
        private createSidebar;
        private selectRows;
        private createMenuBar;
        private createFilter;
        /** vytvořit formy filtrpanelu */
        private createFilterForm;
        private initIsl;
        private createGrid;
    }
}
declare namespace Gordic.Par.WebControls {
    /**
     * Žádost do RAKu (PAR05)
     *
     * @author thazmuka
     * @since 484.1.0.6
     */
    class GParZadostDoRakuAction extends GContentBase {
        /** data řádků */
        private rows;
        /** typ akce na hromadném vyřízení */
        private actionType;
        /** typ formy dokumentu */
        private formType;
        onContentReady(): void;
    }
    class GParZadostDoRakuActionMain extends GParMain<any> {
        private Wizard;
        private totalNumber;
        private remainsNumber;
        private successNumber;
        private failNumber;
        private progress;
        private operationText;
        private userRequestedCancel;
        /** typ formy dokumentu */
        private formType;
        /** gcontent */
        private cnt;
        /** element gcontentu */
        private element;
        /** element seznamu */
        private grid;
        /** typ akce na hromadném vyřízení */
        private actionType;
        /** view gridu */
        private view;
        /** řádek gridu */
        private row;
        /** výběr řádků gridu */
        private rows;
        constructor(cnt: GContent, rows: Wfl.Interface.GParRequestToRAKDto[], actionType: Wfl.Interface.GParListEnums.ZadostDoRakuActionType, formType: Wfl.Interface.GParListEnums.FormaDokumentu);
        createContent(): void;
        private setTitle;
        private createWizard;
        /** funkční místo z konverzního pracoviště */
        private IxsFun;
        /** vytvořit content prvního kroku průvodce */
        private createFirstStepInWizard;
        /**
         * element formuláře
         */
        private form;
        private createForm;
        private createSecondStepInWizard;
        private runAction;
        private progressOperation;
        private changeStateOnGrid;
        /**
       * spustit operaci gcover
       * @param opt vstupní parametry
       */
        private runOperation;
        private createGrid;
    }
}
declare namespace Gordic.Par.WebControls {
    /**
    * Kontrola formátu souboru
    *
    * @author thazmuka
    * @since 482.1.0.4
    */
    class GKontrolaFormatuSouboru extends GContentBase {
        onContentReady(): void;
    }
    class GKontrolaFormatuSouboruMain extends GParMain<any> {
        AlcValidator: boolean;
        ThreeHeightsValidator: boolean;
        DynaValidator: boolean;
        AlcConfigured: boolean;
        ThreeHeightsConfigured: boolean;
        InformationShowed: boolean;
        DKSConfiguration: boolean;
        ALCConfiguration: boolean;
        view: Gordic.Isl.View<Gordic.Wfl.Interface.GFileFormatCheckDto>;
        grid: JQuery<HTMLElement>;
        filter: JQuery<HTMLElement>;
        format: Gordic.Data.GridFormat;
        elNahledParent: JQuery<HTMLElement>;
        /** konvertované dle historie konverzí */
        konvertovanePodleWflhkon: boolean;
        /** načíst ze souboru */
        nacistZeSouboru: boolean;
        static _gFile: GFile;
        cnt: GContent;
        element: JQuery<HTMLElement>;
        par_valpdf_arch: string;
        constructor(cnt: GContent);
        private getGFile;
        /**
         * onContentReady
         */
        createContent(): void;
        /** je zapnutý debug mód?
         * + aktivuje příslušná nastavení
         * */
        private isDebug;
        private createMenuBar;
        private getSelectionRowsValidaceArchivFormatu;
        private addValidaceArchivFormatuButton;
        private addKontrolaFormatuSouboruButton;
        private createFilter;
        private createFilterForm;
        /** vytvořit seznam */
        private createGrid;
        /** vytvořit formát gridu */
        private createFormat;
        private createSidebar;
        /** příznak, že dojde ke zrušení operace */
        private userRequestedCancel;
        /** hodnota progresu */
        private progress;
        /**
         * spustit operaci (gcover)
         *
         * @param {boolean} begin beginOperation (true), progressOperation(false)
         * @param {IOperationCoverValue} value hodnoty textu
         * @param {IOperationCoverCounter} counter hodnoty počítadla
         */
        private runOperation;
        private validaceArchivFormatu;
        private createFormZkontrolovat;
        private openConfirmDialogThreeHeightsPDFValidator;
        private openConfirmDialogAdobeLiveCycle;
        private openConfirmDialogDynaPdf;
        private zkontrolovat;
        private createPdfFile;
        private createTxtFile;
        private _zkontrolovat;
        /** Povolit přepsání existujících Pronom ID */
        private PovolitPrepsani;
        private openZkontrolovatFormatSouborDialog;
        private createZkontrolovatFormatSouboruForm;
        private zkontrolovatFormatSouboru;
        private _zkontrolovatFormatSouboru;
    }
}
declare namespace Gordic.Par.WebControls {
    /**
     * GParCheckTextLayer - kontrola textové vrstvy
     *
     * @author thazmuka
     * @since 52430.2
     */
    class GParCheckTextLayer extends GContentBase {
        onContentReady(): void;
    }
    class GParCheckTextLayerMain extends GParMain<any> {
        cnt: GContent;
        element: JQuery<HTMLElement>;
        grid: JQuery<HTMLElement>;
        view: Gordic.Isl.View<Gordic.Wfl.Interface.GParCheckTxtLayerDto>;
        constructor(cnt: GContent);
        /**
         * onContentReady
         */
        createContent(): void;
        private createSidebar;
        private serverSettlementTaskName;
        private pouzeProtiPredchozi;
        private run;
        private setValueToField;
        private createFilterForm;
        private setFiltrDatumCheckTxtLayer;
        private setFiltrStateDok;
        private setFiltrTypeDok;
        private createMenuBar;
        private createFilter;
        /**
          * filtr pro kompletace LTV
          */
        getFilter(filter: JQuery<HTMLElement>): {
            date?: any;
            type_date?: any;
            state?: any;
        };
        private createGrid;
    }
}
declare namespace Gordic.Par.WebControls {
    /**
     * Expirace časového razítka
     *
     * @author thazmuka
     * @since 482.1.0.4
     */
    class GParExpCasRazitko extends GContentBase {
        onContentReady(): void;
    }
    /**
     * Expirace časového razítka (main)
     *
     * @author thazmuka
     * @since 482.1.0.4
     */
    class GParExpCasRazitkoMain extends GParMain<any> {
        /** view gridu */
        view: Gordic.Isl.View<Gordic.Wfl.Interface.GExpirationOfTimeStampsDto>;
        /** typ seznamu */
        typSeznamu: GParEnums.TypSeznamuParEnum;
        /** Pocet dni pro vypocet expirace certifikatu */
        expiraceDays: number;
        cnt: GContent;
        element: JQuery<HTMLElement>;
        grid: JQuery<HTMLElement>;
        constructor(cnt: GContent);
        /**
         * vytvořit content
         */
        createContent(): void;
        private createMenuBar;
        /**
         * přidat tlačítko časově orazit
         */
        private addCasOrazitButton;
        private openDialogCasoveOrazit;
        private createFilter;
        /** vytvořit seznam */
        private createGrid;
        private createSidebar;
    }
}
declare namespace Gordic.Par.WebControls {
    class GParExpCasRazitkoAction extends GContentBase {
        /** data řádků */
        private rows;
        onContentReady(): void;
    }
    class GParExpCasRazitkoActionMain extends GParMain<any> {
        Wizard: Gordic.Wizard;
        totalNumber: number;
        remainsNumber: number;
        successNumber: number;
        failNumber: number;
        progress: number;
        operationText: string;
        userRequestedCancel: boolean;
        /** data řádků */
        rows: Gordic.Wfl.Interface.GExpirationOfTimeStampsDto[];
        /** view gridu */
        view: Gordic.Data.View<Gordic.Wfl.Interface.GExpirationOfTimeStampsDto>;
        cnt: GContent;
        element: JQuery<HTMLElement>;
        grid: JQuery<HTMLElement>;
        constructor(cnt: GContent, rows: Gordic.Wfl.Interface.GExpirationOfTimeStampsDto[]);
        createContent(): void;
        private run;
        private createGrid;
        private runAction;
        private progressOperation;
        /**
         * spustit operaci gcover
         * @param opt vstupní parametry
         */
        private runOperation;
        private changeStateOnGrid;
    }
}
declare namespace Gordic.Par.WebControls {
    /**
     * Expirace podpisu
     *
     * @author thazmuka
     * @since 482.1.0.15
     */
    class GParExpPodpis extends GContentBase {
        onContentReady(): void;
    }
    class GParExpPodpisMain extends GParMain<any> {
        /** Pocet dni pro vypocet expirace certifikatu */
        expiraceDays: number;
        /** view gridu */
        view: Gordic.Isl.View<Gordic.Wfl.Interface.GExpirationOfSignaturesDto>;
        row: Gordic.Wfl.Interface.GExpirationOfSignaturesDto | null;
        /** temp data řádku */
        tempRow: Gordic.Wfl.Interface.GExpirationOfSignaturesDto | null;
        cnt: GContent;
        element: JQuery<HTMLElement>;
        grid: JQuery<HTMLElement>;
        constructor(cnt: GContent);
        /**
         * onContentReady
         */
        createContent(): void;
        private createMenuBar;
        private createFilter;
        private createFilterForm;
        private createGrid;
        private createSidebar;
        private updateSidebarCertificates;
        private panelCertifikatyElement;
        /**
        * vytvořit bspanel certifikátů
        */
        private createPanelCertifikaty;
        private preCreateCertifikaty;
        private createCertifikaty;
        private getFormatCertifikaty;
        /** vytvořit seznam certifikátů */
        private createGridCertifikaty;
    }
}
declare namespace Gordic.Par.WebControls {
    /**
     * GParKompletaceLTV
     *
     * @author thazmuka
     * @since 52430.2
     */
    class GParKompletaceLTV extends GContentBase {
        onContentReady(): void;
    }
    class GParKompletaceLTVMain extends GParMain<any> {
        cnt: GContent;
        element: JQuery<HTMLElement>;
        grid: JQuery<HTMLElement>;
        view: Gordic.Isl.View<Gordic.Wfl.Interface.GParLTVDto>;
        constructor(cnt: GContent);
        /**
         * onContentReady
         */
        createContent(): void;
        private createFilterForm;
        private setFiltrStavLTV;
        private setFiltrDatumLTV;
        private setFiltrTypeDatum;
        private createFilter;
        private createMenuBar;
        private serverSettlementTaskName;
        private setValueToField;
        private runKompletace;
        private createSidebar;
        /**
          * filtr pro kompletace LTV
          */
        getFilter(filter: JQuery<HTMLElement>): {
            date?: any;
            type_date?: any;
            state?: any;
        };
        private createGrid;
    }
}
declare namespace Gordic.Par.WebControls {
    /**
     * PAR05 - Kontrola Hash ULO
     *
     * @author thazmuka
     * @since 52430.1
     */
    class GParKontrolaHashUlo extends GContentBase {
        onContentReady(): void;
    }
    class GParKontrolaHashUloMain extends GParMain<any> {
        cnt: GContent;
        element: JQuery<HTMLElement>;
        grid: JQuery<HTMLElement>;
        view: Gordic.Isl.View<Gordic.Wfl.Interface.GCheckHashUloDto>;
        /**
         * konstruktor
         */
        constructor(cnt: GContent);
        createContent(): void;
        private createForm;
        private panelInfoElement;
        private createSidebar;
        private createMenuBar;
        private serverSettlementTaskName;
        private checkHashUlo;
        private setValueToField;
        /** Ostatní */
        private setFiltrOstatni;
        /** Typ dokumentu */
        private setFiltrTypDokumentu;
        /** typ datumu */
        private setFiltrTypeDatumHashUlo;
        /** datum */
        private setFiltrDatumHashUlo;
        private createFilterForm;
        private createFilter;
        /**
         * filtr pro kontrolu hash ulo
         */
        getFilter(filter: JQuery<HTMLElement>): any;
        private createGrid;
    }
}
declare namespace Gordic.Par.WebControls {
    class GParOvereniDokumentu extends GContentBase {
        onContentReady(): void;
    }
    class GParOvereniDokumentuMain extends GParMain<any> {
        /** gcontent */
        cnt: GContent;
        /** element gcontentu */
        element: JQuery<HTMLElement>;
        /** view gridu */
        view: Gordic.Isl.View<Gordic.Wfl.Interface.GParListDto>;
        /** element filtru */
        filter: JQuery<HTMLElement>;
        /** element seznamu */
        grid: JQuery<HTMLElement>;
        constructor(cnt: GContent);
        createContent(): void;
        /**
        * vytvořit menubar
        */
        private createMenuBar;
        /**
         * spuštění akce ověření dokumentu
         * @param rows data řádku
         */
        private overitDokument;
        private createSidebar;
        private initIsl;
        private createFilter;
        /** vytvořit formy filtrpanelu */
        private createFilterForm;
        private createGrid;
    }
}
declare namespace Gordic.Par.WebControls {
    class GParOvereniDokumentuAction extends GContentBase {
        /** data řádků */
        private rows;
        onContentReady(): void;
    }
    class GParOvereniDokumentuActionMain extends GParMain<any> {
        /** gcontent */
        private cnt;
        /** element gcontentu */
        private element;
        /** data řádků */
        private rows;
        private Wizard;
        private totalNumber;
        private remainsNumber;
        private successNumber;
        private failNumber;
        private progress;
        private operationText;
        private userRequestedCancel;
        /** element gridu */
        private grid;
        /** view gridu */
        private view;
        constructor(cnt: GContent, rows: Gordic.Wfl.Interface.GParListDto[]);
        createContent(): void;
        private createSidebar;
        private run;
        private createGrid;
        private runAction;
        private progressOperation;
        private changeStateOnGrid;
        /**
         * spustit operaci gcover
         * @param opt vstupní parametry
         */
        private runOperation;
    }
}
