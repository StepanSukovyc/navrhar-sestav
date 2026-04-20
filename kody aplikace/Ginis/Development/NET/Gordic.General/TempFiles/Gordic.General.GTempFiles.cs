//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GTempFiles.cs                                </Name>
//    <Description> podpora práce s doèasnými soubory a adresáøi                </Description>
//    <Author>      Martin Aliger, Jan Kuttich                                  </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2007-01-26                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Reflection;
using System.Collections.Specialized;

namespace Gordic.General {

    /// <summary>podpora práce s doèasnými soubory a adresáøi</summary>
    public class GTempFiles : IGObject {

        private static readonly IGLogger Log = GLogManager.GetLogger("Gordic.General.GTempFiles");

        #region konstanty

        /// <summary>defaultní pøípona pro doèasné soubory</summary>
        private const string m_csDefaultExtension = ".tmp";

        /// <summary>minimální stáøí automaticky mazaných registrovaných souborù</summary>
        private static readonly TimeSpan m_ctsAutoDeleteFilesMinAge = new TimeSpan(24,0,0);

        /// <summary>poèet automaticky mazaných registrovaných souborù</summary>
        private const int m_cnAutoDeleteFilesCount = 10;

        /// <summary>pøípona registrovaného souboru</summary>
        private const string m_csRegisteredExtension = ".gtempfile";

        #endregion

        #region soukromé èleny

        /// <summary>objekt pro generování pseudo náhodných èísel</summary>
        private static Random m_oRandom = new Random();
        
        /// <summary>náhodné èíslo</summary>
        private static int m_nRandom = m_oRandom.Next();

        /// <summary>cesta k adresáøi pro doèasné soubory</summary>
        private static string m_sTempPath = String.Empty;

