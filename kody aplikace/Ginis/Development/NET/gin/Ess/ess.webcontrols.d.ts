declare namespace Gordic.Ess.Dialogs {
    /**
     * Otevřít dialog nového exportu
     *
     * @param {GContent} parentContent
     * @param {{ id?: string }} opt
     * @param {Gordic.Global.Enums.ModOtevreni} [ModOtevreni]
     * @returns {JQueryPromise<any>}
     */
    function GEssNewEssDlg(parentContent: GContent, opt: {
        rows: Gordic.Ess.Interface.GEssExportIxpDto[];
    } | null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * Spustit finalizaci importu
     */
    function GEssFinalizeImportDlg(parentContent: GContent, opt: {
        dto: Gordic.Ess.Interface.GEssImportInputDto;
    } | null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    function GEssSeznamDavkyDlg(parentContent: GContent, opt: {
        typDavky: Gordic.Ess.Interface.GEssTypDavRssEnum;
    } | null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    function GEssDetailDavkaDlg(parentContent: GContent, opt: {
        davka_id: number;
        ixs_ext: string;
    } | null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
}
declare namespace Gordic.Ess.WebControls {
    enum TypEntity {
        Soubor = "Soubor",
        Dokument = "Dokument",
        Spis = "Spis",
        TypovySpis = "TypovySpis"
    }
    /**
     * GEssUtils
     *
     * @author thazmuka
     * @since 52510.1
     */
    class GEssUtils {
        waitForValues(form: JQuery<HTMLElement>): JQueryPromise<boolean>;
        /**
         * Validace sloupců pro hledání pro seznamy
         */
        validateSearchColumns<T>(searchColumns: string[], inputColumns: GGridColumn<T>[]): void;
        downloadFile(guid: string, cnt: GContentType<any>): void;
    }
}
declare namespace Gordic.Ess.WebControls {
    /**
     * Úvodní stránka ESS
     *
     * @author thazmuka
     * @since 52510.1
     */
    class GEssDashboard extends GContentBase {
        private NazevRef;
        private NazevFun;
        private DatLoginTxt;
        onContentReady(): void;
        private init;
        private loadModuleInfo;
    }
}
declare namespace Gordic.Ess.WebControls {
    /**
     * ESS: Detail dávky
     *
     * @author thazmuka
     * @since 52510.1
     */
    class GEssDetailDavka extends GContentBase {
        private DavkaId;
        private grid;
        private form;
        private view;
        private IxsExt;
        private utilsCnt;
        private DatZmena;
        private Data;
        onContentReady(): void;
        private createForm;
        private createMenubar;
        private createCommandbar;
        private getFilter;
        private getStringNamesOfColumns;
        private createGrid;
    }
}
declare namespace Gordic.Ess.WebControls {
    /**
     * ESS: Seznam dávek
     *
     * @author thazmuka
     * @since 52510.1
     */
    class GEssSeznamDavky extends GContentBase {
        private grid;
        private view;
        private filterData;
        private filter;
        onContentReady(): void;
        private createCommandbar;
        private createMenubar;
        private createFilterpanel;
        private createFilterForm;
        private getFilter;
        private createGrid;
    }
}
declare namespace Gordic.Ess.WebControls {
    /**
     * ESS: Export
     *
     * @author thazmuka
     * @since 52510.1
     */
    class GEssExport extends GContentBase {
        private form;
        private filter;
        private grid;
        private view;
        private filterData;
        private utils;
        private Rows;
        onContentReady(): void;
        private createCommandbar;
        private createForm;
        private createMenubar;
        private runAsyncAction;
        private getFilter;
        private createGrid;
        private createFilterpanel;
        private createFilterForm;
    }
}
declare namespace Gordic.Ess.WebControls {
    /**
     * Výsledek importu
     *
     * @author thazmuka
     * @since 52520.11
     */
    class GEssFinalizeImport extends GContentBase {
        private asyncTask;
        private userRequestedCancel;
        private Dto;
        private grid;
        private view;
        private utilsCnt;
        onContentReady(): void;
        private createMenubar;
        private runAsyncImportAction;
        private gridChange;
        private createGrid;
        private createCommandbar;
    }
}
declare namespace Gordic.Ess.WebControls {
    /**
     * Seznam importovaných balíků
     *
     * @author thazmuka
     * @since 52510.1
     */
    class GEssPrepareImport extends GContentBase {
        private davka_id?;
        private grid;
        private form;
        private view;
        private utilsCnt;
        private utils;
        private guid?;
        onContentReady(): void;
        private createGrid;
        private createForm;
        /** el. soubory pro import */
        private eleFilesToImport;
        private createMenubar;
        private createCommandbar;
    }
}
declare namespace Gordic.Ess.WebControls {
    /**
     * Potvrzení dávky
     *
     * @author thazmuka
     * @since 52520.11
     */
    class GEssPotvrzeni extends GContentBase {
        private form;
        private utilsCnt;
        private utils;
        /** id guidu xml souboru */
        private guid?;
        /** identifikáto externího systému */
        private IxsExt;
        /** id dávky */
        private DavkaId;
        onContentReady(): void;
        private createCommandbar;
        private createMenubar;
        private createForm;
    }
}
