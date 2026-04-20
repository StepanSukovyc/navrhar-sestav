declare namespace Gordic.Vyp.Dialogs {
    /**
     * Otevře prehled vypravencych
     *
     * @author  JSindelka
     * @date    7.1.2019
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<undefined>} Promise.
     */
    function OpenProvedenaVypraveniDlg(parentContent: GContent, opt?: {
        TridVyp: number;
        ZpusobDor: Wfl.Interface.WflczpdEnum;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<boolean | undefined>;
    function EditaceZasilkyDlg(parentContent: GContent, opt: {
        data: Wfl.Interface.GEditaceZasilkyDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GEditaceZasilkyDto>;
    function PredplneniZasilkyDlg(parentContent: GContent, opt: {
        data: Wfl.Interface.GPredplneniZasilekDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GPredplneniZasilekDto>;
    function CenikSluzebDlg(parentContent: GContent, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GEditaceZasilkyDto>;
    function CenikZasilekDlg(parentContent: GContent, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GEditaceZasilkyDto>;
    function EditacePolozkyCenikuDlg(parentContent: GContent, opt: {
        Detail: Wfl.Interface.GCenikPostyDetailDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GCenikPostyDetailDto>;
    /**
* automaticke ukladani
*
* @author  JSindelka
* @date    22.11.2019
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @returns {JQueryPromise<undefined>} Promise.
*/
    function DataMatrixCteckaCallDlg(parentContent: GContent, opt?: {
        DataMatrixDto: Wfl.Interface.GDataMatrixDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Wfl.Interface.GDataMatrixDto | undefined>;
}
declare namespace Gordic.Vyp.Icons {
    enum ActionEnum {
        frankovaniOnline = "fa-pencil-square-o",
        frankovaniOffline = "fa-link"
    }
}
declare namespace Gordic.Vyp.Globals.Enums {
    enum ActionsName {
        Vypravit = "actVypravit",
        OveritAdresaty = "actOveritAdresaty",
        FrankovaniOnline = "actFrankovaniOnline",
        FrankovaniOffline = "actFrankovaniOffline",
        PrevzitSFrankovanim = "actPrevzitSFrankovanim",
        ImportDatEpaPosty = "actImportDatEpaPosty",
        TiskPodacihoArchu = "actTiskPodacihoArchu",
        TiskEvidListPostovneho = "actTiskEvidListPostovneho",
        TiskKnihyVypravenePosty = "actTiskKnihyVypravenePosty",
        TiskVykazu = "actTiskVykazu",
        TiskNakladu = "actTiskNakladu"
    }
    enum TypTiskuPodacihoArchu {
        netisknou = 0,
        tisknout = 10,
        tisknoutDoporucene = 30,
        tisknoutDoZahranici = 50,
        tisknoutDoZahraniciDoporucene = 60
    }
}
declare namespace Gordic.Vyp.Others {
    class StartPage extends GContentBase<Wfl.AC.WflBaseAC> {
        model: Wfl.Interface.GWflSouhrnInfoBaseDto;
        scorecardItems: any[];
        divSection0: JQuery<HTMLElement> | undefined;
        divSection1: JQuery<HTMLElement> | undefined;
        divSection2: JQuery<HTMLElement> | undefined;
        onContentReady(): void;
        GenerateKpi(): void;
        ShowCounts(): void;
        LoadData(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Vyp.AppSettings {
    /**
     * Cesta k objetu nastavení zásilky v GStore.
     *
     * @author  JSindelka
     * @date    30.04.2019
     */
    const VypBaseSettingsPath = "Global.Vyp.AppSettings.VypBaseSettings";
    /**
     * Vrátí hodnoty uživatelského nastavení zásilky.
     *
     * @author  JSindelka
     * @date    30.04.2019
     *
     * @returns {Gordic.Vyp.WebControls.GVypBaseSettingsDto} Hodnoty uživatelského nastavení zásilky.
     */
    function GetVypBaseSettings(): Gordic.Vyp.WebControls.GVypBaseSettingsDto;
    /**
     * Nastaví hodnoty uživatelského nastavení zásilky.
     *
     * @author  JSindelka
     * @date    30.04.2019
     *
     * @param {Gordic.Vyp.AppSettings.GVypBaseSettingsDto | null} value Hodnoty uživatelského nastavení zásilky.
     */
    function SetVypBaseSettings(value: Gordic.Vyp.WebControls.GVypBaseSettingsDto | null): void;
    /**
     * Formulář uživatelského nastavení vypravení.
     *
     * @author  JSindelka
     * @date    30.04.2019
     */
    function VypBaseSettingsForm(): Forms.Form;
}
declare namespace Gordic.Vyp.AppSettings {
    /**
     * Cesta k objetu nastavení zásilky v GStore.
     *
     * @author  JSindelka
     * @date    30.04.2019
     */
    const VypraveniSettingsPath = "Global.Vyp.AppSettings.VypraveniSettings";
    /**
 * Vrátí hodnoty uživatelského nastavení zásilky.
 *
 * @author  JSindelka
 * @date    30.04.2019
 *
 * @returns {Gordic.Vyp.WebControls.GVypraveniSettingsDto} Hodnoty uživatelského nastavení zásilky.
 */
    function GetVypraveniSettings(content: GContent): Gordic.Wfl.Interface.GVypraveniSettingsDto;
    /**
     * Nastaví hodnoty uživatelského nastavení zásilky.
     *
     * @author  JSindelka
     * @date    30.04.2019
     *
     * @param {Gordic.Vyp.AppSettings.IGVypraveniSettings | null} value Hodnoty uživatelského nastavení zásilky.
     */
    function SetVypraveniSettings(content: GContent, value: Gordic.Wfl.Interface.GVypraveniSettingsDto | null): void;
    /**
     * Formulář uživatelského nastavení vypravení.
     *
     * @author  JSindelka
     * @date    30.04.2019
     */
    function VypraveniSettingsForm(): Forms.Form;
}
declare namespace Gordic.Vyp.AppSettings {
    function VypPrintSettingsForm(): Forms.Form;
}
declare namespace Gordic.Vyp.Lists {
    class DataMatrixCteckaDlg extends GContentBase<Wfl.AC.WflBaseAC> {
        model: Wfl.Interface.GDataMatrixDto;
        validators: any;
        onContentReady(): void;
        CreateForm(): void;
        SetField(): void;
        SetInfo(): void;
        ZpracujData(): void;
        ZpracujDataZasilky(): void;
        OKClick(): void;
        ZpracujDataMatrix(): void;
        ZpracujPodaciCislo(): void;
        ApplyModel(): void;
        ExitClick(): void;
    }
}
declare namespace Gordic.Vyp.Dlg {
    class EditacePolozkyCenikuDlg extends GContentBase {
        model: Wfl.Interface.GCenikPostyDetailDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Vyp.Dlg {
    class EditaceZasilkyDlg extends GContentBase {
        model: Wfl.Interface.GEditaceZasilkyDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Vyp.Lists {
    class GCenikDlg extends GContentBase<Wfl.ListAC.WflListBaseAC> {
        TypCeniku: Gordic.Wfl.Interface.TypCenikuPosty;
        model: Gordic.Wfl.Interface.GCenikPostyFiltrDto;
        data: Gordic.Wfl.Interface.GCenikPostyListDto[];
        KategorieCen: Gordic.Wfl.Interface.GCenikPostyKategorieDto[];
        view: Gordic.Data.View<Gordic.Wfl.Interface.GCenikPostyKategorieDto>;
        onContentReady(): void;
        ReloadData(): void;
        CreateFilterForm(): Forms.Form[];
        CreateGrid(): void;
        SetData(): void;
        LoadData(filtr?: Wfl.Interface.GCenikPostyFiltrDto): void;
    }
}
declare namespace Gordic.Vyp.Dlg {
    class PredplneniZasilkyDlg extends GContentBase {
        model: Wfl.Interface.GPredplneniZasilekDto;
        validators: any;
        onContentReady(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Vyp.Lists {
    class PrijemZasilekDleIDListPage extends GContentBase<VypListBasePage> {
        Settings: Wfl.Interface.GPrevzetiDleIdSettingsDto;
        onContentReady(): void;
        CreateDefaultForm(): Forms.Form;
        ZadejZasilku(): void;
        ZpracujDataIdentifikace(data: Wfl.Interface.GHledaniZasilekDleIdDto): void;
        ZpracujDataHledani(data: Wfl.Interface.GHledaniZasilekDleIdDto): void;
        DoFrankovani(sxs: string): JQuery.Promise<boolean>;
        ResolveVyberZasilky(IDs: string[], prevzit: boolean): void;
        DoShowDialog(Ids: string[]): void;
        ShowDialogZasilkaInfo(sxs: string): JQuery.Promise<boolean>;
        ShowDialogBalickovanmi(sxs: string): JQuery.Promise<boolean>;
        ZpracujeZasilky(Ids: string[], prevzit: boolean): JQuery.Promise<boolean>;
        LoadData(): gjqXHR<Wfl.Interface.GZasilkyListDto[]>;
        CreateActionPridat(): GAction;
        ReloadData(): void;
    }
}
declare namespace Gordic.Vyp.Lists {
    class ProvedenaVypraveniZasilekListPage extends GContentBase<Wfl.ListAC.WflListBaseAC> {
        model: Gordic.Wfl.Interface.GSeznamFilterBaseDto;
        onContentReady(): void;
        CreateGridObsah(): void;
        LoadPreview: ((content: GContentType<ProvedenaVypraveniZasilekListPage>, row: Gordic.Wfl.Interface.SeznamProvedenychVypraveniZasilekDto) => void) & {
            cancel: () => void;
            flush: () => void;
            pending: () => boolean;
        };
        CreateGrid(): void;
        LoadData(filtr?: Wfl.Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
        CreateFilterForms(): Forms.Form[];
    }
}
declare namespace Gordic.Vyp.Lists {
    class ProvedenaVypraveniZasilekObsahListPage extends GContentBase<VypListBasePage> {
        TridVyp: number;
        ZpusobDorProp: Gordic.Wfl.Interface.WflczpdEnum;
        data: Gordic.Wfl.Interface.GZasilkyListDto[];
        onContentReady(): void;
        LoadData(): void;
        SetData(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Vyp.Lists {
    class VypraveneZasilkyListPage extends GContentBase<VypListBasePage> {
        onContentReady(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Vyp.Lists {
    class VypraveniZasilekListPage extends GContentBase<VypListBasePage> {
        IfPredplnení: boolean;
        IxsDpo: string;
        VypraveniDto: Wfl.Interface.GVypraveniZasilekDto;
        MoznoVypravit: boolean;
        OverovatDS: boolean;
        paramInfoOStavechHK: number;
        PovoleneKuryry: Wfl.Interface.GWflczpdDto[];
        onContentReady(): void;
        CreateFilterForm(): Forms.Form[];
        CreateDefaultForm(): Forms.Form;
        IfMoznoPredplneni(): boolean;
        LoadData(filtr?: Wfl.Interface.GSeznamZasilekFilterDto, plnitTempTabulku?: Boolean): void;
        ReloadData(): void;
        RefreshData(): void;
        CreateActionVypravit(): GAction;
        Vypravit(_asSelected: Wfl.Interface.GZasilkyVypraveniWorkListDto[]): void;
        VypravitPoUlozeni(_asSelected: Wfl.Interface.GZasilkyVypraveniWorkListDto[]): void;
        CreateActionInfoOZasilkachHP(): GAction;
        GetPocetProvedenych(result: Wfl.Interface.GZasilkyVypraveniWorkListDto[]): number;
        CreateActionOveritAdresaty(): GAction;
        IfBalickovaniDotaz(): JQuery.Promise<boolean>;
        Vypraveni(_selected: Wfl.Interface.GZasilkyVypraveniWorkListDto[]): void;
        OdeslatZasilkyFyzickyOLD(_selected: Wfl.Interface.GZasilkyVypraveniWorkListDto[]): JQuery.Promise<boolean>;
        OdeslatZasilkyFyzicky(_selected: Wfl.Interface.GZasilkyVypraveniWorkListDto[]): JQuery.Promise<boolean>;
        SendMessage(item: Wfl.Interface.GZasilkyVypraveniWorkListDto, sign?: Gordic.Wfl.WebClient.GSignatureResultDtoWithGuids): JQuery.Promise<boolean>;
        SendSignedMessage(item: Wfl.Interface.GZasilkyVypraveniWorkListDto): JQuery.Promise<boolean>;
        CreateSign(_sxs: string, guid: string): JQuery.Promise<Gordic.Wfl.WebClient.GSignatureResultDtoWithGuids | null>;
        TiskPodacihoArchuSDialogem(): void;
        KontrolaStavuDSOdesilatele(): JQuery.Promise<boolean>;
        KontrolaStavuMailboxyHP(_selected: Wfl.Interface.GZasilkyVypraveniWorkListDto[]): JQuery.Promise<boolean>;
        IfOverovatDSAdresatu(): JQuery.Promise<boolean>;
        KontrolaDSAdresatu(item: Wfl.Interface.GZasilkyVypraveniWorkListDto): JQuery.Promise<boolean>;
        OvereniDSAdresatuOld(_selected: Wfl.Interface.GZasilkyVypraveniWorkListDto[]): JQuery.Promise<boolean>;
        OvereniDSAdresatu(_selected: Wfl.Interface.GZasilkyVypraveniWorkListDto[]): JQuery.Promise<boolean>;
        OdemknoutZamceneMailboxy(lockedMaibox: Gordic.Wfl.Interface.GSeznamId[]): JQuery.Promise<boolean>;
        OdemknoutZamekOdeslani(): JQuery.Promise<boolean>;
        GetSelectedZasilkyVypraveniListDto(): Wfl.Interface.GZasilkyVypraveniWorkListDto[];
    }
}
declare namespace Gordic.Vyp.Lists {
    class VypListBasePage extends GContentBase<Wfl.ListAC.WflZasilkyListBaseAC> {
        ZpusobDorProp: Wfl.Interface.WflczpdEnum;
        ListParams: Vyp.WebControls.GVypListParamsDto;
        Predplneni: Wfl.Interface.GPredplneniZasilekDto;
        VypraveniSettings: Wfl.Interface.GVypraveniSettingsDto;
        PredplneniValidotors: any;
        DataMatrixDto: Wfl.Interface.GDataMatrixDto;
        PosledniPodaciCislo: JsonDecimal;
        _$fileField: JQuery;
        static CreateActionsTisk(content: GContentType<VypListBasePage>): void;
        static CreateActionsPredplneni(content: GContentType<VypListBasePage>): void;
        static CreateGridZasilekVyp(content: GContentType<VypListBasePage>): void;
        static GetSelectedGDataZasilkyProVypocetVahyAPoplatkuDto(content: GContentType<VypListBasePage>): Wfl.Interface.GZasilkyListDto[];
        static GetAllZasilkaIdSXSDto(content: GContentType<VypListBasePage>): Wfl.Interface.GZasilkaIdSXSDto[];
        static CreateActionPredplnit(content: GContentType<VypListBasePage>, typ: Wfl.Interface.TypPredplneniEnum, favorite?: boolean): GAction;
        static CreateActionPredplnitDlePrednastaveni(content: GContentType<VypListBasePage>, favorite?: boolean): GAction;
        static CreateActionPredplnitPoplatekDlePrednastaveni(content: GContentType<VypListBasePage>, favorite?: boolean): GAction;
        static PredplnitPoplatekDlePrednastaveni(content: GContentType<VypListBasePage>, _pouzePoplatek: boolean): void;
        static CreateActionEditaceDatPredplneni(content: GContentType<VypListBasePage>, favorite?: boolean): GAction;
        static CreateActionZmenaHodnot(content: GContentType<VypListBasePage>, favorite?: boolean): GAction;
        static CreateFrankovaniActions(content: GContentType<VypListBasePage>): void;
        static CreateActionUlozitPredplneni(content: GContentType<VypListBasePage>, favorite?: boolean): GAction;
        static CreateActionTiskPodacihoArchu(content: GContentType<VypListBasePage>, typ: Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu): GAction;
        static TiskPodacihoArchuPriprava(content: GContentType<VypListBasePage>, typ: Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu): void;
        static TiskPodacihoArchu(content: GContentType<VypListBasePage>, typ: Gordic.Vyp.Globals.Enums.TypTiskuPodacihoArchu, event?: JQueryEventObject): void;
        static CreateActionTiskKnihyVypravenePosty(content: GContentType<Wfl.ListAC.WflZasilkyListBaseAC>): GAction;
        static CreateActionTiskVykazu(content: GContentType<VypListBasePage>): GAction;
        static CreateActionTiskNakladu(content: GContentType<VypListBasePage>): GAction;
        static CreateActionTiskVypravenychDokSpis(content: GContentType<VypListBasePage>): GAction;
        static CreateActionTiskEvidListPostovneho(content: GContentType<VypListBasePage>): GAction;
        static CreateActionFrankovaniOnLine(content: GContentType<VypListBasePage>, typ: Wfl.Interface.TypFrankovacihoStroje): GAction;
        static CreateActionFrankovaniOffLine(content: GContentType<VypListBasePage>, typ: Wfl.Interface.TypFrankovacihoStroje): GAction;
        static CreateActionPrevzitSFrankovanim(content: GContentType<VypListBasePage>): GAction;
        static CreateActionImportDatEpaPosty(content: GContentType<VypListBasePage>): GAction;
        static CreateGetFileField(content: GContentType<VypListBasePage>): void;
        static CreateGetFileFieldEPA(content: GContentType<VypListBasePage>): void;
        static _addFileFrankovani(content: GContentType<VypListBasePage>, fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto, customData: any): void;
        static _addFileEPA(content: GContentType<VypListBasePage>, fileInfo: Gordic.General.ApplicationInterface.GFileInfoDto, customData: any): void;
        static addFileDoc(content: GContentType<VypListBasePage>): void;
        static addFileEPA(content: GContentType<VypListBasePage>): void;
        static CallDataMatrix(content: GContentType<VypListBasePage>, _typ: Gordic.Wfl.Interface.TypPouzitiDataMatrixCtecky, prvniVolani: boolean, warning?: string): void;
        static NoveFrankovani(content: GContentType<VypListBasePage>): void;
        static CallDataMatrixDialog(content: GContentType<VypListBasePage>): void;
        static ZpracujDataMatrix_krok_1(content: GContentType<VypListBasePage>): void;
        static ZpracujDataMatrix_krok_2(content: GContentType<VypListBasePage>): void;
        static PrevzitOfrankovanouZasilku(content: GContentType<VypListBasePage>): void;
        static ZpracujDataMatrix(content: GContentType<VypListBasePage>): void;
    }
}
declare namespace Gordic.Vyp.VypPrefabs {
    function poplatekColumn(): GGridColumn<any>;
    function vahaColumn(): GGridColumn<any>;
    function cenaColumn(): GGridColumn<any>;
    function TridVypColumn(): GGridColumn<any>;
    function idDSOdesiltele(): GGridColumn<any>;
    function SekcePredplneniZasilek(): Gordic.Forms.FormSection[];
}
