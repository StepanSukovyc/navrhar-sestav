//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GLoginInfo.cs                 </Name>
//      <Description> informace potøebné pro pøihlášení k databázi </Description>
//      <Author>      Jan Kuttich                                  </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021   </Copyright>
//      <Created>     2004-01-16                                   </Created>
//  </FileHeader>

using System;
using System.Xml;
using System.Reflection;
using System.Diagnostics;
using System.Security;
using System.Security.Permissions;
using Newtonsoft.Json;

namespace Gordic.General {

    /// <summary>informace potøebné pro pøihlášení k databázi</summary>
    [Serializable]
    [DebuggerStepThrough]
    public class GLoginInfo : IGLoginInfo, IGObject {
        
        #region soukromé konstanty

        /// <summary>defaultní název pro serializaci</summary>
        private const string m_csSerializationName = "LoginInfo";

        /// <summary>název elementu pro serializaci databázového profilu</summary>
        private const string m_csProfile = "Profile";

        /// <summary>název elementu pro serializaci loginu uživatele</summary>
        private const string m_csUser = "User";

        /// <summary>název elementu pro serializaci hesla uživatele</summary>
        private const string m_csPassword = "Password";

        /// <summary>název elementu pro serializaci režimu pøihlášení</summary>
        private const string m_csRezim = "Rezim";

        /// <summary>název elementu pro serializaci uživatele systému</summary>
        private const string m_csLoginWin = "LoginWin";

        /// <summary>název elementu pro serializaci názvu klientského poèítaèe</summary>
        private const string m_csCompName = "CompName";

        /// <summary>název elementu pro serializaci identifikátoru instance</summary>
        private const string m_csIxsIns = "IxsIns";

        /// <summary>název elementu pro serializaci identifikátoru pùvodce zmìny</summary>
        private const string m_csIxsZmp = "IxsZmp";

        /// <summary>název elementu pro serializaci pøíznaku pøihlášení jako uživatel s oprávnìním DBA</summary>
        private const string m_csLoginAsDBA = "LoginAsDBA";

        /// <summary>název elementu pro serializaci typu databáze</summary>
        private const string m_csDatabaseType = "DatabaseType";

        /// <summary>název elementu pro serializaci názvu databáze</summary>
        private const string m_csDatabase = "Database";

        /// <summary>název elementu pro serializaci názvu datového zdroje</summary>
        private const string m_csDataSource = "DataSource";

        /// <summary>název elementu pro serializaci jména pro pøihlášení k databázi</summary>
        private const string m_csLoginDb = "LoginDb";

        /// <summary>název elementu pro serializaci hesla pro pøihlášení k databázi</summary>
        private const string m_csPasswordDb = "PasswordDb";

        /// <summary>název elementu pro serializaci typu autentizace do systému</summary>
        private const string m_csAuthenticationType = "AuthenticationType";

        /// <summary>název elementu pro serializaci typu poskytovatele databázového pøipojení</summary>
        private const string m_csProviderType = "ProviderType";

        /// <summary>název elementu pro serializaci nazvu poskytovatele databázového pøipojení</summary>
        private const string m_csProviderName = "ProviderName";

        /// <summary>název elementu pro serializaci pøíznaku databáze v Unicode</summary>
        private const string m_csUseUnicode = "UseUnicode";

        /// <summary>název elementu pro serializaci pøíznaku podpory pro Azure</summary>
        private const string m_csIsAzure = "IsAzure";

        /// <summary>název elementu pro serializaci kontrolního souètu hesla</summary>
        private const string m_csPasswordHash = "PasswordHash";

        /// <summary>název elementu pro serializaci soli použité pro výpoèet kontrolního souètu hesla</summary>
        private const string m_csPasswordSalt = "PasswordSalt";

        /// <summary>název elementu pro serializaci identifikátoru externího uživatele typu veøejnost</summary>
        private const string m_csIxsExu = "IxsExu";

        /// <summary>název elementu pro serializaci jednorázového pøihlašovacího tokenu</summary>
        private const string m_csLoginToken = "LoginToken";

        /// <summary>název elementu pro serializaci identifikátoru požadavku na autentizaci externího uživatele typu veøejnost</summary>
        private const string m_csRequestId = "RequestId";

        /// <summary>název elementu pro serializaci stupnì verifikace externího uživatele typu veøejnost </summary>
        private const string m_csVerifExu = "VerifExu";

        #endregion

        #region soukromé èleny

        /// <summary>název databázového profilu</summary>
        private GString m_gsProfile = new GString(50);

        /// <summary>login uživatele</summary>
        private GString m_gsUser = new GString(200);

        /// <summary>heslo uživatele</summary>
        //private GString m_gsPassword = new GString(200);
        private GSecureString _SecurePassword = null;

        /// <summary>režim pøihlášení (1=funkce, 2=zástup, 3=funkce+zástup, 4=pouze první položka funkce+zástup)</summary>
        private GInt32 m_gnRezim = new GInt32(); 

        /// <summary>uživatel systému</summary>
        private GString m_gsLoginWin = new GString(60);

        /// <summary>název klientského poèítaèe</summary>
        private GString m_gsCompName = new GString(254);

        /// <summary>identifikátor instance</summary>
        private GString m_gsIxsIns = new GString(12);

        /// <summary>identifikátor pùvodce zmìny</summary>
        private GString m_gsIxsZmp = new GString(12);

        /// <summary>pøíznak pøihlášení jako uživatel s oprávnìním DBA</summary>
        private bool m_bLoginAsDBA = false;

