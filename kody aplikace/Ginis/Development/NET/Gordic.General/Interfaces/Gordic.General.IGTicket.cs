//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.IGTicket.cs                 </Name>
//      <Description> rozhraní na vstupenku do systému           </Description>
//      <Author>      Jan Kuttich                                </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//      <Created>     2004-09-13                                 </Created>
//  </FileHeader>

using System;
using System.Security;
using System.Xml;

namespace Gordic.General {

    /// <summary>rozhraní na vstupenku do systému</summary>
    public interface IGTicket {
        
        #region vlastnosti

        /// <summary>licence databáze</summary>
        GString Licence { get; set; }

        /// <summary>identifikátor autorizované relace</summary>
        GInt32 LogPorCislo { get; set; }

        /// <summary>datum pøihlášení</summary>
        GDateTime DatumPrihlaseni { get; set; }

        #endregion

        #region metody

        /// <summary>serializace hodnot do XML</summary>
        /// <returns>serializovaný XML tvar</returns>
        XmlNode ToXml();

        /// <summary>deserializace hodnot z XML</summary>
        /// <param name="node">serializovaný XML tvar</param>
        void ParseXml(XmlNode node);

        /// <summary>serializace hodnot do øetìzce</summary>
        /// <returns>serializovaný tvar</returns>
        string ToString();

        /// <summary>deserializace hodnot z øetìzce</summary>
        /// <param name="ticket">serializovaný tvar</param>
        void ParseString(string ticket);

        /// <summary>serializace do JWT</summary>
        /// <param name="profile">databázový profil</param>
        /// <param name="user">uživatel</param>
        /// <param name="ixsZmp">identifikátor pùvodce zmìny</param>
        /// <param name="ixsExu">identifikátor uživatele typu veøejnost</param>
        /// <returns>serializovaný tvar</returns>
        [SecurityCritical]
        string ToJwt(string profile,string user,string ixsZmp,string ixsExu);

        /// <summary>deserializace z JWT</summary>
        /// <param name="token">serializovaný tvar</param>
        /// <param name="profile">databázový profil</param>
        /// <param name="user">uživatel</param>
        /// <param name="ixsZmp">identifikátor pùvodce zmìny</param>
        /// <param name="ixsExu">identifikátor uživatele typu veøejnost</param>
        /// <returns>pøíznak úspìšné deserializace</returns>
        [SecurityCritical]
        bool ParseJwt(string token,out string profile,out string user,out string ixsZmp,out string ixsExu);

        #endregion

    } // end interface

} // end namespace

