//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GCommon.cs          </Name>
//      <Description> obecné konstanty a metody          </Description>
//      <Author>      Jan Kuttich                        </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//      <Created>     2003-06-05                         </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using Microsoft.Win32;
using Newtonsoft.Json;

namespace Gordic.General {

    #region výètové typy

    /// <summary>typ autentizace k proxy serveru (P.Prchal)</summary>
    public enum GProxyType {
        /// <summary>žádná autentizace</summary>
        none = 10,
        /// <summary>anonymní autentizace</summary>
        annonymous = 20,
        /// <summary>HTTP basic autentizace</summary>
        basic = 30,
        /// <summary>NTLM autentizace</summary>
        ntlm = 40
    } // end enum
    
    #endregion
    
    /// <summary>obecné konstanty a metody</summary>
    [DebuggerStepThrough]
    [GTypeScriptIgnore]
    public class GCommon : IGObject {

        #region soukromé konstanty

        /// <summary>hash veøejného klíèe silného jména firemních komponent a aplikací</summary>
        private const string m_csPublicToken = "44b0e1e139828386";

        /// <summary>název pro databázový stroj Informix</summary>
        private const string m_csInformix = "Informix";

        /// <summary>název pro databázový stroj Oracle</summary>
        private const string m_csOracle = "Oracle";

        /// <summary>název pro databázový stroj SQL Server</summary>
        private const string m_csSqlServer = "MSSQL";

        /// <summary>typ aplikace windows aplikace (tlustý klient)</summary>
        private const string m_csWinApplication = "WinApplication";

        /// <summary>typ aplikace služba systému Windows</summary>
        private const string m_csWinService = "WinService";

        /// <summary>typ aplikace webová aplikace (tenký klient)</summary>
        private const string m_csWebApplication = "WebApplication";

        /// <summary>typ aplikace webová služba</summary>
        private const string m_csWebService = "WebService";

        /// <summary>oznaèení ginis autentizace</summary>
        private const string m_csGinisAutentication = "Ginis";

        /// <summary>oznaèení windows autentizace</summary>
        private const string m_csWindowsAutentication = "Windows";

        /// <summary>oznaèení anonymní autentizace</summary>
        private const string m_csAnonymousAutentication = "Anonymous";

        /// <summary>oznaèení public autentizace</summary>
        private const string m_csPublicAutentication = "Public";

        /// <summary>oznaèení autentizace do portálu Bea AquaLogic Interaction</summary>
        private const string m_csBeaAutentication = "Bea";

        /// <summary>oznaèení autentizace pomocí nástroje KeyShield SSO</summary>
        private const string m_csKeyShieldAutentication = "Keyshield";

        /// <summary>oznaèení autentizace pomocí Azure Active Directory</summary>
        private const string m_csAzureAutentication = "Azure";

        /// <summary>oznaèení autentizace pomocí obecného LDAP adresáøe</summary>
        private const string m_csLdapAutentication = "Ldap";

        /// <summary>pøihlašovací jméno pro anonymní autentizaci</summary>
        private const string m_csAnonymousLogin = "guest";

        /// <summary>oznaèení režimu autentizace pomocí zadání jména a hesla</summary>
        private const string m_csAutenticationModeGinis = "sql";

        /// <summary>oznaèení režimu autentizace s použitím úètu operaèního systému</summary>
        private const string m_csAutenticationModeWindows = "win";

        /// <summary>oznaèení režimu autentizace pomocí Azure Active Directory</summary>
        private const string m_csAutenticationModeAzure = "aad";

        /// <summary>oznaèení režimu autentizace volitelným zpùsobem</summary>
        private const string m_csAutenticationModeSelectable = "mix";

        /// <summary>oznaèení OLEDB poskytovatele databázového pøipojení</summary>
        private const string m_csProviderTypeOleDb = "OleDb";

        /// <summary>oznaèení nativního .NET poskytovatele databázového pøipojení</summary>
        private const string m_csProviderTypeNative = "Native";

        /// <summary>identifikátor výjímky v logu aplikace</summary>
        private const string m_csExceptionLogId = "Exception";

        /// <summary>pøípona zámìrnì nesprávné revize</summary>
        private const string m_csWrongRevisionSuffix = "99X99";

        /// <summary>znaèka pro odøádkování v HTML</summary>
        private const string m_csBreakLine = "<br/>";

        /// <summary>textové oznaèení pro odeslání e-mailu prostøednictvím SMTP serveru</summary>
        private const string m_csSock = "SOCK";

        /// <summary>textové oznaèení pro odeslání e-mailu prostøednictvím SMTP serveru</summary>
        private const string m_csSmtp = "SMTP";

        /// <summary>textové oznaèení pro odeslání e-mailu prostøednictvím SMTP serveru pøes Secure BlackBox</summary>
        private const string m_csSbbSmtp = "SBBSMTP";

        /// <summary>textové oznaèení pro odeslání e-mailu prostøednictvím extended MAPI</summary>
        private const string m_csExtendedMapi = "EMAPI";

        /// <summary>textové oznaèení pro odeslání e-mailu prostøednictvím MAPI</summary>
        private const string m_csMapi = "MAPI";

        /// <summary>textové oznaèení pro odeslání e-mailu prostøednictvím Office 365 GraphAPI</summary>
        private const string m_csMsoGraph = "MSOGRAPH";

        /// <summary>textové oznaèení pro neznámý zpùsob odeslání e-mailu</summary>
        private const string m_csUnknown = "Unknown";

        /// <summary>textové oznaèení HTML formátu e-mailu</summary>
        private const string m_csHtml = "Html";

        /// <summary>textové oznaèení textového formátu e-mailu</summary>
        private const string m_csText = "Text";

        /// <summary>klíè registru obsahujícího mailové profily</summary>
        private const string m_csMailProfilesKey = @"Software\Microsoft\Windows NT\CurrentVersion\Windows Messaging Subsystem\Profiles";

        /// <summary>klíè registru software</summary>
        private const string m_csSoftwareKey = @"software\";

        /// <summary>klíè registru software pro 64 bitovou architekturu</summary>
        private const string m_csSoftwareKey_x64 = @"software\wow6432node\";

        /// <summary>textové oznaèení hodnoty null</summary>
        private const string m_csNull = "null";

        #endregion

        #region výètové typy

        /// <summary>typ databázového stroje</summary>
        public enum DatabaseType {
            /// <summary>nespecifikovaný typ</summary>
            Undefined = -1,
            /// <summary>Informix</summary>
            Informix = 1,
            /// <summary>Oracle</summary>
            Oracle = 3,
            /// <summary>SQL Server</summary>
            SqlServer = 5
        } // end enum

        /// <summary>výsledek autorizace</summary>
        public enum AuthorizationResult {
            /// <summary>autorizace dosud neprobìhla</summary>
            Undefined = -1,
            /// <summary>již existuje shodné pøihlášení</summary>
            AnotherSessionExists = -2,
            /// <summary>autorizováno</summary>
            Authorized = 0,
            /// <summary>zadáno nesprávné uživatelské jméno nebo heslo</summary>
            WrongLoginOrPassword = 1,
            /// <summary>netransakèní databáze</summary>           
            NonTransactionDatabase = 14,
            /// <summary>vypršela platnost hesla uživatele</summary> 
            PasswordExpired = 17,
            /// <summary>neplatná jednorázová vstupenka</summary> 
            InvalidOneShotTicket = 18,
            /// <summary>nìkterá komponenta aplikace je neaktuální a je pøipravena k aktualizaci</summary> 
            ReinstallationRequested = 19,
            /// <summary>nìkterá komponenta aplikace je neaktuální a nelze ji aktualizovat</summary> 
            WrongVersion = 20,
            /// <summary>pøíliš nízká verze spouštìné aplikace</summary> 
            VersionIsTooLow = 21,
            /// <summary>databáze byla pøesunuta nebo pøejmenována</summary> 
            DatabaseRenamed = 22,
            /// <summary>v systému nejsou nastavena hesla uživatelù s vyšším oprávnìním</summary> 
            WrongSystemPasswords = 23,
            /// <summary>nastalo období klidu databáze</summary> 
            DatabaseIdle = 24,
            /// <summary>fáze uzamèena èasovým zámkem</summary> 
            PhaseExpired = 25,
            /// <summary>funkèní místo je obsazeno konkurenènì pracujícím uživatelem</summary> 
            UsedByAnotherUser = 26,
            /// <summary>ukonèena platnost uživatele operaèníhosystému UNIX</summary> 
            InvalidUnixUser = 27,
            /// <summary>neplatná trvalá vstupenka</summary> 
            InvalidPermanentTicket = 28,
            /// <summary>programová fáze byla uzamèena administrátorem systému</summary> 
            PhaseLocked = 29,
            /// <summary>databáze byla uzamèena licenèním èasovým zámkem</summary> 
            DatabaseLicenceExpired = 30,
            /// <summary>databáze byla uzamèena administrátorem systému</summary> 
            DatabaseLocked = 31,
            /// <summary>byla zjištìna nepøípustná zmìna èasu serveru</summary> 
            UnacceptableTimeChange = 32,
            /// <summary>nemáte povolen pøístup do tohoto modulu</summary> 
            AccessDenied = 33,
            /// <summary>nepøípustná verze SQL Serveru</summary> 
            WrongVersionSqlServer = 34,
            /// <summary>nelze se pøihlásit z dùvodù licenèního omezení</summary> 
            LicenceAcessDenied = 35,
            /// <summary>není nastaveno oprávnìní pro pøihlášení do systému</summary> 
            AccessNotSet = 36,
            /// <summary>pøístup do tohoto modulu byl odebrán nebo zmìnìn</summary> 
            AccessRemoved = 37,
            /// <summary>pøístup odmítnut z dùvodu zámku v databázi</summary> 
            DatabaseLockAcessDenied = 38,
            /// <summary>nejednoznaèné pøihlašovací jméno uživatele typu veøejnost</summary>
            AmbiguousPublicLogin = 44,
            /// <summary>nejednoznaèná administrace instance pro uživatele typu veøejnost</summary>
            AmbiguousPublicInstance = 51,
            /// <summary>nesprávná pøihlašovací procedura</summary>
            InvalidMethod = 53,
            /// <summary>je zapotøebí provést aktivaci úètu</summary>
            ActivationRequired = 54,
            /// <summary>je zapotøebí provést verifikaci úètu</summary>
            VerificationRequired = 55
        } // end enum

