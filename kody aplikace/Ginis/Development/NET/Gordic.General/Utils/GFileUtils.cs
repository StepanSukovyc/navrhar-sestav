//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GFileUtils.cs                                </Name>
//    <Description> Pomocné, obecné funkce                                      </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-12-05                                                  </Created>
//  </FileHeader>

using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ZXing;

namespace Gordic.General
{
    /// <summary>
    /// Pomocné, obecné funkce
    /// </summary>
    public class GFileUtils
    {
        #region Pomocné statické funkce
        /// <summary>
        /// Zjistí kódování zadaného souboru - pokud soubor neexistuje, vrátí výchozí kódování OS
        /// </summary>
        /// <param name="a_file_name">Jméno souboru, pro který se má kódování zjišťovat</param>
        /// <param name="tryAutoDetectForNonBomFile">Příznak, že se mám u souborů bez BOM hledat nějaká sekvence UTF znaků a podle toho automaticky detekovat, že se asi jedná o UTF soubor - pozor, čte to 500KB a to může být velmi pomalé.</param>
        /// <returns></returns>
        public static Encoding DetectEncoding(string a_file_name, bool tryAutoDetectForNonBomFile = true)
        {
            Encoding v_encoding = Encoding.GetEncoding(1250);

            if (!IsValidPathCharacters(a_file_name))
                throw new GException(21300013, 21350008, a_file_name); //RC-EX 21350008 : Zadané jméno souboru [{0}] je invalidní

            if (File.Exists(a_file_name))
            {
                using (FileStream v_file_stream = new FileStream(a_file_name, FileMode.Open, FileAccess.Read, FileShare.Read))
                {
                    v_encoding = DetectEncoding(v_file_stream, tryAutoDetectForNonBomFile);
                }
            }
            return (v_encoding);
        }

        /// <summary>
        /// Nad otevřeným Stream se snaží detekovat kódování textu - strém nechá po akci otevřený, ale pozici může posunout za BOM sekvenci byte (pokud je přítomná)
        /// UTF8    : EF BB BF
        /// UTF16 BE: FE FF
        /// UTF16 LE: FF FE
        /// UTF32 BE: 00 00 FE FF
        /// UTF32 LE: FF FE 00 00
        /// </summary>
        /// <param name="i_Stream">Otevřený stream - po konci akce je pozice za BOM nebo na pozici 0</param>
        /// <param name="tryAutoDetectForNonBomFile">Příznak, že se mám u souborů bez BOM hledat nějaká sekvence UTF znaků a podle toho automaticky detekovat, že se asi jedná o UTF soubor - pozor, čte to 500KB a to může být velmi pomalé.</param>
        /// <returns></returns>
        public static Encoding DetectEncoding(Stream i_Stream, bool tryAutoDetectForNonBomFile = true )
        {
            if (!i_Stream.CanSeek || !i_Stream.CanRead)
                throw new GException( 21300015,  21350009 ); //RC-EX 21350009 : DetectEncoding() requires a seekable and readable Stream

            i_Stream.Position = 0;
            // Try to read 4 bytes. If the stream is shorter, less bytes will be read.
            Byte[] u8_Buf = new Byte[4];
            int s32_Count = i_Stream.Read(u8_Buf, 0, 4);
            if (s32_Count >= 2)
            {
                if (u8_Buf[0] == 0xFE && u8_Buf[1] == 0xFF)
                {
                    i_Stream.Position = 2;
                    return new UnicodeEncoding(true, true);
                }

                if (u8_Buf[0] == 0xFF && u8_Buf[1] == 0xFE)
                {
                    if (s32_Count >= 4 && u8_Buf[2] == 0 && u8_Buf[3] == 0)
                    {
                        i_Stream.Position = 4;
                        return new UTF32Encoding(false, true);
                    }
                    else
                    {
                        i_Stream.Position = 2;
                        return new UnicodeEncoding(false, true);
                    }
                }

                if (s32_Count >= 3 && u8_Buf[0] == 0xEF && u8_Buf[1] == 0xBB && u8_Buf[2] == 0xBF)
                {
                    i_Stream.Position = 3;
                    return new UTF8Encoding(true);      // Encoding.UTF8;
                }

                if (s32_Count >= 4 && u8_Buf[0] == 0 && u8_Buf[1] == 0 && u8_Buf[2] == 0xFE && u8_Buf[3] == 0xFF)
                {
                    i_Stream.Position = 4;
                    return new UTF32Encoding(true, true);
                }
            }

            // 2019-07-08 begin
            Encoding encoding = Encoding.GetEncoding(1250);     // výchozí kódování pro GINIS je 1250
            if (tryAutoDetectForNonBomFile)                     // pokud mám hledat sekvence UTF znaků a podle toho detekovat, že se asi jedná o UTF - pozor, čte to 500KB a to může být pomalé
            {
                i_Stream.Position = 0;                          // pozici vrátím zpět na začátek
                if (AutoDetectUtf(i_Stream, encoding))
                    encoding = new UTF8Encoding(false, true);   // UTF bez BOM sekvence byte ale s přísnou kontrolou správné sekvence UFT byte
            }
            // 2019-07-08 end

            i_Stream.Position = 0;                          // pozici vrátím zpět na začátek

            return encoding;
        }

