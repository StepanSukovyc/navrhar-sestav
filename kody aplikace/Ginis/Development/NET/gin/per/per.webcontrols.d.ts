declare namespace Gordic.Per.WebControls {
    enum EnumActions {
        None = 0,
        New = 1,
        Edit = 2,
        Delete = 3,
        Detail = 4,
        Copy = 5
    }
    enum DateCompareOperation {
        Equal = 0,
        Greater = 1,
        GreaterOrEqual = 2,
        Less = 3,
        LessOrEqual = 4
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
    /**Úroveň režimu pouze prohlížení podřízených dle přihlášené funkce*/
    enum UrovenPouzeProhlizeniPev {
        /**Standardní režim*/
        ne = 0,
        /**Pouze prohlížení*/
        ano = 1,
        /**Povolení omezené editace - možné zadat vzdělávací požadavky a tisk některých sestav*/
        ano_omezene = 10
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
    enum StavVyhodnoceni {
        Otevreno = 200,
        Uzavreno = 700
    }
    enum TypZaverHodn {
        OhodnoceniZvysit = 10,
        OhodnoceniPriznat = 15,
        OhodnoceniPonechat = 20,
        OhodnoceniSnizit = 30,
        OhodnoceniOdejmout = 35
    }
    enum StavNavrhuVzd {
        navrzeno = 10,
        schvaleno = 50,
        vyrazeno = 90
    }
    /**Ikony pro ISoSS stav odeslání*/
    enum ISoSSStavOdeslaniIcon {
        /**10 - Neodesláno*/
        neodeslano = "gi-vypraveno gi-stack-bg |fa-plus g-state-text g-state-info gi-stack-pos--rt",
        /**20 - Odesláno přijetí nepotvrzeno*/
        odeslanoNepotvrzeno = "gi-vypraveno gi-stack-bg |fa-question-circle gi-bgw g-state-text g-state-warning gi-stack-pos--rb",
        /**30 - Odesláno přijetí potvrzeno */
        odeslanoPovtrzeno = "gi-vypraveno gi-stack-bg |gi-schvaleno g-state-text g-state-success gi-stack-pos--rb",
        /**40 - Odesláno  odmítnuto*/
        odeslanoOdmitnuto = "gi-vypraveno gi-stack-bg |fa-times-circle g-state-text g-state-error gi-stack-pos--rb",
        /**50 - Stornováno obsluhou*/
        stornovano = "fa-times-circle g-state-text g-state-important",
        /**60 - Odstraněno z ISoSS*/
        odstranenoIsoss = "gi-skartace"
    }
    /**Ikony pro typ záznamu*/
    enum ISoSSTypZaznamuIcon {
        zalozeniZmeny = "gi-zasilka",
        odstraneniZmeny = "gi-zasilka |fa-times-circle g-state-text g-state-error gi-stack-pos--rb gi-bgw"
    }
    /**ISoSS druh hlášení*/
    enum DruhHlaseni {
        None = -1,
        Error = 0,
        Warning = 1,
        Question = 2,
        Ok = 3,
        Information = 4
    }
    /**ISoSS Typ odpovědi*/
    enum TypOdpovedi {
        /**Neurčeno*/
        neurceno = -666,
        /**Vše*/
        vse = -1,
        /**I - Informace*/
        informace = 0,
        /**W - Varování*/
        varovani = 1,
        /**E - Chyba*/
        chyba = 2
    }
    /**ISoSS TypDat*/
    enum TypDat {
        /**Neurčeno*/
        neurceno = 0,
        /**Odpovědi ISoSS*/
        odpovedi = 1,
        /**Hlavička*/
        OSS = 2,
        /**Nový SZ*/
        NSZ = 3,
        /**Změna SZ*/
        ZSZ = 4,
        /**Výmaz SZ*/
        DSZ = 5,
        /**Nový pracovní poměr nebo poměr na služebním místě*/
        NOZ = 6,
        /**Změna pracovního poměru nebo poměru na služebním místě*/
        ZOZ = 7,
        /**Výmaz pracovního poměru nebo poměru na služebním místě*/
        DOZ = 8
    }
    enum Pusobnost {
        samostatna = 0,
        manazerska = 1,
        obsluzna = 2
    }
    /**Úroveň formy externího Id SYM a OCE pro ISoSS*/
    enum UrovenExtIdISoSS {
        /**ID*/
        ID = 0,
        /**PID*/
        PID = 10,
        /**Číslo vytvořené z PIDu*/
        Cislo_PID = 20
    }
    enum RadioValueJinCin {
        Oznameni = "oznameni",
        Povoleni = "povoleni"
    }
    /**Určuje trvání průběhu mentoringu*/
    enum DruhTrvaniPrubehuMen {
        /**Den*/
        den = 0,
        /**Měsíc*/
        mesic = 1,
        /**Rok*/
        rok = 2,
        /**Určité období*/
        obdobi = 3
    }
    /**Určuje sazebni jednotku*/
    enum SazebniJednotka {
        /**Kč za úkon*/
        ukon = 0,
        /**Kč za hodinu*/
        hod = 1,
        /**Kč za den*/
        den = 2,
        /**Kč za měsíc*/
        mesic = 3
    }
    /**Určuje sazebni jednotku - text*/
    const SazebniJednotkaTxt: Record<SazebniJednotka, string>;
    /**Úroveň nastavení kontroly na překročení doby mateřské a rodičovské dovolené*/
    enum UroKonMaterska {
        /**žádná kontrola*/
        BezKontroly = 0,
        /**kontrola na 3 roky*/
        TriRoky = 10,
        /**kontrola na 6 let*/
        SestLet = 20,
        /**kontrola na 3 i 6 let*/
        VsechnyKontroly = 30
    }
    /**Určuje editaci per. opatření*/
    enum DruhEditPO {
        /**Žádná*/
        zadna = 0,
        /**Nová*/
        nova = 1,
        /**Import existujícího*/
        existujici = 2
    }
    /**Určuje, na kterém políčku se má provádět přepočet*/
    enum DruhPrepoctuVymeru {
        Celkem = 0,
        PohyblivaCast = 1,
        PevnaCast = 2
    }
    /**Úroveň započtení data zápočtu do zápočtu praxe*/
    enum UrovenZapDataZap {
        /**Nezapočte se datum zápočtu praxe*/
        ne = 0,
        /**Započte se datum zápočtu praxe*/
        ano = 1,
        /**Započte se datum zápočtu praxe, ale posune se výpočet plat. postupu*/
        ano_posun_postupu = 10
    }
    /**Úroveň evidence údajů*/
    enum UrovenEvidUdaju {
        /**Údaj se nebude evidovat*/
        ne = 0,
        /**Údaj se bude evidovat*/
        ano = 10,
        /**Údaj se bude povinně evidovat*/
        ano_povinne = 20,
        /**Údaj se bude povinně evidovat a bude se přenášet do PER*/
        ano_prenaset = 30,
        /**Údaj se bude přenášet do PER a v PER zakázat editaci*/
        ano_pr_zak = 40
    }
    enum FiltrTypPPV {
        /**Státní zaměstnanci*/
        SZ = 0,
        /**Občanští zaměstnanci*/
        OZ = 1
    }
    /**ISoSS - stav odeslaní*/
    enum FiltrMaska {
        /**Všechny*/
        vse = 0,
        /**Neodeslané*/
        neodeslane = 1,
        /**Odeslané*/
        odeslane = 2,
        /**Neodeslané*/
        zpracovane = 3,
        /**Odmítnuté*/
        odmitnute = 4,
        /**Stornované*/
        stornovane = 5,
        /**Zrušené*/
        zrusene = 6
    }
    /**Úroveň základních údajů evidence personálních opatření osoby*/
    enum UrovenEvidZakOpaOso {
        /**Pouze druh personálního opatření*/
        druh = 0,
        /**Druh a důvod personálního opatření*/
        druh_duvod = 10,
        /**Druh a popis personálního opatření*/
        druh_popis = 20,
        /**Eviduje se druh, důvod a popis personálního opatření*/
        vse = 30
    }
    /**Úroveň sledování personálních opatření osoby*/
    enum UrovenEvidPerOpatreni {
        /**Zakazuje používání personálních opatření osoby*/
        ne = 0,
        /**Eviduje se jen pohyb*/
        ano = 10,
        /**Eviduje se včetně autora rozhodnutí, data rozhodnutí, atd.*/
        ano_rozsireno = 20
    }
    /**Úroveň podrobného sledování změn osoby*/
    enum UrovenSledovaniZmen {
        /**Zakazuje používání podrobného sledování změn osoby*/
        ne = 0,
        /**Povoluje používání podrobného sledování změn osoby*/
        ano = 1,
        /**Povoluje používání podrobného sledování změn osoby včetně propojení s personálními opatřeními osoby*/
        ano_opatreni = 10
    }
    /**Filtr na typ osob*/
    enum FiltrVyberFKSPOsoby {
        /**Všechny osoby*/
        vsichni = 0,
        /**v evidenci*/
        vEvidenci = 1,
        /**v pracovním poměru bez dohod*/
        vPracPomeru = 2,
        /**v pracovním poměru bez dohod bez některých vynětí podle rozpočtové části osobního konta*/
        vPracPomeruRozpocet = 3,
        /**Ve vynětí*/
        veVyneti = 4,
        /**Osoby ve zkušební době*/
        zkusDoba = 5,
        /**ZPS*/
        zps = 6,
        /**ukončené*/
        ukoncene = 7
    }
    enum PidyCasp {
        PidCaseRozpocet = "0000BHR09ZBO",
        PidCastZasluhy = "0000BHR09ZCJ",
        PidCastPostizeni = "0000BHR09ZDE",
        PidCastDuchod = "0000BHR09ZE9",
        PidCastOstatni = "0000BHR0BIY2"
    }
    /**Stav evidence osoby*/
    enum StavEvidOsoby {
        /**Nová osoba*/
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
    /**Úroveň evidence speciální verze předchozí praxe*/
    enum UrovenEvidPredPraxePpv {
        /**Pro konkrétní PPV se neeviduje speciální verze předchozí praxe*/
        ne = 0,
        /**Pro konkrétní PPV se eviduje základní speciální verze předchozí praxe*/
        ano = 1,
        /**Pro konkrétní PPV se eviduje rozšířená speciální verze předchozí praxe o detail zařazení a vynětí*/
        ano_rozsireno = 10,
        /**Je povolen přesah praxe do PPV. Změny se evidují pouze do předchozí praxe. Vypnuta kontrola evidence osoby a PPV*/
        ano_specialni = 100
    }
    /**Úroveň přístupu na detail osoby*/
    enum UrovenPristDetail {
        /**Zakázání přístupu na detail*/
        ne = 0,
        /**Povolení přístupu na detail*/
        ano = 1,
        /**Povolení pouze čtení přístupu na detail*/
        jenCteni = 10
    }
    /**Úroveň přístupu k povinnosti evidovat zařazení na systemizované místo na detailu PPV v PER*/
    enum UrovenEvidZar {
        /**Zakázání povinnosti evidovat zařazení na systemizované místo*/
        ne = 0,
        /**Nastavení povinnosti evidovat zařazení na systemizované místo*/
        ano = 1,
        /**Zakázání povinnosti evidovat a nemožnost editace zařazení na systemizované místo*/
        nepouzivat = 10
    }
    /**Úroveň pouštění skriptů*/
    enum UrovenPousteniSkriptu {
        /**Nic se nebude pouštět*/
        Ne = 0,
        /**Pouštění bude každý den pomocí aplikace*/
        Aplikace = 10,
        /**Poustění se bude pomocí ZUDu*/
        ZUD = 20
    }
    /**Úroveň používání místa pravidelného pracoviště*/
    enum UrovenPravidPracoviste {
        /**Zakázání používání místa pravidelného pracoviště*/
        ne = 0,
        /**Povolení používání místa pravidelného pracoviště - číselník*/
        Ciselnik = 1,
        /**Povolení používání místa pravidelného pracoviště v textové podobě*/
        Text = 10
    }
    /**Úroveň povolení vymazání platového výměru*/
    enum UrovenPlvDel {
        /**Zakázáno mazání*/
        ne = 0,
        /**Povoleno mazání jen neexportovaných výměrů*/
        neexport = 10,
        /**Povoleno mazání i exportovaných výměrů*/
        vse = 20
    }
    /**Úroveň povinnosti evidovat místo narození*/
    enum UroEvidMistoNar {
        /**Zakázání povinnosti evidovat místo narození*/
        Ne = 0,
        /**Povolení povinnosti evidovat místo narození - pouze obec*/
        Obec = 1,
        /**Povolení povinnosti evidovat místo narození - obec a okres*/
        ObecOkres = 10
    }
    /**Úroveň povolení zobrazení evidence propojení osoby a REF*/
    enum UrovenPovRef {
        /**Zakázání zobrazení evidence propojení osoby v personalistice a referentů*/
        ne = 0,
        /**Povolení zobrazení evidence propojení osoby v personalistice a referentů*/
        ano = 1,
        /**Povolení editace evidence propojení osoby v personalistice a referentů i v případě omezení editace osoby*/
        ano_editace = 10
    }
}
declare namespace Gordic.Per.WebControls {
    /**
     * Prefab pro datum do - potřebuju schovat dobu neurčitou
     * Při vkládání hodnoty se nastaví null, pokud je hodnota doba neurčitá (31.12.2999) a naopak pokud je hodnota null, nastaví se doba neurčitá při collect
     * @param propertyName Jméno vlastnosti v DTO
     * @returns Nastavení pro GDateBoxOptions
     */
    function getDatDoOpt(propertyName: string): GDateBoxOptions;
}
declare namespace Gordic.Per.WebControls {
    function createFieldSelectbox(formRow: JQuery<HTMLElement>, prefab: any, fieldOpt: Per.Interface.GGinducfDto, model: string, serverFilters?: any, multi?: boolean, validators?: Array<Gordic.Validators.Validator<Gordic.Validators.ValidatorOptions> | (Gordic.Validators.ValidatorOptions & {
        type?: string;
    }) | null>, change?: GFieldChangeEvent<any> | undefined, disabled?: boolean, buttons?: (MenuParams & {
        autoStateControl?: boolean;
        requireEdit?: boolean;
        requireValue?: boolean;
        tabbable?: boolean;
    })[]): void;
    /**
     * Vytvoří formbuilder podle DB konfigurace pro konkrétní content
     * @param fb Form builder
     * @param isNew Jestli je nový záznam
     * @param formOpt DB konfigurace
     * @author DCH
     */
    function createForm(content: GContent, page_id: string, fb: Forms.Form, action: EnumActions, formOpt: Array<Per.Interface.GGinducfDto>): Forms.Form;
}
declare namespace Gordic.Per.WebControls {
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
        private dtoPredHod;
        private dtoVyhodnoceniHtel;
        private IsEdit;
        private ReadOnly;
        private JeZmenaPlanu;
        private ZmenitStav;
        private JePredatelne;
        private JePrihlHtelAkt;
        private ulozeno;
        private div_info;
        private tab_vlastnosti;
        private grid_vzdPlan;
        onContentReady(): void;
        private loadData;
        private isDataValid;
        private updatePlanValid;
        private druhVzdelaniValid;
        private temaValid;
        private vzdKurzValid;
        private cilValid;
        private formaValid;
        private hasChanged;
        private setVlastnosti;
        private updateButtons;
        private jePPVSpravovanPrihOso;
        closing(): {
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Per.WebControls {
    /**
     * Načtení hodnot vybraného číselníku
     */
    function GetSeznamHodnotCiselniku(ciselnik: string, jenAktivni: boolean, jenPlatne: boolean): JQueryPromise<Gordic.Data.Readers.GCisReaderCasCiselnikDto[]>;
    function showError(content: GContent, title: string, text?: string): void;
    function showWarning(content: GContent, title?: string, text?: string): void;
    function showSucess(content: GContent, title: string, text?: string): void;
    function ShowGServiceGroupResponseErr(content: GContent, result: Isl.GServiceGroupResponse<Interface.GPerDto>, seskupit: boolean, title: string, okText?: string): void;
    /**
     * Konverze datumu do JSON tvaru
     * @param {type} Konvertované datum například Wed Mar 08 2017 00:00:00 GMT+0100 (Střední Evropa (běžný čas))
     * @returns Datum v JSON tvaru například "2017-03-08T00:00:00.000Z"
     */
    function DateTimeToJSONFormatstring(datum: Date): string;
    function DateToJSONFormatstring(datum: Date): string;
    function EqualDate(datum1: JsonDate, datum2: JsonDate): boolean;
    function EqualDateTime(datum1: JsonDate, datum2: JsonDate): boolean;
    function Ceiling(value: number, significance: number): number;
    function Floor(value: number, significance: number): number;
    function createSortString(dataListdescriptor: Gordic.Per.Interface.GPerListDescription): string;
    function createColumnListString(dataListdescriptor: Gordic.Per.Interface.GPerListDescription): string;
    function createTabGroupsDetail(tabGroupsOpt: Gordic.Per.Interface.GGinducfDto[]): any;
    function createFormDetail(v_form: Forms.Form, formOpt: Gordic.General.ApplicationInterface.GDataFieldDescription[]): Forms.Form;
    function createGridFormat(dataListdescriptor: Gordic.Per.Interface.GPerListDescription, content?: GContent | null): Gordic.Data.GridFormat;
    /**
     * Zjištění zda-li je objekt není undefined nebo null
     * @param obj
     */
    const isEmpty: (obj: any) => boolean;
    /**
     * Zjištění zda-li řetězec prázdný (obsahuje pouze mezery nebo bílé znaky) je objekt není undefined nebo null
     * @param obj
     */
    const isEmptyString: (obj: any) => boolean;
    /**
     * Vypsání objektu na konzoli. Pokud se jedná o decimal. Tak jej vypíšu na 4 místa
     * @param obj obecný objekt
     */
    const dump: (obj: any) => void;
    /**
     * Konverze obecného objektu na řetězec
     * @param obj obecný objekt
     * @param level interní proměnná určující úroveň odsazení ( neplnit, ponechat implicitní hodnotu)
     * @returns Řetězec, který má odděleny jednotlivé položky '\n'
     */
    function toString(obj: object | null | undefined | string | number, level?: number): string;
    /**
     * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
     *
     * @param {JQuery<HTMLElement>} form předaný element formuláře
     * @returns {JQueryPromise<boolean>} výsledek stavu
     */
    function waitForValues(form: JQuery<HTMLElement>): JQueryPromise<boolean>;
    /** Vrátí instanci maximální hodnoty datumu
     * @author DCH
     */
    function dateMaxValue(): Date;
    /** Vrátí instanci minimální hodnoty datumu
     * @author DCH
     */
    function dateMinValue(): Date;
    /**DIV pro zapoudření hlavičky detailu s CSS
     * @author DCH
     */
    const headerDiv: () => JQuery<HTMLElement>;
    /**
     * Přidá k datumu měsíce
     * @param date Datum
     * @param months Počet měsíců
     * @returns novou instanci Date
     * @author DCH
     */
    function addMonths(date: Date | JsonDate, months: number): Date;
    /**
     * Přidá k datumu dny (vrátí novou instanci typu Date)
     * @param date Datum
     * @param days Počet dnů
     * @returns novou instanci Date
     * @author DCH
     */
    function addDays(date: Date | JsonDate, days: number): Date;
    /**
     * Přidá k datumu roky
     * @param date Datum
     * @param years Počet roků
     * @returns novou instanci Date
     * @author DCH
     */
    function addYears(date: Date | JsonDate, years: number): Date;
    /**
     * Získá počet přestupných dnů
     * @param datum1
     * @param datum2
     * @returns
     * @author DCH
     */
    function leapMezidd(datum1: Date, datum2: Date): number;
    /**
     * Nastaví počet dní a roků u celkové praxi z datumů od a do
     * @author DCH
     */
    function urceniDelkyPraxe(datumOd: Date, datumDo: Date): {
        roky: number;
        dny: number;
    };
    /**
     * Nastaví počet dní a roků u celkové praxi z datumů od a do
     * @author DCH
     */
    function urceniDelkyPraxeKoef(datumOd: Date, datumDo: Date, koef: Decimal): {
        roky: number;
        dny: number;
    };
    /**
     * Porovnává datumy podle UTC (bez časového pásma)
     * @param date1
     * @param date2
     * @param operation Jak se má porovnávat
     * @param onlyDate Jestli porovnávat jen datum bez času
     * @author DCH
     */
    function compareDates(date1: Date | JsonDate | null | undefined, date2: Date | JsonDate | null | undefined, operation: DateCompareOperation, onlyDate?: boolean): boolean;
    /**
     * Zjišťuje, zda je daný rok přestupný.
     * @param year Testovaný rok
     * @author DCH
     */
    function isLeapYear(year: number): boolean;
    /**
     * Funkce pro zabalení dialogu do Promise.
     * Použití ideálně pro async/await.
     * @param cnt Content
     * @param title Nadpis okna
     * @param message Zobrazovaná zpráva
     * @param buttons Tlačítka dialogu
     * @param icon Ikona dialogu
     * @returns Promise s výsledkem uživatelské interakce
     */
    function showMessagebox(cnt: GContent, title: string, message: string, buttons: GDialogButton[], icon: string): Promise<"yes" | "no" | "cancel">;
    /**
     * Funkce pro zabalení dialogu do Promise.
     * Použití ideálně pro async/await.
     * @param cnt Content
     * @param title Nadpis okna
     * @param message Zobrazovaná zpráva
     * @returns Promise s výsledkem uživatelské interakce
     */
    function showConfirmDialog(cnt: GContent, title: string, message: string): Promise<"yes" | "no" | "cancel">;
    /**
     * Přidá status panel do gridu (spodní lišta gridu)
     * @param grid Konkrétní grid
     * @param name Název panelu
     * @param text Text, který se má zobrazit v panelu
     * @author DCH
     */
    function setStatusPanel(grid: JQuery<HTMLElement>, name: string, text: string): void;
}
declare namespace Gordic.Per.WebControls {
    class GHistDetailu extends GContentBase {
        private dataListDescription;
        private firstRun;
        onContentReady(): void;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebControls {
    class GCasCiselnik extends GContentBase {
        private Ciselnik;
        private grid;
        private view;
        onContentReady(): void;
        zobrazitDetail(mainContent: GCasCiselnik, mainRow: Gordic.Per.Interface.GCasCiselnikDto, novy: boolean): void;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Pavel Švehla
 * @since 480.2.0.6
 */
declare namespace Gordic.Per.WebControls {
    class GCasCiselnikSeznam extends GContentBase {
        private grid;
        private view;
        onContentReady(): void;
    }
}
declare namespace Gordic.Per.WebControls {
    class GDokladyPam extends GContentBase {
        onContentReady(): void;
    }
}
declare namespace Gordic.Per.WebControls {
    class GDokladyPamDetail extends GContentBase {
        dtoHeader: Gordic.Per.Interface.GSeznamZmenenychEsuDto;
        onContentReady(): void;
    }
}
declare namespace Gordic.Per.WebControls {
    function createFilterForm(descriptionMasky: Array<Gordic.Per.Interface.GPerSubjectMetaData>): Gordic.Forms.Form[];
    function createFilterOsoby(): Gordic.Forms.Form;
    function createFilterPpv(): Gordic.Forms.Form;
    function createFilterRodina(): Gordic.Forms.Form;
    function createFilterVzdelani(): Gordic.Forms.Form;
    function createFilterDoklady(): Gordic.Forms.Form;
    function createFilterZdravi(): Gordic.Forms.Form;
    function createFilterPojistovna(): Gordic.Forms.Form;
}
declare namespace Gordic.Per.WebControls {
    class GTiskSestavy extends GContentBase {
        private Tema;
        private RestrictionALV;
        onContentReady(): void;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.3
 */
declare namespace Gordic.Per.WebControls {
    class GDetailOpatreni extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly detailOpt;
        private readonly IxsEsu;
        private readonly DatDoPpv;
        private readonly PageId;
        private readonly JeBIS;
        private readonly JeCS;
        private readonly JeZrusitBtn;
        private readonly JePovolenImport;
        /**Výchozí druh editace*/
        private readonly DruhEditace;
        private readonly povolitZadne;
        private readonly vyberPOListDescription;
        private readonly ParametrOpatreniPropojeniSSL;
        private jeZmena;
        /**Aktuální druh editace*/
        private typEditace;
        private zmenaPO;
        private importDrpo;
        private importDupo;
        private importDatum;
        onContentReady(): void;
        private vyberPerOpatreni;
        setDruh(drpo: string | null | undefined, dupo: string | null | undefined, nastavitVzdy?: boolean): void;
        setDatum(datum: Date | JsonDate | null | undefined, nastavitVzdy?: boolean): void;
        private setDisabled;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeCertDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeLustraceDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeProverkyDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajePrukazDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly mailPrideleniKarty;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private setInfoMail;
    }
}
/**
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GHistDetailuRodina extends GContentBase {
        private readonly detailListDescription;
        private gridDetail;
        private readonly adresyListDescription;
        private gridAdresy;
        private readonly kontaktListDescription;
        private gridKontakt;
        onContentReady(): void;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeHmotOdpovednostDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeOzdravPobytDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeVozidlaDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeZbraneDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeDoplnUdajeDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeJazykZkouskyDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeJazykZnalostiDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeJazykyDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeKurzyDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly ParametrPerSVzdSk;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeKvalDohodaDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeMentoringDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly prubehListDescription;
        private readonly IxsEsu;
        private readonly DatZmena;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private grid;
        private jeZmena;
        private jeZmenaPrubeh;
        private tempPoradiPrubeh;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private setGridStatusWidget;
        private updateBtn;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeOdbZpusDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajePrubehMenDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly druh;
        onContentReady(): void;
        closing(dto: Interface.GPrubehMenDto): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeSledVzdelaniDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeTitulyDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeVzdelaniDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeBydlisteDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly typAdoFilter;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebControls {
    class GUdajeCiziPojistovnyDetail extends GContentBase {
        private Detail;
        private IxsEsu;
        private DatumOd;
        private PageId;
        private CasNacteni;
        private IsEditable;
        private IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        save(row: Per.Interface.GCizozemPojistovnyDto | null | undefined, zrusitNovejsi: boolean): void;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeZamFrmHodnostiDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeKontaktUdajeDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebControls {
    class GUdajePojistovnyDetail extends GContentBase {
        private Detail;
        private IxsEsu;
        private DatumOd;
        private PageId;
        private CasNacteni;
        private IsEditable;
        private IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        save(row: Per.Interface.GZdravPojistovnyDto | null | undefined, zrusitNovejsi: boolean): void;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeRodinaDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly adresaOpt;
        private readonly kontaktOpt;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeSluzbaDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeStatZamDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebClient
 *
 * @author Denisa Chaloupková
 * @since 525.2
*/
declare namespace Gordic.Per.WebControls {
    class GUdajeZakUdajeDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        protected ParametrPerPovDatumZmeny: boolean;
        protected JeVNOL: boolean;
        private jeZmena;
        onContentReady(): void;
        private zmenaOdchoduDoDuchodu;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GDetailCjPpv extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(returnValue?: any): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.3
 */
declare namespace Gordic.Per.WebControls {
    class GDetailDocasPovereni extends GContentBase {
        private readonly Detail;
        private readonly IxsEsu;
        private readonly DatDoPpv;
        private readonly PageId;
        private readonly JeISTA;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly detailOpt;
        private jeZmena;
        private grid;
        private readonly jeOpatreni;
        private readonly opatreniID;
        private opatreniCnt;
        private readonly showOpatreni;
        private readonly OpatreniPID;
        private readonly opatreniUkonceniID;
        private opatreniUkCnt;
        private readonly showOpatreniUkonceni;
        private readonly UkonceniOpatreniPID;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GDetailNaborPrisp extends GContentBase {
        private readonly Detail;
        private readonly IxsEsu;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly detailOpt;
        private readonly DruhPpv;
        private readonly IxsTks;
        private readonly DatPlatnost;
        private readonly PouzeNaborPrispevek;
        private readonly stringboxValue;
        private jeZmena;
        private readonly jeOpatreni;
        private readonly opatreniID;
        private opatreniCnt;
        private readonly showOpatreni;
        private readonly OpatreniPID;
        private readonly opatreniUkonceniID;
        private opatreniUkCnt;
        private readonly showOpatreniUkonceni;
        private readonly UkonceniOpatreniPID;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private setFiltersSlozky;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GDetailNrzp extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.3
 */
declare namespace Gordic.Per.WebControls {
    class GDetailPlatVymer extends GContentBase {
        private readonly Detail;
        private readonly IxsEsu;
        private readonly DatDoPpv;
        private readonly PageId;
        private readonly IxsTks;
        private readonly DruhPpv;
        private readonly JeBIS;
        private readonly JeISTA;
        private readonly JeCT;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly detailOpt;
        private readonly napojeneTabulkyList;
        private readonly povereniList;
        private readonly ParametrZapPraxeAktDen;
        private readonly ZarazeniSMList;
        private readonly ParametrPesPristSlozkyMzdy;
        private DetailSM;
        private SlozkySYM;
        private readonly editZakazSlozky;
        private readonly slozkyVymerListDescription;
        private pocetRokuPraxe;
        private pocetDnuPraxe;
        private datZapPraxe;
        private jeZmena;
        private grid;
        private readonly JeSluzba;
        private readonly jeOpatreni;
        private readonly opatreniID;
        private opatreniCnt;
        private readonly showOpatreni;
        private readonly OpatreniPID;
        private readonly opatreniUkonceniID;
        private opatreniUkCnt;
        private readonly showOpatreniUkonceni;
        private readonly UkonceniOpatreniPID;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private prepocet;
        private setGridStatusWidget;
        private porovnaniCelkem;
        private napojTabulkaStavPlat;
        private napojTabulkaAutomat;
        napojTabulkaPraxe(druh_tab: number | null | undefined, datum: Date | JsonDate | null | undefined): number | null | undefined;
        /**Zjistí možné platové stupně dle tabulky a třídy a doplní datum platového postupu*/
        platPostupTable(druhTab: number | null | undefined, platTrida: string | null | undefined, dat_zap_praxe: Date | JsonDate | null | undefined, roky_praxe_zap: number | null | undefined, dny_praxe_zap: number | null | undefined): Promise<Interface.GPamcttaDto[]>;
        platPostupTableISTA(druhTab: number | null | undefined, platTrida: string | null | undefined, plat_stupen: string | null | undefined, praxe_tab: number | null | undefined, dat_zap_praxe: Date | JsonDate | null | undefined, roky_praxe_zap: number | null | undefined, dny_praxe_zap: number | null | undefined): Promise<Interface.GPamcttaDto[]>;
        datumPostupu(dat_zap_praxe: Date, roky_praxe_zap: number, roky_praxe_postup: number, dny_praxe_zap: number): Date;
        /**Zjistí tarif dle platové tabulky, stupně, třídy a pořadí a datumu*/
        zjistiCTarif(druhTab: number | null | undefined, platTrida: string | null | undefined, platStupen: string | null | undefined, datum: Date | JsonDate | null | undefined): Promise<JsonDecimal | null | undefined>;
        private nastavDetailSYM;
        private nastavSazbu;
        /**Metoda vrátí nejvyšší nalezený platový stupeň, musí být nastaveny filtry*/
        maxStupen(druhTab: number | null | undefined, platTrida: string | null | undefined, datum: Date | JsonDate | null | undefined): Promise<string | null | undefined>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GDetailPpvZarazeniSym extends GContentBase {
        private readonly Detail;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly detailOpt;
        private readonly JeStatZam;
        private readonly JePracPomerISoSS;
        private readonly JeSluzba;
        private readonly JeCS;
        /**Pro validaci - datum do PPV*/
        private readonly PpvDo;
        /**Pro validaci - datum od PPV*/
        private readonly PpvOd;
        private jeZmena;
        onContentReady(): void;
        /**Zjistí, zda nebylo překročeno pracovní dny mezi daty v daném kalendářním roce (rozšířená verze)*/
        closing(returnValue?: any): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.3
 */
declare namespace Gordic.Per.WebControls {
    class GDetailPriplatkyMimoPV extends GContentBase {
        private readonly Detail;
        private readonly IxsEsu;
        private readonly DatDoPpv;
        private readonly PageId;
        private readonly IxsTks;
        private readonly DatPlatnost;
        private readonly DruhPpv;
        private readonly JeBIS;
        private readonly JeCS;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly detailOpt;
        private jeZmena;
        private readonly jeOpatreni;
        private readonly opatreniID;
        private opatreniCnt;
        private readonly showOpatreni;
        private readonly OpatreniPID;
        private readonly opatreniUkonceniID;
        private opatreniUkCnt;
        private readonly showOpatreniUkonceni;
        private readonly UkonceniOpatreniPID;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private setFiltersSlozky;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.3
 */
declare namespace Gordic.Per.WebControls {
    class GDetailSlozkyPPV extends GContentBase {
        private readonly Detail;
        private readonly IxsEsu;
        private readonly PageId;
        private readonly IxsTks;
        private readonly DruhPpv;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly Ukladat;
        private readonly detailOpt;
        private jeZmena;
        onContentReady(): void;
        closing(dto?: Per.Interface.GPlatovyVymerSlozkyDto | null): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.3
 */
declare namespace Gordic.Per.WebControls {
    class GDetailSlozkyVyneti extends GContentBase {
        private readonly Detail;
        private readonly IxsEsu;
        private readonly PageId;
        private readonly JeISTA;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly Ukladat;
        private readonly DatOd;
        private readonly DatDo;
        private readonly FilterSlozky;
        private readonly DruhVyneti;
        private readonly detailOpt;
        private jeZmena;
        onContentReady(): void;
        closing(dto?: Per.Interface.GVynetiSlozkyMzdyDto | null): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.3
 */
declare namespace Gordic.Per.WebControls {
    class GDetailStaze extends GContentBase {
        private readonly Detail;
        private readonly IxsEsu;
        private readonly DatDoPpv;
        private readonly PageId;
        private readonly IxsPpv;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly detailOpt;
        private jeZmena;
        private readonly jeOpatreni;
        private readonly opatreniID;
        private opatreniCnt;
        private readonly showOpatreni;
        private readonly OpatreniPID;
        private readonly opatreniUkonceniID;
        private opatreniUkCnt;
        private readonly showOpatreniUkonceni;
        private readonly UkonceniOpatreniPID;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private updateFilters;
        private updateFieldVisibility;
        private setDruhOpatreni;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.3
 */
declare namespace Gordic.Per.WebControls {
    class GDetailVyneti extends GContentBase {
        private readonly Detail;
        private readonly IxsEsu;
        private readonly DatDoPpv;
        private readonly PageId;
        private readonly DruhPpv;
        private readonly JeISTA;
        private readonly JeCT;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly ParametrPerPovSchl;
        private readonly druhVynetiFilter;
        private readonly detailOpt;
        private readonly ParamUroKonMaterska;
        private readonly ParametrPerPovOdv;
        private readonly slozkyVynetiListDescription;
        private jeZmena;
        private grid;
        private jeSchvaleni;
        private celkemDniBezOdpoctu;
        private delkaMaterskeDny;
        private readonly jeOpatreni;
        private readonly opatreniID;
        private opatreniCnt;
        private readonly showOpatreni;
        private readonly OpatreniPID;
        private readonly opatreniUkonceniID;
        private opatreniUkCnt;
        private readonly showOpatreniUkonceni;
        private readonly UkonceniOpatreniPID;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private settSlozky;
        private setVisDatPorodu;
        private getDaysCount;
        private getOdpocetMaterska;
        private setKonecMaterska;
        private setDruhOpatreni;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GDetailZapocetPraxe extends GContentBase {
        private readonly Detail;
        private readonly PageId;
        private readonly IxsPpv;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly buttonVisible;
        private readonly detailOpt;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private vypocetPraxe;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GPpvZarazeniSym extends GContentBase {
        private readonly IxsEsu;
        private readonly IxsPpv;
        private List;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly JeStatZam;
        private readonly JePracPomerISoSS;
        /**Pro validaci - datum do PPV*/
        private readonly PpvDo;
        /**Pro validaci - datum od PPV*/
        private readonly PpvOd;
        private ZmenyZarazeni;
        private readonly listDescription;
        private grid;
        private jeZmena;
        private newRecordPoradi;
        onContentReady(): void;
        closing(returnValue?: {
            pracovniZarazeni: any;
            zmenyZarazeni: any;
        }): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GPrehledPraxePpv extends GContentBase {
        private readonly listDescription;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly buttonVisible;
        private readonly PpvDatOd;
        private readonly PpvDatDo;
        private jeZmena;
        private grid;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeJinaVydCinDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private setVisibility;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeKonDolozkaDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajePpvDetail extends GContentBase {
        private readonly Detail;
        private readonly IxsEsu;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly detailHeaderOpt;
        private readonly tabGroupsOpt;
        private readonly tabOpt;
        private readonly detailOpt;
        private readonly ParametrPerPovolSazbyDohod;
        private readonly ParametrPerPovUvazekDPP;
        private readonly ParametrPerRadVicZar;
        private readonly ParametrGinIsossReadyBool;
        private readonly ParametrPesEvidMistaVykonu;
        private readonly ParametrPerPschlMvp;
        private readonly ParametrPesEvidPracoviste;
        private readonly ParametrPerPschlZSM;
        private readonly ParametrPerRadPovKvm;
        private readonly ParametrPerPovKat;
        private readonly ParametrPerDveMistaPrace;
        private readonly ParametrPerRadPovPusobnosti;
        private readonly ParametrPerZobrKatalogPraci;
        private readonly ParametrZarazeniDohody;
        private readonly ParametrPerPovMazatSchvalZap;
        private readonly ParametrPerRadDelPlv;
        private readonly JeCT;
        private readonly JeBIS;
        private readonly histDetailPpvListDescription;
        private readonly histDetailPpvDohodyListDescription;
        private readonly histZarazeniListDescription;
        private readonly histPracovisteListDescription;
        private readonly histMistaVykonuListDescription;
        private readonly histZastupyListDescription;
        private readonly histNrzpListDescription;
        private readonly histSazbyListDescription;
        private readonly cjListDescription;
        private readonly nrzpListDescription;
        private readonly zastupListDescription;
        private readonly sazbyListDescription;
        private readonly zapoctyPraxeListDescription;
        private readonly platVymerListDescription;
        private readonly naborPrispListDescription;
        private readonly priplatkyListDescription;
        private readonly vynetiListDescription;
        private readonly povereniListDescription;
        private readonly stazeListDescription;
        private jeZmena;
        private tabmanager;
        private zmenyZarazeni;
        private gridHistDetPpv;
        private gridHistDetPpvDohody;
        private gridHistZarazeni;
        private gridHistPracoviste;
        private gridHistMistaVyk;
        private gridHistZastupy;
        private gridHistNrzp;
        private gridHistSazby;
        private gridCj;
        private gridNrzp;
        private gridZastup;
        private gridSazby;
        private gridZapoctyPraxe;
        private gridPlatVymer;
        private gridNaborPrisp;
        private gridPriplatky;
        private gridVyneti;
        private gridPovereni;
        private gridStaze;
        private readonly listSazbyDohody;
        private readonly listSlozkyMzdyDPC;
        private readonly listSlozkyMzdyDPP;
        private readonly listDokladyPlatVymer;
        private prizSlozkyLoaded;
        private jeZmenaSazbyDohody;
        private platovyVymerAkt;
        private celkPlatVym;
        private jeSluzba;
        private jeStatZam;
        private jePracPomerISoSS;
        private jeDohoda;
        private ZadavaniUvazkuFondu;
        private SocPojJakoPocPPV;
        private SocPojJakoPocPPVKal;
        private ZdravPojJakoPocPPV;
        private ZdravPojJakoPocPPVKal;
        private VlozitAktDatumZmenaOd;
        private PovoleniUkoncitPredZar;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        createTabDetail(): any;
        private updateUI;
        private setFieldRequired;
        private setCelkemPriplatky;
        private prepnutiVzhledu;
        private prepnutiVzhleduStatZam;
        private prepnutiVzhleduSluzba;
        private getUserSettings;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajePredchoziZamDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeDuchVymerDetail extends GContentBase {
        private readonly Detail;
        private readonly listDescription;
        private readonly IxsEsu;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private readonly DatPosZmena;
        private readonly ParametrPerKontrolaUlo;
        private jeZmena;
        private jeZmenaZast;
        private poradiPduNew;
        private grid;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private updateBtns;
        private validateDatOd;
        private validateDatDo;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeFyzZpusDetail extends GContentBase {
        private readonly Detail;
        private readonly detailSym;
        private readonly detailOpt;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeOpatreniDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeOsoZpusDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajePracUrazyDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly listDescription;
        private readonly IxsEsu;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        private grid;
        private jeZmenaSvedek;
        private newDtoPoradi;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private updateBtns;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeSluzHodDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeSvedekUrazuDetail extends GContentBase {
        private readonly Detail;
        private readonly detailOpt;
        private readonly PageId;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        private ixsPpvSv;
        private ixsEsuSv;
        onContentReady(): void;
        closing(returnValue?: any): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeZPSDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeZastDuchDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(returnValue?: any): JQuery.Promise<any, any, any>;
    }
}
/**
 * Gordic.Per.WebControls
 *
 * @author Denisa Chaloupková
 * @since 525.2
 */
declare namespace Gordic.Per.WebControls {
    class GUdajeZdravZpusDetail extends GContentBase {
        private readonly Detail;
        private readonly IsEditable;
        private readonly IsNewRecord;
        private jeZmena;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Per.WebControls {
    /**Získání icony v gridformatu pro zobrazení stavu odeslání řádku*/
    function GetIconStavOdeslani(stav_odeslani: number): {
        icon: ISoSSStavOdeslaniIcon;
        text: string;
    };
    /**SNSZ Získání icony a popisu chyb/varování řádku v gridformatu*/
    function GetIconValidSNSZ(cnt: GContent, data: Per.Interface.GPERSNSZDto): {
        icon: undefined | string;
        text: string;
    };
    /**Získání icony a popisu typu záznamu v gridformatu */
    function GetIconTypZaznamu(data: Per.Interface.GPERSZSZDto): {
        icon: string;
        text: string;
    };
    /**SZSZ Získání icony a popisu chyby/varování řádku v gridformatu*/
    function GetIconValidSZSZ(cnt: GContent, data: Per.Interface.GPERSZSZDto): {
        icon: string;
        text: string;
    } | undefined;
    /**SDSZ Získání icony a popisu chyb/varování řádku v gridformatu*/
    function GetIconValidSDSZ(cnt: GContent, data: Per.Interface.GPERSDSZDto): {
        icon: string;
        text: string;
    } | undefined;
    /**
     * Vytvoření hlavičky pro detaily hlášení (BI1, BI3, BI5, BI9, BI11, BI13)
     * @param validace Seznam validací a nastavení povinností
     * @returns formbuilder
     */
    function CreateFormBuilderHlavicka(validace: Interface.GPolozkaHlaseniDto[], stav_odeslani: number): Forms.Form;
    /**
     * Získání ikony podle stavu odeslání pro hlavičku formuláře
     * @param stav_odeslani
     * @returns JQuery<HTMLElement>, span s nastavenou velikostí ikony
     */
    function GetIconHeaderISoSS(stav_odeslani: number): JQuery<HTMLElement>;
    /**Vytvoření gridu s maskou pro historii záznamu ISoSS*/
    function CreateGridHistorieIsoss(cnt: GContent, typdat: TypDat, otevrenoZDetailuDavky?: boolean): {
        form: JQuery<HTMLElement>;
        grid: JQuery<HTMLElement>;
    };
    /** Typesciptová verze CanEdit na DTO */
    function CanEditZSZ(dto: Interface.GPERSZSZDto, vlastnost: string): boolean;
    function odeslatHlaseni(cnt: GContent, typ_dat: TypDat, hlaseni: Interface.GPERSNSZDto[] | Interface.GPERSZSZDto[] | Interface.GPERSDSZDto[]): void;
    function overitStav(cnt: GContent, typ_dat: TypDat, hlaseni: Interface.GPERSNSZDto[] | Interface.GPERSZSZDto[] | Interface.GPERSDSZDto[]): void;
    /**Pro zadané záznamy vygeneruje jejich zrušení typem D, případně je pouze zneaktivní.
     * Jen pro změny zaměstnanců
     */
    function zrusitIsoss(cnt: GContent, typ_dat: TypDat, hlaseni: Interface.GPERSNSZDto[] | Interface.GPERSZSZDto[] | Interface.GPERSDSZDto[]): void;
    function storno(cnt: GContent, typ_dat: TypDat, hlaseni: Interface.GPERSNSZDto[] | Interface.GPERSZSZDto[] | Interface.GPERSDSZDto[]): void;
    /**Obnovení hlášení, překopíruje se do nové hlášení s novým pořadím dávky*/
    function obnovit(cnt: GContent, typ_dat: TypDat, hlaseni: Interface.GPERSNSZDto[] | Interface.GPERSZSZDto[] | Interface.GPERSDSZDto[]): JQuery.Promise<any, any, any>;
    function nacistXML(cnt: GContent, typ_dat: TypDat): void;
    /** Vygeneruje .xml do vybrané cesty a označí hlášení jako odeslané - nepotvrzené */
    function ulozitXML(cnt: GContent, typ_dat: TypDat, hlaseni: Interface.GPERSNSZDto[] | Interface.GPERSZSZDto[] | Interface.GPERSDSZDto[]): void;
    /** Zobrazení výsledků po odeslání hlášení */
    function obsluhaVysledkuOdeslani(cnt: GContent, hlaseni: Interface.GHlaseniDto | null | undefined): void;
    function ConfirmSave(cnt: GContent): JQuery.Promise<any, any, any>;
}
declare namespace Gordic.Per.WebControls {
    /**PEV - Zda je požadavek splněn*/
    function jePozadavekSplnen(pozadavek: string | null | undefined): boolean;
    /**
     * PEV - Získání identifikátoru plánu k danému datu
     * @param cnt Aktuální content
     * @param plany Seznam plánů
     * @param ixs_esu Identifikátor osoby
     * @param upozornitZadnyPlan Zda upozornit na neexistující plán
     * @param dotazVicePlanu Zda vybírat z více plánů
     * @param vytvoritNovy Zda vytvořit nový plán v případě, že neexistuje
     * @param datum Datum k upřesnění plánu (nepovinný agrument -> aktuální datum)
     * @returns
     */
    function getIxsPlv(cnt: GContent, plany: Per.Interface.GPlanOsobyDto[], ixs_esu: string, upozornitZadnyPlan: boolean, dotazVicePlanu: boolean, vytvoritNovy: boolean, datum?: Date): JQuery.Promise<string | null | undefined, any, any>;
    /**
     * PEV - Zjistí nově přidané osoby k turnusu pro odeslání pozvánky
     * @param cnt Content
     * @param ixs_kur Identifikátor turnusu
     * @param poradi Pořadí turnusu
     * @param osoby Seznam přiřazených osob
     */
    function getNewOsoTur(cnt: GContent, ixs_kur: string | null | undefined, poradi: number | null | undefined, list_oso: Per.Interface.GUcastnikDto[]): JQuery.Promise<string[], any, any>;
    /**
     * PEV - Odešle pozvánky osobám na kurz
     * @param cnt Content
     * @param turnus DTO turnusu
     * @param osoby Seznam identifikátorů osob
     */
    function sendInvitation(cnt: GContent, turnus: Per.Interface.GTurnusDto, osoby: string[]): void;
    /**PEV - Zrušení zařazení osoby na turnus */
    function deleteOso(cnt: GContent, ixs_kur: string | null | undefined, poradi: number | null | undefined, ixs_esu: string | null | undefined, stav_abs: number | null | undefined): void;
    /**
     * PEV - Zobrazení o absolvování kurzu
     * @param cnt Content
     * @param osoba DTO osoby
     * @param turnus DTO turnusu
     */
    function absolvovaniKurzuDetail(cnt: GContent, osoba: Per.Interface.GSeznamOsobDto, turnus: Per.Interface.GTurnusOsobyDto): void;
    /**
     * PEV - Absolvování kurzu/turnusu osobami
     */
    function absolvovaniKurzuOsoby(cnt: GContent, turnus: Per.Interface.GTurnusDto, pocet_osob: number, rozsah_dny: Decimal, rozsah_hod: Decimal, uspesni: Per.Interface.GUcastnikDto[], ostatni: Per.Interface.GUcastnikDto[]): void;
    /**
     * PEV - Splnění požadavku
     * @param cnt
     * @param ixs_esu
     * @param nazev_osoba
     * @param ixs_kur
     * @param poradi_kur
     * @param pozadavek
     * @returns
     */
    function absolvovaniPozadavekKurz(cnt: GContent, ixs_esu: string, nazev_osoba: string, ixs_kur: string, poradi_kur: number, pozadavek: Per.Interface.GPozadavkyDto): void;
    /** PEV - Zrušení absolvování turnusu */
    function cancelSplneniKurzu(cnt: GContent, turnusOsoby: Per.Interface.GTurnusOsobyDto): void;
}
declare namespace Gordic.Per.WebControls {
    class GDetailOsobyPEV extends GContentBase {
        protected DtoDetailOso: Per.Interface.GSeznamOsobDto;
        protected IxsEsu: string;
        protected Action: EnumActions;
        protected JeCT: boolean;
        protected ZobrRC: boolean;
        protected DebugMode: boolean;
        protected PovolenaZvlEvidVstupVzd: boolean;
        protected ParametrPevOsoDokOso: boolean;
        protected ParametrUrovenVzdPoz: UrovenVzdPozadavku;
        protected ParametrPovoleniVzdPlanu: boolean;
        protected ParametrRozEvidenceKurzu: boolean;
        protected ParametrPevEvidPouzeUredZk: boolean;
        protected ParametrPevOsoDokKur: boolean;
        protected ParametrPevPriUredZk: UrovenPristDetUredZk;
        protected ParametrPerRadRozEvidJazZk: boolean;
        protected ParametrPevRadPovMaz: boolean;
        protected ParametrPevUrovenDetOsoby: UrovenDetOsobyPEV;
        protected IxsProfilu: string;
        protected JeVNOL: boolean;
        protected ParametrPevPriStudVol: boolean;
        protected ParametrPevPriJazykZk: boolean;
        protected ParametrPevPriRozCil: boolean;
        protected ParametrPevPouzeProhlizeni: UrovenPouzeProhlizeniPev;
        protected ParametrPevRadEvidVzdPlanu: boolean;
        protected ParametrPevPovEvidDataVzdPlanu: boolean;
        protected ParametrPerPovStatZam: boolean;
        private gin_rad_vla_ur;
        private gin_vla_nakonec;
        private readOnly;
        private planOsobyList;
        private zakUdajeOsobyDto;
        private pozZpusobilostiList;
        private pozadavkyOsobyList;
        private rokyPozadavky;
        private zmenaZarTur;
        private ulozeno;
        private povoleniRucniSplneni;
        private povoleniOdesilaniMailu;
        private groups;
        private readonly tabDetailID;
        private readonly tabVzdPlanyID;
        private readonly tabKurzyTurID;
        private readonly tabPlanyVzdID;
        private readonly tabUredZkID;
        private readonly tabJazZkID;
        private readonly tabStudVolnoID;
        private readonly tabRozvCileID;
        private tabmanager;
        private tabDetail;
        private tabVzdPlany;
        private tabKurzyTur;
        private tabPlanyVzd;
        private tabUredZk;
        private tabJazZk;
        private tabStudVolno;
        private tabRozvCile;
        private grid_pozadavky;
        private grid_plany;
        private formDivPozadavky;
        private formDivTurnusy;
        private grid_turnusy;
        private grid_uredZk;
        private tab_uredZk;
        private tab_studVolno;
        private grid_studVolno;
        private grid_jazZk;
        private div_cile;
        onContentReady(): void;
        private loadData;
        private initHlavickaDetailForm;
        private initVzdPozadavky;
        private initKurzy;
        private initPlany;
        private initUredZkousky;
        private initStudVolno;
        private initJazykZkousky;
        private initRozCile;
        private getGridFormatPozadavky;
        private getGridFormatTurnusy;
        private getGridFormatPlany;
        private getGridFormatUredZk;
        private getGridFormatJazZk;
        private getGridFormatStudVolno;
        private getColumnListPozadavky;
        private getColumnListTurnusy;
        private getColumnListPlany;
        private getColumnListUredZk;
        private getColumnListJazZk;
        private getColumnListStudVolno;
        private loadListPlany;
        private getVek;
        private setStavEvidence;
        private isModified;
        private updateSaveButton;
        private setDisabled;
        private getPlanOsoby;
        private filterTurnusy;
        private filterPozadavky;
        private setRokyPozadavky;
        private setRokyTurnusy;
        private zobrPozPodlePlanu;
        private zobrPozPodleRoku;
        private reloadPozadavku;
        private zobrNovyTurnus;
        private prepocetTurnusy;
        private prepocetDnuSVolno;
        closing(): {
            zmenaZarTurnu: boolean;
            ulozeno: boolean;
        };
    }
}
declare namespace Gordic.Per.WebControls {
    class GDetailTurnusu extends GContentBase {
        protected Action: EnumActions;
        protected DtoTurnus: Per.Interface.GTurnusDto;
        protected IxsKur: string;
        protected Poradi: number;
        protected ZobrazPozadavky: boolean;
        protected JeCT: boolean;
        protected JeBIS: boolean;
        protected JeCS: boolean;
        protected ParametrPevOsoDokKur: boolean;
        protected ParametrPerPovBarevRozSez: boolean;
        protected ParametrZdaLogovatGDPR: boolean;
        protected ParametrPropojeniPevPeh: boolean;
        protected DebugMode: boolean;
        protected ParametrPevRadPovMaz: boolean;
        protected IxsProfilu: string;
        protected gin_gms_sndaddr: string;
        private gin_rad_vla_ur;
        private gin_vla_nakonec;
        private jeZmenaOso;
        private jeZmenaLek;
        private readOnly;
        private maTurnusGeneraci;
        private ulozeno;
        private vzorHodnoceni;
        private pocDnuKonceHod;
        private pocatekHodTur;
        private povoleniOdesilaniMailu;
        private grid_oso;
        private grid_lek;
        private grid_poz;
        onContentReady(): void;
        private newData;
        private loadData;
        private getGridFormatZarOso;
        private getGridFormatLektori;
        private getGridFormatPozadavky;
        private setDisabled;
        private isModified;
        private updateSaveButton;
        private setGenButton;
        closing(): {
            ulozeno: boolean;
        };
    }
}
