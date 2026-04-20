declare namespace Gordic.Pev.WebClient {
    enum EnumActions {
        None = 0,
        New = 1,
        Edit = 2,
        Delete = 3,
        Detail = 4,
        Copy = 5
    }
    enum UrovenVzdPozadavku {
        /**Vzdělávací požadavky se evidují pomocí číselníku (včetně vazby požadavku na kurz)*/
        Ciselnik = 0,
        /**Vzdělávací požadavky se evidují pouze textově*/
        Text = 1
    }
    enum UrovenPristDetUredZk {
        /**Zakázání přístupu na detail úřednických zkoušek*/
        ne = 0,
        /**Povolení přístupu na detail úřednických zkoušek*/
        ano = 1,
        /**Povolení editace úřednických zkoušek*/
        editace = 10,
        /**Povolení editace úřednických zkoušek včetně sledování data podání žádosti*/
        editace_zadosti = 20
    }
    enum UrovenDetOsobyPEV {
        /**Detail se nebude nijak rozšiřovat*/
        Nerozsirovat = 0,
        /**Detail osoby je rozšířen pouze na hlavičce (odbor, oddělení, vzd. plán)*/
        Hlavicka = 10,
        /**Detail osoby je navíc rozšířen o záložku detail*/
        Komplet = 20
    }
    enum StavEvidOsoby {
        /**summary>Nová osoba*/
        evidence = 0,
        /**Nové vynětí*/
        vyneti = 1,
        /**Ukončeno vynětí*/
        konecVyneti = 2,
        /**Nový PPV*/
        pracPomer = 3,
        /**Konec PPV*/
        konecPracPomer = 4,
        /**Ukončení evidence*/
        ukoncenaEvidence = 5
    }
    enum FiltrTypOsob {
        /**Všechny osoby*/
        vsichni = 0,
        /**v evidenci*/
        vEvidenci = 1,
        /**v pracovním poměru bez dohod*/
        vPracPomeru = 2,
        /**uchazeči o přijetí*/
        uchazeci = 3,
        /**ukončené*/
        ukoncene = 4,
        /**externisti*/
        externi = 5,
        /**v pracovním poměru - pouze druhy "Pracovní poměr", "Další pracovní poměr" a "Další pracovní poměr - (dříve souběžný)"*/
        pracPomery = 6,
        /**Funkcionáři*/
        funkcionari = 7,
        /**Státní zaměstnanci nebo příslušníci*/
        statZam = 8,
        /**DPČ*/
        DPC = 9,
        /**DPP*/
        DPP = 10,
        /**PPM*/
        PPM = 11,
        /**RD*/
        RD = 12,
        /**ve vynětí*/
        ve_vyneti = 13,
        /**ve vynětí bez mateřské a rodičovské dovolené*/
        ve_vyneti_bez_md = 14,
        /**studenti*/
        studenti = 15,
        /**důchodci*/
        duchodci = 16,
        /**Osoby pobírající invalidní důchod*/
        duchodci_invalidni = 17,
        /**Osoby pobírající starobní důchod*/
        duchodci_starobni = 18,
        /**mentorové*/
        mentorove = 19,
        /**mentorovaní*/
        mentorovani = 20,
        /**Osoby s kvalifikační dohodou*/
        kval_dohody = 21
    }
    enum MistoHledaneHodnoty {
        /**Hledat se bude příjmení*/
        prijmeni = 0,
        /**Hledat se bude osobní číslo*/
        oc = 1,
        /**Hledat se bude rodné číslo*/
        rc = 2,
        /**Hledat se bude pracoviště*/
        pracoviste = 3,
        /**Hledat se bude zkratka SYM*/
        sym_zkratka = 4,
        /**Hledat se bude název SYM*/
        sym_nazev = 5
    }
    enum UrovenPropojeniSSL {
        /**Zakázání propojení se SSL*/
        ne = 0,
        /**Propojení se SSL s vazbou na osobu (spis)*/
        osoba = 10,
        /**Propojení se SSL s vazbou na pracovní poměr (spis)*/
        ppv = 20,
        /**Propojení se SSL s vazbou na osobu i pracovní poměr (spis)*/
        kombinovane = 30
    }
    enum UrovenPristDetail {
        /**Zakázání přístupu na detail*/
        ne = 0,
        /**Povolení přístupu na detail*/
        ano = 1,
        /**Povolení pouze čtení přístupu na detail*/
        jenCteni = 10
    }
    enum RBAkce {
        Novy = 0,
        Nic = 1,
        Aktualizovat = 2
    }
    enum UrovenPovRef {
        /**Zakázání zobrazení evidence propojení osoby v personalistice a referentů*/
        ne = 0,
        /**Povolení zobrazení evidence propojení osoby v personalistice a referentů*/
        ano = 1,
        /**Povolení editace evidence propojení osoby v personalistice a referentů i v případě omezení editace osoby*/
        ano_editace = 10
    }
}
declare namespace Gordic.Pev.WebClient {
    /**
     * Získání šířky sloupce podle hodnot v poli (pro pole s nízkým počtem hodnot)
     * @param array Pole objektů
     * @param attr  Název hodnoty
     * @param grid Grid
     * @param datetime Jaký formát se používá u date
     * @returns Šířka v pixelech
     */
    function GetWidth<T>(array: T[], attr: keyof T, datetime?: boolean): number;
    /**Zda je druh splnění požadavku uznání rovnocennosti*/
    function jeUznaniRovnocennosti(ixs_hci_drsp: string | null | undefined): boolean;
    /**Zda je požadavek splněn*/
    function JePozadavekSplnen(pozadavek: string | null | undefined): boolean;
    /**
     * Zjištění plánu k danému datu, jestli se nezhoduje s daným plánem
     * @param cnt Aktuální content
     * @param ixs_esu Identifikátor osoby
     * @param ixs_plv Identifikátor plánu pro kontrolu platnosti
     * @param datum Datum k upřesnění plánu (nepovinný argument -> použije se aktuální datum)
     */
    function PlanOsobyKon(cnt: GContent, ixs_esu: string, ixs_plv: string, vytvoritNovy: boolean, datum?: Date): JQuery.Promise<string | null | undefined, any, any>;
    /**
     * Odešle pozvánky osobám na kurz
     * @param cnt Content
     * @param turnus DTO turnusu
     * @param osoby Seznam identifikátorů osob
     */
    function SendInvitation(cnt: GContent, turnus: Per.Interface.GTurnusDto, osoby: string[]): void;
    /**
     * Rozdíl v datech ve dnech
     * @param date1
     * @param date2
     */
    function DifferenceInDays(date1: Date | JsonDate, date2: Date | JsonDate): Decimal;
    /**
     * Zda je datum 1 větší jak datum 2
     * @param date1
     * @param date2
     */
    function IsGreaterDate(date1: Date | JsonDate, date2: Date | JsonDate): boolean;
    /**
     * Zda je datum 1 větší nebo rovno datumu 2
     * @param date1
     * @param date2
     */
    function IsGreaterOrEqualDate(date1: Date | JsonDate, date2: Date | JsonDate): boolean;
    /**
     * Zjistí, jestli je platná hodnota číselníku podle PERSHCI
     * @param ixs_hci
     */
    function jeHodCisPlatna(ixs_hci: string | null | undefined): JQuery.Promise<boolean, any, any>;
    /**Zrušení zařazení osoby na turnus */
    function DeleteOso(cnt: GContent, ixs_kur: string | null | undefined, poradi: number | null | undefined, ixs_esu: string | null | undefined, stav_abs: number | null | undefined): void;
    /** Náhrada za C# padLeft
     * @param input Řetězec, který budu upravovat
     * @param length Celková délka řetězce
     * @param padChar Doplňovaná hodnota
     */
    function PadLeft(input: string, length: number, padChar?: string): string;
}
/**
 * Gordic.Pev.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.10
 */
