//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GApplicationRegister.cs  </Name>
//    <Description> podpora práce s registrem spuštìných aplikací </Description>
//    <Author>      Jan Kuttich                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021            </Copyright>
//    <Created>     2004-08-17                                    </Created>
//  </FileHeader>

using System;
using System.Reflection;

namespace Gordic.General {
  
    /// <summary>podpora práce s registrem spuštìných aplikací</summary>
    [System.Security.SecurityCritical]
    public class GApplicationRegister : IGObject {
        
        #region datové èleny

        /// <summary>instance sdíleného registru pro DNP</summary>
        private static volatile GGipr m_oDnpRegister = null;

        /// <summary>instance snímku sdíleného registru pro DNP</summary>
        private static string[] m_asDnpSnapshot = null;

        #endregion

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GApplicationRegister).Assembly;}
        } // end property

        #endregion

        #region veøejné statické metody

        /// <summary>zaregistrování aplikace</summary>
        /// <param name="profile">název databázového profilu</param>
        /// <param name="user">uživatelské jméno</param>
        /// <param name="faze">programová fáze</param>
        /// <param name="logPorCislo">identifikátor autorizované relace</param>
        /// <param name="mainFormHandle">systémový identifikátor hlavního okna aplikace</param>
        /// <returns>instance registru spuštìných aplikací</returns>
        public static GGipr Register(string profile,string user,string faze,int logPorCislo,int mainFormHandle) {
            GGipr l_oGipr = null;
            bool l_bResult = false;
            try {
                // kontrola parametrù
                if(String.IsNullOrWhiteSpace(profile)) throw new GArgumentNullException(23200236,"profile");
                if(String.IsNullOrWhiteSpace(user)) throw new GArgumentNullException(23200237,"user");
                if(String.IsNullOrWhiteSpace(faze)) throw new GArgumentNullException(23200238,"faze");
                // otevøení registru
                l_oGipr = GetRegister(profile,user); 
                if(l_oGipr != null) {
                    // pøidání záznamu do registru
                    l_bResult = l_oGipr.AddItem(
                        String.Format(
                            "{0} {1} {2}",
                            faze.Trim().ToUpper(),
                            logPorCislo,
                            mainFormHandle
                        ),
                        true
                    );
                } // end if
            } // end try
            catch(Exception e) {
                throw new GException(23200239,ThisAssembly,e); // selhal pokus o zaregistrování aplikace do registru spuštìných aplikací
            } // end catch
            if(l_bResult == false) throw new GException(23200512,ThisAssembly); // aplikaci se nepodaøilo zaregistrovat do registru spuštìných aplikací
            return l_oGipr;
        } // end method

        /// <summary>odregistrování aplikace</summary>
        /// <param name="gipr">instance registru spuštìných aplikací</param>
        /// <param name="faze">programová fáze</param>
        /// <param name="logPorCislo">identifikátor autorizované relace</param>
        /// <param name="mainFormHandle">systémový identifikátor hlavního okna aplikace</param>
        public static void Unregister(GGipr gipr,string faze,int logPorCislo,int mainFormHandle) {
            try {
                if(gipr != null && String.IsNullOrWhiteSpace(faze) == false) {
                    // zrušení záznamu z registru
                    gipr.RemoveItem(
                        String.Format(
                            "{0} {1} {2}",
                            faze.Trim().ToUpper(),
                            logPorCislo,
                            mainFormHandle
                        )
                    );
                } // end if
            } // end try
            catch {
                // všechny výjimky jsou ignorovány
            } // end catch
            finally {
                if(gipr != null) gipr.Close();
            } // end finally
        } // end method

        /// <summary>získání pøíznaku existence jiné instance aplikace v registru spuštìných aplikací</summary>
        /// <param name="profile">název databázového profilu</param>
        /// <param name="user">uživatelské jméno</param>
        /// <param name="faze">programová fáze</param>
        /// <returns>true v pøípadì existující registrace jiné instance aplikace, jinak false</returns>
        public static bool IsRegistered(string profile,string user,string faze) {
            GGipr l_oGipr = null;
            try {
                if(String.IsNullOrWhiteSpace(faze) == false) {
                    // otevøení registru
                    l_oGipr = GetRegister(profile,user);
                    if(l_oGipr != null) {
                        // dotaz na existenci položky
                        return l_oGipr.CountItemExists(
                            faze.Trim().ToUpper(),
                            GGipr.QueryItemFilter.Not_Own_Items_Only,
                            out faze
                        ) > 0;
                    } // end if
                } // end if
                return false;
            } // end try
            catch(Exception e) {
                throw new GException(23200513,ThisAssembly,e); // selhal pokus o provedení dotazu do registru spuštìných aplikací
            } // end catch
            finally {
                if(l_oGipr != null) l_oGipr.Close();
            } // end finally
        } // end method

        #endregion

        #region statické metody pro DNP

        /// <summary>otevøení registru spuštìných aplikací</summary>
        /// <param name="registerName">název registru</param>
        public static GGipr Open(string registerName) {
            try {
                lock(typeof(GApplicationRegister)) {
                    if(m_oDnpRegister == null || m_oDnpRegister.RegisterName != registerName) m_oDnpRegister = new GGipr(registerName);
                    return m_oDnpRegister;
                } // end lock;
            } // end try
            catch(Exception e) {
                throw new GException(23200462,ThisAssembly,e); // selhal pokus o otevøení registru spuštìných aplikací
            } // end catch
        } // end method

        /// <summary>uzavøení registru spuštìných aplikací</summary>
        /// <param name="registerName">název registru</param>
        public static void Close(string registerName) {
            try {
                lock(typeof(GApplicationRegister)) {
                    if(m_oDnpRegister != null && m_oDnpRegister.RegisterName == registerName) m_oDnpRegister = null;
                } // end lock
            } // end try
            catch(Exception e) {
                throw new GException(23200463,ThisAssembly,e); // selhal pokus o uzavøení registru spuštìných aplikací
            } // end catch
        } // end method

        /// <summary>pøidání položky do registru spuštìných aplikací</summary>
        /// <param name="registerName">název registru</param>
        /// <param name="itemName">název položky</param>
        /// <param name="unique">pøíznak požadavku na unikátnost názvu položky</param>
        public static void AddItem(string registerName,string itemName,bool unique) {
            try {
                Open(registerName).AddItem(itemName,unique);
            } // end try
            catch(Exception e) {
                throw new GException(23200464,ThisAssembly,e); // selhal pokus o pøidání položky do registru spuštìných aplikací
            } // end catch
        } // end method

        /// <summary>odebrání položky do registru spuštìných aplikací</summary>
        /// <param name="registerName">název registru</param>
        /// <param name="itemName">název položky</param>
        public static void RemoveItem(string registerName,string itemName) {
            try {
                Open(registerName).RemoveItem(itemName);
            } // end try
            catch(Exception e) {
                throw new GException(23200465,ThisAssembly,e); // selhal pokus o odebrání položky z registru spuštìných aplikací
            } // end catch
        } // end method

        /// <summary>zjištìní existence položky v registru spuštìných aplikací</summary>
        /// <param name="registerName">název registru</param>
        /// <param name="itemName">název položky</param>
        /// <param name="filter">filtr záznamù</param>
        /// <returns>true v pøípadì že položka existuje, jinak false</returns>
        public static bool QueryItemExists(string registerName,string itemName,int filter) {
            try {
                return Open(registerName).QueryItemExists(itemName,GetQueryItemFilter(filter));
            } // end try
            catch(Exception e) {
                throw new GException(23200466,ThisAssembly,e); // selhal pokus o zjištìní existence položky v registru spuštìných aplikací
            } // end catch
        } // end method

        /// <summary>získání poètu položek v registru spuštìných aplikací</summary>
        /// <param name="registerName">název registru</param>
        /// <param name="itemNameBegin">zaèátek názvu hledaných položek</param>
        /// <param name="filter">filtr záznamù</param>
        /// <param name="itemName">název první nalezené položky</param>
        /// <returns>poèet nalezených položek</returns>
        public static int CountItemExists(string registerName,string itemNameBegin,int filter,out string itemName) {
            try {
                return Open(registerName).CountItemExists(itemNameBegin,GetQueryItemFilter(filter),out itemName);
            } // end try
            catch(Exception e) {
                throw new GException(23200500,ThisAssembly,e); // selhal pokus o získání poètu položek v registru spuštìných aplikací
            } // end catch
        } // end method

        /// <summary>poøízení snímku sdíleného registru</summary>
        /// <param name="registerName">název registru</param>
        /// <param name="filter">filtr záznamù</param>
        public static void SnapshotTake(string registerName,int filter) {
            try {
                lock(typeof(GApplicationRegister)) {
                    m_asDnpSnapshot = Open(registerName).GetItems(GetQueryItemFilter(filter));
                } // end lock
            } // end try
            catch(Exception e) {
                throw new GException(23200501,ThisAssembly,e); // selhal pokus o poøízení snímku sdíleného registru
            } // end catch
        } // end method

        /// <summary>smazání snímku sdíleného registru</summary>
        public static void SnapshotClose() {
            try {
                lock(typeof(GApplicationRegister)) {
                    m_asDnpSnapshot = null;
                } // end lock
            } // end try
            catch(Exception e) {
                throw new GException(23200502,ThisAssembly,e); // selhal pokus o smazání snímku sdíleného registru
            } // end catch
        } // end method

        /// <summary>zjištìní poètu položek snímku sdíleného registru</summary>
        /// <returns>poèet položek snímku sdíleného registru</returns>
        public static int SnapshotGetCount() {
            try {
                lock(typeof(GApplicationRegister)) {
                    return m_asDnpSnapshot == null ? 0 : m_asDnpSnapshot.Length;
                } // end lock
            } // end try
            catch(Exception e) {
                throw new GException(23200503,ThisAssembly,e); // selhal pokus o zjištìní poètu položek snímku sdíleného registru
            } // end catch
        } // end method

        /// <summary>získání položky snímku sdíleného registru</summary>
        /// <param name="itemIndex">index položky</param>
        /// <returns>položka snímku sdíleného registru</returns>
        public static string SnapshotGetItem(int itemIndex) {
            try {
                lock(typeof(GApplicationRegister)) {
                    return m_asDnpSnapshot == null || m_asDnpSnapshot.Length < itemIndex + 1 ? String.Empty : m_asDnpSnapshot[itemIndex];
                } // end lock
            } // end try
            catch(Exception e) {
                throw new GException(23200504,ThisAssembly,e); // selhal pokus o získání položky snímku sdíleného registru
            } // end catch
        } // end method

        /// <summary>zjištìní poètu položek snímku sdíleného registru</summary>
        /// <param name="itemName">požadovaný název položky</param>
        /// <returns>poèet položek snímku sdíleného registr se zadaným názvem</returns>
        public static int SnapshotGetItemCount(string itemName) {
            try {
                lock(typeof(GApplicationRegister)) {
                    int l_nCount = 0;
                    if(m_asDnpSnapshot != null) {
                        foreach(string l_sItem in m_asDnpSnapshot) {
                            if(l_sItem == itemName) l_nCount++;
                        } // end foreach
                    } // end if
                    return l_nCount;
                } // end lock
            } // end try
            catch(Exception e) {
                throw new GException(23200505,23200503,ThisAssembly,e); // selhal pokus o zjištìní poètu položek snímku sdíleného registru
            } // end catch
        } // end method

        /// <summary>získání filtru záznamù ve formì výètového typu</summary>
        /// <param name="filter">kód filtru záznamù</param>
        /// <returns>filtr záznamù</returns>
        private static GGipr.QueryItemFilter GetQueryItemFilter(int filter) {
            switch(filter) {
                case 1: return GGipr.QueryItemFilter.Own_Items_Only;
                case 2: return GGipr.QueryItemFilter.Not_Own_Items_Only;
                default: return GGipr.QueryItemFilter.All_Items;
            } // end switch
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>otevøení registru spuštìných aplikací</summary>
        /// <param name="profile">název databázového profilu</param>
        /// <param name="user">uživatelské jméno</param>
        /// <returns>instance registru spuštìných aplikací</returns>
        private static GGipr GetRegister(string profile,string user) {
            if(String.IsNullOrWhiteSpace(profile) == false && String.IsNullOrWhiteSpace(user) == false) {
                return new GGipr(String.Format("GINIS {0} {1}",profile.Trim().ToUpper(),user.Trim().ToUpper()));
            } else return null;
        }  // end method

        #endregion

    } // end class

} // end namespace
