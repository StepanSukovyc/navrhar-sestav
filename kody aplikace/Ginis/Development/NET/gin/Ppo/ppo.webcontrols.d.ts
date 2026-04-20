declare namespace Gordic.Ppo.Dialogs {
    /**
    * Dialog generování ZUD
    *
    * @author  Tomáš Hažmuka
    * @date    19.08.2020
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GPpoGenerateZudDlg(parentContent: GContent, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<boolean>;
}
declare namespace Gordic.Ppo.WebControls {
    class GPpoUtils {
        constructor();
        /**
         * je hodnota null, nedefinovaná nebo prázdná ("")?
         * @param value
         */
        static isNullUndefinedOrEmpty(value: any): boolean;
        /**
         * vytvořit pole pro hledání v seznamu
         */
        static getStringNamesOfColumns(format: Gordic.Data.GridFormat): string[];
    }
}
declare namespace Gordic.Ppo.WebControls {
    /**
     * Statistiky pro VED (modul Vedoucí)
     */
    class GPpoDashboard extends GContentBase {
        private moduleInfoItems;
        private NazevRef;
        private NazevFun;
        private DatLoginTxt;
        onContentReady(): void;
        private init;
        /** načíst informace o modulu */
        private loadModuleInfo;
    }
}
declare namespace Gordic.Ppo.WebControls {
    /**
     * Generování PPO
     */
    class GPpoGeneratePpo extends GContentBase<Gordic.Ppo.WebControls.GPpoBase> {
        private subtask;
        private filter;
        private form;
        private tempIxp;
        private type;
        private gridReceive;
        private gridSend;
        private gridChange;
        private viewReceive;
        private viewSend;
        private viewChange;
        onContentReady(): void;
        private init;
        private openDetail;
        private getGrid;
        private openAttachment;
        private createPrintActionPpo;
        /**
        * metoda, která provede validaci a vrátí výsledek validace až je formulář připraven
        **/
        private waitForValues;
        private createMenubar;
        private setStateAttachmentState;
        private createFilterForm;
        private createFilter;
        private createSubtasks;
        /** vytvořit seznam pro přijaté dokumenty */
        private createGridReceive;
        /** vytvořit seznam pro odeslané dokumenty */
        private createGridSend;
        /** vytvořit seznam pro změny */
        private createGridChange;
        private createFormatSend;
        private createFormatReceive;
        private createFormatChange;
        /**
        * metoda vrati seznam transakcnich protokolu, ktere se maji vygenerovat
        */
        private getListGenerateTransProtocol;
    }
}
declare namespace Gordic.Ppo.WebControls {
    /**
     * Generování PPO
     */
    class GPpoGenerateZud extends GContentBase {
        /** element formuláře */
        private form;
        onContentReady(): void;
        private createContextMenu;
        private generateZud;
        private createForm;
    }
}
declare namespace Gordic.Ppo.WebControls {
    /**
     * Generování PPO
     */
    class GPpoHistoryDocSpis extends GContentBase<Gordic.Ppo.WebControls.GPpoBase> {
        private TEMP_TAB_INDEX;
        /** akce pro tisk sestavy */
        private printAction;
        /** element formuláře */
        private form;
        /** element gridů */
        private grids;
        /** data dialogu */
        private data;
        onContentReady(): void;
        /** spuštění dialogu hledání */
        private search;
        private createMenubar;
        private setEnabledToPrintAction;
        /**
        * metoda, která provede validaci a vrátí výsledek validace až je formulář připraven
        **/
        private waitForValues;
        private createPrintAction;
        private createIxpList;
        private init;
        private applyContent;
        /**
         * vytvořit formulář
         * @param ixpList seznam identifikátorů pro výběr
         * @param data data do seznamu a formuláře
         */
        private createForm;
        /** vytvořit seznam */
        private createGrid;
        /**
         * vytvořit formát pro seznam
         * @param type typ formátu
         */
        private createFormat;
    }
}
