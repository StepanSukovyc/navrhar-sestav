//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GInitConst.cs                          </Name>
//    <Description> konstanty nutné pro konfiguraci a autorizaci aplikace </Description>
//    <Author>      Jiøí Dvoøák                                           </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021            </Copyright>
//    <Created>     2002-11-13                                            </Created>
//  </FileHeader>
using System;

namespace Gordic.General {

	/// <summary>konstanty nutné pro konfiguraci a autorizaci aplikace</summary>
	public sealed class GInitConst : IGObject {
		
        /// <summary>
		/// Jméno konfiguraèní skupiny základních parametrù 'BASE'
		/// </summary> 
		public const string BaseConfigGroup = "Baseconfiggroup";
		/// <summary>
		///  Jméno konfiguraèní skupiny parametrù pro aktivator 'ACTIVATOR'
		/// </summary>
		public const string ActivatorPrmGroup = "Activator";
		/// <summary>
		///  Jméno konfiguraèní skupiny koøenových parametrù 'ROOT'
		/// </summary>
		public const string RootConfigGroup = "Rootconfiggroup";
		/// <summary>
		///  Jméno konfiguraèní skupiny konfiguraèních parametrù 'CONFIG'
		/// </summary>
		public const string ConfigConfigGroup = "Configconfiggroup";
		/// <summary>
		///  Jméno konfiguraèní skupiny konfiguraèních parametrù 'AUTHORIZE'
		/// </summary>
		public const string AuthConfigGroup = "Authconfiggroup";
		/// <summary>
		///  Jméno konfiguraèní skupiny obecných parametrù 'COMMON'
		/// </summary>
		public const string CommonConfigGroup = "Comconfiggroup";
		/// <summary>
		/// Jméno parametru který øídí metodu ètení parametrù
		/// </summary>
		public const string PrmNameMethod = "Method";
		/// <summary>
		/// Jména parametrù konfiguraèní skupiny 'BASE' 
		/// Tyto parametry øídí cestu k parametrùm (xml, registry, atd.)
		///		- PrmNameRootSourc  = zdroj
		/// </summary>
		public const string PrmNameRootSourc  = "Rootsourc";
		/// <summary>
		/// Jména parametrù konfiguraèní skupiny 'BASE' 
		/// Tyto parametry øídí cestu k parametrùm (xml, registry, atd.)
		///		- PrmNameRootRoot	= kožen
		/// </summary>
		public const string PrmNameRootRoot   = "Rootroot";
		/// <summary>
		/// Jména parametrù konfiguraèní skupiny 'BASE' 
		/// Tyto parametry øídí cestu k parametrùm (xml, registry, atd.)
		///		- RootPath			= cesta
		/// </summary>
		public const string PrmNameRootPath   = "Rootpath";
		/// <summary>
		/// Jména parametrù konfiguraèní skupiny 'BASE' 
		/// Tyto parametry øídí cestu k parametrùm (xml, registry, atd.)
		///		- PrmNameRootItem	= položka
		/// </summary>
		public const string PrmNameRootItem   = "Rootitem";

		/// <summary>
		/// Parametr který urèuje jaký krok konfigurace byl proveden
		/// </summary>
		public const string PrmNameStepDoneFlag="Stepdoneflag";
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootModule     = "Rootmodule";      // 'G32INT01'
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootPhase      = "Rootphase";       // 'GININT01'
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootVersion    = "Rootversion";     // 346
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootSubVer     = "Rootsubver";      // 12
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootRootRevisionGin = "Rootrevisiongin";     // "32GIN0134638X01"
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootRootRevisionSes = "Revisionses";      // 12
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootRevision   = "Rootrevision";    // G32INB0134612X01
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootDBVersion  = "Rootdbversion";   // 346
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootDBSubVer   = "Rootdbsubver";    // 10
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootAgenda     = "Rootagenda";      // 310
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootPhaseName  = "Rootphasename";   // 'Inbox'
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Parametr se používá pro autorizaèní metodu 'MethodAncient'
		/// (autorizace metodou GINIS verze 3XX)
		/// </summary>
		public const string PrmNameRootPhaseTitle = "Rootphasetitle";  // 'Pøíjem doruèených zpráv do podatelny'
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Udává id session pro instanci v AppDomain
		/// </summary>
		public const string PrmNameRootSessionID  = "Rootsessionid"; 		
		/// <summary>
		/// Jméno parametru konfiguraèní skupiny 'BASE' 
		/// Udává dobu expirace objektu v AppDomain
		/// </summary>
		public const string PrmNameRootSessionMinExpiration  = "Rootsessionminexpiration";  // 'Délka životnosti session contextu'		
		
