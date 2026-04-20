//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GIOSupport.cs       </Name>
//    <Description> podpora pro práci se soubory       </Description>
//    <Author>      Jiøí Dvoøák, Jan Kuttich           </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021 </Copyright>
//    <Created>     2007-11-12                         </Created>
//  </FileHeader>

using System;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using System.Text;
using System.Security.Cryptography;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Runtime.InteropServices;
using Microsoft.Win32.SafeHandles;
using System.Security;
using System.Security.AccessControl;
using System.Security.Principal;

namespace Gordic.General {

    /// <summary>podpora pro práci se soubory</summary>
    public class GIOSupport : IGObject {

        #region externí funkce

        /// <summary>win32 funkce pro vytvoøení nebo otevøení souboru</summary>
        /// <param name="fileName">cesta k souboru</param>
        /// <param name="desiredAccess">poadovanı pøístup</param>
        /// <param name="shareMode">reim sdílení</param>
        /// <param name="securityAttributes">atributy zabezpeèení</param>
        /// <param name="creationDisposition">doplòkové volby vytvoøení</param>
        /// <param name="flagsAndAttributes">doplòkové atributy</param>
        /// <param name="templateFile">šablona</param>
        /// <returns>handle souboru</returns>
        [DllImport("kernel32.dll",SetLastError = true,CharSet = CharSet.Auto)]
        [SecurityCritical]
        private static extern SafeFileHandle CreateFile(
            string fileName,
            [MarshalAs(UnmanagedType.U4)]
            FileAccess desiredAccess,
            [MarshalAs(UnmanagedType.U4)]
            FileShare shareMode,
            IntPtr securityAttributes,
            [MarshalAs(UnmanagedType.U4)]
            FileMode creationDisposition,
            [MarshalAs(UnmanagedType.U4)]
            FileAttributes flagsAndAttributes,
            IntPtr templateFile
        );

        #endregion

        #region konstanty

        /// <summary>pøípona souboru komprimovaného metodou gzip</summary>
        private const string m_csGzExtension = ".gz";

        #endregion

        #region vıètové typy

        /// <summary>typ hash algoritmu</summary>
        public enum HashType {
            /// <summary>SHA1</summary>
            Sha1 = 1,
            /// <summary>RIPEMD-160</summary>
            Ripemd160 = 2,
            /// <summary>MD5</summary>
            Md5 = 3,
            /// <summary>SHA256</summary>
            Sha256 = 5,
            /// <summary>SHA384</summary>
            Sha384 = 6,
            /// <summary>SHA512</summary>
            Sha512 = 7
        } // end enum

        #endregion  

        #region vlastnosti

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get { return typeof(GIOSupport).Assembly; }
        } // end property

        #endregion
        
        #region veøejné metody

        /// <summary>vytvoøení kopie streamu</summary>
        /// <param name="sourceStream">zdrojovı stream</param>
        /// <param name="targetStream">cílovı stream</param>
        /// <remarks>metoda pouívané streamy ani nevytváøí ani neuzavírá</remarks>
        public static void CopyStream(Stream sourceStream,Stream targetStream) {
            try {
                if(sourceStream == null) throw new GArgumentNullException(23200151);
                if(targetStream == null) throw new GArgumentNullException(23200152);
                byte[] l_abBuffer = new byte[64 * 1024];
                int l_nBytesRead = 0;
                while((l_nBytesRead = sourceStream.Read(l_abBuffer,0,l_abBuffer.Length)) > 0) targetStream.Write(l_abBuffer,0,l_nBytesRead);
                targetStream.Flush();
            } // end try
            catch(Exception e) {
                throw new GException(23200153,ThisAssembly,e); // selhalo vytvoøení kopie streamu
            } // end catch
        } // end method

//        #if TESTSTREAM // || DEBUG
//        /// <summary>vytvoøení kopie souboru do streamu</summary>
//        /// <param name="sourceFile">cesta ke zdojovému souboru</param>
//        /// <returns>vıslednı stream</returns>
//        /// <remarks>vıslednı stream musí uzavøít volající aplikace - do uzavøení stream se nesmí soubor smazat</remarks>
//        [Obsolete("FFIALA - test pouití")]
//        public static Stream FileToStream(string sourceFile)
//        {
//           try
//            {
//                if (sourceFile == null || (sourceFile = sourceFile.Trim()) == String.Empty) 
//                    throw new GArgumentNullException(21300106);

//                if (File.Exists(sourceFile) == false) 
//                    throw new GException(21300104, ThisAssembly, sourceFile); // zdrojovı soubor {0} nebyl nalezen

//                FileStream l_oFileStream = new FileStream(sourceFile, FileMode.Open, FileAccess.Read);
//                if (l_oFileStream.CanSeek)
//                    l_oFileStream.Seek(0, SeekOrigin.Begin);
//                return l_oFileStream;
//            } 
//            catch (Exception e)
//            {
//                throw new GException(21300105, ThisAssembly, e); // selhalo vytvoøení kopie souboru do streamu
//            } 
            
//        }
//#else
        /// <summary>vytvoøení kopie souboru do streamu</summary>
        /// <param name="sourceFile">cesta ke zdrojovému souboru</param>
        /// <returns>vıslednı stream</returns>
        /// <remarks>vıslednı stream musí uzavøít volající aplikace</remarks>
        public static MemoryStream FileToStream(string sourceFile)
        {
            MemoryStream l_oStream = null;
            try
            {
                if (sourceFile == null || (sourceFile = sourceFile.Trim()) == String.Empty) throw new GArgumentNullException(23200154);
                if (File.Exists(sourceFile) == false) throw new GException(23200155, ThisAssembly, sourceFile); // zdrojovı soubor {0} nebyl nalezen
                l_oStream = new MemoryStream();
                using (FileStream l_oFileStream = new FileStream(sourceFile, FileMode.Open, FileAccess.Read))
                {
                    CopyStream(l_oFileStream, l_oStream);
                } // end using
                if (l_oStream.CanSeek) l_oStream.Seek(0, SeekOrigin.Begin);
            } // end  try
            catch (Exception e)
            {
                throw new GException(23200156, ThisAssembly, e); // selhalo vytvoøení kopie souboru do streamu
            } // end catch
            return l_oStream;
        } // end method
//#endif

        /// <summary>vytvoøení kopie souboru do streamu</summary>
        /// <param name="sourceFile">cesta ke zdojovému souboru</param>
        /// <param name="targetStream">cílovı stream</param>
        /// <remarks>metoda cílovı stream ani nevytváøí ani neuzavírá</remarks>
        public static void FileToStream(string sourceFile,Stream targetStream) {
            try {
                if(sourceFile == null || (sourceFile = sourceFile.Trim()) == String.Empty) throw new GArgumentNullException(23200575);
                if(File.Exists(sourceFile) == false) throw new GException(23200576,23200155,ThisAssembly,sourceFile); // zdrojovı soubor {0} nebyl nalezen
                if(targetStream == null) throw new GArgumentNullException(23200577);
                using(FileStream l_oFileStream = new FileStream(sourceFile,FileMode.Open,FileAccess.Read)) {
                    CopyStream(l_oFileStream,targetStream);
                } // end using
                if(targetStream.CanSeek) targetStream.Seek(0,SeekOrigin.Begin);
            } // end  try
            catch(Exception e) {
                throw new GException(23200578,23200156,ThisAssembly,e); // selhalo vytvoøení kopie souboru do streamu
            } // end catch
        } // end method

