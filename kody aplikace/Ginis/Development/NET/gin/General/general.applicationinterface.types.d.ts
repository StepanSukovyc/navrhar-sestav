/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       general.applicationinterface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Gordic.General.ApplicationInterface.csproj
*    created     2026-02-16 14:33:44
*    files       AIB\AibModules.d.ts
*                AsyncTasks\DTOs\GAsyncProgressDto.d.ts
*                Base\Gordic.General.ApplicationInterface.GExceptionInfo.d.ts
*                Base\Gordic.General.ApplicationInterface.GObtainPreparedSessionRequestDto.d.ts
*                Base\Gordic.General.ApplicationInterface.GPreparedSessionDto.d.ts
*                Base\Gordic.General.ApplicationInterface.GPrepareSessionRequestDto.d.ts
*                Base\Gordic.General.ApplicationInterface.GRepresentedPublicUserDto.d.ts
*                DataBuilder\GDataAccessRightsEnum.d.ts
*                DataBuilder\GDataFieldDescription.d.ts
*                DataBuilder\GDataList.d.ts
*                DataBuilder\GDataListDescription.d.ts
*                DataBuilder\GDataListResponse.d.ts
*                Dto\GCultureDto.d.ts
*                FileService\GFileInfoDto.d.ts
*                GCalendar\GCalendarIxsFunDto.d.ts
*                GCalendar\GCalendarPorCisloDto.d.ts
*                GCalendar\GCalendarReturnNotificationDto.d.ts
*                GCalendar\GGinsokaDto.d.ts
*                GCalendar\GGinvokaDto.d.ts
*                GroupResult\Gordic.General.ApplicationInterface.GGroupResultItem.d.ts
*                GroupResult\Gordic.General.ApplicationInterface.GGroupResult_custom.d.ts
*                GroupResult\Gordic.General.ApplicationInterface.GIxpDatZmena.d.ts
*                GroupResult\Gordic.General.ApplicationInterface.GIxpSerCisloDatZmena.d.ts
*                Log\Gordic.General.ApplicationInterface.GLogErrorDto.d.ts
*                Log\Gordic.General.ApplicationInterface.GLogMessageDto.d.ts
*                Platform\GPermission.d.ts
*                Sanitization\Enums.d.ts
*                Sanitization\GGinlsanDto.d.ts
*                Sanitization\GHtmlSanitizationDiagnosticsResult.d.ts
*                Security\GCertStoreIdEnum.d.ts
*                Security\GCertStoreStorageAccessType.d.ts
*                Security\GHashAlgEnum.d.ts
*                Security\GTypeOfCertificateEnum.d.ts
*                Totp\Gordic.General.ApplicationInterface.GTotpFilterDto.d.ts
*                Totp\Gordic.General.ApplicationInterface.GTotpPropertiesDto.d.ts
*                Totp\Gordic.General.ApplicationInterface.IGManageTotp.d.ts
*                Utils\GPovoleniPraceSInternimUzivatelem.d.ts
*                Utils\PublicUserLoginRegistrationTypeEnum.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\AIB\AibModules.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Seznam konektorů
	*     Klíčová identifikace konektoru, svázána s pol/ppol pomocí atributu 
	*     NUTNÉ ZACHOVAT ČÍSELNÉ POŘADÍ ENUM
	*/
	const enum AibModules {
		/**UNKNOWN*/
		UNKNOWN=0,
		/**ISDS*/
		ISDS=1,
		/**ISDS_VODZ*/
		ISDS_VODZ=2,
		/**TIME_STAMP*/
		TIME_STAMP=3,
		/**RAK*/
		RAK=4,
		/**NEN*/
		NEN=5,
		/**ISZR*/
		ISZR=6,
		/**IISSP*/
		IISSP=7,
		/**ISOSS*/
		ISOSS=8,
		/**EDSSMVS*/
		EDSSMVS=9,
		/**PPF*/
		PPF=10,
		/**ISIR*/
		ISIR=11,
		/**SECUSTAMP602*/
		SECUSTAMP602=12,
		/**ADIS*/
		ADIS=13,
		/**SIGN*/
		SIGN=14,
		/**CNB*/
		CNB=15,
		/**PRONOM*/
		PRONOM=16,
		/**WSDMS*/
		WSDMS=17,
		/**ISEP*/
		ISEP=18,
		/**RS*/
		RS=19,
		/**EHPNB2B*/
		EHPNB2B=20,
		/**EHPN*/
		EHPN=21,
		/**ZPPORTAL*/
		ZPPORTAL=22,
		/**AIB*/
		AIB=23,
		/**ARES*/
		ARES=24,
		/**FIDOO*/
		FIDOO=25,
		/**MPSV*/
		MPSV=26,
		/**NOTARIUS*/
		NOTARIUS=27,
		/**PAYMENT_TERMINAL*/
		PAYMENT_TERMINAL=28,
		/**INVENTARIZUJ*/
		INVENTARIZUJ=29,
		/**NATHAN*/
		NATHAN=30,
		/**EKLEP*/
		EKLEP=31,
		/**IISSP_CSUIS*/
		IISSP_CSUIS=32,
		/**ISZR_YAMACO*/
		ISZR_YAMACO=33,
		/**LANG_MODEL*/
		LANG_MODEL=34,
		/**AZURE_OPENAI*/
		AZURE_OPENAI=35,
		/**AZURE_OPENAI_AI_SEARCH*/
		AZURE_OPENAI_AI_SEARCH=36,
		/**ISOSSV2*/
		ISOSSV2=37,
		/**REST_PUBLISHER*/
		REST_PUBLISHER=38,
		/**BANK_GATEWAY*/
		BANK_GATEWAY=39,
		/**NEN SSL.*/
		NEN_SSL=40,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\AsyncTasks\DTOs\GAsyncProgressDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Hodnota zpracovani (k podedeni k pripadnemu vlastnimu zpracovani)*/
	interface GAsyncProgressDto {
		/**Hodnota prubehu (pro teplomer)*/
		current: number;
		/**Maximalni hodnota hodnota*/
		total?: number;
		/**Popisek k prubehu*/
		text?: string;
		/**Nepouzivat (toto je internal!!!)*/
		isCancellable?: boolean;
	}
	const enum GAsyncProgressDtoNames { current = "current", total = "total", text = "text", isCancellable = "isCancellable",}
	const enum GAsyncProgressDtoFragments { current = "*", total = "*", text = "*", isCancellable = "*",}
	const enum GAsyncProgressDtoTypes { current = "number", total = "number", text = "string", isCancellable = "boolean",}
	const enum GAsyncProgressDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Base\Gordic.General.ApplicationInterface.GExceptionInfo.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**informace o výjimce*/
	interface GExceptionInfo {
		/**text původní výjimky, tj. výjimky nejvíce zanořené v posloupnosti výjimek*/
		baseMessage?: string|null;
		/**prostý text výjimky bez předpony*/
		shortMessage?: string|null;
		/**text výjimky s předponou*/
		message?: string|null;
		/**text výjimky včetně předpony a textů všech vnořených výjimek*/
		longMessage?: string|null;
		/**kompletní text výjimky včetně podrobností a výpisu zásobníku*/
		completeMessage?: string|null;
		/**příznak výjimky typu uživatelské hlášení*/
		isNonFatal?: boolean|null;
		/**příznak výskytu výjimky typu uživatelské hlášení v posloupnosti výjimek*/
		containsNonFatal?: boolean|null;
		/**text výjimky typu uživatelské hlášení*/
		nonFatalMessage?: string|null;
		/**identifikátor výjimky v databázovém žurnálu*/
		serCisErr?: number|null;
		/**kategorie výjimky*/
		category?: number|null;
		/**nadpis pro okno zobrazující výjimku*/
		title?: string|null;
		/**podrobnosti k textu výjimky*/
		details?: string|null;
		/**výpis zásobníku*/
		stackTrace?: string|null;
		/**fáze aplikace*/
		faze?: string|null;
		/**verze aplikace*/
		verze?: number|null;
		/**subverze aplikace*/
		subverze?: number|null;
		/**revize aplikace*/
		revize?: string|null;
		/**revize DNP*/
		revizeDnp?: string|null;
		/**systémový čas*/
		systemTime?: JsonDate|null;
		/**název systému*/
		systemName?: string|null;
		/**verze .NET Frameworku*/
		netFrameworkVersion?: string|null;
		/**paměť alokovaná prostřednictvím GC v kB*/
		allocatedMemory?: number|null;
		/**soukromá paměť využívaná aktuálním procesem v kB*/
		allocatedPrivateMemory?: number|null;
		/**fyzická paměť využívaná aktuálním procesem v kB*/
		allocatedPhysicalMemory?: number|null;
		/**paměť alokovaná prostřednictvím GC v kB*/
		totalAllocatedMemory?: number|null;
		/**URL adresa HTTP requestu*/
		url?: string|null;
		/**název serveru vyřizujícího HTTP request*/
		serverName?: string|null;
		/**název contentu provádějícího HTTP request*/
		content?: string|null;
		/**databázový profil*/
		profile?: string|null;
		/**typ databáze*/
		databaseType?: string|null;
		/**uživatel*/
		user?: string|null;
		/**název pracovní stanice*/
		compName?: string|null;
		/**typ poskytovatele databázového připojení*/
		providerType?: string|null;
		/**verze OLE DB poskytovatele*/
		oledbProviderVersion?: string|null;
		/**status verze OLE DB poskytovatele*/
		oledbProviderVersionStatus?: string|null;
		/**název databáze*/
		databaseName?: string|null;
		/**název databázového serveru*/
		databaseServerName?: string|null;
		/**verze databázového serveru*/
		databaseServerVersion?: string|null;
		/**plně určená verze databázového serveru*/
		databaseServerVersionFull?: string|null;
		/**úroveň kompatibility databázového serveru*/
		databaseServerCompatibilityLevel?: number|null;
		/**licence databáze*/
		licAdr?: string|null;
		/**verze databáze*/
		verzeDb?: number|null;
		/**subverze databáze*/
		subVerzeDb?: number|null;
		/**revize databáze*/
		revizeAdz?: number|null;
		/**datum a čas změny na testovací databázi*/
		databaseTestFrom?: string|null;
		/**název referenta*/
		nazevRef?: string|null;
		/**název funkce*/
		nazevFun?: string|null;
		/**název instance*/
		nazevIns?: string|null;
		/**název implementace*/
		implementationName?: string|null;
		/**kontakt na implementátora*/
		implementerPhoneNo?: string|null;
		/**e-mail implementátora*/
		implementerMail?: string|null;
		/**poznámka k implementaci*/
		implementationNote?: string|null;
		/**nadpis pro výpis zásobníku*/
		stackTraceTitle?: string|null;
		/**nadpis pro výpis podrobností o aplikaci*/
		applicationInfoTitle?: string|null;
		/**nadpis pro výpis podrobností o databázi*/
		databaseInfoTitle?: string|null;
		/**nadpis pro výpis podrobností o přihlášení*/
		sessionInfoTitle?: string|null;
		/**nadpis pro výpis podrobností o požadavku na přihlášení*/
		authorizationAttemptTitle?: string|null;
		/**nadpis pro výpis podrobností o implementaci*/
		implementationInfoTitle?: string|null;
		/**nadpis pro výpis podrobností o HTTP požadavku*/
		httpInfoTitle?: string|null;
		/**nadpis pro výpis podrobností o alokovaných zdrojích*/
		allocatedResourcesTitle?: string|null;
		/**podrobnosti o aplikaci*/
		applicationInfoText?: string|null;
		/**podrobnosti o databázi*/
		databaseInfoText?: string|null;
		/**podrobnosti o přihlášení*/
		sessionInfoText?: string|null;
		/**podrobnosti o požadavku na přihlášení*/
		authorizationAttemptText?: string|null;
		/**podrobnosti o implementaci*/
		implementationInfoText?: string|null;
		/**podrobnosti o HTTP požadavku*/
		httpInfoText?: string|null;
		/**podrobnosti o alokovaných zdrojích*/
		allocatedResourcesText?: string|null;
		/**počet GDI objektů*/
		gdiHandles?: number|null;
		/**počet USER objektů*/
		userHandles?: number|null;
		/**interní kód databázové výjimky*/
		errCode?: number|null;
		/**sql kód databázové výjimky*/
		sqlErr?: number|null;
		/**isam kód databázové výjimky*/
		isamErr?: number|null;
		/**lokace databázové výjimky*/
		lokErr?: string|null;
		/**typ výjimky*/
		exceptionType?: string|null;
		/**typ původní výjimky, tj. výjimky nejvíce zanořené v posloupnosti výjimek*/
		baseType?: string|null;
		/**seznam všech unikátních typů výjimky v rámci celé posloupnosti výjimek*/
		exceptionTypes?: string[]|null;
		/**příznak 32 bitového systému*/
		is32Bit?: boolean|null;
		/**příznak 64 bitového systému*/
		is64Bit?: boolean|null;
		/**příznak databáze v unicode*/
		useUnicode?: boolean|null;
		/**příznak podpory pro Azure*/
		isAzure?: boolean|null;
		/**příznak výjimky při pokusu o autorizaci*/
		whenAuthorizationAttempt?: boolean|null;
		/**příznak výjimky v autorizované aplikaci*/
		whenAuthorized?: boolean|null;
		/**typ výjimky typu uživatelské hlášení*/
		nonFatalType?: string|null;
		/**data výjimky*/
		data?: any|null;
	}
	const enum GExceptionInfoNames { baseMessage = "baseMessage", shortMessage = "shortMessage", message = "message", longMessage = "longMessage", completeMessage = "completeMessage", isNonFatal = "isNonFatal", containsNonFatal = "containsNonFatal", nonFatalMessage = "nonFatalMessage", serCisErr = "serCisErr", category = "category", title = "title", details = "details", stackTrace = "stackTrace", faze = "faze", verze = "verze", subverze = "subverze", revize = "revize", revizeDnp = "revizeDnp", systemTime = "systemTime", systemName = "systemName", netFrameworkVersion = "netFrameworkVersion", allocatedMemory = "allocatedMemory", allocatedPrivateMemory = "allocatedPrivateMemory", allocatedPhysicalMemory = "allocatedPhysicalMemory", totalAllocatedMemory = "totalAllocatedMemory", url = "url", serverName = "serverName", content = "content", profile = "profile", databaseType = "databaseType", user = "user", compName = "compName", providerType = "providerType", oledbProviderVersion = "oledbProviderVersion", oledbProviderVersionStatus = "oledbProviderVersionStatus", databaseName = "databaseName", databaseServerName = "databaseServerName", databaseServerVersion = "databaseServerVersion", databaseServerVersionFull = "databaseServerVersionFull", databaseServerCompatibilityLevel = "databaseServerCompatibilityLevel", licAdr = "licAdr", verzeDb = "verzeDb", subVerzeDb = "subVerzeDb", revizeAdz = "revizeAdz", databaseTestFrom = "databaseTestFrom", nazevRef = "nazevRef", nazevFun = "nazevFun", nazevIns = "nazevIns", implementationName = "implementationName", implementerPhoneNo = "implementerPhoneNo", implementerMail = "implementerMail", implementationNote = "implementationNote", stackTraceTitle = "stackTraceTitle", applicationInfoTitle = "applicationInfoTitle", databaseInfoTitle = "databaseInfoTitle", sessionInfoTitle = "sessionInfoTitle", authorizationAttemptTitle = "authorizationAttemptTitle", implementationInfoTitle = "implementationInfoTitle", httpInfoTitle = "httpInfoTitle", allocatedResourcesTitle = "allocatedResourcesTitle", applicationInfoText = "applicationInfoText", databaseInfoText = "databaseInfoText", sessionInfoText = "sessionInfoText", authorizationAttemptText = "authorizationAttemptText", implementationInfoText = "implementationInfoText", httpInfoText = "httpInfoText", allocatedResourcesText = "allocatedResourcesText", gdiHandles = "gdiHandles", userHandles = "userHandles", errCode = "errCode", sqlErr = "sqlErr", isamErr = "isamErr", lokErr = "lokErr", exceptionType = "exceptionType", baseType = "baseType", exceptionTypes = "exceptionTypes", is32Bit = "is32Bit", is64Bit = "is64Bit", useUnicode = "useUnicode", isAzure = "isAzure", whenAuthorizationAttempt = "whenAuthorizationAttempt", whenAuthorized = "whenAuthorized", nonFatalType = "nonFatalType", data = "data",}
	const enum GExceptionInfoFragments { baseMessage = "*", shortMessage = "*", message = "*", longMessage = "*", completeMessage = "*", isNonFatal = "*", containsNonFatal = "*", nonFatalMessage = "*", serCisErr = "*", category = "*", title = "*", details = "*", stackTrace = "*", faze = "*", verze = "*", subverze = "*", revize = "*", revizeDnp = "*", systemTime = "*", systemName = "*", netFrameworkVersion = "*", allocatedMemory = "*", allocatedPrivateMemory = "*", allocatedPhysicalMemory = "*", totalAllocatedMemory = "*", url = "*", serverName = "*", content = "*", profile = "*", databaseType = "*", user = "*", compName = "*", providerType = "*", oledbProviderVersion = "*", oledbProviderVersionStatus = "*", databaseName = "*", databaseServerName = "*", databaseServerVersion = "*", databaseServerVersionFull = "*", databaseServerCompatibilityLevel = "*", licAdr = "*", verzeDb = "*", subVerzeDb = "*", revizeAdz = "*", databaseTestFrom = "*", nazevRef = "*", nazevFun = "*", nazevIns = "*", implementationName = "*", implementerPhoneNo = "*", implementerMail = "*", implementationNote = "*", stackTraceTitle = "*", applicationInfoTitle = "*", databaseInfoTitle = "*", sessionInfoTitle = "*", authorizationAttemptTitle = "*", implementationInfoTitle = "*", httpInfoTitle = "*", allocatedResourcesTitle = "*", applicationInfoText = "*", databaseInfoText = "*", sessionInfoText = "*", authorizationAttemptText = "*", implementationInfoText = "*", httpInfoText = "*", allocatedResourcesText = "*", gdiHandles = "*", userHandles = "*", errCode = "*", sqlErr = "*", isamErr = "*", lokErr = "*", exceptionType = "*", baseType = "*", exceptionTypes = "*", is32Bit = "*", is64Bit = "*", useUnicode = "*", isAzure = "*", whenAuthorizationAttempt = "*", whenAuthorized = "*", nonFatalType = "*", data = "*",}
	const enum GExceptionInfoTypes { baseMessage = "string", shortMessage = "string", message = "string", longMessage = "string", completeMessage = "string", isNonFatal = "boolean", containsNonFatal = "boolean", nonFatalMessage = "string", serCisErr = "number", category = "number", title = "string", details = "string", stackTrace = "string", faze = "string", verze = "number", subverze = "number", revize = "string", revizeDnp = "string", systemTime = "JsonDate", systemName = "string", netFrameworkVersion = "string", allocatedMemory = "number", allocatedPrivateMemory = "number", allocatedPhysicalMemory = "number", totalAllocatedMemory = "number", url = "string", serverName = "string", content = "string", profile = "string", databaseType = "string", user = "string", compName = "string", providerType = "string", oledbProviderVersion = "string", oledbProviderVersionStatus = "string", databaseName = "string", databaseServerName = "string", databaseServerVersion = "string", databaseServerVersionFull = "string", databaseServerCompatibilityLevel = "number", licAdr = "string", verzeDb = "number", subVerzeDb = "number", revizeAdz = "number", databaseTestFrom = "string", nazevRef = "string", nazevFun = "string", nazevIns = "string", implementationName = "string", implementerPhoneNo = "string", implementerMail = "string", implementationNote = "string", stackTraceTitle = "string", applicationInfoTitle = "string", databaseInfoTitle = "string", sessionInfoTitle = "string", authorizationAttemptTitle = "string", implementationInfoTitle = "string", httpInfoTitle = "string", allocatedResourcesTitle = "string", applicationInfoText = "string", databaseInfoText = "string", sessionInfoText = "string", authorizationAttemptText = "string", implementationInfoText = "string", httpInfoText = "string", allocatedResourcesText = "string", gdiHandles = "number", userHandles = "number", errCode = "number", sqlErr = "number", isamErr = "number", lokErr = "string", exceptionType = "string", baseType = "string", exceptionTypes = "string[]", is32Bit = "boolean", is64Bit = "boolean", useUnicode = "boolean", isAzure = "boolean", whenAuthorizationAttempt = "boolean", whenAuthorized = "boolean", nonFatalType = "string", data = "any",}
	const enum GExceptionInfoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Base\Gordic.General.ApplicationInterface.GObtainPreparedSessionRequestDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**požadavek na získání informací o připravené relaci*/
	interface GObtainPreparedSessionRequestDto {
		/**token pro vytvoření klonu existující relace*/
		cloneToken?: string|null;
		/**vstupenka do systému*/
		ticket?: string|null;
		/**identifikátor připravené relace*/
		sessionId?: string|null;
	}
	const enum GObtainPreparedSessionRequestDtoNames { cloneToken = "cloneToken", ticket = "ticket", sessionId = "sessionId",}
	const enum GObtainPreparedSessionRequestDtoFragments { cloneToken = "*", ticket = "*", sessionId = "*",}
	const enum GObtainPreparedSessionRequestDtoTypes { cloneToken = "string", ticket = "string", sessionId = "string",}
	const enum GObtainPreparedSessionRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Base\Gordic.General.ApplicationInterface.GPreparedSessionDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**informace o připravené relaci*/
	interface GPreparedSessionDto {
		/**identifikátor objektu*/
		ixx1?: string|null;
		/**druhý identifikátor objektu v případě složeného klíče*/
		ixx2?: string|null;
		/**třetí identifikátor objektu v případě složeného klíče*/
		ixx3?: string|null;
		/**cílová agenda*/
		typAg?: number|null;
		/**cílová fáze*/
		faze?: string|null;
		/**token pro vytvoření klonu existující relace*/
		cloneToken?: string|null;
		/**vstupenka do systému*/
		ticket?: string|null;
		/**identifikátor připravené relace*/
		sessionId?: string|null;
		/**parametry kontextu připravené relace*/
		parameters?: any|null;
		/**příznak požadavku na použití aktuální fáze*/
		useCurrentApp?: boolean|null;
	}
	const enum GPreparedSessionDtoNames { ixx1 = "ixx1", ixx2 = "ixx2", ixx3 = "ixx3", typAg = "typAg", faze = "faze", cloneToken = "cloneToken", ticket = "ticket", sessionId = "sessionId", parameters = "parameters", useCurrentApp = "useCurrentApp",}
	const enum GPreparedSessionDtoFragments { ixx1 = "*", ixx2 = "*", ixx3 = "*", typAg = "*", faze = "*", cloneToken = "*", ticket = "*", sessionId = "*", parameters = "*", useCurrentApp = "*",}
	const enum GPreparedSessionDtoTypes { ixx1 = "string", ixx2 = "string", ixx3 = "string", typAg = "number", faze = "string", cloneToken = "string", ticket = "string", sessionId = "string", parameters = "any", useCurrentApp = "boolean",}
	const enum GPreparedSessionDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Base\Gordic.General.ApplicationInterface.GPrepareSessionRequestDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**požadavek na přípravu otevření nové relace*/
	interface GPrepareSessionRequestDto {
		/**identifikátor objektu*/
		ixx1?: string|null;
		/**druhý identifikátor objektu v případě složeného klíče*/
		ixx2?: string|null;
		/**třetí identifikátor objektu v případě složeného klíče*/
		ixx3?: string|null;
		/**cílová agenda*/
		typAg?: number|null;
		/**cílová fáze*/
		faze?: string|null;
		/**příznak zákazu použití aktuální fáze*/
		banCurrentApp?: boolean|null;
		/**příznak vyvolání výjimky při nenalezení žádné cílové fáze*/
		noAppFail?: boolean|null;
	}
	const enum GPrepareSessionRequestDtoNames { ixx1 = "ixx1", ixx2 = "ixx2", ixx3 = "ixx3", typAg = "typAg", faze = "faze", banCurrentApp = "banCurrentApp", noAppFail = "noAppFail",}
	const enum GPrepareSessionRequestDtoFragments { ixx1 = "*", ixx2 = "*", ixx3 = "*", typAg = "*", faze = "*", banCurrentApp = "*", noAppFail = "*",}
	const enum GPrepareSessionRequestDtoTypes { ixx1 = "string", ixx2 = "string", ixx3 = "string", typAg = "number", faze = "string", banCurrentApp = "boolean", noAppFail = "boolean",}
	const enum GPrepareSessionRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Base\Gordic.General.ApplicationInterface.GRepresentedPublicUserDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**informace o externím uživateli typu veřejnost dostupném pro zástup*/
	interface GRepresentedPublicUserDto {
		/**identifikátor externího uživatele typu veřejnost*/
		ixsExuZas?: string|null;
		/**pořadové číslo zástupu*/
		porCisZas?: number|null;
		/**identifikátor externího subektu*/
		ixsEsuZas?: string|null;
		/**název externího subjektu*/
		esuTxt?: string|null;
		/**stupeň verifikace*/
		verifExuZas?: number|null;
	}
	const enum GRepresentedPublicUserDtoNames { ixsExuZas = "ixsExuZas", porCisZas = "porCisZas", ixsEsuZas = "ixsEsuZas", esuTxt = "esuTxt", verifExuZas = "verifExuZas",}
	const enum GRepresentedPublicUserDtoFragments { ixsExuZas = "*", porCisZas = "*", ixsEsuZas = "*", esuTxt = "*", verifExuZas = "*",}
	const enum GRepresentedPublicUserDtoTypes { ixsExuZas = "string", porCisZas = "number", ixsEsuZas = "string", esuTxt = "string", verifExuZas = "number",}
	const enum GRepresentedPublicUserDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\DataBuilder\GDataAccessRightsEnum.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Přenosový kontejner pro data o základních přístupových právech k obecnému subjektu*/
	interface GDataAccessRightsEnum {
		/**Povolení editovat subjekt*/
		Read?: boolean|null;
		/**Zdůvodnění nastavení Read práv - standardně bude prázdno
		*     Očekává se vysvětlená pouze v případě false
		*/
		ReadReason?: string|null;
		/**Povolení editovat subjekt*/
		Write?: boolean|null;
		/**Zdůvodnění nastavení Write práv - standardně bude prázdno
		*     Očekává se vysvětlená pouze v případě false
		*/
		WriteReason?: string|null;
		/**Povolení zakládat subjekt*/
		Create?: boolean|null;
		/**Zdůvodnění nastavení Create práv - standardně bude prázdno
		*     Očekává se vysvětlená pouze v případě false
		*/
		CreateReason?: string|null;
		/**Povolení mazat subjekt*/
		Delete?: boolean|null;
		/**Zdůvodnění nastavení Delete práv - standardně bude prázdno
		*     Očekává se vysvětlená pouze v případě false
		*/
		DeleteReason?: string|null;
	}
	const enum GDataAccessRightsEnumNames { Read = "Read", ReadReason = "ReadReason", Write = "Write", WriteReason = "WriteReason", Create = "Create", CreateReason = "CreateReason", Delete = "Delete", DeleteReason = "DeleteReason",}
	const enum GDataAccessRightsEnumFragments { Read = "*", ReadReason = "*", Write = "*", WriteReason = "*", Create = "*", CreateReason = "*", Delete = "*", DeleteReason = "*",}
	const enum GDataAccessRightsEnumTypes { Read = "boolean", ReadReason = "string", Write = "boolean", WriteReason = "string", Create = "boolean", CreateReason = "string", Delete = "boolean", DeleteReason = "string",}
	const enum GDataAccessRightsEnumTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\DataBuilder\GDataFieldDescription.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Metadata popisující jednu datovou položku seznamu nebo detailu*/
	interface GDataFieldDescription {
		/**Příznak, že položka je součástí primárního klíče*/
		field_is_pk?: boolean|null;
		/**Redukovaný datový typ položky - typ určený pro JavaScript*/
		field_base_type?: Gordic.General.GFieldBaseTypeEnum|null;
		/**Max. velikost položky ( asi pouze u string položek )*/
		field_size?: number|null;
		/**Max. velikost obsažené hodnty datové položky - určeno pro seznamy ( obsahuje největší délku dat v rámci celého seznamu )*/
		field_max_data_size?: number|null;
		/**Programátorské označení položky ( ID ) položky*/
		field_name?: string|null;
		/**Programátorské označení zdrojové položky k této položce ( ID )  
		*     Např. u vypočítávaných sloupců je zde odkaz na zdrojový sloupec (pokud je jeden).
		*     U textových sloupců číselníku je zde odkaz na sloupec s číselníkovou hodnotou 
		*     ( např. field_name = "aktivita_txt" => field_name_source = "aktivita"
		*     Standardně bude NULL
		*/
		field_name_source?: string|null;
		/**Popisek políčka*/
		field_caption?: string|null;
		/**Zkrácený popisek políčka - může být null a potom to znamená, že není uveden zkrácený tvar popisu*/
		field_short_caption?: string|null;
		/**Text tooltipu pro políčko*/
		field_tooltip?: string|null;
		/**Příznak, že položka může být zobrazována uživatelům ( opakem je pomocná, technická položka ) - položka se ale z množiny přenášených dat neodstraňuje.*/
		field_visible?: boolean|null;
		/**příznak, že položka nesmí být měněna (editována)*/
		field_readonly?: boolean|null;
		/**Příznak, že pole je pro vyplnění povinné*/
		field_mandatory?: boolean|null;
	}
	const enum GDataFieldDescriptionNames { field_is_pk = "field_is_pk", field_base_type = "field_base_type", field_size = "field_size", field_max_data_size = "field_max_data_size", field_name = "field_name", field_name_source = "field_name_source", field_caption = "field_caption", field_short_caption = "field_short_caption", field_tooltip = "field_tooltip", field_visible = "field_visible", field_readonly = "field_readonly", field_mandatory = "field_mandatory",}
	const enum GDataFieldDescriptionFragments { field_is_pk = "*", field_base_type = "*", field_size = "*", field_max_data_size = "*", field_name = "*", field_name_source = "*", field_caption = "*", field_short_caption = "*", field_tooltip = "*", field_visible = "*", field_readonly = "*", field_mandatory = "*",}
	const enum GDataFieldDescriptionTypes { field_is_pk = "boolean", field_base_type = "Gordic.General.GFieldBaseTypeEnum", field_size = "number", field_max_data_size = "number", field_name = "string", field_name_source = "string", field_caption = "string", field_short_caption = "string", field_tooltip = "string", field_visible = "boolean", field_readonly = "boolean", field_mandatory = "boolean",}
	const enum GDataFieldDescriptionTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\DataBuilder\GDataList.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Obálka pro datový objekt obecného seznamu*/
	interface GDataList {
		/**Popis parametrů seznamu*/
		list_description?: Gordic.General.ApplicationInterface.GDataListDescription|null;
		/**Data seznamu*/
		list_data?: ObjectLiteral<object>[]|null;
		/**Pokud je seznam filtrován podle nějakého PK - potom i nově vznikající záznamy musí být přednastaveny podle tohoto PK*/
		detail_data?: ObjectLiteral<object>|null;
		/**List měl obsahovat řádky od čísla - pokud je NULL, potom dolní hraníce nebyla dotazem omezena*/
		row_from?: number|null;
		/**List měl obsahovat řádky do čísla - pokud je NULL, potom horní hranice nebyla dotazem omezena - celkový počet řádků se v tom případě ale zjišťuje z list_data*/
		row_to?: number|null;
	}
	const enum GDataListNames { list_description = "list_description", list_data = "list_data", detail_data = "detail_data", row_from = "row_from", row_to = "row_to",}
	const enum GDataListFragments { list_description = "*", list_data = "*", detail_data = "*", row_from = "*", row_to = "*",}
	const enum GDataListTypes { list_description = "Gordic.General.ApplicationInterface.GDataListDescription", list_data = "ObjectLiteral<object>[]", detail_data = "ObjectLiteral<object>", row_from = "number", row_to = "number",}
	const enum GDataListTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\DataBuilder\GDataListDescription.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Popisná data obecného jednotypového seznamu ( tedy seznamu, kde dominantní roli hrají záznamy jedné tabulky )*/
	interface GDataListDescription {
		/**Datový typ hlavního objektu listu ( měl by to být odkaz na enum GGincobj )*/
		typ_obj?: number|null;
		/**Programátorské označení seznamu ( ID )*/
		list_name?: string|null;
		/**Jméno odpovídajícího DTO objektu pro ISL metodu list
		*     Pokud není vyplněna, potom takové DTo neexistuje
		*/
		isl_list_dto_name?: string|null;
		/**Programátorské označení výchozího edtailu ( ID )  - může být prázdné*/
		detail_name?: string|null;
		/**Jméno odpovídajícího DTO objektu pro ISL metodu read
		*     Pokud není vyplněna, potom takové DTo neexistuje
		*/
		isl_detail_dto_name?: string|null;
		/**Datový typ položek seznamu ( měl by to být odkaz na enum GGincobj )*/
		list_object_type?: number|null;
		/**Popisek políčka*/
		list_caption?: string|null;
		/**Zkrácený popisek políčka - může být null a potom to znamená, že není uveden zkrácený tvar popisu*/
		list_short_caption?: string|null;
		/**List obsahuje řádky od čísla - pokud je NULL, potom dolní hraníce není omezena*/
		row_from?: number|null;
		/**List obsahuje řádky do čísla - pokud je NULL, potom horní hranice není omezena*/
		row_to?: number|null;
		/**Seznam sloupců listu podle jména*/
		list_fields?: Gordic.General.ApplicationInterface.GDataFieldDescription[]|null;
		/**Seznam sloupců, podle kterých se má seznam třídit. Záleží na pořadi prvků v Dictionary
		*     string - jméno sloupce
		*     bool - příznak vzestupného třídění
		*/
		list_order_fields?: any|null;
		/**Seznam sloupců PK - to je sloupců, ktere zaručují v rámci seznamu unikátnost - v drtivé většině případů se jedná o PK databázové tabulky*/
		list_pk_fields?: string[]|null;
		/**Seznam sloupců, které jsou z pohledu uživatele určující ( něci jako uživatelský PK, ale v lidské podobě )
		*     Např. pro tabulku gincakt je to sloupec aktivita_txt
		*/
		list_significant_fields?: string[]|null;
		/**Kolekce přístupových práv k objektu*/
		data_right?: Gordic.General.ApplicationInterface.GDataAccessRightsEnum|null;
	}
	const enum GDataListDescriptionNames { typ_obj = "typ_obj", list_name = "list_name", isl_list_dto_name = "isl_list_dto_name", detail_name = "detail_name", isl_detail_dto_name = "isl_detail_dto_name", list_object_type = "list_object_type", list_caption = "list_caption", list_short_caption = "list_short_caption", row_from = "row_from", row_to = "row_to", list_fields = "list_fields", list_order_fields = "list_order_fields", list_pk_fields = "list_pk_fields", list_significant_fields = "list_significant_fields", data_right = "data_right",}
	const enum GDataListDescriptionFragments { typ_obj = "*", list_name = "*", isl_list_dto_name = "*", detail_name = "*", isl_detail_dto_name = "*", list_object_type = "*", list_caption = "*", list_short_caption = "*", row_from = "*", row_to = "*", list_fields = "*", list_order_fields = "*", list_pk_fields = "*", list_significant_fields = "*", data_right = "*",}
	const enum GDataListDescriptionTypes { typ_obj = "number", list_name = "string", isl_list_dto_name = "string", detail_name = "string", isl_detail_dto_name = "string", list_object_type = "number", list_caption = "string", list_short_caption = "string", row_from = "number", row_to = "number", list_fields = "Gordic.General.ApplicationInterface.GDataFieldDescription[]", list_order_fields = "any", list_pk_fields = "string[]", list_significant_fields = "string[]", data_right = "Gordic.General.ApplicationInterface.GDataAccessRightsEnum",}
	const enum GDataListDescriptionTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\DataBuilder\GDataListResponse.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Kontejner na požadavek o vybudování obecného seznamu*/
	interface GDataListResponse {
		/**Data požadovaného seznamu*/
		data_list?: Gordic.General.ApplicationInterface.GDataList|null;
	}
	const enum GDataListResponseNames { data_list = "data_list",}
	const enum GDataListResponseFragments { data_list = "*",}
	const enum GDataListResponseTypes { data_list = "Gordic.General.ApplicationInterface.GDataList",}
	const enum GDataListResponseTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Dto\GCultureDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Dto jazykové kultury.*/
	interface GCultureDto {
		/**Název kultury (Language Culture Name) dle https://docs.microsoft.com/en-us/previous-versions/commerce-server/ee825488(v=cs.20).
		*     Příklad: "cs-CZ", "en-GB", "uk-UA".
		*/
		Name?: string|null;
		/**Uživatelský přeložený název. 
		*     Příklad: "čeština (Česko)", "English (United Kingdom)", "українська (Україна)".
		*/
		NativeName?: string|null;
		/**Název použité vlajky (dvojpísmený ISO název převedený na malá písmena). 
		*     Příklad: "cz", "gb", "ua".
		*/
		Flag?: string|null;
	}
	const enum GCultureDtoNames { Name = "Name", NativeName = "NativeName", Flag = "Flag",}
	const enum GCultureDtoFragments { Name = "*", NativeName = "*", Flag = "*",}
	const enum GCultureDtoTypes { Name = "string", NativeName = "string", Flag = "string",}
	const enum GCultureDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\FileService\GFileInfoDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Dto pro fileInfo*/
	interface GFileInfoDto {
		/**Meta data pro fileinfo*/
		metaData?: any|null;
		/**identifikator souboru - muze byt int - interni a ext - externi*/
		guid?: string|null;
		/**identifikator souboru pro js*/
		id?: string|null;
		/**nazev souboru*/
		filename?: string|null;
		/**popis souboru (typ)*/
		fileDescription?: string|null;
		/**ikona souboru*/
		fileTypeIcon?: string|null;
		/**velikost souboru textove*/
		fileSize?: string|null;
		/**velikost souboru v B*/
		sizeB?: number|null;
		/**nazev souboru v tempu*/
		tempName?: string|null;
		/**zivotnost (hodiny)*/
		lifetime?: any|null;
		/**doba, kdy dojde k expiraci souboru*/
		expiredBy?: JsonDate|null;
	}
	const enum GFileInfoDtoNames { metaData = "metaData", guid = "guid", id = "id", filename = "filename", fileDescription = "fileDescription", fileTypeIcon = "fileTypeIcon", fileSize = "fileSize", sizeB = "sizeB", tempName = "tempName", lifetime = "lifetime", expiredBy = "expiredBy",}
	const enum GFileInfoDtoFragments { metaData = "*", guid = "*", id = "*", filename = "*", fileDescription = "*", fileTypeIcon = "*", fileSize = "*", sizeB = "*", tempName = "*", lifetime = "*", expiredBy = "*",}
	const enum GFileInfoDtoTypes { metaData = "any", guid = "string", id = "string", filename = "string", fileDescription = "string", fileTypeIcon = "string", fileSize = "string", sizeB = "number", tempName = "string", lifetime = "any", expiredBy = "JsonDate",}
	const enum GFileInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\GCalendar\GCalendarIxsFunDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Dto Kalendáře s funkčními místy k dané události*/
	interface GCalendarIxsFunDto {
		/**Identifikátor ixs_fun*/
		ixs_fun?: string|null;
		/**Pořadové číslo potřebné k doselectování daných funkčních míst*/
		por_cislo?: number|null;
	}
	const enum GCalendarIxsFunDtoNames { ixs_fun = "ixs_fun", por_cislo = "por_cislo",}
	const enum GCalendarIxsFunDtoFragments { ixs_fun = "*", por_cislo = "*",}
	const enum GCalendarIxsFunDtoTypes { ixs_fun = "string", por_cislo = "number",}
	const enum GCalendarIxsFunDtoTypeLengths { ixs_fun = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\GCalendar\GCalendarPorCisloDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Dto Poslední pořadové číslo události*/
	interface GCalendarPorCisloDto {
		/**Poslední pořadové číslo události*/
		por_cislo?: number|null;
	}
	const enum GCalendarPorCisloDtoNames { por_cislo = "por_cislo",}
	const enum GCalendarPorCisloDtoFragments { por_cislo = "*",}
	const enum GCalendarPorCisloDtoTypes { por_cislo = "number",}
	const enum GCalendarPorCisloDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\GCalendar\GCalendarReturnNotificationDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**GCalendarEventsWithStatusAndNotificationDto*/
	interface GCalendarEventsWithStatusAndNotificationDto {
		/**Události se statusem*/
		EventsWithStatus?: Gordic.General.ApplicationInterface.GCalendarEventsWithStatusDto[]|null;
		/**Nenastalé notifikace*/
		Notification?: Gordic.General.ApplicationInterface.GCalendarNotificationDto[]|null;
	}
	const enum GCalendarEventsWithStatusAndNotificationDtoNames { EventsWithStatus = "EventsWithStatus", Notification = "Notification",}
	const enum GCalendarEventsWithStatusAndNotificationDtoFragments { EventsWithStatus = "*", Notification = "*",}
	const enum GCalendarEventsWithStatusAndNotificationDtoTypes { EventsWithStatus = "Gordic.General.ApplicationInterface.GCalendarEventsWithStatusDto[]", Notification = "Gordic.General.ApplicationInterface.GCalendarNotificationDto[]",}
	const enum GCalendarEventsWithStatusAndNotificationDtoTypeLengths {}
	/**GCalendarEventsWithStatusDto*/
	interface GCalendarEventsWithStatusDto {
		/**textový název osoby funkčního místa*/
		nazev_ref?: string|null;
		/**datum od*/
		opakovani?: number|null;
		/**datum od*/
		dat_od?: JsonDate|null;
		/**status důležitost události*/
		status_uda?: number|null;
		/**název*/
		nazev?: string|null;
		/**ixs_oka*/
		ixs_oka?: string|null;
		/**aktivita*/
		aktivita?: number|null;
	}
	const enum GCalendarEventsWithStatusDtoNames { nazev_ref = "nazev_ref", opakovani = "opakovani", dat_od = "dat_od", status_uda = "status_uda", nazev = "nazev", ixs_oka = "ixs_oka", aktivita = "aktivita",}
	const enum GCalendarEventsWithStatusDtoFragments { nazev_ref = "*", opakovani = "*", dat_od = "*", status_uda = "*", nazev = "*", ixs_oka = "*", aktivita = "*",}
	const enum GCalendarEventsWithStatusDtoTypes { nazev_ref = "string", opakovani = "number", dat_od = "JsonDate", status_uda = "number", nazev = "string", ixs_oka = "string", aktivita = "number",}
	const enum GCalendarEventsWithStatusDtoTypeLengths {}
	/**DTO - Nastávající notifikace*/
	interface GCalendarNotificationDto {
		/**Stav události*/
		status_uda?: number|null;
		/**typ avizace*/
		typ_avizace?: number|null;
		/**datum začátku události*/
		dat_od?: JsonDate|null;
		/**název události*/
		nazev_udal?: string|null;
		/**identifikátor události*/
		ixs_oka?: string|null;
		/**identifikátor dokumentu*/
		ixx?: string|null;
		/**popis notifikace*/
		nazev?: string|null;
		/**datum avizace*/
		dat_avizace?: JsonDate|null;
		/**čas avizace do uskutečnění události*/
		val_avizace?: number|null;
		/**jednotka avizace (minuta, hodina, den, týden)*/
		unit_avizace?: number|null;
	}
	const enum GCalendarNotificationDtoNames { status_uda = "status_uda", typ_avizace = "typ_avizace", dat_od = "dat_od", nazev_udal = "nazev_udal", ixs_oka = "ixs_oka", ixx = "ixx", nazev = "nazev", dat_avizace = "dat_avizace", val_avizace = "val_avizace", unit_avizace = "unit_avizace",}
	const enum GCalendarNotificationDtoFragments { status_uda = "*", typ_avizace = "*", dat_od = "*", nazev_udal = "*", ixs_oka = "*", ixx = "*", nazev = "*", dat_avizace = "*", val_avizace = "*", unit_avizace = "*",}
	const enum GCalendarNotificationDtoTypes { status_uda = "number", typ_avizace = "number", dat_od = "JsonDate", nazev_udal = "string", ixs_oka = "string", ixx = "string", nazev = "string", dat_avizace = "JsonDate", val_avizace = "number", unit_avizace = "number",}
	const enum GCalendarNotificationDtoTypeLengths { ixs_oka = 12,}
	/**GCalendarReturnNotificationDto*/
	interface GCalendarReturnNotificationDto {
		/**selectDate*/
		selectDate?: JsonDate|null;
	}
	const enum GCalendarReturnNotificationDtoNames { selectDate = "selectDate",}
	const enum GCalendarReturnNotificationDtoFragments { selectDate = "*",}
	const enum GCalendarReturnNotificationDtoTypes { selectDate = "JsonDate",}
	const enum GCalendarReturnNotificationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\GCalendar\GGinsokaDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Extend GGinsoka*/
	interface GGinsokaExtendDto extends Gordic.General.ApplicationInterface.GGinsokaDto {
		/**List avizací (notifikací či připomínek) k dané události*/
		avizace?: Gordic.General.ApplicationInterface.GGinvokaDto[]|null;
		/**Dto Kalendáře s funkčními místy k dané události*/
		ixs_fun_list?: string[]|null;
	}
	const enum GGinsokaExtendDtoNames { avizace = "avizace", ixs_fun_list = "ixs_fun_list", nazev_ref = "nazev_ref", ixs_oka = "ixs_oka", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", cely_den = "cely_den", opakovani = "opakovani", misto = "misto", uzo = "uzo", poznamka = "poznamka", vidit = "vidit", vidit_su = "vidit_su", vidit_kniha = "vidit_kniha", faze = "faze", ixs_ref = "ixs_ref", ixs_fun = "ixs_fun", ix = "ix", ixx = "ixx", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_nad = "ixs_nad", ixs_fun_puv = "ixs_fun_puv", por_cislo = "por_cislo", status_uda = "status_uda", ixs_exu = "ixs_exu", popis = "popis", c = "c", mena = "mena", zp = "zp", priz_zaplaceno = "priz_zaplaceno",}
	const enum GGinsokaExtendDtoFragments { avizace = "*", ixs_fun_list = "*", nazev_ref = "*", ixs_oka = "*", nazev = "*", dat_od = "*", dat_do = "*", cely_den = "*", opakovani = "*", misto = "*", uzo = "*", poznamka = "*", vidit = "*", vidit_su = "*", vidit_kniha = "*", faze = "*", ixs_ref = "*", ixs_fun = "*", ix = "*", ixx = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_nad = "*", ixs_fun_puv = "*", por_cislo = "*", status_uda = "*", ixs_exu = "*", popis = "*", c = "*", mena = "*", zp = "*", priz_zaplaceno = "*",}
	const enum GGinsokaExtendDtoTypes { avizace = "Gordic.General.ApplicationInterface.GGinvokaDto[]", ixs_fun_list = "string[]", nazev_ref = "string", ixs_oka = "string", nazev = "string", dat_od = "Date", dat_do = "Date", cely_den = "number", opakovani = "number", misto = "string", uzo = "string", poznamka = "string", vidit = "number", vidit_su = "number", vidit_kniha = "number", faze = "string", ixs_ref = "string", ixs_fun = "string", ix = "string", ixx = "string", aktivita = "number", dat_zmena = "Date", zmenu_prov = "string", ixs_nad = "string", ixs_fun_puv = "string", por_cislo = "number", status_uda = "number", ixs_exu = "string", popis = "string", c = "JsonDecimal", mena = "number", zp = "number", priz_zaplaceno = "number",}
	const enum GGinsokaExtendDtoTypeLengths { ixs_oka = 12, nazev = 254, misto = 254, uzo = 1, poznamka = 254, faze = 8, ixs_ref = 12, ixs_fun = 12, ix = 3, ixx = 12, zmenu_prov = 12, ixs_nad = 12, ixs_fun_puv = 12, ixs_exu = 12, popis = 254,}
	/**Ginsoka tabulka s názvem referenta
	*     OBSOLETE
	*/
	interface GGinsokaExpandDto extends Gordic.General.ApplicationInterface.GGinsokaDto {
	}
	const enum GGinsokaExpandDtoNames { nazev_ref = "nazev_ref", ixs_oka = "ixs_oka", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", cely_den = "cely_den", opakovani = "opakovani", misto = "misto", uzo = "uzo", poznamka = "poznamka", vidit = "vidit", vidit_su = "vidit_su", vidit_kniha = "vidit_kniha", faze = "faze", ixs_ref = "ixs_ref", ixs_fun = "ixs_fun", ix = "ix", ixx = "ixx", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_nad = "ixs_nad", ixs_fun_puv = "ixs_fun_puv", por_cislo = "por_cislo", status_uda = "status_uda", ixs_exu = "ixs_exu", popis = "popis", c = "c", mena = "mena", zp = "zp", priz_zaplaceno = "priz_zaplaceno",}
	const enum GGinsokaExpandDtoFragments { nazev_ref = "*", ixs_oka = "*", nazev = "*", dat_od = "*", dat_do = "*", cely_den = "*", opakovani = "*", misto = "*", uzo = "*", poznamka = "*", vidit = "*", vidit_su = "*", vidit_kniha = "*", faze = "*", ixs_ref = "*", ixs_fun = "*", ix = "*", ixx = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_nad = "*", ixs_fun_puv = "*", por_cislo = "*", status_uda = "*", ixs_exu = "*", popis = "*", c = "*", mena = "*", zp = "*", priz_zaplaceno = "*",}
	const enum GGinsokaExpandDtoTypes { nazev_ref = "string", ixs_oka = "string", nazev = "string", dat_od = "Date", dat_do = "Date", cely_den = "number", opakovani = "number", misto = "string", uzo = "string", poznamka = "string", vidit = "number", vidit_su = "number", vidit_kniha = "number", faze = "string", ixs_ref = "string", ixs_fun = "string", ix = "string", ixx = "string", aktivita = "number", dat_zmena = "Date", zmenu_prov = "string", ixs_nad = "string", ixs_fun_puv = "string", por_cislo = "number", status_uda = "number", ixs_exu = "string", popis = "string", c = "JsonDecimal", mena = "number", zp = "number", priz_zaplaceno = "number",}
	const enum GGinsokaExpandDtoTypeLengths { ixs_oka = 12, nazev = 254, misto = 254, uzo = 1, poznamka = 254, faze = 8, ixs_ref = 12, ixs_fun = 12, ix = 3, ixx = 12, zmenu_prov = 12, ixs_nad = 12, ixs_fun_puv = 12, ixs_exu = 12, popis = 254,}
	/**DBTABLE:ginsoka*/
	interface GGinsokaDto {
		/**název referenta*/
		nazev_ref?: string|null;
		/**Identifikátor události*/
		ixs_oka?: string|null;
		/**Název události*/
		nazev?: string|null;
		/**Datum začátku události*/
		dat_od?: Date|null;
		/**Datum konce události*/
		dat_do?: Date|null;
		/**Příznak celodenní události:
		*     0- Ne, 1 - Ano
		*/
		cely_den?: number|null;
		/**Příznak možného opakování události:
		*     0 - událost se neopakuje
		*/
		opakovani?: number|null;
		/**Místo události*/
		misto?: string|null;
		/**Příznak barvy událost, značící například důležitost*/
		uzo?: string|null;
		/**Poznámka k události*/
		poznamka?: string|null;
		/**Viditelnost události*/
		vidit?: number|null;
		/**Viditelnost - spisový uzel*/
		vidit_su?: number|null;
		/**Viditelnost - kniha*/
		vidit_kniha?: number|null;
		/**Fáze*/
		faze?: string|null;
		/**Identifikátor ixs_ref*/
		ixs_ref?: string|null;
		/**Identifikátor ixs_fun*/
		ixs_fun?: string|null;
		/**Identifikátor ix*/
		ix?: string|null;
		/**Identifikátor ixx*/
		ixx?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: Date|null;
		/**Změnu provedl*/
		zmenu_prov?: string|null;
		/**Identifikátor ixs_nad (nadřazená událost, ze které vznikla tato opakující se)*/
		ixs_nad?: string|null;
		/**Identifikátor původce události k vytvoření události
		*     - může se jednat o fázi, ixs_fun, ixs_ref, ixs_esu
		*/
		ixs_fun_puv?: string|null;
		/**pořadové číslo události - informace v jakém pořádí se události ukládaly*/
		por_cislo?: number|null;
		/**Status události:
		*     0 - běžná, 
		*     1 - důležitá (NÁVRH),
		*     2 - přijatá událost,
		*     3 - odmítnutá událost
		*/
		status_uda?: number|null;
		/**identifikátor externího uživatele*/
		ixs_exu?: string|null;
		/**popis*/
		popis?: string|null;
		/**c*/
		c?: JsonDecimal|null;
		/**mena*/
		mena?: number|null;
		/**zp*/
		zp?: number|null;
		/**priz_zaplaceno*/
		priz_zaplaceno?: number|null;
	}
	const enum GGinsokaDtoNames { nazev_ref = "nazev_ref", ixs_oka = "ixs_oka", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", cely_den = "cely_den", opakovani = "opakovani", misto = "misto", uzo = "uzo", poznamka = "poznamka", vidit = "vidit", vidit_su = "vidit_su", vidit_kniha = "vidit_kniha", faze = "faze", ixs_ref = "ixs_ref", ixs_fun = "ixs_fun", ix = "ix", ixx = "ixx", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_nad = "ixs_nad", ixs_fun_puv = "ixs_fun_puv", por_cislo = "por_cislo", status_uda = "status_uda", ixs_exu = "ixs_exu", popis = "popis", c = "c", mena = "mena", zp = "zp", priz_zaplaceno = "priz_zaplaceno",}
	const enum GGinsokaDtoFragments { nazev_ref = "*", ixs_oka = "*", nazev = "*", dat_od = "*", dat_do = "*", cely_den = "*", opakovani = "*", misto = "*", uzo = "*", poznamka = "*", vidit = "*", vidit_su = "*", vidit_kniha = "*", faze = "*", ixs_ref = "*", ixs_fun = "*", ix = "*", ixx = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_nad = "*", ixs_fun_puv = "*", por_cislo = "*", status_uda = "*", ixs_exu = "*", popis = "*", c = "*", mena = "*", zp = "*", priz_zaplaceno = "*",}
	const enum GGinsokaDtoTypes { nazev_ref = "string", ixs_oka = "string", nazev = "string", dat_od = "Date", dat_do = "Date", cely_den = "number", opakovani = "number", misto = "string", uzo = "string", poznamka = "string", vidit = "number", vidit_su = "number", vidit_kniha = "number", faze = "string", ixs_ref = "string", ixs_fun = "string", ix = "string", ixx = "string", aktivita = "number", dat_zmena = "Date", zmenu_prov = "string", ixs_nad = "string", ixs_fun_puv = "string", por_cislo = "number", status_uda = "number", ixs_exu = "string", popis = "string", c = "JsonDecimal", mena = "number", zp = "number", priz_zaplaceno = "number",}
	const enum GGinsokaDtoTypeLengths { ixs_oka = 12, nazev = 254, misto = 254, uzo = 1, poznamka = 254, faze = 8, ixs_ref = 12, ixs_fun = 12, ix = 3, ixx = 12, zmenu_prov = 12, ixs_nad = 12, ixs_fun_puv = 12, ixs_exu = 12, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\GCalendar\GGinvokaDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**vlastni dTO*/
	interface NotificationDto extends Gordic.General.ApplicationInterface.GAsyncProgressDto {
		/**Dto všech informací o právě vydaných notifikacích*/
		notifications?: Gordic.General.ApplicationInterface.NotificationDto.ReturnNotificationDto[]|null;
	}
	const enum NotificationDtoNames { notifications = "notifications", current = "current", total = "total", text = "text",}
	const enum NotificationDtoFragments { notifications = "*", current = "*", total = "*", text = "*",}
	const enum NotificationDtoTypes { notifications = "Gordic.General.ApplicationInterface.NotificationDto.ReturnNotificationDto[]", current = "number", total = "number", text = "string",}
	const enum NotificationDtoTypeLengths {}
}
declare namespace Gordic.General.ApplicationInterface.NotificationDto {
	/**Objekt jedné notifikace*/
	interface ReturnNotificationDto {
		/**Datum Notifikace*/
		NotificationDate?: Date|null;
		/**Zbývající čas k začátku události*/
		NotificationTime?: number|null;
		/**Název události*/
		EventName?: string|null;
		/**Datum začátku události*/
		EventDatOd?: Date|null;
	}
	const enum ReturnNotificationDtoNames { NotificationDate = "NotificationDate", NotificationTime = "NotificationTime", EventName = "EventName", EventDatOd = "EventDatOd",}
	const enum ReturnNotificationDtoFragments { NotificationDate = "*", NotificationTime = "*", EventName = "*", EventDatOd = "*",}
	const enum ReturnNotificationDtoTypes { NotificationDate = "Date", NotificationTime = "number", EventName = "string", EventDatOd = "Date",}
	const enum ReturnNotificationDtoTypeLengths {}
}
declare namespace Gordic.General.ApplicationInterface {
	/**DBTABLE:ginvoka*/
	interface GGinvokaDto {
		/**Identifikátor události*/
		ixs_oka?: string|null;
		/**Typ avizace - oznámení, sms, email*/
		typ_avizace?: number|null;
		/**Datum avizace*/
		dat_avizace?: Date|null;
		/**Poznámka avizace*/
		nazev?: string|null;
		/**Datum změny*/
		dat_zmena?: Date|null;
		/**Změnu provedl*/
		zmenu_prov?: string|null;
		/**hodnota avizace*/
		val_avizace?: number|null;
		/**jednotka avizace*/
		unit_avizace?: number|null;
	}
	const enum GGinvokaDtoNames { ixs_oka = "ixs_oka", typ_avizace = "typ_avizace", dat_avizace = "dat_avizace", nazev = "nazev", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", val_avizace = "val_avizace", unit_avizace = "unit_avizace",}
	const enum GGinvokaDtoFragments { ixs_oka = "*", typ_avizace = "*", dat_avizace = "*", nazev = "*", dat_zmena = "*", zmenu_prov = "*", val_avizace = "*", unit_avizace = "*",}
	const enum GGinvokaDtoTypes { ixs_oka = "string", typ_avizace = "number", dat_avizace = "Date", nazev = "string", dat_zmena = "Date", zmenu_prov = "string", val_avizace = "number", unit_avizace = "number",}
	const enum GGinvokaDtoTypeLengths { ixs_oka = 12, nazev = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\GroupResult\Gordic.General.ApplicationInterface.GGroupResultItem.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Výskedek skupinové operace - jedna položka seznamu*/
	interface GGroupResultItem {
		/**Klíčová hodnota*/
		Key?: string|null;
		/**Text chyby*/
		Error?: string|null;
		/**Zda záznam obsahuje informaci o chybě*/
		readonly IsError?: boolean|null;
		/**Číslo stavu daného řádku*/
		RowState?: number|null;
	}
	const enum GGroupResultItemNames { Key = "Key", Error = "Error", IsError = "IsError", RowState = "RowState",}
	const enum GGroupResultItemFragments { Key = "*", Error = "*", IsError = "*", RowState = "*",}
	const enum GGroupResultItemTypes { Key = "string", Error = "string", IsError = "boolean", RowState = "number",}
	const enum GGroupResultItemTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\GroupResult\Gordic.General.ApplicationInterface.GGroupResult_custom.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Výsledek skupinové operace*/
	type GGroupResult = Gordic.General.ApplicationInterface.GGroupResultItem[];
	
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\GroupResult\Gordic.General.ApplicationInterface.GIxpDatZmena.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**GIxpDatZmena - id písemnosti + datum změny pro hromadné operace*/
	interface GIxpDatZmena {
		/**Identifikátor písemnosti*/
		ixp: string;
		/**Datum poslední změny písemnosti*/
		datZmena: JsonDate|null;
	}
	const enum GIxpDatZmenaNames { ixp = "ixp", datZmena = "datZmena",}
	const enum GIxpDatZmenaFragments { ixp = "*", datZmena = "*",}
	const enum GIxpDatZmenaTypes { ixp = "string", datZmena = "JsonDate",}
	const enum GIxpDatZmenaTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\GroupResult\Gordic.General.ApplicationInterface.GIxpSerCisloDatZmena.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**GIxpSerCisloDatZmena - id písemnosti + ser číslo + datum změny pro hromadné operace*/
	interface GIxpSerCisloDatZmena {
		/**Identifikátor písemnosti*/
		Ixp?: string|null;
		/**Datum poslední změny písemnosti*/
		DatZmena?: JsonDate|null;
		/**Datum poslední změny písemnosti*/
		SerCislo?: number|null;
	}
	const enum GIxpSerCisloDatZmenaNames { Ixp = "Ixp", DatZmena = "DatZmena", SerCislo = "SerCislo",}
	const enum GIxpSerCisloDatZmenaFragments { Ixp = "*", DatZmena = "*", SerCislo = "*",}
	const enum GIxpSerCisloDatZmenaTypes { Ixp = "string", DatZmena = "JsonDate", SerCislo = "number",}
	const enum GIxpSerCisloDatZmenaTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Log\Gordic.General.ApplicationInterface.GLogErrorDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	interface GLogErrorDto {
		stack?: string|null;
		errorCode?: number|null;
		message?: string|null;
		name?: string|null;
		inner?: Gordic.General.ApplicationInterface.GLogErrorDto|null;
		lineNumber?: number|null;
		column?: number|null;
		source?: string|null;
	}
	const enum GLogErrorDtoNames { stack = "stack", errorCode = "errorCode", message = "message", name = "name", inner = "inner", lineNumber = "lineNumber", column = "column", source = "source",}
	const enum GLogErrorDtoFragments { stack = "*", errorCode = "*", message = "*", name = "*", inner = "*", lineNumber = "*", column = "*", source = "*",}
	const enum GLogErrorDtoTypes { stack = "string", errorCode = "number", message = "string", name = "string", inner = "Gordic.General.ApplicationInterface.GLogErrorDto", lineNumber = "number", column = "number", source = "string",}
	const enum GLogErrorDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Log\Gordic.General.ApplicationInterface.GLogMessageDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	interface GLogMessageDto {
		loggerName?: string|null;
		fileName?: string|null;
		authorCode?: number|null;
		data?: object|null;
		error?: Gordic.General.ApplicationInterface.GLogErrorDto|null;
		level: number;
		timeStamp: string;
		secret?: boolean|null;
	}
	const enum GLogMessageDtoNames { loggerName = "loggerName", fileName = "fileName", authorCode = "authorCode", data = "data", error = "error", level = "level", timeStamp = "timeStamp", secret = "secret",}
	const enum GLogMessageDtoFragments { loggerName = "*", fileName = "*", authorCode = "*", data = "*", error = "*", level = "*", timeStamp = "*", secret = "*",}
	const enum GLogMessageDtoTypes { loggerName = "string", fileName = "string", authorCode = "number", data = "object", error = "Gordic.General.ApplicationInterface.GLogErrorDto", level = "number", timeStamp = "string", secret = "boolean",}
	const enum GLogMessageDtoTypeLengths {}
	interface GLogExtensions {
	}
	const enum GLogExtensionsNames {}
	const enum GLogExtensionsFragments {}
	const enum GLogExtensionsTypes {}
	const enum GLogExtensionsTypeLengths {}
	/**Log level*/
	const enum GLogLevel {
		allLevel=-2147483648,
		trace=1000,
		debug=2000,
		info=3000,
		warn=4000,
		error=5000,
		fatal=6000,
		offLevel=2147483647,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Platform\GPermission.d.ts 

declare namespace Gordic.General.ApplicationInterface {
    /**Oprávnění vykonat operaci aplikačních služeb*/
    interface GPermission {
        value?: boolean; //enabled? allowed? permitted? (granted ne)
        message?: string;
        /** Doporučení viditelnosti pro UX */
        visible?: boolean;
    }
    /**Množina oprávnění vykonávat operace aplikačních služeb*/
    interface GPermissionSet {
    }

}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Sanitization\Enums.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Filtracni kriteria*/
	const enum FilterGinlsan {
		/**Stack hash (key)*/
		stack_h,
		/**Hodnota hash (key)*/
		hodnota_h,
		/**ixs_lpc*/
		ixs_lpc,
		/**hodnota*/
		hodnota,
		/**aktivita*/
		aktivita,
		/**dat_mpd*/
		dat_mpd,
		/**dat_zmena*/
		dat_zmena,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Sanitization\GGinlsanDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Dto pro log sanitizeru (tbl ginlsan)*/
	interface GGinlsanDto {
		/**Hash stack trace*/
		stack_h?: string|null;
		/**Hash hodnoty*/
		hodnota_h?: string|null;
		/**ixs_lpc*/
		ixs_lpc?: string|null;
		/**hodnota*/
		hodnota?: Gordic.General.GRawString|null;
		/**stack*/
		stack?: Gordic.General.GRawString|null;
		/**aktivita*/
		aktivita?: number|null;
		/**Datum prvniho vyskytu*/
		dat_mpd?: JsonDate|null;
		/**Datum posledniho vyskytu*/
		dat_zmena?: JsonDate|null;
	}
	const enum GGinlsanDtoNames { stack_h = "stack_h", hodnota_h = "hodnota_h", ixs_lpc = "ixs_lpc", hodnota = "hodnota", stack = "stack", aktivita = "aktivita", dat_mpd = "dat_mpd", dat_zmena = "dat_zmena",}
	const enum GGinlsanDtoFragments { stack_h = "*", hodnota_h = "*", ixs_lpc = "*", hodnota = "*", stack = "*", aktivita = "*", dat_mpd = "*", dat_zmena = "*",}
	const enum GGinlsanDtoTypes { stack_h = "string", hodnota_h = "string", ixs_lpc = "string", hodnota = "Gordic.General.GRawString", stack = "Gordic.General.GRawString", aktivita = "number", dat_mpd = "JsonDate", dat_zmena = "JsonDate",}
	const enum GGinlsanDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Sanitization\GHtmlSanitizationDiagnosticsResult.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Vysledek diagnostiky sanizace HTML*/
	interface GHtmlSanitizationDiagnosticsResult {
		/**Seznam vysledku*/
		readonly Results?: Gordic.General.ApplicationInterface.GHtmlSanitizationDiagnosticsSingleResult[]|null;
		/**Analyzovany string*/
		readonly AnalysedString?: string|null;
		/**Sanizovany string*/
		SanitizedString?: string|null;
		/**Priznak, ze analyza selhala (nekde padla na vyjimku a ta byla potlacena)*/
		AnalysisFailed?: boolean|null;
	}
	const enum GHtmlSanitizationDiagnosticsResultNames { Results = "Results", AnalysedString = "AnalysedString", SanitizedString = "SanitizedString", AnalysisFailed = "AnalysisFailed",}
	const enum GHtmlSanitizationDiagnosticsResultFragments { Results = "*", AnalysedString = "*", SanitizedString = "*", AnalysisFailed = "*",}
	const enum GHtmlSanitizationDiagnosticsResultTypes { Results = "Gordic.General.ApplicationInterface.GHtmlSanitizationDiagnosticsSingleResult[]", AnalysedString = "string", SanitizedString = "string", AnalysisFailed = "boolean",}
	const enum GHtmlSanitizationDiagnosticsResultTypeLengths {}
	/**Jedna odebrana cast stringu*/
	interface GHtmlSanitizationDiagnosticsSingleResult {
		/**Typ pravidla*/
		readonly RuleType?: string|null;
		/**Duvod odebrani*/
		Reason?: string|null;
	}
	const enum GHtmlSanitizationDiagnosticsSingleResultNames { RuleType = "RuleType", Reason = "Reason",}
	const enum GHtmlSanitizationDiagnosticsSingleResultFragments { RuleType = "*", Reason = "*",}
	const enum GHtmlSanitizationDiagnosticsSingleResultTypes { RuleType = "string", Reason = "string",}
	const enum GHtmlSanitizationDiagnosticsSingleResultTypeLengths {}
	/**Odebrany element*/
	interface GHtmlSanitizationDiagnosticsSingleResultElement extends Gordic.General.ApplicationInterface.GHtmlSanitizationDiagnosticsSingleResult {
		/**Typ pravidla*/
		readonly RuleType?: string|null;
		/**Cely odebrany element vc. vnitrku*/
		OuterHtml?: string|null;
	}
	const enum GHtmlSanitizationDiagnosticsSingleResultElementNames { RuleType = "RuleType", OuterHtml = "OuterHtml", Reason = "Reason",}
	const enum GHtmlSanitizationDiagnosticsSingleResultElementFragments { RuleType = "*", OuterHtml = "*", Reason = "*",}
	const enum GHtmlSanitizationDiagnosticsSingleResultElementTypes { RuleType = "string", OuterHtml = "string", Reason = "string",}
	const enum GHtmlSanitizationDiagnosticsSingleResultElementTypeLengths {}
	/**Odebrana hodnota*/
	interface GHtmlSanitizationDiagnosticsSingleResultValue extends Gordic.General.ApplicationInterface.GHtmlSanitizationDiagnosticsSingleResult {
		/**Typ pravidla*/
		readonly RuleType?: string|null;
		/**Odebrana hodnota*/
		Value?: string|null;
	}
	const enum GHtmlSanitizationDiagnosticsSingleResultValueNames { RuleType = "RuleType", Value = "Value", Reason = "Reason",}
	const enum GHtmlSanitizationDiagnosticsSingleResultValueFragments { RuleType = "*", Value = "*", Reason = "*",}
	const enum GHtmlSanitizationDiagnosticsSingleResultValueTypes { RuleType = "string", Value = "string", Reason = "string",}
	const enum GHtmlSanitizationDiagnosticsSingleResultValueTypeLengths {}
	/**Odebrany par klic-hodnota*/
	interface GHtmlSanitizationDiagnosticsSingleResultKeyValue extends Gordic.General.ApplicationInterface.GHtmlSanitizationDiagnosticsSingleResultValue {
		/**Odebrany klic*/
		Key?: string|null;
	}
	const enum GHtmlSanitizationDiagnosticsSingleResultKeyValueNames { Key = "Key", RuleType = "RuleType", Value = "Value", Reason = "Reason",}
	const enum GHtmlSanitizationDiagnosticsSingleResultKeyValueFragments { Key = "*", RuleType = "*", Value = "*", Reason = "*",}
	const enum GHtmlSanitizationDiagnosticsSingleResultKeyValueTypes { Key = "string", RuleType = "string", Value = "string", Reason = "string",}
	const enum GHtmlSanitizationDiagnosticsSingleResultKeyValueTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Security\GCertStoreIdEnum.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**id uloziste certifikatu*/
	const enum GCertStoreIdEnum {
		/**Personal*/
		MY,
		ADDRESSBOOK,
		/**Third-Party Root Certification Authorities*/
		AUTHROOT,
		/**Intermediate Certification Authorities*/
		CA,
		DISALLOWED,
		/**Trusted Root Certification Authorities*/
		ROOT,
		SPC,
		TRUST,
		TRUSTEDPEOPLE,
		TRUSTEDPUBLISHER,
		TWINS,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Security\GCertStoreStorageAccessType.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**typ uloziste certifikatu*/
	const enum GCertStoreStorageAccessType {
		CurrentService=0,
		CurrentUser=1,
		CurrentUserGroupPolicy=2,
		LocalMachine=3,
		LocalMachineEnterprise=4,
		LocalMachineGroupPolicy=5,
		Services=6,
		Users=7,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Security\GHashAlgEnum.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Hash algorithm. 
	*     Corresponds to TElCMSHash.HashAlgorithm
	*/
	const enum GHashAlgEnum {
		/**Unknown*/
		Unknown=0,
		/**SHA1*/
		SHA1=28929,
		/**MD5*/
		MD5=28930,
		/**MD2*/
		MD2=28931,
		/**SHA256*/
		SHA256=28932,
		/**SHA384*/
		SHA384=28933,
		/**SHA512*/
		SHA512=28934,
		/**RIPEMD160*/
		RIPEMD160=28937,
		/**SHA224*/
		SHA224=28935,
		/**MD4*/
		MD4=28936,
		/**CRC32*/
		CRC32=28938,
		/**SSL3*/
		SSL3=28939,
		/**GOST_R3411_1994*/
		GOST_R3411_1994=28940,
		/**WHIRLPOOL*/
		WHIRLPOOL=28941,
		POLY1305=28942,
		SHA3_224=28943,
		SHA3_256=28946,
		SHA3_384=28946,
		SHA3_512=28945,
		BLAKE2S_128=28947,
		BLAKE2S_160=28948,
		BLAKE2S_224=28949,
		BLAKE2S_256=28950,
		BLAKE2B_160=28951,
		BLAKE2B_256=28952,
		BLAKE2B_384=28953,
		BLAKE2B_512=28954,
		SHAKE_128=28955,
		SHAKE_256=28956,
		SHAKE_128_LEN=28957,
		SHAKE_256_LEN=28958,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Security\GTypeOfCertificateEnum.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Typ certifikátu*/
	const enum TypeOfCertificate {
		unknown=-1,
		client=0,
		server=1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Totp\Gordic.General.ApplicationInterface.GTotpFilterDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**přípustné sloupce pro omezení výběru vlastností vícefaktorové autentizace*/
	const enum GTotpFilter {
		/**identifikátor referenta*/
		ixs_ref,
	}
	/**filtr pro omezení výběru vlastností vícefaktorové autentizace*/
	interface GTotpFilterDto {
		/**identifikátor referenta*/
		ixs_ref?: GBaseFilter<string>|null;
	}
	const enum GTotpFilterDtoNames { ixs_ref = "ixs_ref",}
	const enum GTotpFilterDtoFragments { ixs_ref = "*",}
	const enum GTotpFilterDtoTypes { ixs_ref = "GBaseFilter<string>",}
	const enum GTotpFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Totp\Gordic.General.ApplicationInterface.GTotpPropertiesDto.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**vlastnosti vícefaktorové autentizace*/
	interface GTotpPropertiesDto {
		/**identifikátor referenta*/
		ixs_ref?: string|null;
		/**příznak existence klíče pro vícefaktorovou autentizaci*/
		has_key?: boolean|null;
		/**příznak povolení ověřování přístupového kódu v rámci vícefaktorové autentizace*/
		key_enabled?: boolean|null;
		/**příznak povolení vícefaktorové autentizace*/
		totp_enabled?: boolean|null;
		/**klíč pro vícefaktorovou autentizaci v textové formě*/
		key_string?: string|null;
		/**QR kód s klíčem pro vícefaktorovou autentizaci*/
		key_image?: string|null;
	}
	const enum GTotpPropertiesDtoNames { ixs_ref = "ixs_ref", has_key = "has_key", key_enabled = "key_enabled", totp_enabled = "totp_enabled", key_string = "key_string", key_image = "key_image",}
	const enum GTotpPropertiesDtoFragments { ixs_ref = "*", has_key = "*", key_enabled = "*", totp_enabled = "*", key_string = "*", key_image = "*",}
	const enum GTotpPropertiesDtoTypes { ixs_ref = "string", has_key = "boolean", key_enabled = "boolean", totp_enabled = "boolean", key_string = "string", key_image = "string",}
	const enum GTotpPropertiesDtoTypeLengths { ixs_ref = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Totp\Gordic.General.ApplicationInterface.IGManageTotp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro nastavení vícefaktorové autentizace
	* @domain Core
	*/
	interface NastaveniTotp {
		/**získání aktuálního nastavení vícefaktorové autentizace*/
		read(rq?:Gordic.General.ApplicationInterface.GTotpPropertiesDto|CallParams<GServiceReadRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>): _Task<GServiceReadRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>,GServiceReadResponse<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>;
		/**získání údajů pro zobrazení aktuálního klíče pro vícefaktorovou autentizaci*/
		viewKey(rq?:Gordic.General.ApplicationInterface.GTotpPropertiesDto|CallParams<GServiceActionRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>): _Task<GServiceActionRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>,GServiceActionResponse<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>;
		/**povolení ověřování přístupového kódu pro aktuálního uživatele*/
		enableKey(rq?:Gordic.General.ApplicationInterface.GTotpPropertiesDto|CallParams<GServiceActionRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>): _Task<GServiceActionRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>,GServiceActionResponse<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>;
		/**zakázání ověřování přístupového kódu pro aktuálního uživatele*/
		disableKey(rq?:Gordic.General.ApplicationInterface.GTotpPropertiesDto|CallParams<GServiceActionRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>): _Task<GServiceActionRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>,GServiceActionResponse<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>;
		/**vytvoření nového klíče pro vícefaktorovou autentizaci*/
		createKey(rq?:Gordic.General.ApplicationInterface.GTotpPropertiesDto|CallParams<GServiceActionRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>): _Task<GServiceActionRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>,GServiceActionResponse<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>;
		/**smazání klíče pro aktuálního uživatele*/
		deleteKey(rq?:Gordic.General.ApplicationInterface.GTotpPropertiesDto|CallParams<GServiceActionRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>): _Task<GServiceActionRequest<Gordic.General.ApplicationInterface.GTotpPropertiesDto>,GServiceActionResponse<Gordic.General.ApplicationInterface.GTotpPropertiesDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		NastaveniTotp: ServiceBase & Catalog.NastaveniTotp;
	}
	const NastaveniTotp: Client["NastaveniTotp"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Utils\GPovoleniPraceSInternimUzivatelem.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**PovoleniPraceSInternimUzivatelem.*/
	const enum GPovoleniPraceSInternimUzivatelem {
		/**Zakázáno*/
		Zakazano=0,
		/**Pouze přihlášení.*/
		PouzePrihlaseni=10,
		/**Registrace a přihlášení.*/
		RegistraceAPrihlaseni=20,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationInterface\Utils\PublicUserLoginRegistrationTypeEnum.d.ts 

declare namespace Gordic.General.ApplicationInterface {
	/**Způsob registrace uživatele typu veřejnost.*/
	const enum PublicUserLoginRegistrationTypeEnum {
		/**Registrace přes registrační formulář Ginisu.*/
		Ginis,
		/**Registrace přes Datové schránky.*/
		DatoveSchranky,
		/**Registrace přes mojeId.*/
		MojeId,
		/**Registrace přes eIdentitu (NIA).*/
		EIdentita,
		/**Registrace přes VysocinaId.*/
		VysocinaId,
	}
}

//#endregion

