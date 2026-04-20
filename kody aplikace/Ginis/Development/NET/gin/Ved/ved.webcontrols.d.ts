declare namespace Gordic.Ved.Dialogs {
    /**
     * Seznam pro sestavy
     * - pro otevření dialogů
     *
     * @author  thazmuka
     * @date    17.06.2022
     *
     * @param   parentContent					The content.
     * @param   ModOtevreni						mod otevreni dialogu.
     * @return  .
     */
    function GVedGridDialog(parentContent: GContent, opt: {
        Ixps: string;
        Oblast: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
}
declare namespace Gordic.Ved.WebControls {
    class GVedUtils {
        constructor();
        /**
         * je hodnota null, nedefinovaná nebo prázdná ("")?
         * @param value
         */
        isNullUndefinedOrEmpty(value: any): boolean;
    }
}
declare namespace Gordic.Ved.WebControls {
    /**
     * Statistiky pro VED (modul Vedoucí)
     */
    class GVedDashboard extends GContentBase {
        private moduleInfoItems;
        private NazevRef;
        private NazevFun;
        private NazevSu;
        private DatLoginTxt;
        onContentReady(): void;
        private init;
        /** načíst informace o modulu */
        private loadModuleInfo;
    }
}
declare namespace Gordic.Ved.WebControls {
    class GVedGrid extends GContentBase {
        List: Gordic.Wfl.Interface.GDokSpisSimpleDto[];
        private grid;
        onContentReady(): void;
        private createGrid;
        private setFormat;
        private setSearchColumns;
    }
}
declare namespace Gordic.Ved.WebControls {
    /** Motor sestav modulu Vedoucí (WK) */
    class GVedReport extends GContentBase<Gordic.Ved.WebControls.GVedTasksParamsContent> {
        /** téma sestavy */
        private tema;
        /** akce pro tisk sestavy */
        private printAction;
        /** cesta contentu */
        private contentPath;
        onContentReady(): void;
        private init;
        private createPrintAction;
        private SpisPl;
        private reportStartingInitParams;
        private createForm;
        private createFormSpecial;
        private createFormReportSpisyNevyrizBezUkonu;
        private createFormReportAtestace2024;
        private createFormReportDok;
        private createFormReportOstatni;
        private createFormReportGrr;
        private createFormReportSpis;
        private createFormReportEpk;
        private createDateTimeFields;
        private createMenuBar;
        /**
         * metoda, která provede validaci a vrátí výsledek validace až je formulář připraven
         **/
        private waitForValues;
        private createCommandBar;
        private getValueFromUserSettings;
        private setValueFromUserSettings;
        private setSsldenFields;
    }
}
