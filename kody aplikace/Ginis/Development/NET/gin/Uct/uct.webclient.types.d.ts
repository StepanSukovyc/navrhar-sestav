/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       uct.webclient.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Uct.WebClient\Gordic.Uct.WebClient.csproj
*    created     2026-02-16 14:34:32
*    files       GMainApp.d.ts
*                Dto\GAlgoritmusKRReturnDto.d.ts
*                Dto\GKurzRozdilyDefDto.d.ts
*                Dto\GPodaniDto.d.ts
*                Dto\GPristupnostPolozekDto.d.ts
*                Dto\GSeznamDokladuContentDto.d.ts
*                Dto\GSeznamDokladuPermissionsDto.d.ts
*                Objekty\Agenda\GUctAgenda.d.ts
*                Objekty\Common\Globals.d.ts
*                Objekty\Common\GUctCommonDetailSeznam.d.ts
*                Objekty\Dialogy\GUctDanovaKalkulacka.d.ts
*                Objekty\Dialogy\GUctKurzoveRozdilyDlg.d.ts
*                Objekty\Doklad\GUctDetail.d.ts
*                Objekty\Doklad\GUctDetailDokladu.d.ts
*                Objekty\Doklad\GUctDetail_metody.d.ts
*                Objekty\Doklad\GUctVyberPredkontace.d.ts
*                Objekty\HledaniDokladu\GUctHledaniDokladu.d.ts
*                Objekty\Knihy\GUctDokladKnihy.d.ts
*                Objekty\Knihy\GUctKnihy.d.ts
*                Objekty\Knihy\GUctSeznamKnih.d.ts
*                Objekty\Ostatni\DashBoard\GDashboard.d.ts
*                Objekty\Pruvodci\GUctHromadneOperace_Metody.d.ts
*                Objekty\Pruvodci\GUctHromadneZauctovani.d.ts
*                Objekty\Pruvodci\GUctHromadneZauctovaniDlg.d.ts
*                Objekty\Pruvodci\GUctOperaceImport.d.ts
*                Objekty\Seznam\GUctDetailPreview.d.ts
*                Objekty\Seznam\GUctSeznam.d.ts
*                Objekty\Seznam\GUctSeznam_filtry.d.ts
*                Objekty\Seznam\GUctSeznam_metody.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\GMainApp.d.ts 

