//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GZip.cs                            </Name>
//    <Description> podpora pro komprimaci a dekomprimaci metodou ZIP </Description>
//    <Author>      Jan Kuttich                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                  </Copyright>
//    <Created>     2010-08-12                                        </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using Ionic.Zip;

namespace Gordic.General {
  
    /// <summary>podpora pro komprimaci a dekomprimaci metodou ZIP</summary>
    /// <remarks>tøída je založena na volnì dostupné komponentì DotNetZip (viz. http://dotnetzip.codeplex.com/)</remarks>
    [System.Security.SecurityCritical]    
    public class GZip : IGObject {

        #region výètové typy

        /// <summary>
        /// Pøepínaè, zda se pøi rozzipování má uplatit cesta obsažená v archivu a nebo zda se soubor má rozzipovat pøímo do zadaného adresáøe bez doplnìní cesty obsažené v archivu
        /// </summary>
        public enum FlattenFoldersOnExtractEnum {
            /// <summary>
            /// Pøi rozzipování se nebude pøidávat cesta obsažená z archivu
            /// </summary>
            yes,
            /// <summary>
            /// Pøi rozzipování se do cílového adresáøe pøidá cesta obsažená v archivu a teprve do ní se uloží rozzipované soubory
            /// </summary>
            no
        } // end enum

        #endregion

        #region vlastnosti

        /// <summary>výchozí kódování</summary>
        public static Encoding DefaultEncoding {
            get { return Encoding.GetEncoding(Thread.CurrentThread.CurrentCulture.TextInfo.OEMCodePage); }
        } // end property

        /// <summary>výchozí nastavení pro ètení archivu</summary>
        private static ReadOptions DefaultOptions {
            get { return new ReadOptions { Encoding = DefaultEncoding }; }
        } // end property

        /// <summary>seznam nepovolených znakù v cestì k souboru</summary>
        private static char[] InvalidPathChars { get; } = Path.GetInvalidFileNameChars().Except(new char[] { '/','\\' }).ToArray();

        /// <summary>lokální assembly</summary>
        private static Assembly ThisAssembly {
            get {return typeof(GZip).Assembly;}
        } // end property

        #endregion

        #region veøejné metody pro komprimaci

        /// <summary>komprimace</summary>
        /// <param name="sourceMask">maska pro zdrojové soubory (napø. c:\tmp\*.* )</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="password">heslo pro práci se zip archivem</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>v pøípadì existence specifikovaného zip souboru, bude tento pøepsán novým archivem</remarks>
        public static void Zip(string sourceMask,string zipFile,string password,int compressionLevel = -1) {
            Zip(sourceMask,zipFile,password,true,true,null,compressionLevel);
        } // end method

        /// <summary>komprimace</summary>
        /// <param name="sourceMask">maska pro zdrojové soubory (napø. c:\tmp\*.* )</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="password">heslo pro práci se zip archivem</param>
        /// <param name="recurseSubdirs">pøíznak zpracování podadresáøù</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>v pøípadì existence specifikovaného zip souboru, bude tento pøepsán novým archivem</remarks>
        public static void Zip(string sourceMask,string zipFile,string password,bool recurseSubdirs,int compressionLevel = -1) {
            Zip(sourceMask,zipFile,password,true,recurseSubdirs,null,compressionLevel);
        } // end method

        /// <summary>komprimace</summary>
        /// <param name="sourceMask">maska pro zdrojové soubory (napø. c:\tmp\*.* )</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>v pøípadì existence specifikovaného zip souboru, bude tento pøepsán novým archivem</remarks>
        public static void Zip(string sourceMask,string zipFile,int compressionLevel = -1) {
            Zip(sourceMask,zipFile,String.Empty,true,true,null,compressionLevel);
        } // end method

        /// <summary>komprimace</summary>
        /// <param name="sourceMask">maska pro zdrojové soubory (napø. c:\tmp\*.* )</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="recurseSubdirs">pøíznak zpracování podadresáøù</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>v pøípadì existence specifikovaného zip souboru, bude tento pøepsán novým archivem</remarks>
        public static void Zip(string sourceMask,string zipFile,bool recurseSubdirs,int compressionLevel = -1) {
            Zip(sourceMask,zipFile,String.Empty,true,recurseSubdirs,null,compressionLevel);
        } // end method

        /// <summary>komprimace celého obsahu adresáøe</summary>
        /// <param name="directoryPath">cesta ke zdrojovému adresáøi</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>v pøípadì existence specifikovaného zip souboru, bude tento pøepsán novým archivem</remarks>
        public static void ZipDirectoryContent(string directoryPath,string zipFile,int compressionLevel = -1) {
            ZipDirectoryContent(directoryPath,zipFile,String.Empty,true,compressionLevel);
        } // end method

        /// <summary>komprimace celého obsahu adresáøe</summary>
        /// <param name="directoryPath">cesta ke zdrojovému adresáøi</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="password">heslo pro práci se zip archivem</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>v pøípadì existence specifikovaného zip souboru, bude tento pøepsán novým archivem</remarks>
        public static void ZipDirectoryContent(string directoryPath,string zipFile,string password,int compressionLevel = -1) {
            ZipDirectoryContent(directoryPath,zipFile,password,true,compressionLevel);
        } // end method

        /// <summary>pøidání souborù do existujícího zip archivu</summary>
        /// <param name="sourceMask">maska pro zdrojové soubory (napø. c:\tmp\*.* )</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="password">heslo pro práci se zip archivem</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>pokud specifikovaný zip soubor nebude existovat, bude vytvoøen nový archiv</remarks>
        public static void ZipAdd(string sourceMask,string zipFile,string password,int compressionLevel = -1) {
            Zip(sourceMask,zipFile,password,false,true,null,compressionLevel);
        } // end method

        /// <summary>pøidání souborù do existujícího zip archivu</summary>
        /// <param name="fileName">název souboru, pod kterým má být uložen vstupní proud do zip archivu</param>
        /// <param name="inputStream">vstupní proud</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="password">heslo pro práci se zip archivem</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>pokud specifikovaný zip soubor nebude existovat, bude vytvoøen nový archiv</remarks>
        public static void ZipAdd(string zipFile,string fileName,Stream inputStream,string password,int compressionLevel = -1) {
            Zip(fileName,zipFile,password,false,true,inputStream,compressionLevel);
        } // end method

        /// <summary>pøidání souborù do existujícího zip archivu</summary>
        /// <param name="sourceMask">maska pro zdrojové soubory (napø. c:\tmp\*.* )</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="password">heslo pro práci se zip archivem</param>
        /// <param name="recurseSubdirs">pøíznak zpracování podadresáøù</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>pokud specifikovaný zip soubor nebude existovat, bude vytvoøen nový archiv</remarks>
        public static void ZipAdd(string sourceMask,string zipFile,string password,bool recurseSubdirs,int compressionLevel = -1) {
            Zip(sourceMask,zipFile,password,false,recurseSubdirs,null,compressionLevel);
        } // end method

        /// <summary>pøidání souborù do existujícího zip archivu</summary>
        /// <param name="sourceMask">maska pro zdrojové soubory (napø. c:\tmp\*.* )</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>pokud specifikovaný zip soubor nebude existovat, bude vytvoøen nový archiv</remarks>
        public static void ZipAdd(string sourceMask,string zipFile,int compressionLevel = -1) {
            Zip(sourceMask,zipFile,String.Empty,false,true,null,compressionLevel);
        } // end method

        /// <summary>pøidání souborù do existujícího zip archivu</summary>
        /// <param name="fileName">název souboru, pod kterým má být uložen vstupní proud do zip archivu</param>
        /// <param name="inputStream">vstupní proud</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>pokud specifikovaný zip soubor nebude existovat, bude vytvoøen nový archiv</remarks>
        public static void ZipAdd(string zipFile,string fileName,Stream inputStream,int compressionLevel = -1) {
            Zip(fileName,zipFile,String.Empty,false,true,inputStream,compressionLevel);
        } // end method

        /// <summary>pøidání souborù do existujícího zip archivu</summary>
        /// <param name="sourceMask">maska pro zdrojové soubory (napø. c:\tmp\*.* )</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="recurseSubdirs">pøíznak zpracování podadresáøù</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>pokud specifikovaný zip soubor nebude existovat, bude vytvoøen nový archiv</remarks>
        public static void ZipAdd(string sourceMask,string zipFile,bool recurseSubdirs,int compressionLevel = -1) {
            Zip(sourceMask,zipFile,String.Empty,false,recurseSubdirs,null,compressionLevel);
        } // end method

        /// <summary>pøidání obsahu adresáøe do existujícího zip archivu</summary>
        /// <param name="directoryPath">cesta ke zdrojovému adresáøi</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        /// <remarks>pokud specifikovaný zip soubor nebude existovat, bude vytvoøen nový archiv</remarks>
        public static void ZipAddDirectoryContent(string directoryPath,string zipFile,int compressionLevel = -1) {
            ZipDirectoryContent(directoryPath,zipFile,String.Empty,false,compressionLevel);
        } // end method

