declare namespace Gordic.Pam.WebClient {
    /**
     * Uživatelské nastavení modulu
     * @author  ZMOLIK
     * @date    26.09.2018
     */
    function AppSettings(): Forms.Form;
}
declare namespace Gordic.Pam.WebClient {
    class MainApp extends GContentBase {
        onContentReady(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GCiselniky extends GContentBase {
        readonly taskId = "ulohaAdministraceCiselniky";
        private titulek;
        private rokobdmzdy;
        private gridSeznam;
        static NazvyAkci: {
            CiselnikyObcerstvit: string;
            CiselnikyZobrazitDetail: string;
        };
        onContentReady(): void;
        /**
         * Sloupce seznamu
         */
        private seznamGridFormat;
        private seznamDataView;
        /**
         * Vytvoří akce
         */
        private vytvorAkce;
        /**
        * Vytvoření menubaru
        */
        vytvorBar(): void;
        /**
        * Kontextové menu řádku
        * @param {IGGridCellContext<Gordic.Pam.Interface.GStromUzelDto>} _cellContext
        * @returns {MenuParams[]}
        */
        kontextoveMenu(_cellContext: IGGridCellContext<Gordic.Pam.Interface.GPamtpomDto>): MenuParams[];
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GCiselnikyDetail extends GContentBase {
        readonly taskId = "ulohaAdministraceCiselnikyDetail";
        private ciselnikDto;
        private idCiselniku;
        private rokObdMzdy;
        private ixstks;
        private pouzePlatne;
        private titulek;
        private gridDetail;
        onContentReady(): void;
        private ziskejData;
        private detailGridFormat;
        private detailGridFormat2;
        /** Třídění výchozího profilu pro daný číselník */
        trideniVychozihoProfilu(): GridProfile<Interface.GPamtpomDto> | undefined;
        /** Profily pro daný číselník */
        profily(): GridProfile<Interface.GPamtpomDto>[] | undefined;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GCiziUcty extends GContentBase {
        readonly taskId = "ulohaAdministraceCiziUcty";
        private titulek;
        private seznamCiziUcty;
        private ico;
        private rokobdmzdy;
        private urovenAdm;
        private urovenAdmTxt;
        private ucs;
        private uus;
        private nks;
        private ixsUci;
        private pouzePlatne;
        private typVazby;
        protected validators: any;
        static NazvyAkci: {
            Novy: string;
            Editovat: string;
            Odstranit: string;
            Aktualizovat: string;
            ZmenaRadku: string;
        };
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
        zrusitBar(): void;
        private ziskejData;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GKalendarDetail extends GContentBase {
        readonly taskId = "ulohaAdministraceKalendare";
        private titulek;
        private rokobdmzdy;
        private kalendarElement;
        private kalendarHlavickaDto;
        private datumVybrane;
        private formDialog;
        private ixsKal;
        private nazev;
        private poc_hodin_kr;
        private dat_od;
        private dat_do;
        private filters;
        private seznamDnyKalendare;
        static NazvyAkci: {
            EditovatDen: string;
            Refresh: string;
        };
        private readonly logger;
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
        /** převod pole HH:MM na číslo a zpět*/
        modelValueTransformHHMM: {
            apply: (modelValue: number) => string;
            collect: (fieldValue: string) => number;
        };
        private ziskejData;
    }
}
declare namespace Gordic.Pam.WebClient.GKalendarFun {
    /** Zobrazí kalendář s událostmi (dny pracovní, nepracovní a svátky)
     *  @param {GContent} cnt kontext
     *  @param {JQuery<HTMLElement>} contentDiv element, ke kterému se připojuje výsledný kalendář
     *  @param {Interface.GKalendarHlavickaDto} kalendarHlavickaDto DTO s daty hlavičky kalendáře
     *  @param {Pam.Interface.GKalPracHodPerDto[]} planPeriodyDtos? pole DTO s plánem dnů periody (nepovinné)
     */
    function zobrazKalendar(cnt: GContent, contentDiv: JQuery<HTMLElement>, kalendarHlavickaDto: Interface.GKalendarHlavickaDto, planPeriodyDtos?: Pam.Interface.GKalPracHodPerDto[]): JQueryPromise<JQuery<HTMLElement>>;
    /** Plán kalendáře (nového nebo existujícího) */
    function planKalendare(kalendarHlavickaDto: Pam.Interface.GKalendarHlavickaDto): JQueryPromise<Pam.Interface.GKalPracHodPerDto[]>;
    /** převod čísla z hodin a minut (HOD_MIN = (HOD * 60) + MIN) na řetězec HH:MM*/
    function numtoHHMM(hodMinNum: number): string;
    /** převod čísla z řetězce HH:MM na číslo HOD_MIN = (HOD * 60) + MIN */
    function HHMMtonum(hhmm: string): number;
    /**
     * Vytvoří pole dnů pro uložení dnů kalendáře podle jedné periody (planKalendare).
     * Perioda začíná v dat_per_poc, generuje se od dat_plan_od do dat_plan_do.
     * Každý den je určen podle cyklického plánu periody (pracovní/nepracovní, počet hodin).
     * Algoritmus je ověřen na:
     *  - dat_per_poc: 30.12.2024
     *  - dat_plan_od: 1.1.2025
     *  - dat_plan_do: 31.12.2025
     *  - perioda: [8,8,8,8,8,0,0]
     */
    function dnyKalendareProUlozeni(kalendarHlavickaDto: Pam.Interface.GKalendarHlavickaDto, planKalendare: Pam.Interface.GKalPracHodPerDto[]): Pam.Interface.GKalendarDenDto[];
    /** oříznutí datumu o časovou zónu */
    const dateWithoutTimezone: (date: Date) => string;
}
declare namespace Gordic.Pam.WebClient {
    enum GKalendarTypDneEnum {
        /** pracovní */
        Pracovni = 0,
        /** nepracovní */
        Nepracovni = 1,
        /** svátek */
        Svatek = 2
    }
    class GKalendarPruvodce extends GContentBase {
        readonly taskId = "ulohaAdministraceKalendarePruvodce";
        private titulek;
        private rokobdmzdy;
        protected validators: any;
        private kalendarHlavickaDto;
        private ixsKal;
        private nazev;
        private planPeriodyDtos;
        private viewPlanPeriody;
        private form;
        private gridPlanPeriody;
        private odx;
        private datumZacatekRoku;
        private datumKonceRoku;
        private datumZacatekTydne;
        static NazvyAkci: {};
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
        zrusitBar(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GKalendare extends GContentBase {
        readonly taskId = "ulohaAdministraceKalendare";
        private titulek;
        private seznamKalendare;
        private ixsKal;
        private rokobdmzdy;
        protected validators: any;
        static NazvyAkci: {
            akceKalendarNovy: string;
            akceKalendarEditovat: string;
            akceKalendarOdstranit: string;
            akceKalendarAktualizovat: string;
            akceKalendarDnyKalendare: string;
        };
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
        zrusitBar(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GKontroly extends GContentBase {
        readonly taskId = "ulohaAdministraceKontroly";
        private seznamKontroly;
        protected validators: any;
        static NazvyAkci: {
            akceKontrolaNovy: string;
            akceKontrolaEditovat: string;
            akceKontrolaOdstranit: string;
            akceKontrolaAktualizovat: string;
            akceKontrolaZmenaRadku: string;
            akceKontrolaKrokyZobrazit: string;
        };
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GKontrolyKroky extends GContentBase {
        readonly taskId = "ulohaAdministraceKontrolyKroky";
        private seznamKontrolaKrok;
        private ixsKch;
        private dto;
        private readonly pam_rad_aktko;
        protected validators: any;
        static NazvyAkci: {
            akceKontrolaKrokZapnout: string;
            akceKontrolaKrokVypnout: string;
            akceKontrolaKrokEditovat: string;
            akceKontrolaKrokAktualizovat: string;
            akceKontrolaKrokZmenaRadku: string;
        };
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
        zrusitBar(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GOdboroveSvazy extends GContentBase {
        readonly taskId = "ulohaAdministraceOdboroveSvazy";
        private titulek;
        private seznam;
        private ixsEsuOdb;
        protected validators: any;
        static NazvyAkci: {
            actOdboroveSvazyNovy: string;
            actOdboroveSvazyEditovat: string;
            actOdboroveSvazyOdstranit: string;
            actOdboroveSvazyObcerstvit: string;
            actOdboroveSvazyZmenaRadku: string;
        };
        onContentReady(): void;
        private callback;
        /**
         * Vytvoří akce
         */
        private vytvorAkce;
        /**
        * Vytvoření menubaru
        */
        vytvorBar(): void;
        povolAkce(): void;
        editFrmOdboroveSvazy(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GUdajeOrganizace extends GContentBase {
        readonly taskId = "ulohaAdministraceUdajeOrganizace";
        private seznam;
        private ico;
        private ucs;
        private rokobdmzdy;
        private pouzePlatne;
        protected validators: any;
        static NazvyAkci: {
            actUdajeOrganizaceNovy: string;
            actUdajeOrganizaceEditovat: string;
            actUdajeOrganizaceOdstranit: string;
            actUdajeOrganizaceObcerstvit: string;
            actUdajeOrganizaceZmenaRadku: string;
        };
        onContentReady(): void;
        /**
        * Callback po vytvoření formuláře
        * @param {Gordic.Pam.SeznamBase} _seznam SeznamBase
        * @param {GContent} _cnt content
        * @param {GForm} frm formulář
        * @param {IPamSeznamBaseCommand} cmd, příkaz, který se vykonává INSERT, UPDATE ...
        * @param {any} data získaná pomocí waitForValues
        * @returns objekt s transformovanými daty
        */
        private onOpenFrm;
        /**
         * Transformuje data z formuláře na DTO pro operace se serverem.
         *
         * @param {Gordic.Pam.SeznamBase} _seznam Instance seznamu, ke kterému se operace vztahuje.
         * @param {Object} dataFormulare Data získaná z formuláře, která budou transformována.
         * @param {Object} _serverData Dodatečná data ze serveru (nepoužito).
         * @param {string} cmd Typ akce (např. "INSERT", "UPDATE", "DELETE", "KONTROLA").
         * @returns {Gordic.Pam.Interface.GUdajeOrganizaceDto} Transformovaný DTO objekt
         */
        private transformDto;
        /**
         * Vytvoří akce
         */
        private vytvorAkce;
        /**
        * Vytvoření menubaru
        */
        vytvorBar(): void;
        povolAkce(): void;
        editFrmUdajeOrganizace(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GVlastniUcty extends GContentBase {
        readonly taskId = "ulohaAdministraceVlastniUcty";
        private titulek;
        private seznamVlastniUcty;
        private ico;
        private rokobdmzdy;
        private urovenAdm;
        private urovenAdmTxt;
        private ucs;
        private uus;
        private nks;
        private ixsUvl;
        private pouzePlatne;
        protected validators: any;
        static NazvyAkci: {
            Novy: string;
            Editovat: string;
            Odstranit: string;
            Aktualizovat: string;
            ZmenaRadku: string;
        };
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
        zrusitBar(): void;
        private ziskejData;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GZdravotniPojistovnyPAM extends GContentBase {
        readonly taskId = "ulohaAdministraceZdravotniPojistovny";
        private titulek;
        private seznam;
        private kodZdravPoj;
        protected validators: any;
        static NazvyAkci: {
            actZdravotniPojistovnyPAMNovy: string;
            actZdravotniPojistovnyPAMEditovat: string;
            actZdravotniPojistovnyPAMOdstranit: string;
            actZdravotniPojistovnyPAMObcerstvit: string;
            actZdravotniPojistovnyPAMZmenaRadku: string;
        };
        onContentReady(): void;
        private callback;
        /**
         * Vytvoří akce
         */
        private vytvorAkce;
        /**
        * Vytvoření menubaru
        */
        vytvorBar(): void;
        povolAkce(): void;
        ixs_esu_zp(): string;
        editFrmZdravotniPojistovnyPAM(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GAktPrehled extends GContentBase {
        private formular;
        private grid;
        onContentReady(): Promise<void>;
        /**
        * Sestavení akcí
        */
        private vytvorAkce;
        /**
        * Vytvoření menu baru
       * */
        vytvorBar(): void;
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    /**
     * Seznam eneschopenek
     *
     * @author Jan Kokeš
     * @since 526.1.0.1
     */
    class GENeschopenky extends GContentBase {
        private grid;
        private filterForm;
        private previewController;
        private kontextoveMenu;
        private seznamNacten;
        private cfSeznam;
        private view;
        private defProfileStr;
        private implDto;
        private jeRPN;
        private readonly pam_servis_wk;
        private povolenaVS;
        private RokObdMzdy;
        private readonly TiskSpr;
        private readonly Rok;
        onContentReady(): void;
        private zobrazDetail;
        private novaPolozka;
        private vratPidy;
        private vratErrorStavy;
        private pripravaTiskuSestavy;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GDashboard extends GContentBase {
        readonly taskId = "taskDashboard";
        private readonly Rokobdmzdy;
        private viewDashboard;
        private dashboard;
        static TRACER: Diagnostics.GLog;
        private _TR;
        static NazvyAkci: {
            Refresh: string;
        };
        static TypInfoPanelOdkaz: {
            tipoNic: number;
            tipoESU: number;
            tipoPPV: number;
        };
        onContentReady(): void;
        CreateViewStatistiky(dataRaw: Gordic.Pam.Interface.GPamtpomDto[]): Gordic.Data.View;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GDetailOsoby extends GContentBase {
        private readonly pam_servis_wk;
        private readonly pam_rad_obperhv;
        private readonly pam_rad_obsodhv;
        private readonly pam_rad_obozphv;
        private readonly pam_rad_obadohv;
        private readonly pam_rad_obtslhv;
        private readonly pam_rad_obmzmhv;
        private readonly pam_rad_obzzdhv;
        private readonly pam_rad_obpruhv;
        private readonly pam_rad_prdozpe;
        private readonly pam_rad_obexohv;
        private readonly pam_rad_vypochr;
        private zobrazitNuloveRozdilove;
        static TRACER: Diagnostics.GLog;
        private _TR;
        static NazvyTabu: {
            tabmanagerESU: string;
            groupPPVSeznam: string;
            groupOsobniUdaje: string;
            groupDaneOdpocty: string;
            groupPojisteni: string;
            groupPersonalniUdaje: string;
            groupDuchodySeznam: string;
            groupAdresy: string;
            groupZdaneni: string;
            groupExekuceSeznam: string;
            groupProtokolVypoctuSrazek: string;
            tabmanagerPPV: string;
            groupTrvalaSlozka: string;
            groupSrazka: string;
            groupMesicniZmena: string;
            groupVypoctenaSlozka: string;
            groupPrumerPodklad: string;
            groupPrumer: string;
            groupPrumerVypocteny: string;
            groupPrumerZapsany: string;
            groupNastaveniMesice: string;
            groupNzzn: string;
            groupRozsirujiciUdajePpv: string;
            tabmanagerExekuce: string;
            groupExekuceNavazaneOsoby: string;
            groupExekuceUrcenaNezabavitelnaCastka: string;
            groupExekuceNesplaceneCastky: string;
            tabmanagerDuchody: string;
            groupDuchodyZastaveniVyplaty: string;
        };
        static NazvyAkci: {
            SeznamPpvRefresh: string;
            TiskOsoba: string;
            VypocetVyuctovani: string;
            VypocetZalohy: string;
            Prumery: string;
            VypocitatPrumery: string;
            ZapsatPrumery: string;
            RocniZuctovaniDane: string;
            VypocitatRocniZuctovaniDane: string;
            ZapsatRocniZuctovaniDane: string;
            Kontroly: string;
            OtevriExterniSubjekt: string;
            HistorieEsu: string;
            OsobaPredchozi: string;
            OsobaNasledujici: string;
            OsobaAktualizovat: string;
            OsobaOdemknutiZamkuVypoctu: string;
            ZobrazitSeznamPlateb: string;
            OsobniUdajeRefresh: string;
            OdpocetMesicniHistorie: string;
            OdpocetMesicniVynuceneDatumKonce: string;
            OdpocetMesicniRefresh: string;
            OdpocetMesicniInsert: string;
            OdpocetMesicniUpdate: string;
            OdpocetMesicniDelete: string;
            OdpocetMesicniChangeRow: string;
            OdpocetMesicniPouzePlatne: string;
            OdpocetRocniRefresh: string;
            OdpocetRocniInsert: string;
            OdpocetRocniUpdate: string;
            OdpocetRocniDelete: string;
            OdpocetRocniChangeRow: string;
            OdpocetRocniPouzePlatne: string;
            ZdravotniPojisteniHistorie: string;
            ZdravotniPojisteniRefresh: string;
            ZdravotniPojisteniInsert: string;
            ZdravotniPojisteniUpdate: string;
            ZdravotniPojisteniDelete: string;
            ZdravotniPojisteniChangeRow: string;
            ZdravotniPojisteniPouzePlatne: string;
            PersonalniUdajeHistorie: string;
            PersonalniUdajeRefresh: string;
            PersonalniUdajeInsert: string;
            PersonalniUdajeUpdate: string;
            PersonalniUdajeDelete: string;
            PersonalniUdajeChangeRow: string;
            PersonalniUdajePouzePlatne: string;
            DuchodHistorie: string;
            DuchodRefresh: string;
            DuchodInsert: string;
            DuchodUpdate: string;
            DuchodDelete: string;
            DuchodChangeRow: string;
            DuchodPouzePlatne: string;
            DuchodZastaveniVyplatyHistorie: string;
            DuchodZastaveniVyplatyRefresh: string;
            DuchodZastaveniVyplatyInsert: string;
            DuchodZastaveniVyplatyUpdate: string;
            DuchodZastaveniVyplatyDelete: string;
            DuchodZastaveniVyplatyChangeRow: string;
            DuchodZastaveniVyplatyPouzePlatne: string;
            AdresaHistorie: string;
            AdresaRefresh: string;
            AdresaInsert: string;
            AdresaUpdate: string;
            AdresaDelete: string;
            AdresaChangeRow: string;
            AdresaPouzePlatne: string;
            ZpusobZdaneniHistorie: string;
            ZpusobZdaneniRefresh: string;
            ZpusobZdaneniInsert: string;
            ZpusobZdaneniUpdate: string;
            ZpusobZdaneniDelete: string;
            ZpusobZdaneniChangeRow: string;
            ZpusobZdaneniPouzePlatne: string;
            ZpusobZdaneniKorekceHistorie: string;
            ZpusobZdaneniKorekceRefresh: string;
            ZpusobZdaneniKorekceInsert: string;
            ZpusobZdaneniKorekceUpdate: string;
            ZpusobZdaneniKorekceDelete: string;
            ZpusobZdaneniKorekceChangeRow: string;
            ZpusobZdaneniKorekcePouzePlatne: string;
            ExekuceHistorie: string;
            ExekuceRefresh: string;
            ExekuceInsert: string;
            ExekuceUpdate: string;
            ExekuceDelete: string;
            ExekuceChangeRow: string;
            ExekucePouzePlatne: string;
            ExekuceHistorieSplaceni: string;
            ExekuceNavazaneOsobyHistorie: string;
            ExekuceNavazaneOsobyRefresh: string;
            ExekuceNavazaneOsobyInsert: string;
            ExekuceNavazaneOsobyUpdate: string;
            ExekuceNavazaneOsobyDelete: string;
            ExekuceNavazaneOsobyChangeRow: string;
            ExekuceNavazaneOsobyPouzePlatne: string;
            ExekuceUrcenaNezabavitelnaCastkaRefresh: string;
            ExekuceUrcenaNezabavitelnaCastkaInsert: string;
            ExekuceUrcenaNezabavitelnaCastkaUpdate: string;
            ExekuceUrcenaNezabavitelnaCastkaDelete: string;
            ExekuceUrcenaNezabavitelnaCastkaChangeRow: string;
            ExekuceUrcenaNezabavitelnaCastkaPouzePlatne: string;
            ExekuceNesplaceneCastkyRefresh: string;
            ProtokolVypoctuSrazekRefresh: string;
            PpvNovy: string;
            PpvEditovat: string;
            PpvSmazat: string;
            PpvZmeny: string;
            PpvZmenyZP: string;
            PpvZmenySP: string;
            PpvChangeRow: string;
            PpvNastavitPoznamku: string;
            PpvVynutitVyplatkovy: string;
            PpvZrusitVyplatkovy: string;
            PpvHistorie: string;
            PpvNastavKod: string;
            PpvPrepocetPHV: string;
            PpvPouzePlatne: string;
            PpvTisk: string;
            PpvNahled: string;
            PpvRozvrzeniPracovniDobyNeurceno: string;
            PpvRozvrzeniPracovniDobyRovnomerne: string;
            PpvRozvrzeniPracovniDobyNerovnomerne: string;
            TrvalaSlozkaHistorie: string;
            TrvalaSlozkaRefresh: string;
            TrvalaSlozkaInsert: string;
            TrvalaSlozkaUpdate: string;
            TrvalaSlozkaDelete: string;
            TrvalaSlozkaChangeRow: string;
            TrvalaSlozkaHistorieVyplaceni: string;
            TrvalaSlozkaUcetniProfil: string;
            TrvalaSlozkaVynuceneDatumKonce: string;
            TrvalaSlozkaPouzePlatne: string;
            SrazkaHistorie: string;
            SrazkaRefresh: string;
            SrazkaInsert: string;
            SrazkaUpdate: string;
            SrazkaDelete: string;
            SrazkaChangeRow: string;
            SrazkaHistorieVyplaceni: string;
            SrazkaVynuceneDatumKonce: string;
            SrazkaPouzePlatne: string;
            VypoctenaSlozkaRefresh: string;
            VypoctenaSlozkaDetail: string;
            VypoctenaSlozkaFullScreen: string;
            VypoctenaSlozkaPouzePlatne: string;
            VypoctenaSlozkaZobrazitNuloveRozdiloveSlozky: string;
            VypoctenaSlozkaDetailFs: string;
            PrumerPodkladHistorie: string;
            PrumerPodkladRefresh: string;
            PrumerPodkladInsert: string;
            PrumerPodkladUpdate: string;
            PrumerPodkladDelete: string;
            PrumerPodkladChangeRow: string;
            PrumerPodkladPouzePlatne: string;
            PrumerHistorie: string;
            PrumerRefresh: string;
            PrumerInsert: string;
            PrumerUpdate: string;
            PrumerDelete: string;
            PrumerChangeRow: string;
            PrumerPouzePlatne: string;
            PrumerVypoctenyRefresh: string;
            PrumerVypoctenyPouzePlatne: string;
            PrumerZapsanyRefresh: string;
            PrumerZapsanyPouzePlatne: string;
            NastaveniMesiceRefresh: string;
            NastaveniMesiceHistorieIndKalendare: string;
            NastaveniMesiceFullScreen: string;
            NzznHistorie: string;
            NzznRefresh: string;
            NzznInsert: string;
            NzznUpdate: string;
            NzznDelete: string;
            NzznChangeRow: string;
            NzznPouzePlatne: string;
            NzznDetailHistorie: string;
            NzznDetailRefresh: string;
            NzznDetailInsert: string;
            NzznDetailUpdate: string;
            NzznDetailDelete: string;
            NzznDetailChangeRow: string;
            NzznDetailPouzePlatne: string;
            MesicniZmenaHistorie: string;
            MesicniZmenaRefresh: string;
            MesicniZmenaInsert: string;
            MesicniZmenaUpdate: string;
            MesicniZmenaDelete: string;
            MesicniZmenaChangeRow: string;
            MesicniZmenaUcetniProfil: string;
            MesicniZmenaPouzePlatne: string;
            RozsirujiciUdajePpvHistorie: string;
            RozsirujiciUdajePpvRefresh: string;
            RozsirujiciUdajePpvInsert: string;
            RozsirujiciUdajePpvUpdate: string;
            RozsirujiciUdajePpvDelete: string;
            RozsirujiciUdajePpvChangeRow: string;
            RozsirujiciUdajePpvPouzePlatne: string;
        };
        static NazvyKPI: {
            ESU_Osoba: string;
            ESU_OsobniCislo: string;
            ESU_id: string;
            ESU_RodneCislo: string;
            ESU_DatumNarozeni: string;
            ESU_StavBlokovani: string;
            ESU_StavPrepoctu: string;
            PPV_Druh: string;
            PPV_ZdravotniPojisteni: string;
            PPV_SocialniPojisteni: string;
            PPV_id: string;
            PPV_VysePlatovehoVymeruKDatu: string;
        };
        private taskRunningTxt;
        private Osoba;
        private Lic;
        private Ixsesu;
        private Nastaveni;
        private OtevrenostObdobiPrihlaseni;
        private tabEsu;
        private tabPpv;
        private Rokobdmzdy;
        private Ixsppv;
        private Ixsppv_puv;
        private DruhPpv;
        private ExekucePoradi;
        private DuchodPoradi;
        private NzznPoradi;
        private kpi_esu;
        private kpi_ppv;
        private kpi_nic_txt;
        private tabmanagers_ready;
        private tabmanagerESU;
        private tabmanagerPPV;
        private tabmanagerExekuce;
        private tabmanagerDuchody;
        private ppvSeznamTab;
        private exekuceSeznamTab;
        private duchodySeznamTab;
        private panelDetailPPV;
        private panelDetailPPV_form;
        private panelDetailPPV_loading;
        private _seznamPPV;
        private _seznamOsobniUdaje;
        private _seznamOdpoctyMesicni;
        private _seznamOdpoctyRocni;
        private _seznamPersonalniUdaje;
        private _seznamDuchody;
        private _seznamDuchodyZastaveniVyplaty;
        private _seznamZdravotniPojisteni;
        private _seznamAdresy;
        private _seznamTrvaleSlozky;
        private _seznamSrazky;
        private _seznamVypocteneSlozky;
        private _seznamVypocteneSlozkyFs;
        private _seznamPrumerPodklad;
        private _seznamPrumer;
        private _seznamPrumerVypocteny;
        private _seznamPrumerZapsany;
        private _seznamZpusobZdaneni;
        private _seznamZpusobZdaneniKorekce;
        private _seznamMesicniZmeny;
        private _seznamExekuce;
        private _seznamExekuceNavazaneOsoby;
        private _seznamExekuceUrcenaNezabavitelnaCastka;
        private _seznamExekuceNesplaceneCastky;
        private _seznamProtokolVypoctuSrazek;
        private _seznamPlatbyOsoby;
        private _seznamNzzn;
        private _seznamNzznDetail;
        private _seznamRozsirujiciUdajePpv;
        private static gautofit_level_first;
        private static gautofit_level_first_ppv;
        private static gautofit_level_second_or_dock;
        private CSS_FixTabManager;
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         */
        vytvorAkce(): void;
        /**
         * Editace kódu PPV
         */
        kodPPV(): JQuery<HTMLElement> | undefined;
        /**
        * Editace poznámky
        */
        nastavitPoznamku(): JQuery<HTMLElement> | undefined;
        /**
        * Editace datumu pro výši platového výměru
        */
        nastavitDatumProPlv(): JQuery<HTMLElement> | undefined;
        /**
         * Výpočet ročního průměrného hodinového výdělku
         */
        prepocetPHV(): JQuery<HTMLElement>;
        /**
         * Vytvoření menubaru
         */
        vytvorBar(): void;
        VytvorKPI_ESU(data: Gordic.Pam.Interface.GOsobaPamDto | null): void;
        /**
         * Aktualizuje panel KPI Stav přepočtu pro vybranou osobu (ESU).
         * Metoda nastaví nebo vymaže hodnoty KPI podle zadaných dat osoby.
         *
         * @param {Gordic.Pam.Interface.GOsobaPamDto | null} data Data osoby (ESU), která se má zobrazit v panelu KPI. Pokud je null, panel se vyprázdní.
         */
        RefreshKPI_ESU_StavPrepoctu(data: Gordic.Pam.Interface.GOsobaPamDto | null): void;
        VytvorKPI_PPV(element: JQuery<HTMLElement>): void;
        RefreshKPI_PPV(data: Gordic.Pam.Interface.GHlavickaPPVDto | null): void;
        /**
         * Contextové menu nad řádkem PPV
         * @param cellContext
         */
        contextMenuPpv(cellContext: IGGridCellContext<Gordic.Pam.Interface.GHlavickaPPVDto>): MenuParams[];
        /**
         * Povolení akcí na základě přístupových parametrů a stavu dat
         */
        povolAkce(): void;
        /**
         * Vytvoření tabu PPV
         */
        VytvorPPVTab(): JQuery.Promise<any, any, any>;
        /**
        * Vytvoření tabu Osobní údaje
        */
        VytvorOsobniUdajeTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Pojištění
         */
        VytvorPojisteniTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Daně - odpočty
         */
        VytvorDaneOdpoctyTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Personální údaje
         */
        VytvorPersonalniUdajeTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Důchody
         */
        VytvorDuchodyTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Zastavení výplaty důchodu
         */
        VytvorDuchodyZastaveniVyplatyTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Adresy
         */
        VytvorAdresyTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Exekuce
         */
        VytvorExekuceTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Exekuce - navázané osoby
         */
        VytvorExekuceNavazaneOsobyTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Exekuce - nezabavitelná částka exekuce
         */
        VytvorExekuceUrcenaNezabavitelnaCastkaTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Exekuce - nesplacené částky exekuce
         */
        VytvorExekuceNesplaceneCastkyTab(): JQuery.Promise<any, any, any>;
        /**
        * Vytvoření tabu Protokol výpočtu srážek
        */
        VytvorProtokolVypoctuSrazekTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Složky zadané
         */
        VytvorTrvaleSlozkyTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Srážky
         */
        VytvorSrazkyTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Měsíční změny
         */
        VytvorMesicniZmenyTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Vypočtené složky
         */
        VytvorVypocteneSlozkyTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Podklady průměrů
         */
        VytvorPrumerPodkladTab(): JQuery.Promise<any, any, any>;
        /**
        * Vytvoření tabu Průměry
        */
        VytvorPrumerTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Vypočtené průměry
         */
        VytvorPrumerVypoctenyTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Zapsané průměry
         */
        VytvorPrumerZapsanyTab(): JQuery.Promise<any, any, any>;
        /**
        * Vytvoření tabu Nastaveni měsíce
        */
        VytvorNastaveniMesiceTab(): JQuery.Promise<any, any, any>;
        /**
        * Vytvoření tabu NZŽN
        */
        VytvorNzznTab(): JQuery.Promise<any, any, any>;
        /**
        * Vytvoření tabu Rozšiřující údaje k PPV
        */
        VytvorRozsirujiciUdajePpvTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabu Zdanění
         */
        VytvorZdaneniTab(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření tabmanageru pro exekuce
         * */
        VytvorTabManagerExekuce(): void;
        /**
        * Vytvoření tabmanageru pro důchody
        */
        VytvorTabManagerDuchody(): void;
        /**
         * Vytvoření tabmanageru pro ESU
         * */
        VytvorTabManagerESU(): void;
        /**
         * Vytvoření tabmanageru pro PPV
         * */
        VytvorTabManagerPPV(): void;
        /**
         * Vytvoření seznam PPV
         * @returns
         */
        sestavSeznamPPV(): JQuery.Promise<any, any, any>;
        /**
         * Vytvoření základních seznamů - ESU
         *
         */
        private VytvorSeznamyEsu;
        /**
         * Vytvoření základních seznamů - PPV
         *
         */
        private VytvorSeznamyPPV;
        /** Vyzvednutí hodnoty zatržítek z uživatelského nastavení*/
        private VyzvedniNastaveni;
    }
}
declare namespace Gordic.Pam.WebClient {
    type NazevAkce = typeof GDetailPpv.NazvyAkci[keyof typeof GDetailPpv.NazvyAkci];
    class GDetailPpv extends GContentBase {
        private readonly pam_rad_plnisab;
        private readonly pam_rad_mise;
        private readonly pam_rad_ukoly;
        private readonly pam_rad_obdoh;
        private readonly pam_rad_obdohhv;
        private readonly pam_rad_cviceni;
        private panelPracovniDoba;
        private panelPrumery;
        private panelZmenyZp;
        private panelZmenySp;
        private panelZmenyZp_loading;
        private panelZmenySp_loading;
        private panelPoznamky;
        private Lic;
        private hlavickaPPV;
        private Ixsesu;
        private Ixsppv;
        private Ixsppv_puv;
        private Rokobdmzdy;
        private IxsMis;
        private datPlatOd;
        private kpiItems;
        private NavigateTab;
        private Nastaveni;
        private viewZP;
        private radekZP;
        private viewSP;
        private radekSP;
        private viewZmeny;
        private radekZmeny;
        private radekZmeny_ready;
        private detailTab;
        private zmenyTab;
        private zmenyGrid;
        private zmenyZPTab;
        private zmenyZPGrid;
        private zmenySPTab;
        private zmenySPGrid;
        private akcNova;
        private akcUlozit;
        private akcOdstranit;
        private tabmanagers_ready;
        private divTabManager;
        private divTaby;
        private seznamPrumery;
        private seznamVyneti;
        private seznamProjekty;
        private seznamCviceni;
        private seznamMise;
        private seznamMiseZmeny;
        private seznamDohody;
        private povolenaZmenaFormulareDleSablony;
        static TRACER: Diagnostics.GLog;
        private _TR;
        static NazvyTabu: {
            tabPPVDetail: string;
            tabZmeny: string;
            tabVyneti: string;
            tabProjekty: string;
            tabCviceni: string;
            tabMise: string;
            tabDohody: string;
            tabZdravotniPojisteni: string;
            tabSocialniPojisteni: string;
        };
        static NazvyPanelu: {
            panelPoznamkyPpv: string;
            panelPracovniDoba: string;
            panelPrumery: string;
            panelZmenyZp: string;
            panelZmenySp: string;
        };
        static NazvyAkci: {
            ZpusobyVypoctuZpRefresh: string;
            ZpusobyVypoctuZpPouzePlatne: string;
            ZpusobyVypoctuSpRefresh: string;
            ZpusobyVypoctuSpPouzePlatne: string;
            ZmenyPpvRefresh: string;
            ZmenyPpvPouzePlatne: string;
            ZmenyPpvChangeRow: string;
            ZmenyPpvNova: string;
            ZmenyPpvUlozit: string;
            ZmenyPpvOdstranit: string;
            ZmenyPpvHistorie: string;
            panelPracovniDobaLoad: string;
            panelPrumeryLoad: string;
            panelPrumeryRefresh: string;
            VynetiRefresh: string;
            VynetiPouzePlatne: string;
            VynetiChangeRow: string;
            VynetiInsert: string;
            VynetiUpdate: string;
            VynetiDelete: string;
            VynetiHistorie: string;
            ProjektyRefresh: string;
            ProjektyChangeRow: string;
            ProjektyInsert: string;
            ProjektyUpdate: string;
            ProjektyDelete: string;
            CviceniRefresh: string;
            CviceniPouzePlatne: string;
            CviceniChangeRow: string;
            MiseRefresh: string;
            MiseChangeRow: string;
            MisePouzePlatne: string;
            MiseHistorie: string;
            MiseZmenyRefresh: string;
            MiseZmenyPouzePlatne: string;
            MiseZmenyChangeRow: string;
            DohodyRefresh: string;
            DohodyPouzePlatne: string;
            DohodyChangeRow: string;
            DohodyHistorie: string;
        };
        onContentReady(): void;
        vytvorAkce(): void;
        /**
        * Uloží změnu a občerství nadřazený grid
        */
        UlozZmenu(dto: Interface.GPpvZmenaDto): void;
        /**
         * Vytvoření bočního panelu
         */
        vytvorPanel(): JQuery.Promise<any, any, any>;
        /**
        * Sestavení KPI items - doplnění akcí do KPI ze serveru
        * @param kpiItems
        * @returns položky pro KPIpanel
        */
        SestavKpiItems(kpiItems: Gordic.Pam.Interface.GPAMKpiItemDto[]): GObservableObject<GKpiItemOptions>[];
        /**
        * Vytvoření menubaru
        */
        vytvorBar(): void;
        /**
         * Vytvoření seznamů
         */
        vytvorSeznamy(): void;
        /**
        * Vytvoření tabmanageru
        */
        VytvorTabManagerDetailPpv(): void;
        /**
        * Vytvoření tabu Změny
        */
        VytvorZmenyTab(): JQuery.Promise<any, any, any>;
        /**
        * Vytvoření tabu Vynětí
        */
        VytvorVynetiTab(): JQuery.Promise<any, any, any>;
        /**
        * Vytvoření tabu Projekty
        */
        VytvorProjektyTab(): JQuery.Promise<any, any, any>;
        /**
        * Vytvoření tabu Cvičení
        */
        VytvorCviceniTab(): JQuery.Promise<any, any, any>;
        /**
        * Vytvoření tabu Mise
        */
        VytvorMiseTab(): JQuery.Promise<any, any, any>;
        /**
        * Vytvoření tabu Dohody
        */
        VytvorDohodyTab(): JQuery.Promise<any, any, any>;
        /** Vyzvednutí vybraných hodnoty zatržítek z uživatelského nastavení*/
        private VyzvedniNastaveni;
        private getPermission;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GElVyplatky extends GContentBase {
        readonly taskId = "taskElVyplatky";
        readonly Rokobdmzdy: number;
        readonly mnozina: ("PRA" | "ESU" | "ALL");
        readonly PRA: Pam.Interface.GPracovisteDto[];
        readonly ESU: Pam.Interface.GOsobaPamDto[];
        private viewSeznamVyplatek;
        static NazvyAkci: {
            nactiSeznam: string;
            detailOdeslaneVyplatky: string;
        };
        onContentReady(): void;
        /**
         *  Sloupce seznam el. výplatek
         * */
        get sloupceSeznamElVyplatek(): Data.GridFormat;
        /**
         * Sestavení akcí
         */
        private vytvorAkce;
        povolAkce(): void;
        /**
           * Vytvoření menu baru
        * */
        vytvorBar(): void;
        /***
         * Sestavení textu do breadCrumbs podle toho odkud a za co se tiskne
         * */
        breadcrumbsText(): string;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GHromadneAkce extends GContentBase {
        taskId: string;
        readonly seznamDIVname = "seznamDIV";
        readonly SEKVENCNIZPRACOVANI = true;
        private _DtoOsob;
        private _Rokobdmzdy;
        private _pocetCelkem;
        private WARNING_LIMIT;
        private taskRunningTxt;
        private _vyhodnoceno;
        private _StartTime;
        private AkceSetting;
        private seznamKontrol;
        private hlavickaKontroly;
        private isl_results;
        static NazvyAkci: {
            zavriCntAct: string;
            seznamKontrolAktualizovat: string;
            dvojklik: string;
        };
        static NazvyHromadnychAkci: {
            vykonatKontrolyKrok2: string;
        };
        onContentReady(): void;
        /**
        * Atomická akce – přepočet osoby, zápis průměrů apod.
        */
        Akcicka(osoba: Gordic.Pam.Interface.GOsobaPamDto, mainparam: any): Promise<void>;
        /**
        * Spuštění akce za osoby
        */
        spustAkci(): void;
        /**
         * Vyhodnocení spuštěné akce. Vstupem jsou původní data řádku a výsledek akce. Výstupem jsou upravená data pro prezentaci
         * @param {any} oldData Původní neupravený řádek
         * @param {Gordic.Pam.Interface.GSplResultDto | Gordic.Pam.Interface.GPamthodDto[]} result Výsledný řádek akce
         * @returns {any} Nový řádek
         */
        vyhodnotAkci(oldData: Gordic.Pam.Interface.GOsobaPamDto, result: Gordic.Pam.Interface.GSplResultDto | Gordic.Pam.Interface.GPamthodDto[]): any;
        /**
       * Sortprocessor pro sloupec stav , který je odvozen podle gor_err
       * @param direction "ASC" | "DESC" směr řazení
       * @returns
       */
        private SortProcessor_stav;
        /**
         * Inicializace - na základě typu hromadné akce zabezpečí nastavení titulku, spouštěcí služby ....
         * */
        init(): JQuery.Promise<any, any, any>;
        /**
        * Sestavení akcí
        */
        private vytvorAkce;
        /**
          * Vytvoření menu baru
          */
        private vytvorBar;
        povolAkce(): void;
        /**
         * Pokus o opuštění stránky - reaguje na nastavení  this.taskRunningTxt
         * */
        closing(): JQuery.Promise<any, any, any>;
        /**
        * Spuštění a zobrazení souhrnného formuláře pro hromadnou akci.
        * Inicializuje pole pro aktuální stav a dobu běhu, nastaví grid a případně varuje uživatele při větším počtu záznamů.
        * @returns {void}
        */
        private vykonejAkci1;
        /**
         * Spustí a zobrazí seznam kontrol.
         * Dvojklik na vybraném řádku spustí kontrolu nad vybranými osobami.
         * @returns { JQueryPromise<any> } Promise, který je vyřešen po sestavení a zobrazení seznamu kontrol.
         */
        private vykonejAkci2;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GImport extends GContentBase {
        readonly divFaze1 = "divFaze1";
        readonly divFaze2 = "divFaze2";
        readonly divFaze3 = "divFaze3";
        readonly divFaze4 = "divFaze4";
        readonly divFaze5 = "divFaze5";
        private id_import;
        private text;
        private pocet_chyb;
        rok_obd_od: number;
        rok_obd_do: number;
        rekapFrm: Gordic.Forms.Form;
        private fileInfo;
        private Davky;
        private acceptExtension;
        onContentReady(): void;
        breadcrumbsTxt(): string;
        vytvorPruvodce(): void;
        /***
         * Odstranění všech dočasných DIVů
         * */
        private RemoveTmpDivs;
        /**
        * Sestavení gridu - fáze 3 načtení dat do gridu
        * */
        private SestavGridFaze3;
        /**
        * Sestavení gridu - fáze 4 načtení dat do databáze
        * */
        private SestavGridFaze4;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GKnihaDokladu extends GContentBase {
        readonly Title: string;
        readonly taskId = "actKnihaDokladu";
        private filtrDokladu;
        private typDokladu;
        private stavDokl;
        onContentReady(): void;
        NactiSeznamDokladu(): void;
        PrepniTypDokladu(): void;
        PrepniGrid(): void;
        VytvorAkce(): void;
        SestavFilterForm(): Forms.Form;
        TransformujFiltr(filterIn: any): Gordic.Pam.Interface.GDynamickaMaskaDto[];
        SestavRq(): Gordic.Isl.GServiceListRequest;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GKnihaDokladuDetail extends GContentBase {
        readonly taskId = "actKnihaDokladu";
        private jePamspid;
        private jePamshls;
        private jePamddes;
        private jePamdadr;
        private jePamdmzh;
        private jePamsmsz;
        private jePamsnnk;
        private jePamspur;
        private jePamdduv;
        private jePamssml;
        private jePamssmz;
        private jePamszar;
        private jePamszpr;
        private pamspidFrm;
        private pamshlsFrm;
        private pamddesFrm;
        private pamssmlFrm;
        private pamdmzhFrm;
        private pamsmszFrm;
        private pamszprFrm;
        private pamspurFrm;
        private pamdduvFrm;
        private pamszarFrm;
        private pamsnnkFrm;
        private pamdadrFrm;
        private pamssmzFrm;
        private viewSeznamOsobDokladu;
        private viewPersonalniUdaje;
        private viewPlatovyVymer;
        private viewSlozkyPlatovehoVymeru;
        private viewSlozkySoupisky;
        private viewSmlouva;
        private viewZdravotniPojistovna;
        private viewDuchodovyVymer;
        private viewZarazeni;
        private pamspid;
        private pamshls;
        private pamddes;
        private pamssml;
        private pamdmzh;
        private pamsmsz;
        private pamszpr;
        private pamspur;
        private pamdduv;
        private pamszar;
        private pamsnnk;
        private pamdadr;
        private pamssmz;
        readonly Title: string;
        static NazvyAkci: {
            DokladPamPrevzit: string;
            DokladPamZarazeniEdit: string;
        };
        onContentReady(): void;
        vytvorAkce(): void;
        nactiOsobyDokladu(): void;
        prevzitDoklad(): void;
        editFrmPamszarPAM(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GKontrolyDetailPuv extends GContentBase {
        private zobrazovatNeplatneKontrolyDetail;
        onContentReady(): void;
        KontrolyDetail(akce: string): null | undefined;
        vytvorAkce(): void;
        ChangeRow(ev: any, obj: any): void;
        KontrolyDetailSwitchPlatnost(): void;
        get NeplatneKontrolyDetailIcon(): "fa-toggle-on" | "fa-toggle-off";
        get NeplatneKontrolyDetailTooltip(): "Zobrazit vše" | "Zobrazit pouze aktivní KCH";
    }
}
declare namespace Gordic.Pam.WebClient {
    class GKontrolyPuv extends GContentBase {
        readonly taskId = "taskKontroly";
        private seznam;
        static NazvyAkci: {
            kchRunAct: string;
            kchInsertAct: string;
            kchUpdateAct: string;
            kchDeleteAct: string;
            kchChangeRowAct: string;
        };
        onContentReady(): void;
        /**
         *  Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
         * Vytvoření menu baru
         */
        private vytvorBar;
        /**
        * Povolení akcí na základě přístupových parametrů případně servisního hesla
        */
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GNaplneniDat extends GContentBase {
        /**
         * Titulek contentu.
         */
        readonly Title: string;
        readonly taskId = "taskNaplneniDat";
        readonly divVyberName = "vyber";
        id: string;
        text: string;
        rok_obd_od: number;
        rok_obd_do: number;
        frmObdobi: JQuery;
        rekapFrm: Gordic.Forms.Form;
        readonly asyncTaskClass = "Gordic.Pam.Server.GPlneniDatAsync";
        onContentReady(): void;
        vytvorPruvodce(): void;
        TaskStart(guid: string): void;
        TaskChange(task: any): void;
        TaskDone(task: any, result: Gordic.Pam.Interface.GSplResultDto): void;
        TaskFail(o: any, exc: any): void;
        TaskAlways(task: Gordic.Async.IGTask, myGuid: string): void;
        AktualizujRekap(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GSeznamNks extends GContentBase {
        readonly taskId = "ulohaSeznamNks";
        private titulek;
        private seznamNks;
        private ico;
        private rokobdmzdy;
        static NazvyAkci: {
            Aktualizovat: string;
            ZmenaRadku: string;
            SeznamOsob: string;
        };
        onContentReady(): void;
        vytvorAkce(): void;
        vytvorBar(): void;
        zrusitBar(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GSeznamOsob extends GContentBase {
        readonly taskId = "actSeznamOsob";
        private _seznamOsob;
        private _filterValue;
        private AUTOLOAD;
        static NazvyAkci: {
            SeznamOsobDetailAct: string;
            SeznamOsobTiskAct: string;
            prepoctiOsobyAct: string;
            prepoctiZalohyOsobyAct: string;
            kontrolniChodAct: string;
            odemkniSystemovyZamekOsobyAct: string;
            reloadGridSeznamESUAct: string;
            prumeryAct: string;
            vypocitatPrumeryAct: string;
            zapsatPrumeryAct: string;
            rocniZuctovaniDaneAct: string;
            vypocitatRocniZuctovaniDaneAct: string;
            zapsatRocniZuctovaniDaneAct: string;
        };
        onContentReady(): void;
        vykonejKCH(): void;
        /**
         * Formulář pro výběr čtvrtletí
         */
        frmVyberCtvrtleti(): Gordic.Forms.Form;
        /**
         * sestavení formuláře pro filtraci
         */
        get filterForm(): Gordic.Forms.Form;
        /**
         * Transformace filtru pro z vizuální podoby do té zpracovatelné
         * @param zadanyFilter Data sesbíraná z formuláře filtru
         */
        private _TransformujFiltr;
        /**
         * Načtení dat do gridu s pomocí filtru
        * @param zadanyFilter Data sesbíraná z formuláře filtru
         */
        private _reloadGridData;
        /**
         * Aktualizace dat gridu
         * @param {object | null} filterValue Hodnoty z filteru
         * @param {object | null} klice pidy osob, které byly vybrány v gridu
         */
        private _RefreshGrid;
        /**
         */
        private vytvorAkce;
        /**
        * Vytvoření menubaru
        */
        vytvorBar(): void;
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GSeznamPracovist extends GContentBase {
        readonly taskId = "actSeznamPracovist";
        private _seznamPracovist;
        private _filterValue;
        private RokObdMzdy;
        static NazvyAkci: {
            prepoctiOsobyAct: string;
            prepoctiZalohyOsobyAct: string;
            actUzaverkaPracovistAct: string;
            SeznampracovistChangeRowAct: string;
            UcetniProfilAct: string;
            ZobrazSeznamOsobAct: string;
            tiskAct: string;
            Aktualizovat: string;
        };
        onContentReady(): void;
        PidyPra(): (string[] | null);
        /**
         * Vytvoření akcí do actionlistu
         * */
        private vytvorAkce;
        /**
         *  Vyvolání přepočtového dialogu se seznamem osob z více pracovišť
         */
        prepocetOsob(): void;
        /**
        *  Vyvolání výpočtu záloh se seznamem osob z více pracovišť
        */
        prepocetZalohOsob(): void;
        /**
         *  Zavolání uzávěrkového objektu pro vybraná pracoviště
         * */
        private UzaverkaPracovist;
        /**
           * Vytvoření menubaru
        * */
        vytvorBar(): void;
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GTisky extends GContentBase {
        readonly taskId = "taskTisky";
        readonly Rokobdmzdy: number;
        readonly mnozina: ("PRA" | "ESU" | "ALL" | "PPV");
        readonly temata: Pam.Interface.GTiskoveTemaDto[];
        readonly PRA: Pam.Interface.GPracovisteDto[];
        readonly ESU: Pam.Interface.GOsobaPamDto[];
        readonly PPV: Pam.Interface.GHlavickaPPVDto[];
        private readonly jeServis;
        private readonly pam_rad_mmpo010;
        private readonly pam_rad_mmpo011;
        private readonly pam_rad_mmpo012;
        private readonly pam_rad_mmpo016;
        private readonly pam_rad_mmpo017;
        private readonly pam_rad_mmpo018;
        private readonly pam_rad_mmpo019;
        private readonly pam_rad_mmpo022;
        private readonly pam_rad_msoc04u;
        private readonly pam_rad_msoc04o;
        private readonly pam_rad_msoc04r;
        private readonly pam_rad_mpra20o;
        private readonly pam_rad_mpra20r;
        private readonly pam_rad_mmpo028;
        private readonly pam_rad_mmpo029;
        private readonly typInst;
        static NazvyAkci: {
            actTiskKonkretniSestavy: string;
            actTiskTemaVse: string;
            actPampra20Tisk: string;
            actPampra20Xml: string;
            actPampra20Pvs: string;
            actPampra20Reg: string;
            actPamvyd01Tisk: string;
            actPamvyd01Xml: string;
            actPamvyd01Pvs: string;
            actPamvyd01Reg: string;
            actPamnem05Tisk: string;
            actPamnem05Xml: string;
            actPamnem05Pvs: string;
            actPamhzupnTisk: string;
            actPamhzupnXml: string;
            actPamhzupnPvs: string;
            actPamsoc02Tisk: string;
            actPamsoc02Xml: string;
            actPamsoc02Pvs: string;
            actPamsoc02Reg: string;
            actPamsoc03Tisk: string;
            actPamsoc03Xml: string;
            actPamsoc03Pvs: string;
            actPamsoc03Reg: string;
            actPammsoc3Tisk: string;
            actPammsoc3Reg: string;
            actPamsoc04Tisk: string;
            actPamsoc04Xml: string;
            actPamsoc04Pvs: string;
            actPamsoc04Reg: string;
            actPammzdr1Tisk: string;
            actPammzdr1Reg: string;
            actPamzdr01Tisk: string;
            actPamzdr01Xml: string;
            actPamzdr01Pvs: string;
            actPamzdr01Reg: string;
            actPamduch01Tisk: string;
            actPamduch01Xml: string;
            actPamduch01Pvs: string;
            actPamduch02Tisk: string;
            actPamduch02Xml: string;
            actPamduch02Pvs: string;
        };
        onContentReady(): void;
        /**
         * Sestavení akcí
         * Pro každé téma se vytvoří akce s názvem odpovídajícím GINCTEM.tema
         */
        private vytvorAkce;
        /**
         * Přímý tisk sestavy zadané pomocí ixs_alv popř. ixs_alf. Neotevírá se okno se stromem sestav.
         * @param ixsAlv ixs_alv definice sestavy
         * @param ixsAlf ixs_alf formát sestavy
         */
        private vygenerujSestavu;
        /**
        * Sestavení tiskové akce pro konkrétní sestavu - zatím nepoužito (použit přímý tisk sestavy)
        * @param {string} nazevAkce Název akce
        * @param {string} caption Text v menu
        * @param {string} tooltip Text tooltipu
        * @param {string} tema Tiskové téma
        * @param {string} ixsAlv ixs_alv pro omezení nabídky sestav na konkrétní sestavu
        * @param {string} ixsFrm ixs_frm pro omezení na konkrétní formát konkrétní sestavy
        */
        private vytvorAkciTisk;
        povolAkce(): void;
        /**
           * Vytvoření menu baru
        * */
        vytvorBar(): void;
        /**
         * Contextové menu nad řádkem tiskového téma
         * @param cellContext
         */
        contextMenuTema(cellContext: IGGridCellContext<Gordic.Pam.Interface.GTiskoveTemaDto>): MenuParams[];
        /***
         * Sestavení textu do breadCrumbs podle toho odkud a za co se tiskne
         * */
        breadcrumbsText(): string;
    }
}
declare namespace Gordic.Pam.WebClient {
    /**
     * Objekt pro přenos parametrů v rámci uzávěrky
     * */
    interface PamUzaverkaParam {
        content: GContent;
        novystav: Gordic.Pam.Interface.GStavUzaverkyDto;
        mode: ("AAJ" | "PRA");
        aaj: Gordic.Pam.Interface.GPamsvajDto;
        ixs_vaj: string;
        rok_obd_mzdy: number;
    }
    /**
     * Data pro řádek monitoru
     * */
    interface PamUzaverkaMonitorItem {
        ixs_any?: string;
        poradi?: number;
        ikona?: string;
        akce?: string;
        nazev?: string;
        text?: string;
        dat_zapisu?: string;
    }
    class GUzaverky extends GContentBase {
        readonly Title: string;
        readonly taskId = "taskHlavniUzaverky";
        private StavUzavTextField;
        private VybranyKrokField;
        private AAJ;
        private Mode;
        static NazvyAkci: {
            ClearLogAct: string;
            AktualniStavRefreshAct: string;
            HistorieUzaverekAct: string;
            ProvedUzaverkuAct: string;
            UzaverkaOtevreniAct: string;
            OdvodSocialnihoAct: string;
            MonitorAct: string;
        };
        onContentReady(): void;
        vytvorAkce(): void;
        /**
        * Zápis do monitorovacího logu
        * @param akce  "add" nebo "update"
        * @param ip_ixs_any   ixs_any (pracoviště nebo AAJ)
        * @param itemIn  PamUzaverkaMonitorItem
        * @returns klíč řádku, kam bylo vloženo
        */
        static Log(akce: "add" | "update", ip_ixs_any: string, itemIn: PamUzaverkaMonitorItem): object;
        /**
         * Změna v combu s výběrem uzávěrkového kroku
         * @param newValue Nová vybraná hodnota
         */
        ChangeIxsKpd(newValue: Array<object>): void;
        /**
         Sestavení sloupců pro monitor průběhu
         */
        GridColumnsPrubeh(): Gordic.Data.GridFormat;
        /**
        * Zápis informace o zahájení uzávěrky
        * @param dto Objekt pro přenos parametrů v rámci uzávěrky
        * @param uzaParam Parametry uzávěrky
        */
        _uzaBeginInfo(dto: Gordic.Pam.Interface.GPracovisteDto | Gordic.Pam.Interface.GPamsvajDto, uzaParam: PamUzaverkaParam): Promise<void>;
        /**
 * Dialog, zdali jsou zkontrolovány sestavy
 * @param dto Objekt pro přenos parametrů v rámci uzávěrky
 * @param uzaParam Parametry uzávěrky
 */
        _uzaKontrolaSestavy(dto: Gordic.Pam.Interface.GPracovisteDto | Gordic.Pam.Interface.GPamsvajDto, uzaParam: PamUzaverkaParam): Promise<void>;
        /**
         * Kontrola, zdali jsou všechna pořízená pracoviště ve stejném stavu
         * @param dto Objekt pro přenos parametrů v rámci uzávěrky
         * @param uzaParam Parametry uzávěrky
         */
        _uzaKontrolaPodrizStav(dto: Gordic.Pam.Interface.GPracovisteDto | Gordic.Pam.Interface.GPamsvajDto, uzaParam: PamUzaverkaParam): Promise<string>;
        _uzaKontrolniChodyRun(dto: Gordic.Pam.Interface.GPracovisteDto | Gordic.Pam.Interface.GPamsvajDto, uzaParam: PamUzaverkaParam): Promise<void>;
        _uzaProvedeniKroku(dto: Gordic.Pam.Interface.GPracovisteDto | Gordic.Pam.Interface.GPamsvajDto, uzaParam: PamUzaverkaParam): Promise<void>;
        /**
        * Vyhodnocení kontrolní chodů
        * @param vysledekKCH  struktura s výsledkem KCH
        * @param guid  guid procesu, kde KCH běží
        * @param ixs_any identifikace jednotky v protokolu, kam se má zapsat
        */
        _vyhodnotKCH(vysledekKCH: Interface.GAsyncDataPamDto, guid: string, ixs_any: string, nazev: string): Promise<boolean>;
        /**
         * Naplnění comboboxu
         *
         * */
        _naplnCombo(): JQueryPromise<any>;
        /**
          * Vytvoření menubaru
          * */
        vytvorBar(): void;
        /**
         * Povolení akcí na základě přístupových parametrů případně servisního hesla
        */
        povolAkce(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GHistorieUzaverky extends GContentBase {
        onContentReady(): void;
    }
}
declare namespace Gordic.Pam.WebClient {
    class GUzaverkyMonitor extends GContentBase {
        private viewUza;
        private monitor_timeout;
        private running;
        static NazvyAkci: {
            obcerstviAct: string;
            stopAct: string;
        };
        onContentReady(): void;
        /**
          * Vytvoření akcí do actionlistu
          * */
        vytvorAkce(): void;
        /**
        * Pokus o opuštění stránky - zastavím časovač
        * */
        closing(): void;
    }
}
