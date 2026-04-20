/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       gui.webapp.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Gui.WebApp\Gordic.Gui.WebApp.csproj
*    created     2026-02-16 14:33:44
*    files       Gin\Gui\WebApp.d.ts
*                Gin\Gui\About\GAppInfoDto.d.ts
*                Gin\Gui\About\GDocumentationDto.d.ts
*                Gin\Gui\About\GHelpInfoDto.d.ts
*                Gin\Gui\Consts\GTstDto.d.ts
*                Gin\Gui\Contents\DBParamsDetail\GDBParamsDetailDto.d.ts
*                Gin\Gui\Eko\DTOs\GGridColumnDtoNG.d.ts
*                Gin\Gui\Eko\DTOs\GGridFormatDtoNG.d.ts
*                Gin\Gui\ExpertMode\GExpertModeDto.d.ts
*                Gin\Gui\LicenceKomponent\GInitialLicenceKomponentDto.d.ts
*                Gin\Gui\LicenceKomponent\GLicenceKomponentDto.d.ts
*                Gin\Gui\Log\GLogFileInfoDto.d.ts
*                Gin\Gui\Log\GLogInitDto.d.ts
*                Gin\Gui\Log\GLogRuleConfigDto.d.ts
*                Gin\Gui\Signature\Certs\GCertificateDto.d.ts
*                Gin\Gui\Zastupy\GZastupyCommon.d.ts
*                Gin\Gui\Zastupy\Dto\GDetailZastupuDlgDto.d.ts
*                Gin\Gui\Zastupy\Dto\GSeznamZastupuDto.d.ts
*                Gin\Gui\Zastupy\Dto\GSeznamZastupuLoadDataInputDto.d.ts
*                Gin\Gui\ZmenaHeslaUzivatele\GZmenaHeslaFormularDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\WebApp.d.ts 

declare namespace Gordic.WebApp.Utility {

    interface IGLinkOptions {
        ticketType?: Gordic.Enums.TicketType
        /** "hh:mm:ss" */
        extensionTime?: string,
        defaultLocation?: URL
    }

    interface OpenAppParams {
        faze: string | null | Gordic.General.ApplicationInterface.GPrepareSessionRequestDto,
        commandName?: string|null,
        data?: ObjectLiteral<any>,
        options?: IGLinkOptions
    }
    /**
     * Returns info about application if exists or undefined if not
     * 
     * @param {string} faze
     * @returns {Gordic.ControlsLogic.Interface.GSlgItemDto}
     */
    function getAppInfo(faze:string): Gordic.ControlsLogic.Interface.GSlgItemDto | undefined;
    /**
     * Opens some specific named content
     * 
     * @param {string} content
     * @returns {JQuery}
     */
    function open(content: "DBParamsList"): JQuery;

    /**
     * Opens App in new tab 
     * @param {string|null|Gordic.General.ApplicationInterface.GPrepareSessionRequestDto} faze Faze of target app - can be null (current location is used)
     *                      or string like GWAUKA05 
     *                      or object for prepared session app opening
     * @param {string} commandName  Identifier of command in target app - can be null
     * @param {object} data Object to searialize into query.
     * @param {object} options  ticketType(Gordic.Enums.TicketType) - default is .None
     * @returns {JQueryPromise<string>} new window with app.
     */
    function openApp(faze?: string | null | Gordic.General.ApplicationInterface.GPrepareSessionRequestDto | OpenAppParams , commandName?: string|null, data?: ObjectLiteral<any>|null, options?: IGLinkOptions): JQueryPromise<Window>

    /**
     * Opens given url with window.open
     * 
     * @param {string | JQueryPromise<string>} url Url to open, can be promise.
     * @returns {JQueryPromise<Window>} new window object.
     */
    function openUrl(url: string | JQueryPromise<string>): JQueryPromise<Window>

    /**
     * Returns link for given app and serializes identifier and dto into query.
     * @param {string} faze  Target app faze. If null, current location is used.
     * @param {string} commandName Identifier placed into lId query property.
     * @param {object} data Object to searialize into query.
     * @param {object} options  ticketType(Gordic.Enums.TicketType) - default is .None
     * @returns {JQueryPromise<string>} link to app with query.
     */
    function createCommandUrl(faze: string | null | Gordic.General.ApplicationInterface.GPrepareSessionRequestDto, commandName: string|null, data?: ObjectLiteral<any>, options?: IGLinkOptions): JQueryPromise<string>
}

