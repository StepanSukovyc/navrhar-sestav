//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//      <Name>        Gordic.General.GDpApi.cs           </Name>
//      <Description> kódování a dekódování pomocí DPAPI </Description>
//      <Author>      Jan Kuttich                        </Author>
//      <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//      <Created>     2017-04-12                         </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Security;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Reflection;
using System.Text;

namespace Gordic.General {

    /// <summary>kódování a dekódování pomocí DPAPI</summary>
    [ StrongNameIdentityPermission(
        SecurityAction.Demand,
        PublicKey = "0x0024000004800000940000000602000000240000525341310004000001000100B1C17D23E70B92" +
                    "E4075E36FD307F011D116287FB414A5D231AD6AC9355602AC0ACAC3EF2005FE462C0366176C1CDBE" +
                    "C8A2E4EB21B49331894F2B682F52B5AAFEB1178B7826E4E51551D193AF629656EC385F8170EFB359" +
                    "DA1B3EFBB114660C12DB2309FA6E711225312E35E220BF401010942A4558ABBBD01CB5824641BCFAF0"
    ) ]
    [SecurityCritical]
    public class GDpApi : IGObject {

        #region datové èleny
        
        /// <summary>výchozí rozšiøující klíè</summary>
        private static SecureString m_oDefaultExtendedKey = null;
        
        #endregion

        #region vlastnosti

