declare namespace Gordic.Ppp.WebClient {
    /**
     * Uživatelské nastavení modulu PPP
     * @author  ZMOLIK
     * @date    22.10.2019
    */
    function AppSettings(dataIn: object): Forms.Form;
}
declare namespace Gordic.Ppp.WebClient {
    class GDashboard extends GContentBase {
        readonly DLAZDICE: string[];
        readonly ixs_esu_per: string;
        readonly Links: Gordic.Pam.Interface.GPppLinksDto[];
        readonly DashBoardItem1: Gordic.Pam.Interface.GDashBoardItemDto;
        readonly DashBoardItem2: Gordic.Pam.Interface.GDashBoardItemDto;
        readonly DashBoardItem3: Gordic.Pam.Interface.GPamtpomDto[];
        readonly DashBoardItem4: Gordic.Pam.Interface.GPppUniversalDto;
        private zone;
        dashboard: JQuery<HTMLElement>;
        onContentReady(): void;
        /**
        * Vytvoření akcí do actionlistu
        * */
        vytvorAkce(): void;
        /**
        * Vytoření menubaru
        * */
        vytvorBar(): void;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GDochazka extends GContentBase {
        private FiltrovaneNepritomnosti;
        private frmVyberObdobi;
        private condFormatLegenda;
        private condFormatDochazka;
        private Podrizeni;
        private Rokobdmzdy;
        private DochazkaLegenda;
        private legendapanel;
        protected ppp_rad_aldoch: string;
        readonly Lic: string;
        readonly Pouze_zamestnanec: boolean;
        readonly RokyDochazky: number[];
        private DNU_DOCHAZKY;
        readonly VYNETI_VYJIMKY: string[];
        private LEGENDA_RADEK_VYNETI;
        onContentReady(): void;
        /**
        * Sestavení akcí
        */
        private vytvorAkce;
        /**
        * Grid formát pro seznam docházky
        * */
        /**
         * Grid formát pro seznam docházky
         * @param prvnidenMesice první den měsíce 1 .. pondělí  7..neděle
         */
        private DochazkaGridFormat;
        /**
            * Grid formát pro legendu
        * */
        private LegendaGridFormat;
        /**
        * Vytvoření menu baru
       * */
        vytvorBar(): void;
        povolAkce(): void;
    }
}
declare namespace Gordic.Ppp.WebClient {
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
declare namespace Gordic.Ppp.WebClient {
    class GExportPozadavku extends GContentBase {
        static NazvyAkci: {
            exportXLS: string;
            zpracuj: string;
        };
        private grid;
        onContentReady(): Promise<void>;
        /**
        *  Sloupce gridu
        * */
        sloupce(): Data.GridFormat;
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
declare namespace Gordic.Ppp.WebClient {
    class FaksimileELDP extends GContentBase {
        static NazvyAkci: {
            Novy: string;
            Editovat: string;
            Odstranit: string;
            ChangeRow: string;
            downloadElPriloha: string;
            reload: string;
        };
        readonly taskId = "taskFaksimile";
        readonly ixs_fun_akt: string;
        private _seznam;
        private fileInfo;
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
         * Vytvoření formuláře pro INSERT / UPDATE / DELETE
         * */
        vytvorFormular(typ_akce: "INSERT" | "UPDATE" | "DELETE"): Gordic.Forms.Form;
        /**
         * Vytoření menubaru
         * */
        vytvorBar(): void;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GLoginy extends GContentBase {
        static NazvyAkci: {
            load: string;
            aktualizaceLoginu: string;
        };
        private grid;
        onContentReady(): void;
        /**
        *  výčet sloupců
        * */
        sloupce(): Data.GridFormat;
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
declare namespace Gordic.Ppp.WebClient.Utils {
    function contentready(this: any, e: any, dummy: any, wcfg_par1: any, wcfg_par2: any): void;
    function applicationclosed(lic: string): void;
    function applicationend(lic: string): void;
}
declare namespace Gordic.Ppp.WebClient {
    class GNotifikace extends GContentBase {
        readonly ixs_esu_per: string;
        onContentReady(): void;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GPozadavky extends GContentBase {
        static SeznamDIVu: {
            seznamPozadavku: string;
        };
        static NazvyAkci: {
            pozadavekChangeRow: string;
            novyPozadavek: string;
            novyPozadavekZastup: string;
            storno: string;
            zruseni: string;
            zpetDoPorizeno: string;
            editace: string;
            detail: string;
            schvalit: string;
            zamitnout: string;
            editacePopis: string;
            historiePozadavku: string;
            zapis_agenda: string;
            downloadPDF: string;
            downloadGFRM: string;
            predatEPK: string;
            textVyrizeniEPK: string;
            nadrizeny: string;
            aktualizovat: string;
            novyPozadavekLinks: string;
        };
        readonly Sestavy: Gordic.Pam.Interface.GPppPozadavekSestavyDto[];
        readonly Links: Gordic.Pam.Interface.GPppLinksDto[];
        readonly povoleno_porizeni_v_zastupu: boolean;
        readonly ppp_rad_alpoz: number;
        readonly ppp_rad_pozcrea: number;
        readonly ppp_rad_pozschv: number;
        readonly ppp_rad_pozprij: number;
        readonly ppp_rad_pozstor: number;
        readonly ppp_rad_use_epk: number;
        readonly ppp_rad_pozzami: number;
        readonly pam_rad_obpozhv: number;
        readonly pam_servis_wk: number;
        readonly cert1432_301: boolean;
        readonly cert1432_303: boolean;
        readonly attr_7_1: any;
        readonly attr_7_2: any;
        readonly Lic: string;
        readonly ixs_fun: string;
        readonly role: string;
        private Zamestnanec;
        private PrihlasenyZamestnanec;
        private filterPanel;
        private IxsGfr;
        private Ixp;
        static TRACER: Diagnostics.GLog;
        private _TR;
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
         * Transformuje GPozadavekPppSestavyDto na IPamReportObject
         * @param pozadavek
         */
        PozadavekSestavy2ReportParam(pozadavek: Pam.Interface.GPppPozadavekSestavyDto | null): Pam.IPamReportObject | null;
        GetReportObj(): JQueryPromise<Gordic.Pam.IPamReportObject | null>;
        /**
         * Vytvoří základní obsluhu GFRM
         * @param reportOBJ identifikace sestavy
         * @param stavDokladu number - stav požadavku pamspid.stav_dokladu
         * @akce  "NEW" | "EDIT" | "VIEW" typ akce
         * @typ_zad_ppp Typ Žádosti z pppczad
         */
        VytvorZadost(reportOBJ: Pam.IPamReportObject | null, stavDokladu: Gordic.Pam.Interface.GPppStavyPozadavkuDto, akce: "NEW" | "EDIT" | "VIEW", typ_zad_ppp: string | null): void;
        /**
         * Vytvoření GFRM formuláře včetně vlastní menu
         * @param reportOBJ Objekt určující sestavu
         * @param customDTO GPamtpomDto - ovlivnění její podoby
         * @param stavDokladu StavyPozadavku - stav požadavku umožňuje modifikovat menu
         * @param typ_zad_ppp Typ žádosti
         */
        VytvorFormular(reportOBJ: Pam.IPamReportObject, customDTO: Gordic.Pam.Interface.GPamtpomDto, stavDokladu: Gordic.Pam.Interface.GPppStavyPozadavkuDto, typ_zad_ppp: string): void;
        /**
         * Vytoření menubaru
         * */
        vytvorBar(): void;
        /**
        * Grid formát pro seznam požadavků
        * */
        private PozadavkyGridFormat;
        /**
        * sestavení formuláře pro filtraci
        */
        filterForm(): Gordic.Forms.Form;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GPrehledy extends GContentBase {
        private Podrizeni;
        private gridVysledky;
        protected ppp_rad_alpre: string;
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(panely: Gordic.Pam.Interface.GPppPrehledItemDto[]): void;
        /**
         * Vytvoření menubaru
         * */
        vytvorBar(panely: Gordic.Pam.Interface.GPppPrehledItemDto[]): void;
        /**
        * Načtení přehledu - async
        * @param cnt content
        * @param panel panel
        */
        private nactiPrehledAsync;
        /**
        * Grid formát pro seznam informací
        * */
        private InfoGridFormat;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GVedouci extends GContentBase {
        private _seznamPodrizenych;
        private _filterValue;
        private Aktualni_id_ses;
        private maxUrovenOce;
        private readonly pocet_fci;
        private readonly temata;
        private readonly ppp_podrizeni_sloupce;
        private readonly pam_servis_wk;
        private readonly ppp_rad_prehled;
        private readonly ppp_rad_dochazk;
        private readonly dochazka_certifikat;
        private readonly ppp_rad_majetek;
        private readonly majetek_certifikat;
        readonly povolen_proklik: Boolean;
        readonly povolitfiltrnadrizeni: Boolean;
        readonly role: string;
        private taskRunningTxt;
        private ixs_fun;
        private ixs_fun_old;
        onContentReady(): void;
        /**
           * Transformace filtru pro z vizuální podoby do té zpracovatelné
           * @param zadanyFilter Data sesbíraná z formuláře filtru
           */
        private _TransformujFiltr;
        /**
         * Interní transformace filtru
         * @param kod_udaje_txt kód údaje  např druh_ppv, ixs_pra ...
         * @param data data boolean | number[] | string[]
         * @returns tranafosformovaná maska nebo null, pokud se má ignovat
         */
        private upravFiltr;
        /**
        * Načtení dat do gridu s pomocí filtru
        */
        private _reloadGridData;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
         * Vytoření menubaru
         * */
        vytvorBar(): void;
        /**
         * Pokus o opuštění stránky - reaguje na nastavení  this.taskRunningTxt
         * */
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GZamestnanec extends GContentBase {
        readonly Zamestnanec: Pam.Interface.GPppOsobaDto;
        readonly Nadrizeny: Pam.Interface.GPppNadrizenyDto;
        readonly PohledVedouciho: boolean;
        private pracovnidobapanel;
        private _seznamUdaju;
        private _seznamPPV;
        private Ixsppv;
        readonly Rokobdmzdy: number;
        private ppvTab;
        private esuTab;
        private Aktualni_id_ses;
        private zobrazitHistoriiUdajuOsoby;
        private zobrazitHistoriiPPV;
        private filterPPV;
        private readonly temata;
        private readonly ppp_rad_orgaram;
        private readonly ppp_rad_ekonuda;
        private readonly ppp_rad_dochazk;
        private readonly dochazka_certifikat;
        private readonly ppp_rad_majetek;
        private readonly majetek_certifikat;
        private readonly ppp_rad_sestavy;
        private readonly ppp_rad_skoleni;
        private readonly ppp_rad_benefit;
        private readonly ppp_rad_zdrapro;
        private readonly ppp_rad_pim0001;
        readonly KategorieESU: Gordic.Pam.Interface.GPppPolozkaKategorieDto[];
        menuZamestnanecShare: MenuParams[];
        private per_user;
        readonly Lic: string;
        private MenuBarUdajeEsu;
        private readonly polozka_ktg_bez_historie;
        private readonly polozka_ktg_default;
        private polozka_ktg_act;
        private taskRunningTxt;
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        vytvorBar(): void;
        /**
        * Pokus o opuštění stránky - reaguje na nastavení  this.taskRunningTxt
        * */
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Ppp.WebClient {
    function AkceZamestnanecEdit(SelfActionName: string, RefreshActionName: string, Content: Gordic.Ppp.WebClient.GZamestnanec): GAction;
}
declare namespace Gordic.Ppp.WebClient {
    class GDetailUdajeDokumentySYM extends GContentBase {
        readonly Radek: Pam.Interface.GPppUdajeDto;
        readonly Lic: string;
        readonly PreviewId: string;
        private formular;
        private grid;
        private previewController;
        static NazvyAkci: {
            downloadElPriloha: string;
            vytvorNahled: string;
        };
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
         * Vytvoření menubaru
         * */
        vytvorBar(): void;
        /**
         * Vytvoření sidebaru/preview
         */
        private CreateSidebar;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GMajetek extends GContentBase {
        static SeznamDIVu: {
            seznam_majetku: string;
        };
        static NazvyAkci: {
            refresh: string;
        };
        static TRACER: Diagnostics.GLog;
        private _TR;
        private mistnost_kod;
        readonly Osoby: Pam.Interface.GPppOsobaDto[];
        readonly Majetek: Pam.Interface.GPppMajetekDto[];
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        vytvorBar(): void;
        /**
           * Grid formát
       * */
        private MajetekGridFormat;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GBenefity extends GContentBase {
        private readonly Ixsesu;
        private Rok;
        private viewCerpani;
        private viewRozpocet;
        private viewDashboard;
        private viewDashboardDetails;
        private HistorieCerpani;
        private HistorieRozpocet;
        private DashBoard;
        private readonly Lic;
        onContentReady(): void;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GOrganogram extends GContentBase {
        private Organogram;
        onContentReady(): void;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GSkoleni extends GContentBase {
        private readonly Lic;
        private readonly Ixsesu;
        private viewSkoleni;
        private viewSkoleniPlan;
        private HistorieSkoleni;
        private HistorieSkoleniPlan;
        private FilterSkoleniRok;
        private readonly ModVedouciSeznam;
        private readonly Podrizeni;
        private readonly Zamestnanec;
        private readonly ppp_prihlaskurz;
        private readonly pev_rad_rozevk;
        private readonly ppp_rad_skoleni;
        onContentReady(): void;
        ZobrazitPrilohuKurzu(Content: GSkoleni, row: Gordic.Pam.Interface.GPppSkoleniDto): void;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GZdravZpusobilost extends GContentBase {
        private readonly Ixsesu;
        private view;
        private readonly Lic;
        onContentReady(): void;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GDetailInfoPPV extends GContentBase {
        readonly Zamestnanec: Pam.Interface.GPppOsobaDto;
        readonly Ixsppv: string;
        readonly Rokobdmzdy: number;
        private _seznamPPVUdaje;
        private ppvTab;
        private ZobrazitHistorii;
        readonly KategoriePPV: Gordic.Pam.Interface.GPppPolozkaKategorieDto[];
        private MenuBarUdajePPV;
        readonly Lic: string;
        private readonly polozka_ktg_default;
        private polozka_ktg_act;
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
         * Vytvoření menubaru
         * */
        vytvorBar(): void;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GElektronickeDokumenty extends GContentBase {
        static NazvyAkci: {
            download: string;
            toggleFolders: string;
        };
        static GridProfiles: {
            normal: string;
            skupiny: string;
        };
        private viewSeznam;
        private taskRunningTxt;
        private useFolder;
        private ElektronickeDokumenty;
        private grid;
        onContentReady(): void;
        /**
        *  Sloupce seznamu
        * */
        sloupce(): Data.GridFormat;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
         * Vytoření menubaru
         * */
        vytvorBar(): void;
        /**
        * Pokus o opuštění stránky - reaguje na nastavení  this.taskRunningTxt
        * */
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GSlozkyPlatuPAM extends GContentBase {
        readonly taskId = "taskGSlozkyPlatuPAM";
        private zobrazitNeplatne;
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
         * Vytoření menubaru
         * */
        vytvorBar(): void;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GVykazVykonu extends GContentBase {
        static NazvyAkci: {
            insert: string;
            edit: string;
            nahled: string;
            refresh: string;
            rekapitulace_save: string;
            rekapitulace_save_internal: string;
            storno: string;
            epk: string;
            change_row: string;
        };
        static SeznamDIVu: {
            sablona: string;
            vykazy: string;
            rekapitulace: string;
        };
        static TRACER: Diagnostics.GLog;
        private _TR;
        static skrytEditovatelnePole: boolean;
        private Zamestnanec;
        private rok_obd_mzdy;
        private viewVykazy;
        private dataLoaded;
        private druh_ppv;
        private dialogRekapitulace;
        readonly role: string;
        private PRISLUSNIK;
        /**
         * Automatický výpočet součtu/rozdílu mezi dvěma poli a aktualizace cílového pole
         * @param field_name Název změněného pole
         * @param row Řádek dat
         * @param view Pohled pro aktualizaci dat
         * @param sourceField1 První zdrojové pole
         * @param sourceField2 Druhé zdrojové pole
         * @param targetField Cílové pole pro výsledek
         */
        private autoSum;
        onContentReady(): void;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        /**
         * Přepočtení formuláře rekapitulace
       */
        Prepocti(): void;
        /**
        * Formulář pro sběra dat potřebných k uložení repitulační části
        * @returns formulář pro editaci repitulační části
        */
        private FormularEditPrescas;
        /**
           * Grid formát pro šablonu výkazu - závisí na druhu PPV
       * */
        private SablonaGridFormat;
        /**
         * Grid formát pro seznam výkazů
         * */
        private VykazyGridFormat;
        vytvorBar(): void;
        /**
         * Zjistění zdali je povoleno tlačítko nový výkaz
         * @remarks
         * Tlačítko se povolí, pokud
         * - v období výkaz ještě neexistuje
         * - v předchozím období vykaz neexistuje nebo je již schválen
         */
        CheckNew(opParent?: IGClientProgressOptions): Promise<void>;
        /**
            * Vytvoření GFRM formuláře
            * @param reportOBJ Objekt určující sestavu
            * @param customDTO GPamtpomDto - char_1 očekává ixs_gfr
            */
        VytvorFormular(reportOBJ: Pam.IPamReportObject, customDTO: Gordic.Pam.Interface.GPamtpomDto): void;
    }
}
declare namespace Gordic.Ppp.WebClient {
    class GVykazVykonuDetail extends GContentBase {
        static NazvyAkci: {
            save: string;
            zavrit: string;
            doubleclickDetail: string;
        };
        static SeznamDIVu: {
            hlavicka: string;
            vykaz: string;
            sumace: string;
            prescas: string;
            start: string;
        };
        static TRACER: Diagnostics.GLog;
        private _TR;
        readonly Zamestnanec: Pam.Interface.GPppOsobaDto;
        readonly Datavykazu: Pam.Interface.GPppVykazVykonuDto[];
        readonly Vykaz: Pam.Interface.GPppVykazVykonuPppszvpDto;
        readonly RokObdMzdy: number;
        readonly Akce: string;
        private druh_ppv;
        private Suma;
        private grid_vykaz;
        private formDruhPPV7;
        private static gautofit_level_first;
        private static gautofit_level_second;
        onContentReady(): void;
        /**
         * Kontrola, zdali editovaná buňka grid je validní
         * @returns null ..výkaz je validní nebo souřadnice chyby
         */
        private checkValidityCell;
        /**
         * Přepočítání gridu = automatizovaný počet hodin a součtový řádek
         * @param field_name
         * @param row
         * @param radek
         * @param sloupec
         * @param view
         */
        private Prepocti;
        /**
         * Provede sumaci sloupce v editačním gridu, zapíše do Suma objektu a sumačního gridu
         *
         * @param druh_ppv
         * @param edited_field_name editované pole
         * @param svatek jedná o editaci na řádku, jehož datum předastavuje svátek
         * @param dataGridu
         * @returns
         */
        private sumujSloupec;
        /**
         * Contextové menu nad řádkem gridu
         * @param cellContext
         */
        private contextMenuGrid;
        /**
         * Vytvoření akcí do actionlistu
         * */
        vytvorAkce(): void;
        sesbirejDataGridu(): Promise<Gordic.Pam.Interface.GPppVykazVykonuDto[]>;
        vytvorBar(): void;
        /**
         * Styl gridu pro buňku
         * @param meta data řádku
         * @param column sloupec
         * @param rowIndex index řádku
         * @param columnIndex index sloupce
         * @param columnIndex druh_ppv
         * @returns
         */
        private StylBunky;
        /**
           * Grid formát pro šablonu výkazu - závisí na druhu PPV
       * */
        private VykazVykonuGridFormat;
        /**
        * Změna řádku v gridu s detailem výkazu
        * @param ev
        * @param obj
        */
        changeRowDetail(ev: any, obj: {
            cellInfo: CellInfo<any>;
            originalCellInfo: CellInfo<any>;
            view: Data.View<any>;
        }): void;
        /**
        * Opuštění stránky
        * */
        closing(): void;
    }
}