        /// <summary>režim ukonèení databázové transakce</summary>
        public enum TransactionMode {
            /// <summary>bez ukonèení transakce</summary>
            None = 0,
            /// <summary>transakce bude odrolována zpìt</summary>
            Rollback = 1,
            /// <summary>transakce bude potvrzena</summary>
            Commit = 2
        } // end enum

        /// <summary>typ aplikace</summary>
        public enum ApplicationType {
            /// <summary>aplikace urèená pro Windows (tj. typu tlustý klient)</summary>
            WindowsApplication = 40,
            /// <summary>aplikace typu systémová služba Windows</summary>
            WindowsService = 43,
            /// <summary>aplikace urèená pro Web (tj. typu tenký klient)</summary>
            WebApplication = 41,
            /// <summary>aplikace typu webová služba</summary>
            WebService = 42
        } // end enum

        /// <summary>typ autentizace aplikace</summary>
        public enum AuthenticationType {
            /// <summary>standardní autentizace prostøednictvím zadání jména a hesla</summary>
            Ginis = 0,
            /// <summary>autentizace pomocí úètu uživatele pøihlášeného do Windows</summary>
            Windows = 1,
            /// <summary>autentizace pomocí úètu anonymního uživatele</summary>
            Anonymous = 2,
            /// <summary>autentizace pomocí úètu uživatele typu veøejnost</summary>
            Public = 3,
            /// <summary>autentizace pomocí úètu uživatele pøihlášeného do portálu Bea AquaLogic Interaction</summary>
            Bea = 4,
            /// <summary>autentizace pomocí nástroje KeyShield SSO</summary>
            KeyShield = 5,
            /// <summary>autentizace pomocí úètu Azure Active Directory</summary>
            Azure = 6,
            /// <summary>autentizace pomocí obecného LDAP adresáøe</summary>
            Ldap = 7
        } // end enum

        /// <summary>režim autentizace do systému</summary>
        public enum AuthenticationMode {
            /// <summary>autentizace pomocí zadání jména a hesla</summary>
            Ginis = 1,
            /// <summary>autentizace s použitím úètu operaèního systému</summary>
            Windows = 2,
            /// <summary>autentizace pomocí úètu Azure Active Directory</summary>
            Azure = 3,
            /// <summary>zpùsob autentizace je volitelný</summary>
            Selectable = 0
        } // end enum

        /// <summary>typ poskytovatele databázového pøipojení</summary>
        public enum ProviderType {
            /// <summary>pøipojení pomocí OLEDB poskytovatele</summary>
            OleDb = 0,
            /// <summary>pøipojení pomocí nativního .NET poskytovatele</summary>
            Native = 1
        } // end enum

        /// <summary>subsystém Ginis</summary>
        public enum Subsystem {
            /// <summary>jádro systému</summary>
            Gin = 1,
            /// <summary>ekonomika</summary>
            Eko = 2,
            /// <summary>spisová služba</summary>
            Ssl = 3,
            /// <summary>registry</summary>
            Reg = 4,
            /*
            /// <summary>GINIS - jádro systému</summary>
            Ginis1100 = 1100,
            /// <summary>GINIS - rozpoèet, úèetnictví, výkazy</summary>
            Ginis1200 = 1200,
            /// <summary>GINIS - bezhotovostní platby</summary>
            Ginis1300 = 1300,
            /// <summary>GINIS - závazky a pohledávky</summary>
            Ginis1400 = 1400,
            /// <summary>GINIS - práce a mzdy</summary>
            Ginis1420 = 1420,
            /// <summary>GINIS - majetek</summary>
            Ginis1500 = 1500,
            /// <summary>GINIS - controlling</summary>
            Ginis1570 = 1570,
            /// <summary>GINIS - registry a správní agendy</summary>
            Ginis1600 = 1600,
            /// <summary>GINIS - spisová služba</summary>
            Ginis1700 = 1700,
            /// <summary>GINIS - otevøená integraèní platforma</summary>
            Ginis1800 = 1800,
            /// <summary>GINIS - datový sklad</summary>
            Ginis1850 = 1850,
            */
            /// <summary>jiný subsystém</summary>
            Other = 0
        } // end enum

        /// <summary>zpùsob odeslání e-mailu</summary>
        public enum SendMailMethod {
            /// <summary>neznámý zpùsob odeslání</summary>
            Unknown = -1,
            /// <summary>odeslání prostøednictvím SMTP serveru</summary>
            Smtp = 0,
            /// <summary>odeslání prostøednictvím extended MAPI</summary>
            ExtendedMapi = 1,
            /// <summary>odeslání prostøednictvím MAPI</summary>
            Mapi = 2,
            /// <summary>odeslání prostøednictvím SMTP serveru pøes Secure BlackBox</summary>
            SbbSmtp = 4,
            /// <summary>Office365_Device</summary>
            Office365_Device = 5,
            /// <summary>Office365_Default</summary>
            Office365_Default = 6,
            /// <summary>Office365_ClientCredentials</summary>
            Office365_ClientCredentials = 7,
            /// <summary>GraphAPI</summary>
            Microsoft_GraphApi = 8
        } // end enum

        /// <summary>formát e-mailu</summary>
        public enum MailFormat {
            /// <summary>textový formát</summary>
            Text = 0,
            /// <summary>HTML formát</summary>
            Html = 1
        } // end enum

        /// <summary>pøípustnost verze OLE DB provideru</summary>
        public enum OledbProviderVersionStatus {
            /// <summary>nepodporovaná</summary>
            Unsupported = 0,
            /// <summary>nedoporuèená</summary>
            Unrecommended = 1,
            /// <summary>doporuèená</summary>
            Recommended = 2
        } // end enum

        /// <summary>typ SMS brány</summary>
        public enum SmsGatewayType {
            /// <summary>SMS brána není dostupná</summary>
            NotSupported,
            /// <summary>SMS InfoKanál</summary>
            SmsInfoKanal,
            /// <summary>SMS T-Mobile</summary>
            SmsTMobile,
            /// <summary>SMS O2</summary>
            SmsO2,
            /// <summary>SMS Vodafone</summary>
            SmsVodafone,
            /// <summary>SMS odesílaná pomocí e-mailu</summary>
            SmsEmail
        } // end enum

        #endregion

        #region vlastnosti

        /// <summary>hash veøejného klíèe silného jména firemních komponent a aplikací</summary>
        public static string PublicToken {
            get { return m_csPublicToken; }
        } // end property

        /// <summary>typ databáze Informix</summary>
        public static string Informix {
            get { return m_csInformix; }
        } // end property

        /// <summary>typ databáze Oracle</summary>
        public static string Oracle {
            get { return m_csOracle; }
        } // end property

        /// <summary>typ databáze SQL Server</summary>
        public static string SqlServer {
            get { return m_csSqlServer; }
        } // end property

        /// <summary>typ aplikace windows aplikace (tlustý klient)</summary>
        public static string WinApplication {
            get { return m_csWinApplication; }
        } // end property

        /// <summary>typ aplikace služba systému Windows</summary>
        public static string WinService {
            get { return m_csWinService; }
        } // end property

        /// <summary>typ aplikace webová aplikace (tenký klient)</summary>
        public static string WebApplication {
            get { return m_csWebApplication; }
        } // end property

        /// <summary>typ aplikace webová služba</summary>
        public static string WebService {
            get { return m_csWebService; }
        } // end property

        /// <summary>oznaèení Ginis autentizace</summary>
        public static string GinisAutentication {
            get { return m_csGinisAutentication; }
        } // end property

        /// <summary>oznaèení Windows autentizace</summary>
        public static string WindowsAutentication {
            get { return m_csWindowsAutentication; }
        } // end property

        /// <summary>oznaèení anonymní autentizace</summary>
        public static string AnonymousAutentication {
            get { return m_csAnonymousAutentication; }
        } // end property

        /// <summary>pøihlašovací jméno pro anonymní autentizaci</summary>
        public static string AnonymousLogin {
            get { return m_csAnonymousLogin; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GCommon).Assembly; }
        } // end property

        /// <summary>identifikátor výjímky v logu aplikace</summary>
        public static string ExceptionLogId {
            get { return m_csExceptionLogId; }
        } // end property

        /// <summary>pøípona zámìrnì nesprávné revize</summary>
        public static string WrongRevisionSuffix {
            get { return m_csWrongRevisionSuffix; }
        } // end property

        /// <summary>pøíznak 32 bitové architektury</summary>
        public static bool Is32Bit {
            get { return IntPtr.Size == 4; }
        } // end property

        /// <summary>pøíznak 64 bitové architektury</summary>
        public static bool Is64Bit {
            get { return IntPtr.Size == 8; }
        } // end property

        #endregion

        #region konstruktory