declare namespace Gordic.Pev.WebClient {
    class GTiskSestavy extends GContentBase {
        private Tema;
        onContentReady(): void;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailKurzu extends GContentBase {
        protected Action: EnumActions;
        protected DtoKurz: Per.Interface.GKurzDto;
        protected IxsKur: string;
        protected JeCT: boolean;
        protected JeBIS: boolean;
        protected JeCS: boolean;
        protected JsouZobrazenyPozadavky: boolean;
        protected ParametrPevOsoDokKur: boolean;
        protected ParametrPerPovBarevRozSez: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        protected ParametrPevRadEvidVzdPlanu: boolean;
        protected ParametrPevAutoPozDoPlanu: boolean;
        private readonly ParametrPerPovStatZam;
        private readonly ParametrPerPovSluzba;
        protected IxsProfilu: string;
        private gin_rad_vla_ur;
        private gin_vla_nakonec;
        private readOnly;
        private def_save;
        private ulozeno;
        private tab_zarazeni;
        private grid_turnusy;
        private grid_osoby;
        private grid_pozadavky;
        onContentReady(): void;
        private loadData;
        private newData;
        private copyData;
        private getGridFormatTurnus;
        private getGridFormatOsoby;
        private getGridFormatPozadavky;
        private prepocetClovekodni;
        private setDisabled;
        private isModified;
        private updateSaveButton;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailLektoraAkce extends GContentBase {
        protected DtoLektora: Per.Interface.GLektorTurDto;
        protected Action: EnumActions;
        private saveData;
        onContentReady(): void;
        private loadData;
        private isModified;
        private updateSaveButton;
        closing(): {
            Action: EnumActions;
            Dto: Per.Interface.GLektorTurDto;
        } | null;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailLektoraTur extends GContentBase {
        protected DtoLektor: Per.Interface.GLektorTurDto;
        protected DtoTurnus: Per.Interface.GTurnusDto;
        private DtoKurz;
        onContentReady(): void;
        private loadData;
        private updateSaveButton;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailVzdAkce extends GContentBase {
        protected Action: EnumActions;
        protected DtoTurnus: Per.Interface.GTurnusDto;
        protected DtoKurz: Per.Interface.GKurzDto;
        protected JsouZobrazenyPozadavky: boolean;
        protected ParametrPevOsoDokKur: boolean;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPropojeniPevPeh: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        protected IxsProfilu: string;
        private gin_rad_vla_ur;
        private gin_vla_nakonec;
        private gin_gms_sndaddr;
        private readOnly;
        private kopirovat;
        private zmenaOsob;
        private jeZmenaOsoby;
        private jeZmenaPozadavku;
        private pocetOsob;
        private tiskVyber;
        private maTurnusGeneraci;
        private ulozeno;
        private readonly tabZarOsobyID;
        private readonly tabVzdPozID;
        private tabZarOsoby;
        private tabVzdPoz;
        private tabmanager;
        private vzorHodnoceni;
        private pocDnuKonceHod;
        private pocatekHodTur;
        private povoleniOdesilaniMailu;
        private grid_oso;
        private grid_poz;
        onContentReady(): void;
        private getGridFormatOsoby;
        private getGridFormatPozadavky;
        private getGridFormatNewOso;
        private loadData;
        private setDisabled;
        private isModified;
        private setGenButton;
        private updateSaveButton;
        private prepocetClovekodni;
        private prepocetCastky;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailVzdAkceRoz extends GContentBase {
        protected Action: EnumActions;
        protected DtoTurnus: Per.Interface.GTurnusDto;
        protected DtoKurz: Per.Interface.GKurzDto;
        protected JsouZobrazenyPozadavky: boolean;
        protected ParametrPevOsoDokKur: boolean;
        protected ParametrPerPovStatZam: boolean;
        protected JeCT: boolean;
        protected ParametrPropojeniPevPeh: boolean;
        protected ParametrZobrAkcePodlePlatce: string;
        protected ParametrZdaLogovatGDPR: boolean;
        protected IxsProfilu: string;
        private gin_rad_vla_ur;
        private gin_vla_nakonec;
        private gin_gms_sndaddr;
        private readOnly;
        private kopirovat;
        private tiskVyber;
        private maTurnusGeneraci;
        private pocetOsob;
        private ulozeno;
        private jeZmenaOsoby;
        private jeZmenaLektori;
        private jeZmenaNakladu;
        private jeZmenaPozadavku;
        private readonly tabZarOsobyID;
        private readonly tabNakladyID;
        private readonly tabLektoriID;
        private readonly tabVzdPozID;
        private tabZarOsoby;
        private tabNaklady;
        private tabLektori;
        private tabVzdPoz;
        private tabmanager;
        private vzorHodnoceni;
        private pocDnuKonceHod;
        private pocatekHodTur;
        private povoleniOdesilaniMailu;
        private grid_oso;
        private grid_nak;
        private grid_lek;
        private grid_poz;
        onContentReady(): void;
        private loadData;
        private setDisabled;
        private setGenButton;
        private updateSaveButton;
        private isModified;
        private prepocetNak;
        private getGridFormatOsoby;
        private getGridFormatNaklady;
        private getGridFormatLektori;
        private getGridFormatPozadavky;
        private getGridFormatNewOso;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GNakladyDetailRoz extends GContentBase {
        protected Action: EnumActions;
        protected Dto: Per.Interface.GTurnusNakladyDto;
        private ixsKur;
        onContentReady(): void;
        private isModified;
        private updateOkButton;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GSeznamKurzu extends GContentBase {
        protected IxsEsuOrg: string;
        protected BreadcrumbsStr: string;
        private TypInst;
        private ParametrPerRozDuvp;
        private ParametrPerRadPovKvm;
        private ParametrPerPovKat;
        private ParametrPerPovZak;
        private ParametrPerPovPvv;
        private ParametrPerPovZar;
        private ParametrPevUroVzdPoz;
        private grid;
        private filters;
        private povoleniMasekKurzu;
        onContentReady(): void;
        private getGridFormat;
        private getFilterForms;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GSeznamNakladu extends GContentBase {
        protected DtoNakladyList: Per.Interface.GTurnusNakladyDto[];
        protected ReadOnly: boolean;
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GSeznamTurnusu extends GContentBase {
        protected IxsEsuOrg: string;
        protected JeCT: boolean;
        protected ParametrRozEvidenceKurzu: boolean;
        protected BreadcrumbsStr: string;
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GVyberZamAbs extends GContentBase {
        protected Uspesni: Per.Interface.GUcastnikDto[];
        protected Ostatni: Per.Interface.GUcastnikDto[];
        private grid_uspech;
        private grid_neucast;
        private grid_nic;
        private grid_neuspech;
        private saveData;
        onContentReady(): void;
        private GetGridFormatOsoby;
        closing(): {
            uspesni: Per.Interface.GUcastnikDto[];
            neuspesni: any[];
            neucast: any[];
        } | null;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailLektora extends GContentBase {
        protected Action: EnumActions;
        protected DtoLek: Per.Interface.GLektorOrgDto;
        private readOnly;
        private isSaved;
        onContentReady(): void;
        private loadData;
        private isModified;
        private updateSaveButton;
        closing(): {
            ulozeno: boolean;
            DtoLek: Per.Interface.GLektorOrgDto;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailLektoraRoz extends GContentBase {
        protected Action: EnumActions;
        protected DtoLek: Per.Interface.GLektorOrgDto;
        private saved;
        private readOnly;
        onContentReady(): void;
        private loadData;
        private isModified;
        private updateSaveButton;
        private isLektorValid;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GSeznamLektoru extends GContentBase {
        protected ParametrPevRozEvidLektoru: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GAbsolvovaniKurzu extends GContentBase {
        protected IxsEsu: string;
        protected NazevEsu: string | null | undefined;
        protected IxsKur: string;
        protected PoradiKur: number;
        protected StavAbs: number;
        protected PocDnuVzdel: JsonDecimal | Decimal;
        protected CNaklUc: JsonDecimal | Decimal;
        protected DatZk: JsonDate | Date;
        protected DatPlatZk: JsonDate | Date;
        protected DateDoklad: JsonDate | Date;
        protected DokladVydal: string | null | undefined;
        protected DokladNazev: string | null | undefined;
        protected DokladCislo: string | null | undefined;
        protected DatZavazekDo: JsonDate | Date | null | undefined;
        protected CZavazek: JsonDecimal | Decimal | null | undefined;
        protected Poznamka: string | null | undefined;
        protected DebugMode: boolean;
        protected ParametrPevRadPovMaz: boolean;
        protected ReadOnly: boolean;
        protected AbsReadOnly: boolean;
        protected ParametrPevAutoPozDoPlanu: boolean;
        protected ParametrPevRadEvidVzdPlanu: boolean;
        private nutnaUprPozadavku;
        private jeZmenaPozadavku;
        private povoleniKontrolaPropojeni;
        private grid_osobaPoz;
        private grid_moznePoz;
        private saveData;
        onContentReady(): void;
        private loadData;
        private loadPozOso;
        private loadMoznePoz;
        private setReadOnlyStavAbs;
        private isModified;
        private updateSaveButton;
        private getGridFormatOsobaPoz;
        private getGridFormatMoznePoz;
        closing(): {
            StavAbs: number;
            CNaklUc: JsonDecimal;
            PocDnuVzdel: JsonDecimal;
            DatZk: JsonDate;
            DatPlatZk: JsonDate;
            DokladCislo: string | null | undefined;
            DokladNazev: string | null | undefined;
            DokladVydal: string | null | undefined;
            DateDoklad: JsonDate;
            DatZavazekDo: JsonDate | null | undefined;
            CZavazek: JsonDecimal | null | undefined;
            JeZmenaPozadavku: boolean;
        } | {
            JeZmenaPozadavku: boolean;
            StavAbs?: undefined;
            CNaklUc?: undefined;
            PocDnuVzdel?: undefined;
            DatZk?: undefined;
            DatPlatZk?: undefined;
            DokladCislo?: undefined;
            DokladNazev?: undefined;
            DokladVydal?: undefined;
            DateDoklad?: undefined;
            DatZavazekDo?: undefined;
            CZavazek?: undefined;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GInfoPanel extends GContentBase {
        protected JeCT: boolean;
        protected JeBIS: boolean;
        protected JeCS: boolean;
        protected JeMPO: boolean;
        protected JeKUSK: boolean;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPevPriUredZk: number;
        protected DebugMode: boolean;
        protected JeHodVzdPlany: boolean;
        protected DtoTypHodVzdPlany: Per.Interface.GTypHodnoceniDto;
        protected LogovatGdpr: boolean;
        protected ParametrPerZamFun: number;
        protected NacteneZaznamy: Per.Interface.GSeznamOsobDto[];
        protected OtevrenoZSeznamuOsob: boolean;
        protected RokVzdPlanu: number;
        /**Hodnota parametru - zobrazení zaměstnanců bez vzdělávacího plánu v informačním panelu */
        private povoleniBezPlanu;
        /**Hodnota parametru - zobrazení zaměstnanců s končícím plánem vzdělávání*/
        private povoleniKonecPlanu;
        /**Hodnota parametru - zobrazení sledování dnů školení v informačním panelu*/
        private povoleniDnySkoleni;
        /**Hodnota parametru - zobrazení sledování odborné způsobilosti v informačním panelu*/
        private povoleniZpusobilost;
        /**Hodnota parametru - zobrazení školení v informačním panelu*/
        private povoleniVedouci;
        /**Hodnota parametru - zobrazení rozpor v požadavcích dle SYM v informačním panelu*/
        private povoleniStavSym;
        /**Zobrazení vstupního vzdělávání úvodního*/
        private povoleniVstupVzdUvod;
        /**Zobrazení vstupního vzdělávání následného*/
        private povoleniVstupVzdNasled;
        /**Zobrazení úřednických zkoušek - čekatelé*/
        private povoleniUredCek;
        /**Zobrazení studijního volna*/
        private povoleniStudVolno;
        /**Hodnota parametru - zobrazení vynětí z evidenčního počtu v informačním panelu*/
        private povoleniVyneti;
        /**Hodnota parametru - zobrazení konce platností školení v informačním panelu*/
        private povoleniKonecSkoleni;
        /**Hodnota parametru - zobrazení nových zaměstnanců v informačním panelu*/
        private povoleniNoviZam;
        /**Hodnota parametru - zobrazení ukončených PPV v informačním panelu*/
        private povoleniUkoncenePPV;
        /**Hodnota parametru - zobrazení blížících se turnusů v informačním panelu*/
        private povoleniTurnusy;
        private readonly tabGridBezPlanuID;
        private readonly tabGridDnySkoleniID;
        private readonly tabGridHodnoceniID;
        private readonly tabGridKonecPlanuID;
        private readonly tabGridKonecSkoleniID;
        private readonly tabGridNoviZamID;
        private readonly tabGridStavSymID;
        private readonly tabGridStudVolnoID;
        private readonly tabGridTurnusyID;
        private readonly tabGridUkoncenePPVID;
        private readonly tabGridUredCekID;
        private readonly tabGridVedouciID;
        private readonly tabGridVstupVzdNasledID;
        private readonly tabGridVstupVzdUvodID;
        private readonly tabGridVynetiID;
        private readonly tabGridZpusobilostID;
        private gridBezPlanu;
        private gridKonecPlanu;
        private gridDnySkoleni;
        private gridZpusobilost;
        private gridVedouci;
        private gridVstupVzdUvod;
        private gridVstupVzdNasled;
        private gridTurnusy;
        private gridUredCek;
        private gridStudVolno;
        private gridKonecSkoleni;
        private gridNoviZam;
        private gridUkoncenePPV;
        private gridVyneti;
        private gridStavSym;
        private gridHodnoceni;
        private divGrids;
        private tabGridBezPlanu;
        private tabGridKonecPlanu;
        private tabGridDnySkoleni;
        private tabGridZpusobilost;
        private tabGridVedouci;
        private tabGridVstupVzdUvod;
        private tabGridVstupVzdNasled;
        private tabGridTurnusy;
        private tabGridUredCek;
        private tabGridStudVolno;
        private tabGridKonecSkoleni;
        private tabGridNoviZam;
        private tabGridUkoncenePPV;
        private tabGridVyneti;
        private tabGridStavSym;
        private tabGridHodnoceni;
        private tabmanager;
        private idTab;
        onContentReady(): void;
        private getGridFormatBezPlanu;
        private getGridFormatKonecPlanu;
        private getGridFormatDnySkoleni;
        private getGridFormatZpusobilost;
        private getGridFormatVedouci;
        private getGridFormatVstupVzdUvod;
        private getGridFormatVstupVzdNasled;
        private getGridFormatTurnusy;
        private getGridFormatUredCek;
        private getGridFormatStudVolno;
        private getGridFormatKonecSkoleni;
        private getGridFormatNoviZam;
        private getGridFormatUkoncenePpv;
        private getGridFormatVyneti;
        private getGridFormatStavSym;
        private getGridFormatHod;
        private getColumnListBezPlanu;
        private getColumnListKonecPlanu;
        private getColumnListDnySkoleni;
        private getColumnListZpusobilost;
        private getColumnListVedouci;
        private getColumnListVstupVzdUvod;
        private getColumnListVstupVzdNasled;
        private getColumnListTurnusy;
        private getColumnListUredCek;
        private getColumnListStudVolno;
        private getColumnListKonecSkoleni;
        private getColumnListNoviZam;
        private getColumnListUkoncenePpv;
        private getColumnListVyneti;
        private getColumnListStavSym;
        private getColumnListHod;
        private openDetail;
    }
}
/**
 * Gordic.Pev.WebClient
 *
 * @author Pavel Švehla
 * @since 480.2.0.5
 */
declare namespace Gordic.Pev.WebClient {
    class GSeznamOsob extends GContentBase {
        protected JeVNOL: boolean;
        protected JeCT: boolean;
        protected JeBIS: boolean;
        protected JeCS: boolean;
        protected JeKUSK: boolean;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerRCZobr: boolean;
        protected ParametrPerPovBarevRozSez: boolean;
        protected ParametrPropojeniSSL: UrovenPropojeniSSL;
        protected TypInst: number;
        protected ParametrPerRozDuvp: boolean;
        protected ParametrPerRadPovKvm: boolean;
        protected ParametrPerPovKat: boolean;
        protected ParametrPevUroVzdPoz: UrovenVzdPozadavku;
        protected ParametrPevRadRozEvidKurzu: boolean;
        protected ParametrPevRadEvidVzdPlanu: boolean;
        protected ParametrPerPovZak: UrovenPristDetail;
        protected ParametrPerPovByd: UrovenPristDetail;
        protected ParametrPerPovJko: UrovenPristDetail;
        protected ParametrPerPovSluzba: boolean;
        protected ParametrPerRadPovRef: UrovenPovRef;
        protected ParametrPerRadPovVojak: boolean;
        protected ParametrPerRadPovUrednik: boolean;
        protected ParametrPerRadPrizOdbory: boolean;
        protected LicAdr: string;
        protected ParametrPerPovPvv: UrovenPristDetail;
        protected ParametrPerPovZar: boolean;
        protected ParametrPerPovPrz: UrovenPristDetail;
        protected ParametrPerPovZab: UrovenPristDetail;
        protected ParametrPerPovPlv: UrovenPristDetail;
        protected ParametrPerPovVyn: UrovenPristDetail;
        protected ParametrPerPovPriMimoPV: UrovenPristDetail;
        protected ParametrPerPovPovereni: UrovenPristDetail;
        protected ParametrPerPovRod: UrovenPristDetail;
        protected ParametrPerPovVzd: UrovenPristDetail;
        protected ParametrPerPovTit: UrovenPristDetail;
        protected ParametrPerPovHodnost: UrovenPristDetail;
        protected ParametrPerPovKdo: UrovenPristDetail;
        protected ParametrPerPovAks: UrovenPristDetail;
        protected ParametrPerPovZoz: UrovenPristDetail;
        protected ParametrPerPovMen: UrovenPristDetail;
        protected ParametrPerPovJzn: UrovenPristDetail;
        protected ParametrPerPovJzk: UrovenPristDetail;
        protected ParametrPerPovPrk: UrovenPristDetail;
        protected ParametrPerPovCrt: UrovenPristDetail;
        protected ParametrPerPovPvk: UrovenPristDetail;
        protected ParametrPerPovLuv: UrovenPristDetail;
        protected ParametrPerPovJinaVydCin: UrovenPristDetail;
        protected ParametrPerPovDou: UrovenPristDetail;
        protected ParametrPerPovDio: UrovenPristDetail;
        protected ParametrPerPovZdz: UrovenPristDetail;
        protected ParametrPerPovFyzZp: UrovenPristDetail;
        protected ParametrPerPovOsoZp: UrovenPristDetail;
        protected ParametrPerPovOzdPobyt: UrovenPristDetail;
        protected ParametrPerPovZps: UrovenPristDetail;
        protected ParametrPerPovDuv: UrovenPristDetail;
        protected ParametrPerPovPru: UrovenPristDetail;
        protected ParametrPerPovZdp: UrovenPristDetail;
        protected ParametrPerPovZdc: UrovenPristDetail;
        protected ParametrRozsireniJazykZk: boolean;
        protected ParametrPerPovSchl: boolean;
        protected ParametrPerRozkazy: boolean;
        protected ParametrPerRadPovKatProh: boolean;
        protected ParametrPerEdCduch: boolean;
        private povoleniMasekOsob;
        private povoleniZobrOdbor;
        private grid;
        private filtrDto;
        private filters;
        private zaznamy;
        onContentReady(): void;
        private getFilterForms;
        private initTypOsob;
        private getColumnList;
        private getGridFormat;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GSeznamZamReadPev extends GContentBase {
        private JeKUSK;
        private ParametrPerPovStatZam;
        private ParametrPerRCZobr;
        private ParametrZdaLogovatGDPR;
        private grid;
        private povoleniZobrOdbor;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GStudVolno extends GContentBase {
        protected Action: EnumActions;
        protected IxsEsu: string;
        protected DtoStudVolno: Per.Interface.GStudVolnoDto;
        protected DtoStudVolnoList: Per.Interface.GStudVolnoDto[];
        private readOnly;
        private pocetDniRok;
        private ulozeno;
        onContentReady(): void;
        private newData;
        private loadData;
        private getPocetDniRok;
        private setDisabled;
        private isModified;
        private updateSaveButton;
        private isDnyVolnaValid;
        private setDny;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GTextPozadavek extends GContentBase {
        protected Action: EnumActions;
        protected IxsEsu: string;
        protected IxsPlv: string;
        protected DtoDetailPlan: Per.Interface.GPozadavkyPlanDto;
        private IxsHodNavrh;
        private readOnly;
        private jeNovyDetail;
        private isSaved;
        private div_form;
        private div_navrh;
        onContentReady(): void;
        private novaData;
        private loadDetail;
        private isModified;
        private isModifiedPozHod;
        private saveData;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GVyberPlanuZam extends GContentBase {
        protected Plany: Per.Interface.GPlanOsobyDto[];
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GVyberPozAbsolvovani extends GContentBase {
        protected Pozadavek: Per.Interface.GPozadavkyDto;
        protected IxsEsu: string;
        protected NazevEsu: string;
        protected Stav: number;
        protected Pozadavky: Per.Interface.GPozadavkyPlanDto[];
        protected Plany: Per.Interface.GPlanOsobyDto[];
        private vybranyPozadavek;
        private grid_plany;
        private grid_pozadavky;
        private saveData;
        onContentReady(): void;
        private getGridFormatPlany;
        private getGridFormatPozadavky;
        private isPozadavkyValid;
        private isPlanyValid;
        private isValid;
        closing(): {
            VybranyPozadavek: Per.Interface.GPozadavkyPlanDto;
        } | null;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GVyberZamestnance extends GContentBase {
        protected Ukladat: boolean;
        protected PriznakTur: boolean;
        protected DtoTurnus: Per.Interface.GTurnusDto;
        protected PriznakPlan: boolean;
        protected DtoPlan: Per.Interface.GVzdelavaciPlanDto;
        protected ParametrZdaLogovatGDPR: boolean;
        protected ParametrPerRadPovKvm: boolean;
        protected TypInst: number;
        protected gin_gms_sndaddr: string;
        private dtoOsoby;
        private jsouPozadavky;
        private grid;
        private isSaved;
        private filter;
        private povoleniAutoSirkuSloupcu;
        onContentReady(): void;
        private getGridFormat;
        private initMistoHledaneHod;
        private loadDataOso;
        private loadDataOsoPozadavky;
        private getNoveOsoTurnus;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GZarazeniPozadavku extends GContentBase {
        protected Action: EnumActions;
        protected DtoDetailPozadavek: Per.Interface.GPozadavkyPlanDto;
        protected IxsEsu: string;
        protected IxsPlv: string;
        protected ZobrazRozDetail: boolean;
        protected ParametrPevRadEvidVzdPlanu: boolean;
        private readOnly;
        private isSaved;
        private povoleniRucniSplneni;
        onContentReady(): void;
        /** Výpočet počtu opakování, v případě, že je povoleno opakování*/
        private setPocetOpakovani;
        private getGridFormat;
        private isModifiedRozDetail;
        private isModifiedZaklad;
        private isModified;
        private updateSaveButton;
        private setDisabled;
        private novaData;
        private loadDetail;
        private zmenaFilteruPozadavku;
        private loadFields;
        private dotazUlozeni;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GJazykZk extends GContentBase {
        protected Action: EnumActions;
        protected IxsEsu: string;
        protected DtoJazZk: Per.Interface.GJazykoveZkouskyDto;
        private readOnly;
        onContentReady(): void;
        private loadData;
        private newData;
        private setDisabled;
        private isModified;
        private updateSaveButton;
        private setUroZnalosti;
        private setUroZkouska;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GJazykZkRozsireny extends GContentBase {
        protected Action: EnumActions;
        protected IxsEsu: string;
        protected DtoJazZk: Per.Interface.GJazykoveZkouskyDto;
        private readOnly;
        onContentReady(): void;
        private newData;
        private loadData;
        private setDisabled;
        private isModified;
        private updateSaveButton;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailCastiPlanu extends GContentBase {
        protected Action: EnumActions;
        protected UkladatDoDB: boolean;
        protected DtoCastiPlanu: Per.Interface.GCastiPlanuDto;
        private readOnly;
        private dataSaved;
        onContentReady(): void;
        private loadData;
        private setDisabled;
        private isModified;
        private updateSaveButton;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailPlanu extends GContentBase {
        protected Action: EnumActions;
        protected DtoPlan: Per.Interface.GVzdelavaciPlanDto;
        protected ParametrZdaLogovatGDPR: boolean;
        private readOnly;
        private jeZmenaPoz;
        private jeZmenaOso;
        private ulozeno;
        private grid_pozadavky;
        private grid_osoby;
        onContentReady(): void;
        private loadData;
        private newData;
        private isModified;
        private updateSaveButton;
        private getGridFormatPozadavky;
        private getGridFormatOsoby;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailPlanuOsoby extends GContentBase {
        protected Action: EnumActions;
        protected DtoPlan: Per.Interface.GVzdelavaciPlanDto;
        protected IxsEsu: string;
        protected NazevPlanu: string;
        protected ParametrPevPovEvidDataVzdPlanu: boolean;
        protected EvidovatNazev: boolean;
        private readOnly;
        private planOsobyList;
        private ulozeno;
        onContentReady(): void;
        private loadData;
        private newData;
        private isModified;
        private updateSaveButton;
        private setNazev;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GSeznamPlanu extends GContentBase {
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailPozadavku extends GContentBase {
        protected Action: EnumActions;
        protected DtoPozadavku: Per.Interface.GPozadavkyDto;
        protected ParametrZdaLogovatGDPR: boolean;
        private readOnly;
        private ulozeno;
        private detail;
        private popis;
        private grid_kurzy;
        private grid_plany;
        private div_odbor_zpu;
        private div_jazyky;
        private div_vzdelani;
        private AktDetail;
        private base;
        private odbor_zpu;
        private jazyky;
        private vzdelani;
        onContentReady(): void;
        private getGridFormatKurzy;
        private getGridFormatPlany;
        private loadData;
        private newData;
        private setDisabled;
        private hasChanged;
        private updateSaveButton;
        private changeDetail;
        private isDetailValid;
        private getDetailPozadavku;
        private setAktDetail;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GSeznamPozadavku extends GContentBase {
        protected ParametrPevUroVzdPoz: UrovenVzdPozadavku;
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GSeznamPozadavkuText extends GContentBase {
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerRCZobr: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        protected IxsZmp: string;
        protected NazevRf: string;
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Pev.WebClient {
    /** Předek detailů požadavku*/
    class GDetPozBase {
        protected _content: GContent | null;
        protected _readOnly: boolean;
        get readOnly(): boolean;
        set readOnly(value: boolean);
        protected _isFrmChanged: boolean;
        get isFrmChanged(): boolean;
        protected _formBuilder: Forms.Form | null;
        get formBuilder(): Forms.Form | null;
        protected _formDiv: JQuery<HTMLElement> | null;
        protected _ixsKvp: string | null | undefined;
        constructor(cnt: GContent, frmDiv: JQuery<HTMLElement>);
        protected newDataForm(): void;
        protected loadDataForm(): void;
        protected setDisabled(): void;
        protected saveDataForm(): void;
        setIsFrmChanged(): void;
        loadData(ixs_kvp?: string | null | undefined): void;
        saveData(ixs_kvp: string): void;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetPozJazyk extends GDetPozBase {
        private _dtoJazyk;
        constructor(cnt: GContent, frmDiv: JQuery<HTMLElement>);
        loadDataForm(): void;
        newDataForm(): void;
        setDisabled(): void;
        setIsFrmChanged(): void;
        private saveFields;
        saveDataForm(): void;
    }
}
declare namespace Gordic.Pev.WebClient {
    /**Detail požadavku - odborná způsobilost*/
    class GDetPozOdbornaZpusobilost extends GDetPozBase {
        private _dtoZpusobilost;
        constructor(cnt: GContent, frmDiv: JQuery<HTMLElement>);
        loadDataForm(): void;
        newDataForm(): void;
        setDisabled(): void;
        setIsFrmChanged(): void;
        saveDataForm(): void;
    }
}
declare namespace Gordic.Pev.WebClient {
    /**Detail požadavku - vzdělání*/
    class GDetPozVzdelani extends GDetPozBase {
        private _dtoVzdelani;
        constructor(cnt: GContent, frmDiv: JQuery<HTMLElement>);
        loadDataForm(): void;
        newDataForm(): void;
        setDisabled(): void;
        setIsFrmChanged(): void;
        saveDataForm(): void;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailSubjektu extends GContentBase {
        protected Action: EnumActions;
        protected DtoOrg: Per.Interface.GOrganizaceDto;
        protected IxsEsu: string;
        protected JenGinesu: boolean;
        /**Jestli při založení nového použít funkci pro interní org.*/
        protected Interni: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        /**ESU param*/
        protected gin_esu_buedit: number;
        /**ESU param*/
        protected gin_esu_rp_ban: boolean;
        protected IxsProfilu: string;
        private gin_rad_vla_ur;
        private gin_vla_nakonec;
        private grid;
        private readOnly;
        private jeZmenaLektori;
        private jeZmenaEsu;
        private ulozeno;
        onContentReady(): void;
        private getGridFormat;
        private setDisabled;
        private isModified;
        private updateSaveButton;
        private loadData;
        private newDataExt;
        private newDataInt;
        private refreshEsu;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GSeznamSubjektu extends GContentBase {
        private grid;
        private ParametrPevRozEvidVzdSubjektu;
        private ParametrPevRadRozEvidKurzu;
        private jeInterni;
        onContentReady(): void;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailUredZk extends GContentBase {
        protected Action: EnumActions;
        protected DtoUredZk: Per.Interface.GUredZkPevDto;
        protected ParametrZdaLogovatGDPR: boolean;
        protected ParametrPerPovStatZam: boolean;
        private readOnly;
        private jeZmenaOsoby;
        private posIxsEsu;
        private ulozeno;
        private grid;
        onContentReady(): void;
        private loadData;
        private getGridFormat;
        private isModified;
        private updateSaveButton;
        private getGridFormatNewOso;
        private isGridValid;
        private isDetailValid;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Pev.WebClient {
    class GSeznamUredZk extends GContentBase {
        private grid;
        onContentReady(): void;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GDetailVysSkoly extends GContentBase {
        private readonly Action;
        private readonly IxsEsu;
        private Dto;
        onContentReady(): void;
    }
}
declare namespace Gordic.Pev.WebClient {
    class GSeznamVysSkoly extends GContentBase {
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Pev.WebClient {
    function NastavitPEV(dto: any): Forms.Form[];
}
