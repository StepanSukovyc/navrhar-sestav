declare namespace Gordic.Adm.WebControls {
    /** interface - Rozšířené konfigurační parametry obsahující informace např. o databázi, konfiguraci zákazníka atd..  */
    interface IGSeznamBaseExtensions {
        dataListDescription: Gordic.General.ApplicationInterface.GDataListDescription;
    }
    /**
     * Třída SeznamBase
     *
     * @author FFIALA
     * @since 482.1.0.119
     */
    class SeznamBase extends GContentBase<IGSeznamBaseExtensions> {
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
        row: any[];
        /** element filtru */
        filter: JQuery<HTMLElement>;
        /** formulář pro přidávání políček filtru */
        filterForm: Gordic.Forms.Form;
        /** zda je content otev5en v tabu */
        isTab: boolean;
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
        /**
         * Funkce pro zjednodušené zjištění property
         * @param filterObj
         * @param name
         * @param property
         */
        static filterContains(filterObj: any, name: string, property?: string): any;
        /** dynamicky vytvořit stringu s GridSearchColumns na základě dataListDescription načteního ze serveru */
        static createGridSearchColumnsByDataListDescription(that: GContentType<SeznamBase>): string[];
        /** dynamicky vytvořit formát seznamu na základě dataListDescription načteního ze serveru - definice sloupců, napdpisů, šířek atd... */
        static createGridFormatByDataListDescription(that: GContentType<SeznamBase>): Gordic.Data.GridFormat;
        /** vytvořit formulář filtru - panel */
        static createFilterBase(that: GContentType<SeznamBase>, a_form: Forms.Form, a_autoLoad?: boolean, apply_action?: ((that: any, ev: any, ctx: any) => any) | null, filterOptions?: Omit<IGFilterPanelOptions, "forms"> | null): JQuery<HTMLElement>;
        /** vytvořit formulář filtru - vytvoří tam filtrační políčka */
        static createFilterFormBase(that: GContentType<SeznamBase>): Forms.Form;
        static createWarningNot(that: GContentType<SeznamBase>, settings: IGAdmMessageSettings): void;
    }
}
declare namespace Gordic.Adm.WebControls.GAdmUtils {
    /**
     * Návratový objekt z createGridFromResponseWithMeta()
     * */
    class CreateGridFromResponse<TRow = any> {
        view: Gordic.Data.View<TRow>;
        format: Gordic.Data.GridFormat<any>;
        search: any[];
    }
    /**
     * Funkce vytvoří z response objektu od serverové ISL funkce Isl.ListWithMeta() objekty potřebné pro posatavení GridView na formuláři. Vrací objekt response, který
     * obsahuje odpovídající objekty:
     *  view
     *  format
     *  search
     * @param a_response
     */
    function createGridFromResponseWithMeta<TRow = any, TMeta extends Gordic.General.ApplicationInterface.GDataListDescription = Gordic.General.ApplicationInterface.GDataListDescription>(a_response: Gordic.Isl.GServiceListResponseWithMeta<TRow, TMeta>): CreateGridFromResponse;
    /**
     * pomocná funkce pro vytvoření tabulky podle definice metadat získaných ze serveru společně s daty gridu
     * - přepsána z JS, poté co zahodíme tu v javascriptu, můžeme použít pouze tuto (a tuto taky můžeme zoptimalizovat)
     *
     * @param {any} aData
     * @param {any} maxCollChars
     */
    function createGrid(aData: any, maxCollChars?: any): any;
}
/** Společný soubor pro speciální validátory pro různá políčka v administraci */
declare namespace Gordic.Adm.WebControls.GAdmUtilsValidators {
    /**
     * Pouzito: DetailAdeKnihaPLA
     * */
    function SpecialValidatorSchvalovaciRole(): Gordic.Validators.Validator<Gordic.Validators.ValidatorOptions>;
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdeInstitucionalniPredpokladResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdeInstitucionalniPredpokladReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdeInstitucionalniPredpokladReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdeInstitucionalniPredpoklad extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - ixs_tip */
        private ixs_tip;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        private allowTypDocs;
        private isPovolZdrojDok;
        private isPovolTypSpec;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
        private openSeznamAdeInstitucionalniPredpokladPovolenyTypDokumentu;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdeInstitucionalniPredpokladDlg(parentContent: GContent, opt: {
        /** ixs_tip */
        ixs_tip: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdeInstitucionalniPredpokladDlg(parentContent: GContent, opt: {
        /** ixs_tip */
        ixs_tip: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdeInstitucionalniPredpoklad extends GContentBase<SeznamAdeInstitucionalniPredpokladDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        private createMenuBar;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
        private openSeznamAdeInstitucionalniPredpokladPovolenyTypDokumentu;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdeInstitucionalniPredpokladDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdeInstitucionalniPredpokladDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - ixs_tip */
        ixs_tip: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdeInstitucionalniPredpokladListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdeInstitucionalniPredpokladDesigner>, ixs_tip: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdeInstitucionalniPredpokladDesigner>, ixs_tip: string): Forms.Form;
        static applyAction(that: GContentType<SeznamAdeInstitucionalniPredpokladDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdeInstitucionalniPredpokladDesignerInit
         *
         * @param {GContentType<SeznamAdeInstitucionalniPredpokladDesigner>} that
         */
        static SeznamAdeInstitucionalniPredpokladDesignerInit(that: GContentType<SeznamAdeInstitucionalniPredpokladDesigner>, ixs_tip: string, withFilterPanel: boolean): void;
        static LoadData(that: GContentType<SeznamAdeInstitucionalniPredpokladDesigner>, ixs_tip: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdeInstitucionalniPredpokladPovolenyTypDokumentuResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdeInstitucionalniPredpokladPovolenyTypDokumentuReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdeInstitucionalniPredpokladPovolenyTypDokumentuReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdeInstitucionalniPredpokladPovolenyTypDokumentu extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - ixs_typ */
        private ixs_typ;
        /** PK - ixs_tip */
        private ixs_tip;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdeInstitucionalniPredpokladPovolenyTypDokumentuDlg(parentContent: GContent, opt: {
        /** ixs_typ */
        ixs_typ: string | null;
        /** ixs_tip */
        ixs_tip: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDlg(parentContent: GContent, opt: {
        /** ixs_typ */
        ixs_typ: string | null;
        /** ixs_tip */
        ixs_tip: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentu extends GContentBase<SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * createMenuButtons
         */
        private createMenuButtons;
        /**
         * vytvo�it menu
         */
        private createMenuBar;
        private setMenuButtons;
        private novyZaznamButton;
        /**
         * detail button
         */
        private detailButton;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - ixs_typ */
        ixs_typ: string;
        /** PK - ixs_tip */
        ixs_tip: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdeInstitucionalniPredpokladPovolenyTypDokumentuListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDesigner>, ixs_typ: string, ixs_tip: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDesigner>, ixs_typ: string, ixs_tip: string): Forms.Form;
        static applyAction(that: GContentType<SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDesignerInit
         *
         * @param {GContentType<SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDesigner>} that
         */
        static SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDesignerInit(that: GContentType<SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDesigner>, ixs_typ: string, ixs_tip: string): void;
        static LoadData(that: GContentType<SeznamAdeInstitucionalniPredpokladPovolenyTypDokumentuDesigner>, ixs_typ: string, ixs_tip: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdeInstitutPredpokladPlanResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdeInstitutPredpokladPlanReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdeInstitutPredpokladPlanReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdeInstitutPredpokladPlan extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - ixs_pla */
        private ixs_pla;
        /** PK - ixs_tip */
        private ixs_tip;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        private isPovolDalsiNastaveni;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
        private ValidatorSameIp;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdeInstitutPredpokladPlanDlg(parentContent: GContent, opt: {
        /** ixs_pla */
        ixs_pla: string | null;
        /** ixs_tip */
        ixs_tip: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdeInstitutPredpokladPlanDlg(parentContent: GContent, opt: {
        /** ixs_pla */
        ixs_pla: string | null;
        /** ixs_tip */
        ixs_tip: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdeInstitutPredpokladPlan extends GContentBase<SeznamAdeInstitutPredpokladPlanDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * vytvo�it menu
         */
        private createMenuBar;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdeInstitutPredpokladPlanDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdeInstitutPredpokladPlanDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - ixs_pla */
        ixs_pla: string;
        /** PK - ixs_tip */
        ixs_tip: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdeInstitutPredpokladPlanListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdeInstitutPredpokladPlanDesigner>, ixs_pla: string, ixs_tip: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdeInstitutPredpokladPlanDesigner>, ixs_pla: string, ixs_tip: string): Forms.Form;
        static applyAction(that: GContentType<SeznamAdeInstitutPredpokladPlanDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdeInstitutPredpokladPlanDesignerInit
         *
         * @param {GContentType<SeznamAdeInstitutPredpokladPlanDesigner>} that
         */
        static SeznamAdeInstitutPredpokladPlanDesignerInit(that: GContentType<SeznamAdeInstitutPredpokladPlanDesigner>, ixs_pla: string, ixs_tip: string): void;
        static LoadData(that: GContentType<SeznamAdeInstitutPredpokladPlanDesigner>, ixs_pla: string, ixs_tip: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdeInstitutPredpokladProcesRealizaceResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdeInstitutPredpokladProcesRealizaceReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdeInstitutPredpokladProcesRealizaceReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdeInstitutPredpokladProcesRealizace extends GContentBase<DetailBase> {
        private gridRemoteControl;
        /** PK - ixs_prr */
        private ixs_prr;
        /** PK - ixs_tip */
        private ixs_tip;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        private isPovolDalsiNastaveni;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private ValidatorSameIp;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdeInstitutPredpokladProcesRealizaceDlg(parentContent: GContent, opt: {
        /** ixs_prr */
        ixs_prr: string | null;
        /** ixs_tip */
        ixs_tip: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdeInstitutPredpokladProcesRealizaceDlg(parentContent: GContent, opt: {
        /** ixs_prr */
        ixs_prr: string | null;
        /** ixs_tip */
        ixs_tip: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdeInstitutPredpokladProcesRealizace extends GContentBase<SeznamAdeInstitutPredpokladProcesRealizaceDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * vytvo�it menu
         */
        private createMenuBar;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdeInstitutPredpokladProcesRealizaceDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdeInstitutPredpokladProcesRealizaceDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - ixs_prr */
        ixs_prr: string;
        /** PK - ixs_tip */
        ixs_tip: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdeInstitutPredpokladProcesRealizaceListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdeInstitutPredpokladProcesRealizaceDesigner>, ixs_prr: string, ixs_tip: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdeInstitutPredpokladProcesRealizaceDesigner>, ixs_prr: string, ixs_tip: string): Forms.Form;
        static applyAction(that: GContentType<SeznamAdeInstitutPredpokladProcesRealizaceDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdeInstitutPredpokladProcesRealizaceDesignerInit
         *
         * @param {GContentType<SeznamAdeInstitutPredpokladProcesRealizaceDesigner>} that
         */
        static SeznamAdeInstitutPredpokladProcesRealizaceDesignerInit(that: GContentType<SeznamAdeInstitutPredpokladProcesRealizaceDesigner>, ixs_prr: string, ixs_tip: string): void;
        static LoadData(that: GContentType<SeznamAdeInstitutPredpokladProcesRealizaceDesigner>, ixs_prr: string, ixs_tip: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdeKnihaPLAResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdeKnihaPLAReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdeKnihaPLAReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdeKnihaPLA extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - ixs_pla */
        private ixs_pla;
        private rok;
        private ico;
        private isPovolPrizLim;
        private isPovolVlastnosti;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
        private openSeznamAdeInstitutPredpokladPlan;
        private openSeznamAdePovFunkcePlany;
        private openSeznamAdeSubradaCiselAkci;
        private openSeznamAdeProcesRealizaceKniha;
        private openSeznamAdmVlastnostObecnyObjekt;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdeKnihaPLADlg(parentContent: GContent, opt: {
        /** ixs_pla */
        ixs_pla: string | null;
        /** rok */
        rok: number | null;
        /** ico */
        ico: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdeKnihaPLADlg(parentContent: GContent, opt: {
        /** ixs_pla */
        ixs_pla: string | null;
        /** rok */
        rok: number | null;
        /** ico */
        ico: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdeKnihaPLA extends GContentBase<SeznamAdeKnihaPLADesigner> {
        isPovolVlastnosti: boolean;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        private createMenuBar;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
        private openSeznamAdeInstitutPredpokladPlan;
        private openSeznamAdePovFunkcePlany;
        private openSeznamAdeSubradaCiselAkci;
        private openSeznamAdeProcesRealizaceKniha;
        private openSeznamAdmVlastnostTypObjektu;
        private openSeznamAdmVlastnostObecnyObjekt;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdeKnihaPLADesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdeKnihaPLADesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - ixs_pla */
        ixs_pla: string;
        rok: number;
        ico: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdeKnihaPLAListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdeKnihaPLADesigner>, ixs_pla: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdeKnihaPLADesigner>, ixs_pla: string): Forms.Form;
        static applyAction(that: GContentType<SeznamAdeKnihaPLADesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdeKnihaPLADesignerInit
         *
         * @param {GContentType<SeznamAdeKnihaPLADesigner>} that
         */
        static SeznamAdeKnihaPLADesignerInit(that: GContentType<SeznamAdeKnihaPLADesigner>, ixs_pla: string, rok: number, ico: string, withFilterPanel: boolean): void;
        static LoadData(that: GContentType<SeznamAdeKnihaPLADesigner>, ixs_pla: string, rok: number, ico: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdePovFunkcePlanyResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdePovFunkcePlanyReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdePovFunkcePlanyReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdePovFunkcePlany extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - ixs_fun */
        private ixs_fun;
        /** PK - ixp_den */
        private ixp_den;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private createSpecialValidator;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdePovFunkcePlanyDlg(parentContent: GContent, opt: {
        /** ixs_fun */
        ixs_fun: string | null;
        /** ixp_den */
        ixp_den: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdePovFunkcePlanyDlg(parentContent: GContent, opt: {
        /** ixs_fun */
        ixs_fun: string | null;
        /** ixp_den */
        ixp_den: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdePovFunkcePlany extends GContentBase<SeznamAdePovFunkcePlanyDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * vytvo�it menu
         */
        private createMenuBar;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdePovFunkcePlanyDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdePovFunkcePlanyDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - ixs_fun */
        ixs_fun: string;
        /** PK - ixp_den */
        ixp_den: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdePovFunkcePlanyListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdePovFunkcePlanyDesigner>, ixs_fun: string, ixp_den: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdePovFunkcePlanyDesigner>, ixs_fun: string, ixp_den: string): Forms.Form;
        static applyAction(that: GContentType<SeznamAdePovFunkcePlanyDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdePovFunkcePlanyDesignerInit
         *
         * @param {GContentType<SeznamAdePovFunkcePlanyDesigner>} that
         */
        static SeznamAdePovFunkcePlanyDesignerInit(that: GContentType<SeznamAdePovFunkcePlanyDesigner>, ixs_fun: string, ixp_den: string): void;
        static LoadData(that: GContentType<SeznamAdePovFunkcePlanyDesigner>, ixs_fun: string, ixp_den: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdeProcesRealizaceResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdeProcesRealizaceReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdeProcesRealizaceReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdeProcesRealizace extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - ixs_prr */
        private ixs_prr;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private validatorRok;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** odstranit v�echny vlastn� t��dy ze statusbaru */
        private removeAllCustomClassOnStatusBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
        private openSeznamAdeInstitutPredpokladPlan;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdeProcesRealizaceDlg(parentContent: GContent, opt: {
        /** ixs_prr */
        ixs_prr: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdeProcesRealizaceDlg(parentContent: GContent, opt: {
        /** ixs_prr */
        ixs_prr: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdeProcesRealizace extends GContentBase<SeznamAdeProcesRealizaceDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        private createMenuBar;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
        private openSeznamAdeInstitutPredpokladProcesRealizace;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdeProcesRealizaceDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdeProcesRealizaceDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - ixs_prr */
        ixs_prr: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdeProcesRealizaceListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdeProcesRealizaceDesigner>, ixs_prr: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdeProcesRealizaceDesigner>, ixs_prr: string): Forms.Form;
        static applyAction(that: GContentType<SeznamAdeProcesRealizaceDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdeProcesRealizaceDesignerInit
         *
         * @param {GContentType<SeznamAdeProcesRealizaceDesigner>} that
         */
        static SeznamAdeProcesRealizaceDesignerInit(that: GContentType<SeznamAdeProcesRealizaceDesigner>, ixs_prr: string, withFilterPanel: boolean): void;
        static LoadData(that: GContentType<SeznamAdeProcesRealizaceDesigner>, ixs_prr: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdeProcesRealizaceKnihaResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdeProcesRealizaceKnihaReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdeProcesRealizaceKnihaReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdeProcesRealizaceKniha extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - ixs_prr */
        private ixs_prr;
        /** PK - ixs_pla */
        private ixs_pla;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdeProcesRealizaceKnihaDlg(parentContent: GContent, opt: {
        /** ixs_prr */
        ixs_prr: string | null;
        /** ixs_pla */
        ixs_pla: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdeProcesRealizaceKnihaDlg(parentContent: GContent, opt: {
        /** ixs_prr */
        ixs_prr: string | null;
        /** ixs_pla */
        ixs_pla: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdeProcesRealizaceKniha extends GContentBase<SeznamAdeProcesRealizaceKnihaDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * vytvo�it menu
         */
        private createMenuBar;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdeProcesRealizaceKnihaDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdeProcesRealizaceKnihaDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - ixs_prr */
        ixs_prr: string;
        /** PK - ixs_pla */
        ixs_pla: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdeProcesRealizaceKnihaListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdeProcesRealizaceKnihaDesigner>, ixs_prr: string, ixs_pla: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdeProcesRealizaceKnihaDesigner>, ixs_prr: string, ixs_pla: string): Forms.Form;
        static applyAction(that: GContentType<SeznamAdeProcesRealizaceKnihaDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdeProcesRealizaceKnihaDesignerInit
         *
         * @param {GContentType<SeznamAdeProcesRealizaceKnihaDesigner>} that
         */
        static SeznamAdeProcesRealizaceKnihaDesignerInit(that: GContentType<SeznamAdeProcesRealizaceKnihaDesigner>, ixs_prr: string, ixs_pla: string): void;
        static LoadData(that: GContentType<SeznamAdeProcesRealizaceKnihaDesigner>, ixs_prr: string, ixs_pla: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdeSubradaCiselAkciResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdeSubradaCiselAkciReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdeSubradaCiselAkciReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdeSubradaCiselAkci extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - rok */
        private rok;
        /** PK - ico */
        private ico;
        /** PK - ixs_pla */
        private ixs_pla;
        /** PK - subrada */
        private subrada;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdeSubradaCiselAkciDlg(parentContent: GContent, opt: {
        /** rok */
        rok: number | null;
        /** ico */
        ico: string | null;
        /** ixs_pla */
        ixs_pla: string | null;
        /** subrada */
        subrada: number | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdeSubradaCiselAkciDlg(parentContent: GContent, opt: {
        /** rok */
        rok: number | null;
        /** ico */
        ico: string | null;
        /** ixs_pla */
        ixs_pla: string | null;
        /** subrada */
        subrada: number | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdeSubradaCiselAkci extends GContentBase<SeznamAdeSubradaCiselAkciDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * vytvo�it menu
         */
        private createMenuBar;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdeSubradaCiselAkciDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdeSubradaCiselAkciDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - rok */
        rok: number;
        /** PK - ico */
        ico: string;
        /** PK - ixs_pla */
        ixs_pla: string;
        /** PK - subrada */
        subrada: number;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdeSubradaCiselAkciListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdeSubradaCiselAkciDesigner>, rok: number, ico: string, ixs_pla: string, subrada: number): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdeSubradaCiselAkciDesigner>, rok: number, ico: string, ixs_pla: string, subrada: number): Forms.Form;
        static applyAction(that: GContentType<SeznamAdeSubradaCiselAkciDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdeSubradaCiselAkciDesignerInit
         *
         * @param {GContentType<SeznamAdeSubradaCiselAkciDesigner>} that
         */
        static SeznamAdeSubradaCiselAkciDesignerInit(that: GContentType<SeznamAdeSubradaCiselAkciDesigner>, rok: number, ico: string, ixs_pla: string, subrada: number): void;
        static LoadData(that: GContentType<SeznamAdeSubradaCiselAkciDesigner>, rok: number, ico: string, ixs_pla: string, subrada: number): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    abstract class GAdmBase {
        detailCnt: JQuery<HTMLElement>;
    }
}
declare namespace Gordic.Adm.WebControls {
    abstract class GAdmDetailBase<T> extends GAdmBase {
        options: IGAdmDetailOptions;
        cnt: GContent & GAdmDetailBase<T>;
        isAuthService: boolean;
        data: T;
        metadata: any;
        editPermissionObj: {
            permission: boolean;
            reason: string;
        };
        createPermissionObj: {
            permission: boolean;
            reason: string;
        };
        form: Gordic.Forms.Form;
        editMode: boolean;
        sxs: string;
        objType: number;
        auditPristupu: Gordic.Adm.WebControls.AdmAuditPristupuNew;
        poznamky: Gordic.Adm.WebControls.AdmPoznamkyNew;
        icoBase: string;
        openDialog: boolean;
        vazby: IGAdmCopyOptions[];
        vazbyObj: {
            bussinessObj: string;
            canCreate: boolean;
            check: boolean;
            caption: string;
            columnOrder: string;
            columnsBeforeSave: string[];
            metadata: Gordic.General.ApplicationInterface.GDataListDescription;
            data: any[];
            updateGridFormat: ((column: GGridColumn<any>) => GGridColumn<any>) | undefined;
        }[];
        copy: boolean;
        currentUnits: any;
        isPovolVlastnosti: boolean;
        pkFields: string[];
        private globalSettingLastDetails;
        createBase(this: GContent & GAdmDetailBase<T>, options: IGAdmDetailOptions): void;
        abstract createTitle(): string;
        abstract createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        abstract createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        abstract createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        abstract createForm(): any;
        abstract setEditMode(editMode: boolean): any;
        abstract saveData(data: any, close: boolean): JQueryPromise<any> | null | void;
        abstract updateGrid(filter: any, grid: any): any;
        abstract reloadData(filterObj: any, dataObj: any): any;
        abstract setSxsDetail(): string;
        abstract textPopis(): string | undefined | null;
        abstract create(): any;
        private updateLastViewed;
        private deepEqual;
        getMetadata(): any;
        private checkSavePermissions;
        private checkGridAccess;
        private addDefaultValues;
        private initContent;
        private createBaseActions;
        createShareActions(): MenuParams;
        private openDetailOnNewTab;
        setEditModeBase(editMode: boolean): void;
        protected saveBase(close: boolean): void;
        updateAfterSave(close: boolean): void;
        protected hideAllFlash(): void;
        private nextAndPreviousAction;
        getMetadataDetailPkFields(): any;
        getMetadataDetailPkFieldsFromRow(data: any): any;
        pendingAction(actionName: string, success?: boolean): void;
        closeAction(closeAfterSave?: boolean): JQuery.Deferred<any, any, any>;
        updateGridBase(): any;
        reloadDataBase(openDetail?: boolean, loaddataObj?: any, delay?: boolean): void;
        openDetailOrModalWindow(contentCs: string, filterObj: any, dataObj: any, dialogWidth?: number, dialogHeight?: number): void;
        checkErrors(errors: any[]): void;
        showBaseError(message?: string): void;
        showSuccessSave(close: boolean, message?: string): void;
        finishBuilder(): void;
        createFormComplet(): Gordic.Forms.Form;
        createStatusBar(): MenuParams[];
        createFlagNemenne(): GFieldFlagOptions;
        getAuditPristupu(): Gordic.Gin.DetailBuilder.GDetailBuilderSbpanelOptionsId;
        getAuditPristupuTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getAuditPristupuGroup(): IGTabGroupOptions;
        getPoznamky(): Gordic.Gin.DetailBuilder.GDetailBuilderSbpanelOptionsId;
        getValidatorDatOdDo(povolNull?: boolean, customClass?: string): Gordic.Validators.Base;
        MakeField<T = any>(a_name: string, ...extendedOptions: GControlBoxOptions<T | T[]>[] | GNumberBoxOptions<T | T[]>[] | GStringBoxOptions[]): Forms.Form;
        MakeSelectField<T = any>(a_name: string, fieldOptions: GSelectBoxOptions<T>, extendedOptions?: GSelectBoxOptions<T, T | T[]>, hint?: string): Gordic.Forms.Form;
        MakeBoolField<T = any>(a_name: string, ...extendedOptions: GControlBoxOptions<T | T[]>[]): Gordic.Forms.Form;
        MakeBool10Field<T = any>(a_name: string, ...extendedOptions: GControlBoxOptions<T | T[]>[]): Gordic.Forms.Form;
        MakeFormField<T = any>(a_name: string, fieldOptions: GFormBoxOptions<T>): Gordic.Forms.Form;
        MakeFields(a_name: string): Gordic.Forms.Form;
        MakeSection(a_name: string): Gordic.Forms.Form;
        MakeRow(a_name: string): Gordic.Forms.Form;
        HideField(a_name: string): void;
        ShowField(a_name: string): void;
        private openSeznamAdmVlastnostObecnyObjekt;
        checkValidatorOdDo(): Gordic.Validators.Base;
        returnValueFunction(): any;
        /**
         * Funkce, která zastřešuje všechny úkony, které je nutné udělat po změně délky evidenčního čísla
         * @param options parametry
         * @returns
         */
        changeEventLenAc(options: {
            acCisloDoFieldName: string;
            acCisloOdFieldName: string;
            lenAcFieldName: string;
            minValue: number;
            maxValue: number;
            value: any;
        }): void;
        getAllAktivita(): number[];
        private createCisloOdDoValidator;
        private acCisloDoValidator;
        private createMaxValue;
        rokValidator(): Gordic.Validators.Base;
        acCisloOdChangeEvent(options: {
            errors: Gordic.Validators.Error[];
            maxValueFieldName: string;
            value: any;
        }): void;
        createPasswordField(options: {
            name: string;
            form: Gordic.Forms.Form;
            popis: string;
            modelFunction: (op: any, dto: any, opt: any, field: any) => void;
            confirmPasswordTwoTimes: boolean;
            onlyPassword: boolean;
            validators?: Gordic.Validators.Base[];
            disabledField?: boolean;
            formName?: string;
        }): void;
        createSamePasswordValidator(): Gordic.Validators.Base;
        getDataFromPasswordForm(ev: any, ctx: any, fieldName: any, formName: any): void;
        createIconAktivita(aktivita: number): string;
        createExtIdentifikaceField(): void;
        private createFormExtIdent;
        private createSpecialValidatorExtIdent;
        getAdmVlastnostObecnyObjektTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getAdmVlastnostObecnyObjektGroup(): IGTabGroupOptions;
        createFieldVelikost(options: {
            fieldName: string;
            initialValueNumber: JsonDecimal | number;
            initialValueUnit: number;
            form: Gordic.Forms.Form;
            caption: string;
            hint: string;
        }): void;
        createFieldsAktivita(priz_new: boolean, addPlatnost?: boolean, platnostType?: "date" | "datetime"): void;
        private copyBase;
        private manageVazby;
        private createVazby;
        private zdedeneVazbyGrid;
        saveVazbyBool(): boolean;
        updateVazbyBeforeSave(updateObj: (bussinessObj: string, obj: any) => any): any;
    }
}
declare namespace Gordic.Adm.WebControls {
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
    class DetailAdeTridaAkceObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdeTridaAkceReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdeTridaAkceSaveDto, close: boolean): any;
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
declare namespace Gordic.Adm.WebControls {
    abstract class GAdmSeznamBase extends GAdmBase {
        /** Je sutorizační služba */
        isAuthService: boolean;
        /**  Přidané informace pro export obejtků */
        exportDataInfo: Gordic.Adx.Interface.GAdxExportInfoDto;
        /** Hlavní grid pro zobrazení dat */
        grid: JQuery<HTMLElement>;
        /** Content na který se odkazuji */
        cnt: GContent & GAdmSeznamBase;
        /** DataListDescriptor */
        dataListDescription: Gordic.General.ApplicationInterface.GDataListDescription;
        /** Aktuálně vybraný řádek */
        row: any;
        /** Základní nastavení seznamu */
        options: IGAdmSeznamOptions;
        /** Filtrační formulář možno rozšířit o další políčka */
        filterForm: Gordic.Forms.Form;
        /** Element pro filter */
        filter: JQuery<HTMLElement>;
        /** View, které obsahuje data */
        view: Gordic.Data.View;
        /** Sidebar */
        sidebar: JQuery<HTMLElement>;
        /** Element pro náhled */
        panelElement: JQuery<HTMLElement>;
        /** Grodformat pro grid i pro náhled */
        gridformat: Gordic.Data.GridFormat;
        /** Filtrační data */
        filterData: any;
        /** Otevření z tabu */
        tabOpen: boolean;
        comparatorCnt: JQuery<HTMLElement>;
        comparator: JQuery<HTMLElement> | null;
        comparatorBadge: GObservableObject<any>;
        comparatorItems: any[];
        testDivComparator: JQuery<HTMLElement>;
        icoBase: string;
        isPovolVlastnosti: boolean;
        private zobrazovatCisloObjektuKey;
        private zobrazovatPrazdnySeznamKey;
        private pocetZaznamuKey;
        serviceCnt: GContent;
        openEmptyParams: {
            openEmpty: boolean;
            itemCount: number;
        };
        /**
         * Metoda pro otevření detailu
         * @param isNew true - nový záznam, false - editace
         */
        abstract openDetail(data: any | null, isNew: boolean, type?: number): void;
        /**
         * Přidání do filtračního formuláře uživatelká políčka (výběr aktivity přidán automaticky)
         */
        abstract createFilterForm(): void;
        /**
         * Nastavení "tvrdého filtru" po načtení seznamu (aktivita dodána automaticky)
         * @param hardfilter objekt pro tvrdý filter
         */
        abstract userhardDefaultFilter(hardfilter: any): any;
        /**
         * samotná úprava dat před aplikováním filteru přidání pevných filterů...
         * @param data objekt filteru
         */
        abstract collectData(data: any): void;
        /**
         * Aplikování filteru na data
         * @param filterData filtrační data
         */
        abstract applydata(filterData: any): void;
        /**
         * Vytvoření akcí uživatelských (nejčastěji vazební akce)
         * */
        abstract createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Kontextové menu nad gridem
         * */
        abstract createContextMenu(): MenuParams[];
        /**
         * Akce při výběru
         * @param obj vybrané objekty
         */
        abstract selectionGridAct(obj: IGGridSelection<any>): void;
        /**
         * Získání sxs pro zobrazení navázaných vlastností
         * */
        abstract getSxs(data: any): IGAdmGridSxs;
        /**
         * Akce při vytvoření objektu (nelze použít konstruktor)
         * */
        abstract create(): any;
        /**
         * Vytvoření create base
         * @param this
         * @param options
         */
        createBase(this: GContent & GAdmSeznamBase, options: IGAdmSeznamOptions): void;
        private getServiceCntBase;
        private adddefaultValues;
        private openEmptyListParams;
        private createBaseActions;
        createShareMenuBarActions(contextMenu?: boolean): MenuParams[];
        private createContentCaptionBase;
        createContentCaption(): string;
        openDialogOrModalWindow(cntInitializer: any, inputParams: any, dialogWidth?: number, dialogHeight?: number): JQuery;
        private createTitle;
        private createBaseFilterForm;
        private convertAktivita;
        private createSidebar;
        createUserPanels(): GSideBarPanelOptions[];
        private createComparator;
        private createPanel;
        private refreshComparator;
        private addToBalance;
        private refreshPanel;
        openDetailBase(newRecord: boolean, ctx: any): any;
        /**
         * Přidání sloupce pro platnost (pokud mají data obsahovat dat_od dat_do, lze použít tento uživatelský sloupec)
         * @param data view z ISL
         */
        setPlatnostColumn(data: Data.View, type?: "date" | "datetime"): void;
        /**
         * Vytvoření hlavního gridu
         * */
        createGrid(parentEl?: JQuery<HTMLElement> | null): void;
        rowsCheckEnabledFunction(row: MetaRow<any>): boolean;
        rowsEnabledFunction(row: MetaRow<any>): boolean;
        getDataCount(): JQueryPromise<Gordic.AdmIsl.Interface.GAdmCountData> | null;
        profileChange(profileSetting: {
            oldProfile: GridProfile<any>;
            profile: GridProfile<any>;
        }): void;
        /**
         * Mo6nost upravit gridFormat (odebrat nepotřebné sloupce nebo je aktualizovat)
         * */
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
        /**
         * Vytvoření filteru
         * @param parentEl
         */
        createFilter(parentEl?: JQuery<HTMLElement> | null): void;
        private checkFilterOnlyAktivita;
        private actFlashFilterNon;
        private openSeznamAdmVlastnostTypObjektu;
        private openSeznamAdmVlastnostObecnyObjekt;
        private openDialogVyberovaSkupina;
        private openBaseDialogHromadneVlastnosti;
        private openSeznamOnNewTab;
        private openDetailOnNewTab;
        getAktivitaTxt(aktivita: number): string;
        findColumnIndexByName(name: string): number;
        settingGroupingColumn(name: string, open: boolean): void;
        private zrusitZaznamy;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        private newHromadne;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): number | null;
        /**
         * Kontrola, zda se mohou načíst data
         */
        checkBeforeApply(filterData: any): boolean;
        saveDatatoJson(): void;
        private importDataFromJson;
        private saveData;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdeTridaAkce extends GContentBase<SeznamAdeTridaAkceObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdeTridaAkceObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    interface IGAdmMessageSettings {
        title: string;
        text: string;
        exception?: any;
        icon?: string | null;
        id?: string;
    }
    /**
     * Třída DetailBase
     *
     * @author FFIALA
     * @since 482.1.0.119
     */
    class DetailBase {
        /** Objekt popisující metadata políček načtených ze serveru při load_data*/
        MetaData: Gordic.AdmIsl.Interface.GAdmSubjectMetaData | null;
        Permissions: Gordic.AdmIsl.Interface.GAdmSubjectPermissions | null;
        /** pointer na objekt formulare */
        DetailForm: Gordic.Forms.Form;
        /** element formu */
        formElement: JQuery<HTMLElement> | null;
        /** příznak, že se jedná o nový záznam */
        newRecord: boolean;
        /** Příznak, že okno se nachází v editačním režimu */
        editMode: boolean;
        /** sxs pro toto okno */
        sxsDetail?: string | null;
        /** typ_obj pro toto okno */
        typObjDetail?: number | null;
        /** element sidebaru */
        sidebar: JQuery<HTMLElement>;
        /** panel id (string) */
        panelId: string;
        /** element panelu v sidebaru */
        panelElement: JQuery<HTMLElement>;
        MakeForm: (a_name: string) => Gordic.Forms.Form;
        FinishMakeForm: () => JQuery<HTMLElement>;
        MakeSection: (a_name: string) => Gordic.Forms.Form;
        MakeRow: (a_name: string) => Gordic.Forms.Form;
        MakeField: <T = any>(a_name: string, ...extendedOptions: GControlBoxOptions<T | T[]>[]) => Gordic.Forms.Form;
        MakeFields: (a_name: string) => Gordic.Forms.Form;
        MakeBoolField: <T = any>(a_name: string, ...extendedOptions: GCheckOptions[]) => Gordic.Forms.Form;
        MakeBool10Field: (a_name: string) => Gordic.Forms.Form;
        MakeSelectField: <T = any>(a_name: string, fieldOptions: GSelectBoxOptions<T>, ...extendedOptions: GSelectBoxOptions<T, T | T[]>[]) => Gordic.Forms.Form;
        MakeFormField: <T = any>(a_name: string, fieldOptions: GFormBoxOptions<T>) => Gordic.Forms.Form;
        CreateStatusBar: (data: any, priz_new: boolean) => void;
        SetEditMode: (editMode: boolean) => boolean;
        SetMenuButtons: (editMode: boolean) => boolean;
        HideField: (fieldName: string) => void;
        ShowField: (fieldName: string) => void;
        ShowErrorNot: (notSettings: IGAdmMessageSettings) => void;
        ShowSucessNot: (notSettings: IGAdmMessageSettings) => void;
        static _hideField(that: GContentType<DetailBase>, fieldName: string): void;
        static _showField(that: GContentType<DetailBase>, fieldName: string): void;
        static CloseAction(that: GContentType<DetailBase>): any;
        /**
         * DetailBaseInit
         *
         * @param {GContentType<SeznamBase>} that
         */
        static DetailBaseInit(that: GContentType<DetailBase>): void;
        /**
         * Vytvoření formuláře
         * @param that
         * @param formName
         */
        private static _makeForm;
        /**
         * Dokončení vytvoření formuláře
         * @param that
         * @param formName
         */
        private static _finishMakeForm;
        /**
         * Vytvoření řádku formuláře pro políčko zadaného jména - na základě údajů v MetaData
         * @param that
         * @param a_name
         */
        private static _makeSection;
        /**
         * Vytvoření řádku formuláře pro políčko zadaného jména - na základě údajů v MetaData
         * @param that
         * @param a_name
         */
        private static _makeRow;
        /**
         * Vytvoření políček
         * @param that
         * @param a_name
         */
        private static _makeFields;
        /**
         * Vytvoření políčka pro boolean - zatržítko kde ale true je 10
         * @param that
         * @param a_name
         */
        private static _makeBool10Field;
        /**
         * Vytvoření políčka pro boolean - zatržítko
         * @param that
         * @param a_name
         */
        private static _makeBoolField;
        /**
         * Vytvoření políčka - typ je určen obsahem: MetaData
         * @param that
         * @param a_name
         */
        private static _makeField;
        /**
         * Vytvoření políčka
         * @param that
         * @param a_name
         */
        private static _makeSelectField;
        private static _makeFormField;
        /** Přepnutí dostupnosti políček podle aktuálního režimu okna
         editMode - příznak, že okno je v editačním režimu
         */
        private static _setEditMode;
        /** Přepnutí viditelnost tlačítek podle aktuálního režimu okna
         editMode - příznak, že okno je v editačním režimu
         */
        private static _setMenuButtons;
        /** odstranit sidebar */
        static removeSidebar(that: GContentType<DetailBase>): void;
        /**
         * Smazání všech cache - volá se po úspěšném uložení záznamu do DB
         * @param content
         */
        static ClearAllCache(content: GContentType<DetailBase>): void;
        static _showLoadError(content: GContentType<DetailBase>, settings: IGAdmMessageSettings): void;
        static _showSucess(content: GContentType<DetailBase>, settings: IGAdmMessageSettings): void;
        static _createStatusBar(content: GContentType<DetailBase>, data: any, priz_new: boolean): void;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailStupenSchvaleniEpkDlg(parentContent: GContent, opt: {
        /** stav_schvproc */
        stav_schvproc: number | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function DetailSchvalovaciRoleEpkDlg(parentContent: GContent, opt: {
        /** ixs_sro */
        ixs_sro: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function DetailFunkceSchvalovaciRoleEpkDlg(parentContent: GContent, opt: {
        /** ixs_fun */
        ixs_fun: string | null;
        /** ixs_sro */
        ixs_sro: string | null;
        /** dat_od */
        dat_od: Date | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function DetailFunkceSchvalovaciSablonyEpkDlg(parentContent: GContent, opt: {
        /** ixs_fun */
        ixs_fun: string | null;
        /** ixs_ssa */
        ixs_ssa: string | null;
        /** ixs_sro */
        ixs_sro: string | null;
        /** dat_od */
        dat_od: Date | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function DetailTypyDokumentuSchvalovaciSablonyEpkDlg(parentContent: GContent, opt: {
        /** ixs_ssa */
        ixs_ssa: string | null;
        /** ixs_typ */
        ixs_typ: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function DetailSchvalovaciSablonaEpkUkonyDlg(parentContent: GContent, opt: {
        /** ixs_ssa */
        ixs_ssa: string | null;
        /** radek_sab */
        radek_sab: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function DetailGrafDefiniceDlg(parentContent: GContent, opt: {
        /** ixs_grf */
        ixs_grf: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function DetailFormularSkDlg(parentContent: GContent, opt: {
        /** ixs_fsk */
        ixs_fsk: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function DetailKonfiguraceDrmsDlg(parentContent: GContent, opt: {
        /** jeden */
        jeden: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function DetailSeznamSchvalovaciSablonaEpkDlg(parentContent: GContent, opt: {
        /** ixs_ssa - PK */
        ixs_ssa: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamFunkceSchvalovaciRoleEpkDlg(parentContent: GContent, opt: {
        /** ixs_sro */
        ixs_sro: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamFunkceSchvalovaciSablonyEpkDlg(parentContent: GContent, opt: {
        /** ixs_ssa */
        ixs_ssa: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamTypyDokumentuSchvalovaciSablonyEpkDlg(parentContent: GContent, opt: {
        /** ixs_ssa */
        ixs_ssa: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamSchvalovaciSablonaEpkUkonyDlg(parentContent: GContent, opt: {
        /** ixs_ssa */
        ixs_ssa: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamGrafObsahDlg(parentContent: GContent, opt: {
        /** ixs_grf */
        ixs_grf: string | null;
        data: Gordic.AdmIsl.Interface.GGrafDefiniceDto;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamFormularSkDlg(parentContent: GContent, opt: {
        /** ixs_fsk */
        ixs_fsk: string | null;
        data: Gordic.AdmIsl.Interface.GFormularSkDto;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function DetailEleServerDlg(parentContent: GContent, opt: {
        /** server_name */
        server_name: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamEleServerDlg(parentContent: GContent, opt: {
        /** server_name */
        server_name: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function DetailEleServerDiskDlg(parentContent: GContent, opt: {
        /** server_name */
        server_name: string | null;
        /** disk_name */
        disk_name: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** příznak nového záznamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamEleServerDiskDlg(parentContent: GContent, opt: {
        /** server_name - nepovinný vstupní argument - filtrační podmínka pro seznam */
        server_name?: string | null;
        /** disk_name - nepovinný vstupní argument - filtrační podmínka pro seznam */
        disk_name?: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.GridUtils {
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
declare namespace Gordic.Adm.WebControls {
    interface IGAdmSigSelectInput {
        data?: {
            /** data souboru */
            fileData?: any;
            /** název souboru */
            fileName?: string;
            /** vizuální pozice */
            signaturePositions: any[];
        };
        filePreviewLoadOptions?: IGFilePreviewLoadOptions;
        sigSelectOptions?: Pick<Gin.WebClient.IGSigSelectOptions, "drawingStyle" | "defaultSignature">;
    }
    /**
     * GAdmSignPlacing - Content pro otevření komponenty pro vizuální umístění podpisu
     * - autor původního kódu: vmaca (Wfl\SignModule\Dialogs\GWflSignPlacing.ts)
     *
     * @author thazmuka
     * @since 484.1.0.92
     */
    class GAdmSignPlacing extends GContentBase implements IGClientContent {
        uid: string;
        title: string;
        prepareContent(inputDto: IGAdmSigSelectInput): void;
        closing(retVal: any): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Adm.WebControls {
    enum ITypePanel {
        Neurceno = 99
    }
}
declare namespace Gordic.Adm.Utils {
    /**
     * metoda pro smazání cache z políčka
     * - např. z Gordic.ControlsLogic.Client.GReaderGinspod
     *
     * @author thazmuka
     * @since 484.1.0.5
     */
    function clearCache(className: string): void;
    /** metoda pro smazání všech cache políček */
    function clearAllCache(): void;
    /**
        * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
        *
        * @param {JQuery<HTMLElement>} form předaný element formuláře
        * @returns {JQueryPromise<boolean>} výsledek stavu
        */
    function waitForValues(form: JQuery<HTMLElement>): JQueryPromise<boolean>;
    /** Typ výsledku operace */
    enum GOperationResultKind {
        /** The success */
        Success = 200,
        /** The information */
        Info = 203,
        /** The warning */
        Warning = 206,
        /** The error */
        Error = 400
    }
    /** konstanty pro ISL v ADM - odpovídá C# třídě GAdmIslConst  */
    enum GAdmIslConst {
        /** Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se nemají načítat data z DB, pouze se mají vrátit výchozí honodty pro požadovaný objekt */
        defaultValuesForNewRecord = "DefaultValuesForNewRecord",
        /** Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se jedná o položku, která je přítomná na detailu */
        detail = "detail",
        /** Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se jedná o položku, která je přítomná na seznamu */
        seznam = "seznam",
        /** Konstanta pro jméno fragmentu, který svou přítomností signalizuje, že se jedná o položku, která je všude - jak na seznamu, tak na detailu */
        everyWhere = ""
    }
    /**
     * na akci změní property enabled - povolí nebo zakáža
     */
    function setActionTooltip(Action: GAction | undefined, text: string | null | undefined): void;
    /**
     * na akci změní property enabled - povolí nebo zakáža
     */
    function setActionEnabled(Action: GAction | undefined, enabled: boolean | null | undefined): void;
    function setActionDisabled(Action: GAction | undefined, disabled: boolean | null | undefined): void;
    /**
     * Test, zda podle objektu typu GAdmSubjectPermissions můžu editovat
     * @param permissions
     */
    function getCanEdit(permissions: Gordic.AdmIsl.Interface.GAdmSubjectPermissions | null | undefined): boolean;
    function getCanAdd(permissions: Gordic.AdmIsl.Interface.GAdmSubjectPermissions | null | undefined): boolean;
    function getCanAddList(permissions: Gordic.General.ApplicationInterface.GDataAccessRightsEnum | null | undefined): boolean;
    /**
    * na akci změní property visibled - zobrazí nebo zneviditelní
    * @param Action
    * @param visible
    */
    function setActionVisible(Action: GAction | undefined, visible: boolean | null | undefined): void;
    /**
     * test, jestli je grid prázdný
     */
    function isGridEmpty(grid: any): boolean;
    /**
     * Převede číslo do hex
     * @param c číslo v desítkové soustavě
     */
    function NumberToHex(c: number): string;
    /**
     * Převede hexadecimální číslo do desítkového
     * @param hex hexadecimální číslo
     */
    function HexToNumber(hex: string): {
        r: number;
        g: number;
        b: number;
    } | null;
    /**
     * item template pro colorbox
     * @param value hodnota barvy
     */
    function ItemTemplateColorBox(value: any): JQuery<HTMLElement>;
    function GetSubjectCaption(value: number, strediskoName: string): string;
    function HasDuplicates(arr: any[], key: string): boolean;
}
declare namespace Gordic.Adm.WebControls {
    interface GStrediskaOptions {
    }
    class GStrediskaTab {
        private actions;
        private gtabStrediska;
        private gridStrediska;
        constructor();
        getTab(): JQuery<HTMLElement>;
        updateStrediskaAction(enable: boolean): void;
        setDataTogrid(data: any): void;
        getDataFromGrid(): any[] | null;
        changeVisible(hide: boolean): void;
        private removeStrediska;
        private createModalStrediska;
        private createActions;
    }
}
declare namespace Gordic.Adm.WebControls.GAdmGlobals {
    enum PlatnostEnum {
        predPlatnosti = 0,
        platne = 1,
        poPlatnosti = 2,
        neurceno = 3
    }
    enum ZamekEnum {
        uzamceno = 0,
        neuzamceno = 1
    }
    interface ResultAsyncTask {
        icon: string;
        primaryText: string;
        secondaryText: string;
        meaning: Meaning;
        item: Async.IGTask;
        id: string;
    }
    /**
     * Vrátí název úrovně. Např pro urovenCfg=30 vrátí 'Parametr pro licenci'
     * @param urovenCfg číslo úrovně
     * @returns úroveň string
     */
    function GetUrovenCfgCaption(urovenCfg: number, strediskoName: string): string;
    function CreateAktivitaBadge(aktivita: number): GBadgeOptions;
    function CreateStavBadge(stav: number): GBadgeOptions;
    function CreatePlatnostBadge(platnost: any): GBadgeOptions;
    function CreateEditaceBadge(editace: any): GBadgeOptions;
    /**
     * Vztvoří sloupec platnost
     * @param data řádek dat
     * @param type typ platnosti (respektovat i čas)
     * @returns platnost
     */
    function CreatePlatnost(data: any, type?: "date" | "datetime"): any;
    function AdmContentSettings(): Gordic.Forms.Form;
    function VyberovaSkupinaDialog(typ_obj: number): void;
    function padLeft(number: number, length: number, character: string): string;
    function createSpecialGridGinsfun(): Gordic.Data.GridFormat;
    function ConvertSize(size: number | null, units?: string): string | null;
    function GetString(data: any): any;
    function CheckIsDuplicities(data: any[], property: string): boolean;
    function CheckIsDuplicitiesArray(data: any[]): boolean;
    function getAktivitaTxt(aktivita: number): string;
    function createformSouhrnVazeb(): Gordic.Forms.Form;
    function CheckAsyncTaskRunning(className: string): boolean;
    function GenerateRandomCislo(min: number, max: number): number;
    function HistorieSpusteniAsyncTask(className: string, title: string, template: (item: Async.IGTask) => string, openDetail: (item: Async.IGTask) => void): void;
    function GetVyberovaSkupina(typ_subj: number, returnFun: (n: any[]) => any): GActionParamsDefObj;
    function OpenVysledekKopieVazby(vysledek: {
        nazev: string;
        id: string;
        vysledky: Gordic.Adx.Interface.GAdxResultKopieVazbyDto[];
    }): void;
    function OnlyUnique(value: any, index: any, array: any): boolean;
    function createSpecialSelectorGinsref(config?: {
        addPlatnost: boolean;
        addMail: boolean;
        addOc: boolean;
    }): Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Data.Readers.GinsrefDto>;
    function createSpecialItemTemplateGinsref(data: Gordic.Data.Readers.GinsrefDto): string;
    function createSpecialSelectorGinspod(): Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Data.Readers.GinspodDto>;
    function createSpecialItemTemplateGinspod(data: Gordic.Data.Readers.GinspodDto): string;
    function createSpecialSelectorGinsorj(): Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Data.Readers.GinsorjDto>;
    function createSpecialItemTemplateGinsorj(data: Gordic.Data.Readers.GinsorjDto): string;
}
declare namespace Gordic.Adm.WebControls.GAdmGridFunctions {
    function createGridFormat(dataListdescriptor: General.ApplicationInterface.GDataListDescription, columnOrder: string, withoutAktivita?: boolean, specialAktivitaColumns?: string[], specialStavColumns?: string[]): Gordic.Data.GridFormat;
    function createGridGormatAuditPristupu(dataListdescriptor: General.ApplicationInterface.GDataListDescription, columnOrder: string): Gordic.Data.GridFormat;
    function createPanelData(title: string, row: any[] | null, gridFormat: Gordic.Data.GridFormat, panelElement: JQuery<HTMLElement>, gridOptions: any, columnList: string): void;
    function createAktivitaCaptionIcon(aktivita: number): {
        icon: string;
        text: string;
        tooltip: string;
    };
    function CreatePlatnostIcon(platnost: any): any;
    function createStavCaptionIcon(aktivita: number): any;
    function createDatOdOrDoColumn(gridFormat: Gordic.Data.GridFormat): void;
}
declare namespace Gordic.Adm.WebControls {
    abstract class GAdmHromadnaOperaceBase<TDto> {
        options: IGAdmHromadnaOperaceOptions;
        cnt: GContent & GAdmHromadnaOperaceBase<TDto>;
        formData: any;
        defineGridData: any[];
        resultGridData: any[];
        gridFormatBase: Gordic.Data.GridFormat;
        selectedData: any[];
        serviceCnt: GContent;
        closeOnSuccess: boolean;
        hromadneZmenyFields: {
            fieldName: string;
            caption: string;
            items: string[];
        }[];
        form: Gordic.Forms.Form;
        grid: JQuery<HTMLElement>;
        gridResult: JQuery<HTMLElement>;
        wizard: JQuery<HTMLElement>;
        abstract createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        abstract createDefineGridData(formData: any): any[];
        abstract createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        abstract saveData(data: any[]): JQueryPromise<any>;
        abstract validateRows(data: any): Gordic.Validators.GridError[];
        abstract testExistMethod(data: any[]): JQueryPromise<any>;
        abstract createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBase(this: GContent & GAdmHromadnaOperaceBase<TDto>, options: IGAdmHromadnaOperaceOptions): void;
        create(): void;
        getServiceCnt(): GContent;
        createObjectSelectBox(form: Gordic.Forms.Form): Gordic.Forms.Form;
        createAktivitaColumn(gridFormat: Gordic.Data.GridFormat): void;
        createGridBeforeSave(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        private mapPrimaryKey;
        private createView;
        createCartesianProduct2D(array1: any, array2: any): any[];
        transformDataToArrayObject(formData: any[], propertyName: string[]): any[];
        getColumnsDefineData(): GGridColumn<any>[];
        getGroupColumnCaption(): string[];
        getColumnsResultData(): GGridColumn<any>[];
        createGridFormatBase(resultGrid?: boolean): Gordic.Data.GridFormat;
        createResultData(resultData: {
            data: any;
            message: string;
            result: number;
        }[]): void;
        createResultGrid(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        getActionAdd(typ_obj: number): MenuParams;
        createDefaultFields(form: Gordic.Forms.Form, datOdDoType?: "date" | "datetime"): Gordic.Forms.Form;
        createSpecialOdDoValidator(): Gordic.Validators.Base;
        getCurrentDate(): Date;
        getCurrentDate100Years(): Date;
        private createActionsBase;
        private createWizard;
        private getDataBeforeSave;
        getAllAktivita(): number[];
        private copyRowData;
        createError(message: string, errorType?: string): Gordic.Validators.GridError;
        transformBoolValue(yesValue?: number): {
            apply?(modelValue: any): any | null | undefined | void;
            collect?(fieldValue: null | any): any | null | undefined | void;
        };
        selectExistInDb(ctx: any, exist: boolean): void;
        createFlagNemenne(): GFieldFlagOptions;
        updateDataBeforeEditGrid(): JQueryPromise<any>;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * Implementace rozhraní pro získání sidepanelu s informacemi o konkrétním parametru dle db předpisu
     */
    abstract class GAdmParameterInfoElementSetterAbstract<T> implements IGAdmParametrInfoElementSetter {
        protected parameter: string;
        constructor();
        /**
        * @inheritdoc
        */
        setContentForElement(parameter: string, panel: JQuery<HTMLElement>): void;
        setContentForElementPromise(parameter: string, panel: JQuery<HTMLElement>): JQueryPromise<any>;
        private finalizeForm;
        /**
         * Vytvoří promise formuláře, aby byla možná návaznost na async získání dat
         * @param data
         * @returns
         */
        private createFormPromise;
        /**
         * Specifikace, jak se mají získat data (implementace např 'return isl.getData()')
         */
        protected abstract getData(): JQueryPromise<T>;
        /**
         * Vrací formulář, na kterým má být následně volána funkce "createForm"
         * @param data
         */
        protected abstract createForm(data: T): Forms.Form;
    }
    class GAdmParameterUrovneElementSetter extends GAdmParameterInfoElementSetterAbstract<AdmIsl.Interface.GAdmParametrGlobalListDto[]> {
        /**
         * Vrátí zformátované HTML pro nastavení úrovní
         * @param data
         * @returns
         */
        getHtmlUrovne(data: AdmIsl.Interface.GAdmParametrGlobalListDto[]): string;
        protected createForm(data: AdmIsl.Interface.GAdmParametrGlobalListDto[]): Forms.Form;
        protected getData(): JQueryPromise<AdmIsl.Interface.GAdmParametrGlobalListDto[]>;
        private getHtmlSubj;
    }
    class GAdmParameterInfoDetailElementSetter extends GAdmParameterInfoElementSetterAbstract<AdmIsl.Interface.GAdmParamertInfoDto> {
        protected createForm(data: AdmIsl.Interface.GAdmParamertInfoDto): Forms.Form;
        protected getData(): JQueryPromise<AdmIsl.Interface.GAdmParamertInfoDto>;
        private createParamInfoForm;
        private zpusobZadaniHodnotyParametru;
        private typHodnotyParametru;
        private seznamHodnot;
        private seznamFaze;
        private seznamUrovne;
        private getViewIdConfig;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GAdxVyberovaSkupinaPrefab extends GContentBase {
        private gridVyberovaSkupina;
        private gridObsahVyberoveSkupiny;
        private typ_subj;
        prepareContent(): void;
        private init;
        private createCnt;
        private getVyberoveSkupiny;
        private createActions;
        private actOk;
        private createCommandBar;
    }
}
declare namespace Gordic.Adm.WebControls {
    interface IGBaseAdmImportDataOptions {
        title: string;
        contentId: string;
        contentCs: string;
        metadata: Gordic.AdmIsl.Interface.GAdmSubjectMetaData | null;
        fields: string[];
        columnsResult: string[];
        dataListDescription: Gordic.General.ApplicationInterface.GDataListDescription;
        addAktivita: boolean;
    }
    const DefaultBaseImportDataOptions: IGBaseAdmImportDataOptions;
    abstract class GBaseAdmImportData<TDto> {
        wizard: Gordic.Wizard;
        options: IGBaseAdmImportDataOptions;
        cnt: GContent & GBaseAdmImportData<TDto>;
        srv: GContent;
        data: any[];
        firstRowPopis: boolean;
        rowsLabels: string[];
        selectedData: any[];
        selectedColumns: string[];
        selectedFields: string[];
        resultGriddata: any[];
        guidsFiles: string[];
        formDataFirstStep: {
            file: any;
            oddelovac: string;
            firstRowHeader: boolean;
        };
        changeDataFirstStep: boolean;
        gridDefineData: JQuery<HTMLElement>;
        abstract createFinalForm(form: Gordic.Forms.Form): Gordic.Forms.Form;
        abstract updateDatBeforeSave(formData: any, saveData: any[]): any[];
        private getSrv;
        createBase(this: GContent & GBaseAdmImportData<TDto>, options: IGBaseAdmImportDataOptions): void;
        removeTempFiles(): void;
        private createActionsBase;
        private createWizard;
        private enabledStep;
        private createFormSelectFile;
        private setOddelovacString;
        private getOddelovac;
        private createSecondPage;
        private getDostupnaPolicka;
        private createGridFormat;
        private updateDataToGrid;
        private deleteRedundandChars;
        private createSpecialValidator;
        private createThirdPage;
        private changeThirdPage;
        private createSaveData;
        private createResultData;
        private createResultPage;
        private updateGridView;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDialogResultKopieVazby extends GContentBase {
        private nazev;
        private objektId;
        private vysledky;
        prepareContent(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createForm;
        private createGrid;
        private createGridFormat;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDialogResultsAsyncUloha extends GContentBase {
        private classname;
        private titleTask;
        private getSecondaryText;
        private openDetail;
        prepareContent(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createCnt;
        private getIcon;
        private getStateText;
        private createSecondaryRow;
        private getMeaning;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSouhrnnyPrehledVazeb extends GContentBase {
        private cnt;
        private grid;
        private ixs_fun;
        private ixs_ref;
        private dataDist;
        private viewData;
        private viewErrors;
        private currentView;
        private newView;
        private onlyError;
        onContentReady(): void;
        private init;
        private createActions;
        private createBreadcrumbs;
        private createMenubar;
        private getBaseCaption;
        private createFilter;
        private collectData;
        private createFilterForm;
        private getDataFunkcniMisto;
        private createSearchForm;
        private updateSearchForm;
        private updateView;
        private createHeader;
        private createBasepanel;
        private setDataToPanel;
        private createGridFormat;
        private openDetail;
        private filterOnlyError;
        private openSettingForm;
        private createViewSelectboxOpt;
        private getView;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GZdedeneVazbyGrid extends GContentBase {
        private columnOrder;
        private dataListDescriptor;
        private data;
        private grid;
        private index;
        private updateGridFormat;
        prepareContent(): void;
        private actOk;
    }
}
declare namespace Gordic.Adm.WebControls {
    interface IGAdmDetailOptions {
        /**
         * Název contentu
         */
        contentName: string;
        /**
         * Data
         */
        data: any;
        /**
         * Aktuální filter
         */
        currentFilter?: any;
        /**
         * Grid
         */
        gridRc?: Gordic.Components.GridRC<any>;
        /**
         * Vytvořit akci pro předchozí a následující záznam
         */
        createPreviousAndNextAction?: boolean;
        /**
         * Nový záznam
         */
        newRecord: boolean;
        /**
         * Popis datového listu
         */
        dataListDescription: Gordic.General.ApplicationInterface.GDataListDescription;
        /**
         * Přidá platnost do state baru
         */
        addPlatnost?: boolean;
        /**
         * Typ platnosti, jestli se ignoruje čas, default - date
         */
        platnostType?: "date" | "datetime";
        /**
         * Přidá aktivitu do state baru
         */
        addAktivita?: boolean;
        /**
         * Popisek contentu (lidský název)
         */
        contentCaption: string;
        /**
         * Povolení editace externího ID
         */
        isPovolEditExterniId?: boolean;
        /**
         * Kopírování
         */
        copy?: {
            /**
             * Pocolení kopírování
             */
            allowCopy?: boolean;
            /**
             * Filtr
             */
            filterObj?: () => any;
            /**
             * Vazby objektu
             */
            vazby?: {
                /**
                 * Název kopírovaného objektu
                 */
                caption: string;
                /**
                 * ID bussiness objektu
                 */
                bussinessObj: string;
                /**
                 * Speciální filtrování (slouží pro předání speciálního filteru)
                 * @returns filtr
                 */
                filterSpecial?: () => any;
                /**
                 * Pořadí sloupců
                 */
                columnOrder: string;
                /**
                 * Sloupce pro uložení
                 */
                columnsBeforeSave: string[];
                /**
                 * Aktualizace formátu gridu
                 * @param column sloupce
                 * @returns nové sloupce
                 */
                updateGridFormat?: (column: GGridColumn<any>) => GGridColumn<any>;
            }[];
        };
    }
    const OptionsDetailDefaults: IGAdmDetailOptions;
    interface IGAdmCopyOptions {
        caption: string;
        bussinessObj: string;
        columnOrder: string;
        data?: any[];
        metadata?: Gordic.General.ApplicationInterface.GDataListDescription;
        columnsBeforeSave: string[];
        updateGridFormat?: (column: GGridColumn<any>) => GGridColumn<any>;
    }
}
declare namespace Gordic.Adm.WebControls {
    interface IGAdmHromadnaOperaceOptions {
        title: string;
        data: any[];
        objectFields: string[];
        serviceCnt: string;
        keys: string[];
        contentId: string;
        editMode?: boolean;
        updateExist?: boolean;
        formSettings?: {
            aktivitaField?: boolean;
            datOdDoField?: boolean;
        };
        hromadneZmenyFields?: {
            fieldName: string;
            caption: string;
            items: string[];
        }[];
    }
    const OptionsHromadnaOperaceDefaults: IGAdmHromadnaOperaceOptions;
}
declare namespace Gordic.Adm.WebControls {
    /**
     * Rozhraní s metodou setContentForElement, která nastavuje content pro HTMLElement
     */
    interface IGAdmParametrInfoElementSetter {
        /**
         * Rozhraní pro získání sidepanelu s informacemi pro konkrétní parametr dle db předpisu
         * @param parameter db předpis parametru
         */
        setContentForElement(parameter: string, element: JQuery<HTMLElement>): any;
    }
}
declare namespace Gordic.Adm.WebControls {
    interface IGAdmSeznamOptions {
        /**
         * This content
         */
        content: GContent<GAdmSeznamBase>;
        /**
         * Název contentu
         */
        contentName: string;
        /**
         * Popisek contentu (lidský název)
         */
        contentCaption: string;
        /**
         * Popis datového listu
         */
        dataListDescriptor: Gordic.General.ApplicationInterface.GDataListDescription;
        /**
         * Nastavení filtru
         */
        filterSettings?: {
            /**
             * Příznak vytvoření filtru
             */
            createFilter?: boolean;
            /**
             * Přidá výchozí aktivitu
             */
            addDefaultaktivita?: boolean;
            /**
             * Přidá výchozí rok
             */
            addDefaultRok?: boolean;
            /**
             * Oblíbené filtry
             */
            favorites?: string[] | "all";
            /**
             * Příznak otevření prázdného seznamu
             */
            emptyList?: boolean;
            /**
             * Příznak povinného prázdného seznamu
             */
            emptyListRequired?: boolean;
        };
        /**
         * Nastavení komparátoru
         */
        comparatorSettings?: {
            /**
             * Přidá komparátor
             */
            addComparator?: boolean;
            /**
             * Template do hlavičky položky porovnávačky
             */
            itemTemplate?: string;
        };
        /**
         * Nastavení gridu
         */
        gridSettings?: {
            /**
             * Gridformát
             */
            gridFormat?: Gordic.Data.GridFormat | null;
            columnOrder?: string;
            defaultSort?: string;
            iconAktivitaColumns?: string[];
            iconStavColumns?: string[];
            profiles?: GridProfile<any>[];
            defaultProfile?: GridProfile<any> | null;
        };
        /**
         * Nastavení exportu dat
         */
        exportImportDataSettings?: {
            metadata?: Gordic.Adx.Interface.GAdxExportInfoDto;
            dataProperties?: {
                field: string;
                caption: string;
                type: Gordic.Adx.WebControls.GAdxGlobals.GAdxDataImportExportEnum;
                compare?: boolean;
            }[];
            messages?: string[];
            exportCondition?: ((data: any) => boolean) | null;
            saveHromadneMethod?: string | null;
            currentDataPromise?: JQueryPromise<any> | null;
        };
    }
    const OptionsDefaults: IGAdmSeznamOptions;
    interface IGAdmGridSxs {
        sxs: string;
        nazev: string;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * Interface poposijící vlastnosti při práci s heslem
     */
    interface IGPswConfig {
        /** Mód hesla*/
        mode: GAdmPasswdParameterEnum;
        /** Heslo*/
        passwd?: string | null;
        /** Mapovací řetězec (např ~D~, více v docs pro GAdmPasswdParameterEnum)*/
        mapStr?: string | null;
        /** Pokud se heslo vztahuje k parametru, uvést parametr. Např. "gin_gms_pswsmtp"*/
        dbParameter?: string | null | undefined;
    }
    /**
     * Způsob uložení hesla v DB parametru
     */
    enum GAdmPasswdParameterEnum {
        /** Hodnota je načtena z databáze */
        database = "~1~",
        /** Hodnota je načtena z trezoru přímo podle klíče parametru*/
        direct = "~D~",
        /** Hodnota je načtena z trezoru nepřímou hodnotou*/
        indirect = "~V~",
        /** neznámá hodnota */
        invalidMode = "ERROR_INVALID"
    }
    /**
     * Typ pro dialog s heslem použitý v GAdxDialogBase::createPasswordField
     *
     */
    interface IGPasswordDialogType {
        zpusob_ulozeni: number;
        password?: string | null;
        password_map?: string | null;
    }
    /**
     * Třída zastřešující práci s heslem v db parametru
     */
    class GAdmPasswdParameter {
        /**
         * Převede z Adx.PasswordFieldu, default na database s prázdnou hodnotou "~1~"
         * @param val
         * @returns
         */
        static fromIgPasswordDialogType(val?: IGPasswordDialogType | undefined | null): IGPswConfig;
        static toIgPasswordDialogType(val: IGPswConfig): IGPasswordDialogType;
        /**
         * Z objektu hesla vyparsuje prefix a příslušnou hodnotu
         *  (passwd - heslo z db, mapStr - mapovací řetězec)
         * @param val config
         * @returns
         */
        static fromString(val: string): IGPswConfig;
        /**
         * Z objektu hesla sestaví string, který je v db parametrech odpovídají config hodnotě
         * @param val
         * @param paramId
         * @returns
         */
        static toString(val: IGPswConfig): string;
        /**
         * Provede zašifrování řetězce RSA šifrou pomocí Utils.JSEncryptSupport
         * @param value řetězec k šifrování
         * @param publicKey veřejný klíč příjemce
         * @returns zašifrovaná hodnota RSA pomocí veřejného klíče příjemce
         */
        static encryptViaJSE(value: any, publicKey: any): string;
        static toDbEnumNumber(enumValue: GAdmPasswdParameterEnum): number;
        static fromDbEnumNumber(enumValue: number): GAdmPasswdParameterEnum;
        /**
         * Enum na viditelnou hodnotu (resx)
         * @param enumValue
         * @returns
         */
        static getModeCaption(enumValue: GAdmPasswdParameterEnum): string;
        static getSourceCaption(enumValue: GAdmPasswdParameterEnum): string;
        /**
         * Převede string na enum módu hesla
         * @param proposedStr
         * @returns
         */
        static getModeStrToEnum(proposedStr: string): GAdmPasswdParameterEnum;
        /**
         * Creates a password form  (suitable for formbox) for given password modes. Defaults to all modes.
         * @param sectionOptions - section options or section name
         * @param pswModes - array of password modes to be used in the form, defaults to all modes (database as ~1~, direct as ~D~, indirect as ~V~)
         * @param form - optional existing Gordic.Forms.Form instance to be used, if not provided a new instance named 'passwordForm' will be created
         * @returns Gordic.Forms.Form instance with password fields, suitable for formbox
         * @author pdohnal
         */
        static passwordFormPrefab(sectionOptions?: GSectionOptions | string | null, pswModes?: GAdmPasswdParameterEnum[], form?: Gordic.Forms.Form): Forms.Form;
        static passwordPswModeSelectboxPrefab(pswModes?: GAdmPasswdParameterEnum[]): GSelectBoxOptionsSingle<GAdmPasswdParameterEnum>;
        static passwordPswConfigSelectboxPrefab(pswModes?: GAdmPasswdParameterEnum[]): GSelectBoxOptionsSingle<IGPswConfig>;
        /**
         * Creates an icon template for the password mode.
         * @param psw - password mode or string representation of the password
         * @param keyCaption - caption for the key, defaults to "Api klíč"
         * @returns IconTemplate object with icon, text, and tooltip
         * @author pdohnal
         */
        static createIconTemplate(psw: GAdmPasswdParameterEnum | string, showOAuthNotSetWarning?: boolean, ixsOap?: string | null): IconTemplate;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * Subcontent SidePanel pro detaily parametru
     */
    class GAdmSubcontentParamInfo extends GContent {
        icon: string;
        title: string;
        uid: string;
        elementSetter: Adm.WebControls.IGAdmParametrInfoElementSetter;
        parameterId: string;
        prepareContent(inputParams: any): void;
        onActivate(): void;
        /**
         * Vyvolá refresh elemntu na subcontentu
         * @param parameterId identifikátor parametru (např ginspar.param)
         */
        refreshContentElement(parameterId: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    interface IGPrirazeneRoleAgendyISZR {
        cnt: GContent;
        ginIszrFunrol: number;
        isPovolenaEvidenceOP: boolean;
        permission: {
            edit: boolean;
            create: boolean;
        };
        agendy: {
            agenda: string | null | undefined;
            nazev: string | null | undefined;
            priz_aiseo: number | null | undefined;
            priz_isep: number | null | undefined;
            priz_aisc: number | null | undefined;
            priz_aiseop: number | null | undefined;
            pocet_role: number | null | undefined;
        }[];
        role: {
            agenda: string | null | undefined;
            role: string | null | undefined;
        }[];
    }
    class GPrirazeneRoleAgendyISZR {
        options: IGPrirazeneRoleAgendyISZR;
        actions: GActionList;
        grid: JQuery<HTMLElement>;
        editMode: boolean;
        constructor(options: IGPrirazeneRoleAgendyISZR);
        createTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createGroup(): IGTabGroupOptions;
        changeEdit(editMode: boolean): void;
        getPrirazeneAgendy(): {
            agenda: string | null | undefined;
            nazev: string | null | undefined;
            priz_aiseo: number | null | undefined;
            priz_isep: number | null | undefined;
            priz_aisc: number | null | undefined;
            priz_aiseop: number | null | undefined;
            pocet_role: number | null | undefined;
        }[];
        getPrirazeneRole(): {
            agenda: string | null | undefined;
            role: string | null | undefined;
        }[];
        private createGrid;
        private createGridFormat;
        private createActions;
        private addAgenda;
        private closeCnt;
        private addAgendaToGrid;
        private editRole;
        private editRoleOk;
        private removeAgenda;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GAdmDashboard extends GContentBase {
        private countAdminConsentBeforeExpire;
        private adminConsentBeforeExpire;
        private moduleInfoItems;
        private NazevRef;
        private NazevFun;
        private DatLoginTxt;
        private intervalId;
        private develop;
        private dataView;
        onContentReady(): void;
        onClose(): void;
        /** načíst informace o modulu */
        private loadModuleInfo;
        /** Stav vnitřních proměnných */
        private createStatistics;
        private setDataToPanel;
        private createDashboardPanel;
        private getStatsExpireAdminConsent;
    }
}
declare namespace Gordic.Adm.WebControls.BaseForms {
    function ColorSelectForm(): Gordic.Forms.Form;
}
declare namespace Gordic.Adm.WebControls {
    class ChangeAltLoginModalWindow extends GContentBase<DetailBase> {
        private data;
        private ixs_ref;
        private servicecnt;
        private isOracleOrInformix;
        private getServiceCnt;
        save(): void;
        private saveInternal;
        ulozeni(novadata: any): void;
        onContentReady(): void;
        private init;
        private createForm;
        private loadData;
        private createvalidatorsPasswd;
    }
}
declare namespace Gordic.Adm.WebControls {
    class ChangeLoginModalWindow extends GContentBase<DetailBase> {
        private data;
        private ixs_ref;
        private servicecnt;
        private isOracleOrInformix;
        private getServiceCnt;
        save(): void;
        private saveInternal;
        ulozeni(novadata: any): void;
        onContentReady(): void;
        private init;
        private createForm;
        private loadData;
        private createvalidatorsPasswd;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DialogDeleteUserSettings extends GContentBase {
        private funkcniMista;
        private osoby;
        private openFromDetail;
        private rezimDialog;
        prepareContent(): void;
        private init;
        private createTitle;
        private createActions;
        private createCommandBar;
        private createFormEl;
        private actOK;
    }
    enum RezimDialog {
        fukncniMisto = 0,
        osoba = 1
    }
}
declare namespace Gordic.Adm.WebControls {
    class DialogLogsTestMail extends GContentBase {
        private cnt;
        private logs;
        private srv;
        getSrv(): GContent;
        prepareContent(): void;
        private init;
        private loadLogy;
        private createActions;
        private createCommandBar;
        private createMenuBar;
        private saveToFile;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDialogSystemovyCertifikat extends GContentBase {
        private form;
        private serviceCnt;
        private getServiceCnt;
        onContentReady(): void;
        private init;
        private createForm;
        private createActions;
        private createCommandBar;
        private createCertifikatSave;
    }
}
declare namespace Gordic.Adm.WebControls {
    class OAuthProfileDialog extends GContentBase {
        private formEl;
        private type;
        private ixs_oap;
        private isDebug;
        private serviceCnt;
        onContentReady(): void;
        private srv;
        private createActions;
        private createFlash;
        private createCommandBar;
        private createForm;
        private oAuthProfilConsentOK;
        private oAuthProfilLoginOK;
        private ziskatOAuthConsent;
        private testLoginOAuth;
        private oAuthProfilCancel;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SelectStrediskaModalWindow extends GContentBase {
        private grid;
        addStrediska(): void;
        onContentReady(): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    class TestDigitalSignature extends GContentBase {
        onContentReady(): void;
        private data;
        private paramToInspect;
        private originalParamsConfiguration;
        private formDto;
        private ktgSupportDbParamsDto;
        private testFileNames;
        private fileInfoDto;
        private paramKtgEnabled;
        private ktgSignReason;
        private _srv;
        private getSrv;
        /**
         * Provede inicializaci objektů potřebných k využítí testů.
         */
        private initProperties;
        private getIsDpoEnabled;
        private _dpoSupport;
        private initDpoSupport;
        private selectCertBeforeSign;
        private _key;
        private updateCipherPublicKey;
        private collectFormModel;
        private showHintFlash;
        private validateDefaultForm;
        private createDefaultForm;
        private createPasswordForm;
        private paramGrid;
        private createGrid;
        private createActions;
        private createMenuBar;
        private createCommandBar;
        private _paramDetailElementSetter;
        private paramDetailElementSetter;
        private _paramUrovneElementSetter;
        private paramUrovneElementSetter;
        private sidePanelsArr;
        private createSideBars;
        private refreshSubcontents;
        /**
         * Najde v datech hesla a připraví je na odeslání na server
         * 1) pakliže obsahuje definici hesla, zkontroluje zdali jde o přímou hodnotu
         * 2) v případě přímé hodnoty hesla dojde k RSA zašifrování
         * @param data vstupní pole DTO s daty
         * @returns pole DTO s ošetřenými hesly
         */
        private handlePasswordEncryptionInDataCollection;
        /**
         * Vytvoří hlubokou kopii dat, na které se mají šifrovat hesla,
         *   tato hluboká kopie s předzpracovanými daty putuje na server.
         * Pokud by ve workflow nebyla hluboká kopie, nedal by se opakovaně provádět test,
         *   jelikož by došlo k opakovanému zašifrování, kterému by server nerozuměl
         * @returns hluboká kopie this.data
         */
        private dataDeepCopy;
        /**
         * Volá server pro embedded resource file.
         * @param fileName jméno souboru, které má server hledat
         * @returns Promise GFileInfoDto patřičného embedded resource souboru
         */
        private callForEmbeddedResource;
        /**
         * Získá soubor, na kterém se má provádět test. Tuto metodu volá podepisovací workflow.
         *
         * Soubor může být na serveru nebo ho nahrává uživatel, tato funkce zajistí získání souboru,
         *   nehledě na destinaci souboru
         * @param fileName název souboru pro fetch
         * @returns Promise s GFileInfoDto
         */
        private fetchFile;
        private callVerifySignature;
        /**
         * Collect + Validate + FetchFile
         * @returns fileInfoDto
         */
        private collectValidateFetchFilePromise;
        /**
         * 1) Provede podstrceni soucasne nastavenych parametru z gridu do ginis (pokud obsahují hesla, tak je zašifruje),
         * 2) zkusi podepsat,
         * 3) stahne podepsany soubor
         * 4) vrati ginis konfiguraci parametru do puvodni podoby
         * 5) odstrani docasny soubor
         * @param beforeSign Delegát funkce 'před podepsáním'
         */
        private runSign;
        /**
         * Akce - podepiš s výběrem důvodu podpisu jako v USU
         * @param beforeSign
         * @returns
         */
        private runSignAsUsu;
        /** Akce - ověř podpis */
        private runVerifySignature;
        private deleteFile;
        private showResultDialog;
    }
}
declare namespace Gordic.Adm.WebControls {
    class TestMail extends GContentBase {
        private mailTypes;
        private originalParameters;
        private dataValidators;
        private data;
        private ehloStr?;
        private paramFlag;
        private paramClass;
        private formRows;
        private lockableCls;
        private lastTokenValidationResult;
        private isOAuthGraphApi;
        private isOAuthDisabled;
        private isAutoLoggingEnabled;
        private srv;
        getSrv(): GContent;
        onContentReady(): void;
        setNewParams(params: Gordic.AdmIsl.Interface.GTestMailParamsDTO): void;
        applyModel(model?: Gordic.AdmIsl.Interface.GTestMailDTO): void;
        private createFormRowsOptions;
        private createTags;
        private collectModel;
        private applyValidators;
        private transformIntToBool;
        private transformStrToBool;
        private sslCheckboxName;
        private tlsCheckboxName;
        private protocolTypeFieldName;
        private isPswInVaultRadioName;
        private passwordFieldName;
        private oAuthProfileFieldName;
        private createForm;
        private disablePasswordField;
        /**
         * Sestaví promise chain pro získání hintů na rows a vrátí sestavenou promise
         * @param rows
         * @returns
         */
        private setRowHints;
        private _urovneElementSetter;
        private getUrovneElementSetter;
        /**
         * Nastaví na objekt GFormWorOptions hinty
         * @param row
         * @returns
         */
        private setRowTooltip;
        private createActions;
        private createCommandBar;
        private createMenu;
        private validateDefaultForm;
        private validateParams;
        private validatePort;
        private createDialogIfPortNotValid;
        /**
         * Nastaví validačníDto na OAuth objekt parametru.
         * OAuth lze validovat pouze na serveru, k volání tedy dojde před odesláním emailu.
         * @returns
         */
        private setNewOAuthValidity;
        private tokenValidationStateToString;
        /**
         * Pokus o odeslání mailu
         *
         * 1) dočasně injektuje tlsstep do db
         * 2) odešle mail
         * 3) ze snapshotu injektuje původní nastavení tlsstep
         */
        private runSendEmail;
        private performTestSendEmail;
        private _sendEmail;
        private showLogsWindow;
        private showParamsSettings;
    }
}
declare namespace Gordic.Adm.WebControls {
    class TestMailParamsSeznamDialog extends GContentBase {
        static readonly NS_CLS = "Gordic.Adm.WebControls.TestMailParamsSeznamDialog";
        private cnt;
        private dataParamArr;
        private formModel;
        private paramConfigArr;
        private datasetPromise;
        private dataset;
        private colNameTreeKey;
        private colNameSerial;
        private _srv;
        private getSrv;
        prepareContent(): void;
        private createGrid;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailEleServer extends GContentBase {
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
    class DetailEleServerObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GEleServerReadDto> {
        private srv;
        private changeZmenaDisku;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GEleServerSaveDto, close: boolean): void;
        saveDataSpec(data: Gordic.AdmIsl.Interface.GEleServerSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createValidatorPasswd;
        private createValidatorMirrorPasswd;
        createDiskyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createDiskyGroup(): IGTabGroupOptions;
        private actDiskServer;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamEleServer extends GContentBase<SeznamEleServerObj> {
        private seznamObj;
        onContentReady(): void;
        closing(): void;
    }
    class SeznamEleServerObj extends GAdmSeznamBase {
        fileGuids: string[];
        private srvCnt;
        private getServiceContent;
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
        getSxs(data: any): IGAdmGridSxs;
        private actDiskServer;
        private formTestEleUloziste;
        private formResultData;
        private deleteSoubor;
        removeFile(): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailEleServerDisk extends GContentBase {
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
    class DetailEleServerDiskObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GEleServerDiskReadDto> {
        private allow_mirror;
        private srv;
        private editAltParams;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GEleServerDiskSaveDto, close: boolean): void;
        saveDataSpec(data: Gordic.AdmIsl.Interface.GEleServerDiskSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getDataFromPasswordForm(ev: any, ctx: any, fieldName: any): void;
        private getHodnotySelect;
        private getHodnotaTxt;
        private createFormParametr;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamEleServerDisk extends GContentBase<SeznamEleServerDiskObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamEleServerDiskObj extends GAdmSeznamBase {
        server_name: string;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        openDetailSpecial(data: any, isNew: boolean, serverName: string): void;
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
        getSxs(data: any): IGAdmGridSxs;
        private createFormSelect;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailEleSkupinaUlozistResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GEleSkupinaUlozistReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GEleSkupinaUlozistReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailEleSkupinaUlozist extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - ixs_ulz */
        private ixs_ulz;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** Skryt� v�ech flash */
        private HideAllFlash;
        /** Zobraz� p��znaku �sp�n�ho ulo�en� */
        private ShowSaveSuccess;
        /** Zobraz� p��znaku chyby p�i ulo�en� dat */
        private ShowSaveError;
        /** Zobraz� p��znaku chyby p�i na�ten� dat */
        private ShowLoadError;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** vytvo�it commandbar */
        private createCommandBar;
        /** odstranit v�echny vlastn� t��dy ze statusbaru */
        private removeAllCustomClassOnStatusBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailEleSkupinaUlozistDlg(parentContent: GContent, opt: {
        /** ixs_ulz */
        ixs_ulz: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamEleSkupinaUlozistDlg(parentContent: GContent, opt: {
        /** ixs_ulz */
        ixs_ulz: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamEleSkupinaUlozist extends GContentBase<SeznamEleSkupinaUlozistDesigner> {
        private zobrazovatCisloObjektuKey;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * createMenuButtons
         */
        private createMenuButtons;
        /**
         * vytvo�it menu
         */
        private createMenuBar;
        private setMenuButtons;
        private novyZaznamButton;
        /**
         * detail button
         */
        private detailButton;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamEleSkupinaUlozistDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamEleSkupinaUlozistDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - ixs_ulz */
        ixs_ulz: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GEleSkupinaUlozistListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamEleSkupinaUlozistDesigner>, ixs_ulz: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamEleSkupinaUlozistDesigner>, ixs_ulz: string): Forms.Form;
        static applyAction(that: GContentType<SeznamEleSkupinaUlozistDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamEleSkupinaUlozistDesignerInit
         *
         * @param {GContentType<SeznamEleSkupinaUlozistDesigner>} that
         */
        static SeznamEleSkupinaUlozistDesignerInit(that: GContentType<SeznamEleSkupinaUlozistDesigner>, ixs_ulz: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailFunkceSchvalovaciRoleEpk extends GContentBase {
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
    class DetailFunkceSchvalovaciRoleEpkObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GFunkceSchvalovaciRoleEpkDto> {
        openFromFunkcniMisto: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GFunkceSchvalovaciRoleEpkDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceFunkceSchvalovaciRoleEpk extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class HromadnaOperaceFunkceSchvalovaciRoleEpkObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GFunkceSchvalovaciRoleEpkDto> {
        openFromFunkcniMisto: boolean;
        changeIxsFun: boolean;
        changeIxsSro: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamFunkceSchvalovaciRoleEpk extends GContentBase<SeznamFunkceSchvalovaciRoleEpkObj> {
        private seznamObj;
        onContentReady(): void;
        private getColumnOrder;
    }
    class SeznamFunkceSchvalovaciRoleEpkObj extends GAdmSeznamBase {
        ixs_sro: string;
        ixs_fun: string;
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
        getSxs(data: any): IGAdmGridSxs;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): 0 | 1 | 2;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailFunkceSchvalovaciSablonyEpk extends GContentBase {
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
    class DetailFunkceSchvalovaciSablonyEpkObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GFunkceSchvalovaciSablonyEpkDto> {
        openType: number;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GFunkceSchvalovaciSablonyEpkDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceFunkceSchvalovaciSablonyEpk extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class HromadnaOperaceFunkceSchvalovaciSablonyEpkObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GFunkceSchvalovaciSablonyEpkDto> {
        openFromFunkcniMisto: boolean;
        changeIxsFun: boolean;
        changeIxsSsa: boolean;
        povoleneRoleSablony: string[];
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
declare namespace Gordic.Adm.WebControls {
    class SeznamFunkceSchvalovaciSablonyEpk extends GContentBase<SeznamFunkceSchvalovaciSablonyEpkObj> {
        private seznamObj;
        onContentReady(): void;
        private getColumnOrder;
    }
    class SeznamFunkceSchvalovaciSablonyEpkObj extends GAdmSeznamBase {
        ixs_ssa: string;
        ixs_fun: string;
        ixs_sro: string;
        private getSrv;
        private openType;
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
        getSxs(data: any): IGAdmGridSxs;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): 0 | 1 | 2;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailSchvalovaciRoleEpk extends GContentBase {
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
    class DetailSchvalovaciRoleEpkObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GSchvalovaciRoleEpkReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GSchvalovaciRoleEpkSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private openSeznamFunkceSchvalovaciRoleEpk;
        getFunkceSchvalovaciRoleEpkTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getFunkceSchvalovaciRoleEpkGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamSchvalovaciRoleEpk extends GContentBase<SeznamSchvalovaciRoleEpkObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamSchvalovaciRoleEpkObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private openSeznamFunkceSchvalovaciRoleEpk;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailSchvalovaciSablonaEpk extends GContentBase {
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
    class DetailSchvalovaciSablonaEpkObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GSchvalovaciSablonaEpkReadDto> {
        srv: GContent;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GSchvalovaciSablonaEpkSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        private saveVazby;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private openSeznamFunkceSchvalovaciSablonaEpk;
        private openSeznamSchvalovaciSablonaEpkUkony;
        private openSeznamTypyDokumentuSchvalovaciSablonyEpk;
        getFunkceSchvalovaciSablonaEpkTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getSchvalovaciSablonaEpkUkonyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getTypyDokumentuSchvalovaciSablonyEpkTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getFunkceSchvalovaciSablonaEpkGroup(): IGTabGroupOptions;
        getSchvalovaciSablonaEpkUkonyGroup(): IGTabGroupOptions;
        getTypyDokumentuSchvalovaciSablonyEpkGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamSchvalovaciSablonaEpk extends GContentBase<SeznamSchvalovaciSablonaEpkObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamSchvalovaciSablonaEpkObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private openSeznamFunkceSchvalovaciSablonyEpk;
        private openSeznamSchvalovaciSablonaEpkUkony;
        private openSeznamTypyDokumentuSchvalovaciSablonyEpk;
        private openHromadnaOperaceAdmFunkceSchvalovaciSablonyEpk;
        private openHromadnaOperaceTypyDokumentuSchvalovaciSablonyEpk;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailSchvalovaciSablonaEpkUkony extends GContentBase {
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
    class DetailSchvalovaciSablonaEpkUkonyObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GSchvalovaciSablonaEpkUkonyDto> {
        private visualSignAllowed;
        private uploadVisualSignButtonName;
        private uploadVisualSignButton;
        private HandVisualSignPosition;
        private tempVisualPosition;
        private badgeUmisteni;
        private guids;
        private defaultSignConfig;
        private isPovolEpkPripominkoveRizeni;
        private isPovolTypPril;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GSchvalovaciSablonaEpkUkonyDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private updateBadgeUmisteniPodpisu;
        private loadVisualSignPositionIfExist;
        private contertVisualSignPositionDto;
        private addButtonUploadFileForVisualSign;
        private clearFileField;
        removeTempFiles(): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamSchvalovaciSablonaEpkUkony extends GContentBase<SeznamSchvalovaciSablonaEpkUkonyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamSchvalovaciSablonaEpkUkonyObj extends GAdmSeznamBase {
        ixs_ssa: string;
        isPovolTypPril: boolean;
        private srv;
        private getSrv;
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
        getSxs(data: any): IGAdmGridSxs;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailStupenSchvaleniEpk extends GContentBase {
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
    class DetailStupenSchvaleniEpkObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GStupenSchvaleniEpkReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GStupenSchvaleniEpkSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamStupenSchvaleniEpk extends GContentBase<SeznamStupenSchvaleniEpkObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamStupenSchvaleniEpkObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailTypyDokumentuSchvalovaciSablonyEpk extends GContentBase {
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
    class DetailTypyDokumentuSchvalovaciSablonyEpkObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GTypyDokumentuSchvalovaciSablonyEpkDto> {
        openSablona: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GTypyDokumentuSchvalovaciSablonyEpkDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceTypyDokumentuSchvalovaciSablonyEpk extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class HromadnaOperaceTypyDokumentuSchvalovaciSablonyEpkObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GTypyDokumentuSchvalovaciSablonyEpkDto> {
        openFromSchvalovaciSablona: boolean;
        changeIxsTyp: boolean;
        changeIxsSsa: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamTypyDokumentuSchvalovaciSablonyEpk extends GContentBase<SeznamTypyDokumentuSchvalovaciSablonyEpkObj> {
        private seznamObj;
        onContentReady(): void;
        private getColumnOrder;
    }
    class SeznamTypyDokumentuSchvalovaciSablonyEpkObj extends GAdmSeznamBase {
        ixs_ssa: string;
        ixs_typ: string;
        private openFromSablona;
        getSrv(): GContent;
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
        getSxs(data: any): IGAdmGridSxs;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): 0 | 1 | 2;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmAdlSoubor extends GContentBase<GSeznamAdmAdlSouborObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmAdlSouborObj extends GAdmSeznamBase {
        private ixs_gdt;
        private dat_start;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmBalikGdz extends GContentBase {
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
    class GDetailAdmBalikGdzObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmBalikGdzDto> {
        private serviceCnt;
        private runParams;
        private rpRunGwz;
        private getServiceContent;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmBalikGdzDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getHistorieSpusteniGroup(): IGTabGroupOptions;
        getHistorieSpusteniTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private createTooltip;
        private overitASpustitBalik;
        private runBalikGwz;
        private runGwzScirpt;
        private createFormRunGwzResult;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmBalikGdz extends GContentBase<GSeznamAdmBalikGdzObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmBalikGdzObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private serviceContent;
        private rpUplGwz;
        private getServiceContent;
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
        private saveGwzBalik;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmBudova extends GContentBase {
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
    class DetailAdmBudovaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmBudovaReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmBudovaSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        private saveDataSpecial;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createSegmentyBudovyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createMistnostiTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createPristupoveKliceTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createSegmentyBudovyGroup(): IGTabGroupOptions;
        createMistnostiGroup(): IGTabGroupOptions;
        createPristupoveKliceGroup(): IGTabGroupOptions;
        private actSegmentBudovy;
        private actMistnostiBudovy;
        private actPristupoveKlice;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmBudova extends GContentBase<SeznamAdmBudovaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmBudovaObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private actOpenSegmentyBudovy;
        private actOpenMistnostiBudovy;
        private actPristupoveKlice;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmClenPracovniSkupiny extends GContentBase {
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
    class GDetailAdmClenPracovniSkupinyObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmClenPracovniSkupinyDto> {
        private typyPrirazeni;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmClenPracovniSkupinyDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class GHromadnaOperaceAdmClenPracovniSkupiny extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class GHromadnaOperaceAdmClenPracovniSkupinyObj extends Gordic.Adx.WebControls.GAdxHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmClenPracovniSkupinyDto> {
        private ixs_wgp;
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
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmClenPracovniSkupiny extends GContentBase<GSeznamAdmClenPracovniSkupinyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmClenPracovniSkupinyObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private ixs_wgp;
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
        createHromadneDialog(): JQuery<HTMLElement> | null;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmDatabazovyProfil extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private admRpEdiextid;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmDatabazovyProfilObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmDatabazovyProfilDto> {
        private prizMsmValues;
        private isTestA495;
        private dbMatEnabled;
        private parametryDefault;
        private srv;
        private guids;
        private getSrv;
        openModal: boolean;
        returnValue: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmDatabazovyProfilDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createFormPassword;
        private createFormItem;
        private createFormFaze;
        private createItemtemplate;
        private createValidatorsDuplicita;
        private createValidatorsDuplicitaFaze;
        returnValueFunction(): any;
        private changePristupnost;
        private importData;
        private exportData;
        removeTempDirectory(): void;
        private connectToDb;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmDatabazovyProfil extends GContentBase<SeznamAdmDatabazovyProfilObj> {
        private seznamObj;
        private povolKtgSpu;
        onContentReady(): void;
    }
    class SeznamAdmDatabazovyProfilObj extends GAdmSeznamBase {
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
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmDatovaSchranka extends GContentBase {
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
    class DetailAdmDatovaSchrankaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmDatovaSchrankaReadDto> {
        private srv;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveBase(close: boolean): void;
        saveData(data: Gordic.AdmIsl.Interface.GAdmDatovaSchrankaSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createSpecialValidator;
        private hesloOpenFields;
        getAutomatickeMotoryTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getAutomatickeMotoryGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmDatovaSchranka extends GContentBase<SeznamAdmDatovaSchrankaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmDatovaSchrankaObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private openAdmMotorZpracovaniEpa;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmDefiniceMigraciPronom extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmDefiniceMigraciPronomObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmDefiniceMigraciPronomDto> {
        openModal: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmDefiniceMigraciPronomDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createValidatorSame;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmDefiniceMigraciPronom extends GContentBase<SeznamAdmDefiniceMigraciPronomObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmDefiniceMigraciPronomObj extends GAdmSeznamBase {
        private pronom_id_puv;
        private pronom_id_konc;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmDenikRak extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmDenikRakObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmDenikRakDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmDenikRakDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private porCisloDoValidator;
        private actDenikRakFunkcniMisto;
        getFunkcniMistaTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getFunkcniMistaGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmDenikRak extends GContentBase<SeznamAdmDenikRakObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmDenikRakObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private actDenikRakFunkcniMisto;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmDenikRakFunkcniMisto extends GContentBase {
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
    class DetailAdmDenikRakFunkcniMistoObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmDenikRakFunkcniMistoDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmDenikRakFunkcniMistoDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmDenikRakFunkcniMisto extends GContentBase<SeznamAdmDenikRakFunkcniMistoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmDenikRakFunkcniMistoObj extends GAdmSeznamBase {
        private ixp_den;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DialogLogsAib extends GContentBase {
        private cnt;
        private logs;
        private srv;
        private implementatorMail;
        private isPovolMail;
        getSrv(): GContent;
        prepareContent(): void;
        private init;
        private createActions;
        private createMenuBar;
        private createCommandBar;
        private loadLogy;
        private sendEmailDialog;
        private sendMailOk;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DialogTestAibConnectors extends GContentBase<DetailBase> {
        private view;
        private viewLicensed;
        private viewLicensedError;
        private viewNotLicensedAib;
        private viewNotLicensed;
        private viewNotExist;
        private basePanel;
        private basePanelLicensed;
        private basePanelLicensedError;
        private basePanelNotLicensedAib;
        private basePanelNotLicensed;
        private basePanelNotExist;
        private implementatorMail;
        private subject;
        private isDebug;
        private povolVersion;
        private aibUrl;
        private ishttp;
        private adxDiagPol;
        private isPovolMail;
        private isPovolZurnal;
        private diagnostikaAsyncTask;
        private messages;
        onContentReady(): void;
        private loadDiagnostikaNew;
        private initAsyncTask;
        private loadDiagnostika;
        private createActions;
        private createInfoFlash;
        private createMenuBar;
        private dialogEmail;
        private getDostupneKonektory;
        private sendMailOk;
        private testAibConnector;
        private loadLogyDialog;
        private loadLogyAibDb;
        private openRequestInfo;
        private loadLogyAibDbAll;
        private openHelp;
        private createItemTemplate;
        copyConnector(ev: any, ctx: any): void;
        private copyHromadne;
        createCsv(connector: Gordic.AdmIsl.Interface.GDiagnostikaAibKonektorDto): string;
        private checkProperties;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmLogAib extends GContentBase {
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
    class GDetailAdmLogAibObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmAibLogDbDto> {
        private isPovolExt;
        private isPovolRevizeAib;
        private isPovolWebConfigHash;
        private logs;
        private request;
        private response;
        private requestFile;
        private responseFile;
        private logFile;
        private tempDir;
        private serviceCnt;
        private guids;
        private guidsZip;
        private isPovolDownload;
        private isPovolDobaVKonektoru;
        private getServiceContent;
        removeTempDirectory(): void;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmAibLogDbDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getMetadataDetailPkFields(): {
            ser_cislo: number | null | undefined;
        };
        createLogsGroup(): IGTabGroupOptions;
        createRequestGroup(): IGTabGroupOptions;
        createResponseGroup(): IGTabGroupOptions;
        createLogsTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createRequestTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createResponseTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private createLogTab;
        private createRequestPanel;
        private createResponsePanel;
        private downloadFile;
        private getGuid;
        private downloadZip;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmLogAib extends GContentBase<DetailBase> {
        private modul_aib;
        private isPovolExt;
        private isPovolLog;
        private allowFilter;
        private isPovolRevizeAib;
        private grid;
        private form;
        private currentFilter;
        private isPovolDobaVKonektoru;
        private pocetZaznamuKey;
        private zobrazovatCisloObjektuKey;
        onContentReady(): void;
        private init;
        private createFilter;
        private createActions;
        private createBreadcrumbs;
        private collectData;
        private createFilterForm;
        private createGrid;
        private createGridFormat;
        private applyFunctionBase;
        private applyFunction;
        private createSidePanel;
        private refreshPanel;
        private createPanelData;
        private createFlash;
        private actFlashFilterNon;
        private openDetail;
        private createMenuBar;
        private actCopyToClipboard;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmEkoKonfiguraceInterniSubjekt extends GContentBase {
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
    class GDetailAdmEkoKonfiguraceInterniSubjektObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmEkoKonfiguraceInterniSubjektDto> {
        private isPovolDruhPoddruh;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmEkoKonfiguraceInterniSubjektDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmEkoKonfiguraceInterniSubjekt extends GContentBase<GSeznamAdmEkoKonfiguraceInterniSubjektObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmEkoKonfiguraceInterniSubjektObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private isPovolDruhPoddruh;
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
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmEsuUrovenPristupu extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmEsuUrovenPristupuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmEsuUrovenPristupuDto> {
        returnValue: boolean;
        openModal: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmEsuUrovenPristupuDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmEsuUrovenPristupu extends GContentBase<SeznamAdmEsuUrovenPristupuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmEsuUrovenPristupuObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmEvidencniObdobi extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmEvidencniObdobiObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmEvidencniObdobiDto> {
        private srv;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmEvidencniObdobiDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        updateGridBase(): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private checkValidatorEvidecniObdobi;
        private showWarning;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmEvidencniObdobi extends GContentBase<SeznamAdmEvidencniObdobiObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmEvidencniObdobiObj extends GAdmSeznamBase {
        private ico;
        private srv;
        private getSrv;
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
        getSxs(data: any): IGAdmGridSxs;
        private actDeleteEvidencniObdobi;
        private showWarning;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmFormatPronomId extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmFormatPronomIdObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmFormatPronomIdReadDto> {
        returnValue: boolean;
        openModal: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmFormatPronomIdSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createDefiniceMigraciNaslednikGroup(): IGTabGroupOptions;
        createDefiniceMigraciPredchudceGroup(): IGTabGroupOptions;
        createDefiniceMigraciNaslednikTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createDefiniceMigraciPredchudceTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private actDefiniceMigraciNaslednik;
        private actDefiniceMigraciPredchudce;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmFormatPronomId extends GContentBase<SeznamAdmFormatPronomIdObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmFormatPronomIdObj extends GAdmSeznamBase {
        private loadPronomIdAsyncClass;
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
        getSxs(data: any): IGAdmGridSxs;
        initAsyncTask(): void;
        private startAsyncTask;
        private actDefiniceMigraciNaslednik;
        private actDefiniceMigraciPredchudce;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmFunkcniMisto extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private adxCheckIcoNad;
        private gin_iszr_funrol;
        private agendyFunkce;
        private agendoveRoleFunkce;
        private admRpEdiextid;
        private isGinisAdm;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmFunkcniMistoObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmFunkcniMistoDto> {
        isPovolDeleteUserSettings: boolean;
        isPovolenaEvidenceOP: boolean;
        adxCheckIcoNad: number;
        prirazeneRoleAgendyIszr: GPrirazeneRoleAgendyISZR;
        agendyFunkce: Gordic.Adm.Interface.GSzrvaroExtDto[];
        agendoveRoleFunkce: Gordic.Adm.Interface.GSzrvfarExtDto[];
        newRecord: boolean;
        gin_iszr_funrol: number;
        isPovoleneSpisUzly: boolean;
        currentIxsSu: string;
        isPovolStanice: boolean;
        isDebug: boolean;
        srv: GContent;
        isPovolEkoModul: boolean;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmFunkcniMistoDto, close: boolean): any;
        private saveDataSpecial;
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
        private createFormPovoleneStanice;
        createPrirazeneAgendyRoleTab(): Gin.DetailBuilder.TabParamsId;
        createZastupyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createParametryTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createInstanceTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createKonfiguracniSkupinyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createUcetniStrediskaTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createUctarnyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createPovoleneIcoTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createPrirazenaNakladovaStrediskaTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createPrirazeneAgendyRoleGroup(): IGTabGroupOptions;
        createZastupyGroup(): IGTabGroupOptions;
        createParametryGroup(): IGTabGroupOptions;
        createInstanceGroup(): IGTabGroupOptions;
        createKonfiguracniSkupinyGroup(): IGTabGroupOptions;
        createUcetniStrediskaGroup(): IGTabGroupOptions;
        createUctarnyGroup(): IGTabGroupOptions;
        createPovoleneIcoGroup(): IGTabGroupOptions;
        createPrirazenaNakladovaStrediskaGroup(): IGTabGroupOptions;
        private openSeznamAdmFunkcniMistoKonfiguracniSkupina;
        private openSeznamZastup;
        private openSeznamAdmFunkcniMistoInstance;
        private openParametrySeznam;
        private openStrediskaUctovani;
        private openUctarny;
        private deleteuserSettings;
        private deleteuserSettingsNew;
        private dialogDeleteEkoinit;
        private openDetailOsoba;
        private openDetailOrganizacniJednotka;
        private openDetailSpisovyUzel;
        private openNadrizenaFunkce;
        private openSeznamSkupinyFunkciClen;
        private openSkupinaFunkciOpravneni;
        private openSeznamFunkceSchvalovaciRoleEpk;
        private openSeznamFunkceSchvalovaciSablonyEpk;
        private openSeznamNakladovaStrediskaFunkcnihoMista;
        private openSouhrnnyPrehledFunkce;
        private openPoctyDokladu;
        private predat;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DialogAdmFunkcniMistoDeleteEkonini extends GContentBase {
        private funkcniMista;
        private openFromDetail;
        prepareContent(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createFormEl;
        private actOK;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DialogAdmFunkcniMistoSpisovyUzel extends GContentBase {
        private dokumentyAsyncClass;
        private presunAsyncClass;
        private presunAsyncTaskId;
        private poctyDokumentuAsyncTaskId;
        private funkcni_mista;
        private ico;
        private formData;
        private defineData;
        private grid;
        onClose(): void;
        onContentReady(): void;
        private createActions;
        private createWizard;
        private createForm;
        private updateDataToGrid;
        private createGrid;
        private initAsyncTaskPoctyDokumentu;
        private initAsyncTaskPresun;
        private setDataToGrid;
        private getDokumentyFunkcnichMist;
        private startPresun;
        private actOk;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DialogAdmFunkcniMistoSpisovyUzelResult extends GContentBase {
        result: Gordic.AdmIsl.Interface.GPresunFunkcniMistoSpisovyUzelDto;
        grid: JQuery<HTMLElement>;
        prepareContent(): void;
        private createActions;
        private createCommandBar;
        private createMenuBar;
        private createGrid;
        private openFunkcniMisto;
    }
}
declare namespace Gordic.Adm.WebControls {
    function RegisterAdmFunkcniMistoSearchResolver(): void;
    class GAdmFunkcniMistoSearchResolver extends Components.Search.GBaseSearchResolver {
        protected getDefaultId(): string;
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        private readonly fuzzySearch;
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GPoctyDokladuFunkcniMisto extends GContentBase {
        private pocty;
        private gridPoctyDleAgendy;
        private gridPoctyDleStavu;
        private ixs_fun;
        private predatEnabled;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createActions;
        private createPoctyGroup;
        private createPoctyPodleAgendyGroup;
        private createPoctyPodleStavuGroup;
        private createPoctyTab;
        private createPoctyPodleAgendyTab;
        private createPoctyPodleStavuTab;
        private createPoctyCnt;
        private createFilterForm;
        private createResultForm;
        private createPoctyPisemnostiPodleAgendyGrid;
        private setDataPoctyDleAgendy;
        private createPoctyPisemnostiPodleStavuGrid;
        private setDataPoctyDleStavu;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GPredatFunkcniMistoDialog extends GContentBase {
        private dokumentyPredatAsyncTask;
        private dokumentyPredatTaskId;
        private gridPodleAgendy;
        private gridPredPredavanim;
        private gridStavy;
        private gridDokumenty;
        private faze;
        private ixs_fun;
        private vybraneAgendy;
        private vybraneStavy;
        private options;
        private pisemnostiPodleAgendy;
        private vybraneDokumenty;
        private settingParametr;
        onContentReady(): void;
        private init;
        private createActions;
        private createWizard;
        private createForm;
        private createValidatorFunkcniMisto;
        private getDataFromForm;
        private createGridAgendy;
        private createGridPristupneAgendy;
        private updateGridCount;
        private getAgendy;
        private createGridStavy;
        private setListPoctyDleStavu;
        private updateGridCountStav;
        private getStavyFromGrid;
        private createGridDokumenty;
        private setPisemnostiGrid;
        private getDokumenty;
        private createSouhrnContent;
        private getVybraneDokumenty;
        private createFormSouhrn;
        private initAsyncTaskPredat;
        private startPredani;
        private getSettingNumber;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GPredatFunkcniMistoDialogResult extends GContentBase {
        private data;
        private grid;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        private createActions;
        private createForm;
        private createPredaneDokumentyGroup;
        private createPredaneDokumentyTab;
        private createGridPredaneDokumenty;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmFunkcniMisto extends GContentBase<SeznamAdmFunkcniMistoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmFunkcniMistoObj extends GAdmSeznamBase {
        isPovolDeleteUserSettings: boolean;
        isPovoleneSpisUzly: boolean;
        ixs_ref: string;
        ixs_su: string;
        isGinisAdm: boolean;
        isPovolEkoModul: boolean;
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
        getSxs(data: any): IGAdmGridSxs;
        getDataCount(): JQueryPromise<Gordic.AdmIsl.Interface.GAdmCountData> | null;
        private openSeznamAdmFunkcniMistoKonfiguracniSkupina;
        private openSeznamZastup;
        private openSeznamAdmFunkcniMistoInstance;
        private openHromadnaOperaceAdmKonfiguracniSkupinaProgramovaInstance;
        private openHromadnaOperaceAdmFunkcniMistoKonfiguracniSkupina;
        private openSeznamParametry;
        private deleteUserSettings;
        private dialogDeleteUserSettings;
        private dialogDeleteEkoinit;
        private openSeznamAdeUcetniStrediskoFunkcniMisto;
        private openSeznamAdeUctarnyFunkcniMisto;
        private openNavazanaNakladovaStrediskaFunkcnihoMista;
        private openHromadnePriraditNakladovaStrediska;
        private openHromadnePriraditUcetniStrediska;
        private openHromadnePriraditUctarny;
        private openSeznamSkupinyFunkciClen;
        private openSkupinaFunkciOpravneni;
        private openSeznamFunkceSchvalovaciRoleEpk;
        private openSeznamFunkceSchvalovaciSablonyEpk;
        private openActPresunoutFunkcniMistaSpisovyUzel;
        private openVedlejsiSpisoveUzly;
        private povolenaIcaProAdministraci;
        private openSouhrnnyPrehledFunkce;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmFunkcniMistoKonfiguracniSkupina extends GContentBase {
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
    class DetailAdmFunkcniMistoKonfiguracniSkupinaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmFunkcniMistoKonfiguracniSkupinaDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmFunkcniMistoKonfiguracniSkupinaDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmFunkcniMistoKonfiguracniSkupina extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmFunkcniMistoKonfiguracniSkupinaObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmFunkcniMistoKonfiguracniSkupinaDto> {
        private changeIxsFun;
        private changeIxsUsr;
        openFromKonfiguracniSkupina: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmFunkcniMistoKonfiguracniSkupina extends GContentBase<SeznamAdmFunkcniMistoKonfiguracniSkupinaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmFunkcniMistoKonfiguracniSkupinaObj extends GAdmSeznamBase {
        ixs_usr: string;
        ixs_fun: string;
        private getSrv;
        getColumnOrder(): string;
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
        getSxs(data: any): IGAdmGridSxs;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): 0 | 1 | 2;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmFunkcniMistoPovoleneIco extends GContentBase {
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
    class GDetailAdmFunkcniMistoPovoleneIcoObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmFunkcniMistoPovoleneIcoDto> {
        openFromFunkcniMisto: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmFunkcniMistoPovoleneIcoDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmFunkcniMistoPovoleneIco extends GContentBase<GSeznamAdmFunkcniMistoPovoleneIcoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmFunkcniMistoPovoleneIcoObj extends GAdmSeznamBase {
        private ixs_fun;
        private ico;
        private openFromFunkcniMisto;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmHistorieParametru extends GContentBase<GSeznamAdmHistorieParametruObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmHistorieParametruObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
        getDataCount(): JQueryPromise<Gordic.Adx.Interface.GAdxCountData> | null;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmHistorieSpusteniGdz extends GContentBase {
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
    class GDetailAdmHistorieSpusteniGdzObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmHistorieSpusteniGdzDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmHistorieSpusteniGdzDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getAdlSouboryTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getAdlSouboryGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmHistorieSpusteniGdz extends GContentBase<GSeznamAdmHistorieSpusteniGdzObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmHistorieSpusteniGdzObj extends GAdmSeznamBase {
        ixs_gdt: string;
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
        getSxs(data: any): IGAdmGridSxs;
        createGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmInterniSubjekt extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmInterniSubjektObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmInterniSubjektDto> {
        isPovolEkoModul: boolean;
        private ginn23adm;
        private povolCultur;
        private oddelovace;
        getGin23Adm(): boolean;
        updateFields(): void;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmInterniSubjektDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createEvidencniObdobiTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createEvidencniObdobiGroup(): IGTabGroupOptions;
        private createSpecialValidator;
        private extIs;
        private getOddelovac;
        createEkoKonfiguraceTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createEkoKonfiguraceGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmIszrInterniSubjekt extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
    }
    class GDetailAdmIszrInterniSubjektObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmIszrInterniSubjektDto> {
        private srv;
        private isPovolCrv;
        private isPovolAutCer;
        private addCertifikat;
        private isPovolEkoSubmodel;
        private fileGuid;
        private autCertifikat;
        private guids;
        private getSrv;
        removeTempFile(): gjqXHR<any> | undefined;
        updateFields(): void;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmIszrInterniSubjektDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createValidatorPasswd;
        private addCertifikatAct;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmInterniSubjekt extends GContentBase<SeznamAdmInterniSubjektObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmInterniSubjektObj extends GAdmSeznamBase {
        private isPovolEkoModul;
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
        getSxs(data: any): IGAdmGridSxs;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
        private ekoKonfiguraceInternihoSubjektu;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GAdmKalendarDialog extends GContentBase {
        private form;
        private maxRok;
        private generovatKalendarAsyncTaskId;
        private generovatKalendarAsyncClassName;
        onContentReady(): void;
        private init;
        private createFlash;
        private createActions;
        private createCommandBar;
        private createForm;
        private generovat;
        private initAsyncGenerovatKalendar;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmKategorieDokumentu extends GContentBase {
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
    class GDetailAdmKategorieDokumentuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmKategorieDokumentuDto> {
        private isPovolenEkoModul;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmKategorieDokumentuDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmKategorieDokumentu extends GContentBase<GSeznamAdmKategorieDokumentuObj> {
        private seznamObj;
        private isPovolenEkoModul;
        onContentReady(): void;
    }
    class GSeznamAdmKategorieDokumentuObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmKonfiguracniSkupina extends GContentBase {
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
    class DetailAdmKonfiguracniSkupinaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmKonfiguracniSkupinaReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmKonfiguracniSkupinaSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createFunkcniMistaGroup(): IGTabGroupOptions;
        createInstanceGroup(): IGTabGroupOptions;
        createFunkcniMistaTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createInstanceTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Adm.WebControls.AdmKonfiguracniSkupina {
    function openSeznamAdmKonfiguracniSkupinaProgramovaInstance(data: any): void;
    function openSeznamAdmFunkcniMistoKonfiguracniSkupina(data: any): void;
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmKonfiguracniSkupina extends GContentBase<SeznamAdmKonfiguracniSkupinaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmKonfiguracniSkupinaObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private openHromadnaOperaceAdmKonfiguracniSkupinaProgramovaInstance;
        private openHromadnaOperaceAdmFunkcniMistoKonfiguracniSkupina;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmKonfiguracniSkupinaProgramovaInstance extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private isFunkcniMisto;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmKonfiguracniSkupinaProgramovaInstanceObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmKonfiguracniSkupinaProgramovaInstanceDto> {
        isFunkcniMisto: boolean;
        isPovolLic: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmKonfiguracniSkupinaProgramovaInstanceDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmKonfiguracniSkupinaProgramovaInstance extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmKonfiguracniSkupinaProgramovaInstanceObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmKonfiguracniSkupinaProgramovaInstanceDto> {
        typ_usr: number;
        openFromInstance: boolean;
        change: boolean;
        isPovolLic: boolean;
        lic: string;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmKonfiguracniSkupinaProgramovaInstance extends GContentBase<SeznamAdmKonfiguracniSkupinaProgramovaInstanceObj> {
        private seznamObj;
        onContentReady(): void;
        private getColumnOrder;
    }
    class SeznamAdmKonfiguracniSkupinaProgramovaInstanceObj extends GAdmSeznamBase {
        ixs_usr: string;
        ixs_ins: string;
        ixs_fun: string;
        typ_usr: number;
        isPovolLic: boolean;
        private funkcniMisto;
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
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
        createContentCaptionExtend(): string;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): 0 | 1 | 2;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmLangAiAplikace extends GContentBase {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GDetailAdmLangAiAplikace";
        static readonly ID: "DetailAdmLangAiAplikace";
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
    class GDetailAdmLangAiAplikaceObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmLangAiAplikaceDto> {
        private ixs_lmd;
        private lastModelTokenLimit;
        private usableBadgeObs;
        static pingApp(cnt: GContent, ixsLap: string): JQueryPromise<AdmIsl.Interface.GAdmLangAiPingResultDto>;
        static pingModel(cnt: GContent, ixsLmd: string): JQueryPromise<AdmIsl.Interface.GAdmLangAiPingResultDto>;
        static addNotificationWithPingResult(cnt: GContent, result: AdmIsl.Interface.GAdmLangAiPingResultDto): JQueryPromise<AdmIsl.Interface.GAdmLangAiPingResultDto>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmLangAiAplikaceDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        createInactiveTablesBadgeObs(): GBadgeOptions | null;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private tabIndexesName;
        createNapojeniAplikaceGroup(): IGTabGroupOptions;
        createNapojeniAplikaceTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmLangAiAplikace extends GContentBase<GSeznamAdmLangAiAplikaceObj> {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GSeznamAdmLangAiAplikace";
        static readonly ID: "SeznamAdmLangAiAplikace";
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmLangAiAplikaceObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private ixs_lmd;
        create(): void;
        openDetail(model: AdmIsl.Interface.GAdmLangAiAplikaceDto, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: Record<string, string>): void;
        selectionGridAct(objArr: IGGridSelection<AdmIsl.Interface.GAdmLangAiAplikaceDto[]>): void;
        getNazev(data: any): string;
        getGridFormat(): Data.GridFormat<AdmIsl.Interface.GAdmLangAiAplikaceDto>;
    }
    /**
     * Prefaby pro vytváření běžných ikon a textů pro AI aplikace a související enum tabulky.
     */
    class GAdmLangAiAplikacePrefabs {
        /**
         * Vytvoří ikonu, text a tooltip pro typ aplikace.
         * @param lapTyp
         * @returns
         */
        static lapTypIconTemplate(lapTyp: Ginis.DbModel.GGinclapEnum): IconTemplate;
        /**
         * Vytvoří ikonu, text a tooltip pro typ výstupu aplikace.
         * @param lapTypVystupTyp
         * @returns
         */
        static lapTypVystupIconTemplate(lapTypVystupTyp: Ginis.DbModel.GGinclvyEnum): IconTemplate;
        /**
         *RC 35000307 : Všechny použité záznamy jsou aktivní, aplikace může být pro uživatele <b>zobrazitelná</b>. Viditelnost pro uživatele lze nastavit v úloze
         *RC 35000217 : Napojení AI aplikace na Ginis
         *
         */
        private static readonly TOOLTIP_BR;
        /**
         *
         * @param inactiveTables
         * @param valueTrue default Zobrazitelná
         * @param valueFalse default Nezobrazitelná
         * @returns
         */
        static createInactiveTablesBadgePrefab(inactiveTables: AdmIsl.Interface.GAdmLangAiAktivityTabulkyEnum[] | undefined | null, valueTrue?: string, //RC 35000303 : Zobrazitelná
        valueFalse?: string): GBadgeOptions;
        static createInactiveTablesIconTemplate(inactiveTables: AdmIsl.Interface.GAdmLangAiAktivityTabulkyEnum[] | undefined | null): IconTemplate;
        static getInactiveTablesCaption(inactiveTables: AdmIsl.Interface.GAdmLangAiAktivityTabulkyEnum[]): string;
        static getInactiveTableCaption(records: AdmIsl.Interface.GAdmLangAiAktivityTabulkyEnum): string;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmLangAiDatovyIndex extends GContentBase {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GDetailAdmLangAiDatovyIndex";
        static readonly ID: "DetailAdmLangAiDatovyIndex";
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
    class GDetailAdmLangAiDatovyIndexObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmLangAiDatovyIndexDto> {
        private ixs_ldz;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmLangAiDatovyIndexDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmLangAiDatovyIndex extends GContentBase<GSeznamAdmLangAiDatovyIndexObj> {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GSeznamAdmLangAiDatovyIndex";
        static readonly ID: "SeznamAdmLangAiDatovyIndex";
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmLangAiDatovyIndexObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        ixs_ldz: string;
        create(): void;
        openDetail(model: AdmIsl.Interface.GAdmLangAiDatovyIndexDto, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: Record<string, string>): void;
        selectionGridAct(objArr: IGGridSelection<AdmIsl.Interface.GAdmLangAiDatovyIndexDto[]>): void;
        getNazev(data: any): string;
        getGridFormat(): Data.GridFormat<AdmIsl.Interface.GAdmLangAiDatovyIndexDto>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmLangAiDatovyZdroj extends GContentBase {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GDetailAdmLangAiDatovyZdroj";
        static readonly ID: "DetailAdmLangAiDatovyZdroj";
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
    class GDetailAdmLangAiDatovyZdrojObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmLangAiDatovyZdrojDto> {
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmLangAiDatovyZdrojDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private tabIndexesName;
        createIndexesGroup(): IGTabGroupOptions;
        createIndexesTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmLangAiDatovyZdroj extends GContentBase<GSeznamAdmLangAiDatovyZdrojObj> {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GSeznamAdmLangAiDatovyZdroj";
        static readonly ID: "SeznamAdmLangAiDatovyZdroj";
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmLangAiDatovyZdrojObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        create(): void;
        openDetail(model: AdmIsl.Interface.GAdmLangAiDatovyZdrojDto, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<AdmIsl.Interface.GAdmLangAiDatovyZdrojDto[]>): void;
        getNazev(data: any): string;
        getGridFormat(): Data.GridFormat<AdmIsl.Interface.GAdmLangAiDatovyZdrojDto>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmLangAiModel extends GContentBase {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GDetailAdmLangAiModel";
        static readonly ID: "DetailAdmLangAiModel";
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
    class GDetailAdmLangAiModelObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmLangAiModelDto> {
        private ixs_lps;
        private modelApiView;
        private apis;
        private modelApiDict;
        static pingModel(cnt: GContent, data: AdmIsl.Interface.GAdmLangAiModelDto): JQueryPromise<AdmIsl.Interface.GAdmLangAiPingResultDto>;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmLangAiModelDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        private collectThenValidate;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private tabAppsName;
        createAppsGroup(): IGTabGroupOptions;
        createAppsTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmLangAiModel extends GContentBase<GSeznamAdmLangAiModelObj> {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GSeznamAdmLangAiModel";
        static readonly ID: "SeznamAdmLangAiModel";
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmLangAiModelObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private ixs_lps;
        create(): void;
        openDetail(model: AdmIsl.Interface.GAdmLangAiModelDto, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: Record<string, string>): void;
        selectionGridAct(objArr: IGGridSelection<AdmIsl.Interface.GAdmLangAiModelDto[]>): void;
        getNazev(data: any): string;
        getGridFormat(): Data.GridFormat<AdmIsl.Interface.GAdmLangAiModelDto>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmLangAiNapojeni extends GContentBase {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GDetailAdmLangAiNapojeni";
        static readonly ID: "DetailAdmLangAiNapojeni";
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
    class GDetailAdmLangAiNapojeniObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmLangAiNapojeniDto> {
        private ixs_lap;
        private appDto;
        private usableBadgeObs;
        create(): void;
        textPopis(): string | undefined | null;
        createInactiveTablesBadgeObs(): GBadgeOptions | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmLangAiNapojeniDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private tabIndexesName;
        createNapojeniGroup(): IGTabGroupOptions;
        createNapojeniTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmLangAiNapojeni extends GContentBase<GSeznamAdmLangAiNapojeniObj> {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GSeznamAdmLangAiNapojeni";
        static readonly ID: "SeznamAdmLangAiNapojeni";
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmLangAiNapojeniObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private ixs_lap;
        create(): void;
        openDetail(model: AdmIsl.Interface.GAdmLangAiNapojeniDto, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: Record<string, string>): void;
        selectionGridAct(objArr: IGGridSelection<AdmIsl.Interface.GAdmLangAiNapojeniDto[]>): void;
        getNazev(data: any): string;
        getGridFormat(): Data.GridFormat<AdmIsl.Interface.GAdmLangAiNapojeniDto>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmLangAiPredplatne extends GContentBase {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GDetailAdmLangAiPredplatne";
        static readonly ID: "DetailAdmLangAiPredplatne";
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
    class GDetailAdmLangAiPredplatneObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmLangAiPredplatneDto> {
        private shouldOAuthValidate;
        private passwdConfig;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmLangAiPredplatneDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private passwordTemporaryValue;
        private activateOAuth;
        private deactivateOAuth;
        createModelyGroup(): IGTabGroupOptions;
        createModelyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmLangAiPredplatne extends GContentBase<GSeznamAdmLangAiPredplatneObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmLangAiPredplatneObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        create(): void;
        openDetail(model: AdmIsl.Interface.GAdmLangAiPredplatneDto, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<AdmIsl.Interface.GAdmLangAiPredplatneDto[]>): void;
        getNazev(data: any): string;
        getGridFormat(): Data.GridFormat<AdmIsl.Interface.GAdmLangAiPredplatneDto>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmLangAiScenar extends GContentBase {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GDetailAdmLangAiScenar";
        static readonly ID: "DetailAdmLangAiScenar";
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
    class GDetailAdmLangAiScenarObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmLangAiScenarDto> {
        private ixs_lsc;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmLangAiScenarDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private tabVyuzitiName;
        createVyuzitiScenareGroup(): IGTabGroupOptions;
        createVyuzitiScenareTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmLangAiScenar extends GContentBase<GSeznamAdmLangAiScenarObj> {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GSeznamAdmLangAiScenar";
        static readonly ID: "SeznamAdmLangAiScenar";
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmLangAiScenarObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        create(): void;
        openDetail(model: AdmIsl.Interface.GAdmLangAiScenarDto, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: Record<string, string>): void;
        selectionGridAct(objArr: IGGridSelection<AdmIsl.Interface.GAdmLangAiScenarDto[]>): void;
        getNazev(data: any): string;
        getGridFormat(): Data.GridFormat<AdmIsl.Interface.GAdmLangAiScenarDto>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmLangAiVScenar extends GContentBase {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GDetailAdmLangAiVScenar";
        static readonly ID: "DetailAdmLangAiVScenar";
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
    class GDetailAdmLangAiVScenarObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmLangAiVScenarDto> {
        private ixs_lsc;
        private ixs_lap;
        private lgcontent;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmLangAiVScenarDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private tabIndexesName;
        createVyuzitiSeznamGroup(): IGTabGroupOptions;
        createVyuzitiSeznamTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmLangAiVScenar extends GContentBase<GSeznamAdmLangAiVScenarObj> {
        static readonly NAMESPACE_CLASS: "Gordic.Adm.WebControls.GSeznamAdmLangAiVScenar";
        static readonly ID: "SeznamAdmLangAiVScenar";
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmLangAiVScenarObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private ixs_lsc;
        create(): void;
        openDetail(model: AdmIsl.Interface.GAdmLangAiVScenarDto, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: Record<string, string>): void;
        selectionGridAct(objArr: IGGridSelection<AdmIsl.Interface.GAdmLangAiVScenarDto[]>): void;
        getNazev(data: any): string;
        getGridFormat(): Data.GridFormat<AdmIsl.Interface.GAdmLangAiVScenarDto>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmMailSchranka extends GContentBase {
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
    class DetailAdmMailSchrankaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmMailSchrankaReadDto> {
        private srv;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveBase(close: boolean): void;
        saveData(data: Gordic.AdmIsl.Interface.GAdmMailSchrankaSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createSpecialValidator;
        private hesloOpenFields;
        getAutomatickeMotoryTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getAutomatickeMotoryGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmMailSchranka extends GContentBase<SeznamAdmMailSchrankaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmMailSchrankaObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private openAdmMotorZpracovaniEpa;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmMistnost extends GContentBase {
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
    class DetailAdmMistnostObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmMistnostReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmMistnostSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        private saveDataSpecial;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createSimpleForm;
        createPristupoveKliceTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createPristupoveKliceGroup(): IGTabGroupOptions;
        private pristupoveKliceAct;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmMistnost extends GContentBase<SeznamAdmMistnostObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmMistnostObj extends GAdmSeznamBase {
        private ico;
        private budova_kod;
        private segment_kod;
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
        getSxs(data: any): IGAdmGridSxs;
        private actOpenPristupoveKlice;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmMotorZpracovaniEPA extends GContentBase {
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
    class DetailAdmMotorZpracovaniEPAObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmMotorZpracovaniEPAReadDto> {
        typ_mbx: number;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmMotorZpracovaniEPASaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmMotorZpracovaniEPA extends GContentBase<SeznamAdmMotorZpracovaniEPAObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmMotorZpracovaniEPAObj extends GAdmSeznamBase {
        typ_mbx: number;
        mailbox: string;
        isGinUpsrPovol: boolean;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmOAuthLog extends GContentBase<GSeznamAdmOAuthLogObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmOAuthLogObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private isPovolUdalostProcesId;
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
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmOAuthProfil extends GContentBase {
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
    class DetailAdmOAuthProfilObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmOAuthProfilReadDto> {
        private srv;
        private povolPrompt;
        private povolCs;
        private ixsNathanVytezovac;
        private povolAdministraceOcrVytezovac;
        private permissionNathanVytezovac;
        private debugOrDevelop;
        private ico;
        private ginBankUrl;
        private isPovolParametry;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveBase(close: boolean): void;
        private importantChange;
        saveData(data: Gordic.AdmIsl.Interface.GAdmOAuthProfilSaveDto, close: boolean): gjqXHR<any>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createValidatorsParametry;
        private typClouduChange;
        private urlError;
        consentInfo(): void;
        private upsertNathanVytezovac;
        private actOAuthProfileDialog;
        private createValidatorClSec;
        private createFormParametry;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmOAuthProfil extends GContentBase<SeznamAdmOAuthProfilObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmOAuthProfilObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private actOAuthProfileDialog;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmObsahLicCertNew extends GContentBase<GSeznamAdmObsahLicCertObjNew> {
        private seznamObj;
        onContentReady(): void;
        onClose(): void;
    }
    class GSeznamAdmObsahLicCertObjNew extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private temporaryFiles;
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
        closeAction(): void;
        private getServiceCnt;
        private openUploadLicCer;
        private licCerDialogOk;
        private initAsyncTask;
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamVyuzitiLicenci extends GContentBase {
        private gridEl;
        private faze;
        prepareContent(): void;
        private init;
        private createGrid;
        private setDataToGrid;
        private createActions;
        private createCommandBar;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmObsahLicCert extends GContentBase<SeznamAdmObsahLicCertObj> {
        private seznamObj;
        onContentReady(): void;
        onClose(): void;
    }
    class SeznamAdmObsahLicCertObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private temporaryFiles;
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
        closeAction(): void;
        private getServiceCnt;
        private openUploadLicCer;
        private licCerDialogOk;
        private initAsyncTask;
        getGridFormat(): Gordic.Data.GridFormat;
        createCondFormats(): Gordic.Components.Grid.CondFormats.CondFormat[];
        private openVyuzitiLicenci;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmOcrVytezovac extends GContentBase {
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
    class GDetailAdmOcrVytezovacObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmOcrVytezovacDto> {
        private isPovolNazev;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmOcrVytezovacDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmOcrVytezovac extends GContentBase<GSeznamAdmOcrVytezovacObj> {
        private seznamObj;
        private isPovolNazev;
        onContentReady(): void;
    }
    class GSeznamAdmOcrVytezovacObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmOpravneniKVecneSkupine extends GContentBase {
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
    class GDetailAdmOpravneniKVecneSkupineObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmOpravneniKVecneSkupineDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmOpravneniKVecneSkupineDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class GHromadnaOperaceAdmOpravneniKVecneSkupine extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class GHromadnaOperaceAdmOpravneniKVecneSkupineObj extends Gordic.Adx.WebControls.GAdxHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmOpravneniKVecneSkupineDto> {
        openFromFunkcniMisto: boolean;
        changeIxsFun: boolean;
        changeIxsVsk: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmOpravneniKVecneSkupine extends GContentBase<GSeznamAdmOpravneniKVecneSkupineObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmOpravneniKVecneSkupineObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private ixs_vsk;
        private getSrv;
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
        getSxs(data: any): IGAdmGridSxs;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmOsoba extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private adxCheckIcoNad;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private isPovolPodpis;
        private admRpEdiextid;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmOsobaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmOsobaDto> {
        adxCheckIcoNad: number;
        povoleniUrovnePristupu: boolean;
        podpis: string;
        extension: string;
        panel: JQuery<HTMLElement>;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmOsobaDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private openSeznamAdmOsobaCertifikat;
        private urovnePristupuOsoby;
        private deleteuserSettings;
        private deleteUserSettingsNew;
        private openSignOsobaForm;
        createZastupyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createPrirazeneCertifikatyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createZadostiCertifikatyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createPodpisTab(): {
            tabParams: {
                id: string;
                title: string;
                opened: boolean;
                locked: boolean;
                group: {
                    id: string;
                };
                menuBar: {
                    action: GAction | undefined;
                    favorite: boolean;
                }[];
            };
            init: (tab: JQuery<HTMLElement>) => void;
        };
        createAdmPrihlaseniUzivateleTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createZastupyGroup(): IGTabGroupOptions;
        createPrirazeneCertifikatyGroup(): IGTabGroupOptions;
        createZadostiCertifikatyGroup(): IGTabGroupOptions;
        createPodpisGroup(): IGTabGroupOptions;
        createAdmPrihlaseniUzivateleGroup(): IGTabGroupOptions;
        private createCntPodpis;
        private funkcniMistaOsoby;
        private changeCredentials;
        private changeAltCredentials;
        private openDetailSpisovyUzel;
        private openSouhrnnyPrehledFunkce;
        private openPrihlaseniOsoby;
    }
}
declare namespace Gordic.Adm.WebControls {
    function RegisterAdmOsobaSearchResolver(): void;
    class GAdmOsobaSearchResolver extends Components.Search.GBaseSearchResolver {
        protected getDefaultId(): string;
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        private readonly fuzzySearch;
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmOsoba extends GContentBase<SeznamAdmOsobaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmOsobaObj extends GAdmSeznamBase {
        ginsPassZak: number;
        povoleniUrovnePristupu: boolean;
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
        getSxs(data: any): IGAdmGridSxs;
        private openForbiddenPasswords;
        private funkcniMistaOsoby;
        private urovnePristupuOsoby;
        private openSeznamAdmOsobaCertifikat;
        private dialogDeleteUserSettings;
        private openSouhrnnyPrehledFunkce;
        private openPrihlaseniOsoby;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmOsobaCertifikat extends GContentBase {
        private dataListDescription;
        private data;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmOsobaCertifikatObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmOsobaCertifikatListDto> {
        dataListDescription: Gordic.General.ApplicationInterface.GDataListDescription;
        filterObj: any;
        gridRc: Gordic.Components.GridRC<any>;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmOsobaCertifikatSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private nextAndPreviousActionSpecial;
        private getCaption;
        private downloadCertificate;
        private changeAktivitaCer;
        private saveAktivitaCer;
        private updateDataInGrid;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmOsobaCertifikat extends GContentBase<SeznamAdmOsobaCertifikatObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmOsobaCertifikatObj extends GAdmSeznamBase {
        ixs: string;
        prirazeneCertifikaty: boolean;
        isPrirazeneCertifikaty(): boolean;
        private getServiceCnt;
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
        getSxs(data: any): IGAdmGridSxs;
        private createCertifikatNew;
        private createCertifikatSave;
        private updateDataInGrid;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
        private schvalitZadost;
        private zamitnoutZadost;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmParametrGlobal extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private uroven_cfg;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
        createContentCaption(): string;
    }
    class DetailAdmParametrGlobalObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmParametrGlobalReadDto> {
        uroven_cfg: number;
        copyBool: boolean;
        allowCopy: boolean;
        private currentConfigValue;
        private currentParamInfo;
        private srv;
        private gridParametryVsechnyUrovne;
        private gridHistorieParametru;
        private configData;
        private dataCiselniku;
        private currentSubjectName;
        strediskoName: string;
        /**
         * ---------------------------------------------------------
         * preklopil jsem side panel do na obecnejsi interface/impl
         * ---------------------------------------------------------
         * @since 2024/03/19, chnaged by @author pdohnal
         */
        private _sidePanelGetter;
        private sidePanelGetter;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        getParametryVsechnyUrovneTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getParametryVsechnyUrovneGroup(): IGTabGroupOptions;
        createGridParametryVsechnyUrovne(tab: any): void;
        loadGridParametryVsechnyUrovne(): void;
        getHistorieParametruTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getHistorieParametruGroup(): IGTabGroupOptions;
        loadGridHistorieParametru(): void;
        createGridHistorieParametru(tab: any): void;
        getParametrInfoSidebar(): Gordic.Gin.DetailBuilder.GDetailBuilderSbpanelOptionsId;
        saveData(data: Gordic.AdmIsl.Interface.GAdmParametrGlobalSaveDto, close: boolean): any;
        protected saveBase(close: boolean): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        private convertValueDoSaveObject;
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
        private changeSubjectCheckParametr;
        private checkParametrIsExist;
        afterCreatingForm(): void;
        private createSubjectField;
        private createServerFiltersParam;
        private copyParam;
        private openDetailJinaUroven;
        private createSpecialValidator;
    }
}
declare namespace Gordic.Adm.WebControls.FunctionsAdmParametrGlobal {
    function createContenxtHelpString(uroven: number): string;
    function createActionSettings(cnt: GContent): GActionParamsDefObj;
}
declare namespace Gordic.Adm.WebControls {
    class GAdmParametrGlobalResult extends GContentBase {
        private result;
        prepareContent(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createGrid;
    }
}
declare namespace Gordic.Adm.WebControls {
    function RegisterAdmParametrGlobalSearchResolver(): void;
    class GAdmParametrGlobalSearchResolver extends Components.Search.GBaseSearchResolver {
        protected getDefaultId(): string;
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        private readonly fuzzySearch;
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GCopyParametryZVyberoveSkupiny extends GContentBase {
        private uroven_cfg;
        private ixs;
        private strediskoName;
        private dataNizsiCiselnik;
        private gridVyberovaSkupina;
        private gridPredUlozenim;
        private selectedData;
        private formData;
        private result;
        onContentReady(): void;
        private init;
        private createWizard;
        private createForm;
        private createGridVyberovaSkupina;
        private getDataFromForm;
        private createGridPredUlozenim;
        private saveDataFromGrid;
        private createResultGrid;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmParametrGlobal extends GContentBase<SeznamAdmParametrGlobalObj> {
        private seznamObj;
        private getContentCaption;
        onContentReady(): void;
    }
    class SeznamAdmParametrGlobalObj extends GAdmSeznamBase {
        uroven_cfg: number;
        urovenCfgTxt: string;
        faze: string;
        ixs_ins: string;
        ixs_fun: string;
        kniha: string;
        vyberova_skupina: string;
        isPovolUlozeniDoVyberoveSkupiny: boolean;
        idExpMode: string;
        isPovolExpMode: boolean;
        isDebug: boolean;
        srv: GContent;
        parametryStrediska: string;
        strediskoName: string;
        isPovolVyberovaSkupina: boolean;
        private asyncTaskExport;
        private getSrv;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        private getSubjCfg;
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
        getSxs(data: any): IGAdmGridSxs;
        getGridFormat(): Gordic.Data.GridFormat;
        private copyParam;
        private deleteSelected;
        private ulozitDataDoVyberoveSkupiny;
        private openSkryteParametry;
        private createFlashOpenExpertMode;
        private openNovaVyberovaSkupina;
        private openCopyDataZVyberoveSkupiny;
        private updateAktivitaHromadneForm;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmPodpisOsoby extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
    }
    class DetailAdmPodpisOsobyObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmPodpisOsobyReadDto> {
        returnValue: boolean;
        openModal: boolean;
        srv: GContent;
        fileInfo: any;
        filesGuids: string[];
        private getSrv;
        removeFile(): void;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: any, close: boolean): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        returnValueFunctionSpecial(podpis: string): any;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmPosta extends GContentBase {
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
    class DetailAdmPostaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmPostaReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmPostaSaveDto, close: boolean): any;
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
        private MakeSpecialValidator;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmPosta extends GContentBase<SeznamAdmPostaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmPostaObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmPovolenySpisovyUzelFunkce extends GContentBase {
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
    class DetailAdmPovolenySpisovyUzelFunkceObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmPovolenySpisovyUzelFunkceReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmPovolenySpisovyUzelFunkceSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmPovolenySpisovyUzelFunkce extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmPovolenySpisovyUzelFunkceObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmPovolenySpisovyUzelFunkceReadDto> {
        typ_usr: number;
        openFromInstance: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmPovolenySpisovyUzelFunkce extends GContentBase<SeznamAdmPovolenySpisovyUzelFunkceObj> {
        private seznamObj;
        onContentReady(): void;
        private getColumnOrder;
    }
    class SeznamAdmPovolenySpisovyUzelFunkceObj extends GAdmSeznamBase {
        ixs_su: string;
        ixs_fun: string;
        private openFromFunkcniMisto;
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
        getSxs(data: any): IGAdmGridSxs;
        rowsEnabledFunction(row: any): boolean;
        rowsCheckEnabledFunction(row: any): boolean;
        private hromadnaOperaceNew;
        private editHromadne;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmPracovniSkupina extends GContentBase {
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
    class GDetailAdmPracovniSkupinaObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmPracovniSkupinaDto> {
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmPracovniSkupinaDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createClenoveGroup(): IGTabGroupOptions;
        createClenoveTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmPracovniSkupina extends GContentBase<GSeznamAdmPracovniSkupinaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmPracovniSkupinaObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmPracovniStanice extends GContentBase {
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
    class GDetailAdmPracovniStaniceObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmPracovniStaniceDto> {
        private isPovolPrizRestrict;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmPracovniStaniceDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmPracovniStanice extends GContentBase<GSeznamAdmPracovniStaniceObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmPracovniStaniceObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmPrihlaseniUzivatele extends GContentBase<GSeznamAdmPrihlaseniUzivateleObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmPrihlaseniUzivateleObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private ixs_ref;
        private rezim_prihlaseni;
        private isPovolOdhlaseni;
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
        rowsCheckEnabledFunction(row: any): boolean;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getNazev(data: any): string;
        getGridFormat(): Gordic.Data.GridFormat;
        private odhlaseniUzivatele;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmPristupovyKlic extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmPristupovyKlicObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmPristupovyKlicReadDto> {
        returnValue: boolean;
        openModal: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmPristupovyKlicSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        returnValueFunction(): any;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmPristupovyKlic extends GContentBase<SeznamAdmPristupovyKlicObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmPristupovyKlicObj extends GAdmSeznamBase {
        private ico;
        private budova_kod;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmPristupovyKlicBudovy extends GContentBase {
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
    class DetailAdmPristupovyKlicBudovyObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmPristupovyKlicBudovyReadDto> {
        newPermPristupovyKlic: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmPristupovyKlicBudovySaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private novyPristupovyKlic;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmPristupovyKlicBudovy extends GContentBase<SeznamAdmPristupovyKlicBudovyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmPristupovyKlicBudovyObj extends GAdmSeznamBase {
        private ico;
        private budova_kod;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmPristupovyKlicMistnosti extends GContentBase {
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
    class DetailAdmPristupovyKlicMistnostiObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmPristupovyKlicMistnostiReadDto> {
        newPermPristupovyKlic: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmPristupovyKlicMistnostiSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private novyPristupovyKlic;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmPristupovyKlicMistnosti extends GContentBase<SeznamAdmPristupovyKlicMistnostiObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmPristupovyKlicMistnostiObj extends GAdmSeznamBase {
        private ico;
        private budova_kod;
        private segment_kod;
        private mistnost_kod;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmPristupovyKlicSegmentu extends GContentBase {
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
    class DetailAdmPristupovyKlicSegmentuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmPristupovyKlicSegmentuReadDto> {
        newPermPristupovyKlic: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmPristupovyKlicSegmentuSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private novyPristupovyKlic;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmPristupovyKlicSegmentu extends GContentBase<SeznamAdmPristupovyKlicSegmentuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmPristupovyKlicSegmentuObj extends GAdmSeznamBase {
        private ico;
        private budova_kod;
        private segment_kod;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSablonaKonvenceGordic extends GContentBase {
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
    class DetailAdmSablonaKonvenceGordicObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSablonaKonvenceGordicReadDto> {
        private isNewPrizSpis;
        private serviceCnt;
        private guids;
        private extension;
        private strediskoName;
        private nepovoleneZnakySoubor;
        private nepovoleneZnakyCesta;
        isCestaString: boolean;
        private getServiceCnt;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        removeTempFiles(): void;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSablonaKonvenceGordicSaveDto, close: boolean): gjqXHR<any>;
        private upsertAction;
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
        private formCestaGroups;
        private formPrefixGroups;
        private validatorExtension;
        private validatorName;
        private validatorCesta;
        private validatorsCountPrefix;
        private createCopyFrom;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSablonaKonvenceGordic extends GContentBase<SeznamAdmSablonaKonvenceGordicObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSablonaKonvenceGordicObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmSablonaTypovehoSpisu extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        oddelovac: string;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdmSablonaTypovehoSpisuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSablonaTypovehoSpisuDto> {
        returnValue: boolean;
        openModal: boolean;
        pocetPouziti: number;
        isPovolPrizVazbaFun: boolean;
        asyncTaskUzavrit: {
            className: string;
            taskId: string;
        };
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSablonaTypovehoSpisuDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private generateNextSpisZnak;
        createSoucastiGroup(): IGTabGroupOptions;
        createSoucastiTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private openSablonaTypovehoSpisu;
        private uzavreniVecneSkupiny;
        createOpravneniKVecneSkupineGroup(): IGTabGroupOptions;
        createOpravneniKVecneSkupineTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private createValidatorsSpisZnakShorts;
        private soucastiVecneSkupiny;
        private opravneniVecneSkupiny;
        private typoveSpisyVecneSkupiny;
        private historieVecneSkupiny;
        private initAsyncTaskUzavrit;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDialogUzavreniSablonyTypovehoSpisu extends GContentBase {
        private asyncTaskUzavrit;
        private ixs_vsk;
        private options;
        private grid;
        private dvojiceProMapovani;
        onContentReady(): void;
        private init;
        private createActions;
        private createWizard;
        private createFormBase;
        private createValidatorSameVsk;
        private checkUrceniVecneSkupiny;
        private getDataFromForm;
        private createFormSecond;
        private actUzavrit;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmSablonaTypovehoSpisu extends GContentBase<GSeznamAdmSablonaTypovehoSpisuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmSablonaTypovehoSpisuObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSegmentBudovy extends GContentBase {
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
    class DetailAdmSegmentBudovyObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSegmentBudovyReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSegmentBudovySaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        private saveDataSpecial;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createMistnostiTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createPristupoveKliceTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createMistnostiGroup(): IGTabGroupOptions;
        createPristupoveKliceGroup(): IGTabGroupOptions;
        private mistnostiAct;
        private pristupoveKliceAct;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSegmentBudovy extends GContentBase<SeznamAdmSegmentBudovyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSegmentBudovyObj extends GAdmSeznamBase {
        private ico;
        private budova_kod;
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
        getSxs(data: any): IGAdmGridSxs;
        private actOpenSegmentyBudovy;
        private actOpenPristupoveKlice;
    }
}
declare namespace Gordic.Adm.WebControls {
    class AdmSestavyResultModalWindow extends GContentBase {
        private grid;
        private resultData;
        prepareContent(): void;
        private init;
        private createInfo;
        private createGrid;
    }
}
declare namespace Gordic.Adm.WebControls {
    class AdmSestavySeznam extends GContentBase {
        private grid;
        private gridFormat;
        private sidebar;
        private row;
        private panelElement;
        private nahravaniSestavAsync;
        private ginRadSestavy;
        onContentReady(): void;
        private init;
        private createActions;
        private createMenuBar;
        private createBreadcrumbs;
        private createFilterForm;
        private convertAktivita;
        private createForm;
        private createGrid;
        private createGridFormat;
        private refreshPanel;
        private createSidebar;
        private createPanel;
        private initAsyncTask;
        private formNacteniSestav;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSkartacniRezim extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmSkartacniRezimObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSkartacniRezimDto> {
        private isPovolExterniIdentifikace;
        private isPovolKontrolnilhutaRokVyrazeni;
        private povolCreateSpousteciUdalost;
        private ginN23Adm;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSkartacniRezimDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private newSpousteciUdalost;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSkartacniRezim extends GContentBase<SeznamAdmSkartacniRezimObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSkartacniRezimObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmSoucastSablonyTypovehoSpisu extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        oddelovac: string;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdmSoucastSablonyTypovehoSpisuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSoucastSablonyTypovehoSpisuDto> {
        returnValue: boolean;
        openModal: boolean;
        isPovolObdobi: boolean;
        isPovolPrizVazbaFun: boolean;
        isPovolPrizKonForm: boolean;
        isPovolPozastaveniSkar: boolean;
        isPovolIxpDokumentu: boolean;
        checkSoucast: boolean;
        defaultFormatCj: Gordic.AdmIsl.Interface.GDefaultFormatCisloJednaciProZpusobyPrirazeni[];
        pocetPouziti: number;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSoucastSablonyTypovehoSpisuDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private generateNextSpisZnak;
        private createValidatorsSpisZnakShorts;
        private createFormSkartacePozastavena;
        createOpravneniKVecneSkupineGroup(): IGTabGroupOptions;
        createOpravneniKVecneSkupineTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private opravneniVecneSkupiny;
        private updateVarovaniDefaultniFortmatCj;
        private changeSkartacniRezimDialog;
        private createSpecialValidators;
        private historieVecneSkupiny;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmSoucastSablonyTypovehoSpisu extends GContentBase<GSeznamAdmSoucastSablonyTypovehoSpisuObj> {
        private seznamObj;
        isPovolObdobi: boolean;
        onContentReady(): void;
    }
    class GSeznamAdmSoucastSablonyTypovehoSpisuObj extends GAdmSeznamBase {
        private ixs_vsk_nad;
        isPovolObdobi: boolean;
        isOpenSablona: boolean;
        isPovolPrizVazbaFun: boolean;
        isPovolPrizKonForm: boolean;
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
        getSxs(data: any): IGAdmGridSxs;
        getTreeProcessor(): Gordic.Data.Tree;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
        createProfilStrom(): GridProfile<any>[];
        createCondFormats(): Gordic.Components.Grid.CondFormats.CondFormat[];
        profileChange(profileSetting: {
            oldProfile: GridProfile<any>;
            profile: GridProfile<any>;
        }): void;
        private openDetailNewSpecialPodrizena;
        private openDetailNewSpecialKorenova;
        private opravneniVecneSkupiny;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSpisovyPlanNS2023 extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmSpisovyPlanNS2023Obj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSpisovyPlanNS2023Dto> {
        returnValue: boolean;
        openModal: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSpisovyPlanNS2023Dto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private openVecneSkupiny;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GResultImportAdmSpisovyPlanNS2023 extends GContentBase {
        private data;
        private gridEl;
        prepareContent(): void;
        private init;
        private createActions;
        private createMenuBar;
        private createGrid;
        private openDetail;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSpisovyPlanNS2023 extends GContentBase<SeznamAdmSpisovyPlanNS2023Obj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSpisovyPlanNS2023Obj extends GAdmSeznamBase {
        private existForIco;
        private asyncTaskExport;
        private asyncTaskImport;
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
        getSxs(data: any): IGAdmGridSxs;
        private openVecneSkupiny;
        private exportNs2023;
        private initAsyncTask;
        private importNs2023;
        private initAsyncTaskImport;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSpisovyUzel extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private adxCheckIcoNad;
        private admRpEdiextid;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmSpisovyUzelObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSpisovyUzelDto> {
        adxCheckIcoNad: number;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSpisovyUzelDto, close: boolean): void;
        private saveDataSpecial;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private openSeznamAdmDenikSslSpisovyUzel;
        private openSeznamAdmSpisovyUzelProPredavani;
        private openFunkcniMista;
        private openNadrizenySpisUzel;
        private openZodpovednaFunkce;
        private openMailSchranka;
        private formPriveskySpisoveZnacky;
        private createValidatorPriveskySpisoveZnacky;
        createAdmDenikSslSpisovyUzelTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createAdmSpisovyUzelProPredavaniTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createAdmDenikSslSpisovyUzelGroup(): IGTabGroupOptions;
        createAdmSpisovyUzelProPredavaniGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSpisovyUzel extends GContentBase<SeznamAdmSpisovyUzelObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSpisovyUzelObj extends GAdmSeznamBase {
        private editSpisGraf;
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
        getSxs(data: any): IGAdmGridSxs;
        getTreeProcessor(): Gordic.Data.Tree;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
        createProfilStrom(): GridProfile<any>[];
        profileChange(profileSetting: {
            oldProfile: GridProfile<any>;
            profile: GridProfile<any>;
        }): void;
        private openSeznamAdmDenikSslSpisovyUzel;
        private openFunkcniMista;
        private openSeznamAdmSpisovyUzelProPredavani;
        private openSpisovyGraf;
        private openHromadnaOperaceAdmDenikSslSpisovyUzel;
        private openHromadnaOperaceAdmSpisovyUzelProPredavani;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSpisovyUzelProPredavani extends GContentBase {
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
    class DetailAdmSpisovyUzelProPredavaniObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSpisovyUzelProPredavaniReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSpisovyUzelProPredavaniSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmSpisovyUzelProPredavani extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmSpisovyUzelProPredavaniObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmSpisovyUzelProPredavaniReadDto> {
        isFunkcniMisto: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSpisovyUzelProPredavani extends GContentBase<SeznamAdmSpisovyUzelProPredavaniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSpisovyUzelProPredavaniObj extends GAdmSeznamBase {
        ixs_su: string;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSpousteciUdalost extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private admRpEdiextid;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmSpousteciUdalostObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSpousteciUdalostDto> {
        private povolKtgSpu;
        openModal: boolean;
        returnValue: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSpousteciUdalostDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        returnValueFunction(): any;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSpousteciUdalost extends GContentBase<SeznamAdmSpousteciUdalostObj> {
        private seznamObj;
        private povolKtgSpu;
        onContentReady(): void;
    }
    class SeznamAdmSpousteciUdalostObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmStat extends GContentBase {
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
    class DetailAdmStatObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmStatReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmStatSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmStat extends GContentBase<SeznamAdmStatObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmStatObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSystemovyCertifikat extends GContentBase {
        private dataListDescription;
        private data;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmSystemovyCertifikatObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSystemovyCertifikatListDto> {
        dataListDescription: Gordic.General.ApplicationInterface.GDataListDescription;
        filterObj: any;
        gridRc: Gordic.Components.GridRC<any>;
        povolPrizWsl: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSystemovyCertifikatSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private nextAndPreviousActionSpecial;
        private getCaption;
        private downloadCertificate;
        private changeAktivitaCer;
        private saveAktivitaCer;
        private updateDataInGrid;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSystemovyCertifikat extends GContentBase<SeznamAdmSystemovyCertifikatObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSystemovyCertifikatObj extends GAdmSeznamBase {
        private getServiceCnt;
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
        getSxs(data: any): IGAdmGridSxs;
        private createCertifikatNew;
        private createCertifikatSave;
        private updateDataInGrid;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmTextOdpovedi extends GContentBase {
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
    class GDetailAdmTextOdpovediObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmTextOdpovediDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmTextOdpovediDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private getPolozky;
        private addText;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmTextOdpovedi extends GContentBase<GSeznamAdmTextOdpovediObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmTextOdpovediObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmTypOrganizace extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmTypOrganizaceObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmTypOrganizaceDto> {
        returnValue: boolean;
        openModal: boolean;
        isdsTypes: {
            typ_isds: string;
            typ_isds_txt: string;
        }[];
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmTypOrganizaceDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private updateTypOrgAllTxt;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmTypOrganizace extends GContentBase<SeznamAdmTypOrganizaceObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmTypOrganizaceObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmUrlAdresaDalsiInformaceFaze extends GContentBase {
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
    class DetailAdmUrlAdresaDalsiInformaceFazeObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmUrlAdresaDalsiInformaceFazeReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmUrlAdresaDalsiInformaceFazeSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmUrlAdresaDalsiInformaceFaze extends GContentBase<SeznamAdmUrlAdresaDalsiInformaceFazeObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmUrlAdresaDalsiInformaceFazeObj extends GAdmSeznamBase {
        faze: string;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmUrlExterniKonektor extends GContentBase {
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
    class GDetailAdmUrlExterniKonektorObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmUrlExterniKonektorDto> {
        private isPovolEditIco;
        private isPovolAibModul;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GAdmUrlExterniKonektorDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmUrlExterniKonektor extends GContentBase<GSeznamAdmUrlExterniKonektorObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmUrlExterniKonektorObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        private isPovolAibModul;
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
        private updateAktivita;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmUrlWeboveAplikace extends GContentBase {
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
    class DetailAdmUrlWeboveAplikaceObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmUrlWeboveAplikaceReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmUrlWeboveAplikaceSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmUrlWeboveAplikace extends GContentBase<SeznamAdmUrlWeboveAplikaceObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmUrlWeboveAplikaceObj extends GAdmSeznamBase {
        faze: string;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmUrovenPristupuOsoby extends GContentBase {
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
    class DetailAdmUrovenPristupuOsobyObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmUrovenPristupuOsobyReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmUrovenPristupuOsobySaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmUrovenPristupuOsoby extends GContentBase<SeznamAdmUrovenPristupuOsobyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmUrovenPristupuOsobyObj extends GAdmSeznamBase {
        ixs_ref: string;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmVault extends GContentBase {
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
    class DetailAdmVaultObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmVaultDto> {
        private srv;
        private sabSettingEnabled;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmVaultDto, close: boolean): gjqXHR<any>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private getValidatorSlozka;
        private getValidatorUrl;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmVault extends GContentBase<SeznamAdmVaultObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmVaultObj extends GAdmSeznamBase {
        private srv;
        private getSrv;
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
        applydata(filterData: any, poradi_new?: number): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
        private poradiUp;
        private poradiDown;
        private searchLocationCertForm;
        private actFindSecretLocationCertOk;
        private searchLocationForm;
        private searchLocationOk;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmVecnaSkupina extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        oddelovac: string;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class GDetailAdmVecnaSkupinaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmVecnaSkupinaDto> {
        returnValue: boolean;
        openModal: boolean;
        pocetPouziti: number;
        isPovolPrizVazbaFun: boolean;
        isPovolPrizKonForm: boolean;
        isPovolPozastaveniSkar: boolean;
        isPovolIxpDokumentu: boolean;
        defaultFormatCj: Gordic.AdmIsl.Interface.GDefaultFormatCisloJednaciProZpusobyPrirazeni[];
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmVecnaSkupinaDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        private saveDataSpecial;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private changeSkartacniRezim;
        private createSpecialValidators;
        private createValidatorsZmenaSkarRezimu;
        private createSpecialValidorUrceniSpisZnaku;
        private createValidatorsSpisZnakShorts;
        private updateGridSpecial;
        private setPlatnostColumn;
        private getTreeProcessor;
        private openDialogStatistika;
        private uzavreniVecneSkupiny;
        private createFlash;
        private pretriditDoJineVecneSkupiny;
        private spisyVecneSkupiny;
        private generateNextSpisZnak;
        private uzavreniNekoncoveVecneSkupiny;
        private createFormSkartacePozastavena;
        private reloadPocetPouziti;
        private updateVarovaniDefaultniFortmatCj;
        createOpravneniKVecneSkupineGroup(): IGTabGroupOptions;
        createOpravneniKVecneSkupineTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private opravneniVecneSkupiny;
        private historieVecneSkupiny;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDialogAdmHistorieVecneSkupiny extends GContentBase {
        private ixs_vsk;
        private gridEl;
        prepareContent(): void;
        private init;
        private createGrid;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDialogAdmVecnaSkupinaStatistika extends GContentBase {
        private ixs_vsk;
        private pocetPouziti;
        private statistikaSpisu;
        onContentReady(): void;
        private init;
        private createScoreCard;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDialogResultPretrideniDoVecneSkupiny extends GContentBase {
        private resultAsyncTask;
        private pretrideniVysledek;
        private formEl;
        private grid;
        private success;
        prepareContent(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createFormResult;
        private createGridResult;
        private getVysledky;
        private removeTempData;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GPretriditSpisyVecneSkupiny extends GContentBase {
        private formEl;
        private grid;
        private ixs_vsk;
        private islView;
        private ixs_fun;
        private ixs_fun_txt;
        private log_por_cislo;
        private asyncTaskPretridit;
        private options;
        onContentReady(): void;
        private init;
        private createWizard;
        private createActions;
        private createFormEl;
        private getDataFromForm;
        private createSpecialValidator;
        private createGrid;
        private getIslView;
        private getDataFromGrid;
        private createSouhrnForm;
        private pretriditAsyncTask;
        private initAsyncTask;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmVecnaSkupina extends GContentBase<GSeznamAdmVecnaSkupinaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmVecnaSkupinaObj extends GAdmSeznamBase {
        datum: Date;
        ixs_spn: string;
        isPovolPrizVazbaFun: boolean;
        isPovolPrizKonForm: boolean;
        private sablonaEnabled;
        ixs_vsk: string | null;
        viewTree: boolean;
        private stavy;
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
        getSxs(data: any): IGAdmGridSxs;
        getTreeProcessor(): Gordic.Data.Tree;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
        createProfilStrom(): GridProfile<any>[];
        createCondFormats(): Gordic.Components.Grid.CondFormats.CondFormat[];
        profileChange(profileSetting: {
            oldProfile: GridProfile<any>;
            profile: GridProfile<any>;
        }): void;
        private openDetailNewSpecialPodrizena;
        private openDetailNewSpecialKorenova;
        private openDetailNewSpecialSablona;
        private openDetailNewSpecialKorenovaSablona;
        private openVecneSkupinyKDatu;
        private opravneniVecneSkupiny;
        private soucastiVecneSkupiny;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSpisyVecneSkupiny extends GContentBase {
        private grid;
        private islView;
        private ixs_vsk;
        private typoveSpisy;
        onContentReady(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createGrid;
        private createGridFormat;
        private getIslView;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmVlastnostObecnyObjekt extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        openModal: boolean;
        returnValue: boolean;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmVlastnostObecnyObjektObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmVlastnostObecnyObjektReadDto> {
        private sxs_obj;
        private nazev;
        openModal: boolean;
        returnValue: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmVlastnostObecnyObjektSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private newPovolenaKonkretni;
    }
}
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceVlastnostObecnyObjekt extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        onContentReady(): void;
    }
    class HromadnaOperaceVlastnostObecnyObjektObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmVlastnostObecnyObjektReadDto> {
        ico: string;
        isPovolenoPoradi: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmVlastnostObecnyObjekt extends GContentBase<SeznamAdmVlastnostObecnyObjektObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmVlastnostObecnyObjektObj extends GAdmSeznamBase {
        private typ_obj;
        private ico;
        private nazev;
        private sxs;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmVlastnostTypObjektuNew extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        openModal: boolean;
        returnValue: boolean;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmVlastnostTypObjektuNewObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmVlastnostTypObjektuReadDto> {
        typ_vps: number;
        permissionVsechny: boolean;
        permissionKonkretni: boolean;
        changePrirazeni: boolean;
        openModal: boolean;
        returnValue: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmVlastnostTypObjektuSaveDto | Gordic.AdmIsl.Interface.GAdmVlastnostTypSubjektuSaveDto, close: boolean): any;
        private actionsAfterSave;
        private getIxs;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        returnValueFunction(): any;
    }
}
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmVlastnostTypObjektu extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmVlastnostTypObjektuObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmVlastnostTypObjektuReadDto> {
        ico: string;
        typ_vps: number;
        typ_obj: number;
        isPovolenoPoradi: boolean;
        private prirazenoVsem;
        createForm(cnt: GContent<IGContentBase, any>, contentDiv: JQuery<HTMLElement>, change: OGWizardChange): void;
        createDefineGridData(formData: any): any;
        private addCartesianResult;
        createGridFormat(gridFormat: Gordic.Data.GridFormat): Gordic.Data.GridFormat;
        saveData(data: any[]): JQueryPromise<any>;
        validateRows(data: any): Gordic.Validators.GridError[];
        testExistMethod(data: any[]): JQueryPromise<any>;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmVlastnostTypObjektu extends GContentBase<SeznamAdmVlastnostTypObjektuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmVlastnostTypObjektuObj extends GAdmSeznamBase {
        private typ_obj;
        private ico;
        private ixs;
        private typ_vps;
        private srv;
        private typ_obj_ginvovl;
        private typ_obj_ginvovp;
        private getSrv;
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
        getSxs(data: any): IGAdmGridSxs;
        createContentCaption(): string;
        private newVlastnostiHromadne;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmVlastnostTypSubjektu extends GContentBase {
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
    class DetailAdmVlastnostTypSubjektuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmVlastnostTypSubjektuReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmVlastnostTypSubjektuSaveDto, close: boolean): any;
        private getIxs;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private generContentCaption;
    }
}
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmVlastnostTypSubjektu extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmVlastnostTypSubjektuObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmVlastnostTypSubjektuReadDto> {
        ico: string;
        typ_vps: number;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmVlastnostTypSubjektu extends GContentBase<SeznamAdmVlastnostTypSubjektuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmVlastnostTypSubjektuObj extends GAdmSeznamBase {
        private typ_obj;
        private ico;
        private ixs;
        typ_vps: number;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmVyuzitiServerovychLicenci extends GContentBase {
        private asyncTask;
        private loadStartUS;
        private panelId;
        private gridEl;
        private sidebar;
        private panelEl;
        private gridDetail;
        private tabPodrobnosti;
        private tabSeznam;
        onContentReady(): void;
        private getUserSettingsCnt;
        private setUserSettingsCnt;
        private init;
        private createActions;
        private createMenuBar;
        private createFlash;
        private createGrid;
        private createSidebar;
        private createPanel;
        private createPanelInt;
        private refreshPanel;
        private initAsyncTask;
        private startAsyncTask;
        private loadVyuzitiServerovychLicenci;
        private checkAsyncTaskRunning;
        private createGridDetail;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdmZakazaneHesloResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdmZakazaneHesloReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdmZakazaneHesloReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdmZakazaneHeslo extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - heslo */
        private heslo;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** Skryt� v�ech flash */
        private HideAllFlash;
        /** Zobraz� p��znaku �sp�n�ho ulo�en� */
        private ShowSaveSuccess;
        /** Zobraz� p��znaku chyby p�i ulo�en� dat */
        private ShowSaveError;
        /** Zobraz� p��znaku chyby p�i na�ten� dat */
        private ShowLoadError;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** vytvo�it commandbar */
        private createCommandBar;
        /** odstranit v�echny vlastn� t��dy ze statusbaru */
        private removeAllCustomClassOnStatusBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdmZakazaneHesloDlg(parentContent: GContent, opt: {
        /** heslo */
        heslo: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdmZakazaneHesloDlg(parentContent: GContent, opt: {
        /** heslo */
        heslo: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdmZakazaneHeslo extends GContentBase<SeznamAdmZakazaneHesloDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * createMenuButtons
         */
        private createMenuButtons;
        /**
         * vytvo�it menu
         */
        private createMenuBar;
        private setMenuButtons;
        private novyZaznamButton;
        /**
         * detail button
         */
        private detailButton;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdmZakazaneHesloDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdmZakazaneHesloDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - heslo */
        heslo: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdmZakazaneHesloListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdmZakazaneHesloDesigner>, heslo: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdmZakazaneHesloDesigner>, heslo: string): Forms.Form;
        static applyAction(that: GContentType<SeznamAdmZakazaneHesloDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdmZakazaneHesloDesignerInit
         *
         * @param {GContentType<SeznamAdmZakazaneHesloDesigner>} that
         */
        static SeznamAdmZakazaneHesloDesignerInit(that: GContentType<SeznamAdmZakazaneHesloDesigner>, heslo: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailKonfiguraceJadraGinis extends GContentBase {
        private dataListDescription;
        private data;
        private typ_db;
        private priz_azure;
        private povoleniUlozeni;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private createTabGroups;
        private createTabs;
        private createActions;
        private createMenuBar;
        private createCommandBar;
        private headerForm;
        private createTabSetting;
        private createDbForm;
        private createDbInfoTab;
        private createPodporaForm;
        private createPodporaTab;
        private openObsahLicCert;
        private preSaveData;
        private saveData;
        onContentReady(): void;
        closing(): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailNastaveniZamkuDatabaze extends GContentBase {
        private data;
        private formEl;
        private povolEdit;
        onContentReady(): void;
        private init;
        private createFlash;
        private createActions;
        private createForm;
        private createCommandBar;
        private save;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailOrganizacniJednotkaDenikSsl extends GContentBase {
        private dataListDescription;
        private data;
        private openFromdenikSsl;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailOrganizacniJednotkaDenikSslObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GOrganizacniJednotkaDenikSslReadDto> {
        openFromdenikSsl: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GOrganizacniJednotkaDenikSslSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceOrganizacniJednotkaDenikSsl extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        onContentReady(): void;
    }
    class HromadnaOperaceOrganizacniJednotkaDenikSslObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GOrganizacniJednotkaDenikSslReadDto> {
        isFunkcniMisto: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamOrganizacniJednotkaDenikSsl extends GContentBase<SeznamOrganizacniJednotkaDenikSslObj> {
        private seznamObj;
        sslden: string;
        onContentReady(): void;
        private getColumnOrder;
    }
    class SeznamOrganizacniJednotkaDenikSslObj extends GAdmSeznamBase {
        ixs_orj: string;
        sslden: string;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailProgramovaFaze extends GContentBase {
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
    class DetailProgramovaFazeObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GProgramovaFazeReadDto> {
        isUzivatelskaFaze(): boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: any, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        instanceProgramoveFazeTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        urlProgramoveFazeTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        urlAdresaDalsiInformaceFazeTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        parametryProFazeTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        instanceProgramoveFazeGroup(): IGTabGroupOptions;
        urlProgramoveFazeGroup(): IGTabGroupOptions;
        urlAdresaDalsiInformaceFazeGroup(): IGTabGroupOptions;
        parametryProFazeGroup(): IGTabGroupOptions;
        private vzkazyProUzivatele;
        private zastupyFaze;
        private createSpecialValidatorUzivatelskaFaze;
        private createSpecialValidatorDelka;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamProgramovaFaze extends GContentBase<SeznamProgramovaFazeObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamProgramovaFazeObj extends GAdmSeznamBase {
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
        applydata(filterData: any, poradi_new?: number): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
        private urlProgramoveFaze;
        private urlDalsiInformaceFaze;
        private programoveInstance;
        private vzkazyProUzivatele;
        private parametryFaze;
        private zastupyFaze;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailProgramovaInstance extends GContentBase {
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
    class DetailProgramovaInstanceObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GProgramovaInstanceReadDto> {
        private ginN23Adm;
        updateFields(): void;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: any, close: boolean): any;
        saveDataInt(data: any, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private generateNazev;
        getParametryProInstanceTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getKonfiguracniSkupinyFunkcniMistaInstanceTab(funkcniMisto: boolean): Gordic.Gin.DetailBuilder.TabParamsId;
        getParametryProInstanceGroup(): IGTabGroupOptions;
        getKonfiguracniSkupinyFunkcniMistaInstanceGroup(funkcniMisto: boolean): IGTabGroupOptions;
        private actOpenSeznamKonfiguracniSkupina;
        private deleteEkoinit;
        private deleteAplSetting;
        private openSouhrnnyPrehledInstance;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GSouhrnnyPrehledVazebInstance extends GContentBase {
        private cnt;
        private grid;
        private ixs_ins;
        private dataDist;
        private viewData;
        private viewErrors;
        private currentView;
        private newView;
        private onlyError;
        onContentReady(): void;
        private init;
        private createActions;
        private createBreadcrumbs;
        private createMenubar;
        private getBaseCaption;
        private createFilter;
        private collectData;
        private createFilterForm;
        private getDataFunkcniMisto;
        private createSearchForm;
        private updateSearchForm;
        private updateView;
        private createHeader;
        private createBasepanel;
        private setDataToPanel;
        private createGridFormat;
        private openDetail;
        private filterOnlyError;
        private openSettingForm;
        private createViewSelectboxOpt;
        private getView;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamProgramovaInstance extends GContentBase<SeznamProgramovaInstanceObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamProgramovaInstanceObj extends GAdmSeznamBase {
        faze: string;
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
        getSxs(data: any): IGAdmGridSxs;
        private actOpenSeznamKonfiguracniSkupina;
        private actHromadnaOperaceAdmKonfiguracniSkupinaProgramovaInstance;
        private actParametryInstance;
        private souhrnnyPrehled;
        private deleteEkoinit;
        private deleteAplSetting;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmPovolenaRevizeAplikace extends GContentBase<SeznamAdmPovolenaRevizeAplikaceObj> {
        private seznamObj;
        onContentReady(): void;
        closing(): void;
    }
    class SeznamAdmPovolenaRevizeAplikaceObj extends GAdmSeznamBase {
        private srv;
        private guids;
        private getSrv;
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
        getSxs(data: any): IGAdmGridSxs;
        private exportNejvyssiRevize;
        removeTempDirectory(): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailSkupinaFunkci extends GContentBase {
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
    class DetailSkupinaFunkciObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GSkupinaFunkciReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GSkupinaFunkciSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getSkupinaFunkciClenTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getSkupinaFunkciOpravneniTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getSkupinaFunkciClenGroup(): IGTabGroupOptions;
        getSkupinaFunkciOpravneniGroup(): IGTabGroupOptions;
        private openSkupinaFunkciClen;
        private openSkupinaFunkciOpravneni;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamSkupinaFunkci extends GContentBase<SeznamSkupinaFunkciObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamSkupinaFunkciObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private openSkupinaFunkciClen;
        private openSkupinaFunkciOpravneni;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailSkupinaFunkciClen extends GContentBase {
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
    class DetailSkupinaFunkciClenObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GSkupinaFunkciClenDto> {
        openFromFunkcniMisto: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GSkupinaFunkciClenDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceSkupinaFunkciClen extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class HromadnaOperaceSkupinaFunkciClenObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GSkupinaFunkciClenDto> {
        openFromFunkcniMisto: boolean;
        changeIxsFun: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamSkupinaFunkciClen extends GContentBase<SeznamSkupinaFunkciClenObj> {
        private seznamObj;
        onContentReady(): void;
        private getColumnOrder;
    }
    class SeznamSkupinaFunkciClenObj extends GAdmSeznamBase {
        ixs_sfu: string;
        ixs_fun: string;
        private getSrv;
        openFromFunkcniMisto(): boolean;
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
        getSxs(data: any): IGAdmGridSxs;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): 0 | 1 | 2;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailSkupinaFunkciOpravneni extends GContentBase {
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
    class DetailSkupinaFunkciOpravneniObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GSkupinaFunkciOpravneniDto> {
        openFromFunkcniMisto: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GSkupinaFunkciOpravneniDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceSkupinaFunkciOpravneni extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class HromadnaOperaceSkupinaFunkciOpravneniObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GSkupinaFunkciOpravneniDto> {
        openFromFunkcniMisto: boolean;
        changeIxsFun: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamSkupinaFunkciOpravneni extends GContentBase<SeznamSkupinaFunkciOpravneniObj> {
        private seznamObj;
        onContentReady(): void;
        private getColumnOrder;
    }
    class SeznamSkupinaFunkciOpravneniObj extends GAdmSeznamBase {
        ixs_sfu: string;
        ixs_fun: string;
        private getSrv;
        openFromFunkcniMisto(): boolean;
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
        getSxs(data: any): IGAdmGridSxs;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        createHromadneDialog(): JQuery<HTMLElement> | null;
        getTypeDetail(): 0 | 1 | 2;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailStrediskoSpisovychUzlu extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private adxCheckIcoNad;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private admRpEdiextid;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailStrediskoSpisovychUzluObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GStrediskoSpisovychUzluDto> {
        adxCheckIcoNad: number;
        updateFields(): void;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GStrediskoSpisovychUzluDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamStrediskoSpisovychUzlu extends GContentBase<SeznamStrediskoSpisovychUzluObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamStrediskoSpisovychUzluObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailZastup extends GContentBase {
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
    class DetailZastupObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GZastupDto> {
        povolMimoIco: boolean;
        openFromOsoba: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: any, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private validateIcoRefFun;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamZastup extends GContentBase<SeznamZastupObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamZastupObj extends GAdmSeznamBase {
        ixs_fun: string;
        ixs_ref: string;
        faze: string;
        private getSrv;
        openFromOsoba(): boolean;
        createColumnOrder(): string;
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
        applydata(filterData: any, poradi_new?: number): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
        getDataCount(): JQueryPromise<Gordic.AdmIsl.Interface.GAdmCountData> | null;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response služeb pro Detail Stupen Schvaleni Epk */
    interface IDetailGrafDefiniceResponse {
        /** data výstupu */
        data: Gordic.AdmIsl.Interface.GGrafDefiniceDto;
        result: {
            /** data výstupu */
            data: Gordic.AdmIsl.Interface.GGrafDefiniceDto;
            /** chyby */
            errors: {
                /** zpráva chyby */
                message: string;
            }[];
            /** typ výstupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailGrafDefinice extends GContentBase {
        /** příznak, že se jedná o nový záznam */
        private newRecord;
        /** Příznak, že okno se nachází v editačním režimu */
        private editMode;
        /** PK - ixs_grf */
        private ixs_grf;
        /** data detailu */
        private data;
        /*** element panelu v sidebaru */
        private panelElement;
        private panelId;
        /** elmenet sidebaru */
        private sidebar;
        /** příznak přímého přístupu na detail */
        private detailCommand;
        /** onContentReady */
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
        /** refreshDetail content */
        private refreshDetail;
        /** Načtení dat ze serveru na následné nastavení na detail okně */
        private loadData;
        /** Uložení dat formuláře do databáze */
        private saveData;
        /** init content */
        private init;
        /** vytvořit statusbar */
        private createStatusBar;
        /** Skrytí všech flash */
        private HideAllFlash;
        /** Zobrazí příznaku úspěšného uložení */
        private ShowSaveSuccess;
        /** Zobrazí příznaku chyby při uložení dat */
        private ShowSaveError;
        /** Zobrazí příznaku chyby při načtení dat */
        private ShowLoadError;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvořit formulář a načtení dat ze serveru */
        private createForm;
        /** zavřít content? */
        private closeContent;
        /** vytvořit menubar */
        private createMenuBar;
        /** Přepnutí dostupnosti políček podle aktuálního režimu okna
         editMode - příznak, že okno je v editačním režimu
         */
        private setEditMode;
        /** Přepnutí viditelnost tlačítek podle aktuálního režimu okna
         editMode - příznak, že okno je v editačním režimu
         */
        private setMenuButtons;
        /** vytvořit commandbar */
        private createCommandBar;
        /** odstranit všechny vlastní třídy ze statusbaru */
        private removeAllCustomClassOnStatusBar;
        /** vytvořit panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvořit sidebar */
        private createSidebar;
        /** občerstvení panelu v sidebaru */
        private refreshPanel;
        /** vytovření prázdného sidebar panelu s náhledek */
        private setPreviewEmpty;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu licencí */
    class SeznamGrafDefinice extends GContentBase<SeznamGrafDefiniceDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * createMenuButtons
         */
        private createMenuButtons;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        private setMenuButtons;
        /**
         * detail button
         */
        private detailButton;
        /**
         * otevřít detail
         */
        private openDetail;
        /** vytvořit seznam - definice objektu GRIDu, navázaných událostí atd... */
        private createGrid;
        /** vytvořit sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvořit panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamGrafDefiniceDesigner
     *
     * @author FFIALA
     * @since 482.1.0.119
     */
    class SeznamGrafDefiniceDesigner extends SeznamBase {
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GGrafDefiniceDto>;
        /**
         * SeznamGrafDefiniceDesignerInit
         *
         * @param {GContentType<SeznamGrafDefiniceDesigner>} that
         */
        static SeznamGrafDefiniceDesignerInit(that: GContentType<SeznamGrafDefiniceDesigner>): void;
        /** vytvořit formát seznamu - definice sloupců, napdpisů, šířek atd... */
        static createGridFormat(that: GContentType<SeznamGrafDefiniceDesigner>): Gordic.Data.GridFormat;
        /** vytvořit formulář filtru - panel */
        static createFilter(that: GContentType<SeznamGrafDefiniceDesigner>): JQuery<HTMLElement>;
        /** vytvořit formulář filtru - vytvoří tam filtrační políčka */
        static createFilterForm(that: GContentType<SeznamGrafDefiniceDesigner>): Forms.Form;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamGrafObsah extends GContentBase<SeznamGrafObsahDesigner> {
        /** data definice grafu */
        private data;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * createMenuButtons
         */
        private createMenuButtons;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        private setMenuButtons;
        /**
         * otevřít detail
         */
        private openDetail;
        /** vytvořit seznam - definice objektu GRIDu, navázaných událostí atd... */
        private createGrid;
        /** vytvořit sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvořit panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
        /** Id panel grafu v sidebaru */
        private panelGraphId;
        /**  vytvořit panel s grafem */
        private createPanelGraph;
        private refreshPanelGraph;
        private createGraph;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamGrafObsahDesigner
     *
     * @author FFIALA
     * @since 482.1.0.119
     */
    class SeznamGrafObsahDesigner extends SeznamBase {
        /** z detail okna předaný atribut pro filtr seznamu */
        ixs_grf: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GGrafObsahDto>;
        /**
         * SeznamGrafObsahDesignerInit
         *
         * @param {GContentType<SeznamGrafObsahDesigner>} that
         */
        static SeznamGrafObsahDesignerInit(that: GContentType<SeznamGrafObsahDesigner>): void;
        /** vytvořit formát seznamu - definice sloupců, napdpisů, šířek atd... */
        static createGridFormat(that: GContentType<SeznamGrafObsahDesigner>): Gordic.Data.GridFormat;
        /** vytvořit formulář filtru - panel */
        static createFilter(that: GContentType<SeznamGrafObsahDesigner>): JQuery<HTMLElement>;
        /** vytvořit formulář filtru - vytvoří tam filtrační políčka */
        static createFilterForm(that: GContentType<SeznamGrafObsahDesigner>): Forms.Form;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailExterniSystem extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private typy_ess;
        private verze_ess;
        private mutace_ess;
        private currentIco;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailExterniSystemObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GExterniSystemReadDto> {
        typy_ess: {
            nazev: string;
        }[];
        verze_ess: {
            nazev: string;
        }[];
        mutace_ess: {
            nazev: string;
        }[];
        urs_types: {
            nazev: string;
        }[];
        currentIco: string;
        serviceCnt: GContent;
        gridCertificate: JQuery<HTMLElement>;
        gridNavazaneInstance: JQuery<HTMLElement>;
        gridPrenaset: JQuery<HTMLElement>;
        gridAvizace: JQuery<HTMLElement>;
        gridPredavat: JQuery<HTMLElement>;
        gridExterniUzivatele: JQuery<HTMLElement>;
        private isPovolJeSedList;
        private isPovolKomunikace;
        private povolenePrenasetAvizacePredani;
        getServiceCnt(): GContent;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveBase(close: boolean): void;
        saveData(data: Gordic.AdmIsl.Interface.GExterniSystemSaveDto, close: boolean): void;
        private saveDataSpecial;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        setSpecialTabs(tabs: Gordic.Gin.DetailBuilder.TabParamsId[]): void;
        setSpecialGroups(groups: IGTabGroupOptions[]): void;
        private createCertificateGrid;
        private addLoginCertificate;
        private updateLoginCertificates;
        private removeLoginCertificates;
        private createNavazaneinstanceGrid;
        private updatePrenaset;
        private createPrenasetTab;
        private createAvizaceTab;
        private updateAvizace;
        private createPredavatTab;
        private updatePredavat;
        private externiUzivateleForm;
        private updatePassword;
        private updatePasswordOk;
        private createExterniUzivateleTab;
        private openPoctyEntit;
    }
}
declare namespace Gordic.Adm.WebControls.ExterniSystem {
}
declare namespace Gordic.Adm.WebControls {
    class GPoctyEntit extends GContentBase {
        private ixs_ext;
        private isZrusenyExtSystem;
        private isPovolEdit;
        private poctyEntit;
        private guids;
        private cnt;
        private nasilnePrevzitAsyncTask;
        private nasilnePrevzitTaskId;
        private getCnt;
        onContentReady(): void;
        onClose(): void;
        private init;
        private createActions;
        private createMenuBar;
        private createCommandBar;
        private createGrid;
        private savePidsDoSouboru;
        private removeTempFiles;
        private nasilnePrevzeti;
        private initializeAsyncTask;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamExterniSystem extends GContentBase<SeznamExterniSystemObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamExterniSystemObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmAgendaFunkce extends GContentBase {
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
    class DetailAdmAgendaFunkceObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmAgendaFunkceReadDto> {
        isPovolenaEvidenceOP: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmAgendaFunkceSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmAgendaFunkce extends GContentBase<SeznamAdmAgendaFunkceObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmAgendaFunkceObj extends GAdmSeznamBase {
        isPovolenaEvidenceOP: boolean;
        private povoleniRole;
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
        getSxs(data: any): IGAdmGridSxs;
        private openSeznamAdmAgendovaRoleFunkce;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmAgendovaRoleFunkce extends GContentBase {
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
    class DetailAdmAgendovaRoleFunkceObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmAgendovaRoleFunkceReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmAgendovaRoleFunkceSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmAgendovaRoleFunkce extends GContentBase<SeznamAdmAgendovaRoleFunkceObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmAgendovaRoleFunkceObj extends GAdmSeznamBase {
        private ixs_fun;
        private agenda;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GAdmImportIszrWebDialog extends GContentBase {
        private ico;
        private isNullIco;
        private sourceList;
        private formEl;
        private url;
        private admIszrUrpri;
        private admIszrUr;
        private asyncTask;
        onContentReady(): void;
        private initAsyncTask;
        private init;
        private createActions;
        private createCommandBar;
        private createFlash;
        private createForm;
        private importovatIzsr;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GAdmImportIszrWebResultDialog extends GContentBase {
        private data;
        private cinnosti;
        prepareContent(): void;
        private init;
        private updateData;
        private createForm;
        private createGridAgendy;
        private createGridCinnosti;
    }
    interface GAdmCinnostiAgendaIszr extends Gordic.AdmIsl.Interface.GAdmCinnostiIszr {
        agenda?: string | null;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmIszrAgenda extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private duvodUcelAdministrace;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmIszrAgendaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmIszrAgendaReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmIszrAgendaSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getAgendoveRoleTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getAgendyUrovnePristupuTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getAgendoveRoleGroup(): IGTabGroupOptions;
        getAgendyUrovnePristupuGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmIszrAgenda extends GContentBase<SeznamAdmIszrAgendaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmIszrAgendaObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private openSeznamAgendoveRole;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmIszrRole extends GContentBase {
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
    class DetailAdmIszrRoleObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmIszrRoleReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmIszrRoleSaveDto, close: boolean): void;
        private saveDataInternal;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmIszrRole extends GContentBase<SeznamAdmIszrRoleObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmIszrRoleObj extends GAdmSeznamBase {
        agenda: string;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmIszrUrovenPristupu extends GContentBase {
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
    class DetailAdmIszrUrovenPristupuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmIszrUrovenPristupuReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmIszrUrovenPristupuSaveDto, close: boolean): void;
        private saveDataInternal;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmIszrUrovenPristupu extends GContentBase<SeznamAdmIszrUrovenPristupuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmIszrUrovenPristupuObj extends GAdmSeznamBase {
        agenda: string;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmPravniFormaISZR extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmPravniFormaISZRObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmPravniFormaISZRDto> {
        returnValue: boolean;
        openModal: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmPravniFormaISZRDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmPravniFormaISZR extends GContentBase<SeznamAdmPravniFormaISZRObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmPravniFormaISZRObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GAdmOAuthConsentForm extends GContentBase {
        private tokenModel;
        private consentModel;
        prepareContent(): void;
        createForm(): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmOAuth extends GContentBase<SeznamAdmOAuthObj> {
        private seznamObj;
        onContentReady(): void;
    }
    enum TypeDialogs {
        consent = 0,
        login = 1
    }
    class SeznamAdmOAuthObj extends GAdmSeznamBase {
        adminConsentTokensOnly: boolean;
        private isDebug;
        private srv;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        private deactivateTokens;
        private createOAuthProfileDialog;
        private oAuthProfilConsentOK;
        private oAuthProfilLoginOK;
        private ziskatOAuthConsent;
        private oAuthProfilCancel;
        private testLoginOAuth;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
        private setExpiraceTextColumn;
        private createPlatnostText;
        private secondsToText;
        private oAuthTokenDeleteHromadneConfirm;
        private oAuthConsentExtend;
        private oAuthConsentExtendOK;
        private consentIsValid;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GPravidlo extends GContentBase {
        private pravidlo_id;
        private dat_od;
        private dat_do;
        private aktivita;
        private currentFilter;
        private grid;
        private sidebarCnt;
        private previewController;
        onContentReady(): void;
        private init;
        private createActions;
        private createGrid;
        private createGridFormat;
        private setDataToGrid;
        private registerPreviews;
        private createSidebar;
        private newPravidloDialog;
        private savePravidlo;
        private openDetail;
        private CreateValidationDate;
        private decodeBlobs;
        private base64ToUtf8;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GPravidloDetail extends GContentBase {
        private data;
        private form;
        private sidebarCnt;
        private content;
        private previewController;
        private gridTable;
        private gridParams;
        private gridEx;
        private gridRc;
        private currentFilter;
        onContentReady(): void;
        private init;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        createTitle(): string;
        private createForm;
        private activateDeactivateActions;
        private savePravidlo;
        private deactivatePravidlo;
        private activatePravidlo;
        private createTableGridFormat;
        private createTableGrid;
        private setDataToTableGrid;
        private addTableDialog;
        private addTable;
        private editTableDialog;
        private editTable;
        private activateTable;
        private deactivateTable;
        private createParamsGridFormat;
        private createParamGrid;
        private setDataToParamGrid;
        private addParamDialog;
        private addParam;
        private editParamDialog;
        private editParam;
        private activateParam;
        private deactivateParam;
        private createExGridFormat;
        private createExGrid;
        private setDataToExGrid;
        private addExDialog;
        private addEx;
        private editExDialog;
        private editEx;
        private activateEx;
        private deactivateEx;
        private updateMainGrid;
        private decodeBlobs;
        private base64ToUtf8;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * AdmAuditPristupu (historie změn)
     *
     * @author thazmuka
     * @since 484.1.0.0
     */
    class AdmAuditPristupu {
        private panelElement;
        private sxs;
        private typ_obj;
        private grid;
        private gtable;
        private bylRead;
        private oneRead;
        /**
         * vytvořit panel auditu přístupu (historie změn)
         * @param a_sxs ID objektu administrace
         * @param a_typ_obj Typ objektu administrace
         * @param a_one_read Příznak, že se má realizovat pouze jedno načtení - jinak se bude dělat při každém zobrazení tohoto sidebaru refresh dat ze serveru
         * @param sidebarElement
         */
        create(a_sxs: string, a_typ_obj: number, a_one_read?: boolean, sidebarElement?: JQuery<HTMLElement>): GSideBarPanelOptions;
        private createGrid;
        private createGtable;
        private server;
        private getGridAudit;
    }
}
declare namespace Gordic.Adm.WebControls {
    interface AdmAuditPristupuOptions {
        /** SXS */
        sxs: string;
        /** Typ objektu */
        typ_obj: number;
    }
    /** Nový audit přístupů */
    class AdmAuditPristupuNew {
        private sxs;
        private typ_obj;
        private grid;
        private dataListDescription;
        constructor(options: AdmAuditPristupuOptions);
        private createGrid;
        private loadData;
        getSidePanel(): Gordic.Gin.DetailBuilder.GDetailBuilderSbpanelOptionsId;
        getPanel(): Gordic.Gin.DetailBuilder.TabParamsId;
        getGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * Externí identifikace
     *
     * @author thazmuka
     * @since 484.1.0.0
     */
    class AdmExtIdentifikace {
        private panelElement;
        private sxs;
        private typ_obj;
        private grid;
        private server;
        /**
         * vytvořit panel auditu přístupu (historie změn)
         * @param a_sxs
         * @param a_typ_obj
         * @param sidebarElement
         */
        create(a_sxs: string, a_typ_obj: number, sidebarElement?: JQuery<HTMLElement>): GSideBarPanelOptions;
        private createGrid;
        private getGridExtSub;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * AdmPoznamky
     *
     * @author thazmuka
     * @since 484.1.0.0
     */
    class AdmPoznamky {
        private parentElement;
        private panelElement;
        private sxs;
        private typ_obj;
        private gcontent;
        /**
         * vytvořit panel poznámky
         * @param a_content
         * @param a_sxs
         * @param a_typ_obj
         * @param sidebarElement
         */
        create(a_content: GContent, a_sxs: string, a_typ_obj: number, sidebarElement?: JQuery<HTMLElement>): GSideBarPanelOptions;
        private gnotepanel;
        private createPoznamky;
        private isNullEmptyUndefined;
    }
}
declare namespace Gordic.Adm.WebControls {
    interface AdmPoznamkyOptions {
        /** SXS */
        sxs: string;
        /** Typ objektu */
        typ_obj: number;
        /** Content */
        cnt: GContent;
        /** Nový záznam */
        newRecord: boolean;
    }
    /** Nový audit přístupů */
    class AdmPoznamkyNew {
        private sxs;
        private typ_obj;
        private cnt;
        private panel;
        private gnotePanel;
        private poznamkyCount;
        private newRecord;
        constructor(options: AdmPoznamkyOptions);
        private createPoznamky;
        getSidePanel(): Gordic.Gin.DetailBuilder.GDetailBuilderSbpanelOptionsId;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmFunkcniMistoSpisovna extends GContentBase {
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
    class DetailAdmFunkcniMistoSpisovnaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmFunkcniMistoSpisovnaReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmFunkcniMistoSpisovnaSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmFunkcniMistoSpisovna extends GContentBase<SeznamAdmFunkcniMistoSpisovnaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmFunkcniMistoSpisovnaObj extends GAdmSeznamBase {
        private ixs_spi;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSpisovna extends GContentBase {
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
    class DetailAdmSpisovnaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSpisovnaReadDto> {
        private filterInterniSubjektyIco;
        private napovedaTags;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSpisovnaSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private setFormatToField;
        getSeznamAdmSpisovnaKategorieDokumentuTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getSeznamAdmSpisovnaKategorieDokumentuGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    class HelperTagsAdmSpisovna extends GContentBase {
        private grid;
        napovedaTags: DictionaryObject[];
        prepareContent(): void;
        private createActions;
        private closeSpecial;
    }
}
declare namespace Gordic.Adm.WebControls.AdmSpisovna {
    function openSeznamAdmFunkcniMistoSpisovna(data: any): void;
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSpisovna extends GContentBase<SeznamAdmSpisovnaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSpisovnaObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private seznamAdmSpisovnaKategorieDokumentu;
        private hromadnaOperaceAdmSpisovnaKategorieDokumentu;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSpisovnaKategorieDokumentu extends GContentBase {
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
    class DetailAdmSpisovnaKategorieDokumentuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSpisovnaKategorieDokumentuReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSpisovnaKategorieDokumentuSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmSpisovnaKategorieDokumentu extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmSpisovnaKategorieDokumentuObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmSpisovnaKategorieDokumentuReadDto> {
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSpisovnaKategorieDokumentu extends GContentBase<SeznamAdmSpisovnaKategorieDokumentuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSpisovnaKategorieDokumentuObj extends GAdmSeznamBase {
        ixs_spi: string;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * Designer seznamu spisových plánů
     *
     * @author thazmuka
     * @since 482.1.0.73
     */
    class SeznamSpisovePlany extends GContentBase<SeznamSpisovePlanyDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvořit seznam - definice objektu GRIDu, navázaných událostí atd... */
        private createGrid;
        /**
         * vytvořit menu
         */
        private createMenuBar;
        private createContextBar;
        private setMenuButtons;
        /** vytvořit sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * Designer seznamu spisových plánů
     *
     * @author thazmuka
     * @since 482.1.0.73
     */
    class SeznamSpisovePlanyDesigner extends SeznamBase {
        /** isl view gridu seznamu spisových plánů */
        view: Gordic.Isl.View<any>;
        static SeznamSpisovePlanyDesignerInit(that: GContentType<SeznamSpisovePlanyDesigner>): void;
        /** vytvořit formát seznamu - definice sloupců, napdpisů, šířek atd... */
        static createGridFormat(that: GContentType<SeznamSpisovePlanyDesigner>): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmDenikSslSpisovyUzel extends GContentBase {
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
    class DetailAdmDenikSslSpisovyUzelObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmDenikSslSpisovyUzelReadDto> {
        openSpisovyUzel: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmDenikSslSpisovyUzelSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmDenikSslSpisovyUzel extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmDenikSslSpisovyUzelObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmDenikSslSpisovyUzelReadDto> {
        openFromSpisUzel: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmDenikSslSpisovyUzel extends GContentBase<SeznamAdmDenikSslSpisovyUzelObj> {
        private seznamObj;
        onContentReady(): void;
        private getColumnOrder;
    }
    class SeznamAdmDenikSslSpisovyUzelObj extends GAdmSeznamBase {
        sslden: string;
        ixs_su: string;
        private openFromSpisovyUzel;
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
        applydata(filterData: any, poradi_new?: number): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmDenikSslStrediskoSpisovychUzlu extends GContentBase {
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
    class DetailAdmDenikSslStrediskoSpisovychUzluObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmDenikSslStrediskoSpisovychUzluReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmDenikSslStrediskoSpisovychUzluSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmDenikSslStrediskoSpisovychUzlu extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmDenikSslStrediskoSpisovychUzluObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmDenikSslStrediskoSpisovychUzluReadDto> {
        isFunkcniMisto: boolean;
        private strediskoName;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmDenikSslStrediskoSpisovychUzlu extends GContentBase<SeznamAdmDenikSslStrediskoSpisovychUzluObj> {
        private seznamObj;
        private nazev;
        onContentReady(): void;
    }
    class SeznamAdmDenikSslStrediskoSpisovychUzluObj extends GAdmSeznamBase {
        sslden: string;
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
        applydata(filterData: any, poradi_new?: number): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmDenikSslStupenUtajeni extends GContentBase {
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
    class DetailAdmDenikSslStupenUtajeniObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmDenikSslStupenUtajeniReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmDenikSslStupenUtajeniSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmDenikSslStupenUtajeni extends GContentBase<SeznamAdmDenikSslStupenUtajeniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmDenikSslStupenUtajeniObj extends GAdmSeznamBase {
        sslden: string;
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
        applydata(filterData: any, poradi_new?: number): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmFunkcniMistoDenikSsl extends GContentBase {
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
    class DetailAdmFunkcniMistoDenikSslObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmFunkcniMistoDenikSslReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmFunkcniMistoDenikSslSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmFunkcniMistoDenikSsl extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmFunkcniMistoDenikSslObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmFunkcniMistoDenikSslReadDto> {
        isFunkcniMisto: boolean;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmFunkcniMistoDenikSsl extends GContentBase<SeznamAdmFunkcniMistoDenikSslObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmFunkcniMistoDenikSslObj extends GAdmSeznamBase {
        sslden: string;
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
        applydata(filterData: any, poradi_new?: number): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GHromadnaOperaceAdmOpravneniDruhuDokumentu extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        private editMode;
        onContentReady(): void;
    }
    class GHromadnaOperaceAdmOpravneniDruhuDokumentuObj extends Gordic.Adx.WebControls.GAdxHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmOpravneniDruhuDokumentuDto> {
        private ixs_typ;
        private duvody_prist;
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
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmOpravneniDruhuDokumentu extends GContentBase<GSeznamAdmOpravneniDruhuDokumentuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmOpravneniDruhuDokumentuObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        ixs_typ: string;
        private getSrv;
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
        createHromadneDialog(): JQuery<HTMLElement> | null;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmRokDenikuSsl extends GContentBase {
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
    class DetailAdmRokDenikuSslObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmRokDenikuSslReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmRokDenikuSslSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createValidatorRok;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmRokDenikuSsl extends GContentBase<SeznamAdmRokDenikuSslObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmRokDenikuSslObj extends GAdmSeznamBase {
        sslden: string;
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
        applydata(filterData: any, poradi_new?: number): void;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSpisovyPlan extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        admRpEdiextid: boolean;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmSpisovyPlanObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSpisovyPlanDto> {
        openModal: boolean;
        private strediskaName;
        isPovolVycet(): boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSpisovyPlanDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private openSeznamAdmSpisovyZnak;
        private openSeznamAdmSpisovyPlanStrediskoSpisovychUzlu;
        private openExportSpisPlan;
        createStrediskaTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createStrediskaGroup(): IGTabGroupOptions;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSpisovyPlan extends GContentBase<SeznamAdmSpisovyPlanObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSpisovyPlanObj extends GAdmSeznamBase {
        private strediskaName;
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
        getSxs(data: any): IGAdmGridSxs;
        private openSeznamAdmSpisovyZnak;
        private openSeznamAdmSpisovyPlanStrediskoSpisovychUzlu;
        private openExportSpisPlan;
        private openImportSpisPlan;
        private openHromadnaOperaceStrediskoSpisUzel;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SpisovyPlanExport extends GContentBase {
        private form;
        private spis_pl;
        private spis_pl_nazev;
        private registerClass;
        private idNot;
        private srv;
        exportSpisPlan(): void;
        onContentReady(): void;
        private init;
        private createForm;
        private initAsyncTask;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SpisovyPlanInport extends GContentBase {
        private form;
        private registerClass;
        importSpisPlan(): void;
        onContentReady(): void;
        private init;
        private createForm;
        private initAsyncTask;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSpisovyPlanStrediskoSpisovychUzlu extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmSpisovyPlanStrediskoSpisovychUzluObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSpisovyPlanStrediskoSpisovychUzluReadDto> {
        openModal: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSpisovyPlanStrediskoSpisovychUzluSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmSpisovyPlanStrediskoSpisovychUzlu extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private editData;
        private editMode;
        private keys;
        onClose(): boolean;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmSpisovyPlanStrediskoSpisovychUzluObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmSpisovyPlanStrediskoSpisovychUzluReadDto> {
        private strediskoName;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSpisovyPlanStrediskoSpisovychUzlu extends GContentBase<SeznamAdmSpisovyPlanStrediskoSpisovychUzluObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSpisovyPlanStrediskoSpisovychUzluObj extends GAdmSeznamBase {
        private spis_pl;
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
        getSxs(data: any): IGAdmGridSxs;
        private editHromadne;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSpisovyZnak extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        admRpEdiextid: boolean;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmSpisovyZnakObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSpisovyZnakDto> {
        openModal: boolean;
        updateForm(): void;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSpisovyZnakDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class DialogPozastavitSkarOperace extends GContentBase {
        private spisoveZnaky;
        private formEl;
        private serviceCnt;
        private successSpisznak;
        private getCnt;
        onContentReady(): void;
        private init;
        private createForm;
        private createResultGrid;
        private createWizard;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GPrepocitatSpisoveZnakyResult extends GContentBase {
        result: Gordic.AdmIsl.Interface.GPrepocitatSpisoveZnakyOutputDto;
        prepareContent(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createGrid;
        private createGridFormat;
    }
}
declare namespace Gordic.Adm.WebControls {
    class ImportAdmSpisovyZnak extends GContentBase {
        private importDataObj;
        private metadata;
        private dataListDescription;
        onContentReady(): void;
        closing(): void;
    }
    class ImportAdmSpisovyZnakObj extends GBaseAdmImportData<Gordic.AdmIsl.Interface.GAdmSpisovyZnakDto> {
        createFinalForm(form: Gordic.Forms.Form): Gordic.Forms.Form;
        updateDatBeforeSave(formData: any, saveData: any[]): Gordic.AdmIsl.Interface.GAdmSpisovyZnakDto[];
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSpisovyZnak extends GContentBase<SeznamAdmSpisovyZnakObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSpisovyZnakObj extends GAdmSeznamBase {
        private prepocitatSpisoveZnakyAsyncClass;
        private spis_pl;
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
        getSxs(data: any): IGAdmGridSxs;
        getTreeProcessor(): Gordic.Data.Tree;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
        createProfilStrom(): GridProfile<any>[];
        profileChange(profileSetting: {
            oldProfile: GridProfile<any>;
            profile: GridProfile<any>;
        }): void;
        private openImportAdmSpisovyZnak;
        private openPozastavitSkarOperace;
        private openTrvalySkartacniSouhlas;
        private startAsyncTask;
        initAsyncTask(): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmTypDokumentu extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private admRpEdiextid;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmTypDokumentuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmTypDokumentuDto> {
        private isPovolSkartacniRezim;
        private isPovolDokumentAgendovyDoklad;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmTypDokumentuDto, close: boolean): any;
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
        private updateSkartacniRezim;
        private setSkartacniRezim;
        private reloadIxsSkr;
        createOpravneniKVecneSkupineGroup(): IGTabGroupOptions;
        createOpravneniKVecneSkupineTab(): Gordic.Gin.DetailBuilder.TabParamsId;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmTypDokumentu extends GContentBase<SeznamAdmTypDokumentuObj> {
        private seznamObj;
        private isPovolSkartacniRezim;
        private isPovolUpsr;
        onContentReady(): void;
    }
    class SeznamAdmTypDokumentuObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdmUmisteniResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdmUmisteniReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdmUmisteniReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdmUmisteni extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - umisteni */
        private umisteni;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** odstranit v�echny vlastn� t��dy ze statusbaru */
        private removeAllCustomClassOnStatusBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
        private openSeznamAdmUmisteniSpisovyUzel;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdmUmisteniDlg(parentContent: GContent, opt: {
        /** umisteni */
        umisteni: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdmUmisteniDlg(parentContent: GContent, opt: {
        /** umisteni */
        umisteni: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdmUmisteni extends GContentBase<SeznamAdmUmisteniDesigner> {
        private zobrazovatCisloObjektuKey;
        private filterPanelActive;
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * vytvo�it menu
         */
        private createMenuBar;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdmUmisteniDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdmUmisteniDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - umisteni */
        umisteni: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdmUmisteniListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdmUmisteniDesigner>, umisteni: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdmUmisteniDesigner>, umisteni: string): Forms.Form;
        static applyAction(that: GContentType<SeznamAdmUmisteniDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdmUmisteniDesignerInit
         *
         * @param {GContentType<SeznamAdmUmisteniDesigner>} that
         */
        static SeznamAdmUmisteniDesignerInit(that: GContentType<SeznamAdmUmisteniDesigner>, umisteni: string, withFilterPanel: boolean): void;
        static LoadData(that: GContentType<SeznamAdmUmisteniDesigner>, umisteni: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    /** inteface - Response slu�eb pro Detail */
    interface IDetailAdmUmisteniSpisovyUzelResponse {
        /** data v�stupu */
        data: Gordic.AdmIsl.Interface.GAdmUmisteniSpisovyUzelReadDto;
        result: {
            /** data v�stupu */
            data: Gordic.AdmIsl.Interface.GAdmUmisteniSpisovyUzelReadDto;
            /** chyby */
            errors: {
                /** zpr�va chyby */
                message: string;
            }[];
            /** typ v�stupu operace */
            kind: Adm.Utils.GOperationResultKind;
        };
    }
    /** Dialog detailu  */
    class DetailAdmUmisteniSpisovyUzel extends GContentBase<DetailBase> {
        private gridRemoteControl;
        private gridCssClass;
        /** PK - ixs_su */
        private ixs_su;
        /** PK - umisteni */
        private umisteni;
        /** data detailu */
        private data;
        /** p��znak p��m�ho p��stupu na detail */
        private detailCommand;
        /** Tab pro xxxx */
        /** onContentReady */
        onContentReady(): void;
        closing(): any;
        /** refreshDetail content */
        private refreshDetail;
        /** Na�ten� dat ze serveru na n�sledn� nastaven� na detail okn� */
        private loadData;
        private updateGrid;
        /** Ulo�en� dat formul��e do datab�ze */
        private saveData;
        private refreshGrid;
        /** init content */
        private init;
        /** vytvo�it statusbar */
        private createStatusBar;
        /** Skryt� v�ech flash */
        private HideAllFlash;
        /** Zobraz� p��znaku �sp�n�ho ulo�en� */
        private ShowSaveSuccess;
        /** Zobraz� p��znaku chyby p�i ulo�en� dat */
        private ShowSaveError;
        /** Zobraz� p��znaku chyby p�i na�ten� dat */
        private ShowLoadError;
        /** nastavit titulek dialogu */
        private setTitle;
        /** vytvo�it formul�� a na�ten� dat ze serveru */
        private createForm;
        private nextAndPreviousAction;
        /** vytvo�it menubar */
        private createMenuBar;
        /** odstranit v�echny vlastn� t��dy ze statusbaru */
        private removeAllCustomClassOnStatusBar;
        /** vytvo�it panel */
        private createPanel;
        /** odstranit sidebar */
        private removeSidebar;
        /** vytvo�it sidebar */
        private createSidebar;
        /** ob�erstven� panelu v sidebaru */
        private refreshPanel;
        /** vytov�en� pr�zdn�ho sidebar panelu s n�hledek */
        private setPreviewEmpty;
    }
}
declare namespace Gordic.Adm.Dialogs {
    function DetailAdmUmisteniSpisovyUzelDlg(parentContent: GContent, opt: {
        /** ixs_su */
        ixs_su: string | null;
        /** umisteni */
        umisteni: string | null;
        /** grid jquery element */
        grid?: JQuery<HTMLElement>;
        /** p��znak nov�ho z�znamu */
        newRecord?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    function SeznamAdmUmisteniSpisovyUzelDlg(parentContent: GContent, opt: {
        /** ixs_su */
        ixs_su: string | null;
        /** umisteni */
        umisteni: string | null;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}
declare namespace Gordic.Adm.WebControls {
    /** dialog seznamu  */
    class SeznamAdmUmisteniSpisovyUzel extends GContentBase<SeznamAdmUmisteniSpisovyUzelDesigner> {
        /** onContentReady */
        onContentReady(): void;
        /** init content */
        private init;
        /** nastavit titulek dialogu */
        private setTitle;
        private createContextBar;
        /**
         * vytvo�it menu
         */
        private createMenuBar;
        /**
         * otev��t detail
         */
        private openDetail;
        /** vytvo�it seznam - definice objektu GRIDu, nav�zan�ch ud�lost� atd... */
        private createGrid;
        /** vytvo�it sidebar */
        private createSidebar;
        /** odstranit sidebar */
        private removeSidebar;
        /**  vytvo�it panel */
        private createPanel;
        /** refresh panelu */
        private refreshPanel;
    }
}
declare namespace Gordic.Adm.WebControls {
    /**
     * SeznamAdmUmisteniSpisovyUzelDesigner
     *
     * @author JKLUSACEK
     * @since 482.1.0.119
     */
    class SeznamAdmUmisteniSpisovyUzelDesigner extends SeznamBase {
        /** z detail okna p�edan� atribut pro filtr seznamu */
        /** PK - ixs_su */
        ixs_su: string;
        /** PK - umisteni */
        umisteni: string;
        /** isl view gridu */
        view: Gordic.Isl.View<Gordic.AdmIsl.Interface.GAdmUmisteniSpisovyUzelListDto>;
        /** vytvo�it formul�� filtru - panel */
        static createFilter(that: GContentType<SeznamAdmUmisteniSpisovyUzelDesigner>, ixs_su: string, umisteni: string): JQuery<HTMLElement>;
        /** vytvo�it formul�� filtru - vytvo�� tam filtra�n� pol��ka */
        static createFilterForm(that: GContentType<SeznamAdmUmisteniSpisovyUzelDesigner>, ixs_su: string, umisteni: string): Forms.Form;
        static applyAction(that: GContentType<SeznamAdmUmisteniSpisovyUzelDesigner>, ev: any, ctx: any): any;
        /**
         * SeznamAdmUmisteniSpisovyUzelDesignerInit
         *
         * @param {GContentType<SeznamAdmUmisteniSpisovyUzelDesigner>} that
         */
        static SeznamAdmUmisteniSpisovyUzelDesignerInit(that: GContentType<SeznamAdmUmisteniSpisovyUzelDesigner>, ixs_su: string, umisteni: string): void;
        static LoadData(that: GContentType<SeznamAdmUmisteniSpisovyUzelDesigner>, ixs_su: string, umisteni: string): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmZpusobVyrizeni extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private adxCheckIcoNad;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private admRpEdiextid;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmZpusobVyrizeniObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmZpusobVyrizeniDto> {
        private strediskaName;
        private strediskoName;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmZpusobVyrizeniDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createFormStrediska;
        private createValidatorsStrediska;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmZpusobVyrizeni extends GContentBase<SeznamAdmZpusobVyrizeniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmZpusobVyrizeniObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailKonfiguraceDrms extends GContentBase {
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
    class GDetailKonfiguraceDrmsObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.AdmIsl.Interface.GAdmPracovniSkupinaDto> {
        private sslVerCompat;
        private usuVicDen;
        private usuVicGraf;
        private ginN23Adm;
        private isPovolZapis;
        create(): void;
        textPopis(): string | undefined | null;
        saveData(data: Gordic.AdmIsl.Interface.GKonfiguraceDrmsDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SslSestavy extends GContentBase {
        private existTableSslddil;
        onContentReady(): void;
        private init;
        private createActions;
        private createBreadcrumbs;
        private createMenubar;
        private createForm;
        private saveData;
        private getAlv;
        private getSestavyDatOdDatDoInterval;
        private getSestavyDat;
        private getSestavyRokOdRokOdInterval;
        private createValidatorRokOdRokDo;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GTraProGenerateTransakcniProtokolDialog extends GContentBase {
        private generovaniTransProtokoluAsyncTask;
        private generovaniTransProtokolTaskId;
        private formEl;
        onContentReady(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createForm;
        private generovat;
        private initAsyncTask;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailTraProKategorieUdalosti extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
    }
    class DetailTraProKategorieUdalostiObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GTraProKategorieUdalostiDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GTraProKategorieUdalostiDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamTraProKategorieUdalosti extends GContentBase<SeznamTraProKategorieUdalostiObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamTraProKategorieUdalostiObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailTraProUdalost extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
    }
    class DetailTraProUdalostObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GTraProUdalostDto> {
        private parametry;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GTraProUdalostDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createParametryTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createParametryGroup(): IGTabGroupOptions;
        private createParametryTable;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamTraProUdalost extends GContentBase<SeznamTraProUdalostObj> {
        private seznamObj;
        private isNS23;
        onContentReady(): void;
    }
    class SeznamTraProUdalostObj extends GAdmSeznamBase {
        private povolLoad;
        private gridFormatParametry;
        private generovaniPolozekTransProtokoluAsyncTask;
        private generovaniPolozekTransProtokoluTaskId;
        create(): void;
        openDetail(data: any, isNew: boolean): void;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        getDataCount(): JQueryPromise<Gordic.AdmIsl.Interface.GAdmCountData> | null;
        createBaseMenuBarActions(): void;
        createContextMenu(): MenuParams[];
        createFilterForm(): void;
        userhardDefaultFilter(hardFilter: any): any;
        collectData(data: any): void;
        applydata(filterData: any): void;
        checkBeforeApply(filterData: any): boolean;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
        createUserPanels(): GSideBarPanelOptions[];
        private refreshPanelParametry;
        private getGridFormatParametry;
        reportStarting(rep: IGPrintActionReportStarting<any>): void | JQueryPromise<IGPrintActionReportStarting<any>> | false;
        initAsyncTask(): void;
        startAsyncTask(): void;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Data.GridFormat<any>;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmAkceptovanySouborElPodatelnou extends GContentBase {
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
    class GDetailAdmAkceptovanySouborElPodatelnouObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmAkceptovanySouborElPodatelnouDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmAkceptovanySouborElPodatelnouDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class GSeznamAdmAkceptovanySouborElPodatelnou extends GContentBase<GSeznamAdmAkceptovanySouborElPodatelnouObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamAdmAkceptovanySouborElPodatelnouObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DialogAdmDiagnostikaDokumentu extends GContentBase {
        private cnt;
        private getCnt;
        onContentReady(): void;
        private init;
        private createForm;
        private createActions;
        private actOk;
        private createCommandbar;
        private padWithLeadingZeros;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmDruhZasilky extends GContentBase {
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
    class DetailAdmDruhZasilkyObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmDruhZasilkyReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmDruhZasilkySaveDto, close: boolean): void;
        private saveDataInternal;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls.AdmDruhZasilky {
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmDruhZasilky extends GContentBase<SeznamAdmDruhZasilkyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmDruhZasilkyObj extends GAdmSeznamBase {
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
        private setOmezeniEditaceComlumn;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmKategorieTypuPrilohy extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private admRpEdiextid;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmKategorieTypuPrilohyObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmKategorieTypuPrilohyDto> {
        openModal: boolean;
        returnValue: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmKategorieTypuPrilohyDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        returnValueFunction(): any;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmKategorieTypuPrilohy extends GContentBase<SeznamAdmKategorieTypuPrilohyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmKategorieTypuPrilohyObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmKombinacePostSluzeb extends GContentBase {
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
    class DetailAdmKombinacePostSluzebObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmKombinacePostSluzebReadDto> {
        private gridFunkce;
        private gridSpisUzly;
        private groupFunkce;
        private groupSpisUzel;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        setSpecialGroups(groups: IGTabGroupOptions[]): void;
        saveData(data: Gordic.AdmIsl.Interface.GAdmKombinacePostSluzebSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createSpecialValidator;
        private closeDialog;
        private funkceForm;
        private addFunkceOK;
        private editFunkce;
        createPovFunkceTab(panel: JQuery<HTMLElement>): void;
        private spisUzlyForm;
        private addSpisUzelOK;
        private editSpisUzly;
        createPovSpisUzlyTab(panel: JQuery<HTMLElement>): void;
    }
}
declare namespace Gordic.Adm.WebControls.AdmKombinacePostSluzeb {
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmKombinacePostSluzeb extends GContentBase<SeznamAdmKombinacePostSluzebObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmKombinacePostSluzebObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    export class DetailAdmKrokTrasy extends GContentBase {
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
    export class DetailAdmKrokTrasyObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmKrokTrasyReadDto> {
        parametry_forms: GParametrForm[];
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmKrokTrasySaveDto, close: boolean): any;
        private getDataParametryForm;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getParametryKrokuTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getParametryKrokuGroup(): IGTabGroupOptions;
        private createTabContent;
        private setEditModeTab;
        private createTabFormsAndGrids;
        private createFormFunkcniMisto;
        private createFormUzivatelskeRozhodnuti;
        private createVzitNaVedomiForm;
        private createFormSchvalitObsahDokumentu;
        private createFormPokyn;
        private createZapisHistorie;
        private createParallelTrasy;
        private createFormAutomatickePredani;
        private createFormAutomatickeZalozeniCj;
        private createFormAutomatickeVyrizeniCj;
        private createFormAutomaticvkeZalozeniSpisu;
        private createFormAutomatickeVyrizeniSpisu;
        private createFormAutomatickeVyrizeniAdActa;
        private createFormAutomaticClose;
        private createFormOdeslaniMailu;
        private createFormPozastaveniTrasy;
        private createFormVykonaniPrikazu;
        private createFormVetveniTrasyVyraz;
        private createFormPodmineneCekani;
        private createFormExpression;
        private getDataFromParams;
        private getTxtDataFromModel;
        private createParamDbObj;
    }
    interface GParametrForm {
        name: string;
        elObj: JQuery<HTMLElement>;
        id: number;
        fields?: string[];
        convertData: (parametry: Gordic.Adm.Interface.GWfldcftDto[]) => any;
        collectData: (data: any) => Gordic.Adm.Interface.GWfldcftDto[];
    }
    export {};
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmKrokTrasyPuvodni extends GContentBase {
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
    class DetailAdmKrokTrasyPuvodniObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmKrokTrasyReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmKrokTrasySaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmKrokTrasy extends GContentBase<SeznamAdmKrokTrasyObj> {
        private seznamObj;
        onContentReady(): void;
        private columnOrder;
    }
    class SeznamAdmKrokTrasyObj extends GAdmSeznamBase {
        ixs_tra: string;
        wfl_trasy_new: boolean;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmOperaceZpusobuZverejneni extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private admRpEdiextid;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmOperaceZpusobuZverejneniObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmOperaceZpusobuZverejneniDto> {
        openModal: boolean;
        returnValue: boolean;
        private srv;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmOperaceZpusobuZverejneniDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        createAdmSestavaProOperaciZpusobuZverejneniGroup(): IGTabGroupOptions;
        createAdmPisemnostProOperaciZpusobuZverejneniGroup(): IGTabGroupOptions;
        createAdmSestavaProOperaciZpusobuZverejneniTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        createAdmPisemnostProOperaciZpusobuZverejneniTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private openAdmSestavaProOperaciZpusobuZverejneni;
        private openAdmPisemnostProOperaciZpusobuZverejneni;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmOperaceZpusobuZverejneni extends GContentBase<SeznamAdmOperaceZpusobuZverejneniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmOperaceZpusobuZverejneniObj extends GAdmSeznamBase {
        private ixs_zpv;
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
        getSxs(data: any): IGAdmGridSxs;
        private openAdmSestavaProOperaciZpusobuZverejneni;
        private openAdmPisemnostProOperaciZpusobuZverejneni;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmPisemnostProOperaciZpusobuZverejneni extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private admRpEdiextid;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmPisemnostProOperaciZpusobuZverejneniObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmPisemnostProOperaciZpusobuZverejneniDto> {
        openModal: boolean;
        returnValue: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmPisemnostProOperaciZpusobuZverejneniDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmPisemnostProOperaciZpusobuZverejneni extends GContentBase<SeznamAdmPisemnostProOperaciZpusobuZverejneniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmPisemnostProOperaciZpusobuZverejneniObj extends GAdmSeznamBase {
        private ixs_zpv;
        private operace;
        private getSrv;
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
        getSxs(data: any): IGAdmGridSxs;
        updateAktivitaHromadne(vybraneObjekty: any[]): JQueryPromise<any> | null;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmPostovniSluzbaProZasilky extends GContentBase {
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
    class DetailAdmPostovniSluzbaProZasilkyObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmPostovniSluzbaProZasilkyReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmPostovniSluzbaProZasilkySaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls.AdmPostovniSluzbaProZasilky {
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmPostovniSluzbaProZasilky extends GContentBase<SeznamAdmPostovniSluzbaProZasilkyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmPostovniSluzbaProZasilkyObj extends GAdmSeznamBase {
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
        private setOmezeniEditaceComlumn;
        selectionGridAct(objArr: IGGridSelection<any>): void;
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmProfilVlastnosti extends GContentBase {
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
    class DetailAdmProfilVlastnostiObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmProfilVlastnostiReadDto> {
        private gridVazby;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmProfilVlastnostiSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createValidatorKod;
        createAdmProfilVlastnostiObsahSubTask(): Gordic.Gin.DetailBuilder.TabParamsId;
        createAdmProfilVlastnostiVazbySubTask(): Gordic.Gin.DetailBuilder.TabParamsId;
        createAdmProfilVlastnostiObsahGroup(): IGTabGroupOptions;
        createAdmProfilVlastnostiVazbyGroup(): IGTabGroupOptions;
        private openSeznamAdmProfilObjekt;
        private openSeznamAdmVlastnostTypDokumentu;
        private createGridVazby;
        private createGridFormatVazby;
        private getVazbyProfilu;
        private openDetailVlastnostProfil;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmProfilVlastnosti extends GContentBase<SeznamAdmProfilVlastnostiObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmProfilVlastnostiObj extends GAdmSeznamBase {
        private srv;
        private getSrv;
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
        getSxs(data: any): IGAdmGridSxs;
        private openHromadnePridaniProfilyTypObjektu;
        private openHromadnePridaniVlastnostTypDokumentu;
        private openSeznamAdmProfilObjekt;
        private openSeznamAdmVlastnostTypDokumentu;
        private generCodeAutomaticky;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmProfilVlastnostiObsah extends GContentBase {
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
    class DetailAdmProfilVlastnostiObsahObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmProfilVlastnostiObsahReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmProfilVlastnostiObsahSaveDto, close: boolean): any;
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
        private openNewStrukturaVlastnosti;
        private openNewVlastnost;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmProfilVlastnostiObsah extends GContentBase<SeznamAdmProfilVlastnostiObsahObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmProfilVlastnostiObsahObj extends GAdmSeznamBase {
        private ixs_pro;
        create(): void;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSablonaElektronickychPodpisu extends GContentBase {
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
    class DetailAdmSablonaElektronickychPodpisuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSablonaElektronickychPodpisuReadDto> {
        private selectedTypePodpis;
        private guidsFiles;
        private srv;
        private base64string;
        private newVersion;
        private isPovolStrankaPodpisu;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        removeTempFiles(): void;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSablonaElektronickychPodpisuSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createFormVizPodpisPres;
        private getDuvodButtons;
        private getTextPolozky;
        private addDuvod;
        private addText;
        private uploadImage;
        private setBackgroundImg;
        private removeImage;
        enableMdField(newRecord: boolean): void;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSablonaElektronickychPodpisu extends GContentBase<SeznamAdmSablonaElektronickychPodpisuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSablonaElektronickychPodpisuObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSablonaPostovnichZasilek extends GContentBase {
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
    class DetailAdmSablonaPostovnichZasilekObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSablonaPostovnichZasilekReadDto> {
        private gridFunkce;
        private gridSpisUzly;
        private groupFunkce;
        private groupSpisUzel;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        setSpecialGroups(groups: IGTabGroupOptions[]): void;
        setSpecialTabs(tabs: Gordic.Gin.DetailBuilder.TabParamsId[]): void;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSablonaPostovnichZasilekSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private closeDialog;
        private funkceForm;
        private addFunkceOK;
        private editFunkce;
        createPovFunkceTab(panel: JQuery<HTMLElement>): void;
        private spisUzlyForm;
        private addSpisUzelOK;
        private editSpisUzly;
        createPovSpisUzlyTab(panel: JQuery<HTMLElement>): void;
    }
}
declare namespace Gordic.Adm.WebControls.AdmSablonaPostovnichZasilek {
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSablonaPostovnichZasilek extends GContentBase<SeznamAdmSablonaPostovnichZasilekObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSablonaPostovnichZasilekObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSestavaProOperaciZpusobuZverejneni extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private admRpEdiextid;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmSestavaProOperaciZpusobuZverejneniObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSestavaProOperaciZpusobuZverejneniDto> {
        openModal: boolean;
        returnValue: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSestavaProOperaciZpusobuZverejneniDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSestavaProOperaciZpusobuZverejneni extends GContentBase<SeznamAdmSestavaProOperaciZpusobuZverejneniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSestavaProOperaciZpusobuZverejneniObj extends GAdmSeznamBase {
        private ixs_zpv;
        private operace;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmSlozkaSk extends GContentBase {
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
    class DetailAdmSlozkaSkObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSlozkaSkReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSlozkaSkSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmSlozkaSk extends GContentBase<SeznamAdmSlozkaSkObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmSlozkaSkObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GDetailAdmSpisovyGraf extends GContentBase {
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
    class GDetailAdmSpisovyGrafObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmSpisovyGrafDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmSpisovyGrafDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private refreshTree;
        private openTree;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GTreeAdmSpisovyGraf extends GContentBase {
        private data;
        private ixs_su_root;
        private grid;
        onContentReady(): void;
        private init;
        private createGrid;
        private createGridFormat;
        private setDataToGrid;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmStrukturaVlastnosti extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        returnValue: boolean;
        openModal: boolean;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmStrukturaVlastnostiObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmStrukturaVlastnostiReadDto> {
        private gridVazby;
        private gridNadrizene;
        returnValue: boolean;
        openModal: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmStrukturaVlastnostiSaveDto, close: boolean): any;
        returnValueFunction(): {
            ixs_stv: string;
        } | null;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private createValidatorKod;
        createAdmStrukturaVlastnostiObsahSubTask(): Gordic.Gin.DetailBuilder.TabParamsId;
        createAdmStrukturaVlastnostiVazbySubTask(): Gordic.Gin.DetailBuilder.TabParamsId;
        createNadrizeneSubTask(): Gordic.Gin.DetailBuilder.TabParamsId;
        createNadrizeneGroup(): IGTabGroupOptions;
        createAdmStrukturaVlastnostiObsahGroup(): IGTabGroupOptions;
        createAdmStrukturaVlastnostiVazbyGroup(): IGTabGroupOptions;
        private openSeznamAdmStrukturaNavazanyObjekt;
        private openSeznamAdmVlastnostTypDokumentu;
        private openDetailVlastnostProfil;
        private createGridVazby;
        private createGridFormatVazby;
        private getVazbyStruktury;
        private getNadrizene;
        private createGridNadrizene;
        private createGridFormatNadrizene;
        private openDetailProfil;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmStrukturaVlastnosti extends GContentBase<SeznamAdmStrukturaVlastnostiObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmStrukturaVlastnostiObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private openHromadnePridaniStrukturyTypObjektu;
        private openHromadnePridaniVlastnostTypDokumentu;
        private openSeznamAdmStrukturaNavazanyObjekt;
        private openSeznamAdmVlastnostTypDokumentu;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmStrukturaVlastnostiObsah extends GContentBase {
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
    class DetailAdmStrukturaVlastnostiObsahObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmStrukturaVlastnostiObsahReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmStrukturaVlastnostiObsahSaveDto, close: boolean): any;
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
        private openNewVlastnost;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmStrukturaVlastnostiObsah extends GContentBase<SeznamAdmStrukturaVlastnostiObsahObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmStrukturaVlastnostiObsahObj extends GAdmSeznamBase {
        private ixs_stv;
        create(): void;
        updateGridFormat(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmTrasaProTypDokumentu extends GContentBase {
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
    class DetailAdmTrasaProTypDokumentuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmTrasaProTypDokumentuReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmTrasaProTypDokumentuSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceAdmTrasaProTypDokumentu extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        onContentReady(): void;
    }
    class HromadnaOperaceAdmTrasaProTypDokumentuObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmTrasaProTypDokumentuReadDto> {
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmTrasaProTypDokumentu extends GContentBase<SeznamAdmTrasaProTypDokumentuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmTrasaProTypDokumentuObj extends GAdmSeznamBase {
        ixs_tra: string;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmTrasaWorkflow extends GContentBase {
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
    class DetailAdmTrasaWorkflowObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmTrasaWorkflowReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmTrasaWorkflowSaveDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        getKrokyTrasyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getKrokyTrasyGroup(): IGTabGroupOptions;
        getTypyDokumentuTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        getTypyDokumentuGroup(): IGTabGroupOptions;
        private openAdmKrokyTrasy;
        private openAdmTrasaProTypDokumentu;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmTrasaWorkflow extends GContentBase<SeznamAdmTrasaWorkflowObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmTrasaWorkflowObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private openAdmKrokyTrasy;
        private openAdmTrasaProTypDokumentu;
        private priraditHromadneTrasyTypumDokumentu;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmVlastnost extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        returnValue: boolean;
        openModal: boolean;
        isVycet: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmVlastnostObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmVlastnostDto> {
        private gridNadrizene;
        returnValue: boolean;
        openModal: boolean;
        private srv;
        private vazbaTmp;
        private getSrv;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmVlastnostDto, close: boolean): any;
        returnValueFunction(): {
            ixs_vla: string;
        } | null;
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
        createHodnotaVlastnostSubTask(): Gordic.Gin.DetailBuilder.TabParamsId;
        createHodnotaVlastnostGroup(): IGTabGroupOptions;
        createNadrizeneSubTask(): Gordic.Gin.DetailBuilder.TabParamsId;
        createNadrizeneGroup(): IGTabGroupOptions;
        private createGridNadrizene;
        private createGridFormatNadrizene;
        private getNadrizene;
        private createValidatorKod;
        private createValidatorKodForm;
        private openSeznamAdmVlastnostObjekt2;
        private openSeznamAdmVlastnostTypDokumentu;
        private openDetailStrukturaProfil;
        private openDefaultValueVlastnost;
        private saveVazby;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DialogAdmVlastnostDefaultValue extends GContentBase {
        data: Gordic.AdmIsl.Interface.GAdmVlastnostDto;
        private formArea;
        prepareContent(): void;
        private createActions;
        private createForm;
        private saveDefaultValue;
        private getDefaultValue;
        private createCommandBar;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmVlastnost extends GContentBase<SeznamAdmVlastnostObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmVlastnostObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private openHromadnePridaniVlastnostiTypObjektu;
        private openHromadnePridaniVlastnostTypDokumentu;
        private openSeznamAdmVlastnostObjekt;
        private openSeznamAdmVlastnostTypDokumentu;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmVlastnostHodnota extends GContentBase {
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
    class DetailAdmVlastnostHodnotaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmVlastnostHodnotaReadDto> {
        openModal: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmVlastnostHodnotaSaveDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never>;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmVlastnostHodnota extends GContentBase<SeznamAdmVlastnostHodnotaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmVlastnostHodnotaObj extends GAdmSeznamBase {
        private ixs_vla;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmVlastnostTypDokumentu extends GContentBase {
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
    class DetailAdmVlastnostTypDokumentuObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmVlastnostTypDokumentuReadDto> {
        typ_vps: number;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmVlastnostTypDokumentuSaveDto, close: boolean): any;
        private getIxs;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls {
    class HromadnaOperaceVlastnostTypDokumentu extends GContentBase {
        private hromadnaOperaceObj;
        private data;
        private keys;
        onContentReady(): void;
    }
    class HromadnaOperaceVlastnostTypDokumentuObj extends GAdmHromadnaOperaceBase<Gordic.AdmIsl.Interface.GAdmVlastnostTypDokumentuReadDto> {
        ico: string;
        typ_vps: number;
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
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmVlastnostTypDokumentu extends GContentBase<SeznamAdmVlastnostTypDokumentuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmVlastnostTypDokumentuObj extends GAdmSeznamBase {
        private ixs_typ;
        private ico;
        private ixs;
        private typ_vps;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmVyberovaSkupina extends GContentBase {
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
    class DetailAdmVyberovaSkupinaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmVyberovaSkupinaReadDto> {
        returnValue: boolean;
        openModal: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmVyberovaSkupinaSaveDto, close: boolean): any;
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
        private removeFromDb;
        private openSeznamAdmVyberovaSkupinaObsah;
        createObsahVyberoveSkupinyGroup(): IGTabGroupOptions;
        createObsahVyberoveSkupinyTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        returnValueFunction(): {
            ixs_blk: string;
        } | null;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GAdmVyberovaSkupinaDialog extends GContentBase {
        private data;
        private canAddVyberovaSkupina;
        private typ_subj;
        private ixs_fun;
        private srv;
        private getSrv;
        onContentReady(): void;
        private init;
        private createActions;
        private createCommandBar;
        private createInfoFlash;
        private createForm;
        private createNewVyberovaSkupina;
        private vyberovaSkupinaOK;
        private saveDataVyberovaSkupina;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GAdmVyberovaSkupinaVyberDialog extends GContentBase {
        private typ_obj;
        private grid;
        prepareContent(): void;
        private init;
        private createForm;
        private createTabs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmVyberovaSkupina extends GContentBase<SeznamAdmVyberovaSkupinaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmVyberovaSkupinaObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private openSeznamAdmVyberovaSkupina;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmVyberovaSkupinaObsah extends GContentBase<SeznamAdmVyberovaSkupinaObsahObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmVyberovaSkupinaObsahObj extends GAdmSeznamBase {
        private ixs_blk;
        private srv;
        private getSrv;
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
        getSxs(data: any): IGAdmGridSxs;
        private removeFromDb;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmZpusobDoruceni extends GContentBase {
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
    class DetailAdmZpusobDoruceniObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmZpusobDoruceniReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmZpusobDoruceniSaveDto, close: boolean): any;
        private saveDataInternal;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
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
declare namespace Gordic.Adm.WebControls.AdmZpusobDoruceni {
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmZpusobDoruceni extends GContentBase<SeznamAdmZpusobDoruceniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmZpusobDoruceniObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailAdmZpusobZverejneni extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private admRpEdiextid;
        returnValue: boolean;
        openModal: boolean;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailAdmZpusobZverejneniObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GAdmZpusobZverejneniDto> {
        openModal: boolean;
        returnValue: boolean;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GAdmZpusobZverejneniDto, close: boolean): JQuery.PromiseBase<never, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        private saveDataSpecial;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        returnValueFunction(): any;
        private formPovolTypySouboru;
        createOperaceZpusobuZverejneniGroup(): IGTabGroupOptions;
        createOperaceZpusobuZverejneniTab(): Gordic.Gin.DetailBuilder.TabParamsId;
        private operaceZpusobuZverejneni;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamAdmZpusobZverejneni extends GContentBase<SeznamAdmZpusobZverejneniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamAdmZpusobZverejneniObj extends GAdmSeznamBase {
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
        getSxs(data: any): IGAdmGridSxs;
        private operaceZpusobuZverejneni;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailCertifikacniAutorita extends GContentBase {
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
    class DetailCertifikacniAutoritaObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GCertifikacniAutoritaReadDto> {
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GCertifikacniAutoritaSaveDto, close: boolean): void;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private getCaption;
        private exportCertificate;
        private changeAkreditovana;
        private changeAktivita;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DialogExportCertifikacniAutorita extends GContentBase {
        private formElName;
        private formElDownloadFile;
        private fileContent;
        private fileType;
        private defaultName;
        private srv;
        onClose(): void;
        downloadCertificate(): void;
        exportCertificate(): void;
        onContentReady(): void;
        private init;
        private createFormName;
        private createFormDownloadFile;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DialogImportCertifikacniAutorita extends GContentBase {
        private srv;
        private formEl;
        private asyncTask;
        private getSrv;
        importCertificate(): void;
        onClose(): void;
        onContentReady(): void;
        private init;
        private createForm;
        private failNot;
        private successNot;
        private initializeAsyncTask;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GGResultImportCertifikatyEU extends GContentBase {
        private grid;
        private results;
        prepareContent(): void;
        private createGrid;
        private createActions;
        private createCommandBar;
    }
}
declare namespace Gordic.Adm.WebControls {
    class GResultNacteniCertifikatuEU extends GContentBase {
        private grid;
        private results;
        prepareContent(): void;
        private updateResults;
        private createGrid;
        private createActions;
        private createCommandBar;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamCertifikacniAutorita extends GContentBase<SeznamCertifikacniAutoritaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamCertifikacniAutoritaObj extends GAdmSeznamBase {
        private registerAsyncClass;
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
        getSxs(data: any): IGAdmGridSxs;
        private importCertificate;
        private nacteniCertifikatuEU;
        private initAsyncTaskLoadCertificates;
        private zmenaPriznakuAkreditace;
        private zmenaAktivity;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailDenikSsl extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        private admRpEdiextid;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        closing(): JQuery.Deferred<any, any, any>;
    }
    class DetailDenikSslObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GDenikSslDto> {
        nazev: string;
        create(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GDenikSslDto, close: boolean): any;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private getFieldActions;
        private getNabidkaZastupnychZnaku;
        private setPredpisToField;
        private openRokyPodacihoDeniku;
        private openDenikSslSpisovyUzel;
        private openFunkcniMistoDenikSsl;
        private openDenikSslOrganizacniStredisko;
        private openAdmDenikSslStrediskoSpisovychUzlu;
        private openAdmDenikSslStupenUtajeni;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamDenikSsl extends GContentBase<SeznamDenikSslObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamDenikSslObj extends GAdmSeznamBase {
        nazev: string;
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
        getSxs(data: any): IGAdmGridSxs;
        private openRokyPodacihoDeniku;
        private openDenikSslSpisovyUzel;
        private openDenikSslOrganizacniStredisko;
        private openAdmFunkcniMistoDenikSsl;
        private openSeznamAdmDenikSslStrediskoSpisovychUzlu;
        private openAdmDenikSslStupenUtajeni;
        private openHromadnaOperaceAdmDenikSslSpisovyUzel;
        private openHromadnaOperaceOrganizacniJednotkaDenikSsl;
        private openHromadnaOperaceAdmFunkcniMistoDenikSsl;
        private openHromadnaOperaceAdmDenikSslStrediskoSpisovychUzlu;
    }
}
declare namespace Gordic.Adm.WebControls {
    class DetailFormularSk extends GContentBase {
        private dataListDescription;
        private data;
        private newRecord;
        private detailObj;
        private currentFilter;
        private gridRc;
        private createPreviousAndNextAction;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onContentReady(): void;
        onClose(): void;
    }
    class DetailFormularSkObj extends GAdmDetailBase<Gordic.AdmIsl.Interface.GFormularSkReadDto> {
        private povolPrizImportExport;
        private povolSlozka;
        private povolFormularDolozky;
        private povolPevnaHodnota;
        private povolPrilohaXml;
        private serviceContent;
        private guids;
        private guidsXml;
        private oldIxsUlo;
        private newIxsUlo;
        private gridPolozkyFormulare;
        private gridMapovanePolozkyFormulare;
        private editPolozka;
        private getSrv;
        private fieldsData;
        create(): void;
        removeFiles(): void;
        textPopis(): string | undefined | null;
        setSxsDetail(): string;
        saveData(data: Gordic.AdmIsl.Interface.GFormularSkDto, close: boolean): any;
        private validatePolozkyMapovani;
        private saveDataIsl;
        reloadData(filterObj: any, dataObj: any): void;
        updateGrid(filter: any, grid: any): any;
        createTitle(): string;
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        setEditMode(editMode: boolean): void;
        createForm(): void;
        private validateSameFormular;
        getFilesFieldsData(): Gordic.Gin.DetailBuilder.TabParamsId;
        getGroupFilesFieldsData(): IGTabGroupOptions;
        getPolozkyFormulare(): Gordic.Gin.DetailBuilder.TabParamsId;
        getPolozkyFormulareGroup(): IGTabGroupOptions;
        getMapovanePolozkyFormulare(): Gordic.Gin.DetailBuilder.TabParamsId;
        getMapovanePolozkyFormulareGroup(): IGTabGroupOptions;
        private createGridMapovanePolozky;
        private addMapovanaPolozka;
        private removeMapovanaPolozka;
        private getPolozkyFormulareMapovani;
        private createValidatorUniqueMap;
        private createGridFiles;
        private createGridFormatPolozkyFormulare;
        private addPolozkaFormulare;
        private removePolozkaFormulare;
        private getPolozkyFormulareData;
        private createValidatorUnique;
        private dialogFileXml;
        private dialogFileXmlOk;
        private getDataFromXmlEmpty;
        private getDataFromXmlEmptyOk;
        private setPolozkyToGrid;
        private formSettings;
        private getCurrentFormExtensions;
        private createFormFiles;
        private openDialogFile;
        private downloadFile;
        private removeFile;
        private upsvEmptyFile;
        private getDataFromFields;
    }
}
declare namespace Gordic.Adm.WebControls {
    class SeznamFormularSk extends GContentBase<SeznamFormularSkObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class SeznamFormularSkObj extends GAdmSeznamBase {
        povolSlozka: boolean;
        povolFormDol: boolean;
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
        getSxs(data: any): IGAdmGridSxs;
    }
}
