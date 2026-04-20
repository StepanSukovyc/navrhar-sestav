declare namespace Gordic.Maj.AppSetting {
    function CardSettingsForm(maj_ico_gen_inv: any, maj_rad_srezec: any): Gordic.Forms.Form;
    function BillSettingsForm(): Gordic.Forms.Form;
    function CommonSettingsForm(): Gordic.Forms.Form;
}
declare namespace Gordic.Search.Maj {
    class GAcSearchResolver extends Search.Eko.GEkoAcSearchResolver {
        getDefaultId(): string;
        getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        protected openDetailLocal(finding: any, item: Gordic.Eko.Interface.GSearchAcAgItem): JQuery.Promise<boolean, any, any>;
        protected findForList(acList: string[]): JQuery.PromiseBase<Gordic.Eko.Interface.GSearchAcAgResponseDto[], never, never, never, never, never, never, never, never, never, never, never>;
    }
    class GAcAgSearchResolver extends Search.Eko.GEkoAcAgSearchResolver {
        getDefaultId(): string;
        getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        protected openDetailLocal(finding: any, item: Gordic.Eko.Interface.GSearchAcAgItem): JQuery.Promise<boolean, any, any>;
        protected findForList(acAgList: string[]): JQuery.PromiseBase<Gordic.Eko.Interface.GSearchAcAgResponseDto[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class MainApp extends GContentBase {
        onContentReady(): void;
        private TestTaskConentPlate;
        private showTmpProtocol;
        /**
 * Otevření uzávěrky agend
 *
 * @returns {JQuery.Promise<any>} promise s operací
 */
        uzaverkaAgenda(): JQuery.Promise<any>;
        /**
         * Otevření uzávěrky knih
         *
         * @returns {JQuery.Promise<any>} promise s operací
         */
        uzaverkaKnihy(): JQuery.Promise<any>;
        /**
        * Otevření kartotéky externích subjektů
        */
        kartotekaEsu(): JQuery.Promise<any>;
        KontrolniChod(): void;
        ProuctovaniDokladu(): void;
        UcetniStavy(): void;
        Rozbory(): void;
        KnihaDokladu(): void;
    }
}
declare namespace Gordic.Maj.WebClient.Utils {
    function setOptionsFlags(field: Client.GGuptaDbBox | Client.GGuptaKrtDbBox): {
        validators: Validators.Required[] | undefined;
        flag: GFieldFlagOptions | undefined;
        disabled: boolean;
    };
}
declare namespace Gordic.Maj.WebClient {
    /**
     * Úvodní stránka (dashboard)
     */
    class GDashboard extends GContentBase {
        /**
         * prvky pro počty knih
         * @type {GObservableObject<any | GKpiItemOptions>[]}
         */
        private kpiKnihy;
        /**
         * Seznam knih
         * @type {Gordic.Maj.Interface.GMajsdenDto[]}
         */
        private bookStats;
        taskId: string;
        /**
         * Zadefinování formuláře
         */
        onContentReady(): void;
        /**
         * Vyber filtru seznamu
         * @param idKniha
         * @param typFiltru
         */
        private vyberSeznamu;
        /**
         * Aktualizace počtů
         */
        private update;
    }
}
declare namespace Gordic.Maj.WebClient {
    let nRefreshKnihyDok: number;
    let nLastOdpProtocolIkc: number | null;
    function jeDevOcenovan(dev: any): boolean;
    function jeDevProdej(dev: any): boolean;
    function setModeOdpKrt(maj_ico_modpis: boolean, mode_odp_skp: number, mode_odp_drh: number): number;
    function isUea018028(ueab_xxx: string): boolean;
    function testDefOdpVuj(def_odp: number): boolean;
    function testDefDan(dan_def: number): boolean;
    function getDevTitle(dev: number): string;
    function getTevTitle(tev: number): string;
    function getRokMesNum(datum: Date): number;
}
declare namespace Gordic.Maj.WebClient {
    const doReload = true;
    const dontReload = false;
    const nMajPendingTime = 100;
    const colorDklEvidence = "g-state-success";
    const colorDklUzavreno = "g-state-inactive";
    const colorDklNavrh = "g-state-warning";
    const colorDklOstatni = "g-state-info";
    const colorInvIn = "g-state-important";
    const styleKrtTEV = "g-state-text g-state-inactive";
    const styleEtiketa = "g-state-background g-state-favorite";
    const styleDI = "g-state-text g-state-warning";
    const styleKrtTka = "g-state-text g-state-info";
    const styleKrtTypSoubor = "g-state-text g-state-inactive";
    const icoStornoRecord = "fa-trash g-state-error g-state-text";
    const icoKrtInvIn: string;
    const icoKrtMnoz = "gi-balik g-state-info g-state-text";
    const icoKrtFullRes = "gi-pridelit_stav g-state-success g-state-text";
    const icoKrtPrvek = "gi-pytel_bold g-state-inactive g-state-text";
    const colWidthIcon = 18;
    const colWidthIconLarger = 25;
    const colWidthTevZkr = 40;
    const colWidthTkaZkr = 42;
    const colWidthRokObd = 45;
    const colWidthTypAgZkr = 45;
    const colWidthTypDokZkr = 50;
    const colWidthUcs = 50;
    const colWidthMenaKurz = 58;
    const colWidthMenaZkr = 58;
    const colWidthSu = 60;
    const colWidthNks = 65;
    const colWidthPMJ = 70;
    const colWidthSuAu = 80;
    const colWidthAc = 80;
    const colWidthDate = 90;
    const colWidthKrtMoney = 105;
    const colWidthKrtOdpLast = 80;
    const colWidthKrtOdpZust = 70;
    const colWidthInvCis = 120;
    const colWidthPid = 125;
    const colWidthMatCis = 130;
    const colWidthDateTime = 140;
    const colWidthEsuTxt = 150;
    const uidDokladyX = "MajDokladyX#";
    const uidKarta = "MajKarta#";
    const uidKrtPohyby = "MajPohyby#";
    const uidDokPohyby = "MajPohyby#";
    const uidKrtOdpHist = "MajKrtHistOdp#";
    const uidKrtHistorie = "MajKrtHistorie#";
    const uidOdpProtokol = "ProtokolOdp#";
    const uidRegTzh = "MajRegTzh#";
    const uidZmenaMaj = "MajZmena#";
    const uidZmenaTop = "MajZmenaTop#";
    const uidZmenaC = "MajZmenaC#";
    const uidZmenaCTzh = "MajZmenaCTzh#";
    const uidZmenaSk = "MajZmenaSk#";
    const uidZmenaDev = "MajZmenaDev#";
    const uidZmenaCDok = "MajZmenaCDok#";
    const uidVyberKaret = "MajVyberKaret#";
    const uidSoubor = "MajSoubor";
    const uidProdPrirazky = "MajProdPri#";
    const nModeFrmView = 0;
    const nModeFrmEdit = 1;
    const nModeFrmInsert = 2;
    const nModeFrmZarUzi = 21;
    const nModeFrmInsRozM = 32;
    /**
 * @deprecated Nechceme v MAJ05, nahraď za nModeFrmEdit
 */
    const nModeFrmViewEdit = 4;
    const nModeFrmFill = 6;
    const nModeFrmPolZad = 7;
    const nZevNone = 0;
    const nZevUnik = 10;
    const nZevMnozSarze = 130;
    const nMajAktNavrh = 10;
    const nMajAktPor = 18;
    const nMajAktEvi = 20;
    const nSDNavrh = 10;
    const nSDProuctovano = 40;
    const nDevVlastni = 10;
    const nDevVlastniProdej = 12;
    const nDevVlastniDsh = 16;
    const nDevNevlastni = 20;
    const nDevNevlastniDsh = 26;
    const nDevFksp = 30;
    const nDevFkspProdej = 32;
    const nDevFkspDsh = 36;
    const nDevBezuplatneNabyty = 40;
    const nDevBezuplatneNabytyProdej = 42;
    const nTkaSam = 10;
    const nTkaSamSoub = 12;
    const nTkaSoubor = 20;
    const nTkaObsah = 30;
    const nTypSouborUct = 10;
    const nTypDokP = 100;
    const nTypDokAktVyr = 102;
    const nTypDokZarUzi = 110;
    const nTypDokVMzOe = 150;
    const nTypDokPP = 120;
    const nTypDokV = 200;
    const nTypDokVLikv = 201;
    const nTypDokVP = 220;
    const nTypDokZ = 300;
    const nTypDokZSk = 305;
    const nTypDokZDev = 306;
    const nTypDokZTop = 307;
    const nTypDokSIn = 310;
    const nTypDokSlcM = 312;
    const nTypDokSOut = 320;
    const nTypDokRozM = 322;
    const nTypDokResZap = 330;
    const nTypDokResZapI = 332;
    const nTypDokResOpT = 335;
    const nTypDokResRet = 340;
    const nTypDokResRetI = 342;
    const nTypDokResOpF = 345;
    const nTypDokZcPlus = 350;
    const nTypDokZcMinus = 355;
    const nTypDokRegTZH = 360;
    const nTypDokTZH = 362;
    const nTypDokRegTzh2Na = 364;
    const nTypDokRegTzh2Nv = 365;
    const nTypDokRegTzhNm2Na = 366;
    const nTypDokUO = 370;
    const nTypDokDO = 372;
    const nTypDokIUO = 374;
    const ixsEsuNull = "0000SE00000M";
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajEvidencniStredisko extends GContentBase {
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
    class GDetailMajEvidencniStrediskoObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajEvidencniStrediskoDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajEvidencniStrediskoDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajExterniLokalizace1 extends GContentBase {
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
    class GDetailMajExterniLokalizace1Obj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajExterniLokalizace1Dto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajExterniLokalizace1Dto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajExterniLokalizace2 extends GContentBase {
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
    class GDetailMajExterniLokalizace2Obj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajExterniLokalizace2Dto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajExterniLokalizace2Dto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajExterniLokalizace3 extends GContentBase {
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
    class GDetailMajExterniLokalizace3Obj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajExterniLokalizace3Dto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajExterniLokalizace3Dto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajKategorieZarizeni extends GContentBase {
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
    class GDetailMajKategorieZarizeniObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajKategorieZarizeniDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajKategorieZarizeniDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajKmenovyList extends GContentBase {
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
    class GDetailMajKmenovyListObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajKmenovyListDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajKmenovyListDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajMaterialovaTrida extends GContentBase {
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
    class GDetailMajMaterialovaTridaObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajMaterialovaTridaDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajMaterialovaTridaDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajMaterialoveCislo extends GContentBase {
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
    class GDetailMajMaterialoveCisloObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajMaterialoveCisloDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajMaterialoveCisloDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajMernaJednotka extends GContentBase {
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
    class GDetailMajMernaJednotkaObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajMernaJednotkaDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajMernaJednotkaDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajMobilita extends GContentBase {
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
    class GDetailMajMobilitaObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajMobilitaDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajMobilitaDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajObjekt extends GContentBase {
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
    class GDetailMajObjektObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajObjektDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajObjektDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajObjektBudova extends GContentBase {
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
    class GDetailMajObjektBudovaObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajObjektBudovaDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajObjektBudovaDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajObjektStredisko extends GContentBase {
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
    class GDetailMajObjektStrediskoObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajObjektStrediskoDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajObjektStrediskoDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajPodminkyProvozu extends GContentBase {
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
    class GDetailMajPodminkyProvozuObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajPodminkyProvozuDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajPodminkyProvozuDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajProdejniPrirazka extends GContentBase {
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
    class GDetailMajProdejniPrirazkaObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajProdejniPrirazkaDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajProdejniPrirazkaDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajRizikoPriPoruse extends GContentBase {
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
    class GDetailMajRizikoPriPoruseObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajRizikoPriPoruseDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajRizikoPriPoruseDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajSkupinaMajetku extends GContentBase {
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
    class GDetailMajSkupinaMajetkuObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajSkupinaMajetkuDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajSkupinaMajetkuDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajStavPoPrevzeti extends GContentBase {
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
    class GDetailMajStavPoPrevzetiObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajStavPoPrevzetiDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajStavPoPrevzetiDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajTridaBezpecnosti extends GContentBase {
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
    class GDetailMajTridaBezpecnostiObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajTridaBezpecnostiDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajTridaBezpecnostiDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajTypDokladu extends GContentBase {
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
    class GDetailMajTypDokladuObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajTypDokladuDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajTypDokladuDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajTypZodpovednosti extends GContentBase {
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
    class GDetailMajTypZodpovednostiObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajTypZodpovednostiDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajTypZodpovednostiDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajUcty extends GContentBase {
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
    class GDetailMajUctyObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajUctyDto> {
        ico: string;
        ixs_vue: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajUctyDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajVariantaTransformaceUctu extends GContentBase {
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
    class GDetailMajVariantaTransformaceUctuObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajVariantaTransformaceUctuDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajVariantaTransformaceUctuDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDetailMajZpusobVyuziti extends GContentBase {
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
    class GDetailMajZpusobVyuzitiObj extends Gordic.Adx.WebControls.GAdxDetailBase<Gordic.Maj.Interface.GMajZpusobVyuzitiDto> {
        ico: string;
        /**
         * Metoda volaná po vytvoření (slouží pouze jako případná záloha pro změnu dat)
         */
        create(): void;
        /**
         * Reprezentatvní hodnota název apod.
         * @returns reprezentativní hodnota
         */
        textPopis(): string | undefined | null;
        /**
         * Samotné uložení dat , provedé uložení, reload a aktulizaci v navázaném gridu
         * @param data data k uložení
         * @param close přízank jestli se má detail zavřít
         */
        saveData(data: Gordic.Maj.Interface.GMajZpusobVyuzitiDto, close: boolean): void;
        /**
         * Reload dat
         * @param filterObj filtrační parametry z gridu
         * @param dataObj obejkt pro reload
         */
        reloadData(filterObj: any, dataObj: any): void;
        /**
         * Aktualizace záznamu v gridu {při zavření)
         * @param filter filtrační parametry
         * @param grid seznam
         * @returns promise pro reload dat v seznamu
         */
        updateGrid(filter: any, grid: any): JQueryPromise<Gordic.Data.View<Gordic.Data.UnpackRow<any>>>;
        /**
         * Vytvoření titulku
         * @returns titulek
         */
        createTitle(): string;
        /**
         * Vytvoření menubaru (ponechte toto pořadí), další akce zadávejte po akci actCancelEdit
         * @returns menubar
         */
        createMenuBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření commandBaru
         * @returns command bar
         */
        createCommandBar(): Gordic.Gin.DetailBuilder.GDetailBuilderMenuItemDef;
        /**
         * Vytvoření dalších akcí které nejsou defaultně definované, akce například pro nový záznam, detail, comparator apod jsou již definované, proto je není třeba tvořit
         * @returns objekt reprezentující akce, které budou přidány mezi defaultní akce
         */
        createActions(): {
            [akceName: string]: GAction | GActionParamsDefObj;
        } | null;
        /**
         * Aktivace editačního módu, kdy na základě proměnné editMode je možní nastavit jaké políčka budou editovatelná
         * @param editMode příznak aktivace editačního módu
         */
        setEditMode(editMode: boolean): void;
        /**
         * Vytvoření samotného formuláře
         */
        createForm(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDruhMajetku extends GContent implements /*IGContent*/ IGClientContent {
        uid: "GDruhMajetku#";
        typKlasifikace: number;
        rok: number;
        masterGrid: JQuery;
        slaveGrid: JQuery;
        druhyTab?: JQuery;
        elementyTab?: JQuery;
        slaveData: Interface.GMajCasoveZavislyUcetDto[];
        druhyView: Gordic.Isl.View<Interface.GMajsdrmDto>;
        filterPanelElement: JQuery;
        title: string;
        shortTitle: string;
        prepareContent(): void;
        createGrid(): void;
        createMasterGridFormat(): Data.GridFormat<Interface.GMajsdrmDto>;
        createSlaveGridFormat<T>(): Data.GridFormat<T>;
        /**
     * default commandbar builder function
     * @returns {MenuParams[]} pole akci - vyber / zrusit
     */
        defaultCommandBar(): MenuParams[];
    }
}
declare namespace Gordic.Maj {
    export type GVyberKlasifikaciSkupinuResult = {
        klasifikace: Interface.GEkosklaDto | null | undefined;
        ucetniOS: Interface.GEkovkzoDto | null | undefined;
        danovaOS: Interface.GEkovkzoDto | null | undefined;
        skp: Interface.GEkosklaDto["skp"];
        nazev?: Interface.GEkosklaDto["nazev"];
    };
    type GMajFilterKlasifikaceType = {
        -readonly [T in keyof typeof Gordic.Maj.Interface.GFilterEnumEkoskla]?: any;
    };
    export class GKlasifikaceSkupina extends GContentBase implements /*IGContent*/ IGClientContent {
        uid: "GKlasifikaceSkupina#";
        typKlasifikace: number;
        showInWindowMode: boolean;
        rokEko: number;
        masterGrid: JQuery;
        slaveGrid: JQuery;
        klasifikaceTab?: JQuery;
        skupinaTab?: JQuery;
        klasifikaceGridOpts?: GGridOptions<Interface.GEkosklaDto>;
        skupinyGridOpts?: GGridOptions<Interface.GEkosklaDto>;
        klasView: Gordic.Isl.View<Interface.GEkosklaDto>;
        filterDto: GMajFilterKlasifikaceType;
        filterPanelElement: JQuery;
        title: string;
        shortTitle: string;
        dialogResult: GVyberKlasifikaciSkupinuResult | JQueryPromise<GVyberKlasifikaciSkupinuResult> | null;
        options: Gordic.Prefabs.Select.GEkoVyberSmlouvyOptions;
        prepareContent(options: Gordic.Prefabs.Select.GMajKlasifikaceSkupinaOptions): void;
        createGrid(skp: string | null | undefined): void;
        /**
         * Zjistí, zda je znak cifra
         *
         * @param {string} x testovaný znak
         * @returns {boolean}
         */
        jeCifra(x: string | null | undefined): boolean;
        /**
         * Zjistí, zda má bý řádek odpisové skupiny k dispozici na vybrání (enabled checkboxu)
         *
         * @param {MetaRow<Interface.GEkovkzoDto>} row řádek, který se vyhodnocuje
         * @returns {boolean}
         */
        checkRowEnabled(row: MetaRow<Interface.GEkovkzoDto>): boolean;
        createKlasifikaceGridFormat<T>(klasifikaceCaption: string): Data.GridFormat<T>;
        createSkupinaGridFormat<T>(klasifikaceCaption: string): Data.GridFormat<T>;
        /**
     * default commandbar builder function
     * @returns {MenuParams[]} pole akci - vyber / zrusit
     */
        defaultCommandBar(): MenuParams[];
        setTitleAndShortTitle(typKlasifikace: Interface.GMajEnumTypKlasifikace): void;
        returnResult(data?: GVyberKlasifikaciSkupinuResult | JQueryPromise<GVyberKlasifikaciSkupinuResult>): void;
    }
    export {};
}
declare namespace Gordic.Maj.WebClient {
    type GMajFilterKlasifikaceType = {
        -readonly [T in keyof typeof Gordic.Maj.Interface.GFilterEnumEkoskla]?: any;
    };
    export class GMajetkovyPohyb extends GContentBase implements /*IGContent*/ IGClientContent {
        uid: "GMajetkovyPohyb#";
        typKlasifikace: number;
        showInWindowMode: boolean;
        masterGrid?: JQuery;
        slaveGrid?: JQuery;
        pohybyTab?: JQuery;
        elementyTab?: JQuery;
        masterGridOpts?: GGridOptions<Interface.GMajspohDto>;
        slaveGridOpts?: GGridOptions<Interface.GMajdpohDto>;
        pohybyView: Gordic.Isl.View<Interface.GMajspohDto>;
        filterDto: GMajFilterKlasifikaceType;
        filterPanelElement: JQuery;
        shortTitle: string;
        prepareContent(): void;
        createGrid(): void;
        createPohybyGridFormat(): Data.GridFormat<Interface.GMajspohDto>;
        createElementyGridFormat<T>(klasifikaceCaption: string): Data.GridFormat<T>;
        /**
     * default commandbar builder function
     * @returns {MenuParams[]} pole akci - vyber / zrusit
     */
        defaultCommandBar(): MenuParams[];
    }
    export {};
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajKategorieZarizeni extends GContentBase<GSeznamMajKategorieZarizeniObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajKategorieZarizeniObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajEvidencniStredisko extends GContentBase<GSeznamMajEvidencniStrediskoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajEvidencniStrediskoObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajExterniLokalizace1 extends GContentBase<GSeznamMajExterniLokalizace1Obj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajExterniLokalizace1Obj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajExterniLokalizace2 extends GContentBase<GSeznamMajExterniLokalizace2Obj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajExterniLokalizace2Obj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajExterniLokalizace3 extends GContentBase<GSeznamMajExterniLokalizace3Obj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajExterniLokalizace3Obj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajKmenovyList extends GContentBase<GSeznamMajKmenovyListObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajKmenovyListObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajMaterialovaTrida extends GContentBase<GSeznamMajMaterialovaTridaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajMaterialovaTridaObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajMaterialoveCislo extends GContentBase<GSeznamMajMaterialoveCisloObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajMaterialoveCisloObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajMernaJednotka extends GContentBase<GSeznamMajMernaJednotkaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajMernaJednotkaObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajMobilita extends GContentBase<GSeznamMajMobilitaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajMobilitaObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajObjekt extends GContentBase<GSeznamMajObjektObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajObjektObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajObjektBudova extends GContentBase<GSeznamMajObjektBudovaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajObjektBudovaObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        objekt: string | null | undefined;
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajObjektStredisko extends GContentBase<GSeznamMajObjektStrediskoObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajObjektStrediskoObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        objekt: string | null | undefined;
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajPodminkyProvozu extends GContentBase<GSeznamMajPodminkyProvozuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajPodminkyProvozuObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajProdejniPrirazka extends GContentBase<GSeznamMajProdejniPrirazkaObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajProdejniPrirazkaObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajRizikoPriPoruse extends GContentBase<GSeznamMajRizikoPriPoruseObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajRizikoPriPoruseObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajSkupinaMajetku extends GContentBase<GSeznamMajSkupinaMajetkuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajSkupinaMajetkuObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajStavPoPrevzeti extends GContentBase<GSeznamMajStavPoPrevzetiObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajStavPoPrevzetiObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajTridaBezpecnosti extends GContentBase<GSeznamMajTridaBezpecnostiObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajTridaBezpecnostiObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajTypDokladu extends GContentBase<GSeznamMajTypDokladuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajTypDokladuObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajTypOdpisu extends GContentBase<GSeznamMajTypOdpisuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajTypOdpisuObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
        createUserPanels(): GSideBarPanelOptions[];
        private refreshPanelParametry;
        /**
         * Definice gridformatu, doporučené pořadí (aktivita, [platnost], ..., dat_zmena, zmenu_prov_txt)
         * @returns GridFormát pro seznam
         */
        getGridFormat(): Gordic.Data.GridFormat;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajTypZodpovednosti extends GContentBase<GSeznamMajTypZodpovednostiObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajTypZodpovednostiObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajUcty extends GContentBase<GSeznamMajUctyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajUctyObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        ixs_vue: string | null | undefined;
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajVariantaTransformaceUctu extends GContentBase<GSeznamMajVariantaTransformaceUctuObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajVariantaTransformaceUctuObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajVazbaVarianty extends GContentBase<GSeznamMajVazbaVariantyObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajVazbaVariantyObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
        ixs_vue: string;
        nazev: string;
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GSeznamMajZpusobVyuziti extends GContentBase<GSeznamMajZpusobVyuzitiObj> {
        private seznamObj;
        onContentReady(): void;
    }
    class GSeznamMajZpusobVyuzitiObj extends Gordic.Adx.WebControls.GAdxSeznamBase {
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
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDlgAkce extends GContentBase<{
        argOdRoku?: number | null;
    }> implements IGContent {
        private $grid;
        private cvDebug;
        onContentReady(): void;
        nastavMasku(): void;
        nacti(filtr: any): void;
        getColumns(): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    class GDlgDoplnkoveInformace extends GContentBase implements IGClientContent {
        title: string;
        private ixsMaj;
        private grid;
        private view;
        private hasChanged;
        private beforeAddChanged;
        private diAccessible;
        private maj_rad_dinks;
        private funTyp;
        private karty;
        setUpdate(position?: number): void;
        prepareContent(params: any): void;
        loadData(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        closing(returnValue?: any): JQueryPromise<any>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GDlgDrhId extends GContentBase {
        grid: JQuery;
        grid2: JQuery;
        tblCis: {}[];
        tblCisSu: {}[];
        onContentReady(): void;
        createGridFormat2(): Data.GridFormat<any>;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    interface GDlgOdpStartOptions extends TInputOptionsBase {
        data: Interface.GOdpisStartDto;
        ctx: GOdpisStartCtxDto;
    }
    class GDlgOdpisStart extends GContentBase implements IGClientContent {
        uid: string;
        private actOK;
        private bDatUupRequired;
        private bKodPohRequired;
        private sIntervalOdpText;
        private datZdanByUser;
        prepareContent(params: GDlgOdpStartOptions): void;
        private checkIntervalOdp;
    }
}
declare namespace Gordic.Maj.WebClient {
    abstract class BaseParovaciTab {
        id: string;
        caption: string;
        isActive?: boolean;
        filterpanelOptions: IGFilterPanelOptions;
        protected enabled?: boolean;
        grid?: JQuery;
        filterpanel?: JQuery;
        ixp?: string;
        ixs_esu?: string;
        protected typ_ag: number;
        abstract title: string;
        constructor(id: string, caption: string);
        abstract getGridFormat(): any;
        abstract getData(cnt: Isl.Client): any;
        protected getFilterPanelForm(): Forms.Form;
        getResult(activeRow: any): Interface.GBplspidDto;
        getTabOptions(): IGTabGroupOptions;
        protected getBplGridFormat(): Data.GridFormat<any>;
    }
    class DodParovaciTab extends BaseParovaciTab {
        title: string;
        constructor();
        getFilterPanelForm(): Forms.Form;
        getGridFormat(): Data.GridFormat<any>;
        getData(cnt: Isl.Client): null;
    }
    class KdfParovaciTab extends BaseParovaciTab {
        title: string;
        constructor();
        getGridFormat(): Data.GridFormat<any>;
        getData(cnt: Isl.Client): Isl.View<any, Isl.GServiceListRequest, Isl.GServiceListResponse<Interface.GBplspidDto>>;
    }
    class KofParovaciTab extends BaseParovaciTab {
        title: string;
        constructor();
        getGridFormat(): Data.GridFormat<any>;
        getData(cnt: Isl.Client): Isl.View<any, Isl.GServiceListRequest, Isl.GServiceListResponse<Interface.GBplspidDto>>;
    }
    class MajParovaciTab extends BaseParovaciTab {
        enabled: false;
        title: "Přehled majetkových dokladů";
        constructor();
        getGridFormat(): Data.GridFormat<any>;
        getData(): Data.View<{
            ixp: string;
        }>;
    }
    class PokParovaciTab extends BaseParovaciTab {
        title: string;
        constructor();
        getFilterPanelForm(): Forms.Form;
        getGridFormat(): Data.GridFormat<any>;
        getData(cnt: Isl.Client): Isl.View<any, Isl.GServiceListRequest, Isl.GServiceListResponse<Interface.GBplspidDto>>;
    }
    class PouParovaciTab extends BaseParovaciTab {
        title: string;
        constructor();
        getGridFormat(): Data.GridFormat<any>;
        getData(cnt: Isl.Client): Isl.View<any, Isl.GServiceListRequest, Isl.GServiceListResponse<Interface.GBplspidDto>>;
    }
    class SmlParovaciTab extends BaseParovaciTab {
        title: string;
        constructor();
        getGridFormat(): Data.GridFormat<any>;
        getData(cnt: Isl.Client): Isl.View<any, Isl.GServiceListRequest, Isl.GServiceListResponse<Interface.GBplspidDto>>;
    }
    class GDlgParovaciSymbol extends GContentBase implements IGClientContent {
        /**
         * ixp majetkového dokladu - možná se ani nepoužívá
         */
        in_ixp: string;
        in_ixs_esu: string;
        in_evCislo: string;
        in_typ_ag: number;
        uid: string;
        private taby;
        private addedTabs;
        private activeTab;
        prepareContent(): void;
        private getActiveIndex;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    class GDlgProvedeniOdpisu extends GContentBase<{}> implements IGClientContent {
        prepareContent(param: any): void;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    class GDlgRozdelitTransfer extends GContentBase<{
        majtrf: Maj.Interface.GMajstrfDto;
        ctxE: GZmenaTrfSplitCtxDto;
    }> implements IGContent {
        private cvDebug;
        private cvCDotaceMax;
        private actOK;
        private dto;
        private keyValuesOk;
        private majsodObdOdp;
        onContentReady(): void;
        private logWatch;
        private logFunctionCall;
        private logSrvCall;
        private setEnableObject;
        private getFields;
        private checkFields;
        private saveTransfers;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    interface IGSouborCV {
        cvDebug: boolean;
        cvSeparator: string;
        argMajmaj: Maj.Interface.GMajmajDto;
        cvTypSouborTxt: string;
    }
    export class GDlgSoubor extends GContentBase<IGSouborCV> implements IGContent {
        private gridFormat;
        private grid;
        private gridActionList;
        private prvkyTbl;
        private tblSou_IxsMajPrvek;
        private tblSou_InvCis;
        argMajmaj: Interface.GMajmajDto;
        onContentReady(): void;
        private putInSoubor;
        private putOutSoubor;
        private logFunctionCall;
    }
    export {};
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    interface GDlgCfuOptions extends TInputOptionsBase {
        data: Interface.GMajscfuDto;
    }
    class GDlgVariantaCfu extends GContentBase implements IGClientContent {
        uid: string;
        private actOK;
        private ixsCfu;
        private newRecord;
        prepareContent(params: GDlgCfuOptions): void;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    class GDlgZmenaC extends GContentBase<{
        majpol: Maj.Interface.GMajMajPolDto;
        majpolint: Maj.Interface.GMajMajPolDto;
        ps_fak_stav: number;
        ctxE: GZmenaCtxDto;
        typ_dok: number;
    }> implements IGContent {
        private cvMenaLabel;
        private cvPlatceDph;
        private cvNulaPmj;
        private cvNeodpisuje;
        private cvDanOdpNeodpisuje;
        private cvZmenaOdpU;
        private cvZmenaOdpD;
        private cvZmenaOdpZcMinus;
        private cvZmenaOdpZc;
        private cvZobrazitUctVetu;
        private cvCUS708;
        private MAJ_ICO_MODPIS;
        private cvDebug;
        private cvTzhData;
        private dc_por;
        private dc_dph;
        private dc_dph_odpocet;
        private dc_c_dph;
        private dc_dotace;
        private dc_vstup_u;
        private dc_zust_u;
        private dc_zbytek_u;
        private dc_zbytek_proc_u;
        private dc_vstup_d;
        private dc_zust_d;
        private zmenaC;
        private zmenaCDph;
        private zmenaCDphOdpocet;
        private zmenaCcDph;
        private zmenaCDotace;
        private zmenaCVstupU;
        private zmenaCZustU;
        private zmenaCZbytekU;
        private zmenaCZbytekProcU;
        private zmenaCVstupD;
        private zmenaCZustD;
        private bZbytekZadanProcenty;
        private gf;
        private grid;
        private dataSentence;
        private tblUctActionList;
        private uctRowHasBeenEdited;
        private actOK;
        private dto;
        private myValidators;
        onContentReady(): false | "Chyba" | undefined;
        private validateC;
        private testEq;
        private spoctiNovouHodnotu;
        private validateAll;
        private setEnableObjectFirstTime;
        private setEnableObject;
        private getFields;
        private logWatch;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    interface GDlgZmenaCenyOptions extends TInputOptionsBase {
        data: TCenyDokladuDto;
        ac?: string;
        ctx: GZmenaCtxDto;
    }
    type TCenyDokladuDto = {
        c_c: JsonDecimal;
        c_dph_n: JsonDecimal;
        c_dph_s: JsonDecimal;
        c_dph_3: JsonDecimal;
        c_dph_4: JsonDecimal;
        c_c_dph: JsonDecimal;
        changed: boolean;
    };
    class GDlgZmenaCenyDokladu extends GContentBase implements IGClientContent, IMajDialogs {
        uid: string;
        private actOK;
        private frmDTO;
        prepareContent(params: GDlgZmenaCenyOptions): void;
        static showDlg<TCenyDokladuDto>(inputOptions: GDlgZmenaCenyOptions): JQuery.Promise<TCenyDokladuDto>;
        show<TCenyDokladuDto>(inputOptions: GDlgZmenaCenyOptions): JQuery.Promise<TCenyDokladuDto>;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    interface GDlgZmenaOptions extends TInputOptionsBase {
        data: GDlgChangeInputOptions;
        ctx: GZmenaCtxDto;
    }
    class GDlgZmenaDEV extends GContentBase implements IGClientContent, IMajDialogs {
        uid: string;
        private actOK;
        private majpolPrizOdp;
        private frmDTO;
        private ctxE;
        private ucty;
        prepareContent(params: GDlgZmenaOptions): void;
        private changeDev;
        private setEnableObject;
        static showDlg<GZmenaDevDto>(inputOptions: GDlgZmenaOptions): JQuery.Promise<GZmenaDevDto>;
        show<GZmenaDevDto>(inputOptions: GDlgZmenaOptions): JQuery.Promise<GZmenaDevDto>;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    class GDlgZmenaMaj extends GContentBase<{
        majpol: Maj.Interface.GMajMajPolDto;
        ps_fak_stav: number;
        ctxE: GZmenaCtxDto;
        rezimZmenyTop: boolean;
        prijemPrevodem: boolean;
    }> implements IGContent {
        private df_drh_id;
        private df_mat_cis;
        private df_skp;
        private df_mj;
        private df_dat_por;
        private df_dat_zar;
        private df_evi_cis;
        private df_ser_cis;
        private df_vyr_cis;
        private df_ke_pap;
        private df_akce;
        private df_skupina_odpU;
        private df_trida;
        private df_stredisko;
        private df_objekt;
        private df_ixs_orj;
        private df_ixs_ref;
        private df_mistnost_kod;
        private df_segment_kod;
        private df_budova_kod;
        private df_ext_1;
        private df_ext_2;
        private df_ext_3;
        private df_gps_sirka;
        private df_gps_delka;
        private df_rok_vyr;
        private s_unique_o;
        private mode_odp_skp;
        private mode_odp_drh;
        private mode_odp_krt;
        private MAJ_ICO_MODPIS;
        private MAJ_RAD_TOPMMB;
        private cvDebug;
        private cvEkoRok;
        private cvEkoIco;
        private cvUeabNull;
        private cvMajDefaults;
        private changeTopMmb;
        private cvDefOdp;
        private cvBisHidden;
        private cvMajInitRezimEVS;
        private cvMajInitEVS;
        private cvShowSkmDrhSuAu;
        private actOK;
        private dto;
        private returnDto;
        private ucty;
        private drhVybranSUct;
        private ueaLen;
        private selBudova;
        private selSegment;
        private selMistnost;
        private selSkupinaId;
        private majtopStredisko;
        private keyValuesOk;
        onContentReady(): void;
        private logWatch;
        private logFunctionCall;
        private logSrvCall;
        private setEnableObject;
        private setOkButton;
        private getFields;
        private checkOdp;
        private checkEnableChangeOdpSkup;
        private revertSkpAndOdp;
        private resetUcty;
        private setUctyStart;
        private changeDrhId;
        private getStrValueNull;
        private getNumValueNull;
        private setStredisko;
        private setMistnostFilters;
        private setBudSegMis;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    class GDlgZmenaSk extends GContentBase<{
        majpol: Maj.Interface.GMajMajPolDto;
        ps_fak_stav: number;
        ctxE: GZmenaCtxDto;
    }> implements IGContent {
        private s_unique_o;
        private mode_odp_skp;
        private mode_odp_drh;
        private mode_odp_krt;
        private MAJ_ICO_MODPIS;
        private met_skl;
        private cvDebug;
        private actOK;
        private dto;
        private df_drh_id;
        private df_ke_pap;
        private ucty;
        private drhVybranSUct;
        onContentReady(): void;
        private setEnableObject;
        private checkOdp;
        private resetUcty;
        private changeDrhId;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    interface GDlgZpusobEvMatCislaOptions extends TInputOptionsBase {
        data: Gordic.Maj.Interface.GMajsklmDtoBase;
    }
    class GDlgZpusobEvMatCisla extends GContentBase implements IGClientContent, IMajDialogs {
        prepareContent(params: GDlgZpusobEvMatCislaOptions): void;
        static showDlg<TZpusobEvMatCisla>(inputOptions: GDlgZpusobEvMatCislaOptions): JQuery.Promise<TZpusobEvMatCisla>;
        show<TZpusobEvMatCisla>(inputOptions: GDlgZpusobEvMatCislaOptions): JQuery.Promise<TZpusobEvMatCisla>;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    interface TInputOptionsBase {
        related: JQuery;
        data: any;
        ctx: any;
    }
    interface IMajDialogs {
        show<TOutput, T extends TInputOptionsBase>(inputOptions: T): JQuery.Promise<TOutput>;
    }
    interface GDlgChangeInputOptions {
        majpol: Gordic.Maj.Interface.GMajMajPolDto;
        majpolint: Gordic.Maj.Interface.GMajMajPolDto;
        ps_fak_stav: number;
    }
}
declare namespace Gordic.Maj.WebClient {
    function getPlanOdpisuSelector<T>(inputParams: Gordic.Data.Selectors.UserSelectorOptions & Gordic.Data.Selectors.DefaultSelectorOptionsType<T>): Gordic.Data.Selectors.UserSelectorOptions & Gordic.Data.Selectors.DefaultSelectorOptionsType<T>;
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    interface GVyberProdCenyInputData {
        /** prodejni cena 1 */
        cmj_pro1?: JsonDecimal;
        /** prodejni cena 2 */
        cmj_pro2?: JsonDecimal;
        /** prodejni cena 3 */
        cmj_pro3?: JsonDecimal;
    }
    interface GDlgVyberProdCenyOptions extends TInputOptionsBase {
        data: GVyberProdCenyInputData;
    }
    interface GVyberProdCenyOutputDto {
        key: number | null;
    }
    class GVyberProdCenyDlg extends GContentBase implements IGClientContent, IMajDialogs {
        prepareContent(params: GDlgVyberProdCenyOptions): void;
        static showDlg<GVyberProdCenyOutputDto>(inputOptions: GDlgVyberProdCenyOptions): JQuery.Promise<GVyberProdCenyOutputDto>;
        show<GVyberProdCenyOutputDto>(inputOptions: GDlgVyberProdCenyOptions): JQuery.Promise<GVyberProdCenyOutputDto>;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    class GVytvorDokladDlg extends GContentBase implements IGClientContent {
        optsUdajePohybuExterniVazby: sectionUdajePohybuExterniVazbyOpts;
        optsSpotrebaForm: SpotrebaFormOpts;
        detailDto: Interface.GMajmajDto;
        $Form: JQuery<HTMLElement>;
        prepareContent(): void;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    function getCommandBar(this: GContent, serviceMethod: string): MenuParams[];
}
declare namespace Gordic.Maj.WebClient {
    class GHledaniDokladuJsGrid extends GContentBase<{}> implements IGClientContent {
        uid: "HledaniDokladu";
        srv: GContent;
        prepareContent(args: any): void;
        loadData($grid: any, filterModel: any): void;
        private showDetail;
        private noSelectionWarning;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGKnihaDokladuContentValues {
        typAg: number;
        cvPbNewEnabled: boolean;
        majccsv: Gordic.Data.Readers.MajccsvDto[];
        cvEkoIco: string;
        cvEkoRok: number;
        cvColEleHidden: true;
        cvColPocElPriHidden: boolean;
        cvColCizMenaHidden: true;
        cvColRcEsuHidden: boolean;
        cvColNksExtDesc: string;
        cvColNksExtTitle: string;
        cvIxpDen: string;
        cvIxsTypDok: string;
        argAutoFilterStav: number | null;
        filterDto: Maj.WebClient.DTO.GKnihaDokladuFilterDto;
        cvRezimJedneKnihy: boolean;
        cvMajInitRezimEVS: boolean;
        cvIxsVue: string;
        cvDebug: boolean;
        gin_gen_ixp: string;
        maj_rad_rpp: boolean;
        eko_rad_dfken: number;
        ADM_GINSTRE_TYP: number;
        IxpDen: string;
        RokDen: number;
    }
    class GKnihaDokladu extends GContentBase<WebClient.MajGrid.IGStandardMajGrid<Maj.Interface.GMajpidDto, Interface.GDokladMajPermission> & Gordic.Eko.Utils.IGEkoBookExtension & IGKnihaDokladuContentValues> implements IGContent {
        taskId: "actDklBook";
        uid: "KnihaDokladu#";
        /**
         * Aktuální spisový uzel
         * @type {string}
         */
        private readonly IxsSu;
        private rezimVlastnikHist;
        $grid: JQuery<HTMLElement>;
        /**
         * Jmeno tridy gridu
         */
        readonly classGrid = "KnihaDokladuGrid";
        onContentReady(): void;
        private logWatch;
        private logFunctionCall;
        private openDetailPodani;
        /**
         * Zobrazení detailu existujícího nebo podání nového dokladu
         *
         * @param {GContent} content content
         * @param {Gordic.Maj.Interface.GMajpidDto} [row] aktuální řádek (pro zobrazení detailu) nebo nevyplněno (pro podání)
         * @param {MajGrid.openDetailWizardParams} [wizard] parametry průvodce (v případě volání detailu z průvodce)
         * @returns {JQuery.Promise<any>} promise s operací
         */
        private openDetail;
        private getMenu;
        /**
        * Schvalení / zrušení schvalení vybraných dokladů
        *
        * @param {boolean} schvalit (default = true) schválit (true) nebo zrušit schválení (false)
        * @returns {JQuery.Promise<any>} promise s operací
        */
        private schvaleni;
        /**
      * Zaúčtování vybraných dokladů
      *
      * @returns {JQuery.Promise<any>} promise s operací
      */
        private zauctovat;
        /**
        * Ukončení / zrušení ukončení vybraných dokladů
        *
        * @returns {JQuery.Promise<any>} promise s operací
        */
        private uzavrit;
        /**
        * Kontrola metadat
        *
        * @returns {JQuery.Promise<any>} promise s operací
        */
        private kontrolaMetadat;
        /**
         * Předání vybraných dokladů
         *
         * @returns {JQuery.Promise<any>} promise s operací
         */
        private predani;
        /**
         * Převzetí vybraných dokladů
         *
         * @returns {JQuery.Promise<any>} promise s operací
         */
        private prevzeti;
        /**
         * Přidělení vybraných dokladů
         *
         * @returns {JQuery.Promise<any>} promise s operací
         */
        private prideleni;
        /**
         * Přeevidence vybraných dokladů
         *
         * @returns {JQuery.Promise<any>} promise s operací
         */
        private preevidence;
        /**
         * Průvodce nad seznamem dokladů <DTO operace, model parametrů>
         *
         * @param {MajWizard.MajWizardParams<TOperationDto, TModel, Maj.Interface.GMajpidDto> | MajWizard.MajWizardParamsPart<TOperationDto, TModel, Maj.Interface.GMajpidDto>} params část parametrů průvodce
         * @returns {JQuery.Promise<any>} promise s operací
         */
        private wizardTwoSteps;
        /**
        * Vrátí seznam dokladů pro zobrazení v průvodcích pro hromadné operace
        *
        * @param {boolean} onlyChecked pouze zaškrtnuté řádky (true = ano, false = ne)
        * @param {boolean} withResults doplnění výsledků hromadné operace (true = ano, false = ne)
        * @param {Gordic.General.GIkc | Gordic.Maj.Interface.GMajpidDto[] | null} ikcOrData IKC nebo data (stačí PK)
        * @param {string[] | undefined} fragments fragmenty
        * @param {Gordic.Isl.GServiceGroupResponse<Gordic.Maj.Interface.GMajpidDto>} [response] výsledek hromadné operace
        * @returns {JQueryPromise<(Gordic.Eko.Components.MassOperationData<Gordic.Maj.Interface.GMajpidDto> | Gordic.Maj.Interface.GMajpidDto)[]>} seznam dokladů (s výsledky operace nebo bez podle parametru withResults)
        */
        private wizardGetData;
        /**
         * Občerství seznam a překontroluje data (oboje volitelně)
         *
         * @param {GContent} cnt content
         * @param {boolean} reloadData mají se načíst aktuální data z databáze? (true = ano, false = ne)
         * @param {Gordic.Maj.Interface.GMajpidDto[] | undefined} data data pro případ, že se nemají načítat z databáze (reloadData = false)
         * @param {Gordic.General.GIkc | null} ikc IKC
         * @param {string[] | undefined} fragments fragmenty
         * @param {((dto: TOperationDto) => any) | undefined} checkAction delegát pro kontrolu dat před operací (pokud není, nevolá se kontrola, jen se načtou aktuální data)
         * @param {(model: TModel | undefined, data: Gordic.Maj.Interface.GMajpidDto[], ikc: Gordic.General.GIkc) => TOperationDto} toOperationDto delegát pro vytvoření DTO operace
         * @param {TModel | undefined} model model
         * @returns {JQueryPromise<Gordic.Maj.Interface.GMajpidDto[]>} seznam dokladů (s výsledky operace nebo bez podle parametru withResults)
         */
        private wizardRefreshAndCheckData;
        /**
         * Nastavení prvků ve formuláři
         */
        private enable;
        /**
         * Vrátí PID aktuální knihy (nebo null pokud není zadána nebo se jde o režim přes více knih)
         *
         * @returns {string | null} PID aktuální knihy (nebo null pokud není zadána nebo se jde o režim přes více knih)
         */
        private getIxpDen;
        /**
         * Zadání parametrů tisku
         *
         * @param {IGPrintActionReportStarting} rep parametry tisku
         */
        reportStarting(rep: IGPrintActionReportStarting): JQueryPromise<any> | void;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGPohybyContentValues {
        majstriPol: Gordic.Data.Readers.MajstriDto[];
        majcstp: Gordic.Data.Readers.MajcstpDto[];
        cvEkoIco: string;
        majspoh: Gordic.Data.Readers.MajspohDto[];
        majstri: Gordic.Data.Readers.MajstriDto[];
        tblPolItemUeabOpr: GGuptaTblColumn;
        tblPolItemUeabPor: GGuptaTblColumn;
        tblPolItemMj: GGuptaTblColumn;
        tblPolItemSkp: GGuptaTblColumn;
        tblPolItemNazev: GGuptaTblColumn;
        tblPepItemInvCis: GGuptaTblColumn;
        tblPepItemMatCis: GGuptaTblColumn;
        tblPepItemUeabEvi: GGuptaTblColumn;
        HideCiziMena: boolean;
        cvMajInitIdTop: string;
        cvColNsExtTitle: string;
        cvDphPlatce: number;
        majcskm: Gordic.Data.Readers.MajcskmDto[];
        majsel1: Gordic.Data.Readers.Majsel1Dto[];
        majsel2: Gordic.Data.Readers.Majsel2Dto[];
        majsel3: Gordic.Data.Readers.Majsel3Dto[];
        majcdrm: Gordic.Data.Readers.MajcdrmDto[];
    }
    class GMajPohyby extends GContentBase<IGPohybyContentValues> implements IGContent {
        taskId: "actDklPep";
        uid: "Pohyby#";
        private tblTable;
        private tblMode;
        onContentReady(): void;
        loadData($grid: any, filterModel: any): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGPolozkyContentValues {
        majstriPol: Gordic.Data.Readers.MajstriDto[];
        majcstp: Gordic.Data.Readers.MajcstpDto[];
        cvEkoIco: string;
        majspoh: Gordic.Data.Readers.MajspohDto[];
        majstri: Gordic.Data.Readers.MajstriDto[];
        cvColUeabOprVis: boolean;
        cvColUeabOprName: string;
        cvColUeabPorName: string;
        cvColUeabPorVis: boolean;
        cvColEvsVis: boolean;
        cvColNsExtName: string;
        HideCiziMena: boolean;
        cvColDphVis: boolean;
        cvColSkpName: string;
        cvColSkpVis: boolean;
        cvColMjVis: boolean;
        cvColMjName: string;
        cvColAcVis: boolean;
        cvColSerCisloVis: boolean;
        cvColSerPCisloVis: boolean;
        cvColInvCisName: string;
        cvColInvCisVis: boolean;
        cvColMatCisName: string;
        cvColMatCisVis: boolean;
        cvColUeabEviName: string;
        cvColUeabEviVis: boolean;
        cvColNazevVis: boolean;
        cvColNazevName: string;
        majcskm: Gordic.Data.Readers.MajcskmDto[];
        majsel1: Gordic.Data.Readers.Majsel1Dto[];
        majsel2: Gordic.Data.Readers.Majsel2Dto[];
        majsel3: Gordic.Data.Readers.Majsel3Dto[];
        majcdrm: Gordic.Data.Readers.MajcdrmDto[];
    }
    class GMajPolozky extends GContentBase<IGPolozkyContentValues & Gordic.Eko.Utils.IGEkoBookExtension> implements IGContent {
        taskId: "actDklPol";
        uid: "Polozky#";
        onContentReady(): void;
        loadData($grid: any, filterModel: any): void;
    }
}
declare namespace Gordic.Maj.WebClient.Seznam {
    /**
         * Obcerstveni seznamu z nactenych dat ve view
         */
    function RefreshSeznamu(content: GKnihaDokladu | null | undefined): void;
    /**
     * Vraceni obsahu seznamu
     * @returns
     */
    function GetContentSeznam(): GKnihaDokladu;
    /**
    * Vraci objekt gridu
    * @param content
    * @returns
   */
    function GetGrid(content: GKnihaDokladu): JQuery<HTMLElement>;
    /**
     * Aktualizace zaslanych zapisu z DB do gridu
     * @param content
     * @param doklady
     */
    function refreshRowsFromDB(content: GKnihaDokladu, doklady: Interface.GMajpidDto[]): JQueryPromise<any>;
}
declare namespace Gordic.Maj.WebClient {
    interface IGRegTzhContentValues {
        argMode: number;
        argIxsMaj?: string;
        argInvCis?: string;
        data: Gordic.Maj.Interface.GTzhDto[];
    }
    class GRegistrTzh extends GContentBase<IGRegTzhContentValues> implements IGContent {
        uid: string;
        private showOk;
        private showMsk;
        private showTag;
        private filterFrm;
        onContentReady(): void;
        loadData($grid: any, filterModel: any): void;
        private setMskPripraveno;
        private putBuffer;
        closing(returnValue?: any): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Maj.WebClient {
    function ZobrazDetailDleIXP(content: GContent, ixp: null | string, samostaneOkno?: boolean, editace?: boolean, grid?: JQuery<HTMLElement> | undefined, objekt?: string, ixpDen?: string, polozky?: boolean): void;
}
declare namespace Gordic.Maj.WebClient {
    function IsEditMode(content: GMajDokladDetail): boolean;
}
declare namespace Gordic.Maj.WebClient {
    interface IGDefDtoDoklad {
        df_kod_poh: Client.GGuptaDbBox;
        df_dat_uup: Client.GGuptaDbBox;
        df_dat_zdan: Client.GGuptaDbBox;
        df_id_top: Client.GGuptaDbBox;
        df_nks_ext_pri: Client.GGuptaDbBox;
        df_inv_cis_sou: Client.GGuptaDbBox;
        df_dat_termin: Client.GGuptaDbBox;
        df_ps_fak: Client.GGuptaDbBox;
        df_esu_txt: Client.GGuptaDbBox;
        df_ac_ext: Client.GGuptaDbBox;
        df_ico_ext: Client.GGuptaDbBox;
        df_nks_ext: Client.GGuptaDbBox;
        df_ixs_ref: Client.GGuptaDbBox;
        df_mena: Client.GGuptaDbBox;
        df_c_c_zmena: Client.GGuptaDbBox;
        cb_with_dph: Client.GGuptaBtn;
        cb_odpocet_dph_no: Client.GGuptaBtn;
        df_naklad_1: Client.GGuptaDbBox;
        df_naklad_2: Client.GGuptaDbBox;
        df_naklad_3: Client.GGuptaDbBox;
        df_stredisko: Client.GGuptaDbBox;
        df_ixs_orj_nak: Client.GGuptaDbBox;
        df_objekt: Client.GGuptaDbBox;
        df_ixs_ref_nak: Client.GGuptaDbBox;
        df_trida: Client.GGuptaDbBox;
        df_ext_1: Client.GGuptaDbBox;
        df_ext_2: Client.GGuptaDbBox;
        df_ext_3: Client.GGuptaDbBox;
        pbPodani: Client.GGuptaDbBox;
        pbPodaniEle: Client.GGuptaDbBox;
        pbEvidence: Client.GGuptaDbBox;
        pbValidate: Client.GGuptaDbBox;
        pbStornoMud: Client.GGuptaDbBox;
        pbUct: Client.GGuptaDbBox;
        pbClose: Client.GGuptaDbBox;
        df_ac_ag: Client.GGuptaDbBox;
        df_typ_dok: Client.GGuptaDbBox;
        df_popis: Client.GGuptaDbBox;
        tblPolItemNazev: GGuptaTblColumn;
        tblPolItemNazevMaj: GGuptaTblColumn;
        tblPolItemAkce: GGuptaTblColumn;
        tblPolItemMistnost: GGuptaTblColumn;
        tblPolItemSegment: GGuptaTblColumn;
        tblPolItemBudova: GGuptaTblColumn;
        tblPolItemObjekt: GGuptaTblColumn;
        tblPolItemIxsRef: GGuptaTblColumn;
        tblPolItemReferat: GGuptaTblColumn;
        tblPolItemStredisko: GGuptaTblColumn;
        tblPolItemSarze: GGuptaTblColumn;
        tblPolItemSerCis: GGuptaTblColumn;
        tblPolItemEviCis: GGuptaTblColumn;
        tblPolItemVyrCis: GGuptaTblColumn;
        tblPolItemTrida: GGuptaTblColumn;
        tblPolItemDatZar: GGuptaTblColumn;
        tblPolItemUeabOpr: GGuptaTblColumn;
        tblPolItemUeabPor: GGuptaTblColumn;
        tblPolItemDruh: GGuptaTblColumn;
        tblPepItemInvCis: GGuptaTblColumn;
        tblPepItemUeabEvi: GGuptaTblColumn;
        tblPepItemMatCis: GGuptaTblColumn;
        tblPolItemSkp: GGuptaTblColumn;
        tblPolItemMj: GGuptaTblColumn;
        maj_dok_prizps: Interface.GMajEnumRezimZadavaniPsFak;
        cvMajInitIdTop: string;
        cvMajInitEVS: string;
        maj_dok_priuup: boolean;
        lbl_prirazka: string;
        cvKpiPolTitle: string;
        CcCPri: JsonDecimal;
        CcDphCcMena: JsonDecimal;
        maj_dok_priuupm: boolean;
        cvEkoRokDen: number;
        cvEkoRok: number;
        cvNowYear: number;
        cvNowMonth: number;
        cvEkoDphPlatce: number;
        cvEkoUeaDelka: number;
        cvEkoUebDelka: number;
        cvEkoUebPrazdny: string;
        cvEkoDphS1Text: string;
        cvEkoDphS2Text: string;
        cvEkoDphS2Used: boolean;
        cvIxsVue: string;
        maj_dok_lenps: number;
        cvEkoIco: string;
        cvEkoNks: string;
        cvEkoUcs: string;
        cvKnihaTxt: string;
        cvPreevidenceTitle: string;
        pbNew_Edit: boolean;
        cvNormalDok: boolean;
        cvDivTypDok: number;
        cvEnblEvid: boolean;
        cvEnblStornoPol: boolean;
        cvEnblCorrPol: boolean;
        cvEnblPrirazka: boolean;
        cvEnblPredpis: boolean;
        cvEnblLocRwEvid: boolean;
        cvCUS708: boolean;
        cvOdpOrgUOdpPovolen: boolean;
        MAJ_RAD_DOKMPP: boolean;
        cvTblPolEnabled: boolean;
        MAJ_ICO_MODPIS: boolean;
        MAJ_RAD_BLKEXP: boolean;
        cvBisHosp: boolean;
        cvMajDphPlatce: number;
        cvKtgPohSpotreba: boolean;
        cvKtgPohProdej: boolean;
        MAJ_RAD_DOKPNEW: number;
        MAJ_DOK_NAZPOS: boolean;
        MAJ_ICO_FILL_KR: boolean;
        MAJ_RAD_PAKPOV: boolean;
        MAJ_DOK_PRIMCC: boolean;
        ADM_GINSTRE_TYP: number;
        HideCiziMena: boolean;
        cvColNsExtTitle: string;
        tblPol: Interface.GPolozkyMajDokladuDto[];
        cvManualAcAg: boolean;
        lbl_c_c_dph: string;
        df_c_dotace: Client.GGuptaDbBox;
        cvMpStavTxt: string;
        cvIdTopMetSkl: number;
        majsod: Interface.GMajsodDto;
        cvIstaHospKomp: boolean;
        cvArrKtgPohDok0: Array<number>;
        cvIsOSS: boolean;
        cvUeabNull: string;
        cvCMinDHM: Decimal;
        cvCMinDNM: Decimal;
        cvDebug?: boolean;
        cvBagHsNks: boolean;
        DetailDto: Interface.GMajpidDto;
    }
    type DtoType = Gordic.Maj.Interface.GMajpidDto;
    type UsedComponents = IGDefDtoDoklad & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoType> & Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions;
    class GMajDokladDetail extends GDetailBuilderContent<UsedComponents> implements IGContent {
        uid: "MajDoklad#";
        Ixp?: string;
        private nTblPolZev;
        private nTblPolSUnq;
        private bTblPolNoExistKrt;
        private nTblPolTypDM;
        private majpol;
        private init_dph_priz;
        private bTblPolFocusInvCis;
        private bTblPolMatCisChanged;
        private tblMode;
        private tblTable;
        private tblPolActionList;
        private tblPepActionList;
        private setFiltr;
        private tblPolMnozinaFind;
        private invCisFilter;
        private gridPol;
        private forcePolGridRefresh;
        private oStornoTzhRec;
        private tabSpotreba;
        private oZmenaTopRec;
        private oProdPrirazky;
        private sectionUdajePohybuExterniVazbyOpts;
        private spotrebaFormOpts;
        onContentReady(): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Funkce detailbuilderu, spuštěná po merge komponent
         *
         * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder
         */
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        private fillSectionsUdajePohybuExterniVazbyOptions;
        private fillSpotrebaFormOptions;
        private setCWithDph;
        private setNewTopolPP;
        private jsInsertPol;
        private jsStornoPol;
        private setPol;
        private setStatusLine;
        private savePolozka;
        private logWatch;
        private logFunctionCall;
        private logSrvCall;
        private checkPol;
        private checkZev;
        private savePrijem;
        private saveAktVyr;
        private saveVMzOe;
        private saveZarUzi;
        private saveVydej;
        private saveZmena;
        private saveZmenaTop;
        private saveZmenaSk;
        private saveZmenaDev;
        private saveZmenaC;
        private saveSouborIn;
        private saveSouborOut;
        private saveResZap;
        private saveResRet;
        private saveRegTzh;
        private saveTzh;
        private saveIZad;
        private saveIPoz;
        private saveSlcM;
        private saveRozM;
        private saveIUO;
        private saveRegTzh2Nx;
        private createNewPol;
        private setZmenaCenyOdp;
        private setPolRegTzh;
        private setPolRegTzhStorno;
        private testDataUup;
        private setMajTzh;
        private setFiltrTzh;
        private setFiltrInvCis;
        private setFiltrInvCisSoub;
        private setFiltrRes;
        private getReservationSubjectId;
        private setPolMaj;
        private setPolMajZm;
        private setPolMnC;
        private setEndRow;
        private stopPolEdit;
        private getIstzVpHospKomp;
        private setContextRowPol;
        private tblPolSetEnableButton;
        private getCPriFromCmjPro;
        private checkIfOnlyOneCmjProIsSet;
        private initPolFromHeaderJS;
        private _isMajUnique;
        private evidDoklad;
        private saveDoklad;
        private jsPodani;
        private jsPodaniEle;
        private jsCloseMud;
        private validateMud;
        private jsStornoMud;
        private jsMakeUctDoklad;
        private getFields;
        private changeDokC;
        private VyberDatumuDialog;
        private VyberTextuDialog;
        private setStornoStatus;
        private setDevStatus;
        private GetIxsEsuFlag;
        private changeTypDok;
        private setVisibleDph;
        private setFlag;
        private setRequired;
        private setDisabled;
        private setDisabledSpotreba;
        private setHeaderViewModified;
        closing(): JQueryPromise<any>;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface SpotrebaFormOpts {
        cvEkoIco: string;
        ADM_GINSTRE_TYP: number;
        df_stredisko: Client.GGuptaDbBox;
        df_ixs_orj_nak: Client.GGuptaDbBox;
        df_trida: Client.GGuptaDbBox;
        df_objekt: Client.GGuptaDbBox;
        df_ixs_ref_nak: Client.GGuptaDbBox;
        df_ext_1: Client.GGuptaDbBox;
        df_ext_2: Client.GGuptaDbBox;
        df_ext_3: Client.GGuptaDbBox;
        hromadneZmeny: boolean;
    }
    function SpotrebaForm(FormSpotreba: Gordic.Forms.Form, opts: SpotrebaFormOpts): void;
}
declare namespace Gordic.Maj.WebClient {
    enum DetailDokladRezim {
        detail = 0,
        vydej = 1,
        vydejLikvidaci = 2
    }
    interface sectionUdajePohybuExterniVazbyOpts {
        hromadneZmeny: boolean;
        zadosti?: boolean;
        DetailDto: Interface.GMajpidDto;
        dialogs: GDlgNamespace;
        content: GContent;
        setFiltr: WebClient.DTO.GMajFiltrRecDto;
        cvEkoIco: string;
        cvEkoNks: string;
        cvEkoUcs: string;
        cvMajInitIdTop: string;
        cvMajInitEVS: string;
        cvEkoRok: number;
        df_inv_cis_sou: Client.GGuptaDbBox;
        cvBisHosp: boolean;
        maj_dok_prizps: Interface.GMajEnumRezimZadavaniPsFak;
        df_kod_poh: Client.GGuptaDbBox;
        df_dat_uup: Client.GGuptaDbBox;
        maj_dok_priuupm: boolean;
        maj_dok_priuup: boolean;
        cvNowYear: number;
        cvNowMonth: number;
        cvEkoDphPlatce: number;
        df_dat_zdan: Client.GGuptaDbBox;
        df_id_top: Client.GGuptaDbBox;
        df_nks_ext_pri: Client.GGuptaDbBox;
        df_ps_fak: Client.GGuptaDbBox;
        df_esu_txt: Client.GGuptaDbBox;
        df_ac_ext: Client.GGuptaDbBox;
        df_ico_ext: Client.GGuptaDbBox;
        df_nks_ext: Client.GGuptaDbBox;
        cvBagHsNks: boolean;
        df_ixs_ref: Client.GGuptaDbBox;
        ADM_GINSTRE_TYP: number;
        df_dat_termin: Client.GGuptaDbBox;
        typ_dok: Gordic.Forms.Dependency<any> | number;
        setDevStatus: any;
        setStornoStatus: any;
        setVisibleDph: any;
    }
    function setMena(opts: sectionUdajePohybuExterniVazbyOpts): void;
    function GetIxsEsuFlag(DetailDto: Interface.GMajpidDto): GFieldFlagOptions | undefined;
    function setFiltrInvCisSoub2(typ_dok: number, dev: number, ico: string, ucs: string, nks: string, cvMajInitIdTop: string, cvMajInitEVS: string): DTO.GMajFiltrRecDto;
    function setFiltrInvCisSoub(opts: sectionUdajePohybuExterniVazbyOpts): any;
    function changeKodPoh(value: Data.Readers.MajspohDto, opts: sectionUdajePohybuExterniVazbyOpts): void;
    function UdajePohybuExterniVazbySections(opts: sectionUdajePohybuExterniVazbyOpts): Forms.Form;
}
declare namespace Gordic.Maj.WebClient {
    class GZadosti extends GContentBase<WebClient.MajGrid.IGStandardMajGrid<Maj.Interface.GMajsiabDto, Interface.GMajKartaSeznamPermission> & GHromadneZmenyInterface & GKartotekaColNames> implements IGContent {
        uid: "GZadosti#";
        typKlasifikace: number;
        rok: number;
        $masterGrid: JQuery;
        zadostiTab?: JQuery;
        polozkyTab?: JQuery;
        slaveData: Interface.GMajsiapDto[];
        filterPanelElement: JQuery;
        title: string;
        shortTitle: string;
        majcakt: Gordic.Maj.Interface.GMajcaktDto[];
        cvMajResHide: true;
        cvMajOdpUcet10Hide: true;
        cvMajOdpUcet0Hide: true;
        cvMajOdpDan0Hide: true;
        cvRenHide: true;
        onContentReady(): void;
        createGrid(): void;
        createMasterGridFormat(): Data.GridFormat<Interface.GMajsiabDto>;
        createSlaveGridFormat<T>(): Data.GridFormat<T>;
        /**
     * default commandbar builder function
     * @returns {MenuParams[]} pole akci - vyber / zrusit
     */
        defaultCommandBar(): MenuParams[];
    }
}
declare namespace Gordic.Search.Maj {
    /**
     * Resolver hledající maj. doklady
     *
     * @author  PSvoboda
     * @date    06.09.2022 (14. výročí P+S)
     */
    class GMajDokladSearchResolver extends Components.Search.GBaseSearchResolver {
        readonly typeGuesser: Utils.GTypeGuesser;
        private readonly logger;
        /**
         * Zde vracíme identifikátor resolveru.
         */
        protected getDefaultId(): string;
        /**
         * Zde vracíme informace o doméně resolveru.
         */
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        private readonly fuzzySearch;
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Search.Maj {
    /**
     * Resolver hledající maj. karty
     *
     * @author  TFeik, PSvoboda
     * @date    10.08.2022
     */
    class GMajKartaSearchResolver extends Components.Search.GBaseSearchResolver {
        readonly typeGuesser: Utils.GTypeGuesser;
        private readonly logger;
        /**
         * Zde vracíme identifikátor resolveru.
         */
        protected getDefaultId(): string;
        /**
         * Zde vracíme informace o doméně resolveru.
         */
        protected getDefaultDomain(): {
            id: string;
            name: string;
            description: string;
            terms: string;
        };
        private readonly fuzzySearch;
        /**
         * Zde na základě vstupního textu nabízíme výsledky hledání.
         *
         * @param {any} input
         * @param {any} task
         */
        protected getResult(input: any, task: any): Components.Search.IGSearchResolverItem[] | JQuery.PromiseBase<Components.Search.IGSearchResolverItem[], never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGDokladyVPrevoduContentValues {
        argSmer: number;
        argFrmMode: number;
        cvDataFound: boolean;
        data: Gordic.Maj.Interface.GMajpidDto[];
        cvColEleHidden: true;
        cvColPocElPriHidden: boolean;
        cvColExtUJHidden: boolean;
        cvColEvsHidden: boolean;
        cvColNksExtDesc: string;
        cvColNksExtTitle: string;
        cvColUsdHidden: false;
    }
    class GDokladyVPrevodu extends GContentBase<IGDokladyVPrevoduContentValues> implements IGContent {
        uid: "DokladyX#";
        private $grid;
        onContentReady(): void;
        jsVyberDoklad(): void;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    class GHistorieDphGrid extends GContentBase implements IGClientContent {
        private invCis;
        private grid;
        private view;
        uid: string;
        prepareContent(params: any): void;
        loadData(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Maj.WebClient {
    export interface IGHistorieKartyContentValues {
        cvDataFound: boolean;
        cvColKodVyrTitle: string;
        cvColKodVyrHide: boolean;
        cvColExpiraceTitle: string;
        cvColExpiraceHide: boolean;
        cvColEANTitle: string;
        cvColEANHide: boolean;
        cvColKodVyuTitle: string;
        cvColKodVyuHide: boolean;
        cvColAkceTitle: string;
        cvColAkceHide: boolean;
        cvColDpOdeTitle: string;
        cvColDpOdeHide: boolean;
        cvColDanTypTitle: string;
        cvColDanTypHide: boolean;
        cvColCDphTitle: string;
        cvColCDphHide: boolean;
        cvColCDphOdpocetTitle: string;
        cvColCDphOdpocetHide: boolean;
        cvColCcDphTitle: string;
        cvColCcDphHide: boolean;
        cvColDatZmenaTitle: string;
        cvColDatZmenaHide: boolean;
        cvColLhutaZarukaTitle: string;
        cvColLhutaZarukaHide: boolean;
        cvColObjektTitle: string;
        cvColObjektHide: boolean;
        cvColStatPuvodTxtTitle: string;
        cvColStatPuvodTxtHide: boolean;
        cvColIxsEsuVyrTitle: string;
        cvColIxsEsuVyrHide: boolean;
        cvColIxsEsuDodTitle: string;
        cvColIxsEsuDodHide: boolean;
        cvColIxsEsuServisTitle: string;
        cvColIxsEsuServisHide: boolean;
        cvColTypMajTitle: string;
        cvColTypMajHide: boolean;
        cvColKtgZarTitle: string;
        cvColKtgZarHide: boolean;
        cvColDelkaTitle: string;
        cvColDelkaHide: boolean;
        cvColSirkaTitle: string;
        cvColSirkaHide: boolean;
        cvColVyskaTitle: string;
        cvColVyskaHide: boolean;
        cvColHmotnostTitle: string;
        cvColHmotnostHide: boolean;
        cvColPrevStavTitle: string;
        cvColPrevStavHide: boolean;
        cvColMobilitaTitle: string;
        cvColMobilitaHide: boolean;
        cvColRizikoPorTitle: string;
        cvColRizikoPorHide: boolean;
        cvColIdRKpHide: boolean;
        cvColIdRKpTitle: string;
        cvColCisRKpHide: boolean;
        cvColCisRKpTitle: string;
        cvColKtgKpHide: boolean;
        cvColKtgKpTitle: string;
        cvColIdMajHide: boolean;
        cvColIdMajTitle: string;
        cvColKePapHide: boolean;
        cvColKePapTitle: string;
        cvColCmjPro3Hide: boolean;
        cvColCmjPro3Title: string;
        cvColCmjPro2Hide: boolean;
        cvColCmjPro2Title: string;
        cvColCmjPro1Hide: boolean;
        cvColCmjPro1Title: string;
        cvColCDotaceHide: boolean;
        cvColCDotaceTitle: string;
        cvColCRealHide: boolean;
        cvColCRealTitle: string;
        cvColCOprPolHide: boolean;
        cvColCOprPolTitle: string;
        cvColCPorizHide: boolean;
        cvColCPorizTitle: string;
        cvColGpsDelkaHide: boolean;
        cvColGpsDelkaTitle: string;
        cvColGpsSirkaHide: boolean;
        cvColGpsSirkaTitle: string;
        cvColExt3Hide: boolean;
        cvColExt3Title: string;
        cvColExt2Hide: boolean;
        cvColExt2Title: string;
        cvColExt1Hide: boolean;
        cvColExt1Title: string;
        cvColIxsEsuVlaHide: boolean;
        cvColIxsEsuVlaTitle: string;
        cvColTridaBezpHide: boolean;
        cvColTridaBezpTitle: string;
        cvColEviCisTitle: string;
        cvColEviCisHide: boolean;
        cvColVyrCisTitle: string;
        cvColVyrCisHide: boolean;
        cvColSerCisTitle: string;
        cvColSerCisHide: boolean;
        cvColSarzeTitle: string;
        cvColSarzeHide: boolean;
        cvColNazevSkpTitle: string;
        cvColNazevSkpHide: boolean;
        cvColNksTitle: string;
        cvColNksHide: boolean;
        cvColIxsOrjTitle: string;
        cvColIxsOrjHide: boolean;
        cvColStrediskoTitle: string;
        cvColStrediskoHide: boolean;
        cvColBudovaKodTitle: string;
        cvColBudovaKodHide: boolean;
        cvColSegmentKodTitle: string;
        cvColSegmentKodHide: boolean;
        cvColMistnostKodTitle: string;
        cvColMistnostKodHide: boolean;
        cvColJmenoSouborTitle: string;
        cvColJmenoSouborHide: boolean;
        cvColInvCisSoubTitle: string;
        cvColInvCisSoubHide: boolean;
        cvColIxsRefTitle: string;
        cvColIxsRefHide: boolean;
        cvColKodPorTitle: string;
        cvColKodPorHide: boolean;
        cvColSkupTitle: string;
        cvColSkupHide: boolean;
        cvColDrhTitle: string;
        cvColDrhHide: boolean;
        cvColDevTitle: string;
        cvColDevHide: boolean;
        cvColTkaTitle: string;
        cvColTkaHide: boolean;
        cvColTevTitle: string;
        cvColTevHide: boolean;
        cvColInvCisTitle: string;
        cvColInvCisHide: boolean;
        cvColMatCisTitle: string;
        cvColMatCisHide: boolean;
        cvColSkpTitle: string;
        cvColSkpHide: boolean;
        cvColNazevTitle: string;
        cvColNazevHide: boolean;
        cvColUeabEviTitle: string;
        cvColUeabEviHide: boolean;
        cvColPmjTitle: string;
        cvColPmjHide: boolean;
        cvColCTitle: string;
        cvColCHide: boolean;
        cvColCMjTitle: string;
        cvColCMjHide: boolean;
        cvColPmjMinTitle: string;
        cvColPMjMinHide: boolean;
        cvColPmjMaxTitle: string;
        cvColPMjMaxHide: boolean;
        cvColPmjResTitle: string;
        cvColPMjResHide: boolean;
        cvColUeabPorTitle: string;
        cvColUeabPorHide: boolean;
        cvColUeabOprTitle: string;
        cvColUeabOprHide: boolean;
        cvColDatPorTitle: string;
        cvColDatPorHide: boolean;
        cvColDatZarTitle: string;
        cvColDatZarHide: boolean;
        cvColDatVyrTitle: string;
        cvColDatVyrHide: boolean;
        cvColDatUctTitle: string;
        cvColDatUctHide: boolean;
        cvColMjTitle: string;
        cvColMjHide: boolean;
        cvColRokVyrTitle: string;
        cvColRokVyrHide: boolean;
        cvColTridaTitle: string;
        cvColTridaHide: boolean;
        data: Gordic.Maj.Interface.GMajmajDto[];
    }
    interface markedValue<T> {
        value: T;
        marked: boolean;
    }
    interface GMarkedMajmajDto {
        /**jednoznačný ID maj. karty*/
        ixs_maj?: markedValue<string | null>;
        /**licence DB*/
        lic?: markedValue<string | null>;
        /**inventární číslo maj. karty*/
        inv_cis?: markedValue<string | null>;
        /**sériové číslo maj. karty*/
        ser_cis?: markedValue<string | null>;
        /**evidenční číslo maj. karty*/
        evi_cis?: markedValue<string | null>;
        /**výrobní číslo maj. karty*/
        vyr_cis?: markedValue<string | null>;
        /**rok výroby*/
        rok_vyr?: markedValue<number | null>;
        /**klasifikace výroby a produkce*/
        skp?: markedValue<string | null>;
        /**název zděděný z číselníku SKP*/
        nazev_skp?: markedValue<string | null>;
        /**uživatelem zadaný název*/
        nazev?: markedValue<string | null>;
        /**Su-Au pořízení*/
        ueab_por?: markedValue<string | null>;
        /**Su-Au oprávek*/
        ueab_opr?: markedValue<string | null>;
        /**Su-Au evidence*/
        ueab_evi?: markedValue<string | null>;
        /**cena za MJ (měrnou jednotku)*/
        cmj?: markedValue<JsonDecimal | null>;
        /**počet MJ*/
        pmj?: markedValue<JsonDecimal | null>;
        /**aktuální cena*/
        c?: markedValue<JsonDecimal | null>;
        /**minimální počet MJ (u množ. karty)*/
        pmj_min?: markedValue<JsonDecimal | null>;
        /**maximální počet MJ*/
        pmj_max?: markedValue<JsonDecimal | null>;
        /**reservovaný počet MJ*/
        pmj_res?: markedValue<JsonDecimal | null>;
        /**datum pořízení*/
        dat_por?: markedValue<JsonDate | null>;
        /**datum zařazení*/
        dat_zar?: markedValue<JsonDate | null>;
        /**datum vyřazení*/
        dat_vyr?: markedValue<JsonDate | null>;
        /**datum vzniku karty*/
        dat_vznik?: markedValue<JsonDate | null>;
        /**Datum vyřazení k zobrazení*/
        dat_vyr_show?: markedValue<JsonDate | null>;
        /**účetní středisko organizace*/
        ucs?: markedValue<string | null>;
        /**nákladové středisko organizace*/
        nks?: markedValue<string | null>;
        /**NKS nebo ID_TOP k zobrazení*/
        nks_show?: markedValue<string | null>;
        /**evidenční třída majetku, je-li tak členěn*/
        trida?: markedValue<string | null>;
        /**evidenční středisko organizace*/
        stredisko?: markedValue<string | null>;
        /**kód budovy*/
        budova_kod?: markedValue<string | null>;
        /**kód místnosti*/
        mistnost_kod?: markedValue<string | null>;
        /**organizační jednotka*/
        ixs_orj?: markedValue<string | null>;
        ixs_orj_txt?: markedValue<string | null>;
        /**zodpovědný člověk*/
        ixs_ref?: markedValue<string | null>;
        ixs_ref_txt?: markedValue<string | null>;
        /**ukazatel na soubor*/
        ixs_maj_nad?: markedValue<string | null>;
        /**typ souboru - účetní či logistický*/
        typ_soubor?: markedValue<number | null>;
        /**název souboru majetku*/
        jmeno_soubor?: markedValue<string | null>;
        /**inv. číslo souboru majetku*/
        inv_cis_soubor?: markedValue<string | null>;
        /**druh majetku*/
        drh_id?: markedValue<number | null>;
        drh_zkr?: markedValue<string | null>;
        /**skupina majetku*/
        skupina_id?: markedValue<number | null>;
        skupina_zkr?: markedValue<string | null>;
        /**měrná jednotka*/
        mj?: markedValue<string | null>;
        /**odpisová skupina*/
        skupina_odp?: markedValue<string | null>;
        /**položka zákona o dani z příjmu přidělující odpisovou skupinu*/
        polozka_odp?: markedValue<number | null>;
        /**typ evidence majetku dle MAJCTEM*/
        tev?: markedValue<number | null>;
        tev_zkr?: markedValue<string | null>;
        /**druh evidence majetku (např. vlastní, nevlastní...) dle MAJCDEM*/
        dev?: markedValue<number | null>;
        dev_zkr?: markedValue<string | null>;
        /**typ maj. karty dle MAJCTYK*/
        tka?: markedValue<number | null>;
        tka_zkr?: markedValue<string | null>;
        /**aktivita karty ( pořízení, evidence, vyřazená ) dle MAJCAKT*/
        mat_akt?: markedValue<number | null>;
        /**kód pohybu vyřazení karty*/
        kod_vyr?: markedValue<number | null>;
        /**kód pohybu pořízení karty*/
        kod_por?: markedValue<number | null>;
        poznamka?: markedValue<string | null>;
        /**příznak tisku etikety s inv. číslem*/
        tisk_eti?: markedValue<number | null>;
        /**příznak odpisu karty (podle režimu odpisu aktuální SKM)*/
        priz_odp?: markedValue<number | null>;
        /**DBCOLUMN:Seznam.dat_zmena*/
        dat_zmena?: markedValue<JsonDate | null>;
        /**DBCOLUMN:Seznam.zmenu_prov_txt*/
        zmenu_prov_txt?: markedValue<string | null>;
        /**identifikace topologie karty - buď NKS nebo EVS (středisko)*/
        id_top?: markedValue<string | null>;
        /**identifikátor pořadí množinové karty pro ZEV = ng_zevMnozPorCis*/
        id_mnoz?: markedValue<number | null>;
        /**materiálové číslo - základní klasifikace majetku dle MAJSCIM*/
        mat_cis?: markedValue<string | null>;
        /**šarže*/
        sarze?: markedValue<string | null>;
        /**způsob evidence karty (šarže, UNQ apod.) dle MAJCZEV*/
        zev?: markedValue<number | null>;
        zev_zkr?: markedValue<string | null>;
        /**datum vypršení záruční lhůty*/
        expirace?: markedValue<JsonDate | null>;
        /**čárový kód*/
        ean?: markedValue<string | null>;
        /**odečet od daně z příjmu (v %PC)*/
        dp_ode?: markedValue<JsonDecimal | null>;
        /**typ DPH dle EKOCDAP*/
        dan_typ?: markedValue<number | null>;
        /**částka DPH*/
        c_dph?: markedValue<JsonDecimal | null>;
        /**celková částka včetně DPH*/
        c_c_dph?: markedValue<JsonDecimal | null>;
        /**způsob využití*/
        kod_vyu?: markedValue<number | null>;
        /**identifikace akce*/
        akce?: markedValue<string | null>;
        /**kód segmentu budovy dle GINSSBU*/
        segment_kod?: markedValue<string | null>;
        /**datum zaúčtování na skupinu účtů 01,02,03*/
        dat_uct_0123?: markedValue<JsonDate | null>;
        /**typ dokladu pořízení karty*/
        typ_dok_por?: markedValue<number | null>;
        /**typ dokladu vyřazení karty*/
        typ_dok_vyr?: markedValue<number | null>;
        /**příznak inventarizace karty*/
        inv_in?: markedValue<number | null>;
        /**stav karty v okamžiku zavedení do DB - měnitelné zařazením do užívání ( pořízení, evidence, vyřazená )*/
        stav_maj?: markedValue<number | null>;
        /**záruční lhůta v měsících*/
        lhuta_zaruka?: markedValue<number | null>;
        /**DBCOLUMN:Seznam.objekt*/
        objekt?: markedValue<string | null>;
        /**DBCOLUMN:Seznam.stat_puvod*/
        stat_puvod?: markedValue<number | null>;
        /**DBCOLUMN:Seznam.stat_puvod_txt*/
        stat_puvod_txt?: markedValue<string | null>;
        /**identifikátor výrobce*/
        ixs_esu_vyr?: markedValue<string | null>;
        /**výrobce*/
        ixs_esu_vyr_txt?: markedValue<string | null>;
        /**identifikátor dodavatele*/
        ixs_esu_dod?: markedValue<string | null>;
        /**dodavatel*/
        ixs_esu_dod_txt?: markedValue<string | null>;
        /**identifikátor servisní organizace*/
        ixs_esu_servis?: markedValue<string | null>;
        /**servisní organizace*/
        ixs_esu_servis_txt?: markedValue<string | null>;
        /**DBCOLUMN:Seznam.typ_maj*/
        typ_maj?: markedValue<string | null>;
        /**DBCOLUMN:Seznam.ktg_zar*/
        ktg_zar?: markedValue<number | null>;
        /**DBCOLUMN:Seznam.ktg_zar_txt*/
        ktg_zar_txt?: markedValue<string | null>;
        /**délka*/
        rozmer_l?: markedValue<JsonDecimal | null>;
        /**šířka*/
        rozmer_w?: markedValue<JsonDecimal | null>;
        /**výška*/
        rozmer_h?: markedValue<JsonDecimal | null>;
        hmotnost?: markedValue<JsonDecimal | null>;
        /**kód stavu při převzetí*/
        prev_stav?: markedValue<number | null>;
        /**stav při převzetí*/
        prev_stav_txt?: markedValue<string | null>;
        mobilita?: markedValue<number | null>;
        mobilita_txt?: markedValue<string | null>;
        /**kód třídy bezpečnosti*/
        trida_bezp?: markedValue<number | null>;
        /**třída bezpečnosti*/
        trida_bezp_txt?: markedValue<string | null>;
        /**kód rizika při poruše*/
        riziko_por?: markedValue<number | null>;
        /**riziko při poruše*/
        riziko_por_txt?: markedValue<string | null>;
        /**hodnota odpočtu DPH*/
        c_dph_odpocet?: markedValue<JsonDecimal | null>;
        /**identifikátor vlastníka*/
        ixs_esu_vla?: markedValue<string | null>;
        /**vlastník*/
        ixs_esu_vla_txt?: markedValue<string | null>;
        /**GPS souřadnice - zeměpisná šířka*/
        gps_sirka?: markedValue<string | null>;
        /**GPS souřadnice - zeměpisná délka*/
        gps_delka?: markedValue<string | null>;
        /**externí lokalizace majetku*/
        ext_1?: markedValue<number | null>;
        /**externí lokalizace majetku*/
        ext_1_txt?: markedValue<string | null>;
        /**externí lokalizace majetku*/
        ext_2?: markedValue<number | null>;
        /**externí lokalizace majetku*/
        ext_2_txt?: markedValue<string | null>;
        /**externí lokalizace majetku*/
        ext_3?: markedValue<number | null>;
        /**externí lokalizace majetku*/
        ext_3_txt?: markedValue<string | null>;
        exists_rpren?: markedValue<number | null>;
        /**identifikátor množinové karty oddělující množinu karet s dočasně sníženou cenou nebo reálně oceněnou pro prodej*/
        id_krt_dev?: markedValue<string | null>;
        /**pořizovací cena karty*/
        c_poriz?: markedValue<JsonDecimal | null>;
        /**pořizovací cena karty*/
        c_dph_poriz?: markedValue<JsonDecimal | null>;
        /**pořizovací cena karty*/
        c_c_dph_poriz?: markedValue<JsonDecimal | null>;
        /**opravná položka karty*/
        c_opr_pol?: markedValue<JsonDecimal | null>;
        /**opravná položka karty*/
        c_dph_opr_pol?: markedValue<JsonDecimal | null>;
        /**opravná položka karty*/
        c_c_dph_opr_pol?: markedValue<JsonDecimal | null>;
        /**reálná cena karty*/
        c_real?: markedValue<JsonDecimal | null>;
        /**reálná cena karty*/
        c_dph_real?: markedValue<JsonDecimal | null>;
        /**reálná cena karty*/
        c_c_dph_real?: markedValue<JsonDecimal | null>;
        /**hodnota dotace/transferu*/
        c_dotace?: markedValue<JsonDecimal | null>;
        /**analytický údaj PAP/POR*/
        ke_pap?: markedValue<string | null>;
        /**analytický údaj PAP/POR*/
        kt_pap?: markedValue<string | null>;
        /**DBCOLUMN:Seznam.id_maj*/
        id_maj?: markedValue<string | null>;
        /**kód kategorie kulturní památky*/
        ktg_kp?: markedValue<number | null>;
        /**katalogové číslo v rejstříku*/
        cis_rejstrik_kp?: markedValue<string | null>;
        /**ID rejstříku*/
        id_rejstrik_kp?: markedValue<string | null>;
        /**datum UUP změny karty*/
        dat_uup?: markedValue<JsonDate | null>;
        /**prodejní cena*/
        cmj_pro1?: markedValue<JsonDecimal | null>;
        /**prodejní cena*/
        cmj_pro2?: markedValue<JsonDecimal | null>;
        /**prodejní cena*/
        cmj_pro3?: markedValue<JsonDecimal | null>;
        /**příznak*/
        s_prodej_skm?: markedValue<number | null>;
        /**příznak*/
        s_prodej_drm?: markedValue<number | null>;
        /**počítané políčko df_pro_r*/
        pro_r?: markedValue<number | null>;
        /**počítané políčko df_pro_m*/
        pro_m?: markedValue<number | null>;
        /**text pro políčko*/
        presnost_odp_txt?: markedValue<string | null>;
        /**nerozp. transfer*/
        c_dotace_ner?: markedValue<JsonDecimal | null>;
        /**DBCOLUMN:Seznam.ser_hst_maj*/
        ser_hst_maj?: markedValue<number | null>;
        /**rozšířený profil budovy*/
        rpb?: markedValue<Gordic.Maj.Interface.GMajsrpbDto | null>;
        /**DBCOLUMN:Seznam.kod_por_txt*/
        kod_por_txt?: markedValue<string | null>;
        /**DBCOLUMN:Seznam.kod_vyr_txt*/
        kod_vyr_txt?: markedValue<string | null>;
        /**odpisové údaje*/
        odp?: markedValue<Gordic.Maj.Interface.GMajOdpisDto | null>;
        /**odpisové údaje*/
        provoz_podm?: markedValue<number[] | null>;
    }
    export class GHistorieKartyJsGrid extends GContentBase<IGHistorieKartyContentValues> implements IGContent {
        uid: "HistorieKarty#";
        markData(): GMarkedMajmajDto[];
        onContentReady(): void;
    }
    export {};
}
declare namespace Gordic.Maj.WebClient {
    export interface IGHistorieOdpKartyCntValues {
        cvDataFound: boolean;
        data: Gordic.Maj.Interface.GMajOdpAllDto[];
        cvCUS708: boolean;
        cvMajOdpDan0Hide: boolean;
    }
    interface markedValue<T> {
        value: T;
        marked: boolean;
    }
    interface GMarkedMajOdpAllDto {
        /**inventární číslo karty*/
        inv_cis?: markedValue<string | null>;
        /**odpisová skupina majetku*/
        skupina_odp_u?: markedValue<string | null>;
        typ_odp_u_txt?: markedValue<string | null>;
        /**vstupní cena odpisu*/
        c_vstup_u?: markedValue<JsonDecimal | null>;
        /**sazba odpisu*/
        c_sazba_odp_u?: markedValue<JsonDecimal | null>;
        saz_koef_txt_u?: markedValue<string | null>;
        /**doba používání majetku*/
        doba_uziti_u?: markedValue<number | null>;
        /**výkon.odpis - částka odpisu související s měřitelnou jednotkou*/
        c_odp_mj_u?: markedValue<JsonDecimal | null>;
        /**oprávka odpisu*/
        c_opr_u?: markedValue<JsonDecimal | null>;
        /**Zůstatková cena*/
        c_zust_u?: markedValue<JsonDecimal | null>;
        /**zbytková hodnota*/
        c_zbytek_u?: markedValue<JsonDecimal | null>;
        /**odpis v aktuálním roce*/
        c_rok_odp_u?: markedValue<JsonDecimal | null>;
        /**poslední odpis*/
        c_last_odp_u?: markedValue<JsonDecimal | null>;
        /**částka aktuální hodnoty poměrné částky odpisu vůči dotaci*/
        c_dotace_odp_u?: markedValue<JsonDecimal | null>;
        /**částka celkové oprávky poměrné částky odpisu vůči dotaci*/
        c_dotace_opr_u?: markedValue<JsonDecimal | null>;
        /**vyskládaný text období z gf_setObd( rokobd_odp_u, mesobd_odp_u )*/
        obd_odp_u?: markedValue<string | null>;
        /**rok počátku odpisu*/
        rok_start_odp_u?: markedValue<number | null>;
        /**rok odpisování*/
        rok_odpisov_u?: markedValue<number | null>;
        /**rok technického zhodnocení*/
        rok_zvys_vc_u?: markedValue<number | null>;
        /**rok odpisování po technickém zhodnocení*/
        rok_odpisov_zvc_u?: markedValue<number | null>;
        /**příznak pozastavení odpisu*/
        stop_odpis_u?: markedValue<number | null>;
        /**počet roků, kdy byl pozastaven odpisu*/
        stop_rok_odp_u?: markedValue<number | null>;
        /**počet roků odpisu ze zvýšené vstupní ceny, kdy byl pozastaven odpisu*/
        stop_rok_odp_zvc_u?: markedValue<number | null>;
        /**pro speciální typy odpisu*/
        pocet_odp_u?: markedValue<number | null>;
        /**pro speciální typy odpisu*/
        presnost_odp_u?: markedValue<number | null>;
        skp_d?: markedValue<string | null>;
        /**odpisová skupina majetku*/
        skupina_odp_d?: markedValue<string | null>;
        typ_odp_d_txt?: markedValue<string | null>;
        /**sazba odpisu*/
        c_sazba_odp_d?: markedValue<JsonDecimal | null>;
        saz_koef_txt_d?: markedValue<string | null>;
        /**vstupní cena odpisu*/
        c_vstup_d?: markedValue<JsonDecimal | null>;
        /**oprávka odpisu*/
        c_opr_d?: markedValue<JsonDecimal | null>;
        /**Zůstatková cena*/
        c_zust_d?: markedValue<JsonDecimal | null>;
        /**zbytková hodnota*/
        c_zbytek_d?: markedValue<JsonDecimal | null>;
        /**odpis v aktuálním roce*/
        c_rok_odp_d?: markedValue<JsonDecimal | null>;
        /**poslední odpis*/
        c_last_odp_d?: markedValue<JsonDecimal | null>;
        /**vyskládaný text období z gf_setObd( rokobd_odp_u, mesobd_odp_u )*/
        obd_odp_d?: markedValue<string | null>;
        /**rok počátku odpisu*/
        rok_start_odp_d?: markedValue<number | null>;
        /**rok odpisování*/
        rok_odpisov_d?: markedValue<number | null>;
        /**rok technického zhodnocení*/
        rok_zvys_vc_d?: markedValue<number | null>;
        /**rok odpisování po technickém zhodnocení*/
        rok_odpisov_zvc_d?: markedValue<number | null>;
        /**příznak pozastavení odpisu*/
        stop_odpis_d?: markedValue<number | null>;
        /**počet roků, kdy byl pozastaven odpisu*/
        stop_rok_odp_d?: markedValue<number | null>;
        /**počet roků odpisu ze zvýšené vstupní ceny, kdy byl pozastaven odpisu*/
        stop_rok_odp_zvc_d?: markedValue<number | null>;
        /**pro speciální typy odpisu*/
        pocet_odp_d?: markedValue<number | null>;
        /**pro speciální typy odpisu*/
        presnost_odp_d?: markedValue<number | null>;
        dat_zmena?: markedValue<JsonDate | null>;
        zmenu_prov?: markedValue<string | null>;
        zmenu_prov_txt?: markedValue<string | null>;
        ixs_maj?: markedValue<string | null>;
        /**pro speciální typy odpisu*/
        ser_hst_odp?: markedValue<number | null>;
        /**typ odpisu*/
        typ_odp_u?: markedValue<number | null>;
        /**příznak sazby nebo koef. (10=sazba. 20=koef)*/
        saz_koef_u?: markedValue<number | null>;
        /**typ odpisu - jemnější členění PK*/
        rok_start_typ_u?: markedValue<number | null>;
        /**Období odpisu (rok)*/
        rokobd_odp_u?: markedValue<number | null>;
        /**Období odpisu (měsíc)*/
        mesobd_odp_u?: markedValue<number | null>;
        /**typ odpisu*/
        typ_odp_d?: markedValue<number | null>;
        /**příznak sazby nebo koef. (10=sazba. 20=koef)*/
        saz_koef_d?: markedValue<number | null>;
        /**typ odpisu - jemnější členění PK*/
        rok_start_typ_d?: markedValue<number | null>;
        /**Období odpisu (rok)*/
        rokobd_odp_d?: markedValue<number | null>;
        /**Období odpisu (měsíc)*/
        mesobd_odp_d?: markedValue<number | null>;
        /** Ostrý odpis znamená hodnota 1*/
        ostry_odpis?: markedValue<number | null>;
    }
    export class GHistorieOdpGrid extends GContentBase<IGHistorieOdpKartyCntValues> implements IGContent {
        markData(): GMarkedMajOdpAllDto[];
        onContentReady(): void;
    }
    export {};
}
declare namespace Gordic.Maj.WebClient {
    interface GKartyJsGridContentValues {
        cvColSkupTitle: string;
        cvColSkupHide: boolean;
        cvColDrhTitle: string;
        cvColDrhHide: boolean;
        cvColDevTitle: string;
        cvColDevHide: boolean;
        cvColTkaTitle: string;
        cvColTkaHide: boolean;
        cvColTevTitle: string;
        cvColTevHide: boolean;
        cvColInvCisTitle: string;
        cvColInvCisHide: boolean;
        cvColMatCisTitle: string;
        cvColMatCisHide: boolean;
        cvColSkpTitle: string;
        cvColSkpHide: boolean;
        cvColNazevTitle: string;
        cvColNazevHide: boolean;
        cvColUeabEviTitle: string;
        cvColUeabEviHide: boolean;
        cvColPmjTitle: string;
        cvColPmjHide: boolean;
        cvColCTitle: string;
        cvColCHide: boolean;
        cvColCMjTitle: string;
        cvColCMjHide: boolean;
        cvColPmjMinTitle: string;
        cvColPMjMinHide: boolean;
        cvColPmjMaxTitle: string;
        cvColPMjMaxHide: boolean;
        cvColPmjResTitle: string;
        cvColPMjResHide: boolean;
        cvColUeabPorTitle: string;
        cvColUeabPorHide: boolean;
        cvColUeabOprTitle: string;
        cvColUeabOprHide: boolean;
        cvColDatPorTitle: string;
        cvColDatPorHide: boolean;
        cvColDatZarTitle: string;
        cvColDatZarHide: boolean;
        cvColDatVyrTitle: string;
        cvColDatVyrHide: boolean;
        cvColDatUctTitle: string;
        cvColDatUctHide: boolean;
        cvColMjTitle: string;
        cvColMjHide: boolean;
        cvColRokVyrTitle: string;
        cvColRokVyrHide: boolean;
        cvColTridaTitle: string;
        cvColTridaHide: boolean;
        cvColEviCisTitle: string;
        cvColEviCisHide: boolean;
        cvColVyrCisTitle: string;
        cvColVyrCisHide: boolean;
        cvColSerCisTitle: string;
        cvColSerCisHide: boolean;
        cvColSarzeTitle: string;
        cvColSarzeHide: boolean;
        cvColNazevSkpTitle: string;
        cvColNazevSkpHide: boolean;
        cvColNksTitle: string;
        cvColNksHide: boolean;
        cvColIxsOrjTitle: string;
        cvColIxsOrjHide: boolean;
        cvColStrediskoTitle: string;
        cvColStrediskoHide: boolean;
        cvColBudovaKodTitle: string;
        cvColBudovaKodHide: boolean;
        cvColSegmentKodTitle: string;
        cvColSegmentKodHide: boolean;
        cvColMistnostKodTitle: string;
        cvColMistnostKodHide: boolean;
        cvColJmenoSouborTitle: string;
        cvColJmenoSouborHide: boolean;
        cvColInvCisSoubTitle: string;
        cvColInvCisSoubHide: boolean;
        cvColIxsRefTitle: string;
        cvColIxsRefHide: boolean;
        cvColKodPorTitle: string;
        cvColKodPorHide: boolean;
        cvColKodVyrTitle: string;
        cvColKodVyrHide: boolean;
        cvColExpiraceTitle: string;
        cvColExpiraceHide: boolean;
        cvColEANTitle: string;
        cvColEANHide: boolean;
        cvColKodVyuTitle: string;
        cvColKodVyuHide: boolean;
        cvColAkceTitle: string;
        cvColAkceHide: boolean;
        cvColDpOdeTitle: string;
        cvColDpOdeHide: boolean;
        cvColDanTypTitle: string;
        cvColDanTypHide: boolean;
        cvColCDphTitle: string;
        cvColCDphHide: boolean;
        cvColCDphOdpocetTitle: string;
        cvColCDphOdpocetHide: boolean;
        cvColCcDphTitle: string;
        cvColCcDphHide: boolean;
        cvColDatZmenaTitle: string;
        cvColDatZmenaHide: boolean;
        cvColLhutaZarukaTitle: string;
        cvColLhutaZarukaHide: boolean;
        cvColObjektTitle: string;
        cvColObjektHide: boolean;
        cvColStatPuvodTxtTitle: string;
        cvColStatPuvodTxtHide: boolean;
        cvColIxsEsuVyrTitle: string;
        cvColIxsEsuVyrHide: boolean;
        cvColIxsEsuDodTitle: string;
        cvColIxsEsuDodHide: boolean;
        cvColIxsEsuServisTitle: string;
        cvColIxsEsuServisHide: boolean;
        cvColTypMajTitle: string;
        cvColTypMajHide: boolean;
        cvColKtgZarTitle: string;
        cvColKtgZarHide: boolean;
        cvColDelkaTitle: string;
        cvColDelkaHide: boolean;
        cvColSirkaTitle: string;
        cvColSirkaHide: boolean;
        cvColVyskaTitle: string;
        cvColVyskaHide: boolean;
        cvColHmotnostTitle: string;
        cvColHmotnostHide: boolean;
        cvColPrevStavTitle: string;
        cvColPrevStavHide: boolean;
        cvColMobilitaTitle: string;
        cvColMobilitaHide: boolean;
        cvColRizikoPorTitle: string;
        cvColRizikoPorHide: boolean;
        cvColTridaBezpTitle: string;
        cvColTridaBezpHide: boolean;
        cvColIxsEsuVlaTitle: string;
        cvColIxsEsuVlaHide: boolean;
        cvColExt1Title: string;
        cvColExt1Hide: boolean;
        cvColExt2Title: string;
        cvColExt2Hide: boolean;
        cvColExt3Title: string;
        cvColExt3Hide: boolean;
        cvColGpsSirkaTitle: string;
        cvColGpsSirkaHide: boolean;
        cvColGpsDelkaTitle: string;
        cvColGpsDelkaHide: boolean;
        cvColCPorizTitle: string;
        cvColCPorizHide: boolean;
        cvColCOprPolTitle: string;
        cvColCOprPolHide: boolean;
        cvColCRealTitle: string;
        cvColCRealHide: boolean;
        cvColCDotaceTitle: string;
        cvColCDotaceHide: boolean;
        cvColCmjPro1Title: string;
        cvColCmjPro1Hide: boolean;
        cvColCmjPro2Title: string;
        cvColCmjPro2Hide: boolean;
        cvColCmjPro3Title: string;
        cvColCmjPro3Hide: boolean;
        cvColKePapTitle: string;
        cvColKePapHide: boolean;
        cvColIdMajTitle: string;
        cvColIdMajHide: boolean;
        cvColKtgKpTitle: string;
        cvColKtgKpHide: boolean;
        cvColCisRKpTitle: string;
        cvColCisRKpHide: boolean;
        cvColIdRKpTitle: string;
        cvColIdRKpHide: boolean;
        cvMajOdpUcet10Hide: boolean;
        cvMajOdpUcet0Hide: boolean;
        cvMajOdpDan0Hide: boolean;
        cvRenHide: boolean;
        cvActKartaEnabled: boolean;
        data: Gordic.Maj.Interface.GMajmajDto[];
    }
    export class GKartyJsGrid extends GContentBase<GKartyJsGridContentValues> implements IGContent {
        uid: "KartyGrid#";
        onContentReady(): void;
    }
    export {};
}
declare namespace Gordic.Maj.WebClient {
    interface GPohybyJsGridContentValues {
        cvActKartaEnabled: boolean;
        cvActDokladEnabled: boolean;
        data: Gordic.Maj.Interface.GPohybyMajDokladuDto[];
        tblPepItemInvCis: GGuptaTblColumn;
        tblPepItemMatCis: GGuptaTblColumn;
        tblPepItemUeabEvi: GGuptaTblColumn;
        tblPolItemSkp: GGuptaTblColumn;
        tblPolItemMj: GGuptaTblColumn;
        tblPolItemUeabPor: GGuptaTblColumn;
        tblPolItemUeabOpr: GGuptaTblColumn;
        tblPolItemNazev: GGuptaTblColumn;
        cvMajInitIdTop: string;
        cvColNsExtTitle: string;
        HideCiziMena: boolean;
        cvDphPlatce: number;
    }
    export class GPohybyJsGrid extends GContentBase<GPohybyJsGridContentValues> implements IGContent {
        private tblTable;
        private tblMode;
        onContentReady(): void;
    }
    export {};
}
declare namespace Gordic.Maj.WebClient {
    interface GPohybyJsGridContentValues {
        data: Gordic.Maj.Interface.GMajxpocDto[];
        cvColSkupinaTitle: string;
        cvColSkupinaHide: boolean;
        cvColDrhHide: boolean;
        cvColDrhTitle: string;
        cvColInvCisTitle: string;
        cvColInvCisHide: boolean;
        cvColSkpTitle: string;
        cvColSkpHide: boolean;
        cvColUeabEviTitle: string;
        cvColUeabEviHide: boolean;
        cvColMjTitle: string;
        cvColMjHide: boolean;
        cvColNazevSkpTitle: string;
        cvColNazevSkpHide: boolean;
        cvColNazevTitle: string;
        cvColNazevHide: boolean;
        cvColVyrCisTitle: string;
        cvColVyrCisHide: boolean;
        cvColEviCisTitle: string;
        cvColEviCisHide: boolean;
        cvColDatPorTitle: string;
        cvColDatPorHide: boolean;
        cvColRokVyrTitle: string;
        cvColRokVyrHide: boolean;
    }
    export class GPolozkyVPrevodu extends GContentBase<GPohybyJsGridContentValues> implements IGContent {
        uid: "PolozkyX#";
        onContentReady(): void;
    }
    export {};
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    class GProdejniPrirazky extends GContentBase implements IGClientContent {
        private prizVyberPri;
        private ixp;
        private prizJenAktivni;
        private grid;
        private view;
        uid: string;
        prepareContent(params: any): void;
        loadData(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGProtokolOdpCntValues {
        cvRezimEnabled: boolean;
        cvKumulovaneEnabled: boolean;
        cvIdTopTitle: string;
        argRezim: number;
        argIkc: number;
        data: Gordic.Maj.Interface.GMajmajDto[];
        argDruhOdp: number;
        argObdobiOdp: string;
        IxpOdp: string;
    }
    class GProtokolOdpisu extends GContentBase<IGProtokolOdpCntValues> implements IGContent {
        uid: "ProtokolOdp#";
        private filter;
        private $grid;
        private bJenVlastniNks;
        private bVcetnePrvku;
        private bKumulovane;
        private bZaVeskeryMaj;
        onContentReady(): void;
        private createFilterForm;
        private loadData;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GProvedeneOdpisy extends GContentBase implements IGClientContent {
        title: string;
        private dev;
        private druhOdp;
        private grid;
        private view;
        private funTyp;
        prepareContent(params: any): void;
        loadData(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
        showProtokol(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GReservaceMaj extends GContentBase<{
        data: Gordic.Maj.Interface.GMajsresDto[];
    }> implements IGContent {
        uid: "Reservace#";
        onContentReady(): void;
    }
}
declare namespace Gordic.Maj.WebClient.Dialogs {
    class GTransferCasGrid extends GContentBase implements IGClientContent {
        private invCis;
        private grid;
        private view;
        uid: string;
        prepareContent(params: any): void;
        loadData(): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGUctOsnovaDrmContentValues {
        data: Gordic.Maj.Interface.GMajvdroDto[];
    }
    class GUctOsnovaDrM extends GContentBase<IGUctOsnovaDrmContentValues> implements IGContent {
        zaznam: Maj.Interface.GMajvdroDto;
        onContentReady(): void;
        okClicked(): void;
        closing(returnValue?: any): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGVariantyCfuKartyContentValues {
        data: Gordic.Maj.Interface.GMajmajDto[];
        MAJ_RAD_TLSDVPK: boolean;
    }
    class GVariantyCfuKarty extends GContentBase<IGVariantyCfuKartyContentValues> implements IGContent {
        title: "jres:24534720";
        private ixsCfuChanged;
        onContentReady(): void;
        closing(returnValue?: any): JQuery.Promise<any, any, any>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GHistorieParametruOdpisu extends GContentBase implements /*IGContent*/ IGClientContent {
        uid: "GHistorieParametruOdpisu#";
        Grid: JQuery;
        view_ISL: Gordic.Isl.View<Interface.GMajhsodDto>;
        druh_odp: number;
        prepareContent(): void;
        createGrid(): void;
        createGridFormat(): Data.GridFormat<Interface.GMajspohDto>;
        /**
     * default commandbar builder function
     * @returns {MenuParams[]} pole akci - vyber / zrusit
     */
        defaultCommandBar(): MenuParams[];
    }
}
declare namespace Gordic.Maj.WebClient {
    class GHledaniMajKarty extends GContentBase<{}> implements IGClientContent {
        uid: "HledaniKarty#";
        srv: GContent;
        prepareContent(args: any): void;
        loadData($grid: any, filterModel: any): void;
        private showKarta;
        private noSelectionWarning;
    }
}
declare namespace Gordic.Maj.WebClient {
    type GMajFilterType = {
        -readonly [T in keyof typeof Gordic.Maj.Interface.FilterMajmaj]?: any;
    };
    interface GKartotekaMajetkuContentValues {
        cvMajInitEVS: string;
        cvMajInitIdTop: string;
        argRezim: number;
        argTitle: string;
        argSetFiltr: DTO.GMajFiltrRecDto;
        argPrizVydejTzh: number;
        cvIdTop: string;
        cvMajResHide: true;
        cvEkoIco: string;
        cvEkoRok: string;
        cvIxsVue: string;
        cvEkoUcs: string;
        cvEkoNks: string;
        cvEkoInitFunTyp: string;
        MAJ_RAD_DINKS: number;
        ADM_GINSTRE_TYP: number;
        majctms: Gordic.Maj.Interface.GUniversalDialDto[];
        majczev: Gordic.Maj.Interface.GMajczevDto[];
        majctyk: Gordic.Maj.Interface.GMajctykDto[];
        nabSoubory: Gordic.Maj.Interface.GVyberJmenaSouboruDto[];
        ekocktl: Gordic.Maj.Interface.GEkocktlDto[];
        majctyz: Gordic.Maj.Interface.GMajctyzDto[];
        majcakt: Gordic.Maj.Interface.GMajcaktDto[];
        filterDto: GMajFilterType;
        cvMajOdpUcet10Hide: true;
        cvMajOdpUcet0Hide: true;
        cvMajOdpDan0Hide: true;
        cvRenHide: true;
        cvFilterEkoParamsLocked: boolean;
        cvFilterTevLocked: boolean;
        cvFilterDevLocked: boolean;
        cvFilterZevLocked: boolean;
        cvFilterTkaLocked: boolean;
        cvFilterResLocked: boolean;
    }
    export interface GKartotekaColNames {
        cvColSkupTitle: string;
        cvColSkupHide: boolean;
        /**druh - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColDrhTitle: string;
        cvColDrhHide: boolean;
        /**DEV - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColDevTitle: string;
        cvColDevHide: boolean;
        /**TKA - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColTkaTitle: string;
        cvColTkaHide: boolean;
        /**TEV - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColTevTitle: string;
        cvColTevHide: boolean;
        /**inv.č.  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColInvCisTitle: string;
        cvColInvCisHide: boolean;
        /**mat.č.  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColMatCisTitle: string;
        cvColMatCisHide: boolean;
        /**SKP -  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColSkpTitle: string;
        cvColSkpHide: boolean;
        /**název -  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColNazevTitle: string;
        cvColNazevHide: boolean;
        /**SU-AU evi  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColUeabEviTitle: string;
        cvColUeabEviHide: boolean;
        /**PMJ  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColPmjTitle: string;
        cvColPmjHide: boolean;
        /**C  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCTitle: string;
        cvColCHide: boolean;
        /**CMJ  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCMjTitle: string;
        cvColCMjHide: boolean;
        /**PMJ-MAX  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColPmjMaxTitle: string;
        cvColPmjMaxHide: boolean;
        /**PMJ-MIN  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColPmjMinTitle: string;
        cvColPmjMinHide: boolean;
        /**PMJ-RES  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColPmjResTitle: string;
        cvColPmjResHide: boolean;
        /**SU-AU por  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColUeabPorTitle: string;
        cvColUeabPorHide: boolean;
        /**SU-AU opr  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColUeabOprTitle: string;
        cvColUeabOprHide: boolean;
        /**Dat.pořízení  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColDatPorTitle: string;
        cvColDatPorHide: boolean;
        /**Dat.zařaz.  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColDatZarTitle: string;
        cvColDatZarHide: boolean;
        /**Dat.vyřaz.  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColDatVyrTitle: string;
        cvColDatVyrHide: boolean;
        /**Dat.uct  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColDatUctTitle: string;
        cvColDatUctHide: boolean;
        /**MJ -  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColMjTitle: string;
        cvColMjHide: boolean;
        /**rok výroby -  ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColRokVyrTitle: string;
        cvColRokVyrHide: boolean;
        /**Třída - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColTridaTitle: string;
        cvColTridaHide: boolean;
        /**Ev.č. - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColEviCisTitle: string;
        cvColEviCisHide: boolean;
        /**Výr.č. - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColVyrCisTitle: string;
        cvColVyrCisHide: boolean;
        /**Sér.č. - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColSerCisTitle: string;
        cvColSerCisHide: boolean;
        /**Šarže - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColSarzeTitle: string;
        cvColSarzeHide: boolean;
        /**Název SKP - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColNazevSkpTitle: string;
        cvColNazevSkpHide: boolean;
        /**NKS - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColNksTitle: string;
        cvColNksHide: boolean;
        /**Referát - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColIxsOrjTitle: string;
        cvColIxsOrjHide: boolean;
        /**Středisko - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColStrediskoTitle: string;
        cvColStrediskoHide: boolean;
        /**Budova - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColBudovaKodTitle: string;
        cvColBudovaKodHide: boolean;
        /**Místnost - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColMistnostKodTitle: string;
        cvColMistnostKodHide: boolean;
        /**Odp.pracovník - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColIxsRefTitle: string;
        cvColIxsRefHide: boolean;
        /**Jméno souboru - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColJmenoSouborTitle: string;
        cvColJmenoSouborHide: boolean;
        /**inv.č.souboru - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColInvCisSoubTitle: string;
        cvColInvCisSoubHide: boolean;
        /**Poznámka - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColPoznTitle: string;
        cvColPoznHide: boolean;
        /**Kód pořízení - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColKodPorTitle: string;
        cvColKodPorHide: boolean;
        /**Kód vyřazení - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColKodVyrTitle: string;
        cvColKodVyrHide: boolean;
        /**Datum expirace - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColExpiraceTitle: string;
        cvColExpiraceHide: boolean;
        /**EAN - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColEANTitle: string;
        cvColEANHide: boolean;
        /**Způsob využití - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColKodVyuTitle: string;
        cvColKodVyuHide: boolean;
        /**Datum expirace - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColAkceTitle: string;
        cvColAkceHide: boolean;
        /**Odečet z DP - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColDpOdeTitle: string;
        cvColDpOdeHide: boolean;
        /**Typ DPH - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColDanTypTitle: string;
        cvColDanTypHide: boolean;
        /**DPH - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCDphTitle: string;
        cvColCDphHide: boolean;
        /**Odpočet z DPH - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCDphOdpocetTitle: string;
        cvColCDphOdpocetHide: boolean;
        /**Cena s DPH - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCcDphTitle: string;
        cvColCcDphHide: boolean;
        /**Datum změny - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColDatZmenaTitle: string;
        cvColDatZmenaHide: boolean;
        /**Segment - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColSegmentKodTitle: string;
        cvColSegmentKodHide: boolean;
        /**Zár. lhůta - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColLhutaZarukaTitle: string;
        cvColLhutaZarukaHide: boolean;
        /**Objekt - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColObjektTitle: string;
        cvColObjektHide: boolean;
        /**Země původu - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColStatPuvodTitle: string;
        cvColStatPuvodHide: boolean;
        /**Výrobce (ESU) - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColIxsEsuVyrTitle: string;
        cvColIxsEsuVyrHide: boolean;
        /**Dodavatel (ESU) - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColIxsEsuDodTitle: string;
        cvColIxsEsuDodHide: boolean;
        /**Servis (ESU) - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColIxsEsuServisTitle: string;
        cvColIxsEsuServisHide: boolean;
        /**Typ výrobku - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColTypMajTitle: string;
        cvColTypMajHide: boolean;
        /**Kategorie zařízení - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColKtgZarTitle: string;
        cvColKtgZarHide: boolean;
        /**Délka - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColDelkaTitle: string;
        cvColDelkaHide: boolean;
        /**Šířka - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColSirkaTitle: string;
        cvColSirkaHide: boolean;
        /**Výška - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColVyskaTitle: string;
        cvColVyskaHide: boolean;
        /**Hmotnost - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColHmotnostTitle: string;
        cvColHmotnostHide: boolean;
        /**Stav při převzetí  - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColPrevStavTitle: string;
        cvColPrevStavHide: boolean;
        /**Mobilita - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColMobilitaTitle: string;
        cvColMobilitaHide: boolean;
        /**Riziko při poruše - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( )*/
        cvColRizikoPorTitle: string;
        cvColRizikoPorHide: boolean;
        /**Třída bezpečnosti - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColTridaBezpTitle: string;
        cvColTridaBezpHide: boolean;
        /** Vlastník - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColIxsEsuVlaTitle: string;
        cvColIxsEsuVlaHide: boolean;
        /** Externí lokace 1 - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColExt1Title: string;
        cvColExt1Hide: boolean;
        /** Externí lokace 2 - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColExt2Title: string;
        cvColExt2Hide: boolean;
        /** Externí lokace 3 - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColExt3Title: string;
        cvColExt3Hide: boolean;
        /** Zeměpisná š. - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColGpsSirkaTitle: string;
        cvColGpsSirkaHide: boolean;
        /** Zeměpisná d. - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColGpsDelkaTitle: string;
        cvColGpsDelkaHide: boolean;
        /** Pořizovací cena - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCPorizTitle: string;
        cvColCPorizHide: boolean;
        /** Cena opravné položky - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCOprPolTitle: string;
        cvColCOprPolHide: boolean;
        /** Reálná cena - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCRealTitle: string;
        cvColCRealHide: boolean;
        /** Vlastník - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCDotaceTitle: string;
        cvColCDotaceHide: boolean;
        /** Prodejní cena 1 - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCmjPro1Title: string;
        cvColCmjPro1Hide: boolean;
        /** Prodejní cena 2 - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCmjPro2Title: string;
        cvColCmjPro2Hide: boolean;
        /** Prodejní cena 3 - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCmjPro3Title: string;
        cvColCmjPro3Hide: boolean;
        /** Analytika PAP - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColKePapTitle: string;
        cvColKePapHide: boolean;
        /** Identifikátor majetku - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColIdMajTitle: string;
        cvColIdMajHide: boolean;
        /** Typ kulturní památky - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColKtgKpTitle: string;
        cvColKtgKpHide: boolean;
        /**Číslo v rejstříku KP - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColCisRKpTitle: string;
        cvColCisRKpHide: boolean;
        /** ID v rejstříku KP - ctbl_MajMaj.xxxx.SAM_Create( ) + ccol_ItemNoEdit.SAM_Create( ) */
        cvColIdRKpTitle: string;
        cvColIdRKpHide: boolean;
    }
    export interface GHromadneZmenyInterface {
        $grid: JQuery;
        view: Isl.View<any>;
        cnt: GContent;
        PrimaryKey: string;
        cvEkoIco: string;
        cvEkoUcs: string;
        cvEkoNks: string;
        matAktPuvodni: any;
        zadosti: Maj.Interface.GMajsiabDto[];
    }
    export class GKartotekaMajetku extends GContentBase<WebClient.MajGrid.IGStandardMajGrid<Maj.Interface.GMajmajDto, Interface.GMajKartaSeznamPermission> & Gordic.Eko.Utils.IGEkoBookExtension & GKartotekaMajetkuContentValues & GHromadneZmenyInterface & GKartotekaColNames> implements IGContent {
        uid: "Kartoteka#";
        kartotekaManager: KartotekaManager;
        /**
         * Jmeno tridy gridu
         */
        onContentReady(): void;
        closing(returnValue?: any): JQuery.Promise<any, any, any>;
        private loadData;
        private getMenuActions;
        private noSelectionWarning;
        private lockFilterPanel;
    }
    export {};
}
declare namespace Gordic.Maj.WebClient {
    /**
     *
     * @param content
     * @param ixs_maj pid karty
     * @param majpolrec položka - slouží k přenosu dat
     * @param samostaneOkno zda má být zobrazeno v samostatném okně nebo v breadcrump
     * @param argmode režim okna
     * @param grid
     * @param objekt
     * @returns
     */
    function ZobrazMajKarta(content: GContent, ixs_maj: null | string, majpolrec: Gordic.Maj.Interface.GMajMajPolDto, argmode: number, samostaneOkno?: boolean, grid?: JQuery<HTMLElement> | undefined, objekt?: string): JQuery<HTMLElement>;
    function changeDrhId(opts: formIDsOptions, rezim: any, myVal: any): void;
    function jsTryDrhIdGenInvCis(opts: formIDsOptions, myVal: any): void;
    function setInvCisMax(opts: formIDsOptions, rezim_por_p: number): void;
    function jsChangeIdMnozKrt(opts: formIDsOptions, ixsMaj: any): void;
    function setMatCis(opts: formIDsOptions, arg: any): void;
    function jsSetVisibleTka(opts: formIDsOptions): void;
    function checkTypOdp(opts: formIDsOptions, bUcetni: boolean, def_odp: number | null): boolean;
    function setDobaUziti(opts: formIDsOptions): void;
    function nulovaniCen(opts: formIDsOptions): void;
    function validateDatUup(opts: formIDsOptions, element: any, value: any): false | undefined;
    function HZOptionsString(argMode: number, edit: boolean | null | undefined, extendOptions?: any): any;
    function HZOptionsNumber(argMode: number, edit: boolean | null | undefined, extendOptions?: any): any;
    function HZOptionsDate(argMode: number, edit: boolean | null | undefined, extendOptions?: any): any;
    function HZOptionsSelect(argMode: number, edit: boolean | null | undefined, extendOptions?: any): any;
    function HZOptions2(argMode: number, edit: boolean | null | undefined, type: "string" | "number" | "date" | "select", extendOptions?: any): any;
    function modelValueTransformCollectSelectbox(field: any, value: any, model: any, keyType: "string" | "number" | "decimal"): any;
    function modelValueTransformCollect(field: any, value: any, valueType: "string" | "number" | "decimal"): any;
}
declare namespace Gordic.Maj.WebClient {
    class GMajObchodniMajetek extends GContentBase implements IGContent {
        DetailDto: Interface.GMajsobmDto;
        private view_ISL;
        private Grid;
        onContentReady(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GMajObchodniMajetekDetail extends GContentBase implements IGContent {
        title: "Popis obchodního majetku";
        DetailDto: Gordic.Maj.Interface.GMajsobmDto;
        mode_p: number;
        karty: Gordic.Maj.Interface.GMajKartaInfoDto[];
        onContentReady(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGMajOdpisCntContentValues {
        cvDebug: boolean;
        cvEkoNS: string;
        cvEkoRok: number;
        cvEkoIco: string;
        cvEkoRokKnihy: number;
        cvEkoIxpDen: string;
        cvEkoSubrada: number;
        cvEkoLogPorCislo: number;
        cvPovolenOdpU: boolean;
        cvPovolenOdpD: boolean;
        cvMajsodU: Gordic.Maj.Interface.GMajsodDto;
        cvMajsodD: Gordic.Maj.Interface.GMajsodDto;
        MAJ_RAD_ODPRUNU: number;
        MAJ_RAD_ODPRUND: number;
        cvLogPorCislo: number;
    }
    class GMajOdpisContent extends GContentBase<IGMajOdpisCntContentValues> implements IGContent {
        title: "Odpis dlouhodobého majetku";
        private hasChanged;
        private arrChangedRows;
        private druhOdp;
        private bAfterOdp;
        private myGrid;
        private lastOdpDefs;
        private lastProtocolActionTt;
        private protocolActionTt;
        private arrUsedIkcs;
        private actOK;
        private bDatUupRequired;
        private bKodPohRequired;
        private sIntervalOdpText;
        private datZdanByUser;
        private typDok;
        private majsod;
        private myDatZdan;
        private majsodPosledniOstryU;
        private majsodPosledniOstryD;
        private majdsodPosledniOstry;
        private myDatZdanPlan;
        private odpisStartDto;
        onContentReady(): void;
        private spoctiDatZdan;
        private getMaxDayInMonth;
        private kontrolaOdpisu;
        private provedeniOdpisu;
        private showTmpProtocol;
        private checkIntervalOdp;
        setOrcloseExpertMode(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGMajOdpisCntContentValues {
        cvDebug: boolean;
        cvEkoNS: string;
        cvEkoRok: number;
        cvEkoIco: string;
        cvEkoRokKnihy: number;
        cvEkoIxpDen: string;
        cvEkoSubrada: number;
        cvEkoLogPorCislo: number;
        cvPovolenOdpU: boolean;
        cvPovolenOdpD: boolean;
        cvMajsodU: Gordic.Maj.Interface.GMajsodDto;
        cvMajsodD: Gordic.Maj.Interface.GMajsodDto;
        MAJ_RAD_ODPRUNU: number;
        MAJ_RAD_ODPRUND: number;
        MAJ_RAD_ODPRUN: number;
        MAJ_RAD_ODPSETP: number;
        cvLogPorCislo: number;
    }
    class GParametryOdpisu extends GContentBase<IGMajOdpisCntContentValues> implements IGContent {
        private druhOdp;
        private myGrid;
        private DetailDto;
        private majsodPosledniOstryU;
        private majsodPosledniOstryD;
        private majdsodPosledniOstry;
        private cvCUS708;
        private exist_ostry_odpis_uj_ucetni;
        private exist_ostry_odpis_ucetni;
        private exist_ostry_odpis_danovy;
        onContentReady(): void;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGVlastnostiKartyContentValues {
        data: Gordic.Maj.Interface.GMajmajDto[];
        MAJ_RAD_TLSDVPK: boolean;
        variantaTitle: string;
        ixsCfu: string;
    }
    class GVlastnostiKarty extends GContentBase<IGVlastnostiKartyContentValues> implements IGContent {
        title: "jres:24534719";
        private hasChanged;
        private actSave;
        private arrChangedRows;
        onContentReady(): void;
        setBreadcrumb(): void;
        closing(returnValue?: any): JQueryPromise<any>;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGDefDto {
        df_drh_id: Client.GGuptaDbBox;
        cvModMode: number;
        cvDebug: boolean;
        MAJ_ICO_FILL_KR: boolean;
        MAJ_ICO_MODPIS: boolean;
        cvAppLevelKrt: boolean;
        cvMajInitModeOdpSkp: number;
        cvMajInitRezimEVS: boolean;
        cvMajInitEVS: string;
        cvUeabNull?: string | null;
        cvIxsVue: string;
        MAJ_ZAV_INV_CIS?: number | null;
        cvLocKrfFillInvCis: string;
        cvTestDuplInvCis: boolean;
        MAJ_ICO_GEN_INV: boolean;
        MAJ_ICO_FRM_INV: boolean;
        MAJ_CIS_INVCDFL: number;
        MAJ_RAD_POLCMJ: boolean;
        MAJ_RAD_CHSKPMC: boolean;
        MAJ_RAD_KRTEDIT: number;
        MAJ_RAD_DINKS: number;
        MAJ_RAD_TOPMMB: boolean;
        df_mat_cis: Client.GGuptaKrtDbBox;
        df_inv_cis: Client.GGuptaKrtDbBox;
        df_id_maj: Client.GGuptaKrtDbBox;
        df_dat_zar: Client.GGuptaKrtDbBox;
        cvMajInitSkmTypL: number;
        df_evi_cis: Client.GGuptaKrtDbBox;
        MAJ_RAD_SREZEC: number;
        df_sarze: Client.GGuptaKrtDbBox;
        df_vyr_cis: Client.GGuptaKrtDbBox;
        df_ser_cis: Client.GGuptaKrtDbBox;
        df_ean: Client.GGuptaKrtDbBox;
        cvMajInitSkmUnqL: boolean;
        cvEkoNks: string;
        cvEkoUcs: string;
        cvEkoIco: string;
        cvEkocdap: Gordic.Data.Readers.EkocdapDto[];
        df_skp: Client.GGuptaKrtDbBox;
        ml_nazev_skp: Client.GGuptaKrtDbBox;
        ml_nazev: Client.GGuptaKrtDbBox;
        df_mj: Client.GGuptaKrtDbBox;
        cmb_dan_typ: Client.GGuptaKrtDbBox;
        cvLblIdTop: string;
        df_nks: Client.GGuptaKrtDbBox;
        df_dat_por: Client.GGuptaKrtDbBox;
        cvSkupinaTypDm?: number | null;
        df_jmeno_soubor: Client.GGuptaKrtDbBox;
        cmb_tka: Client.GGuptaDbBox;
        df_poznamka: Client.GGuptaKrtDbBox;
        df_dat_vyr: Client.GGuptaKrtDbBox;
        df_dat_uup: Client.GGuptaKrtDbBox;
        df_dat_uct_0123: Client.GGuptaKrtDbBox;
        df_ueab_por: Client.GGuptaKrtDbBox;
        cvUeaPor: string;
        cvUebPor: string;
        cvUebEvi: string;
        cvUeaEvi: string;
        df_ueab_evi: Client.GGuptaKrtDbBox;
        df_ueab_opr: Client.GGuptaKrtDbBox;
        cvUeaOpr: string;
        cvUebOpr: string;
        cvUeaOpp: string;
        df_ke_pap: Client.GGuptaKrtDbBox;
        df_cmj_pro3: Client.GGuptaKrtDbBox;
        df_cmj_pro2: Client.GGuptaKrtDbBox;
        df_cmj_pro1: Client.GGuptaKrtDbBox;
        df_c_c_dph: Client.GGuptaKrtDbBox;
        df_c_dph_odpocet: Client.GGuptaKrtDbBox;
        cvMajPlatceDph?: number | null;
        cvEkoPlatceDph?: number | null;
        cvTypInst: number;
        df_c_dph: Client.GGuptaKrtDbBox;
        df_pmj_max: Client.GGuptaKrtDbBox;
        df_pmj_min: Client.GGuptaKrtDbBox;
        df_c_dotace: Client.GGuptaKrtDbBox;
        df_c_opr_pol: Client.GGuptaKrtDbBox;
        df_c_real: Client.GGuptaKrtDbBox;
        df_cmj: Client.GGuptaKrtDbBox;
        df_pmj: Client.GGuptaKrtDbBox;
        df_c_poriz: Client.GGuptaKrtDbBox;
        df_c: Client.GGuptaKrtDbBox;
        df_kod_vyr: Client.GGuptaKrtDbBox;
        df_kod_por: Client.GGuptaKrtDbBox;
        df_akce: Client.GGuptaKrtDbBox;
        majbuff: Interface.GMajmajDto;
        MAJ_DOK_PRIUUP: boolean;
        MAJ_DOK_PRIUUPM: boolean;
        MAJ_FUN_PRISTUP: string;
        cvEkoRokDen: number;
        cvCurrent: any;
        cvEkoRok: number;
        df_gps_delka: Client.GGuptaKrtDbBox;
        df_kod_vyu: Client.GGuptaKrtDbBox;
        df_lhuta_zaruka: Client.GGuptaKrtDbBox;
        df_stat_puvod: Client.GGuptaKrtDbBox;
        df_dp_ode: Client.GGuptaKrtDbBox;
        df_skp_odp: Client.GGuptaKrtDbBox;
        df_typ_odpU: Client.GGuptaDbBox;
        df_typ_odpD: Client.GGuptaDbBox;
        df_skupina_odpU: Client.GGuptaDbBox;
        df_skupina_odpD: Client.GGuptaDbBox;
        df_c_sazba_odpU: Client.GGuptaDbBox;
        df_doba_uziti: Client.GGuptaDbBox;
        df_pro_rm: Client.GGuptaDbBox;
        df_rok_odpisovU: Client.GGuptaDbBox;
        df_c_vstupU: Client.GGuptaDbBox;
        df_mj_odp: Client.GGuptaDbBox;
        df_c_rok_odpU: Client.GGuptaDbBox;
        df_c_zbytekU: Client.GGuptaDbBox;
        df_c_zbytek_proc: Client.GGuptaDbBox;
        df_c_zustU: Client.GGuptaDbBox;
        df_c_opravkaU: Client.GGuptaDbBox;
        cvShowTabOdpU: boolean;
        cvShowTabOdpD: boolean;
        df_rok_start_odp: Client.GGuptaDbBox;
        df_stop_rok_odp: Client.GGuptaDbBox;
        df_rok_odpisov_zvc: Client.GGuptaDbBox;
        df_stop_rok_odp_zvc: Client.GGuptaDbBox;
        df_rok_zvys_vc: Client.GGuptaDbBox;
        df_rok_odpisovD: Client.GGuptaDbBox;
        df_c_sazba_odpD: Client.GGuptaDbBox;
        df_c_vstupD: Client.GGuptaDbBox;
        df_c_opravkaD: Client.GGuptaDbBox;
        df_c_zustD: Client.GGuptaDbBox;
        df_c_zbytekD: Client.GGuptaDbBox;
        df_c_rok_odpD: Client.GGuptaDbBox;
        df_obd_odpU: string;
        df_obd_odpD: string;
        df_pocet_odp: Client.GGuptaDbBox;
        df_presnost_odp: Client.GGuptaDbBox;
        df_gps_sirka: Client.GGuptaKrtDbBox;
        df_ext_3: Client.GGuptaKrtDbBox;
        df_ext_2: Client.GGuptaKrtDbBox;
        df_ext_1: Client.GGuptaKrtDbBox;
        df_mistnost_kod: Client.GGuptaKrtDbBox;
        df_segment_kod: Client.GGuptaKrtDbBox;
        df_budova_kod: Client.GGuptaKrtDbBox;
        df_ixs_ref: Client.GGuptaKrtDbBox;
        df_ixs_orj: Client.GGuptaKrtDbBox;
        df_objekt: Client.GGuptaKrtDbBox;
        df_stredisko: Client.GGuptaKrtDbBox;
        df_trida: Client.GGuptaKrtDbBox;
        df_ixs_esu_vla: Client.GGuptaKrtDbBox;
        df_ixs_esu_servis: Client.GGuptaKrtDbBox;
        df_ixs_esu_dod: Client.GGuptaKrtDbBox;
        df_ixs_esu_vyr: Client.GGuptaKrtDbBox;
        cvShowTabRPP: boolean;
        df_rozmer_l: Client.GGuptaKrtDbBox;
        df_rozmer_w: Client.GGuptaKrtDbBox;
        df_rozmer_h: Client.GGuptaKrtDbBox;
        df_hmotnost: Client.GGuptaKrtDbBox;
        df_rok_vyr: Client.GGuptaKrtDbBox;
        df_typ_maj: Client.GGuptaKrtDbBox;
        df_ktg_zar: Client.GGuptaKrtDbBox;
        df_prev_stav: Client.GGuptaKrtDbBox;
        df_mobilita: Client.GGuptaKrtDbBox;
        df_trida_bezp: Client.GGuptaKrtDbBox;
        df_riziko_por: Client.GGuptaKrtDbBox;
        cmb_ktg_kp: Client.GGuptaKrtDbBox;
        df_cis_rejstrik_kp: Client.GGuptaKrtDbBox;
        df_id_rejstrik_kp: Client.GGuptaKrtDbBox;
        df_expirace: Client.GGuptaKrtDbBox;
        cvRpbDisabled: boolean;
        cvTypRpMaj: number;
        cvShowTabFoto: boolean;
        cvShowTabSML: boolean;
        tbl_provoz_podm: Client.GGuptaDbBox;
        tbl_provoz_podmData: Interface.GProvozPodminkyDto[];
        cvShowTabRef: boolean;
        cvShowTabTrf: boolean;
        cvShowTabPrislus: boolean;
        cvTabPrislusData: Interface.GMajspriDto[];
        cvShowTabPartner: boolean;
        cvPrisItemsSet: Interface.GItemSettingsDto[];
        pbDI: Client.GGuptaBtn;
        pbSoubor: Client.GGuptaBtn;
        pbPrvky: Client.GGuptaBtn;
        pbPohyb: Client.GGuptaBtn;
        pbHst: Client.GGuptaBtn;
        pbRes: Client.GGuptaBtn;
        pbVlozPoznBlok: Client.GGuptaBtn;
        pb_gps: Client.GGuptaBtn;
        pbOk: Client.GGuptaBtn;
        pbGis: Client.GGuptaBtn;
        pbTzh: Client.GGuptaBtn;
        pbOdpis: Client.GGuptaBtn;
        pbOdpisHst: Client.GGuptaBtn;
        pbOdpisDelete: Client.GGuptaBtn;
        pbDphHst: Client.GGuptaBtn;
        cvDatumUup?: JsonDate;
        cvSeparator: string;
        cvDITxt: string;
        cvTypSoubTxt: string;
        cvTkaTxt: string;
        cvMatAktTxt: string;
        cvZevTxt: string;
        cvObchodniMajetek: string;
        argMajpol: Interface.GMajMajPolDto;
        cvMajInitLenSRezEc: number;
        cvCUS708: boolean;
        cvDIAccessible: boolean;
        cvEkoInitFunTyp: string;
        cvUcty: Interface.GMajvdroDto;
        cvMajsodRokObdOdp: number;
        cvMajsodMesObdOdp: number;
    }
    type UsedComponentsKarta = IGDefDto & Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<Interface.GMajmajDto | Interface.GMajsobmDto> & Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions;
    type uctyType = {
        uea_opr?: string | null;
        uea_por?: string | null;
        uea_evi?: string | null;
        uea_opp?: string | null;
    };
    class GMajKarta extends GDetailBuilderContent<UsedComponentsKarta> implements IGContent {
        private myValidators;
        DetailDto: Interface.GMajmajDto;
        argMode: any;
        argModeReq: any;
        private tabTrf;
        private trfGrid;
        private trfActionList;
        private gridPrislusenstvi;
        private gridPrimDoklady;
        private gridSml;
        private gridRef;
        private gridInv;
        private gridProdej;
        private gridPartneri;
        private gridKatastr;
        private actZarDoUzivaniClicked;
        ucty: uctyType;
        modeOdpDrh?: number | null;
        modeOdpKrt?: number | null;
        matcis_zev: number;
        akceOdRoku: number;
        bInvCisLenDrivenByPar: boolean;
        private changeTopMmb;
        private trfDatPriContainer;
        private trfSum;
        private trfCDotaceOld;
        klasifikace_changed: boolean;
        private odpisovaSkupina_changed;
        private transferyTab;
        private transferyKUlozeni;
        formIdsOptions: formIDsOptions;
        formOdpisyUcetniOptions: formOdpisyUcetniOptions;
        formUmisteniOptions: formUmisteniOptions;
        formParametryOptions: formParametryOptions;
        private vytvorDokladDlg;
        onContentReady(): void;
        onDetailBuilderInit(builder: any): void;
        onDetailBuilderBuild(builder: any): void;
        enabledTlacitek(value: boolean): void;
        setOrcloseExpertMode(): void;
        private refreshObchodniMajetek;
        /**
         * Test, jestli je možné okno zavřít
         *
         * @returns {JQueryPromise<Interface.GMajpidDto> | Interface.GMajpidDto} promise s daty (resolve = je možné zavřít, reject = není možné zavřít) nebo přímo data detailu
         */
        closing(odkud: "close" | "save"): JQueryPromise<Interface.GMajmajDto> | {
            detailDto: Interface.GMajmajDto;
            transfery: Interface.GMajstrfDto[];
        };
        private fillFormIDsOptions;
        private fillFormOdpisyUcetniOptions;
        private fillFormUmisteniOptions;
        private fillFormParametryOptions;
        /**
         * Vytvoří doklad z karty
         * @param typ_dok
         * @returns
         */
        private VytvorDoklad;
        private logWatch;
        private logToDo;
        private logFunctionCall;
        private logSrvCall;
        private validateDph;
        private validatePmj;
        private validateCDotace;
        private validateC;
        private pomerovyPrepocetOdpisu;
        private roundDecimal;
        private createComplete;
        private createCompleteEditNoSave;
        setEnableTab(): void;
        /**
         * Nastavení prvků ve formuláři
         */
        private enableActions;
        private jsShowLocationOnMapyCz;
        private jsCallGis;
        private saveKarta;
        private getKartaItems;
        private gfGetTypKla;
        private validateRokOdpisov;
        private warningValidateOdp;
        private setEnableOdpRokZvysVC;
        private showSazbaKoef;
        private setEnableObjectOdp;
        private setEnableObjectOdpC;
        private setVisibleOdp;
        private validateDpOde;
        private validateRokZvysVc;
        private setEnableOdpRokOdpZvc;
        private validateRokOdpisovZvc;
        private validateStopRokOdp;
        private validateStopRokOdpZvc;
        private validateCVstup;
        private validateCOpravka;
        private validateCZust;
        private validateCRokOdp;
        private jsCheckDuplIdMaj;
        private jsEviCisKeyDown;
        private setEviCisMax;
        private validateCMena;
        private jsTridaChange;
        private jsStrediskoChange;
        private jsBudovaKodChange;
        private jsSegmentKodChange;
        private jsMistnostKodChange;
        private jsIxsOrjChange;
        private jsObjektChange;
        private showPlanOdpis;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GTransferyTab extends GContentBase implements IGContent {
        private myValidators;
        DetailDto: Interface.GMajmajDto;
        cvMajsodRokObdOdp: number;
        cvMajsodMesObdOdp: number;
        cvShowTabOdpU: boolean;
        dialogMode: boolean;
        private cvTRFAccessible;
        private trfCDotaceOld;
        private trfGrid;
        private trfDatPriContainer;
        private trfSum;
        castkaBadge: GObservableObject<GBadgeOptions>;
        onContentReady(): void;
        /**
        * Obsluha aktivn� operace
        *
        */
        suma(data?: Interface.GMajstrfDto[]): Decimal;
        /**
         * Zda je sou�et transfer� roven ��stce v hlavi�ce
         * @returns
         */
        sumaOK(): boolean;
        private loadTransferGrid;
        private setTrfActions;
        private CheckAllTransfers;
        CheckAndSaveAllTransfers(data: Interface.GMajstrfDto[]): JQueryPromise<void>;
        private CheckTransfer;
        closing(odkud: "close" | "save"): JQuery.PromiseBase<null, never, never, never, never, never, never, never, never, never, never, never> | JQuery.PromiseBase<any[], never, never, never, never, never, never, never, never, never, never, never> | null;
    }
}
declare namespace Gordic.Maj.WebClient {
    class GZodpovedneOsobyTab extends GContentBase implements IGContent {
        dialogMode: boolean;
        private Grid;
        private ixs_maj;
        onContentReady(): void;
        private loadData;
        private enabledTlacitek;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface formIDsOptions {
        df_drh_id: Client.GGuptaDbBox;
        df_inv_cis: Client.GGuptaKrtDbBox;
        df_id_maj: Client.GGuptaKrtDbBox;
        df_evi_cis: Client.GGuptaKrtDbBox;
        df_ser_cis: Client.GGuptaKrtDbBox;
        df_vyr_cis: Client.GGuptaKrtDbBox;
        df_sarze: Client.GGuptaKrtDbBox;
        df_ean: Client.GGuptaKrtDbBox;
        df_mat_cis: Client.GGuptaKrtDbBox;
        df_skp: Client.GGuptaKrtDbBox;
        df_mj: Client.GGuptaKrtDbBox;
        df_dat_por: Client.GGuptaKrtDbBox;
        df_nks: Client.GGuptaKrtDbBox;
        df_dat_zar: Client.GGuptaKrtDbBox;
        df_dat_vyr: Client.GGuptaKrtDbBox;
        df_poznamka: Client.GGuptaKrtDbBox;
        df_jmeno_soubor: Client.GGuptaKrtDbBox;
        df_dat_uup: Client.GGuptaKrtDbBox;
        df_ixs_ref: Client.GGuptaKrtDbBox;
        cmb_dan_typ: Client.GGuptaKrtDbBox;
        cmb_tka: Client.GGuptaDbBox;
        cvModMode: number;
        cvMajInitSkmTypL: number;
        cvMajInitSkmUnqL: boolean;
        cvEkocdap: Gordic.Data.Readers.EkocdapDto[];
        cvLblIdTop: string;
        cvCurrent: any;
        cvEkoRok: number;
        cvShowTabOdpU: boolean;
        cvUeabNull?: string | null;
        cvIxsVue: string;
        cvMajInitModeOdpSkp: number;
        cvLocKrfFillInvCis: string;
        cvTestDuplInvCis: boolean;
        cvSkupinaTypDm?: number | null;
        cvShowTabOdpD: boolean;
        cvShowTabRef: boolean;
        modeOdpDrh?: number | null;
        modeOdpKrt?: number | null;
        content: GContent;
        ucty: {
            uea_opr?: string | null;
            uea_por?: string | null;
            uea_evi?: string | null;
            uea_opp?: string | null;
        };
        DetailDto: Interface.GMajmajDto;
        argMode: any;
        argModeReq: any;
        bInvCisLenDrivenByPar: boolean;
        MAJ_CIS_INVCDFL: number;
        MAJ_RAD_SREZEC: number;
        MAJ_ICO_FILL_KR: boolean;
        MAJ_ICO_MODPIS: boolean;
        MAJ_ICO_FRM_INV: boolean;
        MAJ_ZAV_INV_CIS?: number | null;
        MAJ_ICO_GEN_INV: boolean;
        MAJ_RAD_POLCMJ: boolean;
        MAJ_RAD_CHSKPMC: boolean;
        MAJ_DOK_PRIUUP: boolean;
        MAJ_DOK_PRIUUPM: boolean;
        matcis_zev: number;
        klasifikace_changed: boolean;
        ml_nazev: Client.GGuptaKrtDbBox;
        akceOdRoku: number;
        actWwwMap?: any;
        dialogs: GDlgNamespace;
        getForm: any;
        setEnableTab: any;
        findFields: any;
    }
    function formIdentifikaceKarty(opts: formIDsOptions): Forms.Form;
}
declare namespace Gordic.Maj.WebClient {
    interface formOdpisyUcetniOptions {
        df_skupina_odpU: Client.GGuptaDbBox;
        df_typ_odpU: Client.GGuptaDbBox;
        df_doba_uziti: Client.GGuptaDbBox;
        df_pro_rm: Client.GGuptaDbBox;
        df_rok_odpisovU: Client.GGuptaDbBox;
        df_obd_odpU: string;
        df_c_vstupU: Client.GGuptaDbBox;
        df_c_opravkaU: Client.GGuptaDbBox;
        df_c_zustU: Client.GGuptaDbBox;
        df_c_zbytekU: Client.GGuptaDbBox;
        df_c_rok_odpU: Client.GGuptaDbBox;
        cvSkupinaTypDm?: number | null;
        cvEkoRok: number;
        cvEkoPlatceDph?: number | null;
        content: GContent;
        DetailDto: Interface.GMajmajDto;
        argMode: any;
        dialogs: GDlgNamespace;
        getForm: any;
        setVisibleOdp?: any;
        setEnableObjectOdp?: any;
    }
    function changeSkupinaOdp(fldValue: any, druhOdp: any, cnt: any, getForm: any, formIDsOptions: any): void;
    function validateProRM(opts: formOdpisyUcetniOptions): void;
    function jsGetSazbaOdp(bUcetni: boolean, opts: formOdpisyUcetniOptions): void;
    function showSazbaKoef(bUcetni: boolean, opts: formOdpisyUcetniOptions): void;
    function changeTypOdp(bUcetni: boolean, myValue: Data.Readers.MajstodDto, opts: formOdpisyUcetniOptions, optsIDs: formIDsOptions): void;
    function redefineRokOdp(bUcetni: boolean, opts: formOdpisyUcetniOptions): void;
    function validateCZbytekProc(myVal: number, opts: formOdpisyUcetniOptions): void;
    function spoctiCDph(castka: Decimal, sazbaDane: any): import("../../../gin/gui/vendor/_types/decimal.js/index").default;
    function _setCFlagDph(castka: Decimal, prizDklCenyVcetneDph: boolean, prizDklBezOdpoctuDph: boolean, opts: formOdpisyUcetniOptions): Decimal;
    function validateCZbytek(rezim: number, myVal: Decimal, bUcetni: boolean, opts: formOdpisyUcetniOptions): false | undefined;
    function formOdpisyUcetni(opts: formOdpisyUcetniOptions, optsIDs: formIDsOptions): Forms.Form;
}
declare namespace Gordic.Maj.WebClient {
    interface formParametryOptions {
        df_rozmer_l: Client.GGuptaKrtDbBox;
        df_rozmer_w: Client.GGuptaKrtDbBox;
        df_rozmer_h: Client.GGuptaKrtDbBox;
        df_hmotnost: Client.GGuptaKrtDbBox;
        df_rok_vyr: Client.GGuptaKrtDbBox;
        df_expirace: Client.GGuptaKrtDbBox;
        df_lhuta_zaruka: Client.GGuptaKrtDbBox;
        df_kod_vyu: Client.GGuptaKrtDbBox;
        df_typ_maj: Client.GGuptaKrtDbBox;
        df_stat_puvod: Client.GGuptaKrtDbBox;
        df_ktg_zar: Client.GGuptaKrtDbBox;
        df_prev_stav: Client.GGuptaKrtDbBox;
        df_mobilita: Client.GGuptaKrtDbBox;
        df_trida_bezp: Client.GGuptaKrtDbBox;
        df_riziko_por: Client.GGuptaKrtDbBox;
        cmb_ktg_kp: Client.GGuptaKrtDbBox;
        df_cis_rejstrik_kp: Client.GGuptaKrtDbBox;
        df_id_rejstrik_kp: Client.GGuptaKrtDbBox;
        df_ixs_esu_dod: Client.GGuptaKrtDbBox;
        df_ixs_esu_vyr: Client.GGuptaKrtDbBox;
        df_ixs_esu_servis: Client.GGuptaKrtDbBox;
        df_ixs_esu_vla: Client.GGuptaKrtDbBox;
        ixs_maj?: string | null | undefined;
        tbl_provoz_podm: Client.GGuptaDbBox;
        tbl_provoz_podmData: Interface.GProvozPodminkyDto[];
        argMode: any;
    }
    function formParametry(opts: formParametryOptions): Forms.Form;
}
declare namespace Gordic.Maj.WebClient {
    interface formUmisteniOptions {
        df_trida: Client.GGuptaKrtDbBox;
        df_stredisko: Client.GGuptaKrtDbBox;
        df_objekt: Client.GGuptaKrtDbBox;
        df_ixs_orj: Client.GGuptaKrtDbBox;
        df_budova_kod: Client.GGuptaKrtDbBox;
        df_segment_kod: Client.GGuptaKrtDbBox;
        df_mistnost_kod: Client.GGuptaKrtDbBox;
        df_ext_3: Client.GGuptaKrtDbBox;
        df_ext_2: Client.GGuptaKrtDbBox;
        df_ext_1: Client.GGuptaKrtDbBox;
        df_gps_sirka: Client.GGuptaKrtDbBox;
        df_gps_delka: Client.GGuptaKrtDbBox;
        MAJ_RAD_TOPMMB: boolean;
        cvMajInitRezimEVS: boolean;
        cvMajInitEVS: string;
        changeTopMmb: boolean;
        DetailDto: Interface.GMajmajDto;
        argMode: any;
        getForm: any;
    }
    function formUmisteni(opts: formUmisteniOptions, optsIDs: formIDsOptions): Forms.Form;
}
declare namespace Gordic.Maj.WebClient {
    abstract class KartotekaParent {
        protected cnt: GKartotekaMajetku;
        protected _name: string;
        protected _matAkt: number;
        protected abstract _tka: number;
        protected abstract _prizRes: number;
        abstract subtaskActName: string;
        protected skupinaId: number;
        protected avgRezim: number;
        static _srvCnt?: GContent | null;
        private _jmenaSouboru;
        constructor(cnt: GKartotekaMajetku, mat_akt: number);
        get name(): string;
        get matAkt(): number;
        get tka(): number;
        get prizRes(): number;
        private getFileNames;
        getGridFormat(/*cnt: GKartotekaColNames,*/ majcakt: Maj.Interface.GMajcaktDto[]): Data.GridFormat<any>;
        protected getBaseFilterPanel(): JQuery.Promise<Gordic.Forms.Form[]>;
        abstract getFilterPanelForms(): JQuery.Promise<Gordic.Forms.Form[]>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class KartotekaEvidovany extends KartotekaParent {
        protected _tka: number;
        protected _prizRes: number;
        subtaskActName: string;
        getFilterPanelForms(): JQuery.Promise<Gordic.Forms.Form[]>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class KartotekaNedokonceny extends KartotekaParent {
        protected _tka: number;
        protected _prizRes: number;
        subtaskActName: string;
        getFilterPanelForms(): JQuery.Promise<Gordic.Forms.Form[]>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class KartotekaRezervace extends KartotekaParent {
        protected _name: string;
        protected _tka: number;
        protected _prizRes: number;
        subtaskActName: string;
        getFilterPanelForms(): JQuery.Promise<Gordic.Forms.Form[]>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class KartotekaSoubory extends KartotekaParent {
        protected _name: string;
        protected _tka: number;
        protected _prizRes: number;
        subtaskActName: string;
        getFilterPanelForms(): JQuery.Promise<Gordic.Forms.Form[]>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class KartotekaStornovany extends KartotekaParent {
        protected _name: string;
        protected _matAkt: number;
        protected _tka: number;
        protected _prizRes: number;
        subtaskActName: string;
        getFilterPanelForms(): JQuery.Promise<Gordic.Forms.Form[]>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class KartotekaVyber extends KartotekaParent {
        protected _name: string;
        protected _matAkt: number;
        protected _tka: number;
        protected _prizRes: number;
        subtaskActName: string;
        getFilterPanelForms(): JQuery.Promise<Gordic.Forms.Form[]>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class KartotekaVydany extends KartotekaParent {
        protected _tka: number;
        protected _prizRes: number;
        subtaskActName: string;
        getFilterPanelForms(): JQuery.Promise<Gordic.Forms.Form[]>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class KartotekaVyrazeny extends KartotekaParent {
        protected _tka: number;
        protected _prizRes: number;
        subtaskActName: string;
        getFilterPanelForms(): JQuery.Promise<Gordic.Forms.Form[]>;
    }
}
declare namespace Gordic.Maj.WebClient {
    class KartotekaManager {
        protected cnt: GKartotekaMajetku;
        protected rezim: number;
        private kartoteky;
        private cisloAktualniKartoteky;
        constructor(cnt: GKartotekaMajetku, rezim: number);
        dispose(): void;
        getKartoteka(): KartotekaParent;
        nastavCisloKartoteky(): void;
        getSubtasksOption(changeSubtaskDelegat: any): Gordic.Widget.GSubtasksOptions;
    }
}
declare namespace Gordic.Maj.WebClient {
    interface IGRegNMContentValues {
        argMode: Interface.GMajEnumRezimyDialoguRegistru;
        argIxsMaj?: string;
        argInvCis?: string;
        data: Gordic.Maj.Interface.GTzhDto[];
    }
    class GRegistrNM extends GContentBase<IGRegNMContentValues> implements IGContent {
        uid: string;
        private showOk;
        private showMsk;
        private showTag;
        private filterFrm;
        private islView;
        onContentReady(): void;
        private setMskPripraveno;
        private putBuffer;
        closing(returnValue?: any): JQuery.Promise<any, any, any>;
    }
}
/**
 * Sd�len� metody pro hromadn� operace MAJ
 * @author Petr Vo�ta
 * @since 525.6.0.0
 */
declare namespace Gordic.Maj.WebClient.HromadneOperace {
    type GMajmajsiapDto = Interface.GMajmajDto | Interface.GMajsiapDto;
    /**
    * Ob�erstv� seznam a p�ekontroluje data (oboje voliteln�)
    *
    * @param {GContent} cnt content
    * @param {boolean} reloadData maj� se na��st aktu�ln� data z datab�ze? (true = ano, false = ne)
    * @param {Gordic.Maj.Interface.GMajmajDto[] | Gordic.Maj.Interface.GMajsiapDto[] | undefined} data data pro p��pad, �e se nemaj� na��tat z datab�ze (reloadData = false)
    * @param {Gordic.General.GIkc | null} ikc IKC
    * @param {string[] | undefined} fragments fragmenty
    * @param {((dto: TOperationDto) => any) | undefined} checkAction deleg�t pro kontrolu dat p�ed operac� (pokud nen�, nevol� se kontrola, jen se na�tou aktu�ln� data)
    * @param {(model: TModel | undefined, data: Gordic.Maj.Interface.GMajmajDto[] | Gordic.Maj.Interface.GMajsiapDto[], ikc: Gordic.General.GIkc) => TOperationDto} toOperationDto deleg�t pro vytvo�en� DTO operace
    * @param {TModel | undefined} model model
    * @returns {JQueryPromise<Gordic.Maj.Interface.GMajmajDto[] | Gordic.Maj.Interface.GMajsiapDto[]>} seznam doklad� (s v�sledky operace nebo bez podle parametru withResults)
    */
    function wizardRefreshAndCheckData<TOperationDto, TModel>(cnt: GContent, reloadData: boolean, data: Gordic.Maj.Interface.GMajSeznamDto[] | undefined, ikc: Gordic.General.GIkc | null, fragments: string[] | undefined, checkAction: ((dto: TOperationDto) => any) | undefined, toOperationDto: (model: TModel | undefined, data: Gordic.Maj.Interface.GMajmajDto[] | Gordic.Maj.Interface.GMajsiapDto[], ikc: Gordic.General.GIkc | null) => TOperationDto, model: TModel | undefined): JQueryPromise<Gordic.Eko.Components.MassOperationData<GMajmajsiapDto>[]>;
    /**
    * Hromadn� zm�ny vybran�ch karet
    *
    * @returns {JQuery.Promise<any>} promise s operac�
    */
    function hromadneZmeny(that: GContent, grid: JQuery): JQuery.Promise<any>;
    /**
   * Hromadn� zm�ny vybran�ch karet
   *
   * @returns {JQuery.Promise<any>} promise s operac�
   * @param likvidace zda se jedn� o hromadn� v�dej likvidac�
   */
    function hromadneZmenyDokladem(params: GHromadneZmenyInterface, typ_dok: number): JQuery.Promise<any>;
    interface IGHZZadostiModel {
        typ_dok?: number | null;
        id_top?: string | null;
        dev?: number | null;
        ico_ext?: string | null;
        newValues?: Interface.GMajpidDto | null;
        topologie?: Interface.GTopologieDto | null;
    }
    /**
    * Vytvo�en� vstupn�ch dat pro p�ed�n�
    *
    * @param {TDto[]} data seznam ��dost�
    * @param zadosti hlavicky zadosti
    * @param {IGHZZadostiModel} [model] vstupn� parametry
    * @param {Gordic.General.GIkc | null} [ikc] ikc (pro operace nad seznamem)
    * @returns {TOperation} napln�n� vstupn� data pro operaci
    */
    function ToHZZadostiOperationDto<TDto extends Maj.Interface.GMajsiapDto, TOperation extends Maj.Interface.GZadostiMajOperationDto>(data: TDto[], zadosti: GMajmajsiapDto[], model?: IGHZZadostiModel, ikc?: Gordic.General.GIkc | null): TOperation;
}
/**
 * Sdílené metody pro MAJ
 * @author Petr Vošta
 * @since 524.3.0.0
 */
declare namespace Gordic.Maj.WebClient {
    /**
     * Sdílené metody pro gridy seznamů
     * @author Petr Vošta
     * @since 524.3.0.0
     */
    namespace MajGrid {
        /**
         * Základní položky pro seznamy dokladů
         *
         * @author Petr Vošta
         * @since 524.3.0.0
         */
        interface IGStandardMajGrid<TDto, TPermissions> {
            /**
             * View pro grid
             * @type {Isl.View<TData>}
             */
            view: Isl.View<TDto>;
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
        /**
         * Parametry průvodce pro metodu otevření detailu
         */
        interface openDetailWizardParams {
            grid: JQuery;
            refreshAndCheckDataAction?: () => any;
            setActiveOperation?: () => any;
        }
        /**
         * Vrátí položky kontextového menu (kromě součtového řádku)
         *
         * @param {IGGridCellContext<TRow>} cellContext informaco o buňce, nad kterou má být menu spuštěno
         * @param {(cellContext: IGGridCellContext<TRow>)} createBar (default = > MenuParams[])
         * @returns {MenuParams[] | null}
         */
        function getContextMenuParams<TRow>(cellContext: IGGridCellContext<TRow>, createBar: (cellContext: IGGridCellContext<TRow>) => MenuParams[]): MenuParams[] | null;
        const presetDokumentColumns: Gordic.Ssl.WebClient.GDokumentColumnNames[];
        const presetDokumentFields: Gordic.Ssl.WebClient.GDokumentFieldNames[];
        /**
        * Inicializace objektu dokumentu (např. pro použítí v definici sloupců pro grid)
        *
        * @returns {JQuery.Promise<Gordic.Wfl.Interface.GWflspidGetColumnParamsResponseDto>} nainicializované parametry dokumentu
        */
        function dokumentInit(): JQuery.Promise<Gordic.Ssl.Interface.GDokumentGetColumnParamsResponseDto>;
        /**
         * Naplnění jednoho řádku do seznamu <TDto, TFilter>
         *
         * @param {(any) => any} listAction Metoda pro vrácení dat z databáze (podle filterPK)
         * @param {TFilter} filterPK Filtr pro aktualizaci dat
         * @param {any} $grid Grid, který má být aktualizován
         */
        function reloadRow<TDto, TFilter>(listAction: (any: any) => any, filterPK: TFilter, $grid: JQuery): void;
        /**
 * Vrátí parametry gridu pro standardní seznam
 *
 * @param {GContent} content content
 * @param {Gordic.Data.GridFormat<TRow>} gridFormat gridformat
 * @param {GAction | undefined} defaultAction akce vyvolané na dvojklik na řádku
 * @param {JQueryEventListener1<{ cellInfo: CellInfo<TRow>, originalCellInfo: CellInfo<TRow>, view: Gordic.Data.View<TRow> } > | undefined} cellActivate akce vyvolané po změně vybraného řádku
 * @param {MenuParams[] | ((cellContext: IGGridCellContext<TRow>) => MenuParams[] | null) | null} contextMenu kontextové menu (null = bez kontextového menu)
 * @param {Gordic.Components.Grid.CondFormats.CondFormat[] | undefined} condFormats případné podmíněné formátování (undefined = bez podmíněného formátování)
 * @param {string} columnListReduced seznam sloupců pro zjednodušený pohled
 * @param {GGridOptions<TRow> | undefined} [otherOptions] další vlastnosti gridu (default = undefined)
 * @returns {GGridOptions<TRow>} vlastnosti gridu pro standardní seznam
 */
        function getGridOptions<TRow>(content: GContent, gridFormat: Gordic.Data.GridFormat<TRow>, view: Isl.View<TRow> | undefined, defaultAction: GAction | undefined, cellActivate: JQueryEventListener1<{
            cellInfo: CellInfo<TRow>;
            originalCellInfo: CellInfo<TRow>;
            view: Gordic.Data.View<TRow>;
        }> | undefined, contextMenu: MenuParams[] | ((cellContext: IGGridCellContext<TRow>) => MenuParams[] | null) | null, condFormats: Gordic.Components.Grid.CondFormats.CondFormat[] | undefined, columnListDefaultView: string, columnListFullViewPrefer: string | undefined | null, columnListSimpleView: string, columnListIgnore: string | undefined | null, otherOptions?: GGridOptions<TRow> | undefined): GGridOptions<TRow>;
        namespace Doklad {
            /**
             * Vrátí pole sloupců pro seznam dokladů
             *
             * @param {GContent & IGStandardMajGrid<Maj.Interface.GMajpidDto, Maj.Interface.GDokladMajServicePermission>} gcontent  content (musí mít vlastnost DokumentParams)
             * @param {boolean} [wizard] formát pro průvodce (redukovaná množina sloupců)
             * @returns {Gordic.Data.GridFormat<Maj.Interface.GMajpidDto>} pole sloupců pro ggrid
             */
            function createGridFormat(gcontent: GKnihaDokladu, wizard?: boolean): Gordic.Data.GridFormat<Maj.Interface.GMajpidDto>;
            /**
             * Přidání sloupců pro doklad
             *
             * @param {GContent & IGStandardMajGrid<Maj.Interface.GMajpidDto, Maj.Interface.GDokladMajServicePermission>} gcontent content (musí mít vlastnost DokumentParams)
             * @param {Gordic.Data.GridFormat} columns gridformat
             * @param {Gin.WebClient.GScopeOptionLevel[]} [ scope] případný scope
             * @param {boolean} [wizard] formát pro průvodce (redukovaná množina sloupců)
             */
            function addLinkedColumnsDoklad(gcontent: GKnihaDokladu, columns: Gordic.Data.GridFormat, scope?: Gin.WebClient.GScopeOptionLevel[], wizard?: boolean): void;
            /**
             * Vrátí parametry gridu pro standardní seznam dokladů
             *
             * @param {GContent & IGStandardMajGrid<Maj.Interface.GMajpidDto, Maj.Interface.GDokladMajServicePermission>} content content (musí mít vlastnost DokumentParams)
             * @param {Gordic.Data.GridFormat<Maj.Interface.GMajpidDto> | undefined} gridFormat gridformat (není-li zadán, bude vytvořen)
             * @param {GAction | undefined} defaultAction akce vyvolaná na dvojklik na řádku
             * @param {JQueryEventListener1<{ cellInfo: CellInfo<Maj.Interface.GMajpidDto>, originalCellInfo: CellInfo<Maj.Interface.GMajpidDto>, view: Gordic.Data.View<Maj.Interface.GMajpidDto> }> | undefined} cellActivate akce vyvolané po změně vybraného řádku
             * @param {MenuParams[] | ((cellContext: IGGridCellContext<Maj.Interface.GMajpidDto>) => MenuParams[] | null) | null} contextMenu kontextové menu (null = bez kontextového menu)
             * @param {GGridOptions<Maj.Interface.GMajpidDto> | undefined} otherOptions další vlastnosti gridu (default = undefined)
             * @returns {GGridOptions<Maj.Interface.GMajpidDto>} vlastnosti gridu pro standardní seznam dokladů
             */
            function getGridOptions(content: GKnihaDokladu & IGStandardMajGrid<Maj.Interface.GMajpidDto, Maj.Interface.GDokladMajPermission>, gridFormat: Gordic.Data.GridFormat<Maj.Interface.GMajpidDto> | undefined, defaultAction: GAction | undefined, cellActivate: JQueryEventListener1<{
                cellInfo: CellInfo<Maj.Interface.GMajpidDto>;
                originalCellInfo: CellInfo<Maj.Interface.GMajpidDto>;
                view: Gordic.Data.View<Maj.Interface.GMajpidDto>;
            }> | undefined, contextMenu: MenuParams[] | ((cellContext: IGGridCellContext<Maj.Interface.GMajpidDto>) => MenuParams[] | null) | null, otherOptions?: GGridOptions<Maj.Interface.GMajpidDto> | undefined): GGridOptions<Maj.Interface.GMajpidDto>;
        }
        namespace Karta {
            /**
             * Vrátí pole sloupců pro kartotéku majetku - nemělo by to sem ani vlézt, protože GridFormát posílám z kartotéky
             *
             * @param {GContent & IGStandardMajGrid<Maj.Interface.GMajmajDto, Maj.Interface.GMajKartaSeznamPermission>} gcontent  content (musí mít vlastnost DokumentParams)
             * @param {boolean} [wizard] formát pro průvodce (redukovaná množina sloupců)
             * @returns {Gordic.Data.GridFormat<Maj.Interface.GMajmajDto>} pole sloupců pro ggrid
             */
            function createGridFormat(gcontent: GKartotekaMajetku, wizard?: boolean): Gordic.Data.GridFormat<Maj.Interface.GMajmajDto>;
            /**
           * Přidání sloupců pro kartu
           *
           * @param {GContent & IGStandardMajGrid<Maj.Interface.GMajmajDto, Maj.Interface.GMajKartaSeznamPermission>} gcontent content (musí mít vlastnost DokumentParams)
           * @param {Gordic.Data.GridFormat} columns gridformat
           * @param {Gin.WebClient.GScopeOptionLevel[]} [ scope] případný scope
           * @param {boolean} [wizard] formát pro průvodce (redukovaná množina sloupců)
           */
            function addLinkedColumnsKarta(gcontent: GKartotekaMajetku, columns: Gordic.Data.GridFormat, scope?: Gin.WebClient.GScopeOptionLevel[], wizard?: boolean): void;
            /**
            * Vrátí parametry gridu pro standardní seznam dokladů
            *
            * @param {GContent & IGStandardMajGrid<Maj.Interface.GMajmajDto, Maj.Interface.GMajKartaSeznamPermission>} content content (musí mít vlastnost DokumentParams)
            * @param {Gordic.Data.GridFormat<Maj.Interface.GMajmajDto> | undefined} gridFormat gridformat (není-li zadán, bude vytvořen)
            * @param {GAction | undefined} defaultAction akce vyvolaná na dvojklik na řádku
            * @param {JQueryEventListener1<{ cellInfo: CellInfo<Maj.Interface.GMajmajDto>, originalCellInfo: CellInfo<Maj.Interface.GMajmajDto>, view: Gordic.Data.View<Maj.Interface.GMajmajDto> }> | undefined} cellActivate akce vyvolané po změně vybraného řádku
            * @param {MenuParams[] | ((cellContext: IGGridCellContext<Maj.Interface.GMajmajDto>) => MenuParams[] | null) | null} contextMenu kontextové menu (null = bez kontextového menu)
            * @param {GGridOptions<Maj.Interface.GMajmajDto> | undefined} otherOptions další vlastnosti gridu (default = undefined)
            * @returns {GGridOptions<Maj.Interface.GMajmajDto>} vlastnosti gridu pro standardní seznam dokladů
            */
            function getGridOptions(content: GKartotekaMajetku & IGStandardMajGrid<Maj.Interface.GMajmajDto, Maj.Interface.GMajKartaSeznamPermission>, gridFormat: Gordic.Data.GridFormat<Maj.Interface.GMajmajDto> | undefined, defaultAction: GAction | undefined, cellActivate: JQueryEventListener1<{
                cellInfo: CellInfo<Maj.Interface.GMajmajDto>;
                originalCellInfo: CellInfo<Maj.Interface.GMajmajDto>;
                view: Gordic.Data.View<Maj.Interface.GMajmajDto>;
            }> | undefined, contextMenu: MenuParams[] | ((cellContext: IGGridCellContext<Maj.Interface.GMajmajDto>) => MenuParams[] | null) | null, otherOptions?: GGridOptions<Maj.Interface.GMajmajDto> | undefined): GGridOptions<Maj.Interface.GMajmajDto>;
        }
        namespace PolozkaZadosti {
            /**
            * Vrátí parametry gridu pro standardní seznam polozekZadosti
            *
            * @param {GContent & IGStandardMajGrid<Maj.Interface.GMajsiapDto, Maj.Interface.GMajKartaSeznamPermission>} content content (musí mít vlastnost DokumentParams)
            * @param {Gordic.Data.GridFormat<Maj.Interface.GMajsiapDto> | undefined} gridFormat gridformat (není-li zadán, bude vytvořen)
            * @param {GAction | undefined} defaultAction akce vyvolaná na dvojklik na řádku
            * @param {JQueryEventListener1<{ cellInfo: CellInfo<Maj.Interface.GMajsiapDto>, originalCellInfo: CellInfo<Maj.Interface.GMajsiapDto>, view: Gordic.Data.View<Maj.Interface.GMajsiapDto> }> | undefined} cellActivate akce vyvolané po změně vybraného řádku
            * @param {MenuParams[] | ((cellContext: IGGridCellContext<Maj.Interface.GMajsiapDto>) => MenuParams[] | null) | null} contextMenu kontextové menu (null = bez kontextového menu)
            * @param {GGridOptions<Maj.Interface.GMajsiapDto> | undefined} otherOptions další vlastnosti gridu (default = undefined)
            * @returns {GGridOptions<Maj.Interface.GMajsiapDto>} vlastnosti gridu pro standardní seznam dokladů
            */
            function getGridOptions(content: GZadosti & IGStandardMajGrid<Maj.Interface.GMajsiapDto, Maj.Interface.GMajKartaSeznamPermission>, gridFormat: Gordic.Data.GridFormat<Maj.Interface.GMajsiapDto> | undefined, defaultAction: GAction | undefined, cellActivate: JQueryEventListener1<{
                cellInfo: CellInfo<Maj.Interface.GMajsiapDto>;
                originalCellInfo: CellInfo<Maj.Interface.GMajsiapDto>;
                view: Gordic.Data.View<Maj.Interface.GMajsiapDto>;
            }> | undefined, contextMenu: MenuParams[] | ((cellContext: IGGridCellContext<Maj.Interface.GMajsiapDto>) => MenuParams[] | null) | null, otherOptions?: GGridOptions<Maj.Interface.GMajsiapDto> | undefined): GGridOptions<Maj.Interface.GMajsiapDto>;
        }
        /**
        * Vrátí oprávnění pro zákaz operace v prázdném seznamu
        *
        * @returns {General.ApplicationInterface.GPermission} oprávnění se zákazem a textem
        */
        function getEmptyGridPermission(): General.ApplicationInterface.GPermission;
    }
    const presetDokumentColumns: Wfl.WebClient.GWflspidColumnNames[];
    /**
     * Inicializace objektu dokumentu (např. pro použítí v definici sloupců pro grid)
     *
     * @returns {JQuery.Promise<Gordic.Wfl.Interface.GWflspidGetColumnParamsResponseDto>} nainicializované parametry dokumentu
     */
    /**
         * Obcerstveni seznamu z nactenych dat ve view
         */
    function RefreshSeznamu(content: GKnihaDokladu | null | undefined): void;
    /**
     * Vraceni obsahu seznamu
     * @returns
     */
    function GetContentSeznam(): GKnihaDokladu;
    /**
    * Vraci objekt gridu
    * @param content
    * @returns
   */
    function GetGrid(content: GKnihaDokladu | GKartotekaMajetku): JQuery<HTMLElement>;
    /**
     * Aktualizace zaslanych zapisu z DB do gridu
     * @param content
     * @param doklady
     */
    function refreshRowsFromDB(content: GKnihaDokladu, doklady: Interface.GMajpidDto[]): JQueryPromise<any>;
    /**
     * Přidá interval číselných políček do FilterPanelu
     * @param form
     * @param name
     * @param model_0
     * @param model_1
     * @param fieldOptions
     */
    function addNumberBoxInterval(form: Forms.Form, name: string, model_0: Maj.Interface.FilterMajmaj | Interface.FilterMajPid, model_1: Maj.Interface.FilterMajmaj | Interface.FilterMajPid, fieldOptions?: GNumberBoxOptions | undefined): void;
    /**
     * Přidá interval stringových políček do FilterPanelu
     * @param form
     * @param name
     * @param model_0
     * @param model_1
     * @param fieldOptions
     */
    function addStringBoxInterval(form: Forms.Form, name: string, model_0: Maj.Interface.FilterMajmaj | Interface.FilterMajPid, model_1: Maj.Interface.FilterMajmaj | Interface.FilterMajPid, fieldOptions?: GStringBoxOptions | undefined): void;
    function _tryParseOperatorVal(val: any, operators: any): {
        operator: null;
        value: any;
    };
    function createWithSelectOperators(opts: {
        valueName: string;
        operators?: GFactorOptions[];
        defaultOperator?: string;
    }): {
        factors: GFactorOptions[];
        factor: string;
        factorOptions: {
            iconsOnly: boolean;
        };
        modelOptions: {
            setFlags: {
                noChange: boolean;
            };
        };
        modelValueTransform: {
            apply: (modelValue: any) => any;
            collect: (fieldValue: any) => any;
        };
    };
    /**
     * Přidá interval selectboxových políček do FilterPanelu
     * @param form
     * @param name
     * @param model_0
     * @param model_1
     * @param prefab
     * @param valName
     * @param fieldOptions
     */
    function addSelectBoxInterval(form: Forms.Form, name: string, model_0: Maj.Interface.FilterMajmaj | Interface.FilterMajPid, model_1: Maj.Interface.FilterMajmaj | Interface.FilterMajPid, prefab?: GSelectBoxOptions<any>, valName?: string, fieldOptions?: GSelectBoxOptions<any> | undefined): void;
    /**
     * Přidá interval měsíce a roku
     * @param form
     * @param name
     * @param model_0
     * @param model_1
     */
    function addMesicRokInterval(form: Forms.Form, name: string, model_0: Maj.Interface.FilterMajmaj | Interface.FilterMajPid, model_1: Maj.Interface.FilterMajmaj | Interface.FilterMajPid): void;
    /**
     * Přidá interval měsíce a roku
     * @param form
     * @param name
     * @param model_0
     * @param model_1
     */
    function addDateInterval(form: Forms.Form, name: string, model_0: Maj.Interface.FilterMajmaj | Interface.FilterMajPid, model_1: Maj.Interface.FilterMajmaj | Interface.FilterMajPid): void;
    /**
     * Sdílené metody MAJ pro práci s detailem
     *
     * @author Petr Vošta
     * @since 490.1.0.17
     */
    namespace MajDetail {
        /**
         * Trigger pro aktivní operaci na detailu
         */
        const triggerChange = "maj_change";
    }
    /**
 * Sdílené metody MAJ pro práci s dokladem
 *
 * @author Petr Vošta
 * @since 524.3
 */
    namespace MajDoklad {
        /**
         * Model pro parametry předání dokladů
         */
        interface IGPredaniModel {
            ixs_fun_akt?: string | null;
            ixs_su?: string | null;
            ixs_ref?: string | null;
            SouvisejiciDokumenty?: boolean | null;
            Kompetent?: boolean | null;
            ixs_fun_vyriz?: string | null;
            ico?: string | null;
            cis_real?: string | null;
            duvod?: string | null;
            druhPredani?: number | null;
        }
        /**
         * Model pro parametry převzetí dokladů
         */
        interface IGPrevzetiModel {
            ixs_fun_akt?: string | null;
            ixs_su?: string | null;
            ixs_ref?: string | null;
            SouvisejiciDokumenty?: boolean | null;
            Kompetent?: boolean | null;
            ixs_fun_vyriz?: string | null;
            ico?: string | null;
            cis_real?: string | null;
            duvod?: string | null;
        }
        /**
         * Model pro parametry přidělení dokladů
         */
        interface IGPrideleniModel {
            ixs_fun_akt?: string | null;
            ixs_su?: string | null;
            ixs_ref?: string | null;
            SouvisejiciDokumenty?: boolean | null;
            duvod?: string | null;
        }
        /**
         * Model pro parametry přeevidence dokladů
         */
        interface IGPreevidenceModel {
            ixp_den?: string | null;
            subrada?: number | null;
            rok?: number | null;
            ixs_fun_akt?: string | null;
            ixs_su?: string | null;
            zmena?: boolean | null;
            ixs_fun_vyriz?: string | null;
            ico?: string | null;
            cis_real?: string | null;
            duvod?: string | null;
            Make?: boolean | null;
            MakeRozpis?: boolean | null;
            MakeStornoPfk?: boolean | null;
        }
        /**
         * Vytvoření vstupních dat pro předání
         *
         * @param {TDto[]} data seznam dokladů
         * @param {IGPredaniModel} [model] vstupní parametry
         * @param {Gordic.General.GIkc | null} [ikc] ikc (pro operace nad seznamem)
         * @returns {TOperation} naplněná vstupní data pro operaci
         */
        function ToPredaniOperationDto<TDto extends Maj.Interface.GMajpidDto, TOperation extends Maj.Interface.GDokladMajPredaniOperationDto>(data: TDto[], model?: IGPredaniModel, ikc?: Gordic.General.GIkc | null): TOperation;
        /**
         * Vytvoření vstupních dat pro převzetí
         *
         * @param {TDto[]} data seznam dokladů
         * @param {IGPrevzetiModel} [model] vstupní parametry
         * @param {Gordic.General.GIkc | null} [ikc] ikc (pro operace nad seznamem)
         * @returns {TOperation} naplněná vstupní data pro operaci
         */
        function ToPrevzetiOperationDto<TDto extends Maj.Interface.GMajpidDto, TOperation extends Maj.Interface.GDokladMajPrevzetiOperationDto>(data: TDto[], model?: IGPrevzetiModel, ikc?: Gordic.General.GIkc | null): TOperation;
        /**
         * Vytvoření vstupních dat pro přidělení
         *
         * @param {TDto[]} data seznam dokladů
         * @param {IGPrideleniModel} [model] vstupní parametry
         * @param {Gordic.General.GIkc | null} [ikc] ikc (pro operace nad seznamem)
         * @returns {TOperation} naplněná vstupní data pro operaci
         */
        function ToPrideleniOperationDto<TDto extends Maj.Interface.GMajpidDto, TOperation extends Maj.Interface.GDokladMajPrideleniOperationDto>(data: TDto[], model?: IGPrideleniModel, ikc?: Gordic.General.GIkc | null): TOperation;
        /**
         * Vytvoření vstupních dat pro operaci přeevidenci
         *
         * @param {TDto[]} data seznam dokladů
         * @param {IGPreevidenceModel} [model] vstupní parametry
         * @param {Gordic.General.GIkc | null} [ikc] ikc (pro operace nad seznamem)
         * @returns {TOperation} naplněná vstupní data pro operaci
         */
        function ToPreevidenceOperationDto<TDto extends Maj.Interface.GMajpidDto, TOperation extends Maj.Interface.GDokladMajPreevidenceOperationDto>(data: TDto[], model?: IGPreevidenceModel, ikc?: Gordic.General.GIkc | null): TOperation;
        /**
         * Definice formuláře s parametry pro předání
         *
         * @param {string} ixsFunAkt aktuální fuknce
         * @param {string} ixsSu aktuální spisový uzel
         * @param {string | null} [ixpDen] kniha
         * @returns {Gordic.Forms.Form} form
         */
        function getFormPredani(ixsFunAkt: string, ixsSu: string, ixpDen?: string | null): Gordic.Forms.Form;
        /**
         * Definice formuláře s parametry pro převzetí
         *
         * @param {string} ixsFunAkt aktuální fuknce
         * @returns {Gordic.Forms.Form} form
         */
        function getFormPrevzeti(ixsFunAkt: string): Gordic.Forms.Form;
        /**
         * Definice formuláře s parametry pro přidělení
         *
         * @param {string} ixsFunAkt aktuální fuknce
         * @param {string} ixsSu aktuální spisový uzel
         * @param {string | null} [ixpDen] kniha
         * @returns {Gordic.Forms.Form} form
         */
        function getFormPrideleni(ixsFunAkt: string, ixsSu: string, ixpDen?: string | null): Gordic.Forms.Form;
        /**
         * Definice formuláře s parametry pro přeevidenci
         *
         * @param {number} typAg aktuální hodnota parametru eko_rad_dfken
         * @param {string} ico IČO
         * @param {string} ucs UCS
         * @param {string} ixsSu aktuální spisový uzel
         * @param {string | null} [ixpDen] kniha
         * @param {number | null} [eko_rad_dfken] aktuální hodnota parametru eko_rad_dfken
         * @returns {Gordic.Forms.Form} form
         */
        function getFormPreevidence(typAg: number, ico: string, ucs: string, ixsSu: string, ixpDen?: string | null, /*sml_rad_pfksto?: number | null,*/ eko_rad_dfken?: number | null): Gordic.Forms.Form;
    }
    /**
 * Sdílené metody MAJ pro práci s kartou
 *
 * @author Petr Vošta
 * @since 525.1
 */
    namespace MajKarta {
        function jsShowKarta(cnt: GContent, grid: JQuery, matAktPuvodni: any, row: Gordic.Maj.Interface.GMajmajDto | Gordic.Maj.Interface.GMajsiapDto | null | undefined, mode: number, samostatneOkno?: boolean, wizard?: MajGrid.openDetailWizardParams): void;
        interface IGHZKartaModel {
            mat_cis?: string | null;
            skp?: string | null;
            nazev?: string | null;
            mj?: string | null;
            newValues?: Interface.GMajmajDto | null;
        }
        /**
         * Vytvoření vstupních dat pro předání
         *
         * @param {TDto[]} data seznam karet
         * @param {IGHZKartaModel} [model] vstupní parametry
         * @param {Gordic.General.GIkc | null} [ikc] ikc (pro operace nad seznamem)
         * @returns {TOperation} naplněná vstupní data pro operaci
         */
        function ToHZKartaOperationDto<TDto extends Maj.Interface.GMajmajDto, TOperation extends Maj.Interface.GKartaMajOperationDto>(data: TDto[], model?: IGHZKartaModel, ikc?: Gordic.General.GIkc | null): TOperation;
        interface IGHZKartaVydejModel {
            typ_dok?: number | null;
            id_top?: string | null;
            dev?: number | null;
            ico_ext?: string | null;
            newValues?: Interface.GMajpidDto | null;
            topologie?: Interface.GTopologieDto | null;
            kod_poh?: number | null;
            id_poh?: string | null;
            dat_uup?: JsonDate | null;
            inv_cis_soub?: string | null;
        }
        /**
         * Vytvoření vstupních dat pro předání
         *
         * @param {TDto[]} data seznam karet
         * @param {IGHZKartaVydejModel} [model] vstupní parametry
         * @param {Gordic.General.GIkc | null} [ikc] ikc (pro operace nad seznamem)
         * @returns {TOperation} naplněná vstupní data pro operaci
         */
        function ToHZKartaVydejOperationDto<TDto extends Maj.Interface.GMajmajDto, TOperation extends Maj.Interface.GKartaVydejMajOperationDto>(data: TDto[], model?: IGHZKartaVydejModel, ikc?: Gordic.General.GIkc | null): TOperation;
        /**
      * Hromadné změny vybraných karet
      *
      * @returns {JQuery.Promise<any>} promise s operací
      * @param typ_dok typ dokladu
      */
        function hzVydej(cnt: GContent, typ_dok: number): JQuery.Promise<any>;
        /**
       * Vrátí seznam dokladů pro zobrazení v průvodcích pro hromadné operace
       *
       * @param {boolean} onlyChecked pouze zaškrtnuté řádky (true = ano, false = ne)
       * @param {boolean} withResults doplnění výsledků hromadné operace (true = ano, false = ne)
       * @param {Gordic.General.GIkc | Gordic.Maj.Interface.GMajmajDto[] | null} ikcOrData IKC nebo data (stačí PK)
       * @param {string[] | undefined} fragments fragmenty
       * @param {Gordic.Isl.GServiceGroupResponse<Gordic.Maj.Interface.GMajmajDto>} [response] výsledek hromadné operace
       * @returns {JQueryPromise<(Gordic.Eko.Components.MassOperationData<Gordic.Maj.Interface.GMajmajDto> | Gordic.Maj.Interface.GMajmajDto)[]>} seznam dokladů (s výsledky operace nebo bez podle parametru withResults)
       */
        function wizardGetData(gcontent: GContent, onlyChecked: boolean, withResults: boolean, ikcOrData: Gordic.General.GIkc | Gordic.Maj.Interface.GMajmajDto[] | null, fragments: string[] | undefined, response?: Gordic.Isl.GServiceGroupResponse<Gordic.Maj.Interface.GMajmajDto>): JQueryPromise<(Gordic.Eko.Components.MassOperationData<Gordic.Maj.Interface.GMajmajDto> | Gordic.Maj.Interface.GMajmajDto)[]>;
        /**
     * Průvodce nad seznamem karet <DTO operace, model parametrů>
     *
     * @param {MajWizard.MajWizardParams<TOperationDto, TModel, Maj.Interface.GMajmajDto> | MajWizard.MajWizardParamsPart<TOperationDto, TModel, Maj.Interface.GMajmajDto>} params část parametrů průvodce
     * @returns {JQuery.Promise<any>} promise s operací
     */
        function wizardTwoSteps<TOperationDto, TModel = null>(params: MajWizard.MajWizardParams<TOperationDto, TModel, Maj.Interface.GMajmajDto> | MajWizard.MajWizardParamsPart<TOperationDto, TModel, Maj.Interface.GMajmajDto>): JQuery.Promise<any>;
    }
    /**
     * Sdílené metody MAJ pro průvodce
     *
     * @author Petr Vošta
     * @since 490.1.0.75
     */
    namespace MajWizard {
        /**
         * Spojení dat a výsledku hromadné operace (přes zadané sloupce) do výsledku hromadné operace
         *
         * @param {T[]} data data
         * @param {Gordic.Isl.GServiceGroupResponse<T>} response výsledek hromadné operace (z dat jsou vyplněny jen primární klíče)
         * @param {string} keys primární klíč
         * @returns {Gordic.Isl.GServiceGroupResponse<T>} výsledek hromadné operace s daty
         */
        function joinDataAndResponseToIslGroupResponse<T extends Gordic.Maj.Interface.GMajSeznamDto>(data: T[], response: Gordic.Isl.GServiceGroupResponse<T>, keys: string): Gordic.Isl.GServiceGroupResponse<T>;
        /**
         * Občerství seznam a překontroluje data (oboje volitelně)
         *
         * @param {GContent} gcontent content
         * @param {boolean} reloadData mají se načíst aktuální data z databáze? (true = ano, false = ne)
         * @param {TDto[] | undefined} data data pro případ, že se nemají načítat z databáze (reloadData = false)
         * @param {Gordic.General.GIkc | null} ikc IKC
         * @param {(withResults: boolean, ikc: Gordic.General.GIkc | null)} getDataMethod metoda pro vrácení dat
         * @param {((dto: TOperationDto) => any) | undefined} checkMethod metoda pro kontrolu dat před operací (pokud není, nevolá se kontrola, jen se načtou aktuální data)
         * @param {((model: TModel | undefined, data: TDto[], ikc: Gordic.General.GIkc | null) => TOperationDto) | undefined} toOperationDto metoda pro vytvoření DTO operace (je potřeba jen pokud je metoda checkMethod)
         * @param {TModel | undefined} model parametry hromadné operace
         * @returns {JQueryPromise<Gordic.Eko.Components.MassOperationData<TDto>[]>} data pro seznam
         */
        function refreshAndCheckData<TOperationDto, TModel, TDto>(gcontent: GContent, reloadData: boolean, data: TDto[] | undefined, ikc: Gordic.General.GIkc | null, getDataMethod: (withResults: boolean, ikc: Gordic.General.GIkc | null) => any | undefined, checkMethod: ((dto: TOperationDto) => any) | undefined, toOperationDto: ((model: TModel | undefined, data: TDto[], ikc: Gordic.General.GIkc | null) => TOperationDto) | undefined, model: TModel | undefined): JQueryPromise<Gordic.Eko.Components.MassOperationData<TDto>[]>;
        /**
         * Vrátí seznam pro zobrazení v průvodcích pro hromadné operace
         *
         * @param {GContent} gcontent content
         * @param {boolean} onlyChecked pouze zaškrtnuté řádky (true = ano, false = ne)
         * @param {boolean} withResults doplnění výsledků hromadné operace (true = ano, false = ne)
         * @param {Gordic.General.GIkc | TDto[] | null} ikcOrData IKC nebo data (bude z nich použit jen PK)
         * @param {any} baseFilters filtry pro metodu listAction
         * @param {(any)} listAction ISL metoda pro dotažení seznamu
         * @param {(data: TDto[] | null)} modifyDataAction metoda pro úpravu dat
         * @param {Gordic.Isl.GServiceGroupResponse<TDto> | null | undefined} response (default = undefined) výsledek hromadné operace
         * @param {string | null | undefined} keys (default = undefined) primární klíč DTO, pokud je zadán response nebo data místo IKC (jinak není potřeba)
         * @param {string[]} fragments (default = undefined) fragmenty
         * @param {string} keysInFilters (default = undefined) primární klíč DTO ve filtrech, pokud je zadán response nebo data místo IKC (jinak není potřeba)
         * @returns {JQueryPromise<(Gordic.Eko.Components.MassOperationData<TDto> | TDto)[]>} data pro seznam (s výsledky operace nebo bez podle parametru withResults)
         */
        function getData<TDto extends Gordic.Maj.Interface.GMajSeznamDto>(gcontent: GContent, onlyChecked: boolean, withResults: boolean, ikcOrData: Gordic.General.GIkc | TDto[] | null, baseFilters: any, listAction: (any: any) => any, modifyDataAction: ((data: TDto[] | null) => JQueryPromise<TDto[]>) | undefined, response?: Gordic.Isl.GServiceGroupResponse<TDto>, keys?: string, fragments?: string[], keysInFilters?: string): JQueryPromise<(Gordic.Eko.Components.MassOperationData<TDto> | TDto)[]>;
        /**
         * Vrátí gridformat podle aktuálně viditelných sloupců
         *
         * @param {JQuery} $grid grid
         * @param {boolean} withoutExtColumns (default = true) bez sloupců mimo agendu (dokument, vlastnosti, ...)
         * @returns {Data.GridFormat<TDto>} gridformat
         */
        function getCurrentGridFormat<TDto>($grid: JQuery, withoutExtColumns?: boolean): Data.GridFormat<TDto>;
        /**
         * Vrátí seznam fragmentů z gridformatu
         *
         * @param {Gordic.Data.GridFormat<TDto>} gridFormat gridformat
         * @param {boolean} addDuct (default = false) připad i fragment duct?
         * @returns {string[]} seznam fragmentů
         */
        function getFragmentsFromGridFormat<TDto>(gridFormat: Gordic.Data.GridFormat<TDto>, addDuct?: boolean): string[];
        /**
         * Vrátí seznam fragmentů ze sloupců
         *
         * @param {GGridColumn<TDto>[]} columns seznam sloupců
         * @param {boolean} addDuct (default = false) připad i fragment duct?
         * @returns {string[]} seznam fragmentů
         */
        function getFragmentsFromGridColumns<TDto>(columns: GGridColumn<TDto>[], addDuct?: boolean): string[];
        /**
         * Aktualizace řádků v seznamu průvodce <TDto, TFilter>
         *
         * @param {(any) => any} listAction metoda pro vrácení dat z databáze (podle filterPK)
         * @param {TFilter} filterPK filtr pro aktualizaci dat
         * @param {any} $grid grid, který má být aktualizován
         */
        function reloadRows<TDto, TFilter>(listAction: (any: any) => any, filterPK: TFilter, $grid: JQuery): JQueryPromise<any>;
        /**
         * Ukončení průvodce
         *
         * @param {GContent} gcontent content
         * @param {Gordic.General.GIkc | null} ikc IKC
         * @param {boolean} complete průvodce doběhl do konce (true) nebo byl přerušen (false)
         * @param {Gordic.Sml.Globals.Types.CallNavigateOptionsType} [options] další vlastnosti
         * @param {GAction} [callingAction] volající akce (pokud je zadána, je na ní po ukončení průvodce indikován výsledek, jestli průvodce doběhl do konce nebo ne)
         * @returns {JQueryPromise<boolean>}
         */
        function wizardEnd(gcontent: GContent, grid: JQuery, ikc: Gordic.General.GIkc | null, complete: boolean, options?: Gordic.Maj.Globals.Types.CallNavigateOptionsType, callingAction?: GAction): JQueryPromise<any>;
        /**
         * Parametry průvodce
         *
         * @author Martin Boček
         * @since 490.1.0.77
         */
        interface MajWizardParams<TOperationDto, TModel, TDto extends Gordic.Maj.Interface.GMajSeznamDto> {
            /**
             * id contentu pro uživatelské nastavení
             * @type {string}
             */
            id?: string;
            /**
             * texty
             * @type {{}}
             */
            texts: {
                /**
                 * titulek (v breadcrumbu)
                 * @type {string}
                 */
                title: string;
                /**
                 * popis prvního kroku průvodce (pro tříkrokového i pro druhý krok a je podporována metoda, nejen string)
                 * @type {string | ((step: number, model: TModel | undefined) => any)}
                 */
                description?: string | ((step: number, model: TModel | undefined) => any);
                /**
                 * nadpis tabu s formulářem parametrů prvního kroku průvodce
                 * @type {string}
                 */
                formTabTitle?: string;
                /**
                 * titulek nad gridem prvního kroku průvodce
                 * @type {string}
                 */
                gridTabTitle?: string;
                /**
                 * název akce operace
                 * @type {string}
                 */
                operationAction: string;
            };
            /**
             * seznam
             * @type {{}}
             */
            grid: {
                /**
                 * gridformát seznamu
                 * @type {Data.GridFormat<TDto>}
                 */
                format: Data.GridFormat<TDto>;
                /**
                 * primární klíč seznamu (seznam sloupců oddelených čárkami)
                 * @type {string}
                 */
                keys: string;
                /**
                 * profil (sloupce) seznamu
                 * @type {GridProfile<TDto>}
                 */
                profile?: GridProfile<TDto>;
            };
            /**
             * parametry hromadné operace
             * @type {{}}
             */
            parameters: {
                /**
                 * formulář parametrů operace
                 * @type {Forms.Form}
                 */
                form?: Forms.Form;
                /**
                 * formulář pro druhý krok ve tříkrokovém průvodci
                 * @type {Forms.Form}
                 */
                form2?: Forms.Form;
                /**
                 * model parametrů operace
                 * @type {TModel}
                 */
                model?: TModel;
                /**
                 * delegát pro vytvoření DTO operace
                 * @type {(model: TModel | undefined, data: TDto[], ikc: Gordic.General.GIkc | null) => TOperationDto}
                 */
                toOperationDto: (model: TModel | undefined, data: TDto[], ikc: Gordic.General.GIkc | null) => TOperationDto;
                /**
                 * delegát pro změny parametrů
                 * @type {any}
                 */
                delegateFieldChange?: any;
                /**
                 * bez kontroly při spuštění průvodce (pouze pro dvoukrokového průvodce)
                 * @type {boolean}
                 */
                withoutPreCheck?: boolean;
                /**
                * zda odškrtnout všechna zatržítka po loadu prvního kroku (i když se vyhodnotí jako OK)
                * @type {boolean}
                */
                uncheckFirstStep?: boolean;
            };
            /**
             * akce / delegáty
             * @type {{}}
             */
            actions: {
                /**
                 * metoda pro vrácení dat
                 * @type {(withResults: boolean, ikcOrData: Gordic.General.GIkc | TDto[] | null, response?: Gordic.Isl.GServiceGroupResponse<TDto>) => any}
                */
                getData: (withResults: boolean, ikcOrData: Gordic.General.GIkc | TDto[] | null, response?: Gordic.Isl.GServiceGroupResponse<TDto>) => any;
                /**
                 * delegát pro kontrolu dat před operací
                 * @type {(dto: TOperationDto) => any}
                 */
                islCheckBeforeOperation: (dto: TOperationDto) => any;
                /**
                 * delegát pro provedení operace
                 * @type {(dto: TOperationDto) => any}
                 */
                islOperation: (dto: TOperationDto) => any;
                /**
                 * metoda pro obsluhu tlačítka Detail
                 * @type {(cnt: GContent, ctx: any, ikc: Gordic.General.GIkc | null, model: TModel, aktRadek: TDto, $grid: JQuery, check: boolean, setActiveOperation?: () => any) => any}
                 * @default > any) => any)
                 */
                menuGridDetail?: (cnt: GContent, ctx: any, ikc: Gordic.General.GIkc | null, model: TModel, aktRadek: TDto, $grid: JQuery, check: boolean, setActiveOperation?: () => any) => any;
            };
            /**
             * ukončení průvodce
             * @type {{}}
             */
            end?: {
                /**
                 * volat metodu actionReloadListAfterFinish i při zrušení průvodce?
                 * @type {boolean}
                 */
                callReloadListInCancel?: boolean;
                /**
                 * metoda pro aktualizaci původního seznamu (po úspěšném ukončení průvodce)
                 * @type {() => any}
                 */
                reloadListAfterFinish?: () => any;
                /**
                 * volající akce (pokud je zadána, je na ní po ukončení průvodce indikován výsledek, jestli průvodce doběhl do konce nebo ne)
                 * @type {GAction}
                 */
                callingAction?: GAction;
            };
            /**
             * content kartoteky majetku (wizard totiž může být volán ze samostatné karty)
             * @type {GKartotekaMajetku}
             */
            kartotekaMajetku?: GKartotekaMajetku;
        }
        /**
         * Parametry průvodce (pomocný interface s některými nepovinnými položkami)
         *
         * @author Martin Boček
         * @since 490.1.0.77
         */
        interface MajWizardParamsPart<TOperationDto, TModel, TDto extends Gordic.Maj.Interface.GMajSeznamDto> extends Omit<MajWizardParams<TOperationDto, TModel, TDto>, "actions" | "grid"> {
            /**
             * akce / delegáty
             * @type {{}}
             */
            actions: {
                /**
                 * metoda pro vrácení dat
                 * @type {(withResults: boolean, ikc: Gordic.General.GIkc, response?: Gordic.Isl.GServiceGroupResponse<TDto>) => any}
                 */
                getData?: (withResults: boolean, ikc: Gordic.General.GIkc, response?: Gordic.Isl.GServiceGroupResponse<TDto>) => any;
                /**
                 * delegát pro kontrolu dat před operací
                 * @type {(dto: TOperationDto) => any}
                 */
                islCheckBeforeOperation: (dto: TOperationDto) => any;
                /**
                 * delegát pro provedení operace
                 * @type {(dto: TOperationDto) => any}
                 */
                islOperation: (dto: TOperationDto) => any;
                /**
                 * metoda pro obsluhu tlačítka Detail
                 * @type {(cnt: GContent, ctx: any, ikc: Gordic.General.GIkc, model: TModel, aktRadek: TDto, $grid: JQuery, check: boolean, setActiveOperation?: () => any) => any}
                 * @default > any) => any)
                 */
                menuGridDetail?: (cnt: GContent, ctx: any, ikc: Gordic.General.GIkc, model: TModel, aktRadek: TDto, $grid: JQuery, check: boolean, setActiveOperation?: () => any) => any;
            };
        }
        /**
         * Obecná metoda pro dvoukrokového průvodce nad tabulkou wfltpre <DTO operace, model parametrů, DTO>
         *
         * @param {GContent} gcontent content
         * @param {MajWizardParams<TOperationDto, TModel, TDto>} params parametry průvodce
         * @returns {JQuery.Promise<any>} promise s operací
         */
        function wizardTwoStepsWithTpre<TOperationDto, TModel, TDto extends Gordic.Maj.Interface.GMajSeznamDto>(gcontent: GKnihaDokladu, grid: JQuery, params: MajWizardParams<TOperationDto, TModel, TDto>): JQuery.Promise<any>;
        /**
         * Obecná metoda pro dvoukrokového průvodce. nepoužívá pomocnou tabulku wfltpre
         *
         * @param {GContent} gcontent content
         * @param {MajWizardParams<TOperationDto, TModel, TDto>} params parametry průvodce
         * @returns {JQuery.Promise<any>} promise s operací
         */
        function wizardTwoSteps<TOperationDto, TModel, TDto extends Gordic.Maj.Interface.GMajSeznamDto>(gcontent: GContent, // GHromadneZmenyInterface GKnihaDokladu|GKartotekaMajetku,
        grid: JQuery, params: MajWizardParams<TOperationDto, TModel, TDto>): JQuery.Promise<any>;
        function wizardThreeSteps<TOperationDto, TModel, TDto extends Gordic.Maj.Interface.GMajSeznamDto>(gcontent: GContent, grid: JQuery, params: MajWizardParams<TOperationDto, TModel, TDto>): JQuery.Promise<any>;
    }
}