        #endregion

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GTempFiles).Assembly;}
        } // end property

        #endregion

        #region veøejné metody pro práci s adresáøi

        /// <summary>získání cesty k adresáøi pro doèasné soubory</summary>
        /// <returns>cesta k adresáøi pro doèasné soubory</returns>
        public static string GetTempDirectory() {
            return (m_sTempPath!=String.Empty && Directory.Exists(m_sTempPath)) ? m_sTempPath : Path.GetTempPath();
        } // end method
        
        /// <summary>nastavení cesty k adresáøi pro doèasné soubory</summary>
        /// <param name="tempPath">cesta k adresáøi pro doèasné soubory</param>
        public static void SetTempDirectory(string tempPath) {
            if(tempPath!=null && Directory.Exists(tempPath)) m_sTempPath = Path.GetFullPath(tempPath);
            else m_sTempPath = String.Empty;
        } // end method

        /// <summary>založení adresáøe pro doèasné soubory</summary>
        /// <returns>cesta k adresáøi pro doèasné soubory</returns>
        public static string CreateTempDirectory() {
            return CreateTempPath(null,null,null,true,false);
        } // end method

        /// <summary>založení adresáøe pro doèasné soubory</summary>
        /// <param name="path">cesta pro založaní adresáøe</param>
        /// <returns>cesta k adresáøi pro doèasné soubory</returns>
        public static string CreateTempDirectory(string path) {
            return CreateTempPath(path,null,null,true,false);
        } // end method

        /// <summary>založení adresáøe pro doèasné soubory</summary>
        /// <param name="path">cesta pro založaní adresáøe</param>
        /// <param name="extension">pøípona názvu adresáøe</param>
        /// <returns>cesta k adresáøi pro doèasné soubory</returns>
        public static string CreateTempDirectory(string path,string extension) {
            return CreateTempPath(path,null,extension,true,false);
        } // end method

        /// <summary>založení adresáøe pro doèasné soubory</summary>
        /// <param name="path">cesta pro založaní adresáøe</param>
        /// <param name="namePrefix">pøedpona názvu adresáøe</param>
        /// <param name="extension">pøípona názvu adresáøe</param>
        /// <returns>cesta k adresáøi pro doèasné soubory</returns>
        public static string CreateTempDirectory(string path,string namePrefix,string extension) {
            return CreateTempPath(path,namePrefix,extension,true,false);
        } // end method

        /// <summary>výmaz adresáøe pro doèasné soubory vèetnì jeho obsahu</summary>
        /// <param name="path">cesta k adresáøi ke zrušení</param>
        /// <remarks>pøi použití této metody buïte hodnì opatrní</remarks>
        static public void DeleteTempDirectory(string path) {
            try {
                Log.Trace($"DeleteTempDirectory {path}");
                if (Directory.Exists(path)) {
                    UnsetReadonlyFlag(path);
                    Directory.Delete(path,true);
                    Log.Debug($"Deleting temp directory {path}");
                } // end if
            } // end try 
            catch(Exception e) {
                Log.Warn(e, $"DeleteTempDirectory {path}");
                System.Diagnostics.Debug.Assert(false,e.Message);
            } // end catch
        } // end method

        /// <summary>kompletní výmaz obsahu adresáøe pro doèasné soubory</summary>
        /// <param name="path">cesta k adresáøi jehož obsah bude vymazán</param>
        /// <remarks>pøi použití této metody buïte hodnì opatrní</remarks>
        static public void DeleteTempDirectoryContent(string path) {
            try {
                Log.Trace($"DeleteTempDirectoryContent {path}");
                if (Directory.Exists(path)) {
                    UnsetReadonlyFlag(path);
                    foreach(string l_sDirectoryPath in Directory.GetDirectories(path)) Directory.Delete(l_sDirectoryPath,true);
                    foreach(string l_sFilePath in Directory.GetFiles(path)) File.Delete(l_sFilePath);
                    Log.Debug($"Deleting temp directory content {path}");
                } // end if
            } // end try 
            catch(Exception e) {
                System.Diagnostics.Debug.Assert(false,e.Message);
            } // end catch
        } // end method

        #endregion

        #region veøejné metody pro práci se soubory

        /// <summary>založení doèasného souboru</summary>
        /// <returns>cesta k doèasnému souboru</returns>
        /// <remarks>v pøípadì úspìšného dokonèení bude fyzicky vytvoøen nový soubor s nulovou délkou</remarks>
        public static string CreateTempFile() {
            return CreateTempPath(null,null,null,false,false);
        } // end method

        /// <summary>založení doèasného souboru</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        /// <returns>cesta k doèasnému souboru</returns>
        /// <remarks>v pøípadì úspìšného dokonèení bude fyzicky vytvoøen nový soubor s nulovou délkou</remarks>
        public static string CreateTempFile(string path) {
            return CreateTempPath(path,null,null,false,false);
        } // end method

        /// <summary>založení doèasného souboru</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        /// <param name="extension">pøípona doèasného souboru</param>
        /// <returns>cesta k doèasnému souboru</returns>
        /// <remarks>v pøípadì úspìšného dokonèení bude fyzicky vytvoøen nový soubor s nulovou délkou</remarks>
        public static string CreateTempFile(string path,string extension) {
            return CreateTempPath(path,null,extension,false,false);
        } // end method

        /// <summary>založení doèasného souboru</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        /// <param name="namePrefix">pøedpona názvu doèasného souboru</param>
        /// <param name="extension">pøípona doèasného souboru</param>
        /// <returns>cesta k doèasnému souboru</returns>
        /// <remarks>v pøípadì úspìšného dokonèení bude fyzicky vytvoøen nový soubor s nulovou délkou</remarks>
        public static string CreateTempFile(string path,string namePrefix,string extension) {
            return CreateTempPath(path,namePrefix,extension,false,false);
        } // end method

        /// <summary>zrušení doèasného souboru</summary>
        /// <param name="path">cesta k doèasnému souboru pro zrušení</param>
        public static void DeleteTempFile(string path) {
            DeleteTempFile(path,false);
        } // end method

        /// <summary>zrušení doèasného souboru</summary>
        /// <param name="path">cesta k doèasnému souboru pro zrušení</param>
        /// <param name="registerIfCannotDelete">pøíznak zaregistrování doèasného souboru pro pozdìjší zrušení v pøípadì, že soubor nelze vymazat</param>
        public static void DeleteTempFile(string path,bool registerIfCannotDelete) {
            try {
                Log.Trace($"DeleteTempFile {path}");
                if (File.Exists(path)) {
                    UnsetReadonlyFlag(path);
                    File.Delete(path);
                    Log.Debug($"Deleted temp {path}");
                } // end if
            } // end try 
            catch(Exception e) {
                Log.Warn(e, $"DeleteTempFile {path}");
                if (registerIfCannotDelete) RegisterTempFile(path,false);
                else System.Diagnostics.Debug.Assert(false, e.Message);
            } // end catch
        } // end method

        #endregion

        #region veøejné metody pro práci s registrovanými soubory

        /// <summary>založení registrovaného doèasného souboru</summary>
        /// <returns>cesta k doèasnému souboru</returns>
        /// <remarks>
        ///     <para>v pøípadì úspìšného dokonèení bude fyzicky vytvoøen nový soubor s nulovou délkou a souèasnì ještì druhý se stejným názvem a pøíponou .gtempfile sloužící jako informace o požadavku na jeho pozdìjší smazání</para>
        ///     <para>metoda se kromì založení nového souboru pokusí rovnìž vymazat deset již registrovaných souborù starších než 24 hodin</para>
        /// </remarks>
        public static string CreateRegisteredTempFile() {
            return CreateTempPath(null,null,null,false,true);
        } // end method

        /// <summary>založení registrovaného doèasného souboru</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        /// <returns>cesta k doèasnému souboru</returns>
        /// <remarks>
        ///     <para>v pøípadì úspìšného dokonèení bude fyzicky vytvoøen nový soubor s nulovou délkou a souèasnì ještì druhý se stejným názvem a pøíponou .gtempfile sloužící jako informace o požadavku na jeho pozdìjší smazání</para>
        ///     <para>metoda se kromì založení nového souboru pokusí rovnìž vymazat deset již registrovaných souborù starších než 24 hodin</para>
        /// </remarks>
        public static string CreateRegisteredTempFile(string path) {
            return CreateTempPath(path,null,null,false,true);
        } // end method

        /// <summary>založení registrovaného doèasného souboru</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        /// <param name="extension">pøípona doèasného souboru</param>
        /// <returns>cesta k doèasnému souboru</returns>
        /// <remarks>
        ///     <para>v pøípadì úspìšného dokonèení bude fyzicky vytvoøen nový soubor s nulovou délkou a souèasnì ještì druhý se stejným názvem a pøíponou .gtempfile sloužící jako informace o požadavku na jeho pozdìjší smazání</para>
        ///     <para>metoda se kromì založení nového souboru pokusí rovnìž vymazat deset již registrovaných souborù starších než 24 hodin</para>
        /// </remarks>
        public static string CreateRegisteredTempFile(string path,string extension) {
            return CreateTempPath(path,null,extension,false,true);
        } // end method

        /// <summary>založení registrovaného doèasného souboru</summary>
        /// <param name="path">cesta pro založení doèasného souboru</param>
        /// <param name="namePrefix">pøedpona názvu doèasného souboru</param>
        /// <param name="extension">pøípona doèasného souboru</param>
        /// <returns>cesta k doèasnému souboru</returns>
        /// <remarks>
        ///     <para>v pøípadì úspìšného dokonèení bude fyzicky vytvoøen nový soubor s nulovou délkou a souèasnì ještì druhý se stejným názvem a pøíponou .gtempfile sloužící jako informace o požadavku na jeho pozdìjší smazání</para>
        ///     <para>metoda se kromì založení nového souboru pokusí rovnìž vymazat deset již registrovaných souborù starších než 24 hodin</para>
        /// </remarks>
        public static string CreateRegisteredTempFile(string path,string namePrefix,string extension) {
            return CreateTempPath(path,namePrefix,extension,false,true);
        } // end method

        /// <summary>zrušení registrovaného souboru</summary>
        /// <param name="path">cesta k registrovanému souboru</param>
        public static void DeleteRegisteredTempFile(string path) {
            try {
                if(File.Exists(path)) {
                    UnsetReadonlyFlag(path);
                    File.Delete(path);
                    Log.Debug($"Deleted registered temp {path}");
                } // end if
                UnregisterTempFile(path);
            } // end try 
            catch(IOException e) {
                Log.Debug(e, $"file still in use {path}");
                // soubor je stále používán, a proto ho nelze smazat
            } // end catch
            catch (Exception e) {
                Log.Warn(e, $"DeleteRegisteredTempFile {path}");
                System.Diagnostics.Debug.Assert(false,e.Message);
            } // end catch
        } // end method

        /// <summary>zrušení všech registrovaných souborù</summary>
        public static void DeleteRegisteredTempFiles() {
            DeleteRegisteredTempFiles(TimeSpan.Zero,UInt16.MaxValue);
        } // end method

        /// <summary>zrušení registrovaných souborù</summary>
        /// <param name="minAge">minimální stáøí souboru</param>
        /// <param name="maxFiles">maximální poèet rušených souborù</param>
        /// <param name="path">cesta k adresáøi s registrovanými soubory</param>
        public static void DeleteRegisteredTempFiles(TimeSpan minAge,ushort maxFiles,string path = null) {
            try {
                path = path == null ? String.Empty : path.Trim();
                if(path == String.Empty || Directory.Exists(path) == false) path = GetTempDirectory();
                StringCollection l_asFilesToDelete = GetRegisteredTempFiles(minAge,maxFiles,path);
                if (l_asFilesToDelete != null && l_asFilesToDelete.Count > 0) {
                    Log.Debug($"Deleting old temp {l_asFilesToDelete.Count} files");
                    foreach (string l_sFileToDelete in l_asFilesToDelete) DeleteRegisteredTempFile(l_sFileToDelete);
                } // end if
            } // end try 
            catch(Exception e) {
                System.Diagnostics.Debug.Assert(false,e.Message);
            } // end catch
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>založení doèasného souboru nebo adresáøe</summary>
        /// <param name="path">cesta pro založení</param>
        /// <param name="namePrefix">pøedpona názvu </param>
        /// <param name="extension">pøípona názvu</param>
        /// <param name="directory">pøíznak adresáøe</param>
        /// <param name="registered">pøíznak registrace</param>
        /// <returns>cesta k vytvoøenému souboru nebo adresáøi</returns>
        private static string CreateTempPath(string path,string namePrefix,string extension,bool directory,bool registered) {
            string l_sTempPath = String.Empty;
            int l_nAttempts = 0;
            // kontrola vstupních argumentù 
            path = (path == null) ? String.Empty : path.Trim();
            if(path == String.Empty) path = GetTempDirectory();
            namePrefix = (namePrefix == null) ? String.Empty : namePrefix.Trim();
            extension = (extension == null) ? String.Empty : extension.Trim();
            if(extension == String.Empty) extension = m_csDefaultExtension;
            if(extension[0] != '.') extension = '.' + extension;
            // vygenerování náhodného názvu
            lock(typeof(GTempFiles)) {
                try {
                    for(l_nAttempts = 10000; l_nAttempts > 0; l_nAttempts--) {
                        l_sTempPath = Path.Combine(path,String.Format("{0}{1:X}{2}",namePrefix,(DateTime.Now.Ticks + m_nRandom) % 1000000000,extension));
                        m_nRandom = m_oRandom.Next();
                        if(Directory.Exists(l_sTempPath) == false && File.Exists(l_sTempPath) == false) {
                            if(directory) {
                                // založení adresáøe pro doèasné soubory
                                Directory.CreateDirectory(l_sTempPath); 
                                break;
                            } else {
                                // založení doèasného souboru
                                using(FileStream l_oStream = File.Create(l_sTempPath)) { }
                                break;
                            } // end if
                        } // end if
                    } // end for
                    if(l_nAttempts == 0) {
                        if(directory) throw new GException(23200121,ThisAssembly,path); // nepodaøilo se založit adresáø pro doèasné soubory v cestì {0}
                        else throw new GException(23200122,ThisAssembly,path); // nepodaøilo se založit doèasný soubor v adresáøi {0}
                    } // end if
                    l_sTempPath = Path.GetFullPath(l_sTempPath);
                    Log.Debug($"Temp {(directory?"dir":"file")} created {l_sTempPath}");
                    if (directory == false) {
                        if(registered) RegisterTempFile(l_sTempPath);
                        DeleteRegisteredTempFiles(m_ctsAutoDeleteFilesMinAge,m_cnAutoDeleteFilesCount,path); // automatické odmazání starých souborù
                    } // end if
                } // end try
                catch(UnauthorizedAccessException e) {
                    if(directory) throw new GException(23200138,ThisAssembly,e,l_sTempPath); // z dùvodu nedostateèného oprávnìní se nepodaøilo založit adresáø pro doèasné soubory v cestì {0}
                    else throw new GException(23200139,ThisAssembly,e,l_sTempPath); // z dùvodu nedostateèného oprávnìní se nepodaøilo založit doèasný soubor v cestì {0}
                } // end catch
                catch(Exception e) {
                    if(e is GException == false) {
                        if(directory) e = new GException(23200123,ThisAssembly,e,l_sTempPath); // pøi pokusu o založení adresáøe pro doèasné soubory {0} došlo k neoèekávané výjimce
                        else e = new GException(23200124,ThisAssembly,e,l_sTempPath); // pøi pokusu o založení doèasného souboru {0} došlo k neoèekávané výjimce
                    } // end if
                    throw e;
                } // end catch
            } // end lock
            return l_sTempPath;
        } // end method

        /// <summary>rekurzivní shození atributu pouze pro ètení na všech souborech a podadresáøích v cestì</summary>
        /// <param name="path">cesta</param>
        private static void UnsetReadonlyFlag(string path) {
            // shození readonly atributu na specifikované cestì
            FileAttributes l_nAttributes = File.GetAttributes(path);
            if((l_nAttributes & FileAttributes.ReadOnly) == FileAttributes.ReadOnly) File.SetAttributes(path,l_nAttributes & (~FileAttributes.ReadOnly));
            if((l_nAttributes & FileAttributes.Directory) == FileAttributes.Directory) {
                // shození readonly atributu na všech obsažených souborech
                foreach(string l_sFilePath in Directory.GetFiles(path)) {
                    l_nAttributes = File.GetAttributes(l_sFilePath);
                    if((l_nAttributes & FileAttributes.ReadOnly) == FileAttributes.ReadOnly) File.SetAttributes(l_sFilePath,l_nAttributes & (~FileAttributes.ReadOnly));
                } // end foreach
                // shození readonly atributu na všech podadresáøich
                foreach(string l_sDirectoryPath in Directory.GetDirectories(path)) UnsetReadonlyFlag(l_sDirectoryPath);
            } // end if
        } // end method

        /// <summary>zaregistrování doèasného souboru</summary>
        /// <param name="path">cesta k doèasnému souboru</param>
        private static void RegisterTempFile(string path) {
            RegisterTempFile(path,true);
        } // end method

        /// <summary>zaregistrování doèasného souboru</summary>
        /// <param name="path">cesta k doèasnému souboru</param>
        /// <param name="throwException">pøíznak vyhození výjimky v pøípadì selhání registrace</param>
        private static void RegisterTempFile(string path,bool throwException) {
            try {
                Log.Debug($"Temp file register {path}");
                string l_sPath = path + m_csRegisteredExtension;
                if(File.Exists(l_sPath) == false) {
                    using(FileStream l_oStream = File.Create(l_sPath)) { }
                } // end if
            } // end try
            catch(Exception e) {
                Log.Warn(e, "Temp register");
                if (throwException) {
                    DeleteTempFile(path);
                    throw new GException(23200140,ThisAssembly,e,path); // selhalo zaregistrování doèasného souboru {0}
                } else System.Diagnostics.Debug.Assert(false,e.Message);
            } // end catch
        } // end method

        /// <summary>zrušení registrace doèasného souboru</summary>
        /// <param name="path">cesta k doèasnému souboru</param>
        private static void UnregisterTempFile(string path) {
            Log.Debug($"Temp file unregister {path}");
            string l_sPath = path + m_csRegisteredExtension;
            if(File.Exists(l_sPath) && new FileInfo(l_sPath).Length == 0) {
                UnsetReadonlyFlag(l_sPath);
                File.Delete(l_sPath);
            } // end if
        } // end method

        /// <summary>získání seznamu registrovaných doèasných souborù</summary>
        /// <param name="minAge">minimální stáøí doèasného souboru</param>
        /// <param name="maxItems">maximální poèet položek seznamu</param>
        /// <param name="path">cesta k adresáøi s doèasnými soubory</param>
        /// <returns>seznam registrovaných doèasných souborù</returns>
        private static StringCollection GetRegisteredTempFiles(TimeSpan minAge,ushort maxItems,string path) {
            DateTime l_dtMaxFileDate = DateTime.Now - minAge;
            StringCollection l_asFiles = null;
            foreach(FileInfo l_oFileInfo in new DirectoryInfo(path).GetFiles("*" + m_csRegisteredExtension)) {
                if(l_oFileInfo.Length == 0 && l_oFileInfo.CreationTime < l_dtMaxFileDate) {
                    if(l_asFiles == null) l_asFiles = new StringCollection();
                    l_asFiles.Add(l_oFileInfo.FullName.Substring(0,l_oFileInfo.FullName.Length - m_csRegisteredExtension.Length));
                    if(l_asFiles.Count == maxItems) break;
                } // end if
            } // end foreach
            return l_asFiles;
        } // end method

        #endregion

    } // end class

} // end namespace