declare namespace Gordic.Enums {
    enum TicketType {
        /**
         * Without ticket - without automatic login - without same context
         */
        None,
        /**
         * With ticket - with automatic login - without same context
         */
        WithLogin,
        /**
         * With ticket - with automatic login - with same context
         */
        WithLoginAndContext
    }

}

declare namespace Gordic.Consts {
    const Tst: Gordic.Gui.WebApp.GTstDto | undefined;
    const Apps: Gordic.ControlsLogic.Interface.GSlgItemDto[];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\About\GAppInfoDto.d.ts 

declare namespace Gordic.Gui.WebApp {
	/**DTO s info o aplikaci*/
	interface GAppInfoDto {
		/**Nazev aplikace*/
		name: string;
		/**Revize*/
		revize: string;
		/**Faze*/
		faze: string;
		/**ModuleTitle*/
		moduleTitle: string;
		/**Licence*/
		licence: string;
		/**Funkce*/
		funkce: string;
		/**NazevOrj*/
		nazevOrj: string;
		/**NazevOrj*/
		nazevIns: string;
		/**Zkratka*/
		zkratka: string;
		/**Referent*/
		referent: string;
		/**Nazev spisoveho uzlu*/
		nazevSu: string;
		/**MachineName*/
		machineName: string;
		/**Copyright*/
		copyright: string;
		/**GinisEdition*/
		ginisEdition: string;
		/**Pismeno edice*/
		ginisEditionCode: string;
		/**Verze*/
		version: number;
		/**API key pro zapnuti debug modu*/
		apiKey: string;
		/**HelpMenu*/
		readonly helpInfo: Gordic.Gui.WebApp.GHelpInfoDto;
		/**Jazyk*/
		readonly culture: string;
	}
	const enum GAppInfoDtoNames { name = "name", revize = "revize", faze = "faze", moduleTitle = "moduleTitle", licence = "licence", funkce = "funkce", nazevOrj = "nazevOrj", nazevIns = "nazevIns", zkratka = "zkratka", referent = "referent", nazevSu = "nazevSu", machineName = "machineName", copyright = "copyright", ginisEdition = "ginisEdition", ginisEditionCode = "ginisEditionCode", version = "version", apiKey = "apiKey", helpInfo = "helpInfo", culture = "culture",}
	const enum GAppInfoDtoFragments { name = "*", revize = "*", faze = "*", moduleTitle = "*", licence = "*", funkce = "*", nazevOrj = "*", nazevIns = "*", zkratka = "*", referent = "*", nazevSu = "*", machineName = "*", copyright = "*", ginisEdition = "*", ginisEditionCode = "*", version = "*", apiKey = "*", helpInfo = "*", culture = "*",}
	const enum GAppInfoDtoTypes { name = "string", revize = "string", faze = "string", moduleTitle = "string", licence = "string", funkce = "string", nazevOrj = "string", nazevIns = "string", zkratka = "string", referent = "string", nazevSu = "string", machineName = "string", copyright = "string", ginisEdition = "string", ginisEditionCode = "string", version = "number", apiKey = "string", helpInfo = "Gordic.Gui.WebApp.GHelpInfoDto", culture = "string",}
	const enum GAppInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\About\GDocumentationDto.d.ts 

declare namespace Gordic.Gui.WebApp {
	/**Dto k URL + meta*/
	interface GDocumentationItemDto {
		/**URL*/
		file?: string|null;
		/**Popis*/
		title?: string|null;
		/**Popis*/
		culture?: string|null;
	}
	const enum GDocumentationItemDtoNames { file = "file", title = "title", culture = "culture",}
	const enum GDocumentationItemDtoFragments { file = "*", title = "*", culture = "*",}
	const enum GDocumentationItemDtoTypes { file = "string", title = "string", culture = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\About\GHelpInfoDto.d.ts 

declare namespace Gordic.Gui.WebApp {
    /**DTO k napovede*/
	interface GHelpInfoDto {
        /**Seznam dalsich URL, ktera maji byt zobrazeny v menu napovedy*/
		readonly urls: ReadonlyArray<Gordic.Gui.WebApp.GHelpInfoDto.GHelpUrlDto>;
	}
	const enum GHelpInfoDtoNames { urls = "urls",}
	const enum GHelpInfoDtoFragments { urls = "*",}
	const enum GHelpInfoDtoTypes { urls = "ReadonlyArray<Gordic.Gui.WebApp.GHelpInfoDto.GHelpUrlDto>",}
}
declare namespace Gordic.Gui.WebApp.GHelpInfoDto {
    /**Dto k URL + meta*/
	interface GHelpUrlDto {
        /**URL*/
		url?: string|null;
        /**Popis*/
		caption?: string|null;
	}
	const enum GHelpUrlDtoNames { url = "url", caption = "caption",}
	const enum GHelpUrlDtoFragments { url = "*", caption = "*",}
	const enum GHelpUrlDtoTypes { url = "string", caption = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Consts\GTstDto.d.ts 

declare namespace Gordic.Gui.WebApp {
    /**DTO info z TST*/
	interface GTstDto {
        /**Revize (komplet)*/
		readonly revision: string;
        /**Faze (3 pismena, napr. UKA)*/
		readonly module: string;
        /**Faze (5 pismen, napr. UKA05)*/
		readonly moduleLong: string;
        /**Hlavni verze (suda vetev), napr. 482*/
		readonly major: number;
        /**Minoritni verze*/
		readonly minor: number;
        /**Zakaznik (napr. X)*/
		readonly customer: string;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Contents\DBParamsDetail\GDBParamsDetailDto.d.ts 

declare namespace Gordic.Gui.WebApp {
    /**DTO pro detail DB parametru*/
	interface GDBParamsDetailDto {
        /**Parametr vraceny z listu vsech parametru*/
		parametr?: string|null;
        /**Slovní název parametru*/
		param_txt?: string|null;
        /**Popis DB parametru*/
		popis?: string|null;
        /**Typ DB parametru*/
		typ_parametru?: number|null;
        /**Slovní popis typu parametru*/
		typ_Parametru_popis?: string|null;
        /**List se seznamem hodnot DB parametru*/
		seznam_hodnot_parametru?: string[]|null;
        /**List se seznamem programatorskych hodnot DB parametru*/
		seznam_programatorskych_hodnot_parametru?: string[]|null;
        /**List se seznamem uzivatelskych hodnot DB parametru*/
		seznam_uzivatelskych_hodnot_parametru?: string[]|null;
        /**List se seznamem dynamických hodnot DB parametru*/
		seznam_hodnot_Dynamic_parametru?: string[]|null;
        /**List s opisy jednotlivých hodnot DB parametru*/
		popisy_hodnot_paramteru?: string[]|null;
        /**Výchozí hodnota DB parametru*/
		vychozi_hodnota_parametru?: string|null;
        /**Priznak pro globalni prirazani k modulum*/
		prirazen_k_modulu_glob?: string|null;
        /**List s moduly, ke kterým je DB parametr přiřazen*/
		prirazen_k_modulu?: string[]|null;
        /**List s úrovněmi, na kterých je DB parametr přístupný*/
		pristupny_na_urovni?: string[]|null;
	}
	const enum GDBParamsDetailDtoNames { parametr = "parametr", param_txt = "param_txt", popis = "popis", typ_parametru = "typ_parametru", typ_Parametru_popis = "typ_Parametru_popis", seznam_hodnot_parametru = "seznam_hodnot_parametru", seznam_programatorskych_hodnot_parametru = "seznam_programatorskych_hodnot_parametru", seznam_uzivatelskych_hodnot_parametru = "seznam_uzivatelskych_hodnot_parametru", seznam_hodnot_Dynamic_parametru = "seznam_hodnot_Dynamic_parametru", popisy_hodnot_paramteru = "popisy_hodnot_paramteru", vychozi_hodnota_parametru = "vychozi_hodnota_parametru", prirazen_k_modulu_glob = "prirazen_k_modulu_glob", prirazen_k_modulu = "prirazen_k_modulu", pristupny_na_urovni = "pristupny_na_urovni",}
	const enum GDBParamsDetailDtoFragments { parametr = "*", param_txt = "*", popis = "*", typ_parametru = "*", typ_Parametru_popis = "*", seznam_hodnot_parametru = "*", seznam_programatorskych_hodnot_parametru = "*", seznam_uzivatelskych_hodnot_parametru = "*", seznam_hodnot_Dynamic_parametru = "*", popisy_hodnot_paramteru = "*", vychozi_hodnota_parametru = "*", prirazen_k_modulu_glob = "*", prirazen_k_modulu = "*", pristupny_na_urovni = "*",}
	const enum GDBParamsDetailDtoTypes { parametr = "string", param_txt = "string", popis = "string", typ_parametru = "number", typ_Parametru_popis = "string", seznam_hodnot_parametru = "string[]", seznam_programatorskych_hodnot_parametru = "string[]", seznam_uzivatelskych_hodnot_parametru = "string[]", seznam_hodnot_Dynamic_parametru = "string[]", popisy_hodnot_paramteru = "string[]", vychozi_hodnota_parametru = "string", prirazen_k_modulu_glob = "string", prirazen_k_modulu = "string[]", pristupny_na_urovni = "string[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Eko\DTOs\GGridColumnDtoNG.d.ts 

declare namespace Gordic.Gui.WebApp {
    export interface GGridColumnDto {
        /**Name (v JS camelCase)*/
        name: string;
        /**Caption - titulek sloupce (v JS camelCase)*/
        caption: string;
        /**Description (v JS camelCase)*/
        description: string;
        /**Sortable (v JS camelCase)*/
        wordSequence: number;
        /**Sortable (v JS camelCase)*/
        sortable: boolean;
        /**SortOrder (v JS camelCase)*/
        sortOrder: string;
        /**SortOrderDesc (v JS camelCase)*/
        sortOrderDesc: string;
        /**Visible, default = true (v JS camelCase)*/ 
        visible: boolean;
        /**Width (v JS camelCase)*/
        width: number;
        /**MaxLength - maximalni pocet znaku v hodnote (v JS camelCase)*/
        maxLength: number;
        /**Group (v JS camelCase)*/
        group: string;
        /**Format (v JS camelCase)*/
        format: string;
        /** ServerFilter */
        serverFilter: any;
        /** Úroveň (číslo) 1 až 15 */
        urovenNum: number;
        /** Maska pro zobrazování daného slova. Vyskládané nuly na délku, kterou se má slovo zobrazovat; Používá pořizovačka */
        zobrazovany: string;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Eko\DTOs\GGridFormatDtoNG.d.ts 

declare namespace Gordic.Gui.WebApp {
    export interface GGridFormatDto {
        /**Sloupce*/
        columns: GGridColumnDto[];
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\ExpertMode\GExpertModeDto.d.ts 

declare namespace Gordic.Gui.WebApp {
	/**DTO Formuláře pro zpřístupnění Expertního módu*/
	interface GExpertModeDto {
		/**Licence databáze*/
		lic?: string|null;
		/**Programová fáze*/
		faze?: string|null;
		/**Identifikátor úlohy z číselníku gdecexp*/
		levelExp?: number|null;
		/**Příznak spuštění expertního režimu*/
		expertModeOpened?: boolean|null;
		/**Generovaný kód pro ověření*/
		expertCode?: string|null;
		/**Vstupní kód pro ověření*/
		entryCode?: string|null;
	}
	const enum GExpertModeDtoNames { lic = "lic", faze = "faze", levelExp = "levelExp", expertModeOpened = "expertModeOpened", expertCode = "expertCode", entryCode = "entryCode",}
	const enum GExpertModeDtoFragments { lic = "*", faze = "*", levelExp = "*", expertModeOpened = "*", expertCode = "*", entryCode = "*",}
	const enum GExpertModeDtoTypes { lic = "string", faze = "string", levelExp = "number", expertModeOpened = "boolean", expertCode = "string", entryCode = "string",}
	const enum GExpertModeDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\LicenceKomponent\GInitialLicenceKomponentDto.d.ts 

declare namespace Gordic.Gui.WebApp {
    /**Třída GInitialKnihovny*/
	interface GInitialLicenceKomponentDto {
        /**Pouzite knihovny*/
		libraries?: Gordic.Gui.WebApp.GLicenceKomponentDto[]|null;
	}
	const enum GInitialLicenceKomponentDtoNames { libraries = "libraries",}
	const enum GInitialLicenceKomponentDtoFragments { libraries = "*",}
	const enum GInitialLicenceKomponentDtoTypes { libraries = "Gordic.Gui.WebApp.GLicenceKomponentDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\LicenceKomponent\GLicenceKomponentDto.d.ts 

declare namespace Gordic.Gui.WebApp {
    /**Pouzite externi knihovny*/
	interface GLicenceKomponentDto {
        /**Text s nazvem knihovny*/
		name?: string|null;
        /**Text s nazvem licence*/
		licenseFile?: string|null;
        /**Text s nazvem licence*/
		licenseLink?: string|null;
        /**Text s odkazem ke stazeni knihovny*/
		downloadLink?: string|null;
        /**Text s LicencnimZnenim*/
		licenseText?: string|null;
	}
	const enum GLicenceKomponentDtoNames { name = "name", licenseFile = "licenseFile", licenseLink = "licenseLink", downloadLink = "downloadLink", licenseText = "licenseText",}
	const enum GLicenceKomponentDtoFragments { name = "*", licenseFile = "*", licenseLink = "*", downloadLink = "*", licenseText = "*",}
	const enum GLicenceKomponentDtoTypes { name = "string", licenseFile = "string", licenseLink = "string", downloadLink = "string", licenseText = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Log\GLogFileInfoDto.d.ts 

declare namespace Gordic.Gui.WebApp {
	/**FileInfo k logu*/
	interface GLogFileInfoDto {
		/**Nazev souboru*/
		fileName?: string|null;
		/**Minimalni level*/
		minLevel?: Gordic.General.ApplicationInterface.GLogLevel|null;
	}
	const enum GLogFileInfoDtoNames { fileName = "fileName", minLevel = "minLevel",}
	const enum GLogFileInfoDtoFragments { fileName = "*", minLevel = "*",}
	const enum GLogFileInfoDtoTypes { fileName = "string", minLevel = "Gordic.General.ApplicationInterface.GLogLevel",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Log\GLogInitDto.d.ts 

declare namespace Gordic.Gui.WebApp {
    /**Inicializacni dto pro zobr. logovani*/
    interface GLogInitDto {
        /**IxsLpc*/
        ixslpc: string;
        /**NazevRf*/
        nazevRf?: string|null;
        /**MinLevel*/
        minLevel: number;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Log\GLogRuleConfigDto.d.ts 

declare namespace Gordic.Gui.WebApp {
	/**Konfigurace serverovych logovacich pravidel*/
	interface GLogRuleConfigDto {
		/**Minimalni level pro zalogovani*/
		minLevel?: number|null;
	}
	const enum GLogRuleConfigDtoNames { minLevel = "minLevel",}
	const enum GLogRuleConfigDtoFragments { minLevel = "*",}
	const enum GLogRuleConfigDtoTypes { minLevel = "number",}
	/**Konfigurace pro logovani do souboru*/
	interface GLogFileRuleConfigDto extends Gordic.Gui.WebApp.GLogRuleConfigDto {
		enabled?: boolean|null;
	}
	const enum GLogFileRuleConfigDtoNames { enabled = "enabled", minLevel = "minLevel",}
	const enum GLogFileRuleConfigDtoFragments { enabled = "*", minLevel = "*",}
	const enum GLogFileRuleConfigDtoTypes { enabled = "boolean", minLevel = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Signature\Certs\GCertificateDto.d.ts 

declare namespace Gordic.Gui.WebApp {
	/**DTO pro přenos informaci o certifikátu*/
	interface GCertificateDto {
		/**Index*/
		index?: number|null;
		/**Nazev certifikatu*/
		subjectName?: string|null;
		/**Nazev vydavatele*/
		issuerName?: string|null;
		/**Platne od*/
		notBefore?: JsonDate|null;
		/**Platne do*/
		notAfter?: JsonDate|null;
		/**Seriove cislo*/
		serialNumber?: string|null;
		/**Otisk certifikatu*/
		thumbprint?: string|null;
		/**Otisk certifikatu s predponou*/
		thumbprintWithPrefix?: string|null;
		/**Typ certifikatu (serverovy, klientsky)*/
		certType?: number|null;
		/**Informace o certifikatu - hlaseni, zavisle na db parametru*/
		certInfo?: string|null;
		/**Indikace, ze se jedna o povolený certifikat*/
		isEnabled?: boolean|null;
		/**Informace o duvodu proc nelze certifikat použít*/
		reason?: string|null;
		/**Řetězec certifikátů*/
		certChain?: Gordic.Security.Service.GCertificateChain|null;
		/**Priznak, zda se ma zobrazit dialog primarne na zadani PINu*/
		showPswdDlg?: boolean|null;
		/**Priznak, zda se ma zobrazit dialog primarne na zadani PINu*/
		certMoreInfo?: Gordic.Security.Service.GCertificateInfoDTO|null;
		/**Typ certifikátu*/
		certTypeText?: string|null;
	}
	const enum GCertificateDtoNames { index = "index", subjectName = "subjectName", issuerName = "issuerName", notBefore = "notBefore", notAfter = "notAfter", serialNumber = "serialNumber", thumbprint = "thumbprint", thumbprintWithPrefix = "thumbprintWithPrefix", certType = "certType", certInfo = "certInfo", isEnabled = "isEnabled", reason = "reason", certChain = "certChain", showPswdDlg = "showPswdDlg", certMoreInfo = "certMoreInfo", certTypeText = "certTypeText",}
	const enum GCertificateDtoFragments { index = "*", subjectName = "*", issuerName = "*", notBefore = "*", notAfter = "*", serialNumber = "*", thumbprint = "*", thumbprintWithPrefix = "*", certType = "*", certInfo = "*", isEnabled = "*", reason = "*", certChain = "*", showPswdDlg = "*", certMoreInfo = "*", certTypeText = "*",}
	const enum GCertificateDtoTypes { index = "number", subjectName = "string", issuerName = "string", notBefore = "JsonDate", notAfter = "JsonDate", serialNumber = "string", thumbprint = "string", thumbprintWithPrefix = "string", certType = "number", certInfo = "string", isEnabled = "boolean", reason = "string", certChain = "Gordic.Security.Service.GCertificateChain", showPswdDlg = "boolean", certMoreInfo = "Gordic.Security.Service.GCertificateInfoDTO", certTypeText = "string",}
	const enum GCertificateDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Zastupy\GZastupyCommon.d.ts 

declare namespace Gordic.Gui.WebApp {
	const enum GZastupyModes {
		Normal//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		A495//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		Demo//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
	interface GZastupyCommon {
		readonly CurrentMode?: Gordic.Gui.WebApp.GZastupyModes|null;
	}
	const enum GZastupyCommonNames { CurrentMode = "CurrentMode",}
	const enum GZastupyCommonFragments { CurrentMode = "*",}
	const enum GZastupyCommonTypes { CurrentMode = "Gordic.Gui.WebApp.GZastupyModes",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Zastupy\Dto\GDetailZastupuDlgDto.d.ts 

declare namespace Gordic.Gui.WebApp {
	/**DTO pro DetailZastupuDlgDto*/
	interface GDetailZastupuDlgDto {
		/**Sem se ukládá hodnota z  promenne MaxDelZast (maximální délka zástupu z GIntervalboxu)*/
		FTDDefaultDayInterval?: number|null;
		/**FTDReadOnly - Zda bude GInterval box editovatelný (true/false)*/
		FTDReadOnly?: boolean|null;
		/**FTDFromDate - Zde je ulozena hodnota FromDate z GIntervalboxu*/
		FTDFromDate?: JsonDate|null;
		/**FTDToDate - Zde je ulozena hodnota ToDate z GIntervalboxu*/
		FTDToDate?: JsonDate|null;
		/**ReferentFilterAktivita - Zde je pole s informacemi, jaká aktivita se má vykonat [100 300 500]*/
		ReferentFilterAktivita?: number[]|null;
		/**MasterPageSettingsOkVisible - Zda bude zobrazena hlavní tab. záznamů*/
		MasterPageSettingsOkVisible?: boolean|null;
		/**FunkceSetValidData pro Funkci - Zde se ukládá hodnota z pole Funkce*/
		Funkce_IxsFun?: string|null;
		/**FunkceSetValidData pro Referenta - Zde se ukládá hodnota z pole Referenta*/
		Referent_IxsRef?: string|null;
		/**FunkceSetValidData pro Referenta*/
		Funkce_IxsRef?: string|null;
		/**FunkceSetValidData pro Fazi - Zde se ukládá hodnota z pole Faze*/
		Faze_IxsFaze?: string|null;
		/**FunkceReadOnly - Zda bude pole Funkce editovatelne*/
		FunkceReadOnly?: boolean|null;
		/**FazeReadOnly -Zda bude pole Faze editovatelne*/
		FazeReadOnly?: boolean|null;
		/**ReferentReadOnly -Zda bude pole Referent editovatelne*/
		ReferentReadOnly?: boolean|null;
		/**ReferentFiltrIxsRefPrihlasenehoUzivatele - Jde o promennou, kam se ulozi IxsRef (DB klic) prihlaseneho uzivatele*/
		ReferentFiltrIxsRefPrihlasenehoUzivatele?: string|null;
		/**ReferentFiltrIxsSuPrihlasenehoUzivatele - Jde o promennou, kam se ulozi IxsSu (středisko spisových uzlů) hodnota prihlaseneho uzivatele*/
		ReferentFiltrIxsSuPrihlasenehoUzivatele?: string|null;
		/**FunkceFilterIxsRef - Zde se ulozi IxsRef (DB klic) prihlaseneho uzivatele*/
		FunkceFilterIxsRef?: string|null;
		/**FazeAllChecked - Zde se ukládá true/false hodnota, zda je zatrhnuta volba všechny fáze*/
		FazeAllChecked?: boolean|null;
		/**FazeAllEnabled - Pro povoleni checkboxu vsechny faze*/
		FazeAllEnabled?: boolean|null;
		/**FazeBaseValueTrimmed znamena zmena faze pri otevirani souboru*/
		FazeBaseValueTrimmed?: string|null;
		/**Filtrovat seznamy osob dle středisek spisových uzlů*/
		ssl_filtrosostr?: number|null;
	}
	const enum GDetailZastupuDlgDtoNames { FTDDefaultDayInterval = "FTDDefaultDayInterval", FTDReadOnly = "FTDReadOnly", FTDFromDate = "FTDFromDate", FTDToDate = "FTDToDate", ReferentFilterAktivita = "ReferentFilterAktivita", MasterPageSettingsOkVisible = "MasterPageSettingsOkVisible", Funkce_IxsFun = "Funkce_IxsFun", Referent_IxsRef = "Referent_IxsRef", Funkce_IxsRef = "Funkce_IxsRef", Faze_IxsFaze = "Faze_IxsFaze", FunkceReadOnly = "FunkceReadOnly", FazeReadOnly = "FazeReadOnly", ReferentReadOnly = "ReferentReadOnly", ReferentFiltrIxsRefPrihlasenehoUzivatele = "ReferentFiltrIxsRefPrihlasenehoUzivatele", ReferentFiltrIxsSuPrihlasenehoUzivatele = "ReferentFiltrIxsSuPrihlasenehoUzivatele", FunkceFilterIxsRef = "FunkceFilterIxsRef", FazeAllChecked = "FazeAllChecked", FazeAllEnabled = "FazeAllEnabled", FazeBaseValueTrimmed = "FazeBaseValueTrimmed", ssl_filtrosostr = "ssl_filtrosostr",}
	const enum GDetailZastupuDlgDtoFragments { FTDDefaultDayInterval = "*", FTDReadOnly = "*", FTDFromDate = "*", FTDToDate = "*", ReferentFilterAktivita = "*", MasterPageSettingsOkVisible = "*", Funkce_IxsFun = "*", Referent_IxsRef = "*", Funkce_IxsRef = "*", Faze_IxsFaze = "*", FunkceReadOnly = "*", FazeReadOnly = "*", ReferentReadOnly = "*", ReferentFiltrIxsRefPrihlasenehoUzivatele = "*", ReferentFiltrIxsSuPrihlasenehoUzivatele = "*", FunkceFilterIxsRef = "*", FazeAllChecked = "*", FazeAllEnabled = "*", FazeBaseValueTrimmed = "*", ssl_filtrosostr = "*",}
	const enum GDetailZastupuDlgDtoTypes { FTDDefaultDayInterval = "number", FTDReadOnly = "boolean", FTDFromDate = "JsonDate", FTDToDate = "JsonDate", ReferentFilterAktivita = "number[]", MasterPageSettingsOkVisible = "boolean", Funkce_IxsFun = "string", Referent_IxsRef = "string", Funkce_IxsRef = "string", Faze_IxsFaze = "string", FunkceReadOnly = "boolean", FazeReadOnly = "boolean", ReferentReadOnly = "boolean", ReferentFiltrIxsRefPrihlasenehoUzivatele = "string", ReferentFiltrIxsSuPrihlasenehoUzivatele = "string", FunkceFilterIxsRef = "string", FazeAllChecked = "boolean", FazeAllEnabled = "boolean", FazeBaseValueTrimmed = "string", ssl_filtrosostr = "number",}
	const enum GDetailZastupuDlgDtoTypeLengths { FTDFromDate = 5,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Zastupy\Dto\GSeznamZastupuDto.d.ts 

declare namespace Gordic.Gui.WebApp {
	/**GSeznamZastupuDto*/
	interface GSeznamZastupuDto {
		/**Autogenerated.*/
		ixs_fun?: string|null;
		/**Autogenerated.*/
		ixs_ref?: string|null;
		/**Autogenerated.*/
		faze?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_od?: JsonDate|null;
		/**Autogenerated.*/
		dat_do?: JsonDate|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		nazev_fun?: string|null;
	}
	const enum GSeznamZastupuDtoNames { ixs_fun = "ixs_fun", ixs_ref = "ixs_ref", faze = "faze", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", nazev = "nazev", nazev_fun = "nazev_fun",}
	const enum GSeznamZastupuDtoFragments { ixs_fun = "*", ixs_ref = "*", faze = "*", aktivita = "*", dat_od = "*", dat_do = "*", nazev = "*", nazev_fun = "*",}
	const enum GSeznamZastupuDtoTypes { ixs_fun = "string", ixs_ref = "string", faze = "string", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", nazev = "string", nazev_fun = "string",}
	const enum GSeznamZastupuDtoTypeLengths { ixs_fun = 12, ixs_ref = 12, faze = 8, nazev = 200, nazev_fun = 200,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\Zastupy\Dto\GSeznamZastupuLoadDataInputDto.d.ts 

declare namespace Gordic.Gui.WebApp {
    /**DTO pro SeznamZastupuLoadDataInputDto*/
	interface GSeznamZastupuLoadDataInputDto {
        /**CheckBox ActFaze - boolean hodnota, zda je checkbox (Pouze tato fáze) zatrhnut*/
		ActFaze?: boolean|null;
        /**CheckBox IRefSbOnly - boolean hodnota, zda je checkBox (Já zastupuji) zathnut*/
		IRefSbOnly?: boolean|null;
        /**CheckBox SbRefMeOnly - boolean hodnota, zda je checkBox (Jsem zastupován) zathnut*/
		SbRefMeOnly?: boolean|null;
        /**IRefSbOnlyVisible boolean hodnota, zda má být checkBox (Já zastupuji) viditelný*/
		IRefSbOnlyVisible?: boolean|null;
        /**SbRefMeOnlyVisible boolean hodnota, zda má být checkBox (Jsem zastupován) viditelný*/
		SbRefMeOnlyVisible?: boolean|null;
	}
	const enum GSeznamZastupuLoadDataInputDtoNames { ActFaze = "ActFaze", IRefSbOnly = "IRefSbOnly", SbRefMeOnly = "SbRefMeOnly", IRefSbOnlyVisible = "IRefSbOnlyVisible", SbRefMeOnlyVisible = "SbRefMeOnlyVisible",}
	const enum GSeznamZastupuLoadDataInputDtoFragments { ActFaze = "*", IRefSbOnly = "*", SbRefMeOnly = "*", IRefSbOnlyVisible = "*", SbRefMeOnlyVisible = "*",}
	const enum GSeznamZastupuLoadDataInputDtoTypes { ActFaze = "boolean", IRefSbOnly = "boolean", SbRefMeOnly = "boolean", IRefSbOnlyVisible = "boolean", SbRefMeOnlyVisible = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Gui.WebApp\Gin\Gui\ZmenaHeslaUzivatele\GZmenaHeslaFormularDto.d.ts 

declare namespace Gordic.Gui.WebApp {
    /**DTO Formuláře pro změnu hesla.*/
	interface GZmenaHeslaFormularDto {
        /**Uzivatel pouze ke cteni*/
		uzivatelReadOnly?: boolean|null;
        /**Prihlaseny uzivatel*/
		uzivatel?: string|null;
        /**Login uzivatele (napr: mikr)*/
		Login?: string|null;
        /**Login pouze ke cteni*/
		LognReadOnly?: boolean|null;
        /**Původní (aktuální) heslo.*/
		stareHeslo?: string|null;
        /**Nové heslo.*/
		noveHeslo?: string|null;
        /**Ověření nového hesla.*/
		overeneHeslo?: string|null;
	}
	const enum GZmenaHeslaFormularDtoNames { uzivatelReadOnly = "uzivatelReadOnly", uzivatel = "uzivatel", Login = "Login", LognReadOnly = "LognReadOnly", stareHeslo = "stareHeslo", noveHeslo = "noveHeslo", overeneHeslo = "overeneHeslo",}
	const enum GZmenaHeslaFormularDtoFragments { uzivatelReadOnly = "*", uzivatel = "*", Login = "*", LognReadOnly = "*", stareHeslo = "*", noveHeslo = "*", overeneHeslo = "*",}
	const enum GZmenaHeslaFormularDtoTypes { uzivatelReadOnly = "boolean", uzivatel = "string", Login = "string", LognReadOnly = "boolean", stareHeslo = "string", noveHeslo = "string", overeneHeslo = "string",}
}

//#endregion

