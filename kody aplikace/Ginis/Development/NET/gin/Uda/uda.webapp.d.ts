declare namespace Gordic.Uda.WebApp {
    class Ciselniky extends GContentBase {
        private isAdx;
        private activeNameUd;
        onContentReady(): void;
    }
}
declare namespace Gordic.Uda.WebApp {
    class Dashboard extends GContentBase {
        private udaSml;
        private udaRpZobrazit;
        private udaSkupinaORJ;
        private myOrgUnit;
        private myIxsFun;
        private lastModifiedData;
        private favorites;
        private scoreData;
        private ixs_ulz;
        private dataView;
        private s_ude;
        private count;
        private isSaveuserSettings;
        private srvCnt;
        private isAdx;
        private activeNameUd;
        private path;
        private dashboardEl;
        private srv;
        onContentReady(): void;
        private init;
        private loadUserSettings;
        private createActions;
        private createDashboard;
        private createBreadcrums;
        private createStatistics;
        private reloadDashboard;
        private openPredefinedContent;
        private loadScoreBoard;
        private loadLastUpdated;
        private loadMyfavorites;
        private reloadDashboardData;
        private createFormLastModified;
        private createFormMyFavorites;
    }
}
declare namespace Gordic.Uda.WebApp {
    class DetailPriloha extends GContentBase {
        private form;
        private fileField;
        private ixs_ulo;
        private por_cislo;
        private serviceContent;
        private filesNotes;
        private tab;
        private selectedGuid;
        private currentIndex;
        private udaSouborPoznamka;
        private openFromDropzone;
        private cnt;
        savePriloha(): void;
        closeAct(): void;
        closing(): void;
        onContentReady(): void;
        private init;
        private createForm;
        private testCurrentIndexFile;
        private fileSelectedEvent;
        private fileRemovedEvent;
        private fileUploadedEvent;
    }
}
declare namespace Gordic.Uda.WebApp {
    class DetailVyveseni extends GContentBase {
        private data;
        private isSsl;
        private ixs_ulz;
        private historyCount;
        private soubory;
        private udaPor;
        private serviceContent;
        private gridRc;
        private newRecord;
        private currentFilter;
        private fileHistory;
        private currentNote;
        private zmenZaznamStav;
        private userTitle;
        private kpis;
        private loadDataSuccess;
        private udaPovolitZmenuSejmutoZruseno;
        private udaZobrazovatCisloJednaci;
        private udaEditaceJenVeStavuNavrh;
        private udaPovolenaEditaceAtributu;
        private udaSouborPoznamka;
        private udaZobrazitPid;
        private udaOpakovatVyveseni;
        private ginRadElepuud;
        private udaRpCis;
        private maxPoznamkaPopisLength;
        private opakovaneVyveseniProbehlo;
        private isKopie;
        private udaSslTextAz;
        private isEditMode;
        private isfavorite;
        private udaPovolSestava;
        private udaPovolExt;
        private interniSubjektNazev;
        private uzivatelNazev;
        private path;
        private udaKategorieDatumSejmuti;
        private ginUdeSejmdne;
        private ginUdeSejmpra;
        private ginUdePosunse;
        private ginUpsrPovol;
        private cjPovolEnable;
        private isPovolDuvodStorno;
        private gridSoubory;
        private gridHistory;
        private gridFileHistory;
        private attachmentSidebar;
        private fileFieldDiv;
        onContentReady(): void;
        ulozitZaznamMain(): void;
        closeZaznam(): void;
        closing(): JQuery.Deferred<any, any, any>;
        cancelEdit(): void;
        private cnt;
        private init;
        private loadData;
        private checkIsFavorite;
        private createDuvodStornoFlash;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createActions;
        private checkAllowEdit;
        private checkAllowSestava;
        private checkExternalLink;
        private createMenuBar;
        private updateMainActions;
        private previousAndNextAction;
        private createHeaderForm;
        private countDatumSejmuti;
        private disableEdit;
        private createStatusBar;
        private createKpis;
        private customClass;
        private seznamPriloh;
        private createTabGroups;
        private createTabs;
        private collectData;
        private ulozitZaznam;
        private ulozitAVyvesit;
        private updateMainGrid;
        private testUpdate;
        private CreateSpecialValidatorRepeat;
        private CreateSpecialValidator;
        private CreateValidationData;
        private CreateValidatorVyveseno;
        private GetStavUde;
        private GetStavPor;
        private GetVyvesenoUdePor;
        private createGridSoubory;
        private createGridFormatSoubory;
        private souborEditorUpdate;
        private downloadFile;
        private prilohaAdd;
        private prilohaUp;
        private prilohaDown;
        private prilohaRemove;
        private createGridHistory;
        private createGridFormatHistory;
        private getHistory;
        private createGridFileHistory;
        private createGridColumnFileHistory;
        private getFileHistory;
        private renderFileHistory;
        private createHtmlForm;
        private vyvesit;
        private vyvesitAct;
        private sejmout;
        private storno;
        private stornoInternal;
        private repeatVyvesit;
        private repeatVyvesitAct;
        private znovuVyvesitAct;
        private gotoParent;
        private gotoChildren;
        private checkPovolitStormo;
        private updateInsertSource;
        private saveSource;
        private deleleZdroj;
        private createSidePanels;
        private addToFavorites;
        private removeFromFavorites;
        private openDocumentPid;
        private openVyveseniUda;
        private createFileField;
        private afterCloseAttachmentDialog;
        private actDetailSkVyveseni;
    }
}
declare namespace Gordic.Uda.WebApp {
    class GPrehledZverejneniCUET extends GContentBase {
        private filter;
        private grid;
        private previewController;
        private filterData;
        private ixs_ulz;
        private ixp;
        onContentReady(): void;
        private init;
        private createFlash;
        private createFilter;
        private createGrid;
        private createSidebar;
        private createFilterForm;
        private createDefaultFilter;
        private createGridFormat;
        private setDataToGrid;
        private dataToGrid;
        private createActions;
        private createMenuBar;
        private openDetailVyveseni;
        private udaCuetSettingsForm;
    }
}
declare namespace Gordic.Uda.WebApp {
    class MyFavoritesDialog extends GContentBase {
        private ixs_ulz;
        private data;
        private grid;
        private path;
        save(): void;
        onContentReady(): void;
        private init;
        private loadData;
        private createActions;
        private createMenuBar;
        private createGrid;
        private createGridColumns;
        private removeItems;
    }
}
declare namespace Gordic.Uda.WebApp {
    class ObsahUredniDesky extends GContentBase {
        private udaSml;
        private udaRpZobrazit;
        private udaSkupinaORJ;
        private myOrgUnit;
        private myIxsFun;
        private udaSslTextAz;
        private preddefinovanyStav;
        private ixs_ulz;
        private filterPanel;
        private grid;
        private form;
        private previewController;
        private udaPovolitZmenuSejmutoZruseno;
        private currentFilter;
        private udaPor;
        private udaZobrazovatCisloJednaci;
        private udaPovolitHromadneOperace;
        private udaZobrazitPid;
        private udaPovolSaveFilter;
        private ginRadElepuud;
        private currentFactor;
        private path;
        private favorites;
        private favoritesStr;
        private sidebarCnt;
        private isSsl;
        private isAdx;
        private activeNameUd;
        private ixp;
        private stavUde;
        private stavDoc;
        private isPovolDuvodStorno;
        onContentReady(): void;
        private init;
        private loadProps;
        private createBreadcrumbs;
        private createActions;
        private createFilterPanel;
        private loadData;
        private createFilterForm;
        private createGrid;
        private createGridFormat;
        private createSpecialValidator;
        private setFilterToAktualneVyvesene;
        private createSidebar;
        private openDetail;
        private openNewDetail;
        private hromadneVyvesit;
        private hromadneSejmout;
        private hromadneStorno;
        private hromadneStornoInternal;
        private openResultHromadneOperace;
        private openResultOneItem;
        private loadFavorites;
        private addToFavorites;
        private removeFromFavorites;
        private headerCaption;
    }
}
declare namespace Gordic.Uda.WebApp {
    class PrehledKategorii extends GContentBase {
        private ixs_ulz;
        private maxCountCharsNazev;
        private maxCountCharsPoznamka;
        private povolUdeSejmutiDne;
        private ginUdeSejmdne;
        private maxValueUdeSejmdne;
        private grid;
        onContentReady(): void;
        private init;
        private createActions;
        private createGrid;
        private createGridFormat;
        private transformUdeSejmutiDne;
        private setDataToGrid;
        private newCategoryDialog;
        private saveCategory;
        private deactivateUda;
        private activateCategory;
    }
}
declare namespace Gordic.Uda.WebApp {
    class PrehledZdroje extends GContentBase {
        private ixs_ulz;
        private grid;
        onContentReady(): void;
        private init;
        private createActions;
        private createGrid;
        private createGridFormat;
        private setDataToGrid;
        private newSource;
        private saveSource;
        private deactivateSource;
        private activateSource;
    }
}
declare namespace Gordic.Uda.WebApp {
    class ResultHromadnaOperace extends GContentBase {
        private data;
        private grid;
        onContentReady(): void;
        private init;
        private updateResults;
        private createGrid;
        private createGridFormat;
    }
}
declare namespace Gordic.Uda.WebApp {
    class SslDetailVyveseni extends GContentBase {
        private ixs_ulz;
        private udaPor;
        private udaSslTextAz;
        private udaZobrazovatCisloJednaci;
        private automatickeVyveseni;
        private model;
        private prilohy;
        private aktualneVyveseni;
        private gridSoubory;
        private cnt;
        private editMode;
        private udaKategorieDatumSejmuti;
        private ginUdeSejmdne;
        private ginUdeSejmpra;
        private getCnt;
        closing(): JQuery.Deferred<any, any, any>;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private init;
        private createActions;
        private createMenuBar;
        private createCommadBar;
        private createHeaderForm;
        private countDatumSejmuti;
        private createStatusBar;
        private createTabGroups;
        private createTabs;
        private createGridSoubory;
        private createGridFormatSoubory;
        private saveNavrhOrVyveseni;
        private dokonceniNavrhu;
        private vyvesitAct;
        private resultDialog;
        private createFlash;
        private createSpecialValidator;
    }
}
declare namespace Gordic.Uda.WebApp {
    class UdaAttachments implements Gordic.Wfl.WebClient.Attachments.IGAttachmentDAO {
        constructor();
        list(parentContent: GContent, opts?: {
            ixp: string;
        }): JQuery.Promise<Gordic.Wfl.Interface.GAttachmentDto[], any, any>;
        readMainAttachment(parentContent: GContent, opts?: {
            ixp: string;
        }): JQueryPromise<Gordic.Wfl.Interface.GAttachmentDto | null>;
        insert(parentContent: GContent, opts?: {
            ixp: string;
            isFavorite: boolean;
            porCislo?: number;
            fileInfo: Gordic.Wfl.Interface.GAttachmentUploadDto;
        }): JQueryPromise<any>;
        removeAttachment(parentContent: GContent, attachment: Wfl.Interface.GAttachmentDto): JQueryPromise<any>;
        convertToPdf(parentContent: GContent, opts?: {
            ixp: string;
            guid: string;
        }): JQueryPromise<Gordic.Wfl.WebClient.GAttachmentConversionResultDto>;
        verifySignature(parentContent: GContent, opts?: {
            fileInfo: Gordic.Wfl.Interface.GAttachmentUploadDto;
        }): JQueryPromise<Gordic.Wfl.Interface.GOveritPodpisDto>;
        destroy(): void;
    }
}
declare namespace Gordic.Uda.WebApp.Forms {
    function CreateUdaItemPreviewForm(isUdaPor: boolean, udaZobrazovatCisloJednaci: boolean, udaZobrazitPid: boolean, udaFavorites: boolean, udaSslTextAz: string, udaSml: boolean, udaZobrazitDesku: boolean, name?: string): Gordic.Forms.Form;
    function CreateDetailZverejneniCuetForm(opt: {
        addUredniDeska: boolean;
    }): Gordic.Forms.Form;
}
declare namespace Gordic.Uda.WebApp.Utils {
    /**
     * Základní ikony pro stav dokumnetu na úřední desce
     * */
    enum GUdaIcons {
        vyveseno = "gi-zverejnit g-state-text g-state-success",// 10
        navrh = "gi-paper",// 0
        zruseno = "gi-paper|gi-window-close gi-bgw gi-stack-pos--rb g-state-text g-state-important",// 20
        sejmuto = "gi-paper |gi-arrow gi-rot90 gi-bgw gi-stack-pos--rb g-state-text g-state-warning",// 30
        novy = "gi-plus"
    }
    enum GUdaGridIcons {
        vyveseno = "gi-zverejnit g-state-text g-state-success",// 10
        navrh = "gi-paper",// 0
        zruseno = "gi-window-close g-state-text g-state-important",// 20
        sejmuto = "gi-arrow gi-rot90 g-state-text g-state-warning"
    }
    enum GUdaHistoryIcons {
        zruseno = "fa-times g-state-text g-state-error",
        poradi = "fa-arrows-v g-state-text g-state-info",
        novy = "fa-plus g-state-text g-state-info",
        poznamka = "fa-pencil g-state-text g-state-info"
    }
    enum Operation {
        sejmuti = 0,
        zruseni = 1,
        vyveseni = 2
    }
    class GFavoriteDto {
        ixs_ulo: string | undefined | null;
        por_cislo: number | undefined | null;
        ixs_ulz: string | undefined | null;
    }
    /**
     * Získání state icon do status baru
     * @param value - hodnota
     */
    function StateIcon(value: number, isNew?: boolean): string;
    /**
    * Získání state icon gridu nebo itemtemplate
    * @param value - hodnota
    */
    function StateIconSmall(value: number, isNew?: boolean): string;
    /**
     * Ikona stavu dokumentu na úřední desce
     * @param value hodnota stavu
     */
    function StateIconSpecial(value: number, size?: number): string;
    function FavoriteIcon(): string;
    /**
     * Hodnoty pro políčko Umístění (viditelné pouze tehdy, když je ve web.configu povolená integrace s portálem veřejné správy)
     * */
    function vyvesitNaValues(): {
        value: number;
        label: string;
    }[];
    /**
     * StateToHtml
     * @param value hodnota stav_ude nebo stav_por
     */
    function StateToHtml(value: number): JQuery<HTMLElement>;
    /**
     * Název stavu do HTML
     * @param value číselná hodnota stavu
     * @param size
     */
    function StateTextHtml(value: number, size?: number): string;
    /**
     * Název stavu klasický string
     * @param value číselná hodnota stavu
     */
    function StateText(value: number, isNew?: boolean): string;
    function UdaKpiNumber(withDescription: boolean): string;
    function UdaKpiIcon(icon: string, withDescription: boolean): string;
    function UdaDashboard(obj: Gordic.Uda.Interface.GUredniDeskaZaznamDto): string;
    function SUdaStates(withAll?: boolean): any[];
    function UdaDashboardSettings(): Gordic.Forms.Form;
    function GetNazevUD(isAdx: boolean, udName: string): string;
    function CreateSpecialValidator(formElement: JQuery<HTMLElement>): Gordic.Validators.Validator<Gordic.Validators.ValidatorOptions>;
    function CreateValidationData(): Gordic.Validators.Validator<Gordic.Validators.ValidatorOptions>;
    function CheckDatumVyveseni(date: Date | null, formNameOrClass: string, fieldDoName: string, fieldOdName: string, addField: string | null, fieldPocetDni: string | null, ginUdeSejmpra: boolean, content: Gordic.Uda.WebApp.DetailVyveseni | Gordic.Uda.WebApp.SslDetailVyveseni): void;
    function CountDateDiff(formNameOrClass: string, datOdField: string, datDoField: string, addField: string, pocetDniField: string, content: Gordic.Uda.WebApp.DetailVyveseni | Gordic.Uda.WebApp.SslDetailVyveseni): void;
    function OpenZverejneniCuetIxp(ixp: string): void;
}
