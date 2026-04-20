/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       general.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.General\Gordic.General.csproj
*    created     2026-02-16 14:33:44
*    files       Common\Gordic.General.GCommon.d.ts
*                DataBuilder\GFieldBaseType.d.ts
*                Dto\GSeverityLevelEnum.d.ts
*                Dto\GValidationResult.d.ts
*                Dto\IGDto.d.ts
*                Dto\IGFilterDto.d.ts
*                Events\EventCatalogue\GCloudEvent.d.ts
*                Events\EventCatalogue\GEventChannel.d.ts
*                Filters\Gordic.General.ApplicationInterface.GOperatorValueBase.d.ts
*                Filters\Gordic.General.ApplicationInterface.GOrderBy.d.ts
*                OAuth\OAuthJournalEvents.d.ts
*                OAuth\OAuthPrompt.d.ts
*                OAuth\OAuthService.d.ts
*                Security\IPasswordSecret.d.ts
*                Security\ISecret.d.ts
*                Types\Gordic.General.GIkc.d.ts
*                Types\Gordic.General.GRawString.d.ts
*                Types\GSecureString.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.General\Common\Gordic.General.GCommon.d.ts 

declare namespace Gordic.General {
	/**typ autentizace k proxy serveru (P.Prchal)*/
	const enum GProxyType {
		/**žádná autentizace*/
		none=10,
		/**anonymní autentizace*/
		annonymous=20,
		/**HTTP basic autentizace*/
		basic=30,
		/**NTLM autentizace*/
		ntlm=40,
	}
}
declare namespace Gordic.General.GCommon {
	/**typ databázového stroje*/
	const enum DatabaseType {
		/**nespecifikovaný typ*/
		Undefined=-1,
		/**Informix*/
		Informix=1,
		/**Oracle*/
		Oracle=3,
		/**SQL Server*/
		SqlServer=5,
	}
	/**výsledek autorizace*/
	const enum AuthorizationResult {
		/**autorizace dosud neproběhla*/
		Undefined=-1,
		/**již existuje shodné přihlášení*/
		AnotherSessionExists=-2,
		/**autorizováno*/
		Authorized=0,
		/**zadáno nesprávné uživatelské jméno nebo heslo*/
		WrongLoginOrPassword=1,
		/**netransakční databáze*/
		NonTransactionDatabase=14,
		/**vypršela platnost hesla uživatele*/
		PasswordExpired=17,
		/**neplatná jednorázová vstupenka*/
		InvalidOneShotTicket=18,
		/**některá komponenta aplikace je neaktuální a je připravena k aktualizaci*/
		ReinstallationRequested=19,
		/**některá komponenta aplikace je neaktuální a nelze ji aktualizovat*/
		WrongVersion=20,
		/**příliš nízká verze spouštěné aplikace*/
		VersionIsTooLow=21,
		/**databáze byla přesunuta nebo přejmenována*/
		DatabaseRenamed=22,
		/**v systému nejsou nastavena hesla uživatelů s vyšším oprávněním*/
		WrongSystemPasswords=23,
		/**nastalo období klidu databáze*/
		DatabaseIdle=24,
		/**fáze uzamčena časovým zámkem*/
		PhaseExpired=25,
		/**funkční místo je obsazeno konkurenčně pracujícím uživatelem*/
		UsedByAnotherUser=26,
		/**ukončena platnost uživatele operačníhosystému UNIX*/
		InvalidUnixUser=27,
		/**neplatná trvalá vstupenka*/
		InvalidPermanentTicket=28,
		/**programová fáze byla uzamčena administrátorem systému*/
		PhaseLocked=29,
		/**databáze byla uzamčena licenčním časovým zámkem*/
		DatabaseLicenceExpired=30,
		/**databáze byla uzamčena administrátorem systému*/
		DatabaseLocked=31,
		/**byla zjištěna nepřípustná změna času serveru*/
		UnacceptableTimeChange=32,
		/**nemáte povolen přístup do tohoto modulu*/
		AccessDenied=33,
		/**nepřípustná verze SQL Serveru*/
		WrongVersionSqlServer=34,
		/**nelze se přihlásit z důvodů licenčního omezení*/
		LicenceAcessDenied=35,
		/**není nastaveno oprávnění pro přihlášení do systému*/
		AccessNotSet=36,
		/**přístup do tohoto modulu byl odebrán nebo změněn*/
		AccessRemoved=37,
		/**přístup odmítnut z důvodu zámku v databázi*/
		DatabaseLockAcessDenied=38,
		/**nejednoznačné přihlašovací jméno uživatele typu veřejnost*/
		AmbiguousPublicLogin=44,
		/**nejednoznačná administrace instance pro uživatele typu veřejnost*/
		AmbiguousPublicInstance=51,
		/**nesprávná přihlašovací procedura*/
		InvalidMethod=53,
		/**je zapotřebí provést aktivaci účtu*/
		ActivationRequired=54,
		/**je zapotřebí provést verifikaci účtu*/
		VerificationRequired=55,
	}
	/**režim ukončení databázové transakce*/
	const enum TransactionMode {
		/**bez ukončení transakce*/
		None=0,
		/**transakce bude odrolována zpět*/
		Rollback=1,
		/**transakce bude potvrzena*/
		Commit=2,
	}
	/**typ aplikace*/
	const enum ApplicationType {
		/**aplikace určená pro Windows (tj. typu tlustý klient)*/
		WindowsApplication=40,
		/**aplikace typu systémová služba Windows*/
		WindowsService=43,
		/**aplikace určená pro Web (tj. typu tenký klient)*/
		WebApplication=41,
		/**aplikace typu webová služba*/
		WebService=42,
	}
	/**typ autentizace aplikace*/
	const enum AuthenticationType {
		/**standardní autentizace prostřednictvím zadání jména a hesla*/
		Ginis=0,
		/**autentizace pomocí účtu uživatele přihlášeného do Windows*/
		Windows=1,
		/**autentizace pomocí účtu anonymního uživatele*/
		Anonymous=2,
		/**autentizace pomocí účtu uživatele typu veřejnost*/
		Public=3,
		/**autentizace pomocí účtu uživatele přihlášeného do portálu Bea AquaLogic Interaction*/
		Bea=4,
		/**autentizace pomocí nástroje KeyShield SSO*/
		KeyShield=5,
		/**autentizace pomocí účtu Azure Active Directory*/
		Azure=6,
		/**autentizace pomocí obecného LDAP adresáře*/
		Ldap=7,
	}
	/**režim autentizace do systému*/
	const enum AuthenticationMode {
		/**autentizace pomocí zadání jména a hesla*/
		Ginis=1,
		/**autentizace s použitím účtu operačního systému*/
		Windows=2,
		/**autentizace pomocí účtu Azure Active Directory*/
		Azure=3,
		/**způsob autentizace je volitelný*/
		Selectable=0,
	}
	/**typ poskytovatele databázového připojení*/
	const enum ProviderType {
		/**připojení pomocí OLEDB poskytovatele*/
		OleDb=0,
		/**připojení pomocí nativního .NET poskytovatele*/
		Native=1,
	}
	/**subsystém Ginis*/
	const enum Subsystem {
		/**jádro systému*/
		Gin=1,
		/**ekonomika*/
		Eko=2,
		/**spisová služba*/
		Ssl=3,
		/**registry*/
		Reg=4,
		/**jiný subsystém*/
		Other=0,
	}
	/**způsob odeslání e-mailu*/
	const enum SendMailMethod {
		/**neznámý způsob odeslání*/
		Unknown=-1,
		/**odeslání prostřednictvím SMTP serveru*/
		Smtp=0,
		/**odeslání prostřednictvím extended MAPI*/
		ExtendedMapi=1,
		/**odeslání prostřednictvím MAPI*/
		Mapi=2,
		/**odeslání prostřednictvím SMTP serveru přes Secure BlackBox*/
		SbbSmtp=4,
		/**Office365_Device*/
		Office365_Device=5,
		/**Office365_Default*/
		Office365_Default=6,
		/**Office365_ClientCredentials*/
		Office365_ClientCredentials=7,
		/**GraphAPI*/
		Microsoft_GraphApi=8,
	}
	/**formát e-mailu*/
	const enum MailFormat {
		/**textový formát*/
		Text=0,
		/**HTML formát*/
		Html=1,
	}
	/**přípustnost verze OLE DB provideru*/
	const enum OledbProviderVersionStatus {
		/**nepodporovaná*/
		Unsupported=0,
		/**nedoporučená*/
		Unrecommended=1,
		/**doporučená*/
		Recommended=2,
	}
	/**typ SMS brány*/
	const enum SmsGatewayType {
		/**SMS brána není dostupná*/
		NotSupported,
		/**SMS InfoKanál*/
		SmsInfoKanal,
		/**SMS T-Mobile*/
		SmsTMobile,
		/**SMS O2*/
		SmsO2,
		/**SMS Vodafone*/
		SmsVodafone,
		/**SMS odesílaná pomocí e-mailu*/
		SmsEmail,
	}
	interface DisableReferencedAssemblyVersionCheckClass {
	}
	const enum DisableReferencedAssemblyVersionCheckClassNames {}
	const enum DisableReferencedAssemblyVersionCheckClassFragments {}
	const enum DisableReferencedAssemblyVersionCheckClassTypes {}
	const enum DisableReferencedAssemblyVersionCheckClassTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\DataBuilder\GFieldBaseType.d.ts 

declare namespace Gordic.General {
	/**Třída pro práci se základními hodnotovými typy*/
	interface GFieldBaseType {
	}
	const enum GFieldBaseTypeNames {}
	const enum GFieldBaseTypeFragments {}
	const enum GFieldBaseTypeTypes {}
	const enum GFieldBaseTypeTypeLengths {}
	/**Základní datové typy polí redukované např. pro potřeby JavaScriptu*/
	const enum GFieldBaseTypeEnum {
		/**Bool*/
		BOOLEAN,
		/**Celočíselná čísla*/
		NUMBER,
		/**Desetinná čísla*/
		DECIMAL,
		/**Texty*/
		TEXT,
		/**Datumy*/
		DATE,
		/**DAtum a Čas*/
		DATETIME,
		/**Ostatní*/
		OTHER,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Dto\GSeverityLevelEnum.d.ts 

declare namespace Gordic.General {
	/**Uroven vaznosti*/
	const enum GSeverityLevelEnum {
		/**Info*/
		Info=0,
		/**Warning*/
		Warning,
		/**Error*/
		Error,
		/**Success*/
		Success,
		/**Important*/
		Important,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Dto\GValidationResult.d.ts 

declare namespace Gordic.General {
	/**Vysledek validace*/
	interface GValidationResult {
		/**Error message*/
		message?: string|null;
		/**Cesta k memberu (property/fieldu) v hierarchii DTO*/
		member?: string|null;
		/**Možnost přidání vlastních dat. POZOR: Při použití s APG může být typu JObject!*/
		data?: object|null;
		/**Uroven vaznosti (default = Error)*/
		severity?: Gordic.General.GSeverityLevelEnum|null;
	}
	const enum GValidationResultNames { message = "message", member = "member", data = "data", severity = "severity",}
	const enum GValidationResultFragments { message = "*", member = "*", data = "*", severity = "*",}
	const enum GValidationResultTypes { message = "string", member = "string", data = "object", severity = "Gordic.General.GSeverityLevelEnum",}
	const enum GValidationResultTypeLengths {}
	/**Vysledek validace pres property nebo field*/
	interface GPropertyValidationResult extends Gordic.General.GValidationResult {
	}
	const enum GPropertyValidationResultNames { Success = "Success", message = "message", member = "member", Dto = "Dto", data = "data", severity = "severity",}
	const enum GPropertyValidationResultFragments { Success = "*", message = "*", member = "*", Dto = "*", data = "*", severity = "*",}
	const enum GPropertyValidationResultTypes { Success = "Gordic.General.GValidationResult", message = "string", member = "string", Dto = "object", data = "object", severity = "Gordic.General.GSeverityLevelEnum",}
	const enum GPropertyValidationResultTypeLengths {}
	/**Vysledek validace pomoci business rules.*/
	interface GBusinessValidationResult extends Gordic.General.GValidationResult {
	}
	const enum GBusinessValidationResultNames { Success = "Success", message = "message", member = "member", Dto = "Dto", data = "data", severity = "severity",}
	const enum GBusinessValidationResultFragments { Success = "*", message = "*", member = "*", Dto = "*", data = "*", severity = "*",}
	const enum GBusinessValidationResultTypes { Success = "Gordic.General.GValidationResult", message = "string", member = "string", Dto = "object", data = "object", severity = "Gordic.General.GSeverityLevelEnum",}
	const enum GBusinessValidationResultTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Dto\IGDto.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Dto\IGFilterDto.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Events\EventCatalogue\GCloudEvent.d.ts 

declare namespace Gordic.General {
	/**CloudEvent-like structure
	*     https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md
	*/
	interface GCloudEvent {
		specversion?: string|null;
		type?: string|null;
		source?: string|null;
		id?: string|null;
		time?: string|null;
		datacontenttype?: string|null;
		data?: string|null;
		subject?: string|null;
	}
	const enum GCloudEventNames { specversion = "specversion", type = "type", source = "source", id = "id", time = "time", datacontenttype = "datacontenttype", data = "data", subject = "subject",}
	const enum GCloudEventFragments { specversion = "*", type = "*", source = "*", id = "*", time = "*", datacontenttype = "*", data = "*", subject = "*",}
	const enum GCloudEventTypes { specversion = "string", type = "string", source = "string", id = "string", time = "string", datacontenttype = "string", data = "string", subject = "string",}
	const enum GCloudEventTypeLengths {}
	/**DTO for messages from subscription*/
	interface GSubscriptionMessageDto {
		/**ID of originating subscription*/
		SubscriptionId?: string|null;
		/**List of event messages*/
		Events?: Gordic.General.GCloudEvent[]|null;
	}
	const enum GSubscriptionMessageDtoNames { SubscriptionId = "SubscriptionId", Events = "Events",}
	const enum GSubscriptionMessageDtoFragments { SubscriptionId = "*", Events = "*",}
	const enum GSubscriptionMessageDtoTypes { SubscriptionId = "string", Events = "Gordic.General.GCloudEvent[]",}
	const enum GSubscriptionMessageDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Events\EventCatalogue\GEventChannel.d.ts 

declare namespace Gordic.General {
	/**Channel for same type of events (or events of same interest)*/
	interface GEventChannel {
		/**channel prefix*/
		prefix?: string|null;
		/**ID of event*/
		eventId?: string|null;
		/**Subject filtering parts*/
		subjectParts?: Primitive[]|null;
		/**Domain of event*/
		domain?: string|null;
	}
	const enum GEventChannelNames { prefix = "prefix", eventId = "eventId", subjectParts = "subjectParts", domain = "domain",}
	const enum GEventChannelFragments { prefix = "*", eventId = "*", subjectParts = "*", domain = "*",}
	const enum GEventChannelTypes { prefix = "string", eventId = "string", subjectParts = "Primitive[]", domain = "string",}
	const enum GEventChannelTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Filters\Gordic.General.ApplicationInterface.GOperatorValueBase.d.ts 

declare namespace Gordic.General {
	/**Hodnota a operátor, podle kterých se provádí filtrace.*/
	interface GOperatorValueBase {
		/**Jaká podmínka je použita pro filtrování podle této hodnoty*/
		Operator?: Gordic.General.OperatorEnum|null;
	}
	const enum GOperatorValueBaseNames { Operator = "Operator",}
	const enum GOperatorValueBaseFragments { Operator = "*",}
	const enum GOperatorValueBaseTypes { Operator = "Gordic.General.OperatorEnum",}
	const enum GOperatorValueBaseTypeLengths {}
	/**Operátor pro filtr - podmínka, která je mezi hodnotou slopce a filtračním textem v WHERE podmínce*/
	const enum OperatorEnum {
		/**Znaménko =*/
		Equal=0,
		/**Znaménko !=*/
		NotEqual=1,
		/**LIKE. Pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla*/
		Like=2,
		/**LIKE. Pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla*/
		StartsWith=2,
		/**IN, očekává několik za sebou zřetězených values s OperatorEnum.In, ty poskládá v jeden IN*/
		In=3,
		/**IN, očekává na vstupu GString s hodnotami v textové podobě oddělené čárkou*/
		InText=4,
		/**větší*/
		Greater=5,
		/**menší*/
		Less=6,
		/**větší nebo rovno*/
		GreaterOrEqual=7,
		/**menší nebo rovno*/
		LessOrEqual=8,
		/**vynechává pravou stranu, nechává pouze název sloupce. Používá se v případě, že
		*     aplikační logika si překonstruuje filtr tak, že obsahuje složitější příkaz (například vnořené selecty)
		*     a ten uloží to Columname, filter.Where potom může vrátit jakoukoliv konstrukci
		*/
		OnlyColumname=9,
		/**LIKE. Pokud není v řetězci znak "%", doplní ho na konec i na začátek řetězce, jinak ponechá procenta tak jak byla*/
		Contains=10,
		/**IN, očekává několik za sebou zřetězených values s OperatorEnum.In, ty poskládá v jeden NOT IN*/
		NotIn=11,
		/**NOT LIKE, pokud není v řetězci žádný znak "%", tak doplní procento na konec, jinak ponechá procenta tak jak byla...*/
		NotLike=12,
		/**menší*/
		IntervalLess=134,
		/**menší nebo rovno*/
		IntervalLessOrEqual=136,
		/**NEPOUŽÍVAT. maska pro intervaly*/
		IntervalMask=128,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Filters\Gordic.General.ApplicationInterface.GOrderBy.d.ts 

declare namespace Gordic.General {
	/**OrderBy - struktura předepisující jak se má řadit seznam*/
	interface GOrderBy<TColumnId> {
		/**Směr řazení (sestupně/vzestupně)*/
		Direction?: Gordic.General.OrderDirection|null;
		/**Identifikace sloupce, podle kterého se má řadit*/
		ColumnId?: TColumnId|null;
		/**Textový název sloupce*/
		Column?: string|null;
	}
	const enum GOrderByNames { Direction = "Direction", ColumnId = "ColumnId", Column = "Column",}
	const enum GOrderByFragments { Direction = "*", ColumnId = "*", Column = "*",}
	const enum GOrderByTypes { Direction = "Gordic.General.OrderDirection", ColumnId = "TColumnId", Column = "string",}
	const enum GOrderByTypeLengths {}
	/**Směr v kterém se má provádět řazení*/
	const enum OrderDirection {
		/**Vzestupně*/
		Asc,
		/**Sestupně*/
		Desc,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\OAuth\OAuthJournalEvents.d.ts 

declare namespace Gordic.General {
	/**OAuthJournalEvents*/
	const enum OAuthJournalEvents {
		Generic_AccessToken_ExpiryWarn=10000,
		ClientCredentials_Start=1,
		ClientCredentials_GrantReceived=2,
		ClientCredentials_GrantStarted=3,
		ClientCredentials_GrantCompleted=4,
		ClientCredentials_GrantDenied=5,
		ClientCredentials_InvalidConsentDeleteAccessToken=6,
		ClientCredentials_CachedAccessToken=7,
		ClientCredentials_AccessToken_Failed=8,
		ClientCredentials_AccessToken_Success=9,
		ClientCredentials_MS_LoginMicrosoftCom=10,
		ClientCredentials_MissingClientSecret=11,
		ClientCredentials_ExecuteTokenExtension=12,
		Default_RefreshAccessToken=101,
		Default_RefreshAccessTokenFailed=102,
		Default_RefreshAccessTokenNotFound=103,
		Default_RefreshAccessTokenRedeem=104,
		Default_RefreshAccessStateTokensPrepared=105,
		Default_ReuseAccessToken=106,
		Default_AccessTokenRefreshed=107,
		Default_RefreshAccessTokenNotExists=108,
		Default_RefreshAccessTokenAnotherLogin=109,
		Default_StateVerificationFailed=110,
		Default_StateVerificationFailed2=111,
		Default_StateVerificationOK=112,
		Default_AccessTokenStart=113,
		MSI_UnknownError=200,
		Device_Start=300,
		Device_OpenBrowser=301,
		Device_ShowCodeSecret=302,
		Device_Pool=303,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\OAuth\OAuthPrompt.d.ts 

declare namespace Gordic.General {
	/**OAuthPrompt for OAuth profil*/
	const enum OAuthPrompt {
		/**Default*/
		Default=0,
		/**Forces the user to enter their credentials on that request, negating single-sign on*/
		Login=10,
		/**It is the opposite. It ensures that the user isn't presented with any interactive prompt. If the request can't be completed silently by using single-sign on, the Microsoft identity platform returns an interaction_required error.*/
		None=20,
		/**Consent triggers the OAuth consent dialog after the user signs in, asking the user to grant permissions to the app.*/
		Consent=30,
		/**Select_account interrupts single sign-on providing account selection experience listing all the accounts either in session or any remembered account or an option to choose to use a different account altogether.*/
		SelectAccount=40,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\OAuth\OAuthService.d.ts 

declare namespace Gordic.General {
	/**Available service providers for OAuth*/
	const enum OAuthService {
		/**Mail_SMTP*/
		Mail_SMTP=0,
		/**Vault*/
		Vault=10,
		/**GraphAPI*/
		GraphAPI=20,
		/**Mail_POP3*/
		Mail_POP3=30,
		/**MM_Recogniser*/
		MM_Recogniser=40,
		/**CSAS_API*/
		CSAS_API=50,
		/**BankGateway (CSAS)*/
		BankGateway=51,
		/**Unknown*/
		Unknown=60,
		/**GINIS_ESL*/
		GINIS_ESL=70,
		/**AzureOpenAI*/
		AzureOpenAI=80,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Security\IPasswordSecret.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Security\ISecret.d.ts 

declare namespace Gordic.General {
	/** Password secret */

	interface ISecret {
		readonly Scope: SecretScope
	}

	interface IPasswordSecret {
		readonly Secret: string
	}


	/**Scope of secret*/
	const enum SecretScope {
		/**User*/
		User=0,
		/**Global*/
		Global=90,
		/**Unknown*/
		Unknown=100,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Types\Gordic.General.GIkc.d.ts 

declare namespace Gordic.General {
    type GIkc = string;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Types\Gordic.General.GRawString.d.ts 

declare namespace Gordic.General {
    /** Nebezpecny string, ktery by se mel pred vlozenim tohoto do HTML encodovat. Pro vlozeni do textoveho policka, ktere nema graficky 
     *  vystup, lze hodnotu pouzit tak jak je.
     *  
     *  Priklad: 
     * 
     *  let rs: GRawString = "<a href='javascript:void(0)'>click me</a>";
     *  let securedRs = Gordic.Templates.Formatters.encode(rs); //Vystup vypada takto: "&lt;a href='javascript:void(0)'&gt;click me&lt;/a&gt;"
     * */
    type GRawString = string;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General\Types\GSecureString.d.ts 

declare namespace Gordic.General {
	/**
	*     Třída pro práci s tajemstvím v rámci paměti procesu - umožní pracovat rovnocenně s 
	*     předaným IPasswordSecret nebo s heslem předaným na vstupu jako string. 
	*     Na cílovém místě umožní použití tajemství přes property Secret
	*     Ta by se měla použít co nejblíže jejímu předání externímu kódu - např. těsně před DB připojením 
	*     
	*/
	interface GSecureString {
		/**
		*     Value of secret - IPasswordSecret
		*     Pokud tajemství nebylo nastaveno, vrací null
		*     
		*/
		readonly Secret?: string|null;
		/**příznak nenastavení nebo nastavení hodnoty null*/
		IsNull?: boolean|null;
		/**
		*     Příznak, že je nastaveno nějaké tajemství.
		*     
		*/
		readonly Exists?: boolean|null;
	}
	const enum GSecureStringNames { Secret = "Secret", IsNull = "IsNull", Exists = "Exists",}
	const enum GSecureStringFragments { Secret = "*", IsNull = "*", Exists = "*",}
	const enum GSecureStringTypes { Secret = "string", IsNull = "boolean", Exists = "boolean",}
	const enum GSecureStringTypeLengths {}
}

//#endregion

