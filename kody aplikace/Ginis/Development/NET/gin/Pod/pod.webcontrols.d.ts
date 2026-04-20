declare namespace Gordic.Pod.Dialogs {
    /**
    * Dialog elektrolnického podání
    *
    * @author  David Šebesta
    * @date    01.08.2018
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function EvidenceElPodaniDlg(parentContent: GContent, opt: {
        /** identifikátor */
        IxbArray: string[];
        PouzePrehled: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * SeznamDokumentuASpisu
    *
    * @author  David Šebesta
    * @date    01.08.2018
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DokumentyASpisy(parentContent: GContent, opt?: {
        SubTask?: Pod.WebControls.Lists.DokumentyASpisySSDSubTask;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
     * Otevře okno pro zadání úložného místa
     *
     * @author  JSindelka
     * @date    7.1.2019
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<undefined>} Promise.
     */
    function OpenPotvrzeniODoruceniDlg(parentContent: GContent, opt?: {
        IdEntity: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<boolean | undefined>;
    /**
 * Otevře okno opravy metadt overeni el. podání
 *
 * @author  JSindelka
 * @date    20.1.2020
 *
 * @param {gcontent} parentContent The content.
 * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
 * @param {!object} opt Parametry dialogu.
 * @returns {JQueryPromise<undefined>} Promise.
 */
    function OpravaMetadatOvereniDlg(parentContent: GContent, opt?: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<boolean | undefined>;
    function HromadnaOpravaMetadatOvereniDlg(parentContent: GContent, opt?: {}, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Gordic.Pod.Interface.GHromadnaOpravaMetadatOvereniDto>;
    /**
 * Otevře okno pro zadání úložného místa
 *
 * @author  JSindelka
 * @date    7.1.2019
 *
 * @param {gcontent} parentContent The content.
 * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
 * @param {!object} opt Parametry dialogu.
 * @returns {JQueryPromise<undefined>} Promise.
 */
    function ElPodaniZNosiceDlg(parentContent: GContent, opt?: {
        IdEntity: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<boolean | undefined>;
    /**
     * Otevře okno pro zadání úložného místa
     *
     * @author  JSindelka
     * @date    7.1.2019
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @returns {JQueryPromise<undefined>} Promise.
     */
    function OdeslaniPotvrzeniODoruceniDlg(parentContent: GContent, opt?: {
        IdEntity: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<boolean | undefined>;
    /**
  * GPodaniOpravaPisemnostiDlg
  *
  * @author  David Šebesta
  * @date    29.05.2019
  *
  * @param   parentContent                        The content.
  * @param   ModOtevreni                    mod otevreni dialogu.
  * @return  .
  */
    function PodaniOpravaPisemnostiDlg(parentContent: GContent, opt?: {
        Ixp: string;
        ModFormu?: Interface.ModFormuPodaniEnum;
        IDZpravy?: string;
        TypPid?: Wfl.Interface.TypPid;
        DataPosty?: Wfl.Interface.GWflvpdaDto;
        PredplneniPrideleni?: Wfl.Interface.GSuFunRefDto;
        MLKlasifikacniDto?: Wfl.Interface.GMLRozborPodaniKlasifikaceOutoputDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * AntivirInfoDlg
    *
    * @author  David Šebesta
    * @date    29.05.2019
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function AntivirInfoDlg(parentContent: GContent, opt?: {}, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
   * Otevře dialog příloh podávaného dokumentu
   *
   * @author  dSebesta
   *
   * @param {gcontent} parentContent The content.
   * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
   * @param {!object} opt Parametry dialogu.
   * @param {!string} opt.SeznamPriloh GPrilohyPodavanehoDokumentuSeznamDto[].
   */
    function GPrilohyPodavanehoDokumentuDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        SeznamPriloh: Gordic.Pod.WebControls.GPrilohyPodavanehoDokumentuSeznamDto[];
        PocetInicacnichRadku: number | undefined;
    }>): JQuery.Promise<{
        SeznamPriloh: Gordic.Pod.WebControls.GPrilohyPodavanehoDokumentuSeznamDto[];
    } | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
}
declare namespace Gordic.Pod.GPodFunction {
    function GetTypZarazeniElSouboruByPriznak(priznak: string): Interface.TypZarazeniElSouboru;
    function GetGIconDefinitionTypZarazeniElSouboru(typ: Interface.TypZarazeniElSouboru, zpracovatJakoPrilohu?: boolean): IconTemplate;
    function GetGIconDefinitionTypPodpisu(typ: Wfl.Interface.TypPodepsaniEnum): IconTemplate;
    function GetGIconDefinitionStavOvereni(typ: Wfl.Interface.TypVysledkuVerifikaceElPodpisu): IconTemplate;
    function GetGIconDefinitionVysledekOvereni(typ: Wfl.Interface.VysledekOvereniEnum): IconTemplate;
    function GetGIconDefinitionPrizAntivir(typ: Gordic.Wfl.Interface.WflcavkEnum): IconTemplate;
    function GetGIconZpracovatJakoSamostatnouPrilohu(): IconTemplate;
}
declare namespace Gordic.Pod.Utils {
    function GetSrv(content: GContent): GContent;
    function VytvorSouborPotvrzeni(content: GContent, dto: WebControls.GEvidenceElPodaniVytvoritSouborPodaniDto): JQuery.Promise<WebControls.GEvidenceElPodaniVytvoritSouborPodaniDto>;
    function NoveCiziPodani(content: GContent, automat: boolean, DataPosty: Wfl.Interface.GWflvpdaDto): void;
    function NoveCiziPodaniFinal(content: GContent, automat: boolean, Ixp: string, Podani: boolean, TypPid: Gordic.Wfl.Interface.TypPid, DataPosty: Wfl.Interface.GWflvpdaDto): void;
    function TiskPodacihoRazitka(tiskPodacihoRazitka: boolean, conent: GContent, PIDDokumentu: string): JQuery.Promise<void>;
    function JdeOZasilkuInternihoVypraveni(content: GContent, ListZasilekDto?: Gordic.Wfl.Interface.GZasilkaDto[] | null): boolean;
    function ZpracujZasilkuInternihoVypraveni(content: GContent, Sxs: {
        Sxs?: string | null;
        Ixp?: string | null;
        Lic?: string | null;
        PorCislo?: number | null;
    }): void;
}
declare namespace Gordic.Pod.Icons {
    enum ActionEnum {
        elPodani = "gi-ehome",
        infoODoruceni = "gi-doruc",
        odstornovatElPodani = "fa-ban",
        vratitElPodaniKeZpracovani = "fa-reply",
        odemknoutElPodani = "gi-unlock",
        actOdeslatPotvrzeniODoruceni = "gi-mail gi-stack-bg|gi-arrow g-state-text g-state-info gi-stack-fw gi-stack-fw--right-bottom gi-bgw"
    }
}
declare namespace Gordic.Pod.Globals {
    enum ActionsName {
        elPodani = "actElPodani",
        elPodaniHromadne = "actElPodaniHromadne",
        nacistMailSchranku = "actNacistMailSchranku",
        nacistDatovouSchranku = "actNacistDatovouSchranku",
        nacistDatovouSchrankuPsrSK = "actnacistDatovouSchrankuPsrSK",
        nacistDorucenkyDZ = "actNacistDorucenkyDZ",
        infoODoruceni = "actInfoODoruceni",
        odstornovatElPodani = "actOdstornovatElPodani",
        vratitElPodaniKeZpracovani = "actVratitElPodaniKeZpracovani",
        aktualizaceMetadatOvereniElPodani = "actAktualizaceMetadatOvereniElPodani",
        odemknoutElPodani = "actOdemknoutElPodani",
        sloucitZpetRozlozenaElPodani = "actSloucitZpetRozlozenaElPodani",
        odeslatPotvrzeniODoruceni = "actOdeslatPotvrzeniODoruceni",
        opravaElPodani = "actOpravaElPodani",
        vratitPoste = "actVratitPoste",
        tiskPredaneDoslePosty = "actTiskPredaneDoslePosty",
        zobrazHistoriiOvereni = "actZobrazHistoriiOvereni",
        zobrazAktualniOvereni = "actZobrazAktualniOvereni",
        zobrazZpravu = "actZobrazZpravu"
    }
}
declare namespace Gordic.Pod.Others {
    class StartPage extends GContentBase<Wfl.AC.WflBaseAC> {
        model: Interface.GPodSouhrnInfoDto;
        IfSpousteciUdalosti: boolean;
        scorecardItems: any[];
        divSection0: JQuery<HTMLElement> | undefined;
        divSection1: JQuery<HTMLElement> | undefined;
        divSection2: JQuery<HTMLElement> | undefined;
        onContentReady(): void;
        GenerateKpi(): void;
        NavigateTo(name: string): void;
        ShowCounts(): void;
        LoadData(): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.AppSettings {
    /**
     * Cesta k objetu nastavení defaultníchg hodnot v GStore.
     *
     * @author  JSindelka
     * @date    30.04.2019
     */
    const DefaultSettingsPath = "Global.Pod.AppSettings.PodDefaultSettings";
    /**
     * Vrátí hodnoty uživatelského nastavení defaultníchg hodnot.
     *
     * @author  JSindelka
     * @date    30.04.2019
     *
     * @returns {Gordic.Pod.WebControls.GPodDefaultSettingsDto} Hodnoty uživatelského nastavení defaultníchg hodnot.
     */
    function GetPodDefaultSettings(): Gordic.Pod.Interface.GPodDefaultSettingsDto;
    /**
     * Nastaví hodnoty uživatelského nastavení defaultníchg hodnot.
     *
     * @author  JSindelka
     * @date    30.04.2019
     *
     * @param {Gordic.Pod.WebControls.GPodDefaultSettingsDto | null} value Hodnoty uživatelského nastavení defaultníchg hodnot.
     */
    function SetPodDefaultSettings(value: Gordic.Pod.Interface.GPodDefaultSettingsDto | null): void;
    /**
     * Formulář uživatelského nastavení podání.
     *
     * @author  JSindelka
     * @date    30.04.2019
     */
    function PodDefaultSettingsForm(): Forms.Form;
}
declare namespace Gordic.Pod.AppSettings {
    /**
     * Cesta k objetu předplnění hodnot v GStore.
     *
     * @author  JSindelka
     * @date    30.04.2019
    */
    const PovinAPreplnSettingsPath = "Global.Pod.AppSettings.PodPodaniPovinAPreplnSettings";
    /**
     * Vrátí hodnoty uživatelskéhopředplnění hodnot.
     *
     * @author  JSindelka
     * @date    30.04.2019
     *
     * @returns {Gordic.Pod.WebControls.GPodPodaniPovinAPreplnSettingsDto} Hodnoty uživatelskéhopředplnění hodnot.
     */
    function GetPodPodaniPovinAPreplnSettings(): Gordic.Pod.WebControls.GPodPodaniPovinAPreplnSettingsDto;
    /**
     * Nastaví hodnoty uživatelského předplnění hodnot.
     *
     * @author  JSindelka
     * @date    30.04.2019
     *
     * @param {Gordic.Pod.WebControls.GPodPodaniPovinAPreplnSettingsDto | null} value Hodnoty uživatelského předplnění hodnot.
     */
    function SetPodPodaniPovinAPreplnSettings(value: Gordic.Pod.WebControls.GPodPodaniPovinAPreplnSettingsDto | null): void;
    /**
     * Formulář uživatelského nastavení vypravení.
     *
     * @author  JSindelka
     * @date    30.04.2019
     */
    function PodPodaniPovinAPreplnSettingsForm(): Forms.Form;
}
declare namespace Gordic.Pod.AppSettings {
    /**
     * Cesta k objetu nastavení zásilky v GStore.
     *
     * @author  JSindelka
     * @date    30.04.2019
     */
    const SettingsPath = "Global.Pod.AppSettings.PodElPodaniSettings";
    /**
     * Vrátí hodnoty uživatelského nastavení zásilky.
     *
     * @author  JSindelka
     * @date    30.04.2019
     *
     * @returns {Gordic.Pod.Interface.GPodElPodaniSettingsDto} Hodnoty uživatelského nastavení zásilky.
     */
    function GetPodSettings(): Gordic.Pod.Interface.GPodElPodaniSettingsDto;
    /**
     * Nastaví hodnoty uživatelského nastavení zásilky.
     *
     * @author  JSindelka
     * @date    30.04.2019
     *
     * @param {Gordic.Pod.Interface.GPodElPodaniSettingsDto | null} value Hodnoty uživatelského nastavení zásilky.
     */
    function SetSpiSettings(value: Gordic.Pod.Interface.GPodElPodaniSettingsDto | null): void;
    /**
     * Formulář uživatelského nastavení vypravení.
     *
     * @author  JSindelka
     * @date    30.04.2019
     */
    function PodElPodaniSettingsForm(): Forms.Form;
}
declare namespace Gordic.Pod.Lists {
    class ElPodaniZNosiceDlg extends GContentBase<PodListBaseAC> {
        TempPath: string;
        private _$fileField;
        onContentReady(): void;
        CreateForm(): void;
        CreateGrid(): void;
        addFileDoc(): void;
        private _addFile;
        CreateActionPridatSoubor(): GAction;
        CreateActionOdebratSoubor(): GAction;
        CreateActionPodani(): GAction;
        private ActionEnabled;
        private Archivuj;
    }
}
declare namespace Gordic.Pod.Dlg {
    class HromadnaOpravaMetadatOvereniDlg extends GContentBase<Gordic.Wfl.AC.WflBaseAC> {
        model: Interface.GHromadnaOpravaMetadatOvereniDto[];
        onContentReady(): void;
        SetData(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Pod.Dlg {
    class OdeslaniPotvrzeniODoruceniDlg extends GContentBase<Gordic.Wfl.AC.WflBaseAC> {
        model: Interface.GOdeslaniPotvrzeniElPodaniDto;
        onContentReady(): void;
        SetData(): void;
        CreateActionOdeslat(): GAction;
        CreateFile(): JQuery.Promise<boolean>;
        CreateSign(guidFile: string, nameFile: string, isMail?: boolean): JQuery.Promise<Gordic.Wfl.WebClient.GSignatureResultDtoWithGuids | null>;
        PodepisMailAOdesli(): JQuery.Promise<boolean>;
        OtazkaZdaPodepsatSouborPotvrzeni(): JQuery.Promise<boolean>;
        DokoncitAZavrit(): boolean;
        Zavrit(OK: boolean): void;
        CreateActionNeodeslat(): GAction;
    }
}
declare namespace Gordic.Pod.Lists {
    class OpravaMetadatOvereniDlg extends GContentBase<Wfl.ListAC.WflListBaseAC> {
        model: Pod.Interface.GOpravaMetadatOvereniZpravyDto;
        onContentReady(): void;
        SetData(): void;
        CreateGrid(): void;
        SetGridPriloh(): void;
        DelegateTypZarazenJako(): GGridColumn<any>;
        DelegateTypSouboru(): GGridColumn<any>;
        DelegateTypPodepsani(): GGridColumn<any>;
        DelegateStavOvereni_OLD(): GGridColumn<any>;
        DelegateIsRozpor(): GGridColumn<any>;
        CreateActionAktualizovatOvereni(): GAction;
        CreateActionZobrazInfoOvereni_OLD(): GAction;
        ZobrazOvereni_OLD(): void;
        CreateActionZobrazInfoOvereni_NEW(): GAction;
        ZobrazOvereni_NEW(): void;
        CreateActionDetailDokSpis(): GAction;
    }
}
declare namespace Gordic.Pod.Dlg {
    class PotvrzeniODoruceniDlg extends GContentBase<Gordic.Wfl.AC.WflBaseAC> {
        data: Interface.GPotvrzeniElPodaniDto[];
        potvrzeni: Interface.GPotvrzeniElPodaniDto;
        poradi: number;
        isInit: boolean;
        validators: any;
        onContentReady(): void;
        SetData(): void;
        CreateActionPredchozi(): GAction;
        CreateActionNasledujici(): GAction;
        UpdateInfo(): void;
        OKClick(): void;
    }
}
declare namespace Gordic.Pod.WebControls {
    /**
     * GPodaniOpravaPisemnostiDlg
     *
     * @returns
     */
    class AntivirInfoDlg extends GContentBase {
        private readonly Title;
        private model;
        private $Formular?;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         * @date    01.09.2017
         */
        onContentReady(): void;
        private createAction;
        private createForm;
    }
}
declare namespace Gordic.Pod.WebControls {
    /**
     * GOdeslaniTiskAdresDlg.
     *
     * @returns
     */
    class GEvidenceElPodaniDlg extends GContentBase {
        private readonly Title;
        private readonly IxbArray?;
        private readonly Ixb?;
        private PouzePrehled;
        private IsFaze_SSD;
        private MoznostEditovatNazevPrilohyElPodani;
        private aktualniCisloKroku;
        private provedenoKroku;
        private $FormHlavicka?;
        private $FormHlavickaObsah?;
        private $FormHlavickaObsahFade?;
        private $FormHlavickaObsahText?;
        private $FormHlavickaDruha?;
        private $iframeDiv;
        private $Grid?;
        private $GridVlastnosti;
        private initDto;
        private VysledekSpustitPodaniDto?;
        private VysledekNactiDataDto;
        private VysledekKrok1Call1?;
        private VysledekKrok2Call?;
        private VysledekKrok3Call?;
        private VysledekKrok4Call?;
        private Krok4VysledekRucnihoOvereni;
        private VysledekKrok5Call?;
        private Krok5VysledekFormu?;
        private VysledekKrok6Call?;
        private Krok6VysledekFormu?;
        private Krok6VysledekOdeslatPozvrzeni?;
        private VysledekVygenerovanaOdpoved?;
        private OrigEml;
        private OrigEmlAddTST;
        private Step2_MaAktualniDataProVykresleni;
        private Step3_MaAktualniDataProVykresleni;
        private Step4_MaAktualniDataProVykresleni;
        private Step5_MaAktualniDataProVykresleni;
        private Step6_MaAktualniDataProVykresleni;
        private PolePovolenychKroku;
        private UpozorneniNaNeexistujiciESU;
        private IsFormClosed;
        private OdemknoutPodaniAfterClose;
        private IfCloseForm;
        private ssl_typd_neurpo;
        private typPisNeurceno;
        private typPis;
        private Ixp;
        private OriginalJeZpravaSymbol;
        private ViewGridu;
        private ObsahBase64;
        private EmailPuvodni;
        private EmailProp;
        private OdesIDDS;
        private OdpEmail;
        private DuvodOdmitnuti;
        private VybraneSoubory;
        private ZastTxt;
        private PIDDokumentu;
        private IsPotvrzSigned;
        private NejsouViryValue;
        private ZobrDetCbxValue;
        private ZobrDetCbxDisable;
        private MultiSelectAddCasRaz;
        private ZavreniBezOtazky;
        private X0000;
        private X0001;
        private X0002;
        private PodElPodaniSettings;
        private PoleGridu;
        private ZpracovatJakoMsgInMsg;
        private ixsDpo;
        private pod_potv_pdf_cr;
        private KontrolovanoHash;
        private IfNSESS2023;
        private ZpracovatVnoreneSamostatne;
        private KontrolaFormatuIsOK;
        private VynutitOriginal;
        private hystorickyNastavenVynutitOriginal;
        private ChbOveritVSZRChackedInit;
        private IxsEsuOdesilatelePoKontrole;
        /**
         * Classa Wizardu.
         * @type {Gordic.Wizard}
         */
        private Wizard?;
        private tempFileGuids;
        logOptions: {
            name: string;
            fileName: string;
            authorCode: number;
        };
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         * @date    01.09.2017
         */
        onContentReady(): void;
        private initHelpTag;
        /**
         * inicializace contentu
         * @param {Gordic.Pod.WebControls.GEvidenceElPodaniNactiDataDto} NactiDto?
         */
        private inicializace;
        /**
         * zavolani funkce "NactiData" na serveru
         * @param {Gordic.Pod.WebControls.GEvidenceElPodaniNactiDataDto} NactiDto?
         */
        private zavolejNactiData;
        /**
         * zpracovani odpovedi funkce "NactiData" ze serveru
         * @param {Gordic.Pod.WebControls.GEvidenceElPodaniNactiDataDto} NactiDto
         */
        private spracujOdpovedZNactiData;
        /**
         * Start Podani
         */
        private spustitPodaniZnovu;
        private spustitPodani;
        /**
         * zavolani funkce spustit podani
         */
        private zavolejSrvSpustitPodani;
        /**
         * zpracování odpovědi z srv funkce "SpustPodani"
         * @param {Gordic.Pod.WebControls.GEvidenceElPodaniSpustPodaniDto} dto
         */
        private spustitPodaniAfrerResponse;
        private otevriNeboStahniSoubor;
        /**
         * otestovani zda se nma form zavřit
         * @param {Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto} chyboveDto
         */
        private ifCloseFormFunction;
        private otevriPostupnePoleDokumentu;
        /**
         * vytvoření hlavičky
         * @param {Gordic.Pod.WebControls.GEvidenceElPodaniSpustPodaniDto} dto
         */
        private postavHlavicku;
        /**
         * vybuduje Hlavickovu Formu
         *
         * @param {Gordic.Pod.WebControls.GEvidenceElPodaniSpustPodaniDto} dto
         */
        private vybudujHlavickovyForm;
        /**
         * nastavi hodnoty do hlavičky
         *
         * @param {Gordic.Pod.WebControls.GEvidenceElPodaniSpustPodaniDto} dto
         */
        private setniHlavickoveFormy;
        private setniObsahovePolicko;
        private resizeIframe;
        private vytvorPokudNeniObsahVeHlavicce;
        /**
         * vytvoreni Pruvodce
         */
        private vytvoreniPruvodce;
        private nespoustetAutomatickyChod;
        /**
         * hack pro presunuti ovládaní pruvodce až nad statickou hlavičku
         */
        private presunOvladaniPruvdce;
        /**
         * obecny posun na další krok
         */
        private pokracuj;
        /**
         * spustit konkretni krok pruvodce
         *
         * @param {number} krok
         */
        private spustitKrok;
        /**
         * Start kroku1
         */
        private krok1;
        /**
         * zakladni call kroku 1 na aserver
         */
        private krok1_callZaklad;
        /**
         * zpracovani callu kroku 1
         *
         * @param {Gordic.Pod.WebControls.GKrok1ElEvidenceDto} dto
         */
        private krok1_callZakladDone;
        /**
         * vyvolá na serveru test na typ dalsiho zpracovaní
         * @param {boolean} IsPostoupeni
         * @param {Gordic.Pod.WebControls.GEvidenceElPodaniTypZpracovaniDto} callDto
         */
        private testTypZpracovani;
        /**
         * upravé hlavičku podle výsledku z kroku 1
         *
         * @param {Gordic.Pod.WebControls.GKrok1ElEvidenceDto} dto
         */
        private krok1_upravFormPodleDto;
        private UpravHodnotyPodleDZPole;
        /**
         * start kroku 2
         *
         * @param {boolean} [manualClick]
         */
        private krok2;
        /**
         * call krok2
         *
         * @param {boolean} [manualClick]
         */
        private krok2_callZaklad;
        /**
         * zpracopvani call z korku 2
         *
         * @param {Gordic.Pod.WebControls.GKrok2ElEvidenceDto} dto
         */
        private krok2_callZakladDone;
        private krok2_callZakladAktivujKrok;
        /**
         * vykresleni obsahu kroku 2
         *
         * @param {Gordic.Pod.WebControls.GKrok2ElEvidenceDto} dto
         * @param {JQuery<HTMLElement>} contentDiv
         * @param {Wizard.changeObject} change
         */
        private krok2_vykreslit;
        private changeZKroku2;
        /**
         * start kroku 3
         *
         * @param {boolean} [manualClick]
         */
        private krok3;
        /**
         * call krok 3
         *
         * @param {boolean} [manualClick]
         */
        private krok3_callZaklad;
        /**
         * zpracovani call 3
         *
         * @param {Gordic.Pod.WebControls.GKrok3ElEvidenceDto} dto
         */
        private krok3_callZakladDone;
        /**
         * vykresleni kroku 3
         *
         * @param {Gordic.Pod.WebControls.GKrok3ElEvidenceDto} dto
         * @param {JQuery<HTMLElement>} contentDiv
         * @param {Wizard.changeObject} change
         */
        private krok3_vykreslit;
        /**
         * zacatek kroku 4
         *
         * @param {boolean} [manualClick]
         */
        private krok4;
        /**
         * zpracovani call 4
         *
         * @param {boolean} [manualClick]
         */
        private krok4_callZaklad;
        private krok4_zkontroluPocetOriginalu;
        private krok4_callZakladDone;
        /**
         * krok 4 vykreslit
         *
         * @param {Gordic.Pod.WebControls.GKrok4ElEvidenceDto} dto
         * @param {JQuery<HTMLElement>} contentDiv
         * @param {Wizard.changeObject} change
         */
        private krok4_vykreslit;
        /**
         * ulozeni vysledku z kroku 4
         *
         * @param {Gordic.Pod.WebControls.GKrok4ElEvidenceDto} dto
         * @param {JQuery<HTMLElement>} contentDiv
         * @param {Wizard.changeObject} change
         */
        private krok4_konec;
        /**
         * ovládání zaškrtávátek
         */
        private changeINRucniOvereniPodpisu;
        /**
         * ovládání zaškrtávátek
         */
        private changeINRucniOvereniRazitka;
        /**
         *  začátek kroku 5
         *
         * @param {boolean} [manualClick]
         */
        private krok5;
        /**
         * call krok 5
         *
         * @param {boolean} [manualClick]
         */
        private krok5_callZaklad;
        /**
         * zpracovani callu 5
         *
         * @param {Gordic.Pod.WebControls.GKrok5ElEvidenceDto} dto
         */
        private krok5_callZakladDone;
        /**
         * vykresleni kroku 5
         *
         * @param {Gordic.Pod.WebControls.GKrok5ElEvidenceDto} dto
         * @param {JQuery<HTMLElement>} contentDiv
         * @param {Wizard.changeObject} change
         */
        private krok5_vykreslit;
        /**
         * ulozeni vysledku z kroku 5
         *
         * @param {Gordic.Pod.WebControls.GKrok5ElEvidenceDto} dto
         * @param {JQuery<HTMLElement>} contentDiv
         * @param {Wizard.changeObject} change
         */
        private krok5_konec;
        /**
         * ZmenaOdesilatele
         */
        private ZmenaOdesilatele;
        /**
         * začátek kroku 6
         *
         * @param {boolean} [manualClick]
         */
        private krok6;
        /**
         * upravení mailu odesílatele
         *
         * @param {boolean} [manualClick]
         */
        private krok6_callUpravitMailOdesilatele;
        /**
         * krok_6 Kontrola Na Typ Dokumentu Neurceno Cizi Pisemnost El Podani
         *
         * @param {boolean} [manualClick]
         */
        private krok_6KontrolaNaTypDokumentuNeurcenoCiziPisemnostElPodani;
        /**
         * krok 6 call na server
         *
         * @param {boolean} [manualClick]
         */
        private krok6_callZaklad;
        /**
         * krok6_callZakladDone
         *
         * @param {Gordic.Pod.WebControls.GKrok6ElEvidenceDto} dto
         */
        private krok6_callZakladDone;
        /**
         * krok6  vykreslit obsah
         *
         * @param {Gordic.Pod.WebControls.GEvidenceElPodaniGenerovatOdpovedDto} dto
         * @param {JQuery<HTMLElement>} contentDiv
         * @param {Wizard.changeObject} change
         */
        private krok6_vykreslit;
        private setZobrDetCbx;
        private CbxChange;
        private cbxKontrolaZaskrtnutehoAsponNeodesilatNeboPoNovuNecoJineho;
        /**
         * oprava mailu odesilatele
         *
         * @param {Interface.TypPrijmuPodani} ZpusDor
         * @param {string} IxsEsu
         * @param {number} porZast
         * @param {string} emailProp
         * @returns {JQuery.Promise<void>}
         */
        private ZkusUpravutMailOdesilatele;
        /**
         * KontrolaNaTypDokumentuNeurcenoCiziPisemnostElPodani
         *
         * @returns {JQuery.Promise<void>}
         */
        private KontrolaNaTypDokumentuNeurcenoCiziPisemnostElPodani;
        /**
         * getValueOdesilatel
         *
         * @returns {GOdesilatelElEvidenceDto}
         */
        private getValueOdesilatel;
        private saveModelFromKork6;
        /**
         * get dat obsah
         *
         * @returns {string}
         */
        private getObsahBase64;
        /**
         * nastavení ikon k založkám pruvodce
         *
         * @param {number} krok
         * @param {"nic" | "fajfku" | "bezOvereniPodpisu"} typ
         */
        private krokx_setniIkonku;
        /**
         * aktivace kroku
         *
         * @param {number} cislo
         */
        private aktivujKrok;
        /**
         * setnutí checkboxu origeml
         */
        private setOrigEml;
        private saveOrigEml;
        private getOrigEml;
        private enableOrigEml;
        private setOrigEmlAddTST;
        private enableOrigEmlAddTST;
        private saveOrigEmlAddTST;
        private getOrigEmlAddTST;
        /**
         * ulozeni vyběru z gridu
         */
        private saveVybraneSoubory;
        /**
         * get vybranych radku z gridu
         *
         * @returns {Pod.Interface.GElPodaniPrilohyStrukturovaneDto[]}
         */
        private getVybraneSoubory;
        /**
         * get vsechny radku z gridu
         *
         * @returns {Pod.Interface.GElPodaniPrilohyStrukturovaneDto[]}
         */
        private getVsechnyRadky;
        /**
         * geter pro povolene kroky
         */
        private getPolePovolenychKroku;
        /**
          * funkce pro zavírání formu, pod podmínkou dojde k odemčení podání
          *
          * @returns {JQuery.Promise<void>}
          */
        private CloseForm;
        /**
         * nastavení labelu akce na defaultní hodnotu
         */
        private resetActContinue;
        /**
         * call na server pro odemknutí podání
         *
         * @param {boolean} OdemknoutPodaniAfterClose
         * @returns {JQuery.Promise<void>}
         */
        private callCloasingFormSrv;
        /**
         * test zda se má zavřír form
         *
         * @returns {boolean}
         */
        private testIfCloseForm;
        /**
         * zavření a nastavení parametru pro odemknutí podání
         */
        private tryCloseOdemkni;
        private closing;
        private OpravduZavritOkno;
        private ZobrDetCbxChecked;
        private createGrid;
        private definiceColumnsDoGridu;
        private createGridVlastnosti;
        private definiceColumnsDoGriduVlastnosti;
        private vypocetIkonkyPodpisy;
        private vypocetIkonkyOvereniPodpisu;
        /**
         * funkce pro odeslání potvrzení
         */
        private OdeslatPotvrzeni;
        /**
         * call odeslání potvrzení
         *
         * @param {GEvidenceElPodaniVytvoritSouborPodaniDto} SouborPodaniDto
         */
        private OdeslatPozvrzeniStart;
        /**
         * zpracování callu potvrzení
         *
         * @param {Gordic.Pod.WebControls.GEvidenceElPodaniOdeslatPotvrzeniDto} dto
         */
        private krok6_callOdeslatPozvrzeniDone;
        /**
         * funkce pro otevřeníé detailui zásily
         *
         * @param {string} sxs
         */
        private otevriDetailZasilky;
        private zkontrolujHlasku;
        private zkontrolujInitHlasku;
        private zkontrolujInitDotaz;
        private zkontrolujKrok1DotazOdmitnuti;
        private zkontrolujKrok1DotazPostoupeni;
        /**
         * Vytvoří menu.
         *
         * @author  dsebesta
         * @date    01.09.2017
         */
        private _createMenu;
        private setGridData;
        private getMenuForRow;
        private GetOriginalItem;
        private GetPrilohyItem;
        private GetElPodpisyItem;
        private GetCasRazitka;
        private GetZpracovarJakoPrilohu;
        private GetOznacitZpracovaniVsechVnorenychJakoStandardni;
        private GetPrejmenovatPrilohuAction;
        private GetOpravitPriponuSouboruPrilohyItem;
        private GetVyraditPrilohuAction;
        private vyraditPrilohu;
        private callSetVyrazeniPrilohyZPodani;
        private setJakoOriginal;
        private callSetFileJakoPriloha;
        private callOznacitZpracovaniVsechVnorenychJakoStandardni;
        private callSetFileJakoElPodpis;
        private callSetFileJakoCasRazitko;
        private callOrigEmlZmena;
        private callZpracovatVnoreneSamostatne;
        private callSetVnorenyFileJakoStandardni;
        private prejmenovatPrilohuRun;
        private opravitPriponuSouboruPrilohyRun;
        private nastavEnableNaAkcichPodleKroku;
        private zobrazitZpravuEML;
        private stahniSoubor;
        private zobrazitZpravu;
        private stahnoutZpravuFinal;
        private zobrazitZpravuFinalPresDoplnek;
        private stahniZipPodani;
        private infoOAntiviru;
        private rychlaOdpoved;
        private odmitnoutZavirovano;
        private odmitnoutNesplnujeStandard;
        private odmitnoutNecitelne;
        private rozeberMailVMailu;
        private odmitnoutPodani;
        private pridatIFRAME;
        private zmenaStepu;
        private resetVsehoOdKroku;
        private setniHlavniIkonyOvereniPodpisu;
        private setFieldImgOvereniPodpisu;
        private setFieldPodpisuZpravy;
        OtevriOknoVysledkuOverenu(): void;
        OtevriOknosVysledkyOvereniZGridu(jmenoSouboru: string): void;
        OtevriOknoVysledkuOvereniZGridu(dto: Wfl.Interface.GOveritPodpisDto): void;
        private SetniHlavniIkonyOvereniPodpisuZKroku5;
        private kontrolaNearchivnihoFormatu;
        private restartCacheReadru;
        private akceProVolaniNahledu;
        private createSidebar;
        private panelNahledEl;
        private createPanelNahled;
        /** element pro náhled */
        private preview;
        private setPanelNahled;
        private updatePanelNahled;
        private removeTempFiles;
        private kontrolaESUVRegistrech;
        private zkontrolujHlaskuVynutitOriginal;
        private setVynutitOriginal;
        private encodeBase64Unicode;
        private decodeBase64Unicode;
    }
}
declare namespace Gordic.Pod.WebControls {
    /**
     * GPodaniOpravaPisemnostiDlg
     *
     * @returns
     */
    class GPodaniOpravaPisemnostiDlg extends GContentBase {
        private readonly Title;
        private $Formular?;
        private gLogovani;
        private model;
        private enableDto;
        private isNovePodani;
        private PodPovinnostSettings;
        private ModFormu;
        private PodDefaultSettings;
        private Ixp;
        private IdSpisu?;
        private PrizCj;
        private IxsTre;
        private SelectedDenikSpz?;
        private ProbehloUlozeni;
        private SslHeaderLastVec;
        private gin_n23_pod;
        private SeznamPriloh;
        private badgePocetPriloh;
        private gin_poc_priloa;
        private ssl_kon_poc_pri;
        private ssl_rad_cj_vytv;
        private ssl_cj_pridel;
        private MLKlasifikacniDto;
        private ChbOveritVSZRChackedInit;
        private IxsEsuOdesilatelePoKontrole;
        /**
         * GIN LEG - věcné skupiny (NSESSS 2023).
         * - 0 - Ne
         * - 1 - Ano - nabídka věcných skupin v modulech, zobrazení metadat věcných skupin v seznamech, logiky navázané na vyřízení spisu atd.
         * @type {number | undefined | null}
         */
        private readonly gin_n23_vecsk;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         * @date    01.09.2017
         */
        onContentReady(): void;
        private inicializace;
        private initHelpTag;
        private setFocus;
        private ZkontroluInformaciOZmeneCiluRedistribuce;
        private enabledFunction;
        private setValidators;
        private createAction;
        private createForm;
        private setModel;
        private setMLModel;
        private confirmFields;
        private getModel;
        private showHideRozsirenyProfil;
        private setValidatorsRozsirenyProfil;
        private setVecPodrobneVlaidator;
        private setValidatorsonRedistribuce;
        private zacatekUlozeni;
        private ulozeniPoOtazceNaEvidovt;
        private nutnyVyberDenikuCjSKontrolouTvorbyCj;
        private autorizovanePredani;
        private vlozitDokumentDoSpisu;
        private callUlozeni;
        private closing;
        private zkontrolujZmeny;
        private otevriPrilohyKpodani;
        private aktualizujAktZnacku;
        private showInfoODohledaniDleZnackaOdes;
        private sslHeaderSetniVecPodrobnePokudJePrazdna;
        private kontrolaESUVRegistrech;
        private spustitKontroluRegistru;
        private isGinN23Vecsk;
        private nastavEvidovatPodleTypuDokumentu;
    }
}
declare namespace Gordic.Pod.WebControls {
    /**
     * GPrilohyPodavanehoDokumentuDlg
     *
     * @returns
     */
    class GPrilohyPodavanehoDokumentuDlg extends GContentBase {
        private mainGrid?;
        private view;
        private SeznamPriloh;
        private IsFormaEnabled;
        private IsPodobaEnabled;
        private prizRezimUtaj;
        private wfl_pristupypri;
        private FilterStUtajIdForFieldPristup;
        private gin_rad_priektg;
        private gin_rad_priektv;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         * @date    01.09.2017
         */
        onContentReady(): void;
        private createAction;
        private vytvoritGrid;
        private enableAction;
        private pridatNovy;
        private ziskejDataProNovyRadek;
        private vymazat;
        private prepocitejPoradi;
        private ulozitData;
    }
}
declare namespace Gordic.Pod.Lists {
    class DokumentyASpisy extends GContentBase<Gordic.Ssl.List> {
        gridUserSettings?: string;
        gsubtasksDiv: JQuery<HTMLElement>;
        prizRezimUtaj: boolean;
        onContentReady(): void;
        private activateSubtask;
        CreateFilterForms: (this: DokumentyASpisy) => Forms.Form[];
        LoadGrid: (this: DokumentyASpisy) => void;
        private VyberRadkuClick;
        private NevyrizeneClick;
        private VyrizeneClick;
        private NeaktivniClick;
        private VsechnyClick;
        CreateMenu: (this: DokumentyASpisy) => void;
        getVisibleHromadneAkceDto: () => Wfl.Interface.GHromadneWflAkceDto;
        getEnableHromadneAkceDto: () => Wfl.Interface.GHromadneWflAkceDto;
        getFavoriteHromadneAkceDto: () => Wfl.Interface.GHromadneWflAkceDto;
    }
}
declare namespace Gordic.Pod.Lists {
    class NeprideleneListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GNeprideleneFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GNeprideleneFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class PrideleneListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GPrideleneFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GPrideleneFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class PodDokSpisListBasePage extends GContentBase<Gordic.Wfl.ListAC.DokSpisListBaseAC> {
        static InitList(content: GContentType<PodDokSpisListBasePage>): void;
        static CreateActionOpravaElPodani(content: GContentType<PodDokSpisListBasePage>, favorite?: boolean): GAction;
        static CreateActionStornovat(content: GContentType<PodDokSpisListBasePage>): GAction;
        static CreateActionVratitPoste(content: GContentType<PodDokSpisListBasePage>, favorite?: boolean): GAction;
    }
}
declare namespace Gordic.Pod.Lists {
    class PodListBaseAC extends GContentBase<Gordic.Wfl.ListAC.WflListBaseAC> {
        ImageDelegateStavPodani: ObjectLiteral<Gordic.Wfl.WebClient.GIcon>;
        ImageDelegateStavRozlozeni: ObjectLiteral<Gordic.Wfl.WebClient.GIcon>;
        GEXVisible: boolean;
        DSXVisible: boolean;
        PsrSKVisible: boolean;
        static InitList(content: GContentType<PodListBaseAC>): void;
        static CreateActionOdeslatPotvrzeniODoruceni(content: GContentType<PodListBaseAC>, favorite?: boolean): GAction;
        static CreateActionZobrazitPotvrzeniODoruceni(content: GContentType<PodListBaseAC>, favorite?: boolean): GAction;
        static CreateActionZobrazitZpravu(content: GContentType<PodListBaseAC>, favorite?: boolean): GAction;
        static CreateActionUlozitZpravu(content: GContentType<PodListBaseAC>, favorite?: boolean): GAction;
        static DoAkceElPodani(content: GContentType<PodListBaseAC>, Typ: Pod.Interface.TypAkceElPodani): void;
        static DoAkceElPodaniCall(content: GContentType<PodListBaseAC>, Selected: Gin.Interface.GIxsDateTime[], Typ: Pod.Interface.TypAkceElPodani): void;
        static CreateActionSloucitZpetRozlozena(content: GContentType<PodListBaseAC>): GAction;
        static CreateActionOdemknoutElPodani(content: GContentType<PodListBaseAC>): GAction;
        static GetSelectedGIxsListOperationDto(content: GContentType<PodListBaseAC>): Wfl.Interface.GIxsListOperationDto[];
        static CreateActionAktualizaceMetadatOvereniElPodani(content: GContentType<PodListBaseAC>): GAction;
        static HromadneOpravitMetadatOvereni(content: GContentType<PodListBaseAC>, _selected: Wfl.Interface.GIxsListOperationDto[], _model: Gordic.Pod.Interface.GHromadnaOpravaMetadatOvereniDto): JQuery.Promise<boolean>;
        static OpravitMetadataOvereni(content: GContentType<PodListBaseAC>, _item: Wfl.Interface.GIxsListOperationDto, _model: Gordic.Pod.Interface.GHromadnaOpravaMetadatOvereniDto): JQuery.Promise<boolean>;
    }
}
declare namespace Gordic.Pod.Lists {
    class ElPodaniListAC extends GContentBase<PodListBaseAC> {
        model: Gordic.Wfl.Client.GElPodaniPrehledFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        CreateGrid(): void;
        LoadData(filtr?: Gordic.Wfl.Client.GElPodaniPrehledFilterDto): void;
        ReloadData(): void;
        CreateActionOdstornovatElPodani(): GAction;
        CreateActionNastavitZpracovaniAutomat(): GAction;
        CreateActionNastavitZpracovaniManual(): GAction;
        CreateActionPuvodniVzhledlElPodani(): GAction;
        CreateActionVratitKeZpracovani(): GAction;
    }
}
declare namespace Gordic.Pod.Lists {
    class ElPodaniNezpracovanaAC extends GContentBase<PodListBaseAC> {
        model: Gordic.Wfl.Client.GElPodaniNezpracovanaFilterDto;
        MailboxInfoDto: Wfl.Interface.GMailboxInfoDto;
        IfOdeslatPotvrzeni: boolean;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        CreateGrid(): void;
        LoadData(filtr?: Gordic.Wfl.Client.GElPodaniNezpracovanaFilterDto): void;
        LoadDataSeznam(filtr?: Gordic.Wfl.Client.GElPodaniNezpracovanaFilterDto): void;
        ReloadData(): void;
        OdeslatPotvrzeni(_selected: string[]): JQuery.Promise<boolean>;
        OtevriPostupneDialogy(deffered: JQuery.Deferred<boolean>, _selected: string[], index: number): void;
        OdeslatKonkretniPotvrzeni(_ixb: string): JQuery.Promise<boolean>;
        CreateActionNacistDatovouSchranku(): GAction;
        CreateActionNacistDatovouSchrankuPsrSK(): GAction;
        CreateActionZamkniMailboxTest(): GAction;
        SetToolTipByInfo(): void;
        NacistMailovouSchranku(): void;
        NacistMailovouSchrankuPoKontrole(): void;
        NacistDatovouSchranku(): void;
        NacistDatovouSchrankuPoKontrole(): void;
        KontrolaStavuSchranky(_typ: Gin.Interface.TypMailboxu): JQuery.Promise<boolean>;
        OdemknoutZamceneMailboxy(mailbox: Wfl.Interface.GDictionaryDto): JQuery.Promise<boolean>;
        CreateActionNacistMailovouSchranku(): GAction;
        CreateActionElPodani(): GAction;
        CreateActionHromadneElPodani(): GAction;
        CreateActionNacistDorucenkyDZ(): GAction;
        CreateActionPrevzit(): GAction;
        CreateActionGMLNastaveniModelu(): GAction;
        CreateActionRozdelit(): GAction;
    }
}
declare namespace Gordic.Pod.Lists {
    class ElPodaniPrehledPotvrzDorucAC extends GContentBase<PodListBaseAC> {
        model: Gordic.Wfl.Client.GElPodaniPrehledFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        CreateGrid(): void;
        LoadData(filtr?: Gordic.Wfl.Client.GElPodaniPrehledFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class OdeslaneListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GSeznamFilterBaseDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class StornovaneListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GSeznamFilterBaseDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class VracenePosteListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GSeznamFilterBaseDto;
        onContentReady(): void;
        CreateGrid(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class DoslaPostaListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GSeznamFilterBaseDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class PredanaDoslaPostaListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GPredanoFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GPredanoFilterDto): void;
        ReloadData(): void;
        CreateGrid(): void;
        CreateActionTisPredaneDoslePosty(): GAction;
    }
}
declare namespace Gordic.Pod.Lists {
    class PredaneDokSpisListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GPredanoFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class PrevzateDokSpisListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GPredanoFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GSeznamFilterBaseDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class KPredaniUzluListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GRedistribuceKPredaniFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GRedistribuceKPredaniFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class KPredaniVsemListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GRedistribuceKPredaniFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        LoadData(filtr?: Wfl.Interface.GRedistribuceKPredaniFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class RedistribuceKPredaniListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GRedistribuceKPredaniFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        SetSubtask(typ: Wfl.Interface.TypSeznamuDokSpis): void;
        CreateList(): void;
        CreateActionSubtask(typ: Wfl.Interface.TypSeznamuDokSpis): GAction;
        LoadData(filtr?: Wfl.Interface.GRedistribuceKPredaniFilterDto): void;
        ReloadData(): void;
    }
}
declare namespace Gordic.Pod.Lists {
    class RedistribuceKPrevzetiListPage extends GContentBase<PodDokSpisListBasePage> {
        model: Wfl.Interface.GRedistribuceKPrevzetiFilterDto;
        onContentReady(): void;
        CreateFilterForms(): Forms.Form[];
        SetSubtask(typ: Wfl.Interface.TypSeznamuDokSpis): void;
        CreateList(): void;
        CreateActionSubtask(typ: Wfl.Interface.TypSeznamuDokSpis): GAction;
        LoadData(filtr?: Wfl.Interface.GRedistribuceKPrevzetiFilterDto): void;
        ReloadData(): void;
        SetActionVisible(): void;
    }
}
declare namespace Gordic.Pod.ListPrefabs {
    function ixbColumn(): GGridColumn<any>;
    function StavNaPodatelneColumn(): GGridColumn<any>;
    function PodCisloColumn(): GGridColumn<any>;
    function IDZpravyColumn(): GGridColumn<any>;
    function IDCorrelation(): GGridColumn<any>;
    function velikostTextColumn(): GGridColumn<any>;
    function predmetPodaniTextColumn(): GGridColumn<any>;
    function UIDLColumn(): GGridColumn<any>;
    function datPrijColumn(): GGridColumn<any>;
    function nazevFunkceZpracovateleColumn(): GGridColumn<any>;
    function kategorizaceZpravyColumn(): GGridColumn<any>;
    function nazevFunkceZmenuProvedl(): GGridColumn<any>;
    function IconStavRozlozeni(delegate: ObjectLiteral<Gordic.Wfl.WebClient.GIcon>): GGridColumn<any>;
    function DelegateRezimZpracovani(): GGridColumn<any>;
    function SekceFilterDleTypuDatumu(opt?: GRadioOptions<any>): Gordic.Forms.FormRow[];
    function SekceFilterDlePodepsani(opt?: GSelectBoxOptions<any>): Gordic.Forms.FormRow[];
    function SekceFilterDleZpusobuDoruceni(opt?: {
        email?: GCheckOptions;
        ElNosic?: GCheckOptions;
        DS?: GCheckOptions;
        GEX?: GCheckOptions;
        WebPodatelna?: GCheckOptions;
        RAP?: GCheckOptions;
        interni?: GCheckOptions;
        portal?: GCheckOptions;
        ostatni?: GCheckOptions;
    }): Gordic.Forms.FormRow[];
    function SekceFilterZpusobDoruceni(opt?: GRadioOptions<any>): Gordic.Forms.FormRow[];
}