        /// <summary>komprimace vstupního proudu do souboru</summary>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="fileName">název souboru, pod kterým má být uložen vstupní proud do zip archivu</param>
        /// <param name="inputStream">vstupní proud</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        public static void Zip(string zipFile,string fileName,Stream inputStream,int compressionLevel = -1) {
            Zip(zipFile,null,fileName,inputStream,String.Empty,compressionLevel);
        } // end method

        /// <summary>komprimace vstupního proudu do souboru</summary>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="fileName">název souboru, pod kterým má být uložen vstupní proud do zip archivu</param>
        /// <param name="inputStream">vstupní proud</param>
        /// <param name="password">heslo pro zašifrování zip souboru</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        public static void Zip(string zipFile,string fileName,Stream inputStream,string password,int compressionLevel = -1) {
            Zip(zipFile,null,fileName,inputStream,password,compressionLevel);
        } // end method

        /// <summary>komprimace souboru ze vstupního proudu do výstupního proudu</summary>
        /// <param name="outputStream">výstupní proud pro uložení komprimovaného zip archivu</param>
        /// <param name="fileName">název souboru, pod kterým má být uložen vstupní proud do zip archivu</param>
        /// <param name="inputStream">vstupní proud se souborem ke komprimaci</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        public static void Zip(Stream outputStream,string fileName,Stream inputStream,int compressionLevel = -1) {
            Zip(null,outputStream,fileName,inputStream,String.Empty,compressionLevel);
        } // end method

        /// <summary>komprimace souboru ze vstupního proudu do výstupního proudu</summary>
        /// <param name="outputStream">výstupní proud pro uložení komprimovaného zip archivu</param>
        /// <param name="fileName">název souboru, pod kterým má být uložen vstupní proud do zip archivu</param>
        /// <param name="inputStream">vstupní proud se souborem ke komprimaci</param>
        /// <param name="password">heslo pro zašifrování zip archivu</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        public static void Zip(Stream outputStream,string fileName,Stream inputStream,string password,int compressionLevel = -1) {
            Zip(null,outputStream,fileName,inputStream,password,compressionLevel);
        } // end method

        /// <summary>komprimace</summary>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="inputNames">názvy souborù pro komprimaci</param>
        /// <param name="archiveNames">názvy souboru, pod kterým mají být uloženy do zip archivu. Pokud není uvedeno, použije se název souboru bez cesty z inputNames</param>
        /// <param name="password">heslo pro šifrování zip souboru</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        public static void ZipMultipleFiles(string zipFile, string[] inputNames, string[] archiveNames = null, string password = null, int compressionLevel = -1)
        {
            TextWriter l_oConsoleOut = Console.Out;
            StreamWriter l_oStreamWriter = null;
            var l_streams = new List<Stream>(inputNames.Length);
            try
            {
                // kontrola parametrù
                if (zipFile == null || (zipFile = zipFile.Trim()) == String.Empty) throw new GArgumentException(21000089, nameof(zipFile));
                // komprimace
                using (Ionic.Zip.ZipFile l_oZipFile = new Ionic.Zip.ZipFile(DefaultEncoding))
                {
                    // nastavení hesla
                    if (password != null && password != String.Empty) l_oZipFile.Password = password;
                    // nastavení kompresního pomìru
                    if (compressionLevel != -1) l_oZipFile.CompressionLevel = GetCompressionLevel(compressionLevel);
                    // nastavení použití rozšíøení ZIP64 
                    l_oZipFile.UseZip64WhenSaving = Zip64Option.AsNecessary;
                    l_oZipFile.ParallelDeflateThreshold = -1;
                    // pøesmìrování konzoly
                    l_oStreamWriter = new StreamWriter(new MemoryStream(256));
                    Console.SetOut(l_oStreamWriter);

                    for (int i = 0; i < inputNames.Length; i++)
                    {
                        var l_file = inputNames[i];
                        var l_archiveName = archiveNames?[i] ?? Path.GetFileName(l_file);
                        var inputStream = File.Open(l_file, FileMode.Open, FileAccess.Read, FileShare.ReadWrite /*nutné - soubor mùže být ještì nìkde držen */);
                        l_streams.Add(inputStream);
                        l_oZipFile.AddEntry(l_archiveName, inputStream);
                    }

                    // odmazání pùvodního souboru
                    if (File.Exists(zipFile)) File.Delete(zipFile);
                    // spuštìní komprimace
                    l_oZipFile.Save(zipFile);
                } // end using
            } // end try
            catch (Exception e)
            {
                throw new GException(21000088, 23200277, ThisAssembly, e, zipFile); //RC-EX 23200277 : selhal pokus o komprimaci dat do souboru {0}
            } // end catch
            finally
            {
                foreach (var inputStream in l_streams) inputStream.Close();
                if (l_oStreamWriter != null) l_oStreamWriter.Close();
                Console.SetOut(l_oConsoleOut);
            } // end finally
        } // end method

        #endregion

        #region veøejné metody pro dekomprimaci

        /// <summary>dekomprimace</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        public static void Unzip(string sourceFile,string destination) {
            Unzip(sourceFile,null,destination,null,true);
        } // end method

        /// <summary>dekomprimace</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        public static void Unzip(string sourceFile,string destination,string password) {
            Unzip(sourceFile,null,destination,password,true);
        } // end method

        /// <summary>dekomprimace</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="recurseSubdirs">pøíznak dekomprimace vèetnì obsahu podadresáøù</param>
        public static void Unzip(string sourceFile,string destination,bool recurseSubdirs) {
            Unzip(sourceFile,null,destination,null,recurseSubdirs);
        } // end method

        /// <summary>dekomprimace</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        /// <param name="recurseSubdirs">pøíznak dekomprimace vèetnì obsahu podadresáøù</param>
        public static void Unzip(string sourceFile,string destination,string password,bool recurseSubdirs) {
            Unzip(sourceFile,null,destination,password,recurseSubdirs);
        } // end method

        /// <summary>dekomprimace</summary>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        public static void Unzip(Stream inputStream,string destination) {
            Unzip(null,inputStream,destination,null,true);
        } // end method

        /// <summary>dekomprimace</summary>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        public static void Unzip(Stream inputStream,string destination,string password) {
            Unzip(null,inputStream,destination,password,true);
        } // end method

        /// <summary>dekomprimace</summary>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="recurseSubdirs">pøíznak dekomprimace vèetnì obsahu podadresáøù</param>
        public static void Unzip(Stream inputStream,string destination,bool recurseSubdirs) {
            Unzip(null,inputStream,destination,null,recurseSubdirs);
        } // end method

        /// <summary>dekomprimace</summary>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        /// <param name="recurseSubdirs">pøíznak dekomprimace vèetnì obsahu podadresáøù</param>
        public static void Unzip(Stream inputStream,string destination,string password,bool recurseSubdirs) {
            Unzip(null,inputStream,destination,password,recurseSubdirs);
        } // end method

        /// <summary>dekomprimace jednoho souboru do výstupního proudu</summary>
        /// <param name="zipFile">zdrojový zip soubor</param>
        /// <param name="fileName">název souboru uvnitø zip archivu, který má být dekomprimován</param>
        /// <param name="outputStream">výstupní proud pro zápis dekomprimovaných dat</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        public static void Unzip(string zipFile,string fileName,Stream outputStream,string password) {
            Unzip(zipFile,null,fileName,null,outputStream,password,false);
        } // end method

        /// <summary>dekomprimace jednoho souboru do výstupního proudu</summary>
        /// <param name="zipFile">zdrojový zip soubor</param>
        /// <param name="fileName">název souboru uvnitø zip archivu, který má být dekomprimován</param>
        /// <param name="outputStream">výstupní proud pro zápis dekomprimovaných dat</param>
        public static void Unzip(string zipFile,string fileName,Stream outputStream) {
            Unzip(zipFile,null,fileName,null,outputStream,null,false);
        } // end method

        /// <summary>dekomprimace jednoho souboru do výstupního proudu</summary>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem</param>
        /// <param name="fileName">název souboru uvnitø zip archivu, který má být dekomprimován</param>
        /// <param name="outputStream">výstupního proudu pro dekomprimovaný soubor</param>
        /// <param name="password">heslo pro dešifrování</param>
        public static void Unzip(Stream inputStream,string fileName,Stream outputStream,string password) {
            Unzip(null,inputStream,fileName,null,outputStream,password,false);
        } // end method

        /// <summary>dekomprimace jednoho souboru do výstupního proudu</summary>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem</param>
        /// <param name="fileName">název souboru uvnitø zip archivu, který má být dekomprimován</param>
        /// <param name="outputStream">výstupního proudu pro dekomprimovaný soubor</param>
        public static void Unzip(Stream inputStream,string fileName,Stream outputStream) {
            Unzip(null,inputStream,fileName,null,outputStream,null,false);
        } // end method

        /// <summary>dekomprimace prvního souboru v zipu do výstupního proudu</summary>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem</param>
        /// <param name="outputStream">výstupního proudu pro dekomprimovaný soubor</param>
        /// <param name="password">heslo pro dešifrování</param>
        public static void Unzip(Stream inputStream,Stream outputStream,string password) {
            Unzip(null,inputStream,null,null,outputStream,password,true);
        } // end method

        /// <summary>dekomprimace prvního souboru v zipu do výstupního proudu</summary>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem</param>
        /// <param name="outputStream">výstupního proudu pro dekomprimovaný soubor</param>
        public static void Unzip(Stream inputStream,Stream outputStream) {
            Unzip(null,inputStream,null,null,outputStream,null,true);
        } // end method

        /// <summary>dekomprimace jednoho souboru</summary>
        /// <param name="zipFile">zdrojový zip soubor</param>
        /// <param name="fileName">název souboru uvnitø zip archivu, který má být dekomprimován</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaného souboru</param>
        public static void UnzipOneFile(string zipFile,string fileName,string destination) {
            Unzip(zipFile,null,fileName,destination,null,null,false);
        } // end method

        /// <summary>dekomprimace jednoho souboru</summary>
        /// <param name="zipFile">zdrojový zip soubor</param>
        /// <param name="fileName">název souboru uvnitø zip archivu, který má být dekomprimován</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaného souboru</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        public static void UnzipOneFile(string zipFile,string fileName,string destination,string password) {
            Unzip(zipFile,null,fileName,destination,null,password,false);
        } // end method

        /// <summary>dekomprimace s omezením dekomprimovaných souborù</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="selectionCriteria">maska pro omezení dekomprimovaných souborù</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <remarks>popis syntaxe pro zápis masky lze najít na adrese http://cheeso.members.winisp.net/DotNetZipHelp/html/4469abe7-8fa4-101e-975d-305d2fd0affb.htm</remarks>
        public static void UnzipWithMask(string sourceFile,string selectionCriteria,string destination) {
            Unzip(sourceFile,selectionCriteria,null,destination,null,FlattenFoldersOnExtractEnum.no);
        } // end method

        /// <summary>dekomprimace s omezením dekomprimovaných souborù</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="selectionCriteria">maska pro omezení dekomprimovaných souborù</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        /// <remarks>popis syntaxe pro zápis masky lze najít na adrese http://cheeso.members.winisp.net/DotNetZipHelp/html/4469abe7-8fa4-101e-975d-305d2fd0affb.htm</remarks>
        public static void UnzipWithMask(string sourceFile,string selectionCriteria,string destination,string password) {
            Unzip(sourceFile,selectionCriteria,null,destination,password,FlattenFoldersOnExtractEnum.no);
        } // end method

        /// <summary>dekomprimace s omezením dekomprimovaných souborù</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="selectionCriteria">maska pro omezení dekomprimovaných souborù</param>
        /// <param name="directoryInArchive">cesta k dekomprimovaným souborùm v archivu</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        /// <remarks>popis syntaxe pro zápis masky lze najít na adrese http://cheeso.members.winisp.net/DotNetZipHelp/html/4469abe7-8fa4-101e-975d-305d2fd0affb.htm</remarks>
        public static void UnzipWithMask(string sourceFile,string selectionCriteria,string directoryInArchive,string destination,string password) {
            Unzip(sourceFile,selectionCriteria,directoryInArchive,destination,password,FlattenFoldersOnExtractEnum.no);
        } // end method

        /// <summary>dekomprimace s omezením dekomprimovaných souborù</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="selectionCriteria">maska pro omezení dekomprimovaných souborù</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="flattenFoldersOnExtract">FFIALA 2019-02-20 - Pøíznak, že soubor se má rozzipovat pouze do cílového adresáøe bez použití cesty uvedené v archivu. 
        /// Výchozí chování døíve bylo false a tak se soubory rozzipovávaly vèetnì cesty uložené v ZIPu</param>
        /// <remarks>popis syntaxe pro zápis masky lze najít na adrese http://cheeso.members.winisp.net/DotNetZipHelp/html/4469abe7-8fa4-101e-975d-305d2fd0affb.htm</remarks>
        public static void UnzipWithMask(string sourceFile, string selectionCriteria, string destination, FlattenFoldersOnExtractEnum flattenFoldersOnExtract) {
            Unzip(sourceFile, selectionCriteria, null, destination, null, flattenFoldersOnExtract);
        } // end method

        /// <summary>dekomprimace s omezením dekomprimovaných souborù</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="selectionCriteria">maska pro omezení dekomprimovaných souborù</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        /// <param name="flattenFoldersOnExtract">FFIALA 2019-02-20 - Pøíznak, že soubor se má rozzipovat pouze do cílového adresáøe bez použití cesty uvedené v archivu. 
        /// Výchozí chování døíve bylo false a tak se soubory rozzipovávaly vèetnì cesty uložené v ZIPu</param>
        /// <remarks>popis syntaxe pro zápis masky lze najít na adrese http://cheeso.members.winisp.net/DotNetZipHelp/html/4469abe7-8fa4-101e-975d-305d2fd0affb.htm</remarks>
        public static void UnzipWithMask(string sourceFile, string selectionCriteria, string destination, string password, FlattenFoldersOnExtractEnum flattenFoldersOnExtract ) {
            Unzip(sourceFile, selectionCriteria, null, destination, password, flattenFoldersOnExtract);
        } // end method

        /// <summary>dekomprimace s omezením dekomprimovaných souborù</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="selectionCriteria">maska pro omezení dekomprimovaných souborù</param>
        /// <param name="directoryInArchive">cesta k dekomprimovaným souborùm v archivu</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        /// <param name="flattenFoldersOnExtract">FFIALA 2019-02-20 - Pøíznak, že soubor se má rozzipovat pouze do cílového adresáøe bez použití cesty uvedené v archivu. 
        /// Výchozí chování døíve bylo false a tak se soubory rozzipovávaly vèetnì cesty uložené v ZIPu</param>
        /// <remarks>popis syntaxe pro zápis masky lze najít na adrese http://cheeso.members.winisp.net/DotNetZipHelp/html/4469abe7-8fa4-101e-975d-305d2fd0affb.htm</remarks>
        public static void UnzipWithMask(string sourceFile, string selectionCriteria, string directoryInArchive, string destination, string password, FlattenFoldersOnExtractEnum flattenFoldersOnExtract ) {
            Unzip(sourceFile, selectionCriteria, directoryInArchive, destination, password, flattenFoldersOnExtract);
        } // end method

        /// <summary>dekomprimace prvního souboru</summary>
        /// <param name="zipFile">zdrojový zip soubor</param>
        /// <param name="destination">cesta k existujícímu souboru nebo adresáøi pro uložení dekomprimovaných dat</param>
        public static void UnzipFirstFile(string zipFile,string destination) {
            try {
                if(File.Exists(destination)) {
                    // dekomprimace do existujícího souboru
                    using(FileStream l_oStream = new FileStream(destination,FileMode.Create,FileAccess.Write,FileShare.None)) {
                        Unzip(zipFile,null,null,null,l_oStream,null,true);
                    } // end using
                } else {
                    // dekomprimace do adresáøe
                    Unzip(zipFile,null,null,destination,null,null,true);
                } // end if
            } // end try
            catch(Exception e) {
                if(e is GException == false) e = new GException(23200588,23200260,ThisAssembly,e,zipFile); // selhal pokus o dekomprimaci dat ze souboru {0}
                throw e;
            } // end catch
        } // end method

        /// <summary>dekomprimace prvního souboru</summary>
        /// <param name="zipFile">zdrojový zip soubor</param>
        /// <param name="outputStream">výstupního proudu pro dekomprimovaný soubor</param>
        public static void UnzipFirstFile(string zipFile,Stream outputStream) {
            Unzip(zipFile,null,null,null,outputStream,null,true);
        } // end method

        /// <summary>dekomprimace prvního souboru</summary>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem</param>
        /// <param name="destination">cesta k existujícímu souboru nebo adresáøi pro uložení dekomprimovaných dat</param>
        public static void UnzipFirstFile(Stream inputStream,string destination) {
            try {
                if(File.Exists(destination)) {
                    // dekomprimace do existujícího souboru
                    using(FileStream l_oStream = new FileStream(destination,FileMode.Create,FileAccess.Write,FileShare.None)) {
                        Unzip(null,inputStream,null,null,l_oStream,null,true);
                    } // end using
                } else {
                    // dekomprimace do adresáøe
                    Unzip(null,inputStream,null,destination,null,null,true);
                } // end if
            } // end try
            catch(Exception e) {
                if(e is GException == false) e = new GException(23200589,23200379,ThisAssembly,e); // selhal pokus o dekomprimaci dat ze vstupního proudu
                throw e;
            } // end catch
        } // end method

        /// <summary>dekomprimace prvního souboru</summary>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem</param>
        /// <param name="outputStream">výstupního proudu pro dekomprimovaný soubor</param>
        public static void UnzipFirstFile(Stream inputStream,Stream outputStream) {
            Unzip(null,inputStream,null,null,outputStream,null,true);
        } // end method

        #endregion

        #region veøejné metody pro získání seznamu souborù uvnitø zipu

        /// <summary>získání seznamu souborù obsažených uvnitø zip souboru</summary>
        /// <param name="zipFile">cesta ke komprimovanému zip souboru</param>
        /// <returns>seznamu souborù obsažených uvnitø zip souboru</returns>
        public static string[] GetIncludedFiles(string zipFile) {
            return GetIncludedFiles(zipFile,null);
        } // end method

        /// <summary>získání seznamu souborù obsažených uvnitø zip souboru</summary>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem</param>
        /// <returns>seznamu souborù obsažených uvnitø zip souboru</returns>
        public static string[] GetIncludedFiles(Stream inputStream) {
            return GetIncludedFiles(null,inputStream);
        } // end method

        /// <summary>test, zda zip archiv obsahuje požadovaný soubor</summary>
        /// <param name="zipFile">cesta ke komprimovanému zip souboru</param>
        /// <param name="requestedFile">název požadovaného souboru vèetnì pøípadné relativní cesty ( pøíklad zápisu relativní cesty: adresáø/soubor.txt )</param>
        /// <returns>true v pøípadì, že zip archiv obsahuje požadovaný soubor, jinak false</returns>
        public static bool ContainsFile(string zipFile,string requestedFile) {
            string[] l_asFiles = GetIncludedFiles(zipFile);
            foreach(string l_sFile in l_asFiles) {
                if(String.Compare(l_sFile,requestedFile,true) == 0) return true;
            } // end foreach
            return false;
        } // end method

        /// <summary>získání informací o souboru uvnitø komprimovaného archivu</summary>
        /// <param name="zipFile">cesta ke komprimovanému zip souboru</param>
        /// <param name="requestedFile">název požadovaného souboru</param>
        /// <param name="compressedSize">komprimovaná velikost souboru v Bytech</param>
        /// <param name="uncompressedSize">pùvodní velikost souboru v Bytech</param>
        /// <param name="modifiedTime">èas poslední modifikace souboru</param>
        public static void GetFileInfo(string zipFile,string requestedFile,out long compressedSize,out long uncompressedSize,out DateTime modifiedTime) {
            if(GetFileInfoIfExists(zipFile,requestedFile,out compressedSize,out uncompressedSize,out modifiedTime) == false) {
                throw new GException(23200407,23200268,ThisAssembly,requestedFile); // ve zdrojovém archivu nebyl nalezen požadovaný soubor {0}
            } // end if
        } // end method

        /// <summary>získání informací o souboru uvnitø komprimovaného archivu</summary>
        /// <param name="zipFile">cesta ke komprimovanému zip souboru</param>
        /// <param name="requestedFile">název požadovaného souboru</param>
        /// <param name="compressedSize">komprimovaná velikost souboru v Bytech</param>
        /// <param name="uncompressedSize">pùvodní velikost souboru v Bytech</param>
        /// <param name="modifiedTime">èas poslední modifikace souboru</param>
        /// <returns>true pokud soubor v archivu existuje</returns>
        public static bool GetFileInfoIfExists(string zipFile, string requestedFile, out long compressedSize, out long uncompressedSize, out DateTime modifiedTime) {
            try {
                // inicializace výstupních hodnot
                compressedSize = -1;
                uncompressedSize = -1;
                modifiedTime = DateTime.MinValue;
                // kontrola parametrù
                if(zipFile == null || (zipFile = zipFile.Trim()) == String.Empty) throw new GArgumentException(23200405);
                if(requestedFile == null || (requestedFile = requestedFile.Trim()) == String.Empty) throw new GArgumentException(23200406);
                // naètení archivu
                using(Ionic.Zip.ZipFile l_oZipFile = Ionic.Zip.ZipFile.Read(zipFile,DefaultOptions)) {
                    // náhrada nepovolených znakù v cestách
                    ReplaceInvalidPathChars(l_oZipFile);
                    // dohledání souboru
                    ZipEntry l_oZipEntry = l_oZipFile[requestedFile];
                    if(l_oZipEntry == null) return false;
                    else {
                        compressedSize = l_oZipEntry.CompressedSize;
                        uncompressedSize = l_oZipEntry.UncompressedSize;
                        modifiedTime = l_oZipEntry.LastModified;
                        return true;
                    } // end if
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200408,ThisAssembly,e,zipFile); // selhal pokus o získání informací o souboru uvnitø komprimovaného archivu {0}
            } // end catch
        } // end method

        #endregion

        #region obecné veøejné metody

        /// <summary>kontrola konzistentnosti zip souboru</summary>
        /// <param name="zipFile">cesta k zip souboru</param>
        /// <returns>true pokud je zip v poøádku, jinak false</returns>
        public static bool CheckZip(string zipFile) {
            try {
                // kontrola parametrù
                if(zipFile == null || (zipFile = zipFile.Trim()) == String.Empty) throw new GArgumentException(23200399);
                // kontrola konzistentnosti
                return Ionic.Zip.ZipFile.CheckZip(zipFile);
            } // end try
            catch(Exception e) {
                throw new GException(23200400,ThisAssembly,e,zipFile); // selhal pokus o provedení kontroly konzistentnosti zip souboru {0}
            } // end catch
        } // end method

        #endregion

        #region soukromé metody

        /// <summary>komprimace</summary>
        /// <param name="sourceMask">maska pro zdrojové soubory (napø. c:\tmp\*.* )</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="password">heslo pro šifrování zip souboru</param>
        /// <param name="newArchive">pøíznak požadavku na vytvoøení nového archivu</param>
        /// <param name="recurseSubdirs">pøíznak zpracování podadresáøù</param>
        /// <param name="inputStream">vstupní proud (pokud je null, je sourceMask maska, jinak jen jmeno souboru tohoto streamu)</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        private static void Zip(string sourceMask,string zipFile,string password,bool newArchive,bool recurseSubdirs,Stream inputStream = null,int compressionLevel = -1) {
            TextWriter l_oConsoleOut = Console.Out;
            StreamWriter l_oStreamWriter = null;
            try {
                // kontrola parametrù
                if(sourceMask == null || (sourceMask = sourceMask.Trim()) == String.Empty) throw new GArgumentException(23200274);
                if(zipFile == null || (zipFile = zipFile.Trim()) == String.Empty) throw new GArgumentException(23200275);
                // komprimace
                using(Ionic.Zip.ZipFile l_oZipFile = newArchive ? new Ionic.Zip.ZipFile(DefaultEncoding) : Ionic.Zip.ZipFile.Read(zipFile,DefaultOptions)) {
                    // nastavení hesla
                    if(password != null && password != String.Empty) l_oZipFile.Password = password;
                    // nastavení kompresního pomìru
                    if(compressionLevel != -1) l_oZipFile.CompressionLevel = GetCompressionLevel(compressionLevel);
                    // nastavení použití rozšíøení ZIP64 
                    l_oZipFile.UseZip64WhenSaving = Zip64Option.AsNecessary;
                    l_oZipFile.ParallelDeflateThreshold = -1;
                    // pøesmìrování konzoly
                    l_oStreamWriter = new StreamWriter(new MemoryStream(256));
                    Console.SetOut(l_oStreamWriter);
                    if (inputStream == null) {
                        // pøidání souborù a adresáøù do zip archivu
                        ZipFiles(l_oZipFile,Path.GetFileName(sourceMask),Path.GetDirectoryName(sourceMask),String.Empty,recurseSubdirs);
                    } else l_oZipFile.AddEntry(sourceMask,inputStream);
                    // kontrola na nalezení alespoò jednoho souboru
                    if(l_oZipFile.Entries.Count == 0) throw new GException(23200276,ThisAssembly,sourceMask); // zadané masce {0} neodpovídají žádné soubory
                    // odmazání pùvodního souboru
                    if(newArchive && File.Exists(zipFile)) File.Delete(zipFile);
                    // spuštìní komprimace
                    l_oZipFile.Save(zipFile);
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200277,ThisAssembly,e,zipFile); // selhal pokus o komprimaci dat do souboru {0}
            } // end catch
            finally {
                if(l_oStreamWriter != null) l_oStreamWriter.Close();
                Console.SetOut(l_oConsoleOut);
            } // end finally
        } // end method

        /// <summary>pøidání souborù a adresáøù do zip archivu</summary>
        /// <param name="zipFile">instance zip archivu</param>
        /// <param name="sourceMask">maska pro zdrojové soubory</param>
        /// <param name="sourcePath">cesta ke zdrojovým souborùm</param>
        /// <param name="destPath">cílová cesta</param>
        /// <param name="recurseSubdirs">pøíznak zpracování podadresáøù</param>
        private static void ZipFiles(Ionic.Zip.ZipFile zipFile,string sourceMask,string sourcePath,string destPath,bool recurseSubdirs) {
            string[] files = Directory.GetFiles(sourcePath,sourceMask);
            zipFile.AddFiles(files,destPath);
            if(recurseSubdirs) {
                foreach(var l_sSubdir in new DirectoryInfo(sourcePath).EnumerateDirectories()) {
                    string l_sSourcePath = Path.Combine(sourcePath,l_sSubdir.Name);
                    string l_sDestPath = Path.Combine(destPath,l_sSubdir.Name);
                    zipFile.AddDirectoryByName(l_sDestPath);
                    ZipFiles(zipFile,sourceMask,l_sSourcePath,l_sDestPath,recurseSubdirs);
                } // end foreach
            } // end if
        } // end method

        /// <summary>komprimace celého obsahu adresáøe</summary>
        /// <param name="directoryPath">cesta ke zdrojovému adresáøi</param>
        /// <param name="zipFile">cílový zip soubor</param>
        /// <param name="password">heslo pro zašifrování zip archivu</param>
        /// <param name="newArchive">pøíznak požadavku na vytvoøení nového archivu</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        private static void ZipDirectoryContent(string directoryPath,string zipFile,string password,bool newArchive,int compressionLevel = -1) {
            if(directoryPath==null || (directoryPath=directoryPath.Trim())==String.Empty) throw new GArgumentException(23200278);
            if(Directory.Exists(directoryPath) == false) throw new GException(23200279,ThisAssembly,directoryPath); // komprimaci nelze provést, adresáø {0} nebyl nalezen
            Zip(Path.Combine(directoryPath,"*"),zipFile,password,newArchive,true,null,compressionLevel);
        } // end method

        /// <summary>komprimace vstupního proudu</summary>
        /// <param name="zipFile">cílový zip soubor pro uložení zip archivu</param>
        /// <param name="outputStream">výstupní proud pro uložení zip archivu (pokud je null, pøedpokládá se komprimace do souboru)</param>
        /// <param name="fileName">název souboru, pod kterým má být uložen vstupní proud do zip archivu</param>
        /// <param name="inputStream">vstupní proud</param>
        /// <param name="password">heslo pro zašifrování zip archivu</param>
        /// <param name="compressionLevel">kompresní pomìr od 0 do 9 (0=žádná komprese, 9=nejlepší komprese), ostatní hodnoty znamenají použití výchozího kompresního pomìru</param>
        private static void Zip(string zipFile,Stream outputStream,string fileName,Stream inputStream,string password,int compressionLevel = -1) {
            try {
                // kontrola parametrù
                if(outputStream==null && (zipFile == null || (zipFile = zipFile.Trim()) == String.Empty)) throw new GArgumentException(23200269);
                if(fileName == null || (fileName = fileName.Trim()) == String.Empty) throw new GArgumentException(23200270);
                if(inputStream == null) throw new GArgumentException(23200271);
                // odmazání pùvodního souboru
                if(outputStream == null && File.Exists(zipFile)) File.Delete(zipFile);
                // komprimace
                using(ZipOutputStream l_oOutputStream = outputStream == null ? new ZipOutputStream(zipFile): new ZipOutputStream(outputStream,true)) {
                    // nastavení výchozího kódování pro názvy souborù
                    l_oOutputStream.AlternateEncoding = DefaultEncoding;
                    l_oOutputStream.AlternateEncodingUsage = ZipOption.Always;
                    // nastavení hesla
                    if (password != null && password != String.Empty) l_oOutputStream.Password = password;
                    // nastavení kompresního pomìru
                    if(compressionLevel != -1) l_oOutputStream.CompressionLevel = GetCompressionLevel(compressionLevel);
                    // vložení souboru
                    l_oOutputStream.PutNextEntry(fileName);
                    // zápis dat do archivu
                    byte[] l_abyBuffer = new byte[10 * 1024];
                    int l_nReadBytes = 0;
                    if(inputStream.CanSeek) inputStream.Position = 0;
                    while((l_nReadBytes = inputStream.Read(l_abyBuffer,0,l_abyBuffer.Length)) > 0) {
                        l_oOutputStream.Write(l_abyBuffer,0,l_nReadBytes);
                    } // end while
                } // end using
            } // end try
            catch(Exception e) {
                if(outputStream == null) throw new GException(23200273,23200277,ThisAssembly,e,zipFile); // selhal pokus o komprimaci dat do souboru {0}
                else throw new GException(23200272,ThisAssembly,e); // selhal pokus o komprimaci dat do výstupního proudu
            } // end catch
        } // end method
        
        /// <summary>dekomprimace</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem (pokud je null, pøedpokládá se dekomprimace ze souboru)</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        /// <param name="recurseSubdirs">pøíznak dekomprimace vèetnì obsahu podadresáøù</param>
        private static void Unzip(string sourceFile,Stream inputStream,string destination,string password,bool recurseSubdirs) {
            try {
                // kontrola parametrù
                if(inputStream == null && (sourceFile == null || (sourceFile = sourceFile.Trim()) == String.Empty)) throw new GArgumentException(23200257);
                if(destination == null || (destination = destination.Trim()) == String.Empty) throw new GArgumentException(23200258);
                // dekomprimace
                if(String.IsNullOrEmpty(password) == false || TryExtractAllFiles(sourceFile,inputStream,destination,recurseSubdirs) == false) {
                    // dekomprimace prostøednictvím Ionic.Zip
                    if(inputStream != null && inputStream.CanSeek) inputStream.Position = 0;
                    using(Ionic.Zip.ZipFile l_oZipFile = inputStream == null ? Ionic.Zip.ZipFile.Read(sourceFile,DefaultOptions) : Ionic.Zip.ZipFile.Read(inputStream,DefaultOptions)) {
                        // nastavení hesla
                        if(password != null && password != String.Empty) l_oZipFile.Password = password;
                        // náhrada nepovolených znakù v cestách
                        ReplaceInvalidPathChars(l_oZipFile);
                        // dekomprimace
                        foreach(ZipEntry l_oZipEntry in l_oZipFile) {
                            if(recurseSubdirs == false && (Path.GetDirectoryName(l_oZipEntry.FileName) != String.Empty || l_oZipEntry.IsDirectory)) continue;
                            l_oZipEntry.Extract(destination,ExtractExistingFileAction.OverwriteSilently);
                        } // end foreach
                    } // end using
                } // end if
            } // end try
            catch(Exception e) {
                if(inputStream == null) {
                    if(sourceFile != null && sourceFile != String.Empty && destination != null && destination != String.Empty) throw new GException(23200259,ThisAssembly,e,sourceFile,destination); // selhal pokus o dekomprimaci dat ze souboru {0} do adresáøe {1}
                    else throw new GException(23200260,ThisAssembly,e,sourceFile); // selhal pokus o dekomprimaci dat ze souboru {0}
                } else throw new GException(23200379,ThisAssembly,e); // selhal pokus o dekomprimaci dat ze vstupního proudu
            } // end catch
        } // end method

        /// <summary>dekomprimace jednoho souboru</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem (pokud je null, pøedpokládá se dekomprimace ze souboru)</param>
        /// <param name="fileName">název souboru uvnitø zip archivu, který má být dekomprimován</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="outputStream">výstupní proud pro zápis dekomprimovaných dat</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        /// <param name="firstFile">pøíznak dekomprimace prvního souboru ze zip archivu bez ohledu na jeho název</param>
        private static void Unzip(string sourceFile,Stream inputStream,string fileName,string destination,Stream outputStream,string password,bool firstFile) {
            try {
                // kontrola parametrù
                if(inputStream == null && (sourceFile == null || (sourceFile = sourceFile.Trim()) == String.Empty)) throw new GArgumentException(23200264);
                if(firstFile == false && (fileName == null || (fileName = fileName.TrimEnd()) == String.Empty)) throw new GArgumentException(23200265);
                if(outputStream == null && (destination == null || (destination = destination.Trim()) == String.Empty)) throw new GArgumentException(23200266);
                // dekomprimace
                if(String.IsNullOrEmpty(password) == false || TryExtractOneFile(sourceFile,inputStream,fileName,destination,outputStream,firstFile) == false) {
                    // dekomprimace prostøednictvím Ionic.Zip
                    if(inputStream != null && inputStream.CanSeek) inputStream.Position = 0;
                    using(Ionic.Zip.ZipFile l_oZipFile = inputStream == null ? Ionic.Zip.ZipFile.Read(sourceFile,DefaultOptions) : Ionic.Zip.ZipFile.Read(inputStream,DefaultOptions)) {
                        // nastavení hesla
                        if(password != null && password != String.Empty) l_oZipFile.Password = password;
                        // náhrada nepovolených znakù v cestách
                        ReplaceInvalidPathChars(l_oZipFile);
                        // dekomprimace
                        ZipEntry l_oZipEntry = null;
                        if(firstFile) {
                            if(l_oZipFile.Count > 0) {
                                foreach(Ionic.Zip.ZipEntry l_oEntry in l_oZipFile.Entries.ToList()) {
                                    if(l_oEntry.IsDirectory == false) {
                                        l_oZipEntry = l_oEntry;
                                        break;
                                    } // end if
                                } // end foreach
                            } // end if
                            if(l_oZipEntry == null) throw new GException(23200267,ThisAssembly); // zdrojový archiv neobsahuje žádný soubor
                        } else {
                            l_oZipEntry = l_oZipFile[fileName];
                            if(l_oZipEntry == null) throw new GException(23200268,ThisAssembly,fileName); // ve zdrojovém archivu nebyl nalezen požadovaný soubor {0}
                        } // end if
                        if(outputStream == null) l_oZipEntry.Extract(destination,ExtractExistingFileAction.OverwriteSilently);
                        else l_oZipEntry.Extract(outputStream);
                    } // end using
                } // end using
            } // end try
            catch(Exception e) {
                if(inputStream == null) throw new GException(23200380,23200260,ThisAssembly,e,sourceFile); // selhal pokus o dekomprimaci dat ze souboru {0}
                else throw new GException(23200381,23200379,ThisAssembly,e); // selhal pokus o dekomprimaci dat ze vstupního proudu
            } // end catch
            finally {
                if(outputStream != null && outputStream.CanSeek) outputStream.Position = 0;
            } // end finally
        } // end method

        /// <summary>dekomprimace</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="selectionCriteria">maska pro omezení dekomprimovaných souborù</param>
        /// <param name="directoryInArchive">cesta k dekomprimovaným souborùm v archivu</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="password">heslo pro dešifrování zip souboru</param>
        /// <param name="flattenFoldersOnExtract">FFIALA 2019-02-20 - Pøíznak, že soubor se má rozzipovat pouze do cílového adresáøe bez použití cesty uvedené v archivu. 
        /// Výchozí chování døíve bylo false a tak se soubory rozzipovávaly vèetnì cesty uložené v ZIPu</param>
        /// <remarks>popis syntaxe pro zápis masky lze najít na adrese http://cheeso.members.winisp.net/DotNetZipHelp/html/4469abe7-8fa4-101e-975d-305d2fd0affb.htm</remarks>
        private static void Unzip(string sourceFile,string selectionCriteria,string directoryInArchive,string destination,string password,FlattenFoldersOnExtractEnum flattenFoldersOnExtract = FlattenFoldersOnExtractEnum.no ) {
            TextWriter l_oConsoleOut = Console.Out;
            StreamWriter l_oStreamWriter = null;
            try {
                // kontrola parametrù
                if(sourceFile == null || (sourceFile = sourceFile.Trim()) == String.Empty) throw new GArgumentException(23200401);
                if(selectionCriteria == null || (selectionCriteria = selectionCriteria.Trim()) == String.Empty) throw new GArgumentException(23200402);
                if(destination == null || (destination = destination.Trim()) == String.Empty) throw new GArgumentException(23200403);
                // dekomprimace
                using(Ionic.Zip.ZipFile l_oZipFile = Ionic.Zip.ZipFile.Read(sourceFile, DefaultOptions)) {
                    // nastavení hesla
                    if(password != null && password != String.Empty) l_oZipFile.Password = password;
                    // pøesmìrování konzoly
                    l_oStreamWriter = new StreamWriter(new MemoryStream(256));
                    Console.SetOut(l_oStreamWriter);
                    // náhrada nepovolených znakù v cestách
                    ReplaceInvalidPathChars(l_oZipFile);
                    // dekomprimace
                    l_oZipFile.FlattenFoldersOnExtract = ( flattenFoldersOnExtract == FlattenFoldersOnExtractEnum.yes );
                    l_oZipFile.ExtractSelectedEntries(selectionCriteria,directoryInArchive,destination, ExtractExistingFileAction.OverwriteSilently );
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200404,23200259,ThisAssembly,e,sourceFile,destination); // selhal pokus o dekomprimaci dat ze souboru {0} do adresáøe {1}
            } // end catch
            finally {
                if(l_oStreamWriter != null) l_oStreamWriter.Close();
                Console.SetOut(l_oConsoleOut);
            } // end finally
        } // end method

        /// <summary>získání seznamu souborù obsažených uvnitø zip souboru</summary>
        /// <param name="sourceFile">cesta ke komprimovanému zip souboru</param>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem (pokud je null, pøedpokládá se vstup ze souboru)</param>
        /// <returns>seznamu souborù obsažených uvnitø zip souboru</returns>
        private static string[] GetIncludedFiles(string sourceFile,Stream inputStream) {
            try {
                // kontrola parametrù
                if(inputStream == null && (sourceFile == null || (sourceFile = sourceFile.Trim()) == String.Empty)) throw new GArgumentException(23200261);
                // dekomprimace
                if(inputStream != null && inputStream.CanSeek) inputStream.Position = 0;
                using(Ionic.Zip.ZipFile l_oZipFile = inputStream == null ? Ionic.Zip.ZipFile.Read(sourceFile,DefaultOptions) : Ionic.Zip.ZipFile.Read(inputStream,DefaultOptions)) {
                    if(l_oZipFile.Count == 0) throw new GException(23200262,23200267,ThisAssembly); // zdrojový archiv neobsahuje žádný soubor
                    // náhrada nepovolených znakù v cestách
                    ReplaceInvalidPathChars(l_oZipFile);
                    //získání seznamu souborù
                    string [] l_asIncludedFiles = new string[l_oZipFile.Count];
                    l_oZipFile.EntryFileNames.CopyTo(l_asIncludedFiles,0);
                    return l_asIncludedFiles;
                } // end using
            } // end try
            catch(Exception e) {
                throw new GException(23200263,ThisAssembly,e,sourceFile); // selhal pokus o získání seznamu souborù obsažených uvnitø archivu {0}
            } // end catch
        } // end method

        /// <summary>získání kompresního pomìru</summary>
        /// <param name="compressionLevel">kompresní pomìr</param>
        /// <returns>kompresní pomìr</returns>
        private static Ionic.Zlib.CompressionLevel GetCompressionLevel(int compressionLevel) {
            switch(compressionLevel) {
                case 0: return Ionic.Zlib.CompressionLevel.Level0;
                case 1: return Ionic.Zlib.CompressionLevel.Level1;
                case 2: return Ionic.Zlib.CompressionLevel.Level2;
                case 3: return Ionic.Zlib.CompressionLevel.Level3;
                case 4: return Ionic.Zlib.CompressionLevel.Level4;
                case 5: return Ionic.Zlib.CompressionLevel.Level5;
                case 6: return Ionic.Zlib.CompressionLevel.Level6;
                case 7: return Ionic.Zlib.CompressionLevel.Level7;
                case 8: return Ionic.Zlib.CompressionLevel.Level8;
                case 9: return Ionic.Zlib.CompressionLevel.Level9;
                default: return Ionic.Zlib.CompressionLevel.Default;
            } // end switch
        } // end method

        /// <summary>náhrada nepovolených znakù v cestách k souborùm</summary>
        /// <param name="zipFile">instance zip archivu</param>
        private static void ReplaceInvalidPathChars(Ionic.Zip.ZipFile zipFile) {
            foreach(Ionic.Zip.ZipEntry l_oEntry in zipFile.Entries.ToList()) {
                l_oEntry.FileName = ReplaceInvalidPathChars(l_oEntry.FileName);
            } // end foreach
        } // end method

        /// <summary>náhrada nepovolených znakù v cestì k souboru</summary>
        /// <param name="path">cesta k souboru</param>
        /// <returns>cesta k souboru bez nepovolených znakù</returns>
        private static string ReplaceInvalidPathChars(string path) {
            StringBuilder l_oStringBuilder = new StringBuilder(path.Length);
            int i = 0;
            // pøeskoèení jmenovky svazku
            if(
                path.Length > 3 &&
                ((path[0] >= 'a' && path[0] <= 'z') || (path[0] >= 'A' && path[0] <= 'Z')) &&
                path[1] == ':' &&
                path[2] == '\\'
            ) {
                l_oStringBuilder.Append(path.Substring(0,3));
                i = 3;
            } // end if
            // zbytek cesty
            for( ;i< path.Length; i++) {
                if(path[i] == '/') l_oStringBuilder.Append('\\');
                else l_oStringBuilder.Append(InvalidPathChars.Contains(path[i]) ? '_' : path[i]);
            } // end for
            return l_oStringBuilder.ToString();
        } // end method

        #endregion

        #region dekomprimace pomocí System.IO.Compression

        /// <summary>dekomprimace celého archivu prostøednictvím System.IO.Compression s ošetøením výjimek</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem (pokud je null, pøedpokládá se dekomprimace ze souboru)</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="recurseSubdirs">pøíznak dekomprimace vèetnì obsahu podadresáøù</param>
        /// <returns>pøíznak úspìšné dekomprimace</returns>
        private static bool TryExtractAllFiles(string sourceFile,Stream inputStream,string destination,bool recurseSubdirs) {
            try {
                if(inputStream == null) ExtractAllFiles(sourceFile,destination,recurseSubdirs,true,true,false);
                else ExtractAllFiles(inputStream,destination,recurseSubdirs,true,true,false);
                return true;
            } // end try
            catch {
                return false;
            } // end catch
        } // end if

        /// <summary>dekomprimace celého archivu</summary>
        /// <param name="sourceFile">cesta ke zdrojovému souboru se zip archivem</param>
        /// <param name="targetDirectory">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="browseSubdirs">pøíznak zahrnutí souborù z podadresáøù v archivu, nebude-li nastaven, dekomprimace probìhne pouze na úrovni souborù v hlavní složce archivu</param>
        /// <param name="keepSubdirs">pøíznak zachování relativních cest podadresáøù v archivu pøi dekomprimaci, nebude-li nastaven, budou soubory uloženy pøímo do cílového adresáøe</param>
        /// <param name="overwriteExisting">pøíznak pøepsání existujících souborù, nebude-li nastaven, dekomprinace neprobìhne a bude ponechán stávající soubor</param>
        /// <param name="skipEmpty">pøíznak dekomprimace prázdných souborù, bude-li nastaven, prázdné soubory v archivu budou pøi dekomprimaci pøeskoèeny</param>
        /// <returns>poèet dekomprimovaných souborù</returns>
        private static int ExtractAllFiles(string sourceFile,string targetDirectory,bool browseSubdirs,bool keepSubdirs,bool overwriteExisting,bool skipEmpty) {
            int l_nExtractedFiles = 0;
            using(var l_oZipArchive = System.IO.Compression.ZipFile.Open(sourceFile,ZipArchiveMode.Read,DefaultEncoding)) {
                targetDirectory = NormalizeDirectoryPath(targetDirectory);
                foreach(var l_oZipEntry in l_oZipArchive.Entries) {
                    if(browseSubdirs || String.Compare(l_oZipEntry.Name,l_oZipEntry.FullName,true) == 0) {
                        if(ExtractToFile(l_oZipEntry,targetDirectory,keepSubdirs,overwriteExisting,skipEmpty)) l_nExtractedFiles++;
                    } // end if
                } // end foreach
            } // end using
            return l_nExtractedFiles;
        } // end method

        /// <summary>dekomprimace celého archivu</summary>
        /// <param name="sourceStream">cesta ke zdrojovému streamu se zip archivem</param>
        /// <param name="targetDirectory">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="browseSubdirs">pøíznak zahrnutí souborù z podadresáøù v archivu, nebude-li nastaven, dekomprimace probìhne pouze na úrovni souborù v hlavní složce archivu</param>
        /// <param name="keepSubdirs">pøíznak zachování relativních cest podadresáøù v archivu pøi dekomprimaci, nebude-li nastaven, budou soubory uloženy pøímo do cílového adresáøe</param>
        /// <param name="overwriteExisting">pøíznak pøepsání existujících souborù, nebude-li nastaven, dekomprinace neprobìhne a bude ponechán stávající soubor</param>
        /// <param name="skipEmpty">pøíznak dekomprimace prázdných souborù, bude-li nastaven, prázdné soubory v archivu budou pøi dekomprimaci pøeskoèeny</param>
        /// <returns>poèet dekomprimovaných souborù</returns>
        private static int ExtractAllFiles(Stream sourceStream,string targetDirectory,bool browseSubdirs,bool keepSubdirs,bool overwriteExisting,bool skipEmpty) {
            int l_nExtractedFiles = 0;
            if(sourceStream.CanSeek) sourceStream.Seek(0,SeekOrigin.Begin);
            using(var l_oZipArchive = new System.IO.Compression.ZipArchive(sourceStream,ZipArchiveMode.Read,true,DefaultEncoding)) {
                targetDirectory = NormalizeDirectoryPath(targetDirectory);
                foreach(var l_oZipEntry in l_oZipArchive.Entries) {
                    if(browseSubdirs || String.Compare(l_oZipEntry.Name,l_oZipEntry.FullName,true) == 0) {
                        if(ExtractToFile(l_oZipEntry,targetDirectory,keepSubdirs,overwriteExisting,skipEmpty)) l_nExtractedFiles++;
                    } // end if
                } // end foreach
            } // end using
            return l_nExtractedFiles;
        } // end method

        /// <summary>>dekomprimace jednoho souboru prostøednictvím System.IO.Compression s ošetøením výjimek</summary>
        /// <param name="sourceFile">zdrojový zip soubor</param>
        /// <param name="inputStream">vstupní proud s komprimovaným zip souborem (pokud je null, pøedpokládá se dekomprimace ze souboru)</param>
        /// <param name="fileName">název souboru uvnitø zip archivu, který má být dekomprimován</param>
        /// <param name="destination">cesta k adresáøi pro uložení dekomprimovaných souborù</param>
        /// <param name="outputStream">výstupní proud pro zápis dekomprimovaných dat</param>
        /// <param name="firstFile">pøíznak dekomprimace prvního souboru ze zip archivu bez ohledu na jeho název</param>
        /// <returns>pøíznak úspìšné dekomprimace</returns>
        public static bool TryExtractOneFile(string sourceFile,Stream inputStream,string fileName,string destination,Stream outputStream,bool firstFile) {
            bool l_bExtracted = false;
            try {
                if(firstFile) fileName = String.Empty;
                if(inputStream == null) {
                    if(outputStream == null) l_bExtracted = ExtractOneFile(sourceFile,fileName,destination,true,true,true,false);
                    else l_bExtracted = ExtractOneFile(sourceFile,fileName,outputStream,true,false);
                } else {
                    if(outputStream == null) l_bExtracted = ExtractOneFile(inputStream,fileName,destination,true,true,true,false);
                    else l_bExtracted = ExtractOneFile(inputStream,fileName,outputStream,true,false);
                } // end if
            } // end try
            catch {
                return false;
            } // end catch
            if(l_bExtracted == false) {
                if(fileName == String.Empty) throw new GException(23200584,23200267,ThisAssembly); // zdrojový archiv neobsahuje žádný soubor
                else if(NormalizeFileName(fileName) != String.Empty) throw new GException(23200585,23200268,ThisAssembly,fileName); // ve zdrojovém archivu nebyl nalezen požadovaný soubor {0}
            } // end if
            return true;
        } // end method

        /// <summary>dekomprimace jednoho souboru z archivu</summary>
        /// <param name="sourceFile">cesta ke zdrojovému souboru se zip archivem</param>
        /// <param name="fileName">název požadovaného souboru v archivu, nebude-li vyplnìn, bude dekomprimován první soubor z archivu</param>
        /// <param name="targetDirectory">cesta k adresáøi pro uložení dekomprimovaného souboru</param>
        /// <param name="browseSubdirs">pøíznak zahrnutí souborù z podadresáøù v archivu, nebude-li nastaven, dekomprimace probìhne pouze na úrovni souborù v hlavní složce archivu</param>
        /// <param name="keepSubdirs">pøíznak zachování relativní cesty podadresáøe v archivu pøi dekomprimaci, nebude-li nastaven, bude soubor uložen pøímo do cílového adresáøe</param>
        /// <param name="overwriteExisting">pøíznak pøepsání existujících souborù, nebude-li nastaven, dekomprinace neprobìhne a bude ponechán stávající soubor</param>
        /// <param name="skipEmpty">pøíznak dekomprimace prázdných souborù, bude-li nastaven, prázdné soubory v archivu budou pøi dekomprimaci pøeskoèeny</param>
        /// <returns>true pokud dekomprimace probìhla, jinak false</returns>
        private static bool ExtractOneFile(string sourceFile,string fileName,string targetDirectory,bool browseSubdirs,bool keepSubdirs,bool overwriteExisting,bool skipEmpty) {
            using(var l_oZipArchive = System.IO.Compression.ZipFile.Open(sourceFile,ZipArchiveMode.Read,DefaultEncoding)) {
                fileName = NormalizeFilePath(fileName);
                foreach(var l_oZipEntry in l_oZipArchive.Entries) {
                    if(browseSubdirs || String.Compare(l_oZipEntry.Name,l_oZipEntry.FullName,true) == 0) {
                        if(fileName == String.Empty || String.Compare(NormalizeFilePath(l_oZipEntry.FullName),fileName,true) == 0) {
                            if(ExtractToFile(l_oZipEntry,NormalizeDirectoryPath(targetDirectory),keepSubdirs,overwriteExisting,skipEmpty)) return true;
                        } // end if
                    } // end if
                } // end foreach
            } // end using
            return false;
        } // end method

        /// <summary>dekomprimace jednoho souboru z archivu</summary>
        /// <param name="sourceFile">cesta ke zdrojovému souboru se zip archivem</param>
        /// <param name="fileName">název požadovaného souboru v archivu, nebude-li vyplnìn, bude dekomprimován první soubor z archivu</param>
        /// <param name="targetStream">cesta k cílovému streamu pro uložení dekomprimovaného souboru</param>
        /// <param name="browseSubdirs">pøíznak zahrnutí souborù z podadresáøù v archivu, nebude-li nastaven, dekomprimace probìhne pouze na úrovni souborù v hlavní složce archivu</param>
        /// <param name="skipEmpty">pøíznak dekomprimace prázdných souborù, bude-li nastaven, prázdné soubory v archivu budou pøi dekomprimaci pøeskoèeny</param>
        /// <returns>true pokud dekomprimace probìhla, jinak false</returns>
        private static bool ExtractOneFile(string sourceFile,string fileName,Stream targetStream,bool browseSubdirs,bool skipEmpty) {
            using(var l_oZipArchive = System.IO.Compression.ZipFile.Open(sourceFile,ZipArchiveMode.Read,DefaultEncoding)) {
                fileName = NormalizeFilePath(fileName);
                foreach(var l_oZipEntry in l_oZipArchive.Entries) {
                    if(browseSubdirs || String.Compare(l_oZipEntry.Name,l_oZipEntry.FullName,true) == 0) {
                        if(fileName == String.Empty || String.Compare(NormalizeFilePath(l_oZipEntry.FullName),fileName,true) == 0) {
                            if(ExtractToStream(l_oZipEntry,targetStream,skipEmpty)) return true;
                        } // end if
                    } // end if
                } // end foreach
            } // end using
            return false;
        } // end method

        /// <summary>dekomprimace jednoho souboru z archivu</summary>
        /// <param name="sourceStream">cesta ke zdrojovému streamu se zip archivem</param>
        /// <param name="fileName">název požadovaného souboru v archivu, nebude-li vyplnìn, bude dekomprimován první soubor z archivu</param>
        /// <param name="targetDirectory">cesta k adresáøi pro uložení dekomprimovaného souboru</param>
        /// <param name="browseSubdirs">pøíznak zahrnutí souborù z podadresáøù v archivu, nebude-li nastaven, dekomprimace probìhne pouze na úrovni souborù v hlavní složce archivu</param>
        /// <param name="keepSubdirs">pøíznak zachování relativní cesty podadresáøe v archivu pøi dekomprimaci, nebude-li nastaven, bude soubor uložen pøímo do cílového adresáøe</param>
        /// <param name="overwriteExisting">pøíznak pøepsání existujících souborù, nebude-li nastaven, dekomprinace neprobìhne a bude ponechán stávající soubor</param>
        /// <param name="skipEmpty">pøíznak dekomprimace prázdných souborù, bude-li nastaven, prázdné soubory v archivu budou pøi dekomprimaci pøeskoèeny</param>
        /// <returns>true pokud dekomprimace probìhla, jinak false</returns>
        private static bool ExtractOneFile(Stream sourceStream,string fileName,string targetDirectory,bool browseSubdirs,bool keepSubdirs,bool overwriteExisting,bool skipEmpty) {
            if(sourceStream.CanSeek) sourceStream.Seek(0,SeekOrigin.Begin);
            using(var l_oZipArchive = new System.IO.Compression.ZipArchive(sourceStream,ZipArchiveMode.Read,true,DefaultEncoding)) {
                fileName = NormalizeFilePath(fileName);
                foreach(var l_oZipEntry in l_oZipArchive.Entries) {
                    if(browseSubdirs || String.Compare(l_oZipEntry.Name,l_oZipEntry.FullName,true) == 0) {
                        if(fileName == String.Empty || String.Compare(NormalizeFilePath(l_oZipEntry.FullName),fileName,true) == 0) {
                            if(ExtractToFile(l_oZipEntry,NormalizeDirectoryPath(targetDirectory),keepSubdirs,overwriteExisting,skipEmpty)) return true;
                        } // end if
                    } // end if
                } // end foreach
            } // end using
            return false;
        } // end method

        /// <summary>dekomprimace jednoho souboru z archivu</summary>
        /// <param name="sourceStream">cesta ke zdrojovému streamu se zip archivem</param>
        /// <param name="fileName">název požadovaného souboru v archivu, nebude-li vyplnìn, bude dekomprimován první soubor z archivu</param>
        /// <param name="targetStream">cesta k cílovému streamu pro uložení dekomprimovaného souboru</param>
        /// <param name="browseSubdirs">pøíznak zahrnutí souborù z podadresáøù v archivu, nebude-li nastaven, dekomprimace probìhne pouze na úrovni souborù v hlavní složce archivu</param>
        /// <param name="skipEmpty">pøíznak dekomprimace prázdných souborù, bude-li nastaven, prázdné soubory v archivu budou pøi dekomprimaci pøeskoèeny</param>
        /// <returns>true pokud dekomprimace probìhla, jinak false</returns>
        private static bool ExtractOneFile(Stream sourceStream,string fileName,Stream targetStream,bool browseSubdirs,bool skipEmpty) {
            if(sourceStream.CanSeek) sourceStream.Seek(0,SeekOrigin.Begin);
            using(var l_oZipArchive = new System.IO.Compression.ZipArchive(sourceStream,ZipArchiveMode.Read,true,DefaultEncoding)) {
                fileName = NormalizeFilePath(fileName);
                foreach(var l_oZipEntry in l_oZipArchive.Entries) {
                    if(browseSubdirs || String.Compare(l_oZipEntry.Name,l_oZipEntry.FullName,true) == 0) {
                        if(fileName == String.Empty || String.Compare(NormalizeFilePath(l_oZipEntry.FullName),fileName,true) == 0) {
                            if(ExtractToStream(l_oZipEntry,targetStream,skipEmpty)) return true;
                        } // end if
                    } // end if
                } // end foreach
            } // end using
            return false;
        } // end method

        /// <summary>dekomprimace do souboru</summary>
        /// <param name="zipEntry">komprimovaný soubor v archivu</param>
        /// <param name="targetDirectory">cesta k adresáøi pro uložení dekomprimovaného souboru</param>
        /// <param name="keepSubdirs">pøíznak zachování relativní cesty podadresáøe v archivu pøi dekomprimaci, nebude-li nastaven, bude soubor uložen pøímo do cílového adresáøe</param>
        /// <param name="overwriteExisting">pøíznak pøepsání existujících souborù, nebude-li nastaven, dekomprinace neprobìhne a bude ponechán stávající soubor</param>
        /// <param name="skipEmpty">pøíznak dekomprimace prázdných souborù, bude-li nastaven, prázdné soubory v archivu budou pøi dekomprimaci pøeskoèeny</param>
        /// <returns>true pokud dekomprimace probìhla, jinak false</returns>
        private static bool ExtractToFile(System.IO.Compression.ZipArchiveEntry zipEntry,string targetDirectory,bool keepSubdirs,bool overwriteExisting,bool skipEmpty) {
            bool l_bExtracted = false;
            if(zipEntry.Name != String.Empty && (skipEmpty == false || zipEntry.Length > 0)) {
                string l_sFile = Path.Combine(targetDirectory,keepSubdirs ? zipEntry.FullName : zipEntry.Name);
                l_sFile = ReplaceInvalidPathChars(l_sFile);
                l_sFile = AvoidPathOverstep(targetDirectory,l_sFile);
                if(overwriteExisting || File.Exists(l_sFile) == false) {
                    Directory.CreateDirectory(Path.GetDirectoryName(l_sFile));
                    zipEntry.ExtractToFile(l_sFile,true);
                    l_bExtracted = true;
                } // end if
            } // end if
            return l_bExtracted;
        } // end method

        /// <summary>dekomprimace do streamu</summary>
        /// <param name="zipEntry">komprimovaný soubor v archivu</param>
        /// <param name="targetStream">cesta k cílovému streamu pro uložení dekomprimovaného souboru</param>
        /// <param name="skipEmpty">pøíznak dekomprimace prázdných souborù, bude-li nastaven, prázdné soubory v archivu budou pøi dekomprimaci pøeskoèeny</param>
        /// <returns>true pokud dekomprimace probìhla, jinak false</returns>
        private static bool ExtractToStream(System.IO.Compression.ZipArchiveEntry zipEntry,Stream targetStream,bool skipEmpty) {
            bool l_bExtracted = false;
            if(skipEmpty == false || zipEntry.Length > 0) {
                using(Stream l_oSourceStream = zipEntry.Open()) {
                    //GIOSupport.CopyStream(l_oSourceStream,targetStream);
                    l_oSourceStream.CopyTo(targetStream);
                } // end using
                if(targetStream.CanSeek) targetStream.Seek(0,SeekOrigin.Begin);
                l_bExtracted = true;
            } // end using
            return l_bExtracted;
        } // end method

        /// <summary>normalizace cesty k souboru</summary>
        /// <param name="path">cesta k souboru</param>
        /// <returns>normalizovaná cesta k souboru</returns>
        private static string NormalizeFilePath(string path) {
            path = path?.Trim() ?? String.Empty;
            return path.IndexOf('/') < 0 ? path : path.Replace('/','\\');
        } // end method

        /// <summary>normalizace názvu souboru</summary>
        /// <param name="file">soubor</param>
        /// <returns>normalizovaný název souboru</returns>
        private static string NormalizeFileName(string file) {
            return String.IsNullOrWhiteSpace(file) ? String.Empty : Path.GetFileName(file).Trim();
        } // end method

        /// <summary>normalizace cesty k adresáøi</summary>
        /// <param name="path">cesta k adresáøi</param>
        /// <returns>normalizovaná cesta k adresáøi</returns>
        private static string NormalizeDirectoryPath(string path) {
            return (path = Path.GetFullPath(path)).EndsWith(Path.DirectorySeparatorChar.ToString(),StringComparison.Ordinal) ? path : path + Path.DirectorySeparatorChar;
        } // end method

        /// <summary>zamezení pøekroèení cesty cílového adresáøe</summary>
        /// <param name="targetDirectory">cesta k cílovému adresáøi</param>
        /// <param name="file">cesta k souboru</param>
        /// <returns>cesta k souboru omezená cílovým adresáøem</returns>
        private static string AvoidPathOverstep(string targetDirectory,string file) {
            string l_sPath = NormalizeDirectoryPath(Path.GetDirectoryName(file));
            if(l_sPath.StartsWith(targetDirectory,StringComparison.OrdinalIgnoreCase) == false) l_sPath = targetDirectory;
            return Path.Combine(l_sPath,Path.GetFileName(file));
        } // end if

        #endregion

    } // end class

} // end namespace
