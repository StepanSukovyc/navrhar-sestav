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
