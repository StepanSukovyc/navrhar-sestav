//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FileReader.cs                          </Name>
//    <Description> Třída, která může otevřít textové soubory s automatickou detekci kódování.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-02-15                                                  </Created>
//  </FileHeader>

using System;
using System.Text;
using System.IO;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Třída, která může otevřít textové soubory s automatickou detekci kódování.
    /// </summary>
    public static class FileReader
    {
        /// <summary>
        /// Zjištění, zda kódování je UNICODe
        /// </summary>
        /// <param name="encoding">Aktuální kódování</param>
        /// <returns></returns>
        public static bool IsUnicode(Encoding encoding)
        {
            int codepage = encoding.CodePage;
            // vrátí TRUE, pokud je codepage je jiné néž UTF codepage
            return codepage == 65001 || codepage == 65000 || codepage == 1200 || codepage == 1201;
        }

        /// <summary>
        /// Načtení souboru z proudu
        /// </summary>
        /// <param name="fs">Proud dat</param>
        /// <param name="encoding">Aktuální kódování dat proudu</param>
        /// <returns>"Správně" přečtený obsah proudu</returns>
        public static string ReadFileContent(Stream fs, ref Encoding encoding)
        {
            using (StreamReader reader = OpenStream(fs, encoding))
            {
                reader.Peek();
                encoding = reader.CurrentEncoding;
                return reader.ReadToEnd();
            }
        }

        /// <summary>
        /// Načtení souboru z proudu
        /// </summary>
        /// <param name="fs">Proud dat</param>
        /// <param name="encoding">Aktuální kódování dat proudu</param>
        /// <returns>"Správně" přečtený obsah proudu v bytech</returns>
        public static byte[] ReadFileBytes(Stream fs, ref Encoding encoding)
        {
            using (StreamReader reader = OpenStream(fs, encoding))
            {
                reader.Peek();
                encoding = reader.CurrentEncoding;
                return reader.CurrentEncoding.GetBytes(reader.ReadToEnd());
            }
        }

        /// <summary>
        /// Načtení souboru ze souboru
        /// </summary>
        /// <param name="fileName">Cesta k souboru</param>
        /// <param name="encoding">Aktuální kódování</param>
        /// <returns>"Správně" přečtený obsah proudu</returns>
        public static string ReadFileContent(string fileName, Encoding encoding = null)
        {
            if (encoding == null)
                encoding = GetEncoding(fileName);

            using (FileStream fs = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                return ReadFileContent(fs, ref encoding);
        }

        /// <summary>
        /// Zjištění kódování
        /// </summary>
        /// <param name="filename">Název textového souboru</param>
        /// <returns></returns>
        public static Encoding GetEncoding(string filename)
        {
            var encodingByBOM = GetEncodingByBOM(filename);
            if (encodingByBOM != null)
                return encodingByBOM;

            // BOM nenalezen, zkusíme znaky analýzovat jinak
            var encodingByParsingUTF8 = GetEncodingByParsing(filename, Encoding.UTF8);
            if (encodingByParsingUTF8 != null)
                return encodingByParsingUTF8;

            var encodingByParsingLatin1 = GetEncodingByParsing(filename, Encoding.GetEncoding("iso-8859-1"));
            if (encodingByParsingLatin1 != null)
                return encodingByParsingLatin1;

            var encodingByParsingUTF7 = GetEncodingByParsing(filename, Encoding.UTF7);
            if (encodingByParsingUTF7 != null)
                return encodingByParsingUTF7;

            return Encoding.UTF8;
        }

        /// <summary>
        /// Určuje kódování textového souboru analýzou jeho značky pořadí bajtů (BOM)  
        /// </summary>
        /// <param name="filename">Textový soubor pro analýzu</param>
        /// <returns>Zjištěné kódování.</returns>
        private static Encoding GetEncodingByBOM(string filename)
        {
            if (File.Exists(filename))
            {
                // Čtení BOM
                var byteOrderMark = new byte[4];
                using (var file = new FileStream(filename, FileMode.Open, FileAccess.Read))
                    file.Read(byteOrderMark, 0, 4);

                // Analýza BOM
                if (byteOrderMark[0] == 0x2b && byteOrderMark[1] == 0x2f && byteOrderMark[2] == 0x76) return Encoding.UTF7;
                if (byteOrderMark[0] == 0xef && byteOrderMark[1] == 0xbb && byteOrderMark[2] == 0xbf) return Encoding.UTF8;
                if (byteOrderMark[0] == 0xff && byteOrderMark[1] == 0xfe) return Encoding.Unicode; //UTF-16LE
                if (byteOrderMark[0] == 0xfe && byteOrderMark[1] == 0xff) return Encoding.BigEndianUnicode; //UTF-16BE
                if (byteOrderMark[0] == 0 && byteOrderMark[1] == 0 && byteOrderMark[2] == 0xfe && byteOrderMark[3] == 0xff) return Encoding.UTF32;
            }
            return null; // BOM nenalezen
        }

        private static Encoding GetEncodingByParsing(string filename, Encoding encoding)
        {
            var encodingVerifier = Encoding.GetEncoding(encoding.BodyName, new EncoderExceptionFallback(), new DecoderExceptionFallback());
            try
            {
                using (var textReader = new StreamReader(filename, encodingVerifier, detectEncodingFromByteOrderMarks: true))
                {
                    try
                    {
                        while (!textReader.EndOfStream)
                            textReader.ReadLine();   // za účelem zvýšení pozice proudu
                    }
                    catch { }
                    // celý text byl analyzován v pořádku
                    return textReader.CurrentEncoding;
                }
            }
            catch { }
            return null;    // kódování nenalezeno 
        }
        /// <summary>
        /// Načtení souboru ze souboru
        /// </summary>
        /// <param name="fileName">Cesta k souboru</param>
        /// <param name="encoding">Aktuální kódování</param>
        /// <returns>"Správně" přečtený obsah proudu</returns>
        public static string ReadFileContent(string fileName, ref Encoding encoding)
        {
            using (FileStream fs = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                return ReadFileContent(fs, ref encoding);
        }

        /// <summary>
        /// Otevření proudu pro práci s obsahem
        /// </summary>
        /// <param name="fs">Proud souboru</param>
        /// <param name="defaultEncoding">Výchozí kódování</param>
        /// <returns></returns>
        public static StreamReader OpenStream(Stream fs, Encoding defaultEncoding)
        {
            if (fs == null)
                throw new ArgumentNullException("fs");

            if (fs.Length >= 2)
            {
                // the autodetection of StreamReader is not capable of detecting the difference
                // between ISO-8859-1 and UTF-8 without BOM.
                int firstByte = fs.ReadByte();
                int secondByte = fs.ReadByte();
                switch ((firstByte << 8) | secondByte)
                {
                    case 0x0000: // either UTF-32 Big Endian or a binary file; use StreamReader
                    case 0xfffe: // Unicode BOM (UTF-16 LE or UTF-32 LE)
                    case 0xfeff: // UTF-16 BE BOM
                    case 0xefbb: // start of UTF-8 BOM
                                 // StreamReader autodetection works
                        fs.Position = 0;
                        return new StreamReader(fs);
                    default:
                        return AutoDetect(fs, (byte)firstByte, (byte)secondByte, defaultEncoding);
                }
            }
            else
                return defaultEncoding != null ? new StreamReader(fs, defaultEncoding) : new StreamReader(fs);
        }

        static StreamReader AutoDetect(Stream fs, byte firstByte, byte secondByte, Encoding defaultEncoding)
        {
            const int ASCII = 0, Error = 1, UTF8 = 2, UTF8Sequence = 3;
            int max = (int)Math.Min(fs.Length, 500000) // look at max. 500 KB
                , state = ASCII, sequenceLength = 0;
            byte b;
            for (int i = 0; i < max; i++)
            {
                if (i == 0)
                    b = firstByte;
                else if (i == 1)
                    b = secondByte;
                else
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
                            state = UTF8;
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
                            sequenceLength = 1; // one more byte following
                        else if (b < 0xf0)
                            sequenceLength = 2; // two more bytes following
                        else
                            sequenceLength = 3; // three more bytes following
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
                    // when the file seems to be ASCII or non-UTF8,
                    // we read it using the user-specified encoding so it is saved again
                    // using that encoding.
                    if (IsUnicode(defaultEncoding))
                        // the file is not Unicode, so don't read it using Unicode even if the
                        // user has choosen Unicode as the default encoding.

                        // If we don't do this, SD will end up always adding a Byte Order Mark
                        // to ASCII files.
                        defaultEncoding = Encoding.Default; // use system encoding instead
                    return new StreamReader(fs, defaultEncoding);
                default:
                    return new StreamReader(fs);
            }
        }
    }
}