        /// <summary>uloení streamu do souboru</summary>
        /// <param name="sourceStream">zdrojovı stream</param>
        /// <param name="targetFile">cesta k cílovému souboru</param>
        /// <remarks>metoda neuzavírá zdrojovı stream</remarks>
        public static void StreamToFile(Stream sourceStream,string targetFile) {
            StreamToFile(sourceStream,targetFile,true);
        } // end method

        /// <summary>uloení streamu do souboru</summary>
        /// <param name="sourceStream">zdrojovı stream</param>
        /// <param name="targetFile">cesta k cílovému souboru</param>
        /// <param name="overwrite">pøíznak povolení pøepsání existujícího souboru</param>
        /// <remarks>metoda neuzavírá zdrojovı stream</remarks>
        public static void StreamToFile(Stream sourceStream,string targetFile,bool overwrite) {
            try {
                if(sourceStream == null) throw new GArgumentNullException(23200157);
                if(targetFile == null || (targetFile = targetFile.Trim()) == String.Empty) throw new GArgumentNullException(23200158);
                if(File.Exists(targetFile)) {
                    if(overwrite) File.Delete(targetFile);
                    else throw new GException(23200376,ThisAssembly,targetFile); // soubor {0} ji existuje a není povoleno jeho pøepsání
                } // end if
                if(sourceStream.CanSeek) sourceStream.Seek(0,SeekOrigin.Begin);
                using(FileStream l_oFileStream = File.Create(targetFile)) {
                    CopyStream(sourceStream,l_oFileStream);
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200159,ThisAssembly,e); // selhalo uloení streamu do souboru
            } // end catch
        } // end method

        /// <summary>naètení obsahu souboru do pole bytù</summary>
        /// <param name="sourceFile">cesta ke zdrojovému souboru</param>
        /// <returns>obsahu souboru v poli bytù</returns>
        public static byte[] FileToBytes(string sourceFile) {
            if(sourceFile == null || (sourceFile = sourceFile.Trim()) == String.Empty) throw new GArgumentNullException(23200361);
            try {
                byte[] l_abyBuffer = null;
                using(FileStream l_oFileStream = File.Open(sourceFile,FileMode.Open,FileAccess.Read)) {
                    if(l_oFileStream.Length > 0) {
                        l_abyBuffer = new byte[l_oFileStream.Length];
                        l_oFileStream.Read(l_abyBuffer,0,(int)l_oFileStream.Length);
                    } // end if
                } // end using
                return l_abyBuffer;
            } // end try
            catch(Exception e) {
                throw new GException(23200362,ThisAssembly,e,sourceFile); // obsah souboru {0} se nepodaøilo korektnì naèíst
            } // end catch
        } // end method

        /// <summary>zápis pole bytù do souboru</summary>
        /// <param name="data">zdrojové pole bytù</param>
        /// <param name="targetFile">cesta k vıslednému souboru</param>
        public static void BytesToFile(byte[] data,string targetFile) {
            BytesToFile(data,targetFile,true);
        } // end method

        /// <summary>zápis pole bytù do souboru</summary>
        /// <param name="data">zdrojové pole bytù</param>
        /// <param name="targetFile">cesta k vıslednému souboru</param>
        /// <param name="overwrite">pøíznak povolení pøepsání existujícího souboru</param>
        public static void BytesToFile(byte[] data, string targetFile, bool overwrite)
        {
            if (data == null) throw new GArgumentNullException(23200363);
            if (targetFile == null || (targetFile = targetFile.Trim()) == String.Empty) throw new GArgumentNullException(23200364);
            try
            {
                if (File.Exists(targetFile))
                {
                    if (overwrite) File.Delete(targetFile);
                    else throw new GException(23200377, 23200376, ThisAssembly, targetFile); //RC-EX 23200376 : soubor {0} ji existuje a není povoleno jeho pøepsání
                } // end if
                using (FileStream l_oFileStream = File.Open(targetFile, FileMode.CreateNew, FileAccess.ReadWrite))
                {
                    l_oFileStream.Write(data, 0, data.Length);
                    l_oFileStream.Flush();
                } // end using
            } // end try
            catch (Exception e)
            {
                throw new GException(23200365, 23200365, ThisAssembly, e, targetFile); //RC-EX 23200365 : nepodaøilo se korektnì zapsat data do souboru {0}
            } // end catch
        } // end method

        /// <summary>zápis pole bytù do souboru</summary>
        /// <param name="buffer">zdrojové pole bytù</param>
        /// <param name="offset">Odkud v poli zapsat do souboru</param>
        /// <param name="count">kolik bytù z pole zapsat do souboru</param>
        /// <param name="targetFile">cesta k vıslednému souboru</param>
        /// <param name="overwrite">pøíznak povolení pøepsání existujícího souboru</param>
        public static void BytesToFile(byte[] buffer, int offset, int count, string targetFile, bool overwrite)
        {
            if (buffer == null) throw new GArgumentNullException(21000120);
            if (targetFile == null || (targetFile = targetFile.Trim()) == String.Empty) throw new GArgumentNullException(21000123);
            try
            {
                if (File.Exists(targetFile))
                {
                    if (overwrite) File.Delete(targetFile);
                    else throw new GException(21000121, 23200376, ThisAssembly, targetFile); //RC-EX 23200376 : soubor {0} ji existuje a není povoleno jeho pøepsání
                } // end if
                using (FileStream l_oFileStream = File.Open(targetFile, FileMode.CreateNew, FileAccess.ReadWrite))
                {
                    l_oFileStream.Write(buffer, offset, count);
                    l_oFileStream.Flush();
                } // end using
            } // end try
            catch (Exception e)
            {
                throw new GException(21000122, 23200365, ThisAssembly, e, targetFile); //RC-EX 23200365 : nepodaøilo se korektnì zapsat data do souboru {0}
            } // end catch
        } // end method

        /// <summary>uloení streamu do pole bytù</summary>
        /// <param name="sourceStream">zdrojovı stream</param>
        /// <returns>obsahu streamu v poli bytù</returns>
        public static byte[] StreamToBytes(Stream sourceStream) {
            if(sourceStream == null) throw new GArgumentNullException(23200366);
            try {
                byte[] l_abData = new byte[sourceStream.Length];
                if(sourceStream.CanSeek) sourceStream.Seek(0,SeekOrigin.Begin);
                sourceStream.Read(l_abData,0,(int)sourceStream.Length);
                return l_abData;
            } // end try
            catch(Exception e) {
                throw new GException(23200367,ThisAssembly,e); // selhalo uloení streamu do pole bytù
            } // end catch
        } // end method

        /// <summary>uloení pole bytù do streamu</summary>
        /// <param name="data">zdrojové pole bytù</param>
        /// <returns>vıslednı stream</returns>
        public static MemoryStream BytesToStream(byte[] data) {
            if(data == null) throw new GArgumentNullException(23200384);
            try {
                MemoryStream l_oMemoryStream = new MemoryStream(data);
                if(l_oMemoryStream.CanSeek) l_oMemoryStream.Seek(0,SeekOrigin.Begin);
                return l_oMemoryStream;
            } // end try
            catch(Exception e) {
                throw new GException(23200385,ThisAssembly,e); // selhalo uloení pole bytù do streamu
            } // end catch
        } // end method

        /// <summary>upraví název souboru tak, aby neobsahoval speciální znaky</summary>
        /// <param name="fileName">název souboru</param>
        /// <returns>název souboru bez speciálních znakù</returns>
        /// <remarks>speciální znaky budou nahrazeny znakem podtrítko</remarks>
        public static string GetValidFileName(string fileName) {
            return GetValidFileName(fileName,true);
        } // end method