		/// <summary>
		/// Jméno parametru - parametr urèuje konfiguraèní servis (uri)
		/// </summary>
		public const string PrmNameConfigService = "ConfigService";

		/// <summary>
		/// Hodnota parametru 'PrmNameConfigService' pro servis Ginis3
		/// </summary>
		public const string PrmValConfigServiceGinis3 = "local://Gordic.Ginis3.Client";

		
		/// <summary>
		/// Metoda ètení skupiny parametrù neznámá
		/// </summary>
		public const int PrmValMethodUncnown  = 0;
		/// <summary>
		/// Metoda ètení skupiny parametrù - Ginis v. 3.XX
		/// </summary>
		public const int PrmValMethodAncient  = 1;
		/// <summary>
		/// Metoda ètení skupiny parametrù  - Registy
		/// </summary>
		public const int PrmValMethodRegistry = 2;
		/// <summary>
		/// Metoda ètení skupiny parametrù - Binární soubor
		/// </summary>
		public const int PrmValMethodBinFile  = 3;
		/// <summary>
		/// Metoda ètení skupiny parametrù  - Xml soubor
		/// </summary>
		public const int PrmValMethodXml      = 4;
		/// <summary>
		/// Metoda ètení skupiny parametrù - Web Service
		/// </summary>
		public const int PrmValMethodWS       = 5;
		/// <summary>
		/// Metoda ètení skupiny parametrù - Databáze
		/// </summary>
		public const int PrmValMethodDataBase = 6;
		/// <summary>
		/// Metoda ètení skupiny parametrù - Proxy tøída
		/// </summary>
		public const int PrmValMethodProxy	  = 7;

		/// <summary>
		/// Jméno skupiny parametrù kterou plní autorizaèní objekt
		/// </summary>
		public const string AuthorizeParamGroupName = "Authorizeparamgroup";

