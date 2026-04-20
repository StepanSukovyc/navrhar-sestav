declare namespace Gordic.Bpl {
    const enum HromadneOperace {
        Predani = 0,
        Prideleni = 1,
        Prevzeti = 2,
        Preevidence = 3,
        Storno = 4,
        Odstorno = 5,
        Uhrada = 6,
        Uctovani = 7,
        Uzavreni = 8,
        ZruseniUzavreni = 9,
        ZmenaStavuZauctovani = 10,
        UvolneniProstredku = 11,
        OdschvaleniKryti = 12,
        OdschvaleniLikvidace = 13,
        KontrolaMetadat = 14,
        KlicovaSlova = 15
    }
    interface GHromadneOperaceDialog {
        getFormData(): object;
    }
    type GHromadneOperaceDialogType = {
        new (): GHromadneOperaceDialog;
    };
}
declare namespace Gordic.Bpl.Utils {
    function registerSearchResolvers(): void;
}
declare namespace Gordic.Bpl.WebClient.GBplKtgTyp {
    const dokladyVydajove = "1300, 1330, 1350, 1361, 1341, 1371, 1482, 1492, 1410, 1380, 1382, 1385, 1386";
    const dokladyBezZavazku = "1340, 1360, 1480, 1490";
    const dokladyDanove = "1305, 1306, 1405, 1406";
    const dokladyKalendaru = "1385, 1386, 1485, 1486";
}
declare namespace Gordic.Bpl.WebClient {
    type DtoType = Gordic.Bpl.Interface.GBplFakturaDoslaDto;
    type UsedComponents = Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoType> & Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions;
    /****************************************
     * GDetailDokladuTab
     *
     * @author Michal Prošek
     * @since 480.1.0.17
     */
    class GDetailDokladuTab extends GDetailBuilderContent<UsedComponents> implements IGContent {
        /**
         * DTO detailu dokladu
         * @type {Gordic.Bpl.Interface.GBplFakturaDoslaDto}
         */
        private DetailDto;
        ixpDenNovy: string;
        private ixp;
        private AktSubrady;
        private jeEditovatelne;
        private jeUlozeno;
        private validators;
        private povoleneDoklady;
        private recapDPH;
        private $gridVazby;
        private $gridVazbyPolSML;
        private dataVazby;
        private dataVazbyPolozekSml;
        private polozkyBadge;
        private badgeVecnyProfil;
        private badgeKryti;
        private badgeLikvidace;
        private badgeLikvidaceZaloh;
        private badgeUctovani;
        private vazbySmlBadge;
        /** Badge s počtem aktuálně navrhovaných akcí. Bude potřeba do AI Sidebaru*/
        private tabLikvidaceVisible;
        private tabLikvidaceZalohVisible;
        /** Aktuálního počet položek věcného profilu pro badge z ContentValues*/
        private pocetPolozekVP;
        private statusSTO;
        private statusUZA;
        private statusUZO;
        private statusKRY;
        private statusLIK;
        private statusUHR;
        private statusUCT;
        private statusFIK;
        private statusOST;
        private changeDoruceniPromise;
        private changeZdanPlnPromise;
        /**
         * Byla aktivní operace na detailu?
         * @type {boolean}
         */
        private AktivniOperace;
        /**
         * Pokud dojde k vytěžení souboru pomocí AI, tak si zapamatuji ixs_ulo, který se vytěžoval, abych mohl reagovat na to, že ho uživatel chce vytěžit opakovaně
         * @type {string}
        */
        private VytezenySouborPomociAI;
        /**
         * Pokud dojde k vytěžení souboru pomocí AI, tak si zapamatuji ixs_ulo, který se vytěžoval, abych mohl reagovat na to, že ho uživatel chce vytěžit opakovaně
         * @type {string}
        */
        private AkualniSouborIxsUlo;
        /**
         * Co se bude duplikovat na dokladu
         * @type {DuplikovaniDokladuVyberDto}
         */
        private duplikovaniVyber;
        /**
         * Indikátor, zda probíhá vytěžování dokladu
         * @type {boolean}
         */
        private VytezovaniDokladu;
        /**
         * Indikátor, zda se má navrhovat kontakce, zapne se po změně subjektu
         */
        private navrhovatPredkontace;
        /**
        * Indikátor, zda probíhá vytěžování dokladu
        * @type {boolean}
        */
        private CekaniNaESU;
        /**
         * Indikátor, zda se mají při evidenci kontrolovat duplicity VS a čísla faktury
         * @type {boolean}
         */
        private kontrolaDuplicit;
        /**
         * Dispečer/kolekce do které lze přidávat navrhované akce, které se zobrazí pomocí flashe navrhovaných akcí
         */
        private navrhovaneAkceDispatcher;
        /**
         * Flash pro zobrazení navrhovaných akcí
         */
        private actionFlash;
        /**
         * Indikátor, zda byla provedena nějaká změna a bude se muset dělat kontrola z Registru plátců DPH (změna Datumu Zdanitelného Plnění, Změna DIČ)
         * @type {boolean}
         */
        private provadetKontroluPlatceDPH;
        /** AI Sidebar, odkomentovat jakmile bude použit, tzn definován na detailBuilderu jako subContent*/
        povoleneKateregorieDokladu?: number[];
        uid: string;
        onContentReady(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        /**
         * onDetailBuilderInit
         * @author Michal Prošek
         * @since 482.1.0.0
         * @version 16.4.2018
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
        * Poskládání detail builderu
        @author Prošek Michal
        @param builder
        */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
        * Úprava společné EKO hlavičky detailu
        @author Prošek Michal
        */
        private createHeadForm;
        /**
         * Podání dokladu
         @author Prošek Michal
         */
        private podani;
        podaniDokladu(): JQueryPromise<any>;
        ulozeniDetailu(): JQuery.PromiseBase<void | undefined, any, never, never, never, never, never, never, never, never, never, never>;
        obcerstveniDokladu(): void;
        kontace(sender?: string): void;
        platby(): void;
        uhradaExterniPokladnou(): JQuery.PromiseBase<Event, never, never, never, never, never, never, never, never, never, never, never>;
        uctovaniLikvidace(): void;
        uctovaniKryti(): void;
        ucetniZapisy(): void;
        kontrolaPoZmeneSmlouvy(sml: any): void;
        poZmeneSubjektu(ctx: any): void;
        private vytvorPredikciPredkontacePromise;
        /**
         * Postupně přejde na taby GKontaceTab -> GRozpisPlatebTab a na něm založí novou předkontaci
         * @param predkontaceDto
         * @returns
         */
        private prejdiNaRozpisPlatebZalozPredkontaci;
        poZmeneCizihoBankovnihoUctu(ctx: any): gjqXHR<string> | undefined;
        poZmeneMeny(zmenaKurzu: boolean): gjqXHR<import("../../gin/gui/vendor/_types/decimal.js/index").default> | undefined;
        poZmeneTypuDokladu(ctx: any): void;
        poZmeneZpusobuUhrady(ctx: any): void;
        kontrolaTypuDokladu(): void;
        lzeUhradit(): gjqXHR<string>;
        nastaveniFaktoruCastky(): void;
        subjektyESUzeSML(): void;
        doplneniDatumuSplatnosti(): gjqXHR<Date>;
        /**
        * Modifikace KPI a statusbaru
        * @autor Michal Prošek
        */
        private modifikaceKPIaSTATUSBARU;
        disabledPolicek(control: string, doplnek?: number): boolean;
        nactiSeznamVazebDokladu(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        nactiSeznamVazebPolozekSmluv(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        dataDoRekapitulace(): Gin.WebClient.IGRecapPricesMap;
        nastavSazbyDoRekapitulace(date?: Date): JQuery.Promise<any, any, any>;
        dataZRekapitulace(): void;
        DoplnObdobiDPH(datumZdPl: Date): JQuery<any>;
        /**
        * Obsluha aktivní operace
        *
        * @param {JQuery.Event} ev událost
        * @param {any} ctx? původní událost a její argumenty
        */
        onDetailBuilderActiveOp(ev: JQuery.Event, ctx?: any): void;
        /**
         * Nastaví příznak aktivní operace a znovu načte celý formulář
         * @author Michal Prošek
         * @param {boolean} NacteniDat (default = false) true = aktualizovat data
         */
        private aktivniOperaceZnovunacteniDat;
        /**
         * Znovunačtení agendových dat bez aktualizace formuláře - DetailDto
         * @author Michal Prošek
         * @since 488.1.0.0
         * @version 30.3.2022
         * @param { string } sender
         */
        private nacteniDetailu;
        /**
         * Co se stane, pokud se uzavírá doklad
         * @author Michal Prošek
         * @since 486.1.0.0
         * @version 16.4.2021
         */
        closing(): boolean | JQuery.PromiseBase<boolean, any, never, never, never, never, never, never, never, never, never, never>;
        /**
         * Zakázané políčko - Rozklíčování, zda není dodatečná podmínka pro needitovatelnost políčka
         * @author Michal Prošek
         * @since 488.1.0.0
         * @version 31.8.2022
         * @param { string } policko
         * @returns TRUE = dodatečně zakázané pole, FALSE = nezakázané pole
         */
        private zakazanePolicko;
        hromadneOperace(vybraneRadky: Bpl.Interface.GBplFakturaDoslaDto, operace: Bpl.HromadneOperace): void;
        /**
         * Společný bod pro hromadné operace na detailu dokladu - dříve přes wizard
         * @author Michal Prošek
         * @since 490.1.0.0
         * @version 14.9.2023
         * @param { string } validacniFunkce - název validační funkce, která provede kontrolu, zda jde operaci vykonat
         * @param { string } vykonnaFunkce - název výkonní funkce, která se provede po validaci
         * @param { Gordic.Forms.Form } form - formulář, který se má pro danou operaci zobrazit
         * @param { GSimpleFormDialogOptions } dialogOptions - nepovinný parametr, který případně upravuje vzhled od formuláře, pokud má být jiný než je pro hromadnou operaci
         * @returns při úspěšném provedení nevrací nic, jinak výjimku
         */
        hromadnaOperaceProJedenDoklad(options: {
            validacniFunkce: string;
            vykonnaFunkce: string;
            form: Gordic.Forms.Form;
            title: string;
            dialogOptions?: GSimpleFormDialogOptions;
            operace: HromadneOperace;
            data?: Interface.GBplFakturaDoslaDto;
        }): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        /**
         * Změna datumu splatnosti v databázi
         *
         * @param {Date} datumSplatnosti Nový datum splatnosti zvolený uživatelem
         * @param {Date} datumZmeny Datum změny dokladu, pro kontrolu, zda jiný uživatel nezměnil záznam
         */
        zmenaDatumuSplatnosti(ixp: string, datumSplatnosti: Date, datumZmeny: Date): gjqXHR<string>;
        /**
         * Rezervace příjmů
         *
         * @param {String} ixp Identifikátor dokladu
         * @param {Decimal} c_celk Celková částka dokladu
         * @param {Date} datumZmeny Datum změny dokladu, pro kontrolu, zda jiný uživatel nezměnil záznam
         */
        rezervacePrijmu(ixp: string, c_celk: JsonDecimal, datumZmeny: JsonDate): JQuery.PromiseBase<any, any, never, never, never, never, never, never, never, never, never, never>;
        podaniDleVzoru(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        KontrolaObdobiDatumuDPH(zobrazovatHlasky: boolean): boolean;
        nacteniQRkodu(zeSouboru: boolean): JQuery.PromiseBase<void, any, never, never, never, never, never, never, never, never, never, never>;
        ZadavaniKurzu(): null;
        ISDOCVytezovani(ixp: string): JQuery.PromiseBase<boolean, any, never, never, never, never, never, never, never, never, never, never>;
        AIVytezovani(ixp: string): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        initAI(): void;
        private getDanTyp;
        GAI(data: Gordic.Eko.Interface.GAIRecognizedItemExtendedDto[] | null, ops: GAction[]): JQuery.Promise<boolean, any, never>;
        /**
         * stejné jako původní actionFlashHandler, avšak má na vstupu params namísto pole akcí. Akce je definována na contentu, sem je pouze předána unitř menuParams
         * @param opts
         * @param menuParams parametry pro akce
         * @param caption nadpis flashe
         * @returns
         */
        actionFlashCreateHandlerMenuParams(opts: GFlashOptions, menuParams: MenuParamsAction[], caption: string): GFlashOptions;
        /**
         * Vytvoří flash, který obsahuje odrážky s linkami spustitelných akcí (spíše nepoužívat, lepší nadefinovat akci na content a použít actionFlashCreateHandlerMenuParams)
         * @param opts
         * @param actions
         * @param caption
         * @returns
         */
        actionFlashCreateHandler(opts: GFlashOptions, actions: GAction[], caption: string): GFlashOptions;
        GAItestSazbyDPH(zaklad: Decimal, dan: Decimal, rekapitulace: true, korekce: boolean): JQuery.Promise<boolean, any, never>;
        /**
        * Nastavení hodnoty a příznaku políčka
        *
        * @param {string} pole Název políčka
        * @param {any} hodnota Pokud hodnota něco obsahuje, tak se hodnota do políčka doplní
        * @param {Gordic.Eko.Interface.GAIRecognizedItemSource} zdroj Barva + ikona a tooltip, kterou se označí políčko podle zdroje vytěžení dat (AI - zeleně, GAI - oranžově, QR - zeleně)
        */
        GAInastavHodnotuApriznak(pole: string, hodnota: any, zdroj: Gordic.Eko.Interface.GAIRecognizedItemSource, pravdepodobnost: JsonDecimal): void;
        /**
        * Obarvení gridu podle způsobu vytěžení
        *
        * @param {Gordic.Gin.WebClient.ETaxType} sazba Nový datum splatnosti zvolený uživatelem
        * @param {number} sazba Sazba DPH (0 = bez DPH, 10 = základní, 20 = první snížená, 30 = druhá snížená)
        * @param {number} sloupec Sloupec, který se má obarvit (-1 = celý řádek)
        * @param {string} zpusob Barva, kterou se má obarvit buňka v rekapitulaci (AI - zeleně, GAI - oranžově, QR - zeleně)
        */
        GAInastavPriznakRekapitulace(sazba: number, sloupec: number, zpusob: string): void;
        TextAkceVazby(): string;
        /**
         *  Pokud je zaškrtnut příznak zdanění - položky VP se převedou do rekapitulace
         */
        RekapitulacePolozkyVP(soucetPolozek: Decimal, castkaFaktury: Decimal): void;
        private validatory;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GDetailKontaceTab extends GContentBase implements IGContent {
        batoh: Gordic.Bpl.Interface.DetailDokladuKdfDto;
        typKontace: Gordic.Bpl.Interface.TypKontace;
        uctovani: boolean;
        dvojiUctovani: boolean;
        private grid1;
        private grid2;
        private model1;
        private model2;
        private ixp;
        private ps_sml;
        private previewController;
        nazvyZastupek: Gordic.Bpl.Interface.GBplcprzDto[];
        dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        onContentReady(): void;
        nactiData(vsechnyRadky: boolean): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        nactiDataEVZ(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        createZastupkaTooltip(zastupka: any): string;
        columnList(kon: boolean, vst: boolean, vys: boolean): string;
        addCfuSet(gcontent: any): Gordic.Data.GridFormat<Gordic.Bpl.Interface.GEkotkonDto>;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GDuplikovaniVyberTab extends GContentBase implements IGClientContent {
        private DuplikovaniDto;
        private ZdrojoveDto;
        prepareContent(...params: any[]): void;
        KontrolaRozpisu(): void;
        duplikovaniDokladu(): void;
    }
}
declare namespace Gordic.Bpl.WebClient {
    namespace GHromadneOperaceDialogy {
        /**
        * Hromadné operace - doplňující dialog pro storno a odstorno
        *
        * @param {boolean} storno TRUE = storno, FALSE = odstorno
        * @returns {Forms.Form} Formulář s doplňujícími informacemi
        */
        function Storno(storno: boolean): Gordic.Forms.Form;
        /**
        * Hromadné operace - doplňující dialog pro Vrácení do WFL
        *
        * @returns {Forms.Form} Formulář s doplňujícími informacemi
        */
        function VratitDoWFL(): Gordic.Forms.Form;
        /**
        * Hromadné operace - doplňující dialog pro Změnu stavu zaúčtování
        *
        * @param {number} stav Požadovaný stav
        * @returns {Forms.Form} Formulář s doplňujícími informacemi
        */
        function ZmenaStavuZauctovani(stav: number, jednotlive?: boolean): Gordic.Forms.Form;
        /**
        * Hromadné operace - doplňující dialog pro Uzavření dokladu
        *
        * @param {number} stav Požadovaný stav
        * @returns {Forms.Form} Formulář s doplňujícími informacemi
        */
        function UzavreniDokladu(stav: number): Gordic.Forms.Form;
        /**
        * Hromadné operace - doplňující dialog pro Předání dokladu
        *
        * @param {Interface.GlobalsDto} GlobalniPromenne Globalní proměnné
        * @returns {Forms.Form} Formulář s doplňujícími informacemi
        */
        function PredaniDokladu(GlobalniPromenne: Interface.GlobalsDto): Gordic.Forms.Form;
        /**
        * Hromadné operace - doplňující dialog pro Přidělení dokladu
        *
        * @param {Interface.GlobalsDto} GlobalniPromenne Globalní proměnné
        * @returns {Forms.Form} Formulář s doplňujícími informacemi
        */
        function PrideleniDokladu(GlobalniPromenne: Interface.GlobalsDto): Gordic.Forms.Form;
        /**
        * Hromadné operace - doplňující dialog pro Přidělení dokladu
        *
        * @param {Interface.GlobalsDto} GlobalniPromenne Globalní proměnné
        * @returns {Forms.Form} Formulář s doplňujícími informacemi
        */
        function PrevzetiDokladu(GlobalniPromenne: Interface.GlobalsDto): Gordic.Forms.Form;
        /**
        * Hromadné operace - doplňující dialog pro Přeevidenci dokladu
        *
        * @param {Interface.GlobalsDto} GlobalniPromenne Globalní proměnné
        * @returns {Forms.Form} Formulář s doplňujícími informacemi
        */
        function PreevidenceDokladu(GlobalniPromenne: Interface.GlobalsDto): Gordic.Forms.Form;
        /**
        * Hromadné operace - formulářové a obslužné údaje jednotlivých operací
        *
        * @param {Bpl.HromadneOperace} operace Globalní proměnné
        * @param {GContent} parentContent ParentContent
        * @returns {dto} údaje formuláře operace
        */
        function UdajeHromadnychOperaci(options: {
            operace: Bpl.HromadneOperace;
            parentContent: GContent;
        }): {
            TitulekOperace: string;
            PopisOperace: string;
            TitulekDoplnujiciInformace: string;
            TitulekGridu: string;
            NazevOperace: string;
            PreValidacniFunkce: string;
            ValidacniFunkce: string;
            VykonnaFunkce: string;
            DoplnujiciTlacitka: MenuParams[];
            DialogDoplnujiciInformace: undefined;
            TypPruvodce: number;
            Mapovani: (d: any) => {
                ixp: any;
            };
        } | {
            TitulekOperace: string;
            PopisOperace: string;
            TitulekDoplnujiciInformace: string;
            TitulekGridu: string;
            NazevOperace: string;
            PreValidacniFunkce: string;
            ValidacniFunkce: string;
            VykonnaFunkce: string;
            DoplnujiciTlacitka: MenuParams[];
            DialogDoplnujiciInformace: Forms.Form;
            TypPruvodce: number;
            Mapovani: (d: any) => {
                ixp: any;
            };
        } | undefined;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GHromadneOperaceTab extends GContentBase {
        uid: string;
        gridFormat: Data.GridFormat;
        primarniKlic: string;
        profil: null;
        operace: HromadneOperace;
        m_sNazevOperace: string;
        m_sTitulekOperace: string;
        m_sPopisOperace: string;
        m_sTitulekDoplnujiciInformace: string;
        m_sTitulekGridu: string;
        m_sPreValidacniFunkce: string;
        m_sValidacniFunkce: string;
        m_sVykonnaFunkce: string;
        m_oDialogDoplnujiciInformace: Forms.Form | undefined;
        m_oTypPruvodce: number;
        m_nKrok: number;
        m_oDoplnujiciTlacitka: MenuParams[];
        m_oMapovani: (data: Bpl.Interface.SeznamDokladuKdfDto) => object;
        m_oPromisy: JQuery.Promise<any>[];
        prepareContent(args: HromadneOperaceInputOptions<any>): void;
        private pruvodce2k;
        /**
         * Zobrazení detailu platby
         *
         * @param {GContent} content content
         * @param {JQuery} $grid seznamový grid
         * @param {Bpl.Interface.SeznamDokladuKdfDto | null} row aktuální řádek (pro zobrazení detailu) nebo null (pro podání)
         * @param {boolean} fromWizard (default = false) voláno z průvodce (true = ano, false = ne, voláno jen zobrazení detailu ze seznamu)
         * @param {()} [wizardRefreshAndCheckDataAction] akce volaná po ukončení detailu (pouze pro fromWizard = true)
         */
        private openDetail;
    }
    interface HromadneOperaceInputOptions<TData> {
        data: TData[];
        columns: Gordic.Data.GridFormat<TData>;
        primaryKeys?: any;
        operace: HromadneOperace;
        profil?: any;
    }
}
declare namespace Gordic.Gin.WebClient {
    /** interface dialogu událostí kalendáře (zobrazen jako grid) */
    interface IGCalendarEventDialog {
        /** typ dialogu */
        type: GCalendarTypeEventsEnum;
        /** identifikátor dokumentu/spisu (pouze pro typ UdalostiSpojeneDokSpis)*/
        ixp?: string | null;
        /** nadřazený element, pokud potřebujeme předat focus zpět */
        currentTarget?: Element;
    }
    class GKalendarDate {
        /**
        * získat vstupní datum
        * @param date aktuální datum v kalendáři
        */
        static getDates(date?: Date): {
            dateOd: Date;
            dateDo: Date;
        };
        /** nastavení času */
        private static setTime;
    }
    /**
     * Servisní TS třída kalendáře v EPK
     *
     * @author thazmuka
     * @since 480.1.0.36
     */
    class GKalendar {
        /** funkční místo ze sessionInfo */
        private ixs_fun;
        constructor(ixs_fun?: string);
        private gcalendarWidget;
        /** příznak zabraňující znovuvytvoření kalendáře */
        private openFlag;
        private async;
        /** občertvení notifikací */
        private refreshNotifications;
        /**
         * metoda pro otevření komponenty kalendáře
         * - volaná z GWflMainApp.cs, kde je definované tlačítko dole v menu
         */
        open(): void;
        /**
        * připravit notifikace
        */
        prepare(): void;
        private addButtonAboutImportantEvents;
        /**
        * překreslit kalendář
        */
        private refreshCalendar;
        /**
         * otevřít dialog seznamu specifických události (dle zvoleného typu)
         */
        openEventDialog(opt: IGCalendarEventDialog): void;
        private gcontent;
        private modalWindowElement;
        private showModalWindow;
        private listImportantEvents;
        private listDokSpisEvents;
        private view;
        private createGrid;
        /**
          * vytvořit commandbar
          */
        private createCommandBar;
        /**
         * nastavení automatického zavření na dialogu kalendáře
         * @param autoClose automatické zavření
         */
        private setAutoCloseToCalendar;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GPlatbyTab extends GContentBase implements IGContent {
        private grid1;
        private grid2;
        private model1;
        private model2;
        batoh: Gordic.Bpl.Interface.DetailDokladuKdfDto;
        private Ixp;
        private aktualniRadek?;
        private pocetRadku;
        private previewController;
        private presRadky;
        onContentReady(): void;
        lzeStornovatPlatbu(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        stornoPlatby(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        nactiData1(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        nactiData2(radek_uhr: number): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        predpisyParovani(): void;
        predpisyParovaniRadek(): void;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GPredpisBucTab extends GContentBase implements IGContent {
        private $grid;
        private PresRadky;
        private data;
        private Zbyva;
        onContentReady(): void;
        nactiData(): void;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GQRkodReaderTab extends GContentBase implements IGClientContent {
        batoh: Interface.DetailDokladuKdfDto;
        prepareContent(): void;
        nacteniQR(): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GSmlEsuTab extends GContentBase implements IGContent {
        private $grid;
        private data;
        onContentReady(): void;
        nactiSeznamSmlSubjektu(): void;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GUhradaExterniPokladnouTab extends GContentBase implements IGClientContent {
        batoh: Interface.DetailDokladuKdfDto;
        prepareContent(): void;
        predplneniKnihy(): JQuery.PromiseBase<boolean, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        predplneniCastkyPopisu(): void;
        externiUhrada(): JQuery.Promise<any, any, any>;
        private validatory;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GUhraditTab extends GContentBase implements IGContent {
        batoh: Interface.DetailDokladuKdfDto;
        c_celk: JsonDecimal;
        c_celk_mena: JsonDecimal;
        c_kuhr: JsonDecimal;
        c_kuhr_mena: JsonDecimal;
        c_zust: JsonDecimal;
        c_zust_mena: JsonDecimal;
        maxCastka: JsonDecimal;
        onContentReady(): void;
        ZmenaCastky(): void;
        PrednastaveniDatumuUhrady(): JsonDate;
        NactiObdobiDPH(): void;
        poZmeneUpresneniUhrady(ctx: any): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        Banka(): JQuery.PromiseBase<any, JQuery.jqXHR<any>, never, never, JQuery.Ajax.ErrorTextStatus | "validation" | "exception", never, never, ObjectLiteral<any>, never, never, never, never>;
        kontrolaPredOdeslanimDoBanky(parametry: Gordic.Bpl.Interface.GBplFakturaDoslaUhradaDto): JQueryPromise<Isl.GServiceActionResponse<Interface.GBplFakturaDoslaUhradaDto>>;
        private validatory;
    }
}
declare namespace Gordic.Bpl.WebClient {
    namespace KontaceConstData {
        var kontaceData: {
            kod_kon: string;
            nazev: string;
        }[];
        var dataKontace: {
            "B001-000": {
                nks: string;
                nazev: string;
                zmenu_prov_txt: string;
                dat_zmena: string;
                rows: ({
                    isParent: boolean;
                    ueb: {
                        code: string;
                        compensation: string;
                    };
                    ued: {
                        code: string;
                        compensation: string;
                    };
                    uee: {
                        code: string;
                        compensation: string;
                    };
                    uef: {
                        code: string;
                        compensation: string;
                    };
                    ueg: {
                        code: string;
                        compensation: string;
                    };
                    te0: {
                        code: string;
                        compensation: string;
                    };
                    te1: {
                        code: string;
                        compensation: string;
                    };
                    uea?: undefined;
                } | {
                    isParent: boolean;
                    uea: {
                        code: string;
                        compensation: string;
                    };
                    ueb: {
                        code: string;
                        compensation: string;
                    };
                    ued: {
                        code: string;
                        compensation: string;
                    };
                    uee: {
                        code: string;
                        compensation: string;
                    };
                    uef: {
                        code: string;
                        compensation: string;
                    };
                    ueg: {
                        code: string;
                        compensation: string;
                    };
                    te0: {
                        code: string;
                        compensation: string;
                    };
                    te1: {
                        code: string;
                        compensation: string;
                    };
                })[];
            };
            "B001-011": {
                nks: string;
                nazev: string;
                zmenu_prov_txt: string;
                dat_zmena: string;
                rows: ({
                    isParent: boolean;
                    ueb: {
                        code: string;
                        compensation: string;
                    };
                    uef: {
                        code: string;
                        compensation: string;
                    };
                    ueg: {
                        code: string;
                        compensation: string;
                    };
                    te0: {
                        code: string;
                        compensation: string;
                    };
                    te1: {
                        code: string;
                        compensation: string;
                    };
                    uea?: undefined;
                    ued?: undefined;
                    uee?: undefined;
                } | {
                    isParent: boolean;
                    uea: {
                        code: string;
                        compensation: string;
                    };
                    ueb: {
                        code: string;
                        compensation: string;
                    };
                    ued: {
                        code: string;
                        compensation: string;
                    };
                    uee: {
                        code: string;
                        compensation: string;
                    };
                    uef: {
                        code: string;
                        compensation: string;
                    };
                    ueg: {
                        code: string;
                        compensation: string;
                    };
                    te0: {
                        code: string;
                        compensation: string;
                    };
                    te1: {
                        code: string;
                        compensation: string;
                    };
                })[];
            };
            "B001-002": {
                nks: string;
                nazev: string;
                zmenu_prov_txt: string;
                dat_zmena: string;
                rows: ({
                    isParent: boolean;
                    ueb: {
                        code: string;
                        compensation: string;
                    };
                    ued: {
                        code: string;
                        compensation: string;
                    };
                    uee: {
                        code: string;
                        compensation: string;
                    };
                    uef: {
                        code: string;
                        compensation: string;
                    };
                    ueg: {
                        code: string;
                        compensation: string;
                    };
                    te0: {
                        code: string;
                        compensation: string;
                    };
                    te1: {
                        code: string;
                        compensation: string;
                    };
                    uea?: undefined;
                } | {
                    isParent: boolean;
                    uea: {
                        code: string;
                        compensation: string;
                    };
                    ueb: {
                        code: string;
                        compensation: string;
                    };
                    ued: {
                        code: string;
                        compensation: string;
                    };
                    uee: {
                        code: string;
                        compensation: string;
                    };
                    uef: {
                        code: string;
                        compensation: string;
                    };
                    ueg: {
                        code: string;
                        compensation: string;
                    };
                    te0: {
                        code: string;
                        compensation: string;
                    };
                    te1: {
                        code: string;
                        compensation: string;
                    };
                })[];
            };
        };
    }
    class GKontaceTab extends GContentBase implements IGContent {
        batoh: Gordic.Bpl.Interface.DetailDokladuKdfDto;
        private ixp;
        private agenda;
        private dataSentence;
        rozpisPlateb: JQuery;
        private kryti;
        private uctovaniKryti;
        sentenceColumnsKry: string[];
        onContentReady(): void;
        private obnovitKrytiNew;
        private hodnotyZahlavi;
    }
}
declare namespace Gordic.Bpl.WebClient {
    type castkaType = Decimal | JsonDecimal | null | undefined;
    interface kontaceInputInfoKryLik extends Gordic.Bpl.Interface.GKdfdkryDto {
        rows: Gordic.Eko.WebClient.inputKontaceData[];
    }
    export class GKryLikBaseTab extends GContentBase {
        batoh: Interface.GBplFakturaDoslaDto;
        private GlobalniPromenne;
        modelRadkyKryLik: Gordic.Bpl.Interface.GKdfdkryDto[];
        modelDetailKontace: Gordic.Bpl.Interface.GEkotkonDto[];
        protected dataSentence: Gordic.Eko.WebClient.GDataSentenceDto;
        protected editable: boolean;
        protected porizovac: Gordic.Eko.WebClient.GPorizovacBpl;
        doplnkovyRadek: boolean;
        duhrRow: Bpl.Interface.GKdfDkryDuhrSkonDto;
        rok: number;
        private bpl_zsml_ac;
        sentenceColumns: string[];
        castkyNks: castkaNks[];
        private is_vyz;
        m_c_z0: Decimal;
        m_c_z1: Decimal;
        m_c_z2: Decimal;
        m_c_z3: Decimal;
        private jeUcetSP;
        private stavUhrady;
        private spravnyRok;
        private castkaCilova;
        Init(typKontace: Gordic.Bpl.Interface.TypKontace, globalniPromenne: Interface.GlobalsDto): void;
        loadData(typKontace: Gordic.Bpl.Interface.TypKontace): gjqXHR<any>;
        getActNew(typKontace: Gordic.Bpl.Interface.TypKontace): GActionParamsDefObj;
        getActNewDopl(visible: boolean): GActionParamsDefObj;
        getActSchvalit(typKontace: Gordic.Bpl.Interface.TypKontace): GActionParamsDefObj;
        getActOdschvalit(typKontace: Gordic.Bpl.Interface.TypKontace): GActionParamsDefObj;
        getActZrusitEditaci(typKontace: Gordic.Bpl.Interface.TypKontace): GActionParamsDefObj;
        getActOpravit(): GActionParamsDefObj;
        getActDetailKontace(typKontace: Gordic.Bpl.Interface.TypKontace): GActionParamsDefObj;
        getActAktivni(typKontace: Gordic.Bpl.Interface.TypKontace): GActionParamsDefObj;
        getActNavazatNaPolozkuSmlouvy(typKontace: Gordic.Bpl.Interface.TypKontace): GActionParamsDefObj;
        getActOdvazatOdPolozkySmlouvy(typKontace: Gordic.Bpl.Interface.TypKontace): GActionParamsDefObj;
        getActZmenaNS(): GActionParamsDefObj;
        PoOdschvaleni(result: GSchvaleniResultDto, typKontace: Gordic.Bpl.Interface.TypKontace): JQuery.Promise<any, any, any>;
        NavazatNaPolozkuSmlouvy(typKontace: Gordic.Bpl.Interface.TypKontace, uea_rr: string, ueb_rr: string, currentRow: any): void;
        detailPredkontace(typKontace: Gordic.Bpl.Interface.TypKontace): void;
        addRadekColumn(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
        addUpStavColumn(gridFormat: Gordic.Data.GridFormat<any>, typKontace: Gordic.Bpl.Interface.TypKontace): this;
        addKodKontaceColumn(gridFormat: Gordic.Data.GridFormat<any>, typKontace: Gordic.Bpl.Interface.TypKontace): Data.GridFormat<any>;
        addDoplnkovyRadekColumn(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
        addPolozkaSmlouvyColumn(gridFormat: Gordic.Data.GridFormat<any>, typKontace: Gordic.Bpl.Interface.TypKontace): Data.GridFormat<any>;
        addPriznakVratkyColumn(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
        addNksColumn(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
        addCastkaLikColumn(gridFormat: Gordic.Data.GridFormat<any>, dphDto: Gordic.Bpl.WebClient.GDphDto): Data.GridFormat<any>;
        addCastkaLikZalohColumn(gridFormat: Gordic.Data.GridFormat<any>, c_z0: castkaType, c_z1: castkaType, c_z2: castkaType, c_z3: castkaType, c_z1_d: castkaType, c_z2_d: castkaType, c_z3_d: castkaType, c_d1: castkaType, c_d2: castkaType, c_d3: castkaType, c_d1_d: castkaType, c_d2_d: castkaType, c_d3_d: castkaType, c_zaokr: castkaType): Data.GridFormat<any>;
        addCastkaKryColumn(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
        addInventarniCisloColumn(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
        addNazevColumn(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
        addTzhColumn(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
        addIxpSmlZnamSmlPolColumns(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
        addZmenuProvDatZmenaIxpIxsKonColumns(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
        addRokColumn(gridFormat: Gordic.Data.GridFormat<any>): Data.GridFormat<any>;
        pridejCastkuDoNabidky(d: Array<{
            c: any;
            name: any;
        }>, c: JsonDecimal | null | undefined, name: string): Array<{
            c: any;
            name: any;
        }>;
        createPorizovac(typKontace: Gordic.Bpl.Interface.TypKontace, gfBefore: Gordic.Data.GridFormat<any>, gfAfter: Gordic.Data.GridFormat<any>): void;
        podminkaSumLik(typKontace: Gordic.Bpl.Interface.TypKontace, radek: any): boolean;
        suma(typKontace: Gordic.Bpl.Interface.TypKontace): Decimal;
        sumaNks(typKontace: Gordic.Bpl.Interface.TypKontace, nks: string): Decimal;
        sumaSch(typKontace: Gordic.Bpl.Interface.TypKontace): Decimal;
        enabledTlacitek(typKontace: any): void;
        CreateDataKryLik(kryti: boolean, krylikRows: Gordic.Bpl.Interface.GKdfdkryDto[], detailyKontaciRows: Gordic.Bpl.Interface.GEkotkonDto[], dataSentence: Gordic.Eko.WebClient.GDataSentenceDto, editable: boolean): kontaceInputInfoKryLik[];
    }
    export {};
}
declare namespace Gordic.Bpl.WebClient {
    interface castkaNks {
        nks: string;
        castka: Decimal;
    }
    namespace GKryLikTools {
        function SaveRow(row: Gordic.Eko.WebClient.kontaceInputInfo, ixp: string, dataSentence: Eko.WebClient.GDataSentenceDto): {
            radek: Interface.GKdfdkryDto;
            zastupky30: string;
            hodnoty30: string;
        };
        function NksKryLikInfo(ixp: string | null | undefined, rok: number, typKontaceProtipredpis: number, stavProtipredpis: number | null | undefined, parentContent: GContent, ktgTyp: number | null | undefined): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        function OnStartEdit(parentContent: GContent): void;
        function OnStartEditNks(ixp: string | null | undefined, rok: number, typKontaceProtipredpis: number, stavProtipredpis: number | null | undefined, parentContent: GContent, ktgTyp: number | null | undefined, oldNks: string | null | undefined): void;
        function OnStartEditAcSml(parentContent: GContent): void;
        function OnStartEditCastka(nks: string, castkyNks: castkaNks[] | undefined, parentContent: GContent, c: Decimal, suma: Decimal, sumaNks: Decimal, oldCastka: Decimal, typKontaceProtipredpis: number): void;
        function EditovatelnostDokladu(batoh: Bpl.Interface.GBplFakturaDoslaDto, GlobalniPromenne: Gordic.Bpl.Interface.GlobalsDto): boolean | null | undefined;
        function Edit(polozkaSablony: boolean, batoh: Bpl.Interface.GBplFakturaDoslaDto, typKontace: number, rok: number, GlobalniPromenne: Gordic.Bpl.Interface.GlobalsDto): boolean;
        function editState(radky: any[]): {
            changed: boolean;
            requiredColumnsFilled: boolean;
        };
        function vizuelniStavKryti(castkaCilova: Decimal, castkaSoucet: Decimal, castkaSoucetSch: Decimal): Bpl.Interface.GBplGlobalsBase.CashStavKryti;
        function addBtCondition(enabledObj: {
            result: boolean;
            tooltip: string;
        }, condition: boolean, tooltipPart: string): void;
        function VolejSchvaleni(vstupy: VstupySchvaleniDto, that: GContent, radkyKrylik: Interface.GKdfdkryDto[], detailKontace: Interface.GEkotkonDto[], dataSentence: Eko.WebClient.GDataSentenceDto): any;
        function generateCustomClassFunction(up_stav: number, editable: boolean): "" | "ui-disabled" | "ui-disabled ui-disabled-black" | "ui-disabled schvalene-kryti";
        function pouzeAktivniRadky(action: GAction): boolean;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GKrytiTabNew extends GContentBase implements IGContent {
        private basePart;
        batoh: Interface.GBplFakturaDoslaDto;
        private GlobalniPromenne;
        private porizovac;
        castkaRozpisu: Decimal;
        bu_vl: string;
        sk_vl: string;
        rok: number;
        typ_bu: number;
        ixs_kon: string;
        duhrRow: Bpl.Interface.GKdfDkryDuhrSkonDto;
        private modelRadkyKryLik;
        private modelDetailKontace;
        private radekUhrady;
        private jeUcetSP;
        private stavUhrady;
        private spravnyRok;
        private bpl_zsml_ac;
        private typKontace;
        private dataSentence;
        sentenceColumns: string[];
        private my_CondFormat;
        private my_CondFormats;
        castkyNks: castkaNks[];
        onContentReady(): void;
        private getBasePart;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GLikvidaceTabGroup extends GContentBase implements IGContent {
        private ixp;
        private likvidace;
        private likvidaceZaloh;
        private uctovaniLikvidace;
        batoh: Gordic.Bpl.Interface.DetailDokladuKdfDto;
        tabLikvidaceVisible: boolean;
        tabLikvidaceZalohVisible: boolean;
        onContentReady(): void;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GLikvidaceTabNew extends GContentBase implements IGContent {
        private basePart;
        batoh: Interface.GBplFakturaDoslaDto;
        private GlobalniPromenne;
        rok: number;
        private porizovac;
        kdfDuhrRows: Gordic.Bpl.Interface.GKdfDkryDuhrSkonDto[];
        modelRadkyKryLik: Gordic.Bpl.Interface.GKdfdkryDto[];
        private modelDetailKontace;
        private dataSentence;
        sentenceColumns: string[];
        private stavUhrady;
        private spravnyRok;
        private bpl_zsml_ac;
        private doplnkovyRadek;
        private dphDto;
        castkyNks: castkaNks[];
        private typKontace;
        private p0;
        private p1;
        onContentReady(): void;
        private getBasePart;
        loadInfoCastek(): void;
        refreshInfoPoli(c0: number, c1: Decimal): void;
        infoCastky(): JQuery<HTMLElement>;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GLikvidaceZalohTab extends GContentBase implements IGContent {
        private basePart;
        batoh: Interface.GBplFakturaDoslaDto;
        private GlobalniPromenne;
        rok: number;
        private porizovac;
        kdfDuhrRows: Gordic.Bpl.Interface.GKdfDkryDuhrSkonDto[];
        private modelRadkyKryLik;
        private modelDetailKontace;
        private dataSentence;
        sentenceColumns: string[];
        castkyNks: castkaNks[];
        private stavUhrady;
        private spravnyRok;
        private bpl_zsml_ac;
        private doplnkovyRadek;
        private dphDto;
        private dphDtoDoNabidky;
        private castkaCilova;
        private typKontace;
        private is_vyz;
        m_c_z0: Decimal;
        m_c_z1: Decimal;
        m_c_z2: Decimal;
        m_c_z3: Decimal;
        m_c_d1: Decimal;
        m_c_d2: Decimal;
        m_c_d3: Decimal;
        m_c_z1_d: Decimal;
        m_c_z2_d: Decimal;
        m_c_z3_d: Decimal;
        m_c_d1_d: Decimal;
        m_c_d2_d: Decimal;
        m_c_d3_d: Decimal;
        m_c_zaokr: Decimal;
        private p0;
        private p1;
        onContentReady(): void;
        private getBasePart;
        loadInfoCastek(): void;
        refreshInfoPoli(c0: number, c1: Decimal): void;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GPredkontaceUtils {
        static isPredkontaceValid(pred: Interface.GBplPredikcePredkontaceDto | undefined | null): pred is Interface.GBplPredikcePredkontaceDto;
        static isPredkontaceEq(p1: Interface.GBplPredikcePredkontaceDto, p2: Interface.GBplPredikcePredkontaceDto): boolean;
        /**
         * Sets all properties to null, mutates the passed object
         * @param predkontace
         */
        static invalidate(predkontace: Interface.GBplPredikcePredkontaceDto): void;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GRozpisPlatebTab extends GContentBase implements IGContent {
        static readonly ROZPIS_PLATEB_CLASS = "js-rozpisPlateb";
        batoh: Interface.GBplFakturaDoslaDto;
        model: Gordic.Bpl.Interface.GKdfDkryDuhrSkonDto[];
        private grid;
        private vybranyRadek;
        private PristupAkciKontace;
        private editovatelnostDokladu;
        private p0;
        private p1;
        private p2;
        private p3;
        private p4;
        filtrNaProtipredpis: boolean;
        onContentReady(): void;
        /**
         * Provede validaci předkontace, pokud dopadne, založí v gridu nový záznam s přednastavenými hodnotami.
         *  Vrací chybovou hlášku nebo prázdný string, pokud vše proběhlo v pořádku
         * @param predkontaceDto
         * @returns Chybovou hlášku nebo prázdný string, pokud vše proběhlo v pořádku
         */
        novyZaznamPrednastaveneKontace(predkontaceDto: Interface.GBplPredikcePredkontaceDto): void;
        /**
         * Metoda extrahovaná z akce pro tlačítko Nový, aby ji bylo možné volat z jiných míst
         * @param globalniPromenne nemá cenu načítat stále dokola, takže se předává jako parametr
         * @param predkontaceDto pokud je vyplněná předkontace, tak se předvyplní
         * @returns
         */
        runActNovy(globalniPromenne: Gordic.Bpl.Interface.GlobalsDto, predkontaceDto?: Interface.GBplPredikcePredkontaceDto): void;
        generateCustomClass(aktivita: number, editable: boolean | null | undefined): "" | "ui-disabled" | "ui-state-disabled";
        pristupTlacitek(radek: Interface.GKdfDkryDuhrSkonDto): void;
        suma(): Decimal;
        odstranRadek(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never> | undefined;
        lzeUhradit(): gjqXHR<string>;
        uhrada(): JQuery.PromiseBase<any, never, never, never, never, never, never, never, never, never, never, never> | null;
        platby(): JQuery.Promise<any, any, any>;
        loadInfoCastek(): void;
        refreshInfoPoli(c0: number, c1: Decimal, c2: Decimal, c3: Decimal, s4: string): void;
        infoCastky(): JQuery<HTMLElement>;
        spocitejStavKryti(castkaCZK: Decimal, castkaKryti: Decimal): number;
        nacteniCastekPodleBU(detail: Interface.GBplFakturaDoslaDto, bu_vl: string, sk_vl: string): any;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GUctovaniKrytiLikvidaceTab extends GContentBase implements IGContent {
        private $grid;
        private pristupAkci;
        batoh: Gordic.Bpl.Interface.DetailDokladuKdfDto;
        typKontace: Gordic.Bpl.Interface.TypKontace;
        view: Isl.View<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>;
        private data;
        private opravaSubradyMenu;
        private GlobalniPromenne;
        onContentReady(): void;
        /**
          * Změna datumu zaúčtování v databázi
          *
          * @param {string} ixp Identifikátor dokladu
          * @param {number} radek Řádek učetní likvidace
          * @param {Date} noveDatum Nový datum zaúčtování zvolený uživatelem
          * @param {Date} datumZmeny Datum změny dokladu, pro kontrolu, zda jiný uživatel nezměnil záznam
        */
        zmenaDatumuZauctovani(ixp: string, radek: number, noveDatum: Date, datumZmeny: Date): gjqXHR<string>;
        coloring(metarow: MetaRow<Bpl.Interface.SeznamKryLikDto>): string;
        detailPredkontace(): void;
        UctovaniLikvidace(opts?: {
            showDodatecneDialog?: boolean;
        }): any;
        PristupnostAkci(): void;
        OductovaniLikvidace(opts?: {
            showDialog?: boolean;
            showDatumDialog?: boolean;
            showObdobiDialog?: boolean;
            showRokKnihyDialog?: boolean;
            showDodatecneDialog?: boolean;
        }): any;
        ZmenaSubradyZKnihy(opts?: {
            showDialog?: boolean;
        }): any;
        ZmenaSubrady(opts?: {
            metoda: string;
            showVyberRadek?: boolean;
            showDialog?: boolean;
            subrada?: number;
            uus?: string;
        }): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any> | undefined;
        KontrolaUcetnihoObdobi(mesic_dph: number, rok_dph: number): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        KontrolaDanovehoPriznani(mesic_dph: number, rok_dph: number, data: Bpl.Interface.SeznamKryLikDto, datumOductovani: Date): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        LikvidaceUctovani(oductovani: boolean, datumOductovani: Date): JQuery.PromiseBase<void | undefined, any, never, never, never, never, never, never, never, never, never, never> | undefined;
    }
}
declare namespace Gordic.Bpl.WebClient {
    class GUctovaniTabGroup extends GContentBase implements IGContent {
        private ixp;
        private agenda;
        private likvidace;
        private kryti;
        batoh: Gordic.Bpl.Interface.DetailDokladuKdfDto;
        onContentReady(): void;
    }
}
declare namespace Gordic.Bpl.WebClient {
    /** Seznam položek věcného profilu */
    class GVecnyProfilTab extends GContentBase {
        /** Ixp dokladu */
        ixp: string;
        /** Částka dokladu v měně */
        castka: Decimal;
        /** Částka zálohy přenesená z dokladu */
        zaloha: number;
        /** Kurz měny přenesený z dokladu */
        kurz: Decimal;
        /** Měna přenesená z dokladu */
        mena: string;
        /** Snížená sazba DPH z dokladu */
        sDph: Decimal;
        /** 2. snížená sazba DPH z dokladu */
        s2Dph: Decimal;
        /** Základní sazba DPH z dokladu */
        zDph: Decimal;
        /** Měsíc DPH z dokladu */
        mesicDPH: number;
        /** Rok DPH z dokladu */
        rokDPH: number;
        /** Příznak daňového dokladu */
        danovyDoklad: boolean;
        /** Příznak dodanění z dokladu */
        dodaneni: number;
        /** Příznak, že jde o splátku platebního nebo splátkového kalendáře */
        prizSplatky: boolean;
        /** Spuštěný modul jako string */
        private AppStr;
        private BplDoc;
        /** Aktuální rok */
        private rok;
        /** Aktuální nks */
        private nks;
        /** Aktuální ucs */
        private ucs;
        /** Aktuální ico */
        private ico;
        /** proměnná pro režim měny dokladu */
        private menaCzk;
        /** Upozornění zjištěné při načítání na c# straně */
        private warning;
        /** Indikátor, zda se počítá DPH (zhora nebo zespoda) po novu §37/2019 s */
        private vypocetDPHpoNovu;
        private l_dMaxZaokr;
        private pok_rad_pspovol;
        private pok_rad_psfiltr;
        private eko_dph_zaokr;
        /** Příznak, zda byly změněny položky vp */
        private changed;
        /** Způsob zaokrouhlení - (0 = bez zaokrouhlení, 1 = zaokrouhlení na 0,50 Kč, 2 = zaokrouhlení na celé koruny) */
        private l_oAutZaokr;
        /** Indikátor, že se bude DPH zaokrouhlovat na celé koruny - pro Havrdu */
        private m_bZaokrouhleniDPH;
        /** Suffix podle měny pro sloupce a políčka */
        private suffix;
        /** Aktuálně načtené service permissions záznamů */
        private servicePermissions;
        /** Součet za položky předaný pro detail */
        private soucetZaPolozkyDetail;
        /** Příznak, zda byl výpočet hodnot na detailu počítán shora/zleva */
        private vypocetShora;
        private $poznamkaNad;
        private $grid;
        private $poznamkaPod;
        private $formSouhrn;
        private $gridRecap;
        onContentReady(): void;
        /** Vytvoření akcí */
        private createActions;
        /** Vytvoření tabu s políčkem s poznámkou nad položkami věcného profilu */
        private createPoznamkuNadVp;
        /** Vytvoření tabu s políčkem s poznámkou pod položkami věcného profilu */
        private createPoznamkuPodVp;
        /** Vytvoření gridu se seznamem položek věcného profilu */
        private createGrid;
        /** Upravení přístupnosti editačních akcí */
        private changeEditActions;
        /** Nastavení popisů nad a pod seznamem vp*/
        private setPopisy;
        /** Vytvoření gridformátu pro seznam položek věcného profilu */
        private createGridFormat;
        /** Vytvoření tabu Rekapitulace s souhrným gridem a formulářem */
        private createRekapitulace;
        /** Vytvoření gridformátu pro rekapitulaci částek sazby daně */
        private createRecapColumns;
        /**
         * Nastavení názvu, přístupnosti a příznaku tlačítka materiály
         * @param data Seznam položek
         */
        private setSklady;
        /**
         * Nastavení hodnot v tabu rekapitulace
         * @param data Seznam položek
         */
        private setRekapitulace;
        /** Úprava Dto před uložením do db */
        private modifyDtoBeforeSave;
        /** Před uložením aktualizuji vyplněné měny a jejich přepočty */
        private refreshCurrencyValues;
        /** Přepočítání a aktualizace polí po změně ve formuláři */
        private recalculateGridFields;
        /** Výpočet a nastavení Částka DPH/Dodanění */
        private setCastkaDPH;
        /** Výpočet a nastavení Částky celkem */
        private setCastkaCelkemDPH;
    }
}
declare namespace Gordic.Bpl.WebClient {
    /****************************************
     * GBplZalohyDialog
     * Dialog pro navazane zalohy
     * @author Pavel Novak
     ****************************************/
    class GBplPridaniZalohy extends GContentBase implements IGClientContent {
        private mena;
        private grid;
        prepareContent(params: any): void;
    }
}
declare namespace Gordic.Bpl.WebClient {
    /****************************************
     * GBplZalohyDialog
     * Dialog pro navazane zalohy
     * @author Pavel Novak
     ****************************************/
    class GBplZalohyDialog extends GContentBase implements IGClientContent {
        private mena;
        private grid;
        prepareContent(params: any): void;
    }
}
declare namespace Gordic.Bpl.WebClient {
    /****************************************
     * GVazbySeznamTab
     * Dialog pro navazane zalohy
     * @author Pavel Novak
     ****************************************/
    class GVazbySeznamTab extends GContentBase implements IGClientContent {
        private mena_zkr;
        private grid;
        prepareContent(params: any): void;
        private zjistiNavazaneCastky;
        private zjistiNavazaneCastkyCelkem;
    }
}
declare namespace Gordic.Bpl.WebClient {
    function getDataForBinding(app: "kdf" | "kof", ixp: string, ktgTypDetail: number): {
        title: string;
        ktg: number | undefined;
        vaz_fak: Interface.GBplGlobalsBase.TypVazbyFaktur.VAZ_PROFORMA | Interface.GBplGlobalsBase.TypVazbyFaktur.VAZ_ZALOHA | Interface.GBplGlobalsBase.TypVazbyFaktur.VAZ_DOBROPIS | Interface.GBplGlobalsBase.TypVazbyFaktur.VAZ_ZAL_DPH | Interface.GBplGlobalsBase.TypVazbyFaktur.VAZ_OPR_DPH;
    };
    function getDialogBindingTitle(typ: Gordic.Bpl.Interface.GBplGlobalsBase.TypVazbyFaktur, ktg_typ: Gordic.Bpl.Interface.EBplKtgTyp, ixp: string): string | undefined;
    function jeDokladZalohovy(ktg_typ: number): ktg_typ is Interface.EBplKtgTyp.KDF_ZALK | Interface.EBplKtgTyp.KDF_ZALK_D | Interface.EBplKtgTyp.KDF_ZALK_P | Interface.EBplKtgTyp.KOF_ZALK | Interface.EBplKtgTyp.KOF_ZALK_D | Interface.EBplKtgTyp.KOF_ZALK_P;
    function jeDokladProforma(ktg_typ: number): ktg_typ is Interface.EBplKtgTyp.KDF_PROK | Interface.EBplKtgTyp.KDF_PROK_D | Interface.EBplKtgTyp.KDF_PROK_P | Interface.EBplKtgTyp.KOF_PROK | Interface.EBplKtgTyp.KOF_PROK_D | Interface.EBplKtgTyp.KOF_PROK_P;
    function getBindingType(ktg_typ: number): Interface.GBplGlobalsBase.TypVazbyFaktur.VAZ_PROFORMA | Interface.GBplGlobalsBase.TypVazbyFaktur.VAZ_ZALOHA | Interface.GBplGlobalsBase.TypVazbyFaktur.VAZ_DOBROPIS | Interface.GBplGlobalsBase.TypVazbyFaktur.VAZ_ZAL_DPH | Interface.GBplGlobalsBase.TypVazbyFaktur.VAZ_OPR_DPH;
}
declare namespace Gordic.Bpl.WebClient {
    /****************************************
     * GVazbyVyberTab
     * Dialog pro navazane zalohy
     * @author Pavel Novak
     ****************************************/
    class GVazbyVyberTab extends GContentBase implements IGClientContent {
        private mena;
        private grid;
        prepareContent(params: any): void;
        private kontrolaCastek;
    }
}
declare namespace Gordic.Search.Bpl {
    class GBplAcAgSearchResolver extends Search.Eko.GEkoAcAgSearchResolver {
        getDefaultId(): string;
        getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        protected openDetailLocal(finding: any, item: Gordic.Eko.Interface.GSearchVsItem): JQuery.Promise<boolean, any, any>;
        protected findForList(acAgList: string[]): JQuery.PromiseBase<Gordic.Eko.Interface.GSearchAcAgResponseDto[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Search.Bpl {
    class GBplAcSearchResolver extends Search.Eko.GEkoAcSearchResolver {
        getDefaultId(): string;
        getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        protected openDetailLocal(finding: any, item: Gordic.Eko.Interface.GSearchVsItem): JQuery.Promise<boolean, any, any>;
        protected findForList(acList: string[]): JQuery.PromiseBase<Gordic.Eko.Interface.GSearchAcResponseDto[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Search.Bpl {
    class GBplVsSearchResolver extends Search.Eko.GEkoVsSearchResolver {
        getDefaultId(): string;
        getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        protected openDetailLocal(finding: any, item: Gordic.Eko.Interface.GSearchVsItem): JQuery.Promise<boolean, any, any>;
        protected findForList(vsList: string[]): JQuery.PromiseBase<Gordic.Eko.Interface.GSearchVsResponseDto[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
/**
 * Sdílené metody pro BPL
 * @author Michal Prošek
 * @since 484.1.0.0
 */
declare namespace Gordic.Bpl.WebClient {
    /**
     * Sdílené metody pro ISL
     * @author Michal Prošek
     * @since 486.1.0.0
     */
    namespace BPLSupportMetody {
        /**
         * Pomocná metoda pro vrácení fragmentů k položce v DTO, aby to nemuselo být s gridformátech
         *
         * @param {string | undefined} name položka z DTO
         * @returns {string} fragment (default je main)
         */
        function DoplnFragmenty(name: string | undefined): string;
        /**
         * Úprava requestu pro metodu list použitou na Isl.View. Řeší i přidání filtrů na knihu
         *
         * @param {GContent & IGStandardFucGrid<TDto, TPermissions} gcontent content
         * @param {Isl.GServiceListRequest} [rq] request pro metodu list (bude modifikován)
         * @returns {boolean} výsledek (true = request modifikován, může se pokračovat v načtení dat; false = načtení musí být přerušeno)
         */
        function modifyListRequest<TDto, TPermissions>(gcontent: GContent, rq: Isl.GServiceListRequest): boolean;
    }
    namespace BPLFiltry {
        /**
         * Záložka Filtr Profil - základní údaje
         *
         */
        function ZalozkaZakladniUdaje(rok: number, povoleneKategorieDokladu: any, ico: string): Gordic.Forms.Form;
        /**
         * Záložka Filtry stavy
         *
         */
        function ZalozkaStavy(): Gordic.Forms.Form;
        /**
         * Záložka Filtry ESU
         *
         */
        function ZalozkaESU(): Gordic.Forms.Form;
        /**
         * Záložka Účetní zápisy
         *
         */
        function ZalozkaUcetniZapisy(gcontent: GContent): Gordic.Forms.Form;
        /**
         * Záložka Filtry vlastností
         *
         */
        function ZalozkaVlastnosti(ixsTypBPL: string[]): Gordic.Forms.Form;
    }
    /**
     * Sdílené metody pro gridy seznamů
     * @author Michal Prošek
     * @since 486.1.0.0
     */
    namespace BPLGridy {
        /**
         * Základní položky pro seznamy dokladů
         *
         * @author Michal Prošek
         * @since 486.1.0.0
         */
        interface IGStandardBplGrid<TDto, TPermissions> {
            /**
             * View pro grid
             * @type {Isl.View<TData>}
             */
            viewBPL: Isl.View<TDto>;
            /**
             * Typ pohledu na d seznamy
             * @type {number}
             */
            typPohledu: number;
            /**
             * Filtr nad gridem
             * @type {JQuery}
             */
            $filterForm: JQuery;
            /**
             * Ovladač pro náhledy
             * @type {any}
             */
            previewController: Previews.GPreviewController<TDto>;
            /**
             * Parametry pro objekt dokumentu
             * @type {Gordic.Wfl.Interface.GWflspidGetColumnParamsResponseDto | undefined}
             */
            DokumentParams: Gordic.Wfl.Interface.GWflspidGetColumnParamsResponseDto | undefined;
            /**
             * Primární klíč DTO
             * @type {string}
             */
            readonly PrimaryKey: string;
            /**
             * Oprávnění (k celému seznamu)
             * @type {TPermissions | undefined}
             */
            readonly Permissions: TPermissions | undefined;
        }
        const ikona_100: string;
        const ikona_75: string;
        const ikona_50: string;
        const ikona_25: string;
        const ikona_0: string;
        const ikona_NE: string;
        const ikona_NIC: string;
        const presetDokumentColumns: Wfl.WebClient.GWflspidColumnNames[];
        /**
         * Inicializace objektu dokumentu (např. pro použítí v definici sloupců pro grid)
         *
         * @returns {JQuery.Promise<Gordic.Wfl.Interface.GWflspidGetColumnParamsResponseDto>} nainicializované parametry dokumentu
         */
        function dokumentInit(): JQuery.Promise<Gordic.Wfl.Interface.GWflspidGetColumnParamsResponseDto>;
        /**
         * Naplnění jednoho řádku do seznamu <TDto, TFilter>
         *
         * @param {(any) => any} listAction Metoda pro vrácení dat z databáze (podle filterPK)
         * @param {TFilter} filterPK Filtr pro aktualizaci dat
         * @param {any} $grid Grid, který má být aktualizován
         */
        function reloadRow<TDto, TFilter>(listAction: (any: any) => any, filterPK: TFilter, $grid: JQuery): void;
        /**
         *  Procesor pro výpočet stavů na seznamech BPL
         *
         * @returns {Gordic.Data.ComputedFieldsProcessor<BPLInterface.GBplFakturaDoslaRozsireneDto>} Processor
         */
        function procesoryBPL(GlobalniPromenne: Gordic.Bpl.Interface.GlobalsDto, kryti: boolean, likvidace: boolean, precteno: boolean, zauctovani: boolean): Data.ComputedFieldsProcessor<BPLInterface.GBplFakturaDoslaRozsireneDto>;
        /**
         *  Doplní sloupec se stavem krytí (processor)
         *
         * @returns {GGridColumn} Ikona + Text
         */
        function sloupecStavKryti(): GGridColumn;
        /**
         *  Doplní sloupec se stavem likvidace (processor)
         *
         * @returns {GGridColumn} Ikona + Text
         */
        function sloupecStavLikvidace(): GGridColumn;
        /**
         *  Doplní sloupec Daňový doklad (0 = NE, 1 = ANO)
         *
         * @returns {GGridColumn} Text
         */
        function SloupecDanovyDoklad(): GGridColumn;
        /**
         *  Doplní sloupec Režim DPH (0 = Běžný, 1 = Dodanění)
         *
         * @returns {GGridColumn} Text
         */
        function SloupecRezimDPH(): GGridColumn;
        /**
         *  Doplní sloupec se stavem dokladu (O = otevřeno, P = připraveno k uzávěrce, U = uzavřeno)
         *
         * @returns {GGridColumn} Text
         */
        function SloupecStavDokladu(): GGridColumn;
        /**
         *  Doplní sloupec se stavem úhrady - (0 = Neuhrazeno, 10 = Uhrazeno částečně, 20 = Uhrazeno)
         *
         * @returns {GGridColumn} Ikona + Text
         */
        function SloupecUhradaDokladu(): GGridColumn;
        /**
         *  Doplní sloupec se stavem Odesláno k úhradě - (0 = Neodesláno, 10 = Odesláno částečně, 20 = Odesláno)
         *
         * @returns {GGridColumn} Ikona + Text
         */
        function SloupecKUhradeDokladu(): GGridColumn;
        /**
         *  Doplní sloupec se stavem účtování - (0 = Nezaúčtováno, 10 = Zaúčtováno částečně, 20 = Zaúčtováno)
         *
         * @returns {GGridColumn} Ikona + Text
         */
        function SloupecUctovaniDokladu(): GGridColumn;
        /**
         *  Doplní sloupec se stavem K zaúčtování - (K zaúčtování/Nic k zaúčtování)
         *
         * @returns {GGridColumn} Ikona + Text
         */
        function SloupecKZauctovaniDokladu(): GGridColumn;
        /**
         *  Doplní sloupec se stornem dokladu (TRUE - Storno, FALSE - Aktivní)
         *
         * @returns {GGridColumn} Text
         */
        function SloupecStornoDokladu(): GGridColumn;
        /**
         *  Doplní sloupec se stavem dokladu (processor)
         *
         * @returns {GGridColumn} Ikona + Text
         */
        function sloupecStavPrecteno(): GGridColumn;
        /**
         * Vrátí pole sloupců pro seznam dokladů KDF
         *
         * @param {GContent} gcontent content
         * @returns {Gordic.Data.GridFormat<TDto>} pole sloupců pro ggrid
         */
        function vytvorGridFormatBplSeznam(gcontent: GContent): Gordic.Data.GridFormat<Gordic.Bpl.Interface.GBplFakturaDoslaDto>;
        /**
         * Vrátí podmíněné formátování pro seznam dokladů KDF
         *
         * @param {GContent} gcontent content
         * @returns {Gordic.Components.Grid.CondFormats.CondFormat[]} pole podmíněných formátů
         */
        function podmineneFormatovaniKdfSeznam(gcontent: GContent): Gordic.Components.Grid.CondFormats.CondFormat[];
        function podmineneFormatovaniKdfSeznamBezBarev(gcontent: GContent): Gordic.Components.Grid.CondFormats.CondFormat[];
        /**
         * Vrátí pole sloupců pro seznam plateb BPL
         *
         * @param {GContent} gcontent content
         * @returns {Gordic.Data.GridFormat<TDto>} pole sloupců pro ggrid
         */
        function vytvorGridFormatBplPlatby(gcontent: GContent): Gordic.Data.GridFormat<Gordic.Bpl.Interface.SeznamPlatebDto>;
        /**
         * Vrátí pole sloupců pro detail plateb BPL
         *
         * @param {GContent} gcontent content
         * @returns {Gordic.Data.GridFormat<TDto>} pole sloupců pro ggrid
         */
        function vytvorGridFormatBplPlatbyDetail(gcontent: GContent): Gordic.Data.GridFormat<Gordic.Bpl.Interface.SeznamPlatebDto>;
        /**
         * Vrátí pole sloupců pro seznam plateb BPL
         *
         * @param {GContent} gcontent content
         * @returns {Gordic.Data.GridFormat<TDto>} pole sloupců pro ggrid
         */
        function vytvorGridFormatBplUctovaniKrytiLikvidace(gcontent: GContent): Gordic.Data.GridFormat<Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>;
    }
    /**
     * Sdílené metody pro Detail dokladu BPL
     * @author Michal Prošek
     * @since 486.1.0.0
     */
    namespace BPLDetailDokladu {
        /**
         * Trigger pro aktivní operaci na detailu
         */
        const triggerChange = "bpl_change";
        /**
         * Editovatelnost dokladu 0. stupeň- is_noedit - příznak, zda se doklad může editovat nebo ne (1 - Needitovatelné, 0 - Editovatelné) - původní metoda is_noedit
         * @author Michal Prošek
         * @since 486.1.0.0
         * @version 24.3.2021
         * @param {Interface.GlobalsDto} GlobalniPromenne Globalní proměnné detailu dokladu
         * @param {Bpl.Interface.GBplFakturaDoslaDto} Doc Data dokladu
         * @returns TRUE = nelze editovat
        */
        function jeNeeditovatelne_0(GlobalniPromenne: Interface.GlobalsDto, Doc: Interface.GBplFakturaDoslaDto): boolean;
        /**
         * Editovatelnost dokladu 1. stupeň - is_noedit - příznak, zda se doklad může editovat nebo ne (1 - Needitovatelné, 0 - Editovatelné) - původní metoda is_noedit1
         * @author Michal Prošek
         * @since 486.1.0.0
         * @version 25.3.2021
         * @param {Interface.GlobalsDto} GlobalniPromenne Globalní proměnné detailu dokladu
         * @param {Bpl.Interface.GBplFakturaDoslaDto} Doc Data dokladu
         * @returns TRUE = nelze editovat
        */
        function jeNeeditovatelne_1(GlobalniPromenne: Interface.GlobalsDto, Doc: Interface.GBplFakturaDoslaDto): boolean;
        /**
         * Editovatelnost dokladu 1. stupeň - is_noedit - příznak, zda se doklad může editovat nebo ne (1 - Needitovatelné, 0 - Editovatelné) - původní metoda is_noedit_sml
         * @author Michal Prošek
         * @since 486.1.0.0
         * @version 25.3.2021
         * @param {Interface.GlobalsDto} GlobalniPromenne Globalní proměnné detailu dokladu
         * @param {Bpl.Interface.GBplFakturaDoslaDto} Doc Data dokladu
         * @returns TRUE = nelze editovat
        */
        function jeNeeditovatelne_SML(GlobalniPromenne: Interface.GlobalsDto, Doc: Interface.GBplFakturaDoslaDto): boolean;
        /**
        * Finančmí kontrola - TRUE = zapnutá, FALSE = nezapnutá - v TK - FkAktivni
        * @author Michal Prošek
        * @since 486.1.0.0
        * @version 24.3.2021
        * @param {Interface.GlobalsDto} GlobalniPromenne Globalní proměnné detailu dokladu
        * @param {number} znamenko Znaménko dokladu
        * @param {number} ktg_typ Kategorie doklad
        * @returns TRUE = Finanční kontrola je aktivní
        */
        function FkZapnuta(GlobalniPromenne: Interface.GlobalsDto, znamenko: number, ktg_typ: number): boolean;
        function FkLzeEditovatSchvaleno(GlobalniPromenne: Interface.GlobalsDto, znamenko: number, ktg_typ: number, stavFk: number, ExistujeFkAktivniDokument: boolean): boolean;
        /**
         * Typ dokladu je výdajový - TRUE = výdajový, FALSE = ostatní - IS_vydaj
         * @author Michal Prošek
         * @since 486.1.0.0
         * @version 25.3.2021
         * @param {number} ktg_typ Kategorie doklad
         * @returns Vyhodnocení kategorie dokladu
         */
        function jeDokladVydajovy(ktg_typ: number): boolean;
        /**
         * Typ dokladů je bez závazku - TRUE = bez závazků, FALSE = se závazky - is_bez_zavazku_MP
         * @author Michal Prošek
         * @since 486.1.0.0
         * @version 25.3.2021
         * @param {number} ktg_typ Kategorie doklad
         * @returns Vyhodnocení kategorie dokladu
         */
        function jeDokladBezZavazku(ktg_typ: number): boolean;
        /**
         * Typ dokladů je bez závazku nebo daňový - TRUE = bez závazků nebo daňový, FALSE = ostatní - is_bez_zavazku
         * @author Michal Prošek
         * @since 486.1.0.0
         * @version 25.3.2021
         * @param {number} ktg_typ Kategorie doklad
         * @returns Vyhodnocení kategorie dokladu
         */
        function jeDokladBezZavazkuNeboDanovy(ktg_typ: number): boolean;
        /**
         * Typ dokladu je daňový - TRUE = daňový, FALSE = ostatní - is_ktg_typ_dph
         * @author Michal Prošek
         * @since 486.1.0.0
         * @version 25.3.2021
         * @param {number} ktg_typ Kategorie doklad
         * @returns Vyhodnocení kategorie dokladu
         */
        function jeDokladDanovy(ktg_typ: number): boolean;
        /**
         * Typ dokladu je součástí kalendářů - TRUE = Ano, FALSE = Není
         * @author Michal Prošek
         * @since 486.1.0.0
         * @version 13.5.2021
         * @param {number} ktg_typ Kategorie doklad
         * @returns Vyhodnocení kategorie dokladu
         */
        function jeDokladKalendare(ktg_typ: number): boolean;
        /**
         * Režim dokladu je servisní - TRUE = servisní, FALSE = běžný stav - is_oprava
         * @author Michal Prošek
         * @since 486.1.0.0
         * @version 12.4.2021
         * @param {Interface.GlobalsDto} GlobalniPromenne Globalní proměnné detailu dokladu
         * @param {Bpl.Interface.GBplFakturaDoslaDto} Doc Data dokladu
         * @returns Vyhodnocení servisního režimu na dokladu
         */
        function jeOprava(GlobalniPromenne: Interface.GlobalsDto, Doc: Interface.GBplFakturaDoslaDto): boolean;
        /**
         * Vyhodnocení, zda je doklad s úhradou, či nikoliv
         *
         * @param {number} ktg_typ kategorie dokladu
         * @returns TRUE - na dokladu bude nějaká úhrada, FALSE - doklad se nehradí
         */
        function dokladySUhradou(ktg_typ: number): boolean;
        /**
         * Úprava pro filtr na knihu
         *
         * @param {number} ixp_den Identifikátor knihy - při režimu *rok a * se kniha vynuluje
         * @returns Vrátí identifikátor knihy
         */
        function filtrKnihy(ixpDen: string | null): string | undefined;
        /**
         * Otevření detailu v primární agendě (v jiné záložce)
         *
         * @param {number | undefined | null} typAg primární agenda
         * @param {string | undefined | null} id1 id detailu v primární agendě (Identifikátor)
         * @param {string | undefined | null} [id2] doplňující id detailu v primární agendě (Identifikátor a pod.)
         * @param {string | undefined | null} [id3] další doplňující id detailu v primární agendě (Identifikátor a pod.)
        */
        function openDetailInOtherTab(typAg: number | undefined | null, id1: string | undefined | null, id2?: string | undefined | null, id3?: string | undefined | null): JQuery.Promise<any>;
    }
    namespace BPLInterface {
        interface GBplFakturaDoslaRozsireneDto extends Interface.GBplFakturaDoslaDto {
            cc_stavPrecteno: BPLEnums.StavPrecteno;
            cc_stavKryti: BPLEnums.StavKryti;
            cc_stavLikvidace: BPLEnums.StavLikvidace;
            cc_stavKZauctovani: BPLEnums.StavKZauctovani;
        }
    }
    namespace BPLEnums {
        enum StavKryti {
            Nehradi_se = -1,// Nehradí se
            Neporizeno = 0,// Nepořízené krytí
            Navrh = 10,// Návrh krytí
            CastecneSchvaleno = 15,// Částečně schválené krytí
            Schvaleno = 20
        }
        enum StavLikvidace {
            Neporizeno = 0,// Nepořízená likvidace
            Navrh = 10,// Návrh likvidace
            SchvalenoZalohy = 15,// Schválená likvidace záloh
            Schvaleno = 20
        }
        enum StavPrecteno {
            Precteno = 0,// Přečtený doklad
            Neprecteno = 10
        }
        enum StavKZauctovani {
            NicKZauctovani = 0,// Nic k zaúčtování
            KZauctovani = 10,// K zaúčtování
            Zauctovano = 20
        }
    }
}
