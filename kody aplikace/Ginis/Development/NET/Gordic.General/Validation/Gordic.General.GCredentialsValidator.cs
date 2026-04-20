//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GCredentialsValidator.cs </Name>
//    <Description> ověření uživatele vůči doméně           </Description>
//    <Author>      RTOMES                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021      </Copyright>
//    <Created>     2012-09-20                              </Created>
//  </FileHeader>

using System;
using System.DirectoryServices;
//using System.DirectoryServices.AccountManagement;
using System.Reflection;

namespace Gordic.General {

    /// <summary>ověření uživatele vůči doméně</summary>
    public class GCredentialsValidator : IGObject {

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GCredentialsValidator).Assembly; }
        } // end property

        #endregion

        #region veřejné statické metody

        /// <summary>ověření přihlašovacích údajů doménového uživatele</summary>
        /// <param name="domain">doména</param>
        /// <param name="user">uživatelské jméno</param>
        /// <param name="password">heslo</param>
        /// <returns>true v případě, že přihlašovací údaje byly úspěšně ověřeny, jinak false</returns>
        /// <remarks>nejjednodušší a doporučené řešení</remarks>
        public static bool CheckDomainUser(string domain,string user,string password) {
            bool l_bIsAuthentic = false;
            try {
                DirectoryEntry localMachine = new DirectoryEntry("LDAP://" + domain,user,password);
                object nativeObject = localMachine.NativeObject;
                l_bIsAuthentic = true;
            } // end try
            catch(DirectoryServicesCOMException) {
                // výjimky z ověření jsou ignorovány
            } // catch
            catch(Exception e) {
                throw new GException(23200446,ThisAssembly,e); // selhal pokus o ověření přihlašovacích údajů doménového uživatele
            } // end catch
            return l_bIsAuthentic;
        } // end method

        /* 
        
        dočasně zakomentováno kvůli problému s překladem na buildserveru
        
        /// <summary>ověření přihlašovacích údajů doménového uživatele</summary>
        /// <param name="domain">doména</param>
        /// <param name="user">uživatelské jméno</param>
        /// <param name="password">heslo</param>
        /// <returns>true v případě, že přihlašovací údaje byly úspěšně ověřeny, jinak false</returns>
        /// <remarks>funkční pouze, když není účet uzamčen</remarks>
        public static bool CheckDomainUser2(string domain,string user,string password) {
            bool l_bIsAuthentic = false;
            try {
                using(PrincipalContext context = new PrincipalContext(ContextType.Domain,domain)) {
                    l_bIsAuthentic = context.ValidateCredentials(user,password);
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200447,23200446,ThisAssembly,e); // selhal pokus o ověření přihlašovacích údajů doménového uživatele
            } // end catch
            return l_bIsAuthentic;
        } // end method
        */

        #endregion

    } // end class

} // end namespace