        /// <summary>statický konstruktor</summary>
        static GCommon() {
            /*          // DEBUGGING
                        File.Delete(@"N:\log.log");
                        File.AppendAllText(@"N:\log.log", $"Starting static \n");*/

            AddNativeLibraryFolder(Environment.Is64BitProcess ? "x64" : "x86"); 
            AddNativeLibraryFolder(Path.Combine("bin", Environment.Is64BitProcess ? "x64" : "x86")); // Framework ASP.NET 
            DisableReferencedAssemblyVersionCheck(new Regex(@"(Microsoft|System|Newtonsoft|Gordic)(?!.*\.resources)"));
            DisableReferencedAssemblyVersionCheck(new Regex(@"AngleSharp.*")); //NOTE (BM): Kvuli knihovne HtmlSanitizer, ktera ref. AngleSharp a AngleSharp.Css, a ktere maji v sobe rozbite verze knihoven.

            GLogBase.Init();        // inicializace logování - musí být co nejdøíve

            InitializeNewtonsoftJson();
        } // end method

#endregion

        #region veøejné statické metody

        /// <summary>zjištìní typu databázového stroje ze vstupního øetìzce</summary>
        /// <param name="databaseType">øetìzec specifikující typ databázového stroje</param>
        /// <returns>typ databázového stroje</returns>
        public static DatabaseType GetDatabaseType(string databaseType) {
            DatabaseType l_eDatabaseType = DatabaseType.Undefined;
            if(databaseType!=null && (databaseType=databaseType.Trim())!=String.Empty) {
                if(databaseType == "1" || databaseType == "51" || String.Compare(databaseType,m_csInformix,true) == 0) l_eDatabaseType = DatabaseType.Informix;
                else if(databaseType == "3" || databaseType == "53" || String.Compare(databaseType,m_csOracle,true) == 0) l_eDatabaseType = DatabaseType.Oracle;
                else if(databaseType == "5" || databaseType == "55" || String.Compare(databaseType,m_csSqlServer,true) == 0) l_eDatabaseType = DatabaseType.SqlServer;
            } // end if
            return l_eDatabaseType;
        } // end method

        /// <summary>získání kódu typu databázového stroje pro uložení v registru operaèního systému</summary>
        /// <param name="databaseType">typ databázového stroje</param>
        /// <param name="useUnicode">pøíznak databáze v Unicode</param>
        /// <returns>kódu typu databázového stroje pro uložení do registrù</returns>
        public static string GetDatabaseTypeForRegistry(DatabaseType databaseType,bool useUnicode) {
            string l_sDatabaseType = String.Empty;
            switch(databaseType) {
                case DatabaseType.Informix  : l_sDatabaseType = useUnicode ? "51" : "1"; break;
                case DatabaseType.Oracle    : l_sDatabaseType = useUnicode ? "53" : "3"; break;
                case DatabaseType.SqlServer : l_sDatabaseType = useUnicode ? "55" : "5"; break;
            } // end switch
            return l_sDatabaseType;
        } // end method

        /// <summary>získání øetìzcového vyjádøení typu databázového stroje</summary>
        /// <param name="databaseType">typ databázového stroje</param>
        /// <returns>øetìzcové vyjádøení typu databázového stroje</returns>
        public static string GetDatabaseType(DatabaseType databaseType) {
            string l_sDatabaseType = String.Empty;
            switch(databaseType) {
                case DatabaseType.Informix  : l_sDatabaseType = m_csInformix; break;
                case DatabaseType.Oracle    : l_sDatabaseType = m_csOracle; break;
                case DatabaseType.SqlServer : l_sDatabaseType = m_csSqlServer; break;
            } // end switch
            return l_sDatabaseType;
        } // end method

        /// <summary>získání textového vyjádøení výsledku autorizace do systému</summary>
        /// <param name="authorizationResult">výsledek autorizace do systému</param>
        /// <returns>textové vyjádøení výsledku autorizace do systému</returns>
        public static string GetAuthorizationResult(AuthorizationResult authorizationResult) {
            return authorizationResult.ToString();
        } // end method

        /// <summary>získání výsledku autorizace do systému z jejího textového vyjádøení</summary>
        /// <param name="authorizationResult">textové vyjádøení výsledku autorizace do systému</param>
        /// <returns>výsledek autorizace do systému</returns>
        public static AuthorizationResult GetAuthorizationResult(string authorizationResult) {
            return ParseEnum<AuthorizationResult>(authorizationResult,AuthorizationResult.Undefined);
        } // end method

        /// <summary>pøevod øetìzce na typ aplikace</summary>
        /// <param name="applicationType">vstupní øetìzec</param>
        /// <returns>typ aplikace</returns>
        public static ApplicationType GetApplicationType(string applicationType) {
            ApplicationType l_eApplicationType = ApplicationType.WindowsApplication;
            if(applicationType == m_csWinApplication) l_eApplicationType = ApplicationType.WindowsApplication;
            else if(applicationType == m_csWinService) l_eApplicationType = ApplicationType.WindowsService;
            else if(applicationType == m_csWebApplication) l_eApplicationType = ApplicationType.WebApplication;
            else if(applicationType == m_csWebService) l_eApplicationType = ApplicationType.WebService;
            else throw new GException(23200206,ThisAssembly); // nepodaøilo se získat typ aplikace
            return l_eApplicationType;
        } // end property

        /// <summary>pøevod typu aplikace na øetìzec</summary>
        /// <param name="applicationType">typ aplikace</param>
        /// <returns>øetìzec</returns>
        public static string GetApplicationType(ApplicationType applicationType) {
            string l_sApplicationType = String.Empty;
            switch(applicationType) {
                case ApplicationType.WindowsApplication : l_sApplicationType = m_csWinApplication; break;
                case ApplicationType.WindowsService     : l_sApplicationType = m_csWinService; break;
                case ApplicationType.WebApplication     : l_sApplicationType = m_csWebApplication; break;
                case ApplicationType.WebService         : l_sApplicationType = m_csWebService; break;
            } // end switch
            return l_sApplicationType;
        } // end property

        /// <summary>pøevod øetìzce na typ autentizace</summary>
        /// <param name="authenticationType">vstupní øetìzec</param>
        /// <returns>typ autentizace</returns>
        public static AuthenticationType GetAuthenticationType(string authenticationType) {
            AuthenticationType l_eAuthenticationType = AuthenticationType.Ginis;
            if(authenticationType == m_csGinisAutentication) l_eAuthenticationType = AuthenticationType.Ginis;
            else if(authenticationType == m_csWindowsAutentication) l_eAuthenticationType = AuthenticationType.Windows;
            else if(authenticationType == m_csAnonymousAutentication) l_eAuthenticationType = AuthenticationType.Anonymous;
            else if(authenticationType == m_csPublicAutentication) l_eAuthenticationType = AuthenticationType.Public;
            else if(authenticationType == m_csBeaAutentication) l_eAuthenticationType = AuthenticationType.Bea;
            else if(authenticationType == m_csKeyShieldAutentication) l_eAuthenticationType = AuthenticationType.KeyShield;
            else if(authenticationType == m_csAzureAutentication) l_eAuthenticationType = AuthenticationType.Azure;
            else if(authenticationType == m_csLdapAutentication) l_eAuthenticationType = AuthenticationType.Ldap;
            else throw new GException(23200207,ThisAssembly); // nepodaøilo se získat typ autentizace
            return l_eAuthenticationType;
        } // end property

        /// <summary>pøevod typu autentizace na øetìzec</summary>
        /// <param name="authenticationType">typ autentizace</param>
        /// <returns>øetìzec</returns>
        public static string GetAuthenticationType(AuthenticationType authenticationType) {
            string l_sAuthenticationType = String.Empty;
            switch(authenticationType) {
                case AuthenticationType.Ginis     : l_sAuthenticationType = m_csGinisAutentication; break;
                case AuthenticationType.Windows   : l_sAuthenticationType = m_csWindowsAutentication; break;
                case AuthenticationType.Anonymous : l_sAuthenticationType = m_csAnonymousAutentication; break;
                case AuthenticationType.Public    : l_sAuthenticationType = m_csPublicAutentication; break;
                case AuthenticationType.Bea       : l_sAuthenticationType = m_csBeaAutentication; break;
                case AuthenticationType.KeyShield : l_sAuthenticationType = m_csKeyShieldAutentication; break;
                case AuthenticationType.Azure     : l_sAuthenticationType = m_csAzureAutentication; break;
                case AuthenticationType.Ldap      : l_sAuthenticationType = m_csLdapAutentication; break;
            } // end switch
            return l_sAuthenticationType;
        } // end property

        /// <summary>pøevod øetìzce na režim autentizace</summary>
        /// <param name="authenticationMode">vstupní øetìzec</param>
        /// <returns>režim autentizace</returns>
        public static AuthenticationMode GetAuthenticationMode(string authenticationMode) {
            return GetAuthenticationMode(authenticationMode,null);
        } // end property

        /// <summary>pøevod øetìzce na režim autentizace</summary>
        /// <param name="authenticationMode">vstupní øetìzec</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>režim autentizace</returns>
        public static AuthenticationMode GetAuthenticationMode(string authenticationMode,AuthenticationMode defaultValue) {
            return GetAuthenticationMode(authenticationMode,(AuthenticationMode ?) defaultValue);
        } // end property

        /// <summary>pøevod øetìzce na režim autentizace</summary>
        /// <param name="authenticationMode">vstupní øetìzec</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>režim autentizace</returns>
        private static AuthenticationMode GetAuthenticationMode(string authenticationMode,AuthenticationMode ? defaultValue) {
            AuthenticationMode l_eAuthenticationMode = AuthenticationMode.Ginis;
            if(String.Compare(authenticationMode,m_csAutenticationModeGinis,true) == 0) l_eAuthenticationMode = AuthenticationMode.Ginis;
            else if(String.Compare(authenticationMode,m_csAutenticationModeWindows,true) == 0) l_eAuthenticationMode = AuthenticationMode.Windows;
            else if(String.Compare(authenticationMode,m_csAutenticationModeAzure,true) == 0) l_eAuthenticationMode = AuthenticationMode.Azure;
            else if(String.Compare(authenticationMode,m_csAutenticationModeSelectable,true) == 0) l_eAuthenticationMode = AuthenticationMode.Selectable;
            else if(defaultValue != null) l_eAuthenticationMode = (AuthenticationMode) defaultValue;
            else throw new GException(23200208,ThisAssembly); // nepodaøilo se získat režim autentizace
            return l_eAuthenticationMode;
        } // end property