        /// <summary>
        /// Kód převzatý z ICSharpCode.TextEditor.Util
        /// Podle sekvence načtených prvních 500KB se snaží detekovat, zda se jedná o UTF
        /// 2019-07-08 
        /// </summary>
        /// <param name="fs"></param>
        /// <param name="defaultEncoding"></param>
        /// <returns></returns>
        static bool AutoDetectUtf(Stream fs, Encoding defaultEncoding)
        {
            int max = (int)Math.Min(fs.Length, 500000); // look at max. 500 KB
            const int ASCII = 0;
            const int Error = 1;
            const int UTF8 = 2;
            const int UTF8Sequence = 3;
            int state = ASCII;
            int sequenceLength = 0;
            byte b;
            for (int i = 0; i < max; i++)
            {
                b = (byte)fs.ReadByte();

                if (b < 0x80)
                {
                    // normal ASCII character
                    if (state == UTF8Sequence)
                    {
                        state = Error;
                        break;
                    }
                }
                else if (b < 0xc0)
                {
                    // 10xxxxxx : continues UTF8 byte sequence
                    if (state == UTF8Sequence)
                    {
                        --sequenceLength;
                        if (sequenceLength < 0)
                        {
                            state = Error;
                            break;
                        }
                        else if (sequenceLength == 0)
                        {
                            state = UTF8;
                        }
                    }
                    else
                    {
                        state = Error;
                        break;
                    }
                }
                else if (b >= 0xc2 && b < 0xf5)
                {
                    // beginning of byte sequence
                    if (state == UTF8 || state == ASCII)
                    {
                        state = UTF8Sequence;
                        if (b < 0xe0)
                        {
                            sequenceLength = 1; // one more byte following
                        }
                        else if (b < 0xf0)
                        {
                            sequenceLength = 2; // two more bytes following
                        }
                        else
                        {
                            sequenceLength = 3; // three more bytes following
                        }
                    }
                    else
                    {
                        state = Error;
                        break;
                    }
                }
                else
                {
                    // 0xc0, 0xc1, 0xf5 to 0xff are invalid in UTF-8 (see RFC 3629)
                    state = Error;
                    break;
                }
            }
            fs.Position = 0;
            switch (state)
            {
                case ASCII:
                case Error:
                    return false;
                default:
                    return true;
            }
        }

        /// <summary>
        /// return true if codepage is any UTF codepage
        /// Kód převzatý z ICSharpCode.TextEditor.Util
        /// 2019-07-08 
        /// </summary>
        /// <param name="encoding"></param>
        /// <returns></returns>
        public static bool IsUnicode(Encoding encoding)
        {
            int codepage = encoding.CodePage;
            return codepage == 65001 || codepage == 65000 || codepage == 1200 || codepage == 1201;
        }