        /// <summary>typ databáze</summary>
        private GCommon.DatabaseType m_eDatabaseType = GCommon.DatabaseType.Undefined;

        /// <summary>název databáze (má smysl pouze pro Informix a SQL Server)</summary>
        private GString m_gsDatabase = new GString(50);

        /// <summary>název datového zdroje (tj. údaj server pro Informix a SQL Server, anebo údaj SID pro Oracle)</summary>
        private GString m_gsDataSource = new GString(254);

        /// <summary>jméno pro pøihlášení k databázi</summary>
        /// <remarks>v pøípadì vyplnìní má pøednost pøed loginem uživatele</remarks>
        private GString m_gsLoginDb = new GString(60);

        /// <summary>heslo pro pøihlášení k databázi</summary>
        /// <remarks>v pøípadì vyplnìní má pøednost pøed heslem uživatele</remarks>
        //private GString m_gsPasswordDb = new GString(50);
        private GSecureString _SecurePasswordDb = null;

        /// <summary>vstupenka do systému</summary>
        private IGTicket m_oTicket = null;

        /// <summary>typ autentizace do systému</summary>
        private GCommon.AuthenticationType m_eAuthenticationType = GCommon.AuthenticationType.Ginis;

        /// <summary>typ poskytovatele databázového pøipojení</summary>
        private GCommon.ProviderType m_eProviderType = GCommon.ProviderType.OleDb;

        /// <summary>pøíznak databáze v Unicode</summary>
        private bool m_bUseUnicode = false;

        /// <summary>pøíznak podpory pro Azure</summary>
        private bool m_bIsAzure = false;

        /// <summary>kontrolní souèet hesla</summary>
        private GString m_gsPasswordHash = new GString(254);

        /// <summary>sùl použitá pro výpoèet kontrolního souètu hesla</summary>
        private GString m_gsPasswordSalt = new GString(254);

        /// <summary>identifikátor externího uživatele typu veøejnost</summary>
        private GString m_gsIxsExu = new GString(12);

        /// <summary>jednorázový pøihlašovací token</summary>
        private GString m_gsLoginToken = new GString(60);

        /// <summary>nazev poskytovatele databázového pøipojení</summary>
        private GString m_gsProviderName = new GString(200);

        /// <summary>identifikátor požadavku na autentizaci externího uživatele typu veøejnost</summary>
        private GString m_gsRequestId = new GString(50);

        /// <summary>stupeò verifikace externího uživatele typu veøejnost </summary>
        private GInt16 m_gnVerifExu = new GInt16();

        #endregion

        #region vlastnosti

