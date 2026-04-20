declare namespace Gordic.Epk.WebControls {
    /**
     *  akce EPK05 - pro použití v menu
     */
    class GEpkActionsService {
        /** název async. úlohy */
        private epkVisualSignAsyncTaskName;
        private cleanReturnNotificationAsyncTask;
        /** aktualizace badge ručních vizuálních podpisů */
        updateBadgeHandVisualSign(_cnt: any, row: Gordic.Wfl.Interface.GPodpisovaKnihaDto | null, multi: boolean): void;
        /**
         * aktualizace vizuálního podpisu v menubaru přímo v náhledu na soubor
         */
        updateBadgeVisualPlacement(cnt: any, row: Gordic.Wfl.Interface.GPodpisovaKnihaDto, ixb: string): JQuery.Promise<any, any, any>;
        /**
         * aktualizace badge na akci umístění podpisu
         * @param handle
         * @param cnt
         */
        updateBadgeUmisteniPodpisu(cnt: GContentType<GEpkDbParamsNew>, handle: boolean): void;
        /** příznak otevření komponenty umístění vizuálního podpisu */
        private signatureLocationComponentIsOpen;
        getParamActionSignatureLocation(_cnt: any, nameAction: string, detail?: boolean): MenuParams;
        /**
         * metoda pro umístění souboru u náhledovačky na detailu žádosti
         * @param cnt
         * @param row
         * @param ixb
         */
        addSignaturePlacement(cnt: any, row: Gordic.Wfl.Interface.GPodpisovaKnihaDto, ixb: string, isFavorite: boolean): JQuery.Promise<boolean>;
        private addSignatureLocation;
    }
}
declare namespace Gordic.Epk.WebControls {
    class GEpkAjax {
        private urls;
        private cnt;
        private zastupy;
        private fragments;
        /** konstruktor */
        constructor(urls: string[], cnt: GContentType<any>, zastupy?: boolean, fragments?: string[]);
        private getRqCountAll;
        logout(url: string): void;
        getGpc(): any;
        /** Načtení počtu žádostí do EPK dashboardu */
        pocetZadostiAll(): JQuery.Promise<Gordic.Wfl.Interface.GEpkSouhrnCountsDto[] | null>;
    }
}
declare namespace Gordic.Epk.WebControls {
    class GEpkVisualPlacemenet {
        setVisualPlacementMenuParams(cnt: GContentType<GEpkDbParamsNew>, opt: {
            menuBar: MenuParams[];
            row: Gordic.Wfl.Interface.GPodpisovaKnihaDto;
            fileSelectionRowFc: Function;
        }): void;
        private setVisualPlacementBadge;
        private updateBadge;
    }
}
declare namespace Gordic.Epk.AppSettings {
    /**
     * uživatelské nastavení pro EPK05
     *
     * @returns {Forms.Form}
     */
    function EpkForm(opt: any): Forms.Form;
}
declare namespace Gordic.Epk.WebControls {
    class GEpkEklepGSslcekpDlg {
        /** cnt */
        private gcontent;
        /** promise*/
        private dfd;
        /** kliknutí (zavření) skrz tlačítka v commandbaru */
        private commClickState;
        /** element formulare */
        private form;
        open(cnt: GContentType<any>): JQuery.Promise<{
            typ_pril: number;
            typ_pril_txt: string;
        } | null, IGReasonResponse, any>;
        private createForm;
        private createCommandbar;
        private addContinueAction;
        private addCancelAction;
        private validateForm;
    }
}
declare namespace Gordic.Epk.WebControls {
    class GEpkEklepPripominkaDlg {
        /** cnt */
        private gcontent;
        /** promise*/
        private dfd;
        /** kliknutí (zavření) skrz tlačítka v commandbaru */
        private commClickState;
        /** element formulare */
        private form;
        open(cnt: GContentType<any>, dto: Gordic.Wfl.Interface.GEpkCompleteConfigDto): JQuery.Promise<{
            typ_pripominky: "BP" | "Z" | "D";
            typ_pripominky_txt: string;
        } | null, IGReasonResponse, any>;
        private createFormZpracovani;
        private createFormPripominka;
        private createCommandbar;
        private addContinueAction;
        private addCancelAction;
        private validateForm;
    }
}
declare namespace Gordic.Epk.WebControls {
    interface IGEpkCommonPreSetStates {
        cnt: any;
        row: Wfl.Interface.GPodpisovaKnihaDto | null;
        sessionIxsFunFlag: boolean;
        multi: boolean;
        /** při výchozím nastavení je setChecks true a v případě, že se mění políčko podepsat nebo podepsatPřílohy, tak je false, protože chceme měnit jen stavy enabled */
        setChecks: boolean;
        dontSetVyriditButton?: boolean;
        isReadOnly?: boolean;
    }
    /** třída pro předání stavů vyřízení */
    export class GEpkRowState {
        podepsat: IEpkCheckBoxSetting;
        schvalit: IEpkCheckBoxSetting;
        posoudit: IEpkCheckBoxSetting;
        vzitnavedomi: IEpkCheckBoxSetting;
        splnit: IEpkCheckBoxSetting;
        rozhodnout: IEpkCheckBoxSetting;
        podepsatPrilohy: IEpkCheckBoxSetting;
        casoveRazitko: IEpkCheckBoxSetting;
        zkonvertovat: IEpkCheckBoxSetting;
        casoveRazitkoPriloha: IEpkCheckBoxSetting;
        zkonvertovatPrilohy: IEpkCheckBoxSetting;
        podepsatPrilohyNePDF: IEpkCheckBoxSetting;
        pridelit: IEpkCheckBoxSetting;
        predat: IEpkCheckBoxSetting;
        schvaleniVyrizeniSpisu: IEpkCheckBoxSetting;
        pripominkovat: IEpkCheckBoxSetting;
        zpracovat: IEpkCheckBoxSetting;
    }
    /** společné metody v EPK05 */
    export class GEpkCommon {
        constructor();
        setInitSettlementValues(_cnt: any): GEpkRowState;
        isRequestMineAndActive(activeRow: Gordic.Wfl.Interface.GPodpisovaKnihaDto, sessionIxsFun: string): boolean;
        /**
         * Může být požadavek podepsán?
         * @param ssl_epk_zmeuko SSL EPK - Povolení změnit typ úkonu prováděný nad žádostí v podpisové knize
         * @param typPozadavku Typ požadavku
         */
        canRequestBeSigned(ssl_epk_zmeuko: boolean, typPozadavku?: Wfl.Interface.TypPozadavkuEpk | null): boolean;
        /**
         * Lze změnit typ požadavku?
         * @param ssl_epk_zmeuko SSL EPK - Povolení změnit typ úkonu prováděný nad žádostí v podpisové knize
         * @param typPozadavku Typ požadavku
         */
        canChangeRequestType(ssl_epk_zmeuko: boolean, typPozadavku?: Wfl.Interface.TypPozadavkuEpk | null): boolean;
        /**
         * Parametr rikajici jakou hodnotu pouzit pro vyber TS,
         * zalezi na nacteni konf DPO. Bud se pouzije toto nebo následné nastavení
         * dle DB parametrů (řízení a viditelnost).
         * Výstupy:
         * -1 - nebere se šablona v potaz (lze měnit)
         * 0 - stav čas. razítka ze šablony je NE (nelze měnit)
         * 1 - stav čas. razítka ze šablony je ANO (nelze měnit)
         * 2 - šablona, dialog - předplněno Ne (lze měnit)
         * 3 - šablona, dialog - předplněno Ano  (lze měnit)
         */
        getPrizCasRazitko(_cnt: any, prizCasRaz: number): -1 | 0 | 1 | 2 | 3;
        /**
         * zde probíhá nastavení property checked, visible
         * - hromadné vyřízení
         */
        loadCheckBoxSettingsMulti(dto: GEpkRowState, row: Wfl.Interface.GPodpisovaKnihaDto, cnt: any): void;
        /** nahraje nastavení zaškrtávacích políček */
        loadCheckBoxSettings(cnt: GContentType<GEpkDbParamsNew>, row: Wfl.Interface.GPodpisovaKnihaDto): void;
        private nastavCheckBox;
        setVyriditButtons(_cnt: any, sessionIxsFunFlag: boolean, multi: boolean): void;
        tempRow: Wfl.Interface.GPodpisovaKnihaDto;
        /**
         * přednastavení stavů tlačítek v menubaru + stavů k vyřízení
         * @param setChecks při výchozím nastavení je setChecks true a v případě, že se mění políčko podepsat nebo podepsatPřílohy, tak je false, protože chceme měnit jen stavy enabled
         */
        preSetStates(opt: IGEpkCommonPreSetStates): void;
        jeVyrizenSysUkonKeCteni(jizVyrizen: boolean, jeSystemovyUkon: boolean, pouzeCteni: boolean, jePevnaSablona: boolean): boolean;
        private upresnitVyrizeniClass;
        /**
         * otevřít dialog upřesnit vyřízení
         */
        showUpresneniVyrizeni(_cnt: any, sessionIxsFunFlag: boolean): JQuery.Promise<any, any, any>;
        private getWflsdpoDto;
        getPrizSabCasRazitko(cnt: GContentType<GEpkDbParamsNew>, ixs_dpo: string): JQuery.Promise<number>;
        private setCasRazitko;
        /**
         * vytvořit commandbar upřesnit vyřízení
         */
        private createCommandbarUpresneniVyrizeni;
        /**
        * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
        *
        * @param {JQuery<HTMLElement>} form předaný element formuláře
        * @returns {JQueryPromise<boolean>} výsledek stavu
        */
        private waitForValues;
        /**
        * vytvořit modální okno upřesnění vyřízení
        *
        * @param {MenuParams[]} commandBar tlačítka na modálním okně
        * @param {JQuery<HTMLElement>} form element formuláře
        */
        private createModalWindowUpresneniVyrizeni;
    }
    export {};
}
declare namespace Gordic.Epk.WebControls {
    export class IEpkCheckBoxSetting {
        constructor(enabled?: boolean, checked?: boolean, visible?: boolean);
        /** povolení */
        enabled: boolean;
        /** zaškrtnuto */
        checked: boolean;
        /** viditelnost */
        visible: boolean;
    }
    /** enum - umístění vizuálního podpisu při vyřizování žádosti */
    export enum epk_povumipod_enum {
        /** Ne podpis není vizuálně umístěn */
        Ne = 0,
        /** Ano, pouze el. obrazy */
        Ano = 1,
        /** Ano, včetně příloh */
        AnoVcetnePriloh = 2
    }
    /** enum - Načítání seznamu pravých stran */
    export enum epk_ssl_cti_sez_enum {
        /** načtení až po stisku tlačítka */
        PoStiskuTlacitka = 0,
        /** okamžité načtení pravé strany */
        OkamziteNacteni = 1
    }
    interface IEpkMenuState {
        /** povoleno */
        enabled: boolean;
    }
    export class GEpkDbParamsNew {
        /** možnost připojení souboru k vyřízení EPK */
        VyrizSouborDto?: IVyrizSouborDto;
        /** content ověření podpisu */
        cntOvereniPodpisu?: GContent;
        /** content panelu historie schvalovani */
        cntHistorieSchvalovani: GContent;
        /** detail žádosti pouze ke čtení */
        ReadOnly: boolean;
        EpkParams: Gordic.Gin.WebClient.GEpkParamsDto;
        EpkOpt: Gordic.Gin.WebClient.GEpkOptDto;
        /** data řádku */
        row: Gordic.Wfl.Interface.GPodpisovaKnihaDto | null;
        /** příznak, že právě probíhá podepisování */
        signing: boolean;
        /** DTO - informace o navázané šabloně (pouze na úkonu Rozhodnout pro UKR) */
        LinkedTemplate: Wfl.Interface.GEpkLinkedTemplateDto;
        /** hodnota vyřízení */
        vyriditState: Gordic.Wfl.Interface.TypPozadavkuEpk | null;
        /** badge umístění ručního vizuálního podpisu */
        badgeUmisteniPodpisu: any;
        /** časové razítko */
        casoveRazitko: IEpkCheckBoxSetting;
        /** časové razítko k příloze */
        casoveRazitkoPriloha: IEpkCheckBoxSetting;
        /** včetně příloh */
        podepsatPrilohy: IEpkCheckBoxSetting;
        /** podepsat */
        podepsat: IEpkCheckBoxSetting;
        /** schválit */
        schvalit: IEpkCheckBoxSetting;
        /** podepsat a schválit */
        podepsataschvalit: IEpkCheckBoxSetting;
        /** posoudit */
        posoudit: IEpkCheckBoxSetting;
        /** vzít na vědomí */
        vzitnavedomi: IEpkCheckBoxSetting;
        /** splnit (specialita pro Ukrajinu) */
        splnit: IEpkCheckBoxSetting;
        /** rozhodnout (specialita pro Ukrajinu) */
        rozhodnout: IEpkCheckBoxSetting;
        /** zkonvertovat */
        zkonvertovat: IEpkCheckBoxSetting;
        /** zkonvertovat přílohy */
        zkonvertovatPrilohy: IEpkCheckBoxSetting;
        /** podepsat i ne PDF přílohy */
        podepsatPrilohyNePDF: IEpkCheckBoxSetting;
        /** přidělit (Specialita MD) */
        pridelit: IEpkCheckBoxSetting;
        /** předat (Specialita MD) */
        predat: IEpkCheckBoxSetting;
        /** schválení vyřízení spisu (Specialita MD) */
        schvaleniVyrizeniSpisu: IEpkCheckBoxSetting;
        /** specialita pro EKLEP */
        pripominkovat: IEpkCheckBoxSetting;
        /** specialita pro EKLEP */
        zpracovat: IEpkCheckBoxSetting;
        /** menu tlačítko vyřídit */
        menuSchvalit: IEpkMenuState;
        /** menu tlačítko posoudit */
        menuPosoudit: IEpkMenuState;
        /** menu tlačítko vráceno k přepracování */
        menuZamitnout: IEpkMenuState;
        /** přidat vyřizující soubor k vyřízení */
        pridatVyrizSoubor: IEpkMenuState;
        /** element gridu */
        grid: JQuery<HTMLElement>;
    }
    export {};
}
declare namespace Gordic.Epk.WebControls {
    interface GEpkDetailDlgInputParams {
        Ixp: string;
        SerCislo: number | string;
        supervisor?: Gordic.Wfl.Interface.EpkSupervisorEnum;
        /** pomocná hodnota pro procházení detailů (ze seznamu) */
        Grid?: JQuery<HTMLElement>;
    }
    /**
     * Seznam elektronické podpisové knihy
     */
    class GEpkDetail extends GContentBase<GEpkDbParamsNew> {
        /** příznak vlastní žádosti */
        OwnRequest: boolean;
        /** detail pouze ke čtení */
        /** Ovládání šipek na průchod mezi detaily */
        ArrowControl: boolean;
        /** data řádku */
        row: Gordic.Wfl.Interface.GPodpisovaKnihaDto;
        private Tabulka;
        /** existuje úkon schválení */
        private existujeUkonSchvaleni;
        /** informace o přidaném souboru */
        private fileInfo;
        /** element badgeFile */
        private badgeFile;
        /** nastavení pro procházení detailů pomocí šípek */
        private listControls_setup;
        /** natvrdo, kdyztak nastavim, kdyz bude potreba */
        private BtnPovoleniPredatKPosouzeni;
        /** EPK - text označující opakovaně předloženou žádost o vyřízení pro stejný dokument */
        private epk_txtopr;
        /** refresh po zavření dialogu (pravděpodobně grid) */
        private refresh;
        /** flash na closingu */
        private flash;
        /** třída obecných metod */
        private common;
        /** c# třída společných akcí v epk */
        private epkActionCnt;
        /** Počet ručně umístěných vizuálních podpisů */
        private VisualSignCount;
        /**
         * Identifikátor funkec aktuálně přihlášeného uživatele.
         */
        private ixsFunPrihlasenehoUzivatele;
        /** metoda pro odchod z contentu */
        closing(): JQuery.Promise<any, any, any>;
        private gfrmPanel;
        Ixp?: string | null;
        SerCislo?: number | null;
        /** příznak přenačtení detailu žádosti */
        Reload: boolean;
        private Mobile;
        private _load;
        /** informační zpráva ohledně eklepu */
        private eklep_message;
        onContentReady(): void;
        private init;
        private createCommandBar;
        private getParams;
        private addActionSouvisejici;
        /** automacké otevření detailu */
        private autoDetailRun;
        private selectTypeOfClose;
        /** kontrola, jestli můžu otevřít dialog odeslání */
        private checkOdeslani;
        /**
         * otevření dialogu odeslání
         * @param ixp identifikátor dokumentu
         */
        private openOdeslani;
        private zobrazitSoubor;
        /**
         * Příznak odmítnutí
         * - pro žádosti vrácené k přepracování, které jsou v aktivní tabulce wflszps
         */
        private refused_flag?;
        /** identifikátor dokumentu z nového připomínkového spisu/spisu materiálu */
        private detailPripDokIxp?;
        /** identifikátor připomínkového spisu/spisu materiálu*/
        private detailPripSpisIxp?;
        private createMenuBar;
        /** spustím vyřízení úkonu (zpracovat/pripominkovat) */
        private zpracovatPripominkovatEklep;
        private schvalitPripominkovatZpracovatEklep;
        /** převzetí připomínky / předání materiálu */
        private prevzetiPripominkypredaniMaterialuEklep;
        private ixpSberPripo;
        /** příznak zobrazení akcí pro eKLEP (závislé na licenci 1701/001) */
        private ShowEklepActions;
        private formPredat;
        private createNewPripSpis;
        private createCommandbarPredat;
        private novPripSpisDisable?;
        private ixs_su_list_eklep;
        private createEklepMenuParams;
        /**
         * Přidat tlačítko Zrušit žádost (do menu)
         * - musí být tvůrce žádosti
         * */
        private addZrusitZadostButton;
        /**
         * nastavení vstupních hodnot
         */
        private setValues;
        /**
         * hromadné nastavení stavů na tlačítkách v statusbaru a na hlavním tlačítku v menubaru 'Vyřízení'
         */
        private setStatesOnButtons;
        /** nasetování dat do formuláře hlavičky detailu žádosti o podpis dokumentu */
        private setDataToForm;
        private rSide;
        /** vytvořit sidebar */
        private createSidebar;
        private createLeftSidebar;
        private fileSelectionRow;
        /** showAttachment */
        private showAttachment;
        /** validace detailu před vyřízením */
        private validateDetail;
        /**
         * nasetování statusbar tlačítek
         */
        private setStatusButton;
        /** Počet zamítnutých schvalovacích předpisů */
        private RejectedPrescriptionCount;
        private vyrizDlg;
        /**
         * zobrazit dialog
         */
        showPripojVyrizSoubor(): JQueryPromise<any>;
        private FileServiceCnt;
        /**
         * nastavit text na badge připojeného souboru
         * @param {any} that gcontent
         * @param {EpkUtils.EpkFileInfo} fileInfo informace o souboru
         */
        private setTextOnAttachedFileBadge;
        /**
        * uložit nastavení panelu
        * @param panel panel
        * @param open příznak uložení
        */
        saveSettingPanel(panel: string, open: boolean): void;
        /**
        * uložit nastavení (false) všech panelů po odpinování
        * @param open
        */
        saveSettingPanelAll(open: boolean): void;
    }
}
declare namespace Gordic.Epk.Dialogs {
    /**
    * Dialog zrušení žádostí v EPK
    *
    * @author  Tomáš Hažmuka
    * @date    14.01.2022
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GEpkZrusitVlastniZadostiDlg(parentContent: GContent, opt: {
        Rows: Gordic.Wfl.Interface.GPodpisovaKnihaDto[];
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    /**
    * Dialog úvodní stránky v EPK
    *
    * @author  Tomáš Hažmuka
    * @date    15.06.2021
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GEpkDashboardEpkDlg(parentContent: GContent, opt?: {} | null, // zatím žádný opt není potřeba
    ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    /**
    * Dialog Seznamů v EPK
    *
    * @author  Tomáš Hažmuka
    * @date    25.07.2018
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function SeznamyEpkDlg(parentContent: GContent, opt: {
        /** ID Seznamu */
        ID?: string;
        /** ID Úlohy */
        taskId?: string;
        /** typ seznamu */
        TypSeznamu: number;
        /** termín epk  */
        EpkTermin?: Epk.WebControls.EpkTerminEnum;
        /** stav žádosti v EPK05 */
        stavZadosti?: Wfl.Interface.GWflczpvEnum;
        /** přehled za fun, su, úřad,... */
        supervisor?: number;
        /** filtr na barvu */
        uzo?: string;
        cardView?: boolean;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog ověření podpisů
    *
    * @author  Tomáš Hažmuka
    * @date    25.07.2018
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function OveritPodpisyDlg(parentContent: GContent, opt: {
        /** identifikátor */
        Ixp: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog ověření podpisů
    *
    * @author  Tomáš Hažmuka
    * @date    25.07.2018
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function HistSchvalDokumentDlg(parentContent: GContent, opt: {
        /** identifikátor */
        Ixp: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog náhledu zobrazený přes celý content
    *
    * @author  Tomáš Hažmuka
    * @date    28.08.2018
    *
    * @param   parentContent						The content.
    * @param   ModOtevreni							mod otevreni dialogu.
    * @return  .
    */
    function NahledDlg(parentContent: GContent, opt: {
        /** identifikátor Ixp */
        Ixp: string;
        /** stavy */
        States: any;
        /** informace o připojeném souboru */
        FileInfo: Gordic.Epk.WebControls.EpkFileInfo;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog hromadného vyřízení záznamů v EPK
    *
    * @author  Tomáš Hažmuka
    * @date    26.09.2018
    *
    * @param   parentContent					The content.
    * @param   ModOtevreni						mod otevreni dialogu.
    * @return  .
    */
    function GEpkMultiSettlementDlg(parentContent: GContent, opt: {
        /** pole identifikátorů a ser_cisel */
        ixps: {
            ixp: string;
            ser_cislo: number;
        }[];
        /** vstupní způsob vyřízení */
        zpus_vyriz: Wfl.Interface.GWflczpvEnum;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
    /**
    * Dialog k posouzení
    *
    * @author  Tomáš Hažmuka
    * @date    02.10.2018
    *
    * @param   parentContent					The content.
    * @param   ModOtevreni						mod otevreni dialogu.
    * @return  .
    */
    function KPosouzeniDlg(parentContent: GContent, opt: {
        rows: Gordic.Wfl.Interface.GPodpisovaKnihaDto[];
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<boolean>;
    /**
    * Dialog žádosti o schválení certifikátu
    *
    * @author  Tomáš Hažmuka
    * @date    10.10.2018
    *
    * @param   parentContent					The content.
    * @param   ModOtevreni						mod otevreni dialogu.
    * @return  .
    */
    function ZadostSchvalCertifikatDlg(parentContent: GContent, opt: {}, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog detailu žádosti (ISL)
    *
    * @author  Tomáš Hažmuka
    * @date    28.03.2018
    *
    * @param   parentContent						The content.
    * @param   ModOtevreni							mod otevreni dialogu.
    * @return  .
    */
    function DetailZadostiDlg(parentContent: GContent, opt: WebControls.GEpkDetailDlgInputParams, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<{
        refresh?: boolean;
        flash?: GFlashOptions;
    }>;
    /**
    * Dialog hromadného vyřízení záznamů v EPK (NEW)
    *
    * @author  Tomáš Hažmuka
    * @date    26.09.2018
    *
    * @param   parentContent					The content.
    * @param   ModOtevreni						mod otevreni dialogu.
    * @return  .
    */
    function HromadneVyrizeniIslDlg(parentContent: GContent, opt: {
        /** pole identifikátorů a ser_cisel */
        ixps: {
            ixp: string;
            ser_cislo: number;
        }[];
        /** 0 - vyřídit
         *  1 - vrátit k přepracování
         *  2 - k posouzení */
        typVyrizeni: number;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<any>;
}
declare namespace Gordic.Epk.WebControls {
    /** typ vyřízení (interface) */
    interface IEpkTypeSettlement {
        /** hodnota typu vyřízení */
        value: Wfl.Interface.GWflczpvEnum | string;
        /** popisek */
        caption: string;
    }
    /**
    * Hromadné vyřízení EPK (new)
    */
    class GEpkMultiSettlement extends GContentBase<GEpkDbParamsNew> {
        /** společné metody */
        private common;
        /** vstupní způsob vyřízení */
        private zpus_vyriz;
        private rows;
        /** pouze ke čtení */
        private isReadOnly;
        /** podepsat obraz */
        private signFavorite;
        /** timestamp */
        private timeStampColumnName;
        /** signAttachment */
        private signAttachmentColumnName;
        /** convert */
        private convertColumnName;
        /** timestampAttachment */
        private timestampAttachmentColumnName;
        /** convertAttachment */
        private convertAttachmentColumnName;
        /** signAttachmentNoPDF */
        private signAttachmentNoPDFColumnName;
        /** stav výstupu hromadného vyřízení */
        private outputStateColumnName;
        /** typ požadavku */
        private typPozadPodColumnName;
        /** způsob vyřízení */
        private zpusVyrizColumnName;
        /** důvod vyřízení */
        private vyrizeniTxtColumnName;
        private customLogger;
        private states;
        onContentReady(): void;
        private initLog;
        private init;
        /** vytvořit view dat pro grid */
        private createView;
        /**
         * nasetování errorů na ErrorProcessor
         */
        private setGridErrors;
        private flashIdAddWithoutComment;
        private createCommandbar;
        private setBezPripominek;
        private addPripominka;
        /** nastavení formátu gridu */
        private createGridFormat;
        private validateReasonForSettlement;
        /**
         * přidat sloupec způsob vyřízení
         * @param format formát sloupce
         */
        private addColumnTypeOfSettlement;
        /**
         * editor způsobu vyřízení
         * @param field název políčka
         */
        private setTypeOfSettlementEditorField;
        /**
         * přidat sloupec typ požadavku
         * @param format formát sloupce
         */
        private addColumnRequestType;
        private getArrayTypPozadPod;
        private getTypPozadPodTxt;
        private setRequestTypeEditorField;
        private addBoolColumn;
        /**
         * pokud není pole viditelné, tak v rámci hromadného vyřízení (kde je vidět), nejde aspoň editovat
         * thazmuka (02.06.2021)
         */
        private setVisibility;
        private setBooleanEditorFieldItemTemplate;
        private setBooleanEditorField;
        private setStatesOnEditeColumns;
        /** nastavení sloupců na prohledávání */
        private searchColumns;
        private createGrid;
        private flashIdValidateGridErrors;
        /** provedení validace chybu na seznamu */
        private validateGridErrors;
        private setStateOnRow;
        private setCheckOnRows;
        private setEnableOnRows;
        private setNewPropertyToRow;
        private setLog;
        private runSettlement;
        private IsDebug;
        /** slováci */
        private gin_upsr_povol;
        private createEpkCompleteConfigDto;
    }
}
declare namespace Gordic.Epk.PreActions {
    /**
     * PreActionNames
     *
     * @author TFeik
     * @since 484.1.0.43
     */
    enum Names {
        OtevriDetailZadosti = "actOtevriDetailZadosti"
    }
    /**
     * Otevře detail žádosti.
     *
     * @author  TFeik
     * @date    27.04.2020
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebControls.GEpkDetailDlgInputParams>} input
     * @returns {GActionParams}
     */
    function OtevriDetailZadosti(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Epk.WebControls.GEpkDetailDlgInputParams>, /*WebControls.GEpkDetailDlgReturnValue*/ boolean>): GActionParams;
}
declare namespace Gordic.Epk.WebControls {
    /**
     * Žádost o schválení certifikátu
     *
     * @author thazmuka
     * @since 480.1.0.33
     */
    class GEpkRequestForCert extends GContentBase {
        /** Text žádosti o schválení certifikátu pro podepisování */
        private TextToApproveSigningCertificate;
        /** Validní certifikát pro podepisování */
        private EpkValidCertificateForSigning;
        /** zpráva */
        private AlertMessage?;
        /** řádky do seznamu podaných certifikátů */
        private rows;
        private grid;
        private searchColumns;
        private elementGTab;
        /**
         * onContentReady
         */
        onContentReady(): void;
        private flashAlertId;
        private flashCertId;
        /**
         * init
         */
        private init;
        private createGTab;
        private createGrid;
        private createGridFormat;
        /**
          * nasetování sloupců pro prohledávání
          * @param columns sloupce
          */
        private setSearchColumns;
        /**
         * funkce provede odebrání focusu na políčku a vybrání textu na celém contentu
         * - na fci je použit timeout, aby se stihl načíst content, než se provede odebrání (jinak není proveden)
         */
        private unSelectFocusAndText;
        /**
         * createForm
         */
        private createForm;
        /**
         * createMenuBar
         */
        private createMenuBar;
        private refreshGrid;
        private generatePreview;
    }
}
declare namespace Gordic.Epk.WebControls {
    /** barvy colorpickeru */
    enum UzoEnum {
        /** Bílá*/
        White = "0",
        /**Červená*/
        Red = "1",
        /**Zelená*/
        Green = "2",
        /**Modrá*/
        Blue = "3",
        /**Fialová*/
        Purple = "4",
        /**Žlutá*/
        Yellow = "5"
    }
    enum EpkZavisleEnum {
        Ne = "1",
        Ano = "0"
    }
    /** enum datumový filtr */
    enum DatFiltrZobEnum {
        Ne = 0,
        Ano = 1,
        AnoPouzeUVyrizenych = 2
    }
    /** enum - nastavení datumů na filterpanelu */
    enum PrehledEpkEnum {
        Celkem = 0,
        MladsiNezMesic = 1,
        MladsiNezTyden = 2,
        MladsiNezDen = 3,
        NevyrizenoPred = 4,
        NevyrizenoTesnePred = 5,
        NevyrizenoPo = 6
    }
    /** enum - jestli dojde k refreshi při odcházení z detailu */
    enum RefreshDetailEnum {
        Ne = 0,
        Ano = 1
    }
    /** validační enum stavů hromadného vyřízení */
    enum validHromVyrizEnum {
        /** Výběr obsahuje záznamy, které lze vyřídit */
        Uspech = 0,
        /** Prázdný seznam */
        NeuspechPrazdnyGrid = 1,
        /** Nevalidní záznamů z důvodu aktivit !== 100 */
        NeuspechNevalidniZaznamy = 2
    }
    enum EpkTerminEnum {
        /** před termínem */
        Pred = 1,
        /** těsně před termínem */
        TesnePred = 2,
        /** po termínu */
        Po = 3,
        /** vykreslit cely seznam */
        CelySeznam = 10,
        /** neberu termíny v potaz */
        Cokoliv = 99
    }
    /** interface počítadla textu coveru */
    interface IOperationCoverValue {
        /** typ požadavku */
        typ_pozad_pod?: Gordic.Wfl.Interface.TypPozadavkuEpk | number | null;
        /** indetifikátor dokumentu ixp */
        ixp: string;
        /** text aktuálního progresu */
        progressText: string;
        /** počet úspěšných vyřízených dokumentů */
        success: number;
        /** počet neúspěšně vyřízených dokumentů */
        fail: number;
        /** zbývá dokumentů k vyřízení */
        remains: number;
    }
    /** interface počítadla coveru */
    interface IOperationCoverCounter {
        /** celkový počet kroků */
        total?: number;
        /** aktuální číslo progressu */
        progress: number;
    }
    interface IResultHromadVyrizeni {
        fail: number;
        success: number;
    }
    /**
     * Výsledné dto podepsaných souborů
     * */
    interface EpkVyrizeniResultDto {
        externalSignatureGuid?: string;
        externalTimestampGuid?: string;
        /**
         * Chybova hláška
         * @type {string}
         */
        reason?: string;
        /**
         * Príznak chyby
         * @type {boolean}
         */
        success?: boolean;
        /**
         * Guid souboru
         * @type {string}
         */
        guid: string;
        /**
         * Název souboru
         * @type {string}
         */
        fileName: string;
        /**
         * Identifikátor verze
         * @type {string}
         */
        IxsUlo: string;
        /**
         * IsConverted
         * @type {boolean}
         */
        IsConverted: boolean;
        /**
         * IsSigned
         * @type {boolean}
         */
        IsSigned: boolean;
    }
    interface IVyrizSouborDto {
        Ixp: string | null;
        Guid: string | null;
        Filename: string | null;
        TxtTitulek: string | null;
        TxtPopis: string | null;
    }
    interface InputVyriztDto {
        /** jedná se vyřízení s gridu? (či s detailu) */
        isGrid: boolean;
        /** zadat důvod vyřízení skrz dialogové okno? */
        selectVyrizeniTxt: boolean;
        vyrizeniTxt: string;
        zpusobVyrizeni: Gordic.Wfl.Interface.GWflczpvEnum;
        typPozadavku: Gordic.Wfl.Interface.TypPozadavkuEpk;
        ixp: string;
        serCislo: number;
    }
    /**
     * subtask - badge
     */
    type EpkSubtask = {
        badge: {
            /** pro seznam Vlastni zadosti */
            nevyrizeno: any;
            /** pro seznam Vlastni zadosti */
            vyrizeno: any;
            /** pro seznam Vlastni zadosti */
            vraceno: any;
            schvalitVyrizeniSpisu: any;
            pridelit: any;
            predat: any;
            rozhodnout: any;
            splnit: any;
            vzitnavedomi: any;
            posoudit: any;
            schvalit: any;
            podepsatschvalit: any;
            podepsat: any;
            vse: any;
            pripominkovat: any;
            zpracovat: any;
        };
    };
    /** informace o souboru, který připojujeme při vyřízení */
    class EpkFileInfo {
        /** identifikator souboru - muze byt int - interni a ext - externi */
        guid: string;
        /** nazev souboru*/
        filename: string;
        /** titulek */
        title: string;
        /** popisek */
        description: string;
        constructor();
    }
    /** model **/
    type EpkModel = {
        DateInterval: {
            start: Date;
            end: Date;
        };
        TypSeznamu: Wfl.Interface.TypSeznamuEpk;
        TypZadostiFilter: any;
        EpkPlus: number;
        /** EPK - Zobrazovat datumový filtr v seznamech EPK */
        DateIntervalVisible: DatFiltrZobEnum;
        ZpusVyrizRadio: boolean;
        /** využito u vlastních záznamů */
        Vyrizeno: boolean;
    };
    enum EpkValidateRowEnum {
        /** prázdný seznam */
        empty = 99,
        /** jeden řádek */
        one = 1,
        /** multi výběr */
        multi = 2
    }
    interface IEpkDetailOpt {
        /** hodnota stavu*/
        state: EpkValidateRowEnum;
        /** data řádku */
        row?: Gordic.Wfl.Interface.GPodpisovaKnihaDto;
    }
    function loadFromUserSettings(userSettings: Data.IGStorage, key: string): any;
    function saveToUserSettings(userSettings: Data.IGStorage, key: string, value: any): true | null;
    /**
     * Změna stavu tlačítka na statusbaru(enabled, checked).
     * Funkce se hodí na detail.
     * @param {JQuery<HTMLElement>} element element tlačítka
     * @param {boolean} checked je zaškrtnuto?
     * @param {any} enabled (default = true as boolean) je povoleno?
     */
    function changeButtonOnStatusBar(element: JQuery<HTMLElement>, checked: boolean, enabled?: boolean): void;
    /**
     * setnutí panelu Souhrnu do pravého sidebaru (seznam, detail)
     * @param element element
     * @param row data řádku
     */
    function setPanelSouhrn(element: JQuery<HTMLElement>, row: Gordic.Wfl.Interface.GPodpisovaKnihaDto | null, cnt: GContentType<any>): void;
    /** nastavení priority */
    function setPriorita(row: Gordic.Wfl.Interface.GPodpisovaKnihaDto): {
        text: string;
        customClass: string;
        icon: string;
    };
    function getTypPozadPodTxtUtils(typ_pozad_pod?: Wfl.Interface.TypPozadavkuEpk | null): string;
    function setSignaturePositionsConsoleLog(name: string, config: Gordic.Wfl.Interface.GWflSignCreateConfig): void;
}
declare namespace Gordic.Epk.WebControls {
    /**
     * Seznam elektronické podpisové knihy
     */
    class GEpkGrid extends GContentBase<GEpkDbParamsNew> {
        /** např. typ požadavku: podepsat, schválit, ... */
        typPozadavku: Gordic.Wfl.Interface.TypPozadavkuEpk | null;
        /** pohledy supervisora */
        supervisor: Gordic.Wfl.Interface.EpkSupervisorEnum;
        private subtaskCert;
        /** element (grid) vyřízení žádosti v sidebaru */
        private elVyrizZadostGrid;
        /** element (parent) vyřízení žádosti v sidebaru */
        private elVyrizZadostParent;
        /** filtr element */
        private filter;
        private sidebar;
        /** element panelu souhrnu */
        private panelPreviewElement;
        private attachment;
        /** element (parent) panelu podrobnosti v sidebaru */
        private elPodrobnostiParent;
        private tmp_row_historie;
        private vyrizZadostContent;
        private epkAttachment;
        /** jsme v debugu ? */
        private IsDebug;
        private initialValueStavZadosti;
        private initialValueZpusobVyrizeni;
        private initialValueEpkTermin;
        private initialValueSupervisor;
        /** iniciační hodnota pro selectbox závislé */
        private initialValueZavisle;
        /** hodnota typu termín z dashboardu hlavní stránky */
        private epk_termin?;
        private datVyrizeniName;
        private datVyrizPlanName;
        private datPozadName;
        private settingsDate;
        /** data filtru pro ISL */
        private filterData;
        /** stav žádosti - seznam vlastní žádosti */
        private stavZadosti;
        /** typ podepsání (osobní certifikát, pečeť, neurčeno) - ref T10497 */
        private signType;
        /** typ seznamu (grid) */
        private TypSeznamu;
        /**  Zvýraznění nepřečtených řádků **/
        private zvyrazneniNeprectenych;
        /** aktivní až od určité verze db */
        private zvyrazneniNeprectenychVlastni;
        /** příznak zobrazení záznamů po termínu z notifikačního centra */
        private notificationCenterFlag;
        /** objekt badgů subtasků */
        private subtask;
        private subtaskCertBadge;
        /** isl view gridu */
        private view;
        /** temp data řádku - vyřízení žádosti */
        private tmp_row_vyriz;
        /** identifikátor funkčního místa */
        private ixs_fun;
        /** třída obecných metod */
        private common;
        /** třída společných akcí v epk */
        private epkActionCnt;
        /** společné akce TS */
        private epkActionTS;
        private filterForm;
        private DateRangeOpt;
        /** příznak vytvoření sidebaru */
        private sidebarFlag;
        /**
         *  tempRow - pro sidebar
         *  rozděleno kvůli tomu, že se selection volá vícekrát
         * */
        private tempSidebarRow;
        private sidebarMinWidth;
        onContentReady(): void;
        private resetAsyncRequest;
        private attemptToSettlement;
        /** metoda pro odchod z contentu */
        closing(): JQuery.Promise<any, any, any>;
        private init;
        private setDebouncedMethod;
        private createSubtasksVlastniZadosti;
        /**
        * nastavení setnuté hodnoty - buď odečtu 1 nebo přičtu 1, v případě multivýběru zvýším hodnotu o daný počet
        */
        private setValue;
        private setStateToBadges;
        /** příznak pouze jednoho spuštění při vlezení na dialog */
        private onlyOnceFast;
        /** nastavení vstupních hodnot  */
        private setInitValues;
        private createSubtaskCert;
        private _createSubtasksCert;
        /**
         * zobrazí dle parametru nastavení subtask certifikátu (a zároveň dělá update/refresh seznamu)
         * @param state
         * @returns
         */
        private showSubtaskCert;
        private initValuesSubtasks;
        private createSubtasks;
        private _createSubtasks;
        private updateBadges;
        /** nastavení čísel badgů na subtascích */
        private setBadgeNumbersToSubtasks;
        private setBadgeBase;
        /** nastavení badgů */
        private setBadge;
        /**
         * vytvořit filtrpanel
         */
        private createFilter;
        private setInitialValueFiltersForm;
        private getInitialValueStavZadosti;
        /**
         * nastavit formulář filtru
         */
        private createFilterForm;
        /**
         * uložení hodnoty do userSettings, pokud je userSettings je definováno
         * @param name název userSettings
         * @param value hodnota
         */
        private _setUserSettings;
        /**
         * vytvořit context menu na seznamu (na pravé tlačítko)
         */
        private createContextMenu;
        private addButtonZmenaPriority;
        /**
         * nastavit na nepřečteno (z pohledu vyřizovatele)
         * seznamy k vyřízení, vráceno k přepracování (wflszps)
         * priz_view_epk = 0;
         */
        private addButtonNastavitNeprecteneVyrizovatel;
        /**
         * nastavit na nepřečteno (z pohledu vlastníka)
         */
        private addButtonNastavitNeprectene;
        private validateSearchColumns;
        /** GIN eKlep - Role uživatele pro funkčnost eKLEP */
        private gin_eklep_role;
        /**
         * vytvořit seznam (grid)
         * @returns
         */
        private createGrid;
        private createIslGrid;
        private uzo;
        /** příprava zrychleného vyřízení */
        private initFastSettlement;
        private onWorking;
        private checkColorRows;
        /**
         * označit všechny řádky
         */
        private gridCheckAll;
        /** přednatavení stavů tlačítek */
        private preSetStates;
        /** zavolání contextového menu při pravém kliku myši */
        private callContextMenu;
        /**
         * nastavit řádek jako přečtený
         * @param row data řádku
         */
        private setPrectene;
        /**
         * nastavení příznaků nepřečteno/přečteno na seznamech K Vyřízení a Vráceno k přepracování (wflszps)
         * @param row řádek podpisové knihy
         * @param priz_view_epk 0 - nepřečteno, 10 - přečteno k vyřízení, 20 - vráceno k přepracování (info. pokud načítám nepřečteno pro vráceno k přepracování, tak beru množinu s hodnotami 0 i 10)
         */
        private _setRowRead;
        private setNeprecteneVyrizovatel;
        private _setRowReadOwn;
        /** nastavení příznaku nepřečtené žádosti (pouze na seznamu Vlastní žádosti typu: Vráceno k přepracování | Vyřízeno) */
        private setNeprectene;
        /** přidání termínu vyřízení do filtru */
        private addEpkTermin;
        private getFilterPocetZadosti;
        private presetFilters;
        /**
         * získat filtry
         * @returns
         */
        private getFilter;
        private refreshGrid;
        /**
         * update gridu
         */
        private updateGrid;
        private getZrusitZadostdoEPKStateGrid;
        /**
         * vytvořit menubar
         */
        private createMenuBar;
        private addActionUmisteniPodpisu;
        private cancelReqServiceCnt;
        private addZrusitZadostButton;
        private getParams;
        private getZrusitZadostdoEPKState;
        /** nastavení tlačítka pro zrušení žádostí T23822 */
        private setZrusitZadostdoEPK;
        /**
         * aktualizace stavů v menubaru
         * @param {number} rowCount
         */
        private updateMenuBar;
        /** přidat tlačítko občerstvení */
        private addRefreshButton;
        /**
         * přidat tlačítko k posouzení
         * @returns
         */
        private addKPosouzeniButton;
        /**
         * přidat tlačítko pro vrácení k přepracování
         * @returns
         */
        private addVratitButton;
        /**
         * přidat timeout před vyřízením - pokud není ještě dokreslen nový stav gridu
         */
        private addTimeoutBeforeSettlement;
        private addResetAsyncButton;
        private getAsyncLimitDate;
        /**
         * prevedení resetování async metody
         * @param selection výběr
         * @param index index řádku
         */
        private resetAsync;
        /**
         * přidat tlačítko pro vyřízení
         * @returns
         */
        private addVyriditButton;
        /** hromadné vyřízení
         * - přes tlačítko "podepsat", chci odebrat tlačítko hromadné vyřízení
         * - musím ještě provést validaci, jestli vůbec mohu hromadně vyřizovat
         */
        private hromadneVyrizeni;
        /** výběr řádků pro hromadné vyřízení */
        private rowsForMultiSettlement;
        /**
         * validace hromadného vyřízení
         */
        private validateHromadneVyrizeni;
        /**
         * přidat tlačítko detail do menubaru
         * @returns
         */
        private addDetailButton;
        /**
         * akce otevření detailu dokumentu v nové záložce
         */
        private addDetailDokumentTabButton;
        private addDetailDokumentButton;
        private openDetailDokument;
        /**
         * načíst detail žádosti
         */
        private openDetail;
        /**
         * validace řádku pro zjištění, jestli je řádek prázdný, či je vybrán jeden řádek nebo, jestli je řádků vybráno více (multi)
         */
        private validateRow;
        private gfrmPanel;
        private colorPickerPanel;
        /**
         * Funkce createSidebar vytvoří pravý sidebar vedle seznamu v EPK
         */
        private createSidebar;
        private rSide;
        private updateSidebar;
    }
}
declare namespace Gordic.Epk.WebControls {
    interface IGEpkGridFormatOpt {
        typSeznamu: Wfl.Interface.TypSeznamuEpk;
        /** EPK - dny do termínu (těsně nevyřízené záznamy) */
        gin_epk_updoter: number;
        /**  SSL EPK - Uživatelský sloupec F - název sloupce zobrazovaný uživateli */
        epk_uziv_sl_fn: string;
        /** text. číslo jednací */
        textCJShortDBParam: string;
        /** Jedná se o fázi USU? */
        isFazeUsu: boolean;
        /** text. značka */
        znackaShortText: string;
        /** Gordic.Epk.WebControls.GEpkActionsService */
        epkAction: GContent;
        /** SSL EPK - Rozšíření pro odsouhlasení přidělení/předání dokumentů a vyřízení spisů */
        ssl_epk_plus2: boolean;
        /** GIN eKlep - Role uživatele pro funkčnost eKLEP */
        gin_eklep_role: number;
        /** povolení fikce vyřízení */
        povoleniFikceVyrizeni: boolean;
    }
    class GEpkGridFormat {
        private typSeznamu;
        /** Gordic.Epk.WebControls.GEpkActionsService */
        private epkAction;
        /**  SSL EPK - Uživatelský sloupec F - název sloupce zobrazovaný uživateli */
        private epk_uziv_sl_fn;
        /** EPK - dny do termínu (těsně nevyřízené záznamy) */
        private gin_epk_updoter;
        /** text. číslo jednací */
        private textCJShortDBParam;
        /** Jedná se o fázi USU? */
        private isFazeUsu;
        /** text. značka */
        private znackaShortText;
        /** SSL EPK - Rozšíření pro odsouhlasení přidělení/předání dokumentů a vyřízení spisů */
        private ssl_epk_plus2;
        /** povolení políčka uzo */
        private readonly;
        private povoleniFikceVyrizeni;
        /** GIN eKlep - Role uživatele pro funkčnost eKLEP */
        private gin_eklep_role;
        private globalSettings?;
        constructor(opt: IGEpkGridFormatOpt, readonly: (row?: any) => boolean, globalSettings?: Gordic.Data.IGStorage | null);
        getFormat(): Data.GridFormat<Wfl.Interface.GPodpisovaKnihaDto>;
        gridFormatMobile(): {
            columnList: string;
            searchColumns: GGridColumn<Wfl.Interface.GPodpisovaKnihaDto>[];
        };
        gridFormatSimple(): {
            columnList: string;
            searchColumns: GGridColumn<Wfl.Interface.GPodpisovaKnihaDto>[];
        };
        gridFormatBasicDone(): {
            columnList: string;
            searchColumns: GGridColumn<Wfl.Interface.GPodpisovaKnihaDto>[];
        };
        gridFormatBasic(): {
            columnList: string;
            searchColumns: GGridColumn<Wfl.Interface.GPodpisovaKnihaDto>[];
        };
        gridFormatEko(): {
            columnList: string;
            searchColumns: GGridColumn<Wfl.Interface.GPodpisovaKnihaDto>[];
        };
        private getStringNamesOfColumns;
        private eko;
    }
    class GEpkGridFormatColumnsInternal {
        private globalSettings?;
        constructor(globalSettings?: Gordic.Data.IGStorage | null);
        /**
         * sloupec Typ přílohy eKLEP
         */
        getTypPrilohyEklep(format: Data.GridFormat<any>): void;
        /**
         * sloupec Adresa subjektu
         * - FRAGMENT
         */
        getAdresaSubjekt(format: Data.GridFormat<any>): void;
        /**
         * sloupec Název subjektu
         * - FRAGMENT
         */
        getNazevSubjekt(format: Data.GridFormat<any>): void;
        /**
         * sloupec IČO
         * - FRAGMENT
         */
        getICO(format: Data.GridFormat<any>): void;
        /**
         * sloupec Popis dokladu
         * - FRAGMENT
         */
        getPopisDoklad(format: Data.GridFormat<any>): void;
        /**
         * sloupec Celková částka v CZK
         * - FRAGMENT
         */
        getCelkovaCastkaCZK(format: Data.GridFormat<any>): void;
        /**
         * sloupec Ag. číslo prim. dokladu
         * - FRAGMENT
         */
        getAgCisloPrimDoklad(format: Data.GridFormat<any>): void;
        /**
       ¨ * sloupec Typ prim. dokladu
         * - FRAGMENT
         */
        getTypPrimDoklad(format: Data.GridFormat<any>): void;
        /**
         * sloupec Popis operace
         * - FRAGMENT
         */
        getPopisOperace(format: Data.GridFormat<any>): void;
        /**
         * sloupec Popis financování
         * - FRAGMENT
         */
        getPopisFinancovani(format: Data.GridFormat<any>): void;
        /**
         * sloupec Popis zaúčtování
         * - FRAGMENT
         */
        getPopisZauctovani(format: Data.GridFormat<any>): void;
        /**
         * sloupec PID předchozí kontroly
         * - FRAGMENT
         */
        getPidPredchoziKontroly(format: Data.GridFormat<any>): void;
        /**
         * sloupec Datum splatnosti
         * - FRAGMENT
         */
        getDatumSplatnosti(format: Data.GridFormat<any>): void;
        /**
         * sloupec Schvalovaná částka v aktuálním roce
         * - FRAGMENT
         */
        getSchCastkaAktRok(format: Data.GridFormat<any>): void;
        /**
         * sloupec Měna
         * - FRAGMENT
         */
        getMena(format: Data.GridFormat<any>): void;
        /**
         * sloupec Celková částka
         * - FRAGMENT
         */
        getCelkovaCastka(format: Data.GridFormat<any>): void;
        /**
         * sloupec Odesílatel
         * - FRAGMENT
         */
        getOdesilatel(format: Data.GridFormat<any>): void;
        /**
         * sloupec Plánovaný důvod vyřízení
         * - BEZ FRAGMENTU
         * - počítaný sloupec závislý na ixp, ser_cislo
         */
        getSettlementReason(format: Data.GridFormat<any>): void;
        /**
         * sloupec Stav schval. předpisu
         * - FRAGMENT
         */
        getStavSchvalPredpis(format: Data.GridFormat<any>): void;
        /**
         * sloupec Číslo materiálu
         * - FRAGMENT
         */
        getCisloMaterialu(format: Data.GridFormat<any>): void;
        /**
         * sloupec PID prim. dokladu
         * - FRAGMENT
         */
        getPIDPrimDokladu(format: Data.GridFormat<any>): void;
        /**
         * sloupec  Verze el. souboru
         * - FRAGMENT
         */
        getSerCisloElp(format: Data.GridFormat<any>): void;
        /**
         * sloupec ID el. souboru
         * - FRAGMENT
         */
        getIxbElp(format: Data.GridFormat<any>): void;
        /**
         * sloupec Verze el. obrazu
         * - FRAGMENT
         */
        getSerCisloElObraz(format: Data.GridFormat<any>): void;
        /**
         * sloupec Kategorie schvalovacího procesu
         * - FRAGMENT
         */
        getKrgRspTxt(format: Data.GridFormat<any>): void;
        /**
         * sloupec Cíl redistribuce(Funkce)
         * - FRAGMENT
         */
        getIxsFunDoNazev(format: Data.GridFormat<any>): void;
        /**
         * sloupec Cíl redistribuce(Spisový uzel)
         * - FRAGMENT
         */
        getIxsSuDoNazev(format: Data.GridFormat<any>): void;
        /**
         * sloupec Typ dokumentu
         * - FRAGMENT
         */
        getNazevTyp(format: Data.GridFormat<any>): void;
        /**
         * sloupec El. příloh
         * - FRAGMENT
         */
        getPocPriloh(format: Data.GridFormat<any>): void;
        /**
         * sloupec Přípona el. obrazu
         * - FRAGMENT
         */
        getSouborPri(format: Data.GridFormat<any>): void;
        /**
         * sloupec Na spisovém uzlu
         * - FRAGMENT
         */
        getNazevSuAkt(format: Data.GridFormat<any>): void;
        /**
         * sloupec Vlastník
         * - FRAGMENT
         */
        getNazevFunAkt(format: Data.GridFormat<any>): void;
        /**
         * sloupec Datum požadavku
         * - FRAGMENT
         */
        getDatPozad(format: Data.GridFormat<any>): void;
        /**
         * sloupec Související / vazby
         * - BEZ FRAGMENTU
         * - počítaný sloupec s poc_souv_dok
         */
        getSouvisDok(format: Data.GridFormat<any>): void;
        /**
         * sloupec Stav dokumentu
         * - FRAGMENT
         */
        getStavPisemnost(format: Data.GridFormat<any>): void;
        /**
         * sloupec Návaznost žádosti
         * - BEZ FRAGMENTU
         * - počítaný sloupec závislý na aktivita a sch_pov
         */
        getNavaznost(format: Data.GridFormat<any>): void;
        /**
         * sloupec Vyřizuje
         * - FRAGMENT
         */
        getFunKomu(format: Data.GridFormat<any>): void;
        /**
         * sloupec Vyřizující dokument
         * - BEZ FRAGMENTU
         * - počítaný sloupec navázáný na ixb_vyriz_epk
         */
        getVyrizDokument(format: Data.GridFormat<any>): void;
        /**
         * sloupec Žádost na el. přílohu
         * - BEZ FRAGMENTU
         * - počítaný sloupec navázaný na ixb_elp a ixb_el_obrazu
         */
        getRequestAttachment(format: Data.GridFormat<any>): void;
        /**
         * sloupec Uzo (barevné označení)
        * - FRAGMENT
         */
        getUzo(format: Gordic.Data.GridFormat<any>, readonlyFunc: () => boolean): void;
        /**
         * sloupec Uživatelský sloupec
         * - FRAGMENT
         */
        getUzivSloupec(format: Data.GridFormat<any>, epk_uziv_sl_fn: string): void;
        /**
         * sloupec Agenda primárního dokumentu (zkratka primární agendy)
         * - FRAGMENT
         */
        getZkratkaPrimAgendy(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Název primární agendy
         * - FRAGMENT
         */
        getNazevPrimAgendy(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Změnu provedl
         * - FRAGMENT
         */
        getZmenuProv(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Typ požadavku
         * - FRAGMENT
         */
        getTypPozadPodTxt(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Upřesnění
         * - FRAGMENT
         */
        getUpresneni(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Sp.Zn. (spisová značka)
         * - FRAGMENT
         */
        getCjSpis(format: Gordic.Data.GridFormat, textCJShortDBParam: string, isFazeUsu: boolean): void;
        /**
         * sloupec Zn. (značka)
         * - FRAGMENT
         */
        getCj(format: Gordic.Data.GridFormat, znackaShortText: string): void;
        /**
         * sloupec Věc spis (pro dokumenty ve spisu)
         * - FRAGMENT
         */
        getVecSpis(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Věc
         * - FRAGMENT
         */
        getVec(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Datum vyřízení
         * - FRAGMENT
         */
        getDatVyrizeni(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Popis vyřízení
         * - FRAGMENT
         */
        getVyrizeniTxt(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Provedený požadavek
         * - FRAGMENT
         */
        getTypPoz(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Způsob vyřízení
         * - FRAGMENT
         */
        getZpusobVyriz(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Předpis (Název šablony)
         * - FRAGMENT
         */
        getNazevSablony(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Technické vlastnosti
         * @param format
         */
        getTechnickeVlastnosti(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Priorita
         * - FRAGMENT
         */
        getPriorita(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Typ entity
         * - FRAGMENT
         */
        getTypEntity(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Termín
         * - FRAGMENT
         */
        getTermin(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Vyřizoval
         * - FRAGMENT
         */
        getFunVyriz(format: Data.GridFormat<any>): void;
        /**
         * sloupec Žadatel
         * - FRAGMENT
         */
        getFunOdNazev(format: Gordic.Data.GridFormat): void;
        /**
         * identifikátor žádosti (dokumentu)
         * - FRAGMENT
         */
        getIxp(format: Gordic.Data.GridFormat): void;
        /**
          * identifikátor žádosti (dokumentu)
          * - FRAGMENT
          */
        getNazevSchvalovaciRole(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Fikce vyřízení
         * - FRAGMENT
         */
        getPrizFikceVyrizen(format: Gordic.Data.GridFormat): void;
        /**
         * sloupec Termín vyřízení
         * - BEZ FRAGMENTU
         * - počítaný sloupec na straně TS
         * - závislý na sloupci dat_vyriz_plan, termin_vyrizeni
         */
        getTerminVyrizeni(format: Gordic.Data.GridFormat, gin_epk_updoter: number): void;
    }
}
declare namespace Gordic.Epk.WebControls {
    class GEpkDetailMobile extends GContentBase<GEpkDbParamsNew> {
        /** identifikátor dokumentu /žádosti */
        Ixp: string;
        /** pořadové číslo žádosti */
        SerCislo: number;
        /** příznak přenačtení detailu žádosti */
        private Reload;
        /** načtený řádek žádosti */
        row: Gordic.Wfl.Interface.GPodpisovaKnihaDto;
        /** identifikátor funkce aktuálně přihlášeného uživatele */
        private ixsFunPrihlasenehoUzivatele;
        /** třída obecných metod */
        private common;
        onContentReady(): void;
        /**
         * nastavení vstupních hodnot
         */
        private setInitValues;
        /** nastavení pro procházení detailů pomocí šípek */
        private listControls_setup;
        private getSettlementParams;
        private createMenubar;
        private showFlashOnStart;
        private getStatusbarParams;
        private getParams;
        /** automacké otevření detailu */
        private autoDetailRun;
        private selectTypeOfClose;
        private getCommandbarParams;
        private showNahled;
        private _load;
    }
}
declare namespace Gordic.Epk.WebControls {
    class GEpkGridCard extends GContentBase<GEpkDbParamsNew> {
        private typPozadPod;
        private TypSeznamu;
        private stavZadosti;
        private uzo;
        private epk_termin;
        private common;
        private ixs_fun;
        private attemptToSettlement;
        onContentReady(): void;
        closing(): void;
        private main;
        private cmdBarElement;
        private create;
        private createForm;
        private getTypPozadPod;
        private getTermin;
        private getTerminInitialValue;
        private gridMobile;
        private createHiddenGrid;
        private getCommandbarParams;
        private createMenubar;
        private addResetAsyncButton;
        private getAsyncLimitDate;
        /**
         * prevedení resetování async metody
         * @param selection výběr
         * @param index index řádku
         */
        private resetAsync;
        private reload;
        private getFilter;
        private viewMobile;
        private createElements;
        private counterEl;
        private bottomPanelEl;
        private createCounter;
        private panel;
        private getIcon;
        /** nastavení priority */
        private setPriorita;
        private createElement;
        private viewMobileIndex;
        private clickOnDetail;
        private clickOnLeft;
        private clickOnRight;
        private getParams;
        private runSettlement;
        private sendNotification;
        private registerSwipeEvents;
        private states;
        private multiSettlement;
        private createEpkCompleteConfigDto;
        private setStateOnRow;
        private setCheckOnRows;
        private setEnableOnRows;
        /** podepsat obraz */
        private signFavorite;
        /** timestamp */
        private timeStampColumnName;
        /** signAttachment */
        private signAttachmentColumnName;
        /** convert */
        private convertColumnName;
        /** timestampAttachment */
        private timestampAttachmentColumnName;
        /** convertAttachment */
        private convertAttachmentColumnName;
        /** signAttachmentNoPDF */
        private signAttachmentNoPDFColumnName;
        private setNewPropertyToRow;
    }
}
declare namespace Gordic.Epk.WebControls.Sidebar {
    class GEpkAiSidebar {
        private cnt;
        private aiAttachments;
        private scAiSideBar?;
        constructor(cnt: GContentType<any>);
        create(): void;
        registerAttachments(row: Gordic.Wfl.Interface.GPodpisovaKnihaDto | null): void;
        private build;
    }
}
declare namespace Gordic.Epk.WebControls.Sidebar {
    class GEpkAttachment {
        /** typ posuvu v náhledovačce */
        private scrollMode;
        private cnt;
        constructor(cnt: GContentType<any>);
        private tempRow?;
        create(openFunc: Function, attachFunc: Function, grid?: JQuery<HTMLElement>): GSideBarPanelOptions;
        private flashAttachment;
        open(activeRow: Gordic.Wfl.Interface.GPodpisovaKnihaDto | null, attachment: JQuery<HTMLElement>): void;
        private _createAttach;
        customDownload(input: {
            ixp?: string;
            porCislo?: number;
        }, row?: Gordic.Wfl.Interface.GPodpisovaKnihaDto | null): JQuery.Promise<any, any, any>;
        private _updateAttach;
        private _disableAttach;
    }
}
declare namespace Gordic.Epk.WebControls.Sidebar {
    class ColorPickerPanel {
        private globalSettings?;
        private instance;
        getCurrentRow: Function;
        done: Function;
        constructor(globalSettings?: Gordic.Data.IGStorage | null);
        create(): GSideBarPanelOptions;
        update(): void;
    }
    class GEpkGfrmPanel {
        constructor(cnt: GContent);
        /** nastala změna na GFRM sestavě */
        private changeOnGfrm;
        private tmpIxp;
        private gfrmServiceCnt;
        private gfrmCnt;
        private gfrmElement;
        getServiceContent(): GContent<IGContentBase, any>;
        private cnt;
        create(cnt: GContent, ixpForced?: string): GSideBarPanelOptions;
        /**
         * načtení či reload panelu
         * @param cnt
         * @param element
         * @param ixp
         */
        loadPanel(cnt: GContentType<any>, element: JQuery<HTMLElement>, ixp: string): void;
        /**
         * spustit operaci pro uložení GFRM a získání GUID k vyexportovanému PDF
         * @param epk_gfrmzobr
         * @param akce_epk
         */
        run(epk_gfrmzobr: number, akce_epk: Wfl.Interface.GEpkWflcsaeEnum): any;
        /** proběhne jak uložení GFRM, tak export do PDF */
        protected saveAll(): JQuery.Promise<any, any, any>;
        /** proběhne pouze uložení GFRM */
        protected saveGfrm(): any;
        /** proběhne pouze export do PDF */
        protected savePdf(): any;
        private getIxsFrm;
        private customLoadSidebar;
        private zaregistrujTrigeryNaGFRM;
        private getGfrmContent;
        private getIxp;
        private getFormSelector;
    }
}
declare namespace Gordic.Epk.WebControls {
    interface IGEpkSidebar {
        grid?: JQuery<HTMLElement>;
        cnt: GContentType<GEpkDbParamsNew>;
        getRow: Function;
    }
    class GEpkSidebar {
        cnt: GContentType<GEpkDbParamsNew>;
        grid?: JQuery<HTMLElement>;
        private sidebarMinWidth;
        /**
         * konstruktor
         */
        constructor(obj: IGEpkSidebar);
        private _getRow;
        private souvisVazbyCnt;
        /**
         * Vytvoření pravých panelů v sidebaru
         * - pokud je již panel vytvořen, pokusíme se o update jeho obsahu
         */
        createRightPanels(sidebar: JQuery<HTMLElement>): void;
        /**
         * Vrať data aktivního (vybraného) řádku seznamu
         */
        private getRow;
        private epkAttachment;
        private attachment;
        /**
         * panel náhledu na přílohy
         * @returns
         */
        private createPanelAttachment;
        private panelPreviewElement;
        private createPanelPreview;
        /** temp data řádku historie schvalovani */
        private tempRowHist;
        /** content panelu historie schvalovani */
        private histSchvalBadge;
        private createPanelHistorieSchvalovani;
        private badgeSchvalProces;
        private setBadge;
        private updatePanelHistorieSchvalovani;
        private createPanelVyrizZadost;
        private tmpRow;
        private updatePanelVyrizZadost;
        private vyrZadostCnt;
        private setDataVyrizeniZadosti;
        private updateMenuBarVyrizeniZadosti;
        private createFormVyrizeniZadosti;
        /** data view gridu */
        private view;
        private createGridVyrizeniZadosti;
        private formatGridVyrizeniZadosti;
        private exportPrilohy;
        /** související/vazby element */
        private badgeSouvis;
        private createPanelSouvisVazby;
        private updatePanelSouvisVazby;
        /** temp řádek dat ověření podpisu */
        private tempRowOvereniPodpisu;
        /** content ověření podpisu */
        cntOvereniPodpisu?: GContent;
        private createPanelOvereniPodpisu;
        setPanelOvereniPodpisu(opt: {
            cntOver?: GContent;
            ixb?: string;
            filename?: string;
        }): void;
        private setPanelOvereniEmpty;
        private notePanelEl;
        private notePanelBadge;
        private createPanelPoznamky;
        private updateCountPoznamky;
        private updatePanelPoznamky;
        private gnotePanel;
        private _createNotes;
        /** Aktualizace dat panelů pravého sidebaru
         * - hodí se pro překreslení na seznamu
         * - na detailu žádostí se update panelů provádí primárně jinou cestou
         */
        updateSidebar(sidebar: JQuery<HTMLElement> | null): void;
    }
}
declare namespace Gordic.Epk.WebControls {
    /**
     * Podepisovací objekt určený pro EPK
     * @authors pnovak, thazmuka
     * @since 480.1.0.781
    */
    class GEpkSigner extends Gordic.Wfl.WebClient.WflSigner {
        private _epkSignerLogger;
        get epkSignerLogger(): Diagnostics.GLog;
        finalizeConfigDelegate: (configGuid?: string, customDto?: Gordic.Epk.WebControls.Vyrizeni.ISignerCustomDto) => JQuery.Promise<string | undefined, IGReasonResponse>;
        private reasonDto;
        /** konstruktor */
        constructor(opt: {
            cnt?: any;
            povoleniPraceDialoguDuvoduPodpisu: boolean;
            ktgDto?: GKtgDpoSupportDbParamsDto;
            row?: Wfl.Interface.GPodpisovaKnihaDto;
        });
        private getSrv;
        private _beforeCertDelegate;
        private _chooseCertDelegate;
        sign<T extends IGCustomDto>(signingConfig: Gordic.Wfl.Client.GSignPreConfigWithTypeOfCertDto, customDto?: T): JQuery.Promise<any, IGReasonResponse>;
    }
    class GEpkVyberDpo {
        showDlg(cnt: GContentType<any>, row: Wfl.Interface.GPodpisovaKnihaDto, ktg_duvod_txt: string): JQuery.Promise<any, any, any>;
        private createForm;
    }
}
declare namespace Gordic.Epk.WebControls {
    class GEpkSouvisejiciVazby {
        /** data z řádku žádosti v epk */
        private epkRow;
        private subtasks;
        private view;
        private body;
        private parentElement;
        private main;
        private cnt;
        private grid;
        private attachment;
        constructor(cnt: GContentType<any>, parentElement: any, epkRow: Gordic.Wfl.Interface.GPodpisovaKnihaDto);
        create(): void;
        private init;
        private loadData;
        private createSubtasks;
        private createGrid;
        private showPanel;
        private tempIxp;
        /**
         * getAttachmentIxp - vrať identifikátor souvisejícho souboru
         */
        private getAttachmentIxp;
        private createAttachment;
    }
}
declare namespace Gordic.Epk.WebControls {
    /** K vyřízení */
    class HistSchvalDokument extends GContentBase {
        /** identifikátor */
        private Ixp;
        /** grid element */
        private grid;
        onContentReady(): void;
        private init;
        /** vytvoření seznamu */
        private createGrid;
        /** nasetování dat do gridu historie změn žádosti */
        private setDataToGridHistorieZmenZadosti;
        /** občerstvení seznamu historie změn žádosti - nasetování dat do seznamu */
        private refreshHistorieZmenZadosti;
        /** načtení sloupců gridu historie změn žádosti */
        private loadGridFormat;
        private createMenubar;
        private createCommandbar;
    }
}
declare namespace Gordic.Epk.WebControls {
    /**
     * EPK - řízení zaškrtávátka 'Čekat na vyřízení' na okně předání k posouzení (enum)
     */
    enum EpkZaskceknavyEnum {
        HodnotaNaposledyZvolenaUzivatelem = 0,
        Nezaskrtnuto = 1,
        Zaskrtnuto = 2
    }
    /** K vyřízení */
    class KPosouzeni extends GContentBase {
        private checkWait;
        private form;
        /** EPK - řízení zaškrtávátka 'Čekat na vyřízení' na okně předání k posouzení */
        private EpZaskceknavy;
        /** FilterPridruzenaStrediska */
        private FilterPridruzenaStrediska;
        /** FilterDlePovolenychFazi */
        private FilterDlePovolenychFazi;
        /** návratový příznak */
        private closeState;
        /** data řádku */
        private Rows;
        onContentReady(): void;
        private init;
        /**
        * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
        *
        * @param {JQuery<HTMLElement>} form předaný element formuláře
        * @returns {JQueryPromise<boolean>} výsledek stavu
        */
        private waitForValues;
        private FunkceHromadnePredani?;
        /** Název seznamu funkcí zobrazený v EPK při hromadném předání k posouzení
         * - vyplnění značí aktivaci parametru
         */
        private epk_hrpo_na;
        /**
         * vrátí všechny výchozí filtry políčka vyřizovatele
         * @param enableHrpo
         */
        private getServerFilters;
        /**
         * nastavení filtry políčka vyřizovatele
         * @param enableHrpo
         */
        private setServerFilters;
        private createForm;
        private createCommandbar;
        private clickOnOk;
        /**
         * poslat notifikace po předání k posouzeni
         */
        private sendNotificationVyrizeni;
        closing(): boolean;
        /**
         * nastavit checkbox čekat na vyřízení
         */
        private setCheckBoxWaitForSettlement;
    }
}
declare namespace Gordic.Epk.WebControls {
    /**
     * Statistiky pro EPK
     */
    class GEpkDashboard extends GContentBase {
        /** parametry v EPK */
        private EpkParams;
        private NazevRef;
        private NazevFun;
        private DatLoginTxt;
        private model;
        private VracenoKPrepracovaniVisible;
        private VyrizenoVisible;
        /** příznak mobilního zobrazení z webconfigu */
        private EpkMobile;
        /** list posledně použitých dokumentů */
        private LastUsed;
        onContentReady(): void;
        isGbeSupported(): boolean;
        private createInternalActionsForTestEpk;
        private resetAsyncRequest;
        /** zobrazení úvodních počtů VČETNĚ ZÁSTUPŮ do více DB */
        private epkZastupy?;
        private init;
        private epkUrls;
        private epkAjax;
        private prepareCount;
        private showLastUsed;
        private EpkZobrzastVyrizenoVisible;
        private EpkZobrzastVlastniPrepracovaniVisible;
        private EpkZobrzastVracenoKPrepracovaniVisible;
        private showKpiCount;
        private createDashboard;
        private loadModuleInfo;
    }
}
declare namespace Gordic.Epk.WebControls {
    /** Posledně použité dokumenty */
    class EpkLastUsed {
        /**
         * getItem
         */
        getItem(lastUsed: any[], cnt: GContentType<any>, zone?: number): IGDashboardPanelOptions<any>;
    }
}
declare namespace Gordic.Epk.WebControls {
    export enum EpkScoreboardNavigateEnum {
        KVyrizeni = 1,
        VracenoKPrepracovani = 2,
        PosouzenoSchvaleno = 3,
        VlastniZadosti = 6
    }
    export interface IScoreboardNavigateParam {
        content: GContentType<any>;
        /** typ seznamu */
        type: EpkScoreboardNavigateEnum;
        taskId: string;
        ID: string;
        actionName: string;
        epkTermin?: Epk.WebControls.EpkTerminEnum;
        stavZadosti?: Wfl.Interface.GWflczpvEnum;
        supervisor?: number;
        uzo?: string;
        customClass?: string;
        cardView?: boolean;
    }
    export interface ScoreboardItemData {
        value: any;
        meaning: string;
        partPrimary?: string;
        partSecondary?: string;
    }
    interface IScoreboardItem {
        value: number;
        description: string;
        /** "info" | "negative" */
        meaning: string;
        action: GAction;
    }
    /** interface pro navigaci na konkrétní seznam */
    interface IScoreboardNavigate {
        /**
         * navigace na seznam
         *
         * @param {IScoreboardNavigate} param parametry
         */
        navigate(param: IScoreboardNavigateParam): void;
    }
    /** typ nástěnky */
    interface IScoreboardType {
        /**
         * nastavení všech částí nástěnky
         */
        set(params: EpkScoreboardParams[]): IScoreboardItem[];
        /** vytvořit část nástěnky pro konkrétní typ */
        create(itemData: ScoreboardItemData, navigateData: IScoreboardNavigateParam): IScoreboardItem;
    }
    interface IEpkScoreboardOpt {
        epk_prehl_org: number;
    }
    export class EpkScoreboardParams {
        itemData: ScoreboardItemData;
        navigateData: IScoreboardNavigateParam;
    }
    /** Scoreboard pro EPK */
    export class EpkScoreboard {
        /** příznak mobilního zobrazení z webconfigu */
        private EpkMobile;
        constructor(EpkMobile: "0" | "1");
        private scoreboardItem;
        /**
         * Vytvoření dashboardu v EPK
         *
         * @param {GContentType<any>} cnt
         * @param {any} modelCounts
         * @param {{ vraceno: boolean, vyrizeno: boolean} visible
         * @param {IEpkScoreboardOpt} [opt]
         */
        getItem(zone: number, cnt: GContentType<any>, count: Gordic.Wfl.Interface.GEpkSouhrnCountsDto, visible: {
            vraceno: boolean;
            vyrizeno: boolean;
            vlastni: boolean;
        }, opt?: IEpkScoreboardOpt, customClick?: Function, customTitle?: string): IGDashboardPanelOptions<any>[];
        private cardDisplay;
        private cardGrid;
        private setSettings;
        /**
         * Předání položek EPK KPI pro USU
         *
         * @param {GContentType<any>} cnt
         * @param {any} modelCounts
         * @param {{ vraceno: boolean, vyrizeno: boolean} visible
         * @param {IEpkScoreboardOpt} [opt]
         */
        createUSU(cnt: GContentType<any>, modelCounts: any, visible: {
            vraceno: boolean;
            vyrizeno: boolean;
            vlastni: boolean;
        }, opt?: IEpkScoreboardOpt): any[];
        private createOldDisplay;
        private createCardDisplay;
        private createKpi;
        private getItems;
        private setColorKpi;
        private generateKpi;
        private createCardColor;
        private createCardOwn;
        private createCard;
    }
    /** část nástěnky pro navigaci na konkrétní seznam */
    export class ScoreboardNavigate implements IScoreboardNavigate {
        navigate(param: IScoreboardNavigateParam): void;
    }
    /** jeden item nástěnky */
    export class ScoreboardItem implements IScoreboardType {
        set(params: EpkScoreboardParams[]): IScoreboardItem[];
        create(itemData: any, navigateData: IScoreboardNavigateParam): {
            value: any;
            data: IScoreboardNavigateParam;
            description: any;
            descriptionSecondary: any;
            meaning: any;
            action: GAction;
        };
    }
    export {};
}
declare namespace Gordic.Epk.WebControls {
    class GEpkTestCnt extends GContentBase {
        /** badge počtu vyřizujících se souborů */
        private attachBadge;
        private files;
        onContentReady(): void;
        private mygpcToken;
        private url;
        private ajax;
        private testNotification;
        private createGrid;
        private createMyContent;
        private createWizard;
        private testSestava;
        private startChain;
        private createMenubar;
        /**
         * vytvořit modální dialog pro přidání vyřizujících souborů
         */
        private createVyrizSouborDlg;
        private testForm;
        private createFormboxInternal;
        private createFormbox;
    }
}
declare namespace Gordic.Epk.WebControls {
    class GEpkTestCnt2 extends GContentBase {
        private printAction;
        onContentReady(): void;
        private createWizard;
        createMenu(): void;
        private reportStartingInitParams;
        private waitForValues;
    }
}
declare namespace Gordic.Epk.WebControls {
    class GEpkVlastniZadosti extends GContentBase {
        private grid;
        private view;
        private Rows;
        /** uživatelský požadavek na přerušení hromadného vyřízení */
        private userRequestedCancel;
        /** text uživatelského požadavku na přerušení hromadného vyřízení */
        private userRequestedCancelText;
        /** progres operace vyřízení jednoho souboru v hromadném vyřízení */
        private progress;
        /** zbývající počet */
        private remains;
        /** index žádosti, která se právě vyřizuje  */
        private index;
        /** úspěšně vyřízené */
        private success;
        /** neúspěšně vyřízené */
        private fail;
        onContentReady(): void;
        private init;
        private initValues;
        private createGrid;
        private getFormat;
        private searchColumns;
        private createCommandbar;
        private runAction;
        private settlement;
        private zrusitZadostdoEPK;
        private gridChange;
        /**
         * posunutí na další žádost
         */
        private shiftToVyrizNextFile;
        /**
         * ukaž výsledek hromadné operace
         */
        private showResult;
        private _fail;
        private isUserRequestedCancel;
        /**
        * spustit operaci (gcover)
        */
        private runOperation;
    }
}
declare namespace Gordic.Epk.WebControls {
    /**
     * Dialog doplnění IxsDpo na základě kategorie důvodu podpisu
     * ref T29860
     *
     * @author thazmuka
     * @since 490.1.0.28
     */
    class AddIxsDpoDlg {
        private cnt;
        constructor(cnt: GContentType<any>);
        run(ixsDpo: string, ktgDpoSupportDbParamsDto: GKtgDpoSupportDbParamsDto): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Epk.WebControls.Vyrizeni {
    interface IDuvodVyrizeniDto {
        /** připomínky */
        duvod_vyrizeni: string;
        /** funkční místo - předání */
        ixs_fun?: string;
        /** spisový uzel - přidělení + funkční místo  */
        ixs_su?: string;
    }
    /** třída dialog důvodu vyřízení */
    class DuvodVyrizeni {
        private gcontent;
        private form;
        /** důvod vyřízení (vyrizeni_txt) */
        private duvodVyrizeniFormName;
        private duvodVyrizeniPripominkovanoFormName;
        /** deffered, který se vyhodnotí při zavření dialogu a vrátí v thenu důvod(text) nebo se ve failu zavře */
        private dfd;
        private zpusobVyrizeni;
        private typPozadavku?;
        private stateBezPripominek;
        /** kliknutí (zavření) skrz tlačítka v commandbaru */
        private commClickState;
        /**
         * otevření důvodu vyřízení
         */
        run(cnt: any, zpusobVyrizeni: Gordic.Wfl.Interface.GWflczpvEnum, typPozadavku?: Gordic.Wfl.Interface.TypPozadavkuEpk | null, initialValue?: string | null): JQuery.Promise<IDuvodVyrizeniDto, IGReasonResponse, any>;
        private init;
        private createForm;
        private createCommandbar;
        private addWithoutCommentAction;
        private addContinueAction;
        private addCancelAction;
        private validateForm;
    }
}
declare namespace Gordic.Epk.WebControls.Vyrizeni {
    class EpkConfig {
        /** soubor vyřízení DTO */
        VyrizSouborDto: IVyrizSouborDto;
        private settlementServiceContent;
        private getServiceContent;
        /**
         * zavolat serverovou metodu EpkCompleteConfig
         *
         * @param {IVyrizeniEpkParams} params parametry
         * @param {string} [duvodVyrizeniTxt]
         * @param {any}
         */
        callEpkCompleteConfig(gcontent: GContent<any>, params: IVyrizeniEpkParams, async: number, duvodVyrizeniTxt?: string): JQuery.Promise<Gordic.Wfl.Interface.GEpkVyrizConfigGuidDto>;
        /**
         * epkCompleteConfig
         */
        epkCompleteConfig(gcontent: GContent<any>, dto: Wfl.Interface.GEpkCompleteConfigDto, async: number, multi: boolean): JQuery.Promise<Gordic.Wfl.Interface.GEpkVyrizConfigGuidDto>;
        /**
         * zavolat finální EpkFinishSettlement
         *
         * @param {IVyrizeniEpkParams} params parametry
         * @param {EpkVyrizeniResultDto[]} [data]
         */
        callEpkFinishSettlement(gcontent: GContent<any>, params: IVyrizeniEpkParams, guidConfig?: string | null, data?: EpkVyrizeniResultDto[]): JQuery.Promise<any, any, any>;
        callEpkFinishSettlementMulti(gcontent: GContent<any>, item: Wfl.Interface.GEpkCompleteConfigDto, guidConfig: string | null | undefined, data: EpkVyrizeniResultDto[] | null, async: number): JQuery.Promise<any, any, any>;
        /** zavolat EpkFinishSettlement pro ukrajinu */
        callEpkFinishSettlementUkr(gcontent: GContent<any>, params: IVyrizeniEpkParams, data?: EpkVyrizeniResultDto[]): JQuery.Promise<any, any, any>;
        /**
         * seřadit configy, tak, aby byl první obraz a poté následovali přílohy
         * @param configs
         */
        sortConfigs(configs?: Wfl.Interface.GEpkSignConfigDto[] | null): Wfl.Interface.GEpkSignConfigDto[] | null | undefined;
        /**
         * získat dto přiloženého souboru
         */
        getVyrizSouborDto(gcontent: GContentType<any>): boolean;
    }
}
declare namespace Gordic.Epk.WebControls {
    /** parametry nastavení tlačítka vyřízení */
    export interface ISettlementButtonChecked {
        schvalitVyrizeniSpisu: boolean;
        pridelit: boolean;
        predat: boolean;
        podepsat: boolean;
        schvalit: boolean;
        posoudit: boolean;
        vzitnavedomi: boolean;
        /** specialita pro UKR */
        splnit: boolean;
        /** specialita pro UKR */
        rozhodnout: boolean;
        /** podepsat přílohy */
        podepsatPrilohy: boolean;
        /** specialita EKLEP */
        pripominkovat: boolean;
        /** specialita EKLEP */
        zpracovat: boolean;
    }
    export interface ISettlementButtonEnabled {
        zamitnout: boolean;
        posoudit: boolean;
        vyridit: boolean;
    }
    export interface ISettlementButtonOpt {
        actions: GActionList;
        /** příznak, že se row.ixs_fun_komu rovná s ixs_fun ze sessionInfo */
        sessionIxsFunFlag: boolean;
        gcontent: GContentType<GEpkDbParamsNew>;
        multi: boolean;
    }
    /**
     *  Třída metod obsluhující tlačítka v menubaru
     */
    export class MenuButtonsService {
        /**
         * Jsou všechny stavy vyřízení nenastaveny?
         * @param checked hodnoty
         */
        private isAllSettlementsDontSet;
        private jeVynucenoProvest;
        private attachmentsWillBeSigned;
        setButtonsEmptyGrid(_cnt: any, typPozadavku: Gordic.Wfl.Interface.TypPozadavkuEpk | null): void;
        setButtons(opt: ISettlementButtonOpt, enabled: ISettlementButtonEnabled, checked: ISettlementButtonChecked): Wfl.Interface.TypPozadavkuEpk | null;
        updateMenuActions(opt: IMenuButtonsServiceAction[]): void;
        xActions(opt: IMenuButtonsServiceOpt, disableAll?: true): void;
    }
    interface IMenuButtonsServiceOpt {
        actVyrizeni: IMenuButtonsServiceAction;
        actVyrizeniContext: IMenuButtonsServiceAction;
        actNastaveniVyrizeni: IMenuButtonsServiceAction;
        actVratit: IMenuButtonsServiceAction;
        actVratitContext: IMenuButtonsServiceAction;
        actKPosouzeni: IMenuButtonsServiceAction;
        actKPosouzeniContext: IMenuButtonsServiceAction;
    }
    interface IMenuButtonsServiceAction {
        /** akce tlačítka */
        action?: GAction | null;
        /** povolení tlačítka */
        enabled?: boolean;
        /** popisek */
        caption?: string;
        /** nápověda */
        tooltip?: string;
    }
    export {};
}
declare namespace Gordic.Epk.WebControls {
    class TypPozadavkuEpkUtils {
        /** vrátit název */
        nazev(zpusobVyrizeni: Gordic.Wfl.Interface.GWflczpvEnum, typPozadavku?: Gordic.Wfl.Interface.TypPozadavkuEpk | null): string;
    }
}
declare namespace Gordic.Epk.WebControls.Vyrizeni {
    class NotificationSender {
        sendCustom(_cnt: any, text: string): void;
        send(_cnt: any, params: IVyrizeniEpkParams, state: "success" | "fail", reasonResponse?: IGReasonResponse): void;
        private init;
    }
}
declare namespace Gordic.Epk.WebControls {
    /**
     * Dialog přípravy vyřízení žádosti ze seznamu na subtasku Vše
     *
     * @author thazmuka
     * @since 482.1.0.339
     */
    class PripravaVyrizeniSubtaskVseDlg {
        /** otevřít dialog */
        open(cnt: any, rows: Gordic.Wfl.Interface.GPodpisovaKnihaDto[]): void;
        private filterRows;
        private createModalWindow;
        private createCommandBar;
        private createForm;
    }
}
declare namespace Gordic.Epk.WebControls {
    interface ISettlement {
        /** gcontent */
        cnt: GContentType<GEpkDbParamsNew>;
        /** metoda vyvolaná při každé změně / vyřízení žádosti */
        change?: Function | null;
        /** metoda vyvolaná po dokončení vyřízení */
        done?: Function | null;
        /**
         * předané data vyřizované žádosti
         * - braná v potaz pouze u single vyřízení z důvodů předání informací pro inicializaci kategorií důvodu podpisu
         */
        row?: Gordic.Wfl.Interface.GPodpisovaKnihaDto;
    }
    /**
     * Vyřízení v EPK
     *
     * @author thazmuka
     * @since 490.1.0.4
     */
    class Settlement {
        private customLogger;
        private selectCert;
        private epkConfig;
        private vyrizSigner;
        private gridChange;
        private done;
        /** název třídy serverového (async) vyřízení */
        private serverSettlementTaskName;
        /** guid configu */
        private GuidConfig?;
        /** info o cert */
        private certInfo;
        /** gcontent */
        private gcontent;
        /**
         * Příznak async vyřízení
         * 0 - synchronní vyřízení
         * 1 - async. vyřízení
         * 2 - async. vyřízení (včetně serverového)
         */
        private async;
        /** zbývající počet souborů (pro hromadné vyřízení) */
        /** Using certificate's private key is protected by another authentication factor and thus it's needed to wait for it's confirmation*/
        private needsToWaitForConfirmation;
        /** uživatelský požadavek na přerušení hromadného vyřízení */
        private userRequestedCancel;
        /** neúspěšně vyřízené soubory */
        private fail;
        /*** pořadí vyřízení (podepsání) žádosti na klientovi */
        private clientIndex;
        /** list vyřízených žádostí na serveru */
        private tempFinishStack;
        /** příznak hromadného vyřízení */
        private multi;
        /**
         * předané data vyřizované žádosti
         * - braná v potaz pouze u single vyřízení z důvodů předání informací pro inicializaci kategorií důvodu podpisu
         */
        private ktgRow;
        /**
         * konstruktor
         */
        constructor(opt: ISettlement);
        run(list: Wfl.Interface.GEpkCompleteConfigDto[]): JQuery.Promise<any, any, any>;
        /**
         * vyřízení na straně klienta
         */
        private clientSettlement;
        /**
         * vyřízení na straně serveru
         */
        private serverSettlement;
        /**
         * obecná inicializace vyřízení
         */
        private init;
        private signer;
        private initKtgDto;
        /**
          * Inicializace podepisovacího objektu
          * po inicializace kategorií důvodu podpisu
          * thazmuka (19.10.2021)
          * */
        private initSignObject;
        /**
         * zobraz dialogu důvodů vyřízení
         * @param list list complete configů
         * @returns
         */
        private showDuvodVyrizeniDlg;
        /**
         * ukaž výsledek hromadného vyřízení (vyhodnocení, které soubory se úspěšně/neúspěšně vyřídily a dle toho zobrazit flash)
         */
        private showResult;
        /**
         * přerušení vyřízení uživatelem
         */
        private isUserRequestedCancel;
        /**
        * nastavení logu
        * @param name název
        * @param ixp identifikátor žádosti
        * @param typPozadavku typ požadavku
        */
        private setLog;
        /**
         * hromadná validace, jestli je co podepisovat
         */
        private validationListSign;
        /**
         * hromadná validace, jestli je co podepisovat
         */
        private validationRowSign;
    }
}
declare namespace Gordic.Epk.WebControls.Vyrizeni {
    interface ISignerCustomDto extends IGCustomDto {
        Ixp: string;
        SerCisloEpk: number;
        Ixb: string;
        guid: string;
        ixsUlo: string;
        ElDocumentType: Wfl.Interface.TypElpEpxEnum;
        MultiSettlement: boolean;
        async: boolean;
        fileName: string;
    }
    class Signer {
        private settlementServiceContent;
        private async;
        /**
         * konstruktor
         * @param cnt parent content
         */
        constructor(cnt: GContent, async?: number | null);
        /**
         * podepsat v epk
         */
        sign(configsToSign: Wfl.Interface.GEpkSignConfigDto[] | null | undefined, customConfig: GEpkSignOpt, signer: GEpkSigner, certInfo: CertInfo, glog?: Wfl.WebClient.GSettlementLog): JQuery.Promise<any, any, any>;
        /**
         * vyvolání delegátu pro umístění podpisu (zavolán před podepsáním)
         */
        finalizeConfigDelegate(_cnt: any, signer: GEpkSigner, MultiSettlement: boolean, customLogger?: Gordic.Diagnostics.GLog): void;
        private checkBeforeSignPlacing;
        private checkAfterSignPlacing;
    }
}
declare namespace Gordic.Epk.WebControls.Vyrizeni {
    class SignerUkr {
        private settlementServiceContent;
        /**
         * konstruktor
         * @param cnt parent content
         */
        constructor(cnt: GContent);
        sign(configsToSign: Wfl.Interface.GEpkSignConfigDto[], gcontent: GContent<any>): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Epk.WebControls {
    interface IUpresnitVyrizeniFormEpk {
        /** gcontent */
        cnt: GContentType<GEpkDbParamsNew>;
        /** funkční místo ze session */
        sessionIxsFunFlag: boolean;
        /** hodnota čas. razítka ze šablony (-1 = nenastaveno, 0 = NE, 1  = ANO) */
        sablonaCasRazitko: number;
        /** data žádosti */
        row: Gordic.Wfl.Interface.GPodpisovaKnihaDto | null;
    }
    class UpresnitVyrizeniFormEpk {
        private stringSuffix;
        private setVyriditButtons;
        /**
         * vytvořit formulář upřesnění vyřízení
         */
        create(opt: IUpresnitVyrizeniFormEpk): JQuery<HTMLElement>;
        /** nastavení stavů v sekci  */
        private setStatesSection;
        /**
         * nasetovaní dat do formuláře
         */
        setDataToForm(gcontent: GContent & GEpkDbParamsNew, modalWindow: JQuery<HTMLElement>): void;
    }
}
declare namespace Gordic.Epk.WebControls.Vyrizeni {
    class VyberCertifikatu {
        constructor(signer: Gordic.Epk.WebControls.GEpkSigner);
        private signer;
        /**
         * výběr a kontrola certifikátu
         */
        select(ixsDpo: string): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        checkNeedsToWaitForConfirmation(certInfo: Gordic.Wfl.Interface.CertInfo): boolean;
        /**
         * výběr certifikátu s pinem
         *          */
        private selectWflCertificate;
        /**
         * kontrola otisku certifikátu
         */
        private checkCert;
        private checkWflCertificate;
    }
}
declare namespace Gordic.Epk.WebControls {
    /** třída posouzení v epk */
    class PosouzeniEpk {
        /**
         * zahájení procesu předání "K posouzení" / "Dát na vědomí"
         */
        predatKPosouzeniDaniNaVedomi(cnt: GContentType<any>, rows: Gordic.Wfl.Interface.GPodpisovaKnihaDto[]): JQueryPromise<boolean>;
    }
}
declare namespace Gordic.Epk.WebControls.Vyrizeni {
    interface IGReasonResponseEpkAsync extends IGReasonResponse {
        /** prodloužený text chyby */
        reasonlong?: string;
    }
    interface NotificationParams {
        ixp: string;
        serCislo: number;
        typPozadavku: Gordic.Wfl.Interface.TypPozadavkuEpk;
        zpusobVyrizeni: Gordic.Wfl.Interface.GWflczpvEnum;
    }
    class AsyncNotification {
        constructor();
        /** objekt notifikace */
        private notObs;
        /** název skupiny */
        private group;
        /** performanceStart */
        private performanceStart;
        /**
         * spuštění upozornění na async. operaci
         */
        beginOperation(ixp: string, idNotification: string): void;
        /**
         * update/ukonření progressu upozornění na asynchronní operaci
         * - je nutno volat až po metodě beginOperation(opt)
         * - !! nutno zadat ID
         */
        progressOperation(id: string, opt: IGNotificationOptions, end?: boolean | null, needsToWaitForConfirmation?: boolean): void;
        /**
         * ukončení (nutno volat na konci)
         * - !! nutno zadat ID
         */
        endOperation(state: "success" | "error", id: string, params: NotificationParams | null, reasonResponse?: IGReasonResponseEpkAsync | null | {
            reason: string;
            type?: number;
            reasonlong?: string;
        }, glog?: Wfl.WebClient.GSettlementLog): void;
        /**
         * zavolání samotatné operace
         */
        runOnlyOperation(state: "success" | "error", params: NotificationParams, reasonResponse?: IGReasonResponseEpkAsync | null | {
            reason: string;
            type?: number;
            reasonlong?: string;
        }, glog?: Wfl.WebClient.GSettlementLog): void;
        private getTypPozadPod;
        private setEndParams;
    }
}
declare namespace Gordic.Epk.WebControls {
    interface GEpkSignOpt {
        casoveRazitko: boolean;
        serCisloEpk: number;
        async?: number;
    }
    interface IEpkAttachFileInfo {
        Ixp: string;
        Guid: string;
        Filename: string;
        TxtTitulek: string;
        TxtPopis: string;
    }
    /** parametry k vyřízení v EPK */
    interface IVyrizeniEpkParams {
        /** identifikátor dokumentu */
        ixp: string;
        /** ser. číslo dokumentu */
        serCislo: number;
        /** šablona elektronických podpisů */
        ixsDpo: string;
        /** typ požadavku žádosti */
        typPozadavku: Gordic.Wfl.Interface.TypPozadavkuEpk;
        /** výběr způsobu vyřízení */
        zpusobVyrizeni: Gordic.Wfl.Interface.GWflczpvEnum;
        /** zobrazit dialog důvodu vyřízení (zobrazit či ne) */
        duvodVyrizeni: boolean;
        /** přidat časové razítko k obrazu */
        casoveRazitko: boolean;
        /** přidat časové razítko k přílohám */
        casoveRazitkoPrilohy: boolean;
        /** podepsat obraz */
        podepsatObraz: boolean;
        /** podepsat přílohy */
        podepsatPrilohy: boolean;
        /** provést před podepsáním konverzi */
        predPodepsanimKonvertovat: boolean;
        /** provést konverzi příloh */
        zkonvertovatPrilohy: boolean;
        /** provést podepsání i příloh, které nejsou PDF formátu */
        podepsatPrilohyNePdf: boolean;
        /** informace o certifikátu */
        certInfo?: CertInfo;
        /** připojená soubor k vyřízení */
        attachFileInfo?: IEpkAttachFileInfo | null;
        /** předaný guid GFRM interního formuláře, pokud je k dispozici (19.1.2022) */
        guidGFRM?: string;
    }
    /**
     * zpracuji exception a nevyskočí chybové hlášení
     *
     * @param {any} reason objekt chyby
     * @param {boolean} multiSettlement stav, jestli mam handlovat
     * @param {string} where kde došlo k chybě
     * @returns {string} ttextový popis "chyby"
     */
    function handleException(reason: any, where?: string, multiSettlement?: boolean): string;
    /**
    * zpracuji exception a nevyskočí chybové hlášení (async)
    */
    function handleExceptionAsync(exceptionResult?: any, where?: string, handled?: boolean): {
        baseMessage: string;
        longMessage: string;
    };
}
