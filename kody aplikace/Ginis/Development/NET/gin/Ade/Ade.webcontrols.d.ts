declare namespace Gordic.Ade.WebControls {
    /**
     * CopyRokWizard
     *
     * @author Daniel Bouchal
     * @since 525.1.0.1
     */
    class CopyRokWizard extends GContentBase {
        private Sender;
        private RokAkt;
        private PrerusitAkci;
        private grid;
        private data;
        onContentReady(): void;
        private pridejDoTabulkyZaznam;
    }
}
declare namespace Gordic.Ade.WebControls.GAdeUtils {
    function createMinOrMaxRokMesic(options: {
        name: string;
        form: Gordic.Forms.Form;
        itemEditable: (value: any) => boolean;
        addValidatorOdDo: boolean;
        minValue: boolean;
        flag?: null | GFieldFlagOptions | string;
    }): Gordic.Forms.Form;
    function createFormRokMesicValue(minValue: boolean): Gordic.Forms.Form;
    function validatorsRok(minValue: boolean): Gordic.Validators.Base;
    function validatorMesic(minValue: boolean): Gordic.Validators.Base;
    function validatorsPlatnostOdDo(formName: string): Gordic.Validators.Base;
}
declare namespace Gordic.Ade.WebControls {
    class GAdeDashboard extends GContentBase {
        private moduleInfoItems;
        private NazevRef;
        private NazevFun;
        private DatLoginTxt;
        onContentReady(): void;
        /** načíst informace o modulu */
        private loadModuleInfo;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeBankovniUcetEkoKnihy extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeBankovniUcetEkoKnihyObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeBankovniUcetEkoKnihyReadDto> {
        ico: string;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeBankovniUcetEkoKnihySaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class HromadnaOperaceAdeBankovniUcetEkoKnihy extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class HromadnaOperaceAdeBankovniUcetEkoKnihyObj extends Gordic.Adm.WebControls.GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdeBankovniUcetEkoKnihyReadDto> {
        private ico;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeBankovniUcetEkoKnihy extends GContentBase<SeznamAdeBankovniUcetEkoKnihyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeBankovniUcetEkoKnihyObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        getColumnOrder(): string;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        getDataCount(): JQueryPromise<Gordic.AdmIsl.Interface.GAdmCountData> | null;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private addHromadne;
        private editHromadne;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeDefiniceSeskupeni extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeDefiniceSeskupeniObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeDefiniceSeskupeniReadDto> {
        returnValue: boolean;
        typ_ose: number;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeDefiniceSeskupeniSaveDto, close: boolean): void;
        returnValueFunction(): any;
        reloadTreeGrid(close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getPovoleniPristupuGroup(): IGTabGroupOptions;
        getPovoleniPristupuTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeDefiniceSeskupeni extends GContentBase<SeznamAdeDefiniceSeskupeniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeDefiniceSeskupeniObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        newRecordPovoleniPristupu: boolean;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private openSeznamAdePovoleniPristupu;
        private openHromadnaOperacePovoleniPristupu;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeDefiniceSeskupeniObsah extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeDefiniceSeskupeniObsahObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeDefiniceSeskupeniObsahReadDto> {
        typ_objektu: number;
        typ_ose: number;
        ico: number;
        isObsahSeskupeni: boolean;
        newRecordOmezeniPermission: boolean;
        typ_ose_ks: string;
        hideFields(): void;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeDefiniceSeskupeniObsahSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        updateGridBase(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never> | JQuery.Deferred<any, any, any>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private newDefiniceSeskupeni;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeDefiniceSeskupeniObsah extends GContentBase {
        private newRecordPermission;
        private editVazbaPermission;
        private editOmezeniPermission;
        private newRecordPovoleniPristupu;
        private filterFormEl;
        private gridEl;
        private view;
        private filterData;
        private tabOpen;
        onContentReady(): void;
        private init;
        private createActions;
        private createMenubar;
        private createContextMenu;
        private baseAction;
        private createStatusBar;
        private createFilterForm;
        private createForm;
        private getData;
        private createGrid;
        private openDetail;
        private openHromadnaOperacePovoleniPristupu;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeKategorieSeskupeni extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeKategorieSeskupeniObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeKategorieSeskupeniReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeKategorieSeskupeniSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createFormRokMesicValue;
        private validatorsRok;
        private validatorMesic;
        private validatorsPlatnostOdDo;
        urovenKategorieSeskupeniGroup(): IGTabGroupOptions;
        urovenKategorieSeskupeniTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeKategorieSeskupeni extends GContentBase<SeznamAdeKategorieSeskupeniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeKategorieSeskupeniObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private openSeznamAdeUrovenKategorieSeskupeni;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeKompetentRealizatora extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeKompetentRealizatoraObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeKompetentRealizatoraReadDto> {
        ico: string;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeKompetentRealizatoraSaveDto, close: boolean): void;
        saveDataFunction(data: Gordic.AdmIsl.Interface.GAdeKompetentRealizatoraSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class HromadnaOperaceAdeKompetentRealizatora extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class HromadnaOperaceAdeKompetentRealizatoraObj extends Gordic.Adm.WebControls.GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdeKompetentRealizatoraReadDto> {
        private ico;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        updateDataBeforeEditGrid(): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        private createFormKompetent;
        private checkUnique;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeKompetentRealizatora extends GContentBase<SeznamAdeKompetentRealizatoraObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeKompetentRealizatoraObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ico;
        private cis_real;
        getColumnOrder(): string;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private editHromadne;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKonsolidacniPartner extends GContentBase<GSeznamAdeKonsolidacniPartnerObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKonsolidacniPartnerObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private rok;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeNakladoveStrediskoFunkcniMisto extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeNakladoveStrediskoFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeNakladoveStrediskoFunkcniMistoDto> {
        openFromFunkcniMisto: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeNakladoveStrediskoFunkcniMistoDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GHromadnaOperaceAdeNakladoveStrediskoFunkcniMisto extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class GHromadnaOperaceAdeNakladoveStrediskoFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdeNakladoveStrediskoFunkcniMistoDto> {
        openFromFunkcniMisto: boolean;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        openFromFunkcniMistoFunc(): boolean;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeNakladoveStrediskoFunkcniMisto extends GContentBase<GSeznamAdeNakladoveStrediskoFunkcniMistoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeNakladoveStrediskoFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        nks: string;
        ico: string;
        ixs_fun: string;
        private getSrv;
        getColumnOrder(): string;
        private openFromFunkcniMisto;
        create(): void;
        openDetail(data: any, isNew: boolean, type: number): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private editHromadne;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): 0 | 1 | 2;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdePovoleniPristupu extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdePovoleniPristupuObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdePovoleniPristupuReadDto> {
        ico: string;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdePovoleniPristupuSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class HromadnaOperaceAdePovoleniPristupu extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class HromadnaOperaceAdePovoleniPristupuObj extends Gordic.Adm.WebControls.GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdePovoleniPristupuReadDto> {
        private ico;
        private nsjednotlive;
        private orgjednotlive;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        private createSpecialValidator;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdePovoleniPristupu extends GContentBase<SeznamAdePovoleniPristupuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdePovoleniPristupuObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        element_ose: string;
        typ_ose: string;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private editHromadne;
        private newHromadneSpecial;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeRealizator extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeRealizatorObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeRealizatorReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeRealizatorSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createFormNks(): Gordic.Forms.Form;
        private validatorRok;
        private checkUnique;
        getPrirazeniKompetentiGroup(): IGTabGroupOptions;
        getPrirazeniKompetentiTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeRealizator extends GContentBase<SeznamAdeRealizatorObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeRealizatorObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private openAdeKompetentRealizatoraHromadne;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeUcetniStredisko extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeUcetniStrediskoObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeUcetniStrediskoReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeUcetniStrediskoSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createRokOdDoValidators;
        private openSeznamAdeUcetniStrediskoFunkcniMisto;
        private openSeznamAdeUctarna;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeUcetniStredisko extends GContentBase<SeznamAdeUcetniStrediskoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeUcetniStrediskoObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private openSeznamAdeUcetniStrediskoFunkcniMisto;
        private openSeznamAdeUctarna;
        private openHromadneAdeUcetniStrediskoFunkcniMisto;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeUcetniStrediskoFunkcniMisto extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeUcetniStrediskoFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeUcetniStrediskoFunkcniMistoDto> {
        openFromFunkcniMisto: boolean;
        povoleneSpisUzly: string[];
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeUcetniStrediskoFunkcniMistoDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class HromadnaOperaceAdeUcetniStrediskoFunkcniMisto extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class HromadnaOperaceAdeUcetniStrediskoFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdeUcetniStrediskoFunkcniMistoDto> {
        povoleneSpisUzly: string[];
        openFromFunkcniMisto: boolean;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        openFromFunkcniMistoFunc(): boolean;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeUcetniStrediskoFunkcniMisto extends GContentBase<SeznamAdeUcetniStrediskoFunkcniMistoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeUcetniStrediskoFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        ucs: string;
        ico: string;
        ixs_fun: string;
        srv: GContent;
        private getSrv;
        private openFromFunkcniMisto;
        create(): void;
        openDetail(data: any, isNew: boolean, type: number): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private editHromadne;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): 0 | 1 | 2;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeUctarna extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeUctarnaObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeUctarnaReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeUctarnaSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createRokOdDoValidators;
        private openHromadnaOperaceAdeUctarnaFunkcniMisto;
        private openSeznamUctarnaFunkcniMisto;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeUctarna extends GContentBase<SeznamAdeUctarnaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeUctarnaObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ucs;
        private ico;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private openSeznamUctarnaFunkcniMisto;
        private openHromadnaOperaceAdeUctarnaFunkcniMisto;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeUctarnaFunkcniMisto extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeUctarnaFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeUctarnaFunkcniMistoDto> {
        openFromFunkcniMisto: boolean;
        povolenaUcetniStrediska: Gordic.Adm.Interface.GEkovfnsDto[];
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeUctarnaFunkcniMistoDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class HromadnaOperaceAdeUctarnaFunkcniMisto extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class HromadnaOperaceAdeUctarnaFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdeUctarnaFunkcniMistoDto> {
        povoleneSpisUzly: string[];
        openFromFunkcniMisto: boolean;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        openFromFunkcniMistoFunc(): boolean;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeUctarnaFunkcniMisto extends GContentBase<SeznamAdeUctarnaFunkcniMistoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeUctarnaFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        ucs: string;
        ico: string;
        uus: string;
        ixs_fun: string;
        private openFromFunkcniMisto;
        private getSrv;
        create(): void;
        openDetail(data: any, isNew: boolean, type: number): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        getDataCount(): JQueryPromise<Gordic.AdmIsl.Interface.GAdmCountData> | null;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private editHromadne;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): 0 | 1 | 2;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeUrovenKategorieSeskupeni extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeUrovenKategorieSeskupeniObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeUrovenKategorieSeskupeniReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeUrovenKategorieSeskupeniSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeUrovenKategorieSeskupeni extends GContentBase<SeznamAdeUrovenKategorieSeskupeniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeUrovenKategorieSeskupeniObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        ixs_kto: string;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKnihaMza extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKnihaMzaObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKnihaMzaNewDto> {
        srv: GContent;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.Ade.Interface.GAdeKnihaMzaNewDto, close: boolean): void;
        private saveVazby;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getPrirazenaFunkcniMistaGroup(): IGTabGroupOptions;
        getParametryKnihyGroup(): IGTabGroupOptions;
        getPrirazenaFunkcniMistaTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getParametryKnihyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private openParametry;
        private openFunkcniMista;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKnihaMza extends GContentBase<GSeznamAdeKnihaMzaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKnihaMzaObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        private openSeznamAdeKnihaMzaFunkcniMisto;
        getGridFormat(): Gordic.Data.GridFormat;
        private openHromadnePriraditFunkcniMista;
        private openParametry;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKnihaMzaFunkcniMisto extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKnihaMzaFunkcniMistoObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GHromadnaOperaceAdeKnihaMzaFunkcniMisto extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class GHromadnaOperaceAdeKnihaMzaFunkcniMistobj extends Gordic.Adx.WebControls.GAdxHromadnaOperaceBase<Gordic.Ade.Interface.GAdeKnihaMzaFunkcniMistoDto> {
        ico: string;
        private povoleneFunkce;
        private faze;
        create(): void;
        private getServerFilters;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        private createValidatorsSpecial;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKnihaMzaFunkcniMisto extends GContentBase<GSeznamAdeKnihaMzaFunkcniMistoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKnihaMzaFunkcniMistoObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        ixp_den: string;
        subrada: number;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
        private editHromadne;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeAktivitaTrideniPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeAktivitaTrideniPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeAktivitaTrideniPcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        private rpp;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeAktivitaTrideniPcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeAktivitaTrideniPcn extends GContentBase<GSeznamAdeAktivitaTrideniPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeAktivitaTrideniPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeBankovniUctyPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeBankovniUctyPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeBankovniUctyPcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeBankovniUctyPcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeBankovniUctyPcn extends GContentBase<GSeznamAdeBankovniUctyPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeBankovniUctyPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeCleneniPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        rok: number;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeCleneniPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeCleneniPcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        private rpp;
        rokS: number;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeCleneniPcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeCleneniPcn extends GContentBase<GSeznamAdeCleneniPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeCleneniPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKalkulacniKurzyPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKalkulacniKurzyPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKalkulacniKurzyPcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeKalkulacniKurzyPcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKalkulacniKurzyPcn extends GContentBase<GSeznamAdeKalkulacniKurzyPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKalkulacniKurzyPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKategorieHodnoceniPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKategorieHodnoceniPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKategorieHodnoceniPcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeKategorieHodnoceniPcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKategorieHodnoceniPcn extends GContentBase<GSeznamAdeKategorieHodnoceniPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKategorieHodnoceniPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKategorieNahradPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKategorieNahradPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKategorieNahradPcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeKategorieNahradPcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKategorieNahradPcn extends GContentBase<GSeznamAdeKategorieNahradPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKategorieNahradPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKnihaPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKnihaPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKnihaPcnDto> {
        srv: GContent;
        private getSrv;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeKnihaPcnDto, close: boolean): void;
        private saveVazby;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getPrirazenaFunkcniMistaGroup(): IGTabGroupOptions;
        getParametryKnihyGroup(): IGTabGroupOptions;
        getPrirazenaFunkcniMistaTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getParametryKnihyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private openParametry;
        private openFunkcniMista;
        createVazbaCleneniGroup(): IGTabGroupOptions;
        createVazbaCleneniTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKnihaPcnCleneni extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKnihaPcnCleneniObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKnihaPcnCleneniDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeKnihaPcnCleneniDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKnihaPcnFunkcniMisto extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKnihaPcnFunkcniMistoObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GHromadnaOperaceAdeKnihaPcnFunkcniMisto extends GContentBase<GSeznamAdeKnihaPcnFunkcniMistoObj> {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class GHromadnaOperaceAdeKnihaPcnFunkcniMistoobj extends Gordic.Adx.WebControls.GAdxHromadnaOperaceBase<Gordic.Ade.Interface.GAdeKnihaPcnFunkcniMistoDto> {
        ico: string;
        private povoleneFunkce;
        private faze;
        create(): void;
        private getServerFilters;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        private createValidatorsSpecial;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKnihaPcn extends GContentBase<GSeznamAdeKnihaPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKnihaPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        private openSeznamAdeKnihaPcnFunkcniMisto;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
        private openHromadnePriraditFunkcniMista;
        private openParametry;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKnihaPcnCleneni extends GContentBase<GSeznamAdeKnihaPcnCleneniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKnihaPcnCleneniObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private ixp_den;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKnihaPcnFunkcniMisto extends GContentBase<GSeznamAdeKnihaPcnFunkcniMistoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKnihaPcnFunkcniMistoObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        ixp_den: string;
        subrada: number;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
        private editHromadne;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeLimityOmezeniPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeLimityOmezeniPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeLimityOmezeniPcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeLimityOmezeniPcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeLimityOmezeniPcn extends GContentBase<GSeznamAdeLimityOmezeniPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeLimityOmezeniPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeNazevCisKategorieHodnoceniPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeNazevCisKategorieHodnoceniPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeNazevCisKategorieHodnoceniPcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeNazevCisKategorieHodnoceniPcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeNazevCisKategorieHodnoceniPcn extends GContentBase<GSeznamAdeNazevCisKategorieHodnoceniPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeNazevCisKategorieHodnoceniPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdePevneDefinovaneNahradyPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdePevneDefinovaneNahradyPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdePevneDefinovaneNahradyPcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdePevneDefinovaneNahradyPcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdePevneDefinovaneNahradyPcn extends GContentBase<GSeznamAdePevneDefinovaneNahradyPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdePevneDefinovaneNahradyPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdePrumernaVyseNahradPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdePrumernaVyseNahradPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdePrumernaVyseNahradPcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdePrumernaVyseNahradPcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdePrumernaVyseNahradPcn extends GContentBase<GSeznamAdePrumernaVyseNahradPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdePrumernaVyseNahradPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeTypNahradyPcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeTypNahradyPcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeTypNahradyPcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeTypNahradyPcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeTypNahradyPcn extends GContentBase<GSeznamAdeTypNahradyPcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeTypNahradyPcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeCenaPalivaRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeCenaPalivaRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeCenaPalivaRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeCenaPalivaRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeCenaPalivaRcn extends GContentBase<GSeznamAdeCenaPalivaRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeCenaPalivaRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeDopravaRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeDopravaRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeDopravaRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeDopravaRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeDopravaRcn extends GContentBase<GSeznamAdeDopravaRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeDopravaRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeFinacniUctarnaRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeFinacniUctarnaRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeFinacniUctarnaRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeFinacniUctarnaRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeFinacniUctarnaRcn extends GContentBase<GSeznamAdeFinacniUctarnaRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeFinacniUctarnaRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKategorieHodnoceniRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKategorieHodnoceniRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKategorieHodnoceniRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeKategorieHodnoceniRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKategorieHodnoceniRcn extends GContentBase<GSeznamAdeKategorieHodnoceniRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKategorieHodnoceniRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKnihaRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKnihaRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKnihaRcnDto> {
        srv: GContent;
        private getSrv;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeKnihaRcnDto, close: boolean): void;
        private saveVazby;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getPrirazenaFunkcniMistaGroup(): IGTabGroupOptions;
        getParametryKnihyGroup(): IGTabGroupOptions;
        getPrirazenaFunkcniMistaTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getParametryKnihyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private openParametry;
        private openFunkcniMista;
        createVazbaCleneniGroup(): IGTabGroupOptions;
        createVazbaCleneniTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKnihaRcnCleneni extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKnihaRcnCleneniObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKnihaRcnCleneniDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeKnihaRcnCleneniDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKnihaRcnFunkcniMisto extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKnihaRcnFunkcniMistoObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GHromadnaOperaceAdeKnihaRcnFunkcniMisto extends GContentBase<GSeznamAdeKnihaRcnFunkcniMistoObj> {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class GHromadnaOperaceAdeKnihaRcnFunkcniMistoobj extends Gordic.Adx.WebControls.GAdxHromadnaOperaceBase<Gordic.Ade.Interface.GAdeKnihaRcnFunkcniMistoDto> {
        ico: string;
        private povoleneFunkce;
        private faze;
        create(): void;
        private getServerFilters;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        private createValidatorsSpecial;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKnihaRcn extends GContentBase<GSeznamAdeKnihaRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKnihaRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        private openSeznamAdeKnihaRcnFunkcniMisto;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
        private openHromadnePriraditFunkcniMista;
        private openParametry;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKnihaRcnCleneni extends GContentBase<GSeznamAdeKnihaRcnCleneniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKnihaRcnCleneniObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private ixp_den;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKnihaRcnFunkcniMisto extends GContentBase<GSeznamAdeKnihaRcnFunkcniMistoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKnihaRcnFunkcniMistoObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        ixp_den: string;
        subrada: number;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
        private editHromadne;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeMezinarodniSmlouvyRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeMezinarodniSmlouvyRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeMezinarodniSmlouvyRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeMezinarodniSmlouvyRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeMezinarodniSmlouvyRcn extends GContentBase<GSeznamAdeMezinarodniSmlouvyRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeMezinarodniSmlouvyRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeNavyseniNahradRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeNavyseniNahradRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeNavyseniNahradRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeNavyseniNahradRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeNavyseniNahradRcn extends GContentBase<GSeznamAdeNavyseniNahradRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeNavyseniNahradRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdePokladnaRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdePokladnaRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdePokladnaRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdePokladnaRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdePokladnaRcn extends GContentBase<GSeznamAdePokladnaRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdePokladnaRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdePokladnaPuvodniAlgoritmusRcn extends GContentBase {
        private dataListDescription;
        private data;
        private dataPredpln;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdePokladnaPuvodniAlgoritmusRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdePokladnaPuvodniAlgoritmusRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        upravenoViceZaznamu: boolean;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdePokladnaPuvodniAlgoritmusRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Návratová hodnota z detailu
         * @returns
         */
        returnValueFunction(): any;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdePokladnaPuvodniAlgoritmusRcn extends GContentBase<GSeznamAdePokladnaPuvodniAlgoritmusRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdePokladnaPuvodniAlgoritmusRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeRozliseniTypuOsobyRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeRozliseniTypuOsobyRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeRozliseniTypuOsobyRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeRozliseniTypuOsobyRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeRozliseniTypuOsobyRcn extends GContentBase<GSeznamAdeRozliseniTypuOsobyRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeRozliseniTypuOsobyRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeSadaNahradRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeSadaNahradRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeSadaNahradRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeSadaNahradRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeSadaNahradRcn extends GContentBase<GSeznamAdeSadaNahradRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeSadaNahradRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeSazbyNavstevRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeSazbyNavstevRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeSazbyNavstevRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeSazbyNavstevRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeSazbyNavstevRcn extends GContentBase<GSeznamAdeSazbyNavstevRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeSazbyNavstevRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeStravneRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeStravneRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeStravneRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeStravneRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeStravneRcn extends GContentBase<GSeznamAdeStravneRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeStravneRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeTypNahradyRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeTypNahradyRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeTypNahradyRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeTypNahradyRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeTypNahradyRcn extends GContentBase<GSeznamAdeTypNahradyRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeTypNahradyRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeTypOsobyRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeTypOsobyRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeTypOsobyRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeTypOsobyRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
        createVazbaTypPozGroup(): IGTabGroupOptions;
        createVazbaTypPozTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeTypOsobyRcn extends GContentBase<GSeznamAdeTypOsobyRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeTypOsobyRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeTypOsobyVazbaTypPozRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeTypOsobyVazbaTypPozRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeTypOsobyVazbaTypPozRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeTypOsobyVazbaTypPozRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeTypOsobyVazbaTypPozRcn extends GContentBase<GSeznamAdeTypOsobyVazbaTypPozRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeTypOsobyVazbaTypPozRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private ixs_tos;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeTypPlatebniKartyRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeTypPlatebniKartyRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeTypPlatebniKartyRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeTypPlatebniKartyRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeTypPlatebniKartyRcn extends GContentBase<GSeznamAdeTypPlatebniKartyRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeTypPlatebniKartyRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeUbytovaniRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeUbytovaniRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeUbytovaniRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeUbytovaniRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeUbytovaniRcn extends GContentBase<GSeznamAdeUbytovaniRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeUbytovaniRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeUrovenNavstevyRcn extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeUrovenNavstevyRcnObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeUrovenNavstevyRcnDto> {
        ekoKonfigurace: Gordic.Adx.Interface.GAdeEkonomickaKonfiguraceDto[];
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close příznak jestli se má detail zavřít
         */
        saveData(data: Gordic.Ade.Interface.GAdeUrovenNavstevyRcnDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj objekt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možné nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
        afterCreate(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeUrovenNavstevyRcn extends GContentBase<GSeznamAdeUrovenNavstevyRcnObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeUrovenNavstevyRcnObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Metoda pro otevření detailu nutno správně doplnit všechny části primárních klíčů
         * @param data vybraná data, v případě nového záznamu je null
         * @param isNew true pokud se jedná o nový záznam
         */
        openDetail(data: any, isNew: boolean): void;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Vytvoření kompletního menubaru. Dodržte prosím pořadí akcí: otevření detailu, nový záznam, porovnávač, výběrová skupina, skupina pro akce vazby, další akce
         */
        createBaseMenuBarActions(): void;
        /**
         * Vytvoření akcí pro konextové menu, zadávejte v obdobném pořadí jako výše
         * @returns pole akcí pro kontextové menu
         */
        createContextMenu(): MenuParams[];
        /**
         * Vytvoření filtračního formuláře (není třeba řešit aktivitu)
         */
        createFilterForm(): void;
        /**
         * Uložení defaultních filtračních parametrů, které si předáváte do seznamu (slouží především pro vazební tabulky), používá při inicializaci seznamu
         * @param hardFilter defaultní filtrační parametry
         * @returns upravené filtrační parametry
         */
        userhardDefaultFilter(hardFilter: any): any;
        /**
         * Úprava dat před samotným voláním aplikační logiky
         * @param data data, která se mají odeslat
         */
        collectData(data: any): void;
        /**
         * Samotné volání dat (lze přidat i sloupec s platností)
         * @param filterData data pro filtrování
         */
        applydata(filterData: any): void;
        /**
         * Aktulizace akcí při výběru v gridu (opět není nutné řešit defaultní akce)
         * @param objArr vybraný řádek dat
         */
        selectionGridAct(objArr: IGGridSelection<any>): void;
        /**
         * Získání názvu pro zobrazení
         * @param data vybraný řádek dat
         */
        getNazev(data: any): string;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKnihaRza extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKnihaRzaObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKnihaRzaNewDto> {
        srv: GContent;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.Ade.Interface.GAdeKnihaRzaNewDto, close: boolean): void;
        private saveVazby;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getPrirazenaFunkcniMistaGroup(): IGTabGroupOptions;
        getParametryKnihyGroup(): IGTabGroupOptions;
        getPrirazenaFunkcniMistaTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getParametryKnihyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private openParametry;
        private openFunkcniMista;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKnihaRza extends GContentBase<GSeznamAdeKnihaRzaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKnihaRzaObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        private openSeznamAdeKnihaRzaFunkcniMisto;
        getGridFormat(): Gordic.Data.GridFormat;
        private openHromadnePriraditFunkcniMista;
        private openParametry;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeKnihaRzaFunkcniMisto extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeKnihaRzaFunkcniMistoObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GHromadnaOperaceAdeKnihaRzaFunkcniMisto extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class GHromadnaOperaceAdeKnihaRzaFunkcniMistobj extends Gordic.Adx.WebControls.GAdxHromadnaOperaceBase<Gordic.Ade.Interface.GAdeKnihaRzaFunkcniMistoDto> {
        ico: string;
        private povoleneFunkce;
        private faze;
        create(): void;
        private getServerFilters;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        private createValidatorsSpecial;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeKnihaRzaFunkcniMisto extends GContentBase<GSeznamAdeKnihaRzaFunkcniMistoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeKnihaRzaFunkcniMistoObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        ixp_den: string;
        subrada: number;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
        private editHromadne;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeSablonaProGenerovaniPohledavek extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeSablonaProGenerovaniPohledavekObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeSablonaProGenerovaniPohledavekReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeSablonaProGenerovaniPohledavekSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        /**
         * Úprava přístupnosti polí podle způsobu vytvoření předpisů pohledávky
         * @param typ_gen
         */
        private changeEnabledFields;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeSablonaProGenerovaniPohledavek extends GContentBase<SeznamAdeSablonaProGenerovaniPohledavekObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeSablonaProGenerovaniPohledavekObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ixs_ste;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): any;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeInstitucionalniPredpoklad extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeInstitucionalniPredpokladObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeInstitucionalniPredpokladReadDto> {
        private isPovolZdrojDok;
        private isPovolTypSpec;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeInstitucionalniPredpokladSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private openAdeInsitutPredpokladPovolenyTypDokumentu;
        private openAdeInstitutPredpokladPlan;
        private openAdeInstitutPredpokladProcesRealizace;
        getAdeInsitutPredpokladPovolenyTypDokumentuGroup(): IGTabGroupOptions;
        getAdeInstitutPredpokladPlanGroup(): IGTabGroupOptions;
        getAdeInstitutPredpokladProcesRealizaceGroup(): IGTabGroupOptions;
        getAdeInsitutPredpokladPovolenyTypDokumentuTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getAdeInstitutPredpokladPlanTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getAdeInstitutPredpokladProcesRealizaceTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeInstitucionalniPredpoklad extends GContentBase<SeznamAdeInstitucionalniPredpokladObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeInstitucionalniPredpokladObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private isPovolZdrojDok;
        private isPovolTypSpec;
        getColumnOrder(): string;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private openAdeInsitutPredpokladPovolenyTypDokumentu;
        private openAdeInstitutPredpokladPlan;
        private openAdeInstitutPredpokladProcesRealizace;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeInstitucionalniPredpokladPovolenyTypDokumentu extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeInstitucionalniPredpokladPovolenyTypDokumentuObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeInstitucionalniPredpokladPovolenyTypDokumentuReadDto> {
        openFromInstitucionalniPredpoklad: boolean;
        currentIco: string;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeInstitucionalniPredpokladPovolenyTypDokumentuSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentu extends GContentBase<SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ixs_typ;
        private ixs_tip;
        getColumnOrder(): string;
        private openFromInstitucionalniPredpoklad;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeInstitutPredpokladKnihaFunkcniMisto extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeInstitutPredpokladKnihaFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeInstitutPredpokladKnihaFunkcniMistoReadDto> {
        openFromInstitucionalniPredpoklad: boolean;
        currentIco: string;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeInstitutPredpokladKnihaFunkcniMistoSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class HromadnaOperaceAdeInstitutPredpokladKnihaFunkcniMisto extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class HromadnaOperaceAdeInstitutPredpokladKnihaFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdeInstitutPredpokladKnihaFunkcniMistoReadDto> {
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeInstitutPredpokladKnihaFunkcniMisto extends GContentBase<SeznamAdeInstitutPredpokladKnihaFunkcniMistoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeInstitutPredpokladKnihaFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ixs_pla;
        private ixs_tip;
        getCaption(): string;
        getColumnOrder(): string;
        private openFromInstitucionalniPredpoklad;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private editHromadne;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeInstitutPredpokladPlan extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeInstitutPredpokladPlanObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeInstitutPredpokladPlanReadDto> {
        openFromInstitucionalniPredpoklad: boolean;
        currentIco: string;
        isPovolDalsiNastaveni: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeInstitutPredpokladPlanSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private ValidatorSameIp;
        private openSeznamAdeInstitutPredpokladKnihaFunkcniMisto;
        getInstitutPredpokladKnihaFunkcniMistoGroup(): IGTabGroupOptions;
        getInstitutPredpokladKnihaFunkcniMistoTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Ade.WebControls {
    class HromadnaOperaceAdeInstitutPredpokladPlan extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class HromadnaOperaceAdeInstitutPredpokladPlanObj extends Gordic.Adm.WebControls.GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdeInstitutPredpokladPlanReadDto> {
        openFromKniha: boolean;
        isPovolDalsiNastaveni: boolean;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeInstitutPredpokladPlan extends GContentBase<SeznamAdeInstitutPredpokladPlanObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeInstitutPredpokladPlanObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        ixs_pla: string;
        ixs_tip: string;
        isPovolDalsiNastaveni: boolean;
        getColumnOrder(): string;
        private openFromInstitucionalniPredpoklad;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private openSeznamAdeInstitutPredpokladKnihaFunkcniMisto;
        private editHromadne;
        private hromadnaOperaceAdeInstitutPredpokladKnihaFunkcniMisto;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeInstitutPredpokladProcesRealizace extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeInstitutPredpokladProcesRealizaceObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeInstitutPredpokladProcesRealizaceReadDto> {
        openFromInstitucionalniPredpoklad: boolean;
        currentIco: string;
        isPovolDalsiNastaveni: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeInstitutPredpokladProcesRealizaceSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private ValidatorSameIp;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeInstitutPredpokladProcesRealizace extends GContentBase<SeznamAdeInstitutPredpokladProcesRealizaceObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeInstitutPredpokladProcesRealizaceObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ixs_prr;
        private ixs_tip;
        private isPovolDalsiNastaveni;
        getColumnOrder(): string;
        private openFromInstitucionalniPredpoklad;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeKnihaPla extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeKnihaPlaObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeKnihaPLAReadDto> {
        ico: string;
        rok: number;
        isPovolPrizLim: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeKnihaPLASaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private openAdeInstitutPredpokladPlan;
        private openAdeSubradaCiselAkci;
        private openAdePovoleneFunkceKnihy;
        private openAdeProcesRealizaceKniha;
        getInstitucionalniPredpokladyKnihyGroup(): IGTabGroupOptions;
        getSubradyCiselAkciGroup(): IGTabGroupOptions;
        getPovoleneFunkceKnihyGroup(): IGTabGroupOptions;
        getProcesRealizaceKnihyGroup(): IGTabGroupOptions;
        getInstitucionalniPredpokladyKnihyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getSubradyCiselAkciTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getPovoleneFunkceKnihyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getProcesRealizaceKnihaTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeKnihaPla extends GContentBase<SeznamAdeKnihaPlaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeKnihaPlaObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ico;
        private rok;
        private isPovolPrizLim;
        isPovolPrizLimFun(): boolean;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private openAdeInstitutPredpokladPlan;
        private openAdeSubradaCiselAkci;
        private openAdePovoleneFunkceKnihy;
        private openAdeProcesRealizaceKniha;
        private openHromadneAdeKnihaInstitutPredpoklad;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdePovolenaFunkcePlan extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdePovolenaFunkcePlanObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdePovFunkcePlanyReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdePovFunkcePlanySaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdePovolenaFunkcePlan extends GContentBase<SeznamAdePovolenaFunkcePlanObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdePovolenaFunkcePlanObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ixp_den;
        getColumOrder(): string;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeProcesRealizace extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeProcesRealizaceObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeProcesRealizaceReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeProcesRealizaceSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private validatorRok;
        private openAdeInstitutPredpokladProcesRealizace;
        getAdeInstitutPredpokladProcesRealizaceGroup(): IGTabGroupOptions;
        getAdeInstitutPredpokladProcesRealizaceTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeProcesRealizace extends GContentBase<SeznamAdeProcesRealizaceObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeProcesRealizaceObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        isPovolPrizLim: boolean;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private openAdeInstitutPredpokladProcesRealizace;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeProcesRealizaceKniha extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeProcesRealizaceKnihaObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeProcesRealizaceKnihaReadDto> {
        private openFromKniha;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeProcesRealizaceKnihaSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeProcesRealizaceKniha extends GContentBase<SeznamAdeProcesRealizaceKnihaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeProcesRealizaceKnihaObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ixs_pla;
        private ixs_prr;
        getColumOrder(): string;
        openFromKniha(): boolean;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeSubradaCiselAkci extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeSubradaCiselAkciObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeSubradaCiselAkciReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeSubradaCiselAkciSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeSubradaCiselAkci extends GContentBase<SeznamAdeSubradaCiselAkciObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeSubradaCiselAkciObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ixs_pla;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
    }
}
declare namespace Gordic.Ade.WebControls {
    class DetailAdeTridaAkce extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdeTridaAkceObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeTridaAkceReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeTridaAkceSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createSpecialValidator;
    }
}
declare namespace Gordic.Ade.WebControls {
    class SeznamAdeTridaAkce extends GContentBase<SeznamAdeTridaAkceObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeTridaAkceObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeOblastLimitu extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeOblastLimituObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeOblastLimituDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeOblastLimituDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getPrirazenaFunkcniMistaGroup(): IGTabGroupOptions;
        getPrirazenaFunkcniMistaTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private openOblastLimituFunkcniMisto;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeOblastLimitu extends GContentBase<GSeznamAdeOblastLimituObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeOblastLimituObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ico;
        private rok;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
        private openOblastLimituFunkcniMisto;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeOblastLimituFunkcniMisto extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeOblastLimituFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeOblastLimituFunkcniMistoDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeOblastLimituFunkcniMistoDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeOblastLimituFunkcniMisto extends GContentBase<GSeznamAdeOblastLimituFunkcniMistoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeOblastLimituFunkcniMistoObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private ico;
        private rok;
        private id_tzd;
        private id_vyb;
        private id_eds;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeSrvUcetniObdobi extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeSrvUcetniObdobiObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeSrvUcetniObdobiDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeSrvUcetniObdobiDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeSrvUcetniObdobi extends GContentBase<GSeznamAdeSrvUcetniObdobiObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeSrvUcetniObdobiObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        private rok;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GDetailAdeVydajovyBlok extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdeVydajovyBlokObj extends Gordic.Adm.WebControls.GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeVydajovyBlokDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeVydajovyBlokDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createSpecialValidator;
    }
}
declare namespace Gordic.Ade.WebControls {
    class GSeznamAdeVydajovyBlok extends GContentBase<GSeznamAdeVydajovyBlokObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdeVydajovyBlokObj extends Gordic.Adm.WebControls.GAdmSeznamBase {
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): Gordic.Adm.WebControls.IGAdmGridSxs;
    }
}
