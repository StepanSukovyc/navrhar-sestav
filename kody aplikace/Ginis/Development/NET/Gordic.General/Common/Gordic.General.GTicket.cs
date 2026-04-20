//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GTicket.cs                  </Name>
//      <Description> vstupenka do systému                       </Description>
//      <Author>      Jan Kuttich                                </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//      <Created>     2004-09-13                                 </Created>
//  </FileHeader>

using System;
using System.Xml;
using System.Reflection;
using System.Security;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace Gordic.General {

    /// <summary>vstupenka do systému</summary>
    [Serializable]
    public class GTicket : IGTicket, IGObject {
        
        #region konstanty

        /// <summary>defaultní název pro serializaci</summary>
        private const string m_csSerializationName = "Ticket";

        /// <summary>název elementu pro serializaci licence databáze</summary>
        private const string m_csLicence = "Licence";

        /// <summary>název elementu pro serializaci identifikátoru autorizované relace</summary>
        private const string m_csLogPorCislo = "LogPorCislo";

        /// <summary>název elementu pro serializaci data pøihlášení</summary>
        private const string m_csDatumPrihlaseni = "DatumPrihlaseni";

        /// <summary>formát pro serializaci datumu do stringu</summary>
        private const string m_csDateTimeSerializationFormat = "yyyyMMddHHmmssfff";

        /// <summary>klíè pro serializaci databázového profilu do JWT</summary>
        private const string m_csProfileKey = "pro";

        /// <summary>klíè pro serializaci vstupenky do JWT</summary>
        private const string m_csTicketKey = "tic";

        /// <summary>klíè pro serializaci identifikátoru pùvodce zmìny do JWT</summary>
        private const string m_csIxsZmpKey = "zmp";

        /// <summary>klíè pro serializaci identifikátoru uživatele typu veøejnost JWT</summary>
        private const string m_csIxsExuKey = "exu";

        /// <summary>výchozí doba platnosti pro serializaci do JWT</summary>
        private static readonly TimeSpan m_coDefaultDuration = TimeSpan.FromDays(1);

        #endregion

        #region datové èleny

        /// <summary>licence databáze</summary>
        private GString m_gsLicence = new GString(4);

        /// <summary>identifikátor autorizované relace</summary>
        private GInt32 m_gnLogPorCislo = new GInt32();

        /// <summary>datum pøihlášení</summary>
        private GDateTime m_gdtDatumPrihlaseni = new GDateTime();

        #endregion

        #region vlastnosti

        /// <summary>defaultní název pro serializaci</summary>
        public static string SerializationName {
            get { return m_csSerializationName; }
        } // end property

        /// <summary>pøetypování na instanci rozhraní IGTicket</summary>
        private IGTicket This {
            get { return this; }
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GTicket).Assembly;}
        } // end property
        
        #endregion

        #region konstruktory

        /// <summary>veøejný konstruktor</summary>
        public GTicket() {}

        /// <summary>veøejný konstruktor</summary>
        /// <param name="ticket">rozhraní na vstupenku do systému</param>
        public GTicket(IGTicket ticket) {
            This.Licence         = ticket.Licence.Clone() as GString;
            This.LogPorCislo     = ticket.LogPorCislo.Clone() as GInt32;
            This.DatumPrihlaseni = ticket.DatumPrihlaseni.Clone() as GDateTime;
        } // end method

        #endregion

        #region vlastnosti rozhraní IGTicket

        /// <summary>licence databáze</summary>
        public GString Licence {
            get {return m_gsLicence;}
            set {m_gsLicence.DbValue = value.DbValue;}
        } // end property

        /// <summary>identifikátor autorizované relace</summary>
        public GInt32 LogPorCislo {
            get {return m_gnLogPorCislo;}
            set {m_gnLogPorCislo.DbValue = value.DbValue;}
        } // end property

        /// <summary>datum pøihlášení</summary>
        public GDateTime DatumPrihlaseni {
            get {return m_gdtDatumPrihlaseni;}
            set {m_gdtDatumPrihlaseni.DbValue = value.DbValue;}
        } // end property

        #endregion

        #region metody rozhraní IGTicket
        
        /// <summary>serializace hodnot do XML</summary>
        /// <returns>serializovaný XML tvar</returns>
        XmlNode IGTicket.ToXml() {
            XmlDocument l_oDocument = new XmlDocument();
            XmlElement l_oDocumentElement = l_oDocument.CreateElement(m_csSerializationName);
            XmlElement l_oElement = null;
            // licence databáze
            l_oElement = l_oDocument.CreateElement(m_csLicence);
            l_oElement.InnerText = This.Licence.BaseValue;
            l_oDocumentElement.AppendChild(l_oElement);
            // identifikátor autorizované relace
            l_oElement = l_oDocument.CreateElement(m_csLogPorCislo);
            l_oElement.InnerText = This.LogPorCislo.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // datum pøihlášení
            l_oElement = l_oDocument.CreateElement(m_csDatumPrihlaseni);
            l_oElement.InnerText = This.DatumPrihlaseni.ToString();
            l_oDocumentElement.AppendChild(l_oElement);
            // vrácení serializovaného tvaru
            return l_oDocument.AppendChild(l_oDocumentElement);
        } // end method

        /// <summary>deserializace hodnot z XML</summary>
        /// <param name="node">serializovaný XML tvar</param>
        void IGTicket.ParseXml(XmlNode node) {
            string l_sMissingElement = String.Empty;
            XmlNode l_oNode = null;
            // kontrola parametru
            if(node==null || node is XmlElement==false) throw new GException(23200221,ThisAssembly); // nelze provést deserializaci vstupenky do systému, nesprávný parametr
            if(node.LocalName!=m_csSerializationName || node.NamespaceURI!=String.Empty) throw new GException(23200222,ThisAssembly); // nelze provést deserializaci vstupenky do systému, nesprávná koøenová položka
            // deserializace hodnot
            try {
                do {
                    // licence databáze
                    if((l_oNode=node.SelectSingleNode(m_csLicence))==null || l_oNode.InnerText==String.Empty) {l_sMissingElement=m_csLicence; break;}
                    This.Licence = new GString(l_oNode.InnerText,4);
                    // identifikátor autorizované relace
                    if((l_oNode=node.SelectSingleNode(m_csLogPorCislo))==null) {l_sMissingElement=m_csLogPorCislo; break;}
                    This.LogPorCislo = GInt32.Parse(l_oNode.InnerText);
                    // datum pøihlášení
                    if((l_oNode=node.SelectSingleNode(m_csDatumPrihlaseni))==null) {l_sMissingElement=m_csDatumPrihlaseni; break;}
                    This.DatumPrihlaseni = GDateTime.Parse(l_oNode.InnerText);
                } while(false);
            } // end try
            catch(Exception e) {
                throw new GException(23200223,ThisAssembly,e); // selhal pokus o deserializaci vstupenky do systému
            } // end catch
            if(l_sMissingElement != String.Empty) throw new GException(23200224,ThisAssembly,l_sMissingElement); // nelze provést deserializaci vstupenky do systému, nenalezena položka {0}
        } // end method

        /// <summary>serializace hodnot do øetìzce</summary>
        /// <returns>serializovaný tvar</returns>
        string IGTicket.ToString() {
            string l_sTicket = String.Empty;
            if(This.Licence.IsNullOrEmpty==false && This.LogPorCislo.IsNull==false && This.DatumPrihlaseni.IsNull==false) {
                l_sTicket = String.Format("{0}{1}{2}",This.Licence.BaseValueTrimmed,This.DatumPrihlaseni.ToString(m_csDateTimeSerializationFormat),This.LogPorCislo);
            } // end if
            return l_sTicket;
        } // end method

        /// <summary>deserializace hodnot z øetìzce</summary>
        /// <param name="ticket">serializovaný tvar</param>
        void IGTicket.ParseString(string ticket) {
            try {
                // kontrola vstupního øetìzce
                if(ticket == null) throw new GArgumentNullException(23200225);
                ticket = ticket.Trim();
                if(ticket.Length < (m_csDateTimeSerializationFormat.Length + 5)) throw new GArgumentException(23200226);
                // licence databáze
                This.Licence = new GString(ticket.Substring(0,4),4);
                // datum pøihlášení
                DateTime l_dtDatumPrihlaseni = new DateTime(
                    GInt32.Parse(ticket.Substring(4,4)),
                    GInt32.Parse(ticket.Substring(8,2)),
                    GInt32.Parse(ticket.Substring(10,2)),
                    GInt32.Parse(ticket.Substring(12,2)),
                    GInt32.Parse(ticket.Substring(14,2)),
                    GInt32.Parse(ticket.Substring(16,2)),
                    GInt32.Parse(ticket.Substring(18,m_csDateTimeSerializationFormat.Length-14))
                );
                This.DatumPrihlaseni = new GDateTime(l_dtDatumPrihlaseni);
                // identifikátor autorizované relace
                This.LogPorCislo = GInt32.Parse(ticket.Substring(m_csDateTimeSerializationFormat.Length + 4));
            } // end try
            catch(Exception e) {
                throw new GException(23200227,23200223,ThisAssembly,e); // selhal pokus o deserializaci vstupenky do systému
            } // end catch
        } // end method

        /// <summary>serializace do JWT</summary>
        /// <param name="profile">databázový profil</param>
        /// <param name="user">uživatel</param>
        /// <param name="ixsZmp">identifikátor pùvodce zmìny</param>
        /// <param name="ixsExu">identifikátor uživatele typu veøejnost</param>
        /// <returns>serializovaný tvar</returns>
        [SecurityCritical]
        string IGTicket.ToJwt(string profile,string user,string ixsZmp,string ixsExu) {
            try {
                // kontrola parametrù
                if((profile = profile.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200553,nameof(profile));
                if((user = user.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200554,nameof(user));
                ixsZmp = ixsZmp.NotNullTrimmed();
                ixsExu = ixsExu.NotNullTrimmed();
                string l_sTicket = This.ToString();
                // nastavení vlastností tokenu
                ClaimsIdentity l_oClaimsIdentity = new ClaimsIdentity();
                l_oClaimsIdentity.AddClaim(new Claim(m_csProfileKey,profile,ClaimValueTypes.String));
                l_oClaimsIdentity.AddClaim(new Claim(m_csTicketKey,l_sTicket,ClaimValueTypes.String));
                if(ixsZmp != String.Empty) l_oClaimsIdentity.AddClaim(new Claim(m_csIxsZmpKey,ixsZmp,ClaimValueTypes.String));
                if(ixsExu != String.Empty) l_oClaimsIdentity.AddClaim(new Claim(m_csIxsExuKey,ixsExu,ClaimValueTypes.String));
                var l_oDescriptor = new SecurityTokenDescriptor {
                    Subject = l_oClaimsIdentity,
                    Issuer = user,
                    Expires = DateTime.Now + m_coDefaultDuration,
                    SigningCredentials = new SigningCredentials(GetKey(profile,user,l_sTicket),SecurityAlgorithms.HmacSha256),
                };
                // vytvoøení tokenu
                JwtSecurityTokenHandler l_oHandler = new JwtSecurityTokenHandler();
                SecurityToken l_oToken = l_oHandler.CreateToken(l_oDescriptor);
                return l_oHandler.WriteToken(l_oToken);
            } // end try
            catch(Exception e) {
                throw new GException(23200555,ThisAssembly,e); // selhal pokus o serializaci vstupenky do systému
            } // end catch
        } // end method

        /// <summary>deserializace z JWT</summary>
        /// <param name="token">serializovaný tvar</param>
        /// <param name="profile">databázový profil</param>
        /// <param name="user">uživatel</param>
        /// <param name="ixsZmp">identifikátor pùvodce zmìny</param>
        /// <param name="ixsExu">identifikátor uživatele typu veøejnost</param>
        /// <returns>pøíznak úspìšné deserializace</returns>
        [SecurityCritical]
        bool IGTicket.ParseJwt(string token,out string profile,out string user,out string ixsZmp,out string ixsExu) {
            try {
                if((token = token.NotNullTrimmed()) != String.Empty) {
                    // získání vlastností tokenu
                    string l_sTicket;
                    GetTokenProperties(token,out profile,out user,out l_sTicket,out ixsZmp,out ixsExu);
                    // ovìøení platnosti tokenu
                    if(profile != String.Empty && user != String.Empty && l_sTicket != String.Empty && VerifyToken(token,GetKey(profile,user,l_sTicket))) {
                        This.ParseString(l_sTicket);
                        return true;
                    } // end if
                } // end if
                // inicializace hodnot
                profile = String.Empty;
                user = String.Empty;
                ixsZmp = String.Empty;
                ixsExu = String.Empty;
                m_gsLicence.IsNull = true;
                m_gnLogPorCislo.IsNull = true;
                m_gdtDatumPrihlaseni.IsNull = true;
                return false;
            } // end try
            catch(Exception e) {
                throw new GException(23200556,23200223,ThisAssembly,e); // selhal pokus o deserializaci vstupenky do systému
            } // end catch
        } // end method

        #endregion

        #region veøejné metody

        /// <summary>rozpoznání vstupenky do systému ve formátu JWT</summary>
        /// <param name="input">vstupní hodnota</param>
        /// <returns>pøíznak rozpoznání vstupenky do systému ve formátu JWT</returns>
        [SecurityCritical]
        public static bool IsJwtTicket(string input) {
            try {
                if((input = input.NotNullTrimmed()) == String.Empty) return false;
                else {
                    GetTokenProperties(input,out string profile,out string user,out string ticket,out _,out _);
                    return
                        profile != String.Empty &&
                        user != String.Empty &&
                        ticket != String.Empty &&
                        VerifyToken(input,GetKey(profile,user,ticket),false);
                } // end if
            } // end try
            catch(Exception e) {
                throw new GException(23200643,ThisAssembly,e); // selhal pokus o rozpoznání vstupenky do systému ve formátu JWT
            } // end catch
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>získání symetrického klíèe pro zabezpeèení JWT</summary>
        /// <param name="profile">databázový profil</param>
        /// <param name="user">uživatel</param>
        /// <param name="ticket">vstupenka do systému</param>
        /// <returns>symetrický klíè</returns>
        [SecurityCritical]
        private static SymmetricSecurityKey GetKey(string profile,string user,string ticket) {
            return new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(GWin32.ToGinisCoverString(profile + user + ticket))
            );
        } // end method

        /// <summary>získání vlastností z bezpeènostní známky</summary>
        /// <param name="token">bezpeènostní známka</param>
        /// <param name="profile">databázový profil</param>
        /// <param name="user">uživatel</param>
        /// <param name="ticket">vstupenka do systému</param>
        /// <param name="ixsZmp">identifikátor pùvodce zmìny</param>
        /// <param name="ixsExu">identifikátor uživatele typu veøejnost</param>
        [SecurityCritical]
        private static void GetTokenProperties(string token,out string profile,out string user,out string ticket,out string ixsZmp,out string ixsExu) {
            try {
                JwtSecurityToken l_oToken = new JwtSecurityToken(token);
                if(l_oToken == null) {
                    profile = String.Empty;
                    user = String.Empty;
                    ticket = String.Empty;
                    ixsZmp = String.Empty;
                    ixsExu = String.Empty;
                } else {
                    object l_oValue = null;
                    profile = l_oToken.Payload.TryGetValue(m_csProfileKey,out l_oValue) ? l_oValue.ToString().NotNullTrimmed() : String.Empty;
                    user = l_oToken.Issuer.NotNullTrimmed();
                    ticket = l_oToken.Payload.TryGetValue(m_csTicketKey,out l_oValue) ? l_oValue.ToString().NotNullTrimmed() : String.Empty;
                    ixsZmp = l_oToken.Payload.TryGetValue(m_csIxsZmpKey,out l_oValue) ? l_oValue.ToString().NotNullTrimmed() : String.Empty;
                    ixsExu = l_oToken.Payload.TryGetValue(m_csIxsExuKey,out l_oValue) ? l_oValue.ToString().NotNullTrimmed() : String.Empty;
                } // end if
            } // end try
            catch {
                // všechny výjimky jsou ignorovány
                profile = String.Empty;
                user = String.Empty;
                ticket = String.Empty;
                ixsZmp = String.Empty;
                ixsExu = String.Empty;
            } // end catch
        } // end method

        /// <summary>ovìøení platnosti bezpeènostní známky</summary>
        /// <param name="token">bezpeènostní známka</param>
        /// <param name="key">symetrický klíè</param>
        /// <param name="checkExpiration">pøíznak kontroly expirace</param>
        /// <returns>pøíznak platnosti bezpeènostní známky</returns>
        [SecurityCritical]
        private static bool VerifyToken(string token,SymmetricSecurityKey key,bool checkExpiration = true) {
            try {
                TokenValidationParameters l_oParameters = new TokenValidationParameters() {
                    IssuerSigningKey = key,
                    RequireExpirationTime = checkExpiration,
                    ValidateLifetime = checkExpiration,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = true
                };
                SecurityToken l_oToken = null;
                new JwtSecurityTokenHandler().ValidateToken(
                    token,
                    l_oParameters,
                    out l_oToken
                );
                return l_oToken != null;
            } // end try
            catch {
                return false; // všechny výjimky jsou ignorovány
            } // end catch
        } // end method

        #endregion

    } // end class

} // end namespace