        /// <summary>upraví název souboru tak, aby neobsahoval speciální znaky</summary>
        /// <param name="fileName">název souboru</param>
        /// <param name="normalizeSpaces">pøíznak provedení normalizace mezer v názvu souboru</param>
        /// <returns>název souboru bez speciálních znakù</returns>
        /// <remarks>speciální znaky budou nahrazeny znakem podtrítko</remarks>
        public static string GetValidFileName(string fileName,bool normalizeSpaces) {
            if(fileName == null || (fileName = fileName.Trim()) == String.Empty) throw new GArgumentException(23200378);
            // nahrazení všech nepovolenıch znakù podtrítkem
            StringBuilder l_oFileName = new StringBuilder(fileName.Length);
            string l_sValidChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZáèïìéíòóøšúùıÁÈÏÌÉÍÒÓØŠÚÙİ";
            int l_nLastDotPosition = fileName.LastIndexOf('.');
            char l_cLastChar = Char.MinValue;
            for(int i = 0; i < fileName.Length; i++) {
                if(i == l_nLastDotPosition || l_sValidChars.IndexOf(fileName[i]) > -1) l_cLastChar = fileName[i];
                else if(l_cLastChar != '_') l_cLastChar = '_';
                else continue;
                l_oFileName.Append(l_cLastChar);
            } // end for
            return l_oFileName.ToString();
        } // end method

