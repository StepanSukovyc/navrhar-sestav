declare namespace Gordic.Ron.WebControls {
    /**
    * Získá přihlášeného uživatele.
    * @param then Kontent, ze kterého je funkce volána.
    * @returns Přihlášený uživatel jako string.
    */
    function getActualUser(then: GContent): Promise<string>;
}
declare namespace Gordic.Ron.WebControls {
    /**
    * Generický abstraktní základ pro contenty v RON.
    *
    * TInput  - vstupní contract contentu (pokud je potřeba)
    * TOutput - výstupní contract contentu (pokud je potřeba)
    */
    abstract class GRonDialogBase<TInput, TOutput> extends GContent implements IGClientContent {
        protected readonly actionNames: {
            readonly new: "new";
            readonly detail: "detail";
            readonly delete: "delete";
            readonly edit: "edit";
            readonly save: "save";
            readonly endEdit: "endEdit";
            readonly close: "close";
            readonly saveAndClose: "saveAndClose";
            readonly newData: "newData";
            readonly deleteData: "deleteData";
            readonly copyData: "copyData";
            readonly newBook: "newBook";
            readonly newFunction: "newFunction";
            readonly deleteRight: "deleteRight";
        };
        protected _input: TInput;
        protected _output: TOutput;
        /**
         * Hlavní metoda pro vytvoření obsahu contentu.
         * @param input
         */
        protected abstract buildContent(input: TInput): Promise<void>;
        /**
         * Vytvoří všechny akce, které content používá.
         * Prochází proměnnou actionNames a podle názvů akcí vytvoří akce.
         * @param input
         */
        protected abstract prepareActions(input: TInput): void;
        /**
         * Vytvoří menu pro content.
         */
        protected abstract buildMenu(): void;
        /**
         * Volitelná metoda, která se zavolá před vytvořením obsahu contentu.
         * @param input
         */
        protected beforeBuildContent(input: TInput): Promise<void>;
        /**
         * Volitelná metoda, která se zavolá po vytvoření obsahu contentu.
         * @param input
         */
        protected afterBuildContent(input: TInput): Promise<void>;
        /**
         * @internal
         * Tato metoda je určena jen pro framework.
         * Nepoužívejte přímo.
         */
        prepareContent(input: TInput): Promise<void>;
    }
}
declare namespace Gordic.Ron.Dialogs {
    function GRonGeneratoryDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonGeneratoryInput | undefined>): JQuery.Promise<WebControls.GRonGeneratoryOutput | undefined>;
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonGeneratoryInput {
    }
    /**
     * Výstup z contentu.
     */
    interface GRonGeneratoryOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonGeneratory extends GContentBase implements IGClientContent {
        title: string;
        taskId: string;
        /**
         *
         * @param input
         */
        prepareContent(input?: GRonGeneratoryInput): void;
    }
}
declare namespace Gordic.Ron.Dialogs {
    function GRonKumulaceDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonKumulaceInput | undefined>): JQuery.Promise<WebControls.GRonKumulaceOutput | undefined>;
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonKumulaceInput {
    }
    /**
     * Výstup z contentu.
     */
    interface GRonKumulaceOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonKumulace extends GContentBase implements IGClientContent {
        title: string;
        taskId: string;
        /**
         *
         * @param input
         */
        prepareContent(input?: GRonKumulaceInput): void;
    }
}
declare namespace Gordic.Ron.Dialogs {
    /**
     * Dialog pro výběr masek.
     * @param input Vstupní parametry dialogu.
     * @returns Promise s výstupními daty.
     */
    function GRonMaskyDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonMaskyInput | undefined>): JQuery.Promise<WebControls.GRonMaskyOutput | undefined>;
    /**
     * Dialog pro detail masky.
     * @param input Vstupní parametry dialogu.
     * @returns Promise s výstupními daty.
     */
    function GRonMaskyDetailDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonMaskyDetailInput | undefined>): JQuery.Promise<WebControls.GRonMaskyDetailOutput | undefined>;
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonMaskyInput {
        ico: string;
        rok: number;
    }
    /**
     * Výstup z contentu.
     */
    interface GRonMaskyOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonMasky extends GRonDialogBase<GRonMaskyInput, GRonMaskyOutput> {
        taskId: string;
        title: string;
        private $grid;
        private $islView;
        /**
        * Spustí se před vytvořením obsahu contentu.
        * @param input Vstupní parametry contentu.
        */
        beforeBuildContent(input: GRonMaskyInput): Promise<void>;
        /**
         * Vytvoří obsah contentu.
         * @param input Vstupní parametry contentu.
         */
        buildContent(input: GRonMaskyInput): Promise<void>;
        /**
         * Vytvoří menu pro tento content.
         */
        protected buildMenu(): void;
        /**
         * Připraví akce pro content.
         * @param input Vstupní parametry contentu.
         */
        protected prepareActions(input: GRonMaskyInput): void;
        /**
         * Příprava gridu pro zobrazení masek.
         * @returns GridFormat pro masky.
         */
        private createGridFormat;
        /**
         * Otevře detail masky.
         * @param title Název okna detailu.
         * @param ico Ico přihlášeného uživatele.
         * @param rok Účetní rok.
         * @param selectedRow Vybraný řádek v gridu, pokud je k dispozici.
         * @returns
         */
        private openDetail;
    }
}
declare namespace Gordic.Ron.WebControls {
    /** Vsputní parametry contentu. */
    interface GRonMaskyDetailInput {
        contentTitle: string;
        maskaData?: Interface.GMaskaDto;
        maskaDataDetail?: Interface.GMaskaDetailDto[];
        ico: string;
        rok: number;
    }
    /** Výstup z contentu. */
    interface GRonMaskyDetailOutput {
        isChanged: boolean;
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonMaskyDetail extends GRonDialogBase<GRonMaskyDetailInput, GRonMaskyDetailOutput> {
        taskId: string;
        private _isNew;
        private _default;
        private $maskDetailForm;
        private $gridMaskTab;
        private $gridPravaTab;
        private _gridMaskTabContent;
        private _dataGridPrava;
        private _viewPrava;
        /**
         * Zavoláno před samotnou stavbou contentu.
         * @param input Vstupní parametry contentu.
         */
        protected beforeBuildContent(input: GRonMaskyDetailInput): Promise<void>;
        /**
         * Vykreslí obsah contentu.
         * Pochází z GRonDialogBase, kde je deklarován jako abstraktní.
         * @param input Vstupní parametry contentu.
         */
        buildContent(input: GRonMaskyDetailInput): Promise<void>;
        /**
         * Asynchroní načtení validátorů.
         */
        private loadValidators;
        /**
         * Volá se při zavírání contentu.
         * @returns Promise, který vrací output z GRonMaskyDetail.
         */
        closing(): Promise<JQueryPromise<GRonMaskyDetailOutput>>;
        /**
         * Vytvoření gridu pro zobrazení nastavení masky.
         * @param ico
         * @param rok
         * @param typMasky
         */
        private createGridMaskDetail;
        /**
         * Vytvoření gridu pro nastavaní práv k masce.
         */
        private createGridPrava;
        /**
         * Vytvoří formát gridu pro zobrazení detailu masky.
         * @returns Formát gridu pro zobrazení detailu masky.
         */
        private createGridColumns_maska;
        /**
         * Načte data do contentu.
         * @param maskData Data o masce.
         */
        private loadData;
        /**
         * Vytvoří formát gridu pro zobrazení práv masky.
         * @returns Formát gridu pro zobrazení práv masky.
         */
        private createGridColumns_prava;
        /**
         * Připraví název titulku okna.
         * @param maskName Název masky.
         * @returns Název titulku okna.
         */
        private prepareContentTitle;
        /**
         * Změní vlastnosti enabled u vybrazných prvků, podle toho, jestli je povolena editace, či nikoliv
         * @param allowEditation Příznak, jestli je povolené editování.
         */
        private changeEnabled;
        /**
         * Vytvoří formulář pro masku
         * @param maskData Info o masce
         */
        private createForm;
        /**
         * Připraví formulář pro editaci|vytvoření masky.
         * @param initialOwnerFun Počáteční hodnota pro vlastníka masky (při novém záznamu).
         * @param initialMaskType Počáteční hodnota pro typ masky (při novém záznamu).
         * @returns Formulář.
         */
        private prepareForm;
        /**
         * Kontroluje, zda došlo ke změně obsahu.
         * @returns Promis jestli došlo ke změně v contentu.
         */
        private isContentChanged;
        /**
         * Uloží změny do databáze.
         * @param input Vstupní parametry.
         */
        private saveChanges;
        /**
         * Vytvoří menu pro tento kontent.
         */
        protected buildMenu(): void;
        /**
         * Připraví menu pro záložku masky.
         * @returns Menu pro zuložku detailu masky.
         */
        private prepareTabMenu;
        /**
         * Připraví menu pro záložku práva.
         * @returns Menu pro záložku detailu práv.
         */
        private prepareRightsTabMenu;
        /**
         * Získá pole z formuláře a nastaví možnost editace.
         * @param fieldName Název pole.
         * @param allowEditation Příznak, jestli je povolené editování.
         */
        private setFieldEditable;
        /**
         * Uloží nastavení masky do databáze a to tak,
         * že vezme řádek po řádku grid a každý řádek uloží.
         * @param maskDetail
         */
        private upsertMaskDetail;
        /**
         * Znovu načte aktuální content s aktuálními daty.
         */
        private reloadContent;
        /**
         * Získá aktuálně vybraný řádek z gridu nastavení masky.
         * @returns Aktuálně vybraný řádek z gridu nastavení masky.
         */
        private getActiverowFromGridMasks;
        /**
         * Připraví akce pro content.
         */
        protected prepareActions(input: GRonMaskyDetailInput): void;
    }
}
declare namespace Gordic.Ron.Dialogs {
    function GRonNakladoveZaznamyRTNDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonNakladoveZaznamyRTNInput | undefined>): JQuery.Promise<WebControls.GRonNakladoveZaznamyRTNOutput | undefined>;
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonNakladoveZaznamyRTNInput {
    }
    /**
     * Výstup z contentu.
     */
    interface GRonNakladoveZaznamyRTNOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonNakladoveZaznamyRTN extends GContentBase implements IGClientContent {
        title: string;
        taskId: string;
        /**
         *
         * @param input
         */
        prepareContent(input?: GRonNakladoveZaznamyRTNInput): void;
    }
}
declare namespace Gordic.Ron.Dialogs {
    function GRonPredaniDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonPredaniInput | undefined>): JQuery.Promise<WebControls.GRonPredaniOutput | undefined>;
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonPredaniInput {
    }
    /**
     * Výstup z contentu.
     */
    interface GRonPredaniOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonPredani extends GContentBase implements IGClientContent {
        title: string;
        taskId: string;
        /**
         *
         * @param input
         */
        prepareContent(input?: GRonPredaniInput): void;
    }
}
declare namespace Gordic.Ron.Dialogs {
    function GRonPumpyDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonPumpyInput | undefined>): JQuery.Promise<WebControls.GRonPumpyOutput | undefined>;
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonPumpyInput {
    }
    /**
     * Výstup z contentu.
     */
    interface GRonPumpyOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonPumpy extends GContentBase implements IGClientContent {
        title: string;
        taskId: string;
        /**
         *
         * @param input
         */
        prepareContent(input?: GRonPumpyInput): void;
    }
}
declare namespace Gordic.Ron.Dialogs {
    /**
     * Dialog pro výběr rozpisů.
     * @param input Vstupní parametry dialogu.
     * @returns Promise s výstupními daty.
     */
    function GRonRozpisyDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonRozpisyInput | undefined>): JQuery.Promise<WebControls.GRonRozpisyOutput | undefined>;
    /**
     * Dialog pro detail rozpisu.
     * @param input Vstupní parametry dialogu.
     * @returns Promise s výstupními daty.
     */
    function GRonRozpisyDetailDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonRozpisyDetailInput | undefined>): JQuery.Promise<WebControls.GRonRozpisyDetailOutput | undefined>;
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonRozpisyInput {
    }
    /**
     * Výstup z contentu.
     */
    interface GRonRozpisyOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonRozpisy extends GRonDialogBase<GRonRozpisyInput, GRonRozpisyOutput> {
        taskId: string;
        title: string;
        private $grid;
        private $islView;
        /**
        * Vytvoří obsah contentu.
        * @param input Vstupní parametry contentu.
        */
        buildContent(input: GRonRozpisyInput): Promise<void>;
        /**
         * Vytvoří menu pro tento content.
         */
        protected buildMenu(): void;
        /**
         * Připraví akce pro content.
         * @param input Vstupní parametry contentu.
         */
        protected prepareActions(input: GRonRozpisyInput): void;
        /**
         * Prvotní vytvoření formátu gridu.
         * @returns Formát gridu.
         */
        private createGridFormat;
        /**
         * Otevře detail rozpisu.
         * @param title Název okna detailu.
         * @param selectedRow Řádek rozpisu, který se má zobrazit v detailu (pokud je undefined, jedná se o nový rozpis).
         */
        private openDetailDialog;
    }
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonRozpisyDetailInput {
        contentTitle: string;
        rozpisData?: Interface.GRozpisDto | null | undefined;
    }
    /**
     * Výstup z contentu.
     */
    interface GRonRozpisyDetailOutput {
        isChanged: boolean;
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonRozpisyDetail extends GRonDialogBase<GRonRozpisyDetailInput, GRonRozpisyDetailOutput> {
        taskId: string;
        private $rozpisDetailForm;
        private _isNew;
        private _default;
        /**
         * Zavoláno před samotnou stavbou contentu.
         * @param input Vstupní parametry contentu.
         */
        protected beforeBuildContent(input: GRonRozpisyDetailInput): Promise<void>;
        /**
         * Vykreslí obsah contentu.
         * Pochází z GRonDialogBase, kde je deklarován jako abstraktní.
         * @param input
         * @returns
         */
        protected buildContent(input: GRonRozpisyDetailInput): Promise<void>;
        /**
         * Zavoláno po vytvoření contentu.
         * @param input Vstupní parametry contentu.
         */
        protected afterBuildContent(input: GRonRozpisyDetailInput): Promise<void>;
        /**
         *
         * @param input
         */
        protected prepareActions(input: GRonRozpisyDetailInput): void;
        /**
         * Připraví menu v contentu.
         */
        protected buildMenu(): void;
        /**
         * Připraví název titulku okna.
         * @param title Základní název.
         * @param maskName Název rozpisu.
         * @returns
         */
        private prepareContentTitle;
        /**
         * Vytvoří formulář pro editaci|vytvoření rozpisu.
         * @param initialOwnerFun Počáteční hodnota pro vlastníka rozpisu (při novém záznamu).
         */
        private createForm;
        /**
         * Připraví formulář pro editaci|vytvoření rozpisu.
         * @param initialOwnerFun Počáteční hodnota pro vlastníka rozpisu (při novém záznamu).
         * @returns
         */
        private prepareForm;
        /**
         * Pokude se nejedná o nový záznam, načte data rozpisu a aplikuje je do formuláře.
         * @param ixs_rps Identifikátor rozpisu.
         */
        private loadData;
        /**
         * Asynchroní načtení validátorů.
         */
        private loadValidators;
        /**
         * Změní vlastnosti enabled u vybrazných prvků,
         * podle toho, jestli je povolena editace, či nikoliv.
         * @param allowEditation Příznak, jestli je povolené editování.
         */
        private allowEditation;
        /**
         * Získá pole z formuláře a nastaví možnost editace.
         * @param fieldName Název pole.
         * @param allowEditation Příznak, jestli je povolené editování.
         */
        private setFieldEditable;
        /**
         * Znovu načte data aktuálního rozpisu.
         */
        private reloadContent;
        private saveChanges;
    }
}
declare namespace Gordic.Ron.Dialogs {
    function GRonSeznamKnihDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonSeznamKnihInput | undefined>): JQuery.Promise<WebControls.GRonSeznamKnihOutput | undefined>;
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonSeznamKnihInput {
    }
    /**
     * Výstup z contentu.
     */
    interface GRonSeznamKnihOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonSeznamKnih extends GContentBase implements IGClientContent {
        title: string;
        taskId: string;
        /**
         *
         * @param input
         */
        prepareContent(input?: GRonSeznamKnihInput): void;
    }
}
declare namespace Gordic.Ron.Dialogs {
    function GRonSeznamPlanuDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonSeznamPlanuInput | undefined>): JQuery.Promise<WebControls.GRonSeznamPlanuOutput | undefined>;
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonSeznamPlanuInput {
    }
    /**
     * Výstup z contentu.
     */
    interface GRonSeznamPlanuOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonSeznamPlanu extends GContentBase implements IGClientContent {
        title: string;
        taskId: string;
        /**
         *
         * @param input
         */
        prepareContent(input?: GRonSeznamPlanuInput): void;
    }
}
declare namespace Gordic.Ron.Dialogs {
    function GRonTransformaceDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonTransformaceInput | undefined>): JQuery.Promise<WebControls.GRonTransformaceOutput | undefined>;
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonTransformaceInput {
    }
    /**
     * Výstup z contentu.
     */
    interface GRonTransformaceOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonTransformace extends GContentBase implements IGClientContent {
        title: string;
        taskId: string;
        /**
         *
         * @param input
         */
        prepareContent(input?: GRonTransformaceInput): void;
    }
}
declare namespace Gordic.Ron.Dialogs {
    function GRonVysledkyRozuctovaniDlg(input: Gui.Dialogs.OpenDialogParams<WebControls.GRonVysledkyRozuctovaniInput | undefined>): JQuery.Promise<WebControls.GRonVysledkyRozuctovaniOutput | undefined>;
}
declare namespace Gordic.Ron.WebControls {
    /**
     * Vsputní parametry contentu.
     */
    interface GRonVysledkyRozuctovaniInput {
    }
    /**
     * Výstup z contentu.
     */
    interface GRonVysledkyRozuctovaniOutput {
    }
    /**
     * Hlavní třída contentu.
     */
    class GRonVysledkyRozuctovani extends GContentBase implements IGClientContent {
        title: string;
        taskId: string;
        /**
         *
         * @param input
         */
        prepareContent(input?: GRonVysledkyRozuctovaniInput): void;
    }
}
declare namespace Gordic.Ron.Dialogs {
    /**
     * Dialog pro testování Controllingu.
     * @param input Vstupní parametry dialogu.
     * @returns Promise s výstupními daty.
    */
}
