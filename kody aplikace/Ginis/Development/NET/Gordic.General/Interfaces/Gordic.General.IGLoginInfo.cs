//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.IGLoginInfo.cs                            </Name>
//      <Description> rozhraní na informace potøebné pro pøihlášení k databázi </Description>
//      <Author>      Jan Kuttich                                              </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021               </Copyright>
//      <Created>     2004-01-30                                               </Created>
//  </FileHeader>

using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Security;
using System.Xml;

namespace Gordic.General {

    /// <summary>rozhraní na informace potøebné pro pøihlášení k databázi</summary>
    public interface IGLoginInfo {
        
        #region vlastnosti

        /// <summary>název databázového profilu</summary>
        GString Profile { get; set; }

        /// <summary>login uživatele</summary>
        GString User { get; set; }

        /// <summary>heslo uživatele</summary>
        [JsonProperty("Password")]
        GSecureString SecurePassword
        {
            [SecurityCritical]
            get;
            [SecurityCritical]
            set; }

        ///// <summary>heslo uživatele</summary>
        //[Obsolete("Je nutné pøejít na property SecurePassword s datovým typem GSecureString")]
        //GString Password {
        //    [SecurityCritical]
        //    get;
        //    [SecurityCritical]
        //    set;
        //} // end property

        /// <summary>režim pøihlášení (1=funkce, 2=zástup, 3=funkce+zástup, 4=pouze první položka funkce+zástup)</summary>
        GInt32 Rezim { get; set; }

        /// <summary>uživatel systému</summary>
        GString LoginWin { get; set; }

        /// <summary>název klientského poèítaèe</summary>
        GString CompName { get; set; }

        /// <summary>identifikátor instance</summary>
        GString IxsIns { get; set; }

        /// <summary>identifikátor pùvodce zmìny</summary>
        GString IxsZmp { get; set; }

        /// <summary>pøíznak pøihlášení jako uživatel s oprávnìním DBA</summary>
        bool LoginAsDBA { get; set; }

        /// <summary>typ databáze</summary>
        GCommon.DatabaseType DatabaseType { get; set; }

        /// <summary>název databáze (hodnota má smysl pouze pro Informix a SQL Server)</summary>
        GString Database { get; set; }

        /// <summary>název datového zdroje (tj. údaj server pro Informix a SQL Server, anebo údaj SID pro Oracle)</summary>
        GString DataSource { get; set; }

        /// <summary>jméno pro pøihlášení k databázi</summary>
        /// <remarks>v pøípadì vyplnìní má pøednost pøed loginem uživatele</remarks>
        GString LoginDb { get; set; }

        /// <summary>heslo pro pøihlášení k databázi</summary>
        /// <remarks>v pøípadì vyplnìní má pøednost pøed heslem uživatele</remarks>
        [JsonProperty("PasswordDb")]
        GSecureString SecurePasswordDb
        {
            [SecurityCritical]
            get;
            [SecurityCritical]
            set;
        }

        ///// <summary>heslo pro pøihlášení k databázi</summary>
        ///// <remarks>v pøípadì vyplnìní má pøednost pøed heslem uživatele</remarks>
        //[Obsolete("Je nutné pøejít property SecurePasswordDb s datovým typem GSecureString")]
        //GString PasswordDb {
        //    [SecurityCritical]
        //    get;
        //    [SecurityCritical]
        //    set;
        //} // end property

        /// <summary>vstupenka do systému</summary>
        IGTicket Ticket {
            [SecurityCritical]
            get;
            [SecurityCritical]
            set;
        } // end property

        /// <summary>typ autentizace do systému</summary>
        GCommon.AuthenticationType AuthenticationType { get; set; }

        /// <summary>typ poskytovatele databázového pøipojení</summary>
        GCommon.ProviderType ProviderType { get; set; }

        /// <summary>Jméno poskytovatele databázového pøipojení</summary>
        GString ProviderName { get; set; }

        /// <summary>pøíznak databáze v Unicode</summary>
        bool UseUnicode { get; set; }

        /// <summary>pøíznak porpory pro Azure</summary>
        bool IsAzure { get; set; }
        
        /// <summary>kontrolní souèet hesla</summary>
        GString PasswordHash {
            [SecurityCritical]
            get;
            [SecurityCritical]
            set;
        } // end property

        /// <summary>sùl použitá pro výpoèet kontrolního souètu hesla</summary>
        GString PasswordSalt {
            [SecurityCritical]
            get;
            [SecurityCritical]
            set;
        } // end property

        /// <summary>identifikátor externího uživatele typu veøejnost</summary>
        GString IxsExu { get; set; }

        /// <summary>jednorázový pøihlašovací token</summary>
        GString LoginToken {
            [SecurityCritical]
            get;
            [SecurityCritical]
            set;
        } // end property

        /// <summary>identifikátor požadavku na autentizaci externího uživatele typu veøejnost</summary>
        GString RequestId { get; set; }

        /// <summary>stupeò verifikace externího uživatele typu veøejnost </summary>
        GInt16 VerifExu { get; set; }

        #endregion

        #region metody

        /// <summary>serializace hodnot do XML</summary>
        /// <returns>serializovaný XML tvar</returns>
        [SecurityCritical]
        XmlNode ToXml();

        /// <summary>deserializace hodnot z XML</summary>
        /// <param name="node">serializovaný XML tvar</param>
        [SecurityCritical]
        void ParseXml(XmlNode node);

        /// <summary>výmaz všech hodnot</summary>
        void Empty();

        #endregion

    } // end interface

} // end namespace