        /// <summary>
        /// Převod velikosti souboru na textovou zkrácenou podobu ( s doplněním jednotek kB, MB, GB, TB )
        /// </summary>
        /// <param name="a_size">Velikost souboru</param>
        /// <returns>Textová podoba velikosti souboru</returns>
        public static string LengthToText(long? a_size)
        {
            string v_vysledek = "";
            if (a_size == null)
                v_vysledek = "";
            else
            {
                double v_velikost = Convert.ToDouble(a_size);
                if (a_size < 1000)
                    v_vysledek = String.Format("{0} B", a_size.ToString());
                else if (a_size < 1000000)
                {
                    v_velikost = v_velikost / 1000;
                    v_vysledek = String.Format("{0} kB", v_velikost.ToString("0.##"));
                }
                else if (a_size < 1000000000)
                {
                    v_velikost = v_velikost / 1000000;
                    v_vysledek = String.Format("{0} MB", v_velikost.ToString("0.##"));
                }
                else if (a_size < 1000000000000)
                {
                    v_velikost = v_velikost / 1000000000;
                    v_vysledek = String.Format("{0} GB", v_velikost.ToString("0.##"));
                }
                else
                {
                    v_velikost = v_velikost / 1000000000000;
                    v_vysledek = String.Format("{0} TB", v_velikost.ToString("0.##"));
                }
            }
            return (v_vysledek);
        }
        #endregion

        /// <summary>
        /// Kontrola, že text může být jménem cesty - tedy neobsahuje problémové znaky
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static bool IsValidPathCharacters(string filePath)
        {
            bool v_vysledek = false;


            if (!string.IsNullOrWhiteSpace(filePath) && filePath.IndexOfAny(Path.GetInvalidPathChars()) < 0)
            {
                FileInfo fileInfo = null;

                try
                {
                    fileInfo = new FileInfo(filePath);
                    v_vysledek = true;
                }
                catch (ArgumentException)
                {
                }

            }
            return (v_vysledek);
        }

        /// <summary>
        /// Gets a value that indicates whether <paramref name="path"/>
        /// is a valid path.
        /// </summary>
        /// <returns>Returns <c>true</c> if <paramref name="path"/> is a
        /// valid path; <c>false</c> otherwise. Also returns <c>false</c> if
        /// the caller does not have the required permissions to access
        /// <paramref name="path"/>.
        /// </returns>
        /// <seealso cref="Path.GetFullPath(string)"/>
        /// <seealso cref="TryGetFullPath"/>
        public static bool IsValidPath(string path)
        {
            string result;
            return TryGetFullPath(path, out result);
        }

        /// <summary>
        /// Returns the absolute path for the specified path string. A return
        /// value indicates whether the conversion succeeded.
        /// </summary>
        /// <param name="path">The file or directory for which to obtain absolute
        /// path information.
        /// </param>
        /// <param name="result">When this method returns, contains the absolute
        /// path representation of <paramref name="path"/>, if the conversion
        /// succeeded, or <see cref="String.Empty"/> if the conversion failed.
        /// The conversion fails if <paramref name="path"/> is null or
        /// <see cref="String.Empty"/>, or is not of the correct format. This
        /// parameter is passed uninitialized; any value originally supplied
        /// in <paramref name="result"/> will be overwritten.
        /// </param>
        /// <returns><c>true</c> if <paramref name="path"/> was converted
        /// to an absolute path successfully; otherwise, false.
        /// </returns>
        /// <seealso cref="Path.GetFullPath(string)"/>
        /// <seealso cref="IsValidPath"/>
        public static bool TryGetFullPath(string path, out string result)
        {
            result = String.Empty;
            if (String.IsNullOrWhiteSpace(path)) 
                return false; 

            bool status = false;
            try
            {
                result = Path.GetFullPath(path);
                status = true;
            }
            catch (ArgumentException) { }
            catch (SecurityException) { }
            catch (NotSupportedException) { }
            catch (PathTooLongException) { }

            return status;
        }

        /// <summary>
        /// Načtení souboru do pole Byte
        /// </summary>
        /// <param name="fileName">Jméno vstupního souboru</param>
        /// <returns>Naplněné pole Byte</returns>
        static public byte[] FileToByteArray(string fileName)
        {
            byte[] buff = null;
            using (FileStream fs = new FileStream(fileName, FileMode.Open, FileAccess.Read))
            {
                BinaryReader br = new BinaryReader(fs);
                long numBytes = new FileInfo(fileName).Length;
                buff = br.ReadBytes((int)numBytes);
            }
            return buff;
        }