        /// <summary>defaultní název pro serializaci</summary>
        public static string SerializationName {
            get {return m_csSerializationName;}
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GLoginInfo).Assembly;}
        } // end property

        /// <summary>instance s výchozími hodnotami</summary>
        public static IGLoginInfo DefaultInstance {
            get { return new GLoginInfo(); }
        } // end property

        /// <summary>název elementu pro serializaci databázového profilu</summary>
        public static string ProfileKey { get { return m_csProfile; } }

        /// <summary>název elementu pro serializaci loginu uživatele</summary>
        public static string UserKey { get { return m_csUser; } }

        /// <summary>název elementu pro serializaci hesla uživatele</summary>
        public static string PasswordKey { get { return m_csPassword; } }

        /// <summary>název elementu pro serializaci režimu pøihlášení</summary>
        public static string RezimKey { get { return m_csRezim; } }

        /// <summary>název elementu pro serializaci uživatele systému</summary>
        public static string LoginWinKey { get { return m_csLoginWin; } }

        /// <summary>název elementu pro serializaci názvu klientského poèítaèe</summary>
        public static string CompNameKey { get { return m_csCompName; } }

        /// <summary>název elementu pro serializaci identifikátoru instance</summary>
        public static string IxsInsKey { get { return m_csIxsIns; } }

        /// <summary>název elementu pro serializaci identifikátoru pùvodce zmìny</summary>
        public static string IxsZmpKey { get { return m_csIxsZmp; } }

        /// <summary>název elementu pro serializaci pøíznaku pøihlášení jako uživatel s oprávnìním DBA</summary>
        public static string LoginAsDBAKey { get { return m_csLoginAsDBA; } }

        /// <summary>název elementu pro serializaci typu databáze</summary>
        public static string DatabaseTypeKey { get { return m_csDatabaseType; } }

        /// <summary>název elementu pro serializaci názvu databáze</summary>
        public static string DatabaseKey { get { return m_csDatabase; } }

        /// <summary>název elementu pro serializaci názvu datového zdroje</summary>
        public static string DataSourceKey { get { return m_csDataSource; } }

        /// <summary>název elementu pro serializaci jména pro pøihlášení k databázi</summary>
        public static string LoginDbKey { get { return m_csLoginDb; } }

        /// <summary>název elementu pro serializaci hesla pro pøihlášení k databázi</summary>
        public static string PasswordDbKey { get { return m_csPasswordDb; } }

        /// <summary>název elementu pro serializaci typu autentizace do systému</summary>
        public static string AuthenticationTypeKey { get { return m_csAuthenticationType; } }

        /// <summary>název elementu pro serializaci typu poskytovatele databázového pøipojení</summary>
        public static string ProviderTypeKey { get { return m_csProviderType; } }

        /// <summary>název elementu pro serializaci n8zvu poskytovatele databázového pøipojení</summary>
        public static string ProviderNameKey { get { return m_csProviderName; } }

        /// <summary>název elementu pro serializaci pøíznaku databáze v Unicode</summary>
        public static string UseUnicodeKey { get { return m_csUseUnicode; } }

        /// <summary>název elementu pro serializaci pøíznaku podpory pro Azure</summary>
        public static string IsAzureKey { get { return m_csIsAzure; } }

        /// <summary>název elementu pro serializaci kontrolního souètu hesla</summary>
        public static string PasswordHashKey { get { return m_csPasswordHash; } }

        /// <summary>název elementu pro serializaci soli použité pro výpoèet kontrolního souètu hesla</summary>
        public static string PasswordSaltKey { get { return m_csPasswordSalt; } }

        /// <summary>název elementu pro serializaci identifikátoru externího uživatele typu veøejnost</summary>
        public static string IxsExuKey { get { return m_csIxsExu; } }

        /// <summary>název elementu pro serializaci identifikátoru požadavku na autentizaci externího uživatele typu veøejnost</summary>
        public static string RequestIdKey { get { return m_csRequestId; } }

        /// <summary>název elementu pro serializaci stupnì verifikace externího uživatele typu veøejnost </summary>
        public static string VerifExuKey { get { return m_csVerifExu; } }

        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        [SecuritySafeCritical]
        public GLoginInfo() { }

        /// <summary>veøejný konstruktor</summary>
        /// <param name="loginInfo">rozhraní na informace potøebné pro pøihlášení k databázi</param>
        [SecuritySafeCritical]
        public GLoginInfo(IGLoginInfo loginInfo) {
            IGLoginInfo l_oThis        = this as IGLoginInfo;
            l_oThis.Profile            = loginInfo.Profile.Clone() as GString;
            l_oThis.User               = loginInfo.User.Clone() as GString;
            l_oThis.SecurePassword     = new GSecureString( loginInfo.SecurePassword ); // ref T32846 - nevím, zda dìlat novou instanci nebo zde nechat jen odkaz na objekt
            l_oThis.Rezim              = loginInfo.Rezim.Clone() as GInt32;
            l_oThis.LoginWin           = loginInfo.LoginWin.Clone() as GString;
            l_oThis.CompName           = loginInfo.CompName.Clone() as GString;
            l_oThis.IxsIns             = loginInfo.IxsIns.Clone() as GString;
            l_oThis.IxsZmp             = loginInfo.IxsZmp.Clone() as GString;
            l_oThis.LoginAsDBA         = loginInfo.LoginAsDBA;
            l_oThis.DatabaseType       = loginInfo.DatabaseType;
            l_oThis.Database           = loginInfo.Database.Clone() as GString;
            l_oThis.DataSource         = loginInfo.DataSource.Clone() as GString;
            l_oThis.LoginDb            = loginInfo.LoginDb.Clone() as GString;
            l_oThis.SecurePasswordDb   = new GSecureString( loginInfo.SecurePasswordDb ); // ref T32846 - nevím, zda dìlat novou instanci nebo zde nechat jen odkaz na objekt
            l_oThis.Ticket             = loginInfo.Ticket;
            l_oThis.AuthenticationType = loginInfo.AuthenticationType;
            l_oThis.ProviderType       = loginInfo.ProviderType;
            l_oThis.ProviderName       = loginInfo.ProviderName;
            l_oThis.UseUnicode         = loginInfo.UseUnicode;
            l_oThis.IsAzure            = loginInfo.IsAzure;
            l_oThis.PasswordHash       = loginInfo.PasswordHash.Clone() as GString;
            l_oThis.PasswordSalt       = loginInfo.PasswordSalt.Clone() as GString;
            l_oThis.IxsExu             = loginInfo.IxsExu.Clone() as GString;
            l_oThis.LoginToken         = loginInfo.LoginToken.Clone() as GString;
            l_oThis.RequestId          = loginInfo.RequestId.Clone() as GString;
            l_oThis.VerifExu           = loginInfo.VerifExu.Clone() as GInt16;
        } // end method

        #endregion

        #region vlastnosti rozhraní IGLoginInfo

        /// <summary>název databázového profilu</summary>
        public GString Profile {
            get {return m_gsProfile;}
            set {m_gsProfile.DbValue = value.DbValue;}
        } // end property

        /// <summary>login uživatele</summary>
        public GString User {
            get {return m_gsUser;}
            set {m_gsUser.DbValue = value.DbValue;}
        } // end property

        /// <summary>heslo uživatele</summary>
        [JsonProperty("Password")]
        public GSecureString SecurePassword
        {
            [SecurityCritical]
            get { return _SecurePassword; }
            [SecurityCritical]
            set { _SecurePassword = value; }
        }

        ///// <summary>heslo uživatele</summary>
        //[Obsolete("Místo této property by se mìlo využít GSecureString SecurePassword")]
        //public GString Password {
        //    [SecurityCritical]
        //    get
        //    {
        //        if (_SecurePassword == null)
        //            return new GString(200); 
        //        else
        //            return _SecurePassword.Secret;
        //    }
        //    [SecurityCritical]
        //    set
        //    {
        //        if (value == null || value.IsNull)
        //            _SecurePassword = null;
        //        else
        //            _SecurePassword = new GSecureString(value.Value);
        //    }
        //} // end property

        /// <summary>režim pøihlášení (1=funkce, 2=zástup, 3=funkce+zástup, 4=pouze první položka funkce+zástup)</summary>
        public GInt32 Rezim {
            get {return m_gnRezim;}
            set {m_gnRezim.DbValue = value.DbValue;}
        } // end property

        /// <summary>uživatel systému</summary>
        public GString LoginWin {
            get {return m_gsLoginWin;}
            set {m_gsLoginWin.DbValue = value.DbValue;}
        } // end property

        /// <summary>název klientského poèítaèe</summary>
        public GString CompName {
            get {return m_gsCompName;}
            set {m_gsCompName.DbValue = value.DbValue;}
        } // end property

        /// <summary>identifikátor instance</summary>
        public GString IxsIns {
            get {return m_gsIxsIns;}
            set {m_gsIxsIns.DbValue = value.DbValue;}
        } // end property

        /// <summary>identifikátor pùvodce zmìny</summary>
        public GString IxsZmp {
            get {return m_gsIxsZmp;}
            set {m_gsIxsZmp.DbValue = value.DbValue;}
        } // end property

        /// <summary>pøíznak pøihlášení jako uživatel s oprávnìním DBA</summary>
        public bool LoginAsDBA {
            get {return m_bLoginAsDBA;}
            set {m_bLoginAsDBA = value;}
        } // end property

        /// <summary>typ databáze</summary>
        public GCommon.DatabaseType DatabaseType {
            get {return m_eDatabaseType;}
            set {m_eDatabaseType = value;}
        } // end property

        /// <summary>název databáze (hodnota má smysl pouze pro Informix a SQL Server)</summary>
        public GString Database {
            get {return m_gsDatabase;}
            set {m_gsDatabase.DbValue = value.DbValue;}
        } // end property

        /// <summary>název datového zdroje (tj. údaj server pro Informix a SQL Server, anebo údaj SID pro Oracle)</summary>
        public GString DataSource {
            get {return m_gsDataSource;}
            set {m_gsDataSource.DbValue = value.DbValue;}
        } // end property

        /// <summary>jméno pro pøihlášení k databázi</summary>
        /// <remarks>v pøípadì vyplnìní má pøednost pøed loginem uživatele</remarks>
        public GString LoginDb {
            get {return m_gsLoginDb;}
            set {m_gsLoginDb.DbValue = value.DbValue;}
        } // end property

        /// <summary>heslo pro pøihlášení k databázi</summary>
        /// <remarks>v pøípadì vyplnìní má pøednost pøed heslem uživatele</remarks>
        [JsonProperty("PasswordDb")]
        public GSecureString SecurePasswordDb
        {
            [SecurityCritical]
            get { return _SecurePasswordDb; }
            [SecurityCritical]
            set {  _SecurePasswordDb = value;}
        }

        ///// <summary>heslo pro pøihlášení k databázi</summary>
        ///// <remarks>v pøípadì vyplnìní má pøednost pøed heslem uživatele</remarks>
        //[Obsolete("Místo této property by se mìlo využít GSecureString SecurePassword")]
        //public GString PasswordDb {
        //    [SecurityCritical]
        //    get 
        //    {
        //        if (_SecurePasswordDb == null)
        //            return new GString(200); 
        //        else
        //            return _SecurePasswordDb.Secret;
        //    }
        //    [SecurityCritical]
        //    set 
        //    {
        //        if (value == null || value.IsNull)
        //            _SecurePasswordDb = null;
        //        else
        //            _SecurePasswordDb = new GSecureString(value.Value);
        //    }
        //} // end property

        /// <summary>vstupenka do systému</summary>
        public IGTicket Ticket {
            [SecurityCritical]
            get {return m_oTicket;}
            [SecurityCritical]
            set {
                IGTicket l_oTicket = value as IGTicket;
                if(l_oTicket == null) m_oTicket = null;
                else m_oTicket = new GTicket(l_oTicket) as IGTicket;
            } // end method
        } // end property

        /// <summary>typ autentizace do systému</summary>
        public GCommon.AuthenticationType AuthenticationType {
            get {return m_eAuthenticationType;}
            set {m_eAuthenticationType = value;}
        } // end property

        /// <summary>typ poskytovatele databázového pøipojení</summary>
        public GCommon.ProviderType ProviderType {
            get {return m_eProviderType;}
            set {m_eProviderType = value;}
        } // end property
    
        /// <summary>typ poskytovatele databázového pøipojení</summary>
        public GString ProviderName {
            get { return m_gsProviderName; }
            set { m_gsProviderName = value; }
        } // end property

        /// <summary>pøíznak databáze v Unicode</summary>
        public bool UseUnicode {
            get { return m_bUseUnicode; }
            set { m_bUseUnicode = value; }
        } // end property

        /// <summary>pøíznak podpory pro Azure</summary>
        public bool IsAzure {
            get { return m_bIsAzure; }
            set { m_bIsAzure = value; }
        } // end property

        /// <summary>kontrolní souèet hesla</summary>
        public GString PasswordHash {
            [SecurityCritical]
            get { return m_gsPasswordHash; }
            [SecurityCritical]
            set { m_gsPasswordHash.DbValue = value.DbValue; }
        } // end property

        /// <summary>sùl použitá pro výpoèet kontrolního souètu hesla</summary>
        public GString PasswordSalt {
            [SecurityCritical]
            get { return m_gsPasswordSalt; }
            [SecurityCritical]
            set { m_gsPasswordSalt.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor externího uživatele typu veøejnost</summary>
        public GString IxsExu {
            get { return m_gsIxsExu; }
            set { m_gsIxsExu.DbValue = value.DbValue; }
        } // end property

        /// <summary>jednorázový pøihlašovací token</summary>
        public GString LoginToken {
            [SecurityCritical]
            get { return m_gsLoginToken; }
            [SecurityCritical]
            set { m_gsLoginToken.DbValue = value.DbValue; }
        } // end property

        /// <summary>identifikátor požadavku na autentizaci externího uživatele typu veøejnost</summary>
        public GString RequestId {
            get { return m_gsRequestId; }
            set { m_gsRequestId.DbValue = value.DbValue; }
        } // end property

        /// <summary>stupeò verifikace externího uživatele typu veøejnost </summary>
        public GInt16 VerifExu {
            get { return m_gnVerifExu; }
            set { m_gnVerifExu.DbValue = value.DbValue; }
        } // end property

        #endregion

        #region metody rozhraní IGLoginInfo

        /// <summary>serializace hodnot do XML</summary>
        /// <returns>serializovaný XML tvar</returns>
        [
        StrongNameIdentityPermission(SecurityAction.Demand,
            PublicKey="0x0024000004800000940000000602000000240000525341310004000001000100B1C17D23E70B92" +
            "E4075E36FD307F011D116287FB414A5D231AD6AC9355602AC0ACAC3EF2005FE462C0366176C1CDBE" +
            "C8A2E4EB21B49331894F2B682F52B5AAFEB1178B7826E4E51551D193AF629656EC385F8170EFB359" +
            "DA1B3EFBB114660C12DB2309FA6E711225312E35E220BF401010942A4558ABBBD01CB5824641BCFAF0")
        ]
        [SecurityCritical]
        XmlNode IGLoginInfo.ToXml() {
            IGLoginInfo l_oThis = (IGLoginInfo) this;
            XmlDocument l_oDocument = new XmlDocument();
            XmlElement l_oDocumentElement = l_oDocument.CreateElement(m_csSerializationName);
            XmlElement l_oElement = null;
            // název databázového profilu
            l_oElement = l_oDocument.CreateElement(m_csProfile);
            l_oElement.InnerText = l_oThis.Profile.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // login uživatele
            l_oElement = l_oDocument.CreateElement(m_csUser);
            l_oElement.InnerText = GCover.Cover(l_oThis.User.BaseValue);
            l_oDocumentElement.AppendChild(l_oElement);
            
            // heslo uživatele
            l_oElement = l_oDocument.CreateElement(m_csPassword);
            l_oElement.InnerText = _SecurePassword?.Cover() ?? GCover.Cover("");   // ref T32846 

            l_oDocumentElement.AppendChild(l_oElement);
            // režim pøihlášení
            l_oElement = l_oDocument.CreateElement(m_csRezim);
            l_oElement.InnerText = l_oThis.Rezim.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // uživatel systému
            l_oElement = l_oDocument.CreateElement(m_csLoginWin);
            l_oElement.InnerText = l_oThis.LoginWin.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // název klientského poèítaèe
            l_oElement = l_oDocument.CreateElement(m_csCompName);
            l_oElement.InnerText = l_oThis.CompName.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor instance
            l_oElement = l_oDocument.CreateElement(m_csIxsIns);
            l_oElement.InnerText = l_oThis.IxsIns.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor pùvodce zmìny
            l_oElement = l_oDocument.CreateElement(m_csIxsZmp);
            l_oElement.InnerText = l_oThis.IxsZmp.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak pøihlášení jako DBA uživatel
            l_oElement = l_oDocument.CreateElement(m_csLoginAsDBA);
            l_oElement.InnerText = l_oThis.LoginAsDBA.ToString().ToLower();
            l_oDocumentElement.AppendChild(l_oElement);
            // typ databáze
            l_oElement = l_oDocument.CreateElement(m_csDatabaseType);
            l_oElement.InnerText = GCommon.GetDatabaseType(l_oThis.DatabaseType);
            l_oDocumentElement.AppendChild(l_oElement);
            // název databáze
            l_oElement = l_oDocument.CreateElement(m_csDatabase);
            l_oElement.InnerText = l_oThis.Database.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // název datového zdroje
            l_oElement = l_oDocument.CreateElement(m_csDataSource);
            l_oElement.InnerText = l_oThis.DataSource.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // jméno pro pøihlášení k databázi
            l_oElement = l_oDocument.CreateElement(m_csLoginDb);
            l_oElement.InnerText = GCover.Cover(l_oThis.LoginDb.BaseValue);
            l_oDocumentElement.AppendChild(l_oElement);

            // heslo pro pøihlášení k databázi
            l_oElement = l_oDocument.CreateElement(m_csPasswordDb);
            l_oElement.InnerText = _SecurePasswordDb?.Cover() ?? GCover.Cover("");   // ref T32846 
            l_oDocumentElement.AppendChild(l_oElement);

            // vstupenka do systému
            if(l_oThis.Ticket != null) {
                XmlNode l_oNode = l_oDocument.ImportNode(l_oThis.Ticket.ToXml(),true);
                l_oDocumentElement.AppendChild(l_oNode);
            } // end if
            // typ autentizace do systému
            l_oElement = l_oDocument.CreateElement(m_csAuthenticationType);
            l_oElement.InnerText = GCommon.GetAuthenticationType(l_oThis.AuthenticationType);
            l_oDocumentElement.AppendChild(l_oElement);
            // typ poskytovatele databázového pøipojení
            l_oElement = l_oDocument.CreateElement(m_csProviderType);
            l_oElement.InnerText = GCommon.GetProviderType(l_oThis.ProviderType);
            l_oDocumentElement.AppendChild(l_oElement);
            // název poskytovatele databázového pøipojení
            l_oElement = l_oDocument.CreateElement(m_csProviderName);
            l_oElement.InnerText = l_oThis.ProviderName;
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak databáze v Unicode
            l_oElement = l_oDocument.CreateElement(m_csUseUnicode);
            l_oElement.InnerText = l_oThis.UseUnicode.ToString().ToLower();
            l_oDocumentElement.AppendChild(l_oElement);
            // pøíznak podpory pro Azure
            l_oElement = l_oDocument.CreateElement(m_csIsAzure);
            l_oElement.InnerText = l_oThis.IsAzure.ToString().ToLower();
            l_oDocumentElement.AppendChild(l_oElement);
            // kontrolní souèet hesla
            l_oElement = l_oDocument.CreateElement(m_csPasswordHash);
            l_oElement.InnerText = l_oThis.PasswordHash.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // sùl použitá pro výpoèet kontrolního souètu hesla
            l_oElement = l_oDocument.CreateElement(m_csPasswordSalt);
            l_oElement.InnerText = l_oThis.PasswordSalt.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor externího uživatele typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csIxsExu);
            l_oElement.InnerText = l_oThis.IxsExu.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // jednorázový pøihlašovací token
            l_oElement = l_oDocument.CreateElement(m_csLoginToken);
            l_oElement.InnerText = l_oThis.LoginToken.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor požadavku na autentizaci externího uživatele typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csRequestId);
            l_oElement.InnerText = l_oThis.RequestId.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // stupeò verifikace externího uživatele typu veøejnost
            l_oElement = l_oDocument.CreateElement(m_csVerifExu);
            l_oElement.InnerText = l_oThis.VerifExu.BaseValue.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // vrácení serializovaného tvaru
            return l_oDocument.AppendChild(l_oDocumentElement);
        } // end method

        /// <summary>deserializace hodnot z XML</summary>
        /// <param name="node">serializovaný XML tvar</param>
        [
        StrongNameIdentityPermission(SecurityAction.Demand,
            PublicKey="0x0024000004800000940000000602000000240000525341310004000001000100B1C17D23E70B92" +
            "E4075E36FD307F011D116287FB414A5D231AD6AC9355602AC0ACAC3EF2005FE462C0366176C1CDBE" +
            "C8A2E4EB21B49331894F2B682F52B5AAFEB1178B7826E4E51551D193AF629656EC385F8170EFB359" +
            "DA1B3EFBB114660C12DB2309FA6E711225312E35E220BF401010942A4558ABBBD01CB5824641BCFAF0")
        ]
        [SecurityCritical]
        void IGLoginInfo.ParseXml(XmlNode node) {
            IGLoginInfo l_oThis = (IGLoginInfo) this;
            string l_sMissingElement = String.Empty;
            XmlNode l_oNode = null;
            // kontrola parametru
            if(node==null || node is XmlElement==false) throw new GException(23200228,ThisAssembly); // nelze provést deserializaci informací pro pøihlášení k databázi, nesprávný parametr
            if(node.LocalName!=m_csSerializationName || node.NamespaceURI!=String.Empty) throw new GException(23200229,ThisAssembly); // nelze provést deserializaci informací pro pøihlášení k databázi, nesprávná koøenová položka
            // deserializace hodnot
            try {
                do {
                    // název databázového profilu
                    if((l_oNode=node.SelectSingleNode(m_csProfile))==null) {l_sMissingElement=m_csProfile; break;}
                    l_oThis.Profile = new GString(l_oNode.InnerText,l_oThis.Profile.MaxSize);
                    // login uživatele
                    if((l_oNode=node.SelectSingleNode(m_csUser))==null) {l_sMissingElement=m_csUser; break;}
                    l_oThis.User = new GString(GCover.Uncover(l_oNode.InnerText),l_oThis.User.MaxSize);
                    
                    // heslo uživatele
                    if((l_oNode=node.SelectSingleNode(m_csPassword))==null) {l_sMissingElement=m_csPassword; break;}
                    //l_oThis.Password = new GString(GCover.Uncover(l_oNode.InnerText), l_oThis.Password.MaxSize);
                    this._SecurePassword = GSecureString.Uncover(l_oNode.InnerText);  // ref T32846 

                    // režim pøihlášení
                    if ((l_oNode=node.SelectSingleNode(m_csRezim))==null) {l_sMissingElement=m_csRezim; break;}
                    l_oThis.Rezim = GInt32.Parse(l_oNode.InnerText);
                    // uživatel systému
                    if((l_oNode=node.SelectSingleNode(m_csLoginWin))==null) {l_sMissingElement=m_csLoginWin; break;}
                    l_oThis.LoginWin = new GString(l_oNode.InnerText,l_oThis.LoginWin.MaxSize);
                    // název klientského poèítaèe
                    if((l_oNode=node.SelectSingleNode(m_csCompName))==null) {l_sMissingElement=m_csCompName; break;}
                    l_oThis.CompName = new GString(l_oNode.InnerText,l_oThis.CompName.MaxSize);
                    // identifikátor instance
                    if((l_oNode=node.SelectSingleNode(m_csIxsIns))==null) {l_sMissingElement=m_csIxsIns; break;}
                    l_oThis.IxsIns = new GString(l_oNode.InnerText,l_oThis.IxsIns.MaxSize);
                    // identifikátor pùvodce zmìny
                    if((l_oNode=node.SelectSingleNode(m_csIxsZmp))==null) {l_sMissingElement=m_csIxsZmp; break;}
                    l_oThis.IxsZmp = new GString(l_oNode.InnerText,l_oThis.IxsZmp.MaxSize);
                    // pøíznak pøihlášení jako DBA uživatel
                    if((l_oNode=node.SelectSingleNode(m_csLoginAsDBA))==null) {l_sMissingElement=m_csLoginAsDBA; break;}
                    l_oThis.LoginAsDBA = (String.Compare(l_oNode.InnerText,Boolean.TrueString,true) == 0);
                    // typ databáze
                    if((l_oNode=node.SelectSingleNode(m_csDatabaseType))==null) {l_sMissingElement=m_csDatabaseType; break;}
                    l_oThis.DatabaseType = GCommon.GetDatabaseType(l_oNode.InnerText);
                    // název databáze
                    if((l_oNode=node.SelectSingleNode(m_csDatabase))==null) {l_sMissingElement=m_csDatabase; break;}
                    l_oThis.Database = new GString(l_oNode.InnerText,l_oThis.Database.MaxSize);
                    // název datového zdroje
                    if((l_oNode=node.SelectSingleNode(m_csDataSource))==null) {l_sMissingElement=m_csDataSource; break;}
                    l_oThis.DataSource = new GString(l_oNode.InnerText,l_oThis.DataSource.MaxSize);
                    // jméno pro pøihlášení k databázi
                    if((l_oNode=node.SelectSingleNode(m_csLoginDb))==null) {l_sMissingElement=m_csLoginDb; break;}
                    l_oThis.LoginDb = new GString(GCover.Uncover(l_oNode.InnerText),l_oThis.LoginDb.MaxSize);

                    // heslo pro pøihlášení k databázi
                    if((l_oNode=node.SelectSingleNode(m_csPasswordDb))==null) {l_sMissingElement=m_csPasswordDb; break;}
                    //l_oThis.PasswordDb = new GString(GCover.Uncover(l_oNode.InnerText),l_oThis.PasswordDb.MaxSize);
                    this._SecurePasswordDb = GSecureString.Uncover(l_oNode.InnerText);  // ref T32846 

                    // vstupenka do systému
                    if ((l_oNode=node.SelectSingleNode(GTicket.SerializationName)) != null) {
                        IGTicket l_oTicket = new GTicket() as IGTicket;
                        l_oTicket.ParseXml(l_oNode);
                        l_oThis.Ticket = l_oTicket;
                    } // end if
                    // typ autentizace do systému
                    if((l_oNode=node.SelectSingleNode(m_csAuthenticationType))==null) {l_sMissingElement=m_csAuthenticationType; break;}
                    l_oThis.AuthenticationType = GCommon.GetAuthenticationType(l_oNode.InnerText);
                    // typ poskytovatele databázového pøipojení
                    if((l_oNode=node.SelectSingleNode(m_csProviderType))==null) {l_sMissingElement=m_csProviderType; break;}
                    l_oThis.ProviderType = GCommon.GetProviderType(l_oNode.InnerText);
                    // název poskytovatele databázového pøipojení
                    l_oNode = node.SelectSingleNode(m_csProviderName);
                    l_oThis.ProviderName = l_oNode == null ? new GString(l_oThis.ProviderName.MaxSize) : new GString(l_oNode.InnerText,l_oThis.ProviderName.MaxSize);
                    // pøíznak databáze v Unicode
                    if((l_oNode = node.SelectSingleNode(m_csUseUnicode)) != null) l_oThis.UseUnicode = (String.Compare(l_oNode.InnerText,Boolean.TrueString,true) == 0);
                    else l_oThis.UseUnicode = false;
                    // pøíznak podpory pro Azure
                    if((l_oNode = node.SelectSingleNode(m_csIsAzure)) != null) l_oThis.IsAzure = (String.Compare(l_oNode.InnerText,Boolean.TrueString,true) == 0);
                    else l_oThis.IsAzure = false;
                    // kontrolní souèet hesla
                    l_oNode = node.SelectSingleNode(m_csPasswordHash);
                    l_oThis.PasswordHash = l_oNode == null ? new GString(l_oThis.PasswordHash.MaxSize) : new GString(l_oNode.InnerText,l_oThis.PasswordHash.MaxSize);
                    // sùl použitá pro výpoèet kontrolního souètu hesla
                    l_oNode = node.SelectSingleNode(m_csPasswordSalt);
                    l_oThis.PasswordSalt = l_oNode == null ? new GString(l_oThis.PasswordSalt.MaxSize) : new GString(l_oNode.InnerText,l_oThis.PasswordSalt.MaxSize);
                    // identifikátor externího uživatele typu veøejnost
                    l_oNode = node.SelectSingleNode(m_csIxsExu);
                    l_oThis.IxsExu = l_oNode == null ? new GString(l_oThis.IxsExu.MaxSize) : new GString(l_oNode.InnerText,l_oThis.IxsExu.MaxSize);
                    // jednorázový pøihlašovací token
                    l_oNode = node.SelectSingleNode(m_csLoginToken);
                    l_oThis.LoginToken = l_oNode == null ? new GString(l_oThis.LoginToken.MaxSize) : new GString(l_oNode.InnerText,l_oThis.LoginToken.MaxSize);
                    // identifikátor požadavku na autentizaci externího uživatele typu veøejnost
                    l_oNode = node.SelectSingleNode(m_csRequestId);
                    l_oThis.RequestId = l_oNode == null ? new GString(l_oThis.RequestId.MaxSize) : new GString(l_oNode.InnerText,l_oThis.RequestId.MaxSize);
                    // stupeò verifikace externího uživatele typu veøejnost
                    l_oNode = node.SelectSingleNode(m_csVerifExu);
                    l_oThis.VerifExu = l_oNode == null ? new GInt16() : GInt16.Parse(l_oNode.InnerText);
                } while (false);
            } // end try
            catch(Exception e) {
                throw new GException(23200230,ThisAssembly,e); // selhal pokus o deserializaci informací pro pøihlášení k databázi
            } // end catch
            if(l_sMissingElement != String.Empty) throw new GException(23200231,ThisAssembly,l_sMissingElement); // nelze provést deserializaci informací pro pøihlášení k databázi, nenalezena položka {0}
        } // end method

        /// <summary>výmaz všech hodnot</summary>
        void IGLoginInfo.Empty() {
            m_gsProfile.IsNull = true;
            m_gsUser.IsNull = true;

            //m_gsPassword.IsNull = true;
            if (_SecurePassword != null)    // ref T32846 
                _SecurePassword.Dispose();
            _SecurePassword = null;

            m_gnRezim.IsNull = true;
            m_gsLoginWin.IsNull = true;
            m_gsCompName.IsNull = true;
            m_gsIxsIns.IsNull = true;
            m_gsIxsZmp.IsNull = true;
            m_bLoginAsDBA = false;
            m_eDatabaseType = GCommon.DatabaseType.Undefined;
            m_gsDatabase.IsNull = true;
            m_gsDataSource.IsNull = true;
            m_gsLoginDb.IsNull = true;

            //m_gsPasswordDb.IsNull = true;
            if( _SecurePasswordDb != null)  // ref T32846 
                _SecurePasswordDb.Dispose();
            _SecurePasswordDb = null;

            m_oTicket = null;
            m_eAuthenticationType = GCommon.AuthenticationType.Ginis;
            m_eProviderType = GCommon.ProviderType.OleDb;
            m_bUseUnicode = false;
            m_bIsAzure = false;
            m_gsPasswordHash.IsNull = true;
            m_gsPasswordSalt.IsNull = true;
            m_gsIxsExu.IsNull = true;
            m_gsLoginToken.IsNull = true;
            m_gsRequestId.IsNull = true;
            m_gnVerifExu.IsNull = true;
        } // end method

        #endregion

        #region statické metody

        /// <summary>zkopírování informací pro pøihlášení k databázi</summary>
        /// <param name="source">zdrojová instance</param>
        /// <param name="destination">cílová instance</param>
        [
        StrongNameIdentityPermission(SecurityAction.Demand,
            PublicKey = "0x0024000004800000940000000602000000240000525341310004000001000100B1C17D23E70B92" +
            "E4075E36FD307F011D116287FB414A5D231AD6AC9355602AC0ACAC3EF2005FE462C0366176C1CDBE" +
            "C8A2E4EB21B49331894F2B682F52B5AAFEB1178B7826E4E51551D193AF629656EC385F8170EFB359" +
            "DA1B3EFBB114660C12DB2309FA6E711225312E35E220BF401010942A4558ABBBD01CB5824641BCFAF0")
        ]
        [SecurityCritical]
        public static void Copy(IGLoginInfo source,IGLoginInfo destination) {
            try {
                if(destination != null && source != null) {
                    destination.Profile.DbValue = source.Profile.DbValue;
                    destination.User.DbValue = source.User.DbValue;
                    destination.SecurePassword = source.SecurePassword; // nevím zda tady udìlat novou instanci objektu, nebo jen tento odkaz

                    destination.Rezim.DbValue = source.Rezim.DbValue;
                    destination.LoginWin.DbValue = source.LoginWin.DbValue;
                    destination.CompName.DbValue = source.CompName.DbValue;
                    destination.IxsIns.DbValue = source.IxsIns.DbValue;
                    destination.IxsZmp.DbValue = source.IxsZmp.DbValue;
                    destination.LoginAsDBA = source.LoginAsDBA;
                    destination.DatabaseType = source.DatabaseType;
                    destination.Database.DbValue = source.Database.DbValue;
                    destination.DataSource.DbValue = source.DataSource.DbValue;
                    destination.LoginDb.DbValue = source.LoginDb.DbValue;
                    destination.SecurePasswordDb = source.SecurePasswordDb; // nevím zda tady udìlat novou instanci objektu, nebo jen tento odkaz

                    if (source.Ticket != null) destination.Ticket = new GTicket(source.Ticket);
                    destination.AuthenticationType = source.AuthenticationType;
                    destination.ProviderType = source.ProviderType;
                    destination.ProviderName = source.ProviderName;
                    destination.UseUnicode = source.UseUnicode;
                    destination.IsAzure = source.IsAzure;
                    destination.PasswordHash.DbValue = source.PasswordHash.DbValue;
                    destination.PasswordSalt.DbValue = source.PasswordSalt.DbValue;
                    destination.IxsExu.DbValue = source.IxsExu.DbValue;
                    destination.LoginToken.DbValue = source.LoginToken.DbValue;
                    destination.RequestId.DbValue = source.RequestId.DbValue;
                    destination.VerifExu.DbValue = source.VerifExu.DbValue;
                } // end if
            } // end try
            catch(Exception e) {
                throw new GException(23200579,ThisAssembly,e); // selhal pokus o zkopírování informací pro pøihlášení k databázi
            } // end catch
        } // end method

        #endregion

    } // end class

} // end namespace