        /// <summary>výchozí rozšiøující klíè</summary>
        private static SecureString DefaultExtendedKey {
            get {
                if(m_oDefaultExtendedKey == null) m_oDefaultExtendedKey = GetDefaultExtendedKey();
                return m_oDefaultExtendedKey;
            } // end method
        } // end property

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GDpApi).Assembly;}
        } // end property

        #endregion

        #region veøejné metody pro práci s øetìzci

        /// <summary>zakódování</summary>
        /// <param name="data">data k zakódování</param>
        /// <returns>zakódovaná data</returns>
        public static string Protect(string data) {
            return Protect(data,null,DataProtectionScope.LocalMachine);
        } // end method

        /// <summary>zakódování</summary>
        /// <param name="data">data k zakódování</param>
        /// <param name="extendedKey">rozšiøující klíè</param>
        /// <returns>zakódovaná data</returns>
        public static string Protect(string data,string extendedKey) {
            return Protect(data,extendedKey,DataProtectionScope.LocalMachine);
        } // end method

        /// <summary>zakódování</summary>
        /// <param name="data">data k zakódování</param>
        /// <param name="scope">rozsah platnosti</param>
        /// <returns>zakódovaná data</returns>
        public static string Protect(string data,DataProtectionScope scope) {
            return Protect(data,null,scope);
        } // end method

        /// <summary>zakódování</summary>
        /// <param name="data">data k zakódování</param>
        /// <param name="extendedKey">rozšiøující klíè</param>
        /// <param name="scope">rozsah platnosti</param>
        /// <returns>zakódovaná data</returns>
        public static string Protect(string data,string extendedKey,DataProtectionScope scope) {
            try {
                if(String.IsNullOrWhiteSpace(data)) return String.Empty;
                return Convert.ToBase64String(
                    ProtectedData.Protect(
                        Encoding.UTF8.GetBytes(data),
                        Encoding.UTF8.GetBytes(String.IsNullOrEmpty(extendedKey) ? DefaultExtendedKey.ToString() : extendedKey),
                        scope)
                );
            } // end try
            catch(Exception e) {
                throw new GException(23200542,ThisAssembly,e); // selhal pokus o zakódování dat
            } // end catch
        } // end method

        /// <summary>dekódování</summary>
        /// <param name="data">data k dekódování</param>
        /// <returns>rozkódovaná data</returns>
        public static string Unprotect(string data) {
            return Unprotect(data,null,DataProtectionScope.LocalMachine);
        } // end method

        /// <summary>dekódování</summary>
        /// <param name="data">data k dekódování</param>
        /// <param name="extendedKey">rozšiøující klíè</param>
        /// <returns>rozkódovaná data</returns>
        public static string Unprotect(string data,string extendedKey) {
            return Unprotect(data,extendedKey,DataProtectionScope.LocalMachine);
        } // end method

        /// <summary>dekódování</summary>
        /// <param name="data">data k dekódování</param>
        /// <param name="scope">rozsah platnosti</param>
        /// <returns>rozkódovaná data</returns>
        public static string Unprotect(string data,DataProtectionScope scope) {
            return Unprotect(data,null,scope);
        } // end method

        /// <summary>dekódování</summary>
        /// <param name="data">data k dekódování</param>
        /// <param name="extendedKey">rozšiøující klíè</param>
        /// <param name="scope">rozsah platnosti</param>
        /// <returns>rozkódovaná data</returns>
        public static string Unprotect(string data,string extendedKey,DataProtectionScope scope) {
            try {
                if(String.IsNullOrWhiteSpace(data)) return String.Empty;
                return Encoding.UTF8.GetString(
                    ProtectedData.Unprotect(
                        Convert.FromBase64String(data),
                        Encoding.UTF8.GetBytes(String.IsNullOrEmpty(extendedKey) ? DefaultExtendedKey.ToString() : extendedKey),
                        scope)
                );
            } // end try
            catch(Exception e) {
                throw new GException(23200543,ThisAssembly,e); // selhal pokus o dekódování dat
            } // end catch
        } // end method

        #endregion

        #region veøejné metody pro práci se soubory

        /// <summary>zápis do zakódovaného souboru</summary>
        /// <param name="filePath">cesta k souboru</param>
        /// <param name="data">data k zakódování</param>
        public static void WriteProtectedFile(string filePath,string data) {
            WriteProtectedFile(filePath,data,null,DataProtectionScope.LocalMachine);
        } // end method

        /// <summary>zápis do zakódovaného souboru</summary>
        /// <param name="filePath">cesta k souboru</param>
        /// <param name="data">data k zakódování</param>
        /// <param name="extendedKey">rozšiøující klíè</param>
        public static void WriteProtectedFile(string filePath,string data,string extendedKey) {
            WriteProtectedFile(filePath,data,extendedKey,DataProtectionScope.LocalMachine);
        } // end method

        /// <summary>zápis do zakódovaného souboru</summary>
        /// <param name="filePath">cesta k souboru</param>
        /// <param name="data">data k zakódování</param>
        /// <param name="scope">rozsah platnosti</param>
        public static void WriteProtectedFile(string filePath,string data,DataProtectionScope scope) {
            WriteProtectedFile(filePath,data,null,scope);
        } // end method

        /// <summary>zápis do zakódovaného souboru</summary>
        /// <param name="filePath">cesta k souboru</param>
        /// <param name="data">data k zakódování</param>
        /// <param name="extendedKey">rozšiøující klíè</param>
        /// <param name="scope">rozsah platnosti</param>
        public static void WriteProtectedFile(string filePath,string data,string extendedKey,DataProtectionScope scope) {
            try {
                GIOSupport.BytesToFile(
                    String.IsNullOrWhiteSpace(data) ? new byte[0] : ProtectedData.Protect(
                        Encoding.UTF8.GetBytes(data),
                        Encoding.UTF8.GetBytes(String.IsNullOrEmpty(extendedKey) ? DefaultExtendedKey.ToString() : extendedKey),
                        scope
                    ),
                    filePath
                );
            } // end try
            catch(Exception e) {
                throw new GException(23200545,23200542,ThisAssembly,e); // selhal pokus o zakódování dat
            } // end catch
        } // end method

        /// <summary>ètení zakódovaného souboru</summary>
        /// <param name="filePath">cesta k souboru</param>
        /// <returns>rozkódovaná data</returns>
        public static string ReadProtectedFile(string filePath) {
            return ReadProtectedFile(filePath,null,DataProtectionScope.LocalMachine);
        } // end method

        /// <summary>ètení zakódovaného souboru</summary>
        /// <param name="filePath">cesta k souboru</param>
        /// <param name="extendedKey">rozšiøující klíè</param>
        /// <returns>rozkódovaná data</returns>
        public static string ReadProtectedFile(string filePath,string extendedKey) {
            return ReadProtectedFile(filePath,extendedKey,DataProtectionScope.LocalMachine);
        } // end method

        /// <summary>ètení zakódovaného souboru</summary>
        /// <param name="filePath">cesta k souboru</param>
        /// <param name="scope">rozsah platnosti</param>
        /// <returns>rozkódovaná data</returns>
        public static string ReadProtectedFile(string filePath,DataProtectionScope scope) {
            return ReadProtectedFile(filePath,null,scope);
        } // end method

        /// <summary>ètení zakódovaného souboru</summary>
        /// <param name="filePath">cesta k souboru</param>
        /// <param name="extendedKey">rozšiøující klíè</param>
        /// <param name="scope">rozsah platnosti</param>
        /// <returns>rozkódovaná data</returns>
        public static string ReadProtectedFile(string filePath,string extendedKey,DataProtectionScope scope) {
            try {
                if(String.IsNullOrWhiteSpace(filePath) || File.Exists(filePath) == false || new FileInfo(filePath).Length == 0) return String.Empty;
                return Encoding.UTF8.GetString(
                    ProtectedData.Unprotect(
                        GIOSupport.FileToBytes(filePath),
                        Encoding.UTF8.GetBytes(String.IsNullOrEmpty(extendedKey) ? DefaultExtendedKey.ToString() : extendedKey),
                        scope
                    )
                );
            } // end try
            catch(Exception e) {
                throw new GException(23200546,23200543,ThisAssembly,e); // selhal pokus o dekódování dat
            } // end catch
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>získání výchozího rozšiøujícího klíèe</summary>
        /// <returns>výchozí rozšiøující klíè</returns>
        private static SecureString GetDefaultExtendedKey() {
            try {
                SecureString l_oExtendedKey = new SecureString();
                string l_sExtendedKey = GWin32.ToGinisCoverString(Environment.MachineName);
                foreach(char c in l_sExtendedKey) l_oExtendedKey.AppendChar(c);
                return l_oExtendedKey;
            } // end try
            catch(Exception e) {
                throw new GException(23200544,ThisAssembly,e); // selhal pokus o získání rozšiøujícího klíèe
            } // end catch
        } // end method

        #endregion

    } // end class

} // end namespace