        /// <summary>pøevod režimu autentizace na øetìzec</summary>
        /// <param name="authenticationMode">režim autentizace</param>
        /// <returns>výstupní øetìzec</returns>
        public static string GetAuthenticationMode(AuthenticationMode authenticationMode) {
            string l_sAuthenticationMode = String.Empty;
            switch(authenticationMode) {
                case AuthenticationMode.Ginis      : l_sAuthenticationMode = m_csAutenticationModeGinis; break;
                case AuthenticationMode.Windows    : l_sAuthenticationMode = m_csAutenticationModeWindows; break;
                case AuthenticationMode.Azure      : l_sAuthenticationMode = m_csAutenticationModeAzure; break;
                case AuthenticationMode.Selectable : l_sAuthenticationMode = m_csAutenticationModeSelectable; break;
            } // end switch
            return l_sAuthenticationMode;
        } // end property

        /// <summary>pøevod øetìzce na typ poskytovatele databázového pøipojení</summary>
        /// <param name="providerType">vstupní øetìzec</param>
        /// <returns>typ poskytovatele databázového pøipojení</returns>
        public static ProviderType GetProviderType(string providerType) {
            return GetProviderType(providerType,null);
        } // end property

        /// <summary>pøevod øetìzce na typ poskytovatele databázového pøipojení</summary>
        /// <param name="providerType">vstupní øetìzec</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>typ poskytovatele databázového pøipojení</returns>
        public static ProviderType GetProviderType(string providerType,ProviderType defaultValue) {
            return GetProviderType(providerType,(ProviderType ?) defaultValue);
        } // end property

        /// <summary>pøevod øetìzce na typ poskytovatele databázového pøipojení</summary>
        /// <param name="providerType">vstupní øetìzec</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>typ poskytovatele databázového pøipojení</returns>
        private static ProviderType GetProviderType(string providerType,ProviderType ? defaultValue) {
            ProviderType l_eProviderType = ProviderType.OleDb;
            if(String.Compare(providerType,m_csProviderTypeOleDb,true) == 0) l_eProviderType = ProviderType.OleDb;
            else if(String.Compare(providerType,m_csProviderTypeNative,true) == 0) l_eProviderType = ProviderType.Native;
            else if(defaultValue != null) l_eProviderType = (ProviderType) defaultValue;
            else throw new GException(23200209,ThisAssembly); // nepodaøilo se získat typ poskytovatele databázového pøipojení
            return l_eProviderType;
        } // end property

        /// <summary>pøevod typu poskytovatele databázového pøipojení na øetìzec</summary>
        /// <param name="providerType">typ poskytovatele databázového pøipojení</param>
        /// <returns>výstupní øetìzec</returns>
        public static string GetProviderType(ProviderType providerType) {
            string l_sProviderType = String.Empty;
            switch(providerType) {
                case ProviderType.OleDb  : l_sProviderType = m_csProviderTypeOleDb; break;
                case ProviderType.Native : l_sProviderType = m_csProviderTypeNative; break;
            } // end switch
            return l_sProviderType;
        } // end property

        /// <summary>pøevod øetìzce na subsystém aplikace</summary>
        /// <param name="subsystem">vstupní øetìzec</param>
        /// <returns>subsystém aplikace</returns>
        public static Subsystem GetSubsystem(string subsystem) {
            return ParseEnum<Subsystem>(subsystem,true,Subsystem.Other);
        } // end property

        /// <summary>pøevod subsystému aplikace na øetìzec</summary>
        /// <param name="subsystem">subsystém aplikace</param>
        /// <returns>øetìzec</returns>
        public static string GetSubsystem(Subsystem subsystem) {
            return subsystem.ToString();
        } // end property