        /// <summary>upraví název souboru tak, aby neobsahoval speciální znaky a zajistí unikátnost jeho názvu v rámci zadaného adresáøe</summary>
        /// <param name="filePath">cesta k adresáøi</param>
        /// <param name="fileName">název souboru</param>
        /// <param name="maxPathLength">maximální pøípustná délka názvu souboru vèetnì cesty</param>
        /// <returns>název souboru bez speciálních znakù upravenı s ohledem na unikátnost v zadaném adresáøi a maximální povolenou délku cesty</returns>
        /// <remarks>speciální znaky v názvu souboru budou nahrazeny znakem podtrítko</remarks>
        /// <remarks>název souboru bude zkrácen tak, aby jeho délka vèetnì cesty nepøesáhla stanovenı poèet znakù</remarks>
        public static string GetValidFileName(string filePath,string fileName,int maxPathLength = 250) {
            try {
                int l_nUniqueSuffixLength = 3; // délka pøípony názvu souboru
                // kontrola vstupních argumentù
                if(filePath == null || (filePath = filePath.Trim()) == String.Empty) throw new GArgumentException(23200442);
                if(Directory.Exists(filePath) == false) throw new GException(23200436,ThisAssembly,filePath); // adresáø {0} nebyl nalezen
                fileName = GetValidFileName(fileName);
                if(maxPathLength <= filePath.Length) throw new GException(23200437,ThisAssembly); // zadána pøíliš dlouhá cesta
                // oøíznutí názvu na poadovanou délku
                string l_sFileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);
                string l_sExtension = Path.GetExtension(fileName);
                int l_nMaxFileNameLength = maxPathLength - Path.Combine(filePath,fileName).Length + l_sFileNameWithoutExtension.Length;
                if(l_nMaxFileNameLength <= 0) throw new GException(23200438,23200437,ThisAssembly); // zadána pøíliš dlouhá cesta
                if(l_sFileNameWithoutExtension.Length > l_nMaxFileNameLength) l_sFileNameWithoutExtension = l_sFileNameWithoutExtension.Substring(0,l_nMaxFileNameLength);
                // kontrola unikátnosti
                string l_sPath = Path.Combine(filePath,l_sFileNameWithoutExtension + l_sExtension);
                if(File.Exists(l_sPath)) {
                    l_nMaxFileNameLength -= l_nUniqueSuffixLength + 1;
                    if(l_nMaxFileNameLength <= 0) throw new GException(23200439,23200437,ThisAssembly); // zadána pøíliš dlouhá cesta
                    if(l_sFileNameWithoutExtension.Length > l_nMaxFileNameLength) l_sFileNameWithoutExtension = l_sFileNameWithoutExtension.Substring(0,l_nMaxFileNameLength);
                    // konstrukce unikátního názvu
                    string l_sUniqueFileNameFormat = "{0}_{1:D" + (l_nUniqueSuffixLength).ToString() + "}{2}";
                    int l_nAttempts = (int) Math.Pow(10,l_nUniqueSuffixLength);
                    int l_nAttempt = 0;
                    for(; l_nAttempt < l_nAttempts; l_nAttempt++) {
                        l_sPath = Path.Combine(filePath,String.Format(l_sUniqueFileNameFormat,l_sFileNameWithoutExtension,l_nAttempt,l_sExtension));
                        if(File.Exists(l_sPath) == false) break;
                    } // end for
                    if(l_nAttempt == l_nAttempts) throw new GException(23200440,ThisAssembly); // nepodaøilo se vytvoøit unikátní název souboru
                } // end if
                return Path.GetFileName(l_sPath);
            } // end try
            catch(Exception e) {
                throw new GException(23200441,ThisAssembly,e); // selhal pokus o získání validního názvu souboru unikátního v rámci zadaného adresáøe
            } // end catch
        } // end method

        /// <summary>získání kontrolního souètu</summary>
        /// <param name="hashType">typ kontrolního souètu</param>
        /// <param name="source">zdrojová data</param>
        /// <returns>kontrolní souèet</returns>
        public static string GetHash(HashType hashType,byte[] source) {
            try {
                byte[] l_abHash = null;
                string l_sHash = String.Empty;
                // kontrola vstupních parametrù
                if(source == null || source.Length < 1) throw new GArgumentException(23200459);
                // vıpoèet hash hodnoty
                switch(hashType) {
                case HashType.Sha1: // SHA1
                    SHA1Managed l_oSha1 = new SHA1Managed();
                    l_abHash = l_oSha1.ComputeHash(source);
                    break;
                case HashType.Ripemd160: // RIPEMD-160
#if NETFRAMEWORK
                    RIPEMD160 l_oRipemd160 = RIPEMD160Managed.Create();
                    l_abHash = l_oRipemd160.ComputeHash(source);
                    break;
#else
                    //TODO use Org.BouncyCastle.Crypto.Digests.RipeMD160Digest?
                    //https://stackoverflow.com/questions/65457648/cannot-find-ripemd160-in-net-core
                    throw new NotImplementedException();
#endif
                case HashType.Md5: // MD5
                    MD5 l_oMd5 = MD5.Create();
                    l_abHash = l_oMd5.ComputeHash(source);
                    break;
                case HashType.Sha256: // SHA256
                    SHA256 l_oSha256 = SHA256Managed.Create();
                    l_abHash = l_oSha256.ComputeHash(source);
                    break;
                case HashType.Sha384: // SHA384
                    SHA384 l_oSha384 = new SHA384Managed();
                    l_abHash = l_oSha384.ComputeHash(source);
                    break;
                case HashType.Sha512: // SHA512
                    SHA512 l_oSha512 = new SHA512Managed();
                    l_abHash = l_oSha512.ComputeHash(source);
                    break;
                } // end switch
                // návrat vısledku
                return l_abHash?.ToHexString();
            } // end try
            catch(Exception e) {
                throw new GException(23200460,ThisAssembly,e); // selhal pokus o získání kontrolního souètu
            } // end catch
        } // end method

        /// <summary>získání kontrolního souètu souboru</summary>
        /// <param name="hashType">typ kontrolního souètu</param>
        /// <param name="fileName">cesta k souboru</param>
        /// <returns>kontrolní souèet souboru</returns>
        public static string GetFileHash(HashType hashType,string fileName) {
            try {
                byte[] l_abHash = null;
                string l_sHash = String.Empty;
                // kontrola vstupních parametrù
                if(fileName == null || (fileName = fileName.Trim()) == String.Empty) throw new GArgumentException(23200396);
                if(File.Exists(fileName) == false) throw new GException(23200397,ThisAssembly,fileName); // soubor {0} nebyl nalezen
                // vıpoèet hash hodnoty
                using(FileStream l_oFileStream = new FileStream(fileName,FileMode.Open)) {
                    switch(hashType) {
                        case HashType.Sha1: // SHA1
                            SHA1Managed l_oSha1 = new SHA1Managed();
                            l_abHash = l_oSha1.ComputeHash(l_oFileStream);
                            break;
                        case HashType.Ripemd160: // RIPEMD-160
#if NETFRAMEWORK
                            RIPEMD160 l_oRipemd160 = RIPEMD160Managed.Create();
                            l_abHash = l_oRipemd160.ComputeHash(l_oFileStream);
                            break;
#else
                        //TODO use Org.BouncyCastle.Crypto.Digests.RipeMD160Digest?
                        //https://stackoverflow.com/questions/65457648/cannot-find-ripemd160-in-net-core
                        throw new NotImplementedException();
#endif
                        case HashType.Md5: // MD5
                            MD5 l_oMd5 = MD5.Create();
                            l_abHash = l_oMd5.ComputeHash(l_oFileStream);
                            break;
                        case HashType.Sha256: // SHA256
                            SHA256 l_oSha256 = SHA256Managed.Create();
                            l_abHash = l_oSha256.ComputeHash(l_oFileStream);
                            break;
                        case HashType.Sha384: // SHA384
                            SHA384 l_oSha384 = new SHA384Managed();
                            l_abHash = l_oSha384.ComputeHash(l_oFileStream);
                            break;
                        case HashType.Sha512: // SHA512
                            SHA512 l_oSha512 = new SHA512Managed();
                            l_abHash = l_oSha512.ComputeHash(l_oFileStream);
                            break;
                    } // end switch
                } // end using
                // formátování hash hodnoty
                foreach(byte l_byHash in l_abHash) {
                    l_sHash += l_byHash.ToString("x2");
                } // end foreach
                // návrat vısledku
                return l_sHash;
            } // end try
            catch(Exception e) {
                throw new GException(23200398,ThisAssembly,e); // selhal pokus o získání kontrolního souètu souboru
            } // end catch
        } // end method

        /// <summary>získání typu kontrolního souètu z èíselného vyjádøení</summary>
        /// <param name="hashType">typ kontrolního souètu</param>
        /// <returns>typ kontrolního souètu</returns>
        public static HashType GetHashType(int hashType) {
            if(Enum.IsDefined(typeof(HashType),hashType)) return (HashType) hashType;
            else throw new GException(23200511,ThisAssembly); // nepodporovanı typ kontrolního souètu
        } // end method

        /// <summary>ovìøení zda je stream komprimovanı metodou zip</summary>
        /// <param name="stream">stream k ovìøení</param>
        /// <returns>true v pøípadì, e stream komprimovanı metodou zip, jinak false</returns>
        public static bool IsStreamZipped(Stream stream) {
            try {
                long l_nPosition = 0;
                int l_nBytesRead = 0;
                byte[] l_abBytes = new byte[2];
                // kontrola vstupních parametrù
                if(stream == null) throw new GArgumentException(23200414);
                // uloení pùvodní pozice
                if(stream.CanSeek) {
                    l_nPosition = stream.Position;
                    stream.Position = 0;
                } // end if
                // naètení prvních dvou bytù
                l_nBytesRead = stream.Read(l_abBytes,0,2);
                // vrácení pùvodní pozice
                if(stream.CanSeek) stream.Seek(l_nPosition,SeekOrigin.Begin);
                // návrat vısledku
                return l_nBytesRead == 2 && l_abBytes[0] == 'P' && l_abBytes[1] == 'K';
            } // end try
            catch(Exception e) {
                throw new GException(23200413,ThisAssembly,e); // selhal pokus o ovìøení zda je stream komprimovanı metodou zip
            } // end catch
        } // end method

        /// <summary>ovìøení zda je soubor komprimovanı metodou zip</summary>
        /// <param name="filePath">cesta k souboru</param>
        /// <returns>true v pøípadì, e soubor komprimovanı metodou zip, jinak false</returns>
        public static bool IsFileZipped(string filePath) {
            try {
                // kontrola vstupních parametrù
                if(filePath == null || (filePath = filePath.Trim()) == String.Empty) throw new GArgumentException(23200410);
                if(File.Exists(filePath) == false) throw new GException(23200411,23200397,ThisAssembly,filePath); // soubor {0} nebyl nalezen
                // naètení prvních dvou bytù
                int l_nBytesRead = 0;
                byte[] l_abBytes = new byte[2];
                using(FileStream l_oStream = new FileStream(filePath,FileMode.Open,FileAccess.Read)) {
                    l_nBytesRead = l_oStream.Read(l_abBytes,0,2);
                } // end using
                // návrat vısledku
                return l_nBytesRead == 2 && l_abBytes[0] == 'P' && l_abBytes[1] == 'K';
            } // end try
            catch(Exception e) {
                throw new GException(23200412,ThisAssembly,e); // selhal pokus o ovìøení zda je soubor komprimovanı metodou zip
            } // end catch
        } // end method

        /// <summary>získání kontrolního souètu souboru dle zjednodušeného vıpoètu pro GINIS instalace</summary>
        /// <param name="sourceFile">cesta k souboru</param>
        /// <returns>kontrolní souèet souboru</returns>
        public static int GetFileCrc(string sourceFile) {
            try {
                UInt16 l_nCrc = 0;
                if(File.Exists(sourceFile)) {
                    using(FileStream l_oFileStream = new FileStream(sourceFile,FileMode.Open,FileAccess.Read,FileShare.ReadWrite)) {
                        int l_nBufferSize = Int16.MaxValue;
                        byte[] l_abyBuffer = new byte[l_nBufferSize];
                        int l_nBytesRead = 0;
                        int i = 0;
                        while((l_nBytesRead = l_oFileStream.Read(l_abyBuffer,0,l_nBufferSize)) != 0) {
                            for(i = 0; i < l_nBytesRead; i++) {
                                unchecked {
                                    l_nCrc += (UInt16)l_abyBuffer[i];
                                } // end unchecked
                            } // end for
                        } // end for
                        unchecked {
                            l_nCrc += 0xffff;
                        } // end unchecked
                    } // end using
                } // end if
                return l_nCrc;
            } // end try
            catch {
                return 0; // všechny vıjimky jsou ignorovány
            } // end catch
        } // end method

        /// <summary>extrakce ikony ze souboru</summary>
        /// <param name="sourceFile">zdrojovı soubor</param>
        /// <param name="outputDir">adresáø pro uloení extrahované ikony</param>
        /// <returns>cesta k souboru s extrahovanou ikonou</returns>
        public static string ExtractFileIcon(string sourceFile,string outputDir) {
            try {
                // kontrola parametrù
                if(sourceFile == null || (sourceFile = sourceFile.Trim()) == String.Empty) throw new GArgumentNullException(23200448,"sourceFile");
                if(outputDir == null || (outputDir = outputDir.Trim()) == String.Empty) throw new GArgumentNullException(23200449,"outputDir");
                if(File.Exists(sourceFile) == false) throw new GException(23200450,23200155,ThisAssembly,sourceFile); // zdrojovı soubor {0} nebyl nalezen
                if(Directory.Exists(outputDir) == false) throw new GException(23200451,23200436,ThisAssembly,outputDir); // adresáø {0} nebyl nalezen
                // extrakce ikony
                Icon l_oIcon = Icon.ExtractAssociatedIcon(sourceFile);
                // uloení ikony do souboru
                string l_sOutputFile = Path.Combine(Path.GetFullPath(outputDir),Path.GetFileNameWithoutExtension(sourceFile) + ".ico");
                using(FileStream l_oFileStream = new FileStream(l_sOutputFile,FileMode.Create,FileAccess.Write)) {
                    l_oIcon.Save(l_oFileStream);
                    l_oFileStream.Flush();
                } // end using
                // vrácení cesty k souboru
                return l_sOutputFile;
            } // end try
            catch(Exception e) {
                throw new GException(23200452,ThisAssembly,e); // nepodaøilo se extrahovat ikonu ze zdrojového souboru
            } // end catch
        } // end method

        /// <summary>získání poètu øádkù v textovém souboru</summary>
        /// <param name="filePath">cesta k souboru</param>
        /// <returns>poèet øádkù</returns>
        public static int GetFileRowsCount(string filePath) {
            try {
                return File.ReadLines(filePath).Count();
            } // end try
            catch(Exception e) {
                throw new GException(23200467,ThisAssembly,e); // nepodaøilo se získat poèet øádkù v souboru
            } // end catch
        } // end method

        /// <summary>vrací pøíznak uzamèení souboru jinım procesem</summary>
        /// <param name="filePath">cesta k souboru</param>
        /// <param name="desiredAccess">poadovanı pøístup</param>
        /// <returns>true v pøípadì uzamèení souboru jinım procesem, jinak false</returns>
        [SecuritySafeCritical]
        public static bool IsFileLocked(string filePath,FileAccess desiredAccess = FileAccess.Write) {
            try {
                if(String.IsNullOrWhiteSpace(filePath)) throw new GArgumentNullException(23200538,"filePath");
                if(File.Exists(filePath)) {
                    using(SafeFileHandle l_oFile = CreateFile(filePath,desiredAccess,FileShare.Write | FileShare.Read | FileShare.Delete,IntPtr.Zero,FileMode.Open,0,IntPtr.Zero)) {
                        return l_oFile.IsInvalid;
                    } // end using
                } else return false;
            } // end try
            catch(Exception e) {
                throw new GException(23200539,ThisAssembly,e); // selhal pokus o kontrolu uzamèení souboru jinım procesem
            } // end catch
        } // end method

        /// <summary>zjištìní monosti zápisu do adresáøe</summary>
        /// <param name="path">cesta k adresáøi</param>
        /// <returns>pøíznak monosti zápisu do adresáøe</returns>
        public static bool IsDirectoryWritable(string path) {
            try {
                bool l_bAllow = false;
                bool l_bDeny = false;
                if(String.IsNullOrWhiteSpace(path) == false && Directory.Exists(path)) {
                    DirectorySecurity l_oDirectorySecurity = new DirectoryInfo(path).GetAccessControl();
                    if(l_oDirectorySecurity != null) {
                        AuthorizationRuleCollection l_oAuthorizationRules = l_oDirectorySecurity.GetAccessRules(true,true,typeof(SecurityIdentifier));
                        if(l_oAuthorizationRules != null) {
                            foreach(FileSystemAccessRule l_oRule in l_oAuthorizationRules) {
                                if((FileSystemRights.Write & l_oRule.FileSystemRights) == FileSystemRights.Write) {
                                    if(l_oRule.AccessControlType == AccessControlType.Allow) l_bAllow = true;
                                    else if(l_oRule.AccessControlType == AccessControlType.Deny) l_bDeny = true;
                                } // end if
                            } // end foreach
                        } // end if
                    } // end if
                } // end if
                return l_bAllow && l_bDeny == false;
            } // end try
            catch(UnauthorizedAccessException) {
                return false;
            } // end catch
            catch(Exception e) {
                throw new GException(23200541,ThisAssembly,e); // selhal pokus o zjištìní monosti zápisu do adresáøe
            } // end catch
        } // end method

