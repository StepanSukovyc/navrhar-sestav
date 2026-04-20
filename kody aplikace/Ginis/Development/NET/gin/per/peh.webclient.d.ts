declare namespace Gordic.Peh.WebClient {
    /**Získání šířky v pixelech, nestringové hodnoty je třeba převést*/
    function getGridCellWidth(value: string, isHeader?: boolean): number;
    /**
     * Získání šířky sloupce podle hodnot v poli
     * @param array Pole objektů
     * @param attr  Název hodnoty
     * @param grid Grid
     * @param datetime Jaký formát se používá u date
     * @returns Šířka v pixelech
     */
    function getWidth<T>(array: T[], attr: keyof T, datetime?: boolean): number;
}
declare namespace Gordic.Peh.WebClient {
    enum EnumActions {
        None = 0,
        New = 1,
        Edit = 2,
        Delete = 3,
        Detail = 4,
        Copy = 5
    }
}
declare namespace Gordic.Peh.WebClient {
    enum DruhDosVysledek {
        Neurceno = 0,
        Vynikajici = 10,
        VelmiDobre = 15,
        Dobre = 20,
        Dostacujici = 30,
        Nevyhovujici = 40
    }
    enum TypOtazky {
        Bodovaci = 1,
        Textova = 2
    }
    enum StavHodnoceni {
        Neurceno = 0,
        Otazky = 200,
        Priprava = 300,
        Pohovor = 400,
        Vyjadreni = 500,
        Nadrizeni = 600,
        Uzavreno = 800
    }
    enum StavDilcihoHodnoceni {
        Otevreno = 20,
        Uzavreno = 50
    }
    enum StavVyhodnoceni {
        Otevreno = 200,
        Uzavreno = 700
    }
    enum StavNavrhuVzd {
        navrzeno = 10,
        schvaleno = 50,
        vyrazeno = 90
    }
    enum TypGenerovano {
        ne = 0,
        castecne = 10,
        ano = 20
    }
    enum RozsahHodnotitelu {
        Zadni = 0,
        VsechnyPpv = 1,
        VybranePpv = 2,
        VybSkupinyClenu = 4,
        Nadrizeny = 8,
        Sebehodnoceni = 16,
        BezSebehod = 32
    }
    enum RozsahVzoru {
        Zadne = 0,
        Vybrane = 1,
        DleKompModelu = 2
    }
    enum TypHodnotitele {
        Nadrizeny = 1,
        VybranePpv = 2
    }
    enum RozsahHodnocenych {
        Zadni = 0,
        VsechnyPpv = 1,
        VybranePpv = 2,
        VybSkupinyClenu = 4,
        VybSkupiny = 8,
        VybTurnusy = 16,
        VybSYM = 32
    }
    enum TypClena {
        Ppv = 1,
        Skupina = 2,
        Vzor = 3,
        Turnus = 4,
        Sym = 5
    }
    enum RozsahZarazeniClena {
        Zadne = 0,
        HodnoceniPpv = 1,
        HodnoceniSkupiny = 2,
        HodnoceniSkupinyClenu = 4,
        HodnoceniTurnusy = 256,
        HodnoceniSym = 512,
        Hodnoceni = 775,
        Vzory = 8,
        HodnotitelPpv = 16,
        HodnotitelSkupinyClenu = 32,
        Hodnotitel = 48,
        Maska = 16777215
    }
    enum FiltrVyberOsoby {
        vsichni = 0,
        vEvidenci = 1,
        aktDobaNeurcita = 2,
        vPracPomeru = 3,
        statZam = 4,
        sluzPomer = 5,
        aktivni = 6,
        dohody = 7,
        zkus_doba = 8,
        ukoncene = 9
    }
    enum RozsahSpravovaniPPV {
        zadne = 10,
        podrizene = 30,
        vsechny = 90
    }
    enum UrovenSchvalHod {
        Ne = 0,
        PrvniUroven = 10,
        DruhaUroven = 20,
        TretiUroven = 30,
        Vse = 80
    }
}
declare namespace Gordic.Peh.WebClient {
    enum TypHodnoceni {
        neurceno = 0,
        periodicke = 10,
        statZam = 20,
        veZkusebniDobe = 30,
        vzdelavacidAkce = 40,
        vzdPlany = 100,
        charSYM = 120,
        sluzPomer = 130
    }
}
declare namespace Gordic.Peh.WebClient {
    enum TypVyjadreniHodn {
        Souhlas = 10,
        SouhlasSVyhr = 20,
        Nesouhlas = 30
    }
}
declare namespace Gordic.Peh.WebClient {
    enum TypZaverHodn {
        OhodnoceniZvysit = 10,
        OhodnoceniPriznat = 15,
        OhodnoceniPonechat = 20,
        OhodnoceniSnizit = 30,
        OhodnoceniOdejmout = 35
    }
}
declare namespace Gordic.Peh.WebClient {
    class GDetailBodovani extends GContentBase {
        protected Action: EnumActions;
        protected IxsBod: string;
        protected DtoBodovani: Per.Interface.GBodovaniDto;
        protected ParametrPehPovAdmin: boolean;
        protected DebugMode: boolean;
        private readOnly;
        private jeZmenaBodu;
        private upravaBodu;
        private odstraneniBodu;
        /**Zda bodování použito v hodnocení*/
        private jePouzitoBodovani;
        private ulozeno;
        private grid;
        onContentReady(): void;
        private getGridFormat;
        /**Zjištění a nastavení min a max hodnoty*/
        private getMinMaxBod;
        private setDisabled;
        private updateSaveButton;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GDetailVzoru extends GContentBase {
        protected Action: EnumActions;
        protected IxsVzo: string;
        protected DtoVzor: Per.Interface.GVzoryDto;
        protected IxsKmo: string;
        protected PodtypOta: number;
        protected IxsBod: string;
        protected DebugMode: boolean;
        protected IxsFun: string;
        protected NazevRf: string;
        private dtoVsechnyModely;
        private dtoVsechnyOkruhy;
        private dtoBodovaniList;
        private zobrOtaDleOkruhu;
        private jeZmenaOtazek;
        private readOnly;
        private povUpravaVzor;
        private povUpravaOta;
        private ulozeno;
        private nodes;
        private poradi;
        private kriteria_tree;
        private kriteria_otazky;
        onContentReady(): void;
        private loadData;
        private setDisabled;
        private getGridFormat;
        /**Načtení dat do obou gridů v případě otevření tabu*/
        private openedTab;
        /**Načtení všech otázek do gridu v případě zavření tabu*/
        private closedTab;
        private updateSaveButton;
        private sortOta;
        private komModelValid;
        private odpovidaOtazkaModelu;
        private getNazevUro;
        /**Import otázek podle kompetenčního modelu*/
        private importOtaKomModel;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GKomModelOta extends GContentBase {
        private prvniBodovani;
        onContentReady(): void;
    }
}
declare namespace Gordic.Peh.WebClient {
    class GSeznamBodovani extends GContentBase {
        protected ParametrPehPovAdmin: boolean;
        protected IxsFun: string;
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Peh.WebClient {
    class GSeznamOtazek extends GContentBase {
        protected IxsFun: string;
        protected NazevRf: string;
        protected ReadOnly: boolean;
        protected ParametrPehPovAdmin: boolean;
        protected DebugMode: boolean;
        private dtoOkruhyView;
        private dtoOtazkyView;
        private dtoPehsbodList;
        private jeZmenaOkruhu;
        private jeZmenaOtazek;
        private validate;
        private currentDtoOkruh;
        private currentDtoOta;
        private fbKriteria;
        private gridKriteria;
        onContentReady(): void;
        private getGridFormat;
        private updateSaveButton;
        private setDisabledOkruhy;
        private isUsedOkruh;
        private setDisabledOtazky;
        private isDataValid;
        private nazevOkruhuValid;
        private spravceOkruhuValid;
        private zneniOtaValid;
        private spravceOtaValid;
        private bodovaniOtaValid;
    }
}
declare namespace Gordic.Peh.WebClient {
    class GSeznamVzoru extends GContentBase {
        protected IxsFun: string;
        private jeEditovatelny;
        private grid;
        onContentReady(): void;
        private getGridFormat;
        private isUsedVzor;
    }
}
declare namespace Gordic.Peh.WebClient {
    class GVybSeznamOta extends GContentBase {
        protected IxsOot: string;
        onContentReady(): void;
    }
}
declare namespace Gordic.Peh.WebClient {
    class GHodVzdPlanu extends GContentBase {
        protected Action: EnumActions;
        protected Hodnoceni: Gordic.Per.Interface.GHodnoceniOsoDto;
        protected TypHodnoceni: Gordic.Per.Interface.GTypHodnoceniDto;
        protected JeNBU: boolean;
        protected IxsEsuFun: string;
        protected IxsPpvFun: string;
        protected IxsPpvFunAll: string[];
        protected IxsPpvPodAll: string[];
        protected ParametrPehSpravPPV: number;
        protected JeCS: boolean;
        protected DebugMode: boolean;
        private dtoPredHod;
        private dtoVyhodnoceniHtel;
        private IsEdit;
        private ReadOnly;
        private JeZmenaPlanu;
        private ZmenitStav;
        private JePredatelne;
        private JePrihlHtelAkt;
        private def_save;
        private isClosing;
        private div_info;
        private tab_vlastnosti;
        private grid_vzdPlan;
        onContentReady(): void;
        private LoadData;
        private IsDataValid;
        private UpdatePlanValid;
        private DruhVzdelaniValid;
        private TemaValid;
        private VzdKurzValid;
        private CilValid;
        private FormaValid;
        private HasChanged;
        private SetVlastnosti;
        private UpdateButtons;
        private JePPVSpravovanPrihOso;
    }
}
/**
 * Gordic.Peh.WebClient
 *
 * @author Michael Jelinek
 * @since 484.1.0.2
 */
declare namespace Gordic.Peh.WebClient {
    class GVzdelaniPeh extends GContentBase {
        protected validators: any;
        Ixsesu: string;
        Action: EnumActions;
        onContentReady(): void;
    }
}
declare namespace Gordic.Peh.WebClient {
    class GGenCharSym extends GContentBase {
        protected Action: EnumActions;
        protected DtoGenerace: Per.Interface.GGeneraceDto;
        protected IxsGen: string;
        protected TypHodnoceni: number;
        protected Nazev: string;
        protected IxsThd: string;
        protected NadHtelZobr: number;
        protected VzoryRozsah: number;
        protected IxsVzo: string;
        protected HtelVyb: number;
        protected HtelZobr: number;
        protected NadHtelVyb: number;
        protected ZobrVys: number;
        protected ZobrVzp: number;
        protected IxsPpvFun: string;
        protected IxsEsuFun: string;
        protected Faze: string;
        protected JePovUprava: boolean;
        protected IxsZmp: string;
        protected NazevRf: string;
        private readOnly;
        private jeZmenaCharSym;
        private ulozeno;
        private grid;
        onContentReady(): void;
        private loadData;
        private setDisabled;
        private updateButton;
        private hasChanged;
        private newDataGen;
        private getGridFormat;
        private charSymValid;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GGenPeriodicke extends GContentBase {
        protected Action: EnumActions;
        protected DtoGenerace: Per.Interface.GGeneraceDto;
        protected IxsGen: string;
        protected TypHodnoceni: number;
        protected NadHtelZobr: number;
        protected Nazev: string;
        protected IxsThd: string;
        protected VzoryRozsah: number;
        protected IxsVzo: string;
        protected HtelVyb: number;
        protected HtelZobr: number;
        protected NadHtelVyb: number;
        protected ZobrVys: number;
        protected ZobrVzp: number;
        protected IxsPpvFun: string;
        protected IxsEsuFun: string;
        protected JeCS: boolean;
        protected JeGBNS: boolean;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerRCZobr: boolean;
        protected Faze: string;
        protected JePovUprava: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        protected IxsZmp: string;
        protected NazevRf: string;
        private readOnly;
        private jeZmenaOsoby;
        private jeZmenaVzoru;
        private dtoHodForm;
        private ulozeno;
        private grid;
        private logDiv;
        onContentReady(): void;
        private getGridFormat;
        private newDataGen;
        private loadData;
        private setDisabled;
        private hasChanged;
        private updateButton;
        private upozorneniPredUlozenim;
        private osobyValid;
        private kontrolaGenerace;
        private saveHodForm;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GGenSluzPomery extends GContentBase {
        protected Action: EnumActions;
        protected DtoGenerace: Per.Interface.GGeneraceDto;
        protected IxsGen: string;
        protected TypHodnoceni: number;
        protected NadHtelZobr: number;
        protected Nazev: string;
        protected IxsThd: string;
        protected VzoryRozsah: number;
        protected IxsVzo: string;
        protected HtelVyb: number;
        protected HtelZobr: number;
        protected NadHtelVyb: number;
        protected ZobrVys: number;
        protected ZobrVzp: number;
        protected IxsPpvFun: string;
        protected IxsEsuFun: string;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerRCZobr: boolean;
        protected Faze: string;
        protected JePovUprava: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        protected IxsZmp: string;
        protected NazevRf: string;
        private readOnly;
        private jeZmenaOsoby;
        private jeZmenaVzoru;
        private dtoHodForm;
        private ulozeno;
        private grid;
        onContentReady(): void;
        private loadData;
        private setDisabled;
        private hasChanged;
        private updateButton;
        private getGridFormat;
        private osobyValid;
        private saveHodForm;
        private newDataGen;
        private kontrolaGenerace;
        private upozorneniPredUlozenim;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GGenStatZam extends GContentBase {
        protected Action: EnumActions;
        protected DtoGenerace: Per.Interface.GGeneraceDto;
        protected IxsGen: string;
        protected TypHodnoceni: number;
        protected NadHtelZobr: number;
        protected Nazev: string;
        protected IxsThd: string;
        protected VzoryRozsah: number;
        protected IxsVzo: string;
        protected HtelVyb: number;
        protected HtelZobr: number;
        protected NadHtelVyb: number;
        protected ZobrVys: number;
        protected ZobrVzp: number;
        protected OsobaGen: Per.Interface.GOsobaGenDto;
        protected IxsVzoGen: string;
        protected IxsPpvFun: string;
        protected IxsEsuFun: string;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerRCZobr: boolean;
        protected Faze: string;
        protected JePovUprava: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        protected IxsZmp: string;
        protected NazevRf: string;
        protected JeMPO: boolean;
        private readOnly;
        private jeZmenaOsoby;
        private jeZmenaVzoru;
        private dtoHodForm;
        private ulozeno;
        private grid;
        private logDiv;
        private labelZakPrace;
        onContentReady(): void;
        private loadData;
        private setDisabled;
        private hasChanged;
        private updateButton;
        private getGridFormat;
        private osobyValid;
        private saveHodForm;
        private newDataGen;
        private kontrolaGenerace;
        private upozorneniPredUlozenim;
        private initOdstavce;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GGenVzdAkce extends GContentBase {
        protected Action: EnumActions;
        protected DtoGenerace: Per.Interface.GGeneraceDto;
        protected IxsGen: string;
        protected TypHodnoceni: number;
        protected Nazev: string;
        protected IxsThd: string;
        protected IxsVzo: string;
        protected ZobrVys: number;
        protected ZobrVzp: number;
        protected NadHtelZobr: number;
        protected VzoryRozsah: number;
        protected HtelVyb: number;
        protected HtelZobr: number;
        protected NadHtelVyb: number;
        protected IxsPpvFun: string;
        protected IxsEsuFun: string;
        protected Faze: string;
        protected JePovUprava: boolean;
        private readOnly;
        private jeZmenaTurnusu;
        private jeZmenaVzoru;
        private dtoHodForm;
        private ulozeno;
        private grid;
        private logDiv;
        onContentReady(): void;
        private loadData;
        private setDisabled;
        private updateButton;
        private newDataGen;
        private getGridFormat;
        private vzdAkceValid;
        private hasChanged;
        private saveHodForm;
        private upozorneniPredUlozenim;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GGenVzdPlanu extends GContentBase {
        protected Action: EnumActions;
        protected DtoGenerace: Per.Interface.GGeneraceDto;
        protected IxsGen: string;
        protected TypHodnoceni: number;
        protected NadHtelZobr: number;
        protected Nazev: string;
        protected IxsThd: string;
        protected VzoryRozsah: number;
        protected HtelVyb: number;
        protected HtelZobr: number;
        protected NadHtelVyb: number;
        protected ZobrVys: number;
        protected ZobrVzp: number;
        protected IxsVzo: string;
        protected IxsPpvFun: string;
        protected IxsEsuFun: string;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerRCZobr: boolean;
        protected Faze: string;
        protected JePovUprava: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        protected IxsZmp: string;
        protected NazevRf: string;
        private readOnly;
        private jeZmenaOsoby;
        private jeZmenaVzoru;
        private dtoHodForm;
        private ulozeno;
        private grid;
        private logDiv;
        onContentReady(): void;
        private loadData;
        private setDisabled;
        private hasChanged;
        private updateButton;
        private getGridFormat;
        private osobyValid;
        private newDataGen;
        private kontrolaGenerace;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GGenZkusDoba extends GContentBase {
        protected Action: EnumActions;
        protected DtoGenerace: Per.Interface.GGeneraceDto;
        protected IxsGen: string;
        protected TypHodnoceni: number;
        protected NadHtelZobr: number;
        protected Nazev: string;
        protected IxsThd: string;
        protected VzoryRozsah: number;
        protected IxsVzo: string;
        protected HtelVyb: number;
        protected HtelZobr: number;
        protected NadHtelVyb: number;
        protected ZobrVys: number;
        protected ZobrVzp: number;
        protected IxsPpvFun: string;
        protected IxsEsuFun: string;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerRCZobr: boolean;
        protected Faze: string;
        protected JePovUprava: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        protected IxsZmp: string;
        protected NazevRf: string;
        private readOnly;
        private jeZmenaOsoby;
        private jeZmenaVzoru;
        private dtoHodForm;
        private ulozeno;
        private grid;
        private logDiv;
        onContentReady(): void;
        private newDataGen;
        private loadData;
        private setDisabled;
        private updateButton;
        private hasChanged;
        private getGridFormat;
        private osobyValid;
        private kontrolaGenerace;
        private saveHodForm;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GGenSeznamPPV extends GContentBase {
        protected TypHodnoceni: number;
        protected VzoryRozsah: number;
        protected NadHtelZobr: number;
        protected HtelVyb: number;
        protected HtelZobr: number;
        protected NadHtelVyb: number;
        protected IxsThd: string;
        protected ObdobiOd: JsonDate;
        protected ObdobiDo: JsonDate;
        protected JeCS: boolean;
        protected JeBIS: boolean;
        protected JeSZPI: boolean;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerRCZobr: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        private omezitPlatnostPPV;
        private jeOdpraObdobi;
        private filter;
        private grid;
        onContentReady(): void;
        private typOsob;
        private getGridFormat;
    }
}
declare namespace Gordic.Peh.WebClient {
    class GGenSeznamSym extends GContentBase {
        protected TypHodnoceni: number;
        protected IxsThd: string;
        protected Datum: JsonDate;
        protected IxsOce: string;
        protected ParametrZdaLogovatGDPR: boolean;
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
declare namespace Gordic.Peh.WebClient {
    class GGenSeznamTur extends GContentBase {
        protected TypHodnoceni: number;
        protected IxsThd: string;
        private filter;
        private grid;
        onContentReady(): void;
        private getGridFormat;
        private getGridFormatAutoWidth;
    }
}
declare namespace Gordic.Peh.WebClient {
    class GSeznamGeneraci extends GContentBase {
        protected TypHodnoceni: number;
        protected IxsThd: string;
        protected HtelZobr: number;
        protected ReadOnly: boolean;
        protected Nazev: string;
        protected NadHtelZobr: number;
        protected HtelVyb: number;
        protected NadHtelVyb: number;
        protected VzoryRozsah: number;
        protected IxsVzo: string;
        protected ZobrVys: number;
        protected ZobrVzp: number;
        protected IxsPpvFun: string;
        private filter;
        private roky;
        private konec_obdobi;
        private grid;
        private filterpanel;
        onContentReady(): void;
        private getGridFormat;
        private getRoky;
    }
}
declare namespace Gordic.Peh.WebClient {
    class GHodCharPracSym extends GContentBase {
        protected Action: EnumActions;
        protected Hodnoceni: Gordic.Per.Interface.GHodnoceniCharDto;
        protected TypHodnoceni: Gordic.Per.Interface.GTypHodnoceniDto;
        protected IxsPpvFunAll: string[];
        protected IxsPpvPodAll: string[];
        protected IxsEsuFun: string;
        protected IxsPpvFun: string;
        protected NazevFun: string;
        protected ParametrPehSpravPPV: number;
        protected ParametrZdaLogovatGDPR: boolean;
        protected JeCS: boolean;
        protected DebugMode: boolean;
        private isEdit;
        private readOnly;
        private zmenitStav;
        private jePredatelne;
        private charExistuje;
        private jeZmenaChar;
        private jeZmenaJazyky;
        private jePrihlHtelAkt;
        private jeZmenaHod;
        private jeZmenaVyh;
        private jePovPrvniFaze;
        private dtoCharSym;
        private dtoPredHod;
        private dtoOborSluzbyChar;
        private dtoVyhodnoceni;
        private dtoOborySluzbyList;
        private dtoJazykyList;
        private dtoTextSpecList;
        private ulozeno;
        private readonly maxSkupiny;
        private groupCount;
        private skupiny;
        private groups;
        private serverFilter;
        private form_detail;
        private form_vlastnosti;
        private tab_cinnosti;
        private form_nejnCin;
        private tab_ostCin;
        private grid_ostCin;
        private form_ostCin;
        private tab_poz;
        private tab_jazZnal;
        private tabmanager;
        private form_dalsiPoz;
        private form_zastup;
        onContentReady(): void;
        private gridFormatOstatniCinnosti;
        private loadData;
        private setVlastnosti;
        private jePPVSpravovanPrihOso;
        private loadCinObory;
        private updateButtons;
        private jeZmenaSpecifikaceCinZvlPripl;
        private jeZmenaSpecifikaceCinZtizProsPripl;
        private jeZmenaSpecifikaceCinPriplNoc;
        private jeZmenaSpecifikaceCinOvlZdrv;
        private jeZmenaSpecifikaceOdpoCin;
        private jeZmenaZpracOso;
        private isDataValid;
        private charValid;
        private nejnarCinValid;
        private verZakValid;
        private datPodpisHodnotiteleValid;
        private datPodpisStatTajValid;
        private JazykyUlozit;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GHodCharSluzSym extends GContentBase {
        protected Hodnoceni: Gordic.Per.Interface.GHodnoceniCharDto;
        protected TypHodnoceni: Gordic.Per.Interface.GTypHodnoceniDto;
        protected Action: EnumActions;
        protected IxsPpvFunAll: string[];
        protected IxsPpvPodAll: string[];
        protected IxsEsuFun: string;
        protected IxsPpvFun: string;
        protected NazevFun: string;
        protected ParametrPehSpravPPV: number;
        protected ParametrZdaLogovatGDPR: boolean;
        protected JeCS: boolean;
        protected DebugMode: boolean;
        private readOnly;
        private isEdit;
        private zmenitStav;
        private jePredatelne;
        private charExistuje;
        private jeZmenaChar;
        private jeZmenaVyh;
        private jePrihlHtelAkt;
        private jeZmenaHod;
        private jeZmenaJazyky;
        private jePovPrvniFaze;
        private dtoCharSym;
        private dtoPredHod;
        private dtoOborSluzbyChar;
        private dtoVyhodnoceni;
        private dtoCinnost;
        private dtoJazykyList;
        private dtoTextSpecList;
        private ulozeno;
        private readonly maxSkupiny;
        private groupCount;
        private skupiny;
        private groups;
        private div_detail;
        private tab_vlastnosti;
        private tab_cinnosti;
        private tab_spr_cin;
        private grid_spr_cin;
        private div_spravCin;
        private tab_ost_cin;
        private grid_ost_cin;
        private div_ostCin;
        private tab_dalsi_poz;
        private tab_jaz;
        private tabmanager;
        private div_dalsiPoz;
        private div_zastup;
        onContentReady(): void;
        private loadData;
        private loadCinnosti;
        private setVlastnosti;
        private jePPVSpravovanPrihOso;
        private jeZmenaSpecifikaceCinZvlPripl;
        private jeZmenaSpecifikaceCinZtizProsPripl;
        private jeZmenaSpecifikaceCinPriplNoc;
        private jeZmenaSpecifikaceCinOvlZdrv;
        private jeZmenaSpecifikaceOdpoCin;
        private isDataValid;
        private charValid;
        private nejnarCinnostValid;
        private spravRizValid;
        private verZakValid;
        private datPodpisHnehoValid;
        private datPodpisHodnotiteleValid;
        private datPodpisStatTajValid;
        private JazykyUlozit;
        private updateButtons;
        closing(): {
            ulozeno: boolean;
        };
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Michael Jelinek
 * @since 480.2.0.6
 */
declare namespace Gordic.Peh.WebClient {
    class GHodPeriodicke extends GContentBase {
        protected Hodnoceni: Gordic.Per.Interface.GHodnoceniOsoDto;
        protected TypHodnoceni: Gordic.Per.Interface.GTypHodnoceniDto;
        protected dtoVyhodnoceni: Gordic.Per.Interface.GVyhodnoceniDto[];
        protected validators: any;
        protected JeGBNS: boolean;
        protected IxsPpvFunAll: string[];
        protected IxsPpvPodAll: string[];
        protected IxsEsuFun: string;
        protected IxsPpvFun: string;
        protected NazevFun: string;
        protected ParametrZdaLogovatGDPR: boolean;
        protected ParametrPehSpravPPV: number;
        protected JeCS: boolean;
        protected DebugMode: boolean;
        Today: any;
        Action: EnumActions;
        TypZaverHodn: TypZaverHodn;
        TypVyjadreniHodn: TypVyjadreniHodn;
        private dtoPredHodnoceni;
        private dtoVyhodHtel;
        private dtoVyhodHneho;
        private dtoVyhodNadHtel;
        private dtoDilciHodHtel;
        private dtoDilciHodHneho;
        private dtoPozHodList;
        private dtoOtazkyList;
        private dtoOkruhyList;
        private readOnly;
        private isEdit;
        private zmenitStav;
        private jePredatelne;
        private jePrihlHtelAkt;
        private jePrihlHnyAkt;
        private jePrihlNadHtelAkt;
        private jsouNNVEdit;
        private jeEditHtel;
        private jeEditHny;
        private jeEditNadHtel;
        private jePovEditVypHod;
        private jePovEditVypHodHneho;
        private jeZmenaOtazek;
        private jeZmenaPozadavek;
        private zobrOtaDleOkruhu;
        private bodovaniOtazek;
        private ulozeno;
        private div_detail;
        private tab_vlastnosti;
        private tab_kriteria;
        private tab_krit_tree;
        private tab_krit_ota;
        private div_kriteria_frm;
        private grid_ipv;
        private div_hodnotitel;
        private div_hodnoceny;
        private div_nad_hod;
        onContentReady(): void;
        private getGridFormatOtazky;
        private loadData;
        private setVlastnosti;
        private loadOtazky;
        private jePPVSpravovanPrihOso;
        /**Nastavení bodů pro otázky*/
        private setBody;
        private updateButtons;
        private isDataValid;
        private otazkyValid;
        private navrhyNaVzdValid;
        private hodHtelZaverValid;
        private hnyVyjadreniValid;
        private nadHtelVyjadreniValid;
        private hasChanged;
        private jeZmenaVyhod;
        private jeZmenaVyhodHtel;
        private jeZmenaVyhodHny;
        private jeZmenaVyhodNadHtel;
        private jeZmenaDilciHod;
        private jeZmenaNavrhVzd;
        private vypoctiCelkVysledek;
        /**Nastaví celkové hodnocení za oblast a váhu hodnocené oblasti*/
        private setCelkHodSum;
        private bodovaNormovane;
        private openedTab;
        private closedTab;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GHodPrubezne extends GContentBase {
        protected Action: EnumActions;
        protected Hodnoceni: Gordic.Per.Interface.GHodnoceniOsoDto;
        protected TypHodnoceni: Gordic.Per.Interface.GTypHodnoceniDto;
        protected IxsPpvFunAll: string[];
        protected IxsPpvPodAll: string[];
        protected IxsEsuFun: string;
        protected IxsPpvFun: string;
        protected NazevFun: string;
        protected ParametrZdaLogovatGDPR: boolean;
        protected ParametrPehSpravPPV: number;
        protected JeCS: boolean;
        protected DebugMode: boolean;
        private readOnly;
        private isEdit;
        private zmenitStav;
        private jePredatelne;
        private jePovEditVypHod;
        private jePovEditVypHodHneho;
        private jeEditHtel;
        private jeEditHny;
        private jeEditNadHtel;
        private jePrihlHtelAkt;
        private jePrihlHnyAkt;
        private jePrihlNadHtelAkt;
        private jeZmenaOtazek;
        private zobrOtaDleOkruhu;
        private dtoPlatovyVymer;
        private dtoPredHod;
        private dtoVyhodHtel;
        private dtoVyhodHneho;
        private dtoVyhodNadHtel;
        private dtoDilciHodnoceniHtel;
        private dtoDilciHodnoceniHneho;
        private dtoPracPomer;
        private dtoOtazkyList;
        private dtoSlozkyPlatVymList;
        private dtoOkruhyList;
        private priplatekPred;
        private platTarif;
        private vysledekHod;
        private bodovaniOtazek;
        private ulozeno;
        private kriteria;
        private grid_krit_tree;
        private grid_krit_ota;
        private div_ukoly;
        private div_hodnotitel;
        private div_hodnoceny;
        private div_nad_hod;
        onContentReady(): void;
        private loadData;
        private getCastkaSlozky;
        private setBody;
        private setVlastnosti;
        private jePPVSpravovanPrihOso;
        private updateButtons;
        private hasChanged;
        private jeZmenaVyhodHtel;
        private jeZmenaVyhodHny;
        private jeZmenaVyhodNadHtel;
        private jeZmenaDilciHod;
        private isDataValid;
        private otazkyValid;
        private rozCileValid;
        private aktPriplatekValid;
        private htelZaverValid;
        private hnyVyjadreniValid;
        private nnyVyjadreniValid;
        private setCelkHodSum;
        private vypoctiCelkVysledek;
        private bodovaNormovane;
        private openedTab;
        private closedTab;
        private getGridFormatOtazky;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GHodSluzPomery extends GContentBase {
        protected Action: EnumActions;
        protected Hodnoceni: Gordic.Per.Interface.GHodnoceniOsoDto;
        protected TypHodnoceni: Gordic.Per.Interface.GTypHodnoceniDto;
        protected IxsPpvFunAll: string[];
        protected IxsPpvPodAll: string[];
        protected IxsEsuFun: string;
        protected IxsPpvFun: string;
        protected NazevFun: string;
        protected ParametrPehSpravPPV: number;
        protected ParametrZdaLogovatGDPR: boolean;
        protected JeCS: boolean;
        protected DebugMode: boolean;
        private isEdit;
        private readOnly;
        private zmenitStav;
        private jePredatelne;
        private jePrihlHtelAkt;
        private jePovEditVypHod;
        private jeZmenaOtazek;
        private zobrOtaDleOkruhu;
        private dtoDilciHodHtel;
        private dtoPracPomer;
        private dtoPredHod;
        private dtoVyhodnoceni;
        private dtoStavHodnoceniList;
        private dtoOkruhyList;
        private ulozeno;
        private div_detail;
        private tab_vlastnosti;
        private tab_kriteria;
        private tab_krit_tree;
        private tab_krit_ota;
        private div_ukoly;
        private div_hodnotitel;
        onContentReady(): void;
        private getGridFormat;
        private loadData;
        private setVlastnosti;
        private jePPVSpravovanPrihOso;
        private updateButtons;
        private stavHodPo;
        private hasChanged;
        private jeZmenaHod;
        private jeZmenaVyhod;
        private JeZmenaDilciHod;
        private isDataValid;
        private otazkyValid;
        private rozCileValid;
        private vysledekValid;
        private datPodpisHnehoValid;
        private datPodpisHodnotiteleValid;
        private openedTab;
        private closedTab;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GHodStatZam extends GContentBase {
        protected Action: EnumActions;
        protected Hodnoceni: Gordic.Per.Interface.GHodnoceniOsoDto;
        protected TypHodnoceni: Gordic.Per.Interface.GTypHodnoceniDto;
        protected IxsPpvFunAll: string[];
        protected IxsPpvPodAll: string[];
        protected IxsEsuFun: string;
        protected IxsPpvFun: string;
        protected NazevFun: string;
        protected ParametrPehSpravPPV: number;
        protected ParametrZdaLogovatGDPR: boolean;
        protected ParametrPehKopirovaniHod: boolean;
        protected JeSZPI: boolean;
        protected JeUOHS: boolean;
        protected PredPriplatek: JsonDecimal;
        protected PlatTarifMax: JsonDecimal;
        protected ParametrPehPovSchvalHodnoceni: number;
        protected JeCS: boolean;
        protected DebugMode: boolean;
        private isEdit;
        private readOnly;
        private zmenitStav;
        private jePredatelne;
        private jsouVzdPozadavky;
        private jeZmenaPlanu;
        private jeZmenaOtazek;
        private jePovEditVypHod;
        private jeMoznaVyjimka;
        private jePrihlHtelAkt;
        private jePrvniFaze;
        private zobrOtaDleOkruhu;
        private dtoPredHod;
        private dtoDilciHodHtel;
        protected DtoPlatovyVymer: Per.Interface.GPlatovyVymerDto;
        private dtoVyhodnoceni;
        private dtoPracPomer;
        private dtoStavyHodnoceni;
        private dtoOkruhyList;
        private viewOtazky;
        private bodovaniOtazek;
        private druhVysledekHod;
        private rokKonceObd;
        private vysledekHodZnalosti;
        private vysledekHod;
        private ixsPpvPred;
        private strPredHod;
        private strJazyky;
        private strOborySluzby;
        private maxPripl;
        private maxPriplVal;
        private ulozeno;
        private div_detail;
        private div_vlastnosti;
        private tab_kriteria;
        private grid_krit_tree;
        private grid_krit_ota;
        private div_kriteria_frm;
        private div_cile;
        private tab_kurz;
        private div_hodnotitel;
        private grid_vzdKurzy;
        onContentReady(): void;
        private dataFillForms;
        private loadData;
        private setVlastnosti;
        private updateButtons;
        private setMaxPriplatek;
        private vypocetOblasti;
        private setBody;
        private gridFormatOtazky;
        private setCelkHodAVahu;
        private setCelkVysledek;
        private jePPVSpravovanPrihOso;
        private hasChanged;
        private jeZmenaHod;
        private jeZmenaVyhod;
        private JeZmenaDilciHod;
        private isDataValid;
        private otazkyValid;
        private rozCileValid;
        private planValid;
        private vzdKurzValid;
        private duvodVVUOValid;
        private priplatekNavrhValid;
        private datPodpisHodnotitelValid;
        private datPodpisStatTajValid;
        private datPodpisHnehoValid;
        private getStavHodPo;
        private setVysledek;
        private bodovaNormovane;
        private openedTab;
        private closedTab;
        private getGridFormatOtazkyAutoWidth;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GHodVzdAkce extends GContentBase {
        protected Action: EnumActions;
        protected Hodnoceni: Gordic.Per.Interface.GHodnoceniTurDto;
        protected TypHodnoceni: Gordic.Per.Interface.GTypHodnoceniDto;
        protected IxsPpvFunAll: string[];
        protected IxsPpvPodAll: string[];
        protected IxsEsuFun: string;
        protected IxsPpvFun: string;
        protected NazevFun: string;
        protected ParametrPehSpravPPV: number;
        protected JeCS: boolean;
        protected DebugMode: boolean;
        private dtoVyhod;
        private dtoDilciHod;
        private dtoOkruhyList;
        private isEdit;
        private readOnly;
        private zmenitStav;
        private jePredatelne;
        private jeZmenaOtazek;
        private jePrihlHtelAkt;
        private jePovEditVypHod;
        private zobrOtaDleOkruhu;
        private bodovaniOtazek;
        private ulozeno;
        private kriteria;
        private grid_krit_tree;
        private grid_krit_ota;
        onContentReady(): void;
        private loadData;
        private setVlastnosti;
        private setBody;
        private updateButtons;
        private jePPVSpravovanPrihOso;
        private hasChanged;
        private jeZmenaHod;
        private jeZmenaVyhod;
        private jeZmenaDilciHod;
        private isDataValid;
        private otazkyValid;
        private zpravaValid;
        private vyjadreniValid;
        private vypoctiCelkVysledek;
        private bodovaNormovane;
        private openedTab;
        private closedTab;
        private getGridFormatOtazky;
        closing(): {
            ulozeno: boolean;
        };
    }
}
/**
 * Gordic.Peh.WebClient
 *
 * @author Michael Jelinek
 * @since 480.2.0.6
 */
declare namespace Gordic.Peh.WebClient {
    class GHodZkusDoba extends GContentBase {
        protected Action: EnumActions;
        protected Hodnoceni: Gordic.Per.Interface.GHodnoceniZDOsoDto;
        protected TypHodnoceni: Gordic.Per.Interface.GTypHodnoceniDto;
        protected JeRozHodZkusDoba: boolean;
        protected JePrvniHod: boolean;
        protected IxsEsuFun: string;
        protected IxsPpvFun: string;
        protected NazevFun: string;
        protected IxsPpvPodAll: string[];
        protected ParametrPehSpravPPV: number;
        protected JeCS: boolean;
        protected DebugMode: boolean;
        protected validators: any;
        protected Ixsesu: any;
        today: any;
        private dtoVyhodHneno1;
        private dtoVyhodHneno2;
        private dtoDilciHod1;
        private dtoDilciHod2;
        private dtoPozadavky1List;
        private dtoPozadavky2List;
        private dtoOkruhyList;
        private isEdit;
        private readOnly;
        private jeZmenaOtazek;
        private jeZmenaPozadavek1;
        private jeZmenaPozadavek2;
        private jePredatelne;
        private jePrihlHtelAkt;
        private jePrihlHnyAkt;
        private jsouVyjadreni1Edit;
        private jsouVyjadreni2Edit;
        private jsouNNVEdit;
        private jePovEditVypHod1;
        private jePovEditVypHod2;
        private zobrOtaDleOkruhu;
        private zmenitStav;
        private bodovaniOtazek;
        private ulozeno;
        private kriteria;
        private tab_krit_tree;
        private tab_krit_ota;
        private ipv;
        private ipv1Pol;
        private ipv2Pol;
        onContentReady(): void;
        private loadData;
        private setVlasnosti;
        private jePPVSpravovanPrihOso;
        private setBody;
        private updateButtons;
        private hasChanged;
        private hodnoceniChanged;
        private vyhodChanged;
        private dilciHodChanged;
        private navrhVzdChanged;
        private isDataValid;
        private otazkyValid;
        private NNV1Valid;
        private NNV2Valid;
        private vyjadreni1Valid;
        private vyjadreni2Valid;
        private bodovaNormovane;
        private openedTab;
        private closedTab;
        private createGridOtazky;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Peh.WebClient {
    class GCinnostKatalogTabChar extends GContentBase {
        protected JeSluzMisto: boolean;
        protected Action: EnumActions;
        protected IxsHciKpr: string;
        protected DruhTab: number;
        protected PlatTrida: string;
        protected Datum: Date;
        protected PovolaniList: Per.Interface.GPovolaniSymDto[];
        private jeVicePraci;
        private platStupen;
        private dtoCinnostiSymList;
        private grid;
        onContentReady(): void;
        private getGridFormat;
        private loadData;
        private setPlatTrida;
        private loadDataGrid;
    }
}
declare namespace Gordic.Peh.WebClient {
    class GSeznamOsobImport extends GContentBase {
        protected HodnoceniList: Gordic.Per.Interface.GHodnoceniOsoDto[];
        protected HodnoceniVybrane: Gordic.Per.Interface.GHodnoceniOsoDto[];
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
/**
 * Gordic.Peh.WebClient
 *
 * @author Michael Jelinek
 * @since 484.1.0.2
 */
declare namespace Gordic.Peh.WebClient {
    class GSeznamHodnoceni extends GContentBase {
        protected Action: EnumActions;
        protected TypHodnoceni: number;
        protected IxsThd: string;
        protected Nazev: string;
        protected IxsGen: string;
        protected ZobrVys: number;
        protected ZobrVzp: number;
        protected ZobrazitRok: boolean;
        protected NadHtelZobr: number;
        protected VzoryRozsah: number;
        protected IxsVzo: string;
        protected HtelVyb: number;
        protected HtelZobr: number;
        protected NadHtelVyb: number;
        protected JeSZPI: boolean;
        protected JeUOHS: boolean;
        protected JeBIS: boolean;
        protected JeCS: boolean;
        protected JeGBNS: boolean;
        protected JeMPO: boolean;
        protected ParametrPehSpravPPV: RozsahSpravovaniPPV;
        protected ParametrPehPovSchvalHodnoceni: UrovenSchvalHod;
        protected DebugMode: boolean;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerRCZobr: boolean;
        protected ParametrPehRozHodZkusDobe: boolean;
        protected IxsPpvFunAll: string[];
        protected IxsPpvPodAll: string[];
        protected ParametrZdaLogovatGDPR: boolean;
        protected ParametrPerGenerovatPdf: number;
        protected JeExterniSSL: boolean;
        protected DenikCj: string;
        protected TypDeniku: number;
        private readOnly;
        private konec_obdobi;
        private roky;
        private grid;
        private filterpanel;
        private filter;
        onContentReady(): void;
        private getColumnList;
        private getGridFormat;
        private getCondFormats;
        private getRoky;
        private jePPVSpravovanPrihOso;
        private getGridFormatAutoWidth;
        /**
         * Schválení hodnocení pro SZPI
         *
         * @param dtoKeSchvaleni
         */
        private schvalHod;
        private vytvorDokument;
        /**
         * Vytvoření spisu
         * @param ixp Identifikátor dokumentu
         * @param ixs_esu Identifikátor osoby pro vytvoření dotčeného subjektu
         * @returns Identifikátor spisu (ixp_spis)
         */
        private vytvorSpis;
        private stornoDokumentu;
        private vlozDoSpisu;
    }
}
/**
 * Gordic.Peh.WebClient
 *
 * @author Michael Jelinek
 * @since 480.2.0.6
 */
declare namespace Gordic.Peh.WebClient {
    class GDetailOsobyPeh extends GContentBase {
        protected Action: EnumActions;
        protected dtoDetailOsoby: Gordic.Per.Interface.GSeznamOsobDto;
        protected validators: any;
        protected IxsEsu: string;
        protected TypHod: number;
        protected JeStatZamHod: boolean;
        protected JeCS: boolean;
        protected JeNBU: boolean;
        protected ParametrPerRCZobr: boolean;
        private grid;
        onContentReady(): void;
        private getGridFormat;
    }
}
/**
 * Gordic.Peh.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.6
 */
declare namespace Gordic.Peh.WebClient {
    class GInfoPanel extends GContentBase {
        protected ParametrPehPristGen: number;
        protected JeHodVzdPlany: boolean;
        protected JePeriodickeHod: boolean;
        protected JeCS: boolean;
        protected IxsEsuFun: string;
        protected TypHodStatZam: Gordic.Per.Interface.GTypHodnoceniDto;
        protected PovoleniHodZprac: boolean;
        protected PovoleniOsoBezHod: boolean;
        protected PovoleniStatZamBezHod: boolean;
        protected ParametrPehOsoProchPPV: number;
        protected ParametrZdaLogovatGDPR: boolean;
        protected OtevrenoZSeznamuOsob: boolean;
        private Filter;
        private NacteneZaznamy;
        private typHodnoceni;
        private PocetDnu;
        private VzoryList;
        private readonly tabGridHodZpracName;
        private readonly tabGridOsoBezHodName;
        private readonly tabGridStatZamBezHodName;
        private readonly tabGridStatZamName;
        private divGrids;
        private tabGridHodZprac;
        private gridHodZprac;
        private tabGridOsoBezHod;
        private gridOsoBezHod;
        private tabGridStatZamBezHod;
        private gridStatZamBezHod;
        private tabGridStatZam;
        private gridStatZam;
        private tabmanager;
        private idTab;
        onContentReady(): void;
        private JeEsu;
        private GetCtvrtRok;
        private GetGridFormatHodZprac;
        private GetGridFormatOsoBezHod;
        private GetGridFormatStatZam;
        private GetGridFormatStatZamBezHod;
    }
}
/**
 * Gordic.Peh.WebClient
 *
 * @author Tomáš Vítek
 * @since 480.2.0.5
 */
declare namespace Gordic.Peh.WebClient {
    class GSeznamOsob extends GContentBase {
        protected JeKUSK: boolean;
        protected JeVNOL: boolean;
        protected JeCT: boolean;
        protected JeMPO: boolean;
        protected ParametrPerPovStatZam: boolean;
        protected ParametrPerRCZobr: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        protected ParametrPehHodProchPPV: number;
        protected DebugMode: boolean;
        private descriptionMasky;
        private showSeznamOsob;
        private filterpanel;
        private filter;
        private grid;
        private zaznamy;
        private gsidebar;
        private infopanel;
        private PovoleniMasekOsob;
        onContentReady(): void;
        private getGridFormat;
        private initTypOsob;
        private initFilter;
    }
}
declare namespace Gordic.Peh.WebClient {
    function NastavitPEH(dto: Peh.WebClient.GSettingsPEHDto): Forms.Form[];
}