        /// <summary>získání názvu subsystému aplikace</summary>
        /// <param name="subsystem">subsystém aplikace</param>
        /// <returns>název subsystému aplikace</returns>
        public static string GetSubsystemName(Subsystem subsystem) {
            string l_sSubsystemName = String.Empty;
            switch(subsystem) {
                case Subsystem.Gin: 
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230010); // GIN - jádro systému
                    break;
                case Subsystem.Ssl: 
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230011); // SSL - spisová služba
                    break;
                case Subsystem.Eko: 
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230012); // EKO - ekonomika
                    break;
                case Subsystem.Reg:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230013); // REG - registry
                    break;
                /*
                case Subsystem.Ginis1100:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230010); // GIN - jádro systému
                    break;
                case Subsystem.Ginis1200:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230180); // EKO - rozpoèet, úèetnictví, výkazy
                    break;
                case Subsystem.Ginis1300:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230181); // EKO - bezhotovostní platby
                    break;
                case Subsystem.Ginis1400:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230182); // EKO - závazky a pohledávky
                    break;
                case Subsystem.Ginis1420:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230183); // EKO - práce a mzdy
                    break;
                case Subsystem.Ginis1500:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230184); // EKO - majetek
                    break;
                case Subsystem.Ginis1570:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230185); // CNT - controlling
                    break;
                case Subsystem.Ginis1600:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230013); // REG - registry a správní agendy
                    break;
                case Subsystem.Ginis1700:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230011); // SSL - spisová služba
                    break;
                case Subsystem.Ginis1800:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230186); // OIP - otevøená integraèní platforma
                    break;
                case Subsystem.Ginis1850:
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230187); // DWH - datový sklad
                    break;
                */
                default: 
                    l_sSubsystemName = GResources.GetResourceText(ThisAssembly,23230014); // obecný subsystém GINIS
                    break;
            } // end switch
            return l_sSubsystemName;
        } // end method

        /// <summary>získání rozlišující barvy pozadí pro subsystém aplikace</summary>
        /// <param name="subsystem">subsystém aplikace</param>
        /// <param name="red">èervená složka barvy pozadí</param>
        /// <param name="green">zelená složka barvy pozadí</param>
        /// <param name="blue">modrá složka barvy pozadí</param>
        public static void GetSubsystemBackColor(Subsystem subsystem,out int red,out int green,out int blue) {
            switch(subsystem) {
                case Subsystem.Gin: red = 224; green = 224; blue = 224; break;
                case Subsystem.Ssl: red = 224; green = 224; blue = 255; break;
                case Subsystem.Eko: red = 255; green = 255; blue = 224; break;
                case Subsystem.Reg: red = 255; green = 224; blue = 224; break;
                /*
                case Subsystem.Ginis1100: red = 198; green = 198; blue = 198; break;
                case Subsystem.Ginis1200: red = 226; green = 177; blue = 255; break;
                case Subsystem.Ginis1300: red = 255; green = 216; blue = 138; break;
                case Subsystem.Ginis1400: red = 255; green = 243; blue = 59; break;
                case Subsystem.Ginis1420: red = 255; green = 160; blue = 160; break;
                case Subsystem.Ginis1500: red = 136; green = 145; blue = 255; break;
                case Subsystem.Ginis1570: red = 114; green = 238; blue = 214; break;
                case Subsystem.Ginis1600: red = 222; green = 209; blue = 187; break;
                case Subsystem.Ginis1700: red = 139; green = 207; blue = 255; break;
                case Subsystem.Ginis1800: red = 188; green = 194; blue = 223; break;
                case Subsystem.Ginis1850: red = 238; green = 217; blue = 146; break;
                */
                default: red = 224; green = 224; blue = 224; break;
            } // end switch
        } // end property

        /// <summary>získání rozlišující barvy textu pro subsystém aplikace</summary>
        /// <param name="subsystem">subsystém aplikace</param>
        /// <param name="red">èervená složka barvy pozadí</param>
        /// <param name="green">zelená složka barvy pozadí</param>
        /// <param name="blue">modrá složka barvy pozadí</param>
        public static void GetSubsystemForeColor(Subsystem subsystem,out int red,out int green,out int blue) {
            red = 0;
            green = 0;
            blue = 0;
        } // end property

        /// <summary>získání normalizovaného popisu aplikace</summary>
        /// <param name="path">cesta ke spustitelnému souboru aplikace</param>
        /// <returns>normalizovaný popisu aplikace</returns>
        public static string GetApplicationDescription(string path) {
            return GetApplicationDescription(GetApplicationInfo(path));
        } // end method

        /// <summary>získání normalizovaného popisu aplikace</summary>
        /// <param name="applicationInfo">rozhraní na obecné informace o aplikaci</param>
        /// <returns>normalizovaný popisu aplikace</returns>
        public static string GetApplicationDescription(IGApplicationInfo applicationInfo) {
            return GetApplicationDescription(applicationInfo,false);
        } // end method

        /// <summary>získání normalizovaného popisu aplikace</summary>
        /// <param name="applicationInfo">rozhraní na obecné informace o aplikaci</param>
        /// <param name="htmlFormat">pøíznak HTML formátování</param>
        /// <returns>normalizovaný popisu aplikace</returns>
        public static string GetApplicationDescription(IGApplicationInfo applicationInfo,bool htmlFormat) {
            try {
                StringBuilder l_sOutputText = new StringBuilder();
                string l_sSubsystem = String.Empty;
                string l_sSubsystemName = String.Empty;
                string l_sApplicationName = String.Empty;
                string l_sFaze = String.Empty;
                string l_sVerze = String.Empty;
                string l_sSubVerze = String.Empty;
                string l_sRevize = String.Empty;
                string l_sTypZakaznika = String.Empty;
                string l_sCisloRevize = String.Empty;
                string l_sTypAplikace = String.Empty;
                // inicializace hodnot
                if(applicationInfo != null) {
                    l_sSubsystem = GetSubsystem(applicationInfo.Subsystem).ToUpper();
                    l_sSubsystemName = GetSubsystemName(applicationInfo.Subsystem);
                    l_sApplicationName = applicationInfo.Name;
                    l_sFaze = applicationInfo.Faze;
                    l_sVerze = applicationInfo.Verze.ToString();
                    l_sSubVerze = applicationInfo.SubVerze.ToString();
                    l_sRevize = applicationInfo.Revize;
                    if(l_sRevize.Length > 14) {
                        l_sTypZakaznika = l_sRevize.Substring(12,1);
                        l_sCisloRevize = l_sRevize.Substring(12,3);
                        l_sTypAplikace = l_sRevize.Substring(0,2);
                    } // end if
                } // end if
                // vyskládání textu
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230015)); // Výrobce [Obchodní název]: GORDIC spol. s r.o.
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230016)); // Výrobce [Adresa]: Erbenova 4, 586 01 JIHLAVA
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230017)); // Výrobce [Telefon]: 567 309 136, 567 303 601
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230018)); // Výrobce [Fax]: 567 307 343
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230019)); // Výrobce [e-mail]: gordic@gordic.cz
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230020)); // Systém [Název]: GINIS - Gordic INtegrovaný Informaèní Systém
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230021)); // Systém [Copyright]: © GORDIC spol. s r. o. 1993 - 2021
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230022)); // Systém [Projekt]: 
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230023,l_sSubsystem)); // Subsystém [Oznaèení]: {0}
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230024,l_sSubsystemName)); // Subsystém [Název]: {0}
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230025,l_sApplicationName)); // Aplikace [Název]: {0}
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230026,l_sFaze)); // Aplikace [Fáze]: {0}
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230027,l_sVerze)); // Aplikace [Verze]: {0}
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230028,l_sSubVerze)); // Aplikace [Subverze]: {0}
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230029,l_sTypZakaznika)); // Aplikace [Typ zákazníka]: {0}
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230030,l_sCisloRevize)); // Aplikace [Èíslo revize]: {0}
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230031,l_sRevize)); // Aplikace [Revize distribuce]: {0}
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230032)); // Aplikace [Kultura]: 0
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                l_sOutputText.AppendLine(GResources.GetResourceText(ThisAssembly,23230033,l_sTypAplikace)); // Aplikace [Typ aplikace]: {0}
                if(htmlFormat) l_sOutputText.AppendLine(m_csBreakLine);
                else l_sOutputText.AppendLine();
                return l_sOutputText.ToString();
            } // end try
            catch(Exception e) {
                throw new GException(23200210,ThisAssembly,e); // selhal pokus o získání normalizovaného popisu aplikace
            } // end catch
        } // end method

        /// <summary>získání normalizovaného zápisu revize aplikace</summary>
        /// <param name="path">cesta ke spustitelnému souboru aplikace</param>
        /// <returns>normalizovaný zápis revize aplikace</returns>
        public static string GetApplicationRevision(string path) {
            return GetApplicationRevision(GetApplicationInfo(path));
        } // end method

        /// <summary>získání normalizovaného zápisu revize aplikace</summary>
        /// <param name="applicationInfo">rozhraní na obecné informace o aplikaci</param>
        /// <returns>normalizovaný zápis revize aplikace</returns>
        public static string GetApplicationRevision(IGApplicationInfo applicationInfo) {
            return GetApplicationRevision(applicationInfo,false);
        } // end method

        /// <summary>získání normalizovaného zápisu revize aplikace</summary>
        /// <param name="applicationInfo">rozhraní na obecné informace o aplikaci</param>
        /// <param name="htmlFormat">pøíznak HTML formátování</param>
        /// <returns>normalizovaný zápis revize aplikace</returns>
        public static string GetApplicationRevision(IGApplicationInfo applicationInfo,bool htmlFormat) {
            return String.Format(htmlFormat ? "{0}" : "<revize-distribuce>{0}</revize-distribuce>{1}",applicationInfo == null ? String.Empty : applicationInfo.Revize.ToString(),Environment.NewLine);
        } // end method

        /// <summary>pøevod øetìzce na zpùsob odeslání e-mailu</summary>
        /// <param name="method">vstupní øetìzec</param>
        /// <returns>zpùsob odeslání e-mailu</returns>
        public static SendMailMethod GetSendMailMethod(string method) {
            method = method==null ? String.Empty : method.Trim();
            if (String.Compare(method, m_csSmtp, true) == 0 || String.Compare(method, m_csSock, true) == 0)
            {
                GMailGlobals.Printdoc_Mail_SMTP_remove();
                return SendMailMethod.Smtp;
            }
            else if (String.Compare(method, m_csExtendedMapi, true) == 0) return SendMailMethod.ExtendedMapi;
            else if (String.Compare(method, m_csMapi, true) == 0) return SendMailMethod.Mapi;
            else if (String.Compare(method, m_csSbbSmtp, true) == 0) return SendMailMethod.SbbSmtp;
            else if (String.Compare(method, m_csMsoGraph, true) == 0) return SendMailMethod.Microsoft_GraphApi;
            // pprchal 2.9.2021
            else if (String.Compare(method, "Office365_Device", true) == 0) return SendMailMethod.Office365_Device;
            else if (String.Compare(method, "Office365_Default", true) == 0) return SendMailMethod.Office365_Default;
            else if (String.Compare(method, "Office365_ClientCredentials", true) == 0) return SendMailMethod.Office365_ClientCredentials;
            else return SendMailMethod.Unknown;
        } // end property

        /// <summary>pøevod zpùsobu odeslání e-mailu na øetìzec</summary>
        /// <param name="method">zpùsob odeslání e-mailu</param>
        /// <returns>øetìzec</returns>
        public static string GetSendMailMethod(SendMailMethod method) {
            switch(method) {
                case SendMailMethod.Smtp:
                    GMailGlobals.Printdoc_Mail_SMTP_remove();
                    return m_csSmtp;
                case SendMailMethod.ExtendedMapi: return m_csExtendedMapi;
                case SendMailMethod.Mapi: return m_csMapi;
                case SendMailMethod.SbbSmtp: return m_csSbbSmtp;
                case SendMailMethod.Microsoft_GraphApi: return m_csMsoGraph;
                // pprchal 2.9.2021
                case SendMailMethod.Office365_Device: return m_csSbbSmtp;
                case SendMailMethod.Office365_Default: return m_csSbbSmtp;
                case SendMailMethod.Office365_ClientCredentials: return m_csSbbSmtp;
                default: return m_csUnknown;
            } // end switch
        } // end property

        /// <summary>pøevod øetìzce na formát e-mailu</summary>
        /// <param name="format">vstupní øetìzec</param>
        /// <returns>formát e-mailu</returns>
        public static MailFormat GetMailFormat(string format) {
            format = format == null ? String.Empty : format.Trim();
            if(String.Compare(format,m_csHtml,true) == 0) return MailFormat.Html;
            else return MailFormat.Text;
        } // end property

        /// <summary>pøevod formátu e-mailu na øetìzec</summary>
        /// <param name="format">formát e-mailu</param>
        /// <returns>øetìzec</returns>
        public static string GetMailFormat(MailFormat format) {
            string l_sSubsystem = String.Empty;
            switch(format) {
            case MailFormat.Html: l_sSubsystem = m_csHtml; break;
            case MailFormat.Text: l_sSubsystem = m_csText; break;
            } // end switch
            return l_sSubsystem;
        } // end property

        /// <summary>získání názvu výchozího profilu odesílatele mailu</summary>
        /// <returns>název výchozího profilu odesílatele mailu</returns>
        public static string GetDefaultMailProfile() {
            string l_sDefaultProfile = String.Empty;
            try {
                using(RegistryKey l_oRegistryKey = Registry.CurrentUser.OpenSubKey(m_csMailProfilesKey)) {
                    if(l_oRegistryKey != null) l_sDefaultProfile = (string) l_oRegistryKey.GetValue("DefaultProfile",String.Empty);
                } // end using
            } catch { } // end try 
            return l_sDefaultProfile;
        } // end method

        /// <summary>vytvoøení klonu objektu</summary>
        /// <typeparam name="TType">typ klonovaného objektu</typeparam>
        /// <param name="original">instance klonovaného objektu</param>
        /// <returns>klon objektu</returns>
        public static TType Clone<TType>(TType original) where TType : ICloneable {
            return (TType)(original.Clone());
        } // end method

        /// <summary>podmínìné doplnìní cesty klíèe registru HKLM/software pro 64bitovou architekturu</summary>
        /// <param name="path">pùvodní cesta</param>
        /// <returns>cesta v pøípadì potøeby doplnìná o èást wow6432node</returns>
        public static string GetRegistry6432Path(string path) {
            if(path != null) {
                path = path.ToLower();
                if(Is64Bit && path.StartsWith(m_csSoftwareKey) && path.StartsWith(m_csSoftwareKey_x64) == false) path = path.Replace(m_csSoftwareKey,m_csSoftwareKey_x64);
            } // end if
            return path;
        } // end method

        /// <summary>získání zøetìzených textù z jednotlivých prvkù vstupního pole</summary>
        /// <param name="parameters">vstupní pole s prvky k zøetìzení textù</param>
        /// <returns>zøetìzený text</returns>
        public static string JoinTexts(object[] parameters) {
            return JoinTexts(parameters,',',true,false);
        } // end method

        /// <summary>získání zøetìzených textù z jednotlivých prvkù vstupního pole</summary>
        /// <param name="parameters">vstupní pole s prvky k zøetìzení textù</param>
        /// <param name="separator">oddìlovaè jednotlivých textù</param>
        /// <returns>zøetìzený text</returns>
        public static string JoinTexts(object[] parameters,char separator) {
            return JoinTexts(parameters,separator,true,false);
        } // end method

        /// <summary>získání zøetìzených textù z jednotlivých prvkù vstupního pole</summary>
        /// <param name="parameters">vstupní pole s prvky k zøetìzení textù</param>
        /// <param name="separator">oddìlovaè jednotlivých textù</param>
        /// <param name="includeSpace">pøíznak vložení mezery za oddìlovaè</param>
        /// <returns>zøetìzený text</returns>
        public static string JoinTexts(object[] parameters,char separator,bool includeSpace) {
            return JoinTexts(parameters,separator,true,false);
        } // end method

        /// <summary>získání zøetìzených textù z jednotlivých prvkù vstupního pole</summary>
        /// <param name="parameters">vstupní pole s prvky k zøetìzení textù</param>
        /// <param name="separator">oddìlovaè jednotlivých textù</param>
        /// <param name="includeSpace">pøíznak vložení mezery za oddìlovaè</param>
        /// <param name="skipNull">pøíznak pøeskoèení prvkù s hodnotou null</param>
        /// <returns>zøetìzený text</returns>
        public static string JoinTexts(object[] parameters,char separator,bool includeSpace,bool skipNull) {
            StringBuilder l_oText = null;
            if(parameters != null && parameters.Length > 0) {
                foreach(object l_oParameter in parameters) {
                    if(l_oParameter != null || skipNull == false) {
                        if(l_oText == null) l_oText = new StringBuilder();
                        else {
                            l_oText.Append(separator);
                            if(includeSpace) l_oText.Append(' ');
                        } // end if
                        l_oText.Append(l_oParameter == null ? m_csNull : l_oParameter.ToString());
                    } // end if
                } // end foreach
            } // end if
            return l_oText == null ? String.Empty : l_oText.ToString();
        } // end method

        /// <summary>pøevod øetìzce na pøípustnost verze OLE DB provideru</summary>
        /// <param name="versionStatus">vstupní øetìzec</param>
        /// <returns>pøípustnost verze OLE DB provideru</returns>
        public static OledbProviderVersionStatus GetOledbProviderVersionStatus(string versionStatus) {
            versionStatus = versionStatus == null ? String.Empty : versionStatus.Trim();
            if(String.Compare(versionStatus,GResources.GetResourceText(ThisAssembly,23230167),true) == 0) return OledbProviderVersionStatus.Unsupported; // nepodporovaná
            else if(String.Compare(versionStatus,GResources.GetResourceText(ThisAssembly,23230168),true) == 0) return OledbProviderVersionStatus.Unrecommended; // nedoporuèená
            else return OledbProviderVersionStatus.Recommended;
        } // end property

        /// <summary>pøevod pøípustnosti verze OLE DB provideru na øetìzec</summary>
        /// <param name="versionStatus">pøípustnost verze OLE DB provideru</param>
        /// <returns>øetìzec</returns>
        public static string GetOledbProviderVersionStatus(OledbProviderVersionStatus versionStatus) {
            string l_sVersionStatus = String.Empty;
            switch(versionStatus) {
            case OledbProviderVersionStatus.Unsupported:
                l_sVersionStatus = GResources.GetResourceText(ThisAssembly,23230167); // nepodporovaná
                break;
            case OledbProviderVersionStatus.Unrecommended:
                l_sVersionStatus = GResources.GetResourceText(ThisAssembly,23230168); // nedoporuèená
                break;
            case OledbProviderVersionStatus.Recommended:
                l_sVersionStatus = GResources.GetResourceText(ThisAssembly,23230169); // doporuèená
                break;
            } // end switch
            return l_sVersionStatus;
        } // end property

        /// <summary>odstranìní diakritiky z textu</summary>
        /// <param name="text">pùvodní text</param>
        /// <returns>výsledný text</returns>
        public static string RemoveDiacritics(string text)
        {
            // oddìlení znakù od modifikátorù (háèkù, èárek, atd.)
            text = text.Normalize(System.Text.NormalizationForm.FormD);
            System.Text.StringBuilder sb = new System.Text.StringBuilder(text.Length);

            foreach(var ch in text)
            {
                // do øetìzce pøidá všechny znaky kromì modifikátorù
                if (System.Globalization.CharUnicodeInfo.GetUnicodeCategory(ch) != System.Globalization.UnicodeCategory.NonSpacingMark)
                {
                    sb.Append(ch);
                }
            }

            // vrátí øetìzec bez diakritiky
            return sb.ToString();
        }

        /// <summary>odstranìní znakù nevyhovujících normì XML 1.0</summary>
        /// <param name="text">pùvodní text</param>
        /// <returns>výsledný text</returns>
        /// <remarks>viz. http://www.w3.org/TR/2000/REC-xml-20001006#NT-Char</remarks>
        public static string NormalizeXml(string text) {
            if(text == null || text == String.Empty) return text;
            else {
                StringBuilder l_oStringBuilder = new StringBuilder(text.Length,text.Length);
                foreach(char l_cCurrentChar in text.ToCharArray()) {
                    if(
                        (l_cCurrentChar == 0x9) ||
                        (l_cCurrentChar == 0xA) ||
                        (l_cCurrentChar == 0xD) ||
                        ((l_cCurrentChar >= 0x20) && (l_cCurrentChar <= 0xD7FF)) ||
                        ((l_cCurrentChar >= 0xE000) && (l_cCurrentChar <= 0xFFFD))
                    ) {
                        l_oStringBuilder.Append(l_cCurrentChar);
                    } // end if
                } // end foreach
                return l_oStringBuilder.ToString();
            } // end if
        } // end method

        /// <summary>zjištìní zda øetìzec obsahuje znaky nevyhovujících normì XML 1.0</summary>
        /// <param name="text">øetìzec</param>
        /// <returns>true v pøípadì výskytu nepodporovaného znaku, jinak false</returns>
        public static bool HasUnsupportedXmlChar(string text) {
            if(text != null) {
                for(int i = 0; i < text.Length; i++) {
                    if(
                        (text[i] != 0x9) &&
                        (text[i] != 0xA) &&
                        (text[i] != 0xD) &&
                        ((text[i] < 0x20) || (text[i] > 0xD7FF)) &&
                        ((text[i] < 0xE000) || (text[i] > 0xFFFD))
                    ) return true;
                } // end for
            } // end if
            return false;
        } // end if

        /// <summary>vrací pøíznak, zda xml uzel obsahuje pouze textovou hodnotu</summary>
        /// <param name="node">testovaný xml uzel</param>
        /// <returns>true v pøípadì, že xml uzel obsahuje pouze textovou hodnotu, jinak false</returns>
        public static bool ContainsText(XmlNode node) {
            return node != null && (node.HasChildNodes==false || (node.ChildNodes.Count == 1 && node.FirstChild.NodeType == XmlNodeType.Text));
        } // end method

        /// <summary>vrací pøíznak, zda xml uzel obsahuje vnoøenou xml strukturu</summary>
        /// <param name="node">testovaný xml uzel</param>
        /// <returns>true v pøípadì, že xml uzel obsahuje vnoøenou xml strukturu, jinak false</returns>
        public static bool ContainsXml(XmlNode node) {
            return node != null && ContainsText(node) == false;
        } // end method

        /// <summary>vrací hodnotu xml uzlu s nahrazením znakových entit v závislosti na typu obsahu</summary>
        /// <param name="node">xml uzel</param>
        /// <returns>hodnota xml uzlu s nahrazenými znakovými entitami v pøípadì, že uzel obsahuje pouze text, jinak hodnota uzlu bez formátování</returns>
        public static string ObtainFormattedValue(XmlNode node) {
            if(node == null) return String.Empty;
            else return ContainsText(node) ? node.InnerText : node.InnerXml;
        } // end method

        /// <summary>pøevod øetìzce na typ SMS brány</summary>
        /// <param name="smsGatewayType">vstupní øetìzec</param>
        /// <returns>typ SMS brány</returns>
        public static SmsGatewayType GetSmsGatewayType(string smsGatewayType) {
            smsGatewayType = smsGatewayType == null ? String.Empty : smsGatewayType.Trim();
            if(String.Compare(smsGatewayType,SmsGatewayType.SmsInfoKanal.ToString(),true) == 0) return SmsGatewayType.SmsInfoKanal;
            else return SmsGatewayType.NotSupported;
        } // end property

        /// <summary>pøevod typu SMS brány na øetìzec</summary>
        /// <param name="smsGatewayType">typ SMS brány</param>
        /// <returns>øetìzec</returns>
        public static string GetSmsGatewayType(SmsGatewayType smsGatewayType) {
            return smsGatewayType.ToString();
        } // end property

        /// <summary>získání nativního textu pro booleovskou hodnotu</summary>
        /// <param name="input">hodnotu</param>
        /// <returns>nativní textu</returns>
        public static string GetBooleanNativeText(bool input) {
            if(input) return GResources.GetResourceText(ThisAssembly,23230178); // Ano
            else return GResources.GetResourceText(ThisAssembly,23230179); // Ne
        } // end property

        /// <summary>incializace spoleèných komponent</summary>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public static void GeneralInitialize() {
            // inicializace probíhá prostøednictvím statického konstruktoru
        } // end method

        /// <summary>zamezení kontroly verze pøi naèítání odkazované assembly</summary>
        /// <param name="assemblyName">Regex pro název assembly bez pøípony</param>
        [SecuritySafeCritical]
        [Obsolete("Pouzijte DisableReferencedAssemblyVersionCheck(RegExp); Pro System.*, Microsoft.* neni potreba uvadet vubec")]
        public static void DisableReferencedAssemblyVersionCheck(string assemblyName) {
            DisableReferencedAssemblyVersionCheck(new Regex(assemblyName));
        }

        [SecurityCritical]
        private class DisableReferencedAssemblyVersionCheckClass
        {
            private Regex assemblyName;
            public DisableReferencedAssemblyVersionCheckClass(Regex a_assemblyName)
            {
                this.assemblyName = a_assemblyName;
            }

            public Assembly Run(object sender, ResolveEventArgs args)
            {
                AssemblyName l_oRequestedAssembly = new AssemblyName(args.Name);
                if (assemblyName.IsMatch(l_oRequestedAssembly.Name)) {
                    // cteni z jiz loadnutych assembly
                    if (AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(a => l_oRequestedAssembly.Name == a.GetName().Name) is Assembly found)
                        return found;

                    var p = new System.Security.PermissionSet(System.Security.Permissions.PermissionState.Unrestricted); //FullTrust
                    p.Assert();

                    // cteni z lokalniho binu 
#if NETFRAMEWORK
                    Uri l_oUri = new Uri(ThisAssembly.CodeBase);
#else
                    //TODO overit ThisAssembly.CodeBase vs ThisAssembly.Location
                    Uri l_oUri = new Uri(ThisAssembly.Location);
#endif
                    if (l_oUri.Scheme == "file") {
                        string l_sAssemblyPath = Path.Combine(Path.GetDirectoryName(l_oUri.LocalPath), l_oRequestedAssembly.Name + ".DLL"); // velka pismena (DLL), aby se potkalo s FUSION loadem (asi nezalezi, ale kdyz se resil problem toto byl rozdil, tak pro jistotu)
                        if (File.Exists(l_sAssemblyPath)) {
                            // check pro zabraneni rekurze, provadime pouze presmerovani "spatne verze" na "aktualni verzi" souboru.
                            // Pokud by i jeji load selhal a znovu se vyvolal Resolve, nesmime ho opakovane poslat do Loadu 
                            var aName = AssemblyName.GetAssemblyName(l_sAssemblyPath);
                            return aName.FullName != l_oRequestedAssembly.FullName ? Assembly.Load(aName) : null;
                        }

#if DEBUG || DEVELOP_VERSION
                        // cteni z velkeho binu, pouze pro vyvoj. V produkci vsechny soubory MUSI byt v binu
#if NETFRAMEWORK
                        var l_sAssemblyPathBin = Regex.Replace(l_sAssemblyPath, @"NET\\[\w\d\.]+\\bin", @"NET\bin", RegexOptions.IgnoreCase);
#else
                        var l_sAssemblyPathBin = Regex.Replace(l_sAssemblyPath, @"NET\\[\w\d\.]+\\bin", @"NET\bincore", RegexOptions.IgnoreCase);
#endif
                        if (l_sAssemblyPath != l_sAssemblyPathBin && File.Exists(l_sAssemblyPathBin))
                            return Assembly.Load(File.ReadAllBytes(l_sAssemblyPathBin));  // Assembly.LoadFrom fungovalo nejlepe, ale lockuje soubory v bin. Ale pokud se vyskytnout problemy MethodNotFound pri vyvoji, zkusit nahradit zpet
#endif
                    }
                }
                return null;
            }
        }

        /// <summary>zamezení kontroly verze pøi naèítání odkazované assembly</summary>
        /// <param name="assemblyName">Regex pro název assembly bez pøípony</param>
        [SecuritySafeCritical]
        public static void DisableReferencedAssemblyVersionCheck(Regex assemblyName) {
            AppDomain.CurrentDomain.AssemblyResolve += new DisableReferencedAssemblyVersionCheckClass(assemblyName).Run;

            // DEBUG VERZE
/*            AppDomain.CurrentDomain.AssemblyResolve += (sender, args) => {
                AssemblyName l_oRequestedAssembly = new AssemblyName(args.Name);
                if (assemblyName.IsMatch(l_oRequestedAssembly.Name)) {
                    // cteni z jiz loadnutych assembly
                    File.AppendAllText(@"N:\log.log", $"Seeking {l_oRequestedAssembly.Name}\n");
                    if (l_oRequestedAssembly.Name == "System.Diagnostics.DiagnosticSource") {
                        File.AppendAllText(@"N:\log.log", $"FullList \n{String.Join("\n", AppDomain.CurrentDomain.GetAssemblies().Select(a => $"{a.FullName}, {(a.IsDynamic ? "DYNAMIC" : a.CodeBase)}"))}\n======================================================================================================\n");
                    }

                    if (AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(a => l_oRequestedAssembly.Name == a.GetName().Name) is Assembly found) {
                        File.AppendAllText(@"N:\log.log", $"Cached {l_oRequestedAssembly.Name}\n");
                        return found;
                    }
                    Debugger.Break();
                    // cteni z lokalniho binu 
                    Uri l_oUri = new Uri(ThisAssembly.CodeBase);
                    if (l_oUri.Scheme == "file") {
                        string l_sAssemblyPath = Path.Combine(Path.GetDirectoryName(l_oUri.LocalPath), l_oRequestedAssembly.Name + ".DLL");
                        File.AppendAllText(@"N:\log.log", $"Checking {l_sAssemblyPath}\n");
                        if (File.Exists(l_sAssemblyPath)) {
                            // check pro zabraneni rekurze, provadime pouze presmerovani "spatne verze" na "aktualni verzi" souboru.
                            // Pokud by i jeji load selhal a znovu se vyvolal Resolve, nesmime ho opakovane poslat do Loadu 
                            var aName = AssemblyName.GetAssemblyName(l_sAssemblyPath);
                            if (aName.FullName != l_oRequestedAssembly.FullName) {
                                File.AppendAllText(@"N:\log.log", $"Loading {l_sAssemblyPath}\n");
                                return Assembly.Load(aName);
                            } else return null;
                        }

#if DEBUG || DEVELOP_VERSION
                        // cteni z velkeho binu, pouze pro vyvoj. V produkci vsechny soubory MUSI byt v binu
                        var l_sAssemblyPathBin = Regex.Replace(l_sAssemblyPath, @"NET\\[\w\d\.]+\\bin", @"NET\bin", RegexOptions.IgnoreCase);
                        File.AppendAllText(@"N:\log.log", $"Checking {l_sAssemblyPathBin}\n");
                        if (l_sAssemblyPath != l_sAssemblyPathBin && File.Exists(l_sAssemblyPathBin)) {
                            File.AppendAllText(@"N:\log.log", $"Loading {l_sAssemblyPathBin}\n");
                            return Assembly.Load(File.ReadAllBytes(l_sAssemblyPathBin));
                        }
#endif
                    }
                    File.AppendAllText(@"N:\log.log", $"Not Loaded {args.Name} \n");
                }
                return null;
            };*/
        } // end method

        /// <summary>Prida relativni nebo absolutni cestu do Environment Variable "PATH"</summary>
        /// <param name="relativePath"></param>
        public static void AddNativeLibraryFolder(string relativePath) {
            var nativeDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, relativePath);
            if (!Directory.Exists(nativeDir)) return;

            var currentPath = Environment.GetEnvironmentVariable("PATH") ?? "";
            if (!currentPath.Contains(nativeDir, StringComparison.OrdinalIgnoreCase)) 
                Environment.SetEnvironmentVariable("PATH", nativeDir + ";" + currentPath);
        }

        /// <summary>získání kontrolního souètu obsahu kolekce</summary>
        /// <param name="source">kolekce</param>
        /// <returns>kontrolní souèet</returns>
        public static UInt64 GetContentHash(IDictionary<string,string> source) {
            UInt64 l_nHash = 0;
            if(source != null && source.Count > 0) {
                foreach(KeyValuePair<string,string> l_oItem in source.OrderBy(item => item.Key)) {
                    l_nHash = CalculateHash(l_oItem.Key,l_nHash);
                    if(l_oItem.Value != null) l_nHash = CalculateHash(l_oItem.Value,l_nHash);
                } // end foreach
            } // end if
            return l_nHash;
        } // end method

        /// <summary>získání IP adresy lokální stanice</summary>
        /// <returns>IP adresa lokální stanice</returns>
        public static string GetLocalIPAddress() {
            try {
                using(Socket l_oSocket = new Socket(AddressFamily.InterNetwork,SocketType.Dgram,0)) {
                    l_oSocket.Connect("8.8.8.8",65530);
                    IPEndPoint endPoint = l_oSocket.LocalEndPoint as IPEndPoint;
                    return endPoint?.Address?.ToString() ?? String.Empty;
                } // end using
            } // end try
            catch {
                return String.Empty; // všechny výjimky jsou ignorovány
            } // end catch
        } // end method