#endregion

        #region komprimace a dekomprimace metodou gzip

        /// <summary>komprimace souboru metodou gzip</summary>
        /// <param name="filePath">cesta ke zdrojovému souboru</param>
        public static void GzCompress(string filePath) {
            GzCompress(filePath,true);
        } // end method

        /// <summary>komprimace souboru metodou gzip</summary>
        /// <param name="filePath">cesta ke zdrojovému souboru</param>
        /// <param name="overwrite">pøíznak povolení pøepsání existujících souborù</param>
        public static void GzCompress(string filePath,bool overwrite) {
            try {
                // kontrola vstupního souboru
                if(filePath == null || (filePath = filePath.Trim()) == String.Empty) throw new GArgumentNullException(23200424);
                if(File.Exists(filePath) == false) throw new GException(23200425,23200155,ThisAssembly,filePath); // zdrojovı soubor {0} nebyl nalezen
                if(String.Compare(Path.GetExtension(filePath),m_csGzExtension,true) == 0) throw new GException(23200426,ThisAssembly,filePath); // zdrojovı soubor {0} ji je zakomprimován
                // vıstupní soubor
                string l_sOutputFile = filePath + m_csGzExtension;
                if(File.Exists(l_sOutputFile)) {
                    if(overwrite) File.Delete(l_sOutputFile);
                    else throw new GException(23200427,23200376,ThisAssembly,l_sOutputFile); // soubor {0} ji existuje a není povoleno jeho pøepsání
                } // end if
                // vlasní komprimace
                using(FileStream l_oSourceFile = File.OpenRead(filePath)) {
                    using(FileStream l_oOutputFile = File.Create(l_sOutputFile)) {
                        using(GZipStream l_oGzStream = new GZipStream(l_oOutputFile,CompressionMode.Compress)) {
                            l_oSourceFile.CopyTo(l_oGzStream);
                        } // end using
                    } // end using
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200428,ThisAssembly,e); // komprimace souboru metodou gzip se nezdaøila
            } // end catch
        } // end method

        /// <summary>dekomprimace souboru metodou gzip</summary>
        /// <param name="filePath">cesta ke zdrojovému souboru</param>
        public static void GzDecompress(string filePath) {
            GzDecompress(filePath,true);
        } // end method

        /// <summary>dekomprimace souboru metodou gzip</summary>
        /// <param name="filePath">cesta ke zdrojovému souboru</param>
        /// <param name="overwrite">pøíznak povolení pøepsání existujících souborù</param>
        public static void GzDecompress(string filePath,bool overwrite) {
            try {
                // kontrola vstupního souboru
                if(filePath == null || (filePath = filePath.Trim()) == String.Empty) throw new GArgumentNullException(23200429);
                if(File.Exists(filePath) == false) throw new GException(23200430,23200155,ThisAssembly,filePath); // zdrojovı soubor {0} nebyl nalezen
                if(String.Compare(Path.GetExtension(filePath),m_csGzExtension,true) != 0) throw new GException(23200431,ThisAssembly,filePath); // zdrojovı soubor {0} není zakomprimován
                // vıstupní soubor
                string l_sOutputFile = filePath.Remove(filePath.Length - m_csGzExtension.Length);
                if(File.Exists(l_sOutputFile)) {
                    if(overwrite) File.Delete(l_sOutputFile);
                    else throw new GException(23200432,23200376,ThisAssembly,l_sOutputFile); // soubor {0} ji existuje a není povoleno jeho pøepsání
                } // end if
                // vlastní dekomprimace
                using(FileStream l_oSourceFile = File.OpenRead(filePath)) {
                    using(FileStream l_oOutputFile = File.Create(l_sOutputFile)) {
                        using(GZipStream l_oGzStream = new GZipStream(l_oSourceFile,CompressionMode.Decompress)) {
                            l_oGzStream.CopyTo(l_oOutputFile);
                        } // end using
                    } // end using
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200433,ThisAssembly,e); // dekomprimace souboru metodou gzip se nezdaøila
            } // end catch
        } // end method

        #endregion

        #region pøenos dat pomocí HTTP

        /// <summary>získání dat prostøednictvím protokolu HTTP</summary>
        /// <param name="url">url adresa</param>
        /// <param name="outputFile">cesta k souboru pro vıstupní data</param>
        public static void HttpTransferFile(string url,string outputFile) {
            HttpTransferFile(url,null,outputFile,null,null,null,null,0,null,null,false,false);
        } // end method

        /// <summary>pøenos dat prostøednictvím protokolu HTTP</summary>
        /// <param name="url">url adresa</param>
        /// <param name="inputFile">cesta k souboru se vstupními daty</param>
        /// <param name="outputFile">cesta k souboru pro vıstupní data</param>
        public static void HttpTransferFile(string url,string inputFile,string outputFile) {
            HttpTransferFile(url,inputFile,outputFile,null,null,null,null,0,null,null,false,false);
        } // end method

        /// <summary>pøenos dat prostøednictvím protokolu HTTP</summary>
        /// <param name="url">url adresa</param>
        /// <param name="inputFile">cesta k souboru se vstupními daty</param>
        /// <param name="outputFile">cesta k souboru pro vıstupní data</param>
        /// <param name="contentType">typ obsahu</param>
        /// <param name="soapAction">SOAP akce</param>
        /// <param name="proxy">adresa proxy serveru</param>
        /// <param name="clientCertificate">cesta k souboru s klientskım certifikátem</param>
        /// <param name="timeout">èasovı limit pro dokonèení v sekundách (hodnota 0 znaèí vıchozí limit, hodnota menší ne nula znaèí operaci bez èasového limitu)</param>
        public static void HttpTransferFile(string url,string inputFile,string outputFile,string contentType,string soapAction,string proxy,string clientCertificate,int timeout) {
            HttpTransferFile(url,inputFile,outputFile,contentType,soapAction,proxy,clientCertificate,timeout,null,null,false,false);
        } // end method

        /// <summary>získání dat prostøednictvím protokolu HTTP s basic autentizací</summary>
        /// <param name="url">url adresa</param>
        /// <param name="outputFile">cesta k souboru pro vıstupní data</param>
        /// <param name="userName">uivatelské jméno</param>
        /// <param name="password">heslo</param>
        public static void HttpBasicTransferFile(string url,string outputFile,string userName,string password) {
            HttpTransferFile(url,null,outputFile,null,null,null,null,0,userName,password,true,false);
        } // end method

        /// <summary>pøenos dat prostøednictvím protokolu HTTP s basic autentizací</summary>
        /// <param name="url">url adresa</param>
        /// <param name="inputFile">cesta k souboru se vstupními daty</param>
        /// <param name="outputFile">cesta k souboru pro vıstupní data</param>
        /// <param name="userName">uivatelské jméno</param>
        /// <param name="password">heslo</param>
        public static void HttpBasicTransferFile(string url,string inputFile,string outputFile,string userName,string password) {
            HttpTransferFile(url,inputFile,outputFile,null,null,null,null,0,userName,password,true,false);
        } // end method

        /// <summary>pøenos dat prostøednictvím protokolu HTTP s basic autentizací</summary>
        /// <param name="url">url adresa</param>
        /// <param name="inputFile">cesta k souboru se vstupními daty</param>
        /// <param name="outputFile">cesta k souboru pro vıstupní data</param>
        /// <param name="userName">uivatelské jméno</param>
        /// <param name="password">heslo</param>
        /// <param name="contentType">typ obsahu</param>
        /// <param name="soapAction">SOAP akce</param>
        /// <param name="proxy">adresa proxy serveru</param>
        /// <param name="timeout">èasovı limit pro dokonèení v sekundách (hodnota 0 znaèí vıchozí limit, hodnota menší ne nula znaèí operaci bez èasového limitu)</param>
        public static void HttpBasicTransferFile(string url,string inputFile,string outputFile,string userName,string password,string contentType,string soapAction,string proxy,int timeout) {
            HttpTransferFile(url,inputFile,outputFile,contentType,soapAction,proxy,null,timeout,userName,password,true,false);
        } // end method

        /// <summary>získání dat prostøednictvím protokolu HTTP s digest autentizací</summary>
        /// <param name="url">url adresa</param>
        /// <param name="outputFile">cesta k souboru pro vıstupní data</param>
        /// <param name="userName">uivatelské jméno</param>
        /// <param name="password">heslo</param>
        public static void HttpDigestTransferFile(string url,string outputFile,string userName,string password) {
            HttpTransferFile(url,null,outputFile,null,null,null,null,0,userName,password,false,true);
        } // end method

        /// <summary>pøenos dat prostøednictvím protokolu HTTP s digest autentizací</summary>
        /// <param name="url">url adresa</param>
        /// <param name="inputFile">cesta k souboru se vstupními daty</param>
        /// <param name="outputFile">cesta k souboru pro vıstupní data</param>
        /// <param name="userName">uivatelské jméno</param>
        /// <param name="password">heslo</param>
        public static void HttpDigestTransferFile(string url,string inputFile,string outputFile,string userName,string password) {
            HttpTransferFile(url,inputFile,outputFile,null,null,null,null,0,userName,password,false,true);
        } // end method

        /// <summary>pøenos dat prostøednictvím protokolu HTTP s digest autentizací</summary>
        /// <param name="url">url adresa</param>
        /// <param name="inputFile">cesta k souboru se vstupními daty</param>
        /// <param name="outputFile">cesta k souboru pro vıstupní data</param>
        /// <param name="userName">uivatelské jméno</param>
        /// <param name="password">heslo</param>
        /// <param name="contentType">typ obsahu</param>
        /// <param name="soapAction">SOAP akce</param>
        /// <param name="proxy">adresa proxy serveru</param>
        /// <param name="timeout">èasovı limit pro dokonèení v sekundách (hodnota 0 znaèí vıchozí limit, hodnota menší ne nula znaèí operaci bez èasového limitu)</param>
        public static void HttpDigestTransferFile(string url,string inputFile,string outputFile,string userName,string password,string contentType,string soapAction,string proxy,int timeout) {
            HttpTransferFile(url,inputFile,outputFile,contentType,soapAction,proxy,null,timeout,userName,password,false,true);
        } // end method

        /// <summary>pøenos dat prostøednictvím protokolu HTTP/S</summary>
        /// <param name="url">url adresa</param>
        /// <param name="inputFile">cesta k souboru se vstupními daty</param>
        /// <param name="outputFile">cesta k souboru pro vıstupní data</param>
        /// <param name="contentType">typ obsahu</param>
        /// <param name="soapAction">SOAP akce</param>
        /// <param name="proxy">adresa proxy serveru</param>
        /// <param name="clientCertificate">cesta k souboru s klientskım certifikátem</param>
        /// <param name="timeout">èasovı limit pro dokonèení v sekundách (hodnota 0 znaèí vıchozí limit, hodnota menší ne nula znaèí operaci bez èasového limitu)</param>
        /// <param name="userName">uivatelské jméno</param>
        /// <param name="password">heslo</param>
        /// <param name="httpBasic">pøíznak poadavku na HTTP basic autentizaci</param>
        /// <param name="httpDigest">pøíznak poadavku na HTTP digest autentizaci</param>
        private static void HttpTransferFile(string url,string inputFile,string outputFile,string contentType,string soapAction,string proxy,string clientCertificate,int timeout,string userName,string password,bool httpBasic,bool httpDigest) {
            try {
                // kontrola vstupních argumentù
                if(url == null || (url = url.Trim()) == String.Empty) throw new GArgumentNullException(23200515,"url");
                inputFile = inputFile == null ? String.Empty : inputFile.Trim();
                if(inputFile != String.Empty && File.Exists(inputFile) == false) throw new GException(23200516,ThisAssembly,inputFile); // nenalezen soubor {0}
                outputFile = outputFile == null ? String.Empty : outputFile.Trim();
                if(outputFile != String.Empty && Directory.Exists(Path.GetDirectoryName(outputFile)) == false) throw new GException(23200517,ThisAssembly,Path.GetDirectoryName(outputFile)); // nenalezen adresáø {0}
                contentType = contentType == null ? String.Empty : contentType.Trim();
                soapAction = soapAction == null ? String.Empty : soapAction.Trim();
                proxy = proxy == null ? String.Empty : proxy.Trim();
                clientCertificate = clientCertificate == null ? String.Empty : clientCertificate.Trim();
                if(clientCertificate != String.Empty && File.Exists(clientCertificate) == false) throw new GException(23200518,23200516,ThisAssembly,clientCertificate); // nenalezen soubor {0}
                if(httpBasic || httpDigest) {
                    if(userName == null || (userName = userName.Trim()) == String.Empty) throw new GArgumentNullException(23200572,"userName");
                    if(password == null || (password = password.Trim()) == String.Empty) throw new GArgumentNullException(23200573,"password");
                } // end if
                if(httpBasic && httpDigest) throw new GArgumentException(23200574);
                // pøíprava requestu
                HttpWebRequest l_oRequest = (HttpWebRequest) WebRequest.Create(url);
                if(contentType != String.Empty) l_oRequest.ContentType = contentType;
                if(soapAction != String.Empty) l_oRequest.Headers.Add("SOAPAction",soapAction);
                if(proxy != String.Empty) l_oRequest.Proxy = new WebProxy(proxy);
                if(httpBasic || httpDigest) {
                    CredentialCache l_oCredentialCache = new CredentialCache();
                    l_oCredentialCache.Add(new Uri(url),httpBasic ? "Basic" : "Digest",new NetworkCredential(userName,password));
                    l_oRequest.Credentials = l_oCredentialCache;
                } else if(clientCertificate != String.Empty) {
                    l_oRequest.ClientCertificates.Add(GetX509Certificate(clientCertificate));
                } else l_oRequest.UseDefaultCredentials = true;
                if(timeout > 0) l_oRequest.Timeout = timeout * 1000;
                else if(timeout < 0) l_oRequest.Timeout = Timeout.Infinite;
                // vstupní data
                if(inputFile != String.Empty) {
                    long l_nInputFileLength = (new FileInfo(inputFile)).Length;
                    if(l_nInputFileLength > 0) {
                        l_oRequest.Method = "POST";
                        l_oRequest.ContentLength = l_nInputFileLength;
                        // naètení vstupních dat ze souboru
                        using(Stream l_oInputFile = File.OpenRead(inputFile)) {
                            using(Stream l_oRequestStream = l_oRequest.GetRequestStream()) {
                                CopyStream(l_oInputFile,l_oRequestStream);
                            } // end using
                        } // end using
                    } // end if
                } // end if
                // získání response
                HttpWebResponse l_oResponse = (HttpWebResponse) l_oRequest.GetResponse();
                // uloení vıstupních dat do souboru
                if(outputFile != String.Empty) {
                    using(Stream l_oResponseStream = l_oResponse.GetResponseStream()) {
                        StreamToFile(l_oResponseStream,outputFile);
                    } // end using
                } // end if
            } // end try
            catch(WebException e) {
                SaveWebException(e,outputFile);
                throw new GException(23200521,23200519,ThisAssembly,e); // pøenos dat prostøednictvím protokolu HTTP/S nebyl úspìšnı
            } // end catch
            catch(Exception e) {
                throw new GException(23200519,ThisAssembly,e); // pøenos dat prostøednictvím protokolu HTTP/S nebyl úspìšnı
            } // end catch
        } // end method

        /// <summary>naètení certifikátu ze souboru</summary>
        /// <param name="path">cesta k souboru s certifikátem</param>
        /// <returns>certifikát</returns>
        private static X509Certificate GetX509Certificate(string path) {
            try {
                return X509Certificate.CreateFromCertFile(path);
            } // end try
            catch(Exception e) {
                throw new GException(23200520,ThisAssembly,e,path); // selhal pokus o naètení certifikátu ze souboru {0}
            } // end catch
        } // end method

        /// <summary>uloení vıjimky do souboru</summary>
        /// <param name="exception">vıjimka</param>
        /// <param name="outputFile">cesta k souboru pro vıstupní data</param>
        private static void SaveWebException(WebException exception,string outputFile) {
            try {
                if(outputFile != String.Empty && exception.Response != null) {
                    using(Stream l_oResponseStream = exception.Response.GetResponseStream()) {
                        if(l_oResponseStream != null) GIOSupport.StreamToFile(l_oResponseStream,outputFile);
                    } // end using
                } // end if
            } // end try
            catch {
                // všechny vıjimky jsou ignorovány
            } // end catch
        } // end method

        #endregion

        #region podpora Base64 a Base64Url

        /// <summary>pøevod souboru z formátu Base64</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">vıstupní soubor</param>
        public static void ConvertFileFromBase64(string inputPath,string outputPath) {
            ConvertFileFromBase64(inputPath,outputPath,true);
        } // end method

        /// <summary>pøevod souboru z formátu Base64</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">vıstupní soubor</param>
        /// <param name="checkParams">pøíznak kontroly vstupních parametrù</param>
        internal static void ConvertFileFromBase64(string inputPath,string outputPath,bool checkParams) {
            try {
                // kontrola vstupních parametrù
                if(checkParams) {
                    if((inputPath = inputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200608,nameof(inputPath));
                    if(File.Exists(inputPath = Path.GetFullPath(inputPath)) == false) throw new GException(23200609,23200516,ThisAssembly,inputPath); // nenalezen soubor {0}
                    if((outputPath = outputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200610,nameof(outputPath));
                    if(Directory.Exists(Path.GetDirectoryName(outputPath = Path.GetFullPath(outputPath))) == false) throw new GException(23200611,23200517,ThisAssembly,Path.GetDirectoryName(outputPath)); // nenalezen adresáø {0}
                } // end if
                // konverze z Base64
                using(FileStream l_oIntputStream = File.Open(inputPath,FileMode.Open)) {
                    using(CryptoStream l_oCryptoStream = new CryptoStream(l_oIntputStream,new FromBase64Transform(),CryptoStreamMode.Read)) {
                        using(FileStream l_oOutputStream = File.Open(outputPath,FileMode.Create)) {
                            l_oCryptoStream.CopyTo(l_oOutputStream);
                            l_oOutputStream.Flush();
                        } // end using
                    } // end using
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200605,ThisAssembly,e); // selhal pokus o pøevod souboru z formátu Base64
            } // end catch
        } // end method

        /// <summary>pøevod souboru do formátu Base64</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">vıstupní soubor</param>
        public static void ConvertFileToBase64(string inputPath,string outputPath) {
            ConvertFileToBase64(inputPath,outputPath,true);
        } // end method

        /// <summary>pøevod souboru do formátu Base64</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">vıstupní soubor</param>
        /// <param name="checkParams">pøíznak kontroly vstupních parametrù</param>
        internal static void ConvertFileToBase64(string inputPath,string outputPath,bool checkParams) {
            try {
                // kontrola vstupních parametrù
                if(checkParams) {
                    if((inputPath = inputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200612,nameof(inputPath));
                    if(File.Exists(inputPath = Path.GetFullPath(inputPath)) == false) throw new GException(23200613,23200516,ThisAssembly,inputPath); // nenalezen soubor {0}
                    if((outputPath = outputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200614,nameof(outputPath));
                    if(Directory.Exists(Path.GetDirectoryName(outputPath = Path.GetFullPath(outputPath))) == false) throw new GException(23200615,23200517,ThisAssembly,Path.GetDirectoryName(outputPath)); // nenalezen adresáø {0}
                } // end if
                // konverze do Base64
                using(FileStream l_oOutputStream = File.Open(outputPath,FileMode.Create)) {
                    using(CryptoStream l_oCryptoStream = new CryptoStream(l_oOutputStream,new ToBase64Transform(),CryptoStreamMode.Write)) {
                        using(FileStream l_oIntputStream = File.Open(inputPath,FileMode.Open)) {
                            l_oIntputStream.CopyTo(l_oCryptoStream);
                            l_oCryptoStream.FlushFinalBlock();
                        } // end using
                        l_oOutputStream.Flush();
                    } // end using
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200606,ThisAssembly,e); // selhal pokus o pøevod souboru do formátu Base64
            } // end catch
        } // end method

        /// <summary>konverze souboru z formátu Base64URL</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">vıstupní soubor</param>
        public static void ConvertFileFromBase64Url(string inputPath,string outputPath) {
            ConvertFileFromBase64Url(inputPath,outputPath,true);
        } // end method

        /// <summary>konverze souboru z formátu Base64URL</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">vıstupní soubor</param>
        /// <param name="checkParams">pøíznak kontroly vstupních parametrù</param>
        internal static void ConvertFileFromBase64Url(string inputPath,string outputPath,bool checkParams) {
            GTempFile l_oTempFile = null;
            try {
                // kontrola vstupních parametrù
                if(checkParams) {
                    if((inputPath = inputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200616,nameof(inputPath));
                    if(File.Exists(inputPath = Path.GetFullPath(inputPath)) == false) throw new GException(23200617,23200516,ThisAssembly,inputPath); // nenalezen soubor {0}
                    if((outputPath = outputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200618,nameof(outputPath));
                    if(Directory.Exists(Path.GetDirectoryName(outputPath = Path.GetFullPath(outputPath))) == false) throw new GException(23200619,23200517,ThisAssembly,Path.GetDirectoryName(outputPath)); // nenalezen adresáø {0}
                } // end if
                // konverze do Base64
                l_oTempFile = new GTempFile(Path.GetDirectoryName(outputPath));
                using(StreamWriter l_oStreamWriter = new StreamWriter(l_oTempFile.Path)) {
                    int l_nLength = 0;
                    using(StreamReader l_oStreamReader = new StreamReader(inputPath)) {
                        char l_cChar;
                        while(l_oStreamReader.EndOfStream == false) {
                            switch(l_cChar = (char) l_oStreamReader.Read()) {
                                case '-': l_oStreamWriter.Write('+'); break;
                                case '_': l_oStreamWriter.Write('/'); break;
                                default: l_oStreamWriter.Write(l_cChar); break;
                            } // end switch
                            l_nLength++;
                        } // end if
                    } // end using
                    int l_nPadding = 3 - ((l_nLength + 3) % 4);
                    l_oStreamWriter.Write(l_nPadding == 0 ? String.Empty : new string('=',l_nPadding));
                    l_oStreamWriter.Flush();
                } // end using
                // konverze z Base64
                ConvertFileFromBase64(l_oTempFile.Path,outputPath,false);
            } // end try
            catch(Exception e) {
                throw new GException(23200624,ThisAssembly,e); // selhal pokus o pøevod souboru z formátu Base64URL
            } // end catch
            finally {
                if(l_oTempFile != null) GTempFiles.DeleteTempFile(l_oTempFile.Path);
            } // end finally
        } // end method

        /// <summary>konverze souboru do formátu Base64URL</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">vıstupní soubor</param>
        public static void ConvertFileToBase64Url(string inputPath,string outputPath) {
            ConvertFileToBase64Url(inputPath,outputPath,true);
        } // end method

        /// <summary>konverze souboru do formátu Base64URL</summary>
        /// <param name="inputPath">vstupní soubor</param>
        /// <param name="outputPath">vıstupní soubor</param>
        /// <param name="checkParams">pøíznak kontroly vstupních parametrù</param>
        internal static void ConvertFileToBase64Url(string inputPath,string outputPath,bool checkParams) {
            GTempFile l_oTempFile = null;
            try {
                // kontrola vstupních parametrù
                if(checkParams) {
                    if((inputPath = inputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200620,nameof(inputPath));
                    if(File.Exists(inputPath = Path.GetFullPath(inputPath)) == false) throw new GException(23200621,23200516,ThisAssembly,inputPath); // nenalezen soubor {0}
                    if((outputPath = outputPath.NotNullTrimmed()) == String.Empty) throw new GArgumentNullException(23200622,nameof(outputPath));
                    if(Directory.Exists(Path.GetDirectoryName(outputPath = Path.GetFullPath(outputPath))) == false) throw new GException(23200623,23200517,ThisAssembly,Path.GetDirectoryName(outputPath)); // nenalezen adresáø {0}
                } // end if
                // konverze do Base64
                l_oTempFile = new GTempFile(Path.GetDirectoryName(outputPath));
                ConvertFileToBase64(inputPath,l_oTempFile.Path,false);
                // konverze z Base64
                using(StreamWriter l_oStreamWriter = new StreamWriter(outputPath)) {
                    using(StreamReader l_oStreamReader = new StreamReader(l_oTempFile.Path)) {
                        char l_cChar;
                        while(l_oStreamReader.EndOfStream == false) {
                            switch(l_cChar = (char) l_oStreamReader.Read()) {
                                case '+': l_oStreamWriter.Write('-'); break;
                                case '/': l_oStreamWriter.Write('_'); break;
                                case '=': break;
                                default: l_oStreamWriter.Write(l_cChar); break;
                            } // end switch
                        } // end if
                    } // end using
                    l_oStreamWriter.Flush();
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200625,ThisAssembly,e); // selhal pokus o pøevod souboru do formátu Base64URL
            } // end catch
            finally {
                if(l_oTempFile != null) GTempFiles.DeleteTempFile(l_oTempFile.Path);
            } // end finally
        }  // end method

        #endregion

    } // end class

} // end namespace
