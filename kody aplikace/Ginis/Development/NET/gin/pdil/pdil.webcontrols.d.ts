declare namespace Gordic.Pdil.WebControls {
    /**
     * Content který zobrazí subtask, kde každá "záložka" drží jeden soubor.
     */
    class GAnonymizationCheck extends GContent implements IGClientContent {
        uid: string;
        title: string;
        $files: Gordic.Pdil.Interface.Dtos.GPdilFileInfoDto[];
        private $selectFileContent;
        private $anonymizationContent;
        private $summaryContent;
        private $originalFileName;
        private $wizard;
        private $isExported;
        /**
         * Vytvoření contentu.
         */
        prepareContent(): void;
        /**
         * Řeší úklid dočasných souborů.
         * @param deferred
         * @returns
         */
        cleaningUp(deferred: JQuery.Deferred<any>): void;
        /**
         * Při zavírání contentu je potřeba provést uklid a odstranit všechny dočasné soubory.
         * Hláška, jestli chce uživatel opustit rozpracovanou práci.
         * @returns Vrací promis, který nám říká, jestli už jsou všechny soubory odstraněny.
         */
        closing(): JQueryPromise<void>;
    }
}
declare namespace Gordic.Pdil.WebControls {
    /**
     * Třída drží subtask a umožňuje přepínání mezi jednotlivými soubory.
     */
    class G_partialAnonymizationFiles extends GContent implements IGClientContent {
        $activeFile: Gordic.Pdil.Interface.Dtos.GPdilFileInfoDto;
        $filesToAnonymization: Gordic.Pdil.Interface.Dtos.GPdilFileInfoDto[];
        private $gsubtask;
        $fileProcessingAnonymizationContent: G_partialProcessAnonymizationFile;
        /**
         * Konstruktor třídy.
         */
        constructor(data: any);
        /**
         * Příprava contentu.
         */
        prepareContent(): void;
        /**
         * Připraví taby pro gsubtask.
         * @returns Jednotlivé taby MenuParams[]
         */
        private PrepareSubtasks;
        /**
         * Registruje všechny akce v tomto partial contentu.
         */
        private CreateActions;
    }
}
declare namespace Gordic.Pdil.WebControls {
    /**
     * Třída partial contentu pro výběr a identifikaci a předzpracování souboru.
     */
    class G_partialAnonymizationImport extends GContent implements IGClientContent {
        $grid: JQuery;
        $importedFileInfo: General.ApplicationInterface.GFileInfoDto;
        private $form;
        private $parent;
        private $gridView;
        /**
         * Konstruktor třídy.
         */
        constructor();
        /**
         * Vytvoření contentu.
         */
        prepareContent(): void;
        /**
         * Registruje všechny akce v tomto partial contentu.
         */
        private createActions;
        /**
         * Vytvoří formát pro sloupce gridu.
         * @returns Formátovaný grid.
         */
        private createGridFormat;
        /**
        * Vrací text odpovídající ikonu k danému souboru.
        * @param data
        * @param returnIco
        * @returns
        */
        private GetIconAndText;
    }
}
declare namespace Gordic.Pdil.WebControls {
    /**
     * Enum, který drží jména akcí.
     */
    enum GActionNames {
        anonymize = "anonymize",
        public = "public",
        btnCloseSubtask = "btnCloseSubtask",
        ggridSelectedAction = "ggridSelectedAction",
        anonymizeAll = "anonymizeAll",
        publicAll = "publicAll",
        actionClick = "actionClick",
        contextMenu = "contextMenu",
        onClick_contextMenu = "onClick_contextMenu",
        onAnonymize = "onAnonymize",
        onPublic = "onPublic"
    }
    /**
     * Content pro zobrazení obsahu souboru a také drží subcontent se seznamem anonymizací.
     */
    class G_partialProcessAnonymizationFile extends GContent implements IGClientContent {
        uid: string;
        title: string;
        $subContent: G_partialProcessAnonymizationFileSubcontent;
        private $parent;
        private $contextMenu;
        private $contentContainer;
        /**
         * Parametrický konstruktor třídy.
         */
        constructor(data: any);
        /**
         * Vytvoření kontentu.
         */
        prepareContent(): void;
        /**
         * Zajistí výměnu obsahu contentu souboru i seznamu anonymizací v gridu subcontentu.
         * @param files Soubory k výměně (toLoad a toSave)
         * @returns Vrací promise ve chvíli, kdy je výměna dokončena.
         */
        switchFile(files: {
            toSave: Interface.Dtos.GPdilFileInfoDto | null | undefined;
            toLoad: Interface.Dtos.GPdilFileInfoDto | null | undefined;
        }): JQueryPromise<void>;
        /**
         * Obnoví content ze souboru.
         * @param fileContent Obsah souboru k zobrazení.
         */
        private refreshContent;
        /**
         * Změní zvýraznění elementu v náhledu souboru.
         * @param spanId ID spanu k zvýraznění
         */
        private chageSelection;
        /**
         * Pouze registruje všechny akce.
         */
        private createActions;
        /**
         * Událost na změnu vybraného řádku v Gridu
         */
        private onRowSelectChange;
        /**
         * Událost, která změní text na **** a obráceně
         */
        private onAnonymizationChanged;
    }
}
declare namespace Gordic.Pdil.WebControls {
    /**
     * Zobrazení subcontentu a provádí vlastní anonynimizaci.
     */
    class G_partialProcessAnonymizationFileSubcontent extends GContent implements IGClientContent {
        $listOfAnonymizations: Gordic.Pdil.Interface.Dtos.GPdilAnonymizedElementDto[];
        private $grid;
        private $view;
        private $myParentContent;
        /**
         * Bezparametrický konstrukt třídy.
         */
        constructor(data: any);
        /**
         * Volá se jednou při inicializaci (asynchronně), vytváří grid pro seznam itemů k anonymizaci.
         */
        prepareContent(): void;
        /**
         * Vytvoření formátu pro grid.
         * @returns Vrací GridFormat
         */
        private createGridFormat;
        /**
         * Metoda provede anonymizaci / uveřejnění zvoleného elementu.
         * @param anonymItems Zvolený element.
         * @param toAnonymize Pokyn jestli anonymizovat, nebo uveřejnit zvolený element.
         */
        private changeAnonymization;
        /**
         * Vrací anonymizovaný řetězec.
         * @param textToAnonymization Text k anonymizaci.
         * @param type Typ anonymizace.
         * @returns Anonymizovaný text.
         */
        private getAnonymizationString;
        /**
         * Anonymizuje email do formátu ******@*******.**
         * @param textToAnonymization Email k anonymizaci.
         * @returns Anonymizovaný email.
         */
        private anonymEmail;
        /**
         * Vytvoří seznam akcí.
         */
        private createActions;
        /**
         * Obsluha události volána při načtení souboru v rodičovském contentu.
         */
        private onFileLoaded;
        /**
         * Obsluha události na kliknutí na element v poli dokumentu, nikoliv v gridu.
         */
        private onClickSelectChange;
        /**
         * Obsluha události na kliknutí v contextovém menu.
         */
        private onContextAnonymChanged;
    }
}
declare namespace Gordic.Pdil.WebControls {
    /**
     * Třída posledního kroku průvodce. Sumarizace výsledku anonymizace.
     */
    class G_partialSummary extends GContent implements IGClientContent {
        private $parent;
        private $gridViewSummary;
        /**
         * Konstruktor třídy.
         * @param data
         */
        constructor(data: any);
        /**
         * Připraví a vykreslí celý content.
         * @param data
         */
        prepareContent(): void;
        /**
         * Vytvoří formát pro sloupce gridu.
         * @returns Formátovaný grid.
         */
        createGridFormat(): GGridColumn<Interface.Dtos.GPdilFileInfoDto>[] | Data.GridFormat<Interface.Dtos.GPdilFileInfoDto> | undefined;
        /**
         * Vrací text a odpovídající ikonu k danému souboru.
         * @param data
         * @param returnIco
         * @returns
         */
        private GetIconOrText;
    }
}
declare namespace Gordic.Pdil.WebControls {
    function foo(): void;
}