#endregion

        #region veøejné statické metody pro pøetypování

        /// <summary>pøetypování s možností definice výchozí hodnoty</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>pøetypovaná hodnota, je-li pøetypování možné, jinak výchozí hodnota</returns>
        public static bool Parse(object inputValue,bool defaultValue) {
            bool l_bReturnValue = false;
            return TryParse(inputValue,out l_bReturnValue) ? l_bReturnValue : defaultValue;
        } // end method

        /// <summary>pøetypování na boolean s ovìøením pøípustnosti konverze</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="resultValue">výsledná hodnota</param>
        /// <returns>pøíznak úspìšnosti konverze</returns>
        public static bool TryParse(object inputValue,out bool resultValue) {
            resultValue = false;
            bool l_bSucceded = false;
            if(inputValue != null) {
                string l_sInputValue = inputValue.ToString().Trim().ToLower();
                string l_sAno = GResources.GetResourceText(ThisAssembly,23230007).ToLower(); // ano
                string l_sNe = GResources.GetResourceText(ThisAssembly,23230008).ToLower(); // ne
                if(l_sInputValue == Boolean.TrueString.ToLower() || l_sInputValue == l_sAno || l_sInputValue == "yes" || l_sInputValue == "on" || l_sInputValue == "y" || l_sInputValue == l_sAno[0].ToString()) {
                    resultValue = true;
                    l_bSucceded = true;
                } else if(l_sInputValue == Boolean.FalseString.ToLower() || l_sInputValue == l_sNe || l_sInputValue == "no" || l_sInputValue == "off" || l_sInputValue == "n" || l_sInputValue == l_sNe[0].ToString()) {
                    resultValue = false;
                    l_bSucceded = true;
                } else {
                    decimal l_dmDecimalValue;
                    if(Decimal.TryParse(l_sInputValue,out l_dmDecimalValue)) {
                        resultValue = l_dmDecimalValue != 0;
                        l_bSucceded = true;
                    } // end if 
                } // end if
            } // end if
            return l_bSucceded;
        } // end method

        /// <summary>pøetypování s možností definice výchozí hodnoty</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>pøetypovaná hodnota, je-li pøetypování možné, jinak výchozí hodnota</returns>
        public static short Parse(object inputValue,short defaultValue) {
            short l_nReturnValue;
            if(inputValue != null && Int16.TryParse(inputValue.ToString(),out l_nReturnValue)) return l_nReturnValue;
            else return defaultValue;
        } // end method

        /// <summary>pøetypování s možností definice výchozí hodnoty</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>pøetypovaná hodnota, je-li pøetypování možné, jinak výchozí hodnota</returns>
        public static int Parse(object inputValue,int defaultValue) {
            int l_nReturnValue;
            if(inputValue != null && Int32.TryParse(inputValue.ToString(),out l_nReturnValue)) return l_nReturnValue;
            else return defaultValue;
        } // end method

        /// <summary>pøetypování s možností definice výchozí hodnoty</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>pøetypovaná hodnota, je-li pøetypování možné, jinak výchozí hodnota</returns>
        public static long Parse(object inputValue,long defaultValue) {
            long l_nReturnValue;
            if(inputValue != null && Int64.TryParse(inputValue.ToString(),out l_nReturnValue)) return l_nReturnValue;
            else return defaultValue;
        } // end method

        /// <summary>pøetypování s možností definice výchozí hodnoty</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>pøetypovaná hodnota, je-li pøetypování možné, jinak výchozí hodnota</returns>
        public static decimal Parse(object inputValue,decimal defaultValue) {
            decimal l_dmReturnValue;
            if(inputValue != null && Decimal.TryParse(inputValue.ToString(),out l_dmReturnValue)) return l_dmReturnValue;
            else return defaultValue;
        } // end method

        /// <summary>pøetypování s možností definice výchozí hodnoty</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>pøetypovaná hodnota, je-li pøetypování možné, jinak výchozí hodnota</returns>
        public static DateTime Parse(object inputValue,DateTime defaultValue) {
            DateTime l_dtReturnValue;
            if(inputValue != null && DateTime.TryParse(inputValue.ToString(),out l_dtReturnValue)) return l_dtReturnValue;
            else {
                try {
                    string l_sInputValue = inputValue == null ? String.Empty : inputValue.ToString().Trim();
                    if(l_sInputValue.Length == 8) return DateTime.ParseExact(l_sInputValue,"yyyyMMdd",CultureInfo.InvariantCulture);
                    else if(l_sInputValue.Length == 17 && l_sInputValue[8] == ' ' && l_sInputValue[11] == ':' && l_sInputValue[14] == ':') return DateTime.ParseExact(l_sInputValue,"yyyyMMdd HH:mm:ss",CultureInfo.InvariantCulture);
                } // end try
                catch {
                    // všechny výjimky jsou ignorovány
                } // end catch
                return defaultValue;
            } // end if
        } // end method

        /// <summary>pøetypování s možností definice výchozí hodnoty</summary>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>pøetypovaná hodnota, je-li pøetypování možné, jinak výchozí hodnota</returns>
        public static DateTimeOffset Parse(object inputValue,DateTimeOffset defaultValue) {
            DateTimeOffset l_dtReturnValue;
            if(inputValue != null && DateTimeOffset.TryParse(inputValue.ToString(),out l_dtReturnValue)) return l_dtReturnValue;
            else {
                try {
                    string l_sInputValue = inputValue == null ? String.Empty : inputValue.ToString().Trim();
                    if(l_sInputValue.Length == 8) return DateTimeOffset.ParseExact(l_sInputValue,"yyyyMMdd",CultureInfo.InvariantCulture);
                    else if(l_sInputValue.Length == 17 && l_sInputValue[8] == ' ' && l_sInputValue[11] == ':' && l_sInputValue[14] == ':') return DateTimeOffset.ParseExact(l_sInputValue,"yyyyMMdd HH:mm:ss",CultureInfo.InvariantCulture);
                } // end try
                catch {
                    // všechny výjimky jsou ignorovány
                } // end catch
                return defaultValue;
            } // end if
        } // end method

        /// <summary>pøetypování øetìzce na výètový typ (enum) s možností definice výchozí hodnoty</summary>
        /// <typeparam name="T">požadovaný výètový typ</typeparam>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>pøetypovaná hodnota, je-li pøetypování možné, jinak výchozí hodnota</returns>
        public static T ParseEnum<T>(string inputValue,T defaultValue) where T : struct {
            return ParseEnum(inputValue,false,defaultValue);
        } // end method

        /// <summary>pøetypování øetìzce na výètový typ (enum) s možností definice výchozí hodnoty</summary>
        /// <typeparam name="T">požadovaný výètový typ</typeparam>
        /// <param name="inputValue">vstupní hodnota</param>
        /// <param name="ignoreCase">pøíznak pøetypování bez ohledu na velikost znakù</param>
        /// <param name="defaultValue">výchozí hodnota</param>
        /// <returns>pøetypovaná hodnota, je-li pøetypování možné, jinak výchozí hodnota</returns>
        public static T ParseEnum<T>(string inputValue,bool ignoreCase,T defaultValue) where T : struct {
            T l_eReturnValue;
            if(String.IsNullOrWhiteSpace(inputValue) == false && Enum.TryParse(inputValue,ignoreCase,out l_eReturnValue)) return l_eReturnValue;
            else return defaultValue;
        } // end method

        /// <summary>pøevod textu v Base64URL na pole bytù</summary>
        /// <param name="input">text v Base64URL</param>
        /// <returns>pole bytù</returns>
        public static byte[] FromBase64Url(string input) {
            if(String.IsNullOrWhiteSpace(input)) return new byte[0];
            else {
                input = input.Trim();
                int l_nPadding = 3 - ((input.Length + 3) % 4);
                string l_sPadding = l_nPadding == 0 ? String.Empty : new string('=',l_nPadding);
                return Convert.FromBase64String(input.Replace('-','+').Replace('_','/') + l_sPadding);
            } // end if
        } // end method

        /// <summary>pøevod pole bytù na text v Base64URL</summary>
        /// <param name="input">pole bytù</param>
        /// <returns>text v Base64URL</returns>
        public static string ToBase64Url(byte[] input) {
            if(input == null || input.Length < 1) return String.Empty;
            else return Convert.ToBase64String(input).TrimEnd('=').Replace('+','-').Replace('/','_');
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>získání rozhraní na obecné informace o aplikaci</summary>
        /// <param name="path">cesta ke spustitelnému souboru aplikace</param>
        /// <returns>rozhraní na obecné informace o aplikaci</returns>
        private static IGApplicationInfo GetApplicationInfo(string path) {
            try {
                IGApplicationInfo l_oApplicationInfo = null;
                if(path != null && File.Exists(path)) {
                    Assembly l_oAssembly = Assembly.LoadFrom(path);
                    foreach(Type l_oType in l_oAssembly.GetTypes()) {
                        if(l_oType.GetCustomAttributes(typeof(FazeAttribute),false).Length > 0) {
                            l_oApplicationInfo = new GApplicationInfo(l_oType,Path.GetDirectoryName(path));
                            break;
                        } // end if
                    } // end foreach
                } // end if
                return l_oApplicationInfo;
            } // end try
            catch(Exception e) {
                throw new GException(23200211,23200210,ThisAssembly,e); // selhal pokus o získání normalizovaného popisu aplikace
            } // end catch
        } // end method

        /// <summary>konvertory pro Newtonsoft.Json</summary>
        [GTypeScriptIgnore]
        public static System.Collections.Generic.List<JsonConverter> Converters = new System.Collections.Generic.List<JsonConverter>() {
            new GDbTypeJsonConverter(),
            new GCompositeFilterJsonConverter(),
            new GFilterJsonConverter(),
            new GFiltersJsonConverter(),
            //new GAppServerTransportResponseBaseConverter(),
        };

        /// <summary>prvotní inicializace referencované assembly Newtonsoft.Json</summary>
        
        private static void InitializeNewtonsoftJson() {
            JsonConvert.DefaultSettings = () => JsonSerializerSettings;
        } // end method

        [GTypeScriptIgnore]
        public static JsonSerializerSettings JsonSerializerSettings
        {
            get
            {
                var l_oSettings = new JsonSerializerSettings();
                foreach (var c in Converters) l_oSettings.Converters.Add(c);
                l_oSettings.NullValueHandling = NullValueHandling.Ignore;
                l_oSettings.ContractResolver = new GDbTypeJsonContractResolver();
                return l_oSettings;
            }
        }

        /// <summary>výpoèet kontrolního souètu</summary>
        /// <param name="key">klíè</param>
        /// <param name="hash">inicializaèní hodnota</param>
        /// <returns>kontrolní souèet</returns>
        /// <remarks>založeno na algoritmu Knuth hash</remarks>
        private static UInt64 CalculateHash(string key,UInt64 hash = 0) {
            if(hash == 0) hash = 3074457345618258791ul;
            for(int i = 0; i < key.Length; i++) {
                hash += key[i];
                hash *= 3074457345618258799ul;
            } // end for
            return hash;
        } // end method

        #endregion

    } // end class

} // end namespace