		/// <summary>
		/// Jména parametrù skupiny 'AuthorizeParamGroupName' 
		///	(tyto parametry vytváøí autorizaèní objekt)
		///	PrmNameAuthDBProfile    = jméno DB profilu;
		/// </summary>
		public const string PrmNameAuthDBProfile    = "Authdbprofile";
		/// <summary>
		/// Jména parametrù skupiny 'AuthorizeParamGroupName' 
		///	(tyto parametry vytváøí autorizaèní objekt)
		/// PrmNameAuthUser         = uživatel
		/// </summary>
		public const string PrmNameAuthUser         = "Authuser";
		/// <summary>
		/// Jména parametrù skupiny 'AuthorizeParamGroupName' 
		///	(tyto parametry vytváøí autorizaèní objekt)
		/// PrmNameAuthPassword     = heslo
		/// </summary>
		public const string PrmNameAuthPassword     = "Authpassword";
		/// <summary>
		/// Jména parametrù skupiny 'AuthorizeParamGroupName' 
		///	(tyto parametry vytváøí autorizaèní objekt)
		/// PrmNameAuthSubstitute   = zástup
		/// </summary>
		public const string PrmNameAuthSubstitute   = "Authsubstitute";
		/// <summary>
		/// Jména parametrù skupiny 'AuthorizeParamGroupName' 
		///	(tyto parametry vytváøí autorizaèní objekt)
		/// Použít funkci èíslo (?)
		/// </summary>
		public const string PrmNameAuthUseFunction	= "Authusefunction";
		// --------------------------------------------------------------------
		/// <summary>
		/// Jméno parametru který obsahuje typ autorizaèní metody 
		/// (parametr je ve stupinì msConfigConfigGroupName a øídí autorizaci)
		/// </summary>
		public const string AuthorizeMethodParamName = "Authorizemethod";
		/// <summary>
		/// Typ autorizace
		/// (hodnoty parametru 'AuthorizeMethodParamName' skupiny 'msConfigConfigGroupName')
		///		AncientAuthorizeMethod    = 1;		// GINIS verze 3.XX
		/// </summary>
		public const int AncientAuthorizeMethod    = 1;		// GINIS verze 3.XX
		/// <summary>
		/// Typ autorizace
		/// (hodnoty parametru 'AuthorizeMethodParamName' skupiny 'msConfigConfigGroupName')
		///		DatabaseAuthorizeMethod   = 2;		// GINIS verze 4.XX proti SQL databázi
		/// </summary>
		public const int DatabaseAuthorizeMethod   = 2;		// GINIS verze 4.XX proti SQL databázi
		/// <summary>
		/// Typ autorizace
		/// (hodnoty parametru 'AuthorizeMethodParamName' skupiny 'msConfigConfigGroupName')
		///		WebServiceAuthorizeMethod = 3;		// GINIS verze 4.XX voláním Web Service
		/// </summary>
		public const int WebServiceAuthorizeMethod = 3;		// GINIS verze 4.XX voláním Web Service
		/// <summary>
		/// Typ autorizace
		/// (hodnoty parametru 'AuthorizeMethodParamName' skupiny 'msConfigConfigGroupName')
		///		WindowsAuthorizeMethod    = 4;		// Aktuální uživatel - windows / domény / ldap
		/// </summary>
		public const int WindowsAuthorizeMethod    = 4;		// Aktuální uživatel - windows / domény / ldap
		// --------------------------------------------------------------------
		/// <summary>
		/// Jméno parametru který obsahuje typ uživatelského rozhraní pro autorizaci
		/// (parametr je ve stupinì msConfigConfigGroupName)
		/// </summary>
		public const string AuthorizeUserInterfaceParamName = "Authorizeuserinterface";
		/// <summary>
		/// Typ uživatelského rozhraní pro autorizaci
		/// (parametr AuthorizeUserInterfaceParamName skupiny msConfigConfigGroupName)
		///		- NoAuthorizeUserInterface		= 0;	Automatická autorizace - bez rozhraní
		/// </summary>
		public const int NoAuthorizeUserInterface		= 0;	// automatická autorizace
		/// <summary>
		/// Typ uživatelského rozhraní pro autorizaci
		/// (parametr AuthorizeUserInterfaceParamName skupiny msConfigConfigGroupName)
		///		- WindowsAuthorizeUserInterface	= 1;	Modální dialog (zadání uživatele a hesla)
		/// </summary>
		public const int WindowsAuthorizeUserInterface  = 1;	// modální dialog (zadání uživatele a hesla)
		/// <summary>
		/// Typ uživatelského rozhraní pro autorizaci
		/// (parametr AuthorizeUserInterfaceParamName skupiny msConfigConfigGroupName)
		///		- WebAuthorizeUserInterface		= 2;	Generování html stánky (zadání uživatele a hesla)
		/// </summary>
		public const int WebAuthorizeUserInterface		= 2;	// generování html stánky (zadání uživatele a hesla)
		// --------------------------------------------------------------------
		/// <summary>
		/// Klíè v registrech pro ètení jmen databáze 
		/// (pro konfiguraèní metodu Ginis 3XX)
		/// </summary>
		public const string RegKeyAncientDbases = "Db_names";
		/// <summary>
		/// Klíè v registrech pro ètení DB profilu
		/// (pro konfiguraèní metodu Ginis 3XX)
		/// </summary>
		public const string RegKeyAncientDefDbase = "Profil";
		/// <summary>
		/// Klíè v registrech pro ètení typu databáze 
		/// (pro konfiguraèní metodu Ginis 3XX)
		/// </summary>
		public const string RegKeyAncientTypDb = "Typ_db";
		/// <summary>
		/// Typ databáze ètený z registrù
		/// (pro konfiguraèní metodu Ginis 3XX)
		///		AncientTypDbInformix = 1;	(informix)
		/// </summary>
		public const int AncientTypDbInformix = 1;
		/// <summary>
		/// Typ databáze ètený z registrù
		/// (pro konfiguraèní metodu Ginis 3XX)
		///		AncientTypDbOracle   = 3;	(Oracle)
		/// </summary>
		public const int AncientTypDbOracle   = 3;
		/// <summary>
		/// Typ databáze ètený z registrù
		/// (pro konfiguraèní metodu Ginis 3XX)
		///		AncientTypDbMSSQL    = 5;	(MSSQL)
		/// </summary>
		public const int AncientTypDbMSSQL    = 5;
		/// <summary>
		/// Klíè v registrech pro ètení názvu serveru
		/// (pro konfiguraèní metodu Ginis 3XX)
		/// </summary>
		public const string RegKeyAncientDbServer = "Servername32";
		/// <summary>
		/// Klíè v registrech pro ètení jména databázového serveru
		/// (pro konfiguraèní metodu Ginis 3XX)
		/// </summary>
		public const string RegKeyAncientDatabase = "Database";
		/// <summary>
		/// Jméno parametru který plní autorizaèní objekt, hodnota 'ldb'
		/// (Autorizace Ginis 3XX)
		/// </summary>
		//public const string PrmNameAuthLdb		= "Ldb";
		public const string PrmNameAuthLdb		= "p_ldb";
		/// <summary>
		/// Jméno parametru který plní autorizaèní objekt, hodnota 'pdb'
		/// (Autorizace Ginis 3XX)
		/// </summary>
		//public const string PrmNameAuthPdb		= "Pdb";
		public const string PrmNameAuthPdb		= "p_pdb";
		/// <summary>
		/// Jméno parametru který plní autorizaèní objekt, hodnota 'nid'
		/// (Autorizace Ginis 3XX)
		/// </summary>
		public const string PrmNameAuthNid		= "p_log_por_cislo";