declare namespace Gordic.Uct.WebClient {
    /**
     * Hlavní content UCT
     *
     * @author Tomas Kares
     * @since 484.1.0.15
     */
    class GMainApp extends GContentBase {
        PovolitGenerovaniPiduDokladu: boolean;
        PovoleniNulVPredkontaci: Gordic.Uct.Interface.GEPovoleniNulVPredkontace;
        IxsRoz: string;
        IxsSax: string;
        ixsFun: string;
        onContentReady(): void;
        evidenceDelegate(obj: {
            pids: string[];
            typAg: number;
        }): JQuery.PromiseBase<any, any, any, any, any, any, any, any, any, any, any, any>;
        /**
         * evidovat
         *
         * @param {GContent} content
         * @param {{ pids: string[]} obj
         * @param {Eko.Interface.GEkosdenDto} kniha
         * @param {ObjectLiteral<any> & { ixp_den: string} noveGpc
         * @param {Gordic.Uct.Interface.GUctDokladPodaniRequestDto} [vstup]
         * @param {any | undefined | null} [def]
         * @returns {JQueryPromise<any>}
         */
        private evidovat;
        /**
         * Formular voleb
         * @returns
         */
        private UctUserSettingsVolby;
        /**
         * Formular pro predplnene hodnoty
         * @returns
         */
        private UctUserSettingsPreFilledValues;
        /**
         * Otevření kartotéky externích subjektů
         */
        kartotekaEsu(): void;
        /**
         * Otevreni uzaverky agendy
         *
         * */
        openUzaverkaAgenda(agenda: any): void;
        /**
         * Otevreni uzaveky knih
         * */
        openUzaverkaKnihy(): void;
    }
    /**
     * Vytvoří provider pro počty pohybů k účtování
     *
     * @param {GContent} gcontent content
     * @returns {Gordic.Dashboard.CustomProvider} provider s počty
     */
    function createStatKnihy(gcontent: GContent): Gordic.Dashboard.CustomProvider;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Dto\GAlgoritmusKRReturnDto.d.ts 

declare namespace Gordic.Uct.WebClient {
    /**Data pro predavani pri akci uzavreni (seznam vybranych pidu)*/
	interface GAlgoritmusKRReturnDto {
        /**Typ kurzovych rodilu*/
		TypKurzRozdilu?: Gordic.Uct.Interface.GETypKurzovychRozdilu|null;
        /**Typ kurzovych rodilu*/
		PristupnostSmlouvy?: Gordic.Uct.Interface.GEPristupnostSmlouvy|null;
        /**PIK*/
		Pik?: number|null;
        /**Castka*/
		Hodnota?: JsonDecimal|null;
        /**Je povinna smlouva u KR*/
		KurzoveRozdilyPovinnaSmlouvaZRP?: boolean|null;
	}
	const enum GAlgoritmusKRReturnDtoNames { TypKurzRozdilu = "TypKurzRozdilu", PristupnostSmlouvy = "PristupnostSmlouvy", Pik = "Pik", Hodnota = "Hodnota", KurzoveRozdilyPovinnaSmlouvaZRP = "KurzoveRozdilyPovinnaSmlouvaZRP",}
	const enum GAlgoritmusKRReturnDtoFragments { TypKurzRozdilu = "*", PristupnostSmlouvy = "*", Pik = "*", Hodnota = "*", KurzoveRozdilyPovinnaSmlouvaZRP = "*",}
	const enum GAlgoritmusKRReturnDtoTypes { TypKurzRozdilu = "Gordic.Uct.Interface.GETypKurzovychRozdilu", PristupnostSmlouvy = "Gordic.Uct.Interface.GEPristupnostSmlouvy", Pik = "number", Hodnota = "JsonDecimal", KurzoveRozdilyPovinnaSmlouvaZRP = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Dto\GKurzRozdilyDefDto.d.ts 

declare namespace Gordic.Uct.WebClient {
    /**Definice kurzovych rozdilu*/
	interface GKurzRozdilyDefDto {
        /**1 Účtuje se o kurzové ztrátě při realizaci výdaje (debetu)?*/
		KZRV?: boolean|null;
        /**2 Jedná se o opravu kurzové ztráty při realizaci výdaje (debetu)?*/
		OKZRV?: boolean|null;
        /**3 Účtuje se o kurzové ztrátě při realizaci příjmu (kreditu)?*/
		KZRP?: boolean|null;
        /**4 Jedná se o opravu kurzové ztráty při realizaci příjmu (kreditu)?*/
		OKZRP?: boolean|null;
        /**5 Jedná se o opravu kurzového zisku?*/
		OKZ?: boolean|null;
        /**6 Jedná se o jiný výdaj?*/
		JV?: boolean|null;
	}
	const enum GKurzRozdilyDefDtoNames { KZRV = "KZRV", OKZRV = "OKZRV", KZRP = "KZRP", OKZRP = "OKZRP", OKZ = "OKZ", JV = "JV",}
	const enum GKurzRozdilyDefDtoFragments { KZRV = "*", OKZRV = "*", KZRP = "*", OKZRP = "*", OKZ = "*", JV = "*",}
	const enum GKurzRozdilyDefDtoTypes { KZRV = "boolean", OKZRV = "boolean", KZRP = "boolean", OKZRP = "boolean", OKZ = "boolean", JV = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Dto\GPodaniDto.d.ts 

declare namespace Gordic.Uct.WebClient {
    /**Data pro predavani pri akci PODANI*/
    interface GPodaniDto {
        /**Zprava*/
        TransMessage?: Gordic.Eko.Interface.GTransferMessage|null;
        /**Pid dokladu*/
        PidDokladu?: string|null;
        /**Zda jiz doklad existuje (uzivatel zvolil jiz existujici doklad)*/
        DokladJizExistuje?: boolean|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Dto\GPristupnostPolozekDto.d.ts 

declare namespace Gordic.Uct.WebClient {
	/**DTO predavane evidenci pristupnosti polozek menu*/
	interface GPristupnostPolozekDto {
		/**Tooltip*/
		ToolTip?: string|null;
		/**Nezav menu*/
		Title?: string|null;
		/**Nezav menu*/
		Icon?: string|null;
		/**Viditelnost akce*/
		Visible?: boolean|null;
		/**Povoleni akce*/
		Enabled?: boolean|null;
	}
	const enum GPristupnostPolozekDtoNames { ToolTip = "ToolTip", Title = "Title", Icon = "Icon", Visible = "Visible", Enabled = "Enabled",}
	const enum GPristupnostPolozekDtoFragments { ToolTip = "*", Title = "*", Icon = "*", Visible = "*", Enabled = "*",}
	const enum GPristupnostPolozekDtoTypes { ToolTip = "string", Title = "string", Icon = "string", Visible = "boolean", Enabled = "boolean",}
	const enum GPristupnostPolozekDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Dto\GSeznamDokladuContentDto.d.ts 

declare namespace Gordic.Uct.WebClient {
    /**DTO predavane do seznamu dokladu v js*/
	interface GSeznamDokladuContentDto {
        /**Seznam dokladu*/
		Seznam: Gordic.Uct.Interface.GUctSeznamDokladuDto;
        /**Povoleni akci*/
		Permissions: Gordic.Uct.Interface.GUctDokladPermissionsSeznam;
	}
	const enum GSeznamDokladuContentDtoNames { Seznam = "Seznam", Permissions = "Permissions",}
	const enum GSeznamDokladuContentDtoFragments { Seznam = "*", Permissions = "*",}
	const enum GSeznamDokladuContentDtoTypes { Seznam = "Gordic.Uct.Interface.GUctSeznamDokladuDto", Permissions = "Gordic.Uct.Interface.GUctDokladPermissionsSeznam",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Dto\GSeznamDokladuPermissionsDto.d.ts 

declare namespace Gordic.Uct.WebClient {
    /**DTO pri pristupnost akci na seznamu*/
	interface GSeznamDokladuPermissionsDto {
        /**Povoleni hromadneho zauctovani*/
		PovoleniHromadneZauctovani?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni hromadne kontroly metadat*/
		PovoleniHromadneKontrolyMetadat?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni uzavreni dokladu*/
		PovoleniHromadnehoUzavreniVsech?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni uzavreni vybranych dokladu*/
		PovoleniHromadnehoUzavreniVybranych?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni podani*/
		PovoleniPodani?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni vazeb dokladu*/
		PovoleniVazebDokladu?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni predani*/
		PovoleniPredani?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni prideleni*/
		PovoleniPrideleni?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni prevzeti*/
		PovoleniPrevzeti?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni preevidence*/
		PovoleniPreevidence?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni klicova slova*/
		PovoleniKlicovaSlova?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni oznacit doklad precteny*/
		PovolenOznacitPrectene?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni oznacit doklad neprecteny*/
		PovolenOznacitNeprectene?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni uzaverky knih*/
		PovolenUzaverkyKnih?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni uzaverky aktualni knihy*/
		PovolenUzaverkyKniha?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni uzaverky agenda*/
		PovolenUzaverkyAgenda?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
        /**Povoleni uzaverky znovuotevreni vybrane knihy*/
		PovolenUzaverkyOtevreniKnihy?: Gordic.Uct.WebClient.GPristupnostPolozekDto|null;
	}
	const enum GSeznamDokladuPermissionsDtoNames { PovoleniHromadneZauctovani = "PovoleniHromadneZauctovani", PovoleniHromadneKontrolyMetadat = "PovoleniHromadneKontrolyMetadat", PovoleniHromadnehoUzavreniVsech = "PovoleniHromadnehoUzavreniVsech", PovoleniHromadnehoUzavreniVybranych = "PovoleniHromadnehoUzavreniVybranych", PovoleniPodani = "PovoleniPodani", PovoleniVazebDokladu = "PovoleniVazebDokladu", PovoleniPredani = "PovoleniPredani", PovoleniPrideleni = "PovoleniPrideleni", PovoleniPrevzeti = "PovoleniPrevzeti", PovoleniPreevidence = "PovoleniPreevidence", PovoleniKlicovaSlova = "PovoleniKlicovaSlova", PovolenOznacitPrectene = "PovolenOznacitPrectene", PovolenOznacitNeprectene = "PovolenOznacitNeprectene", PovolenUzaverkyKnih = "PovolenUzaverkyKnih", PovolenUzaverkyKniha = "PovolenUzaverkyKniha", PovolenUzaverkyAgenda = "PovolenUzaverkyAgenda", PovolenUzaverkyOtevreniKnihy = "PovolenUzaverkyOtevreniKnihy",}
	const enum GSeznamDokladuPermissionsDtoFragments { PovoleniHromadneZauctovani = "*", PovoleniHromadneKontrolyMetadat = "*", PovoleniHromadnehoUzavreniVsech = "*", PovoleniHromadnehoUzavreniVybranych = "*", PovoleniPodani = "*", PovoleniVazebDokladu = "*", PovoleniPredani = "*", PovoleniPrideleni = "*", PovoleniPrevzeti = "*", PovoleniPreevidence = "*", PovoleniKlicovaSlova = "*", PovolenOznacitPrectene = "*", PovolenOznacitNeprectene = "*", PovolenUzaverkyKnih = "*", PovolenUzaverkyKniha = "*", PovolenUzaverkyAgenda = "*", PovolenUzaverkyOtevreniKnihy = "*",}
	const enum GSeznamDokladuPermissionsDtoTypes { PovoleniHromadneZauctovani = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovoleniHromadneKontrolyMetadat = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovoleniHromadnehoUzavreniVsech = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovoleniHromadnehoUzavreniVybranych = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovoleniPodani = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovoleniVazebDokladu = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovoleniPredani = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovoleniPrideleni = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovoleniPrevzeti = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovoleniPreevidence = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovoleniKlicovaSlova = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovolenOznacitPrectene = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovolenOznacitNeprectene = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovolenUzaverkyKnih = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovolenUzaverkyKniha = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovolenUzaverkyAgenda = "Gordic.Uct.WebClient.GPristupnostPolozekDto", PovolenUzaverkyOtevreniKnihy = "Gordic.Uct.WebClient.GPristupnostPolozekDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Agenda\GUctAgenda.d.ts 

declare namespace Gordic.Uct.WebClient {
    class GUctAgenda extends GContentBase {
        private $grid;
        protected loadingData: boolean;
        private Permissions;
        protected data: Interface.GUctAgendaDto[];
        /**
         * task pro seznam
         * */
        protected taskList: Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<any>>;
        protected $filterPanel: JQuery;
        onContentReady(): void;
        /**
            * Hromadne operace
            *
            * function HromadneOperace
            *
            *
            *
            */
        private hromadneOperace;
        /**
         * Znovunacteni dat
         *
         * */
        protected reload(): void;
        /**
         * Vytvoreni gridu
         * */
        private createGrid;
        /**
         * Vytvoreni gridformatu
         * */
        private createGridFormat;
        /**
         * Nastaveni pristupnosti akci dle stavu a prav formulare
         *
         * */
        private nastaveniPristupnosti;
        /**
         * Vytvoreni akci
         * */
        private createAction;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Common\Globals.d.ts 

declare namespace Gordic.Uct {
    interface GHromadneOperace<TRow> extends IGContentBase {
        successClose: boolean;
        /**
         *  Vysledny seznam radku po uzavreni
         *  checkedRows
         * @type {JQuery}
         */
        resultRows: TRow[];
        badgeAll: GObservableObject<GBadgeOptions>;
        badgeSuccess: GObservableObject<GBadgeOptions>;
        badgeWarning: GObservableObject<GBadgeOptions>;
        badgeError: GObservableObject<GBadgeOptions>;
        $grid: JQuery;
        Pruvodce: Wizard;
        GlobalSetup: Gordic.Uct.Interface.GUctGlobalDto;
        actAll: GAction;
        actSuccess: GAction;
        actWarning: GAction;
        actError: GAction;
        /**
         * vybrane zapisy
         * @type {GUctSeznamDokladuDto}
         */
        selectedRows: TRow[];
        myStatusBar: JQuery;
    }
    type GHromadneOperaceType<T> = {
        new (): GHromadneOperace<T>;
    };
    interface GHromadneOperaceDialog {
        getFormData(): any;
    }
    type GHromadneOperaceDialogType = {
        new (): GHromadneOperaceDialog;
    };
    interface GPruvodceOperace extends IGContentBase {
        successClose: boolean;
        Pruvodce: Wizard;
        GlobalSetup: Gordic.Uct.Interface.GUctGlobalDto;
    }
}
declare namespace Gordic.Uct.Utils {
    function registerSearchResolvers(): void;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Common\GUctCommonDetailSeznam.d.ts 

declare namespace Gordic.Uct.WebClient {
    interface IGPreevidenceModel {
        duvod: string | null | undefined;
        ixp_den: string | null;
        ixs_fun_akt: string | null;
        ixs_ref: string | null;
        cis_real: string | null;
        ixs_fun_vyriz: string | null;
        ixs_su: string | null;
        subrada: number | null;
    }
    /**
     * Otevreni detailu noveho dokladu - nova verze s oddelenim dokladu od dokumentu
     * @param content
     * @param podaniDto
     */
    function NovyDoklad(content: GContent, podaniDto?: Gordic.Uct.Interface.GUctDokladPodaniRequestDto): any;
    /**
    *  Podani dokladu
    * @param {GContent} content
    */
    function PodaniDokladu(content: Gordic.Uct.WebClient.Detail.GUctDetail | Gordic.Uct.WebClient.Seznam.GUctSeznam, podaniDto?: Gordic.Uct.Interface.GUctDokladPodaniRequestDto): any;
    /***
    * Nacteni parametru zadanych uzivatelem
    * */
    function HromadnaOperaceGetParam(/*action: Gordic.Uct.Interface.GEUctHromadneOperace,*/ dialogs: GDlgNamespace, wiz: JQuery<HTMLElement>, vybraneDoklady: Gordic.Uct.Interface.GUctVybranyDokladDto[]): JQueryPromise<Gordic.Uct.Interface.GUctDokladPredattHromadneRequestDto>;
    /**
     * Preevidovat formular
     * @param content
     */
    function HromadnaOperaceform(action: Gordic.Uct.Interface.GEUctHromadneOperace, content: Gordic.Uct.WebClient.Detail.GUctDetail | Gordic.Uct.WebClient.Detail.GUctDetailDokladu | Gordic.Uct.WebClient.Seznam.GUctSeznam, ixp_den: string | null): Gordic.Forms.Form;
    /**
     * Rucni zadani pidu (zobrazeni WFL okna)
     * @param content
     * @param parametr
     * @returns
     */
    function ZobrazVyberPidu(content: GContent): JQueryPromise<GPodaniDto | undefined | null>;
    /**
     * vstupni parametry pro otevreni okna detailu
     */
    type GZobrazeniDetailuParam = {
        content: GContent;
        newMode?: boolean;
        ixp: string | null;
        /**
         * otevrit v samostatnem okne (false)
         */
        samostaneOkno?: boolean;
        /**
         * rezim editace (false)
         */
        editace?: boolean;
        grid?: JQuery<HTMLElement>;
        objekt?: string;
        ixpDen?: string;
        /**
         * zobrazit položky dokladu (false)
         */
        polozky?: boolean;
    };
    function ZobrazDetailDleIXP(vstup: GZobrazeniDetailuParam): void;
    /**
     * Zobrazeni okna s detailem dokumentu dle zadaneho pidu
     * @param {GContent} content - kontent
     * @param {string|null} ixp  - pid dokladu
     * @param {boolean} samostaneOkno
     * @param {boolean} editace - rezim editace
     * @param {JQuery<HTMLElement>} grid - objekt seznamoveho gridu
     * @param {string} objekt - nazev objektu detailu
     * @param {string} ixpDen - identifikator knihy
     */
    function ZobrazDetailDleIXPOld(content: GContent, ixp: null | string, samostaneOkno?: boolean, editace?: boolean, grid?: JQuery<HTMLElement> | undefined, objekt?: string, ixpDen?: string, polozky?: boolean): void;
    function OznacitDoklady(content: GContent, prectene: boolean, oznaceneRadky: any): JQueryPromise<any>;
    function VazbyDokladu(content: GContent, ucetniDoklad: Gordic.Eko.Interface.GUctspidDto, viewMode: boolean): JQuery.Promise<any, any, any>;
    /**
     * Otevření detailu v primární agendě (v jiné záložce)
     *
     * @param {number | undefined | null} typAg primární agenda
     * @param {string | undefined | null} id1 id detailu v primární agendě (PID a pod.)
     * @param {string | undefined | null} [id2] doplňující id detailu v primární agendě (PID a pod.)
     * @param {string | undefined | null} [id3] další doplňující id detailu v primární agendě (PID a pod.)
    */
    function openDetailInOtherTab(typAg: number | undefined | null, id1: string | undefined | null, id2?: string | undefined | null, id3?: string | undefined | null): JQuery.Promise<any>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Dialogy\GUctDanovaKalkulacka.d.ts 

declare namespace Gordic.Uct.WebClient {
    interface IGObdobiDPH {
        Mesic: number;
        Rok: number;
        Value: JsonDecimal;
    }
    class GUctDanovaKalkulacka extends GContentBase implements IGClientContent {
        private recapDPH;
        private returnValue;
        private myForm;
        private datPole?;
        prepareContent(par: IGObdobiDPH): void;
        /**
         * Inicializace hodnot
         * */
        inicializace(): void;
        /**
         * vyber hodnoty
         * */
        private vyberHodnoty;
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Dialogy\GUctKurzoveRozdilyDlg.d.ts 

declare namespace Gordic.Uct.WebClient {
    class GUctKurzoveRozdilyDlg extends GContentBase implements IGClientContent {
        private inputParams;
        private PristupnostSmlouvy;
        private TypKurzovychRozdilu;
        private actionOk;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        private mapper;
        prepareContent(par: GAlgoritmusKRReturnDto): void;
        /**
         * Inicializace hodnot
         * */
        inicializace(): void;
        /**
         * setRightKurzovyRozdil
         *
         * @returns {Gordic.Uct.Interface.GETypKurzovychRozdilu}
         */
        setRightKurzovyRozdil(): void;
        getFormData(): GAlgoritmusKRReturnDto;
        closing(): JQueryPromise<any>;
        /**
         *  Schovani vsech voleb
         *
         * */
        hideAll(): void;
        /**
         * hideBySelector
         *
         * @param {string} [selector]
         */
        hideBySelector(selector: string | number): void;
        /**
         * Zobrazeni selectoru
         *
         * @param {string} selector
         */
        showBySelector(selector: string | number): void;
        /**
         * findSelector
         *
         * @param {string} [selector]
         */
        findSelector(selector: string | number): JQuery<HTMLElement> | null;
        /**
         * NastaveniVysledkuVyberu
         */
        NastaveniVysledkuVyberu(): void;
        /**
         *
         *
         * @param {string} name
         * @param {boolean} value
         */
        ChangeRadio(name: string, value: boolean | number): void;
        /**
         * DisplayResult
         *
         * @param {string} textKR
         * @param {string} textSML
         */
        DisplayResult(textKR: string, textSML: string): void;
        NastavPristupnostSmlouvyDleKR(typKurzovychRozdilu: Gordic.Uct.Interface.GETypKurzovychRozdilu): void;
        /**
         * GetTextKurzRozdilu
         *
         * @param {Interface.GETypKurzovychRozdilu} typKruzRoz
         * @returns {string}
         */
        GetTextKurzRozdilu(typKruzRoz: Interface.GETypKurzovychRozdilu): string;
        /**
         * GetTextPristupnostSmlouvy
         *
         * @param {Interface.GEPristupnostSmlouvy} pristunostSmlouvy
         */
        GetTextPristupnostSmlouvy(pristunostSmlouvy: Interface.GEPristupnostSmlouvy): "jres:30250418" | "jres:30250419" | "jres:30250420" | "jres:30250421" | "jres:30250422";
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Doklad\GUctDetail.d.ts 

declare namespace Gordic.Uct.WebClient.Detail {
    type DtoType = Gordic.Uct.Interface.GUctDokladDto;
    type UsedComponents = Gordic.Gin.DetailBuilderComponents.GListControlsExtensions<DtoType> & Gordic.Gin.DetailBuilderComponents.GinDescPropsExtensions & Gordic.Ssl.DetailBuilderComponents.SslProfilDokumentEkoComponentContentExtensionsPublic;
    class GUctDetail extends GDetailBuilderContent<UsedComponents> implements IGContent, /* Gordic.Wfl.WebClient.GWflFKSeznamExtension,*/ Gordic.Eko.WebClient.GEkoSchvalFKSeznamExtension {
        Ixp: string;
        UcetniDokladDto: Gordic.Uct.Interface.GUctDokladDto;
        UcetniDokladDtoOrigin: Gordic.Uct.Interface.GUctDokladDto | null;
        /**
         * Atribut rozsirene ucetni vety
         */
        rozsirenaVeta: boolean;
        MesicPred: number;
        DenPred: number;
        /**
         *  Validatory
         * */
        docValidators: any;
        castkyEnable: boolean;
        /**
         * Pridan novy radek
         * */
        newRowStart: boolean;
        currentColumnName: string;
        changeProfile: boolean;
        EditaceZapisu: boolean;
        EditRadekZ: number | undefined | null;
        SavingRow: boolean;
        refreshDocuments: Interface.GUctSeznamDokladuDto[];
        /**
         * editace hlavicky
         * */
        EditaceHlavicky: boolean;
        polozky: boolean;
        PredvyplneniDatumu: Interface.GEPredvyplneniDatumu;
        PolozkyView: number;
        InterniDoklad: number;
        Globals: Gordic.Uct.Interface.GUctGlobalDto;
        currentRadekZ: number;
        OwnActions: (GActionParams | GAction)[] | ObjectLiteral<GActionParamsDefObj>;
        /**
         * Definice zalozek
         * */
        myTabs: {
            head: string | undefined;
            rows: string;
        };
        /**
         *  Pole KPI
         * */
        kpiTest: GObservableObject<GKpiItemOptions>[];
        /**
         *  Aktualni radek
         * */
        CurrentRow: Interface.GUctdpepDto;
        /**
         * Aktualni view
         *
         * */
        CurrentDataView: any;
        preFillInProgress: boolean;
        vyrovnavam: boolean;
        /**
         * Rezim zobrazeni dokladu
         * */
        /**
         * Parametry akce Opravit
         * @type {GActionParamsDefObj}
         */
        actionOpravitHlavicku: GActionParamsDefObj;
        /**
         * Parametry akce Zrušit změny
         * @type {GActionParamsDefObj}
         */
        actionZrusitZmenyHlavicky: GActionParamsDefObj;
        /**
         * Aktuální spisový uzel
         * @type {string}
         */
        readonly IxsSu: string;
        /**
         * Selector pro otevreni textu z rozvrhu
         *
         * */
        infoSelector: Gordic.Eko.WebClient.DatawordInfoSelector<Gordic.Eko.WebClient.DataWordContentWithInfo> | null;
        /**
         * Kontent pro import
         * */
        ContentImport: GUctOperaceImport | null;
        /**
         * Element pro fullscreen zobrazeni
         */
        fullscreenElement: JQuery | null;
        /**
         * Počet řádků předkontace
         */
        pocetRadkuPredkontace: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        /**
         * Indikator probíhající předkontace
         * @returns
         */
        isRunnigPredkontace(): boolean;
        /**
         * Delagat voleny pred schvalovanim
         * @param ixp
         * @returns
         */
        beforeNoveSchval(ixp: string): JQuery.Promise<any, any, any>;
        /**
         * Delegat zmeny schvalovani
         *
         */
        SchvalChanged?: () => {};
        /**
         * Udalost pred podanim
         * @param ixp
         * @param ktg_typ
         * @param rok
         * @returns
         */
        beforeFKPodani(ixp: string, ktg_typ: number, rok: number): JQueryPromise<number>;
        /**
         *
         */
        onContentReady(): void;
        /**
         * Udalost zmeny na detailu
         * @param ev
         * @param ctx
         */
        onDetailBuilderActiveOp(ev: JQuery.Event, ctx?: any): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Vytvoreni formulare hlavicky
         * @param that
         */
        private createHeadForm;
        /**
         * Uzavirani kontextu
         * */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Doklad\GUctDetailDokladu.d.ts 

declare namespace Gordic.Uct.WebClient.Detail {
    class GUctDetailDokladu extends GDetailBuilderContent<UsedComponents> implements IGContent, /* Gordic.Wfl.WebClient.GWflFKSeznamExtension,*/ Gordic.Eko.WebClient.GEkoSchvalFKSeznamExtension {
        Ixp: string;
        UcetniDokladDto: Gordic.Uct.Interface.GUctDokladDto;
        UcetniDokladDtoOrigin: Gordic.Uct.Interface.GUctDokladDto | null;
        /**
         * Atribut rozsirene ucetni vety
         */
        rozsirenaVeta: boolean;
        MesicPred: number;
        DenPred: number;
        /**
         *  Validatory
         * */
        docValidators: any;
        castkyEnable: boolean;
        /**
         * Pridan novy radek
         * */
        newRowStart: boolean;
        currentColumnName: string;
        changeProfile: boolean;
        EditaceZapisu: boolean;
        EditRadekZ: number | undefined | null;
        SavingRow: boolean;
        refreshDocuments: Interface.GUctSeznamDokladuDto[];
        /**
         * editace hlavicky
         * */
        EditaceHlavicky: boolean;
        polozky: boolean;
        PredvyplneniDatumu: Interface.GEPredvyplneniDatumu;
        PolozkyView: number;
        InterniDoklad: number;
        Globals: Gordic.Uct.Interface.GUctGlobalDto;
        currentRadekZ: number;
        OwnActions: (GActionParams | GAction)[] | ObjectLiteral<GActionParamsDefObj>;
        /**
         * Definice zalozek
         * */
        myTabs: {
            head: string | undefined;
            rows: string;
        };
        /**
         *  Pole KPI
         * */
        kpiTest: GObservableObject<GKpiItemOptions>[];
        /**
         *  Aktualni radek
         * */
        CurrentRow: Interface.GUctdpepDto;
        /**
         * Aktualni view
         *
         * */
        CurrentDataView: any;
        preFillInProgress: boolean;
        vyrovnavam: boolean;
        /**
         * Rezim zobrazeni dokladu
         * */
        /**
         * Parametry akce Opravit
         * @type {GActionParamsDefObj}
         */
        actionOpravitHlavicku: GActionParamsDefObj;
        /**
         * Parametry akce Zrušit změny
         * @type {GActionParamsDefObj}
         */
        actionZrusitZmenyHlavicky: GActionParamsDefObj;
        /**
         * Aktuální spisový uzel
         * @type {string}
         */
        readonly IxsSu: string;
        /**
         * Selector pro otevreni textu z rozvrhu
         *
         * */
        infoSelector: Gordic.Eko.WebClient.DatawordInfoSelector<Gordic.Eko.WebClient.DataWordContentWithInfo> | null;
        /**
         * Kontent pro import
         * */
        ContentImport: GUctOperaceImport | null;
        /**
         * Element ve fullscreen modu
         */
        fullscreenElement: JQuery | null;
        /**
         * Počet řádků předkontace
         */
        pocetRadkuPredkontace: number;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        /**
         * Indikator probíhající předkontace
         * @returns
         */
        isRunnigPredkontace(): boolean;
        /**
         * Delagat voleny pred schvalovanim
         * @param ixp
         * @returns
         */
        beforeNoveSchval(ixp: string): JQuery.Promise<any, any, any>;
        /**
         * Delegat zmeny schvalovani
         *
         */
        SchvalChanged?: () => {};
        /**
         * Udalost pred podanim
         * @param ixp
         * @param ktg_typ
         * @param rok
         * @returns
         */
        beforeFKPodani(ixp: string, ktg_typ: number, rok: number): JQueryPromise<number>;
        /**
         *
         */
        onContentReady(): void;
        /**
         * Udalost zmeny na detailu
         * @param ev
         * @param ctx
         */
        onDetailBuilderActiveOp(ev: JQuery.Event, ctx?: any): void;
        onDetailBuilderInit(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        onDetailBuilderBuild(builder: Gordic.Gin.DetailBuilder.GDetailBuilder): void;
        /**
         * Vytvoreni formulare hlavicky
         * @param that
         */
        private createHeadForm;
        /**
         * Ulozeni zmen v detailu dokladu do DB
         * @param data
         * @param closing - volano z uavirani contentu
         * @returns
         */
        private Evidence;
        /**
         * Evidence dokladu
         * @param data
         * @param closing
         */
        private EvidenceDokladu;
        /**
         * Uzavirani kontextu
         * */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Doklad\GUctDetail_metody.d.ts 

/**
 * Metody pro detail
 *
 */
declare namespace Gordic.Uct.WebClient.Detail {
    const waitCall = 500;
    const debounce: <T extends unknown[]>(callback: (...args: T) => void, delay?: number) => (...args: T) => void;
    /**
     * Nacteni aktualnich stavu
     *
     * */
    function nastavStavySRC(content: GUctDetail | GUctDetailDokladu, md: any, dal: any): void;
    const nastavStavy: (content: GUctDetail | GUctDetailDokladu, md: any, dal: any) => void;
    /**
     * Vraci objekt gridu
     * @param content
     * @returns
    */
    function GetGrid(content: GUctDetail | GUctDetailDokladu): JQuery<HTMLElement> | null;
    /**
     * flash, ktery bude vymazan po nacteni
     */
    const flashResult = "flashResult";
    /**
     * flash, ktery bude vymazan pri zauctovani
     */
    const flashResultZauct = "flashResultZauct";
    /**
     * Nastaveni validatoru na formulari
     * @param content
     */
    function NastaveniValidatoru(content: GUctDetail | GUctDetailDokladu): void;
    /**
     * Zjisteni, zda je nacteny seznam
     * */
    function IsSeznamExist(): boolean;
    /**
     * Pridani dokladu do zasobniku pro aktualizace
     * @param pidDokladu
     * @returns
     */
    function addDocToRefresh(pidDokladu: string | null | void): void;
    /**
     * Obnoveni seznamu
     * */
    function reloadSeznam(): void;
    /**
     * Aktualizace detailu dokladu podle stavu(menu, polozky, pristupnost)
     * @param {GUctDetail} content
     */
    function AktualizaceDokladu(content: GUctDetail | GUctDetailDokladu): void;
    /**
     * export function AktualizaceFormulare
     * Aktualizace formulare dle naplnenych policek
     * @param {GUctDetail} content
     */
    function AktualizaceFormulare(content: GUctDetail | GUctDetailDokladu): void;
    function RefreshDetail(content: GUctDetail | GUctDetailDokladu, editaceHlevicky?: boolean, clearFlash?: boolean): JQueryPromise<any>;
    /**
     * Oductovani zapisu z vazebnich radku
     * @param {GUctDetail} content
     * @param {any} frmVazby
     * @param {any} zapisy
     * @returns
     */
    function OductovaniZapisu(content: GUctDetail | GUctDetailDokladu, frmVazby: JQuery<HTMLElement>, zapisy: Eko.Interface.GZapisyDto[], vstup?: Gordic.Uct.Interface.GUctDokladZapisOductovatRequestDto): JQueryPromise<any>;
    /**
     * Nastaveni ukladani bokem pro wfl Dokument
     * @param content
     */
    function nastavUlozeni(content: GUctDetail | GUctDetailDokladu, nastavEditaci: any): void;
    /**
     * Aktualizace menu a KPI
     * @param content
     * @param data
     */
    function RefreshMenu(content: GUctDetail | GUctDetailDokladu): void;
    /**
     * Aktualizace akce
     *
     * @param akce
     */
    function UpdateAction(akce: GAction[], options: GActionParamsDefObjBase): void;
    /**
     *  Aktualizace statusbaru
     * export function RefreshStatus
     *
     * @param {GUctDetail} content
     */
    function RefreshStatus(content: GUctDetail | GUctDetailDokladu): void;
    /**
     * Skryti neviditelnych poli
     * @param content
     */
    function ZobrazeniPoli(content: GUctDetail | GUctDetailDokladu): void;
    /**
     * Zpristupneni poli formulare
     * @param {GUctDetail} content
     */
    function ZpristupneniPoli(content: GUctDetail | GUctDetailDokladu): void;
    /**
     * Storno/aktivace dokladu
     *
     * @param {GUctDetail} content
     * @param aktivovat - true, doklad se aktivuje
     * @returns {JQueryPromise<any>}
     */
    function StornoDokladu(content: GUctDetail | GUctDetailDokladu, aktivovat?: boolean): JQueryPromise<any>;
    /**
    * export function Storno dokladu
    *
    * @param {GUctDetail} content
    * @returns {any}
    */
    function StornovatDoklad(content: GUctDetail | GUctDetailDokladu, vstup?: Gordic.Uct.Interface.GUctDokladStornovatRequestDto): JQueryPromise<any>;
    /**
     * export function CloseDocuments
     *  Uzavreni dokladu
     * @param {GUctDetail} content
     * @param {Gordic.Uct.Interface.GUctDokladUzavritRequestDto} [vstup]
     * @param {any/* JQuery.Deferred<any, any} [deffer]
     * @returns {JQueryPromise<any>}
     */
    function CloseDocuments(content: GUctDetail | GUctDetailDokladu, vstup?: Gordic.Uct.Interface.GUctDokladUzavritRequestDto): JQueryPromise<any>;
    /**
    * export function Storno dokladu
    *
    * @param {GUctDetail} content
    * @returns {any}
    */
    function AktivovatDoklad(content: GUctDetail | GUctDetailDokladu, vstup?: Gordic.Uct.Interface.GUctDokladOdStornovatRequestDto): JQueryPromise<any>;
    /**
     *  Nacteni hodnot z formulare
     * export function WaitForData
     *
     * @param {GUctDetail} content
     * @param {boolean} loadData
     * @returns {JQueryPromise<Gordic.Eko.Interface.GUctspidDto>}
     */
    function WaitForData(content: GUctDetail | GUctDetailDokladu, loadData?: boolean): JQueryPromise<Gordic.Eko.Interface.GUctspidDto>;
    /**
     * Zpravy, ktere je potreba zpracovat rucne pri evidence
     *
     * @param {GUctDetail} content
     * @param {Eko.Interface.GTransferMessage} message
     * @param {any} deffer
     * @returns {JQueryPromise<any>}
     */
    function ExtendConditionsEvidence(content: GContent, message: Eko.Interface.GTransferMessage, object?: object): JQueryPromise<any>;
    /**
     * Evidence dokladu
     *
     * */
    function Evidence(content: GUctDetail | GUctDetailDokladu, data?: Gordic.Uct.Interface.GUctDokladEvidenceRequestDto, closing?: boolean): JQueryPromise<any>;
    /**
     * Akce po evidenci dokladu
     * @param content
     * @returns
     */
    function actionAfterEvidence(content: GUctDetail | GUctDetailDokladu): JQueryPromise<any>;
    function EvidenceDokladu(content: GUctDetail | GUctDetailDokladu, data?: Gordic.Uct.Interface.GUctDokladEvidenceRequestDto, closing?: boolean): JQueryPromise<any>;
    /**
     * Zapnout rezim editace hlavicky prohlizeni/oprava()
     * @param this
     * @returns
     */
    function RezimEditace(this: GUctDetail | GUctDetailDokladu): JQueryPromise<any>;
    /**
     * Aktualizace detailu po provedeni akce
     *
     * */
    function RefreshContent(this: GAction, content: GUctDetail | GUctDetailDokladu, result: JQueryPromise<any>, fillForm?: boolean, callrefreshDetail?: boolean): JQueryPromise<any>;
    /**
     * Obnovit detail bez requestu na server
     *
     * @param {GUctDetail} content
     */
    function refreshDetail(this: GUctDetail | GUctDetailDokladu, fillForm?: boolean): JQueryPromise<any>;
    /**
     * Hromadny popis zapisu
     * @param content
     * @returns
     */
    function HromadnyPopisZapisu(content: GUctDetail | GUctDetailDokladu): JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never> | undefined;
    /**
        * Formular pro zadani popisu radku
        * @param {GUctDetail} content
        */
    function ZadaniTextuPopisuRadku(content: GUctDetail | GUctDetailDokladu): JQuery<HTMLElement>;
    /**
     * export function SchvaleniDokladu
     *
     * @param {GUctDetail} content
     * @returns {any}
     */
    function SchvaleniDokladu(content: GUctDetail | GUctDetailDokladu, vstup?: Gordic.Uct.Interface.GUctDokladSchvalitRequestDto): JQueryPromise<any>;
    /**
     * export function SchvaleniDokladu
     *
     * @param {GUctDetail} content
     * @returns {any}
     */
    function OdSchvaleniDokladu(content: GUctDetail | GUctDetailDokladu, vstup?: Gordic.Uct.Interface.GUctDokladOdschvalitRequestDto): JQueryPromise<any>;
    interface IGEkoKnihaOptions {
        content: GUctDetail | GUctDetailDokladu;
        aktualizovatZapisy?: boolean;
        hardLoad?: boolean;
        needRefreshSeznam?: boolean;
        needRefreshDetail?: boolean;
        fillForm?: boolean;
        schvalProces?: boolean;
    }
    /**
     * Aktulaizace detailu pro ukonceni akce
     *
     * @param {GUctDetail} content
     * @param {any}
     */
    function RefreshAfterAction(content: GUctDetail | GUctDetailDokladu, aktualizovatZapisy?: boolean, hardLoad?: boolean, needRefreshSeznam?: boolean, needRefreshDetail?: boolean, fillForm?: boolean, schvalProces?: boolean): JQueryPromise<any>;
    function ProuctovaniDokladu(content: GUctDetail | GUctDetailDokladu, vstup?: Gordic.Uct.Interface.GUctDokladZauctovatRequestDto): JQueryPromise<any>;
    /**
        * Vytvoreni predkontace ze zapisu
        * @param content
        * @param vsechnyRadky
        */
    function PredkontaceZeZapisu(content: GUctDetail | GUctDetailDokladu, vsechnyRadky: boolean): void;
    /**
        * Vytvoreni predkontace ze zapisu
        * @param content
        * @param vsechnyRadky
        */
    function ZobrazitUctenku(content: GUctDetail | GUctDetailDokladu): JQueryPromise<any>;
    /**
     * Kopie dokladu
     *
     * @param {GUctDetail} content
     * @param {boolean} seZapisy - true kopie se zapisy
     * @param {string|null} [sejmutyPidDokladu]
     * @param {any} [deffer]
     * @returns {JQueryPromise<any>}
     */
    function KopieDokladu(content: GUctDetail | GUctDetailDokladu, seZapisy: boolean, sejmutyPidDokladu?: string | null): JQueryPromise<any>;
    /**
        * Kontrola cisla dokladu
        * @param content
        * @param value
        * @param def
        * @param idMessage
        * @returns
        */
    function KontrolaCislaDokladu(content: GUctDetail | GUctDetailDokladu, value: any, idMessage?: string): any;
    /**
        * Atribut editace dokladu
        * @param content
        */
    function IsEditMode(content: GUctDetail | GUctDetailDokladu): boolean;
    /**
     * Je mozno editovat radek
     * @param content
     * @returns
     */
    function IsCanEditRow(content: GUctDetail | GUctDetailDokladu): boolean;
    /**
        * Formula pro vyber stavu prim. dokladu
        * @param content
        * @param preSelect
        * @param puvodniStav
        * @param pidPrim
        * @param uhrada
        */
    function DotazNaZmenuPrimDokladu(content: GContent, preSelect: number, puvodniStav: number, pidPrim: string, uhrada: any): any;
    /**
        * Novy zapis
        * @param {GUctDetail} content
        */
    function NovyZapis(content: GUctDetail | GUctDetailDokladu, rowDefault?: Interface.GUctdpepDto): JQueryPromise<Interface.GUctdpepDto>;
    /**
        *  Atribut noveho radku
        * @param radek
        * @returns
        */
    function IsNewRow(radek: any): boolean;
    /**
     * Ulozit zapis
     * @param {GUctDetail} content
     * @param {any} radek
     */
    function UlozitRadek(content: GUctDetail | GUctDetailDokladu, radek: Gordic.Uct.Interface.GUctdpepDto & {
        guid?: string;
    }): JQueryPromise<any>;
    /**
     * Akcni metoda ukladani radku
     * @param {GUctDetail} content
     * @param {Gordic.Uct.Interface.GUctDokladZapisUlozRequestDto} vstup
     * @param {any} deferrer?
     */
    function UlozitRadekDokladu(content: GUctDetail | GUctDetailDokladu, vstup: Gordic.Uct.Interface.GUctDokladZapisUlozRequestDto, deferrer?: JQuery.Deferred<any>): JQueryPromise<any>;
    function ZrusitEditaciRadku(content: GUctDetail | GUctDetailDokladu): void;
    function EditaceRadku(content: GUctDetail | GUctDetailDokladu): void;
    /**
     * Odstraneni zapisu
     * @param {GUctDetail} content
     * @returns
     */
    function OdstranitZapis(content: GUctDetail | GUctDetailDokladu, data?: Gordic.Uct.Interface.GUctDokladZapisVymazatRequestDto): JQueryPromise<any>;
    /**
     * Vorovnani
     * @param content
     * @param columnName
     * @param nks
     * @param radek_z
     * @param c0
     * @param c1
     * @returns
     */
    function VyrovnatZapisy(content: GUctDetail | GUctDetailDokladu, columnName: string, nks: string, radek_z: number, c0: JsonDecimal, c1: JsonDecimal): JQueryPromise<any>;
    /**
        * Predkontace
        * @param {GUctDetail} content
        */
    function Predkontace(content: GUctDetail | GUctDetailDokladu): void;
    /**
        * Import ze schranky, souboru primo do db nebo do porizovacky
        * @param {GUctDetailt} content
        */
    function ImportDat(content: GUctDetail | GUctDetailDokladu, typImportu: "IMPCLIP" | "IMPFILE" | "IMPCLIPPOL" | "IMPFILEPOL"): void;
    /**
     * Viditelne sloupce na gridu
     *
     * @returns
     */
    function getViditelneSloupce(gridFormat: Gordic.Data.GridFormat<any>): Gordic.Eko.Interface.GVisibleTableColumns[];
    /**
        * Zobrazeni podkladu KH DPH
        * @param {GUctDetail} content
        */
    function PodkladyKHDPH(content: GUctDetail | GUctDetailDokladu, editMode?: boolean, vynulovatDatumyDPH?: boolean, prvotniEvidenceDokladu?: boolean, refresh?: boolean): JQueryPromise<any>;
    /**
        * Prevzeti dokladu
        * @param {GUctDetail} content
        */
    function PrevzetiDokladu(content: GUctDetail | GUctDetailDokladu): JQueryPromise<any>;
    /**
     * Vraceni do WFL vrstvy
     *
     * */
    function VratitDoWFL(content: GUctDetail | GUctDetailDokladu, vstup?: Gordic.Uct.Interface.GUctDokladVratitDoWFLRequestDto): any;
    /**
        * Zjisteni akutalniho editovaneho radku
        * @param content
        * @returns
        */
    /**
        * Nacteni typu dokladu z formulare
        */
    function GetIxsTypAsync(content: GUctDetail | GUctDetailDokladu, async?: boolean): JQueryPromise<string>;
    /**
        * Nacteni typu dokladu z formulare
        */
    function GetIxsTyp(content: GUctDetail | GUctDetailDokladu, async?: boolean): string;
    function GetKtgTyp(content: GUctDetail | GUctDetailDokladu): number;
    function GetKtgTypAsync(content: GUctDetail | GUctDetailDokladu): JQueryPromise<number>;
    function GetMesic(content: GUctDetail | GUctDetailDokladu): JQueryPromise<number>;
    /**
        * Nacteni druhu dokladu (DRD) z formulare
        * @param content obsah
        * @returns {int} Druh dokladu
        */
    function GetDrdAsync(content: GUctDetail | GUctDetailDokladu, synchro?: boolean): JQueryPromise<number>;
    /**
        * Nacteni druhu dokladu (DRD) z formulare
        * @param content obsah
        * @returns {int} Druh dokladu
        */
    function GetDrd(content: GUctDetail | GUctDetailDokladu): number;
    /**
     * Nacteni roku DPH dokladu z formulare
     *
     * @param content
     * @returns
     */
    function GetDPHRok(content: GUctDetail | GUctDetailDokladu): number;
    /**
     * Nacteni mesice DPH dokladu z formulare
     *
     * @param content
     * @returns
     */
    function GetDPHMesic(content: GUctDetail | GUctDetailDokladu): number;
    /**
     * Nacteni castky na hlavicce dokladu z formulare
     *
     * @param content
     * @returns
     */
    function GetValue(content: GUctDetail | GUctDetailDokladu): JsonDecimal;
    /**
        * Zjisteni cisla dokladu
        * @param {GUctDetail} content
        * @returns
        */
    function GetNumberDoc(content: GUctDetail | GUctDetailDokladu): any;
    /**
        *  ZJisteni typu uctu
        * @param content
        */
    function IsTypUctuPrijmovy(content: GUctDetail | GUctDetailDokladu): JQueryPromise<boolean>;
    /**
        * Zjisteni pristupnosti smlouvy
        * @param content
        */
    function IsEnableSmlouva(content: GUctDetail | GUctDetailDokladu, relatedElement?: JQuery, cancelationToken?: Gordic.Utils.GCancellationToken): JQueryPromise<boolean>;
    /**
        *  Zjisteni aktualne editovaneho radku
        * @param content
    */
    function GetCurrentEditRow(content: GUctDetail | GUctDetailDokladu, noValid?: boolean): JQueryPromise<Gordic.Uct.Interface.GUctdpepDto>;
    function IsPrijem(c0: Decimal, c1: Decimal, priznRezerChar: Number): boolean;
    /**
     * Vytvoreni gridformatu ucetnich polozek
     *
     * @param content
     * @returns
     */
    function createGridFormat(content: GUctDetail | GUctDetailDokladu, wizard?: boolean): Gordic.Data.GridFormat<any>;
    /**
     *
     * @param content
     * @returns
     */
    function createSmlPrefabField(content: GUctDetail | GUctDetailDokladu): GSelectBoxOptions<any, any>;
    function GetFormSml(content: GUctDetail | GUctDetailDokladu): Gordic.Forms.Form;
    function GetTextKurzRozdilu(typKurzRoz: Interface.GETypKurzovychRozdilu): {
        kod: any;
        name: any;
    };
    /**
        * Nacteni zapisu dokladu
        *
        * @param {GUctDetail} content
        */
    function ReloadRecords(content: GUctDetail | GUctDetailDokladu, refresh?: boolean): JQueryPromise<any>;
    /**
        * Obnoveni gridu ze zaslanych dat
        *
        * @param {GUctDetail} content
        */
    function RefreshGrid(content: GUctDetail | GUctDetailDokladu, data: Gordic.Uct.Interface.GUctdpepDto[]): void;
    /**
     * function SwitchToRecords
     *
     *  Prepnuti na zalozku se zapisy
     * @param {GUctDetail} content
     */
    function SwitchToRecords(content: GUctDetail | GUctDetailDokladu): void;
    /**
     * function SwitchTab
     *
     * Prepinani zalozek
     * @param {GUctDetail} content
     * @param {string} nameTabs
     */
    function SwitchTab(content: GUctDetail | GUctDetailDokladu, nameTabs: string): void;
    /**
     * Oznaceni dokladu jako interni
     *
     * @param {GUctDetail} content
     * @param {Gordic.Eko.Interface.GUctspidDto} [data]
     * @returns {JQueryPromise<any>}
     */
    function OznacitInterniDoklad(content: GUctDetail | GUctDetailDokladu, ico: string): JQueryPromise<any>;
    /**
     * Ma se zobrazit KPI
     *
     * @param {GUctDetail} content
     * @returns {boolean}
     */
    function IsShowKPI(content: GUctDetail | GUctDetailDokladu): boolean;
    /**
     *  Aktualizace KPI
     * function RefreshKPI
     *
     * @param {GUctDetail} content
     */
    function RefreshKPI(content: GUctDetail | GUctDetailDokladu): void;
    /**
     * Zobrazeni dokladu dle pid
     * @param content
     */
    function showDoklad(content: GUctDetail | GUctDetailDokladu): void;
    function setStatus(content: GUctDetail | GUctDetailDokladu, text: string): void;
    /**
     * Kurzove rozdily
     * @param content
     * @param typKurzRoz
     */
    function AlgoritmusKurzovychRozdilu(content: GUctDetail | GUctDetailDokladu, typKurzRoz: Gordic.Uct.Interface.GETypKurzovychRozdilu, relatedElement?: JQuery, cancellationToken?: Gordic.Utils.GCancellationToken): JQueryPromise<Gordic.Uct.WebClient.GAlgoritmusKRReturnDto>;
    /**
          * Formular pro zadani popisu radku
          * @param {GUctDetail} content
          */
    function VyberSmlouvy(content: GUctDetail | GUctDetailDokladu, currentData: any): JQuery<HTMLElement>;
    /**
     * Definice lokalni nabidky
     */
    function getMenuActions(): (string | undefined)[] | (string | (string | undefined)[] | {
        action: GAction | undefined;
        primary: true;
        favorite: true;
    })[] | MenuParams[];
    /**
     * Oznaceni radku
     * @param content
     * @param row
     */
    function setMark(grid: JQuery<HTMLElement>, row: number): void;
    /**
     * Kopie oznaceneho radku
     * @param content
     */
    function copyRow(content: GUctDetail | GUctDetailDokladu): JQueryPromise<Interface.GUctdpepDto>;
    /**
    * Predat doklad
    * @param {GUctDetail} content
    */
    function Predat(content: GUctDetail | GUctDetailDokladu): JQuery.PromiseBase<any, any, never, never, never, never, never, never, never, never, never, never>;
    /**
        * Pridelit doklad
        * @param {GUctDetail} content
        */
    function Pridelit(content: GUctDetail | GUctDetailDokladu): JQueryPromise<any>;
    /**
     * Preevidovat doklad
     * @param content
     */
    function Preevidovat(content: GUctDetail | GUctDetailDokladu): JQueryPromise<any>;
    /**
     * Nacteni textu z rozvrhu
     * @param content
     * @param radek
     * @param readAlways
     * @returns
     */
    function NactiTextyZRozvrhu(content: GUctDetail | GUctDetailDokladu, radek: Eko.Interface.GEkoZapisDto, readAlways?: boolean): JQueryPromise<any>;
    /**
     * Predat doklad
     * @param {GUctDetail} content
     */
    function VyberKategorieFIK(content: GUctDetail | GUctDetailDokladu, ixp: string, ktg_typ: number, rok: number): JQueryPromise<number>;
    /**
     * Zobrazení detailu zápočtového listu v nové zálozce
     *
     * @returns {JQuery.Promise<any>} promise s operací
     */
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Doklad\GUctVyberPredkontace.d.ts 

declare namespace Gordic.Uct.WebClient {
    class GUctVyberPredkontace extends GContentBase implements IGClientContent, GHromadneOperaceDialog {
        form: JQuery;
        result: string;
        prepareContent(): void;
        /**
         * Vyber hodnoty
         * */
        VyberHodnoty(): void;
        getFormData(): string;
        /**
         *  Formular nastaveni predkontaci
         *
         * */
        formularNastaveni(): JQueryPromise<Forms.Form>;
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\HledaniDokladu\GUctHledaniDokladu.d.ts 

declare namespace Gordic.Uct.WebClient {
    class GUctHledaniDokladu extends GContentBase implements IGContent {
        private grid;
        Globals: Gordic.Uct.Interface.GUctGlobalDto;
        onContentReady(): void;
        /**
         * Povoleni akce zobrazit doklad
         *
         * */
        private enabledAction;
        private createGridFormat;
        private vyhledat;
        vycistit(): void;
        /**
         * Zobrazeni okna dle aktualniho radku
         * @param content
         * @param row
         */
        ZobrazDetail(): void;
        /**
         * Vraci objekt gridu
         * @param content
         * @returns
         */
        GetGrid(): JQuery<HTMLElement>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Knihy\GUctDokladKnihy.d.ts 

declare namespace Gordic.Uct.WebClient {
    /**
     * GUctKnihy
     *
     *  Seznam ucetnich knih
     *
     * @author Tomáš Kareš
     * @since 482.1.0.29
     */
    class GUctDokladKnihy extends GContentBase {
        private grid;
        taskId: string;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        /**
         * task pro seznam
         * */
        protected taskList: Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<any>>;
        protected islView: Gordic.Isl.View;
        private loadingData;
        onContentReady(): void;
        /**
         * Vytvoreni gridu
         * */
        private createGrid;
        /**
         * Nastaveni pristupnosti akci dle stavu a prav formulare
         *
         * */
        private nastaveniPristupnosti;
        /**
         * Vraci objekt gridu
         * @returns
        */
        private getGrid;
        /**
         * Vytvoreni view pro list
         *
         * */
        protected createListView(): Gordic.Isl.View;
        /**
         * Znovunacteni dat
         *
         * */
        protected reload(): void;
        /**
         * Vytvoreni gridformatu
         * */
        private createGridFormat;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Knihy\GUctKnihy.d.ts 

declare namespace Gordic.Uct.WebClient {
    /**
     * GUctKnihy
     *
     *  Seznam ucetnich knih
     *
     * @author Tomáš Kareš
     * @since 482.1.0.29
     */
    class GUctKnihy extends GContentBase {
        private grid;
        taskId: string;
        onContentReady(): void;
        private stavKnih;
        private cardPanelItems;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Knihy\GUctSeznamKnih.d.ts 

declare namespace Gordic.Uct.WebClient {
    class GUctSeznamKnih extends GContentBase {
        private $grid;
        protected loadingData: boolean;
        private Permissions;
        protected islView: Gordic.Isl.View;
        /**
         * task pro seznam
         * */
        protected taskList: Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<any>>;
        protected $filterPanel: JQuery;
        logOptions: {
            name: string;
            authorCode: number;
            file: string;
        };
        onContentReady(): void;
        /**
            * Hromadne operace
            *
            * function HromadneOperace
            *
            *
            *
            */
        private hromadneOperace;
        /**
         * Akce s knihou
         * @param vybaneKnihy
         * @param typAkce
         */
        private actionsWithBooks;
        /**
         *  Definice sloupcu
         * createColumns
         *
         * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctVybraneKnihyDto>}
         */
        private createColumns;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        createFilterPanel(that: this): void;
        /**
         * Znovunacteni dat
         *
         * */
        protected reload(): void;
        /**
         * Vytvoreni gridu
         * */
        private createGrid;
        /**
         * Vytvoreni view pro list
         *
         * */
        protected createListView(): Gordic.Isl.View;
        /**
         * Vytvoreni gridformatu
         * */
        private createGridFormat;
        /**
         * Nastaveni pristupnosti akci dle stavu a prav formulare
         *
         * */
        private nastaveniPristupnosti;
        /**
         * Zjisteni stavu vybranych knih
         * @param rows
         */
        private findOznaceneStavy;
        /**
         * Vraci objekt gridu
         * @returns
        */
        private getGrid;
        /**
         * Vytvoreni akci
         * */
        private createAction;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Ostatni\DashBoard\GDashboard.d.ts 

declare namespace Gordic.Uct.WebClient {
    /**
     * Úvodní stránka (dashboard)
     *
     * @author Tomas Kares
     * @since 484.1.0.32
     */
    class GDashboard extends GContentBase {
        /**
         * prvky pro počty pohybů k účtování
         * @type {GObservableObject<any | GKpiItemOptions>[]}
         */
        private kpiKnihy;
        /**
         * Seznam knih
         * @type {Gordic.Uct.Interface.GUctVybraneKnihyDto[]}
         */
        private seznanKnih;
        /**
         * Typ zobrazení (true = velká KPI, false = malý seznam)
         * @type {number}
         */
        private readonly TypZobrazeni;
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
        /**
         * Nastavení hodnoty prvku
         *
         * @param {GObservableObject<any | GKpiItemOptions>} kpi prvek
         * @param {number | null} numDetail pořadové číslo (pro typ zobrazení seznam) nebo null (pro typ zobrazení velká KPI)
         * @param {number | null} value hodnota
         */
        private setValue;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Pruvodci\GUctHromadneOperace_Metody.d.ts 

declare namespace Gordic.Uct.WebClient.Pruvodce {
    /**
     * aktualizacePoctuDokladu
     *
     * @param {MetaRow<Gordic.Uct.Interface.GUctselectedRowsDto>[]} doklady
     */
    function aktualizacePoctuDokladu(content: GHromadneOperace<any>, doklady: MetaRow<Gordic.Uct.Interface.GUctVybranyDokladDto>[]): void;
    function zaskrtniRadky(content: GHromadneOperace<any>, data: MetaRow<Gordic.Uct.Interface.GUctVybranyDokladDto>[], kind: Gordic.Uct.Interface.GEResultOperation): void;
    /**
     * Pocateni inicializace 1. kroku
     *
     * @param content
     */
    function inicializace<TRow extends Gordic.Uct.Interface.GUctVybranyDokladDto>(content: GHromadneOperace<TRow>, contentDiv: JQuery<HTMLElement>, baged?: boolean, reloadData?: Function): void;
    /**
    *
    *  Vytvoreni gridu
    *
    * createGrid
    *
    * @param {JQuery} content
    * @param {boolean} multi (default = false)
    * @param {boolean} result (default = false) - vysledny grid
    * @returns {JQuery}
    */
    function createGrid(content: GHromadneOperace<Interface.GUctVybranyDokladDto>, contentDiv: JQuery, multi?: boolean, result?: boolean, reloadData?: Function): JQuery;
    /**
    * enabledAction
    *
    *  Povoleni akce
    */
    function enabledAction<TRow extends Gordic.Uct.Interface.GUctVybranyDokladDto>(content: GHromadneOperace<TRow>): void;
    /***
        *
        *  Kontrola dat pred vlastni operaci
        *
        */
    function isValidData(content: GHromadneOperace<Interface.GUctVybranyDokladDto>): boolean;
    /**
    *  Definice sloupcu
    * createColumns
    *
    * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctselectedRowsDto>}
    */
    function createColumns(result?: boolean, withResultAtributs?: boolean): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctVybranyDokladDto>;
    /**
     *  Definice sloupcu
     * createColumns
     *
     * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctVybranyDokladDto>}
     */
    function createColumnsMetaData(): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctVybranyDokladDto>;
    /**
    * Test, jestli je možné okno zavřít
    *
    * @returns {JQueryPromise<any>} promise (resolve = je možné zavřít, reject = není možné zavřít)
    */
    function closing(content: GContent): JQueryPromise<any>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Pruvodci\GUctHromadneZauctovani.d.ts 

declare namespace Gordic.Uct.WebClient {
    /**
     * Hromadne zauctovani přes průvodce
     *
     * @author Tomas Kares
     * @since 480.1.0.20
     */
    class GUctHromadneZauctovani extends GContentBase implements GHromadneOperace<Interface.GUctVybranyDokladDto> {
        uid: string;
        /**
         * vybrane zapisy
         * @type {GUctSeznamDokladuDto}
         */
        selectedRows: Gordic.Uct.Interface.GUctVybranyDokladDto[];
        GlobalSetup: Gordic.Uct.Interface.GUctGlobalDto;
        private uzavreniVsechDokladu;
        /**
         * Grid se seznamem
         * @type {JQuery}
         */
        $grid: JQuery;
        $zapisy: JQuery<HTMLElement>;
        /**
         *  Vysledny grid
         * $gridReuslt
         * @type {JQuery}
         */
        private $gridReuslt;
        /**
         *  Grid po vykonani uzavreni
         * $gridReuslt
         * @type {JQuery}
         */
        private $gridComplete;
        /** příznak úspěšného ukončení (true-success, false - fail) */
        successClose: boolean;
        /**
         *   Instance Wizarda
         *
         * Pruvodce
         * @type {Wizard}
         */
        Pruvodce: Wizard;
        /**
         *  Vybrane radky pro uzavreni
         *  checkedRows
         * @type {JQuery}
         */
        private checkedRows;
        /**
         *  Vysledny seznam radku po uzavreni
         *  checkedRows
         * @type {JQuery}
         */
        resultRows: Gordic.Uct.Interface.GUctVybranyDokladDto[];
        nastaveni: Gordic.Uct.Interface.GUctDokladZauctovatHromadneRequestDto;
        myStatusBar: JQuery;
        badgeAll: GObservableObject<GBadgeOptions>;
        badgeSuccess: GObservableObject<GBadgeOptions>;
        badgeWarning: GObservableObject<GBadgeOptions>;
        badgeError: GObservableObject<GBadgeOptions>;
        actAll: GAction;
        actSuccess: GAction;
        actWarning: GAction;
        actError: GAction;
        myForm: GContent & GHromadneOperaceDialog;
        form: JQuery;
        /**
         * Zadefinování formuláře
         */
        onContentReady(): void;
        /**
         *  Formular nastaveni zauctovani
         *
         * */
        private formularNastaveni;
        /**
         * spusteni zauctovani dokladu
         *
         * @param {JQuery} $grid grid
         */
        private Run;
        private Zauctovat;
        private ZauctovatPostupne;
        /**
         * Test, jestli je možné okno zavřít
         *
         * @returns {JQueryPromise<any>} promise (resolve = je možné zavřít, reject = není možné zavřít)
         */
        closing(): JQueryPromise<any>;
        private GridFormat;
        /***
         * grid se seznamem dokladu
         * */
        private getGridDokladu;
        /**
         * Naplnění seznamu zápisů k pohybu nebo dokladu
         */
        private nacteniSeznamuZapisu;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Pruvodci\GUctHromadneZauctovaniDlg.d.ts 

declare namespace Gordic.Uct.WebClient {
    class GUctHromadneZauctovaniDlg extends GContentBase implements IGClientContent, GHromadneOperaceDialog {
        private nastaveni;
        prepareContent(): void;
        getFormData(): JQuery.Promise<any, any, any>;
        private saveNastaveni;
        /**
         *  Formular nastaveni zauctovani
         *
         * */
        formularNastaveni(content: GUctHromadneZauctovaniDlg): JQueryPromise<Forms.Form>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Pruvodci\GUctOperaceImport.d.ts 

declare namespace Gordic.Uct.WebClient {
    /**
     * Predkontace
     *
     * @author Tomas Kares
     * @since 480.1.0.20
     */
    class GUctOperaceImport extends GContentBase implements GPruvodceOperace, IGClientContent {
        uid: string;
        GlobalSetup: Gordic.Uct.Interface.GUctGlobalDto;
        Globals: Gordic.Uct.Interface.GUctGlobalDto;
        /**
         * Grid se seznamem
         * @type {JQuery}
         */
        $myGrid: JQuery<HTMLElement>;
        private contentClipBoard;
        private content;
        /** příznak úspěšného ukončení (true-success, false - fail) */
        successClose: boolean;
        /**
         *   Instance Wizarda
         *
         * Pruvodce
         * @type {Wizard}
         */
        Pruvodce: Wizard;
        type: string;
        ixp: string;
        datZmeny: JsonDate;
        infoFile: General.ApplicationInterface.GFileInfoDto;
        grdFormat: Data.GridFormat<Gordic.Uct.Interface.GUctdpepDto>;
        private kontrolaNaRozvrh;
        private seznamVybranychZapisu;
        private editacniMod;
        /**
         * Zadefinování formuláře
         */
        prepareContent(option: {
            content: Detail.GUctDetail;
            globals: Gordic.Uct.Interface.GUctGlobalDto;
            type: string;
            ixp: string;
            datZmeny: JsonDate;
            grdFormat: Data.GridFormat<Gordic.Uct.Interface.GUctdpepDto>;
        }): void;
        /**
         * Zadefinování formuláře
         */
        onContentReady(): void;
        /**
         * Kontrola zdrojovych dat
         *
         *
         */
        private Kontrolovat;
        /**
         * spusteni zauctovani dokladu
         *
         * @param {JQuery} $grid grid
         */
        private Run;
        /**
        *
        *  Vytvoreni gridu
        *
        * createGrid
        *
        * @param {JQuery} content
        * @param {boolean} multi (default = false)
        * @param {boolean} result (default = false) - vysledny grid
        * @returns {JQuery}
        */
        private createGrid;
        /**
        * enabledAction
        *
        *  Povoleni akce
        */
        private enabledAction;
        /***
            *
            *  Kontrola dat pred vlastni operaci
            *
            */
        private isValidData;
        /**
         *  Definice sloupcu
         * createColumns
         *
         * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctVybranyDokladDto>}
         */
        private createColumns;
        /**
         * Vraci objekt gridu
         * @param content
         * @returns
        */
        GetGrid(): JQuery<HTMLElement> | null;
        /**
         * Test, jestli je možné okno zavřít
         *
         * @returns {JQueryPromise<any>} promise (resolve = je možné zavřít, reject = není možné zavřít)
         */
        closing(): JQueryPromise<any>;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Seznam\GUctDetailPreview.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Seznam\GUctSeznam.d.ts 

declare namespace Gordic.Uct.WebClient.Seznam {
    class GUctSeznam extends GContentBase<Gordic.Contexts.GEkoBookContentContext & Gordic.Eko.Utils.IGEkoBookExtension> implements IGContent {
        debugMode: boolean;
        menuTisk: MenuParams;
        hraniceVelkychDat: number;
        varovaniVelkehoMnoztviDat: boolean;
        private previewController;
        $filterForm: any;
        $grid: JQuery<HTMLElement>;
        defineViewLoad: boolean;
        Globals: Gordic.Uct.Interface.GUctGlobalDto;
        filter: Gordic.Uct.Interface.GEUctFiltrSeznamPevne;
        private hardFilter;
        refreshRows: Interface.GUctSeznamDokladuDto[];
        ixsTypy: string[];
        /**
         * Aktuální spisový uzel
         * @type {string}
         */
        readonly IxsSu: string;
        /**
         * Varovat před načtením dlouhého seznamu
         * @type {number}
         */
        readonly LongListWarning: boolean;
        /**
         * Maximální počet dokladů (má význam pouze pokud je zapnuté varování před načtením dlouhého seznamu)
         * @type {number}
         */
        readonly LongListMaxCount: number;
        /**
         * Jmeno tridy gridu
         */
        readonly classGrid = "js-UctSeznamGrid";
        onContentReady(): void;
        /**
         * Vytvorit akce
         * @param that
         * @param $grid
         */
        private createAction;
        /**
         * Vytvorit menu bar
         * @param that
         */
        private createMenuBar;
        /**
         * Vytvoreni filtrovaciho panelu
         * @param that
         */
        private createFilterPanel;
        /**
         * Vytvoreni gridu
         * @param that
         */
        private createGrid;
        /**
         * Podminene formatovani
         *
         * @returns
         */
        private createConditionFormat;
        /**
         *  Registrovat preview
         *
         *
         */
        private registerPreview;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Seznam\GUctSeznam_filtry.d.ts 

declare namespace Gordic.Uct.WebClient.Seznam {
    /**
     * export function CreateFilterForm
     *  Vytvoreni filtrovaciho formulare
     * @param {GContent} content
     * @returns {any}
     */
    function CreateFilterForm(content: GUctSeznam, dokumentParams: Gordic.Ssl.Interface.GDokumentGetColumnParamsResponseDto): any;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uct.WebClient\Objekty\Seznam\GUctSeznam_metody.d.ts 

declare namespace Gordic.Uct.WebClient.Seznam {
    interface IGHromadneOperace {
        /**
         * Akce
         * */
        action: Gordic.Uct.Interface.GEUctHromadneOperace;
        tema: string;
        serverParameterMethod: string;
        title: string;
        description: string;
        actioName: string;
        titleBreadCrumb: string;
        IDSestavy: number;
    }
    const presetDokumentColumns: Gordic.Ssl.WebClient.GDokumentColumnNames[];
    const presetDokumentFields: Gordic.Ssl.WebClient.GDokumentFieldNames[];
    /**
     * Vraci objekt gridu
     * @param content
     * @returns
    */
    function GetGrid(content: GUctSeznam): JQuery<HTMLElement>;
    /**
     * Vraci objekt filtru
     * @param {GContent} content
     * @returns
     */
    function GetFilter(content?: GUctSeznam): JQuery<HTMLElement> | JQuery<Element>;
    /**
     * Pridani radku, ktere je nutono obcerstvit
     * @param pidDokladu
     * @param content
     * @returns
     */
    function addRefreshRow(pidDokladu: string, content?: GUctSeznam): null | undefined;
    /**
     * Vraceni obsahu seznamu
     * @returns
     */
    function GetContentSeznam(): GUctSeznam;
    /**
     * Dohledai radku
     * @param {string} pidDokladu
     * @returns
     */
    function NajdiRadek(pidDokladu: string): any;
    /**
     * Nahrazeni radku novym obsahem
     * @param {GContent} content
     * @param {any} radek
     * @param {boolean} refresh
     */
    function ReplaceRow(content: GContent | null | undefined, radek: any, refresh: boolean): void;
    /**
     * Obcerstveni seznamu z nactenych dat ve view
     */
    function RefreshSeznamu(content: GUctSeznam | null | undefined): void;
    /**
     * Nastaveni pristupnosti prvku
     * @param content
     */
    function NastaveniPristupnosti(content: GUctSeznam, permisions?: Gordic.Uct.Interface.GUctDokladPermissionsSeznam, pocetRadku?: number): void;
    /**
     * Znovunacteni dat
     * @param {GUctSeznam} content
     * @param filtr
     * @param {string|undefined} idMessage
     */
    function ReloadRequest(content: GUctSeznam, filtr?: Gordic.Uct.Interface.GUctFiltrDokladu | undefined | null, deffer?: any | undefined | null): JQueryPromise<any>;
    /**
     * Znovunacteni dat
     * @param {GUctSeznam} content
     * @param filtr
     * @param {string|undefined} idMessage
     */
    function Reload(content: GUctSeznam, filtr?: Gordic.Uct.Interface.GUctFiltrDokladu | undefined | null, deffer?: any | undefined | null): JQueryPromise<any>;
    /**
     * Zobrazeni okna dle aktualniho radku
     * @param content
     * @param row
     */
    function ZobrazDetail(content: GUctSeznam, row: Gordic.Uct.Interface.GUctSeznamDokladuDto, objekt?: string, polozky?: boolean): void;
    /**
     * Zobrazeni detailu dle pidu
     * @param content
     * @param row
     */
    function ZobrazDetailIxp(content: GContent, ixp: string): void;
    /**
     * Zobrazeni okna v rezimu uprav hlavicky dokladu
     * @param content
     * @param row
     */
    function UpravitDetail(content: GUctSeznam, row: any): void;
    /**
     * Hromadne operace
     *
     * function HromadneOperace
     *
     *
     *
     */
    function HromadneOperace(content: GUctSeznam, typOperace: Interface.GEUctHromadneOperace): void;
    /**
    *  Definice sloupcu
    * createColumns
    *
    * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctselectedRowsDto>}
    */
    function createGridFormatHromadneOperace(result?: boolean, withResultAtributs?: boolean): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctVybranyDokladDto>;
    /**
     * Obcerstveni neaktivni radku
     * @param content
     * @returns
     */
    function refreshRows(content: GUctSeznam): JQueryPromise<any>;
    /**
     * Aktualizace zaslanych zapisu z DB do gridu
     * @param content
     * @param doklady
     */
    function refreshRowsFromDB(content: GUctSeznam, doklady: Interface.GUctSeznamDokladuDto[]): JQueryPromise<any>;
    /**
     *  Vytvoreni gridformatu
     * export function createdGridFormat
     *
     * @param {GContent} content
     * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamDokladuDto>}
     */
    function createdGridFormat(content: GUctSeznam, param: Gordic.Ssl.Interface.GDokumentGetColumnParamsResponseDto | null): Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctSeznamDokladuDto>;
    /**
        * Přidání další úrovně do scope
        *
        * @param {Gin.WebClient.GScopeOptionLevel[] | undefined} scope scope
        * @param {string} newScope nový scope
        * @param {string} [newScopeTitleWOScope] titulek nového scope pro přidání do prázdného scope
        * @param {string} [newScopeTitleWScope] titulek nového scope pro přidání do neprázdného scope
        * @returns {Gin.WebClient.GScopeOptionLevel[]} výsledný scope
        */
    function extendScope(scope: Gin.WebClient.GScopeOptionLevel[] | undefined, newScope: string, newScopeTitleWOScope?: string, newScopeTitleWScope?: string): Gin.WebClient.GScopeOptionLevel[];
    function dokumentInit(): JQuery.Promise<Gordic.Ssl.Interface.GDokumentGetColumnParamsResponseDto>;
    /**
        * Seznam akcí pro menu (hamburger nebo kontextové menu gridu)
        *
        * @param {boolean} contextMenu formát pro kontextové menu gridu (true (default) = ano, false = ne)
        * @param {IGGridCellContext<Gordic.Fuc.Interface.GZapoctovyListDto> | undefined} cellContext kontext z gridu (pouze pro contextMenu = true) (default = undefinedundefined)
        * @returns {(string | undefined)[] | (string | (string | undefined)[] | { action: GAction | undefined; primary: true; favorite: true; })[]} seznam akcí
        */
    function getMenuActions(): (string | undefined)[] | (string | (string | undefined)[] | {
        action: GAction | undefined;
        primary: true;
        favorite: true;
    })[] | MenuParams[];
    /**
     * Vrátí IXS_Fun_Akt
     *
     */
    function getIxsFunAkt(): string;
    /**
        * Vrátí PID aktuální knihy (nebo null pokud není zadána nebo se jde o režim přes více knih)
        *
        * @returns {string | null} PID aktuální knihy (nebo null pokud není zadána nebo se jde o režim přes více knih)
        */
    function getIxpDen(content: GUctSeznam): string | null;
    /**
     * Zobrazení detailu dokladu v nove zalozce prohlizece
     *
     * @returns {JQuery.Promise<any>} promise s operací
     */
    function openDetailInNewTab(content: GUctSeznam): JQuery.Promise<any>;
}

//#endregion