        /// <summary>
        /// Pro zadaný soubor vrátí jméno EXE, které je v registrech asociované pro editaci takového souboru
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static string GetEditExeFileForFileName(string filePath)
        {
            string extension = System.IO.Path.GetExtension(filePath);
            string progId = GetProgId(extension);
            string executablePath = GetExecutablePath(progId);

            executablePath = executablePath.Trim();

            //if (executablePath.EndsWith("\"%1\"", StringComparison.InvariantCultureIgnoreCase))
            if (executablePath.Right(4) == "\"%1\"" )
                executablePath = executablePath.Left(executablePath.Length - 4);
            executablePath = executablePath.Trim();
            executablePath = executablePath.Trim('"' );

            return (executablePath);
        }
        /// <summary>
        /// Vrátí všechny EXE soubory, které jsou v registrech asociované pro editaci případně otevření takového souboru
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static List<string> GetAllEditExeFileForFileName(string filePath)
        {
            List<string> vysledek = new List<string>();
            string extension = System.IO.Path.GetExtension(filePath);
            List<string> progIds = GetAllProgIds(extension);
            foreach (string progId in progIds)
            {
                string executablePath = GetExecutablePath(progId);
                executablePath = ExtractExePath(executablePath);
                if( !string.IsNullOrWhiteSpace(executablePath) && File.Exists(executablePath))
                    vysledek.Add(executablePath);
            }
            return (vysledek);
        }
        /// <summary>
        /// Upraví příkaz z registru na jméno EXE souboru. V registrech je to často v podobě "cesta\k\programu.exe" "%1" /neco /neco
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        static string ExtractExePath(string command)
        {
            // Pokud je cesta v uvozovkách, vezmeme první výskyt .exe v uvozovkách
            var match = Regex.Match(command, "\"([^\"]+\\.exe)\"");
            if (match.Success)
            {
                return match.Groups[1].Value;
            }

            // Pokud není v uvozovkách, vezmeme první výskyt .exe v řetězci
            match = Regex.Match(command, @"([^\s\""]+\.exe)");
            if (match.Success)
            {
                return match.Groups[1].Value;
            }

            return null;
        }

        /// <summary>
        /// Vrátí ProgID pro zadanou příponu souboru. Pokud není nalezen, vrátí null
        /// </summary>
        /// <param name="extension"></param>
        /// <returns></returns>
        public static string GetProgId(string extension)
        {
            string vysledek = null;
            using (RegistryKey key = Registry.ClassesRoot.OpenSubKey(extension))
            {
                vysledek = key?.GetValue(null)?.ToString();

                if (vysledek == null)
                {
                    // Alternativní ProgID v OpenWithProgids
                    using (RegistryKey openWithKey = key.OpenSubKey("OpenWithProgids"))
                    {
                        if (openWithKey != null)
                        {
                            foreach (var valueName in openWithKey.GetValueNames())
                            {
                                vysledek = valueName;
                                break;
                            }
                        }
                    }
                }
            }
            return vysledek;
        }
        /// <summary>
        /// Vrátí všechny ProgID pro zadanou příponu souboru
        /// </summary>
        /// <param name="extension"></param>
        /// <returns></returns>
        public static List<string> GetAllProgIds(string extension)
        {
            var result = new List<string>();
            using (RegistryKey extKey = Registry.ClassesRoot.OpenSubKey(extension))
            {
                // Výchozí ProgID
                string defaultProgId = extKey?.GetValue("") as string;
                if (!string.IsNullOrEmpty(defaultProgId))
                {
                    result.Add(defaultProgId);
                }
                // Alternativní ProgID v OpenWithProgids
                using (RegistryKey openWithKey = extKey?.OpenSubKey("OpenWithProgids"))
                {
                    if (openWithKey != null)
                    {
                        foreach (var valueName in openWithKey.GetValueNames())
                        {
                            result.Add(valueName);
                        }
                    }
                }
            }
            return result;
        }

        /// <summary>
        /// Pro zadané ProgID vrátí jméno EXE, které je v registrech asociované pro editaci případně otevření takového souboru
        /// Pokud není nic nalezeno, vrátí null
        /// </summary>
        /// <param name="progId"></param>
        /// <returns></returns>
        static string GetExecutablePath(string progId)
        {
            string[] registryPaths = {
                $@"{progId}\shell\edit\command",
                $@"{progId}\shell\open\command"
            };
            
            foreach (var path in registryPaths)
            {
                using (RegistryKey key = Registry.ClassesRoot.OpenSubKey(path))
                {
                    if (key != null)
                    {
                        return key.GetValue(null)?.ToString();
                    }
                }
            }
            return null;
        }




    }
}