		// new params. begin --------------------------------------------------------------------------------
		/// <summary>
		/// datum pøihlášení
		/// </summary>
		public const string PrmNameDatLogin = "Dat-login";
		/// <summary>
		/// identifikátor referenta
		/// </summary>
		public const string PrmNameIxsRef	= "Ixs-ref";
		/// <summary>
		/// název referenta
		/// </summary>
		public const string PrmNameNazevRef	= "Nazev-ref";
		/// <summary>
		/// zkratka referenta
		/// </summary>
		public const string PrmNameZkratka	= "Zkratka";
		/// <summary>
		/// název funkce
		/// </summary>
		public const string PrmNameNazevFun	= "Nazev-fun";
		/// <summary>
		/// priorita
		/// </summary>
		public const string PrmNamePrioritaMax	= "Priorita-max";
		/// <summary>
		/// ?
		/// </summary>
		public const string PrmNameFc	= "Fc";
		/// <summary>
		/// identifikátor organizaèní jednotky
		/// </summary>
		public const string PrmNameIxsOrj	= "Ixs-orj";
		/// <summary>
		/// název organizaèní jednotky
		/// </summary>
		public const string PrmNameNazevOrj	= "Nazev-orj";
		/// <summary>
		/// identifikátor spisového uzlu
		/// </summary>
		public const string PrmNameIxsSu	= "Ixs-su"; 
		/// <summary>
		/// pøíznak èeštiny
		/// </summary>
		public const string PrmNameCsDb	= "Cs-db";
		/// <summary>
		/// typ instalace
		/// </summary>
		public const string PrmNameTypInst	= "Typ-inst";
		/// <summary>
		/// pøíznak archivace
		/// </summary>
		public const string PrmNamePrizArchiv	= "Priz-archiv";
		/// <summary>
		/// pøíznak blobù
		/// </summary>
		public const string PrmNamePrizBlob	= "Priz-blob";
		/// <summary>
		/// ?
		/// </summary>
		public const string PrmNameIxsIsu	= "Ixs-isu";
		/// <summary>
		/// vzkaz
		/// </summary>
		public const string PrmNameVzkazy	= "Vzkazy";
		/// <summary>
		/// datum aktualizace
		/// </summary>
		public const string PrmNameDatAkt	= "Dat-akt";
		/// <summary>
		/// verze databáze
		/// </summary>
		public const string PrmNameVerzeDb	= "Verze-db";
		/// <summary>
		/// sub verze databáze
		/// </summary>
		public const string PrmNameSubVerzeDb	= "Sub-verze-db";
		/// <summary>
		/// ?
		/// </summary>
		public const string PrmNameNazevRf	= "Nazev-rf";
		/// <summary>
		/// název instance
		/// </summary>
		public const string PrmNameNazevIns	= "Nazev-ins";
		/// <summary>
		/// datum vypršení platnosti
		/// </summary>
		public const string PrmNameDatExp	= "Dat-exp";
		/// <summary>
		/// poøadí pro tøídìní
		/// </summary>
		public const string PrmNamePoradiLog	= "Poradi-log";
		/// <summary>
		/// uživatel systému
		/// </summary>
		public const string PrmNameLoginWin	= "Login-win";
		/// <summary>
		/// název klientského poèítaèe
		/// </summary>
		public const string PrmNameCompName	= "Comp-name";
		/// <summary>
		/// režim pøihlášení
		/// </summary>
		public const string PrmNameRezim	= "Rezim";
		/// <summary>
		/// název projektu
		/// </summary>
		public const string PrmNameProjekt	= "Projekt";
		/// <summary>
		/// ?
		/// </summary>
		public const string PrmNamePrizD	= "Priz-d";
		/// <summary>
		/// název spisového uzlu 
		/// </summary>
		public const string PrmNameNazevSu	= "Nazev-su";
		
		// new params. end ----------------------------------------------------------------------------------

		/// <summary>
		/// jméno parametru - identifiátor externího systému
		/// </summary>
		public const string PrmNameIxsExt = "Ixs-ext";


		/// <summary>
		/// Jméno parametru který plní autorizaèní objekt, hodnota 'ixsfun'
		/// (Autorizace Ginis 3XX)
		/// </summary>
		public const string PrmNameAuthIxsfun	= "p_ixs_fun";
		/// <summary>
		/// Jméno parametru který plní autorizaèní objekt, hodnota 'ixsins'
		/// (Autorizace Ginis 3XX)
		/// </summary>
		public const string PrmNameAuthIxsins	= "p_ixs_ins";
		/// <summary>
		/// Jméno parametru který plní autorizaèní objekt, hodnota 'ixszmp'
		/// (Autorizace Ginis 3XX)
		/// </summary>
		public const string PrmNameAuthIxszmp	= "p_ixs_zmp";
		/// <summary>
		/// Jméno parametru který plní autorizaèní objekt, hodnota 'lic'
		/// </summary>
		public const string PrmNameAuthLic	= "Lic";
		/// <summary>
		/// Jméno parametru který plní autorizaèní objekt - login probìhl OK
		/// (Autorizace Ginis 3XX)
		/// </summary>
		public const string PrmNameAuthFirstLoginOK	= "Firstloginok";
		/// <summary>
		/// Hodnota parametru PrmNameAuthFirstLoginOK
		/// (Autorizace Ginis 3XX)
		/// </summary>
		public const string PrmNameAuthIsOK	= "Isok";
		/// <summary>
		/// Jméno parametru který obsahuje øetìzec jenž se pøidá ke Connect Stringu databáze Informix 
		/// </summary>
		public const string PrmNameAddInfConnectString	= "Addinfconnectstring";
		/// <summary>
		/// Jméno parametru který obsahuje øetìzec jenž se pøidá ke Connect Stringu databáze Oracle
		/// </summary>
		public const string PrmNameAddOraConnectString	= "Addoraconnectstring";
		/// <summary>
		/// Jméno parametru který obsahuje øetìzec jenž se pøidá ke Connect Stringu databáze MSSQL
		/// </summary>
		public const string PrmNameAddMssConnectString	= "Addmssconnectstring";
		/// <summary>
		/// Jméno parametru který obsahuje jméno OleDbProvider pro Oracle
		/// </summary>
		public const string PrmNameOracleOleDBProvider	= "OracleOleDBProvider";
		/// <summary>
		/// Jméno parametru který obsahuje jméno OleDbProvider pro Informix
		/// </summary>
		public const string PrmNameInformixOleDBProvider	= "InformixOleDBProvider";
		/// <summary>
		/// Jméno parametru který obsahuje jméno OleDbProvider pro Informix
		/// </summary>
		public const string PrmNameMSSQLOleDBProvider	= "MSSQLOleDBProvider";

	} // end class

} // end method
